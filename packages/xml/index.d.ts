// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: 2.3000.1046691727

export interface WaXmlOperationSummary {
    readonly module: string
    readonly opName: string
    readonly rootTag: string | null
    readonly xmlns: string | null
    readonly type: string | null
    readonly requestModule: string | null
    readonly responseModules: ReadonlyArray<string>
}

export declare const WA_XML_OPERATIONS: {
    readonly [K in WaXmlOperationKey]: WaXmlOperationSummary
}

export type WaXmlOperationKey = 'AbPropsGetExperimentConfig' | 'AbPropsGetGroupExperimentConfig' | 'AbPropsRefresh' | 'AccountSetPaymentsTOSv3' | 'AccountSyncNotification' | 'AppdataDeliverPeer' | 'AppdataPublishPeer' | 'BizAccessTokenRequestSilentNonce' | 'BizCtwaActionBannerSuggestion' | 'BizCtwaAdAccountGetAccessTokenAndSessionCookies' | 'BizCtwaAdAccountNonceNotification' | 'BizCtwaAdAccountSendAccountRecoveryNonce' | 'BizCtwaNativeAdUploadAdMedia' | 'BizLinkingGetAccountNonce' | 'BizLinkingGetLinkedAccounts' | 'BizMarketingMessageGetBusinessEligibility' | 'BizMsgUserFeedbackUpdatePreference' | 'BizSettingsGetPrivacySetting' | 'BizSettingsSetPrivacySetting' | 'BizSettingsSyncPrivacySetting' | 'BlocklistsGetBlockList' | 'BlocklistsGetOptOutList' | 'BlocklistsUpdateBlockList' | 'BlocklistsUpdateOptOutList' | 'BotBotList' | 'BrPaymentCreateCustomPaymentMethod' | 'BrPaymentRemoveCustomPaymentMethod' | 'ChatstateClientNotification' | 'ChatstateServerNotification' | 'ClientExpirationClientExpiration' | 'ClientLogLog' | 'CoexistenceOffboardingNotification' | 'CoexistenceOnboardingStatusNotification' | 'CoexistenceSyncNotification' | 'DevicesChangeNotification' | 'DevicesFetch' | 'DevicesFetchSelf' | 'DevicesNotify' | 'DevicesRemove' | 'DirtyBitsClean' | 'DirtyBitsNotify' | 'EdgeEdgeRouting' | 'GroupsAcceptGroupAdd' | 'GroupsAcknowledgeGroup' | 'GroupsAddNotification' | 'GroupsAddParticipants' | 'GroupsBatchGetGroupInfo' | 'GroupsCancelGroupMembershipRequests' | 'GroupsCreate' | 'GroupsCreateSubGroupSuggestion' | 'GroupsDeleteNotification' | 'GroupsDeleteParentGroup' | 'GroupsDemoteNotification' | 'GroupsGetGroupInfo' | 'GroupsGetGroupProfilePictures' | 'GroupsGetInviteGroupInfo' | 'GroupsGetLinkedGroup' | 'GroupsGetLinkedGroupsParticipants' | 'GroupsGetMembershipApprovalRequests' | 'GroupsGetParticipatingGroups' | 'GroupsGetReportedMessages' | 'GroupsGroupsDirtyNotification' | 'GroupsJoinLinkedGroup' | 'GroupsJoinNotification' | 'GroupsLinkSubGroups' | 'GroupsMemberAddModeChangeNotification' | 'GroupsMembershipRequestsAction' | 'GroupsPromoteDemote' | 'GroupsPromoteDemoteAdmin' | 'GroupsPromoteNotification' | 'GroupsRemoveNotification' | 'GroupsRemoveParticipants' | 'GroupsReportMessages' | 'GroupsRevokeRequestCode' | 'GroupsSetDescription' | 'GroupsSetProperty' | 'GroupsSetSubject' | 'GroupsSubGroupSuggestionsAction' | 'GroupsSubjectChangeNotification' | 'GroupsUnlinkGroups' | 'InAppCommsEvent' | 'KeyTransparencyMultiSerializedLookup' | 'LoginFailure' | 'LoginSuccess' | 'MdCompanionFinish' | 'MdCompanionHello' | 'MdGetCountryCode' | 'MdGetPasskeyRequestOptions' | 'MdGetRef' | 'MdPasskeyPrologueRequestNotification' | 'MdPrimaryHelloNotifyCompanion' | 'MdRefreshCodeNotifyCompanion' | 'MdSetCompanionNonce' | 'MdSetEncryptedPairing' | 'MdSetPasskeyPrologue' | 'MdSetPrimaryEphemeralIdentityNotification' | 'MdSetReg' | 'MdSetToCompanion' | 'MessageDeliverNewsletter' | 'MessageDeliverPeer' | 'MessageDeliverRegular' | 'MessageFallbackDeliver' | 'MessagePublishIndividual' | 'MessagePublishNewsletter' | 'MessageRequestSpamMarker' | 'MessageRequestThreadNotification' | 'MultiwaydMultiway' | 'MultiwaydMultiwayNotification' | 'NewslettersGetNewsletterMessageUpdates' | 'NewslettersGetNewsletterMessages' | 'NewslettersGetNewsletterResponses' | 'NewslettersGetNewsletterStatusUpdates' | 'NewslettersGetNewsletterStatuses' | 'NewslettersLiveUpdatesNotification' | 'NewslettersMyAddOns' | 'NewslettersStatusMyAddOns' | 'NewslettersSubscribeToLiveUpdates' | 'NotificationFallbackGenericNotification' | 'OfflineBatch' | 'OfflineCompletion' | 'OfflinePreview' | 'OfflineThreadMetadata' | 'PassiveModeActiveIQ' | 'PassiveModePassiveIQ' | 'PingsClient' | 'PingsServerPing' | 'PreKeysAdd' | 'PreKeysDelete' | 'PreKeysFetchDigest' | 'PreKeysFetchKeyBundles' | 'PreKeysFetchMissingPreKeys' | 'PreKeysNotificationContactIDChanged' | 'PreKeysNotificationDigest' | 'PreKeysNotificationLowCount' | 'PreKeysRotateSigned' | 'PreKeysSet' | 'PresenceAvailability' | 'PresenceServerUpdate' | 'PresenceSubscribe' | 'PrivacyGetContactBlacklist' | 'PrivatestatsSignCredential' | 'ProfilePictureGet' | 'PsaChatBlockGet' | 'PsaChatBlockSet' | 'PsaResetSmbLastQpPrefetchTimestamp' | 'PushConfigSet' | 'QpSurfacesQPNotification' | 'ReceiptDeliver' | 'ReceiptDeliverAppDataPeer' | 'ReceiptDeliverPeer' | 'ReceiptPublishAppDataPeerDelivery' | 'ReceiptPublishDelivery' | 'ReceiptPublishPeerDelivery' | 'ReceiptPublishPeerRead' | 'ReceiptPublishSender' | 'ReceiptPublishView' | 'RtcE2eeCallEventNotifyCallEventNotification' | 'SmaxInvalidError' | 'SmbMeteredMessagesCampaignCampaignStateChangedNotification' | 'SmbMeteredMessagingAccountGetSMBMeteredMessagingCheckout' | 'SpamGroupReport' | 'SpamIndividualReport' | 'SpamNewsletterReport' | 'SpamStatusReport' | 'SpamStatusReportV2' | 'StatsSendBuffer' | 'StatusDeliverIncomingNewsletterStatus' | 'StatusPublishPostBroadcastStatus' | 'StatusPublishPostNewsletterStatus' | 'StreamErrorAckKick' | 'StreamErrorBadMac' | 'StreamErrorCode' | 'StreamErrorConflict' | 'StreamErrorPingKick' | 'StreamErrorXMLNotWellFormed' | 'SyncdNewPatch' | 'UnifiedSessionShare' | 'UserNoticeGetDisclosureStageByIds' | 'UserNoticeGetDisclosures' | 'UserNoticeSet' | 'UserNoticeSetResult' | 'UsyncNotification' | 'VoipLinkCreate' | 'VoipLinkQuery' | 'VoipWaitingRoomToggleCallLink' | 'WaffleEncryptedPayload' | 'WaffleForceDeleteState' | 'WaffleForceSuspendState' | 'WaffleGenerateAccessTokens' | 'WaffleGenerateWAEntACUser' | 'WaffleGetCertificate' | 'WaffleRefreshAccessTokens' | 'WaffleStateExists' | 'WaffleWFPing'

// Per-operation request/response shape literals — generated from the static
// extraction over WASmaxOut*Request + WASmaxIn*Response* modules. Each
// response member of the union represents one of the parser variants the
// client tries in order; the `variant` discriminator tells you which one
// claimed the response.
export interface WaXmlOperations {
    readonly AbPropsGetExperimentConfig: {
        readonly module: 'WASmaxAbPropsGetExperimentConfigRPC'
        readonly opName: 'GetExperimentConfig'
        readonly xmlns: 'abt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'abt'
        }
        readonly children: {
            readonly props: {
                readonly tag: 'props'
                readonly attrs: {
                    readonly hash?: string
                    readonly protocol: '1'
                    readonly refresh_id?: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ErrorNoRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ErrorRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly erid: {
                    readonly tag: 'erid'
                    readonly content: Uint8Array
                } | undefined
                readonly props: {
                    readonly tag: 'props'
                    readonly attrs: {
                        readonly ab_key?: string
                        readonly delta_update?: 'false' | 'true'
                        readonly hash?: string
                        readonly protocol: '1'
                        readonly refresh?: number
                        readonly refresh_id?: number
                    }
                    readonly children: {
                        readonly prop: ReadonlyArray<{
                            readonly tag: 'prop'
                            readonly attrs: {
                                readonly config_code?: number
                                readonly config_expo_key?: number
                                readonly config_value?: string
                                readonly event_code?: number
                                readonly sampling_weight?: number
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly AbPropsGetGroupExperimentConfig: {
        readonly module: 'WASmaxAbPropsGetGroupExperimentConfigRPC'
        readonly opName: 'GetGroupExperimentConfig'
        readonly xmlns: 'abt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'abt'
        }
        readonly children: {
            readonly props: {
                readonly tag: 'props'
                readonly attrs: {
                    readonly group: string
                    readonly hash?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ErrorNoRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ErrorRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly props: {
                    readonly tag: 'props'
                    readonly attrs: {
                        readonly ab_key?: string
                        readonly hash?: string
                        readonly refresh?: number
                        readonly refresh_id?: number
                    }
                    readonly children: {
                        readonly prop: ReadonlyArray<{
                            readonly tag: 'prop'
                            readonly attrs: {
                                readonly config_code?: number
                                readonly config_expo_key?: number
                                readonly config_value?: string
                                readonly event_code?: number
                                readonly sampling_weight?: number
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly AbPropsRefresh: {
        readonly module: 'WASmaxAbPropsRefreshRPC'
        readonly opName: 'Refresh'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'server'
            }
            readonly children: {
                readonly abprops: {
                    readonly tag: 'abprops'
                    readonly attrs: {
                        readonly protocol: number
                    }
                }
            }
        } }
    }
    readonly AccountSetPaymentsTOSv3: {
        readonly module: 'WASmaxAccountSetPaymentsTOSv3RPC'
        readonly opName: 'SetPaymentsTOSv3'
        readonly xmlns: 'urn:xmpp:whatsapp:account'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'urn:xmpp:whatsapp:account'
        }
        readonly children: {
            readonly accept_pay: {
                readonly tag: 'accept_pay'
                readonly attrs: {
                    readonly notice: string
                    readonly tos_version: number
                    readonly version: '3'
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly accept_pay: {
                    readonly tag: 'accept_pay'
                    readonly attrs: {
                        readonly outage?: '1'
                        readonly sandbox?: '1'
                        readonly service?: 'FBPAY'
                    }
                    readonly children: {
                        readonly additional_notice: ReadonlyArray<{
                            readonly tag: 'additional_notice'
                            readonly attrs: {
                                readonly notice: 'br_p2p_consent' | 'br_pay_privacy_policy' | 'br_pay_tos' | 'br_pay_wa_tos'
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly AccountSyncNotification: {
        readonly module: 'WASmaxAccountSyncNotificationRPC'
        readonly opName: 'Notification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'account_sync'
            }
            readonly children: {
                readonly blocklist: {
                    readonly tag: 'blocklist'
                    readonly attrs: {
                        readonly action?: 'modify'
                        readonly dhash?: string
                        readonly prev_dhash?: string
                    }
                    readonly children: {
                        readonly item: {
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly action: 'block' | 'unblock'
                                readonly jid: string
                            }
                        }
                    }
                }
                readonly devices: {
                    readonly tag: 'devices'
                    readonly attrs: {
                        readonly action?: 'modify'
                        readonly dhash?: string
                    }
                    readonly children: {
                        readonly device: ReadonlyArray<{
                            readonly tag: 'device'
                            readonly attrs: {
                                readonly jid: string
                                readonly 'key-index'?: number
                            }
                        }>
                        readonly 'key-index-list': {
                            readonly tag: 'key-index-list'
                            readonly attrs: {
                                readonly ts: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                    }
                }
                readonly disappearing_mode: {
                    readonly tag: 'disappearing_mode'
                    readonly attrs: {
                        readonly action?: 'modify'
                        readonly duration?: number
                        readonly t?: number
                    }
                }
                readonly notice: {
                    readonly tag: 'notice'
                    readonly attrs: {
                        readonly action?: 'modify'
                        readonly id?: number
                        readonly stage?: number
                        readonly t?: number
                        readonly type?: number
                        readonly version?: number
                    }
                }
                readonly picture: {
                    readonly tag: 'picture'
                    readonly attrs: {
                        readonly action?: 'modify'
                    }
                }
                readonly privacy: {
                    readonly tag: 'privacy'
                    readonly attrs: {
                        readonly action?: 'modify'
                    }
                    readonly children: {
                        readonly category: ReadonlyArray<{
                            readonly tag: 'category'
                            readonly attrs: {
                                readonly action?: 'modify'
                                readonly dhash?: string
                                readonly name: string
                                readonly prev_dhash?: string
                                readonly value: string
                            }
                            readonly children: {
                                readonly user: ReadonlyArray<{
                                    readonly tag: 'user'
                                    readonly attrs: {
                                        readonly action: string
                                        readonly jid: string
                                    }
                                }>
                            }
                        }>
                    }
                }
                readonly status: {
                    readonly tag: 'status'
                    readonly attrs: {
                        readonly action?: 'modify'
                        readonly dhash?: string
                    }
                    readonly content: 'APPROVED' | 'PENDING' | 'REJECTED'
                }
                readonly text_status: {
                    readonly tag: 'text_status'
                    readonly attrs: {
                        readonly action?: 'modify'
                        readonly ephemeral_duration_sec?: number
                        readonly last_update_time?: number
                        readonly text?: string
                    }
                    readonly children: {
                        readonly emoji: {
                            readonly tag: 'emoji'
                            readonly attrs: {
                                readonly content: string
                            }
                        }
                    }
                }
                readonly username: {
                    readonly tag: 'username'
                    readonly attrs: {
                        readonly action?: 'modify'
                        readonly username?: string
                    }
                }
            }
        } }
    }
    readonly AppdataDeliverPeer: {
        readonly module: 'WASmaxAppdataDeliverPeerRPC'
        readonly opName: 'Peer'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'appdata'
            readonly attrs: {
                readonly category: 'peer'
                readonly from: string
                readonly id: string
                readonly offline: number
                readonly push_priority?: 'high' | 'low'
                readonly t: number
            }
            readonly children: {
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly count: number
                        readonly 'decrypt-fail': 'hide'
                        readonly type: 'msg' | 'pkmsg'
                        readonly v: number
                    }
                    readonly content: Uint8Array
                }
                readonly registration: {
                    readonly tag: 'registration'
                    readonly content: Uint8Array
                }
                readonly test: {
                    readonly tag: 'test'
                    readonly attrs: {
                        readonly config?: string
                    }
                }
            }
        } }
    }
    readonly AppdataPublishPeer: {
        readonly module: 'WASmaxAppdataPublishPeerRPC'
        readonly opName: 'Peer'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'appdata'
        readonly attrs: {
            readonly category: 'peer'
            readonly count: number
            readonly device_list_check: string
            readonly id: string
            readonly jid: string
            readonly push_priority?: string
            readonly t: number
            readonly to: string
            readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
            readonly v: number
        }
        readonly children: {
            readonly 'device-identity': {
                readonly tag: 'device-identity'
                readonly content: Uint8Array
            }
            readonly enc: {
                readonly tag: 'enc'
                readonly attrs: {
                    readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                    readonly v: number
                }
                readonly content: Uint8Array
            }
            readonly request_id: {
                readonly tag: 'request_id'
            }
            readonly test: {
                readonly tag: 'test'
                readonly attrs: {
                    readonly config?: string
                }
            }
            readonly trace: {
                readonly tag: 'trace'
                readonly children: {
                    readonly request_id: {
                        readonly tag: 'request_id'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Negative'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'appdata'
                readonly error: string
                readonly from: string
                readonly id: string
                readonly t: number
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'appdata'
                readonly from: string
                readonly id: string
                readonly phash: string
                readonly t: number
            }
        } }
    }
    readonly BizAccessTokenRequestSilentNonce: {
        readonly module: 'WASmaxBizAccessTokenRequestSilentNonceRPC'
        readonly opName: 'RequestSilentNonce'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '118'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fb:thrift_iq'
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'RecoveryRequired'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly result: {
                    readonly tag: 'result'
                    readonly attrs: {
                        readonly email: string
                        readonly status: 'RecoveryRequired'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly result: {
                    readonly tag: 'result'
                    readonly attrs: {
                        readonly status: 'Success'
                    }
                }
            }
        } }
    }
    readonly BizCtwaActionBannerSuggestion: {
        readonly module: 'WASmaxBizCtwaActionBannerSuggestionRPC'
        readonly opName: 'BannerSuggestion'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly to?: string
                readonly type: 'business'
            }
            readonly children: {
                readonly ctwa_suggestion: {
                    readonly tag: 'ctwa_suggestion'
                    readonly attrs: {
                        readonly target_entity_id: string
                    }
                    readonly children: {
                        readonly banner: {
                            readonly tag: 'banner'
                            readonly children: {
                                readonly action: {
                                    readonly tag: 'action'
                                    readonly attrs: {
                                        readonly deep_link?: string
                                        readonly local_android_link?: string
                                        readonly local_link?: string
                                    }
                                } | undefined
                                readonly config: {
                                    readonly tag: 'config'
                                    readonly attrs: {
                                        readonly display: 'info' | 'warning'
                                        readonly expires_at: number
                                        readonly revoked: 'false' | 'true'
                                    }
                                }
                                readonly content: {
                                    readonly tag: 'content'
                                    readonly attrs: {
                                        readonly locale: string
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                        readonly heading: {
                                            readonly tag: 'heading'
                                            readonly content: string
                                        }
                                        readonly highlight: {
                                            readonly tag: 'highlight'
                                            readonly content: string
                                        }
                                        readonly localised_body: {
                                            readonly tag: 'localised_body'
                                            readonly attrs: {
                                                readonly value: string
                                            }
                                            readonly children: {
                                                readonly localisation_metadata: {
                                                    readonly tag: 'localisation_metadata'
                                                    readonly attrs: {
                                                        readonly translation_project: string
                                                        readonly uid: string
                                                    }
                                                    readonly children: {
                                                        readonly parameter: ReadonlyArray<{
                                                            readonly tag: 'parameter'
                                                            readonly attrs: {
                                                                readonly name: string
                                                                readonly value: string
                                                            }
                                                        }>
                                                    }
                                                }
                                            }
                                        } | undefined
                                        readonly localised_heading: {
                                            readonly tag: 'localised_heading'
                                            readonly attrs: {
                                                readonly value: string
                                            }
                                            readonly children: {
                                                readonly localisation_metadata: {
                                                    readonly tag: 'localisation_metadata'
                                                    readonly attrs: {
                                                        readonly translation_project: string
                                                        readonly uid: string
                                                    }
                                                    readonly children: {
                                                        readonly parameter: ReadonlyArray<{
                                                            readonly tag: 'parameter'
                                                            readonly attrs: {
                                                                readonly name: string
                                                                readonly value: string
                                                            }
                                                        }>
                                                    }
                                                }
                                            }
                                        } | undefined
                                        readonly localised_highlight: {
                                            readonly tag: 'localised_highlight'
                                            readonly attrs: {
                                                readonly value: string
                                            }
                                            readonly children: {
                                                readonly localisation_metadata: {
                                                    readonly tag: 'localisation_metadata'
                                                    readonly attrs: {
                                                        readonly translation_project: string
                                                        readonly uid: string
                                                    }
                                                    readonly children: {
                                                        readonly parameter: ReadonlyArray<{
                                                            readonly tag: 'parameter'
                                                            readonly attrs: {
                                                                readonly name: string
                                                                readonly value: string
                                                            }
                                                        }>
                                                    }
                                                }
                                            }
                                        } | undefined
                                    }
                                }
                                readonly native_action: ReadonlyArray<{
                                    readonly tag: 'native_action'
                                    readonly attrs: {
                                        readonly local_link: string
                                        readonly min_app_version: string
                                        readonly platform: string
                                        readonly universal_link?: string
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly BizCtwaAdAccountGetAccessTokenAndSessionCookies: {
        readonly module: 'WASmaxBizCtwaAdAccountGetAccessTokenAndSessionCookiesRPC'
        readonly opName: 'GetAccessTokenAndSessionCookies'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '104'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fb:thrift_iq'
        }
        readonly children: {
            readonly parameters: {
                readonly tag: 'parameters'
                readonly children: {
                    readonly code: {
                        readonly tag: 'code'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'IncorrectNonce'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: '432'
                        readonly text: 'INCORRECT_NONCE'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly access_token: {
                    readonly tag: 'access_token'
                    readonly content: string
                }
                readonly business_person: {
                    readonly tag: 'business_person'
                    readonly attrs: {
                        readonly id: string
                    }
                }
                readonly session_cookies: {
                    readonly tag: 'session_cookies'
                    readonly content: string
                }
                readonly token_type: {
                    readonly tag: 'token_type'
                    readonly content: 'Strong' | 'Weak'
                } | undefined
            }
        } }
        | { readonly variant: 'TooManyAttempts'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: '431'
                        readonly text: 'TOO_MANY_ATTEMPTS'
                    }
                }
            }
        } }
    }
    readonly BizCtwaAdAccountNonceNotification: {
        readonly module: 'WASmaxBizCtwaAdAccountNonceNotificationRPC'
        readonly opName: 'NonceNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly to?: string
                readonly type: 'business'
            }
            readonly children: {
                readonly wa_ad_account_nonce: {
                    readonly tag: 'wa_ad_account_nonce'
                    readonly content: string
                }
            }
        } }
    }
    readonly BizCtwaAdAccountSendAccountRecoveryNonce: {
        readonly module: 'WASmaxBizCtwaAdAccountSendAccountRecoveryNonceRPC'
        readonly opName: 'SendAccountRecoveryNonce'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '112'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fb:thrift_iq'
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly Result: {
                    readonly tag: 'Result'
                    readonly children: {
                        readonly status: {
                            readonly tag: 'status'
                            readonly content: 'Fail' | 'Success'
                        }
                    }
                }
            }
        } }
    }
    readonly BizCtwaNativeAdUploadAdMedia: {
        readonly module: 'WASmaxBizCtwaNativeAdUploadAdMediaRPC'
        readonly opName: 'UploadAdMedia'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '74'
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'fb:thrift_iq'
        }
        readonly children: {
            readonly media: {
                readonly tag: 'media'
                readonly attrs: {
                    readonly id: string
                    readonly type: 'image' | 'video'
                }
            } | undefined
            readonly media_list: ReadonlyArray<{
                readonly tag: 'media_list'
                readonly attrs: {
                    readonly id: string
                    readonly type: 'image' | 'video'
                }
            }>
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly media: {
                    readonly tag: 'media'
                    readonly attrs: {
                        readonly id: string
                        readonly type: 'image' | 'video'
                    }
                } | undefined
                readonly media_list: ReadonlyArray<{
                    readonly tag: 'media_list'
                    readonly attrs: {
                        readonly id: string
                        readonly type: 'image' | 'video'
                    }
                }>
            }
        } }
    }
    readonly BizLinkingGetAccountNonce: {
        readonly module: 'WASmaxBizLinkingGetAccountNonceRPC'
        readonly opName: 'GetAccountNonce'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '12'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fb:thrift_iq'
        }
        readonly children: {
            readonly identifier: {
                readonly tag: 'identifier'
                readonly attrs: {
                    readonly scope: string
                }
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                        readonly tos_version?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly detail: {
                    readonly tag: 'detail'
                    readonly children: {
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: string
                        }
                        readonly request: {
                            readonly tag: 'request'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: string
                                }
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly BizLinkingGetLinkedAccounts: {
        readonly module: 'WASmaxBizLinkingGetLinkedAccountsRPC'
        readonly opName: 'GetLinkedAccounts'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '42'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fb:thrift_iq'
        }
        readonly children: {
            readonly linked_accounts: {
                readonly tag: 'linked_accounts'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Forbidden'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'forbidden'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly linked_accounts: {
                    readonly tag: 'linked_accounts'
                    readonly children: {
                        readonly fb_biz: {
                            readonly tag: 'fb_biz'
                            readonly attrs: {
                                readonly id: string
                            }
                            readonly children: {
                                readonly catalog: {
                                    readonly tag: 'catalog'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly state: 'disable' | 'import'
                                    }
                                } | undefined
                                readonly display_name: {
                                    readonly tag: 'display_name'
                                    readonly content: string
                                }
                            }
                        } | undefined
                        readonly fb_page: {
                            readonly tag: 'fb_page'
                            readonly attrs: {
                                readonly id: string
                            }
                            readonly children: {
                                readonly ad_status: {
                                    readonly tag: 'ad_status'
                                    readonly attrs: {
                                        readonly has_active_ctwa_ad: 'false' | 'true'
                                        readonly has_created_ad: 'false' | 'true'
                                    }
                                }
                                readonly display_name: {
                                    readonly tag: 'display_name'
                                    readonly content: string
                                }
                                readonly profile_picture: {
                                    readonly tag: 'profile_picture'
                                    readonly children: {
                                        readonly bytes: {
                                            readonly tag: 'bytes'
                                            readonly content: Uint8Array
                                        } | undefined
                                        readonly url: {
                                            readonly tag: 'url'
                                            readonly content: string
                                        }
                                    }
                                }
                                readonly profile_sync: {
                                    readonly tag: 'profile_sync'
                                    readonly attrs: {
                                        readonly state: 'disable' | 'import'
                                    }
                                } | undefined
                                readonly show_on_profile: {
                                    readonly tag: 'show_on_profile'
                                    readonly content: 'false' | 'true'
                                }
                                readonly whatsapp_as_page_button: {
                                    readonly tag: 'whatsapp_as_page_button'
                                    readonly attrs: {
                                        readonly state: 'off' | 'on'
                                    }
                                }
                            }
                        } | undefined
                        readonly ig_professional: {
                            readonly tag: 'ig_professional'
                            readonly children: {
                                readonly display_name: {
                                    readonly tag: 'display_name'
                                    readonly content: string
                                }
                                readonly ig_handle: {
                                    readonly tag: 'ig_handle'
                                    readonly content: string
                                }
                                readonly profile_picture: {
                                    readonly tag: 'profile_picture'
                                    readonly children: {
                                        readonly bytes: {
                                            readonly tag: 'bytes'
                                            readonly content: Uint8Array
                                        } | undefined
                                        readonly url: {
                                            readonly tag: 'url'
                                            readonly content: string
                                        }
                                    }
                                }
                                readonly show_on_profile: {
                                    readonly tag: 'show_on_profile'
                                    readonly content: 'false' | 'true'
                                }
                            }
                        } | undefined
                        readonly whatsapp_ad_identity: {
                            readonly tag: 'whatsapp_ad_identity'
                            readonly attrs: {
                                readonly id: string
                            }
                            readonly children: {
                                readonly ad_status: {
                                    readonly tag: 'ad_status'
                                    readonly attrs: {
                                        readonly has_active_ctwa_ad: 'false' | 'true'
                                        readonly has_created_ad: 'false' | 'true'
                                    }
                                }
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly BizMarketingMessageGetBusinessEligibility: {
        readonly module: 'WASmaxBizMarketingMessageGetBusinessEligibilityRPC'
        readonly opName: 'GetBusinessEligibility'
        readonly xmlns: 'w:biz'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '139'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'w:biz'
        }
        readonly children: {
            readonly features: {
                readonly tag: 'features'
                readonly attrs: {
                    readonly bb_pro?: string
                    readonly genai?: string
                    readonly genai_image?: string
                    readonly marketing_messages?: string
                    readonly meta_one?: string
                    readonly meta_verified?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly bb_pro: {
                    readonly tag: 'bb_pro'
                    readonly attrs: {
                        readonly status: 'ELIGIBLE_TO_ONBOARD' | 'NOT_ELIGIBLE' | 'ONBOARDED'
                    }
                } | undefined
                readonly genai: {
                    readonly tag: 'genai'
                    readonly attrs: {
                        readonly status: 'FAIL' | 'SUCCESS'
                        readonly v1_enabled?: 'false' | 'true'
                    }
                } | undefined
                readonly genai_image: {
                    readonly tag: 'genai_image'
                    readonly attrs: {
                        readonly status: 'FAIL' | 'SUCCESS'
                    }
                } | undefined
                readonly marketing_messages: {
                    readonly tag: 'marketing_messages'
                    readonly attrs: {
                        readonly expiration?: number
                        readonly status: 'FAIL' | 'PAUSED' | 'SUCCESS' | 'WARNING'
                    }
                } | undefined
                readonly meta_one: {
                    readonly tag: 'meta_one'
                    readonly attrs: {
                        readonly status: 'FAIL' | 'SUCCESS'
                    }
                } | undefined
                readonly meta_verified: {
                    readonly tag: 'meta_verified'
                    readonly attrs: {
                        readonly additional_params?: string
                        readonly should_show_privacy_interstitial_to_new_users?: 'false' | 'true'
                        readonly status: 'FAIL' | 'SUCCESS'
                    }
                } | undefined
            }
        } }
    }
    readonly BizMsgUserFeedbackUpdatePreference: {
        readonly module: 'WASmaxBizMsgUserFeedbackUpdatePreferenceRPC'
        readonly opName: 'UpdatePreference'
        readonly xmlns: 'w:biz:msg_feedback'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'w:biz:msg_feedback'
        }
        readonly children: {
            readonly user_feedback: {
                readonly tag: 'user_feedback'
                readonly attrs: {
                    readonly action: string
                    readonly feedback?: string
                    readonly jid: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'feature-not-implemented'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly BizSettingsGetPrivacySetting: {
        readonly module: 'WASmaxBizSettingsGetPrivacySettingRPC'
        readonly opName: 'GetPrivacySetting'
        readonly xmlns: 'w:biz'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '109'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'w:biz'
        }
        readonly children: {
            readonly privacy: {
                readonly tag: 'privacy'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly privacy: {
                    readonly tag: 'privacy'
                    readonly children: {
                        readonly smb_data_sharing_with_meta_consent: {
                            readonly tag: 'smb_data_sharing_with_meta_consent'
                            readonly attrs: {
                                readonly value: 'false' | 'notset' | 'true'
                                readonly version?: number
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly BizSettingsSetPrivacySetting: {
        readonly module: 'WASmaxBizSettingsSetPrivacySettingRPC'
        readonly opName: 'SetPrivacySetting'
        readonly xmlns: 'w:biz'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '110'
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'w:biz'
        }
        readonly children: {
            readonly privacy: {
                readonly tag: 'privacy'
                readonly attrs: {
                    readonly value: 'false' | 'notset' | 'true'
                    readonly version?: number
                }
                readonly children: {
                    readonly smb_data_sharing_with_meta_consent: {
                        readonly tag: 'smb_data_sharing_with_meta_consent'
                        readonly attrs: {
                            readonly value: 'false' | 'notset' | 'true'
                            readonly version?: number
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly privacy: {
                    readonly tag: 'privacy'
                    readonly children: {
                        readonly smb_data_sharing_with_meta_consent: {
                            readonly tag: 'smb_data_sharing_with_meta_consent'
                            readonly attrs: {
                                readonly value: 'false' | 'notset' | 'true'
                                readonly version?: number
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly BizSettingsSyncPrivacySetting: {
        readonly module: 'WASmaxBizSettingsSyncPrivacySettingRPC'
        readonly opName: 'SyncPrivacySetting'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly to?: string
                readonly type: 'business'
            }
            readonly children: {
                readonly privacy: {
                    readonly tag: 'privacy'
                    readonly children: {
                        readonly smb_data_sharing_with_meta_consent: {
                            readonly tag: 'smb_data_sharing_with_meta_consent'
                            readonly attrs: {
                                readonly value: 'false' | 'notset' | 'true'
                                readonly version?: number
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly BlocklistsGetBlockList: {
        readonly module: 'WASmaxBlocklistsGetBlockListRPC'
        readonly opName: 'GetBlockList'
        readonly xmlns: 'blocklist'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'blocklist'
        }
        readonly children: {
            readonly item: {
                readonly tag: 'item'
                readonly attrs: {
                    readonly dhash: string
                }
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'CAPISuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly addressing_mode: 'lid'
                        readonly dhash?: string
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly jid?: string
                                readonly pn_jid?: string
                                readonly unknown_identifier?: 'true'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'ForceMigratedSuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly addressing_mode: 'lid'
                        readonly dhash?: string
                        readonly dirty: 'true'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly jid?: string
                                readonly pn_jid?: string
                                readonly unknown_identifier?: 'true'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'InternalServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'feature-not-implemented'
                    }
                }
            }
        } }
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'MigratedSuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly addressing_mode: 'lid'
                        readonly dhash?: string
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly jid: string
                                readonly pn_jid?: string
                                readonly unknown_identifier?: 'true'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'SuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly addressing_mode?: 'pn'
                        readonly dhash?: string
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly display_name?: string
                                readonly jid: string
                                readonly lid?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly BlocklistsGetOptOutList: {
        readonly module: 'WASmaxBlocklistsGetOptOutListRPC'
        readonly opName: 'GetOptOutList'
        readonly xmlns: 'optoutlist'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly category?: string
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'optoutlist'
        }
        readonly children: {
            readonly item: {
                readonly tag: 'item'
                readonly attrs: {
                    readonly dhash: string
                }
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'InternalServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'feature-not-implemented'
                    }
                }
            }
        } }
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly category?: string
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'SuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly dhash?: string
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly action?: 'block' | 'unblock'
                                readonly biz_jid?: string
                                readonly biz_opt_out_brand_id?: string
                                readonly biz_opt_out_jid?: string
                                readonly category?: string
                                readonly expiry_at?: number
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly BlocklistsUpdateBlockList: {
        readonly module: 'WASmaxBlocklistsUpdateBlockListRPC'
        readonly opName: 'UpdateBlockList'
        readonly xmlns: 'blocklist'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'blocklist'
        }
        readonly children: {
            readonly entry_point: {
                readonly tag: 'entry_point'
                readonly attrs: {
                    readonly source: string
                }
            }
            readonly item: {
                readonly tag: 'item'
                readonly attrs: {
                    readonly action: 'block'
                    readonly country_code?: string
                    readonly dhash?: string
                    readonly jid: string
                }
                readonly children: {
                    readonly biz_opt_out: {
                        readonly tag: 'biz_opt_out'
                        readonly attrs: {
                            readonly business_discovery_entry_point?: string
                            readonly business_discovery_id?: string
                            readonly business_discovery_timestamp?: number
                            readonly entry_point?: string
                            readonly first_message?: string
                            readonly reason?: string
                            readonly reason_description?: string
                        }
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'CAPISuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly addressing_mode: 'lid'
                        readonly c_dhash?: string
                        readonly dhash: string
                        readonly matched: 'false'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly jid?: string
                                readonly pn_jid?: string
                                readonly unknown_identifier?: 'true'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'MigratedSuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly addressing_mode: 'lid'
                        readonly c_dhash?: string
                        readonly dhash: string
                        readonly matched: 'false'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly jid: string
                                readonly pn_jid?: string
                                readonly unknown_identifier?: 'true'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'feature-not-implemented'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly dhash: string
                        readonly matched: 'true'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly addressing_mode?: 'pn'
                        readonly c_dhash?: string
                        readonly dhash: string
                        readonly matched: 'false'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly display_name?: string
                                readonly jid: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly BlocklistsUpdateOptOutList: {
        readonly module: 'WASmaxBlocklistsUpdateOptOutListRPC'
        readonly opName: 'UpdateOptOutList'
        readonly xmlns: 'optoutlist'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'optoutlist'
        }
        readonly children: {
            readonly item: {
                readonly tag: 'item'
                readonly attrs: {
                    readonly action: 'block' | 'unblock'
                    readonly category: string
                    readonly dhash?: string
                    readonly duration?: number
                    readonly entry_point?: string
                    readonly jid: string
                    readonly reason?: string
                    readonly signup_id?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'feature-not-implemented'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly dhash: string
                        readonly matched: 'true'
                    }
                    readonly children: {
                        readonly item: {
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly action?: 'block' | 'unblock'
                                readonly biz_jid?: string
                                readonly biz_opt_out_brand_id?: string
                                readonly biz_opt_out_jid?: string
                                readonly category?: string
                                readonly expiry_at?: number
                            }
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly c_dhash?: string
                        readonly dhash: string
                        readonly matched: 'false'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly action?: 'block' | 'unblock'
                                readonly biz_jid?: string
                                readonly biz_opt_out_brand_id?: string
                                readonly biz_opt_out_jid?: string
                                readonly category?: string
                                readonly expiry_at?: number
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly BotBotList: {
        readonly module: 'WASmaxBotBotListRPC'
        readonly opName: 'BotList'
        readonly xmlns: 'bot'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'bot'
        }
        readonly children: {
            readonly bot: {
                readonly tag: 'bot'
                readonly attrs: {
                    readonly bhash?: string
                    readonly v?: '2' | '3'
                }
                readonly children: {
                    readonly bot: ReadonlyArray<{
                        readonly tag: 'bot'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessV2'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly bot: {
                    readonly tag: 'bot'
                    readonly attrs: {
                        readonly v: '2'
                    }
                    readonly children: {
                        readonly default: {
                            readonly tag: 'default'
                            readonly attrs: {
                                readonly jid: string
                                readonly persona_id: string
                            }
                        }
                        readonly section: ReadonlyArray<{
                            readonly tag: 'section'
                            readonly attrs: {
                                readonly name: string
                                readonly type: 'all' | 'category' | 'featured'
                            }
                            readonly children: {
                                readonly bot: ReadonlyArray<{
                                    readonly tag: 'bot'
                                    readonly attrs: {
                                        readonly count?: number
                                        readonly jid: string
                                        readonly persona_id: string
                                    }
                                    readonly children: {
                                        readonly theme: ReadonlyArray<{
                                            readonly tag: 'theme'
                                            readonly attrs: {
                                                readonly mode: 'dark' | 'light'
                                            }
                                            readonly children: {
                                                readonly background: {
                                                    readonly tag: 'background'
                                                    readonly content: string
                                                }
                                                readonly primary_text: {
                                                    readonly tag: 'primary_text'
                                                    readonly content: string
                                                }
                                                readonly secondary_text: {
                                                    readonly tag: 'secondary_text'
                                                    readonly content: string
                                                }
                                            }
                                        }>
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessV3'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly bot: {
                    readonly tag: 'bot'
                    readonly attrs: {
                        readonly bhash: string
                        readonly v: '3'
                    }
                    readonly children: {
                        readonly default: {
                            readonly tag: 'default'
                            readonly attrs: {
                                readonly jid: string
                                readonly persona_id: string
                            }
                        } | undefined
                        readonly section: ReadonlyArray<{
                            readonly tag: 'section'
                            readonly attrs: {
                                readonly display_type: 'hidden' | 'hscroll' | 'hscroll_icebreakers' | 'hscroll_large' | 'hscroll_small' | 'listview'
                                readonly name: string
                                readonly type: 'all' | 'category' | 'featured'
                            }
                            readonly children: {
                                readonly bot: ReadonlyArray<{
                                    readonly tag: 'bot'
                                    readonly attrs: {
                                        readonly card_title?: string
                                        readonly count?: number
                                        readonly jid: string
                                        readonly persona_id: string
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly BrPaymentCreateCustomPaymentMethod: {
        readonly module: 'WASmaxBrPaymentCreateCustomPaymentMethodRPC'
        readonly opName: 'CreateCustomPaymentMethod'
        readonly xmlns: 'w:pay'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'w:pay'
        }
        readonly children: {
            readonly account: {
                readonly tag: 'account'
                readonly attrs: {
                    readonly action: 'create-custom-payment-method'
                    readonly country: 'BR'
                    readonly device_id: string
                }
                readonly children: {
                    readonly custom_payment_method: {
                        readonly tag: 'custom_payment_method'
                        readonly attrs: {
                            readonly flow?: 'p2m' | 'p2p'
                            readonly key: string
                            readonly type: 'pay_on_delivery' | 'pix_key'
                            readonly update?: string
                            readonly value: string
                        }
                        readonly children: {
                            readonly metadata_info: {
                                readonly tag: 'metadata_info'
                                readonly attrs: {
                                    readonly key: string
                                    readonly value: string
                                }
                            }
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'IQErrorWithCodeAndReason'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly account: {
                    readonly tag: 'account'
                    readonly attrs: {
                        readonly action: string
                    }
                    readonly children: {
                        readonly custom_payment_method: {
                            readonly tag: 'custom_payment_method'
                            readonly attrs: {
                                readonly country?: 'BR'
                                readonly created?: string
                                readonly 'credential-id'?: string
                                readonly flow?: 'p2m' | 'p2p'
                                readonly 'p2m-eligible'?: '0' | '1'
                                readonly 'p2p-eligible'?: '0' | '1'
                                readonly type: 'pay_on_delivery' | 'pix_key'
                            }
                            readonly children: {
                                readonly metadata_info: {
                                    readonly tag: 'metadata_info'
                                    readonly children: {
                                        readonly metadata: ReadonlyArray<{
                                            readonly tag: 'metadata'
                                            readonly attrs: {
                                                readonly key: string
                                                readonly value: string
                                            }
                                        }>
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly BrPaymentRemoveCustomPaymentMethod: {
        readonly module: 'WASmaxBrPaymentRemoveCustomPaymentMethodRPC'
        readonly opName: 'RemoveCustomPaymentMethod'
        readonly xmlns: 'w:pay'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'w:pay'
        }
        readonly children: {
            readonly account: {
                readonly tag: 'account'
                readonly attrs: {
                    readonly action: 'remove-custom-payment-method'
                    readonly country: 'BR'
                    readonly credential_id: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly account: {
                    readonly tag: 'account'
                    readonly attrs: {
                        readonly action: string
                        readonly 'instance-id'?: string
                        readonly version?: number
                        readonly 'wa-support-phone-number'?: string
                    }
                    readonly children: {
                        readonly alias: ReadonlyArray<{
                            readonly tag: 'alias'
                            readonly attrs: {
                                readonly alias_id: string
                                readonly alias_status?: 'active' | 'active_pending' | 'active_status_pending' | 'available' | 'available_pending' | 'available_status_pending' | 'blocked' | 'deregistered' | 'deregistered_pending' | 'inactive' | 'inactive_pending' | 'inactive_status_pending' | 'unknown'
                                readonly alias_type: 'mobile_number' | 'numeric_id'
                                readonly alias_value: string
                                readonly type?: string
                            }
                        }>
                        readonly bank: ReadonlyArray<{
                            readonly tag: 'bank'
                            readonly attrs: {
                                readonly 'account-name'?: string
                                readonly 'account-number': string
                                readonly 'account-ref-id'?: string
                                readonly 'account-type'?: string
                                readonly 'atm-pin-length': number
                                readonly 'bank-name'?: string
                                readonly 'bank-phone-number'?: string
                                readonly 'bank-ref-id'?: number
                                readonly code?: string
                                readonly country?: string
                                readonly created?: string
                                readonly 'credential-id'?: string
                                readonly 'default-credit'?: '0' | '1'
                                readonly 'default-credit-p2m'?: '0' | '1'
                                readonly 'default-credit-p2p'?: '0' | '1'
                                readonly 'default-debit'?: '0' | '1'
                                readonly 'default-debit-p2m'?: '0' | '1'
                                readonly 'default-debit-p2p'?: '0' | '1'
                                readonly 'ifsc-code'?: string
                                readonly image?: string
                                readonly 'is-aadhaar-enabled'?: '0' | '1'
                                readonly 'is-mpin-set': '0' | '1'
                                readonly is_international_pay_enabled?: '0' | '1'
                                readonly mmid?: string
                                readonly 'mpin-length': number
                                readonly 'otp-length': number
                                readonly 'p2m-eligible'?: '0' | '1'
                                readonly 'p2p-eligible'?: '0' | '1'
                                readonly 'pin-format-version': '1' | '2'
                                readonly provider: string
                                readonly 'transaction-prefix'?: string
                                readonly type: 'upi'
                                readonly 'upi-bank-info'?: string
                                readonly vpa?: string
                                readonly 'vpa-id'?: string
                            }
                        }>
                        readonly card: ReadonlyArray<{
                            readonly tag: 'card'
                            readonly attrs: {
                                readonly 'automatic-binding'?: '0' | '1'
                                readonly 'bank-name'?: string
                                readonly 'bank-phone-number'?: string
                                readonly 'binding-type'?: string
                                readonly country?: string
                                readonly created?: string
                                readonly 'credential-id'?: string
                                readonly 'default-credit'?: '0' | '1'
                                readonly 'default-credit-p2m'?: '0' | '1'
                                readonly 'default-credit-p2p'?: '0' | '1'
                                readonly 'default-debit'?: '0' | '1'
                                readonly 'default-debit-p2m'?: '0' | '1'
                                readonly 'default-debit-p2p'?: '0' | '1'
                                readonly 'display-state'?: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'VOIDED'
                                readonly image?: string
                                readonly 'image-content-id'?: string
                                readonly last4?: string
                                readonly 'needs-device-binding'?: '0' | '1'
                                readonly 'network-type'?: string
                                readonly 'p2m-eligible'?: '0' | '1'
                                readonly 'p2p-eligible'?: '0' | '1'
                                readonly state?: 'ACTIVE' | 'DELETED' | 'INACTIVE' | 'NEEDS_RETOKENIZATION' | 'NEEDS_RETOKENIZATION_DELETED' | 'SUSPENDED'
                                readonly 'time-last-added'?: string
                                readonly type?: string
                                readonly verified?: '0' | '1'
                            }
                            readonly children: {
                                readonly capabilities: {
                                    readonly tag: 'capabilities'
                                    readonly attrs: {
                                        readonly 'default-eligible': '0' | '1'
                                        readonly 'default-eligible-p2m'?: '0' | '1'
                                        readonly 'default-eligible-p2p'?: '0' | '1'
                                        readonly editable: '0' | '1'
                                        readonly 'p2m-receive': 'DISABLED' | 'ENABLED' | 'REQUIRES_VERIFICATION'
                                        readonly 'p2m-send': 'DISABLED' | 'ENABLED' | 'REQUIRES_VERIFICATION'
                                        readonly 'p2p-receive': 'DISABLED' | 'ENABLED' | 'REQUIRES_VERIFICATION'
                                        readonly 'p2p-send': 'DISABLED' | 'ENABLED' | 'REQUIRES_VERIFICATION'
                                        readonly verifiable: '0' | '1'
                                    }
                                }
                            }
                        }>
                        readonly custom_payment_method: ReadonlyArray<{
                            readonly tag: 'custom_payment_method'
                            readonly attrs: {
                                readonly country?: 'BR'
                                readonly created?: string
                                readonly 'credential-id'?: string
                                readonly flow?: 'p2m' | 'p2p'
                                readonly 'p2m-eligible'?: '0' | '1'
                                readonly 'p2p-eligible'?: '0' | '1'
                                readonly type: 'pay_on_delivery' | 'pix_key'
                            }
                            readonly children: {
                                readonly metadata_info: {
                                    readonly tag: 'metadata_info'
                                    readonly children: {
                                        readonly metadata: ReadonlyArray<{
                                            readonly tag: 'metadata'
                                            readonly attrs: {
                                                readonly key: string
                                                readonly value: string
                                            }
                                        }>
                                    }
                                }
                            }
                        }>
                        readonly merchant: ReadonlyArray<{
                            readonly tag: 'merchant'
                            readonly attrs: {
                                readonly 'business-name'?: string
                                readonly 'can-add-payout': '0' | '1'
                                readonly 'can-payout': '0' | '1'
                                readonly 'can-sell': '0' | '1'
                                readonly country?: string
                                readonly created?: string
                                readonly 'credential-id'?: string
                                readonly 'dashboard-url'?: string
                                readonly 'display-state': 'ACCOUNT_PENDING_LINKING' | 'ACTIVE' | 'EXTERNALLY_DISABLED' | 'HARD_BLOCKED' | 'INACTIVE' | 'INITED' | 'INTEGRITY_BLOCKED' | 'PENDING' | 'SOFT_BLOCKED'
                                readonly 'gateway-name'?: string
                                readonly 'logo-uri'?: string
                                readonly max_installment_count?: number
                                readonly 'merchant-id': string
                                readonly 'p2m-eligible'?: '0' | '1'
                                readonly 'p2p-eligible'?: '0' | '1'
                                readonly 'pix-onboarding-state'?: '0' | '1' | '2'
                                readonly 'provider-type'?: string
                                readonly 'support-phone-number'?: string
                            }
                            readonly children: {
                                readonly payout: ReadonlyArray<{
                                    readonly tag: 'payout'
                                    readonly attrs: {
                                        readonly 'account-number'?: string
                                        readonly 'bank-name'?: string
                                        readonly code?: string
                                        readonly country?: string
                                        readonly created?: string
                                        readonly 'credential-id'?: string
                                        readonly last4?: string
                                        readonly 'p2m-eligible'?: '0' | '1'
                                        readonly 'p2p-eligible'?: '0' | '1'
                                        readonly type?: 'bank'
                                        readonly 'verification-status'?: 'FAILED' | 'PENDING' | 'VERIFIED'
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly ChatstateClientNotification: {
        readonly module: 'WASmaxChatstateClientNotificationRPC'
        readonly opName: 'ClientNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'chatstate'
        readonly attrs: {
            readonly to: string
        }
        readonly children: {
            readonly composing: {
                readonly tag: 'composing'
                readonly attrs: {
                    readonly media?: 'audio'
                }
            }
            readonly paused: {
                readonly tag: 'paused'
            }
            readonly test: {
                readonly tag: 'test'
                readonly attrs: {
                    readonly config?: string
                }
            }
        }
    }
        readonly response:
        | never
    }
    readonly ChatstateServerNotification: {
        readonly module: 'WASmaxChatstateServerNotificationRPC'
        readonly opName: 'ServerNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'chatstate'
            readonly attrs: {
                readonly from?: string
                readonly participant?: string
                readonly participant_pn?: string
                readonly to: string
            }
            readonly children: {
                readonly composing: {
                    readonly tag: 'composing'
                    readonly attrs: {
                        readonly media?: 'audio'
                    }
                }
                readonly paused: {
                    readonly tag: 'paused'
                }
                readonly test: {
                    readonly tag: 'test'
                    readonly attrs: {
                        readonly config?: string
                    }
                }
            }
        } }
    }
    readonly ClientExpirationClientExpiration: {
        readonly module: 'WASmaxClientExpirationClientExpirationRPC'
        readonly opName: 'ClientExpiration'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly client_expiration: {
                    readonly tag: 'client_expiration'
                    readonly attrs: {
                        readonly t?: number
                    }
                }
                readonly item: {
                    readonly tag: 'item'
                    readonly attrs: {
                        readonly from: string
                        readonly t: number
                    }
                }
                readonly offline: {
                    readonly tag: 'offline'
                    readonly attrs: {
                        readonly count: number
                    }
                }
                readonly offline_batch: {
                    readonly tag: 'offline_batch'
                    readonly attrs: {
                        readonly count: number
                    }
                }
                readonly offline_preview: {
                    readonly tag: 'offline_preview'
                    readonly attrs: {
                        readonly count: number
                        readonly message: number
                        readonly notification: number
                        readonly receipt: number
                    }
                }
                readonly thread_metadata: {
                    readonly tag: 'thread_metadata'
                }
                readonly unified_session: {
                    readonly tag: 'unified_session'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
    }
    readonly ClientLogLog: {
        readonly module: 'WASmaxClientLogLogRPC'
        readonly opName: 'Log'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'server'
            }
            readonly children: {
                readonly log: {
                    readonly tag: 'log'
                    readonly attrs: {
                        readonly end_t?: number
                        readonly start_t?: number
                    }
                }
            }
        } }
    }
    readonly CoexistenceOffboardingNotification: {
        readonly module: 'WASmaxCoexistenceOffboardingNotificationRPC'
        readonly opName: 'OffboardingNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'hosted'
            }
            readonly children: {
                readonly offboarding: {
                    readonly tag: 'offboarding'
                    readonly attrs: {
                        readonly product_surface: 'ai_from_meta' | 'automation' | 'business_platform'
                    }
                    readonly children: {
                        readonly provider_info: {
                            readonly tag: 'provider_info'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: number
                                } | undefined
                                readonly logo_url: {
                                    readonly tag: 'logo_url'
                                    readonly content: Uint8Array
                                } | undefined
                                readonly name: {
                                    readonly tag: 'name'
                                    readonly content: Uint8Array
                                } | undefined
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly CoexistenceOnboardingStatusNotification: {
        readonly module: 'WASmaxCoexistenceOnboardingStatusNotificationRPC'
        readonly opName: 'OnboardingStatusNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'hosted'
            }
            readonly children: {
                readonly onboarding_status: {
                    readonly tag: 'onboarding_status'
                    readonly attrs: {
                        readonly product_surface: 'ai_from_meta' | 'automation' | 'business_platform'
                        readonly status: 'completed' | 'failed'
                    }
                    readonly children: {
                        readonly provider_info: {
                            readonly tag: 'provider_info'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: number
                                } | undefined
                                readonly logo_url: {
                                    readonly tag: 'logo_url'
                                    readonly content: Uint8Array
                                } | undefined
                                readonly name: {
                                    readonly tag: 'name'
                                    readonly content: Uint8Array
                                } | undefined
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly CoexistenceSyncNotification: {
        readonly module: 'WASmaxCoexistenceSyncNotificationRPC'
        readonly opName: 'SyncNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'hosted'
            }
        } }
    }
    readonly DevicesChangeNotification: {
        readonly module: 'WASmaxDevicesChangeNotificationRPC'
        readonly opName: 'ChangeNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'fbid:devices'
            }
            readonly children: {
                readonly devices: {
                    readonly tag: 'devices'
                    readonly attrs: {
                        readonly dhash: string
                    }
                    readonly children: {
                        readonly device: ReadonlyArray<{
                            readonly tag: 'device'
                            readonly attrs: {
                                readonly id: number
                            }
                            readonly children: {
                                readonly identity: {
                                    readonly tag: 'identity'
                                    readonly content: Uint8Array
                                }
                                readonly model: {
                                    readonly tag: 'model'
                                    readonly content: string
                                } | undefined
                                readonly platform: {
                                    readonly tag: 'platform'
                                    readonly content: string
                                } | undefined
                            }
                        }>
                    }
                } | undefined
                readonly icdc: {
                    readonly tag: 'icdc'
                    readonly attrs: {
                        readonly dirty: 'true'
                        readonly seq: number
                        readonly ts: number
                    }
                    readonly content: Uint8Array
                } | undefined
            }
        } }
    }
    readonly DevicesFetch: {
        readonly module: 'WASmaxDevicesFetchRPC'
        readonly opName: 'Fetch'
        readonly xmlns: 'fbid:devices'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fbid:devices'
        }
        readonly children: {
            readonly users: {
                readonly tag: 'users'
                readonly children: {
                    readonly user: ReadonlyArray<{
                        readonly tag: 'user'
                        readonly attrs: {
                            readonly dhash: string
                            readonly jid: string
                            readonly seq: number
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly backoff?: number
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly users: {
                    readonly tag: 'users'
                    readonly children: {
                        readonly user: ReadonlyArray<{
                            readonly tag: 'user'
                            readonly attrs: {
                                readonly jid?: string
                            }
                            readonly children: {
                                readonly devices: {
                                    readonly tag: 'devices'
                                    readonly attrs: {
                                        readonly dhash: string
                                    }
                                    readonly children: {
                                        readonly device: ReadonlyArray<{
                                            readonly tag: 'device'
                                            readonly attrs: {
                                                readonly id: number
                                            }
                                            readonly children: {
                                                readonly identity: {
                                                    readonly tag: 'identity'
                                                    readonly content: Uint8Array
                                                }
                                                readonly model: {
                                                    readonly tag: 'model'
                                                    readonly content: string
                                                } | undefined
                                                readonly platform: {
                                                    readonly tag: 'platform'
                                                    readonly content: string
                                                } | undefined
                                            }
                                        }>
                                    }
                                } | undefined
                                readonly error: {
                                    readonly tag: 'error'
                                    readonly attrs: {
                                        readonly code?: number
                                        readonly text?: 'internal-server-error'
                                    }
                                }
                                readonly icdc: {
                                    readonly tag: 'icdc'
                                    readonly attrs: {
                                        readonly dirty: 'true'
                                        readonly seq: number
                                        readonly ts: number
                                    }
                                    readonly content: Uint8Array
                                } | undefined
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly DevicesFetchSelf: {
        readonly module: 'WASmaxDevicesFetchSelfRPC'
        readonly opName: 'FetchSelf'
        readonly xmlns: 'fbid:devices'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fbid:devices'
        }
        readonly children: {
            readonly self: {
                readonly tag: 'self'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly backoff?: number
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly self: {
                    readonly tag: 'self'
                    readonly children: {
                        readonly device: ReadonlyArray<{
                            readonly tag: 'device'
                            readonly attrs: {
                                readonly id: number
                            }
                            readonly children: {
                                readonly creation: {
                                    readonly tag: 'creation'
                                    readonly content: number
                                } | undefined
                                readonly identity: {
                                    readonly tag: 'identity'
                                    readonly content: Uint8Array
                                }
                                readonly ip: {
                                    readonly tag: 'ip'
                                    readonly content: string
                                } | undefined
                                readonly location: {
                                    readonly tag: 'location'
                                    readonly attrs: {
                                        readonly latitude: string
                                        readonly longitude: string
                                    }
                                    readonly content: string
                                } | undefined
                                readonly manufacturer: {
                                    readonly tag: 'manufacturer'
                                    readonly content: string
                                } | undefined
                                readonly model: {
                                    readonly tag: 'model'
                                    readonly content: string
                                } | undefined
                                readonly platform: {
                                    readonly tag: 'platform'
                                    readonly content: string
                                } | undefined
                                readonly seen: {
                                    readonly tag: 'seen'
                                    readonly content: number
                                } | undefined
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly DevicesNotify: {
        readonly module: 'WASmaxDevicesNotifyRPC'
        readonly opName: 'Notify'
        readonly xmlns: 'fbid:devices'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'fbid:devices'
        }
        readonly children: {
            readonly users: {
                readonly tag: 'users'
                readonly children: {
                    readonly user: ReadonlyArray<{
                        readonly tag: 'user'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly backoff?: number
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly DevicesRemove: {
        readonly module: 'WASmaxDevicesRemoveRPC'
        readonly opName: 'Remove'
        readonly xmlns: 'fbid:devices'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'fbid:devices'
        }
        readonly children: {
            readonly remove: {
                readonly tag: 'remove'
                readonly attrs: {
                    readonly id: number
                }
                readonly children: {
                    readonly identity: {
                        readonly tag: 'identity'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly backoff?: number
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly DirtyBitsClean: {
        readonly module: 'WASmaxDirtyBitsCleanRPC'
        readonly opName: 'Clean'
        readonly xmlns: 'urn:xmpp:whatsapp:dirty'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'urn:xmpp:whatsapp:dirty'
        }
        readonly children: {
            readonly clean: {
                readonly tag: 'clean'
                readonly attrs: {
                    readonly timestamp?: number
                    readonly type: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly DirtyBitsNotify: {
        readonly module: 'WASmaxDirtyBitsNotifyRPC'
        readonly opName: 'Notify'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly dirty: {
                    readonly tag: 'dirty'
                    readonly attrs: {
                        readonly timestamp: number
                        readonly type: 'account_sync' | 'groups' | 'native_contact_restore' | 'newsletter_metadata' | 'syncd_app_state'
                    }
                }
            }
        } }
    }
    readonly EdgeEdgeRouting: {
        readonly module: 'WASmaxEdgeEdgeRoutingRPC'
        readonly opName: 'EdgeRouting'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly edge_routing: {
                    readonly tag: 'edge_routing'
                    readonly children: {
                        readonly routing_info: {
                            readonly tag: 'routing_info'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly GroupsAcceptGroupAdd: {
        readonly module: 'WASmaxGroupsAcceptGroupAddRPC'
        readonly opName: 'AcceptGroupAdd'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly accept: {
                readonly tag: 'accept'
                readonly attrs: {
                    readonly admin: string
                    readonly code: string
                    readonly expiration: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'already-exists'
                    }
                }
            }
        } }
        | { readonly variant: 'GroupJoinRequestSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly GroupsAcknowledgeGroup: {
        readonly module: 'WASmaxGroupsAcknowledgeGroupRPC'
        readonly opName: 'AcknowledgeGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly ack: {
                readonly tag: 'ack'
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'item-not-found'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly GroupsAddNotification: {
        readonly module: 'WASmaxGroupsAddNotificationRPC'
        readonly opName: 'AddNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant?: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly add: {
                    readonly tag: 'add'
                    readonly attrs: {
                        readonly prev_v_id?: string
                        readonly reason?: 'accept' | 'auto_add' | 'default_sub_group_promote' | 'invite' | 'invite_auto_add' | 'linked_group_join'
                        readonly v_id: string
                    }
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly addressable?: 'false'
                                readonly display_name?: string
                                readonly group_history_sent?: 'false' | 'true'
                                readonly jid?: string
                                readonly join_time?: number
                                readonly lid?: string
                                readonly participant_label?: string
                                readonly participant_label_mtime?: number
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsAddParticipants: {
        readonly module: 'WASmaxGroupsAddParticipantsRPC'
        readonly opName: 'AddParticipants'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly add: {
                readonly tag: 'add'
                readonly children: {
                    readonly participant: ReadonlyArray<{
                        readonly tag: 'participant'
                        readonly attrs: {
                            readonly jid: string
                            readonly phone_number?: string
                            readonly username?: string
                        }
                        readonly children: {
                            readonly privacy: {
                                readonly tag: 'privacy'
                            }
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                    readonly children: {
                        readonly rate_limit: {
                            readonly tag: 'rate_limit'
                            readonly attrs: {
                                readonly backoff?: number
                                readonly participant_limit?: number
                                readonly type?: 'group' | 'user'
                            }
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly add: {
                    readonly tag: 'add'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly addressable?: 'false'
                                readonly error?: '421'
                                readonly jid?: string
                                readonly join_time?: number
                                readonly phone_number?: string
                                readonly username?: string
                            }
                            readonly children: {
                                readonly add_request: {
                                    readonly tag: 'add_request'
                                    readonly attrs: {
                                        readonly code?: string
                                        readonly expiration?: number
                                    }
                                }
                                readonly membership_approval_request: {
                                    readonly tag: 'membership_approval_request'
                                    readonly attrs: {
                                        readonly error?: '304' | '419'
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsBatchGetGroupInfo: {
        readonly module: 'WASmaxGroupsBatchGetGroupInfoRPC'
        readonly opName: 'BatchGetGroupInfo'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 'g.us'
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly query: {
                readonly tag: 'query'
                readonly attrs: {
                    readonly context?: string
                }
                readonly children: {
                    readonly group: ReadonlyArray<{
                        readonly tag: 'group'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly groups: {
                    readonly tag: 'groups'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly a_v_id?: string
                                readonly ack?: 'false'
                                readonly addressing_mode?: 'lid' | 'pn'
                                readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                                readonly creation?: number
                                readonly creator?: string
                                readonly creator_country_code?: string
                                readonly creator_pn?: string
                                readonly creator_username?: string
                                readonly error?: '403'
                                readonly id?: string
                                readonly key: string
                                readonly open_thread_id?: string
                                readonly p_v_id?: string
                                readonly s_o?: string
                                readonly s_o_pn?: string
                                readonly s_o_username?: string
                                readonly s_t?: number
                                readonly size?: number
                                readonly subject?: string
                                readonly truncated?: 'true'
                            }
                            readonly children: {
                                readonly appeal_status: {
                                    readonly tag: 'appeal_status'
                                    readonly attrs: {
                                        readonly type: 'approved' | 'in_review' | 'none' | 'rejected'
                                    }
                                } | undefined
                                readonly appeal_update_time: {
                                    readonly tag: 'appeal_update_time'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly description: {
                                    readonly tag: 'description'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly participant?: string
                                        readonly participant_pn: string
                                        readonly participant_username: string
                                        readonly t: number
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                    }
                                } | undefined
                                readonly ephemeral: {
                                    readonly tag: 'ephemeral'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly evolution_version: {
                                    readonly tag: 'evolution_version'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly growth_locked: {
                                    readonly tag: 'growth_locked'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly type: 'invite'
                                    }
                                } | undefined
                                readonly limit_sharing_enabled: {
                                    readonly tag: 'limit_sharing_enabled'
                                    readonly attrs: {
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly linked_parent: {
                                    readonly tag: 'linked_parent'
                                    readonly attrs: {
                                        readonly jid: string
                                    }
                                } | undefined
                                readonly member_add_mode: {
                                    readonly tag: 'member_add_mode'
                                    readonly content: 'admin_add' | 'all_member_add'
                                }
                                readonly member_link_mode: {
                                    readonly tag: 'member_link_mode'
                                    readonly content: 'admin_link' | 'all_member_link'
                                }
                                readonly member_share_group_history_mode: {
                                    readonly tag: 'member_share_group_history_mode'
                                    readonly content: 'admin_share' | 'all_member_share'
                                }
                                readonly membership_approval_mode: {
                                    readonly tag: 'membership_approval_mode'
                                    readonly children: {
                                        readonly group_join: {
                                            readonly tag: 'group_join'
                                            readonly attrs: {
                                                readonly state?: 'on'
                                            }
                                        }
                                    }
                                } | undefined
                                readonly parent: {
                                    readonly tag: 'parent'
                                    readonly attrs: {
                                        readonly default_membership_approval_mode: 'request_required'
                                    }
                                } | undefined
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly addressable?: 'false'
                                        readonly display_name?: string
                                        readonly group_history_sent?: 'false' | 'true'
                                        readonly jid?: string
                                        readonly join_time?: number
                                        readonly lid?: string
                                        readonly participant_label?: string
                                        readonly participant_label_mtime?: number
                                        readonly phone_number?: string
                                        readonly type?: 'admin' | 'superadmin'
                                        readonly username?: string
                                    }
                                }>
                                readonly suspended: {
                                    readonly tag: 'suspended'
                                    readonly attrs: {
                                        readonly can_auto_file?: 'true'
                                    }
                                } | undefined
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsCancelGroupMembershipRequests: {
        readonly module: 'WASmaxGroupsCancelGroupMembershipRequestsRPC'
        readonly opName: 'CancelGroupMembershipRequests'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly cancel_membership_requests: {
                readonly tag: 'cancel_membership_requests'
                readonly children: {
                    readonly participant: ReadonlyArray<{
                        readonly tag: 'participant'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly cancel_membership_requests: {
                    readonly tag: 'cancel_membership_requests'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly error?: '404'
                                readonly jid: string
                                readonly phone_number?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsCreate: {
        readonly module: 'WASmaxGroupsCreateRPC'
        readonly opName: 'Create'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 'g.us'
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly create: {
                readonly tag: 'create'
                readonly attrs: {
                    readonly create_ctx?: string
                    readonly key: string
                    readonly subject: string
                }
                readonly children: {
                    readonly addressing_mode_override: {
                        readonly tag: 'addressing_mode_override'
                        readonly attrs: {
                            readonly mode: 'lid' | 'pn'
                        }
                    } | undefined
                    readonly allow_non_admin_sub_group_creation: {
                        readonly tag: 'allow_non_admin_sub_group_creation'
                    } | undefined
                    readonly announcement: {
                        readonly tag: 'announcement'
                    } | undefined
                    readonly breakout: {
                        readonly tag: 'breakout'
                    } | undefined
                    readonly capi: {
                        readonly tag: 'capi'
                    } | undefined
                    readonly create_general_chat: {
                        readonly tag: 'create_general_chat'
                    } | undefined
                    readonly created_as_lid: {
                        readonly tag: 'created_as_lid'
                    } | undefined
                    readonly description: {
                        readonly tag: 'description'
                        readonly attrs: {
                            readonly id: string
                        }
                        readonly children: {
                            readonly body: {
                                readonly tag: 'body'
                            }
                        }
                    } | undefined
                    readonly ephemeral: {
                        readonly tag: 'ephemeral'
                        readonly attrs: {
                            readonly expiration: number
                            readonly trigger?: number
                        }
                    } | undefined
                    readonly hidden_group: {
                        readonly tag: 'hidden_group'
                    } | undefined
                    readonly linked_parent: {
                        readonly tag: 'linked_parent'
                        readonly attrs: {
                            readonly jid: string
                        }
                    } | undefined
                    readonly locked: {
                        readonly tag: 'locked'
                    } | undefined
                    readonly member_add_mode: {
                        readonly tag: 'member_add_mode'
                    }
                    readonly member_link_mode: {
                        readonly tag: 'member_link_mode'
                    }
                    readonly member_share_group_history_mode: {
                        readonly tag: 'member_share_group_history_mode'
                    }
                    readonly membership_approval_mode: {
                        readonly tag: 'membership_approval_mode'
                        readonly children: {
                            readonly group_join: {
                                readonly tag: 'group_join'
                                readonly attrs: {
                                    readonly state: 'on'
                                }
                            }
                        }
                    } | undefined
                    readonly no_frequently_forwarded: {
                        readonly tag: 'no_frequently_forwarded'
                    } | undefined
                    readonly parent: {
                        readonly tag: 'parent'
                        readonly attrs: {
                            readonly default_membership_approval_mode: 'request_required'
                        }
                    } | undefined
                    readonly participant: ReadonlyArray<{
                        readonly tag: 'participant'
                        readonly attrs: {
                            readonly jid: string
                            readonly phone_number?: string
                            readonly username?: string
                        }
                        readonly children: {
                            readonly privacy: {
                                readonly tag: 'privacy'
                            }
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'forbidden'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                        readonly rate_limit: {
                            readonly tag: 'rate_limit'
                            readonly attrs: {
                                readonly backoff?: number
                                readonly participant_limit?: number
                                readonly type?: 'group' | 'user'
                            }
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'GroupAlreadyExists'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 'g.us'
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly group: {
                    readonly tag: 'group'
                    readonly attrs: {
                        readonly jid: string
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 'g.us'
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly group: {
                    readonly tag: 'group'
                    readonly attrs: {
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                        readonly creation: number
                        readonly creator: string
                        readonly creator_country_code?: string
                        readonly creator_pn?: string
                        readonly creator_username?: string
                        readonly id: string
                        readonly key: string
                        readonly s_o?: string
                        readonly s_o_pn?: string
                        readonly s_o_username?: string
                        readonly s_t?: number
                        readonly subject?: string
                    }
                    readonly children: {
                        readonly description: {
                            readonly tag: 'description'
                            readonly attrs: {
                                readonly error?: '406' | '500'
                                readonly id: string
                            }
                        } | undefined
                        readonly ephemeral: {
                            readonly tag: 'ephemeral'
                            readonly attrs: {
                                readonly expiration: number
                                readonly trigger?: number
                            }
                        } | undefined
                        readonly linked_parent: {
                            readonly tag: 'linked_parent'
                            readonly attrs: {
                                readonly jid: string
                            }
                        } | undefined
                        readonly member_add_mode: {
                            readonly tag: 'member_add_mode'
                            readonly content: 'admin_add' | 'all_member_add'
                        }
                        readonly member_link_mode: {
                            readonly tag: 'member_link_mode'
                            readonly content: 'admin_link' | 'all_member_link'
                        }
                        readonly member_share_group_history_mode: {
                            readonly tag: 'member_share_group_history_mode'
                            readonly content: 'admin_share' | 'all_member_share'
                        }
                        readonly membership_approval_mode: {
                            readonly tag: 'membership_approval_mode'
                            readonly children: {
                                readonly group_join: {
                                    readonly tag: 'group_join'
                                    readonly attrs: {
                                        readonly state?: 'on'
                                    }
                                }
                            }
                        } | undefined
                        readonly parent: {
                            readonly tag: 'parent'
                            readonly attrs: {
                                readonly default_membership_approval_mode: 'request_required'
                            }
                        } | undefined
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly addressable?: 'false'
                                readonly error?: '417'
                                readonly jid?: string
                                readonly join_time?: number
                                readonly phone_number?: string
                                readonly type?: 'admin' | 'superadmin'
                                readonly username?: string
                            }
                            readonly children: {
                                readonly add_request: {
                                    readonly tag: 'add_request'
                                    readonly attrs: {
                                        readonly code?: string
                                        readonly expiration?: number
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsCreateSubGroupSuggestion: {
        readonly module: 'WASmaxGroupsCreateSubGroupSuggestionRPC'
        readonly opName: 'CreateSubGroupSuggestion'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly sub_group_suggestion: {
                readonly tag: 'sub_group_suggestion'
                readonly attrs: {
                    readonly jid: string
                }
                readonly children: {
                    readonly body: {
                        readonly tag: 'body'
                    }
                    readonly group_join: {
                        readonly tag: 'group_join'
                        readonly attrs: {
                            readonly state: 'on'
                        }
                    }
                    readonly hidden_group: {
                        readonly tag: 'hidden_group'
                    } | undefined
                    readonly member_add_mode: {
                        readonly tag: 'member_add_mode'
                    }
                    readonly member_link_mode: {
                        readonly tag: 'member_link_mode'
                    }
                    readonly member_share_group_history_mode: {
                        readonly tag: 'member_share_group_history_mode'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'forbidden'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ExistingGroupsSuggestionSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly sub_group_suggestion: {
                    readonly tag: 'sub_group_suggestion'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly error?: '401'
                                readonly jid: string
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'NewGroupSuggestionSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly sub_group_suggestion: {
                    readonly tag: 'sub_group_suggestion'
                    readonly attrs: {
                        readonly creation: number
                        readonly creator: string
                        readonly creator_pn?: string
                        readonly jid: string
                    }
                    readonly children: {
                        readonly description: {
                            readonly tag: 'description'
                            readonly attrs: {
                                readonly error?: '406'
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
    }
    readonly GroupsDeleteNotification: {
        readonly module: 'WASmaxGroupsDeleteNotificationRPC'
        readonly opName: 'DeleteNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant?: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly delete: {
                    readonly tag: 'delete'
                    readonly attrs: {
                        readonly reason?: 'deactivate_general_chat' | 'delete_capi' | 'delete_parent' | 'integrity_delete_parent'
                    }
                }
            }
        } }
    }
    readonly GroupsDeleteParentGroup: {
        readonly module: 'WASmaxGroupsDeleteParentGroupRPC'
        readonly opName: 'DeleteParentGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly delete_parent: {
                readonly tag: 'delete_parent'
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly GroupsDemoteNotification: {
        readonly module: 'WASmaxGroupsDemoteNotificationRPC'
        readonly opName: 'DemoteNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly demote: {
                    readonly tag: 'demote'
                    readonly attrs: {
                        readonly prev_v_id?: string
                        readonly v_id: string
                    }
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly display_name?: string
                                readonly jid?: string
                                readonly lid?: string
                                readonly phone_number?: string
                                readonly type?: 'admin' | 'superadmin'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsGetGroupInfo: {
        readonly module: 'WASmaxGroupsGetGroupInfoRPC'
        readonly opName: 'GetGroupInfo'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly query: {
                readonly tag: 'query'
                readonly attrs: {
                    readonly phash?: string
                    readonly request: string
                }
                readonly children: {
                    readonly add_request: {
                        readonly tag: 'add_request'
                        readonly attrs: {
                            readonly admin: string
                            readonly code: string
                            readonly expiration: number
                        }
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'gone'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly group: {
                    readonly tag: 'group'
                    readonly attrs: {
                        readonly a_v_id?: string
                        readonly ack?: 'false'
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                        readonly creation?: number
                        readonly creator?: string
                        readonly creator_country_code?: string
                        readonly creator_pn?: string
                        readonly creator_username?: string
                        readonly id?: string
                        readonly key: string
                        readonly open_thread_id?: string
                        readonly p_v_id?: string
                        readonly s_o?: string
                        readonly s_o_pn?: string
                        readonly s_o_username?: string
                        readonly s_t?: number
                        readonly size?: number
                        readonly subject?: string
                    }
                    readonly children: {
                        readonly appeal_status: {
                            readonly tag: 'appeal_status'
                            readonly attrs: {
                                readonly type: 'approved' | 'in_review' | 'none' | 'rejected'
                            }
                        } | undefined
                        readonly appeal_update_time: {
                            readonly tag: 'appeal_update_time'
                            readonly attrs: {
                                readonly value: number
                            }
                        } | undefined
                        readonly description: {
                            readonly tag: 'description'
                            readonly attrs: {
                                readonly id: string
                                readonly participant?: string
                                readonly participant_pn: string
                                readonly participant_username: string
                                readonly t: number
                            }
                            readonly children: {
                                readonly body: {
                                    readonly tag: 'body'
                                    readonly content: string
                                }
                            }
                        } | undefined
                        readonly ephemeral: {
                            readonly tag: 'ephemeral'
                            readonly attrs: {
                                readonly expiration: number
                                readonly trigger?: number
                            }
                        } | undefined
                        readonly evolution_version: {
                            readonly tag: 'evolution_version'
                            readonly attrs: {
                                readonly value: number
                            }
                        } | undefined
                        readonly growth_locked: {
                            readonly tag: 'growth_locked'
                            readonly attrs: {
                                readonly expiration: number
                                readonly type: 'invite'
                            }
                        } | undefined
                        readonly limit_sharing_enabled: {
                            readonly tag: 'limit_sharing_enabled'
                            readonly attrs: {
                                readonly trigger?: number
                            }
                        } | undefined
                        readonly linked_parent: {
                            readonly tag: 'linked_parent'
                            readonly attrs: {
                                readonly jid: string
                            }
                        } | undefined
                        readonly member_add_mode: {
                            readonly tag: 'member_add_mode'
                            readonly content: 'admin_add' | 'all_member_add'
                        }
                        readonly member_link_mode: {
                            readonly tag: 'member_link_mode'
                            readonly content: 'admin_link' | 'all_member_link'
                        }
                        readonly member_share_group_history_mode: {
                            readonly tag: 'member_share_group_history_mode'
                            readonly content: 'admin_share' | 'all_member_share'
                        }
                        readonly membership_approval_mode: {
                            readonly tag: 'membership_approval_mode'
                            readonly children: {
                                readonly group_join: {
                                    readonly tag: 'group_join'
                                    readonly attrs: {
                                        readonly state?: 'on'
                                    }
                                }
                            }
                        } | undefined
                        readonly parent: {
                            readonly tag: 'parent'
                            readonly attrs: {
                                readonly default_membership_approval_mode: 'request_required'
                            }
                        } | undefined
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly addressable?: 'false'
                                readonly display_name?: string
                                readonly group_history_sent?: 'false' | 'true'
                                readonly jid?: string
                                readonly join_time?: number
                                readonly lid?: string
                                readonly participant_label?: string
                                readonly participant_label_mtime?: number
                                readonly phone_number?: string
                                readonly type?: 'admin' | 'superadmin'
                                readonly username?: string
                            }
                        }>
                        readonly suspended: {
                            readonly tag: 'suspended'
                            readonly attrs: {
                                readonly can_auto_file?: 'true'
                            }
                        } | undefined
                    }
                } | undefined
            }
        } }
    }
    readonly GroupsGetGroupProfilePictures: {
        readonly module: 'WASmaxGroupsGetGroupProfilePicturesRPC'
        readonly opName: 'GetGroupProfilePictures'
        readonly xmlns: 'w:g2'
        readonly type: null
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly linked_groups_membership_hint: string
            readonly parent_group_jid: string
            readonly query: string
            readonly sub_group_jid: string
            readonly to: string
            readonly type: 'error' | 'get' | 'result' | 'set'
            readonly xmlns: 'w:g2'
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'item-not-found'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessGroupPictures'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly pictures: {
                    readonly tag: 'pictures'
                    readonly children: {
                        readonly picture: ReadonlyArray<{
                            readonly tag: 'picture'
                            readonly attrs: {
                                readonly direct_path?: string
                                readonly id?: string
                                readonly parent_group_jid?: string
                                readonly status?: '304'
                                readonly sub_group_jid?: string
                                readonly type?: 'image' | 'preview'
                                readonly url?: string
                            }
                            readonly content: Uint8Array
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsGetInviteGroupInfo: {
        readonly module: 'WASmaxGroupsGetInviteGroupInfoRPC'
        readonly opName: 'GetInviteGroupInfo'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 'g.us'
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly invite: {
                readonly tag: 'invite'
                readonly attrs: {
                    readonly code: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                        readonly growth_locked: {
                            readonly tag: 'growth_locked'
                            readonly attrs: {
                                readonly expiration: number
                                readonly type: 'invite'
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly group: {
                    readonly tag: 'group'
                    readonly attrs: {
                        readonly a_v_id?: string
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly creation?: number
                        readonly creator?: string
                        readonly creator_country_code?: string
                        readonly creator_pn?: string
                        readonly creator_username?: string
                        readonly id?: string
                        readonly open_thread_id?: string
                        readonly p_v_id?: string
                        readonly s_o?: string
                        readonly s_o_pn?: string
                        readonly s_o_username?: string
                        readonly s_t?: number
                        readonly size: number
                        readonly subject?: string
                    }
                    readonly children: {
                        readonly description: {
                            readonly tag: 'description'
                            readonly attrs: {
                                readonly id: string
                                readonly participant?: string
                                readonly participant_pn: string
                                readonly participant_username: string
                                readonly t: number
                            }
                            readonly children: {
                                readonly body: {
                                    readonly tag: 'body'
                                    readonly content: string
                                }
                            }
                        }
                        readonly ephemeral: {
                            readonly tag: 'ephemeral'
                            readonly attrs: {
                                readonly expiration: number
                                readonly trigger?: number
                            }
                        } | undefined
                        readonly linked_parent: {
                            readonly tag: 'linked_parent'
                            readonly attrs: {
                                readonly jid: string
                                readonly subject?: string
                            }
                        } | undefined
                        readonly membership_approval_mode: {
                            readonly tag: 'membership_approval_mode'
                            readonly children: {
                                readonly group_join: {
                                    readonly tag: 'group_join'
                                    readonly attrs: {
                                        readonly state?: 'on'
                                    }
                                }
                            }
                        } | undefined
                        readonly membership_approval_request: {
                            readonly tag: 'membership_approval_request'
                            readonly attrs: {
                                readonly error?: '304'
                            }
                        } | undefined
                        readonly parent: {
                            readonly tag: 'parent'
                            readonly attrs: {
                                readonly num_sub_groups: number
                            }
                        } | undefined
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly display_name?: string
                                readonly group_history_sent?: 'false' | 'true'
                                readonly jid?: string
                                readonly join_time?: number
                                readonly lid?: string
                                readonly participant_label?: string
                                readonly participant_label_mtime?: number
                                readonly phone_number?: string
                                readonly type?: 'admin' | 'superadmin'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsGetLinkedGroup: {
        readonly module: 'WASmaxGroupsGetLinkedGroupRPC'
        readonly opName: 'GetLinkedGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly sub_group_jid: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly query_linked: {
                readonly tag: 'query_linked'
                readonly attrs: {
                    readonly jid: string
                    readonly sub_group_jid: string
                    readonly type: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'item-not-found'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly linked_group: {
                    readonly tag: 'linked_group'
                    readonly attrs: {
                        readonly jid: string
                    }
                    readonly children: {
                        readonly group: {
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly a_v_id?: string
                                readonly addressing_mode?: 'lid' | 'pn'
                                readonly creation?: number
                                readonly creator?: string
                                readonly creator_country_code?: string
                                readonly creator_pn?: string
                                readonly creator_username?: string
                                readonly id?: string
                                readonly open_thread_id?: string
                                readonly p_v_id?: string
                                readonly s_o?: string
                                readonly s_o_pn?: string
                                readonly s_o_username?: string
                                readonly s_t?: number
                                readonly size: number
                                readonly subject?: string
                            }
                            readonly children: {
                                readonly appeal_status: {
                                    readonly tag: 'appeal_status'
                                    readonly attrs: {
                                        readonly type: 'approved' | 'in_review' | 'none' | 'rejected'
                                    }
                                } | undefined
                                readonly appeal_update_time: {
                                    readonly tag: 'appeal_update_time'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly description: {
                                    readonly tag: 'description'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly participant?: string
                                        readonly participant_pn: string
                                        readonly participant_username: string
                                        readonly t: number
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                    }
                                }
                                readonly limit_sharing_enabled: {
                                    readonly tag: 'limit_sharing_enabled'
                                    readonly attrs: {
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly membership_approval_mode: {
                                    readonly tag: 'membership_approval_mode'
                                    readonly children: {
                                        readonly group_join: {
                                            readonly tag: 'group_join'
                                            readonly attrs: {
                                                readonly state?: 'on'
                                            }
                                        }
                                    }
                                } | undefined
                                readonly membership_approval_request: {
                                    readonly tag: 'membership_approval_request'
                                    readonly attrs: {
                                        readonly error?: '304'
                                    }
                                } | undefined
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly display_name?: string
                                        readonly group_history_sent?: 'false' | 'true'
                                        readonly jid?: string
                                        readonly join_time?: number
                                        readonly lid?: string
                                        readonly participant_label?: string
                                        readonly participant_label_mtime?: number
                                        readonly phone_number?: string
                                        readonly type?: 'admin' | 'superadmin'
                                        readonly username?: string
                                    }
                                }>
                                readonly suspended: {
                                    readonly tag: 'suspended'
                                    readonly attrs: {
                                        readonly can_auto_file?: 'true'
                                    }
                                } | undefined
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly GroupsGetLinkedGroupsParticipants: {
        readonly module: 'WASmaxGroupsGetLinkedGroupsParticipantsRPC'
        readonly opName: 'GetLinkedGroupsParticipants'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly linked_groups_participants: {
                readonly tag: 'linked_groups_participants'
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly linked_groups_participants: {
                    readonly tag: 'linked_groups_participants'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid?: string
                                readonly phone_number?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsGetMembershipApprovalRequests: {
        readonly module: 'WASmaxGroupsGetMembershipApprovalRequestsRPC'
        readonly opName: 'GetMembershipApprovalRequests'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly membership_approval_requests: {
                readonly tag: 'membership_approval_requests'
                readonly attrs: {
                    readonly requestor_fetch: 'true'
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly membership_approval_requests: {
                    readonly tag: 'membership_approval_requests'
                    readonly attrs: {
                        readonly requestor_fetch: 'true'
                    }
                    readonly children: {
                        readonly membership_approval_request: ReadonlyArray<{
                            readonly tag: 'membership_approval_request'
                            readonly attrs: {
                                readonly jid: string
                                readonly parent_group_jid?: string
                                readonly phone_number?: string
                                readonly request_method: 'invite_link' | 'linked_group_join' | 'non_admin_add'
                                readonly request_time: number
                                readonly requestor?: string
                                readonly requestor_pn?: string
                                readonly requestor_username?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsGetParticipatingGroups: {
        readonly module: 'WASmaxGroupsGetParticipatingGroupsRPC'
        readonly opName: 'GetParticipatingGroups'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 'g.us'
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly participating: {
                readonly tag: 'participating'
                readonly children: {
                    readonly description: {
                        readonly tag: 'description'
                    } | undefined
                    readonly participants: {
                        readonly tag: 'participants'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly groups: {
                    readonly tag: 'groups'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly a_v_id?: string
                                readonly ack?: 'false'
                                readonly addressing_mode?: 'lid' | 'pn'
                                readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                                readonly creation?: number
                                readonly creator?: string
                                readonly creator_country_code?: string
                                readonly creator_pn?: string
                                readonly creator_username?: string
                                readonly id?: string
                                readonly key: string
                                readonly open_thread_id?: string
                                readonly p_v_id?: string
                                readonly s_o?: string
                                readonly s_o_pn?: string
                                readonly s_o_username?: string
                                readonly s_t?: number
                                readonly size?: number
                                readonly subject?: string
                                readonly truncated?: 'true'
                            }
                            readonly children: {
                                readonly appeal_status: {
                                    readonly tag: 'appeal_status'
                                    readonly attrs: {
                                        readonly type: 'approved' | 'in_review' | 'none' | 'rejected'
                                    }
                                } | undefined
                                readonly appeal_update_time: {
                                    readonly tag: 'appeal_update_time'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly description: {
                                    readonly tag: 'description'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly participant?: string
                                        readonly participant_pn: string
                                        readonly participant_username: string
                                        readonly t: number
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                    }
                                } | undefined
                                readonly ephemeral: {
                                    readonly tag: 'ephemeral'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly evolution_version: {
                                    readonly tag: 'evolution_version'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly growth_locked: {
                                    readonly tag: 'growth_locked'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly type: 'invite'
                                    }
                                } | undefined
                                readonly limit_sharing_enabled: {
                                    readonly tag: 'limit_sharing_enabled'
                                    readonly attrs: {
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly linked_parent: {
                                    readonly tag: 'linked_parent'
                                    readonly attrs: {
                                        readonly jid: string
                                    }
                                } | undefined
                                readonly member_add_mode: {
                                    readonly tag: 'member_add_mode'
                                    readonly content: 'admin_add' | 'all_member_add'
                                }
                                readonly member_link_mode: {
                                    readonly tag: 'member_link_mode'
                                    readonly content: 'admin_link' | 'all_member_link'
                                }
                                readonly member_share_group_history_mode: {
                                    readonly tag: 'member_share_group_history_mode'
                                    readonly content: 'admin_share' | 'all_member_share'
                                }
                                readonly membership_approval_mode: {
                                    readonly tag: 'membership_approval_mode'
                                    readonly children: {
                                        readonly group_join: {
                                            readonly tag: 'group_join'
                                            readonly attrs: {
                                                readonly state?: 'on'
                                            }
                                        }
                                    }
                                } | undefined
                                readonly parent: {
                                    readonly tag: 'parent'
                                    readonly attrs: {
                                        readonly default_membership_approval_mode: 'request_required'
                                    }
                                } | undefined
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly addressable?: 'false'
                                        readonly display_name?: string
                                        readonly group_history_sent?: 'false' | 'true'
                                        readonly jid?: string
                                        readonly join_time?: number
                                        readonly lid?: string
                                        readonly participant_label?: string
                                        readonly participant_label_mtime?: number
                                        readonly phone_number?: string
                                        readonly type?: 'admin' | 'superadmin'
                                        readonly username?: string
                                    }
                                }>
                                readonly suspended: {
                                    readonly tag: 'suspended'
                                    readonly attrs: {
                                        readonly can_auto_file?: 'true'
                                    }
                                } | undefined
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsGetReportedMessages: {
        readonly module: 'WASmaxGroupsGetReportedMessagesRPC'
        readonly opName: 'GetReportedMessages'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly reports: {
                readonly tag: 'reports'
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly reports: {
                    readonly tag: 'reports'
                    readonly children: {
                        readonly report: ReadonlyArray<{
                            readonly tag: 'report'
                            readonly attrs: {
                                readonly message_id: string
                            }
                            readonly children: {
                                readonly reporter: ReadonlyArray<{
                                    readonly tag: 'reporter'
                                    readonly attrs: {
                                        readonly jid: string
                                        readonly phone_number?: string
                                        readonly timestamp: number
                                        readonly username?: string
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsGroupsDirtyNotification: {
        readonly module: 'WASmaxGroupsGroupsDirtyNotificationRPC'
        readonly opName: 'GroupsDirtyNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 'g.us'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly groups_dirty: {
                    readonly tag: 'groups_dirty'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly jid: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsJoinLinkedGroup: {
        readonly module: 'WASmaxGroupsJoinLinkedGroupRPC'
        readonly opName: 'JoinLinkedGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly join_linked_group: {
                readonly tag: 'join_linked_group'
                readonly attrs: {
                    readonly jid: string
                    readonly type?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'GroupJoinRequestSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly GroupsJoinNotification: {
        readonly module: 'WASmaxGroupsJoinNotificationRPC'
        readonly opName: 'JoinNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant?: string
                readonly participant_country_code: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly create: {
                    readonly tag: 'create'
                    readonly attrs: {
                        readonly context_group_jid: string
                        readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                        readonly key: string
                        readonly reason?: 'accept' | 'auto_add' | 'default_sub_group_admin_add' | 'general_chat_auto_add' | 'invite' | 'invite_auto_add' | 'linked_group_join' | 'sub_group_suggestion_approved'
                        readonly type?: 'new'
                    }
                    readonly children: {
                        readonly group: {
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly a_v_id?: string
                                readonly ack?: 'false'
                                readonly addressing_mode?: 'lid' | 'pn'
                                readonly creation?: number
                                readonly creator?: string
                                readonly creator_country_code?: string
                                readonly creator_pn?: string
                                readonly creator_username?: string
                                readonly id?: string
                                readonly open_thread_id?: string
                                readonly p_v_id?: string
                                readonly s_o?: string
                                readonly s_o_pn?: string
                                readonly s_o_username?: string
                                readonly s_t?: number
                                readonly size: number
                                readonly subject?: string
                            }
                            readonly children: {
                                readonly appeal_status: {
                                    readonly tag: 'appeal_status'
                                    readonly attrs: {
                                        readonly type: 'approved' | 'in_review' | 'none' | 'rejected'
                                    }
                                } | undefined
                                readonly appeal_update_time: {
                                    readonly tag: 'appeal_update_time'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly description: {
                                    readonly tag: 'description'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly participant?: string
                                        readonly participant_pn: string
                                        readonly participant_username: string
                                        readonly t: number
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                    }
                                } | undefined
                                readonly ephemeral: {
                                    readonly tag: 'ephemeral'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly evolution_version: {
                                    readonly tag: 'evolution_version'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly growth_locked: {
                                    readonly tag: 'growth_locked'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly type: 'invite'
                                    }
                                } | undefined
                                readonly limit_sharing_enabled: {
                                    readonly tag: 'limit_sharing_enabled'
                                    readonly attrs: {
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly linked_parent: {
                                    readonly tag: 'linked_parent'
                                    readonly attrs: {
                                        readonly jid: string
                                    }
                                } | undefined
                                readonly member_add_mode: {
                                    readonly tag: 'member_add_mode'
                                    readonly content: 'admin_add' | 'all_member_add'
                                }
                                readonly member_link_mode: {
                                    readonly tag: 'member_link_mode'
                                    readonly content: 'admin_link' | 'all_member_link'
                                }
                                readonly member_share_group_history_mode: {
                                    readonly tag: 'member_share_group_history_mode'
                                    readonly content: 'admin_share' | 'all_member_share'
                                }
                                readonly membership_approval_mode: {
                                    readonly tag: 'membership_approval_mode'
                                    readonly children: {
                                        readonly group_join: {
                                            readonly tag: 'group_join'
                                            readonly attrs: {
                                                readonly state?: 'on'
                                            }
                                        }
                                    }
                                } | undefined
                                readonly parent: {
                                    readonly tag: 'parent'
                                    readonly attrs: {
                                        readonly default_membership_approval_mode: 'request_required'
                                    }
                                } | undefined
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly addressable?: 'false'
                                        readonly display_name?: string
                                        readonly group_history_sent?: 'false' | 'true'
                                        readonly jid?: string
                                        readonly join_time?: number
                                        readonly lid?: string
                                        readonly participant_label?: string
                                        readonly participant_label_mtime?: number
                                        readonly phone_number?: string
                                        readonly type?: 'admin' | 'superadmin'
                                        readonly username?: string
                                    }
                                }>
                                readonly suspended: {
                                    readonly tag: 'suspended'
                                    readonly attrs: {
                                        readonly can_auto_file?: 'true'
                                    }
                                } | undefined
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly GroupsLinkSubGroups: {
        readonly module: 'WASmaxGroupsLinkSubGroupsRPC'
        readonly opName: 'LinkSubGroups'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly links: {
                readonly tag: 'links'
                readonly children: {
                    readonly link: {
                        readonly tag: 'link'
                        readonly attrs: {
                            readonly link_type: 'sub_group'
                        }
                        readonly children: {
                            readonly group: ReadonlyArray<{
                                readonly tag: 'group'
                                readonly attrs: {
                                    readonly jid: string
                                }
                                readonly children: {
                                    readonly hidden_group: {
                                        readonly tag: 'hidden_group'
                                    } | undefined
                                }
                            }>
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly links: {
                    readonly tag: 'links'
                    readonly children: {
                        readonly link: {
                            readonly tag: 'link'
                            readonly attrs: {
                                readonly link_type: 'sub_group'
                            }
                            readonly children: {
                                readonly group: ReadonlyArray<{
                                    readonly tag: 'group'
                                    readonly attrs: {
                                        readonly error?: '401'
                                        readonly jid: string
                                    }
                                    readonly children: {
                                        readonly participant: ReadonlyArray<{
                                            readonly tag: 'participant'
                                            readonly attrs: {
                                                readonly error: '403'
                                                readonly jid: string
                                            }
                                        }>
                                    }
                                }>
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly GroupsMemberAddModeChangeNotification: {
        readonly module: 'WASmaxGroupsMemberAddModeChangeNotificationRPC'
        readonly opName: 'MemberAddModeChangeNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant?: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly member_add_mode: {
                    readonly tag: 'member_add_mode'
                    readonly content: 'admin_add' | 'all_member_add'
                }
            }
        } }
    }
    readonly GroupsMembershipRequestsAction: {
        readonly module: 'WASmaxGroupsMembershipRequestsActionRPC'
        readonly opName: 'MembershipRequestsAction'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly membership_requests_action: {
                readonly tag: 'membership_requests_action'
                readonly children: {
                    readonly approve: {
                        readonly tag: 'approve'
                        readonly children: {
                            readonly participant: ReadonlyArray<{
                                readonly tag: 'participant'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly phone_number?: string
                                    readonly username?: string
                                }
                            }>
                        }
                    } | undefined
                    readonly reject: {
                        readonly tag: 'reject'
                        readonly children: {
                            readonly participant: ReadonlyArray<{
                                readonly tag: 'participant'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly phone_number?: string
                                    readonly username?: string
                                }
                            }>
                        }
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly membership_requests_action: {
                    readonly tag: 'membership_requests_action'
                    readonly children: {
                        readonly approve: {
                            readonly tag: 'approve'
                            readonly children: {
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly error?: '400'
                                        readonly jid: string
                                        readonly phone_number?: string
                                        readonly username?: string
                                    }
                                }>
                            }
                        } | undefined
                        readonly reject: {
                            readonly tag: 'reject'
                            readonly children: {
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly error?: '404'
                                        readonly jid: string
                                        readonly phone_number?: string
                                        readonly username?: string
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly GroupsPromoteDemote: {
        readonly module: 'WASmaxGroupsPromoteDemoteRPC'
        readonly opName: 'PromoteDemote'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly demote: {
                readonly tag: 'demote'
                readonly children: {
                    readonly participant: ReadonlyArray<{
                        readonly tag: 'participant'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            } | undefined
            readonly promote: {
                readonly tag: 'promote'
                readonly children: {
                    readonly participant: ReadonlyArray<{
                        readonly tag: 'participant'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'rate-overlimit'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessDemote'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly demote: {
                    readonly tag: 'demote'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly error?: '404' | '406'
                                readonly jid: string
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessPromote'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly promote: {
                    readonly tag: 'promote'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly error?: '404' | '419'
                                readonly jid: string
                                readonly phone_number?: string
                                readonly type?: 'admin'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsPromoteDemoteAdmin: {
        readonly module: 'WASmaxGroupsPromoteDemoteAdminRPC'
        readonly opName: 'PromoteDemoteAdmin'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly admin: {
                readonly tag: 'admin'
                readonly children: {
                    readonly demote: {
                        readonly tag: 'demote'
                        readonly children: {
                            readonly participant: ReadonlyArray<{
                                readonly tag: 'participant'
                                readonly attrs: {
                                    readonly jid: string
                                }
                            }>
                        }
                    } | undefined
                    readonly promote: {
                        readonly tag: 'promote'
                        readonly children: {
                            readonly participant: ReadonlyArray<{
                                readonly tag: 'participant'
                                readonly attrs: {
                                    readonly jid: string
                                }
                            }>
                        }
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'rate-overlimit'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessMultiAdmin'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly admin: {
                    readonly tag: 'admin'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly error?: '403' | '404' | '406' | '419'
                                readonly jid: string
                                readonly phone_number?: string
                                readonly type?: 'admin'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsPromoteNotification: {
        readonly module: 'WASmaxGroupsPromoteNotificationRPC'
        readonly opName: 'PromoteNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant?: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly promote: {
                    readonly tag: 'promote'
                    readonly attrs: {
                        readonly prev_v_id?: string
                        readonly v_id: string
                    }
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly display_name?: string
                                readonly jid?: string
                                readonly lid?: string
                                readonly phone_number?: string
                                readonly type?: 'admin' | 'superadmin'
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsRemoveNotification: {
        readonly module: 'WASmaxGroupsRemoveNotificationRPC'
        readonly opName: 'RemoveNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant?: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly remove: {
                    readonly tag: 'remove'
                    readonly attrs: {
                        readonly prev_v_id?: string
                        readonly reason?: 'default_sub_group_demote'
                        readonly subject?: string
                        readonly v_id?: string
                    }
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly display_name?: string
                                readonly group_history_sent?: 'false' | 'true'
                                readonly jid?: string
                                readonly join_time?: number
                                readonly lid?: string
                                readonly participant_label?: string
                                readonly participant_label_mtime?: number
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsRemoveParticipants: {
        readonly module: 'WASmaxGroupsRemoveParticipantsRPC'
        readonly opName: 'RemoveParticipants'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly remove: {
                readonly tag: 'remove'
                readonly attrs: {
                    readonly linked_groups?: 'true'
                }
                readonly children: {
                    readonly participant: ReadonlyArray<{
                        readonly tag: 'participant'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'rate-overlimit'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly remove: {
                    readonly tag: 'remove'
                    readonly attrs: {
                        readonly linked_groups?: 'true'
                    }
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly error?: '404'
                                readonly jid: string
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsReportMessages: {
        readonly module: 'WASmaxGroupsReportMessagesRPC'
        readonly opName: 'ReportMessages'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly reports: {
                readonly tag: 'reports'
                readonly children: {
                    readonly report: {
                        readonly tag: 'report'
                        readonly attrs: {
                            readonly message_id: string
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly GroupsRevokeRequestCode: {
        readonly module: 'WASmaxGroupsRevokeRequestCodeRPC'
        readonly opName: 'RevokeRequestCode'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly revoke: {
                readonly tag: 'revoke'
                readonly children: {
                    readonly participant: ReadonlyArray<{
                        readonly tag: 'participant'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly revoke: {
                    readonly tag: 'revoke'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly error?: '404'
                                readonly jid: string
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GroupsSetDescription: {
        readonly module: 'WASmaxGroupsSetDescriptionRPC'
        readonly opName: 'SetDescription'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly description: {
                readonly tag: 'description'
                readonly attrs: {
                    readonly delete?: 'true'
                    readonly id?: string
                    readonly prev?: string
                }
                readonly children: {
                    readonly body: {
                        readonly tag: 'body'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly t?: number
                readonly type: 'result'
            }
        } }
    }
    readonly GroupsSetProperty: {
        readonly module: 'WASmaxGroupsSetPropertyRPC'
        readonly opName: 'SetProperty'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly allow_admin_reports: {
                readonly tag: 'allow_admin_reports'
            } | undefined
            readonly allow_non_admin_sub_group_creation: {
                readonly tag: 'allow_non_admin_sub_group_creation'
            } | undefined
            readonly announcement: {
                readonly tag: 'announcement'
            } | undefined
            readonly ephemeral: {
                readonly tag: 'ephemeral'
                readonly attrs: {
                    readonly expiration: number
                    readonly trigger?: number
                }
            } | undefined
            readonly frequently_forwarded_ok: {
                readonly tag: 'frequently_forwarded_ok'
            } | undefined
            readonly group_history: {
                readonly tag: 'group_history'
            } | undefined
            readonly locked: {
                readonly tag: 'locked'
            } | undefined
            readonly membership_approval_mode: {
                readonly tag: 'membership_approval_mode'
                readonly children: {
                    readonly group_join: {
                        readonly tag: 'group_join'
                        readonly attrs: {
                            readonly state: 'on'
                        }
                    }
                }
            } | undefined
            readonly no_frequently_forwarded: {
                readonly tag: 'no_frequently_forwarded'
            } | undefined
            readonly no_group_history: {
                readonly tag: 'no_group_history'
            } | undefined
            readonly not_allow_admin_reports: {
                readonly tag: 'not_allow_admin_reports'
            } | undefined
            readonly not_allow_non_admin_sub_group_creation: {
                readonly tag: 'not_allow_non_admin_sub_group_creation'
            } | undefined
            readonly not_announcement: {
                readonly tag: 'not_announcement'
            } | undefined
            readonly not_ephemeral: {
                readonly tag: 'not_ephemeral'
            } | undefined
            readonly unlocked: {
                readonly tag: 'unlocked'
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly ephemeral: {
                    readonly tag: 'ephemeral'
                    readonly attrs: {
                        readonly expiration: number
                        readonly trigger?: number
                    }
                } | undefined
                readonly membership_approval_mode: {
                    readonly tag: 'membership_approval_mode'
                    readonly children: {
                        readonly group_join: {
                            readonly tag: 'group_join'
                            readonly attrs: {
                                readonly state?: 'on'
                            }
                        }
                    }
                } | undefined
            }
        } }
    }
    readonly GroupsSetSubject: {
        readonly module: 'WASmaxGroupsSetSubjectRPC'
        readonly opName: 'SetSubject'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly subject: {
                readonly tag: 'subject'
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly GroupsSubGroupSuggestionsAction: {
        readonly module: 'WASmaxGroupsSubGroupSuggestionsActionRPC'
        readonly opName: 'SubGroupSuggestionsAction'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly sub_group_suggestions_action: {
                readonly tag: 'sub_group_suggestions_action'
                readonly children: {
                    readonly approve: {
                        readonly tag: 'approve'
                        readonly children: {
                            readonly sub_group_suggestion: ReadonlyArray<{
                                readonly tag: 'sub_group_suggestion'
                                readonly attrs: {
                                    readonly creator: string
                                    readonly creator_pn: string
                                    readonly jid: string
                                }
                            }>
                        }
                    } | undefined
                    readonly cancel: {
                        readonly tag: 'cancel'
                        readonly children: {
                            readonly sub_group_suggestion: ReadonlyArray<{
                                readonly tag: 'sub_group_suggestion'
                                readonly attrs: {
                                    readonly jid: string
                                }
                            }>
                        }
                    } | undefined
                    readonly reject: {
                        readonly tag: 'reject'
                        readonly children: {
                            readonly sub_group_suggestion: ReadonlyArray<{
                                readonly tag: 'sub_group_suggestion'
                                readonly attrs: {
                                    readonly creator: string
                                    readonly creator_pn: string
                                    readonly jid: string
                                }
                            }>
                        }
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly sub_group_suggestions_action: {
                    readonly tag: 'sub_group_suggestions_action'
                    readonly children: {
                        readonly approve: {
                            readonly tag: 'approve'
                            readonly children: {
                                readonly sub_group_suggestion: ReadonlyArray<{
                                    readonly tag: 'sub_group_suggestion'
                                    readonly attrs: {
                                        readonly creator: string
                                        readonly creator_pn?: string
                                        readonly error?: '404'
                                        readonly jid: string
                                    }
                                }>
                            }
                        } | undefined
                        readonly cancel: {
                            readonly tag: 'cancel'
                            readonly children: {
                                readonly sub_group_suggestion: ReadonlyArray<{
                                    readonly tag: 'sub_group_suggestion'
                                    readonly attrs: {
                                        readonly error?: '404'
                                        readonly jid: string
                                        readonly phone_number?: string
                                        readonly username?: string
                                    }
                                }>
                            }
                        } | undefined
                        readonly reject: {
                            readonly tag: 'reject'
                            readonly children: {
                                readonly sub_group_suggestion: ReadonlyArray<{
                                    readonly tag: 'sub_group_suggestion'
                                    readonly attrs: {
                                        readonly creator: string
                                        readonly creator_pn?: string
                                        readonly error?: '404'
                                        readonly jid: string
                                        readonly phone_number?: string
                                        readonly username?: string
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly GroupsSubjectChangeNotification: {
        readonly module: 'WASmaxGroupsSubjectChangeNotificationRPC'
        readonly opName: 'SubjectChangeNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly from: string
                readonly id: string
                readonly notify?: string
                readonly offline?: number
                readonly participant: string
                readonly participant_pn: string
                readonly participant_username: string
                readonly t: number
                readonly type: 'w:gp2'
            }
            readonly children: {
                readonly subject: {
                    readonly tag: 'subject'
                    readonly attrs: {
                        readonly parent_group_jid?: string
                        readonly s_o?: string
                        readonly s_o_pn?: string
                        readonly s_o_username?: string
                        readonly s_t: number
                        readonly subject?: string
                    }
                }
            }
        } }
    }
    readonly GroupsUnlinkGroups: {
        readonly module: 'WASmaxGroupsUnlinkGroupsRPC'
        readonly opName: 'UnlinkGroups'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'w:g2'
        }
        readonly children: {
            readonly unlink: {
                readonly tag: 'unlink'
                readonly attrs: {
                    readonly unlink_type: 'sub_group'
                }
                readonly children: {
                    readonly group: ReadonlyArray<{
                        readonly tag: 'group'
                        readonly attrs: {
                            readonly jid: string
                            readonly remove_orphaned_members?: 'true'
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly unlink: {
                    readonly tag: 'unlink'
                    readonly attrs: {
                        readonly unlink_type: 'sub_group'
                    }
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly error?: '400'
                                readonly jid: string
                                readonly remove_orphaned_members?: 'true'
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly InAppCommsEvent: {
        readonly module: 'WASmaxInAppCommsEventRPC'
        readonly opName: 'Event'
        readonly xmlns: 'w:comms'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'w:comms'
        }
        readonly children: {
            readonly event: {
                readonly tag: 'event'
                readonly attrs: {
                    readonly logdata: string
                    readonly promotion_id: string
                    readonly timestamp_sec: number
                    readonly type: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly KeyTransparencyMultiSerializedLookup: {
        readonly module: 'WASmaxKeyTransparencyMultiSerializedLookupRPC'
        readonly opName: 'MultiSerializedLookup'
        readonly xmlns: 'key_transparency'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'key_transparency'
        }
        readonly children: {
            readonly multi_serialized_lookup: {
                readonly tag: 'multi_serialized_lookup'
                readonly attrs: {
                    readonly version?: number
                }
            }
            readonly single_serialized_lookup: ReadonlyArray<{
                readonly tag: 'single_serialized_lookup'
                readonly attrs: {
                    readonly id: number
                }
                readonly children: {
                    readonly auditor: {
                        readonly tag: 'auditor'
                        readonly attrs: {
                            readonly id: 'cloudflare'
                        }
                    }
                    readonly key: {
                        readonly tag: 'key'
                        readonly content: Uint8Array
                    }
                    readonly label: {
                        readonly tag: 'label'
                    }
                    readonly user: {
                        readonly tag: 'user'
                        readonly attrs: {
                            readonly label: string
                        }
                    }
                }
            }>
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly single_serialized_proof: ReadonlyArray<{
                    readonly tag: 'single_serialized_proof'
                    readonly children: {
                        readonly error: {
                            readonly tag: 'error'
                            readonly attrs: {
                                readonly code?: number
                                readonly text?: 'internal-server-error'
                            }
                        }
                        readonly root_hash: {
                            readonly tag: 'root_hash'
                            readonly children: {
                                readonly auditor_signature: {
                                    readonly tag: 'auditor_signature'
                                    readonly attrs: {
                                        readonly id: 'cloudflare'
                                    }
                                    readonly children: {
                                        readonly message: {
                                            readonly tag: 'message'
                                            readonly content: Uint8Array
                                        }
                                        readonly pub_key: {
                                            readonly tag: 'pub_key'
                                            readonly content: Uint8Array
                                        }
                                        readonly signature: {
                                            readonly tag: 'signature'
                                            readonly content: Uint8Array
                                        }
                                    }
                                } | undefined
                                readonly hash: {
                                    readonly tag: 'hash'
                                    readonly attrs: {
                                        readonly epoch: number
                                    }
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly serialized_proof: {
                            readonly tag: 'serialized_proof'
                            readonly content: Uint8Array
                        }
                    }
                }>
            }
        } }
    }
    readonly LoginFailure: {
        readonly module: 'WASmaxLoginFailureRPC'
        readonly opName: 'Failure'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'failure'
            readonly attrs: {
                readonly appeal_token?: string
                readonly code?: string
                readonly expire?: number
                readonly has_offline?: 'false' | 'true'
                readonly is_eu?: 'false' | 'true'
                readonly location: string
                readonly logout_main_button_text?: string
                readonly logout_main_button_url?: string
                readonly logout_message_header?: string
                readonly logout_message_locale?: string
                readonly logout_message_subtext?: string
                readonly logout_secondary_button_ch_entrypoint_id?: string
                readonly logout_secondary_button_text?: string
                readonly logout_secondary_button_url?: string
                readonly message?: string
                readonly reason: '400' | '401' | '402' | '403' | '405' | '406' | '409' | '412' | '413' | '414' | '415' | '416' | '417' | '418' | '419' | '500' | '501' | '503'
                readonly retry?: number
                readonly scope?: 'parental' | 'youth'
                readonly source_acct?: number
                readonly t?: number
                readonly url?: string
                readonly violation_reason?: string
                readonly vt?: number
            }
        } }
    }
    readonly LoginSuccess: {
        readonly module: 'WASmaxLoginSuccessRPC'
        readonly opName: 'Success'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'success'
            readonly attrs: {
                readonly abprops?: number
                readonly companion_enc_static?: string
                readonly country_code?: string
                readonly creation?: number
                readonly display_name: string
                readonly group_abprops?: number
                readonly lid?: string
                readonly location: string
                readonly padded_bytes?: string
                readonly props?: number
                readonly shard_count?: number
                readonly static_pq_key?: string
                readonly t: number
            }
        } }
    }
    readonly MdCompanionFinish: {
        readonly module: 'WASmaxMdCompanionFinishRPC'
        readonly opName: 'CompanionFinish'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly link_code_companion_reg: {
                readonly tag: 'link_code_companion_reg'
                readonly attrs: {
                    readonly contact_point_type: string
                    readonly contact_point_value: string
                    readonly jid: string
                    readonly stage: 'companion_finish'
                }
                readonly children: {
                    readonly companion_identity_public: {
                        readonly tag: 'companion_identity_public'
                    }
                    readonly link_code_pairing_ref: {
                        readonly tag: 'link_code_pairing_ref'
                        readonly content: Uint8Array
                    }
                    readonly link_code_pairing_wrapped_key_bundle: {
                        readonly tag: 'link_code_pairing_wrapped_key_bundle'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly MdCompanionHello: {
        readonly module: 'WASmaxMdCompanionHelloRPC'
        readonly opName: 'CompanionHello'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly link_code_companion_reg: {
                readonly tag: 'link_code_companion_reg'
                readonly attrs: {
                    readonly contact_point_type: string
                    readonly contact_point_value: string
                    readonly jid: string
                    readonly should_show_push_notification?: boolean
                    readonly stage: 'companion_hello'
                }
                readonly children: {
                    readonly companion_platform_display: {
                        readonly tag: 'companion_platform_display'
                    }
                    readonly companion_platform_id: {
                        readonly tag: 'companion_platform_id'
                        readonly content: Uint8Array
                    }
                    readonly companion_server_auth_key_pub: {
                        readonly tag: 'companion_server_auth_key_pub'
                    }
                    readonly link_code_pairing_nonce: {
                        readonly tag: 'link_code_pairing_nonce'
                    } | undefined
                    readonly link_code_pairing_wrapped_companion_ephemeral_pub: {
                        readonly tag: 'link_code_pairing_wrapped_companion_ephemeral_pub'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'NotifyCompanion'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly link_code_companion_reg: {
                    readonly tag: 'link_code_companion_reg'
                    readonly attrs: {
                        readonly stage: 'companion_hello'
                    }
                    readonly children: {
                        readonly link_code_pairing_ref: {
                            readonly tag: 'link_code_pairing_ref'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly MdGetCountryCode: {
        readonly module: 'WASmaxMdGetCountryCodeRPC'
        readonly opName: 'GetCountryCode'
        readonly xmlns: 'md'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly link_code_companion_reg: {
                readonly tag: 'link_code_companion_reg'
                readonly attrs: {
                    readonly stage: 'get_country_code'
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'GetCountryCodeResponse'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly country_code: {
                    readonly tag: 'country_code'
                    readonly attrs: {
                        readonly iso: string
                    }
                }
            }
        } }
    }
    readonly MdGetPasskeyRequestOptions: {
        readonly module: 'WASmaxMdGetPasskeyRequestOptionsRPC'
        readonly opName: 'GetPasskeyRequestOptions'
        readonly xmlns: 'md'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly passkey_request_options: {
                readonly tag: 'passkey_request_options'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly passkey_request_options: {
                    readonly tag: 'passkey_request_options'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MdGetRef: {
        readonly module: 'WASmaxMdGetRefRPC'
        readonly opName: 'GetRef'
        readonly xmlns: 'md'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly ref: {
                readonly tag: 'ref'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly ref: {
                    readonly tag: 'ref'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MdPasskeyPrologueRequestNotification: {
        readonly module: 'WASmaxMdPasskeyPrologueRequestNotificationRPC'
        readonly opName: 'PasskeyPrologueRequestNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'passkey_prologue_request'
            }
            readonly children: {
                readonly passkey_request_options: {
                    readonly tag: 'passkey_request_options'
                    readonly content: Uint8Array
                } | undefined
            }
        } }
    }
    readonly MdPrimaryHelloNotifyCompanion: {
        readonly module: 'WASmaxMdPrimaryHelloNotifyCompanionRPC'
        readonly opName: 'PrimaryHelloNotifyCompanion'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'link_code_companion_reg'
            }
            readonly children: {
                readonly link_code_companion_reg: {
                    readonly tag: 'link_code_companion_reg'
                    readonly attrs: {
                        readonly stage: 'primary_hello'
                    }
                    readonly children: {
                        readonly link_code_pairing_ref: {
                            readonly tag: 'link_code_pairing_ref'
                            readonly content: Uint8Array
                        }
                        readonly link_code_pairing_wrapped_primary_ephemeral_pub: {
                            readonly tag: 'link_code_pairing_wrapped_primary_ephemeral_pub'
                            readonly content: Uint8Array
                        }
                        readonly primary_identity_pub: {
                            readonly tag: 'primary_identity_pub'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly MdRefreshCodeNotifyCompanion: {
        readonly module: 'WASmaxMdRefreshCodeNotifyCompanionRPC'
        readonly opName: 'RefreshCodeNotifyCompanion'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'link_code_companion_reg'
            }
            readonly children: {
                readonly link_code_companion_reg: {
                    readonly tag: 'link_code_companion_reg'
                    readonly attrs: {
                        readonly force_manual_refresh?: 'false' | 'true'
                        readonly stage: 'refresh_code'
                    }
                    readonly children: {
                        readonly link_code_pairing_ref: {
                            readonly tag: 'link_code_pairing_ref'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly MdSetCompanionNonce: {
        readonly module: 'WASmaxMdSetCompanionNonceRPC'
        readonly opName: 'SetCompanionNonce'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly companion_nonce: {
                readonly tag: 'companion_nonce'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly MdSetEncryptedPairing: {
        readonly module: 'WASmaxMdSetEncryptedPairingRequestRPC'
        readonly opName: 'SetEncryptedPairingRequest'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly encrypted_pairing_request: {
                readonly tag: 'encrypted_pairing_request'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly MdSetPasskeyPrologue: {
        readonly module: 'WASmaxMdSetPasskeyPrologueRPC'
        readonly opName: 'SetPasskeyPrologue'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'md'
        }
        readonly children: {
            readonly passkey_prologue: {
                readonly tag: 'passkey_prologue'
                readonly children: {
                    readonly credential_id: {
                        readonly tag: 'credential_id'
                    }
                    readonly pairing_handoff_proof: {
                        readonly tag: 'pairing_handoff_proof'
                    } | undefined
                    readonly prologue_payload: {
                        readonly tag: 'prologue_payload'
                    }
                    readonly webauthn_assertion: {
                        readonly tag: 'webauthn_assertion'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly MdSetPrimaryEphemeralIdentityNotification: {
        readonly module: 'WASmaxMdSetPrimaryEphemeralIdentityNotificationRPC'
        readonly opName: 'SetPrimaryEphemeralIdentityNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'crsc_continuation'
            }
            readonly children: {
                readonly primary_ephemeral_identity: {
                    readonly tag: 'primary_ephemeral_identity'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MdSetReg: {
        readonly module: 'WASmaxMdSetRegRPC'
        readonly opName: 'SetReg'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'set'
                readonly xmlns: 'md'
            }
            readonly children: {
                readonly 'pair-success': {
                    readonly tag: 'pair-success'
                    readonly children: {
                        readonly biz: {
                            readonly tag: 'biz'
                            readonly attrs: {
                                readonly name: string
                            }
                        } | undefined
                        readonly 'client-props': {
                            readonly tag: 'client-props'
                            readonly content: Uint8Array
                        } | undefined
                        readonly companion_recovery_server_token: {
                            readonly tag: 'companion_recovery_server_token'
                            readonly content: string
                        } | undefined
                        readonly device: {
                            readonly tag: 'device'
                            readonly attrs: {
                                readonly beta?: 'false' | 'true'
                                readonly jid: string
                                readonly lid: string
                            }
                        }
                        readonly 'device-identity': {
                            readonly tag: 'device-identity'
                            readonly content: Uint8Array
                        }
                        readonly 'encryption-metadata': {
                            readonly tag: 'encryption-metadata'
                            readonly attrs: {
                                readonly algorithm: 'aes-256-gcm'
                                readonly version: '1'
                            }
                            readonly children: {
                                readonly auth_tag: {
                                    readonly tag: 'auth_tag'
                                    readonly content: Uint8Array
                                }
                                readonly encrypted_data: {
                                    readonly tag: 'encrypted_data'
                                    readonly content: Uint8Array
                                }
                                readonly encrypted_key: {
                                    readonly tag: 'encrypted_key'
                                    readonly content: Uint8Array
                                }
                                readonly nonce: {
                                    readonly tag: 'nonce'
                                    readonly content: Uint8Array
                                }
                            }
                        } | undefined
                        readonly jurisdiction: {
                            readonly tag: 'jurisdiction'
                            readonly attrs: {
                                readonly cc: string
                                readonly iso: string
                            }
                        }
                        readonly platform: {
                            readonly tag: 'platform'
                            readonly attrs: {
                                readonly name: string
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly MdSetToCompanion: {
        readonly module: 'WASmaxMdSetToCompanionRPC'
        readonly opName: 'SetToCompanion'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'set'
                readonly xmlns: 'md'
            }
            readonly children: {
                readonly 'pair-device': {
                    readonly tag: 'pair-device'
                    readonly children: {
                        readonly ref: ReadonlyArray<{
                            readonly tag: 'ref'
                            readonly content: Uint8Array
                        }>
                    }
                }
            }
        } }
    }
    readonly MessageDeliverNewsletter: {
        readonly module: 'WASmaxMessageDeliverNewsletterRPC'
        readonly opName: 'Newsletter'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'message'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly category?: 'peer'
                readonly client_thread_id: string
                readonly conversation_thread_id: string
                readonly count: number
                readonly device_fanout?: 'false'
                readonly duration: number
                readonly edit: '3' | '7'
                readonly edit_target_id?: string
                readonly eph_setting?: string
                readonly from: string
                readonly id: string
                readonly is_sender?: 'true'
                readonly is_template_from_library_edited?: boolean
                readonly jid: string
                readonly library_template_id?: string
                readonly mediatype?: string
                readonly name: 'full_catalog'
                readonly native_flow_name?: string
                readonly notify?: string
                readonly offline: number
                readonly participant: string
                readonly peer_recipient_lid?: string
                readonly peer_recipient_pn?: string
                readonly peer_recipient_username?: string
                readonly phash?: string
                readonly privacy_sensitive?: boolean
                readonly push_priority: string
                readonly recipient?: string
                readonly recipient_pn?: string
                readonly sender_lid?: string
                readonly sender_timestamp_ms?: number
                readonly server_id: number
                readonly session_type: 'pq'
                readonly state: string
                readonly sticker_type: 'avatar'
                readonly sts?: number
                readonly sub_tag?: string
                readonly t: number
                readonly tag?: string
                readonly target_chat_jid?: string
                readonly target_chat_jid_lid?: string
                readonly target_id: string
                readonly target_sender_jid?: string
                readonly thread_type: number
                readonly to: string
                readonly ttl?: number
                readonly type: 'text' | 'native_flow'
                readonly v?: '1'
                readonly value: string
                readonly verified_name: string
            }
            readonly children: {
                readonly automated: {
                    readonly tag: 'automated'
                }
                readonly biz: {
                    readonly tag: 'biz'
                    readonly children: {
                        readonly buttons: {
                            readonly tag: 'buttons'
                        }
                    }
                }
                readonly bot: {
                    readonly tag: 'bot'
                    readonly attrs: {
                        readonly type: 'feedback'
                    }
                    readonly children: {
                        readonly to: {
                            readonly tag: 'to'
                            readonly attrs: {
                                readonly count: number
                                readonly duration: number
                                readonly jid: string
                                readonly mediatype: string
                                readonly native_flow_name?: string
                                readonly session_type: 'pq'
                                readonly state: string
                                readonly sticker_type: 'avatar'
                                readonly type: string
                            }
                            readonly children: {
                                readonly enc: {
                                    readonly tag: 'enc'
                                    readonly attrs: {
                                        readonly count: number
                                        readonly duration: number
                                        readonly mediatype: string
                                        readonly native_flow_name?: string
                                        readonly session_type: 'pq'
                                        readonly state: 'false' | 'true'
                                        readonly sticker_type: 'avatar'
                                        readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                                        readonly v: '2'
                                    }
                                    readonly content: Uint8Array
                                }
                            }
                        }
                    }
                }
                readonly capability: ReadonlyArray<{
                    readonly tag: 'capability'
                    readonly attrs: {
                        readonly name: string
                    }
                }>
                readonly content_binding: {
                    readonly tag: 'content_binding'
                }
                readonly conversion: {
                    readonly tag: 'conversion'
                    readonly attrs: {
                        readonly recipient_status: string
                    }
                }
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly mediatype: string
                        readonly native_flow_name?: string
                        readonly session_type: 'pq'
                        readonly state: 'false' | 'true'
                        readonly sticker_type: 'avatar'
                        readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                        readonly v: '2'
                    }
                    readonly content: Uint8Array
                }
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly franking_tag: {
                            readonly tag: 'franking_tag'
                        }
                    }
                }
                readonly hsm: {
                    readonly tag: 'hsm'
                    readonly attrs: {
                        readonly buttons?: '1'
                        readonly category?: string
                        readonly id?: string
                        readonly is_template_from_library_edited?: boolean
                        readonly library_template_id?: string
                        readonly name: 'full_catalog'
                        readonly objective?: string
                        readonly sub_tag?: string
                        readonly tag?: string
                        readonly v?: '1'
                    }
                    readonly children: {
                        readonly quality_token: {
                            readonly tag: 'quality_token'
                            readonly attrs: {
                                readonly v?: '1'
                            }
                        }
                    }
                }
                readonly meta: {
                    readonly tag: 'meta'
                    readonly attrs: {
                        readonly appdata?: 'default' | 'group_history' | 'member_tag'
                        readonly conversation_thread_id?: string
                        readonly destination_id?: string
                        readonly event_type?: 'creation' | 'edit' | 'response'
                        readonly group_invite: string
                        readonly is_status_mention: 'true'
                        readonly message_association_type: string
                        readonly metering_type: 'smb_mm'
                        readonly origin?: 'ctwa'
                        readonly original_msg_t: number
                        readonly peripheral: string
                        readonly polltype?: 'creation' | 'edit' | 'quiz_creation' | 'result_snapshot' | 'vote'
                        readonly questiontype: 'response'
                        readonly receiver_account_kind: string
                        readonly sender_intent?: 'hosted'
                        readonly session_scope?: 'status'
                        readonly st: string
                        readonly status_setting?: string
                        readonly tag_reason?: string
                        readonly thread_msg_id?: string
                        readonly thread_msg_sender_jid?: string
                        readonly type: 'scheduled_message'
                        readonly view_once?: 'true'
                    }
                    readonly children: {
                        readonly key: {
                            readonly tag: 'key'
                            readonly attrs: {
                                readonly rkid: string
                            }
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly mixed_metadata: {
                    readonly tag: 'mixed_metadata'
                    readonly children: {
                        readonly payments_metadata: {
                            readonly tag: 'payments_metadata'
                            readonly attrs: {
                                readonly version: number
                            }
                        }
                    }
                }
                readonly multicast: {
                    readonly tag: 'multicast'
                }
                readonly native_flow: {
                    readonly tag: 'native_flow'
                    readonly attrs: {
                        readonly name: string
                        readonly v?: number
                    }
                    readonly children: {
                        readonly capability: ReadonlyArray<{
                            readonly tag: 'capability'
                            readonly attrs: {
                                readonly name: string
                            }
                        }>
                        readonly mixed_metadata: {
                            readonly tag: 'mixed_metadata'
                            readonly children: {
                                readonly payments_metadata: {
                                    readonly tag: 'payments_metadata'
                                    readonly attrs: {
                                        readonly version: number
                                    }
                                }
                            }
                        }
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
                readonly plaintext: {
                    readonly tag: 'plaintext'
                    readonly content: Uint8Array
                }
                readonly quality_token: {
                    readonly tag: 'quality_token'
                    readonly attrs: {
                        readonly v?: '1'
                    }
                }
                readonly rcat: {
                    readonly tag: 'rcat'
                    readonly content: Uint8Array
                }
                readonly reaction: {
                    readonly tag: 'reaction'
                    readonly attrs: {
                        readonly code: string
                    }
                }
                readonly reporting: {
                    readonly tag: 'reporting'
                    readonly children: {
                        readonly reporting_token: {
                            readonly tag: 'reporting_token'
                            readonly attrs: {
                                readonly v: number
                            }
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly request_id: {
                    readonly tag: 'request_id'
                }
                readonly ta_pad: {
                    readonly tag: 'ta_pad'
                }
                readonly tctoken: {
                    readonly tag: 'tctoken'
                    readonly attrs: {
                        readonly t?: number
                    }
                }
                readonly test: {
                    readonly tag: 'test'
                    readonly attrs: {
                        readonly config?: string
                    }
                }
                readonly to: ReadonlyArray<{
                    readonly tag: 'to'
                    readonly attrs: {
                        readonly jid: string
                    }
                }>
                readonly trace: {
                    readonly tag: 'trace'
                    readonly children: {
                        readonly request_id: {
                            readonly tag: 'request_id'
                        }
                    }
                }
                readonly url_number: {
                    readonly tag: 'url_number'
                }
                readonly url_text: {
                    readonly tag: 'url_text'
                }
                readonly votes: {
                    readonly tag: 'votes'
                    readonly children: {
                        readonly vote: ReadonlyArray<{
                            readonly tag: 'vote'
                            readonly content: Uint8Array
                        }>
                    }
                }
            }
        } }
    }
    readonly MessageDeliverPeer: {
        readonly module: 'WASmaxMessageDeliverPeerRPC'
        readonly opName: 'Peer'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'message'
            readonly attrs: {
                readonly category: 'peer'
                readonly from?: string
                readonly id: string
                readonly offline: number
                readonly peer_recipient_username?: string
                readonly privacy_sensitive: '1'
                readonly push_priority?: 'high' | 'high_force' | 'low'
                readonly sts?: number
                readonly t: number
                readonly type?: 'text'
                readonly verified_level: 'high' | 'low' | 'unknown'
                readonly verified_name: string
            }
            readonly children: {
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly count: number
                        readonly 'decrypt-fail'?: 'hide'
                        readonly mediatype?: '1p_sticker' | 'audio' | 'avatar_sticker' | 'buttons_response' | 'cataloglink' | 'collection' | 'contact' | 'contact_array' | 'document' | 'feed_reshare' | 'genai_sticker' | 'gif' | 'group_history' | 'history' | 'image' | 'list_response' | 'location' | 'motion_photo' | 'motion_video' | 'native_flow_response' | 'order' | 'product' | 'productlink' | 'ptt' | 'ptv' | 'sticker' | 'sticker_pack' | 'story_reply' | 'url' | 'user_created_sticker' | 'vcard' | 'video' | 'xma'
                        readonly native_flow_name?: 'a2ui_reply_action' | 'account_authentication_request' | 'address_message' | 'api_signup' | 'call_permission_request' | 'form_message' | 'galaxy_message' | 'menu_options'
                        readonly session_type?: 'pq'
                        readonly state?: 'false' | 'true'
                        readonly sticker_type?: 'avatar'
                        readonly type?: 'msg' | 'pkmsg'
                        readonly v?: '2'
                    }
                    readonly content: Uint8Array
                }
                readonly meta: {
                    readonly tag: 'meta'
                    readonly attrs: {
                        readonly appdata: 'default' | 'group_history' | 'history' | 'member_tag'
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
                readonly registration: {
                    readonly tag: 'registration'
                    readonly content: Uint8Array
                }
                readonly reporting: {
                    readonly tag: 'reporting'
                    readonly children: {
                        readonly reporting_token: {
                            readonly tag: 'reporting_token'
                            readonly attrs: {
                                readonly v?: number
                            }
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly ta_pad: {
                    readonly tag: 'ta_pad'
                    readonly content: Uint8Array
                }
                readonly verified_name: {
                    readonly tag: 'verified_name'
                    readonly attrs: {
                        readonly v: number
                        readonly verified_level: 'high' | 'low' | 'unknown'
                    }
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MessageDeliverRegular: {
        readonly module: 'WASmaxMessageDeliverRegularRPC'
        readonly opName: 'Regular'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'message'
            readonly attrs: {
                readonly addressing_mode?: 'lid' | 'pn'
                readonly count?: number
                readonly dhash: string
                readonly display_name?: string
                readonly edit?: '1'
                readonly eph_setting?: string
                readonly expiration?: number
                readonly from?: string
                readonly id: string
                readonly locale?: string
                readonly notify: string
                readonly offline: number
                readonly original_addressing_mode?: 'lid'
                readonly participant?: string
                readonly participant_lid?: string
                readonly participant_pn?: string
                readonly participant_username?: string
                readonly peer_recipient_lid?: string
                readonly peer_recipient_pn?: string
                readonly peer_recipient_username?: string
                readonly recipient?: string
                readonly recipient_display_name?: string
                readonly recipient_latest_lid?: string
                readonly recipient_lid?: string
                readonly recipient_pn?: string
                readonly sender_lid?: string
                readonly sender_pn?: string
                readonly sts?: number
                readonly t: number
                readonly tb_cooldown: number
                readonly tb_expiration_ts: number
                readonly thread_id?: string
                readonly type?: 'text'
                readonly username?: string
                readonly verified_level: 'high' | 'low' | 'unknown'
                readonly verified_name: string
            }
            readonly children: {
                readonly biz: {
                    readonly tag: 'biz'
                    readonly attrs: {
                        readonly actual_actors: number
                        readonly host_storage: number
                        readonly privacy_mode_ts: number
                    }
                }
                readonly bot: {
                    readonly tag: 'bot'
                    readonly attrs: {
                        readonly biz_bot: '1' | '3'
                    }
                }
                readonly conversion: {
                    readonly tag: 'conversion'
                    readonly attrs: {
                        readonly recipient_status: 'matched' | 'unmatched'
                    }
                }
                readonly ctwa: {
                    readonly tag: 'ctwa'
                    readonly attrs: {
                        readonly conversion_data?: string
                        readonly conversion_source?: string
                        readonly entry_point_conversion_app?: string
                        readonly entry_point_conversion_source?: string
                        readonly signals?: string
                        readonly source_type?: string
                    }
                    readonly children: {
                        readonly source_url: {
                            readonly tag: 'source_url'
                            readonly content: string
                        } | undefined
                    }
                } | undefined
                readonly ctwa_attribution: {
                    readonly tag: 'ctwa_attribution'
                    readonly content: Uint8Array
                } | undefined
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly 'decrypt-fail'?: 'hide'
                    }
                }
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly franking_tag: {
                            readonly tag: 'franking_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly hsm: {
                    readonly tag: 'hsm'
                    readonly attrs: {
                        readonly category?: string
                        readonly id?: string
                        readonly is_template_from_library_edited?: 'false' | 'true'
                        readonly library_template_id?: string
                        readonly sub_tag?: string
                        readonly tag?: string
                    }
                    readonly children: {
                        readonly quality_token: {
                            readonly tag: 'quality_token'
                            readonly attrs: {
                                readonly v?: '1'
                            }
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly meta: {
                    readonly tag: 'meta'
                    readonly attrs: {
                        readonly tm_csat_cooldown: number
                        readonly tm_csat_exp_ts: number
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
                readonly participants: {
                    readonly tag: 'participants'
                    readonly children: {
                        readonly to: ReadonlyArray<{
                            readonly tag: 'to'
                            readonly attrs: {
                                readonly eph_setting?: string
                                readonly jid: string
                                readonly peer_recipient_lid?: string
                                readonly peer_recipient_pn?: string
                                readonly peer_recipient_username?: string
                                readonly recipient_latest_lid?: string
                            }
                        }>
                    }
                }
                readonly pay: {
                    readonly tag: 'pay'
                    readonly attrs: {
                        readonly amount?: string
                        readonly country?: string
                        readonly 'credential-id'?: string
                        readonly currency?: string
                        readonly 'device-id'?: string
                        readonly device_ssid?: string
                        readonly 'expiry-ts': string
                        readonly id?: string
                        readonly is_first_send?: '0' | '1'
                        readonly mpin?: string
                        readonly nonce?: string
                        readonly 'partner-transaction-id'?: string
                        readonly partner_name?: string
                        readonly 'payee-name'?: string
                        readonly 'receiver-name'?: string
                        readonly 'receiver-vpa'?: string
                        readonly 'receiver-vpa-id'?: string
                        readonly receiver_country?: string
                        readonly receiver_name?: string
                        readonly 'request-id': string
                        readonly sender?: string
                        readonly 'sender-name'?: string
                        readonly 'sender-vpa'?: string
                        readonly 'sender-vpa-id'?: string
                        readonly sender_name?: string
                        readonly sender_tracking_url?: string
                        readonly 'seq-no'?: string
                        readonly split_id?: string
                        readonly status?: string
                        readonly token?: string
                        readonly 'tracking-url'?: string
                        readonly 'transaction-created-timestamp'?: string
                        readonly 'transaction-estimated-delivery-timestamp'?: string
                        readonly 'transaction-type'?: 'p2m' | 'p2p'
                        readonly 'transaction-updated-timestamp'?: string
                        readonly transaction_id?: string
                        readonly 'trusted-device-info'?: string
                        readonly type?: 'request' | 'send'
                        readonly 'upi-bank-info'?: string
                        readonly version?: number
                    }
                    readonly children: {
                        readonly receiver_amount: {
                            readonly tag: 'receiver_amount'
                            readonly children: {
                                readonly money: {
                                    readonly tag: 'money'
                                    readonly attrs: {
                                        readonly currency: string
                                        readonly offset: string
                                        readonly value: string
                                    }
                                }
                            }
                        } | undefined
                        readonly sender_amount: {
                            readonly tag: 'sender_amount'
                            readonly children: {
                                readonly money: {
                                    readonly tag: 'money'
                                    readonly attrs: {
                                        readonly currency: string
                                        readonly offset: string
                                        readonly value: string
                                    }
                                }
                            }
                        } | undefined
                        readonly upi_lite_details: {
                            readonly tag: 'upi_lite_details'
                            readonly attrs: {
                                readonly lite_arqc: string
                                readonly lite_purpose: 'DEREGISTER' | 'INIT_TOP_UP' | 'PAY' | 'TOP_UP'
                                readonly lite_reference_number: string
                                readonly lite_timestamp: number
                            }
                        } | undefined
                    }
                }
                readonly rcat: {
                    readonly tag: 'rcat'
                    readonly content: Uint8Array
                } | undefined
                readonly registration: {
                    readonly tag: 'registration'
                    readonly content: Uint8Array
                }
                readonly reporting: {
                    readonly tag: 'reporting'
                    readonly children: {
                        readonly reporting_token: {
                            readonly tag: 'reporting_token'
                            readonly attrs: {
                                readonly v?: number
                            }
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly ta_pad: {
                    readonly tag: 'ta_pad'
                    readonly content: Uint8Array
                }
                readonly test: {
                    readonly tag: 'test'
                    readonly attrs: {
                        readonly config?: string
                    }
                }
                readonly trace: {
                    readonly tag: 'trace'
                    readonly children: {
                        readonly correlation_id: ReadonlyArray<{
                            readonly tag: 'correlation_id'
                            readonly attrs: {
                                readonly type: string
                            }
                            readonly children: {
                                readonly device: {
                                    readonly tag: 'device'
                                    readonly attrs: {
                                        readonly id: number
                                    }
                                } | undefined
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                            }
                        }>
                        readonly edge_id: {
                            readonly tag: 'edge_id'
                            readonly content: Uint8Array
                        } | undefined
                        readonly observability_flags: {
                            readonly tag: 'observability_flags'
                            readonly attrs: {
                                readonly id: number
                            }
                        } | undefined
                        readonly request_id: {
                            readonly tag: 'request_id'
                            readonly content: Uint8Array
                        }
                        readonly trace_id: {
                            readonly tag: 'trace_id'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly transaction: {
                    readonly tag: 'transaction'
                    readonly attrs: {
                        readonly amount?: string
                        readonly 'bank-transaction-id'?: string
                        readonly counter?: number
                        readonly country?: string
                        readonly 'created-ts'?: number
                        readonly 'credential-id'?: string
                        readonly currency?: string
                        readonly 'error-code'?: number
                        readonly 'error-text'?: string
                        readonly 'expiry-ts'?: number
                        readonly gateway_name?: string
                        readonly group?: string
                        readonly id?: string
                        readonly 'incentive-rewards-reserved'?: '0' | '1'
                        readonly 'is-collect'?: '0' | '1'
                        readonly 'is-complaint-eligible'?: '0' | '1'
                        readonly 'is-mandate'?: '0' | '1'
                        readonly 'is-nux-receiver'?: '0' | '1'
                        readonly is_hpp?: '0' | '1'
                        readonly is_interop?: '0' | '1'
                        readonly is_p2m_hybrid?: '0' | '1'
                        readonly is_vpa?: '0' | '1'
                        readonly lite_purpose?: 'DEREGISTER' | 'INIT_TOP_UP' | 'PAY' | 'TOP_UP'
                        readonly 'merchant-name'?: string
                        readonly 'message-id'?: string
                        readonly nodal?: '0' | '1'
                        readonly note?: string
                        readonly 'onboarding-provider'?: 'GO'
                        readonly 'onboarding-provider-id'?: 'GO'
                        readonly 'onboarding-provider-name'?: 'GoPay'
                        readonly 'original-transaction-id'?: string
                        readonly 'partner-transaction-id'?: string
                        readonly partner_name?: string
                        readonly payment_initiator?: 'buyer' | 'seller'
                        readonly payment_instrument_type?: 'hpp_payment_link' | 'upi'
                        readonly psp_transaction_id?: string
                        readonly receiver?: string
                        readonly 'receiver-alias'?: string
                        readonly 'receiver-name'?: string
                        readonly 'receiver-tpap-name'?: string
                        readonly receiver_country?: string
                        readonly receiver_name?: string
                        readonly 'ref-url'?: string
                        readonly 'reference-id'?: string
                        readonly sender?: string
                        readonly 'sender-alias'?: string
                        readonly 'sender-name'?: string
                        readonly sender_name?: string
                        readonly sender_tracking_url?: string
                        readonly 'seq-no'?: string
                        readonly service?: 'FBPAY' | 'UPI'
                        readonly 'spei-ref-num'?: number
                        readonly 'spei-transaction-id'?: string
                        readonly split_id?: string
                        readonly status?: string
                        readonly 'sync-status'?: 'FULL' | 'MISSING_FIELD_NOT_PARTIAL' | 'PARTIAL'
                        readonly 'tracking-url'?: string
                        readonly 'transaction-created-timestamp'?: string
                        readonly 'transaction-estimated-delivery-timestamp'?: string
                        readonly 'transaction-type'?: 'br' | 'incentive' | 'p2m' | 'p2p' | 'payout' | 'remittance' | 'upi' | 'upi_lite'
                        readonly 'transaction-updated-timestamp'?: string
                        readonly transaction_id?: string
                        readonly transaction_referral?: string
                        readonly ts?: number
                        readonly type?: 'send'
                    }
                    readonly children: {
                        readonly amount: {
                            readonly tag: 'amount'
                            readonly children: {
                                readonly money: {
                                    readonly tag: 'money'
                                    readonly attrs: {
                                        readonly currency: string
                                        readonly offset: string
                                        readonly value: string
                                    }
                                }
                            }
                        } | undefined
                        readonly amount_modifiers: {
                            readonly tag: 'amount_modifiers'
                            readonly children: {
                                readonly fee: {
                                    readonly tag: 'fee'
                                    readonly children: {
                                        readonly money: {
                                            readonly tag: 'money'
                                            readonly attrs: {
                                                readonly currency: string
                                                readonly offset: string
                                                readonly value: string
                                            }
                                        }
                                    }
                                } | undefined
                                readonly gst: {
                                    readonly tag: 'gst'
                                    readonly children: {
                                        readonly money: {
                                            readonly tag: 'money'
                                            readonly attrs: {
                                                readonly currency: string
                                                readonly offset: string
                                                readonly value: string
                                            }
                                        }
                                    }
                                } | undefined
                            }
                        } | undefined
                        readonly bill_metadata: {
                            readonly tag: 'bill_metadata'
                            readonly attrs: {
                                readonly bill_ref_id: string
                                readonly bill_ref_number?: string
                                readonly bill_status: 'FAILED' | 'PENDING' | 'SUCCESS'
                                readonly biller_id: string
                                readonly biller_image?: string
                                readonly biller_name: string
                                readonly txn_ref_id?: string
                            }
                        } | undefined
                        readonly complaint: {
                            readonly tag: 'complaint'
                            readonly attrs: {
                                readonly 'complaint-status'?: string
                                readonly 'created-ts'?: number
                                readonly 'updated-ts'?: number
                            }
                        } | undefined
                        readonly external_payment_method: {
                            readonly tag: 'external_payment_method'
                            readonly attrs: {
                                readonly name: string
                                readonly type: 'card' | 'net-banking' | 'upi' | 'wallet'
                            }
                        } | undefined
                        readonly installment: {
                            readonly tag: 'installment'
                            readonly attrs: {
                                readonly max_count?: number
                                readonly selected_count: number
                            }
                            readonly children: {
                                readonly due_amount: {
                                    readonly tag: 'due_amount'
                                    readonly children: {
                                        readonly money: {
                                            readonly tag: 'money'
                                            readonly attrs: {
                                                readonly currency: string
                                                readonly offset: string
                                                readonly value: string
                                            }
                                        }
                                    }
                                } | undefined
                                readonly interest: {
                                    readonly tag: 'interest'
                                    readonly children: {
                                        readonly money: {
                                            readonly tag: 'money'
                                            readonly attrs: {
                                                readonly currency: string
                                                readonly offset: string
                                                readonly value: string
                                            }
                                        }
                                    }
                                } | undefined
                            }
                        }
                        readonly 'international-transaction-detail': {
                            readonly tag: 'international-transaction-detail'
                            readonly attrs: {
                                readonly 'invoice-number'?: string
                            }
                            readonly children: {
                                readonly 'fx-detail': {
                                    readonly tag: 'fx-detail'
                                    readonly attrs: {
                                        readonly 'base-amount': string
                                        readonly 'base-currency': string
                                        readonly 'currency-fx': string
                                        readonly 'currency-markup': string
                                    }
                                }
                            }
                        } | undefined
                        readonly mandate: {
                            readonly tag: 'mandate'
                            readonly attrs: {
                                readonly 'amount-rule': 'EXACT' | 'MAX'
                                readonly 'end-ts': number
                                readonly 'error-code'?: number
                                readonly 'frequency-rule': 'ASPRESENTED' | 'BIMONTHLY' | 'DAILY' | 'FORTNIGHTLY' | 'HALFYEARLY' | 'MONTHLY' | 'ONETIME' | 'QUARTERLY' | 'UNKNOWN' | 'WEEKLY' | 'YEARLY'
                                readonly 'is-revocable': '0' | '1'
                                readonly 'mandate-name'?: string
                                readonly 'mandate-no': string
                                readonly 'purpose-code'?: string
                                readonly 'start-ts': number
                            }
                            readonly children: {
                                readonly 'mandate-update': {
                                    readonly tag: 'mandate-update'
                                    readonly attrs: {
                                        readonly action: 'ACCEPT' | 'REJECT' | 'UNKNOWN'
                                        readonly 'end-ts': number
                                        readonly 'error-code'?: number
                                        readonly 'mandate-update-info': string
                                        readonly 'seq-no': string
                                        readonly status: 'FAILURE' | 'INIT' | 'SUCCESS'
                                    }
                                    readonly children: {
                                        readonly amount: {
                                            readonly tag: 'amount'
                                            readonly children: {
                                                readonly money: {
                                                    readonly tag: 'money'
                                                    readonly attrs: {
                                                        readonly currency: string
                                                        readonly offset: string
                                                        readonly value: string
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                readonly 'original-amount': {
                                    readonly tag: 'original-amount'
                                    readonly children: {
                                        readonly money: {
                                            readonly tag: 'money'
                                            readonly attrs: {
                                                readonly currency: string
                                                readonly offset: string
                                                readonly value: string
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        readonly offer: ReadonlyArray<{
                            readonly tag: 'offer'
                            readonly attrs: {
                                readonly id: string
                            }
                        }>
                        readonly offer_amount: {
                            readonly tag: 'offer_amount'
                            readonly children: {
                                readonly money: {
                                    readonly tag: 'money'
                                    readonly attrs: {
                                        readonly currency: string
                                        readonly offset: string
                                        readonly value: string
                                    }
                                }
                            }
                        } | undefined
                        readonly offer_claim: {
                            readonly tag: 'offer_claim'
                            readonly attrs: {
                                readonly id?: number
                                readonly incentive_payment_id?: string
                                readonly offer_id: number
                                readonly parent_transaction_id?: string
                            }
                        } | undefined
                        readonly order: {
                            readonly tag: 'order'
                            readonly attrs: {
                                readonly id: string
                                readonly message_id?: string
                                readonly payment_config_id?: string
                                readonly type?: string
                            }
                            readonly children: {
                                readonly beneficiaries: {
                                    readonly tag: 'beneficiaries'
                                    readonly children: {
                                        readonly beneficiary: ReadonlyArray<{
                                            readonly tag: 'beneficiary'
                                            readonly attrs: {
                                                readonly address_line1: string
                                                readonly address_line2?: string
                                                readonly city?: string
                                                readonly country: string
                                                readonly name: string
                                                readonly phone_number?: string
                                                readonly postal_code: string
                                                readonly state?: string
                                            }
                                        }>
                                    }
                                } | undefined
                            }
                        }
                        readonly payment_link: {
                            readonly tag: 'payment_link'
                            readonly attrs: {
                                readonly message_id: string
                                readonly order_id: string
                            }
                        } | undefined
                        readonly receiver_amount: {
                            readonly tag: 'receiver_amount'
                            readonly children: {
                                readonly money: {
                                    readonly tag: 'money'
                                    readonly attrs: {
                                        readonly currency: string
                                        readonly offset: string
                                        readonly value: string
                                    }
                                }
                            }
                        } | undefined
                        readonly sender_amount: {
                            readonly tag: 'sender_amount'
                            readonly children: {
                                readonly money: {
                                    readonly tag: 'money'
                                    readonly attrs: {
                                        readonly currency: string
                                        readonly offset: string
                                        readonly value: string
                                    }
                                }
                            }
                        } | undefined
                    }
                }
                readonly unavailable: {
                    readonly tag: 'unavailable'
                    readonly attrs: {
                        readonly hosted?: 'true'
                        readonly type?: 'hosted' | 'view_once'
                    }
                }
                readonly verified_name: {
                    readonly tag: 'verified_name'
                    readonly attrs: {
                        readonly v: number
                        readonly verified_level: 'high' | 'low' | 'unknown'
                    }
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MessageFallbackDeliver: {
        readonly module: 'WASmaxMessageFallbackDeliverRPC'
        readonly opName: 'Deliver'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'message'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly participant?: string
                readonly type?: 'event' | 'media' | 'medianotify' | 'pay' | 'poll' | 'reaction' | 'text'
            }
            readonly children: {
                readonly enc: ReadonlyArray<{
                    readonly tag: 'enc'
                }>
            }
        } }
    }
    readonly MessagePublishIndividual: {
        readonly module: 'WASmaxMessagePublishIndividualRPC'
        readonly opName: 'Individual'
        readonly xmlns: null
        readonly type: 'native_flow'
        readonly request: {
        readonly tag: 'message'
        readonly attrs: {
            readonly category?: string
            readonly client_thread_id: string
            readonly conversation_thread_id: string
            readonly count: number
            readonly device_fanout: 'false'
            readonly duration: number
            readonly edit?: '1' | '2' | '3' | '7' | '8'
            readonly edit_target_id?: string
            readonly id: string
            readonly is_template_from_library_edited?: boolean
            readonly jid: string
            readonly library_template_id?: string
            readonly mediatype?: string
            readonly name: 'full_catalog'
            readonly native_flow_name?: string
            readonly peer_recipient_lid: string
            readonly peer_recipient_pn: string
            readonly peer_recipient_username: string
            readonly recipient: string
            readonly recipient_pn: string
            readonly sender_timestamp_ms?: number
            readonly session_type: 'pq'
            readonly state: 'false' | 'true'
            readonly sticker_type: 'avatar'
            readonly sub_tag?: string
            readonly t?: number
            readonly tag?: string
            readonly target_chat_jid?: string
            readonly target_chat_jid_lid?: string
            readonly target_id: string
            readonly target_sender_jid?: string
            readonly thread_type: number
            readonly to: string
            readonly ttl?: number
            readonly type: 'native_flow'
            readonly v?: '1'
            readonly value: string
            readonly verified_name: string
        }
        readonly children: {
            readonly automated: {
                readonly tag: 'automated'
            }
            readonly biz: {
                readonly tag: 'biz'
                readonly children: {
                    readonly buttons: {
                        readonly tag: 'buttons'
                    }
                }
            }
            readonly bot: {
                readonly tag: 'bot'
                readonly attrs: {
                    readonly type: 'feedback'
                }
                readonly children: {
                    readonly to: {
                        readonly tag: 'to'
                        readonly attrs: {
                            readonly count: number
                            readonly duration: number
                            readonly jid: string
                            readonly mediatype: string
                            readonly native_flow_name?: string
                            readonly session_type: 'pq'
                            readonly state: 'false' | 'true'
                            readonly sticker_type: 'avatar'
                            readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                        }
                        readonly children: {
                            readonly enc: {
                                readonly tag: 'enc'
                                readonly attrs: {
                                    readonly count: number
                                    readonly duration: number
                                    readonly mediatype: string
                                    readonly native_flow_name?: string
                                    readonly session_type: 'pq'
                                    readonly state: 'false' | 'true'
                                    readonly sticker_type: 'avatar'
                                    readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                                    readonly v: '2'
                                }
                                readonly content: Uint8Array
                            }
                        }
                    }
                }
            }
            readonly capability: ReadonlyArray<{
                readonly tag: 'capability'
                readonly attrs: {
                    readonly name: string
                }
            }>
            readonly content_binding: {
                readonly tag: 'content_binding'
            }
            readonly conversion: {
                readonly tag: 'conversion'
                readonly attrs: {
                    readonly recipient_status: string
                }
            }
            readonly 'device-identity': {
                readonly tag: 'device-identity'
                readonly content: Uint8Array
            }
            readonly enc: {
                readonly tag: 'enc'
                readonly attrs: {
                    readonly mediatype: string
                    readonly native_flow_name?: string
                    readonly session_type: 'pq'
                    readonly state: 'false' | 'true'
                    readonly sticker_type: 'avatar'
                    readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                    readonly v: '2'
                }
                readonly content: Uint8Array
            }
            readonly franking: {
                readonly tag: 'franking'
                readonly children: {
                    readonly franking_tag: {
                        readonly tag: 'franking_tag'
                    }
                }
            }
            readonly hsm: {
                readonly tag: 'hsm'
                readonly attrs: {
                    readonly buttons?: '1'
                    readonly category?: string
                    readonly id?: string
                    readonly is_template_from_library_edited?: boolean
                    readonly library_template_id?: string
                    readonly name: 'full_catalog'
                    readonly objective?: string
                    readonly sub_tag?: string
                    readonly tag?: string
                    readonly v?: '1'
                }
                readonly children: {
                    readonly quality_token: {
                        readonly tag: 'quality_token'
                        readonly attrs: {
                            readonly v?: '1'
                        }
                    }
                }
            }
            readonly meta: {
                readonly tag: 'meta'
                readonly attrs: {
                    readonly appdata: 'default' | 'group_history' | 'member_tag'
                    readonly conversation_thread_id: string
                    readonly destination_id: string
                    readonly group_invite: string
                    readonly is_status_mention: 'true'
                    readonly message_association_type: string
                    readonly original_msg_t: number
                    readonly peripheral: string
                    readonly receiver_account_kind: string
                    readonly st: number
                    readonly type: 'scheduled_message'
                    readonly view_once: 'true'
                }
                readonly children: {
                    readonly key: {
                        readonly tag: 'key'
                        readonly attrs: {
                            readonly rkid: string
                        }
                        readonly content: Uint8Array
                    }
                }
            }
            readonly mixed_metadata: {
                readonly tag: 'mixed_metadata'
                readonly children: {
                    readonly payments_metadata: {
                        readonly tag: 'payments_metadata'
                        readonly attrs: {
                            readonly version: number
                        }
                    }
                }
            }
            readonly multicast: {
                readonly tag: 'multicast'
            }
            readonly native_flow: {
                readonly tag: 'native_flow'
                readonly attrs: {
                    readonly name: string
                    readonly v?: number
                }
                readonly children: {
                    readonly capability: ReadonlyArray<{
                        readonly tag: 'capability'
                        readonly attrs: {
                            readonly name: string
                        }
                    }>
                    readonly mixed_metadata: {
                        readonly tag: 'mixed_metadata'
                        readonly children: {
                            readonly payments_metadata: {
                                readonly tag: 'payments_metadata'
                                readonly attrs: {
                                    readonly version: number
                                }
                            }
                        }
                    }
                }
            }
            readonly padding: {
                readonly tag: 'padding'
                readonly content: Uint8Array
            }
            readonly quality_token: {
                readonly tag: 'quality_token'
                readonly attrs: {
                    readonly v?: '1'
                }
            }
            readonly reporting: {
                readonly tag: 'reporting'
                readonly children: {
                    readonly reporting_token: {
                        readonly tag: 'reporting_token'
                        readonly attrs: {
                            readonly v: number
                        }
                        readonly content: Uint8Array
                    }
                }
            }
            readonly request_id: {
                readonly tag: 'request_id'
            }
            readonly ta_pad: {
                readonly tag: 'ta_pad'
            }
            readonly tctoken: {
                readonly tag: 'tctoken'
                readonly attrs: {
                    readonly t?: number
                }
            }
            readonly test: {
                readonly tag: 'test'
                readonly attrs: {
                    readonly config?: string
                }
            }
            readonly to: ReadonlyArray<{
                readonly tag: 'to'
                readonly attrs: {
                    readonly jid: string
                }
            }>
            readonly trace: {
                readonly tag: 'trace'
                readonly children: {
                    readonly request_id: {
                        readonly tag: 'request_id'
                    }
                }
            }
            readonly url_number: {
                readonly tag: 'url_number'
            }
            readonly url_text: {
                readonly tag: 'url_text'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Negative'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly application_error: number
                readonly backoff: number
                readonly class?: 'message'
                readonly edit?: '1'
                readonly error: string
                readonly from?: string
                readonly id?: string
                readonly recipient?: string
                readonly t?: number
            }
            readonly children: {
                readonly biz: {
                    readonly tag: 'biz'
                    readonly attrs: {
                        readonly billable: 'false' | 'true'
                        readonly expiration_timestamp?: number
                        readonly paid_convo_id: string
                        readonly pricing_category?: string
                        readonly pricing_model: 'CBP' | 'NBP' | 'PMP'
                        readonly pricing_type?: 'free_customer_service' | 'free_entry_point' | 'regular'
                    }
                    readonly children: {
                        readonly delivery_context: {
                            readonly tag: 'delivery_context'
                            readonly attrs: {
                                readonly optimization_goal: 'delivery' | 'no_optimization'
                            }
                        } | undefined
                        readonly origin: {
                            readonly tag: 'origin'
                            readonly attrs: {
                                readonly type: string
                            }
                            readonly children: {
                                readonly referral: {
                                    readonly tag: 'referral'
                                    readonly attrs: {
                                        readonly source_type?: string
                                    }
                                    readonly children: {
                                        readonly source_url: {
                                            readonly tag: 'source_url'
                                            readonly content: string
                                        } | undefined
                                    }
                                } | undefined
                            }
                        } | undefined
                        readonly pricing: {
                            readonly tag: 'pricing'
                            readonly attrs: {
                                readonly analytics_conversation_id?: string
                                readonly b2c_timestamp?: number
                                readonly business_country_code?: string
                                readonly consumer_country_code?: string
                                readonly conversation_status?: number
                                readonly latest_c2b_timestamp?: number
                            }
                        } | undefined
                    }
                }
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly reporting_tag: {
                            readonly tag: 'reporting_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class?: 'message'
                readonly edit?: '1'
                readonly from?: string
                readonly id?: string
                readonly participant?: string
                readonly phash: string
                readonly recipient?: string
                readonly refresh_lid: 'false' | 'true'
                readonly t?: number
            }
            readonly children: {
                readonly biz: {
                    readonly tag: 'biz'
                    readonly attrs: {
                        readonly billable: 'false' | 'true'
                        readonly expiration_timestamp?: number
                        readonly paid_convo_id: string
                        readonly pricing_category?: string
                        readonly pricing_model: 'CBP' | 'NBP' | 'PMP'
                        readonly pricing_type?: 'free_customer_service' | 'free_entry_point' | 'regular'
                    }
                    readonly children: {
                        readonly delivery_context: {
                            readonly tag: 'delivery_context'
                            readonly attrs: {
                                readonly optimization_goal: 'delivery' | 'no_optimization'
                            }
                        } | undefined
                        readonly origin: {
                            readonly tag: 'origin'
                            readonly attrs: {
                                readonly type: string
                            }
                            readonly children: {
                                readonly referral: {
                                    readonly tag: 'referral'
                                    readonly attrs: {
                                        readonly source_type?: string
                                    }
                                    readonly children: {
                                        readonly source_url: {
                                            readonly tag: 'source_url'
                                            readonly content: string
                                        } | undefined
                                    }
                                } | undefined
                            }
                        } | undefined
                        readonly pricing: {
                            readonly tag: 'pricing'
                            readonly attrs: {
                                readonly analytics_conversation_id?: string
                                readonly b2c_timestamp?: number
                                readonly business_country_code?: string
                                readonly consumer_country_code?: string
                                readonly conversation_status?: number
                                readonly latest_c2b_timestamp?: number
                            }
                        } | undefined
                    }
                }
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly reporting_tag: {
                            readonly tag: 'reporting_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly rcat: {
                    readonly tag: 'rcat'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MessagePublishNewsletter: {
        readonly module: 'WASmaxMessagePublishNewsletterRPC'
        readonly opName: 'Newsletter'
        readonly xmlns: null
        readonly type: 'text'
        readonly request: {
        readonly tag: 'message'
        readonly attrs: {
            readonly edit: '7'
            readonly id: string
            readonly server_id: number
            readonly to: string
            readonly type: 'text'
        }
        readonly children: {
            readonly meta: {
                readonly tag: 'meta'
                readonly attrs: {
                    readonly questiontype: 'response'
                }
            }
            readonly plaintext: {
                readonly tag: 'plaintext'
                readonly content: Uint8Array
            }
            readonly reaction: {
                readonly tag: 'reaction'
                readonly attrs: {
                    readonly code: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Negative'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly application_error: number
                readonly backoff: number
                readonly class?: 'message'
                readonly edit?: '1'
                readonly error: string
                readonly from?: string
                readonly id?: string
                readonly t?: number
            }
            readonly children: {
                readonly biz: {
                    readonly tag: 'biz'
                    readonly attrs: {
                        readonly billable: 'false' | 'true'
                        readonly expiration_timestamp?: number
                        readonly paid_convo_id: string
                        readonly pricing_category?: string
                        readonly pricing_model: 'CBP' | 'NBP' | 'PMP'
                        readonly pricing_type?: 'free_customer_service' | 'free_entry_point' | 'regular'
                    }
                    readonly children: {
                        readonly delivery_context: {
                            readonly tag: 'delivery_context'
                            readonly attrs: {
                                readonly optimization_goal: 'delivery' | 'no_optimization'
                            }
                        } | undefined
                        readonly origin: {
                            readonly tag: 'origin'
                            readonly attrs: {
                                readonly type: string
                            }
                            readonly children: {
                                readonly referral: {
                                    readonly tag: 'referral'
                                    readonly attrs: {
                                        readonly source_type?: string
                                    }
                                    readonly children: {
                                        readonly source_url: {
                                            readonly tag: 'source_url'
                                            readonly content: string
                                        } | undefined
                                    }
                                } | undefined
                            }
                        } | undefined
                        readonly pricing: {
                            readonly tag: 'pricing'
                            readonly attrs: {
                                readonly analytics_conversation_id?: string
                                readonly b2c_timestamp?: number
                                readonly business_country_code?: string
                                readonly consumer_country_code?: string
                                readonly conversation_status?: number
                                readonly latest_c2b_timestamp?: number
                            }
                        } | undefined
                    }
                }
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly reporting_tag: {
                            readonly tag: 'reporting_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class?: 'message'
                readonly edit?: '1'
                readonly from?: string
                readonly id?: string
                readonly response_server_id?: string
                readonly server_id?: number
                readonly t?: number
            }
            readonly children: {
                readonly biz: {
                    readonly tag: 'biz'
                    readonly attrs: {
                        readonly billable: 'false' | 'true'
                        readonly expiration_timestamp?: number
                        readonly paid_convo_id: string
                        readonly pricing_category?: string
                        readonly pricing_model: 'CBP' | 'NBP' | 'PMP'
                        readonly pricing_type?: 'free_customer_service' | 'free_entry_point' | 'regular'
                    }
                    readonly children: {
                        readonly delivery_context: {
                            readonly tag: 'delivery_context'
                            readonly attrs: {
                                readonly optimization_goal: 'delivery' | 'no_optimization'
                            }
                        } | undefined
                        readonly origin: {
                            readonly tag: 'origin'
                            readonly attrs: {
                                readonly type: string
                            }
                            readonly children: {
                                readonly referral: {
                                    readonly tag: 'referral'
                                    readonly attrs: {
                                        readonly source_type?: string
                                    }
                                    readonly children: {
                                        readonly source_url: {
                                            readonly tag: 'source_url'
                                            readonly content: string
                                        } | undefined
                                    }
                                } | undefined
                            }
                        } | undefined
                        readonly pricing: {
                            readonly tag: 'pricing'
                            readonly attrs: {
                                readonly analytics_conversation_id?: string
                                readonly b2c_timestamp?: number
                                readonly business_country_code?: string
                                readonly consumer_country_code?: string
                                readonly conversation_status?: number
                                readonly latest_c2b_timestamp?: number
                            }
                        } | undefined
                    }
                }
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly reporting_tag: {
                            readonly tag: 'reporting_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly rcat: {
                    readonly tag: 'rcat'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MessageRequestSpamMarker: {
        readonly module: 'WASmaxMessageRequestSpamMarkerRPC'
        readonly opName: 'SpamMarker'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly spam: {
                    readonly tag: 'spam'
                    readonly attrs: {
                        readonly state: 'complete' | 'continue'
                    }
                }
            }
        } }
    }
    readonly MessageRequestThreadNotification: {
        readonly module: 'WASmaxMessageRequestThreadNotificationRPC'
        readonly opName: 'ThreadNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly to?: string
                readonly type: 'fbid:thread'
            }
            readonly children: {
                readonly thread_actions: {
                    readonly tag: 'thread_actions'
                    readonly attrs: {
                        readonly thread_id: string
                    }
                    readonly children: {
                        readonly folder: {
                            readonly tag: 'folder'
                            readonly attrs: {
                                readonly folder_id: number
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly MultiwaydMultiway: {
        readonly module: 'WASmaxMultiwaydMultiwayRPC'
        readonly opName: 'Multiway'
        readonly xmlns: 'fb:multiway'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'fb:multiway'
        }
        readonly children: {
            readonly multiway: {
                readonly tag: 'multiway'
                readonly attrs: {
                    readonly binary_version: number
                    readonly conference_name?: string
                    readonly flow_id?: string
                    readonly message_type?: string
                    readonly server_info_data?: string
                    readonly transaction_id?: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly multiway: {
                    readonly tag: 'multiway'
                    readonly attrs: {
                        readonly binary_version?: number
                    }
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly MultiwaydMultiwayNotification: {
        readonly module: 'WASmaxMultiwaydMultiwayNotificationRPC'
        readonly opName: 'MultiwayNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'fb:multiway'
            }
            readonly children: {
                readonly multiway: {
                    readonly tag: 'multiway'
                    readonly attrs: {
                        readonly binary_version: number
                        readonly transaction_id?: string
                    }
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly NewslettersGetNewsletterMessageUpdates: {
        readonly module: 'WASmaxNewslettersGetNewsletterMessageUpdatesRPC'
        readonly opName: 'GetNewsletterMessageUpdates'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly message_updates: {
                readonly tag: 'message_updates'
                readonly attrs: {
                    readonly after: number
                    readonly before: number
                    readonly count: number
                    readonly since?: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly message_updates: {
                    readonly tag: 'message_updates'
                    readonly children: {
                        readonly messages: {
                            readonly tag: 'messages'
                            readonly attrs: {
                                readonly jid?: string
                                readonly t?: number
                            }
                            readonly children: {
                                readonly message: ReadonlyArray<{
                                    readonly tag: 'message'
                                    readonly attrs: {
                                        readonly edit?: '3'
                                        readonly id?: string
                                        readonly is_sender?: 'true'
                                        readonly server_id: number
                                        readonly t?: number
                                        readonly type?: 'text'
                                    }
                                    readonly children: {
                                        readonly forwards_count: {
                                            readonly tag: 'forwards_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly meta: {
                                            readonly tag: 'meta'
                                            readonly attrs: {
                                                readonly original_msg_t: number
                                            }
                                        }
                                        readonly plaintext: {
                                            readonly tag: 'plaintext'
                                            readonly content: Uint8Array
                                        }
                                        readonly rcat: {
                                            readonly tag: 'rcat'
                                            readonly content: Uint8Array
                                        }
                                        readonly reactions: {
                                            readonly tag: 'reactions'
                                            readonly children: {
                                                readonly reaction: ReadonlyArray<{
                                                    readonly tag: 'reaction'
                                                    readonly attrs: {
                                                        readonly code: string
                                                        readonly count: number
                                                    }
                                                }>
                                            }
                                        }
                                        readonly responses_count: {
                                            readonly tag: 'responses_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly views_count: ReadonlyArray<{
                                            readonly tag: 'views_count'
                                            readonly attrs: {
                                                readonly count: number
                                                readonly type?: 'views'
                                            }
                                        }>
                                        readonly votes: {
                                            readonly tag: 'votes'
                                            readonly children: {
                                                readonly vote: ReadonlyArray<{
                                                    readonly tag: 'vote'
                                                    readonly attrs: {
                                                        readonly count: number
                                                    }
                                                    readonly content: Uint8Array
                                                }>
                                            }
                                        }
                                    }
                                }>
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly NewslettersGetNewsletterMessages: {
        readonly module: 'WASmaxNewslettersGetNewsletterMessagesRPC'
        readonly opName: 'GetNewsletterMessages'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly count: number
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly messages: {
                readonly tag: 'messages'
                readonly attrs: {
                    readonly count: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly messages: {
                    readonly tag: 'messages'
                    readonly attrs: {
                        readonly jid?: string
                        readonly t?: number
                    }
                    readonly children: {
                        readonly message: ReadonlyArray<{
                            readonly tag: 'message'
                            readonly attrs: {
                                readonly edit?: '3'
                                readonly id?: string
                                readonly is_sender?: 'true'
                                readonly server_id: number
                                readonly t?: number
                                readonly type?: 'text'
                            }
                            readonly children: {
                                readonly forwards_count: {
                                    readonly tag: 'forwards_count'
                                    readonly attrs: {
                                        readonly count: number
                                    }
                                }
                                readonly meta: {
                                    readonly tag: 'meta'
                                    readonly attrs: {
                                        readonly original_msg_t: number
                                    }
                                }
                                readonly plaintext: {
                                    readonly tag: 'plaintext'
                                    readonly content: Uint8Array
                                }
                                readonly rcat: {
                                    readonly tag: 'rcat'
                                    readonly content: Uint8Array
                                }
                                readonly reactions: {
                                    readonly tag: 'reactions'
                                    readonly children: {
                                        readonly reaction: ReadonlyArray<{
                                            readonly tag: 'reaction'
                                            readonly attrs: {
                                                readonly code: string
                                                readonly count: number
                                            }
                                        }>
                                    }
                                }
                                readonly responses_count: {
                                    readonly tag: 'responses_count'
                                    readonly attrs: {
                                        readonly count: number
                                    }
                                }
                                readonly views_count: ReadonlyArray<{
                                    readonly tag: 'views_count'
                                    readonly attrs: {
                                        readonly count: number
                                        readonly type?: 'views'
                                    }
                                }>
                                readonly votes: {
                                    readonly tag: 'votes'
                                    readonly children: {
                                        readonly vote: ReadonlyArray<{
                                            readonly tag: 'vote'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                            readonly content: Uint8Array
                                        }>
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly NewslettersGetNewsletterResponses: {
        readonly module: 'WASmaxNewslettersGetNewsletterResponsesRPC'
        readonly opName: 'GetNewsletterResponses'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly question_responses: {
                readonly tag: 'question_responses'
                readonly attrs: {
                    readonly before: string
                    readonly count: number
                    readonly server_id: number
                }
                readonly children: {
                    readonly contacts: {
                        readonly tag: 'contacts'
                    }
                    readonly filters: {
                        readonly tag: 'filters'
                        readonly children: {
                            readonly contacts: {
                                readonly tag: 'contacts'
                            }
                            readonly replied: {
                                readonly tag: 'replied'
                            }
                            readonly starred: {
                                readonly tag: 'starred'
                            }
                        }
                    }
                    readonly replied: {
                        readonly tag: 'replied'
                    }
                    readonly search: {
                        readonly tag: 'search'
                        readonly attrs: {
                            readonly text: string
                        }
                    }
                    readonly starred: {
                        readonly tag: 'starred'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly question_responses: {
                    readonly tag: 'question_responses'
                    readonly attrs: {
                        readonly server_id: number
                    }
                    readonly children: {
                        readonly question_response: ReadonlyArray<{
                            readonly tag: 'question_response'
                            readonly children: {
                                readonly flags: {
                                    readonly tag: 'flags'
                                }
                                readonly message: {
                                    readonly tag: 'message'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly is_sender?: 'true'
                                        readonly t: number
                                        readonly type?: 'text'
                                    }
                                    readonly children: {
                                        readonly meta: {
                                            readonly tag: 'meta'
                                            readonly attrs: {
                                                readonly questiontype: 'response'
                                            }
                                        }
                                        readonly plaintext: {
                                            readonly tag: 'plaintext'
                                            readonly content: Uint8Array
                                        }
                                    }
                                }
                                readonly sender: {
                                    readonly tag: 'sender'
                                    readonly attrs: {
                                        readonly lid?: string
                                        readonly notify_name?: string
                                    }
                                    readonly children: {
                                        readonly picture: {
                                            readonly tag: 'picture'
                                            readonly attrs: {
                                                readonly direct_path: string
                                            }
                                        }
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly NewslettersGetNewsletterStatusUpdates: {
        readonly module: 'WASmaxNewslettersGetNewsletterStatusUpdatesRPC'
        readonly opName: 'GetNewsletterStatusUpdates'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'get'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly status_updates: {
                readonly tag: 'status_updates'
                readonly attrs: {
                    readonly after: number
                    readonly before: number
                    readonly count: number
                    readonly since?: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly status_updates: {
                    readonly tag: 'status_updates'
                    readonly children: {
                        readonly statuses: {
                            readonly tag: 'statuses'
                            readonly attrs: {
                                readonly jid?: string
                                readonly t?: number
                            }
                            readonly children: {
                                readonly status: ReadonlyArray<{
                                    readonly tag: 'status'
                                    readonly attrs: {
                                        readonly edit?: '8'
                                        readonly id?: string
                                        readonly is_sender?: 'true'
                                        readonly server_id: number
                                        readonly t?: number
                                        readonly type?: 'text'
                                    }
                                    readonly children: {
                                        readonly meta: {
                                            readonly tag: 'meta'
                                            readonly attrs: {
                                                readonly original_msg_t: number
                                            }
                                        }
                                        readonly plaintext: {
                                            readonly tag: 'plaintext'
                                            readonly content: Uint8Array
                                        }
                                        readonly reaction: {
                                            readonly tag: 'reaction'
                                            readonly attrs: {
                                                readonly code: string
                                            }
                                        }
                                        readonly reactions: {
                                            readonly tag: 'reactions'
                                            readonly children: {
                                                readonly reaction: ReadonlyArray<{
                                                    readonly tag: 'reaction'
                                                    readonly attrs: {
                                                        readonly code: string
                                                        readonly count: number
                                                    }
                                                }>
                                            }
                                        }
                                        readonly responses_count: {
                                            readonly tag: 'responses_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly views_count: {
                                            readonly tag: 'views_count'
                                            readonly attrs: {
                                                readonly count: number
                                                readonly type: 'views'
                                            }
                                        }
                                    }
                                }>
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly NewslettersGetNewsletterStatuses: {
        readonly module: 'WASmaxNewslettersGetNewsletterStatusesRPC'
        readonly opName: 'GetNewsletterStatuses'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly count: number
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly statuses: {
                readonly tag: 'statuses'
                readonly attrs: {
                    readonly count: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly statuses: {
                    readonly tag: 'statuses'
                    readonly attrs: {
                        readonly jid?: string
                        readonly t?: number
                    }
                    readonly children: {
                        readonly status: ReadonlyArray<{
                            readonly tag: 'status'
                            readonly attrs: {
                                readonly edit?: '8'
                                readonly id?: string
                                readonly is_sender?: 'true'
                                readonly server_id: number
                                readonly t?: number
                                readonly type?: 'text'
                            }
                            readonly children: {
                                readonly meta: {
                                    readonly tag: 'meta'
                                    readonly attrs: {
                                        readonly original_msg_t: number
                                    }
                                }
                                readonly plaintext: {
                                    readonly tag: 'plaintext'
                                    readonly content: Uint8Array
                                }
                                readonly reaction: {
                                    readonly tag: 'reaction'
                                    readonly attrs: {
                                        readonly code: string
                                    }
                                }
                                readonly reactions: {
                                    readonly tag: 'reactions'
                                    readonly children: {
                                        readonly reaction: ReadonlyArray<{
                                            readonly tag: 'reaction'
                                            readonly attrs: {
                                                readonly code: string
                                                readonly count: number
                                            }
                                        }>
                                    }
                                }
                                readonly responses_count: {
                                    readonly tag: 'responses_count'
                                    readonly attrs: {
                                        readonly count: number
                                    }
                                }
                                readonly views_count: {
                                    readonly tag: 'views_count'
                                    readonly attrs: {
                                        readonly count: number
                                        readonly type: 'views'
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly NewslettersLiveUpdatesNotification: {
        readonly module: 'WASmaxNewslettersLiveUpdatesNotificationRPC'
        readonly opName: 'LiveUpdatesNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'newsletter'
            }
            readonly children: {
                readonly live_updates: {
                    readonly tag: 'live_updates'
                    readonly children: {
                        readonly messages: {
                            readonly tag: 'messages'
                            readonly attrs: {
                                readonly jid?: string
                                readonly t?: number
                            }
                            readonly children: {
                                readonly message: ReadonlyArray<{
                                    readonly tag: 'message'
                                    readonly attrs: {
                                        readonly edit?: '3'
                                        readonly id?: string
                                        readonly is_sender?: 'true'
                                        readonly server_id: number
                                        readonly t?: number
                                        readonly type?: 'text'
                                    }
                                    readonly children: {
                                        readonly forwards_count: {
                                            readonly tag: 'forwards_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly meta: {
                                            readonly tag: 'meta'
                                            readonly attrs: {
                                                readonly original_msg_t: number
                                            }
                                        }
                                        readonly plaintext: {
                                            readonly tag: 'plaintext'
                                            readonly content: Uint8Array
                                        }
                                        readonly rcat: {
                                            readonly tag: 'rcat'
                                            readonly content: Uint8Array
                                        }
                                        readonly reactions: {
                                            readonly tag: 'reactions'
                                            readonly children: {
                                                readonly reaction: ReadonlyArray<{
                                                    readonly tag: 'reaction'
                                                    readonly attrs: {
                                                        readonly code: string
                                                        readonly count: number
                                                    }
                                                }>
                                            }
                                        }
                                        readonly responses_count: {
                                            readonly tag: 'responses_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly views_count: ReadonlyArray<{
                                            readonly tag: 'views_count'
                                            readonly attrs: {
                                                readonly count: number
                                                readonly type?: 'views'
                                            }
                                        }>
                                        readonly votes: {
                                            readonly tag: 'votes'
                                            readonly children: {
                                                readonly vote: ReadonlyArray<{
                                                    readonly tag: 'vote'
                                                    readonly attrs: {
                                                        readonly count: number
                                                    }
                                                    readonly content: Uint8Array
                                                }>
                                            }
                                        }
                                    }
                                }>
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly NewslettersMyAddOns: {
        readonly module: 'WASmaxNewslettersMyAddOnsRPC'
        readonly opName: 'MyAddOns'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly my_addons: {
                readonly tag: 'my_addons'
                readonly attrs: {
                    readonly jid?: string
                    readonly limit: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly my_addons: {
                    readonly tag: 'my_addons'
                    readonly children: {
                        readonly messages: ReadonlyArray<{
                            readonly tag: 'messages'
                            readonly attrs: {
                                readonly jid: string
                            }
                            readonly children: {
                                readonly message: ReadonlyArray<{
                                    readonly tag: 'message'
                                    readonly attrs: {
                                        readonly server_id: number
                                    }
                                    readonly children: {
                                        readonly reaction: {
                                            readonly tag: 'reaction'
                                            readonly attrs: {
                                                readonly code: string
                                                readonly t: number
                                            }
                                        }
                                        readonly votes: {
                                            readonly tag: 'votes'
                                            readonly attrs: {
                                                readonly t: number
                                            }
                                            readonly children: {
                                                readonly vote: ReadonlyArray<{
                                                    readonly tag: 'vote'
                                                    readonly content: Uint8Array
                                                }>
                                            }
                                        }
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly NewslettersStatusMyAddOns: {
        readonly module: 'WASmaxNewslettersStatusMyAddOnsRPC'
        readonly opName: 'StatusMyAddOns'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly my_addons: {
                readonly tag: 'my_addons'
                readonly attrs: {
                    readonly jid?: string
                    readonly limit: number
                    readonly type: 'status'
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly my_addons: {
                    readonly tag: 'my_addons'
                    readonly attrs: {
                        readonly type: 'status'
                    }
                    readonly children: {
                        readonly statuses: ReadonlyArray<{
                            readonly tag: 'statuses'
                            readonly attrs: {
                                readonly jid: string
                            }
                            readonly children: {
                                readonly status: ReadonlyArray<{
                                    readonly tag: 'status'
                                    readonly attrs: {
                                        readonly server_id: number
                                    }
                                    readonly children: {
                                        readonly reaction: {
                                            readonly tag: 'reaction'
                                            readonly attrs: {
                                                readonly code: string
                                                readonly t: number
                                            }
                                        }
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly NewslettersSubscribeToLiveUpdates: {
        readonly module: 'WASmaxNewslettersSubscribeToLiveUpdatesRPC'
        readonly opName: 'SubscribeToLiveUpdates'
        readonly xmlns: 'newsletter'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'set'
            readonly xmlns: 'newsletter'
        }
        readonly children: {
            readonly live_updates: {
                readonly tag: 'live_updates'
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly live_updates: {
                    readonly tag: 'live_updates'
                    readonly attrs: {
                        readonly duration: number
                    }
                }
            }
        } }
    }
    readonly NotificationFallbackGenericNotification: {
        readonly module: 'WASmaxNotificationFallbackGenericNotificationRPC'
        readonly opName: 'GenericNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly participant?: string
                readonly type?: string
            }
        } }
    }
    readonly OfflineBatch: {
        readonly module: 'WASmaxOfflineBatchRPC'
        readonly opName: 'Batch'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'ib'
        readonly children: {
            readonly offline_batch: {
                readonly tag: 'offline_batch'
                readonly attrs: {
                    readonly count: number
                }
            }
        }
    }
        readonly response:
        | never
    }
    readonly OfflineCompletion: {
        readonly module: 'WASmaxOfflineCompletionRPC'
        readonly opName: 'Completion'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly offline: {
                    readonly tag: 'offline'
                    readonly attrs: {
                        readonly count: number
                    }
                }
            }
        } }
    }
    readonly OfflinePreview: {
        readonly module: 'WASmaxOfflinePreviewRPC'
        readonly opName: 'Preview'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly offline_preview: {
                    readonly tag: 'offline_preview'
                    readonly attrs: {
                        readonly appdata: number
                        readonly call: number
                        readonly count: number
                        readonly message: number
                        readonly notification: number
                        readonly receipt: number
                    }
                }
            }
        } }
    }
    readonly OfflineThreadMetadata: {
        readonly module: 'WASmaxOfflineThreadMetadataRPC'
        readonly opName: 'ThreadMetadata'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly thread_metadata: {
                    readonly tag: 'thread_metadata'
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly from: string
                                readonly t: number
                            }
                        }>
                        readonly notifications: {
                            readonly tag: 'notifications'
                            readonly attrs: {
                                readonly count: number
                            }
                        } | undefined
                        readonly status_msgs: {
                            readonly tag: 'status_msgs'
                            readonly attrs: {
                                readonly count: number
                            }
                            readonly children: {
                                readonly item: ReadonlyArray<{
                                    readonly tag: 'item'
                                    readonly attrs: {
                                        readonly from: string
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly PassiveModeActiveIQ: {
        readonly module: 'WASmaxPassiveModeActiveIQRPC'
        readonly opName: 'ActiveIQ'
        readonly xmlns: 'passive'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'passive'
        }
        readonly children: {
            readonly active: {
                readonly tag: 'active'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly PassiveModePassiveIQ: {
        readonly module: 'WASmaxPassiveModePassiveIQRPC'
        readonly opName: 'PassiveIQ'
        readonly xmlns: 'passive'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'passive'
        }
        readonly children: {
            readonly passive: {
                readonly tag: 'passive'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly PingsClient: {
        readonly module: 'WASmaxOutPingsClientRequest'
        readonly opName: 'Client'
        readonly xmlns: 'w:p'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'w:p'
        }
    }
        readonly response:
        | { readonly variant: 'ServerResponse'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly t: number
                readonly type: 'result'
            }
        } }
    }
    readonly PingsServerPing: {
        readonly module: 'WASmaxPingsServerPingRPC'
        readonly opName: 'ServerPing'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id?: string
                readonly t: number
                readonly type: 'get'
                readonly xmlns: 'urn:xmpp:ping'
            }
        } }
    }
    readonly PreKeysAdd: {
        readonly module: 'WASmaxPreKeysAddRPC'
        readonly opName: 'Add'
        readonly xmlns: 'encrypt'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'encrypt'
        }
        readonly children: {
            readonly id: {
                readonly tag: 'id'
            }
            readonly op: {
                readonly tag: 'op'
                readonly attrs: {
                    readonly mode: 'add'
                }
            }
            readonly pq_list: {
                readonly tag: 'pq_list'
                readonly children: {
                    readonly key: ReadonlyArray<{
                        readonly tag: 'key'
                        readonly children: {
                            readonly id: {
                                readonly tag: 'id'
                            }
                            readonly signature: {
                                readonly tag: 'signature'
                                readonly content: Uint8Array
                            }
                            readonly value: {
                                readonly tag: 'value'
                            }
                        }
                    }>
                }
            }
            readonly value: {
                readonly tag: 'value'
            }
        }
    }
        readonly response:
        | { readonly variant: 'RequestError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly count_low: 'true'
                    }
                }
                readonly pq_list: {
                    readonly tag: 'pq_list'
                    readonly attrs: {
                        readonly count_low: 'true'
                    }
                }
            }
        } }
    }
    readonly PreKeysDelete: {
        readonly module: 'WASmaxPreKeysDeleteRPC'
        readonly opName: 'Delete'
        readonly xmlns: 'encrypt'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'encrypt'
        }
        readonly children: {
            readonly list: {
                readonly tag: 'list'
            } | undefined
            readonly op: {
                readonly tag: 'op'
                readonly attrs: {
                    readonly mode: 'delete'
                }
            }
            readonly pq_list: {
                readonly tag: 'pq_list'
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'RequestError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly PreKeysFetchDigest: {
        readonly module: 'WASmaxPreKeysFetchDigestRPC'
        readonly opName: 'FetchDigest'
        readonly xmlns: 'encrypt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'encrypt'
        }
        readonly children: {
            readonly digest: {
                readonly tag: 'digest'
            }
        }
    }
        readonly response:
        | { readonly variant: 'RequestError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly digest: {
                    readonly tag: 'digest'
                    readonly attrs: {
                        readonly identity_type?: string
                    }
                    readonly children: {
                        readonly hash: {
                            readonly tag: 'hash'
                            readonly content: Uint8Array
                        }
                        readonly identity: {
                            readonly tag: 'identity'
                            readonly content: Uint8Array
                        }
                        readonly list: {
                            readonly tag: 'list'
                            readonly children: {
                                readonly id: ReadonlyArray<{
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }>
                            }
                        }
                        readonly pq_last_resort_key: {
                            readonly tag: 'pq_last_resort_key'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly pq_list: {
                            readonly tag: 'pq_list'
                            readonly children: {
                                readonly id: ReadonlyArray<{
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }>
                            }
                        }
                        readonly registration: {
                            readonly tag: 'registration'
                            readonly content: Uint8Array
                        }
                        readonly skey: {
                            readonly tag: 'skey'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly type: {
                            readonly tag: 'type'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly PreKeysFetchKeyBundles: {
        readonly module: 'WASmaxPreKeysFetchKeyBundlesRPC'
        readonly opName: 'FetchKeyBundles'
        readonly xmlns: 'encrypt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'encrypt'
        }
        readonly children: {
            readonly key: {
                readonly tag: 'key'
                readonly attrs: {
                    readonly context_jid?: string
                    readonly pqsupport?: 'true'
                }
                readonly children: {
                    readonly user: ReadonlyArray<{
                        readonly tag: 'user'
                        readonly attrs: {
                            readonly jid: string
                            readonly reason?: 'identity'
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'RequestError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly children: {
                        readonly user: ReadonlyArray<{
                            readonly tag: 'user'
                            readonly attrs: {
                                readonly is_cloud_api?: 'true'
                                readonly jid: string
                                readonly t?: number
                            }
                            readonly children: {
                                readonly 'device-identity': {
                                    readonly tag: 'device-identity'
                                    readonly content: Uint8Array
                                }
                                readonly error: {
                                    readonly tag: 'error'
                                    readonly attrs: {
                                        readonly code: number
                                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                                    }
                                }
                                readonly identity: {
                                    readonly tag: 'identity'
                                    readonly content: Uint8Array
                                }
                                readonly identity_auth: {
                                    readonly tag: 'identity_auth'
                                    readonly attrs: {
                                        readonly version: number
                                    }
                                    readonly children: {
                                        readonly certs: {
                                            readonly tag: 'certs'
                                            readonly children: {
                                                readonly cert: ReadonlyArray<{
                                                    readonly tag: 'cert'
                                                    readonly content: Uint8Array
                                                }>
                                            }
                                        }
                                        readonly signature: {
                                            readonly tag: 'signature'
                                            readonly content: Uint8Array
                                        }
                                    }
                                }
                                readonly key: {
                                    readonly tag: 'key'
                                    readonly children: {
                                        readonly id: {
                                            readonly tag: 'id'
                                            readonly content: Uint8Array
                                        }
                                        readonly value: {
                                            readonly tag: 'value'
                                            readonly content: Uint8Array
                                        }
                                    }
                                }
                                readonly pqkey: {
                                    readonly tag: 'pqkey'
                                    readonly children: {
                                        readonly id: {
                                            readonly tag: 'id'
                                            readonly content: Uint8Array
                                        }
                                        readonly signature: {
                                            readonly tag: 'signature'
                                            readonly content: Uint8Array
                                        }
                                        readonly value: {
                                            readonly tag: 'value'
                                            readonly content: Uint8Array
                                        }
                                    }
                                }
                                readonly registration: {
                                    readonly tag: 'registration'
                                    readonly content: Uint8Array
                                }
                                readonly skey: {
                                    readonly tag: 'skey'
                                    readonly children: {
                                        readonly id: {
                                            readonly tag: 'id'
                                            readonly content: Uint8Array
                                        }
                                        readonly signature: {
                                            readonly tag: 'signature'
                                            readonly content: Uint8Array
                                        }
                                        readonly value: {
                                            readonly tag: 'value'
                                            readonly content: Uint8Array
                                        }
                                    }
                                }
                                readonly type: {
                                    readonly tag: 'type'
                                    readonly content: Uint8Array
                                }
                            }
                        }>
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly PreKeysFetchMissingPreKeys: {
        readonly module: 'WASmaxPreKeysFetchMissingPreKeysRPC'
        readonly opName: 'FetchMissingPreKeys'
        readonly xmlns: 'encrypt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'encrypt'
        }
        readonly children: {
            readonly key_fetch: {
                readonly tag: 'key_fetch'
                readonly attrs: {
                    readonly context_jid?: string
                    readonly pqsupport?: 'true'
                }
                readonly children: {
                    readonly user: ReadonlyArray<{
                        readonly tag: 'user'
                        readonly attrs: {
                            readonly jid: string
                            readonly reason?: 'identity'
                        }
                        readonly children: {
                            readonly device: ReadonlyArray<{
                                readonly tag: 'device'
                                readonly attrs: {
                                    readonly id: number
                                }
                                readonly children: {
                                    readonly registration: {
                                        readonly tag: 'registration'
                                        readonly content: Uint8Array
                                    }
                                }
                            }>
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'RequestError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly children: {
                        readonly user: ReadonlyArray<{
                            readonly tag: 'user'
                            readonly attrs: {
                                readonly jid: string
                            }
                            readonly children: {
                                readonly device: ReadonlyArray<{
                                    readonly tag: 'device'
                                    readonly attrs: {
                                        readonly id: number
                                        readonly is_cloud_api?: 'true'
                                        readonly t?: number
                                    }
                                    readonly children: {
                                        readonly 'device-identity': {
                                            readonly tag: 'device-identity'
                                            readonly content: Uint8Array
                                        }
                                        readonly identity: {
                                            readonly tag: 'identity'
                                            readonly content: Uint8Array
                                        }
                                        readonly key: {
                                            readonly tag: 'key'
                                            readonly children: {
                                                readonly id: {
                                                    readonly tag: 'id'
                                                    readonly content: Uint8Array
                                                }
                                                readonly value: {
                                                    readonly tag: 'value'
                                                    readonly content: Uint8Array
                                                }
                                            }
                                        }
                                        readonly pqkey: {
                                            readonly tag: 'pqkey'
                                            readonly children: {
                                                readonly id: {
                                                    readonly tag: 'id'
                                                    readonly content: Uint8Array
                                                }
                                                readonly signature: {
                                                    readonly tag: 'signature'
                                                    readonly content: Uint8Array
                                                }
                                                readonly value: {
                                                    readonly tag: 'value'
                                                    readonly content: Uint8Array
                                                }
                                            }
                                        }
                                        readonly registration: {
                                            readonly tag: 'registration'
                                            readonly content: Uint8Array
                                        }
                                        readonly skey: {
                                            readonly tag: 'skey'
                                            readonly children: {
                                                readonly id: {
                                                    readonly tag: 'id'
                                                    readonly content: Uint8Array
                                                }
                                                readonly signature: {
                                                    readonly tag: 'signature'
                                                    readonly content: Uint8Array
                                                }
                                                readonly value: {
                                                    readonly tag: 'value'
                                                    readonly content: Uint8Array
                                                }
                                            }
                                        }
                                        readonly type: {
                                            readonly tag: 'type'
                                            readonly content: Uint8Array
                                        }
                                    }
                                }>
                                readonly error: {
                                    readonly tag: 'error'
                                    readonly attrs: {
                                        readonly code: number
                                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                                    }
                                }
                            }
                        }>
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly PreKeysNotificationContactIDChanged: {
        readonly module: 'WASmaxPreKeysNotificationContactIDChangedRPC'
        readonly opName: 'NotificationContactIDChanged'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly display_name?: string
                readonly from: string
                readonly id: string
                readonly lid?: string
                readonly offline?: number
                readonly t: number
                readonly type: 'encrypt'
            }
            readonly children: {
                readonly groups: {
                    readonly tag: 'groups'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly jid: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly PreKeysNotificationDigest: {
        readonly module: 'WASmaxPreKeysNotificationDigestRPC'
        readonly opName: 'NotificationDigest'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'encrypt'
            }
        } }
    }
    readonly PreKeysNotificationLowCount: {
        readonly module: 'WASmaxPreKeysNotificationLowCountRPC'
        readonly opName: 'NotificationLowCount'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'encrypt'
            }
            readonly children: {
                readonly count: {
                    readonly tag: 'count'
                    readonly attrs: {
                        readonly value?: number
                    }
                }
                readonly pq_count: {
                    readonly tag: 'pq_count'
                    readonly attrs: {
                        readonly value?: number
                    }
                }
            }
        } }
    }
    readonly PreKeysRotateSigned: {
        readonly module: 'WASmaxPreKeysRotateSignedRPC'
        readonly opName: 'RotateSigned'
        readonly xmlns: 'encrypt'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'encrypt'
        }
        readonly children: {
            readonly op: {
                readonly tag: 'op'
                readonly attrs: {
                    readonly mode: 'rotate'
                }
            }
            readonly rotate: {
                readonly tag: 'rotate'
                readonly children: {
                    readonly pq_last_resort_key: {
                        readonly tag: 'pq_last_resort_key'
                        readonly children: {
                            readonly id: {
                                readonly tag: 'id'
                            }
                            readonly signature: {
                                readonly tag: 'signature'
                                readonly content: Uint8Array
                            }
                            readonly value: {
                                readonly tag: 'value'
                            }
                        }
                    }
                    readonly skey: {
                        readonly tag: 'skey'
                        readonly children: {
                            readonly id: {
                                readonly tag: 'id'
                            }
                            readonly signature: {
                                readonly tag: 'signature'
                                readonly content: Uint8Array
                            }
                            readonly value: {
                                readonly tag: 'value'
                            }
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'RequestError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'ValidationError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                    }
                    readonly children: {
                        readonly identity: {
                            readonly tag: 'identity'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly PreKeysSet: {
        readonly module: 'WASmaxPreKeysSetRPC'
        readonly opName: 'Set'
        readonly xmlns: 'encrypt'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'encrypt'
        }
        readonly children: {
            readonly id: {
                readonly tag: 'id'
            }
            readonly identity: {
                readonly tag: 'identity'
            }
            readonly padding: {
                readonly tag: 'padding'
                readonly content: Uint8Array
            }
            readonly pq_last_resort_key: {
                readonly tag: 'pq_last_resort_key'
                readonly children: {
                    readonly id: {
                        readonly tag: 'id'
                    }
                    readonly signature: {
                        readonly tag: 'signature'
                        readonly content: Uint8Array
                    }
                    readonly value: {
                        readonly tag: 'value'
                    }
                }
            }
            readonly pq_list: {
                readonly tag: 'pq_list'
                readonly children: {
                    readonly key: ReadonlyArray<{
                        readonly tag: 'key'
                        readonly children: {
                            readonly id: {
                                readonly tag: 'id'
                            }
                            readonly signature: {
                                readonly tag: 'signature'
                                readonly content: Uint8Array
                            }
                            readonly value: {
                                readonly tag: 'value'
                            }
                        }
                    }>
                }
            }
            readonly registration: {
                readonly tag: 'registration'
                readonly content: Uint8Array
            }
            readonly skey: {
                readonly tag: 'skey'
                readonly children: {
                    readonly id: {
                        readonly tag: 'id'
                    }
                    readonly signature: {
                        readonly tag: 'signature'
                        readonly content: Uint8Array
                    }
                    readonly value: {
                        readonly tag: 'value'
                    }
                }
            }
            readonly type: {
                readonly tag: 'type'
                readonly children: {
                    readonly '?': unknown
                }
            }
            readonly value: {
                readonly tag: 'value'
            }
            readonly verified_name: {
                readonly tag: 'verified_name'
                readonly content: Uint8Array
            }
        }
    }
        readonly response:
        | { readonly variant: 'PreKeySuccessVnameFailure'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                    }
                    readonly children: {
                        readonly error: {
                            readonly tag: 'error'
                            readonly attrs: {
                                readonly code: number
                                readonly text?: 'not-acceptable'
                            }
                            readonly children: {
                                readonly violation: {
                                    readonly tag: 'violation'
                                    readonly attrs: {
                                        readonly length?: number
                                        readonly max?: number
                                        readonly reason: string
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'RequestError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'not-acceptable'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly count_low: 'true'
                    }
                }
                readonly pq_list: {
                    readonly tag: 'pq_list'
                    readonly attrs: {
                        readonly count_low: 'true'
                    }
                }
            }
        } }
    }
    readonly PresenceAvailability: {
        readonly module: 'WASmaxPresenceAvailabilityRPC'
        readonly opName: 'Availability'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'presence'
        readonly attrs: {
            readonly name?: string
            readonly type?: 'available' | 'subscribe' | 'unavailable' | 'unsubscribe'
        }
    }
        readonly response:
        | never
    }
    readonly PresenceServerUpdate: {
        readonly module: 'WASmaxPresenceServerUpdateRPC'
        readonly opName: 'ServerUpdate'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'presence'
            readonly attrs: {
                readonly context?: string
                readonly count?: number
                readonly from?: string
                readonly last?: 'deny' | 'error' | 'none'
                readonly name?: string
                readonly to: string
                readonly type: 'unavailable' | 'subscribe'
            }
            readonly children: {
                readonly tctoken: {
                    readonly tag: 'tctoken'
                    readonly attrs: {
                        readonly t?: number
                    }
                }
            }
        } }
    }
    readonly PresenceSubscribe: {
        readonly module: 'WASmaxPresenceSubscribeRPC'
        readonly opName: 'Subscribe'
        readonly xmlns: null
        readonly type: 'subscribe'
        readonly request: {
        readonly tag: 'presence'
        readonly attrs: {
            readonly context?: string
            readonly name?: string
            readonly to: string
            readonly type: 'subscribe'
        }
        readonly children: {
            readonly tctoken: {
                readonly tag: 'tctoken'
                readonly attrs: {
                    readonly t?: number
                }
            }
        }
    }
        readonly response:
        | never
    }
    readonly PrivacyGetContactBlacklist: {
        readonly module: 'WASmaxPrivacyGetContactBlacklistRPC'
        readonly opName: 'GetContactBlacklist'
        readonly xmlns: 'privacy'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'privacy'
        }
        readonly children: {
            readonly privacy: {
                readonly tag: 'privacy'
                readonly attrs: {
                    readonly addressing_mode: 'lid'
                    readonly name: string
                }
                readonly children: {
                    readonly list: {
                        readonly tag: 'list'
                        readonly attrs: {
                            readonly name: string
                            readonly value: 'contact_blacklist'
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly privacy: {
                    readonly tag: 'privacy'
                    readonly attrs: {
                        readonly addressing_mode?: 'pn'
                    }
                    readonly children: {
                        readonly list: {
                            readonly tag: 'list'
                            readonly attrs: {
                                readonly dhash: string
                            }
                            readonly children: {
                                readonly user: ReadonlyArray<{
                                    readonly tag: 'user'
                                    readonly attrs: {
                                        readonly jid: string
                                        readonly lid?: string
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessLID'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly privacy: {
                    readonly tag: 'privacy'
                    readonly attrs: {
                        readonly addressing_mode: 'lid'
                    }
                    readonly children: {
                        readonly list: {
                            readonly tag: 'list'
                            readonly attrs: {
                                readonly dhash: string
                            }
                            readonly children: {
                                readonly user: ReadonlyArray<{
                                    readonly tag: 'user'
                                    readonly attrs: {
                                        readonly jid?: string
                                        readonly pn_jid?: string
                                        readonly username?: string
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly PrivatestatsSignCredential: {
        readonly module: 'WASmaxPrivatestatsSignCredentialRPC'
        readonly opName: 'SignCredential'
        readonly xmlns: 'privatestats'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'privatestats'
        }
        readonly children: {
            readonly sign_credential: {
                readonly tag: 'sign_credential'
                readonly attrs: {
                    readonly version: '2'
                }
                readonly children: {
                    readonly blinded_credential: {
                        readonly tag: 'blinded_credential'
                    }
                    readonly project_name: {
                        readonly tag: 'project_name'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ErrorNoRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ErrorRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly sign_credential: {
                    readonly tag: 'sign_credential'
                    readonly attrs: {
                        readonly t: number
                    }
                    readonly children: {
                        readonly acs_public_key: {
                            readonly tag: 'acs_public_key'
                            readonly content: Uint8Array
                        }
                        readonly dleq_proof: {
                            readonly tag: 'dleq_proof'
                            readonly children: {
                                readonly c: {
                                    readonly tag: 'c'
                                    readonly content: Uint8Array
                                }
                                readonly s: {
                                    readonly tag: 's'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly project_name: {
                            readonly tag: 'project_name'
                            readonly content: string
                        }
                        readonly signed_credential: {
                            readonly tag: 'signed_credential'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly ProfilePictureGet: {
        readonly module: 'WASmaxProfilePictureGetRPC'
        readonly opName: 'Get'
        readonly xmlns: 'w:profile:picture'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly target: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'w:profile:picture'
        }
        readonly children: {
            readonly picture: {
                readonly tag: 'picture'
                readonly attrs: {
                    readonly common_gid?: string
                    readonly id?: string
                    readonly invite?: string
                    readonly persona_id?: string
                    readonly pose_id: string
                    readonly query?: string
                    readonly type?: 'image' | 'preview'
                }
                readonly children: {
                    readonly add_request: {
                        readonly tag: 'add_request'
                        readonly attrs: {
                            readonly admin?: string
                            readonly code: string
                            readonly expiration: number
                        }
                    }
                    readonly tctoken: {
                        readonly tag: 'tctoken'
                        readonly attrs: {
                            readonly t?: number
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessAvatarURLs'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly avatar: ReadonlyArray<{
                    readonly tag: 'avatar'
                    readonly attrs: {
                        readonly hash?: string
                        readonly pose_id: string
                        readonly url: string
                    }
                }>
            }
        } }
        | { readonly variant: 'SuccessNoData'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'SuccessPictureBlob'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly picture: {
                    readonly tag: 'picture'
                    readonly attrs: {
                        readonly has_staging?: 'false' | 'true'
                        readonly id: string
                        readonly type: 'image' | 'preview'
                    }
                    readonly content: Uint8Array
                }
            }
        } }
        | { readonly variant: 'SuccessPictureURL'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly picture: {
                    readonly tag: 'picture'
                    readonly attrs: {
                        readonly direct_path: string
                        readonly has_staging?: 'false' | 'true'
                        readonly hash?: string
                        readonly id: string
                        readonly type: 'image' | 'preview'
                        readonly url: string
                    }
                }
            }
        } }
    }
    readonly PsaChatBlockGet: {
        readonly module: 'WASmaxPsaChatBlockGetRPC'
        readonly opName: 'ChatBlockGet'
        readonly xmlns: 'w:comms:chat'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'w:comms:chat'
        }
        readonly children: {
            readonly query: {
                readonly tag: 'query'
                readonly children: {
                    readonly blocking_status: {
                        readonly tag: 'blocking_status'
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly blocking: {
                    readonly tag: 'blocking'
                    readonly attrs: {
                        readonly status: 'blocked' | 'unblocked'
                    }
                }
            }
        } }
    }
    readonly PsaChatBlockSet: {
        readonly module: 'WASmaxPsaChatBlockSetRPC'
        readonly opName: 'ChatBlockSet'
        readonly xmlns: 'w:comms:chat'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'w:comms:chat'
        }
        readonly children: {
            readonly blocking: {
                readonly tag: 'blocking'
                readonly attrs: {
                    readonly action: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly blocking: {
                    readonly tag: 'blocking'
                    readonly attrs: {
                        readonly status: 'blocked' | 'unblocked'
                    }
                }
            }
        } }
    }
    readonly PsaResetSmbLastQpPrefetchTimestamp: {
        readonly module: 'WASmaxPsaResetSmbLastQpPrefetchTimestampRPC'
        readonly opName: 'ResetSmbLastQpPrefetchTimestamp'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'psa'
            }
        } }
    }
    readonly PushConfigSet: {
        readonly module: 'WASmaxPushConfigSetRPC'
        readonly opName: 'Set'
        readonly xmlns: 'urn:xmpp:whatsapp:push'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'urn:xmpp:whatsapp:push'
        }
        readonly children: {
            readonly clear: {
                readonly tag: 'clear'
                readonly attrs: {
                    readonly platform?: string
                }
            }
            readonly config: {
                readonly tag: 'config'
                readonly attrs: {
                    readonly app_mute?: number
                    readonly appid: string
                    readonly auth: string
                    readonly call?: string
                    readonly deviceid: string
                    readonly endpoint: string
                    readonly fbid?: string
                    readonly id: string
                    readonly jid: string
                    readonly lc?: string
                    readonly lg?: string
                    readonly mute: number
                    readonly notify?: string
                    readonly num_acc?: number
                    readonly p256dh: string
                    readonly pkey?: string
                    readonly platform: 'fb'
                    readonly version?: number
                    readonly voip_payload_type?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Conflict'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'conflict'
                    }
                }
            }
        } }
        | { readonly variant: 'InternalServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly QpSurfacesQPNotification: {
        readonly module: 'WASmaxQpSurfacesQPNotificationRPC'
        readonly opName: 'QPNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'psa'
            }
            readonly children: {
                readonly surfaces: {
                    readonly tag: 'surfaces'
                    readonly children: {
                        readonly surface: ReadonlyArray<{
                            readonly tag: 'surface'
                            readonly attrs: {
                                readonly id: string
                            }
                            readonly children: {
                                readonly promotion: ReadonlyArray<{
                                    readonly tag: 'promotion'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly instance_id?: string
                                    }
                                    readonly children: {
                                        readonly colors: {
                                            readonly tag: 'colors'
                                            readonly children: {
                                                readonly dark: {
                                                    readonly tag: 'dark'
                                                    readonly attrs: {
                                                        readonly background?: string
                                                        readonly highlight?: string
                                                    }
                                                }
                                                readonly light: {
                                                    readonly tag: 'light'
                                                    readonly attrs: {
                                                        readonly background?: string
                                                        readonly highlight?: string
                                                    }
                                                }
                                            }
                                        } | undefined
                                        readonly content_attributes: {
                                            readonly tag: 'content_attributes'
                                            readonly children: {
                                                readonly attribute: ReadonlyArray<{
                                                    readonly tag: 'attribute'
                                                    readonly attrs: {
                                                        readonly key: string
                                                        readonly value: string
                                                    }
                                                }>
                                            }
                                        } | undefined
                                        readonly header: {
                                            readonly tag: 'header'
                                            readonly attrs: {
                                                readonly title: string
                                            }
                                        } | undefined
                                        readonly image: {
                                            readonly tag: 'image'
                                            readonly attrs: {
                                                readonly description: string
                                            }
                                            readonly children: {
                                                readonly dark: {
                                                    readonly tag: 'dark'
                                                    readonly content: Uint8Array
                                                } | undefined
                                                readonly light: {
                                                    readonly tag: 'light'
                                                    readonly content: Uint8Array
                                                } | undefined
                                            }
                                        } | undefined
                                        readonly primary_action: {
                                            readonly tag: 'primary_action'
                                            readonly attrs: {
                                                readonly deep_link?: string
                                                readonly text: string
                                                readonly universal_link?: string
                                            }
                                        } | undefined
                                        readonly qp_config: {
                                            readonly tag: 'qp_config'
                                            readonly attrs: {
                                                readonly deterministic: 'false' | 'true'
                                                readonly dismissable: 'false' | 'true'
                                                readonly eligibility_duration_ms: number
                                                readonly end_time_seconds: number
                                                readonly experiment_key?: string
                                                readonly exposure_holdout: 'false' | 'true'
                                                readonly force_pass: 'false' | 'true'
                                                readonly impression_cooldown: number
                                                readonly log_eligibility_waterfall: 'false' | 'true'
                                                readonly max_impressions: number
                                                readonly priority: number
                                                readonly start_time_seconds: number
                                                readonly surface_delay_time_seconds: number
                                                readonly template_name: string
                                                readonly ttl_seconds: number
                                            }
                                            readonly children: {
                                                readonly filter_rules: {
                                                    readonly tag: 'filter_rules'
                                                    readonly content: Uint8Array
                                                } | undefined
                                                readonly instance_log_data: {
                                                    readonly tag: 'instance_log_data'
                                                    readonly content: Uint8Array
                                                } | undefined
                                                readonly pacing: {
                                                    readonly tag: 'pacing'
                                                    readonly children: {
                                                        readonly promotion_config: {
                                                            readonly tag: 'promotion_config'
                                                            readonly attrs: {
                                                                readonly max_dismisses: number
                                                                readonly max_impressions: number
                                                                readonly max_primary_clicks: number
                                                                readonly max_secondary_clicks: number
                                                            }
                                                        } | undefined
                                                        readonly user_info: {
                                                            readonly tag: 'user_info'
                                                            readonly attrs: {
                                                                readonly dismiss_click_count: number
                                                                readonly impression_count: number
                                                                readonly primary_click_count: number
                                                                readonly secondary_click_count: number
                                                            }
                                                        } | undefined
                                                    }
                                                } | undefined
                                                readonly triggers: {
                                                    readonly tag: 'triggers'
                                                    readonly children: {
                                                        readonly trigger: ReadonlyArray<{
                                                            readonly tag: 'trigger'
                                                            readonly attrs: {
                                                                readonly name: string
                                                            }
                                                        }>
                                                    }
                                                }
                                            }
                                        }
                                        readonly secondary_action: {
                                            readonly tag: 'secondary_action'
                                            readonly attrs: {
                                                readonly deep_link?: string
                                                readonly text: string
                                                readonly universal_link?: string
                                            }
                                        } | undefined
                                        readonly text: {
                                            readonly tag: 'text'
                                            readonly content: string
                                        }
                                        readonly title: {
                                            readonly tag: 'title'
                                            readonly content: string
                                        }
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly ReceiptDeliver: {
        readonly module: 'WASmaxReceiptDeliverRPC'
        readonly opName: 'Deliver'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'receipt'
            readonly attrs: {
                readonly class?: 'status'
                readonly edit: '0' | '1' | '7'
                readonly from?: string
                readonly id?: string
                readonly is_lid?: 'true'
                readonly offline?: number
                readonly participant: string
                readonly recipient?: string
                readonly sender_pn?: string
                readonly t: number
                readonly type?: 'sender'
            }
            readonly children: {
                readonly biz: {
                    readonly tag: 'biz'
                    readonly children: {
                        readonly paid_messaging: {
                            readonly tag: 'paid_messaging'
                            readonly children: {
                                readonly item: ReadonlyArray<{
                                    readonly tag: 'item'
                                    readonly attrs: {
                                        readonly billable: 'false' | 'true'
                                        readonly id: string
                                        readonly paid_convo_id: string
                                        readonly pricing_category?: string
                                        readonly pricing_model: 'CBP' | 'NBP' | 'PMP'
                                        readonly pricing_type?: 'free_customer_service' | 'free_entry_point' | 'regular'
                                    }
                                    readonly children: {
                                        readonly delivery_context: {
                                            readonly tag: 'delivery_context'
                                            readonly attrs: {
                                                readonly optimization_goal: 'delivery' | 'no_optimization'
                                            }
                                        } | undefined
                                        readonly origin: {
                                            readonly tag: 'origin'
                                            readonly attrs: {
                                                readonly type: string
                                            }
                                            readonly children: {
                                                readonly referral: {
                                                    readonly tag: 'referral'
                                                    readonly attrs: {
                                                        readonly source_type?: string
                                                    }
                                                    readonly children: {
                                                        readonly source_url: {
                                                            readonly tag: 'source_url'
                                                            readonly content: string
                                                        } | undefined
                                                    }
                                                } | undefined
                                            }
                                        } | undefined
                                        readonly pricing: {
                                            readonly tag: 'pricing'
                                            readonly attrs: {
                                                readonly business_country_code?: string
                                                readonly consumer_country_code?: string
                                            }
                                        } | undefined
                                    }
                                }>
                            }
                        }
                    }
                }
                readonly bot: {
                    readonly tag: 'bot'
                    readonly attrs: {
                        readonly client_thread_id: string
                        readonly conversation_thread_id: string
                    }
                }
                readonly encrypt: {
                    readonly tag: 'encrypt'
                    readonly children: {
                        readonly enc_iv: {
                            readonly tag: 'enc_iv'
                            readonly content: Uint8Array
                        }
                        readonly enc_p: {
                            readonly tag: 'enc_p'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly type: 'feature-incapable'
                    }
                }
                readonly keys: {
                    readonly tag: 'keys'
                    readonly children: {
                        readonly 'device-identity': {
                            readonly tag: 'device-identity'
                            readonly content: Uint8Array
                        }
                        readonly identity: {
                            readonly tag: 'identity'
                            readonly content: Uint8Array
                        }
                        readonly identity_auth: {
                            readonly tag: 'identity_auth'
                            readonly attrs: {
                                readonly version: number
                            }
                            readonly children: {
                                readonly certs: {
                                    readonly tag: 'certs'
                                    readonly children: {
                                        readonly cert: ReadonlyArray<{
                                            readonly tag: 'cert'
                                            readonly content: Uint8Array
                                        }>
                                    }
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly key: {
                            readonly tag: 'key'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly pq: {
                            readonly tag: 'pq'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly skey: {
                            readonly tag: 'skey'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly type: {
                            readonly tag: 'type'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly list: {
                    readonly tag: 'list'
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly edit: '0' | '1' | '7'
                                readonly id: string
                            }
                        }>
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
                readonly participants: {
                    readonly tag: 'participants'
                    readonly attrs: {
                        readonly key: string
                    }
                    readonly children: {
                        readonly user: ReadonlyArray<{
                            readonly tag: 'user'
                            readonly attrs: {
                                readonly jid: string
                                readonly t: number
                            }
                        }>
                    }
                }
                readonly registration: {
                    readonly tag: 'registration'
                    readonly content: Uint8Array
                }
                readonly retry: {
                    readonly tag: 'retry'
                    readonly attrs: {
                        readonly count: number
                        readonly error?: number
                        readonly id: string
                        readonly t: number
                        readonly v?: '1'
                    }
                }
                readonly rmr: {
                    readonly tag: 'rmr'
                    readonly attrs: {
                        readonly from_me: 'false' | 'true'
                        readonly jid?: string
                        readonly participant?: string
                    }
                } | undefined
            }
        } }
    }
    readonly ReceiptDeliverAppDataPeer: {
        readonly module: 'WASmaxReceiptDeliverAppDataPeerRPC'
        readonly opName: 'DeliverAppDataPeer'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'receipt'
            readonly attrs: {
                readonly category?: 'peer_appdata'
                readonly from: string
                readonly id: string
                readonly t?: number
                readonly type?: 'retry'
            }
            readonly children: {
                readonly keys: {
                    readonly tag: 'keys'
                    readonly children: {
                        readonly 'device-identity': {
                            readonly tag: 'device-identity'
                            readonly content: Uint8Array
                        }
                        readonly identity: {
                            readonly tag: 'identity'
                            readonly content: Uint8Array
                        }
                        readonly identity_auth: {
                            readonly tag: 'identity_auth'
                            readonly attrs: {
                                readonly version: number
                            }
                            readonly children: {
                                readonly certs: {
                                    readonly tag: 'certs'
                                    readonly children: {
                                        readonly cert: ReadonlyArray<{
                                            readonly tag: 'cert'
                                            readonly content: Uint8Array
                                        }>
                                    }
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly key: {
                            readonly tag: 'key'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly pq: {
                            readonly tag: 'pq'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly skey: {
                            readonly tag: 'skey'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly type: {
                            readonly tag: 'type'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
                readonly registration: {
                    readonly tag: 'registration'
                    readonly content: Uint8Array
                }
                readonly retry: {
                    readonly tag: 'retry'
                    readonly attrs: {
                        readonly count: number
                        readonly error?: number
                        readonly id: string
                        readonly t: number
                        readonly v?: '1'
                    }
                }
            }
        } }
    }
    readonly ReceiptDeliverPeer: {
        readonly module: 'WASmaxReceiptDeliverPeerRPC'
        readonly opName: 'DeliverPeer'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'receipt'
            readonly attrs: {
                readonly category?: 'peer'
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t?: number
                readonly type?: 'retry'
            }
            readonly children: {
                readonly encrypt: {
                    readonly tag: 'encrypt'
                    readonly children: {
                        readonly enc_iv: {
                            readonly tag: 'enc_iv'
                            readonly content: Uint8Array
                        }
                        readonly enc_p: {
                            readonly tag: 'enc_p'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly reason?: '1002' | '1007' | '1008'
                        readonly sub_type?: 'content' | 'title'
                        readonly type: 'hsm-envelope-mismatch' | 'structure-unavailable'
                    }
                }
                readonly keys: {
                    readonly tag: 'keys'
                    readonly children: {
                        readonly 'device-identity': {
                            readonly tag: 'device-identity'
                            readonly content: Uint8Array
                        }
                        readonly identity: {
                            readonly tag: 'identity'
                            readonly content: Uint8Array
                        }
                        readonly identity_auth: {
                            readonly tag: 'identity_auth'
                            readonly attrs: {
                                readonly version: number
                            }
                            readonly children: {
                                readonly certs: {
                                    readonly tag: 'certs'
                                    readonly children: {
                                        readonly cert: ReadonlyArray<{
                                            readonly tag: 'cert'
                                            readonly content: Uint8Array
                                        }>
                                    }
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly key: {
                            readonly tag: 'key'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly pq: {
                            readonly tag: 'pq'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly skey: {
                            readonly tag: 'skey'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: Uint8Array
                                }
                                readonly signature: {
                                    readonly tag: 'signature'
                                    readonly content: Uint8Array
                                }
                                readonly value: {
                                    readonly tag: 'value'
                                    readonly content: Uint8Array
                                }
                            }
                        }
                        readonly type: {
                            readonly tag: 'type'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
                readonly registration: {
                    readonly tag: 'registration'
                    readonly content: Uint8Array
                }
                readonly retry: {
                    readonly tag: 'retry'
                    readonly attrs: {
                        readonly count: number
                        readonly error?: number
                        readonly id: string
                        readonly t: number
                        readonly v?: '1'
                    }
                }
                readonly rmr: {
                    readonly tag: 'rmr'
                    readonly attrs: {
                        readonly from_me: 'false' | 'true'
                        readonly jid?: string
                        readonly participant?: string
                    }
                } | undefined
            }
        } }
    }
    readonly ReceiptPublishAppDataPeerDelivery: {
        readonly module: 'WASmaxReceiptPublishAppDataPeerDeliveryRPC'
        readonly opName: 'PublishAppDataPeerDelivery'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'receipt'
        readonly attrs: {
            readonly category: 'peer_appdata'
            readonly id: string
            readonly to: string
        }
    }
        readonly response:
        | never
    }
    readonly ReceiptPublishDelivery: {
        readonly module: 'WASmaxOutReceiptPublishDeliveryRequest'
        readonly opName: 'PublishDelivery'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'receipt'
        readonly attrs: {
            readonly client_thread_id: string
            readonly conversation_thread_id: string
            readonly id: string
            readonly privacy_token: 'false'
            readonly recipient: string
            readonly to: string
        }
        readonly children: {
            readonly biz: {
                readonly tag: 'biz'
                readonly children: {
                    readonly original_envelope: {
                        readonly tag: 'original_envelope'
                    }
                }
            } | undefined
            readonly bot: {
                readonly tag: 'bot'
                readonly attrs: {
                    readonly client_thread_id: string
                    readonly conversation_thread_id: string
                }
            }
        }
    }
        readonly response:
        | never
    }
    readonly ReceiptPublishPeerDelivery: {
        readonly module: 'WASmaxReceiptPublishPeerDeliveryRPC'
        readonly opName: 'PublishPeerDelivery'
        readonly xmlns: null
        readonly type: 'peer_msg'
        readonly request: {
        readonly tag: 'receipt'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'peer_msg'
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'receipt'
                readonly edit: '0' | '1' | '7'
                readonly from: string
                readonly id: string
                readonly readreceipts?: 'all' | 'none'
                readonly t?: number
                readonly type: 'account_sync' | 'business' | 'companion_reg_refresh' | 'contacts' | 'digital_commerce_subscription' | 'disappearing_mode' | 'mediaretry' | 'mex' | 'offer_notice' | 'pay' | 'picture' | 'privacy_token' | 'psa' | 'registration' | 'retry' | 'server' | 'server_sync' | 'status' | 'text' | 'w:gp2'
            }
        } }
    }
    readonly ReceiptPublishPeerRead: {
        readonly module: 'WASmaxReceiptPublishPeerReadRPC'
        readonly opName: 'PublishPeerRead'
        readonly xmlns: null
        readonly type: 'hist_sync'
        readonly request: {
        readonly tag: 'receipt'
        readonly attrs: {
            readonly id: string
            readonly to: string
            readonly type: 'hist_sync'
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'receipt'
                readonly edit: '0' | '1' | '7'
                readonly from: string
                readonly id: string
                readonly readreceipts?: 'all' | 'none'
                readonly t?: number
                readonly type: 'account_sync' | 'business' | 'companion_reg_refresh' | 'contacts' | 'digital_commerce_subscription' | 'disappearing_mode' | 'mediaretry' | 'mex' | 'offer_notice' | 'pay' | 'picture' | 'privacy_token' | 'psa' | 'registration' | 'retry' | 'server' | 'server_sync' | 'status' | 'text' | 'w:gp2'
            }
        } }
    }
    readonly ReceiptPublishSender: {
        readonly module: 'WASmaxOutReceiptPublishSenderRequest'
        readonly opName: 'PublishSender'
        readonly xmlns: null
        readonly type: 'sender'
        readonly request: {
        readonly tag: 'receipt'
        readonly attrs: {
            readonly id: string
            readonly participant: string
            readonly peer_participant_pn?: string
            readonly recipient: string
            readonly to: string
            readonly type: 'sender'
        }
    }
        readonly response:
        | never
    }
    readonly ReceiptPublishView: {
        readonly module: 'WASmaxReceiptPublishViewRPC'
        readonly opName: 'PublishView'
        readonly xmlns: null
        readonly type: 'view'
        readonly request: {
        readonly tag: 'receipt'
        readonly attrs: {
            readonly class: 'status'
            readonly server_id: number
            readonly to: string
            readonly type: 'view'
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'receipt'
                readonly edit: '0' | '1' | '7'
                readonly from: string
                readonly id: string
                readonly readreceipts?: 'all' | 'none'
                readonly t?: number
                readonly type: 'account_sync' | 'business' | 'companion_reg_refresh' | 'contacts' | 'digital_commerce_subscription' | 'disappearing_mode' | 'mediaretry' | 'mex' | 'offer_notice' | 'pay' | 'picture' | 'privacy_token' | 'psa' | 'registration' | 'retry' | 'server' | 'server_sync' | 'status' | 'text' | 'w:gp2'
            }
        } }
    }
    readonly RtcE2eeCallEventNotifyCallEventNotification: {
        readonly module: 'WASmaxRtcE2eeCallEventNotifyCallEventNotificationRPC'
        readonly opName: 'CallEventNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'fb:call'
            }
            readonly children: {
                readonly call_event: {
                    readonly tag: 'call_event'
                    readonly attrs: {
                        readonly call_type: 'video' | 'voice'
                        readonly duration?: number
                        readonly event_actor_id: string
                        readonly event_time: number
                        readonly event_type: 'ended' | 'missed' | 'started'
                        readonly jid: string
                        readonly parent_id?: string
                        readonly server_info_data: string
                    }
                }
            }
        } }
    }
    readonly SmaxInvalidError: {
        readonly module: 'WASmaxSmaxInvalidErrorRPC'
        readonly opName: 'Error'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'error'
            readonly attrs: {
                readonly code: '479'
                readonly text: 'smax-invalid'
            }
        } }
    }
    readonly SmbMeteredMessagesCampaignCampaignStateChangedNotification: {
        readonly module: 'WASmaxSmbMeteredMessagesCampaignCampaignStateChangedNotificationRPC'
        readonly opName: 'CampaignStateChangedNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly to?: string
                readonly type: 'business'
            }
            readonly children: {
                readonly mm_campaign: {
                    readonly tag: 'mm_campaign'
                    readonly attrs: {
                        readonly ad_creative_id?: string
                        readonly ad_group_id?: string
                        readonly ad_id?: string
                        readonly status: 'INTEGRITY_NOT_CLEARED' | 'OK'
                    }
                }
            }
        } }
    }
    readonly SmbMeteredMessagingAccountGetSMBMeteredMessagingCheckout: {
        readonly module: 'WASmaxSmbMeteredMessagingAccountGetSMBMeteredMessagingCheckoutRPC'
        readonly opName: 'GetSMBMeteredMessagingCheckout'
        readonly xmlns: 'w:biz'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly from?: string
            readonly id: string
            readonly smax_id: '120'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'w:biz'
        }
        readonly children: {
            readonly offer: {
                readonly tag: 'offer'
                readonly attrs: {
                    readonly id: string
                }
            } | undefined
            readonly participants: {
                readonly tag: 'participants'
                readonly children: {
                    readonly to: ReadonlyArray<{
                        readonly tag: 'to'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                }
            }
            readonly pending_campaigns: {
                readonly tag: 'pending_campaigns'
                readonly children: {
                    readonly campaign: ReadonlyArray<{
                        readonly tag: 'campaign'
                        readonly attrs: {
                            readonly free_reserved_msgs: number
                            readonly send_timestamp?: number
                        }
                    }>
                }
            } | undefined
            readonly skip_dedupe: {
                readonly tag: 'skip_dedupe'
            } | undefined
            readonly use_ad_account: {
                readonly tag: 'use_ad_account'
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'result'
            }
            readonly children: {
                readonly account_balance: {
                    readonly tag: 'account_balance'
                    readonly attrs: {
                        readonly available: number
                        readonly billing: number
                        readonly offset: number
                    }
                }
                readonly cost: {
                    readonly tag: 'cost'
                    readonly attrs: {
                        readonly base?: number
                        readonly base_formatted?: string
                        readonly before_discount?: number
                        readonly before_discount_formatted?: string
                        readonly before_tax: number
                        readonly currency: string
                        readonly discount_percent?: number
                        readonly offset: number
                        readonly tax: number
                    }
                    readonly children: {
                        readonly discounts: {
                            readonly tag: 'discounts'
                            readonly children: {
                                readonly discount: ReadonlyArray<{
                                    readonly tag: 'discount'
                                    readonly attrs: {
                                        readonly amount: number
                                        readonly amount_formatted: string
                                        readonly percentage?: number
                                        readonly type: 'free_msg' | 'percentage'
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
                readonly integrity: {
                    readonly tag: 'integrity'
                    readonly attrs: {
                        readonly is_eligible: 'false' | 'true'
                    }
                }
                readonly offer_status: {
                    readonly tag: 'offer_status'
                    readonly attrs: {
                        readonly value: 'already_claimed' | 'expired' | 'invalid' | 'not_found' | 'not_owned' | 'valid'
                    }
                } | undefined
                readonly quota: {
                    readonly tag: 'quota'
                    readonly attrs: {
                        readonly remaining: number
                        readonly single_credits?: number
                        readonly total_available_credits?: number
                        readonly total_monthly: number
                    }
                } | undefined
            }
        } }
    }
    readonly SpamGroupReport: {
        readonly module: 'WASmaxSpamGroupReportRPC'
        readonly opName: 'GroupReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly frx: {
                readonly tag: 'frx'
                readonly children: {
                    readonly context: {
                        readonly tag: 'context'
                    }
                    readonly parameters: {
                        readonly tag: 'parameters'
                    } | undefined
                    readonly tagset: {
                        readonly tag: 'tagset'
                        readonly children: {
                            readonly tag: ReadonlyArray<{
                                readonly tag: 'tag'
                                readonly attrs: {
                                    readonly value: string
                                }
                            }>
                        }
                    }
                }
            }
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly is_known_chat: boolean
                    readonly jid: string
                    readonly reportee: string
                    readonly source?: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                    readonly subject: string
                }
                readonly children: {
                    readonly call: ReadonlyArray<{
                        readonly tag: 'call'
                        readonly attrs: {
                            readonly from: string
                            readonly id: string
                            readonly to: string
                        }
                        readonly children: {
                            readonly call_info: {
                                readonly tag: 'call_info'
                                readonly attrs: {
                                    readonly adder?: string
                                    readonly creator?: string
                                    readonly duration: number
                                    readonly mediatype?: string
                                    readonly reason?: string
                                    readonly start_time?: number
                                    readonly terminate_reason?: string
                                    readonly terminator?: string
                                }
                            }
                        }
                    }>
                    readonly message: ReadonlyArray<{
                        readonly tag: 'message'
                        readonly attrs: {
                            readonly edit: '1'
                            readonly entry_point?: string
                            readonly extension_id: string
                            readonly from: string
                            readonly local_message_type?: number
                            readonly mediatype?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly name: string
                            readonly participant: string
                            readonly participant_type?: string
                            readonly phash?: string
                            readonly protocol_v: number
                            readonly reported_push_name: string
                            readonly response_server_id: string
                            readonly server_id: number
                            readonly session_id: string
                            readonly t: number
                            readonly v: '2'
                        }
                        readonly children: {
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly content_validation: {
                                readonly tag: 'content_validation'
                                readonly attrs: {
                                    readonly type?: string
                                }
                                readonly children: {
                                    readonly reporting_token: {
                                        readonly tag: 'reporting_token'
                                        readonly attrs: {
                                            readonly v: number
                                        }
                                        readonly content: Uint8Array
                                    }
                                    readonly reporting_token_key: {
                                        readonly tag: 'reporting_token_key'
                                    }
                                }
                            } | undefined
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
                            }
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
                            }
                            readonly reporting: {
                                readonly tag: 'reporting'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly report: {
                    readonly tag: 'report'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
    }
    readonly SpamIndividualReport: {
        readonly module: 'WASmaxSpamIndividualReportRPC'
        readonly opName: 'IndividualReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly frx: {
                readonly tag: 'frx'
                readonly children: {
                    readonly context: {
                        readonly tag: 'context'
                    }
                    readonly parameters: {
                        readonly tag: 'parameters'
                    } | undefined
                    readonly tagset: {
                        readonly tag: 'tagset'
                        readonly children: {
                            readonly tag: ReadonlyArray<{
                                readonly tag: 'tag'
                                readonly attrs: {
                                    readonly value: string
                                }
                            }>
                        }
                    }
                }
            }
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly business_discovery_entry_point?: string
                    readonly business_discovery_id?: string
                    readonly business_discovery_timestamp?: number
                    readonly first_message?: string
                    readonly is_known_chat: boolean
                    readonly jid?: string
                    readonly reason?: string
                    readonly reportee: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                    readonly value: 'spam_banner'
                }
                readonly children: {
                    readonly biz_api_report: {
                        readonly tag: 'biz_api_report'
                        readonly attrs: {
                            readonly known_account: string
                            readonly message_report: string
                        }
                    }
                    readonly call: ReadonlyArray<{
                        readonly tag: 'call'
                        readonly attrs: {
                            readonly from: string
                            readonly id: string
                            readonly to: string
                        }
                        readonly children: {
                            readonly call_info: {
                                readonly tag: 'call_info'
                                readonly attrs: {
                                    readonly adder?: string
                                    readonly creator?: string
                                    readonly duration: number
                                    readonly mediatype?: string
                                    readonly reason?: string
                                    readonly start_time?: number
                                    readonly terminate_reason?: string
                                    readonly terminator?: string
                                }
                            }
                        }
                    }>
                    readonly message: ReadonlyArray<{
                        readonly tag: 'message'
                        readonly attrs: {
                            readonly edit: '1'
                            readonly entry_point?: string
                            readonly extension_id: string
                            readonly from: string
                            readonly local_message_type?: number
                            readonly mediatype?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly name: string
                            readonly participant: string
                            readonly participant_type?: string
                            readonly protocol_v: number
                            readonly reported_push_name: string
                            readonly response_server_id: string
                            readonly server_id: number
                            readonly session_id: string
                            readonly t: number
                            readonly to: string
                            readonly v: '2'
                        }
                        readonly children: {
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly content_validation: {
                                readonly tag: 'content_validation'
                                readonly attrs: {
                                    readonly type?: string
                                }
                                readonly children: {
                                    readonly reporting_token: {
                                        readonly tag: 'reporting_token'
                                        readonly attrs: {
                                            readonly v: number
                                        }
                                        readonly content: Uint8Array
                                    }
                                    readonly reporting_token_key: {
                                        readonly tag: 'reporting_token_key'
                                    }
                                }
                            } | undefined
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
                            }
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
                            }
                            readonly reporting: {
                                readonly tag: 'reporting'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                        }
                    }>
                    readonly tctoken: {
                        readonly tag: 'tctoken'
                        readonly attrs: {
                            readonly t?: number
                        }
                    }
                    readonly user_initiated_extension: ReadonlyArray<{
                        readonly tag: 'user_initiated_extension'
                        readonly attrs: {
                            readonly entry_point?: string
                            readonly extension_id: string
                            readonly name: string
                            readonly session_id: string
                            readonly t: number
                        }
                        readonly children: {
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly report: {
                    readonly tag: 'report'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
    }
    readonly SpamNewsletterReport: {
        readonly module: 'WASmaxSpamNewsletterReportRPC'
        readonly opName: 'NewsletterReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly jid: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                    readonly subject: string
                }
                readonly children: {
                    readonly message: ReadonlyArray<{
                        readonly tag: 'message'
                        readonly attrs: {
                            readonly edit: '1'
                            readonly entry_point?: string
                            readonly extension_id: string
                            readonly from: string
                            readonly local_message_type?: number
                            readonly mediatype?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly name: string
                            readonly participant: string
                            readonly participant_type?: string
                            readonly protocol_v: number
                            readonly reported_push_name: string
                            readonly response_server_id: string
                            readonly server_id: number
                            readonly session_id: string
                            readonly t: number
                            readonly v: '2'
                        }
                        readonly children: {
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly content_validation: {
                                readonly tag: 'content_validation'
                                readonly attrs: {
                                    readonly type?: string
                                }
                                readonly children: {
                                    readonly reporting_token: {
                                        readonly tag: 'reporting_token'
                                        readonly attrs: {
                                            readonly v: number
                                        }
                                        readonly content: Uint8Array
                                    }
                                    readonly reporting_token_key: {
                                        readonly tag: 'reporting_token_key'
                                    }
                                }
                            } | undefined
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
                            }
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
                            }
                            readonly reporting: {
                                readonly tag: 'reporting'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                        }
                    }>
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly report: {
                    readonly tag: 'report'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
    }
    readonly SpamStatusReport: {
        readonly module: 'WASmaxSpamStatusReportRPC'
        readonly opName: 'StatusReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly frx: {
                readonly tag: 'frx'
                readonly children: {
                    readonly context: {
                        readonly tag: 'context'
                    }
                    readonly parameters: {
                        readonly tag: 'parameters'
                    } | undefined
                    readonly tagset: {
                        readonly tag: 'tagset'
                        readonly children: {
                            readonly tag: ReadonlyArray<{
                                readonly tag: 'tag'
                                readonly attrs: {
                                    readonly value: string
                                }
                            }>
                        }
                    }
                }
            }
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly business_discovery_entry_point?: string
                    readonly business_discovery_id?: string
                    readonly business_discovery_timestamp?: number
                    readonly first_message?: string
                    readonly is_known_chat: boolean
                    readonly jid: string
                    readonly reason?: string
                    readonly reportee: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                }
                readonly children: {
                    readonly biz_api_report: {
                        readonly tag: 'biz_api_report'
                        readonly attrs: {
                            readonly known_account: string
                            readonly message_report: string
                        }
                    }
                    readonly message: {
                        readonly tag: 'message'
                        readonly attrs: {
                            readonly edit: '1'
                            readonly entry_point?: string
                            readonly extension_id: string
                            readonly from: string
                            readonly local_message_type?: number
                            readonly mediatype?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly name: string
                            readonly participant: string
                            readonly participant_type?: string
                            readonly protocol_v: number
                            readonly reported_push_name: string
                            readonly response_server_id: string
                            readonly server_id: number
                            readonly session_id: string
                            readonly t: number
                            readonly to: string
                            readonly v: '2'
                        }
                        readonly children: {
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly content_validation: {
                                readonly tag: 'content_validation'
                                readonly attrs: {
                                    readonly type?: string
                                }
                                readonly children: {
                                    readonly reporting_token: {
                                        readonly tag: 'reporting_token'
                                        readonly attrs: {
                                            readonly v: number
                                        }
                                        readonly content: Uint8Array
                                    }
                                    readonly reporting_token_key: {
                                        readonly tag: 'reporting_token_key'
                                    }
                                }
                            } | undefined
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
                            }
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
                            }
                            readonly reporting: {
                                readonly tag: 'reporting'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly report: {
                    readonly tag: 'report'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
    }
    readonly SpamStatusReportV2: {
        readonly module: 'WASmaxSpamStatusReportV2RPC'
        readonly opName: 'StatusReportV2'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly jid: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                    readonly subject: string
                }
                readonly children: {
                    readonly status: {
                        readonly tag: 'status'
                        readonly attrs: {
                            readonly from?: string
                            readonly server_id: number
                            readonly t: number
                            readonly type: 'text'
                        }
                        readonly children: {
                            readonly plaintext: {
                                readonly tag: 'plaintext'
                                readonly content: Uint8Array
                            }
                        }
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from?: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly report: {
                    readonly tag: 'report'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
    }
    readonly StatsSendBuffer: {
        readonly module: 'WASmaxStatsSendBufferRPC'
        readonly opName: 'SendBuffer'
        readonly xmlns: 'w:stats'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'w:stats'
        }
        readonly children: {
            readonly add: {
                readonly tag: 'add'
                readonly attrs: {
                    readonly t: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ErrorNoRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                    readonly children: {
                        readonly field: {
                            readonly tag: 'field'
                            readonly attrs: {
                                readonly name: string
                                readonly reason: string
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ErrorRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'service-unavailable'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly StatusDeliverIncomingNewsletterStatus: {
        readonly module: 'WASmaxStatusDeliverIncomingNewsletterStatusRPC'
        readonly opName: 'IncomingNewsletterStatus'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'status'
            readonly attrs: {
                readonly bucket: string
                readonly bucketing: string
                readonly count: number
                readonly 'decrypt-fail': 'hide'
                readonly device_fanout: 'false'
                readonly edit: '8' | '1' | '7'
                readonly from: string
                readonly id: string
                readonly is_sender?: 'true'
                readonly jid: string
                readonly mediatype: string
                readonly native_flow_name?: string
                readonly offline: number
                readonly participant: string
                readonly phash: string
                readonly server_id: number
                readonly session_type: 'pq'
                readonly state: string
                readonly sticker_type: 'avatar'
                readonly t: number
                readonly to: 'status@broadcast'
                readonly type: 'text' | 'media' | 'reaction'
            }
            readonly children: {
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly mediatype: string
                        readonly sticker_type?: 'avatar'
                    }
                }
                readonly meta: {
                    readonly tag: 'meta'
                    readonly attrs: {
                        readonly content_type: string
                        readonly interaction_type: 'question_response'
                        readonly is_status_mention: 'true'
                        readonly message_association_type: string
                        readonly response_server_id?: string
                        readonly session_scope: 'status'
                        readonly status_h: string
                        readonly status_ots?: number
                        readonly status_setting: string
                    }
                }
                readonly plaintext: {
                    readonly tag: 'plaintext'
                    readonly content: Uint8Array
                }
                readonly reaction: {
                    readonly tag: 'reaction'
                    readonly attrs: {
                        readonly code: string
                    }
                }
                readonly reporting: {
                    readonly tag: 'reporting'
                    readonly children: {
                        readonly reporting_token: {
                            readonly tag: 'reporting_token'
                            readonly attrs: {
                                readonly v?: number
                            }
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly reporting_tag: {
                    readonly tag: 'reporting_tag'
                    readonly content: Uint8Array
                }
                readonly reporting_token: {
                    readonly tag: 'reporting_token'
                    readonly attrs: {
                        readonly v?: number
                    }
                    readonly content: Uint8Array
                }
                readonly ta_pad: {
                    readonly tag: 'ta_pad'
                }
                readonly tctoken: {
                    readonly tag: 'tctoken'
                }
            }
        } }
    }
    readonly StatusPublishPostBroadcastStatus: {
        readonly module: 'WASmaxStatusPublishPostBroadcastStatusRPC'
        readonly opName: 'PostBroadcastStatus'
        readonly xmlns: null
        readonly type: 'media'
        readonly request: {
        readonly tag: 'status'
        readonly attrs: {
            readonly bucket: string
            readonly bucketing: string
            readonly count: number
            readonly 'decrypt-fail': 'hide'
            readonly device_fanout: 'false'
            readonly edit: '1'
            readonly id: string
            readonly jid: string
            readonly mediatype: string
            readonly native_flow_name?: string
            readonly participant: string
            readonly phash: string
            readonly session_type: 'pq'
            readonly state: string
            readonly sticker_type: 'avatar'
            readonly t?: number
            readonly to: 'status@broadcast'
            readonly type: 'media'
        }
        readonly children: {
            readonly 'device-identity': {
                readonly tag: 'device-identity'
                readonly content: Uint8Array
            }
            readonly enc: {
                readonly tag: 'enc'
                readonly attrs: {
                    readonly mediatype: string
                    readonly sticker_type?: 'avatar'
                }
            }
            readonly meta: {
                readonly tag: 'meta'
                readonly attrs: {
                    readonly content_type: string
                    readonly is_status_mention: 'true'
                    readonly message_association_type: string
                    readonly session_scope: 'status'
                    readonly status_h: string
                    readonly status_ots?: number
                    readonly status_setting: string
                }
            }
            readonly reporting: {
                readonly tag: 'reporting'
                readonly children: {
                    readonly reporting_token: {
                        readonly tag: 'reporting_token'
                        readonly attrs: {
                            readonly v?: number
                        }
                        readonly content: Uint8Array
                    }
                }
            }
            readonly reporting_tag: {
                readonly tag: 'reporting_tag'
                readonly content: Uint8Array
            }
            readonly reporting_token: {
                readonly tag: 'reporting_token'
                readonly attrs: {
                    readonly v?: number
                }
                readonly content: Uint8Array
            }
            readonly ta_pad: {
                readonly tag: 'ta_pad'
            }
            readonly tctoken: {
                readonly tag: 'tctoken'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Negative'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly application_error: number
                readonly backoff: number
                readonly class: 'status'
                readonly edit?: '1'
                readonly error: string
                readonly from: string
                readonly id: string
                readonly participant?: string
                readonly t: number
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'status'
                readonly count: number
                readonly edit?: '1'
                readonly from: string
                readonly id: string
                readonly participant?: string
                readonly phash: string
                readonly t: number
            }
            readonly children: {
                readonly rcat: {
                    readonly tag: 'rcat'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly StatusPublishPostNewsletterStatus: {
        readonly module: 'WASmaxStatusPublishPostNewsletterStatusRPC'
        readonly opName: 'PostNewsletterStatus'
        readonly xmlns: null
        readonly type: 'reaction'
        readonly request: {
        readonly tag: 'status'
        readonly attrs: {
            readonly edit: '7'
            readonly id: string
            readonly server_id: number
            readonly to: string
            readonly type: 'reaction'
        }
        readonly children: {
            readonly meta: {
                readonly tag: 'meta'
                readonly attrs: {
                    readonly interaction_type: 'question_response'
                    readonly response_server_id?: string
                }
            }
            readonly plaintext: {
                readonly tag: 'plaintext'
                readonly content: Uint8Array
            }
            readonly reaction: {
                readonly tag: 'reaction'
                readonly attrs: {
                    readonly code: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Negative'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly application_error: number
                readonly backoff: number
                readonly class: 'status'
                readonly edit?: '1'
                readonly error: string
                readonly from: string
                readonly id: string
                readonly t: number
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'status'
                readonly edit?: '1'
                readonly from: string
                readonly id: string
                readonly server_id?: number
                readonly t: number
            }
        } }
    }
    readonly StreamErrorAckKick: {
        readonly module: 'WASmaxStreamErrorAckKickRPC'
        readonly opName: 'AckKick'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'stream:error'
            readonly children: {
                readonly ack: {
                    readonly tag: 'ack'
                    readonly attrs: {
                        readonly class: 'appdata' | 'call' | 'message' | 'notification' | 'receipt'
                        readonly id: string
                        readonly type: 'account_sync' | 'business' | 'companion_reg_refresh' | 'contacts' | 'digital_commerce_subscription' | 'disappearing_mode' | 'mediaretry' | 'mex' | 'offer_notice' | 'pay' | 'picture' | 'privacy_token' | 'psa' | 'registration' | 'retry' | 'server' | 'server_sync' | 'status' | 'text' | 'w:gp2'
                    }
                }
            }
        } }
    }
    readonly StreamErrorBadMac: {
        readonly module: 'WASmaxStreamErrorBadMacRPC'
        readonly opName: 'BadMac'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'stream:error'
        } }
    }
    readonly StreamErrorCode: {
        readonly module: 'WASmaxStreamErrorCodeRPC'
        readonly opName: 'Code'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'stream:error'
            readonly attrs: {
                readonly code: string
            }
        } }
    }
    readonly StreamErrorConflict: {
        readonly module: 'WASmaxStreamErrorConflictRPC'
        readonly opName: 'Conflict'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'stream:error'
            readonly attrs: {
                readonly code?: string
            }
            readonly children: {
                readonly conflict: {
                    readonly tag: 'conflict'
                    readonly attrs: {
                        readonly reason?: string
                        readonly type: string
                    }
                }
            }
        } }
    }
    readonly StreamErrorPingKick: {
        readonly module: 'WASmaxStreamErrorPingKickRPC'
        readonly opName: 'PingKick'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'stream:error'
            readonly children: {
                readonly ping: {
                    readonly tag: 'ping'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
    }
    readonly StreamErrorXMLNotWellFormed: {
        readonly module: 'WASmaxStreamErrorXMLNotWellFormedRPC'
        readonly opName: 'XMLNotWellFormed'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'stream:error'
        } }
    }
    readonly SyncdNewPatch: {
        readonly module: 'WASmaxSyncdNewPatchRPC'
        readonly opName: 'NewPatch'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
                readonly id: string
                readonly offline?: number
                readonly t: number
                readonly type: 'server_sync'
            }
            readonly children: {
                readonly collection: ReadonlyArray<{
                    readonly tag: 'collection'
                    readonly attrs: {
                        readonly name: string
                        readonly version: number
                    }
                }>
            }
        } }
    }
    readonly UnifiedSessionShare: {
        readonly module: 'WASmaxUnifiedSessionShareRPC'
        readonly opName: 'Share'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'ib'
        readonly children: {
            readonly unified_session: {
                readonly tag: 'unified_session'
                readonly attrs: {
                    readonly id: string
                }
            }
        }
    }
        readonly response:
        | never
    }
    readonly UserNoticeGetDisclosureStageByIds: {
        readonly module: 'WASmaxUserNoticeGetDisclosureStageByIdsRPC'
        readonly opName: 'GetDisclosureStageByIds'
        readonly xmlns: 'tos'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'tos'
        }
        readonly children: {
            readonly get_disclosure_stage_by_id: ReadonlyArray<{
                readonly tag: 'get_disclosure_stage_by_id'
                readonly attrs: {
                    readonly id: number
                    readonly t: number
                }
            }>
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ClientSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly notice: ReadonlyArray<{
                    readonly tag: 'notice'
                    readonly attrs: {
                        readonly id: number
                        readonly stage: number
                        readonly t: number
                        readonly type?: number
                        readonly version?: number
                    }
                }>
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
    }
    readonly UserNoticeGetDisclosures: {
        readonly module: 'WASmaxUserNoticeGetDisclosuresRPC'
        readonly opName: 'GetDisclosures'
        readonly xmlns: 'tos'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'tos'
        }
        readonly children: {
            readonly get_user_disclosures: {
                readonly tag: 'get_user_disclosures'
                readonly attrs: {
                    readonly t: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ClientSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly notice: ReadonlyArray<{
                    readonly tag: 'notice'
                    readonly attrs: {
                        readonly id: number
                        readonly stage: number
                        readonly t: number
                        readonly type: number
                        readonly version: number
                    }
                }>
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
    }
    readonly UserNoticeSet: {
        readonly module: 'WASmaxOutUserNoticeSetRequest'
        readonly opName: 'Set'
        readonly xmlns: 'tos'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'tos'
        }
        readonly children: {
            readonly notice: {
                readonly tag: 'notice'
                readonly attrs: {
                    readonly id: number
                    readonly stage: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly notice: {
                    readonly tag: 'notice'
                    readonly attrs: {
                        readonly id: number
                        readonly stage: number
                        readonly t: number
                    }
                } | undefined
            }
        } }
    }
    readonly UserNoticeSetResult: {
        readonly module: 'WASmaxOutUserNoticeSetResultRequest'
        readonly opName: 'SetResult'
        readonly xmlns: 'tos'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly to: 's.whatsapp.net'
            readonly type: 'set'
            readonly xmlns: 'tos'
        }
        readonly children: {
            readonly trackable: {
                readonly tag: 'trackable'
                readonly attrs: {
                    readonly id: number
                    readonly result: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code: number
                        readonly text: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'internal-server-error'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly trackable: {
                    readonly tag: 'trackable'
                    readonly attrs: {
                        readonly id: number
                        readonly result: number
                    }
                } | undefined
            }
        } }
    }
    readonly UsyncNotification: {
        readonly module: 'WASmaxUsyncNotificationRPC'
        readonly opName: 'Notification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly lid?: string
                readonly offline?: number
                readonly t: number
                readonly type: 'devices'
            }
            readonly children: {
                readonly add: {
                    readonly tag: 'add'
                    readonly attrs: {
                        readonly device_hash: string
                        readonly device_lid_hash?: string
                    }
                    readonly children: {
                        readonly device: ReadonlyArray<{
                            readonly tag: 'device'
                            readonly attrs: {
                                readonly jid: string
                                readonly 'key-index'?: number
                                readonly lid?: string
                            }
                        }>
                        readonly 'key-index-list': {
                            readonly tag: 'key-index-list'
                            readonly attrs: {
                                readonly ts: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                    }
                }
                readonly groups: {
                    readonly tag: 'groups'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly jid: string
                            }
                        }>
                    }
                }
                readonly remove: {
                    readonly tag: 'remove'
                    readonly attrs: {
                        readonly device_hash: string
                        readonly device_lid_hash?: string
                    }
                    readonly children: {
                        readonly device: ReadonlyArray<{
                            readonly tag: 'device'
                            readonly attrs: {
                                readonly jid: string
                                readonly 'key-index'?: number
                                readonly lid?: string
                            }
                        }>
                        readonly 'key-index-list': {
                            readonly tag: 'key-index-list'
                            readonly attrs: {
                                readonly ts: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                    }
                }
                readonly update: {
                    readonly tag: 'update'
                    readonly attrs: {
                        readonly hash: string
                        readonly lid_hash?: string
                    }
                }
            }
        } }
    }
    readonly VoipLinkCreate: {
        readonly module: 'WASmaxVoipLinkCreateRPC'
        readonly opName: 'LinkCreate'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'call'
        readonly attrs: {
            readonly id: string
            readonly to: string
        }
        readonly children: {
            readonly link_create: {
                readonly tag: 'link_create'
                readonly attrs: {
                    readonly 'call-creator'?: string
                    readonly 'call-id'?: string
                    readonly link_creator_username?: string
                    readonly media?: 'audio' | 'video'
                    readonly waiting_room_enabled?: '1'
                }
                readonly children: {
                    readonly event: {
                        readonly tag: 'event'
                        readonly attrs: {
                            readonly start_time: number
                        }
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'LinkCreateAck'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'call'
                readonly error?: string
                readonly from: string
                readonly id: string
                readonly to?: string
                readonly type: 'link_create'
            }
            readonly children: {
                readonly link_create: {
                    readonly tag: 'link_create'
                    readonly attrs: {
                        readonly 'call-creator'?: string
                        readonly 'call-id'?: string
                        readonly media?: 'audio' | 'video'
                        readonly token: string
                    }
                }
            }
        } }
        | { readonly variant: 'LinkCreateNack'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'call'
                readonly error: string
                readonly from: 'call'
                readonly id: string
                readonly to?: string
                readonly type: 'link_create'
            }
        } }
    }
    readonly VoipLinkQuery: {
        readonly module: 'WASmaxVoipLinkQueryRPC'
        readonly opName: 'LinkQuery'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'call'
        readonly attrs: {
            readonly id: string
            readonly to: 'call'
        }
        readonly children: {
            readonly link_query: {
                readonly tag: 'link_query'
                readonly attrs: {
                    readonly action?: 'link_edit' | 'preview'
                    readonly media: 'audio' | 'video'
                    readonly token: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'LinkQueryAck'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'call'
                readonly error?: string
                readonly from: 'call'
                readonly id: string
                readonly to?: string
                readonly type: 'link_query'
            }
            readonly children: {
                readonly link_query: {
                    readonly tag: 'link_query'
                    readonly attrs: {
                        readonly action?: 'link_edit' | 'preview'
                        readonly link_creator: string
                        readonly link_creator_pn?: string
                        readonly link_creator_username?: string
                        readonly media: 'audio' | 'video'
                        readonly token: string
                    }
                    readonly children: {
                        readonly waiting_room: {
                            readonly tag: 'waiting_room'
                            readonly attrs: {
                                readonly enabled: '0' | '1'
                                readonly is_admin?: '1'
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'LinkQueryNack'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'call'
                readonly error: string
                readonly from: 'call'
                readonly id: string
                readonly to?: string
                readonly type: 'link_query'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly token: string
                    }
                }
            }
        } }
    }
    readonly VoipWaitingRoomToggleCallLink: {
        readonly module: 'WASmaxVoipWaitingRoomToggleCallLinkRPC'
        readonly opName: 'WaitingRoomToggleCallLink'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'call'
        readonly attrs: {
            readonly id: string
            readonly to: 'call'
        }
        readonly children: {
            readonly waiting_room_toggle: {
                readonly tag: 'waiting_room_toggle'
                readonly attrs: {
                    readonly enabled: boolean
                    readonly 'link-token': string
                    readonly media: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'WaitingRoomToggleCallLinkAck'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'call'
                readonly error?: string
                readonly from: 'call'
                readonly id: string
                readonly to?: string
                readonly type: 'waiting_room_toggle'
            }
            readonly children: {
                readonly waiting_room_toggle: {
                    readonly tag: 'waiting_room_toggle'
                    readonly attrs: {
                        readonly 'link-token': string
                    }
                }
            }
        } }
        | { readonly variant: 'WaitingRoomToggleCallLinkNack'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'call'
                readonly error: string
                readonly from: 'call'
                readonly id: string
                readonly to?: string
                readonly type: 'waiting_room_toggle'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly 'link-token': string
                    }
                }
            }
        } }
    }
    readonly WaffleEncryptedPayload: {
        readonly module: 'WASmaxWaffleEncryptedPayloadRequestRPC'
        readonly opName: 'EncryptedPayloadRequest'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '47'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly action: {
                readonly tag: 'action'
            }
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly algorithm: 'rsa2048'
                    readonly version: '1'
                }
                readonly children: {
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly ndc?: 'false' | 'true'
                        readonly npr?: 'false' | 'true'
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly algorithm: 'rsa2048'
                        readonly version: '1'
                    }
                    readonly children: {
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly wf_deleted: {
                    readonly tag: 'wf_deleted'
                    readonly content: 'false' | 'true'
                } | undefined
            }
        } }
    }
    readonly WaffleForceDeleteState: {
        readonly module: 'WASmaxWaffleForceDeleteStateRPC'
        readonly opName: 'ForceDeleteState'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '59'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly only_if_suspended: {
                readonly tag: 'only_if_suspended'
            } | undefined
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
        } }
    }
    readonly WaffleForceSuspendState: {
        readonly module: 'WASmaxWaffleForceSuspendStateRPC'
        readonly opName: 'ForceSuspendState'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '84'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly npr: {
                    readonly tag: 'npr'
                    readonly content: 'false' | 'true'
                }
            }
        } }
    }
    readonly WaffleGenerateAccessTokens: {
        readonly module: 'WASmaxWaffleGenerateAccessTokensRPC'
        readonly opName: 'GenerateAccessTokens'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '38'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly algorithm: 'rsa2048'
                    readonly version: '1'
                }
                readonly children: {
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
            readonly id_sign: {
                readonly tag: 'id_sign'
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly algorithm: 'rsa2048'
                        readonly version: '1'
                    }
                    readonly children: {
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly ping_interval: {
                    readonly tag: 'ping_interval'
                    readonly content: number
                }
            }
        } }
    }
    readonly WaffleGenerateWAEntACUser: {
        readonly module: 'WASmaxWaffleGenerateWAEntACUserRPC'
        readonly opName: 'GenerateWAEntACUser'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '37'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly disclosure: {
                readonly tag: 'disclosure'
                readonly attrs: {
                    readonly id: number
                    readonly lc: string
                    readonly lg: string
                    readonly version: number
                }
            }
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly algorithm: 'rsa2048'
                    readonly version: '1'
                }
                readonly children: {
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: Uint8Array
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly algorithm: 'rsa2048'
                        readonly version: '1'
                    }
                    readonly children: {
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly WaffleGetCertificate: {
        readonly module: 'WASmaxWaffleGetCertificateRPC'
        readonly opName: 'GetCertificate'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '51'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly password_pem: {
                readonly tag: 'password_pem'
            } | undefined
            readonly payload_enc_certificates: {
                readonly tag: 'payload_enc_certificates'
            } | undefined
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly reply: {
                    readonly tag: 'reply'
                    readonly attrs: {
                        readonly timestamp: number
                    }
                    readonly children: {
                        readonly encryption_pem: {
                            readonly tag: 'encryption_pem'
                            readonly attrs: {
                                readonly ttl: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                        readonly password_pem: {
                            readonly tag: 'password_pem'
                            readonly attrs: {
                                readonly key_id: number
                                readonly ttl: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                        readonly signature_pem: {
                            readonly tag: 'signature_pem'
                            readonly attrs: {
                                readonly ttl: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly WaffleRefreshAccessTokens: {
        readonly module: 'WASmaxWaffleRefreshAccessTokensRPC'
        readonly opName: 'RefreshAccessTokens'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '46'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly algorithm: 'rsa2048'
                    readonly version: '1'
                }
                readonly children: {
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly ndc?: 'false' | 'true'
                        readonly npr?: 'false' | 'true'
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly algorithm: 'rsa2048'
                        readonly version: '1'
                    }
                    readonly children: {
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly WaffleStateExists: {
        readonly module: 'WASmaxWaffleStateExistsRPC'
        readonly opName: 'StateExists'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '142'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly suspended_state: {
                    readonly tag: 'suspended_state'
                    readonly attrs: {
                        readonly npr?: 'false' | 'true'
                    }
                } | undefined
                readonly wf_state: {
                    readonly tag: 'wf_state'
                    readonly content: number
                }
            }
        } }
    }
    readonly WaffleWFPing: {
        readonly module: 'WASmaxWaffleWFPingRPC'
        readonly opName: 'WFPing'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly smax_id: '83'
            readonly to: 's.whatsapp.net'
            readonly type: 'get'
            readonly xmlns: 'waffle'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly algorithm: 'rsa2048'
                    readonly version: '1'
                }
                readonly children: {
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly code?: number
                        readonly ndc?: 'false' | 'true'
                        readonly npr?: 'false' | 'true'
                        readonly text?: 'bad-request'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly type: 'result'
            }
            readonly children: {
                readonly ping_interval: {
                    readonly tag: 'ping_interval'
                    readonly content: number
                }
            }
        } }
    }
}

// Server-initiated stanzas (everything that arrives outside the IQ
// request/response pipeline) get routed through the imperative dispatch
// table in WAWebCommsHandleLoggedInStanza. Each entry below either has
// a single `handler` (one root tag → one parser module) or a
// `discriminator` plus a `variants` map (sub-switch on the named attr,
// most commonly `type` for `receipt` / `notification`). Every variant
// also carries its full `node` shape (attrs/children/content) as a
// typed literal so consumers can autocomplete the wire schema.
export interface WaXmlStanzaHandlerRef {
    readonly module: string
    readonly method: string
}

export type WaXmlStanzaKey = 'ack' | 'call' | 'chatstate' | 'error' | 'failure' | 'ib' | 'iq' | 'message' | 'notification' | 'presence' | 'receipt' | 'status' | 'stream:error' | 'success' | 'xmlstreamend'

export interface WaXmlStanzas {
    readonly ack: {
        readonly tag: 'ack'
        readonly handler: null
        readonly node: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly class: 'call' | 'message' | 'notification' | 'receipt' | 'status'
                readonly error?: number
                readonly id: string
                readonly participant?: string
                readonly recipient?: string
                readonly to: string
                readonly type: 'account_sync' | 'business' | 'companion_reg_refresh' | 'contacts' | 'digital_commerce_subscription' | 'disappearing_mode' | 'mediaretry' | 'mex' | 'offer_notice' | 'pay' | 'picture' | 'privacy_token' | 'psa' | 'registration' | 'retry' | 'server' | 'server_sync' | 'status' | 'text' | 'w:gp2'
            }
            readonly children: {
                readonly meta: {
                    readonly tag: 'meta'
                    readonly attrs: {
                        readonly failure_reason: number
                    }
                }
                readonly user: {
                    readonly tag: 'user'
                    readonly attrs: {
                        readonly side_list: 'out'
                    }
                }
            }
        }
    }
    readonly call: {
        readonly tag: 'call'
        readonly handler: { readonly module: 'WAWebHandleVoipCall'; readonly method: 'handleCall' }
        readonly node: {
            readonly tag: 'call'
            readonly attrs: {
                readonly e?: number
                readonly from: string
                readonly id: string
                readonly offline?: number
                readonly platform?: string
                readonly sender_lid?: string
                readonly t?: number
                readonly to: string
                readonly version?: number
            }
            readonly children: {
                readonly '*': {
                    readonly tag: 'offer' | 'offer_receipt' | 'accept' | 'reject' | 'terminate' | 'transport' | 'offer_ack' | 'offer_nack' | 'relay_latency' | 'relay_election' | 'interruption' | 'mute' | 'preaccept' | 'accept_receipt' | 'video_state' | 'notify' | 'group_info' | 'enc_rekey' | 'peer_state' | 'video_state_ack' | 'flow_control' | 'web_client' | 'accept_ack' | 'group_update' | 'offer_notice'
                    readonly attrs: {
                        readonly 'call-creator': string
                        readonly 'call-id': string
                        readonly caller_country_code?: string
                        readonly caller_pn?: string
                        readonly 'group-jid'?: string
                        readonly notify?: string
                        readonly username?: string
                    }
                    readonly children: {
                        readonly group_info: {
                            readonly tag: 'group_info'
                            readonly children: {
                                readonly '*': ReadonlyArray<{
                                    readonly tag: '*'
                                    readonly attrs: {
                                        readonly account_kind?: string
                                        readonly guest_name?: string
                                        readonly jid: string
                                        readonly push_name?: string
                                        readonly user_pn?: string
                                        readonly username?: string
                                    }
                                }>
                            }
                        } | undefined
                        readonly silence: {
                            readonly tag: 'silence'
                            readonly attrs: {
                                readonly reason?: string
                            }
                        } | undefined
                        readonly video: {
                            readonly tag: 'video'
                        } | undefined
                    }
                }
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly count: number
                        readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                        readonly v: '2'
                    }
                    readonly content: Uint8Array
                }
                readonly link_create: {
                    readonly tag: 'link_create'
                    readonly attrs: {
                        readonly 'call-creator'?: string
                        readonly 'call-id'?: string
                        readonly link_creator_username?: string
                        readonly media?: 'audio' | 'video'
                        readonly waiting_room_enabled?: '1'
                    }
                    readonly children: {
                        readonly event: {
                            readonly tag: 'event'
                            readonly attrs: {
                                readonly start_time: number
                            }
                        } | undefined
                    }
                }
                readonly link_query: {
                    readonly tag: 'link_query'
                    readonly attrs: {
                        readonly action?: 'link_edit' | 'preview'
                        readonly media: 'audio' | 'video'
                        readonly token: string
                    }
                }
                readonly waiting_room_toggle: {
                    readonly tag: 'waiting_room_toggle'
                    readonly attrs: {
                        readonly enabled: boolean
                        readonly 'link-token': string
                        readonly media: string
                    }
                }
            }
        }
    }
    readonly chatstate: {
        readonly tag: 'chatstate'
        readonly handler: { readonly module: 'WACreateHandleChatState'; readonly method: 'createHandleChatState' }
        readonly node: {
            readonly tag: 'chatstate'
            readonly attrs: {
                readonly from?: string
                readonly participant?: string
                readonly participant_pn?: string
                readonly to: string
            }
            readonly children: {
                readonly composing: {
                    readonly tag: 'composing'
                    readonly attrs: {
                        readonly media?: 'audio'
                    }
                }
                readonly paused: {
                    readonly tag: 'paused'
                }
                readonly test: {
                    readonly tag: 'test'
                    readonly attrs: {
                        readonly config?: string
                    }
                }
            }
        }
    }
    readonly error: {
        readonly tag: 'error'
        readonly handler: { readonly module: 'WABackendHandleError'; readonly method: 'handleError' }
        readonly node: {
            readonly tag: 'error'
            readonly attrs: {
                readonly code: number
            }
        }
    }
    readonly failure: {
        readonly tag: 'failure'
        readonly handler: { readonly module: 'WAWebHandleFailure'; readonly method: 'default' }
        readonly node: {
            readonly tag: 'failure'
            readonly attrs: {
                readonly code?: number
                readonly expire?: number
                readonly location: string
                readonly logout_message_header?: string
                readonly logout_message_locale?: string
                readonly logout_message_subtext?: string
                readonly message?: string
                readonly reason: number
                readonly url?: string
            }
        }
    }
    readonly ib: {
        readonly tag: 'ib'
        readonly handler: { readonly module: 'WAWebHandleInfoBulletin'; readonly method: 'default' }
        readonly node: {
            readonly tag: 'ib'
            readonly attrs: {
                readonly from: 's.whatsapp.net'
            }
            readonly children: {
                readonly client_expiration: {
                    readonly tag: 'client_expiration'
                    readonly attrs: {
                        readonly t?: number
                    }
                }
                readonly item: {
                    readonly tag: 'item'
                    readonly attrs: {
                        readonly from: string
                        readonly t: number
                    }
                }
                readonly offline: {
                    readonly tag: 'offline'
                    readonly attrs: {
                        readonly count: number
                    }
                }
                readonly offline_batch: {
                    readonly tag: 'offline_batch'
                    readonly attrs: {
                        readonly count: number
                    }
                }
                readonly offline_preview: {
                    readonly tag: 'offline_preview'
                    readonly attrs: {
                        readonly count: number
                        readonly message: number
                        readonly notification: number
                        readonly receipt: number
                    }
                }
                readonly thread_metadata: {
                    readonly tag: 'thread_metadata'
                }
                readonly unified_session: {
                    readonly tag: 'unified_session'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        }
    }
    readonly iq: {
        readonly tag: 'iq'
        readonly discriminator: 'firstChildTag'
        readonly variants: {
            readonly 'pair-device': {
                readonly handler: { readonly module: 'WAWebHandlePairDevice'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'iq'
                readonly attrs: {
                    readonly from: 's.whatsapp.net'
                    readonly id: string
                    readonly type: 'set'
                    readonly xmlns: 'md'
                }
                readonly children: {
                    readonly 'pair-device': {
                        readonly tag: 'pair-device'
                        readonly children: {
                            readonly ref: ReadonlyArray<{
                                readonly tag: 'ref'
                                readonly content: Uint8Array
                            }>
                        }
                    }
                }
            }
            }
            readonly 'pair-success': {
                readonly handler: { readonly module: 'WAWebHandlePairSuccess'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'iq'
                readonly attrs: {
                    readonly from: 's.whatsapp.net'
                    readonly id: string
                    readonly type: 'set'
                    readonly xmlns: 'md'
                }
                readonly children: {
                    readonly 'pair-success': {
                        readonly tag: 'pair-success'
                        readonly children: {
                            readonly biz: {
                                readonly tag: 'biz'
                                readonly attrs: {
                                    readonly name: string
                                }
                            } | undefined
                            readonly 'client-props': {
                                readonly tag: 'client-props'
                                readonly content: Uint8Array
                            } | undefined
                            readonly companion_recovery_server_token: {
                                readonly tag: 'companion_recovery_server_token'
                                readonly content: string
                            } | undefined
                            readonly device: {
                                readonly tag: 'device'
                                readonly attrs: {
                                    readonly beta?: 'false' | 'true'
                                    readonly jid: string
                                    readonly lid: string
                                }
                            }
                            readonly 'device-identity': {
                                readonly tag: 'device-identity'
                                readonly content: Uint8Array
                            }
                            readonly 'encryption-metadata': {
                                readonly tag: 'encryption-metadata'
                                readonly attrs: {
                                    readonly algorithm: 'aes-256-gcm'
                                    readonly version: '1'
                                }
                                readonly children: {
                                    readonly auth_tag: {
                                        readonly tag: 'auth_tag'
                                        readonly content: Uint8Array
                                    }
                                    readonly encrypted_data: {
                                        readonly tag: 'encrypted_data'
                                        readonly content: Uint8Array
                                    }
                                    readonly encrypted_key: {
                                        readonly tag: 'encrypted_key'
                                        readonly content: Uint8Array
                                    }
                                    readonly nonce: {
                                        readonly tag: 'nonce'
                                        readonly content: Uint8Array
                                    }
                                }
                            } | undefined
                            readonly jurisdiction: {
                                readonly tag: 'jurisdiction'
                                readonly attrs: {
                                    readonly cc: string
                                    readonly iso: string
                                }
                            }
                            readonly platform: {
                                readonly tag: 'platform'
                                readonly attrs: {
                                    readonly name: string
                                }
                            }
                        }
                    }
                }
            }
            }
        }
    }
    readonly message: {
        readonly tag: 'message'
        readonly discriminator: 'condition'
        readonly variants: {
            readonly 'from-is-newsletter': {
                readonly handler: { readonly module: 'WAWebHandleNewsletterMsg'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'message'
                readonly attrs: {
                    readonly addressing_mode?: 'lid' | 'pn'
                    readonly category?: 'peer'
                    readonly client_thread_id: string
                    readonly conversation_thread_id: string
                    readonly count: number
                    readonly device_fanout?: 'false'
                    readonly duration: number
                    readonly edit: '3' | '7'
                    readonly edit_target_id?: string
                    readonly eph_setting?: string
                    readonly from: string
                    readonly id: string
                    readonly is_sender?: 'true'
                    readonly is_template_from_library_edited?: boolean
                    readonly jid: string
                    readonly library_template_id?: string
                    readonly mediatype?: string
                    readonly name: 'full_catalog'
                    readonly native_flow_name?: string
                    readonly notify?: string
                    readonly offline: number
                    readonly participant: string
                    readonly peer_recipient_lid?: string
                    readonly peer_recipient_pn?: string
                    readonly peer_recipient_username?: string
                    readonly phash?: string
                    readonly privacy_sensitive?: boolean
                    readonly push_priority: string
                    readonly recipient?: string
                    readonly recipient_pn?: string
                    readonly sender_lid?: string
                    readonly sender_timestamp_ms?: number
                    readonly server_id: number
                    readonly session_type: 'pq'
                    readonly state: string
                    readonly sticker_type: 'avatar'
                    readonly sts?: number
                    readonly sub_tag?: string
                    readonly t: number
                    readonly tag?: string
                    readonly target_chat_jid?: string
                    readonly target_chat_jid_lid?: string
                    readonly target_id: string
                    readonly target_sender_jid?: string
                    readonly thread_type: number
                    readonly to: string
                    readonly ttl?: number
                    readonly type: 'text' | 'native_flow'
                    readonly v?: '1'
                    readonly value: string
                    readonly verified_name: string
                }
                readonly children: {
                    readonly automated: {
                        readonly tag: 'automated'
                    }
                    readonly biz: {
                        readonly tag: 'biz'
                        readonly children: {
                            readonly buttons: {
                                readonly tag: 'buttons'
                            }
                        }
                    }
                    readonly bot: {
                        readonly tag: 'bot'
                        readonly attrs: {
                            readonly type: 'feedback'
                        }
                        readonly children: {
                            readonly to: {
                                readonly tag: 'to'
                                readonly attrs: {
                                    readonly count: number
                                    readonly duration: number
                                    readonly jid: string
                                    readonly mediatype: string
                                    readonly native_flow_name?: string
                                    readonly session_type: 'pq'
                                    readonly state: string
                                    readonly sticker_type: 'avatar'
                                    readonly type: string
                                }
                                readonly children: {
                                    readonly enc: {
                                        readonly tag: 'enc'
                                        readonly attrs: {
                                            readonly count: number
                                            readonly duration: number
                                            readonly mediatype: string
                                            readonly native_flow_name?: string
                                            readonly session_type: 'pq'
                                            readonly state: 'false' | 'true'
                                            readonly sticker_type: 'avatar'
                                            readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                                            readonly v: '2'
                                        }
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                        }
                    }
                    readonly capability: ReadonlyArray<{
                        readonly tag: 'capability'
                        readonly attrs: {
                            readonly name: string
                        }
                    }>
                    readonly content_binding: {
                        readonly tag: 'content_binding'
                    }
                    readonly conversion: {
                        readonly tag: 'conversion'
                        readonly attrs: {
                            readonly recipient_status: string
                        }
                    }
                    readonly 'device-identity': {
                        readonly tag: 'device-identity'
                        readonly content: Uint8Array
                    }
                    readonly enc: {
                        readonly tag: 'enc'
                        readonly attrs: {
                            readonly mediatype: string
                            readonly native_flow_name?: string
                            readonly session_type: 'pq'
                            readonly state: 'false' | 'true'
                            readonly sticker_type: 'avatar'
                            readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                            readonly v: '2'
                        }
                        readonly content: Uint8Array
                    }
                    readonly franking: {
                        readonly tag: 'franking'
                        readonly children: {
                            readonly franking_tag: {
                                readonly tag: 'franking_tag'
                            }
                        }
                    }
                    readonly hsm: {
                        readonly tag: 'hsm'
                        readonly attrs: {
                            readonly buttons?: '1'
                            readonly category?: string
                            readonly id?: string
                            readonly is_template_from_library_edited?: boolean
                            readonly library_template_id?: string
                            readonly name: 'full_catalog'
                            readonly objective?: string
                            readonly sub_tag?: string
                            readonly tag?: string
                            readonly v?: '1'
                        }
                        readonly children: {
                            readonly quality_token: {
                                readonly tag: 'quality_token'
                                readonly attrs: {
                                    readonly v?: '1'
                                }
                            }
                        }
                    }
                    readonly meta: {
                        readonly tag: 'meta'
                        readonly attrs: {
                            readonly appdata?: 'default' | 'group_history' | 'member_tag'
                            readonly conversation_thread_id?: string
                            readonly destination_id?: string
                            readonly event_type?: 'creation' | 'edit' | 'response'
                            readonly group_invite: string
                            readonly is_status_mention: 'true'
                            readonly message_association_type: string
                            readonly metering_type: 'smb_mm'
                            readonly origin?: 'ctwa'
                            readonly original_msg_t: number
                            readonly peripheral: string
                            readonly polltype?: 'creation' | 'edit' | 'quiz_creation' | 'result_snapshot' | 'vote'
                            readonly questiontype: 'response'
                            readonly receiver_account_kind: string
                            readonly sender_intent?: 'hosted'
                            readonly session_scope?: 'status'
                            readonly st: string
                            readonly status_setting?: string
                            readonly tag_reason?: string
                            readonly thread_msg_id?: string
                            readonly thread_msg_sender_jid?: string
                            readonly type: 'scheduled_message'
                            readonly view_once?: 'true'
                        }
                        readonly children: {
                            readonly key: {
                                readonly tag: 'key'
                                readonly attrs: {
                                    readonly rkid: string
                                }
                                readonly content: Uint8Array
                            }
                        }
                    }
                    readonly mixed_metadata: {
                        readonly tag: 'mixed_metadata'
                        readonly children: {
                            readonly payments_metadata: {
                                readonly tag: 'payments_metadata'
                                readonly attrs: {
                                    readonly version: number
                                }
                            }
                        }
                    }
                    readonly multicast: {
                        readonly tag: 'multicast'
                    }
                    readonly native_flow: {
                        readonly tag: 'native_flow'
                        readonly attrs: {
                            readonly name: string
                            readonly v?: number
                        }
                        readonly children: {
                            readonly capability: ReadonlyArray<{
                                readonly tag: 'capability'
                                readonly attrs: {
                                    readonly name: string
                                }
                            }>
                            readonly mixed_metadata: {
                                readonly tag: 'mixed_metadata'
                                readonly children: {
                                    readonly payments_metadata: {
                                        readonly tag: 'payments_metadata'
                                        readonly attrs: {
                                            readonly version: number
                                        }
                                    }
                                }
                            }
                        }
                    }
                    readonly padding: {
                        readonly tag: 'padding'
                        readonly content: Uint8Array
                    }
                    readonly plaintext: {
                        readonly tag: 'plaintext'
                        readonly content: Uint8Array
                    }
                    readonly quality_token: {
                        readonly tag: 'quality_token'
                        readonly attrs: {
                            readonly v?: '1'
                        }
                    }
                    readonly rcat: {
                        readonly tag: 'rcat'
                        readonly content: Uint8Array
                    }
                    readonly reaction: {
                        readonly tag: 'reaction'
                        readonly attrs: {
                            readonly code: string
                        }
                    }
                    readonly reporting: {
                        readonly tag: 'reporting'
                        readonly children: {
                            readonly reporting_token: {
                                readonly tag: 'reporting_token'
                                readonly attrs: {
                                    readonly v: number
                                }
                                readonly content: Uint8Array
                            }
                        }
                    }
                    readonly request_id: {
                        readonly tag: 'request_id'
                    }
                    readonly ta_pad: {
                        readonly tag: 'ta_pad'
                    }
                    readonly tctoken: {
                        readonly tag: 'tctoken'
                        readonly attrs: {
                            readonly t?: number
                        }
                    }
                    readonly test: {
                        readonly tag: 'test'
                        readonly attrs: {
                            readonly config?: string
                        }
                    }
                    readonly to: ReadonlyArray<{
                        readonly tag: 'to'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                    readonly trace: {
                        readonly tag: 'trace'
                        readonly children: {
                            readonly request_id: {
                                readonly tag: 'request_id'
                            }
                        }
                    }
                    readonly url_number: {
                        readonly tag: 'url_number'
                    }
                    readonly url_text: {
                        readonly tag: 'url_text'
                    }
                    readonly votes: {
                        readonly tag: 'votes'
                        readonly children: {
                            readonly vote: ReadonlyArray<{
                                readonly tag: 'vote'
                                readonly content: Uint8Array
                            }>
                        }
                    }
                }
            }
            }
            readonly 'from-is-not-newsletter': {
                readonly handler: { readonly module: 'WAWebHandleMsg'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'message'
                readonly attrs: {
                    readonly addressing_mode?: 'lid' | 'pn'
                    readonly category?: 'peer'
                    readonly client_thread_id: string
                    readonly conversation_thread_id: string
                    readonly count: number
                    readonly device_fanout?: 'false'
                    readonly duration: number
                    readonly edit?: '1' | '2' | '3' | '7' | '8'
                    readonly edit_target_id?: string
                    readonly eph_setting?: string
                    readonly from: string
                    readonly id: string
                    readonly is_template_from_library_edited?: boolean
                    readonly jid: string
                    readonly library_template_id?: string
                    readonly mediatype?: string
                    readonly name: 'full_catalog'
                    readonly native_flow_name?: string
                    readonly notify?: string
                    readonly offline: number
                    readonly participant?: string
                    readonly peer_recipient_lid?: string
                    readonly peer_recipient_pn?: string
                    readonly peer_recipient_username?: string
                    readonly phash?: string
                    readonly privacy_sensitive?: boolean
                    readonly push_priority: string
                    readonly recipient: string
                    readonly recipient_pn?: string
                    readonly sender_lid?: string
                    readonly sender_timestamp_ms?: number
                    readonly server_id: number
                    readonly session_type: 'pq'
                    readonly state: string
                    readonly sticker_type: 'avatar'
                    readonly sub_tag?: string
                    readonly t: number
                    readonly tag?: string
                    readonly target_chat_jid?: string
                    readonly target_chat_jid_lid?: string
                    readonly target_id: string
                    readonly target_sender_jid?: string
                    readonly thread_type: number
                    readonly to: string
                    readonly ttl?: number
                    readonly type: 'text' | 'media' | 'medianotify' | 'pay' | 'poll' | 'reaction' | 'event'
                    readonly v?: '1'
                    readonly value: string
                    readonly verified_level?: 'high' | 'low' | 'unknown'
                    readonly verified_name?: string
                }
                readonly children: {
                    readonly automated: {
                        readonly tag: 'automated'
                    }
                    readonly biz: {
                        readonly tag: 'biz'
                        readonly attrs: {
                            readonly actual_actors?: number
                            readonly campaign_id?: string
                            readonly host_storage?: number
                            readonly native_flow_name?: string
                            readonly privacy_mode_ts?: number
                        }
                        readonly children: {
                            readonly buttons: {
                                readonly tag: 'buttons'
                            } | undefined
                            readonly interactive: {
                                readonly tag: 'interactive'
                                readonly attrs: {
                                    readonly name?: string
                                    readonly type: 'native_flow'
                                    readonly v: '1'
                                }
                                readonly children: {
                                    readonly native_flow: {
                                        readonly tag: 'native_flow'
                                        readonly attrs: {
                                            readonly name?: string
                                        }
                                    } | undefined
                                }
                            } | undefined
                            readonly list: {
                                readonly tag: 'list'
                            } | undefined
                            readonly quality_control: {
                                readonly tag: 'quality_control'
                                readonly attrs: {
                                    readonly decision_id?: string
                                    readonly source_type?: string
                                }
                                readonly children: {
                                    readonly decision_source: ReadonlyArray<{
                                        readonly tag: 'decision_source'
                                        readonly attrs: {
                                            readonly value?: string
                                        }
                                    }>
                                }
                            } | undefined
                        }
                    } | undefined
                    readonly bot: {
                        readonly tag: 'bot'
                        readonly attrs: {
                            readonly agent_engagement_type?: string
                            readonly biz_bot?: '1' | '3'
                            readonly client_thread_id: string
                            readonly edit?: 'first' | 'full' | 'inner' | 'last'
                            readonly edit_target_id?: string
                            readonly is_lid?: 'true'
                            readonly local_automated_type: '1p_partial' | '3p_full' | 'unknown'
                            readonly mode_selected: string
                            readonly mode_selection: string
                            readonly persona_type?: '1p' | 'default' | 'ugc'
                            readonly sender_timestamp_ms?: string
                            readonly type?: 'command' | 'prompt' | 'voice'
                        }
                        readonly children: {
                            readonly to: {
                                readonly tag: 'to'
                                readonly attrs: {
                                    readonly count: number
                                    readonly duration: number
                                    readonly jid: string
                                    readonly mediatype: string
                                    readonly native_flow_name?: string
                                    readonly session_type: 'pq'
                                    readonly state: string
                                    readonly sticker_type: 'avatar'
                                    readonly type: string
                                }
                                readonly children: {
                                    readonly enc: {
                                        readonly tag: 'enc'
                                        readonly attrs: {
                                            readonly count: number
                                            readonly duration: number
                                            readonly mediatype: string
                                            readonly native_flow_name?: string
                                            readonly session_type: 'pq'
                                            readonly state: 'false' | 'true'
                                            readonly sticker_type: 'avatar'
                                            readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                                            readonly v: '2'
                                        }
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                        }
                    } | undefined
                    readonly capability: ReadonlyArray<{
                        readonly tag: 'capability'
                        readonly attrs: {
                            readonly name: string
                        }
                    }>
                    readonly content_binding: {
                        readonly tag: 'content_binding'
                    }
                    readonly conversion: {
                        readonly tag: 'conversion'
                        readonly attrs: {
                            readonly recipient_status: string
                        }
                    }
                    readonly 'device-identity': {
                        readonly tag: 'device-identity'
                        readonly content: Uint8Array
                    } | undefined
                    readonly enc: ReadonlyArray<{
                        readonly tag: 'enc'
                        readonly attrs: {
                            readonly count?: number
                            readonly 'decrypt-fail'?: 'hide'
                            readonly mediatype?: string
                            readonly native_flow_name?: string
                            readonly session_type?: string
                            readonly state?: 'false' | 'true'
                            readonly sticker_type: 'avatar'
                            readonly type: 'skmsg' | 'pkmsg' | 'msg' | 'msmsg'
                            readonly v: '2'
                        }
                        readonly content: Uint8Array
                    }>
                    readonly franking: {
                        readonly tag: 'franking'
                        readonly children: {
                            readonly franking_tag: {
                                readonly tag: 'franking_tag'
                            }
                        }
                    }
                    readonly hsm: {
                        readonly tag: 'hsm'
                        readonly attrs: {
                            readonly buttons?: '1'
                            readonly category?: string
                            readonly id?: string
                            readonly is_template_from_library_edited?: boolean
                            readonly library_template_id?: string
                            readonly name: 'full_catalog'
                            readonly objective?: string
                            readonly sub_tag?: string
                            readonly tag?: string
                            readonly v?: '1'
                        }
                        readonly children: {
                            readonly quality_token: {
                                readonly tag: 'quality_token'
                                readonly attrs: {
                                    readonly v?: '1'
                                }
                            }
                        }
                    } | undefined
                    readonly meta: {
                        readonly tag: 'meta'
                        readonly attrs: {
                            readonly appdata?: 'default' | 'member_tag' | 'group_history'
                            readonly capi?: boolean
                            readonly context_source?: string
                            readonly conversation_thread_id?: string
                            readonly destination_id?: string
                            readonly event_type?: 'creation' | 'edit' | 'response'
                            readonly from?: string
                            readonly group_invite: string
                            readonly is_group_status?: boolean
                            readonly is_status_mention: 'true'
                            readonly message_association_type: string
                            readonly metering_type: 'smb_mm'
                            readonly origin?: 'ctwa'
                            readonly original_msg_t: number
                            readonly peripheral: string
                            readonly polltype?: 'creation' | 'quiz_creation' | 'vote' | 'result_snapshot' | 'edit'
                            readonly questiontype: 'response'
                            readonly read?: boolean
                            readonly receiver_account_kind: string
                            readonly sender_intent?: 'hosted'
                            readonly session_scope?: 'default' | 'status'
                            readonly st?: number
                            readonly status_mentioned?: boolean
                            readonly status_setting?: string
                            readonly tag_reason?: string
                            readonly target_chat_jid?: string
                            readonly target_chat_jid_lid?: string
                            readonly target_id?: string
                            readonly target_sender_jid?: string
                            readonly thread_msg_id?: string
                            readonly thread_msg_sender_jid?: string
                            readonly type?: string
                            readonly view_once?: 'true'
                        }
                        readonly children: {
                            readonly key: {
                                readonly tag: 'key'
                                readonly attrs: {
                                    readonly rkid?: string
                                }
                                readonly content: Uint8Array
                            } | undefined
                        }
                    } | undefined
                    readonly mixed_metadata: {
                        readonly tag: 'mixed_metadata'
                        readonly children: {
                            readonly payments_metadata: {
                                readonly tag: 'payments_metadata'
                                readonly attrs: {
                                    readonly version: number
                                }
                            }
                        }
                    }
                    readonly multicast: {
                        readonly tag: 'multicast'
                    }
                    readonly native_flow: {
                        readonly tag: 'native_flow'
                        readonly attrs: {
                            readonly name: string
                            readonly v?: number
                        }
                        readonly children: {
                            readonly capability: ReadonlyArray<{
                                readonly tag: 'capability'
                                readonly attrs: {
                                    readonly name: string
                                }
                            }>
                            readonly mixed_metadata: {
                                readonly tag: 'mixed_metadata'
                                readonly children: {
                                    readonly payments_metadata: {
                                        readonly tag: 'payments_metadata'
                                        readonly attrs: {
                                            readonly version: number
                                        }
                                    }
                                }
                            }
                        }
                    }
                    readonly padding: {
                        readonly tag: 'padding'
                        readonly content: Uint8Array
                    }
                    readonly pay: {
                        readonly tag: 'pay'
                        readonly attrs: {
                            readonly receiver?: string
                            readonly 'transaction-type'?: string
                            readonly type: 'send' | 'request' | 'futureproof' | 'request-decline' | 'request-cancel' | 'invite'
                        }
                    } | undefined
                    readonly plaintext: {
                        readonly tag: 'plaintext'
                        readonly content: Uint8Array
                    } | undefined
                    readonly quality_token: {
                        readonly tag: 'quality_token'
                        readonly attrs: {
                            readonly v?: '1'
                        }
                    }
                    readonly rcat: {
                        readonly tag: 'rcat'
                        readonly content: Uint8Array
                    } | undefined
                    readonly reaction: {
                        readonly tag: 'reaction'
                        readonly attrs: {
                            readonly code: string
                        }
                    }
                    readonly reporting: {
                        readonly tag: 'reporting'
                        readonly children: {
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            } | undefined
                            readonly reporting_token: {
                                readonly tag: 'reporting_token'
                                readonly attrs: {
                                    readonly v: number
                                }
                                readonly content: Uint8Array
                            } | undefined
                        }
                    } | undefined
                    readonly request_id: {
                        readonly tag: 'request_id'
                    }
                    readonly ta_pad: {
                        readonly tag: 'ta_pad'
                    }
                    readonly tctoken: {
                        readonly tag: 'tctoken'
                        readonly attrs: {
                            readonly t?: number
                        }
                    }
                    readonly test: {
                        readonly tag: 'test'
                        readonly attrs: {
                            readonly config?: string
                        }
                    }
                    readonly to: ReadonlyArray<{
                        readonly tag: 'to'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }>
                    readonly trace: {
                        readonly tag: 'trace'
                        readonly children: {
                            readonly request_id: {
                                readonly tag: 'request_id'
                            }
                        }
                    }
                    readonly transaction: {
                        readonly tag: 'transaction'
                        readonly attrs: {
                            readonly group?: string
                            readonly 'message-id': string
                            readonly receiver: string
                            readonly sender: string
                            readonly status: string
                            readonly 'transaction-type': string
                            readonly ts: number
                        }
                    } | undefined
                    readonly unavailable: {
                        readonly tag: 'unavailable'
                        readonly attrs: {
                            readonly hosted?: boolean
                            readonly type?: 'view_once'
                        }
                    } | undefined
                    readonly url_number: {
                        readonly tag: 'url_number'
                    } | undefined
                    readonly url_text: {
                        readonly tag: 'url_text'
                    } | undefined
                    readonly verified_name: {
                        readonly tag: 'verified_name'
                        readonly content: Uint8Array
                    } | undefined
                }
            }
            }
        }
    }
    readonly notification: {
        readonly tag: 'notification'
        readonly discriminator: 'type'
        readonly variants: {
            readonly account_sync: {
                readonly handler: { readonly module: 'WAWebHandleAccountSyncNotification'; readonly method: 'handleAccountSyncNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly t: number
                    readonly type: 'account_sync'
                }
                readonly children: {
                    readonly biz_opt_out_list: {
                        readonly tag: 'biz_opt_out_list'
                        readonly attrs: {
                            readonly dhash?: string
                            readonly prev_dhash?: string
                        }
                        readonly children: {
                            readonly '*': ReadonlyArray<{
                                readonly tag: '*'
                                readonly attrs: {
                                    readonly action: string
                                    readonly biz_jid: string
                                }
                            }>
                        }
                    }
                    readonly blocklist: {
                        readonly tag: 'blocklist'
                        readonly children: {
                            readonly item: ReadonlyArray<{
                                readonly tag: 'item'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly username?: string
                                }
                            }>
                        }
                    }
                    readonly devices: {
                        readonly tag: 'devices'
                        readonly children: {
                            readonly device: ReadonlyArray<{
                                readonly tag: 'device'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly 'key-index'?: number
                                }
                            }>
                            readonly 'key-index-list': {
                                readonly tag: 'key-index-list'
                                readonly attrs: {
                                    readonly expected_ts?: number
                                    readonly ts: number
                                }
                                readonly content: Uint8Array
                            } | undefined
                        }
                    } | undefined
                    readonly disappearing_mode: {
                        readonly tag: 'disappearing_mode'
                        readonly attrs: {
                            readonly action?: string
                            readonly duration: number
                            readonly t: number
                        }
                    }
                    readonly notice: {
                        readonly tag: 'notice'
                        readonly attrs: {
                            readonly id: string
                            readonly stage?: string
                            readonly t: number
                            readonly version?: number
                        }
                    }
                    readonly picture: {
                        readonly tag: 'picture'
                        readonly attrs: {
                            readonly action?: 'modify'
                        }
                    }
                    readonly privacy: {
                        readonly tag: 'privacy'
                        readonly attrs: {
                            readonly action?: 'modify'
                        }
                        readonly children: {
                            readonly category: ReadonlyArray<{
                                readonly tag: 'category'
                                readonly attrs: {
                                    readonly action?: 'modify'
                                    readonly dhash?: string
                                    readonly name: string
                                    readonly prev_dhash?: string
                                    readonly value: string
                                }
                                readonly children: {
                                    readonly user: ReadonlyArray<{
                                        readonly tag: 'user'
                                        readonly attrs: {
                                            readonly action: string
                                            readonly jid: string
                                        }
                                    }>
                                }
                            }>
                        }
                    }
                    readonly status: {
                        readonly tag: 'status'
                        readonly attrs: {
                            readonly action?: string
                        }
                    }
                    readonly text_status: {
                        readonly tag: 'text_status'
                        readonly attrs: {
                            readonly action?: string
                            readonly ephemeral_duration_sec?: number
                            readonly last_update_time?: number
                            readonly text?: string
                        }
                        readonly children: {
                            readonly emoji: {
                                readonly tag: 'emoji'
                                readonly attrs: {
                                    readonly content?: string
                                }
                            } | undefined
                        }
                    }
                    readonly tos: {
                        readonly tag: 'tos'
                        readonly children: {
                            readonly notice: ReadonlyArray<{
                                readonly tag: 'notice'
                                readonly attrs: {
                                    readonly id: string
                                    readonly state?: string
                                }
                            }>
                        }
                    }
                    readonly user: {
                        readonly tag: 'user'
                        readonly attrs: {
                            readonly state?: 'AI available'
                        }
                    }
                }
            }
            }
            readonly business: {
                readonly handler: { readonly module: 'WAWebHandleBusinessNotification'; readonly method: 'handleBusinessNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly t: number
                    readonly type: 'business'
                }
                readonly children: {
                    readonly ctwa_suggestion: {
                        readonly tag: 'ctwa_suggestion'
                        readonly attrs: {
                            readonly target_entity_id: string
                        }
                        readonly children: {
                            readonly banner: {
                                readonly tag: 'banner'
                                readonly children: {
                                    readonly action: {
                                        readonly tag: 'action'
                                        readonly attrs: {
                                            readonly deep_link?: string
                                            readonly local_android_link?: string
                                            readonly local_link?: string
                                        }
                                    } | undefined
                                    readonly config: {
                                        readonly tag: 'config'
                                        readonly attrs: {
                                            readonly display: 'info' | 'warning'
                                            readonly expires_at: number
                                            readonly revoked: 'false' | 'true'
                                        }
                                    }
                                    readonly content: {
                                        readonly tag: 'content'
                                        readonly attrs: {
                                            readonly locale: string
                                        }
                                        readonly children: {
                                            readonly body: {
                                                readonly tag: 'body'
                                                readonly content: string
                                            }
                                            readonly heading: {
                                                readonly tag: 'heading'
                                                readonly content: string
                                            }
                                            readonly highlight: {
                                                readonly tag: 'highlight'
                                                readonly content: string
                                            }
                                            readonly localised_body: {
                                                readonly tag: 'localised_body'
                                                readonly attrs: {
                                                    readonly value: string
                                                }
                                                readonly children: {
                                                    readonly localisation_metadata: {
                                                        readonly tag: 'localisation_metadata'
                                                        readonly attrs: {
                                                            readonly translation_project: string
                                                            readonly uid: string
                                                        }
                                                        readonly children: {
                                                            readonly parameter: ReadonlyArray<{
                                                                readonly tag: 'parameter'
                                                                readonly attrs: {
                                                                    readonly name: string
                                                                    readonly value: string
                                                                }
                                                            }>
                                                        }
                                                    }
                                                }
                                            } | undefined
                                            readonly localised_heading: {
                                                readonly tag: 'localised_heading'
                                                readonly attrs: {
                                                    readonly value: string
                                                }
                                                readonly children: {
                                                    readonly localisation_metadata: {
                                                        readonly tag: 'localisation_metadata'
                                                        readonly attrs: {
                                                            readonly translation_project: string
                                                            readonly uid: string
                                                        }
                                                        readonly children: {
                                                            readonly parameter: ReadonlyArray<{
                                                                readonly tag: 'parameter'
                                                                readonly attrs: {
                                                                    readonly name: string
                                                                    readonly value: string
                                                                }
                                                            }>
                                                        }
                                                    }
                                                }
                                            } | undefined
                                            readonly localised_highlight: {
                                                readonly tag: 'localised_highlight'
                                                readonly attrs: {
                                                    readonly value: string
                                                }
                                                readonly children: {
                                                    readonly localisation_metadata: {
                                                        readonly tag: 'localisation_metadata'
                                                        readonly attrs: {
                                                            readonly translation_project: string
                                                            readonly uid: string
                                                        }
                                                        readonly children: {
                                                            readonly parameter: ReadonlyArray<{
                                                                readonly tag: 'parameter'
                                                                readonly attrs: {
                                                                    readonly name: string
                                                                    readonly value: string
                                                                }
                                                            }>
                                                        }
                                                    }
                                                }
                                            } | undefined
                                        }
                                    }
                                    readonly native_action: ReadonlyArray<{
                                        readonly tag: 'native_action'
                                        readonly attrs: {
                                            readonly local_link: string
                                            readonly min_app_version: string
                                            readonly platform: string
                                            readonly universal_link?: string
                                        }
                                    }>
                                }
                            } | undefined
                        }
                    }
                    readonly feature_flags: {
                        readonly tag: 'feature_flags'
                        readonly children: {
                            readonly feature_flag: ReadonlyArray<{
                                readonly tag: 'feature_flag'
                                readonly attrs: {
                                    readonly enabled: boolean
                                    readonly expiration_time?: number
                                    readonly limit?: number
                                    readonly name: 'ADS_CREDIT' | 'BUSINESS_BROADCAST' | 'BUSINESS_SEARCH' | 'CHAT_ASSIGNMENT' | 'CUSTOM_APP_ICON' | 'CUSTOM_APP_THEME' | 'CUSTOM_RINGTONES' | 'CUSTOM_URL' | 'ENHANCED_LISTS' | 'IMAGE_GEN' | 'IMAGINE_IMAGE' | 'IMAGINE_VIDEO' | 'MD_EXTENSION' | 'NEW_CHATS_LIMIT' | 'NEXT_GEN_WA_BENEFIT' | 'PIN_MORE_CHATS' | 'PREMIUM_MESSAGE_STICKERS' | 'PROTECTED_BUSINESS_ACCOUNT' | 'THINK_HARD' | 'VERIFIED_CHANNEL'
                                }
                            }>
                        }
                    }
                    readonly mm_campaign: {
                        readonly tag: 'mm_campaign'
                        readonly attrs: {
                            readonly ad_creative_id?: string
                            readonly ad_group_id?: string
                            readonly ad_id?: string
                            readonly status: 'INTEGRITY_NOT_CLEARED' | 'OK'
                        }
                    }
                    readonly privacy: {
                        readonly tag: 'privacy'
                        readonly children: {
                            readonly smb_data_sharing_with_meta_consent: {
                                readonly tag: 'smb_data_sharing_with_meta_consent'
                                readonly attrs: {
                                    readonly value: 'false' | 'notset' | 'true'
                                    readonly version?: number
                                }
                            }
                        }
                    }
                    readonly product_catalog: {
                        readonly tag: 'product_catalog'
                        readonly children: {
                            readonly collection: ReadonlyArray<{
                                readonly tag: 'collection'
                                readonly attrs: {
                                    readonly id: string
                                }
                                readonly children: {
                                    readonly status_info: {
                                        readonly tag: 'status_info'
                                        readonly children: {
                                            readonly commerce_url: {
                                                readonly tag: 'commerce_url'
                                                readonly content: string
                                            } | undefined
                                            readonly reject_reason: {
                                                readonly tag: 'reject_reason'
                                                readonly content: string
                                            } | undefined
                                            readonly status: {
                                                readonly tag: 'status'
                                                readonly content: 'APPROVED' | 'PENDING' | 'REJECTED'
                                            }
                                        }
                                    }
                                }
                            }>
                            readonly product: ReadonlyArray<{
                                readonly tag: 'product'
                                readonly children: {
                                    readonly id: {
                                        readonly tag: 'id'
                                        readonly content: string
                                    }
                                }
                            }>
                        }
                    } | undefined
                    readonly profile: {
                        readonly tag: 'profile'
                        readonly attrs: {
                            readonly hash?: string
                        }
                    }
                    readonly remove: {
                        readonly tag: 'remove'
                        readonly attrs: {
                            readonly hash: string
                            readonly jid?: string
                        }
                    }
                    readonly subscriptions: {
                        readonly tag: 'subscriptions'
                        readonly children: {
                            readonly subscription: ReadonlyArray<{
                                readonly tag: 'subscription'
                                readonly attrs: {
                                    readonly id: string
                                    readonly source?: 'AURA' | 'BLUE' | 'META_NOVA' | 'PREMIUM'
                                    readonly status: string
                                    readonly subscription_creation_time?: number
                                    readonly subscription_end_time?: number
                                    readonly subscription_start_time?: number
                                    readonly subscription_tier?: number
                                }
                            }>
                        }
                    }
                    readonly verified_name: {
                        readonly tag: 'verified_name'
                        readonly attrs: {
                            readonly actual_actors?: number
                            readonly hash: string
                            readonly host_storage?: number
                            readonly jid?: string
                            readonly privacy_mode_ts?: number
                            readonly serial?: string
                            readonly verified_level: 'high' | 'low' | 'unknown'
                        }
                        readonly content: Uint8Array
                    } | undefined
                    readonly wa_ad_account_nonce: {
                        readonly tag: 'wa_ad_account_nonce'
                        readonly content: string
                    }
                }
            }
            }
            readonly companion_reg_refresh: {
                readonly handler: { readonly module: 'WAWebHandleCompanionReqRefreshNotification'; readonly method: 'handleCompanionReqRefreshNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly type: 'companion_reg_refresh'
                }
                readonly children: {
                    readonly companion_reg_refresh: {
                        readonly tag: 'companion_reg_refresh'
                    } | undefined
                    readonly 'pair-device-rotate-qr': {
                        readonly tag: 'pair-device-rotate-qr'
                    } | undefined
                }
            }
            }
            readonly contacts: {
                readonly handler: { readonly module: 'WAWebHandleContactNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly t: number
                    readonly type: 'contacts'
                }
                readonly children: {
                    readonly add: {
                        readonly tag: 'add'
                        readonly content: Uint8Array
                    }
                    readonly modify: {
                        readonly tag: 'modify'
                        readonly attrs: {
                            readonly new: string
                            readonly new_lid?: string
                            readonly old: string
                            readonly old_lid?: string
                        }
                    }
                    readonly remove: {
                        readonly tag: 'remove'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }
                    readonly sync: {
                        readonly tag: 'sync'
                        readonly attrs: {
                            readonly after: number
                        }
                    }
                    readonly update: {
                        readonly tag: 'update'
                        readonly attrs: {
                            readonly hash?: string
                            readonly jid?: string
                        }
                    }
                }
            }
            }
            readonly devices: {
                readonly handler: { readonly module: 'WAWebHandleDeviceNotification'; readonly method: 'handleDevicesNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly lid?: string
                    readonly type: 'devices'
                }
                readonly children: {
                    readonly add: {
                        readonly tag: 'add'
                        readonly attrs: {
                            readonly hash: string
                        }
                    } | undefined
                    readonly remove: {
                        readonly tag: 'remove'
                        readonly attrs: {
                            readonly hash: string
                        }
                        readonly children: {
                            readonly device: {
                                readonly tag: 'device'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly 'key-index'?: number
                                    readonly lid?: string
                                }
                            }
                            readonly 'key-index-list': {
                                readonly tag: 'key-index-list'
                                readonly attrs: {
                                    readonly ts: number
                                }
                                readonly content: Uint8Array
                            } | undefined
                        }
                    }
                    readonly update: {
                        readonly tag: 'update'
                        readonly attrs: {
                            readonly hash: string
                        }
                    } | undefined
                }
            }
            }
            readonly digital_commerce_subscription: {
                readonly handler: { readonly module: 'WAWebHandleDigitalCommerceSubscriptionNotification'; readonly method: 'handleDigitalCommerceSubscriptionNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly type: 'digital_commerce_subscription'
                }
                readonly children: {
                    readonly feature_flags: {
                        readonly tag: 'feature_flags'
                        readonly children: {
                            readonly feature_flag: ReadonlyArray<{
                                readonly tag: 'feature_flag'
                                readonly attrs: {
                                    readonly enabled: boolean
                                    readonly expiration_time?: number
                                    readonly limit?: number
                                    readonly name: 'ADS_CREDIT' | 'BUSINESS_BROADCAST' | 'BUSINESS_SEARCH' | 'CHAT_ASSIGNMENT' | 'CUSTOM_APP_ICON' | 'CUSTOM_APP_THEME' | 'CUSTOM_RINGTONES' | 'CUSTOM_URL' | 'ENHANCED_LISTS' | 'IMAGE_GEN' | 'IMAGINE_IMAGE' | 'IMAGINE_VIDEO' | 'MD_EXTENSION' | 'NEW_CHATS_LIMIT' | 'NEXT_GEN_WA_BENEFIT' | 'PIN_MORE_CHATS' | 'PREMIUM_MESSAGE_STICKERS' | 'PROTECTED_BUSINESS_ACCOUNT' | 'THINK_HARD' | 'VERIFIED_CHANNEL'
                                }
                            }>
                        }
                    }
                    readonly subscriptions: {
                        readonly tag: 'subscriptions'
                        readonly children: {
                            readonly subscription: ReadonlyArray<{
                                readonly tag: 'subscription'
                                readonly attrs: {
                                    readonly id: string
                                    readonly source?: 'AURA' | 'BLUE' | 'META_NOVA' | 'PREMIUM'
                                    readonly status: string
                                    readonly subscription_creation_time?: number
                                    readonly subscription_end_time?: number
                                    readonly subscription_start_time?: number
                                    readonly subscription_tier?: number
                                }
                            }>
                        }
                    }
                }
            }
            }
            readonly disappearing_mode: {
                readonly handler: { readonly module: 'WAWebHandleDisappearingModeNotification'; readonly method: 'handleDisappearingModeNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly type: 'disappearing_mode'
                }
                readonly children: {
                    readonly disappearing_mode: {
                        readonly tag: 'disappearing_mode'
                        readonly attrs: {
                            readonly duration: number
                            readonly t: number
                        }
                    }
                }
            }
            }
            readonly encrypt: {
                readonly handler: { readonly module: 'WAWebHandlePreKeyLow'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly type: 'encrypt'
                }
                readonly children: {
                    readonly count: {
                        readonly tag: 'count'
                        readonly attrs: {
                            readonly value?: number
                        }
                    }
                    readonly pq_count: {
                        readonly tag: 'pq_count'
                        readonly attrs: {
                            readonly value?: number
                        }
                    }
                }
            }
            }
            readonly 'encrypt/digest': {
                readonly handler: { readonly module: 'WAWebHandleDigestKey'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly type: 'encrypt'
                }
                readonly children: {
                    readonly digest: {
                        readonly tag: 'digest'
                    }
                }
            }
            }
            readonly 'encrypt/identity': {
                readonly handler: { readonly module: 'WAWebHandleIdentityChange'; readonly method: 'handleE2eIdentityChange' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly display_name?: string
                    readonly from: string
                    readonly id: string
                    readonly lid?: string
                    readonly offline?: number
                    readonly type: 'encrypt'
                }
                readonly children: {
                    readonly identity: {
                        readonly tag: 'identity'
                    }
                }
            }
            }
            readonly 'encrypt/pq_count': {
                readonly handler: { readonly module: 'WAWebHandlePreKeyLow'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly type: 'encrypt'
                }
                readonly children: {
                    readonly count: {
                        readonly tag: 'count'
                    } | undefined
                    readonly pq_count: {
                        readonly tag: 'pq_count'
                    } | undefined
                }
            }
            }
            readonly 'fb:update': {
                readonly handler: { readonly module: 'WAWebHandleBotProfileNotification'; readonly method: 'handleBotProfileNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from?: string
                    readonly id?: string
                    readonly type: 'fb:update'
                }
                readonly children: {
                    readonly update: ReadonlyArray<{
                        readonly tag: 'update'
                        readonly attrs: {
                            readonly category?: string
                            readonly jid?: string
                        }
                    }>
                }
            }
            }
            readonly hosted: {
                readonly handler: { readonly module: 'WAWebHandleHostedNotification'; readonly method: 'handleHostedNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'hosted'
                }
            }
            }
            readonly link_code_companion_reg: {
                readonly handler: { readonly module: 'WAWebAltDeviceLinkingHandleNotification'; readonly method: 'handleAltDeviceLinkingNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'link_code_companion_reg'
                }
            }
            }
            readonly mediaretry: {
                readonly handler: { readonly module: 'WAWebHandleMediaRetryNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly participant?: string
                    readonly type: 'mediaretry'
                }
                readonly children: {
                    readonly encrypt: {
                        readonly tag: 'encrypt'
                        readonly children: {
                            readonly enc_iv: {
                                readonly tag: 'enc_iv'
                                readonly content: Uint8Array
                            }
                            readonly enc_p: {
                                readonly tag: 'enc_p'
                                readonly content: Uint8Array
                            }
                        }
                    }
                    readonly error: {
                        readonly tag: 'error'
                        readonly attrs: {
                            readonly code: number
                        }
                    } | undefined
                }
            }
            }
            readonly mex: {
                readonly handler: { readonly module: 'WAWebHandleMexNotification'; readonly method: 'handleMexNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly offline?: number
                    readonly type: 'mex'
                }
                readonly children: {
                    readonly update: {
                        readonly tag: 'update'
                        readonly attrs: {
                            readonly op_name: string
                        }
                        readonly content: string
                    }
                }
            }
            }
            readonly newsletter: {
                readonly handler: { readonly module: 'WAWebHandleNewsletterNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly offline?: number
                    readonly t: number
                    readonly type: 'newsletter'
                }
                readonly children: {
                    readonly live_updates: {
                        readonly tag: 'live_updates'
                        readonly children: {
                            readonly messages: {
                                readonly tag: 'messages'
                                readonly attrs: {
                                    readonly jid?: string
                                    readonly t?: number
                                }
                                readonly children: {
                                    readonly message: ReadonlyArray<{
                                        readonly tag: 'message'
                                        readonly attrs: {
                                            readonly edit?: '3'
                                            readonly id?: string
                                            readonly is_sender?: 'true'
                                            readonly server_id: number
                                            readonly t?: number
                                            readonly type?: 'text'
                                        }
                                        readonly children: {
                                            readonly forwards_count: {
                                                readonly tag: 'forwards_count'
                                                readonly attrs: {
                                                    readonly count: number
                                                }
                                            }
                                            readonly meta: {
                                                readonly tag: 'meta'
                                                readonly attrs: {
                                                    readonly original_msg_t: number
                                                }
                                            }
                                            readonly plaintext: {
                                                readonly tag: 'plaintext'
                                                readonly content: Uint8Array
                                            }
                                            readonly rcat: {
                                                readonly tag: 'rcat'
                                                readonly content: Uint8Array
                                            }
                                            readonly reactions: {
                                                readonly tag: 'reactions'
                                                readonly children: {
                                                    readonly reaction: ReadonlyArray<{
                                                        readonly tag: 'reaction'
                                                        readonly attrs: {
                                                            readonly code: string
                                                            readonly count: number
                                                        }
                                                    }>
                                                }
                                            }
                                            readonly responses_count: {
                                                readonly tag: 'responses_count'
                                                readonly attrs: {
                                                    readonly count: number
                                                }
                                            }
                                            readonly views_count: ReadonlyArray<{
                                                readonly tag: 'views_count'
                                                readonly attrs: {
                                                    readonly count: number
                                                    readonly type?: 'views'
                                                }
                                            }>
                                            readonly votes: {
                                                readonly tag: 'votes'
                                                readonly children: {
                                                    readonly vote: ReadonlyArray<{
                                                        readonly tag: 'vote'
                                                        readonly attrs: {
                                                            readonly count: number
                                                        }
                                                        readonly content: Uint8Array
                                                    }>
                                                }
                                            }
                                        }
                                    }>
                                }
                            }
                        }
                    }
                }
            }
            }
            readonly pay: {
                readonly handler: { readonly module: 'WAWebPaymentNotificationHandler'; readonly method: 'handlePaymentNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly t: number
                    readonly type: 'pay'
                }
                readonly children: {
                    readonly invite: {
                        readonly tag: 'invite'
                        readonly attrs: {
                            readonly 'invite-used'?: '0' | '1'
                            readonly service?: string
                            readonly type?: string
                        }
                    }
                    readonly transaction: {
                        readonly tag: 'transaction'
                    } | undefined
                }
            }
            }
            readonly picture: {
                readonly handler: { readonly module: 'WAWebHandleProfilePicNotification'; readonly method: 'handleProfilePicNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly t: number
                    readonly type: 'picture'
                }
                readonly children: {
                    readonly delete: {
                        readonly tag: 'delete'
                        readonly attrs: {
                            readonly author?: string
                            readonly hash: string
                            readonly id: number
                            readonly jid: string
                        }
                    }
                    readonly request: {
                        readonly tag: 'request'
                        readonly attrs: {
                            readonly author?: string
                            readonly hash: string
                            readonly id: number
                            readonly jid: string
                        }
                    } | undefined
                    readonly set: {
                        readonly tag: 'set'
                        readonly attrs: {
                            readonly author?: string
                            readonly hash: string
                            readonly id: number
                            readonly jid: string
                        }
                    } | undefined
                    readonly set_avatar: {
                        readonly tag: 'set_avatar'
                        readonly attrs: {
                            readonly author?: string
                            readonly hash: string
                            readonly id: number
                            readonly jid: string
                        }
                    } | undefined
                }
            }
            }
            readonly privacy_token: {
                readonly handler: { readonly module: 'WAWebHandlePrivacyTokensNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly sender_lid?: string
                    readonly type: 'privacy_token'
                }
                readonly children: {
                    readonly tokens: {
                        readonly tag: 'tokens'
                        readonly children: {
                            readonly token: ReadonlyArray<{
                                readonly tag: 'token'
                                readonly attrs: {
                                    readonly t: number
                                    readonly type: string
                                }
                                readonly content: Uint8Array
                            }>
                        }
                    }
                }
            }
            }
            readonly psa: {
                readonly handler: { readonly module: 'WAWebHandleQPSurfacesNotification'; readonly method: 'handleQPSurfacesNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly offline?: number
                    readonly t: number
                    readonly type: 'psa'
                }
                readonly children: {
                    readonly surfaces: {
                        readonly tag: 'surfaces'
                        readonly children: {
                            readonly surface: ReadonlyArray<{
                                readonly tag: 'surface'
                                readonly attrs: {
                                    readonly id: string
                                }
                                readonly children: {
                                    readonly promotion: ReadonlyArray<{
                                        readonly tag: 'promotion'
                                        readonly attrs: {
                                            readonly id: string
                                            readonly instance_id?: string
                                        }
                                        readonly children: {
                                            readonly colors: {
                                                readonly tag: 'colors'
                                                readonly children: {
                                                    readonly dark: {
                                                        readonly tag: 'dark'
                                                        readonly attrs: {
                                                            readonly background?: string
                                                            readonly highlight?: string
                                                        }
                                                    }
                                                    readonly light: {
                                                        readonly tag: 'light'
                                                        readonly attrs: {
                                                            readonly background?: string
                                                            readonly highlight?: string
                                                        }
                                                    }
                                                }
                                            } | undefined
                                            readonly content_attributes: {
                                                readonly tag: 'content_attributes'
                                                readonly children: {
                                                    readonly attribute: ReadonlyArray<{
                                                        readonly tag: 'attribute'
                                                        readonly attrs: {
                                                            readonly key: string
                                                            readonly value: string
                                                        }
                                                    }>
                                                }
                                            } | undefined
                                            readonly header: {
                                                readonly tag: 'header'
                                                readonly attrs: {
                                                    readonly title: string
                                                }
                                            } | undefined
                                            readonly image: {
                                                readonly tag: 'image'
                                                readonly attrs: {
                                                    readonly description: string
                                                }
                                                readonly children: {
                                                    readonly dark: {
                                                        readonly tag: 'dark'
                                                        readonly content: Uint8Array
                                                    } | undefined
                                                    readonly light: {
                                                        readonly tag: 'light'
                                                        readonly content: Uint8Array
                                                    } | undefined
                                                }
                                            } | undefined
                                            readonly primary_action: {
                                                readonly tag: 'primary_action'
                                                readonly attrs: {
                                                    readonly deep_link?: string
                                                    readonly text: string
                                                    readonly universal_link?: string
                                                }
                                            } | undefined
                                            readonly qp_config: {
                                                readonly tag: 'qp_config'
                                                readonly attrs: {
                                                    readonly deterministic: 'false' | 'true'
                                                    readonly dismissable: 'false' | 'true'
                                                    readonly eligibility_duration_ms: number
                                                    readonly end_time_seconds: number
                                                    readonly experiment_key?: string
                                                    readonly exposure_holdout: 'false' | 'true'
                                                    readonly force_pass: 'false' | 'true'
                                                    readonly impression_cooldown: number
                                                    readonly log_eligibility_waterfall: 'false' | 'true'
                                                    readonly max_impressions: number
                                                    readonly priority: number
                                                    readonly start_time_seconds: number
                                                    readonly surface_delay_time_seconds: number
                                                    readonly template_name: string
                                                    readonly ttl_seconds: number
                                                }
                                                readonly children: {
                                                    readonly filter_rules: {
                                                        readonly tag: 'filter_rules'
                                                        readonly content: Uint8Array
                                                    } | undefined
                                                    readonly instance_log_data: {
                                                        readonly tag: 'instance_log_data'
                                                        readonly content: Uint8Array
                                                    } | undefined
                                                    readonly pacing: {
                                                        readonly tag: 'pacing'
                                                        readonly children: {
                                                            readonly promotion_config: {
                                                                readonly tag: 'promotion_config'
                                                                readonly attrs: {
                                                                    readonly max_dismisses: number
                                                                    readonly max_impressions: number
                                                                    readonly max_primary_clicks: number
                                                                    readonly max_secondary_clicks: number
                                                                }
                                                            } | undefined
                                                            readonly user_info: {
                                                                readonly tag: 'user_info'
                                                                readonly attrs: {
                                                                    readonly dismiss_click_count: number
                                                                    readonly impression_count: number
                                                                    readonly primary_click_count: number
                                                                    readonly secondary_click_count: number
                                                                }
                                                            } | undefined
                                                        }
                                                    } | undefined
                                                    readonly triggers: {
                                                        readonly tag: 'triggers'
                                                        readonly children: {
                                                            readonly trigger: ReadonlyArray<{
                                                                readonly tag: 'trigger'
                                                                readonly attrs: {
                                                                    readonly name: string
                                                                }
                                                            }>
                                                        }
                                                    }
                                                }
                                            }
                                            readonly secondary_action: {
                                                readonly tag: 'secondary_action'
                                                readonly attrs: {
                                                    readonly deep_link?: string
                                                    readonly text: string
                                                    readonly universal_link?: string
                                                }
                                            } | undefined
                                            readonly text: {
                                                readonly tag: 'text'
                                                readonly content: string
                                            }
                                            readonly title: {
                                                readonly tag: 'title'
                                                readonly content: string
                                            }
                                        }
                                    }>
                                }
                            }>
                        }
                    }
                }
            }
            }
            readonly 'psa/reset_smb_last_qp_prefetch_timestamp': {
                readonly handler: { readonly module: 'WAWebHandleQPPrefetchTimestampNotification'; readonly method: 'handleQPPrefetchTimestampNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly offline?: number
                    readonly t: number
                    readonly type: 'psa'
                }
            }
            }
            readonly registration: {
                readonly handler: { readonly module: 'WAWebHandleDeviceSwitchingNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly type: 'registration'
                }
                readonly children: {
                    readonly wa_old_registration: {
                        readonly tag: 'wa_old_registration'
                        readonly attrs: {
                            readonly code: string
                            readonly device_id: string
                            readonly expiry_t: number
                            readonly ts: number
                        }
                    }
                }
            }
            }
            readonly server: {
                readonly handler: { readonly module: 'WAWebHandleServerNotification'; readonly method: 'handleServerNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly type: 'server'
                }
                readonly children: {
                    readonly abprops: {
                        readonly tag: 'abprops'
                        readonly attrs: {
                            readonly protocol: number
                        }
                    }
                    readonly log: {
                        readonly tag: 'log'
                        readonly attrs: {
                            readonly bug_id?: string
                            readonly is_bug_reporter?: boolean
                        }
                    }
                }
            }
            }
            readonly server_sync: {
                readonly handler: { readonly module: 'WAWebHandleServerSyncNotification'; readonly method: 'handleServerSyncNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly offline?: number
                    readonly type: 'server_sync'
                }
                readonly children: {
                    readonly collection: ReadonlyArray<{
                        readonly tag: 'collection'
                        readonly attrs: {
                            readonly name: string
                            readonly version: number
                        }
                    }>
                }
            }
            }
            readonly status: {
                readonly handler: { readonly module: 'WAWebHandleAboutNotification'; readonly method: 'handleAboutNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly notify: string
                    readonly t: number
                    readonly type: 'status'
                }
                readonly children: {
                    readonly set: {
                        readonly tag: 'set'
                        readonly attrs: {
                            readonly hash?: string
                        }
                        readonly content: string
                    } | undefined
                }
            }
            }
            readonly 'w:gp2': {
                readonly handler: { readonly module: 'WAWebHandleGroupNotification'; readonly method: 'handleGroupNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: 'g.us'
                    readonly id: string
                    readonly offline?: number
                    readonly t: number
                    readonly type: 'w:gp2'
                }
                readonly children: {
                    readonly groups_dirty: {
                        readonly tag: 'groups_dirty'
                        readonly children: {
                            readonly group: ReadonlyArray<{
                                readonly tag: 'group'
                                readonly attrs: {
                                    readonly jid: string
                                }
                            }>
                        }
                    }
                }
            }
            }
            readonly 'w:growth': {
                readonly handler: { readonly module: 'WAWebHandleGrowthNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly type: 'contacts' | 'w:growth'
                }
                readonly children: {
                    readonly invite: {
                        readonly tag: 'invite'
                        readonly children: {
                            readonly receiver: {
                                readonly tag: 'receiver'
                                readonly attrs: {
                                    readonly reason?: string
                                    readonly user?: string
                                }
                            }
                        }
                    }
                }
            }
            }
            readonly waffle: {
                readonly handler: { readonly module: 'WAWebAccountLinkingNotificationHandler'; readonly method: 'handleAccountLinkingNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: 's.whatsapp.net'
                    readonly id: string
                    readonly offline?: number
                    readonly t: number
                    readonly type: 'waffle'
                }
                readonly children: {
                    readonly notification_metadata: {
                        readonly tag: 'notification_metadata'
                        readonly attrs: {
                            readonly client_resync?: 'false' | 'true'
                            readonly event: number
                            readonly npr?: 'false' | 'true'
                            readonly show_user_notif?: 'false' | 'true'
                            readonly sync_delay?: number
                            readonly type?: number
                        }
                    }
                }
            }
            }
        }
    }
    readonly presence: {
        readonly tag: 'presence'
        readonly handler: { readonly module: 'WAWebHandlePresence'; readonly method: 'default' }
        readonly node: {
            readonly tag: 'presence'
            readonly attrs: {
                readonly context?: string
                readonly count?: number
                readonly from?: string
                readonly last?: 'deny' | 'error' | 'none'
                readonly name?: string
                readonly to: string
                readonly type: 'unavailable' | 'subscribe'
            }
            readonly children: {
                readonly tctoken: {
                    readonly tag: 'tctoken'
                    readonly attrs: {
                        readonly t?: number
                    }
                }
            }
        }
    }
    readonly receipt: {
        readonly tag: 'receipt'
        readonly discriminator: 'condition'
        readonly variants: {
            readonly WAWebHandleMessageRetryRequest: {
                readonly handler: { readonly module: 'WAWebHandleMessageRetryRequest'; readonly method: 'handleMessageRetryRequest' }
                readonly node: {
                readonly tag: 'receipt'
                readonly attrs: {
                    readonly category: string
                    readonly class?: 'call' | 'message' | 'notification' | 'receipt' | 'status'
                    readonly client_thread_id: string
                    readonly conversation_thread_id: string
                    readonly from: string
                    readonly id: string
                    readonly is_lid?: boolean
                    readonly offline?: number
                    readonly participant?: string
                    readonly peer_participant_pn?: string
                    readonly privacy_token: 'false'
                    readonly recipient?: string
                    readonly server_id: number
                    readonly sts?: string
                    readonly t: number
                    readonly to: string
                    readonly type: 'delivery' | 'inactive' | 'peer_msg' | 'played' | 'played-self' | 'read' | 'read-self' | 'sender' | 'server-error' | 'view'
                }
                readonly children: {
                    readonly biz: {
                        readonly tag: 'biz'
                        readonly children: {
                            readonly original_envelope: {
                                readonly tag: 'original_envelope'
                            }
                        }
                    } | undefined
                    readonly bot: {
                        readonly tag: 'bot'
                        readonly attrs: {
                            readonly client_thread_id: string
                            readonly conversation_thread_id: string
                        }
                    }
                    readonly keys: {
                        readonly tag: 'keys'
                        readonly children: {
                            readonly 'device-identity': {
                                readonly tag: 'device-identity'
                                readonly content: Uint8Array
                            } | undefined
                            readonly identity: {
                                readonly tag: 'identity'
                                readonly content: Uint8Array
                            }
                            readonly key: {
                                readonly tag: 'key'
                                readonly children: {
                                    readonly id: {
                                        readonly tag: 'id'
                                        readonly content: number
                                    }
                                    readonly value: {
                                        readonly tag: 'value'
                                        readonly content: Uint8Array
                                    }
                                }
                            } | undefined
                            readonly pq: {
                                readonly tag: 'pq'
                            } | undefined
                            readonly pqkey: {
                                readonly tag: 'pqkey'
                            } | undefined
                            readonly skey: {
                                readonly tag: 'skey'
                                readonly children: {
                                    readonly id: {
                                        readonly tag: 'id'
                                        readonly content: number
                                    }
                                    readonly signature: {
                                        readonly tag: 'signature'
                                        readonly content: Uint8Array
                                    }
                                    readonly value: {
                                        readonly tag: 'value'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                        }
                    } | undefined
                    readonly registration: {
                        readonly tag: 'registration'
                        readonly content: number
                    }
                    readonly retry: {
                        readonly tag: 'retry'
                        readonly attrs: {
                            readonly count?: number
                            readonly error?: number
                            readonly id: string
                            readonly t: number
                            readonly v: '1'
                        }
                    }
                }
            }
            }
            readonly 'is-not-call-receipt': {
                readonly handler: { readonly module: 'WAWebHandleMsgReceipt'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'receipt'
                readonly attrs: {
                    readonly category: string
                    readonly class?: 'call' | 'message' | 'notification' | 'receipt' | 'status'
                    readonly client_thread_id: string
                    readonly conversation_thread_id: string
                    readonly from: string
                    readonly id: string
                    readonly is_lid?: boolean
                    readonly offline?: number
                    readonly participant?: string
                    readonly participant_pn?: string
                    readonly participant_username?: string
                    readonly peer_participant_pn?: string
                    readonly privacy_token: 'false'
                    readonly recipient?: string
                    readonly server_id: number
                    readonly sts?: string
                    readonly t: number
                    readonly to: string
                    readonly type?: 'delivery' | 'inactive' | 'peer_msg' | 'played' | 'played-self' | 'read' | 'read-self' | 'sender' | 'server-error' | 'view'
                }
                readonly children: {
                    readonly biz: {
                        readonly tag: 'biz'
                        readonly attrs: {
                            readonly actual_actors?: number
                            readonly host_storage?: number
                            readonly privacy_mode_ts?: number
                        }
                        readonly children: {
                            readonly original_envelope: {
                                readonly tag: 'original_envelope'
                            }
                        }
                    }
                    readonly bot: {
                        readonly tag: 'bot'
                        readonly attrs: {
                            readonly client_thread_id: string
                            readonly conversation_thread_id: string
                        }
                    }
                    readonly error: {
                        readonly tag: 'error'
                        readonly attrs: {
                            readonly reason?: 'lid'
                            readonly type: string
                        }
                    } | undefined
                    readonly list: {
                        readonly tag: 'list'
                        readonly children: {
                            readonly item: ReadonlyArray<{
                                readonly tag: 'item'
                                readonly attrs: {
                                    readonly id: string
                                    readonly server_id: string
                                }
                            }>
                        }
                    }
                    readonly participants: {
                        readonly tag: 'participants'
                        readonly attrs: {
                            readonly key: string
                            readonly message_id?: string
                        }
                        readonly children: {
                            readonly user: ReadonlyArray<{
                                readonly tag: 'user'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly participant_pn?: string
                                    readonly participant_username?: string
                                    readonly t: number
                                    readonly type?: string
                                }
                            }>
                        }
                    } | undefined
                }
            }
            }
        }
    }
    readonly status: {
        readonly tag: 'status'
        readonly handler: { readonly module: 'WAWebHandleNewsletterStatus'; readonly method: 'default' }
        readonly node: {
            readonly tag: 'status'
            readonly attrs: {
                readonly bucket: string
                readonly bucketing: string
                readonly count: number
                readonly 'decrypt-fail': 'hide'
                readonly device_fanout: 'false'
                readonly edit: '8' | '1' | '7'
                readonly from: string
                readonly id: string
                readonly is_sender?: 'true'
                readonly jid: string
                readonly mediatype: string
                readonly native_flow_name?: string
                readonly offline: number
                readonly participant: string
                readonly phash: string
                readonly server_id: number
                readonly session_type: 'pq'
                readonly state: string
                readonly sticker_type: 'avatar'
                readonly t: number
                readonly to: 'status@broadcast'
                readonly type: 'text' | 'media' | 'reaction'
            }
            readonly children: {
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly mediatype: string
                        readonly sticker_type?: 'avatar'
                    }
                }
                readonly meta: {
                    readonly tag: 'meta'
                    readonly attrs: {
                        readonly content_type: string
                        readonly interaction_type: 'question_response'
                        readonly is_status_mention: 'true'
                        readonly message_association_type: string
                        readonly response_server_id?: string
                        readonly session_scope: 'status'
                        readonly status_h: string
                        readonly status_ots?: number
                        readonly status_setting: string
                    }
                }
                readonly plaintext: {
                    readonly tag: 'plaintext'
                    readonly content: Uint8Array
                }
                readonly reaction: {
                    readonly tag: 'reaction'
                    readonly attrs: {
                        readonly code: string
                    }
                }
                readonly reporting: {
                    readonly tag: 'reporting'
                    readonly children: {
                        readonly reporting_token: {
                            readonly tag: 'reporting_token'
                            readonly attrs: {
                                readonly v?: number
                            }
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly reporting_tag: {
                    readonly tag: 'reporting_tag'
                    readonly content: Uint8Array
                }
                readonly reporting_token: {
                    readonly tag: 'reporting_token'
                    readonly attrs: {
                        readonly v?: number
                    }
                    readonly content: Uint8Array
                }
                readonly ta_pad: {
                    readonly tag: 'ta_pad'
                }
                readonly tctoken: {
                    readonly tag: 'tctoken'
                }
            }
        }
    }
    readonly 'stream:error': {
        readonly tag: 'stream:error'
        readonly handler: { readonly module: 'WAWebHandleStreamError'; readonly method: 'default' }
        readonly node: {
            readonly tag: 'stream:error'
            readonly attrs: {
                readonly code?: string
            }
            readonly children: {
                readonly ack: {
                    readonly tag: 'ack'
                    readonly attrs: {
                        readonly id?: string
                    }
                } | undefined
                readonly conflict: {
                    readonly tag: 'conflict'
                    readonly attrs: {
                        readonly type: string
                    }
                }
                readonly 'xml-not-well-formed': {
                    readonly tag: 'xml-not-well-formed'
                } | undefined
            }
        }
    }
    readonly success: {
        readonly tag: 'success'
        readonly handler: { readonly module: 'WAWebHandleSuccess'; readonly method: 'default' }
        readonly node: {
            readonly tag: 'success'
            readonly attrs: {
                readonly abprops: string
                readonly creation: string
                readonly display_name: string
                readonly props: string
                readonly t: number
            }
        }
    }
    readonly xmlstreamend: {
        readonly tag: 'xmlstreamend'
        readonly handler: null
        readonly node: unknown
    }
}

export declare const WA_XML_STANZAS: WaXmlStanzas
