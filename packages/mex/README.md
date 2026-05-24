# @vinikjkkj/wa-mex

Typed WhatsApp Web Mex GraphQL bindings — persist IDs, variable shapes, and response shapes.

```sh
npm i @vinikjkkj/wa-mex
```

```ts
import { WA_MEX_PERSIST_IDS, WA_MEX_OPERATION_SCHEMAS } from '@vinikjkkj/wa-mex'
import type {
    WaMexPersistId,
    WaMexOperationVariables,
    WaMexOperationResponses,
    WaMexFetchNewsletterVariables,
    WaMexFetchNewsletterResponse
} from '@vinikjkkj/wa-mex'

// Use the persist ID + schema to build your own Mex IQ
const { docId, clientDocId } = WA_MEX_PERSIST_IDS.FetchNewsletter
const { operationKind, variables } = WA_MEX_OPERATION_SCHEMAS.FetchNewsletter
```

## What's published

| File | Format | Use case |
|---|---|---|
| `index.js` | CommonJS | Runtime `WA_MEX_PERSIST_IDS` + `WA_MEX_OPERATION_SCHEMAS` frozen tables |
| `index.d.ts` | TS declarations | Per-op `WaMex<Key>Variables` + `WaMex<Key>Response` types + the umbrella maps |
| `index.json` | Raw IR | Programmatic access (non-TS consumers, diff tools, code generators in other languages) |

`index.json` shape:

```jsonc
{
  "waVersion": "2.3000.xxxxx",
  "operations": {
    "FetchNewsletter": {
      "originalName": "WAWebMexFetchNewsletterJobQuery",
      "docId": "35452404184358876",
      "operationKind": "query",
      "variables": ["input", "fetch_viewer_metadata", ...],
      "variablesShape": { "input": { "key": null, "type": null, ... }, ... },
      "response": { "xwa2_newsletter": { ... } }
    }
  }
}
```

## Generate locally

```sh
npx wa-fetcher --out dump/                  # download bundles
npx wa-mex apply --bundles dump/raw/<version>/
```

## Caveats

- **Leaf types are always `unknown`** — Relay's compiled output strips
  GraphQL scalar types. Recoverable only via schema introspection (not available
  on Meta's prod endpoint).
- **Names use a short-key transformation** — `WAWebMexFetchNewsletterJobQuery`
  → `FetchNewsletter`. Collisions abort the generator.
- **Biz/Ad/AI ops are filtered out** by the upstream extractor (newsletter,
  group, profile, username, status — i.e. the surface a generic client cares
  about — are kept).

Daily-extracted by [wa-spec](https://github.com/vinikjkkj/wa-spec).
