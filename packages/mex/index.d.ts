// AUTO-GENERATED — do not edit. Regenerated daily by wa-spec.
// WhatsApp Version: 2.3000.1046279073

export interface WaMexPersistId {
    readonly docId: string
    readonly clientDocId: string
}

export interface WaMexOperationSchema<
    K extends 'query' | 'mutation' = 'query' | 'mutation',
    V extends ReadonlyArray<string> = ReadonlyArray<string>
> {
    readonly operationKind: K
    readonly variables: V
}

export declare const WA_MEX_PERSIST_IDS: {
    readonly ACSServerProviderConfig: WaMexPersistId
    readonly ACSServerProviderIssuance: WaMexPersistId
    readonly AcceptNewsletterAdminInvite: WaMexPersistId
    readonly AdAccountReviewBaseCard: WaMexPersistId
    readonly AdAccountReviewUtilsFetchMAIBAAccountReviewStatus: WaMexPersistId
    readonly AdPreferencesDFCABusinessOptOut: WaMexPersistId
    readonly AdPreferencesDemographicCategoryOptOut: WaMexPersistId
    readonly AdPreferencesHideAdvertiser: WaMexPersistId
    readonly AdPreferencesInterestCategoryOptOut: WaMexPersistId
    readonly AdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatus: WaMexPersistId
    readonly AdsAdAccountSettingsStoreSourceServer: WaMexPersistId
    readonly AdsBulkEditCampaignGroupAgencyFeeBulkContainer: WaMexPersistId
    readonly AdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFee: WaMexPersistId
    readonly AdsBulkEditCampaignGroupBudgetFieldContainer_: WaMexPersistId
    readonly AdsBulkEditVARNCAConflictWrapper_: WaMexPersistId
    readonly AdsManagerLiveDataCampaign: WaMexPersistId
    readonly AdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecs: WaMexPersistId
    readonly AdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWaba: WaMexPersistId
    readonly AiAgentAutoReplyControl: WaMexPersistId
    readonly AuthAgentFeaturePolicy: WaMexPersistId
    readonly BPAccessTokenAndSessionCookies: WaMexPersistId
    readonly BizCreateOrder: WaMexPersistId
    readonly BizCustomUrlGetUserGraphql: WaMexPersistId
    readonly BizGetCategories: WaMexPersistId
    readonly BizGetCategoriesV2: WaMexPersistId
    readonly BizGetCustomUrlUserGraphql: WaMexPersistId
    readonly BizGetMerchantCompliance: WaMexPersistId
    readonly BizGetPriceTiers: WaMexPersistId
    readonly BizGetProfileShimlinks: WaMexPersistId
    readonly BizGraphQLRefreshCart: WaMexPersistId
    readonly BizProfileAddressAutocomplete: WaMexPersistId
    readonly BizProfileRoot: WaMexPersistId
    readonly BizQueryOrder: WaMexPersistId
    readonly BizSetMerchantCompliance: WaMexPersistId
    readonly CTXChatBuilderDialogContainerUtils: WaMexPersistId
    readonly CTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModal: WaMexPersistId
    readonly CachedToken: WaMexPersistId
    readonly CanonicalUserValid: WaMexPersistId
    readonly ChangeNewsletterOwner: WaMexPersistId
    readonly ConsumerFetchQuickPromotions: WaMexPersistId
    readonly ConsumerQuickPromotionActionGraphQL: WaMexPersistId
    readonly ContactManagerCustomerProfile: WaMexPersistId
    readonly ContactManagerCustomerProfileUpsert: WaMexPersistId
    readonly ContactManagerCustomerProfiles: WaMexPersistId
    readonly CreateEnforcementAppeal: WaMexPersistId
    readonly CreateInviteCode: WaMexPersistId
    readonly CreateLabyrinthBackup: WaMexPersistId
    readonly CreateMarketingCampaignAction: WaMexPersistId
    readonly CreateNewsletter: WaMexPersistId
    readonly CreateNewsletterAdminInvite: WaMexPersistId
    readonly CreateReportAppeal: WaMexPersistId
    readonly CreateWhatsAppAdsIdentity: WaMexPersistId
    readonly CustomLabel3pdEvent: WaMexPersistId
    readonly DebugLabyrinthInboxSnapshot: WaMexPersistId
    readonly DebugLabyrinthRange: WaMexPersistId
    readonly DeleteNewsletter: WaMexPersistId
    readonly DemoteNewsletterAdmin: WaMexPersistId
    readonly E2EEMetadataMailboxAddGroupParticipants: WaMexPersistId
    readonly E2EEMetadataMailboxCreateGroupThread: WaMexPersistId
    readonly E2EEMetadataMailboxDemoteGroupParticipants: WaMexPersistId
    readonly E2EEMetadataMailboxFetchGroupInfoV4: WaMexPersistId
    readonly E2EEMetadataMailboxLeaveGroup: WaMexPersistId
    readonly E2EEMetadataMailboxPromoteGroupParticipants: WaMexPersistId
    readonly E2EEMetadataMailboxRemoveGroupParticipants: WaMexPersistId
    readonly E2EEMetadataMailboxSetGroupSubject: WaMexPersistId
    readonly EBMessageRangeQueryForThreads: WaMexPersistId
    readonly EBMinosFetchContactKeys: WaMexPersistId
    readonly EBMinosUploadMessages: WaMexPersistId
    readonly EBRegisterMinosMessageEncryptionKey: WaMexPersistId
    readonly EditBizProfile: WaMexPersistId
    readonly ExternalCtxAuthoriseWAChat: WaMexPersistId
    readonly FetchAboutStatus: WaMexPersistId
    readonly FetchAllNewslettersMetadata: WaMexPersistId
    readonly FetchAllSubgroups: WaMexPersistId
    readonly FetchBotCertificateRevocationList: WaMexPersistId
    readonly FetchBotProfilesGQL: WaMexPersistId
    readonly FetchDynamicAIModes: WaMexPersistId
    readonly FetchGroupInfo: WaMexPersistId
    readonly FetchGroupInfoIncludBots: WaMexPersistId
    readonly FetchGroupInviteCode: WaMexPersistId
    readonly FetchGroupIsInternal: WaMexPersistId
    readonly FetchIntegritySignals: WaMexPersistId
    readonly FetchNewChatMessageCappingInfo: WaMexPersistId
    readonly FetchNewsletter: WaMexPersistId
    readonly FetchNewsletterAdminCapabilities: WaMexPersistId
    readonly FetchNewsletterAdminInfo: WaMexPersistId
    readonly FetchNewsletterDehydrated: WaMexPersistId
    readonly FetchNewsletterDirectoryCategoriesPreview: WaMexPersistId
    readonly FetchNewsletterDirectoryList: WaMexPersistId
    readonly FetchNewsletterDirectorySearchResults: WaMexPersistId
    readonly FetchNewsletterEnforcements: WaMexPersistId
    readonly FetchNewsletterFollowers: WaMexPersistId
    readonly FetchNewsletterInsights: WaMexPersistId
    readonly FetchNewsletterIsDomainPreviewable: WaMexPersistId
    readonly FetchNewsletterMessageReactionSenderList: WaMexPersistId
    readonly FetchNewsletterPendingInvites: WaMexPersistId
    readonly FetchNewsletterPollVoters: WaMexPersistId
    readonly FetchNewsletterReports: WaMexPersistId
    readonly FetchOHAIKeyConfig: WaMexPersistId
    readonly FetchOIDCState: WaMexPersistId
    readonly FetchPlaintextLinkPreview: WaMexPersistId
    readonly FetchQuickPromotions: WaMexPersistId
    readonly FetchReachoutTimelock: WaMexPersistId
    readonly FetchRecommendedNewsletters: WaMexPersistId
    readonly FetchSimilarNewsletters: WaMexPersistId
    readonly FetchSubgroupSuggestions: WaMexPersistId
    readonly FetchSubscriptionEntryPoints: WaMexPersistId
    readonly FetchSubscriptions: WaMexPersistId
    readonly FetchTextStatusList: WaMexPersistId
    readonly FetchWassBotListProfilesGQL: WaMexPersistId
    readonly FetchWassBotProfileGQL: WaMexPersistId
    readonly GetAccessTokenFromOIDCCode: WaMexPersistId
    readonly GetAccountNonce: WaMexPersistId
    readonly GetDsbInfo: WaMexPersistId
    readonly GetFBAccountPages: WaMexPersistId
    readonly GetNumbersForBrandIds: WaMexPersistId
    readonly GetPrivacyLists: WaMexPersistId
    readonly GetPrivacySettings: WaMexPersistId
    readonly GetUsername: WaMexPersistId
    readonly GetWAAEligibility: WaMexPersistId
    readonly GraphQLProductCatalogGetPublicKey: WaMexPersistId
    readonly GraphQLVerifyPostcode: WaMexPersistId
    readonly GroupStoreInviteSms: WaMexPersistId
    readonly GroupSuspensionAppeal: WaMexPersistId
    readonly IntegrityChallengeResponse: WaMexPersistId
    readonly JoinNewsletter: WaMexPersistId
    readonly KeyTransparencyGraphQLClient_: WaMexPersistId
    readonly LeaveNewsletter: WaMexPersistId
    readonly LidChangeNotification: WaMexPersistId
    readonly LogNewsletterExposures: WaMexPersistId
    readonly MAIBAInlineAssetSelectorWidgetAssetIDs: WaMexPersistId
    readonly MAIBAInlineAssetSelectorWidgetAssets: WaMexPersistId
    readonly MAIBAMessageCreatorCardsRenderer: WaMexPersistId
    readonly MAIBAMessageLiveBrowserRendererScreenshot: WaMexPersistId
    readonly MAIBAMessageSignalsCTARenderer: WaMexPersistId
    readonly MAIBARecordAsyncAuthConsent: WaMexPersistId
    readonly MessengerAdPreviewConversation: WaMexPersistId
    readonly MetaPayVaultInitialize: WaMexPersistId
    readonly MetaPayVaultLabyrinthDelete: WaMexPersistId
    readonly MetaPayVaultLabyrinthFetchAll: WaMexPersistId
    readonly MetaPayVaultLabyrinthSave: WaMexPersistId
    readonly MpsReceiverFetchGraphQLSticker: WaMexPersistId
    readonly MpsReceiverFetchGraphQLXMA: WaMexPersistId
    readonly NativeMLModel: WaMexPersistId
    readonly NewsletterAddPaidPartnershipLabel: WaMexPersistId
    readonly NewsletterBlockUser: WaMexPersistId
    readonly NewsletterLabelAiContent: WaMexPersistId
    readonly NewsletterPinMessages: WaMexPersistId
    readonly NewsletterQuestionResponseStateUpdate: WaMexPersistId
    readonly NewsletterUnpinMessages: WaMexPersistId
    readonly OrgAdminGraphQLAddGroup: WaMexPersistId
    readonly OrgAdminGraphQLDirectory: WaMexPersistId
    readonly OrgAdminGraphQLGroup: WaMexPersistId
    readonly OrgAdminGraphQLInviteMembers: WaMexPersistId
    readonly OrgAdminGraphQLManagedGroups: WaMexPersistId
    readonly OrgAdminGraphQLMemberSearch: WaMexPersistId
    readonly OrgAdminGraphQLOrgs: WaMexPersistId
    readonly PaymentsPasskeyHasCredential: WaMexPersistId
    readonly QueryCatalog: WaMexPersistId
    readonly QueryCatalogHasCategories: WaMexPersistId
    readonly QueryCatalogProduct: WaMexPersistId
    readonly QueryProductCollections: WaMexPersistId
    readonly QueryProductListCatalog: WaMexPersistId
    readonly QueryProductSingleCollection: WaMexPersistId
    readonly QuerySubgroupParticipantCount: WaMexPersistId
    readonly QuickPromotionAction: WaMexPersistId
    readonly ReportProduct: WaMexPersistId
    readonly RequestClientLogsForBug: WaMexPersistId
    readonly RequestOTE: WaMexPersistId
    readonly ResolveAccountTypeAndAdPage: WaMexPersistId
    readonly ResolveAccountTypeAndAdPageQuery: WaMexPersistId
    readonly RevokeNewsletterAdminInvite: WaMexPersistId
    readonly RotateLabyrinthEpoch: WaMexPersistId
    readonly SetUsername: WaMexPersistId
    readonly SetUsernameKey: WaMexPersistId
    readonly SignupMetadata: WaMexPersistId
    readonly StartConversationTemplateReengagementWithCatalogSection: WaMexPersistId
    readonly StartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegeneration: WaMexPersistId
    readonly StartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlows: WaMexPersistId
    readonly StartConversationsTemplateFAQGenAIRegeneration: WaMexPersistId
    readonly SupportBugReportSubmit: WaMexPersistId
    readonly SupportContactFormSubmit: WaMexPersistId
    readonly SupportMessageFeedbackSubmit: WaMexPersistId
    readonly TeamLinkCreateInvitation: WaMexPersistId
    readonly TeamLinkListInvitations: WaMexPersistId
    readonly TeamLinkRemoveInvitation: WaMexPersistId
    readonly TransferCommunityOwnership: WaMexPersistId
    readonly UpdateGroupProperty: WaMexPersistId
    readonly UpdateNewsletter: WaMexPersistId
    readonly UpdateNewsletterUserSetting: WaMexPersistId
    readonly UpdateTextStatus: WaMexPersistId
    readonly UploadLabyrinthMessages: WaMexPersistId
    readonly UsernameAvailability: WaMexPersistId
    readonly Usync: WaMexPersistId
    readonly WAAOnboarding: WaMexPersistId
    readonly WAMFlowsCTWAEditorModal: WaMexPersistId
    readonly WAMFlowsCTWAFlowPreview: WaMexPersistId
    readonly WaffleFXServiceDataQueryV2: WaMexPersistId
    readonly WaffleFXWAMOUpdateUOOM: WaMexPersistId
    readonly WaffleXE: WaMexPersistId
    readonly useFlowJSONValidationLibrary: WaMexPersistId
    readonly useIsMessengerPlatformBot: WaMexPersistId
    readonly useMAIBADraftStatus: WaMexPersistId
    readonly useMAIBAMedia: WaMexPersistId
    readonly useWAWebEstimatedDailyReach: WaMexPersistId
    readonly useWAWebSmartComposerReportUsed: WaMexPersistId
}

export declare const WA_MEX_OPERATION_SCHEMAS: {
    readonly ACSServerProviderConfig: WaMexOperationSchema<'query', readonly ['project_name']>
    readonly ACSServerProviderIssuance: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly AcceptNewsletterAdminInvite: WaMexOperationSchema<'mutation', readonly ['newsletter_id']>
    readonly AdAccountReviewBaseCard: WaMexOperationSchema<'query', readonly ['adAccountID']>
    readonly AdAccountReviewUtilsFetchMAIBAAccountReviewStatus: WaMexOperationSchema<'query', readonly ['accountReviewTrackerId']>
    readonly AdPreferencesDFCABusinessOptOut: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly AdPreferencesDemographicCategoryOptOut: WaMexOperationSchema<'mutation', readonly ['bctID', 'isUndo']>
    readonly AdPreferencesHideAdvertiser: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly AdPreferencesInterestCategoryOptOut: WaMexOperationSchema<'mutation', readonly ['interestID', 'isUndo']>
    readonly AdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatus: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly AdsAdAccountSettingsStoreSourceServer: WaMexOperationSchema<'query', readonly ['ad_account_id']>
    readonly AdsBulkEditCampaignGroupAgencyFeeBulkContainer: WaMexOperationSchema<'query', readonly ['adAccountID']>
    readonly AdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFee: WaMexOperationSchema<'query', readonly ['adAccountID']>
    readonly AdsBulkEditCampaignGroupBudgetFieldContainer_: WaMexOperationSchema<'query', readonly ['accountID', 'ads_andromeda_bulk_edit_campaign_group_budget', 'campaignGroupRelayIDs', 'contextKey']>
    readonly AdsBulkEditVARNCAConflictWrapper_: WaMexOperationSchema<'query', readonly ['adAccountID', 'campaignRelayIDs', 'skipAccountQuery']>
    readonly AdsManagerLiveDataCampaign: WaMexOperationSchema<'query', readonly ['ids', 'skip_data_transform']>
    readonly AdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecs: WaMexOperationSchema<'query', readonly []>
    readonly AdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWaba: WaMexOperationSchema<'query', readonly ['adAccountID', 'skipRequest']>
    readonly AiAgentAutoReplyControl: WaMexOperationSchema<'mutation', readonly ['consumer_lid', 'phone_number', 'thread_status']>
    readonly AuthAgentFeaturePolicy: WaMexOperationSchema<'query', readonly []>
    readonly BPAccessTokenAndSessionCookies: WaMexOperationSchema<'mutation', readonly ['application_id', 'code']>
    readonly BizCreateOrder: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly BizCustomUrlGetUserGraphql: WaMexOperationSchema<'query', readonly ['data']>
    readonly BizGetCategories: WaMexOperationSchema<'query', readonly ['query_params']>
    readonly BizGetCategoriesV2: WaMexOperationSchema<'query', readonly ['query_params']>
    readonly BizGetCustomUrlUserGraphql: WaMexOperationSchema<'query', readonly ['data']>
    readonly BizGetMerchantCompliance: WaMexOperationSchema<'query', readonly ['request']>
    readonly BizGetPriceTiers: WaMexOperationSchema<'query', readonly ['request']>
    readonly BizGetProfileShimlinks: WaMexOperationSchema<'query', readonly ['bizJid']>
    readonly BizGraphQLRefreshCart: WaMexOperationSchema<'query', readonly ['request']>
    readonly BizProfileAddressAutocomplete: WaMexOperationSchema<'query', readonly ['input']>
    readonly BizProfileRoot: WaMexOperationSchema<'query', readonly []>
    readonly BizQueryOrder: WaMexOperationSchema<'query', readonly ['request']>
    readonly BizSetMerchantCompliance: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CTXChatBuilderDialogContainerUtils: WaMexOperationSchema<'query', readonly ['input']>
    readonly CTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModal: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CachedToken: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CanonicalUserValid: WaMexOperationSchema<'query', readonly []>
    readonly ChangeNewsletterOwner: WaMexOperationSchema<'mutation', readonly ['newsletter_id', 'user_id']>
    readonly ConsumerFetchQuickPromotions: WaMexOperationSchema<'query', readonly ['nux_ids', 'trigger_context']>
    readonly ConsumerQuickPromotionActionGraphQL: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly ContactManagerCustomerProfile: WaMexOperationSchema<'query', readonly ['lid']>
    readonly ContactManagerCustomerProfileUpsert: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly ContactManagerCustomerProfiles: WaMexOperationSchema<'query', readonly ['input']>
    readonly CreateEnforcementAppeal: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CreateInviteCode: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CreateLabyrinthBackup: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CreateMarketingCampaignAction: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CreateNewsletter: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly CreateNewsletterAdminInvite: WaMexOperationSchema<'mutation', readonly ['newsletter_id', 'user_id']>
    readonly CreateReportAppeal: WaMexOperationSchema<'mutation', readonly ['reason', 'report_id']>
    readonly CreateWhatsAppAdsIdentity: WaMexOperationSchema<'mutation', readonly ['code', 'phone_number']>
    readonly CustomLabel3pdEvent: WaMexOperationSchema<'query', readonly ['custom_labels', 'expt_group']>
    readonly DebugLabyrinthInboxSnapshot: WaMexOperationSchema<'query', readonly ['messageFirst', 'threadFirst']>
    readonly DebugLabyrinthRange: WaMexOperationSchema<'query', readonly ['device_id', 'message_count', 'partial_thread_id']>
    readonly DeleteNewsletter: WaMexOperationSchema<'mutation', readonly ['newsletter_id']>
    readonly DemoteNewsletterAdmin: WaMexOperationSchema<'mutation', readonly ['newsletter_id', 'user_id']>
    readonly E2EEMetadataMailboxAddGroupParticipants: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly E2EEMetadataMailboxCreateGroupThread: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly E2EEMetadataMailboxDemoteGroupParticipants: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly E2EEMetadataMailboxFetchGroupInfoV4: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly E2EEMetadataMailboxLeaveGroup: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly E2EEMetadataMailboxPromoteGroupParticipants: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly E2EEMetadataMailboxRemoveGroupParticipants: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly E2EEMetadataMailboxSetGroupSubject: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly EBMessageRangeQueryForThreads: WaMexOperationSchema<'query', readonly ['app_id', 'includeAttachmentData', 'restore_payload_strings', 'restore_type']>
    readonly EBMinosFetchContactKeys: WaMexOperationSchema<'query', readonly ['input']>
    readonly EBMinosUploadMessages: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly EBRegisterMinosMessageEncryptionKey: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly EditBizProfile: WaMexOperationSchema<'mutation', readonly ['input', 'lid']>
    readonly ExternalCtxAuthoriseWAChat: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly FetchAboutStatus: WaMexOperationSchema<'query', readonly ['user']>
    readonly FetchAllNewslettersMetadata: WaMexOperationSchema<'query', readonly ['fetch_status_metadata', 'fetch_wamo_sub']>
    readonly FetchAllSubgroups: WaMexOperationSchema<'query', readonly ['group_id', 'query_context', 'sub_group_hint_id']>
    readonly FetchBotCertificateRevocationList: WaMexOperationSchema<'query', readonly ['crl_name']>
    readonly FetchBotProfilesGQL: WaMexOperationSchema<'query', readonly ['ids']>
    readonly FetchDynamicAIModes: WaMexOperationSchema<'query', readonly []>
    readonly FetchGroupInfo: WaMexOperationSchema<'query', readonly ['id', 'include_username', 'participants_phash', 'query_context']>
    readonly FetchGroupInfoIncludBots: WaMexOperationSchema<'query', readonly ['id', 'include_username', 'participants_phash', 'query_context']>
    readonly FetchGroupInviteCode: WaMexOperationSchema<'query', readonly ['id', 'query_context']>
    readonly FetchGroupIsInternal: WaMexOperationSchema<'query', readonly ['id']>
    readonly FetchIntegritySignals: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchNewChatMessageCappingInfo: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchNewsletter: WaMexOperationSchema<'query', readonly ['fetch_creation_time', 'fetch_full_image', 'fetch_pinned_messages', 'fetch_status_metadata', 'fetch_viewer_metadata', 'fetch_wamo_sub', 'input']>
    readonly FetchNewsletterAdminCapabilities: WaMexOperationSchema<'query', readonly ['newsletter_id']>
    readonly FetchNewsletterAdminInfo: WaMexOperationSchema<'query', readonly ['newsletter_id']>
    readonly FetchNewsletterDehydrated: WaMexOperationSchema<'query', readonly ['fetch_pinned_messages', 'fetch_wamo_sub', 'input']>
    readonly FetchNewsletterDirectoryCategoriesPreview: WaMexOperationSchema<'query', readonly ['fetch_status_metadata', 'input']>
    readonly FetchNewsletterDirectoryList: WaMexOperationSchema<'query', readonly ['fetch_status_metadata', 'input']>
    readonly FetchNewsletterDirectorySearchResults: WaMexOperationSchema<'query', readonly ['fetch_status_metadata', 'input']>
    readonly FetchNewsletterEnforcements: WaMexOperationSchema<'query', readonly ['locale', 'newsletter_id']>
    readonly FetchNewsletterFollowers: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchNewsletterInsights: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchNewsletterIsDomainPreviewable: WaMexOperationSchema<'query', readonly ['url_domains']>
    readonly FetchNewsletterMessageReactionSenderList: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchNewsletterPendingInvites: WaMexOperationSchema<'query', readonly ['newsletter_id']>
    readonly FetchNewsletterPollVoters: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchNewsletterReports: WaMexOperationSchema<'query', readonly ['locale']>
    readonly FetchOHAIKeyConfig: WaMexOperationSchema<'query', readonly []>
    readonly FetchOIDCState: WaMexOperationSchema<'query', readonly []>
    readonly FetchPlaintextLinkPreview: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchQuickPromotions: WaMexOperationSchema<'query', readonly ['nux_ids', 'trigger_context']>
    readonly FetchReachoutTimelock: WaMexOperationSchema<'query', readonly []>
    readonly FetchRecommendedNewsletters: WaMexOperationSchema<'query', readonly ['fetch_status_metadata', 'input']>
    readonly FetchSimilarNewsletters: WaMexOperationSchema<'query', readonly ['fetch_status_metadata', 'input']>
    readonly FetchSubgroupSuggestions: WaMexOperationSchema<'query', readonly ['group_id', 'query_context', 'sub_group_hint_id']>
    readonly FetchSubscriptionEntryPoints: WaMexOperationSchema<'query', readonly []>
    readonly FetchSubscriptions: WaMexOperationSchema<'query', readonly ['data']>
    readonly FetchTextStatusList: WaMexOperationSchema<'query', readonly ['input']>
    readonly FetchWassBotListProfilesGQL: WaMexOperationSchema<'query', readonly []>
    readonly FetchWassBotProfileGQL: WaMexOperationSchema<'query', readonly ['botFbid']>
    readonly GetAccessTokenFromOIDCCode: WaMexOperationSchema<'mutation', readonly ['code', 'state']>
    readonly GetAccountNonce: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly GetDsbInfo: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly GetFBAccountPages: WaMexOperationSchema<'query', readonly ['userId']>
    readonly GetNumbersForBrandIds: WaMexOperationSchema<'query', readonly ['input']>
    readonly GetPrivacyLists: WaMexOperationSchema<'query', readonly ['input']>
    readonly GetPrivacySettings: WaMexOperationSchema<'query', readonly ['input']>
    readonly GetUsername: WaMexOperationSchema<'query', readonly []>
    readonly GetWAAEligibility: WaMexOperationSchema<'query', readonly ['input']>
    readonly GraphQLProductCatalogGetPublicKey: WaMexOperationSchema<'query', readonly ['request']>
    readonly GraphQLVerifyPostcode: WaMexOperationSchema<'query', readonly ['request']>
    readonly GroupStoreInviteSms: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly GroupSuspensionAppeal: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly IntegrityChallengeResponse: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly JoinNewsletter: WaMexOperationSchema<'mutation', readonly ['newsletter_id']>
    readonly KeyTransparencyGraphQLClient_: WaMexOperationSchema<'query', readonly ['auditor_ids', 'requested_accounts', 'serfmt']>
    readonly LeaveNewsletter: WaMexOperationSchema<'mutation', readonly ['newsletter_id']>
    readonly LidChangeNotification: WaMexOperationSchema<'query', readonly []>
    readonly LogNewsletterExposures: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly MAIBAInlineAssetSelectorWidgetAssetIDs: WaMexOperationSchema<'query', readonly ['input']>
    readonly MAIBAInlineAssetSelectorWidgetAssets: WaMexOperationSchema<'query', readonly ['input']>
    readonly MAIBAMessageCreatorCardsRenderer: WaMexOperationSchema<'query', readonly ['brandIgUserID', 'creatorIDs']>
    readonly MAIBAMessageLiveBrowserRendererScreenshot: WaMexOperationSchema<'query', readonly ['click_selector', 'initial_url']>
    readonly MAIBAMessageSignalsCTARenderer: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly MAIBARecordAsyncAuthConsent: WaMexOperationSchema<'mutation', readonly ['ad_account_id', 'page_id']>
    readonly MessengerAdPreviewConversation: WaMexOperationSchema<'query', readonly ['page_id', 'selected_product_ids']>
    readonly MetaPayVaultInitialize: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly MetaPayVaultLabyrinthDelete: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly MetaPayVaultLabyrinthFetchAll: WaMexOperationSchema<'query', readonly ['input']>
    readonly MetaPayVaultLabyrinthSave: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly MpsReceiverFetchGraphQLSticker: WaMexOperationSchema<'query', readonly ['receiverFetchId']>
    readonly MpsReceiverFetchGraphQLXMA: WaMexOperationSchema<'query', readonly ['input']>
    readonly NativeMLModel: WaMexOperationSchema<'query', readonly ['client_capability_metadata', 'model_request_metadatas']>
    readonly NewsletterAddPaidPartnershipLabel: WaMexOperationSchema<'mutation', readonly ['message_type', 'newsletter_id', 'server_id']>
    readonly NewsletterBlockUser: WaMexOperationSchema<'mutation', readonly ['newsletter_id', 'response_server_id', 'server_id']>
    readonly NewsletterLabelAiContent: WaMexOperationSchema<'mutation', readonly ['message_type', 'newsletter_id', 'server_id']>
    readonly NewsletterPinMessages: WaMexOperationSchema<'mutation', readonly ['input', 'newsletter_id']>
    readonly NewsletterQuestionResponseStateUpdate: WaMexOperationSchema<'mutation', readonly ['newsletter_id', 'response_server_id', 'server_id', 'state']>
    readonly NewsletterUnpinMessages: WaMexOperationSchema<'mutation', readonly ['input', 'newsletter_id']>
    readonly OrgAdminGraphQLAddGroup: WaMexOperationSchema<'mutation', readonly ['gid', 'orgID']>
    readonly OrgAdminGraphQLDirectory: WaMexOperationSchema<'query', readonly ['orgID']>
    readonly OrgAdminGraphQLGroup: WaMexOperationSchema<'query', readonly ['gid', 'orgID']>
    readonly OrgAdminGraphQLInviteMembers: WaMexOperationSchema<'mutation', readonly ['emails', 'orgID']>
    readonly OrgAdminGraphQLManagedGroups: WaMexOperationSchema<'query', readonly ['orgID']>
    readonly OrgAdminGraphQLMemberSearch: WaMexOperationSchema<'query', readonly ['after', 'first', 'memberTag', 'orgID', 'query']>
    readonly OrgAdminGraphQLOrgs: WaMexOperationSchema<'query', readonly []>
    readonly PaymentsPasskeyHasCredential: WaMexOperationSchema<'query', readonly []>
    readonly QueryCatalog: WaMexOperationSchema<'query', readonly ['request']>
    readonly QueryCatalogHasCategories: WaMexOperationSchema<'query', readonly ['request']>
    readonly QueryCatalogProduct: WaMexOperationSchema<'query', readonly ['request']>
    readonly QueryProductCollections: WaMexOperationSchema<'query', readonly ['request']>
    readonly QueryProductListCatalog: WaMexOperationSchema<'query', readonly ['request']>
    readonly QueryProductSingleCollection: WaMexOperationSchema<'query', readonly ['request']>
    readonly QuerySubgroupParticipantCount: WaMexOperationSchema<'query', readonly ['input']>
    readonly QuickPromotionAction: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly ReportProduct: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly RequestClientLogsForBug: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly RequestOTE: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly ResolveAccountTypeAndAdPage: WaMexOperationSchema<'mutation', readonly []>
    readonly ResolveAccountTypeAndAdPageQuery: WaMexOperationSchema<'query', readonly ['pageId']>
    readonly RevokeNewsletterAdminInvite: WaMexOperationSchema<'mutation', readonly ['newsletter_id', 'user_id']>
    readonly RotateLabyrinthEpoch: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly SetUsername: WaMexOperationSchema<'mutation', readonly ['input', 'reserved', 'session_id', 'source']>
    readonly SetUsernameKey: WaMexOperationSchema<'mutation', readonly ['pin']>
    readonly SignupMetadata: WaMexOperationSchema<'query', readonly ['phone_number', 'signup_id']>
    readonly StartConversationTemplateReengagementWithCatalogSection: WaMexOperationSchema<'query', readonly ['page_id']>
    readonly StartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegeneration: WaMexOperationSchema<'query', readonly ['ad_account_id', 'ad_caption', 'destination_type', 'page_id', 'post_id', 'skip']>
    readonly StartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlows: WaMexOperationSchema<'query', readonly ['input']>
    readonly StartConversationsTemplateFAQGenAIRegeneration: WaMexOperationSchema<'mutation', readonly ['ad_account_id', 'ad_caption', 'ad_id', 'current_icebreaker', 'destination_type', 'ent_id', 'page_id', 'post_id']>
    readonly SupportBugReportSubmit: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly SupportContactFormSubmit: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly SupportMessageFeedbackSubmit: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly TeamLinkCreateInvitation: WaMexOperationSchema<'mutation', readonly ['employeeName', 'lid']>
    readonly TeamLinkListInvitations: WaMexOperationSchema<'query', readonly []>
    readonly TeamLinkRemoveInvitation: WaMexOperationSchema<'mutation', readonly ['lid']>
    readonly TransferCommunityOwnership: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly UpdateGroupProperty: WaMexOperationSchema<'mutation', readonly ['group_id', 'update']>
    readonly UpdateNewsletter: WaMexOperationSchema<'mutation', readonly ['newsletter_id', 'updates']>
    readonly UpdateNewsletterUserSetting: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly UpdateTextStatus: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly UploadLabyrinthMessages: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly UsernameAvailability: WaMexOperationSchema<'query', readonly ['input', 'session_id', 'source']>
    readonly Usync: WaMexOperationSchema<'query', readonly ['include_about_status', 'include_country_code', 'include_username', 'input']>
    readonly WAAOnboarding: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly WAMFlowsCTWAEditorModal: WaMexOperationSchema<'query', readonly ['adObjective', 'businessName', 'flowId', 'skipRequest']>
    readonly WAMFlowsCTWAFlowPreview: WaMexOperationSchema<'query', readonly ['adObjective', 'businessName', 'defaultCtaToGetStarted', 'flowId', 'skipRequest']>
    readonly WaffleFXServiceDataQueryV2: WaMexOperationSchema<'mutation', readonly []>
    readonly WaffleFXWAMOUpdateUOOM: WaMexOperationSchema<'mutation', readonly []>
    readonly WaffleXE: WaMexOperationSchema<'mutation', readonly ['input']>
    readonly useFlowJSONValidationLibrary: WaMexOperationSchema<'query', readonly ['skipRequest', 'version', 'wabaID']>
    readonly useIsMessengerPlatformBot: WaMexOperationSchema<'query', readonly ['page_id']>
    readonly useMAIBADraftStatus: WaMexOperationSchema<'query', readonly ['campaignGroupId', 'id']>
    readonly useMAIBAMedia: WaMexOperationSchema<'query', readonly ['adObjectIDs', 'thumbnailSize']>
    readonly useWAWebEstimatedDailyReach: WaMexOperationSchema<'query', readonly ['audienceOptionAudience', 'configuredPlacementSpec', 'currency', 'flow', 'flowID', 'legacyAdAccountID', 'optimizationGoalInput', 'postID', 'targetingSpecAudience']>
    readonly useWAWebSmartComposerReportUsed: WaMexOperationSchema<'mutation', readonly ['input']>
}

export type WaMexACSServerProviderConfigVariables = {
    readonly project_name?: string
}

export type WaMexACSServerProviderIssuanceVariables = {
    readonly input?: {
        readonly config_id?: string
        readonly issue_element?: string
        readonly project_name?: string
        readonly request_proof?: string
    }
}

export type WaMexAcceptNewsletterAdminInviteVariables = {
    readonly newsletter_id?: string
}

export type WaMexAdAccountReviewBaseCardVariables = {
    readonly adAccountID?: string
}

export type WaMexAdAccountReviewUtilsFetchMAIBAAccountReviewStatusVariables = {
    readonly accountReviewTrackerId?: string
}

export type WaMexAdPreferencesDFCABusinessOptOutVariables = {
    readonly input?: string
}

export type WaMexAdPreferencesDemographicCategoryOptOutVariables = {
    readonly bctID?: string
    readonly isUndo?: unknown
}

export type WaMexAdPreferencesHideAdvertiserVariables = {
    readonly input?: string
}

export type WaMexAdPreferencesInterestCategoryOptOutVariables = {
    readonly interestID?: string
    readonly isUndo?: unknown
}

export type WaMexAdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatusVariables = {
    readonly input?: string
}

export type WaMexAdsAdAccountSettingsStoreSourceServerVariables = {
    readonly ad_account_id?: string
}

export type WaMexAdsBulkEditCampaignGroupAgencyFeeBulkContainerVariables = {
    readonly adAccountID?: string
}

export type WaMexAdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFeeVariables = {
    readonly adAccountID?: string
}

export type WaMexAdsBulkEditCampaignGroupBudgetFieldContainer_Variables = {
    readonly accountID?: string
    readonly ads_andromeda_bulk_edit_campaign_group_budget?: boolean
    readonly campaignGroupRelayIDs?: unknown
    readonly contextKey?: unknown
}

export type WaMexAdsBulkEditVARNCAConflictWrapper_Variables = {
    readonly adAccountID?: string
    readonly campaignRelayIDs?: unknown
    readonly skipAccountQuery?: boolean
}

export type WaMexAdsManagerLiveDataCampaignVariables = {
    readonly ids?: ReadonlyArray<string>
    readonly skip_data_transform?: boolean
}

export type WaMexAdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecsVariables = Readonly<Record<string, never>>

export type WaMexAdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWabaVariables = {
    readonly adAccountID?: string
    readonly skipRequest?: boolean
}

export type WaMexAiAgentAutoReplyControlVariables = {
    readonly consumer_lid?: string
    readonly phone_number?: string
    readonly thread_status?: string
}

export type WaMexAuthAgentFeaturePolicyVariables = Readonly<Record<string, never>>

export type WaMexBPAccessTokenAndSessionCookiesVariables = {
    readonly application_id?: number
    readonly code?: string
}

export type WaMexBizCreateOrderVariables = {
    readonly input?: {
        readonly order?: {
            readonly jid?: string
            readonly products?: ReadonlyArray<Readonly<Record<string, unknown>>>
        }
    }
}

export type WaMexBizCustomUrlGetUserGraphqlVariables = {
    readonly data?: {
        readonly custom_url?: {
            readonly path?: string
        }
    }
}

export type WaMexBizGetCategoriesVariables = {
    readonly query_params?: {
        readonly locale?: string
        readonly operation?: 'PROFILE_TYPEAHEAD'
        readonly query?: string
        readonly version?: 'V_1'
    }
}

export type WaMexBizGetCategoriesV2Variables = {
    readonly query_params?: {
        readonly locale?: string
        readonly operation?: 'PROFILE_TYPEAHEAD'
        readonly query?: string
        readonly version?: 'V_2'
    }
}

export type WaMexBizGetCustomUrlUserGraphqlVariables = {
    readonly data?: {
        readonly custom_url?: {
            readonly path?: string
        }
    }
}

export type WaMexBizGetMerchantComplianceVariables = {
    readonly request?: Readonly<Record<string, unknown>>
}

export type WaMexBizGetPriceTiersVariables = {
    readonly request?: {
        readonly locale?: string
    }
}

export type WaMexBizGetProfileShimlinksVariables = {
    readonly bizJid?: string
}

export type WaMexBizGraphQLRefreshCartVariables = {
    readonly request?: Readonly<Record<string, unknown>>
}

export type WaMexBizProfileAddressAutocompleteVariables = {
    readonly input?: {
        readonly center?: string
        readonly query?: string
        readonly use_case_id?: 'WHATSAPP_BIZ_PROFILE'
    }
}

export type WaMexBizProfileRootVariables = Readonly<Record<string, never>>

export type WaMexBizQueryOrderVariables = {
    readonly request?: {
        readonly order?: {
            readonly direct_connection_encrypted_info?: string
            readonly id?: string
            readonly image_dimensions?: {
                readonly height?: number
                readonly width?: number
            }
            readonly jid?: string
            readonly token?: {
                readonly sensitive_string_value?: string
            }
        }
    }
}

export type WaMexBizSetMerchantComplianceVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexCTXChatBuilderDialogContainerUtilsVariables = {
    readonly input?: string
}

export type WaMexCTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModalVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexCachedTokenVariables = {
    readonly input?: {
        readonly client_pub_key?: string
        readonly request_id?: string
    }
}

export type WaMexCanonicalUserValidVariables = Readonly<Record<string, never>>

export type WaMexChangeNewsletterOwnerVariables = {
    readonly newsletter_id?: string
    readonly user_id?: string
}

export type WaMexConsumerFetchQuickPromotionsVariables = {
    readonly nux_ids?: ReadonlyArray<string>
    readonly trigger_context?: {
        readonly wa_smb_trigger_context?: {
            readonly app_version?: number
            readonly country?: string
            readonly is_from_wa_smb?: boolean
            readonly locale?: string
        }
    }
}

export type WaMexConsumerQuickPromotionActionGraphQLVariables = {
    readonly input?: string
}

export type WaMexContactManagerCustomerProfileVariables = {
    readonly lid?: string
}

export type WaMexContactManagerCustomerProfileUpsertVariables = {
    readonly input?: ReadonlyArray<unknown>
}

export type WaMexContactManagerCustomerProfilesVariables = {
    readonly input?: {
        readonly candidate_lids?: ReadonlyArray<string>
        readonly cursor?: string
        readonly filters?: ReadonlyArray<{
            readonly field_name?: string
            readonly filter_text?: string
        }>
        readonly page_size?: number
        readonly sort_column?: unknown
        readonly sort_descending?: boolean
    }
}

export type WaMexCreateEnforcementAppealVariables = {
    readonly input?: {
        readonly additional_appeal_reason?: string
        readonly appeal_reason?: string
        readonly enforcement_id?: string
        readonly entity_id?: string
        readonly locale?: string
    }
}

export type WaMexCreateInviteCodeVariables = {
    readonly input?: {
        readonly entry_point?: string
        readonly receiver?: string
        readonly server_send_sms?: boolean
    }
}

export type WaMexCreateLabyrinthBackupVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexCreateMarketingCampaignActionVariables = {
    readonly input?: string
}

export type WaMexCreateNewsletterVariables = {
    readonly input?: {
        readonly description?: string
        readonly name?: string
        readonly picture?: string
    }
}

export type WaMexCreateNewsletterAdminInviteVariables = {
    readonly newsletter_id?: string
    readonly user_id?: string
}

export type WaMexCreateReportAppealVariables = {
    readonly reason?: string
    readonly report_id?: string
}

export type WaMexCreateWhatsAppAdsIdentityVariables = {
    readonly code?: {
        readonly sensitive_string_value?: string
    }
    readonly phone_number?: {
        readonly sensitive_string_value?: string
    }
}

export type WaMexCustomLabel3pdEventVariables = {
    readonly custom_labels?: ReadonlyArray<string>
    readonly expt_group?: string
}

export type WaMexDebugLabyrinthInboxSnapshotVariables = {
    readonly messageFirst?: number
    readonly threadFirst?: number
}

export type WaMexDebugLabyrinthRangeVariables = {
    readonly device_id?: string
    readonly message_count?: number
    readonly partial_thread_id?: string
}

export type WaMexDeleteNewsletterVariables = {
    readonly newsletter_id?: string
}

export type WaMexDemoteNewsletterAdminVariables = {
    readonly newsletter_id?: string
    readonly user_id?: string
}

export type WaMexE2EEMetadataMailboxAddGroupParticipantsVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexE2EEMetadataMailboxCreateGroupThreadVariables = {
    readonly input?: string
}

export type WaMexE2EEMetadataMailboxDemoteGroupParticipantsVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexE2EEMetadataMailboxFetchGroupInfoV4Variables = {
    readonly input?: string
}

export type WaMexE2EEMetadataMailboxLeaveGroupVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexE2EEMetadataMailboxPromoteGroupParticipantsVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexE2EEMetadataMailboxRemoveGroupParticipantsVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexE2EEMetadataMailboxSetGroupSubjectVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexEBMessageRangeQueryForThreadsVariables = {
    readonly app_id?: string
    readonly includeAttachmentData?: boolean
    readonly restore_payload_strings?: unknown
    readonly restore_type?: 'INITIAL_RESTORE' | 'RANGE_QUERY_RESTORE'
}

export type WaMexEBMinosFetchContactKeysVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexEBMinosUploadMessagesVariables = {
    readonly input?: string
}

export type WaMexEBRegisterMinosMessageEncryptionKeyVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexEditBizProfileVariables = {
    readonly input?: Readonly<Record<string, unknown>>
    readonly lid?: string
}

export type WaMexExternalCtxAuthoriseWAChatVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexFetchAboutStatusVariables = {
    readonly user?: {
        readonly user_id?: string
    }
}

export type WaMexFetchAllNewslettersMetadataVariables = {
    readonly fetch_status_metadata?: boolean
    readonly fetch_wamo_sub?: boolean
}

export type WaMexFetchAllSubgroupsVariables = {
    readonly group_id?: string
    readonly query_context?: string
    readonly sub_group_hint_id?: string
}

export type WaMexFetchBotCertificateRevocationListVariables = {
    readonly crl_name?: string
}

export type WaMexFetchBotProfilesGQLVariables = {
    readonly ids?: ReadonlyArray<string>
}

export type WaMexFetchDynamicAIModesVariables = Readonly<Record<string, never>>

export type WaMexFetchGroupInfoVariables = {
    readonly id?: string
    readonly include_username?: boolean
    readonly participants_phash?: string
    readonly query_context?: string
}

export type WaMexFetchGroupInfoIncludBotsVariables = {
    readonly id?: string
    readonly include_username?: boolean
    readonly participants_phash?: string
    readonly query_context?: string
}

export type WaMexFetchGroupInviteCodeVariables = {
    readonly id?: string
    readonly query_context?: 'INVITE_CODE'
}

export type WaMexFetchGroupIsInternalVariables = {
    readonly id?: string
}

export type WaMexFetchIntegritySignalsVariables = {
    readonly input?: {
        readonly query_input?: ReadonlyArray<{
            readonly integrity_signals?: {
                readonly use_case?: 'CHAT_FMX'
            }
            readonly jid?: string
        }>
        readonly telemetry?: {
            readonly context?: 'INTERACTIVE'
        }
    }
}

export type WaMexFetchNewChatMessageCappingInfoVariables = {
    readonly input?: {
        readonly type?: 'INDIVIDUAL_NEW_CHAT_THREAD'
    }
}

export type WaMexFetchNewsletterVariables = {
    readonly fetch_creation_time?: boolean
    readonly fetch_full_image?: boolean
    readonly fetch_pinned_messages?: boolean
    readonly fetch_status_metadata?: boolean
    readonly fetch_viewer_metadata?: boolean
    readonly fetch_wamo_sub?: boolean
    readonly input?: {
        readonly key?: string
        readonly type?: 'INVITE' | 'JID'
        readonly view_role?: 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
    }
}

export type WaMexFetchNewsletterAdminCapabilitiesVariables = {
    readonly newsletter_id?: string
}

export type WaMexFetchNewsletterAdminInfoVariables = {
    readonly newsletter_id?: string
}

export type WaMexFetchNewsletterDehydratedVariables = {
    readonly fetch_pinned_messages?: boolean
    readonly fetch_wamo_sub?: boolean
    readonly input?: {
        readonly key?: string
        readonly type?: 'INVITE' | 'JID'
        readonly view_role?: 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
    }
}

export type WaMexFetchNewsletterDirectoryCategoriesPreviewVariables = {
    readonly fetch_status_metadata?: boolean
    readonly input?: {
        readonly categories?: ReadonlyArray<string>
        readonly country_code?: string
        readonly per_category_limit?: number
    }
}

export type WaMexFetchNewsletterDirectoryListVariables = {
    readonly fetch_status_metadata?: boolean
    readonly input?: {
        readonly filters?: {
            readonly categories?: ReadonlyArray<string>
            readonly country_codes?: ReadonlyArray<string>
        }
        readonly limit?: number
        readonly start_cursor?: string
        readonly view?: string
    }
}

export type WaMexFetchNewsletterDirectorySearchResultsVariables = {
    readonly fetch_status_metadata?: boolean
    readonly input?: {
        readonly categories?: ReadonlyArray<string>
        readonly limit?: number
        readonly search_text?: string
        readonly start_cursor?: string
    }
}

export type WaMexFetchNewsletterEnforcementsVariables = {
    readonly locale?: string
    readonly newsletter_id?: string
}

export type WaMexFetchNewsletterFollowersVariables = {
    readonly input?: {
        readonly count?: number
        readonly newsletter_id?: string
    }
}

export type WaMexFetchNewsletterInsightsVariables = {
    readonly input?: {
        readonly metrics?: ReadonlyArray<{
            readonly group_by?: {
                readonly number_of_days?: number
            }
            readonly id?: number
            readonly limit?: number
            readonly type?: 'FOLLOWS' | 'UNFOLLOWS'
        }>
        readonly newsletter_id?: string
    }
}

export type WaMexFetchNewsletterIsDomainPreviewableVariables = {
    readonly url_domains?: ReadonlyArray<string>
}

export type WaMexFetchNewsletterMessageReactionSenderListVariables = {
    readonly input?: {
        readonly id?: string
        readonly server_id?: string
    }
}

export type WaMexFetchNewsletterPendingInvitesVariables = {
    readonly newsletter_id?: string
}

export type WaMexFetchNewsletterPollVotersVariables = {
    readonly input?: {
        readonly limit?: number
        readonly newsletter_id?: string
        readonly server_id?: string
        readonly vote_hash?: string
    }
}

export type WaMexFetchNewsletterReportsVariables = {
    readonly locale?: string
}

export type WaMexFetchOHAIKeyConfigVariables = Readonly<Record<string, never>>

export type WaMexFetchOIDCStateVariables = Readonly<Record<string, never>>

export type WaMexFetchPlaintextLinkPreviewVariables = {
    readonly input?: {
        readonly url?: string
    }
}

export type WaMexFetchQuickPromotionsVariables = {
    readonly nux_ids?: ReadonlyArray<string>
    readonly trigger_context?: {
        readonly wa_smb_trigger_context?: {
            readonly app_version?: number
            readonly country?: string
            readonly is_from_wa_smb?: boolean
            readonly locale?: string
        }
    }
}

export type WaMexFetchReachoutTimelockVariables = Readonly<Record<string, never>>

export type WaMexFetchRecommendedNewslettersVariables = {
    readonly fetch_status_metadata?: boolean
    readonly input?: {
        readonly country_codes?: ReadonlyArray<string>
        readonly limit?: number
    }
}

export type WaMexFetchSimilarNewslettersVariables = {
    readonly fetch_status_metadata?: boolean
    readonly input?: {
        readonly country_codes?: ReadonlyArray<string>
        readonly limit?: number
        readonly newsletter_id?: string
    }
}

export type WaMexFetchSubgroupSuggestionsVariables = {
    readonly group_id?: string
    readonly query_context?: string
    readonly sub_group_hint_id?: string
}

export type WaMexFetchSubscriptionEntryPointsVariables = Readonly<Record<string, never>>

export type WaMexFetchSubscriptionsVariables = {
    readonly data?: {
        readonly platform?: 'UNKNOWN'
    }
}

export type WaMexFetchTextStatusListVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexFetchWassBotListProfilesGQLVariables = Readonly<Record<string, never>>

export type WaMexFetchWassBotProfileGQLVariables = {
    readonly botFbid?: string
}

export type WaMexGetAccessTokenFromOIDCCodeVariables = {
    readonly code?: string
    readonly state?: string
}

export type WaMexGetAccountNonceVariables = {
    readonly input?: {
        readonly identifier?: {
            readonly scope?: 'REQUEST'
        }
    }
}

export type WaMexGetDsbInfoVariables = {
    readonly input?: {
        readonly entity_id?: string
    }
}

export type WaMexGetFBAccountPagesVariables = {
    readonly userId?: string
}

export type WaMexGetNumbersForBrandIdsVariables = {
    readonly input?: {
        readonly brand_ids?: ReadonlyArray<string>
        readonly lid_based_response?: boolean
    }
}

export type WaMexGetPrivacyListsVariables = {
    readonly input?: {
        readonly query_input?: ReadonlyArray<{
            readonly jid?: string
            readonly privacy_contact_list_type?: {
                readonly category?: string
                readonly dhash?: string
                readonly type?: string
            }
        }>
    }
}

export type WaMexGetPrivacySettingsVariables = {
    readonly input?: {
        readonly query_input?: ReadonlyArray<{
            readonly jid?: string
            readonly privacy_features?: ReadonlyArray<string>
        }>
    }
}

export type WaMexGetUsernameVariables = Readonly<Record<string, never>>

export type WaMexGetWAAEligibilityVariables = {
    readonly input?: {
        readonly flow_id?: string
        readonly request_id?: number
    }
}

export type WaMexGraphQLProductCatalogGetPublicKeyVariables = {
    readonly request?: {
        readonly public_key?: {
            readonly biz_jid?: string
        }
    }
}

export type WaMexGraphQLVerifyPostcodeVariables = {
    readonly request?: {
        readonly verify_postcode?: {
            readonly biz_jid?: string
            readonly direct_connection_encrypted_info?: string
        }
    }
}

export type WaMexGroupStoreInviteSmsVariables = {
    readonly input?: {
        readonly group_jid?: string
        readonly partcipants?: ReadonlyArray<Readonly<Record<string, unknown>>>
    }
}

export type WaMexGroupSuspensionAppealVariables = {
    readonly input?: {
        readonly appeal_reason?: string
        readonly debug_info?: string
        readonly group_jid?: string
    }
}

export type WaMexIntegrityChallengeResponseVariables = {
    readonly input?: {
        readonly challenge_type?: string
        readonly passkey_response?: {
            readonly prf_available?: boolean
            readonly signed_challenge?: string
        }
    }
}

export type WaMexJoinNewsletterVariables = {
    readonly newsletter_id?: string
}

export type WaMexKeyTransparencyGraphQLClient_Variables = {
    readonly auditor_ids?: ReadonlyArray<string>
    readonly requested_accounts?: unknown
    readonly serfmt?: 'BASE64'
}

export type WaMexLeaveNewsletterVariables = {
    readonly newsletter_id?: string
}

export type WaMexLidChangeNotificationVariables = Readonly<Record<string, never>>

export type WaMexLogNewsletterExposuresVariables = {
    readonly input?: {
        readonly exposures?: ReadonlyArray<{
            readonly capability?: 'ADMIN_CONTEXT_CARD_1' | 'ADMIN_CONTEXT_CARD_2' | 'ADMIN_CONTEXT_CARD_3' | 'ADMIN_NOTIFICATIONS' | 'ADMIN_ONBOARDING' | 'ADMIN_ONBOARDING_2' | 'ADMIN_PROFILE' | 'CHANNEL_STATUS_MUSIC' | 'CHANNEL_STATUS_PRODUCER' | 'INSIGHTS' | 'INVITE_ADMINS_BUTTON' | 'INVITE_FOLLOWERS' | 'JARVIS_INTEGRATION_ENABLED' | 'MUSIC' | 'NEW_MESSAGE_TYPES_TOOLTIP' | 'PHOTO_POLLS' | 'PINNED_MESSAGES' | 'PINNING_NUDGE' | 'QUESTIONS' | 'QUESTIONS_M2' | 'QUIZ' | 'SHARE_STICKER_PACKS' | 'THREAD_MENU'
            readonly newsletter_id?: string
        }>
    }
}

export type WaMexMAIBAInlineAssetSelectorWidgetAssetIDsVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexMAIBAInlineAssetSelectorWidgetAssetsVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexMAIBAMessageCreatorCardsRendererVariables = {
    readonly brandIgUserID?: string
    readonly creatorIDs?: unknown
}

export type WaMexMAIBAMessageLiveBrowserRendererScreenshotVariables = {
    readonly click_selector?: unknown
    readonly initial_url?: string
}

export type WaMexMAIBAMessageSignalsCTARendererVariables = {
    readonly input?: string
}

export type WaMexMAIBARecordAsyncAuthConsentVariables = {
    readonly ad_account_id?: string
    readonly page_id?: string
}

export type WaMexMessengerAdPreviewConversationVariables = {
    readonly page_id?: string
    readonly selected_product_ids?: ReadonlyArray<string>
}

export type WaMexMetaPayVaultInitializeVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexMetaPayVaultLabyrinthDeleteVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexMetaPayVaultLabyrinthFetchAllVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexMetaPayVaultLabyrinthSaveVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexMpsReceiverFetchGraphQLStickerVariables = {
    readonly receiverFetchId?: string
}

export type WaMexMpsReceiverFetchGraphQLXMAVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexNativeMLModelVariables = {
    readonly client_capability_metadata?: string
    readonly model_request_metadatas?: string
}

export type WaMexNewsletterAddPaidPartnershipLabelVariables = {
    readonly message_type?: string
    readonly newsletter_id?: string
    readonly server_id?: string
}

export type WaMexNewsletterBlockUserVariables = {
    readonly newsletter_id?: string
    readonly response_server_id?: string
    readonly server_id?: string
}

export type WaMexNewsletterLabelAiContentVariables = {
    readonly message_type?: string
    readonly newsletter_id?: string
    readonly server_id?: string
}

export type WaMexNewsletterPinMessagesVariables = {
    readonly input?: {
        readonly message_ids?: ReadonlyArray<string>
    }
    readonly newsletter_id?: string
}

export type WaMexNewsletterQuestionResponseStateUpdateVariables = {
    readonly newsletter_id?: string
    readonly response_server_id?: string
    readonly server_id?: string
    readonly state?: string
}

export type WaMexNewsletterUnpinMessagesVariables = {
    readonly input?: {
        readonly message_ids?: ReadonlyArray<string>
    }
    readonly newsletter_id?: string
}

export type WaMexOrgAdminGraphQLAddGroupVariables = {
    readonly gid?: unknown
    readonly orgID?: string
}

export type WaMexOrgAdminGraphQLDirectoryVariables = {
    readonly orgID?: string
}

export type WaMexOrgAdminGraphQLGroupVariables = {
    readonly gid?: unknown
    readonly orgID?: string
}

export type WaMexOrgAdminGraphQLInviteMembersVariables = {
    readonly emails?: ReadonlyArray<string>
    readonly orgID?: string
}

export type WaMexOrgAdminGraphQLManagedGroupsVariables = {
    readonly orgID?: string
}

export type WaMexOrgAdminGraphQLMemberSearchVariables = {
    readonly after?: string
    readonly first?: number
    readonly memberTag?: string
    readonly orgID?: string
    readonly query?: string
}

export type WaMexOrgAdminGraphQLOrgsVariables = {
    readonly after?: string
    readonly emails?: ReadonlyArray<string>
    readonly first?: number
    readonly gid?: unknown
    readonly memberTag?: unknown
    readonly orgID?: unknown
    readonly query?: string
}

export type WaMexPaymentsPasskeyHasCredentialVariables = Readonly<Record<string, never>>

export type WaMexQueryCatalogVariables = {
    readonly request?: {
        readonly product_catalog?: {
            readonly after?: string
            readonly allow_shop_source?: 'ALLOWSHOPSOURCE_FALSE' | 'ALLOWSHOPSOURCE_TRUE'
            readonly catalog_session_id?: string
            readonly direct_connection_encrypted_info?: string
            readonly height?: string
            readonly jid?: string
            readonly limit?: string
            readonly variant_info_fields?: Readonly<Record<string, unknown>>
            readonly variant_thumbnail_height?: string
            readonly variant_thumbnail_width?: string
            readonly width?: string
        }
    }
}

export type WaMexQueryCatalogHasCategoriesVariables = {
    readonly request?: {
        readonly categories?: {
            readonly biz_jid?: string
            readonly catalog_session_id?: string
            readonly direct_connection_encrypted_info?: string
            readonly image_dimensions?: Readonly<Record<string, unknown>>
        }
    }
}

export type WaMexQueryCatalogProductVariables = {
    readonly request?: {
        readonly product?: {
            readonly direct_connection_encrypted_info?: string
            readonly fetch_compliance_info?: string
            readonly height?: string
            readonly jid?: string
            readonly product_id?: string
            readonly variant_info_fields?: Readonly<Record<string, unknown>>
            readonly variant_thumbnail_height?: string
            readonly variant_thumbnail_width?: string
            readonly width?: string
        }
    }
}

export type WaMexQueryProductCollectionsVariables = {
    readonly request?: {
        readonly collections?: {
            readonly after?: string
            readonly biz_jid?: string
            readonly collection_limit?: string
            readonly direct_connection_encrypted_info?: string
            readonly height?: string
            readonly item_limit?: string
            readonly variant_info_fields?: Readonly<Record<string, unknown>>
            readonly variant_thumbnail_height?: string
            readonly variant_thumbnail_width?: string
            readonly width?: string
        }
    }
}

export type WaMexQueryProductListCatalogVariables = {
    readonly request?: {
        readonly product_list?: {
            readonly direct_connection_encrypted_info?: string
            readonly height?: string
            readonly jid?: string
            readonly products?: ReadonlyArray<{
                readonly id?: string
            }>
            readonly width?: string
        }
    }
}

export type WaMexQueryProductSingleCollectionVariables = {
    readonly request?: {
        readonly collection?: {
            readonly after?: string
            readonly biz_jid?: string
            readonly direct_connection_encrypted_info?: string
            readonly height?: string
            readonly id?: string
            readonly limit?: string
            readonly variant_info_fields?: Readonly<Record<string, unknown>>
            readonly variant_thumbnail_height?: string
            readonly variant_thumbnail_width?: string
            readonly width?: string
        }
    }
}

export type WaMexQuerySubgroupParticipantCountVariables = {
    readonly input?: {
        readonly group_jid?: string
        readonly query_context?: string
        readonly sub_group_jid_hint?: string
    }
}

export type WaMexQuickPromotionActionVariables = {
    readonly input?: string
}

export type WaMexReportProductVariables = {
    readonly input?: {
        readonly jid?: string
        readonly product_id?: string
    }
}

export type WaMexRequestClientLogsForBugVariables = {
    readonly input?: {
        readonly bug_id?: string
        readonly participant_ids?: ReadonlyArray<string>
        readonly reporter_id?: string
        readonly up_to_timestamp_secs?: number
    }
}

export type WaMexRequestOTEVariables = {
    readonly input?: {
        readonly reason_text?: string
        readonly selected_reason?: string
        readonly type?: 'INDIVIDUAL_NEW_CHAT_THREAD'
    }
}

export type WaMexResolveAccountTypeAndAdPageVariables = {
    readonly pageId?: string
}

export type WaMexResolveAccountTypeAndAdPageQueryVariables = {
    readonly pageId?: string
}

export type WaMexRevokeNewsletterAdminInviteVariables = {
    readonly newsletter_id?: string
    readonly user_id?: string
}

export type WaMexRotateLabyrinthEpochVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexSetUsernameVariables = {
    readonly input?: string
    readonly reserved?: boolean
    readonly session_id?: string
    readonly source?: 'USER_INPUT'
}

export type WaMexSetUsernameKeyVariables = {
    readonly pin?: string
}

export type WaMexSignupMetadataVariables = {
    readonly phone_number?: string
    readonly signup_id?: string
}

export type WaMexStartConversationTemplateReengagementWithCatalogSectionVariables = {
    readonly page_id?: string
}

export type WaMexStartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegenerationVariables = {
    readonly ad_account_id?: string
    readonly ad_caption?: string
    readonly destination_type?: string
    readonly page_id?: string
    readonly post_id?: string
    readonly skip?: unknown
}

export type WaMexStartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlowsVariables = {
    readonly input?: string
}

export type WaMexStartConversationsTemplateFAQGenAIRegenerationVariables = {
    readonly ad_account_id?: string
    readonly ad_caption?: string
    readonly ad_id?: string
    readonly current_icebreaker?: unknown
    readonly destination_type?: string
    readonly ent_id?: string
    readonly page_id?: string
    readonly post_id?: string
}

export type WaMexSupportBugReportSubmitVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexSupportContactFormSubmitVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexSupportMessageFeedbackSubmitVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexTeamLinkCreateInvitationVariables = {
    readonly employeeName?: string
    readonly lid?: string
}

export type WaMexTeamLinkListInvitationsVariables = Readonly<Record<string, never>>

export type WaMexTeamLinkRemoveInvitationVariables = {
    readonly lid?: string
}

export type WaMexTransferCommunityOwnershipVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexUpdateGroupPropertyVariables = {
    readonly group_id?: string
    readonly update?: Readonly<Record<string, unknown>>
}

export type WaMexUpdateNewsletterVariables = {
    readonly newsletter_id?: string
    readonly updates?: {
        readonly description?: string
        readonly name?: string
        readonly picture?: string
        readonly settings?: Readonly<Record<string, unknown>>
    }
}

export type WaMexUpdateNewsletterUserSettingVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexUpdateTextStatusVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexUploadLabyrinthMessagesVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexUsernameAvailabilityVariables = {
    readonly input?: string
    readonly session_id?: string
    readonly source?: 'USER_INPUT'
}

export type WaMexUsyncVariables = {
    readonly include_about_status?: boolean
    readonly include_country_code?: boolean
    readonly include_username?: boolean
    readonly input?: {
        readonly query_input?: Readonly<Record<string, unknown>>
        readonly telemetry?: Readonly<Record<string, unknown>>
    }
}

export type WaMexWAAOnboardingVariables = {
    readonly input?: {
        readonly flow_id?: string
        readonly request_id?: number
    }
}

export type WaMexWAMFlowsCTWAEditorModalVariables = {
    readonly adObjective?: unknown
    readonly businessName?: string
    readonly flowId?: string
    readonly skipRequest?: boolean
}

export type WaMexWAMFlowsCTWAFlowPreviewVariables = {
    readonly adObjective?: unknown
    readonly businessName?: string
    readonly defaultCtaToGetStarted?: boolean
    readonly flowId?: string
    readonly skipRequest?: boolean
}

export type WaMexWaffleFXServiceDataQueryV2Variables = Readonly<Record<string, never>>

export type WaMexWaffleFXWAMOUpdateUOOMVariables = Readonly<Record<string, never>>

export type WaMexWaffleXEVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export type WaMexuseFlowJSONValidationLibraryVariables = {
    readonly skipRequest?: boolean
    readonly version?: number
    readonly wabaID?: string
}

export type WaMexuseIsMessengerPlatformBotVariables = {
    readonly page_id?: string
}

export type WaMexuseMAIBADraftStatusVariables = {
    readonly campaignGroupId?: string
    readonly id?: string
}

export type WaMexuseMAIBAMediaVariables = {
    readonly adObjectIDs?: unknown
    readonly thumbnailSize?: number
}

export type WaMexuseWAWebEstimatedDailyReachVariables = {
    readonly audienceOptionAudience?: Readonly<Record<string, unknown>>
    readonly configuredPlacementSpec?: Readonly<Record<string, unknown>>
    readonly currency?: string
    readonly flow?: string
    readonly flowID?: string
    readonly legacyAdAccountID?: string
    readonly optimizationGoalInput?: Readonly<Record<string, unknown>>
    readonly postID?: string
    readonly targetingSpecAudience?: Readonly<Record<string, unknown>>
}

export type WaMexuseWAWebSmartComposerReportUsedVariables = {
    readonly input?: Readonly<Record<string, unknown>>
}

export interface WaMexOperationVariables {
    readonly ACSServerProviderConfig: WaMexACSServerProviderConfigVariables
    readonly ACSServerProviderIssuance: WaMexACSServerProviderIssuanceVariables
    readonly AcceptNewsletterAdminInvite: WaMexAcceptNewsletterAdminInviteVariables
    readonly AdAccountReviewBaseCard: WaMexAdAccountReviewBaseCardVariables
    readonly AdAccountReviewUtilsFetchMAIBAAccountReviewStatus: WaMexAdAccountReviewUtilsFetchMAIBAAccountReviewStatusVariables
    readonly AdPreferencesDFCABusinessOptOut: WaMexAdPreferencesDFCABusinessOptOutVariables
    readonly AdPreferencesDemographicCategoryOptOut: WaMexAdPreferencesDemographicCategoryOptOutVariables
    readonly AdPreferencesHideAdvertiser: WaMexAdPreferencesHideAdvertiserVariables
    readonly AdPreferencesInterestCategoryOptOut: WaMexAdPreferencesInterestCategoryOptOutVariables
    readonly AdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatus: WaMexAdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatusVariables
    readonly AdsAdAccountSettingsStoreSourceServer: WaMexAdsAdAccountSettingsStoreSourceServerVariables
    readonly AdsBulkEditCampaignGroupAgencyFeeBulkContainer: WaMexAdsBulkEditCampaignGroupAgencyFeeBulkContainerVariables
    readonly AdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFee: WaMexAdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFeeVariables
    readonly AdsBulkEditCampaignGroupBudgetFieldContainer_: WaMexAdsBulkEditCampaignGroupBudgetFieldContainer_Variables
    readonly AdsBulkEditVARNCAConflictWrapper_: WaMexAdsBulkEditVARNCAConflictWrapper_Variables
    readonly AdsManagerLiveDataCampaign: WaMexAdsManagerLiveDataCampaignVariables
    readonly AdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecs: WaMexAdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecsVariables
    readonly AdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWaba: WaMexAdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWabaVariables
    readonly AiAgentAutoReplyControl: WaMexAiAgentAutoReplyControlVariables
    readonly AuthAgentFeaturePolicy: WaMexAuthAgentFeaturePolicyVariables
    readonly BPAccessTokenAndSessionCookies: WaMexBPAccessTokenAndSessionCookiesVariables
    readonly BizCreateOrder: WaMexBizCreateOrderVariables
    readonly BizCustomUrlGetUserGraphql: WaMexBizCustomUrlGetUserGraphqlVariables
    readonly BizGetCategories: WaMexBizGetCategoriesVariables
    readonly BizGetCategoriesV2: WaMexBizGetCategoriesV2Variables
    readonly BizGetCustomUrlUserGraphql: WaMexBizGetCustomUrlUserGraphqlVariables
    readonly BizGetMerchantCompliance: WaMexBizGetMerchantComplianceVariables
    readonly BizGetPriceTiers: WaMexBizGetPriceTiersVariables
    readonly BizGetProfileShimlinks: WaMexBizGetProfileShimlinksVariables
    readonly BizGraphQLRefreshCart: WaMexBizGraphQLRefreshCartVariables
    readonly BizProfileAddressAutocomplete: WaMexBizProfileAddressAutocompleteVariables
    readonly BizProfileRoot: WaMexBizProfileRootVariables
    readonly BizQueryOrder: WaMexBizQueryOrderVariables
    readonly BizSetMerchantCompliance: WaMexBizSetMerchantComplianceVariables
    readonly CTXChatBuilderDialogContainerUtils: WaMexCTXChatBuilderDialogContainerUtilsVariables
    readonly CTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModal: WaMexCTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModalVariables
    readonly CachedToken: WaMexCachedTokenVariables
    readonly CanonicalUserValid: WaMexCanonicalUserValidVariables
    readonly ChangeNewsletterOwner: WaMexChangeNewsletterOwnerVariables
    readonly ConsumerFetchQuickPromotions: WaMexConsumerFetchQuickPromotionsVariables
    readonly ConsumerQuickPromotionActionGraphQL: WaMexConsumerQuickPromotionActionGraphQLVariables
    readonly ContactManagerCustomerProfile: WaMexContactManagerCustomerProfileVariables
    readonly ContactManagerCustomerProfileUpsert: WaMexContactManagerCustomerProfileUpsertVariables
    readonly ContactManagerCustomerProfiles: WaMexContactManagerCustomerProfilesVariables
    readonly CreateEnforcementAppeal: WaMexCreateEnforcementAppealVariables
    readonly CreateInviteCode: WaMexCreateInviteCodeVariables
    readonly CreateLabyrinthBackup: WaMexCreateLabyrinthBackupVariables
    readonly CreateMarketingCampaignAction: WaMexCreateMarketingCampaignActionVariables
    readonly CreateNewsletter: WaMexCreateNewsletterVariables
    readonly CreateNewsletterAdminInvite: WaMexCreateNewsletterAdminInviteVariables
    readonly CreateReportAppeal: WaMexCreateReportAppealVariables
    readonly CreateWhatsAppAdsIdentity: WaMexCreateWhatsAppAdsIdentityVariables
    readonly CustomLabel3pdEvent: WaMexCustomLabel3pdEventVariables
    readonly DebugLabyrinthInboxSnapshot: WaMexDebugLabyrinthInboxSnapshotVariables
    readonly DebugLabyrinthRange: WaMexDebugLabyrinthRangeVariables
    readonly DeleteNewsletter: WaMexDeleteNewsletterVariables
    readonly DemoteNewsletterAdmin: WaMexDemoteNewsletterAdminVariables
    readonly E2EEMetadataMailboxAddGroupParticipants: WaMexE2EEMetadataMailboxAddGroupParticipantsVariables
    readonly E2EEMetadataMailboxCreateGroupThread: WaMexE2EEMetadataMailboxCreateGroupThreadVariables
    readonly E2EEMetadataMailboxDemoteGroupParticipants: WaMexE2EEMetadataMailboxDemoteGroupParticipantsVariables
    readonly E2EEMetadataMailboxFetchGroupInfoV4: WaMexE2EEMetadataMailboxFetchGroupInfoV4Variables
    readonly E2EEMetadataMailboxLeaveGroup: WaMexE2EEMetadataMailboxLeaveGroupVariables
    readonly E2EEMetadataMailboxPromoteGroupParticipants: WaMexE2EEMetadataMailboxPromoteGroupParticipantsVariables
    readonly E2EEMetadataMailboxRemoveGroupParticipants: WaMexE2EEMetadataMailboxRemoveGroupParticipantsVariables
    readonly E2EEMetadataMailboxSetGroupSubject: WaMexE2EEMetadataMailboxSetGroupSubjectVariables
    readonly EBMessageRangeQueryForThreads: WaMexEBMessageRangeQueryForThreadsVariables
    readonly EBMinosFetchContactKeys: WaMexEBMinosFetchContactKeysVariables
    readonly EBMinosUploadMessages: WaMexEBMinosUploadMessagesVariables
    readonly EBRegisterMinosMessageEncryptionKey: WaMexEBRegisterMinosMessageEncryptionKeyVariables
    readonly EditBizProfile: WaMexEditBizProfileVariables
    readonly ExternalCtxAuthoriseWAChat: WaMexExternalCtxAuthoriseWAChatVariables
    readonly FetchAboutStatus: WaMexFetchAboutStatusVariables
    readonly FetchAllNewslettersMetadata: WaMexFetchAllNewslettersMetadataVariables
    readonly FetchAllSubgroups: WaMexFetchAllSubgroupsVariables
    readonly FetchBotCertificateRevocationList: WaMexFetchBotCertificateRevocationListVariables
    readonly FetchBotProfilesGQL: WaMexFetchBotProfilesGQLVariables
    readonly FetchDynamicAIModes: WaMexFetchDynamicAIModesVariables
    readonly FetchGroupInfo: WaMexFetchGroupInfoVariables
    readonly FetchGroupInfoIncludBots: WaMexFetchGroupInfoIncludBotsVariables
    readonly FetchGroupInviteCode: WaMexFetchGroupInviteCodeVariables
    readonly FetchGroupIsInternal: WaMexFetchGroupIsInternalVariables
    readonly FetchIntegritySignals: WaMexFetchIntegritySignalsVariables
    readonly FetchNewChatMessageCappingInfo: WaMexFetchNewChatMessageCappingInfoVariables
    readonly FetchNewsletter: WaMexFetchNewsletterVariables
    readonly FetchNewsletterAdminCapabilities: WaMexFetchNewsletterAdminCapabilitiesVariables
    readonly FetchNewsletterAdminInfo: WaMexFetchNewsletterAdminInfoVariables
    readonly FetchNewsletterDehydrated: WaMexFetchNewsletterDehydratedVariables
    readonly FetchNewsletterDirectoryCategoriesPreview: WaMexFetchNewsletterDirectoryCategoriesPreviewVariables
    readonly FetchNewsletterDirectoryList: WaMexFetchNewsletterDirectoryListVariables
    readonly FetchNewsletterDirectorySearchResults: WaMexFetchNewsletterDirectorySearchResultsVariables
    readonly FetchNewsletterEnforcements: WaMexFetchNewsletterEnforcementsVariables
    readonly FetchNewsletterFollowers: WaMexFetchNewsletterFollowersVariables
    readonly FetchNewsletterInsights: WaMexFetchNewsletterInsightsVariables
    readonly FetchNewsletterIsDomainPreviewable: WaMexFetchNewsletterIsDomainPreviewableVariables
    readonly FetchNewsletterMessageReactionSenderList: WaMexFetchNewsletterMessageReactionSenderListVariables
    readonly FetchNewsletterPendingInvites: WaMexFetchNewsletterPendingInvitesVariables
    readonly FetchNewsletterPollVoters: WaMexFetchNewsletterPollVotersVariables
    readonly FetchNewsletterReports: WaMexFetchNewsletterReportsVariables
    readonly FetchOHAIKeyConfig: WaMexFetchOHAIKeyConfigVariables
    readonly FetchOIDCState: WaMexFetchOIDCStateVariables
    readonly FetchPlaintextLinkPreview: WaMexFetchPlaintextLinkPreviewVariables
    readonly FetchQuickPromotions: WaMexFetchQuickPromotionsVariables
    readonly FetchReachoutTimelock: WaMexFetchReachoutTimelockVariables
    readonly FetchRecommendedNewsletters: WaMexFetchRecommendedNewslettersVariables
    readonly FetchSimilarNewsletters: WaMexFetchSimilarNewslettersVariables
    readonly FetchSubgroupSuggestions: WaMexFetchSubgroupSuggestionsVariables
    readonly FetchSubscriptionEntryPoints: WaMexFetchSubscriptionEntryPointsVariables
    readonly FetchSubscriptions: WaMexFetchSubscriptionsVariables
    readonly FetchTextStatusList: WaMexFetchTextStatusListVariables
    readonly FetchWassBotListProfilesGQL: WaMexFetchWassBotListProfilesGQLVariables
    readonly FetchWassBotProfileGQL: WaMexFetchWassBotProfileGQLVariables
    readonly GetAccessTokenFromOIDCCode: WaMexGetAccessTokenFromOIDCCodeVariables
    readonly GetAccountNonce: WaMexGetAccountNonceVariables
    readonly GetDsbInfo: WaMexGetDsbInfoVariables
    readonly GetFBAccountPages: WaMexGetFBAccountPagesVariables
    readonly GetNumbersForBrandIds: WaMexGetNumbersForBrandIdsVariables
    readonly GetPrivacyLists: WaMexGetPrivacyListsVariables
    readonly GetPrivacySettings: WaMexGetPrivacySettingsVariables
    readonly GetUsername: WaMexGetUsernameVariables
    readonly GetWAAEligibility: WaMexGetWAAEligibilityVariables
    readonly GraphQLProductCatalogGetPublicKey: WaMexGraphQLProductCatalogGetPublicKeyVariables
    readonly GraphQLVerifyPostcode: WaMexGraphQLVerifyPostcodeVariables
    readonly GroupStoreInviteSms: WaMexGroupStoreInviteSmsVariables
    readonly GroupSuspensionAppeal: WaMexGroupSuspensionAppealVariables
    readonly IntegrityChallengeResponse: WaMexIntegrityChallengeResponseVariables
    readonly JoinNewsletter: WaMexJoinNewsletterVariables
    readonly KeyTransparencyGraphQLClient_: WaMexKeyTransparencyGraphQLClient_Variables
    readonly LeaveNewsletter: WaMexLeaveNewsletterVariables
    readonly LidChangeNotification: WaMexLidChangeNotificationVariables
    readonly LogNewsletterExposures: WaMexLogNewsletterExposuresVariables
    readonly MAIBAInlineAssetSelectorWidgetAssetIDs: WaMexMAIBAInlineAssetSelectorWidgetAssetIDsVariables
    readonly MAIBAInlineAssetSelectorWidgetAssets: WaMexMAIBAInlineAssetSelectorWidgetAssetsVariables
    readonly MAIBAMessageCreatorCardsRenderer: WaMexMAIBAMessageCreatorCardsRendererVariables
    readonly MAIBAMessageLiveBrowserRendererScreenshot: WaMexMAIBAMessageLiveBrowserRendererScreenshotVariables
    readonly MAIBAMessageSignalsCTARenderer: WaMexMAIBAMessageSignalsCTARendererVariables
    readonly MAIBARecordAsyncAuthConsent: WaMexMAIBARecordAsyncAuthConsentVariables
    readonly MessengerAdPreviewConversation: WaMexMessengerAdPreviewConversationVariables
    readonly MetaPayVaultInitialize: WaMexMetaPayVaultInitializeVariables
    readonly MetaPayVaultLabyrinthDelete: WaMexMetaPayVaultLabyrinthDeleteVariables
    readonly MetaPayVaultLabyrinthFetchAll: WaMexMetaPayVaultLabyrinthFetchAllVariables
    readonly MetaPayVaultLabyrinthSave: WaMexMetaPayVaultLabyrinthSaveVariables
    readonly MpsReceiverFetchGraphQLSticker: WaMexMpsReceiverFetchGraphQLStickerVariables
    readonly MpsReceiverFetchGraphQLXMA: WaMexMpsReceiverFetchGraphQLXMAVariables
    readonly NativeMLModel: WaMexNativeMLModelVariables
    readonly NewsletterAddPaidPartnershipLabel: WaMexNewsletterAddPaidPartnershipLabelVariables
    readonly NewsletterBlockUser: WaMexNewsletterBlockUserVariables
    readonly NewsletterLabelAiContent: WaMexNewsletterLabelAiContentVariables
    readonly NewsletterPinMessages: WaMexNewsletterPinMessagesVariables
    readonly NewsletterQuestionResponseStateUpdate: WaMexNewsletterQuestionResponseStateUpdateVariables
    readonly NewsletterUnpinMessages: WaMexNewsletterUnpinMessagesVariables
    readonly OrgAdminGraphQLAddGroup: WaMexOrgAdminGraphQLAddGroupVariables
    readonly OrgAdminGraphQLDirectory: WaMexOrgAdminGraphQLDirectoryVariables
    readonly OrgAdminGraphQLGroup: WaMexOrgAdminGraphQLGroupVariables
    readonly OrgAdminGraphQLInviteMembers: WaMexOrgAdminGraphQLInviteMembersVariables
    readonly OrgAdminGraphQLManagedGroups: WaMexOrgAdminGraphQLManagedGroupsVariables
    readonly OrgAdminGraphQLMemberSearch: WaMexOrgAdminGraphQLMemberSearchVariables
    readonly OrgAdminGraphQLOrgs: WaMexOrgAdminGraphQLOrgsVariables
    readonly PaymentsPasskeyHasCredential: WaMexPaymentsPasskeyHasCredentialVariables
    readonly QueryCatalog: WaMexQueryCatalogVariables
    readonly QueryCatalogHasCategories: WaMexQueryCatalogHasCategoriesVariables
    readonly QueryCatalogProduct: WaMexQueryCatalogProductVariables
    readonly QueryProductCollections: WaMexQueryProductCollectionsVariables
    readonly QueryProductListCatalog: WaMexQueryProductListCatalogVariables
    readonly QueryProductSingleCollection: WaMexQueryProductSingleCollectionVariables
    readonly QuerySubgroupParticipantCount: WaMexQuerySubgroupParticipantCountVariables
    readonly QuickPromotionAction: WaMexQuickPromotionActionVariables
    readonly ReportProduct: WaMexReportProductVariables
    readonly RequestClientLogsForBug: WaMexRequestClientLogsForBugVariables
    readonly RequestOTE: WaMexRequestOTEVariables
    readonly ResolveAccountTypeAndAdPage: WaMexResolveAccountTypeAndAdPageVariables
    readonly ResolveAccountTypeAndAdPageQuery: WaMexResolveAccountTypeAndAdPageQueryVariables
    readonly RevokeNewsletterAdminInvite: WaMexRevokeNewsletterAdminInviteVariables
    readonly RotateLabyrinthEpoch: WaMexRotateLabyrinthEpochVariables
    readonly SetUsername: WaMexSetUsernameVariables
    readonly SetUsernameKey: WaMexSetUsernameKeyVariables
    readonly SignupMetadata: WaMexSignupMetadataVariables
    readonly StartConversationTemplateReengagementWithCatalogSection: WaMexStartConversationTemplateReengagementWithCatalogSectionVariables
    readonly StartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegeneration: WaMexStartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegenerationVariables
    readonly StartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlows: WaMexStartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlowsVariables
    readonly StartConversationsTemplateFAQGenAIRegeneration: WaMexStartConversationsTemplateFAQGenAIRegenerationVariables
    readonly SupportBugReportSubmit: WaMexSupportBugReportSubmitVariables
    readonly SupportContactFormSubmit: WaMexSupportContactFormSubmitVariables
    readonly SupportMessageFeedbackSubmit: WaMexSupportMessageFeedbackSubmitVariables
    readonly TeamLinkCreateInvitation: WaMexTeamLinkCreateInvitationVariables
    readonly TeamLinkListInvitations: WaMexTeamLinkListInvitationsVariables
    readonly TeamLinkRemoveInvitation: WaMexTeamLinkRemoveInvitationVariables
    readonly TransferCommunityOwnership: WaMexTransferCommunityOwnershipVariables
    readonly UpdateGroupProperty: WaMexUpdateGroupPropertyVariables
    readonly UpdateNewsletter: WaMexUpdateNewsletterVariables
    readonly UpdateNewsletterUserSetting: WaMexUpdateNewsletterUserSettingVariables
    readonly UpdateTextStatus: WaMexUpdateTextStatusVariables
    readonly UploadLabyrinthMessages: WaMexUploadLabyrinthMessagesVariables
    readonly UsernameAvailability: WaMexUsernameAvailabilityVariables
    readonly Usync: WaMexUsyncVariables
    readonly WAAOnboarding: WaMexWAAOnboardingVariables
    readonly WAMFlowsCTWAEditorModal: WaMexWAMFlowsCTWAEditorModalVariables
    readonly WAMFlowsCTWAFlowPreview: WaMexWAMFlowsCTWAFlowPreviewVariables
    readonly WaffleFXServiceDataQueryV2: WaMexWaffleFXServiceDataQueryV2Variables
    readonly WaffleFXWAMOUpdateUOOM: WaMexWaffleFXWAMOUpdateUOOMVariables
    readonly WaffleXE: WaMexWaffleXEVariables
    readonly useFlowJSONValidationLibrary: WaMexuseFlowJSONValidationLibraryVariables
    readonly useIsMessengerPlatformBot: WaMexuseIsMessengerPlatformBotVariables
    readonly useMAIBADraftStatus: WaMexuseMAIBADraftStatusVariables
    readonly useMAIBAMedia: WaMexuseMAIBAMediaVariables
    readonly useWAWebEstimatedDailyReach: WaMexuseWAWebEstimatedDailyReachVariables
    readonly useWAWebSmartComposerReportUsed: WaMexuseWAWebSmartComposerReportUsedVariables
}

export type WaMexACSServerProviderConfigResponse = {
    readonly xwa_wa_acs_config?: {
        readonly cipher_suite?: string
        readonly expire_time?: string
        readonly id?: string
        readonly max_evals?: number
        readonly public_key?: string
        readonly redemption_limit?: string
        readonly token_ttl?: number
    }
}

export type WaMexACSServerProviderIssuanceResponse = {
    readonly xwa_wa_acs_issue_credentials?: {
        readonly creds?: {
            readonly evaluation?: ReadonlyArray<{
                readonly data?: string
            }>
            readonly proof?: ReadonlyArray<{
                readonly c?: string
                readonly s?: string
            }>
        }
        readonly error_message?: string
        readonly success?: boolean
    }
}

export type WaMexAcceptNewsletterAdminInviteResponse = {
    readonly xwa2_newsletter_admin_invite_accept?: {
        readonly __typename?: string
        readonly id?: string
    }
}

export type WaMexAdAccountReviewBaseCardResponse = {
    readonly maiba_ad_account?: {
        readonly account_dsl?: {
            readonly formatted_amount?: number
        }
        readonly account_status?: 'ACTIVE'
        readonly dsl_eligibility_status?: string
        readonly name?: string
    }
}

export type WaMexAdAccountReviewUtilsFetchMAIBAAccountReviewStatusResponse = {
    readonly xfb_maiba_account_status_review?: {
        readonly id?: string
        readonly review_status?: string
    }
}

export type WaMexAdPreferencesDFCABusinessOptOutResponse = {
    readonly update_dfca_optout?: {
        readonly business_info?: {
            readonly id?: string
        }
    }
}

export type WaMexAdPreferencesDemographicCategoryOptOutResponse = {
    readonly tc_remove_user_bct?: {
        readonly __typename?: string
        readonly id?: string
    }
}

export type WaMexAdPreferencesHideAdvertiserResponse = {
    readonly advertiser_hide?: {
        readonly advertiser?: {
            readonly id?: string
            readonly is_hidden?: boolean
        }
        readonly client_mutation_id?: string
    }
}

export type WaMexAdPreferencesInterestCategoryOptOutResponse = {
    readonly tc_remove_user_interest?: {
        readonly __typename?: string
        readonly id?: string
    }
}

export type WaMexAdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatusResponse = {
    readonly set_aplus_cfeature_sticky_status_ads_ad_account_settings?: {
        readonly ads_ad_account_settings?: {
            readonly feature_sticky_entries?: ReadonlyArray<{
                readonly feature_name?: string
                readonly status?: string
                readonly timestamp?: string
            }>
            readonly id?: string
        }
    }
}

export type WaMexAdsAdAccountSettingsStoreSourceServerResponse = {
    readonly ads_ad_account_settings_from_ad_account?: {
        readonly feature_sticky_entries?: ReadonlyArray<{
            readonly feature_name?: string
            readonly status?: string
            readonly timestamp?: string
        }>
        readonly id?: string
    }
}

export type WaMexAdsBulkEditCampaignGroupAgencyFeeBulkContainerResponse = {
    readonly ad_account?: {
        readonly agency_fee_config?: {
            readonly default_agency_fee_pct?: unknown
            readonly id?: string
            readonly is_agency_fee_disabled?: boolean
        }
        readonly can_manage_agency_fee?: boolean
        readonly can_see_agency_fee?: boolean
        readonly id?: string
        readonly tax_country?: unknown
    }
}

export type WaMexAdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFeeResponse = {
    readonly ad_account?: {
        readonly agency_fee_config?: {
            readonly default_agency_fee_pct?: unknown
            readonly id?: string
            readonly is_agency_fee_disabled?: boolean
        }
        readonly can_manage_agency_fee?: boolean
        readonly can_see_agency_fee?: boolean
        readonly id?: string
        readonly tax_country?: unknown
    }
}

export type WaMexAdsBulkEditCampaignGroupBudgetFieldContainer_Response = {
    readonly ad_account?: {
        readonly id?: string
    }
}

export type WaMexAdsBulkEditVARNCAConflictWrapper_Response = {
    readonly ad_account?: {
        readonly id?: string
        readonly value_adjustment_rule_collection?: {
            readonly nodes?: ReadonlyArray<{
                readonly campaigns?: {
                    readonly count?: unknown
                }
                readonly id?: string
                readonly name?: string
                readonly personas?: {
                    readonly nodes?: ReadonlyArray<{
                        readonly adjustment_sign?: unknown
                        readonly adjustment_weight?: unknown
                        readonly criterias?: {
                            readonly nodes?: ReadonlyArray<{
                                readonly criteria_type?: string
                                readonly id?: string
                                readonly operator?: unknown
                                readonly predicate_types?: unknown
                                readonly predicates?: unknown
                            }>
                        }
                        readonly id?: string
                        readonly name?: string
                        readonly status?: string
                    }>
                }
                readonly product_type?: string
                readonly status?: string
            }>
        }
    }
}

export type WaMexAdsManagerLiveDataCampaignResponse = {
    readonly nodes?: ReadonlyArray<{
        readonly __typename?: string
        readonly id?: string
    }>
}

export type WaMexAdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecsResponse = {
    readonly xfb_ads_ui_root?: {
        readonly campaigns_live_table_context?: {
            readonly campaign_ids?: ReadonlyArray<string>
            readonly campaigns?: {
                readonly nodes?: ReadonlyArray<{
                    readonly id?: string
                }>
            }
        }
    }
}

export type WaMexAdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWabaResponse = {
    readonly xfb_ctwa_flows_waba_for_ad_account?: {
        readonly waba_id?: string
    }
}

export type WaMexAiAgentAutoReplyControlResponse = {
    readonly xfb_whatsapp_smb_maiba_status_update?: {
        readonly success?: boolean
        readonly update_timestamp_ms?: number
    }
}

export type WaMexAuthAgentFeaturePolicyResponse = {
    readonly whatsapp_authorized_agent_feature_policy?: {
        readonly disabled_features?: ReadonlyArray<string>
    }
}

export type WaMexBPAccessTokenAndSessionCookiesResponse = {
    readonly xwa_bp_access_token_and_session_cookies?: {
        readonly access_token?: string
        readonly access_token_type?: string
        readonly bp_id?: string
        readonly email_attr?: string
        readonly session_cookies?: string
        readonly status?: string
    }
}

export type WaMexBizCreateOrderResponse = {
    readonly xwa_checkout_place_order?: {
        readonly order?: {
            readonly order_id?: string
            readonly price?: {
                readonly currency?: string
                readonly price_status?: string
                readonly subtotal_amount?: number
                readonly total_amount?: number
            }
            readonly token?: string
        }
    }
}

export type WaMexBizCustomUrlGetUserGraphqlResponse = {
    readonly xwa_custom_url_get_user?: {
        readonly error_code?: number
        readonly error_text?: string
        readonly lid?: string
        readonly success?: boolean
    }
}

export type WaMexBizGetCategoriesResponse = {
    readonly whatsapp_catkit_typeahead_proxy?: {
        readonly categories?: ReadonlyArray<{
            readonly display_name?: string
            readonly id?: string
        }>
        readonly not_a_biz?: {
            readonly display_name?: string
            readonly id?: string
        }
    }
}

export type WaMexBizGetCategoriesV2Response = {
    readonly whatsapp_catkit_typeahead_proxy?: {
        readonly categories?: ReadonlyArray<{
            readonly categories?: ReadonlyArray<{
                readonly categories?: ReadonlyArray<{
                    readonly display_name?: string
                    readonly id?: string
                }>
                readonly display_name?: string
                readonly id?: string
            }>
            readonly display_name?: string
            readonly id?: string
        }>
        readonly not_a_biz?: {
            readonly display_name?: string
            readonly id?: string
        }
    }
}

export type WaMexBizGetCustomUrlUserGraphqlResponse = {
    readonly xwa_custom_url_get_user?: {
        readonly error_code?: number
        readonly error_text?: string
        readonly success?: boolean
        readonly user?: {
            readonly jid?: string
        }
    }
}

export type WaMexBizGetMerchantComplianceResponse = {
    readonly xfb_whatsapp_biz_merchant_compliance_info?: {
        readonly merchant_info?: {
            readonly customer_care_details?: {
                readonly email?: string
                readonly landline_number?: string
                readonly mobile_number?: string
            }
            readonly entity_name?: string
            readonly entity_type?: string
            readonly entity_type_custom?: string
            readonly grievance_officer_details?: {
                readonly email?: string
                readonly landline_number?: string
                readonly mobile_number?: string
                readonly name?: string
            }
            readonly is_registered?: boolean
        }
    }
}

export type WaMexBizGetPriceTiersResponse = {
    readonly xwa_whatsapp_get_pricing_tiers?: {
        readonly price_tiers?: ReadonlyArray<{
            readonly description?: string
            readonly id?: string
            readonly symbol?: string
        }>
    }
}

export type WaMexBizGetProfileShimlinksResponse = {
    readonly xwa_whatsapp_smb_get_profile_linkshims?: ReadonlyArray<{
        readonly shimmed_website_url?: string
        readonly website?: string
    }>
}

export type WaMexBizGraphQLRefreshCartResponse = {
    readonly xwa_checkout_refresh_cart?: {
        readonly cart?: {
            readonly price_details?: {
                readonly currency?: string
                readonly price_status?: string
                readonly subtotal_amount?: number
                readonly total_amount?: number
            }
            readonly products?: ReadonlyArray<{
                readonly availability?: string
                readonly belongs_to?: string
                readonly compliance_category?: string
                readonly compliance_info?: {
                    readonly country_code_origin?: string
                    readonly importer_address?: {
                        readonly city?: string
                        readonly country_code?: string
                        readonly postal_code?: string
                        readonly region?: string
                        readonly street1?: string
                        readonly street2?: string
                    }
                    readonly importer_name?: string
                }
                readonly currency?: string
                readonly description?: string
                readonly id?: string
                readonly image_fetch_status?: string
                readonly is_hidden?: boolean
                readonly max_available?: number
                readonly media?: {
                    readonly images?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_dimensions?: {
                            readonly height?: number
                            readonly width?: number
                        }
                        readonly request_image_url?: string
                    }>
                    readonly videos?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_video_url?: string
                        readonly thumbnail_url?: string
                    }>
                }
                readonly name?: string
                readonly price?: string
                readonly product_availability?: string
                readonly retailer_id?: string
                readonly sale_price?: {
                    readonly end_date?: string
                    readonly price?: string
                    readonly start_date?: string
                }
                readonly status?: string
                readonly status_info?: {
                    readonly can_appeal?: boolean
                    readonly commerce_url?: string
                    readonly reject_reason?: string
                    readonly status?: string
                }
                readonly url?: string
                readonly variant_info?: {
                    readonly availability?: {
                        readonly listing?: ReadonlyArray<{
                            readonly is_available?: boolean
                            readonly options?: ReadonlyArray<{
                                readonly name?: string
                                readonly value?: string
                            }>
                            readonly product_id?: string
                        }>
                    }
                    readonly listing_details?: {
                        readonly description?: string
                        readonly lowest_price?: string
                        readonly multi_price?: string
                    }
                    readonly types?: ReadonlyArray<{
                        readonly name?: string
                        readonly options?: ReadonlyArray<{
                            readonly thumbnail_media?: {
                                readonly id?: string
                                readonly original_dimensions?: {
                                    readonly height?: number
                                    readonly width?: number
                                }
                                readonly original_image_url?: string
                                readonly request_image_url?: string
                            }
                            readonly value?: string
                        }>
                    }>
                    readonly variant_properties?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
            }>
        }
    }
}

export type WaMexBizProfileAddressAutocompleteResponse = {
    readonly whatsapp_maps_typeahead?: {
        readonly items?: ReadonlyArray<{
            readonly address?: {
                readonly city?: string
                readonly country?: string
                readonly postalcode?: string
                readonly stateprovince?: string
                readonly streetaddress?: string
            }
            readonly id?: string
            readonly location?: {
                readonly latitude?: number
                readonly longitude?: number
            }
            readonly title?: string
        }>
    }
}

export type WaMexBizProfileRootResponse = {
    readonly viewer?: {
        readonly backing_waba?: {
            readonly business_profile?: {
                readonly about?: unknown
                readonly business_hours?: {
                    readonly note?: string
                    readonly operating_ranges?: ReadonlyArray<{
                        readonly close_time?: string
                        readonly day_of_week?: number
                        readonly mode?: string
                        readonly open_time?: string
                    }>
                    readonly timezone_id?: string
                }
                readonly description?: string
                readonly email?: string
                readonly id?: string
                readonly latitude?: number
                readonly localized_categories?: ReadonlyArray<{
                    readonly id?: string
                    readonly localized_display_name?: string
                }>
                readonly longitude?: number
                readonly physical_address?: unknown
                readonly service_areas?: ReadonlyArray<{
                    readonly description?: string
                    readonly radius_meters?: unknown
                }>
                readonly websites?: unknown
            }
            readonly id?: string
        }
    }
}

export type WaMexBizQueryOrderResponse = {
    readonly xwa_checkout_get_order_info?: {
        readonly order?: {
            readonly creation_time_stamp?: string
            readonly price_details?: {
                readonly currency?: string
                readonly subtotal_amount?: string
                readonly total_amount?: string
            }
            readonly products?: ReadonlyArray<{
                readonly currency?: string
                readonly id?: string
                readonly media?: {
                    readonly images?: ReadonlyArray<{
                        readonly id?: string
                        readonly request_image_url?: string
                    }>
                }
                readonly name?: string
                readonly price?: string
                readonly quantity?: string
                readonly variant_info?: {
                    readonly variant_properties?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
            }>
        }
    }
}

export type WaMexBizSetMerchantComplianceResponse = {
    readonly xfb_whatsapp_biz_merchant_set_compliance_info?: {
        readonly __typename?: string
        readonly merchant_info?: {
            readonly customer_care_details?: {
                readonly email?: string
                readonly landline_number?: string
                readonly mobile_number?: string
            }
            readonly entity_name?: string
            readonly entity_type?: string
            readonly entity_type_custom?: string
            readonly grievance_officer_details?: {
                readonly email?: string
                readonly landline_number?: string
                readonly mobile_number?: string
                readonly name?: string
            }
            readonly is_registered?: boolean
        }
    }
}

export type WaMexCTXChatBuilderDialogContainerUtilsResponse = {
    readonly welcome_message_flows?: {
        readonly has_welcome_message_flows?: boolean
    }
}

export type WaMexCTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModalResponse = {
    readonly xfb_wa_flows_hsm_save_flow?: {
        readonly id?: string
    }
}

export type WaMexCachedTokenResponse = {
    readonly xwa2_ent_trade_canonical_nonce_for_access_tokens?: {
        readonly encrypted_access_tokens?: {
            readonly algorithm?: string
            readonly data?: string
            readonly key?: string
            readonly nonce?: string
            readonly tag?: string
        }
    }
}

export type WaMexCanonicalUserValidResponse = {
    readonly xwa_canonical_user_valid?: {
        readonly success?: boolean
    }
}

export type WaMexChangeNewsletterOwnerResponse = {
    readonly xwa2_newsletter_change_owner?: {
        readonly __typename?: string
        readonly id?: string
    }
}

export type WaMexConsumerFetchQuickPromotionsResponse = {
    readonly quick_promotion_multiverse_batch_fetch_root?: ReadonlyArray<{
        readonly eligible_promotions?: {
            readonly edges?: ReadonlyArray<{
                readonly client_ttl_seconds?: number
                readonly is_holdout?: boolean
                readonly log_eligibility_waterfall?: string
                readonly node?: {
                    readonly __typename?: string
                    readonly ab_prop_name?: string
                    readonly client_side_dry_run?: boolean
                    readonly content_attributes?: {
                        readonly wa_banner_background_color?: {
                            readonly dark_mode_background_color?: string
                            readonly dark_mode_highlight_color?: string
                            readonly light_mode_background_color?: string
                            readonly light_mode_highlight_color?: string
                        }
                        readonly wa_eligible_duration_after_impression_in_seconds?: number
                        readonly wa_primary_cta_alternative_url?: string
                    }
                    readonly contextual_filters_for_wa_do_not_use?: {
                        readonly clause_type?: string
                        readonly clauses?: ReadonlyArray<{
                            readonly clause_type?: string
                            readonly clauses?: ReadonlyArray<{
                                readonly clause_type?: string
                                readonly clauses?: ReadonlyArray<{
                                    readonly clause_type?: string
                                    readonly clauses?: ReadonlyArray<{
                                        readonly clause_type?: string
                                        readonly clauses?: ReadonlyArray<{
                                            readonly clause_type?: string
                                            readonly clauses?: ReadonlyArray<{
                                                readonly clause_type?: string
                                                readonly clauses?: ReadonlyArray<{
                                                    readonly clause_type?: string
                                                    readonly filters?: ReadonlyArray<{
                                                        readonly filter_name?: string
                                                        readonly filter_result?: string
                                                        readonly parameters?: ReadonlyArray<{
                                                            readonly key?: string
                                                            readonly value?: string
                                                        }>
                                                        readonly passes_if_client_not_supported?: boolean
                                                    }>
                                                }>
                                                readonly filters?: ReadonlyArray<{
                                                    readonly filter_name?: string
                                                    readonly filter_result?: string
                                                    readonly parameters?: ReadonlyArray<{
                                                        readonly key?: string
                                                        readonly value?: string
                                                    }>
                                                    readonly passes_if_client_not_supported?: boolean
                                                }>
                                            }>
                                            readonly filters?: ReadonlyArray<{
                                                readonly filter_name?: string
                                                readonly filter_result?: string
                                                readonly parameters?: ReadonlyArray<{
                                                    readonly key?: string
                                                    readonly value?: string
                                                }>
                                                readonly passes_if_client_not_supported?: boolean
                                            }>
                                        }>
                                        readonly filters?: ReadonlyArray<{
                                            readonly filter_name?: string
                                            readonly filter_result?: string
                                            readonly parameters?: ReadonlyArray<{
                                                readonly key?: string
                                                readonly value?: string
                                            }>
                                            readonly passes_if_client_not_supported?: boolean
                                        }>
                                    }>
                                    readonly filters?: ReadonlyArray<{
                                        readonly filter_name?: string
                                        readonly filter_result?: string
                                        readonly parameters?: ReadonlyArray<{
                                            readonly key?: string
                                            readonly value?: string
                                        }>
                                        readonly passes_if_client_not_supported?: boolean
                                    }>
                                }>
                                readonly filters?: ReadonlyArray<{
                                    readonly filter_name?: string
                                    readonly filter_result?: string
                                    readonly parameters?: ReadonlyArray<{
                                        readonly key?: string
                                        readonly value?: string
                                    }>
                                    readonly passes_if_client_not_supported?: boolean
                                }>
                            }>
                            readonly filters?: ReadonlyArray<{
                                readonly filter_name?: string
                                readonly filter_result?: string
                                readonly parameters?: ReadonlyArray<{
                                    readonly key?: string
                                    readonly value?: string
                                }>
                                readonly passes_if_client_not_supported?: boolean
                            }>
                        }>
                        readonly filters?: ReadonlyArray<{
                            readonly filter_name?: string
                            readonly filter_result?: string
                            readonly parameters?: ReadonlyArray<{
                                readonly key?: string
                                readonly value?: string
                            }>
                            readonly passes_if_client_not_supported?: boolean
                        }>
                    }
                    readonly creatives?: ReadonlyArray<{
                        readonly __typename?: string
                        readonly accessibility_text_for_image?: string
                        readonly content?: {
                            readonly text?: string
                        }
                        readonly dismiss_action?: {
                            readonly __typename?: string
                            readonly limit?: string
                        }
                        readonly id?: string
                        readonly is_dismissible?: boolean
                        readonly primary_action?: {
                            readonly __typename?: string
                            readonly limit?: number
                            readonly title?: {
                                readonly text?: string
                            }
                            readonly url?: string
                        }
                        readonly title?: {
                            readonly text?: string
                        }
                        readonly wa_dark_mode_media_details?: {
                            readonly jpeg_thumbnail?: string
                        }
                        readonly wa_light_mode_media_details?: {
                            readonly jpeg_thumbnail?: string
                        }
                    }>
                    readonly encrypted_logging_data?: string
                    readonly id?: string
                    readonly is_server_force_pass?: boolean
                    readonly max_impressions?: number
                    readonly promotion_id?: string
                    readonly surface_delay_in_seconds?: number
                    readonly wa_qp_content_attributes_do_not_use?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
                readonly priority?: number
                readonly time_range?: {
                    readonly end?: string
                    readonly start?: string
                }
            }>
        }
        readonly surface_nux_id?: string
    }>
}

export type WaMexConsumerQuickPromotionActionGraphQLResponse = {
    readonly wa_consumer_quick_promotion_log_event?: {
        readonly client_mutation_id?: string
    }
}

export type WaMexContactManagerCustomerProfileResponse = {
    readonly xfb_wa_customer_profile?: {
        readonly acquisition_date?: string
        readonly acquisition_source?: string
        readonly address?: string
        readonly dob?: unknown
        readonly email?: string
        readonly last_order_date?: string
        readonly last_updates?: ReadonlyArray<{
            readonly ts?: unknown
        }>
        readonly lead_stage?: unknown
        readonly name?: string
    }
}

export type WaMexContactManagerCustomerProfileUpsertResponse = {
    readonly xfb_wa_upsert_customer_profiles?: {
        readonly profiles?: ReadonlyArray<{
            readonly lid?: string
        }>
    }
}

export type WaMexContactManagerCustomerProfilesResponse = {
    readonly xfb_wa_customer_profiles?: {
        readonly cursor?: string
        readonly profiles?: ReadonlyArray<{
            readonly acquisition_source?: string
            readonly email?: string
            readonly last_order_date?: string
            readonly last_updates?: ReadonlyArray<{
                readonly ts?: unknown
            }>
            readonly lead_stage?: unknown
            readonly lid?: string
            readonly name?: string
        }>
    }
}

export type WaMexCreateEnforcementAppealResponse = {
    readonly xwa2_create_enforcement_appeal?: {
        readonly appeal_creation_time?: string
        readonly appeal_state?: string
    }
}

export type WaMexCreateInviteCodeResponse = {
    readonly xwa2_growth_create_invite_code?: {
        readonly code?: string
    }
}

export type WaMexCreateLabyrinthBackupResponse = {
    readonly wa_labyrinth_create_backup?: {
        readonly __typename?: string
        readonly backup_id?: string
        readonly device_id?: string
        readonly epoch_id?: string
        readonly mailbox_id?: string
        readonly message?: string
        readonly status?: string
        readonly vd_device_id?: string
    }
}

export type WaMexCreateMarketingCampaignActionResponse = {
    readonly whatsapp_marketing_messages_create?: {
        readonly ad_campaign_group_id?: string
        readonly ad_campaign_id?: string
        readonly ad_creative_id?: string
        readonly ad_group_id?: string
        readonly ad_id?: string
        readonly campaign_name?: string
        readonly lifetime_budget?: string
        readonly start_time?: string
        readonly status?: string
    }
}

export type WaMexCreateNewsletterResponse = {
    readonly xwa2_newsletter_create?: {
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
        readonly thread_metadata?: {
            readonly creation_time?: string
            readonly description?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly handle?: string
            readonly invite?: string
            readonly name?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly picture?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'IMAGE' | 'PREVIEW'
            }
            readonly preview?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'PREVIEW'
            }
            readonly subscribers_count?: string
            readonly verification?: 'UNVERIFIED' | 'VERIFIED'
        }
        readonly viewer_metadata?: {
            readonly role?: 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
            readonly settings?: ReadonlyArray<{
                readonly type?: 'MUTE_ADMIN_ACTIVITY' | 'MUTE_FOLLOWER_ACTIVITY'
                readonly value?: 'OFF' | 'ON'
            }>
        }
    }
}

export type WaMexCreateNewsletterAdminInviteResponse = {
    readonly xwa2_newsletter_admin_invite_create?: {
        readonly id?: string
        readonly invite_expiration_time?: string
    }
}

export type WaMexCreateReportAppealResponse = {
    readonly xwa2_create_channel_report_appeal_v2?: {
        readonly appeal?: {
            readonly appeal_id?: string
            readonly appeal_reason?: string
            readonly creation_time?: string
            readonly report_id?: string
            readonly state?: 'CONTENT_UNAVAILABLE' | 'NON_APPEALABLE' | 'NOT_APPEALED' | 'PENDING' | 'REJECT' | 'SUCCESS'
        }
        readonly appeal_reason_options?: ReadonlyArray<{
            readonly label?: string
            readonly reason?: string
        }>
        readonly channel_jid?: string
        readonly channel_name?: string
        readonly creation_time?: string
        readonly last_update_time?: string
        readonly report_id?: string
        readonly reported_content_data?: {
            readonly __typename?: string
            readonly notify_name?: string
            readonly question_data?: {
                readonly __typename?: string
                readonly server_msg_id?: string
            }
            readonly server_id?: string
            readonly server_msg_id?: string
            readonly server_response_id?: string
        }
        readonly status?: string
    }
}

export type WaMexCreateWhatsAppAdsIdentityResponse = {
    readonly create_or_update_whatsapp_ads_identity?: {
        readonly id?: string
    }
}

export type WaMexCustomLabel3pdEventResponse = {
    readonly xwa_get_3pd_event?: ReadonlyArray<{
        readonly ctwa_3pd_conversion_metadata?: string
        readonly ctwa_3pd_conversion_subtype?: string
        readonly ctwa_3pd_conversion_type?: string
        readonly custom_label?: string
    }>
}

export type WaMexDebugLabyrinthInboxSnapshotResponse = {
    readonly get_wa_mailbox?: {
        readonly __typename?: string
        readonly id?: string
        readonly threads?: {
            readonly __typename?: string
            readonly nodes?: ReadonlyArray<{
                readonly __typename?: string
                readonly id?: string
                readonly messages?: {
                    readonly __typename?: string
                    readonly edges?: ReadonlyArray<{
                        readonly __typename?: string
                        readonly node?: {
                            readonly __typename?: string
                            readonly encrypted_payload?: unknown
                            readonly encryption_version?: number
                            readonly id?: string
                        }
                    }>
                }
            }>
        }
    }
}

export type WaMexDebugLabyrinthRangeResponse = {
    readonly get_WAMessagingViewerThreadByORF?: {
        readonly __typename?: string
        readonly id?: string
        readonly messages?: {
            readonly __typename?: string
            readonly edges?: ReadonlyArray<{
                readonly __typename?: string
                readonly cursor?: string
                readonly node?: {
                    readonly __typename?: string
                    readonly encrypted_payload?: unknown
                    readonly encryption_version?: number
                    readonly id?: string
                }
            }>
            readonly page_info?: {
                readonly has_next_page?: boolean
                readonly has_previous_page?: boolean
            }
        }
    }
}

export type WaMexDeleteNewsletterResponse = {
    readonly xwa2_newsletter_delete_v2?: {
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
    }
}

export type WaMexDemoteNewsletterAdminResponse = {
    readonly xwa2_newsletter_admin_demote?: {
        readonly __typename?: string
        readonly id?: string
    }
}

export type WaMexE2EEMetadataMailboxAddGroupParticipantsResponse = {
    readonly xfb_e2ee_metadata_mailbox_add_group_participants?: {
        readonly is_dma_interop?: boolean
    }
}

export type WaMexE2EEMetadataMailboxCreateGroupThreadResponse = {
    readonly xfb_create_group_thread_through_mi?: {
        readonly exception_error_code?: unknown
        readonly gid?: unknown
        readonly participants?: ReadonlyArray<{
            readonly contact_id?: string
            readonly is_addressable?: boolean
            readonly status?: string
            readonly type?: 'COMMUNITY' | 'DEFAULT' | 'LINKED_ANNOUNCEMENT_GROUP' | 'LINKED_GENERAL_GROUP' | 'LINKED_SUBGROUP'
        }>
        readonly success?: boolean
        readonly thread_already_exists?: unknown
    }
}

export type WaMexE2EEMetadataMailboxDemoteGroupParticipantsResponse = {
    readonly xfb_e2ee_metadata_mailbox_demote_group_participants?: {
        readonly success?: boolean
    }
}

export type WaMexE2EEMetadataMailboxFetchGroupInfoV4Response = {
    readonly xfb_fetch_group_info_from_mi_v4?: {
        readonly creation_ts_ms?: string
        readonly creator_id?: string
        readonly exception_error_code?: unknown
        readonly group_domain?: unknown
        readonly group_evolution_version?: number
        readonly open_thread_id?: string
        readonly participant_update_mode?: 'OPEN'
        readonly participant_version_id?: number
        readonly participants?: ReadonlyArray<{
            readonly contact_id?: string
            readonly dma_interop_device_id?: string
            readonly dma_interop_integrator_id?: string
            readonly is_addressable?: boolean
            readonly status?: string
            readonly type?: 'E2EE_GROUP_PARTICIPANT_TYPE_ADMIN' | 'E2EE_GROUP_PARTICIPANT_TYPE_SUPER_ADMIN'
        }>
        readonly subject_change?: {
            readonly subject?: string
            readonly subject_change_ts_ms?: number
            readonly subject_changer_id?: string
        }
        readonly success?: boolean
        readonly thread_ephemerality_data?: {
            readonly e2ee_attribution_timestamp_ms?: number
            readonly last_set_action_log_type?: string
            readonly last_set_actor_id?: string
            readonly last_set_timestamp_ms?: number
            readonly last_set_ttl_sec?: number
            readonly mode?: string
            readonly ttl_sec?: number
        }
        readonly transport_thread_fbid?: string
    }
}

export type WaMexE2EEMetadataMailboxLeaveGroupResponse = {
    readonly xfb_e2ee_metadata_mailbox_leave_group?: {
        readonly is_dma_interop?: boolean
    }
}

export type WaMexE2EEMetadataMailboxPromoteGroupParticipantsResponse = {
    readonly xfb_e2ee_metadata_mailbox_promote_group_participants?: {
        readonly success?: boolean
    }
}

export type WaMexE2EEMetadataMailboxRemoveGroupParticipantsResponse = {
    readonly xfb_e2ee_metadata_mailbox_remove_group_participants?: {
        readonly success?: boolean
    }
}

export type WaMexE2EEMetadataMailboxSetGroupSubjectResponse = {
    readonly xfb_e2ee_metadata_mailbox_set_group_subject?: {
        readonly success?: boolean
    }
}

export type WaMexEBMessageRangeQueryForThreadsResponse = {
    readonly viewer?: {
        readonly encrypted_backup?: {
            readonly id?: string
            readonly mailbox?: {
                readonly messages_from_selected_threads?: ReadonlyArray<{
                    readonly backup_id?: string
                    readonly encrypted_messages?: ReadonlyArray<{
                        readonly attachment_data?: ReadonlyArray<{
                            readonly attachment_cdn_url?: string
                            readonly attachment_object_id?: string
                        }>
                        readonly echo_document?: {
                            readonly echo_document_string?: unknown
                            readonly encryption_version?: number
                            readonly epoch_anon_id?: string
                            readonly epoch_fingerprint?: unknown
                            readonly epoch_id?: string
                        }
                        readonly otid?: unknown
                        readonly protobuf_stanzas?: {
                            readonly message_tags?: ReadonlyArray<string>
                            readonly supplemental_protobufs?: ReadonlyArray<{
                                readonly encrypted_protobuf_stanza?: unknown
                                readonly encryption_version?: number
                                readonly epoch_anon_id?: string
                                readonly epoch_id?: string
                                readonly protobuf_timestamp_ms?: number
                                readonly sk_ciphertext?: string
                                readonly supplemental_key?: string
                                readonly supplemental_otid?: unknown
                            }>
                            readonly supplemental_protobufs_v2?: ReadonlyArray<{
                                readonly actor_token?: string
                                readonly encrypted_protobuf?: unknown
                                readonly franking_tag?: string
                                readonly mek_fbid?: string
                                readonly mek_id?: string
                                readonly message_encryption_version?: number
                                readonly message_metadata_version?: number
                                readonly protobuf_timestamp?: string
                                readonly reporting_tag?: string
                                readonly supplemental_key?: string
                                readonly supplemental_otid?: unknown
                                readonly transport_sender_message_signature?: string
                                readonly transport_sender_signing_pk?: unknown
                            }>
                            readonly top_level_protobuf?: {
                                readonly encrypted_protobuf_stanza?: unknown
                                readonly encryption_version?: number
                                readonly epoch_anon_id?: string
                                readonly epoch_id?: string
                                readonly protobuf_timestamp_ms?: number
                                readonly sk_ciphertext?: string
                            }
                            readonly top_level_protobuf_unencrypted?: {
                                readonly protobuf_timestamp_ms?: number
                                readonly unencrypted_protobuf?: unknown
                            }
                            readonly top_level_protobuf_v2?: {
                                readonly actor_token?: string
                                readonly encrypted_protobuf?: unknown
                                readonly franking_tag?: string
                                readonly mek_fbid?: string
                                readonly mek_id?: string
                                readonly message_encryption_version?: number
                                readonly message_metadata_version?: number
                                readonly protobuf_timestamp?: string
                                readonly reporting_tag?: string
                                readonly transport_sender_message_signature?: string
                                readonly transport_sender_signing_pk?: unknown
                            }
                        }
                    }>
                    readonly epoch_derivation_set?: {
                        readonly epoch_edges?: ReadonlyArray<{
                            readonly backward_edge?: unknown
                            readonly forward_edge?: {
                                readonly auth_public_key?: string
                                readonly encrypted_entropy?: unknown
                                readonly entropy_fingerprint?: unknown
                                readonly epoch_storage_public_key?: string
                                readonly psk_fingerprint?: unknown
                            }
                            readonly from_epoch?: {
                                readonly epoch_anon_id?: string
                                readonly epoch_id?: string
                            }
                            readonly from_epoch_fingerprint?: unknown
                            readonly to_epoch?: {
                                readonly epoch_anon_id?: string
                                readonly epoch_id?: string
                            }
                            readonly to_epoch_fingerprint?: unknown
                        }>
                    }
                    readonly exception_string?: unknown
                    readonly message_range_info?: {
                        readonly has_more_after?: boolean
                        readonly has_more_before?: boolean
                        readonly next_message_timestamp_ms_after?: unknown
                        readonly next_message_timestamp_ms_before?: unknown
                    }
                    readonly minos_decryption_keys?: ReadonlyArray<{
                        readonly id?: string
                        readonly keys?: {
                            readonly mek_creator_info?: {
                                readonly mandrake_keys?: {
                                    readonly encrypted_mek?: unknown
                                    readonly mek_encryption_version?: number
                                    readonly recipient_encrypted_mmk?: unknown
                                    readonly recipient_encrypted_mmk_mailbox_head_hash?: string
                                    readonly recipient_mailbox_head_hash?: string
                                    readonly recipient_membership_proof?: string
                                    readonly recipient_membership_proof_leaf_index?: number
                                    readonly recipient_membership_proof_total_leaves?: unknown
                                    readonly recipient_mmk_auth_pk?: unknown
                                    readonly recipient_mmk_device_roster_hash?: string
                                    readonly recipient_mmk_enc_pk?: unknown
                                    readonly recipient_mmk_epoch_head?: unknown
                                    readonly recipient_mmk_sequence_number?: unknown
                                    readonly recipient_mmk_sig_pk?: unknown
                                    readonly recipients_hash?: string
                                    readonly sender_epoch_number?: unknown
                                    readonly sender_mailbox_auth_pk?: unknown
                                    readonly sender_mailbox_encryption_pk?: unknown
                                    readonly sender_mailbox_signing_pk?: unknown
                                    readonly sender_previous_epoch_head?: unknown
                                    readonly sender_user_fbid?: string
                                }
                                readonly minos_keys?: {
                                    readonly sender_auth_pk?: unknown
                                    readonly sender_epoch_head?: unknown
                                }
                                readonly transport_keys?: {
                                    readonly ephm_hpke_pk?: unknown
                                    readonly ephm_signature?: string
                                    readonly mek_creator_transport_signing_pk?: unknown
                                }
                            }
                            readonly mek_info?: {
                                readonly encrypted_mek?: unknown
                                readonly mek_creation_timestamp?: string
                                readonly mek_encryption_version?: number
                                readonly mek_id?: string
                                readonly roster_hash?: string
                            }
                            readonly recipient_info?: {
                                readonly epoch_anon_id?: string
                                readonly epoch_fbid?: string
                                readonly epoch_head?: unknown
                            }
                        }
                    }>
                    readonly should_delete_mailbox?: boolean
                    readonly thread_not_found?: unknown
                }>
            }
        }
    }
}

export type WaMexEBMinosFetchContactKeysResponse = {
    readonly xfb_minos_fetch_mailbox_public_keys?: {
        readonly __typename?: string
        readonly code?: string
        readonly contact_id_to_minos_params?: ReadonlyArray<{
            readonly contact_id?: string
            readonly mailbox_public_keys?: {
                readonly auth_pk_b64?: unknown
                readonly enc_pk_b64?: unknown
                readonly epoch_anon_id_b64?: unknown
                readonly epoch_head_b64?: unknown
                readonly epoch_head_ctime?: unknown
                readonly fbid?: unknown
                readonly prev_epoch_head_b64?: unknown
                readonly self_signature_b64?: unknown
                readonly sign_pk_b64?: unknown
            }
        }>
        readonly message?: string
    }
}

export type WaMexEBMinosUploadMessagesResponse = {
    readonly xfb_upload_encrypted_msg_to_backup?: {
        readonly backup_write_result_response?: {
            readonly delete_mailbox?: unknown
            readonly is_success?: boolean
            readonly protobuf_params?: {
                readonly delete_on_success?: unknown
            }
        }
        readonly exception_string?: unknown
        readonly labyrinth_1_1?: {
            readonly device_epoch_status?: string
            readonly is_success?: boolean
            readonly mek_registration_results?: ReadonlyArray<{
                readonly is_success?: boolean
                readonly mek_fbid?: string
                readonly mek_id_base64?: unknown
            }>
            readonly update_outdated_contact_minos_keys?: {
                readonly update_response_params?: ReadonlyArray<{
                    readonly fbid?: unknown
                    readonly minos_params_for_update_contact?: {
                        readonly contact_id?: string
                        readonly minos_params?: {
                            readonly epoch_anon_id_base64?: unknown
                            readonly epoch_head_base64?: unknown
                            readonly epoch_head_creation_time?: string
                            readonly mailbox_encryption_public_key_base64?: unknown
                            readonly minos_epoch_signature_self_base64?: unknown
                            readonly minos_mailbox_auth_pubkey_base64?: unknown
                            readonly minos_mailbox_public_keys_fbid?: string
                            readonly minos_mailbox_signing_pubkey_base64?: unknown
                            readonly minos_previous_epoch_head_base64?: unknown
                        }
                    }
                }>
            }
        }
    }
}

export type WaMexEBRegisterMinosMessageEncryptionKeyResponse = {
    readonly xfb_minos_register_message_encryption_key?: {
        readonly __typename?: string
        readonly code?: string
        readonly mek_fbid?: string
        readonly message?: string
    }
}

export type WaMexEditBizProfileResponse = {
    readonly edit_wa_web_biz_profile?: boolean
}

export type WaMexExternalCtxAuthoriseWAChatResponse = {
    readonly xwa_external_ctx_authorise_wa_chat?: {
        readonly partner_name?: string
        readonly success?: boolean
    }
}

export type WaMexFetchAboutStatusResponse = {
    readonly xwa2_users_updates_since?: ReadonlyArray<{
        readonly updates?: ReadonlyArray<{
            readonly __typename?: string
            readonly text?: string
        }>
    }>
}

export type WaMexFetchAllNewslettersMetadataResponse = {
    readonly xwa2_newsletter_subscribed?: ReadonlyArray<{
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
        readonly status_metadata?: {
            readonly last_status_sent_time?: string
            readonly last_status_server_id?: string
        }
        readonly thread_metadata?: {
            readonly creation_time?: string
            readonly description?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly handle?: string
            readonly invite?: string
            readonly name?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly picture?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'IMAGE' | 'PREVIEW'
            }
            readonly preview?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'PREVIEW'
            }
            readonly settings?: {
                readonly reaction_codes?: {
                    readonly value?: 'ALL'
                }
            }
            readonly verification?: 'UNVERIFIED' | 'VERIFIED'
            readonly wamo_sub?: {
                readonly plan_id?: string
            }
        }
        readonly viewer_metadata?: {
            readonly role?: 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
            readonly settings?: ReadonlyArray<{
                readonly type?: 'MUTE_ADMIN_ACTIVITY' | 'MUTE_FOLLOWER_ACTIVITY'
                readonly value?: 'OFF' | 'ON'
            }>
            readonly wamo_sub_status?: 'ACTIVE' | 'INACTIVE'
        }
    }>
}

export type WaMexFetchAllSubgroupsResponse = {
    readonly xwa2_group_query_by_id?: {
        readonly __typename?: string
        readonly default_sub_group?: {
            readonly id?: string
            readonly subject?: {
                readonly creation_time?: string
                readonly value?: string
            }
        }
        readonly id?: string
        readonly sub_groups?: {
            readonly edges?: ReadonlyArray<{
                readonly node?: {
                    readonly id?: string
                    readonly membership_approval_requests?: {
                        readonly total_count?: number
                    }
                    readonly properties?: {
                        readonly general_chat?: boolean
                        readonly hidden_group?: boolean
                        readonly membership_approval_mode_enabled?: boolean
                    }
                    readonly subject?: {
                        readonly creation_time?: string
                        readonly value?: string
                    }
                }
            }>
        }
    }
}

export type WaMexFetchBotCertificateRevocationListResponse = {
    readonly xwa2_fetch_feature_pki_crl?: {
        readonly crl?: unknown
        readonly next_update?: string
    }
}

export type WaMexFetchBotProfilesGQLResponse = {
    readonly xfb_fetch_genai_personas?: ReadonlyArray<{
        readonly __typename?: string
        readonly creator?: {
            readonly name?: string
            readonly profile_uri?: string
        }
        readonly id?: string
        readonly is_meta_created?: boolean
        readonly jid?: string
        readonly latest_published_version_for_viewer?: {
            readonly __typename?: string
            readonly description?: string
            readonly icebreaker_prompt_list?: ReadonlyArray<string>
            readonly id?: string
            readonly name?: string
            readonly posing_as_professional?: boolean
        }
    }>
}

export type WaMexFetchDynamicAIModesResponse = {
    readonly xfb_meta_ai_modes?: ReadonlyArray<{
        readonly is_experimental?: boolean
        readonly mode_id?: string
        readonly subtitle?: string
        readonly title?: string
        readonly type?: string
    }>
}

export type WaMexFetchGroupInfoResponse = {
    readonly xwa2_group_query_by_id?: {
        readonly __typename?: string
        readonly creation_time?: string
        readonly creator?: {
            readonly id?: string
            readonly lid?: string
            readonly pn?: string
            readonly username_info?: {
                readonly __typename?: string
                readonly username?: string
            }
        }
        readonly description?: {
            readonly creation_time?: string
            readonly creator?: {
                readonly id?: string
                readonly lid?: string
                readonly pn?: string
                readonly username_info?: {
                    readonly __typename?: string
                    readonly username?: string
                }
            }
            readonly id?: string
            readonly value?: string
        }
        readonly id?: string
        readonly membership_approval_request?: boolean
        readonly missing_participant_identification?: boolean
        readonly participants?: {
            readonly edges?: ReadonlyArray<{
                readonly group_history_sent?: boolean
                readonly join_time?: string
                readonly node?: {
                    readonly display_name?: string
                    readonly id?: string
                    readonly lid?: string
                    readonly pn?: string
                    readonly username_info?: {
                        readonly __typename?: string
                        readonly username?: string
                    }
                }
                readonly role?: 'ADMIN_MEMBER' | 'MEMBER' | 'SUPERADMIN_MEMBER'
            }>
            readonly participants_phash_match?: boolean
        }
        readonly properties?: {
            readonly allow_admin_reports?: boolean
            readonly allow_non_admin_sub_group_creation?: boolean
            readonly announcement?: boolean
            readonly appeal_status?: string
            readonly appeal_update_time?: string
            readonly auto_add_disabled?: boolean
            readonly capi?: boolean
            readonly closed_by_membership_approval_mode?: boolean
            readonly ephemeral?: {
                readonly expiration_time_in_sec?: number
            }
            readonly general_chat?: boolean
            readonly group_safety_check?: boolean
            readonly growth_locked2?: {
                readonly locked?: boolean
            }
            readonly hidden_group?: boolean
            readonly lid_migration_state?: {
                readonly addressing_mode?: 'LID'
            }
            readonly limit_sharing?: {
                readonly limit_sharing_enabled?: boolean
            }
            readonly locked?: boolean
            readonly member_add_mode?: 'ADMIN_ADD' | 'ALL_MEMBER_ADD'
            readonly member_link_mode?: 'ADMIN_LINK' | 'ALL_MEMBER_LINK'
            readonly member_share_group_history_mode?: 'ALL_MEMBER_SHARE'
            readonly membership_approval_mode_enabled?: boolean
            readonly parent_group_jid?: string
            readonly support?: boolean
        }
        readonly state?: 'ACTIVE' | 'NON_EXISTENT' | 'SUSPENDED'
        readonly subject?: {
            readonly creation_time?: string
            readonly creator?: {
                readonly id?: string
                readonly lid?: string
                readonly pn?: string
                readonly username_info?: {
                    readonly __typename?: string
                    readonly username?: string
                }
            }
            readonly value?: string
        }
        readonly total_participants_count?: number
    }
}

export type WaMexFetchGroupInfoIncludBotsResponse = {
    readonly xwa2_group_query_by_id?: {
        readonly __typename?: string
        readonly creation_time?: string
        readonly creator?: {
            readonly id?: string
            readonly lid?: string
            readonly pn?: string
            readonly username_info?: {
                readonly __typename?: string
                readonly username?: string
            }
        }
        readonly description?: {
            readonly creation_time?: string
            readonly creator?: {
                readonly id?: string
                readonly lid?: string
                readonly pn?: string
                readonly username_info?: {
                    readonly __typename?: string
                    readonly username?: string
                }
            }
            readonly id?: string
            readonly value?: string
        }
        readonly id?: string
        readonly membership_approval_request?: boolean
        readonly missing_participant_identification?: boolean
        readonly participants?: {
            readonly edges?: ReadonlyArray<{
                readonly group_history_sent?: boolean
                readonly join_time?: string
                readonly participant?: {
                    readonly __typename?: string
                    readonly display_name?: string
                    readonly id?: string
                    readonly jid?: string
                    readonly lid?: string
                    readonly pn?: string
                    readonly username_info?: {
                        readonly __typename?: string
                        readonly username?: string
                    }
                }
                readonly role?: 'ADMIN_MEMBER' | 'MEMBER' | 'SUPERADMIN_MEMBER'
            }>
            readonly participants_phash_match?: boolean
        }
        readonly properties?: {
            readonly allow_admin_reports?: boolean
            readonly allow_non_admin_sub_group_creation?: boolean
            readonly announcement?: boolean
            readonly appeal_status?: string
            readonly appeal_update_time?: string
            readonly auto_add_disabled?: boolean
            readonly capi?: boolean
            readonly closed_by_membership_approval_mode?: boolean
            readonly ephemeral?: {
                readonly expiration_time_in_sec?: number
            }
            readonly general_chat?: boolean
            readonly group_safety_check?: boolean
            readonly growth_locked2?: {
                readonly locked?: boolean
            }
            readonly hidden_group?: boolean
            readonly lid_migration_state?: {
                readonly addressing_mode?: 'LID'
            }
            readonly limit_sharing?: {
                readonly limit_sharing_enabled?: boolean
            }
            readonly locked?: boolean
            readonly member_add_mode?: 'ADMIN_ADD' | 'ALL_MEMBER_ADD'
            readonly member_link_mode?: 'ADMIN_LINK' | 'ALL_MEMBER_LINK'
            readonly member_share_group_history_mode?: 'ALL_MEMBER_SHARE'
            readonly membership_approval_mode_enabled?: boolean
            readonly parent_group_jid?: string
            readonly support?: boolean
        }
        readonly state?: 'ACTIVE' | 'NON_EXISTENT' | 'SUSPENDED'
        readonly subject?: {
            readonly creation_time?: string
            readonly creator?: {
                readonly id?: string
                readonly lid?: string
                readonly pn?: string
                readonly username_info?: {
                    readonly __typename?: string
                    readonly username?: string
                }
            }
            readonly value?: string
        }
        readonly total_participants_count?: number
    }
}

export type WaMexFetchGroupInviteCodeResponse = {
    readonly xwa2_group_query_by_id?: {
        readonly __typename?: string
        readonly id?: string
        readonly invite_code?: string
    }
}

export type WaMexFetchGroupIsInternalResponse = {
    readonly xwa2_group_query_by_id?: {
        readonly __typename?: string
        readonly id?: string
        readonly properties?: {
            readonly internal?: boolean
        }
    }
}

export type WaMexFetchIntegritySignalsResponse = {
    readonly xwa2_fetch_wa_users?: ReadonlyArray<{
        readonly __typename?: string
        readonly id?: string
        readonly integrity_signals_info?: {
            readonly __typename?: string
            readonly is_new_account?: boolean
            readonly is_suspicious_start_chat?: boolean
        }
    }>
}

export type WaMexFetchNewChatMessageCappingInfoResponse = {
    readonly xwa2_message_capping_info?: {
        readonly capping_status?: string
        readonly cycle_end_timestamp?: string
        readonly cycle_start_timestamp?: string
        readonly mv_status?: string
        readonly ote_status?: string
        readonly server_sent_timestamp?: string
        readonly subscription_status?: {
            readonly name?: string
            readonly status?: string
        }
        readonly total_quota?: string
        readonly used_quota?: string
    }
}

export type WaMexFetchNewsletterResponse = {
    readonly xwa2_newsletter?: {
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
        readonly status_metadata?: {
            readonly last_status_sent_time?: string
            readonly last_status_server_id?: string
        }
        readonly thread_metadata?: {
            readonly creation_time?: string
            readonly description?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly handle?: string
            readonly invite?: string
            readonly name?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly picture?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'IMAGE' | 'PREVIEW'
            }
            readonly pinned_messages?: ReadonlyArray<{
                readonly expiry_ts?: string
                readonly message_id?: string
            }>
            readonly preview?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'PREVIEW'
            }
            readonly settings?: {
                readonly reaction_codes?: {
                    readonly value?: 'ALL'
                }
            }
            readonly subscribers_count?: string
            readonly verification?: 'UNVERIFIED' | 'VERIFIED'
            readonly wamo_sub?: {
                readonly plan_id?: string
            }
        }
        readonly viewer_metadata?: {
            readonly role?: 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
            readonly settings?: ReadonlyArray<{
                readonly type?: 'MUTE_ADMIN_ACTIVITY' | 'MUTE_FOLLOWER_ACTIVITY'
                readonly value?: 'OFF' | 'ON'
            }>
            readonly wamo_sub_status?: 'ACTIVE' | 'INACTIVE'
        }
    }
}

export type WaMexFetchNewsletterAdminCapabilitiesResponse = {
    readonly xwa2_newsletter_admin?: {
        readonly capabilities?: ReadonlyArray<'ADMIN_CONTEXT_CARD_1' | 'ADMIN_CONTEXT_CARD_2' | 'ADMIN_CONTEXT_CARD_3' | 'ADMIN_NOTIFICATIONS' | 'ADMIN_ONBOARDING' | 'ADMIN_ONBOARDING_2' | 'ADMIN_PROFILE' | 'CHANNEL_STATUS_MUSIC' | 'CHANNEL_STATUS_PRODUCER' | 'INSIGHTS' | 'INVITE_ADMINS_BUTTON' | 'INVITE_FOLLOWERS' | 'JARVIS_INTEGRATION_ENABLED' | 'MUSIC' | 'NEW_MESSAGE_TYPES_TOOLTIP' | 'PHOTO_POLLS' | 'PINNED_MESSAGES' | 'PINNING_NUDGE' | 'QUESTIONS' | 'QUESTIONS_M2' | 'QUIZ' | 'SHARE_STICKER_PACKS' | 'THREAD_MENU'>
        readonly id?: string
    }
}

export type WaMexFetchNewsletterAdminInfoResponse = {
    readonly xwa2_newsletter_admin?: {
        readonly admin_count?: number
        readonly admin_profile?: {
            readonly id?: string
            readonly name?: string
            readonly picture?: {
                readonly direct_path?: string
                readonly id?: string
            }
        }
        readonly admin_settings?: {
            readonly admin_profiles_enabled?: boolean
        }
        readonly id?: string
    }
}

export type WaMexFetchNewsletterDehydratedResponse = {
    readonly xwa2_newsletter?: {
        readonly id?: string
        readonly thread_metadata?: {
            readonly pinned_messages?: ReadonlyArray<{
                readonly expiry_ts?: string
                readonly message_id?: string
            }>
            readonly settings?: {
                readonly reaction_codes?: {
                    readonly value?: 'ALL'
                }
            }
            readonly subscribers_count?: string
            readonly verification?: 'UNVERIFIED' | 'VERIFIED'
            readonly wamo_sub?: {
                readonly plan_id?: string
            }
        }
        readonly viewer_metadata?: {
            readonly wamo_sub_status?: 'ACTIVE' | 'INACTIVE'
        }
    }
}

export type WaMexFetchNewsletterDirectoryCategoriesPreviewResponse = {
    readonly xwa2_newsletters_directory_category_preview?: {
        readonly result?: ReadonlyArray<{
            readonly category?: string
            readonly category_title?: string
            readonly newsletters?: ReadonlyArray<{
                readonly id?: string
                readonly status_metadata?: {
                    readonly last_status_sent_time?: string
                    readonly last_status_server_id?: string
                }
                readonly thread_metadata?: {
                    readonly creation_time?: string
                    readonly description?: {
                        readonly id?: string
                        readonly text?: string
                        readonly update_time?: string
                    }
                    readonly handle?: string
                    readonly invite?: string
                    readonly name?: {
                        readonly id?: string
                        readonly text?: string
                        readonly update_time?: string
                    }
                    readonly picture?: {
                        readonly direct_path?: string
                        readonly id?: string
                        readonly type?: 'IMAGE' | 'PREVIEW'
                    }
                    readonly subscribers_count?: string
                    readonly verification?: 'UNVERIFIED' | 'VERIFIED'
                }
            }>
        }>
    }
}

export type WaMexFetchNewsletterDirectoryListResponse = {
    readonly xwa2_newsletters_directory_list?: {
        readonly page_info?: {
            readonly endCursor?: string
            readonly hasNextPage?: boolean
            readonly hasPreviousPage?: boolean
            readonly startCursor?: string
        }
        readonly result?: ReadonlyArray<{
            readonly id?: string
            readonly status_metadata?: {
                readonly last_status_sent_time?: string
                readonly last_status_server_id?: string
            }
            readonly thread_metadata?: {
                readonly creation_time?: string
                readonly description?: {
                    readonly id?: string
                    readonly text?: string
                    readonly update_time?: string
                }
                readonly handle?: string
                readonly invite?: string
                readonly name?: {
                    readonly id?: string
                    readonly text?: string
                    readonly update_time?: string
                }
                readonly picture?: {
                    readonly direct_path?: string
                    readonly id?: string
                    readonly type?: 'IMAGE' | 'PREVIEW'
                }
                readonly subscribers_count?: string
                readonly verification?: 'UNVERIFIED' | 'VERIFIED'
            }
        }>
    }
}

export type WaMexFetchNewsletterDirectorySearchResultsResponse = {
    readonly xwa2_newsletters_directory_search?: {
        readonly page_info?: {
            readonly endCursor?: string
            readonly hasNextPage?: boolean
            readonly hasPreviousPage?: boolean
            readonly startCursor?: string
        }
        readonly result?: ReadonlyArray<{
            readonly id?: string
            readonly status_metadata?: {
                readonly last_status_sent_time?: string
                readonly last_status_server_id?: string
            }
            readonly thread_metadata?: {
                readonly creation_time?: string
                readonly description?: {
                    readonly id?: string
                    readonly text?: string
                    readonly update_time?: string
                }
                readonly handle?: string
                readonly invite?: string
                readonly name?: {
                    readonly id?: string
                    readonly text?: string
                    readonly update_time?: string
                }
                readonly picture?: {
                    readonly direct_path?: string
                    readonly id?: string
                    readonly type?: 'IMAGE' | 'PREVIEW'
                }
                readonly subscribers_count?: string
                readonly verification?: 'UNVERIFIED' | 'VERIFIED'
            }
        }>
    }
}

export type WaMexFetchNewsletterEnforcementsResponse = {
    readonly xwa2_channel_enforcements?: {
        readonly admin_profiles?: ReadonlyArray<{
            readonly appeal_creation_time?: string
            readonly appeal_reason_options?: ReadonlyArray<{
                readonly label?: string
                readonly reason?: string
            }>
            readonly appeal_state?: string
            readonly enforcement_creation_time?: string
            readonly enforcement_extra_data?: {
                readonly enforcement_target_data?: {
                    readonly __typename?: string
                    readonly id?: string
                    readonly name?: string
                    readonly picture?: {
                        readonly direct_path?: string
                        readonly id?: string
                    }
                }
                readonly ip_violation_report_data?: {
                    readonly appeal_form_url?: string
                    readonly report_fbid?: string
                    readonly reporter_email?: string
                    readonly reporter_name?: string
                }
            }
            readonly enforcement_id?: string
            readonly enforcement_policy_information?: {
                readonly admin_disclaimer?: string
                readonly explanation?: string
                readonly headline?: string
                readonly overview?: string
                readonly subtitle?: string
            }
            readonly enforcement_source?: string
            readonly enforcement_violation_category?: string
        }>
        readonly geosuspensions?: ReadonlyArray<{
            readonly base_enforcement_data?: {
                readonly appeal_creation_time?: string
                readonly appeal_reason_options?: ReadonlyArray<{
                    readonly label?: string
                    readonly reason?: string
                }>
                readonly appeal_state?: string
                readonly enforcement_creation_time?: string
                readonly enforcement_extra_data?: {
                    readonly appeal_extra_data?: {
                        readonly appeal_form_url?: string
                    }
                    readonly enforcement_origin_legal_basis?: string
                    readonly enforcement_origin_workflow?: string
                    readonly enforcement_target_data?: {
                        readonly __typename?: string
                        readonly id?: string
                        readonly server_id?: string
                        readonly server_msg_id?: string
                    }
                    readonly enforcing_entity_data?: {
                        readonly name?: string
                    }
                    readonly ip_violation_report_data?: {
                        readonly appeal_form_url?: string
                        readonly report_fbid?: string
                        readonly reporter_email?: string
                        readonly reporter_name?: string
                    }
                }
                readonly enforcement_id?: string
                readonly enforcement_policy_information?: {
                    readonly admin_disclaimer?: string
                    readonly explanation?: string
                    readonly headline?: string
                    readonly overview?: string
                    readonly subtitle?: string
                }
                readonly enforcement_source?: string
                readonly enforcement_violation_category?: string
            }
            readonly country_codes?: ReadonlyArray<string>
        }>
        readonly profile_picture_deletions?: ReadonlyArray<{
            readonly appeal_creation_time?: string
            readonly appeal_reason_options?: ReadonlyArray<{
                readonly label?: string
                readonly reason?: string
            }>
            readonly appeal_state?: string
            readonly enforcement_creation_time?: string
            readonly enforcement_extra_data?: {
                readonly ip_violation_report_data?: {
                    readonly appeal_form_url?: string
                    readonly report_fbid?: string
                    readonly reporter_email?: string
                    readonly reporter_name?: string
                }
            }
            readonly enforcement_id?: string
            readonly enforcement_policy_information?: {
                readonly admin_disclaimer?: string
                readonly explanation?: string
                readonly headline?: string
                readonly overview?: string
                readonly subtitle?: string
            }
            readonly enforcement_source?: string
            readonly enforcement_violation_category?: string
        }>
        readonly suspensions?: ReadonlyArray<{
            readonly appeal_creation_time?: string
            readonly appeal_reason_options?: ReadonlyArray<{
                readonly label?: string
                readonly reason?: string
            }>
            readonly appeal_state?: string
            readonly enforcement_creation_time?: string
            readonly enforcement_extra_data?: {
                readonly appeal_extra_data?: {
                    readonly appeal_form_url?: string
                }
                readonly enforcement_target_data?: {
                    readonly __typename?: string
                    readonly id?: string
                    readonly server_id?: string
                    readonly server_msg_id?: string
                }
                readonly ip_violation_report_data?: {
                    readonly appeal_form_url?: string
                    readonly report_fbid?: string
                    readonly reporter_email?: string
                    readonly reporter_name?: string
                }
            }
            readonly enforcement_id?: string
            readonly enforcement_policy_information?: {
                readonly admin_disclaimer?: string
                readonly explanation?: string
                readonly headline?: string
                readonly overview?: string
                readonly subtitle?: string
            }
            readonly enforcement_source?: string
            readonly enforcement_violation_category?: string
        }>
        readonly violating_messages?: ReadonlyArray<{
            readonly base_enforcement_data?: {
                readonly appeal_creation_time?: string
                readonly appeal_reason_options?: ReadonlyArray<{
                    readonly label?: string
                    readonly reason?: string
                }>
                readonly appeal_state?: string
                readonly enforcement_creation_time?: string
                readonly enforcement_extra_data?: {
                    readonly ip_violation_report_data?: {
                        readonly appeal_form_url?: string
                        readonly report_fbid?: string
                        readonly reporter_email?: string
                        readonly reporter_name?: string
                    }
                }
                readonly enforcement_id?: string
                readonly enforcement_policy_information?: {
                    readonly admin_disclaimer?: string
                    readonly explanation?: string
                    readonly headline?: string
                    readonly overview?: string
                    readonly subtitle?: string
                }
                readonly enforcement_source?: string
                readonly enforcement_violation_category?: string
            }
            readonly content_data?: {
                readonly __typename?: string
                readonly server_id?: string
                readonly server_msg_id?: string
            }
        }>
    }
}

export type WaMexFetchNewsletterFollowersResponse = {
    readonly xwa2_newsletter_followers?: {
        readonly followers?: {
            readonly edges?: ReadonlyArray<{
                readonly admin_profile?: {
                    readonly id?: string
                    readonly name?: string
                    readonly picture?: {
                        readonly direct_path?: string
                        readonly id?: string
                    }
                }
                readonly follow_time?: string
                readonly node?: {
                    readonly display_name?: string
                    readonly id?: string
                    readonly pn?: string
                    readonly username_info?: {
                        readonly __typename?: string
                        readonly username?: string
                    }
                }
                readonly role?: 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
            }>
        }
    }
}

export type WaMexFetchNewsletterInsightsResponse = {
    readonly xwa2_newsletter_admin_insights?: {
        readonly last_update_time?: string
        readonly metrics_status?: string
        readonly newsletter_id?: string
        readonly result?: ReadonlyArray<{
            readonly id?: string
            readonly values?: ReadonlyArray<{
                readonly country?: string
                readonly role?: 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
                readonly timestamp?: string
                readonly value?: string
            }>
        }>
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
    }
}

export type WaMexFetchNewsletterIsDomainPreviewableResponse = {
    readonly xwa2_newsletter_message_integrity?: {
        readonly url_previews?: ReadonlyArray<{
            readonly is_previewable?: boolean
            readonly url_domain?: string
        }>
    }
}

export type WaMexFetchNewsletterMessageReactionSenderListResponse = {
    readonly xwa2_newsletters_reaction_sender_list?: {
        readonly reactions?: ReadonlyArray<{
            readonly reaction_code?: string
            readonly sender_list?: {
                readonly edges?: ReadonlyArray<{
                    readonly node?: {
                        readonly id?: string
                        readonly profile_pic_direct_path?: string
                    }
                }>
            }
        }>
    }
}

export type WaMexFetchNewsletterPendingInvitesResponse = {
    readonly xwa2_newsletter_admin?: {
        readonly id?: string
        readonly pending_admin_invites?: ReadonlyArray<{
            readonly user?: {
                readonly id?: string
                readonly pn?: string
            }
        }>
    }
}

export type WaMexFetchNewsletterPollVotersResponse = {
    readonly voter_list?: {
        readonly votes?: ReadonlyArray<{
            readonly vote_hash?: string
            readonly voter_list?: {
                readonly edges?: ReadonlyArray<{
                    readonly action_time?: string
                    readonly node?: {
                        readonly id?: string
                    }
                }>
            }
        }>
    }
}

export type WaMexFetchNewsletterReportsResponse = {
    readonly xwa2_channels_reports?: {
        readonly channels_reports?: ReadonlyArray<{
            readonly appeal?: {
                readonly appeal_id?: string
                readonly appeal_reason?: string
                readonly creation_time?: string
                readonly report_id?: string
                readonly state?: 'CONTENT_UNAVAILABLE' | 'NON_APPEALABLE' | 'NOT_APPEALED' | 'PENDING' | 'REJECT' | 'SUCCESS'
            }
            readonly appeal_reason_options?: ReadonlyArray<{
                readonly label?: string
                readonly reason?: string
            }>
            readonly channel_jid?: string
            readonly channel_name?: string
            readonly creation_time?: string
            readonly last_update_time?: string
            readonly report_id?: string
            readonly reported_content_data?: {
                readonly __typename?: string
                readonly notify_name?: string
                readonly question_data?: {
                    readonly __typename?: string
                    readonly server_msg_id?: string
                }
                readonly server_id?: string
                readonly server_msg_id?: string
                readonly server_response_id?: string
            }
            readonly status?: string
        }>
    }
}

export type WaMexFetchOHAIKeyConfigResponse = {
    readonly xwa2_ohai_configurations?: {
        readonly ohai_configs?: ReadonlyArray<{
            readonly aead_id?: number
            readonly expiration_date?: string
            readonly kdf_id?: number
            readonly kem_id?: number
            readonly key_id?: number
            readonly last_updated_time?: string
            readonly public_key?: string
        }>
    }
}

export type WaMexFetchOIDCStateResponse = {
    readonly xfb_wa_biz_get_oidc_state?: string
}

export type WaMexFetchPlaintextLinkPreviewResponse = {
    readonly xwa2_newsletter_link_preview?: {
        readonly description?: string
        readonly direct_path?: string
        readonly hash?: string
        readonly height?: number
        readonly preview_type?: 'IMAGE'
        readonly thumb_data?: string
        readonly title?: string
        readonly width?: number
    }
}

export type WaMexFetchQuickPromotionsResponse = {
    readonly quick_promotion_batch_fetch_root?: ReadonlyArray<{
        readonly eligible_promotions?: {
            readonly edges?: ReadonlyArray<{
                readonly client_ttl_seconds?: number
                readonly is_holdout?: boolean
                readonly log_eligibility_waterfall?: string
                readonly node?: {
                    readonly ab_prop_name?: string
                    readonly client_side_dry_run?: boolean
                    readonly content_attributes?: {
                        readonly wa_banner_background_color?: {
                            readonly dark_mode_background_color?: string
                            readonly dark_mode_highlight_color?: string
                            readonly light_mode_background_color?: string
                            readonly light_mode_highlight_color?: string
                        }
                        readonly wa_eligible_duration_after_impression_in_seconds?: number
                        readonly wa_primary_cta_alternative_url?: string
                    }
                    readonly contextual_filters_for_wa_do_not_use?: {
                        readonly clause_type?: string
                        readonly clauses?: ReadonlyArray<{
                            readonly clause_type?: string
                            readonly clauses?: ReadonlyArray<{
                                readonly clause_type?: string
                                readonly clauses?: ReadonlyArray<{
                                    readonly clause_type?: string
                                    readonly clauses?: ReadonlyArray<{
                                        readonly clause_type?: string
                                        readonly clauses?: ReadonlyArray<{
                                            readonly clause_type?: string
                                            readonly clauses?: ReadonlyArray<{
                                                readonly clause_type?: string
                                                readonly clauses?: ReadonlyArray<{
                                                    readonly clause_type?: string
                                                    readonly filters?: ReadonlyArray<{
                                                        readonly filter_name?: string
                                                        readonly filter_result?: string
                                                        readonly parameters?: ReadonlyArray<{
                                                            readonly key?: string
                                                            readonly value?: string
                                                        }>
                                                        readonly passes_if_client_not_supported?: boolean
                                                    }>
                                                }>
                                                readonly filters?: ReadonlyArray<{
                                                    readonly filter_name?: string
                                                    readonly filter_result?: string
                                                    readonly parameters?: ReadonlyArray<{
                                                        readonly key?: string
                                                        readonly value?: string
                                                    }>
                                                    readonly passes_if_client_not_supported?: boolean
                                                }>
                                            }>
                                            readonly filters?: ReadonlyArray<{
                                                readonly filter_name?: string
                                                readonly filter_result?: string
                                                readonly parameters?: ReadonlyArray<{
                                                    readonly key?: string
                                                    readonly value?: string
                                                }>
                                                readonly passes_if_client_not_supported?: boolean
                                            }>
                                        }>
                                        readonly filters?: ReadonlyArray<{
                                            readonly filter_name?: string
                                            readonly filter_result?: string
                                            readonly parameters?: ReadonlyArray<{
                                                readonly key?: string
                                                readonly value?: string
                                            }>
                                            readonly passes_if_client_not_supported?: boolean
                                        }>
                                    }>
                                    readonly filters?: ReadonlyArray<{
                                        readonly filter_name?: string
                                        readonly filter_result?: string
                                        readonly parameters?: ReadonlyArray<{
                                            readonly key?: string
                                            readonly value?: string
                                        }>
                                        readonly passes_if_client_not_supported?: boolean
                                    }>
                                }>
                                readonly filters?: ReadonlyArray<{
                                    readonly filter_name?: string
                                    readonly filter_result?: string
                                    readonly parameters?: ReadonlyArray<{
                                        readonly key?: string
                                        readonly value?: string
                                    }>
                                    readonly passes_if_client_not_supported?: boolean
                                }>
                            }>
                            readonly filters?: ReadonlyArray<{
                                readonly filter_name?: string
                                readonly filter_result?: string
                                readonly parameters?: ReadonlyArray<{
                                    readonly key?: string
                                    readonly value?: string
                                }>
                                readonly passes_if_client_not_supported?: boolean
                            }>
                        }>
                        readonly filters?: ReadonlyArray<{
                            readonly filter_name?: string
                            readonly filter_result?: string
                            readonly parameters?: ReadonlyArray<{
                                readonly key?: string
                                readonly value?: string
                            }>
                            readonly passes_if_client_not_supported?: boolean
                        }>
                    }
                    readonly creatives?: ReadonlyArray<{
                        readonly accessibility_text_for_image?: string
                        readonly content?: {
                            readonly text?: string
                        }
                        readonly id?: string
                        readonly is_dismissible?: boolean
                        readonly primary_action?: {
                            readonly title?: {
                                readonly text?: string
                            }
                            readonly url?: string
                        }
                        readonly title?: {
                            readonly text?: string
                        }
                        readonly wa_dark_mode_media_details?: {
                            readonly jpeg_thumbnail?: string
                        }
                        readonly wa_light_mode_media_details?: {
                            readonly jpeg_thumbnail?: string
                        }
                    }>
                    readonly encrypted_logging_data?: string
                    readonly id?: string
                    readonly is_server_force_pass?: boolean
                    readonly promotion_id?: string
                    readonly surface_delay_in_seconds?: number
                    readonly user_interaction_info?: {
                        readonly dismiss_click_count_for_user?: number
                        readonly dismiss_max_instances?: unknown
                        readonly impression_count_for_user?: number
                        readonly impression_max_instances?: unknown
                        readonly primary_click_count_for_user?: number
                        readonly primary_click_max_instances?: unknown
                        readonly secondary_click_count_for_user?: number
                    }
                    readonly wa_qp_content_attributes_do_not_use?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
                readonly priority?: number
                readonly time_range?: {
                    readonly end?: string
                    readonly start?: string
                }
            }>
        }
        readonly surface_nux_id?: string
    }>
}

export type WaMexFetchReachoutTimelockResponse = {
    readonly xwa2_fetch_account_reachout_timelock?: {
        readonly enforcement_type?: 'ADMIN_PROFILE' | 'GEOSUSPEND' | 'GEOSUSPEND_INFORM' | 'PROFILE_PICTURE_DELETION' | 'SUSPEND' | 'SUSPEND_INFORM' | 'VIOLATING_MSG'
        readonly is_active?: boolean
        readonly time_enforcement_ends?: string
    }
}

export type WaMexFetchRecommendedNewslettersResponse = {
    readonly xwa2_newsletters_recommended?: {
        readonly page_info?: {
            readonly endCursor?: string
            readonly hasNextPage?: boolean
            readonly hasPreviousPage?: boolean
            readonly startCursor?: string
        }
        readonly result?: ReadonlyArray<{
            readonly id?: string
            readonly state?: {
                readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
            }
            readonly status_metadata?: {
                readonly last_status_sent_time?: string
                readonly last_status_server_id?: string
            }
            readonly thread_metadata?: {
                readonly creation_time?: string
                readonly description?: {
                    readonly id?: string
                    readonly text?: string
                    readonly update_time?: string
                }
                readonly handle?: string
                readonly invite?: string
                readonly name?: {
                    readonly id?: string
                    readonly text?: string
                    readonly update_time?: string
                }
                readonly preview?: {
                    readonly direct_path?: string
                    readonly id?: string
                    readonly type?: 'PREVIEW'
                }
                readonly subscribers_count?: string
                readonly verification?: 'UNVERIFIED' | 'VERIFIED'
            }
        }>
    }
}

export type WaMexFetchSimilarNewslettersResponse = {
    readonly xwa2_newsletters_similar?: {
        readonly result?: ReadonlyArray<{
            readonly id?: string
            readonly state?: {
                readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
            }
            readonly status_metadata?: {
                readonly last_status_server_id?: string
            }
            readonly thread_metadata?: {
                readonly name?: {
                    readonly id?: string
                    readonly text?: string
                    readonly update_time?: string
                }
                readonly picture?: {
                    readonly direct_path?: string
                    readonly id?: string
                    readonly type?: 'IMAGE' | 'PREVIEW'
                }
                readonly verification?: 'UNVERIFIED' | 'VERIFIED'
            }
        }>
    }
}

export type WaMexFetchSubgroupSuggestionsResponse = {
    readonly xwa2_group_query_by_id?: {
        readonly __typename?: string
        readonly id?: string
        readonly sub_group_suggestions?: {
            readonly edges?: ReadonlyArray<{
                readonly node?: {
                    readonly creation_time?: string
                    readonly creator?: {
                        readonly id?: string
                    }
                    readonly description?: {
                        readonly id?: string
                        readonly value?: string
                    }
                    readonly hidden_group?: boolean
                    readonly id?: string
                    readonly is_existing_group?: boolean
                    readonly subject?: {
                        readonly value?: string
                    }
                    readonly total_participants_count?: number
                }
            }>
        }
    }
}

export type WaMexFetchSubscriptionEntryPointsResponse = {
    readonly waSubscriptionEntryPoints?: {
        readonly subscriptionEntryPoints?: ReadonlyArray<{
            readonly subscriptionType?: string
            readonly webEntryPointEligibility?: boolean
            readonly webEntryPointRedirectionUri?: string
        }>
    }
}

export type WaMexFetchSubscriptionsResponse = {
    readonly xwa_get_subscriptions?: {
        readonly feature_flags?: ReadonlyArray<{
            readonly enabled?: boolean
            readonly expiration_time?: string
            readonly limit?: number
            readonly name?: string
        }>
        readonly subscriptions?: ReadonlyArray<{
            readonly creation_time?: string
            readonly end_time?: string
            readonly id?: string
            readonly is_platform_changed?: boolean
            readonly source?: string
            readonly start_time?: string
            readonly status?: 'ACTIVE' | 'CANCELED'
            readonly tier?: string
        }>
    }
}

export type WaMexFetchTextStatusListResponse = {
    readonly xwa2_text_status_list?: ReadonlyArray<{
        readonly emoji?: {
            readonly content?: string
        }
        readonly ephemeral_duration_sec?: number
        readonly jid?: string
        readonly last_update_time?: string
        readonly text?: string
    }>
}

export type WaMexFetchWassBotListProfilesGQLResponse = {
    readonly wass_account_list_profiles?: ReadonlyArray<{
        readonly bot_fbid?: string
        readonly is_deprecated?: boolean
        readonly name?: string
        readonly product?: unknown
        readonly profile_pic_full_url?: string
        readonly profile_pic_thumb_url?: string
    }>
}

export type WaMexFetchWassBotProfileGQLResponse = {
    readonly get_wass_account_profile?: {
        readonly is_deprecated?: boolean
        readonly name?: string
        readonly product?: unknown
        readonly profile_pic_full_url?: string
        readonly profile_pic_thumb_url?: string
    }
}

export type WaMexGetAccessTokenFromOIDCCodeResponse = {
    readonly xfb_wa_biz_get_token_from_oidc_code?: {
        readonly access_token?: string
        readonly fb_user_id?: string
    }
}

export type WaMexGetAccountNonceResponse = {
    readonly xfb_wa_biz_account_nonce?: {
        readonly detail?: {
            readonly nonce?: string
            readonly request?: {
                readonly id?: string
            }
        }
    }
}

export type WaMexGetDsbInfoResponse = {
    readonly xwa2_get_dsb_info?: {
        readonly reference_number?: string
    }
}

export type WaMexGetFBAccountPagesResponse = {
    readonly user?: {
        readonly facebook_pages?: {
            readonly nodes?: ReadonlyArray<{
                readonly id?: string
                readonly name?: string
                readonly permitted_tasks?: string
                readonly profile_picture?: {
                    readonly uri?: string
                }
            }>
        }
        readonly id?: string
    }
}

export type WaMexGetNumbersForBrandIdsResponse = {
    readonly xwa_get_numbers_for_brand_ids?: {
        readonly brand_ids_data?: ReadonlyArray<{
            readonly brand_id?: string
            readonly error?: boolean
            readonly lids?: ReadonlyArray<string>
            readonly phone_numbers?: ReadonlyArray<string>
        }>
    }
}

export type WaMexGetPrivacyListsResponse = {
    readonly xwa2_fetch_wa_users?: ReadonlyArray<{
        readonly __typename?: string
        readonly id?: string
        readonly privacy_contact_list?: {
            readonly contacts?: ReadonlyArray<{
                readonly jid?: string
                readonly pn_jid?: string
                readonly username_info?: {
                    readonly __typename?: string
                    readonly username?: string
                }
            }>
            readonly dhash?: string
        }
    }>
}

export type WaMexGetPrivacySettingsResponse = {
    readonly xwa2_fetch_wa_users?: ReadonlyArray<{
        readonly __typename?: string
        readonly id?: string
        readonly privacy_settings?: {
            readonly settings?: ReadonlyArray<{
                readonly feature?: 'ABOUT' | 'CALLADD' | 'DEFENSE' | 'DEPENDENT_ACCOUNT_CALLING' | 'DEPENDENT_ACCOUNT_MESSAGES' | 'GROUPADD' | 'LAST' | 'LINKED_PROFILES' | 'MESSAGES' | 'ONLINE' | 'PIX' | 'PROFILE' | 'READRECEIPTS' | 'STICKERS'
                readonly setting?: 'ALL' | 'MYCONTACTS' | 'OFF'
            }>
        }
    }>
}

export type WaMexGetUsernameResponse = {
    readonly xwa2_username_get?: {
        readonly username_info?: {
            readonly pin?: string
            readonly state?: string
            readonly username?: string
        }
    }
}

export type WaMexGetWAAEligibilityResponse = {
    readonly eval_wa_ad_account_eligibility_rules?: {
        readonly eligibility_result?: string
    }
}

export type WaMexGraphQLProductCatalogGetPublicKeyResponse = {
    readonly xwa_product_catalog_get_public_key?: {
        readonly public_key_certificate_pem?: string
        readonly public_key_with_signature?: {
            readonly public_key_pem?: string
            readonly public_key_signature?: string
        }
    }
}

export type WaMexGraphQLVerifyPostcodeResponse = {
    readonly xwa_product_catalog_get_verify_postcode?: {
        readonly postcode_verification_result?: {
            readonly encrypted_location_name?: string
            readonly result_code?: string
        }
    }
}

export type WaMexGroupStoreInviteSmsResponse = {
    readonly xwa2_group_store_invites_sms?: {
        readonly group_jid?: string
        readonly participant_responses?: ReadonlyArray<{
            readonly error_code?: number
        }>
    }
}

export type WaMexGroupSuspensionAppealResponse = {
    readonly wa_create_group_suspension_appeal?: {
        readonly appeal_creation_time?: string
        readonly error_message?: string
        readonly response_code?: string
    }
}

export type WaMexIntegrityChallengeResponseResponse = {
    readonly xwa2_submit_integrity_challenge_response?: {
        readonly error_message?: string
        readonly success?: boolean
    }
}

export type WaMexJoinNewsletterResponse = {
    readonly xwa2_newsletter_join_v2?: {
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
    }
}

export type WaMexKeyTransparencyGraphQLClient_Response = {
    readonly xfb_messenger_kt_lookup?: {
        readonly account_responses?: ReadonlyArray<{
            readonly account_fbid?: string
            readonly pending_sequencing?: unknown
            readonly proto_for_client?: unknown
        }>
    }
}

export type WaMexLeaveNewsletterResponse = {
    readonly xwa2_newsletter_leave_v2?: {
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
    }
}

export type WaMexLidChangeNotificationResponse = {
    readonly xwa2_notify_lid_change?: {
        readonly new?: string
        readonly old?: string
    }
}

export type WaMexLogNewsletterExposuresResponse = {
    readonly xwa2_newsletter_log_exposures?: {
        readonly __typename?: string
    }
}

export type WaMexMAIBAInlineAssetSelectorWidgetAssetIDsResponse = {
    readonly maiba_support_ai_asset_ids?: ReadonlyArray<string>
}

export type WaMexMAIBAInlineAssetSelectorWidgetAssetsResponse = {
    readonly xfb_maiba_support_ai_asset_api?: ReadonlyArray<{
        readonly asset_id?: string
        readonly id?: string
        readonly image_url?: string
        readonly name?: string
        readonly pill_label?: string
        readonly pill_status?: string
        readonly platform?: unknown
        readonly type?: string
    }>
}

export type WaMexMAIBAMessageCreatorCardsRendererResponse = {
    readonly cam_ai_search_brand_ig_asset_id?: string
    readonly cam_ai_search_creators_by_ids?: ReadonlyArray<{
        readonly creator_igid?: unknown
        readonly creator_profile_materialized?: {
            readonly followers_number?: unknown
            readonly profile_pic_uri_without_fallback?: unknown
        }
        readonly creator_user_id?: string
        readonly cross_platform_insights?: {
            readonly fb_insights?: {
                readonly __typename?: string
                readonly followers_count?: {
                    readonly value?: string
                }
                readonly id?: string
            }
            readonly ig_insights?: {
                readonly __typename?: string
                readonly followers_count?: {
                    readonly value?: string
                }
                readonly id?: string
            }
        }
        readonly id?: string
    }>
}

export type WaMexMAIBAMessageLiveBrowserRendererScreenshotResponse = {
    readonly xfb_maiba_browser_screenshot?: {
        readonly screenshot_data?: unknown
        readonly screenshot_url?: string
        readonly status?: string
    }
}

export type WaMexMAIBAMessageSignalsCTARendererResponse = {
    readonly set_automatic_advanced_matching_ads_pixel?: {
        readonly ads_pixel?: {
            readonly enable_automatic_matching?: unknown
            readonly id?: string
            readonly name?: string
        }
    }
}

export type WaMexMAIBARecordAsyncAuthConsentResponse = {
    readonly maiba_record_async_auth_consent?: {
        readonly error_message?: string
        readonly success?: boolean
    }
}

export type WaMexMessengerAdPreviewConversationResponse = {
    readonly page?: {
        readonly id?: string
        readonly smc_product_catalog?: {
            readonly catalog_product_count?: number
            readonly is_eligible?: boolean
            readonly products?: ReadonlyArray<{
                readonly da_display_preview_url?: string
            }>
            readonly selected_products?: ReadonlyArray<{
                readonly da_display_preview_url?: string
                readonly product_name?: string
                readonly sale_price?: string
            }>
        }
    }
}

export type WaMexMetaPayVaultInitializeResponse = {
    readonly meta_pay_vault_initialize?: {
        readonly error_reason?: string
        readonly status?: string
    }
}

export type WaMexMetaPayVaultLabyrinthDeleteResponse = {
    readonly meta_pay_vault_delete?: {
        readonly error_reason?: string
        readonly status?: string
    }
}

export type WaMexMetaPayVaultLabyrinthFetchAllResponse = {
    readonly meta_pay_vault_entries?: {
        readonly vault_entry_to_entry_key?: ReadonlyArray<{
            readonly entry?: {
                readonly entry_data?: unknown
                readonly entry_fbid?: string
            }
        }>
    }
}

export type WaMexMetaPayVaultLabyrinthSaveResponse = {
    readonly meta_pay_vault_entry_save?: {
        readonly error_reason?: string
        readonly status?: string
        readonly vault_entry_fbid?: string
    }
}

export type WaMexMpsReceiverFetchGraphQLStickerResponse = {
    readonly media_receiver_fetch_deidentified?: {
        readonly cdn_url?: string
        readonly expiration_timestamp_ms?: number
        readonly height?: number
        readonly mime_type?: string
        readonly receiver_fetch_id?: string
        readonly width?: number
    }
}

export type WaMexMpsReceiverFetchGraphQLXMAResponse = {
    readonly msgr_xma_receiver_fetch_deidentified?: {
        readonly xma_dataclass?: unknown
    }
}

export type WaMexNativeMLModelResponse = {
    readonly aim_model_batched_manifest?: {
        readonly asset_count?: number
        readonly entry_point?: string
        readonly model_count?: number
        readonly models?: ReadonlyArray<{
            readonly assets?: ReadonlyArray<{
                readonly asset_handle?: string
                readonly asset_type?: string
                readonly cache_key?: string
                readonly compression_type?: string
                readonly creation_time?: string
                readonly filesize_bytes?: number
                readonly id?: string
                readonly md5_hash?: string
                readonly name?: string
                readonly source_content_hash?: string
                readonly url?: string
            }>
            readonly name?: string
            readonly properties?: ReadonlyArray<{
                readonly name?: string
                readonly value?: string
            }>
            readonly version?: number
        }>
        readonly status?: string
        readonly status_details?: string
    }
}

export type WaMexNewsletterAddPaidPartnershipLabelResponse = {
    readonly xwa2_newsletter_label_paid_partnership?: {
        readonly id?: string
    }
}

export type WaMexNewsletterBlockUserResponse = {
    readonly xwa2_newsletter_block_user?: {
        readonly newsletter_id?: string
    }
}

export type WaMexNewsletterLabelAiContentResponse = {
    readonly xwa2_newsletter_label_ai_content?: {
        readonly id?: string
    }
}

export type WaMexNewsletterPinMessagesResponse = {
    readonly xwa2_newsletter_pin_messages?: {
        readonly id?: string
        readonly thread_metadata?: {
            readonly pinned_messages?: ReadonlyArray<{
                readonly expiry_ts?: string
                readonly message_id?: string
            }>
        }
    }
}

export type WaMexNewsletterQuestionResponseStateUpdateResponse = {
    readonly xwa2_newsletter_question_response_state_update?: {
        readonly id?: string
    }
}

export type WaMexNewsletterUnpinMessagesResponse = {
    readonly xwa2_newsletter_unpin_messages?: {
        readonly id?: string
        readonly thread_metadata?: {
            readonly pinned_messages?: ReadonlyArray<{
                readonly expiry_ts?: string
                readonly message_id?: string
            }>
        }
    }
}

export type WaMexOrgAdminGraphQLAddGroupResponse = {
    readonly xwa_org_managed_group_add?: {
        readonly error_reason?: string
        readonly group?: {
            readonly creation_timestamp_s?: unknown
            readonly gid?: unknown
            readonly participant_count?: number
            readonly subject?: string
        }
        readonly status?: 'SUCCESS'
    }
}

export type WaMexOrgAdminGraphQLDirectoryResponse = {
    readonly xwa_org_admin_directory?: {
        readonly error_reason?: 'INVALID_EMAIL_BATCH'
        readonly member_tags?: ReadonlyArray<string>
        readonly members?: ReadonlyArray<{
            readonly display_name?: string
            readonly lid?: string
            readonly member_tag?: string
            readonly role?: 'ADMIN' | 'CREATOR' | 'SUPERADMIN'
            readonly username?: string
        }>
        readonly status?: 'SUCCESS'
        readonly truncated?: unknown
    }
}

export type WaMexOrgAdminGraphQLGroupResponse = {
    readonly xwa_org_managed_group?: {
        readonly error_reason?: string
        readonly group?: {
            readonly creation_timestamp_s?: unknown
            readonly gid?: unknown
            readonly participant_count?: number
            readonly participants?: ReadonlyArray<{
                readonly lid?: string
                readonly role?: 'ADMIN' | 'CREATOR' | 'SUPERADMIN'
            }>
            readonly roster_partial?: unknown
            readonly subject?: string
        }
        readonly status?: 'SUCCESS'
    }
}

export type WaMexOrgAdminGraphQLInviteMembersResponse = {
    readonly xwa_org_invite_members?: {
        readonly error_reason?: 'INVALID_EMAIL_BATCH'
        readonly status?: 'SUCCESS'
    }
}

export type WaMexOrgAdminGraphQLManagedGroupsResponse = {
    readonly xwa_org_managed_groups?: {
        readonly error_reason?: 'INVALID_EMAIL_BATCH'
        readonly groups?: ReadonlyArray<{
            readonly creation_timestamp_s?: unknown
            readonly gid?: unknown
            readonly participant_count?: number
            readonly participants?: ReadonlyArray<{
                readonly lid?: string
                readonly role?: 'ADMIN' | 'CREATOR' | 'SUPERADMIN'
            }>
            readonly roster_partial?: unknown
            readonly subject?: string
        }>
        readonly status?: 'SUCCESS'
    }
}

export type WaMexOrgAdminGraphQLMemberSearchResponse = {
    readonly xwa_org_member_search?: {
        readonly count?: unknown
        readonly nodes?: ReadonlyArray<{
            readonly member?: {
                readonly display_name?: string
                readonly lid?: string
                readonly member_tag?: string
                readonly role?: 'ADMIN' | 'CREATOR' | 'SUPERADMIN'
                readonly username?: string
            }
        }>
        readonly page_info?: {
            readonly end_cursor?: string
            readonly has_next_page?: boolean
        }
    }
}

export type WaMexOrgAdminGraphQLOrgsResponse = {
    readonly xwa_org_list?: {
        readonly orgs?: ReadonlyArray<{
            readonly id?: string
            readonly member_count?: number
            readonly name?: string
        }>
    }
}

export type WaMexPaymentsPasskeyHasCredentialResponse = {
    readonly xwa2_payments_passkey_has_credential?: {
        readonly has_passkey?: boolean
    }
}

export type WaMexQueryCatalogResponse = {
    readonly xwa_product_catalog_get_product_catalog?: {
        readonly __typename?: string
        readonly product_catalog?: {
            readonly paging?: {
                readonly after?: string
                readonly before?: string
            }
            readonly products?: ReadonlyArray<{
                readonly belongs_to?: string
                readonly compliance_category?: string
                readonly compliance_info?: {
                    readonly country_code_origin?: string
                    readonly importer_address?: {
                        readonly city?: string
                        readonly country_code?: string
                        readonly postal_code?: string
                        readonly region?: string
                        readonly street1?: string
                        readonly street2?: string
                    }
                    readonly importer_name?: string
                }
                readonly currency?: string
                readonly description?: string
                readonly id?: string
                readonly is_hidden?: boolean
                readonly is_sanctioned?: boolean
                readonly max_available?: number
                readonly media?: {
                    readonly images?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_image_url?: string
                        readonly request_image_url?: string
                    }>
                    readonly videos?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_video_url?: string
                        readonly thumbnail_url?: string
                    }>
                }
                readonly name?: string
                readonly price?: string
                readonly product_availability?: string
                readonly retailer_id?: string
                readonly sale_price?: {
                    readonly end_date?: string
                    readonly price?: string
                    readonly start_date?: string
                }
                readonly shimmed_url?: string
                readonly status_info?: {
                    readonly can_appeal?: boolean
                    readonly status?: string
                }
                readonly url?: string
                readonly variant_info?: {
                    readonly availability?: {
                        readonly listing?: ReadonlyArray<{
                            readonly is_available?: boolean
                            readonly options?: ReadonlyArray<{
                                readonly name?: string
                                readonly value?: string
                            }>
                            readonly product_id?: string
                        }>
                    }
                    readonly listing_details?: {
                        readonly description?: string
                        readonly lowest_price?: string
                        readonly multi_price?: string
                    }
                    readonly types?: ReadonlyArray<{
                        readonly name?: string
                        readonly options?: ReadonlyArray<{
                            readonly thumbnail_media?: {
                                readonly id?: string
                                readonly original_dimensions?: {
                                    readonly height?: number
                                    readonly width?: number
                                }
                                readonly original_image_url?: string
                                readonly request_image_url?: string
                            }
                            readonly value?: string
                        }>
                    }>
                    readonly variant_properties?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
            }>
        }
    }
}

export type WaMexQueryCatalogHasCategoriesResponse = {
    readonly xwa_product_catalog_get_categories?: {
        readonly categories?: ReadonlyArray<{
            readonly __typename?: string
        }>
    }
}

export type WaMexQueryCatalogProductResponse = {
    readonly xwa_product_catalog_get_product?: {
        readonly product_catalog?: {
            readonly product?: {
                readonly belongs_to?: string
                readonly compliance_category?: string
                readonly compliance_info?: {
                    readonly country_code_origin?: string
                    readonly importer_address?: {
                        readonly city?: string
                        readonly country_code?: string
                        readonly postal_code?: string
                        readonly region?: string
                        readonly street1?: string
                        readonly street2?: string
                    }
                    readonly importer_name?: string
                }
                readonly currency?: string
                readonly description?: string
                readonly id?: string
                readonly is_hidden?: boolean
                readonly is_sanctioned?: boolean
                readonly max_available?: number
                readonly media?: {
                    readonly images?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_image_url?: string
                        readonly request_image_url?: string
                    }>
                    readonly videos?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_video_url?: string
                        readonly thumbnail_url?: string
                    }>
                }
                readonly name?: string
                readonly price?: string
                readonly product_availability?: string
                readonly retailer_id?: string
                readonly sale_price?: {
                    readonly end_date?: string
                    readonly price?: string
                    readonly start_date?: string
                }
                readonly shimmed_url?: string
                readonly status_info?: {
                    readonly can_appeal?: boolean
                    readonly status?: string
                }
                readonly url?: string
                readonly variant_info?: {
                    readonly availability?: {
                        readonly listing?: ReadonlyArray<{
                            readonly is_available?: boolean
                            readonly options?: ReadonlyArray<{
                                readonly name?: string
                                readonly value?: string
                            }>
                            readonly product_id?: string
                        }>
                    }
                    readonly listing_details?: {
                        readonly description?: string
                        readonly lowest_price?: string
                        readonly multi_price?: string
                    }
                    readonly types?: ReadonlyArray<{
                        readonly name?: string
                        readonly options?: ReadonlyArray<{
                            readonly thumbnail_media?: {
                                readonly id?: string
                                readonly original_dimensions?: {
                                    readonly height?: number
                                    readonly width?: number
                                }
                                readonly original_image_url?: string
                                readonly request_image_url?: string
                            }
                            readonly value?: string
                        }>
                    }>
                    readonly variant_properties?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
            }
        }
    }
}

export type WaMexQueryProductCollectionsResponse = {
    readonly xwa_product_catalog_get_collections?: {
        readonly __typename?: string
        readonly collections?: ReadonlyArray<{
            readonly id?: string
            readonly name?: string
            readonly products?: ReadonlyArray<{
                readonly belongs_to?: string
                readonly compliance_category?: string
                readonly compliance_info?: {
                    readonly country_code_origin?: string
                    readonly importer_address?: {
                        readonly city?: string
                        readonly country_code?: string
                        readonly postal_code?: string
                        readonly region?: string
                        readonly street1?: string
                        readonly street2?: string
                    }
                    readonly importer_name?: string
                }
                readonly currency?: string
                readonly description?: string
                readonly id?: string
                readonly is_hidden?: boolean
                readonly is_sanctioned?: boolean
                readonly max_available?: number
                readonly media?: {
                    readonly images?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_image_url?: string
                        readonly request_image_url?: string
                    }>
                    readonly videos?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_video_url?: string
                        readonly thumbnail_url?: string
                    }>
                }
                readonly name?: string
                readonly price?: string
                readonly product_availability?: string
                readonly retailer_id?: string
                readonly sale_price?: {
                    readonly end_date?: string
                    readonly price?: string
                    readonly start_date?: string
                }
                readonly shimmed_url?: string
                readonly status_info?: {
                    readonly can_appeal?: string
                    readonly status?: string
                }
                readonly url?: string
                readonly variant_info?: {
                    readonly availability?: {
                        readonly listing?: ReadonlyArray<{
                            readonly is_available?: boolean
                            readonly options?: ReadonlyArray<{
                                readonly name?: string
                                readonly value?: string
                            }>
                            readonly product_id?: string
                        }>
                    }
                    readonly listing_details?: {
                        readonly description?: string
                        readonly lowest_price?: string
                        readonly multi_price?: string
                    }
                    readonly types?: ReadonlyArray<{
                        readonly name?: string
                        readonly options?: ReadonlyArray<{
                            readonly thumbnail_media?: {
                                readonly id?: string
                                readonly original_dimensions?: {
                                    readonly height?: number
                                    readonly width?: number
                                }
                                readonly original_image_url?: string
                                readonly request_image_url?: string
                            }
                            readonly value?: string
                        }>
                    }>
                    readonly variant_properties?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
            }>
            readonly status_info?: {
                readonly can_appeal?: string
                readonly commerce_url?: string
                readonly reject_reason?: string
                readonly status?: string
            }
        }>
        readonly paging?: {
            readonly after?: string
        }
    }
}

export type WaMexQueryProductListCatalogResponse = {
    readonly xwa_product_catalog_get_product_list?: {
        readonly __typename?: string
        readonly product_list?: {
            readonly products?: ReadonlyArray<{
                readonly belongs_to?: string
                readonly compliance_category?: string
                readonly compliance_info?: {
                    readonly country_code_origin?: string
                    readonly importer_address?: {
                        readonly city?: string
                        readonly country_code?: string
                        readonly postal_code?: string
                        readonly region?: string
                        readonly street1?: string
                        readonly street2?: string
                    }
                    readonly importer_name?: string
                }
                readonly currency?: string
                readonly description?: string
                readonly id?: string
                readonly is_hidden?: boolean
                readonly is_sanctioned?: boolean
                readonly max_available?: number
                readonly media?: {
                    readonly images?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_image_url?: string
                        readonly request_image_url?: string
                    }>
                    readonly videos?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_video_url?: string
                        readonly thumbnail_url?: string
                    }>
                }
                readonly name?: string
                readonly price?: string
                readonly product_availability?: string
                readonly retailer_id?: string
                readonly sale_price?: {
                    readonly end_date?: string
                    readonly price?: string
                    readonly start_date?: string
                }
                readonly shimmed_url?: string
                readonly status_info?: {
                    readonly can_appeal?: boolean
                    readonly status?: string
                }
                readonly url?: string
                readonly variant_info?: {
                    readonly availability?: {
                        readonly listing?: ReadonlyArray<{
                            readonly is_available?: boolean
                            readonly options?: ReadonlyArray<{
                                readonly name?: string
                                readonly value?: string
                            }>
                            readonly product_id?: string
                        }>
                    }
                    readonly listing_details?: {
                        readonly description?: string
                        readonly lowest_price?: string
                        readonly multi_price?: string
                    }
                    readonly types?: ReadonlyArray<{
                        readonly name?: string
                        readonly options?: ReadonlyArray<{
                            readonly thumbnail_media?: {
                                readonly id?: string
                                readonly original_dimensions?: {
                                    readonly height?: number
                                    readonly width?: number
                                }
                                readonly original_image_url?: string
                                readonly request_image_url?: string
                            }
                            readonly value?: string
                        }>
                    }>
                    readonly variant_properties?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
            }>
        }
    }
}

export type WaMexQueryProductSingleCollectionResponse = {
    readonly xwa_product_catalog_get_single_collection?: {
        readonly collection?: {
            readonly id?: string
            readonly name?: string
            readonly products?: ReadonlyArray<{
                readonly belongs_to?: string
                readonly compliance_category?: string
                readonly compliance_info?: {
                    readonly country_code_origin?: string
                    readonly importer_address?: {
                        readonly city?: string
                        readonly country_code?: string
                        readonly postal_code?: string
                        readonly region?: string
                        readonly street1?: string
                        readonly street2?: string
                    }
                    readonly importer_name?: string
                }
                readonly currency?: string
                readonly description?: string
                readonly id?: string
                readonly is_hidden?: boolean
                readonly is_sanctioned?: boolean
                readonly max_available?: number
                readonly media?: {
                    readonly images?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_image_url?: string
                        readonly request_image_url?: string
                    }>
                    readonly videos?: ReadonlyArray<{
                        readonly id?: string
                        readonly original_video_url?: string
                        readonly thumbnail_url?: string
                    }>
                }
                readonly name?: string
                readonly price?: string
                readonly product_availability?: string
                readonly retailer_id?: string
                readonly sale_price?: {
                    readonly end_date?: string
                    readonly price?: string
                    readonly start_date?: string
                }
                readonly shimmed_url?: string
                readonly status_info?: {
                    readonly can_appeal?: string
                    readonly status?: string
                }
                readonly url?: string
                readonly variant_info?: {
                    readonly availability?: {
                        readonly listing?: ReadonlyArray<{
                            readonly is_available?: boolean
                            readonly options?: ReadonlyArray<{
                                readonly name?: string
                                readonly value?: string
                            }>
                            readonly product_id?: string
                        }>
                    }
                    readonly listing_details?: {
                        readonly description?: string
                        readonly lowest_price?: string
                        readonly multi_price?: string
                    }
                    readonly types?: ReadonlyArray<{
                        readonly name?: string
                        readonly options?: ReadonlyArray<{
                            readonly thumbnail_media?: {
                                readonly id?: string
                                readonly original_dimensions?: {
                                    readonly height?: number
                                    readonly width?: number
                                }
                                readonly original_image_url?: string
                                readonly request_image_url?: string
                            }
                            readonly value?: string
                        }>
                    }>
                    readonly variant_properties?: ReadonlyArray<{
                        readonly name?: string
                        readonly value?: string
                    }>
                }
            }>
            readonly status_info?: {
                readonly can_appeal?: string
                readonly commerce_url?: string
                readonly reject_reason?: string
                readonly status?: string
            }
        }
        readonly paging?: {
            readonly after?: string
        }
    }
}

export type WaMexQuerySubgroupParticipantCountResponse = {
    readonly xwa2_group_query_by_id?: {
        readonly __typename?: string
        readonly id?: string
        readonly sub_groups?: {
            readonly edges?: ReadonlyArray<{
                readonly node?: {
                    readonly id?: string
                    readonly total_participants_count?: number
                }
            }>
        }
    }
}

export type WaMexQuickPromotionActionResponse = {
    readonly wa_quick_promotion_log_event?: {
        readonly client_mutation_id?: string
    }
}

export type WaMexReportProductResponse = {
    readonly xwa_whatsapp_catalog_report_product?: {
        readonly __typename?: string
        readonly success?: boolean
    }
}

export type WaMexRequestClientLogsForBugResponse = {
    readonly xwa2_request_client_logs_for_bug?: boolean
}

export type WaMexRequestOTEResponse = {
    readonly xwa2_ncm_request_ote?: {
        readonly capping_status?: string
        readonly cycle_end_timestamp?: string
        readonly cycle_start_timestamp?: string
        readonly mv_status?: string
        readonly ote_status?: string
        readonly server_sent_timestamp?: string
        readonly total_quota?: unknown
        readonly used_quota?: unknown
    }
}

export type WaMexResolveAccountTypeAndAdPageResponse = {
    readonly xfb_wa_biz_clear_oidc_preference?: boolean
}

export type WaMexResolveAccountTypeAndAdPageQueryResponse = {
    readonly page?: {
        readonly can_viewer_do_actions?: boolean
        readonly id?: string
    }
}

export type WaMexRevokeNewsletterAdminInviteResponse = {
    readonly xwa2_newsletter_admin_invite_revoke?: {
        readonly __typename?: string
        readonly id?: string
    }
}

export type WaMexRotateLabyrinthEpochResponse = {
    readonly wa_labyrinth_rotate_epoch?: {
        readonly __typename?: string
        readonly message?: string
        readonly new_epoch_id?: string
        readonly status?: string
    }
}

export type WaMexSetUsernameResponse = {
    readonly xwa2_username_set?: {
        readonly result?: 'SUCCESS'
    }
}

export type WaMexSetUsernameKeyResponse = {
    readonly xwa2_username_pin_set?: {
        readonly result?: 'SUCCESS'
    }
}

export type WaMexSignupMetadataResponse = {
    readonly wa_signup_metadata?: {
        readonly id?: string
        readonly privacy_policy_url?: string
        readonly signup_message?: string
    }
}

export type WaMexStartConversationTemplateReengagementWithCatalogSectionResponse = {
    readonly page?: {
        readonly id?: string
        readonly smc_product_catalog?: {
            readonly ad_catalog_id?: string
            readonly catalog_info?: {
                readonly catalog_id?: string
            }
        }
    }
}

export type WaMexStartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegenerationResponse = {
    readonly ad_account?: {
        readonly id?: string
        readonly is_eligible_for_ai_regeneration?: boolean
    }
}

export type WaMexStartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlowsResponse = {
    readonly welcome_message_flows?: {
        readonly has_welcome_message_flows?: boolean
    }
}

export type WaMexStartConversationsTemplateFAQGenAIRegenerationResponse = {
    readonly xfb_get_ai_regenerated_icebreaker_automated_response?: {
        readonly ai_regeneration_id?: string
        readonly icebreaker?: {
            readonly response?: string
            readonly title?: string
        }
    }
}

export type WaMexSupportBugReportSubmitResponse = {
    readonly xwa_wa_support_bug_report_submit?: {
        readonly bug_report_id?: string
        readonly error_code?: number
        readonly error_message?: string
        readonly success?: boolean
        readonly task_id?: string
    }
}

export type WaMexSupportContactFormSubmitResponse = {
    readonly xwa_wa_support_contact_form_submit?: {
        readonly error_code?: number
        readonly error_message?: string
        readonly success?: boolean
        readonly support_phone_number_jid?: string
        readonly ticket_id?: string
    }
}

export type WaMexSupportMessageFeedbackSubmitResponse = {
    readonly xwa_wa_support_message_feedback_submit?: {
        readonly error_code?: number
        readonly error_message?: string
        readonly success?: boolean
    }
}

export type WaMexTeamLinkCreateInvitationResponse = {
    readonly whatsapp_teamlink_create_agent_invitation?: {
        readonly employee_lid?: string
        readonly employee_name?: string
        readonly expires_at?: string
        readonly invitation_status?: string
        readonly nonce_code?: string
    }
}

export type WaMexTeamLinkListInvitationsResponse = {
    readonly whatsapp_teamlink_list_agent_invitations?: ReadonlyArray<{
        readonly employee_lid?: string
        readonly employee_name?: string
        readonly expires_at?: string
        readonly invitation_status?: string
        readonly nonce_code?: string
    }>
}

export type WaMexTeamLinkRemoveInvitationResponse = {
    readonly whatsapp_teamlink_remove_agent_invitation?: {
        readonly removed?: boolean
        readonly was_onboarded?: boolean
    }
}

export type WaMexTransferCommunityOwnershipResponse = {
    readonly xwa2_group_update_users_role?: {
        readonly group_id?: string
        readonly lid_migration_state?: {
            readonly addressing_mode?: string
        }
    }
}

export type WaMexUpdateGroupPropertyResponse = {
    readonly xwa2_group_update_property?: {
        readonly id?: string
        readonly state?: string
    }
}

export type WaMexUpdateNewsletterResponse = {
    readonly xwa2_newsletter_update?: {
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
        readonly thread_metadata?: {
            readonly creation_time?: string
            readonly description?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly handle?: string
            readonly invite?: string
            readonly name?: {
                readonly id?: string
                readonly text?: string
                readonly update_time?: string
            }
            readonly picture?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'IMAGE' | 'PREVIEW'
            }
            readonly preview?: {
                readonly direct_path?: string
                readonly id?: string
                readonly type?: 'PREVIEW'
            }
            readonly settings?: {
                readonly reaction_codes?: {
                    readonly value?: 'ALL'
                }
            }
            readonly verification?: 'UNVERIFIED' | 'VERIFIED'
        }
    }
}

export type WaMexUpdateNewsletterUserSettingResponse = {
    readonly xwa2_newsletter_update_user_setting?: {
        readonly id?: string
        readonly state?: {
            readonly type?: 'ACTIVE' | 'DELETED' | 'GEOSUSPENDED' | 'NON_EXISTING' | 'SUSPENDED'
        }
    }
}

export type WaMexUpdateTextStatusResponse = {
    readonly xwa2_update_text_status?: {
        readonly result?: string
    }
}

export type WaMexUploadLabyrinthMessagesResponse = {
    readonly wa_labyrinth_upload_messages?: {
        readonly __typename?: string
        readonly message?: string
        readonly results?: ReadonlyArray<{
            readonly error?: boolean
            readonly offline_threading_id?: string
            readonly success?: string
        }>
        readonly status?: string
    }
}

export type WaMexUsernameAvailabilityResponse = {
    readonly xwa2_username_check?: {
        readonly result?: 'SUCCESS'
        readonly suggestions?: ReadonlyArray<string>
    }
}

export type WaMexUsyncResponse = {
    readonly xwa2_fetch_wa_users?: ReadonlyArray<{
        readonly __typename?: string
        readonly about_status_info?: {
            readonly __typename?: string
            readonly status?: string
            readonly text?: string
            readonly timestamp?: string
        }
        readonly country_code?: string
        readonly id?: string
        readonly jid?: string
        readonly username_info?: {
            readonly __typename?: string
            readonly pin?: string
            readonly state?: string
            readonly status?: string
            readonly timestamp?: string
            readonly username?: string
        }
    }>
}

export type WaMexWAAOnboardingResponse = {
    readonly create_or_onboard_wa_ad_account?: {
        readonly ad_account_id?: string
        readonly status?: string
    }
}

export type WaMexWAMFlowsCTWAEditorModalResponse = {
    readonly flow?: {
        readonly id?: string
        readonly status?: string
        readonly welj?: unknown
    }
    readonly flowJSON?: unknown
}

export type WaMexWAMFlowsCTWAFlowPreviewResponse = {
    readonly flow?: {
        readonly id?: string
        readonly welj?: string
    }
    readonly flowJSON?: unknown
}

export type WaMexWaffleFXServiceDataQueryV2Response = {
    readonly waffle_fx_service_data?: {
        readonly services?: {
            readonly foa_to_wa_link_eligibility?: {
                readonly is_eligible_to_link_to_linked_fb?: boolean
                readonly is_eligible_to_link_to_linked_ig?: boolean
                readonly is_eligible_to_link_to_linked_rl?: boolean
                readonly is_eligible_to_link_to_unlinked_fb?: boolean
                readonly is_eligible_to_link_to_unlinked_ig?: boolean
                readonly is_eligible_to_link_to_unlinked_rl?: boolean
            }
            readonly waffle_afs?: {
                readonly waffle_wes?: string
            }
            readonly waffle_sxs?: ReadonlyArray<{
                readonly waffle_da?: string
                readonly waffle_di?: string
                readonly waffle_xss?: ReadonlyArray<{
                    readonly waffle_iaxe?: string
                    readonly waffle_x_surface?: string
                }>
            }>
        }
    }
}

export type WaMexWaffleFXWAMOUpdateUOOMResponse = {
    readonly xfb_waffle_fx_wamo_update_uoom?: boolean
}

export type WaMexWaffleXEResponse = {
    readonly waffle_xe_root?: {
        readonly purpose_public_keys?: {
            readonly purpose_dummy_ciphertext?: string
            readonly purpose_dummy_nonce?: string
            readonly purpose_public_ek?: string
            readonly purpose_public_ik?: string
            readonly purpose_public_ik_enc_certificate?: string
            readonly purpose_public_ik_sig?: string
        }
        readonly waffle_d?: ReadonlyArray<{
            readonly waffle_di?: string
            readonly waffle_xas?: {
                readonly waffle_xan?: string
                readonly waffle_xs?: string
            }
        }>
        readonly waffle_unique_ids?: string
        readonly waffle_xps?: ReadonlyArray<{
            readonly waffle_hcbc?: string
            readonly waffle_xas?: {
                readonly waffle_xan?: string
                readonly waffle_xs?: string
            }
        }>
    }
}

export type WaMexuseFlowJSONValidationLibraryResponse = {
    readonly xfb_wa_flows_is_json_version_accessible?: unknown
}

export type WaMexuseIsMessengerPlatformBotResponse = {
    readonly node?: {
        readonly __typename?: string
        readonly id?: string
        readonly is_messenger_platform_bot?: boolean
    }
}

export type WaMexuseMAIBADraftStatusResponse = {
    readonly campaignGroup?: {
        readonly __typename?: string
        readonly effective_status?: string
        readonly id?: string
    }
    readonly node?: {
        readonly __typename?: string
        readonly fragments?: {
            readonly edges?: ReadonlyArray<{
                readonly node?: {
                    readonly action?: 'ADD'
                    readonly ad_market_id?: string
                    readonly ad_object_type?: string
                    readonly draft_fragment_status?: 'DELETED'
                    readonly id?: string
                    readonly publish_status?: 'SUCCESS'
                }
            }>
        }
        readonly id?: string
    }
}

export type WaMexuseMAIBAMediaResponse = {
    readonly nodes?: ReadonlyArray<{
        readonly __typename?: string
        readonly ad_campaigns?: {
            readonly nodes?: ReadonlyArray<{
                readonly adgroups?: {
                    readonly nodes?: ReadonlyArray<{
                        readonly creative?: {
                            readonly id?: string
                            readonly thumbnail_url?: string
                        }
                        readonly id?: string
                    }>
                }
                readonly id?: string
            }>
        }
        readonly adgroups?: {
            readonly nodes?: ReadonlyArray<{
                readonly creative?: {
                    readonly id?: string
                    readonly thumbnail_url?: string
                }
                readonly id?: string
            }>
        }
        readonly creative?: {
            readonly id?: string
            readonly thumbnail_url?: string
        }
        readonly id?: string
    }>
}

export type WaMexuseWAWebEstimatedDailyReachResponse = {
    readonly lwi?: {
        readonly budget_estimate_data_v2?: {
            readonly daily_outcomes_curve?: ReadonlyArray<{
                readonly actions?: number
                readonly actions_lower_bound?: number
                readonly actions_upper_bound?: number
                readonly bid?: number
                readonly impressions?: number
                readonly reach?: number
                readonly reach_lower_bound?: number
                readonly reach_upper_bound?: number
                readonly spend?: number
            }>
        }
    }
}

export type WaMexuseWAWebSmartComposerReportUsedResponse = {
    readonly meta_ai_biz_agent_wa_suggested_reply_used?: {
        readonly success?: boolean
    }
}

export interface WaMexOperationResponses {
    readonly ACSServerProviderConfig: WaMexACSServerProviderConfigResponse
    readonly ACSServerProviderIssuance: WaMexACSServerProviderIssuanceResponse
    readonly AcceptNewsletterAdminInvite: WaMexAcceptNewsletterAdminInviteResponse
    readonly AdAccountReviewBaseCard: WaMexAdAccountReviewBaseCardResponse
    readonly AdAccountReviewUtilsFetchMAIBAAccountReviewStatus: WaMexAdAccountReviewUtilsFetchMAIBAAccountReviewStatusResponse
    readonly AdPreferencesDFCABusinessOptOut: WaMexAdPreferencesDFCABusinessOptOutResponse
    readonly AdPreferencesDemographicCategoryOptOut: WaMexAdPreferencesDemographicCategoryOptOutResponse
    readonly AdPreferencesHideAdvertiser: WaMexAdPreferencesHideAdvertiserResponse
    readonly AdPreferencesInterestCategoryOptOut: WaMexAdPreferencesInterestCategoryOptOutResponse
    readonly AdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatus: WaMexAdsAdAccountSettingsStoreSetAPlusCFeatureStickyStatusResponse
    readonly AdsAdAccountSettingsStoreSourceServer: WaMexAdsAdAccountSettingsStoreSourceServerResponse
    readonly AdsBulkEditCampaignGroupAgencyFeeBulkContainer: WaMexAdsBulkEditCampaignGroupAgencyFeeBulkContainerResponse
    readonly AdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFee: WaMexAdsBulkEditCampaignGroupAgencyFeeContainerAdAccountAgencyFeeResponse
    readonly AdsBulkEditCampaignGroupBudgetFieldContainer_: WaMexAdsBulkEditCampaignGroupBudgetFieldContainer_Response
    readonly AdsBulkEditVARNCAConflictWrapper_: WaMexAdsBulkEditVARNCAConflictWrapper_Response
    readonly AdsManagerLiveDataCampaign: WaMexAdsManagerLiveDataCampaignResponse
    readonly AdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecs: WaMexAdsManagerLiveDataCampaignQueryPreloadingConfigNoSpecsResponse
    readonly AdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWaba: WaMexAdsUEditorAdgroupMessageDestinationPreviewContainerCTWAWabaResponse
    readonly AiAgentAutoReplyControl: WaMexAiAgentAutoReplyControlResponse
    readonly AuthAgentFeaturePolicy: WaMexAuthAgentFeaturePolicyResponse
    readonly BPAccessTokenAndSessionCookies: WaMexBPAccessTokenAndSessionCookiesResponse
    readonly BizCreateOrder: WaMexBizCreateOrderResponse
    readonly BizCustomUrlGetUserGraphql: WaMexBizCustomUrlGetUserGraphqlResponse
    readonly BizGetCategories: WaMexBizGetCategoriesResponse
    readonly BizGetCategoriesV2: WaMexBizGetCategoriesV2Response
    readonly BizGetCustomUrlUserGraphql: WaMexBizGetCustomUrlUserGraphqlResponse
    readonly BizGetMerchantCompliance: WaMexBizGetMerchantComplianceResponse
    readonly BizGetPriceTiers: WaMexBizGetPriceTiersResponse
    readonly BizGetProfileShimlinks: WaMexBizGetProfileShimlinksResponse
    readonly BizGraphQLRefreshCart: WaMexBizGraphQLRefreshCartResponse
    readonly BizProfileAddressAutocomplete: WaMexBizProfileAddressAutocompleteResponse
    readonly BizProfileRoot: WaMexBizProfileRootResponse
    readonly BizQueryOrder: WaMexBizQueryOrderResponse
    readonly BizSetMerchantCompliance: WaMexBizSetMerchantComplianceResponse
    readonly CTXChatBuilderDialogContainerUtils: WaMexCTXChatBuilderDialogContainerUtilsResponse
    readonly CTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModal: WaMexCTXChatBuilderWAFlowsUtilsWAMFlowsCTWAEditorModalResponse
    readonly CachedToken: WaMexCachedTokenResponse
    readonly CanonicalUserValid: WaMexCanonicalUserValidResponse
    readonly ChangeNewsletterOwner: WaMexChangeNewsletterOwnerResponse
    readonly ConsumerFetchQuickPromotions: WaMexConsumerFetchQuickPromotionsResponse
    readonly ConsumerQuickPromotionActionGraphQL: WaMexConsumerQuickPromotionActionGraphQLResponse
    readonly ContactManagerCustomerProfile: WaMexContactManagerCustomerProfileResponse
    readonly ContactManagerCustomerProfileUpsert: WaMexContactManagerCustomerProfileUpsertResponse
    readonly ContactManagerCustomerProfiles: WaMexContactManagerCustomerProfilesResponse
    readonly CreateEnforcementAppeal: WaMexCreateEnforcementAppealResponse
    readonly CreateInviteCode: WaMexCreateInviteCodeResponse
    readonly CreateLabyrinthBackup: WaMexCreateLabyrinthBackupResponse
    readonly CreateMarketingCampaignAction: WaMexCreateMarketingCampaignActionResponse
    readonly CreateNewsletter: WaMexCreateNewsletterResponse
    readonly CreateNewsletterAdminInvite: WaMexCreateNewsletterAdminInviteResponse
    readonly CreateReportAppeal: WaMexCreateReportAppealResponse
    readonly CreateWhatsAppAdsIdentity: WaMexCreateWhatsAppAdsIdentityResponse
    readonly CustomLabel3pdEvent: WaMexCustomLabel3pdEventResponse
    readonly DebugLabyrinthInboxSnapshot: WaMexDebugLabyrinthInboxSnapshotResponse
    readonly DebugLabyrinthRange: WaMexDebugLabyrinthRangeResponse
    readonly DeleteNewsletter: WaMexDeleteNewsletterResponse
    readonly DemoteNewsletterAdmin: WaMexDemoteNewsletterAdminResponse
    readonly E2EEMetadataMailboxAddGroupParticipants: WaMexE2EEMetadataMailboxAddGroupParticipantsResponse
    readonly E2EEMetadataMailboxCreateGroupThread: WaMexE2EEMetadataMailboxCreateGroupThreadResponse
    readonly E2EEMetadataMailboxDemoteGroupParticipants: WaMexE2EEMetadataMailboxDemoteGroupParticipantsResponse
    readonly E2EEMetadataMailboxFetchGroupInfoV4: WaMexE2EEMetadataMailboxFetchGroupInfoV4Response
    readonly E2EEMetadataMailboxLeaveGroup: WaMexE2EEMetadataMailboxLeaveGroupResponse
    readonly E2EEMetadataMailboxPromoteGroupParticipants: WaMexE2EEMetadataMailboxPromoteGroupParticipantsResponse
    readonly E2EEMetadataMailboxRemoveGroupParticipants: WaMexE2EEMetadataMailboxRemoveGroupParticipantsResponse
    readonly E2EEMetadataMailboxSetGroupSubject: WaMexE2EEMetadataMailboxSetGroupSubjectResponse
    readonly EBMessageRangeQueryForThreads: WaMexEBMessageRangeQueryForThreadsResponse
    readonly EBMinosFetchContactKeys: WaMexEBMinosFetchContactKeysResponse
    readonly EBMinosUploadMessages: WaMexEBMinosUploadMessagesResponse
    readonly EBRegisterMinosMessageEncryptionKey: WaMexEBRegisterMinosMessageEncryptionKeyResponse
    readonly EditBizProfile: WaMexEditBizProfileResponse
    readonly ExternalCtxAuthoriseWAChat: WaMexExternalCtxAuthoriseWAChatResponse
    readonly FetchAboutStatus: WaMexFetchAboutStatusResponse
    readonly FetchAllNewslettersMetadata: WaMexFetchAllNewslettersMetadataResponse
    readonly FetchAllSubgroups: WaMexFetchAllSubgroupsResponse
    readonly FetchBotCertificateRevocationList: WaMexFetchBotCertificateRevocationListResponse
    readonly FetchBotProfilesGQL: WaMexFetchBotProfilesGQLResponse
    readonly FetchDynamicAIModes: WaMexFetchDynamicAIModesResponse
    readonly FetchGroupInfo: WaMexFetchGroupInfoResponse
    readonly FetchGroupInfoIncludBots: WaMexFetchGroupInfoIncludBotsResponse
    readonly FetchGroupInviteCode: WaMexFetchGroupInviteCodeResponse
    readonly FetchGroupIsInternal: WaMexFetchGroupIsInternalResponse
    readonly FetchIntegritySignals: WaMexFetchIntegritySignalsResponse
    readonly FetchNewChatMessageCappingInfo: WaMexFetchNewChatMessageCappingInfoResponse
    readonly FetchNewsletter: WaMexFetchNewsletterResponse
    readonly FetchNewsletterAdminCapabilities: WaMexFetchNewsletterAdminCapabilitiesResponse
    readonly FetchNewsletterAdminInfo: WaMexFetchNewsletterAdminInfoResponse
    readonly FetchNewsletterDehydrated: WaMexFetchNewsletterDehydratedResponse
    readonly FetchNewsletterDirectoryCategoriesPreview: WaMexFetchNewsletterDirectoryCategoriesPreviewResponse
    readonly FetchNewsletterDirectoryList: WaMexFetchNewsletterDirectoryListResponse
    readonly FetchNewsletterDirectorySearchResults: WaMexFetchNewsletterDirectorySearchResultsResponse
    readonly FetchNewsletterEnforcements: WaMexFetchNewsletterEnforcementsResponse
    readonly FetchNewsletterFollowers: WaMexFetchNewsletterFollowersResponse
    readonly FetchNewsletterInsights: WaMexFetchNewsletterInsightsResponse
    readonly FetchNewsletterIsDomainPreviewable: WaMexFetchNewsletterIsDomainPreviewableResponse
    readonly FetchNewsletterMessageReactionSenderList: WaMexFetchNewsletterMessageReactionSenderListResponse
    readonly FetchNewsletterPendingInvites: WaMexFetchNewsletterPendingInvitesResponse
    readonly FetchNewsletterPollVoters: WaMexFetchNewsletterPollVotersResponse
    readonly FetchNewsletterReports: WaMexFetchNewsletterReportsResponse
    readonly FetchOHAIKeyConfig: WaMexFetchOHAIKeyConfigResponse
    readonly FetchOIDCState: WaMexFetchOIDCStateResponse
    readonly FetchPlaintextLinkPreview: WaMexFetchPlaintextLinkPreviewResponse
    readonly FetchQuickPromotions: WaMexFetchQuickPromotionsResponse
    readonly FetchReachoutTimelock: WaMexFetchReachoutTimelockResponse
    readonly FetchRecommendedNewsletters: WaMexFetchRecommendedNewslettersResponse
    readonly FetchSimilarNewsletters: WaMexFetchSimilarNewslettersResponse
    readonly FetchSubgroupSuggestions: WaMexFetchSubgroupSuggestionsResponse
    readonly FetchSubscriptionEntryPoints: WaMexFetchSubscriptionEntryPointsResponse
    readonly FetchSubscriptions: WaMexFetchSubscriptionsResponse
    readonly FetchTextStatusList: WaMexFetchTextStatusListResponse
    readonly FetchWassBotListProfilesGQL: WaMexFetchWassBotListProfilesGQLResponse
    readonly FetchWassBotProfileGQL: WaMexFetchWassBotProfileGQLResponse
    readonly GetAccessTokenFromOIDCCode: WaMexGetAccessTokenFromOIDCCodeResponse
    readonly GetAccountNonce: WaMexGetAccountNonceResponse
    readonly GetDsbInfo: WaMexGetDsbInfoResponse
    readonly GetFBAccountPages: WaMexGetFBAccountPagesResponse
    readonly GetNumbersForBrandIds: WaMexGetNumbersForBrandIdsResponse
    readonly GetPrivacyLists: WaMexGetPrivacyListsResponse
    readonly GetPrivacySettings: WaMexGetPrivacySettingsResponse
    readonly GetUsername: WaMexGetUsernameResponse
    readonly GetWAAEligibility: WaMexGetWAAEligibilityResponse
    readonly GraphQLProductCatalogGetPublicKey: WaMexGraphQLProductCatalogGetPublicKeyResponse
    readonly GraphQLVerifyPostcode: WaMexGraphQLVerifyPostcodeResponse
    readonly GroupStoreInviteSms: WaMexGroupStoreInviteSmsResponse
    readonly GroupSuspensionAppeal: WaMexGroupSuspensionAppealResponse
    readonly IntegrityChallengeResponse: WaMexIntegrityChallengeResponseResponse
    readonly JoinNewsletter: WaMexJoinNewsletterResponse
    readonly KeyTransparencyGraphQLClient_: WaMexKeyTransparencyGraphQLClient_Response
    readonly LeaveNewsletter: WaMexLeaveNewsletterResponse
    readonly LidChangeNotification: WaMexLidChangeNotificationResponse
    readonly LogNewsletterExposures: WaMexLogNewsletterExposuresResponse
    readonly MAIBAInlineAssetSelectorWidgetAssetIDs: WaMexMAIBAInlineAssetSelectorWidgetAssetIDsResponse
    readonly MAIBAInlineAssetSelectorWidgetAssets: WaMexMAIBAInlineAssetSelectorWidgetAssetsResponse
    readonly MAIBAMessageCreatorCardsRenderer: WaMexMAIBAMessageCreatorCardsRendererResponse
    readonly MAIBAMessageLiveBrowserRendererScreenshot: WaMexMAIBAMessageLiveBrowserRendererScreenshotResponse
    readonly MAIBAMessageSignalsCTARenderer: WaMexMAIBAMessageSignalsCTARendererResponse
    readonly MAIBARecordAsyncAuthConsent: WaMexMAIBARecordAsyncAuthConsentResponse
    readonly MessengerAdPreviewConversation: WaMexMessengerAdPreviewConversationResponse
    readonly MetaPayVaultInitialize: WaMexMetaPayVaultInitializeResponse
    readonly MetaPayVaultLabyrinthDelete: WaMexMetaPayVaultLabyrinthDeleteResponse
    readonly MetaPayVaultLabyrinthFetchAll: WaMexMetaPayVaultLabyrinthFetchAllResponse
    readonly MetaPayVaultLabyrinthSave: WaMexMetaPayVaultLabyrinthSaveResponse
    readonly MpsReceiverFetchGraphQLSticker: WaMexMpsReceiverFetchGraphQLStickerResponse
    readonly MpsReceiverFetchGraphQLXMA: WaMexMpsReceiverFetchGraphQLXMAResponse
    readonly NativeMLModel: WaMexNativeMLModelResponse
    readonly NewsletterAddPaidPartnershipLabel: WaMexNewsletterAddPaidPartnershipLabelResponse
    readonly NewsletterBlockUser: WaMexNewsletterBlockUserResponse
    readonly NewsletterLabelAiContent: WaMexNewsletterLabelAiContentResponse
    readonly NewsletterPinMessages: WaMexNewsletterPinMessagesResponse
    readonly NewsletterQuestionResponseStateUpdate: WaMexNewsletterQuestionResponseStateUpdateResponse
    readonly NewsletterUnpinMessages: WaMexNewsletterUnpinMessagesResponse
    readonly OrgAdminGraphQLAddGroup: WaMexOrgAdminGraphQLAddGroupResponse
    readonly OrgAdminGraphQLDirectory: WaMexOrgAdminGraphQLDirectoryResponse
    readonly OrgAdminGraphQLGroup: WaMexOrgAdminGraphQLGroupResponse
    readonly OrgAdminGraphQLInviteMembers: WaMexOrgAdminGraphQLInviteMembersResponse
    readonly OrgAdminGraphQLManagedGroups: WaMexOrgAdminGraphQLManagedGroupsResponse
    readonly OrgAdminGraphQLMemberSearch: WaMexOrgAdminGraphQLMemberSearchResponse
    readonly OrgAdminGraphQLOrgs: WaMexOrgAdminGraphQLOrgsResponse
    readonly PaymentsPasskeyHasCredential: WaMexPaymentsPasskeyHasCredentialResponse
    readonly QueryCatalog: WaMexQueryCatalogResponse
    readonly QueryCatalogHasCategories: WaMexQueryCatalogHasCategoriesResponse
    readonly QueryCatalogProduct: WaMexQueryCatalogProductResponse
    readonly QueryProductCollections: WaMexQueryProductCollectionsResponse
    readonly QueryProductListCatalog: WaMexQueryProductListCatalogResponse
    readonly QueryProductSingleCollection: WaMexQueryProductSingleCollectionResponse
    readonly QuerySubgroupParticipantCount: WaMexQuerySubgroupParticipantCountResponse
    readonly QuickPromotionAction: WaMexQuickPromotionActionResponse
    readonly ReportProduct: WaMexReportProductResponse
    readonly RequestClientLogsForBug: WaMexRequestClientLogsForBugResponse
    readonly RequestOTE: WaMexRequestOTEResponse
    readonly ResolveAccountTypeAndAdPage: WaMexResolveAccountTypeAndAdPageResponse
    readonly ResolveAccountTypeAndAdPageQuery: WaMexResolveAccountTypeAndAdPageQueryResponse
    readonly RevokeNewsletterAdminInvite: WaMexRevokeNewsletterAdminInviteResponse
    readonly RotateLabyrinthEpoch: WaMexRotateLabyrinthEpochResponse
    readonly SetUsername: WaMexSetUsernameResponse
    readonly SetUsernameKey: WaMexSetUsernameKeyResponse
    readonly SignupMetadata: WaMexSignupMetadataResponse
    readonly StartConversationTemplateReengagementWithCatalogSection: WaMexStartConversationTemplateReengagementWithCatalogSectionResponse
    readonly StartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegeneration: WaMexStartConversationsTemplateCustomerActionsSectionIsEligibleForAIRegenerationResponse
    readonly StartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlows: WaMexStartConversationsTemplateDialogContainerBodyGraphQLWelcomeMessageFlowsResponse
    readonly StartConversationsTemplateFAQGenAIRegeneration: WaMexStartConversationsTemplateFAQGenAIRegenerationResponse
    readonly SupportBugReportSubmit: WaMexSupportBugReportSubmitResponse
    readonly SupportContactFormSubmit: WaMexSupportContactFormSubmitResponse
    readonly SupportMessageFeedbackSubmit: WaMexSupportMessageFeedbackSubmitResponse
    readonly TeamLinkCreateInvitation: WaMexTeamLinkCreateInvitationResponse
    readonly TeamLinkListInvitations: WaMexTeamLinkListInvitationsResponse
    readonly TeamLinkRemoveInvitation: WaMexTeamLinkRemoveInvitationResponse
    readonly TransferCommunityOwnership: WaMexTransferCommunityOwnershipResponse
    readonly UpdateGroupProperty: WaMexUpdateGroupPropertyResponse
    readonly UpdateNewsletter: WaMexUpdateNewsletterResponse
    readonly UpdateNewsletterUserSetting: WaMexUpdateNewsletterUserSettingResponse
    readonly UpdateTextStatus: WaMexUpdateTextStatusResponse
    readonly UploadLabyrinthMessages: WaMexUploadLabyrinthMessagesResponse
    readonly UsernameAvailability: WaMexUsernameAvailabilityResponse
    readonly Usync: WaMexUsyncResponse
    readonly WAAOnboarding: WaMexWAAOnboardingResponse
    readonly WAMFlowsCTWAEditorModal: WaMexWAMFlowsCTWAEditorModalResponse
    readonly WAMFlowsCTWAFlowPreview: WaMexWAMFlowsCTWAFlowPreviewResponse
    readonly WaffleFXServiceDataQueryV2: WaMexWaffleFXServiceDataQueryV2Response
    readonly WaffleFXWAMOUpdateUOOM: WaMexWaffleFXWAMOUpdateUOOMResponse
    readonly WaffleXE: WaMexWaffleXEResponse
    readonly useFlowJSONValidationLibrary: WaMexuseFlowJSONValidationLibraryResponse
    readonly useIsMessengerPlatformBot: WaMexuseIsMessengerPlatformBotResponse
    readonly useMAIBADraftStatus: WaMexuseMAIBADraftStatusResponse
    readonly useMAIBAMedia: WaMexuseMAIBAMediaResponse
    readonly useWAWebEstimatedDailyReach: WaMexuseWAWebEstimatedDailyReachResponse
    readonly useWAWebSmartComposerReportUsed: WaMexuseWAWebSmartComposerReportUsedResponse
}
