# @vinikjkkj/wa-wam

WhatsApp Web WAM (analytics/metrics) event schemas — event IDs, field IDs +
types + enum refs, global session attributes, private-stats bucket IDs, and
resolved enum value sets. Everything is daily-extracted directly from the
minified `WAWebWamCodegenUtils.defineEvents(...)` / `defineGlobal(...)` calls
in WA Web bundles.

```sh
npm i @vinikjkkj/wa-wam
```

```ts
import {
    WA_WAM_EVENTS,
    WA_WAM_GLOBALS,
    WA_WAM_ENUMS,
    WA_WAM_PRIVATE_STATS_IDS,
    WA_WAM_RESERVED_GLOBALS,    // synthetic batch-level IDs (commitTime, eventSequenceNumber, psIdValue)
    WA_WAM_CHANNELS,
    WA_WAM_CHANNEL_WIRE_CODES,  // { regular: 0, realtime: 1, private: 2 } — channel byte in batch header
    WA_WAM_PROTOCOL_VERSION,    // 2nd byte of every batch header (currently 5)
    WA_WAM_WIRE_FORMAT,         // marker bytes + value-encoding bits for TLV
    WA_WAM_BUFFER_CONSTANTS     // flush/upload limits (maxBufferSize, etc.)
} from '@vinikjkkj/wa-wam'
import type {
    WaWamEventName,
    WaWamEventArgs,
    WaWamGlobalName,
    WaWamEnumName,
    WaWamField,
    WaWamChannel,
    WaWamReservedGlobal
} from '@vinikjkkj/wa-wam'

WA_WAM_EVENTS.UiAction
// → {
//     id: 472,
//     falcoName: 'wam_ui_action',
//     channel: 'regular',
//     privateStatsIdInt: null,
//     weight: { default: 1, gkx26259: 100, gkx26258: 5000 },
//     requiredFields: [],
//     fields: {
//       uiActionType:      { id:  1, type: 'enum',    enum: 'UI_ACTION_TYPE', falcoName: 'ui_action_type' },
//       uiActionPreloaded: { id:  2, type: 'boolean', falcoName: 'ui_action_preloaded' },
//       uiActionT:         { id:  3, type: 'timer',   falcoName: 'ui_action_t' },
//       sizeBucket:        { id:  4, type: 'enum',    enum: 'SIZE_BUCKET', falcoName: 'size_bucket' },
//       …23 more
//     }
//   }

WA_WAM_ENUMS.UI_ACTION_TYPE
// → {
//     module: 'WAWebWamEnumUiActionType',
//     export: 'UI_ACTION_TYPE',
//     values: { OTHER: 1, APP_OPEN: 2, CHAT_OPEN: 3, IMAGE_OPEN: 4, … }
//   }

WA_WAM_GLOBALS.platform
// → {
//     id: 11,
//     type: 'enum',
//     enum: 'PLATFORM_TYPE',
//     channels: ['regular', 'private'],
//     falcoName: 'platform'
//   }

WA_WAM_PRIVATE_STATS_IDS
// → [
//     { key: 'DefaultPsId',           keyHashInt: 113760892, rotationPeriodDays: -1 },
//     { key: 'GroupExitExperienceId', keyHashInt: 152546501, rotationPeriodDays: 30 },
//     { key: 'IdTtlDaily',            keyHashInt: 248614979, rotationPeriodDays:  1 },
//     …5 more
//   ]
```

## Typed payload builder

Each event's `fields` tuple is a discriminated union, so `type` narrows the
shape and lets `WaWamEventArgs<K>` synthesise the typed payload — enum fields
become the string-literal union of their enum's value keys (so consumers pass
`'CHAT_OPEN'` instead of the magic integer `3`), primitives map to their
natural JS types:

```ts
import type { WaWamEventArgs, WaWamEventName } from '@vinikjkkj/wa-wam'

type UiActionPayload = WaWamEventArgs<'UiAction'>
// → {
//     readonly uiActionType?:      'OTHER' | 'APP_OPEN' | 'CHAT_OPEN' | …
//     readonly uiActionPreloaded?: boolean
//     readonly uiActionT?:         number   // ms since startMarker
//     readonly sizeBucket?:        'SMALL' | 'MEDIUM' | 'LARGE' | …
//     readonly uiActionType?:      'OTHER' | 'APP_OPEN' | 'CHAT_OPEN' | …
//     …
//   }

function commitWam<K extends WaWamEventName>(name: K, payload: WaWamEventArgs<K>) {
    // …your encoder; convert enum keys to numeric values via
    // WA_WAM_ENUMS[event.fields[fieldName].enum].values[stringKey].
}

commitWam('UiAction', { uiActionType: 'CHAT_OPEN', uiActionT: 142 })          // ✓
commitWam('UiAction', { uiActionType: 'NONEXISTENT' })                        // ✗ caught at compile time
commitWam('UiAction', { uiActionTypo: 'CHAT_OPEN' })                          // ✗ caught at compile time
```

## What's in here

WAM (sometimes "WA Logger" / "Falco") is WA Web's client-side analytics
pipeline. Each mutation, action, latency, error, or daily snapshot the client
wants to report is registered through one call:

```js
// from WAWebUiActionWamEvent
WAWebWamCodegenUtils.defineEvents({
    UiAction: [472, {
        uiActionType:      [1, WAWebWamEnumUiActionType.UI_ACTION_TYPE],
        uiActionPreloaded: [2, TYPES.BOOLEAN],
        uiActionT:         [3, TYPES.TIMER],
        // …
    }, [1, 100, 5000], 'regular']
}, { UiAction: [] })
```

Each entry boils down to:

- an **event id** (`472`) — what the server keys batched payloads by
- an **event name** (`UiAction`) — the camelCase JS handle, also reduces to
  the snake-case **falco name** (`wam_ui_action`) used in shadow-logging
- a **field map** — each field has its own **field id** (`1`), JS type
  (`boolean`/`integer`/`number`/`string`/`timer`) or a **protobuf-style enum
  reference**, and a **falco field name** (snake-case)
- a **weight tuple** — three sampling weights selected at commit time based
  on gkx 26259/26258 (the runtime does `Math.random() * weight > 1`); higher
  = more aggressive sampling
- a **channel** — `regular` | `private` | `realtime`. `private` events are
  routed through a rotating pseudo-anonymous bucket (see
  `WA_WAM_PRIVATE_STATS_IDS`) and a separate upload backend
- a **privateStatsIdInt** (only on `private` events) — the `keyHashInt` of
  the bucket this event's payload belongs to

`WAWebWamGlobals.defineGlobal({...})` registers attributes attached to every
batch — platform, app version, network state, etc. — under their own ids
(`WA_WAM_GLOBALS`).

This package gives you the static metadata for all **423 events** + **46
globals** + **851 enums** + **8 privateStatsIds** + **1 synthetic `none`
bucket** + **3 reserved batch-level IDs** (commitTime / eventSequenceNumber /
psIdValue), so you can build wire-level encoders/decoders or replay metrics
without manually transcribing the client's registry.

## What's published

| File | Format | Use case |
|---|---|---|
| `index.js` | CommonJS | Runtime `WA_WAM_EVENTS` / `WA_WAM_GLOBALS` / `WA_WAM_ENUMS` / `WA_WAM_PRIVATE_STATS_IDS` / `WA_WAM_RESERVED_GLOBALS` / `WA_WAM_CHANNELS` / `WA_WAM_CHANNEL_WIRE_CODES` / `WA_WAM_PROTOCOL_VERSION` / `WA_WAM_WIRE_FORMAT` / `WA_WAM_BUFFER_CONSTANTS` frozen tables |
| `index.d.ts` | TS declarations | Per-event/global/enum literal-typed schemas + the umbrella maps + the `WaWamEventArgs<K>` payload helper |

A raw IR file (`index.json`) is also produced — see
[`packages/wam/index.json`](https://github.com/vinikjkkj/wa-spec/blob/master/packages/wam/index.json)
for non-TS consumers (diff tools, codegen, other languages).

`index.json` shape:

```jsonc
{
  "waVersion": "2.3000.xxxxx",
  "protocolVersion": 5,
  "channels": ["private", "realtime", "regular"],
  "channelWireCodes": { "regular": 0, "realtime": 1, "private": 2 },
  "wireFormat": {
    "markers": { "globalAttribute": 0, "event": 1, "field": 2, "lastFlag": 4, "extendedIdFlag": 8 },
    "valueEncodingBits": {
      "null": 0, "intZero": 16, "intOne": 32, "int8": 48, "int16": 64,
      "int32": 80, "int64": 96, "float64": 112,
      "stringShort": 128, "stringMedium": 144, "stringLong": 160
    }
  },
  "bufferConstants": {
    "maxBufferSize": 50000,
    "maxBufferSizeForUpload": 64000,
    "inMemoryBufferingDurationSecs": 5,
    "bufferRotateIntervalSecs": 120,
    "workerDataBatchSize": 100,
    "guestInMemoryBufferingDurationSecs": 1,
    "guestBufferRotateIntervalSecs": 2
  },
  "privateStatsIds": [
    { "key": "DefaultPsId", "keyHashInt": 113760892, "rotationPeriodDays": -1 },
    { "key": "none",        "keyHashInt": 0,         "rotationPeriodDays": -1 },
    …
  ],
  "reservedGlobals": [
    { "id": 47,   "label": "commitTime" },
    { "id": 3433, "label": "eventSequenceNumber" },
    { "id": 6005, "label": "psIdValue" }
  ],
  "enums": {
    "UI_ACTION_TYPE": {
      "module": "WAWebWamEnumUiActionType",
      "export": "UI_ACTION_TYPE",
      "values": { "OTHER": 1, "APP_OPEN": 2, "CHAT_OPEN": 3, … }
    }
  },
  "globals": {
    "platform": { "id": 11, "type": "enum", "enum": "PLATFORM_TYPE",
                  "channels": ["regular","private"], "falcoName": "platform" }
  },
  "events": {
    "UiAction": {
      "id": 472,
      "module": "WAWebUiActionWamEvent",
      "falcoName": "wam_ui_action",
      "channel": "regular",
      "privateStatsIdInt": null,
      "emittedByWorker": false,
      "weight": { "default": 1, "gkx26259": 100, "gkx26258": 5000 },
      "requiredFields": [],
      "conditions": [],
      "fields": {
        "uiActionType": { "id": 1, "type": "enum", "enum": "UI_ACTION_TYPE",
                          "falcoName": "ui_action_type" }
      }
    }
  }
}
```

## Wire format

Events are buffered in-memory and flushed in batches to
`WAWebUploadStatsBackend` (regular) or `WAWebUploadPrivateStatsBackend`
(private). The on-wire encoding is a compact TLV serialisation keyed by the
numeric field ids — see `WAWebWamLibContext` / `WAWebWamLibProtocol` in WA
Web's source for the canonical writer.

For most consumers the IR alone is sufficient: pair `event.id` + per-field
`{id, type, enum?}` with whatever framing your transport uses. If you need
to speak the binary protocol directly, the schema also surfaces:

- **`WA_WAM_PROTOCOL_VERSION`** — the byte stamped right after the literal
  `"WAM"` magic on every batch (currently `5`).
- **`WA_WAM_CHANNEL_WIRE_CODES`** — the channel byte at offset 5 of the
  header (`regular: 0, realtime: 1, private: 2`).
- **`WA_WAM_RESERVED_GLOBALS`** — three IDs `WAWebWamLibContext` injects
  into every batch as **global attributes** (wire marker byte `0`, disjoint
  from the event-field marker byte `2`):
  - `47`   → `commitTime` (unix seconds, set right before each event)
  - `3433` → `eventSequenceNumber` (Beaconing sequence, when non-null)
  - `6005` → `psIdValue` (psId bucket value, only for `private` channel —
    same id as the declared `psId` global, listed here for completeness)
- **`WA_WAM_WIRE_FORMAT`** — the magic numbers a TLV encoder/decoder
  needs. Marker byte = (bottom 4 bits: `markers.{globalAttribute|event|
  field}` plus `lastFlag` + `extendedIdFlag`) | (top 4 bits:
  `valueEncodingBits.{null|intZero|intOne|int8|int16|int32|int64|
  float64|stringShort|stringMedium|stringLong}` — selects payload type
  and size class).
- **`WA_WAM_BUFFER_CONSTANTS`** — the runtime's flush/upload limits:
  `maxBufferSize` (50KB triggers flush), `maxBufferSizeForUpload`
  (64KB server-side cap), `bufferRotateIntervalSecs` (120s rotation),
  `inMemoryBufferingDurationSecs` (5s), `workerDataBatchSize` (100).
  Guest sessions (unauthenticated companion links) override the two
  time-based thresholds with much shorter values:
  `guestInMemoryBufferingDurationSecs` (1s) and
  `guestBufferRotateIntervalSecs` (2s).

These IDs live in the global namespace on the wire, so an event field with
`id: 47` does NOT collide with `commitTime` — they're tagged with different
marker bytes.

## Generate locally

```sh
npx wa-fetcher --out dump/                      # download bundles
npx wa-wam apply --bundles dump/raw/<version>/
```

## Caveats

- **Sampling weight = `1` means always emit.** Higher values reduce sampling
  rate (the runtime gate is `Math.random() * weight > 1`). The tuple's three
  slots map to `default` (no gkx), `gkx26259`, `gkx26258` — the latter
  takes precedence when on.
- **`requiredFields` covers static nullability checks only.** Events list
  the camelCase field names that must be non-null at commit time, taken
  from slot 1 of every validator triple `[[predicates], [requiredFields],
  [conditions]]` (multiple triples can chain; the union is captured).
- **`conditions` captures the human-readable validation messages** from
  slot 2's `[fn, "msg"]` pairs — e.g. `"about_chat_bubble_tap_count >= 0"`,
  `"was_sheet_seen_for_first_time != False"`. The predicate function itself
  is a JS function literal we can't represent statically, but the
  developer-authored message string IS the canonical rule.
- **Predicates (slot 0)** are conditional guards that, when truthy, suppress
  the validator's required-fields/conditions checks. They're JS functions
  too — not captured.
- **`emittedByWorker: true`** on an event means its module is listed in
  `WAWebWamProcessWorkerData`'s dep array — the event is committed from the
  Web Worker thread and replayed on the main thread for serialisation. The
  worker emits 63 of the 423 events (mostly E2E/Md/AppState/Receipt/Daily
  metrics that run in background); the other 360 are committed only from
  the main UI thread.

## Auto-generated instance methods (derivable from the schema)

Each `WamEvent` subclass that `defineEvents` builds at module-load time has a
predictable instance API. The schema doesn't list these methods explicitly
(they're all derivable from `event.fields`) but they're worth knowing if
you're calling WA Web's own runtime or wrapping it:

```ts
class UiActionWamEvent {
    // Set on construction; one per event class
    readonly id: 472
    readonly $className: 'UiAction'
    readonly weight: number
    readonly wamChannel: 'regular'
    eventTime: number       // Date.now() at construction, override via setTime(t)

    // One typed setter per field (typeof-validated against the schema type)
    uiActionType: ...
    uiActionPreloaded: boolean
    uiActionT: number       // TIMER field — milliseconds
    // …

    // For every TIMER field `<x>`, two helpers auto-attached:
    startUiActionT(): void  // records ts = Date.now()
    markUiActionT(): void   // sets this.uiActionT = Date.now() - ts (or eventTime)

    // Generic accessors
    getValue(fieldName: string): unknown
    resolveEnumValue(fieldName: string, numericValue: number): string | number
    getEventNameForFalco(): string       // → 'wam_ui_action'
    getFieldsMapForFalco(): Record<string, unknown> | null

    // Commit lifecycle
    runPreCommitValidation(): void       // throws if requiredFields/conditions fail
    commit(): void                       // buffered (channel + buffer constants)
    commitAndWaitForFlush(force?: boolean): Promise<void>  // force-flush all channels if true
    setTime(t?: number): void            // override eventTime
}
```

So consumers writing typed wrappers around WA Web's runtime can derive every
method name (`mark<Field>` / `start<Field>`) from `event.fields[name].type
=== 'timer'`, and every field setter's accepted type from
`WaWamFieldValueOf<event.fields[name]>`.
- **`channel: 'realtime'` events bypass the regular buffer.** They flush
  immediately via `setTimeout(forceRunNow, 1)` when gkx 3237 is on.
- **`privateStatsIdInt` references a `keyHashInt` in `WA_WAM_PRIVATE_STATS_IDS`.**
  The matching `key` is the rotation bucket (e.g. `IdTtlDaily` rotates every
  1 day, `IdTtl90Days` every 90 days). `keyHashInt` is the hash the server
  joins on; `key` is the human label.
- **The codegen module is `WAWebWamCodegenUtils`.** Any new event added to WA
  Web shows up here on the next daily extract; any event id/field id change
  surfaces in the diff.

Daily-extracted by [wa-spec](https://github.com/vinikjkkj/wa-spec).
