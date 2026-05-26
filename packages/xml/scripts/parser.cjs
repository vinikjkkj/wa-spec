'use strict'

/**
 * Shared text parsing utilities for static extraction over WA Web bundle JS.
 *
 * Minified-ES5 modules use the haste `__d("Name", [deps], factory, n)` shape;
 * the parser primitives here lift that into something a downstream extractor
 * can walk without pulling in a real JS parser.
 *
 * - Modules: `findModuleRegistration(text, name)` + `iterModuleHeaders(text)`
 * - Expressions: `skipExpr(s, i, stops)` walks until a top-level stop char,
 *   respecting string/paren/bracket/brace nesting
 * - Calls: `parseCallChain(s, start)` decodes a (possibly-chained) call into
 *   `{ receiver, method, args, end }` tuples — the building block for
 *   recognising `o("WASmaxJsx").smax("iq", {...}, ...)` and friends.
 *
 * Parsers degrade by returning null / skipping forward; they never throw.
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

function unescapeString(s) {
    let out = ''
    for (let i = 0; i < s.length; i++) {
        const c = s[i]
        if (c === '\\') {
            const n = s[i + 1]
            switch (n) {
                case 'n': out += '\n'; break
                case 't': out += '\t'; break
                case 'r': out += '\r'; break
                case '"': out += '"'; break
                case "'": out += "'"; break
                case '`': out += '`'; break
                case '\\': out += '\\'; break
                case '/': out += '/'; break
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
                default: out += n; break
            }
            i++
            continue
        }
        out += c
    }
    return out
}

// Read a quoted string literal starting at s[start] (s[start] is the quote).
// Returns { value, end }.
function readStringLiteral(s, start) {
    const q = s[start]
    let i = start + 1
    const buf = []
    while (i < s.length && s[i] !== q) {
        if (s[i] === '\\') {
            buf.push(s[i], s[i + 1] ?? '')
            i += 2
            continue
        }
        buf.push(s[i])
        i++
    }
    return { value: unescapeString(buf.join('')), end: i + 1 }
}

// Split a top-level (paren/bracket/brace-balanced) comma list within `s[start..end]`.
// Returns an array of `[exprStart, exprEnd]` pairs.
function splitTopLevelCommas(s, start, end) {
    const out = []
    let i = start
    let depth = 0
    let last = i
    let inStr = null
    while (i < end) {
        const c = s[i]
        if (inStr) {
            if (c === '\\') i += 2
            else {
                if (c === inStr) inStr = null
                i++
            }
            continue
        }
        if (c === '"' || c === "'" || c === '`') { inStr = c; i++; continue }
        if (c === '(' || c === '[' || c === '{') depth++
        else if (c === ')' || c === ']' || c === '}') depth--
        else if (c === ',' && depth === 0) {
            out.push([last, i])
            last = i + 1
        }
        i++
    }
    if (last < end) out.push([last, end])
    return out.filter(([a, b]) => {
        let k = a
        while (k < b && /\s/.test(s[k])) k++
        return k < b
    })
}

// Parse a JS function-call arguments list. `start` should be AT the open `(`.
// Returns `{ args: [[start,end], ...], end }` (end is index AFTER the `)`).
function parseCallArgs(s, start) {
    if (s[start] !== '(') return null
    const close = skipExpr(s, start + 1, [')'])
    if (close >= s.length) return null
    const args = splitTopLevelCommas(s, start + 1, close)
    return { args, end: close + 1 }
}

// Parse an identifier (word chars + `$`). Returns `{ ident, end }` or null.
function readIdent(s, start) {
    let i = start
    while (i < s.length && /[\w$]/.test(s[i])) i++
    if (i === start) return null
    return { ident: s.slice(start, i), end: i }
}

// Find `__d("<modName>", ...)` body in `text`. Returns
// `{ name, deps, depsRange:[start,end], factoryStart, factoryEnd, end, body }`
// where the factory body is the inner `{...}` of the factory function.
// Returns null on miss.
function findModuleRegistration(text, modName) {
    const needle = `__d("${modName}"`
    let idx = text.indexOf(needle)
    while (idx !== -1) {
        // Walk to matching closing paren of __d(...)
        let depth = 0
        let end = -1
        let i = idx
        for (; i < text.length; i++) {
            const c = text[i]
            if (c === '"' || c === "'" || c === '`') { i = skipString(text, i) - 1; continue }
            if (c === '(') depth++
            else if (c === ')') {
                if (--depth === 0) { end = i + 1; break }
            }
        }
        if (end === -1) return null

        const slice = text.slice(idx, end)
        const depsStart = slice.indexOf('[')
        if (depsStart === -1) {
            idx = text.indexOf(needle, end)
            continue
        }
        const depsEnd = skipExpr(slice, depsStart + 1, [']'])
        const depsText = slice.slice(depsStart + 1, depsEnd)
        const deps = []
        for (const m of depsText.matchAll(/"([^"]+)"/g)) deps.push(m[1])

        // Locate the factory `function(...){...}` body.
        // Look forward from `]` for `function(` then descend the matching braces.
        let j = depsEnd + 1
        while (j < slice.length && slice[j] !== 'f') j++
        if (j === slice.length) return null
        // skip `function(...){`
        const openParen = slice.indexOf('(', j)
        if (openParen === -1) return null
        const closeParen = skipExpr(slice, openParen + 1, [')']) + 1
        let braceOpen = closeParen
        while (braceOpen < slice.length && slice[braceOpen] !== '{') braceOpen++
        if (braceOpen >= slice.length) return null
        const braceClose = skipExpr(slice, braceOpen + 1, ['}'])

        return {
            name: modName,
            deps,
            body: slice,
            factoryStart: braceOpen + 1,
            factoryEnd: braceClose,
            factoryBody: slice.slice(braceOpen + 1, braceClose),
            absStart: idx,
            absEnd: end
        }
    }
    return null
}

// Iterate every `__d("Name", [...])` header across a bundle text. Cheap — used
// to enumerate module names in a bundle without parsing the whole body.
function* iterModuleHeaders(text) {
    const re = /__d\("([^"]+)",\s*\[([^\]]*)\]/g
    let m
    while ((m = re.exec(text))) {
        const deps = [...m[2].matchAll(/"([^"]+)"/g)].map((d) => d[1])
        yield {
            name: m[1],
            deps,
            headerStart: m.index,
            headerEnd: m.index + m[0].length
        }
    }
}

// Given the deps array of a module and the `function(t,n,r,o,a,i,l)` factory
// signature, map each formal parameter to its dep loader semantics. The first
// three params are always `(globalThis, require, requireDefault)` in haste,
// the rest are `(dep0, dep1, ...)` aliases — but in modules using the
// `n("X")` / `o("X")` / `r("X")` style they're all lookup functions taking a
// dep NAME, not positional dep aliases. Either way the loader takes a string
// matching one of `deps`. We return an empty mapping — callers use the deps
// list directly via `<ident>("ModName")` text search.
//
// (Kept here for symmetry; not all extractors need it.)
function paramLoaderMap() {
    return {}
}

// Walk forward from `start` collecting a chained member/call expression.
// Returns an array of segments, each one of:
//   { kind: 'ident', name }
//   { kind: 'member', name }
//   { kind: 'call', args: [[s, e], ...] }
//   { kind: 'index', expr: [s, e] }       // bracket access
// Plus `end` (the index right after the chain).
//
// E.g. `o("WAWap").CUSTOM_STRING(t).x` →
//   [{kind:'ident',name:'o'}, {kind:'call',args:[["WAWap"]]}, {kind:'member',name:'CUSTOM_STRING'}, {kind:'call',args:[['t']]}, {kind:'member',name:'x'}]
function parseChain(s, start) {
    let i = skipWs(s, start)
    const id = readIdent(s, i)
    if (!id) return null
    const out = [{ kind: 'ident', name: id.ident }]
    i = id.end
    while (i < s.length) {
        const c = s[i]
        if (c === '.') {
            i++
            const sub = readIdent(s, i)
            if (!sub) break
            out.push({ kind: 'member', name: sub.ident })
            i = sub.end
            continue
        }
        if (c === '(') {
            const call = parseCallArgs(s, i)
            if (!call) break
            out.push({ kind: 'call', args: call.args })
            i = call.end
            continue
        }
        if (c === '[') {
            const close = skipExpr(s, i + 1, [']'])
            out.push({ kind: 'index', expr: [i + 1, close] })
            i = close + 1
            continue
        }
        break
    }
    return { chain: out, end: i }
}

// Stringify a chain segment back to source-equivalent text using s. Used for
// debug / fallback rendering when we can't decode a value.
function chainToText(s, chain) {
    const parts = []
    for (const seg of chain) {
        if (seg.kind === 'ident') parts.push(seg.name)
        else if (seg.kind === 'member') parts.push('.' + seg.name)
        else if (seg.kind === 'call') {
            const inner = seg.args.map(([a, b]) => s.slice(a, b).trim()).join(',')
            parts.push('(' + inner + ')')
        } else if (seg.kind === 'index') {
            parts.push('[' + s.slice(seg.expr[0], seg.expr[1]).trim() + ']')
        }
    }
    return parts.join('')
}

// Resolve `<ident>("ModName")` segments in a chain. Returns the called module
// name if the chain starts with `<ident>(<strlit>)`, else null.
function resolveLoaderModuleName(s, chain) {
    if (!chain || chain.length < 2) return null
    const head = chain[0]
    const call = chain[1]
    if (head.kind !== 'ident' || call.kind !== 'call' || call.args.length !== 1) return null
    const [a, b] = call.args[0]
    const arg = s.slice(a, b).trim()
    if (!(arg.startsWith('"') && arg.endsWith('"'))) return null
    return arg.slice(1, -1)
}

// Find all top-level call expressions matching `<loader>("<module>").<method>(...)`
// within `body`. Returns an array of `{ moduleName, method, args, callStart, callEnd }`.
// `loaderOnly` (optional) restricts to a single loader ident (e.g. only `o`).
function* iterModuleCalls(body, loaderOnly) {
    const re = /\b([A-Za-z_$][\w$]*)\s*\(\s*"([^"]+)"\s*\)\s*\.\s*([A-Za-z_$][\w$]*)\s*\(/g
    let m
    while ((m = re.exec(body))) {
        if (loaderOnly && m[1] !== loaderOnly) continue
        const openParen = m.index + m[0].length - 1 // index of `(`
        const close = skipExpr(body, openParen + 1, [')'])
        if (close >= body.length) continue
        const args = splitTopLevelCommas(body, openParen + 1, close)
        yield {
            loader: m[1],
            moduleName: m[2],
            method: m[3],
            args,
            callStart: m.index,
            argsStart: openParen + 1,
            argsEnd: close,
            callEnd: close + 1
        }
    }
}

module.exports = {
    skipString,
    skipExpr,
    skipWs,
    unescapeString,
    readStringLiteral,
    readIdent,
    splitTopLevelCommas,
    parseCallArgs,
    parseChain,
    chainToText,
    resolveLoaderModuleName,
    findModuleRegistration,
    iterModuleHeaders,
    iterModuleCalls,
    paramLoaderMap
}
