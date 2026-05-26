# @vinikjkkj/wa-xml

WhatsApp Web XML/stanza schemas — per-IQ-operation request + response trees
(tag, attrs, children, content) recovered from the Smax RPC modules, plus
the server-initiated stanza dispatch table (receipt / notification /
chatstate / presence / call / stream:error / ib / success / failure /
error) reconstructed from the imperative `WAWebHandle*` handlers.

```sh
npm i @vinikjkkj/wa-xml
```

```ts
import { WA_XML_OPERATIONS, WA_XML_STANZAS } from '@vinikjkkj/wa-xml'
import type {
    WaXmlOperations,
    WaXmlOperationKey,
    WaXmlStanzaEntry
} from '@vinikjkkj/wa-xml'

WA_XML_OPERATIONS.CompanionHello
// → {
//     module: 'WASmaxMdCompanionHelloRPC',
//     opName: 'CompanionHello',
//     rootTag: 'iq',
//     xmlns: 'md',
//     type: 'set',
//     requestModule: 'WASmaxOutMdCompanionHelloRequest',
//     responseModules: [
//       'WASmaxInMdCompanionHelloResponseNotifyCompanion',
//       'WASmaxInMdCompanionHelloResponseError'
//     ]
//   }

WA_XML_STANZAS.notification
// → {
//     tag: 'notification',
//     discriminator: 'type',
//     variants: {
//       picture:     { module: 'WAWebHandleProfilePicNotification', method: 'handleProfilePicNotificationJob' },
//       devices:     { module: 'WAWebHandleDeviceNotification',     method: 'handleDevicesNotification' },
//       server_sync: { module: 'WAWebHandleServerSyncNotification', method: 'handleServerSyncNotification' },
//       …23 more
//     }
//   }
```

The full per-op tree (request shape + each response variant) plus per-stanza
trees are in
[`index.json`](https://github.com/vinikjkkj/wa-spec/blob/master/packages/xml/index.json)
and as TypeScript literal types in `WaXmlOperations` / `WaXmlStanzas`.

## What's in here

WhatsApp Web sends and receives binary-encoded XMPP-like "stanzas"
(`WapNode` trees) over the encrypted noise tunnel. The package covers two
surfaces — declarative IQ RPC operations and the imperative dispatch table
for everything else the client receives.

### IQ operations (declarative Smax pipeline)

For *IQ-style* RPC operations the client code is fully declarative in two
places:

| Module pattern | Role |
|---|---|
| `WASmaxOut*Request` | request builder — calls `smax(tag, attrs, ...children)` (`smax === WAWap.wap`) with typed coercer attrs (`WAWap.CUSTOM_STRING`, `INT`, `LONG_INT`, `USER_JID`, `DEVICE_JID`, `GROUP_JID`, `NEWSLETTER_JID`, …) optionally wrapped in `WASmaxAttrs.OPTIONAL(coercer, val)` / `OPTIONAL_LITERAL(lit, cond)`. The sentinel `DROP_ATTR` drops an attribute at send time. |
| `WASmaxIn*Response*` | response parser — uses the `WASmaxParseUtils.*` primitives (`assertTag`, `attrString`, `attrInt`, `attrIntRange`, `attrStringEnum`, `optionalChildWithTag`, `mapChildrenWithTag(...,min,max,...)`, `contentString`, `contentBytes`, …) to decode the server response. |
| `WASmax*RPC` | binding — imports one Out + N In parsers, sends via `WAComms.sendSmaxStanza`, returns the first parser variant whose `.success` is true (typically `Success` / `Ack`/`Nack` / `ClientError` / `ServerError`). |

This extractor walks every `WASmax*RPC` module across the daily WA Web
bundle and reconstructs the request schema + every response variant's schema
as a tree of nodes. Mixin wrappers (`*BaseIQ<Type>RequestMixin`, etc.) are
followed to recover the iq attrs they inject (`id: generateId()`, `type:
"get"|"set"`).

### Non-IQ stanzas (server-initiated, imperative dispatch)

Everything else the client *receives* — `receipt`, `notification`,
`chatstate`, `presence`, `ib`, `stream:error`, `success`, `failure`,
`call`, `error`, `xmlstreamend` — is routed through the dispatch table at
`WAWebCommsHandleLoggedInStanza`. The outer switch keys on the stanza's
root tag; `receipt` + `notification` have a nested switch on the `type`
attribute that fans out into ~25 handler modules.

Each handler is a function exported from a `WAWebHandle*` module. Three
parsing styles in the wild:

| Style | Recognition |
|---|---|
| `WADeprecatedWapParser` factory at module top | scanned first — its callback is the canonical parse fn |
| Inline ParsableWapNode method chain in the exported handler | walked via `.attrString` / `.maybeChild` / `.forEachChildWithTag` recognition |
| Delegation to a Smax `receive*RPC` | recorded as `delegatesToRPC` — schema lives in `WA_XML_OPERATIONS` |

## What's published

| File | Format | Use case |
|---|---|---|
| `index.js` | CommonJS | Runtime `WA_XML_OPERATIONS` + `WA_XML_STANZAS` — frozen per-op summaries + the non-IQ dispatch table |
| `index.d.ts` | TS declarations | Per-op literal-typed request + response trees, per-stanza tree types, and the umbrella maps |

A raw IR file (`index.json`) is also produced by the extractor with the
fully decoded trees — see
[`packages/xml/index.json`](https://github.com/vinikjkkj/wa-spec/blob/master/packages/xml/index.json)
for non-TS consumers (diff tools, codegen, other languages).

### IR node shape

```jsonc
{
  "tag": "iq",
  "attrs": {
    "<name>": {
      "type": "literal" | "string" | "int" | "longInt" | "bool" | "bytes"
            | "jid" | "userJid" | "deviceJid" | "groupJid" | "newsletterJid"
            | "broadcastJid" | "callJid" | "phoneUserJid" | "lidUserJid"
            | "phoneDeviceJid" | "lidDeviceJid" | "stanzaId" | "smaxId"
            | "callId" | "enum" | "unknown",
      "optional"?: true,        // attr may be absent (`OPTIONAL(...)` / parser `optional(...)`)
      "value"?: "...",          // literal value (type: "literal")
      "enumRef"?: "...",        // identifier of the enum map (type: "enum") — kept for traceability
      "enumValues"?: ["a","b"], // resolved enum value set (type: "enum") — inlined by the post-pass resolver
      "generated"?: true,       // request-side: client-generated stanza id
      "arg"?: "..."             // request-side: parameter name the value came from
    }
  },
  "children": [ /* recursive */ ],
  "content"?: {                 // leaf-level binary/text content (no children)
    "type": "string" | "bytes" | "int" | "enum",
    "optional"?: true,
    "min"?: 0, "max"?: 1024
  },
  "min"?: 0, "max"?: 19999      // child-level cardinality (set by mapChildrenWithTag / WASmaxChildren.*)
}
```

`appliedMixin` and `__helper` annotations are present in `index.json` when a
node was assembled from a mixin merge or a `WASmaxChildren.REPEATED_CHILD` /
`OPTIONAL_CHILD` helper. Some complex builders are still emitted as
`{ "__unknown": "<source snippet>" }` — these are surfaced for visibility and
will narrow as more helpers get recognised.

## Coverage

From the latest bundle — **100% of recognised stanzas decoded** (every
`WASmax*RPC` registration AND every entry in
`WAWebCommsHandleLoggedInStanza` + `WAWebCommsHandleMessagingStanza`'s
dispatch table accounted for; no `unknown` attrs / children remain).

**IQ operations:**

- **121 RPC operations** (every `WASmax*RPC` registration — both
  client-initiated `send*RPC` AND server-initiated `receive*RPC`)
- **102 request trees** + **incoming-stanza parsers** (the receive-RPCs
  carry their inbound parser as a `WASmaxIn*Request` dep — treated as a
  sole response variant named `Request`)
- **285 response + incoming trees** decoded across `Success` / `Ack` /
  `Nack` / `ClientError` / `ServerError` / `Error` / `Request` variants
- **3541 typed attributes** + **1281 nested child entries** + **325 content
  leaves** with concrete types (`string`, `int`, `longInt`, `bytes`, `jid`,
  `userJid`, `lidUserJid`, `deviceJid`, `groupJid`, `newsletterJid`,
  `broadcastJid`, `callJid`, `stanzaId`, `callId`, `enum`, `literal`)
- **89/89 enum value sets resolved** in-place — every `attrStringEnum` /
  `attrEnum` / `contentStringEnum` reference traces back to its module-level
  table (Smax `WASmaxIn*Enums`, handler-side `Common`, or wrapped
  `$InternalEnum` / `$Mirrored` factory) and surfaces as a concrete
  `enumValues: ["a","b",…]` array next to `enumRef`
- **Disjunction unions** (`presence` has 5 variants, `chatstate` has
  several mutually-exclusive state types) captured via the `errorMixinDisjunction`
  pattern — sibling parsers' attrs are merged onto the same node and
  marked optional, with `__variants: [...]` listing the discriminator names
- **Three parser helpers honoured**: `WASmaxParseUtils` (generic),
  `WASmaxParseJid` (typed JID accessors), `WASmaxParseReference` (path
  walking) — schemas from all three contribute to the same tree
- **34 unique xmlns** namespaces represented (`abt`, `bot`, `blocklist`,
  `disappearing_mode`, `encrypt`, `fb:thrift_iq`, `md`, `newsletter`,
  `optoutlist`, `passive`, `privacy`, `privatestats`, `spam`, `status`,
  `tos`, `usync`, `urn:xmpp:whatsapp:account`, `urn:xmpp:whatsapp:push`,
  `waffle`, `w:biz` (+ sub-namespaces), `w:comms`, `w:g2`, `w:m`, `w:mex`,
  `w:p`, `w:pay`, `w:profile:picture`, `w:stats`, `w:sync:app:state`)

**Non-IQ stanzas:**

- **13 root tags** dispatched (`receipt`, `notification`, `chatstate`,
  `presence`, `ib`, `stream:error`, `failure`, `success`, `call`, `error`,
  `xmlstreamend`, `message`, `status`)
- **37 sub-variants** under `receipt.type` + `notification.type` +
  `message.condition`
- **46 handler trees** extracted directly (full attrs + children +
  content) — the OO walker handles ParsableWapNode methods, raw
  `e.attrs.*` / `e.content` access, lexically-scoped iterator callbacks,
  helper-function inlining with multi-arg call-site matching (so handlers
  that pass the stanza as 2nd arg — `p(r, e)` — get correctly walked),
  AND constant-string resolution (`forEachChildWithTag(o("X").INFO_TYPE.DIRTY, …)`
  traces the `Object.freeze({DIRTY:"dirty",…})` back to its literal)
- **Cross-module parser delegation** auto-inlined: handlers that delegate
  to `WAWebParse*` / `WAWeb*Parser` / `WAWebCommonParsers*` modules (named-
  accessor `.parseXxx(arg)` OR default-callable `r("M")(arg)`) get the
  delegated parser's attrs/children merged onto the right scope var, with
  rebinding-aware target resolution (an `l` reassigned across if-branches
  to `e.child("remove")` then `e.child("verified_name")` correctly attaches
  each parser's tree to its own synthetic child)
- **Multi-delegate Smax handlers** auto-inlined from `WA_XML_OPERATIONS`:
  `chatstate`, `presence`, `notification/newsletter`, `notification/psa/{surfaces,reset_smb_*}`,
  `notification/w:gp2`, `status`, `message/from-is-newsletter` get the
  Smax-RPC schema grafted; multi-RPC delegates (`link_code_companion_reg`,
  `hosted`) get the union under `__unionOfDelegates`. The original
  `delegatesToRPC` ref is preserved for traceability.
- **Dangling incoming RPC grafting**: `notification/business` children
  (`ctwa_suggestion`, `mm_campaign`, `wa_ad_account_nonce`, `privacy`) +
  `ib/client_expiration` — handler-side stubs grafted from their orphan
  `WASmaxIn*RPC` schemas.
- **1 handler** flagged as `noSchema: true` (`xmlstreamend` — server
  stream-close marker, intentionally just logs + acks; no payload to parse)
- **Per-variant `type` discriminators auto-pinned** as literal attrs —
  every `notification`/`receipt` variant carries `type: { type: "literal",
  value: "<variant>" }` even when the handler doesn't `assertAttr` it
  explicitly (the dispatch case guarantees the wire value)
- **Raw-attr-access type inference** — when a handler walks the stanza
  manually (`e.attrs.id` / `e.attrs.from` without ParsableWapNode), known
  attr names (`id`, `from`, `to`, `participant`, `t`, `timestamp`,
  `count`, …) get typed correctly instead of falling back to `string`
- **261 typed attributes** + **102 nested children** + **14/14 enums
  resolved** across the non-IQ trees

**No remaining gaps.** Zero `unknown` attrs, zero `unknown` children, zero
empty trees, zero unresolved parser refs, zero tagless nodes, every enum
reference resolved (**134/134** across both phases), every dispatch handler
accounted for. The only structural "leftovers" are by design:
- **18 ops** with no request module — server-initiated `receive*RPC`s
  that the client only ever parses (their schema is the sole
  `responses[0]` with `variant: "Request"`)
- **1 stanza** flagged `noSchema: true` — `xmlstreamend`, a server
  stream-close marker that only logs

## Generate locally

```sh
npx wa-fetcher --out dump/                  # download bundles
npx wa-xml apply --bundles dump/raw/<version>/
```

## Caveats

- **Non-IQ schemas are best-effort field-observation, not strict specs.**
  The `WAWebHandle*` family is imperative — control flow can gate fields
  conditionally — so the per-handler tree captures *every field the parser
  is observed to read*. Practical reading: required vs optional matches
  the `attrX` vs `maybeAttrX` accessor used; cardinality on child lists is
  inferred from `forEachChildWithTag`/`mapChildrenWithTag` patterns; helper
  functions called with the stanza var get inlined so their attr reads
  surface on the parent. Use IQ schemas (Phase 1) when you need strict.
- **No wire-sample cross-check.** Unlike `@vinikjkkj/wa-mex`, this package
  does not validate schemas against real captured stanzas — `dump/
  wire-samples/captures.json` only holds GraphQL captures today. Static
  inference is exact for tag/attrs/cardinality but conservative for enum
  value sets (only what the client compares against explicitly is observable).
- **`appliedMixin` is a list when multiple mixins compose on the same node.**
  `WASmaxMixins.optionalMerge(<mergeFn>, <base>, <cond>)` adds the merged
  mixin as a conditional entry (suffixed `?`) so consumers can tell which
  contributions are gated by a runtime condition.
- **`delegatesToRPC` handlers don't carry an inline tree** — they point at
  the corresponding `WASmax*RPC.receive*RPC` (single object) OR an array
  of RPCs (when the handler dispatches by sub-attribute, e.g.
  `link_code_companion_reg` branches on `stage` to two RPCs). The
  structural schema lives in `WA_XML_OPERATIONS`.

## Roadmap

- Sample-based wire validation once a stanza capture pipeline lands in
  the fetcher.

Daily-extracted by [wa-spec](https://github.com/vinikjkkj/wa-spec).
