'use strict'

/**
 * Canonical bundle loading for the extractors.
 *
 * An archive dump defines nearly every module more than once. The archive
 * ships several builds of the same source — native `async` next to an
 * `asyncToGeneratorRuntime` transpile, function arguments with and without the
 * minifier's paren-wrap — so a single revision holds ~229k `__d(...)`
 * registrations for ~25k modules, and about half of those modules have copies
 * whose text differs.
 *
 * Extractors resolve a module by the first registration they meet. Over the
 * raw files that let file order pick the variant, and file names are content
 * hashes, so the order — and with it the variant — reshuffled on every build.
 * The extractors do not read every variant equally well, so values flipped
 * between two states from one daily extraction to the next.
 *
 * loadCanonicalBundles() takes that choice away from file order:
 *
 *   - every registration is cut out of its file, up to the `)` that closes its
 *     `__d(` call;
 *   - each module keeps exactly one copy, picked from its distinct texts by
 *     looking at the text alone: the shortest wins (transpile passes add
 *     wrapper code, so that is the least transformed build), ties broken by
 *     content;
 *   - modules come out one bundle each, in module-name order, so any
 *     first-match lookup lands on the same module on every build;
 *   - code outside any registration (runtime prelude, bootstrap tails) is kept
 *     once per distinct text, after the modules.
 *
 * The result depends only on the set of registrations in the dump, not on how
 * the dump happens to be split into files or what those files are named.
 *
 * The returned array also carries a non-enumerable `moduleIndex`
 * (Map<moduleName, bundle>) so name lookups need not scan every bundle.
 */

const fs = require('node:fs')
const path = require('node:path')

// A registration always starts a line, or directly follows the `*/` of a
// license comment. Anchoring on that keeps a `__d("…",[` inside a string
// literal from being taken for one.
const HEADER_RE = /(?<![^\n/])__d\("([^"]+)",\s*\[/g

// After one of these keywords a `/` starts a regex literal, not a division.
const REGEX_KEYWORDS = new Set([
    'return',
    'typeof',
    'instanceof',
    'in',
    'of',
    'new',
    'delete',
    'void',
    'throw',
    'case',
    'do',
    'else',
    'yield',
    'await'
])

function isIdentChar(code) {
    return (
        (code >= 97 && code <= 122) || // a-z
        (code >= 65 && code <= 90) || // A-Z
        (code >= 48 && code <= 57) || // 0-9
        code === 36 || // $
        code === 95 || // _
        code > 127
    )
}

function skipQuoted(s, i, limit) {
    const q = s[i]
    let j = i + 1
    while (j < limit) {
        const c = s[j]
        if (c === '\\') {
            j += 2
            continue
        }
        if (c === q) return j + 1
        if (c === '\n') return j
        j++
    }
    return limit
}

function skipTemplate(s, i, limit) {
    let j = i + 1
    while (j < limit) {
        const c = s[j]
        if (c === '\\') {
            j += 2
            continue
        }
        if (c === '`') return j + 1
        if (c === '$' && s[j + 1] === '{') {
            const close = matchBracket(s, j + 1, limit)
            if (close === -1) return limit
            j = close + 1
            continue
        }
        j++
    }
    return limit
}

function skipRegex(s, i, limit) {
    let j = i + 1
    let inClass = false
    while (j < limit) {
        const c = s[j]
        if (c === '\\') {
            j += 2
            continue
        }
        if (c === '\n') return j
        if (inClass) {
            if (c === ']') inClass = false
        } else if (c === '[') inClass = true
        else if (c === '/') {
            j++
            while (j < limit && isIdentChar(s.charCodeAt(j))) j++
            return j
        }
        j++
    }
    return limit
}

// Index of the bracket closing the one at `open`, or -1 when `limit` comes
// first or the brackets do not pair up. Skips strings, template literals
// (including `${…}`), comments and regex literals — minified third-party code
// is full of regexes like /[()]/ that break a plain paren count.
function matchBracket(s, open, limit) {
    let depth = 0
    let regexOk = true
    let i = open
    while (i < limit) {
        const code = s.charCodeAt(i)
        if (code === 32 || code === 10 || code === 13 || code === 9) {
            i++
            continue
        }
        const c = s[i]
        if (c === '"' || c === "'") {
            i = skipQuoted(s, i, limit)
            regexOk = false
            continue
        }
        if (c === '`') {
            i = skipTemplate(s, i, limit)
            regexOk = false
            continue
        }
        if (c === '/') {
            const n = s[i + 1]
            if (n === '/') {
                const e = s.indexOf('\n', i + 2)
                i = e === -1 || e > limit ? limit : e
                continue
            }
            if (n === '*') {
                const e = s.indexOf('*/', i + 2)
                if (e === -1 || e + 2 > limit) return -1
                i = e + 2
                continue
            }
            if (regexOk) {
                i = skipRegex(s, i, limit)
                regexOk = false
                continue
            }
            i++
            regexOk = true
            continue
        }
        if (c === '(' || c === '[' || c === '{') {
            depth++
            i++
            regexOk = true
            continue
        }
        if (c === ')' || c === ']' || c === '}') {
            if (--depth === 0) {
                const o = s[open]
                const paired = (o === '(' && c === ')') || (o === '[' && c === ']') || (o === '{' && c === '}')
                return paired ? i : -1
            }
            i++
            // A `/` after `)` or `]` divides; after a block's `}` a new
            // statement may open with a regex literal.
            regexOk = c === '}'
            continue
        }
        if (isIdentChar(code)) {
            let j = i + 1
            while (j < limit && isIdentChar(s.charCodeAt(j))) j++
            regexOk = REGEX_KEYWORDS.has(s.slice(i, j))
            i = j
            continue
        }
        i++
        regexOk = true
    }
    return -1
}

// Split one file into its registrations and the code around them.
//   registrations: [{ name, text }] — text is the `__d(…)` call itself
//   loose: code outside every registration, trimmed, empties dropped
function splitRegistrations(s) {
    const heads = []
    HEADER_RE.lastIndex = 0
    let m
    while ((m = HEADER_RE.exec(s))) heads.push({ name: m[1], start: m.index })
    if (heads.length === 0) {
        const t = s.trim()
        return { registrations: [], loose: t ? [t] : [] }
    }
    const registrations = []
    const loose = []
    const pre = s.slice(0, heads[0].start).trim()
    if (pre) loose.push(pre)
    for (let h = 0; h < heads.length; h++) {
        const start = heads[h].start
        const limit = h + 1 < heads.length ? heads[h + 1].start : s.length
        // `__d(` → the call's opening paren sits 3 chars in.
        const end = matchBracket(s, start + 3, limit)
        const rest = end === -1 ? null : s.slice(end + 1, limit)
        if (rest !== null && /^\s*(?:;|$)/.test(rest)) {
            registrations.push({ name: heads[h].name, text: s.slice(start, end + 1) })
            const tail = rest.replace(/^\s*;/, '').trim()
            if (tail) loose.push(tail)
        } else {
            // The scan did not land on a `)` followed by `;` — something in
            // the body defeated it. Fall back to everything up to the next
            // registration, which may carry a little trailing junk but never
            // cuts the body short.
            registrations.push({ name: heads[h].name, text: s.slice(start, limit).replace(/[\s;]+$/, '') })
        }
    }
    return { registrations, loose }
}

// Is registration text `a` preferred over `b`? Shortest first, then content.
function preferred(a, b) {
    return a.length !== b.length ? a.length < b.length : a < b
}

// Detach a slice from the file string it came from, so the raw files can be
// garbage-collected once every module has picked its copy.
function detach(s) {
    return Buffer.from(s, 'utf8').toString('utf8')
}

// files: iterable of file texts (strings). Returns the canonical bundle list.
function canonicalizeBundles(texts) {
    const best = new Map() // moduleName → chosen registration text
    const loose = new Set()
    for (const s of texts) {
        const split = splitRegistrations(s)
        for (const r of split.registrations) {
            const cur = best.get(r.name)
            if (cur === undefined || preferred(r.text, cur)) best.set(r.name, r.text)
        }
        for (const l of split.loose) loose.add(l)
    }
    const names = [...best.keys()].sort()
    const bundles = names.map((name) => ({ url: `module:${name}`, text: detach(best.get(name)) }))
    const moduleIndex = new Map(names.map((name, i) => [name, bundles[i]]))
    for (const [i, l] of [...loose].sort().entries()) bundles.push({ url: `loose:${i}`, text: detach(l) })
    Object.defineProperty(bundles, 'moduleIndex', { value: moduleIndex })
    return bundles
}

// Read every `.js` file in `dir` and canonicalize. Files are read one at a
// time; only the chosen copies stay referenced.
function loadCanonicalBundles(dir) {
    const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.js'))
        .sort()
    if (files.length === 0) return []
    function* texts() {
        for (const f of files) yield fs.readFileSync(path.join(dir, f), 'utf8')
    }
    return canonicalizeBundles(texts())
}

module.exports = { loadCanonicalBundles, canonicalizeBundles, splitRegistrations, matchBracket }
