# t-800-research-lead — DEEP Research Brief

**Date:** 2026-08-04  
**Topic:** Atmosfera 3D / Евгений Гошев — producer pack MVP  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Progress:** Research ▸ strategist→7 specialists→synthesis  
**verdict:** `coverage_matrix.verdict: pass` · `confidence: high`  
**Handoff:** → brain-lead / factory (OK)

---

## research_brief

```yaml
research_brief:
  mode: deep
  topic: "Atmosfera 3D personal-brand producer pack — Cursor skills + subagents + command (HITL, brand-safe, booking CTA)"
  artifact_surface: cursor-workspace
  workspace: /Users/egoshev/Projects/atmosfera-3d
  memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
  scout_alignment:
    block_factory: false
    skills_needed: true
    existing: "thin kontent+prodazhi; eg-news-to-blog HITL; no producer skill pack"
  recommended_artifact: mix
  artifact_surface_detail: cursor-workspace

  search_plan:
    intent_artifact: mix
    mode: deep
    must_channels: [github, repo-miner, clawhub, vendor-docs, community]
    should_channels: [news, custom_local_sot]
    skip_channels:
      - {id: research-docs, why: "No library/SDK — Context7 not always-on"}
      - {id: vendor-docs-kie, why: "No image/video market API in MVP"}
      - {id: github-autopost-scrapers, why: "Dev owns VK/TG autopost"}
      - {id: remotion-mediabunny-deep, why: "Scripts/warmup/SEO only"}
      - {id: site-next-money-pages, why: "Dev Wave2; SEO copy patterns only"}
    adaptation_constraints:
      - HITL_only_drafts_ok_no_auto_publish
      - brand_safe_no_medical_claims
      - atmosfera_eg_tone
      - no_vk_tg_autopost_code
      - no_site_edits_wave2
      - t800_boundary_cursor_artifacts_only
      - no_mass_download
      - no_verbatim_clawhub_github_clone
      - cta_rail: eg.egoshev.ru/anketa
      - reuse: [eg-news-to-blog dual HITL, kontent.md, prodazhi.md, eg-news-brand-safety.mdc]
      - models: inherit_chat

  synthesis:
    recommended_approach: >
      Skill-first hybrid: modular EG producer skill pack (4 skills, progressive
      disclosure) + thin slash router /eg-producer (+ /продюсер) + EXTEND kontent
      (drafter) and prodazhi (CTA/anketa) as skill-backed specialists — HITL drafts
      only; no autopost/scrape; reuse eg-news HITL + brand-safety.
    why_best: >
      Best cursor_fit (skills=workflows, agents=clean context, command=orchestration)
      + curated completeness (creator-studio architecture + vyral craft + ClawHub
      schemas, not mass clone) + brand_safety/HITL (local SoT + reject auto-send).
      EXTEND beats CREATE; modular beats monolith.
    runners_up:
      - {approach: "Monolith creator-studio single skill", why_weaker: "Description Trap; weaker progressive disclosure"}
      - {approach: "Agent-first CREATE new pair", why_weaker: "Duplicates kontent/prodazhi; vendor prefers skills for single-shot"}
      - {approach: "Mass-curate 50–160 marketing skills", why_weaker: "no_mass_download; security; tone collision"}
      - {approach: "Pack + Automations/Workspace auto-publish", why_weaker: "Breaks HITL; Dev owns channels"}
    merge_plan: >
      A creator-studio → router, voice gate (vault Zero-Copy), calendar,
      idea→script→caption→repurpose (strip niche). B vyral → hook batch/3-layer,
      retention spine, timed grid, bait anti-patterns, one-ask CTA→anketa (strip
      viral/FOMO). C ClawHub founder/content → pillars, funnel→EG ladder, SEO brief
      skeleton, status idea→draft→review→ready (DROP Web3/schedule/Playwright/scrape).
      D vendor → L1–L3 progressive, model inherit, beat YAML, STOP gates.
      E eg-news-to-blog → refs layout, dual-HITL when social/blog path, published:false,
      command UX, rules reuse. F kostja/corey → context-first, ≤2–3 skills/task hygiene.
    conflicts:
      - {conflict: "ClawHub schedule vs HITL", resolution: "schemas only; DROP auto-send"}
      - {conflict: "monolith vs modular", resolution: "command router + modular craft skills"}
      - {conflict: "commands Skills-centric vs Customize", resolution: "ship commands/eg-producer.md"}
    confidence: high
    needs_more_sources: false

  recommended_artifacts:
    skills:
      - name: eg-producer-studio
        role: "voice/pillars/calendar/repurpose router; SoT pointers Zero-Copy"
      - name: eg-reels-script
        role: "hooks + timed grid + spine + caption one-ask CTA"
      - name: eg-warmup
        role: "Reels→Stories→Direct nurture sequence (HITL drafts)"
      - name: eg-seo-brief
        role: "SEO brief + money/blog copy drafts in Cursor; no Wave2 site edits"
    subagents:
      - name: kontent
        action: EXTEND
        role: "drafter — invokes producer skills; beats→draft HITL"
      - name: prodazhi
        action: EXTEND
        role: "CTA/anketa/objections — soft offer-bridge + ban scan"
    command:
      primary: /eg-producer
      alias: /продюсер
      role: "thin orchestrator → skill → STOP → Task(kontent) → STOP → Task(prodazhi) CTA → ready"
    rules_reuse:
      - .cursor/rules/eg-news-brand-safety.mdc
      - .cursor/rules/atmosfera-3d.mdc
    critic_v1: "skill checklist / readonly Task mode — NOT a 3rd agent"
    draft_path_default: "90_ВХОДЯЩИЕ/producer-drafts/"
    hitl:
      drafts: published_false
      social_blog_path: "reuse dual hash article_hash→social_hash when applicable"
      never: [auto_tg, auto_vk, auto_blog_json, auto_meta]

  adaptation_plan: >
    1) Scaffold 4 skills (L1 triggers, L2 pipeline+HITL, L3 refs).
    2) Pre-fill voice from vault pointers (Zero-Copy MASTER/ToV).
    3) /eg-producer router → skill → beats STOP → Task(kontent) STOP →
       Task(prodazhi) CTA STOP ready.
    4) PATCH agent descriptions (skill-backed).
    5) Drafts → 90_ВХОДЯЩИЕ/producer-drafts/; published:false.
    6) Do NOT: Playwright/scrape/schedule/medical/viral bait/YouTube→eg domain.
    7) Skip Workspace plugins / Automations / Remotion / site / VK-TG code.

  sources:
    - {url: "https://cursor.com/docs/skills", date: "2026-08-04", family: vendor, freshness: ok}
    - {url: "https://cursor.com/docs/subagents", date: "2026-08-04", family: vendor, freshness: ok}
    - {url: "https://cursor.com/docs/customize-cursor", date: "2026-08-04", family: vendor, freshness: ok}
    - {url: "https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview", date: "2026-08-04", family: vendor, freshness: ok}
    - {url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices", date: "2026-08-04", family: vendor, freshness: ok}
    - {url: "https://ai.google.dev/gemini-api/docs/prompting-strategies", date: "2026-08-04", family: vendor, freshness: ok}
    - {url: "https://github.com/openai/openai-cookbook/blob/main/examples/Structured_Outputs_Intro.ipynb", date: "2026-07-14", family: vendor, freshness: ok}
    - {url: "https://github.com/tanishaio/creator-studio-skill", date: "2026-04-27", family: github|repo_mine, freshness: warn}
    - {url: "https://github.com/vyralcontent/content-skills", date: "2026-06-22", family: github|repo_mine, freshness: ok}
    - {url: "https://github.com/coreyhaines31/marketingskills", date: "2026-07-29", family: github, freshness: ok}
    - {url: "https://github.com/kostja94/marketing-skills", date: "2026-06-09", family: github, freshness: ok}
    - {url: "https://clawhub.ai/renehdzgtz/founder-content-marketing", date: "unknown", family: clawhub, freshness: block_verbatim}
    - {url: "https://clawhub.ai/ivangdavila/content-marketing", date: "unknown", family: clawhub, freshness: block_verbatim}
    - {url: "https://clawhub.ai/1kalin/afrexai-social-media-engine", date: "2026-02-13", family: clawhub, freshness: warn}
    - {url: "https://news.ycombinator.com/item?id=49139845", date: "2026-08-02", family: news|community, freshness: ok}
    - {url: "https://habr.com/ru/companies/bothub/articles/1044774/", date: "2026-06-08", family: community, freshness: ok}
    - {url: "https://habr.com/ru/companies/bitrix/articles/980654/", date: "2025-12-26", family: community, freshness: ok}
    - {url: "https://chelseaandrea.substack.com/p/i-built-an-ai-pipeline-that-handles", date: "2026-05-13", family: community, freshness: ok}
    - {url: "https://cursor.com/changelog/google-workspace-plugins", date: "2026-08-03", family: news, freshness: ok}
    - {url: "file://.cursor/skills/eg-news-to-blog/", date: "2026-08-04", family: local_sot, freshness: ok}

  github:
    top_repos:
      - tanishaio/creator-studio-skill
      - vyralcontent/content-skills
      - coreyhaines31/marketingskills  # selective only
      - kostja94/marketing-skills      # pattern only
    rejected: [mass dumps, TG/VK/Meta autopost cores, scrape pipelines, medical miracle templates]

  repo_mines:
    primary:
      - tanishaio/creator-studio-skill
      - vyralcontent/content-skills
    light:
      - coreyhaines31/marketingskills  # copywriting/emails/seo
      - kostja94/marketing-skills      # project-context + authoring

  community:
    verdict: "HITL-only + CTA anketa = community-validated premium pattern"
    reddit_x: blocked_this_run  # do not cite as SoT
    key: modular_skills_over_monolith; structural_HITL; autopost_fails_Meta

  clawhub:
    adapt: [founder-content-marketing, content-marketing, content-strategy, afrexai schemas_only]
    reject: [instagram-account-operations Playwright, social-content Apify scrape, auto_schedule_publish]

  vendor_docs:
    hubs: [cursor, openai_cookbook_via_github, anthropic, gemini]
    idea_seeds:
      - progressive_disclosure_skill_files
      - structured_output_for_script_beats
      - brand_voice_constraints_in_system_prompt
      - human_in_the_loop_stop_points
    model: inherit_only

  docs: null  # Context7 skipped per search_plan

  news:
    reblock_factory: false
    ignore_v1: [Google Workspace plugins, Automations /automate, iPad, mass marketing kits]

  coverage_matrix:
    strategist: pass
    synthesizer: pass
    github_shallow: pass
    repo_mines: pass
    community: pass
    clawhub: pass
    vendor_docs: pass
    context7_docs: skip
    news: pass
    sources_count: 20
    dated_ok_or_warn: 17
    deep_mines: 2
    verdict: pass

  open_questions: []
  # defaults locked by synthesizer:
  # command /eg-producer + /продюсер; EXTEND kontent+prodazhi;
  # drafts 90_ВХОДЯЩИЕ/producer-drafts/; warmup Reels→Stories→Direct;
  # Workspace HITL out of v1

  stale_rejected:
    - "ClawHub/IG Playwright auto-send cards"
    - "Apify/Phantom scrape social engines"
    - "Mass 160+/800+ skill library installs"
    - "OpenAI parallel_agents notebook pre-2026 pattern (block freshness — idea only)"
    - "Anthropic equating skills blog 2025-10 as news delta (baseline only)"

  confidence: high
```

---

## Recommended artifacts list (factory-ready)

| Type | Name | Action |
|------|------|--------|
| skill | `eg-producer-studio` | CREATE |
| skill | `eg-reels-script` | CREATE |
| skill | `eg-warmup` | CREATE |
| skill | `eg-seo-brief` | CREATE |
| subagent | `kontent` | EXTEND (skill-backed) |
| subagent | `prodazhi` | EXTEND (CTA→anketa) |
| command | `/eg-producer` (+ `/продюсер`) | CREATE |
| rules | `eg-news-brand-safety` + `atmosfera-3d` | REUSE |

## Specialist fragments

- `fragments/t-800-research-strategist.md`
- `fragments/t-800-research-clawhub.md`
- `fragments/t-800-research-vendor-docs.md`
- `fragments/t-800-research-news.md`
- `fragments/t-800-research-repo-miner.md`
- `fragments/t-800-research-synthesizer.md`
- (github/community findings embedded in lead brief)

## Next

→ `Task(t-800-brain-lead)` then `Task(t-800-factory)` with this brief.  
Do NOT factory in research-lead.
