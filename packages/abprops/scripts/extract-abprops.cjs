'use strict'

/**
 * Static AB-props (server-driven experiment config) extractor — operates on an
 * array of bundle texts.
 *
 * WhatsApp Web gates almost every feature behind an "ABProp": a named config
 * whose value the server pushes down (`<iq type="get" xmlns="abt">` →
 * `WASmaxAbPropsGetExperimentConfigRPC`) keyed by a numeric *config code*. The
 * client ships the full catalogue as two frozen tables:
 *
 *   __d("WAWebABPropsConfigs", [], ... var e = {
 *       <prop_name>: [<configCode>, <type>, <defaultValue>, <debugDefaultValue>],
 *       ...
 *   }; i.ABPropConfigs = e)
 *
 *   __d("WAWebGroupABPropsConfigs", ...)   same shape, group-scoped props
 *
 * Tuple semantics, recovered from the readers (`WAWebABProps.getABPropConfigValue`,
 * `WAWebABPropsCache`, `WAWebBackendWorkerABPropsCache`, `WAWebABPropsUpdateFromStorage`):
 *
 *   [0] configCode         numeric id used on the wire and as the abpropConfigs
 *                          table primary key — the *name* never leaves the client
 *   [1] type               'bool' | 'int' | 'float' | 'string'; drives
 *                          `WAWebABPropsParseConfigValue.parseConfigValue`, which
 *                          decodes the server's always-string configValue
 *   [2] defaultValue       used when the server has not sent a value for this code
 *   [3] debugDefaultValue  used *instead of* [2] only when gkx 26259 is on AND the
 *                          account joined the internal beta ("[abprops] intern beta
 *                          joined, using DEBUG defaults" in WAWebABPropsUpdateFromStorage)
 *
 * Two auxiliary lists are extracted alongside:
 *
 *   - `WAWebABProps.usedBeforeInitializationConfigs` — props the runtime allows to
 *     be read before the config cache resolves (everything else logs a warning and
 *     silently falls back to the default)
 *   - `WAWebStoreSpecialAbProps` — the handful of props mirrored into localStorage
 *     under `abprops_needed_early` so they can be consulted before the DB opens
 *
 * Parsing is text-based. The two config modules are pure data literals with no
 * minifier variance beyond the export variable's letter, so this is deterministic
 * across WA Web versions. Anything unrecognised is reported through `diagnostics`
 * rather than thrown — the daily diff surfaces drift.
 */

const { skipWs, skipExpr } = require('./parser.cjs')

const CONFIG_MODULES = {
    props: 'WAWebABPropsConfigs',
    groupProps: 'WAWebGroupABPropsConfigs'
}

const VALID_TYPES = new Set(['bool', 'int', 'float', 'string'])

// --- module discovery ---------------------------------------------------

// Build one index of `__d("ModuleName",...)` bodies across every bundle. Each
// module appears in exactly one bundle in practice; if a duplicate occurs
// (preloaded vs lazy chunk) we keep the first. The body walk is bounded by the
// next `__d(` header in the same bundle — modules never nest, so the bound is
// exact and a quirk in the paren matcher cannot spill into the next module.
//
// Returns Map<string, { text, bundle }>.
function indexModules(bundles) {
    const map = new Map()
    for (const b of bundles) {
        const headers = [...b.text.matchAll(/__d\("([^"]+)"/g)]
        for (let h = 0; h < headers.length; h++) {
            const m = headers[h]
            const name = m[1]
            if (map.has(name)) continue
            const start = m.index
            const bound = h + 1 < headers.length ? headers[h + 1].index : b.text.length
            const end = findMatchingParenEnd(b.text, start, bound)
            if (end !== -1) map.set(name, { text: b.text.slice(start, end), bundle: b.url })
        }
    }
    return map
}

function findMatchingParenEnd(s, start, bound) {
    const stop = bound != null ? bound : s.length
    let i = start
    let depth = 0
    while (i < stop) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') {
            i = skipStringLit(s, i)
            continue
        }
        if (c === '(') depth++
        else if (c === ')') {
            if (--depth === 0) return i + 1
        }
        i++
    }
    return -1
}

function skipStringLit(s, i) {
    const q = s[i]
    i++
    while (i < s.length && s[i] !== q) {
        if (s[i] === '\\') i++
        i++
    }
    return i + 1
}

// --- literal parsing ----------------------------------------------------

// Parse one tuple element. The tables only ever contain minified booleans
// (`!0`/`!1`), numbers and string literals; anything else is handed back as
// `{ __raw }` so the caller can flag it instead of silently coercing.
function parseLiteral(s, start) {
    let i = skipWs(s, start)
    const c = s[i]

    if (c === '!' && (s[i + 1] === '0' || s[i + 1] === '1')) {
        return { value: s[i + 1] === '0', end: i + 2 }
    }
    if (c === '"' || c === "'") {
        const q = c
        i++
        let raw = ''
        while (i < s.length && s[i] !== q) {
            if (s[i] === '\\') {
                raw += s[i] + s[i + 1]
                i += 2
                continue
            }
            raw += s[i]
            i++
        }
        return { value: unescape(raw), end: i + 1 }
    }
    if (c === '-' || c === '.' || (c >= '0' && c <= '9')) {
        const st = i
        if (s[i] === '-') i++
        while (i < s.length && /[0-9.eE]/.test(s[i])) {
            // `e`/`E` may be followed by a sign (1e-3); consume it as part of
            // the exponent rather than terminating the number there.
            if ((s[i] === 'e' || s[i] === 'E') && (s[i + 1] === '+' || s[i + 1] === '-')) i++
            i++
        }
        const n = Number(s.slice(st, i))
        return Number.isFinite(n) ? { value: n, end: i } : { value: { __raw: s.slice(st, i) }, end: i }
    }
    if (s.startsWith('null', i) && !/[\w$]/.test(s[i + 4] ?? '')) return { value: null, end: i + 4 }
    if (s.startsWith('void 0', i)) return { value: null, end: i + 6 }

    const end = skipExpr(s, i, [',', ']', '}'])
    return { value: { __raw: s.slice(i, end).trim() }, end }
}

function unescape(s) {
    return s.replace(/\\(u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|.)/g, (m, esc) => {
        switch (esc[0]) {
            case 'n':
                return '\n'
            case 't':
                return '\t'
            case 'r':
                return '\r'
            case 'b':
                return '\b'
            case 'f':
                return '\f'
            case 'v':
                return '\v'
            case '0':
                return '\0'
            case 'u':
            case 'x':
                return String.fromCharCode(parseInt(esc.slice(1), 16))
            default:
                return esc
        }
    })
}

function parseObjectKey(s, start) {
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
        return { key: unescape(s.slice(st, i)), end: i + 1 }
    }
    const st = i
    while (i < s.length && /[\w$]/.test(s[i])) i++
    return { key: i > st ? s.slice(st, i) : null, end: i }
}

// Parse `[ "a", "b", ... ]` — used for the two auxiliary string lists. Returns
// null if the literal holds anything other than strings.
function parseStringArray(s, start) {
    let i = skipWs(s, start)
    if (s[i] !== '[') return null
    i++
    const out = []
    while (i < s.length) {
        i = skipWs(s, i)
        if (s[i] === ']') return out
        const v = parseLiteral(s, i)
        if (typeof v.value !== 'string') return null
        out.push(v.value)
        i = skipWs(s, v.end)
        if (s[i] === ',') i++
    }
    return null
}

// --- config table extraction --------------------------------------------

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Locate `<export>.ABPropConfigs = <var>` and then `<var> = {` in the same
// module body. Both config modules are dependency-free, so the export param is
// always the 6th factory arg — but we resolve it by name rather than assuming
// a letter, since minifier arg naming is not part of the contract.
function findTableLiteral(text) {
    const assign = /(?<![\w$])[A-Za-z_$][\w$]*\.ABPropConfigs\s*=\s*([A-Za-z_$][\w$]*)/.exec(text)
    if (!assign) return { error: 'no `.ABPropConfigs=<var>` export assignment' }
    const varName = assign[1]
    const decl = new RegExp(`(?<![\\w$])${escapeRegex(varName)}\\s*=\\s*\\{`).exec(text)
    if (!decl) return { error: `backing var \`${varName}\` has no object literal` }
    return { start: decl.index + decl[0].length - 1 }
}

function extractConfigTable(mod, moduleName, diagnostics) {
    const located = findTableLiteral(mod.text)
    if (located.error) {
        diagnostics.errors.push({ module: moduleName, error: located.error })
        return {}
    }

    const s = mod.text
    let i = located.start + 1 // past `{`
    const out = {}

    while (i < s.length) {
        i = skipWs(s, i)
        if (s[i] === '}' || s[i] === undefined) break

        const k = parseObjectKey(s, i)
        if (!k.key) {
            diagnostics.errors.push({ module: moduleName, error: `unparseable key at offset ${i}` })
            break
        }
        i = skipWs(s, k.end)
        if (s[i] !== ':') {
            diagnostics.errors.push({ module: moduleName, error: `missing \`:\` after \`${k.key}\`` })
            break
        }
        i = skipWs(s, i + 1)
        if (s[i] !== '[') {
            diagnostics.errors.push({ module: moduleName, error: `\`${k.key}\` value is not a tuple` })
            i = skipExpr(s, i, [',', '}'])
            if (s[i] === ',') i++
            continue
        }

        i++ // past `[`
        const tuple = []
        while (i < s.length) {
            i = skipWs(s, i)
            if (s[i] === ']') {
                i++
                break
            }
            const v = parseLiteral(s, i)
            tuple.push(v.value)
            i = skipWs(s, v.end)
            if (s[i] === ',') i++
        }

        const entry = readTuple(k.key, tuple, moduleName, diagnostics)
        if (entry) out[k.key] = entry

        i = skipWs(s, i)
        if (s[i] === ',') i++
    }

    return out
}

function readTuple(name, tuple, moduleName, diagnostics) {
    if (tuple.length !== 4) {
        diagnostics.errors.push({
            module: moduleName,
            error: `\`${name}\` has ${tuple.length} tuple slots, expected 4`
        })
        return null
    }
    const [code, type, defaultValue, debugDefaultValue] = tuple
    if (typeof code !== 'number' || !Number.isInteger(code)) {
        diagnostics.errors.push({ module: moduleName, error: `\`${name}\` has non-integer configCode` })
        return null
    }
    if (typeof type !== 'string' || !VALID_TYPES.has(type)) {
        diagnostics.errors.push({ module: moduleName, error: `\`${name}\` has unknown type \`${type}\`` })
        return null
    }
    for (const [label, v] of [['defaultValue', defaultValue], ['debugDefaultValue', debugDefaultValue]]) {
        if (v !== null && typeof v === 'object') {
            diagnostics.errors.push({
                module: moduleName,
                error: `\`${name}\`.${label} is a non-literal expression (${v.__raw})`
            })
            return null
        }
        if (!matchesType(type, v)) {
            diagnostics.typeMismatches.push({ module: moduleName, name, type, slot: label, value: v })
        }
    }
    return { code, type, defaultValue, debugDefaultValue }
}

function matchesType(type, v) {
    if (type === 'bool') return typeof v === 'boolean'
    if (type === 'int' || type === 'float') return typeof v === 'number'
    if (type === 'string') return typeof v === 'string'
    return false
}

// --- auxiliary lists ----------------------------------------------------

// `WAWebABProps` declares the allowlist of props readable before the config
// cache resolves, then exports it as `usedBeforeInitializationConfigs`.
function extractUsedBeforeInit(modules, diagnostics) {
    const mod = modules.get('WAWebABProps')
    if (!mod) {
        diagnostics.errors.push({ module: 'WAWebABProps', error: 'module not found' })
        return []
    }
    const assign =
        /(?<![\w$])[A-Za-z_$][\w$]*\.usedBeforeInitializationConfigs\s*=\s*([A-Za-z_$][\w$]*)/.exec(mod.text)
    if (!assign) {
        diagnostics.errors.push({
            module: 'WAWebABProps',
            error: 'no `.usedBeforeInitializationConfigs=<var>` export assignment'
        })
        return []
    }
    const decl = new RegExp(`(?<![\\w$])${escapeRegex(assign[1])}\\s*=\\s*\\[`).exec(mod.text)
    const list = decl ? parseStringArray(mod.text, decl.index + decl[0].length - 1) : null
    if (!list) {
        diagnostics.errors.push({
            module: 'WAWebABProps',
            error: `\`${assign[1]}\` is not a string-array literal`
        })
        return []
    }
    return list
}

// `WAWebStoreSpecialAbProps` mirrors a few props into localStorage before the
// DB is available: `var s=[...], u="abprops_needed_early"`. Anchor on the
// storage key so a reordered declaration can't silently match the wrong array.
function extractSpecialEarly(modules, diagnostics) {
    const mod = modules.get('WAWebStoreSpecialAbProps')
    if (!mod) {
        diagnostics.errors.push({ module: 'WAWebStoreSpecialAbProps', error: 'module not found' })
        return null
    }
    const m = /=\s*(\[[^[\]]*\])\s*,\s*[A-Za-z_$][\w$]*\s*=\s*"([^"]+)"/.exec(mod.text)
    if (!m) {
        diagnostics.errors.push({
            module: 'WAWebStoreSpecialAbProps',
            error: 'no `<var>=[...],<var>="<storageKey>"` declaration pair'
        })
        return null
    }
    const props = parseStringArray(m[1], 0)
    if (!props) {
        diagnostics.errors.push({
            module: 'WAWebStoreSpecialAbProps',
            error: 'early-prop list is not a string-array literal'
        })
        return null
    }
    return { localStorageKey: m[2], props }
}

// --- entry point --------------------------------------------------------

function extractAbProps(bundles) {
    const modules = indexModules(bundles)
    const diagnostics = { errors: [], typeMismatches: [], duplicateCodes: [] }

    const tables = {}
    for (const [key, moduleName] of Object.entries(CONFIG_MODULES)) {
        const mod = modules.get(moduleName)
        if (!mod) {
            diagnostics.errors.push({ module: moduleName, error: 'module not found' })
            tables[key] = {}
            continue
        }
        tables[key] = extractConfigTable(mod, moduleName, diagnostics)
    }

    // Config codes are the wire identity — a collision would make the
    // code→name reverse map (which the runtime builds too, in
    // `WAWebABPropsCache.getABPropConfigNameFromCode`) lossy.
    for (const [key, table] of Object.entries(tables)) {
        const byCode = new Map()
        for (const [name, def] of Object.entries(table)) {
            const prev = byCode.get(def.code)
            if (prev != null) diagnostics.duplicateCodes.push({ table: key, code: def.code, names: [prev, name] })
            else byCode.set(def.code, name)
        }
    }

    return {
        props: tables.props,
        groupProps: tables.groupProps,
        usedBeforeInitialization: extractUsedBeforeInit(modules, diagnostics),
        specialEarlyProps: extractSpecialEarly(modules, diagnostics),
        diagnostics
    }
}

module.exports = { extractAbProps }
