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
const { extractOutgoing } = require('./extract-outgoing.cjs')
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
        case 'time':
            // WhatsApp timestamps are unix-epoch ints serialised as decimal
            // strings on the wire; consumers receive them as numbers.
            return 'number'
        case 'bool':
            return 'boolean'
        case 'bytes':
            return 'Uint8Array'
        case 'enum':
            // Emit as a union of string literals when enumValues are
            // available. Falls back to `string` for the rare case where
            // we only have the enum reference but couldn't resolve the
            // value set.
            if (Array.isArray(attr.enumValues) && attr.enumValues.length > 0) {
                return attr.enumValues.map((v) => quote(String(v))).join(' | ')
            }
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
    // When the IR pinned a list of known tag alternatives onto a wildcard
    // child (via `__variants`), surface them as a union of string literals
    // instead of the bare `'*'` placeholder. Consumers can then switch on
    // the discriminator directly. The bare `*` is still allowed (server
    // may add new types) so we union the known set with `string`.
    const tagText =
        node.tag === '*' && Array.isArray(node.__variants) && node.__variants.length > 0
            ? node.__variants.map((v) => quote(v)).join(' | ')
            : quote(node.tag ?? '')
    const fields = [`${inner}readonly tag: ${tagText}`]
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
            return 'string'
        case 'enum':
            // Emit as a union of string literals when enumValues are
            // available — same behaviour as attr enums.
            if (Array.isArray(content.enumValues) && content.enumValues.length > 0) {
                return content.enumValues.map((v) => quote(String(v))).join(' | ')
            }
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

// Default the cardinality of child nodes that have no min/max/presence
// markers. The Phase-1 IQ-request walker pushes `smax(parent, attrs, child)`
// children without cardinality because smax constructs always emit exactly
// one of each listed child — `min: 1, max: 1` is the protocol-correct
// default. Same applies to outgoing-merged nodes from Phase 3 where the
// wap() builder layered a new child but didn't carry over cardinality.
// Skips children that already carry min/max OR a presence marker.
function defaultChildCardinality(ir) {
    let defaulted = 0
    function visit(node) {
        if (!node) return
        if (Array.isArray(node.children)) {
            for (const c of node.children) {
                if (!c || typeof c !== 'object' || !c.tag) continue
                if (typeof c.min !== 'number' && typeof c.max !== 'number' && !c.presence) {
                    c.min = 1
                    c.max = 1
                    defaulted++
                }
                visit(c)
            }
        }
        if (node.__unionOfDelegates) for (const d of node.__unionOfDelegates) visit(d.node)
    }
    for (const op of Object.values(ir.operations || {})) {
        if (op.request?.node) visit(op.request.node)
        for (const r of op.responses || []) visit(r.node)
    }
    for (const e of Object.values(ir.stanzas || {})) {
        if (e.variants) for (const v of Object.values(e.variants)) visit(v.node)
        else visit(e.node)
    }
    return defaulted
}

// Enrich `*`-tagged wildcard children with the known set of wire tags they
// can take, so consumers can see which discriminator values are possible
// without having to dig back into the WA source. Each entry maps a parent
// tag to the variant set. The wildcard child is replaced with a single child
// whose `tag` stays `*` but `__variants` lists the allowed wire-tag names.
//
// - `call/*`: the VoIP signaling sub-element (offer / accept / reject /
//   enc_rekey / etc.). Variant set comes from `WAWebVoipSignalingEnums.TYPE`
//   downcased to wire form. `NONE` and `MAX` are sentinels and skipped.
// - `dirty/*`: dirty-bit account_sync sub-tags. Variant set comes from
//   `WAWebDirtyBitsConsts.SUPPORTED_DIRTY_PROTOCOLS`.
const WILDCARD_VARIANTS = {
    call: [
        'offer', 'offer_receipt', 'accept', 'reject', 'terminate', 'transport',
        'offer_ack', 'offer_nack', 'relay_latency', 'relay_election',
        'interruption', 'mute', 'preaccept', 'accept_receipt', 'video_state',
        'notify', 'group_info', 'enc_rekey', 'peer_state', 'video_state_ack',
        'flow_control', 'web_client', 'accept_ack', 'group_update',
        'offer_notice'
    ],
    dirty: ['devices', 'picture', 'privacy', 'blocklist', 'notice'],
}

// Promote attrs that are known to be enums (from a JS-source constants
// module) but were captured as plain `string` because the parser used
// `attrString` instead of `attrStringEnum`. This is a narrow companion to
// the wildcard variant set above — same name → same wire vocabulary.
const TAG_ATTR_ENUM_PROMOTIONS = {
    // `<dirty type="...">` carries one of the SUPPORTED_DIRTY_TYPE values.
    'dirty.type': ['groups', 'account_sync', 'syncd_app_state', 'newsletter_metadata'],
    // `<meta event_type="...">` uses `WAWebHandleMsgCommon.EVENT_TYPES` —
    // creation / response / edit.
    'meta.event_type': ['creation', 'edit', 'response'],
    // `<meta appdata="...">` uses `WAWebHandleMsgCommon.APPDATA` —
    // default / member_tag / group_history.
    'meta.appdata': ['default', 'group_history', 'member_tag'],
    // `<meta polltype="...">` uses `WAWebHandleMsgCommon.POLL_TYPES`.
    'meta.polltype': ['creation', 'edit', 'quiz_creation', 'result_snapshot', 'vote'],
    // `<meta origin="...">` uses `WAWebHandleMsgCommon.STANZA_MSG_ORIGIN`
    // (currently a single value but kept as enum for future-proofing).
    'meta.origin': ['ctwa'],
    // `<iq type=...>`: XMPP standard — get / set / result / error. Most
    // builders pin this to a literal, but a few request builders take it
    // as a runtime arg and the extractor leaves the IR with plain string.
    'iq.type': ['error', 'get', 'result', 'set'],
    // `<receipt type=...>` (non-call / non-retry path): the parser uses
    // `attrEnumOrNullIfUnknown` against `WAWebHandleMsgReceiptParser.
    // RECEIPT_TYPES_TO_ACK`. The `view` variant is added because
    // `<receipt class="status" type="view">` flows through the same path
    // (literal-pinned by the request builder but parsed by the same
    // map at receive time).
    'receipt.type': [
        'delivery', 'inactive', 'peer_msg', 'played', 'played-self',
        'read', 'read-self', 'sender', 'server-error', 'view',
    ],
    // `<receipt class=...>`: the receipt's parent-stanza class. Same
    // vocabulary as `<ack class=...>` (already enum-typed by the parser)
    // plus `status` from the `PublishView` builder.
    'receipt.class': ['call', 'message', 'notification', 'receipt', 'status'],
    // `<enc type=...>`: `WAWebBackendJobs.flow.CiphertextType` —
    // skmsg / pkmsg / msg / msmsg. The `<message><enc>` path is enum-typed
    // by the parser; the `<call><enc>` outgoing path uses an opaque arg.
    'enc.type': ['msg', 'msmsg', 'pkmsg', 'skmsg'],
    // `<meta session_scope=...>`: `WAWebSessionScope.SessionScope` —
    // default / status.
    'meta.session_scope': ['default', 'status'],
    // `<message edit=...>`: per WA wire dumps the literal values used are
    // 1, 2, 3, 7, 8. The parser uses `attrStringEnum` against an internal
    // EditType map; values surface as their decimal string form.
    'message.edit': ['1', '2', '3', '7', '8'],
    // `<link_create media=...>` and `<link_query media=...>`: voip link
    // signaling uses `WASmaxInVoipEnums.ENUM_AUDIO_VIDEO`.
    'link_create.media': ['audio', 'video'],
    'link_query.media': ['audio', 'video'],
    // `<link_query action=...>`: voip link query action discriminator
    // (`WASmaxInVoipEnums.ENUM_LINKEDIT_PREVIEW`).
    'link_query.action': ['link_edit', 'preview'],
    // `<smb_data_sharing_with_meta_consent value=...>`: tri-state consent
    // flag (`WASmaxInBizSettingsEnums.ENUM_FALSE_NOTSET_TRUE`).
    'smb_data_sharing_with_meta_consent.value': ['false', 'notset', 'true'],
    // `<bot v=...>`: bot-list API version selector — 2 / 3 (the response
    // variants pin these as literals; the request builder uses an arg).
    'bot.v': ['2', '3'],
    // `<message type=...>`: same `STANZA_MSG_TYPES` enum the parser uses on
    // the `from-is-not-newsletter` path. Surfaces here for the PSA-message
    // inner element which the deprecated wap-parser reads via `attrString`.
    'message.type': ['event', 'media', 'medianotify', 'pay', 'poll', 'reaction', 'text'],
    // `<media type=...>` / `<media_list type=...>`: `WASmaxInBizCtwaNativeAd
    // Enums.ENUM_IMAGE_VIDEO`.
    'media.type': ['image', 'video'],
    'media_list.type': ['image', 'video'],
    // `<custom_payment_method type=...>` / `flow=...>`: enums from
    // `WASmaxInBrPaymentEnums.ENUM_PAYONDELIVERY_PIXKEY` / `ENUM_P2M_P2P`.
    'custom_payment_method.type': ['pay_on_delivery', 'pix_key'],
    'custom_payment_method.flow': ['p2m', 'p2p'],
    // `<ack type=...>`: same notification-type enum the parser uses on the
    // ack stanza root. The PublishView response goes through a different
    // path (literal pinning) but the wire value falls into the same set.
    'ack.type': [
        'account_sync', 'business', 'companion_reg_refresh', 'contacts',
        'digital_commerce_subscription', 'disappearing_mode', 'mediaretry',
        'mex', 'offer_notice', 'pay', 'picture', 'privacy_token', 'psa',
        'registration', 'retry', 'server', 'server_sync', 'status', 'text',
        'w:gp2',
    ],
    // `<presence type=...>`: outgoing presence builder uses CUSTOM_STRING
    // but the XMPP-wire value is one of available / unavailable / subscribe
    // / unsubscribe (WA's incoming parser only checks for the last two).
    'presence.type': ['available', 'subscribe', 'unavailable', 'unsubscribe'],
    // `<unavailable type=...>` on incoming messages: the parser checks
    // `unavailable.type === "view_once"` as a marker for view-once
    // messages whose ciphertext is unavailable.
    'unavailable.type': ['view_once'],
    // `<bot edit=...>` carries `WAWebBotTypes.BotMsgEditType` —
    // first / inner / last / full.
    'bot.edit': ['first', 'full', 'inner', 'last'],
    // `<bot biz_bot=...>` parsed via `.attrString === "1"|"3"` — those map
    // to `WAWebBotTypes.BizBotType` (biz_1p / biz_3p) but the wire value
    // is the bare numeric tier.
    'bot.biz_bot': ['1', '3'],
    // `<bot type=...>` parsed via `WAWebBotTypes.BotMsgBodyType.cast` —
    // prompt / command / voice.
    'bot.type': ['command', 'prompt', 'voice'],
    // `<bot persona_type=...>` from `WAWebBotTypes.BotPersonaType`
    // — default / ugc / 1p.
    'bot.persona_type': ['1p', 'default', 'ugc'],
    // `<bot local_automated_type=...>` from
    // `WAWebBotTypes.BizBotAutomatedType` — unknown / 1p_partial / 3p_full.
    'bot.local_automated_type': ['1p_partial', '3p_full', 'unknown'],
    // `<subscription source=...>` from `WAWebSubscriptionSource.
    // SubscriptionSource` — AURA / META_NOVA / BLUE / PREMIUM (the parser
    // checks for these exact uppercase strings).
    'subscription.source': ['AURA', 'BLUE', 'META_NOVA', 'PREMIUM'],
    // `<addressing_mode_override mode=...>`: same vocabulary as
    // `addressing_mode` itself (LID / PN) — set when the client wants to
    // override a chat's default mode.
    'addressing_mode_override.mode': ['lid', 'pn'],
    // `<item action=...>` in blocklist / opt-out-list contexts: WA only
    // ever sends `block` or `unblock` here (parsers check
    // `action === "block"` and builders pin `block` / `unblock`).
    'item.action': ['block', 'unblock'],
    // `<enc state=...>` carries the stateless flag — parser checks
    // `state === "false"` (so the wire is the literal string).
    'enc.state': ['false', 'true'],
    // `<user state=...>` on account-sync notifications carries
    // `"AI available"` per the parser (currently the only checked value;
    // wire vocabulary may grow but this is the known set).
    'user.state': ['AI available'],
    // `<error reason=...>` inside `<receipt>`: parser checks
    // `reason === "lid"` (coupled with `type === "feature-incapable"`)
    // — currently the only value the client recognises here.
    'error.reason': ['lid'],
    // `<enc decrypt-fail=...>`: parser checks `=== "hide"` to suppress the
    // user-visible decrypt-failure indicator; absent means surface normally.
    'enc.decrypt-fail': ['hide'],
    // `<invite invite-used=...>`: parser checks `=== "1"` — boolean flag
    // for whether the payment invite has been used (1 = used; 0 / absent
    // = unused).
    'invite.invite-used': ['0', '1'],
    // `<feature_flag name=...>` from `WAWebFeatureFlagName.FeatureFlagName`
    // — superset of all known feature-flag tokens the client recognises.
    'feature_flag.name': [
        'ADS_CREDIT', 'BUSINESS_BROADCAST', 'BUSINESS_SEARCH',
        'CHAT_ASSIGNMENT', 'CUSTOM_APP_ICON', 'CUSTOM_APP_THEME',
        'CUSTOM_RINGTONES', 'CUSTOM_URL', 'ENHANCED_LISTS', 'IMAGE_GEN',
        'IMAGINE_IMAGE', 'IMAGINE_VIDEO', 'MD_EXTENSION', 'NEW_CHATS_LIMIT',
        'NEXT_GEN_WA_BENEFIT', 'PIN_MORE_CHATS', 'PREMIUM_MESSAGE_STICKERS',
        'PROTECTED_BUSINESS_ACCOUNT', 'THINK_HARD', 'VERIFIED_CHANNEL',
    ],
    // `<error text=...>`: across 142 IQ-response error variants the wire
    // value comes from a fixed set of XMPP-derived error labels. Surface
    // the superset here so untyped occurrences narrow from `string` to
    // this union; consumers still need RPC context to know which subset
    // applies in a given branch.
    'error.text': [
        'INCORRECT_NONCE', 'TOO_MANY_ATTEMPTS', 'already-exists', 'bad-request',
        'conflict', 'feature-not-implemented', 'forbidden', 'gone',
        'internal-server-error', 'item-not-found', 'not-acceptable',
        'rate-overlimit', 'service-unavailable',
    ],
    // `<picture type=...>`: profile-picture queries pick either the full
    // image or just the preview thumbnail.
    'picture.type': ['image', 'preview'],
    // `<spam_list spam_flow="...">`: outgoing spam reports tag the flow that
    // triggered the report. Values come from `WAWebSpamConstants.SpamFlow`.
    'spam_list.spam_flow': [
        '1_1_old_spam_banner_block', '1_1_spam_banner_report',
        'account_info_report', 'account_info_report_as_guest_user',
        'biz_spam_banner_block', 'block_dialog',
        'chat_fmx_card_report_as_guest_user',
        'chat_fmx_card_safety_tools_report',
        'chat_fmx_card_safety_tools_report_suspicious',
        'chat_list_block', 'chat_list_noinsub_block',
        'comment_actions_bottom_sheet', 'community_home',
        'extension_menu_report', 'group_chatlist_leave_report_upsell',
        'group_fmx_card_leave', 'group_fmx_card_leave_non_suspicious',
        'group_info_leave_report_upsell', 'group_info_report',
        'group_overflow_menu_leave_report_upsell',
        'group_safety_check_bottom_sheet', 'group_spam_banner_report',
        'media_viewer', 'message_menu', 'newsletter_info_report',
        'newsletter_question_response_report', 'notification_block',
        'overflow_menu_block', 'overflow_menu_report', 'status_post_report',
    ],
}

// Per-tag content enum promotions — promote `content.type === 'string'`
// to `enum` when the tag's content carries a known JS-source enum set.
const TAG_CONTENT_ENUM_PROMOTIONS = {
    // `<status>` inside `<product_catalog/collection/status_info/>`: the
    // parser feeds the content string through
    // `WAWebProductTypes.flow.asProductReviewType` —
    // APPROVED / PENDING / REJECTED.
    'status': ['APPROVED', 'PENDING', 'REJECTED'],
}

// Promote attrs to literals when their `arg` field references a known
// JS-source constant whose value we've manually resolved. Keyed by
// `tag.attr → { argMatch, value }` so we only promote when the IR already
// flagged the call site as using that specific constant — promoting
// blindly on the tag+attr name would lie about incoming-side attrs that
// share the name but carry different wire values.
const TAG_ATTR_LITERAL_PROMOTIONS = {
    // `<meta type=...>`: the sender always pins this to "scheduled_message"
    // (`WAWebScheduledMsgConstants.SCHEDULED_MSG_META_TYPE`).
    'meta.type': {
        argMatch: /SCHEDULED_MSG_META_TYPE/,
        value: 'scheduled_message',
    },
    // `<enc v=...>`: pinned to the current E2E ciphertext version
    // (`WAWebBackendJobsCommon.CIPHERTEXT_VERSION.toString()` → "2" in
    // this WA build).
    'enc.v': {
        argMatch: /CIPHERTEXT_VERSION/,
        value: '2',
    },
}
function enrichWildcardChildren(ir) {
    let enriched = 0
    let attrEnums = 0
    let attrLiterals = 0
    let contentEnums = 0
    function visit(node) {
        if (!node) return
        // Promote string content to enum when the tag's content is known
        // to come from a fixed JS-source value set.
        if (
            node.content &&
            node.content.type === 'string' &&
            node.tag &&
            TAG_CONTENT_ENUM_PROMOTIONS[node.tag]
        ) {
            node.content = {
                ...node.content,
                type: 'enum',
                enumValues: TAG_CONTENT_ENUM_PROMOTIONS[node.tag],
            }
            contentEnums++
        }
        // Promote string attrs to enums where the (tag, attr) pair maps to a
        // known constant set in the JS source.
        if (node.attrs && node.tag) {
            for (const [name, attr] of Object.entries(node.attrs)) {
                const key = node.tag + '.' + name
                if (TAG_ATTR_ENUM_PROMOTIONS[key] && attr.type === 'string') {
                    attr.type = 'enum'
                    attr.enumValues = TAG_ATTR_ENUM_PROMOTIONS[key]
                    attrEnums++
                    continue
                }
                const litRule = TAG_ATTR_LITERAL_PROMOTIONS[key]
                if (
                    litRule &&
                    attr.type === 'string' &&
                    typeof attr.arg === 'string' &&
                    litRule.argMatch.test(attr.arg)
                ) {
                    attr.type = 'literal'
                    attr.value = litRule.value
                    attrLiterals++
                }
            }
        }
        if (Array.isArray(node.children)) {
            for (const c of node.children) {
                if (c?.tag === '*' && WILDCARD_VARIANTS[node.tag]) {
                    if (!Array.isArray(c.__variants)) {
                        c.__variants = WILDCARD_VARIANTS[node.tag]
                        enriched++
                    }
                }
                visit(c)
            }
        }
        if (node.__unionOfDelegates) for (const d of node.__unionOfDelegates) visit(d.node)
    }
    for (const op of Object.values(ir.operations || {})) {
        if (op.request?.node) visit(op.request.node)
        for (const r of op.responses || []) visit(r.node)
    }
    for (const e of Object.values(ir.stanzas || {})) {
        if (e.variants) for (const v of Object.values(e.variants)) visit(v.node)
        else visit(e.node)
    }
    return { enriched, attrEnums, attrLiterals, contentEnums }
}

// Promote attrs that are universally typed on the WhatsApp wire but were
// captured as generic `string` because the parsing helper used was
// `attrString` (or because a manual `e.attrs.X` access ran through the
// `inferRawAttrType` fallback). The promotion is narrowly scoped:
//   - applies ONLY when the existing entry is `{ type: 'string' }` (no enum,
//     literal, jid, int, …)
//   - keeps the `optional` / `arg` / `direction` fields if present
//   - is gated by attr name; tag name is checked only for `from`/`to`/`id`
//     which are XMPP-routing attrs and ONLY meaningful on stanza roots
// Rationale: the parser quirk (attrString instead of attrJid for `from`) makes
// the schema lie about wire types. Same for unmistakable int attrs like `t`
// (timestamp) — every WA stanza on the wire encodes `t` as a decimal integer.
const STANZA_ROOT_TAGS_FOR_ROUTING = new Set([
    'iq', 'message', 'presence', 'receipt', 'notification', 'ack',
    'call', 'chatstate', 'ib', 'failure', 'success', 'error', 'stream:error'
])
const NAME_BASED_PROMOTIONS = {
    // Always-int wire attrs. Conservative — `count` is omitted because some
    // stanzas (e.g. `<query count="foo">`) use it as a value label, not a
    // numeric count. `version` is always a positive int on the WA wire
    // (config / disclosure / account_sync).
    int: new Set([
        't', 'ts', 'expiration', 'expires_at', 'expiry', 'duration', 'e',
        'last_seen', 'last_active', 'start_time', 'end_time',
        'valid_seconds', 'epoch', 'version', 'limit', 'offline',
        'key-index', 'ephemeral_duration_sec',
    ]),
    // Always-jid wire attrs — even outside the root-tag check, these names
    // are universal.
    jid: new Set(['jid', 'creator_jid', 'admin_jid', 'author']),
    userJid: new Set([
        'participant_pn', 'recipient_pn', 'peer_pn', 'target_pn', 'user_pn',
        'creator_pn', 'caller_pn',
    ]),
    // `*_lid` attrs always point to LID-domain user JIDs by WA convention.
    // Bare `lid` is the LID-domain user JID assigned to the account (on
    // login or device-list sync notifications).
    lidUserJid: new Set(['sender_lid', 'peer_recipient_lid', 'lid']),
    // Universal-bool attrs. On the WA wire bools are emitted as the literal
    // strings "true"/"false" (or sometimes "0"/"1") — typing them as `bool`
    // tells consumers to parse rather than treat as opaque text. The names
    // below are unambiguous flags; do NOT add multi-state words like `state`
    // or `mode` here, since those carry enum strings.
    bool: new Set([
        'enabled', 'is_lid', 'is_known_chat', 'is_bug_reporter',
        'is_group_status', 'should_show_push_notification',
        'privacy_sensitive', 'capi', 'status_mentioned', 'hosted',
    ]),
}
// Universally-bool name patterns — names following `is_<thing>`, `has_<thing>`,
// `can_<thing>`, `should_<thing>` are by WA convention boolean flags. Tested
// in addition to the explicit `NAME_BASED_PROMOTIONS.bool` set above so new
// attrs entering the IR with these prefixes auto-promote without needing a
// schema update.
const BOOL_NAME_RE = /^(is|has|can|should)_[a-z][a-z0-9_]*$/

// Universal-enum attrs — attr name → known enum value set. WA reuses the
// same attr names across multiple parsers; some sites correctly call
// `attrStringEnum` (and surface as `enum` in the IR) while others use the
// untyped `attrString` or build via a `wap()` arg with an opaque variable.
// This map fills the latter case so consumers see the same enum union
// everywhere the attr appears.
const UNIVERSAL_ENUM_PROMOTIONS = {
    // `WAWebHandleMsgCommon.STANZA_MSG_ADDRESSING_MODE` = { pn, lid }.
    addressing_mode: ['lid', 'pn'],
}

// Suffix-pattern promotions. WA's stanza vocabulary is consistent: any attr
// whose name ends in `_jid` carries a JID string, anything ending in `_time`
// or `_timestamp` carries a UNIX epoch int, `_count` / `_size` / `_limit` are
// numeric. Each pattern is checked against the attr name and the FIRST match
// wins (most specific suffix first).
const SUFFIX_PROMOTIONS = [
    { suffix: /_jid_(?:lid|pn)$/, type: 'userJid' },
    // Both `_jid` and `-jid` — kebab-case shows up on `<call>` inner
    // attrs (`group-jid`, `call-creator`-adjacent fields).
    { suffix: /[_-]jid$/, type: 'jid' },
    { suffix: /_(?:time|timestamp|at)$/, type: 'time' },
    { suffix: /_(?:count|size|total|num|limit|offset|age|index)$/, type: 'int' },
]

// Per-(tag, attr) promotions — used when the name is too ambiguous to promote
// universally but the surrounding tag gives a definite wire type. Keep this
// list tight: only add (tag, attr) pairs where the wire reality is
// unambiguous, not just "probably bool / probably jid".
const PER_TAG_PROMOTIONS = {
    // `<receiver user=…>` under `<invite>` in growth notifications carries
    // a user-JID identifying the invite target — the JS handler reads it
    // via `e.attrs.user` (no `attrUserJid` call) so the type fell through
    // to plain string.
    'receiver.user': 'userJid',
    // `<meta read=…>` on `<message>` is a boolean read-state flag set by
    // the sender ("true" / "false" on the wire). The handler grabs it as
    // `e.attrs.read` so the type defaults to string; tighten to bool.
    'meta.read': 'bool',
}
function promoteWellKnownAttrs(ir) {
    let promoted = 0
    function fix(name, attr, parentTag) {
        if (!attr || attr.type !== 'string') return
        // Per-(tag, attr) overrides take precedence — these are deliberate,
        // narrow rules that exist precisely because the universal name-based
        // checks are too ambiguous to apply broadly.
        const tagKey = `${parentTag}.${name}`
        if (PER_TAG_PROMOTIONS[tagKey]) {
            attr.type = PER_TAG_PROMOTIONS[tagKey]
            promoted++
            return
        }
        // Stanza-root routing attrs: from/to → jid, id → stanzaId,
        // participant/recipient → userJid (in WA the receipt/notification/
        // message stanzas use these as user-JID routing hints).
        if (STANZA_ROOT_TAGS_FOR_ROUTING.has(parentTag)) {
            if (name === 'from' || name === 'to') {
                attr.type = 'jid'
                promoted++
                return
            }
            if (name === 'id') {
                attr.type = 'stanzaId'
                promoted++
                return
            }
            if (name === 'participant' || name === 'recipient') {
                attr.type = 'userJid'
                promoted++
                return
            }
        }
        // Universal name-based promotions.
        for (const [t, set] of Object.entries(NAME_BASED_PROMOTIONS)) {
            if (set.has(name)) {
                attr.type = t
                promoted++
                return
            }
        }
        // Pattern-based bool promotion.
        if (BOOL_NAME_RE.test(name)) {
            attr.type = 'bool'
            promoted++
            return
        }
        // Universal-enum promotion (attr name → known wire value set).
        if (UNIVERSAL_ENUM_PROMOTIONS[name]) {
            attr.type = 'enum'
            attr.enumValues = UNIVERSAL_ENUM_PROMOTIONS[name]
            promoted++
            return
        }
        // Suffix-pattern promotions (jid / time / int).
        for (const { suffix, type } of SUFFIX_PROMOTIONS) {
            if (suffix.test(name)) {
                attr.type = type
                promoted++
                return
            }
        }
    }
    function visit(node) {
        if (!node) return
        if (node.attrs) {
            for (const [name, attr] of Object.entries(node.attrs)) {
                fix(name, attr, node.tag)
            }
        }
        if (node.children) for (const c of node.children) visit(c)
        if (node.__unionOfDelegates) for (const d of node.__unionOfDelegates) visit(d.node)
    }
    for (const op of Object.values(ir.operations || {})) {
        if (op.request?.node) visit(op.request.node)
        for (const r of op.responses || []) visit(r.node)
    }
    for (const e of Object.values(ir.stanzas || {})) {
        if (e.variants) for (const v of Object.values(e.variants)) visit(v.node)
        else visit(e.node)
    }
    return promoted
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

    // Build the module index once — both Phase 3 and the enum resolver
    // need it to look up `__d("Mod", ...)` definitions by name.
    const moduleIndex = buildModuleIndex(bundles)

    // Phase 3 — outgoing message-construction merge. The incoming parsers
    // never see write-only attrs (`sender_intent`, `view_once`,
    // `destination_id`, `conversation_thread_id`, `tag_reason`, etc.) that
    // the client sets when SENDING. Walk the handpicked `WAWebSend*` /
    // `WAWebEncryptAndSend*` modules for `wap("<tag>", {attrs}, ...children)`
    // calls and merge onto the matching stanza node with `direction: "out"`.
    const outgoingStats = extractOutgoing(ir, moduleIndex)

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

    // Name-based wire-type promotion. The IQ-response parsers often grab
    // `from` / `to` via `attrString` and routing attrs leak into the IR as
    // plain `string`. Walk the tree and upgrade the universally-typed
    // routing/timestamp attrs (from/to → jid, id → stanzaId on stanza roots;
    // t/ts/expiration → int everywhere).
    const promotedAttrs = promoteWellKnownAttrs(ir)

    // Default cardinality for children the request-side smax walker
    // pushed without min/max — those constructors always emit exactly
    // one of each listed child, so the protocol-correct default is
    // `min: 1, max: 1` (also applies to a handful of outgoing-merged
    // response/stanza nodes).
    const defaultedChildren = defaultChildCardinality(ir)

    // Enrich `*` wildcard children with the known list of wire tag names
    // they can take, AND promote known string attrs to enums / literals
    // where the (tag, attr) pair maps to a JS-source constant.
    const {
        enriched: enrichedWildcards,
        attrEnums: enrichedAttrEnums,
        attrLiterals: enrichedAttrLiterals,
        contentEnums: enrichedContentEnums,
    } = enrichWildcardChildren(ir)

    // Resolve every `enumRef` JS expression captured by the walkers to a
    // concrete `enumValues` array. The IR is mutated in place — leaves that
    // can't be traced (rare: refs into runtime-built tables) keep just
    // `enumRef` so consumers can still chase them by hand.
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
    // Each entry carries its full node tree so consumers can read the
    // schema at runtime (same shape the `.d.ts` literal exposes statically).
    const stanzaSummaryLines = []
    const sortedStanzaKeys = Object.keys(nonIq?.stanzas ?? {}).sort()
    function stanzaJsValue(entry, tag) {
        if (entry.variants) {
            const variants = {}
            for (const [type, v] of Object.entries(entry.variants)) {
                variants[type] = {
                    handler: v?.handler
                        ? { module: v.handler.module, method: v.handler.method }
                        : null,
                    ...(v?.node ? { node: v.node } : {})
                }
            }
            return { tag, discriminator: entry.discriminator, variants }
        }
        return {
            tag,
            handler: entry.handler
                ? { module: entry.handler.module, method: entry.handler.method }
                : null,
            ...(entry.node ? { node: entry.node } : {})
        }
    }
    for (const tag of sortedStanzaKeys) {
        const entry = nonIq.stanzas[tag]
        stanzaSummaryLines.push(
            `    ${keyLiteral(tag)}: ${freezeJsValue(stanzaJsValue(entry, tag))}`
        )
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
    // Per-stanza shape literals — full attr/child/content tree from each
    // variant's `node`. Mirrors how operations get full request/response
    // shape literals; users can autocomplete e.g.
    // `WA_XML_STANZAS.message.variants["from-is-not-newsletter"].node.children.meta.attrs.sender_intent`.
    const stanzaTypeLines = sortedStanzaKeys.map((tag) => {
        const entry = nonIq.stanzas[tag]
        if (entry.variants) {
            const variantLines = Object.entries(entry.variants).map(([type, v]) => {
                const node = v?.node ? emitElementType(v.node, '            ') : 'unknown'
                const handler = v?.handler
                    ? `{ readonly module: ${quote(v.handler.module)}; readonly method: ${quote(v.handler.method)} }`
                    : 'null'
                return `            readonly ${keyLiteral(type)}: {
                readonly handler: ${handler}
                readonly node: ${node}
            }`
            })
            return `    readonly ${keyLiteral(tag)}: {
        readonly tag: ${quote(tag)}
        readonly discriminator: ${quote(entry.discriminator ?? '')}
        readonly variants: {
${variantLines.join('\n')}
        }
    }`
        }
        const node = entry.node ? emitElementType(entry.node, '        ') : 'unknown'
        const handler = entry.handler
            ? `{ readonly module: ${quote(entry.handler.module)}; readonly method: ${quote(entry.handler.method)} }`
            : 'null'
        return `    readonly ${keyLiteral(tag)}: {
        readonly tag: ${quote(tag)}
        readonly handler: ${handler}
        readonly node: ${node}
    }`
    })

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
// most commonly \`type\` for \`receipt\` / \`notification\`). Every variant
// also carries its full \`node\` shape (attrs/children/content) as a
// typed literal so consumers can autocomplete the wire schema.
export interface WaXmlStanzaHandlerRef {
    readonly module: string
    readonly method: string
}

export type WaXmlStanzaKey = ${sortedStanzaKeys.map(quote).join(' | ') || 'string'}

export interface WaXmlStanzas {
${stanzaTypeLines.join('\n')}
}

export declare const WA_XML_STANZAS: WaXmlStanzas
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
    if (outgoingStats) {
        console.log(
            `apply: outgoing — ${outgoingStats.modulesScanned} modules scanned / ${outgoingStats.mergedNodes} wap() nodes merged / +${outgoingStats.attrsAdded} sender-only attrs`
        )
    }
    console.log(
        `apply: name-based attr promotion — ${promotedAttrs} string attrs upgraded to wire-correct types`
    )
    console.log(
        `apply: child cardinality default — ${defaultedChildren} children pinned to min:1/max:1`
    )
    if (
        enrichedWildcards > 0 ||
        enrichedAttrEnums > 0 ||
        enrichedAttrLiterals > 0 ||
        enrichedContentEnums > 0
    ) {
        console.log(
            `apply: wildcard/attr enrichment — ${enrichedWildcards} '*' children tagged, ${enrichedAttrEnums} attrs upgraded to enum, ${enrichedAttrLiterals} attrs pinned to literal, ${enrichedContentEnums} content nodes upgraded to enum`
        )
    }
}

main()
