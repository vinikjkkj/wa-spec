'use strict'

/**
 * Static Proto extractor — operates on bundle texts (no browser runtime).
 *
 * Each `WAWebProtobufsX.pb` module follows a consistent shape:
 *
 *   __d("Name.pb", ["$InternalEnum", "WAProtoConst", ...others], function(t,n,r,o,a,i,l) {
 *       // Aliases (positions vary but resolvable from the deps array):
 *       //   $InternalEnum  → some fn  (call it `s`)
 *       //   WAProtoConst   → object with .TYPES / .FLAGS (call it `e`)
 *       //   <Other.pb>     → imported spec module (call it `c`)
 *
 *       var X = s({KEY_A: 0, KEY_B: 1})                    // enum literal
 *       var Y = {}; Y.name = "Foo"; Y.internalSpec = {...} // message definition
 *
 *       l.FooSpec       = Y                                // export message
 *       l.Parent$EnumName = X                              // export enum
 *   })
 *
 * Field descriptor in internalSpec is `[tag, typeByte, ref?]` where typeByte
 * combines low 6 bits = primitive (1..18) with FLAGS bit 64 = REPEATED,
 * bit 128 = PACKED, bit 256 = REQUIRED. In the source the type byte is
 * usually written as an expression `e.TYPES.X` or `e.FLAGS.Y | e.TYPES.X`
 * — we resolve those by recognising the alias to WAProtoConst.
 *
 * Output:
 *   A proto3 SDL string (the full `WAProto.proto` contents).
 *
 *   Nested messages and enums are emitted inside their parent (qualified
 *   names like "Parent.Nested" → `message Nested {}` inside `message Parent`).
 *   All scalar fields are `optional`; arrays are `repeated` with `[packed=true]`
 *   when the runtime flag was set.
 */

const { skipExpr, skipWs, iterModuleHeaders } = require('./parser.cjs')

const PROTO_TYPE_NAMES = {
    1: 'int32',
    2: 'int64',
    3: 'uint32',
    4: 'uint64',
    5: 'sint32',
    6: 'sint64',
    7: 'bool',
    8: 'ENUM',
    9: 'fixed64',
    10: 'sfixed64',
    11: 'double',
    12: 'string',
    13: 'bytes',
    14: 'MESSAGE',
    15: 'fixed32',
    16: 'sfixed32',
    17: 'float',
    18: 'MAP'
}
const PROTO_TYPE_KEYS = {
    INT32: 1, INT64: 2, UINT32: 3, UINT64: 4, SINT32: 5, SINT64: 6, BOOL: 7,
    ENUM: 8, FIXED64: 9, SFIXED64: 10, DOUBLE: 11, STRING: 12, BYTES: 13,
    MESSAGE: 14, FIXED32: 15, SFIXED32: 16, FLOAT: 17, MAP: 18
}
const PROTO_FLAG_KEYS = { REPEATED: 64, PACKED: 128, REQUIRED: 256 }
const FLAG_REPEATED = 64
const FLAG_PACKED = 128
const FLAG_REQUIRED = 256
const TYPE_MASK = 0x3f

// Locate a __d("Name", ...) registration body in bundle texts.
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

// Parse the deps array of a __d header.
function parseDeps(body) {
    const start = body.indexOf('[')
    if (start === -1) return []
    const end = skipExpr(body, start + 1, [']'])
    const text = body.slice(start + 1, end)
    return [...text.matchAll(/"([^"]+)"/g)].map((m) => m[1])
}

// Extract the factory function parameter names: `function(t,n,r,o,a,i,l)` → ['t','n','r','o','a','i','l'].
function parseFactoryParams(body) {
    const fnMatch = body.match(/function\s*\(([^)]*)\)/)
    if (!fnMatch) return []
    return fnMatch[1].split(',').map((p) => p.trim()).filter(Boolean)
}

// Find the inner factory body (after `function(...) {` and before its matching `}`).
function getFactoryBody(body) {
    const fnIdx = body.search(/function\s*\(/)
    if (fnIdx === -1) return null
    const braceIdx = body.indexOf('{', fnIdx)
    if (braceIdx === -1) return null
    let depth = 1
    let i = braceIdx + 1
    while (i < body.length && depth > 0) {
        const c = body[i]
        if (c === '"' || c === "'" || c === '`') {
            i++
            while (i < body.length && body[i] !== c) {
                if (body[i] === '\\') i++
                i++
            }
            i++
            continue
        }
        if (c === '{') depth++
        else if (c === '}') depth--
        if (depth === 0) return body.slice(braceIdx + 1, i)
        i++
    }
    return null
}

// Map dep index → dep name. Meta haste callsites look like `n("Foo")` where
// `n` is the second factory parameter (the require function); `o` is the
// non-deferred require. We need to scan the factory body for assignments like
// `<var> = <fn>("Dep")` to learn local→external bindings.
function buildAliases(factoryBody, params, deps) {
    // identify the bare param names that act as require functions.
    // Convention seen across modules: factory(t, n, r, o, a, i, l)
    //   n = require (lazy), o = require (eager) — but this varies.
    // Just scan for `n(...)` / `o(...)` / `r(...)` calls and pull the string arg.
    const aliases = new Map() // localVarName -> { kind: 'external'|'internalEnum'|'protoConst', target?: string }
    const requireParamSet = new Set(params)
    // Search for assignments: `<var>=<param>("<name>")` or `<var>=(<assign>)`
    const reqAssign = /\b([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$])\s*\(\s*"([^"]+)"\s*\)/g
    let m
    while ((m = reqAssign.exec(factoryBody))) {
        const lhs = m[1]
        const fn = m[2]
        const name = m[3]
        if (!requireParamSet.has(fn)) continue
        if (!deps.includes(name)) continue
        if (name === '$InternalEnum') aliases.set(lhs, { kind: 'internalEnum' })
        else if (name === 'WAProtoConst') aliases.set(lhs, { kind: 'protoConst' })
        else aliases.set(lhs, { kind: 'external', target: name })
    }
    // Also: some modules use `(<lhs>=<fn>("X"))(...)` pattern. The lhs is still captured by reAssign.
    // And `<lhs>=<param>("X").<Member>` — lhs binds to .Member, not the module itself.
    // For simplicity we treat any `<var>=n("...")` as binding to the module root.
    return aliases
}

// Evaluate a type-byte expression like `e.TYPES.STRING` or
// `e.FLAGS.REPEATED|e.TYPES.MESSAGE`. Also handles the inline form
// `o("WAProtoConst").TYPES.X` used by modules that don't bind WAProtoConst
// to a local alias. Returns the numeric value or null.
function evalTypeExpr(expr, protoConstAlias) {
    if (!expr) return null
    expr = expr.trim()
    if (expr.includes('|')) {
        let total = 0
        // Split on top-level `|` only (parentheses can contain commas/pipes).
        let depth = 0
        let start = 0
        const parts = []
        for (let i = 0; i < expr.length; i++) {
            const c = expr[i]
            if (c === '(' || c === '[') depth++
            else if (c === ')' || c === ']') depth--
            else if (c === '|' && depth === 0) {
                parts.push(expr.slice(start, i).trim())
                start = i + 1
            }
        }
        parts.push(expr.slice(start).trim())
        for (const part of parts) {
            const v = evalTypeExpr(part, protoConstAlias)
            if (v === null) return null
            total |= v
        }
        return total
    }
    if (/^-?\d+$/.test(expr)) return Number(expr)
    // Aliased form: `<alias>.TYPES.X` / `<alias>.FLAGS.X`
    let m = expr.match(/^([A-Za-z_$][\w$]*)\.(TYPES|FLAGS)\.([A-Za-z_$][\w$]*)$/)
    if (m) {
        if (m[2] === 'TYPES') return PROTO_TYPE_KEYS[m[3]] ?? null
        if (m[2] === 'FLAGS') return PROTO_FLAG_KEYS[m[3]] ?? null
    }
    // Inline form: `<param>("WAProtoConst").TYPES.X` / `<param>("WAProtoConst").FLAGS.X`
    m = expr.match(/^[A-Za-z_$][\w$]*\s*\(\s*"WAProtoConst"\s*\)\s*\.(TYPES|FLAGS)\.([A-Za-z_$][\w$]*)$/)
    if (m) {
        if (m[1] === 'TYPES') return PROTO_TYPE_KEYS[m[2]] ?? null
        if (m[1] === 'FLAGS') return PROTO_FLAG_KEYS[m[2]] ?? null
    }
    return null
}

// Split a MAP descriptor third-element text. Input is the raw text inside
// the outer brackets — e.g. `[e.TYPES.UINT32, c]` (with the brackets) OR
// just `e.TYPES.UINT32, c` (without). Returns { keyExpr, valueExpr } or null.
function splitMapRef(refText) {
    if (!refText) return null
    let s = refText.trim()
    if (s.startsWith('[') && s.endsWith(']')) s = s.slice(1, -1)
    // top-level comma split
    let depth = 0
    for (let i = 0; i < s.length; i++) {
        const c = s[i]
        if (c === '(' || c === '[' || c === '{') depth++
        else if (c === ')' || c === ']' || c === '}') depth--
        else if (c === ',' && depth === 0) {
            return { keyExpr: s.slice(0, i).trim(), valueExpr: s.slice(i + 1).trim() }
        }
    }
    return null
}

// Parse `s({KEY:NUM,...})` enum literal (the arg to $InternalEnum).
// Returns array of { name, number } only if EVERY value is a real numeric
// literal. Returns null when the literal mixes in string/expression values —
// Meta uses $InternalEnum as a generic name-mapper too (e.g. `{REGULAR:"regular"}`),
// and those aren't wire-level proto enums (proto enums are int32).
function parseEnumLiteral(s, start) {
    if (s[start] !== '{') return null
    let i = start + 1
    const out = []
    i = skipWs(s, i)
    while (i < s.length && s[i] !== '}') {
        let key = null
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i]
            i++
            const k0 = i
            while (i < s.length && s[i] !== q) {
                if (s[i] === '\\') i++
                i++
            }
            key = s.slice(k0, i)
            i++
        } else if (/[A-Za-z_$]/.test(s[i])) {
            const st = i
            while (i < s.length && /[\w$]/.test(s[i])) i++
            key = s.slice(st, i)
        } else {
            i++
            continue
        }
        i = skipWs(s, i)
        if (s[i] !== ':') {
            return null // malformed
        }
        i++
        i = skipWs(s, i)
        // Read a numeric literal. If the value is anything else (string,
        // identifier, expression) bail — this isn't a wire-level enum.
        const numStart = i
        if (s[i] === '-') i++
        while (i < s.length && /[\d.eE+]/.test(s[i])) i++
        if (i === numStart || (s[numStart] === '-' && i === numStart + 1)) {
            return null
        }
        const num = Number(s.slice(numStart, i))
        if (!Number.isFinite(num)) return null
        out.push({ name: key, number: num })
        i = skipWs(s, i)
        if (s[i] === ',') i++
        i = skipWs(s, i)
    }
    return out
}

// Parse `<var>.internalSpec = {fieldName:[tag, typeExpr, refExpr?], ...}`.
// Returns { fieldName: { tag, typeByte, refExpr } }.
function parseInternalSpec(s, start, protoConstAlias) {
    if (s[start] !== '{') return {}
    let i = start + 1
    const out = {}
    i = skipWs(s, i)
    while (i < s.length && s[i] !== '}') {
        // key
        let key = null
        const kst = i
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i]
            i++
            const k0 = i
            while (i < s.length && s[i] !== q) {
                if (s[i] === '\\') i++
                i++
            }
            key = s.slice(k0, i)
            i++
        } else if (/[A-Za-z_$]/.test(s[i])) {
            while (i < s.length && /[\w$]/.test(s[i])) i++
            key = s.slice(kst, i)
        }
        i = skipWs(s, i)
        if (s[i] !== ':') {
            // skip field
            i = skipExpr(s, i, [',', '}'])
            if (s[i] === ',') i++
            i = skipWs(s, i)
            continue
        }
        i++
        i = skipWs(s, i)
        // Expect `[`
        if (s[i] !== '[') {
            i = skipExpr(s, i, [',', '}'])
            if (s[i] === ',') i++
            i = skipWs(s, i)
            continue
        }
        i++ // skip [
        i = skipWs(s, i)
        // Element 1: tag (number literal)
        let tag = null
        const tagStart = i
        while (i < s.length && /[\d.\-]/.test(s[i])) i++
        if (i > tagStart) tag = Number(s.slice(tagStart, i))
        i = skipWs(s, i)
        if (s[i] === ',') i++
        i = skipWs(s, i)
        // Element 2: type expression (until next `,` or `]`)
        const typeStart = i
        const typeEnd = skipExpr(s, i, [',', ']'])
        const typeExpr = s.slice(typeStart, typeEnd).trim()
        const typeByte = evalTypeExpr(typeExpr, protoConstAlias)
        i = typeEnd
        i = skipWs(s, i)
        let refExpr = null
        if (s[i] === ',') {
            i++
            i = skipWs(s, i)
            // Element 3: ref expression
            const refStart = i
            const refEnd = skipExpr(s, i, [',', ']'])
            refExpr = s.slice(refStart, refEnd).trim()
            i = refEnd
            i = skipWs(s, i)
        }
        // Skip past `]`
        if (s[i] === ']') i++
        i = skipWs(s, i)
        if (s[i] === ',') i++
        i = skipWs(s, i)
        if (key && tag !== null && typeByte !== null) {
            out[key] = { tag, typeByte, refExpr }
        }
    }
    return out
}

// Normalise inline alias-bind expressions like `(<id>=<param>("<dep>"))` →
// just `<id>`. Meta minifier sometimes inlines the first use of an imported
// alias (typical for WAProtoConst), which trips up our type-byte parser.
function normalizeInlineAliasBinds(body) {
    return body.replace(
        /\(\s*([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$]\s*\(\s*"[^"]+"\s*\)\s*\)/g,
        '$1'
    )
}

// Extract message + enum locals from a single .pb module body.
function extractFromModule(modName, body) {
    const deps = parseDeps(body)
    const params = parseFactoryParams(body)
    const rawFactoryBody = getFactoryBody(body)
    if (!rawFactoryBody) return null
    // Build the alias map from the ORIGINAL body — the normaliser below will
    // strip `(<id>=<param>("<dep>"))` patterns, which would otherwise hide
    // these from buildAliases.
    const aliases = buildAliases(rawFactoryBody, params, deps)
    const factoryBody = normalizeInlineAliasBinds(rawFactoryBody)

    // Identify InternalEnum alias name (set of var names that point to $InternalEnum).
    const enumAliasSet = new Set()
    let protoConstAlias = null
    for (const [lhs, info] of aliases) {
        if (info.kind === 'internalEnum') enumAliasSet.add(lhs)
        else if (info.kind === 'protoConst') protoConstAlias = lhs
    }

    // ALSO handle the inline pattern `<var>=(<lhs>=n("$InternalEnum"))({...})`
    // where the alias is assigned mid-expression. Scan for any `n("$InternalEnum")` call
    // and the enclosing variable to add to enumAliasSet.
    for (const m of factoryBody.matchAll(/([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$]\s*\(\s*"\$InternalEnum"\s*\)/g)) {
        enumAliasSet.add(m[1])
    }
    for (const m of factoryBody.matchAll(/([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$]\s*\(\s*"WAProtoConst"\s*\)/g)) {
        if (!protoConstAlias) protoConstAlias = m[1]
    }

    // Track local var → enum values
    const localEnums = new Map() // localVar -> values[]

    // Pattern A — simple: `<var>=<alias>({...})`
    if (enumAliasSet.size > 0) {
        const enumRe = new RegExp(
            `([A-Za-z_$][\\w$]*)\\s*=\\s*(?:${[...enumAliasSet].join('|')})\\s*\\(`,
            'g'
        )
        let m
        while ((m = enumRe.exec(factoryBody))) {
            const lhs = m[1]
            const openParen = m.index + m[0].length - 1
            let j = skipWs(factoryBody, openParen + 1)
            if (factoryBody[j] !== '{') continue
            const values = parseEnumLiteral(factoryBody, j)
            if (values !== null) localEnums.set(lhs, values)
        }
    }

    // Pattern B — combined declare+call: `<var>=(<alias>=<param>("$InternalEnum"))({...})`
    // This is how the FIRST enum in many .pb modules is set up. After it runs,
    // <alias> is bound for subsequent simple Pattern-A calls.
    const combinedRe =
        /([A-Za-z_$][\w$]*)\s*=\s*\(\s*([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$]\s*\(\s*"\$InternalEnum"\s*\)\s*\)\s*\(/g
    let cm
    while ((cm = combinedRe.exec(factoryBody))) {
        const lhs = cm[1]
        const aliasLhs = cm[2]
        enumAliasSet.add(aliasLhs)
        const openParen = cm.index + cm[0].length - 1
        let j = skipWs(factoryBody, openParen + 1)
        if (factoryBody[j] !== '{') continue
        const values = parseEnumLiteral(factoryBody, j)
        if (values !== null) localEnums.set(lhs, values)
    }

    // Pattern C — inline call without alias-bind: `<var>=<param>("$InternalEnum")({...})`
    // The InternalEnum function is fetched and immediately invoked; the LHS is
    // the enum value itself (no alias is exposed for future enums in this module).
    const inlineRe =
        /([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$]\s*\(\s*"\$InternalEnum"\s*\)\s*\(/g
    let im
    while ((im = inlineRe.exec(factoryBody))) {
        const lhs = im[1]
        if (localEnums.has(lhs)) continue
        const openParen = im.index + im[0].length - 1
        let j = skipWs(factoryBody, openParen + 1)
        if (factoryBody[j] !== '{') continue
        const values = parseEnumLiteral(factoryBody, j)
        if (values !== null) localEnums.set(lhs, values)
    }

    // Track local var → message (.name + .internalSpec)
    // Pattern: `<var>.name="Foo"` and `<var>.internalSpec={...}`
    const localMessages = new Map() // localVar -> { name, fields }
    const nameRe = /([A-Za-z_$][\w$]*)\.name\s*=\s*"([^"]+)"/g
    let nm
    while ((nm = nameRe.exec(factoryBody))) {
        const lhs = nm[1]
        const name = nm[2]
        if (!localMessages.has(lhs)) localMessages.set(lhs, { name, fields: null })
        else localMessages.get(lhs).name = name
    }
    const specRe = /([A-Za-z_$][\w$]*)\.internalSpec\s*=\s*\{/g
    let sm
    while ((sm = specRe.exec(factoryBody))) {
        const lhs = sm[1]
        const openBrace = sm.index + sm[0].length - 1
        const fields = parseInternalSpec(factoryBody, openBrace, protoConstAlias)
        const existing = localMessages.get(lhs) || { name: null, fields: null }
        existing.fields = fields
        localMessages.set(lhs, existing)
    }

    // Pattern D — plain object enums: `<var>={KEY:NUM,KEY:NUM,...}`. Some
    // modules (e.g. WACommon.pb) skip the `$InternalEnum` wrapper entirely
    // and just bind the values object directly. Runs AFTER localMessages so
    // we can exclude message placeholders.
    const plainObjectRe = /([A-Za-z_$][\w$]*)\s*=\s*\{/g
    let pm
    while ((pm = plainObjectRe.exec(factoryBody))) {
        const lhs = pm[1]
        if (localEnums.has(lhs)) continue
        if (localMessages.has(lhs)) continue
        const openBrace = pm.index + pm[0].length - 1
        let probe = skipWs(factoryBody, openBrace + 1)
        if (factoryBody[probe] === '}') continue
        const values = parseEnumLiteral(factoryBody, openBrace)
        if (values !== null && values.length > 0) localEnums.set(lhs, values)
    }

    // Track exports: `l.<Key> = <localVar>`. We don't filter by suffix — we
    // dispatch by what the local var holds:
    //   - if it's in localMessages  → message export
    //   - if it's in localEnums     → enum export
    // (Same enum can be exported under multiple aliases — e.g.
    //  `l.ADVEncryptionType = s` and field uses `s` directly. We record both.)
    const exportParam = params[params.length - 1] || 'l'
    const exportRe = new RegExp(`${exportParam}\\.([A-Za-z_$][\\w$]*)\\s*=\\s*([A-Za-z_$][\\w$]*)`, 'g')
    const messageExports = []
    const enumExports = []
    let em
    while ((em = exportRe.exec(factoryBody))) {
        const exportKey = em[1]
        const localVar = em[2]
        if (localMessages.has(localVar)) messageExports.push({ exportKey, localVar })
        else if (localEnums.has(localVar)) enumExports.push({ exportKey, localVar })
    }

    return {
        modName,
        aliases,
        enumAliasSet,
        protoConstAlias,
        localEnums,
        localMessages,
        messageExports,
        enumExports
    }
}

function extractProto(bundles, options = {}) {
    // Discover all .pb modules
    const pbNames = new Set()
    for (const b of bundles) {
        for (const h of iterModuleHeaders(b.text)) {
            if (h.name.endsWith('.pb')) pbNames.add(h.name)
        }
    }

    // Pass 1: extract each module's locals + exports.
    const modules = new Map() // modName -> extractFromModule result
    for (const modName of pbNames) {
        const body = findModuleBody(bundles, modName)
        if (!body) continue
        const r = extractFromModule(modName, body)
        if (r) modules.set(modName, r)
    }

    // Pass 2: build the qualified-name registry for each export.
    // We also remember the runtime name → qualified mapping.
    const messageRegistry = new Map() // qualified -> { localVar, mod, fields, sourceModule }
    const enumRegistry = new Map() // qualified -> { localVar, mod, values, sourceModule }

    // Per-module local→qualified maps so we never lose a local mapping just
    // because the global registry already had a same-qualified entry from a
    // different module (e.g. `SyncdVersion` lives in two .pb modules).
    const moduleLocalToQualified = new Map() // modName -> Map<localVar, {kind, qualified}>

    for (const [modName, mod] of modules) {
        const locals = new Map()
        moduleLocalToQualified.set(modName, locals)

        for (const { exportKey, localVar } of mod.messageExports) {
            const local = mod.localMessages.get(localVar)
            if (!local) continue
            const runtimeName =
                local.name ||
                (exportKey.endsWith('Spec') ? exportKey.slice(0, -4) : exportKey)
            const qualified = runtimeName.replace(/\$/g, '.')
            if (!locals.has(localVar)) locals.set(localVar, { kind: 'message', qualified })
            // Global registry — first-wins dedup (used for SDL emission).
            if (!messageRegistry.has(qualified)) {
                messageRegistry.set(qualified, {
                    localVar,
                    mod,
                    fields: local.fields || {},
                    sourceModule: modName
                })
            }
        }

        // Enum exports: same local enum can be reachable under several aliases.
        const aliasesByLocal = new Map()
        for (const { exportKey, localVar } of mod.enumExports) {
            const qualified = exportKey.replace(/\$/g, '.')
            if (!aliasesByLocal.has(localVar)) aliasesByLocal.set(localVar, [])
            aliasesByLocal.get(localVar).push({ exportKey, qualified })
        }
        for (const [localVar, aliases] of aliasesByLocal) {
            const values = mod.localEnums.get(localVar) || []
            const preferred =
                aliases.find((a) => a.exportKey.includes('$')) ?? aliases[0]
            if (!locals.has(localVar)) locals.set(localVar, { kind: 'enum', qualified: preferred.qualified })
            if (!enumRegistry.has(preferred.qualified)) {
                enumRegistry.set(preferred.qualified, {
                    localVar,
                    mod,
                    values,
                    sourceModule: modName,
                    aliases
                })
            }
        }
    }

    // Helper: resolve a refExpr (text) to a qualified name within or across modules.
    function resolveRef(refExpr, mod) {
        if (!refExpr) return null
        const ref = refExpr.trim()
        // Local reference (bare identifier) — look up in the per-module map.
        if (/^[A-Za-z_$][\w$]*$/.test(ref)) {
            const locals = moduleLocalToQualified.get(mod.modName)
            const hit = locals?.get(ref)
            if (hit) return hit
            return null
        }
        function lookupExternal(targetModName, exportKey) {
            const targetMod = modules.get(targetModName)
            if (!targetMod) return null
            for (const e of targetMod.messageExports) {
                if (e.exportKey === exportKey) {
                    const local = targetMod.localMessages.get(e.localVar)
                    const name =
                        local?.name ||
                        (exportKey.endsWith('Spec') ? exportKey.slice(0, -4) : exportKey)
                    return { kind: 'message', qualified: name.replace(/\$/g, '.') }
                }
            }
            for (const e of targetMod.enumExports) {
                if (e.exportKey === exportKey) {
                    return { kind: 'enum', qualified: exportKey.replace(/\$/g, '.') }
                }
            }
            return null
        }

        // External via bound alias: `<alias>.<ExportKey>`
        const aliasMatch = ref.match(/^([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)$/)
        if (aliasMatch) {
            const aliasInfo = mod.aliases.get(aliasMatch[1])
            if (aliasInfo && aliasInfo.kind === 'external') {
                const r = lookupExternal(aliasInfo.target, aliasMatch[2])
                if (r) return r
            }
        }

        // External inline: `<requireParam>("<Mod.pb>").<ExportKey>` — when
        // the bundle inlines the require call instead of caching it in a var.
        const inlineMatch = ref.match(
            /^[A-Za-z_$][\w$]*\s*\(\s*"([^"]+)"\s*\)\s*\.([A-Za-z_$][\w$]*)$/
        )
        if (inlineMatch) {
            const r = lookupExternal(inlineMatch[1], inlineMatch[2])
            if (r) return r
        }
        return null
    }

    // Pass 3: resolve field types + collect into intermediate maps.
    const messages = {} // qualified -> { fields: { name: { tag, type, repeated, packed, required } } }
    const enums = {} // qualified -> { values: [{name, number}] }
    let resolvedRefs = 0
    let unresolvedRefs = 0

    for (const [qualified, entry] of messageRegistry) {
        const fields = {}
        for (const [fieldName, descriptor] of Object.entries(entry.fields)) {
            const { tag, typeByte, refExpr } = descriptor
            const primitive = typeByte & TYPE_MASK
            const isRepeated = (typeByte & FLAG_REPEATED) !== 0
            const isPacked = (typeByte & FLAG_PACKED) !== 0
            const isRequired = (typeByte & FLAG_REQUIRED) !== 0
            const baseType = PROTO_TYPE_NAMES[primitive] || `UNKNOWN_${primitive}`

            // MAP fields look like `[tag, MAP, [keyTypeExpr, valueRefExpr]]`.
            // refExpr here is the raw inner-array text (the outer `[…]` was
            // already consumed). Split at the top-level comma to recover
            // {keyExpr, valueExpr}, then resolve key as a primitive and value
            // as either a primitive or a spec ref.
            if (baseType === 'MAP') {
                const mapParts = splitMapRef(refExpr)
                let keyType = 'string'
                let valueType = 'bytes'
                if (mapParts) {
                    const keyByte = evalTypeExpr(mapParts.keyExpr, null)
                    if (keyByte !== null) {
                        keyType = PROTO_TYPE_NAMES[keyByte & TYPE_MASK] || 'string'
                    }
                    const valRef = resolveRef(mapParts.valueExpr, entry.mod)
                    if (valRef) {
                        valueType = valRef.qualified
                        resolvedRefs++
                    } else {
                        const valByte = evalTypeExpr(mapParts.valueExpr, null)
                        if (valByte !== null) {
                            valueType = PROTO_TYPE_NAMES[valByte & TYPE_MASK] || 'bytes'
                            resolvedRefs++
                        } else {
                            unresolvedRefs++
                        }
                    }
                }
                fields[fieldName] = {
                    tag,
                    type: `map<${keyType}, ${valueType}>`,
                    repeated: false,
                    packed: false,
                    required: false,
                    isMap: true
                }
                continue
            }

            let resolvedTypeName = baseType
            if ((baseType === 'MESSAGE' || baseType === 'ENUM') && refExpr) {
                const ref = resolveRef(refExpr, entry.mod)
                if (ref) {
                    resolvedTypeName = ref.qualified
                    resolvedRefs++
                } else {
                    unresolvedRefs++
                    // Fall back to `bytes` so the SDL still compiles. The
                    // referenced spec lives in a .pb module we couldn't
                    // discover (lazy chunk that didn't load); the wire bytes
                    // pass through unchanged and can be re-decoded once the
                    // dump catches up.
                    resolvedTypeName = baseType === 'ENUM' ? 'int32' : 'bytes'
                }
            }
            fields[fieldName] = {
                tag,
                type: resolvedTypeName,
                repeated: isRepeated,
                packed: isPacked,
                required: isRequired
            }
        }
        messages[qualified] = { fields }
    }
    for (const [qualified, entry] of enumRegistry) {
        enums[qualified] = { values: entry.values }
    }

    const sdl = emitSdl(messages, enums, options)
    return {
        sdl,
        diagnostics: {
            pbModulesDiscovered: pbNames.size,
            messagesExtracted: Object.keys(messages).length,
            enumsExtracted: Object.keys(enums).length,
            refsResolved: resolvedRefs,
            refsUnresolved: unresolvedRefs
        }
    }
}

// --- SDL emitter ---------------------------------------------------------

function buildTree(messages, enums) {
    const root = { children: new Map(), messages: new Map(), enums: new Map() }
    function ensurePath(qualified) {
        const parts = qualified.split('.')
        let node = root
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i]
            if (!node.children.has(part)) {
                node.children.set(part, {
                    children: new Map(),
                    messages: new Map(),
                    enums: new Map()
                })
            }
            node = node.children.get(part)
        }
        return { parent: node, leaf: parts[parts.length - 1] }
    }
    for (const [q, msg] of Object.entries(messages)) {
        const { parent, leaf } = ensurePath(q)
        parent.messages.set(leaf, msg)
        if (!parent.children.has(leaf)) {
            parent.children.set(leaf, {
                children: new Map(),
                messages: new Map(),
                enums: new Map()
            })
        }
    }
    for (const [q, en] of Object.entries(enums)) {
        const { parent, leaf } = ensurePath(q)
        parent.enums.set(leaf, en)
    }
    return root
}

function indentBlock(text, indent) {
    return text
        .split('\n')
        .map((l) => (l.length > 0 ? indent + l : l))
        .join('\n')
}

function emitEnum(name, en) {
    const lines = [`enum ${name} {`]
    const sorted = [...en.values].sort((a, b) => a.number - b.number)
    for (const { name: vName, number } of sorted) {
        lines.push(`    ${vName} = ${number};`)
    }
    lines.push(`}`)
    return lines.join('\n')
}

// Strip the current scope's full prefix from a qualified type — only when
// the type is a strict descendant of the scope. Types reachable via an
// ANCESTOR (sibling of the current message) keep their qualified form so
// the reader can see where they live. This matches WAProto.proto style:
//   type 'AIHomeState.AIHomeOption'             in scope ['AIHomeState']                       → 'AIHomeOption'
//   type 'AIRichResp.CodeHighlight'             in scope ['AIRichResp','CodeBlock']            → 'AIRichResp.CodeHighlight'
//   type 'Message.AppStateSyncKeyId'            in scope ['Message','AppStateSyncKey']         → 'Message.AppStateSyncKeyId'
function relativiseTypeName(type, scope) {
    if (!type || type.indexOf('.') === -1) return type
    if (type.startsWith('map<')) {
        return type.replace(/<\s*([^,]+),\s*([^>]+)\s*>/, (_, k, v) =>
            `map<${relativiseTypeName(k.trim(), scope)}, ${relativiseTypeName(v.trim(), scope)}>`
        )
    }
    if (scope.length === 0) return type
    const prefix = scope.join('.') + '.'
    if (type.startsWith(prefix)) return type.slice(prefix.length)
    return type
}

function emitField(name, field, scope = []) {
    const type = relativiseTypeName(field.type, scope)
    if (field.isMap) {
        return `${type} ${name} = ${field.tag};`
    }
    const label = field.repeated ? 'repeated' : 'optional'
    const opts = field.packed ? ' [packed=true]' : ''
    return `${label} ${type} ${name} = ${field.tag}${opts};`
}

// Emit a message block. `scope` is the qualified path leading TO `name`
// (e.g. ['Outer'] when emitting `message Inner` nested under Outer). Field
// types use the shortest reference visible from the message's own scope
// (which is `[...scope, name]`).
function emitMessage(name, msg, nestedNode, scope = []) {
    const lines = [`message ${name} {`]
    const ownScope = [...scope, name]
    if (msg) {
        const fields = Object.entries(msg.fields).sort((a, b) => a[1].tag - b[1].tag)
        for (const [fName, f] of fields) lines.push(`    ${emitField(fName, f, ownScope)}`)
    }
    if (nestedNode) {
        for (const [eName, en] of nestedNode.enums) {
            lines.push(indentBlock(emitEnum(eName, en), '    '))
        }
        for (const [cName, cNode] of nestedNode.children) {
            const cMsg = nestedNode.messages.get(cName) ?? null
            lines.push(indentBlock(emitMessage(cName, cMsg, cNode, ownScope), '    '))
        }
    }
    lines.push(`}`)
    return lines.join('\n')
}

function emitSdl(messages, enums, options = {}) {
    const tree = buildTree(messages, enums)
    const waVersion = options.waVersion ?? 'unknown'
    const out = [
        'syntax = "proto3";',
        'package waproto;',
        '',
        `/// WhatsApp Version: ${waVersion}`,
        ''
    ]
    for (const eName of [...tree.enums.keys()].sort()) {
        out.push(emitEnum(eName, tree.enums.get(eName)))
        out.push('')
    }
    for (const cName of [...tree.children.keys()].sort()) {
        const cNode = tree.children.get(cName)
        const cMsg = cNode.messages.get(cName) ?? tree.messages.get(cName) ?? null
        out.push(emitMessage(cName, cMsg, cNode))
        out.push('')
    }
    return out.join('\n')
}

module.exports = { extractProto }
