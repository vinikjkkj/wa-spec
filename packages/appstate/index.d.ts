// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: 2.3000.1040072419

export type WaAppstateCollection = 'regular' | 'regular_low' | 'regular_high' | 'critical_block' | 'critical_unblock_low'

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

export interface WaAppstateSchema<
    Name extends string = string,
    Collection extends WaAppstateCollection = WaAppstateCollection,
    Scope extends WaAppstateScope = WaAppstateScope,
    ValueField extends string | null = string | null,
    IndexParts extends ReadonlyArray<WaAppstateIndexPart> = ReadonlyArray<WaAppstateIndexPart>
> {
    readonly name: Name
    readonly collection: Collection
    readonly version: number
    readonly scope: Scope
    readonly valueField: ValueField
    readonly indexParts: IndexParts
}

export declare const WA_APPSTATE_COLLECTIONS: ReadonlyArray<WaAppstateCollection>

export declare const WA_APPSTATE_SCHEMAS: {
    readonly AdsCtwaPerCustomerDataSharing: WaAppstateSchema<'ctwaPerCustomerDataSharing', 'regular_high', 'account', 'ctwaPerCustomerDataSharingAction', readonly [{ readonly type: 'literal'; readonly value: 'ctwaPerCustomerDataSharing' }, { readonly type: 'string'; readonly name: 'accountLid' }]>
    readonly Agent: WaAppstateSchema<'deviceAgent', 'regular', 'account', 'agentAction', readonly [{ readonly type: 'literal'; readonly value: 'deviceAgent' }, { readonly type: 'string'; readonly name: 'agentId' }]>
    readonly AiThreadDelete: WaAppstateSchema<'ai_thread_delete', 'regular_high', 'chat', null, readonly [{ readonly type: 'literal'; readonly value: 'ai_thread_delete' }, { readonly type: 'jid'; readonly name: 'chatJid' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly AiThreadPin: WaAppstateSchema<'thread_pin', 'regular_low', 'chat', 'threadPinAction', readonly [{ readonly type: 'literal'; readonly value: 'thread_pin' }, { readonly type: 'jid'; readonly name: 'chatJid' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly AiThreadRename: WaAppstateSchema<'ai_thread_rename', 'regular_low', 'chat', 'aiThreadRenameAction', readonly [{ readonly type: 'literal'; readonly value: 'ai_thread_rename' }, { readonly type: 'jid'; readonly name: 'chatJid' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly AndroidUnsupportedActions: WaAppstateSchema<'android_unsupported_actions', 'regular_low', 'account', 'androidUnsupportedActions', readonly [{ readonly type: 'literal'; readonly value: 'android_unsupported_actions' }]>
    readonly Archive: WaAppstateSchema<'archive', 'regular_low', 'chatMessageRange', 'archiveChatAction', readonly [{ readonly type: 'literal'; readonly value: 'archive' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly AvatarUpdated: WaAppstateSchema<'avatar_updated_action', 'regular', 'account', 'avatarUpdatedAction', readonly [{ readonly type: 'literal'; readonly value: 'avatar_updated_action' }]>
    readonly BizAiSettingsNudge: WaAppstateSchema<'biz_ai_settings_nudge', 'regular_high', 'account', 'bizAiSettingsNudgeAction', readonly [{ readonly type: 'literal'; readonly value: 'biz_ai_settings_nudge' }]>
    readonly BotWelcomeRequest: WaAppstateSchema<'bot_welcome_request', 'regular_low', 'chat', 'botWelcomeRequestAction', readonly [{ readonly type: 'literal'; readonly value: 'bot_welcome_request' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly BusinessBroadcastCampaign: WaAppstateSchema<'business_broadcast_campaign', 'regular', 'account', 'businessBroadcastCampaignAction', readonly [{ readonly type: 'literal'; readonly value: 'business_broadcast_campaign' }, { readonly type: 'string'; readonly name: 'campaign' }]>
    readonly BusinessBroadcastInsights: WaAppstateSchema<'business_broadcast_insights_sync', 'regular', 'account', 'businessBroadcastInsightsAction', readonly [{ readonly type: 'literal'; readonly value: 'business_broadcast_insights_sync' }, { readonly type: 'string'; readonly name: 'campaign' }]>
    readonly BusinessBroadcastList: WaAppstateSchema<'business_broadcast_list', 'regular', 'account', 'businessBroadcastListAction', readonly [{ readonly type: 'literal'; readonly value: 'business_broadcast_list' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly CallLog: WaAppstateSchema<'call_log', 'regular', 'account', 'callLogAction', readonly [{ readonly type: 'literal'; readonly value: 'call_log' }]>
    readonly ChatAssignment: WaAppstateSchema<'agentChatAssignment', 'regular', 'chat', 'chatAssignment', readonly [{ readonly type: 'literal'; readonly value: 'agentChatAssignment' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly ChatAssignmentOpenedStatus: WaAppstateSchema<'agentChatAssignmentOpenedStatus', 'regular', 'chat', 'chatAssignmentOpenedStatus', readonly [{ readonly type: 'literal'; readonly value: 'agentChatAssignmentOpenedStatus' }, { readonly type: 'jid'; readonly name: 'chatJid' }, { readonly type: 'string'; readonly name: 'agentId' }]>
    readonly ChatLockSettings: WaAppstateSchema<'setting_chatLock', 'regular_low', 'account', 'chatLockSettings', readonly [{ readonly type: 'literal'; readonly value: 'setting_chatLock' }]>
    readonly ClearChat: WaAppstateSchema<'clearChat', 'regular_high', 'chatMessageRange', 'clearChatAction', readonly [{ readonly type: 'literal'; readonly value: 'clearChat' }, { readonly type: 'jid'; readonly name: 'chatJid' }, { readonly type: 'string'; readonly name: 'deleteStarred' }, { readonly type: 'string'; readonly name: 'deleteMedia' }]>
    readonly Contact: WaAppstateSchema<'contact', 'critical_unblock_low', 'account', 'contactAction', readonly [{ readonly type: 'literal'; readonly value: 'contact' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly CustomPaymentMethods: WaAppstateSchema<'custom_payment_methods', 'regular_low', 'account', 'customPaymentMethodsAction', readonly [{ readonly type: 'literal'; readonly value: 'custom_payment_methods' }]>
    readonly CustomerData: WaAppstateSchema<'customer_data', 'regular_low', 'account', 'customerDataAction', readonly [{ readonly type: 'literal'; readonly value: 'customer_data' }, { readonly type: 'string'; readonly name: 'chatJid' }]>
    readonly DeleteChat: WaAppstateSchema<'deleteChat', 'regular_high', 'chatMessageRange', 'deleteChatAction', readonly [{ readonly type: 'literal'; readonly value: 'deleteChat' }, { readonly type: 'jid'; readonly name: 'chatJid' }, { readonly type: 'string'; readonly name: 'deleteMedia' }]>
    readonly DeleteMessageForMe: WaAppstateSchema<'deleteMessageForMe', 'regular_high', 'message', 'deleteMessageForMeAction', readonly [{ readonly type: 'literal'; readonly value: 'deleteMessageForMe' }, { readonly type: 'jid'; readonly name: 'remote' }, { readonly type: 'string'; readonly name: 'id' }, { readonly type: 'boolString'; readonly name: 'fromMe' }, { readonly type: 'jidOrZero'; readonly name: 'participant' }]>
    readonly DetectedOutcomeStatus: WaAppstateSchema<'detected_outcomes_status_action', 'regular', 'account', 'map', readonly [{ readonly type: 'literal'; readonly value: 'detected_outcomes_status_action' }]>
    readonly DeviceCapabilities: WaAppstateSchema<'device_capabilities', 'regular_low', 'account', 'deviceCapabilities', readonly [{ readonly type: 'literal'; readonly value: 'device_capabilities' }]>
    readonly DisableLinkPreviews: WaAppstateSchema<'setting_disableLinkPreviews', 'regular', 'account', 'privacySettingDisableLinkPreviewsAction', readonly [{ readonly type: 'literal'; readonly value: 'setting_disableLinkPreviews' }]>
    readonly ExternalWebBeta: WaAppstateSchema<'external_web_beta', 'regular', 'account', 'externalWebBetaAction', readonly [{ readonly type: 'literal'; readonly value: 'external_web_beta' }]>
    readonly FavoriteSticker: WaAppstateSchema<'favoriteSticker', 'regular_low', 'account', 'stickerAction', readonly [{ readonly type: 'literal'; readonly value: 'favoriteSticker' }, { readonly type: 'string'; readonly name: 'filehash' }]>
    readonly Favorites: WaAppstateSchema<'favorites', 'regular_high', 'account', 'favoritesAction', readonly [{ readonly type: 'literal'; readonly value: 'favorites' }]>
    readonly InteractiveMessageAction: WaAppstateSchema<'interactive_message_action', 'regular_low', 'message', 'interactiveMessageAction', readonly [{ readonly type: 'literal'; readonly value: 'interactive_message_action' }, { readonly type: 'jid'; readonly name: 'remote' }, { readonly type: 'string'; readonly name: 'id' }, { readonly type: 'boolString'; readonly name: 'fromMe' }, { readonly type: 'jidOrZero'; readonly name: 'participant' }, { readonly type: 'string'; readonly name: 'arg5' }]>
    readonly LabelEdit: WaAppstateSchema<'label_edit', 'regular', 'account', 'labelEditAction', readonly [{ readonly type: 'literal'; readonly value: 'label_edit' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly LabelJid: WaAppstateSchema<'label_jid', 'regular', 'chatOrContact', 'labelAssociationAction', readonly [{ readonly type: 'literal'; readonly value: 'label_jid' }, { readonly type: 'string'; readonly name: 'labelId' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly LabelReordering: WaAppstateSchema<'label_reordering', 'regular', 'account', 'labelReorderingAction', readonly [{ readonly type: 'literal'; readonly value: 'label_reordering' }]>
    readonly LidContact: WaAppstateSchema<'lid_contact', 'critical_unblock_low', 'account', 'lidContactAction', readonly [{ readonly type: 'literal'; readonly value: 'lid_contact' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly LocaleSetting: WaAppstateSchema<'setting_locale', 'critical_block', 'account', 'localeSetting', readonly [{ readonly type: 'literal'; readonly value: 'setting_locale' }]>
    readonly LockChat: WaAppstateSchema<'lock', 'regular_low', 'chat', 'lockChatAction', readonly [{ readonly type: 'literal'; readonly value: 'lock' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly MarkChatAsRead: WaAppstateSchema<'markChatAsRead', 'regular_low', 'chatMessageRange', 'markChatAsReadAction', readonly [{ readonly type: 'literal'; readonly value: 'markChatAsRead' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly MarketingMessage: WaAppstateSchema<'marketingMessage', 'regular', 'account', 'marketingMessageAction', readonly [{ readonly type: 'literal'; readonly value: 'marketingMessage' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly MarketingMessageBroadcast: WaAppstateSchema<'marketingMessageBroadcast', 'regular', 'account', null, readonly [{ readonly type: 'literal'; readonly value: 'marketingMessageBroadcast' }, { readonly type: 'string'; readonly name: 'premiumMessageId' }, { readonly type: 'string'; readonly name: 'messageId' }]>
    readonly MerchantPaymentPartner: WaAppstateSchema<'merchant_payment_partner', 'regular_low', 'account', 'merchantPaymentPartnerAction', readonly [{ readonly type: 'literal'; readonly value: 'merchant_payment_partner' }]>
    readonly Mute: WaAppstateSchema<'mute', 'regular_high', 'chat', 'muteAction', readonly [{ readonly type: 'literal'; readonly value: 'mute' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly NctSaltSync: WaAppstateSchema<'nct_salt_sync', 'regular_high', 'account', 'map', readonly [{ readonly type: 'literal'; readonly value: 'nct_salt_sync' }]>
    readonly NoteEdit: WaAppstateSchema<'note_edit', 'regular_low', 'account', 'noteEditAction', readonly [{ readonly type: 'literal'; readonly value: 'note_edit' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly Nux: WaAppstateSchema<'nux', 'regular_low', 'account', 'nuxAction', readonly [{ readonly type: 'literal'; readonly value: 'nux' }, { readonly type: 'string'; readonly name: 'nuxKey' }]>
    readonly OutContact: WaAppstateSchema<'out_contact', 'regular_low', 'account', 'outContactAction', readonly [{ readonly type: 'literal'; readonly value: 'out_contact' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly PaymentInfo: WaAppstateSchema<'payment_info', 'regular_low', 'account', 'paymentInfoAction', readonly [{ readonly type: 'literal'; readonly value: 'payment_info' }]>
    readonly PaymentTos: WaAppstateSchema<'payment_tos', 'regular_low', 'account', 'paymentTosAction', readonly [{ readonly type: 'literal'; readonly value: 'payment_tos' }]>
    readonly Pin: WaAppstateSchema<'pin_v1', 'regular_low', 'chat', 'pinAction', readonly [{ readonly type: 'literal'; readonly value: 'pin_v1' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly PnForLidChat: WaAppstateSchema<'pnForLidChat', 'regular', 'account', 'pnForLidChatAction', readonly [{ readonly type: 'literal'; readonly value: 'pnForLidChat' }, { readonly type: 'string'; readonly name: 'lid' }]>
    readonly PrimaryFeature: WaAppstateSchema<'primary_feature', 'regular', 'account', 'primaryFeature', readonly [{ readonly type: 'literal'; readonly value: 'primary_feature' }]>
    readonly PrimaryVersion: WaAppstateSchema<'primary_version', 'regular_low', 'account', 'primaryVersionAction', readonly [{ readonly type: 'literal'; readonly value: 'primary_version' }, { readonly type: 'string'; readonly name: 'key1' }]>
    readonly QuickReply: WaAppstateSchema<'quick_reply', 'regular', 'account', 'quickReplyAction', readonly [{ readonly type: 'literal'; readonly value: 'quick_reply' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly RemoveRecentSticker: WaAppstateSchema<'removeRecentSticker', 'regular_low', 'account', 'removeRecentStickerAction', readonly [{ readonly type: 'literal'; readonly value: 'removeRecentSticker' }, { readonly type: 'string'; readonly name: 'filehash' }]>
    readonly Sentinel: WaAppstateSchema<'sentinel', 'regular_low', 'account', 'keyExpiration', readonly [{ readonly type: 'literal'; readonly value: 'sentinel' }]>
    readonly SettingPushName: WaAppstateSchema<'setting_pushName', 'critical_block', 'account', 'pushNameSetting', readonly [{ readonly type: 'literal'; readonly value: 'setting_pushName' }]>
    readonly SettingsSync: WaAppstateSchema<'settings_sync', 'regular_low', 'account', 'settingsSyncAction', readonly [{ readonly type: 'literal'; readonly value: 'settings_sync' }, { readonly type: 'enum'; readonly name: 'settingPlatform'; readonly protoEnum: 'SettingsSyncAction.SettingPlatform' }, { readonly type: 'enum'; readonly name: 'settingKey'; readonly protoEnum: 'SettingsSyncAction.SettingKey' }, { readonly type: 'jid'; readonly name: 'chatJid' }]>
    readonly ShareOwnPn: WaAppstateSchema<'shareOwnPn', 'regular', 'account', null, readonly [{ readonly type: 'literal'; readonly value: 'shareOwnPn' }, { readonly type: 'string'; readonly name: 'lid' }]>
    readonly Star: WaAppstateSchema<'star', 'regular_high', 'message', 'starAction', readonly [{ readonly type: 'literal'; readonly value: 'star' }, { readonly type: 'jid'; readonly name: 'remote' }, { readonly type: 'string'; readonly name: 'id' }, { readonly type: 'boolString'; readonly name: 'fromMe' }, { readonly type: 'jidOrZero'; readonly name: 'participant' }]>
    readonly StatusPrivacy: WaAppstateSchema<'status_privacy', 'regular_high', 'account', 'statusPrivacy', readonly [{ readonly type: 'literal'; readonly value: 'status_privacy' }]>
    readonly SubscriptionsSyncV2: WaAppstateSchema<'subscriptions_sync_v2', 'regular', 'account', 'subscriptionsSyncV2Action', readonly [{ readonly type: 'literal'; readonly value: 'subscriptions_sync_v2' }]>
    readonly TimeFormat: WaAppstateSchema<'time_format', 'regular_low', 'account', 'timeFormatAction', readonly [{ readonly type: 'literal'; readonly value: 'time_format' }]>
    readonly UnarchiveChatsSetting: WaAppstateSchema<'setting_unarchiveChats', 'regular_low', 'account', 'unarchiveChatsSetting', readonly [{ readonly type: 'literal'; readonly value: 'setting_unarchiveChats' }]>
    readonly UserStatusMute: WaAppstateSchema<'userStatusMute', 'regular_high', 'account', 'userStatusMuteAction', readonly [{ readonly type: 'literal'; readonly value: 'userStatusMute' }, { readonly type: 'string'; readonly name: 'id' }]>
    readonly VoipRelayAllCalls: WaAppstateSchema<'setting_relayAllCalls', 'regular', 'account', 'privacySettingRelayAllCalls', readonly [{ readonly type: 'literal'; readonly value: 'setting_relayAllCalls' }]>
    readonly WaffleAccountLinkState: WaAppstateSchema<'waffle_account_link_state', 'regular_high', 'account', 'waffleAccountLinkStateAction', readonly [{ readonly type: 'literal'; readonly value: 'waffle_account_link_state' }]>
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
