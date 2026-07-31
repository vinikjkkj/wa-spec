#!/usr/bin/env node
'use strict'

/**
 * Reads raw WA Web bundle .js files from a directory, runs the static
 * appstate extractor over them, and writes three artifacts to the
 * package root:
 *
 *   - index.json   raw IR (for programmatic / non-TS consumers)
 *   - index.js     CommonJS runtime (frozen WA_APPSTATE_SCHEMAS)
 *   - index.d.ts   TypeScript types (per-action schema literal types)
 *
 * Usage:
 *   npx wa-appstate apply --bundles dump/raw/<wa-version>/
 *   npx wa-appstate apply --manifest dump/manifest.json
 */

const fs = require('node:fs')
const path = require('node:path')
const { extractAppstate } = require('./extract-appstate.cjs')

function parseArgs(argv) {
    const opts = { bundles: null, manifest: null, out: null, waVersion: null , allowShrink: false }
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--bundles') opts.bundles = argv[++i]
        else if (a === '--manifest') opts.manifest = argv[++i]
        else if (a === '--out') opts.out = argv[++i]
        else if (a === '--wa-version') opts.waVersion = argv[++i]
        else if (a === '--allow-shrink') opts.allowShrink = true
        else if (a === '--help' || a === '-h') {
            printHelp()
            process.exit(0)
        } else if (!opts.bundles && !a.startsWith('--')) {
            opts.bundles = a
        } else {
            console.error('unknown flag:', a)
            printHelp()
            process.exit(2)
        }
    }
    if (!opts.bundles && opts.manifest) {
        try {
            const m = JSON.parse(fs.readFileSync(opts.manifest, 'utf8'))
            opts.bundles = path.resolve(path.dirname(opts.manifest), m.rawDir)
            if (!opts.waVersion) opts.waVersion = m.waVersion ?? null
        } catch (err) {
            console.error(`apply: failed to read manifest ${opts.manifest}:`, err.message)
            process.exit(1)
        }
    }
    if (!opts.bundles) {
        printHelp()
        process.exit(2)
    }
    return opts
}

function printHelp() {
    console.error(
        [
            'usage: wa-appstate apply (--bundles <dir> | --manifest <file>) [--out <dir>] [--wa-version <ver>]',
            '',
            '  --bundles <dir>     directory containing raw .js bundle dumps',
            '  --manifest <file>   read rawDir + waVersion from this manifest.json',
            '  --out <dir>         output directory (default: <pkg> root)',
            '  --wa-version <ver>  pin the version stamped into output headers'
        ].join('\n')
    )
}

// Reorder object keys alphabetically, in place, leaving array order alone.
// The IR is emitted in discovery order, so any code motion upstream reshuffles
// keys and rewrites whole blocks of the artifact. Reviewing a daily diff is
// what catches a bad extraction, so that noise has a cost. Array order is left
// untouched — element order can be part of the schema, key order never is.
// In-place so the reordering reaches every emitter that shares these objects.
function canonicaliseKeyOrder(node) {
    if (Array.isArray(node)) {
        for (const v of node) canonicaliseKeyOrder(v)
        return node
    }
    if (!node || typeof node !== 'object') return node
    for (const k of Object.keys(node).sort()) {
        const v = node[k]
        delete node[k]
        node[k] = canonicaliseKeyOrder(v)
    }
    return node
}

// Refuse to overwrite a good artifact with a sharply smaller one.
//
// Extraction fails quietly: when WA renames a module the walkers stop matching
// and the output is smaller but still well-formed, so nothing downstream
// objects and the shrunken version gets published. That is how appstate
// shipped an empty table to npm twice. A drop needs a human to confirm it.
function guardAgainstShrink(outDir, counts, allowShrink) {
    let prev
    try {
        prev = JSON.parse(fs.readFileSync(path.join(outDir, 'index.json'), 'utf8'))
    } catch {
        return // nothing to compare against — first run
    }
    const before = countIr(prev)
    const drops = []
    for (const [name, now] of Object.entries(counts)) {
        const was = before[name] ?? 0
        if (was === 0 || now >= was || was - now <= 2 || now >= was * 0.9) continue
        drops.push(`${name}: ${was} → ${now} (-${(100 - (now / was) * 100).toFixed(1)}%)`)
    }
    if (drops.length === 0) return
    console.error('apply: refusing to write — sharp drop against the artifact being replaced:')
    for (const d of drops) console.error(`  ${d}`)
    if (allowShrink) {
        console.error('  --allow-shrink given, writing anyway')
        return
    }
    console.error('  re-run with --allow-shrink once the drop is confirmed to be real')
    process.exit(1)
}

function countIr(ir) {
    return {
        actions: Object.keys(ir.actions ?? {}).length,
        collections: (ir.collections ?? []).length
    }
}

function loadBundles(dir) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
        console.error(`bundles dir not found: ${dir}`)
        process.exit(1)
    }
    // Sorted so bundle order is deterministic. Several extractors resolve a
    // module by first match, and the archive defines most modules in more
    // than one file, so raw readdir order let the chosen variant vary
    // between runs on identical input.
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort()
    if (files.length === 0) {
        console.error(`no .js bundles in ${dir}`)
        process.exit(1)
    }
    return files.map((f) => ({
        url: f,
        text: fs.readFileSync(path.join(dir, f), 'utf8')
    }))
}

function detectWaVersion(bundlesDir, fallback) {
    const candidates = [
        path.join(bundlesDir, 'manifest.json'),
        path.join(bundlesDir, '..', 'manifest.json'),
        path.join(bundlesDir, '..', '..', 'manifest.json')
    ]
    for (const m of candidates) {
        try {
            const data = JSON.parse(fs.readFileSync(m, 'utf8'))
            if (typeof data.waVersion === 'string') return data.waVersion
        } catch {}
    }
    const base = path.basename(path.resolve(bundlesDir))
    if (/^\d+\.\d+/.test(base)) return base
    return fallback ?? 'unknown'
}

// --- short-key transformation + safe quoting ---

function shortKey(actionKey) {
    return actionKey
}

function quote(s) {
    return `'${String(s).replace(/'/g, "\\'")}'`
}

function main() {
    const opts = parseArgs(process.argv)
    const bundles = loadBundles(opts.bundles)
    const waVersion = opts.waVersion ?? detectWaVersion(opts.bundles)
    const { handlers, syncdConst, diagnostics } = extractAppstate(bundles)

    const sortedKeys = Object.keys(handlers).sort()
    const outDir = opts.out ? path.resolve(opts.out) : path.resolve(__dirname, '..')

    // Build the canonical collection list from WASyncdConst (order-stable).
    const collections = Object.values(syncdConst.collections)

    // ---- index.json (IR for programmatic consumers) ----
    const ir = {
        waVersion,
        collections,
        actions: {}
    }
    for (const key of sortedKeys) {
        const h = handlers[key]
        ir.actions[key] = {
            module: h.module,
            name: h.name,
            collection: h.collection,
            version: h.version,
            scope: h.scope,
            baseClass: h.baseClass,
            valueField: h.valueField,
            valueProtoType: h.valueProtoType,
            valueEnumFields: h.valueEnumFields,
            chatJidIndex: h.chatJidIndex,
            indexParts: h.indexParts
        }
    }
    guardAgainstShrink(outDir, countIr(ir), opts.allowShrink)
    canonicaliseKeyOrder(ir)
    fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(ir, null, 2) + '\n')

    // ---- index.js (CommonJS runtime) ----
    const collectionsJs = collections.map((c) => quote(c)).join(', ')
    const orNull = (v) => (v == null ? 'null' : quote(v))
    const emitPartJs = (p) => {
        if (p.type === 'literal') {
            return `            Object.freeze({ type: 'literal', value: ${quote(p.value)} })`
        }
        if (p.type === 'enum') {
            return `            Object.freeze({ type: 'enum', name: ${quote(p.name)}, protoEnum: ${quote(p.protoEnum)} })`
        }
        return `            Object.freeze({ type: ${quote(p.type)}, name: ${quote(p.name)} })`
    }
    const schemasJsBody = sortedKeys
        .map((key) => {
            const h = handlers[key]
            const partsJs = h.indexParts.map(emitPartJs).join(',\n')
            const enumFieldsJs = h.valueEnumFields
                ? `Object.freeze({ ${Object.entries(h.valueEnumFields).map(([k, v]) => `${quote(k)}: ${quote(v)}`).join(', ')} })`
                : 'null'
            return `    ${shortKey(key)}: Object.freeze({
        name: ${quote(h.name)},
        collection: ${orNull(h.collection)},
        version: ${h.version ?? 'null'},
        scope: ${quote(h.scope)},
        valueField: ${orNull(h.valueField)},
        valueProtoType: ${orNull(h.valueProtoType)},
        valueEnumFields: ${enumFieldsJs},
        indexParts: Object.freeze([
${partsJs}
        ])
    })`
        })
        .join(',\n')

    const js = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}
'use strict'

const WA_APPSTATE_COLLECTIONS = Object.freeze([${collectionsJs}])

const WA_APPSTATE_SCHEMAS = Object.freeze({
${schemasJsBody}
})

module.exports = { WA_APPSTATE_COLLECTIONS, WA_APPSTATE_SCHEMAS }
`
    fs.writeFileSync(path.join(outDir, 'index.js'), js)

    // ---- index.d.ts (TypeScript types) ----
    const collectionsUnion = collections.map((c) => quote(c)).join(' | ') || 'string'
    const emitPartType = (p) => {
        if (p.type === 'literal') {
            return `{ readonly type: 'literal'; readonly value: ${quote(p.value)} }`
        }
        if (p.type === 'enum') {
            return `{ readonly type: 'enum'; readonly name: ${quote(p.name)}; readonly protoEnum: ${quote(p.protoEnum)} }`
        }
        return `{ readonly type: ${quote(p.type)}; readonly name: ${quote(p.name)} }`
    }
    const schemasDtsLines = sortedKeys
        .map((key) => {
            const h = handlers[key]
            const partsTypes = h.indexParts.map(emitPartType).join(', ')
            const collectionType = h.collection ? quote(h.collection) : 'WaAppstateCollection'
            const valueFieldType = h.valueField ? quote(h.valueField) : 'null'
            const valueProtoTypeType = h.valueProtoType ? quote(h.valueProtoType) : 'null'
            const valueEnumFieldsType = h.valueEnumFields
                ? `{ ${Object.entries(h.valueEnumFields).map(([k, v]) => `readonly ${quote(k)}: ${quote(v)}`).join('; ')} }`
                : 'null'
            return `    readonly ${shortKey(key)}: WaAppstateSchema<${quote(h.name)}, ${collectionType}, ${quote(h.scope)}, ${valueFieldType}, ${valueProtoTypeType}, ${valueEnumFieldsType}, readonly [${partsTypes}]>`
        })
        .join('\n')

    const dts = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}

export type WaAppstateCollection = ${collectionsUnion}

export type WaAppstateScope =
    | 'account'
    | 'chat'
    | 'chatOrContact'
    | 'message'
    | 'chatMessageRange'

// Discriminated union — \`type\` narrows the shape:
//   - 'literal'    fixed \`value\` (the action wire name, position 0)
//   - 'jid'        WhatsApp JID string (\`<user>@<domain>\`, legacy-encoded)
//   - 'boolString' '0' or '1' — WA's mutation-index bool encoding
//   - 'jidOrZero'  participant slot in message scope — JID, or literal '0'
//                  when fromMe is true or participant is null
//   - 'enum'       stringified protobuf-enum integer; \`protoEnum\` is the
//                  enum's nested path inside SyncActionValue (e.g.
//                  \`SettingsSyncAction.SettingKey\`), look it up in
//                  @vinikjkkj/wa-proto for the value set.
//   - 'string'     opaque identifier (msg id, label id, agent id, etc.)
//   - 'unknown'    unrecognised slot (fallback)
export type WaAppstateIndexPart =
    | { readonly type: 'literal'; readonly value: string }
    | { readonly type: 'jid'; readonly name: string }
    | { readonly type: 'boolString'; readonly name: string }
    | { readonly type: 'jidOrZero'; readonly name: string }
    | { readonly type: 'enum'; readonly name: string; readonly protoEnum: string }
    | { readonly type: 'string'; readonly name: string }
    | { readonly type: 'unknown'; readonly name: string }

export type WaAppstateValueEnumFields = Readonly<Record<string, string>>

export interface WaAppstateSchema<
    Name extends string = string,
    Collection extends WaAppstateCollection = WaAppstateCollection,
    Scope extends WaAppstateScope = WaAppstateScope,
    ValueField extends string | null = string | null,
    ValueProtoType extends string | null = string | null,
    ValueEnumFields extends WaAppstateValueEnumFields | null = WaAppstateValueEnumFields | null,
    IndexParts extends ReadonlyArray<WaAppstateIndexPart> = ReadonlyArray<WaAppstateIndexPart>
> {
    readonly name: Name
    readonly collection: Collection
    readonly version: number
    readonly scope: Scope
    readonly valueField: ValueField
    // Dotted path to the value's protobuf message inside @vinikjkkj/wa-proto's
    // \`waproto\` namespace. Nested types under SyncActionValue read as
    // \`SyncActionValue.<X>\` (most actions); top-level types (e.g.
    // \`ChatLockSettings\`, \`DeviceCapabilities\`) read as just \`<X>\`.
    // Resolve with a \`GetByPath\`-style helper to obtain the typed value.
    readonly valueProtoType: ValueProtoType
    // For every enum-typed field inside the value message, a dotted path to
    // the enum inside \`waproto.SyncActionValue\` (e.g. \`StatusPrivacyAction.
    // StatusDistributionMode\`). Lets a typed-mutation API surface enum
    // string literals (\`'ALLOW_LIST'\`) instead of magic integers (\`1\`).
    // \`null\` when the value message has no enum fields.
    readonly valueEnumFields: ValueEnumFields
    readonly indexParts: IndexParts
}

export declare const WA_APPSTATE_COLLECTIONS: ReadonlyArray<WaAppstateCollection>

export declare const WA_APPSTATE_SCHEMAS: {
${schemasDtsLines}
}

export type WaAppstateActionKey = keyof typeof WA_APPSTATE_SCHEMAS

// --- Derived helpers ------------------------------------------------------

// Turn a schema's \`indexParts\` tuple into the runtime value tuple — the
// array you'd \`JSON.stringify\` to produce the wire-level index string.
// Literals are pinned to their constant value; boolString slots widen to
// '0' | '1' (WA encodes mutation-index booleans this way — see
// WAWebSyncdUtils.constructMsgKeySegments). The wire format on the bus
// is \`JSON.stringify(WaAppstateIndexValueOf<S>)\`.
//
//   WaAppstateIndexValueOf<typeof WA_APPSTATE_SCHEMAS.Mute>
//     → readonly ['mute', string]
//   WaAppstateIndexValueOf<typeof WA_APPSTATE_SCHEMAS.Star>
//     → readonly ['star', string, string, '0' | '1', string]
export type WaAppstateIndexValueOf<S> = S extends {
    indexParts: infer P extends ReadonlyArray<WaAppstateIndexPart>
}
    ? {
          readonly [K in keyof P]: P[K] extends { type: 'literal'; value: infer V }
              ? V
              : P[K] extends { type: 'boolString' }
                ? '0' | '1'
                : string
      }
    : never

// Turn a schema's \`indexParts\` tuple into the keyword args object — what
// a typed builder would accept. Literal slots are auto-filled by the
// builder and dropped from the args; non-literals contribute their \`name\`.
// boolString slots take a JS boolean (encoder writes '0'/'1'); jidOrZero
// slots take \`string | null\` (encoder writes '0' when null or when
// fromMe is true).
//
//   WaAppstateIndexArgs<'Mute'>  → { readonly chatJid: string }
//   WaAppstateIndexArgs<'Star'>  → {
//       readonly remote: string
//       readonly id: string
//       readonly fromMe: boolean
//       readonly participant: string | null
//   }
export type WaAppstateIndexArgs<K extends WaAppstateActionKey> = {
    readonly [Part in (typeof WA_APPSTATE_SCHEMAS)[K]['indexParts'][number] as Part extends {
        type: 'literal'
    }
        ? never
        : Part extends { name: infer N extends string }
          ? N
          : never]: Part extends { type: 'boolString' }
        ? boolean
        : Part extends { type: 'jidOrZero' }
          ? string | null
          : string
}
`
    fs.writeFileSync(path.join(outDir, 'index.d.ts'), dts)

    const errs = diagnostics.handlersErrored
    const errSummary = errs > 0 ? ` (${errs} errored: ${diagnostics.errors.slice(0, 3).map((e) => `${e.module}/${e.error}`).join(', ')}${errs > 3 ? '…' : ''})` : ''
    console.log(
        `apply: ${sortedKeys.length} actions / ${collections.length} collections${errSummary} → ${outDir}/{index.json,index.js,index.d.ts}`
    )
}

main()
