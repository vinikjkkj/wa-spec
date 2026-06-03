'use strict'

/**
 * Static XML stanza schema extractor — Phase 2 (non-IQ stanzas).
 *
 * IQ operations live in extract-xml.cjs (the declarative Smax RPC pipeline).
 * Everything ELSE the client receives — receipts, notifications, chatstate,
 * presence, call, stream:error, success, failure, ib, ack, xmlstreamend —
 * goes through the imperative dispatch table at
 * `WAWebCommsHandleLoggedInStanza`, which `switch`es on the stanza's root
 * tag and (for receipt / notification) on its `type` attribute, then hands
 * off to a per-handler module that parses the stanza using the OO
 * `ParsableWapNode` API (`.attrString`, `.attrEnum`, `.maybeChild`,
 * `.forEachChildWithTag`, `.contentBytes`, …).
 *
 * The extractor does two things:
 *
 *   1. **Dispatch table reconstruction.** Parses
 *      `WAWebCommsHandleLoggedInStanza`'s outer switch + every nested type-
 *      switch, recording `(rootTag, type?, contentChildTag?) → handlerModule.handlerMethod`.
 *
 *   2. **Per-handler schema extraction.** For each handler module the
 *      dispatch points to, locates the exported handler function, then
 *      walks its body identifying chained calls on the stanza param and
 *      vars bound to its children. Each method maps to an AttrSpec /
 *      ChildSpec / ContentSpec in the output schema tree.
 *
 * The OO call surface is large — see PARSABLE_METHODS below. Unrecognised
 * methods are skipped; an `__unknown` annotation surfaces them in the IR.
 *
 * The output schema tree shape mirrors Phase 1's so consumers can union
 * `iq` operations and `non-iq` stanzas under the same vocabulary.
 */

const {
    skipExpr,
    skipWs,
    splitTopLevelCommas,
    findModuleRegistration,
    iterModuleHeaders
} = require('./parser.cjs')

// Minifier identifiers can contain `$` (e.g. `$e`) or be a bare `$`. Interpolating
// a name into a RegExp unescaped lets `$` act as the end-of-input anchor, and `\b`
// does not delimit tokens that start/end with `$`. reId() escapes a discovered
// name; LB/RB are identifier boundaries that treat `$` as part of the identifier.
const reId = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const LB = '(?<![\\w$])' // left identifier boundary (replaces a leading \b)
const RB = '(?![\\w$])' // right identifier boundary (replaces a trailing \b)

// ---------------------------------------------------------------------------
// ParsableWapNode method → schema descriptor.
// ---------------------------------------------------------------------------

// Each entry tells the walker how to interpret a call on the bound stanza var:
//   - kind:'attr'    → first arg is the attr name, optional `type` describes the wire type
//   - kind:'maybeAttr' → like attr but marks optional:true
//   - kind:'child'   → first arg is the child tag; subsequent chained method
//                       calls on the result describe that child's attrs/content
//   - kind:'maybeChild' → like child but the child may be absent
//   - kind:'children' → callback or `mapChildrenWithTag(tag, fn)` style; fn
//                       receives a bound child var
//   - kind:'content' → leaf content of the current scope; `type` describes
//                       the wire type
//   - kind:'assertTag' → asserts the current node's tag; binds nothing
//   - kind:'assertAttr' → first arg is the attr name, second is the literal value
//   - kind:'has'     → boolean test; doesn't contribute to the schema
const PARSABLE_METHODS = {
    // Attr accessors
    attrString:           { kind: 'attr', type: 'string' },
    attrInt:              { kind: 'attr', type: 'int' },
    attrLongInt:          { kind: 'attr', type: 'longInt' },
    attrEnum:             { kind: 'attr', type: 'enum' },
    attrEnumValues:       { kind: 'attr', type: 'enum', inline: true },
    attrEnumOrNullIfUnknown: { kind: 'attr', type: 'enum', optional: true },
    attrTime:             { kind: 'attr', type: 'time' },
    attrFutureTime:       { kind: 'attr', type: 'time' },
    attrJidWithType:      { kind: 'attr', type: 'jid' },
    attrUserJid:          { kind: 'attr', type: 'userJid' },
    attrPhoneUserJid:     { kind: 'attr', type: 'phoneUserJid' },
    attrLidUserJid:       { kind: 'attr', type: 'lidUserJid' },
    attrGroupJid:         { kind: 'attr', type: 'groupJid' },
    attrChatJid:          { kind: 'attr', type: 'jid' },
    attrPhoneChatJid:     { kind: 'attr', type: 'jid' },
    attrDeviceJid:        { kind: 'attr', type: 'deviceJid' },
    attrPhoneDeviceJid:   { kind: 'attr', type: 'phoneDeviceJid' },
    attrLidDeviceJid:     { kind: 'attr', type: 'lidDeviceJid' },
    attrDeviceId:         { kind: 'attr', type: 'int' },
    attrWapJid:           { kind: 'attr', type: 'jid' },
    attrStanzaId:         { kind: 'attr', type: 'stanzaId' },
    attrCallId:           { kind: 'attr', type: 'callId' },

    // Maybe-attr accessors
    maybeAttrString:      { kind: 'attr', type: 'string', optional: true },
    maybeAttrInt:         { kind: 'attr', type: 'int', optional: true },
    maybeAttrEnum:        { kind: 'attr', type: 'enum', optional: true },
    maybeAttrUserJid:     { kind: 'attr', type: 'userJid', optional: true },
    maybeAttrPhoneUserJid:{ kind: 'attr', type: 'phoneUserJid', optional: true },
    maybeAttrLidUserJid:  { kind: 'attr', type: 'lidUserJid', optional: true },
    maybeAttrGroupJid:    { kind: 'attr', type: 'groupJid', optional: true },
    maybeAttrTime:        { kind: 'attr', type: 'time', optional: true },

    assertAttr:           { kind: 'assertAttr' },
    assertTag:            { kind: 'assertTag' },
    // `hasAttr` and `hasChild` are presence checks — they ask "is X
    // present" without binding the value. When seen in isolation they
    // still reveal that X is an attribute / child the parser cares about,
    // so promote them to optional schema entries (lower precision than the
    // `attrXxx` / `child(...)` accessors but better than dropping them).
    hasAttr:              { kind: 'attr', type: 'string', optional: true },
    hasChild:             { kind: 'maybeChild' },
    hasChildren:          { kind: 'has' },
    hasContent:           { kind: 'has' },
    hasAttrs:             { kind: 'has' },

    // Children
    child:                { kind: 'child' },
    maybeChild:           { kind: 'maybeChild' },
    forEachChild:         { kind: 'children' },
    forEachChildWithTag:  { kind: 'children', tagged: true },
    mapChildren:          { kind: 'children' },
    mapChildrenWithTag:   { kind: 'children', tagged: true },
    mapFirstChild:        { kind: 'child', first: true },
    getChildren:          { kind: 'getChildren' },

    // Content
    contentString:        { kind: 'content', type: 'string' },
    contentBytes:         { kind: 'content', type: 'bytes' },
    contentInt:           { kind: 'content', type: 'int' },
    contentUint:          { kind: 'content', type: 'int' },
    contentEnum:          { kind: 'content', type: 'enum' },
    contentSerializedPubKey: { kind: 'content', type: 'bytes' },

    // Special: attrFromJid* helpers don't take a name — they always read `from`.
    attrFromJid:          { kind: 'attr', type: 'jid', literalName: 'from' },
    attrFromPhoneJid:     { kind: 'attr', type: 'jid', literalName: 'from' },
    attrFromJidChat:      { kind: 'attr', type: 'jid', literalName: 'from' },
    attrFromJidPhoneChat: { kind: 'attr', type: 'jid', literalName: 'from' }
}

// ---------------------------------------------------------------------------
// Module index — same shape as extract-xml's, kept local for self-containment.
// ---------------------------------------------------------------------------

function buildModuleIndex(bundles) {
    const idx = new Map()
    for (const b of bundles) {
        for (const hdr of iterModuleHeaders(b.text)) {
            if (!idx.has(hdr.name)) idx.set(hdr.name, b.text)
        }
    }
    return idx
}

function findModule(moduleName, moduleIndex) {
    const text = moduleIndex.get(moduleName)
    if (!text) return null
    return findModuleRegistration(text, moduleName)
}

// ---------------------------------------------------------------------------
// Dispatch table reconstruction from `WAWebCommsHandleLoggedInStanza`.
// ---------------------------------------------------------------------------

// Recognise both:
//   `o("Mod").method(e)`       → handler = { module:Mod, method }
//   `r("Mod")(e[, t])`         → handler = { module:Mod, method:'default' }
function extractHandlerRef(returnExpr) {
    // `o("X").method(...)` form
    let m = returnExpr.match(/^[A-Za-z_$][\w$]*\("([^"]+)"\)\.([A-Za-z_$][\w$]*)\s*\(/)
    if (m) return { module: m[1], method: m[2] }
    // `r("X")(...)` form
    m = returnExpr.match(/^[A-Za-z_$][\w$]*\("([^"]+)"\)\s*\(/)
    if (m) return { module: m[1], method: 'default' }
    return null
}

function parseDispatchTable(moduleIndex) {
    // The client-side stanza dispatch lives in THREE modules:
    //   - WAWebCommsHandleLoggedInStanza : receipt(retry only) / notification
    //       / chatstate / presence / ib / stream:error / failure / success /
    //       call / error / xmlstreamend
    //   - WAWebCommsHandleMessagingStanza : message (also newsletter status
    //       rewritten to message) / receipt (non-call, non-retry)
    //   - WAWebCommsHandleWorkerCompatibleStanza : extra handlers for
    //       notification/w:gp2 (group notifications), notification/encrypt/
    //       identity (e2e identity change), newsletter-specific message and
    //       status, and call-receipts. This module wraps the messaging
    //       dispatch and adds its own switch on top.
    //
    // Each module exports a `switch(<expr>) { case "<tag>": ... }` shape —
    // the messaging variant carries a side-effecting prefix that rewrites
    // `e.tag` from "status" to "message" before switching. We collect cases
    // from all three modules and merge by root tag; when the same tag
    // appears in multiple sources, every contribution surfaces (the wire
    // protocol allows multiple handlers in series, each gated by a
    // different attribute / content shape).
    const dispatch = {}
    const cases = []
    for (const modName of [
        'WAWebCommsHandleLoggedInStanza',
        'WAWebCommsHandleMessagingStanza',
        'WAWebCommsHandleWorkerCompatibleStanza'
    ]) {
        const mod = findModule(modName, moduleIndex)
        if (!mod) continue
        const outerBody = locateOuterSwitchBody(mod.factoryBody)
        if (!outerBody) continue
        for (const c of splitSwitchCases(outerBody)) cases.push(c)
    }

    for (const [tag, caseBody] of cases) {
        // Inner switch on n.type or e.attrs.type — capture each type → handler.
        // Other tags have a single handler call (single-handler entries).
        // Recognise both `switch(n.type)` (LoggedInStanza style — `n` is the
        // pre-extracted attrs alias) AND `switch(a.type)` / `switch(t.attrs.type)`
        // (WorkerCompatibleStanza style — different alias name).
        const innerSwitch = caseBody.match(/switch\s*\(\s*[A-Za-z_$][\w$]*(?:\.attrs)?\.type\s*\)\s*\{/)
        const newVariants = {}
        let hasInner = false
        if (innerSwitch) {
            hasInner = true
            const innerStart = caseBody.indexOf('{', innerSwitch.index)
            const innerEnd = skipExpr(caseBody, innerStart + 1, ['}'])
            const innerBody = caseBody.slice(innerStart + 1, innerEnd)
            const innerCases = splitSwitchCases(innerBody)
            for (const [type, typeBody] of innerCases) {
                // For notification cases like `encrypt` and `contacts`, the
                // handler choice further depends on the FIRST content child's
                // tag. Detect that nested switch and emit `type/childTag`
                // sub-variants so consumers can model the 3-level dispatch.
                const childSwitch = typeBody.match(/switch\s*\(\s*([A-Za-z_$][\w$]*)\s*\)\s*\{/)
                if (childSwitch) {
                    const cStart = typeBody.indexOf('{', childSwitch.index)
                    const cEnd = skipExpr(typeBody, cStart + 1, ['}'])
                    const cBody = typeBody.slice(cStart + 1, cEnd)
                    const cCases = splitSwitchCases(cBody)
                    // Only treat as sub-discriminator when at least one case
                    // has a recognisable handler return.
                    let any = false
                    for (const [childTag, childBody] of cCases) {
                        const ret = findReturnHandler(childBody)
                        if (ret) { newVariants[`${type}/${childTag}`] = ret; any = true }
                    }
                    // Also add the bare `type` entry — some sub-cases fall
                    // through to a top-level handler at the end of the case.
                    if (!any) {
                        const ret = findReturnHandler(typeBody)
                        if (ret) newVariants[type] = ret
                    } else {
                        // If the body ALSO has a top-level handler after the
                        // sub-switch, attach it under `type/*`.
                        const ret = findReturnHandler(typeBody)
                        if (ret) newVariants[type] = ret
                    }
                } else {
                    // Ternary-chain sub-dispatch:
                    //   var y = h[0].tag;
                    //   return y === "A" ? handlerA(e) : y === "B" ? handlerB(e) : defaultHandler(e)
                    // Used by `notification.psa` and some other content-child
                    // dispatchers. Extract each `<id> === "<val>" ? <handler>`
                    // step plus the final fallback.
                    const ternaryRe = /([A-Za-z_$][\w$]*)\s*===\s*"([^"]+)"\s*\?\s*(?:yield\s+)?/g
                    const ternaryVariants = []
                    let tm
                    while ((tm = ternaryRe.exec(typeBody))) {
                        const after = typeBody.slice(tm.index + tm[0].length)
                        const ref = extractHandlerRef(after)
                        if (ref) ternaryVariants.push([tm[2], ref])
                    }
                    if (ternaryVariants.length > 0) {
                        for (const [val, ref] of ternaryVariants) {
                            newVariants[`${type}/${val}`] = ref
                        }
                        // The chain's trailing `: <fallback>` is the
                        // catch-all for unmatched child tags WITHIN this
                        // dispatch branch (e.g. `psa` with from=PSA_JID but
                        // an unknown first-child tag → WAWebHandleWaChat).
                        // Capture it under `type/*` so consumers see the
                        // unmatched-child path. The OUTER fallback after
                        // the if-block (the existing `findReturnHandler`)
                        // covers a different gate (e.g. from!=PSA_JID).
                        ternaryRe.lastIndex = 0
                        let lastEnd = 0
                        let tmL
                        while ((tmL = ternaryRe.exec(typeBody))) lastEnd = tmL.index + tmL[0].length
                        const trailing = typeBody.slice(lastEnd)
                        // Skip the last matched handler call body, then
                        // find the next top-level `:` and parse the
                        // handler that follows it.
                        let depth = 0
                        let colonIdx = -1
                        for (let i = 0; i < trailing.length; i++) {
                            const c = trailing[i]
                            if (c === '(') depth++
                            else if (c === ')') depth--
                            else if (c === ':' && depth === 0) { colonIdx = i; break }
                        }
                        if (colonIdx !== -1) {
                            let rest = trailing.slice(colonIdx + 1).trimStart()
                            if (rest.startsWith('yield ')) rest = rest.slice(6).trimStart()
                            const innerFb = extractHandlerRef(rest)
                            if (innerFb && !newVariants[`${type}/*`]) {
                                newVariants[`${type}/*`] = innerFb
                            }
                        }
                        const fallback = findReturnHandler(typeBody)
                        if (fallback) newVariants[type] = fallback
                    } else {
                        const ret = findReturnHandler(typeBody)
                        newVariants[type] = ret
                    }
                }
            }
        }

        // Merge into existing dispatch entry. When the same root tag appears
        // in multiple dispatch modules, keep the first single-handler we saw
        // OR merge variants/handlers into the existing bucket.
        const existing = dispatch[tag]
        if (hasInner) {
            if (!existing) {
                dispatch[tag] = { tag, discriminator: 'type', variants: newVariants }
            } else if (existing.variants) {
                // Merge — only fill new keys, don't overwrite prior ones.
                for (const [k, v] of Object.entries(newVariants)) {
                    if (!(k in existing.variants) || !existing.variants[k]) existing.variants[k] = v
                }
            } else {
                // Existing single-handler is more specific; promote to
                // variants and keep both contributions.
                const merged = { ...newVariants }
                if (existing.handler && !merged['*']) merged['*'] = existing.handler
                dispatch[tag] = { tag, discriminator: 'type', variants: merged }
            }
        } else {
            const ret = findReturnHandler(caseBody)
            // Try to detect a gating condition INSIDE the case body. The
            // WorkerCompatible dispatcher uses predicates like
            // `WAWebWid.isNewsletter(from)` and `isCallReceipt(t)` to route
            // <message>/<receipt> stanzas to specialised handlers — surface
            // those as named handler variants alongside the main handler.
            const condition = extractGuardCondition(caseBody)
            if (!existing) {
                dispatch[tag] = { tag, handler: ret, ...(condition ? { condition } : {}) }
            } else if (existing.variants) {
                // The existing entry already has a `type`-discriminated
                // variant set. The new single-handler is a separate
                // dispatch path — graft it as an extra variant keyed by
                // its condition (or as `*` when un-gated). Don't clobber
                // an existing same-key variant.
                if (ret) {
                    const key = condition || '*'
                    if (!existing.variants[key]) existing.variants[key] = ret
                }
            } else if (!existing.handler && ret) {
                existing.handler = ret
                if (condition) existing.condition = condition
            } else if (ret && existing.handler && ret.module !== existing.handler.module) {
                // Same root tag handled by TWO modules with different
                // gates. Promote both into a `handlers` list so consumers
                // see the full routing table.
                const existingEntry = {
                    handler: existing.handler,
                    ...(existing.condition ? { condition: existing.condition } : {})
                }
                const newEntry = { handler: ret, ...(condition ? { condition } : {}) }
                dispatch[tag] = {
                    tag,
                    handlers: [existingEntry, newEntry]
                }
            }
        }
    }

    // `chatstate` is indirected through a factory closure:
    //   var p = o("WACreateHandleChatState").createHandleChatState({...})
    //   case "chatstate": return WAHandleDecisionTreeResult.handleDecisionTreeResult(e, p(e))
    // The actual schema lives in WACreateHandleChatState's returned function,
    // which calls `WASmaxChatstateServerNotificationRPC.receiveServerNotificationRPC`.
    // Follow that chain when the dispatch handler is the generic decision-tree
    // wrapper and the closure factory is present.
    if (dispatch.chatstate && dispatch.chatstate.handler &&
        dispatch.chatstate.handler.module === 'WAHandleDecisionTreeResult') {
        const factoryMod = findModule('WACreateHandleChatState', moduleIndex)
        if (factoryMod) {
            const rpcRe = /[A-Za-z_$][\w$]*\(\s*"(WASmax[A-Za-z0-9_]*RPC)"\s*\)\s*\.\s*(receive[A-Za-z0-9_]*RPC)\s*\(/
            const rm = factoryMod.factoryBody.match(rpcRe)
            if (rm) {
                dispatch.chatstate.handler = {
                    module: 'WACreateHandleChatState',
                    method: 'createHandleChatState',
                    indirect: { via: 'WAHandleDecisionTreeResult', delegate: { module: rm[1], method: rm[2] } }
                }
            }
        }
    }

    // Special-case `receipt` branch: when the case body uses
    // `if(n.type==="retry"||n.type==="enc_rekey_retry") return yield <h>(e)`
    // instead of a nested switch, capture those types explicitly. Run once
    // per receipt occurrence across both modules.
    //
    // We can't regex the handler call directly — its expression may contain
    // nested `(` (e.g. `o("Mod").method(`). Find the `return ... ` then walk
    // forward to extract the full handler reference until the matching `(`.
    {
        const re = /n\.type\s*===\s*"([^"]+)"(?:\s*\|\|\s*n\.type\s*===\s*"([^"]+)")?\s*\)\s*return\s+(?:yield\s+)?/g
        const variants = {}
        for (const [tag, caseBody] of cases) {
            if (tag !== 'receipt') continue
            let m
            while ((m = re.exec(caseBody))) {
                const after = caseBody.slice(m.index + m[0].length)
                const handler = extractHandlerRef(after)
                if (!handler) continue
                if (m[1]) variants[m[1]] = handler
                if (m[2]) variants[m[2]] = handler
            }
        }
        if (Object.keys(variants).length > 0) {
            // Merge into the existing receipt entry without clobbering any
            // handlers / multi-handler entries already collected from the
            // other dispatch modules (Messaging adds the non-retry handler,
            // WorkerCompatible adds the call-receipt handler).
            const existing = dispatch.receipt
            if (!existing) {
                dispatch.receipt = { tag: 'receipt', discriminator: 'type', variants }
            } else {
                const merged = { ...variants, ...(existing.variants || {}) }
                // Absorb single-handler / multi-handler entries — but skip
                // when an equivalent handler is already represented in the
                // variant map (avoids duplicates like
                // `receipt.retry`/`receipt.enc_rekey_retry` both pointing at
                // `MessageRetryRequest` AND the bare handler getting added
                // again under its module name).
                const seenModules = new Set(Object.values(merged).map((h) => h?.module))
                const tryAbsorb = (key, handler) => {
                    if (!handler) return
                    if (seenModules.has(handler.module)) return
                    if (!merged[key]) {
                        merged[key] = handler
                        seenModules.add(handler.module)
                    }
                }
                if (existing.handler) tryAbsorb(existing.condition || '*', existing.handler)
                if (existing.handlers) {
                    for (const h of existing.handlers) {
                        tryAbsorb(h.condition || h.handler?.module || '*', h.handler)
                    }
                }
                dispatch.receipt = { tag: 'receipt', discriminator: 'type', variants: merged }
            }
        }
    }

    // `<iq>` dispatch lives in WAWebHandleStanzaCommon (not in any of the
    // three Comms*Stanza modules). Its `handleIq` switches on the first
    // content child's tag — `pair-device` / `pair-success` for the `md`
    // xmlns. Synthesize an `iq` entry so the SetReg/SetToCompanion RPCs
    // are linked to the stanza catalog.
    {
        const mod = findModule('WAWebHandleStanzaCommon', moduleIndex)
        if (mod) {
            const body = mod.factoryBody
            const switchM = body.match(/var\s+([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\[0\]\.tag\s*;\s*switch\s*\(\s*\1\s*\)\s*\{/)
            if (switchM) {
                const start = switchM.index + switchM[0].length
                const end = skipExpr(body, start, ['}'])
                const switchBody = body.slice(start, end)
                const variants = {}
                for (const [caseLabel, caseBody] of splitSwitchCases(switchBody)) {
                    if (caseLabel === '*') continue
                    const handler = findReturnHandler(caseBody)
                    if (handler) variants[caseLabel] = handler
                }
                if (Object.keys(variants).length > 0) {
                    dispatch.iq = { tag: 'iq', discriminator: 'firstChildTag', variants }
                }
            }
        }
    }

    return dispatch
}

// Find a top-level `switch(<expr>){...}` whose `<expr>` references `.tag` on
// some bound var, returning the body BETWEEN the matching braces. The
// LoggedIn dispatcher uses `switch(e.tag)`; the Messaging one wraps it in a
// side-effecting comma chain (`switch((cond && (e.tag="message"), e.tag))`);
// the WorkerCompatible one uses a different param name (`switch(t.tag)`).
// Accept any `<id>.tag` to cover all three.
function locateOuterSwitchBody(body) {
    const re = /\bswitch\s*\(/g
    let m
    while ((m = re.exec(body))) {
        const parenStart = m.index + m[0].length - 1
        const parenEnd = skipExpr(body, parenStart + 1, [')'])
        const expr = body.slice(parenStart + 1, parenEnd)
        if (!/\b[A-Za-z_$][\w$]*\.tag\b/.test(expr)) continue
        const braceStart = body.indexOf('{', parenEnd)
        if (braceStart === -1) continue
        const braceEnd = skipExpr(body, braceStart + 1, ['}'])
        return body.slice(braceStart + 1, braceEnd)
    }
    return null
}

// Split a switch's body into `[caseLabel, caseBody]` pairs. Labels are read
// from the literal string in `case "<x>":`; default is recorded as `*`.
//
// IMPORTANT: only TOP-LEVEL case labels count. Nested switches inside a case
// body have their own `case "..."` markers — we must skip the contents of
// any nested `{...}` block and any string literal to avoid picking them up
// as siblings of the outer case.
function splitSwitchCases(body) {
    const out = []
    let depth = 0
    let i = 0
    let currentLabel = null
    let currentStart = 0
    let inStr = null
    while (i < body.length) {
        const c = body[i]
        if (inStr) {
            if (c === '\\') { i += 2; continue }
            if (c === inStr) inStr = null
            i++
            continue
        }
        if (c === '"' || c === "'" || c === '`') { inStr = c; i++; continue }
        if (c === '{') { depth++; i++; continue }
        if (c === '}') { depth--; i++; continue }
        if (depth === 0) {
            // Top-level case / default label
            if (body.startsWith('case', i) && !/[\w$]/.test(body[i + 4])) {
                let j = i + 4
                while (j < body.length && /\s/.test(body[j])) j++
                if (body[j] === '"' || body[j] === "'") {
                    const q = body[j]
                    j++
                    const labStart = j
                    while (j < body.length && body[j] !== q) {
                        if (body[j] === '\\') j++
                        j++
                    }
                    const label = body.slice(labStart, j)
                    j++
                    while (j < body.length && /\s/.test(body[j])) j++
                    if (body[j] === ':') {
                        if (currentLabel !== null) {
                            out.push([currentLabel, body.slice(currentStart, i)])
                        }
                        currentLabel = label
                        currentStart = j + 1
                        i = j + 1
                        continue
                    }
                }
            }
            if (body.startsWith('default', i) && !/[\w$]/.test(body[i + 7])) {
                let j = i + 7
                while (j < body.length && /\s/.test(body[j])) j++
                if (body[j] === ':') {
                    if (currentLabel !== null) {
                        out.push([currentLabel, body.slice(currentStart, i)])
                    }
                    currentLabel = '*'
                    currentStart = j + 1
                    i = j + 1
                    continue
                }
            }
        }
        i++
    }
    if (currentLabel !== null) out.push([currentLabel, body.slice(currentStart)])
    return out
}

// Find the handler that owns a case body. Three patterns in the wild:
//
//   `return yield <ld>("Mod").method(e)`
//   `return <ld>("Mod")(e)`                  — default-export form
//   `var x = yield <ld>("Mod")(e); return x` — bound-then-returned
//
// Walk the body looking for any call to a `WAWebHandle*` /
// `WAWebPaymentNotificationHandler` / `WAWebAccountLinking*` /
// `WAWebAltDeviceLinking*` / `WAHandleDecisionTreeResult` module and pick
// the first one. (Filter out logging / nack / metric helpers.)
function findReturnHandler(caseBody) {
    const SKIP = /^(WAWebCreateNackFromStanza|WALogger|WAWebPostUnknownStanzaMetric|WAJids|WAWebWid|WAWebStatusGatingUtils|WAWebCommsHandleStanzaUtils)$/
    // First pass — direct `return` of a handler call (most common).
    const retRe = /\breturn\s+(?:yield\s+)?/g
    let m
    while ((m = retRe.exec(caseBody))) {
        const after = caseBody.slice(m.index + m[0].length).trim()
        if (after.startsWith('"')) continue
        const directRef = extractHandlerRef(after)
        if (directRef && !SKIP.test(directRef.module)) return directRef
    }
    // Second pass — scan for any `<ld>("HandlerMod").method(` or
    // `<ld>("HandlerMod")(` call. Used when the case body binds the call
    // result to a var and returns the var (e.g. `var l = yield r("...")(e);
    // return l`).
    const callRe = /\b[A-Za-z_$][\w$]*\(\s*"([^"]+)"\s*\)\s*(?:\.\s*([A-Za-z_$][\w$]*)\s*)?\(/g
    while ((m = callRe.exec(caseBody))) {
        if (SKIP.test(m[1])) continue
        // Filter to plausible handler modules — anything that suggests a
        // stanza handler / parser delegation by name.
        if (!/(Handle|Notification|Parser|Handler|RPC)/.test(m[1])) continue
        return { module: m[1], method: m[2] || 'default' }
    }
    return null
}

// ---------------------------------------------------------------------------
// Per-handler schema extraction.
// ---------------------------------------------------------------------------

// Lexically-scoped handler walker. Each scope owns a `(varName → entry)` map
// plus the node objects accumulating attrs/children. Iteration callbacks
// (`forEachChildWithTag` / `mapChildrenWithTag`) introduce a fresh inner
// scope where the callback param shadows any outer same-named binding —
// critical for minified handlers like `incomingMsgParser` where the outer
// stanza param and the inner enc-callback param are BOTH named `e`.
//
// Strategy:
//   1. Pre-scan ALL `function(<p>){...}` ranges so we can mask them out of
//      the outer-scope walk and recursively process them with their own scope.
//   2. Walk the outer body's `<var>.<method>(...)` calls — only those whose
//      offset isn't inside any inner callback range count for outer scope.
//   3. For each callback, recurse with `param → child-of-parent` binding;
//      the resulting sub-node becomes a child of the parent in the outer
//      tree, with cardinality inferred from the iterator method.
//   4. Helper-function inlining: scan for `<helperFn>(<rootParam>, ...)` or
//      `<helperFn>({..., node: <rootParam>, ...})` calls in the entry body
//      and re-walk each helper's body with its first param bound to the
//      same node. This recovers attrs read inside helpers like
//      `incomingMsgParser`'s `y(e)` / `b(e,a)` / `S(e)` / `R(e,c)`.
function buildHandlerTree(fnBody, rootParam, moduleIndex, moduleBody) {
    const root = walkScope(
        fnBody,
        [0, fnBody.length],
        rootParam,
        null,
        null,
        [],
        moduleIndex,
        moduleBody || fnBody
    )
    return root
}

// Walk a scope. `bodyRange` bounds the text we own; `param` is the bound var
// (the stanza node for the root, the callback param for nested scopes);
// `tag` is the known tag (for callbacks via mapChildrenWithTag) or null;
// `parentScopeChain` is just used for diagnostics. `moduleBody` is the FULL
// outer factory body — used to look up helper-function definitions when
// the entry body calls into them. Returns the ElementNode.
function walkScope(fullBody, bodyRange, param, parentVar, knownTag, parentScopeChain, moduleIndex, moduleBody) {
    const [bodyStart, bodyEnd] = bodyRange
    const localText = fullBody.slice(bodyStart, bodyEnd)

    const scope = new Map()
    scope.set(param, { tag: knownTag, parent: null })

    const nodes = new Map()
    function getOrCreateNode(varName) {
        if (nodes.has(varName)) return nodes.get(varName)
        const entry = scope.get(varName) || {}
        const node = { tag: entry.tag ?? null, attrs: {}, children: [], content: null }
        nodes.set(varName, node)
        return node
    }

    // Pre-pass A0 — chained child-call callbacks. The minified handler often
    // skips binding the intermediate child to a var: `e.child("tos")
    // .forEachChildWithTag("notice", function(p){...})`. The plain `<id>.`
    // pre-pass below won't see this because the receiver is a call expr
    // (closing `)`), not an identifier. Pre-create the synthetic child
    // scope entry AND register the callback range with the synthetic var
    // as parent so the callback walker links the inner tree to the right
    // node.
    const callbackRanges = [] // [{ absStart, absEnd, param, parentVar, tag, cardinality }]
    {
        // Tag arg can be a string literal OR a const expression we resolve
        // (e.g. `e.child(o("X").INFO_TYPE.THREAD_META).forEachChildWithTag("item",fn)`).
        const chainedRe = /(?<![\w$])([A-Za-z_$][\w$]*)\.(?:child|maybeChild)\(\s*((?:"[^"]+"|[^),][^,)]*?))\s*\)\s*\.(forEachChildWithTag|mapChildrenWithTag|forEachChild|mapChildren)\s*\(/g
        let cm
        while ((cm = chainedRe.exec(localText))) {
            const [, outer, tagRaw, method] = cm
            let childTag = null
            const litM = tagRaw.match(/^"([^"]+)"$/)
            if (litM) childTag = litM[1]
            else {
                const norm = normalizeInlineAssign(tagRaw.trim(), moduleBody || fullBody)
                childTag = resolveLocalConstString(norm, moduleBody || fullBody)
                    || resolveConstStringExpr(norm, moduleIndex)
            }
            if (!childTag) continue
            const synthetic = `__${outer}_${childTag}`
            if (!scope.has(synthetic)) {
                scope.set(synthetic, { tag: childTag, parent: outer, cardinality: 'one' })
            }
            const openParen = cm.index + cm[0].length - 1
            const close = skipExpr(localText, openParen + 1, [')'])
            const args = splitTopLevelCommas(localText, openParen + 1, close)
            const tagged = method.endsWith('WithTag')
            let tag = null
            let fnArgIdx = tagged ? 1 : 0
            if (tagged && args.length >= 1) {
                const t = localText.slice(args[0][0], args[0][1]).trim()
                const litM = t.match(/^['"]([^'"]+)['"]$/)
                if (litM) tag = litM[1]
                else {
                    const norm = normalizeInlineAssign(t, moduleBody || fullBody)
                    tag = resolveConstStringExpr(norm, moduleIndex)
                        || resolveLocalConstString(norm, moduleBody || fullBody)
                }
            } else if (!tagged) tag = '*'
            const fnArg = args[fnArgIdx]
            if (!fnArg) continue
            const fnText = localText.slice(fnArg[0], fnArg[1])
            const fnMatch = fnText.match(/function\s*\(([^)]*)\)\s*\{/)
            if (!fnMatch) continue
            const innerParam = (fnMatch[1].split(',')[0] || '').trim()
            if (!innerParam) continue
            const bodyOpen = fnArg[0] + fnMatch.index + fnMatch[0].length
            const bodyClose = skipExpr(localText, bodyOpen, ['}'])
            callbackRanges.push({
                absStart: bodyStart + bodyOpen,
                absEnd: bodyStart + bodyClose,
                callStart: bodyStart + cm.index,
                param: innerParam,
                parentVar: synthetic,
                tag,
                cardinality: 'zero-or-more'
            })
        }
    }

    // Pre-pass A — discover all callback ranges so we can mask them out of
    // the outer call walk. Each `<var>.(forEach|map)ChildrenWithTag("tag", function(<p>) {...})`
    // (or untagged `forEachChild` / `mapChildren`) introduces a nested scope.
    {
        const re = /(?<![\w$])([A-Za-z_$][\w$]*)\.(forEachChildWithTag|mapChildrenWithTag|forEachChild|mapChildren)\s*\(/g
        let m
        while ((m = re.exec(localText))) {
            const target = m[1]
            const method = m[2]
            const openParen = m.index + m[0].length - 1
            const close = skipExpr(localText, openParen + 1, [')'])
            const args = splitTopLevelCommas(localText, openParen + 1, close)
            const tagged = method.endsWith('WithTag')
            let tag = null
            let fnArgIdx = tagged ? 1 : 0
            if (tagged && args.length >= 1) {
                const t = localText.slice(args[0][0], args[0][1]).trim()
                const norm = normalizeInlineAssign(t, moduleBody || fullBody)
                tag = resolveConstStringExpr(norm, moduleIndex)
                    || resolveLocalConstString(norm, moduleBody || fullBody)
            } else if (!tagged) {
                // Untagged map/forEachChild iterates ALL children — represent
                // as a wildcard tag so consumers see "any element".
                tag = '*'
            }
            const fnArg = args[fnArgIdx]
            if (!fnArg) continue
            const fnText = localText.slice(fnArg[0], fnArg[1])
            const fnMatch = fnText.match(/function\s*\(([^)]*)\)\s*\{/)
            if (!fnMatch) continue
            const innerParam = (fnMatch[1].split(',')[0] || '').trim()
            if (!innerParam) continue
            const bodyOpen = fnArg[0] + fnMatch.index + fnMatch[0].length
            const bodyClose = skipExpr(localText, bodyOpen, ['}'])
            callbackRanges.push({
                absStart: bodyStart + bodyOpen,
                absEnd: bodyStart + bodyClose,
                callStart: bodyStart + m.index,
                param: innerParam,
                parentVar: target,
                tag,
                cardinality: 'zero-or-more'
            })
        }
    }

    function inCallback(offset) {
        for (const r of callbackRanges) {
            if (offset >= r.absStart && offset < r.absEnd) return true
        }
        return false
    }

    // Pre-pass B — child-bound var declarations. Three patterns:
    //   var <x> = <var>.child("tag")              → required child
    //   var <x> = <var>.maybeChild("tag")         → optional child
    //   var <x> = <var>.hasChild("tag") ? <var>.child("tag") : null
    //                                              → conditional/optional child
    // Only count assignments outside any nested callback — those callbacks
    // run their own walker and re-bind.
    {
        // Tag arg accepts a string literal OR a non-literal expr we can
        // resolve via const-string helpers (e.g. `e.child(c.LOG)` where
        // `c = {LOG:"log",...}` — captures `r = e.child(c.LOG)` as
        // child "log"). The tag arg may contain inner parens
        // (`o("Mod").CONST.SUB`), so we anchor on the `.(child|maybeChild)(`
        // head and use skipExpr to find the matching closing paren.
        const declHeadRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\.(child|maybeChild)\s*\(/g
        let m
        while ((m = declHeadRe.exec(localText))) {
            if (inCallback(bodyStart + m.index)) continue
            const [head, lhs, parent, method] = m
            if (scope.has(lhs)) continue
            const argStart = m.index + head.length
            const argEnd = skipExpr(localText, argStart, [')'])
            const tagRaw = localText.slice(argStart, argEnd).trim()
            const litM = tagRaw.match(/^"([^"]+)"$/)
            let tag = null
            if (litM) tag = litM[1]
            else {
                const norm = normalizeInlineAssign(tagRaw, moduleBody || fullBody)
                tag = resolveLocalConstString(norm, moduleBody || fullBody)
                    || resolveConstStringExpr(norm, moduleIndex)
            }
            if (!tag) continue
            // Follow chained `.child("Y")` / `.maybeChild("Y")` after the
            // initial binding. `n = e.child("X").maybeChild("Y")` binds n
            // to Y (the FINAL child in the chain), not X — downstream
            // reads like `n.contentString()` operate on Y. Without this,
            // the binding tag is wrong and content/attrs end up on the
            // wrong synthetic.
            let chainPos = argEnd + 1
            let lastParent = parent
            let lastTag = tag
            let lastMethod = method
            while (localText[chainPos] === '.') {
                const cm = localText.slice(chainPos + 1).match(/^(child|maybeChild)\s*\(/)
                if (!cm) break
                const chainArgStart = chainPos + 1 + cm[0].length
                const chainArgEnd = skipExpr(localText, chainArgStart, [')'])
                const chainTagRaw = localText.slice(chainArgStart, chainArgEnd).trim()
                const chainLitM = chainTagRaw.match(/^"([^"]+)"$/)
                if (!chainLitM) break
                // The intermediate child (lastTag under lastParent) MUST
                // exist in scope as a synthetic so the splice attaches
                // the nested child correctly.
                const intermediateSynth = `__${lastParent}_${lastTag}`
                if (!scope.has(intermediateSynth)) {
                    scope.set(intermediateSynth, {
                        tag: lastTag, parent: lastParent,
                        cardinality: lastMethod === 'maybeChild' ? 'zero-or-one' : 'one'
                    })
                }
                lastParent = intermediateSynth
                lastTag = chainLitM[1]
                lastMethod = cm[1]
                chainPos = chainArgEnd + 1
            }
            scope.set(lhs, {
                tag: lastTag,
                parent: lastParent,
                cardinality: lastMethod === 'maybeChild' ? 'zero-or-one' : 'one'
            })
        }
        // Conditional `<x> = <var>.hasChild("tag") ? <var>.child("tag") : <fallback>`
        // where <fallback> is `null`, `void 0`, `undefined`, or any expression.
        // The hasAttr/attrString calls on <x> still target the child, so we
        // accept any RHS after the `:`.
        const condRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\.hasChild\s*\(\s*"([^"]+)"\s*\)\s*\?\s*[A-Za-z_$][\w$]*\.child\s*\(\s*"[^"]+"\s*\)\s*:/g
        let cm2
        while ((cm2 = condRe.exec(localText))) {
            if (inCallback(bodyStart + cm2.index)) continue
            const [, lhs, parent, tag] = cm2
            if (scope.has(lhs)) continue
            scope.set(lhs, { tag, parent, cardinality: 'zero-or-one' })
        }
        // Short-circuit AND `<x> = <var>.hasChild("tag") && <var>.child("tag")`
        // — semantically identical to the ternary above. `<x>` is bound to
        // the child when present, falsy otherwise; downstream `<x>.<method>`
        // reads still target the child.
        const andRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\.hasChild\s*\(\s*"([^"]+)"\s*\)\s*&&\s*[A-Za-z_$][\w$]*\.child\s*\(\s*"[^"]+"\s*\)/g
        let am2
        while ((am2 = andRe.exec(localText))) {
            if (inCallback(bodyStart + am2.index)) continue
            const [, lhs, parent, tag] = am2
            if (scope.has(lhs)) continue
            scope.set(lhs, { tag, parent, cardinality: 'zero-or-one' })
        }
        // Null-guarded ternary `<x> = <p>==null ? void 0 : <p>.maybeChild("tag")`
        // — minified version of optional chaining. Same effect as binding `<x>`
        // to a maybeChild of `<p>`.
        const guardRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\s*==\s*null\s*\?\s*[^?:]+?:\s*([A-Za-z_$][\w$]*)\.(child|maybeChild)\s*\(\s*"([^"]+)"\s*\)/g
        let gm2
        while ((gm2 = guardRe.exec(localText))) {
            if (inCallback(bodyStart + gm2.index)) continue
            const [, lhs, parent, method, tag] = gm2
            if (scope.has(lhs)) continue
            scope.set(lhs, { tag, parent, cardinality: 'zero-or-one' })
        }
        // Wildcard first-child: `var <x> = <var>.mapFirstChild(...)`. The
        // bound `<x>` is the first child of <var> with ANY tag. Used by
        // `<call>` (the call type indicator is the first child's tag) and
        // a few other handlers that don't know the child tag up front.
        const firstRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\.mapFirstChild\s*\(/g
        let fm
        while ((fm = firstRe.exec(localText))) {
            if (inCallback(bodyStart + fm.index)) continue
            const [, lhs, parent] = fm
            if (scope.has(lhs)) continue
            scope.set(lhs, { tag: '*', parent, cardinality: 'one' })
        }
    }

    // Comparison-binding pre-pass for raw access: `for (var <p> of <var>.content)
    // if (<p>.tag === "<tag>") ...` binds <p> to children-with-tag of <var>.
    // Also handles intermediate var-bound content: `var c = <var>.content;
    // for (var <p> of c)` — discover `c` first, then rewrite the iterator
    // as if it iterated `<var>.content` directly. Runs BEFORE the
    // raw-attr-access pass so `<p>.attrs.<X>` reads are attributed to the
    // newly-bound child scope (not silently dropped because `<p>` wasn't
    // yet a scope entry).
    // The compared tag may be a string literal OR a hoisted const ref
    // (`h.tag === _` where `var _ = "update"`); resolve through
    // `resolveLocalConstString` when needed.
    const contentAliases = new Map() // <localVar> → <parent scope var>
    {
        const aliasRe = /\b(?:var\s+)?([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\.content\b/g
        let aam
        while ((aam = aliasRe.exec(localText))) {
            if (inCallback(bodyStart + aam.index)) continue
            if (scope.has(aam[2])) contentAliases.set(aam[1], aam[2])
        }
    }
    {
        const re = /\bfor\s*\(\s*(?:var\s+)?([A-Za-z_$][\w$]*)\s+of\s+([A-Za-z_$][\w$]*)(\.content)?\b/g
        let cbm
        while ((cbm = re.exec(localText))) {
            if (inCallback(bodyStart + cbm.index)) continue
            const [, p, parentOrAlias, dotContent] = cbm
            const parent = dotContent ? parentOrAlias : contentAliases.get(parentOrAlias)
            if (!parent || !scope.has(parent)) continue
            if (!scope.has(p)) {
                scope.set(p, { tag: null, parent, cardinality: 'zero-or-more' })
            }
            const tagCmpRe = new RegExp(
                `${LB}${reId(p)}\\.tag\\s*===?\\s*(['"][^'"]+['"]|[A-Za-z_$][\\w$]*(?:\\.[A-Za-z_$][\\w$]*)?)|(['"][^'"]+['"]|[A-Za-z_$][\\w$]*(?:\\.[A-Za-z_$][\\w$]*)?)\\s*===?\\s*${reId(p)}\\.tag\\b`,
                'g'
            )
            const cmpM = tagCmpRe.exec(localText.slice(cbm.index))
            if (cmpM && !scope.get(p).tag) {
                const raw = cmpM[1] || cmpM[2] || ''
                const litM = raw.match(/^['"]([^'"]+)['"]$/)
                if (litM) scope.get(p).tag = litM[1]
                else {
                    const norm = normalizeInlineAssign(raw, moduleBody || fullBody)
                    const resolved = resolveLocalConstString(norm, moduleBody || fullBody)
                        || resolveConstStringExpr(norm, moduleIndex)
                    if (resolved) scope.get(p).tag = resolved
                }
            }
        }
    }

    // Raw-attr-access pass — handlers that DON'T use ParsableWapNode walk
    // the stanza via direct property access (`e.attrs.id`, `e.content`,
    // `for (var h of e.content) if (h.tag === ...) h.attrs.jid`). Capture
    // those access patterns so the resulting tree carries at least the
    // observed attrs / content / child-by-tag bindings.
    {
        const attrAccessRe = /(?<![\w$])([A-Za-z_$][\w$]*)\.attrs\.([A-Za-z_$][\w$]*)(?![\w$])/g
        let am
        while ((am = attrAccessRe.exec(localText))) {
            const off = bodyStart + am.index
            if (inCallback(off)) continue
            const target = am[1]
            const attrName = am[2]
            if (!scope.has(target)) continue
            const node = getOrCreateNode(target)
            if (!(attrName in node.attrs)) {
                const inferred = inferRawAttrType(attrName)
                node.attrs[attrName] = { ...inferred, raw: true }
            }
        }
    }

    // Main pass — `<var>.<method>(...)` calls in OUTER scope only.
    const callRe = /(?<![\w$])([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*\(/g
    let cm
    while ((cm = callRe.exec(localText))) {
        const callOffset = bodyStart + cm.index
        if (inCallback(callOffset)) continue
        const target = cm[1]
        const method = cm[2]
        if (!scope.has(target)) continue
        const desc = PARSABLE_METHODS[method]
        if (!desc) continue
        const openParen = cm.index + cm[0].length - 1
        const close = skipExpr(localText, openParen + 1, [')'])
        const args = splitTopLevelCommas(localText, openParen + 1, close)
        const node = getOrCreateNode(target)

        if (desc.kind === 'attr') {
            let name = desc.literalName
            if (!name) {
                const a0 = args[0] ? localText.slice(args[0][0], args[0][1]).trim() : null
                const nm = a0 && a0.match(/^['"](.*)['"]$/)
                if (!nm) continue
                name = nm[1]
            }
            const spec = { type: desc.type }
            if (desc.optional) spec.optional = true
            if (desc.type === 'enum' && args[1]) {
                const enumRaw = localText.slice(args[1][0], args[1][1]).trim()
                spec.enumRef = inlineEnumRef(enumRaw, moduleBody)
            }
            if (!(name in node.attrs)) node.attrs[name] = spec
        } else if (desc.kind === 'assertAttr') {
            const a0 = args[0] ? localText.slice(args[0][0], args[0][1]).trim() : null
            const a1 = args[1] ? localText.slice(args[1][0], args[1][1]).trim() : null
            const nm = a0 && a0.match(/^['"](.*)['"]$/)
            const vm = a1 && a1.match(/^['"](.*)['"]$/)
            if (nm && vm && !(nm[1] in node.attrs)) {
                node.attrs[nm[1]] = { type: 'literal', value: vm[1] }
            }
        } else if (desc.kind === 'assertTag') {
            const a0 = args[0] ? localText.slice(args[0][0], args[0][1]).trim() : null
            const nm = a0 && a0.match(/^['"](.*)['"]$/)
            if (nm && !node.tag) node.tag = nm[1]
        } else if (desc.kind === 'content') {
            node.content = { type: desc.type }
            if (desc.type === 'enum' && args[0]) {
                node.content.enumRef = inlineEnumRef(
                    localText.slice(args[0][0], args[0][1]).trim(),
                    moduleBody
                )
            }
        } else if (desc.kind === 'child' || desc.kind === 'maybeChild') {
            // Synthesise a child binding so any var bound to this call
            // (`var x = e.child("foo")`) — or any fluent chain immediately
            // following the call (`e.child("foo").contentBytes()`) — can
            // contribute attrs/content to the right scope.
            const a0 = args[0] ? localText.slice(args[0][0], args[0][1]).trim() : null
            // Tag arg can be a string literal OR a constant reference
            // (`c.LOG` where `c = n("$InternalEnum")({LOG:"log",…})`).
            // Resolve the constant if needed so e.g. `e.hasChild(c.LOG)`
            // surfaces as a `<log>` child binding.
            let tag = null
            const nm = a0 && a0.match(/^['"](.*)['"]$/)
            if (nm) tag = nm[1]
            else if (a0) {
                const norm = normalizeInlineAssign(a0, moduleBody || fullBody)
                tag = resolveLocalConstString(norm, moduleBody || fullBody)
                    || resolveConstStringExpr(norm, moduleIndex)
            }
            if (!tag) continue
            const synthetic = `__${target}_${tag}`
            if (!scope.has(synthetic)) {
                scope.set(synthetic, {
                    tag,
                    parent: target,
                    cardinality: desc.kind === 'maybeChild' ? 'zero-or-one' : 'one'
                })
            }
            const synthNode = getOrCreateNode(synthetic)

            // Walk the chain that follows `<target>.child("tag")(…)`. Each
            // immediately-chained `.<method>(…)` call is applied to the
            // synthetic child node. Handles patterns like:
            //   e.child("verified_name").contentBytes()
            //   e.child("biz").maybeAttrInt("actual_actors")
            //   e.child("biz").child("interactive").attrString("name")
            let chainPos = close + 1
            let chainTarget = synthNode
            let chainTag = tag
            while (chainPos < localText.length && localText[chainPos] === '.') {
                const chainMatch = localText
                    .slice(chainPos + 1)
                    .match(/^([A-Za-z_$][\w$]*)\s*\(/)
                if (!chainMatch) break
                const chainMethod = chainMatch[1]
                const chainDesc = PARSABLE_METHODS[chainMethod]
                if (!chainDesc) break
                const chainOpen = chainPos + 1 + chainMatch[0].length - 1
                const chainClose = skipExpr(localText, chainOpen + 1, [')'])
                const chainArgs = splitTopLevelCommas(localText, chainOpen + 1, chainClose)
                if (chainDesc.kind === 'attr') {
                    let aname = chainDesc.literalName
                    if (!aname) {
                        const a = chainArgs[0]
                            ? localText.slice(chainArgs[0][0], chainArgs[0][1]).trim()
                            : null
                        const am = a && a.match(/^['"](.*)['"]$/)
                        if (am) aname = am[1]
                    }
                    if (aname && !(aname in chainTarget.attrs)) {
                        const spec = { type: chainDesc.type }
                        if (chainDesc.optional) spec.optional = true
                        if (chainDesc.type === 'enum' && chainArgs[1]) {
                            spec.enumRef = inlineEnumRef(
                                localText.slice(chainArgs[1][0], chainArgs[1][1]).trim(),
                                moduleBody
                            )
                        }
                        chainTarget.attrs[aname] = spec
                    }
                } else if (chainDesc.kind === 'content') {
                    if (!chainTarget.content) {
                        chainTarget.content = { type: chainDesc.type }
                        if (chainDesc.type === 'enum' && chainArgs[0]) {
                            chainTarget.content.enumRef = inlineEnumRef(
                                localText.slice(chainArgs[0][0], chainArgs[0][1]).trim(),
                                moduleBody
                            )
                        }
                    }
                } else if (chainDesc.kind === 'child' || chainDesc.kind === 'maybeChild') {
                    const arg = chainArgs[0]
                        ? localText.slice(chainArgs[0][0], chainArgs[0][1]).trim()
                        : null
                    const am = arg && arg.match(/^['"](.*)['"]$/)
                    if (!am) break
                    const nestedTag = am[1]
                    const nestedSynth = `${synthetic}_${nestedTag}`
                    if (!scope.has(nestedSynth)) {
                        scope.set(nestedSynth, {
                            tag: nestedTag,
                            parent: synthetic,
                            cardinality: chainDesc.kind === 'maybeChild' ? 'zero-or-one' : 'one'
                        })
                    }
                    chainTarget = getOrCreateNode(nestedSynth)
                    chainTag = nestedTag
                } else {
                    break
                }
                chainPos = chainClose + 1
            }
        }
    }

    const rootNode = getOrCreateNode(param)
    if (knownTag && !rootNode.tag) rootNode.tag = knownTag

    // Recurse into each callback's body — its tree becomes a child of the
    // callback's parent var.
    for (const cb of callbackRanges) {
        const childTree = walkScope(
            fullBody,
            [cb.absStart, cb.absEnd],
            cb.param,
            cb.parentVar,
            cb.tag,
            [...parentScopeChain, param],
            moduleIndex,
            moduleBody
        )
        const parentNode = nodes.get(cb.parentVar)
        if (!parentNode) continue
        if (parentNode.children.some((c) => c.tag === childTree.tag)) continue
        parentNode.children.push({
            ...childTree,
            ...cardinalityToMinMax(cb.cardinality)
        })
    }

    // Cross-module same-node parser merge. Many handlers fan a single
    // stanza node through multiple sibling parser modules:
    //   var r = o("WAWebParseSubscriptionNotification").parseSubscriptionsAndFeatureFlags(e)
    //   var s = o("WAWebParseOtherThing").parseOtherThing(e)
    // Each parser reads attrs/children from `e` that the immediate handler
    // doesn't see. Walk each cross-module parser whose first arg is a
    // tracked scope var, then merge its attrs/children/content onto the
    // mapped node. Most of these sub-parsers use the OO ParsableWapNode API
    // (`.hasChild` / `.child` / `.forEachChildWithTag` / `.attrString`) so
    // we recursively invoke buildHandlerTree on their function body rather
    // than the Smax-IN response walker.
    //
    // Two call shapes:
    //   a) `<ld>("WAxxxParser").<parseFn>(<argVar>)` — named accessor
    //   b) `<ld>("WAxxxParser")(<argVar>)`           — default callable
    //   (e.g. `r("WAWebCommonParsersVerifiedName")(l)` — `l.default` is the entry)
    // Module name pattern broadened to include `WAWebCommonParsers*` etc.
    {
        const crossRe = /\b[A-Za-z_$][\w$]*\(\s*"(WA[A-Za-z0-9_]*(?:Parser|Parsers[A-Za-z0-9_]+|WebParse[A-Za-z0-9_]+))"\s*\)(?:\s*\.\s*(parse[A-Za-z0-9_]*|[a-z][A-Za-z0-9_]*Parser))?\s*\(\s*([A-Za-z_$][\w$]*)\s*\)/g
        const visitedCross = new Set()
        let cm
        while ((cm = crossRe.exec(localText))) {
            if (inCallback(bodyStart + cm.index)) continue
            const subMod = cm[1]
            const subMethod = cm[2] || 'default'
            const argVar = cm[3]
            if (!scope.has(argVar)) continue
            // A var can be reassigned to multiple different children across
            // if-branches (e.g. `l=e.child("remove"); ... l=e.child("verified_name")`).
            // Resolve the MOST-RECENT `argVar = <p>.child("<tag>")` rebinding
            // BEFORE this call site so the parser tree lands on the right
            // synthetic child instead of contaminating the prior binding.
            const beforeText = localText.slice(0, cm.index)
            const rebindRe = new RegExp(`${LB}${reId(argVar)}\\s*=\\s*([A-Za-z_$][\\w$]*)\\.(?:child|maybeChild)\\s*\\(\\s*"([^"]+)"`, 'g')
            let rebind = null
            let rbm
            while ((rbm = rebindRe.exec(beforeText))) rebind = rbm
            const callerKey = rebind ? `${rebind[1]}/${rebind[2]}` : argVar
            const key = `${subMod}#${subMethod}@${callerKey}`
            if (visitedCross.has(key)) continue
            visitedCross.add(key)
            try {
                const subModEntry = findModule(subMod, moduleIndex)
                if (!subModEntry) continue
                // Locate the named export function. For default-callable
                // form, look up `l.default = <fnId>`.
                const exportRe = new RegExp(`\\bl\\.${subMethod}\\s*=\\s*([A-Za-z_$][\\w$]*)`)
                const expM = subModEntry.factoryBody.match(exportRe)
                if (!expM) continue
                const fnId = expM[1]
                const fnRe = new RegExp(`function\\s+${fnId}\\s*\\(([^)]*)\\)\\s*\\{`)
                const fm = subModEntry.factoryBody.match(fnRe)
                if (!fm) continue
                const start = fm.index + fm[0].length
                const end = skipExpr(subModEntry.factoryBody, start, ['}'])
                const fnBody = subModEntry.factoryBody.slice(start, end)
                const fnRootParam = (fm[1].split(',')[0] || '').trim()
                if (!fnRootParam) continue
                const subTree = buildHandlerTree(
                    fnBody,
                    fnRootParam,
                    moduleIndex,
                    subModEntry.factoryBody
                )
                if (subTree) {
                    // Prefer the synthetic node tied to the most-recent
                    // rebinding when one was found — that's the canonical
                    // child node the main walker already created.
                    let target
                    if (rebind) {
                        const synthetic = `__${rebind[1]}_${rebind[2]}`
                        if (!scope.has(synthetic)) {
                            scope.set(synthetic, { tag: rebind[2], parent: rebind[1], cardinality: 'one' })
                        }
                        target = getOrCreateNode(synthetic)
                        if (!target.tag) target.tag = rebind[2]
                    } else {
                        target = nodes.get(argVar) || getOrCreateNode(argVar)
                    }
                    for (const [k, v] of Object.entries(subTree.attrs || {})) {
                        if (!(k in target.attrs)) target.attrs[k] = v
                    }
                    // Same-tag children: deep-merge instead of skipping. The
                    // sub-parser may have inner attrs/grand-children that
                    // the handler's main walker missed (e.g.
                    // `WAWebParseThreadMetadata` walks `<thread_metadata>/<item>`
                    // and ib's main parser only stubs `<thread_metadata>`).
                    for (const c of subTree.children || []) {
                        const ex = target.children.find((x) => x.tag === c.tag)
                        if (ex) {
                            mergeIntoNode(ex, c)
                            continue
                        }
                        target.children.push(c)
                    }
                    if (subTree.content && !target.content) target.content = subTree.content
                }
            } catch {}
        }
    }

    // Helper-function inlining. Scan for `<helperFn>(<scopeVar>, ...)` or
    // `<helperFn>({...node:<scopeVar>...})` calls in the outer body. For
    // each, look up `function <helperFn>(<p>, ...){...}` in the surrounding
    // module body and re-walk that helper's body with `<p>` bound to the
    // same node as `<scopeVar>`. Lifts attrs / children / content the
    // helper reads back onto the caller's node tree.
    if (moduleBody) {
        const helperRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*\(/g
        const visited = new Set()
        let hm
        while ((hm = helperRe.exec(localText))) {
            if (inCallback(bodyStart + hm.index)) continue
            const fnName = hm[1]
            if (visited.has(fnName)) continue
            // Skip language keywords / builtins / dep-loader idents.
            if (/^(if|for|while|switch|return|throw|new|var|let|const|function|yield|await|typeof|instanceof|Array|Object|String|Number|JSON|babelHelpers)$/.test(fnName)) continue
            // Skip if it's a method call (a.b()) — we want bare ident calls only.
            const before = localText[hm.index - 1]
            if (before === '.') continue
            const openParen = hm.index + hm[0].length - 1
            const close = skipExpr(localText, openParen + 1, [')'])
            const args = splitTopLevelCommas(localText, openParen + 1, close)
            if (args.length === 0) continue
            // Find which call-site arg index passes a scope var (or an
            // object with `node:<var>`). Helpers commonly receive the stanza
            // node in arg1 (e.g. WAWebHandleMsgReceiptParser: `p(r, e)` where
            // `e` is the stanza), so we can't assume arg0.
            let mappedVar = null
            let mappedArgIdx = -1
            for (let ai = 0; ai < args.length; ai++) {
                const text = localText.slice(args[ai][0], args[ai][1]).trim()
                if (/^[A-Za-z_$][\w$]*$/.test(text) && scope.has(text)) {
                    mappedVar = text
                    mappedArgIdx = ai
                    break
                }
                if (text.startsWith('{')) {
                    const nodeM = text.match(/\bnode\s*:\s*([A-Za-z_$][\w$]*)/)
                    if (nodeM && scope.has(nodeM[1])) {
                        mappedVar = nodeM[1]
                        mappedArgIdx = ai
                        break
                    }
                }
                // Inline `<var>.child("<tag>")` / `.maybeChild("<tag>")` —
                // synthesise the same `__<var>_<tag>` node the main walker
                // would create and use it as the helper target so the
                // helper's tree attaches to the right child. Catches
                // helpers called as `u(e.child("product_catalog"), i)`.
                const childM = text.match(/^([A-Za-z_$][\w$]*)\.(?:child|maybeChild)\(\s*"([^"]+)"\s*\)$/)
                if (childM && scope.has(childM[1])) {
                    const synthetic = `__${childM[1]}_${childM[2]}`
                    if (!scope.has(synthetic)) {
                        scope.set(synthetic, { tag: childM[2], parent: childM[1], cardinality: 'one' })
                    }
                    mappedVar = synthetic
                    mappedArgIdx = ai
                    break
                }
            }
            if (!mappedVar) continue

            // Look up the helper's definition in moduleBody. Restrict to
            // helpers that use ParsableWapNode methods OR raw attrs access to
            // avoid following utility / I/O helpers. Two shapes:
            //   function <name>(<params>) {...}
            //   var <name> = function(<params>) {...}
            //   <name> = function(<params>) {...}   (re-assignment / hoisted)
            const defRe = new RegExp(`(?:function\\s+${reId(fnName)}|${LB}${reId(fnName)}\\s*=\\s*function)\\s*\\(([^)]*)\\)\\s*\\{`)
            const dm = moduleBody.match(defRe)
            if (!dm) continue
            const helperBodyStart = dm.index + dm[0].length
            const helperBodyEnd = skipExpr(moduleBody, helperBodyStart, ['}'])
            const helperBody = moduleBody.slice(helperBodyStart, helperBodyEnd)
            // Bind the helper param at the matched call-site index, not just
            // param[0]. `p(e, t)` called as `p(r, t)` should walk p's body
            // with `t` bound to the caller's `t`.
            const helperParams = dm[1].split(',').map((s) => s.trim()).filter(Boolean)
            const helperParam = helperParams[mappedArgIdx]
            if (!helperParam) continue
            // Heuristic — must look like a parser body, not e.g. a setter.
            const looksLikeParser =
                /\.attr[A-Z]|\.maybeAttr|\.maybeChild|\.child\(|\.contentBytes|\.contentString|\.contentInt|\.forEachChild|\.mapChildren|\.attrs\.[a-z_]|\.content\b|\.assertAttr|\.hasAttr|\.hasChild/.test(helperBody)
            if (!looksLikeParser) continue
            visited.add(fnName)

            // Walk the helper as a sub-scope of moduleBody, with the matched
            // param aliased to the mappedVar's node. We thread the helper
            // body through walkScope as a synthetic range and re-target
            // node accumulation to the existing mappedVar's node.
            const helperTree = walkHelperInline(
                helperBody,
                helperParam,
                moduleIndex,
                moduleBody
            )
            mergeIntoNode(nodes.get(mappedVar), helperTree)
        }
    }

    // Cross-module parser delegation. When a helper invokes
    // `<dep>("<ParserMod>").<parseFn>(<scopeVar>)` and that function lives
    // in another module (typically `*Parser` / `*ParseUtils`), follow it
    // and merge the returned tree into the scope var's node. Catches e.g.
    //   o("WAWebPaymentNotificationParser").parseTransactionNode(r)
    //   o("WAWebSomeParser").parseXxx(t)
    {
        const crossRe = /\b[A-Za-z_$][\w$]*\(\s*"(WA[A-Za-z0-9_]+(?:Parser|ParseUtils))"\s*\)\s*\.\s*(parse[A-Za-z0-9_]+)\s*\(/g
        const visited = new Set()
        let xm
        while ((xm = crossRe.exec(localText))) {
            if (inCallback(bodyStart + xm.index)) continue
            const parserModName = xm[1]
            const parserFn = xm[2]
            const key = `${parserModName}#${parserFn}`
            if (visited.has(key)) continue
            const openParen = xm.index + xm[0].length - 1
            const close = skipExpr(localText, openParen + 1, [')'])
            const args = splitTopLevelCommas(localText, openParen + 1, close)
            if (args.length === 0) continue
            const arg0Text = localText.slice(args[0][0], args[0][1]).trim()
            if (!/^[A-Za-z_$][\w$]*$/.test(arg0Text) || !scope.has(arg0Text)) continue
            const parserMod = findModule(parserModName, moduleIndex)
            if (!parserMod) continue
            const exportRe = new RegExp(`\\bl\\.${parserFn}\\s*=\\s*([A-Za-z_$][\\w$]*)`)
            const expMatch = parserMod.factoryBody.match(exportRe)
            if (!expMatch) continue
            const fnDefRe = new RegExp(`function\\s+${expMatch[1]}\\s*\\(([^)]*)\\)\\s*\\{`)
            const fnDef = parserMod.factoryBody.match(fnDefRe)
            if (!fnDef) continue
            const fnStart = fnDef.index + fnDef[0].length
            const fnEnd = skipExpr(parserMod.factoryBody, fnStart, ['}'])
            const fnBodyText = parserMod.factoryBody.slice(fnStart, fnEnd)
            const firstParam = (fnDef[1].split(',')[0] || '').trim()
            if (!firstParam) continue
            visited.add(key)
            const subTree = walkHelperInline(
                fnBodyText,
                firstParam,
                moduleIndex,
                parserMod.factoryBody
            )
            // Ensure the target node exists before merging — helpers that
            // pass a ternary-bound var (`r = e.hasChild("...") ? e.child(...) : null`)
            // declare the binding in scope but may not have had any local
            // method call on it yet, so `nodes` is empty for it.
            mergeIntoNode(getOrCreateNode(arg0Text), subTree)
        }
    }

    // Rebinding-mirror pass — a single var often gets reassigned to many
    // different children across if/else branches (the picture parser binds
    // `n = e.child("delete")|"set"|"request"|"set_avatar"` and then reads
    // attrs on `n`). Pre-pass B fixed the var's scope tag to the FIRST
    // rebinding only, so the second/third/fourth synthetic children stay
    // empty. Find every `<scopeVar> = <parent>.child("<tag>")` rebinding
    // in localText and mirror the accumulated attrs/content from the var's
    // node onto each rebinding's synthetic child.
    for (const [varName, entry] of scope.entries()) {
        if (varName === param) continue
        if (varName.startsWith('__')) continue
        if (!entry.parent || !entry.tag) continue
        if (!nodes.has(varName)) continue
        const sourceNode = nodes.get(varName)
        const sourceA = Object.keys(sourceNode.attrs || {}).length
        const sourceC = (sourceNode.children || []).length
        if (sourceA === 0 && sourceC === 0 && !sourceNode.content) continue
        const rebindRe = new RegExp(`${LB}${reId(varName)}\\s*=\\s*([A-Za-z_$][\\w$]*)\\.(?:child|maybeChild)\\s*\\(\\s*"([^"]+)"`, 'g')
        const rebindings = []
        let rbm
        while ((rbm = rebindRe.exec(localText))) {
            if (inCallback(bodyStart + rbm.index)) continue
            rebindings.push({ parent: rbm[1], tag: rbm[2] })
        }
        if (rebindings.length <= 1) continue
        for (const rb of rebindings) {
            // Skip the rebinding pre-pass B already mapped (sourceNode IS that one).
            if (rb.parent === entry.parent && rb.tag === entry.tag) continue
            const synthetic = `__${rb.parent}_${rb.tag}`
            if (!scope.has(synthetic)) {
                scope.set(synthetic, { tag: rb.tag, parent: rb.parent, cardinality: entry.cardinality })
            }
            const t = getOrCreateNode(synthetic)
            if (!t.tag) t.tag = rb.tag
            mergeIntoNode(t, sourceNode)
        }
    }

    // Final splice — graft every named scope entry that has a parent into
    // its parent's children list. Runs AFTER helper-inlining + cross-module
    // parser delegation so attrs/content the delegated parser added to a
    // child var (e.g. `r` from `parseTransactionNode(r)`) are picked up.
    //
    // When multiple scope entries point at the same `(parent, tag)` — a
    // synthetic chain-child (`__e_transaction`) AND a ternary-bound var
    // (`r`) both representing `<transaction>` under `<message>` — MERGE
    // their accumulated attrs/content/children rather than skipping the
    // second.
    for (const [varName, entry] of scope.entries()) {
        if (varName === param) continue
        if (!entry.parent) continue
        if (!nodes.has(varName)) continue
        const parentNode = nodes.get(entry.parent)
        if (!parentNode) continue
        const child = nodes.get(varName)
        const existing = parentNode.children.find((c) => c.tag === child.tag)
        if (existing) {
            mergeIntoNode(existing, child)
            continue
        }
        const cardinality = cardinalityToMinMax(entry.cardinality)
        parentNode.children.push({ ...child, ...cardinality })
    }

    return rootNode
}

// Walk a helper-function body just like a regular scope, returning the
// resulting node so the caller can merge it into the live node tree.
function walkHelperInline(helperBody, helperParam, moduleIndex, moduleBody) {
    return walkScope(
        helperBody,
        [0, helperBody.length],
        helperParam,
        null,
        null,
        [],
        moduleIndex,
        moduleBody
    )
}

// Merge a helper-derived node into an existing node — copy attrs / content /
// children without clobbering already-set entries.
function mergeIntoNode(dst, src) {
    if (!dst || !src) return
    for (const [k, v] of Object.entries(src.attrs || {})) {
        if (!(k in dst.attrs)) dst.attrs[k] = v
    }
    if (src.content && !dst.content) dst.content = src.content
    for (const c of src.children || []) {
        if (dst.children.some((x) => x.tag === c.tag)) continue
        dst.children.push(c)
    }
}

// Some parsers store an enum map in a local var and pass that as the enum
// argument: `var u=o("WAWebSomeEnum"); ... e.attrEnumValues("type", u.members())`.
// The raw `enumRef` we'd otherwise capture is just `u.members()` — useless
// to the cross-module resolver. Trace the local var's assignment back to
// the originating `<ld>("Mod").<thing>` expression OR an in-module enum
// literal (`n("$InternalEnum")({...})`), and use THAT as the canonical
// enum ref / inline-resolved expression.
function inlineEnumRef(ref, moduleBody) {
    if (!ref || !moduleBody) return ref
    const m = ref.match(/^([A-Za-z_$][\w$]*)(\.members\(\)|\.[\w$]+)?\s*$/)
    if (!m) return ref
    const varName = m[1]
    const suffix = m[2] || ''
    // Walk every `<varName>=` assignment, keeping ONLY those whose RHS
    // looks like an enum map / factory / module ref. JS hoists `var X`
    // declarations to the function scope, so a single local name can be
    // reassigned inside nested blocks (`if(t.hasChild("biz")){var u=cast(...)}`)
    // to something that ISN'T the enum we care about. We prefer the FIRST
    // matching assignment (typically the canonical one at the top of the
    // module) and explicitly reject reassignments that contain `.cast(`
    // — those are runtime conversion sites, not enum tables.
    const declRe = new RegExp(`(?:\\bvar\\s+|[,;{])\\s*${varName}\\s*=\\s*`, 'g')
    let dm
    let firstRhs = null
    while ((dm = declRe.exec(moduleBody))) {
        const start = dm.index + dm[0].length
        const end = skipExpr(moduleBody, start, [',', ';', '}'])
        const rhs = moduleBody.slice(start, end).trim()
        if (/\.cast\s*\(/.test(rhs)) continue
        // Three accepted RHS shapes:
        //   1. `<ld>("Mod").<rest>`      — cross-module enum ref
        //   2. `n("$InternalEnum")({…})` — local factory-wrapped enum
        //   3. `{a:"x", b:"y", …}`       — plain inline object literal
        if (
            /^[A-Za-z_$][\w$]*\(\s*"[^"]+"\s*\)/.test(rhs) ||
            rhs.startsWith('{')
        ) {
            firstRhs = rhs
            break
        }
    }
    if (!firstRhs) return ref
    return firstRhs + suffix
}

function cardinalityToMinMax(c) {
    if (c === 'one') return { min: 1, max: 1 }
    if (c === 'zero-or-one') return { min: 0, max: 1 }
    if (c === 'zero-or-more') return { min: 0, max: null }
    return {}
}

// Sniff a short human-readable description of any predicate that gates the
// case body's handler return. Walks a few well-known patterns the bundle
// uses to distinguish stanza sub-types without a wire-level attribute:
//   - `if (isNewsletter(<from>)) return …`   → from-is-newsletter
//   - `if (!isNewsletter(<from>)) return …`  → from-is-not-newsletter
//   - `if (isCallReceipt(<node>)) return …`  → is-call-receipt
//   - `if (!isCallReceipt(<node>)) return …` → is-not-call-receipt
// Looks at the EXACT if-condition wrapping the handler return so positive
// and negative branches don't collapse to the same label.
function extractGuardCondition(caseBody) {
    // Find each `if (<cond>) return ...` in the body and pair the cond's
    // sign with the return. The condition can contain nested calls
    // (`isNewsletter(s==null?void 0:s.toString())`) so we walk parens
    // properly via `skipExpr` instead of trying to match with regex.
    const re = /\bif\s*\(/g
    let m
    while ((m = re.exec(caseBody))) {
        const openParen = m.index + m[0].length - 1
        const close = skipExpr(caseBody, openParen + 1, [')'])
        const cond = caseBody.slice(openParen + 1, close).trim()
        // What comes after the `if (...)` — keep going only if it's a return.
        let after = close + 1
        while (after < caseBody.length && /\s/.test(caseBody[after])) after++
        if (!caseBody.slice(after, after + 7).match(/^return\b/)) continue
        // Detect the leading `!` to flip sense.
        let negated = false
        let inner = cond
        if (inner.startsWith('!')) { negated = true; inner = inner.slice(1).trim() }
        if (/WAWebWid"?\s*\)\.isNewsletter\b/.test(inner))
            return negated ? 'from-is-not-newsletter' : 'from-is-newsletter'
        if (/\bisCallReceipt\b/.test(inner))
            return negated ? 'is-not-call-receipt' : 'is-call-receipt'
        if (/isNewsletterStatusReceiverEnabled/.test(inner))
            return negated ? 'newsletter-status-not-enabled' : 'newsletter-status-enabled'
    }
    return null
}

// Resolve `<localVar>.<MEMBER>` to its string value by tracing the local
// var's RHS in the surrounding factory body. Handles:
//   var c = n("$InternalEnum")({LOG: "log", ABPROPS: "abprops"})
//   ... c.LOG  →  "log"
//   var x = {FOO: "foo", BAR: "bar"}
//   ... x.FOO  →  "foo"
// Returns null when the expression doesn't match the pattern or the trace
// fails.
function resolveLocalConstString(expr, moduleBody) {
    if (!expr || !moduleBody) return null
    // Bare var: `_` → `var _ = "update"`
    const idM = expr.match(/^([A-Za-z_$][\w$]*)\s*$/)
    if (idM) {
        const re = new RegExp(`(?:\\bvar\\s+|[,;])\\s*${idM[1]}\\s*=\\s*["']([^"']+)["']`)
        const m = moduleBody.match(re)
        return m ? m[1] : null
    }
    // Member access: `c.LOG` → `var c = n("$InternalEnum")({LOG:"log",...})`
    const m = expr.match(/^([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*$/)
    if (!m) return null
    const [, varName, memberName] = m
    const declRe = new RegExp(`(?:\\bvar\\s+|[,;])\\s*${varName}\\s*=\\s*`, 'g')
    let dm
    let lastIdx = -1
    while ((dm = declRe.exec(moduleBody))) lastIdx = dm.index + dm[0].length
    if (lastIdx === -1) return null
    let j = lastIdx
    const lim = Math.min(j + 200, moduleBody.length)
    while (j < lim && moduleBody[j] !== '{') j++
    if (j >= lim) return null
    const close = skipExpr(moduleBody, j + 1, ['}'])
    const obj = moduleBody.slice(j + 1, close)
    const subRe = new RegExp(`${LB}${reId(memberName)}\\s*:\\s*["']([^"']+)["']`)
    const subM = obj.match(subRe)
    return subM ? subM[1] : null
}

// Strip inline-assignment wrappers and resolve local var aliases that point
// at module refs. Handles two patterns minifiers love:
//
//   (i=o("Mod")).CONST.SUB           → "o(\"Mod\").CONST.SUB"
//   <localVar>.CONST.SUB where elsewhere `(<localVar>=o("Mod"))` was used
//                                    → "o(\"Mod\").CONST.SUB"
//
// Used to turn `e.child((i=o("X")).INFO_TYPE.OFFLINE_PREVIEW)` and
// downstream `e.child(i.INFO_TYPE.OFFLINE_PREVIEW)` calls into a single
// canonical form so resolveConstStringExpr can trace the module export.
function normalizeInlineAssign(expr, moduleBody) {
    if (!expr) return expr
    // Pattern 1: `(<id>=<inner>).<rest>`
    let m = expr.match(/^\(\s*[A-Za-z_$][\w$]*\s*=\s*([\s\S]+?)\s*\)\s*(\..*)$/)
    if (m) return m[1] + m[2]
    // Pattern 2: `<id>.<rest>` where `(<id>=<modExpr>)` was assigned earlier
    // in moduleBody. We only follow this when `<modExpr>` is itself a
    // recognisable module-loader call like `[A-Za-z_$]\\w*\\("..."\\)` —
    // anything else risks rewriting unrelated locals.
    m = expr.match(/^([A-Za-z_$][\w$]*)(\..+)$/)
    if (m && moduleBody) {
        const [, varName, suffix] = m
        const re = new RegExp(`\\(\\s*${varName}\\s*=\\s*([A-Za-z_$][\\w$]*\\(\\s*"[^"]+"\\s*\\))\\s*\\)`)
        const am = re.exec(moduleBody)
        if (am) return am[1] + suffix
    }
    return expr
}

// Resolve a tag-position expression to a literal string. Handles:
//   - "literal"  → 'literal'
//   - `<ld>("Mod").CONST` / `<ld>("Mod").CONST.SUB` → traces `var X = "x"` or
//     `Object.freeze({SUB: "x", ...})` in the target module and returns the
//     resolved value. Returns null when the trace fails.
function resolveConstStringExpr(text, moduleIndex) {
    if (!text) return null
    const litM = text.match(/^['"](.*)['"]$/)
    if (litM) return litM[1]
    // `<ld>("ModName").<exportName>[.<sub>]` — trace the export.
    const m = text.match(/^[A-Za-z_$][\w$]*\("([^"]+)"\)\.([A-Za-z_$][\w$]*)(?:\.([A-Za-z_$][\w$]*))?\s*$/)
    if (!m) return null
    const modText = moduleIndex.get(m[1])
    if (!modText) return null
    const mod = findModuleRegistration(modText, m[1])
    if (!mod) return null
    const body = mod.factoryBody
    // Find `<export> = <varName>` then trace the var.
    const expRe = new RegExp(`\\b[il]\\.${m[2]}\\s*=\\s*([A-Za-z_$][\\w$]*)`)
    const expM = body.match(expRe)
    if (!expM) return null
    const varName = expM[1]
    if (!m[3]) {
        // Direct ref — match `var <var>="..."`
        const vm = new RegExp(`${LB}${reId(varName)}\\s*=\\s*['"]([^'"]+)['"]`).exec(body)
        return vm ? vm[1] : null
    }
    // Subscript ref — match `<var>=Object.freeze({...,<sub>:"x",...})` OR
    // `<var>={...,<sub>:"x",...}` and pull the sub's literal value.
    const objRe = new RegExp(`${LB}${reId(varName)}\\s*=\\s*(?:Object\\.freeze\\s*\\()?\\s*\\{`)
    const om = objRe.exec(body)
    if (!om) return null
    const objStart = body.indexOf('{', om.index + om[0].length - 1)
    const objEnd = skipExpr(body, objStart + 1, ['}'])
    const obj = body.slice(objStart + 1, objEnd)
    const subRe = new RegExp(`${LB}${reId(m[3])}\\s*:\\s*['"]([^'"]+)['"]`)
    const subM = obj.match(subRe)
    return subM ? subM[1] : null
}

// Name-based wire-type inference for raw `e.attrs.X` access — used when a
// handler walks the stanza manually (no ParsableWapNode methods). Falls
// back to `string?` when the name isn't recognised.
function inferRawAttrType(name) {
    if (name === 'id') return { type: 'stanzaId', optional: true }
    if (name === 'from' || name === 'to') return { type: 'jid', optional: true }
    if (name === 'participant' || name === 'recipient') return { type: 'userJid', optional: true }
    if (name === 'participant_pn' || name === 'recipient_pn') return { type: 'userJid', optional: true }
    if (name === 'jid') return { type: 'jid', optional: true }
    if (name === 't' || name === 'timestamp' || name === 'count') return { type: 'int', optional: true }
    if (name === 'offline') return { type: 'int', optional: true }
    if (name === 'e' || name === 'ts' || name === 'expiry' || name === 'expires_at' || name === 'duration') return { type: 'int', optional: true }
    if (name === 'is_lid' || name === 'view_once' || name === 'is_sender' || name === 'beta') return { type: 'string', optional: true }
    return { type: 'string', optional: true }
}

// Walk a handler-module body looking for sub-handler delegation calls
// (`<ld>("WAWeb<Mod>").handle<Name>(<arg>)`), then for each sub-handler
// recurse one level into ITS module body looking for a Smax `receive*RPC`
// delegate. Returns the deduped list of RPC refs that chain through.
//
// This catches handlers that parse the outer stanza, then forward to a
// sub-handler that owns the inner RPC — e.g. notification/newsletter →
// WAWebNewsletterHandleLiveUpdatesNotification → receiveLiveUpdatesNotificationRPC.
// Recurses ONLY one level to keep scope tight and avoid cycles.
function findSubHandlerDelegates(body, moduleIndex) {
    const subRe = /[A-Za-z_$][\w$]*\(\s*"(WAWeb[A-Za-z0-9_]+)"\s*\)\s*\.\s*(handle[A-Za-z0-9_]*)\s*\(/g
    const rpcRe = /[A-Za-z_$][\w$]*\(\s*"(WASmax[A-Za-z0-9_]*RPC)"\s*\)\s*\.\s*(receive[A-Za-z0-9_]*RPC)\s*\(/g
    const seenSub = new Set()
    const subs = []
    let sm
    while ((sm = subRe.exec(body))) {
        const key = sm[1] + '.' + sm[2]
        if (seenSub.has(key)) continue
        seenSub.add(key)
        subs.push({ module: sm[1], method: sm[2] })
    }
    if (subs.length === 0) return []
    const out = []
    const seenRpc = new Set()
    for (const sub of subs) {
        const subMod = findModule(sub.module, moduleIndex)
        if (!subMod) continue
        const subBody = subMod.factoryBody
        let rm
        rpcRe.lastIndex = 0
        while ((rm = rpcRe.exec(subBody))) {
            const key = rm[1] + '.' + rm[2]
            if (seenRpc.has(key)) continue
            seenRpc.add(key)
            out.push({ module: rm[1], method: rm[2] })
        }
    }
    return out
}

// Locate the schema for a handler module. Strategy (highest signal first):
//
//   1. If the module declares one or more `new WADeprecatedWapParser("<name>",
//      function(<param>){...})` instances, prefer the callback — it's the
//      pure parsing function and `param` is the bound stanza var.
//   2. Otherwise walk the handler function the dispatch table calls. If that
//      function is an asyncToGenerator shim (`return s.apply(this,
//      arguments)`), descend into the inner `function*(...)` body.
//   3. If the handler instead delegates to a Smax `receive*RPC`, leave the
//      tree empty and annotate with `delegatesToRPC` so consumers can join
//      against the Phase-1 operations table.
//
// Returns `{ node, entryName, delegatesToRPC? }` or `{ error }`.
function extractHandlerModule(moduleName, method, moduleIndex) {
    const mod = findModule(moduleName, moduleIndex)
    if (!mod) return { error: 'module-not-found' }
    const body = mod.factoryBody

    // (1) WADeprecatedWapParser instances. The callback is `function(<param>){
    // <body> }`. The parser's *name* (first arg) is usually a string literal
    // but can also be a hoisted identifier (`var d="mexNotificationParser",
    // m=new(...)WADeprecatedWapParser(d, function(e){...})`); resolve via
    // a permissive head match + a brace-balanced body walk.
    const deprecatedRe = /new\s*\(?\s*[A-Za-z_$][\w$]*\(\s*"WADeprecatedWapParser"\s*\)\s*\)?\s*\(/g
    let dm
    let firstParser = null
    while ((dm = deprecatedRe.exec(body))) {
        const openParen = dm.index + dm[0].length - 1
        const close = skipExpr(body, openParen + 1, [')'])
        const args = splitTopLevelCommas(body, openParen + 1, close).map(([a, b]) => body.slice(a, b).trim())
        if (args.length < 2) continue
        const nameArg = args[0]
        // Resolve name — either literal or `var <id>="..."` declared earlier.
        let parserName = null
        const litM = nameArg.match(/^['"](.*)['"]$/)
        if (litM) parserName = litM[1]
        else if (/^[A-Za-z_$][\w$]*$/.test(nameArg)) {
            const traced = new RegExp(`${LB}${reId(nameArg)}\\s*=\\s*['"]([^'"]+)['"]`).exec(body)
            if (traced) parserName = traced[1]
        }
        const fnMatch = args[1].match(/^function\s*\(([^)]*)\)\s*\{/)
        if (!fnMatch) continue
        const paramsText = fnMatch[1]
        const fnBodyOpen = body.indexOf(args[1], openParen) + fnMatch.index + fnMatch[0].length
        const fnBodyEnd = skipExpr(body, fnBodyOpen, ['}'])
        firstParser = {
            name: parserName,
            params: paramsText,
            fnBody: body.slice(fnBodyOpen, fnBodyEnd)
        }
        break
    }
    if (firstParser) {
        const rootParam = (firstParser.params.split(',')[0] || '').trim()
        if (rootParam) {
            const tree = buildHandlerTree(firstParser.fnBody, rootParam, moduleIndex, body)
            // Some handlers parse the stanza's outer attrs via Tier 1, then
            // dispatch to a sub-handler that delegates to a Smax `receive*RPC`
            // (e.g. WAWebHandleNewsletterNotification → cast → forward to
            // WAWebNewsletterHandleLiveUpdatesNotification → receiveLiveUpdatesNotificationRPC).
            // The parser tree alone misses the inner schema — chase sub-handler
            // calls one level deep to surface the underlying RPC delegate.
            const subDelegates = findSubHandlerDelegates(body, moduleIndex)
            const result = { node: tree, entryName: method, parserName: firstParser.name }
            if (subDelegates.length === 1) result.delegatesToRPC = subDelegates[0]
            else if (subDelegates.length > 1) result.delegatesToRPC = subDelegates
            return result
        }
    }

    // Map `l.<exportedName> = <funcId>` so we can resolve the dispatcher's
    // method name to a local function declaration. Trailing punctuation may
    // be absent at end-of-body.
    const exportRe = /\bl\.([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\s*(?:[,;}]|$)/g
    const exports_ = {}
    let em
    while ((em = exportRe.exec(body))) exports_[em[1]] = em[2]

    // Prefer the exact method name the dispatch table calls; fall back to
    // `default` or a single export.
    let entryFnId = exports_[method] || exports_.default
    if (!entryFnId) {
        const handleKey = Object.keys(exports_).find((k) => /^handle/.test(k))
        entryFnId = handleKey ? exports_[handleKey] : Object.values(exports_)[0]
    }
    if (!entryFnId) return { error: 'no-export', exports: Object.keys(exports_) }

    let entry = findFunctionBody(body, entryFnId)
    if (!entry) return { error: 'entry-function-not-found', entryFnId }

    // Async wrapper: `function e(t){ return s.apply(this, arguments) }`. The
    // actual logic lives in the generator the wrapper invokes — descend into
    // it, picking the generator body that follows `asyncToGenerator(function*
    // (...)){`. Note this is the *first* generator in the module body; for
    // modules with multiple generators (rare in handlers) the choice could be
    // wrong but is good-enough for the schema.
    if (/return\s+[A-Za-z_$][\w$]*\.apply\s*\(\s*this/.test(entry.fnBody)) {
        const innerMatch = body.match(/function\s*\*\s*\(([^)]*)\)\s*\{/)
        if (innerMatch) {
            const start = innerMatch.index + innerMatch[0].length
            const end = skipExpr(body, start, ['}'])
            entry = {
                params: innerMatch[1],
                fnBody: body.slice(start, end)
            }
        }
    }

    // (3) Delegation to one or more Smax `receive*RPC` parsers. Some
    // handlers dispatch by sub-attribute (e.g. `link_code_companion_reg`
    // routes on `stage` to two different `receive*RPC` calls); collect ALL
    // of them so consumers can resolve each variant against Phase-1.
    //
    // Search the ENTIRE module body (not just the entry function) — many
    // handlers route through helper functions like `c(t)` / `d(e)` whose
    // bodies live alongside the entry, and the RPC delegation happens in
    // those helpers.
    const allDelegates = []
    {
        const re = /[A-Za-z_$][\w$]*\(\s*"(WASmax[A-Za-z0-9_]*RPC)"\s*\)\s*\.\s*(receive[A-Za-z0-9_]*RPC)\s*\(/g
        const seen = new Set()
        let m
        while ((m = re.exec(body))) {
            const key = m[1] + '.' + m[2]
            if (seen.has(key)) continue
            seen.add(key)
            allDelegates.push({ module: m[1], method: m[2] })
        }
    }
    if (allDelegates.length === 1) {
        return {
            node: null,
            entryName: method,
            delegatesToRPC: allDelegates[0]
        }
    }
    if (allDelegates.length > 1) {
        return {
            node: null,
            entryName: method,
            delegatesToRPC: allDelegates
        }
    }

    // (3b) Delegation to a WASmaxIn* parser directly (no surrounding RPC
    // wrapper). Reuse the IQ extractor's declarative-walker — it knows the
    // `WASmaxParseUtils.*` API. The OO walker in this file does not.
    const smaxInRe = /[A-Za-z_$][\w$]*\(\s*"(WASmaxIn[A-Za-z0-9_]+(?:Request|Notification|Response[A-Za-z0-9_]*))"\s*\)\s*\.\s*(parse[A-Za-z0-9_]+)\s*\(/
    const smaxInMatch = entry.fnBody.match(smaxInRe) || body.match(smaxInRe)
    if (smaxInMatch) {
        const { extractResponseModule: extractSmaxResponse } = require('./extract-xml.cjs')
        const res = extractSmaxResponse(smaxInMatch[1], moduleIndex, new Map(), smaxInMatch[2])
        if (res && res.node) {
            return {
                node: res.node,
                entryName: method,
                delegatesToParser: {
                    module: smaxInMatch[1],
                    parser: smaxInMatch[2]
                }
            }
        }
    }

    // (4) Delegation to a separate `*Parser` module. Two shapes:
    //   a) `o("WAWebHandleMsgParser").incomingMsgParser.parse(t)` — named
    //      accessor on the module's exports
    //   b) `r("WAWebRetryRequestParser").parse(t)` — default-export call
    //      where the parser module exports its `parse` function directly
    // Both are followed into the parser module's `WADeprecatedWapParser`
    // instance (or top-level `parse` function) for the schema.
    // Three shapes:
    //   a) `o("WAWebHandleMsgParser").incomingMsgParser.parse(t)` — named accessor
    //   b) `r("WAWebRetryRequestParser").parse(t)` — default `.parse`
    //   c) `r("WAWebNewsletterMsgParser")(t)` — module exports its parse as default
    //      callable (no `.parse` suffix). Recognise this form too: the parser
    //      module's `l.default` is the entry, and that function typically
    //      delegates further (commonly to a Smax `receive*RPC`).
    //
    // Module name pattern broadened from `*Parser` to also include
    // `WAWebParse*Notification` modules (e.g. `WAWebParseQPSurfacesNotification`)
    // — they act as parsers without the `Parser` suffix.
    const parserDelegateRe = /[A-Za-z_$][\w$]*\(\s*"(WA(?:[A-Za-z0-9_]*Parser|WebParse[A-Za-z0-9_]+))"\s*\)(?:\s*\.\s*([A-Za-z_$][\w$]*))?\s*\.\s*parse[A-Za-z0-9_]*\s*\(|[A-Za-z_$][\w$]*\(\s*"(WA(?:[A-Za-z0-9_]*Parser|WebParse[A-Za-z0-9_]+))"\s*\)\s*\(/
    const parserDelegateMatch = (entry.fnBody.match(parserDelegateRe) || body.match(parserDelegateRe))
    if (parserDelegateMatch) {
        // Normalise: pattern (c) places the module name in group 3, no accessor.
        if (!parserDelegateMatch[1] && parserDelegateMatch[3]) {
            parserDelegateMatch[1] = parserDelegateMatch[3]
            parserDelegateMatch[2] = null
        }
    }
    if (parserDelegateMatch) {
        const parserMod = findModule(parserDelegateMatch[1], moduleIndex)
        if (parserMod) {
            const re = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*new\s*\(?\s*[A-Za-z_$][\w$]*\(\s*"WADeprecatedWapParser"\s*\)\s*\)?\s*\(\s*"([^"]+)"\s*,\s*function\s*\(([^)]*)\)\s*\{/g
            let parserDm
            let candidate = null
            while ((parserDm = re.exec(parserMod.factoryBody))) {
                const start = parserDm.index + parserDm[0].length
                const end = skipExpr(parserMod.factoryBody, start, ['}'])
                const inst = {
                    varName: parserDm[1],
                    parserName: parserDm[2],
                    params: parserDm[3],
                    fnBody: parserMod.factoryBody.slice(start, end)
                }
                // Prefer the instance bound to the same accessor name as the
                // call site (when the parser module exports several).
                if (parserDelegateMatch[2] && parserMod.factoryBody.includes(`l.${parserDelegateMatch[2]}=${inst.varName}`)) {
                    candidate = inst
                    break
                }
                if (!candidate) candidate = inst
            }
            // No explicit instance? Fall back to walking the module's exported
            // `parse*` / `default` function (the parser may declare it as a
            // standalone `function parseXxx(t){...}` OR as the default callable).
            if (!candidate) {
                const exportRe = /\bl\.(parse[A-Za-z0-9_]*|default)\s*=\s*([A-Za-z_$][\w$]*)/.exec(parserMod.factoryBody)
                if (exportRe) {
                    const fnRe = new RegExp(`function\\s+${exportRe[2]}\\s*\\(([^)]*)\\)\\s*\\{`)
                    const fm = parserMod.factoryBody.match(fnRe)
                    if (fm) {
                        const start = fm.index + fm[0].length
                        const end = skipExpr(parserMod.factoryBody, start, ['}'])
                        candidate = {
                            varName: exportRe[2],
                            parserName: exportRe[1],
                            params: fm[1],
                            fnBody: parserMod.factoryBody.slice(start, end)
                        }
                    }
                }
            }
            // Recursive RPC delegation: when the parser fallback function
            // itself calls a `receive*RPC`, follow that and reuse the
            // Phase-1 op's response as our schema.
            if (candidate && /\breceive[A-Za-z0-9_]*RPC\s*\(/.test(candidate.fnBody)) {
                const rpcRe = /[A-Za-z_$][\w$]*\(\s*"(WASmax[A-Za-z0-9_]*RPC)"\s*\)\s*\.\s*(receive[A-Za-z0-9_]*RPC)\s*\(/
                const rpcM = candidate.fnBody.match(rpcRe)
                if (rpcM) {
                    return {
                        node: null,
                        entryName: method,
                        delegatesToParser: {
                            module: parserDelegateMatch[1],
                            parser: candidate.parserName
                        },
                        delegatesToRPC: { module: rpcM[1], method: rpcM[2] }
                    }
                }
            }
            if (candidate) {
                const rootParam = (candidate.params.split(',')[0] || '').trim()
                if (rootParam) {
                    const tree = buildHandlerTree(candidate.fnBody, rootParam, moduleIndex, parserMod.factoryBody)
                    return {
                        node: tree,
                        entryName: method,
                        delegatesToParser: {
                            module: parserDelegateMatch[1],
                            parser: candidate.parserName
                        }
                    }
                }
            }
        }
    }

    const rootParam = (entry.params.split(',')[0] || '').trim()
    if (!rootParam) return { error: 'no-root-param' }
    const tree = buildHandlerTree(entry.fnBody, rootParam, moduleIndex, body)
    return { node: tree, entryName: method }
}

function findFunctionBody(body, fnId) {
    const re = new RegExp(`function\\s+${fnId}\\s*\\(([^)]*)\\)\\s*\\{`)
    const m = body.match(re)
    if (!m) return null
    const start = m.index + m[0].length
    const end = skipExpr(body, start, ['}'])
    return { params: m[1], fnBody: body.slice(start, end) }
}

// ---------------------------------------------------------------------------
// Public entry point.
// ---------------------------------------------------------------------------

function extractNonIq(bundles) {
    const moduleIndex = buildModuleIndex(bundles)
    const dispatch = parseDispatchTable(moduleIndex)
    if (!dispatch) return { error: 'dispatch-table-not-found' }

    const stanzas = {}
    const diagnostics = {
        rootTags: Object.keys(dispatch).length,
        variantsTotal: 0,
        handlersExtracted: 0,
        handlersErrored: 0,
        errors: []
    }

    function processHandler(handler, where) {
        if (!handler) return null
        try {
            const res = extractHandlerModule(handler.module, handler.method, moduleIndex)
            if (res.error) {
                diagnostics.handlersErrored++
                diagnostics.errors.push({
                    where,
                    module: handler.module,
                    method: handler.method,
                    error: res.error
                })
                return { handler, error: res.error }
            }
            diagnostics.handlersExtracted++
            return { handler, ...res }
        } catch (err) {
            diagnostics.handlersErrored++
            diagnostics.errors.push({
                where,
                module: handler.module,
                method: handler.method,
                error: err.message
            })
            return { handler, error: err.message }
        }
    }

    for (const [tag, entry] of Object.entries(dispatch)) {
        if (entry.variants) {
            const variants = {}
            for (const [type, handler] of Object.entries(entry.variants)) {
                diagnostics.variantsTotal++
                variants[type] = processHandler(handler, `${tag}/${type}`)
            }
            stanzas[tag] = { tag, discriminator: entry.discriminator, variants }
        } else if (entry.handlers && entry.handlers.length > 0) {
            // Multi-handler dispatch (same root tag routed by predicates) —
            // process each, keeping its `condition` description alongside the
            // schema so consumers know what gates which handler.
            const variants = {}
            for (const h of entry.handlers) {
                diagnostics.variantsTotal++
                const label = h.condition || h.handler?.module || 'unknown'
                variants[label] = {
                    ...processHandler(h.handler, `${tag}/${label}`),
                    ...(h.condition ? { condition: h.condition } : {})
                }
            }
            stanzas[tag] = { tag, discriminator: 'condition', variants }
        } else if (!entry.handler) {
            // Cases like `xmlstreamend` that only log + return "NO_ACK" —
            // intentionally schemaless on the client side. Surface that so
            // downstream consumers don't treat the missing tree as a gap.
            stanzas[tag] = { tag, noSchema: true }
        } else {
            stanzas[tag] = {
                tag,
                ...processHandler(entry.handler, tag),
                ...(entry.condition ? { condition: entry.condition } : {})
            }
        }
    }

    return { stanzas, diagnostics }
}

module.exports = { extractNonIq }
