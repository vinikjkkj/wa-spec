#!/usr/bin/env node
'use strict'

/**
 * Reads raw WA Web bundle .js files from a directory, runs the static mex
 * extractor over them, and writes three artifacts to the package root:
 *
 *   - index.json   raw IR (for programmatic/non-TS consumers)
 *   - index.js     CommonJS runtime (frozen WA_MEX_PERSIST_IDS + SCHEMAS)
 *   - index.d.ts   TypeScript types (per-op variables + responses)
 *
 * Usage:
 *   npx wa-mex apply --bundles dump/raw/<wa-version>/
 */

const fs = require('node:fs')
const path = require('node:path')
const { extractMex } = require('./extract-mex.cjs')

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
            'usage: wa-mex apply (--bundles <dir> | --manifest <file>) [--out <dir>] [--wa-version <ver>]',
            '',
            '  --bundles <dir>     directory containing raw .js bundle dumps',
            '  --manifest <file>   read rawDir + waVersion from this manifest.json',
            '  --out <dir>         output directory (default: <pkg> root)',
            '  --wa-version <ver>  pin the version stamped into output headers'
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
    const base = path.basename(path.resolve(bundlesDir))
    if (/^\d+\.\d+/.test(base)) return base
    return fallback ?? 'unknown'
}

// --- short-key transformation + safe quoting ---

function shortKey(opName) {
    return opName
        .replace(/^WAWebMex/, '')
        .replace(/^WAWeb/, '')
        .replace(/Job(Mutation|Query)$/, '')
        .replace(/(Mutation|Query)$/, '')
}

function quote(s) {
    return `'${String(s).replace(/'/g, "\\'")}'`
}

function keyLiteral(name) {
    return /^[A-Za-z_$][\w$]*$/.test(name) ? name : quote(name)
}

// Recursive emitter for shapes captured by the extractor:
//   null            → unknown (scalar leaf)
//   { ...fields }   → singular object
//   [{ ...fields }] → plural object (ReadonlyArray)
function emitShapeType(node, indent) {
    if (node === null || node === undefined) return 'unknown'
    if (Array.isArray(node)) {
        const inner = node[0] ?? null
        return `ReadonlyArray<${emitShapeType(inner, indent)}>`
    }
    if (typeof node === 'object') {
        const keys = Object.keys(node)
        if (keys.length === 0) return 'Readonly<Record<string, unknown>>'
        const inner = indent + '    '
        const lines = keys.map(
            (k) => `${inner}readonly ${keyLiteral(k)}?: ${emitShapeType(node[k], inner)}`
        )
        return `{\n${lines.join('\n')}\n${indent}}`
    }
    return 'unknown'
}

function main() {
    const opts = parseArgs(process.argv)
    const bundles = loadBundles(opts.bundles)
    const waVersion = opts.waVersion ?? detectWaVersion(opts.bundles)
    const { operations: rawOps, diagnostics } = extractMex(bundles)

    // Re-key by shortKey. When two ops collide (e.g. same name with both a
    // Mutation and Query variant), disambiguate the LATER one by appending
    // its capitalised operationKind ("Mutation" / "Query"). Both end up
    // unique without losing either operation.
    const ops = {}
    let disambiguated = 0
    for (const [opName, op] of Object.entries(rawOps)) {
        let key = shortKey(opName)
        if (ops[key]) {
            const suffix =
                op.operationKind.charAt(0).toUpperCase() + op.operationKind.slice(1)
            const altKey = `${key}${suffix}`
            if (ops[altKey]) {
                console.error(
                    `apply: unresolvable collision for ${key} (already taken by ${ops[key].__opName} and ${ops[altKey].__opName}) — dropping ${opName}`
                )
                continue
            }
            key = altKey
            disambiguated++
        }
        ops[key] = { ...op, __opName: opName }
    }

    const sortedKeys = Object.keys(ops).sort()
    const outDir = opts.out ? path.resolve(opts.out) : path.resolve(__dirname, '..')

    // ---- index.json (IR for programmatic consumers) ----
    const ir = { waVersion, operations: {} }
    for (const key of sortedKeys) {
        const op = ops[key]
        ir.operations[key] = {
            originalName: op.__opName,
            docId: op.docId,
            operationKind: op.operationKind,
            variables: op.variables,
            variablesShape: op.variablesShape,
            response: op.response
        }
    }
    fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(ir, null, 2) + '\n')

    // ---- index.js (CommonJS runtime) ----
    const jsBody = sortedKeys
        .map((key) => {
            const op = ops[key]
            return `    ${key}: Object.freeze({ docId: ${quote(op.docId)}, clientDocId: ${quote(op.docId)} })`
        })
        .join(',\n')
    const jsSchemas = sortedKeys
        .map((key) => {
            const op = ops[key]
            const vars = op.variables.map((v) => quote(v)).join(', ')
            return `    ${key}: Object.freeze({ operationKind: ${quote(op.operationKind)}, variables: Object.freeze([${vars}]) })`
        })
        .join(',\n')
    const js = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}
'use strict'

const WA_MEX_PERSIST_IDS = Object.freeze({
${jsBody}
})

const WA_MEX_OPERATION_SCHEMAS = Object.freeze({
${jsSchemas}
})

module.exports = { WA_MEX_PERSIST_IDS, WA_MEX_OPERATION_SCHEMAS }
`
    fs.writeFileSync(path.join(outDir, 'index.js'), js)

    // ---- index.d.ts (TypeScript types) ----
    const persistIdsLines = sortedKeys
        .map((key) => `    readonly ${key}: WaMexPersistId`)
        .join('\n')
    const schemasLines = sortedKeys
        .map((key) => {
            const op = ops[key]
            const vars = op.variables.map((v) => quote(v)).join(', ')
            return `    readonly ${key}: WaMexOperationSchema<${quote(op.operationKind)}, readonly [${vars}]>`
        })
        .join('\n')
    const variableInterfaces = sortedKeys
        .map((key) => {
            const op = ops[key]
            const aliasName = `WaMex${key}Variables`
            const shape =
                op.variablesShape && Object.keys(op.variablesShape).length > 0
                    ? op.variablesShape
                    : op.variables.length === 0
                      ? {}
                      : Object.fromEntries(op.variables.map((v) => [v, null]))
            if (Object.keys(shape).length === 0) {
                return `export type ${aliasName} = Readonly<Record<string, never>>`
            }
            return `export type ${aliasName} = ${emitShapeType(shape, '')}`
        })
        .join('\n\n')
    const variableMapLines = sortedKeys
        .map((key) => `    readonly ${key}: WaMex${key}Variables`)
        .join('\n')
    const responseAliases = sortedKeys
        .map((key) => {
            const op = ops[key]
            const aliasName = `WaMex${key}Response`
            const node = op.response ?? {}
            return `export type ${aliasName} = ${emitShapeType(node, '')}`
        })
        .join('\n\n')
    const responseMapLines = sortedKeys
        .map((key) => `    readonly ${key}: WaMex${key}Response`)
        .join('\n')
    const dts = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}

export interface WaMexPersistId {
    readonly docId: string
    readonly clientDocId: string
}

export interface WaMexOperationSchema<
    K extends 'query' | 'mutation' = 'query' | 'mutation',
    V extends ReadonlyArray<string> = ReadonlyArray<string>
> {
    readonly operationKind: K
    readonly variables: V
}

export declare const WA_MEX_PERSIST_IDS: {
${persistIdsLines}
}

export declare const WA_MEX_OPERATION_SCHEMAS: {
${schemasLines}
}

${variableInterfaces}

export interface WaMexOperationVariables {
${variableMapLines}
}

${responseAliases}

export interface WaMexOperationResponses {
${responseMapLines}
}
`
    fs.writeFileSync(path.join(outDir, 'index.d.ts'), dts)

    console.log(
        `apply: ${sortedKeys.length} operations (from ${diagnostics.graphqlModulesDiscovered} graphql modules, skipped ${diagnostics.operationsSkippedBiz} biz) → ${outDir}/{index.json,index.js,index.d.ts}`
    )
}

main()
