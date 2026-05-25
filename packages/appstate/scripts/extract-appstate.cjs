'use strict'

/**
 * Static AppState (Syncd) extractor — operates on an array of bundle texts.
 *
 * WhatsApp Web's "AppState" sync protocol carries small per-account mutations
 * (mute / pin / archive / contact / star / label / setting_*) as
 * `SyncdMutation` records on the wire. Each mutation has:
 *
 *   - an action wire name (the string the server keys by, e.g. "mute")
 *   - a collection (one of regular / regular_low / regular_high /
 *       critical_block / critical_unblock_low — controls sync priority)
 *   - a version (collection schema version; bumped when the index shape changes)
 *   - an index tuple — `[name, ...]` where the rest depends on scope
 *   - a value carried inside `SyncActionValue.<oneOf field>` (e.g. `muteAction`)
 *
 * The handler implementations live in 64+ modules listed by
 * `WAWebCollectionHandlerActions`. Each handler is a class extending one of
 * the *SyncdActionBase classes from `WAWebSyncdAction`. We:
 *
 *   1. Parse `WASyncdConst` to recover the Actions and CollectionName enum
 *      tables (mapping member key → wire string), plus version constants like
 *      LABEL_ASSOCIATION_SYNC_VERSION used in `getVersion()`.
 *   2. Parse `WAWebCollectionHandlerActions` to enumerate handler module names.
 *   3. For each handler module body extract:
 *        - action key  (from `getAction(){return X("WASyncdConst").Actions.K}`)
 *        - collection  (from `e.collectionName = X("WASyncdConst").CollectionName.K`)
 *        - version     (from `getVersion(){return N}` — literal or const-ref)
 *        - chatJidIndex (from `e.chatJidIndex = N`)
 *        - base class   (from the IIFE's parent arg: `(X("WAWebSyncdAction").FooBase)`)
 *        - valueField   (from `buildPendingMutation({value:<v>...})` traced to
 *                        `var <v>={<field>:...}`; falls back to scanning
 *                        `.value.<field>` accesses for handlers using the
 *                        `withValidatedContent` indirection)
 *        - indexParts   (best-effort from `e.indexParts[N]` access scan + the
 *                        scope's well-known shape)
 *
 * Parsing is regex/text-based — no acorn, no babel. The minifier's output is
 * stable enough (single-char var names, predictable IIFE shape) that this is
 * deterministic across WA Web versions. Anything we can't recognise yields
 * `null` / `unknown` rather than throwing — the diff workflow surfaces drift.
 */

const { skipExpr, skipWs } = require('./parser.cjs')

// Find the parenthesised body of `__d("<name>", ...)` in any of the bundles.
function findModuleBody(bundles, modName) {
    const needle = `__d("${modName}"`
    for (const b of bundles) {
        const idx = b.text.indexOf(needle)
        if (idx === -1) continue
        let depth = 0
        for (let i = idx; i < b.text.length; i++) {
            if (b.text[i] === '(') depth++
            else if (b.text[i] === ')') {
                if (--depth === 0) return { text: b.text.slice(idx, i + 1), bundle: b.url }
            }
        }
    }
    return null
}

// --- WASyncdConst: action key → wire name, collection key → wire name, constants ---

function parseSyncdConst(bundles) {
    const found = findModuleBody(bundles, 'WASyncdConst')
    if (!found) return { actions: {}, collections: {}, constants: {} }
    const body = found.text

    const actions = parseEnumLiteral(body, 'Actions')
    const collections = parseEnumLiteral(body, 'CollectionName')

    // Constants: scan `l.<NAME>=<expr>` for numeric or var-traced values.
    const constants = {}
    const expRe = /\bl\.([A-Z][A-Z0-9_]*)\s*=\s*([^,;]+)/g
    let m
    while ((m = expRe.exec(body))) {
        const name = m[1]
        const expr = m[2].trim()
        const num = Number(expr)
        if (Number.isFinite(num)) {
            constants[name] = num
        } else if (/^[a-zA-Z_$][\w$]*$/.test(expr)) {
            constants[name] = traceLocalLiteral(body, expr, m.index)
        }
    }
    return { actions, collections, constants }
}

// Find `<varname>=<callee>({K:V,K:V,...})` and parse the object literal.
// Used for Actions / CollectionName, which are emitted as either
// `var g=(e=n("$InternalEnum"))({Mute:"mute",...})` (first decl that also
// captures the InternalEnum factory) or `h=e({Regular:"regular",...})`
// (subsequent decl reusing the captured factory). We don't know the local
// var name (`g`/`h`) upfront — we locate `l.Actions=<var>` to discover it.
function parseEnumLiteral(body, exportKey) {
    const expRe = new RegExp(`l\\.${exportKey}\\s*=\\s*([A-Za-z_$][\\w$]*)`)
    const m = body.match(expRe)
    if (!m) return {}
    const varName = m[1]
    // Scan all `<varName>=` occurrences before the export and try to find a
    // `({...})` object literal in the expression that follows. The minifier
    // wraps the InternalEnum factory in nested parens (`(e=n("$IE"))(...)`)
    // so we can't rely on a simple regex — walk the expression manually.
    const assignRe = new RegExp(`\\b${varName}\\s*=\\s*`, 'g')
    let dm
    let last = -1
    while ((dm = assignRe.exec(body)) && dm.index < m.index) {
        const literalStart = findCallObjectArgStart(body, dm.index + dm[0].length, m.index)
        if (literalStart !== -1) last = literalStart
    }
    if (last === -1) return {}
    return parseFlatObjectStringValues(body, last)
}

// Starting from `start`, scan forward (bounded by `end`) for the first
// `({` opener — a function call whose argument is an object literal. The
// scan respects nested parens / brackets so `(e=n("$IE"))({...})` resolves
// to the outer `({`, not the inner `n(`.
function findCallObjectArgStart(text, start, end) {
    let i = start
    let dp = 0
    let db = 0
    while (i < end) {
        const c = text[i]
        if (c === '(') {
            if (dp === 0 && i + 1 < end && text[i + 1] === '{') return i + 1
            dp++
        } else if (c === ')') {
            if (dp > 0) dp--
            else return -1
        } else if (c === '{') {
            if (dp === 0) db++
        } else if (c === '}') {
            if (dp === 0 && db > 0) db--
        } else if (c === ',' || c === ';') {
            if (dp === 0 && db === 0) return -1
        }
        i++
    }
    return -1
}

// Parse a flat `{ Key:"value", Key2:"value2", ... }` literal. Stops at the
// matching `}`. Only handles string values (which is what InternalEnum emits).
function parseFlatObjectStringValues(s, start) {
    if (s[start] !== '{') return {}
    const out = {}
    let i = start + 1
    while (i < s.length && s[i] !== '}') {
        i = skipWs(s, i)
        if (s[i] === '}') break
        let key
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i]
            i++
            const st = i
            while (i < s.length && s[i] !== q) i++
            key = s.slice(st, i)
            i++
        } else {
            const st = i
            while (i < s.length && /[\w$]/.test(s[i])) i++
            key = s.slice(st, i)
        }
        i = skipWs(s, i)
        if (s[i] !== ':') {
            i = skipExpr(s, i, [',', '}'])
            if (s[i] === ',') i++
            continue
        }
        i++ // :
        i = skipWs(s, i)
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i]
            i++
            const st = i
            while (i < s.length && s[i] !== q) {
                if (s[i] === '\\') i++
                i++
            }
            out[key] = s.slice(st, i)
            i++
        } else {
            // Non-string value (e.g. nested call from Mirrored()) — skip
            i = skipExpr(s, i, [',', '}'])
        }
        i = skipWs(s, i)
        if (s[i] === ',') i++
    }
    return out
}

// Trace a single-token identifier back to its initialiser in a function body.
// Handles `var x=N` / `,x=N` / `;x=N` plus chained `var a=1,b=2,c=3`.
function traceLocalLiteral(body, ident, scanUntil) {
    const sub = scanUntil != null ? body.slice(0, scanUntil) : body
    // Match `\b<ident>\s*=\s*<value>` — value is numeric literal or quoted string.
    const re = new RegExp(`\\b${ident}\\s*=\\s*(-?[0-9.eE+]+|"[^"]*"|'[^']*')`, 'g')
    let last
    let m
    while ((m = re.exec(sub))) last = m[1]
    if (!last) return null
    if (last[0] === '"' || last[0] === "'") return last.slice(1, -1)
    const n = Number(last)
    return Number.isFinite(n) ? n : null
}

// --- WAWebProtobufSyncAction.pb: valueField → proto type + per-message enum fields ---
//
// Returns:
//   {
//     fieldToMessage: {                      // SyncActionValue.<field> → message path
//       muteAction:       'SyncActionValue.MuteAction',
//       chatLockSettings: 'ChatLockSettings',  // top-level import
//     },
//     messageEnumFields: {                   // messagePath → { field: enumPathRelativeToSyncActionValue }
//       'SyncActionValue.StatusPrivacyAction': {
//         mode:  'StatusPrivacyAction.StatusDistributionMode',
//         modes: 'StatusPrivacyAction.StatusDistributionMode'
//       },
//       ...
//     }
//   }
//
// The bundle declares each nested message/enum with a single-letter local var
// and exposes them through explicit `l.<QualifiedName> = <var>` exports at the
// end of the module body. We harvest those exports to build two var→name maps:
//
//   l.SyncActionValue$StatusPrivacyActionSpec = xe       → message xe = 'SyncActionValue.StatusPrivacyAction'
//   l.SyncActionValue$StatusPrivacyAction$StatusDistributionMode = D  → enum  D  = 'StatusPrivacyAction.StatusDistributionMode'
//
// (Enum paths are stripped of the leading `SyncActionValue.` to match the
// convention used by Phase 4g's index-slot `protoEnum` — both are paths
// relative to the SyncActionValue parent.)
//
// Then for every message, we parse its `internalSpec` to find ENUM fields
// (`<field>:[num, TYPES.ENUM, <enumVar>]` or with `FLAGS.REPEATED|TYPES.ENUM`)
// and resolve `<enumVar>` through the enum map.
function parseSyncActionValueTypes(bundles) {
    const empty = { fieldToMessage: {}, messageEnumFields: {} }
    for (const b of bundles) {
        const idx = b.text.indexOf('__d("WAWebProtobufSyncAction.pb"')
        if (idx === -1) continue
        let depth = 0
        let end = -1
        for (let i = idx; i < b.text.length; i++) {
            if (b.text[i] === '(') depth++
            else if (b.text[i] === ')') {
                if (--depth === 0) {
                    end = i + 1
                    break
                }
            }
        }
        if (end === -1) continue
        const body = b.text.slice(idx, end)

        // Harvest the trailing `l.<Name> = <var>` exports. Names ending in
        // `Spec` are message-spec vars; everything else is an enum (or other
        // top-level constant — those will be filtered out when looked up).
        const messageVarToPath = {} // var → 'SyncActionValue.<X>' (kept prefix)
        const enumVarToPath = {} // var → '<Parent>.<Enum>' (stripped prefix)
        const exportRe = /\bl\.([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\b/g
        let em
        while ((em = exportRe.exec(body))) {
            const name = em[1]
            const varName = em[2]
            if (name.endsWith('Spec')) {
                const msgPath = name.slice(0, -4).replace(/\$/g, '.')
                messageVarToPath[varName] = msgPath
            } else {
                // Enum or constant: strip `SyncActionValue$` if present so the
                // path reads as `<Parent>.<EnumName>` relative to the value root.
                const dotted = name.replace(/\$/g, '.')
                const enumPath = dotted.startsWith('SyncActionValue.')
                    ? dotted.slice('SyncActionValue.'.length)
                    : dotted
                enumVarToPath[varName] = enumPath
            }
        }

        // Locate SyncActionValueSpec var to enumerate its top-level fields.
        const syncVar = Object.entries(messageVarToPath).find(
            ([, p]) => p === 'SyncActionValue'
        )?.[0]
        if (!syncVar) continue

        // Per-message helper: parse `<var>.internalSpec = {...}` and return its
        // raw field-entry list `{ fieldName: { typeExpr, typeRef } }`.
        const parseSpec = (varName) => {
            const re = new RegExp(`\\b${varName}\\.internalSpec\\s*=\\s*\\{`)
            const sm = body.match(re)
            if (!sm) return null
            const objStart = sm.index + sm[0].length - 1
            const objEnd = skipExpr(body, objStart + 1, ['}'])
            const src = body.slice(objStart + 1, objEnd)
            const entries = {}
            const entryRe = /([A-Za-z_$][\w$]*)\s*:\s*\[\s*\d+\s*,\s*([^,\]]+)(?:\s*,\s*([^\]]+))?\]/g
            let m
            while ((m = entryRe.exec(src))) {
                entries[m[1]] = { typeExpr: m[2].trim(), typeRef: m[3]?.trim() }
            }
            return entries
        }

        // Step 1 — fieldToMessage from SyncActionValueSpec's entries.
        const fieldToMessage = {}
        const topEntries = parseSpec(syncVar) || {}
        for (const [fieldName, { typeRef }] of Object.entries(topEntries)) {
            if (!typeRef) continue
            const idMatch = typeRef.match(/^[A-Za-z_$][\w$]*$/)
            if (idMatch && messageVarToPath[typeRef]) {
                fieldToMessage[fieldName] = messageVarToPath[typeRef]
                continue
            }
            // Imported spec: `o("WAWebProtobufsChatLockSettings.pb").ChatLockSettingsSpec`
            const importMatch = typeRef.match(/\)\.([A-Za-z_$][\w$]*)Spec\s*$/)
            if (importMatch) fieldToMessage[fieldName] = importMatch[1]
        }

        // Step 2 — messageEnumFields: for every message var, walk its
        // internalSpec entries and collect ENUM fields. Recurses through
        // nested MESSAGE fields so deep enums surface with dotted paths
        // (e.g. CallLogAction has no top-level enum, but its nested
        // `callLogRecord` field carries `callType`/`silenceReason`/`callResult`
        // → `{ "callLogRecord.callType": "CallLogRecord.CallType", ... }`).
        // Imported / unknown message types are not followed; nested-spec lookup
        // is keyed by the local var name so cross-module imports stop at the
        // boundary.
        const pathToVar = Object.fromEntries(
            Object.entries(messageVarToPath).map(([v, p]) => [p, v])
        )
        const enumFieldsCache = {}
        const collect = (varName, depth, visiting) => {
            if (varName in enumFieldsCache) return enumFieldsCache[varName]
            if (depth > 4) return {}
            if (visiting.has(varName)) return {} // cycle guard
            visiting.add(varName)
            const entries = parseSpec(varName)
            const out = {}
            if (entries) {
                for (const [fieldName, { typeExpr, typeRef }] of Object.entries(entries)) {
                    if (!typeRef) continue
                    const idMatch = typeRef.match(/^[A-Za-z_$][\w$]*$/)
                    if (!idMatch) continue
                    if (/\bTYPES\.ENUM\b/.test(typeExpr)) {
                        if (enumVarToPath[typeRef]) out[fieldName] = enumVarToPath[typeRef]
                    } else if (/\bTYPES\.MESSAGE\b/.test(typeExpr)) {
                        const nested = collect(typeRef, depth + 1, visiting)
                        for (const [k, v] of Object.entries(nested)) {
                            out[`${fieldName}.${k}`] = v
                        }
                    }
                }
            }
            visiting.delete(varName)
            enumFieldsCache[varName] = out
            return out
        }

        const messageEnumFields = {}
        for (const [varName, msgPath] of Object.entries(messageVarToPath)) {
            const fields = collect(varName, 0, new Set())
            if (Object.keys(fields).length > 0) messageEnumFields[msgPath] = fields
        }

        return { fieldToMessage, messageEnumFields }
    }
    return empty
}

// --- WAWebCollectionHandlerActions: list of handler module names ---

function parseHandlerList(bundles) {
    const found = findModuleBody(bundles, 'WAWebCollectionHandlerActions')
    if (!found) return []
    const body = found.text
    // Deps array gives us the handler module names. The body also lists them
    // in registration order via `r("X")` calls; either source works.
    const depsMatch = body.match(/^__d\("WAWebCollectionHandlerActions",\s*\[([^\]]*)\]/)
    if (!depsMatch) return []
    const names = []
    const re = /"([^"]+)"/g
    let m
    while ((m = re.exec(depsMatch[1]))) names.push(m[1])
    // Drop the noise — anything that isn't a *Sync module is a transitive dep.
    return names.filter((n) => /Sync(?:Action)?$/i.test(n) || /Sync$/.test(n))
}

// --- Per-handler extraction ---

// Locate the IIFE that defines the SyncdAction subclass. Returns the inner
// function body (the `function(t){...}` source) plus the base class name.
function findHandlerClassBody(body) {
    // Match `}<close-parens>(<dep>("WAWebSyncdAction").<XBase>)` at the end of
    // the IIFE. The raw bundle wraps factories as `(function(){...})()` so we
    // see `})(arg)`; the deobfuscated source has `}(arg)`. Allow both.
    const re = /\}\s*\)?\s*\(\s*[A-Za-z_$][\w$]*\("WAWebSyncdAction"\)\.([A-Za-z_$][\w$]*)Base\s*\)/g
    let m
    let last = null
    while ((m = re.exec(body))) last = m
    if (!last) return null
    // Walk back to find the matching `(function(...){` that opens the IIFE.
    // The `}` at last.index closes the function body; we need its opening `{`.
    let i = last.index
    let depth = 1
    while (--i >= 0) {
        if (body[i] === '}') depth++
        else if (body[i] === '{') {
            if (--depth === 0) break
        }
    }
    if (i < 0) return null
    return {
        funcBody: body.slice(i + 1, last.index),
        baseClass: last[1] + 'Base'
    }
}

const BASE_SCOPE = {
    AccountSyncdActionBase: 'account',
    ChatSyncdActionBase: 'chat',
    ChatOrContactSyncdActionBase: 'chatOrContact',
    MessageSyncdActionBase: 'message',
    ChatMessageRangeSyncdActionBase: 'chatMessageRange'
}

function extractHandler(moduleName, bundles, syncdConst, valueTypes, messageEnumFields) {
    const found = findModuleBody(bundles, moduleName)
    if (!found) return { module: moduleName, error: 'module-not-found' }
    const body = found.text

    const klass = findHandlerClassBody(body)
    if (!klass) return { module: moduleName, error: 'no-syncd-class-found' }

    const fb = klass.funcBody
    const scope = BASE_SCOPE[klass.baseClass] ?? 'unknown'

    // `e.<key> = <value>` assignments inside the constructor.
    const constructorAssigns = scanConstructorAssigns(fb)
    const collectionKey = matchSyncdConstRef(constructorAssigns.collectionName, 'CollectionName')
    const chatJidIndex = constructorAssigns.chatJidIndex

    // Prototype methods: `i.getAction = function(){ return X("WASyncdConst").Actions.<KEY> }`
    const actionKey = extractActionKey(fb)
    const versionRaw = extractVersion(fb)
    const version = resolveVersion(versionRaw, syncdConst.constants)

    const valueField = extractValueField(fb)
    const { slots: indexSlots, aliases } = extractIndexInfo(fb)
    const { slotNames, slotProtoEnums } = inferSlotNames(fb, aliases)
    const indexParts = buildIndexParts({
        scope,
        chatJidIndex,
        slots: indexSlots,
        actionName: syncdConst.actions[actionKey],
        slotNames,
        slotProtoEnums
    })

    return {
        module: moduleName,
        actionKey,
        name: syncdConst.actions[actionKey] ?? null,
        collectionKey,
        collection: syncdConst.collections[collectionKey] ?? null,
        version,
        scope,
        baseClass: klass.baseClass,
        valueField,
        valueProtoType: (valueField && valueTypes[valueField]) || null,
        valueEnumFields:
            valueField && valueTypes[valueField] && messageEnumFields[valueTypes[valueField]]
                ? messageEnumFields[valueTypes[valueField]]
                : null,
        chatJidIndex: chatJidIndex ?? null,
        indexParts
    }
}

// Scan `<thisVar>.X = Y` inside the constructor block. The constructor is the
// inner `function (...) {` whose body contains `babelHelpers.assertThisInitialized`.
// The `this` capture variable name varies between handlers (most use `e`, some
// use `t`) so we discover it from the `<id>=<base>.call.apply(<base>,...)||this`
// pattern at the start of the return statement.
function scanConstructorAssigns(fb) {
    const marker = fb.indexOf('babelHelpers.assertThisInitialized')
    if (marker === -1) return {}
    // Walk back to the `{` that starts the function body containing the marker.
    let i = marker
    let depth = 0
    while (--i >= 0) {
        if (fb[i] === '}') depth++
        else if (fb[i] === '{') {
            if (depth === 0) break
            depth--
        }
    }
    if (i < 0) return {}
    const ctorBody = fb.slice(i, marker + 100)
    // Detect the `this` capture variable: `<id>=<base>.call.apply(<base>,...)||this`.
    const captureMatch = ctorBody.match(/\b([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\.call\.apply\(/)
    const thisVar = captureMatch ? captureMatch[1] : 'e'
    const out = {}
    const re = new RegExp(
        `\\b${thisVar}\\.([A-Za-z_$][\\w$]*)\\s*=\\s*([^,;]+?)(?=,\\s*(?:${thisVar}\\.|babelHelpers\\.assertThisInitialized|return|\\}))`,
        'g'
    )
    let m
    while ((m = re.exec(ctorBody))) {
        out[m[1]] = m[2].trim()
    }
    // chatJidIndex must be numeric
    if ('chatJidIndex' in out) {
        const n = Number(out.chatJidIndex)
        out.chatJidIndex = Number.isFinite(n) ? n : null
    }
    return out
}

// Match `<dep>("WASyncdConst").<table>.<KEY>` where dep is any single-char loader.
function matchSyncdConstRef(expr, table) {
    if (!expr) return null
    const m = expr.match(new RegExp(`\\("WASyncdConst"\\)\\.${table}\\.([A-Za-z_$][\\w$]*)`))
    return m ? m[1] : null
}

function extractActionKey(fb) {
    // `i.getAction = function(){return <dep>("WASyncdConst").Actions.<KEY>}`
    const m = fb.match(
        /\bgetAction\s*=\s*function\s*\([^)]*\)\s*\{\s*return\s+[A-Za-z_$][\w$]*\("WASyncdConst"\)\.Actions\.([A-Za-z_$][\w$]*)/
    )
    return m ? m[1] : null
}

function extractVersion(fb) {
    // `i.getVersion = function(){return <expr>}`
    const m = fb.match(/\bgetVersion\s*=\s*function\s*\([^)]*\)\s*\{\s*return\s+([^;}]+)/)
    return m ? m[1].trim() : null
}

function resolveVersion(raw, constants) {
    if (raw == null) return null
    const n = Number(raw)
    if (Number.isFinite(n)) return n
    // Try `<dep>("WASyncdConst").<CONST_NAME>`
    const m = raw.match(/\("WASyncdConst"\)\.([A-Z][A-Z0-9_]*)/)
    if (m && constants[m[1]] != null) return constants[m[1]]
    return null
}

// Find the value field name in the SyncActionValue oneOf carried by this
// handler. Strategy:
//   1. Find a `buildPendingMutation({...value:<token>...})` call.
//   2. If <token> is a literal `{foo:bar}`, return `foo`.
//   3. If <token> is an identifier, trace `var <token>={<key>:...}` and return <key>.
//   4. Fallback: scan for `<something>.value.<key>` accesses.
function extractValueField(fb) {
    const callRe = /\bbuildPendingMutation\s*\(\s*\{/g
    let cm
    while ((cm = callRe.exec(fb))) {
        const objStart = cm.index + cm[0].length - 1 // points at the `{`
        const objEnd = skipExpr(fb, objStart + 1, ['}'])
        const objSrc = fb.slice(objStart + 1, objEnd)
        const vm = objSrc.match(/(?:^|[,{\s])value\s*:\s*([^,}]+)/)
        if (!vm) continue
        const tok = vm[1].trim()
        // Inline object literal `{foo: ...}`
        if (tok.startsWith('{')) {
            const km = tok.match(/^\{\s*([A-Za-z_$][\w$]*)\s*:/)
            if (km) return km[1]
        }
        // Identifier reference — trace back in the surrounding function body.
        const idMatch = tok.match(/^([A-Za-z_$][\w$]*)$/)
        if (idMatch) {
            const traced = traceObjectLiteralFirstKey(fb, idMatch[1], cm.index)
            if (traced) return traced
        }
    }
    // Fallback A: direct `.value.<key>` chain.
    const directRe = /\.value\.([A-Za-z_$][\w$]*)/g
    let dm
    while ((dm = directRe.exec(fb))) {
        const key = dm[1]
        if (!isGenericMemberName(key)) return key
    }
    // Fallback B: handlers that destructure `var <alias>=<X>.value` then access
    // `<alias>.<field>` later (e.g. ArchiveSettingSync, LocaleSettingSync,
    // DetectedOutcomesStatusSync). Scan member accesses AFTER the binding
    // position to avoid catching unrelated `.map(...)` / `.push(...)` calls
    // from earlier in the body (the constructor's `r=new Array(n);r.map(...)`
    // pattern would otherwise pollute when `r` later gets rebound to `.value`).
    const aliasRe = /\b([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\.value\b/g
    let am
    while ((am = aliasRe.exec(fb))) {
        const alias = am[1]
        const memberRe = new RegExp(`\\b${alias}\\.([A-Za-z_$][\\w$]*)`, 'g')
        memberRe.lastIndex = am.index + am[0].length
        let mm
        while ((mm = memberRe.exec(fb))) {
            const key = mm[1]
            if (!isGenericMemberName(key)) return key
        }
    }
    return null
}

// SyncActionValue oneOf fields all conform to camelCase suffixed by Action /
// Setting / similar payload words. Filter out common false-positive members:
// JS built-ins (length, toString, prototype helpers), Array/iteration methods
// the minifier sprinkles around (`.map`, `.filter`, `.push` on rebound vars),
// and Syncd plumbing fields that aren't part of the SyncActionValue oneOf.
function isGenericMemberName(key) {
    return (
        // Object/Function built-ins
        key === 'value' ||
        key === 'length' ||
        key === 'toString' ||
        key === 'prototype' ||
        key === 'apply' ||
        key === 'call' ||
        key === 'bind' ||
        // Iteration / array methods — short-lived var names get reused for
        // arrays before being rebound to `.value`, so these can leak through.
        key === 'map' ||
        key === 'filter' ||
        key === 'forEach' ||
        key === 'push' ||
        key === 'pop' ||
        key === 'shift' ||
        key === 'unshift' ||
        key === 'slice' ||
        key === 'concat' ||
        key === 'find' ||
        key === 'some' ||
        key === 'every' ||
        key === 'reduce' ||
        key === 'includes' ||
        key === 'indexOf' ||
        key === 'join' ||
        // Syncd plumbing
        key === 'operation' ||
        key === 'timestamp'
    )
}

// Find `var <ident> = { <key>: ... }` (closest preceding declaration to scanFrom).
function traceObjectLiteralFirstKey(fb, ident, scanFrom) {
    const sub = fb.slice(0, scanFrom)
    const re = new RegExp(`(?:\\bvar\\s+|[,;])${ident}\\s*=\\s*\\{`, 'g')
    let last = -1
    let dm
    while ((dm = re.exec(sub))) last = dm.index + dm[0].length - 1
    if (last === -1) return null
    const km = sub.slice(last).match(/^\{\s*([A-Za-z_$][\w$]*)\s*:/)
    return km ? km[1] : null
}

// Find the highest N in `<var>.indexParts[N]` or `<alias>[N]` where alias was
// previously bound to `<var>.indexParts`. Returns `{slots: max+1 or 0, aliases:
// [...]}` — slot count plus the list of indexParts alias variable names (used
// by inferSlotNames to attribute downstream reads back to a slot).
function extractIndexInfo(fb) {
    let maxIdx = -1
    const aliases = new Set()

    // Direct `e.indexParts[N]` access (rare — most modules alias first).
    const directRe = /\.indexParts\s*\[\s*(\d+)\s*\]/g
    let m
    while ((m = directRe.exec(fb))) maxIdx = Math.max(maxIdx, Number(m[1]))

    // Alias scan: find `<id>=<something>.indexParts`, then count `<id>[N]`.
    const aliasRe = /\b([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\.indexParts\b/g
    let am
    while ((am = aliasRe.exec(fb))) {
        const alias = am[1]
        aliases.add(alias)
        const accessRe = new RegExp(`\\b${alias}\\s*\\[\\s*(\\d+)\\s*\\]`, 'g')
        let acc
        while ((acc = accessRe.exec(fb))) maxIdx = Math.max(maxIdx, Number(acc[1]))
    }
    return { slots: maxIdx >= 0 ? maxIdx + 1 : 0, aliases: [...aliases] }
}

// Best-effort slot-name inference. Several sources, applied in order:
//
//   1. **Discover index aliases** — variables that hold the wire-level index
//      tuple. Two sources:
//        a. `<var>=<x>.indexParts` (handed in by extractIndexInfo)
//        b. `<var>=JSON.parse(<x>.index)` (resolveConflicts pattern in
//           ChatMessageRange-scope handlers like ClearChat/DeleteChat)
//
//   2. **Bind locals to slot indices** by scanning, for each alias plus the
//      special "no alias" case (`<x>.indexParts[N]` direct):
//        - direct: `<localvar>=<src>[N]`
//        - comparison: `<localvar>="X"===<src>[N]` (or reversed). The
//          comparison's truth value is what gets stored — the bool result
//          inherits the slot's identity for inference purposes.
//
//   3. **Transitive expansion** — propagate slot ownership forward through
//      conversions handlers commonly do before using the slot value:
//        - call chains with the oldvar in any arg position
//          (`<newvar>=createUserLidOrThrow(<oldvar>)`,
//          `<newvar>=resolveNoteId(_, L, <oldvar>)`)
//        - property access (`<newvar>=<oldvar>.userJid`)
//      Skips `.call.apply` / `inheritsLoose` boilerplate to avoid picking
//      up the constructor's `this` capture as a slot alias.
//
//   4. **Mine names** from multiple contexts, first-write-wins per slot:
//        a. `<key>:<localvar>(?:\.\w+)?` in object literals
//        b. `<key>:"X"===<alias>[N]` directly in object literals (skips the
//           need for a localvar binding for inline bool coercions)
//        c. `buildPendingMutation({...indexArgs:[<expr>...]...})` —
//           property-chain trailing segment (`[t.sticker.filehash]`)
//        d. `return [<expr>, ...]` from getIndexParts-style methods —
//           if expr is a bare ident, recursively trace its declaration
//           (`return [n, r]` where `r=e.key.id` → slot 2 = `id`)
//
// Names ending in Id/Jid/Key/Name are upgraded when found — they're more
// idiomatic wire-key tags than generic ones like `id`.
function inferSlotNames(fb, indexPartsAliases) {
    const aliases = new Set(indexPartsAliases)

    // Phase 1b — also treat `<var>=JSON.parse(<x>.index)` as an index alias.
    // Used by ChatMessageRange-scope resolveConflicts blocks to reparse the
    // wire-level JSON-stringified index and read flag slots out of it.
    const parseRe = /\b([A-Za-z_$][\w$]*)\s*=\s*JSON\.parse\([A-Za-z_$][\w$.]*\.index\)/g
    let pm
    while ((pm = parseRe.exec(fb))) aliases.add(pm[1])

    // Phase 2 — build aliasToSlot mapping. Each entry records the slot index
    // PLUS the position of the binding so Phase 4d can prefer nearby uses
    // (avoids cross-scope false positives when the minifier reuses a short
    // var name like `r` in unrelated functions).
    const aliasToSlot = {} // { localvar: { slot, boundAt } }
    const bind = (name, slot, boundAt) => {
        if (!(name in aliasToSlot)) aliasToSlot[name] = { slot, boundAt }
    }

    // Direct `<localvar>=<var>.indexParts[<N>]` (no aliasing step).
    const directRe = /\b([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\.indexParts\s*\[\s*(\d+)\s*\]/g
    let dm
    while ((dm = directRe.exec(fb))) bind(dm[1], Number(dm[2]), dm.index)

    // Aliased: `<localvar>=<alias>[<N>]`.
    for (const alias of aliases) {
        const re = new RegExp(`\\b([A-Za-z_$][\\w$]*)\\s*=\\s*${alias}\\s*\\[\\s*(\\d+)\\s*\\]`, 'g')
        let m
        while ((m = re.exec(fb))) bind(m[1], Number(m[2]), m.index)
    }

    // Comparison binding: `<localvar>="X"===<alias>[<N>]` / `<alias>[N]==="X"`.
    // The boolean result of the comparison still semantically *belongs* to
    // slot N — handlers immediately funnel it into an object key right next.
    for (const alias of aliases) {
        const cmpRe = new RegExp(
            `\\b([A-Za-z_$][\\w$]*)\\s*=\\s*(?:"[^"]*"\\s*===\\s*${alias}\\s*\\[\\s*(\\d+)\\s*\\]|${alias}\\s*\\[\\s*(\\d+)\\s*\\]\\s*===\\s*"[^"]*")`,
            'g'
        )
        let m
        while ((m = cmpRe.exec(fb))) bind(m[1], Number(m[2] ?? m[3]), m.index)
    }

    // Phase 3 — transitive expansion. Handlers commonly coerce the raw slot
    // value through helper calls (`createWid`, `createUserLidOrThrow`,
    // `interpretAndValidateJid`, `asBotWidOrThrow`) and/or chained property
    // access (`f=_.userJid`) before using it in an object literal.
    // Propagate slot ownership across both forms.
    //
    // The risk: property access over-extends through result-wrapper objects
    // (`d=resolveX(c); d.orphanModel` — orphanModel isn't c's slot name).
    // Two safety nets: (a) higher-priority Phase 4a-4c sources usually set
    // the slot name first when it's a result wrapper; (b) Phase 4d's echo
    // filter rejects mirror-key wrappers; (c) Phase 4e's proximity window
    // limits how far a stale propagation can pollute.
    // Restrict transitive scans to text AFTER the source var's binding
    // position. This avoids catching the babel-generated constructor
    // prologue (`for(var e,n=arguments.length,r=new Array(n),...)`) — its
    // `n` shadows the inner-function slot `n` we actually care about, and
    // without the position guard `r=new Array(n)` would falsely propagate
    // slot ownership to every var in the constructor.
    let grew = true
    while (grew) {
        grew = false
        for (const [oldvar, entry] of Object.entries(aliasToSlot)) {
            const sub = fb.slice(entry.boundAt)
            const off = entry.boundAt
            // Property access: `<newvar>=<oldvar>.<member>`
            const propRe = new RegExp(
                `\\b([A-Za-z_$][\\w$]*)\\s*=\\s*${oldvar}\\.[A-Za-z_$][\\w$]*`,
                'g'
            )
            let pm
            while ((pm = propRe.exec(sub))) {
                if (!(pm[1] in aliasToSlot)) {
                    aliasToSlot[pm[1]] = { slot: entry.slot, boundAt: off + pm.index }
                    grew = true
                }
            }
            // Call chain with oldvar anywhere in args.
            const callRe = new RegExp(
                `\\b([A-Za-z_$][\\w$]*)\\s*=\\s*(?:yield\\s+)?[^;,]*?\\(\\s*[^)]*?\\b${oldvar}\\b(?:\\.[\\w$]+)?[^)]*\\)`,
                'g'
            )
            let cm
            while ((cm = callRe.exec(sub))) {
                if (cm[0].includes('.call.apply')) continue
                if (cm[0].includes('inheritsLoose')) continue
                if (!(cm[1] in aliasToSlot)) {
                    aliasToSlot[cm[1]] = { slot: entry.slot, boundAt: off + cm.index }
                    grew = true
                }
            }
        }
    }

    // Phase 4 — mine slot names. Applied in confidence order, higher first;
    // each source only fills slots that haven't been named yet. Source 4g
    // (proto enum cast) additionally populates `slotProtoEnums` so callers
    // can upgrade the slot's type and expose the enum's proto path.
    const slotNames = {}
    const slotProtoEnums = {}
    const reserved = new Set([
        'return', 'case', 'default', 'if', 'else', 'this', 'var', 'let', 'const',
        'function', 'new', 'true', 'false', 'null', 'undefined', 'void',
        'operation', 'value', 'timestamp', 'index', 'indexParts', 'indexArgs',
        // Syncd plumbing fields used in orphan-tracking / error wrappers —
        // never the slot's semantic name even though they sometimes precede
        // a slot-derived var (e.g. `orphanModel:{modelId:u, modelType:...}`).
        'binarySyncAction', 'binarySyncData', 'actionState', 'orphanModel',
        'modelId', 'modelType', 'syncActionMessage', 'syncActionMessageRange'
    ])

    // 4a (highest confidence) — `return [<expr>, ...]` from getIndexParts-style
    // methods. The author authored these in one place; tracing back from a
    // bare ident lands on its declaration which usually exposes a property
    // chain (e.g. `r=e.key.id` → slot 2 = `id`).
    const retRe = /\breturn\s*\[([^\]]+)\]/g
    let rm
    while ((rm = retRe.exec(fb))) {
        const exprs = splitTopLevelCommas(rm[1])
        exprs.forEach((expr, i) => {
            const slot = i + 1
            if (slot in slotNames) return
            const name = extractTrailingName(expr.trim(), fb, rm.index)
            if (name && !reserved.has(name)) slotNames[slot] = name
        })
    }

    // 4b — generate-method `buildPendingMutation({...indexArgs:[<expr>...]...})`.
    const callRe = /\bbuildPendingMutation\s*\(\s*\{/g
    let cm
    while ((cm = callRe.exec(fb))) {
        const objStart = cm.index + cm[0].length - 1
        const objEnd = skipExpr(fb, objStart + 1, ['}'])
        const objSrc = fb.slice(objStart + 1, objEnd)
        const argsMatch = objSrc.match(/(?:^|[,{\s])indexArgs\s*:\s*\[([^\]]*)\]/)
        if (!argsMatch) continue
        const exprs = splitTopLevelCommas(argsMatch[1])
        exprs.forEach((expr, i) => {
            const slot = i + 1
            if (slot in slotNames) return
            const m = expr.trim().match(/\.([A-Za-z_$][\w$]*)\s*$/)
            if (m && !reserved.has(m[1])) slotNames[slot] = m[1]
        })
    }

    // 4c — `<key>:"X"===<alias>[N]` (inline bool coercion directly in object
    // literal). Very precise — the comparison and the property assignment
    // are co-located in the source.
    for (const alias of aliases) {
        const re = new RegExp(
            `([A-Za-z_$][\\w$]*)\\s*:\\s*(?:"[^"]*"\\s*===\\s*${alias}\\s*\\[\\s*(\\d+)\\s*\\]|${alias}\\s*\\[\\s*(\\d+)\\s*\\]\\s*===\\s*"[^"]*")`,
            'g'
        )
        let m
        while ((m = re.exec(fb))) {
            const candidate = m[1]
            if (reserved.has(candidate)) continue
            const slot = Number(m[2] ?? m[3])
            if (!(slot in slotNames)) slotNames[slot] = candidate
        }
    }

    // 4d, 4e, 4f, 4g — scope-bounded scans of object literals near the binding.
    // The minifier reuses 1–2 character var names across unrelated functions
    // (`r`, `n`, `s`, `t`); a match in a sibling function can falsely name
    // an unrelated slot. Two filters keep these honest:
    //   - **scopeWindow** rejects any match that lies *after* the binding's
    //     enclosing function ends, by tracking brace depth from the binding
    //     forward and stopping at the first depth < 0.
    //   - PROXIMITY_WINDOW is a generous hard upper bound used as a final
    //     fallback (cheap when scopeWindow misses, e.g. unbalanced source).
    const PROXIMITY_WINDOW = 4000
    const scopeWindow = (boundAt) => {
        let depth = 0
        let i = boundAt
        let inStr = null
        for (; i < fb.length && i - boundAt < PROXIMITY_WINDOW; i++) {
            const c = fb[i]
            if (inStr) {
                if (c === '\\') i++
                else if (c === inStr) inStr = null
                continue
            }
            if (c === '"' || c === "'" || c === '`') inStr = c
            else if (c === '{') depth++
            else if (c === '}') {
                if (depth === 0) break
                depth--
            }
        }
        return fb.slice(boundAt, i)
    }

    // 4d — `<key>:<localvar>.<member>` where key isn't an echo of member.
    // Catches the conversion-chain endpoint pattern `id:_.userJid`
    // (OutContact) while rejecting wrapper-property echoes like
    // `orphanModel:d.orphanModel` (where d is a result wrapper).
    for (const [localvar, { slot, boundAt }] of Object.entries(aliasToSlot)) {
        if (slot in slotNames) continue
        const sub = scopeWindow(boundAt)
        const re = new RegExp(
            `([A-Za-z_$][\\w$]*)\\s*:\\s*${localvar}\\.([A-Za-z_$][\\w$]*)\\b(?!\\.)`,
            'g'
        )
        let m
        while ((m = re.exec(sub))) {
            const key = m[1]
            const member = m[2]
            if (key === member) continue
            if (reserved.has(key)) continue
            if (!(slot in slotNames)) slotNames[slot] = key
            if (/Id$|Jid$|Key$|Name$/.test(key)) {
                slotNames[slot] = key
                break
            }
        }
    }

    // 4e — `<key>:<localvar>` (bare, no property chain).
    for (const [localvar, { slot, boundAt }] of Object.entries(aliasToSlot)) {
        if (slot in slotNames) continue
        const sub = scopeWindow(boundAt)
        const re = new RegExp(
            `([A-Za-z_$][\\w$]*)\\s*:\\s*${localvar}\\b(?!\\s*[.=+\\-*/%<>&|^?])`,
            'g'
        )
        let m
        while ((m = re.exec(sub))) {
            const candidate = m[1]
            if (reserved.has(candidate)) continue
            if (!(slot in slotNames)) slotNames[slot] = candidate
            if (/Id$|Jid$|Key$|Name$/.test(candidate)) {
                slotNames[slot] = candidate
                break
            }
        }
    }

    // 4f — string concatenation tags like `"campaign="+n` in log messages
    // or template strings. The literal prefix before `=` names the slot
    // (e.g. BusinessBroadcastInsights' `"campaign="+n` → slot 1 = `campaign`).
    for (const [localvar, { slot, boundAt }] of Object.entries(aliasToSlot)) {
        if (slot in slotNames) continue
        const sub = scopeWindow(boundAt)
        const re = new RegExp(`"([A-Za-z_][\\w]*)="\\s*\\+\\s*${localvar}\\b`, 'g')
        let m
        while ((m = re.exec(sub))) {
            const candidate = m[1]
            if (reserved.has(candidate)) continue
            if (!(slot in slotNames)) slotNames[slot] = candidate
        }
    }

    // 4g — protobuf enum cast `<NestedType>.cast(Number(<localvar>))`.
    // Settings-style mutations encode an enum value as a stringified integer
    // in the index slot, then cast it back via
    // `SyncActionValue$<Parent>$<Enum>.cast(Number(<slot>))`. The trailing
    // `<Enum>` segment names the slot (camelCased) and the full
    // `<Parent>.<Enum>` path goes into `slotProtoEnums` so apply.cjs can
    // upgrade the slot type from `string` to `enum` and emit a `protoEnum`
    // reference for consumers that want to look up enum values via wa-proto.
    for (const [localvar, { slot, boundAt }] of Object.entries(aliasToSlot)) {
        if (slot in slotNames) continue
        const sub = scopeWindow(boundAt)
        const re = new RegExp(
            `\\.([A-Za-z_$][\\w$]*)\\.cast\\(\\s*Number\\(\\s*${localvar}\\s*\\)\\s*\\)`,
            'g'
        )
        let m
        while ((m = re.exec(sub))) {
            const typeName = m[1]
            const parts = typeName.split('$').filter(Boolean)
            if (parts.length < 2) continue
            // Drop the SyncActionValue prefix; everything else is the
            // dotted path inside the SyncActionValue message (e.g.
            // SyncActionValue$SettingsSyncAction$SettingPlatform →
            // SettingsSyncAction.SettingPlatform).
            const protoPath =
                parts[0] === 'SyncActionValue'
                    ? parts.slice(1).join('.')
                    : parts.join('.')
            const tail = parts[parts.length - 1]
            const candidate = tail.charAt(0).toLowerCase() + tail.slice(1)
            if (reserved.has(candidate)) continue
            if (!(slot in slotNames)) {
                slotNames[slot] = candidate
                slotProtoEnums[slot] = protoPath
            }
        }
    }

    // 4h — function-name typing. When the slot value is passed as the first
    // argument to a method call like `o("...").upsertCampaignStorage(<v>, ...)`
    // or `o("...").validateChatJid(<v>)`, the method's CamelCase TYPE token
    // (everything after the leading verb, suffixes like `Storage`/`Job`/
    // `Table` stripped) names the slot. We only consider 2–3-token method
    // names — longer compounds (`addOrEditCustomerData`) are too ambiguous
    // to decompose reliably.
    const VERB_SUFFIXES = new Set([
        'Storage', 'Job', 'Table', 'Api', 'Service', 'Util', 'Utils',
        'Action', 'Bridge', 'Collection', 'Index', 'Database', 'Helper',
        'Helpers', 'Worker', 'Processor', 'Builder', 'Manager'
    ])
    const typeFromMethodName = (fnName) => {
        const parts = fnName.split(/(?=[A-Z])/)
        if (parts.length < 2) return null
        while (parts.length > 0 && VERB_SUFFIXES.has(parts[parts.length - 1])) parts.pop()
        if (parts.length < 2 || parts.length > 3) return null
        const type = parts.slice(1).join('')
        if (!type) return null
        return type.charAt(0).toLowerCase() + type.slice(1)
    }
    for (const [localvar, { slot, boundAt }] of Object.entries(aliasToSlot)) {
        if (slot in slotNames) continue
        const sub = scopeWindow(boundAt)
        const re = new RegExp(`\\.([A-Za-z_$][\\w$]*)\\(\\s*${localvar}\\b`, 'g')
        let m
        while ((m = re.exec(sub))) {
            const candidate = typeFromMethodName(m[1])
            if (!candidate || reserved.has(candidate)) continue
            if (!(slot in slotNames)) slotNames[slot] = candidate
            if (/Id$|Jid$|Key$|Name$/.test(candidate)) {
                slotNames[slot] = candidate
                break
            }
        }
    }

    return { slotNames, slotProtoEnums }
}

// Extract the "trailing identifier" of an expression. For a property chain
// like `e.key.id` returns `id`. For a bare identifier, traces its declaration
// (`var <id>=<rhs>`) in the surrounding body and recurses on the RHS.
function extractTrailingName(expr, fb, scanFrom) {
    const propM = expr.match(/\.([A-Za-z_$][\w$]*)\s*$/)
    if (propM) return propM[1]
    const idM = expr.match(/^([A-Za-z_$][\w$]*)$/)
    if (idM) {
        const ident = idM[1]
        const sub = fb.slice(0, scanFrom)
        const declRe = new RegExp(`\\b${ident}\\s*=\\s*([^;,]+)`, 'g')
        let last = null
        let m
        while ((m = declRe.exec(sub))) last = m[1]
        if (last && last.trim() !== ident) {
            return extractTrailingName(last.trim(), fb, scanFrom)
        }
    }
    return null
}

// Split a comma-separated list while respecting paren / bracket / brace depth.
// Used to break the `indexArgs:[a, foo(b,c), d.e]` array into 3 expressions.
function splitTopLevelCommas(s) {
    const out = []
    let depth = 0
    let start = 0
    for (let i = 0; i < s.length; i++) {
        const c = s[i]
        if (c === '(' || c === '[' || c === '{') depth++
        else if (c === ')' || c === ']' || c === '}') depth--
        else if (c === ',' && depth === 0) {
            out.push(s.slice(start, i))
            start = i + 1
        }
    }
    if (start < s.length) out.push(s.slice(start))
    return out.map((x) => x.trim()).filter(Boolean)
}

// Build the index part list as a discriminated-union tuple. Position 0 is
// always the action wire name (a literal). Subsequent positions are tagged
// from scope conventions:
//   - chat / chatOrContact / chatMessageRange: slot at chatJidIndex = chatJid
//   - message: slots 1..4 are remote / id / fromMe / participant
//   - account: opaque ids (e.g. agentId, labelId) — typed `string`
// Literals carry `value` only; non-literals carry `name` only. This lets
// TypeScript narrow `part.value` vs `part.name` from the `type` discriminant
// without optional fields, and lets consumers derive a runtime value tuple
// (`WaAppstateIndexValueOf`) and a named args object (`WaAppstateIndexArgs`).
//
// Types are the wire-level shape:
//   - 'literal'    fixed string (the action wire name)
//   - 'jid'        WhatsApp JID string (`<user>@<domain>`, legacy-encoded)
//   - 'boolString' '0' or '1' — WA's mutation-index bool encoding
//   - 'jidOrZero'  participant slot in message scope — JID, or literal '0'
//                  when fromMe is true or participant is null
//   - 'enum'       stringified integer that the client casts to a protobuf
//                  enum via `<Type>.cast(Number(<slot>))`. Carries a
//                  `protoEnum` field pointing at the nested message path
//                  inside SyncActionValue (e.g. `SettingsSyncAction.SettingKey`)
//                  so consumers can look up the enum's values in wa-proto.
//   - 'string'     opaque identifier (msg id, label id, agent id, etc.)
function buildIndexParts({ scope, chatJidIndex, slots, actionName, slotNames, slotProtoEnums }) {
    if (slots === 0 && scope !== 'message') {
        // No index access in body; conservative default by scope.
        if (scope === 'account') slots = 1
        else if (scope === 'chat' || scope === 'chatOrContact' || scope === 'chatMessageRange') slots = 2
    }
    if (scope === 'message' && slots < 5) slots = 5
    const parts = []
    parts.push({ type: 'literal', value: actionName ?? '' })
    const emitSlot = (s, fallback) => {
        const name = slotNames?.[s] ?? fallback
        const protoEnum = slotProtoEnums?.[s]
        if (protoEnum) return { type: 'enum', name, protoEnum }
        return { type: 'string', name }
    }
    if (scope === 'message') {
        // Order matches `buildMessageKey(remote, id, fromMe, participant)`.
        parts.push({ type: 'jid', name: 'remote' })
        parts.push({ type: 'string', name: 'id' })
        parts.push({ type: 'boolString', name: 'fromMe' })
        parts.push({ type: 'jidOrZero', name: 'participant' })
        for (let s = 5; s < slots; s++) parts.push(emitSlot(s, `arg${s}`))
        return parts
    }
    for (let s = 1; s < slots; s++) {
        if (s === chatJidIndex) {
            parts.push({ type: 'jid', name: 'chatJid' })
        } else {
            parts.push(emitSlot(s, `key${s}`))
        }
    }
    return parts
}

// --- Public entry ---

function extractAppstate(bundles) {
    const syncdConst = parseSyncdConst(bundles)
    const { fieldToMessage, messageEnumFields } = parseSyncActionValueTypes(bundles)
    const handlerNames = parseHandlerList(bundles)
    const handlers = {}
    const diagnostics = {
        handlersListed: handlerNames.length,
        handlersExtracted: 0,
        handlersErrored: 0,
        errors: []
    }
    for (const name of handlerNames) {
        const result = extractHandler(name, bundles, syncdConst, fieldToMessage, messageEnumFields)
        if (result.error || !result.actionKey || !result.name) {
            diagnostics.handlersErrored++
            diagnostics.errors.push({ module: name, error: result.error ?? 'incomplete' })
            continue
        }
        handlers[result.actionKey] = result
        diagnostics.handlersExtracted++
    }
    return {
        syncdConst,
        handlers,
        diagnostics
    }
}

module.exports = { extractAppstate }
