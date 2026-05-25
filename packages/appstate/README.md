# @vinikjkkj/wa-appstate

WhatsApp Web AppState (Syncd) action schemas — wire names, collections,
versions, value fields, and index shapes for every multi-device sync action.

```sh
npm i @vinikjkkj/wa-appstate
```

```ts
import { WA_APPSTATE_SCHEMAS, WA_APPSTATE_COLLECTIONS } from '@vinikjkkj/wa-appstate'
import type {
    WaAppstateSchema,
    WaAppstateActionKey,
    WaAppstateCollection,
    WaAppstateScope,
    WaAppstateIndexValueOf,
    WaAppstateIndexArgs
} from '@vinikjkkj/wa-appstate'

WA_APPSTATE_SCHEMAS.Mute
// → {
//     name: 'mute',
//     collection: 'regular_high',
//     version: 2,
//     scope: 'chat',
//     valueField: 'muteAction',
//     valueProtoType: 'SyncActionValue.MuteAction',
//     indexParts: [
//       { type: 'literal', value: 'mute' },
//       { type: 'jid', name: 'chatJid' }
//     ]
//   }
```

## Resolving value types against `@vinikjkkj/wa-proto`

Each schema carries `valueProtoType` — a dotted path to the value's
protobuf message inside `waproto`. Use a tiny `GetByPath` helper to
resolve the literal string into a real TS type:

```ts
import { waproto } from '@vinikjkkj/wa-proto'
import { WA_APPSTATE_SCHEMAS, type WaAppstateActionKey } from '@vinikjkkj/wa-appstate'

type GetByPath<T, P extends string> =
    P extends `${infer Head}.${infer Tail}`
        ? Head extends keyof T
            ? GetByPath<T[Head], Tail>
            : never
        : P extends keyof T
            ? T[P]
            : never

type WaAppstateValueOf<K extends WaAppstateActionKey> =
    (typeof WA_APPSTATE_SCHEMAS)[K]['valueProtoType'] extends infer P
        ? P extends string
            ? GetByPath<typeof waproto, P>
            : null
        : never

// Nested under SyncActionValue
type MuteValue = WaAppstateValueOf<'Mute'>
//    ^? waproto.SyncActionValue.MuteAction

type StatusPrivacyValue = WaAppstateValueOf<'StatusPrivacy'>
//    ^? waproto.SyncActionValue.StatusPrivacyAction
//      (gives access to .mode: StatusDistributionMode, .userJid, .modes, ...)

// Top-level types
type ChatLockSettingsValue = WaAppstateValueOf<'ChatLockSettings'>
//    ^? waproto.ChatLockSettings

// Handlers with no value payload (ai_thread_delete, marketingMessageBroadcast,
// shareOwnPn) have valueProtoType: null
type AiThreadDeleteValue = WaAppstateValueOf<'AiThreadDelete'>
//    ^? null
```

### Enum fields inside the value

`valueProtoType` gives you the message type. To surface enum-typed fields
as string-literal unions (so consumers pass `mode: 'CONTACTS'` instead of
the magic integer `2`), each schema also carries `valueEnumFields` — a
flat map from dotted field path to the enum's proto path (relative to
`waproto.SyncActionValue`). Nested message fields show up with `.`-joined
paths (e.g. `callLog.value.callLogRecord.callType`).

```ts
WA_APPSTATE_SCHEMAS.StatusPrivacy.valueEnumFields
// → { mode:  'StatusPrivacyAction.StatusDistributionMode',
//     modes: 'StatusPrivacyAction.StatusDistributionMode' }

WA_APPSTATE_SCHEMAS.CallLog.valueEnumFields
// → { 'callLogRecord.callType':                'CallLogRecord.CallType',
//     'callLogRecord.callResult':              'CallLogRecord.CallResult',
//     'callLogRecord.silenceReason':           'CallLogRecord.SilenceReason',
//     'callLogRecord.participants.callResult': 'CallLogRecord.CallResult' }

WA_APPSTATE_SCHEMAS.Mute.valueEnumFields  // → null  (no enum fields in MuteAction)
```

A typed mutation API can then map each path back to its enum union via
`GetByPath<typeof waproto.SyncActionValue, ...>` and substitute that union
into the value type. The exact shape depends on your mutation interface
(deep replace vs. flat key→union map); the IR exposes both halves so any
strategy is consumer-side typing only.

## Derived helpers — typed encoders/decoders

`indexParts` is a discriminated-union tuple, so `type` narrows the shape
(`literal` carries `value`, every other variant carries `name`). Two
helpers turn that tuple into the types you actually want to use:

```ts
// Wire-level value tuple: what you'd serialise on the index
type MuteWire = WaAppstateIndexValueOf<typeof WA_APPSTATE_SCHEMAS.Mute>
// → readonly ['mute', string]

type StarWire = WaAppstateIndexValueOf<typeof WA_APPSTATE_SCHEMAS.Star>
// → readonly ['star', string, string, '0' | '1', string]

// Named args object: what a typed builder would accept
type MuteArgs = WaAppstateIndexArgs<'Mute'>
// → { readonly chatJid: string }

type StarArgs = WaAppstateIndexArgs<'Star'>
// → { readonly remote: string; readonly id: string; readonly fromMe: boolean; readonly participant: string | null }
```

So a fully typed index builder is one declaration:

```ts
function buildIndex<K extends WaAppstateActionKey>(
    key: K,
    args: WaAppstateIndexArgs<K>
): WaAppstateIndexValueOf<typeof WA_APPSTATE_SCHEMAS[K]> {
    // ...your encoder here
}

buildIndex('Mute', { chatJid: '5511@c.us' })                                  // ✓
buildIndex('Mute', { chatJld: '5511@c.us' })                                  // ✗ typo caught
buildIndex('Star', { remote: 'r', id: 'i', fromMe: true, participant: null }) // ✓
```

## Wire format

The full index that travels on the bus is the **JSON-stringified** tuple,
not the array itself:

```ts
const tuple = ['mute', '5511@c.us']
const wireIndex = JSON.stringify(tuple)   // '["mute","5511@c.us"]'
```

`WaAppstateIndexValueOf<S>` gives you the array. Stringify before sending,
`JSON.parse` after receiving. See `WAWebSyncdActionUtils.buildIndex` /
`parseIndex` in the WA Web source for the canonical encoder/decoder.

A few wire-format quirks the types capture:

- **`fromMe` is `'0'` or `'1'`**, not `true`/`false` — `boolString` slots
  widen to `'0' | '1'` in `WaAppstateIndexValueOf`; the args object lets
  you pass a JS `boolean` and your encoder converts.
- **`participant` is a JID *or* the literal `'0'`** — when `fromMe` is
  true or the participant is null, slot 4 of message-scoped indices is
  emitted as the string `'0'`. The args object accepts `string | null`
  (`null` → `'0'`); the wire type is plain `string`.
- **All other slots are plain JID/string** — `wid` and `jid` aren't
  distinguished on the wire; both come out of `.toString({legacy:true})`.
- **Some slots are protobuf enums on the wire** — currently only the two
  `settings_sync` slots (`settingPlatform`, `settingKey`). Their IR entries
  carry `type: 'enum'` plus `protoEnum: '<Path>'` pointing at the enum's
  nested name inside `SyncActionValue` (e.g. `SettingsSyncAction.SettingKey`).
  Cross-reference with [`@vinikjkkj/wa-proto`](https://www.npmjs.com/package/@vinikjkkj/wa-proto)
  to get the enum's value set.

## What's in here

WhatsApp Web's *AppState* (server-side: *Syncd*) is the multi-device
CRDT-style protocol that syncs small per-account mutations — mute, pin,
archive, contact, star, label, settings, etc. — across the primary
device and every linked client.

Each mutation on the wire is:

- an **action wire name** (`mute`, `pin_v1`, `setting_pushName`, …) — the
  server keys mutations by this
- a **collection** (one of `regular`, `regular_low`, `regular_high`,
  `critical_block`, `critical_unblock_low`) — controls sync priority and
  whether the client must catch up before usable state
- a **version** — bumped when the collection's *index shape* changes;
  receivers reject older versions
- an **index tuple** — `[name, ...]`. Rest depends on scope (e.g.
  `[name, chatJid]` for chat-scoped actions, `[name, remote, id, fromMe,
  participant]` for message-scoped)
- a **value** carried inside a `SyncActionValue` oneOf field (e.g.
  `muteAction: MuteAction`) — the protobuf payload lives in
  [`@vinikjkkj/wa-proto`](https://www.npmjs.com/package/@vinikjkkj/wa-proto)

This package gives you the static metadata for all 65+ action handlers,
so you can build wire-level encoders/decoders or replay mutations without
manually transcribing the client's handler registry.

## What's published

| File | Format | Use case |
|---|---|---|
| `index.js` | CommonJS | Runtime `WA_APPSTATE_SCHEMAS` + `WA_APPSTATE_COLLECTIONS` frozen tables |
| `index.d.ts` | TS declarations | Per-action literal-typed schemas + the umbrella maps |

A raw IR file (`index.json`) is also produced by the extractor — see the
repo's [`packages/appstate/index.json`](https://github.com/vinikjkkj/wa-spec/blob/master/packages/appstate/index.json)
for non-TS consumers (diff tools, codegen, other languages).

`index.json` shape:

```jsonc
{
  "waVersion": "2.3000.xxxxx",
  "collections": ["regular", "regular_low", "regular_high", "critical_block", "critical_unblock_low"],
  "actions": {
    "Mute": {
      "module": "WAWebMuteChatSync",
      "name": "mute",
      "collection": "regular_high",
      "version": 2,
      "scope": "chat",
      "baseClass": "ChatSyncdActionBase",
      "valueField": "muteAction",
      "chatJidIndex": 1,
      "indexParts": [
        { "type": "literal", "value": "mute" },
        { "type": "jid", "name": "chatJid" }
      ]
    }
  }
}
```

## Scopes

Each handler extends one of five base classes from `WAWebSyncdAction`,
which dictates the index shape:

| Scope | Index shape | Examples |
|---|---|---|
| `account` | `[name]` or `[name, opaqueId]` | `setting_pushName`, `time_format`, `label_edit`, `deviceAgent` |
| `chat` | `[name, chatJid]` | `mute`, `pin_v1`, `clearChat`, `lock` |
| `chatOrContact` | `[name, ...]` — typically `[name, labelId, chatJid]` | `label_jid` |
| `message` | `[name, remote, id, fromMe, participant]` | `star`, `deleteMessageForMe` |
| `chatMessageRange` | `[name, chatJid]` (message range carried in `value`) | `archive`, `markChatAsRead` |

## Generate locally

```sh
npx wa-fetcher --out dump/                  # download bundles
npx wa-appstate apply --bundles dump/raw/<version>/
```

## Caveats

- **`valueField: null` means the handler doesn't read from the protobuf
  value.** A handful of actions (e.g. `ai_thread_delete`, `shareOwnPn`,
  `marketingMessageBroadcast`) ignore the value entirely — the wire
  mutation is index-only. The `SyncActionValue` oneOf field may still
  exist in the protobuf; check [`@vinikjkkj/wa-proto`](https://www.npmjs.com/package/@vinikjkkj/wa-proto)
  if you need the encoder/decoder.
- **Slot names beyond `action` / `chatJid` / message-key tuples are
  generic (`key1`, `key2`, …).** The minified handler doesn't carry
  human-readable parameter names; we tag what we can recognise from the
  scope's base class and fall back to positional names. The encoded
  value is still correct — only the *label* is generic.
- **Slot 0 is always the action wire name itself** — the client prepends
  it to the indexArgs array before computing the index hash.
- **The handler registry is `WAWebCollectionHandlerActions`.** Anything
  added or removed in WA Web shows up here on the next daily extract.

Daily-extracted by [wa-spec](https://github.com/vinikjkkj/wa-spec).
