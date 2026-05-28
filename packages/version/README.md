# @vinikjkkj/wa-version

The WhatsApp Web version string the rest of `wa-spec` was extracted from,
shipped as a tiny standalone package so consumers can pin their handshake
/ WAM event-version / pairing-flow checks to the same build without having
to install (or load at runtime) any of the larger schema packages.

```sh
npm i @vinikjkkj/wa-version
```

```ts
import { WA_VERSION } from '@vinikjkkj/wa-version'

console.log(WA_VERSION) // → '2.3000.1040208462'
```

Or via CommonJS:

```js
const { WA_VERSION } = require('@vinikjkkj/wa-version')
```

The same value is also available as JSON if you'd rather not load JS:

```js
const { waWeb } = require('@vinikjkkj/wa-version/version.json')
```

## How it works

`@vinikjkkj/wa-version` is generated daily by the
[`wa-spec`](https://github.com/vinikjkkj/wa-spec) workflow. Every WA Web
bundle drop bumps the version, regenerates this package, and republishes
to npm. The package version mirrors `2.3000.<build>-<sha>` so
`npm view @vinikjkkj/wa-version version` always reflects the latest WA
Web release wa-spec has seen.

## Generate locally

```sh
npx wa-fetcher --out dump/                              # download bundles
node packages/version/scripts/apply.cjs --manifest dump/manifest.json
```
