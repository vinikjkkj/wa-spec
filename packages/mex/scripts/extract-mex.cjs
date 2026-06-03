'use strict'

/**
 * Static Mex extractor — operates on an array of bundle texts (no browser
 * runtime). For each `*.graphql` Meta haste module:
 *
 *   1. Find the factory body and parse the Relay operation literal it returns.
 *      Operation literals look like:
 *        { kind:"Request", params:{id,operationKind,name,text},
 *          fragment:{ argumentDefinitions:[{name,...}], type, selections, ... },
 *          operation:{ name, argumentDefinitions, selections, ... } }
 *
 *   2. Pull docId/operationKind/argDef names from the literal.
 *
 *   3. Walk operation.selections to compute a response shape tree:
 *        null            scalar leaf
 *        { ...fields }   singular object
 *        [{ ...fields }] plural object
 *      InlineFragment/Condition/TypeDiscriminator merge into parent.
 *
 *   4. For each caller module that depends on the .graphql, scan its body for
 *      `.fetchQuery(id, <expr>)` / `.commitMutation(id, <expr>)` and parse
 *      <expr> to recover the nested input shape. Augments any missing
 *      top-level keys with argDef names.
 *
 * Output:
 *   { operations: { [opName]: { docId, operationKind, variables, variablesShape, response } } }
 */

const {
    skipExpr,
    skipString,
    skipWs,
    parseValue,
    parseObject,
    iterModuleHeaders
} = require('./parser.cjs')
const { fillInputTypes, fillResponseTypes } = require('./infer-leaf-types.cjs')

// Minifier identifiers can contain `$` (e.g. `$e`) or be a bare `$`. Interpolating
// a name into a RegExp unescaped lets `$` act as the end-of-input anchor, and `\b`
// does not delimit tokens that start/end with `$`. reId() escapes a discovered
// name; LB/RB are identifier boundaries that treat `$` as part of the identifier.
const reId = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const LB = '(?<![\\w$])' // left identifier boundary (replaces a leading \b)
const RB = '(?![\\w$])' // right identifier boundary (replaces a trailing \b)

const NOISE =
    /BizAd|BizAi|BizCatalog|BizPay|BizBroadcast|Comet|LWI|MWChat|Mmlite|BizMeta|BizCommerce|BizAccount|BizDeli|BizMass|BizMcomm|BizMessageTemplate|BizOrder|BizPlatform|BizPostpaid|BizSendOptIn|BizSetting|BizShipping|BizQuickReplies|BizLabel|BizAway|BizGreeting|BizOnboarding|BizGroup|BizHub|BizInstall|BizInterop|BizLogin|BizPnh|BizQrCode|BizQuote|BizRecurring|BizRequest|BizSubscribed|BizUpsell|BizVerify|BizWa|BizWam|BizWelcome|BizYou|MetaAi|MetaTransp|Saved|Telemetry|Subscribe|Galaxy|Hatch|LinkedAccounts|Provisioning|RtcRing|XplatGen|Wallet|Transaction|Boost/i

// Locate the parenthesised body of `__d("<name>", ...)` in any of the bundle texts.
function findModuleBody(bundles, modName) {
    const needle = `__d("${modName}"`
    for (const b of bundles) {
        const idx = b.text.indexOf(needle)
        if (idx === -1) continue
        let depth = 0
        for (let i = idx; i < b.text.length; i++) {
            if (b.text[i] === '(') depth++
            else if (b.text[i] === ')') {
                if (--depth === 0) return b.text.slice(idx, i + 1)
            }
        }
    }
    return null
}

// Build a tracer that resolves bare identifiers to their literal values by
// scanning earlier `var <id> = <literal>` / `<id> = <literal>` declarations
// in the same body. Relay's compiled output hoists shared field/argDef
// objects into local vars before composing the operation literal.
function makeBodyTracer(body) {
    const cache = new Map()
    function trace(ident) {
        if (cache.has(ident)) return cache.get(ident)
        const re = new RegExp(`(?:var|let|const)?\\s*${LB}${reId(ident)}\\s*=\\s*`, 'g')
        let dm
        let last = null
        while ((dm = re.exec(body))) {
            const pos = dm.index + dm[0].length
            if (body[pos] === '{' || body[pos] === '[') {
                const r = parseValue(body, pos, trace)
                if (r.value !== null && r.value !== undefined) last = r.value
            }
        }
        cache.set(ident, last)
        return last
    }
    return trace
}

// Find the operation literal `{ kind:"Request", ... }` in a graphql module body.
// Scans for `kind:"Request"`, back-tracks to the enclosing `{`, then parses
// with an identifier tracer so referenced locals (`argumentDefinitions:e`,
// `selections:[a,b,c]`) get resolved to their actual literals.
function findOperationLiteral(body) {
    const marker = body.indexOf('"Request"')
    if (marker === -1) return null
    const trace = makeBodyTracer(body)
    let i = marker
    let depth = 0
    while (i >= 0) {
        const c = body[i]
        if (c === '}' || c === ')' || c === ']') depth++
        else if (c === '{') {
            if (depth === 0) {
                const r = parseObject(body, i, trace)
                if (r.value && r.value.kind === 'Request') return r.value
                depth = 0
            } else {
                depth--
            }
        } else if (c === '(' || c === '[') {
            if (depth > 0) depth--
        }
        i--
    }
    return null
}

// Walk a Relay selections tree and collect every (variableName → graphqlName)
// pair from LinkedField `args` entries where `kind === 'Variable'`. Relay
// strips the GraphQL scalar type from compiled artifacts, but when an input
// LocalArgument named `input` maps to a GraphQL field named `username`, the
// field name itself carries strong typing signal (a `username` field is a
// String scalar per the schema). The mapping enables a fallback inference
// path for inputs whose RHS the caller body never exposes literally.
function collectVarToFieldMap(selections, out) {
    if (!Array.isArray(selections)) return out
    for (const sel of selections) {
        if (!sel || typeof sel !== 'object') continue
        if (Array.isArray(sel.args)) {
            for (const a of sel.args) {
                if (a && a.kind === 'Variable' && typeof a.variableName === 'string' && typeof a.name === 'string') {
                    if (a.variableName !== a.name && !out[a.variableName]) {
                        out[a.variableName] = a.name
                    }
                }
            }
        }
        if (Array.isArray(sel.selections)) collectVarToFieldMap(sel.selections, out)
    }
    return out
}

// Walk a Relay selections array → compact response tree.
// `InlineFragment` and `Condition` selections may introduce LinkedField keys
// that already exist at the parent level (e.g. type-conditional sub-fields of
// `properties` in FetchGroupInfo). Deep-merge so we don't lose either side.
function shapeFromSelections(selections) {
    const fields = {}
    if (!Array.isArray(selections)) return fields
    for (const sel of selections) {
        if (!sel || typeof sel !== 'object') continue
        const kind = sel.kind
        if (kind === 'ScalarField' || kind === 'TypeDiscriminator') {
            const key = sel.alias || sel.name || '__typename'
            if (typeof key === 'string' && !(key in fields)) fields[key] = null
        } else if (kind === 'LinkedField') {
            const key = sel.alias || sel.name
            if (typeof key !== 'string') continue
            const inner = shapeFromSelections(sel.selections)
            const value = sel.plural ? [inner] : inner
            fields[key] = mergeShapeNode(fields[key], value)
        } else if (kind === 'InlineFragment' || kind === 'Condition') {
            const inner = shapeFromSelections(sel.selections)
            for (const [k, v] of Object.entries(inner)) {
                fields[k] = mergeShapeNode(fields[k], v)
            }
        }
    }
    return fields
}

// Merge two shape nodes (used when InlineFragments introduce fields that
// overlap with the parent's selections at the same key). `null` is a scalar
// leaf and stays null. Objects merge field-by-field. Arrays merge their
// `[0]` element shapes.
function mergeShapeNode(a, b) {
    if (a === undefined) return b
    if (b === undefined) return a
    if (a === null) return b ?? null
    if (b === null) return a
    if (Array.isArray(a) && Array.isArray(b)) {
        return [mergeShapeNode(a[0], b[0])]
    }
    if (Array.isArray(a) || Array.isArray(b)) return Array.isArray(a) ? a : b
    if (typeof a === 'object' && typeof b === 'object') {
        const out = { ...a }
        for (const [k, v] of Object.entries(b)) out[k] = mergeShapeNode(out[k], v)
        return out
    }
    return a
}

// --- Variables-shape parser (caller bundle: fetchQuery(id, <expr>)) ---
//
// This mirrors the in-page logic but operates on Node-side bundle text.
// Reused from the original mex extractor with the new shared parser utilities.

function makeTracer(body, callPos) {
    const sub = body.slice(0, callPos)
    function trace(ident) {
        const re = new RegExp(`(?:var|let|const)?\\s*${LB}${reId(ident)}\\s*=\\s*`, 'g')
        let dm
        let last = null
        while ((dm = re.exec(sub))) {
            const pos = dm.index + dm[0].length
            if (sub[pos] === '{' || sub[pos] === '[') {
                const r = parseValueShape(sub, pos, trace)
                if (r.value !== null) last = r.value
            }
        }
        return last
    }
    return trace
}

// Variant of parseValue that only captures structure (keys + plurality),
// not actual scalar values — what we want for input-shape recovery.
function parseValueShape(s, start, traceIdent) {
    let i = skipWs(s, start)
    const c = s[i]
    if (c === '{') return parseObjectShape(s, i, traceIdent)
    if (c === '[') return parseArrayShape(s, i, traceIdent)
    if (traceIdent && /[\w$]/.test(c)) {
        let k = i
        while (k < s.length && /[\w$]/.test(s[k])) k++
        const ident = s.slice(i, k)
        let n = k
        while (n < s.length && /\s/.test(s[n])) n++
        if (s[n] !== '(' && s[n] !== '.') {
            const traced = traceIdent(ident)
            return { value: traced, end: skipExpr(s, i, [',', '}', ']']) }
        }
    }
    // Array-producing call expressions: `<x>.map(...)`, `<x>.filter(...)`,
    // `Array.from(...)`, `Array.of(...)`, `Object.keys(...)`,
    // `Object.values(...)`. Mark structurally as array (`[null]`) so the
    // input is rendered as ReadonlyArray<unknown> instead of bare unknown.
    const end = skipExpr(s, i, [',', '}', ']'])
    const expr = s.slice(i, end)
    if (/\.(?:map|filter|slice|concat|flat|flatMap|sort|reverse|splice)\s*\(/.test(expr)) {
        // When the call is `.map(function(<p>){...return <objLit>...})`,
        // parse the callback's return value as the array item shape. This
        // recovers e.g. LogNewsletterExposures.exposures →
        //   exposures: [{newsletter_id: 'string', capability: 'string'}]
        // (per the wrapper's `e.map(function(e){return {newsletter_id:n, capability:...}})`).
        const inner = extractMapCallbackReturn(expr)
        if (inner !== null) return { value: [inner], end }
        return { value: [null], end }
    }
    if (/^Array\.(?:from|of)\s*\(/.test(expr) || /^Object\.(?:keys|values|entries)\s*\(/.test(expr)) {
        return { value: [null], end }
    }
    return { value: null, end }
}

// Best-effort: given a `<expr>.map(function(<p>){...})` or `.map(<p>=>...)`,
// extract the shape of the callback's returned value (object literal only).
// Returns the object-shape (with `null` leaves) or `null` when no usable
// return is found. We keep it intentionally narrow — anything more complex
// stays as `[null]`.
function extractMapCallbackReturn(expr) {
    const mIdx = expr.search(/\.map\s*\(/)
    if (mIdx === -1) return null
    // Find the `(` after `.map`
    let i = expr.indexOf('(', mIdx)
    if (i === -1) return null
    // Find matching close
    let dp = 1
    let j = i + 1
    while (j < expr.length && dp > 0) {
        const c = expr[j]
        if (c === '"' || c === "'" || c === '`') { j = skipString(expr, j); continue }
        if (c === '(') dp++
        else if (c === ')') dp--
        j++
    }
    const cb = expr.slice(i + 1, j - 1)
    // Find `return <expr>` inside cb. Minified code has `return{...}` with no
    // whitespace, so the regex must allow zero whitespace after `return`.
    const retMatch = cb.match(/\breturn\b\s*/)
    if (!retMatch) {
        // Arrow shorthand `<p>=>(<expr>)` or `<p>=><expr>`
        const arrowIdx = cb.indexOf('=>')
        if (arrowIdx === -1) return null
        let k = arrowIdx + 2
        while (k < cb.length && /\s/.test(cb[k])) k++
        if (cb[k] === '(') k++
        if (cb[k] !== '{') return null
        const r = parseObjectShape(cb, k, null)
        return r && r.value && typeof r.value === 'object' ? r.value : null
    }
    let k = retMatch.index + retMatch[0].length
    while (k < cb.length && /\s/.test(cb[k])) k++
    if (cb[k] !== '{') return null
    const r = parseObjectShape(cb, k, null)
    return r && r.value && typeof r.value === 'object' ? r.value : null
}

function parseObjectShape(s, start, traceIdent) {
    let i = start + 1
    const out = {}
    i = skipWs(s, i)
    while (i < s.length && s[i] !== '}') {
        i = skipWs(s, i)
        if (s.slice(i, i + 3) === '...') {
            i += 3
            let k = i
            while (k < s.length && /[\w$]/.test(s[k])) k++
            const ident = s.slice(i, k)
            if (ident && traceIdent) {
                const traced = traceIdent(ident)
                if (traced && typeof traced === 'object' && !Array.isArray(traced)) {
                    for (const [kk, vv] of Object.entries(traced)) {
                        if (!(kk in out)) out[kk] = vv
                    }
                }
            }
            i = skipExpr(s, i, [',', '}'])
            if (s[i] === ',') i++
            i = skipWs(s, i)
            continue
        }
        // Parse key (identifier or quoted)
        const c = s[i]
        let key = null
        if (c === '"' || c === "'") {
            const q = c
            i++
            const st = i
            while (i < s.length && s[i] !== q) {
                if (s[i] === '\\') i++
                i++
            }
            key = s.slice(st, i)
            i++
        } else if (c === '[') {
            i = skipExpr(s, i + 1, [']']) + 1
        } else {
            const st = i
            while (i < s.length && /[\w$]/.test(s[i])) i++
            key = s.slice(st, i) || null
        }
        i = skipWs(s, i)
        if (s[i] === '(') {
            i = skipExpr(s, i, [',', '}'])
            if (s[i] === ',') i++
            i = skipWs(s, i)
            continue
        }
        if (s[i] !== ':') {
            if (key) out[key] = null
            if (s[i] === ',') i++
            i = skipWs(s, i)
            continue
        }
        i++
        const v = parseValueShape(s, i, traceIdent)
        if (key) out[key] = v.value
        i = v.end
        i = skipWs(s, i)
        if (s[i] === ',') i++
        i = skipWs(s, i)
    }
    return { value: out, end: i < s.length ? i + 1 : i }
}

function parseArrayShape(s, start, traceIdent) {
    let i = start + 1
    i = skipWs(s, i)
    let first = null
    if (s[i] !== ']') {
        const r = parseValueShape(s, i, traceIdent)
        first = r.value
    }
    let dbr = 0
    while (i < s.length) {
        const c = s[i]
        if (c === '[') dbr++
        else if (c === ']') {
            if (dbr === 0) {
                i++
                break
            }
            dbr--
        } else if (c === '"' || c === "'" || c === '`') {
            i = skipString(s, i)
            continue
        }
        i++
    }
    return { value: [first], end: i }
}

function mergeShapes(a, b) {
    if (a == null) return b
    if (b == null) return a
    if (Array.isArray(a) || Array.isArray(b)) return Array.isArray(a) ? a : b
    if (typeof a !== 'object' || typeof b !== 'object') return a
    const out = { ...a }
    for (const [k, v] of Object.entries(b)) out[k] = k in out ? mergeShapes(out[k], v) : v
    return out
}

function parseSecondArg(body, start) {
    let i = skipWs(body, start)
    const trace = makeTracer(body, start)
    const c = body[i]
    if (c === '{' || c === '[') return parseValueShape(body, i, trace).value
    // ternary
    let j = i
    let dp = 0
    let found = -1
    while (j < body.length) {
        const ch = body[j]
        if (ch === '"' || ch === "'" || ch === '`') {
            j = skipString(body, j)
            continue
        }
        if (ch === '(') dp++
        else if (ch === ')') {
            if (dp === 0) break
            dp--
        } else if (ch === '?' && dp === 0) {
            found = j
            break
        } else if (ch === ',' && dp === 0) break
        j++
    }
    if (found > 0) {
        let k = found + 1
        k = skipWs(body, k)
        let leftVal = null
        if (body[k] === '{' || body[k] === '[') {
            const r = parseValueShape(body, k, trace)
            leftVal = r.value
            k = r.end
        } else if (/[\w$]/.test(body[k])) {
            let kk = k
            while (kk < body.length && /[\w$]/.test(body[kk])) kk++
            leftVal = trace(body.slice(k, kk))
            k = skipExpr(body, k, [':', ','])
        } else {
            k = skipExpr(body, k, [':', ','])
        }
        k = skipWs(body, k)
        if (body[k] === ':') {
            k++
            k = skipWs(body, k)
            let rightVal = null
            if (body[k] === '{' || body[k] === '[') {
                rightVal = parseValueShape(body, k, trace).value
            } else if (/[\w$]/.test(body[k])) {
                let kk = k
                while (kk < body.length && /[\w$]/.test(body[kk])) kk++
                rightVal = trace(body.slice(k, kk))
            }
            return mergeShapes(leftVal, rightVal)
        }
        return leftVal
    }
    if (/[\w$]/.test(c)) {
        let k = i
        while (k < body.length && /[\w$]/.test(body[k])) k++
        return trace(body.slice(i, k))
    }
    return null
}

function extractVarsShape(body) {
    if (!body) return null
    const re = /\.(fetchQuery|commitMutation|fetchSubscription)\s*\(/g
    let m
    const shapes = []
    while ((m = re.exec(body))) {
        let i = m.index + m[0].length
        i = skipExpr(body, i, [','])
        if (body[i] !== ',') continue
        i++
        const shape = parseSecondArg(body, i)
        if (shape !== null) shapes.push(shape)
    }
    if (shapes.length === 0) return null
    return shapes.reduce(mergeShapes, null)
}

// Reconcile the caller-bundle-derived shape with the authoritative variable
// names from Relay's `argumentDefinitions`. The caller bundle often holds
// many fetchQuery calls (one per op), and our naive merge picks up keys
// from sibling ops. We trust argDefNames as the source of truth: keep only
// matching keys (preserving their nested shape) and add missing argDefs as
// `null` leaves. When there are no argDefs, fall back to the raw shape.
function augmentWithArgDefs(shape, argDefNames) {
    if (argDefNames.length === 0) return shape || {}
    const src = shape && typeof shape === 'object' && !Array.isArray(shape) ? shape : {}
    const out = {}
    for (const name of argDefNames) {
        out[name] = name in src ? src[name] : null
    }
    return out
}

// Resolve `n("Foo_facebookRelayOperation")` — modules that just `a.exports`
// a docId string. Returns the string literal, or null if not found.
function resolveExportedString(bundles, modName) {
    const body = findModuleBody(bundles, modName)
    if (!body) return null
    // Pattern: `a.exports="<id>"` or `module.exports="<id>"`
    const m = body.match(/(?:a|module)\.exports\s*=\s*"([^"]+)"/)
    return m ? m[1] : null
}

// If the params.id value came back as { __ref: '<raw expr>' } because it was
// an unparseable expression (typically `n("X_facebookRelayOperation")`),
// try to resolve it cross-module.
function maybeResolveCrossModuleId(rawValue, bundles) {
    if (typeof rawValue === 'string') return rawValue
    if (rawValue && typeof rawValue === 'object' && typeof rawValue.__ref === 'string') {
        const m = rawValue.__ref.match(/^[A-Za-z_$][\w$]*\s*\(\s*"([^"]+)"\s*\)\s*$/)
        if (m) return resolveExportedString(bundles, m[1])
    }
    return null
}

function findFetchQueryPos(body) {
    if (!body) return null
    const m = body.match(/\.(fetchQuery|commitMutation|fetchSubscription)\s*\(/)
    return m ? m.index : null
}

// Search every bundle for a `<methodName>:function(...){...}` definition and
// return the first matched body slice (between the opening `{` and matching
// `}`). Used by the leaf-shape recovery in `fillInputTypes` to inspect
// `get<Field>` builder methods scattered across modules outside the direct
// wrapper/consumer dependency chain.
function findMethodImplementation(bundles, methodName) {
    if (!methodName) return null
    const escaped = methodName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const headerRe = new RegExp(`${LB}${escaped}\\s*:\\s*function\\s*\\(`)
    for (const b of bundles) {
        const m = headerRe.exec(b.text)
        if (!m) continue
        // Find the function body opening `{` after the args close `)`.
        let i = m.index + m[0].length
        // walk to matching `)` for args
        let dp = 1
        while (i < b.text.length && dp > 0) {
            const c = b.text[i]
            if (c === '(') dp++
            else if (c === ')') dp--
            i++
        }
        // skip whitespace
        while (i < b.text.length && /\s/.test(b.text[i])) i++
        if (b.text[i] !== '{') continue
        // walk to matching `}`
        let depth = 1
        let j = i + 1
        let inStr = false
        let strCh = ''
        while (j < b.text.length && depth > 0) {
            const c = b.text[j]
            if (inStr) {
                if (c === '\\') { j += 2; continue }
                if (c === strCh) inStr = false
                j++
                continue
            }
            if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; j++; continue }
            if (c === '{') depth++
            else if (c === '}') depth--
            j++
        }
        return b.text.slice(i, j) // includes outer { ... }
    }
    return null
}

function extractMex(bundles) {
    // Index every module header so we can map .graphql -> first caller, and
    // also track inverse dependencies so we can collect 2nd-hop consumer
    // bodies (the Job module's callers, which see the pass-through response).
    const callerByGraphql = {}
    const graphqlModules = new Set()
    const dependents = {} // moduleName → [modules that depend on it]
    for (const b of bundles) {
        for (const h of iterModuleHeaders(b.text)) {
            if (h.name.endsWith('.graphql')) graphqlModules.add(h.name)
            for (const dep of h.deps) {
                if (dep.endsWith('.graphql') && !callerByGraphql[dep]) {
                    callerByGraphql[dep] = h.name
                }
                ;(dependents[dep] = dependents[dep] || []).push(h.name)
            }
        }
    }
    // Pre-discover enums once so the shape recovery (recoverArrayItemShape →
    // parseObjectShapeInline) can disambiguate `id: <ref>.X.Y` references —
    // when `X` is a numeric enum (InternalEnum with integer values like
    // `NewsletterInsightMetricQuery`), the leaf is typed as 'number' instead
    // of falling to the schema-invariant `id → string` default.
    let sharedEnumIndex = null
    try {
        const { discoverEnums } = require('./enum-discovery.cjs')
        sharedEnumIndex = discoverEnums(bundles)
    } catch {}

    const operations = {}
    let kept = 0
    let skipped = 0
    let unparseable = 0

    for (const gqlName of graphqlModules) {
        const body = findModuleBody(bundles, gqlName)
        if (!body) {
            unparseable++
            continue
        }
        const op = findOperationLiteral(body)
        if (!op || !op.params) {
            continue
        }
        const params = op.params
        // Resolve docId — may be a string literal OR a require() to a
        // sibling `<X>_facebookRelayOperation` module that just exports the
        // id as a string.
        let docId = params.id
        if (typeof docId !== 'string') {
            docId = maybeResolveCrossModuleId(docId, bundles)
        }
        if (!docId || typeof docId !== 'string') continue
        const opName = params.name
        if (typeof opName !== 'string') {
            unparseable++
            continue
        }
        if (NOISE.test(opName)) {
            skipped++
            continue
        }
        const argDefs = (op.fragment && op.fragment.argumentDefinitions) || []
        const argDefNames = Array.isArray(argDefs)
            ? argDefs.map((a) => (a && typeof a.name === 'string' ? a.name : null)).filter(Boolean)
            : []
        const callerName = callerByGraphql[gqlName]
        const callerBody = callerName ? findModuleBody(bundles, callerName) : null
        const rawVarsShape = extractVarsShape(callerBody)
        const structuralVars = augmentWithArgDefs(rawVarsShape, argDefNames)
        const structuralResp = shapeFromSelections(op.operation && op.operation.selections)
        // Promote `null` leaves to inferred type tags. Collect bodies for
        // both directions: the primary caller (wrapper Job module that
        // invokes fetchQuery) PLUS up to 8 consumer modules that depend on
        // the wrapper. For inputs the wrapper often only does pass-through
        // (`fetchQuery(id, t)`), so the literal-object construction site
        // — where each field's value is visible — lives in the consumers.
        // For responses, consumers also see the pass-through response and
        // access server-side field names directly.
        const respBodies = [callerBody]
        const respPositions = [findFetchQueryPos(callerBody)]
        if (callerName) {
            const consumers = (dependents[callerName] || []).slice(0, 8)
            for (const c of consumers) {
                const cb = findModuleBody(bundles, c)
                if (cb) {
                    respBodies.push(cb)
                    respPositions.push(findFetchQueryPos(cb))
                }
            }
        }
        // Map of `<localVariableName> → <graphqlFieldName>` extracted from the
        // operation's selection args. When the GraphQL field name differs
        // from the local var name, treat the field name as a strong type
        // hint (e.g. `input → username` means `input` is a String).
        const varToField = collectVarToFieldMap(op.operation && op.operation.selections, {})
        // Callback: search ALL bundles for a method definition. Used by
        // fillInputTypes' deep-trace heuristic when a plural-noun input
        // (e.g. `metrics`) traces through opaque function calls to a
        // builder method (e.g. `getMetrics:function(){return[{id, type,
        // group_by}]}`) defined far from the wrapper's dep chain.
        const findMethod = (methodName) => findMethodImplementation(bundles, methodName)
        const variablesShape = fillInputTypes(structuralVars, respBodies, respPositions, null, null, 0, varToField, findMethod, sharedEnumIndex)
        const response = fillResponseTypes(structuralResp, respBodies)
        operations[opName] = {
            docId,
            operationKind: params.operationKind,
            variables: argDefNames,
            variablesShape,
            response
        }
        kept++
    }

    return {
        operations,
        diagnostics: {
            graphqlModulesDiscovered: graphqlModules.size,
            operationsKept: kept,
            operationsSkippedBiz: skipped,
            operationsUnparseable: unparseable,
            callerMatches: Object.keys(callerByGraphql).length
        }
    }
}

module.exports = { extractMex }
