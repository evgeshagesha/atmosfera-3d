# t-800-research-strategist — Producer Pack DEEP

**Date:** 2026-08-04  
**Workspace:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**mode:** DEEP  
**topic:** Atmosfera 3D / Евгений Гошев — Cursor producer pack (skills + 1–2 subagents + 1 command)

## Intent

`intent_artifact: mix` — curated HITL producer contour:
- skill(s): content producer / warmup / Reels scripts / SEO copy (money pages + blog) in EG tone
- 1–2 subagents (EXTEND `kontent`/`prodazhi` vs CREATE thin pair — open axis)
- 1 command (`/eg-producer` or `/продюсер`)
- Boundary: T-800 = `.cursor/` only; NOT site edits; NOT VK/TG autopost code
- Reuse: `eg-news-to-blog` dual HITL (`article_hash` / `social_hash`, `published: false`)

## Probe (≤2 WebSearch — plan refinement only)

| Probe | Signal for fan-out |
|-------|-------------------|
| GitHub Cursor skills content/Reels | Seed mines: `tanishaio/creator-studio-skill`, `kostja94/marketing-skills`, `mohitagw15856/pm-claude-skills` (short-form-script) |
| ClawHub personal brand / content | Seed cards: founder-content-marketing, content-marketing, cs-social-content, afrexai-social-media-engine — **reject verbatim + reject auto-schedule/publish modules** |

## Channel priorities (summary)

| Priority | Channels |
|----------|----------|
| **must** | github, repo-miner, clawhub, vendor-docs, community |
| **should** | news, custom (workspace SoT / HITL reuse) |
| **skip** | research-docs (Context7), Kie/vendor media APIs, autopost/scraper deep-dives, Remotion as MVP core |

## Adaptation constraints (hard)

- HITL only: drafts OK, no auto-publish TG/VK/blog
- Brand-safe: no medical claims; EG tone (спокойный, премиальный)
- CTA rail → `eg.egoshev.ru` / `anketa` (not mass CTA spam of philosophy slogan)
- Adapt patterns, don't clone junk; `no_mass_download: true`
- NOT factory in this research step; NOT site Wave2 edits
- Models: `inherit_chat`

## Handoff

→ research-lead fan-out specialists per `search_plan` below → synthesizer (≥2 families) → coverage_matrix.

---

## search_plan (machine)

```yaml
status: ok
search_plan:
  topic: "Atmosfera 3D personal-brand producer pack — Cursor skills + subagents + command (HITL, brand-safe, booking CTA)"
  intent_artifact: mix
  mode: deep
  workspace: /Users/egoshev/Projects/atmosfera-3d
  memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
  v1_surface:
    skills: true
    subagents: "1-2"
    command: "1 (/eg-producer or /продюсер)"
    rules_hooks: false  # unless synthesis finds hard need for brand-safety rule reuse
  adaptation_constraints:
    - HITL_only: drafts_ok_no_auto_publish
    - brand_safe_no_medical_claims: true
    - atmosfera_eg_tone: true
    - no_vk_tg_autopost_code: true
    - no_site_edits_wave2: true
    - t800_boundary_cursor_artifacts_only: true
    - no_mass_download: true
    - no_verbatim_clawhub_github_clone: true
    - cta_rail: "eg.egoshev.ru/anketa"
    - reuse_patterns: ["eg-news-to-blog dual HITL", "kontent.md", "prodazhi.md", "eg-news-brand-safety.mdc"]
    - models: inherit_chat
  channels:
    - id: github
      priority: must
      why: "Primary source of Cursor/Claude Agent Skills patterns for producer/content/SEO/Reels — curated shortlist only, not mass clone"
      specialist: t-800-research-github
      freshness_days: 365
      expected_artifact_types: [SKILL.md, skill_pack, .mdc_rule_export, README_workflow, command_aliases]
      queries:
        - "Cursor SKILL.md content creator OR producer OR marketing"
        - "agent skills Reels OR short-form script Instagram"
        - "marketing-skills SEO copywriting Cursor OR Claude"
        - "creator-studio-skill calendar caption repurpose"
        - "personal brand content calendar skill GitHub"
        - "HITL human approval draft publish skill agent"
      sites_or_hubs:
        - github.com
        - github.com/topics/cursor-skills
        - github.com/anthropics/skills
      seed_repos_probe:
        - tanishaio/creator-studio-skill
        - kostja94/marketing-skills
        - mohitagw15856/pm-claude-skills
      reject_signals:
        - mass skill dumps without structure
        - auto-post Telegram/VK/Meta API as core
        - medical/wellness miracle claims templates
        - scrape PII / ignore-previous jailbreaks

    - id: repo-miner
      priority: must
      why: "DEEP minima ≥2 deep-mines; extract structure (router SKILL + references/templates), HITL gates, progressive disclosure — adapt to Atmosfera, don't copy body"
      specialist: t-800-research-repo-miner
      freshness_days: 365
      expected_artifact_types: [SKILL.md_structure, references/, templates/, progressive_disclosure, CTA_patterns, voice_lock]
      min_mines: 2
      queries:
        - "deep mine creator-studio-skill: idea/script/caption/calendar/repurpose router"
        - "deep mine marketing-skills: SEO + pages + content skills layout + project-context.md pattern"
        - "optional 3rd: short-form-script hook→retention→payoff + CTA checklist"
      sites_or_hubs:
        - github.com/tanishaio/creator-studio-skill
        - github.com/kostja94/marketing-skills
        - github.com/mohitagw15856/pm-claude-skills
      mine_focus:
        - frontmatter description triggers
        - modular references vs monolith prompt
        - brand voice / project-context injection
        - CTA / funnel stage tagging
        - what to strip (auto-publish, crypto niches, generic fitness hype)
      adaptation_note: "Map modules → eg-producer skills; CTA → anketa; tone → EG SoT; keep HITL stop gates"

    - id: clawhub
      priority: must
      why: "Marketplace personal-brand / content-marketing skills — pattern extraction + security narrative; rejected_verbatim always"
      specialist: t-800-research-clawhub
      freshness_days: 180
      expected_artifact_types: [skill_card, module_router, brand_voice_schema, calendar_pattern, seo_brief_module]
      queries:
        - "content marketing founder solopreneur"
        - "personal brand thought leadership"
        - "social content Instagram Reels"
        - "content strategy calendar repurpose"
        - "SEO content brief"
        - "social media engine schedule publish"  # inventory to REJECT auto-publish parts
      sites_or_hubs:
        - clawhub.ai
        - clawhub.ai (tabs: top, trending, new)
      seed_cards_probe:
        - clawhub.ai/renehdzgtz/founder-content-marketing
        - clawhub.ai/ivangdavila/content-marketing
        - clawhub.ai/alirezarezvani/cs-social-content
        - clawhub.ai/jk-0001/content-strategy
        - clawhub.ai/1kalin/afrexai-social-media-engine
      security_scan:
        - secrets_in_prompt
        - shell_without_confirm
        - scrape_PII
        - ignore_previous
        - auto_schedule_publish_APIs
      adaptation_note: "Take pillars/calendar/repurpose/voice schemas; drop Web3 modules; drop distribution>creation autopost dogma when it implies auto-send"

    - id: vendor-docs
      priority: must
      why: "Cursor skills/subagents/commands SoT + multi-model prompting cookbooks for producer prompts (DEEP ≥3 mastodons on prompting); models inherit_chat — no pin"
      specialist: t-800-research-vendor-docs
      freshness_days: 90
      expected_artifact_types: [cursor_docs, cookbook_pattern, idea_seeds, frontmatter_contract]
      queries:
        - "Cursor Agent Skills SKILL.md frontmatter paths disable-model-invocation"
        - "Cursor subagents model inherit readonly"
        - "Cursor custom commands slash"
        - "OpenAI cookbook agents structured outputs content workflows"
        - "Claude prompting best practices XML skills"
        - "Gemini prompting strategies creative writing"
      sites_or_hubs:
        - cursor.com/docs/skills
        - cursor.com/docs/subagents
        - cursor.com/docs/agent/prompting
        - cursor.com/docs/agent/commands
        - cookbook.openai.com
        - platform.claude.com/docs (prompting best practices)
        - ai.google.dev/gemini-api/docs/prompting-strategies
      vendors_min: [cursor, openai, anthropic, gemini]
      skip_vendors: [kie, perplexity]  # no search-agent / media-API signal in MVP
      idea_seeds_wanted:
        - progressive_disclosure_skill_files
        - structured_output_for_script_beats
        - brand_voice_constraints_in_system_prompt
        - human_in_the_loop_stop_points

    - id: community
      priority: must
      why: "Lived experience: what works/fails in Cursor skills for marketing, Russian content ops, HITL vs autopost; Habr/Reddit signal for adaptation realism"
      specialist: t-800-research-community
      freshness_days: 365
      expected_artifact_types: [thread_insight, failure_mode, workflow_tip]
      queries:
        - "Cursor skills marketing content creator experience"
        - "Claude Code OR Cursor SKILL.md Instagram Reels"
        - "AI agent content calendar personal brand HITL"
        - "site:habr.com Cursor skills OR агент навыки контент"
        - "Reddit Cursor agent skills SEO copywriting"
        - "не публиковать автоматически AI контент Instagram Telegram"
      sites_or_hubs:
        - reddit.com/r/cursor
        - reddit.com/r/ClaudeAI
        - news.ycombinator.com
        - habr.com
        - x.com (light scan only)

    - id: news
      priority: should
      why: "Freshness on Agent Skills ecosystem + Cursor changelog deltas since scout (skills standard portability); optional Google Workspace plugins relevance to HITL SEO — not MVP-blocking"
      specialist: t-800-research-news
      freshness_days: 60
      expected_artifact_types: [changelog, ecosystem_blog, skills_standard_update]
      queries:
        - "Cursor changelog skills subagents commands 2026"
        - "Anthropic agent skills standard SKILL.md"
        - "AI agent skills marketing creator studio"
        - "Cursor Google Workspace plugins agents Docs"
      sites_or_hubs:
        - cursor.com/changelog
        - news.ycombinator.com
        - browseract.com/blog (ecosystem roundups — low trust, pattern-only)
      note: "Scout already checked Aug 3 changelog — news confirms deltas only; do not re-block factory"

    - id: custom
      priority: should
      why: "Local SoT is adaptation ground truth — extract HITL/brand-safety patterns to reuse, not reinvent; specialist = github or lead-local read (no web)"
      specialist: t-800-research-github  # or lead-local pass; treat as workspace mine
      freshness_days: 0  # always current workspace
      expected_artifact_types: [workspace_HITL_pattern, brand_ban_list, thin_agent_gap]
      queries:
        - "read .cursor/skills/eg-news-to-blog HITL dual gate"
        - "read .cursor/agents/kontent.md prodazhi.md thinness"
        - "read .cursor/rules/eg-news-brand-safety.mdc + atmosfera-3d.mdc bans"
        - "read 03_РЕСУРСЫ EG tone / TRAINING_SYSTEM_POSITIONING_MASTER (cite only, no essay copy)"
        - "commands eg-news-to-blog / eg-news-approve as command UX template"
      sites_or_hubs:
        - /Users/egoshev/Projects/atmosfera-3d/.cursor/skills/eg-news-to-blog
        - /Users/egoshev/Projects/atmosfera-3d/.cursor/agents
        - /Users/egoshev/Projects/atmosfera-3d/.cursor/commands
        - /Users/egoshev/Projects/atmosfera-3d/.cursor/rules
      extract:
        - dual_HITL_phrases
        - published_false_default
        - content_mode author|external|mixed
        - CTA_one_social_rule
        - medical_claim_bans

  compare_axes:
    - skill_first_vs_agent_first_producer_loop
    - extend_kontent_prodazhi_vs_create_new_pair
    - monolith_skill_vs_modular_skill_pack_plus_router_command
    - progressive_disclosure_token_cost
    - HITL_gate_depth (single_stop vs dual_hash_like_eg_news)
    - cursor_fit_frontmatter_and_commands
    - brand_safety_and_medical_claim_guardrails
    - cta_rail_to_anketa_vs_generic_follow_CTA
    - security_clawhub_github_flags
    - completeness_vs_no_mass_download_curation
    - freshness_skills_ecosystem
    - reject_autopost_modules_cleanly

  skip_channels:
    - id: research-docs
      why: "No library/SDK/npm/API package signal — Context7 always-on forbidden; Cursor surface covered by vendor-docs"
    - id: vendor-docs-kie
      why: "No image/video market API in producer MVP; Remotion already local — out of T-800 producer pack scope"
    - id: vendor-docs-perplexity
      why: "No search-augmented research-agent requirement in intake"
    - id: github-autopost-scrapers
      why: "Explicit out of scope — Dev owns VK/TG autopost; researching posting bots risks scope creep into code"
    - id: remotion-mediabunny-deep
      why: "Video render skills exist locally; producer MVP is scripts/warmup/SEO/HITL copy, not ffmpeg pipeline"
    - id: site-next-money-pages
      why: "Dev Wave2 owns site; research may inform SEO *copy* skill text patterns only, not page implementation"

  open_questions:
    - "Command locale primary: /eg-producer vs /продюсер vs bilingual alias?"
    - "Subagent strategy preference if synthesis ties: EXTEND kontent+prodazhi vs CREATE eg-producer + eg-warmup?"
    - "SEO copy skill writes into which vault path by default (drafts under 90_ВХОДЯЩИЕ vs P01 drafts) — confirm with brain/product SoT?"
    - "Warmup skill scope: Stories-only vs Reels→Stories→Direct sequence pack?"
    - "Optional later: Google Workspace Docs HITL for SEO drafts — in or out of v1?"

  fan_out_order_hint:
    - parallel_must: [github, clawhub, vendor-docs, community]
    - then: repo-miner  # uses github shortlist
    - parallel_should: [news, custom]
    - finally: synthesizer

  deep_minima_checklist_for_lead:
    search_plan: required
    sources_dated_min: 8
    github_deep_mines_min: 2
    clawhub_pass: required
    vendor_or_context7: vendor-docs (cursor+3 cookbooks)
    synthesis_compare_ge_2_families: required
    adaptation_plan_from_merge: required
    no_mass_download_enforced: true
```
