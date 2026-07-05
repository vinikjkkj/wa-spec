#!/usr/bin/env node
'use strict'

/**
 * Reads raw WA Web bundle .js files from a directory, runs the static mex
 * extractor over them, and writes three artifacts to the package root:
 *
 *   - index.json   raw IR (for programmatic/non-TS consumers)
 *   - index.js     CommonJS runtime (frozen WA_MEX_PERSIST_IDS + SCHEMAS)
 *   - index.d.ts   TypeScript types (per-op variables + responses)
 *
 * Usage:
 *   npx wa-mex apply --bundles dump/raw/<wa-version>/
 */

const fs = require('node:fs')
const path = require('node:path')
const { extractMex } = require('./extract-mex.cjs')
const { buildOverrides, applyOverrides } = require('./wire-overrides.cjs')
const { discoverEnums, matchEnumForLeaf } = require('./enum-discovery.cjs')

function parseArgs(argv) {
    const opts = { bundles: null, manifest: null, out: null, waVersion: null }
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--bundles') opts.bundles = argv[++i]
        else if (a === '--manifest') opts.manifest = argv[++i]
        else if (a === '--out') opts.out = argv[++i]
        else if (a === '--wa-version') opts.waVersion = argv[++i]
        else if (a === '--help' || a === '-h') {
            printHelp()
            process.exit(0)
        } else if (!opts.bundles && !a.startsWith('--')) {
            opts.bundles = a
        } else {
            console.error('unknown flag:', a)
            printHelp()
            process.exit(2)
        }
    }
    if (!opts.bundles && opts.manifest) {
        try {
            const m = JSON.parse(fs.readFileSync(opts.manifest, 'utf8'))
            opts.bundles = path.resolve(path.dirname(opts.manifest), m.rawDir)
            if (!opts.waVersion) opts.waVersion = m.waVersion ?? null
        } catch (err) {
            console.error(`apply: failed to read manifest ${opts.manifest}:`, err.message)
            process.exit(1)
        }
    }
    if (!opts.bundles) {
        printHelp()
        process.exit(2)
    }
    return opts
}

function printHelp() {
    console.error(
        [
            'usage: wa-mex apply (--bundles <dir> | --manifest <file>) [--out <dir>] [--wa-version <ver>]',
            '',
            '  --bundles <dir>     directory containing raw .js bundle dumps',
            '  --manifest <file>   read rawDir + waVersion from this manifest.json',
            '  --out <dir>         output directory (default: <pkg> root)',
            '  --wa-version <ver>  pin the version stamped into output headers'
        ].join('\n')
    )
}

function loadBundles(dir) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
        console.error(`bundles dir not found: ${dir}`)
        process.exit(1)
    }
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'))
    if (files.length === 0) {
        console.error(`no .js bundles in ${dir}`)
        process.exit(1)
    }
    return files.map((f) => ({
        url: f,
        text: fs.readFileSync(path.join(dir, f), 'utf8')
    }))
}

function detectWaVersion(bundlesDir, fallback) {
    const candidates = [
        path.join(bundlesDir, 'manifest.json'),
        path.join(bundlesDir, '..', 'manifest.json'),
        path.join(bundlesDir, '..', '..', 'manifest.json')
    ]
    for (const m of candidates) {
        try {
            const data = JSON.parse(fs.readFileSync(m, 'utf8'))
            if (typeof data.waVersion === 'string') return data.waVersion
        } catch {}
    }
    const base = path.basename(path.resolve(bundlesDir))
    if (/^\d+\.\d+/.test(base)) return base
    return fallback ?? 'unknown'
}

// --- short-key transformation + safe quoting ---

function shortKey(opName) {
    return opName
        .replace(/^WAWebMex/, '')
        .replace(/^WAWeb/, '')
        .replace(/Job(Mutation|Query)$/, '')
        .replace(/(Mutation|Query)$/, '')
}

function quote(s) {
    return `'${String(s).replace(/'/g, "\\'")}'`
}

function keyLiteral(name) {
    return /^[A-Za-z_$][\w$]*$/.test(name) ? name : quote(name)
}

// Recursive emitter for shapes captured by the extractor:
//   null              → unknown (legacy fallback)
//   'string'/'number'/'boolean'/'unknown'  → TS primitive
//   'enum:A|B|C'      → 'A' | 'B' | 'C' string literal union
//   { ...fields }     → singular object
//   [{ ...fields }]   → plural object (ReadonlyArray)
function emitShapeType(node, indent) {
    if (node === null || node === undefined) return 'unknown'
    if (typeof node === 'string') return emitLeafTag(node)
    if (Array.isArray(node)) {
        const inner = node[0] ?? null
        return `ReadonlyArray<${emitShapeType(inner, indent)}>`
    }
    if (typeof node === 'object') {
        const keys = Object.keys(node)
        if (keys.length === 0) return 'Readonly<Record<string, unknown>>'
        const inner = indent + '    '
        const lines = keys.map(
            (k) => `${inner}readonly ${keyLiteral(k)}?: ${emitShapeType(node[k], inner)}`
        )
        return `{\n${lines.join('\n')}\n${indent}}`
    }
    return 'unknown'
}

function emitLeafTag(tag) {
    if (tag === 'string' || tag === 'number' || tag === 'boolean' || tag === 'unknown') return tag
    if (tag.startsWith('enum:')) {
        const vals = tag.slice(5).split('|').filter(Boolean)
        if (vals.length === 0) return 'string'
        return vals.map((v) => `'${v.replace(/'/g, "\\'")}'`).join(' | ')
    }
    return 'unknown'
}

// Field names that should be treated as arrays of the leaf type even when
// the Relay artifact emits them as ScalarField without `plural:!0` — Relay's
// compact representation flattens `[Scalar]` lists. Examples:
//   `xwa2_newsletter_admin.capabilities`   → ReadonlyArray<enum:...>
//   `xfb_fetch_genai_personas[].icebreaker_prompt_list` → ReadonlyArray<string>
// The check is used both when promoting unknown→enum and when promoting
// unknown→string for plural-noun scalar lists.
function isPluralListField(fieldName) {
    return /^(?:capabilities|abilities|features|permissions|categories|tags|labels|prompts|exposures|metrics|reasons|sources|targets|suggestions|disabled_features|country_codes|phone_numbers|nux_ids|custom_labels|url_domains|privacy_features)$/.test(fieldName) ||
        /_(?:capabilities|abilities|features|permissions|categories|tags|labels|prompts|ids|codes|keys|paths|fields|names|jids|lids|wids|domains|tokens|emails|phones|values|cookies|hashes|list|prompt_list)$/.test(fieldName)
}

// Walk the shape tree and promote `string`/`unknown` leaves to `enum:V1|V2|...`
// when an enum module exports a value set under a name matching the field.
//
// When the matched leaf's field name is a plural-noun list, the leaf becomes
// `[enum:...]` (a ReadonlyArray<enum>) — the Relay artifact compacts list-of-
// scalar to a bare ScalarField, so structural extraction can't tell. We
// re-introduce the array level here.
function promoteEnumsInShape(node, parents, enumIndex, stats, opName) {
    if (node === null || node === undefined) return node
    if (Array.isArray(node)) {
        node[0] = promoteEnumsInShape(node[0], parents, enumIndex, stats, opName)
        return node
    }
    if (typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
            if (typeof v === 'string' && (v === 'unknown' || v === 'string')) {
                const match = matchEnumForLeaf(parents, k, enumIndex, opName)
                if (match) {
                    const tag = 'enum:' + match.values.join('|')
                    node[k] = isPluralListField(k) ? [tag] : tag
                    stats.applied++
                    stats.byField[match.name] = (stats.byField[match.name] || 0) + 1
                }
            } else if (v !== null && typeof v === 'object') {
                node[k] = promoteEnumsInShape(v, [...parents, k], enumIndex, stats, opName)
            }
        }
        return node
    }
    return node
}

// After all classification + enum promotion, if a leaf is an `enum:V1|...`
// whose value set is a STRICT SUBSET of some discovered Mirrored enum, prefer
// the discovered superset — the inferred values are a lower bound (only what
// some caller compared against) but the schema admits more. Walking by
// candidate enum names plus by value-overlap covers both:
//   1) Name match: `state.type` → `WamoSubStatus` (mirrored: ACTIVE|INACTIVE).
//   2) Value overlap: `role: ADMIN|OWNER` → `NewsletterMembershipType`
//      (switch-derived: ADMIN|GUEST|OWNER|SUBSCRIBER).
function expandSubsetEnums(node, parents, enumIndex, stats, opName) {
    if (node === null || node === undefined) return node
    if (Array.isArray(node)) {
        node[0] = expandSubsetEnums(node[0], parents, enumIndex, stats, opName)
        return node
    }
    if (typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
            if (typeof v === 'string' && v.startsWith('enum:')) {
                const expanded = findSupersetEnum(v, parents, k, enumIndex, opName)
                if (expanded) {
                    node[k] = 'enum:' + expanded.values.slice().sort().join('|')
                    stats.expanded = (stats.expanded || 0) + 1
                }
            } else if (Array.isArray(v) && v.length === 1 && typeof v[0] === 'string' && v[0].startsWith('enum:')) {
                const expanded = findSupersetEnum(v[0], parents, k, enumIndex, opName)
                if (expanded) {
                    node[k] = ['enum:' + expanded.values.slice().sort().join('|')]
                    stats.expanded = (stats.expanded || 0) + 1
                }
            } else if (v !== null && typeof v === 'object') {
                node[k] = expandSubsetEnums(v, [...parents, k], enumIndex, stats, opName)
            }
        }
        return node
    }
    return node
}

// Given an inferred `enum:V1|V2|...` leaf, find the most authoritative
// superset to expand into. Priority:
//   (1) Name-match against the discovered enum index (most reliable).
//   (2) Strict-superset scan of all NAMED Mirrored entries.
//   (3) Strict-superset scan of ANONYMOUS UPPER_SNAKE case sets recovered
//       from switches that don't carry a canonical name. Catches the
//       NewsletterState `case "ACTIVE":case "SUSPENDED":case"DELETED":
//       case"GEOSUSPENDED":{...}` fallthrough block — no enum name attached,
//       but the set is wire-correct.
function findSupersetEnum(enumTag, parents, k, enumIndex, opName) {
    const inferredVals = new Set(enumTag.slice(5).split('|'))
    // Name-match is the strongest signal — it ties the field to a specific
    // GraphQL enum by name. A single-value inference (e.g. only `SUCCESS`
    // recovered from one `===` comparison) is OK to expand here because the
    // name match itself confirms identity.
    const named = matchEnumForLeaf(parents, k, enumIndex, opName)
    if (named && coversAndExtends(inferredVals, named.values)) return named
    // Blind superset scans (steps 2 and 3) — only allowed when the inferred
    // set has ≥2 distinct values. Otherwise a single-value field like
    // `result: SUCCESS` would match any unrelated enum that happens to
    // contain SUCCESS, e.g. `xwa2_username_check.result` getting fused with
    // the newsletter integrity review enum `{PENDING, REJECT, SUCCESS,
    // CONTENT_UNAVAILABLE}`. With ≥2 values the false-positive risk drops
    // sharply because BOTH values have to coincidentally co-occur in some
    // unrelated enum.
    if (inferredVals.size < 2) return null
    for (const [name, entry] of Object.entries(enumIndex)) {
        if (entry.kind !== 'mirrored') continue
        if (!coversAndExtends(inferredVals, entry.values)) continue
        return { name, values: entry.values }
    }
    const anon = enumIndex.__anonymousSets
    if (Array.isArray(anon)) {
        for (const set of anon) {
            if (!coversAndExtends(inferredVals, set.values)) continue
            return { name: '<anon>', values: set.values }
        }
    }
    return null
}

function coversAndExtends(inferredSet, discoveredVals) {
    if (!Array.isArray(discoveredVals) || discoveredVals.length === 0) return false
    if (inferredSet.size === 0) return false
    if (discoveredVals.length <= inferredSet.size) return false
    for (const v of inferredSet) if (!discoveredVals.includes(v)) return false
    return true
}

// Walk the shape collecting every `enum:V1|V2|...` leaf, bucketing by
// `<parent>.<field>` suffix (the last two path segments). Used by the
// cross-op union pass to merge all observed values for the same logical
// field across operations.
function collectSemanticEnums(node, parents, out) {
    if (node === null || node === undefined) return
    if (Array.isArray(node)) { collectSemanticEnums(node[0], parents, out); return }
    if (typeof node !== 'object') return
    for (const [k, v] of Object.entries(node)) {
        const newPath = [...parents, k]
        if (typeof v === 'string' && v.startsWith('enum:')) {
            const key = semanticKey(newPath)
            const set = (out[key] = out[key] || new Set())
            for (const val of v.slice(5).split('|')) set.add(val)
        } else if (Array.isArray(v) && v.length === 1 && typeof v[0] === 'string' && v[0].startsWith('enum:')) {
            const key = semanticKey(newPath)
            const set = (out[key] = out[key] || new Set())
            for (const val of v[0].slice(5).split('|')) set.add(val)
        } else if (v !== null && typeof v === 'object') {
            collectSemanticEnums(v, newPath, out)
        }
    }
}

// Apply the union back to every matching leaf. `parent.field` keys with only
// one distinct value across the whole IR are skipped (no merge needed).
// When the union set is broader than the leaf's current set, the leaf is
// rewritten with the union — this is safe because GraphQL Enum types are
// shared across ops, and additional values can only appear if at least one
// op observed them.
function applySemanticEnumUnion(node, parents, unionMap, stats) {
    if (node === null || node === undefined) return node
    if (Array.isArray(node)) { node[0] = applySemanticEnumUnion(node[0], parents, unionMap, stats); return node }
    if (typeof node !== 'object') return node
    for (const [k, v] of Object.entries(node)) {
        const newPath = [...parents, k]
        if (typeof v === 'string' && v.startsWith('enum:')) {
            const union = unionMap[semanticKey(newPath)]
            if (!union) continue
            const current = new Set(v.slice(5).split('|'))
            if (current.size === union.size) continue
            // Only expand — never shrink. The union always covers current
            // since current contributed to it.
            node[k] = 'enum:' + [...union].sort().join('|')
            stats.expanded = (stats.expanded || 0) + 1
        } else if (v === 'string') {
            // Promote bare-string leaves to the semantic union when one
            // exists. This catches ops where no caller-code === comparison
            // pinned the enum but the field is the same logical GraphQL enum
            // seen in sibling ops (e.g. FetchSimilarNewsletters.state.type
            // had no comparison so stays `string`, but every other op's
            // state.type is the NewsletterState enum). Skip 1-value unions
            // (those don't add information).
            const union = unionMap[semanticKey(newPath)]
            if (!union || union.size < 2) continue
            node[k] = 'enum:' + [...union].sort().join('|')
            stats.expanded = (stats.expanded || 0) + 1
        } else if (Array.isArray(v) && v.length === 1 && typeof v[0] === 'string' && v[0].startsWith('enum:')) {
            const union = unionMap[semanticKey(newPath)]
            if (!union) continue
            const current = new Set(v[0].slice(5).split('|'))
            if (current.size === union.size) continue
            node[k] = ['enum:' + [...union].sort().join('|')]
            stats.expanded = (stats.expanded || 0) + 1
        } else if (v !== null && typeof v === 'object') {
            node[k] = applySemanticEnumUnion(v, newPath, unionMap, stats)
        }
    }
    return node
}

// Semantic key = `<root-concept>.<parent>.<field>` (last 2 segments). The
// root concept comes from the singularized first token of the WA-Mex root
// (`xwa2_newsletter_followers` → `newsletter`, `xwa2_group_query_by_id` →
// `group`). This keeps enums for the same logical type unified across
// different XWA root wrappers (e.g. `xwa2_newsletter.state.type` ⇌
// `xwa2_newsletters_recommended.result.state.type` both bucket as
// `newsletter.state.type`) WITHOUT cross-pollinating fields that happen to
// share the trailing `<parent>.<field>` suffix from a different domain
// (e.g. `newsletter.edges.role` ≠ `group.edges.role`).
function semanticKey(path) {
    if (path.length === 0) return ''
    const root = path[0]
    const concept = extractRootConcept(root)
    const tail = path.slice(-2).join('.')
    return concept ? concept + '.' + tail : tail
}

function extractRootConcept(root) {
    if (typeof root !== 'string') return null
    // Strip the WA Mex namespace prefix and the leading wrapper-result
    // operator markers; tokenize and take the first meaningful word.
    const stripped = root.replace(/^xwa2?_/, '').replace(/^xfb_/, '')
    const tokens = stripped.split('_').filter(Boolean)
    if (tokens.length === 0) return null
    return singularize(tokens[0])
}

function singularize(s) {
    if (/ies$/.test(s)) return s.slice(0, -3) + 'y'
    if (/sses$/.test(s)) return s.slice(0, -2)
    if (/s$/.test(s) && !/ss$/.test(s)) return s.slice(0, -1)
    return s
}

// Walk the IR; for each bare `string` leaf whose path ends in
// `<parent>.<field>` matching a key in parentFieldEnums, promote it to
// `enum:V1|V2|...`. Keeps existing enums and non-string leaves intact.
function promoteByParentFieldMap(node, parents, parentFieldEnums, stats) {
    if (node === null || node === undefined) return node
    if (Array.isArray(node)) {
        node[0] = promoteByParentFieldMap(node[0], parents, parentFieldEnums, stats)
        return node
    }
    if (typeof node !== 'object') return node
    for (const [k, v] of Object.entries(node)) {
        if (v === 'string' && parents.length > 0) {
            const lastParent = parents[parents.length - 1]
            const key = lastParent + '.' + k
            const vals = parentFieldEnums[key]
            if (vals && vals.length >= 2) {
                node[k] = 'enum:' + vals.slice().sort().join('|')
                stats.expanded = (stats.expanded || 0) + 1
            }
        } else if (v !== null && typeof v === 'object') {
            node[k] = promoteByParentFieldMap(v, [...parents, k], parentFieldEnums, stats)
        }
    }
    return node
}

// Walk the IR; for each `unknown` leaf whose path ends in `<parent>.<field>`
// matching a key in parentFieldScalars, set it to the scanned scalar type.
// Only promotes `unknown` — never overrides a locally-inferred type — so it
// strictly fills gaps where the typing evidence lived in a module outside the
// op's respBodies window (e.g. `pinned_messages.expiry_ts`, only coerced via
// `Number(n.expiry_ts)` in a shared parse util).
function promoteByParentFieldScalars(node, parents, parentFieldScalars, fieldScalars, stats) {
    if (node === null || node === undefined) return node
    if (Array.isArray(node)) {
        node[0] = promoteByParentFieldScalars(node[0], parents, parentFieldScalars, fieldScalars, stats)
        return node
    }
    if (typeof node !== 'object') return node
    for (const [k, v] of Object.entries(node)) {
        if (v === 'unknown') {
            // Prefer the parent-qualified signal; fall back to the distinctive
            // field-name signal (helper-param coercions lose the parent).
            const ty =
                (parents.length > 0 && parentFieldScalars[parents[parents.length - 1] + '.' + k]) ||
                fieldScalars[k]
            if (ty) {
                node[k] = ty
                stats.scalarFilled = (stats.scalarFilled || 0) + 1
            }
        } else if (v !== null && typeof v === 'object') {
            node[k] = promoteByParentFieldScalars(v, [...parents, k], parentFieldScalars, fieldScalars, stats)
        }
    }
    return node
}

function main() {
    const opts = parseArgs(process.argv)
    const bundles = loadBundles(opts.bundles)
    const waVersion = opts.waVersion ?? detectWaVersion(opts.bundles)
    const { operations: rawOps, diagnostics } = extractMex(bundles)

    // Re-key by shortKey. When two ops collide (e.g. same name with both a
    // Mutation and Query variant), disambiguate the LATER one by appending
    // its capitalised operationKind ("Mutation" / "Query"). Both end up
    // unique without losing either operation.
    const ops = {}
    let disambiguated = 0
    for (const [opName, op] of Object.entries(rawOps)) {
        let key = shortKey(opName)
        if (ops[key]) {
            const suffix =
                op.operationKind.charAt(0).toUpperCase() + op.operationKind.slice(1)
            const altKey = `${key}${suffix}`
            if (ops[altKey]) {
                console.error(
                    `apply: unresolvable collision for ${key} (already taken by ${ops[key].__opName} and ${ops[altKey].__opName}) — dropping ${opName}`
                )
                continue
            }
            key = altKey
            disambiguated++
        }
        ops[key] = { ...op, __opName: opName }
    }

    const sortedKeys = Object.keys(ops).sort()
    const outDir = opts.out ? path.resolve(opts.out) : path.resolve(__dirname, '..')

    // ---- Global enum discovery (cross-module) ----
    // Find every `e.Mirrored([...])` and pure-string enum object in any
    // bundle, link to its exported canonical name (e.g. `EnforcementType`,
    // `WamoSubStatus`). Then for every `string`/`unknown` leaf, try to
    // match the field's CamelCase name (with parent context) against the
    // enum index — when found, promote to `enum:V1|V2|...`.
    let enumStats = null
    try {
        const enumIndex = discoverEnums(bundles)
        enumStats = { discovered: Object.keys(enumIndex).length, applied: 0, expanded: 0, byField: {} }
        for (const key of sortedKeys) {
            const op = ops[key]
            const opNameForMatcher = op.__opName || key
            promoteEnumsInShape(op.response, [], enumIndex, enumStats, opNameForMatcher)
            promoteEnumsInShape(op.variablesShape, [], enumIndex, enumStats, opNameForMatcher)
        }
    } catch (err) {
        console.error('apply: enum-discovery skipped —', err.message)
    }
    // We deliberately defer `expandSubsetEnums` and the cross-op semantic
    // union until AFTER wire-overrides — wire-overrides promote bare-string
    // leaves to `enum:V` when wire samples reveal UPPER_SNAKE values, and we
    // want those wire-derived enums to also feed into superset expansion and
    // cross-op union. Without this, e.g. `viewer_metadata.role` (left as
    // `string` by static inference and only promoted to `enum:OWNER|SUBSCRIBER`
    // by wire samples) wouldn't get expanded into the full
    // `NewsletterMembershipType` set.

    // ---- Wire-sample overrides (highest-confidence layer) ----
    // Read from the versioned, sanitized captures at
    // packages/mex/wire-samples/captures.json (raw captures with PII live in
    // dump/wire-samples/ and are gitignored). Each captured response is
    // treated as ground truth — typeof at each leaf + enum value sets win
    // over static inference.
    let wireStats = null
    try {
        const versioned = path.resolve(__dirname, '..', 'wire-samples', 'captures.json')
        // Fall back to the raw local path during local development if the
        // sanitized file hasn't been regenerated yet.
        const repoRoot = path.resolve(__dirname, '..', '..', '..')
        const rawLocal = path.join(repoRoot, 'dump/wire-samples/captures.json')
        const capturesPath = fs.existsSync(versioned) ? versioned : (fs.existsSync(rawLocal) ? rawLocal : null)
        if (capturesPath) {
            const captures = JSON.parse(fs.readFileSync(capturesPath, 'utf8'))
            const overrides = buildOverrides(captures)
            wireStats = applyOverrides(ops, overrides)
            wireStats.captureCount = captures.length
            wireStats.opsWithOverrides = Object.keys(overrides).length
            wireStats.source = capturesPath.includes('dump') ? 'dump (raw)' : 'packages/mex/wire-samples'
        }
    } catch (err) {
        console.error('apply: wire-overrides skipped —', err.message)
    }

    // ---- Enum expansion + cross-op semantic union (runs AFTER wire-overrides) ----
    // Now that wire-derived enums are present, expand SUBSET enum leaves
    // (recovered from caller `=== "X"` comparisons OR from wire) into the
    // discovered Mirrored superset when one exists. Then cross-op union by
    // semantic path so the same logical GraphQL Enum surfaces with the same
    // value set in every op that selects it.
    try {
        const enumIndex = discoverEnums(bundles)
        // We re-use the stats object created earlier (in the discovery try-block)
        // OR create a fresh one if discovery failed; either way the counts are
        // surfaced in the diagnostic line below.
        enumStats = enumStats || { discovered: Object.keys(enumIndex).length, applied: 0, expanded: 0, byField: {} }
        for (const key of sortedKeys) {
            const op = ops[key]
            const opNameForMatcher = op.__opName || key
            expandSubsetEnums(op.response, [], enumIndex, enumStats, opNameForMatcher)
            expandSubsetEnums(op.variablesShape, [], enumIndex, enumStats, opNameForMatcher)
        }
        // Cross-op union only runs on RESPONSES. Response paths are rooted
        // at `xwa2_<domain>_<...>` which carries domain context (newsletter,
        // group, etc.) — enabling correct same-enum-across-ops unification.
        // Variables, by contrast, are top-keyed at generic wrappers like
        // `input` without domain context, so cross-op union would fuse
        // unrelated `input.<field>` schemas across ops (e.g. FetchNewsletter
        // `input.type: JID|INVITE` would leak into FetchNewChatMessageCappingInfo
        // `input.type: INDIVIDUAL_NEW_CHAT_THREAD`). Each op's wrapper
        // already infers its own variable enums from local evidence — no
        // union needed.
        const semanticEnumUnion = Object.create(null)
        for (const key of sortedKeys) {
            collectSemanticEnums(ops[key].response, [], semanticEnumUnion)
        }
        for (const key of sortedKeys) {
            applySemanticEnumUnion(ops[key].response, [], semanticEnumUnion, enumStats)
        }
        // Bundle-wide parent.field enum promotion. enum-discovery built a
        // global `<parent>.<field>` → values map by scanning ALL bundles for
        // `<...>.<parent>.<field> === "X"` and matching switch-case patterns.
        // This catches enum values defined in deep consumer modules (e.g.
        // React UI components) outside our per-op respBodies window. Used to
        // promote bare `string` leaves to enum when the recovered set has
        // ≥2 distinct UPPER_SNAKE values.
        //
        // Example: `appeal.state` is `string` after inference because the
        // immediate consumers don't compare against literal values — but
        // many UI files do (`.appeal.state === "PENDING"|"SUCCESS"|...`).
        // This pass promotes it to the full 6-value enum.
        const parentFieldEnums = enumIndex.__parentFieldEnums || {}
        for (const key of sortedKeys) {
            promoteByParentFieldMap(ops[key].response, [], parentFieldEnums, enumStats)
            promoteByParentFieldMap(ops[key].variablesShape, [], parentFieldEnums, enumStats)
        }
        // Bundle-wide scalar-coercion fill — the sibling of the enum map above.
        // Fills `unknown` leaves whose `<parent>.<field>` was coerced via
        // `Number(...)`/`parseInt(...)` in a module outside the op's respBodies
        // window (e.g. `pinned_messages.expiry_ts` → 'string').
        const parentFieldScalars = enumIndex.__parentFieldScalars || {}
        const fieldScalars = enumIndex.__fieldScalars || {}
        for (const key of sortedKeys) {
            promoteByParentFieldScalars(ops[key].response, [], parentFieldScalars, fieldScalars, enumStats)
        }
    } catch (err) {
        console.error('apply: post-wire enum expansion skipped —', err.message)
    }

    // ---- Cross-op enum union ----
    // The same wire path (`xwa2_group_query_by_id.state`) appears across
    // multiple ops with the SAME GraphQL Enum type. Each op may only see a
    // subset of values (DELETE returns DELETED, FETCH might see ACTIVE).
    // Union the value sets so each op's typedef reflects the full schema.
    const enumByPath = Object.create(null)
    function collectEnums(node, path) {
        if (typeof node === 'string') {
            if (node.startsWith('enum:')) {
                const p = path.join('.')
                ;(enumByPath[p] = enumByPath[p] || new Set())
                for (const v of node.slice(5).split('|')) enumByPath[p].add(v)
            }
            return
        }
        if (Array.isArray(node)) return collectEnums(node[0], path)
        if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) collectEnums(v, [...path, k])
    }
    function applyEnumUnion(node, path) {
        if (typeof node === 'string') return node
        if (Array.isArray(node)) { node[0] = applyEnumUnion(node[0], path); return node }
        if (node && typeof node === 'object') {
            for (const [k, v] of Object.entries(node)) {
                if (typeof v === 'string' && v.startsWith('enum:')) {
                    const p = [...path, k].join('.')
                    const merged = enumByPath[p]
                    if (merged && merged.size > 0) {
                        node[k] = 'enum:' + [...merged].sort().join('|')
                    }
                } else if (v !== null && typeof v === 'object') {
                    node[k] = applyEnumUnion(v, [...path, k])
                }
            }
        }
        return node
    }
    let unionedCount = 0
    // Only union RESPONSES across ops. Variables are op-specific schemas —
    // unioning them would conflate e.g. FetchNewsletter `input.type` (JID|
    // INVITE) with FetchNewChatMessageCappingInfo `input.type` (INDIVIDUAL_NEW_CHAT_THREAD)
    // since both share the same `i.input.type` bucket key.
    for (const key of sortedKeys) {
        collectEnums(ops[key].response, ['r'])
    }
    for (const key of sortedKeys) {
        const beforeResp = JSON.stringify(ops[key].response)
        applyEnumUnion(ops[key].response, ['r'])
        if (JSON.stringify(ops[key].response) !== beforeResp) unionedCount++
    }

    // ---- index.json (IR for programmatic consumers) ----
    const ir = { waVersion, operations: {} }
    for (const key of sortedKeys) {
        const op = ops[key]
        ir.operations[key] = {
            originalName: op.__opName,
            docId: op.docId,
            operationKind: op.operationKind,
            variables: op.variables,
            variablesShape: op.variablesShape,
            response: op.response
        }
    }
    fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(ir, null, 2) + '\n')

    // ---- index.js (CommonJS runtime) ----
    const jsBody = sortedKeys
        .map((key) => {
            const op = ops[key]
            return `    ${key}: Object.freeze({ docId: ${quote(op.docId)}, clientDocId: ${quote(op.docId)} })`
        })
        .join(',\n')
    const jsSchemas = sortedKeys
        .map((key) => {
            const op = ops[key]
            const vars = op.variables.map((v) => quote(v)).join(', ')
            return `    ${key}: Object.freeze({ operationKind: ${quote(op.operationKind)}, variables: Object.freeze([${vars}]) })`
        })
        .join(',\n')
    const js = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}
'use strict'

const WA_MEX_PERSIST_IDS = Object.freeze({
${jsBody}
})

const WA_MEX_OPERATION_SCHEMAS = Object.freeze({
${jsSchemas}
})

module.exports = { WA_MEX_PERSIST_IDS, WA_MEX_OPERATION_SCHEMAS }
`
    fs.writeFileSync(path.join(outDir, 'index.js'), js)

    // ---- index.d.ts (TypeScript types) ----
    const persistIdsLines = sortedKeys
        .map((key) => `    readonly ${key}: WaMexPersistId`)
        .join('\n')
    const schemasLines = sortedKeys
        .map((key) => {
            const op = ops[key]
            const vars = op.variables.map((v) => quote(v)).join(', ')
            return `    readonly ${key}: WaMexOperationSchema<${quote(op.operationKind)}, readonly [${vars}]>`
        })
        .join('\n')
    const variableInterfaces = sortedKeys
        .map((key) => {
            const op = ops[key]
            const aliasName = `WaMex${key}Variables`
            const shape =
                op.variablesShape && Object.keys(op.variablesShape).length > 0
                    ? op.variablesShape
                    : op.variables.length === 0
                      ? {}
                      : Object.fromEntries(op.variables.map((v) => [v, null]))
            if (Object.keys(shape).length === 0) {
                return `export type ${aliasName} = Readonly<Record<string, never>>`
            }
            return `export type ${aliasName} = ${emitShapeType(shape, '')}`
        })
        .join('\n\n')
    const variableMapLines = sortedKeys
        .map((key) => `    readonly ${key}: WaMex${key}Variables`)
        .join('\n')
    const responseAliases = sortedKeys
        .map((key) => {
            const op = ops[key]
            const aliasName = `WaMex${key}Response`
            const node = op.response ?? {}
            return `export type ${aliasName} = ${emitShapeType(node, '')}`
        })
        .join('\n\n')
    const responseMapLines = sortedKeys
        .map((key) => `    readonly ${key}: WaMex${key}Response`)
        .join('\n')
    const dts = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}

export interface WaMexPersistId {
    readonly docId: string
    readonly clientDocId: string
}

export interface WaMexOperationSchema<
    K extends 'query' | 'mutation' = 'query' | 'mutation',
    V extends ReadonlyArray<string> = ReadonlyArray<string>
> {
    readonly operationKind: K
    readonly variables: V
}

export declare const WA_MEX_PERSIST_IDS: {
${persistIdsLines}
}

export declare const WA_MEX_OPERATION_SCHEMAS: {
${schemasLines}
}

${variableInterfaces}

export interface WaMexOperationVariables {
${variableMapLines}
}

${responseAliases}

export interface WaMexOperationResponses {
${responseMapLines}
}
`
    fs.writeFileSync(path.join(outDir, 'index.d.ts'), dts)

    console.log(
        `apply: ${sortedKeys.length} operations (from ${diagnostics.graphqlModulesDiscovered} graphql modules, skipped ${diagnostics.operationsSkippedBiz} biz) → ${outDir}/{index.json,index.js,index.d.ts}`
    )
    if (enumStats) {
        console.log(
            `apply: enum-discovery — ${enumStats.discovered} enums indexed, ${enumStats.applied} leaves promoted, ${enumStats.expanded || 0} leaves expanded (subset → superset / cross-op union)`
        )
    }
    if (wireStats) {
        console.log(
            `apply: wire-overrides [${wireStats.source}] — ${wireStats.captureCount} captures across ${wireStats.opsWithOverrides} ops, ` +
            `${wireStats.appliedCount} leaves changed (${wireStats.promotedFromUnknown} closes-gap, ` +
            `${wireStats.enumMerged} enum-merged, ${wireStats.changedConflicting} corrected)`
        )
    }
}

main()
