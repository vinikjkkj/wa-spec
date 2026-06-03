'use strict'

/**
 * Phase 3 — outgoing stanza-construction extractor.
 *
 * The IQ-RPC extractor (Phase 1) covers `WASmaxOut*Request` builders + their
 * `WASmaxIn*Response*` parsers. The dispatch-handler extractor (Phase 2)
 * covers incoming `<message>` / `<receipt>` / `<notification>` etc. parsers.
 *
 * What's MISSING are wire attrs/children/tags the client SENDS but the
 * server never echoes back — so no incoming parser ever reads them and
 * they're invisible to Phase 1/2. Concrete examples:
 *
 *   - `<meta sender_intent="hosted">` on outgoing `<message>` — set when
 *     `appendHostedSenderIntent` is true; receiver doesn't see it.
 *   - `<meta view_once="true">`, `<meta destination_id>`,
 *     `<meta conversation_thread_id>`, `<meta tag_reason>` — same idea.
 *   - `<message addressing_mode>`, `<message peer_recipient_pn>`,
 *     `<message push_priority>` — sender-only.
 *   - `<ack>` stanzas the client emits in response to every incoming
 *     notification / receipt — built fresh per handler, never parsed back.
 *
 * Phase 3 AUTO-DISCOVERS every `WAWeb*` module that contains
 * `<ld>("WAWap").wap("<tag>", ...)` calls (or `<alias>.wap(...)` after a
 * `<alias>=<ld>("WAWap")` hoist), decodes each call via Phase 1's
 * `decodeSmaxCall`, groups the results by root tag, and merges onto the
 * IR's stanza tree with a `direction: "out" | "both"` annotation so
 * consumers can tell write-only attrs from read-only / bidirectional ones.
 *
 * When the root tag isn't already a known stanza (`<ack>` wasn't in
 * Phase 2's dispatch since the client never RECEIVES acks), a fresh
 * stanza entry is synthesised with the merged outgoing tree.
 */

const { findModuleRegistration, splitTopLevelCommas, skipExpr } = require('./parser.cjs')
const { decodeSmaxCall } = require('./extract-xml.cjs')

// Minifier identifiers can contain `$` (e.g. `$e`) or be a bare `$`. Interpolating
// a name into a RegExp unescaped lets `$` act as the end-of-input anchor, and `\b`
// does not delimit tokens that start/end with `$`. reId() escapes a discovered
// name; LB is an identifier boundary that treats `$` as part of the identifier.
const reId = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const LB = '(?<![\\w$])' // left identifier boundary (replaces a leading \b)

// Known wire-stanza root tags. Anything in this list whose merged tree
// doesn't already exist in `ir.stanzas` gets a synthesised entry. Tags
// not in this list (e.g. arbitrary children like `meta`, `enc`, `biz`)
// don't create new stanza entries — they only merge into an existing one
// when the module's CONTEXT (resolved via MODULE_TARGET_HINTS) says so.
const KNOWN_ROOT_TAGS = new Set([
    'message', 'receipt', 'notification', 'presence', 'chatstate',
    'call', 'ib', 'ack', 'failure', 'success', 'error', 'stream:error',
    'xmlstreamend', 'status'
])

// Module-name → stanza root the module contributes to. Used to scope
// inner-child wap() merges (e.g. `wap("biz", {...})` in a *message*
// builder should ONLY attach to <message>/<biz>, not to <iq>/<pair-success>/<biz>
// which is a completely different protocol fragment with the same tag).
//
// CRITICAL: only `pure builder` modules (whose entire purpose is to
// construct one specific outgoing stanza) get hints here. Handler
// modules (`WAWebHandle*Notification`) are EXCLUDED — they parse
// incoming AND emit ack responses; their wap() calls are a mix of
// (legitimate) ack construction AND (incidental) inner-fragment wap()
// calls used for internal logging / dispatch that DON'T belong in any
// stanza's schema. For handlers, only the top-level root-tag wap call
// (always `wap("ack", ...)`) gets merged onto <ack>; other wap() calls
// in the same module are skipped.
const MODULE_TARGET_HINTS = [
    // <message> pure builders
    [/^WAWebSendMsgCreate/, 'message'],
    [/^WAWebSendMsgMetaNode$/, 'message'],
    [/^WAWebEncryptAndSend.*Msg$/, 'message'],
    [/^WAWebResend.*Msg$/, 'message'],
    [/^WAWebBroadcastMessageRPC$/, 'message'],
    [/^WAWebScheduledMsg/, 'message'],
    [/^WAWebSendGroup/, 'message'],
    [/^WAWebGroupHistoryReportingToken/, 'message'],

    // <receipt> pure builders
    [/^WAWebSendDeliveryReceiptJob$/, 'receipt'],
    [/^WAWebSendPlayedReceiptJob$/, 'receipt'],
    [/^WAWebSendReceiptJobCommon$/, 'receipt'],
    [/^WAWebSendRetryReceiptJob$/, 'receipt'],
    [/^WAWebSendHistSyncServerErrorReceiptJob$/, 'receipt'],
    [/^WAWebSendServerErrorReceiptJob$/, 'receipt'],
    [/^WAWebVoipSendGroupCallRekeyRetryReceiptJob$/, 'receipt'],
    [/^WAWebReceiptAck$/, 'receipt'],

    // <call> outgoing signaling
    [/^WAWebVoipSendSignalingXmpp$/, 'call']
]

function targetStanzaForModule(modName, rootLevelTags) {
    // Name-based hints take priority — they encode hand-verified
    // knowledge that a module is a `pure builder` for one stanza.
    // Trusting "wap call presence" alone misroutes inner calls when
    // a module builds MULTIPLE root tags (e.g. a receipt module that
    // also constructs the matching ack confirmation).
    for (const [re, tag] of MODULE_TARGET_HINTS) {
        if (re.test(modName)) return tag
    }
    // Only fall back to "first root-tag wap call wins" when no name
    // hint matches AND there's exactly ONE root tag in the module.
    const unique = [...new Set(rootLevelTags.filter((t) => KNOWN_ROOT_TAGS.has(t)))]
    if (unique.length === 1) return unique[0]
    return null
}

// `<iq>` is intentionally excluded from KNOWN_ROOT_TAGS for Phase 3.
// Outgoing IQs are already covered comprehensively by Phase 1's
// WASmaxOut*Request extraction (121 typed operations). The handful of
// legacy `WAWeb*Job` modules that build `<iq>` directly without going
// through Smax would either duplicate Phase 1 entries OR contaminate
// the incoming `iq` variants (pair-device, pair-success) with attrs
// from unrelated request types.

// Modules that build wap() calls we DON'T want to scan — they're either
// internal helpers that wrap wap() with non-wire semantics, or generate
// noise (test fixtures, dev mocks). Empty by default; add patterns as
// they show up.
const SKIP_PATTERNS = [
    /^WAWebTesting/,
    /^WAWebMock/,
    /Test$/
]

// Decode every `<ld>("WAWap").wap("<tag>", ...)` AND `<alias>.wap("<tag>", ...)`
// call in `body`, returning an array of decoded nodes. We pre-scan for
// WAWap aliases (`var <a>=o("WAWap")` / `(<a>=o("WAWap"))`) so aliased
// `.wap(` doesn't match unrelated method calls AND so the decoder can
// recognize `<alias>.CUSTOM_STRING(...)` / `<alias>.INT(...)` calls
// inside the wap args (otherwise they'd fall through to `unknown`).
function findWapCalls(body) {
    const out = []
    const wawapAliases = new Set()
    const aliasRe = /(?:\bvar\s+|[,;(])\s*([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\(\s*"WAWap"\s*\)/g
    let am
    while ((am = aliasRe.exec(body))) wawapAliases.add(am[1])

    // Same idea for WASmaxAttrs aliases — OPTIONAL / OPTIONAL_LITERAL
    // helpers are wrapped via `var <a>=o("WASmaxAttrs")` in some builders.
    const attrsAliases = new Set()
    const attrsAliasRe = /(?:\bvar\s+|[,;(])\s*([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\(\s*"WASmaxAttrs"\s*\)/g
    let am3
    while ((am3 = attrsAliasRe.exec(body))) attrsAliases.add(am3[1])

    const ctx = { wawapAliases, attrsAliases }

    const directRe = /[A-Za-z_$][\w$]*\(\s*"WAWap"\s*\)\s*\.\s*wap\s*\(/g
    let m
    while ((m = directRe.exec(body))) {
        const openParen = m.index + m[0].length - 1
        try {
            const close = skipExpr(body, openParen + 1, [')'])
            const args = splitTopLevelCommas(body, openParen + 1, close)
            const node = decodeSmaxCall(body, args, ctx)
            if (node && node.tag) out.push(node)
        } catch {}
    }
    for (const alias of wawapAliases) {
        const re = new RegExp(`${LB}${reId(alias)}\\.wap\\s*\\(`, 'g')
        let am2
        while ((am2 = re.exec(body))) {
            const openParen = am2.index + am2[0].length - 1
            try {
                const close = skipExpr(body, openParen + 1, [')'])
                const args = splitTopLevelCommas(body, openParen + 1, close)
                const node = decodeSmaxCall(body, args, ctx)
                if (node && node.tag) out.push(node)
            } catch {}
        }
    }
    return out
}

// Recursively walk a wap-decoded node and tag every attr with
// `direction: "out"` (and recurse into children). Demote bare-ident
// `unknown` types to `string` since XMPP wire is always text.
function tagDirection(node, dir) {
    if (!node) return
    if (node.attrs) for (const v of Object.values(node.attrs)) {
        v.direction = dir
        if (v.type === 'unknown' && v.arg && /^[A-Za-z_$][\w$]*$/.test(v.arg)) {
            v.type = 'string'
        }
    }
    if (node.children) for (const c of node.children) tagDirection(c, dir)
}

// Demote `unknown` to `string` for any attr we couldn't infer from a wap
// call (helper return values, bare idents). Same rationale as
// `tagDirection`: XMPP wire is text, `string` is always a safe fallback.
function softenUnknown(node) {
    if (!node) return
    if (node.attrs) for (const v of Object.values(node.attrs)) {
        if (v.type === 'unknown') v.type = 'string'
    }
    if (node.children) for (const c of node.children) softenUnknown(c)
}

// Merge `outNode` into `existing` (an inbound-side stanza node). Attrs
// already present keep their incoming type (more precise) but gain
// `direction: "both"`. New attrs land with `direction: "out"`. Children
// recurse by tag.
function mergeOutgoingNode(existing, outNode) {
    if (!existing || !outNode) return
    softenUnknown(outNode)
    if (outNode.attrs) {
        if (!existing.attrs) existing.attrs = {}
        for (const [k, v] of Object.entries(outNode.attrs)) {
            if (k in existing.attrs) {
                const ex = existing.attrs[k]
                // Union literal values into an enum when multiple
                // outgoing builders pin the same attr to different
                // literals (e.g. `<ack class="notification">` /
                // `<ack class="receipt">` / `<ack class="message">` —
                // each from a different builder). Without unioning,
                // first-wins would lose the other values.
                if (
                    ex.type === 'literal' && v.type === 'literal'
                    && ex.value !== v.value
                ) {
                    existing.attrs[k] = {
                        type: 'enum',
                        enumValues: [...new Set([ex.value, v.value])],
                        direction: ex.direction === 'out' ? 'out' : 'both'
                    }
                } else if (
                    ex.type === 'enum' && v.type === 'literal'
                    && Array.isArray(ex.enumValues)
                    && !ex.enumValues.includes(v.value)
                ) {
                    ex.enumValues = [...ex.enumValues, v.value]
                } else if (ex.direction !== 'both') {
                    ex.direction = 'both'
                }
            } else {
                existing.attrs[k] = { ...v, direction: 'out' }
            }
        }
    }
    if (outNode.children) {
        if (!existing.children) existing.children = []
        for (const oc of outNode.children) {
            if (!oc.tag) continue
            const ec = existing.children.find((c) => c.tag === oc.tag)
            if (ec) {
                mergeOutgoingNode(ec, oc)
            } else {
                tagDirection(oc, 'out')
                existing.children.push(oc)
            }
        }
    }
    // Skip content merging for known content-less root tags. `<ack>`,
    // `<iq>`, `<failure>`, `<success>` never carry payload bytes per
    // protocol — any "content" the decoder produced is a false-positive
    // from a wap call's trailing bare-ident arg (typically a CHILD node
    // ref that decodeSmaxCall's `looksLikeContent` heuristic mistakes
    // for content, e.g. `y(e, t)` calling `wap("ack", {...}, t)`).
    const CONTENTLESS_ROOTS = new Set(['ack', 'iq', 'failure', 'success'])
    if (outNode.content && !existing.content && !CONTENTLESS_ROOTS.has(existing.tag)) {
        existing.content = { ...outNode.content, direction: 'out' }
    }
}

function findOrCreateChild(targetParent, tag) {
    if (!targetParent.children) targetParent.children = []
    let c = targetParent.children.find((x) => x.tag === tag)
    if (!c) {
        c = { tag, attrs: {}, children: [], content: null }
        targetParent.children.push(c)
    }
    return c
}

// Pre-merge pass: when MULTIPLE outNodes pin the SAME attr to DIFFERENT
// literal values (e.g. `<ack class="notification">` from one builder,
// `<ack class="receipt">` from another, `<ack class="message">` from a
// third), promote all observed literals into a single enum attr that
// replaces every individual literal pinning before the per-node merge
// runs. Without this pre-pass, the first-wins merge order loses the
// other observed literals (or, worse, keeps a string-with-arg attr
// when later literals would have been more specific).
function precollectLiteralUnions(outNodes) {
    const byAttr = {} // key → Set of literal values
    function walk(n) {
        if (!n) return
        if (n.tag && n.attrs) {
            for (const [k, v] of Object.entries(n.attrs)) {
                if (v.type !== 'literal' || v.value === undefined) continue
                const key = n.tag + '#' + k
                if (!byAttr[key]) byAttr[key] = new Set()
                byAttr[key].add(v.value)
            }
        }
        if (n.children) for (const c of n.children) walk(c)
    }
    for (const n of outNodes) walk(n)
    // Apply: every attr with 2+ distinct literal values becomes an enum
    // on every node that has that (tag, attr) combo — including those
    // where the attr is currently string-with-arg (the builder used a
    // runtime variable like `e.tag` that resolves to one of the
    // collected literals).
    function applyTo(n) {
        if (!n) return
        if (n.tag && n.attrs) {
            for (const [k, v] of Object.entries(n.attrs)) {
                const key = n.tag + '#' + k
                const set = byAttr[key]
                if (!set || set.size < 2) continue
                n.attrs[k] = {
                    type: 'enum',
                    enumValues: [...set].sort()
                }
            }
        }
        if (n.children) for (const c of n.children) applyTo(c)
    }
    for (const n of outNodes) applyTo(n)
}

function mergeForStanza(ir, rootTag, outNodes) {
    let merged = 0
    // Pre-collect literal unions BEFORE merging so multi-builder attrs
    // (like `<ack class>`) become enums instead of losing variants to
    // first-wins.
    precollectLiteralUnions(outNodes)
    let stanza = ir.stanzas?.[rootTag]
    // Synthesise the stanza if it doesn't exist yet (e.g. `<ack>` —
    // outgoing-only, never appears in the incoming dispatch tables).
    if (!stanza) {
        if (!ir.stanzas) ir.stanzas = {}
        stanza = ir.stanzas[rootTag] = {
            tag: rootTag,
            node: { tag: rootTag, attrs: {}, children: [], content: null },
            outgoingOnly: true
        }
    }
    const targets = stanza.variants
        ? Object.values(stanza.variants).map((v) => v.node).filter(Boolean)
        : [stanza.node].filter(Boolean)
    for (const target of targets) {
        for (const outNode of outNodes) {
            if (outNode.tag === rootTag) {
                mergeOutgoingNode(target, outNode)
                merged++
            } else {
                const child = findOrCreateChild(target, outNode.tag)
                mergeOutgoingNode(child, outNode)
                merged++
            }
        }
    }
    // For purely outgoing stanzas (synthesised by Phase 3 — no inbound
    // parser ever sees them), recursively force `direction: "out"` on
    // every attr/content. The merge logic upgrades repeat-merged attrs
    // to `direction: "both"` because it can't tell that the "previous"
    // value came from another outgoing module, not from an inbound
    // parser.
    if (stanza.outgoingOnly) {
        function forceOut(node) {
            if (!node) return
            if (node.attrs) for (const v of Object.values(node.attrs)) v.direction = 'out'
            if (node.content) node.content.direction = 'out'
            if (node.children) for (const c of node.children) forceOut(c)
        }
        for (const t of targets) forceOut(t)
    }
    return merged
}

function shouldSkipModule(name) {
    for (const re of SKIP_PATTERNS) if (re.test(name)) return true
    // Phase 1 already handled WASmaxOut* / WASmaxIn* construction —
    // skipping them avoids double-counting the same wap calls.
    if (name.startsWith('WASmax')) return true
    return false
}

// Auto-discover every WAWeb* module that contains a wap() call. We don't
// know the bundle's module list up front so we re-derive it from the
// module index — the index is keyed by `__d("Mod", ...)` registrations
// across all bundle files.
// Phase 1's request trees for ops whose root tag is a stanza root (not
// `iq`) ALSO represent outgoing wire construction — they're just
// expressed via Smax instead of raw `wap()` calls. Merge those request
// trees onto the matching stanza so consumers see e.g. the outgoing
// `<chatstate>` schema directly on `WA_XML_STANZAS.chatstate.node`
// instead of having to chase the `ClientNotification` op separately.
function mergeOpRequestsAsOutgoing(ir) {
    let merged = 0
    for (const op of Object.values(ir.operations || {})) {
        const req = op.request?.node
        if (!req || !req.tag) continue
        const tag = req.tag
        if (tag === 'iq') continue
        const stanza = ir.stanzas?.[tag]
        if (!stanza) continue
        const targets = stanza.variants
            ? Object.values(stanza.variants).map((v) => v.node).filter(Boolean)
            : [stanza.node].filter(Boolean)
        // Clone the req node so the tagging doesn't mutate the original
        // op's request (which consumers can still query via
        // WA_XML_OPERATIONS).
        const cloned = JSON.parse(JSON.stringify(req))
        for (const target of targets) {
            mergeOutgoingNode(target, cloned)
            merged++
        }
    }
    return merged
}

function extractOutgoing(ir, moduleIndex) {
    let modulesScanned = 0
    let modulesWithCalls = 0
    let mergedNodes = 0

    // Track outgoing nodes by root tag. We need to defer merging until
    // we've collected all of them so the merge order doesn't matter
    // (the synthesised stanza's `node` is mutated repeatedly).
    const byRoot = {}

    for (const [modName, modText] of moduleIndex.entries()) {
        if (!modName.startsWith('WAWeb')) continue
        if (shouldSkipModule(modName)) continue
        if (!modText.includes('"WAWap"')) continue
        const mod = findModuleRegistration(modText, modName)
        if (!mod) continue
        modulesScanned++
        const wapCalls = findWapCalls(mod.factoryBody)
        if (wapCalls.length === 0) continue
        modulesWithCalls++

        // Determine the module's target stanza root via name hints OR
        // the presence of a top-level known-root wap call. This is the
        // KEY anti-contamination guard: a `wap("biz", {...})` call in
        // WAWebSendMsgCreateFanoutStanza targets <message>/<biz>, NOT
        // <iq>/<pair-success>/<biz> (which is a different protocol
        // fragment that just happens to share the tag name).
        const rootTags = wapCalls.map((c) => c.tag).filter((t) => KNOWN_ROOT_TAGS.has(t))
        const moduleTarget = targetStanzaForModule(modName, rootTags)
        for (const node of wapCalls) {
            if (KNOWN_ROOT_TAGS.has(node.tag)) {
                if (!byRoot[node.tag]) byRoot[node.tag] = []
                byRoot[node.tag].push(node)
            } else if (moduleTarget) {
                // Inner wap call (`<meta>`, `<biz>`, `<enc>`, etc.) —
                // route to the module's target stanza so the merge
                // attaches to that root's child with the same tag.
                const bucket = `__inner:${moduleTarget}:${node.tag}`
                if (!byRoot[bucket]) byRoot[bucket] = []
                byRoot[bucket].push(node)
            }
            // Else: orphan inner wap call (no target hint) — skip to
            // avoid the cross-stanza contamination this rewrite fixes.
        }
    }

    let attrsAdded = 0
    const beforeTotals = totalIrAttrs(ir)
    for (const [bucket, nodes] of Object.entries(byRoot)) {
        if (bucket.startsWith('__inner:')) {
            // Format: `__inner:<targetStanzaTag>:<childTag>`
            const [, target, childTag] = bucket.split(':')
            mergedNodes += mergeInnerForChildScoped(ir, target, childTag, nodes)
        } else {
            mergedNodes += mergeForStanza(ir, bucket, nodes)
        }
    }
    // Also merge Phase 1 op request trees whose root tag is a stanza
    // root (excludes `iq`) — those represent outgoing wire construction
    // via Smax that the wap()-only scan above misses.
    mergedNodes += mergeOpRequestsAsOutgoing(ir)
    attrsAdded = totalIrAttrs(ir) - beforeTotals
    return { modulesScanned, modulesWithCalls, mergedNodes, attrsAdded }
}

// Inner-child merge SCOPED to a single target stanza root. Resolves
// every `<childTag>` instance within `targetStanzaTag`'s tree and merges
// `outNodes` onto each. The scoping prevents cross-stanza pollution
// (a `<biz>` builder in WAWebSendMsgCreateFanoutStanza targets only
// <message>/<biz>, not the unrelated <iq>/<pair-success>/<biz>).
function mergeInnerForChildScoped(ir, targetStanzaTag, childTag, outNodes) {
    const stanza = ir.stanzas?.[targetStanzaTag]
    if (!stanza) return 0
    const targets = []
    function visit(node) {
        if (!node || !node.children) return
        for (const c of node.children) {
            if (c.tag === childTag) targets.push(c)
            visit(c)
        }
    }
    if (stanza.variants) for (const v of Object.values(stanza.variants)) visit(v.node)
    else visit(stanza.node)
    // If the target stanza doesn't have a matching child yet, append
    // one to the root node — the outgoing builder is the source of
    // truth that this child exists on the wire for this stanza.
    if (targets.length === 0 && stanza.node) {
        const newChild = findOrCreateChild(stanza.node, childTag)
        targets.push(newChild)
    }
    let merged = 0
    for (const target of targets) {
        for (const outNode of outNodes) {
            mergeOutgoingNode(target, outNode)
            merged++
        }
    }
    return merged
}

function totalIrAttrs(ir) {
    let n = 0
    function visit(node) {
        if (!node) return
        if (node.attrs) n += Object.keys(node.attrs).length
        if (node.children) for (const c of node.children) visit(c)
    }
    for (const stanza of Object.values(ir.stanzas || {})) {
        if (stanza.variants) for (const v of Object.values(stanza.variants)) visit(v.node)
        else visit(stanza.node)
    }
    return n
}

function countAttrs(ir, rootTag) {
    const stanza = ir.stanzas?.[rootTag]
    if (!stanza) return 0
    let n = 0
    function visit(node) {
        if (!node) return
        if (node.attrs) n += Object.keys(node.attrs).length
        if (node.children) for (const c of node.children) visit(c)
    }
    if (stanza.variants) for (const v of Object.values(stanza.variants)) visit(v.node)
    else visit(stanza.node)
    return n
}

module.exports = { extractOutgoing, KNOWN_ROOT_TAGS }
