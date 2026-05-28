#!/usr/bin/env node
// Heuristic gap finder — surfaces suspicious-looking attrs / nodes that
// the strict 0/0/0/0 audit can't detect.
//
// Buckets:
//   A. string-typed attrs whose name looks typed (jid, t, ts, count, etc.)
//   B. operations missing a response
//   C. operations missing a request
//   D. stanzas with no variants and no shape children
//   E. children with no cardinality
//   F. content nodes with no .type
//   G. attrs marked "optional" everywhere in every variant (might be required)
//   H. duplicate operation modules (same module → multiple op names)

const fs = require('fs')
const path = require('path')

const ir = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'index.json'), 'utf8')
)

const buckets = {
    looseStringAttrs: [],
    opsNoResponse: [],
    opsNoRequest: [],
    stanzasNoChildren: [],
    childrenNoCardinality: [],
    contentNoType: [],
}

// Name hints that strongly suggest a typed value.
const HINT_INT = /^(t|ts|expiration|expires_at|duration|count|size|width|height|length|chunk_size|page_size|limit|offset|version|index|seq|seqno|step|page|max|min|expiry|valid_seconds|epoch|count_estimate|elapsed_time|elapsed|hops|tries|attempts|retry_count)$/
const HINT_BOOL = /^(is_[a-z_]+|has_[a-z_]+|can_[a-z_]+|should_[a-z_]+|allow_[a-z_]+|enabled|disabled|verified|encrypted|optional|primary|secondary|locked|hidden|deleted|read|seen|delivered|sent|received|active|inactive|silent|muted|pinned|starred|archived|forwarded|premium|paid|free)$/
const HINT_JID = /^(jid|to|from|participant|recipient|author|sender|owner|admin|invited_by|added_by|removed_by|target|peer|self|me|user)$/
const HINT_USERJID = /^(participant_pn|recipient_pn|peer_pn|target_pn|user_pn)$/
const HINT_TIME = /^(timestamp|created_at|updated_at|deleted_at|last_seen|last_active|last_modified|last_update|expire_at|expire_time|begin_time|end_time|start_time|stop_time|sent_at|received_at|delivered_at|read_at|seen_at|joined_at|left_at)$/

function attrLooksTyped(name, attr) {
    if (!attr || attr.type !== 'string') return null
    if (HINT_INT.test(name)) return 'int?'
    if (HINT_BOOL.test(name)) return 'bool?'
    if (HINT_JID.test(name)) return 'jid?'
    if (HINT_USERJID.test(name)) return 'userJid?'
    if (HINT_TIME.test(name)) return 'time?'
    return null
}

function walkNode(node, pathStr) {
    if (!node) return
    if (node.attrs) {
        for (const [name, attr] of Object.entries(node.attrs)) {
            const hint = attrLooksTyped(name, attr)
            if (hint) {
                buckets.looseStringAttrs.push(`${pathStr} attr=${name} (suspect ${hint})`)
            }
        }
    }
    if (node.content && (!node.content.type || node.content.type === 'unknown')) {
        buckets.contentNoType.push(`${pathStr} content=${JSON.stringify(node.content)}`)
    }
    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            // Cardinality in the IR lives on `min`/`max` (number) or
            // `presence` (boolean true for presence-only markers). A child
            // without any of these is genuinely missing cardinality info.
            const hasCard =
                typeof child?.min === 'number' ||
                typeof child?.max === 'number' ||
                child?.presence === true
            if (child && !hasCard && child.tag) {
                buckets.childrenNoCardinality.push(`${pathStr}/${child.tag}`)
            }
            walkNode(child, `${pathStr}/${child && child.tag}`)
        }
    }
}

for (const [opName, op] of Object.entries(ir.operations || {})) {
    if (!op.request) buckets.opsNoRequest.push(opName)
    if (!op.responses || op.responses.length === 0) buckets.opsNoResponse.push(opName)
    if (op.request && op.request.node) {
        walkNode(op.request.node, `op:${opName}/request`)
    }
    if (op.responses) {
        for (const r of op.responses) {
            if (r && r.node) walkNode(r.node, `op:${opName}/resp:${r.variant}`)
        }
    }
}

for (const [stanzaTag, stanza] of Object.entries(ir.stanzas || {})) {
    const hasVariants = stanza.variants && Object.keys(stanza.variants).length > 0
    if (!hasVariants && !stanza.node && !stanza.shape) {
        buckets.stanzasNoChildren.push(stanzaTag)
    }
    if (stanza.variants) {
        for (const [vName, v] of Object.entries(stanza.variants)) {
            if (v.node) walkNode(v.node, `stanza:${stanzaTag}/${vName}`)
        }
    }
    if (stanza.node) walkNode(stanza.node, `stanza:${stanzaTag}`)
    if (stanza.shape) walkNode(stanza.shape, `stanza:${stanzaTag}`)
}

console.log('=== heuristic gap audit ===')
for (const [k, list] of Object.entries(buckets)) {
    console.log(`\n${k} (${list.length})`)
    for (const s of list.slice(0, 12)) console.log('  - ' + s)
    if (list.length > 12) console.log(`  ... +${list.length - 12} more`)
}
