'use strict'

/**
 * Second-chance typing for response leaves the main inference left `unknown`.
 *
 * The main pass reads the op's caller and its direct consumers. Plenty of
 * fields are only ever read further away: Relay fragments are read by the
 * component that declares them, the data is handed down to renderers as
 * props, or a mapper renames it (`naturalLanguageSchedule:
 * e.natural_language_schedule`) before a drawer or formatter touches it. So
 * this pass widens the search to the op's feature neighborhood:
 *
 *   - the consumers of every fragment the operation spreads (recursively),
 *   - plus the op's callers, and modules of the same feature (same name
 *     prefix, e.g. `WAWebOrgAdmin*`, `MAIBA*`) within three dependency hops in
 *     either direction.
 *
 * A wider net catches unrelated reads of the same name, so only unambiguous
 * evidence counts: comparisons with string / boolean literals, `typeof`,
 * `!== ""`, string-only methods, `.join()` on a list, arithmetic and numeric
 * comparisons, and null defaults (`(t=x.f)!=null?t:""`). A local bound to the
 * field is followed only inside its own function (minified names are reused
 * everywhere). The field is also followed into local helper functions it is
 * passed to (`fe(i.gid,…,i.creation_timestamp_s)`), through camelCase renames
 * (`{creationTimestampS:n}`, `rosterPartial:a`), and — for a distinctive
 * multi-word renamed key read in at most eight modules bundle-wide — to
 * wherever that key is read.
 *
 * Nothing already typed is touched, and a field whose evidence conflicts stays
 * `unknown`.
 */

const RB = '(?![\\w$])'
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function skipStr(s, i) {
    const q = s[i]
    for (i++; i < s.length; i++) {
        if (s[i] === '\\') {
            i++
            continue
        }
        if (s[i] === q) return i + 1
    }
    return s.length
}

// Index of the `}` closing the block that encloses `from` (bounded by `cap`).
function scopeEnd(s, from, cap = 4000) {
    let d = 0
    const lim = Math.min(s.length, from + cap)
    for (let i = from; i < lim; i++) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') {
            i = skipStr(s, i) - 1
            continue
        }
        if (c === '{') d++
        else if (c === '}') {
            if (d === 0) return i
            d--
        }
    }
    return lim
}

function matchBrace(s, open) {
    let d = 0
    for (let i = open; i < s.length; i++) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') {
            i = skipStr(s, i) - 1
            continue
        }
        if (c === '{') d++
        else if (c === '}' && --d === 0) return i
    }
    return -1
}

// Arguments of the call whose `(` is at `open`, as source slices.
function splitArgs(s, open) {
    const args = []
    let d = 0
    let start = open + 1
    for (let i = open; i < s.length; i++) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') {
            i = skipStr(s, i) - 1
            continue
        }
        if (c === '(' || c === '[' || c === '{') {
            d++
            continue
        }
        if (c === ')' || c === ']' || c === '}') {
            d--
            if (d === 0) {
                args.push(s.slice(start, i))
                return args
            }
            continue
        }
        if (c === ',' && d === 1) {
            args.push(s.slice(start, i))
            start = i + 1
        }
    }
    return null
}

const emptySaw = () => ({ string: [], number: [], boolean: [], stringList: [], enum: new Set() })

// Accumulate unambiguous evidence for the expression pattern `A` in `text`.
function collect(text, A, saw) {
    const tests = [
        [new RegExp(`${A}\\s*[!=]==\\s*"([A-Za-z][A-Za-z0-9_]*)"`, 'g'), (m) => saw.enum.add(m[1])],
        [new RegExp(`"([A-Za-z][A-Za-z0-9_]*)"\\s*[!=]==\\s*${A}`, 'g'), (m) => saw.enum.add(m[1])],
        [new RegExp(`typeof\\s+${A}\\s*[!=]==?\\s*"(string|number|boolean)"`, 'g'), (m) => saw[m[1]].push('typeof')],
        [new RegExp(`${A}\\s*[!=]==\\s*(?:!0|!1|true|false)${RB}`, 'g'), () => saw.boolean.push('=== bool')],
        [new RegExp(`${A}\\s*[!=]==\\s*""`, 'g'), () => saw.string.push('=== ""')],
        [
            new RegExp(
                `${A}\\s*\\.\\s*(?:toLowerCase|toUpperCase|trim|trimStart|trimEnd|split|startsWith|endsWith|charAt|charCodeAt|substring|substr|padStart|padEnd|localeCompare|normalize)\\s*\\(`,
                'g'
            ),
            () => saw.string.push('string method')
        ],
        [
            new RegExp(`${A}\\s*\\)?\\s*(?:!=\\s*null\\s*\\?\\s*[A-Za-z_$][\\w$]*\\s*:\\s*\\[\\]\\s*\\))?\\s*\\.\\s*join\\s*\\(`, 'g'),
            () => saw.stringList.push('.join()')
        ],
        [new RegExp(`${A}\\s*[*/%-]\\s*\\d`, 'g'), () => saw.number.push('arithmetic')],
        [new RegExp(`\\d\\s*[*/%]\\s*${A}`, 'g'), () => saw.number.push('arithmetic')],
        [new RegExp(`_plural\\(\\s*${A}\\s*,\\s*"number"`, 'g'), () => saw.number.push('_plural number')],
        // defaulted when null: `(t=A)!=null?t:""` / `A??""` (and 0 / booleans)
        [
            new RegExp(`\\(\\s*([A-Za-z_$][\\w$]*)\\s*=\\s*${A}\\s*\\)\\s*!=\\s*null\\s*\\?\\s*\\1\\s*:\\s*(""|-?\\d[\\d.]*|!0|!1)(?![\\w$.])`, 'g'),
            (m) => (m[2] === '""' ? saw.string : /^!/.test(m[2]) ? saw.boolean : saw.number).push('null default')
        ],
        [
            new RegExp(`${A}\\s*\\?\\?\\s*(""|-?\\d[\\d.]*|!0|!1|true|false)(?![\\w$.])`, 'g'),
            (m) => (m[1] === '""' ? saw.string : /^(?:!|true|false)/.test(m[1]) ? saw.boolean : saw.number).push('?? default')
        ],
        [
            new RegExp(`${A}\\s*!=\\s*null\\s*\\?\\s*${A}\\s*:\\s*(""|-?\\d[\\d.]*|!0|!1)(?![\\w$.])`, 'g'),
            (m) => (m[1] === '""' ? saw.string : /^!/.test(m[1]) ? saw.boolean : saw.number).push('null default')
        ],
        // Converted from a numeric string, as the global scalar scan in
        // enum-discovery also reads it: `Number.parseInt(e,10)`, `Number(e)`.
        [new RegExp(`(?:Number\\.)?(?:parseInt|parseFloat)\\s*\\(\\s*${A}`, 'g'), () => saw.string.push('parsed as a number')],
        [new RegExp(`(?<![\\w$.])Number\\s*\\(\\s*${A}\\s*\\)`, 'g'), () => saw.string.push('parsed as a number')],
        [new RegExp(`JSON\\.parse\\s*\\(\\s*${A}\\s*[,)]`, 'g'), () => saw.string.push('JSON.parse')],
        [new RegExp(`${A}\\s*(?:<=|>=|<|>)\\s*-?\\d`, 'g'), () => saw.number.push('numeric comparison')],
        [new RegExp(`-?\\d\\s*(?:<=|>=|<|>)\\s*${A}`, 'g'), () => saw.number.push('numeric comparison')],
        [new RegExp(`${A}\\s*\\.\\s*toFixed\\s*\\(`, 'g'), () => saw.number.push('toFixed')]
    ]
    for (const [re, fn] of tests) {
        let m
        while ((m = re.exec(text))) fn(m)
    }
    // switch(A){case"X":…}
    const sw = new RegExp(`switch\\s*\\(\\s*${A}\\s*\\)\\s*\\{`, 'g')
    let m
    while ((m = sw.exec(text))) {
        const open = m.index + m[0].length - 1
        const close = matchBrace(text, open)
        if (close === -1) continue
        for (const c of text.slice(open + 1, close).matchAll(/case\s*"([A-Za-z][A-Za-z0-9_]*)"\s*:/g)) saw.enum.add(c[1])
    }
}

// Collapse evidence into a leaf tag, or null when there is none or it
// conflicts. A string-serialized enum (literals + string signals) is fine; a
// lone literal is just `string` — one value is no evidence of a closed set.
function verdict(saw) {
    const core = []
    if (saw.number.length) core.push('number')
    if (saw.boolean.length) core.push('boolean')
    if (saw.stringList.length) core.push('stringList')
    const stringy = saw.enum.size > 0 || saw.string.length > 0
    if (core.length > 1 || (core.length === 1 && stringy)) return null
    if (saw.stringList.length) return ['string']
    if (saw.number.length) return 'number'
    if (saw.boolean.length) return 'boolean'
    if (saw.enum.size >= 2) return 'enum:' + [...saw.enum].sort().join('|')
    return stringy ? 'string' : null
}

// Evidence for `.field` in a whole body, plus locals bound to it (followed
// only within their own function).
function classifyField(body, field) {
    if (!body || !body.includes(field)) return null
    const saw = emptySaw()
    const f = esc(field)
    collect(body, `(?:[A-Za-z_$][\\w$]*\\??\\.${f}${RB})`, saw)
    const bindRe = new RegExp(
        `(?<![\\w$.])([A-Za-z_$][\\w$]*)\\s*=\\s*(?:\\([^()]*\\)\\s*==\\s*null\\s*\\?\\s*void 0\\s*:\\s*)?[A-Za-z_$][\\w$]*\\??\\.${f}${RB}(?!\\s*\\()`,
        'g'
    )
    let m
    while ((m = bindRe.exec(body))) {
        const from = m.index + m[0].length
        collect(body.slice(from, scopeEnd(body, from)), `(?:(?<![\\w$.])${esc(m[1])}${RB})`, saw)
    }
    // The client building an object of the same type (optimistic entities:
    // `{…,blocks_json:JSON.stringify([…]),is_pill_hidden:!0}`). Only for
    // distinctive snake_case names — a bare `status:"x"` could be anything.
    if (field.includes('_') && field.length >= 6) {
        const buildRe = new RegExp(`[{,]\\s*${f}\\s*:\\s*(JSON\\.stringify\\s*\\(|"[^"]*"(?=\\s*[,}])|!0|!1|-?\\d[\\d.]*(?=\\s*[,}]))`, 'g')
        while ((m = buildRe.exec(body))) {
            const v = m[1]
            if (v.startsWith('JSON') || v.startsWith('"')) saw.string.push('built as string')
            else if (v.startsWith('!')) saw.boolean.push('built as boolean')
            else saw.number.push('built as number')
        }
    }
    return verdict(saw)
}

// `.field` passed as the k-th argument of a function declared in the same
// body: yields that function's body and the matching parameter name.
function positionalFlows(body, field) {
    const out = []
    if (!body || !body.includes(field)) return out
    const argRe = new RegExp(`^\\s*(?:\\(\\s*[A-Za-z_$][\\w$]*\\s*=\\s*)?[A-Za-z_$][\\w$]*\\??\\.${esc(field)}\\s*\\)?\\s*$`)
    const declRe = /function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/g
    let d
    while ((d = declRe.exec(body))) {
        const params = d[2].split(',').map((p) => p.trim())
        const open = d.index + d[0].length - 1
        const close = matchBrace(body, open)
        if (close === -1) continue
        const fnBody = body.slice(open + 1, close)
        const callRe = new RegExp(`(?<![\\w$.])${esc(d[1])}\\s*\\(`, 'g')
        let c
        while ((c = callRe.exec(body))) {
            if (c.index === d.index + 'function '.length) continue
            const args = splitArgs(body, c.index + c[0].length - 1)
            if (!args) continue
            args.forEach((a, k) => {
                if (params[k] && argRe.test(a)) out.push({ fnBody, param: params[k] })
            })
        }
    }
    return out
}

// The same, across modules: `.field` passed to another module's export,
// `o("Mod").fn(…,x.field,…)` / `r("Mod")(…)`. `text(name)` resolves bodies.
function crossModuleFlows(body, field, text) {
    const out = []
    if (!body || !body.includes(field)) return out
    const argRe = new RegExp(`^\\s*(?:\\(\\s*[A-Za-z_$][\\w$]*\\s*=\\s*)?[A-Za-z_$][\\w$]*\\??\\.${esc(field)}\\s*\\)?\\s*$`)
    const callRe = /[A-Za-z_$][\w$]*\(\s*"([^"]+)"\s*\)(?:\s*\.\s*([A-Za-z_$][\w$]*))?\s*\(/g
    let c
    while ((c = callRe.exec(body))) {
        const args = splitArgs(body, c.index + c[0].length - 1)
        if (!args || !args.some((a) => argRe.test(a))) continue
        const modText = text(c[1])
        if (!modText) continue
        const exportName = c[2] || 'default'
        const ex = modText.match(new RegExp(`(?<![\\w$])[li]\\.${esc(exportName)}\\s*=\\s*([A-Za-z_$][\\w$]*)${RB}`))
        if (!ex) continue
        const decl = modText.match(new RegExp(`function\\s+${esc(ex[1])}\\s*\\(([^)]*)\\)\\s*\\{`))
        if (!decl) continue
        const open = decl.index + decl[0].length - 1
        const close = matchBrace(modText, open)
        if (close === -1) continue
        const params = decl[1].split(',').map((p) => p.trim())
        const fnBody = modText.slice(open + 1, close)
        args.forEach((a, k) => {
            if (params[k] && argRe.test(a)) out.push({ fnBody, param: params[k] })
        })
    }
    return out
}

const VERBS = /^(?:Fetch|Get|Load|Query|Set|Update|Create|Delete|Send|Handle|Use|Resolve)(?=[A-Z])/
const stripName = (n) =>
    n
        .replace(/\.react$|\.graphql$/, '')
        .replace(/^WAWeb|^WA(?=[A-Z][a-z])/, '')
        .replace(/^use(?=[A-Z])/, '')
        .replace(VERBS, '')
function featureToken(name) {
    const m = stripName(name).match(/^[A-Z]+(?=[A-Z][a-z]|$)|^[A-Z][a-z0-9]+/)
    return m ? m[0] : null
}

// A renamed key worth following: multi-word camelCase, not a generic word.
const distinctRename = (k) => k.length >= 6 && /^[a-z][a-z0-9]*[A-Z]/.test(k)

// graph: { text(name) → body|null, deps(name) → iterable, dependents(name) →
// iterable, readers(key) → module names reading `.key` bundle-wide, or null
// when a bundle-wide scan is not available, invariant(name) → curated
// schema-convention tag or null }
function makeRecoverer(graph) {
    const hoodCache = new Map()
    function neighborhood(gqlName) {
        if (hoodCache.has(gqlName)) return hoodCache.get(gqlName)
        const seeds = new Set(graph.dependents(gqlName))
        const seenFrag = new Set()
        const spreads = (t) => [...(t || '').matchAll(/kind:"FragmentSpread",name:"([^"]+)"/g)].map((m) => m[1])
        const q = spreads(graph.text(gqlName))
        while (q.length) {
            const f = q.shift()
            if (seenFrag.has(f)) continue
            seenFrag.add(f)
            for (const c of graph.dependents(f + '.graphql')) seeds.add(c)
            q.push(...spreads(graph.text(f + '.graphql')))
        }
        const tokens = [...new Set([...seeds].map(featureToken).filter(Boolean))]
        const out = new Set(seeds)
        let frontier = [...seeds]
        for (let h = 0; h < 3 && out.size <= 300; h++) {
            const next = []
            for (const m of frontier) {
                for (const n of [...graph.deps(m), ...graph.dependents(m)]) {
                    if (out.has(n) || n.endsWith('.graphql')) continue
                    if (!tokens.some((t) => stripName(n).startsWith(t))) continue
                    out.add(n)
                    next.push(n)
                }
            }
            frontier = next
        }
        const mods = [...out].sort().filter((n) => graph.text(n))
        hoodCache.set(gqlName, mods)
        return mods
    }

    // Evidence for `name` in `mods`: direct reads first, then the parameter it
    // is passed into (same-module helper or another module's export). Renames
    // of that parameter (`{creationTimestampS:n}`) are added to `renames`.
    function classifyIn(name, mods, renames) {
        for (const m of mods) {
            const tag = classifyField(graph.text(m), name)
            if (tag) return tag
        }
        for (const m of mods) {
            const body = graph.text(m)
            for (const fl of [...positionalFlows(body, name), ...crossModuleFlows(body, name, graph.text)]) {
                const saw = emptySaw()
                collect(fl.fnBody, `(?:(?<![\\w$.])${esc(fl.param)}${RB})`, saw)
                const tag = verdict(saw)
                if (tag) return tag
                if (!renames) continue
                const rr = new RegExp(`([A-Za-z_$][\\w$]*)\\s*:\\s*${esc(fl.param)}${RB}`, 'g')
                let r
                while ((r = rr.exec(fl.fnBody))) renames.add(r[1])
            }
        }
        return null
    }

    function recoverField(field, mods) {
        const renames = new Set()
        const direct = classifyIn(field, mods, renames)
        if (direct) return direct
        const renameRe = new RegExp(
            `([A-Za-z_$][\\w$]*)\\s*:\\s*(?:\\(\\s*[A-Za-z_$][\\w$]*\\s*=\\s*)?[A-Za-z_$][\\w$]*(?:\\s*==\\s*null\\s*\\?\\s*void 0\\s*:\\s*[A-Za-z_$][\\w$]*)?\\??\\.${esc(field)}${RB}`,
            'g'
        )
        for (const m of mods) {
            const t = graph.text(m)
            let r
            while ((r = renameRe.exec(t))) if (r[1] !== field) renames.add(r[1])
        }
        const distinct = [...renames].sort().filter(distinctRename)
        for (const key of distinct) {
            const inHood = classifyIn(key, mods, null)
            if (inHood) return inHood
            const readers = graph.readers ? graph.readers(key) : null
            if (!readers || readers.length === 0 || readers.length > 8) continue
            const global = classifyIn(key, readers, null)
            if (global) return global
        }
        // Last resort, as for the original names: the curated schema
        // conventions applied to what the client renamed the field to
        // (`business_profile_image` → `profilePictureUrl`).
        if (graph.invariant) {
            for (const key of distinct) {
                const tag = graph.invariant(key)
                if (tag) return tag
            }
        }
        return null
    }

    // Fill `unknown` leaves of `response` in place; returns how many.
    return function recoverUnknownLeaves(response, gqlName) {
        let recovered = 0
        let mods = null
        const walk = (node, parentKey) => {
            if (!node || typeof node !== 'object') return
            if (Array.isArray(node)) {
                if (node[0] === 'unknown') {
                    // A list of unknown scalars: the field is the list's key.
                    mods = mods || neighborhood(gqlName)
                    const tag = parentKey ? recoverField(parentKey, mods) : null
                    if (tag) {
                        node[0] = Array.isArray(tag) ? tag[0] : tag
                        recovered++
                    }
                } else walk(node[0], parentKey)
                return
            }
            for (const [k, v] of Object.entries(node)) {
                if (v === 'unknown') {
                    mods = mods || neighborhood(gqlName)
                    const tag = recoverField(k, mods)
                    if (tag) {
                        node[k] = tag
                        recovered++
                    }
                } else walk(v, k)
            }
        }
        walk(response, null)
        return recovered
    }
}

module.exports = { makeRecoverer, classifyField, positionalFlows }
