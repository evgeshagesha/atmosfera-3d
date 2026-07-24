#!/usr/bin/env node
/**
 * Downloads egoshev.ru pages, assets, CSS/JS and prepares data for Next.js.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";
import zlib from "zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const DATA = path.join(ROOT, "data");

const PAGES = [
  { route: "", url: "https://egoshev.ru/" },
  { route: "about", url: "https://egoshev.ru/about" },
  { route: "anketa", url: "https://egoshev.ru/anketa" },
  { route: "club", url: "https://egoshev.ru/club" },
  { route: "baza", url: "https://egoshev.ru/baza" },
  { route: "tree", url: "https://egoshev.ru/tree" },
  { route: "gaid", url: "https://egoshev.ru/gaid" },
  { route: "online", url: "https://egoshev.ru/online" },
  { route: "uslugi", url: "https://egoshev.ru/uslugi" },
  { route: "oferta", url: "https://egoshev.ru/oferta" },
  { route: "personal", url: "https://egoshev.ru/personal" },
  { route: "policy", url: "https://egoshev.ru/policy" },
];

const INTERNAL_ROUTES = new Set(PAGES.map((p) => p.route).filter(Boolean));

const CSS_FILES = [
  "https://static.tildacdn.com/css/tilda-grid-3.0.min.css",
  "https://static.tildacdn.com/css/tilda-animation-2.0.min.css",
  "https://static.tildacdn.com/css/tilda-menusub-1.1.min.css",
  "https://static.tildacdn.com/css/tilda-menu-widgeticons-1.0.min.css",
  "https://static.tildacdn.com/css/tilda-menu-burger-1.0.min.css",
  "https://static.tildacdn.com/css/tilda-cards-1.0.min.css",
  "https://static.tildacdn.com/css/tilda-slds-1.4.min.css",
  "https://static.tildacdn.com/css/tilda-popup-1.1.min.css",
  "https://static.tildacdn.com/css/tilda-feed-1.1.min.css",
  "https://static.tildacdn.com/css/tilda-forms-1.0.min.css",
  "https://static.tildacdn.com/css/tilda-cover-1.0.min.css",
  "https://static.tildacdn.com/css/tilda-zoom-2.0.min.css",
  "https://static.tildacdn.com/css/tilda-contact-method-1.0.min.css",
];

const JS_FILES = [
  "https://static.tildacdn.com/js/jquery-1.10.2.min.js",
  "https://static.tildacdn.com/js/tilda-scripts-3.0.min.js",
  "https://static.tildacdn.com/js/tilda-lazyload-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-animation-2.0.min.js",
  "https://static.tildacdn.com/js/tilda-menusub-1.1.min.js",
  "https://static.tildacdn.com/js/tilda-menu-1.1.min.js",
  "https://static.tildacdn.com/js/tilda-menu-widgeticons-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-menu-burger-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-zero-1.1.min.js",
  "https://static.tildacdn.com/js/tilda-cards-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-feed-1.1.min.js",
  "https://static.tildacdn.com/js/tilda-slds-1.4.min.js",
  "https://static.tildacdn.com/js/hammer.min.js",
  "https://static.tildacdn.com/js/tilda-popup-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-forms-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-cover-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-t994-stories-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-zoom-2.0.min.js",
  "https://static.tildacdn.com/js/tilda-video-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-slider-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-paint-icons.min.js",
  "https://static.tildacdn.com/js/tilda-zero-scale-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-events-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-contact-method-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-phone-mask-1.1.min.js",
  "https://static.tildacdn.com/js/tilda-variant-select-1.0.min.js",
  "https://static.tildacdn.com/js/tilda-stat-1.0.min.js",
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Encoding": "identity",
            Connection: "keep-alive",
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchUrl(res.headers.location).then(resolve).catch(reject);
            return;
          }
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => {
            const buffer = Buffer.concat(chunks);
            if (res.headers["content-encoding"] === "gzip") {
              zlib.gunzip(buffer, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
              });
              return;
            }
            resolve(buffer);
          });
          res.on("error", reject);
        }
      )
      .on("error", reject);
  });
}

function fetchText(url) {
  return fetchUrl(url).then((b) => b.toString("utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function isPageRouteUrl(url) {
  if (!url.includes("egoshev.ru")) return false;
  try {
    const pathname = new URL(url).pathname.replace(/^\//, "").replace(/\/$/, "");
    return !pathname || INTERNAL_ROUTES.has(pathname);
  } catch {
    return false;
  }
}

function isTildaStaticUrl(url) {
  return url.includes("static.tildacdn.com") || url.includes("thb.tildacdn.com");
}

function isAssetUrl(url) {
  if (isTildaStaticUrl(url)) return true;
  if (url.includes("egoshev.ru")) {
    try {
      const pathname = new URL(url).pathname.replace(/^\//, "");
      if (!pathname || INTERNAL_ROUTES.has(pathname)) return false;
      if (pathname === "og-image.jpg") return false;
      return /\.[a-z0-9]{2,5}$/i.test(pathname);
    } catch {
      return false;
    }
  }
  return false;
}

function isTildaBundleUrl(url) {
  return (
    /static\.tildacdn\.com\/(?:css|js)\//.test(url) ||
    /static\.tildacdn\.com\/ws\/project/.test(url)
  );
}

function urlToLocalPath(url) {
  const u = new URL(url);
  const pathname = decodeURIComponent(u.pathname);

  if (u.hostname === "static.tildacdn.com") {
    if (pathname.startsWith("/css/") || pathname.includes("/ws/project") && pathname.endsWith(".css")) {
      return path.join(PUBLIC, "tilda", "css", path.basename(pathname));
    }
    if (pathname.startsWith("/js/") || pathname.includes("/ws/project") && pathname.endsWith(".js")) {
      return path.join(PUBLIC, "tilda", "js", path.basename(pathname));
    }
    return path.join(PUBLIC, "assets", pathname.replace(/^\//, ""));
  }

  if (u.hostname === "thb.tildacdn.com") {
    const match = pathname.match(/\/(tild[^/]+)\/.*\/([^/]+)$/);
    if (match) {
      return path.join(PUBLIC, "assets", match[1], match[2]);
    }
  }

  if (u.hostname === "egoshev.ru") {
    return path.join(PUBLIC, "assets", pathname.replace(/^\//, ""));
  }

  const name = path.basename(pathname) || "file";
  return path.join(PUBLIC, "assets", "misc", name);
}

function thbToStatic(url) {
  const match = url.match(
    /https:\/\/thb\.tildacdn\.com\/(tild[^/]+)\/.*\/([^/?#]+)/
  );
  if (match) {
    return `https://static.tildacdn.com/${match[1]}/${match[2]}`;
  }
  return url;
}

function localAssetUrl(localPath) {
  const rel = path.relative(PUBLIC, localPath).split(path.sep).join("/");
  return `/${rel}`;
}

function isGzipBuffer(buffer) {
  return buffer.length >= 2 && buffer[0] === 0x1f && buffer[1] === 0x8b;
}

async function downloadStaticFile(url, force = false) {
  const localPath = urlToLocalPath(url);
  const publicUrl = localAssetUrl(localPath);

  if (!force && fs.existsSync(localPath)) {
    const header = fs.readFileSync(localPath).subarray(0, 2);
    if (!isGzipBuffer(header)) {
      return publicUrl;
    }
    force = true;
  }

  ensureDir(path.dirname(localPath));
  const data = await fetchUrl(url);
  fs.writeFileSync(localPath, data);
  console.log(`  bundle: ${path.basename(localPath)}`);
  return publicUrl;
}

async function downloadAsset(url, cache) {
  if (!isAssetUrl(url) || isTildaBundleUrl(url)) {
    return url;
  }

  let downloadUrl = url;
  if (url.includes("thb.tildacdn.com")) {
    downloadUrl = thbToStatic(url);
  }

  const localPath = urlToLocalPath(downloadUrl);
  const publicUrl = localAssetUrl(localPath);

  if (cache.has(downloadUrl)) {
    return cache.get(downloadUrl);
  }

  if (!fs.existsSync(localPath)) {
    ensureDir(path.dirname(localPath));
    try {
      const data = await fetchUrl(downloadUrl);
      fs.writeFileSync(localPath, data);
      console.log(`  asset: ${path.basename(localPath)}`);
    } catch (e) {
      console.warn(`  skip: ${downloadUrl} (${e.message})`);
      cache.set(downloadUrl, downloadUrl);
      return downloadUrl;
    }
  }

  cache.set(downloadUrl, publicUrl);
  cache.set(url, publicUrl);
  return publicUrl;
}

function extractPageAssets(html) {
  const css = new Set();
  const js = new Set();

  for (const match of html.matchAll(
    /href="(https:\/\/static\.tildacdn\.com\/[^"]+\.css[^"]*)"/g
  )) {
    css.add(match[1]);
  }

  for (const match of html.matchAll(
    /src="(https:\/\/static\.tildacdn\.com\/[^"]+\.js[^"]*)"/g
  )) {
    js.add(match[1]);
  }

  for (const match of html.matchAll(
    /t_loadCSSFile\(['"]([^'"]+)['"]\)/g
  )) {
    if (match[1].includes("tildacdn.com") || match[1].startsWith("/tilda/")) {
      css.add(match[1].startsWith("/") ? `https://static.tildacdn.com${match[1].replace("/tilda/css", "/css")}` : match[1]);
    }
  }

  for (const match of html.matchAll(
    /t_loadJsFile\(['"]([^'"]+)['"]/g
  )) {
    if (match[1].includes("tildacdn.com") || match[1].startsWith("/tilda/")) {
      js.add(match[1].startsWith("/") ? `https://static.tildacdn.com${match[1].replace("/tilda/js", "/js")}` : match[1]);
    }
  }

  return { css: [...css], js: [...js] };
}

async function localizeBundles(urls, bundleCache) {
  const localized = [];
  for (const url of urls) {
    const fullUrl = url.startsWith("http")
      ? url
      : `https://static.tildacdn.com${url}`;
    if (!isTildaBundleUrl(fullUrl)) continue;
    if (bundleCache.has(fullUrl)) {
      localized.push(bundleCache.get(fullUrl));
      continue;
    }
    const local = await downloadStaticFile(fullUrl);
    bundleCache.set(fullUrl, local);
    localized.push(local);
  }
  return [...new Set(localized)];
}

function extractMeta(html) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const description =
    html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const ogImage =
    html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? "";
  return { title, description, ogImage };
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : html;
}

function replaceLinks(html, meta = {}) {
  let result = html;
  result = result.replace(/https:\/\/egoshev\.ru\/?/g, "/");
  for (const route of INTERNAL_ROUTES) {
    result = result.replaceAll(`"/assets/${route}"`, `"/${route}"`);
    result = result.replaceAll(`'/assets/${route}'`, `'/${route}'`);
  }
  result = result.replace(/href="\/assets\/(privacy|soglasie)"/g, 'href="/policy"');
  if (meta.ogImage) {
    result = result.replaceAll('"/og-image.jpg"', `"${meta.ogImage}"`);
    result = result.replaceAll("'/og-image.jpg'", `'${meta.ogImage}'`);
    result = result.replaceAll("/og-image.jpg", meta.ogImage);
  }
  return result;
}

function isJsonLdScript(attrs, content) {
  const code = content.trim();
  if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) {
    return true;
  }
  return code.startsWith("{") && code.includes("@context");
}

function extractInlineScripts(html) {
  const scripts = [];
  const jsonLd = [];
  const cleaned = html.replace(
    /<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi,
    (match, attrs = "", content = "") => {
      if (/src\s*=/i.test(attrs)) {
        return "";
      }
      const code = content.trim();
      if (!code) return "";
      if (isJsonLdScript(attrs, code)) {
        jsonLd.push(code);
        return "";
      }
      scripts.push(code);
      return "";
    }
  );
  return { html: cleaned, scripts, jsonLd };
}

async function localizeUrl(url, cache, bundleCache) {
  if (isPageRouteUrl(url)) {
    const pathname = new URL(url).pathname.replace(/^\//, "").replace(/\/$/, "");
    return pathname ? `/${pathname}` : "/";
  }

  if (isTildaBundleUrl(url)) {
    if (bundleCache.has(url)) return bundleCache.get(url);
    const local = await downloadStaticFile(url);
    bundleCache.set(url, local);
    return local;
  }

  if (isAssetUrl(url)) {
    return downloadAsset(url, cache);
  }

  return url;
}

async function processHtml(html, cache, bundleCache, meta = {}) {
  const urlRe =
    /https?:\/\/(?:static|thb)\.tildacdn\.com\/[^"'\s>)]+|https:\/\/egoshev\.ru\/[^"'\s>)]+/g;
  const urls = [...new Set(html.match(urlRe) ?? [])];

  let processed = html;
  for (const url of urls) {
    const local = await localizeUrl(url, cache, bundleCache);
    processed = processed.split(url).join(local);
  }

  processed = replaceLinks(processed, meta);
  const { html: withoutScripts, scripts, jsonLd } = extractInlineScripts(processed);
  return { html: withoutScripts, scripts, jsonLd };
}

async function localizeMeta(meta, cache) {
  if (meta.ogImage && isAssetUrl(meta.ogImage)) {
    meta.ogImage = await downloadAsset(meta.ogImage, cache);
  }
  return meta;
}

async function main() {
  console.log("Migrating egoshev.ru to Next.js...\n");
  ensureDir(DATA);
  ensureDir(path.join(PUBLIC, "assets"));
  ensureDir(path.join(PUBLIC, "tilda", "css"));
  ensureDir(path.join(PUBLIC, "tilda", "js"));

  const cache = new Map();
  const bundleCache = new Map();
  const pagesData = [];
  const allBundles = { css: new Set(), js: new Set() };

  for (const page of PAGES) {
    console.log(`Page: /${page.route || "(home)"}`);
    const html = await fetchText(page.url);
    let meta = extractMeta(html);
    const pageAssets = extractPageAssets(html);

    let body = extractBody(html);
    meta = await localizeMeta(meta, cache);
    const processed = await processHtml(body, cache, bundleCache, meta);

    const css = await localizeBundles(pageAssets.css, bundleCache);
    const js = await localizeBundles(pageAssets.js, bundleCache);
    css.forEach((u) => allBundles.css.add(u));
    js.forEach((u) => allBundles.js.add(u));

    pagesData.push({
      route: page.route,
      meta,
      body: processed.html,
      scripts: processed.scripts,
      jsonLd: processed.jsonLd,
      css,
      js,
    });

    fs.writeFileSync(
      path.join(DATA, `${page.route || "index"}.json`),
      JSON.stringify(
        {
          route: page.route,
          meta,
          body: processed.html,
          scripts: processed.scripts,
          jsonLd: processed.jsonLd,
          css,
          js,
        },
        null,
        0
      )
    );
  }

  console.log("\nDownloading shared CSS...");
  for (const url of CSS_FILES) {
    const local = await downloadStaticFile(url);
    allBundles.css.add(local);
  }

  console.log("\nDownloading shared JS...");
  for (const url of JS_FILES) {
    const local = await downloadStaticFile(url);
    allBundles.js.add(local);
  }

  const faviconUrls = [
    "https://static.tildacdn.com/tild6364-6163-4734-a134-626161373762/EG_atmosfera3D_stick.png",
    "https://static.tildacdn.com/tild6339-6439-4065-b437-383430633035/photo_2025-05-13_135.png",
    "https://static.tildacdn.com/tild3632-6663-4164-b565-666631343131/photo_2025-05-13_135.png",
  ];
  for (const url of faviconUrls) {
    await downloadAsset(url, cache);
  }

  const manifest = {
    css: [...allBundles.css],
    js: [...allBundles.js],
    pages: pagesData.map((p) => ({
      route: p.route,
      meta: p.meta,
    })),
  };

  fs.writeFileSync(path.join(DATA, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("\nDone! Pages:", pagesData.length, "| Assets:", cache.size, "| Bundles:", bundleCache.size);

  console.log("\nExtracting blocks...");
  const { execSync } = await import("child_process");
  execSync("node lib/tilda/extract-blocks.mjs", { cwd: ROOT, stdio: "inherit" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
