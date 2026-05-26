#!/usr/bin/env node
'use strict'

/**
 * Reads raw WA Web bundle .js files from a directory, runs the static XML
 * stanza extractor over them, and writes three artifacts to the package root:
 *
 *   - index.json   raw IR (per-operation schema trees, for non-TS consumers)
 *   - index.js     CommonJS runtime (frozen WA_XML_OPERATIONS)
 *   - index.d.ts   TypeScript types (per-op request + response shape literals)
 *
 * Usage:
 *   npx wa-xml apply --bundles dump/raw/<wa-version>/
 *   npx wa-xml apply --manifest dump/manifest.json
 */

const fs = require('node:fs')
const path = require('node:path')
const { extractXml, buildModuleIndex } = require('./extract-xml.cjs')
const { extractNonIq } = require('./extract-non-iq.cjs')
const { resolveEnumsInIR } = require('./resolve-enums.cjs')

function parseArgs(argv) {
    const opts = { bundles: null, manifest: null, out: null, waVersion: null }
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--bundles') opts.bundles = argv[++i]
        else if (a === '--manifest') opts.manifest = argv[++i]
        else if (a === '--out') opts.out = argv[++i]
        else if (a === '--wa-version') opts.waVersion = argv[++i]
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
            'usage: wa-xml apply (--bundles <dir> | --manifest <file>) [--out <dir>] [--wa-version <ver>]',
            '',
            '  --bundles <dir>     directory containing raw .js bundle dumps',
            '  --manifest <file>   read rawDir + waVersion from this manifest.json',
            '  --out <dir>         output directory (default: <pkg> root)',
            '  --wa-version <ver>  pin the version stamped into output headers'
        ].join('\n')
    )
}

function loadBundles(dir) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
        console.error(`bundles dir not found: ${dir}`)
        process.exit(1)
    }
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'))
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

function quote(s) {
    return `'${String(s).replace(/'/g, "\\'")}'`
}

function keyLiteral(name) {
    return /^[A-Za-z_$][\w$]*$/.test(name) ? name : quote(name)
}

// --- TS emitter ------------------------------------------------------------

// Emit an attr value as a TS type fragment.
function emitAttrType(attr) {
    if (!attr) return 'unknown'
    if (attr.type === 'literal') return quote(attr.value)
    switch (attr.type) {
        case 'string':
        case 'jid':
        case 'userJid':
        case 'deviceJid':
        case 'groupJid':
        case 'newsletterJid':
        case 'broadcastJid':
        case 'callJid':
        case 'phoneUserJid':
        case 'lidUserJid':
        case 'phoneDeviceJid':
        case 'lidDeviceJid':
        case 'stanzaId':
        case 'smaxId':
        case 'callId':
            return 'string'
        case 'int':
        case 'longInt':
            return attr.type === 'longInt' ? 'string' : 'number'
        case 'bool':
            return 'boolean'
        case 'bytes':
            return 'Uint8Array'
        case 'enum':
            return 'string'
        default:
            return 'unknown'
    }
}

// Build the attrs portion of an element type. Required attrs first.
function emitAttrsType(attrs, indent) {
    const keys = Object.keys(attrs || {})
    if (keys.length === 0) return '{}'
    const inner = indent + '    '
    const lines = keys.map((k) => {
        const a = attrs[k]
        const opt = a.optional ? '?' : ''
        return `${inner}readonly ${keyLiteral(k)}${opt}: ${emitAttrType(a)}`
    })
    return `{\n${lines.join('\n')}\n${indent}}`
}

// Emit a child element as a TS type fragment, honouring its cardinality.
// Children from `smax(parent, attrs, ...nested)` carry no min/max (each is
// exactly-one); cardinality only appears when the IR was produced by a
// `WASmaxChildren.*` helper or a `mapChildrenWithTag(...,min,max,...)` parse.
function emitChildType(child, indent) {
    if (!child || child.tag == null) return 'unknown'
    const elementType = emitElementType(child, indent)
    const hasMax = typeof child.max === 'number'
    const hasMin = typeof child.min === 'number'
    if (!hasMax && !hasMin) return elementType
    if (child.max === 1) {
        return child.min === 0 ? `${elementType} | undefined` : elementType
    }
    return `ReadonlyArray<${elementType}>`
}

function emitElementType(node, indent) {
    if (!node) return 'unknown'
    const inner = indent + '    '
    const attrs = emitAttrsType(node.attrs || {}, inner)
    const fields = [`${inner}readonly tag: ${quote(node.tag ?? '')}`]
    if (Object.keys(node.attrs || {}).length > 0) {
        fields.push(`${inner}readonly attrs: ${attrs}`)
    }
    if ((node.children || []).length > 0) {
        const childLines = (node.children || []).map((c) => {
            const tag = c.tag ?? '?'
            return `${inner}    readonly ${keyLiteral(tag)}: ${emitChildType(c, inner + '    ')}`
        })
        fields.push(`${inner}readonly children: {\n${childLines.join('\n')}\n${inner}}`)
    }
    if (node.content) {
        fields.push(
            `${inner}readonly content: ${emitContentType(node.content)}${node.content.optional ? ' | undefined' : ''}`
        )
    }
    return `{\n${fields.join('\n')}\n${indent}}`
}

function emitContentType(content) {
    if (!content) return 'unknown'
    switch (content.type) {
        case 'string':
        case 'enum':
            return 'string'
        case 'bytes':
            return 'Uint8Array'
        case 'int':
            return 'number'
        default:
            return 'unknown'
    }
}

// --- JS emitter ------------------------------------------------------------

function emitJsValue(v) {
    if (v === null) return 'null'
    if (typeof v === 'string') return quote(v)
    if (typeof v === 'number' || typeof v === 'boolean') return String(v)
    if (Array.isArray(v)) {
        return `[${v.map(emitJsValue).join(', ')}]`
    }
    if (typeof v === 'object') {
        const entries = Object.entries(v).map(([k, vv]) => `${keyLiteral(k)}: ${emitJsValue(vv)}`)
        return `{ ${entries.join(', ')} }`
    }
    return 'null'
}

// Walk every stanza variant in the IR. When a variant has `delegatesToRPC`
// (one ref or an array of them) AND no inline tree of its own, pull the
// tree from the corresponding Phase-1 operation's response and graft it
// onto the variant's `node`. For multi-RPC delegates (e.g.
// `link_code_companion_reg` dispatches on `stage` to two RPCs) the inlined
// tree is wrapped in `__variants` so consumers see all alternatives.
function inlineDelegatedStanzaTrees(ir) {
    const opByModule = new Map()
    for (const op of Object.values(ir.operations || {})) {
        if (op.module) opByModule.set(op.module, op)
    }
    function treeOf(ref) {
        const op = opByModule.get(ref.module)
        if (!op) return null
        const resp = (op.responses || []).find((r) => r.node)
        return resp ? resp.node : null
    }
    function outgoingOf(ref) {
        const op = opByModule.get(ref.module)
        if (!op || !op.outgoingResponses) return null
        return op.outgoingResponses.map((r) => ({
            module: r.module,
            variant: r.variant,
            node: r.node
        }))
    }
    function inlineOne(entry) {
        if (!entry || !entry.delegatesToRPC) return
        const refs = Array.isArray(entry.delegatesToRPC)
            ? entry.delegatesToRPC
            : [entry.delegatesToRPC]
        const trees = refs.map((r) => ({ ref: r, tree: treeOf(r), out: outgoingOf(r) })).filter((x) => x.tree)
        if (trees.length === 0) return
        // When the handler already produced its own parser tree (Tier 1), the
        // RPC tree is strictly richer — it captures the post-dispatch inner
        // shape. Replace the empty/sparse parser tree with the RPC tree(s).
        if (trees.length === 1) {
            entry.node = trees[0].tree
            entry.inlinedFrom = trees[0].ref
            if (trees[0].out && trees[0].out.length) entry.inlinedOutgoingResponses = trees[0].out
            return
        }
        // Multi-delegate: surface as an N-way union under a synthetic root.
        const rootTag = trees[0].tree.tag
        entry.node = {
            tag: rootTag,
            attrs: {},
            children: [],
            content: null,
            __unionOfDelegates: trees.map((t, i) => ({
                ref: t.ref,
                node: t.tree,
                ...(t.out && t.out.length ? { outgoingResponses: t.out } : {})
            }))
        }
    }
    for (const entry of Object.values(ir.stanzas || {})) {
        if (entry.variants) for (const v of Object.values(entry.variants)) inlineOne(v)
        else inlineOne(entry)
    }
}

// Some stanza handlers delegate inner-child parsing to a sub-RPC that
// nobody else consumes (notification/business children: ctwa_suggestion,
// wa_ad_account_nonce, mm_campaign, privacy → each handed to a per-child
// Smax RPC that takes the WHOLE outer stanza). The handler-side child is
// an empty stub because the walker only sees `hasChild + parse<X>(e)`; the
// real schema lives in the RPC tree. Graft the RPC's matching child onto
// the variant child when the variant child is a stub and the RPC's outer
// tag + `type` literal match the variant.
function graftDanglingIncomingRpcChildren(ir) {
    const opByModule = new Map()
    for (const op of Object.values(ir.operations || {})) {
        if (op.module) opByModule.set(op.module, op)
    }
    const consumedModules = new Set()
    const collect = (v) => {
        if (!v) return
        if (v.delegatesToRPC) {
            const arr = Array.isArray(v.delegatesToRPC) ? v.delegatesToRPC : [v.delegatesToRPC]
            for (const r of arr) consumedModules.add(r.module)
        }
        if (v.inlinedFrom) consumedModules.add(v.inlinedFrom.module)
        if (v.node?.__unionOfDelegates) for (const d of v.node.__unionOfDelegates) consumedModules.add(d.ref?.module)
    }
    for (const entry of Object.values(ir.stanzas || {})) {
        if (entry.variants) for (const v of Object.values(entry.variants)) collect(v)
        else collect(entry)
    }
    // Find incoming-only RPCs (no request side) that nobody linked.
    const dangling = []
    for (const op of Object.values(ir.operations || {})) {
        if (!op.module) continue
        if (consumedModules.has(op.module)) continue
        if (op.request) continue
        const node = op.responses?.[0]?.node
        if (!node || !node.tag) continue
        dangling.push({ op, node })
    }
    const isStub = (n) => n && !n.content
        && (!n.attrs || Object.keys(n.attrs).length === 0)
        && (!n.children || n.children.length === 0)
    for (const { op, node } of dangling) {
        const rootTag = node.tag
        const stanza = ir.stanzas?.[rootTag]
        if (!stanza) continue
        const typeAttr = node.attrs?.type
        const typeVal = (typeAttr && typeAttr.type === 'literal') ? typeAttr.value : null
        // Pick the variant: by type literal, otherwise the bare entry.
        const target = (stanza.variants && typeVal) ? stanza.variants[typeVal] : stanza
        if (!target?.node?.children) continue
        for (const rpcChild of node.children || []) {
            if (!rpcChild.tag || rpcChild.tag === '*') continue
            const existing = target.node.children.find((c) => c.tag === rpcChild.tag)
            if (existing && isStub(existing)) {
                Object.assign(existing, rpcChild)
                target.node.graftedFromRPCs = target.node.graftedFromRPCs || []
                target.node.graftedFromRPCs.push({ child: rpcChild.tag, module: op.module })
            }
        }
    }
}

// Flag empty children (no attrs, no kids, no content) as `presence: true` —
// these are protocol presence markers where the existence of the tag IS the
// signal (e.g. `<priority_offline_complete/>`, `<plaintext/>`, `<identity/>`).
// Distinguishes intentional empty stubs from extractor misses (of which
// there are none — quality metrics confirm 0 unknown / tagless / missing).
function markPresenceMarkers(ir) {
    function visit(n) {
        if (!n) return
        if (n.children) for (const c of n.children) {
            const a = Object.keys(c.attrs || {}).length
            const k = (c.children || []).length
            if (a === 0 && k === 0 && !c.content && c.tag && c.tag !== '*') {
                c.presence = true
            }
            visit(c)
        }
        if (n.__unionOfDelegates) for (const d of n.__unionOfDelegates) visit(d.node)
    }
    for (const op of Object.values(ir.operations || {})) {
        if (op.request?.node) visit(op.request.node)
        for (const r of op.responses || []) visit(r.node)
    }
    for (const e of Object.values(ir.stanzas || {})) {
        if (e.variants) for (const v of Object.values(e.variants)) visit(v.node)
        else visit(e.node)
    }
}

// Every stanza variant's root node must be tagged with the dispatch root
// tag (`notification` / `receipt` / `ib` / …). Handlers that parse the
// stanza without ever calling `assertTag` leave the root null — we pin it
// here so the tree reads correctly without consumers having to chase the
// dispatch back.
function pinRootStanzaTags(ir) {
    for (const [tag, entry] of Object.entries(ir.stanzas || {})) {
        const fix = (e) => {
            if (e?.node && !e.node.tag) e.node.tag = tag
        }
        if (entry.variants) for (const v of Object.values(entry.variants)) fix(v)
        else fix(entry)
    }
}

// For every `stanzas.<root>.variants.<value>` entry, the matched attr is
// pinned by the dispatch case — `case "picture":` means the inbound stanza
// always has `type="picture"`. Promote that attr to a `literal` when the
// extractor only captured it as a generic `string` (handlers that walk
// `e.attrs.type` manually fall into this bucket).
//
// We only pin REAL wire-attribute discriminators (`type` is the only one
// in the WA dispatch). The synthetic `condition` discriminator used for
// gated handlers (e.g. `message` routing on `from-is-newsletter`) is NOT
// a wire attribute — its value is a derived predicate label, not an attr.
function pinDiscriminatorAttrs(ir) {
    const realWireAttrs = new Set(['type'])
    // Condition-style keys are predicate labels emitted by the dispatch
    // walker for gated handlers (e.g. `is-call-receipt`, `from-is-newsletter`,
    // `is-not-call-receipt`). They are NOT the wire value of the discriminator
    // attr — pinning them as literals would lie about the protocol.
    const isConditionKey = (k) => /^(is-|from-is-|is-not-)/.test(k)
    for (const entry of Object.values(ir.stanzas || {})) {
        if (!entry.variants || !entry.discriminator) continue
        if (!realWireAttrs.has(entry.discriminator)) continue
        for (const [value, v] of Object.entries(entry.variants)) {
            if (!v) continue
            const node = v.node
            if (!node || !node.attrs) continue
            const existing = node.attrs[entry.discriminator]
            // Skip if the parser already pinned it (`assertAttr` / `literal`).
            if (existing && existing.type === 'literal') continue
            // Only OVERRIDE when the existing entry is a generic string /
            // raw — a typed accessor (jid / int / enum / …) is more precise
            // than the discriminator literal, so leave those alone.
            if (existing && existing.type !== 'string') continue
            // Sub-variant keys use `<type>/<childTag>` to encode the
            // content-child-tag sub-discriminator (`encrypt/identity`,
            // `psa/surfaces`). The WIRE value of the `type` attr is the
            // OUTER part (`encrypt`, `psa`) — the child tag is a SEPARATE
            // wire constraint on the content. Strip the suffix.
            const outer = value.split('/')[0]
            if (isConditionKey(outer)) continue
            node.attrs[entry.discriminator] = { type: 'literal', value: outer }
        }
    }
}

function freezeJsValue(v) {
    if (v === null || typeof v !== 'object') return emitJsValue(v)
    if (Array.isArray(v)) {
        return `Object.freeze([${v.map(freezeJsValue).join(', ')}])`
    }
    const entries = Object.entries(v).map(
        ([k, vv]) => `${keyLiteral(k)}: ${freezeJsValue(vv)}`
    )
    return `Object.freeze({ ${entries.join(', ')} })`
}

// --- Main ------------------------------------------------------------------

function main() {
    const opts = parseArgs(process.argv)
    const bundles = loadBundles(opts.bundles)
    const waVersion = opts.waVersion ?? detectWaVersion(opts.bundles)
    const { operations, diagnostics } = extractXml(bundles)
    const nonIq = extractNonIq(bundles)

    const sortedKeys = Object.keys(operations).sort()
    const outDir = opts.out ? path.resolve(opts.out) : path.resolve(__dirname, '..')

    // Strip internal `__*` keys before emitting; preserve raw debug info in
    // index.json by serialising the full op (consumers can opt into it).
    const cleanOps = {}
    for (const key of sortedKeys) {
        cleanOps[key] = operations[key]
    }

    // ---- index.json (IR) ----
    const ir = {
        waVersion,
        operations: cleanOps,
        stanzas: nonIq?.stanzas ?? {}
    }

    // Inline-delegate pass: stanza variants that hand off to a Smax
    // `receive*RPC` (e.g. presence / chatstate / link_code_companion_reg /
    // hosted) get their `node` populated from the corresponding Phase-1
    // operation's response tree. `delegatesToRPC` is kept as a back-pointer
    // for traceability, but consumers no longer have to chase the ref to
    // get the schema.
    inlineDelegatedStanzaTrees(ir)

    // Graft incoming-only RPCs whose root tag + type match an existing
    // variant child, when that child is an empty stub. Catches sub-handler
    // delegations the Phase-2 walker couldn't see (notification/business
    // children: ctwa_suggestion / wa_ad_account_nonce / mm_campaign /
    // privacy; ib/client_expiration).
    graftDanglingIncomingRpcChildren(ir)

    // Mark empty-by-design children as `presence: true`. Many WA stanzas
    // carry information via the EXISTENCE of a child tag, not via any inner
    // data (e.g. `notification/encrypt/identity/identity` signals an e2e
    // identity-change; `ib/priority_offline_complete` signals end-of-offline-
    // queue; message `url_number`/`url_text`/`hsm`/`plaintext`/`biz/buttons`/
    // `biz/list` are all `hasChild` flags). Flag them explicitly so
    // consumers know "this is a presence marker, not a missing schema".
    markPresenceMarkers(ir)

    // Discriminator-literal pass: every entry under a `discriminator: "type"`
    // (or other) bucket is reached via `case "<value>":` — so the matched
    // attr is necessarily that literal on the wire. Pin it as such even
    // when the handler doesn't `assertAttr` it explicitly.
    pinDiscriminatorAttrs(ir)

    // Root-tag pass: any stanza variant whose root node is missing the tag
    // inherits the dispatch root tag.
    pinRootStanzaTags(ir)

    // Resolve every `enumRef` JS expression captured by the walkers to a
    // concrete `enumValues` array. The IR is mutated in place — leaves that
    // can't be traced (rare: refs into runtime-built tables) keep just
    // `enumRef` so consumers can still chase them by hand.
    const moduleIndex = buildModuleIndex(bundles)
    const enumStats = resolveEnumsInIR(ir, moduleIndex)

    fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(ir, null, 2) + '\n')

    // ---- index.js (CJS runtime) ----
    const jsLines = sortedKeys.map((k) => {
        const op = operations[k]
        const summary = {
            module: op.module,
            opName: op.opName,
            rootTag: op.rootTag,
            xmlns: op.xmlns,
            type: op.type,
            requestModule: op.request?.module ?? null,
            responseModules: op.responses.map((r) => r.module)
        }
        return `    ${keyLiteral(k)}: ${freezeJsValue(summary)}`
    })

    // Emit the non-IQ stanza dispatch summary alongside the IQ ops.
    const stanzaSummaryLines = []
    const sortedStanzaKeys = Object.keys(nonIq?.stanzas ?? {}).sort()
    for (const tag of sortedStanzaKeys) {
        const entry = nonIq.stanzas[tag]
        if (entry.variants) {
            const variants = {}
            for (const [type, v] of Object.entries(entry.variants)) {
                variants[type] = v?.handler
                    ? { module: v.handler.module, method: v.handler.method }
                    : null
            }
            stanzaSummaryLines.push(
                `    ${keyLiteral(tag)}: ${freezeJsValue({
                    tag,
                    discriminator: entry.discriminator,
                    variants
                })}`
            )
        } else {
            stanzaSummaryLines.push(
                `    ${keyLiteral(tag)}: ${freezeJsValue({
                    tag,
                    handler: entry.handler
                        ? { module: entry.handler.module, method: entry.handler.method }
                        : null
                })}`
            )
        }
    }

    const js = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}
'use strict'

const WA_XML_OPERATIONS = Object.freeze({
${jsLines.join(',\n')}
})

const WA_XML_STANZAS = Object.freeze({
${stanzaSummaryLines.join(',\n')}
})

module.exports = { WA_XML_OPERATIONS, WA_XML_STANZAS }
`
    fs.writeFileSync(path.join(outDir, 'index.js'), js)

    // ---- index.d.ts (TS types) ----
    const operationLines = sortedKeys.map((k) => {
        const op = operations[k]
        const reqType = op.request?.node ? emitElementType(op.request.node, '    ') : 'unknown'
        const respUnion =
            op.responses.length > 0
                ? op.responses
                      .map((r) => {
                          const inner = r.node ? emitElementType(r.node, '        ') : 'unknown'
                          return `        | { readonly variant: ${quote(r.variant)}; readonly value: ${inner} }`
                      })
                      .join('\n')
                : '        | never'
        return `    readonly ${keyLiteral(k)}: {
        readonly module: ${quote(op.module)}
        readonly opName: ${quote(op.opName ?? '')}
        readonly xmlns: ${op.xmlns ? quote(op.xmlns) : 'null'}
        readonly type: ${op.type ? quote(op.type) : 'null'}
        readonly request: ${reqType}
        readonly response:
${respUnion}
    }`
    })

    const dts = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}

export interface WaXmlOperationSummary {
    readonly module: string
    readonly opName: string
    readonly rootTag: string | null
    readonly xmlns: string | null
    readonly type: string | null
    readonly requestModule: string | null
    readonly responseModules: ReadonlyArray<string>
}

export declare const WA_XML_OPERATIONS: {
    readonly [K in WaXmlOperationKey]: WaXmlOperationSummary
}

export type WaXmlOperationKey = ${sortedKeys.map(quote).join(' | ') || 'string'}

// Per-operation request/response shape literals — generated from the static
// extraction over WASmaxOut*Request + WASmaxIn*Response* modules. Each
// response member of the union represents one of the parser variants the
// client tries in order; the \`variant\` discriminator tells you which one
// claimed the response.
export interface WaXmlOperations {
${operationLines.join('\n')}
}

// Server-initiated stanzas (everything that arrives outside the IQ
// request/response pipeline) get routed through the imperative dispatch
// table in WAWebCommsHandleLoggedInStanza. Each entry below either has
// a single \`handler\` (one root tag → one parser module) or a
// \`discriminator\` plus a \`variants\` map (sub-switch on the named attr,
// most commonly \`type\` for \`receipt\` / \`notification\`).
export interface WaXmlStanzaHandlerRef {
    readonly module: string
    readonly method: string
}

export type WaXmlStanzaEntry =
    | { readonly tag: string; readonly handler: WaXmlStanzaHandlerRef | null }
    | {
          readonly tag: string
          readonly discriminator: string
          readonly variants: Readonly<Record<string, WaXmlStanzaHandlerRef | null>>
      }

export declare const WA_XML_STANZAS: Readonly<Record<string, WaXmlStanzaEntry>>
`
    fs.writeFileSync(path.join(outDir, 'index.d.ts'), dts)

    const top3Err = diagnostics.errors
        .slice(0, 3)
        .map((e) => `${e.module}/${e.error}`)
        .join(', ')
    const errPart =
        diagnostics.rpcErrored > 0 ? ` (${diagnostics.rpcErrored} errored: ${top3Err}${diagnostics.rpcErrored > 3 ? '…' : ''})` : ''
    console.log(
        `apply: ${sortedKeys.length} operations / ${diagnostics.rpcModulesDiscovered} RPC modules${errPart} → ${outDir}/{index.json,index.js,index.d.ts}`
    )
    console.log(
        `apply: enums — ${enumStats.resolved} resolved / ${enumStats.unresolved} unresolved`
    )
    if (enumStats.unresolved > 0 && enumStats.unresolvedRefs.length) {
        const sample = enumStats.unresolvedRefs.slice(0, 3).join(', ')
        console.log(`        unresolved samples: ${sample}${enumStats.unresolvedRefs.length > 3 ? '…' : ''}`)
    }
    if (nonIq && nonIq.diagnostics) {
        const nd = nonIq.diagnostics
        const top3 = nd.errors
            .slice(0, 3)
            .map((e) => `${e.where}:${e.error}`)
            .join(', ')
        const errStr = nd.handlersErrored > 0
            ? ` (${nd.handlersErrored} errored: ${top3}${nd.handlersErrored > 3 ? '…' : ''})`
            : ''
        console.log(
            `apply: ${nd.rootTags} stanza root tags / ${nd.variantsTotal} variants / ${nd.handlersExtracted} handlers extracted${errStr}`
        )
    }
}

main()
