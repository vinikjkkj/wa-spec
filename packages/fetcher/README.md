# @vinikjkkj/wa-fetcher

Bundle source for web.whatsapp.com. Gets the release's JS onto disk and writes
a manifest — that's all. Per-domain extractors (proto, mex, diff, …) consume
the raw dump independently.

Two sources, same output layout:

| | `archive` (default) | `scrape` (legacy) |
|---|---|---|
| how | pulls the upstream bundle archive for the current revision | drives a headless browser and downloads the chunks the SPA loads |
| files kept | ~1,600 (`.js` registering a `WA*` module) | ~580 |
| dump size | ~350 MB | ~82 MB |
| `WA*` modules | **~17,000** | ~14,400 |
| needs a browser | no (only for the revision-lookup fallback) | yes |

The archive contains lazily-loaded chunks the SPA never requests. Measured on
one revision, that difference is worth **+2,800 `WA*` modules**, including
~1,000 extra `WASmax*` RPC modules — which took the `wa-xml` operation count
from 131 to 192 with nothing lost.

## Install

```sh
npm i @vinikjkkj/wa-fetcher
```

## Configuration

Archive mode needs the endpoint in the `WA_ARCHIVE_URL` environment variable,
containing a `{revision}` placeholder:

```sh
export WA_ARCHIVE_URL='https://example.invalid/{revision}/x'
```

It is deliberately not hardcoded, so it stays out of this repository and out
of the published package. The fetcher never prints the URL — a failed request
would otherwise echo a signed CDN redirect into CI logs.

## CLI

```sh
# Default: resolve the live revision, download its archive, keep the WA JS
npx wa-fetcher --out dump/

# Pin a revision (the X in 2.3000.X)
npx wa-fetcher --out dump/ --revision 1044071294

# Legacy browser scrape
npx wa-fetcher --out dump/ --source scrape

# Discovery only: just the URL list (no download). Scrape mode only.
npx wa-fetcher --source scrape --urls-only --out urls.json
```

| Flag | Default | Notes |
|---|---|---|
| `--out <path>` | `dump` (dir) / stdout (urls-only) | Output destination |
| `--source <mode>` | `archive` | `archive` or `scrape` |
| `--revision <n>` | live | Archive mode: pin a revision instead of resolving |
| `--keep-all-js` | off | Archive mode: keep every `.js` instead of only WA-bearing ones (much larger corpus) |
| `--urls-only` | off | Scrape mode: emit only the discovered URL array (JSON) |
| `--extra-wait <ms>` | `5000` | Scrape mode: wait after network-idle for lazy chunks |

**Output layout:**

```
dump/
├── manifest.json                  { waVersion, revision, source, bundles[] }
└── raw/
    └── 2.3000.<revision>/
        ├── <sha256>.js
        ├── <sha256>.js
        └── …
```

## Library

```js
const { fetchArchive, resolveRevision } = require('@vinikjkkj/wa-fetcher')

// Revision lookup on its own — a plain GET, no browser.
const { revision, waVersion } = await resolveRevision()
//   revision    "1044071294"
//   waVersion   "2.3000.1044071294"

// Resolve + download + unpack. Falls back to the browser for the revision
// lookup if the plain HTML read fails.
const dump = await fetchArchive({ out: 'dump' })
//   dump.waVersion              "2.3000.xxxxxxx"
//   dump.revision               1044071294
//   dump.bundles[]              [{ file, bytes, sha256 }, ...]
//   dump.skipped                { notJs, noWaModule, bytesDropped }
//   dump.paths.raw              absolute path to dump/raw/<version>/
//   dump.paths.manifest         absolute path to dump/manifest.json
```

Legacy scrape API, unchanged:

```js
const { discoverBundleUrls, fetchBundles } = require('@vinikjkkj/wa-fetcher')

const { waVersion, urls } = await discoverBundleUrls()
const dump = await fetchBundles({ out: 'dump' })
//   dump.bundles[]              [{ url, file, bytes }, ...]
```

## How the revision is resolved

`web.whatsapp.com` serves `"client_revision":<X>` in its initial HTML, which a
plain GET with ordinary browser headers can read — no automation needed. If
that ever stops working (markup change, block page), `fetchArchive` falls back
to the `puppeteer-real-browser` path and reads `window.Debug.VERSION`.

The two requests do not share a header set — each endpoint is particular about
what it accepts, so leave `BROWSER_HEADERS` and `ARCHIVE_HEADERS` as they are
unless a request starts failing.

## Caveats

- **Multiple transpile variants.** The archive ships more than one build of
  the same module (native `async` vs `asyncToGeneratorRuntime`, and so on).
  Extractors index the first occurrence they encounter, so file order picks
  the winner. Filenames are content-addressed and callers sort them, which
  makes that choice stable across runs — stable, but not curated. If an
  extractor suddenly returns nothing, check whether it is matching a variant it
  was not written against.
- **Archive size.** The download is large and the unpacked JS is larger still.
  The default filter keeps only `.js` that registers at least one
  `__d("WA…")` module, dropping stylesheets and the shared infrastructure no
  extractor reads. Pass `--keep-all-js` to skip the filter.
- **Anti-bot (scrape mode)** — `puppeteer-real-browser` works today but Meta
  can tighten detection. If the scrape returns blank pages, re-evaluate.
- **No extraction** — this package is intentionally dumb. The extractors live
  in [`@vinikjkkj/wa-mex`](https://github.com/vinikjkkj/wa-spec/tree/main/packages/mex)
  and [`@vinikjkkj/wa-proto`](https://github.com/vinikjkkj/wa-spec/tree/main/packages/proto)
  so adding a new artifact never requires touching the fetcher.
