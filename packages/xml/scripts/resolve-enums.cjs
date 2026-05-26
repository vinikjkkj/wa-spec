'use strict'

/**
 * Resolve `enumRef` strings (the JS expression text captured by the static
 * walkers) to concrete value sets, then rewrite each enum leaf in the IR
 * with the resolved `enumValues` array.
 *
 * Enum reference shapes in the wild:
 *   1. `<ld>("WASmaxIn<Mod>Enums").ENUM_<NAME>`
 *        Smax-side parser enum — a flat `{ key: "wire-value" }` object literal.
 *   2. `<ld>("WAWebHandle<Mod>Common").<NAME>`
 *        Handler-side constants module — same flat shape, different naming.
 *   3. `<ld>("Mod.flow").<Type>` / `<ld>("Mod.flow").<Type>.members()`
 *        `$InternalEnum` / Mirrored enum — values via the wrapped flat object.
 *   4. Anything else — leave as-is, `enumValues` stays absent.
 *
 * For each form we locate the module, then find the export's source object
 * (via `l.<NAME>=<var>` or `i.<NAME>=<var>` followed by `var <var>={…}`).
 * Object literals can be plain `{a:"x",b:"y"}` OR wrapped in
 * `n("$InternalEnum")({a:"x",b:"y"})` / `n("$Mirrored")([...])`; both yield
 * the same key→value table when flattened.
 */

const { skipExpr, findModuleRegistration, splitTopLevelCommas } = require('./parser.cjs')

// Parse a flat `{ key: "value", ... }` object literal at `start` (`start`
// points AT the `{`). Returns the string-value pairs as an array, ignoring
// non-string entries (which can appear when the bundle includes computed
// values or call references).
function parseFlatStringObject(text, start) {
    if (text[start] !== '{') return []
    const out = []
    let i = start + 1
    while (i < text.length && text[i] !== '}') {
        // Skip whitespace + commas
        while (i < text.length && (/\s/.test(text[i]) || text[i] === ',')) i++
        if (text[i] === '}') break
        // Key
        let key = null
        if (text[i] === '"' || text[i] === "'") {
            const q = text[i++]
            const st = i
            while (i < text.length && text[i] !== q) {
                if (text[i] === '\\') i++
                i++
            }
            key = text.slice(st, i)
            i++
        } else if (text[i] === '[') {
            i = skipExpr(text, i + 1, [']']) + 1
            while (i < text.length && text[i] !== ':') i++
            if (text[i] === ':') i = skipExpr(text, i + 1, [',', '}'])
            continue
        } else {
            const st = i
            while (i < text.length && /[\w$]/.test(text[i])) i++
            key = text.slice(st, i)
        }
        while (i < text.length && /\s/.test(text[i])) i++
        if (text[i] !== ':') {
            // Shorthand or invalid — skip rest of entry.
            i = skipExpr(text, i, [',', '}'])
            continue
        }
        i++
        while (i < text.length && /\s/.test(text[i])) i++
        if (text[i] === '"' || text[i] === "'") {
            const q = text[i++]
            const st = i
            while (i < text.length && text[i] !== q) {
                if (text[i] === '\\') i++
                i++
            }
            const val = text.slice(st, i)
            if (key) out.push([key, val])
            i++
        } else {
            // Non-string value (likely a JS constant like `ACK.RECEIVED`).
            // For wire-value maps where KEYS are the literal wire strings
            // (`{delivery: ACK.RECEIVED, read: ACK.READ, …}`), the key IS
            // the value that travels on the wire — record it as such.
            if (key) out.push([key, key])
            i = skipExpr(text, i, [',', '}'])
        }
    }
    return out
}

// Locate `var <varName> = ...` AT TOP LEVEL of a module body and return the
// expression source on the RHS (up to the next `,` / `;` / `}`).
function findVarRhs(body, varName) {
    const re = new RegExp(`(?:\\bvar\\s+|[,;{])\\s*${varName}\\s*=\\s*`, 'g')
    let m
    let lastMatch = null
    while ((m = re.exec(body))) lastMatch = m
    if (!lastMatch) return null
    const start = lastMatch.index + lastMatch[0].length
    const end = skipExpr(body, start, [',', ';', '}'])
    return { start, end, text: body.slice(start, end) }
}

// Decode a single var's RHS expression as a flat enum object. Handles all of:
//   {a:"x"}                            → {a: "x"}
//   n("$InternalEnum")({a:"x"})        → {a: "x"}     (factory-wrapped)
//   (e=n("$InternalEnum"))({a:"x"})    → {a: "x"}     (inline-aliased factory)
//   n("$Mirrored")(["A","B"])          → {A: "A", B: "B"} (Mirrored: key==val)
//   n("$Mirrored").Mirrored(["A","B"]) → {A: "A", B: "B"}
//   <other>                            → null
//
// Strategy: for wrapper forms, walk BACKWARDS from the end of the trimmed
// RHS to find the outermost `(...)` argument. That's the enum data —
// everything before is the factory chain we can ignore.
function decodeEnumRhs(body, rhsRange) {
    let text = body.slice(rhsRange.start, rhsRange.end).trim()
    if (!text) return null

    // Plain object literal at the top of the RHS.
    if (text.startsWith('{')) {
        const pairs = parseFlatStringObject(body, rhsRange.start)
        return pairs.length > 0 ? pairs : null
    }

    // Wrapper-call form: the RHS ends with `)`. Locate the matching `(` of
    // that final call by walking parens from the end.
    if (text[text.length - 1] !== ')') return null
    // Find offset of matching `(` for the trailing `)`.
    let depth = 0
    let lastOpen = -1
    for (let i = text.length - 1; i >= 0; i--) {
        const c = text[i]
        if (c === ')') depth++
        else if (c === '(') {
            depth--
            if (depth === 0) { lastOpen = i; break }
        }
    }
    if (lastOpen === -1) return null

    // Position inside the call's arg list.
    let j = lastOpen + 1
    while (j < text.length - 1 && /\s/.test(text[j])) j++

    if (text[j] === '{') {
        const objStart = rhsRange.start + j
        const pairs = parseFlatStringObject(body, objStart)
        return pairs.length > 0 ? pairs : null
    }
    if (text[j] === '[') {
        const arrStart = rhsRange.start + j + 1
        const arrEnd = skipExpr(body, arrStart, [']'])
        const items = splitTopLevelCommas(body, arrStart, arrEnd)
        const out = []
        for (const [a, b] of items) {
            const entry = body.slice(a, b).trim()
            const m = entry.match(/^['"](.*)['"]$/)
            if (m) out.push([m[1], m[1]])
        }
        return out.length > 0 ? out : null
    }
    return null
}

// Resolve `enumRef` to its value set. Recognised shapes:
//   `<ld>("<Mod>").<NAME>`               → exported var trace
//   `<ld>("<Mod>").<NAME>.members()`     → same, then unwrap Mirrored/InternalEnum
//   `<ld>("<Mod>").<NAME>.<subpath>`     → same
//   `n("$InternalEnum")({a:"x",b:"y"})`  → inline factory wrap, parse args
//   `n("$InternalEnum")({...}).members()`→ same
//   `{a:"x", b:"y"}`                     → inline literal
// Returns null when the shape isn't recognised OR the trace fails.
function resolveEnumRef(ref, moduleIndex, cache) {
    if (!ref || typeof ref !== 'string') return null
    if (cache.has(ref)) return cache.get(ref)

    // Inline literal `{...}`
    if (ref.startsWith('{')) {
        const pairs = parseFlatStringObject(ref, 0)
        if (pairs.length > 0) {
            const vals = pairs.map(([, v]) => v).filter((v, i, a) => a.indexOf(v) === i)
            cache.set(ref, vals)
            return vals
        }
    }

    // Inline `<ld>("$InternalEnum"|"$Mirrored")({...})[.members()|.<sub>]`
    // — already carries the full enum data. Strip any trailing
    // `.members()` / `.<id>` suffix so decodeEnumRhs sees the factory call
    // as the trailing-paren expression, then parse it directly.
    if (/^[A-Za-z_$][\w$]*\(\s*"\$(?:InternalEnum|Mirrored)"\s*\)\s*\(/.test(ref)) {
        let stripped = ref.replace(/\.\s*members\s*\(\s*\)\s*$/, '')
        stripped = stripped.replace(/\.\s*[A-Za-z_$][\w$]*\s*$/, '')
        const pairs = decodeEnumRhs(stripped, { start: 0, end: stripped.length })
        if (pairs) {
            const vals = pairs.map(([, v]) => v).filter((v, i, a) => a.indexOf(v) === i)
            cache.set(ref, vals)
            return vals
        }
    }

    // `o("Mod").NAME[.<members()|cast(...)|sub>]` — module export trace.
    // Strip any trailing `.cast(...)` (`InternalEnum`/`Mirrored` runtime
    // conversion) so the export trace still points at the enum table.
    const stripped = ref.replace(/\.\s*cast\s*\([\s\S]*\)\s*$/, '')
    const m = stripped.match(/^[A-Za-z_$][\w$]*\(\s*"([^"]+)"\s*\)\s*\.\s*([A-Za-z_$][\w$]*)\s*(?:\.\s*(?:members\(\)|[A-Za-z_$][\w$]*))?\s*$/)
    if (!m) { cache.set(ref, null); return null }
    const modName = m[1]
    const exportName = m[2]
    const modText = moduleIndex.get(modName)
    if (!modText) { cache.set(ref, null); return null }
    const mod = findModuleRegistration(modText, modName)
    if (!mod) { cache.set(ref, null); return null }
    const body = mod.factoryBody

    const expRe = new RegExp(`\\b[il]\\.${exportName}\\s*=\\s*([A-Za-z_$][\\w$]*)`)
    const expM = body.match(expRe)
    if (!expM) { cache.set(ref, null); return null }
    const varName = expM[1]

    const rhs = findVarRhs(body, varName)
    if (!rhs) { cache.set(ref, null); return null }
    const pairs = decodeEnumRhs(body, rhs)
    if (!pairs) { cache.set(ref, null); return null }
    const values = pairs.map(([, v]) => v).filter((v, i, a) => a.indexOf(v) === i)
    cache.set(ref, values)
    return values
}

// Walk the IR tree and resolve every `enumRef` to `enumValues`. Returns
// `{ resolved, unresolved }` counts.
function resolveEnumsInIR(ir, moduleIndex) {
    const cache = new Map()
    let resolved = 0
    let unresolved = 0
    const unresolvedRefs = new Set()

    function visit(node) {
        if (!node) return
        if (node.attrs) {
            for (const a of Object.values(node.attrs)) {
                if (a.type === 'enum' && a.enumRef && !a.enumValues) {
                    const vals = resolveEnumRef(a.enumRef, moduleIndex, cache)
                    if (vals) {
                        a.enumValues = vals
                        resolved++
                    } else {
                        unresolved++
                        unresolvedRefs.add(a.enumRef)
                    }
                }
            }
        }
        if (node.content && node.content.type === 'enum' && node.content.enumRef && !node.content.enumValues) {
            const vals = resolveEnumRef(node.content.enumRef, moduleIndex, cache)
            if (vals) {
                node.content.enumValues = vals
                resolved++
            } else {
                unresolved++
                unresolvedRefs.add(node.content.enumRef)
            }
        }
        if (Array.isArray(node.children)) for (const c of node.children) visit(c)
    }

    for (const op of Object.values(ir.operations || {})) {
        if (op.request?.node) visit(op.request.node)
        for (const r of op.responses || []) visit(r.node)
    }
    for (const entry of Object.values(ir.stanzas || {})) {
        if (entry.variants) {
            for (const v of Object.values(entry.variants)) {
                if (v?.node) visit(v.node)
            }
        } else if (entry.node) {
            visit(entry.node)
        }
    }

    return { resolved, unresolved, unresolvedRefs: [...unresolvedRefs] }
}

module.exports = { resolveEnumsInIR, resolveEnumRef, decodeEnumRhs, parseFlatStringObject }
