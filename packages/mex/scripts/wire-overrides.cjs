'use strict'

/**
 * Build a leaf-type override table from live wire samples in
 * dump/wire-samples/captures.json. For each (opName, path) the live data
 * is authoritative: when the wire sees a string we report `string`, when
 * it sees a non-empty set of string literals across multiple samples that
 * look enum-like (all-caps or finite small set) we report
 * `enum:VAL1|VAL2|...` aggregated from every observation.
 *
 * The merger:
 *   - Replaces any inferred leaf when wire evidence contradicts it
 *   - Extends existing enum sets with newly-observed values
 *   - Fills `unknown` leaves with wire-derived types
 *   - Leaves untouched paths the wire never reached
 *
 * Exports:
 *   buildOverrides(captures): { [opName]: { __overrides: { 'path.to.leaf': tag } } }
 *   applyOverrides(operations, overrides): mutates operations in place
 */

function actualTag(v) {
    if (v === null || v === undefined) return null
    if (typeof v === 'string') return 'string'
    if (typeof v === 'number') return 'number'
    if (typeof v === 'boolean') return 'boolean'
    return null // arrays/objects are structural, not leaf evidence
}

// Walk leaf paths. Arrays are flattened (every item contributes evidence at
// the same path — Relay shape models the per-item shape).
function walkLeaves(data, prefix, out) {
    if (data === null || data === undefined) return
    if (Array.isArray(data)) {
        for (const item of data) walkLeaves(item, prefix, out)
        return
    }
    if (typeof data === 'object') {
        for (const [k, v] of Object.entries(data)) walkLeaves(v, [...prefix, k], out)
        return
    }
    out.push({ path: prefix.join('.'), value: data })
}

function buildOverrides(captures) {
    // per (op, path): observation aggregator
    const obs = Object.create(null)
    for (const cap of captures) {
        if (!cap.data || !cap.opName) continue
        const leaves = []
        walkLeaves(cap.data, [], leaves)
        for (const { path, value } of leaves) {
            const key = cap.opName + '\0' + path
            const cur = obs[key] || { op: cap.opName, path, samples: 0, sawNull: false, types: new Set(), stringValues: new Set() }
            cur.samples++
            if (value === null || value === undefined) {
                cur.sawNull = true
            } else {
                const t = actualTag(value)
                if (t) cur.types.add(t)
                if (t === 'string') cur.stringValues.add(value)
            }
            obs[key] = cur
        }
    }

    // Per-op leaf tag map
    const overrides = Object.create(null)
    for (const k of Object.keys(obs)) {
        const o = obs[k]
        if (o.types.size === 0) continue // only saw null — keep nullable but no type info
        if (o.types.size > 1) {
            // mixed wire types — emit union
            const sortedTypes = [...o.types].sort()
            const tag = sortedTypes.join('|')
            ;(overrides[o.op] = overrides[o.op] || {})[o.path] = tag
            continue
        }
        const [t] = [...o.types]
        if (t === 'string') {
            // Enum candidate: short value set, mostly uppercase/underscore, ≤ ~20 distinct values
            const vals = [...o.stringValues]
            const looksEnum = vals.length > 0 && vals.length <= 20 && vals.every(v =>
                v.length > 0 && v.length <= 40 && /^[A-Z][A-Z0-9_]*$/.test(v)
            )
            if (looksEnum) {
                ;(overrides[o.op] = overrides[o.op] || {})[o.path] = 'enum:' + vals.slice().sort().join('|')
            } else {
                ;(overrides[o.op] = overrides[o.op] || {})[o.path] = 'string'
            }
        } else {
            ;(overrides[o.op] = overrides[o.op] || {})[o.path] = t
        }
    }
    return overrides
}

// Apply overrides to the shape tree, merging enums with existing inferred enums.
function applyOverrides(operations, overrides) {
    let appliedCount = 0
    let enumMerged = 0
    let promotedFromUnknown = 0
    let changedConflicting = 0
    for (const [opName, leafMap] of Object.entries(overrides)) {
        const op = operations[opName]
        if (!op) continue
        for (const [path, wireTag] of Object.entries(leafMap)) {
            const result = setLeafAt(op.response, path.split('.'), wireTag)
            if (result.changed) {
                appliedCount++
                if (result.from === 'unknown') promotedFromUnknown++
                else if (result.wasEnum && wireTag.startsWith('enum:')) enumMerged++
                else if (result.from !== wireTag) changedConflicting++
            }
        }
    }
    return { appliedCount, enumMerged, promotedFromUnknown, changedConflicting }
}

function setLeafAt(node, segs, wireTag) {
    if (segs.length === 0) return { changed: false }
    if (Array.isArray(node)) return setLeafAt(node[0], segs, wireTag)
    if (!node || typeof node !== 'object') return { changed: false }
    const [head, ...rest] = segs
    if (rest.length === 0) {
        // leaf position
        const cur = node[head]
        if (cur === undefined) return { changed: false }
        if (cur === null) {
            node[head] = wireTag
            return { changed: true, from: 'null' }
        }
        if (typeof cur === 'string') {
            // existing inferred tag
            if (cur === wireTag) return { changed: false }
            if (cur === 'unknown') {
                node[head] = wireTag
                return { changed: true, from: 'unknown' }
            }
            if (cur.startsWith('enum:') && wireTag.startsWith('enum:')) {
                // merge values
                const merged = new Set([...cur.slice(5).split('|'), ...wireTag.slice(5).split('|')].filter(Boolean))
                node[head] = 'enum:' + [...merged].sort().join('|')
                return { changed: true, from: cur, wasEnum: true }
            }
            if (cur.startsWith('enum:') && wireTag === 'string') {
                // keep enum (wire string is a superset / less precise)
                return { changed: false }
            }
            if (wireTag.startsWith('enum:') && cur === 'string') {
                // wire revealed enum values; promote
                node[head] = wireTag
                return { changed: true, from: cur }
            }
            // straight type conflict — wire wins
            node[head] = wireTag
            return { changed: true, from: cur }
        }
        if (typeof cur === 'object') {
            // shape conflict — wire says leaf, static says object. Wire wins
            // (the static shape was probably from a sibling). Leave as-is to
            // avoid breaking nested structures; record but don't change.
            return { changed: false }
        }
        return { changed: false }
    }
    if (node[head] === undefined) return { changed: false }
    return setLeafAt(node[head], rest, wireTag)
}

module.exports = { buildOverrides, applyOverrides, walkLeaves, actualTag }
