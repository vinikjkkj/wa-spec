// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: 2.3000.1043969568

export type WaAppstateCollection = string

export type WaAppstateScope =
    | 'account'
    | 'chat'
    | 'chatOrContact'
    | 'message'
    | 'chatMessageRange'

// Discriminated union — `type` narrows the shape:
//   - 'literal'    fixed `value` (the action wire name, position 0)
//   - 'jid'        WhatsApp JID string (`<user>@<domain>`, legacy-encoded)
//   - 'boolString' '0' or '1' — WA's mutation-index bool encoding
//   - 'jidOrZero'  participant slot in message scope — JID, or literal '0'
//                  when fromMe is true or participant is null
//   - 'enum'       stringified protobuf-enum integer; `protoEnum` is the
//                  enum's nested path inside SyncActionValue (e.g.
//                  `SettingsSyncAction.SettingKey`), look it up in
//                  @vinikjkkj/wa-proto for the value set.
//   - 'string'     opaque identifier (msg id, label id, agent id, etc.)
//   - 'unknown'    unrecognised slot (fallback)
export type WaAppstateIndexPart =
    | { readonly type: 'literal'; readonly value: string }
    | { readonly type: 'jid'; readonly name: string }
    | { readonly type: 'boolString'; readonly name: string }
    | { readonly type: 'jidOrZero'; readonly name: string }
    | { readonly type: 'enum'; readonly name: string; readonly protoEnum: string }
    | { readonly type: 'string'; readonly name: string }
    | { readonly type: 'unknown'; readonly name: string }

export type WaAppstateValueEnumFields = Readonly<Record<string, string>>

export interface WaAppstateSchema<
    Name extends string = string,
    Collection extends WaAppstateCollection = WaAppstateCollection,
    Scope extends WaAppstateScope = WaAppstateScope,
    ValueField extends string | null = string | null,
    ValueProtoType extends string | null = string | null,
    ValueEnumFields extends WaAppstateValueEnumFields | null = WaAppstateValueEnumFields | null,
    IndexParts extends ReadonlyArray<WaAppstateIndexPart> = ReadonlyArray<WaAppstateIndexPart>
> {
    readonly name: Name
    readonly collection: Collection
    readonly version: number
    readonly scope: Scope
    readonly valueField: ValueField
    // Dotted path to the value's protobuf message inside @vinikjkkj/wa-proto's
    // `waproto` namespace. Nested types under SyncActionValue read as
    // `SyncActionValue.<X>` (most actions); top-level types (e.g.
    // `ChatLockSettings`, `DeviceCapabilities`) read as just `<X>`.
    // Resolve with a `GetByPath`-style helper to obtain the typed value.
    readonly valueProtoType: ValueProtoType
    // For every enum-typed field inside the value message, a dotted path to
    // the enum inside `waproto.SyncActionValue` (e.g. `StatusPrivacyAction.
    // StatusDistributionMode`). Lets a typed-mutation API surface enum
    // string literals (`'ALLOW_LIST'`) instead of magic integers (`1`).
    // `null` when the value message has no enum fields.
    readonly valueEnumFields: ValueEnumFields
    readonly indexParts: IndexParts
}

export declare const WA_APPSTATE_COLLECTIONS: ReadonlyArray<WaAppstateCollection>

export declare const WA_APPSTATE_SCHEMAS: {

}

export type WaAppstateActionKey = keyof typeof WA_APPSTATE_SCHEMAS

// --- Derived helpers ------------------------------------------------------

// Turn a schema's `indexParts` tuple into the runtime value tuple — the
// array you'd `JSON.stringify` to produce the wire-level index string.
// Literals are pinned to their constant value; boolString slots widen to
// '0' | '1' (WA encodes mutation-index booleans this way — see
// WAWebSyncdUtils.constructMsgKeySegments). The wire format on the bus
// is `JSON.stringify(WaAppstateIndexValueOf<S>)`.
//
//   WaAppstateIndexValueOf<typeof WA_APPSTATE_SCHEMAS.Mute>
//     → readonly ['mute', string]
//   WaAppstateIndexValueOf<typeof WA_APPSTATE_SCHEMAS.Star>
//     → readonly ['star', string, string, '0' | '1', string]
export type WaAppstateIndexValueOf<S> = S extends {
    indexParts: infer P extends ReadonlyArray<WaAppstateIndexPart>
}
    ? {
          readonly [K in keyof P]: P[K] extends { type: 'literal'; value: infer V }
              ? V
              : P[K] extends { type: 'boolString' }
                ? '0' | '1'
                : string
      }
    : never

// Turn a schema's `indexParts` tuple into the keyword args object — what
// a typed builder would accept. Literal slots are auto-filled by the
// builder and dropped from the args; non-literals contribute their `name`.
// boolString slots take a JS boolean (encoder writes '0'/'1'); jidOrZero
// slots take `string | null` (encoder writes '0' when null or when
// fromMe is true).
//
//   WaAppstateIndexArgs<'Mute'>  → { readonly chatJid: string }
//   WaAppstateIndexArgs<'Star'>  → {
//       readonly remote: string
//       readonly id: string
//       readonly fromMe: boolean
//       readonly participant: string | null
//   }
export type WaAppstateIndexArgs<K extends WaAppstateActionKey> = {
    readonly [Part in (typeof WA_APPSTATE_SCHEMAS)[K]['indexParts'][number] as Part extends {
        type: 'literal'
    }
        ? never
        : Part extends { name: infer N extends string }
          ? N
          : never]: Part extends { type: 'boolString' }
        ? boolean
        : Part extends { type: 'jidOrZero' }
          ? string | null
          : string
}
