#!/usr/bin/env node
'use strict'

/**
 * Cross-check live wire samples against the statically-inferred types in
 * index.json. For each captured response, walk every leaf path in the wire
 * data and compare its actual JS typeof / value against our inferred tag.
 *
 *   actualTag(jsValue)  →  'string' | 'number' | 'boolean' | 'null'
 *   inferredTag         →  what we said in index.json for that path
 *
 * Outputs three buckets:
 *   ✓ agree      inferred == actual (or inferred enum and actual ∈ enum set)
 *   ⚠ partial    inferred is broader (e.g. string while wire reveals an enum)
 *   ✗ disagree   inferred is wrong (e.g. boolean for what's actually a string)
 *   ? unknown    inferred=unknown but wire reveals a type — would close a gap
 *
 * Reads:  dump/wire-samples/captures.json
 *         packages/mex/index.json
 */

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..', '..', '..')
const captures = JSON.parse(fs.readFileSync(path.join(ROOT, 'dump/wire-samples/captures.json'), 'utf8'))
const ir = JSON.parse(fs.readFileSync(path.join(ROOT, 'packages/mex/index.json'), 'utf8'))

function actualTag(v) {
    if (v === null || v === undefined) return null
    if (typeof v === 'string') return 'string'
    if (typeof v === 'number') return 'number'
    if (typeof v === 'boolean') return 'boolean'
    if (Array.isArray(v)) return 'array'
    if (typeof v === 'object') return 'object'
    return 'unknown'
}

function inferredAt(opName, path) {
    const op = ir.operations[opName]
    if (!op) return { found: false }
    let node = op.response
    for (const seg of path) {
        if (node == null) return { found: false }
        if (Array.isArray(node)) node = node[0]
        if (node && typeof node === 'object') {
            node = node[seg]
        } else {
            return { found: false }
        }
    }
    return { found: true, tag: node }
}

function compareLeaf(inferred, actual, valueIfString) {
    if (inferred == null) return { kind: 'missing' }
    if (typeof inferred === 'object') {
        // inferred is an object/array but wire is a leaf — shape mismatch
        return { kind: 'shape-mismatch' }
    }
    if (typeof inferred !== 'string') return { kind: 'missing' }
    if (inferred === 'unknown') return { kind: 'closes-gap' }
    if (inferred.startsWith('enum:')) {
        if (actual !== 'string') return { kind: 'enum-but-not-string' }
        const vals = new Set(inferred.slice(5).split('|'))
        if (vals.has(valueIfString)) return { kind: 'agree' }
        return { kind: 'enum-missing-value', addValue: valueIfString }
    }
    if (inferred === actual) return { kind: 'agree' }
    // string vs jid/etc still string
    if (inferred === 'string' && actual === 'string') return { kind: 'agree' }
    return { kind: 'disagree' }
}

function walkLeaves(data, prefix, out) {
    if (data === null || data === undefined) return
    if (Array.isArray(data)) {
        for (const item of data) walkLeaves(item, prefix, out) // arrays index into [0] of shape
        return
    }
    if (typeof data === 'object') {
        for (const [k, v] of Object.entries(data)) walkLeaves(v, [...prefix, k], out)
        return
    }
    // leaf
    out.push({ path: prefix, value: data })
}

const summary = { ops: 0, leaves: 0, agree: 0, closesGap: 0, enumMissingValue: 0, disagree: 0, shapeMismatch: 0, missing: 0 }
const buckets = { closesGap: [], enumMissingValue: [], disagree: [], shapeMismatch: [], missing: [] }

for (const cap of captures) {
    if (!cap.data) continue
    summary.ops++
    const leaves = []
    walkLeaves(cap.data, [], leaves)
    for (const leaf of leaves) {
        summary.leaves++
        const inf = inferredAt(cap.opName, leaf.path)
        const actual = actualTag(leaf.value)
        if (!inf.found) {
            summary.missing++
            buckets.missing.push({ op: cap.opName, path: leaf.path.join('.'), actual, value: String(leaf.value).slice(0, 40) })
            continue
        }
        const cmp = compareLeaf(inf.tag, actual, typeof leaf.value === 'string' ? leaf.value : null)
        switch (cmp.kind) {
            case 'agree': summary.agree++; break
            case 'closes-gap':
                summary.closesGap++
                buckets.closesGap.push({ op: cap.opName, path: leaf.path.join('.'), wireType: actual, value: String(leaf.value).slice(0, 40) })
                break
            case 'enum-missing-value':
                summary.enumMissingValue++
                buckets.enumMissingValue.push({ op: cap.opName, path: leaf.path.join('.'), enum: inf.tag, missingValue: cmp.addValue })
                break
            case 'disagree':
                summary.disagree++
                buckets.disagree.push({ op: cap.opName, path: leaf.path.join('.'), inferred: inf.tag, actual, value: String(leaf.value).slice(0, 40) })
                break
            case 'shape-mismatch':
                summary.shapeMismatch++
                buckets.shapeMismatch.push({ op: cap.opName, path: leaf.path.join('.'), inferred: typeof inf.tag === 'object' ? '(object)' : inf.tag, actual, value: String(leaf.value).slice(0, 40) })
                break
            case 'missing': summary.missing++; break
            case 'enum-but-not-string':
                summary.disagree++
                buckets.disagree.push({ op: cap.opName, path: leaf.path.join('.'), inferred: inf.tag, actual })
                break
        }
    }
}

console.log('=== Cross-check summary ===')
console.log(JSON.stringify(summary, null, 2))
console.log()

function printBucket(name, items, limit = 30) {
    if (items.length === 0) return
    console.log(`=== ${name} (${items.length}) ===`)
    for (const it of items.slice(0, limit)) console.log(' ', JSON.stringify(it))
    if (items.length > limit) console.log(`  ... +${items.length - limit} more`)
    console.log()
}

printBucket('CLOSES-GAP (inferred=unknown, wire reveals type)', buckets.closesGap)
printBucket('ENUM-MISSING-VALUE (wire saw a value not in our enum)', buckets.enumMissingValue)
printBucket('DISAGREE (inferred wrong)', buckets.disagree)
printBucket('SHAPE-MISMATCH (inferred object/array but wire leaf or vice versa)', buckets.shapeMismatch)
printBucket('MISSING (path not in IR — likely sibling or oneOf)', buckets.missing, 15)
