# t-800-research-synthesizer — DEEP RETRY

> synthesized_at: 2026-07-28  
> topic: FREE-only Western RSS → RU EG adapt → blog eg.egoshev.ru + Telegram; SEO студия / курс / клуб  
> artifact_surface: cursor-workspace  
> families_compared: A (Cursor skill+command + curated YAML/OPML) · B (FreshRSS/Miniflux self-host + Automations) · C (scholarly PubMed + curated blogs only)  
> factory_write: none  
> constraints: no Inoreader Pro · no Twitter/FB scrape · HITL before publish · rewrite+cite · no medical promises

## Verdict (one line)

**Winner = Family A for v1** (slash-only skill+command polls allowlisted `feeds.yaml` / seed OPML → RU EG rewrite draft → human approve → `blog.json` TipTap draft + TG digest text) **+ C enrichment seeds** (PubMed×2 + verified journals) **+ B deferred** (FreshRSS XPath / Miniflux only when no-RSS or always-on poll needed).

---

## Comparison table (axes)

| axis | A Cursor poll + YAML/OPML | B FreshRSS/Miniflux + cron Automations | C Scholarly narrow + curated blogs | Winner bit |
|------|---------------------------|----------------------------------------|------------------------------------|------------|
| free_cost | Zero SaaS; npm MIT parse only | Free self-host (VPS ops cost) | Free (PubMed + publisher feeds) | **A** (lowest ops $) |
| cursor_fit | Native skill/command; vendor SoT | Automations cron later; no native RSS trigger | Same as A if curated list | **A** |
| human_approve | Draft MD + stop before publish; explicit OK | Same if designed; risk of always-on auto-push patterns | Same | **A** (simplest HITL) |
| legal_rewrite_cite | Title+link+snippet triage → rewrite+cite | Same ingest risk if full-text scrape | Safer (abstracts/ideas) | **A+C** |
| source_coverage | 10–40 curated; seed OPML | Best for HTML+XPath / bridges | Narrow but high Authority | **A+C seed**; B for gaps |
| nextjs_draft_fit | Direct → `data/blog.json` + TipTap + `/admin/blog` | Extra hop via export/webhook | Same as A | **A** |
| telegram_simplicity | Digest MD / text after HITL (NodeRSSBot patterns inverted) | Miniflux native TG / bots = auto-push risk | Digest of few items | **A** |
| seo_local_ru | Skill maps CTA silos студия/курс/клуб | Ops ≠ SEO | Authority cluster strong | **A** (CTA in rewrite) |
| ops_complexity | Lowest v1 | Docker/PHP/Postgres + maintain | Low if list tiny | **A** |
| no_rss_handling | Skip or manual paste v1 | FreshRSS XPath / RSS-Bridge / RSSHub | N/A (native feeds) | **B later** |
| security | Allowlist + env secrets + no auto_publish | AGPL patterns-only; cookies in OPML risk | Safer surface | **A** + ClawHub gates |
| freshness | On-demand poll; ETag/hash | Always-on | PubMed tokens can expire | **A+C** |
| brand_safety | alwaysApply medical bans + few-shot EG voice | Same if skill wraps | High Authority tone | **A** |

---

## Family winners / runners-up

### Overall approach winner: **Family A** (Cursor skill+command + curated feeds.yaml + seed OPML)

**why_best:** Maximizes `cursor_fit`, `human_approve`, `nextjs_draft_fit`, and `ops_complexity` for v1 while staying FREE and license-safe (MIT parse libs; no AGPL vendoring). Vendor docs: slash-only skill (`disable-model-invocation: true`), Automations cron later, hooks gate shell side-effects not editorial HITL. Repo mines: feedsmith/rss-parser + NodeRSSBot ETag/dedupe/TG *patterns* with auto-push inverted. News: ≥12 verified feeds ready for allowlist. ClawHub: PipePost/digest shapes with CRITICAL reject of auto_publish.

**runners_up:**
- **Family B as primary:** stronger `no_rss_handling` and always-on freshness, but higher ops, AGPL caution (FreshRSS/RSSHub patterns-only), and Automations have **no native RSS trigger** — still need webhook/export. Defer until anatolyfit-class or volume demands a hub.
- **Family C as primary:** excellent Authority/brand_safety and legal posture, but too thin for SEO breadth (studio/course/club Utility + Offer Bridge). Use as **enrichment layer inside A’s seed list**, not sole spine.

---

```yaml
status: ok
needs_more_sources: false
synthesis:
  recommended_approach: >
    v1 = Family A: Cursor slash-only skill+command polls curated feeds.yaml
    (seeded from verified Western OPML/list, 10–40 allowlisted URLs) →
    fetch/parse (rss-parser or feedsmith) with ETag/guid||link dedupe →
    triage digest MD → RU EG rewrite (schema-first TipTap-shaped draft + cite) →
    STOP for human approve → write draft into site-next data/blog.json via /admin/blog
    path OR draft artifact for paste; optional Telegram digest text after second OK.
    Family C seeds (PubMed×2 + journals) live inside the same allowlist.
    Family B (FreshRSS HTML+XPath / Miniflux / Automations cron) deferred to v2
    for no-RSS sites and always-on poll — patterns/docs only, no AGPL code vendor.
  why_best: >
    Wins free_cost, cursor_fit, human_approve, nextjs_draft_fit, telegram_simplicity,
    ops_complexity, security, and brand_safety simultaneously. Matches workspace
    (blog.json+TipTap, outbound rss.xml already exists). Vendor: no RSS Automations
    trigger — poll-in-skill is the correct v1 spine. Community+legal: rewrite+cite,
    not republish. News verified ≥8 feeds remove discovery blocker. ClawHub patterns
    without marketplace verbatim or auto_publish.
  runners_up:
    - name: "Family B — FreshRSS/Miniflux self-host + Cursor Automations cron as primary"
      why_weaker: >
        Higher ops; AGPL FreshRSS/RSSHub = patterns only; Automations lack native RSS
        trigger (webhook/export still required); Miniflux/NodeRSSBot-style auto TG push
        conflicts with EG HITL unless heavily inverted. Better as v2 hub for HTML+XPath.
    - name: "Family C — PubMed + Alerts + tiny curated blogs only as sole spine"
      why_weaker: >
        Strong Authority but weak Utility/Offer coverage for Moscow studio / course / club
        SEO silos; Google Alerts fragile (enrichment only). Keep as enrichment inside A.
    - name: "Paid Inoreader/Feedly/RSS.app as stack dependency"
      why_weaker: "Explicit constraint reject; community free-stack consensus sufficient."
    - name: "ClawHub RSS Ai Reader / NewsToday as installed spine"
      why_weaker: "auto_publish / unbounded fetch / cron alerts — security REJECT; patterns only."
  merge_plan: >
    FROM A (structure): skill+command poll → digest → rewrite → HITL → draft;
    feeds.yaml SoT; OPML interchange import/export; disable-model-invocation;
    short alwaysApply rule for medical bans; CTA silo tags (studio|course|club).
    FROM B (deferred bits): FreshRSS frss:* HTML+XPath outline schema documented in
    skill references for anatolyfit-class; Miniflux REST/webhook as optional v2
    Automations trigger; never vendor AGPL PHP; RSS-Bridge Unlicense preferred over
    RSSHub if bridge needed.
    FROM C (enrichment): PubMed Create RSS tokens + Cochrane/BJSM/JOSPT/Physio Network
    in starter allowlist; Google Alerts = optional triage folder only.
    FROM github/repo-miner: feedsmith MIT (OPML+parse) OR rss-parser MIT (parseURL,
    dedupe guid||link); NodeRSSBot ETag/304 + hash dedupe + TG HTML template + rate
    limit — invert auto-send to post-HITL only; plenary/xiangyu OPML = discovery seed
    not wholesale subscribe.
    FROM clawhub (patterns only): allowlisted feeds, dryRun, digest MD,
    scout→filter→draft→HITL→publish; skill shapes eg-rss-digest / eg-news-rewrite /
    eg-seo-blog-draft OR single eg-news-to-blog; NEVER auto_publish, NEVER secrets in SKILL.
    FROM vendor: XML source/brand/task prompting; schema-first draft object; few-shot
    EG voice; hooks gate shell/MCP publish side-effects; Automations cron after skill works.
    FROM community/news: rewrite+cite; RU SEO separate silos + modular CTA; own blog RSS
    → Дзен may need separate Zen schema later (workspace rss.xml ≠ auto-Zen).
    FROM docs: Context7 offline — prefer rss-parser known API; Contentlayer skip
    (blog.json+TipTap locked).
  conflicts:
    - id: poll_in_skill_vs_selfhost_first
      parties: "Community default FreshRSS hub vs strategist/repo-miner poll-in-skill v1"
      resolution: "Cursor vendor + ops_complexity + no RSS Automations trigger → A wins v1; B wins no_rss later"
      winner: "A for v1; B deferred"
    - id: one_skill_vs_split_pipeline
      parties: "Vendor prefer ONE eg-news-to-blog OR split digest→rewrite→draft"
      resolution: "v1 ONE skill with staged stops + one publish/approve command; split only if token bloat"
      winner: "ONE skill eg-news-to-blog + /eg-news-to-blog (+ optional /eg-news-approve)"
    - id: feedsmith_vs_rss_parser
      parties: "repo-miner prefers feedsmith; docs fallback prefers rss-parser"
      resolution: "Either MIT OK; pick one at factory — rss-parser if faster ship, feedsmith if OPML round-trip needed in-script"
      winner: "defer binary to factory; both allowed in architecture"
    - id: freshrss_agpl_vs_patterns
      parties: "Use FreshRSS code vs document XPath schema"
      resolution: "AGPL — patterns/docs citation only; no PHP vendor into skill/plugin"
      winner: "patterns-only"
    - id: zen_rss_vs_blog_rss
      parties: "Existing app/rss.xml vs Дзен unified schema mid-July 2026"
      resolution: "Inbound research OPML ≠ outbound Zen; Zen compliance = separate follow-up"
      winner: "keep outbound as-is for v1; flag Zen schema gap"
    - id: clawhub_autopublish
      parties: "Marketplace cron/TG push vs EG HITL"
      resolution: "EG policy + ClawHub CRITICAL flags → reject auto_publish"
      winner: "HITL mandatory"
  confidence: high
  sources_ranked:
    - {url: "https://cursor.com/docs/skills", score: 98, note: "slash-only skill SoT; disable-model-invocation"}
    - {url: "https://cursor.com/docs/cloud-agent/automations", score: 96, note: "cron later; NO native RSS trigger → A spine"}
    - {url: "https://cursor.com/docs/hooks", score: 95, note: "shell/MCP side-effect gates ≠ editorial HITL"}
    - {url: "https://github.com/FreshRSS/FreshRSS", score: 92, note: "HTML+XPath OPML schema for v2; AGPL patterns-only"}
    - {url: "https://github.com/fengkx/NodeRSSBot", score: 91, note: "ETag/dedupe/TG patterns; invert auto-push"}
    - {url: "https://github.com/miniflux/v2", score: 88, note: "Apache always-on alt; deferred"}
    - {url: "news-verified-2026-07-28 curl pass", score: 94, note: "≥12 YES feeds for starter allowlist"}
    - {url: "https://clawhub.ai/benzema216/rss-ai-reader", score: 78, note: "digest pattern; REJECT auto_publish"}
    - {url: "https://clawhub.ai/renchengxiang/rss-daily-digest", score: 80, note: "feed-sources + MD digest + HITL-safer offer"}
    - {url: "community FreshRSS±Bridge consensus", score: 86, note: "free stack; rewrite+cite; RU SEO silos"}
    - {url: "https://github.com/rbren/rss-parser", score: 85, note: "MIT parseURL; guid||link; docs Context7 miss"}
    - {url: "workspace site-next blog.json+TipTap+/admin/blog", score: 97, note: "draft target SoT; no Contentlayer"}
    - {url: "https://dzen.ru/help/ru/export-content/export.html", score: 72, note: "outbound Zen schema gap flagged"}
  recommended_architecture: >
    [feeds.yaml allowlist + optional OPML seed import]
         │  poll (skill script / agent shell, timeout, max_items, ETag/state.json)
         ▼
    [rss-parser | feedsmith] → items[] dedupe(guid||link)
         ▼
    digest-YYYY-MM-DD.md (triage: title, link, date, 1–3 sentence snippet only)
         ▼
    RU EG rewrite (schema: title, slug, tipTapBlocks[], seoCluster, sources[], cta)
         │  STOP — human approve in chat
         ▼
    draft → data/blog.json via /admin/blog OR draft file for paste
         + optional TG digest text (MCP/user-telegram) only after second OK
    Brand: alwaysApply short rule — no medical promises; rewrite+cite required.
    v2 optional: FreshRSS/Miniflux hub → webhook → Automations cron; XPath for HTML-only.
  free_source_starter_list:
    - {name: "Stronger by Science", url: "https://www.strongerbyscience.com/feed/", topic: "strength / evidence-based training", verified: true}
    - {name: "Barbell Medicine", url: "https://www.barbellmedicine.com/feed/", topic: "rehab + strength", verified: true}
    - {name: "PubMed biomechanics + rehabilitation", url: "https://pubmed.ncbi.nlm.nih.gov/rss/search/1RWu05bjNxKZc-uspFnyzUxoXj7-obifaggpke6Du1GJWG75z0/?limit=15&utm_campaign=pubmed-2&fc=20260728110546", topic: "rehab / biomechanics literature", verified: true}
    - {name: "PubMed longevity + exercise", url: "https://pubmed.ncbi.nlm.nih.gov/rss/search/1dcEXTzh6xeXf9pMUuVBKRbJm7VL7GTK-VglqBhBGUJ8DK69bV/?limit=15&utm_campaign=pubmed-2&fc=20260728110654", topic: "longevity + exercise literature", verified: true}
    - {name: "Fight Aging!", url: "https://www.fightaging.org/feed/", topic: "longevity science", verified: true}
    - {name: "Peter Attia MD", url: "https://peterattiamd.com/feed/", topic: "longevity / healthspan", verified: true}
    - {name: "Physio Network", url: "https://physio-network.com/feed/", topic: "rehab / MSK physio", verified: true}
    - {name: "Cochrane News", url: "https://www.cochrane.org/news/rss.xml", topic: "evidence synthesis", verified: true}
    - {name: "BJSM blog", url: "https://blogs.bmj.com/bjsm/feed/", topic: "sports medicine / rehab", verified: true}
    - {name: "Physiotutors", url: "https://www.physiotutors.com/feed/", topic: "physio education", verified: true}
    - {name: "Lifespan.io", url: "https://www.lifespan.io/feed/", topic: "longevity research news", verified: true}
    - {name: "InsideTracker blog", url: "https://blog.insidetracker.com/rss.xml", topic: "biomarkers / longevity-fitness", verified: true}
    - {name: "JOSPT ToC (RDF)", url: "https://www.jospt.org/action/showFeed?type=etoc&jc=jospt", topic: "orthopaedic & sports PT", verified: true}
  # community extras for next curation pass (not all curl-verified this run):
  # SbS already listed; Science for Sport; Buchheit; TrainingPeaks; ScienceDaily sports;
  # HRV4Training; Habr — add after verify.
  artifact_plan:
    skill: >
      eg-news-to-blog — progressive disclosure; disable-model-invocation: true;
      stages: load feeds.yaml → fetch/dedupe → digest MD → pick item(s) →
      RU EG rewrite schema + cite + seoCluster CTA → STOP before publish;
      references/: EG voice few-shots, medical ban list, FreshRSS XPath schema (docs),
      starter feeds; scripts/: optional fetch_feeds.ts with timeout/max_items/dryRun.
    command: >
      /eg-news-to-blog — primary invoke; optional /eg-news-approve for explicit
      publish/draft-write step after human OK (keeps publish out of model auto-path).
    rule: >
      Short alwaysApply (or globs on news/blog paths): no medical promises / diagnoses /
      «вылечим»; rewrite+cite required; no verbatim western full-text; no auto Telegram
      or blog publish without explicit user OK.
    agent: none
      # optional later thin orchestrator only if multi-skill split; v1 = skill+command enough
  risks:
    - "PubMed RSS token URLs may expire — document recreate recipe; re-verify periodically"
    - "JOSPT is RSS 1.0 RDF — parser must accept RDF or skip"
    - "Examine.com 429 / anatolyfit HTML-only — out of v1 allowlist; need B/XPath later"
    - "NIA/Buck/Stanford WAF intermittent — do not rely as backbone"
    - "AGPL FreshRSS/RSSHub — accidental code copy into repo = license risk"
    - "ClawHub-style cron auto_publish if Automations added carelessly"
    - "Copyright: sentence-level paraphrase farms ≠ safe; require EG angle + cite"
    - "Дзен outbound schema ≠ current /rss.xml — syndication gap if Zen is a goal"
    - "Context7 offline this pass — confirm rss-parser/feedsmith APIs at install"
    - "Unbounded feed growth — hard cap max_feeds + max_items + allowlist only"
  needs_more_sources: false
  gaps_for_lead: []
  # soft (non-blocking): re-enable Context7 for feedsmith exact exports; verify community extras (Buchheit, SFS, etc.) before adding to YAML
```

## Director handoff (prose)

**recommended_approach:** Один путь v1 — **Family A**: Cursor skill+command + `feeds.yaml` (seed из verified list) → digest → RU EG rewrite+cite → human OK → draft в `blog.json`/admin + опциональный TG текст. **C** внутри allowlist (PubMed + journals). **B** только v2 для no-RSS / always-on.

**merge_plan:** Структура и HITL из A; parse/ETag/TG patterns из mines; ClawHub pipeline shapes без auto_publish; vendor prompting + hooks; FreshRSS XPath schema в references на потом; Zen schema — отдельный follow-up.

**confidence: high** — согласны vendor + github/mines + community + news (≥2 families: A vs B vs C; ≥4 channel families).

**factory:** не вызывать из synthesizer; handoff → research-lead `research_brief` → prompt-craft → brain → factory.
