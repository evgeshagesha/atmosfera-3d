# t-800-research-lead — DEEP research brief (RETRY)

**Date:** 2026-07-28  
**Project:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `.cursor/t800-memory`  
**artifact_surface:** cursor-workspace (`.cursor/`)  
**Intake:** `intake-briefs/eg-news-seo-pipeline.md`  
**Mode:** DEEP (RETRY after connection failure)  
**Progress:** Research ▸ strategist→6 specialists (+repo-miner 4 mines)→synthesis  
**coverage_matrix.verdict:** **pass**  
**Factory artifacts:** none (Director → brain/factory next; this lead does NOT call factory)

## Pipeline executed

1. `t-800-research-strategist` → search_plan (must: github, repo-miner, community, clawhub, vendor-docs, news; should: docs, custom SEO)
2. Parallel specialists: github · community · clawhub · vendor-docs · news
3. After github: `repo-miner` ≥4 (FreshRSS, NodeRSSBot, feedsmith, miniflux)
4. `docs` (Context7): **blocked** MCP offline — npm fallback recorded; channel=should
5. `t-800-research-synthesizer` → Family A winner + merge_plan
6. coverage_matrix → **pass**

## Director deliverables (summary)

| # | Deliverable | Verdict |
|---|-------------|---------|
| 1 | recommended_architecture | Family A: feeds.yaml → parse → digest → RU EG rewrite → HITL → blog draft + optional TG |
| 2 | free_source_starter_list | ≥13 curl-verified YES feeds (2026-07-28) |
| 3 | artifact_plan | skill `eg-news-to-blog` + command `/eg-news-to-blog` (+ optional approve) + short brand rule; **agent: none** |
| 4 | risks | copyright rewrite+cite; no medical promises; PubMed token expiry; AGPL patterns-only; no auto_publish |
| 5 | coverage_matrix | **PASS** · research_mode=DEEP |

---

```yaml
research_brief:
  mode: deep
  topic: "FREE-only Western RSS/blogs → RU adapt EG tone → blog pages eg.egoshev.ru + Telegram; SEO Moscow studio / course / club; v1 skill+command HITL"
  artifact_surface: cursor-workspace
  search_plan:
    status: ok
    intent_artifact: mix
    must_channels: [github, repo-miner, community, clawhub, vendor-docs, news]
    should_channels: [docs, custom]
    skip: [paid_saas, social_scrape, contentlayer_deep, kie_grs, always_on_context7]
    synthesis_families_hint: [A_cursor_poll, B_selfhost_freshrss, C_scholarly_narrow]
  synthesis:
    recommended_approach: >
      v1 Family A: slash-only skill+command polls curated feeds.yaml (10–40 allowlisted
      Western feeds) → rss-parser|feedsmith parse + ETag/guid||link dedupe → digest MD
      (title/link/snippet only) → RU EG rewrite schema (TipTap-shaped + cite + seoCluster
      CTA studio|course|club) → STOP human approve → draft into site-next data/blog.json
      via /admin/blog OR paste file; optional Telegram digest text after second OK.
      Family C (PubMed×2 + journals) inside same allowlist. Family B (FreshRSS XPath /
      Miniflux / Automations cron) deferred v2 for HTML-only / always-on — patterns only,
      no AGPL vendor.
    why_best: >
      Wins free_cost, cursor_fit, HITL, nextjs draft fit, ops simplicity, security vs
      auto_publish. Vendor: no native RSS Automations trigger → poll-in-skill is correct
      v1 spine. Workspace already blog.json+TipTap+/rss.xml. ≥12 verified free feeds.
    runners_up:
      - "B FreshRSS/Miniflux+Automations as primary — higher ops; no RSS trigger; AGPL; auto-push risk"
      - "C PubMed-only spine — Authority OK, SEO silos thin"
      - "Paid Inoreader/Feedly — constraint reject"
      - "ClawHub auto-publish skills as spine — security reject"
    merge_plan: >
      A structure+HITL; mines parse/ETag/TG invert auto-send; ClawHub pipeline shapes
      without verbatim; vendor XML+schema+few-shot+hooks; C enrichment seeds; B XPath
      schema in references only; Zen outbound schema = separate follow-up.
    confidence: high
    conflicts_resolved:
      - "A v1 vs B hub → A wins v1; B for no_rss later"
      - "ONE skill eg-news-to-blog + optional approve command"
      - "feedsmith vs rss-parser → either MIT; factory picks"
      - "HITL mandatory; no auto_publish"
  recommended_architecture: |
    [feeds.yaml allowlist + optional OPML import]
         │  poll (timeout, max_feeds, max_items, ETag/state.json, dryRun)
         ▼
    [rss-parser | feedsmith] → items[] dedupe(guid||link)
         ▼
    digest-YYYY-MM-DD.md (title, link, date, 1–3 sentence snippet ONLY)
         ▼
    RU EG rewrite → {title, slug, tipTapBlocks[], seoCluster, sources[], cta}
         │  STOP — human approve
         ▼
    draft → data/blog.json (/admin/blog) OR review MD for paste
         + optional TG digest text (after second OK)
    Brand rule: no medical promises; rewrite+cite required.
    v2: FreshRSS/Miniflux hub → webhook → Automations; XPath for anatolyfit-class.
  free_source_starter_list:
    - {name: "Stronger by Science", url: "https://www.strongerbyscience.com/feed/", topic: "strength", verified: true}
    - {name: "Barbell Medicine", url: "https://www.barbellmedicine.com/feed/", topic: "rehab+strength", verified: true}
    - {name: "PubMed biomechanics+rehab", url: "https://pubmed.ncbi.nlm.nih.gov/rss/search/1RWu05bjNxKZc-uspFnyzUxoXj7-obifaggpke6Du1GJWG75z0/?limit=15&utm_campaign=pubmed-2&fc=20260728110546", topic: "literature", verified: true}
    - {name: "PubMed longevity+exercise", url: "https://pubmed.ncbi.nlm.nih.gov/rss/search/1dcEXTzh6xeXf9pMUuVBKRbJm7VL7GTK-VglqBhBGUJ8DK69bV/?limit=15&utm_campaign=pubmed-2&fc=20260728110654", topic: "literature", verified: true}
    - {name: "Fight Aging!", url: "https://www.fightaging.org/feed/", topic: "longevity", verified: true}
    - {name: "Peter Attia MD", url: "https://peterattiamd.com/feed/", topic: "longevity", verified: true}
    - {name: "Physio Network", url: "https://physio-network.com/feed/", topic: "rehab", verified: true}
    - {name: "Cochrane News", url: "https://www.cochrane.org/news/rss.xml", topic: "evidence", verified: true}
    - {name: "BJSM blog", url: "https://blogs.bmj.com/bjsm/feed/", topic: "sports med", verified: true}
    - {name: "Physiotutors", url: "https://www.physiotutors.com/feed/", topic: "physio edu", verified: true}
    - {name: "Lifespan.io", url: "https://www.lifespan.io/feed/", topic: "longevity", verified: true}
    - {name: "InsideTracker blog", url: "https://blog.insidetracker.com/rss.xml", topic: "biomarkers", verified: true}
    - {name: "JOSPT ToC RDF", url: "https://www.jospt.org/action/showFeed?type=etoc&jc=jospt", topic: "PT journal", verified: true}
  free_source_rejected_or_deferred:
    - {name: "Examine.com", url: "https://examine.com/feed/", reason: "HTTP 429 — no free public RSS"}
    - {name: "anatolyfit.com", url: "https://anatolyfit.com/feed", reason: "HTML-only Next.js; XPath/RSS-Bridge v2"}
    - {name: "Google Alerts RSS", reason: "fragile enrichment only — not spine"}
  artifact_plan:
    skill: "eg-news-to-blog (disable-model-invocation: true; stages digest→rewrite→STOP; references EG voice + bans + XPath schema docs; optional fetch script)"
    command: "/eg-news-to-blog (+ optional /eg-news-approve for draft-write after human OK)"
    rule: "short alwaysApply/globs: no medical promises; rewrite+cite; no auto TG/blog publish"
    agent: none
  risks:
    - "Copyright: rewrite+cite + EG angle only — never full-text republish of Western articles"
    - "Brand: no medical promises / diagnoses / «вылечим» — enforce in rule + skill checklist"
    - "PubMed tokenized feed URLs may expire — document Create RSS recipe; re-verify"
    - "JOSPT RSS 1.0 RDF — parser must accept RDF or skip feed"
    - "AGPL FreshRSS/RSSHub — patterns/docs only; never vendor PHP into repo"
    - "ClawHub/Automations auto_publish if cron added carelessly — HITL mandatory"
    - "Unbounded fetch — hard cap max_feeds + max_items + allowlist only"
    - "Дзен outbound schema ≠ current /rss.xml — separate if Zen syndication is a goal"
    - "Context7 offline this pass — confirm parser APIs at factory install"
  sources:
    - {url: "https://cursor.com/docs/skills", freshness: ok, family: vendor}
    - {url: "https://cursor.com/docs/cloud-agent/automations", freshness: ok, family: vendor}
    - {url: "https://cursor.com/docs/hooks", freshness: ok, family: vendor}
    - {url: "https://github.com/FreshRSS/FreshRSS", freshness: ok, family: github}
    - {url: "https://github.com/fengkx/NodeRSSBot", freshness: ok, family: github}
    - {url: "https://github.com/macieklamberski/feedsmith", freshness: ok, family: github}
    - {url: "https://github.com/miniflux/v2", freshness: ok, family: github}
    - {url: "https://github.com/rbren/rss-parser", freshness: warn, family: github}
    - {url: "https://ossalt.com/guides/freshrss-vs-miniflux-2026", freshness: ok, family: news, dated: "2026-03"}
    - {url: "https://cloro.dev/blog/google-alerts-api/", freshness: ok, family: news, dated: "2026-07"}
    - {url: "https://dzen.ru/help/ru/export-content/export.html", freshness: ok, family: news}
    - {url: "https://www.nlm.nih.gov/pubs/techbull/jf25/jf25_pubmed_news.html", freshness: warn, family: news, dated: "2025-02-28"}
    - {url: "news-curl-verified-feeds-2026-07-28", freshness: ok, family: news, count: 13}
    - {url: "https://clawhub.ai/benzema216/rss-ai-reader", freshness: ok, family: clawhub}
    - {url: "https://clawhub.ai/renchengxiang/rss-daily-digest", freshness: ok, family: clawhub}
    - {url: "community FreshRSS±Bridge + rewrite+cite + RU SEO silos", freshness: ok, family: community}
    - {url: "workspace site-next blog.json+TipTap+/admin/blog+/rss.xml", freshness: ok, family: local}
  github:
    handoff_repo_miner: true
    top_repos: [FreshRSS/FreshRSS, miniflux/v2, fengkx/NodeRSSBot, macieklamberski/feedsmith]
    note: "No dedicated longevity OPML — EG owns feeds.yaml; discovery seed from plenary/xiangyu OPML"
  repo_mines:
    count: 4
    repos: [FreshRSS/FreshRSS, fengkx/NodeRSSBot, macieklamberski/feedsmith, miniflux/v2]
    v1_extract: "feedsmith|rss-parser + NodeRSSBot ETag/hash/TG patterns (HITL invert) + FreshRSS XPath schema docs-only"
  community:
    consensus: "FreshRSS±Bridge + OPML free stack; rewrite+cite; Alerts enrichment-only; SEO silos studio/course/club"
  clawhub:
    rejected_verbatim: true
    cards: 8
    security_baseline: "allowlist; dryRun; no cron auto TG; secrets env; publish separate confirm"
  vendor_docs:
    skill_slash_only: true
    automations_rss_trigger: false
    idea_seeds: [disable-model-invocation, XML constraints, schema-first, hooks gate publish shell]
  docs:
    context7: blocked
    fallback: "rss-parser parseURL / guid||link; Contentlayer NOT required"
  news:
    as_of: "2026-07-28"
    verified_yes: 13
    anatolyfit: html_only
    examine: http_429
  coverage_matrix:
    strategist: pass
    synthesizer: pass
    github_shallow: pass
    repo_mines: pass
    community: pass
    clawhub: pass
    vendor_docs: pass
    context7_docs: skip   # should-channel; MCP offline; npm fallback used
    news: pass
    sources_count: 17
    verified_feeds_count: 13
    repo_mines_count: 4
    verdict: pass
  adaptation_plan: >
    Ship workspace skill eg-news-to-blog + /eg-news-to-blog (+ optional approve) + short
    brand rule; seed feeds.yaml from verified list; scripts optional fetch with caps;
    never auto-publish; defer FreshRSS self-host and anatolyfit XPath to v2; flag Zen
    schema gap separately from inbound OPML.
  open_questions:
    - "Draft write path: patch blog.json/admin API vs review MD for human paste? (factory/HITL)"
    - "Telegram v1: MCP post after OK vs digest text for human paste?"
    - "Parser pick: rss-parser (faster) vs feedsmith (OPML round-trip) — factory binary"
    - "Timeweb VPS for FreshRSS later — yes/no for v2 ops"
  stale_rejected: []
  confidence: high
  next: "prompt-craft → brain-lead → factory (Director orchestrates; research-lead done)"
```

## Specialist fragment index

| Specialist | Fragment |
|------------|----------|
| strategist | `fragments/t-800-research-strategist.md` |
| github | `fragments/t-800-research-github.md` |
| repo-miner | `fragments/t-800-research-repo-miner.md` |
| community | `fragments/t-800-research-community.md` |
| clawhub | `fragments/t-800-research-clawhub.md` |
| vendor-docs | `fragments/t-800-research-vendor-docs.md` |
| news | `fragments/t-800-research-news.md` |
| docs | `fragments/t-800-research-docs.md` (Context7 blocked) |
| synthesizer | `fragments/t-800-research-synthesizer.md` |
