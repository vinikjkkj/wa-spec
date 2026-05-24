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
      "variablesShape": { "input": { "key": "string", "type": "enum:A|B", ... } },
      "response": { "xwa2_newsletter": { ... } }
    }
  }
}
```

Leaves are tagged strings: `"string"` | `"number"` | `"boolean"` | `"unknown"` |
`"enum:VAL1|VAL2|..."`. Objects/arrays preserve structure.

## Generate locally

```sh
npx wa-fetcher --out dump/                  # download bundles
npx wa-mex apply --bundles dump/raw/<version>/
```

## Caveats

- **Leaf types are inferred from caller code, best-effort.** Relay strips
  GraphQL scalar types from compiled artifacts, so we walk multiple bodies
  (primary Job + 2nd-hop consumers) for evidence: literal RHS,
  `Number(...)` / `parseInt(...)` / `createWid(...)` coercions, `=== "X"`
  and `case "X":` enum comparisons (incl. switch-body scan), `<v> != null
  && <v>` bool-coalesce, `=== !0` / `=== !1`. Aliases and constant objects
  are resolved through minifier rewrites; `forEach`/`map`/`for-of` callback
  params are tracked as aliases for array items. Path-qualified search
  disambiguates fields with the same name at multiple paths (`state.type`
  vs `picture.type`); ambiguous bare scans accept single hits only for
  high-confidence patterns. After all code-evidence is exhausted, a curated
  table of GraphQL / WA Mex conventions fills the rest:

  **Schema invariants (universal):**
  - GraphQL spec: `__typename` → `string`; `id` / `*_id` → `string` (ID
    scalar is always string-serialized)
  - GraphQL Relay pagination spec: `hasNextPage|hasPreviousPage` →
    `boolean`; `startCursor|endCursor|cursor|*_cursor|before|after` →
    `string`; `first|last` → `number`
  - WA addressing: `*_jid|*_lid|*_wid|*_pn` → `string`
  - URLs: `*_url|*_uri` → `string`
  - Timestamps: `*_at|*_time|*_date|*_timestamp` → `string` (wire numbers
    exceed JS safe-integer so WA serializes them as strings)
  - Counters: `*_count|*_num|*_size` → `number`
  - WA-specific opaque IDs: `direct_path`, `*_server_id|*_msg_id|*_fbid`,
    `last_status_server_id` → `string`
  - Money (BigDecimal-as-string for precision): `price`, `currency`,
    `*_price`, `*_currency*` → `string`
  - Errors: `error_message` → `string`, `error_code` → `number`
  - Contact: `email|*_email`, `phone|phone_number|*_phone*` → `string`
  - Locale: `locale`, `language`, `country_code|*_country_code*` → `string`
  - Identity strings: `display_name`, `handle`, `invite` → `string`
  - Canonical English booleans: `is_*`, `has_*`, `can_*` → `boolean`;
    `*_enabled|*_disabled|*_active|*_allowed|*_visible|*_hidden|*_locked|
    *_required|*_verified|*_deleted|*_archived|*_muted|*_pinned|*_starred`
    → `boolean`; `success`, `error` → `boolean`

  **Naming conventions (precision tradeoff — may downgrade enums to plain
  string):**
  - Content/text nouns (`name|text|description|caption|subject|title|label|
    message|body|content|summary|headline|subtitle|explanation|overview|
    disclaimer|note|comment|...`) → `string`
  - Categorical (`status|type|kind|mode|state|category|verification|...`)
    → `string` (some are actually Enums; the code-evidence pass tries to
    recover specific value sets first)
  - Address: `street|street1|street2|address|city|zip|postal_code|country|
    region` → `string`
  - Dimensions / numerics: `width|height|length|depth|offset|limit|index|
    score|rank|priority|amount|total|max|min|capacity|quantity|duration|
    ttl|timeout|version|page` (and `*_<same>$` suffixes) → `number`

  Invariants are spec-grade; conventions are heuristic and may misclassify
  unusual fields. Code-evidence always wins over both.

  **Cross-module enum discovery:** WA Web ships explicit enum declarations
  in separate modules (e.g. `WAWebCommonNewsletterEnums`). Two patterns
  are extracted from any bundle module:
  - `<X>.Mirrored([...])` — the array values are server-format strings
    (Mirrored means JS key === wire value). E.g. `WamoSubStatus = e.Mirrored(["ACTIVE","INACTIVE"])`.
  - `switch(<v>){case "VAL1":return X.EnumName.Foo; case "VAL2":...}` —
    conversion functions where `case` literals are wire-format strings and
    the returned `EnumName` gives the canonical name. Recovers numeric-
    valued enums like `NewsletterCapability` (21 wire values) whose JS
    object stores integer IDs but the converter maps from server strings.

  Each declaration is linked to its exported name (`i.<Name>=<localVar>`)
  and indexed globally. For every `unknown`/`string` leaf, we generate
  candidate enum names from the field path (CamelCase, singular,
  parent-token combinations like `xwa2_newsletter_admin.capabilities`
  → `NewsletterCapability`) and promote to the matched value set.

  **Live wire samples (top-tier evidence):** the extractor reads sanitized
  capture data from `packages/mex/wire-samples/captures.json` (versioned —
  small ~50KB JSON containing wire shape + UPPER_SNAKE enum values only,
  with all JIDs/names/descriptions/timestamps/tokens replaced by zero/empty
  placeholders). For every observed `(opName, path)` we record `typeof` of
  the actual value and aggregate UPPER_SNAKE string literals seen — when the
  value set is small we promote to `enum:VAL1|VAL2|...` with every observed
  value (merging with any statically-recovered enum). Wire wins over
  invariants/conventions and fills `unknown` gaps. To regenerate captures:
  use the [zapo MCP](https://github.com/vinikjkkj/zapo) to send `w:mex` IQs
  against a connected session, save the raw responses to
  `dump/wire-samples/captures.json` (gitignored), then run
  `npm run sanitize:wire-samples` to produce the committable version.
- **Recovered enums are a lower bound** — only values some caller compares
  against are captured (e.g. group `state` recovers `NON_EXISTENT | SUSPENDED`
  but not `ACTIVE` because that's the fallthrough). Treat as the *known*
  members, not a closed schema.
- **Names use a short-key transformation** — `WAWebMexFetchNewsletterJobQuery`
  → `FetchNewsletter`. Collisions abort the generator.
- **Biz/Ad/AI ops are filtered out** by the upstream extractor (newsletter,
  group, profile, username, status — i.e. the surface a generic client cares
  about — are kept).

Daily-extracted by [wa-spec](https://github.com/vinikjkkj/wa-spec).
