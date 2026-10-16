'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const protobuf = require('protobufjs')

const { waproto } = require('../dist/index.js')
const { extractProto } = require('../scripts/extract-proto.cjs')

test('host write mutation support uses DeviceCapabilities tag 12 and mutation names tag 1', () => {
    const expected = Uint8Array.from([
        0x4a, 0x02, 0x08, 0x01,
        0x62, 0x0b, 0x0a, 0x04, 0x6d, 0x75, 0x74, 0x65, 0x0a, 0x03, 0x70, 0x69, 0x6e
    ])
    const input = {
        contactRefresh: { refreshSupported: true },
        hostWriteMutationSupport: { mutationNames: ['mute', 'pin'] }
    }
    assert.deepEqual(Uint8Array.from(waproto.DeviceCapabilities.encode(input).finish()), expected)
    const decoded = waproto.DeviceCapabilities.decode(expected)
    assert.equal(decoded.contactRefresh.refreshSupported, true)
    assert.deepEqual(decoded.hostWriteMutationSupport.mutationNames, ['mute', 'pin'])
})

test('current enum values survive encoding in their existing parent messages', () => {
    const stubs = [
        ['BOT_PROACTIVE_MESSAGE_ENABLED', 273],
        ['BOT_PROACTIVE_MESSAGE_DISABLED', 274],
        ['BOT_PROACTIVE_MESSAGE_FIRST_TIME', 275],
        ['DYNAMIC_AUDIENCE_LIST_CREATE', 276],
        ['DYNAMIC_AUDIENCE_LIST_UPDATE_LINK', 277]
    ]
    for (const [name, value] of stubs) {
        assert.equal(waproto.WebMessageInfo.StubType[name], value)
        const wire = Uint8Array.from([0x0a, 0x00, 0xc0, 0x01, value & 0x7f | 0x80, value >> 7])
        const input = { key: {}, messageStubType: value }
        assert.deepEqual(Uint8Array.from(waproto.WebMessageInfo.encode(input).finish()), wire)
        assert.equal(waproto.WebMessageInfo.decode(wire).messageStubType, value)
    }

    assert.equal(waproto.ClientPayload.UserAgent.Platform.AUTOMOTIVE, 41)
    const automotive = Uint8Array.from([0x2a, 0x02, 0x08, 0x29])
    assert.deepEqual(Uint8Array.from(waproto.ClientPayload.encode({
        userAgent: { platform: waproto.ClientPayload.UserAgent.Platform.AUTOMOTIVE }
    }).finish()), automotive)
    assert.equal(waproto.ClientPayload.decode(automotive).userAgent.platform, 41)

    assert.equal(waproto.BotMetricsEntryPoint.SHARE, 59)
    const share = Uint8Array.from([0x10, 0x3b])
    assert.deepEqual(Uint8Array.from(waproto.BotMetricsMetadata.encode({
        destinationEntryPoint: waproto.BotMetricsEntryPoint.SHARE
    }).finish()), share)
    assert.equal(waproto.BotMetricsMetadata.decode(share).destinationEntryPoint, 59)

    assert.equal(waproto.BotCapabilityMetadata.BotCapabilityType.AI_STUDY_QUIZ_ENABLED, 82)
    const quiz = Uint8Array.from([0x08, 0x52])
    assert.deepEqual(Uint8Array.from(waproto.BotCapabilityMetadata.encode({
        capabilities: [waproto.BotCapabilityMetadata.BotCapabilityType.AI_STUDY_QUIZ_ENABLED]
    }).finish()), quiz)
    assert.deepEqual(waproto.BotCapabilityMetadata.decode(quiz).capabilities, [82])

    assert.equal(waproto.BotMessageOrigin.BotMessageOriginType.BOT_MESSAGE_ORIGIN_TYPE_META_AI_THREAD_WELCOME, 1)
    const welcome = Uint8Array.from([0x08, 0x01])
    assert.deepEqual(Uint8Array.from(waproto.BotMessageOrigin.encode({
        type: waproto.BotMessageOrigin.BotMessageOriginType.BOT_MESSAGE_ORIGIN_TYPE_META_AI_THREAD_WELCOME
    }).finish()), welcome)
    assert.equal(waproto.BotMessageOrigin.decode(welcome).type, 1)
})

const unpackedCases = [
    ['ClientPayload.shards', waproto.ClientPayload, 'shards', [1, 150],
        [0x70, 0x01, 0x70, 0x96, 0x01], [0x72, 0x03, 0x01, 0x96, 0x01]],
    ['MediaEntry.ProgressiveJpegDetails.scanLengths', waproto.MediaEntry.ProgressiveJpegDetails,
        'scanLengths', [1, 150], [0x08, 0x01, 0x08, 0x96, 0x01], [0x0a, 0x03, 0x01, 0x96, 0x01]],
    ['DeviceCapabilities.ReverseHistorySync.enabledProducts', waproto.DeviceCapabilities.ReverseHistorySync,
        'enabledProducts', [0, 1], [0x08, 0x00, 0x08, 0x01], [0x0a, 0x02, 0x00, 0x01]],
    ['SyncActionValue.LabelReorderingAction.sortedLabelIds', waproto.SyncActionValue.LabelReorderingAction,
        'sortedLabelIds', [1, 150], [0x08, 0x01, 0x08, 0x96, 0x01], [0x0a, 0x03, 0x01, 0x96, 0x01]],
    ['SyncActionValue.StatusPrivacyAction.modes', waproto.SyncActionValue.StatusPrivacyAction,
        'modes', [0, 1], [0x30, 0x00, 0x30, 0x01], [0x32, 0x02, 0x00, 0x01]],
    ['BotCapabilityMetadata.capabilities', waproto.BotCapabilityMetadata,
        'capabilities', [0, 82], [0x08, 0x00, 0x08, 0x52], [0x0a, 0x02, 0x00, 0x52]],
    ['BotModeSelectionMetadata.mode', waproto.BotModeSelectionMetadata,
        'mode', [0, 1], [0x08, 0x00, 0x08, 0x01], [0x0a, 0x02, 0x00, 0x01]],
    ['BotModeSelectionMetadata.overrideMode', waproto.BotModeSelectionMetadata,
        'overrideMode', [1, 150], [0x10, 0x01, 0x10, 0x96, 0x01], [0x12, 0x03, 0x01, 0x96, 0x01]],
    ['Message.ImageMessage.scanLengths', waproto.Message.ImageMessage,
        'scanLengths', [1, 150], [0xb0, 0x01, 0x01, 0xb0, 0x01, 0x96, 0x01],
        [0xb2, 0x01, 0x03, 0x01, 0x96, 0x01]]
]

for (const [name, type, field, values, unpacked, packed] of unpackedCases) {
    test(`${name} encodes unpacked values and still accepts packed input`, () => {
        assert.deepEqual(Uint8Array.from(type.encode({ [field]: values }).finish()), Uint8Array.from(unpacked))
        assert.deepEqual(type.decode(Uint8Array.from(unpacked))[field], values)
        assert.deepEqual(type.decode(Uint8Array.from(packed))[field], values)
    })
}

test('explicit packed metadata retains packed encoding', () => {
    const expected = Uint8Array.from([0x22, 0x03, 0x01, 0x96, 0x01])
    assert.deepEqual(Uint8Array.from(waproto.ADVKeyIndexList.encode({
        validIndexes: [1, 150]
    }).finish()), expected)
    assert.deepEqual(waproto.ADVKeyIndexList.decode(expected).validIndexes, [1, 150])
})

test('extractor preserves packed and unpacked metadata without annotating non-packable fields', () => {
    const text = `__d("WAWebProtobufsFixture.pb", ["$InternalEnum", "WAProtoConst"],
        (function(t,n,r,o,a,i,l) {
            var e, kind=n("$InternalEnum")({ZERO:0,ONE:1}), msg={}, child={};
            child.name="WireMetadataFixture.Child";
            child.internalSpec={text:[1,(e=o("WAProtoConst")).TYPES.STRING]};
            msg.name="WireMetadataFixture";
            msg.internalSpec={
                unpackedNumbers:[1,e.TYPES.INT32|e.FLAGS.REPEATED],
                packedNumbers:[2,e.TYPES.UINT32|e.FLAGS.REPEATED|e.FLAGS.PACKED],
                unpackedEnums:[3,e.TYPES.ENUM|e.FLAGS.REPEATED,kind],
                strings:[4,e.TYPES.STRING|e.FLAGS.REPEATED],
                bytes:[5,e.TYPES.BYTES|e.FLAGS.REPEATED],
                messages:[6,e.TYPES.MESSAGE|e.FLAGS.REPEATED,child],
                optionalEnum:[7,e.TYPES.ENUM,kind],
                optionalNumber:[8,e.TYPES.INT32]
            };
            l.WireMetadataFixtureSpec=msg;
            l.WireMetadataFixture$Kind=kind;
            l.WireMetadataFixture$Child=child;
        }));`
    const { sdl, diagnostics } = extractProto([{ text }], { waVersion: '2.3000.1050588369' })
    assert.equal(diagnostics.refsUnresolved, 0)
    assert.match(sdl, /repeated int32 unpackedNumbers = 1 \[packed=false\];/)
    assert.match(sdl, /repeated uint32 packedNumbers = 2 \[packed=true\];/)
    assert.match(sdl, /repeated Kind unpackedEnums = 3 \[packed=false\];/)
    for (const [type, name, tag] of [
        ['string', 'strings', 4], ['bytes', 'bytes', 5], ['Child', 'messages', 6]
    ]) {
        assert.match(sdl, new RegExp(`repeated ${type} ${name} = ${tag};`))
    }
    assert.match(sdl, /optional Kind optionalEnum = 7;/)
    assert.match(sdl, /optional int32 optionalNumber = 8;/)

    const type = protobuf.parse(sdl).root.resolveAll().lookupType('waproto.WireMetadataFixture')
    const expected = Uint8Array.from([
        0x08, 0x01, 0x08, 0x96, 0x01,
        0x12, 0x03, 0x01, 0x96, 0x01,
        0x18, 0x00, 0x18, 0x01
    ])
    const input = { unpackedNumbers: [1, 150], packedNumbers: [1, 150], unpackedEnums: [0, 1] }
    assert.deepEqual(Uint8Array.from(type.encode(input).finish()), expected)
})

test('music messages and older exported message families remain available', () => {
    const music = { musicMessage: { songUri: 'song', style: 1 } }
    const expected = Uint8Array.from([0x8a, 0x08, 0x08, 0x12, 0x04, 0x73, 0x6f, 0x6e, 0x67, 0x20, 0x01])
    assert.deepEqual(Uint8Array.from(waproto.Message.encode(music).finish()), expected)
    const decoded = waproto.Message.decode(expected)
    assert.equal(decoded.musicMessage.songUri, 'song')
    assert.equal(decoded.musicMessage.style, 1)

    const text = Uint8Array.from([0x0a, 0x02, 0x68, 0x69])
    assert.deepEqual(Uint8Array.from(waproto.Message.encode({ conversation: 'hi' }).finish()), text)
    assert.equal(waproto.Message.decode(text).conversation, 'hi')
    for (const type of [
        waproto.ConsumerApplication, waproto.LabyrinthWaCommand,
        waproto.CreateBackupInput, waproto.OrfThreadIdInput
    ]) {
        assert.equal(typeof type.encode, 'function')
        assert.equal(typeof type.decode, 'function')
    }
})

test('historical newsletter admin profile messages retain their typed field at tag 117', () => {
    const expected = Uint8Array.from([0xaa, 0x07, 0x06, 0x0a, 0x04, 0x0a, 0x02, 0x68, 0x69])
    const input = { newsletterAdminProfileMessageV2: { message: { conversation: 'hi' } } }
    assert.deepEqual(Uint8Array.from(waproto.Message.encode(input).finish()), expected)
    const decoded = waproto.Message.decode(expected)
    assert.equal(decoded.newsletterAdminProfileMessageV2.message.conversation, 'hi')
    assert.deepEqual(Uint8Array.from(waproto.Message.encode(decoded).finish()), expected)
})

test('historical encrypted message keys retain their bytes field at tag 6', () => {
    const expected = Uint8Array.from([0x32, 0x01, 0x6b])
    const input = { messageKey: Uint8Array.from([0x6b]) }
    assert.deepEqual(Uint8Array.from(waproto.EncryptMessageOutput.encode(input).finish()), expected)
    const decoded = waproto.EncryptMessageOutput.decode(expected)
    assert.deepEqual(Uint8Array.from(decoded.messageKey), input.messageKey)
    assert.deepEqual(Uint8Array.from(waproto.EncryptMessageOutput.encode(decoded).finish()), expected)
})

test('historical epoch output fields retain their bytes at tags 3, 4 and 5', () => {
    const expected = Uint8Array.from([0x1a, 0x01, 0x61, 0x22, 0x01, 0x62, 0x2a, 0x01, 0x63])
    const input = {
        epochData: Uint8Array.from([0x61]),
        wrappedRootKeyForSelf: Uint8Array.from([0x62]),
        epochSignature: Uint8Array.from([0x63])
    }
    assert.deepEqual(Uint8Array.from(waproto.Epoch0Output.encode(input).finish()), expected)
    const decoded = waproto.Epoch0Output.decode(expected)
    assert.deepEqual(Uint8Array.from(decoded.epochData), input.epochData)
    assert.deepEqual(Uint8Array.from(decoded.wrappedRootKeyForSelf), input.wrappedRootKeyForSelf)
    assert.deepEqual(Uint8Array.from(decoded.epochSignature), input.epochSignature)
    assert.deepEqual(Uint8Array.from(waproto.Epoch0Output.encode(decoded).finish()), expected)
})
