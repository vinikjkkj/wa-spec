'use strict'

/**
 * @vinikjkkj/wa-fetcher
 *
 *   const { discoverBundleUrls } = require('@vinikjkkj/wa-fetcher')
 *   const { waVersion, urls } = await discoverBundleUrls()
 *   //   urls[]            ['https://static.whatsapp.net/.../chunk.js', ...]
 *   //   waVersion         '2.3000.xxx' | null
 *
 *   const { fetchBundles } = require('@vinikjkkj/wa-fetcher')
 *   const dump = await fetchBundles({ out: 'dump' })
 *   //   dump.bundles[]    [{ url, file, bytes }, ...]
 *   //   dump.paths.raw    absolute path to <out>/raw/<version>/
 *   //   dump.paths.manifest
 */

const fs = require('node:fs')
const path = require('node:path')
const { connect } = require('puppeteer-real-browser')

const WHATSAPP_URL = 'https://web.whatsapp.com/'
const NAV_TIMEOUT_MS = 60_000
const LAZY_WAIT_MS = 5_000

// In-page discovery: walks `<script data-sjs>` rsrcMap manifests, preload
// links, inline script literals, and performance entries to find every JS
// bundle URL Meta references — not just the chunks the SPA has loaded.
// (Technique cribbed from vinikjkkj/wa-diff/fetch.js.)
const DISCOVERY_FN = function () {
    const found = new Set()
    const allowedHost = 'static.whatsapp.net'
    const jsFileRe = /\.m?js(?:[?#]|$)/i
    const jsInTextRe =
        /(?:https?:)?\/\/[^\s"'`<>]+?\.m?js(?:[?#][^\s"'`<>]*)?|(?:\/|\.\/|\.\.\/)[^\s"'`<>]+?\.m?js(?:[?#][^\s"'`<>]*)?/gi
    function addUrl(raw) {
        if (typeof raw !== 'string') return
        const cleaned = raw.trim().replace(/\\\//g, '/')
        if (!cleaned || !jsFileRe.test(cleaned)) return
        try {
            let normalized = cleaned
            if (
                /^[a-z0-9.-]+\.[a-z]{2,}(?:[/?#]|$)/i.test(normalized) &&
                !/^[a-z][a-z0-9+.-]*:/i.test(normalized)
            ) {
                normalized = `https://${normalized}`
            }
            const parsed = new URL(normalized, location.href)
            if (parsed.hostname.toLowerCase() !== allowedHost) return
            found.add(parsed.href)
        } catch {}
    }
    function extractFromText(text) {
        if (typeof text !== 'string' || !text) return
        const matches = text.match(jsInTextRe)
        if (!matches) return
        for (const m of matches) addUrl(m)
    }
    function walk(obj, seen = new WeakSet()) {
        if (!obj || typeof obj !== 'object') return
        if (seen.has(obj)) return
        seen.add(obj)
        if (obj.rsrcMap && typeof obj.rsrcMap === 'object') {
            for (const r of Object.values(obj.rsrcMap)) {
                if (!r || typeof r !== 'object') continue
                if (r.type === 'js') addUrl(r.src || r.url || r.href || r.uri)
            }
        }
        for (const value of Object.values(obj)) {
            if (typeof value === 'string') addUrl(value)
            else walk(value, seen)
        }
    }
    for (const s of document.querySelectorAll('script[data-sjs]')) {
        extractFromText(s.textContent || '')
        try {
            walk(JSON.parse(s.textContent || ''))
        } catch {}
    }
    for (const s of document.querySelectorAll('script[src]')) {
        addUrl(s.src || s.getAttribute('src'))
    }
    for (const l of document.querySelectorAll(
        'link[rel="preload"][as="script"][href], link[rel="modulepreload"][href], link[rel="prefetch"][as="script"][href], link[rel="prefetch"][href]'
    )) {
        addUrl(l.href || l.getAttribute('href'))
    }
    for (const s of document.querySelectorAll('script:not([src])')) {
        extractFromText(s.textContent || '')
    }
    if (typeof performance?.getEntriesByType === 'function') {
        for (const e of performance.getEntriesByType('resource')) {
            if (e && typeof e.name === 'string') addUrl(e.name)
        }
    }
    return Array.from(found)
}

const VERSION_FN = function () {
    try {
        if (typeof window !== 'undefined' && window.Debug && window.Debug.VERSION) {
            return String(window.Debug.VERSION)
        }
    } catch {}
    return null
}

async function openPage(opts) {
    const authState = opts.authState ?? null
    const extraWaitMs = opts.extraWaitMs ?? LAZY_WAIT_MS

    const { browser, page } = await connect({
        headless: true,
        turnstile: true,
        connectOption: { defaultViewport: null },
        customConfig: {},
        plugins: []
    })

    try {
        if (authState && fs.existsSync(authState)) {
            const state = JSON.parse(fs.readFileSync(authState, 'utf8'))
            if (Array.isArray(state.cookies) && state.cookies.length > 0) {
                await page.setCookie(...state.cookies)
            }
        }
        await page.goto(WHATSAPP_URL, { waitUntil: 'networkidle2', timeout: NAV_TIMEOUT_MS })
        await new Promise((r) => setTimeout(r, extraWaitMs))
        return { browser, page }
    } catch (err) {
        await browser.close().catch(() => {})
        throw err
    }
}

/**
 * Discover every JS bundle URL referenced by web.whatsapp.com.
 * Returns `{ waVersion, urls }` — sorted, deduped, host-filtered to
 * `static.whatsapp.net`.
 */
async function discoverBundleUrls(opts = {}) {
    const { browser, page } = await openPage(opts)
    try {
        const [urls, waVersion] = await Promise.all([
            page.evaluate(DISCOVERY_FN),
            page.evaluate(VERSION_FN)
        ])
        return { waVersion, urls: [...new Set(urls)].sort() }
    } finally {
        await browser.close().catch(() => {})
    }
}

/**
 * Discover + download every JS bundle. Writes raw bundles to
 * `<out>/raw/<wa-version>/*.js` and a `<out>/manifest.json` index.
 */
async function fetchBundles(opts = {}) {
    const out = path.resolve(opts.out ?? 'dump')
    fs.mkdirSync(out, { recursive: true })

    const { browser, page } = await openPage(opts)
    try {
        const [urls, waVersion] = await Promise.all([
            page.evaluate(DISCOVERY_FN),
            page.evaluate(VERSION_FN)
        ])
        const sortedUrls = [...new Set(urls)].sort()

        // CORS-safe in-page fetch (same origin as the SPA).
        const downloaded = await page.evaluate(async (uList) => {
            const out = []
            await Promise.all(
                uList.map(async (u) => {
                    try {
                        const r = await fetch(u)
                        const t = await r.text()
                        out.push({ url: u, text: t })
                    } catch {
                        out.push({ url: u, text: '' })
                    }
                })
            )
            return out
        }, sortedUrls)

        const versionDir = path.join(
            out,
            'raw',
            waVersion ?? `unknown-${new Date().toISOString().replace(/[:.]/g, '-')}`
        )
        fs.mkdirSync(versionDir, { recursive: true })

        const bundles = []
        let totalBytes = 0
        for (const b of downloaded) {
            const file = sanitizeFilename(b.url)
            fs.writeFileSync(path.join(versionDir, file), b.text)
            bundles.push({ url: b.url, file, bytes: b.text.length })
            totalBytes += b.text.length
        }

        const manifest = {
            waVersion,
            fetchedAt: new Date().toISOString(),
            bundleCount: bundles.length,
            totalBytes,
            rawDir: path.relative(out, versionDir),
            bundles
        }
        const manifestPath = path.join(out, 'manifest.json')
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')

        return {
            waVersion,
            bundles,
            paths: {
                out,
                raw: versionDir,
                manifest: manifestPath
            }
        }
    } finally {
        await browser.close().catch(() => {})
    }
}

function sanitizeFilename(url) {
    // Some WA bundle URLs have very long randomised basenames that bust the
    // 260-char path limit on Windows. Truncate to a fixed prefix and append a
    // short hash of the full URL to preserve uniqueness.
    const MAX_BASE_LEN = 64
    const { createHash } = require('node:crypto')
    let base
    try {
        const u = new URL(url)
        base = u.pathname.split('/').pop() || 'bundle'
    } catch {
        base = url
    }
    base = base.replace(/[^A-Za-z0-9._-]/g, '_')
    if (base.length <= MAX_BASE_LEN) return base
    const ext = base.match(/\.[A-Za-z0-9]{1,8}$/)?.[0] ?? ''
    const stem = base.slice(0, MAX_BASE_LEN - ext.length - 9) // leave room for hash
    const hash = createHash('sha1').update(url).digest('hex').slice(0, 8)
    return `${stem}-${hash}${ext}`
}

module.exports = { discoverBundleUrls, fetchBundles }
