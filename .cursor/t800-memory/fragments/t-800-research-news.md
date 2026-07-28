# t-800-research-news — DEEP RETRY

**mode:** DEEP specialist (news/changelog pass)  
**topic:** FREE Western RSS → EG RU blog (longevity / biohacking / nutrition / rehab / biomechanics / strength)  
**memory_path:** `.cursor/t800-memory`  
**as_of:** 2026-07-28  
**status:** ok  
**probe_method:** `curl -L` HTTP status + XML sniff (`<rss` / `<feed` / `rdf:RDF`); PubMed via POST `/create-rss-feed-url/`

## Queries covered
- best free RSS readers 2025–2026 FreshRSS Miniflux
- Google Alerts RSS still available / fragility
- PubMed Create RSS (longevity / exercise / biomechanics / rehabilitation)
- find RSS when site has no icon; anatolyfit.com /feed /rss /atom
- FreshRSS HTML+XPath OR RSSHub for missing feeds
- Yandex Zen / Дзен RSS publisher requirements
- Examine.com · Stronger by Science · Barbell Medicine · JOSPT · Physio Network · Cochrane RSS

---

## CRITICAL: free_source_starter_list (verified 2026-07-28)

| feed_name | url | topic | verified | notes |
|-----------|-----|-------|----------|-------|
| Stronger by Science | https://www.strongerbyscience.com/feed/ | strength / evidence-based training | **yes** | HTTP 200, `application/rss+xml`, ~15 items. `/rss/` redirects here. |
| Barbell Medicine (site) | https://www.barbellmedicine.com/feed/ | rehab + strength medicine | **yes** | HTTP 200, RSS 2.0, ~10 items. Prefer this over `/blog/feed/` (empty channel). |
| PubMed: biomechanics + rehabilitation | https://pubmed.ncbi.nlm.nih.gov/rss/search/1RWu05bjNxKZc-uspFnyzUxoXj7-obifaggpke6Du1GJWG75z0/?limit=15&utm_campaign=pubmed-2&fc=20260728110546 | rehab / biomechanics literature | **yes** | Created via official UI API 2026-07-28; HTTP 200, 15 `<item>`. Tokenized URL — recreate if expires (see recipe below). |
| PubMed: longevity + exercise | https://pubmed.ncbi.nlm.nih.gov/rss/search/1dcEXTzh6xeXf9pMUuVBKRbJm7VL7GTK-VglqBhBGUJ8DK69bV/?limit=15&utm_campaign=pubmed-2&fc=20260728110654 | longevity + exercise literature | **yes** | Same day create; HTTP 200, 15 items. |
| Fight Aging! | https://www.fightaging.org/feed/ | longevity / rejuvenation science | **yes** | HTTP 200, RSS 2.0. |
| Peter Attia MD | https://peterattiamd.com/feed/ | longevity / healthspan | **yes** | HTTP 200, ~24 items. |
| Physio Network | https://physio-network.com/feed/ | rehab / MSK physio | **yes** | HTTP 200. Note: `/blog/feed/` → **404**. |
| Cochrane News | https://www.cochrane.org/news/rss.xml | evidence synthesis / health | **yes** | HTTP 200, RSS 2.0. `/news/feed` is HTML, not feed. |
| BJSM blog | https://blogs.bmj.com/bjsm/feed/ | sports medicine / rehab | **yes** | HTTP 200. |
| Physiotutors | https://www.physiotutors.com/feed/ | physio education | **yes** | HTTP 200. |
| Lifespan.io | https://www.lifespan.io/feed/ | longevity research news | **yes** | HTTP 200. |
| InsideTracker blog | https://blog.insidetracker.com/rss.xml | biomarkers / longevity-fitness | **yes** | HTTP 200. |
| JOSPT ToC (etoc) | https://www.jospt.org/action/showFeed?type=etoc&jc=jospt | orthopaedic & sports PT journal | **yes** | HTTP 200, **RSS 1.0 RDF** (not RSS 2.0). Readers that accept RSS 1.0 OK; else use FreshRSS. |
| NIA longevity topic | https://www.nia.nih.gov/taxonomy/term/400/feed | NIH / aging | **unknown** | First probe HTTP 200 + RSS; later probe **405** (bot/WAF). Treat as fragile — recheck from reader IP. |
| Buck Institute | https://www.buckinstitute.org/feed/ | aging research institute | **unknown** | First probe 200+RSS; later **403**. WAF intermittent. |
| Stanford Center on Longevity | https://longevity.stanford.edu/feed/ | longevity research | **unknown** | First probe 200+RSS; later **403**. |
| Examine.com | https://examine.com/feed/ | nutrition / supplements | **no** | Consistent **HTTP 429** (bot wall). No free public RSS confirmed. «Research Feed» is member HTML, not RSS. |
| anatolyfit.com | https://anatolyfit.com/feed (also /rss, /atom, /feed/atom, /index.xml) | fitness (example no-icon site) | **no** | All classic paths **404**. Homepage 200 = Next.js HTML; **no** `application/rss+xml` / `atom` link tags. **HTML-only → FreshRSS XPath or RSSHub/RSS-Bridge.** |

**Director count:** ≥8 concrete feeds with `verified: yes` (12 stable + 1 RDF journal + 2 PubMed tokens). Prefer OPML of the **yes** rows first; keep NIA/Buck/Stanford as secondary.

### PubMed Create RSS — recipe (documented 2025–2026, still live)

1. Open https://pubmed.ncbi.nlm.nih.gov/ → run search (e.g. `(longevity[Title/Abstract]) AND (exercise[Title/Abstract])`).
2. Click **Create RSS** under the search bar (no My NCBI login required).
3. Set name + item limit (UI; `limit=` editable up to 200 in URL).
4. Copy generated URL: `https://pubmed.ncbi.nlm.nih.gov/rss/search/<token>/?limit=15&utm_campaign=pubmed-2&fc=...`
5. Paste into FreshRSS / Miniflux.

Official reminders: NLM Tech Bull **2025-02-28** (Create RSS to replace homepage Latest Literature); Help → «Create an RSS feed for a search» (live). Machine create: `POST /create-rss-feed-url/` with CSRF + fields `name`, `limit`, `term`.

---

## Dated news notes (prefer ≤30d; hard ≤90d)

### 1) Free readers 2026 — FreshRSS vs Miniflux
| field | value |
|-------|-------|
| source | blog |
| url | https://ossalt.com/guides/freshrss-vs-miniflux-2026 |
| published | **2026-03** (methodology: data collected March 2026) |
| freshness | **ok** (≤90d from 2026-07-28) |
| claim | Both free/self-host; Miniflux = lighter Go default for solo; FreshRSS = PHP + extensions (incl. HTML scrape, multi-user, podcasts). Fever + Google Reader APIs on both. |
| impact_for_cursor | For EG news→blog pipeline: **FreshRSS preferred** if need HTML+XPath for sites like anatolyfit; Miniflux OK if all sources are native RSS. |

Also: https://freshrss.org/ (living) — lists «Web scraping» / generate feeds; https://miniflux.app/ (living).

### 2) Google Alerts RSS — available but fragile
| field | value |
|-------|-------|
| source | blog |
| url | https://cloro.dev/blog/google-alerts-api/ |
| published | **2026-07** (mentions July 2026 latency sample) |
| freshness | **ok** |
| claim | No Alerts API. UI still offers **Deliver to → RSS feed**. Undocumented, account-tied, can break; median Google News RSS lag ~6.6 days in July 2026 sample. Fine for casual keyword watch, not pipeline core. |
| impact_for_cursor | Do **not** make Google Alerts the spine of EG SEO pipeline; optional side-channel only. |

Cross-check: Google Help «Create an alert» still documents options (email primary; RSS via Show options in practice). Support page undated → do not treat as sole freshness.

### 3) Дзен / Zen publisher RSS — unified format 2026-07-13
| field | value |
|-------|-------|
| source | other (official help + community) |
| url | https://dzen.ru/help/ru/export-content/export.html |
| published | living docs; example `pubDate` uses **2026-03-04**; seamless RSS rules cited **effective 2026-07-13** |
| freshness | **ok** |
| claim | Export = **RSS 2.0**, HTTP(S), ≤10 MB, load ≤10s. Required: `title`, `link`, `pubDate` (RFC-822), full text via `yandex:full-text` or `content:encoded`; media via `enclosure` / `media:group` (not inside full-text). Fresh news window ~**7 days** for indexing (docs). Seamless News+channel: unified format; Teplitsa Yandex.News plugin abandoned — community replacements (e.g. Zhekich) cite cutoff **2026-07-13**. |
| impact_for_cursor | EG RU site RSS for Дзен must be **Zen-shaped**, separate from Western research OPML ingest. Next.js `/rss.xml` ≠ auto-Zen-compliant. |

Seamless overview: https://dzen.ru/help/ru/news/seamless/index.html · RSS detail: https://dzen.ru/help/ru/news/seamless/rss.html

### 4) Missing feeds — FreshRSS XPath / RSSHub
| field | value |
|-------|-------|
| source | changelog / github issues |
| url | https://github.com/FreshRSS/FreshRSS/issues/5947 (and #7179, #7440, #8429) |
| published | activity through **2025** (e.g. #7440 closed 2025-05-25; #8429 open discussion) |
| freshness | **warn** (issue dates 91–180d+) — pattern still current |
| claim | HTML+XPath brittle (JS-only sites, UA blocks, vague errors). FreshRSS maintainers point to **RSS-Bridge**, **RSSHub**, FiveFilters as bridges when scrape fails. User-Agent often required. |
| impact_for_cursor | anatolyfit / Examine-style sites → self-host RSSHub or FreshRSS XPath; do not expect public `/feed`. |

### 5) PubMed RSS still first-class (2025 docs)
| field | value |
|-------|-------|
| source | changelog (NLM Tech Bull) |
| url | https://www.nlm.nih.gov/pubs/techbull/jf25/jf25_pubmed_news.html |
| published | **2025-02-28** |
| freshness | **warn** (>90d) but feature reconfirmed live 2026-07-28 by creating feeds |
| claim | Homepage Latest Literature removed Mar 2025; NLM explicitly recommends **Create RSS** (no login) or My NCBI saved search. |
| impact_for_cursor | PubMed topic RSS = free, high-authority western signal for EG Authority content — keep in starter OPML. |

---

## Examine / podcast caveats
- **Examine.com:** no verified free article RSS (429). Paid Research Feed is web UI. Skip for free pipeline unless HTML bridge + ToS review.
- **Barbell Medicine Podcast** (audio, not blog): RedCircle hosting (podnews/grep.fm list RedCircle feed) — optional separate podcast OPML, not substitute for blog articles.
- **Stronger by Science Podcast:** Simplecast-hosted (podnews) — same caveat.

## anatolyfit.com — HTML-only fallback
```
verified_paths:
  /feed, /rss, /atom, /feed/atom, /index.xml → 404
  / → 200 Next.js HTML, no alternate RSS/Atom links
fallback:
  1. FreshRSS → Add feed → Type: HTML + XPath (article list selectors)
  2. Self-hosted RSSHub / RSS-Bridge route for generic site
  3. Do not block pipeline on this source
```

## EG pipeline implication (news-only)
Western free RSS (verified rows) → reader (FreshRSS) → human filter → RU Authority/Utility draft → site RSS for Дзен (separate Zen schema). Google Alerts = optional. Examine = skip free. anatolyfit = scrape bridge only.

---

## news_findings (machine)

```yaml
status: ok
as_of: "2026-07-28"
news_findings:
  - source: blog
    url: "https://ossalt.com/guides/freshrss-vs-miniflux-2026"
    published: "2026-03"
    freshness: ok
    claim: "FreshRSS vs Miniflux 2026: both free; Miniflux lighter solo; FreshRSS better for XPath/extensions/multi-user."
    impact_for_cursor: "Prefer FreshRSS for EG ingest if HTML-only sources needed."
  - source: blog
    url: "https://cloro.dev/blog/google-alerts-api/"
    published: "2026-07"
    freshness: ok
    claim: "Google Alerts RSS still exists via UI; no API; fragile; July 2026 sample shows multi-day lag."
    impact_for_cursor: "Do not rely on Alerts as primary western signal."
  - source: other
    url: "https://dzen.ru/help/ru/export-content/export.html"
    published: "2026-07-28-live"
    freshness: ok
    claim: "Дзен export = RSS 2.0 + full-text + enclosure rules; ≤10MB; ~7-day freshness window for news indexing."
    impact_for_cursor: "EG publisher RSS must be Zen-compliant, separate from research OPML."
  - source: other
    url: "https://dzen.ru/help/ru/news/seamless/rss.html"
    published: "2026-07-13-effective"
    freshness: ok
    claim: "Unified News+channel RSS format; seamless program rules active mid-July 2026."
    impact_for_cursor: "Update any Zen export templates after 2026-07-13 cutoff."
  - source: changelog
    url: "https://www.nlm.nih.gov/pubs/techbull/jf25/jf25_pubmed_news.html"
    published: "2025-02-28"
    freshness: warn
    claim: "NLM recommends PubMed Create RSS as free journal/topic follow after Latest Literature removal."
    impact_for_cursor: "PubMed topic feeds validated live 2026-07-28 — include in starter list."
  - source: other
    url: "https://pubmed.ncbi.nlm.nih.gov/help/"
    published: "2026-07-28-live"
    freshness: ok
    claim: "Help documents Create RSS under search box; limit up to 200 via URL param."
    impact_for_cursor: "Document recipe in skill/automation; tokens are opaque."
  - source: hn
    url: "https://github.com/FreshRSS/FreshRSS/issues/5947"
    published: "2025"
    freshness: warn
    claim: "HTML+XPath fails on JS/WAF sites; bridge via RSSHub/RSS-Bridge."
    impact_for_cursor: "anatolyfit / Examine-class sites need bridge, not native /feed."
  - source: other
    url: "https://www.strongerbyscience.com/feed/"
    published: "2026-07-28-probed"
    freshness: ok
    claim: "Verified free RSS 2.0 for evidence-based strength content."
    impact_for_cursor: "Top-tier free western source for EG strength/biomechanics Authority."
```

## stale_rejected
| item | reason |
|------|--------|
| PubMed RSS Tech Bull 2005 / 2020 alone | historical; superseded by 2025 help + live create |
| FeedSpot list pages as sole verification | aggregator; URLs truncated; use only as discovery, then curl |
| Examine Research Feed as RSS | HTML member product, not free feed |
| Google Support «Create an alert» undated page alone | undated → block as sole freshness; OK as secondary to 2026-07 blog |
