'use strict'

/**
 * Discover server-side enum value sets from bundle source.
 *
 * WA Web ships several enum modules that declare wire-format value sets
 * literally. The richest pattern is `<X>.Mirrored([...])` — used by
 * `$InternalEnum.Mirrored`, where the array values ARE the wire-format
 * strings (Mirrored means the JS enum key === string value, mirroring the
 * server format). Examples in [WAWebCommonNewsletterEnums]:
 *
 *   EnforcementType        = e.Mirrored(["GEOSUSPEND","SUSPEND","VIOLATING_MSG", ...])
 *   WamoSubStatus          = e.Mirrored(["ACTIVE","INACTIVE"])
 *   ReviewType             = e.Mirrored(["ENFORCEMENT","REPORT","RESPONSE_REPORT","STATUS_REPORT"])
 *   ViolatingContentType   = e.Mirrored(["MESSAGE","STATUS"])
 *   AlertScreen            = e.Mirrored(["SUSPENDED_DETAILED_SCREEN", ...])
 *
 * Each module also has `i.<ExportedName>=<localVar>` lines that link the
 * local var (e.g. `d`) to its canonical name (e.g. `EnforcementType`). We
 * resolve those to build a registry keyed by exported name.
 *
 * Pure-string `e({K1:"v1",K2:"v2"})` enums are also indexed (values are
 * the wire format) but skipped when values look like internal IDs (numbers)
 * or non-UPPER_SNAKE strings, since those don't match what the wire sends.
 *
 * Returned: { [ExportedName]: { values: string[], source: moduleName } }
 */

const { iterModuleHeaders } = require('./parser.cjs')

function findModuleBody(text, modName) {
    const needle = `__d("${modName}"`
    const idx = text.indexOf(needle)
    if (idx === -1) return null
    let depth = 0
    for (let i = idx; i < text.length; i++) {
        if (text[i] === '(') depth++
        else if (text[i] === ')') {
            if (--depth === 0) return text.slice(idx, i + 1)
        }
    }
    return null
}

function discoverEnums(bundles) {
    const index = Object.create(null)

    for (const bundle of bundles) {
        for (const h of iterModuleHeaders(bundle.text)) {
            // Only modules whose name looks like it might host enums — Common*Enums,
            // *Schema*, *Constants, *Types* — but also catch arbitrary modules
            // that happen to declare Mirrored arrays. Cheaper to just scan everything
            // and bound by Mirrored() pattern presence.
            const body = findModuleBody(bundle.text, h.name)
            if (!body) continue
            if (!body.includes('Mirrored(') && !body.includes('switch(') && !body.includes('switch (')) {
                if (!/i\.[A-Z][\w$]*\s*=/.test(body)) continue
            }

            // localVar → { values: [...], kind }
            const locals = Object.create(null)

            // 1) Mirrored arrays — `<x>.Mirrored([...])`
            const mirroredRe = /\b([a-zA-Z_$][\w$]*)\s*=\s*[a-zA-Z_$][\w$]*\.Mirrored\s*\(\s*\[([\s\S]*?)\]\s*\)/g
            let m
            while ((m = mirroredRe.exec(body))) {
                const localVar = m[1]
                const values = [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1])
                if (values.length >= 2) {
                    locals[localVar] = { values, kind: 'mirrored' }
                }
            }

            // 2) Pure-string object enums. Find every `({K1:"v1",K2:"v2",...})`
            // call argument and walk back to find the LHS variable being assigned.
            // Catches patterns like:
            //   l=(e=n("$InternalEnum"))({Subscriber:"subscriber",Admin:"admin",...})
            //   c = e({Active:"active",Suspended:"suspended"})
            //   const ROLE = $InternalEnum({Admin:"admin",Member:"member"})
            const objArgRe = /\(\s*\{([^{}]{6,500})\}\s*\)/g
            while ((m = objArgRe.exec(body))) {
                const inner = m[1]
                if (!/^[\s,]*[A-Za-z_$][\w$]*\s*:\s*"/.test(inner)) continue
                const pairs = [...inner.matchAll(/(?:^|,)\s*([A-Za-z_$][\w$]*)\s*:\s*"([^"]+)"\s*(?=,|$)/g)]
                if (pairs.length < 2) continue
                const allUpper = pairs.every((p) => /^[A-Z][A-Z0-9_]*$/.test(p[2]))
                const allLower = pairs.every((p) => /^[a-z][a-z0-9_]*$/.test(p[2]))
                if (!allUpper && !allLower) continue
                // Walk backward to find the assignment `=` that owns this object
                // literal call. Skip strings + balanced parens so we don't get
                // confused by `(e=n("$InternalEnum"))` setup.
                let i = m.index - 1
                let dp = 0
                let foundEq = -1
                while (i >= 0) {
                    const c = body[i]
                    if (c === '"' || c === "'") {
                        i--
                        while (i >= 0 && body[i] !== c) {
                            if (i > 0 && body[i - 1] === '\\') i--
                            i--
                        }
                        i--
                        continue
                    }
                    if (c === ')') dp++
                    else if (c === '(') {
                        if (dp === 0) break
                        dp--
                    } else if (dp === 0 && c === '=') {
                        foundEq = i
                        break
                    } else if (dp === 0 && (c === ',' || c === ';' || c === '{' || c === '\n')) {
                        break
                    }
                    i--
                }
                if (foundEq < 0) continue
                // body[foundEq] is `=`. Walk back over whitespace + identifier.
                let j = foundEq - 1
                while (j >= 0 && /\s/.test(body[j])) j--
                const lhsEnd = j + 1
                while (j >= 0 && /[\w$]/.test(body[j])) j--
                const localVar = body.slice(j + 1, lhsEnd)
                if (!/^[A-Za-z_$][\w$]*$/.test(localVar)) continue
                if (locals[localVar]) continue
                const values = pairs.map((p) => p[2])
                locals[localVar] = { values, kind: 'string-object' }
            }

            // 3) Resolve exports: `i.<Name>=<localVar>` (or chained: `i.A=l,i.B=s,...`)
            const exportRe = /\bi\s*\.\s*([A-Z][\w$]*)\s*=\s*([a-zA-Z_$][\w$]*)\b/g
            while ((m = exportRe.exec(body))) {
                const exportedName = m[1]
                const localVar = m[2]
                const enumData = locals[localVar]
                if (!enumData) continue
                // Don't overwrite a previously-found enum with same name unless this
                // one has MORE values (defensive).
                const prev = index[exportedName]
                if (prev && prev.values.length >= enumData.values.length) continue
                index[exportedName] = {
                    values: enumData.values.slice().sort(),
                    source: h.name,
                    kind: enumData.kind
                }
            }

            // 4) Switch-to-enum conversion functions: when a function body has
            //    switch(<v>) { case "VAL1": return <X>.<Y1>;
            //                   case "VAL2": return <X>.<Y2>; ... }
            // and `<X>` is consistent across the returned cases (or its
            // require-target `o("WAWebFoo").<X>.<Y>` is consistent), we treat the
            // case literals as wire-format values for `<X>`. This recovers enums
            // like NewsletterCapability where the underlying JS object uses
            // numeric values but the conversion fn maps server UPPER_SNAKE strings.
            const switchRe = /\bswitch\s*\(\s*[a-zA-Z_$][\w$]*\s*\)\s*\{/g
            while ((m = switchRe.exec(body))) {
                const swStart = m.index + m[0].length - 1 // position of `{`
                // find matching `}`
                let k = swStart + 1
                let depth = 1
                while (k < body.length && depth > 0) {
                    const c = body[k]
                    if (c === '"' || c === "'" || c === '`') {
                        const q = c
                        k++
                        while (k < body.length && body[k] !== q) {
                            if (body[k] === '\\') k++
                            k++
                        }
                    } else if (c === '{') depth++
                    else if (c === '}') depth--
                    k++
                }
                const swBody = body.slice(swStart + 1, k - 1)
                // Find case "X": return <X>.<Y>...  pattern. Use a per-arm regex.
                const armRe = /case\s*"([^"]+)"\s*:\s*return\s+(?:[a-zA-Z_$][\w$]*\s*\(\s*"[^"]+"\s*\)\s*\.\s*)?([A-Z][\w$]*)\s*\.\s*[a-zA-Z_$][\w$]*/g
                const enumValuesByName = Object.create(null) // enumName → [values]
                let am
                while ((am = armRe.exec(swBody))) {
                    const caseLiteral = am[1]
                    const enumName = am[2]
                    if (!/^[A-Z][A-Z0-9_]*$/.test(caseLiteral)) continue
                    ;(enumValuesByName[enumName] = enumValuesByName[enumName] || []).push(caseLiteral)
                }
                for (const [enumName, vals] of Object.entries(enumValuesByName)) {
                    if (vals.length < 2) continue
                    const unique = [...new Set(vals)].sort()
                    const prev = index[enumName]
                    // If we already have a `mirrored` entry, leave it (Mirrored is
                    // the authoritative declaration). Otherwise prefer this
                    // switch-derived set over numeric/string-object kinds because
                    // it captures the WIRE format.
                    if (prev && prev.kind === 'mirrored' && prev.values.length >= unique.length) continue
                    index[enumName] = { values: unique, source: h.name, kind: 'mirrored' }
                }
            }
        }
    }

    return index
}

// Generate candidate canonical names from a field path. Tries:
//   - snake_case_name → CamelCase
//   - parent + field
//   - plural → singular (capabilities → Capability)
//   - drop common suffix (`_type` → bare name; `enforcement_type` already covered)
//   - common prefixes (`newsletter_state` → NewsletterState; also bare `State` and
//     parent-context `Newsletter` + `State`)
function candidateEnumNames(parents, fieldName) {
    const out = new Set()
    const toCamel = (s) =>
        String(s)
            .split('_')
            .filter(Boolean)
            .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
            .join('')

    const singularize = (s) => {
        if (/ies$/.test(s)) return s.slice(0, -3) + 'y'
        if (/sses$/.test(s)) return s.slice(0, -2)
        if (/s$/.test(s) && !/ss$/.test(s)) return s.slice(0, -1)
        return s
    }

    // Strip the WA Mex namespace prefix from a parent token (xwa2_, xwa_).
    const stripNs = (s) => String(s).replace(/^xwa2?_/, '')
    // Tokenize a snake-case parent into its meaningful words. E.g.
    // `xwa2_newsletter_admin` → ['newsletter', 'admin'].
    const tokens = (s) => stripNs(s).split('_').filter(Boolean)

    // Field-only and singularized
    out.add(toCamel(fieldName))
    out.add(toCamel(singularize(fieldName)))

    if (parents.length > 0) {
        const last = parents[parents.length - 1]
        out.add(toCamel(last) + toCamel(fieldName))
        out.add(toCamel(last) + toCamel(singularize(fieldName)))
        // Parent-only and parent-singularized matches for generic fields.
        if (/^(?:type|status|kind|state|mode|category|format)$/.test(fieldName)) {
            out.add(toCamel(singularize(last)) + toCamel(fieldName))
            out.add(toCamel(singularize(last)))
        }
        // Try each parent token in isolation + field, since the immediate
        // parent might be a wrapper (e.g. `xwa2_newsletter_admin.capabilities`
        // → try `Newsletter` + `Capability` = `NewsletterCapability`).
        for (const p of parents) {
            for (const tok of tokens(p)) {
                out.add(toCamel(tok) + toCamel(fieldName))
                out.add(toCamel(tok) + toCamel(singularize(fieldName)))
            }
        }
    }

    return [...out]
}

// Try to attach an enum from the index to a given leaf path. Returns the enum
// values array if matched, else null.
//
// Filters by `kind`: only Mirrored enums are wire-format (UPPER_SNAKE). The
// `string-object` kind tends to be the JS internal representation (camelCase
// keys, lowercase values) which doesn't match the wire — we'd produce wrong
// types. Mirrored arrays in WA Web are explicitly declared to mirror the
// server format, so they're safe.
function matchEnumForLeaf(parents, fieldName, index) {
    const cands = candidateEnumNames(parents, fieldName)
    for (const c of cands) {
        const entry = index[c]
        if (entry && entry.kind === 'mirrored') {
            return { name: c, values: entry.values, source: entry.source }
        }
    }
    return null
}

module.exports = { discoverEnums, candidateEnumNames, matchEnumForLeaf }
