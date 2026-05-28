#!/usr/bin/env node
'use strict'

// Reads the WhatsApp Web version from dump/manifest.json and writes three
// artifacts at the package root:
//
//   - version.json  { "waWeb": "<version>" }
//   - index.js      CJS runtime exporting WA_VERSION
//   - index.d.ts    TS declaration for WA_VERSION
//
// Usage:
//   node packages/version/scripts/apply.cjs --manifest dump/manifest.json
//   node packages/version/scripts/apply.cjs --wa-version 2.3000.1040208462

const fs = require('node:fs')
const path = require('node:path')

function parseArgs(argv) {
    const opts = { manifest: null, out: null, waVersion: null }
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--manifest') opts.manifest = argv[++i]
        else if (a === '--out') opts.out = argv[++i]
        else if (a === '--wa-version') opts.waVersion = argv[++i]
        else if (a === '--help' || a === '-h') {
            printHelp()
            process.exit(0)
        }
    }
    return opts
}

function printHelp() {
    console.log(`Usage: apply.cjs [options]

  --manifest <file>      read waVersion from this manifest.json
  --wa-version <string>  override the version (skips manifest)
  --out <dir>            output dir (default: package root)
  --help                 show this message
`)
}

function detectWaVersion(opts) {
    if (opts.waVersion) return opts.waVersion
    if (opts.manifest) {
        try {
            const m = JSON.parse(fs.readFileSync(opts.manifest, 'utf8'))
            if (m.waVersion) return m.waVersion
        } catch (err) {
            console.error(`apply: failed to read manifest ${opts.manifest}:`, err.message)
            process.exit(1)
        }
    }
    console.error('apply: no --wa-version or --manifest with waVersion')
    process.exit(1)
}

function main() {
    const opts = parseArgs(process.argv)
    const waVersion = detectWaVersion(opts)
    const outDir = opts.out ? path.resolve(opts.out) : path.resolve(__dirname, '..')

    fs.writeFileSync(
        path.join(outDir, 'version.json'),
        JSON.stringify({ waWeb: waVersion }, null, 4) + '\n'
    )

    const header = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}`

    fs.writeFileSync(
        path.join(outDir, 'index.js'),
        `${header}
'use strict'

const { waWeb } = require('./version.json')

const WA_VERSION = waWeb

module.exports = { WA_VERSION }
`
    )

    fs.writeFileSync(
        path.join(outDir, 'index.d.ts'),
        `${header}

export declare const WA_VERSION: string
`
    )

    console.log(`apply: WA_VERSION=${waVersion} → ${outDir}/{version.json,index.js,index.d.ts}`)
}

main()
