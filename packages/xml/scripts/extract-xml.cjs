'use strict'

/**
 * Static XML/stanza schema extractor — Phase 1 (Smax RPC operations only).
 *
 * WA Web sends/receives binary XMPP-like "stanzas" (`WapNode` trees) over the
 * encrypted noise tunnel. For request/response IQ operations, the client code
 * is declarative in two places:
 *
 *   - `WASmaxOut*Request`     — builds the request tree via `smax(tag, attrs, ...children)`
 *                                (`smax === WAWap.wap`). Attr values are wrapped
 *                                in `WAWap.<COERCER>` (CUSTOM_STRING / INT /
 *                                LONG_INT / USER_JID / …) or
 *                                `WASmaxAttrs.OPTIONAL(coercer, val)` /
 *                                `OPTIONAL_LITERAL(lit, cond)`. `DROP_ATTR`
 *                                drops an attribute at send time.
 *   - `WASmaxIn*Response*`    — parses the response tree via the
 *                                `WASmaxParseUtils.*` primitives
 *                                (assertTag, attrString, attrInt, attrIntRange,
 *                                attrStringEnum, optionalChildWithTag,
 *                                mapChildrenWithTag, contentString, …).
 *
 * Each operation is tied together by a `WASmax*RPC` module that imports one
 * `WASmaxOut*Request` builder plus N `WASmaxIn*Response*` parsers and
 * dispatches the server response to whichever parser claims success first.
 *
 * The extractor:
 *
 *   1. Enumerates every `__d("WASmax*RPC", ...)` registration across bundles.
 *   2. From each RPC's deps + factory body recovers:
 *        - the operation name (from `send<Op>RPC` export and/or the
 *          `errorMessageRpcParsing("<Op>", …)` throw)
 *        - the request module (one `WASmaxOut*Request` dep)
 *        - the response modules (every `WASmaxIn*Response*` dep)
 *   3. Walks the request module to produce the request schema tree (tag,
 *      attrs, children). Mixin wrappers (`*BaseIQ<Type>RequestMixin`) are
 *      followed to recover the iq `id`/`type` attrs they inject.
 *   4. Walks each response module to produce its response schema tree.
 *
 * Unrecognised nodes are kept as `{ unknown: true, raw: "<snippet>" }` so the
 * diff workflow surfaces drift without failing the build.
 */

const {
    skipExpr,
    skipWs,
    parseCallArgs,
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
// Bundle-wide module lookup. Building a name→bundle index up front keeps the
// per-RPC lookups O(1) instead of re-scanning every bundle.
// ---------------------------------------------------------------------------

function buildModuleIndex(bundles) {
    const idx = new Map() // moduleName → bundle text
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
// WAWap coercer recognition. Attr values in request stanzas are wrapped in
// typed coercer functions exported by WAWap. The mapping is fixed in the
// bundle (see wa-web/WAWap/WAWap.js exports at the bottom of the module).
// ---------------------------------------------------------------------------

const WAWAP_COERCERS = {
    STANZA_ID: 'stanzaId',
    SMAX_ID: 'smaxId',
    CUSTOM_STRING: 'string',
    MAYBE_CUSTOM_STRING: 'string',
    CALL_ID: 'callId',
    INT: 'int',
    LONG_INT: 'longInt',
    BIG_ENDIAN_CONTENT: 'bytes',
    USER_JID: 'userJid',
    DEVICE_JID: 'deviceJid',
    GROUP_JID: 'groupJid',
    BROADCAST_JID: 'broadcastJid',
    CALL_JID: 'callJid',
    NEWSLETTER_JID: 'newsletterJid',
    TO_WAP_JID: 'jid',
    JID: 'jid',
    DOMAIN_JID: 'jid'
}

// Stanza root tags that NEVER carry payload bytes per protocol. Used
// by decodeSmaxCall to disambiguate trailing bare-ident args — for
// these tags, the trailing arg is always a child node reference,
// never content. Without this guard, calls like
// `wap("receipt", {...}, i)` (where `i` is a child node) get
// misinterpreted as `<receipt>` with bytes content.
const CONTENTLESS_STANZA_ROOTS = new Set([
    'receipt', 'message', 'notification', 'presence', 'iq', 'ack',
    'call', 'failure', 'success', 'error', 'ib', 'chatstate',
    'status', 'stream:error', 'xmlstreamend'
])

// `WAWebCommsWapMd` is a sibling helper module that wraps `WAWebWid` ->
// `WapJid` conversions for the outgoing-message builders. Each function
// validates the WID kind and emits the matching `WapJid`. Map to the
// same wire types as the WAWap coercers.
const WACOMMS_JID_COERCERS = {
    USER_JID: 'userJid',
    DEVICE_JID: 'deviceJid',
    CHAT_JID: 'jid',
    GROUP_JID: 'groupJid',
    GROUP_CALL_JID: 'callJid',
    JID: 'jid'
}

// Well-known WAWap constants that appear as attr values. Map to literal JIDs
// when known so consumers don't have to chase the constant.
const WAWAP_CONSTANTS = {
    S_WHATSAPP_NET: { type: 'literal', value: 's.whatsapp.net' },
    G_US: { type: 'literal', value: 'g.us' },
    STATUS_BROADCAST: { type: 'literal', value: 'status@broadcast' },
    NEWSLETTER: { type: 'literal', value: 'newsletter' },
    HOSTED: { type: 'literal', value: 'hosted' },
    HOSTED_LID: { type: 'literal', value: 'hosted.lid' },
    CALL: { type: 'literal', value: 'call' }
}

// Parser-helper primitives → schema descriptor. The descriptor tells the
// response walker what kind of attribute / child / content the call describes.
//
// Three helper modules live alongside `WASmaxParseUtils`:
//   - WASmaxParseUtils     — generic attr / child / content accessors
//   - WASmaxParseJid       — typed JID attr helpers (userJid, groupJid, …)
//   - WASmaxParseReference — multi-level path-walking helpers (rarer)
// Methods from all three are folded into the same descriptor table; the
// walker doesn't distinguish which module the call came from.
const PARSE_UTILS = {
    // --- WASmaxParseUtils ---
    assertTag: { kind: 'assertTag' },
    assertAttr: { kind: 'assertAttr' },
    attrString: { kind: 'attr', type: 'string' },
    attrInt: { kind: 'attr', type: 'int' },
    attrIntRange: { kind: 'attr', type: 'int', withRange: true },
    attrStanzaId: { kind: 'attr', type: 'stanzaId' },
    attrCallId: { kind: 'attr', type: 'callId' },
    attrValidate: { kind: 'attr', type: 'string' },
    attrStringEnum: { kind: 'attr', type: 'enum' },
    optional: { kind: 'wrap', optional: true },
    optionalLiteral: { kind: 'wrap', optional: true, literal: true },
    literal: { kind: 'wrap', literal: true },
    optionalChild: { kind: 'child', cardinality: 'zero-or-one' },
    optionalChildWithTag: { kind: 'child', cardinality: 'zero-or-one', tagged: true },
    childWithTag: { kind: 'child', cardinality: 'one', tagged: true },
    flattenedChildWithTag: { kind: 'child', cardinality: 'one', tagged: true, flattened: true },
    mapChildrenWithTag: { kind: 'children', tagged: true, mapped: true },
    countChildrenWithTag: { kind: 'children', tagged: true, counted: true },
    mapHomogeneousChildrenWithTag: { kind: 'children', tagged: true, mapped: true, homogeneous: true },
    contentString: { kind: 'content', type: 'string' },
    // `literalContent(innerParseFn, node, "lit")` — pins the content to a
    // specific literal value. Used in mixin disjunctions like
    // `member_add_mode` where each variant maps to a different literal
    // (`AdminAddMode → "admin_add"`, `AllMembersAddMode → "all_member_add"`,
    // etc.). Surfaces as `content: { type: "literal", value: "<lit>" }`.
    literalContent: { kind: 'literalContent' },
    contentBytes: { kind: 'content', type: 'bytes' },
    contentLiteralBytes: { kind: 'content', type: 'bytes', literal: true },
    contentBytesRange: { kind: 'content', type: 'bytes', withRange: true },
    contentInt: { kind: 'content', type: 'int' },
    contentStringEnum: { kind: 'content', type: 'enum' },
    // --- WASmaxParseJid (typed JID helpers) ---
    attrUserJid: { kind: 'attr', type: 'userJid' },
    attrLidUserJid: { kind: 'attr', type: 'lidUserJid' },
    attrDeviceJid: { kind: 'attr', type: 'deviceJid' },
    attrGroupJid: { kind: 'attr', type: 'groupJid' },
    attrCallJid: { kind: 'attr', type: 'callJid' },
    attrDomainJid: { kind: 'attr', type: 'jid' },
    attrBroadcastJid: { kind: 'attr', type: 'broadcastJid' },
    attrStatusJid: { kind: 'attr', type: 'jid' },
    attrNewsletterJid: { kind: 'attr', type: 'newsletterJid' },
    // `attrJidEnum(node, name, {typeName, validators})` validates a string
    // against a list of JID *type* validators (UserJid, GroupJid, …). The
    // wire value is still a JID string, not an enum literal — surface as
    // `jid` to avoid misclassifying the typeName as a value set.
    attrJidEnum: { kind: 'attr', type: 'jid' },
    literalJid: { kind: 'wrap', literal: true }, // (parseFn, node, name, literalValue)
    optionalLiteralJid: { kind: 'wrap', optional: true, literal: true }
}

// Modules whose method calls the schema walker honours. Listing them here
// keeps the call-site filter terse and avoids accidentally folding in calls
// to unrelated `<ld>("Mod").<method>` shapes that happen to share a method
// name with PARSE_UTILS (e.g. `someThing.attrString` on a non-stanza object).
const PARSE_HELPER_MODULES = new Set([
    'WASmaxParseUtils',
    'WASmaxParseJid',
    'WASmaxParseReference'
])

// ---------------------------------------------------------------------------
// Trim a JS expression range to its leftmost non-whitespace start.
// ---------------------------------------------------------------------------

function trimRange(s, start, end) {
    let a = start
    let b = end
    while (a < b && /\s/.test(s[a])) a++
    while (b > a && /\s/.test(s[b - 1])) b--
    return [a, b]
}

function rangeText(s, [a, b]) {
    return s.slice(a, b)
}

// Strip a leading `yield ` / `await ` so we can match the inner call.
function stripAwaitYield(text) {
    return text.replace(/^\s*(?:yield|await)\s+/, '')
}

// ---------------------------------------------------------------------------
// Decode a single attr-value JS expression into an AttrSpec.
// ---------------------------------------------------------------------------

function decodeAttrValue(s, [a, b], ctx) {
    const text = rangeText(s, trimRange(s, a, b)).trim()
    return decodeAttrText(text, ctx)
}

function decodeAttrText(text, ctx) {
    if (!text) return { type: 'unknown' }
    // Inline-assignment prefix: `(<alias>=<ld>("Mod")).<...>` registers the
    // alias for use by sibling expressions, then evaluates the rest as if it
    // had been written directly. We rewrite the text and recurse.
    let prefix = text.match(/^\(\s*([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\("([^"]+)"\)\s*\)/)
    if (prefix) {
        if (ctx) {
            if (prefix[3] === 'WAWap') (ctx.wawapAliases = ctx.wawapAliases || new Set()).add(prefix[1])
            if (prefix[3] === 'WASmaxAttrs') (ctx.attrsAliases = ctx.attrsAliases || new Set()).add(prefix[1])
        }
        const rewritten = `${prefix[2]}("${prefix[3]}")` + text.slice(prefix[0].length)
        return decodeAttrText(rewritten, ctx)
    }

    // Short-circuit OR `<value> || <ld>("WAWap").DROP_ATTR` — semantically
    // identical to `<value> ? <value> : DROP_ATTR` (use value when truthy,
    // omit when null/undefined). Strip the `|| DROP_ATTR` and recurse on
    // the value.
    if (text.includes('DROP_ATTR')) {
        let depth = 0
        let orIdx = -1
        for (let i = 0; i < text.length - 1; i++) {
            const c = text[i]
            if (c === '(') depth++
            else if (c === ')') depth--
            else if (c === '|' && text[i + 1] === '|' && depth === 0) { orIdx = i; break }
        }
        if (orIdx !== -1) {
            const tail = text.slice(orIdx + 2).trim()
            if (/^[A-Za-z_$][\w$]*(?:\("WAWap"\))?\.DROP_ATTR\s*$/.test(tail)) {
                const head = text.slice(0, orIdx).trim()
                const inner = decodeAttrText(head, ctx)
                return { ...inner, optional: true }
            }
        }
    }

    // Outgoing-builder ternary `<cond> ? <value> : <ld>("WAWap").DROP_ATTR`
    // (or the reverse `<cond> ? DROP_ATTR : <value>`). The minified
    // message-construction modules use this to mean "set <value> when
    // <cond>, else omit the attr". Decode the non-DROP_ATTR branch as the
    // attr type and mark optional. We split at the top-level `?` / `:`
    // using paren-balanced scanning so nested `(a ? b : c)` exprs in the
    // value don't trip the regex.
    if (text.includes('DROP_ATTR') && text.includes('?')) {
        let depth = 0
        let qIdx = -1
        for (let i = 0; i < text.length; i++) {
            const c = text[i]
            if (c === '(') depth++
            else if (c === ')') depth--
            else if (c === '?' && depth === 0) { qIdx = i; break }
        }
        if (qIdx !== -1) {
            let d2 = 0
            let cIdx = -1
            for (let i = qIdx + 1; i < text.length; i++) {
                const c = text[i]
                if (c === '(') d2++
                else if (c === ')') d2--
                else if (c === '?' && d2 === 0) d2++
                else if (c === ':' && d2 === 0) {
                    if (d2 === 0) { cIdx = i; break }
                }
            }
            if (cIdx !== -1) {
                const trueBranch = text.slice(qIdx + 1, cIdx).trim()
                const falseBranch = text.slice(cIdx + 1).trim()
                const dropRe = /^[A-Za-z_$][\w$]*(?:\("WAWap"\))?\.DROP_ATTR\s*$/
                if (dropRe.test(falseBranch) && !dropRe.test(trueBranch)) {
                    const inner = decodeAttrText(trueBranch, ctx)
                    return { ...inner, optional: true }
                }
                if (dropRe.test(trueBranch) && !dropRe.test(falseBranch)) {
                    const inner = decodeAttrText(falseBranch, ctx)
                    return { ...inner, optional: true }
                }
            }
        }
    }

    // String literal — request-side literal attr (`xmlns:"abt"`).
    if (text[0] === '"' || text[0] === "'") {
        // Be tolerant of mid-expression artifacts: take the first quoted span.
        const m = text.match(/^['"]((?:\\.|[^'"\\])*)['"]/)
        if (m) return { type: 'literal', value: m[1] }
    }
    // Numeric literal
    if (/^-?\d+(\.\d+)?$/.test(text)) {
        return { type: 'literal', value: text }
    }

    // `<loader>("WAWap").CONST_NAME` — well-known constant
    let m = text.match(/^[A-Za-z_$][\w$]*\("WAWap"\)\.([A-Z_][A-Z0-9_]*)\s*$/)
    if (m && WAWAP_CONSTANTS[m[1]]) return { ...WAWAP_CONSTANTS[m[1]] }

    // `<loader>("WAWap").<COERCER>(<arg>)` — required typed value. If
    // the arg is a string OR numeric literal (e.g. `JID("call")`,
    // `INT(109)`), promote it to a literal value so consumers see the
    // fixed wire string/number instead of an opaque `arg` marker.
    m = text.match(/^[A-Za-z_$][\w$]*\("WAWap"\)\.([A-Z_][A-Z0-9_]*)\s*\(([\s\S]*)\)\s*$/)
    if (m && WAWAP_COERCERS[m[1]]) {
        const inner = m[2].trim()
        const strLit = inner.match(/^['"]([\s\S]*)['"]$/)
        if (strLit) return { type: 'literal', value: strLit[1] }
        if (/^-?\d+(\.\d+)?$/.test(inner)) return { type: 'literal', value: Number(inner) }
        return { type: WAWAP_COERCERS[m[1]], arg: inner || null }
    }

    // `<loader>("WAWap").generateId()` — client-generated stanza id
    if (/^[A-Za-z_$][\w$]*\("WAWap"\)\.generateId\(\)\s*$/.test(text)) {
        return { type: 'stanzaId', generated: true }
    }

    // `<loader>("WAWebCommsWapMd").<COERCER>(<arg>)` — outgoing message
    // builders use these JID coercers in place of WAWap.<COERCER>.
    m = text.match(/^[A-Za-z_$][\w$]*\("WAWebCommsWapMd"\)\.([A-Z_][A-Z0-9_]*)\s*\(([\s\S]*)\)\s*$/)
    if (m && WACOMMS_JID_COERCERS[m[1]]) {
        const inner = m[2].trim()
        const strLit = inner.match(/^['"]([\s\S]*)['"]$/)
        if (strLit) return { type: 'literal', value: strLit[1] }
        return { type: WACOMMS_JID_COERCERS[m[1]], arg: inner || null }
    }

    // Outgoing-builder formatter helpers — these all return an optional
    // string (or DROP_ATTR semantics for the maybe-prefixed ones). The
    // attr's wire shape is always a string when present; we drop the
    // `arg` since the helper consumes a typed payload object rather than
    // a wire value.
    m = text.match(/^[A-Za-z_$][\w$]*\("WAWebBackendJobsCommon"\)\.(encodeMaybe[A-Za-z0-9_]+)\s*\(/)
    if (m) return { type: 'string', optional: true }
    m = text.match(/^[A-Za-z_$][\w$]*\("WAWebSendMsgCommonApi"\)\.editAttribute\s*\(/)
    if (m) return { type: 'string', optional: true }
    m = text.match(/^[A-Za-z_$][\w$]*\("WAWebE2EProtoUtils"\)\.typeAttributeFromProtobuf\s*\(/)
    if (m) return { type: 'string' }

    // Aliased WAWap: `<alias>.CONST_NAME` / `<alias>.<COERCER>(<arg>)` /
    // `<alias>.generateId()`. The alias was hoisted earlier by either the
    // inline-assignment branch above or by a `var <alias>=<ld>("WAWap")` line
    // scanned up front in extractRequestModule (ctx.wawapAliases).
    if (ctx && ctx.wawapAliases) {
        for (const alias of ctx.wawapAliases) {
            // const
            const constM = text.match(new RegExp(`^${alias}\\.([A-Z_][A-Z0-9_]*)\\s*$`))
            if (constM && WAWAP_CONSTANTS[constM[1]]) return { ...WAWAP_CONSTANTS[constM[1]] }
            // coercer call
            const coerceM = text.match(new RegExp(`^${alias}\\.([A-Z_][A-Z0-9_]*)\\s*\\(([\\s\\S]*)\\)\\s*$`))
            if (coerceM && WAWAP_COERCERS[coerceM[1]]) {
                const inner = coerceM[2].trim()
                const strLit = inner.match(/^['"]([\s\S]*)['"]$/)
                if (strLit) return { type: 'literal', value: strLit[1] }
                if (/^-?\d+(\.\d+)?$/.test(inner)) return { type: 'literal', value: Number(inner) }
                return { type: WAWAP_COERCERS[coerceM[1]], arg: inner || null }
            }
            // generateId
            if (new RegExp(`^${alias}\\.generateId\\(\\)\\s*$`).test(text)) {
                return { type: 'stanzaId', generated: true }
            }
        }
    }

    // `<loader>("WASmaxAttrs").OPTIONAL(<coercer>, <val>)`
    m = text.match(/^[A-Za-z_$][\w$]*\("WASmaxAttrs"\)\.OPTIONAL\s*\(([\s\S]*)\)\s*$/)
    if (m) return decodeAttrsOptional(m[1], ctx)

    // `<loader>("WASmaxAttrs").OPTIONAL_LITERAL("lit", cond)`
    m = text.match(/^[A-Za-z_$][\w$]*\("WASmaxAttrs"\)\.OPTIONAL_LITERAL\s*\(([\s\S]*)\)\s*$/)
    if (m) return decodeAttrsOptionalLiteral(m[1])

    // Aliased WASmaxAttrs: `<alias>.OPTIONAL(...)` / `<alias>.OPTIONAL_LITERAL(...)`
    if (ctx && ctx.attrsAliases) {
        for (const alias of ctx.attrsAliases) {
            const optM = text.match(new RegExp(`^${alias}\\.OPTIONAL\\s*\\(([\\s\\S]*)\\)\\s*$`))
            if (optM) return decodeAttrsOptional(optM[1], ctx)
            const optLitM = text.match(new RegExp(`^${alias}\\.OPTIONAL_LITERAL\\s*\\(([\\s\\S]*)\\)\\s*$`))
            if (optLitM) return decodeAttrsOptionalLiteral(optLitM[1])
        }
    }

    // Identifier reference — likely a destructured argument or a traced local.
    if (/^[A-Za-z_$][\w$]*$/.test(text)) {
        if (ctx && ctx.argShape && text in ctx.argShape) {
            return { type: 'unknown', arg: text }
        }
        return { type: 'unknown', arg: text }
    }

    // Catch-all: a call that returns a coercer-decorated value, or `<jidExpr>.toString()` etc.
    return { type: 'unknown', raw: text.length > 120 ? text.slice(0, 120) + '…' : text }
}

// Decode the `arg-list-body` of an `OPTIONAL(<coercer>, <val>)` call. Splits
// the args, then synthesises a `coercer(val)` call text and feeds it back
// through decodeAttrText so coercer recognition (both direct AND aliased)
// kicks in. Marks the result `optional: true`.
function decodeAttrsOptional(argText, ctx) {
    const parts = splitTopLevelCommas(argText, 0, argText.length).map(
        ([s, e]) => argText.slice(s, e).trim()
    )
    if (parts.length !== 2) return { type: 'unknown', raw: 'OPTIONAL(' + argText + ')' }
    const inner = decodeAttrText(`${parts[0]}(${parts[1]})`, ctx)
    return { ...inner, optional: true }
}

function decodeAttrsOptionalLiteral(argText) {
    const parts = splitTopLevelCommas(argText, 0, argText.length).map(
        ([s, e]) => argText.slice(s, e).trim()
    )
    if (parts.length !== 2) return { type: 'unknown', raw: 'OPTIONAL_LITERAL(' + argText + ')' }
    const litM = parts[0].match(/^['"](.*)['"]$/)
    if (!litM) return { type: 'unknown', raw: 'OPTIONAL_LITERAL(' + argText + ')' }
    return { type: 'literal', value: litM[1], optional: true }
}

// ---------------------------------------------------------------------------
// Decode an object literal `{ key: val, key2: val2, ... }` into a plain map of
// `{ key → AttrSpec }`. Quoted keys + unquoted bareword keys + spread are
// handled. Computed keys are skipped.
// ---------------------------------------------------------------------------

function decodeAttrsObject(s, a, b, ctx) {
    // a..b should bracket the inner content of `{...}` (after the `{`, before `}`)
    const out = {}
    let i = a
    while (i < b) {
        // Find next non-ws non-comma
        while (i < b && (/\s/.test(s[i]) || s[i] === ',')) i++
        if (i >= b) break
        // Skip spread
        if (s.slice(i, i + 3) === '...') {
            i = skipExpr(s, i + 3, [',', '}'])
            continue
        }
        // Key
        let key = null
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i]
            i++
            const st = i
            while (i < b && s[i] !== q) {
                if (s[i] === '\\') i++
                i++
            }
            key = s.slice(st, i)
            i++
        } else if (s[i] === '[') {
            // computed key — skip
            i = skipExpr(s, i + 1, [']'])
            i++
            // skip value too
            while (i < b && s[i] !== ':') i++
            if (s[i] === ':') i = skipExpr(s, i + 1, [',', '}'])
            continue
        } else {
            const st = i
            while (i < b && /[\w$]/.test(s[i])) i++
            key = s.slice(st, i)
        }
        // Optional whitespace + ':'
        while (i < b && /\s/.test(s[i])) i++
        if (s[i] !== ':') {
            // shorthand `{ foo }` — record as identifier ref
            out[key] = { type: 'unknown', arg: key }
            continue
        }
        i++ // ':'
        const valStart = i
        const valEnd = skipExpr(s, valStart, [',', '}'])
        if (key) out[key] = decodeAttrValue(s, [valStart, valEnd], ctx)
        i = valEnd
    }
    return out
}

// ---------------------------------------------------------------------------
// Find calls of the form `<loader>("<ModName>").<method>(...)` whose outermost
// position in the function body matches the supplied predicate. Returns
// `{ moduleName, method, args, callStart, callEnd, argsStart, argsEnd }`.
// ---------------------------------------------------------------------------

function* iterFactoryCalls(body) {
    const re = /(?<![\w$])([A-Za-z_$][\w$]*)\s*\(\s*"([^"]+)"\s*\)\s*\.\s*([A-Za-z_$][\w$]*)\s*\(/g
    let m
    while ((m = re.exec(body))) {
        const openParen = m.index + m[0].length - 1
        const close = skipExpr(body, openParen + 1, [')'])
        if (close >= body.length) continue
        const args = splitTopLevelCommas(body, openParen + 1, close)
        yield {
            loader: m[1],
            moduleName: m[2],
            method: m[3],
            args,
            callStart: m.index,
            callEnd: close + 1,
            argsStart: openParen + 1,
            argsEnd: close
        }
    }
}

// Decode a smax(tag, attrs?, ...children) call into an ElementNode.
//   args[0] → tag (string literal)
//   args[1] → either an object literal (attrs), or a child smax call (no attrs)
//   args[2..] → child smax calls (or null/undefined)
//
// Returns null if the first argument is not a string literal.
function decodeSmaxCall(body, args, ctx) {
    if (args.length === 0) return null
    const [tagStart, tagEnd] = args[0]
    const tagText = body.slice(tagStart, tagEnd).trim()
    const tagMatch = tagText.match(/^['"]((?:\\.|[^'"\\])*)['"]$/)
    if (!tagMatch) return null
    const tag = tagMatch[1]

    const node = { tag, attrs: {}, children: [] }
    if (args.length === 1) return node

    let childArgStart = 1
    const [a1Start, a1End] = args[1]
    const a1Text = body.slice(a1Start, a1End).trim()
    if (a1Text.startsWith('{')) {
        // Attrs object
        const innerStart = body.indexOf('{', a1Start) + 1
        const innerEnd = a1End - (a1Text.endsWith('}') ? 1 : 0)
        node.attrs = decodeAttrsObject(body, innerStart, innerEnd, ctx)
        childArgStart = 2
    } else if (a1Text === 'null' || a1Text === 'undefined' || a1Text === 'void 0') {
        // Explicit null attrs — keep empty, treat rest as children
        childArgStart = 2
    }

    // If there's exactly one trailing arg AND it looks like content (bare
    // identifier, WAWap.<coercer>(arg), or string literal), treat it as
    // content rather than a child element. Matches WAWap.makeWapNode's
    // runtime branching.
    //
    // EXCEPTION: stanza root tags (`receipt`, `message`, `notification`,
    // `presence`, `iq`, `ack`, `call`, `failure`, `success`, `error`,
    // `ib`, `chatstate`, `status`, `stream:error`, `xmlstreamend`) NEVER
    // carry payload bytes per protocol — their trailing arg is always a
    // child node ref (e.g. `wap("receipt", {...}, i)` where `i` is a
    // child wap node bound earlier in scope). The `looksLikeContent`
    // heuristic falsely matches bare idents as content; guard against
    // it for these tags.
    if (args.length - childArgStart === 1 && !CONTENTLESS_STANZA_ROOTS.has(tag)) {
        const [cs, ce] = args[childArgStart]
        const text = body.slice(cs, ce).trim()
        if (looksLikeContent(text, ctx, tag)) {
            // String literal: `smax("tag", null, "x")` — content type=string,
            // pinned value.
            const litM = text.match(/^['"]((?:[^'"\\]|\\.)*)['"]$/)
            if (litM) {
                node.content = { type: 'string', value: litM[1] }
                return node
            }
            const coercerM = text.match(/\("WAWap"\)\.([A-Z_][A-Z0-9_]*)\s*\(/)
            const type = coercerM && WAWAP_COERCERS[coercerM[1]]
                ? WAWAP_COERCERS[coercerM[1]]
                : 'bytes'
            node.content = { type }
            return node
        }
    }

    for (let i = childArgStart; i < args.length; i++) {
        const [cs, ce] = args[i]
        const childText = stripAwaitYield(body.slice(cs, ce).trim())
        const child = decodeChildExpression(body, [cs, ce], childText, ctx)
        if (!child) continue
        // Skip `__ref` placeholders — bare idents we couldn't trace back
        // to a smax/wap call. They show up as tagless children in the
        // final IR; cleaner to drop them than emit `{tag: null}` nodes.
        if (child.__ref && !child.tag && !child.attrs && !child.children) continue
        // `__array` envelopes from `[].concat(...)` / bare array literals
        // splat into the parent's children list — they represent the
        // smax-runtime "children = single array arg" pathway.
        if (child.__array && Array.isArray(child.children)) {
            for (const c of child.children) node.children.push(c)
        } else {
            node.children.push(child)
        }
    }
    return node
}

// Decode a single child expression which can be:
//   - `<loader>("WASmaxJsx").smax(...)` — nested element via direct loader
//   - `<alias>.smax(...)` — nested element via a hoisted alias (`(n=o("WASmaxJsx")).smax(...)`)
//   - an identifier — a child built by a separate var declaration; trace
//   - an array literal — children spread out
//   - `<loader>("...Mixin").merge<>RequestMixin(<inner>)` — mixin wrapper
//   - `null` / `undefined` — drop
function decodeChildExpression(body, range, text, ctx) {
    if (!text || text === 'null' || text === 'undefined' || text === 'void 0') return null

    // Direct smax call: `<loader>("WASmaxJsx").smax(`
    let m = text.match(/^([A-Za-z_$][\w$]*)\("WASmaxJsx"\)\.smax\s*\(/)
    if (m) {
        const callOpen = range[0] + text.indexOf('(', m[0].length - 1)
        const close = skipExpr(body, callOpen + 1, [')'])
        const args = splitTopLevelCommas(body, callOpen + 1, close)
        return decodeSmaxCall(body, args, ctx)
    }

    // Hoisted-alias smax call: `<alias>.smax(`. Aliases are detected up-front
    // from `(n=o("WASmaxJsx"))` patterns and threaded through ctx.smaxAliases.
    m = text.match(/^([A-Za-z_$][\w$]*)\.smax\s*\(/)
    if (m && ctx && ctx.smaxAliases && ctx.smaxAliases.has(m[1])) {
        const callOpen = range[0] + text.indexOf('(', m[0].length - 1)
        const close = skipExpr(body, callOpen + 1, [')'])
        const args = splitTopLevelCommas(body, callOpen + 1, close)
        return decodeSmaxCall(body, args, ctx)
    }

    // Hoisted-alias inline assignment: `(<alias>=<loader>("WASmaxJsx")).smax(...)`
    // returns the smax result AND binds <alias> for any sibling/nested call.
    m = text.match(/^\(\s*([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\("WASmaxJsx"\)\s*\)\.smax\s*\(/)
    if (m) {
        if (ctx && ctx.smaxAliases) ctx.smaxAliases.add(m[1])
        const callOpen = range[0] + text.indexOf('.smax(', m[0].length - 10) + 5
        const close = skipExpr(body, callOpen + 1, [')'])
        const args = splitTopLevelCommas(body, callOpen + 1, close)
        return decodeSmaxCall(body, args, ctx)
    }

    // WASmaxChildren helpers: REPEATED_CHILD / OPTIONAL_CHILD /
    // HOMOGENEOUS_CHILD / HAS_OPTIONAL_CHILD / *_COUNT. Each takes a
    // builder function (`buildFn`) plus the list/value/condition arg(s).
    // Resolve the builder by looking up `function <id>(...) { ... }` in the
    // outer factory body (ctx.fnBody) and decoding its return expression.
    const childHelperPatterns = [
        { method: 'REPEATED_CHILD', cardinality: 'many' },
        { method: 'REPEATED_CHILD_COUNT', cardinality: 'many' },
        { method: 'HOMOGENEOUS_CHILD', cardinality: 'many' },
        { method: 'HOMOGENEOUS_CHILD_COUNT', cardinality: 'many' },
        { method: 'OPTIONAL_CHILD', cardinality: 'optional' },
        { method: 'HAS_OPTIONAL_CHILD', cardinality: 'optional' }
    ]
    for (const helper of childHelperPatterns) {
        // direct: `<ld>("WASmaxChildren").<METHOD>(...)`
        let chm = text.match(
            new RegExp(`^[A-Za-z_$][\\w$]*\\("WASmaxChildren"\\)\\.${helper.method}\\s*\\(`)
        )
        // aliased: `<alias>.<METHOD>(...)`
        if (!chm && ctx && ctx.childAliases) {
            for (const alias of ctx.childAliases) {
                if (text.startsWith(`${alias}.${helper.method}(`)) {
                    chm = { 0: `${alias}.${helper.method}(` }
                    break
                }
            }
        }
        // inline `(n=o("WASmaxChildren")).<METHOD>(...)` — bind alias then proceed.
        if (!chm) {
            const inlineRe = new RegExp(
                `^\\(\\s*([A-Za-z_$][\\w$]*)\\s*=\\s*[A-Za-z_$][\\w$]*\\("WASmaxChildren"\\)\\s*\\)\\.${helper.method}\\s*\\(`
            )
            const im = text.match(inlineRe)
            if (im) {
                if (ctx && ctx.childAliases) ctx.childAliases.add(im[1])
                chm = im
            }
        }
        if (!chm) continue
        const callOpen = range[0] + text.indexOf('(', chm[0].length - 1)
        const close = skipExpr(body, callOpen + 1, [')'])
        const args = splitTopLevelCommas(body, callOpen + 1, close)
        if (args.length === 0) return { __unknown: text.slice(0, 80) }
        const builderText = body.slice(args[0][0], args[0][1]).trim()
        const built = resolveBuilder(builderText, ctx, body)
        if (!built) return { __helper: helper.method, __builder: builderText }
        if (helper.cardinality === 'optional') {
            return { ...built, min: 0, max: 1, __helper: helper.method }
        }
        // REPEATED_CHILD(buildFn, list, min, max) — extract optional min/max
        let min = 0
        let max = null
        if (args.length >= 3) {
            const minText = body.slice(args[2][0], args[2][1]).trim()
            min = decodeNumericLiteral(minText) ?? 0
        }
        if (args.length >= 4) {
            const maxText = body.slice(args[3][0], args[3][1]).trim()
            max = decodeNumericLiteral(maxText)
        }
        return { ...built, min, max, __helper: helper.method }
    }

    // Inline-assignment alias prefix: `(<a>=<ld>("Mod")).<...>` — register
    // the alias if it names WAWap / WASmaxAttrs / WASmaxJsx / WASmaxChildren /
    // WASmaxMixins so subsequent siblings can use it, then rewrite to the
    // bare loader form and recurse.
    {
        const prefix = text.match(/^\(\s*([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\("([^"]+)"\)\s*\)/)
        if (prefix) {
            if (ctx) {
                if (prefix[3] === 'WAWap') (ctx.wawapAliases = ctx.wawapAliases || new Set()).add(prefix[1])
                if (prefix[3] === 'WASmaxAttrs') (ctx.attrsAliases = ctx.attrsAliases || new Set()).add(prefix[1])
                if (prefix[3] === 'WASmaxJsx') (ctx.smaxAliases = ctx.smaxAliases || new Set()).add(prefix[1])
                if (prefix[3] === 'WASmaxChildren') (ctx.childAliases = ctx.childAliases || new Set()).add(prefix[1])
                if (prefix[3] === 'WASmaxMixins') (ctx.mixinsAliases = ctx.mixinsAliases || new Set()).add(prefix[1])
            }
            const rewritten = `${prefix[2]}("${prefix[3]}")` + text.slice(prefix[0].length)
            // Map character offsets carefully — pass the new text as a fresh
            // range using its own indices.
            return decodeChildExpression(rewritten, [0, rewritten.length], rewritten, ctx)
        }
    }

    // Mixin wrapper. Three recognised forms:
    //   - `<loader>("...Mixin").merge<XYZ>(<inner>[, <args>])`
    //   - `<loader>("...MixinGroup").merge<XYZ>(<inner>[, <args>])`
    //   - `<loader>("<WASmax...>").merge<XYZ>(<inner>[, <args>])` — any
    //     WASmax module whose method starts with `merge` (covers compact
    //     state-type / role mixins like `WASmaxOutChatstateStateTypes
    //     .mergeStateTypes(...)` that don't carry the `Mixin` suffix).
    //   - `<loader>("WASmaxMixins").optionalMerge(<mergeFn>, <base>, <val>)`
    //   - `<alias>.optionalMerge(<inner>, <cond>)` for aliased WASmaxMixins.
    // All of these wrap an inner stanza/mixin with extra attrs/children;
    // the inner expression IS the schema we care about, the wrapper just
    // grafts more onto it.
    const mixinModuleRe = /^([A-Za-z_$][\w$]*)\("(WASmax[^"]+)"\)\.(merge[A-Za-z0-9_]*|optionalMerge)\s*\(/
    let mm = text.match(mixinModuleRe)
    if (!mm && ctx && ctx.mixinsAliases) {
        for (const alias of ctx.mixinsAliases) {
            if (new RegExp(`^${alias}\\.optionalMerge\\s*\\(`).test(text)) {
                mm = ['', '', 'WASmaxMixins', 'optionalMerge']
                break
            }
        }
    }
    if (mm) {
        const callOpen = range[0] + text.indexOf('(', text.indexOf(mm[3]) + mm[3].length - 1)
        const close = skipExpr(body, callOpen + 1, [')'])
        const args = splitTopLevelCommas(body, callOpen + 1, close)
        // Position of the BASE stanza inside the call:
        //   - WASmaxMixins.optionalMerge(<mergeFn>, <base>, <maybeVal>) → args[1]
        //     The merge function passed as arg0 is the conditional contributor;
        //     to reflect it in the schema we record an extra mixin entry
        //     pointing at that module/method (it executes only when arg2 is
        //     truthy, so its contributions are inherently optional).
        //   - regular `merge<Name>Mixin(<base>, <args>)` → args[0]
        let basePos = 0
        let conditionalMixin = null
        if (mm[2] === 'WASmaxMixins' && mm[3] === 'optionalMerge') {
            basePos = 1
            // arg0 is `<ld>("MixinModule").mergeMixinMethod` — resolve to a
            // (module, method) pair so we can surface it as conditional.
            if (args.length >= 1) {
                const refText = body.slice(args[0][0], args[0][1]).trim()
                const refM = refText.match(/^[A-Za-z_$][\w$]*\("(WASmax[^"]+)"\)\.([A-Za-z_$][\w$]*)$/)
                if (refM) conditionalMixin = { module: refM[1], method: refM[2], optional: true }
            }
        }
        if (args.length > basePos) {
            const [innerStart, innerEnd] = args[basePos]
            const innerText = stripAwaitYield(body.slice(innerStart, innerEnd).trim())
            const inner = decodeChildExpression(body, [innerStart, innerEnd], innerText, ctx)
            if (inner) {
                if (!inner.__mixin) {
                    inner.__mixin = { module: mm[2], method: mm[3] }
                } else {
                    inner.__additionalMixins = inner.__additionalMixins || []
                    inner.__additionalMixins.push({ module: mm[2], method: mm[3] })
                }
                if (conditionalMixin) {
                    inner.__additionalMixins = inner.__additionalMixins || []
                    inner.__additionalMixins.push(conditionalMixin)
                }
                return inner
            }
        }
        return { __unresolvedMixin: mm[2], __mixinMethod: mm[3] }
    }

    // `[arr1].concat(arr2, arr3)` — splat-style child composition used by the
    // minified Create/Report/etc. builders. Decode each arg as either a
    // child expression OR an inner array literal, then flatten everything
    // into a single `__array` envelope. The parent (smax / mixin / helper)
    // unpacks `__array` envelopes into its own children list.
    {
        const concatM = text.match(/^\[\s*\]?\s*\.concat\s*\(/) || text.match(/^\[([\s\S]*?)\]\.concat\s*\(/)
        if (concatM) {
            // Skip past the leading `[...]` to the `.concat(` open paren.
            const concatStart = text.indexOf('.concat(')
            if (concatStart !== -1) {
                const out = { __array: true, children: [] }
                // Pre-existing array literal items: `[a,b,c].concat(...)`.
                if (text[0] === '[' && text[1] !== ']') {
                    const arrEnd = skipExpr(text, 1, [']'])
                    const inner = splitTopLevelCommas(text, 1, arrEnd)
                    for (const [s, e] of inner) {
                        const t = stripAwaitYield(text.slice(s, e).trim())
                        const c = decodeChildExpression(body, [range[0] + s, range[0] + e], t, ctx)
                        appendArrayOrChild(out, c)
                    }
                }
                const openParen = concatStart + 7
                const close = skipExpr(text, openParen + 1, [')'])
                const args = splitTopLevelCommas(text, openParen + 1, close)
                for (const [s, e] of args) {
                    const t = stripAwaitYield(text.slice(s, e).trim())
                    const c = decodeChildExpression(body, [range[0] + s, range[0] + e], t, ctx)
                    appendArrayOrChild(out, c)
                }
                return out
            }
        }
    }

    // Array literal — Spread children. Returns an `__array` envelope so the
    // parent decoder can unpack it (vs. adding the array itself as a child).
    if (text.startsWith('[')) {
        const innerStart = range[0] + 1
        const innerEnd = range[1] - 1
        const list = splitTopLevelCommas(body, innerStart, innerEnd)
        const out = { __array: true, children: [] }
        for (const [s, e] of list) {
            const childText = stripAwaitYield(body.slice(s, e).trim())
            const c = decodeChildExpression(body, [s, e], childText, ctx)
            appendArrayOrChild(out, c)
        }
        return out
    }

    // Bare identifier — could be a result of a higher-level mixin or local var
    if (/^[A-Za-z_$][\w$]*$/.test(text)) {
        return { __ref: text }
    }

    return { __unknown: text.length > 80 ? text.slice(0, 80) + '…' : text }
}

// Resolve a builder function reference (passed to WASmaxChildren helpers or
// `optionalMerge` etc.) to its returned ElementNode. The builder is typically
// a local function `e`/`s`/...; we look it up in `ctx.moduleBody`, scan its
// return expression and decode it as a child smax call.
//
// IMPORTANT: when the return is a bare identifier we trace back to its var
// declaration and use the RHS expression range. The downstream
// `decodeChildExpression(body, range, text, ctx)` API requires `text === body.slice(range[0], range[1])`
// so child arg ranges (used for nested smax/merge calls inside the returned
// expression) line up against `body`. Passing `[0, text.length]` would break
// every nested offset.
function resolveBuilder(builderText, ctx, body) {
    if (!ctx || !ctx.moduleBody || !builderText) return null
    const idMatch = builderText.match(/^([A-Za-z_$][\w$]*)$/)
    if (!idMatch) return null
    const fnName = idMatch[1]
    const fnRe = new RegExp(`function\\s+${fnName}\\s*\\(([^)]*)\\)\\s*\\{`)
    const m = ctx.moduleBody.match(fnRe)
    if (!m) return null
    const fnBodyStart = m.index + m[0].length
    const fnBodyEnd = skipExpr(ctx.moduleBody, fnBodyStart, ['}'])
    const fb = ctx.moduleBody.slice(fnBodyStart, fnBodyEnd)

    // Find the LAST `return <expr>`.
    const retRe = /\breturn\s+/g
    let last = null
    let rm
    while ((rm = retRe.exec(fb))) last = rm
    if (!last) return null
    let exprStart = last.index + last[0].length
    let exprEnd = skipExpr(fb, exprStart, [';', '}', '\n'])

    // If the return is a bare identifier, trace back to its last assignment
    // and use THAT range as the actual return expression.
    const retExprText = fb.slice(exprStart, exprEnd).trim()
    const idR = retExprText.match(/^([A-Za-z_$][\w$]*)$/)
    if (idR) {
        const declRe = new RegExp(`${LB}${reId(idR[1])}\\s*=\\s*`, 'g')
        let dm
        let lastDecl = null
        while ((dm = declRe.exec(fb.slice(0, last.index)))) lastDecl = dm
        if (lastDecl) {
            exprStart = lastDecl.index + lastDecl[0].length
            exprEnd = skipExpr(fb, exprStart, [',', ';', '}'])
        }
    }

    const text = fb.slice(exprStart, exprEnd).trim()
    // Recompute the trimmed range so `text === fb.slice(rangeStart, rangeEnd)`.
    let rangeStart = exprStart
    while (rangeStart < exprEnd && /\s/.test(fb[rangeStart])) rangeStart++
    let rangeEnd = exprEnd
    while (rangeEnd > rangeStart && /\s/.test(fb[rangeEnd - 1])) rangeEnd--

    const subCtx = {
        ...ctx,
        fnBody: fb,
        smaxAliases: new Set(ctx.smaxAliases),
        childAliases: new Set(ctx.childAliases),
        wawapAliases: new Set(ctx.wawapAliases || []),
        attrsAliases: new Set(ctx.attrsAliases || []),
        mixinsAliases: new Set(ctx.mixinsAliases || [])
    }
    // Also discover aliases declared INSIDE the builder function.
    for (const [mod, set] of [
        ['WASmaxJsx', subCtx.smaxAliases],
        ['WASmaxChildren', subCtx.childAliases],
        ['WAWap', subCtx.wawapAliases],
        ['WASmaxAttrs', subCtx.attrsAliases],
        ['WASmaxMixins', subCtx.mixinsAliases]
    ]) {
        const re = new RegExp(`${LB}([A-Za-z_$][\\w$]*)\\s*=\\s*[A-Za-z_$][\\w$]*\\("${reId(mod)}"\\)`, 'g')
        let am
        while ((am = re.exec(fb))) set.add(am[1])
    }

    return decodeChildExpression(fb, [rangeStart, rangeEnd], text, subCtx)
}

// Push a decoded child onto an `__array` envelope. If the child is itself
// another `__array` (e.g. nested `[].concat(...)`), flatten its entries in.
function appendArrayOrChild(envelope, child) {
    if (!child) return
    if (child.__array && Array.isArray(child.children)) {
        for (const c of child.children) appendArrayOrChild(envelope, c)
        return
    }
    envelope.children.push(child)
}

// Decide whether the trailing args of a smax(tag, attrs, ...rest) call are
// CHILDREN (WapNodes) or CONTENT (string / Uint8Array / ArrayBuffer). The
// receiving constructor (WAWap.makeWapNode) branches on the JS type at
// runtime: array / string / ArrayBuffer / Uint8Array → content; otherwise
// every trailing arg is collected as a child. We approximate the call-site
// shape:
//   - A bare identifier passed as the ONLY rest arg is almost always a
//     content value (`linkCodePairingNonceElementValue` / a Uint8Array param).
//   - A WAWap.<COERCER>(...) trailing arg is also content (e.g.
//     `smax("count", null, WAWap.INT(n))` builds `<count>N</count>`).
//   - An aliased coercer `<n>.<COERCER>(...)` where `n` was hoisted from
//     `o("WAWap")` — same as the direct form.
// Anything else is treated as a child element.
function looksLikeContent(text, ctx, parentTag) {
    if (!text) return false
    // String literal — `smax("tag", null, "literal-value")`. Unambiguous:
    // wap constructor treats a string trailing arg as element text content.
    if (/^['"]([^'"\\]|\\.)*['"]$/.test(text)) return true
    // Explicit WAWap content coercer (BIG_ENDIAN_CONTENT, CUSTOM_STRING,
    // INT, etc.) — definitely content.
    if (/^[A-Za-z_$][\w$]*\("WAWap"\)\.[A-Z_][A-Z0-9_]*\s*\(/.test(text)) return true
    if (ctx && ctx.wawapAliases) {
        for (const alias of ctx.wawapAliases) {
            if (new RegExp(`^${alias}\\.[A-Z_][A-Z0-9_]*\\s*\\(`).test(text)) return true
        }
    }
    // Bare identifier — AMBIGUOUS. Could be a content var (`var t = bytes`)
    // OR a child node ref (`var t = smax("tag", ...)`). Allow ONLY when
    // the parent tag is a known leaf that carries content per protocol
    // (`<plaintext>`, `<enc>`, `<registration>`, `<device-identity>`, etc.).
    // For container tags (`<meta>`, `<reporting>`, `<participants>`,
    // any stanza root), default to "not content" — those callers always
    // pass child node refs as trailing args.
    if (/^[A-Za-z_$][\w$]*$/.test(text)) {
        return CONTENT_BEARING_LEAF_TAGS.has(parentTag)
    }
    return false
}

// Tags whose wire shape is `<tag>BYTES</tag>` or `<tag>STRING</tag>` —
// trailing bare-ident args to `wap(<tag>, attrs, x)` ARE content for these.
// Other tags use trailing args for child node references.
//
// Derived from auditing every tag that carries bytes content in any
// incoming Phase 1/2 parser across the IR (52 tags as of latest extract).
// Without this guard, looksLikeContent would treat ANY bare ident as
// content — causing trailing child-ref args to be misread as content
// (see receipt/message/etc. with phantom bytes content fix).
const CONTENT_BEARING_LEAF_TAGS = new Set([
    // E2E crypto envelopes
    'enc', 'enc_p', 'enc_iv', 'ciphertext', 'encrypted_payload',
    'encrypted_data', 'encrypted_key', 'nonce', 'auth_tag', 'padding',
    // Plaintext message body
    'plaintext', 'content',
    // Identity / signing / pairing keys
    'identity', 'device-identity', 'signature', 'signature_pem',
    'signed_pre_key', 'signed_credential', 'pre_key', 'public_key',
    'private_key', 'key_pair', 'key', 'acs_public_key',
    'encryption_pem', 'password_pem', 'registration',
    // Link code pairing fragments
    'link_code_pairing_ref', 'link_code_pairing_wrapped_primary_ephemeral_pub',
    'primary_identity_pub', 'companion_platform_id',
    // Receipt/reporting payload bytes
    'rcat', 'verified_name', 'reporting_token', 'reporting_tag',
    'reporting_content', 'data', 'franking', 'media_payload_hash',
    // Media / static binary content
    'media', 'picture', 'logo_url', 'routing_info', 'ref', 'token',
    // Newsletter / poll
    'vote'
])

// ---------------------------------------------------------------------------
// Request module extraction.
// ---------------------------------------------------------------------------

// Inline a resolved smax tree returned by a mixin/factory into a parent node.
// Used after we walk a mixin module and obtain its iq-builder shape.
function mergeMixinAttrsInto(node, mixinNode) {
    if (!node || !mixinNode) return
    // Node may be a stub `{ __unresolvedMixin: ... }` — give it the missing
    // structural fields rather than crashing on `.attrs`.
    if (!node.attrs) node.attrs = {}
    if (!Array.isArray(node.children)) node.children = []
    for (const [k, v] of Object.entries(mixinNode.attrs || {})) {
        if (!(k in node.attrs)) node.attrs[k] = v
    }
    // When a mixin contributes a child with the SAME tag as an existing
    // child, MERGE attrs/children/content into that one instead of
    // appending a duplicate. Several Spam* mixins, for example, each layer
    // additional attrs onto `<spam_list>` (jid+source, spam_flow, reportee,
    // subject, is_known_chat) — without merging the IR ends up with 5
    // sibling `<spam_list>` entries when the wire stanza has just one.
    if (Array.isArray(mixinNode.children) && mixinNode.children.length > 0) {
        for (const child of mixinNode.children) {
            const existing = node.children.find((c) => c.tag === child.tag)
            if (existing) {
                mergeMixinAttrsInto(existing, child)
            } else {
                node.children.push(child)
            }
        }
    }
    // Mixins like `companion_platform_id` build leaf elements with literal
    // content (`smax("tag", null, t)`) — carry the content through ONLY
    // when the mixin's root tag matches the target. A mixin returning
    // `<plaintext>` MUST NOT push its content onto a `<message>` parent
    // (the plaintext IS a child of message, not the message's content).
    // Tag-agnostic mixins (tag=undefined / tag="raw" / tag="smax$any")
    // similarly contribute attrs+children to whoever they're applied to
    // but their stand-alone content is meaningless on a wire-level parent.
    if (mixinNode.content && !node.content && node.tag === mixinNode.tag) {
        node.content = mixinNode.content
    }
}

// Locate the CANONICAL smax-root contributor of a mixin module by chasing
// from the exported `merge*` function. Many mixins look like:
//
//   function inner(t) {              ← the real builder; returns a smax
//     var n = ...                    ← wraps a smax("sub_group_suggestion",
//     return n                         null, smax("subject", ...), helpers…)
//   }
//   function e(stanza, args) {
//     var n = inner(args)
//     return mergeStanzas(stanza, n) ← export entry: wrap the inner
//   }                                  contribution onto `stanza`
//   l.mergeXxxMixin = e
//
// A naive "first direct smax" scan picks an unrelated helper smax that
// appears earlier in source order. Tracing through `mergeStanzas(_, X)`
// (or a bare `return X` where X is a local helper) lands on the true root.
function traceMixinSmaxRoot(body, ctx) {
    const exportRe = /\bl\.merge[A-Za-z0-9_]*\s*=\s*([A-Za-z_$][\w$]*)/
    const expM = body.match(exportRe)
    if (!expM) return null
    const exportFnName = expM[1]

    // Helper to walk a local function's body, find its last return, and
    // resolve to a smax-root node OR another local function reference.
    const visited = new Set()
    const walk = (fnName) => {
        if (visited.has(fnName)) return null
        visited.add(fnName)
        const fnRe = new RegExp(`function\\s+${fnName}\\s*\\(([^)]*)\\)\\s*\\{`)
        const fm = body.match(fnRe)
        if (!fm) return null
        const fnBodyStart = fm.index + fm[0].length
        const fnBodyEnd = skipExpr(body, fnBodyStart, ['}'])
        const fnBody = body.slice(fnBodyStart, fnBodyEnd)
        // Last `return <expr>` in this body.
        const retRe = /\breturn\s+/g
        let last = null
        let rm
        while ((rm = retRe.exec(fnBody))) last = rm
        if (!last) return null
        const exprStart = last.index + last[0].length
        const exprEnd = skipExpr(fnBody, exprStart, [';', '}', '\n'])
        const retExpr = fnBody.slice(exprStart, exprEnd).trim()

        // `mergeStanzas(stanza, <innerExpr>)` — the inner expr is the
        // contribution we want.
        const msMatch = retExpr.match(/^[A-Za-z_$][\w$]*\("WASmaxMixins"\)\.mergeStanzas\s*\(/)
        if (msMatch) {
            const openParen = retExpr.indexOf('(', msMatch[0].length - 1)
            const close = skipExpr(retExpr, openParen + 1, [')'])
            const args = splitTopLevelCommas(retExpr, openParen + 1, close)
            if (args.length >= 2) {
                const inner = retExpr.slice(args[1][0], args[1][1]).trim()
                // The inner might be a bare ident — could be either:
                //   (a) a local function name (`r` defined as `function r()`)
                //   (b) a local var bound to a function call (`var r = e(n)`)
                // For (b), trace the var's RHS and recurse on the called fn.
                if (/^[A-Za-z_$][\w$]*$/.test(inner)) {
                    // Try as function first.
                    const fnRe = new RegExp(`function\\s+${inner}\\s*\\(`)
                    if (fnRe.test(body)) return walk(inner)
                    // Otherwise trace var assignment in fnBody.
                    const declRe = new RegExp(`${LB}${reId(inner)}\\s*=\\s*([A-Za-z_$][\\w$]*)\\s*\\(`, 'g')
                    let dm
                    let lastDecl = null
                    while ((dm = declRe.exec(fnBody))) lastDecl = dm
                    if (lastDecl) return walk(lastDecl[1])
                }
                // Or a call expression `<helperFn>(<arg>)` → trace helperFn
                const callIdM = inner.match(/^([A-Za-z_$][\w$]*)\s*\(/)
                if (callIdM) return walk(callIdM[1])
            }
        }

        // Trace `return <ident>` where <ident> = <expr> earlier in fnBody.
        if (/^[A-Za-z_$][\w$]*$/.test(retExpr)) {
            const declRe = new RegExp(`${LB}${reId(retExpr)}\\s*=\\s*`, 'g')
            let dm
            let lastDecl = null
            while ((dm = declRe.exec(fnBody.slice(0, last.index)))) lastDecl = dm
            if (lastDecl) {
                const s = lastDecl.index + lastDecl[0].length
                const e = skipExpr(fnBody, s, [',', ';', '}'])
                const rhs = fnBody.slice(s, e).trim()
                // RHS could be `someHelper(args)` — trace that helper.
                const callIdM = rhs.match(/^([A-Za-z_$][\w$]*)\s*\(/)
                if (callIdM && /^[a-z]$/.test(callIdM[1])) return walk(callIdM[1])
                // OR the RHS is a smax / mixin-call chain — decode directly.
                return decodeChildExpression(fnBody, [s, e], rhs, ctx)
            }
        }

        // Otherwise decode the return expr directly as a child expression.
        return decodeChildExpression(fnBody, [exprStart, exprEnd], retExpr, ctx)
    }

    return walk(exportFnName)
}

// Resolve a referenced mixin to its iq attrs by walking the mixin module.
// Mixin pattern (see WASmaxOutAbPropsBaseIQGetRequestMixin):
//   function e(){ return o("WASmaxJsx").smax("iq", {id: o("WAWap").generateId(), type:"get"}) }
//   function s(t){ var n = e(); return o("WASmaxMixins").mergeStanzas(t, n) }
// We just need the inner `smax("iq", {...})` shape.
function extractMixin(moduleName, moduleIndex, memo) {
    if (memo.has(moduleName)) return memo.get(moduleName)
    const m = findModule(moduleName, moduleIndex)
    if (!m) {
        memo.set(moduleName, null)
        return null
    }
    // Cycle guard while we recurse into sibling mixin contributors below.
    memo.set(moduleName, null)
    const body = m.factoryBody

    // Collect contributions from TWO sources, then union them:
    //   1. Direct `<ld>("WASmaxJsx").smax("iq", {…})` calls in this body —
    //      attrs the mixin itself injects (`id`, `type`, sometimes `xmlns`/`to`).
    //   2. Cross-module mixin calls — `<ld>("WASmaxXxxMixin").merge<XYZ>(…)`
    //      OR `<ld>("WASmaxXxxMixinGroup").merge<XYZ>(…)`. These nested mixins
    //      may contribute MORE iq attrs (commonly the `xmlns` attribution
    //      lives in a deeper `*BaseIQGetRequestMixin` two levels down).
    let unioned = null
    const merge = (sub) => {
        if (!sub) return
        if (!unioned) {
            unioned = {
                tag: sub.tag,
                attrs: { ...sub.attrs },
                children: [...(sub.children || [])],
                ...(sub.content ? { content: sub.content } : {})
            }
        } else {
            // Attrs/children always union (mixin contributions stack onto
            // the same node by name/tag).
            for (const [k, v] of Object.entries(sub.attrs || {})) {
                if (!(k in unioned.attrs)) unioned.attrs[k] = v
            }
            for (const c of sub.children || []) {
                if (!unioned.children.some((x) => x.tag === c.tag)) unioned.children.push(c)
            }
            // Content ONLY when the sub-mixin's root tag matches the
            // unioned tag. A sub-mixin that returns `<plaintext>` (with
            // content bytes) MUST NOT bubble its content onto a `<status>`
            // parent — the plaintext is a CHILD of status, not status's
            // own content. Without this guard, every payload-mixin
            // contributes phantom content to its enclosing stanza root.
            if (sub.content && !unioned.content && sub.tag === unioned.tag) {
                unioned.content = sub.content
            }
        }
    }

    // The mixin's direct smax contributor may wrap ANY root tag (`iq` for
    // IQ mixins, `ack`/`receipt`/`message` for ack/receipt/message mixins,
    // or `smax$any` for tag-agnostic mixins). Trace from the EXPORTED
    // `merge*` function back to the canonical builder — many composite
    // mixins (`mergeCreateSubGroupSuggestionSuggestionForNewGroupMixin = p`
    // where `p(e,t){var n=m(t); return mergeStanzas(e,n)}`) define their
    // root smax in a HELPER function (`m` here, returning `<sub_group_suggestion>`)
    // rather than at the top of the body, so a "first direct smax" scan
    // would pick the wrong tree (a sibling `<description>` helper).
    // The mixin body can use the same alias compactions request modules do
    // (`(t=o("WASmaxJsx")).smax(...)` then `t.smax(...)` for siblings). Seed
    // the alias sets so the inline-alias decoder + sibling-call decoder
    // recognise them when traceMixinSmaxRoot recurses into decodeChildExpression.
    const ctxForMixin = {
        argShape: {},
        fnBody: body,
        moduleBody: body,
        smaxAliases: new Set(),
        childAliases: new Set(),
        wawapAliases: new Set(),
        attrsAliases: new Set(),
        mixinsAliases: new Set()
    }
    for (const [mod, set] of [
        ['WASmaxJsx', ctxForMixin.smaxAliases],
        ['WASmaxChildren', ctxForMixin.childAliases],
        ['WAWap', ctxForMixin.wawapAliases],
        ['WASmaxAttrs', ctxForMixin.attrsAliases],
        ['WASmaxMixins', ctxForMixin.mixinsAliases]
    ]) {
        const re = new RegExp(`${LB}([A-Za-z_$][\\w$]*)\\s*=\\s*[A-Za-z_$][\\w$]*\\("${reId(mod)}"\\)`, 'g')
        let am
        while ((am = re.exec(body))) set.add(am[1])
    }
    const exportedBuilder = traceMixinSmaxRoot(body, ctxForMixin)
    if (exportedBuilder) {
        merge(exportedBuilder)
    } else {
        // Fallback — no exported chain found, take the first direct smax.
        const re = /(?<![\w$])([A-Za-z_$][\w$]*)\("WASmaxJsx"\)\.smax\s*\(\s*"([^"]+)"/g
        let mm
        while ((mm = re.exec(body))) {
            const smaxParen = body.lastIndexOf('(', mm.index + mm[0].length)
            const close = skipExpr(body, smaxParen + 1, [')'])
            const args = splitTopLevelCommas(body, smaxParen + 1, close)
            merge(decodeSmaxCall(body, args, ctxForMixin))
            break
        }
    }

    const subMixinRe = /[A-Za-z_$][\w$]*\(\s*"(WASmax[A-Za-z0-9_]+(?:Mixin|MixinGroup))"\s*\)\s*\.\s*[A-Za-z_$][\w$]*/g
    const seen = new Set()
    let subM
    while ((subM = subMixinRe.exec(body))) {
        const subMod = subM[1]
        if (subMod === moduleName || seen.has(subMod)) continue
        seen.add(subMod)
        merge(extractMixin(subMod, moduleIndex, memo))
    }

    memo.set(moduleName, unioned)
    return unioned
}

// Walk a request module. We pick the FIRST exported `make<X>Request` function,
// scan its body for the outermost expression, and resolve any mixin wrappers.
function extractRequestModule(moduleName, moduleIndex, mixinMemo) {
    const m = findModule(moduleName, moduleIndex)
    if (!m) return { error: 'module-not-found' }
    const body = m.factoryBody

    // Map `l.<exportedName> = <funcId>` to discover the entry function id.
    // Trailing punctuation may be `,` (more exports follow), `;` (statement),
    // `}` (about to close the factory), or simply end-of-body (last statement
    // with no trailing punctuation, common when the minifier drops it).
    const exportRe = /\bl\.([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\s*(?:[,;}]|$)/g
    const exports_ = {}
    let em
    while ((em = exportRe.exec(body))) exports_[em[1]] = em[2]

    // Pick the entry export. Modules typically expose:
    //   - One MAIN entry `make<Op>Request` (e.g. `makeCreateRequest`)
    //   - Optional sub-element builders `make<Op>Request<SubElement>`
    //     (e.g. `makeCreateRequestParticipant`, `makeGetGroupInfoRequestQueryAddRequest`)
    // Both match `/make.*Request$/`. Prefer the SHORTEST name — that's
    // reliably the main entry; longer names are helpers used to construct
    // sub-elements. Picking the first match by source order would otherwise
    // grab a helper and lose the wrapping `<iq>` stanza.
    const requestExports = Object.entries(exports_).filter(([k]) => /Request$/.test(k))
    const makeRequestExports = requestExports.filter(([k]) => /^make/.test(k))
    let entryFnId = null
    if (makeRequestExports.length > 0) {
        makeRequestExports.sort(([a], [b]) => a.length - b.length)
        entryFnId = makeRequestExports[0][1]
    } else if (requestExports.length > 0) {
        requestExports.sort(([a], [b]) => a.length - b.length)
        entryFnId = requestExports[0][1]
    } else {
        entryFnId = Object.values(exports_)[0]
    }
    if (!entryFnId) return { error: 'no-export' }

    // Find `function <id>(<args>){...}`
    const fnRe = new RegExp(`function\\s+${entryFnId}\\s*\\(([^)]*)\\)\\s*\\{`, 'g')
    const fnMatch = fnRe.exec(body)
    if (!fnMatch) return { error: 'entry-function-not-found' }
    const fnBodyStart = fnMatch.index + fnMatch[0].length
    const fnBodyEnd = skipExpr(body, fnBodyStart, ['}'])
    const fnBody = body.slice(fnBodyStart, fnBodyEnd)
    const argShape = {}
    for (const a of fnMatch[1].split(',').map((x) => x.trim()).filter(Boolean)) {
        argShape[a] = true
    }

    // Find the LAST `return <expr>;` — for these builders the return is the
    // stanza (or an assigned var that holds it).
    let returnExpr = null
    {
        const retRe = /\breturn\s+/g
        let rm
        let last = null
        while ((rm = retRe.exec(fnBody))) last = rm
        if (last) {
            const exprStart = last.index + last[0].length
            const exprEnd = skipExpr(fnBody, exprStart, [';', '}', '\n'])
            returnExpr = fnBody.slice(exprStart, exprEnd).trim()
        }
    }

    // Discover smax + children aliases up-front. The minifier collapses
    // repeated `o("WASmaxJsx").smax(...)` / `o("WASmaxChildren").<METHOD>`
    // calls inside a single builder function into a hoisted alias:
    // `var n=o("WASmaxJsx");n.smax(...)` or `(n=o("WASmaxJsx")).smax(...)`.
    // Tracking the alias set lets the child decoder treat `n.smax(...)` and
    // `n.OPTIONAL_CHILD(...)` as constructor / helper calls.
    const smaxAliases = new Set()
    const childAliases = new Set()
    const wawapAliases = new Set()
    const attrsAliases = new Set()
    const mixinsAliases = new Set()
    function collectAliases(module, set) {
        const re = new RegExp(
            `${LB}([A-Za-z_$][\\w$]*)\\s*=\\s*[A-Za-z_$][\\w$]*\\("${reId(module)}"\\)`,
            'g'
        )
        let am
        while ((am = re.exec(fnBody))) set.add(am[1])
    }
    collectAliases('WASmaxJsx', smaxAliases)
    collectAliases('WASmaxChildren', childAliases)
    collectAliases('WAWap', wawapAliases)
    collectAliases('WASmaxAttrs', attrsAliases)
    collectAliases('WASmaxMixins', mixinsAliases)

    const ctx = {
        argShape,
        fnBody,
        moduleBody: body,
        smaxAliases,
        childAliases,
        wawapAliases,
        attrsAliases,
        mixinsAliases
    }

    let node = null
    if (returnExpr) {
        // The return expression is typically either:
        //   - A bare identifier (e.g. `return r`) bound earlier
        //   - A direct smax call
        //   - A mixin wrapper around a smax call
        if (/^[A-Za-z_$][\w$]*$/.test(returnExpr)) {
            const varDeclRe = new RegExp(`${LB}${reId(returnExpr)}\\s*=\\s*`, 'g')
            let dm
            let last = null
            while ((dm = varDeclRe.exec(fnBody))) last = dm
            if (last) {
                const exprStart = last.index + last[0].length
                const exprEnd = skipExpr(fnBody, exprStart, [',', ';', '}'])
                const text = fnBody.slice(exprStart, exprEnd).trim()
                node = decodeChildExpression(fnBody, [exprStart, exprEnd], text, ctx)
            }
        } else {
            // Locate the return expression's range in fnBody
            const idx = fnBody.lastIndexOf(returnExpr)
            const range = idx === -1 ? [0, returnExpr.length] : [idx, idx + returnExpr.length]
            node = decodeChildExpression(fnBody, range, returnExpr, ctx)
        }
    }

    // Walk the entire tree resolving every `__mixin` + `__additionalMixins`
    // reference. Mixins can be nested arbitrarily deep (e.g. an outer IQ
    // mixin wraps a smax-iq that itself contains a child wrapped in another
    // mixin), so we recurse rather than handling just the root.
    function resolveMixinsDeep(n) {
        if (!n || typeof n !== 'object') return
        if (Array.isArray(n)) { for (const c of n) resolveMixinsDeep(c); return }
        if (n.__mixin) {
            const mixinNode = extractMixin(n.__mixin.module, moduleIndex, mixinMemo)
            const applied = [n.__mixin.module]
            delete n.__mixin
            if (mixinNode) mergeMixinAttrsInto(n, mixinNode)
            if (Array.isArray(n.__additionalMixins)) {
                for (const extra of n.__additionalMixins) {
                    const extraNode = extractMixin(extra.module, moduleIndex, mixinMemo)
                    if (extraNode) mergeMixinAttrsInto(n, extraNode)
                    applied.push(extra.module + (extra.optional ? '?' : ''))
                }
                delete n.__additionalMixins
            }
            n.appliedMixin = applied.length === 1 ? applied[0] : applied
        }
        if (Array.isArray(n.children)) for (const c of n.children) resolveMixinsDeep(c)
    }
    resolveMixinsDeep(node)

    return { node, argShape }
}

// ---------------------------------------------------------------------------
// Response module extraction.
// ---------------------------------------------------------------------------

// Resolve a `<ident>.value` or bare identifier back to the var declaration
// that bound it inside `fnBody`. Returns { kind, ...info } describing what
// node-resolution chain that identifier represents.
//
// Examples we care about:
//   var r = o("WASmaxParseUtils").assertTag(t, "iq")        → root node t (tag iq)
//   var a = o("WASmaxParseUtils").flattenedChildWithTag(t, "props")  → child of t named "props"
//
// We track a synthetic "node id" for each variable binding so subsequent calls
// referencing `<var>.value` can be attributed to the right element scope.
function buildScopeMap(fnBody, rootParam) {
    const scope = new Map() // varName → { parent: 'root'|varName, tag: 'props'|null, kind: 'root'|'flat'|'child'|'mapped' }
    scope.set(rootParam, { kind: 'root', parent: null, tag: null })

    // Accept all known parser-helper modules — WASmaxParseUtils plus the
    // JID-typed and reference helpers (see PARSE_HELPER_MODULES).
    const re = /\bvar\s+([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\("(WASmaxParse(?:Utils|Jid|Reference))"\)\.([A-Za-z_$][\w$]*)\s*\(/g
    let m
    while ((m = re.exec(fnBody))) {
        const varName = m[1]
        const method = m[4]
        const openParen = m.index + m[0].length - 1
        const close = skipExpr(fnBody, openParen + 1, [')'])
        const args = splitTopLevelCommas(fnBody, openParen + 1, close)
        if (args.length === 0) continue
        const firstArg = fnBody.slice(args[0][0], args[0][1]).trim()
        const parent = resolveNodeRef(firstArg, scope)

        const desc = PARSE_UTILS[method]
        if (!desc) continue

        if (desc.kind === 'child') {
            const tagArg = args[1] ? fnBody.slice(args[1][0], args[1][1]).trim() : null
            const tagMatch = tagArg ? tagArg.match(/^['"](.*)['"]$/) : null
            const tag = tagMatch ? tagMatch[1] : null
            scope.set(varName, {
                kind: 'child',
                parent,
                tag,
                method,
                cardinality: desc.cardinality,
                args
            })
        } else if (desc.kind === 'children') {
            const tagArg = args[1] ? fnBody.slice(args[1][0], args[1][1]).trim() : null
            const tagMatch = tagArg ? tagArg.match(/^['"](.*)['"]$/) : null
            const tag = tagMatch ? tagMatch[1] : null
            scope.set(varName, {
                kind: 'children',
                parent,
                tag,
                method,
                args
            })
        } else if (desc.kind === 'assertTag') {
            // `assertTag(<node>, "tag")` — binds nothing structural; we just
            // tag the node itself in the resulting tree.
            scope.set(varName, { kind: 'assert', parent, method, args })
        } else {
            // attr/content/wrap → also bound vars, but not structural nodes
            scope.set(varName, { kind: 'leaf', parent, method, args })
        }
    }
    return scope
}

// Resolve a reference string like `t`, `a.value`, `r.value.foo` to a parent
// node id in the scope map. Returns the bound varName ("t" or "a") so the
// schema can attach attrs/children to the right element scope.
function resolveNodeRef(text, scope) {
    if (!text) return null
    const m = text.match(/^([A-Za-z_$][\w$]*)(?:\.value)?/)
    if (!m) return null
    if (scope.has(m[1])) return m[1]
    return m[1] // unknown var; surface as a stub
}

// Build the response schema tree from a parse function body. We start from
// the `assertTag(<rootParam>, "<rootTag>")` (the first param) and visit every
// `WASmaxParseUtils.<method>(<node>, ...)` call collecting attrs/children on
// the appropriate node.
function buildResponseTreeFromFn(fnBody, rootParam, moduleIndex, parseFnTraced, fnsByName) {
    // Pre-scan vars to know which var holds which (parent, tag, kind).
    const scope = buildScopeMap(fnBody, rootParam)

    // Discover the root tag via assertTag(<rootParam>, "...").
    let rootTag = null
    {
        const re = new RegExp(
            `[A-Za-z_$][\\w$]*\\("WASmaxParseUtils"\\)\\.assertTag\\s*\\(\\s*${rootParam}\\s*,\\s*"([^"]+)"`,
            'g'
        )
        const m = re.exec(fnBody)
        if (m) rootTag = m[1]
    }

    // Allocate one ElementNode per scope-tracked node. We key by the var name
    // bound to that node ("t" for root, "a" for a flat child of t, etc).
    // Each node accumulates attrs/children as we encounter calls.
    const nodes = new Map()
    function getOrCreateNode(varName) {
        if (nodes.has(varName)) return nodes.get(varName)
        const entry = scope.get(varName) || { kind: 'root' }
        const node = { tag: null, attrs: {}, children: [], content: null }
        if (varName === rootParam) node.tag = rootTag
        else if (entry.tag) node.tag = entry.tag
        nodes.set(varName, node)
        return node
    }

    // Iterate every parser-helper call in the body. Helpers live in three
    // sibling modules (WASmaxParseUtils + WASmaxParseJid + WASmaxParseReference);
    // see PARSE_HELPER_MODULES.
    for (const call of iterFactoryCalls(fnBody)) {
        if (!PARSE_HELPER_MODULES.has(call.moduleName)) continue
        const desc = PARSE_UTILS[call.method]
        if (!desc) continue
        if (call.args.length === 0) continue

        // `wrap` and `literalContent` shift the node arg to position 1 —
        // arg[0] is the inner parse function passed by reference. Pick
        // the right arg for node resolution.
        const nodeArgIdx = desc.kind === 'wrap' || desc.kind === 'literalContent' ? 1 : 0
        if (call.args.length <= nodeArgIdx) continue
        const firstArgText = fnBody.slice(call.args[nodeArgIdx][0], call.args[nodeArgIdx][1]).trim()
        const target = resolveNodeRef(firstArgText, scope)
        if (!target) continue
        const node = getOrCreateNode(target)

        if (desc.kind === 'attr') {
            const nameArg = call.args[1]
                ? fnBody.slice(call.args[1][0], call.args[1][1]).trim()
                : null
            const nameMatch = nameArg ? nameArg.match(/^['"](.*)['"]$/) : null
            if (!nameMatch) continue
            const spec = { type: desc.type }
            if (desc.withRange) {
                const minArg = call.args[2]
                    ? fnBody.slice(call.args[2][0], call.args[2][1]).trim()
                    : null
                const maxArg = call.args[3]
                    ? fnBody.slice(call.args[3][0], call.args[3][1]).trim()
                    : null
                if (minArg) spec.min = decodeNumericLiteral(minArg)
                if (maxArg) spec.max = decodeNumericLiteral(maxArg)
            }
            if (desc.type === 'enum') {
                // The 3rd arg is the ENUM map identifier — resolve via fnsByName
                const enumArg = call.args[2]
                    ? fnBody.slice(call.args[2][0], call.args[2][1]).trim()
                    : null
                spec.enumRef = enumArg
            }
            if (!(nameMatch[1] in node.attrs)) node.attrs[nameMatch[1]] = spec
        } else if (desc.kind === 'assertAttr') {
            const nameArg = call.args[1]
                ? fnBody.slice(call.args[1][0], call.args[1][1]).trim()
                : null
            const valArg = call.args[2]
                ? fnBody.slice(call.args[2][0], call.args[2][1]).trim()
                : null
            const nm = nameArg && nameArg.match(/^['"](.*)['"]$/)
            const vm = valArg && valArg.match(/^['"](.*)['"]$/)
            if (nm && vm && !(nm[1] in node.attrs)) {
                node.attrs[nm[1]] = { type: 'literal', value: vm[1] }
            }
        } else if (desc.kind === 'wrap') {
            // `optional(<innerFn>, <node>, "name", ...)` /
            // `literal(<innerFn>, <node>, "name", "lit")` /
            // `optionalLiteral(<innerFn>, <node>, "name", "lit")`
            // The 0th arg is the inner parser ref; 1st is the node; 2nd is the
            // attr name. So shift everything and re-interpret.
            if (call.args.length < 3) continue
            const innerArgText = fnBody.slice(call.args[0][0], call.args[0][1]).trim()
            const innerNodeArg = fnBody.slice(call.args[1][0], call.args[1][1]).trim()
            const innerTarget = resolveNodeRef(innerNodeArg, scope)
            if (!innerTarget) continue
            const innerNode = getOrCreateNode(innerTarget)
            const nameArg = fnBody.slice(call.args[2][0], call.args[2][1]).trim()
            const nm = nameArg.match(/^['"](.*)['"]$/)
            if (!nm) continue
            const attrName = nm[1]

            // Look up which primitive the inner is — e.g.
            // `<ld>("WASmaxParseUtils").attrString`. If we can't tell, mark
            // `string`.
            let innerType = 'string'
            const innerMethodMatch = innerArgText.match(
                /\("(WASmaxParse(?:Utils|Jid|Reference))"\)\.([A-Za-z_$][\w$]*)$/
            )
            if (innerMethodMatch) {
                const innerDesc = PARSE_UTILS[innerMethodMatch[2]]
                if (innerDesc && innerDesc.kind === 'attr') innerType = innerDesc.type
            }

            const spec = { type: innerType }
            if (desc.optional) spec.optional = true
            if (desc.literal) {
                // 4th arg is the literal value
                const litArg = call.args[3]
                    ? fnBody.slice(call.args[3][0], call.args[3][1]).trim()
                    : null
                const litMatch = litArg && litArg.match(/^['"](.*)['"]$/)
                if (litMatch) {
                    spec.type = 'literal'
                    spec.value = litMatch[1]
                }
            }
            // For attrStringEnum-wrapped, capture the enum ref (last arg).
            if (innerType === 'enum' && call.args.length >= 4) {
                const enumArg = fnBody
                    .slice(call.args[3][0], call.args[3][1])
                    .trim()
                spec.enumRef = enumArg
            }
            if (!(attrName in innerNode.attrs)) innerNode.attrs[attrName] = spec
        } else if (desc.kind === 'child') {
            // Only push an inline child here if the call carries an inner
            // parser (3rd arg) — those produce a complete subtree right at
            // the call-site. Otherwise (`flattenedChildWithTag(node, "tag")`
            // with no parseFn) the attrs/children get collected on the var
            // bound to this call (`var r = flattenedChildWithTag(...)`) by
            // sibling calls referencing `r.value`, and the splice pass at
            // the end will graft the populated node onto its parent. Pushing
            // a stub now would lose those attrs, because the splice's tag-
            // based dedup would skip the populated version.
            if (call.args.length < 3) continue
            const nameArg = fnBody
                .slice(call.args[1][0], call.args[1][1])
                .trim()
            const nm = nameArg.match(/^['"](.*)['"]$/)
            if (!nm) continue
            const childTag = nm[1]
            const parseFnText = fnBody
                .slice(call.args[2][0], call.args[2][1])
                .trim()
            let childTree = { tag: childTag, attrs: {}, children: [] }
            const sub = recurseIntoParser(
                parseFnText,
                moduleIndex,
                parseFnTraced,
                fnsByName,
                childTag
            )
            if (sub) childTree = sub
            const cardinality =
                desc.cardinality === 'one' ? { min: 1, max: 1 } : { min: 0, max: 1 }
            node.children.push({ ...childTree, ...cardinality })
        } else if (desc.kind === 'children') {
            // mapChildrenWithTag(node, "tag", min, max, parseFn)
            const nameArg = call.args[1]
                ? fnBody.slice(call.args[1][0], call.args[1][1]).trim()
                : null
            const nm = nameArg && nameArg.match(/^['"](.*)['"]$/)
            if (!nm) continue
            const childTag = nm[1]
            const minArg = call.args[2]
                ? fnBody.slice(call.args[2][0], call.args[2][1]).trim()
                : null
            const maxArg = call.args[3]
                ? fnBody.slice(call.args[3][0], call.args[3][1]).trim()
                : null
            const parseFnText = call.args[4]
                ? fnBody.slice(call.args[4][0], call.args[4][1]).trim()
                : null
            let childTree = { tag: childTag, attrs: {}, children: [] }
            if (parseFnText) {
                const sub = recurseIntoParser(
                    parseFnText,
                    moduleIndex,
                    parseFnTraced,
                    fnsByName,
                    childTag
                )
                if (sub) childTree = sub
            }
            node.children.push({
                ...childTree,
                min: minArg ? decodeNumericLiteral(minArg) ?? 0 : 0,
                max: maxArg ? decodeNumericLiteral(maxArg) : null
            })
        } else if (desc.kind === 'content') {
            const spec = { type: desc.type }
            if (desc.withRange) {
                const minArg = call.args[1]
                    ? fnBody.slice(call.args[1][0], call.args[1][1]).trim()
                    : null
                const maxArg = call.args[2]
                    ? fnBody.slice(call.args[2][0], call.args[2][1]).trim()
                    : null
                if (minArg) spec.min = decodeNumericLiteral(minArg)
                if (maxArg) spec.max = decodeNumericLiteral(maxArg)
            }
            if (desc.type === 'enum') {
                const enumArg = call.args[1]
                    ? fnBody.slice(call.args[1][0], call.args[1][1]).trim()
                    : null
                if (enumArg) spec.enumRef = enumArg
            }
            node.content = spec
        } else if (desc.kind === 'literalContent') {
            // `literalContent(<innerFn>, <node>, "lit")` — wire content
            // is pinned to the literal "lit". Skip the inner parser ref
            // (arg 0) and the node ref (arg 1); the literal is arg 2.
            const litArg = call.args[2]
                ? fnBody.slice(call.args[2][0], call.args[2][1]).trim()
                : null
            const litMatch = litArg && litArg.match(/^['"](.*)['"]$/)
            if (litMatch) {
                node.content = { type: 'literal', value: litMatch[1] }
            }
        }
    }

    // Cross-module same-node parser merges. Many response parsers split the
    // schema across sibling modules and call each on the SAME stanza node:
    //   var t = o("WASmaxInChatstateStateSource").parseStateSource(e)
    //   var n = o("WASmaxInChatstateStateTypes").parseStateTypes(e)
    // Each parser contributes attrs/children to `e`. Walk every such call
    // and merge its tree into the corresponding scope node.
    //
    // Disjunction pattern detection: if the body uses
    // `errorMixinDisjunction(<node>, [names], [...])` then the parsers tried
    // earlier form a discriminated union — each is mutually exclusive. We
    // record the variants under `__variants` so consumers can model the
    // union; their attrs are still merged into the node (marked optional).
    {
        const subParserRe = /(?:\bvar\s+([A-Za-z_$][\w$]*)\s*=\s*)?([A-Za-z_$][\w$]*)\(\s*"(WASmaxIn[A-Za-z0-9_]+)"\s*\)\s*\.\s*(parse[A-Za-z0-9_]+)\s*\(\s*([A-Za-z_$][\w$]*)(?:\.value)?\s*[,)]/g
        let sm
        while ((sm = subParserRe.exec(fnBody))) {
            const lhs = sm[1]
            const loader = sm[2]
            const subModule = sm[3]
            const subMethod = sm[4]
            const argVar = sm[5]
            if (!scope.has(argVar)) continue
            // Skip if this is already handled by the var-decl scope map
            // (those produce dedicated nodes via WASmaxParseUtils.* primitives).
            // We're only following cross-module sibling parsers that contribute
            // attrs to an ALREADY-bound node.
            // Construct the parser ref text consumed by recurseIntoParser.
            const refText = `${loader}("${subModule}").${subMethod}`
            const sub = recurseIntoParser(
                refText,
                moduleIndex,
                parseFnTraced,
                fnsByName,
                null
            )
            if (!sub || sub.__external) continue
            const target = nodes.get(argVar) || getOrCreateNode(argVar)
            for (const [k, v] of Object.entries(sub.attrs || {})) {
                if (!(k in target.attrs)) target.attrs[k] = v
            }
            for (const c of sub.children || []) {
                if (target.children.some((x) => x.tag === c.tag)) continue
                target.children.push(c)
            }
            // Content merge: usually first-wins, BUT when multiple
            // sub-parsers each pin content to a DIFFERENT literal value
            // (the AddMode pattern: AdminAddMode → "admin_add",
            // AllMembersAddMode → "all_member_add", etc.), union them
            // into a single enum with all observed values.
            if (sub.content) {
                if (!target.content) {
                    target.content = sub.content
                } else if (
                    target.content.type === 'literal' && sub.content.type === 'literal'
                    && sub.content.value !== target.content.value
                ) {
                    target.content = {
                        type: 'enum',
                        enumValues: [...new Set([target.content.value, sub.content.value])]
                    }
                } else if (
                    target.content.type === 'enum' && sub.content.type === 'literal'
                    && !target.content.enumValues.includes(sub.content.value)
                ) {
                    target.content = {
                        type: 'enum',
                        enumValues: [...target.content.enumValues, sub.content.value]
                    }
                }
            }
            // Propagate the sub-parser's union-variant names — when the
            // sub-parser was itself a disjunction (e.g. `parsePresenceUpdates`
            // tries 5 mixins), surface that union on the caller's node so
            // consumers see all possible discriminator names.
            if (Array.isArray(sub.__variants) && sub.__variants.length > 0) {
                target.__variants = target.__variants
                    ? [...new Set([...target.__variants, ...sub.__variants])]
                    : sub.__variants
            }
        }

        // Disjunction marker: when `errorMixinDisjunction(<node>, [names], [vars])`
        // is present, those tried parsers are union variants — expose them.
        const dijRe = /errorMixinDisjunction\s*\(\s*([A-Za-z_$][\w$]*)\s*,\s*\[([^\]]*)\]/g
        let dm
        while ((dm = dijRe.exec(fnBody))) {
            const argVar = dm[1]
            const names = [...dm[2].matchAll(/"([^"]+)"/g)].map((x) => x[1])
            if (!names.length) continue
            const target = nodes.get(argVar) || getOrCreateNode(argVar)
            // Mark every attr added by the disjunction's contributing parsers
            // as optional — only one branch fires at runtime.
            for (const a of Object.values(target.attrs || {})) a.optional = true
            target.__variants = names
        }
    }

    // Splice children into their parent nodes using the scope graph. Children
    // tracked via `flattenedChildWithTag` / `optionalChildWithTag` /
    // `mapChildrenWithTag` aren't in `nodes` because their target var is
    // referenced via `.value` (we keyed them by var name above) — anything
    // that doesn't make it into the root's children list explicitly via a
    // child/children call still belongs in the tree if its parent !== null.
    const root = getOrCreateNode(rootParam)
    for (const [varName, node] of nodes.entries()) {
        if (varName === rootParam) continue
        const entry = scope.get(varName)
        if (!entry || entry.kind === 'leaf' || entry.kind === 'assert') continue
        if (!entry.parent) continue
        const parentNode = nodes.get(entry.parent)
        if (!parentNode) continue
        // Avoid duplicate if a synthetic child of the same tag already exists.
        if (parentNode.children.some((c) => c.tag === node.tag)) continue
        const cardinality =
            entry.cardinality === 'one' ? { min: 1, max: 1 } : { min: 0, max: 1 }
        parentNode.children.push({ ...node, ...cardinality })
    }

    return root
}

function decodeNumericLiteral(text) {
    if (text === 'Infinity' || text === '1/0') return null
    const n = Number(text)
    return Number.isFinite(n) ? n : null
}

// Build the per-module `fnsByName` map: for every `function <id>(<params>)
// {<body>}` declaration in a module factory body, walk the body as a parser
// and cache the resulting ElementNode under `<id>`. Only functions whose
// body uses a parser primitive (`assertTag`/`attrString`/`maybeChild`/etc.)
// get walked — pure utility helpers stay out.
//
// Each entry is initialised to `null` first so that mutual recursion among
// local helpers can stop at a cycle without infinite-looping.
function buildFnsByName(body, moduleIndex, parseFnTraced) {
    const decls = []
    const declRe = /function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/g
    let dm
    while ((dm = declRe.exec(body))) {
        const fnBodyStart = dm.index + dm[0].length
        const fnBodyEnd = skipExpr(body, fnBodyStart, ['}'])
        decls.push({
            id: dm[1],
            params: dm[2],
            bodyStart: fnBodyStart,
            bodyEnd: fnBodyEnd
        })
    }
    const fnsByName = new Map()
    for (const d of decls) fnsByName.set(d.id, null) // cycle guard
    for (const d of decls) {
        const fnBody = body.slice(d.bodyStart, d.bodyEnd)
        const rootParam = (d.params.split(',')[0] || '').trim()
        if (!rootParam) continue
        // Recognise as a parser function by ANY WASmaxParse* primitive usage
        // — not just assertTag. Local "leaf" helpers like
        // `function e(e){return WASmaxParseUtils.contentBytesRange(e,1,100)}`
        // don't call assertTag but still produce a meaningful node.
        if (!/\b(assertTag|attrString|attrInt|attrLongInt|attrIntRange|attrStanzaId|attrCallId|attrStringEnum|maybeAttr|maybeChild|child\(|childWithTag|optionalChild|optionalChildWithTag|flattenedChildWithTag|mapChildrenWithTag|countChildrenWithTag|contentString|contentBytes|contentInt|contentLiteralBytes|contentBytesRange|contentStringEnum|literalContent|attrUserJid|attrLidUserJid|attrDeviceJid|attrGroupJid|attrCallJid|attrDomainJid|attrBroadcastJid|attrStatusJid|attrNewsletterJid|attrJidEnum|literalJid|attrFromReference|attrStringFromReference)\s*\(/.test(fnBody)) continue
        const tree = buildResponseTreeFromFn(
            fnBody,
            rootParam,
            moduleIndex,
            parseFnTraced,
            fnsByName
        )
        fnsByName.set(d.id, tree)
    }
    return fnsByName
}

// Recursively walk an inner-parser function reference. The reference is one of:
//   - A local identifier (e.g. `e`) referring to a function defined in the
//     SAME module — resolved via the current scope's fnsByName
//   - A cross-module reference `<ld>("WASmaxIn...").parseXxx` — descends into
//     the referenced module, builds ITS own fnsByName, then walks the
//     exported function from that fresh scope
//
// Returns an ElementNode or null on failure.
function recurseIntoParser(parseFnText, moduleIndex, parseFnTraced, fnsByName, expectedTag) {
    // Cross-module: `<ld>("ModName").<methodName>`
    const cross = parseFnText.match(/^[A-Za-z_$][\w$]*\("([^"]+)"\)\.([A-Za-z_$][\w$]*)$/)
    if (cross) {
        const key = `${cross[1]}#${cross[2]}`
        if (parseFnTraced.has(key)) return parseFnTraced.get(key)
        parseFnTraced.set(key, null) // cycle guard
        const mod = findModule(cross[1], moduleIndex)
        if (!mod) {
            const stub = { tag: expectedTag, attrs: {}, children: [], __external: cross[1] }
            parseFnTraced.set(key, stub)
            return stub
        }
        const body = mod.factoryBody
        const exportRe = new RegExp(`\\bl\\.${cross[2]}\\s*=\\s*([A-Za-z_$][\\w$]*)`)
        const exportMatch = body.match(exportRe)
        if (!exportMatch) {
            parseFnTraced.set(key, null)
            return null
        }
        const entryFnId = exportMatch[1]
        // Build a NEW fnsByName for the target module — local idents like
        // `u`/`c`/`d`/`m` in the target are unrelated to same-named idents
        // in the caller's module. Without this, OPTIONAL_CHILD(u, ...) /
        // childWithTag(node, "tag", u) on the receiving side would resolve
        // against the WRONG module's local helpers (or get marked
        // __unresolvedParser when the names don't exist at all).
        const subFnsByName = buildFnsByName(body, moduleIndex, parseFnTraced)
        const tree = subFnsByName.get(entryFnId)
        if (tree) {
            parseFnTraced.set(key, tree)
            return tree
        }
        // Fallback — entry exists but wasn't walked (rare; e.g. its body
        // doesn't contain any recognised parse primitive). Walk it directly.
        const decl = new RegExp(`function\\s+${entryFnId}\\s*\\(([^)]*)\\)\\s*\\{`).exec(body)
        if (!decl) {
            parseFnTraced.set(key, null)
            return null
        }
        const fnBodyStart = decl.index + decl[0].length
        const fnBodyEnd = skipExpr(body, fnBodyStart, ['}'])
        const fnBody = body.slice(fnBodyStart, fnBodyEnd)
        const rootParam = (decl[1].split(',')[0] || '').trim()
        const fallbackTree = buildResponseTreeFromFn(
            fnBody,
            rootParam,
            moduleIndex,
            parseFnTraced,
            subFnsByName
        )
        parseFnTraced.set(key, fallbackTree)
        return fallbackTree
    }

    // Local function ref — look up in the current scope's fnsByName.
    const id = parseFnText.match(/^([A-Za-z_$][\w$]*)$/)
    if (id && fnsByName.has(id[1])) {
        const cached = fnsByName.get(id[1])
        if (cached) return cached
        // Cached entry is null (cycle guard not yet populated, OR the
        // helper body didn't contain any recognised primitive). Surface as
        // unresolved rather than returning null so consumers see the gap.
    }

    return { tag: expectedTag, attrs: {}, children: [], __unresolvedParser: parseFnText }
}

// Walk a response module. Same shape as request: pick the entry export, find
// its function body, then build the tree.
//
// The RPC module dictates the entry parser — it explicitly calls
// `<dep>("<inModule>").parse<X>(<respNode>, <reqNode>)` and only checks
// `.success`. We use that method name when provided; without it we fall back
// to the first export that looks like a `parse*Response*` (some response
// modules export sub-parsers for nested elements and naive first-match
// selection would pick e.g. `parseAddParticipantsResponseSuccessAddParticipant`
// instead of the top-level `parseAddParticipantsResponseSuccess`).
function extractResponseModule(moduleName, moduleIndex, parseFnTraced, preferredEntry) {
    const m = findModule(moduleName, moduleIndex)
    if (!m) return { error: 'module-not-found' }
    const body = m.factoryBody

    // Map exported names → fn ids; we want the parseResponse* one as entry.
    const exportRe = /\bl\.([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\s*(?:[,;}]|$)/g
    const exports_ = {}
    let em
    while ((em = exportRe.exec(body))) exports_[em[1]] = em[2]

    let entryName = null
    if (preferredEntry && preferredEntry in exports_) entryName = preferredEntry
    if (!entryName) {
        // Pick the SHORTEST `parse*Response*` export — the longer ones are
        // sub-parsers for nested elements (e.g. `parseAddParticipantsResponseSuccess`
        // vs `parseAddParticipantsResponseSuccessAddParticipant`). Falling
        // back to first-by-source-order would grab a sub-parser and miss
        // the root `<iq>` wrapper.
        const candidates = Object.keys(exports_).filter((k) => /^parse.*Response/.test(k))
        if (candidates.length > 0) entryName = candidates.sort((a, b) => a.length - b.length)[0]
    }
    if (!entryName) {
        const candidates = Object.keys(exports_).filter((k) => /^parse/.test(k))
        if (candidates.length > 0) entryName = candidates.sort((a, b) => a.length - b.length)[0]
    }
    if (!entryName) entryName = Object.keys(exports_)[0]
    if (!entryName) return { error: 'no-export' }
    const entryFnId = exports_[entryName]

    // Pre-build a name-keyed cache of LOCAL parser functions in this module
    // so cross-references like `parseFoo` resolve via fnsByName.
    // Shared with cross-module recursion in recurseIntoParser — important
    // because nested modules use their OWN single-letter idents (`u`, `c`,
    // `d`, …) that mean different things in different modules.
    const fnsByName = buildFnsByName(body, moduleIndex, parseFnTraced)

    const rootTree = fnsByName.get(entryFnId)
    if (!rootTree) {
        return {
            error: 'entry-function-not-parsed',
            entryFnId,
            entryName,
            exports: Object.keys(exports_)
        }
    }
    return { node: rootTree, entryName }
}

// ---------------------------------------------------------------------------
// RPC extraction — top-level driver.
// ---------------------------------------------------------------------------

// Operation name = whatever the throw passes to `errorMessageRpcParsing("X", ...)`.
function extractOpName(body) {
    const m = body.match(/errorMessageRpcParsing\s*\(\s*"([^"]+)"/)
    if (m) return m[1]
    const send = body.match(/\bl\.(send([A-Z][\w$]*?)RPC)\s*=/)
    if (send) return send[2]
    return null
}

function classifyDep(name) {
    if (/^WASmaxOut.*Request$/.test(name)) return 'request'
    if (/^WASmaxIn.*Response/.test(name)) return 'response'
    // Server-initiated `receive*RPC` modules import the incoming-stanza
    // parser as a `WASmaxIn*Request` dep (a misnomer — it's not an outgoing
    // request, it's the parser for the stanza the server sends to us).
    // Treat those as "incoming" so the RPC walker pulls in their schema.
    if (/^WASmaxIn.*Request$/.test(name)) return 'incoming'
    // Hybrid `receive*RPC` modules ALSO emit out-going response builders
    // (`WASmaxOut*Response(Success|Error|ClientResponse|…)`) that the handler
    // sends back as an ack/nack. Classify as 'outgoing-response' so the
    // walker grafts them onto the op alongside the incoming parser.
    // Allow multi-segment PascalCase suffixes after `Response`
    // (e.g. `…ResponseClientResponse`, `…ResponseHostedClientResponse`).
    if (/^WASmaxOut.*Response[A-Z][A-Za-z0-9_]*$/.test(name)) return 'outgoing-response'
    if (/Mixin$/.test(name)) return 'mixin'
    return 'other'
}

function extractRpc(moduleName, moduleIndex, mixinMemo, parseFnTraced, diagnostics) {
    const mod = findModule(moduleName, moduleIndex)
    if (!mod) return { module: moduleName, error: 'rpc-module-not-found' }
    const body = mod.factoryBody
    const opName = extractOpName(body) || moduleName.replace(/^WASmax/, '').replace(/RPC$/, '')

    const requestDeps = mod.deps.filter((d) => classifyDep(d) === 'request')
    const responseDeps = mod.deps.filter((d) => classifyDep(d) === 'response')
    const incomingDeps = mod.deps.filter((d) => classifyDep(d) === 'incoming')
    const outgoingResponseDeps = mod.deps.filter((d) => classifyDep(d) === 'outgoing-response')

    let request = null
    if (requestDeps.length > 0) {
        const reqMod = requestDeps[0]
        const r = extractRequestModule(reqMod, moduleIndex, mixinMemo)
        request = { module: reqMod, ...r }
    } else {
        diagnostics.rpcWithoutRequest++
    }

    // For each response / incoming dep, find which parse* method the RPC body
    // invokes — pattern is `<ld>("<mod>").<method>(<node>, <reqNode>)`. That
    // method is the canonical entry; sub-parsers exported alongside it
    // (for nested elements) would otherwise win a first-match scan.
    const parserModules = [...responseDeps, ...incomingDeps]
    const callRe = /\b[A-Za-z_$][\w$]*\(\s*"([^"]+)"\s*\)\s*\.\s*([A-Za-z_$][\w$]*)\s*\(/g
    const rpcEntryByModule = {}
    let callM
    while ((callM = callRe.exec(body))) {
        if (parserModules.includes(callM[1]) && /^parse/.test(callM[2])) {
            rpcEntryByModule[callM[1]] = callM[2]
        }
    }

    const responses = []
    for (const respMod of responseDeps) {
        const preferred = rpcEntryByModule[respMod] || null
        const r = extractResponseModule(respMod, moduleIndex, parseFnTraced, preferred)
        // Pull the variant tail off the module name. There are TWO pathological
        // shapes the strip has to survive:
        //   - op name embeds `Response` (e.g. `GetNewsletterResponses…`) — a
        //     non-greedy match grabs only the first occurrence and leaves an
        //     `s` + the actual `Response<Variant>` behind
        //   - variant name itself ends in `Response`
        //     (e.g. `…GetCountryCodeResponseGetCountryCodeResponse`) — a
        //     fully greedy match eats both occurrences and leaves nothing
        // Try greedy first; if that empties the string, fall back to non-greedy
        // so the variant-as-`Response`-name case still yields a usable label.
        let variantName = respMod
            .replace(/^WASmaxIn.*Response/, '')
            .replace(/^WASmaxIn/, '')
        if (!variantName) {
            variantName = respMod
                .replace(/^WASmaxIn.*?Response/, '')
                .replace(/^WASmaxIn/, '')
        }
        responses.push({ module: respMod, variant: variantName || respMod, ...r })
    }

    // Receive RPCs surface their inbound parser as `incoming`. Treat each as
    // a sole response variant (named `Request` to mirror the `WASmaxIn*Request`
    // module convention) so the consuming end of the IR has one schema per op
    // regardless of direction.
    for (const inMod of incomingDeps) {
        const preferred = rpcEntryByModule[inMod] || null
        const r = extractResponseModule(inMod, moduleIndex, parseFnTraced, preferred)
        const variantName = inMod.replace(/^WASmaxIn.*?Request$/, '') || 'Request'
        responses.push({
            module: inMod,
            variant: variantName === '' ? 'Request' : variantName,
            incoming: true,
            ...r
        })
    }

    // Hybrid receive-RPCs also carry outgoing-response builders that the
    // handler can call to send back an ack/nack — surface those as
    // additional outgoing schemas under the same op so consumers know what
    // the client may emit in response.
    const outgoingResponses = []
    for (const outMod of outgoingResponseDeps) {
        const r = extractRequestModule(outMod, moduleIndex, mixinMemo)
        // Variant name = the trailing `Response<Suffix>` portion (e.g.
        // `Success` / `Error` / `Negative`).
        const variantName = outMod.replace(/^WASmaxOut.*?Response/, '') || outMod
        outgoingResponses.push({
            module: outMod,
            variant: variantName,
            outgoing: true,
            ...r
        })
    }

    // IQ summary attrs derived from the request's xmlns + type literal (if any).
    let xmlns = null
    let type_ = null
    if (request && request.node && request.node.attrs) {
        const xa = request.node.attrs.xmlns
        if (xa && xa.type === 'literal') xmlns = xa.value
        const ta = request.node.attrs.type
        if (ta && ta.type === 'literal') type_ = ta.value
    }

    // Root tag — prefer the request stanza tag, fall back to the incoming
    // parser's root tag for receive-only ops (no Out builder).
    let rootTag = request?.node?.tag ?? null
    if (!rootTag) {
        for (const r of responses) {
            if (r.incoming && r.node?.tag) { rootTag = r.node.tag; break }
        }
    }

    return {
        module: moduleName,
        opName,
        rootTag,
        xmlns,
        type: type_,
        request,
        responses,
        ...(outgoingResponses.length > 0 ? { outgoingResponses } : {})
    }
}

// ---------------------------------------------------------------------------
// Public entry point.
// ---------------------------------------------------------------------------

function extractXml(bundles) {
    const moduleIndex = buildModuleIndex(bundles)
    const mixinMemo = new Map()
    const parseFnTraced = new Map()

    const diagnostics = {
        modulesIndexed: moduleIndex.size,
        rpcModulesDiscovered: 0,
        rpcExtracted: 0,
        rpcWithoutRequest: 0,
        rpcErrored: 0,
        errors: []
    }

    const operations = {}
    // Track Out request modules we've consumed via the canonical RPC pipeline
    // so we don't double-count them when synthesising the orphan pass below.
    const consumedRequestModules = new Set()
    for (const [name] of moduleIndex) {
        if (!/^WASmax.+RPC$/.test(name)) continue
        diagnostics.rpcModulesDiscovered++
        try {
            const op = extractRpc(name, moduleIndex, mixinMemo, parseFnTraced, diagnostics)
            if (!op || op.error) {
                diagnostics.rpcErrored++
                diagnostics.errors.push({ module: name, error: op?.error ?? 'unknown' })
                continue
            }
            if (op.request?.module) consumedRequestModules.add(op.request.module)
            // Disambiguate opName collisions. The `errorMessageRpcParsing(...)`
            // string the bundle uses is occasionally the same across two RPCs
            // (e.g. `WASmaxMessagePublishNewsletterRPC` and
            // `WASmaxMessageDeliverNewsletterRPC` both throw `"Newsletter"`).
            // When that happens we synthesise a unique key by prepending the
            // distinguishing module suffix (`Publish` / `Deliver`).
            let key = op.opName
            if (operations[key]) {
                const prior = operations[key]
                const priorPrefix = uniquePrefix(prior.module, op.module)
                const newPrefix = uniquePrefix(op.module, prior.module)
                if (priorPrefix && newPrefix && priorPrefix !== newPrefix) {
                    // Re-key the prior op under its prefix-disambiguated name,
                    // then place the new one under its own.
                    operations[`${priorPrefix}${op.opName}`] = prior
                    delete operations[key]
                    key = `${newPrefix}${op.opName}`
                } else {
                    // Last-resort: append the module name suffix.
                    key = `${op.opName}_${op.module.replace(/RPC$/, '')}`
                }
            }
            operations[key] = op
            diagnostics.rpcExtracted++
        } catch (err) {
            diagnostics.rpcErrored++
            diagnostics.errors.push({ module: name, error: err.message, stack: err.stack })
        }
    }

    // Orphan-builder pass: surface `WASmaxOut*Request` modules that aren't
    // wrapped in an RPC module as standalone synthetic operations. These are
    // request builders the client calls directly (e.g. `WASmaxOutPingsClientRequest`,
    // `WASmaxOutUserNoticeSetRequest`). Pair each with sibling `WASmaxIn*Response*`
    // parsers matched by name prefix (`WASmaxOut<X>Request` ↔ `WASmaxIn<X>Response*`).
    for (const [name] of moduleIndex) {
        if (!/^WASmaxOut.+Request$/.test(name)) continue
        if (consumedRequestModules.has(name)) continue
        try {
            const baseName = name.replace(/^WASmaxOut/, '').replace(/Request$/, '')
            const reqResult = extractRequestModule(name, moduleIndex, mixinMemo)
            const responseDeps = []
            const responsePrefix = `WASmaxIn${baseName}Response`
            for (const [m] of moduleIndex) {
                if (m.startsWith(responsePrefix)) responseDeps.push(m)
            }
            const responses = []
            for (const respMod of responseDeps) {
                const r = extractResponseModule(respMod, moduleIndex, parseFnTraced, null)
                const variantName = respMod.replace(responsePrefix, '') || 'Response'
                responses.push({
                    module: respMod,
                    variant: variantName === '' ? 'Response' : variantName,
                    ...r
                })
            }
            // Op naming — derive from the Out module's exported method.
            let opName = baseName
            const opMod = findModule(name, moduleIndex)
            if (opMod) {
                const sendExport = opMod.factoryBody.match(/\bl\.make([A-Z]\w*?)Request\s*=/)
                if (sendExport) opName = sendExport[1]
            }
            // Disambiguate opName against existing operations using the
            // same prefix-discovery logic the RPC pass uses for collisions.
            let key = opName
            if (operations[key]) {
                const prior = operations[key]
                const newPrefix = uniquePrefix(name, prior.module)
                if (newPrefix && newPrefix !== opName) key = `${newPrefix}${opName}`
                else key = `${opName}_${name.replace(/Request$/, '').replace(/^WASmaxOut/, '')}`
            }
            let xmlns = null, type_ = null
            if (reqResult.node?.attrs) {
                const xa = reqResult.node.attrs.xmlns
                if (xa && xa.type === 'literal') xmlns = xa.value
                const ta = reqResult.node.attrs.type
                if (ta && ta.type === 'literal') type_ = ta.value
            }
            operations[key] = {
                module: name,
                opName,
                rootTag: reqResult.node?.tag ?? null,
                xmlns,
                type: type_,
                request: { module: name, ...reqResult },
                responses,
                orphan: true
            }
            diagnostics.rpcExtracted++
        } catch (err) {
            diagnostics.rpcErrored++
            diagnostics.errors.push({ module: name, error: err.message })
        }
    }

    return { operations, diagnostics }
}

// Given two RPC module names that collide on opName, return a short PascalCase
// token that uniquely identifies `a` relative to `b` by walking back from the
// `RPC` suffix and stopping at the first PascalCase segment that differs.
// E.g. `WASmaxMessagePublishNewsletterRPC` vs `WASmaxMessageDeliverNewsletterRPC`
//   → `Publish` (the diverging segment)
function uniquePrefix(a, b) {
    const stripA = a.replace(/^WASmax/, '').replace(/RPC$/, '')
    const stripB = b.replace(/^WASmax/, '').replace(/RPC$/, '')
    const partsA = stripA.split(/(?=[A-Z])/)
    const partsB = stripB.split(/(?=[A-Z])/)
    for (let i = 0; i < partsA.length; i++) {
        if (partsA[i] !== partsB[i]) return partsA[i]
    }
    return null
}

module.exports = {
    extractXml,
    // Exported for the Phase 2 extractor — lets non-IQ handlers that
    // delegate to a Smax IN parser (rather than a full RPC) reuse the same
    // declarative-walker logic instead of falling back to the imperative OO
    // walker.
    extractResponseModule,
    buildModuleIndex,
    // Exported for the Phase 3 extractor — outgoing message-construction
    // modules call `wap("<tag>", {attrs}, ...children)` directly and we
    // reuse the same decoder.
    decodeSmaxCall
}
