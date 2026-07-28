# t-800-research-docs — rss-parser + feedsmith + Next Route Handlers

**status:** blocked (Context7 MCP unavailable)  
**budget_mode:** deep  
**query_count:** 0  
**context7:** NOT CONNECTED — servers present: cursor-app-control, cursor-ide-browser, user-memory-bank, user-notion, user-semgrep, user-telegram, user-telegram-account. Missing: `user-context7` / `plugin-context7-plugin-context7`  
**fallback:** known npm README / TypeScript API surface (training + package conventions) — all citations tagged `known_npm_docs_fallback`  
**out of scope:** Contentlayer (workspace = `data/blog.json` + TipTap)  
**workspace outbound RSS:** already exists — `app/rss.xml/route.ts` + `lib/content/blog-rss.ts`

---

```yaml
status: blocked
docs_brief:
  context7_available: false
  context7_error: "MCP server user-context7 / plugin-context7-plugin-context7 not found"
  libraryId: "/rbren/rss-parser"
  secondary_attempts:
    - name: feedsmith
      context7: unavailable_server
      note: "Could not resolve-library-id; treat as Context7-miss; use README patterns below"
    - name: next.js
      libraryId_expected: "/vercel/next.js"
      note: "Skipped full query — workspace already ships outbound RSS Route Handler"
  queries: []
  citations:
    - topic: "rss-parser parseURL / parseString"
      quote: "new Parser(options); await parser.parseURL(url) | await parser.parseString(xml) → feed with .items[]"
      libraryId: "/rbren/rss-parser"
      source: "known_npm_docs_fallback (rbren/rss-parser README)"
      freshness: unverified_no_context7
    - topic: "item fields guid link content"
      quote: "items expose title, link, pubDate, creator, content, contentSnippet, guid, categories, isoDate, enclosure"
      libraryId: "/rbren/rss-parser"
      source: "known_npm_docs_fallback"
      freshness: unverified_no_context7
    - topic: "customFields for content:encoded"
      quote: "Parser({ customFields: { item: [['content:encoded', 'contentEncoded']] } }) maps namespaced fields"
      libraryId: "/rbren/rss-parser"
      source: "known_npm_docs_fallback"
      freshness: unverified_no_context7
    - topic: "Next.js Route Handler Response"
      quote: "export async function GET() { return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } }) }"
      libraryId: "/vercel/next.js"
      source: "known_npm_docs_fallback + workspace app/rss.xml/route.ts"
      freshness: ok_workspace_verified
  unverified:
    - "ALL Context7 citations — MCP offline this pass; re-run after enabling Context7"
    - "feedsmith exact export names / version on Context7 — not resolved; README patterns below are best-effort"
    - "rss-parser request timeout / charset decoding edge cases — depend on version and xml2js; confirm on install"
    - "Whether feedsmith auto-resolves relative enclosure/link URLs — confirm in package README after npm install"
  query_count: 0
  budget_mode: deep
  synthesizer_note: "Prefer rss-parser for inbound scrape v1; feedsmith optional TS-native alternative if install proves cleaner; outbound RSS already done without Contentlayer"
```

---

## docs_findings (for synthesizer)

### 1. rss-parser (npm: `rss-parser`, GitHub rbren/rss-parser) — PRIMARY inbound

**Parse API (known README surface):**

```ts
import Parser from "rss-parser";

type CustomItem = { contentEncoded?: string };

const parser = new Parser<Record<string, unknown>, CustomItem>({
  timeout: 10000,
  headers: { "User-Agent": "EG-NewsBot/1.0 (+https://eg.egoshev.ru)" },
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

const feed = await parser.parseURL("https://example.com/feed.xml");
// alt: await parser.parseString(xmlText)

for (const item of feed.items) {
  const id = item.guid || item.link;          // dedupe key
  const url = item.link;
  const html = item.contentEncoded || item["content:encoded"] || item.content || item.description;
  const text = item.contentSnippet;           // stripped-ish plain text
  const published = item.isoDate || item.pubDate;
}
```

| Need | Field | Notes |
|------|--------|--------|
| Stable id | `item.guid` \|\| `item.link` | guid may be opaque non-URL; not always permalink |
| Canonical URL | `item.link` | required for fetch/open; may be missing on bad feeds |
| Body HTML | `content` / `content:encoded` / `description` | often raw HTML |
| Plain excerpt | `contentSnippet` | library-stripped; not perfect |
| Date | `isoDate` (preferred) / `pubDate` | isoDate is parser-normalized |

**Caveats (required for pipeline):**

1. **Encoding**  
   - Assumes well-formed XML; non-UTF-8 feeds / wrong `Content-Type` charset → mojibake or parse errors.  
   - Mitigation: fetch bytes yourself → decode via `Content-Type` / XML declaration / `iconv-lite` → `parseString`.  
   - Cyrillic Western→RU pipeline: verify UTF-8 on every source before TipTap/blog.json write.

2. **Relative links**  
   - `item.link` usually absolute; **HTML inside description/content** often has relative `href`/`src`.  
   - Parser does **not** rewrite those. Absolutize against feed `link` / site origin before SEO publish or TG digest.  
   - Same pattern as workspace outbound helper `absoluteUrl()` in `blog-rss.ts` — invert for inbound.

3. **HTML in description**  
   - `description` and `content` frequently contain HTML (not plain text).  
   - Do not trust as safe TipTap JSON — sanitize / convert (strip scripts, resolve imgs).  
   - Prefer `content:encoded` (via `customFields`) when present; fall back to `content` → `description`.  
   - `contentSnippet` is convenience plain text for titles/digests, not full article body.

4. **Other**  
   - Atom vs RSS: field shapes differ; library normalizes to common item keys but not 100%.  
   - Redirects / 403 without User-Agent: set `headers` / `requestOptions`.  
   - Large feeds: no built-in incremental sync — dedupe by guid/link in your store.

**Confidence:** medium-high on API shape (mature package); **low freshness** without Context7 live pull.

---

### 2. feedsmith — Context7 miss / optional fallback

**Status:** Could not resolve on Context7 (server absent). Treat as **unavailable via Context7**.

**README-level pattern (best-effort, unverified):**

```ts
// typical modern API shape — CONFIRM after npm view feedsmith
// import { parseFeed } from "feedsmith";
// const feed = parseFeed(xmlString);
// feed.title, feed.items[].id | .url | .content | .published
```

| vs rss-parser | Guidance for EG news v1 |
|---------------|-------------------------|
| TS-first / stricter types | Nice-to-have, not required for Cursor command MVP |
| Parse string vs URL | May need separate `fetch` (good — you control encoding) |
| Multi-format (RSS/Atom/JSON Feed) | Useful if sources mix formats |

**Recommendation for synthesizer:**  
- **v1 default = `rss-parser`** (widely used, parseURL one-liner).  
- Evaluate `feedsmith` only if install + README confirm cleaner types and Atom/JSON Feed needs.  
- Do not block factory on feedsmith Context7 miss.

---

### 3. Next.js App Router Route Handlers — outbound only (brief)

Workspace **already** publishes RSS:

- `app/rss.xml/route.ts` — `GET` → `Response` with `application/rss+xml; charset=utf-8`, `dynamic = "force-dynamic"`, `revalidate = 300`
- `lib/content/blog-rss.ts` — builds XML from blog posts (`data/blog.json` path), escapes XML, absolutizes URLs, CDATA for `content:encoded`

**Inbound news scrape does not need a new Route Handler** for v1 (manual/Cursor command). If later HTTP webhook/cron:

```ts
// app/api/news-ingest/route.ts (future) — pattern only
export async function POST(req: Request) {
  // auth → parseURL sources → write draft → return JSON
  return Response.json({ ok: true });
}
```

**Do not** introduce Contentlayer for this pipeline.

---

## recommended_api_patterns (synthesizer)

### A. Inbound free RSS → draft (RECOMMENDED v1)

```ts
const parser = new Parser({
  timeout: 15000,
  headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  customFields: { item: [["content:encoded", "contentEncoded"]] },
});

const feed = await parser.parseURL(sourceUrl);
const candidates = feed.items.map((item) => ({
  dedupeKey: String(item.guid || item.link),
  url: item.link,
  title: item.title,
  publishedAt: item.isoDate || item.pubDate,
  htmlBody: item.contentEncoded || item.content || item.description || "",
  excerpt: item.contentSnippet || "",
}));
// then: brand filter → human approve → TipTap/blog.json + optional TG
```

### B. Encoding-safe variant

```ts
const res = await fetch(sourceUrl, { headers: { "User-Agent": "EG-NewsBot/1.0" } });
const buf = Buffer.from(await res.arrayBuffer());
// detect charset from res.headers / <?xml encoding=...?> → decode to utf8 string
const feed = await parser.parseString(utf8Xml);
```

### C. Outbound (already shipped — do not re-architect)

Keep `buildBlogRssXml` + `/rss.xml`; ensure new blog posts from news pipeline land in same `getBlogPosts()` source so SEO RSS stays one feed.

---

## sources / versions

| Library | Context7 | Fallback | Role |
|---------|----------|----------|------|
| rss-parser | **blocked** (no MCP) | npm README known surface | inbound parse |
| feedsmith | **blocked** + unresolved | README patterns only | optional alt |
| next.js Route Handlers | not queried | workspace `app/rss.xml/route.ts` | outbound only |

**Re-run trigger:** enable Context7 MCP → `resolve-library-id` for `rss-parser`, `feedsmith`, optionally `/vercel/next.js` → ≤5 `query-docs` (parseURL, customFields, encoding, feedsmith parse API, Route Handler Response).

---

## confidence

| Area | Level | Why |
|------|-------|-----|
| rss-parser parseURL / items / guid / link | **medium** | Stable public API; not live-verified |
| Encoding / relative links / HTML description caveats | **high** (domain knowledge) | Universal RSS pitfalls; align with blog-rss absoluteUrl |
| feedsmith API | **low** | Context7 miss; README not fetched (contract: no WebFetch substitute) |
| Next outbound RSS | **high** | Verified in workspace source |
| Contentlayer | **n/a** | Explicit skip |

**Overall:** usable blocked brief for synthesizer — ship inbound on **rss-parser** + caveats; revisit feedsmith after Context7 or local `npm view`.
