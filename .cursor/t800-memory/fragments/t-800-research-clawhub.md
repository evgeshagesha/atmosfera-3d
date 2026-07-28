# t-800-research-clawhub — DEEP RETRY

> scanned_at: 2026-07-28  
> hub: https://clawhub.ai/  
> intent: FREE RSS/news digest → rewrite → blog draft → Telegram (Cursor skills patterns)  
> rejected_verbatim: true  
> factory_write: none  
> note: RETRY — previous fragment (2026-07-24) was HITL/TG pipeline; this run replaces focus with RSS→digest→rewrite→blog→TG

## Tabs scanned

| Tab | Access | Notes |
|-----|--------|-------|
| Home | Partial | WebFetch timeout; Featured plugins known from prior + search |
| Top / Trending | Glance | Marketplace leaders = self-improve / browser / Skill Vetter — **not** RSS niche; niche cards via search API |
| New | Glance | `/api/newest` route missing on this host; used `/api/search` |
| Skills search | OK | `GET /api/search?q=RSS` etc. returned live cards |

## EG constraints applied

- Auto-publish без явного OK — **запрещён**
- Fetch только allowlisted feeds / OPML; без unbounded crawl
- Secrets (`bot_token`, Ghost keys, LLM keys) — только env / secrets, never SKILL.md
- Rewrite = brand voice EG (не verbatim чужих статей)
- FREE path: RSS/OPML + local scripts + Cursor skill/command + Telegram MCP HITL

---

## clawhub_findings

```yaml
status: ok
clawhub_findings:
  scanned_at: "2026-07-28"
  tabs: [top, trending, new]
  tab_glance:
    top_trending_signal: "Self-improve / Agent Browser / Skill Vetter dominate downloads — RSS/content cards are niche via search, not Top-25"
    new_signal: "API /api/newest unavailable; newest niche cards still discoverable via search (RSS, digest, PipePost)"
  rejected_verbatim: true
  items:
    - title: "Rss Ai Reader"
      url: "https://clawhub.ai/benzema216/rss-ai-reader"
      category: skill
      summary: "Subscribe RSS/Atom → LLM Chinese summaries → push Feishu/Telegram/Email; SQLite dedup; cron-capable."
      attribution: "ClawHub / benzema216 (BENZEMA)"
      freshness: ok
      security_flags:
        - "secrets_in_config: api_key / bot_token / webhook_url via env vars — good pattern; never embed in skill text"
        - "auto_publish: scheduled multi-channel push without HITL — CRITICAL for EG (disable or gate)"
        - "unbounded_fetch: feed list can grow; need max_feeds + hours window + allowlist"
      adapt_for_cursor: >
        Skill `eg-rss-digest`: frontmatter triggers (RSS, digest, morning brief);
        command `/eg-rss-digest` reads allowlisted feeds.yaml → fetch script (timeout/max_items)
        → summarize in Cursor → write digest MD to inbox → OPTIONAL Telegram MCP only after user OK.
        Map notify.telegram to CallMcpTool(user-telegram), never raw bot_token in repo.

    - title: "RSS Daily Digest"
      url: "https://clawhub.ai/renchengxiang/rss-daily-digest"
      category: skill
      summary: "feed-sources.md → python fetch/parse last 24h → one-sentence summaries + relevance score → Markdown digest; offer channel send."
      attribution: "ClawHub / renchengxiang"
      freshness: ok
      security_flags:
        - "shell_scripts: python3 fetch/format — sandbox paths; no curl|sh pipelines"
        - "fabrication_guard: skill claims never invent titles/URLs — keep as hard rule in Cursor skill"
        - "auto_publish: 'offer to send' is safer than auto-send — prefer explicit approve"
      adapt_for_cursor: >
        Split into skill (when/why + output schema) + scripts under repo tools/
        (fetch_feeds.py, format_digest.py). Command returns path to digest-YYYY-MM-DD.md.
        Cap 50 articles. Next step handoff: `/eg-content-rewrite` not auto-Telegram.

    - title: "NewsToday"
      url: "https://clawhub.ai/jiajiaoy/newstoady"
      category: skill
      summary: "Morning/evening briefing + breaking alerts; RSS + WebSearch; topic weights; deliver Telegram/Feishu/Slack/Discord."
      attribution: "ClawHub / jiajiaoy"
      freshness: ok
      security_flags:
        - "unbounded_fetch: WebSearch + multi-RSS + 2h breaking loop — high cost/noise; EG: on-demand only"
        - "auto_publish: daytime alerts every 2h — reject for brand channel without HITL"
        - "pii_scrape: hot-board scrape (Weibo/Zhihu) — avoid private/social scrape; public RSS only"
      adapt_for_cursor: >
        Pattern only: briefing template (10 items, 2-sentence summary, source URL).
        Skill modes: `morning` | `evening` | `on_demand`. No cron alerts in v1.
        Delivery = draft file; Telegram via HITL command `/eg-tg-preview`.

    - title: "AK RSS 24h Brief"
      url: "https://clawhub.ai/seandong/ak-rss-24h-brief"
      category: skill
      summary: "OPML URL/file → last N hours → categorized Chinese brief; workers/timeouts/max-feeds knobs."
      attribution: "ClawHub / seandong"
      freshness: ok
      security_flags:
        - "unbounded_fetch: default max_feeds=200 — must lower for FREE/local EG (e.g. 15–40)"
        - "opml_remote: fetching remote OPML = supply-chain risk; prefer local OPML in vault"
        - "shell: generate_brief.py — pin timeouts; no follow redirects to file://"
      adapt_for_cursor: >
        Command `/eg-rss-opml` with --opml-file path in project, --hours 24, --max-feeds 30,
        --max-items 12. Output brief MD with original titles+links preserved.
        OPML lives in `03_РЕСУРСЫ/` or site content config — not remote gist by default.

    - title: "Topic Monitor"
      url: "https://clawhub.ai/robbyczgw-cla/topic-monitor"
      category: skill
      summary: "RSS/Atom + GitHub releases + OPML import; keyword filters; importance scoring; Telegram channels for alerts/digests."
      attribution: "ClawHub / robbyczgw-cla"
      freshness: ok
      security_flags:
        - "secrets: openclaw config set channels.telegram.botToken — env only"
        - "auto_publish: alert_on + hourly frequency can spam channel — EG: digest queue only"
        - "shell: manage_topics.py import-opml — validate OPML before merge"
      adapt_for_cursor: >
        Adapt filters (required_keywords / exclude_keywords / boost_sources) into feeds.yaml schema.
        Skill does NOT alert live; writes scored candidates to queue for rewrite gate.
        Command `/eg-topic-score` → ranked JSON for synthesizer/blog draft skill.

    - title: "PipePost"
      url: "https://clawhub.ai/plugins/openclaw-pipepost"
      category: plugin
      summary: "Scout HN/Reddit/RSS/search → AI translate/adapt → publish webhook/Telegram/Markdown; YAML flow with validate step."
      attribution: "ClawHub / openclaw-pipepost"
      freshness: ok
      security_flags:
        - "CRITICAL auto_publish: destination telegram/webhook after validate — must insert HITL before publish"
        - "child_process CLI: TypeScript wraps Python CLI — audit shell args; no unsanitized URLs"
        - "secrets: webhook URLs and bot tokens in flow YAML — use env interpolation only"
        - "copyright: scout→translate→publish can republish others' work — EG: rewrite+attribution or original commentary only"
      adapt_for_cursor: >
        Steal pipeline shape only: scout → filter → score → draft(adapt) → validate → **HITL** → publish.
        Map destinations: Markdown file (blog draft in site-next) + Telegram MCP.
        Commands: `/eg-pipe-scout`, `/eg-pipe-draft`, `/eg-pipe-publish` (publish requires explicit confirm arg).

    - title: "RSS Feeds (openclaw-rss-feeds)"
      url: "https://clawhub.ai/homeofe/openclaw-rss-feeds"
      category: plugin
      summary: "Scheduled RSS/Atom digests; optional Ghost CMS draft + channel notify (telegram/whatsapp/discord); dryRun tool."
      attribution: "ClawHub / homeofe"
      freshness: ok
      security_flags:
        - "CRITICAL secrets: ghost adminKey (id:secret) + nvdApiKey in config examples — never commit"
        - "auto_publish: Ghost draft is safer than public post; still gate notify"
        - "dryRun: true — excellent pattern — require dry-run default in Cursor skill"
      adapt_for_cursor: >
        Pattern: `rss_run_digest` with dryRun default true → write draft MD/HTML locally
        (Next.js blog content or inbox). Ghost adapter optional later; EG site = file draft.
        Notify Telegram only after dryRun review. Schedule via Cursor Automation / cron outside agent.

    - title: "APAG Article Rewriter"
      url: "https://clawhub.ai/liujuntao123/article-rewriter"
      category: skill
      summary: "Rewrite/restructure articles with APAG (Attention/Perspective/Advantage/Gamify); adapt to channels; no fact invention."
      attribution: "ClawHub / liujuntao123"
      freshness: ok
      security_flags:
        - "low: prompt-only skill — still reject verbatim copy of APAG prose into EG skill"
        - "misinfo: rewrite can distort news facts — require source URL + 'facts locked' checklist"
      adapt_for_cursor: >
        Skill `eg-news-rewrite`: input = digest item (title, url, bullets) → output brand-voice draft
        for blog OR Telegram. Stages: lock facts → EG tone (calm/premium) → CTA to product ladder.
        Command `/eg-rewrite-item`. Never publish in same command.

    - title: "Content Writer (SEO) / Seo Blog Writer"
      url: "https://clawhub.ai/aaron-he-zhu/seo-content-writer"
      related_urls:
        - "https://clawhub.ai/automatelab/automatelab-seo-blog-writer"
        - "https://clawhub.ai/kambrosgroup/seo-content-engine"
      category: skill
      summary: "SEO draft/refresh pipelines; Seo Blog Writer adds scrub + FAQ schema + pluggable publish (Ghost/WP/static)."
      attribution: "ClawHub / aaron-he-zhu · automatelab · kambrosgroup"
      freshness: ok
      security_flags:
        - "auto_publish: platform adapters (Ghost Admin / WP REST) — CRITICAL gate for EG"
        - "secrets: CMS tokens in env only"
        - "hallucination: SERP/research claims — EG: cite RSS sources; no fake stats/med claims"
      adapt_for_cursor: >
        Blog stage skill `eg-seo-blog-draft`: digest pick → outline → MDX/MD for site-next
        (title, meta, H2, FAQ optional) → save under content path as draft.
        Publish command separate + HITL. Prefer static file output over live CMS API in v1 FREE stack.

  pipeline_map_for_synthesizer:
    free_stack:
      - "OPML/feeds.yaml allowlist (Topic Monitor + AK RSS patterns)"
      - "fetch+dedup+cap (RSS Daily Digest / Rss Ai Reader)"
      - "brief MD (NewsToday template)"
      - "rewrite brand voice (Article Rewriter pattern, not copy)"
      - "SEO blog draft file (Content Writer / Seo Blog Writer static adapter)"
      - "Telegram HITL publish (PipePost destination shape + dryRun from rss-feeds)"
    security_baseline:
      - "allowlisted feeds only; max_feeds + timeout + hours window"
      - "dryRun default; no cron auto-post to TG"
      - "secrets in env; never in SKILL.md / feeds committed with tokens"
      - "publish = separate command requiring explicit user confirmation"
      - "rewrite must preserve attribution/links; no medical promises (EG brand)"
      - "reject skills that shell-exec publish or scrape private chats"

  rejected_cards_note: |
    Buzz (zxcnny930/buzz): relevant real-time RSS→Telegram aggregator via REST;
    card fetch returned 500 — pattern noted (pollInterval + botToken/chatId) but not primary
    attribution item until page recoverable. Morning Brief (min870809/ai-morning-brief)
    similar to NewsToday — skipped as duplicate pattern.
```

## Cross-check (freshness)

| Source | published_or_updated | freshness | takeaway |
|--------|----------------------|-----------|----------|
| clawhub.ai/api/search?q=RSS | live 2026-07-28 | ok | Rss Ai Reader still indexed (downloads ~8k) |
| PipePost plugin page | live search 2026-07-28 | ok | End-to-end scout→translate→publish shape |
| AK RSS 24h / Topic Monitor | live search 2026-07-28 | ok | OPML + caps are the FREE feed-list pattern |
| Top-25 marketplace lists | 2026 blogs | ok (context only) | Top ≠ niche RSS; do not overfit trending |

## adaptation_notes (Cursor)

1. **Не ставить** один мега-skill «как PipePost» — 3 артефакта: `eg-rss-digest` (skill+command), `eg-news-rewrite` (skill), `eg-blog-draft` (skill) + publish command с HITL.  
2. **Tools:** Shell только для локального fetch-скрипта с allowlist; Telegram через MCP; blog = write files в site-next.  
3. **Запреты в SKILL.md:** auto-publish, unbounded URL fetch, secrets, медобещания, verbatim чужих статей.  
4. **Factory:** только после brain-lead; этот fragment = patterns only (`rejected_verbatim: true`).
