'use strict'

/**
 * Static WAM (analytics/metrics) extractor — operates on an array of bundle texts.
 *
 * WhatsApp Web's "WAM" is the client-side telemetry pipeline. Every event is
 * registered through `WAWebWamCodegenUtils.defineEvents({Name:[tuple]}, validators)`,
 * and global session metadata sent with every batch goes through
 * `WAWebWamGlobals.defineGlobal({field:[tuple]})`.
 *
 * The event tuple shape is:
 *
 *   [eventId, fieldsObject, [weightDefault, weight26259, weight26258], channel?, psId?]
 *
 * Each field entry is `<name>:[fieldId, type]` where `type` is either a
 * primitive constant (`<idVar>.TYPES.STRING|BOOLEAN|INTEGER|NUMBER|TIMER`) or an
 * enum reference. Enum refs appear in three shapes the minifier emits:
 *
 *   1. Direct:        `o("WAWebWamEnumX").EXPORT_NAME`
 *   2. Comma-assign:  `(s=o("WAWebWamEnumX")).EXPORT_NAME`     (first use)
 *   3. Alias-resolve: `s.EXPORT_NAME`                          (subsequent uses)
 *
 * The defineEvents code in WAWebWamCodegenUtils does `for (var n in e) { ...
 * return p({...}) }` — early return inside the loop means *one call defines
 * exactly one event* regardless of how many keys the object literal has. We
 * therefore extract the first (and only) key from each call.
 *
 * Globals are similar but the tuple is `[id, type, channelsArray]` and a single
 * `defineGlobal({...})` call carries the full set.
 *
 * Enum modules expose `Object.freeze({KEY:n,...})` and assign it to one of the
 * `i` / `l` / etc. exports under a canonical name (e.g. `i.UI_ACTION_TYPE=e`).
 * We resolve every enum reference encountered across events + globals by
 * looking the module up, finding the export's backing variable, and parsing
 * its `Object.freeze(...)` literal.
 *
 * `WAWebWamGlobals` additionally declares `PrivateStatsAllIds` — the canonical
 * list of {key, keyHashInt, rotationPeriodDays} buckets that channel='private'
 * events reference by their `keyHashInt`.
 *
 * Parsing is regex/text-based; the minifier's output for these registrations
 * is stable enough (predictable IIFE shape, fixed letter vars) that this is
 * deterministic across WA Web versions. Anything unrecognised yields
 * `type:'unknown'` rather than throwing — the diff workflow surfaces drift.
 */

const { skipExpr } = require('./parser.cjs')

// --- module discovery ---------------------------------------------------

// Build one global index of `__d("ModuleName",...)` bodies across every bundle.
// Each module appears in exactly one bundle in practice; if a duplicate occurs
// (preloaded vs lazy chunk) we keep the first.
//
// The body walk is bounded by the position of the NEXT `__d(` header in the
// same bundle. Modules in WA Web bundles never nest — they're sequential
// top-level calls — so this bound is exact, and it also limits the damage
// from any quirk in the paren-matcher (e.g. unhandled regex literals like
// `/"/g` inside the body could otherwise fool a simple string-aware
// scanner into walking past the closing `)`).
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
            if (end !== -1) {
                map.set(name, { text: b.text.slice(start, end), bundle: b.url })
            }
        }
    }
    return map
}

// Starting at the `__d` token, walk forward respecting strings/escapes until
// the matching `)` of the outer registration call. The `bound` argument caps
// the walk (typically the next `__d(` header) — if we hit it without closing
// the parens, return -1 rather than spilling into the next module's body.
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
        if (c === '/' && s[i + 1] === '/') {
            while (i < stop && s[i] !== '\n') i++
            continue
        }
        if (c === '/' && s[i + 1] === '*') {
            i += 2
            while (i < stop && !(s[i] === '*' && s[i + 1] === '/')) i++
            i += 2
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

// --- WAM event extraction -----------------------------------------------

// Per-module alias map — collects `(<alias>=<dep>("<ModuleName>"))` bindings.
// Modules like WAWebDailyWamEvent alias an enum import to a single-letter var
// the first time it's referenced, then use the alias for subsequent fields:
//
//   privacySettingsAbout:[141,(s=o("WAWebWamEnumPrivacySettingsValueType")).PRIVACY_SETTINGS_VALUE_TYPE]
//   privacySettingsCoverPhoto:[235,s.PRIVACY_SETTINGS_VALUE_TYPE]
//
// We pre-scan the whole module body once so later type-resolution can look up
// `s` → "WAWebWamEnumPrivacySettingsValueType".
function buildAliasMap(modBody) {
    const map = {}
    const re = /\(([a-z]\w*)\s*=\s*[a-z]\w*\("([^"]+)"\)\)/g
    let m
    while ((m = re.exec(modBody))) {
        // First binding wins. The minifier may reuse a var slot for a different
        // module later in the body, but for enum lookups the first binding is
        // the one referenced by the field tuples we care about.
        if (!(m[1] in map)) map[m[1]] = m[2]
    }
    return map
}

// Find `.defineEvents(` then advance past `(` and any whitespace to land on the
// opening `{` of the first argument. Returns that offset or -1.
function findCallObjOpen(modBody, callName) {
    const idx = modBody.indexOf('.' + callName + '(')
    if (idx === -1) return -1
    let i = idx + callName.length + 2 // past `.<name>(`
    while (i < modBody.length && /\s/.test(modBody[i])) i++
    if (modBody[i] !== '{') return -1
    return i
}

// Parse `{key:[...slots...], key2:[...]}` returning an array of
// { name, slots: string[] } where `slots` are the raw text of each top-level
// tuple element. Stops at the matching `}`. Returns { entries, end }.
function parseTupleMapObject(modBody, objStart) {
    const out = []
    let i = objStart + 1 // skip {
    while (i < modBody.length && modBody[i] !== '}') {
        while (i < modBody.length && /\s/.test(modBody[i])) i++
        if (modBody[i] === '}') break
        // key — identifier or quoted string
        let name
        if (modBody[i] === '"' || modBody[i] === "'") {
            const q = modBody[i]
            i++
            const st = i
            while (i < modBody.length && modBody[i] !== q) {
                if (modBody[i] === '\\') i++
                i++
            }
            name = modBody.slice(st, i)
            i++
        } else {
            const st = i
            while (i < modBody.length && /[\w$]/.test(modBody[i])) i++
            name = modBody.slice(st, i)
        }
        while (i < modBody.length && /\s/.test(modBody[i])) i++
        if (modBody[i] !== ':') break
        i++
        while (i < modBody.length && /\s/.test(modBody[i])) i++
        if (modBody[i] !== '[') {
            // Not a tuple value — skip to next entry.
            i = skipExpr(modBody, i, [',', '}'])
            if (modBody[i] === ',') i++
            continue
        }
        // Tuple — collect raw slots split on top-level commas.
        const tupleStart = i + 1
        const tupleEnd = skipExpr(modBody, tupleStart, [']'])
        const slots = splitTopLevelCommas(modBody.slice(tupleStart, tupleEnd))
        out.push({ name, slots })
        i = tupleEnd + 1
        while (i < modBody.length && /\s/.test(modBody[i])) i++
        if (modBody[i] === ',') i++
    }
    return { entries: out, end: i < modBody.length ? i + 1 : i }
}

// Split a comma-separated list respecting paren / bracket / brace / string depth.
function splitTopLevelCommas(s) {
    const out = []
    let depth = 0
    let start = 0
    let i = 0
    while (i < s.length) {
        const c = s[i]
        if (c === '"' || c === "'" || c === '`') {
            i = skipStringLit(s, i)
            continue
        }
        if (c === '(' || c === '[' || c === '{') depth++
        else if (c === ')' || c === ']' || c === '}') depth--
        else if (c === ',' && depth === 0) {
            out.push(s.slice(start, i))
            start = i + 1
        }
        i++
    }
    if (start < s.length) out.push(s.slice(start))
    return out.map((x) => x.trim()).filter((x) => x.length > 0)
}

// --- type slot resolution -----------------------------------------------

const PRIMITIVE_TYPES = new Set(['BOOLEAN', 'INTEGER', 'NUMBER', 'STRING', 'TIMER'])

// Recognised forms (after `.trim()`):
//   <id>.TYPES.STRING                                       → primitive
//   <dep>("WAWebWamCodegenUtils").TYPES.STRING              → primitive (no-alias case)
//   <dep>("Module").EXPORT                                  → enum
//   (<alias>=<dep>("Module")).EXPORT                        → enum
//   <alias>.EXPORT                  (looked up in aliasMap) → enum
function resolveTypeText(typeText, aliasMap) {
    const t = typeText.trim()

    // Primitive: `<alias>.TYPES.<X>` OR `<dep>("WAWebWamCodegenUtils").TYPES.<X>`
    // (the latter is used by modules that don't bother aliasing the codegen
    // import, e.g. WAWebDeepLinkMsgSentWamEvent).
    const primM = t.match(/^[a-z]\w*(?:\("WAWebWamCodegenUtils"\))?\.TYPES\.([A-Z]+)$/)
    if (primM && PRIMITIVE_TYPES.has(primM[1])) {
        return { type: primM[1].toLowerCase() }
    }

    // Direct enum: `o("Module").EXPORT`
    const directM = t.match(/^[a-z]\w*\("([^"]+)"\)\.([A-Z][A-Z0-9_]*)$/)
    if (directM) {
        return { type: 'enum', enumModule: directM[1], enumExport: directM[2] }
    }

    // Comma-assign: `(s=o("Module")).EXPORT`
    const caM = t.match(/^\(\s*[a-z]\w*\s*=\s*[a-z]\w*\("([^"]+)"\)\s*\)\.([A-Z][A-Z0-9_]*)$/)
    if (caM) {
        return { type: 'enum', enumModule: caM[1], enumExport: caM[2] }
    }

    // Aliased: `<alias>.EXPORT` — resolve via aliasMap.
    const aliasM = t.match(/^([a-z]\w*)\.([A-Z][A-Z0-9_]*)$/)
    if (aliasM && aliasMap[aliasM[1]]) {
        return { type: 'enum', enumModule: aliasMap[aliasM[1]], enumExport: aliasM[2] }
    }

    return { type: 'unknown', raw: t }
}

// --- event extraction ---------------------------------------------------

function extractEvent(modName, modBody) {
    const aliasMap = buildAliasMap(modBody)
    const objStart = findCallObjOpen(modBody, 'defineEvents')
    if (objStart === -1) return null
    const { entries: defs, end: defsEnd } = parseTupleMapObject(modBody, objStart)
    if (defs.length === 0) return null
    const def = defs[0] // one event per call (early-return in defineEvents)

    if (def.slots.length < 3) return null
    const id = parseIntStrict(def.slots[0])
    if (id == null) return null

    // Slot 1: fields object — re-parse it as a tuple-map (each field is
    // <name>:[fieldId, typeExpr]).
    const fieldsText = def.slots[1]
    if (!fieldsText.startsWith('{')) return null
    const { entries: fieldEntries } = parseTupleMapObject(fieldsText, 0)
    const fields = {}
    for (const fe of fieldEntries) {
        if (fe.slots.length < 2) continue
        const fid = parseIntStrict(fe.slots[0])
        if (fid == null) continue
        const resolved = resolveTypeText(fe.slots[1], aliasMap)
        fields[fe.name] = {
            id: fid,
            ...resolved,
            falcoName: toSnakeCase(fe.name)
        }
    }

    // Slot 2: weights array [default, gkx26259, gkx26258].
    const weights = parseWeights(def.slots[2])

    // Slot 3 (optional): wamChannel string literal — defaults to 'regular'.
    const channel = def.slots[3] ? unquote(def.slots[3]) : 'regular'

    // Slot 4 (optional): privateStatsIdInt — only for channel='private' events.
    const psId = def.slots[4] ? parseIntStrict(def.slots[4]) : null

    // Second argument: validators. We capture the requiredFields list for the
    // event (strings) — predicates/conditions are JS function literals that
    // can't be statically represented.
    const { requiredFields, conditions } = extractValidators(modBody, defsEnd, def.name)

    return {
        name: def.name,
        module: modName,
        id,
        falcoName: 'wam_' + toSnakeCase(def.name),
        channel,
        weight: weights,
        privateStatsIdInt: psId,
        fields,
        requiredFields,
        conditions
    }
}

// Walk past the first arg's `}` to find the validators object `{Name:[...]}`.
// Returns `{ requiredFields, conditions }`:
//
//   requiredFields  — union of slot-1 strings across every validator triple
//                     (nullability checks; events like AboutConsumptionDaily
//                     chain multiple triples, any of which may carry them).
//   conditions      — human-readable validation messages from slot-2's
//                     `[fn, "msg"]` pairs. The predicate fn is a JS function
//                     literal we can't represent statically, but the message
//                     ("about_chat_bubble_tap_count >= 0") IS the canonical
//                     rule the developer wrote — surface it so consumers can
//                     show or test against it. Predicates from slot 0 are
//                     conditional-guard fns (not captured — function logic).
//
// Order preserved, duplicates removed within each list.
function extractValidators(modBody, defsEnd, eventName) {
    const empty = { requiredFields: [], conditions: [] }
    let i = defsEnd
    while (i < modBody.length && /\s/.test(modBody[i])) i++
    if (modBody[i] !== ',') return empty
    i++
    while (i < modBody.length && /\s/.test(modBody[i])) i++
    if (modBody[i] !== '{') return empty
    const re = new RegExp(`\\b${eventName}\\s*:\\s*\\[`, 'g')
    re.lastIndex = i
    const m = re.exec(modBody)
    if (!m) return empty
    const valStart = m.index + m[0].length
    const valEnd = skipExpr(modBody, valStart, [']'])
    const inner = modBody.slice(valStart, valEnd).trim()
    if (inner === '') return empty
    const triples = splitTopLevelCommas(inner)
    const reqSeen = new Set()
    const condSeen = new Set()
    const requiredFields = []
    const conditions = []
    for (const t of triples) {
        if (!t.startsWith('[')) continue
        const tInner = t.slice(1, -1)
        const parts = splitTopLevelCommas(tInner)
        // Slot 1 — required fields (array of strings).
        if (parts.length >= 2) {
            const reqText = parts[1].trim()
            if (reqText.startsWith('[')) {
                const reqInner = reqText.slice(1, -1)
                const strRe = /"([^"]*)"|'([^']*)'/g
                let sm
                while ((sm = strRe.exec(reqInner))) {
                    const name = sm[1] ?? sm[2]
                    if (!reqSeen.has(name)) {
                        reqSeen.add(name)
                        requiredFields.push(name)
                    }
                }
            }
        }
        // Slot 2 — conditions: array of `[fn, "msg"]` pairs. Pull the strings.
        if (parts.length >= 3) {
            const condText = parts[2].trim()
            if (condText.startsWith('[')) {
                const condInner = condText.slice(1, -1)
                // Each pair `[fn, "msg"]` — split by top-level commas, then
                // each pair's tail string-literal IS the message.
                const pairs = splitTopLevelCommas(condInner)
                for (const p of pairs) {
                    if (!p.startsWith('[')) continue
                    const pInner = p.slice(1, -1)
                    const slots = splitTopLevelCommas(pInner)
                    // Message is the LAST string literal in the pair.
                    for (let s = slots.length - 1; s >= 0; s--) {
                        const tail = slots[s].trim()
                        const sm = tail.match(/^"([^"]*)"$|^'([^']*)'$/)
                        if (sm) {
                            const msg = sm[1] ?? sm[2]
                            if (!condSeen.has(msg)) {
                                condSeen.add(msg)
                                conditions.push(msg)
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    return { requiredFields, conditions }
}

function parseWeights(slotText) {
    const t = slotText.trim()
    if (!t.startsWith('[')) return { default: null, gkx26259: null, gkx26258: null }
    const parts = splitTopLevelCommas(t.slice(1, -1))
    const toNum = (x) => {
        const n = Number(x.trim())
        return Number.isFinite(n) ? n : null
    }
    return {
        default: parts[0] != null ? toNum(parts[0]) : null,
        gkx26259: parts[1] != null ? toNum(parts[1]) : null,
        gkx26258: parts[2] != null ? toNum(parts[2]) : null
    }
}

function parseIntStrict(s) {
    const t = s.trim()
    if (!/^-?\d+$/.test(t)) {
        // Could be scientific (`1e3`, `5e3`). Allow that since weight slots can
        // be `5e3` (=5000).
        const n = Number(t)
        return Number.isFinite(n) ? n : null
    }
    return Number(t)
}

function unquote(s) {
    const t = s.trim()
    if ((t[0] === '"' || t[0] === "'") && t[t.length - 1] === t[0]) {
        return t.slice(1, -1)
    }
    return t
}

// camelCase → snake_case. Mirrors `WACamelCase` and the inline functions in
// WAWebWamCodegenUtils (`e.replace(/([A-Z])/g,"_$1").toLowerCase()`).
// For event names we additionally strip a leading underscore — see
// `_event_name` reduces to `event_name` after stripping (the inline `s()`
// function in WAWebWamCodegenUtils does the same with `.replace(/^_/,"")`).
function toSnakeCase(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '')
}

// --- globals + private stats --------------------------------------------

function extractGlobalsModule(modBody) {
    const aliasMap = buildAliasMap(modBody)
    const objStart = findCallObjOpen(modBody, 'defineGlobal')
    if (objStart === -1) return { globals: {}, privateStatsIds: [] }
    const { entries } = parseTupleMapObject(modBody, objStart)
    const globals = {}
    for (const e of entries) {
        if (e.slots.length < 2) continue
        const id = parseIntStrict(e.slots[0])
        if (id == null) continue
        const resolved = resolveTypeText(e.slots[1], aliasMap)
        const channels = e.slots[2] ? parseStringArray(e.slots[2]) : ['regular']
        globals[e.name] = {
            id,
            ...resolved,
            channels,
            falcoName: toSnakeCase(e.name)
        }
    }
    const privateStatsIds = extractPrivateStatsIds(modBody)
    return { globals, privateStatsIds }
}

function parseStringArray(s) {
    const t = s.trim()
    if (!t.startsWith('[')) return []
    const inner = t.slice(1, -1)
    const out = []
    const re = /"([^"]*)"|'([^']*)'/g
    let m
    while ((m = re.exec(inner))) out.push(m[1] ?? m[2])
    return out
}

// PrivateStatsAllIds is exported as a top-level array in WAWebWamGlobals:
//   var u=[{key:"DefaultPsId",keyHashInt:113760892,rotationPeriodDays:-1},...]
// We locate it by finding `l.PrivateStatsAllIds=<var>`, then tracing the var.
// Falls back to scanning for `[{key:"...",keyHashInt:` literal patterns.
function extractPrivateStatsIds(modBody) {
    // Quick path: scan for the literal pattern.
    const arrRe = /\[(\{[^[\]]*key:"[^"]+",[^[\]]*keyHashInt:\s*-?\d+[^[\]]*\}(?:\s*,\s*\{[^[\]]*\})*)\]/
    const am = modBody.match(arrRe)
    if (!am) return []
    const inner = am[1]
    const out = []
    // Each entry: `{key:"X",keyHashInt:N,rotationPeriodDays:N}`
    const entryRe = /\{[^}]+\}/g
    let em
    while ((em = entryRe.exec(inner))) {
        const obj = em[0]
        const keyM = obj.match(/\bkey\s*:\s*"([^"]+)"/)
        const hashM = obj.match(/\bkeyHashInt\s*:\s*(-?\d+)/)
        const rotM = obj.match(/\brotationPeriodDays\s*:\s*(-?\d+)/)
        if (keyM && hashM && rotM) {
            out.push({
                key: keyM[1],
                keyHashInt: Number(hashM[1]),
                rotationPeriodDays: Number(rotM[1])
            })
        }
    }
    return out
}

// --- reserved globals + protocol constants ------------------------------

// Parse WAWebWamLibContext's batch-write block to recover the literal field
// IDs it sets via `this.set(<id>, <value>)`. Looks for a leading numeric
// const-decl block (`var e,s=47,u=3433,c=6005,d=0,...`) and the subsequent
// `this.set(<varname>, ...)` calls; reports each (id, label) pair.
function extractReservedGlobals(modBody) {
    if (!modBody) return []
    // Pull every `var X=N,Y=N,...` const-bound numeric in the module's
    // prologue. The LibContext IIFE declares its constants before the class.
    const constMap = {}
    const constRe = /\b([a-z])\s*=\s*(\d+)\b/g
    let cm
    while ((cm = constRe.exec(modBody))) {
        if (!(cm[1] in constMap)) constMap[cm[1]] = Number(cm[2])
    }
    // Find `this.set(<ident>, <expr>)` calls. The label is best-effort: read
    // a recognisable RHS expression and tag the well-known field IDs. When
    // the RHS is a bare identifier (e.g. `this.set(u, a)`) we trace `a` back
    // to its closest preceding `var <id>=<expr>` binding before classifying.
    const setRe = /this\.set\(\s*([a-z])\s*,\s*([^)]+?)\)/g
    const out = []
    const seenIds = new Set()
    const classify = (rhs) => {
        if (/\.commitTime\b/.test(rhs)) return 'commitTime'
        if (/SequenceNumber|getEventSequenceNumber/.test(rhs)) return 'eventSequenceNumber'
        if (/PrivateStats|psId|getLatestPrivateStatsIdValueFromKey/i.test(rhs)) return 'psIdValue'
        return null
    }
    let sm
    while ((sm = setRe.exec(modBody))) {
        const id = constMap[sm[1]]
        if (id == null || seenIds.has(id)) continue
        seenIds.add(id)
        const rhs = sm[2].trim()
        let label = classify(rhs)
        if (!label && /^[a-z]\w*$/.test(rhs)) {
            // Bare identifier — trace back to closest preceding `var <id>=<expr>`
            // (or `,<id>=<expr>` chain) before the set call.
            const traced = traceVarInit(modBody, rhs, sm.index)
            if (traced) label = classify(traced)
        }
        if (label) out.push({ id, label })
    }
    return out
}

// Trace the closest preceding `<ident>=<expr>` binding before `scanBefore`.
// Captures the RHS expression with paren/string awareness — stops at the
// first top-level `;` `,` or `&&` (the LibContext write function uses a
// `a!=null && this.set(u,a)` chain right after the assignment). Returns the
// trimmed RHS expression, or null.
function traceVarInit(modBody, ident, scanBefore) {
    const sub = modBody.slice(0, scanBefore)
    const headRe = new RegExp(`\\b${escapeRegex(ident)}\\s*=\\s*`, 'g')
    let last = null
    let m
    while ((m = headRe.exec(sub))) {
        const start = m.index + m[0].length
        const rhs = readExprUntilTopLevel(sub, start)
        if (rhs) last = rhs
    }
    return last
}

function readExprUntilTopLevel(s, start) {
    let i = start
    let depth = 0
    let inStr = null
    while (i < s.length) {
        const c = s[i]
        if (inStr) {
            if (c === '\\') i += 2
            else if (c === inStr) {
                inStr = null
                i++
            } else i++
            continue
        }
        if (c === '"' || c === "'" || c === '`') {
            inStr = c
            i++
            continue
        }
        if (c === '(' || c === '[' || c === '{') depth++
        else if (c === ')' || c === ']' || c === '}') {
            if (depth === 0) break
            depth--
        } else if (depth === 0) {
            if (c === ';' || c === ',') break
            if (c === '&' && s[i + 1] === '&') break
            if (c === '|' && s[i + 1] === '|') break
        }
        i++
    }
    return s.slice(start, i).trim()
}

// Parse `WAWebWamConstants.<NAME> = <var>` — trace `<var>` back to its
// numeric initialiser in the module's var-decl chain (e.g.
// `var e=5e4,l=5,s=100,u=64e3,c=5,d=120`). Accepts decimal, exponent,
// and negative literals.
function extractWamConstant(modBody, constName) {
    const expM = modBody.match(
        new RegExp(`\\b[a-z]\\.${escapeRegex(constName)}\\s*=\\s*([a-z])\\b`)
    )
    if (!expM) return null
    const varName = expM[1]
    const declRe = new RegExp(`\\b${varName}\\s*=\\s*(-?\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?)`)
    const declM = modBody.match(declRe)
    if (!declM) return null
    const n = Number(declM[1])
    return Number.isFinite(n) ? n : null
}

// --- enum resolution ----------------------------------------------------

// Given an enum module body, find the named export's `Object.freeze({...})`
// initializer and return its `{KEY: number}` map. Two-step lookup:
//   1. `<exportsVar>.<EXPORT_NAME> = <var>`  finds the backing local var
//   2. `<var> = Object.freeze({K:N,...})`     reads the literal
// Returns `null` if either step fails.
function parseEnumExport(modBody, exportName) {
    const exportRe = new RegExp(
        `\\b[a-z]\\.${escapeRegex(exportName)}\\s*=\\s*([A-Za-z_$][\\w$]*)\\b`
    )
    const exportM = modBody.match(exportRe)
    if (!exportM) return null
    const varName = exportM[1]
    const ozRe = new RegExp(`\\b${escapeRegex(varName)}\\s*=\\s*Object\\.freeze\\(\\{`)
    const ozM = modBody.match(ozRe)
    if (!ozM) return null
    const objOpen = ozM.index + ozM[0].length - 1 // at `{`
    const objClose = skipExpr(modBody, objOpen + 1, ['}'])
    const inner = modBody.slice(objOpen + 1, objClose)
    const values = {}
    // `KEY:N` entries — keys are ALL_CAPS or PascalCase, values are integers.
    const entryRe = /([A-Za-z_$][\w$]*)\s*:\s*(-?\d+)/g
    let em
    while ((em = entryRe.exec(inner))) {
        values[em[1]] = Number(em[2])
    }
    return Object.keys(values).length > 0 ? values : null
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Pull the dep-array of `WAWebWamProcessWorkerData` and filter to `*WamEvent`
// modules. The main thread imports every module that the WORKER thread might
// commit events for — by referencing each `n("X").XWamEvent` in its `m()`
// helper — so this dep list is the canonical manifest of worker-emitted
// events. Returns a Set of module names.
//
// Events not in this set are committed only from the main thread.
function extractWorkerEmittedEventModules(modules) {
    const mod = modules.get('WAWebWamProcessWorkerData')
    if (!mod) return new Set()
    const depsM = mod.text.match(/__d\("WAWebWamProcessWorkerData",\s*\[([^\]]*)\]/)
    if (!depsM) return new Set()
    const out = new Set()
    const re = /"([^"]+WamEvent)"/g
    let m
    while ((m = re.exec(depsM[1]))) out.add(m[1])
    return out
}

// --- public entry -------------------------------------------------------

function extractWam(bundles) {
    const modules = indexModules(bundles)
    const diagnostics = {
        modulesIndexed: modules.size,
        eventsFound: 0,
        eventsErrored: 0,
        errors: [],
        enumsResolved: 0,
        enumsUnresolved: []
    }

    // Discover the worker-emitted manifest first so we can tag each event
    // with its origin during extraction.
    const workerModules = extractWorkerEmittedEventModules(modules)

    // Step 1 — enumerate every module that registers a WAM event. The
    // identifier is the literal `.defineEvents(` string in the body.
    const events = {}
    for (const [name, mod] of modules) {
        if (!mod.text.includes('.defineEvents(')) continue
        try {
            const ev = extractEvent(name, mod.text)
            if (ev && ev.name && ev.id != null) {
                ev.emittedByWorker = workerModules.has(name)
                events[ev.name] = ev
                diagnostics.eventsFound++
            } else {
                diagnostics.eventsErrored++
                diagnostics.errors.push({ module: name, error: 'incomplete' })
            }
        } catch (err) {
            diagnostics.eventsErrored++
            diagnostics.errors.push({ module: name, error: err.message })
        }
    }

    // Step 2 — globals + private stats ids from WAWebWamGlobals.
    const globalsMod = modules.get('WAWebWamGlobals')
    let globals = {}
    let privateStatsIds = []
    if (globalsMod) {
        const result = extractGlobalsModule(globalsMod.text)
        globals = result.globals
        privateStatsIds = result.privateStatsIds
    }

    // The runtime in WAWebWamPrivateStats imperatively appends a synthetic
    // "none" bucket: `c[0]="none", d.none=0, m.none={value:"none",
    // rotationPeriodDays:-1}`. This isn't declared in PrivateStatsAllIds but
    // is the bucket that backs every event with `privateStatsIdInt: 0` (20+
    // events on the current snapshot — BizCatalogView, ChannelOpenFromInvite,
    // CtwaConsumerDisclosure, etc.). We include it here so consumers can
    // resolve `0` without having to special-case the runtime injection.
    const hasNone = privateStatsIds.some((p) => p.keyHashInt === 0)
    if (!hasNone) {
        privateStatsIds.push({ key: 'none', keyHashInt: 0, rotationPeriodDays: -1 })
    }

    // Reserved globals — `WAWebWamLibContext.write` injects three IDs at
    // batch-serialisation time that are NOT declared via `defineGlobal`:
    //
    //   47   commitTime           — unix time (seconds) when the event was
    //                                committed (written via writeGlobalAttribute
    //                                marker=0 just before each event)
    //   3433 eventSequenceNumber  — Beaconing sequence (set only when
    //                                WAWebWamBeaconing.maybeGetEventSequenceNumber
    //                                returns non-null for this buffer's channel)
    //   6005 psId                 — value of the rotating psId bucket for
    //                                channel='private' events. (This id is
    //                                also declared in WAWebWamGlobals.psId,
    //                                listed here for completeness — same id,
    //                                same purpose.)
    //
    // The wire format puts these in the global-attribute namespace (marker
    // byte = 0), which is disjoint from the event-field namespace (marker
    // byte = 2). Field IDs 47/3433 appearing inside event tuples don't
    // collide on the wire — they're tagged with the field marker, not
    // the global marker.
    const wamLibContextMod = modules.get('WAWebWamLibContext')
    const reservedGlobals = extractReservedGlobals(wamLibContextMod?.text)

    // Wire protocol version — `WAWebWamConstants.WAM_PROTOCOL_VERSION` (5 on
    // the current snapshot). Stamped as the second byte of every batch
    // header right after the literal "WAM" magic.
    const wamConstantsMod = modules.get('WAWebWamConstants')
    const protocolVersion = wamConstantsMod
        ? extractWamConstant(wamConstantsMod.text, 'WAM_PROTOCOL_VERSION')
        : null

    // Wire channel codes — `WAWebWamLibContext` writes:
    //   regular  → 0
    //   realtime → 1
    //   private  → 2
    // (Constant; baked into the LibContext constructor.) Expose so consumers
    // building their own encoders don't need to mirror these magic numbers.
    const channelWireCodes = { regular: 0, realtime: 1, private: 2 }

    // Buffer/upload tuning constants from `WAWebWamConstants` — the runtime
    // flushes when any of (a) buffer.size() exceeds MAX_BUFFER_SIZE bytes,
    // (b) BUFFER_ROTATE_INTERVAL_IN_SECS has elapsed, or (c) IN_MEMORY_
    // BUFFERING_DURATION_IN_SECS has elapsed for a non-empty buffer. The
    // server rejects uploads larger than MAX_BUFFER_SIZE_FOR_UPLOAD bytes.
    //
    // Guest mode (web.whatsapp.com without an authenticated user, accessed
    // via a guest companion link) overrides the two time-based thresholds
    // with much shorter values via `WAWebGuestCoreWamConstants` — guest
    // sessions are short-lived so the runtime flushes more aggressively
    // (1s vs 5s in-memory, 2s vs 120s rotation). Size thresholds are shared.
    const guestConstantsMod = modules.get('WAWebGuestCoreWamConstants')
    const bufferConstants = wamConstantsMod
        ? {
              maxBufferSize: extractWamConstant(wamConstantsMod.text, 'WAM_MAX_BUFFER_SIZE'),
              maxBufferSizeForUpload: extractWamConstant(wamConstantsMod.text, 'WAM_MAX_BUFFER_SIZE_FOR_UPLOAD'),
              inMemoryBufferingDurationSecs: extractWamConstant(wamConstantsMod.text, 'WAM_IN_MEMORY_BUFFERING_DURATION_IN_SECS'),
              bufferRotateIntervalSecs: extractWamConstant(wamConstantsMod.text, 'WAM_BUFFER_ROTATE_INTERVAL_IN_SECS'),
              workerDataBatchSize: extractWamConstant(wamConstantsMod.text, 'WAM_WORKER_DATA_BATCH_SIZE'),
              guestInMemoryBufferingDurationSecs: guestConstantsMod
                  ? extractWamConstant(guestConstantsMod.text, 'WAM_IN_MEMORY_BUFFERING_DURATION_IN_SECS_FOR_GUEST')
                  : null,
              guestBufferRotateIntervalSecs: guestConstantsMod
                  ? extractWamConstant(guestConstantsMod.text, 'WAM_BUFFER_ROTATE_INTERVAL_IN_SECS_FOR_GUEST')
                  : null
          }
        : null

    // Wire-format marker/flag/encoding bits used by `WAWebWamLibProtocol`
    // (and its worker-thread sibling `WAWamBuffer`). These are the magic
    // numbers a consumer needs to write or parse the binary TLV format
    // directly. The marker byte's bottom 4 bits encode the marker type
    // (`globalAttribute` / `event` / `field`) plus the `last` flag plus
    // `extendedId` flag; the top 4 bits encode the value's wire type +
    // size class. See WAWebWamLibProtocol's `f()` function for the
    // full state machine.
    const wireFormat = {
        markers: {
            globalAttribute: 0,
            event: 1,
            field: 2,
            lastFlag: 4,
            extendedIdFlag: 8
        },
        // Top 4 bits of the marker byte. Tells the decoder how to read the
        // value that follows (or that there isn't one — for `null` and the
        // intZero/intOne shortcuts).
        valueEncodingBits: {
            null: 0,
            intZero: 16, // no payload — value is 0
            intOne: 32, // no payload — value is 1
            int8: 48, // 1-byte signed payload
            int16: 64, // 2-byte signed payload
            int32: 80, // 4-byte signed payload
            int64: 96, // 8-byte signed payload (WAWamBuffer worker only — LibProtocol caps at int32)
            float64: 112, // 8-byte IEEE-754 payload
            stringShort: 128, // 1-byte length prefix, UTF-8 bytes
            stringMedium: 144, // 2-byte length prefix, UTF-8 bytes
            stringLong: 160 // 4-byte length prefix, UTF-8 bytes
        }
    }

    // Step 3 — resolve every enum referenced by an event or a global. We
    // dedupe by (module, export) since the same enum may be referenced by
    // many fields. Output is keyed by export name (the canonical WAM enum
    // identifier — e.g. UI_ACTION_TYPE).
    const enumRefs = new Map() // exportName → moduleName
    for (const ev of Object.values(events)) {
        for (const f of Object.values(ev.fields)) {
            if (f.type === 'enum') enumRefs.set(f.enumExport, f.enumModule)
        }
    }
    for (const g of Object.values(globals)) {
        if (g.type === 'enum') enumRefs.set(g.enumExport, g.enumModule)
    }

    const enums = {}
    for (const [exportName, moduleName] of enumRefs) {
        const mod = modules.get(moduleName)
        if (!mod) {
            diagnostics.enumsUnresolved.push({ module: moduleName, export: exportName, reason: 'module-not-found' })
            continue
        }
        const values = parseEnumExport(mod.text, exportName)
        if (!values) {
            diagnostics.enumsUnresolved.push({ module: moduleName, export: exportName, reason: 'export-not-found' })
            continue
        }
        enums[exportName] = { module: moduleName, export: exportName, values }
        diagnostics.enumsResolved++
    }

    // Discover the union of channels actually used across events + globals
    // for the IR header. The runtime supports regular/private/realtime; we
    // emit whatever appears.
    const channelSet = new Set()
    for (const ev of Object.values(events)) channelSet.add(ev.channel)
    for (const g of Object.values(globals)) for (const c of g.channels) channelSet.add(c)
    const channels = [...channelSet].sort()

    return {
        events,
        globals,
        enums,
        privateStatsIds,
        reservedGlobals,
        protocolVersion,
        channels,
        channelWireCodes,
        bufferConstants,
        wireFormat,
        diagnostics
    }
}

module.exports = { extractWam }
