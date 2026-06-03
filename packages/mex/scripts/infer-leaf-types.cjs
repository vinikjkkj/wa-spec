'use strict'

/**
 * Leaf-type inference for Mex variables + responses.
 *
 * The static extractor recovers the structural shape (keys + nesting +
 * plurality) but every scalar leaf comes back as `null` because Relay's
 * compiled output strips GraphQL scalar types. This module fills those leaves
 * by inspecting the caller Job's source.
 *
 * Strategy is pure-static, pattern-based, code-evidence-driven (no name
 * guessing — when there's no evidence we report 'unknown'):
 *
 *   INPUT side:
 *     Classify the RHS expression literal that's passed to fetchQuery's
 *     `{ key: <expr> }`. Literals + builtin-coercion calls + WA utility
 *     calls map cleanly to scalar types.
 *
 *   RESPONSE side:
 *     For each leaf field name on the response shape, grep the caller body
 *     for `.<fieldName>` accesses and classify by surrounding context:
 *       Number(...) / parseInt → 'string' (timestamp wire pattern)
 *       createWid(...)         → 'string' (JID wire pattern)
 *       === "X"  / case "X":   → 'enum:X|Y|Z'   (aggregated across hits)
 *       arithmetic / .length   → 'number'
 *       !x  / ternary cond     → 'boolean'      (weak)
 *
 * Output leaf tags (all strings, single-word):
 *   'string' | 'number' | 'boolean' | 'unknown'
 *   'enum:VAL1|VAL2|...'
 *
 * Objects/arrays in the shape tree are unchanged — only the `null` leaves
 * get replaced by tag strings.
 */

const { skipWs, skipExpr, skipString } = require('./parser.cjs')

// `\b` does not delimit minified identifiers that start/end with `$`. Use these
// `$`-aware boundaries instead of `\b` around an identifier. (escapeRegExp below
// handles escaping interpolated names.)
const LB = '(?<![\\w$])' // left identifier boundary (replaces a leading \b)
const RB = '(?![\\w$])' // right identifier boundary (replaces a trailing \b)

// ---------------------------------------------------------------- INPUT side
//
// Given a slice of source starting at the RHS of a key in a fetchQuery input
// literal, return a leaf tag. `traceIdent` resolves bare local identifiers
// back to their declarations within the same factory body (best-effort).

function classifyInputExpr(s, start, traceIdent) {
    let i = skipWs(s, start)
    const c = s[i]
    if (i >= s.length || c === ',' || c === '}' || c === ']') {
        return 'unknown'
    }

    // Grab the full RHS expression up to the next top-level separator so we
    // can scan for comparison/ternary patterns regardless of where they sit.
    // Stop also at `;` — without this, a tracer match like `n = e.attrString("value");`
    // followed by `t!=null&&n!=null` would absorb the `&&` of the next statement
    // and misclassify as boolean.
    const exprEnd = skipExpr(s, i, [',', '}', ']', ';'])
    const fullExpr = s.slice(i, exprEnd)

    // Check ternary BEFORE checking operators — the result of a ternary comes
    // from its branches, not from operators in its condition. E.g.
    // `m!=null?String(m):null` is `string|null`, NOT `boolean`. If branches
    // resolve to unknown we return unknown (not fall through to boolean —
    // the `===`/`!=` in the condition would otherwise misfire).
    const tern = splitTernary(fullExpr)
    if (tern) {
        const left = classifyInputExpr(tern.left, 0, traceIdent)
        const right = classifyInputExpr(tern.right, 0, traceIdent)
        // Merge enum branches — `cond ? "X" : "Y"` with UPPER_SNAKE literals
        // gives left=`enum:X`, right=`enum:Y`. Union the values.
        const leftIsEnum = typeof left === 'string' && left.startsWith('enum:')
        const rightIsEnum = typeof right === 'string' && right.startsWith('enum:')
        if (leftIsEnum && rightIsEnum) {
            const merged = new Set([...left.slice(5).split('|'), ...right.slice(5).split('|')])
            return 'enum:' + [...merged].sort().join('|')
        }
        // Enum + plain string → broaden to string (the other branch isn't
        // enum-valued, so the field isn't really a closed enum).
        if (leftIsEnum && right === 'string') return 'string'
        if (rightIsEnum && left === 'string') return 'string'
        // Original fallback: aggregate string literals if both branches were
        // 'string' (kept for backwards compat with non-UPPER_SNAKE cases).
        const lit = collectStringLiterals(tern.left).concat(collectStringLiterals(tern.right))
        if (lit.length >= 2 && left === 'string' && right === 'string') {
            const uniq = [...new Set(lit)].sort()
            return 'enum:' + uniq.join('|')
        }
        if (left === right && left !== 'unknown') return left
        if (left !== 'unknown') return left
        if (right !== 'unknown') return right
        return 'unknown'
    }

    // Coalesce operators (`||`, `??`) return the right-hand value when left is
    // falsy/nullish — NOT a boolean. E.g. `v || ""` is a string. Split on the
    // operator and classify the right branch (which is the fallback type).
    const coalesce = splitTopLevelOnOp(fullExpr, ['||', '??'])
    if (coalesce) {
        const left = classifyInputExpr(coalesce.left, 0, traceIdent)
        const right = classifyInputExpr(coalesce.right, 0, traceIdent)
        if (left !== 'unknown' && right !== 'unknown' && left === right) return left
        if (right !== 'unknown') return right
        if (left !== 'unknown') return left
        return 'unknown'
    }

    // Top-level comparison operators → boolean result (after we've ruled out
    // ternary and `||`/`??` coalesce). `&&` left as a comparison signal —
    // it's typically used in `<v> && <action>` boolean-context.
    if (hasTopLevelOp(fullExpr, /(?:===|!==|==(?!=)|!=(?!=)|>=|<=|>(?![=>])|<(?![=<])|&&|\binstanceof\b|\bin\b)/)) {
        return 'boolean'
    }

    // String literal. UPPER_SNAKE literals (e.g. `"INDIVIDUAL_NEW_CHAT_THREAD"`,
    // `"USER_INPUT"`, `"GUEST"`) are WA Mex's enum wire format — emit a
    // singleton enum tag so the consumer surfaces them as string-literal
    // unions in TypeScript. Non-enum-looking literals (free-form text,
    // arbitrary content) stay as `string`.
    if (c === '"' || c === "'" || c === '`') {
        // Extract just the literal content (handle simple escapes; refuses
        // template strings with `${...}`).
        if (c === '`' && fullExpr.includes('${')) return 'string'
        const lit = fullExpr.slice(1, -1)
        if (/^[A-Z][A-Z0-9_]{0,49}$/.test(lit)) return 'enum:' + lit
        return 'string'
    }

    // Numeric literal (incl. negative, decimal, exponent)
    if (/[0-9]/.test(c) || ((c === '-' || c === '+' || c === '.') && /[0-9]/.test(s[i + 1] || ''))) {
        return 'number'
    }

    // Unary boolean coercion: !x, !!x
    if (c === '!') return 'boolean'

    // Object / array literal — caller is passing a nested shape, treat as
    // structural (these get picked up by the existing object-shape parser).
    if (c === '{' || c === '[') return 'unknown'

    // Identifier — could be `true`, `false`, `null`, a local var, or the
    // head of a member/call chain.
    if (/[A-Za-z_$]/.test(c)) {
        let k = i
        while (k < s.length && /[\w$]/.test(s[k])) k++
        const ident = s.slice(i, k)

        // Look past whitespace for follow-on chars (., (, [).
        let n = k
        while (n < s.length && /\s/.test(s[n])) n++
        const next = s[n]

        if (next !== '.' && next !== '(' && next !== '[') {
            // bare identifier or keyword
            if (ident === 'true' || ident === 'false') return 'boolean'
            if (ident === 'null' || ident === 'undefined' || ident === 'void') return 'unknown'
            // Try to trace local declaration
            if (traceIdent) {
                const traced = traceIdent(ident)
                if (traced && traced !== 'unknown') return traced
            }
            return 'unknown'
        }

        // Member/call chain
        return classifyCallExpr(fullExpr.trim())
    }

    return 'unknown'
}

// True if `re` matches outside any (), [], {}, or string.
function hasTopLevelOp(s, re) {
    let dp = 0, db = 0, dbr = 0, i = 0
    while (i < s.length) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') { i = skipString(s, i); continue }
        if (c === '(') dp++
        else if (c === ')') dp--
        else if (c === '[') dbr++
        else if (c === ']') dbr--
        else if (c === '{') db++
        else if (c === '}') db--
        if (dp === 0 && db === 0 && dbr === 0) {
            re.lastIndex = i
            const m = re.exec(s)
            if (m && m.index === i) return true
        }
        i++
    }
    return false
}

// Split an expression on the FIRST top-level occurrence of an operator
// (passed as a list of literal operators). Returns {left, right, op} or null.
// Skips strings + balanced parens/brackets/braces.
function splitTopLevelOnOp(s, operators) {
    let dp = 0, db = 0, dbr = 0, i = 0
    while (i < s.length) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') { i = skipString(s, i); continue }
        if (c === '(') dp++
        else if (c === ')') dp--
        else if (c === '[') dbr++
        else if (c === ']') dbr--
        else if (c === '{') db++
        else if (c === '}') db--
        else if (dp === 0 && db === 0 && dbr === 0) {
            for (const op of operators) {
                if (s.startsWith(op, i)) {
                    return { left: s.slice(0, i), right: s.slice(i + op.length), op }
                }
            }
        }
        i++
    }
    return null
}

// Split a ternary `cond ? a : b` at top level. Returns {left, right} or null.
function splitTernary(s) {
    let dp = 0, db = 0, dbr = 0, i = 0, qPos = -1
    while (i < s.length) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') { i = skipString(s, i); continue }
        if (c === '(') dp++
        else if (c === ')') dp--
        else if (c === '[') dbr++
        else if (c === ']') dbr--
        else if (c === '{') db++
        else if (c === '}') db--
        else if (dp === 0 && db === 0 && dbr === 0) {
            if (c === '?' && s[i + 1] !== '.' && s[i + 1] !== '?') { qPos = i; break }
        }
        i++
    }
    if (qPos < 0) return null
    // Walk forward to matching `:` at same depth
    let j = qPos + 1
    dp = 0; db = 0; dbr = 0
    while (j < s.length) {
        const c = s[j]
        if (c === '"' || c === "'" || c === '`') { j = skipString(s, j); continue }
        if (c === '(') dp++
        else if (c === ')') dp--
        else if (c === '[') dbr++
        else if (c === ']') dbr--
        else if (c === '{') db++
        else if (c === '}') db--
        else if (c === '?' && dp === 0 && db === 0 && dbr === 0 && s[j + 1] !== '.' && s[j + 1] !== '?') {
            // nested ternary — skip its `:` too
            let nested = 1, k = j + 1
            while (k < s.length && nested > 0) {
                const cc = s[k]
                if (cc === '"' || cc === "'" || cc === '`') { k = skipString(s, k); continue }
                if (cc === '?' && s[k + 1] !== '.' && s[k + 1] !== '?') nested++
                else if (cc === ':') nested--
                k++
            }
            j = k
            continue
        } else if (c === ':' && dp === 0 && db === 0 && dbr === 0) {
            return { left: s.slice(qPos + 1, j), right: s.slice(j + 1) }
        }
        j++
    }
    return null
}

// Collect string literals at any depth in `s`.
function collectStringLiterals(s) {
    const out = []
    let i = 0
    while (i < s.length) {
        const c = s[i]
        if (c === '"' || c === "'") {
            const q = c
            i++
            const st = i
            while (i < s.length && s[i] !== q) {
                if (s[i] === '\\') i += 2
                else i++
            }
            out.push(s.slice(st, i))
            i++
            continue
        }
        if (c === '`') { i = skipString(s, i); continue }
        i++
    }
    return out
}

// Classify a call/member expression by callee name. Hits the common patterns
// used across WA Web Job files.
function classifyCallExpr(expr) {
    // Number coercion
    if (/^Number\s*\(/.test(expr)) return 'number'
    if (/^parseInt\s*\(/.test(expr)) return 'number'
    if (/^parseFloat\s*\(/.test(expr)) return 'number'
    if (/^Math\./.test(expr)) return 'number'
    if (/^Date\.now\s*\(/.test(expr)) return 'number'
    if (/^Number\.parseInt\s*\(/.test(expr)) return 'number'
    if (/^Number\.parseFloat\s*\(/.test(expr)) return 'number'
    // String coercion / construction
    if (/^String\s*\(/.test(expr)) return 'string'
    if (/^JSON\.stringify\s*\(/.test(expr)) return 'string'
    // Boolean coercion
    if (/^Boolean\s*\(/.test(expr)) return 'boolean'
    // Array constructors / methods returning arrays
    if (/^Array\.(from|of|isArray)\b/.test(expr)) return 'unknown' // structural, not a leaf
    // WA utility module patterns: o("WAFooUtils").bar(...)  /  n("WAFooUtils").bar
    const wa = expr.match(/^[a-z_$][\w$]*\s*\(\s*"(WA[A-Z][\w$]*)"\s*\)\s*\.\s*([\w$]+)/)
    if (wa) {
        const [, mod, fn] = wa
        if (/Jid|Wid/.test(mod)) return 'string'
        if (/Time|Clock|Timestamp/.test(mod)) return 'number'
        if (/Phone/.test(mod)) return 'string'
        // method-name signals
        if (/^(is|has|should|can|will)[A-Z_]/.test(fn)) return 'boolean'
        if (/(Enabled|Disabled|Active|Allowed|Available)$/.test(fn)) return 'boolean'
        if (/(Count|Size|Length|Limit|Ttl|Duration|Timeout|Number)$/.test(fn)) return 'number'
        if (/(Jid|Wid|Lid|Name|Url|Path|Text|Id|String|Hash|Hex|Base64|Email|Token|Key)$/.test(fn)) return 'string'
    }
    // chain-method signals: x.toString() / x.length / x.size
    if (/\.toString\s*\(\s*\)$/.test(expr)) return 'string'
    if (/\.(length|size)$/.test(expr)) return 'number'
    if (/\.(map|filter|slice|concat|flat|flatMap)\s*\(/.test(expr)) return 'unknown' // array, structural
    // last-resort name signals on the trailing member
    const tail = expr.match(/\.([\w$]+)\s*(\(|$)/g)
    if (tail) {
        const last = tail[tail.length - 1]
        const name = last.replace(/^\./, '').replace(/\s*\($/, '')
        if (/^(is|has|should|can)[A-Z_]/.test(name)) return 'boolean'
        if (/(Enabled|Disabled|Active|Allowed|Available)$/.test(name)) return 'boolean'
        if (/(Count|Size|Length|Limit|Ttl|Duration|Number)$/.test(name)) return 'number'
    }
    return 'unknown'
}

// Build a tracer that walks back through a body and tries to classify a
// bare local identifier by its declaration RHS. Conservative — only
// classifies if the declaration is a simple `var <id> = <RHS>` pattern
// before the call-site (offset `before`).
function makeInputTracer(body, before) {
    const sub = body.slice(0, before)
    // Scope window for single-char idents: walk back from `before` to the
    // nearest enclosing function header. Single-letter minifier idents
    // (`t`, `e`, `u`, ...) are reused across nested closures, so an
    // unbounded scan would conflate scopes (e.g. `t=n>0` in one closure
    // leaking `boolean` into a sibling). Within ONE function scope they're
    // safe to trace and often carry meaningful values — e.g.
    // `var u = isNewsletter(t) ? "JID" : "INVITE"` declares the enum source
    // for `type: u` in the same scope.
    const scopeStart = findEnclosingFunctionStart(sub)
    return function trace(ident) {
        // `=(?!=)` excludes `==` / `===` comparisons that look like
        // assignments (e.g. `t===void 0?null:t` matched `t=` and leaked
        // `==void 0...` as an RHS containing a top-level `==`).
        const re = new RegExp(`(?:var|let|const)?\\s*${LB}${escapeRegExp(ident)}\\s*=(?!=)\\s*`, 'g')
        const searchFrom = ident.length < 2 ? scopeStart : 0
        let dm
        let last = 'unknown'
        let hits = 0
        while ((dm = re.exec(sub))) {
            if (dm.index < searchFrom) continue
            const pos = dm.index + dm[0].length
            const tag = classifyInputExpr(sub, pos, null)
            if (tag !== 'unknown') {
                last = tag
                hits++
            }
        }
        // For single-char idents, require EXACTLY ONE non-unknown match to
        // avoid the cross-scope contamination the original bail-out guarded
        // against. Within the same function scope this is the typical case.
        if (ident.length < 2 && hits > 1) return 'unknown'
        return last
    }
}

// Find the nearest enclosing FUNCTION body start, walking backward from the
// end of `sub`. Returns the byte offset of the first byte inside the
// function body (just past its opening `{`).
//
// "Function body" is defined as: an unmatched `{` whose immediately
// preceding non-whitespace char is `)` (an arg list close), with either
// `function` or `=>` further back. We don't stop at nested object literals
// or control-flow blocks — those would be too tight (the call site is
// typically inside a nested object literal that's INSIDE the function body
// we want as our scope floor for single-letter idents).
function findEnclosingFunctionStart(sub) {
    let depth = 0
    for (let i = sub.length - 1; i >= 0; i--) {
        const c = sub[i]
        if (c === '}') depth++
        else if (c === '{') {
            if (depth > 0) {
                depth--
                continue
            }
            // Unmatched `{`. Check if it's a function body — look at what
            // precedes (after stripping whitespace) for `)` (arg list).
            let j = i - 1
            while (j >= 0 && /\s/.test(sub[j])) j--
            if (sub[j] === ')') {
                // Could be `function(args){`, `=>(...args){`, `method(args){`.
                // Accept all — single-letter trace inside this scope is safe.
                return i + 1
            }
            // Not a function body — continue looking outward.
            // (Stays at depth 0 so further `{` we encounter are also unmatched.)
        }
    }
    return 0
}

// ------------------------------------------------------------- RESPONSE side
//
// For each leaf field name in the response shape, scan the caller body for
// `.<name>` accesses and classify by surrounding usage.

// Window before/after each match used for pattern classification.
const CONTEXT_BEFORE = 80
const CONTEXT_AFTER = 60

function classifyResponseLeaf(body, fieldName, ctx, parent, isAmbiguous) {
    if (!body || !fieldName) return 'unknown'
    // GraphQL spec: __typename is always a String. Not a heuristic, an
    // invariant of the schema language itself.
    if (fieldName === '__typename') return 'string'
    // Path-qualified pattern: `\.<parent>(\b...).fieldName` — accesses where
    // the immediate parent matches. Using a {0,N}-char window keeps
    // optional-chain rewrites that interpose `?.` / `(.\..\?.)` / chained
    // null-checks reachable. When parent yields no evidence, fall back to
    // bare `.fieldName`.
    const enumValues = new Set()
    let saw = { number: 0, string: 0, boolean: 0, jid: 0 }
    const modelKeys = []
    let m

    if (parent) {
        // Build the set of identifiers that, in this body, refer to the
        // parent field — that's the literal parent name plus its aliases.
        const parentAliases = ctx ? ctx.aliasesFor(parent) : []
        const parentTokens = new Set([parent, ...parentAliases])
        let any = false
        for (const pt of parentTokens) {
            // Either `.parent.field` (member chain) or `<alias>.field` (bare
            // identifier when the alias is a local var).
            const isLocal = pt !== parent || parentAliases.length > 0
            const lead = pt === parent ? `\\.${escapeRegExp(pt)}${RB}` : `${LB}${escapeRegExp(pt)}${RB}`
            const pre = new RegExp(`${lead}[\\s\\S]{0,80}?\\.${escapeRegExp(fieldName)}${RB}`, 'g')
            while ((m = pre.exec(body))) {
                any = true
                const accessIdx = m.index + m[0].lastIndexOf('.' + fieldName)
                accumulateEvidence(body, accessIdx, fieldName.length + 1, saw, enumValues, ctx)
                collectSwitchCases(body, accessIdx + fieldName.length + 1, enumValues, saw)
                const k = surroundingClientKey(body, accessIdx)
                if (k) modelKeys.push(k)
            }
        }
        if (any && ctx) {
            // Once the field is path-confirmed, broaden alias walking — the
            // aliases of `state` (`ie`) carry the enum comparisons but their
            // declaration `ie=O.state` is parent-qualified through O, not
            // through `xwa2_group_query_by_id` directly. Skip single-char
            // aliases — minifier scope-shadowing makes them unreliable.
            const aliases = ctx.aliasesFor(fieldName)
            for (const alias of aliases) {
                if (alias.length < 2) continue
                const ar = new RegExp(`${LB}${escapeRegExp(alias)}${RB}`, 'g')
                let am
                while ((am = ar.exec(body))) {
                    if (ctx.isInsideInputRange && ctx.isInsideInputRange(am.index)) continue
                    accumulateEvidence(body, am.index, alias.length, saw, enumValues, ctx)
                    collectSwitchCases(body, am.index + alias.length, enumValues, saw)
                    const k = surroundingClientKey(body, am.index)
                    if (k) modelKeys.push(k)
                }
            }
        }
        if (any) {
            return finalizeClassification(saw, enumValues, modelKeys)
        }
        // Fall through to bare scan, but for ambiguous names enum evidence
        // will be discarded post-scan (see below) to avoid cross-leaf
        // contamination on common field names.
    }

    // Fallback: bare field-name scan (broader, may pick up sibling fields
    // with the same name — used only when path didn't match anywhere).
    // Skip accesses inside fetchQuery() arg lists — those are input-side
    // construction (e.g. `e.fetch.username === !0` is an input flag check,
    // NOT evidence about a response field also named `username`).
    const re = new RegExp(`\\.${escapeRegExp(fieldName)}${RB}`, 'g')
    while ((m = re.exec(body))) {
        if (ctx && ctx.isInsideInputRange && ctx.isInsideInputRange(m.index)) continue
        accumulateEvidence(body, m.index, fieldName.length + 1, saw, enumValues, ctx)
        collectSwitchCases(body, m.index + fieldName.length + 1, enumValues, saw)
        const k = surroundingClientKey(body, m.index)
        if (k) modelKeys.push(k)
    }
    if (ctx) {
        const aliases = ctx.aliasesFor(fieldName)
        for (const alias of aliases) {
            // Single-char aliases (`i`, `t`, `e`...) match too widely due to
            // minifier scope-shadowing — skip.
            if (alias.length < 2) continue
            const ar = new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'g')
            let am
            while ((am = ar.exec(body))) {
                if (ctx.isInsideInputRange && ctx.isInsideInputRange(am.index)) continue
                accumulateEvidence(body, am.index, alias.length, saw, enumValues, ctx)
                collectSwitchCases(body, am.index + alias.length, enumValues, saw)
                const k = surroundingClientKey(body, am.index)
                if (k) modelKeys.push(k)
            }
        }
    }

    // For ambiguous names with no path-qualified hit: discard enums (could
    // be leaking from a sibling). For scalars, a single STRONG hit suffices
    // (parseInt, createWid, switch-case, ===!0) — these don't false-fire
    // across siblings. Weak hits (if-test, .length, etc.) still need ≥2.
    if (isAmbiguous) {
        enumValues.clear()
        const strong = saw.strong || { string: 0, number: 0, boolean: 0, jid: 0 }
        const next = {
            string: strong.string >= 1 ? saw.string : saw.string >= 2 ? saw.string : 0,
            number: strong.number >= 1 ? saw.number : saw.number >= 2 ? saw.number : 0,
            boolean: strong.boolean >= 1 ? saw.boolean : saw.boolean >= 2 ? saw.boolean : 0,
            jid: strong.jid >= 1 ? saw.jid : saw.jid >= 2 ? saw.jid : 0
        }
        saw = next
    }
    return finalizeClassification(saw, enumValues, modelKeys)
}

function finalizeClassification(saw, enumValues, modelKeys) {
    if (enumValues.size > 0) {
        // Drop values that don't look like WA Mex wire enums (UPPER_SNAKE).
        // Lowercase literals like `"success"`, `"null"`, `"error"` typically
        // come from client-side wrapper objects matched in consumer bodies,
        // not from real wire enums. WA serializes GraphQL Enums as
        // SCREAMING_SNAKE_CASE on the wire.
        const filtered = [...enumValues].filter((v) => /^[A-Z][A-Z0-9_]{0,49}$/.test(v))
        if (filtered.length === 0) {
            // All values were client-side noise — fall through to scalar saw counts
        } else {
            const sorted = filtered.sort()
            if (sorted.length === 1 && (sorted[0] === 'TRUE' || sorted[0] === 'FALSE')) {
                return 'boolean'
            }
            return 'enum:' + sorted.join('|')
        }
    }
    if (saw.jid > 0) return 'string'
    if (saw.string > saw.number) return 'string'
    if (saw.number > 0) return 'number'
    if (saw.boolean > 0) return 'boolean'
    if (modelKeys.length > 0) {
        const fromName = clientNameToType(modelKeys)
        if (fromName) return fromName
    }
    return 'unknown'
}

// Walk backwards from a field-access offset to find the nearest `<key>:` that
// would be the client-model key receiving this expression. Honors object-
// literal context — won't pick up a key from a different sibling assignment.
function surroundingClientKey(body, idx) {
    let dp = 0, db = 0, dbr = 0
    let i = idx - 1
    while (i >= 0 && idx - i < 200) {
        const c = body[i]
        if (c === '"' || c === "'" || c === '`') {
            // walk back past string literal
            const q = c
            i--
            while (i >= 0 && body[i] !== q) {
                if (body[i - 1] === '\\') i--
                i--
            }
            i--
            continue
        }
        if (c === ')') dp++
        else if (c === '(') dp--
        else if (c === ']') dbr++
        else if (c === '[') dbr--
        else if (c === '}') db++
        else if (c === '{') db--
        else if (c === ',' && dp === 0 && db === 0 && dbr === 0) {
            // Reached the start of this object-property segment.
            // Look forward for `<key>:`.
            const seg = body.slice(i + 1, idx)
            const km = seg.match(/^\s*([A-Za-z_$][\w$]*)\s*:/)
            if (km) return km[1]
            return null
        }
        // Cross object-literal boundary — also valid (first property).
        if (c === '{' && dp === 0 && dbr === 0) {
            const seg = body.slice(i + 1, idx)
            const km = seg.match(/^\s*([A-Za-z_$][\w$]*)\s*:/)
            if (km) return km[1]
            return null
        }
        i--
    }
    return null
}

// Map an array of camelCase client-model key names to a leaf type, using
// strong WA Web naming conventions. Returns null if no convention matches.
function clientNameToType(keys) {
    // Score: each key votes for a type. Tie-break: string > number > boolean.
    const votes = { string: 0, number: 0, boolean: 0 }
    for (const k of keys) {
        const t = singleKeyToType(k)
        if (t) votes[t]++
    }
    if (votes.string === 0 && votes.number === 0 && votes.boolean === 0) return null
    if (votes.boolean > votes.string && votes.boolean > votes.number) return 'boolean'
    if (votes.number > votes.string && votes.number > votes.boolean) return 'number'
    return 'string'
}

// Curated invariants — applied only when no code evidence exists. These
// are GraphQL spec rules or WA Mex universal conventions, not free guessing.
//
//   GraphQL spec:
//     __typename  meta-field — always String!
//     id          ID scalar — serialized as string on the wire
//
//   WA addressing & wire conventions (universal across the schema):
//     *_jid|*_lid|*_wid|*_pn      addressing types — strings
//     *_url|*_uri | url | uri     URLs — strings
//     *_at|*_time|*_date|*_timestamp  timestamps — string on the wire
//                                     (64-bit numbers exceed JS safe-integer)
//     *_count|*_num|*_size        counters — numbers
//     direct_path                 WA media CDN path — string
//     last_status_server_id, *_server_id, *_msg_id  server-side ids — string
//
//   Money (WA uses BigDecimal-as-string for precision):
//     price, currency, *_price, *_currency, currency_code — strings
//
//   Errors / status codes:
//     error_message, *_error_message  — string
//     error_code                      — number (HTTP-style)
//
//   Contact / locale (always strings in WA):
//     email, *_email, phone, phone_number, *_phone     — strings
//     locale, language, lang, country_code, *_country_code,
//     country_code_origin                              — strings
//
//   Free-form identity strings (WA Mex universals):
//     display_name, handle, invite                     — strings
function schemaInvariantType(fieldName) {
    // GraphQL spec — ID scalar applies to all `*_id` fields too
    if (fieldName === '__typename') return 'string'
    if (fieldName === 'id' || /_id$/.test(fieldName)) return 'string'
    // Canonical English boolean prefixes — `is_*`/`has_*`/`can_*`/`should_*`/
    // `did_*` are unambiguous (no realistic non-boolean field starts with these).
    if (/^(?:is|has|can|should|did|are|was|were|will)_/.test(fieldName)) return 'boolean'
    // Boolean suffixes
    if (/_(?:enabled|disabled|active|allowed|blocked|hidden|visible|locked|required|optional|verified|deleted|archived|muted|pinned|starred)$/.test(fieldName)) return 'boolean'
    if (fieldName === 'success' || fieldName === 'error') return 'boolean'
    // GraphQL Relay pagination spec — universal across Connection types
    if (fieldName === 'hasNextPage' || fieldName === 'hasPreviousPage') return 'boolean'
    if (fieldName === 'startCursor' || fieldName === 'endCursor' || fieldName === 'cursor' || /_cursor$/.test(fieldName)) return 'string'
    if (fieldName === 'before' || fieldName === 'after') return 'string'
    if (fieldName === 'first' || fieldName === 'last') return 'number'
    // WA addressing — snake_case suffix, camelCase suffix, AND standalone forms
    if (/_(?:jid|lid|wid|pn)$/.test(fieldName)) return 'string'
    if (/(?:Jid|Lid|Wid|Pn)$/.test(fieldName)) return 'string'
    if (/^(?:jid|lid|wid|pn)$/.test(fieldName)) return 'string'
    // URLs
    if (/^(?:url|uri)$/.test(fieldName) || /_(?:url|uri)$/.test(fieldName)) return 'string'
    // Timestamps
    if (/_(?:at|time|date|timestamp)$/.test(fieldName)) return 'string'
    // WA-specific big counters: BigDecimal-as-string for precision (wire
    // confirmed: `subscribers_count: "232654682"` for the WhatsApp official
    // channel). Smaller cardinality counts (`admin_count`, `total_participants_count`)
    // stay number under the generic `*_count` rule below.
    if (fieldName === 'subscribers_count' || /^subscribers_count$/.test(fieldName)) return 'string'
    // Counters & dimensional quantities
    if (/_(?:count|num|size)$/.test(fieldName)) return 'number'
    // Time / byte / size unit suffixes — always number
    if (/_(?:seconds?|secs?|millis|ms|us|nanos|ns|bytes|kb|mb|gb|days?|hours?|minutes?|mins?|weeks?|months?|years?)$/.test(fieldName)) return 'number'
    // Bound / range numeric suffixes (Ads/insights metrics — `_lower_bound`,
    // `_upper_bound`, plain `_bound`)
    if (/_(?:bound|min|max|avg|sum|total|delta|rate)$/.test(fieldName)) return 'number'
    // `max_*` / `min_*` prefix — number
    if (/^(?:max|min)_/.test(fieldName)) return 'number'
    // Geo
    if (fieldName === 'latitude' || fieldName === 'longitude' || fieldName === 'lat' || fieldName === 'lng' || fieldName === 'lon') return 'number'
    if (/^(?:postalcode|stateprovince|streetaddress|countrycode)$/.test(fieldName)) return 'string'
    // WA-specific opaque IDs / paths / hashes
    if (fieldName === 'direct_path' || fieldName === 'path') return 'string'
    if (/_server_id$|_msg_id$|_fbid$/.test(fieldName) || fieldName === 'last_status_server_id') return 'string'
    if (fieldName === 'dhash' || fieldName === 'phash' || /_dhash$|_phash$/.test(fieldName)) return 'string'
    if (fieldName === 'query' || fieldName === 'query_context' || fieldName === 'context') return 'string'
    if (fieldName === 'entry_point') return 'string'
    if (fieldName === 'encrypted_logging_data' || fieldName === 'direct_connection_encrypted_info') return 'string'
    // Money
    if (fieldName === 'price' || /_price$/.test(fieldName)) return 'string'
    if (fieldName === 'currency' || fieldName === 'currency_code' || /_currency(?:_code)?$/.test(fieldName)) return 'string'
    // Errors
    if (fieldName === 'error_message' || /_error_message$/.test(fieldName)) return 'string'
    if (fieldName === 'error_code') return 'number'
    // Contact / locale
    if (fieldName === 'email' || /_email$/.test(fieldName)) return 'string'
    if (fieldName === 'phone' || fieldName === 'phone_number' || /_phone(?:_number)?$/.test(fieldName)) return 'string'
    if (fieldName === 'locale' || fieldName === 'language' || fieldName === 'lang') return 'string'
    if (fieldName === 'country_code' || /_country_code$|_country_code_origin$/.test(fieldName) || fieldName === 'country_code_origin') return 'string'
    // Identity strings (WA universals)
    if (fieldName === 'display_name' || fieldName === 'handle' || fieldName === 'invite') return 'string'
    // Generic single-word string fields ubiquitous in WA Mex schemas:
    //   code     — invite/auth codes
    //   nonce    — crypto/auth nonces
    //   algorithm — crypto algorithm identifier
    //   tag      — auth tag / generic tag
    //   data     — encrypted/encoded data blob
    //   receiver — JID/LID recipient (always string)
    //   pin      — short PIN code
    //   key      — generic key (string-like)
    if (/^(?:code|nonce|algorithm|tag|data|receiver|pin|reserved|symbol|website|website_url|center|coordinates|gridref)$/.test(fieldName)) return 'string'
    // Boolean conventions specific to WA Mex
    if (/^server_(?:send|enable|disable|allow)_/.test(fieldName)) return 'boolean'
    if (fieldName === 'is_registered' || /^is_/.test(fieldName)) return 'boolean'
    // Predicate-shape names — `passes_*`, `allow_*`, `closed_*`, `client_side_*`
    // typically descriptive booleans in WA Mex filter/group/promotion schemas.
    if (/^(?:passes_|allow_|closed_by_|client_side_)/.test(fieldName)) return 'boolean'
    // WA group property flags that don't follow a regular boolean morphology:
    //   announcement, capi, support, hidden_group, group_safety_check,
    //   participant_label_enabled, etc.
    if (/^(?:announcement|capi|support|hidden_group|group_safety_check|incognito|no_frequently_forwarded|allow_admin_reports|allow_non_admin_sub_group_creation|closed_by_membership_approval_mode|general_chat|default_subgroup|growth_locked|auto_add_disabled|participant_label_enabled|limit_sharing_enabled|locked|appeal_update_time)$/.test(fieldName)) return 'boolean'
    // Strings: sensitive_string_value is the WA crypto-wrapped string envelope
    if (fieldName === 'sensitive_string_value') return 'string'
    if (fieldName === 'cipher_suite') return 'string'
    if (fieldName === 'accessibility_text_for_image' || /accessibility_text/.test(fieldName)) return 'string'
    if (fieldName === 'entry_point_or_experience' || /_or_experience$/.test(fieldName)) return 'string'
    if (fieldName === 'session_cookies' || fieldName === 'email_attr') return 'string'
    // FB-related identifiers — page IDs, ad IDs, experiment groups (all strings)
    if (fieldName === 'pageId' || fieldName === 'page_id' || /Id$|_id$/.test(fieldName)) return 'string'
    if (fieldName === 'expt_group' || fieldName === 'experiment_group') return 'string'
    // Crypto / signed payload single-letter or short components
    if (/^(?:c|s|r|q|p|m|k|n)$/.test(fieldName)) return 'string'
    if (fieldName === 'issue_element' || fieldName === 'request_proof') return 'string'
    // Ads metric / currency amounts
    if (/^(?:lifetime_budget|daily_budget|min_bid|max_bid|currency_value|amount_value)$/.test(fieldName)) return 'string'
    // Ads insights metrics — always numbers
    if (/^(?:actions|bid|impressions|reach|spend|clicks|conversions|ctr|cpc|cpm|frequency)$/.test(fieldName)) return 'number'
    // Status / availability — usually enum string
    if (fieldName === 'availability' || fieldName === 'subscriptionType' || fieldName === 'tier') return 'string'
    // Standalone descriptive strings
    if (/^(?:entity_type_custom|ctwa_3pd_conversion_metadata|encrypted_logging_data|direct_connection_encrypted_info|log_eligibility_waterfall|view|tag|telemetry|hint|tip|reason|description|short_description|long_description|short_name|long_name|full_name|filter_name|filter_value|filter_result|product_availability|reference_number)$/.test(fieldName)) return 'string'
    // PEM-encoded crypto material — string
    if (/_pem$|_certificate_pem$|_certificate$/.test(fieldName)) return 'string'
    // WA Crypto Waffle key material — base64-encoded strings
    if (/^purpose_(?:public|dummy|private)_/.test(fieldName) || /_ek$|_ik$|_ik_sig$|_ik_enc_certificate$|_ciphertext$|_nonce$|_key$|_iv$|_hmac$|_signature$|_proof$/.test(fieldName)) return 'string'
    // Meta internal Waffle service fields — all opaque base64/string blobs.
    if (/^waffle_/.test(fieldName)) return 'string'
    // UpdateTextStatus / similar mutation result fields — string (often enum).
    if (fieldName === 'result' || fieldName === 'response') return 'string'
    // `value` is genuinely polymorphic across the schema (sometimes enum,
    // sometimes string content, sometimes number), but as a LAST resort
    // default to string — that's the most common case (settings.value,
    // properties.value, etc). Wire overrides will refine where we have data.
    if (fieldName === 'value') return 'string'
    // URI / URL / path suffix variants (camelCase too)
    if (/(?:Uri|Url|Path)$/.test(fieldName)) return 'string'
    if (/_direct_path$/.test(fieldName)) return 'string'
    // Workflow / origin / pipeline descriptor names
    if (/_origin_workflow$|_origin_legal_basis$|_workflow$|_pipeline$/.test(fieldName)) return 'string'
    // Result / status fields when not yet enum-classified
    if (/^(?:eligibility_result|invite_code|reaction_code|order_status)$/.test(fieldName)) return 'string'
    // Common WA flags missed by the boolean heuristics
    if (/^(?:enabled|disabled|active|visible|hidden|required|optional|verified|previewable|posing_as_professional|lifetime_native_ctwa_advertiser|webclient_l90_ad_creator|edit_wa_web_biz_profile)$/.test(fieldName)) return 'boolean'
    // Top-level mutation result fields named `xwa2_<verb>_*` / `xfb_*_<verb>_*`
    // that have no nested shape are usually boolean acks (success/failure).
    if (/^(?:xwa2|xfb|xwa)_.+_(?:clear|submit|delete|reset|cancel|disable|enable|opt_out|opt_in|set|unset|approve|reject|create|update|edit|publish|unpublish|log|notify|invalidate)(?:_.+)?$/.test(fieldName)) return 'boolean'
    if (fieldName === 'xwa2_request_client_logs_for_bug' || fieldName === 'xfb_wa_biz_clear_oidc_preference') return 'boolean'

    // Tier C — natural-language content fields. These are conventions, not
    // schema invariants: e.g. some `name` field somewhere could in theory be
    // an object, and `status` / `type` are commonly GraphQL Enums (still
    // string-serialized but with finite value sets that we don't recover
    // here). Treating them as `string` is a precision-vs-coverage tradeoff
    // — we get type at the cost of losing potential enum literal types.
    const tierC_string_exact = /^(?:name|text|description|caption|subject|title|label|message|body|content|summary|headline|subtitle|explanation|overview|disclaimer|note|comment|feedback|hint|tip|reason|source|status|type|kind|mode|state|category|verification|clause_type|filter_result|product_availability|compliance_category|street|street1|street2|address|city|zip|postal_code|country|color|signature|secret|token|key|hash|word|tag|format|method|class|sender|filename|mimetype|extension|importer_name|belongs_to|landline_number|mobile_number|description_text|abstract|excerpt|kicker|byline|region|role|timestamp|jpeg_thumbnail|thumbnail|start|end|username|handle|invite|old|new|flow|asset_handle|debug_info|status_details|public_key|public_key_certificate_pem|public_key_pem|signed_challenge|result_code|response_code|webEntryPointRedirectionUri|profile_pic_direct_path)$/
    if (tierC_string_exact.test(fieldName)) return 'string'
    const tierC_string_suffix = /_(?:name|text|description|caption|subject|title|label|message|body|content|summary|headline|subtitle|explanation|overview|disclaimer|note|comment|reason|source|status|type|kind|mode|state|category|color|signature|secret|token|key|hash|word|tag|format|method|class|sender|filename|mimetype|extension|thumbnail|region|role)$/
    if (tierC_string_suffix.test(fieldName)) return 'string'
    // Number conventions
    if (/^(?:width|height|length|depth|offset|limit|index|score|rank|priority|amount|total|max|min|capacity|quantity|duration|ttl|timeout|version|page|page_size)$/.test(fieldName)) return 'number'
    if (/_(?:width|height|length|depth|offset|limit|index|score|rank|priority|amount|total|max|min|capacity|quantity|duration|ttl|timeout|version|page|page_size)$/.test(fieldName)) return 'number'
    return null
}

function singleKeyToType(name) {
    // Boolean signals (highest priority — these names are unambiguously bool)
    if (/^(?:is|has|should|can|will|did|does|are|was|were)[A-Z_]/.test(name)) return 'boolean'
    // Suffix-based booleans — only the unambiguous ones. NOT included:
    //   `Available` (ambiguous: `maxAvailable` is quantity, not bool)
    //   `Allowed`   (ambiguous: `peopleAllowed` could be count)
    //   `Match`     (ambiguous: `bestMatch` could be string)
    if (/(?:Enabled|Disabled|Visible|Hidden|Locked|Pinned|Starred|Muted|Archived|Online|Offline|Required)$/.test(name)) return 'boolean'
    // Number signals
    if (/(?:Count|Num|Size|Length|Width|Height|Limit|Offset|Index|Score|Rank|Priority|Quantity|Total|Max|Min|Capacity|Version|Ttl|Duration|Timeout)$/.test(name)) return 'number'
    if (/^(?:count|size|length|width|height|limit|offset|index|score|rank|priority|quantity|total|max|min|capacity|version|ttl|duration|timeout)$/.test(name)) return 'number'
    // String signals
    if (/(?:Id|Jid|Lid|Wid|Pn|Url|Uri|Path|Name|Text|Caption|Title|Description|Subject|Label|Message|Body|Content|Key|Token|Hash|Base64|Email|Phone|Locale|Code|Color|Country|City|State|Address|Handle|Username|Signature|Sender|FileName|MimeType|Extension|Word|Tag)$/.test(name)) return 'string'
    if (/^(?:id|jid|lid|wid|pn|url|uri|path|name|text|caption|title|description|subject|label|message|body|content|key|token|hash|base64|email|phone|locale|code|color|country|city|state|address|handle|username|signature|sender|filename|mimetype|extension|word|tag)$/.test(name)) return 'string'
    return null
}

// If the immediately following text is `)` that closes a `switch(...)`, parse
// the switch body and collect every `case "X":` literal.
function collectSwitchCases(body, afterIdx, enumValues, saw) {
    // Walk forward over `)` / whitespace to find `{`
    let i = afterIdx
    let parenClose = 0
    while (i < body.length && (body[i] === ')' || /\s/.test(body[i]))) {
        if (body[i] === ')') parenClose++
        i++
    }
    if (parenClose === 0 || body[i] !== '{') return
    // Verify we came out of a `switch(...)` — scan backward from afterIdx
    // skipping any matched parens.
    let depth = parenClose
    let j = afterIdx - 1
    while (j >= 0 && depth > 0) {
        const c = body[j]
        if (c === ')') depth++
        else if (c === '(') depth--
        j--
    }
    // j now sits just before the opening `(` of the outermost paren — check
    // for `switch` keyword right before (skip whitespace).
    while (j >= 0 && /\s/.test(body[j])) j--
    if (body.slice(Math.max(0, j - 5), j + 1) !== 'switch') return
    // Find matching `}` of the switch body
    let k = i + 1
    let dp = 1
    while (k < body.length && dp > 0) {
        const c = body[k]
        if (c === '"' || c === "'" || c === '`') { k = skipString(body, k); continue }
        if (c === '{') dp++
        else if (c === '}') dp--
        k++
    }
    const switchBody = body.slice(i + 1, k - 1)
    const caseRe = /\bcase\s*"([^"]+)"\s*:/g
    let cm
    while ((cm = caseRe.exec(switchBody))) {
        enumValues.add(cm[1])
        saw.string++
    }
}

// Inspect a single usage site (offset = idx, length = len) and record
// evidence into `saw` / `enumValues`.
function accumulateEvidence(body, idx, len, saw, enumValues, ctx) {
    const start = Math.max(0, idx - CONTEXT_BEFORE)
    const end = Math.min(body.length, idx + len + CONTEXT_AFTER)
    const before = body.slice(start, idx)
    const after = body.slice(idx + len, end)
    const selfText = body.slice(idx, idx + len)
    const tail = selfText.match(/[A-Za-z_$][\w$]*$/)
    const selfIdent = tail ? tail[0] : null
    // Track high-confidence hits separately so ambiguous-field disambiguation
    // can accept a single strong signal (parseInt, createWid, switch-case)
    // without requiring corroboration from weaker signals.
    saw.strong = saw.strong || { string: 0, number: 0, boolean: 0, jid: 0 }

    // String-coercion patterns (wire is string, client coerces): Number / parseInt
    if (/\bNumber\s*\(\s*[^)]*$/.test(before)) { saw.string++; saw.strong.string++ }
    else if (/\bNumber\.parseInt\s*\(\s*[^)]*$/.test(before)) { saw.string++; saw.strong.string++ }
    else if (/\bparseInt\s*\(\s*[^)]*$/.test(before)) { saw.string++; saw.strong.string++ }
    else if (/\bparseFloat\s*\(\s*[^)]*$/.test(before)) { saw.string++; saw.strong.string++ }

    // JID wrapping (createWid / WidFactory)
    if (/createWid\s*\(\s*[^)]*$/.test(before) || /WidFactory[^,)]*$/.test(before)) {
        saw.jid++; saw.strong.jid++
    }

    // Allow up to 4 closing parens (minified optional-chain ternaries close
    // several `)`s before reaching the comparison): `).field)===m`, etc.
    const opLead = '^\\s*\\)*\\s*'

    // Equality with string literal → enum
    const eqRight = after.match(new RegExp(opLead + '(?:===|!==|==|!=)\\s*"([^"]+)"'))
    if (eqRight) {
        enumValues.add(eqRight[1])
        saw.string++; saw.strong.string++
    }
    const eqLeft = before.match(/"([^"]+)"\s*(?:===|!==|==|!=)\s*\(*\s*$/)
    if (eqLeft) {
        enumValues.add(eqLeft[1])
        saw.string++; saw.strong.string++
    }
    // Equality with a constant-object property or bare-ident-bound literal.
    if (ctx) {
        const refRight = after.match(new RegExp(opLead + '(?:===|!==|==|!=)\\s*([A-Za-z_$][\\w$]*)\\.([A-Za-z_$][\\w$]*)'))
        if (refRight) {
            const v = ctx.resolveConst(refRight[1], refRight[2])
            if (typeof v === 'string') {
                enumValues.add(v)
                saw.string++
            }
        }
        const refLeft = before.match(/([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*(?:===|!==|==|!=)\s*\(*\s*$/)
        if (refLeft) {
            const v = ctx.resolveConst(refLeft[1], refLeft[2])
            if (typeof v === 'string') {
                enumValues.add(v)
                saw.string++
            }
        }
        const identRight = after.match(new RegExp(opLead + '(?:===|!==|==|!=)\\s*([a-z_$][\\w$]*)\\b'))
        if (identRight) {
            const v = ctx.resolveIdent(identRight[1])
            if (typeof v === 'string') {
                enumValues.add(v)
                saw.string++
            }
        }
    }

    // case "X":
    const cm = after.match(/^\s*\)*\s*case\s*"([^"]+)"\s*:/)
    if (cm) {
        enumValues.add(cm[1])
        saw.string++; saw.strong.string++
    }

    // Numeric operations
    if (/^\s*\)*\s*(?:\+|-|\*|\/|%|>|<|>=|<=)\s*[0-9]/.test(after)) saw.number++
    // Number method tail: .toFixed(), .toExponential()
    if (/^\s*\.(toFixed|toExponential|toPrecision)\s*\(/.test(after)) saw.number++
    // `.length` and `.size` indicate the access is on a STRING (or array/Map),
    // NOT a number — the result of `.length` is number, but the leaf itself
    // is string/array. Count as string evidence.
    if (/^\s*\.(length|size)\b/.test(after)) saw.string++

    // String method tails
    if (/^\s*\.(toLowerCase|toUpperCase|startsWith|endsWith|includes|indexOf|lastIndexOf|trim|trimStart|trimEnd|padStart|padEnd|replace|replaceAll|split|substring|substr|charAt|charCodeAt|normalize)\s*\(/.test(after)) {
        saw.string++
    }

    // new Date(<v>) / new URL(<v>) / decodeURIComponent(<v>) / encodeURIComponent(<v>)
    if (/\b(?:new\s+(?:Date|URL|URLSearchParams)|decodeURIComponent|encodeURIComponent|atob|btoa|JSON\.parse)\s*\(\s*[^)]*$/.test(before)) {
        saw.string++
    }

    // Array iteration / methods on the value → confirms array (we already
    // know structurally — these don't change the leaf, but count as evidence
    // that it's NOT a scalar). Skip recording as boolean/string/number.

    // `if (<v>)` / `?<v>:` / `<v>?<a>:<b>` (used as a truthy test) → boolean
    // Only count if not paired with a comparison (those already counted).
    if (/\bif\s*\(\s*$/.test(before) && /^\s*\)/.test(after)) saw.boolean++
    if (/^\s*\?[^.?]/.test(after) && !/[=<>!]$/.test(before)) saw.boolean++

    // Boolean — nullable-boolean coalesce patterns: require the SAME
    // identifier on both sides of `&&` (otherwise it's just a null guard).
    if (selfIdent) {
        const tail = new RegExp('^\\s*\\)*\\s*[!=]=\\s*null\\s*&&\\s*' + escapeRegExp(selfIdent) + RB)
        if (tail.test(after)) { saw.boolean++; saw.strong.boolean++ }
        const head = new RegExp('null\\s*[!=]=\\s*$')
        const follow = new RegExp('^\\s*&&\\s*' + escapeRegExp(selfIdent) + RB)
        if (head.test(before) && follow.test(after)) { saw.boolean++; saw.strong.boolean++ }
    }
    // Boolean — explicit `===!0` / `===!1` / `===true` / `===false`
    if (new RegExp(opLead + '(?:===|!==|==|!=)\\s*(?:!0|!1|true|false)\\b').test(after)) {
        saw.boolean++; saw.strong.boolean++
    }
    if (/(?:!0|!1|true|false)\s*(?:===|!==|==|!=)\s*\(*\s*$/.test(before)) {
        saw.boolean++; saw.strong.boolean++
    }
    // Boolean — `!<v>` immediately before with `&&` / `||` / `?` after.
    if ((/!\s*$/.test(before) || /!\s*\(\s*[^)]*$/.test(before)) && /^\s*(\?|\)|&&|\|\|)/.test(after)) {
        saw.boolean++
    }
}

function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Build a context object for the caller body, capturing:
//   - aliases: localIdent → originating responseField (transitively through
//     `var x = y` chains)
//   - constants: ObjName.Prop → "literal-string", and  ident → "literal-string"
//   - inputRanges: byte ranges inside fetchQuery(.,..) / commitMutation(.,..) /
//     dispatchMexQuery(...{variables}...) arguments. Accesses INSIDE these are
//     input-construction (`e.fetch.username === !0`), NOT response handling,
//     and must not contribute response-field evidence.
// Both fuel enum recovery through minified rebinds.
function buildBodyContext(body) {
    if (!body) return null

    // Aliases: var X = something.field  /  X = something.field
    //          var X = Y                  (transitive)
    // Also handle `var a,b,c,d=...` lists by anchoring on each `\b<id>=` pair.
    const aliasField = Object.create(null)      // ident → fieldName
    const aliasIdent = Object.create(null)      // ident → ident (transitive)
    const aliasParents = Object.create(null)    // ident → [parent fields in chain]
    // Match `<lhs>=<expr>.<f1>.<f2>...<fN>` and bind <lhs> → <fN> (the trailing
    // field segment — that's what the alias actually carries). Identifier
    // case is mixed in WA's minifier.
    const fieldChainRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*((?:\??\.[a-z_$][\w$]+)+)/g
    let m
    while ((m = fieldChainRe.exec(body))) {
        const parts = m[2].split(/\?\.|\./).filter(Boolean)
        if (parts.length > 0) {
            aliasField[m[1]] = parts[parts.length - 1]
            if (parts.length > 1) aliasParents[m[1]] = parts.slice(0, -1)
        }
    }
    // Iteration callbacks: `<expr>.<arrField>.forEach(function(<id>){...})`,
    // `.map(function(<id>){...})`, `for(<...> of <expr>.<arrField>){...}`.
    // The callback param <id> aliases items of <arrField> — and since the
    // shape models the array via [item], any field accessed on <id> is a
    // field of <arrField>'s item type. So <id> aliases the array name itself.
    const iterRe = /(?<![\w$])([A-Za-z_$][\w$]*)(?:\??\.[a-z_$][\w$]+)*?(?:\??\.|\.)([a-z_$][\w$]+)\s*\.(?:forEach|map|filter|reduce|find|findIndex|some|every|flatMap)\s*\(\s*(?:function\s*)?\(?\s*([A-Za-z_$][\w$]*)/g
    while ((m = iterRe.exec(body))) {
        const arrField = m[2]
        const callbackParam = m[3]
        if (callbackParam && callbackParam !== 'function') {
            aliasField[callbackParam] = arrField
            // The callback param IS an item, so accesses on it are sibling
            // fields of arrField's items.
        }
    }
    // for-of: `for(var <id> of <expr>.<arrField>){...}`
    const forOfRe = /\bfor\s*\(\s*(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s+of\s+[A-Za-z_$][\w$]*(?:\??\.[a-z_$][\w$]+)*?(?:\??\.|\.)([a-z_$][\w$]+)/g
    while ((m = forOfRe.exec(body))) {
        aliasField[m[1]] = m[2]
    }
    // Also: minifier rewrites `X = expr?.field` as one of:
    //   X = null==(<i>=expr)?void 0:<i>.field
    //   X = (<i>=expr)==null?void 0:<i>.field
    //   X = null==(<i>=a)||null==(<i>=<i>.b)?void 0:<i>.field
    //   X = (<i>=a)==null||(<i>=<i>.b)==null?void 0:<i>.field
    // Anchor on the `:` that introduces the final access expression.
    const ternRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*[^,;{}]*?(?:null\s*==|==\s*null)[^,;{}]*?:\s*[A-Za-z_$][\w$]*(?:\?\.|\.)([a-z_$][\w$]*)(?![\w$])/g
    while ((m = ternRe.exec(body))) {
        if (!aliasField[m[1]]) aliasField[m[1]] = m[2]
    }
    const identRe = /(?<![\w$])([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)(?![\w$])(?!\s*[.(?])/g
    while ((m = identRe.exec(body))) {
        if (m[1] !== m[2]) aliasIdent[m[1]] = m[2]
    }
    // Resolve transitive ident chains down to field aliases
    for (const key of Object.keys(aliasIdent)) {
        let cur = aliasIdent[key]
        const seen = new Set([key, cur])
        while (aliasIdent[cur] && !seen.has(aliasIdent[cur])) {
            cur = aliasIdent[cur]
            seen.add(cur)
        }
        if (aliasField[cur]) aliasField[key] = aliasField[cur]
    }

    // Inverse: fieldName → [aliases]
    const aliasesByField = Object.create(null)
    for (const [ident, field] of Object.entries(aliasField)) {
        ;(aliasesByField[field] = aliasesByField[field] || []).push(ident)
    }

    // Constants: var X = {KEY1:"v1",KEY2:"v2"}  — capture the literal map
    const constObj = Object.create(null)        // objName → { key → string }
    const objRe = /\b(?:var|let|const)?\s*([A-Z][\w$]*)\s*=\s*\{([^{}]{1,1000})\}/g
    while ((m = objRe.exec(body))) {
        const name = m[1]
        const inner = m[2]
        const map = Object.create(null)
        let any = false
        const pairRe = /([A-Z_][\w$]*)\s*:\s*"([^"]+)"/g
        let pm
        while ((pm = pairRe.exec(inner))) {
            map[pm[1]] = pm[2]
            any = true
        }
        if (any) constObj[name] = map
    }

    // Single-string ident bindings: var m = "LID"
    const constIdent = Object.create(null)      // ident → string
    const sRe = /\b(?:var|let|const)?\s*([a-z_$][\w$]*)\s*=\s*"([^"]{1,80})"/g
    while ((m = sRe.exec(body))) {
        constIdent[m[1]] = m[2]
    }

    // Build ranges that cover fetchQuery / commitMutation / dispatchMexQuery
    // argument lists. Accesses inside these ranges are input-construction,
    // not response handling, so the response classifier must skip them.
    const inputRanges = []
    const fqRe = /\.(?:fetchQuery|commitMutation|fetchSubscription|dispatchMexQuery|sendMexIq)\s*\(/g
    while ((m = fqRe.exec(body))) {
        const openIdx = m.index + m[0].length - 1
        // Walk to matching `)`
        let i = openIdx + 1
        let dp = 1
        while (i < body.length && dp > 0) {
            const c = body[i]
            if (c === '"' || c === "'" || c === '`') {
                const q = c
                i++
                while (i < body.length && body[i] !== q) {
                    if (body[i] === '\\') i++
                    i++
                }
            } else if (c === '(') dp++
            else if (c === ')') dp--
            i++
        }
        inputRanges.push([openIdx, i])
    }

    return {
        aliasParents,
        aliasesFor(field) {
            return aliasesByField[field] || []
        },
        resolveConst(objName, prop) {
            return constObj[objName] && constObj[objName][prop]
        },
        resolveIdent(name) {
            return constIdent[name]
        },
        isInsideInputRange(idx) {
            for (const [a, b] of inputRanges) if (idx >= a && idx < b) return true
            return false
        }
    }
}

// Walk a response shape tree and replace each `null` leaf with an inferred
// tag. `bodies` may be a single string (legacy) or an array of bodies; when
// multiple bodies are given they're all considered evidence sources and the
// strongest classification wins.
function fillResponseTypes(shape, bodies, ctx) {
    const arr = Array.isArray(bodies) ? bodies : [bodies]
    const ctxs = arr.map((b) => buildBodyContext(b))
    const ambiguous = collectAmbiguousNames(shape)
    return fillResponseTypesInner(shape, arr, ctxs, [], ambiguous)
}

// Walk the shape and return the set of leaf field names that appear at >1
// distinct paths — those need path-qualified evidence, bare scan would mix
// siblings.
function collectAmbiguousNames(shape) {
    const counts = Object.create(null)
    function walk(node) {
        if (!node || typeof node !== 'object') return
        if (Array.isArray(node)) return walk(node[0])
        for (const [k, v] of Object.entries(node)) {
            if (v === null) counts[k] = (counts[k] || 0) + 1
            else walk(v)
        }
    }
    walk(shape)
    const out = new Set()
    for (const [k, n] of Object.entries(counts)) {
        if (n > 1) out.add(k)
    }
    return out
}

function classifyAcrossBodies(bodies, ctxs, fieldName, parents, isAmbiguous) {
    const parent = parents && parents.length > 0 ? parents[parents.length - 1] : null
    let best = 'unknown'
    let enumAcc = null
    for (let i = 0; i < bodies.length; i++) {
        const tag = classifyResponseLeaf(bodies[i], fieldName, ctxs[i], parent, isAmbiguous)
        if (tag === 'unknown') continue
        if (tag.startsWith('enum:')) {
            const vals = tag.slice(5).split('|')
            enumAcc = enumAcc || new Set()
            for (const v of vals) enumAcc.add(v)
            continue
        }
        if (best === 'unknown') best = tag
    }
    if (enumAcc && enumAcc.size > 0) {
        return 'enum:' + [...enumAcc].sort().join('|')
    }
    if (best !== 'unknown') return best
    // Last-resort: GraphQL/WA Mex schema invariants (curated, non-heuristic).
    return schemaInvariantType(fieldName) || 'unknown'
}

function fillResponseTypesInner(shape, bodies, ctxs, parents, ambiguous) {
    parents = parents || []
    if (shape === null) return 'unknown'
    if (typeof shape === 'string') return shape
    if (Array.isArray(shape)) {
        return [fillResponseTypesInner(shape[0] ?? null, bodies, ctxs, parents, ambiguous)]
    }
    if (typeof shape === 'object') {
        const out = {}
        for (const [k, v] of Object.entries(shape)) {
            if (v === null) {
                let tag = classifyAcrossBodies(bodies, ctxs, k, parents, ambiguous && ambiguous.has(k))
                // Relay's compact representation flattens `[String]` (list of
                // scalars) into a plain ScalarField with no `plural` marker.
                // When the leaf is `unknown` AND the field name is a clear
                // plural-noun list (e.g. `disabled_features`, `phone_numbers`,
                // `country_codes`, `suggestions`), promote to `['string']`.
                if (tag === 'unknown' && (/_(?:ids|codes|keys|paths|tags|fields|names|jids|lids|wids|features|domains|labels|prompts|numbers|metrics|exposures|values|categories|cookies|tokens|hashes|emails|phones|list)$/.test(k) || /^(?:ids|lids|wids|jids|metrics|exposures|suggestions|labels|domains|features|prompts|tokens|emails)$/.test(k))) {
                    out[k] = ['string']
                    continue
                }
                out[k] = tag
            } else {
                out[k] = fillResponseTypesInner(v, bodies, ctxs, [...parents, k], ambiguous)
            }
        }
        return out
    }
    return shape
}

// Walk an input variables shape; for each `null` leaf, classify across the
// supplied bodies. Pass the caller (wrapper) body PLUS dependent consumer
// bodies — those are where the literal object construction lives.
//
// Signature backward-compat: `bodies` may be a single string (legacy single-
// body call); internally everything is normalized to arrays.
function fillInputTypes(shape, bodies, fetchCallPos, parentKey, siblingKeys, depth, varToField, findMethod, enumIndex) {
    const bodyArr = Array.isArray(bodies) ? bodies : [bodies]
    const posArr = Array.isArray(fetchCallPos) ? fetchCallPos : [fetchCallPos]
    const d = depth || 0
    const mapping = varToField || {}
    const finder = typeof findMethod === 'function' ? findMethod : null
    const enums = enumIndex || null
    if (!shape || typeof shape !== 'object') {
        const isUnknown = shape === null || shape === undefined || shape === 'unknown'
        if (isUnknown && parentKey) {
            // Object-of-array parents — WA Mex input types whose item is an
            // Input Object (e.g. `metrics: [{id, type}]`, `exposures: [{newsletter_id, capability}]`).
            // Structural parsing emits `[null]` when the caller uses `e.map(...)`
            // or passes a bare identifier; the inner `null` should become an
            // object placeholder, not a scalar string.
            if (/^(?:products|users|partcipants|participants|contacts|members|orders|messages|reactions|attachments|files|posts|edges|nodes|items|metrics|exposures)$/.test(parentKey)) {
                return {}
            }
            if (/^(?:categories|ids|lids|wids|jids|labels|features|tokens|emails|domains|prompts|country_codes|phone_numbers|nux_ids|custom_labels|url_domains|privacy_features|capabilities|reasons|sources|targets|recipients|suggestions|results)$/.test(parentKey) || /_(?:ids|codes|keys|paths|tags|names|domains|labels|tokens|emails|phones|jids|lids|wids|features|prompts|cookies|hashes|values|categories)$/.test(parentKey)) {
                return 'string'
            }
        }
        return shape || 'unknown'
    }
    if (Array.isArray(shape)) {
        return [fillInputTypes(shape[0] ?? null, bodyArr, posArr, parentKey, siblingKeys, d, mapping, finder, enums)]
    }
    // Sibling key set for this object level — used downstream to ensure
    // consumer-body evidence is scoped to the right literal. Without this,
    // matching `<key>:` regex picks up unrelated co-named literals in the
    // same consumer module (e.g. `{creationTime:!0, name:!0, picture:!0, ...}`
    // — a flag table — would forge boolean evidence for
    // `UpdateNewsletter.updates.{name, description, picture}`).
    //
    // For nested object levels (depth > 0), the literal is constructed
    // inside the wrapper (from positional function params), and consumers
    // never see the nested structure — so consumer-body evidence is
    // unreliable for nested keys. Limit the search to the wrapper body only.
    const localSiblings = Object.keys(shape)
    const bodiesForKey = d === 0 ? bodyArr : bodyArr.slice(0, 1)
    const posForKey = d === 0 ? posArr : posArr.slice(0, 1)
    const out = {}
    for (const [k, v] of Object.entries(shape)) {
        if (v === null) {
            const evidence = classifyInputLeafByName(bodiesForKey, posForKey, k, localSiblings)
            if (evidence === 'string' || evidence === 'number' || evidence === 'boolean' || (typeof evidence === 'string' && evidence.startsWith('enum:'))) {
                out[k] = evidence
                continue
            }
            // GraphQL field-name remap. Top-level only — the Relay
            // LinkedField args we collected map local LocalArgument names
            // to the GraphQL scalar field they're passed to. When the
            // schema field name carries known typing semantics (`username`,
            // `email`, `phone`, etc.), use it even when no caller-code
            // evidence exists. Without this, `SetUsername.input` (mapped
            // to GraphQL `username`) falls through to the wrapper short-
            // circuit `{}` because the local key `input` matches the
            // generic input-wrapper regex below.
            if (d === 0 && mapping[k]) {
                const aliasTag = inputNameInvariant(mapping[k]) || schemaInvariantType(mapping[k])
                if (aliasTag && aliasTag !== 'unknown') {
                    out[k] = aliasTag
                    continue
                }
            }
            // `input` / `request` / etc. are conventional GraphQL Input Type
            // wrappers. When structural extraction fails (caller passes
            // opaque var), at least mark it as an object rather than an
            // unknown leaf. NOTE: `picture` is NOT in this list — see
            // inputNameInvariant: on the input side `picture` is a base64
            // string (caller passes parseDataURL().data / encodeB64()).
            if (/^(?:input|request|payload|options|filters|telemetry|metadata|variant_info_fields|query_input)$/.test(k)) {
                out[k] = {}
                continue
            }
            // Plural-noun keys that are array passed-through (caller does
            // `country_codes: n` where n is a function arg) — mark as array.
            // NOTE: `metrics`/`exposures` are excluded here — those are
            // arrays of OBJECTS in WA Mex (see e.g. LogNewsletterExposures
            // which maps to `{newsletter_id, capability}[]`).
            if (/_(?:ids|codes|keys|paths|tags|fields|names|jids|lids|wids|features|domains|labels|prompts|numbers|values|cookies|tokens|hashes|emails|phones|list)$/.test(k)) {
                out[k] = ['string']
                continue
            }
            // Stand-alone plural noun input keys
            if (/^(?:ids|lids|wids|jids|suggestions|categories|labels|domains|features|prompts|tokens|emails|users|products|items|results|partcipants|participants|contacts|metrics|exposures)$/.test(k)) {
                if (k === 'categories' || k === 'products' || k === 'users' || k === 'partcipants' || k === 'participants' || k === 'contacts' || k === 'metrics' || k === 'exposures') {
                    // Try recovering the item shape from a builder method
                    // somewhere in the bundle: `get<CamelCaseKey>:function(){
                    // return [{<obj>}]}`. Catches FetchNewsletterInsights's
                    // `metrics: <wrapper-arg>` chain that ultimately maps to
                    // `getMetrics()` returns scattered across Processor
                    // modules. Falls back to `[{}]` when no builder found.
                    //
                    // recoverArrayItemShape may type some leaves as concrete
                    // tags (e.g. 'number') when the RHS is a numeric-enum
                    // reference like `<x>.NewsletterInsightMetricQuery.<Key>`
                    // — those overrides are preserved by the recursive
                    // fillInputTypes call (non-null leaves are passed through
                    // by `if (v === null)` gate at the top of the for-loop).
                    const recovered = recoverArrayItemShape(k, finder, enums)
                    if (recovered) {
                        out[k] = [fillInputTypes(recovered, bodyArr, posArr, k, [], d + 1, mapping, finder, enums)]
                    } else {
                        out[k] = [{}]
                    }
                    continue
                }
                out[k] = ['string']
                continue
            }
            // Object wrappers / known structural inputs
            if (/^(?:image_dimensions|coordinates|location|address_info|payload_envelope|capability_metadata|context_metadata|extra_data)$/.test(k)) {
                out[k] = {}
                continue
            }
            // Crypto / opaque-blob input fields
            if (/^(?:client_capability_metadata|model_request_metadatas|signed_challenge|encrypted_logging_data|direct_connection_encrypted_info|ctwa_3pd_conversion_metadata|debug_info)$/.test(k)) {
                out[k] = 'string'
                continue
            }
            // FB Ads IDs / specs — typically strings (page IDs, ad account IDs)
            // or opaque input wrapper objects (audience, placement, targeting).
            if (/(?:Audience|Spec|Input|Goal|Selection)$/.test(k)) { out[k] = {}; continue }
            if (/^(?:flow|flowID|postID|legacyAdAccountID|pageId|page_id|business_account_id|ad_account_id|adAccountID)$/.test(k)) {
                out[k] = 'string'
                continue
            }
            // Polymorphic input wrapper (UpdateGroupProperty.update varies per
            // property). Mark as opaque object instead of unknown leaf.
            if (k === 'update' || k === 'settings') { out[k] = {}; continue }
            // No real code evidence — fall back to the conventional
            // invariant chain (and 'unknown' as last resort). This mirrors
            // the legacy code path; the hardcoded defaults above still get
            // priority over invariants since they fired earlier.
            out[k] = inputNameInvariant(k) || schemaInvariantType(k) || 'unknown'
        } else {
            out[k] = fillInputTypes(v, bodyArr, posArr, k, localSiblings, d + 1, mapping, finder, enums)
        }
    }
    return out
}

// Find `<key>: <RHS>` in any of the supplied bodies and classify <RHS>.
// Bodies include both the immediate wrapper (where `fetchQuery({...})` is
// called) and dependent consumer modules (where the wrapper is invoked with
// a literal object — that's the construction site for keys the wrapper
// passes through opaquely).
//
// `siblingKeys` constrains construction-site matching: a `<key>:` match only
// counts if the enclosing `{...}` literal also contains at least one of the
// sibling keys. This prevents picking up unrelated co-named keys from flag
// tables / option dicts that happen to share names with our op's variables.
//
// Also picks up usage-based evidence in wrapper bodies: when a `<var>.<key>`
// access flows into a string-typed predicate like `isStringNullOrEmpty(...)`
// or a numeric coercion, that's a strong signal about the leaf's type.
function classifyInputLeafByName(bodies, fetchCallPositions, key, siblingKeys) {
    const arr = Array.isArray(bodies) ? bodies : [bodies]
    const positions = Array.isArray(fetchCallPositions) ? fetchCallPositions : [fetchCallPositions]
    const siblings = (siblingKeys || []).filter((s) => s !== key)
    let best = 'unknown'
    const enumAcc = new Set()
    for (let bi = 0; bi < arr.length; bi++) {
        const body = arr[bi]
        if (!body) continue
        const fetchCallPos = positions[bi]
        // Construction-site evidence: `<key>: <RHS>` in some object literal.
        const re = new RegExp(`(?:[{,]\\s*)${escapeRegExp(key)}\\s*:\\s*`, 'g')
        let m
        while ((m = re.exec(body))) {
            // Co-occurrence filter: only consider this match if the enclosing
            // `{...}` literal contains at least one sibling key. Skip for
            // the primary caller body (bi === 0) — there the fetchQuery
            // proximity check + structural extraction is authoritative, so
            // we can be lenient. For consumer bodies (bi > 0), enforce it.
            if (bi > 0) {
                if (!enclosingLiteralMatchesOurOp(body, m.index, key, siblings)) continue
            }
            const rhsStart = m.index + m[0].length
            const tracer = makeInputTracer(body, rhsStart)
            const tag = classifyInputExpr(body, rhsStart, tracer)
            if (tag === 'unknown') continue
            if (typeof tag === 'string' && tag.startsWith('enum:')) {
                for (const v of tag.slice(5).split('|')) enumAcc.add(v)
                continue
            }
            if (best === 'unknown') best = tag
            if (fetchCallPos != null && Math.abs(m.index - fetchCallPos) < 400) {
                // Strong locality signal: literal sits right next to the
                // outgoing fetchQuery call. Trust it.
                return tag
            }
        }
        // Usage-site evidence: `<var>.<key>` accessed in the wrapper body
        // through a string-typed predicate / coercion. Even when the wrapper
        // doesn't construct a literal object, its accesses on the inbound
        // variables expose the type of each field.
        const usageTag = classifyByUsage(body, key)
        if (usageTag !== 'unknown' && best === 'unknown') best = usageTag
    }
    if (enumAcc.size > 0 && best === 'unknown') {
        return 'enum:' + [...enumAcc].sort().join('|')
    }
    return best // 'unknown' if no code evidence — caller decides fallback
}

// Like classifyInputLeafByName but with the legacy convention chain appended
// (input-name invariants + schema-name invariants). Used at top-level callsites
// where the original code path expected a non-unknown answer.
function classifyInputLeafByNameWithInvariants(bodies, fetchCallPositions, key, siblingKeys) {
    const tag = classifyInputLeafByName(bodies, fetchCallPositions, key, siblingKeys)
    if (tag !== 'unknown') return tag
    return inputNameInvariant(key) || schemaInvariantType(key) || 'unknown'
}

// Walk backwards from a `<key>:` match offset to find the enclosing
// `{...}` literal, then check whether it belongs to OUR op by comparing
// its key set against our siblings. Returns true iff:
//   - at least one sibling is present, AND
//   - the literal's TOTAL key count fits within our op's variable budget
//     (siblings + the target key + a small slack for nested helper keys).
// This rejects e.g. a React consumer's `useLazyLoadQuery(<DIFFERENT_QUERY>, {
//   audienceOptionAudience, currency, dailyBudget, ..., selectedPublisherPlatforms,
//   targetingSpecAudience: JSON.stringify(...) })` literal — it shares some
// of our key names but builds a different GraphQL query's input.
function enclosingLiteralMatchesOurOp(body, idx, key, siblings) {
    // Find enclosing `{` by walking back, balancing `}` against `{`.
    let i = idx - 1
    let close = 0
    let inStr = false
    let strCh = ''
    while (i >= 0) {
        const c = body[i]
        if (inStr) {
            if (c === strCh && body[i - 1] !== '\\') inStr = false
            i--
            continue
        }
        if (c === '"' || c === "'" || c === '`') {
            // Walking backwards through a string is awkward; use a simple
            // backtrack: jump to the matching opening quote.
            const q = c
            i--
            while (i >= 0 && body[i] !== q) i--
            i--
            continue
        }
        if (c === '}') close++
        else if (c === '{') {
            if (close === 0) break
            close--
        }
        i--
    }
    if (i < 0) return false
    // Now find the matching `}` going forward from i.
    let j = i + 1
    let dp = 1
    while (j < body.length && dp > 0) {
        const c = body[j]
        if (c === '"' || c === "'" || c === '`') { j = skipString(body, j); continue }
        if (c === '{') dp++
        else if (c === '}') dp--
        j++
    }
    const litBody = body.slice(i + 1, j - 1)
    // Collect all keys present at the literal's TOP LEVEL only (skip nested
    // `{...}` objects so we don't pick up keys from sub-shapes).
    const keysHere = collectTopLevelKeys(litBody)
    if (keysHere.size === 0) return false
    // (1) When the target field has siblings (i.e. the op declares
    // co-occurring keys at this level), at least one must be present in the
    // literal. When siblings is empty (target is the sole declared key),
    // skip this check — every matching literal will only contain `key`.
    if (siblings.length > 0) {
        const siblingSet = new Set(siblings)
        let hasSibling = false
        for (const k of keysHere) if (siblingSet.has(k)) { hasSibling = true; break }
        if (!hasSibling) return false
    }
    // (2) Total key count must fit our op's variable budget. The literal's
    // size minus the target key should be ≤ siblings.length. If the literal
    // has more keys than our op declares, it's a different op's input that
    // happens to share some of our names (e.g. a React consumer building
    // a different GraphQL query's input via useLazyLoadQuery, with
    // `dailyBudget`/`selectedPublisherPlatforms` that aren't in our schema).
    const litKeyCount = keysHere.size - (keysHere.has(key) ? 1 : 0)
    if (litKeyCount > siblings.length) return false
    return true
}

// Extract top-level keys from a single object literal body (the content
// between `{` and `}`). Skips keys nested inside sub-`{...}` literals.
function collectTopLevelKeys(litBody) {
    const out = new Set()
    let i = 0
    let depth = 0
    while (i < litBody.length) {
        const c = litBody[i]
        if (c === '"' || c === "'" || c === '`') { i = skipString(litBody, i); continue }
        if (c === '{' || c === '[' || c === '(') { depth++; i++; continue }
        if (c === '}' || c === ']' || c === ')') { depth--; i++; continue }
        if (depth !== 0) { i++; continue }
        // At top level. Look for `<key>:` where `<key>` is an identifier or
        // quoted string AND preceded by `{`/`,`/start.
        const prev = i > 0 ? litBody[i - 1] : ','
        if (prev !== ',' && prev !== '{' && !/\s/.test(prev) && i !== 0) { i++; continue }
        if (/[A-Za-z_$]/.test(c)) {
            let k = i
            while (k < litBody.length && /[\w$]/.test(litBody[k])) k++
            const ident = litBody.slice(i, k)
            let n = k
            while (n < litBody.length && /\s/.test(litBody[n])) n++
            if (litBody[n] === ':') {
                out.add(ident)
                i = n + 1
                continue
            }
        }
        i++
    }
    return out
}

// Scan a body for `<var>.<key>` accesses and infer the leaf type from how
// each access is consumed. Patterns that fire here:
//   isStringNullOrEmpty(<...>.<key>)     → string
//   isStringEmpty / isStringBlank        → string
//   <...>.<key>.length / .toUpperCase()  → string
//   Number(<...>.<key>) / parseInt(...)  → string (wire-string coerced client-side)
//   Boolean(<...>.<key>) / !<...>.<key>  → boolean (weak)
//
// WA Web bundles wrap utility calls through `r("WAModuleName")` / `n("WA...")`
// require-style indirection, so we also match `r("isStringNullOrEmpty")(...)`
// patterns where the function name is a string literal.
function classifyByUsage(body, key) {
    if (!body || !key) return 'unknown'
    const keyEsc = escapeRegExp(key)
    // Direct call: `isStringNullOrEmpty(<...>.key)` (rarely happens un-wrapped)
    const stringPred = '(?:isString(?:NullOrEmpty|Empty|Blank|NotEmpty)|stringIsEmpty|stringIsNullOrEmpty)'
    if (new RegExp(`${LB}${stringPred}\\s*\\([^)]{0,200}?\\.${keyEsc}${RB}`).test(body)) return 'string'
    // Require-wrapped: `r("isStringNullOrEmpty")(<...>.key)` — also covers
    // `n("...")`, `o("...")` since they're all the same minifier-emitted
    // require pattern.
    if (new RegExp(`[a-z_$]\\s*\\(\\s*"${stringPred}"\\s*\\)\\s*\\([^)]{0,200}?\\.${keyEsc}\\b`).test(body)) return 'string'
    // Strong: String method calls on the value
    if (new RegExp(`\\.${keyEsc}\\s*\\.\\s*(?:toLowerCase|toUpperCase|trim|trimStart|trimEnd|startsWith|endsWith|includes|indexOf|lastIndexOf|substring|substr|padStart|padEnd|replace|replaceAll|split|charAt|charCodeAt|normalize)\\s*\\(`).test(body)) {
        return 'string'
    }
    // Strong: Number/parseInt/parseFloat coercion → wire is string, client coerces
    if (new RegExp(`\\b(?:Number|parseInt|parseFloat|Number\\.parseInt|Number\\.parseFloat)\\s*\\([^)]{0,200}?\\.${keyEsc}\\b`).test(body)) {
        return 'string'
    }
    // Weak: Boolean coercion / negation
    if (new RegExp(`\\bBoolean\\s*\\([^)]{0,200}?\\.${keyEsc}\\b`).test(body)) return 'boolean'
    return 'unknown'
}

// Given a plural-noun input field name and the bundle-wide method finder,
// search for a builder method that returns an array of objects literally —
// i.e. `get<CamelCaseField>:function(...){return [{<obj-shape>}]}`. The
// first object's shape is taken as the array item type.
//
// Triggered by inputs like FetchNewsletterInsights's `metrics`: the wrapper
// passes through `e.requestedMetrics`, which traces back through
// `getUniqueMetricRequests` → `.flatMap(...).getMetrics()` to builder
// methods scattered across Processor modules. Those builders are NOT in the
// wrapper's direct dependency chain, so the wrapper-and-consumer bodies
// alone can't reach them. The bundle-wide method finder bridges the gap.
function recoverArrayItemShape(fieldName, finder, enumIndex) {
    if (!finder || !fieldName) return null
    const camel = fieldName
        .split('_')
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join('')
    const candidates = [
        'get' + camel,
        'make' + camel,
        'build' + camel,
        'to' + camel,
        // Singular: `getMetric` if the field is `metrics`. Some bundles use
        // either form.
        'get' + camel.replace(/ies$/, 'y').replace(/sses$/, 'ss').replace(/s$/, '')
    ]
    for (const cand of candidates) {
        const body = finder(cand)
        if (!body) continue
        // Look for `return [{...}]` in the body. Minified, so no whitespace
        // requirement — must accept `return[{`.
        const retIdx = body.search(/\breturn\b\s*\[/)
        if (retIdx === -1) continue
        let i = body.indexOf('[', retIdx)
        if (i === -1) continue
        let j = i + 1
        while (j < body.length && /\s/.test(body[j])) j++
        if (body[j] !== '{') continue
        const r = parseObjectShapeInline(body, j, enumIndex)
        if (r && r.value && typeof r.value === 'object' && Object.keys(r.value).length > 0) return r.value
    }
    return null
}

// Local minimal object-shape parser — duplicate of extract-mex's
// parseObjectShape but inlined here to avoid a circular require.
//
// Beyond bare structure, this version classifies each value's leaf type
// when the RHS is a literal or a known-enum reference:
//   "lit"            → 'string'
//   123              → 'number'
//   !0 / !1 / true / false → 'boolean'
//   <ref>.<EnumName>.<Key>, when <EnumName> is in the supplied enumIndex
//     with kind='numeric'                                  → 'number'
//   <ref>.<EnumName>.<Key>, when kind='mirrored'/'string-object'
//                                                          → 'string'
// Other refs (member chains, function calls) stay `null` so the upstream
// fillInputTypes pipeline falls back to schemaInvariantType. Without these
// inline tags, e.g. `id: <ref>.NewsletterInsightMetricQuery.UniqueVisitors...`
// would otherwise hit the `^id$ → string` invariant and emit `id: string`.
function parseObjectShapeInline(s, start, enumIndex) {
    let i = start + 1
    const out = {}
    while (i < s.length && s[i] !== '}') {
        while (i < s.length && /\s/.test(s[i])) i++
        // key
        let key = null
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i]
            i++
            const st = i
            while (i < s.length && s[i] !== q) {
                if (s[i] === '\\') i++
                i++
            }
            key = s.slice(st, i)
            i++
        } else if (/[A-Za-z_$]/.test(s[i] || '')) {
            const st = i
            while (i < s.length && /[\w$]/.test(s[i])) i++
            key = s.slice(st, i)
        } else {
            i++
            continue
        }
        while (i < s.length && /\s/.test(s[i])) i++
        if (s[i] !== ':') {
            if (s[i] === ',') i++
            continue
        }
        i++ // :
        while (i < s.length && /\s/.test(s[i])) i++
        // value
        if (s[i] === '{') {
            const r = parseObjectShapeInline(s, i, enumIndex)
            if (key) out[key] = r.value
            i = r.end
        } else if (s[i] === '[') {
            let k = i + 1
            while (k < s.length && /\s/.test(s[k])) k++
            if (s[k] === '{') {
                const r = parseObjectShapeInline(s, k, enumIndex)
                if (key) out[key] = [r.value]
                i = r.end
            } else if (key) {
                out[key] = [null]
            }
            let depth = 1
            while (i < s.length && depth > 0) {
                const c = s[i]
                if (c === '"' || c === "'" || c === '`') {
                    const q = c
                    i++
                    while (i < s.length && s[i] !== q) {
                        if (s[i] === '\\') i++
                        i++
                    }
                    i++
                    continue
                }
                if (c === '[') depth++
                else if (c === ']') depth--
                i++
            }
        } else {
            // Capture the RHS expression to classify it.
            const exprStart = i
            let depth = 0
            let inStr = false
            let strCh = ''
            while (i < s.length) {
                const c = s[i]
                if (inStr) {
                    if (c === '\\') { i += 2; continue }
                    if (c === strCh) inStr = false
                    i++
                    continue
                }
                if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; i++; continue }
                if (c === '(' || c === '[' || c === '{') depth++
                else if (c === ')' || c === ']' || c === '}') {
                    if (depth === 0) break
                    depth--
                } else if (c === ',' && depth === 0) break
                i++
            }
            const expr = s.slice(exprStart, i).trim()
            if (key) out[key] = classifyInlineRhs(expr, enumIndex)
        }
        while (i < s.length && /\s/.test(s[i])) i++
        if (s[i] === ',') i++
    }
    return { value: out, end: i + 1 }
}

// Classify a recovered RHS expression: string literal, number literal,
// boolean (`!0`/`!1`/`true`/`false`), known-enum reference, or null
// (for unrecognized references — falls through to schemaInvariantType later).
function classifyInlineRhs(expr, enumIndex) {
    if (!expr) return null
    const c = expr[0]
    if (c === '"' || c === "'" || c === '`') return 'string'
    if (/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(expr)) return 'number'
    if (expr === 'true' || expr === 'false' || expr === '!0' || expr === '!1') return 'boolean'
    if (expr === 'null' || expr === 'undefined' || expr === 'void 0') return null
    // Member-chain ref like `o("X").EnumName.Key` — pick out the FIRST
    // CamelCased identifier segment after a `.` and use it as the enum name.
    if (enumIndex) {
        const refMatch = expr.match(/\.([A-Z][\w$]*)\s*\.\s*[A-Za-z_$][\w$]*\s*$/)
        if (refMatch) {
            const entry = enumIndex[refMatch[1]]
            if (entry) {
                if (entry.kind === 'numeric') return 'number'
                if (entry.kind === 'mirrored' || entry.kind === 'string-object') {
                    // For mirrored wire enums, surface as the full enum union;
                    // for client-internal string-object enums, just say 'string'.
                    return entry.kind === 'mirrored'
                        ? 'enum:' + entry.values.slice().sort().join('|')
                        : 'string'
                }
            }
        }
        // Direct CamelCase root reference like `EnumName.Key` (no `o("...")` prefix).
        const directMatch = expr.match(/^([A-Z][\w$]*)\s*\.\s*[A-Za-z_$][\w$]*\s*$/)
        if (directMatch) {
            const entry = enumIndex[directMatch[1]]
            if (entry && entry.kind === 'numeric') return 'number'
        }
    }
    return null
}

// Input-specific naming conventions in WA Mex inputs. `fetch_<x>` flags are
// canonical booleans (e.g. `fetch_viewer_metadata`, `fetch_status_metadata`).
// `include_<x>` / `with_<x>` follow the same pattern.
//
// `picture` on the INPUT side is consistently a base64 string (data URL .data
// segment) — see CreateNewsletter/UpdateNewsletter callers which pass
// `parseDataURL(rawDataUrl).data` / `encodeB64(buffer)`. On the response side
// `picture` is an object `{direct_path, id, type}`; that case is handled by
// the structural extractor (`response` shape), not this invariant.
function inputNameInvariant(key) {
    if (/^(?:fetch|include|with|exclude|skip|should|use|enable|disable)_/.test(key)) return 'boolean'
    if (key === 'picture' || key === 'avatar' || key === 'image' || key === 'photo') return 'string'
    return null
}

module.exports = {
    classifyInputExpr,
    classifyResponseLeaf,
    fillResponseTypes,
    fillInputTypes,
    classifyInputLeafByName,
    buildBodyContext
}
