#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { discoverBundleUrls, fetchBundles } = require('./index.cjs')

function parseArgs(argv) {
    const opts = { out: null, urlsOnly: false }
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--out') opts.out = argv[++i]
        else if (a === '--auth') opts.authState = argv[++i]
        else if (a === '--extra-wait') opts.extraWaitMs = Number(argv[++i])
        else if (a === '--urls-only') opts.urlsOnly = true
        else if (a === '--help' || a === '-h') {
            printHelp()
            process.exit(0)
        } else {
            console.error('unknown flag:', a)
            printHelp()
            process.exit(2)
        }
    }
    return opts
}

function printHelp() {
    console.error(
        [
            'usage: wa-fetcher [options]',
            '',
            'options:',
            '  --out <path>          output path',
            '                          - default mode: directory for raw bundles + manifest.json (default: dump)',
            '                          - --urls-only mode: file to write URL array JSON (default: stdout)',
            '  --auth <file>         optional saved cookie state JSON',
            '  --extra-wait <ms>     extra wait after networkidle for lazy chunks (default: 5000)',
            '  --urls-only           skip download; output just the discovered URL array as JSON',
            '  -h, --help            show this help'
        ].join('\n')
    )
}

async function main() {
    const opts = parseArgs(process.argv)
    const start = Date.now()

    if (opts.urlsOnly) {
        console.error('[wa-fetcher] discovering URLs only (no download)…')
        const { waVersion, urls } = await discoverBundleUrls(opts)
        const json = JSON.stringify(urls, null, 4) + '\n'
        if (opts.out) {
            fs.mkdirSync(path.dirname(path.resolve(opts.out)), { recursive: true })
            fs.writeFileSync(opts.out, json)
            console.error(
                `[wa-fetcher] done in ${((Date.now() - start) / 1000).toFixed(1)}s — ` +
                    `version=${waVersion ?? 'unknown'} urls=${urls.length} → ${opts.out}`
            )
        } else {
            process.stdout.write(json)
        }
        return
    }

    const outDir = opts.out ?? 'dump'
    console.error('[wa-fetcher] launching headless browser…')
    const result = await fetchBundles({ ...opts, out: outDir })
    const elapsed = ((Date.now() - start) / 1000).toFixed(1)
    const mb = (result.bundles.reduce((s, b) => s + b.bytes, 0) / 1024 / 1024).toFixed(1)
    console.error(
        `[wa-fetcher] done in ${elapsed}s — version=${result.waVersion ?? 'unknown'} ` +
            `bundles=${result.bundles.length} (${mb}MB)`
    )
    console.error(`[wa-fetcher] raw → ${result.paths.raw}`)
    console.error(`[wa-fetcher] manifest → ${result.paths.manifest}`)
}

main().catch((err) => {
    console.error('[wa-fetcher] failed:', err.stack || err.message || err)
    process.exit(1)
})
