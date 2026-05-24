#!/usr/bin/env node
'use strict'

/**
 * Sanitize raw wire captures so they can be committed without leaking personal
 * data. The goal is to keep everything the type-discovery layer needs (typeof
 * at each leaf, enum-shaped UPPER_SNAKE values, structural nesting) while
 * stripping anything that identifies the account, contacts, or content.
 *
 * Read:  dump/wire-samples/captures.json   (gitignored, raw)
 * Write: packages/mex/wire-samples/captures.json  (versioned, sanitized)
 *
 * Sanitization rules:
 *   • JIDs / addressing — replace the user portion, keep the suffix so the
 *     type tag remains `@s.whatsapp.net` / `@lid` / `@g.us` / `@newsletter`.
 *   • Pure-digit IDs (≥10 digits) — replaced with "0" (preserves number-ness
 *     of the wire encoding without leaking timestamps or thread IDs).
 *   • Free-text strings (names, descriptions, invites, custom URLs, paths,
 *     tokens, base64-ish) — replaced with empty string. Length signal is
 *     gone but typeof "string" stays, which is all the merger needs.
 *   • UPPER_SNAKE strings — kept verbatim. These are GraphQL Enum values
 *     and are part of the public schema (`ACTIVE`, `OWNER`, `INSIGHTS`...).
 *   • Booleans / numbers / null — kept verbatim.
 *
 * The result preserves: structural shape, typeof per leaf, enum value sets,
 * nullability (a leaf seen `null` stays `null`). Discards: identity data.
 */

const fs = require('node:fs')
const path = require('node:path')

const RAW_PATH = path.resolve(__dirname, '..', '..', '..', 'dump', 'wire-samples', 'captures.json')
const OUT_DIR = path.resolve(__dirname, '..', 'wire-samples')
const OUT_PATH = path.join(OUT_DIR, 'captures.json')

const JID_PLACEHOLDER = {
    's.whatsapp.net': '0:0@s.whatsapp.net',
    'lid': '0:0@lid',
    'g.us': '0@g.us',
    'newsletter': '0@newsletter',
    'broadcast': '0@broadcast',
    'bot': '0@bot'
}

function sanitizeString(v) {
    if (v.length === 0) return v
    // Addressing — `<id>[:<device>]@<server>` — keep the server only.
    const jidMatch = v.match(/@([a-z.]+)$/)
    if (jidMatch) {
        const server = jidMatch[1]
        return JID_PLACEHOLDER[server] ?? '0@' + server
    }
    // Pure-digit IDs/timestamps (>= 10 chars) — neutralize to "0".
    if (/^\d{10,}$/.test(v)) return '0'
    // GraphQL Enum-shaped values (UPPER_SNAKE up to ~50 chars) — kept.
    // WA Mex wire uses UPPER_SNAKE for all enums; lowercase strings on the
    // wire are content (names, descriptions, etc.) so we don't preserve them.
    if (/^[A-Z][A-Z0-9_]{0,49}$/.test(v)) return v
    // Anything else — names, descriptions, urls, paths, base64, tokens,
    // free text — drop. Length signal is gone, typeof "string" stays.
    return ''
}

function sanitize(node) {
    if (node === null || node === undefined) return node
    if (typeof node === 'boolean' || typeof node === 'number') return node
    if (typeof node === 'string') return sanitizeString(node)
    if (Array.isArray(node)) return node.map(sanitize)
    if (typeof node === 'object') {
        const out = {}
        for (const [k, v] of Object.entries(node)) out[k] = sanitize(v)
        return out
    }
    return node
}

function main() {
    if (!fs.existsSync(RAW_PATH)) {
        console.error(`sanitize: input not found: ${RAW_PATH}`)
        process.exit(1)
    }
    const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'))
    const out = raw.map((cap) => ({
        opName: cap.opName,
        docId: cap.docId,
        // Sanitize both variables (input side — may contain my account jid)
        // and data (response side — full of identifying info).
        variables: sanitize(cap.variables),
        data: sanitize(cap.data),
        errors: cap.errors ? sanitize(cap.errors) : null
    }))
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + '\n')
    const rawSize = fs.statSync(RAW_PATH).size
    const outSize = fs.statSync(OUT_PATH).size
    console.log(`sanitize: ${raw.length} captures → ${OUT_PATH}`)
    console.log(`sanitize: ${(rawSize / 1024).toFixed(1)} KB raw → ${(outSize / 1024).toFixed(1)} KB sanitized`)
}

main()
