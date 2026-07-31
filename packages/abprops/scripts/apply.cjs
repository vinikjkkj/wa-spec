#!/usr/bin/env node
'use strict'

/**
 * Reads raw WA Web bundle .js files from a directory, runs the static
 * abprops extractor over them, and writes three artifacts to the package root:
 *
 *   - index.json   raw IR (for programmatic / non-TS consumers)
 *   - index.js     CommonJS runtime (frozen WA_ABPROPS/WA_GROUP_ABPROPS/…)
 *   - index.d.ts   TypeScript types (per-prop literal types)
 *
 * Usage:
 *   node packages/abprops/scripts/apply.cjs --bundles dump/raw/<wa-version>/
 *   node packages/abprops/scripts/apply.cjs --manifest dump/manifest.json
 */

const fs = require('node:fs')
const path = require('node:path')
const { extractAbProps } = require('./extract-abprops.cjs')

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
            'usage: wa-abprops apply (--bundles <dir> | --manifest <file>) [--out <dir>] [--wa-version <ver>]',
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
        props: ir.propCount ?? Object.keys(ir.props ?? {}).length,
        groupProps: ir.groupPropCount ?? Object.keys(ir.groupProps ?? {}).length
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

// --- safe quoting / emitters --------------------------------------------

// String prop defaults are arbitrary server-authored text (JSON blobs, CSV
// lists, URLs). JSON.stringify gives us a correctly escaped double-quoted JS
// literal for any of it, including control chars and lone surrogates.
function quote(s) {
    return JSON.stringify(String(s))
}

// Prop names are snake_case in practice, but a name that isn't a bare JS
// identifier must still round-trip as a quoted key.
function key(k) {
    return /^[A-Za-z_$][\w$]*$/.test(k) ? k : quote(k)
}

function literal(v) {
    if (typeof v === 'string') return quote(v)
    if (typeof v === 'boolean') return v ? 'true' : 'false'
    if (v == null) return 'null'
    return String(v)
}

function emitPropJs(def) {
    return `Object.freeze({ code: ${def.code}, type: ${quote(def.type)}, defaultValue: ${literal(def.defaultValue)}, debugDefaultValue: ${literal(def.debugDefaultValue)} })`
}

function emitPropDts(def) {
    return `{ readonly code: ${def.code}; readonly type: ${quote(def.type)}; readonly defaultValue: ${literal(def.defaultValue)}; readonly debugDefaultValue: ${literal(def.debugDefaultValue)} }`
}

// --- main ---------------------------------------------------------------

function main() {
    const opts = parseArgs(process.argv)
    const bundles = loadBundles(opts.bundles)
    const waVersion = opts.waVersion ?? detectWaVersion(opts.bundles)
    const { props, groupProps, usedBeforeInitialization, specialEarlyProps, diagnostics } =
        extractAbProps(bundles)

    const propNames = Object.keys(props).sort()
    const groupPropNames = Object.keys(groupProps).sort()
    const outDir = opts.out ? path.resolve(opts.out) : path.resolve(__dirname, '..')

    // A total extraction failure means the module shape drifted — bail before
    // writing anything rather than committing an empty table over a good one.
    if (propNames.length === 0) {
        console.error('apply: extracted 0 props — refusing to write an empty catalogue')
        for (const e of diagnostics.errors.slice(0, 10)) console.error(`  ${e.module}: ${e.error}`)
        process.exit(1)
    }

    // ---- index.json (IR) ------------------------------------------------
    const ir = {
        waVersion,
        propCount: propNames.length,
        groupPropCount: groupPropNames.length,
        usedBeforeInitialization: [...usedBeforeInitialization].sort(),
        specialEarlyProps,
        props: {},
        groupProps: {}
    }
    for (const n of propNames) ir.props[n] = props[n]
    for (const n of groupPropNames) ir.groupProps[n] = groupProps[n]
    guardAgainstShrink(outDir, countIr(ir), opts.allowShrink)
    canonicaliseKeyOrder(ir)
    fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(ir, null, 2) + '\n')

    // ---- index.js -------------------------------------------------------
    const propsJsBody = propNames.map((n) => `    ${key(n)}: ${emitPropJs(props[n])}`).join(',\n')
    const groupPropsJsBody = groupPropNames
        .map((n) => `    ${key(n)}: ${emitPropJs(groupProps[n])}`)
        .join(',\n')
    const byCodeJsBody = propNames
        .map((n) => ({ code: props[n].code, name: n }))
        .sort((a, b) => a.code - b.code)
        .map((e) => `    ${e.code}: ${quote(e.name)}`)
        .join(',\n')
    const groupByCodeJsBody = groupPropNames
        .map((n) => ({ code: groupProps[n].code, name: n }))
        .sort((a, b) => a.code - b.code)
        .map((e) => `    ${e.code}: ${quote(e.name)}`)
        .join(',\n')
    const usedBeforeInitJs = [...usedBeforeInitialization].sort().map(quote).join(', ')
    const specialEarlyJs = specialEarlyProps
        ? `Object.freeze({
    localStorageKey: ${quote(specialEarlyProps.localStorageKey)},
    props: Object.freeze([${specialEarlyProps.props.map(quote).join(', ')}])
})`
        : 'null'

    const js = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}
'use strict'

// Every server-driven experiment config WA Web knows about, keyed by the name
// the client uses internally. \`code\` is the only identity that travels on the
// wire (the abt IQ returns { configCode, configValue, configExpoKey }); names
// exist solely in the bundle.
const WA_ABPROPS = Object.freeze({
${propsJsBody}
})

// Group-scoped props — fetched per group jid via the group experiment config
// IQ and cached separately from the user-level table above.
const WA_GROUP_ABPROPS = Object.freeze({
${groupPropsJsBody}
})

// Reverse maps, mirroring the runtime's own code→name lookup.
const WA_ABPROPS_BY_CODE = Object.freeze({
${byCodeJsBody}
})

const WA_GROUP_ABPROPS_BY_CODE = Object.freeze({
${groupByCodeJsBody}
})

// Props the runtime permits reading before the config cache has resolved.
// Reading anything else that early logs a warning and yields the default.
const WA_ABPROPS_USED_BEFORE_INIT = Object.freeze([${usedBeforeInitJs}])

// Props mirrored into localStorage (as a JSON object under \`localStorageKey\`)
// so startup code can consult them before the IndexedDB store opens.
const WA_ABPROPS_SPECIAL_EARLY = ${specialEarlyJs}

module.exports = {
    WA_ABPROPS,
    WA_GROUP_ABPROPS,
    WA_ABPROPS_BY_CODE,
    WA_GROUP_ABPROPS_BY_CODE,
    WA_ABPROPS_USED_BEFORE_INIT,
    WA_ABPROPS_SPECIAL_EARLY
}
`
    fs.writeFileSync(path.join(outDir, 'index.js'), js)

    // ---- index.d.ts -----------------------------------------------------
    const propsDtsBody = propNames.map((n) => `    readonly ${key(n)}: ${emitPropDts(props[n])}`).join('\n')
    const groupPropsDtsBody = groupPropNames
        .map((n) => `    readonly ${key(n)}: ${emitPropDts(groupProps[n])}`)
        .join('\n')
    const byCodeDtsBody = propNames
        .map((n) => ({ code: props[n].code, name: n }))
        .sort((a, b) => a.code - b.code)
        .map((e) => `    readonly ${e.code}: ${quote(e.name)}`)
        .join('\n')
    const groupByCodeDtsBody = groupPropNames
        .map((n) => ({ code: groupProps[n].code, name: n }))
        .sort((a, b) => a.code - b.code)
        .map((e) => `    readonly ${e.code}: ${quote(e.name)}`)
        .join('\n')
    const usedBeforeInitDts = [...usedBeforeInitialization].sort().map(quote).join(', ')
    const specialEarlyDts = specialEarlyProps
        ? `{
    readonly localStorageKey: ${quote(specialEarlyProps.localStorageKey)}
    readonly props: readonly [${specialEarlyProps.props.map(quote).join(', ')}]
}`
        : 'null'

    const dts = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}

// Wire type of a config value. The server always sends \`configValue\` as a
// string; the client decodes it with this type
// (WAWebABPropsParseConfigValue.parseConfigValue):
//   bool    → '1' | 'true' | 'True' are true, everything else false
//   int     → parseInt(value, 10)
//   float   → parseFloat(value)
//   string  → passed through unchanged
export type WaAbPropType = 'bool' | 'int' | 'float' | 'string'

export type WaAbPropValue = boolean | number | string

export interface WaAbProp {
    // Numeric id used on the wire and as the local abpropConfigs primary key.
    // Prop names never leave the client.
    readonly code: number
    readonly type: WaAbPropType
    // Value used when the server has not pushed one for this code.
    readonly defaultValue: WaAbPropValue
    // Substituted for defaultValue only on internal builds — gkx 26259 enabled
    // AND the account joined the internal beta. Usually identical to
    // defaultValue; where it differs it reveals the intended rollout target.
    readonly debugDefaultValue: WaAbPropValue
}

export declare const WA_ABPROPS: {
${propsDtsBody}
}

export declare const WA_GROUP_ABPROPS: {
${groupPropsDtsBody}
}

export declare const WA_ABPROPS_BY_CODE: {
${byCodeDtsBody}
}

export declare const WA_GROUP_ABPROPS_BY_CODE: {
${groupByCodeDtsBody}
}

// Props the runtime permits reading before the config cache has resolved.
// Reading anything else that early logs a warning and yields the default.
export declare const WA_ABPROPS_USED_BEFORE_INIT: readonly [${usedBeforeInitDts}]

// Props mirrored into localStorage (as a JSON object under \`localStorageKey\`)
// so startup code can consult them before the IndexedDB store opens.
export declare const WA_ABPROPS_SPECIAL_EARLY: ${specialEarlyDts}

export type WaAbPropName = keyof typeof WA_ABPROPS
export type WaGroupAbPropName = keyof typeof WA_GROUP_ABPROPS

// --- Derived helpers ------------------------------------------------------

// Resolve a prop's decoded JS value type from its declared wire type.
export type WaAbPropValueOf<P> =
    P extends { type: 'bool' }
        ? boolean
        : P extends { type: 'int' | 'float' }
          ? number
          : P extends { type: 'string' }
            ? string
            : never

// Value type for a prop looked up by name — e.g.
// \`WaAbPropValueByName<'web_image_max_edge'>\` resolves to \`number\`.
export type WaAbPropValueByName<K extends WaAbPropName> = WaAbPropValueOf<(typeof WA_ABPROPS)[K]>

export type WaGroupAbPropValueByName<K extends WaGroupAbPropName> = WaAbPropValueOf<
    (typeof WA_GROUP_ABPROPS)[K]
>
`
    fs.writeFileSync(path.join(outDir, 'index.d.ts'), dts)

    const summaryParts = [`${propNames.length} props`, `${groupPropNames.length} group props`]
    if (usedBeforeInitialization.length) summaryParts.push(`${usedBeforeInitialization.length} early-read`)
    if (specialEarlyProps) summaryParts.push(`${specialEarlyProps.props.length} localStorage-mirrored`)
    if (diagnostics.errors.length) {
        summaryParts.push(
            `${diagnostics.errors.length} errored (${diagnostics.errors
                .slice(0, 3)
                .map((e) => `${e.module}: ${e.error}`)
                .join('; ')}${diagnostics.errors.length > 3 ? '…' : ''})`
        )
    }
    if (diagnostics.typeMismatches.length) {
        summaryParts.push(
            `${diagnostics.typeMismatches.length} type mismatches (${diagnostics.typeMismatches
                .slice(0, 3)
                .map((m) => `${m.name}.${m.slot}`)
                .join(', ')}${diagnostics.typeMismatches.length > 3 ? '…' : ''})`
        )
    }
    if (diagnostics.duplicateCodes.length) {
        summaryParts.push(
            `${diagnostics.duplicateCodes.length} duplicate codes (${diagnostics.duplicateCodes
                .slice(0, 3)
                .map((d) => `${d.code}: ${d.names.join('/')}`)
                .join(', ')}${diagnostics.duplicateCodes.length > 3 ? '…' : ''})`
        )
    }
    console.log(`apply: ${summaryParts.join(' / ')} → ${outDir}/{index.json,index.js,index.d.ts}`)
}

main()
