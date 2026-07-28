# t-800-research-github — FREE Western RSS → RU EG (shallow)

**status:** ok  
**budget_mode:** deep  
**pass:** RETRY  
**topic:** FREE-only Western RSS → RU EG adapt → blog eg.egoshev.ru + Telegram (no paid Inoreader)  
**handoff_repo_miner:** true  
**date:** 2026-07-28  

---

```yaml
status: ok
topic: "FREE Western RSS → RU EG adapt → blog + Telegram (skill+command v1)"
constraints:
  - no_paid_inoreader_feedly_pro: true
  - free_bot_api_ok: true
  - no_clone_this_pass: true
  - twitter_fb_scrape: out_of_v1

github_findings:
  - repo: "FreshRSS/FreshRSS"
    url: "https://github.com/FreshRSS/FreshRSS"
    stars: 15632
    license: "AGPL-3.0"
    last_activity: "2026-07-28"
    freshness: ok
    artifact_type: other
    snippet_summary: "Self-hosted PHP aggregator; OPML import/export; native HTML+XPath scraping for sites without RSS; can reshare selections as RSS/OPML; GReader API."
    adapt_for_cursor: "Optional later self-host hub; v1 skill can cite HTML+XPath as fallback pattern for anatolyfit-like sites. AGPL — do not vendor code into skill; document patterns only."

  - repo: "miniflux/v2"
    url: "https://github.com/miniflux/v2"
    stars: 9522
    license: "Apache-2.0"
    last_activity: "2026-07-24"
    freshness: ok
    artifact_type: other
    snippet_summary: "Minimalist Go reader; OPML; Atom/RSS/JSON Feed; REST API; native Telegram/Apprise/etc integrations; Postgres-backed."
    adapt_for_cursor: "Strong FREE alternative to Inoreader if EG later wants always-on poller. Apache-2.0 friendlier than AGPL. v1 skill should prefer API patterns over embedding Miniflux."

  - repo: "DIYgod/RSSHub"
    url: "https://github.com/DIYgod/RSSHub"
    stars: 45437
    license: "AGPL-3.0"
    last_activity: "2026-07-28"
    freshness: ok
    artifact_type: other
    snippet_summary: "Largest route-based RSS generator for sites without native feeds; self-host Docker; 5000+ public instances."
    adapt_for_cursor: "Use only when native RSS missing AND a maintained route exists. Prefer self-host over public instances for reliability. AGPL — patterns/docs only in skill."

  - repo: "RSS-Bridge/rss-bridge"
    url: "https://github.com/RSS-Bridge/rss-bridge"
    stars: 9120
    license: "Unlicense"
    last_activity: "2026-07-24"
    freshness: ok
    artifact_type: other
    snippet_summary: "PHP bridges for sites missing RSS; XPathAbstract pattern; Unlicense."
    adapt_for_cursor: "Lighter legal story than RSSHub for optional self-host. Pair with Miniflux/FreshRSS as feed URL source."

  - repo: "plenaryapp/awesome-rss-feeds"
    url: "https://github.com/plenaryapp/awesome-rss-feeds"
    stars: 2641
    license: "CC0-1.0"
    last_activity: "2026-06-18"
    freshness: ok
    artifact_type: other
    snippet_summary: "~500 recommended + country OPML; categories include Science, Sports, Tennis — NOT dedicated longevity/rehab."
    adapt_for_cursor: "Seed OPML hunting only; EG must hand-curate allowlist YAML. CC0 OK with attribution."

  - repo: "xiangyugongzuoliu/awesome-rss-feeds-list"
    url: "https://github.com/xiangyugongzuoliu/awesome-rss-feeds-list"
    stars: 108
    license: "CC0-1.0"
    last_activity: "2026-07-12"
    freshness: ok
    artifact_type: other
    snippet_summary: "HTTP-validated EN OPML by category (Science 368, Sports 404, Lifestyle 1166, etc.); Claude/Codex digest workflow examples; same content family as aiworkflowpro mirror."
    adapt_for_cursor: "Prefer this over aiworkflowpro/* (0 stars, license NOASSERTION on API). Pull en-science / en-lifestyle / en-sports OPML as discovery seed, then filter to EG topics."

  - repo: "aiworkflowpro/awesome-rss-feeds-list"
    url: "https://github.com/aiworkflowpro/awesome-rss-feeds-list"
    stars: 0
    license: "NOASSERTION (README claims CC0)"
    last_activity: "2026-07-12"
    freshness: ok
    artifact_type: other
    snippet_summary: "Strategist hub; README mirrors validated EN OPML catalog + AI digest prompt; GitHub stars=0."
    adapt_for_cursor: "Cross-check only; use xiangyugongzuoliu or plenary as primary feed-list sources."

  - repo: "rbren/rss-parser"
    url: "https://github.com/rbren/rss-parser"
    stars: 1524
    license: "MIT"
    last_activity: "2026-03-25"
    freshness: warn
    artifact_type: other
    snippet_summary: "Node/browser RSS→JS; TypeScript types; item.guid + link + isoDate; customFields."
    adapt_for_cursor: "Default parse dep for Cursor CLI/skill scripts. Dedup key: guid || link. stale_warning: last push ~125d — still de-facto standard; consider feedsmith as fresher alt."

  - repo: "macieklamberski/feedsmith"
    url: "https://github.com/macieklamberski/feedsmith"
    stars: 611
    license: "MIT"
    last_activity: "2026-07-27"
    freshness: ok
    artifact_type: other
    snippet_summary: "Modern TS parse+generate RSS/Atom/RDF/JSON Feed + OPML namespaces."
    adapt_for_cursor: "Stronger v1 candidate than aging rss-parser if skill needs OPML round-trip + generator for blog outbound feed."

  - repo: "jpmonette/feed"
    url: "https://github.com/jpmonette/feed"
    stars: 1399
    license: "MIT"
    last_activity: "2026-07-06"
    freshness: ok
    artifact_type: other
    snippet_summary: "Node RSS/Atom/JSON Feed generator (outbound syndication for eg.egoshev.ru blog)."
    adapt_for_cursor: "Use for publishing EG blog RSS, not ingest. Site already has rss.xml route — align with this lib if regenerating."

  - repo: "Rongronggg9/RSS-to-Telegram-Bot"
    url: "https://github.com/Rongronggg9/RSS-to-Telegram-Bot"
    stars: 2127
    license: "AGPL-3.0"
    last_activity: "2026-07-11"
    freshness: ok
    artifact_type: other
    snippet_summary: "Feature-rich Python Telegram RSS bot; OPML; media; Docker; seeking maintainers."
    adapt_for_cursor: "Reference UX only. v1 EG path = Cursor command → human approve → Bot API post; do not deploy full AGPL bot as core."

  - repo: "fengkx/NodeRSSBot"
    url: "https://github.com/fengkx/NodeRSSBot"
    stars: 406
    license: "MIT"
    last_activity: "2026-07-26"
    freshness: ok
    artifact_type: other
    snippet_summary: "TypeScript Telegram RSS bot; OPML import; Node stack aligns with site-next."
    adapt_for_cursor: "Best Node reference for digest/post patterns under MIT. Mine for dedup + sendMessage flow; skill should wrap thin CLI not full multi-user bot."

  - repo: "Yexiaoxing/rss-to-telegram"
    url: "https://github.com/Yexiaoxing/rss-to-telegram"
    stars: 0
    license: "MIT"
    last_activity: "2026-07-20"
    freshness: ok
    artifact_type: other
    snippet_summary: "Fresh Node service: poll RSS → Telegram; admin commands; optional OpenAI EN/ZH summary + Readability."
    adapt_for_cursor: "Closest shape to EG v1 (EN→RU adapt). Low stars — mine patterns carefully; prefer patterns over dependency."

  - repo: "iovxw/rssbot"
    url: "https://github.com/iovxw/rssbot"
    stars: 1698
    license: "Unlicense"
    last_activity: "2026-07-27"
    freshness: ok
    artifact_type: other
    snippet_summary: "Lightweight Rust Telegram RSS notifier."
    adapt_for_cursor: "Ops reference only; not TS stack."

  - repo: "ajdelaguila/opml-news-feeds"
    url: "https://github.com/ajdelaguila/opml-news-feeds"
    stars: null
    license: "unknown"
    last_activity: "unknown"
    freshness: warn
    artifact_type: other
    snippet_summary: "YAML bundles → OPML build scripts; free-first news; science-en category exists."
    adapt_for_cursor: "Format inspiration for EG feeds.yaml → OPML export. Not longevity-specific."

  - repo: "wlmzz/Feed-RSS"
    url: "https://github.com/wlmzz/Feed-RSS"
    stars: null
    license: "unknown"
    last_activity: "unknown"
    freshness: warn
    artifact_type: other
    snippet_summary: "Country/topic OPML including SportsNews.opml (ESPN etc.) — mass sports news, not biomechanics."
    adapt_for_cursor: "Low value for EG topical filter; skip as primary seed."

# --- curated table (markdown for lead) ---
# | name | url | stars | license | last | why |
# | FreshRSS | ... | 15632 | AGPL-3.0 | 2026-07-28 | HTML+XPath + OPML self-host |
# | Miniflux | ... | 9522 | Apache-2.0 | 2026-07-24 | API + Telegram integrations |
# | RSSHub | ... | 45437 | AGPL-3.0 | 2026-07-28 | Missing-RSS routes |
# | RSS-Bridge | ... | 9120 | Unlicense | 2026-07-24 | Missing-RSS bridges |
# | plenary awesome-rss | ... | 2641 | CC0 | 2026-06-18 | OPML categories |
# | xiangyu awesome-rss-list | ... | 108 | CC0 | 2026-07-12 | Validated EN OPML |
# | rss-parser | ... | 1524 | MIT | 2026-03-25 | Node ingest (warn) |
# | feedsmith | ... | 611 | MIT | 2026-07-27 | Modern TS parse+OPML |
# | jpmonette/feed | ... | 1399 | MIT | 2026-07-06 | Outbound blog RSS |
# | NodeRSSBot | ... | 406 | MIT | 2026-07-26 | Node TG patterns |
# | RSS-to-Telegram-Bot | ... | 2127 | AGPL | 2026-07-11 | Feature reference |
# | Yexiaoxing/rss-to-telegram | ... | 0 | MIT | 2026-07-20 | EN/ZH summary Node |

opml_yaml_recommendations:
  primary_runtime_format: "YAML allowlist (EG-owned), not raw mega-OPML"
  yaml_schema_v1:
    version: 1
    feeds:
      - id: "string-slug"
        title: "Source display name"
        xmlUrl: "https://.../feed"
        htmlUrl: "https://..."
        lang: "en"
        topics: ["longevity", "strength", "rehab", "biomechanics", "nutrition", "movement"]
        enabled: true
        fetch: "native_rss" # | rsshub_route | freshrss_html_xpath | page_fetch
        notes: "brand safety / paywall / scrape risk"
  opml_interop:
    - "Keep OPML 2.0 for import/export with Miniflux/FreshRSS/NetNewsWire"
    - "Required attrs: text + xmlUrl; type=rss; htmlUrl optional"
    - "Category via nested outline folders (e.g. longevity / strength)"
    - "Do not import 8k+ mega-OPML into v1 — noise destroys brand filter"
  discovery_seeds:
    - "xiangyugongzuoliu: feeds/en-science.opml, en-lifestyle.opml, en-sports.opml (manual filter)"
    - "plenaryapp: Science.opml, Sports.opml"
    - "Hand-add Western authority sites with native RSS (PubMed alerts out of v1)"
  eg_owned_file: "e.g. 03_РЕСУРСЫ/.../eg-western-feeds.yaml + optional export to .opml"

rsshub_vs_freshrss_html_xpath:
  summary: |
    Two complementary FREE paths when native RSS is missing (e.g. some fitness blogs):
  rsshub:
    role: "Route library for popular platforms / known sites"
    pros: ["Huge route catalog", "Self-host Docker", "Stable URL once route exists"]
    cons: ["AGPL", "Route may break", "Overkill if only 1–2 niche sites", "Public instances unreliable"]
    when: "Site already has an RSSHub route OR EG willing to maintain self-host"
  freshrss_html_xpath:
    role: "Native HTML+XPath (and CSS selector full-content) inside reader — PR #4220"
    docs: "https://freshrss.github.io/FreshRSS/en/users/11_website_scraping.html"
    pros: ["No separate bridge for simple list pages", "Can republish scraped items as RSS", "Good for one-off niche sites"]
    cons: ["Requires FreshRSS instance", "XPath brittle on redesign", "AGPL hub"]
    when: "anatolyfit-like site with list HTML but no feed; v1 can document XPath fields without requiring FreshRSS if skill does cheerio/xpath fetch instead"
  rss_bridge:
    role: "PHP bridges / XPathAbstract; Unlicense"
    when: "Prefer over RSSHub if legal simplicity + few bridges needed"
  v1_skill_recommendation: |
    Prefer native RSS. If missing: (1) RSS-Bridge or local cheerio/xpath in CLI,
    (2) FreshRSS HTML+XPath if self-hosting reader later,
    (3) RSSHub last for complex platforms. Twitter/FB scrape remains out of v1.

health_fitness_longevity_opml:
  dedicated_repos_found: false
  closest:
    - repo: "xiangyugongzuoliu/awesome-rss-feeds-list"
      files: ["feeds/en-science.opml", "feeds/en-lifestyle.opml", "feeds/en-sports.opml"]
      note: "Broad buckets — must filter; not biomechanics/rehab specific"
    - repo: "plenaryapp/awesome-rss-feeds"
      files: ["Science.opml", "Sports.opml", "Tennis.opml"]
      note: "Mass sports/news, low EG signal"
    - repo: "wlmzz/Feed-RSS"
      files: ["SportsNews.opml"]
      note: "ESPN-class sports news — skip for EG brand"
  conclusion: |
    No GitHub OPML repo specifically for longevity / biomechanics / rehab / strength science.
    EG must own curated YAML (10–40 feeds) from Western journals/blogs (e.g. Examine, Stronger by Science,
    Barbell Medicine, Physio Network if RSS exists, ACSM blogs, etc.) after HTTP validation.
  non_opml_adjacent:
    - "SkillMedev/health-and-longevity — Claude skills, not feeds"
    - "Visya/RSSidian — OPML→Obsidian pipeline pattern (digest), not health list"

nextjs_ingest_patterns:
  - "Decouple ingest from Next request lifecycle (worker/cron/CLI) — SenpaiAdri/AI-Blogpost, kateharwood/ai-news-tracker"
  - "Dedup upsert by guid|url into draft store; human approve before publish"
  - "site-next already has blog-rss outbound; inbound = Cursor command writing MDX/draft, not runtime fetch on page"

top_repos:
  - repo: "FreshRSS/FreshRSS"
    url: "https://github.com/FreshRSS/FreshRSS"
    why: "HTML+XPath + OPML + reshare RSS — deep mine scraping/OPML CLI for sites without feeds"
  - repo: "miniflux/v2"
    url: "https://github.com/miniflux/v2"
    why: "Apache-2.0 API-first reader + Telegram integrations — deep mine REST/OPML for FREE Inoreader replacement path"
  - repo: "fengkx/NodeRSSBot"
    url: "https://github.com/fengkx/NodeRSSBot"
    why: "MIT TypeScript Telegram RSS bot — deep mine Node digest/post/dedup for skill+command v1"
  - repo: "macieklamberski/feedsmith"
    url: "https://github.com/macieklamberski/feedsmith"
    why: "Fresh MIT TS parse+OPML+generate — deep mine as ingest library alternative to aging rss-parser"

handoff_repo_miner: true
repo_miner_scope:
  do:
    - "Tree OPML import/export + HTML+XPath config shape (FreshRSS)"
    - "Miniflux API endpoints for entries/feeds/OPML"
    - "NodeRSSBot: feed poll, guid dedup, sendMessage/channel post"
    - "feedsmith: parse API + OPML types"
  do_not:
    - "Clone into atmosfera-3d"
    - "Vendor AGPL code into Cursor skill"
    - "Treat mega-OPML as EG production feed list"

sources:
  - url: "https://github.com/FreshRSS/FreshRSS"
    published_or_updated: "2026-07-28"
    freshness: ok
    takeaway: "Self-host aggregator with HTML+XPath"
  - url: "https://github.com/FreshRSS/FreshRSS/pull/4220"
    published_or_updated: "2022-03" # historical PR; feature still documented 2026
    freshness: warn
    takeaway: "HTML+XPath feature origin; use current docs for adaptation"
  - url: "https://freshrss.github.io/FreshRSS/en/users/11_website_scraping.html"
    published_or_updated: "2026-07-28"
    freshness: ok
    takeaway: "Official scraping docs"
  - url: "https://github.com/miniflux/v2"
    published_or_updated: "2026-07-24"
    freshness: ok
    takeaway: "FREE API reader + Telegram"
  - url: "https://github.com/DIYgod/RSSHub"
    published_or_updated: "2026-07-28"
    freshness: ok
    takeaway: "Missing-RSS route generator"
  - url: "https://raw.githubusercontent.com/aiworkflowpro/awesome-rss-feeds-list/main/README.md"
    published_or_updated: "2026-07-12"
    freshness: ok
    takeaway: "Category OPML map + AI digest prompt pattern"
  - url: "https://github.com/xiangyugongzuoliu/awesome-rss-feeds-list"
    published_or_updated: "2026-07-12"
    freshness: ok
    takeaway: "Preferred starred CC0 validated OPML catalog"
  - url: "https://github.com/rbren/rss-parser"
    published_or_updated: "2026-03-25"
    freshness: warn
    takeaway: "guid field for dedup; TS types"
  - url: "https://github.com/fengkx/NodeRSSBot"
    published_or_updated: "2026-07-26"
    freshness: ok
    takeaway: "Node Telegram RSS MIT reference"

adaptation_notes: |
  Skill+command v1: YAML allowlist → fetch (rss-parser|feedsmith) → dedup guid|link →
  RU EG rewrite prompt (no med promises) → draft MDX for site-next + Telegram text →
  human approve → publish. Self-host FreshRSS/Miniflux/RSSHub = Phase B, not v1 blocker.
  License: MIT/Apache/CC0/Unlicense OK with attribution; AGPL = docs/patterns only.
```

## Verdict for lead / factory

1. **No dedicated longevity/biomechanics OPML repo** — EG owns curated YAML.  
2. **FREE stack exists**: OPML lists + Node parser + Bot API (+ optional Miniflux/FreshRSS).  
3. **Missing RSS**: RSSHub routes vs FreshRSS HTML+XPath vs RSS-Bridge — document all three; v1 prefer local fetch.  
4. **repo-miner**: FreshRSS, Miniflux, NodeRSSBot, feedsmith (4).  
5. **Do not** auto-import 8936-feed mega-OPML into production.
