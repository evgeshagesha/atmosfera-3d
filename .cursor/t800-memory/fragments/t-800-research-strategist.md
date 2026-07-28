# t-800-research-strategist — search_plan

**Date:** 2026-07-28 (RETRY after connection failure)  
**Topic:** Free-only Western RSS/news → RU EG adapt → blog (eg.egoshev.ru) + Telegram; SEO: Moscow studio / course / club  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**artifact_surface:** cursor-workspace (`.cursor/`)  
**intent_artifact:** mix (skill + command; optional thin agent if multi-step justified)  
**mode:** deep

## Probe notes (strategist only — 2 WebSearch)

1. **Google Alerts RSS (2026):** still offers “Deliver to → RSS feed” (undocumented Atom URL). No Alerts API. Reliability = casual only (lags, misses). Treat as **enrichment**, not backbone.
2. **Free reader stack:** FreshRSS / Miniflux / TT-RSS consensus self-host; OPML portable. FreshRSS OPML extension includes **HTML+XPath** outlines — candidate for sites without native RSS (e.g. anatolyfit) without Twitter/FB scrape and without paid Inoreader.
3. **Feed catalogs:** `aiworkflowpro/awesome-rss-feeds-list` (validated OPML by category); CyberSEO Fitness RSS catalogue — seed for wellness OPML, not copy wholesale.
4. **Paid contrast only:** RSS.app / Feedly Pro / Inoreader Pro — skip as stack dependency.

## Workspace anchors (from prior scout / intake)

- Site: `01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next`
- Blog CMS: `data/blog.json` + TipTap blocks + `/admin/blog` (not Contentlayer/MDX)
- Outbound Zen RSS already: `app/rss.xml` + `lib/content/blog-rss.ts`
- Brand: Atmosfera 3D / EG — rewrite+cite, no medical promises
- v1: Cursor skill + command, human approve; Automations cron later

## Fan-out intent

Specialists must close: free source catalog + OPML, legal rewrite+cite, draft→admin/human gate, RU local SEO skeleton (studio/course/club), Telegram digest pattern, Cursor skill/command shape, optional FreshRSS HTML+XPath vs poll-in-skill.

```yaml
status: ok
search_plan:
  topic: "FREE-only Western RSS/blogs → RU adapt EG tone → Next.js blog drafts on eg.egoshev.ru + Telegram digest; SEO Moscow studio / online course / club; v1 Cursor skill+command, human approve"
  intent_artifact: mix
  mode: deep
  artifact_surface: cursor-workspace
  constraints:
    no_paid_aggregators: true   # Inoreader Pro / Feedly Pro / RSS.app not stack deps
    no_social_scrape: true      # Twitter/FB out of scope
    free_stack_only: true
    human_approve_before_publish: true
    copyright: rewrite_plus_cite
    brand_filter: no_medical_promises
    schedule_later: true        # Automations cron after skill works
  workspace_anchors:
    site: "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next"
    blog_store: "data/blog.json + TipTap ContentBlock + /admin/blog API"
    outbound_rss: "app/rss.xml/route.ts + lib/content/blog-rss.ts"
    brand: "Atmosfera 3D / EG — no medical promises"
    example_source_site: "anatolyfit.com (strength; may lack native RSS)"
  channels:
    - id: github
      priority: must
      why: "Core free stack: OPML feed lists, rss-parser/Node feed tooling, FreshRSS/Miniflux, Telegram RSS digests, awesome feed catalogs — without paid SaaS"
      specialist: t-800-research-github
      queries:
        - "awesome-rss OR awesome-feeds OR awesome RSS feeds OPML"
        - "aiworkflowpro awesome-rss-feeds-list OPML"
        - "rss-parser typescript OR node feed parser atom guid"
        - "FreshRSS OR Miniflux self-hosted RSS OPML"
        - "Next.js RSS ingest OR fetch RSS blog draft"
        - "Telegram bot RSS digest OR rss to telegram free Bot API"
        - "longevity OR biomechanics OR strength training OR rehabilitation RSS OPML"
        - "RSSHub OR feed generator free self-host missing RSS"
      sites_or_hubs:
        - "github.com/FreshRSS/FreshRSS"
        - "github.com/miniflux/v2"
        - "github.com/aiworkflowpro/awesome-rss-feeds-list"
        - "github.com topics: rss opml feed-reader"
        - "github.com search: awesome-rss"
        - "npm: rss-parser, feed, fast-xml-parser"
        - "github.com/DIYgod/RSSHub (optional free feed-gen)"
      expected_outputs:
        - "curated repos + stars/license/last commit"
        - "candidate OPML / YAML feed-list formats"
        - "2–4 repo-miner candidates with why"
        - "note RSSHub vs FreshRSS HTML+XPath for no-RSS sites"

    - id: repo-miner
      priority: must
      why: "DEEP minima ≥2 deep mines; extract poll/ETag/dedupe/OPML/draft-write/Telegram digest/full-text patterns"
      specialist: t-800-research-repo-miner
      queries:
        - "mine feed poll + ETag/Last-Modified + guid/link dedupe"
        - "mine OPML round-trip and subscription folders"
        - "mine FreshRSS HTML+XPath / cssFullContent for sites without RSS"
        - "mine RSS→markdown/JSON draft pipeline"
        - "mine Telegram channel digest from RSS items (Bot API only)"
        - "mine Readability/full-text when feed is summary-only"
      sites_or_hubs:
        - "EXPECTED_AFTER_GITHUB: FreshRSS/FreshRSS AND/OR miniflux/v2"
        - "EXPECTED: rss-parser consumer OR small Node/TS rss-to-blog / rss-digest CLI"
        - "EXPECTED_IF_PICKED: RSSHub (only if free self-host pattern beats FreshRSS XPath)"
      mine_focus:
        - "subscription SoT = OPML or YAML/JSON feed list (no SaaS)"
        - "legal: store source URL + title; rewrite not republish"
        - "human gate: draft status before publish"
        - "anatolyfit-class: HTML+XPath outline vs skip vs manual URL paste"
        - "Telegram: message template + rate limits + free Bot API only"
      note: "Prefer poll-in-skill for v1; self-host FreshRSS = optional later ops"

    - id: community
      priority: must
      why: "Lived free-stack consensus, rewrite+cite norms, RU local SEO for wellness studios, RSS→Telegram without paid tools"
      specialist: t-800-research-community
      queries:
        - "Inoreader alternative free OR self-hosted FreshRSS Miniflux Reddit"
        - "Google Alerts RSS still works 2025 OR 2026 unreliable"
        - "rewrite article from RSS fair use OR copyright blog SEO cite source"
        - "content syndication rewrite cite original source SEO"
        - "локальное SEO блог студия Москва OR Яндекс Дзен RSS"
        - "RSS Telegram дайджест бесплатно OR бот"
        - "Habr RSS агрегатор OR лента новостей без Inoreader"
        - "anatolyfit OR fitness blog discover RSS feed"
        - "FreshRSS HTML XPath scrape sites without RSS"
      sites_or_hubs:
        - "reddit.com/r/rss"
        - "reddit.com/r/selfhosted"
        - "reddit.com/r/SEO"
        - "news.ycombinator.com"
        - "habr.com"
        - "vc.ru (SEO / контент-маркетинг wellness)"
      expected_outputs:
        - "consensus free stack vs paid"
        - "legal norms: rewrite + attribution vs copy"
        - "RU local SEO angles: Москва студия, курс, клуб Евгения Гошева"
        - "community take on Google Alerts RSS fragility"

    - id: clawhub
      priority: must
      why: "Cursor skills marketplace patterns for RSS/content/SEO/Telegram; adapt not copy; security narrative for fetch+shell+auto-publish"
      specialist: t-800-research-clawhub
      queries:
        - "RSS"
        - "news digest"
        - "blog draft"
        - "content rewrite OR translate"
        - "Telegram"
        - "SEO article"
        - "OPML OR feed"
      sites_or_hubs:
        - "clawhub.ai"
        - "clawhub.ai tabs: Top, Trending, New"
      expected_outputs:
        - "3–8 cards with adapt_for_cursor"
        - "security_flags (unbounded fetch, auto-publish, secrets)"
        - "rejected_verbatim: true"

    - id: vendor-docs
      priority: must
      why: "Cursor skills/commands + Automations (no native RSS trigger); prompting patterns for brand-voice rewrite + structured draft + constraint 'no medical claims'"
      specialist: t-800-research-vendor-docs
      queries:
        - "Cursor Automations cron schedule webhook MCP"
        - "Cursor skills frontmatter disable-model-invocation commands"
        - "Cursor agent prompting brand voice structured draft"
        - "OpenAI cookbook structured outputs OR content rewriting citations"
        - "Anthropic prompting rewrite with constraints XML no medical claims"
      sites_or_hubs:
        - "cursor.com/docs/cloud-agent/automations"
        - "cursor.com/docs/skills"
        - "cursor.com/docs/agent/prompting"
        - "cursor.com/docs/agent/hooks (approve gates if relevant)"
        - "cookbook.openai.com (structured outputs / rewriting — idea seeds)"
        - "platform.claude.com docs prompt engineering (constraints, XML)"
      scope_note: "Cursor docs = primary. Skip Kie. Perplexity only if citation-search pattern emerges for source discovery."

    - id: docs
      priority: should
      why: "Library signal only if github picks a concrete parser; workspace already uses Route Handlers for outbound RSS; blog is JSON/TipTap not Contentlayer"
      specialist: t-800-research-docs
      queries:
        - "rss-parser npm usage parse URL items guid link"
        - "feed npm package Atom RSS generate parse"
        - "Next.js App Router Route Handlers response headers"
        - "ONLY IF NEEDED: contentlayer MDX blog — skip if confirm JSON CMS"
      sites_or_hubs:
        - "Context7: rss-parser"
        - "Context7: next.js (App Router only as needed)"
        - "Context7: feed (jpmonette) optional"
      skip_unless: "github finds a specific lib skill must wire"
      expected_outputs:
        - "parse API + caveats (encoding, relative links, HTML in description)"
        - "explicit: Contentlayer NOT required for this workspace"

    - id: news
      priority: must
      why: "Dated 2025–2026 free readers/Alerts/PubMed RSS; discover feeds for longevity/biohacking/nutrition/rehab/biomechanics; anatolyfit feed discovery; Zen publisher RSS notes"
      specialist: t-800-research-news
      queries:
        - "best free RSS readers 2025 2026 FreshRSS Miniflux"
        - "Google Alerts deliver to RSS feed still available undocumented"
        - "PubMed Create RSS feed longevity exercise biomechanics rehabilitation"
        - "how to find RSS feed when site has no icon anatolyfit.com"
        - "FreshRSS HTML XPath OR RSSHub free generate feeds missing sites"
        - "Yandex Zen RSS requirements for publishers"
        - "Examine.com OR Stronger by Science OR Barbell Medicine OR JOSPT RSS"
      sites_or_hubs:
        - "nlm.nih.gov PubMed Create RSS / pubmed.ncbi.nlm.nih.gov"
        - "google.com/alerts (verify RSS delivery option)"
        - "freshrss.github.io FreshRSS OPML HTML+XPath docs"
        - "anatolyfit.com (/feed, /rss, atom, sitemap, robots)"
        - "cyberseo.net Fitness RSS catalogue (seed URLs only)"
        - "docs.rsstodolist OR RSSHub docs (free generate)"
        - "selfhostwise / AlternativeTo FreshRSS Miniflux comparisons"
      expected_outputs:
        - "verified free source patterns table (native RSS | Google Alerts | PubMed | FreshRSS XPath | skip)"
        - "dated sources for coverage_matrix freshness"
        - "fallback policy when site has no RSS (no Twitter/FB scrape)"

    - id: custom
      priority: should
      why: "Domain feed seed list + RU SEO article architecture mapped to EG product ladder (studio / course / club) — not covered by generic Cursor docs"
      specialist: t-800-research-community
      label: "wellness-feed-catalog + RU SEO structure"
      queries:
        - "Examine.com RSS OR newsletter feed"
        - "Stronger by Science RSS"
        - "Barbell Medicine RSS"
        - "Physio Network OR JOSPT OR Cochrane exercise rehabilitation RSS"
        - "NIH OR PubMed exercise longevity RSS"
        - "структура SEO статьи локальный бизнес Москва студия + онлайн курс + клуб"
        - "внутренние ссылки клуб курс запись студия eg.egoshev.ru"
      sites_or_hubs:
        - "topic hubs: longevity, biohacking, nutrition, rehab, biomechanics, functional/strength"
        - "eg.egoshev.ru/blog (existing IA for internal link targets)"
        - "intake: anatolyfit.com as discovery test case"
      expected_outputs:
        - "seed feed list (URLs) for OPML/YAML v1 (~15–30 curated, not 8k dump)"
        - "article skeleton: H1, mechanism, EG method map (Диагностика→…), CTA studio/course/club, cite source"
        - "tone checklist: calm premium, no «вылечим»"

  compare_axes:
    - "free_cost_ceiling"            # $0 runtime; optional self-host on owned VPS only
    - "cursor_fit"                   # skill+command vs multi-step agent vs Automations-only
    - "human_approve_gate"           # draft-only, no auto-publish
    - "legal_rewrite_cite"           # rewrite+attribution vs republish risk
    - "source_coverage"              # curated OPML + Alerts enrichment + PubMed + XPath fallback
    - "nextjs_draft_fit"             # data/blog.json + admin API vs review markdown paste
    - "telegram_digest_simplicity"   # Bot API vs human-copy template from skill output
    - "seo_local_ru"                 # Moscow studio + course + club internal links
    - "ops_complexity"               # poll-in-skill vs FreshRSS vs RSSHub
    - "no_rss_site_handling"         # FreshRSS HTML+XPath vs RSSHub vs manual paste vs skip
    - "security"                     # unbounded fetch, SSRF, secrets, auto-publish
    - "freshness"                    # 2025–2026 dated sources
    - "brand_safety"                 # medical-claim filter + EG tone

  skip_channels:
    - id: paid_saas_deep_dive
      why: "Inoreader/Feedly Pro/RSS.app explicitly forbidden as stack dependency; mention only as contrast"
    - id: social_scrape
      why: "Twitter/FB scrape out of scope by brief"
    - id: contentlayer_deep
      why: "Workspace blog = data/blog.json + TipTap; Contentlayer/MDX not the CMS"
    - id: kie_grs_image
      why: "No image/video generation in v1 news→blog pipeline"
    - id: full_subagent_research
      why: "Intent = skill+command; agent only if synthesizer proves multi-step needs separate agent"
    - id: always_on_context7
      why: "docs channel is should/skip_unless lib chosen — not always-on"

  open_questions:
    - "Google Alerts RSS exists in 2026 but fragile — include as optional enrichment in OPML or exclude from v1?"
    - "anatolyfit / no-RSS sites: FreshRSS HTML+XPath (ops), free RSSHub self-host, manual URL paste into skill, or skip until native feed?"
    - "Telegram v1 default: Bot API post to channel draft, or skill outputs digest text for human paste?"
    - "Blog draft write path: skill patches data/blog.json / admin API, or writes review markdown for human paste into /admin/blog?"
    - "Is Timeweb VPS acceptable later for FreshRSS/Miniflux, or must v1 stay zero-infra (poll inside Cursor run only)?"
    - "PubMed abstracts: how aggressive is brand filter when adapting 'механизм/гипотеза' with cite (no medical claims)?"
    - "Seed OPML size for v1: hand-curated 15–30 feeds vs import lifestyle/sports subset from awesome-rss-feeds-list?"

  fan_out_order_hint:
    - "1 parallel: github + community + clawhub + vendor-docs + news (+ custom SEO/feeds with community)"
    - "2 after github picks: repo-miner ≥2 (prefer FreshRSS + one Node digest/parser consumer)"
    - "3 docs/Context7 if lib chosen"
    - "4 synthesizer compare ≥2 families → recommended_approach + merge_plan"

  synthesis_families_hint:
    - "A: Cursor skill+command polls curated OPML/YAML → RU EG rewrite draft → human approve → admin/blog + TG digest text"
    - "B: Self-host FreshRSS/Miniflux (OPML + optional HTML+XPath) + export/webhook → Cursor Automations cron"
    - "C: Narrow scholarly/news only (PubMed + Google Alerts RSS) + manually curated blog feeds"
    - "Merge likely: A for v1 + seed OPML from news/custom; B deferred for no-RSS sites; C as source enrichment; never paid SaaS"
```
