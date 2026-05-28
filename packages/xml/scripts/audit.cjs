#!/usr/bin/env node
// Quick quality audit on packages/xml/index.json.
// Counts the 8 classes the user expects at 0:
//   - unknown attrs   (attr.type === 'unknown')
//   - missing enums   (attr.type === 'enum' with empty enumValues)
//   - tagless children
//   - tagless roots
//   - mixed content+children
//   - duplicate-tag siblings
//   - invalid cardinalities
//   - unlinked incoming RPCs

const fs = require('fs')
const path = require('path')

const ir = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'index.json'), 'utf8')
)

const ALLOWED_CARDINALITY = new Set([
    'one',
    'zero-or-one',
    'zero-or-more',
    'one-or-more',
])

const counters = {
    unknownAttrs: 0,
    missingEnums: 0,
    taglessChildren: 0,
    taglessRoots: 0,
    mixedContentAndChildren: 0,
    duplicateTagSiblings: 0,
    invalidCardinalities: 0,
    unlinkedIncomingRpcs: 0,
}

const samples = {
    unknownAttrs: [],
    missingEnums: [],
    taglessChildren: [],
    taglessRoots: [],
    mixedContentAndChildren: [],
    duplicateTagSiblings: [],
    invalidCardinalities: [],
    unlinkedIncomingRpcs: [],
}

function pushSample(bucket, sample) {
    if (samples[bucket].length < 8) samples[bucket].push(sample)
}

function walkNode(node, pathStr) {
    if (!node) return
    if (!node.tag) {
        counters.taglessChildren++
        pushSample('taglessChildren', pathStr)
    }
    if (node.attrs) {
        for (const [name, attr] of Object.entries(node.attrs)) {
            if (!attr || typeof attr !== 'object') continue
            if (attr.type === 'unknown') {
                counters.unknownAttrs++
                pushSample('unknownAttrs', `${pathStr} attr=${name}`)
            }
            if (
                attr.type === 'enum' &&
                (!Array.isArray(attr.enumValues) ||
                    attr.enumValues.length === 0)
            ) {
                counters.missingEnums++
                pushSample('missingEnums', `${pathStr} attr=${name}`)
            }
            if (
                attr.cardinality &&
                !ALLOWED_CARDINALITY.has(attr.cardinality)
            ) {
                counters.invalidCardinalities++
                pushSample(
                    'invalidCardinalities',
                    `${pathStr} attr=${name} card=${attr.cardinality}`
                )
            }
        }
    }
    const hasChildren = Array.isArray(node.children) && node.children.length > 0
    if (hasChildren) {
        if (node.content && typeof node.content === 'object' && node.content.type) {
            counters.mixedContentAndChildren++
            pushSample(
                'mixedContentAndChildren',
                `${pathStr} content=${node.content.type} childCount=${node.children.length}`
            )
        }
        const tagCounts = new Map()
        for (const child of node.children) {
            const t = child && child.tag
            if (!t) continue
            tagCounts.set(t, (tagCounts.get(t) || 0) + 1)
        }
        for (const [tag, count] of tagCounts) {
            if (count > 1) {
                counters.duplicateTagSiblings++
                pushSample(
                    'duplicateTagSiblings',
                    `${pathStr} sibling=${tag} count=${count}`
                )
            }
        }
        for (const child of node.children) {
            if (
                child &&
                child.cardinality &&
                !ALLOWED_CARDINALITY.has(child.cardinality)
            ) {
                counters.invalidCardinalities++
                pushSample(
                    'invalidCardinalities',
                    `${pathStr}/${child.tag} card=${child.cardinality}`
                )
            }
            walkNode(
                child,
                `${pathStr}/${child && child.tag ? child.tag : '<no-tag>'}`
            )
        }
    }
}

// Walk operations.
for (const [opName, op] of Object.entries(ir.operations || {})) {
    if (op.request && op.request.node) {
        walkNode(op.request.node, `op:${opName}/request`)
    }
    if (op.response && op.response.node) {
        walkNode(op.response.node, `op:${opName}/response`)
    }
    if (op.response && op.response.__unlinkedIncoming) {
        counters.unlinkedIncomingRpcs++
        pushSample('unlinkedIncomingRpcs', `op:${opName}`)
    }
}

// Walk stanza roots.
for (const [stanzaTag, stanza] of Object.entries(ir.stanzas || {})) {
    if (!stanzaTag) {
        counters.taglessRoots++
        pushSample('taglessRoots', `stanza idx=${stanzaTag}`)
    }
    if (stanza.variants) {
        for (const [vName, v] of Object.entries(stanza.variants)) {
            if (v.node) walkNode(v.node, `stanza:${stanzaTag}/${vName}`)
        }
    }
    if (stanza.node) walkNode(stanza.node, `stanza:${stanzaTag}`)
    if (stanza.shape) walkNode(stanza.shape, `stanza:${stanzaTag}`)
}

console.log('=== quality audit ===')
let bad = 0
for (const [k, v] of Object.entries(counters)) {
    if (v > 0) bad++
    console.log(
        `${v > 0 ? 'X' : 'OK'}  ${k.padEnd(28)} ${v}` +
            (samples[k].length
                ? '\n      ' + samples[k].slice(0, 6).join('\n      ')
                : '')
    )
}
console.log(bad === 0 ? '\nALL GREEN' : `\n${bad} counter(s) above 0`)
process.exit(bad === 0 ? 0 : 1)
