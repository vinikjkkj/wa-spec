'use strict'

/**
 * Upstream bundle-archive source for WA Web.
 *
 * Instead of scraping whatever chunks the SPA happens to load, this fetches an
 * upstream archive for a given WA Web revision and keeps the JS that matters.
 * It yields roughly 17k `WA*` modules versus ~14.5k from a live scrape,
 * because lazily-loaded chunks the SPA never requests are in the archive too.
 *
 * Three steps:
 *
 *   1. Resolve the revision — the `X` in `2.3000.X`. `web.whatsapp.com`
 *      serves it as `"client_revision":<X>` in the initial HTML, readable with
 *      a plain GET (no browser). If that ever stops working, the caller can
 *      fall back to the puppeteer scrape in index.cjs.
 *   2. Download the archive for that revision as a ZIP.
 *   3. Unpack, keeping only `.js` entries that register at least one
 *      `__d("WA…")` module. The archive also carries stylesheets and a large
 *      amount of shared infrastructure JS that no extractor ever looks at;
 *      dropping it shrinks the corpus substantially with zero loss of `WA*`
 *      modules.
 *
 * The archive endpoint is NOT hardcoded here. It is read from the
 * `WA_ARCHIVE_URL` environment variable so the URL stays out of this
 * repository and out of the published npm package. The value must contain a
 * `{revision}` placeholder, e.g. `https://example.invalid/{revision}/x`.
 *
 * Caveat worth knowing: the archive ships several transpile variants of the
 * same module (modern vs legacy — native `async` vs `asyncToGeneratorRuntime`,
 * and so on). Extractors index the first occurrence they encounter, so file
 * iteration order decides which variant wins. Output filenames are derived
 * from entry content and callers sort them, which makes that choice stable
 * across runs — but it is stable, not curated. If an extractor starts
 * returning empty results after an archive switch, check whether it is
 * matching against a variant it was not written for.
 */

const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const zlib = require('node:zlib')
const { createHash } = require('node:crypto')

const WHATSAPP_URL = 'https://web.whatsapp.com/'
const ARCHIVE_URL_ENV = 'WA_ARCHIVE_URL'
const REVISION_RE = /"client_revision"\s*:\s*(\d{6,})/
const WA_MODULE_RE = /__d\("WA[A-Za-z0-9_.$]*"/
const VERSION_PREFIX = '2.3000.'

// A plain fetch of web.whatsapp.com is rejected without a browser-shaped
// header set, so send one. These are ordinary Chrome defaults.
const BROWSER_HEADERS = {
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}

// Headers for the archive request. Keep them as they are — the endpoint is
// particular about them and deviating gets the request rejected.
const ARCHIVE_HEADERS = {
    accept: '*/*',
    'user-agent': 'wa-fetcher (+https://github.com/vinikjkkj/wa-spec)'
}

// --- revision discovery -------------------------------------------------

/**
 * Read the current WA Web revision straight from the served HTML.
 * Returns `{ revision, waVersion }`, or throws if the marker is absent.
 */
async function resolveRevision(opts = {}) {
    const res = await fetch(opts.url ?? WHATSAPP_URL, { headers: BROWSER_HEADERS, redirect: 'follow' })
    if (!res.ok) throw new Error(`revision lookup failed: HTTP ${res.status}`)
    const html = await res.text()
    const m = REVISION_RE.exec(html)
    if (!m) throw new Error('revision lookup failed: no "client_revision" in served HTML')
    const revision = m[1]
    return { revision, waVersion: `${VERSION_PREFIX}${revision}` }
}

// --- archive download ---------------------------------------------------

function archiveUrlFor(revision, template) {
    const tpl = template ?? process.env[ARCHIVE_URL_ENV]
    if (!tpl) {
        throw new Error(
            `${ARCHIVE_URL_ENV} is not set — the archive endpoint is supplied by ` +
                `environment, not committed to this repository`
        )
    }
    if (!tpl.includes('{revision}')) {
        throw new Error(`${ARCHIVE_URL_ENV} must contain a {revision} placeholder`)
    }
    return tpl.replace('{revision}', String(revision))
}

/**
 * Download the archive to a temp file. Returns the file path.
 *
 * Errors deliberately never quote the URL — it may carry the configured
 * template or a signed redirect, and this runs in CI where stderr is captured.
 */
async function downloadArchive(revision, opts = {}) {
    const url = archiveUrlFor(revision, opts.archiveUrl)
    const res = await fetch(url, { headers: ARCHIVE_HEADERS, redirect: 'follow' })
    if (!res.ok) throw new Error(`archive download failed: HTTP ${res.status}`)
    if (!res.body) throw new Error('archive download failed: empty response body')

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wa-archive-'))
    const file = path.join(dir, `${revision}.zip`)
    const sink = fs.createWriteStream(file)
    const { Readable } = require('node:stream')
    const { pipeline } = require('node:stream/promises')
    await pipeline(Readable.fromWeb(res.body), sink)
    return { file, dir, bytes: fs.statSync(file).size }
}

// --- ZIP reading --------------------------------------------------------

// The archive holds more entries than the 16-bit count field in a classic
// end-of-central-directory record can express, so it is always a Zip64
// archive. We read the central directory ourselves rather than take a
// dependency: entries are stored or deflated, never encrypted, and the Zip64
// pieces we need are the EOCD locator plus the per-entry extra field.

const EOCD_SIG = 0x06054b50
const EOCD64_SIG = 0x06064b50
const EOCD64_LOCATOR_SIG = 0x07064b50
const CENTRAL_SIG = 0x02014b50

function findEocd(buf) {
    // EOCD is at the end, after a comment of at most 64 KiB.
    const min = Math.max(0, buf.length - 0x10000 - 22)
    for (let i = buf.length - 22; i >= min; i--) {
        if (buf.readUInt32LE(i) === EOCD_SIG) return i
    }
    throw new Error('not a zip archive: no end-of-central-directory record')
}

function readCentralDirectoryLocation(fd, size) {
    const tailLen = Math.min(size, 0x10000 + 22 + 20)
    const tail = Buffer.alloc(tailLen)
    fs.readSync(fd, tail, 0, tailLen, size - tailLen)
    const eocd = findEocd(tail)

    let entries = tail.readUInt16LE(eocd + 10)
    let cdSize = tail.readUInt32LE(eocd + 12)
    let cdOffset = tail.readUInt32LE(eocd + 16)

    // Zip64 locator sits immediately before the classic EOCD.
    const locator = eocd - 20
    if (locator >= 0 && tail.readUInt32LE(locator) === EOCD64_LOCATOR_SIG) {
        const eocd64Offset = Number(tail.readBigUInt64LE(locator + 8))
        const head = Buffer.alloc(56)
        fs.readSync(fd, head, 0, 56, eocd64Offset)
        if (head.readUInt32LE(0) !== EOCD64_SIG) throw new Error('malformed zip64 end-of-central-directory')
        entries = Number(head.readBigUInt64LE(32))
        cdSize = Number(head.readBigUInt64LE(40))
        cdOffset = Number(head.readBigUInt64LE(48))
    }
    return { entries, cdSize, cdOffset }
}

// Zip64 promotes 0xffffffff/0xffff placeholders into the extra field, in the
// fixed order uncompressed, compressed, local-header-offset — each present
// only if its base field was maxed out.
function applyZip64Extra(entry, extra) {
    let i = 0
    while (i + 4 <= extra.length) {
        const id = extra.readUInt16LE(i)
        const len = extra.readUInt16LE(i + 2)
        if (id === 0x0001) {
            let p = i + 4
            if (entry.uncompressedSize === 0xffffffff && p + 8 <= i + 4 + len) {
                entry.uncompressedSize = Number(extra.readBigUInt64LE(p))
                p += 8
            }
            if (entry.compressedSize === 0xffffffff && p + 8 <= i + 4 + len) {
                entry.compressedSize = Number(extra.readBigUInt64LE(p))
                p += 8
            }
            if (entry.localHeaderOffset === 0xffffffff && p + 8 <= i + 4 + len) {
                entry.localHeaderOffset = Number(extra.readBigUInt64LE(p))
                p += 8
            }
            return
        }
        i += 4 + len
    }
}

function readCentralDirectory(fd, size) {
    const { entries, cdSize, cdOffset } = readCentralDirectoryLocation(fd, size)
    const cd = Buffer.alloc(cdSize)
    fs.readSync(fd, cd, 0, cdSize, cdOffset)

    const out = []
    let p = 0
    for (let n = 0; n < entries && p + 46 <= cd.length; n++) {
        if (cd.readUInt32LE(p) !== CENTRAL_SIG) break
        const method = cd.readUInt16LE(p + 10)
        const nameLen = cd.readUInt16LE(p + 28)
        const extraLen = cd.readUInt16LE(p + 30)
        const commentLen = cd.readUInt16LE(p + 32)
        const entry = {
            name: cd.toString('utf8', p + 46, p + 46 + nameLen),
            method,
            compressedSize: cd.readUInt32LE(p + 20),
            uncompressedSize: cd.readUInt32LE(p + 24),
            localHeaderOffset: cd.readUInt32LE(p + 42)
        }
        if (extraLen) applyZip64Extra(entry, cd.subarray(p + 46 + nameLen, p + 46 + nameLen + extraLen))
        out.push(entry)
        p += 46 + nameLen + extraLen + commentLen
    }
    return out
}

// The local header repeats the name/extra lengths, and they can differ from
// the central directory's, so the data offset must be computed from it.
function readEntry(fd, entry) {
    const head = Buffer.alloc(30)
    fs.readSync(fd, head, 0, 30, entry.localHeaderOffset)
    const nameLen = head.readUInt16LE(26)
    const extraLen = head.readUInt16LE(28)
    const dataOffset = entry.localHeaderOffset + 30 + nameLen + extraLen

    const raw = Buffer.alloc(entry.compressedSize)
    fs.readSync(fd, raw, 0, entry.compressedSize, dataOffset)
    if (entry.method === 0) return raw
    if (entry.method === 8) return zlib.inflateRawSync(raw, { maxOutputLength: entry.uncompressedSize })
    throw new Error(`unsupported zip compression method ${entry.method} for ${entry.name}`)
}

// --- unpack -------------------------------------------------------------

/**
 * Unpack the archive into `<outDir>`, keeping only `.js` entries that register
 * at least one `__d("WA…")` module. Returns the kept bundle records plus the
 * counts that were dropped, so callers can report the reduction.
 */
function unpackArchive(zipPath, outDir, opts = {}) {
    const keepAllJs = opts.keepAllJs === true
    const fd = fs.openSync(zipPath, 'r')
    try {
        const size = fs.statSync(zipPath).size
        const entries = readCentralDirectory(fd, size)
        fs.mkdirSync(outDir, { recursive: true })

        const bundles = []
        const skipped = { notJs: 0, noWaModule: 0, bytesDropped: 0 }
        let totalBytes = 0

        for (const entry of entries) {
            if (entry.name.endsWith('/')) continue
            if (!entry.name.toLowerCase().endsWith('.js')) {
                skipped.notJs++
                skipped.bytesDropped += entry.uncompressedSize
                continue
            }
            const data = readEntry(fd, entry)
            const text = data.toString('utf8')
            if (!keepAllJs && !WA_MODULE_RE.test(text)) {
                skipped.noWaModule++
                skipped.bytesDropped += data.length
                continue
            }
            // Entry names are usually already content-addressed, but that is
            // not guaranteed — normalise and keep them collision-free.
            const file = safeName(entry.name, data)
            fs.writeFileSync(path.join(outDir, file), data)
            bundles.push({ file, bytes: data.length, sha256: sha256(data) })
            totalBytes += data.length
        }

        bundles.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0))
        return { bundles, skipped, totalBytes }
    } finally {
        fs.closeSync(fd)
    }
}

function sha256(buf) {
    return createHash('sha256').update(buf).digest('hex')
}

function safeName(name, data) {
    const base = name.split('/').pop() || 'bundle.js'
    const cleaned = base.replace(/[^A-Za-z0-9._-]/g, '_')
    if (cleaned.length <= 96 && cleaned.toLowerCase().endsWith('.js')) return cleaned
    return `${sha256(data).slice(0, 32)}.js`
}

// --- entry point --------------------------------------------------------

/**
 * Resolve the revision, download its archive, unpack the WA JS, and write
 * `<out>/raw/<waVersion>/*.js` plus `<out>/manifest.json`.
 *
 * `opts.revision` pins a specific revision instead of resolving the live one.
 * `opts.resolveRevision` supplies a fallback resolver (see index.cjs) used
 * only if the plain HTML lookup fails.
 */
async function fetchArchive(opts = {}) {
    const out = path.resolve(opts.out ?? 'dump')
    fs.mkdirSync(out, { recursive: true })

    let revision = opts.revision != null ? String(opts.revision) : null
    let waVersion = revision ? `${VERSION_PREFIX}${revision}` : null
    let revisionSource = revision ? 'pinned' : null

    if (!revision) {
        try {
            const resolved = await resolveRevision(opts)
            revision = resolved.revision
            waVersion = resolved.waVersion
            revisionSource = 'html'
        } catch (err) {
            if (!opts.resolveRevisionFallback) throw err
            opts.onLog?.(`revision lookup via HTML failed (${err.message}) — falling back to browser`)
            const resolved = await opts.resolveRevisionFallback(opts)
            revision = resolved.revision
            waVersion = resolved.waVersion
            revisionSource = 'browser'
        }
    }

    opts.onLog?.(`revision ${revision} (${revisionSource}) — downloading archive…`)
    const { file, dir, bytes } = await downloadArchive(revision, opts)
    try {
        opts.onLog?.(`archive ${(bytes / 1024 / 1024).toFixed(1)}MB — unpacking…`)
        const versionDir = path.join(out, 'raw', waVersion)
        const { bundles, skipped, totalBytes } = unpackArchive(file, versionDir, opts)

        const manifest = {
            waVersion,
            revision: Number(revision),
            source: 'archive',
            fetchedAt: new Date().toISOString(),
            bundleCount: bundles.length,
            totalBytes,
            droppedNonJs: skipped.notJs,
            droppedNoWaModule: skipped.noWaModule,
            rawDir: path.relative(out, versionDir),
            bundles
        }
        const manifestPath = path.join(out, 'manifest.json')
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')

        return {
            waVersion,
            revision: Number(revision),
            bundles,
            skipped,
            paths: { out, raw: versionDir, manifest: manifestPath }
        }
    } finally {
        fs.rmSync(dir, { recursive: true, force: true })
    }
}

module.exports = {
    ARCHIVE_URL_ENV,
    resolveRevision,
    fetchArchive,
    unpackArchive
}
