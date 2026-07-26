# t-800-research-strategist — search_plan

**scanned_at:** 2026-07-24  
**workspace:** /Users/egoshev/Projects/atmosfera-3d  
**memory_path:** /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory  
**mode:** DEEP  
**artifact_surface:** cursor-workspace  
**status:** ok

## Probe notes (1–2 searches only)

- Cursor skills: official docs + agentskills.io progressive disclosure; HITL via stage gates / `disable-model-invocation` for publish.
- Strong Cursor precedent: `loganriebel/seo-content-stack` (staged pipeline + human gates).
- PDF dark theme: `ogclau/ReportLabStyleSuite`, `reportlab-json-renderer` (LLM→JSON→PDF); digest: `sliday/telegram-ai-digest`.
- SkillMD `hitl-approval` pattern (agent proposes → human approves) — adapt, no verbatim copy.

## Capabilities in scope (factory later — NOT now)

1. Channel Content Pipeline (HITL approve before publish)
2. EG Topic PDF Skill (premium dark + cyan)
3. Trend Adapter (western trends → EG adaptation)

## Backlog / optional (mention only)

- Mini App, SEO site, YouTube — later channels; RE-EXPERT Mini App = anti-example «не сейчас».

---

```yaml
status: ok
search_plan:
  topic: "Cursor artifacts (skills/commands/rules) + content automation patterns for EG / Atmosfera 3D / Telegram bot — Channel Content Pipeline HITL, EG Topic PDF Skill, Trend Adapter"
  intent_artifact: mix
  mode: deep
  artifact_surface: cursor-workspace
  project: /Users/egoshev/Projects/atmosfera-3d
  product_context:
    bot: "@EGoshev_bot"
    channel: "@EvgeniiGoshev"
    funnel: "guide → test684 → level PDFs → 1990/9990/club/studio"
    hard_constraint: "auto-publish without explicit OK is forbidden"
    ux_refs:
      - "TrueSpace (PDF on /start)"
      - "digest channels"
      - "RE-EXPERT Mini App = anti-example (not now)"
    backlog_optional_later:
      - Mini App
      - SEO
      - YouTube
  capabilities_focus:
    - id: channel-content-pipeline
      summary: "news/digest → draft → approve → publish (HITL)"
    - id: eg-topic-pdf-skill
      summary: "premium blog-topic PDF dark minimalism cyan accent"
    - id: trend-adapter
      summary: "western trends → EG adaptation (no copypaste)"
  channels:
    - id: vendor-docs
      priority: must
      why: "Cursor docs = source of truth for skills vs rules vs commands, SKILL.md frontmatter, progressive disclosure, slash invocation; cookbooks seed Trend Adapter prompting patterns (adapt, don't copy)."
      specialist: t-800-research-vendor-docs
      freshness: "prefer docs/changelog updated 2025-H2..2026; flag pre-skills Cursor guidance as stale"
      queries:
        - "Cursor Agent Skills SKILL.md frontmatter disable-model-invocation"
        - "Cursor rules vs skills vs commands migrate-to-skills"
        - "Cursor agent prompting best practices approval gates"
        - "OpenAI Cookbook structured outputs content pipeline agent"
        - "Claude prompt engineering brand voice adaptation rewrite"
        - "Gemini prompting strategies rewrite localize cultural adaptation"
      sites_or_hubs:
        - "https://cursor.com/docs/skills"
        - "https://cursor.com/help/customization/skills"
        - "https://cursor.com/docs/agent/prompting"
        - "https://cursor.com/docs (rules, commands, hooks)"
        - "https://cookbook.openai.com/"
        - "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
        - "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      notes: "DEEP multi-model minimum: Cursor + ≥2 cookbooks (OpenAI + Claude or Gemini) for Trend Adapter idea_seeds. Not always-on Kie."

    - id: github
      priority: must
      why: "Working examples of staged content pipelines, HITL gates in Cursor skills, Telegram digest bots, dark-theme PDF engines — needed for top_repos → miner."
      specialist: t-800-research-github
      freshness: "prefer repos with commits/releases 2024–2026; stars secondary to fit"
      queries:
        - "Cursor skills SKILL.md content pipeline human approval"
        - "seo-content-stack Cursor skills human gates"
        - "telegram AI digest bot reportlab PDF"
        - "reportlab dark theme neon PDF generator"
        - "weasyprint dark mode PDF template"
        - "content localization adaptation rewrite skill agent"
        - "HITL approval agent skill SKILL.md"
        - "telegram channel autopost draft approve workflow"
      sites_or_hubs:
        - "github.com"
        - "github.com/topics/cursor-skills"
        - "github.com/topics/agent-skills"
      top_repos_hints:
        - repo: "loganriebel/seo-content-stack"
          why: "gstack-style Cursor skills; staged research→publish with human gates — primary pattern mine for Channel Content Pipeline"
        - repo: "ogclau/ReportLabStyleSuite"
          why: "Professional + Dark Neon ReportLab themes — visual precedent for EG PDF skill"
        - repo: "sliday/telegram-ai-digest"
          why: "Telegram channel digest → LLM JSON → PDF/Telegraph publish — pipeline shape for digest→draft"
        - repo: "agentskills / anthropic agent skills examples"
          why: "SKILL.md open standard examples (if discoverable) — structure/frontmatter"
        - note: "Also score reportlab-json-renderer (PyPI/GitHub) for LLM→JSON→PDF without agent writing layout code"
      expected_output: "ranked shortlist ≥5 repos with fit scores per capability"

    - id: repo-miner
      priority: must
      why: "DEEP minima: ≥2 deep mines when github=must. Extract stage schemas, HITL wording, PDF theme tokens, adaptation prompts — patterns only."
      specialist: t-800-research-repo-miner
      freshness: "mine current default branch; note last commit date"
      queries:
        - "human gate / approve before publish patterns in skill markdown"
        - "stage artifact paths draft→review→publish"
        - "dark theme color tokens PDF layout"
        - "brand voice / rewrite adaptation prompts"
      sites_or_hubs:
        - "github.com/loganriebel/seo-content-stack"
        - "github.com/ogclau/ReportLabStyleSuite"
        - "github.com/sliday/telegram-ai-digest"
      mine_targets_ordered:
        - "loganriebel/seo-content-stack (MUST mine #1 — HITL stages)"
        - "ogclau/ReportLabStyleSuite OR reportlab-json-renderer (MUST mine #2 — PDF theme)"
        - "sliday/telegram-ai-digest (should if time — digest→publish)"
      notes: "No clone unless user asks; WebFetch/raw README + key skill files only."

    - id: clawhub
      priority: must
      why: "Topic is Cursor-workspace skills marketplace patterns; ClawHub pass required when skills marketplace signal present. Extract patterns + security narrative; rejected_verbatim: true."
      specialist: t-800-research-clawhub
      freshness: "scan Top/Trending/New on run day; prefer items dated 2025–2026"
      queries:
        - "content pipeline draft approve publish"
        - "HITL approval human in the loop"
        - "PDF generator report premium"
        - "Telegram channel post"
        - "trend rewrite localization brand voice"
        - "newsletter digest"
      sites_or_hubs:
        - "https://clawhub.ai/"
        - "clawhub.ai Skills Top / Trending / New"
      security_scan:
        - "no secrets in prompts"
        - "no shell publish without confirm"
        - "no ignore-previous / jailbreak"
        - "no scrape PII"
      notes: "3–8 relevant cards; adapt_for_cursor only — never paste full skill body."

    - id: community
      priority: must
      why: "Lived experience: HITL content ops, Telegram digest ops pain, PDF-from-LLM failure modes, trend localization ethics (not copypaste)."
      specialist: t-800-research-community
      freshness: "prefer threads 2024–2026; older OK if classic HITL patterns"
      queries:
        - "Cursor skills vs rules content workflow Reddit"
        - "human in the loop AI content approval before post"
        - "Telegram channel AI digest draft approve"
        - "LLM generate PDF branding consistency problems"
        - "localize western fitness trends without copying Habr Reddit"
        - "agentskills.io Cursor experience"
      sites_or_hubs:
        - "reddit.com/r/cursor"
        - "reddit.com/r/ChatGPTCoding"
        - "news.ycombinator.com"
        - "habr.com"
        - "x.com (light — Cursor skills / HITL)"
      notes: "Capture failure modes: auto-post disasters, brand voice collapse, medical claim risks (EG forbid list)."

    - id: news
      priority: should
      why: "Skills surface moved fast (Cursor 2.4+, agentskills.io, migrate-to-skills). Freshness gate for factory not to ship obsolete rule-only patterns."
      specialist: t-800-research-news
      freshness: "must include ≥2 sources from 2025-Q4..2026; older changelogs = context only"
      queries:
        - "Cursor Agent Skills 2026 SKILL.md agentskills.io"
        - "Cursor changelog skills commands rules migration"
        - "Anthropic Agent Skills open standard"
        - "AI content human approval gate product news"
      sites_or_hubs:
        - "cursor.com/changelog"
        - "meshlaunch / industry blogs on Cursor skills"
        - "HN / Product Hunt light scan"
        - "Anthropic blog Agent Skills"

    - id: docs
      priority: should
      why: "Context7 only AFTER github/vendor pick a concrete PDF/Telegram library (reportlab / weasyprint / python-telegram-bot). Not always-on."
      specialist: t-800-research-docs
      freshness: "library docs for current major version"
      queries:
        - "reportlab canvas colors fonts platypus flowables"
        - "weasyprint CSS print @page dark background"
        - "python-telegram-bot send_document channel post"
      sites_or_hubs:
        - "Context7 MCP"
      gate: "SKIP if no library lock after github+miner; then coverage_matrix context7_docs: skip"

    - id: custom-eg-local
      priority: should
      why: "EG already has PDF premium style, tone, content router, bot funnel — research must ground adaptation_plan in local truth, not invent brand from web."
      specialist: t-800-research-github
      # note: same specialist can skim local; lead may assign scout-style read
      freshness: "repo HEAD"
      queries:
        - "EG_PDF_PREMIUM_STYLE_SYSTEM"
        - "CONTENT_ROUTER EG_TONE_OF_VOICE"
        - "bot generate_lead_pdf products funnel"
        - "КОНТЕНТ_МАШИНА ВОРОНКА_1М"
      sites_or_hubs:
        - "/Users/egoshev/Projects/atmosfera-3d/00_ПУЛЬТ_УПРАВЛЕНИЯ/"
        - "EG ecosystem master docs (EG_PDF_PREMIUM_STYLE_SYSTEM, CONTENT_ROUTER, EG_TONE_OF_VOICE)"
        - "01_ПРОЕКТЫ/P02_бот_telegram/bot/"
      notes: "Read-only inventory: existing PDF scripts, brand tokens (dark/cyan), HITL gaps today."

  skip_channels:
    - id: kie-vendor-deep
      why: "Image/video gen not in the 3 capability MVP; optional later if PDF needs cover art via Kie."
    - id: miniapp-reexpert-deep
      why: "Explicit anti-example and backlog; mention in open_questions/synthesis only as 'not now'."
    - id: youtube-seo-deep
      why: "Backlog optional/later — out of factory-brief focus for this research pass."
    - id: context7-always-on
      why: "No locked SDK until PDF stack chosen; docs channel is gated should→skip."
    - id: clawhub-verbatim-import
      why: "Contract forbids verbatim skill copy; channel clawhub is must for patterns only."
    - id: make-n8n-full-research
      why: "Surface is Cursor-workspace skills/commands/rules, not Replace-with-Make; external orchestrators only nice if HITL UX comparison needed (optional footnote)."

  compare_axes:
    - "hitl_hardness: soft reminder vs hard stop before publish (EG requires hard)"
    - "cursor_fit: skill vs command vs rule split for pipeline + approve gate"
    - "pdf_stack: ReportLab theme vs HTML/WeasyPrint vs JSON-renderer agent boundary"
    - "brand_safety: EG tone + no medical promises + no western copypaste"
    - "funnel_alignment: digest/PDF/trends → guide→test→levels→paid"
    - "operability: single operator (Евгений) time — draft quality vs steps count"
    - "security: no token leak, no autopost, no unsafe shell"
    - "freshness: pre-skills patterns vs 2026 SKILL.md standard"
    - "completeness: covers all 3 capabilities without Mini App scope creep"

  expected_specialist_fan_out_order:
    - step: 1
      specialist: t-800-research-vendor-docs
      parallel: false
      why: "Ground Cursor surface + cookbook idea_seeds before mining clones of obsolete patterns"
    - step: 2
      specialist: t-800-research-github
      parallel_with: [t-800-research-clawhub, t-800-research-community, custom-eg-local-skim]
      why: "Shallow map + ClawHub + community + local EG in parallel after vendor baseline"
    - step: 3
      specialist: t-800-research-repo-miner
      parallel: false
      depends_on: [t-800-research-github]
      why: "Deep-mine ≥2 repos chosen from github shortlist (hints above)"
    - step: 4
      specialist: t-800-research-news
      parallel_with: [t-800-research-docs]
      why: "Freshness pass; Context7 only if library locked"
    - step: 5
      specialist: t-800-research-synthesizer
      parallel: false
      why: "Compare ≥2 families → one recommended_approach + merge_plan + adaptation_plan seeds for 3 capabilities"

  deep_minima_checklist_for_lead:
    - "search_plan: pass (this fragment)"
    - "sources with dates: ≥8"
    - "github deep-mines: ≥2"
    - "clawhub: pass (must)"
    - "vendor_docs: pass (Cursor + cookbooks)"
    - "context7: pass|skip per library lock"
    - "synthesis compare ≥2 families"
    - "coverage_matrix verdict"

  open_questions:
    - "Publish surface for pipeline v1: only Telegram channel @EvgeniiGoshev, or also bot DMs / site blog.json?"
    - "Approve UX: Cursor chat OK only, or also Telegram inline button / emoji react as second gate?"
    - "PDF engine preference: stay on existing bot ReportLab path, or evaluate WeasyPrint/JSON-renderer?"
    - "Trend Adapter input sources: which western feeds (IG/TikTok/X/newsletters) are in-scope for v1?"
    - "Should HITL approve gate be a alwaysApply rule, a skill stage, a slash command, or mix (rule forbid autopost + skill stages)?"
    - "Local EG_PDF_PREMIUM_STYLE_SYSTEM path in this monorepo vs external EG master — which is source of truth for cyan tokens?"

  out_of_scope_this_pass:
    - "Writing factory-briefs / SKILL.md / commands / rules"
    - "Implementing bot autopost"
    - "Mini App / RE-EXPERT clone"
    - "YouTube / SEO pipeline build"
```
