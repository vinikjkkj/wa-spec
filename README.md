# wa-spec

Daily-extracted WhatsApp Web protocol bindings.

Three independent packages, one shared fetcher:

- [`@vinikjkkj/wa-fetcher`](./packages/fetcher) — downloads every loaded JS
  bundle from web.whatsapp.com to disk and writes a manifest. That's all it
  does — extraction lives in the consumers.
- [`@vinikjkkj/wa-mex`](./packages/mex) — Mex GraphQL persist IDs, variable
  shapes, and response shapes. Publishes `index.json` (IR) + `index.js` (CJS) +
  `index.d.ts` (TS types).
- [`@vinikjkkj/wa-proto`](./packages/proto) — Protobuf message definitions.
  Publishes `WAProto.proto` (SDL) + `dist/index.{js,d.ts}` (pbjs/pbts compiled).

External consumers (e.g. [`wa-diff`](https://github.com/vinikjkkj/wa-diff)) can
depend on `@vinikjkkj/wa-fetcher` directly without pulling proto/mex.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    @vinikjkkj/wa-fetcher                         │
│                                                                  │
│   puppeteer-real-browser → web.whatsapp.com                     │
│                                                                  │
│   dump/                                                          │
│   ├─ raw/<wa-version>/*.js     every loaded bundle              │
│   └─ manifest.json             { waVersion, bundles[] }         │
└─────────────────────────────────────────────────────────────────┘
                   │
        ┌──────────┼──────────────┐
        ↓          ↓              ↓
┌────────────────┐ ┌──────────────────┐ ┌──────────────┐
│ @vinikjkkj/    │ │ @vinikjkkj/      │ │ wa-diff      │
│ wa-mex         │ │ wa-proto         │ │ (external)   │
│                │ │                  │ │              │
│ index.json     │ │ WAProto.proto    │ │ <its own>    │
│ index.js       │ │ dist/index.{js,  │ │              │
│ index.d.ts     │ │  d.ts}           │ │              │
└────────────────┘ └──────────────────┘ └──────────────┘
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
```

## Packages

| Package | Purpose | Output |
|---|---|---|
| [`fetcher`](./packages/fetcher) | Scrape WA Web bundles | `dump/raw/*.js` + `dump/manifest.json` |
| [`mex`](./packages/mex) | Mex GraphQL bindings | `index.json` + `index.js` + `index.d.ts` |
| [`proto`](./packages/proto) | Protobuf bindings | `WAProto.proto` + `dist/index.{js,d.ts}` |
