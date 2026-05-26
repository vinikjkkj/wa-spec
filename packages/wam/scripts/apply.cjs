#!/usr/bin/env node
'use strict'

/**
 * Reads raw WA Web bundle .js files from a directory, runs the static
 * wam extractor over them, and writes three artifacts to the package root:
 *
 *   - index.json   raw IR (for programmatic / non-TS consumers)
 *   - index.js     CommonJS runtime (frozen WA_WAM_EVENTS/GLOBALS/ENUMS)
 *   - index.d.ts   TypeScript types (per-event/global/enum literal types)
 *
 * Usage:
 *   npx wa-wam apply --bundles dump/raw/<wa-version>/
 *   npx wa-wam apply --manifest dump/manifest.json
 */

const fs = require('node:fs')
const path = require('node:path')
const { extractWam } = require('./extract-wam.cjs')

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
            'usage: wa-wam apply (--bundles <dir> | --manifest <file>) [--out <dir>] [--wa-version <ver>]',
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

// --- safe quoting / emitters --------------------------------------------

function quote(s) {
    return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

function orNull(v) {
    return v == null ? 'null' : quote(v)
}

function emitFieldJs(field) {
    if (field.type === 'enum') {
        return `Object.freeze({ id: ${field.id}, type: 'enum', enum: ${quote(field.enumExport)}, falcoName: ${quote(field.falcoName)} })`
    }
    if (field.type === 'unknown') {
        return `Object.freeze({ id: ${field.id}, type: 'unknown', raw: ${quote(field.raw ?? '')}, falcoName: ${quote(field.falcoName)} })`
    }
    return `Object.freeze({ id: ${field.id}, type: ${quote(field.type)}, falcoName: ${quote(field.falcoName)} })`
}

function emitGlobalJs(g) {
    const channels = `Object.freeze([${g.channels.map((c) => quote(c)).join(', ')}])`
    if (g.type === 'enum') {
        return `Object.freeze({ id: ${g.id}, type: 'enum', enum: ${quote(g.enumExport)}, channels: ${channels}, falcoName: ${quote(g.falcoName)} })`
    }
    if (g.type === 'unknown') {
        return `Object.freeze({ id: ${g.id}, type: 'unknown', raw: ${quote(g.raw ?? '')}, channels: ${channels}, falcoName: ${quote(g.falcoName)} })`
    }
    return `Object.freeze({ id: ${g.id}, type: ${quote(g.type)}, channels: ${channels}, falcoName: ${quote(g.falcoName)} })`
}

function emitEnumJs(enumName, e) {
    const valuesBody = Object.entries(e.values)
        .map(([k, v]) => `        ${quote(k)}: ${v}`)
        .join(',\n')
    return `    ${enumName}: Object.freeze({
        module: ${quote(e.module)},
        export: ${quote(e.export)},
        values: Object.freeze({
${valuesBody}
        })
    })`
}

// --- TS type emitters ---------------------------------------------------

function emitFieldDts(field) {
    if (field.type === 'enum') {
        return `{ readonly id: ${field.id}; readonly type: 'enum'; readonly enum: ${quote(field.enumExport)}; readonly falcoName: ${quote(field.falcoName)} }`
    }
    if (field.type === 'unknown') {
        return `{ readonly id: ${field.id}; readonly type: 'unknown'; readonly raw: ${quote(field.raw ?? '')}; readonly falcoName: ${quote(field.falcoName)} }`
    }
    return `{ readonly id: ${field.id}; readonly type: ${quote(field.type)}; readonly falcoName: ${quote(field.falcoName)} }`
}

function emitGlobalDts(g) {
    const channels = g.channels.map((c) => quote(c)).join(', ')
    if (g.type === 'enum') {
        return `{ readonly id: ${g.id}; readonly type: 'enum'; readonly enum: ${quote(g.enumExport)}; readonly channels: readonly [${channels}]; readonly falcoName: ${quote(g.falcoName)} }`
    }
    if (g.type === 'unknown') {
        return `{ readonly id: ${g.id}; readonly type: 'unknown'; readonly raw: ${quote(g.raw ?? '')}; readonly channels: readonly [${channels}]; readonly falcoName: ${quote(g.falcoName)} }`
    }
    return `{ readonly id: ${g.id}; readonly type: ${quote(g.type)}; readonly channels: readonly [${channels}]; readonly falcoName: ${quote(g.falcoName)} }`
}

function emitEnumDts(enumName, e) {
    const valuesBody = Object.entries(e.values)
        .map(([k, v]) => `            readonly ${quote(k)}: ${v}`)
        .join(';\n')
    return `    readonly ${enumName}: {
        readonly module: ${quote(e.module)}
        readonly export: ${quote(e.export)}
        readonly values: {
${valuesBody}
        }
    }`
}

// --- main ---------------------------------------------------------------

function main() {
    const opts = parseArgs(process.argv)
    const bundles = loadBundles(opts.bundles)
    const waVersion = opts.waVersion ?? detectWaVersion(opts.bundles)
    const {
        events,
        globals,
        enums,
        privateStatsIds,
        reservedGlobals,
        protocolVersion,
        channels,
        channelWireCodes,
        bufferConstants,
        wireFormat,
        diagnostics
    } = extractWam(bundles)

    const sortedEventNames = Object.keys(events).sort()
    const sortedGlobalNames = Object.keys(globals).sort()
    const sortedEnumNames = Object.keys(enums).sort()
    const outDir = opts.out ? path.resolve(opts.out) : path.resolve(__dirname, '..')

    // ---- index.json (IR) ------------------------------------------------
    const ir = {
        waVersion,
        protocolVersion,
        channels,
        channelWireCodes,
        wireFormat,
        bufferConstants,
        privateStatsIds,
        reservedGlobals,
        enums: {},
        globals: {},
        events: {}
    }
    for (const k of sortedEnumNames) ir.enums[k] = enums[k]
    for (const k of sortedGlobalNames) {
        const g = globals[k]
        const out = { id: g.id, type: g.type, channels: g.channels, falcoName: g.falcoName }
        if (g.type === 'enum') out.enum = g.enumExport
        if (g.type === 'unknown') out.raw = g.raw
        ir.globals[k] = out
    }
    for (const k of sortedEventNames) {
        const ev = events[k]
        const fieldsOut = {}
        const fieldNames = Object.keys(ev.fields).sort()
        for (const fn of fieldNames) {
            const f = ev.fields[fn]
            const out = { id: f.id, type: f.type, falcoName: f.falcoName }
            if (f.type === 'enum') out.enum = f.enumExport
            if (f.type === 'unknown') out.raw = f.raw
            fieldsOut[fn] = out
        }
        ir.events[k] = {
            id: ev.id,
            module: ev.module,
            falcoName: ev.falcoName,
            channel: ev.channel,
            privateStatsIdInt: ev.privateStatsIdInt,
            emittedByWorker: ev.emittedByWorker,
            weight: ev.weight,
            requiredFields: ev.requiredFields,
            conditions: ev.conditions,
            fields: fieldsOut
        }
    }
    fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(ir, null, 2) + '\n')

    // ---- index.js -------------------------------------------------------
    const enumsJsBody = sortedEnumNames.map((k) => emitEnumJs(k, enums[k])).join(',\n')
    const globalsJsBody = sortedGlobalNames
        .map((k) => `    ${k}: ${emitGlobalJs(globals[k])}`)
        .join(',\n')
    const eventsJsBody = sortedEventNames
        .map((k) => {
            const ev = events[k]
            const fieldNames = Object.keys(ev.fields).sort()
            const fieldsBody = fieldNames
                .map((fn) => `            ${fn}: ${emitFieldJs(ev.fields[fn])}`)
                .join(',\n')
            const weightJs = `Object.freeze({ default: ${ev.weight.default}, gkx26259: ${ev.weight.gkx26259}, gkx26258: ${ev.weight.gkx26258} })`
            const requiredJs = `Object.freeze([${ev.requiredFields.map(quote).join(', ')}])`
            const conditionsJs = `Object.freeze([${ev.conditions.map(quote).join(', ')}])`
            return `    ${k}: Object.freeze({
        id: ${ev.id},
        falcoName: ${quote(ev.falcoName)},
        channel: ${quote(ev.channel)},
        privateStatsIdInt: ${ev.privateStatsIdInt == null ? 'null' : ev.privateStatsIdInt},
        emittedByWorker: ${ev.emittedByWorker ? 'true' : 'false'},
        weight: ${weightJs},
        requiredFields: ${requiredJs},
        conditions: ${conditionsJs},
        fields: Object.freeze({
${fieldsBody}
        })
    })`
        })
        .join(',\n')

    const channelsJs = channels.map(quote).join(', ')
    const psIdsJs = privateStatsIds
        .map(
            (p) =>
                `    Object.freeze({ key: ${quote(p.key)}, keyHashInt: ${p.keyHashInt}, rotationPeriodDays: ${p.rotationPeriodDays} })`
        )
        .join(',\n')
    const reservedGlobalsJs = reservedGlobals
        .map(
            (r) =>
                `    Object.freeze({ id: ${r.id}, label: ${quote(r.label)} })`
        )
        .join(',\n')
    const channelWireCodesJs = Object.entries(channelWireCodes)
        .filter(([c]) => channels.includes(c))
        .map(([c, code]) => `    ${quote(c)}: ${code}`)
        .join(',\n')

    const wireMarkersJs = Object.entries(wireFormat.markers)
        .map(([k, v]) => `    ${k}: ${v}`)
        .join(',\n')
    const wireValueBitsJs = Object.entries(wireFormat.valueEncodingBits)
        .map(([k, v]) => `    ${k}: ${v}`)
        .join(',\n')
    const bufferConstantsJs = bufferConstants
        ? Object.entries(bufferConstants)
              .map(([k, v]) => `    ${k}: ${v == null ? 'null' : v}`)
              .join(',\n')
        : '    // (WAWebWamConstants module not found in this bundle snapshot)'

    const js = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}
'use strict'

const WA_WAM_PROTOCOL_VERSION = ${protocolVersion == null ? 'null' : protocolVersion}

const WA_WAM_CHANNELS = Object.freeze([${channelsJs}])

const WA_WAM_CHANNEL_WIRE_CODES = Object.freeze({
${channelWireCodesJs}
})

// Wire-format marker/flag/value-encoding constants from WAWebWamLibProtocol.
// Use these to write or parse the binary TLV batch format directly.
const WA_WAM_WIRE_FORMAT = Object.freeze({
    markers: Object.freeze({
${wireMarkersJs}
    }),
    valueEncodingBits: Object.freeze({
${wireValueBitsJs}
    })
})

// Runtime buffer/upload limits from WAWebWamConstants. The runtime flushes
// when buffer size exceeds maxBufferSize, or when one of the time intervals
// elapses. Uploads larger than maxBufferSizeForUpload are rejected.
const WA_WAM_BUFFER_CONSTANTS = Object.freeze({
${bufferConstantsJs}
})

const WA_WAM_PRIVATE_STATS_IDS = Object.freeze([
${psIdsJs}
])

// Synthetic global-namespace IDs injected by WAWebWamLibContext into every
// batch (commitTime, eventSequenceNumber) — disjoint from event-field IDs
// on the wire (different marker byte). Listed here so consumers can recognise
// them when decoding raw buffers.
const WA_WAM_RESERVED_GLOBALS = Object.freeze([
${reservedGlobalsJs}
])

const WA_WAM_ENUMS = Object.freeze({
${enumsJsBody}
})

const WA_WAM_GLOBALS = Object.freeze({
${globalsJsBody}
})

const WA_WAM_EVENTS = Object.freeze({
${eventsJsBody}
})

module.exports = {
    WA_WAM_PROTOCOL_VERSION,
    WA_WAM_CHANNELS,
    WA_WAM_CHANNEL_WIRE_CODES,
    WA_WAM_WIRE_FORMAT,
    WA_WAM_BUFFER_CONSTANTS,
    WA_WAM_PRIVATE_STATS_IDS,
    WA_WAM_RESERVED_GLOBALS,
    WA_WAM_ENUMS,
    WA_WAM_GLOBALS,
    WA_WAM_EVENTS
}
`
    fs.writeFileSync(path.join(outDir, 'index.js'), js)

    // ---- index.d.ts -----------------------------------------------------
    const channelsUnion = channels.map(quote).join(' | ') || 'string'
    const enumNamesUnion = sortedEnumNames.map(quote).join(' | ') || 'string'

    const enumsDtsBody = sortedEnumNames.map((k) => emitEnumDts(k, enums[k])).join('\n')
    const globalsDtsBody = sortedGlobalNames
        .map((k) => `    readonly ${k}: ${emitGlobalDts(globals[k])}`)
        .join('\n')
    const eventsDtsBody = sortedEventNames
        .map((k) => {
            const ev = events[k]
            const fieldNames = Object.keys(ev.fields).sort()
            const fieldsBody = fieldNames
                .map((fn) => `            readonly ${fn}: ${emitFieldDts(ev.fields[fn])}`)
                .join('\n')
            const requiredTs = ev.requiredFields.length
                ? `readonly [${ev.requiredFields.map(quote).join(', ')}]`
                : 'readonly []'
            const conditionsTs = ev.conditions.length
                ? `readonly [${ev.conditions.map(quote).join(', ')}]`
                : 'readonly []'
            return `    readonly ${k}: {
        readonly id: ${ev.id}
        readonly falcoName: ${quote(ev.falcoName)}
        readonly channel: ${quote(ev.channel)}
        readonly privateStatsIdInt: ${ev.privateStatsIdInt == null ? 'null' : ev.privateStatsIdInt}
        readonly emittedByWorker: ${ev.emittedByWorker ? 'true' : 'false'}
        readonly weight: {
            readonly default: ${ev.weight.default == null ? 'null' : ev.weight.default}
            readonly gkx26259: ${ev.weight.gkx26259 == null ? 'null' : ev.weight.gkx26259}
            readonly gkx26258: ${ev.weight.gkx26258 == null ? 'null' : ev.weight.gkx26258}
        }
        readonly requiredFields: ${requiredTs}
        readonly conditions: ${conditionsTs}
        readonly fields: {
${fieldsBody}
        }
    }`
        })
        .join('\n')

    const psIdsDts = privateStatsIds
        .map(
            (p) =>
                `    { readonly key: ${quote(p.key)}; readonly keyHashInt: ${p.keyHashInt}; readonly rotationPeriodDays: ${p.rotationPeriodDays} }`
        )
        .join(',\n')
    const reservedGlobalsDts = reservedGlobals
        .map(
            (r) =>
                `    { readonly id: ${r.id}; readonly label: ${quote(r.label)} }`
        )
        .join(',\n')
    const channelWireCodesDts = Object.entries(channelWireCodes)
        .filter(([c]) => channels.includes(c))
        .map(([c, code]) => `    readonly ${quote(c)}: ${code}`)
        .join('\n')

    const dts = `// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: ${waVersion}

export type WaWamChannel = ${channelsUnion}

// Primitive WAM field types map to:
//   boolean  → JS boolean
//   integer  → JS number (validated as Number.isInteger)
//   number   → JS number (any finite)
//   string   → JS string
//   timer    → JS number (milliseconds since startMarker; see WAWebWamCodegenWamEvent)
//   enum     → string-literal union from WA_WAM_ENUMS[\`<enum>\`].values
//   unknown  → unrecognised by the extractor; \`raw\` carries the source text
export type WaWamFieldType = 'boolean' | 'integer' | 'number' | 'string' | 'timer' | 'enum' | 'unknown'

export type WaWamEnumName = ${enumNamesUnion}

export interface WaWamEnumDef<Module extends string, Export extends string, Values extends Readonly<Record<string, number>>> {
    readonly module: Module
    readonly export: Export
    readonly values: Values
}

export interface WaWamPrivateStatsId {
    readonly key: string
    readonly keyHashInt: number
    readonly rotationPeriodDays: number
}

export interface WaWamFieldEnum {
    readonly id: number
    readonly type: 'enum'
    readonly enum: WaWamEnumName
    readonly falcoName: string
}

export interface WaWamFieldPrimitive {
    readonly id: number
    readonly type: 'boolean' | 'integer' | 'number' | 'string' | 'timer'
    readonly falcoName: string
}

export interface WaWamFieldUnknown {
    readonly id: number
    readonly type: 'unknown'
    readonly raw: string
    readonly falcoName: string
}

export type WaWamField = WaWamFieldEnum | WaWamFieldPrimitive | WaWamFieldUnknown

export interface WaWamGlobalEnum extends WaWamFieldEnum {
    readonly channels: ReadonlyArray<WaWamChannel>
}

export interface WaWamGlobalPrimitive extends WaWamFieldPrimitive {
    readonly channels: ReadonlyArray<WaWamChannel>
}

export interface WaWamGlobalUnknown extends WaWamFieldUnknown {
    readonly channels: ReadonlyArray<WaWamChannel>
}

export type WaWamGlobal = WaWamGlobalEnum | WaWamGlobalPrimitive | WaWamGlobalUnknown

export interface WaWamEventWeight {
    // Sampling weight selected at commit time based on gkx gates:
    //   default  used when neither 26259 nor 26258 is enabled
    //   gkx26259 used when gkx 26259 is on
    //   gkx26258 used when gkx 26258 is on (takes precedence over 26259)
    // The runtime divides 1 by this number — higher = more aggressive sampling.
    readonly default: number | null
    readonly gkx26259: number | null
    readonly gkx26258: number | null
}

export interface WaWamEvent<
    Id extends number,
    Channel extends WaWamChannel,
    Fields extends Readonly<Record<string, WaWamField>>
> {
    readonly id: Id
    readonly falcoName: string
    readonly channel: Channel
    // Set only for channel='private' events — references a PrivateStatsAllIds
    // entry's keyHashInt; payloads are bucketed by this id so the server can
    // attribute them to the rotating pseudo-anonymous bucket.
    readonly privateStatsIdInt: number | null
    // True if this event's module is in WAWebWamProcessWorkerData's dep array
    // — meaning the event is committed from the Web Worker thread and
    // forwarded to the main thread for serialisation. Events with this flag
    // false are committed only from the main thread.
    readonly emittedByWorker: boolean
    readonly weight: WaWamEventWeight
    // camelCase field names listed by the 2nd arg of defineEvents — these MUST
    // be non-null at commit time or the event is dropped.
    readonly requiredFields: ReadonlyArray<string>
    // Human-readable validation rule messages from the validator triples
    // (\`[fn, "msg"]\` pairs) — e.g. \`"about_chat_bubble_tap_count >= 0"\`.
    readonly conditions: ReadonlyArray<string>
    readonly fields: Fields
}

// Wire-level constants — useful for consumers building their own batch
// encoders/decoders against the binary protocol that WAWebWamLibProtocol /
// WAWebWamLibContext speak.

// Stamped as the 2nd byte of each batch header (right after the "WAM" magic).
export declare const WA_WAM_PROTOCOL_VERSION: number

export declare const WA_WAM_CHANNELS: ReadonlyArray<WaWamChannel>

// Channel byte written at offset 4 of every batch header. The mapping is
// constant in WAWebWamLibContext's constructor.
export declare const WA_WAM_CHANNEL_WIRE_CODES: {
${channelWireCodesDts}
}

// Wire-format constants from WAWebWamLibProtocol. Marker bytes are split
// into bottom 4 bits (marker type + last/extendedId flags) and top 4 bits
// (value type + size class). See WAWebWamLibProtocol's \`f()\` for the
// encoder state machine.
export interface WaWamWireFormat {
    readonly markers: {
        readonly globalAttribute: 0
        readonly event: 1
        readonly field: 2
        readonly lastFlag: 4
        readonly extendedIdFlag: 8
    }
    readonly valueEncodingBits: {
        readonly null: 0
        readonly intZero: 16
        readonly intOne: 32
        readonly int8: 48
        readonly int16: 64
        readonly int32: 80
        readonly int64: 96
        readonly float64: 112
        readonly stringShort: 128
        readonly stringMedium: 144
        readonly stringLong: 160
    }
}

export declare const WA_WAM_WIRE_FORMAT: WaWamWireFormat

// Runtime buffer/upload limits from WAWebWamConstants. The runtime flushes
// the in-memory batch when buffer.size() > maxBufferSize bytes, or when
// bufferRotateIntervalSecs/inMemoryBufferingDurationSecs has elapsed. The
// server rejects uploads larger than maxBufferSizeForUpload bytes.
export interface WaWamBufferConstants {
    readonly maxBufferSize: number | null
    readonly maxBufferSizeForUpload: number | null
    readonly inMemoryBufferingDurationSecs: number | null
    readonly bufferRotateIntervalSecs: number | null
    readonly workerDataBatchSize: number | null
    // Guest-mode overrides — used when the runtime detects a guest session
    // (unauthenticated companion link). Size thresholds are shared with the
    // primary set; only the two time-based thresholds shrink.
    readonly guestInMemoryBufferingDurationSecs: number | null
    readonly guestBufferRotateIntervalSecs: number | null
}

export declare const WA_WAM_BUFFER_CONSTANTS: WaWamBufferConstants

// Synthetic global-namespace IDs WAWebWamLibContext injects into every batch
// before writing the first event. These IDs are NOT declared via defineGlobal
// but appear on the wire as global attributes (marker byte = 0). They are
// disjoint from the event-field namespace (marker byte = 2), so an event
// field with id=47 does not collide with the commitTime global.
export interface WaWamReservedGlobal {
    readonly id: number
    // Label is one of: 'commitTime' | 'eventSequenceNumber' | 'psIdValue'
    readonly label: string
}

export declare const WA_WAM_RESERVED_GLOBALS: ReadonlyArray<WaWamReservedGlobal>

export declare const WA_WAM_PRIVATE_STATS_IDS: ReadonlyArray<WaWamPrivateStatsId>

export declare const WA_WAM_ENUMS: {
${enumsDtsBody}
}

export declare const WA_WAM_GLOBALS: {
${globalsDtsBody}
}

export declare const WA_WAM_EVENTS: {
${eventsDtsBody}
}

export type WaWamEventName = keyof typeof WA_WAM_EVENTS
export type WaWamGlobalName = keyof typeof WA_WAM_GLOBALS

// --- Derived helpers ------------------------------------------------------

// Resolve a field's commit-time JS value type. Enum fields surface as the
// string-literal union of their enum's value keys (so consumers pass
// 'CHAT_OPEN' instead of the magic integer 3). Primitives map to their
// natural JS types; \`unknown\` falls back to \`unknown\`.
export type WaWamFieldValueOf<F> =
    F extends { type: 'enum'; enum: infer E extends WaWamEnumName }
        ? keyof (typeof WA_WAM_ENUMS)[E]['values']
        : F extends { type: 'boolean' }
          ? boolean
          : F extends { type: 'string' }
            ? string
            : F extends { type: 'integer' | 'number' | 'timer' }
              ? number
              : unknown

// Typed payload for an event — keys are field names, values are the resolved
// JS type. Every field is optional (the runtime accepts partial payloads and
// drops on validation only if a requiredField is null), so consumers can
// commit sparse events the same way the WAM bus does.
export type WaWamEventArgs<K extends WaWamEventName> = {
    readonly [F in keyof (typeof WA_WAM_EVENTS)[K]['fields']]?:
        WaWamFieldValueOf<(typeof WA_WAM_EVENTS)[K]['fields'][F]>
}

export type WaWamGlobalValueOf<G> = WaWamFieldValueOf<G>
`
    fs.writeFileSync(path.join(outDir, 'index.d.ts'), dts)

    const errs = diagnostics.eventsErrored
    const enumErrs = diagnostics.enumsUnresolved.length
    const summaryParts = [
        `${sortedEventNames.length} events`,
        `${sortedGlobalNames.length} globals`,
        `${sortedEnumNames.length} enums`,
        `${privateStatsIds.length} privateStatsIds`
    ]
    if (errs > 0) {
        summaryParts.push(
            `${errs} errored (${diagnostics.errors.slice(0, 3).map((e) => `${e.module}/${e.error}`).join(', ')}${errs > 3 ? '…' : ''})`
        )
    }
    if (enumErrs > 0) {
        summaryParts.push(
            `${enumErrs} enums unresolved (${diagnostics.enumsUnresolved.slice(0, 3).map((e) => `${e.export}/${e.reason}`).join(', ')}${enumErrs > 3 ? '…' : ''})`
        )
    }
    console.log(`apply: ${summaryParts.join(' / ')} → ${outDir}/{index.json,index.js,index.d.ts}`)
}

main()
