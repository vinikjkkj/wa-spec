# @vinikjkkj/wa-proto

WhatsApp Web protobuf definitions — daily-extracted SDL + compiled
JS/TS bindings (via [protobufjs](https://github.com/protobufjs/protobuf.js)).

```sh
npm i @vinikjkkj/wa-proto
```

```ts
import { waproto } from '@vinikjkkj/wa-proto'

const msg = waproto.Message.create({ conversation: 'hi' })
const bytes = waproto.Message.encode(msg).finish()
const parsed = waproto.Message.decode(bytes)
```

## What's exported

- `WAProto.proto` — single proto3 SDL file with every message + enum
- `dist/index.js` — protobufjs `static-module` output (CommonJS, no parser at runtime)
- `dist/index.d.ts` — TypeScript declarations matching the JS module

All messages live under `package waproto`; nested messages and enums are
declared inside their parent. Field labels are `optional` (proto3 field
presence) or `repeated` (with `[packed=true]` when the runtime flag was set).

## Generate locally

```sh
npx wa-fetcher --out dump/                       # download raw bundles
npx wa-proto apply --bundles dump/raw/<version>/ # extract → WAProto.proto
npm run compile --workspace @vinikjkkj/wa-proto  # pbjs/pbts → dist/
```

## How extraction works (no deps, no runtime)

1. Scan every `__d("WAWebProtobufsX.pb", ...)` registration in the bundle texts
2. Within each factory body, identify aliases for `$InternalEnum` and `WAProtoConst`
3. Parse local-var bindings:
   - `var X = s({KEY:0, ...})` — enum literal (where `s` is the InternalEnum alias)
   - `var Y = {}; Y.name = "Foo"; Y.internalSpec = {...}` — message definition
4. Parse each field descriptor `[tag, typeExpression, ref?]` and decode the
   type byte (low 6 bits = primitive, bit 64 = REPEATED, bit 128 = PACKED, bit 256 = REQUIRED)
5. Resolve refs across modules via the dep array + `<alias>.<ExportKey>` syntax
6. Emit `WAProto.proto` proto3 SDL with nested messages/enums under their parent

## Caveats

- **Some cross-module refs may be unresolved** if the referenced `.pb` module
  isn't loaded in the bundle dump (lazy-loaded chunks). These surface as
  `UNKNOWN` types in the output — refresh the dump with full auth state to
  catch them.
- **Numbers use `long`** — `protobufjs` returns `Long` instances for `int64` /
  `uint64` etc. Make sure to install `long` (already a dep here) and either
  `.toNumber()` (lossy for >2^53) or `.toString()`.
- **Format matches [`@wppconnect/wa-proto`](https://github.com/wppconnect-team/wa-proto)**
  for drop-in compatibility — same `package waproto`, same proto3 syntax,
  same `pbjs`/`pbts` toolchain.

Daily-extracted by [wa-spec](https://github.com/vinikjkkj/wa-spec).
