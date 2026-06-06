// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: 2.3000.1040971408

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

export type WaXmlOperationKey = 'AcceptGroupAdd' | 'AcknowledgeGroup' | 'ActiveIQ' | 'AddParticipants' | 'Availability' | 'BannerSuggestion' | 'Batch' | 'BatchGetGroupInfo' | 'BotList' | 'CampaignStateChangedNotification' | 'CancelGroupMembershipRequests' | 'ChatBlockGet' | 'ChatBlockSet' | 'Client' | 'ClientExpiration' | 'ClientNotification' | 'CompanionFinish' | 'CompanionHello' | 'ContactForm' | 'Create' | 'CreateCustomPaymentMethod' | 'CreateSubGroupSuggestion' | 'DeleteParentGroup' | 'DeliverNewsletter' | 'EncryptedPayloadRequest' | 'Event' | 'FetchKeyBundles' | 'FetchMissingPreKeys' | 'ForceDeleteState' | 'ForceSuspendState' | 'GenerateAccessTokens' | 'GenerateWAEntACUser' | 'Get' | 'GetAccessTokenAndSessionCookies' | 'GetAccountNonce' | 'GetBlockList' | 'GetBusinessEligibility' | 'GetCertificate' | 'GetContactBlacklist' | 'GetCountryCode' | 'GetDisclosureStageByIds' | 'GetDisclosures' | 'GetExperimentConfig' | 'GetGroupExperimentConfig' | 'GetGroupInfo' | 'GetGroupProfilePictures' | 'GetInviteGroupInfo' | 'GetLinkedAccounts' | 'GetLinkedGroup' | 'GetLinkedGroupsParticipants' | 'GetMembershipApprovalRequests' | 'GetNewsletterMessageUpdates' | 'GetNewsletterMessages' | 'GetNewsletterResponses' | 'GetNewsletterStatusUpdates' | 'GetNewsletterStatuses' | 'GetOptOutList' | 'GetParticipatingGroups' | 'GetPasskeyRequestOptions' | 'GetPrivacySetting' | 'GetRef' | 'GetReportedMessages' | 'GetSMBMeteredMessagingCheckout' | 'GroupReport' | 'GroupsDirtyNotification' | 'IncomingNewsletterStatus' | 'IndividualReport' | 'JoinLinkedGroup' | 'LinkCreate' | 'LinkQuery' | 'LinkSubGroups' | 'LiveUpdatesNotification' | 'MembershipRequestsAction' | 'MyAddOns' | 'NewsletterReport' | 'NonceNotification' | 'OffboardingNotification' | 'OnboardingStatusNotification' | 'OutSet' | 'PassiveIQ' | 'PasskeyPrologueRequestNotification' | 'PostNewsletterStatus' | 'PrimaryHelloNotifyCompanion' | 'PromoteDemote' | 'PromoteDemoteAdmin' | 'PublishNewsletter' | 'PublishView' | 'QPNotification' | 'RefreshAccessTokens' | 'RefreshCodeNotifyCompanion' | 'RemoveParticipants' | 'ReportBug' | 'ReportMessages' | 'RequestSilentNonce' | 'ResetSmbLastQpPrefetchTimestamp' | 'RevokeRequestCode' | 'SendAccountRecoveryNonce' | 'SendBuffer' | 'SendFeedback' | 'ServerNotification' | 'ServerUpdate' | 'Set' | 'SetCompanionNonce' | 'SetDescription' | 'SetEncryptedPairingRequest' | 'SetPasskeyPrologue' | 'SetPaymentsTOSv3' | 'SetPrimaryEphemeralIdentityNotification' | 'SetPrivacySetting' | 'SetProperty' | 'SetReg' | 'SetResult' | 'SetSubject' | 'SetToCompanion' | 'Share' | 'SignCredential' | 'StateExists' | 'StatusReport' | 'StatusReportV2' | 'SubGroupSuggestionsAction' | 'Subscribe' | 'SubscribeToLiveUpdates' | 'SyncPrivacySetting' | 'UnlinkGroups' | 'UpdateBlockList' | 'UpdateOptOutList' | 'UpdatePreference' | 'UploadAdMedia' | 'WFPing' | 'WaitingRoomToggleCallLink'

// Per-operation request/response shape literals — generated from the static
// extraction over WASmaxOut*Request + WASmaxIn*Response* modules. Each
// response member of the union represents one of the parser variants the
// client tries in order; the `variant` discriminator tells you which one
// claimed the response.
export interface WaXmlOperations {
    readonly AcceptGroupAdd: {
        readonly module: 'WASmaxGroupsAcceptGroupAddRPC'
        readonly opName: 'AcceptGroupAdd'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly accept: {
                readonly tag: 'accept'
                readonly attrs: {
                    readonly code: string
                    readonly expiration: number
                    readonly admin: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'already-exists'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'GroupJoinRequestSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly AcknowledgeGroup: {
        readonly module: 'WASmaxGroupsAcknowledgeGroupRPC'
        readonly opName: 'AcknowledgeGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'item-not-found'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
        } }
    }
    readonly ActiveIQ: {
        readonly module: 'WASmaxPassiveModeActiveIQRPC'
        readonly opName: 'ActiveIQ'
        readonly xmlns: 'passive'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'set'
            readonly xmlns: 'passive'
            readonly to: 's.whatsapp.net'
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
                readonly id: string
                readonly type: 'result'
                readonly from: 's.whatsapp.net'
            }
        } }
    }
    readonly AddParticipants: {
        readonly module: 'WASmaxGroupsAddParticipantsRPC'
        readonly opName: 'AddParticipants'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                    readonly children: {
                        readonly rate_limit: {
                            readonly tag: 'rate_limit'
                            readonly attrs: {
                                readonly backoff?: number
                                readonly type?: 'group' | 'user'
                                readonly participant_limit?: number
                            }
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly add: {
                    readonly tag: 'add'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid?: string
                                readonly phone_number?: string
                                readonly username?: string
                                readonly error?: '421'
                                readonly addressable?: 'false'
                            }
                            readonly children: {
                                readonly membership_approval_request: {
                                    readonly tag: 'membership_approval_request'
                                    readonly attrs: {
                                        readonly error?: '304' | '419'
                                    }
                                }
                                readonly add_request: {
                                    readonly tag: 'add_request'
                                    readonly attrs: {
                                        readonly code: string
                                        readonly expiration: number
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly Availability: {
        readonly module: 'WASmaxPresenceAvailabilityRPC'
        readonly opName: 'Availability'
        readonly xmlns: null
        readonly type: null
        readonly request: {
        readonly tag: 'presence'
        readonly attrs: {
            readonly type?: 'available' | 'subscribe' | 'unavailable' | 'unsubscribe'
            readonly name?: string
        }
    }
        readonly response:
        | never
    }
    readonly BannerSuggestion: {
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
                readonly to?: string
                readonly type: 'business'
                readonly t: number
                readonly id: string
                readonly offline?: number
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
                                        readonly local_link?: string
                                        readonly local_android_link?: string
                                    }
                                } | undefined
                                readonly native_action: ReadonlyArray<{
                                    readonly tag: 'native_action'
                                    readonly attrs: {
                                        readonly platform: string
                                        readonly min_app_version: string
                                        readonly local_link: string
                                        readonly universal_link?: string
                                    }
                                }>
                                readonly content: {
                                    readonly tag: 'content'
                                    readonly attrs: {
                                        readonly locale: string
                                    }
                                    readonly children: {
                                        readonly localised_heading: {
                                            readonly tag: 'localised_heading'
                                            readonly attrs: {
                                                readonly value: string
                                            }
                                            readonly children: {
                                                readonly localisation_metadata: {
                                                    readonly tag: 'localisation_metadata'
                                                    readonly attrs: {
                                                        readonly uid: string
                                                        readonly translation_project: string
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
                                        readonly localised_body: {
                                            readonly tag: 'localised_body'
                                            readonly attrs: {
                                                readonly value: string
                                            }
                                            readonly children: {
                                                readonly localisation_metadata: {
                                                    readonly tag: 'localisation_metadata'
                                                    readonly attrs: {
                                                        readonly uid: string
                                                        readonly translation_project: string
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
                                                        readonly uid: string
                                                        readonly translation_project: string
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
                                        readonly heading: {
                                            readonly tag: 'heading'
                                            readonly content: string
                                        }
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                        readonly highlight: {
                                            readonly tag: 'highlight'
                                            readonly content: string
                                        }
                                    }
                                }
                                readonly config: {
                                    readonly tag: 'config'
                                    readonly attrs: {
                                        readonly expires_at: number
                                        readonly display: 'info' | 'warning'
                                        readonly revoked: 'false' | 'true'
                                    }
                                }
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly Batch: {
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
    readonly BatchGetGroupInfo: {
        readonly module: 'WASmaxGroupsBatchGetGroupInfoRPC'
        readonly opName: 'BatchGetGroupInfo'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 'g.us'
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly groups: {
                    readonly tag: 'groups'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly key: string
                                readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                                readonly ack?: 'false'
                                readonly id?: string
                                readonly creator?: string
                                readonly creation?: number
                                readonly p_v_id?: string
                                readonly a_v_id?: string
                                readonly s_t?: number
                                readonly s_o?: string
                                readonly open_thread_id?: string
                                readonly size?: number
                                readonly addressing_mode?: 'lid' | 'pn'
                                readonly s_o_pn?: string
                                readonly s_o_username?: string
                                readonly creator_pn?: string
                                readonly creator_username?: string
                                readonly creator_country_code?: string
                                readonly subject?: string
                                readonly truncated?: 'true'
                                readonly error?: '403'
                            }
                            readonly children: {
                                readonly description: {
                                    readonly tag: 'description'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly participant?: string
                                        readonly t: number
                                        readonly participant_pn: string
                                        readonly participant_username: string
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                    }
                                } | undefined
                                readonly parent: {
                                    readonly tag: 'parent'
                                    readonly attrs: {
                                        readonly default_membership_approval_mode: 'request_required'
                                    }
                                } | undefined
                                readonly ephemeral: {
                                    readonly tag: 'ephemeral'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly suspended: {
                                    readonly tag: 'suspended'
                                    readonly attrs: {
                                        readonly can_auto_file?: 'true'
                                    }
                                } | undefined
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
                                readonly growth_locked: {
                                    readonly tag: 'growth_locked'
                                    readonly attrs: {
                                        readonly type: 'invite'
                                        readonly expiration: number
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
                                readonly linked_parent: {
                                    readonly tag: 'linked_parent'
                                    readonly attrs: {
                                        readonly jid: string
                                    }
                                } | undefined
                                readonly evolution_version: {
                                    readonly tag: 'evolution_version'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly limit_sharing_enabled: {
                                    readonly tag: 'limit_sharing_enabled'
                                    readonly attrs: {
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly type?: 'admin' | 'superadmin'
                                        readonly participant_label?: string
                                        readonly participant_label_mtime?: number
                                        readonly jid?: string
                                        readonly lid?: string
                                        readonly display_name?: string
                                        readonly phone_number?: string
                                        readonly username?: string
                                        readonly addressable?: 'false'
                                    }
                                }>
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
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly BotList: {
        readonly module: 'WASmaxBotBotListRPC'
        readonly opName: 'BotList'
        readonly xmlns: 'bot'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'bot'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly bot: {
                readonly tag: 'bot'
                readonly attrs: {
                    readonly v?: '2' | '3'
                    readonly bhash?: string
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessV2'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly bot: {
                    readonly tag: 'bot'
                    readonly attrs: {
                        readonly v: '2'
                    }
                    readonly children: {
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
                                        readonly jid: string
                                        readonly persona_id: string
                                        readonly count?: number
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
                        readonly default: {
                            readonly tag: 'default'
                            readonly attrs: {
                                readonly jid: string
                                readonly persona_id: string
                            }
                        }
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessV3'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly bot: {
                    readonly tag: 'bot'
                    readonly attrs: {
                        readonly v: '3'
                        readonly bhash: string
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
                                readonly name: string
                                readonly type: 'all' | 'category' | 'featured'
                                readonly display_type: 'hidden' | 'hscroll' | 'hscroll_icebreakers' | 'hscroll_large' | 'hscroll_small' | 'listview'
                            }
                            readonly children: {
                                readonly bot: ReadonlyArray<{
                                    readonly tag: 'bot'
                                    readonly attrs: {
                                        readonly jid: string
                                        readonly persona_id: string
                                        readonly card_title?: string
                                        readonly count?: number
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly CampaignStateChangedNotification: {
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
                readonly to?: string
                readonly type: 'business'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly mm_campaign: {
                    readonly tag: 'mm_campaign'
                    readonly attrs: {
                        readonly ad_id?: string
                        readonly ad_group_id?: string
                        readonly ad_creative_id?: string
                        readonly status: 'INTEGRITY_NOT_CLEARED' | 'OK'
                    }
                }
            }
        } }
    }
    readonly CancelGroupMembershipRequests: {
        readonly module: 'WASmaxGroupsCancelGroupMembershipRequestsRPC'
        readonly opName: 'CancelGroupMembershipRequests'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly cancel_membership_requests: {
                    readonly tag: 'cancel_membership_requests'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid: string
                                readonly phone_number?: string
                                readonly error?: '404'
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly ChatBlockGet: {
        readonly module: 'WASmaxPsaChatBlockGetRPC'
        readonly opName: 'ChatBlockGet'
        readonly xmlns: 'w:comms:chat'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'w:comms:chat'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly ChatBlockSet: {
        readonly module: 'WASmaxPsaChatBlockSetRPC'
        readonly opName: 'ChatBlockSet'
        readonly xmlns: 'w:comms:chat'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'w:comms:chat'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly Client: {
        readonly module: 'WASmaxOutPingsClientRequest'
        readonly opName: 'Client'
        readonly xmlns: 'w:p'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'get'
            readonly xmlns: 'w:p'
            readonly to: 's.whatsapp.net'
        }
    }
        readonly response:
        | { readonly variant: 'ServerResponse'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
                readonly t: number
            }
        } }
    }
    readonly ClientExpiration: {
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
            }
        } }
    }
    readonly ClientNotification: {
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
            readonly test: {
                readonly tag: 'test'
                readonly attrs: {
                    readonly config?: string
                }
            }
            readonly composing: {
                readonly tag: 'composing'
                readonly attrs: {
                    readonly media?: 'audio'
                }
            }
            readonly paused: {
                readonly tag: 'paused'
            }
        }
    }
        readonly response:
        | never
    }
    readonly CompanionFinish: {
        readonly module: 'WASmaxMdCompanionFinishRPC'
        readonly opName: 'CompanionFinish'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'md'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly link_code_companion_reg: {
                readonly tag: 'link_code_companion_reg'
                readonly attrs: {
                    readonly jid: string
                    readonly stage: 'companion_finish'
                }
                readonly children: {
                    readonly link_code_pairing_wrapped_key_bundle: {
                        readonly tag: 'link_code_pairing_wrapped_key_bundle'
                    }
                    readonly companion_identity_public: {
                        readonly tag: 'companion_identity_public'
                    }
                    readonly link_code_pairing_ref: {
                        readonly tag: 'link_code_pairing_ref'
                        readonly content: Uint8Array
                    }
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly CompanionHello: {
        readonly module: 'WASmaxMdCompanionHelloRPC'
        readonly opName: 'CompanionHello'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'md'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly link_code_companion_reg: {
                readonly tag: 'link_code_companion_reg'
                readonly attrs: {
                    readonly jid: string
                    readonly stage: 'companion_hello'
                    readonly should_show_push_notification?: boolean
                }
                readonly children: {
                    readonly link_code_pairing_wrapped_companion_ephemeral_pub: {
                        readonly tag: 'link_code_pairing_wrapped_companion_ephemeral_pub'
                    }
                    readonly companion_server_auth_key_pub: {
                        readonly tag: 'companion_server_auth_key_pub'
                    }
                    readonly companion_platform_id: {
                        readonly tag: 'companion_platform_id'
                        readonly content: Uint8Array
                    }
                    readonly companion_platform_display: {
                        readonly tag: 'companion_platform_display'
                    }
                    readonly link_code_pairing_nonce: {
                        readonly tag: 'link_code_pairing_nonce'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'NotifyCompanion'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly ContactForm: {
        readonly module: 'WASmaxSupportContactFormRPC'
        readonly opName: 'ContactForm'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '3'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly description: {
                readonly tag: 'description'
            }
            readonly topic: {
                readonly tag: 'topic'
            } | undefined
            readonly topic_id: {
                readonly tag: 'topic_id'
            } | undefined
            readonly debug_information_json: {
                readonly tag: 'debug_information_json'
            } | undefined
            readonly uploaded_logs_id: {
                readonly tag: 'uploaded_logs_id'
            } | undefined
            readonly additional_attributes: {
                readonly tag: 'additional_attributes'
                readonly attrs: {
                    readonly context_flow?: string
                }
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                        readonly tos_version?: number
                    }
                }
            }
        } }
        | { readonly variant: 'RetryableError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly response: {
                    readonly tag: 'response'
                    readonly attrs: {
                        readonly error_code: number
                        readonly next_retry_ts?: string
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly response: {
                    readonly tag: 'response'
                    readonly attrs: {
                        readonly status: 'ok'
                    }
                    readonly children: {
                        readonly message: {
                            readonly tag: 'message'
                            readonly content: string
                        }
                        readonly ticket_id: {
                            readonly tag: 'ticket_id'
                            readonly content: string
                        }
                        readonly group_jid: {
                            readonly tag: 'group_jid'
                            readonly content: string
                        }
                    }
                }
            }
        } }
    }
    readonly Create: {
        readonly module: 'WASmaxGroupsCreateRPC'
        readonly opName: 'Create'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 'g.us'
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly create: {
                readonly tag: 'create'
                readonly attrs: {
                    readonly key: string
                    readonly create_ctx?: string
                    readonly subject: string
                }
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
                    readonly locked: {
                        readonly tag: 'locked'
                    } | undefined
                    readonly announcement: {
                        readonly tag: 'announcement'
                    } | undefined
                    readonly parent: {
                        readonly tag: 'parent'
                        readonly attrs: {
                            readonly default_membership_approval_mode: 'request_required'
                        }
                    } | undefined
                    readonly no_frequently_forwarded: {
                        readonly tag: 'no_frequently_forwarded'
                    } | undefined
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
                                    readonly state: 'on'
                                }
                            }
                        }
                    } | undefined
                    readonly breakout: {
                        readonly tag: 'breakout'
                    } | undefined
                    readonly created_as_lid: {
                        readonly tag: 'created_as_lid'
                    } | undefined
                    readonly addressing_mode_override: {
                        readonly tag: 'addressing_mode_override'
                        readonly attrs: {
                            readonly mode: 'lid' | 'pn'
                        }
                    } | undefined
                    readonly linked_parent: {
                        readonly tag: 'linked_parent'
                        readonly attrs: {
                            readonly jid: string
                        }
                    } | undefined
                    readonly hidden_group: {
                        readonly tag: 'hidden_group'
                    } | undefined
                    readonly allow_non_admin_sub_group_creation: {
                        readonly tag: 'allow_non_admin_sub_group_creation'
                    } | undefined
                    readonly create_general_chat: {
                        readonly tag: 'create_general_chat'
                    } | undefined
                    readonly capi: {
                        readonly tag: 'capi'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'forbidden'
                        readonly code?: number
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
                                readonly type?: 'group' | 'user'
                                readonly participant_limit?: number
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
                readonly type: 'result'
                readonly id: string
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: 'g.us'
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly group: {
                    readonly tag: 'group'
                    readonly attrs: {
                        readonly id: string
                        readonly creator: string
                        readonly creation: number
                        readonly s_t?: number
                        readonly s_o?: string
                        readonly key: string
                        readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly s_o_pn?: string
                        readonly s_o_username?: string
                        readonly creator_pn?: string
                        readonly creator_username?: string
                        readonly creator_country_code?: string
                        readonly subject?: string
                    }
                    readonly children: {
                        readonly description: {
                            readonly tag: 'description'
                            readonly attrs: {
                                readonly id: string
                                readonly error?: '406' | '500'
                            }
                        } | undefined
                        readonly parent: {
                            readonly tag: 'parent'
                            readonly attrs: {
                                readonly default_membership_approval_mode: 'request_required'
                            }
                        } | undefined
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
                        readonly linked_parent: {
                            readonly tag: 'linked_parent'
                            readonly attrs: {
                                readonly jid: string
                            }
                        } | undefined
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid?: string
                                readonly phone_number?: string
                                readonly username?: string
                                readonly error?: '417'
                                readonly addressable?: 'false'
                                readonly type?: 'admin' | 'superadmin'
                            }
                            readonly children: {
                                readonly add_request: {
                                    readonly tag: 'add_request'
                                    readonly attrs: {
                                        readonly code: string
                                        readonly expiration: number
                                    }
                                }
                            }
                        }>
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
                    }
                }
            }
        } }
    }
    readonly CreateCustomPaymentMethod: {
        readonly module: 'WASmaxBrPaymentCreateCustomPaymentMethodRPC'
        readonly opName: 'CreateCustomPaymentMethod'
        readonly xmlns: 'w:pay'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly type: 'set'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly xmlns: 'w:pay'
        }
        readonly children: {
            readonly account: {
                readonly tag: 'account'
                readonly attrs: {
                    readonly action: 'create-custom-payment-method'
                    readonly device_id: string
                    readonly country: 'BR'
                }
                readonly children: {
                    readonly custom_payment_method: {
                        readonly tag: 'custom_payment_method'
                        readonly attrs: {
                            readonly type: 'pay_on_delivery' | 'pix_key'
                            readonly update?: string
                            readonly flow?: 'p2m' | 'p2p'
                            readonly key: string
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
                readonly type: 'error'
                readonly id: string
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                                readonly type: 'pay_on_delivery' | 'pix_key'
                                readonly country?: 'BR'
                                readonly created?: string
                                readonly flow?: 'p2m' | 'p2p'
                                readonly 'credential-id': string
                                readonly 'p2p-eligible'?: '0' | '1'
                                readonly 'p2m-eligible'?: '0' | '1'
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
    readonly CreateSubGroupSuggestion: {
        readonly module: 'WASmaxGroupsCreateSubGroupSuggestionRPC'
        readonly opName: 'CreateSubGroupSuggestion'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                    readonly member_share_group_history_mode: {
                        readonly tag: 'member_share_group_history_mode'
                    }
                    readonly member_link_mode: {
                        readonly tag: 'member_link_mode'
                    }
                    readonly member_add_mode: {
                        readonly tag: 'member_add_mode'
                    }
                    readonly hidden_group: {
                        readonly tag: 'hidden_group'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'forbidden'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly sub_group_suggestion: {
                    readonly tag: 'sub_group_suggestion'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly jid: string
                                readonly error?: '401'
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'NewGroupSuggestionSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly sub_group_suggestion: {
                    readonly tag: 'sub_group_suggestion'
                    readonly attrs: {
                        readonly jid: string
                        readonly creator: string
                        readonly creation: number
                        readonly creator_pn?: string
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
    }
    readonly DeleteParentGroup: {
        readonly module: 'WASmaxGroupsDeleteParentGroupRPC'
        readonly opName: 'DeleteParentGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly DeliverNewsletter: {
        readonly module: 'WASmaxMessageDeliverNewsletterRPC'
        readonly opName: 'Newsletter'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'message'
            readonly attrs: {
                readonly from: string
                readonly id: string
                readonly server_id: number
                readonly t: number
                readonly is_sender?: 'true'
                readonly type?: 'text'
                readonly edit: '3' | '7'
                readonly offline: number
                readonly to: string
                readonly phash: string
                readonly participant: string
                readonly peer_recipient_lid?: string
                readonly peer_recipient_pn?: string
                readonly peer_recipient_username?: string
                readonly device_fanout?: 'false'
                readonly recipient_pn?: string
                readonly addressing_mode?: 'lid' | 'pn'
                readonly recipient?: string
                readonly category?: 'peer'
                readonly push_priority: string
                readonly privacy_sensitive?: boolean
            }
            readonly children: {
                readonly meta: {
                    readonly tag: 'meta'
                    readonly attrs: {
                        readonly original_msg_t: number
                        readonly metering_type: 'smb_mm'
                        readonly type: 'scheduled_message'
                        readonly st: string
                        readonly origin?: 'ctwa'
                        readonly destination_id?: string
                        readonly sender_intent?: 'hosted'
                        readonly polltype?: 'creation' | 'edit' | 'quiz_creation' | 'result_snapshot' | 'vote'
                        readonly event_type?: 'creation' | 'edit' | 'response'
                        readonly thread_msg_id?: string
                        readonly thread_msg_sender_jid?: string
                        readonly appdata?: 'default' | 'group_history' | 'member_tag'
                        readonly view_once?: 'true'
                        readonly conversation_thread_id?: string
                        readonly tag_reason?: string
                        readonly status_setting: string
                        readonly session_scope?: 'status'
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
                readonly votes: {
                    readonly tag: 'votes'
                    readonly children: {
                        readonly vote: ReadonlyArray<{
                            readonly tag: 'vote'
                            readonly content: Uint8Array
                        }>
                    }
                }
                readonly rcat: {
                    readonly tag: 'rcat'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly EncryptedPayloadRequest: {
        readonly module: 'WASmaxWaffleEncryptedPayloadRequestRPC'
        readonly opName: 'EncryptedPayloadRequest'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '47'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly version: '1'
                    readonly algorithm: 'rsa2048'
                }
                readonly children: {
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
            readonly action: {
                readonly tag: 'action'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                        readonly ndc?: 'false' | 'true'
                        readonly npr?: 'false' | 'true'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly wf_deleted: {
                    readonly tag: 'wf_deleted'
                    readonly content: 'false' | 'true'
                } | undefined
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly version: '1'
                        readonly algorithm: 'rsa2048'
                    }
                    readonly children: {
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly Event: {
        readonly module: 'WASmaxInAppCommsEventRPC'
        readonly opName: 'Event'
        readonly xmlns: 'w:comms'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:comms'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly event: {
                readonly tag: 'event'
                readonly attrs: {
                    readonly promotion_id: string
                    readonly type: string
                    readonly timestamp_sec: number
                    readonly logdata: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly FetchKeyBundles: {
        readonly module: 'WASmaxPreKeysFetchKeyBundlesRPC'
        readonly opName: 'FetchKeyBundles'
        readonly xmlns: 'encrypt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly type: 'get'
            readonly id: string
            readonly xmlns: 'encrypt'
            readonly to: 's.whatsapp.net'
        }
        readonly children: {
            readonly key: {
                readonly tag: 'key'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'service-unavailable'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
                readonly list: {
                    readonly tag: 'list'
                    readonly children: {
                        readonly user: ReadonlyArray<{
                            readonly tag: 'user'
                            readonly attrs: {
                                readonly jid: string
                                readonly t?: number
                                readonly is_cloud_api?: 'true'
                            }
                            readonly children: {
                                readonly registration: {
                                    readonly tag: 'registration'
                                    readonly content: Uint8Array
                                }
                                readonly type: {
                                    readonly tag: 'type'
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
                                readonly skey: {
                                    readonly tag: 'skey'
                                    readonly children: {
                                        readonly signature: {
                                            readonly tag: 'signature'
                                            readonly content: Uint8Array
                                        }
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
                                readonly 'device-identity': {
                                    readonly tag: 'device-identity'
                                    readonly content: Uint8Array
                                }
                                readonly error: {
                                    readonly tag: 'error'
                                    readonly attrs: {
                                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                                        readonly code: number
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly FetchMissingPreKeys: {
        readonly module: 'WASmaxPreKeysFetchMissingPreKeysRPC'
        readonly opName: 'FetchMissingPreKeys'
        readonly xmlns: 'encrypt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly type: 'get'
            readonly id: string
            readonly xmlns: 'encrypt'
            readonly to: 's.whatsapp.net'
        }
        readonly children: {
            readonly key_fetch: {
                readonly tag: 'key_fetch'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'service-unavailable'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly padding: {
                    readonly tag: 'padding'
                    readonly content: Uint8Array
                }
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
                                        readonly t?: number
                                        readonly is_cloud_api?: 'true'
                                    }
                                    readonly children: {
                                        readonly registration: {
                                            readonly tag: 'registration'
                                            readonly content: Uint8Array
                                        }
                                        readonly type: {
                                            readonly tag: 'type'
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
                                        readonly skey: {
                                            readonly tag: 'skey'
                                            readonly children: {
                                                readonly signature: {
                                                    readonly tag: 'signature'
                                                    readonly content: Uint8Array
                                                }
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
                                        readonly 'device-identity': {
                                            readonly tag: 'device-identity'
                                            readonly content: Uint8Array
                                        }
                                    }
                                }>
                                readonly error: {
                                    readonly tag: 'error'
                                    readonly attrs: {
                                        readonly text: 'INCORRECT_NONCE' | 'TOO_MANY_ATTEMPTS' | 'already-exists' | 'bad-request' | 'conflict' | 'feature-not-implemented' | 'forbidden' | 'gone' | 'internal-server-error' | 'item-not-found' | 'not-acceptable' | 'rate-overlimit' | 'service-unavailable'
                                        readonly code: number
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly ForceDeleteState: {
        readonly module: 'WASmaxWaffleForceDeleteStateRPC'
        readonly opName: 'ForceDeleteState'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '59'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
            readonly only_if_suspended: {
                readonly tag: 'only_if_suspended'
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly ForceSuspendState: {
        readonly module: 'WASmaxWaffleForceSuspendStateRPC'
        readonly opName: 'ForceSuspendState'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '84'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly GenerateAccessTokens: {
        readonly module: 'WASmaxWaffleGenerateAccessTokensRPC'
        readonly opName: 'GenerateAccessTokens'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '38'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly version: '1'
                    readonly algorithm: 'rsa2048'
                }
                readonly children: {
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
            readonly id_sign: {
                readonly tag: 'id_sign'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly ping_interval: {
                    readonly tag: 'ping_interval'
                    readonly content: number
                }
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly version: '1'
                        readonly algorithm: 'rsa2048'
                    }
                    readonly children: {
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly GenerateWAEntACUser: {
        readonly module: 'WASmaxWaffleGenerateWAEntACUserRPC'
        readonly opName: 'GenerateWAEntACUser'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '37'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly version: '1'
                    readonly algorithm: 'rsa2048'
                }
                readonly children: {
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: Uint8Array
            }
            readonly disclosure: {
                readonly tag: 'disclosure'
                readonly attrs: {
                    readonly id: number
                    readonly version: number
                    readonly lg: string
                    readonly lc: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly version: '1'
                        readonly algorithm: 'rsa2048'
                    }
                    readonly children: {
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly Get: {
        readonly module: 'WASmaxProfilePictureGetRPC'
        readonly opName: 'Get'
        readonly xmlns: 'w:profile:picture'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:profile:picture'
            readonly id: string
            readonly type: 'get'
            readonly target: string
            readonly to: 's.whatsapp.net'
        }
        readonly children: {
            readonly picture: {
                readonly tag: 'picture'
                readonly attrs: {
                    readonly type?: 'image' | 'preview'
                    readonly id?: string
                    readonly query?: string
                    readonly invite?: string
                    readonly persona_id?: string
                    readonly common_gid?: string
                    readonly pose_id: string
                }
                readonly children: {
                    readonly add_request: {
                        readonly tag: 'add_request'
                        readonly attrs: {
                            readonly code: string
                            readonly admin?: string
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessAvatarURLs'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly avatar: ReadonlyArray<{
                    readonly tag: 'avatar'
                    readonly attrs: {
                        readonly url: string
                        readonly pose_id: string
                        readonly hash?: string
                    }
                }>
            }
        } }
        | { readonly variant: 'SuccessNoData'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'SuccessPictureBlob'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly picture: {
                    readonly tag: 'picture'
                    readonly attrs: {
                        readonly id: string
                        readonly type: 'image' | 'preview'
                        readonly has_staging?: 'false' | 'true'
                    }
                    readonly content: Uint8Array
                }
            }
        } }
        | { readonly variant: 'SuccessPictureURL'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly picture: {
                    readonly tag: 'picture'
                    readonly attrs: {
                        readonly id: string
                        readonly type: 'image' | 'preview'
                        readonly url: string
                        readonly direct_path: string
                        readonly hash?: string
                        readonly has_staging?: 'false' | 'true'
                    }
                }
            }
        } }
    }
    readonly GetAccessTokenAndSessionCookies: {
        readonly module: 'WASmaxBizCtwaAdAccountGetAccessTokenAndSessionCookiesRPC'
        readonly opName: 'GetAccessTokenAndSessionCookies'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '104'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
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
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'IncorrectNonce'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
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
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly token_type: {
                    readonly tag: 'token_type'
                    readonly content: 'Strong' | 'Weak'
                } | undefined
                readonly access_token: {
                    readonly tag: 'access_token'
                    readonly content: string
                }
                readonly session_cookies: {
                    readonly tag: 'session_cookies'
                    readonly content: string
                }
                readonly business_person: {
                    readonly tag: 'business_person'
                    readonly attrs: {
                        readonly id: string
                    }
                }
            }
        } }
        | { readonly variant: 'TooManyAttempts'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
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
    readonly GetAccountNonce: {
        readonly module: 'WASmaxBizLinkingGetAccountNonceRPC'
        readonly opName: 'GetAccountNonce'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '12'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
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
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                        readonly tos_version?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly detail: {
                    readonly tag: 'detail'
                    readonly children: {
                        readonly request: {
                            readonly tag: 'request'
                            readonly children: {
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: string
                                }
                            }
                        } | undefined
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: string
                        }
                    }
                }
            }
        } }
    }
    readonly GetBlockList: {
        readonly module: 'WASmaxBlocklistsGetBlockListRPC'
        readonly opName: 'GetBlockList'
        readonly xmlns: 'blocklist'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'blocklist'
            readonly type: 'get'
            readonly id: string
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
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly dhash?: string
                        readonly addressing_mode: 'lid'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly jid?: string
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly username?: string
                                readonly pn_jid?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly unknown_identifier?: 'true'
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
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly dhash?: string
                        readonly addressing_mode: 'lid'
                        readonly dirty: 'true'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly jid?: string
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly username?: string
                                readonly pn_jid?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly unknown_identifier?: 'true'
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'InternalServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'feature-not-implemented'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'MigratedSuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly dhash?: string
                        readonly addressing_mode: 'lid'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly jid: string
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly username?: string
                                readonly pn_jid?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly unknown_identifier?: 'true'
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
                readonly type: 'result'
                readonly id: string
            }
        } }
        | { readonly variant: 'SuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly dhash?: string
                        readonly addressing_mode?: 'pn'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly jid: string
                                readonly lid?: string
                                readonly display_name?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetBusinessEligibility: {
        readonly module: 'WASmaxBizMarketingMessageGetBusinessEligibilityRPC'
        readonly opName: 'GetBusinessEligibility'
        readonly xmlns: 'w:biz'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:biz'
            readonly smax_id: '139'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly features: {
                readonly tag: 'features'
                readonly attrs: {
                    readonly meta_verified?: string
                    readonly marketing_messages?: string
                    readonly genai?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly meta_verified: {
                    readonly tag: 'meta_verified'
                    readonly attrs: {
                        readonly status: 'FAIL' | 'SUCCESS'
                        readonly should_show_privacy_interstitial_to_new_users?: 'false' | 'true'
                        readonly additional_params?: string
                    }
                } | undefined
                readonly marketing_messages: {
                    readonly tag: 'marketing_messages'
                    readonly attrs: {
                        readonly status: 'FAIL' | 'PAUSED' | 'SUCCESS' | 'WARNING'
                        readonly expiration?: number
                    }
                } | undefined
                readonly genai: {
                    readonly tag: 'genai'
                    readonly attrs: {
                        readonly status: 'FAIL' | 'SUCCESS'
                    }
                } | undefined
            }
        } }
    }
    readonly GetCertificate: {
        readonly module: 'WASmaxWaffleGetCertificateRPC'
        readonly opName: 'GetCertificate'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '51'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
            readonly payload_enc_certificates: {
                readonly tag: 'payload_enc_certificates'
            } | undefined
            readonly password_pem: {
                readonly tag: 'password_pem'
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                        readonly signature_pem: {
                            readonly tag: 'signature_pem'
                            readonly attrs: {
                                readonly ttl: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                        readonly password_pem: {
                            readonly tag: 'password_pem'
                            readonly attrs: {
                                readonly ttl: number
                                readonly key_id: number
                            }
                            readonly content: Uint8Array
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly GetContactBlacklist: {
        readonly module: 'WASmaxPrivacyGetContactBlacklistRPC'
        readonly opName: 'GetContactBlacklist'
        readonly xmlns: 'privacy'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'privacy'
            readonly id: string
            readonly type: 'get'
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
                            readonly value: 'contact_blacklist'
                            readonly name: string
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
                readonly id: string
                readonly from?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
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
                readonly id: string
                readonly from?: string
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
                                        readonly username?: string
                                        readonly pn_jid?: string
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly GetCountryCode: {
        readonly module: 'WASmaxMdGetCountryCodeRPC'
        readonly opName: 'GetCountryCode'
        readonly xmlns: 'md'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'md'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'GetCountryCodeResponse'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly GetDisclosureStageByIds: {
        readonly module: 'WASmaxUserNoticeGetDisclosureStageByIdsRPC'
        readonly opName: 'GetDisclosureStageByIds'
        readonly xmlns: 'tos'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'tos'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ClientSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly notice: ReadonlyArray<{
                    readonly tag: 'notice'
                    readonly attrs: {
                        readonly t: number
                        readonly version?: number
                        readonly type?: number
                        readonly id: number
                        readonly stage: number
                    }
                }>
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
    }
    readonly GetDisclosures: {
        readonly module: 'WASmaxUserNoticeGetDisclosuresRPC'
        readonly opName: 'GetDisclosures'
        readonly xmlns: 'tos'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'tos'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ClientSuccess'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly notice: ReadonlyArray<{
                    readonly tag: 'notice'
                    readonly attrs: {
                        readonly t: number
                        readonly version: number
                        readonly type: number
                        readonly id: number
                        readonly stage: number
                    }
                }>
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
    }
    readonly GetExperimentConfig: {
        readonly module: 'WASmaxAbPropsGetExperimentConfigRPC'
        readonly opName: 'GetExperimentConfig'
        readonly xmlns: 'abt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'abt'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly props: {
                readonly tag: 'props'
                readonly attrs: {
                    readonly protocol: '1'
                    readonly hash?: string
                    readonly refresh_id?: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ErrorNoRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ErrorRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                        readonly protocol: '1'
                        readonly ab_key?: string
                        readonly hash?: string
                        readonly refresh?: number
                        readonly refresh_id?: number
                        readonly delta_update?: 'false' | 'true'
                    }
                    readonly children: {
                        readonly prop: ReadonlyArray<{
                            readonly tag: 'prop'
                            readonly attrs: {
                                readonly config_code?: number
                                readonly config_value?: string
                                readonly config_expo_key?: number
                                readonly event_code?: number
                                readonly sampling_weight?: number
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetGroupExperimentConfig: {
        readonly module: 'WASmaxAbPropsGetGroupExperimentConfigRPC'
        readonly opName: 'GetGroupExperimentConfig'
        readonly xmlns: 'abt'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'abt'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ErrorRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                                readonly config_value?: string
                                readonly config_expo_key?: number
                                readonly event_code?: number
                                readonly sampling_weight?: number
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetGroupInfo: {
        readonly module: 'WASmaxGroupsGetGroupInfoRPC'
        readonly opName: 'GetGroupInfo'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
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
                            readonly expiration: number
                            readonly admin: string
                            readonly code: string
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'gone'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly group: {
                    readonly tag: 'group'
                    readonly attrs: {
                        readonly size?: number
                        readonly ack?: 'false'
                        readonly id?: string
                        readonly creator?: string
                        readonly creation?: number
                        readonly p_v_id?: string
                        readonly a_v_id?: string
                        readonly s_t?: number
                        readonly s_o?: string
                        readonly open_thread_id?: string
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly s_o_pn?: string
                        readonly s_o_username?: string
                        readonly creator_pn?: string
                        readonly creator_username?: string
                        readonly creator_country_code?: string
                        readonly subject?: string
                        readonly key: string
                        readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                    }
                    readonly children: {
                        readonly description: {
                            readonly tag: 'description'
                            readonly attrs: {
                                readonly id: string
                                readonly participant?: string
                                readonly t: number
                                readonly participant_pn: string
                                readonly participant_username: string
                            }
                            readonly children: {
                                readonly body: {
                                    readonly tag: 'body'
                                    readonly content: string
                                }
                            }
                        } | undefined
                        readonly parent: {
                            readonly tag: 'parent'
                            readonly attrs: {
                                readonly default_membership_approval_mode: 'request_required'
                            }
                        } | undefined
                        readonly ephemeral: {
                            readonly tag: 'ephemeral'
                            readonly attrs: {
                                readonly expiration: number
                                readonly trigger?: number
                            }
                        } | undefined
                        readonly suspended: {
                            readonly tag: 'suspended'
                            readonly attrs: {
                                readonly can_auto_file?: 'true'
                            }
                        } | undefined
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
                        readonly growth_locked: {
                            readonly tag: 'growth_locked'
                            readonly attrs: {
                                readonly type: 'invite'
                                readonly expiration: number
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
                        readonly linked_parent: {
                            readonly tag: 'linked_parent'
                            readonly attrs: {
                                readonly jid: string
                            }
                        } | undefined
                        readonly evolution_version: {
                            readonly tag: 'evolution_version'
                            readonly attrs: {
                                readonly value: number
                            }
                        } | undefined
                        readonly limit_sharing_enabled: {
                            readonly tag: 'limit_sharing_enabled'
                            readonly attrs: {
                                readonly trigger?: number
                            }
                        } | undefined
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly type?: 'admin' | 'superadmin'
                                readonly participant_label?: string
                                readonly participant_label_mtime?: number
                                readonly jid?: string
                                readonly lid?: string
                                readonly display_name?: string
                                readonly phone_number?: string
                                readonly username?: string
                                readonly addressable?: 'false'
                            }
                        }>
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
                    }
                } | undefined
            }
        } }
    }
    readonly GetGroupProfilePictures: {
        readonly module: 'WASmaxGroupsGetGroupProfilePicturesRPC'
        readonly opName: 'GetGroupProfilePictures'
        readonly xmlns: 'w:g2'
        readonly type: null
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly parent_group_jid: string
            readonly sub_group_jid: string
            readonly query: string
            readonly type: 'error' | 'get' | 'result' | 'set'
            readonly id: string
            readonly linked_groups_membership_hint: string
            readonly to: string
            readonly xmlns: 'w:g2'
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'item-not-found'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessGroupPictures'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly pictures: {
                    readonly tag: 'pictures'
                    readonly children: {
                        readonly picture: ReadonlyArray<{
                            readonly tag: 'picture'
                            readonly attrs: {
                                readonly parent_group_jid?: string
                                readonly sub_group_jid?: string
                                readonly id?: string
                                readonly type?: 'image' | 'preview'
                                readonly url?: string
                                readonly direct_path?: string
                                readonly status?: '304'
                            }
                            readonly content: Uint8Array
                        }>
                    }
                }
            }
        } }
    }
    readonly GetInviteGroupInfo: {
        readonly module: 'WASmaxGroupsGetInviteGroupInfoRPC'
        readonly opName: 'GetInviteGroupInfo'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 'g.us'
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
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
                                readonly type: 'invite'
                                readonly expiration: number
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly group: {
                    readonly tag: 'group'
                    readonly attrs: {
                        readonly size: number
                        readonly id?: string
                        readonly creator?: string
                        readonly creation?: number
                        readonly p_v_id?: string
                        readonly a_v_id?: string
                        readonly s_t?: number
                        readonly s_o?: string
                        readonly open_thread_id?: string
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly s_o_pn?: string
                        readonly s_o_username?: string
                        readonly creator_pn?: string
                        readonly creator_username?: string
                        readonly creator_country_code?: string
                        readonly subject?: string
                    }
                    readonly children: {
                        readonly parent: {
                            readonly tag: 'parent'
                            readonly attrs: {
                                readonly num_sub_groups: number
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
                        readonly ephemeral: {
                            readonly tag: 'ephemeral'
                            readonly attrs: {
                                readonly expiration: number
                                readonly trigger?: number
                            }
                        } | undefined
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly type?: 'admin' | 'superadmin'
                                readonly participant_label?: string
                                readonly participant_label_mtime?: number
                                readonly jid?: string
                                readonly lid?: string
                                readonly display_name?: string
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                        readonly description: {
                            readonly tag: 'description'
                            readonly attrs: {
                                readonly id: string
                                readonly participant?: string
                                readonly t: number
                                readonly participant_pn: string
                                readonly participant_username: string
                            }
                            readonly children: {
                                readonly body: {
                                    readonly tag: 'body'
                                    readonly content: string
                                }
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly GetLinkedAccounts: {
        readonly module: 'WASmaxBizLinkingGetLinkedAccountsRPC'
        readonly opName: 'GetLinkedAccounts'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '42'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
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
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Forbidden'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'forbidden'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly linked_accounts: {
                    readonly tag: 'linked_accounts'
                    readonly children: {
                        readonly fb_page: {
                            readonly tag: 'fb_page'
                            readonly attrs: {
                                readonly id: string
                            }
                            readonly children: {
                                readonly profile_sync: {
                                    readonly tag: 'profile_sync'
                                    readonly attrs: {
                                        readonly state: 'disable' | 'import'
                                    }
                                } | undefined
                                readonly display_name: {
                                    readonly tag: 'display_name'
                                    readonly content: string
                                }
                                readonly ad_status: {
                                    readonly tag: 'ad_status'
                                    readonly attrs: {
                                        readonly has_created_ad: 'false' | 'true'
                                        readonly has_active_ctwa_ad: 'false' | 'true'
                                    }
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
                                readonly whatsapp_as_page_button: {
                                    readonly tag: 'whatsapp_as_page_button'
                                    readonly attrs: {
                                        readonly state: 'off' | 'on'
                                    }
                                }
                            }
                        } | undefined
                        readonly fb_biz: {
                            readonly tag: 'fb_biz'
                            readonly attrs: {
                                readonly id: string
                            }
                            readonly children: {
                                readonly catalog: {
                                    readonly tag: 'catalog'
                                    readonly attrs: {
                                        readonly state: 'disable' | 'import'
                                        readonly id: string
                                    }
                                } | undefined
                                readonly display_name: {
                                    readonly tag: 'display_name'
                                    readonly content: string
                                }
                            }
                        } | undefined
                        readonly ig_professional: {
                            readonly tag: 'ig_professional'
                            readonly children: {
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
                                readonly display_name: {
                                    readonly tag: 'display_name'
                                    readonly content: string
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
                                        readonly has_created_ad: 'false' | 'true'
                                        readonly has_active_ctwa_ad: 'false' | 'true'
                                    }
                                }
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly GetLinkedGroup: {
        readonly module: 'WASmaxGroupsGetLinkedGroupRPC'
        readonly opName: 'GetLinkedGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
            readonly sub_group_jid: string
        }
        readonly children: {
            readonly query_linked: {
                readonly tag: 'query_linked'
                readonly attrs: {
                    readonly type: string
                    readonly jid: string
                    readonly sub_group_jid: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'item-not-found'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
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
                                readonly size: number
                                readonly id?: string
                                readonly creator?: string
                                readonly creation?: number
                                readonly p_v_id?: string
                                readonly a_v_id?: string
                                readonly s_t?: number
                                readonly s_o?: string
                                readonly open_thread_id?: string
                                readonly addressing_mode?: 'lid' | 'pn'
                                readonly s_o_pn?: string
                                readonly s_o_username?: string
                                readonly creator_pn?: string
                                readonly creator_username?: string
                                readonly creator_country_code?: string
                                readonly subject?: string
                            }
                            readonly children: {
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
                                readonly suspended: {
                                    readonly tag: 'suspended'
                                    readonly attrs: {
                                        readonly can_auto_file?: 'true'
                                    }
                                } | undefined
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
                                readonly limit_sharing_enabled: {
                                    readonly tag: 'limit_sharing_enabled'
                                    readonly attrs: {
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly type?: 'admin' | 'superadmin'
                                        readonly participant_label?: string
                                        readonly participant_label_mtime?: number
                                        readonly jid?: string
                                        readonly lid?: string
                                        readonly display_name?: string
                                        readonly phone_number?: string
                                        readonly username?: string
                                    }
                                }>
                                readonly description: {
                                    readonly tag: 'description'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly participant?: string
                                        readonly t: number
                                        readonly participant_pn: string
                                        readonly participant_username: string
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly GetLinkedGroupsParticipants: {
        readonly module: 'WASmaxGroupsGetLinkedGroupsParticipantsRPC'
        readonly opName: 'GetLinkedGroupsParticipants'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
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
    readonly GetMembershipApprovalRequests: {
        readonly module: 'WASmaxGroupsGetMembershipApprovalRequestsRPC'
        readonly opName: 'GetMembershipApprovalRequests'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
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
                                readonly requestor?: string
                                readonly requestor_pn?: string
                                readonly requestor_username?: string
                                readonly parent_group_jid?: string
                                readonly request_time: number
                                readonly request_method: 'invite_link' | 'linked_group_join' | 'non_admin_add'
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetNewsletterMessageUpdates: {
        readonly module: 'WASmaxNewslettersGetNewsletterMessageUpdatesRPC'
        readonly opName: 'GetNewsletterMessageUpdates'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'newsletter'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly message_updates: {
                readonly tag: 'message_updates'
                readonly attrs: {
                    readonly count: number
                    readonly since?: number
                    readonly before: number
                    readonly after: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                                        readonly id?: string
                                        readonly server_id: number
                                        readonly t?: number
                                        readonly is_sender?: 'true'
                                        readonly type?: 'text'
                                        readonly edit?: '3'
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
                                        readonly responses_count: {
                                            readonly tag: 'responses_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly rcat: {
                                            readonly tag: 'rcat'
                                            readonly content: Uint8Array
                                        }
                                        readonly forwards_count: {
                                            readonly tag: 'forwards_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly views_count: ReadonlyArray<{
                                            readonly tag: 'views_count'
                                            readonly attrs: {
                                                readonly type?: 'views'
                                                readonly count: number
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
    readonly GetNewsletterMessages: {
        readonly module: 'WASmaxNewslettersGetNewsletterMessagesRPC'
        readonly opName: 'GetNewsletterMessages'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'newsletter'
            readonly id: string
            readonly type: 'get'
            readonly count: number
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
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: 's.whatsapp.net'
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: 's.whatsapp.net'
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
                                readonly id?: string
                                readonly server_id: number
                                readonly t?: number
                                readonly is_sender?: 'true'
                                readonly type?: 'text'
                                readonly edit?: '3'
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
                                readonly responses_count: {
                                    readonly tag: 'responses_count'
                                    readonly attrs: {
                                        readonly count: number
                                    }
                                }
                                readonly rcat: {
                                    readonly tag: 'rcat'
                                    readonly content: Uint8Array
                                }
                                readonly forwards_count: {
                                    readonly tag: 'forwards_count'
                                    readonly attrs: {
                                        readonly count: number
                                    }
                                }
                                readonly views_count: ReadonlyArray<{
                                    readonly tag: 'views_count'
                                    readonly attrs: {
                                        readonly type?: 'views'
                                        readonly count: number
                                    }
                                }>
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetNewsletterResponses: {
        readonly module: 'WASmaxNewslettersGetNewsletterResponsesRPC'
        readonly opName: 'GetNewsletterResponses'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'newsletter'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly question_responses: {
                readonly tag: 'question_responses'
                readonly attrs: {
                    readonly server_id: number
                    readonly count: number
                    readonly before: string
                }
                readonly children: {
                    readonly filters: {
                        readonly tag: 'filters'
                        readonly children: {
                            readonly contacts: {
                                readonly tag: 'contacts'
                            }
                            readonly replied: {
                                readonly tag: 'replied'
                            }
                        }
                    }
                    readonly contacts: {
                        readonly tag: 'contacts'
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
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                                readonly message: {
                                    readonly tag: 'message'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly t: number
                                        readonly is_sender?: 'true'
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
                                readonly flags: {
                                    readonly tag: 'flags'
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetNewsletterStatusUpdates: {
        readonly module: 'WASmaxNewslettersGetNewsletterStatusUpdatesRPC'
        readonly opName: 'GetNewsletterStatusUpdates'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'newsletter'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly status_updates: {
                readonly tag: 'status_updates'
                readonly attrs: {
                    readonly count: number
                    readonly since?: number
                    readonly before: number
                    readonly after: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                                        readonly id?: string
                                        readonly server_id: number
                                        readonly t?: number
                                        readonly is_sender?: 'true'
                                        readonly edit?: '8'
                                        readonly type?: 'text'
                                    }
                                    readonly children: {
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
                                        readonly meta: {
                                            readonly tag: 'meta'
                                            readonly attrs: {
                                                readonly original_msg_t: number
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
                                        readonly views_count: {
                                            readonly tag: 'views_count'
                                            readonly attrs: {
                                                readonly type: 'views'
                                                readonly count: number
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
    readonly GetNewsletterStatuses: {
        readonly module: 'WASmaxNewslettersGetNewsletterStatusesRPC'
        readonly opName: 'GetNewsletterStatuses'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'newsletter'
            readonly id: string
            readonly type: 'get'
            readonly count: number
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
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: 's.whatsapp.net'
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: 's.whatsapp.net'
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
                                readonly id?: string
                                readonly server_id: number
                                readonly t?: number
                                readonly is_sender?: 'true'
                                readonly edit?: '8'
                                readonly type?: 'text'
                            }
                            readonly children: {
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
                                readonly meta: {
                                    readonly tag: 'meta'
                                    readonly attrs: {
                                        readonly original_msg_t: number
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
                                readonly views_count: {
                                    readonly tag: 'views_count'
                                    readonly attrs: {
                                        readonly type: 'views'
                                        readonly count: number
                                    }
                                }
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetOptOutList: {
        readonly module: 'WASmaxBlocklistsGetOptOutListRPC'
        readonly opName: 'GetOptOutList'
        readonly xmlns: 'optoutlist'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'optoutlist'
            readonly type: 'get'
            readonly category?: string
            readonly id: string
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'feature-not-implemented'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly category?: string
                readonly id: string
            }
        } }
        | { readonly variant: 'SuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
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
                                readonly category?: string
                                readonly expiry_at?: number
                                readonly biz_opt_out_brand_id?: string
                                readonly biz_jid?: string
                                readonly biz_opt_out_jid?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetParticipatingGroups: {
        readonly module: 'WASmaxGroupsGetParticipatingGroupsRPC'
        readonly opName: 'GetParticipatingGroups'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 'g.us'
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly participating: {
                readonly tag: 'participating'
                readonly children: {
                    readonly participants: {
                        readonly tag: 'participants'
                    } | undefined
                    readonly description: {
                        readonly tag: 'description'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly groups: {
                    readonly tag: 'groups'
                    readonly children: {
                        readonly group: ReadonlyArray<{
                            readonly tag: 'group'
                            readonly attrs: {
                                readonly key: string
                                readonly create_ctx?: 'e2ee_migration' | 'regular' | 'rtc'
                                readonly ack?: 'false'
                                readonly id?: string
                                readonly creator?: string
                                readonly creation?: number
                                readonly p_v_id?: string
                                readonly a_v_id?: string
                                readonly s_t?: number
                                readonly s_o?: string
                                readonly open_thread_id?: string
                                readonly size?: number
                                readonly addressing_mode?: 'lid' | 'pn'
                                readonly s_o_pn?: string
                                readonly s_o_username?: string
                                readonly creator_pn?: string
                                readonly creator_username?: string
                                readonly creator_country_code?: string
                                readonly subject?: string
                                readonly truncated?: 'true'
                            }
                            readonly children: {
                                readonly description: {
                                    readonly tag: 'description'
                                    readonly attrs: {
                                        readonly id: string
                                        readonly participant?: string
                                        readonly t: number
                                        readonly participant_pn: string
                                        readonly participant_username: string
                                    }
                                    readonly children: {
                                        readonly body: {
                                            readonly tag: 'body'
                                            readonly content: string
                                        }
                                    }
                                } | undefined
                                readonly parent: {
                                    readonly tag: 'parent'
                                    readonly attrs: {
                                        readonly default_membership_approval_mode: 'request_required'
                                    }
                                } | undefined
                                readonly ephemeral: {
                                    readonly tag: 'ephemeral'
                                    readonly attrs: {
                                        readonly expiration: number
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly suspended: {
                                    readonly tag: 'suspended'
                                    readonly attrs: {
                                        readonly can_auto_file?: 'true'
                                    }
                                } | undefined
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
                                readonly growth_locked: {
                                    readonly tag: 'growth_locked'
                                    readonly attrs: {
                                        readonly type: 'invite'
                                        readonly expiration: number
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
                                readonly linked_parent: {
                                    readonly tag: 'linked_parent'
                                    readonly attrs: {
                                        readonly jid: string
                                    }
                                } | undefined
                                readonly evolution_version: {
                                    readonly tag: 'evolution_version'
                                    readonly attrs: {
                                        readonly value: number
                                    }
                                } | undefined
                                readonly limit_sharing_enabled: {
                                    readonly tag: 'limit_sharing_enabled'
                                    readonly attrs: {
                                        readonly trigger?: number
                                    }
                                } | undefined
                                readonly participant: ReadonlyArray<{
                                    readonly tag: 'participant'
                                    readonly attrs: {
                                        readonly type?: 'admin' | 'superadmin'
                                        readonly participant_label?: string
                                        readonly participant_label_mtime?: number
                                        readonly jid?: string
                                        readonly lid?: string
                                        readonly display_name?: string
                                        readonly phone_number?: string
                                        readonly username?: string
                                        readonly addressable?: 'false'
                                    }
                                }>
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
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly GetPasskeyRequestOptions: {
        readonly module: 'WASmaxMdGetPasskeyRequestOptionsRPC'
        readonly opName: 'GetPasskeyRequestOptions'
        readonly xmlns: 'md'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'md'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly GetPrivacySetting: {
        readonly module: 'WASmaxBizSettingsGetPrivacySettingRPC'
        readonly opName: 'GetPrivacySetting'
        readonly xmlns: 'w:biz'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:biz'
            readonly to: 's.whatsapp.net'
            readonly smax_id: '109'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly GetRef: {
        readonly module: 'WASmaxMdGetRefRPC'
        readonly opName: 'GetRef'
        readonly xmlns: 'md'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'md'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
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
    readonly GetReportedMessages: {
        readonly module: 'WASmaxGroupsGetReportedMessagesRPC'
        readonly opName: 'GetReportedMessages'
        readonly xmlns: 'w:g2'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
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
                                        readonly timestamp: number
                                        readonly phone_number?: string
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
    readonly GetSMBMeteredMessagingCheckout: {
        readonly module: 'WASmaxSmbMeteredMessagingAccountGetSMBMeteredMessagingCheckoutRPC'
        readonly opName: 'GetSMBMeteredMessagingCheckout'
        readonly xmlns: 'w:biz'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:biz'
            readonly smax_id: '120'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
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
            readonly use_ad_account: {
                readonly tag: 'use_ad_account'
            } | undefined
            readonly skip_dedupe: {
                readonly tag: 'skip_dedupe'
            } | undefined
            readonly offer: {
                readonly tag: 'offer'
                readonly attrs: {
                    readonly id: string
                }
            } | undefined
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
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly quota: {
                    readonly tag: 'quota'
                    readonly attrs: {
                        readonly remaining: number
                        readonly total_monthly: number
                        readonly single_credits?: number
                        readonly total_available_credits?: number
                    }
                } | undefined
                readonly offer_status: {
                    readonly tag: 'offer_status'
                    readonly attrs: {
                        readonly value: 'already_claimed' | 'expired' | 'invalid' | 'not_found' | 'not_owned' | 'valid'
                    }
                } | undefined
                readonly cost: {
                    readonly tag: 'cost'
                    readonly attrs: {
                        readonly before_tax: number
                        readonly tax: number
                        readonly offset: number
                        readonly currency: string
                        readonly base?: number
                        readonly base_formatted?: string
                        readonly discount_percent?: number
                        readonly before_discount?: number
                        readonly before_discount_formatted?: string
                    }
                    readonly children: {
                        readonly discounts: {
                            readonly tag: 'discounts'
                            readonly children: {
                                readonly discount: ReadonlyArray<{
                                    readonly tag: 'discount'
                                    readonly attrs: {
                                        readonly type: 'free_msg' | 'percentage'
                                        readonly percentage?: number
                                        readonly amount: number
                                        readonly amount_formatted: string
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
                readonly account_balance: {
                    readonly tag: 'account_balance'
                    readonly attrs: {
                        readonly billing: number
                        readonly available: number
                        readonly offset: number
                    }
                }
            }
        } }
    }
    readonly GroupReport: {
        readonly module: 'WASmaxSpamGroupReportRPC'
        readonly opName: 'GroupReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'set'
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly jid: string
                    readonly source?: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                    readonly reportee: string
                    readonly subject: string
                    readonly is_known_chat: boolean
                }
                readonly children: {
                    readonly message: ReadonlyArray<{
                        readonly tag: 'message'
                        readonly attrs: {
                            readonly from: string
                            readonly phash?: string
                            readonly mediatype?: string
                            readonly local_message_type?: number
                            readonly reported_push_name: string
                            readonly server_id: number
                            readonly response_server_id: string
                            readonly v: '2'
                            readonly protocol_v: number
                            readonly participant: string
                            readonly participant_type?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly extension_id: string
                            readonly session_id: string
                            readonly t: number
                            readonly name: string
                            readonly entry_point?: string
                            readonly edit: '1'
                        }
                        readonly children: {
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
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
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
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
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
                            }
                        }
                    }>
                    readonly call: ReadonlyArray<{
                        readonly tag: 'call'
                        readonly attrs: {
                            readonly to: string
                            readonly from: string
                            readonly id: string
                        }
                        readonly children: {
                            readonly call_info: {
                                readonly tag: 'call_info'
                                readonly attrs: {
                                    readonly duration: number
                                    readonly terminate_reason?: string
                                    readonly reason?: string
                                    readonly terminator?: string
                                    readonly start_time?: number
                                    readonly adder?: string
                                    readonly creator?: string
                                    readonly mediatype?: string
                                }
                            }
                        }
                    }>
                }
            }
            readonly frx: {
                readonly tag: 'frx'
                readonly children: {
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
                    readonly context: {
                        readonly tag: 'context'
                    }
                    readonly parameters: {
                        readonly tag: 'parameters'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
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
    readonly GroupsDirtyNotification: {
        readonly module: 'WASmaxGroupsGroupsDirtyNotificationRPC'
        readonly opName: 'GroupsDirtyNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly type: 'w:gp2'
                readonly from: 'g.us'
                readonly t: number
                readonly id: string
                readonly offline?: number
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
    readonly IncomingNewsletterStatus: {
        readonly module: 'WASmaxStatusDeliverIncomingNewsletterStatusRPC'
        readonly opName: 'IncomingNewsletterStatus'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'status'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly server_id: number
                readonly t: number
                readonly is_sender?: 'true'
                readonly edit: '8' | '7'
                readonly type: 'text' | 'reaction'
                readonly offline: number
                readonly to: string
            }
            readonly children: {
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
                readonly tctoken: {
                    readonly tag: 'tctoken'
                }
            }
        } }
    }
    readonly IndividualReport: {
        readonly module: 'WASmaxSpamIndividualReportRPC'
        readonly opName: 'IndividualReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'set'
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly jid?: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                    readonly reportee: string
                    readonly is_known_chat: boolean
                    readonly reason?: string
                    readonly business_discovery_entry_point?: string
                    readonly business_discovery_timestamp?: number
                    readonly first_message?: string
                    readonly business_discovery_id?: string
                    readonly value: 'spam_banner'
                }
                readonly children: {
                    readonly message: ReadonlyArray<{
                        readonly tag: 'message'
                        readonly attrs: {
                            readonly mediatype?: string
                            readonly local_message_type?: number
                            readonly reported_push_name: string
                            readonly server_id: number
                            readonly response_server_id: string
                            readonly v: '2'
                            readonly protocol_v: number
                            readonly participant: string
                            readonly participant_type?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly extension_id: string
                            readonly session_id: string
                            readonly t: number
                            readonly name: string
                            readonly entry_point?: string
                            readonly edit: '1'
                            readonly from: string
                            readonly to: string
                        }
                        readonly children: {
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
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
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
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
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
                            }
                        }
                    }>
                    readonly call: ReadonlyArray<{
                        readonly tag: 'call'
                        readonly attrs: {
                            readonly to: string
                            readonly from: string
                            readonly id: string
                        }
                        readonly children: {
                            readonly call_info: {
                                readonly tag: 'call_info'
                                readonly attrs: {
                                    readonly duration: number
                                    readonly terminate_reason?: string
                                    readonly reason?: string
                                    readonly terminator?: string
                                    readonly start_time?: number
                                    readonly adder?: string
                                    readonly creator?: string
                                    readonly mediatype?: string
                                }
                            }
                        }
                    }>
                    readonly user_initiated_extension: ReadonlyArray<{
                        readonly tag: 'user_initiated_extension'
                        readonly attrs: {
                            readonly extension_id: string
                            readonly session_id: string
                            readonly t: number
                            readonly name: string
                            readonly entry_point?: string
                        }
                        readonly children: {
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                        }
                    }>
                    readonly biz_api_report: {
                        readonly tag: 'biz_api_report'
                        readonly attrs: {
                            readonly known_account: string
                            readonly message_report: string
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
            readonly frx: {
                readonly tag: 'frx'
                readonly children: {
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
                    readonly context: {
                        readonly tag: 'context'
                    }
                    readonly parameters: {
                        readonly tag: 'parameters'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
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
    readonly JoinLinkedGroup: {
        readonly module: 'WASmaxGroupsJoinLinkedGroupRPC'
        readonly opName: 'JoinLinkedGroup'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly join_linked_group: {
                readonly tag: 'join_linked_group'
                readonly attrs: {
                    readonly type?: string
                    readonly jid: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly LinkCreate: {
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
                    readonly media?: 'audio' | 'video'
                    readonly 'call-creator'?: string
                    readonly 'call-id'?: string
                    readonly link_creator_username?: string
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
                readonly from: string
                readonly type: 'link_create'
                readonly to?: string
                readonly id: string
                readonly class: 'call'
                readonly error?: string
            }
            readonly children: {
                readonly link_create: {
                    readonly tag: 'link_create'
                    readonly attrs: {
                        readonly token: string
                        readonly media?: 'audio' | 'video'
                        readonly 'call-creator'?: string
                        readonly 'call-id'?: string
                    }
                }
            }
        } }
        | { readonly variant: 'LinkCreateNack'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly from: 'call'
                readonly type: 'link_create'
                readonly error: string
                readonly to?: string
                readonly id: string
                readonly class: 'call'
            }
        } }
    }
    readonly LinkQuery: {
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
                    readonly token: string
                    readonly media: 'audio' | 'video'
                    readonly action?: 'link_edit' | 'preview'
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'LinkQueryAck'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly from: 'call'
                readonly type: 'link_query'
                readonly to?: string
                readonly id: string
                readonly class: 'call'
                readonly error?: string
            }
            readonly children: {
                readonly link_query: {
                    readonly tag: 'link_query'
                    readonly attrs: {
                        readonly link_creator: string
                        readonly link_creator_pn?: string
                        readonly link_creator_username?: string
                        readonly action?: 'link_edit' | 'preview'
                        readonly token: string
                        readonly media: 'audio' | 'video'
                    }
                    readonly children: {
                        readonly waiting_room: {
                            readonly tag: 'waiting_room'
                            readonly attrs: {
                                readonly is_admin?: '1'
                                readonly enabled: '0' | '1'
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'LinkQueryNack'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly from: 'call'
                readonly type: 'link_query'
                readonly error: string
                readonly to?: string
                readonly id: string
                readonly class: 'call'
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
    readonly LinkSubGroups: {
        readonly module: 'WASmaxGroupsLinkSubGroupsRPC'
        readonly opName: 'LinkSubGroups'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
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
                                        readonly error?: '401'
                                    }
                                    readonly children: {
                                        readonly participant: ReadonlyArray<{
                                            readonly tag: 'participant'
                                            readonly attrs: {
                                                readonly jid: string
                                                readonly error: '403'
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
    readonly LiveUpdatesNotification: {
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
                readonly type: 'newsletter'
                readonly t: number
                readonly id: string
                readonly offline?: number
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
                                        readonly id?: string
                                        readonly server_id: number
                                        readonly t?: number
                                        readonly is_sender?: 'true'
                                        readonly type?: 'text'
                                        readonly edit?: '3'
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
                                        readonly responses_count: {
                                            readonly tag: 'responses_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly rcat: {
                                            readonly tag: 'rcat'
                                            readonly content: Uint8Array
                                        }
                                        readonly forwards_count: {
                                            readonly tag: 'forwards_count'
                                            readonly attrs: {
                                                readonly count: number
                                            }
                                        }
                                        readonly views_count: ReadonlyArray<{
                                            readonly tag: 'views_count'
                                            readonly attrs: {
                                                readonly type?: 'views'
                                                readonly count: number
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
    readonly MembershipRequestsAction: {
        readonly module: 'WASmaxGroupsMembershipRequestsActionRPC'
        readonly opName: 'MembershipRequestsAction'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
                readonly addressing_mode?: 'lid' | 'pn'
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
                                        readonly error?: '400'
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
                                        readonly error?: '404'
                                    }
                                }>
                            }
                        } | undefined
                    }
                }
            }
        } }
    }
    readonly MyAddOns: {
        readonly module: 'WASmaxNewslettersMyAddOnsRPC'
        readonly opName: 'MyAddOns'
        readonly xmlns: 'newsletter'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'newsletter'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly my_addons: {
                readonly tag: 'my_addons'
                readonly attrs: {
                    readonly limit: number
                    readonly jid?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly NewsletterReport: {
        readonly module: 'WASmaxSpamNewsletterReportRPC'
        readonly opName: 'NewsletterReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'set'
            readonly to: 's.whatsapp.net'
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
                            readonly from: string
                            readonly mediatype?: string
                            readonly local_message_type?: number
                            readonly reported_push_name: string
                            readonly server_id: number
                            readonly response_server_id: string
                            readonly v: '2'
                            readonly protocol_v: number
                            readonly participant: string
                            readonly participant_type?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly extension_id: string
                            readonly session_id: string
                            readonly t: number
                            readonly name: string
                            readonly entry_point?: string
                            readonly edit: '1'
                        }
                        readonly children: {
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
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
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
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
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
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
                readonly id: string
                readonly from?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
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
    readonly NonceNotification: {
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
                readonly to?: string
                readonly type: 'business'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly wa_ad_account_nonce: {
                    readonly tag: 'wa_ad_account_nonce'
                    readonly content: string
                }
            }
        } }
    }
    readonly OffboardingNotification: {
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
                readonly type: 'hosted'
                readonly t: number
                readonly id: string
                readonly offline?: number
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
                                readonly logo_url: {
                                    readonly tag: 'logo_url'
                                    readonly content: Uint8Array
                                } | undefined
                                readonly name: {
                                    readonly tag: 'name'
                                    readonly content: Uint8Array
                                } | undefined
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: number
                                } | undefined
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly OnboardingStatusNotification: {
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
                readonly type: 'hosted'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly onboarding_status: {
                    readonly tag: 'onboarding_status'
                    readonly attrs: {
                        readonly status: 'completed' | 'failed'
                        readonly product_surface: 'ai_from_meta' | 'automation' | 'business_platform'
                    }
                    readonly children: {
                        readonly provider_info: {
                            readonly tag: 'provider_info'
                            readonly children: {
                                readonly logo_url: {
                                    readonly tag: 'logo_url'
                                    readonly content: Uint8Array
                                } | undefined
                                readonly name: {
                                    readonly tag: 'name'
                                    readonly content: Uint8Array
                                } | undefined
                                readonly id: {
                                    readonly tag: 'id'
                                    readonly content: number
                                } | undefined
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly OutSet: {
        readonly module: 'WASmaxOutUserNoticeSetRequest'
        readonly opName: 'Set'
        readonly xmlns: 'tos'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'tos'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly notice: {
                    readonly tag: 'notice'
                    readonly attrs: {
                        readonly t: number
                        readonly id: number
                        readonly stage: number
                    }
                } | undefined
            }
        } }
    }
    readonly PassiveIQ: {
        readonly module: 'WASmaxPassiveModePassiveIQRPC'
        readonly opName: 'PassiveIQ'
        readonly xmlns: 'passive'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'set'
            readonly xmlns: 'passive'
            readonly to: 's.whatsapp.net'
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
                readonly id: string
                readonly type: 'result'
                readonly from: 's.whatsapp.net'
            }
        } }
    }
    readonly PasskeyPrologueRequestNotification: {
        readonly module: 'WASmaxMdPasskeyPrologueRequestNotificationRPC'
        readonly opName: 'PasskeyPrologueRequestNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly type: 'passkey_prologue_request'
                readonly from: 's.whatsapp.net'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly passkey_request_options: {
                    readonly tag: 'passkey_request_options'
                    readonly content: Uint8Array
                } | undefined
            }
        } }
    }
    readonly PostNewsletterStatus: {
        readonly module: 'WASmaxStatusPublishPostNewsletterStatusRPC'
        readonly opName: 'PostNewsletterStatus'
        readonly xmlns: null
        readonly type: 'reaction'
        readonly request: {
        readonly tag: 'status'
        readonly attrs: {
            readonly to: string
            readonly id: string
            readonly server_id: number
            readonly type: 'reaction'
            readonly edit: '7'
        }
        readonly children: {
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
                readonly error: string
                readonly from: string
                readonly class: 'status'
                readonly id: string
                readonly t: number
                readonly edit?: '1'
                readonly application_error: number
                readonly backoff: number
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly server_id?: number
                readonly from: string
                readonly class: 'status'
                readonly id: string
                readonly t: number
                readonly edit?: '1'
            }
        } }
    }
    readonly PrimaryHelloNotifyCompanion: {
        readonly module: 'WASmaxMdPrimaryHelloNotifyCompanionRPC'
        readonly opName: 'PrimaryHelloNotifyCompanion'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly type: 'link_code_companion_reg'
                readonly from: 's.whatsapp.net'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly link_code_companion_reg: {
                    readonly tag: 'link_code_companion_reg'
                    readonly attrs: {
                        readonly stage: 'primary_hello'
                    }
                    readonly children: {
                        readonly link_code_pairing_wrapped_primary_ephemeral_pub: {
                            readonly tag: 'link_code_pairing_wrapped_primary_ephemeral_pub'
                            readonly content: Uint8Array
                        }
                        readonly primary_identity_pub: {
                            readonly tag: 'primary_identity_pub'
                            readonly content: Uint8Array
                        }
                        readonly link_code_pairing_ref: {
                            readonly tag: 'link_code_pairing_ref'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly PromoteDemote: {
        readonly module: 'WASmaxGroupsPromoteDemoteRPC'
        readonly opName: 'PromoteDemote'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
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
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'rate-overlimit'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessDemote'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly demote: {
                    readonly tag: 'demote'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid: string
                                readonly error?: '404' | '406'
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
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly promote: {
                    readonly tag: 'promote'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid: string
                                readonly type?: 'admin'
                                readonly error?: '404' | '419'
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly PromoteDemoteAdmin: {
        readonly module: 'WASmaxGroupsPromoteDemoteAdminRPC'
        readonly opName: 'PromoteDemoteAdmin'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly admin: {
                readonly tag: 'admin'
                readonly children: {
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
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'rate-overlimit'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessMultiAdmin'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly admin: {
                    readonly tag: 'admin'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid: string
                                readonly type?: 'admin'
                                readonly error?: '403' | '404' | '406' | '419'
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly PublishNewsletter: {
        readonly module: 'WASmaxMessagePublishNewsletterRPC'
        readonly opName: 'Newsletter'
        readonly xmlns: null
        readonly type: 'text'
        readonly request: {
        readonly tag: 'message'
        readonly attrs: {
            readonly to: string
            readonly id: string
            readonly server_id: number
            readonly type: 'text'
            readonly edit: '7'
        }
        readonly children: {
            readonly plaintext: {
                readonly tag: 'plaintext'
                readonly content: Uint8Array
            }
            readonly meta: {
                readonly tag: 'meta'
                readonly attrs: {
                    readonly questiontype: 'response'
                }
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
                readonly error: string
                readonly from?: string
                readonly class?: 'message'
                readonly id?: string
                readonly t?: number
                readonly edit?: '1'
                readonly application_error: number
                readonly backoff: number
            }
            readonly children: {
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly reporting_tag: {
                            readonly tag: 'reporting_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly biz: {
                    readonly tag: 'biz'
                    readonly attrs: {
                        readonly paid_convo_id: string
                        readonly pricing_model: 'CBP' | 'NBP' | 'PMP'
                        readonly billable: 'false' | 'true'
                        readonly expiration_timestamp?: number
                        readonly pricing_category?: string
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
                                readonly consumer_country_code?: string
                                readonly business_country_code?: string
                                readonly conversation_status?: number
                                readonly latest_c2b_timestamp?: number
                                readonly analytics_conversation_id?: string
                                readonly b2c_timestamp?: number
                            }
                        } | undefined
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly response_server_id?: string
                readonly from?: string
                readonly class?: 'message'
                readonly id?: string
                readonly t?: number
                readonly edit?: '1'
                readonly server_id?: number
            }
            readonly children: {
                readonly franking: {
                    readonly tag: 'franking'
                    readonly children: {
                        readonly reporting_tag: {
                            readonly tag: 'reporting_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
                readonly biz: {
                    readonly tag: 'biz'
                    readonly attrs: {
                        readonly paid_convo_id: string
                        readonly pricing_model: 'CBP' | 'NBP' | 'PMP'
                        readonly billable: 'false' | 'true'
                        readonly expiration_timestamp?: number
                        readonly pricing_category?: string
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
                                readonly consumer_country_code?: string
                                readonly business_country_code?: string
                                readonly conversation_status?: number
                                readonly latest_c2b_timestamp?: number
                                readonly analytics_conversation_id?: string
                                readonly b2c_timestamp?: number
                            }
                        } | undefined
                    }
                }
                readonly rcat: {
                    readonly tag: 'rcat'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly PublishView: {
        readonly module: 'WASmaxReceiptPublishViewRPC'
        readonly opName: 'PublishView'
        readonly xmlns: null
        readonly type: 'view'
        readonly request: {
        readonly tag: 'receipt'
        readonly attrs: {
            readonly to: string
            readonly class: 'status'
            readonly type: 'view'
            readonly server_id: number
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'ack'
            readonly attrs: {
                readonly id: string
                readonly class: 'receipt'
                readonly from: string
                readonly t?: number
                readonly readreceipts?: 'all' | 'none'
                readonly type: 'account_sync' | 'business' | 'companion_reg_refresh' | 'contacts' | 'digital_commerce_subscription' | 'disappearing_mode' | 'mediaretry' | 'mex' | 'offer_notice' | 'pay' | 'picture' | 'privacy_token' | 'psa' | 'registration' | 'retry' | 'server' | 'server_sync' | 'status' | 'text' | 'w:gp2'
                readonly edit: '0' | '1' | '7'
            }
        } }
    }
    readonly QPNotification: {
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
                readonly type: 'psa'
                readonly t: number
                readonly id: string
                readonly offline?: number
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
                                                readonly light: {
                                                    readonly tag: 'light'
                                                    readonly content: Uint8Array
                                                } | undefined
                                                readonly dark: {
                                                    readonly tag: 'dark'
                                                    readonly content: Uint8Array
                                                } | undefined
                                            }
                                        } | undefined
                                        readonly primary_action: {
                                            readonly tag: 'primary_action'
                                            readonly attrs: {
                                                readonly text: string
                                                readonly universal_link?: string
                                                readonly deep_link?: string
                                            }
                                        } | undefined
                                        readonly secondary_action: {
                                            readonly tag: 'secondary_action'
                                            readonly attrs: {
                                                readonly text: string
                                                readonly universal_link?: string
                                                readonly deep_link?: string
                                            }
                                        } | undefined
                                        readonly colors: {
                                            readonly tag: 'colors'
                                            readonly children: {
                                                readonly light: {
                                                    readonly tag: 'light'
                                                    readonly attrs: {
                                                        readonly background?: string
                                                        readonly highlight?: string
                                                    }
                                                }
                                                readonly dark: {
                                                    readonly tag: 'dark'
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
                                        readonly qp_config: {
                                            readonly tag: 'qp_config'
                                            readonly attrs: {
                                                readonly template_name: string
                                                readonly start_time_seconds: number
                                                readonly end_time_seconds: number
                                                readonly ttl_seconds: number
                                                readonly dismissable: 'false' | 'true'
                                                readonly force_pass: 'false' | 'true'
                                                readonly surface_delay_time_seconds: number
                                                readonly deterministic: 'false' | 'true'
                                                readonly experiment_key?: string
                                                readonly exposure_holdout: 'false' | 'true'
                                                readonly max_impressions: number
                                                readonly impression_cooldown: number
                                                readonly eligibility_duration_ms: number
                                                readonly priority: number
                                                readonly log_eligibility_waterfall: 'false' | 'true'
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
                                                                readonly max_impressions: number
                                                                readonly max_primary_clicks: number
                                                                readonly max_secondary_clicks: number
                                                                readonly max_dismisses: number
                                                            }
                                                        } | undefined
                                                        readonly user_info: {
                                                            readonly tag: 'user_info'
                                                            readonly attrs: {
                                                                readonly impression_count: number
                                                                readonly primary_click_count: number
                                                                readonly secondary_click_count: number
                                                                readonly dismiss_click_count: number
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
                                        readonly title: {
                                            readonly tag: 'title'
                                            readonly content: string
                                        }
                                        readonly text: {
                                            readonly tag: 'text'
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
    readonly RefreshAccessTokens: {
        readonly module: 'WASmaxWaffleRefreshAccessTokensRPC'
        readonly opName: 'RefreshAccessTokens'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '46'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly version: '1'
                    readonly algorithm: 'rsa2048'
                }
                readonly children: {
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                        readonly ndc?: 'false' | 'true'
                        readonly npr?: 'false' | 'true'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly encryption_metadata: {
                    readonly tag: 'encryption_metadata'
                    readonly attrs: {
                        readonly version: '1'
                        readonly algorithm: 'rsa2048'
                    }
                    readonly children: {
                        readonly encrypted_key: {
                            readonly tag: 'encrypted_key'
                            readonly content: Uint8Array
                        }
                        readonly nonce: {
                            readonly tag: 'nonce'
                            readonly content: Uint8Array
                        }
                        readonly encrypted_data: {
                            readonly tag: 'encrypted_data'
                            readonly content: Uint8Array
                        }
                        readonly auth_tag: {
                            readonly tag: 'auth_tag'
                            readonly content: Uint8Array
                        }
                    }
                }
            }
        } }
    }
    readonly RefreshCodeNotifyCompanion: {
        readonly module: 'WASmaxMdRefreshCodeNotifyCompanionRPC'
        readonly opName: 'RefreshCodeNotifyCompanion'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly type: 'link_code_companion_reg'
                readonly from: 's.whatsapp.net'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly link_code_companion_reg: {
                    readonly tag: 'link_code_companion_reg'
                    readonly attrs: {
                        readonly stage: 'refresh_code'
                        readonly force_manual_refresh?: 'false' | 'true'
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
    readonly RemoveParticipants: {
        readonly module: 'WASmaxGroupsRemoveParticipantsRPC'
        readonly opName: 'RemoveParticipants'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'rate-overlimit'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
                readonly addressing_mode?: 'lid' | 'pn'
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
                                readonly phone_number?: string
                                readonly username?: string
                                readonly error?: '404'
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly ReportBug: {
        readonly module: 'WASmaxBugReportingReportBugRPC'
        readonly opName: 'ReportBug'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '105'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly description: {
                readonly tag: 'description'
            }
            readonly debug_information_json: {
                readonly tag: 'debug_information_json'
            }
            readonly device_log_handle: {
                readonly tag: 'device_log_handle'
            } | undefined
            readonly media: ReadonlyArray<{
                readonly tag: 'media'
                readonly attrs: {
                    readonly iv: string
                    readonly cipherKey: string
                    readonly type?: 'image' | 'video'
                    readonly fileName?: string
                }
                readonly content: Uint8Array
            }>
            readonly title: {
                readonly tag: 'title'
            } | undefined
            readonly category: {
                readonly tag: 'category'
            } | undefined
            readonly client_server_join_key: {
                readonly tag: 'client_server_join_key'
            } | undefined
            readonly reproducibility: {
                readonly tag: 'reproducibility'
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly task_id: {
                    readonly tag: 'task_id'
                    readonly content: string
                }
            }
        } }
    }
    readonly ReportMessages: {
        readonly module: 'WASmaxGroupsReportMessagesRPC'
        readonly opName: 'ReportMessages'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly RequestSilentNonce: {
        readonly module: 'WASmaxBizAccessTokenRequestSilentNonceRPC'
        readonly opName: 'RequestSilentNonce'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '118'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'RecoveryRequired'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
            readonly children: {
                readonly result: {
                    readonly tag: 'result'
                    readonly attrs: {
                        readonly status: 'RecoveryRequired'
                        readonly email: string
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
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
    readonly ResetSmbLastQpPrefetchTimestamp: {
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
                readonly type: 'psa'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
        } }
    }
    readonly RevokeRequestCode: {
        readonly module: 'WASmaxGroupsRevokeRequestCodeRPC'
        readonly opName: 'RevokeRequestCode'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
            }
            readonly children: {
                readonly revoke: {
                    readonly tag: 'revoke'
                    readonly children: {
                        readonly participant: ReadonlyArray<{
                            readonly tag: 'participant'
                            readonly attrs: {
                                readonly jid: string
                                readonly error?: '404'
                                readonly phone_number?: string
                                readonly username?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly SendAccountRecoveryNonce: {
        readonly module: 'WASmaxBizCtwaAdAccountSendAccountRecoveryNonceRPC'
        readonly opName: 'SendAccountRecoveryNonce'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '112'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
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
    readonly SendBuffer: {
        readonly module: 'WASmaxStatsSendBufferRPC'
        readonly opName: 'SendBuffer'
        readonly xmlns: 'w:stats'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:stats'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'service-unavailable'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly SendFeedback: {
        readonly module: 'WASmaxSupportMessageFeedbackSendFeedbackRPC'
        readonly opName: 'SendFeedback'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '138'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly message: {
                readonly tag: 'message'
                readonly attrs: {
                    readonly id: string
                }
            }
            readonly feedback_list: {
                readonly tag: 'feedback_list'
                readonly children: {
                    readonly feedback: ReadonlyArray<{
                        readonly tag: 'feedback'
                        readonly attrs: {
                            readonly kind: string
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
                readonly to?: string
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
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
    readonly ServerNotification: {
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
                readonly test: {
                    readonly tag: 'test'
                    readonly attrs: {
                        readonly config?: string
                    }
                }
                readonly composing: {
                    readonly tag: 'composing'
                    readonly attrs: {
                        readonly media?: 'audio'
                    }
                }
                readonly paused: {
                    readonly tag: 'paused'
                }
            }
        } }
    }
    readonly ServerUpdate: {
        readonly module: 'WASmaxPresenceServerUpdateRPC'
        readonly opName: 'ServerUpdate'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'presence'
            readonly attrs: {
                readonly from?: string
                readonly count?: number
                readonly type: 'unavailable' | 'subscribe'
                readonly last?: 'deny' | 'error' | 'none'
                readonly name?: string
                readonly to: string
                readonly context?: string
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
    readonly Set: {
        readonly module: 'WASmaxPushConfigSetRPC'
        readonly opName: 'Set'
        readonly xmlns: 'urn:xmpp:whatsapp:push'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'urn:xmpp:whatsapp:push'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly config: {
                readonly tag: 'config'
                readonly attrs: {
                    readonly platform: 'fb'
                    readonly appid: string
                    readonly deviceid: string
                    readonly fbid?: string
                    readonly jid: string
                    readonly mute: number
                    readonly id: string
                    readonly app_mute?: number
                    readonly pkey?: string
                    readonly voip_payload_type?: string
                    readonly num_acc?: number
                    readonly notify?: string
                    readonly call?: string
                    readonly version?: number
                    readonly endpoint: string
                    readonly auth: string
                    readonly p256dh: string
                    readonly lg?: string
                    readonly lc?: string
                }
            }
            readonly clear: {
                readonly tag: 'clear'
                readonly attrs: {
                    readonly platform?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Conflict'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'conflict'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'InternalServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly SetCompanionNonce: {
        readonly module: 'WASmaxMdSetCompanionNonceRPC'
        readonly opName: 'SetCompanionNonce'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'md'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly SetDescription: {
        readonly module: 'WASmaxGroupsSetDescriptionRPC'
        readonly opName: 'SetDescription'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly description: {
                readonly tag: 'description'
                readonly attrs: {
                    readonly id?: string
                    readonly prev?: string
                    readonly delete?: 'true'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly t?: number
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly SetEncryptedPairingRequest: {
        readonly module: 'WASmaxMdSetEncryptedPairingRequestRPC'
        readonly opName: 'SetEncryptedPairingRequest'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'md'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly SetPasskeyPrologue: {
        readonly module: 'WASmaxMdSetPasskeyPrologueRPC'
        readonly opName: 'SetPasskeyPrologue'
        readonly xmlns: 'md'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'md'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly passkey_prologue: {
                readonly tag: 'passkey_prologue'
                readonly children: {
                    readonly credential_id: {
                        readonly tag: 'credential_id'
                    }
                    readonly webauthn_assertion: {
                        readonly tag: 'webauthn_assertion'
                    }
                    readonly prologue_payload: {
                        readonly tag: 'prologue_payload'
                    }
                    readonly pairing_handoff_proof: {
                        readonly tag: 'pairing_handoff_proof'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly SetPaymentsTOSv3: {
        readonly module: 'WASmaxAccountSetPaymentsTOSv3RPC'
        readonly opName: 'SetPaymentsTOSv3'
        readonly xmlns: 'urn:xmpp:whatsapp:account'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'urn:xmpp:whatsapp:account'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly accept_pay: {
                readonly tag: 'accept_pay'
                readonly attrs: {
                    readonly version: '3'
                    readonly tos_version: number
                    readonly notice: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly SetPrimaryEphemeralIdentityNotification: {
        readonly module: 'WASmaxMdSetPrimaryEphemeralIdentityNotificationRPC'
        readonly opName: 'SetPrimaryEphemeralIdentityNotification'
        readonly xmlns: null
        readonly type: null
        readonly request: unknown
        readonly response:
        | { readonly variant: 'Request'; readonly value: {
            readonly tag: 'notification'
            readonly attrs: {
                readonly type: 'crsc_continuation'
                readonly from: 's.whatsapp.net'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly primary_ephemeral_identity: {
                    readonly tag: 'primary_ephemeral_identity'
                    readonly content: Uint8Array
                }
            }
        } }
    }
    readonly SetPrivacySetting: {
        readonly module: 'WASmaxBizSettingsSetPrivacySettingRPC'
        readonly opName: 'SetPrivacySetting'
        readonly xmlns: 'w:biz'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:biz'
            readonly to: 's.whatsapp.net'
            readonly smax_id: '110'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly privacy: {
                readonly tag: 'privacy'
                readonly attrs: {
                    readonly value: 'false' | 'notset' | 'true'
                }
                readonly children: {
                    readonly smb_data_sharing_with_meta_consent: {
                        readonly tag: 'smb_data_sharing_with_meta_consent'
                        readonly attrs: {
                            readonly value: 'false' | 'notset' | 'true'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly SetProperty: {
        readonly module: 'WASmaxGroupsSetPropertyRPC'
        readonly opName: 'SetProperty'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly locked: {
                readonly tag: 'locked'
            } | undefined
            readonly announcement: {
                readonly tag: 'announcement'
            } | undefined
            readonly no_frequently_forwarded: {
                readonly tag: 'no_frequently_forwarded'
            } | undefined
            readonly ephemeral: {
                readonly tag: 'ephemeral'
                readonly attrs: {
                    readonly expiration: number
                    readonly trigger?: number
                }
            } | undefined
            readonly unlocked: {
                readonly tag: 'unlocked'
            } | undefined
            readonly not_announcement: {
                readonly tag: 'not_announcement'
            } | undefined
            readonly frequently_forwarded_ok: {
                readonly tag: 'frequently_forwarded_ok'
            } | undefined
            readonly not_ephemeral: {
                readonly tag: 'not_ephemeral'
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
            readonly allow_admin_reports: {
                readonly tag: 'allow_admin_reports'
            } | undefined
            readonly not_allow_admin_reports: {
                readonly tag: 'not_allow_admin_reports'
            } | undefined
            readonly allow_non_admin_sub_group_creation: {
                readonly tag: 'allow_non_admin_sub_group_creation'
            } | undefined
            readonly not_allow_non_admin_sub_group_creation: {
                readonly tag: 'not_allow_non_admin_sub_group_creation'
            } | undefined
            readonly group_history: {
                readonly tag: 'group_history'
            } | undefined
            readonly no_group_history: {
                readonly tag: 'no_group_history'
            } | undefined
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly SetReg: {
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
                readonly xmlns: 'md'
                readonly id: string
                readonly type: 'set'
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
                        readonly 'encryption-metadata': {
                            readonly tag: 'encryption-metadata'
                            readonly attrs: {
                                readonly version: '1'
                                readonly algorithm: 'aes-256-gcm'
                            }
                            readonly children: {
                                readonly encrypted_key: {
                                    readonly tag: 'encrypted_key'
                                    readonly content: Uint8Array
                                }
                                readonly nonce: {
                                    readonly tag: 'nonce'
                                    readonly content: Uint8Array
                                }
                                readonly encrypted_data: {
                                    readonly tag: 'encrypted_data'
                                    readonly content: Uint8Array
                                }
                                readonly auth_tag: {
                                    readonly tag: 'auth_tag'
                                    readonly content: Uint8Array
                                }
                            }
                        } | undefined
                        readonly 'device-identity': {
                            readonly tag: 'device-identity'
                            readonly content: Uint8Array
                        }
                        readonly device: {
                            readonly tag: 'device'
                            readonly attrs: {
                                readonly jid: string
                                readonly lid?: string
                                readonly beta?: 'false' | 'true'
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
    readonly SetResult: {
        readonly module: 'WASmaxOutUserNoticeSetResultRequest'
        readonly opName: 'SetResult'
        readonly xmlns: 'tos'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'tos'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly SetSubject: {
        readonly module: 'WASmaxGroupsSetSubjectRPC'
        readonly opName: 'SetSubject'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly SetToCompanion: {
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
                readonly xmlns: 'md'
                readonly id: string
                readonly type: 'set'
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
    readonly Share: {
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
    readonly SignCredential: {
        readonly module: 'WASmaxPrivatestatsSignCredentialRPC'
        readonly opName: 'SignCredential'
        readonly xmlns: 'privatestats'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'privatestats'
            readonly id: string
            readonly type: 'get'
            readonly to: 's.whatsapp.net'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ErrorRetry'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly type: 'result'
                readonly from: string
            }
            readonly children: {
                readonly sign_credential: {
                    readonly tag: 'sign_credential'
                    readonly attrs: {
                        readonly t: number
                    }
                    readonly children: {
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
                        readonly signed_credential: {
                            readonly tag: 'signed_credential'
                            readonly content: Uint8Array
                        }
                        readonly acs_public_key: {
                            readonly tag: 'acs_public_key'
                            readonly content: Uint8Array
                        }
                        readonly project_name: {
                            readonly tag: 'project_name'
                            readonly content: string
                        }
                    }
                }
            }
        } }
    }
    readonly StateExists: {
        readonly module: 'WASmaxWaffleStateExistsRPC'
        readonly opName: 'StateExists'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '142'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly StatusReport: {
        readonly module: 'WASmaxSpamStatusReportRPC'
        readonly opName: 'StatusReport'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'set'
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'spam'
        }
        readonly children: {
            readonly spam_list: {
                readonly tag: 'spam_list'
                readonly attrs: {
                    readonly jid: string
                    readonly spam_flow: '1_1_old_spam_banner_block' | '1_1_spam_banner_report' | 'account_info_report' | 'account_info_report_as_guest_user' | 'biz_spam_banner_block' | 'block_dialog' | 'chat_fmx_card_report_as_guest_user' | 'chat_fmx_card_safety_tools_report' | 'chat_fmx_card_safety_tools_report_suspicious' | 'chat_list_block' | 'chat_list_noinsub_block' | 'comment_actions_bottom_sheet' | 'community_home' | 'extension_menu_report' | 'group_chatlist_leave_report_upsell' | 'group_fmx_card_leave' | 'group_fmx_card_leave_non_suspicious' | 'group_info_leave_report_upsell' | 'group_info_report' | 'group_overflow_menu_leave_report_upsell' | 'group_safety_check_bottom_sheet' | 'group_spam_banner_report' | 'media_viewer' | 'message_menu' | 'newsletter_info_report' | 'newsletter_question_response_report' | 'notification_block' | 'overflow_menu_block' | 'overflow_menu_report' | 'status_post_report'
                    readonly reportee: string
                    readonly is_known_chat: boolean
                    readonly reason?: string
                    readonly business_discovery_entry_point?: string
                    readonly business_discovery_timestamp?: number
                    readonly first_message?: string
                    readonly business_discovery_id?: string
                }
                readonly children: {
                    readonly message: {
                        readonly tag: 'message'
                        readonly attrs: {
                            readonly from: string
                            readonly mediatype?: string
                            readonly local_message_type?: number
                            readonly reported_push_name: string
                            readonly server_id: number
                            readonly response_server_id: string
                            readonly v: '2'
                            readonly protocol_v: number
                            readonly participant: string
                            readonly participant_type?: string
                            readonly member_tag?: string
                            readonly member_tag_ts_s?: number
                            readonly extension_id: string
                            readonly session_id: string
                            readonly t: number
                            readonly name: string
                            readonly entry_point?: string
                            readonly edit: '1'
                            readonly to: string
                        }
                        readonly children: {
                            readonly meta: {
                                readonly tag: 'meta'
                                readonly attrs: {
                                    readonly placeholder_type: 'call'
                                }
                            }
                            readonly iab: {
                                readonly tag: 'iab'
                                readonly attrs: {
                                    readonly reported_link: string
                                }
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
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            }
                            readonly reporting_content: {
                                readonly tag: 'reporting_content'
                                readonly content: Uint8Array
                            } | undefined
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
                            readonly reporting_additional_info: {
                                readonly tag: 'reporting_additional_info'
                                readonly attrs: {
                                    readonly text: string
                                }
                            } | undefined
                            readonly franking: {
                                readonly tag: 'franking'
                                readonly children: {
                                    readonly reporting_tag: {
                                        readonly tag: 'reporting_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly data: {
                                readonly tag: 'data'
                                readonly content: Uint8Array
                            }
                            readonly hsm: {
                                readonly tag: 'hsm'
                                readonly attrs: {
                                    readonly tid: string
                                }
                            }
                            readonly automated: {
                                readonly tag: 'automated'
                            }
                            readonly url_text: {
                                readonly tag: 'url_text'
                            }
                            readonly url_number: {
                                readonly tag: 'url_number'
                            }
                            readonly multicast: {
                                readonly tag: 'multicast'
                            }
                        }
                    }
                    readonly biz_api_report: {
                        readonly tag: 'biz_api_report'
                        readonly attrs: {
                            readonly known_account: string
                            readonly message_report: string
                        }
                    }
                }
            }
            readonly frx: {
                readonly tag: 'frx'
                readonly children: {
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
                    readonly context: {
                        readonly tag: 'context'
                    }
                    readonly parameters: {
                        readonly tag: 'parameters'
                    } | undefined
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
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
    readonly StatusReportV2: {
        readonly module: 'WASmaxSpamStatusReportV2RPC'
        readonly opName: 'StatusReportV2'
        readonly xmlns: 'spam'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly id: string
            readonly type: 'set'
            readonly to: 's.whatsapp.net'
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
                readonly id: string
                readonly from?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from?: string
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
    readonly SubGroupSuggestionsAction: {
        readonly module: 'WASmaxGroupsSubGroupSuggestionsActionRPC'
        readonly opName: 'SubGroupSuggestionsAction'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'ClientError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
                readonly addressing_mode?: 'lid' | 'pn'
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
                                        readonly jid: string
                                        readonly creator_pn?: string
                                        readonly error?: '404'
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
                                        readonly jid: string
                                        readonly creator_pn?: string
                                        readonly error?: '404'
                                        readonly phone_number?: string
                                        readonly username?: string
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
                                        readonly error?: '404'
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
    readonly Subscribe: {
        readonly module: 'WASmaxPresenceSubscribeRPC'
        readonly opName: 'Subscribe'
        readonly xmlns: null
        readonly type: 'subscribe'
        readonly request: {
        readonly tag: 'presence'
        readonly attrs: {
            readonly type: 'subscribe'
            readonly to: string
            readonly name?: string
            readonly context?: string
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
    readonly SubscribeToLiveUpdates: {
        readonly module: 'WASmaxNewslettersSubscribeToLiveUpdatesRPC'
        readonly opName: 'SubscribeToLiveUpdates'
        readonly xmlns: 'newsletter'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'newsletter'
            readonly id: string
            readonly type: 'set'
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
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'bad-request'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id?: string
                readonly from?: string
                readonly type?: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text: 'internal-server-error'
                        readonly code: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly SyncPrivacySetting: {
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
                readonly to?: string
                readonly type: 'business'
                readonly t: number
                readonly id: string
                readonly offline?: number
            }
            readonly children: {
                readonly privacy: {
                    readonly tag: 'privacy'
                    readonly children: {
                        readonly smb_data_sharing_with_meta_consent: {
                            readonly tag: 'smb_data_sharing_with_meta_consent'
                            readonly attrs: {
                                readonly value: 'false' | 'notset' | 'true'
                            }
                        }
                    }
                }
            }
        } }
    }
    readonly UnlinkGroups: {
        readonly module: 'WASmaxGroupsUnlinkGroupsRPC'
        readonly opName: 'UnlinkGroups'
        readonly xmlns: 'w:g2'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: string
            readonly xmlns: 'w:g2'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'internal-server-error'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
                                readonly jid: string
                                readonly remove_orphaned_members?: 'true'
                                readonly error?: '400'
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly UpdateBlockList: {
        readonly module: 'WASmaxBlocklistsUpdateBlockListRPC'
        readonly opName: 'UpdateBlockList'
        readonly xmlns: 'blocklist'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'blocklist'
            readonly type: 'set'
            readonly id: string
        }
        readonly children: {
            readonly item: {
                readonly tag: 'item'
                readonly attrs: {
                    readonly dhash?: string
                    readonly action: 'block'
                    readonly jid: string
                    readonly country_code?: string
                }
                readonly children: {
                    readonly biz_opt_out: {
                        readonly tag: 'biz_opt_out'
                        readonly attrs: {
                            readonly reason?: string
                            readonly reason_description?: string
                            readonly entry_point?: string
                            readonly first_message?: string
                            readonly business_discovery_entry_point?: string
                            readonly business_discovery_timestamp?: number
                            readonly business_discovery_id?: string
                        }
                    } | undefined
                }
            }
            readonly entry_point: {
                readonly tag: 'entry_point'
                readonly attrs: {
                    readonly source: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'CAPISuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly matched: 'false'
                        readonly c_dhash?: string
                        readonly dhash: string
                        readonly addressing_mode: 'lid'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly jid?: string
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly username?: string
                                readonly pn_jid?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly unknown_identifier?: 'true'
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly addressing_mode?: 'lid' | 'pn'
                        readonly text?: 'not-acceptable'
                        readonly code?: number
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
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly matched: 'false'
                        readonly c_dhash?: string
                        readonly dhash: string
                        readonly addressing_mode: 'lid'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly jid: string
                                readonly active?: 'true'
                                readonly country_code?: string
                                readonly username?: string
                                readonly pn_jid?: string
                                readonly display_name?: string
                                readonly guest_name?: string
                                readonly unknown_identifier?: 'true'
                            }
                        }>
                    }
                }
            }
        } }
        | { readonly variant: 'ServerError'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'feature-not-implemented'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly matched: 'true'
                        readonly dhash: string
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMismatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly matched: 'false'
                        readonly c_dhash?: string
                        readonly dhash: string
                        readonly addressing_mode?: 'pn'
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly jid: string
                                readonly display_name?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly UpdateOptOutList: {
        readonly module: 'WASmaxBlocklistsUpdateOptOutListRPC'
        readonly opName: 'UpdateOptOutList'
        readonly xmlns: 'optoutlist'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly to: 's.whatsapp.net'
            readonly xmlns: 'optoutlist'
            readonly type: 'set'
            readonly id: string
        }
        readonly children: {
            readonly item: {
                readonly tag: 'item'
                readonly attrs: {
                    readonly jid: string
                    readonly category: string
                    readonly action: 'block' | 'unblock'
                    readonly dhash?: string
                    readonly reason?: string
                    readonly entry_point?: string
                    readonly signup_id?: string
                    readonly duration?: number
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'not-acceptable'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'feature-not-implemented'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'SuccessWithMatch'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly from: string
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly matched: 'true'
                        readonly dhash: string
                    }
                    readonly children: {
                        readonly item: {
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly action?: 'block' | 'unblock'
                                readonly category?: string
                                readonly expiry_at?: number
                                readonly biz_opt_out_brand_id?: string
                                readonly biz_jid?: string
                                readonly biz_opt_out_jid?: string
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
                readonly type: 'result'
                readonly id: string
            }
            readonly children: {
                readonly list: {
                    readonly tag: 'list'
                    readonly attrs: {
                        readonly matched: 'false'
                        readonly c_dhash?: string
                        readonly dhash: string
                    }
                    readonly children: {
                        readonly item: ReadonlyArray<{
                            readonly tag: 'item'
                            readonly attrs: {
                                readonly action?: 'block' | 'unblock'
                                readonly category?: string
                                readonly expiry_at?: number
                                readonly biz_opt_out_brand_id?: string
                                readonly biz_jid?: string
                                readonly biz_opt_out_jid?: string
                            }
                        }>
                    }
                }
            }
        } }
    }
    readonly UpdatePreference: {
        readonly module: 'WASmaxBizMsgUserFeedbackUpdatePreferenceRPC'
        readonly opName: 'UpdatePreference'
        readonly xmlns: 'w:biz:msg_feedback'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'w:biz:msg_feedback'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
        }
        readonly children: {
            readonly user_feedback: {
                readonly tag: 'user_feedback'
                readonly attrs: {
                    readonly action: string
                    readonly jid: string
                    readonly feedback?: string
                }
            }
        }
    }
        readonly response:
        | { readonly variant: 'InvalidRequest'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'not-acceptable'
                        readonly code?: number
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
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'feature-not-implemented'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'result'
            }
        } }
    }
    readonly UploadAdMedia: {
        readonly module: 'WASmaxBizCtwaNativeAdUploadAdMediaRPC'
        readonly opName: 'UploadAdMedia'
        readonly xmlns: 'fb:thrift_iq'
        readonly type: 'set'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'fb:thrift_iq'
            readonly smax_id: '74'
            readonly from?: string
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'set'
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
                readonly id: string
                readonly from?: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly to?: string
                readonly id: string
                readonly from: string
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
    readonly WFPing: {
        readonly module: 'WASmaxWaffleWFPingRPC'
        readonly opName: 'WFPing'
        readonly xmlns: 'waffle'
        readonly type: 'get'
        readonly request: {
        readonly tag: 'iq'
        readonly attrs: {
            readonly xmlns: 'waffle'
            readonly smax_id: '83'
            readonly to: 's.whatsapp.net'
            readonly id: string
            readonly type: 'get'
        }
        readonly children: {
            readonly encryption_metadata: {
                readonly tag: 'encryption_metadata'
                readonly attrs: {
                    readonly version: '1'
                    readonly algorithm: 'rsa2048'
                }
                readonly children: {
                    readonly encrypted_key: {
                        readonly tag: 'encrypted_key'
                        readonly content: Uint8Array
                    }
                    readonly nonce: {
                        readonly tag: 'nonce'
                        readonly content: Uint8Array
                    }
                    readonly encrypted_data: {
                        readonly tag: 'encrypted_data'
                        readonly content: Uint8Array
                    }
                    readonly auth_tag: {
                        readonly tag: 'auth_tag'
                        readonly content: Uint8Array
                    }
                }
            }
            readonly timestamp: {
                readonly tag: 'timestamp'
                readonly content: number
            }
            readonly fbid: {
                readonly tag: 'fbid'
            }
        }
    }
        readonly response:
        | { readonly variant: 'Error'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
                readonly type: 'error'
            }
            readonly children: {
                readonly error: {
                    readonly tag: 'error'
                    readonly attrs: {
                        readonly text?: 'bad-request'
                        readonly code?: number
                        readonly ndc?: 'false' | 'true'
                        readonly npr?: 'false' | 'true'
                    }
                }
            }
        } }
        | { readonly variant: 'Success'; readonly value: {
            readonly tag: 'iq'
            readonly attrs: {
                readonly id: string
                readonly from: string
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
    readonly WaitingRoomToggleCallLink: {
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
                readonly from: 'call'
                readonly type: 'waiting_room_toggle'
                readonly to?: string
                readonly id: string
                readonly class: 'call'
                readonly error?: string
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
                readonly from: 'call'
                readonly type: 'waiting_room_toggle'
                readonly error: string
                readonly to?: string
                readonly id: string
                readonly class: 'call'
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
                readonly id: string
                readonly class: 'call' | 'message' | 'notification' | 'receipt'
                readonly to: string
                readonly type: 'account_sync' | 'business' | 'companion_reg_refresh' | 'contacts' | 'digital_commerce_subscription' | 'disappearing_mode' | 'mediaretry' | 'mex' | 'offer_notice' | 'pay' | 'picture' | 'privacy_token' | 'psa' | 'registration' | 'retry' | 'server' | 'server_sync' | 'status' | 'text' | 'w:gp2'
                readonly participant?: string
                readonly error?: number
                readonly recipient?: string
                readonly from: string
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
                readonly from: string
                readonly sender_lid?: string
                readonly platform?: string
                readonly version?: number
                readonly offline?: number
                readonly t?: number
                readonly e?: number
                readonly id: string
                readonly to: string
            }
            readonly children: {
                readonly '*': {
                    readonly tag: 'offer' | 'offer_receipt' | 'accept' | 'reject' | 'terminate' | 'transport' | 'offer_ack' | 'offer_nack' | 'relay_latency' | 'relay_election' | 'interruption' | 'mute' | 'preaccept' | 'accept_receipt' | 'video_state' | 'notify' | 'group_info' | 'enc_rekey' | 'peer_state' | 'video_state_ack' | 'flow_control' | 'web_client' | 'accept_ack' | 'group_update' | 'offer_notice'
                    readonly attrs: {
                        readonly 'call-id': string
                        readonly 'call-creator': string
                        readonly 'group-jid'?: string
                        readonly caller_pn?: string
                        readonly username?: string
                        readonly caller_country_code?: string
                        readonly notify?: string
                    }
                    readonly children: {
                        readonly group_info: {
                            readonly tag: 'group_info'
                            readonly children: {
                                readonly '*': ReadonlyArray<{
                                    readonly tag: '*'
                                    readonly attrs: {
                                        readonly push_name?: string
                                        readonly guest_name?: string
                                        readonly jid: string
                                        readonly user_pn?: string
                                        readonly username?: string
                                        readonly account_kind?: string
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
                readonly enc: {
                    readonly tag: 'enc'
                    readonly attrs: {
                        readonly v: '2'
                        readonly type: 'msg' | 'msmsg' | 'pkmsg' | 'skmsg'
                        readonly count: number
                    }
                    readonly content: Uint8Array
                }
                readonly 'device-identity': {
                    readonly tag: 'device-identity'
                    readonly content: Uint8Array
                }
                readonly link_create: {
                    readonly tag: 'link_create'
                    readonly attrs: {
                        readonly media?: 'audio' | 'video'
                        readonly 'call-creator'?: string
                        readonly 'call-id'?: string
                        readonly link_creator_username?: string
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
                        readonly token: string
                        readonly media: 'audio' | 'video'
                        readonly action?: 'link_edit' | 'preview'
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
                readonly test: {
                    readonly tag: 'test'
                    readonly attrs: {
                        readonly config?: string
                    }
                }
                readonly composing: {
                    readonly tag: 'composing'
                    readonly attrs: {
                        readonly media?: 'audio'
                    }
                }
                readonly paused: {
                    readonly tag: 'paused'
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
                readonly reason: number
                readonly location: string
                readonly code?: number
                readonly expire?: number
                readonly message?: string
                readonly url?: string
                readonly logout_message_header?: string
                readonly logout_message_subtext?: string
                readonly logout_message_locale?: string
            }
        }
    }
    readonly ib: {
        readonly tag: 'ib'
        readonly handler: { readonly module: 'WAWebHandleInfoBulletin'; readonly method: 'default' }
        readonly node: {
            readonly tag: 'ib'
            readonly children: {
                readonly dirty: ReadonlyArray<{
                    readonly tag: 'dirty'
                    readonly attrs: {
                        readonly type: 'groups' | 'account_sync' | 'syncd_app_state' | 'newsletter_metadata'
                        readonly timestamp: number
                    }
                    readonly children: {
                        readonly '*': ReadonlyArray<{
                            readonly tag: 'devices' | 'picture' | 'privacy' | 'blocklist' | 'notice'
                        }>
                    }
                }>
                readonly '*': ReadonlyArray<{
                    readonly tag: '*'
                }>
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
                        readonly watermark: {
                            readonly tag: 'watermark'
                            readonly children: {
                                readonly item: ReadonlyArray<{
                                    readonly tag: 'item'
                                    readonly attrs: {
                                        readonly from: string
                                        readonly sts?: number
                                    }
                                }>
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
                            }
                        }>
                    }
                }
                readonly edge_routing: {
                    readonly tag: 'edge_routing'
                    readonly children: {
                        readonly routing_info: {
                            readonly tag: 'routing_info'
                            readonly content: Uint8Array
                        }
                        readonly dns_domain: {
                            readonly tag: 'dns_domain'
                            readonly content: 'fb' | 'sl'
                        } | undefined
                    }
                }
                readonly recovery_nonce: {
                    readonly tag: 'recovery_nonce'
                    readonly attrs: {
                        readonly code: string
                        readonly use_case: number
                    }
                }
                readonly offline: {
                    readonly tag: 'offline'
                    readonly attrs: {
                        readonly count: number
                    }
                } | undefined
                readonly priority_offline_complete: {
                    readonly tag: 'priority_offline_complete'
                } | undefined
                readonly offline_preview: {
                    readonly tag: 'offline_preview'
                    readonly attrs: {
                        readonly count: number
                        readonly message: number
                        readonly receipt: number
                        readonly notification: number
                        readonly call: number
                    }
                } | undefined
                readonly client_expiration: {
                    readonly tag: 'client_expiration'
                    readonly attrs: {
                        readonly t?: number
                    }
                }
                readonly offline_batch: {
                    readonly tag: 'offline_batch'
                    readonly attrs: {
                        readonly count: number
                    }
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
                    readonly xmlns: 'md'
                    readonly id: string
                    readonly type: 'set'
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
                    readonly xmlns: 'md'
                    readonly id: string
                    readonly type: 'set'
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
                            readonly 'encryption-metadata': {
                                readonly tag: 'encryption-metadata'
                                readonly attrs: {
                                    readonly version: '1'
                                    readonly algorithm: 'aes-256-gcm'
                                }
                                readonly children: {
                                    readonly encrypted_key: {
                                        readonly tag: 'encrypted_key'
                                        readonly content: Uint8Array
                                    }
                                    readonly nonce: {
                                        readonly tag: 'nonce'
                                        readonly content: Uint8Array
                                    }
                                    readonly encrypted_data: {
                                        readonly tag: 'encrypted_data'
                                        readonly content: Uint8Array
                                    }
                                    readonly auth_tag: {
                                        readonly tag: 'auth_tag'
                                        readonly content: Uint8Array
                                    }
                                }
                            } | undefined
                            readonly 'device-identity': {
                                readonly tag: 'device-identity'
                                readonly content: Uint8Array
                            }
                            readonly device: {
                                readonly tag: 'device'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly lid?: string
                                    readonly beta?: 'false' | 'true'
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
            readonly 'from-is-not-newsletter': {
                readonly handler: { readonly module: 'WAWebHandleMsg'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'message'
                readonly attrs: {
                    readonly to?: string
                    readonly from: string
                    readonly participant?: string
                    readonly type: 'text' | 'media' | 'medianotify' | 'pay' | 'poll' | 'reaction' | 'event'
                    readonly t: number
                    readonly verified_level?: 'high' | 'low' | 'unknown'
                    readonly verified_name?: string
                    readonly recipient: string
                    readonly id: string
                    readonly phash: string
                    readonly edit?: '1' | '2' | '3' | '7' | '8'
                    readonly peer_recipient_lid?: string
                    readonly peer_recipient_pn?: string
                    readonly peer_recipient_username?: string
                    readonly device_fanout?: 'false'
                    readonly recipient_pn?: string
                    readonly addressing_mode?: 'lid' | 'pn'
                    readonly category?: 'peer'
                    readonly push_priority: string
                    readonly privacy_sensitive?: boolean
                    readonly server_id: number
                }
                readonly children: {
                    readonly enc: ReadonlyArray<{
                        readonly tag: 'enc'
                        readonly attrs: {
                            readonly type: 'skmsg' | 'pkmsg' | 'msg' | 'msmsg'
                            readonly mediatype?: string
                            readonly count?: number
                            readonly 'decrypt-fail'?: 'hide'
                            readonly state?: 'false' | 'true'
                            readonly v: '2'
                            readonly native_flow_name?: string
                        }
                        readonly content: Uint8Array
                    }>
                    readonly bot: {
                        readonly tag: 'bot'
                        readonly attrs: {
                            readonly sender_timestamp_ms?: string
                            readonly edit_target_id?: string
                            readonly edit?: 'first' | 'full' | 'inner' | 'last'
                            readonly biz_bot?: '1' | '3'
                            readonly type?: 'command' | 'prompt' | 'voice'
                            readonly persona_type?: '1p' | 'default' | 'ugc'
                            readonly agent_engagement_type?: string
                            readonly local_automated_type?: '1p_partial' | '3p_full' | 'unknown'
                            readonly client_thread_id?: string
                            readonly mode_selection?: string
                            readonly mode_selected?: string
                            readonly is_lid?: 'true'
                        }
                    } | undefined
                    readonly unavailable: {
                        readonly tag: 'unavailable'
                        readonly attrs: {
                            readonly hosted?: boolean
                            readonly type?: 'view_once'
                        }
                    } | undefined
                    readonly meta: {
                        readonly tag: 'meta'
                        readonly attrs: {
                            readonly polltype?: 'creation' | 'quiz_creation' | 'vote' | 'result_snapshot' | 'edit'
                            readonly status_mentioned?: boolean
                            readonly origin?: 'ctwa'
                            readonly appdata?: 'default' | 'member_tag' | 'group_history'
                            readonly thread_msg_id?: string
                            readonly thread_msg_sender_jid?: string
                            readonly target_id?: string
                            readonly target_sender_jid?: string
                            readonly target_chat_jid?: string
                            readonly target_chat_jid_lid?: string
                            readonly capi?: boolean
                            readonly event_type?: 'creation' | 'edit' | 'response'
                            readonly context_source?: string
                            readonly read?: boolean
                            readonly is_group_status?: boolean
                            readonly session_scope?: 'default' | 'status'
                            readonly type?: string
                            readonly st?: number
                            readonly metering_type: 'smb_mm'
                            readonly destination_id?: string
                            readonly sender_intent?: 'hosted'
                            readonly view_once?: 'true'
                            readonly conversation_thread_id?: string
                            readonly tag_reason?: string
                            readonly status_setting: string
                            readonly questiontype: 'response'
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
                    readonly url_number: {
                        readonly tag: 'url_number'
                    } | undefined
                    readonly url_text: {
                        readonly tag: 'url_text'
                    } | undefined
                    readonly biz: {
                        readonly tag: 'biz'
                        readonly attrs: {
                            readonly actual_actors?: number
                            readonly host_storage?: number
                            readonly privacy_mode_ts?: number
                            readonly native_flow_name?: string
                            readonly campaign_id?: string
                        }
                        readonly children: {
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
                            readonly buttons: {
                                readonly tag: 'buttons'
                            } | undefined
                            readonly list: {
                                readonly tag: 'list'
                            } | undefined
                        }
                    } | undefined
                    readonly verified_name: {
                        readonly tag: 'verified_name'
                        readonly content: Uint8Array
                    } | undefined
                    readonly hsm: {
                        readonly tag: 'hsm'
                    } | undefined
                    readonly pay: {
                        readonly tag: 'pay'
                        readonly attrs: {
                            readonly type: 'send' | 'request' | 'futureproof' | 'request-decline' | 'request-cancel' | 'invite'
                            readonly receiver?: string
                        }
                    } | undefined
                    readonly transaction: {
                        readonly tag: 'transaction'
                        readonly attrs: {
                            readonly sender: string
                            readonly receiver: string
                            readonly group?: string
                            readonly 'message-id': string
                            readonly 'transaction-type': string
                            readonly status: string
                            readonly ts: number
                            readonly service?: string
                        }
                    } | undefined
                    readonly reporting: {
                        readonly tag: 'reporting'
                        readonly children: {
                            readonly reporting_token: {
                                readonly tag: 'reporting_token'
                                readonly attrs: {
                                    readonly v: number
                                }
                                readonly content: Uint8Array
                            } | undefined
                            readonly reporting_tag: {
                                readonly tag: 'reporting_tag'
                                readonly content: Uint8Array
                            } | undefined
                        }
                    } | undefined
                    readonly 'device-identity': {
                        readonly tag: 'device-identity'
                        readonly content: Uint8Array
                    } | undefined
                    readonly rcat: {
                        readonly tag: 'rcat'
                        readonly content: Uint8Array
                    } | undefined
                    readonly plaintext: {
                        readonly tag: 'plaintext'
                        readonly content: Uint8Array
                    } | undefined
                    readonly reaction: {
                        readonly tag: 'reaction'
                        readonly attrs: {
                            readonly code: string
                        }
                    }
                }
            }
            }
            readonly 'from-is-newsletter': {
                readonly handler: { readonly module: 'WAWebHandleNewsletterMsg'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'message'
                readonly attrs: {
                    readonly from: string
                    readonly id: string
                    readonly server_id: number
                    readonly t: number
                    readonly is_sender?: 'true'
                    readonly type?: 'text'
                    readonly edit: '3' | '7'
                    readonly offline: number
                    readonly to: string
                    readonly phash: string
                    readonly participant: string
                    readonly peer_recipient_lid?: string
                    readonly peer_recipient_pn?: string
                    readonly peer_recipient_username?: string
                    readonly device_fanout?: 'false'
                    readonly recipient_pn?: string
                    readonly addressing_mode?: 'lid' | 'pn'
                    readonly recipient?: string
                    readonly category?: 'peer'
                    readonly push_priority: string
                    readonly privacy_sensitive?: boolean
                }
                readonly children: {
                    readonly meta: {
                        readonly tag: 'meta'
                        readonly attrs: {
                            readonly original_msg_t: number
                            readonly metering_type: 'smb_mm'
                            readonly type: 'scheduled_message'
                            readonly st: string
                            readonly origin?: 'ctwa'
                            readonly destination_id?: string
                            readonly sender_intent?: 'hosted'
                            readonly polltype?: 'creation' | 'edit' | 'quiz_creation' | 'result_snapshot' | 'vote'
                            readonly event_type?: 'creation' | 'edit' | 'response'
                            readonly thread_msg_id?: string
                            readonly thread_msg_sender_jid?: string
                            readonly appdata?: 'default' | 'group_history' | 'member_tag'
                            readonly view_once?: 'true'
                            readonly conversation_thread_id?: string
                            readonly tag_reason?: string
                            readonly status_setting: string
                            readonly session_scope?: 'status'
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
                    readonly votes: {
                        readonly tag: 'votes'
                        readonly children: {
                            readonly vote: ReadonlyArray<{
                                readonly tag: 'vote'
                                readonly content: Uint8Array
                            }>
                        }
                    }
                    readonly rcat: {
                        readonly tag: 'rcat'
                        readonly content: Uint8Array
                    }
                }
            }
            }
        }
    }
    readonly notification: {
        readonly tag: 'notification'
        readonly discriminator: 'type'
        readonly variants: {
            readonly server_sync: {
                readonly handler: { readonly module: 'WAWebHandleServerSyncNotification'; readonly method: 'handleServerSyncNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly offline?: number
                    readonly from: string
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
            readonly picture: {
                readonly handler: { readonly module: 'WAWebHandleProfilePicNotification'; readonly method: 'handleProfilePicNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
                    readonly t: number
                    readonly type: 'picture'
                }
                readonly children: {
                    readonly delete: {
                        readonly tag: 'delete'
                        readonly attrs: {
                            readonly jid: string
                            readonly author?: string
                            readonly id: number
                            readonly hash: string
                        }
                    }
                    readonly set: {
                        readonly tag: 'set'
                        readonly attrs: {
                            readonly jid: string
                            readonly author?: string
                            readonly id: number
                            readonly hash: string
                        }
                    } | undefined
                    readonly request: {
                        readonly tag: 'request'
                        readonly attrs: {
                            readonly jid: string
                            readonly author?: string
                            readonly id: number
                            readonly hash: string
                        }
                    } | undefined
                    readonly set_avatar: {
                        readonly tag: 'set_avatar'
                        readonly attrs: {
                            readonly jid: string
                            readonly author?: string
                            readonly id: number
                            readonly hash: string
                        }
                    } | undefined
                }
            }
            }
            readonly business: {
                readonly handler: { readonly module: 'WAWebHandleBusinessNotification'; readonly method: 'handleBusinessNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
                    readonly t: number
                    readonly type: 'business'
                }
                readonly children: {
                    readonly feature_flags: {
                        readonly tag: 'feature_flags'
                        readonly children: {
                            readonly feature_flag: ReadonlyArray<{
                                readonly tag: 'feature_flag'
                                readonly attrs: {
                                    readonly name: 'ADS_CREDIT' | 'BUSINESS_BROADCAST' | 'BUSINESS_SEARCH' | 'CHAT_ASSIGNMENT' | 'CUSTOM_APP_ICON' | 'CUSTOM_APP_THEME' | 'CUSTOM_RINGTONES' | 'CUSTOM_URL' | 'ENHANCED_LISTS' | 'IMAGE_GEN' | 'IMAGINE_IMAGE' | 'IMAGINE_VIDEO' | 'MD_EXTENSION' | 'NEW_CHATS_LIMIT' | 'NEXT_GEN_WA_BENEFIT' | 'PIN_MORE_CHATS' | 'PREMIUM_MESSAGE_STICKERS' | 'PROTECTED_BUSINESS_ACCOUNT' | 'THINK_HARD' | 'VERIFIED_CHANNEL'
                                    readonly enabled: boolean
                                    readonly expiration_time?: number
                                    readonly limit?: number
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
                                    readonly status: string
                                    readonly subscription_end_time?: number
                                    readonly subscription_creation_time?: number
                                    readonly id: string
                                    readonly subscription_tier?: number
                                    readonly source?: 'AURA' | 'BLUE' | 'META_NOVA' | 'PREMIUM'
                                    readonly subscription_start_time?: number
                                }
                            }>
                        }
                    }
                    readonly remove: {
                        readonly tag: 'remove'
                        readonly attrs: {
                            readonly jid?: string
                            readonly hash: string
                        }
                    }
                    readonly profile: {
                        readonly tag: 'profile'
                        readonly attrs: {
                            readonly hash?: string
                        }
                    }
                    readonly verified_name: {
                        readonly tag: 'verified_name'
                        readonly attrs: {
                            readonly verified_level: 'high' | 'low' | 'unknown'
                            readonly serial?: string
                            readonly actual_actors?: number
                            readonly host_storage?: number
                            readonly privacy_mode_ts?: number
                            readonly jid?: string
                            readonly hash: string
                        }
                        readonly content: Uint8Array
                    } | undefined
                    readonly product_catalog: {
                        readonly tag: 'product_catalog'
                        readonly children: {
                            readonly product: ReadonlyArray<{
                                readonly tag: 'product'
                                readonly children: {
                                    readonly id: {
                                        readonly tag: 'id'
                                        readonly content: string
                                    }
                                }
                            }>
                            readonly collection: ReadonlyArray<{
                                readonly tag: 'collection'
                                readonly attrs: {
                                    readonly id: string
                                }
                                readonly children: {
                                    readonly status_info: {
                                        readonly tag: 'status_info'
                                        readonly children: {
                                            readonly reject_reason: {
                                                readonly tag: 'reject_reason'
                                                readonly content: string
                                            } | undefined
                                            readonly commerce_url: {
                                                readonly tag: 'commerce_url'
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
                        }
                    } | undefined
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
                                            readonly local_link?: string
                                            readonly local_android_link?: string
                                        }
                                    } | undefined
                                    readonly native_action: ReadonlyArray<{
                                        readonly tag: 'native_action'
                                        readonly attrs: {
                                            readonly platform: string
                                            readonly min_app_version: string
                                            readonly local_link: string
                                            readonly universal_link?: string
                                        }
                                    }>
                                    readonly content: {
                                        readonly tag: 'content'
                                        readonly attrs: {
                                            readonly locale: string
                                        }
                                        readonly children: {
                                            readonly localised_heading: {
                                                readonly tag: 'localised_heading'
                                                readonly attrs: {
                                                    readonly value: string
                                                }
                                                readonly children: {
                                                    readonly localisation_metadata: {
                                                        readonly tag: 'localisation_metadata'
                                                        readonly attrs: {
                                                            readonly uid: string
                                                            readonly translation_project: string
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
                                            readonly localised_body: {
                                                readonly tag: 'localised_body'
                                                readonly attrs: {
                                                    readonly value: string
                                                }
                                                readonly children: {
                                                    readonly localisation_metadata: {
                                                        readonly tag: 'localisation_metadata'
                                                        readonly attrs: {
                                                            readonly uid: string
                                                            readonly translation_project: string
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
                                                            readonly uid: string
                                                            readonly translation_project: string
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
                                            readonly heading: {
                                                readonly tag: 'heading'
                                                readonly content: string
                                            }
                                            readonly body: {
                                                readonly tag: 'body'
                                                readonly content: string
                                            }
                                            readonly highlight: {
                                                readonly tag: 'highlight'
                                                readonly content: string
                                            }
                                        }
                                    }
                                    readonly config: {
                                        readonly tag: 'config'
                                        readonly attrs: {
                                            readonly expires_at: number
                                            readonly display: 'info' | 'warning'
                                            readonly revoked: 'false' | 'true'
                                        }
                                    }
                                }
                            } | undefined
                        }
                    }
                    readonly privacy: {
                        readonly tag: 'privacy'
                        readonly children: {
                            readonly smb_data_sharing_with_meta_consent: {
                                readonly tag: 'smb_data_sharing_with_meta_consent'
                                readonly attrs: {
                                    readonly value: 'false' | 'notset' | 'true'
                                }
                            }
                        }
                    }
                    readonly wa_ad_account_nonce: {
                        readonly tag: 'wa_ad_account_nonce'
                        readonly content: string
                    }
                    readonly mm_campaign: {
                        readonly tag: 'mm_campaign'
                        readonly attrs: {
                            readonly ad_id?: string
                            readonly ad_group_id?: string
                            readonly ad_creative_id?: string
                            readonly status: 'INTEGRITY_NOT_CLEARED' | 'OK'
                        }
                    }
                }
            }
            }
            readonly digital_commerce_subscription: {
                readonly handler: { readonly module: 'WAWebHandleDigitalCommerceSubscriptionNotification'; readonly method: 'handleDigitalCommerceSubscriptionNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
                    readonly type: 'digital_commerce_subscription'
                }
                readonly children: {
                    readonly feature_flags: {
                        readonly tag: 'feature_flags'
                        readonly children: {
                            readonly feature_flag: ReadonlyArray<{
                                readonly tag: 'feature_flag'
                                readonly attrs: {
                                    readonly name: 'ADS_CREDIT' | 'BUSINESS_BROADCAST' | 'BUSINESS_SEARCH' | 'CHAT_ASSIGNMENT' | 'CUSTOM_APP_ICON' | 'CUSTOM_APP_THEME' | 'CUSTOM_RINGTONES' | 'CUSTOM_URL' | 'ENHANCED_LISTS' | 'IMAGE_GEN' | 'IMAGINE_IMAGE' | 'IMAGINE_VIDEO' | 'MD_EXTENSION' | 'NEW_CHATS_LIMIT' | 'NEXT_GEN_WA_BENEFIT' | 'PIN_MORE_CHATS' | 'PREMIUM_MESSAGE_STICKERS' | 'PROTECTED_BUSINESS_ACCOUNT' | 'THINK_HARD' | 'VERIFIED_CHANNEL'
                                    readonly enabled: boolean
                                    readonly expiration_time?: number
                                    readonly limit?: number
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
                                    readonly status: string
                                    readonly subscription_end_time?: number
                                    readonly subscription_creation_time?: number
                                    readonly id: string
                                    readonly subscription_tier?: number
                                    readonly source?: 'AURA' | 'BLUE' | 'META_NOVA' | 'PREMIUM'
                                    readonly subscription_start_time?: number
                                }
                            }>
                        }
                    }
                }
            }
            }
            readonly contacts: {
                readonly handler: { readonly module: 'WAWebHandleContactNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
                    readonly t: number
                    readonly type: 'contacts'
                }
                readonly children: {
                    readonly update: {
                        readonly tag: 'update'
                        readonly attrs: {
                            readonly jid?: string
                            readonly hash?: string
                        }
                    }
                    readonly add: {
                        readonly tag: 'add'
                        readonly content: Uint8Array
                    }
                    readonly remove: {
                        readonly tag: 'remove'
                        readonly attrs: {
                            readonly jid: string
                        }
                    }
                    readonly modify: {
                        readonly tag: 'modify'
                        readonly attrs: {
                            readonly new: string
                            readonly old: string
                            readonly new_lid?: string
                            readonly old_lid?: string
                        }
                    }
                    readonly sync: {
                        readonly tag: 'sync'
                        readonly attrs: {
                            readonly after: number
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
                    readonly type: 'devices'
                    readonly id: string
                    readonly from: string
                    readonly lid?: string
                }
                readonly children: {
                    readonly remove: {
                        readonly tag: 'remove'
                        readonly attrs: {
                            readonly hash: string
                        }
                        readonly children: {
                            readonly 'key-index-list': {
                                readonly tag: 'key-index-list'
                                readonly attrs: {
                                    readonly ts: number
                                }
                                readonly content: Uint8Array
                            } | undefined
                            readonly device: {
                                readonly tag: 'device'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly 'key-index'?: number
                                    readonly lid?: string
                                }
                            }
                        }
                    }
                    readonly add: {
                        readonly tag: 'add'
                        readonly attrs: {
                            readonly hash: string
                        }
                    } | undefined
                    readonly update: {
                        readonly tag: 'update'
                        readonly attrs: {
                            readonly hash: string
                        }
                    } | undefined
                }
            }
            }
            readonly disappearing_mode: {
                readonly handler: { readonly module: 'WAWebHandleDisappearingModeNotification'; readonly method: 'handleDisappearingModeNotificationJob' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
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
            readonly mediaretry: {
                readonly handler: { readonly module: 'WAWebHandleMediaRetryNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly participant?: string
                    readonly id: string
                    readonly type: 'mediaretry'
                }
                readonly children: {
                    readonly error: {
                        readonly tag: 'error'
                        readonly attrs: {
                            readonly code: number
                        }
                    } | undefined
                    readonly encrypt: {
                        readonly tag: 'encrypt'
                        readonly children: {
                            readonly enc_p: {
                                readonly tag: 'enc_p'
                                readonly content: Uint8Array
                            }
                            readonly enc_iv: {
                                readonly tag: 'enc_iv'
                                readonly content: Uint8Array
                            }
                        }
                    }
                }
            }
            }
            readonly 'encrypt/count': {
                readonly handler: { readonly module: 'WAWebHandlePreKeyLow'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'encrypt'
                    readonly id: string
                }
                readonly children: {
                    readonly count: {
                        readonly tag: 'count'
                        readonly attrs: {
                            readonly value: number
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
                    readonly type: 'encrypt'
                    readonly id: string
                }
                readonly children: {
                    readonly digest: {
                        readonly tag: 'digest'
                    }
                }
            }
            }
            readonly encrypt: {
                readonly handler: { readonly module: 'WAWebHandlePreKeyLow'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'encrypt'
                    readonly id: string
                }
                readonly children: {
                    readonly count: {
                        readonly tag: 'count'
                        readonly attrs: {
                            readonly value: number
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
                    readonly id: string
                    readonly from: string
                    readonly type: 'server'
                }
                readonly children: {
                    readonly log: {
                        readonly tag: 'log'
                        readonly attrs: {
                            readonly bug_id?: string
                            readonly is_bug_reporter?: boolean
                        }
                    }
                    readonly abprops: {
                        readonly tag: 'abprops'
                    } | undefined
                }
            }
            }
            readonly status: {
                readonly handler: { readonly module: 'WAWebHandleAboutNotification'; readonly method: 'handleAboutNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
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
            readonly account_sync: {
                readonly handler: { readonly module: 'WAWebHandleAccountSyncNotification'; readonly method: 'handleAccountSyncNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly t: number
                    readonly from: string
                    readonly type: 'account_sync'
                }
                readonly children: {
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
                            readonly text?: string
                            readonly ephemeral_duration_sec?: number
                            readonly last_update_time?: number
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
                    readonly blocklist: {
                        readonly tag: 'blocklist'
                        readonly children: {
                            readonly item: ReadonlyArray<{
                                readonly tag: 'item'
                                readonly attrs: {
                                    readonly username?: string
                                    readonly jid: string
                                }
                            }>
                        }
                    }
                    readonly tos: {
                        readonly tag: 'tos'
                        readonly children: {
                            readonly notice: ReadonlyArray<{
                                readonly tag: 'notice'
                                readonly attrs: {
                                    readonly state?: string
                                    readonly id: string
                                }
                            }>
                        }
                    }
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
                            readonly version?: number
                            readonly t: number
                        }
                    }
                    readonly user: {
                        readonly tag: 'user'
                        readonly attrs: {
                            readonly state?: 'AI available'
                        }
                    }
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
                    readonly privacy: {
                        readonly tag: 'privacy'
                    } | undefined
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
                                    readonly ts: number
                                    readonly expected_ts?: number
                                }
                                readonly content: Uint8Array
                            } | undefined
                        }
                    } | undefined
                    readonly picture: {
                        readonly tag: 'picture'
                    } | undefined
                }
            }
            }
            readonly pay: {
                readonly handler: { readonly module: 'WAWebPaymentNotificationHandler'; readonly method: 'handlePaymentNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'pay'
                    readonly id: string
                    readonly from: string
                    readonly t: number
                }
                readonly children: {
                    readonly invite: {
                        readonly tag: 'invite'
                        readonly attrs: {
                            readonly type?: string
                            readonly service?: string
                            readonly 'invite-used'?: '0' | '1'
                        }
                    }
                    readonly transaction: {
                        readonly tag: 'transaction'
                        readonly attrs: {
                            readonly sender: string
                            readonly receiver: string
                            readonly group?: string
                            readonly 'message-id': string
                            readonly 'transaction-type': string
                            readonly status: string
                            readonly ts: number
                            readonly service?: string
                        }
                    } | undefined
                }
            }
            }
            readonly 'psa/surfaces': {
                readonly handler: { readonly module: 'WAWebHandleQPSurfacesNotification'; readonly method: 'handleQPSurfacesNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly type: 'psa'
                    readonly t: number
                    readonly id: string
                    readonly offline?: number
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
                                                    readonly light: {
                                                        readonly tag: 'light'
                                                        readonly content: Uint8Array
                                                    } | undefined
                                                    readonly dark: {
                                                        readonly tag: 'dark'
                                                        readonly content: Uint8Array
                                                    } | undefined
                                                }
                                            } | undefined
                                            readonly primary_action: {
                                                readonly tag: 'primary_action'
                                                readonly attrs: {
                                                    readonly text: string
                                                    readonly universal_link?: string
                                                    readonly deep_link?: string
                                                }
                                            } | undefined
                                            readonly secondary_action: {
                                                readonly tag: 'secondary_action'
                                                readonly attrs: {
                                                    readonly text: string
                                                    readonly universal_link?: string
                                                    readonly deep_link?: string
                                                }
                                            } | undefined
                                            readonly colors: {
                                                readonly tag: 'colors'
                                                readonly children: {
                                                    readonly light: {
                                                        readonly tag: 'light'
                                                        readonly attrs: {
                                                            readonly background?: string
                                                            readonly highlight?: string
                                                        }
                                                    }
                                                    readonly dark: {
                                                        readonly tag: 'dark'
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
                                            readonly qp_config: {
                                                readonly tag: 'qp_config'
                                                readonly attrs: {
                                                    readonly template_name: string
                                                    readonly start_time_seconds: number
                                                    readonly end_time_seconds: number
                                                    readonly ttl_seconds: number
                                                    readonly dismissable: 'false' | 'true'
                                                    readonly force_pass: 'false' | 'true'
                                                    readonly surface_delay_time_seconds: number
                                                    readonly deterministic: 'false' | 'true'
                                                    readonly experiment_key?: string
                                                    readonly exposure_holdout: 'false' | 'true'
                                                    readonly max_impressions: number
                                                    readonly impression_cooldown: number
                                                    readonly eligibility_duration_ms: number
                                                    readonly priority: number
                                                    readonly log_eligibility_waterfall: 'false' | 'true'
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
                                                                    readonly max_impressions: number
                                                                    readonly max_primary_clicks: number
                                                                    readonly max_secondary_clicks: number
                                                                    readonly max_dismisses: number
                                                                }
                                                            } | undefined
                                                            readonly user_info: {
                                                                readonly tag: 'user_info'
                                                                readonly attrs: {
                                                                    readonly impression_count: number
                                                                    readonly primary_click_count: number
                                                                    readonly secondary_click_count: number
                                                                    readonly dismiss_click_count: number
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
                                            readonly title: {
                                                readonly tag: 'title'
                                                readonly content: string
                                            }
                                            readonly text: {
                                                readonly tag: 'text'
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
                    readonly type: 'psa'
                    readonly t: number
                    readonly id: string
                    readonly offline?: number
                }
            }
            }
            readonly 'psa/*': {
                readonly handler: { readonly module: 'WAWebHandleWaChat'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly t: number
                    readonly type: 'psa'
                }
                readonly children: {
                    readonly messages: {
                        readonly tag: 'messages'
                        readonly attrs: {
                            readonly campaign_id: string
                        }
                        readonly children: {
                            readonly message: ReadonlyArray<{
                                readonly tag: 'message'
                                readonly attrs: {
                                    readonly id: string
                                    readonly type?: 'event' | 'media' | 'medianotify' | 'pay' | 'poll' | 'reaction' | 'text'
                                }
                                readonly children: {
                                    readonly biz: {
                                        readonly tag: 'biz'
                                        readonly attrs: {
                                            readonly name?: string
                                        }
                                        readonly children: {
                                            readonly interactive: {
                                                readonly tag: 'interactive'
                                                readonly attrs: {
                                                    readonly name?: string
                                                }
                                            } | undefined
                                            readonly native_flow: {
                                                readonly tag: 'native_flow'
                                                readonly attrs: {
                                                    readonly name?: string
                                                }
                                            } | undefined
                                        }
                                    } | undefined
                                    readonly media: {
                                        readonly tag: 'media'
                                    }
                                }
                            }>
                        }
                    }
                    readonly revoke: {
                        readonly tag: 'revoke'
                        readonly attrs: {
                            readonly campaign_id: string
                        }
                        readonly children: {
                            readonly message: ReadonlyArray<{
                                readonly tag: 'message'
                                readonly attrs: {
                                    readonly id: string
                                }
                            }>
                        }
                    }
                }
            }
            }
            readonly psa: {
                readonly handler: { readonly module: 'WAWebHandlePsa'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly participant: string
                    readonly t: number
                    readonly type: 'psa'
                }
                readonly children: {
                    readonly campaign: {
                        readonly tag: 'campaign'
                        readonly attrs: {
                            readonly id: string
                            readonly duration?: number
                        }
                        readonly children: {
                            readonly message: ReadonlyArray<{
                                readonly tag: 'message'
                                readonly attrs: {
                                    readonly id: string
                                }
                                readonly children: {
                                    readonly media: {
                                        readonly tag: 'media'
                                        readonly attrs: {
                                            readonly mediatype: 'image' | 'video' | 'text'
                                        }
                                        readonly content: Uint8Array
                                    }
                                }
                            }>
                            readonly revoke: {
                                readonly tag: 'revoke'
                            } | undefined
                        }
                    }
                }
            }
            }
            readonly privacy_token: {
                readonly handler: { readonly module: 'WAWebHandlePrivacyTokensNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
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
                                    readonly type: string
                                    readonly t: number
                                }
                                readonly content: Uint8Array
                            }>
                        }
                    }
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
            readonly newsletter: {
                readonly handler: { readonly module: 'WAWebHandleNewsletterNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: string
                    readonly type: 'newsletter'
                    readonly t: number
                    readonly id: string
                    readonly offline?: number
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
                                            readonly id?: string
                                            readonly server_id: number
                                            readonly t?: number
                                            readonly is_sender?: 'true'
                                            readonly type?: 'text'
                                            readonly edit?: '3'
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
                                            readonly responses_count: {
                                                readonly tag: 'responses_count'
                                                readonly attrs: {
                                                    readonly count: number
                                                }
                                            }
                                            readonly rcat: {
                                                readonly tag: 'rcat'
                                                readonly content: Uint8Array
                                            }
                                            readonly forwards_count: {
                                                readonly tag: 'forwards_count'
                                                readonly attrs: {
                                                    readonly count: number
                                                }
                                            }
                                            readonly views_count: ReadonlyArray<{
                                                readonly tag: 'views_count'
                                                readonly attrs: {
                                                    readonly type?: 'views'
                                                    readonly count: number
                                                }
                                            }>
                                        }
                                    }>
                                }
                            }
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
                    readonly id: string
                    readonly from: string
                    readonly type: 'contacts' | 'w:growth'
                }
                readonly children: {
                    readonly invite: {
                        readonly tag: 'invite'
                        readonly children: {
                            readonly receiver: {
                                readonly tag: 'receiver'
                                readonly attrs: {
                                    readonly user?: string
                                    readonly reason?: string
                                }
                            }
                        }
                    }
                }
            }
            }
            readonly registration: {
                readonly handler: { readonly module: 'WAWebHandleDeviceSwitchingNotification'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id: string
                    readonly from: string
                    readonly type: 'registration'
                }
                readonly children: {
                    readonly wa_old_registration: {
                        readonly tag: 'wa_old_registration'
                        readonly attrs: {
                            readonly code: string
                            readonly expiry_t: number
                            readonly ts: number
                            readonly device_id: string
                        }
                    }
                }
            }
            }
            readonly mex: {
                readonly handler: { readonly module: 'WAWebHandleMexNotification'; readonly method: 'handleMexNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'mex'
                    readonly id: string
                    readonly from: string
                    readonly offline?: number
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
            readonly companion_reg_refresh: {
                readonly handler: { readonly module: 'WAWebHandleCompanionReqRefreshNotification'; readonly method: 'handleCompanionReqRefreshNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'companion_reg_refresh'
                    readonly id: string
                    readonly from: string
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
            readonly waffle: {
                readonly handler: { readonly module: 'WAWebAccountLinkingNotificationHandler'; readonly method: 'handleAccountLinkingNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly from: 's.whatsapp.net'
                    readonly type: 'waffle'
                    readonly t: number
                    readonly id: string
                    readonly offline?: number
                }
                readonly children: {
                    readonly notification_metadata: {
                        readonly tag: 'notification_metadata'
                        readonly attrs: {
                            readonly event: number
                            readonly show_user_notif?: 'false' | 'true'
                            readonly type?: number
                            readonly client_resync?: 'false' | 'true'
                            readonly sync_delay?: number
                            readonly npr?: 'false' | 'true'
                        }
                    }
                }
            }
            }
            readonly 'fb:update': {
                readonly handler: { readonly module: 'WAWebHandleBotProfileNotification'; readonly method: 'handleBotProfileNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly id?: string
                    readonly from?: string
                    readonly type: 'fb:update'
                }
                readonly children: {
                    readonly update: ReadonlyArray<{
                        readonly tag: 'update'
                        readonly attrs: {
                            readonly jid?: string
                            readonly category?: string
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
            readonly 'w:gp2': {
                readonly handler: { readonly module: 'WAWebHandleGroupNotification'; readonly method: 'handleGroupNotification' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'w:gp2'
                    readonly from: 'g.us'
                    readonly t: number
                    readonly id: string
                    readonly offline?: number
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
            readonly 'encrypt/identity': {
                readonly handler: { readonly module: 'WAWebHandleIdentityChange'; readonly method: 'handleE2eIdentityChange' }
                readonly node: {
                readonly tag: 'notification'
                readonly attrs: {
                    readonly type: 'encrypt'
                    readonly from: string
                    readonly id: string
                    readonly display_name?: string
                    readonly lid?: string
                    readonly offline?: number
                }
                readonly children: {
                    readonly identity: {
                        readonly tag: 'identity'
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
                readonly from?: string
                readonly count?: number
                readonly type: 'unavailable' | 'subscribe'
                readonly last?: 'deny' | 'error' | 'none'
                readonly name?: string
                readonly to: string
                readonly context?: string
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
        readonly discriminator: 'type'
        readonly variants: {
            readonly retry: {
                readonly handler: { readonly module: 'WAWebHandleMessageRetryRequest'; readonly method: 'handleMessageRetryRequest' }
                readonly node: {
                readonly tag: 'receipt'
                readonly attrs: {
                    readonly type: 'retry'
                    readonly to?: string
                    readonly from: string
                    readonly participant?: string
                    readonly is_lid?: boolean
                    readonly recipient?: string
                    readonly id: string
                    readonly t: number
                    readonly offline?: number
                    readonly class?: 'call' | 'message' | 'notification' | 'receipt' | 'status'
                    readonly peer_participant_pn?: string
                    readonly sts?: string
                    readonly context: string
                    readonly category: string
                    readonly server_id: number
                }
                readonly children: {
                    readonly retry: {
                        readonly tag: 'retry'
                        readonly attrs: {
                            readonly id: string
                            readonly count?: number
                            readonly v: '1'
                            readonly t: number
                            readonly error?: number
                        }
                    }
                    readonly keys: {
                        readonly tag: 'keys'
                        readonly children: {
                            readonly skey: {
                                readonly tag: 'skey'
                                readonly children: {
                                    readonly id: {
                                        readonly tag: 'id'
                                        readonly content: number
                                    }
                                    readonly value: {
                                        readonly tag: 'value'
                                        readonly content: Uint8Array
                                    }
                                    readonly signature: {
                                        readonly tag: 'signature'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly 'device-identity': {
                                readonly tag: 'device-identity'
                                readonly content: Uint8Array
                            } | undefined
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
                            readonly identity: {
                                readonly tag: 'identity'
                                readonly content: Uint8Array
                            }
                        }
                    } | undefined
                    readonly registration: {
                        readonly tag: 'registration'
                        readonly content: number
                    }
                }
            }
            }
            readonly enc_rekey_retry: {
                readonly handler: { readonly module: 'WAWebHandleMessageRetryRequest'; readonly method: 'handleMessageRetryRequest' }
                readonly node: {
                readonly tag: 'receipt'
                readonly attrs: {
                    readonly type: 'enc_rekey_retry'
                    readonly to?: string
                    readonly from: string
                    readonly participant?: string
                    readonly is_lid?: boolean
                    readonly recipient?: string
                    readonly id: string
                    readonly t: number
                    readonly offline?: number
                    readonly class?: 'call' | 'message' | 'notification' | 'receipt' | 'status'
                    readonly peer_participant_pn?: string
                    readonly sts?: string
                    readonly context: string
                    readonly category: string
                    readonly server_id: number
                }
                readonly children: {
                    readonly retry: {
                        readonly tag: 'retry'
                        readonly attrs: {
                            readonly id: string
                            readonly count?: number
                            readonly v: '1'
                            readonly t: number
                            readonly error?: number
                        }
                    }
                    readonly keys: {
                        readonly tag: 'keys'
                        readonly children: {
                            readonly skey: {
                                readonly tag: 'skey'
                                readonly children: {
                                    readonly id: {
                                        readonly tag: 'id'
                                        readonly content: number
                                    }
                                    readonly value: {
                                        readonly tag: 'value'
                                        readonly content: Uint8Array
                                    }
                                    readonly signature: {
                                        readonly tag: 'signature'
                                        readonly content: Uint8Array
                                    }
                                }
                            }
                            readonly 'device-identity': {
                                readonly tag: 'device-identity'
                                readonly content: Uint8Array
                            } | undefined
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
                            readonly identity: {
                                readonly tag: 'identity'
                                readonly content: Uint8Array
                            }
                        }
                    } | undefined
                    readonly registration: {
                        readonly tag: 'registration'
                        readonly content: number
                    }
                }
            }
            }
            readonly 'is-call-receipt': {
                readonly handler: { readonly module: 'WAWebHandleVoipCallReceipt'; readonly method: 'handleCallReceipt' }
                readonly node: {
                readonly tag: 'receipt'
                readonly attrs: {
                    readonly id: string
                    readonly type?: 'delivery' | 'inactive' | 'peer_msg' | 'played' | 'played-self' | 'read' | 'read-self' | 'sender' | 'server-error' | 'view'
                    readonly from: string
                    readonly to: string
                    readonly class?: 'call' | 'message' | 'notification' | 'receipt' | 'status'
                    readonly t?: number
                    readonly participant?: string
                    readonly peer_participant_pn?: string
                    readonly recipient?: string
                    readonly sts?: string
                    readonly context: string
                    readonly category: string
                    readonly server_id: number
                }
                readonly children: {
                    readonly offer: {
                        readonly tag: 'offer'
                    } | undefined
                    readonly accept: {
                        readonly tag: 'accept'
                    } | undefined
                    readonly reject: {
                        readonly tag: 'reject'
                    } | undefined
                }
            }
            }
            readonly 'is-not-call-receipt': {
                readonly handler: { readonly module: 'WAWebHandleMsgReceipt'; readonly method: 'default' }
                readonly node: {
                readonly tag: 'receipt'
                readonly attrs: {
                    readonly to?: string
                    readonly type?: 'delivery' | 'inactive' | 'peer_msg' | 'played' | 'played-self' | 'read' | 'read-self' | 'sender' | 'server-error' | 'view'
                    readonly id: string
                    readonly from: string
                    readonly offline?: number
                    readonly participant?: string
                    readonly recipient?: string
                    readonly is_lid?: boolean
                    readonly participant_pn?: string
                    readonly participant_username?: string
                    readonly t: number
                    readonly class?: 'call' | 'message' | 'notification' | 'receipt' | 'status'
                    readonly peer_participant_pn?: string
                    readonly sts?: string
                    readonly context: string
                    readonly category: string
                    readonly server_id: number
                }
                readonly children: {
                    readonly list: {
                        readonly tag: 'list'
                        readonly children: {
                            readonly item: ReadonlyArray<{
                                readonly tag: 'item'
                                readonly attrs: {
                                    readonly server_id: string
                                    readonly id: string
                                }
                            }>
                        }
                    }
                    readonly biz: {
                        readonly tag: 'biz'
                        readonly attrs: {
                            readonly actual_actors?: number
                            readonly host_storage?: number
                            readonly privacy_mode_ts?: number
                        }
                    }
                    readonly error: {
                        readonly tag: 'error'
                        readonly attrs: {
                            readonly reason?: 'lid'
                            readonly type: string
                        }
                    } | undefined
                    readonly participants: {
                        readonly tag: 'participants'
                        readonly attrs: {
                            readonly message_id?: string
                            readonly key: string
                        }
                        readonly children: {
                            readonly user: ReadonlyArray<{
                                readonly tag: 'user'
                                readonly attrs: {
                                    readonly jid: string
                                    readonly t: number
                                    readonly type?: string
                                    readonly participant_pn?: string
                                    readonly participant_username?: string
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
                readonly id: string
                readonly from: string
                readonly server_id: number
                readonly t: number
                readonly is_sender?: 'true'
                readonly edit: '8' | '7'
                readonly type: 'text' | 'reaction'
                readonly offline: number
                readonly to: string
            }
            readonly children: {
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
                readonly conflict: {
                    readonly tag: 'conflict'
                    readonly attrs: {
                        readonly type: string
                    }
                }
                readonly ack: {
                    readonly tag: 'ack'
                    readonly attrs: {
                        readonly id?: string
                    }
                } | undefined
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
                readonly t: number
                readonly companion_enc_static?: string
                readonly lid?: string
                readonly display_name?: string
                readonly abprops?: number
                readonly group_abprops?: number
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
