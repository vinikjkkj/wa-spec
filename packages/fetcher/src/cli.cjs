#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { discoverBundleUrls, fetchBundles, fetchArchive, ARCHIVE_URL_ENV } = require('./index.cjs')

function parseArgs(argv) {
    const opts = { out: null, urlsOnly: false, source: 'archive', revision: null, keepAllJs: false }
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--out') opts.out = argv[++i]
        else if (a === '--extra-wait') opts.extraWaitMs = Number(argv[++i])
        else if (a === '--urls-only') opts.urlsOnly = true
        else if (a === '--source') opts.source = argv[++i]
        else if (a === '--revision') opts.revision = argv[++i]
        else if (a === '--keep-all-js') opts.keepAllJs = true
        else if (a === '--help' || a === '-h') {
            printHelp()
            process.exit(0)
        } else {
            console.error('unknown flag:', a)
            printHelp()
            process.exit(2)
        }
    }
    if (opts.source !== 'archive' && opts.source !== 'scrape') {
        console.error(`--source must be 'archive' or 'scrape', got '${opts.source}'`)
        process.exit(2)
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
            "  --source <mode>       'archive' (default) pulls the upstream bundle archive;",
            "                        'scrape' uses the legacy headless-browser chunk scrape",
            '  --revision <n>        archive mode: pin a revision (the X in 2.3000.X) instead of',
            '                        resolving the live one',
            '  --keep-all-js         archive mode: keep every .js entry instead of only those',
            '                        registering a __d("WA…") module (much larger corpus)',
            '  --extra-wait <ms>     scrape mode: extra wait after networkidle (default: 5000)',
            '  --urls-only           scrape mode: skip download, output the discovered URL array',
            '  -h, --help            show this help',
            '',
            `The archive endpoint is read from ${ARCHIVE_URL_ENV} (must contain a {revision}`,
            'placeholder). It is intentionally not committed to this repository.'
        ].join('\n')
    )
}

async function runArchive(opts, start) {
    const outDir = opts.out ?? 'dump'
    const result = await fetchArchive({
        ...opts,
        out: outDir,
        onLog: (msg) => console.error(`[wa-fetcher] ${msg}`)
    })
    const elapsed = ((Date.now() - start) / 1000).toFixed(1)
    const mb = (result.bundles.reduce((s, b) => s + b.bytes, 0) / 1024 / 1024).toFixed(1)
    console.error(
        `[wa-fetcher] done in ${elapsed}s — version=${result.waVersion} ` +
            `bundles=${result.bundles.length} (${mb}MB)`
    )
    console.error(
        `[wa-fetcher] dropped ${result.skipped.notJs} non-js + ` +
            `${result.skipped.noWaModule} js without a WA module`
    )
    console.error(`[wa-fetcher] raw → ${result.paths.raw}`)
    console.error(`[wa-fetcher] manifest → ${result.paths.manifest}`)
}

async function runScrape(opts, start) {
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

async function main() {
    const opts = parseArgs(process.argv)
    const start = Date.now()
    if (opts.source === 'archive' && !opts.urlsOnly) return runArchive(opts, start)
    return runScrape(opts, start)
}

main().catch((err) => {
    console.error('[wa-fetcher] failed:', err.stack || err.message || err)
    process.exit(1)
})
