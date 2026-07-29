# wa-spec

Daily-extracted WhatsApp Web protocol bindings.

Eight independent packages, one shared fetcher:

- [`@vinikjkkj/wa-fetcher`](./packages/fetcher) — puts the release's JS on disk
  and writes a manifest. That's all it does — extraction lives in the
  consumers. By default it pulls the upstream bundle archive for the current
  revision (~1,600 files / ~17k `WA*` modules), which includes
  lazily-loaded chunks the SPA never requests; the old headless-browser scrape
  (~580 files / ~14.4k modules) remains available via `--source scrape` and
  backs the revision lookup if the plain HTML read fails. The archive endpoint
  comes from the `WA_ARCHIVE_URL` environment variable, not from this tree.
- [`@vinikjkkj/wa-mex`](./packages/mex) — Mex GraphQL persist IDs, variable
  shapes, and response shapes. Publishes `index.json` (IR) + `index.js` (CJS) +
  `index.d.ts` (TS types).
- [`@vinikjkkj/wa-proto`](./packages/proto) — Protobuf message definitions.
  Publishes `WAProto.proto` (SDL) + `dist/index.{js,d.ts}` (pbjs/pbts compiled).
- [`@vinikjkkj/wa-appstate`](./packages/appstate) — AppState (Syncd) action
  schemas: wire name, collection, version, value field and index shape for
  every multi-device sync action. Publishes `index.json` + `index.js` + `index.d.ts`.
- [`@vinikjkkj/wa-xml`](./packages/xml) — XML/stanza schemas for every Smax
  IQ operation AND every incoming server-initiated stanza (`<notification>`,
  `<receipt>`, `<message>`, `<chatstate>`, `<presence>`, `<ib>`, `<call>`,
  `<status>`, etc.): per-op request + response trees AND per-handler stanza
  trees (tag, attrs, children, content) recovered from `WASmax*RPC` modules
  + the three `WAWebCommsHandle*Stanza` dispatch tables. Publishes
  `index.json` + `index.js` + `index.d.ts`.
- [`@vinikjkkj/wa-wam`](./packages/wam) — WAM (analytics/metrics) event
  schemas: event id + falco name + channel + weights + per-field id/type/enum
  for every `defineEvents` call, plus globals, private-stats bucket ids, and
  resolved enum value sets. Publishes `index.json` + `index.js` + `index.d.ts`.
- [`@vinikjkkj/wa-abprops`](./packages/abprops) — AB props (server-driven
  experiment configs): numeric config code, wire value type, shipped default
  and internal-build debug default for every user-level and group-level prop,
  plus the code→name reverse maps and the early-read/localStorage-mirrored
  allowlists. Publishes `index.json` + `index.js` + `index.d.ts`.
- [`@vinikjkkj/wa-version`](./packages/version) — just the WhatsApp Web
  version string (`WA_VERSION`) the rest of the packages were extracted
  from. Tiny standalone so consumers can pin handshake / WAM event-version
  / pairing-flow checks to the same build. Publishes `version.json` +
  `index.js` + `index.d.ts`.

External consumers (e.g. [`wa-diff`](https://github.com/vinikjkkj/wa-diff)) can
depend on `@vinikjkkj/wa-fetcher` directly without pulling proto/mex/appstate.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    @vinikjkkj/wa-fetcher                         │
│                                                                  │
│   web.whatsapp.com → "client_revision" → bundle archive          │
│   (puppeteer-real-browser scrape as fallback / --source scrape)  │
│                                                                  │
│   dump/                                                          │
│   ├─ raw/<wa-version>/*.js     WA-bearing JS from the release    │
│   └─ manifest.json             { waVersion, revision, bundles[] }│
└─────────────────────────────────────────────────────────────────┘
                   │
        ┌──────────┼──────────┬──────────────┐
        ↓          ↓          ↓              ↓
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────┐ ┌──────────────┐
│ @vinikjkkj/│ │ @vinikjkkj/│ │ @vinikjkkj/│ │ @vinikjkkj/│ │ @vinikjkkj/│ │ @vinikjkkj/│ │ @vinikjkkj/ │ │ wa-diff      │
│ wa-mex     │ │ wa-proto   │ │ wa-appstate│ │ wa-xml     │ │ wa-wam     │ │ wa-abprops │ │ wa-version  │ │ (external)   │
│            │ │            │ │            │ │            │ │            │ │            │ │             │ │              │
│ index.json │ │ WAProto.   │ │ index.json │ │ index.json │ │ index.json │ │ index.json │ │ version.json│ │ <its own>    │
│ index.js   │ │ proto      │ │ index.js   │ │ index.js   │ │ index.js   │ │ index.js   │ │ index.js    │ │              │
│ index.d.ts │ │ dist/      │ │ index.d.ts │ │ index.d.ts │ │ index.d.ts │ │ index.d.ts │ │ index.d.ts  │ │              │
└────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘ └─────────────┘ └──────────────┘
```

Each extractor reads the raw bundle directory directly. No intermediate JSON
contract between fetcher and consumers — bundles are the source of truth.

## Daily flow

GitHub Actions cron fires once a day:
1. Fetcher dumps bundles
2. Each extractor regenerates its outputs
3. Diff against previous commit; if anything changed, bump version and publish

## Local dev

```sh
# One-time
npm install

# Pull fresh bundles + regenerate everything
npm run fetch
npm run extract:mex
npm run extract:proto
npm run extract:appstate
npm run extract:xml
npm run extract:wam
npm run extract:abprops
npm run extract:version
```

## Packages

| Package | Purpose | Output |
|---|---|---|
| [`fetcher`](./packages/fetcher) | Scrape WA Web bundles | `dump/raw/*.js` + `dump/manifest.json` |
| [`mex`](./packages/mex) | Mex GraphQL bindings | `index.json` + `index.js` + `index.d.ts` |
| [`proto`](./packages/proto) | Protobuf bindings | `WAProto.proto` + `dist/index.{js,d.ts}` |
| [`appstate`](./packages/appstate) | AppState (Syncd) schemas | `index.json` + `index.js` + `index.d.ts` |
| [`xml`](./packages/xml) | Smax IQ stanza schemas (request + response trees) | `index.json` + `index.js` + `index.d.ts` |
| [`wam`](./packages/wam) | WAM (analytics/metrics) event schemas | `index.json` + `index.js` + `index.d.ts` |
| [`abprops`](./packages/abprops) | AB props (experiment configs): codes, types, defaults | `index.json` + `index.js` + `index.d.ts` |
| [`version`](./packages/version) | WhatsApp Web version string (`WA_VERSION`) | `version.json` + `index.js` + `index.d.ts` |
