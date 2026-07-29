# @vinikjkkj/wa-abprops

WhatsApp Web AB props (server-driven experiment configs) — the numeric config
code each prop travels under, its wire value type, its client-side default and
its internal-build debug default. Everything is daily-extracted directly from
the minified `WAWebABPropsConfigs` / `WAWebGroupABPropsConfigs` tables in WA
Web bundles.

```sh
npm i @vinikjkkj/wa-abprops
```

```ts
import {
    WA_ABPROPS,
    WA_GROUP_ABPROPS,
    WA_ABPROPS_BY_CODE,             // reverse map: 6939 → 'adv_accept_hosted_devices'
    WA_GROUP_ABPROPS_BY_CODE,
    WA_ABPROPS_USED_BEFORE_INIT,    // readable before the config cache resolves
    WA_ABPROPS_SPECIAL_EARLY        // mirrored into localStorage for pre-DB startup code
} from '@vinikjkkj/wa-abprops'
import type {
    WaAbPropName,
    WaGroupAbPropName,
    WaAbProp,
    WaAbPropType,
    WaAbPropValueByName
} from '@vinikjkkj/wa-abprops'

WA_ABPROPS.web_image_max_edge
// → { code: 3042, type: 'int', defaultValue: 1600, debugDefaultValue: 1600 }

WA_ABPROPS.adv_accept_hosted_devices
// → { code: 6939, type: 'bool', defaultValue: false, debugDefaultValue: true }
//   defaultValue ≠ debugDefaultValue → shipped off, on for internal builds

WA_ABPROPS.a2ui_supported_elements
// → {
//     code: 32276,
//     type: 'string',
//     defaultValue: 'info_card, list_card',
//     debugDefaultValue: 'info_card, list_card'
//   }

WA_GROUP_ABPROPS.group_history_messages_time_limit_secs_group_level
// → { code: 26270, type: 'int', defaultValue: 1209600, debugDefaultValue: 1209600 }

WA_ABPROPS_SPECIAL_EARLY
// → {
//     localStorageKey: 'abprops_needed_early',
//     props: ['wa_web_favicons_update_m1', 'web_ui_refresh_m1', …]
//   }
```

## Decoding a server response

The `abt` IQ hands back rows of `{ configCode, configValue, configExpoKey }`
where `configValue` is *always* a string. This package gives you both halves
of the decode: the code → name mapping and the type to parse with.

```ts
import { WA_ABPROPS, WA_ABPROPS_BY_CODE } from '@vinikjkkj/wa-abprops'

function parseConfigValue(raw: string, type: WaAbPropType, fallback: unknown) {
    if (raw == null) return fallback
    if (type === 'bool') return raw === '1' || raw === 'true' || raw === 'True'
    if (type === 'int') return parseInt(raw, 10)
    if (type === 'float') return parseFloat(raw)
    return raw
}

function decode(rows: Array<{ configCode: string; configValue: string }>) {
    const out: Record<string, unknown> = {}
    for (const row of rows) {
        const name = WA_ABPROPS_BY_CODE[Number(row.configCode) as keyof typeof WA_ABPROPS_BY_CODE]
        if (name == null) continue // prop the client build doesn't know yet
        const prop = WA_ABPROPS[name]
        out[name] = parseConfigValue(row.configValue, prop.type, prop.defaultValue)
    }
    return out
}
```

Props the server never sent keep their `defaultValue` — that is exactly what
`WAWebABProps.getABPropConfigValue` does when the cache misses.

## Typed lookups

Every prop is emitted with literal types, so `WaAbPropValueByName<K>` resolves
a prop's decoded JS type from its declared wire type:

```ts
import type { WaAbPropValueByName } from '@vinikjkkj/wa-abprops'

type MaxEdge = WaAbPropValueByName<'web_image_max_edge'>          // → number
type Hosted = WaAbPropValueByName<'adv_accept_hosted_devices'>    // → boolean
type Elements = WaAbPropValueByName<'a2ui_supported_elements'>    // → string

function getAbProp<K extends WaAbPropName>(name: K): WaAbPropValueByName<K> {
    // …your cache lookup, falling back to WA_ABPROPS[name].defaultValue
}

getAbProp('web_image_max_edge')       // ✓ number
getAbProp('web_image_max_edg')        // ✗ caught at compile time
```

The `code` and both default values are literal types too, so
`WA_ABPROPS.adv_accept_hosted_devices.code` narrows to `6939` rather than
`number`.

## What's in here

Nearly every feature in WA Web sits behind an AB prop. The client ships the
full catalogue as a flat data table and asks the server, at connect, for the
values it should use:

```js
// from WAWebABPropsConfigs — <name>: [configCode, type, default, debugDefault]
var e = {
    adv_accept_hosted_devices:  [6939,  'bool',   false, true],
    web_image_max_edge:         [3042,  'int',    1600,  1600],
    a2ui_supported_elements:    [32276, 'string', 'info_card, list_card', 'info_card, list_card'],
    // …2000+ more
}
i.ABPropConfigs = e
```

Each entry boils down to:

- a **config code** (`6939`) — the *only* identity that travels on the wire.
  The IQ (`WASmaxAbPropsGetExperimentConfigRPC`) returns rows keyed by code,
  and the local `abpropConfigs` table uses it as its primary key. Prop names
  never leave the client, which is why the reverse map matters.
- a **name** (`adv_accept_hosted_devices`) — the handle every
  `getABPropConfigValue('…')` call site uses
- a **type** — `bool` | `int` | `float` | `string`. The server's
  `configValue` is always a string; this drives
  `WAWebABPropsParseConfigValue.parseConfigValue`.
- a **default value** — used whenever the server hasn't pushed a value for
  this code (cache miss, offline, brand-new prop)
- a **debug default value** — substituted for the default only on internal
  builds (gkx 26259 on *and* the account joined the internal beta;
  `WAWebABPropsUpdateFromStorage` logs *"intern beta joined, using DEBUG
  defaults"*). It's identical to the default for most props — where the two
  differ, the debug value is a decent signal of where the rollout is headed.

Group-scoped props live in a parallel table (`WAWebGroupABPropsConfigs`),
fetched per group jid via the group experiment config IQ and cached separately.

Two auxiliary lists ship alongside:

- **`WA_ABPROPS_USED_BEFORE_INIT`** — the allowlist of props the runtime
  tolerates reading before the config cache resolves. Everything else logs
  *"impl must be set before first access"* and silently yields the default.
- **`WA_ABPROPS_SPECIAL_EARLY`** — the handful of props mirrored into
  `localStorage` (as a JSON object under `abprops_needed_early`) so startup
  code can consult them before IndexedDB opens.

This package gives you the static metadata for all **2100+ user props** +
**14 group props**, so you can decode an `abt` response, mirror WA Web's
gating decisions, or diff a build's rollout state without transcribing the
client's table by hand.

## What's published

| File | Format | Use case |
|---|---|---|
| `index.js` | CommonJS | Runtime `WA_ABPROPS` / `WA_GROUP_ABPROPS` / `WA_ABPROPS_BY_CODE` / `WA_GROUP_ABPROPS_BY_CODE` / `WA_ABPROPS_USED_BEFORE_INIT` / `WA_ABPROPS_SPECIAL_EARLY` frozen tables |
| `index.d.ts` | TS declarations | Per-prop literal-typed entries + the umbrella maps + the `WaAbPropValueByName<K>` helper |

A raw IR file (`index.json`) is also produced — see
[`packages/abprops/index.json`](https://github.com/vinikjkkj/wa-spec/blob/master/packages/abprops/index.json)
for non-TS consumers (diff tools, codegen, other languages).

`index.json` shape:

```jsonc
{
  "waVersion": "2.3000.xxxxx",
  "propCount": 2117,
  "groupPropCount": 14,
  "usedBeforeInitialization": ["direct_connection_business_numbers", …],
  "specialEarlyProps": {
    "localStorageKey": "abprops_needed_early",
    "props": ["wa_web_favicons_update_m1", "web_ui_refresh_m1", …]
  },
  "props": {
    "adv_accept_hosted_devices": {
      "code": 6939,
      "type": "bool",
      "defaultValue": false,
      "debugDefaultValue": true
    },
    …
  },
  "groupProps": {
    "group_history_messages_time_limit_secs_group_level": {
      "code": 26270,
      "type": "int",
      "defaultValue": 1209600,
      "debugDefaultValue": 1209600
    },
    …
  }
}
```

## Gotchas

- **Names are client-only.** A code with no entry in `WA_ABPROPS_BY_CODE` is
  a prop the server knows about but this build doesn't — skip it rather than
  guessing. The runtime does the same (it warns and drops the row).
- **Defaults are not "off".** Plenty of props default to a non-trivial int or
  string; treating a missing value as `false` will diverge from the client.
- **`debugDefaultValue` is not what you'll be served.** It only applies to
  internal builds. Use `defaultValue` when modelling a normal client.
- **Codes are stable, values are not.** A prop's `code` persists across
  builds; its defaults change freely, and props are added and removed every
  release. Diff `index.json` between versions to see the movement.
- **Group props are a separate namespace.** `WA_GROUP_ABPROPS` codes come
  from their own table and are not interchangeable with user-level codes.

Daily-extracted by [wa-spec](https://github.com/vinikjkkj/wa-spec).
