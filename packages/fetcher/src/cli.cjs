#!/usr/bin/env node
'use strict'

const { fetchBundles } = require('./index.cjs')

function parseArgs(argv) {
    const opts = { out: 'dump' }
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--out') opts.out = argv[++i]
        else if (a === '--auth') opts.authState = argv[++i]
        else if (a === '--extra-wait') opts.extraWaitMs = Number(argv[++i])
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
            '  --out <dir>           output directory (default: dump)',
            '  --auth <file>         optional saved cookie state JSON',
            '  --extra-wait <ms>     extra wait after networkidle for lazy chunks (default: 5000)',
            '  -h, --help            show this help',
            '',
            'output:',
            '  <out>/raw/<wa-version>/*.js   raw bundles',
            '  <out>/manifest.json           { waVersion, fetchedAt, bundles[] }'
        ].join('\n')
    )
}

async function main() {
    const opts = parseArgs(process.argv)
    const start = Date.now()
    console.error('[wa-fetcher] launching headless browser…')
    const result = await fetchBundles(opts)
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
