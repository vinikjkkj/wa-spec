#!/usr/bin/env node
'use strict'

/**
 * Reads raw WA Web bundle .js files from a directory, runs the static proto
 * extractor over them, and writes WAProto.proto.
 *
 * Usage:
 *   npx wa-proto apply --bundles dump/raw/<wa-version>/ [--out WAProto.proto]
 *
 * After this, run `npm run compile` to invoke pbjs/pbts and produce dist/.
 */

const fs = require('node:fs')
const path = require('node:path')
const { extractProto } = require('./extract-proto.cjs')

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
            'usage: wa-proto apply (--bundles <dir> | --manifest <file>) [--out <path>] [--wa-version <ver>]',
            '',
            '  --bundles <dir>     directory containing raw .js bundle dumps',
            '  --manifest <file>   read rawDir + waVersion from this manifest.json',
            '  --out <path>        output .proto path (default: <pkg>/WAProto.proto)',
            '  --wa-version <ver>  pin the version header in the output (overrides manifest)'
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
    // Try manifest.json in the parent dump dir (dump/manifest.json) or in bundles dir itself
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
    // Fallback: try parsing bundles dir name (dump/raw/<version>)
    const base = path.basename(path.resolve(bundlesDir))
    if (/^\d+\.\d+/.test(base)) return base
    return fallback ?? 'unknown'
}

function main() {
    const opts = parseArgs(process.argv)
    const bundles = loadBundles(opts.bundles)
    const waVersion = opts.waVersion ?? detectWaVersion(opts.bundles)
    const result = extractProto(bundles, { waVersion })
    const outPath = opts.out ?? path.resolve(__dirname, '..', 'WAProto.proto')
    fs.writeFileSync(outPath, result.sdl)
    const d = result.diagnostics
    console.log(
        `apply: ${d.messagesExtracted} messages + ${d.enumsExtracted} enums ` +
            `(${d.refsResolved} refs resolved, ${d.refsUnresolved} unresolved) → ${outPath}`
    )
}

main()
