'use strict'

/**
 * Shared text parsing utilities for static extraction over WA Web bundle JS.
 *
 * The bundles are minified ES5 produced by Meta's haste system. We rely on
 * a few invariants:
 *   - Modules are registered as `__d("Name", [deps], factory, n)` where deps
 *     is a comma-separated list of quoted module names
 *   - Factory bodies are well-formed JS — depths of `()/{}/[]` always balance
 *   - String/template literals are quoted with `"`/`'`/`` ` ``; backslash escapes
 *
 * Parsers never throw on malformed input; they degrade by returning null or
 * skipping forward to the next safe stop character.
 */

function skipString(s, i) {
    const q = s[i]
    i++
    while (i < s.length && s[i] !== q) {
        if (s[i] === '\\') i++
        i++
    }
    return i + 1
}

// Skip an expression in `s` starting at `start` until a top-level character
// in `stops` (typically `,`, `}`, `]`, `)`). Returns the index AT the stop.
function skipExpr(s, start, stops) {
    let i = start
    let dp = 0
    let db = 0
    let dbr = 0
    while (i < s.length) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') {
            i = skipString(s, i)
            continue
        }
        if (c === '(') dp++
        else if (c === ')') {
            if (dp === 0 && stops.includes(c)) return i
            dp--
        } else if (c === '{') db++
        else if (c === '}') {
            if (db === 0 && stops.includes(c)) return i
            db--
        } else if (c === '[') dbr++
        else if (c === ']') {
            if (dbr === 0 && stops.includes(c)) return i
            dbr--
        } else if (dp === 0 && db === 0 && dbr === 0 && stops.includes(c)) return i
        i++
    }
    return i
}

function skipWs(s, i) {
    while (i < s.length) {
        const c = s[i]
        if (/\s/.test(c)) {
            i++
            continue
        }
        if (c === '/' && s[i + 1] === '/') {
            while (i < s.length && s[i] !== '\n') i++
            continue
        }
        if (c === '/' && s[i + 1] === '*') {
            i += 2
            while (i < s.length && !(s[i] === '*' && s[i + 1] === '/')) i++
            i += 2
            continue
        }
        break
    }
    return i
}

// Parse a JSON-ish JS literal starting at s[start]. Supports:
//   - strings ('foo' | "foo" | `foo`), numbers, true/false/null, undefined
//   - object literals (unquoted or quoted keys, computed keys skipped)
//   - array literals
//   - identifier references → represented as { __ref: 'ident.path' }
//   - function calls / member chains / ternaries → represented as { __ref: '<raw expr>' }
//   - spread (...x) — best-effort merge via traceIdent
//
// Returns { value, end }.
function parseValue(s, start, traceIdent) {
    let i = skipWs(s, start)
    const c = s[i]

    if (c === '"' || c === "'" || c === '`') {
        const q = c
        i++
        let v = ''
        while (i < s.length && s[i] !== q) {
            if (s[i] === '\\') {
                v += s[i] + s[i + 1]
                i += 2
                continue
            }
            v += s[i]
            i++
        }
        i++
        return { value: unescapeString(v), end: i }
    }
    if (c === '{') return parseObject(s, i, traceIdent)
    if (c === '[') return parseArray(s, i, traceIdent)
    // Minifier-emitted boolean literals: `!0` = true, `!1` = false. Without
    // this, `plural:!0` parses to null and the LinkedField loses its array
    // shape (e.g. `categories` would be `{...}` instead of `[{...}]`).
    if (c === '!') {
        const nx = s[i + 1]
        if (nx === '0') return { value: true, end: i + 2 }
        if (nx === '1') return { value: false, end: i + 2 }
    }
    if (/[0-9.\-]/.test(c)) return parseNumber(s, i)
    // Identifier-style values: true/false/null/undefined, NaN, Infinity, or ref
    if (/[A-Za-z_$]/.test(c)) {
        // Grab the bare identifier first
        let k = i
        while (k < s.length && /[\w$]/.test(s[k])) k++
        const ident = s.slice(i, k)
        // Then walk member access / call chains up to a stop char
        let j = k
        let isComplex = false
        while (j < s.length) {
            const ch = s[j]
            if (ch === '.' || ch === '(' || ch === '[') {
                isComplex = true
                j = skipExpr(s, j, [',', '}', ']', ')', ':'])
                break
            }
            if (/\s/.test(ch)) {
                j++
                continue
            }
            break
        }
        if (!isComplex) {
            if (ident === 'true') return { value: true, end: k }
            if (ident === 'false') return { value: false, end: k }
            if (ident === 'null') return { value: null, end: k }
            if (ident === 'undefined' || ident === 'void') return { value: undefined, end: k }
            // Bare identifier — try to trace
            if (traceIdent) {
                const traced = traceIdent(ident)
                if (traced !== undefined) return { value: traced, end: k }
            }
            return { value: { __ref: ident }, end: k }
        }
        // Complex expression — return raw text as ref
        const rawText = s.slice(i, j)
        return { value: { __ref: rawText.trim() }, end: j }
    }
    // Fallback: skip whatever it is
    const end = skipExpr(s, i, [',', '}', ']', ')', ':'])
    return { value: null, end }
}

function parseNumber(s, start) {
    let i = start
    if (s[i] === '-') i++
    while (i < s.length && /[0-9.eE+\-]/.test(s[i])) i++
    const text = s.slice(start, i).trim()
    const n = Number(text)
    return { value: Number.isFinite(n) ? n : null, end: i }
}

function unescapeString(s) {
    let out = ''
    for (let i = 0; i < s.length; i++) {
        const c = s[i]
        if (c === '\\') {
            const n = s[i + 1]
            switch (n) {
                case 'n':
                    out += '\n'
                    break
                case 't':
                    out += '\t'
                    break
                case 'r':
                    out += '\r'
                    break
                case '"':
                    out += '"'
                    break
                case "'":
                    out += "'"
                    break
                case '`':
                    out += '`'
                    break
                case '\\':
                    out += '\\'
                    break
                case '/':
                    out += '/'
                    break
                case 'u': {
                    const hex = s.slice(i + 2, i + 6)
                    out += String.fromCharCode(parseInt(hex, 16) || 0)
                    i += 4
                    break
                }
                case 'x': {
                    const hex = s.slice(i + 2, i + 4)
                    out += String.fromCharCode(parseInt(hex, 16) || 0)
                    i += 2
                    break
                }
                default:
                    out += n
                    break
            }
            i++
            continue
        }
        out += c
    }
    return out
}

function parseKey(s, start) {
    let i = skipWs(s, start)
    const c = s[i]
    if (c === '"' || c === "'") {
        const q = c
        i++
        const st = i
        while (i < s.length && s[i] !== q) {
            if (s[i] === '\\') i++
            i++
        }
        const key = unescapeString(s.slice(st, i))
        i++
        return { key, end: i }
    }
    if (c === '[') {
        // Computed key — skip and return null
        const end = skipExpr(s, i + 1, [']'])
        return { key: null, end: end + 1 }
    }
    const st = i
    while (i < s.length && /[\w$]/.test(s[i])) i++
    return { key: i > st ? s.slice(st, i) : null, end: i }
}

function parseObject(s, start, traceIdent) {
    let i = start + 1 // skip {
    const out = {}
    i = skipWs(s, i)
    while (i < s.length && s[i] !== '}') {
        i = skipWs(s, i)
        if (s.slice(i, i + 3) === '...') {
            i += 3
            const r = parseValue(s, i, traceIdent)
            if (r.value && typeof r.value === 'object' && !Array.isArray(r.value)) {
                for (const [k, v] of Object.entries(r.value)) {
                    if (!(k in out)) out[k] = v
                }
            }
            i = r.end
            i = skipWs(s, i)
            if (s[i] === ',') i++
            continue
        }
        const k = parseKey(s, i)
        i = k.end
        i = skipWs(s, i)
        if (s[i] === '(') {
            // method shorthand — skip
            i = skipExpr(s, i, [',', '}'])
            if (s[i] === ',') i++
            continue
        }
        if (s[i] !== ':') {
            // shorthand `{ foo, bar }` — treat as ref
            if (k.key) out[k.key] = { __ref: k.key }
            if (s[i] === ',') i++
            continue
        }
        i++ // :
        const v = parseValue(s, i, traceIdent)
        if (k.key) out[k.key] = v.value
        i = v.end
        i = skipWs(s, i)
        if (s[i] === ',') i++
    }
    return { value: out, end: i < s.length ? i + 1 : i }
}

function parseArray(s, start, traceIdent) {
    let i = start + 1
    const out = []
    i = skipWs(s, i)
    while (i < s.length && s[i] !== ']') {
        const r = parseValue(s, i, traceIdent)
        out.push(r.value)
        i = r.end
        i = skipWs(s, i)
        if (s[i] === ',') i++
        i = skipWs(s, i)
    }
    return { value: out, end: i < s.length ? i + 1 : i }
}

// Find `__d("<name>", ...)` body in `text`. Returns { name, deps, factoryStart, factoryEnd, end } or null.
function findModuleRegistration(text, modName) {
    const needle = `__d("${modName}"`
    const idx = text.indexOf(needle)
    if (idx === -1) return null
    let depth = 0
    let end = -1
    for (let i = idx; i < text.length; i++) {
        if (text[i] === '(') depth++
        else if (text[i] === ')') {
            if (--depth === 0) {
                end = i + 1
                break
            }
        }
    }
    if (end === -1) return null
    const body = text.slice(idx, end)
    // Locate the deps array (between first `[` and matching `]`)
    const depsStart = body.indexOf('[')
    if (depsStart === -1) return { name: modName, deps: [], factoryStart: 0, factoryEnd: 0, body }
    const depsEnd = skipExpr(body, depsStart + 1, [']'])
    const depsText = body.slice(depsStart + 1, depsEnd)
    const deps = []
    for (const m of depsText.matchAll(/"([^"]+)"/g)) deps.push(m[1])
    return { name: modName, deps, body, depsEnd }
}

// Iterate every __d("Name", ...) header across a corpus.
function* iterModuleHeaders(text) {
    const re = /__d\("([^"]+)",\s*\[([^\]]*)\]/g
    let m
    while ((m = re.exec(text))) {
        yield {
            name: m[1],
            deps: [...m[2].matchAll(/"([^"]+)"/g)].map((d) => d[1]),
            headerStart: m.index,
            headerEnd: m.index + m[0].length
        }
    }
}

module.exports = {
    skipString,
    skipExpr,
    skipWs,
    parseValue,
    parseKey,
    parseObject,
    parseArray,
    findModuleRegistration,
    iterModuleHeaders
}
