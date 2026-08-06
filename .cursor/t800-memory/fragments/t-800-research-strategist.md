# t-800-research-strategist — Search Plan

**Date:** 2026-08-05  
**Topic:** Client programs (клиентские программы) — skills + `/eg-programma`  
**Workspace:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Mode:** DEEP  
**Intent:** mix (skills + command; optional agent later — prefer skip if router enough)

---

## Intake signals locked

| Signal | Value |
|--------|--------|
| Doc types ×3 | post-session · monthly plan · long-term coaching |
| HITL | drafts only; no auto-send / no publish |
| Zero-Copy | cite `50-programs.mdc` + TEMPLATE + STYLE SPEC (when Dev lands) |
| artifact_surface | cursor-workspace; factory boundary `.cursor/` only |
| OUT | vk / site / remotion |
| no_mass_github | **true** → github ≠ must; no repo-miner; no mass clone |
| scout | `block_factory=false`, `skills_needed=true` |

---

## Probe (strategist-light)

1. **Local vault confirm (2026-08-05):**
   - ✅ `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/50-programs.mdc` — post-session structure, МФР, services block, bans
   - ✅ `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/programs/TEMPLATE-program.md` — 10-section template + training-week model
   - ✅ Adjacent: `10-voice-and-language.mdc`, `20-products-prices.mdc`, `40-design-system.mdc`, `brand/design-tokens.css` (inbox pack)
   - ✅ Modular precedent: `.cursor/skills/eg-producer-studio` + `.cursor/commands/eg-producer.md` (router → thin craft skills + HITL)
   - ✅ HITL precedent: `eg-news-to-blog` dual gate / brand-safety
   - ⚠️ `EG_CLIENT_PROGRAMS_STYLE_SPEC.md` — **not in vault yet** (Dev parallel; cite placeholder)
   - ⚠️ `EG_КЛИЕНТЫ/` tree — **not found** as named folder; drafts likely `90_ВХОДЯЩИЕ/` or future path — open_question
   - ⚠️ `EG_PDF_PREMIUM_STYLE_SYSTEM.md` — not in atmosfera-3d root; search home/EG ecosystem in fan-out
   - Journey: `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/02_КЛИЕНТСКИЙ_ПУТЬ/*`

2. **Web probe:** Cursor skills docs stable — `name`/`description`/`paths`/`disable-model-invocation`; progressive disclosure via `references/`. Aligns with 1 skill + 3 refs OR 3 thin skills + command router.

---

## Strategy rationale

| Question | Strategist call |
|----------|-----------------|
| Where is official truth for *content*? | **Local vault** (50-programs + TEMPLATE + voice/products) — primary must |
| Where is official truth for *Cursor artifact shape*? | **vendor-docs Cursor** (skills + commands + prompting) |
| Where are modular skill patterns? | **Local eg-producer pack** + **ClawHub** structure (adapt, no copy) + **community** skill authoring |
| Prompt craft for HITL structured clinical-ish docs? | **vendor-docs** Claude XML + OpenAI structured / cookbook patterns — not medical APIs |
| Why skip mass GitHub? | Intake `no_mass_github`; domain is brand SoT + Cursor UX, not open-source care-plan repos. Coverage ≥8 via vault + vendor + clawhub + community + journey docs |
| Context7? | Skip — no library/SDK named |
| News? | Nice-only if skills API change post-scout; scout already Aug 5 — default skip unless lead sees changelog delta |

**Synthesis target hypothesis (for synthesizer to confirm/reject):**  
**1 router skill `eg-client-programs` (or `eg-programma`) + 3 L3 refs** (post-session / monthly / long-term) **+ command `/eg-programma`** with optional alias `/программа` — mirror `eg-producer` pattern. Alternative: 3 thin skills + thin command. Prefer skill-first modular over new agent unless compare shows router agent value.

---

## Expected source families (≥8 without mass github)

1. `50-programs.mdc` (local)
2. `TEMPLATE-program.md` (local)
3. Voice + products + design rules (local inbox pack)
4. `eg-producer` command+skills modular HITL precedent (local)
5. `eg-news` / brand-safety HITL gates (local)
6. Customer journey vault docs (local)
7. Cursor docs — skills (vendor)
8. Cursor docs — commands / agent prompting (vendor)
9. Anthropic Claude prompting best practices (vendor)
10. OpenAI Cookbook — structured outputs / evals / HITL-ish patterns (vendor)
11. ClawHub skill cards ×2–4 structure-only (clawhub)
12. Community: agentskills.io / localskills / Cursor forum-or-Reddit skill authoring (community)
13. Optional: EG PDF premium style path if located outside repo (custom/local)
14. Scout fragment freshness (already in memory)

---

## Machine YAML

```yaml
status: ok
search_plan:
  topic: "EG Atmosfera 3D client programs — post-session / monthly plan / long-term coaching → Cursor skills + /eg-programma"
  intent_artifact: mix
  intent_detail: "skills (1+refs or 3 thin) + command /eg-programma (+ optional /программа alias); agent optional EXTEND only if synthesis proves need"
  mode: deep
  constraints:
    hitl_only: true
    zero_copy: true
    no_medical_diagnoses_or_promises: true
    artifact_surface: cursor-workspace
    factory_boundary: ".cursor/ only"
    out_of_scope: [vk, site, remotion, pdf_render_pipeline, STYLE_SPEC_authoring]
    no_mass_github: true
    scout:
      block_factory: false
      skills_needed: true
  channels:
    - id: custom
      label: local-vault
      priority: must
      why: >
        Primary SoT for document structure, clinical-accuracy-without-diagnosis framing,
        МФР method, services block, TEMPLATE sections, voice bans, product CTAs, design tokens.
        Zero-Copy research must map cite-paths; cannot be replaced by ClawHub/GitHub.
        Contract allows custom channels; DEEP coverage without github mines.
      queries:
        - "50-programs.mdc structure post-session markers services block safety"
        - "TEMPLATE-program.md section map vs 3 doc types gaps (monthly / long-term)"
        - "eg-producer modular router vs craft skills HITL STOP pattern"
        - "eg-news dual HITL / brand-safety reuse for client docs"
        - "EG_CLIENT_PROGRAMS_STYLE_SPEC OR PDF premium style path"
        - "EG_КЛИЕНТЫ OR drafts destination patterns 90_ВХОДЯЩИЕ"
        - "02_КЛИЕНТСКИЙ_ПУТЬ journey → product ladder after session"
        - "10-voice 20-products 40-design cite list for skill frontmatter Do Not Use"
      sites_or_hubs:
        - "/Users/egoshev/Projects/atmosfera-3d/90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/50-programs.mdc"
        - "/Users/egoshev/Projects/atmosfera-3d/90_ВХОДЯЩИЕ/atmosfera-os-from-claude/programs/TEMPLATE-program.md"
        - "/Users/egoshev/Projects/atmosfera-3d/90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/"
        - "/Users/egoshev/Projects/atmosfera-3d/.cursor/skills/eg-producer-studio/"
        - "/Users/egoshev/Projects/atmosfera-3d/.cursor/commands/eg-producer.md"
        - "/Users/egoshev/Projects/atmosfera-3d/.cursor/skills/eg-news-to-blog/"
        - "/Users/egoshev/Projects/atmosfera-3d/03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/02_КЛИЕНТСКИЙ_ПУТЬ/"
        - "/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory/fragments/t-800-scout.md"
      specialist: t-800-research-lead
      execution_note: >
        No dedicated vault specialist — research-lead runs workspace Read/Grep pass
        BEFORE or IN PARALLEL with external fan-out; findings feed synthesizer as source family #1.

    - id: vendor-docs
      priority: must
      why: >
        Cursor skill/command shape is vendor truth; prompting cookbooks give HITL structured-doc
        patterns (XML sections, progressive disclosure, safety refusals) without inventing medical APIs.
        Scout already sampled skills API — deepen commands + Agent prompting + 2 cookbooks.
      queries:
        - "Cursor docs skills SKILL.md frontmatter paths disable-model-invocation references"
        - "Cursor docs commands slash command arguments router pattern"
        - "Cursor Agent prompting best practices structured workflows"
        - "Claude prompting best practices XML sections safety refusals long documents"
        - "OpenAI cookbook structured outputs OR agent HITL review patterns"
        - "Gemini prompting strategies optional third mastodon if multi-model inherit"
      sites_or_hubs:
        - "https://cursor.com/docs/skills"
        - "https://cursor.com/docs/agent/prompting"
        - "https://cursor.com/docs/agent/chat/commands"
        - "https://cursor.com/help/customization/skills"
        - "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
        - "https://cookbook.openai.com/"
        - "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      specialist: t-800-research-vendor-docs
      idea_seeds_focus:
        - "progressive disclosure: thin SKILL + references per doc type"
        - "disable-model-invocation vs auto-trigger for clinical client docs"
        - "HITL stop gates before client-facing language final"
        - "refusal / safety framing without medical claims"

    - id: clawhub
      priority: must
      why: >
        Skills marketplace for *structure* of care-plan / clinical-doc / coaching-plan skills —
        adapt patterns only; rejected_verbatim true. ClawHub pass required when must (DEEP).
        Thin scan Top/Trending/New; 3–6 cards max; no mass clone.
      queries:
        - "care plan skill"
        - "client notes OR session notes skill"
        - "coaching plan OR training program skill"
        - "HITL review OR draft approval skill"
        - "structured medical-adjacent documentation skill (safety scan)"
      sites_or_hubs:
        - "https://clawhub.ai/"
      specialist: t-800-research-clawhub
      security_scan: true
      max_items: 6

    - id: community
      priority: should
      why: >
        Live author experience on modular skills (1 skill + refs vs many skills), slash-command
        routers, Russian alias commands, progressive disclosure pitfalls — complements vendor docs.
        LIGHT depth OK; 2–4 posts/articles.
      queries:
        - "Cursor skills modular references folder best practices"
        - "Cursor slash command vs skill when to use both"
        - "agentskills.io specification progressive disclosure"
        - "Reddit OR forum Cursor agent skills SKILL.md too long"
        - "HITL human review AI clinical notes OR coaching docs (non-diagnostic)"
      sites_or_hubs:
        - "https://agentskills.io/"
        - "https://localskills.sh/"
        - "https://www.reddit.com/r/cursor"
        - "https://forum.cursor.com/"
        - "Habr / X optional if Russian Cursor skill threads appear"
      specialist: t-800-research-community

    - id: news
      priority: nice
      why: >
        Only if lead needs freshness delta after scout (Aug 5). Skills API already checked.
        Skip by default to save budget; flip to should if changelog shows skills/commands break.
      queries:
        - "Cursor changelog skills commands August 2026"
      sites_or_hubs:
        - "https://cursor.com/changelog"
      specialist: t-800-research-news

    - id: github
      priority: nice
      why_downgraded: >
        Intake no_mass_github=true. Domain truth is vault + Cursor UX, not OSS care-plan repos.
        GitHub is NOT must and NOT should. Optional ≤1 shallow URL citation (e.g. agentskills
        examples) ONLY if community/vendor leave a concrete gap — zero clones, zero repo-miner.
      queries:
        - "agentskills examples SKILL.md references pattern (shallow link only)"
      sites_or_hubs:
        - "github.com (shallow link-only if needed)"
      specialist: t-800-research-github
      hard_limits:
        deep_mines: 0
        mass_download: false
        clone: false
        max_repos_if_activated: 1
        mode_if_activated: shallow_urls_only

  compare_axes:
    - "cursor_fit: skill+command shape vs Cursor docs + eg-producer precedent"
    - "modular_architecture: 1 skill+3 refs vs 3 thin skills vs monolith essay skill"
    - "zero_copy_compliance: cite 50-programs/TEMPLATE/STYLE SPEC vs embedding prose"
    - "brand_safety: diagnosis bans, services block, voice anti-AI markers"
    - "hitl_gates: draft path, STOP before client send, no auto-publish"
    - "doc_type_coverage: post-session vs monthly vs long-term gap fill"
    - "command_ux: /eg-programma args + /программа alias vs skill-only trigger"
    - "security: clawhub flags; no PII in skill body; client data not in git"
    - "completeness: ≥8 dated sources without github mines"
    - "optional_agent: EXTEND value vs command+skills enough (prefer skip)"

  skip_channels:
    - id: docs
      why: "Context7 / research-docs — no library, SDK, npm, or API package in intake; skip unless a render lib appears (PDF is Dev OUT)"
    - id: repo-miner
      why: "no_mass_github; deep mines would violate intake; coverage via local-vault + vendor + clawhub + community"
    - id: github_as_must
      why: "Explicit intake no_mass_github; github channel max nice/shallow; never must/should for this pack"
    - id: remotion_vk_site
      why: "OUT of research pack per intake boundary"
    - id: pdf_html_pipeline
      why: "STYLE SPEC / HTML→PDF authoring is Dev parallel; research only maps cite path + structural implications"
    - id: medical_guideline_sites
      why: "Brand bans diagnoses/promises; do not research clinical protocols as source of truth — vault method only"

  open_questions:
    - "Where will EG_CLIENT_PROGRAMS_STYLE_SPEC.md land (path) and when — factory cite placeholder vs wait?"
    - "Draft destination: 90_ВХОДЯЩИЕ/ vs EG_КЛИЕНТЫ/ (folder missing) — confirm path for HITL outputs"
    - "Is /программа Cyrillic alias required in v1 or defer?"
    - "Do monthly + long-term need separate section maps beyond TEMPLATE (TEMPLATE biased to post-session)?"
    - "Optional agent: skip for v1 if /eg-programma + skill router mirrors eg-producer?"
    - "Locate EG_PDF_PREMIUM_STYLE_SYSTEM.md outside repo for Zero-Copy cite (home/EG ecosystem)?"

  coverage_expectation:
    min_sources: 8
    without_github_mines: true
    clawhub_pass_required: true
    vendor_or_context7: "vendor-docs (Cursor + ≥2 cookbooks); Context7 skip"
    local_vault_counts_as_source_family: true
    synthesizer_must_compare:
      - "architecture A: 1 skill + 3 references + /eg-programma"
      - "architecture B: 3 thin skills + /eg-programma"
      - "architecture C: monolith skill (likely reject — context bloat)"
```

---

## Fan-out order (for research-lead)

1. **Parallel:** local-vault (lead) + vendor-docs + clawhub  
2. **Then:** community (should)  
3. **Optional:** news if changelog delta; github shallow only if gap  
4. **Synthesizer** → recommended_approach + merge_plan → research_brief + coverage_matrix  

**Do not** call factory from research. Prompt-craft after synthesis.
