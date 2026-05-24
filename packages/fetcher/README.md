# @vinikjkkj/wa-fetcher

Headless scraper for web.whatsapp.com bundles. Downloads every loaded JS
chunk to disk and writes a manifest — that's all. Per-domain extractors
(proto, mex, diff, …) consume the raw dump independently.

## Install

```sh
npm i @vinikjkkj/wa-fetcher
```

## CLI

```sh
npx wa-fetcher --out dump/
```

| Flag | Default | Notes |
|---|---|---|
| `--out <dir>` | `dump` | Output directory |
| `--auth <file>` | none | Saved cookie state JSON for authenticated fetch (captures more lazy chunks) |
| `--no-headless` | (headless) | Show the browser window |
| `--extra-wait <ms>` | `5000` | Wait this long after network-idle for lazy chunks |

**Output layout:**

```
dump/
├── manifest.json                  { waVersion, fetchedAt, bundles[] }
└── raw/
    └── <wa-version>/
        ├── chunk-AAAA.js
        ├── chunk-BBBB.js
        └── …
```

## Library

```js
const { fetchBundles } = require('@vinikjkkj/wa-fetcher')

const dump = await fetchBundles({ out: 'dump', headless: true })
//   dump.waVersion              "2.3000.xxxxxxx" | null
//   dump.bundles[]              [{ url, file, bytes }, ...]
//   dump.paths.raw              absolute path to dump/raw/<version>/
//   dump.paths.manifest         absolute path to dump/manifest.json
```

## GitHub Action

```yaml
- uses: vinikjkkj/wa-spec/packages/fetcher@v1
  id: fetch
  with:
      out: dump
- run: npx wa-mex apply --bundles ${{ steps.fetch.outputs.raw-dir }}
- run: npx wa-proto apply --bundles ${{ steps.fetch.outputs.raw-dir }}
```

## Caveats

- **Lazy chunks** that the SPA only loads via interaction (Settings, Profile,
  Premium) won't be in the dump. Use `--auth` with a pre-saved cookie state
  to maximize what loads naturally.
- **Anti-bot** — `puppeteer-real-browser` works today but Meta can tighten
  detection. If the fetcher returns blank pages, re-evaluate the strategy.
- **No extraction** — this package is intentionally dumb. The extractors live
  in [`@vinikjkkj/wa-mex`](https://github.com/vinikjkkj/wa-spec/tree/main/packages/mex)
  and [`@vinikjkkj/wa-proto`](https://github.com/vinikjkkj/wa-spec/tree/main/packages/proto)
  so adding a new artifact never requires touching the fetcher.
