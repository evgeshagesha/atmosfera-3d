# t-800-research-lead — DEEP Research Brief

**Date:** 2026-08-05  
**Topic:** Atmosfera 3D / Евгений Гошев — client programs (3 doc types) → skills + `/eg-programma`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Progress:** Research ▸ strategist→4 specialists (+local-vault lead)→synthesis  
**verdict:** `coverage_matrix.verdict: pass` · `confidence: high` · `sources_count: 22`  
**Handoff:** → brain-lead / prompt-craft (OK) · **НЕ factory** · **НЕ клиентские PDF**

---

## research_brief

```yaml
research_brief:
  mode: deep
  topic: "EG Atmosfera 3D client programs — post-session / monthly plan / long-term → Cursor skills + /eg-programma"
  artifact_surface: cursor-workspace
  workspace: /Users/egoshev/Projects/atmosfera-3d
  memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
  scout_alignment:
    block_factory: false
    skills_needed: true
    no_mass_github: true
    existing_gap: "no eg-programma / eg-client-programs; SoT in 50-programs + TEMPLATE + STYLE SPEC draft"
  recommended_artifact: mix
  artifact_surface_detail: "cursor-workspace (.cursor/skills + .cursor/commands only later)"

  search_plan:
    intent_artifact: mix
    mode: deep
    must_channels: [custom_local_vault, vendor-docs, clawhub]
    should_channels: [community]
    nice_skipped: [news, github_shallow]
    skip_channels:
      - {id: docs_context7, why: "No library/SDK/API"}
      - {id: repo-miner, why: "no_mass_github; deep_mines=0"}
      - {id: github_as_must, why: "Intake no_mass_github=true"}
      - {id: remotion_vk_site, why: "OUT per intake"}
      - {id: pdf_html_pipeline, why: "STYLE SPEC / PDF = Dev; research cites only"}
      - {id: medical_guideline_sites, why: "No diagnoses; method SoT in vault"}

  synthesis:
    recommended_approach: >
      Architecture A — one router skill `eg-client-programs` (thin SKILL.md)
      + references/{post-session,monthly-plan,long-term,bans-checklist}.md
      + thin slash `/eg-programma` ($ARGUMENTS: post-session|monthly|long-term; empty→ask)
      + optional Cyrillic alias `/программа` (mirror `/продюсер`; reliability open_q).
      HITL drafts → `90_ВХОДЯЩИЕ/program-drafts/`; disable-model-invocation: true;
      optional agent: skip. Zero-Copy cite vault SoT; never embed STYLE SPEC / 50-programs essays.
    why_best: >
      Cursor docs + agentskills progressive disclosure; shared bans/HITL/product-boundary
      once (community anti-pattern = 3 thin duplicate skills); local eg-producer proves
      thin command→skill+refs+STOP; brand_safety + ClawHub rejects (no Dr/clinic/auto-send).
    runners_up:
      - {name: "B: 3 thin skills + /eg-programma", why_weaker: "discoverability only; drift unless shared refs → collapses to A"}
      - {name: "C: monolith skill", why_weaker: "context bloat; Zero-Copy fail"}
      - {name: "Optional agent EXTEND", why_weaker: "no gap; eg-producer runs without studio agent"}
    merge_plan: >
      STRUCTURE from eg-producer-studio + /eg-producer. HITL lighter from eg-news-to-blog
      (disable-model-invocation; draft-only; single STOP + bans checklist; no dual blog hash).
      L3 maps: cite 50-programs + TEMPLATE for type1; STYLE SPEC §5 for type1–3 (draft-gated
      until «утверждаю»). Type3 = skeleton only. PRODUCT BOUNDARY §14: post-session ≠
      «Персональная программа на 30 дней»; no full sets/reps in type1. Cite voice/products/
      design + funnel. PDF visual: cite EG_PDF_PREMIUM only. ClawHub adapt section/HITL/
      week-phase; REJECT clinical theatre. Vendor: XML quote-ground + draft frontmatter
      + constraints. Factory later `.cursor/` only.
    conflicts:
      - {issue: "STYLE SPEC existence", resolution: "file EXISTS as draft HITL 2026-08-05; gate until утверждаю"}
      - {issue: "A vs B discoverability", resolution: "A wins; args on /eg-programma"}
      - {issue: "skill name", resolution: "eg-client-programs skill vs /eg-programma command (mirror producer)"}
      - {issue: "commands→skills trend", resolution: "keep thin commands/eg-programma.md + skill disable-model-invocation"}
    confidence: high
    needs_more_sources: false

  artifact_names:
    skill: eg-client-programs
    command: eg-programma
    alias: программа
    references:
      - post-session.md
      - monthly-plan.md
      - long-term.md
      - bans-checklist.md
  draft_path: "90_ВХОДЯЩИЕ/program-drafts/"
  disable_model_invocation: true
  optional_agent: skip

  cite_paths:
    - "90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/50-programs.mdc"
    - "90_ВХОДЯЩИЕ/atmosfera-os-from-claude/programs/TEMPLATE-program.md"
    - "03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/05_МЕТОДИКА_И_ПРАКТИКА/EG_CLIENT_PROGRAMS_STYLE_SPEC.md"
    - "/Users/egoshev/EG_ECOSYSTEM_MASTER/_PRESERVED/OLD_MASTER/06_RULES_AND_OPERATIONS/EG_PDF_PREMIUM_STYLE_SYSTEM.md"
    - "90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/10-voice-and-language.mdc"
    - "90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc"
    - "90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/40-design-system.mdc"
    - "03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/02_КЛИЕНТСКИЙ_ПУТЬ/HOME_AND_FREE_EQUIPMENT_FUNNEL.md"
    - ".cursor/skills/eg-producer-studio/SKILL.md"
    - ".cursor/commands/eg-producer.md"
    - ".cursor/skills/eg-news-to-blog/SKILL.md"
    - "90_ВХОДЯЩИЕ/CURSOR PROMPT ATMOSFERA 3D.md#§14"

  sources:
    - {id: "50-programs.mdc", family: local-vault, freshness: ok, accessed: "2026-08-05"}
    - {id: "TEMPLATE-program.md", family: local-vault, freshness: ok, accessed: "2026-08-05"}
    - {id: "EG_CLIENT_PROGRAMS_STYLE_SPEC.md", family: local-vault, freshness: ok, date: "2026-08-05", note: "draft HITL not SoT"}
    - {id: "EG_PDF_PREMIUM_STYLE_SYSTEM.md", family: local-vault, freshness: ok, path: "EG_ECOSYSTEM_MASTER/.../OLD_MASTER/..."}
    - {id: "eg-producer-studio+/eg-producer", family: local-precedent, freshness: ok}
    - {id: "eg-news-to-blog HITL", family: local-precedent, freshness: ok}
    - {id: "HOME_AND_FREE_EQUIPMENT_FUNNEL.md", family: local-vault, freshness: ok, date: "2026-07-29"}
    - {id: "CURSOR PROMPT §14", family: local-vault, freshness: ok}
    - {id: "10-voice + 20-products + 40-design", family: local-vault, freshness: ok}
    - {url: "https://cursor.com/docs/skills", family: vendor, freshness: ok, accessed: "2026-08-05"}
    - {url: "https://cursor.com/help/customization/skills", family: vendor, freshness: ok}
    - {url: "https://cursor.com/docs/agent/prompting", family: vendor, freshness: ok}
    - {url: "https://cursor.com/docs/cli/reference/slash-commands", family: vendor, freshness: ok}
    - {url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices", family: vendor, freshness: ok}
    - {url: "https://developers.openai.com/api/docs/guides/structured-outputs", family: vendor, freshness: ok}
    - {url: "https://cookbook.openai.com/examples/structured_outputs_intro", family: vendor, freshness: warn}
    - {url: "https://ai.google.dev/gemini-api/docs/prompting-strategies", family: vendor, freshness: ok}
    - {url: "https://agentskills.io/specification", family: community, freshness: ok}
    - {url: "https://forum.cursor.com/t/skills-vs-commands-vs-rules/148875", family: community, freshness: ok}
    - {url: "https://clawhub.ai/olivermonneke/meeting-notes-pro", family: clawhub, freshness: warn}
    - {url: "https://clawhub.ai/rotorstar/hitl-protocol", family: clawhub, freshness: warn}
    - {url: "https://clawhub.ai/openauthority/human-approval", family: clawhub, freshness: warn}

  github: null
  repo_mines: null
  community:
    signal: "1+refs"
    command_plus_skill: true
    source_count: 6
  clawhub:
    cards_adapted: 6
    rejected_verbatim: true
    security_rejects: ["Personal Fitness Coach Dr theatre", "KrumpPhysio clinical", "auto-send", "disease intake"]
  vendor_docs:
    source_count: 10
    lean: "option A 1 skill + 3 refs + slash router"
  docs: null
  news: null

  coverage_matrix:
    strategist: pass
    synthesizer: pass
    github_shallow: skip
    repo_mines: skip
    community: pass
    clawhub: pass
    vendor_docs: pass
    context7_docs: skip
    news: skip
    local_vault: pass
    sources_count: 22
    min_sources_met: true
    github_mines_required: false
    clawhub_pass_required: true
    clawhub_pass: true
    vendor_or_context7: vendor-docs
    verdict: pass

  adaptation_plan: >
    Factory CREATE: .cursor/skills/eg-client-programs/SKILL.md (thin router, Zero-Copy cite table,
    HITL STOP, draft_path, disable-model-invocation true) + references/post-session.md |
    monthly-plan.md | long-term.md | bans-checklist.md + .cursor/commands/eg-programma.md
    (+ /программа alias if supported). Do NOT promote STYLE SPEC to SoT until Евгений
    «утверждаю». Do NOT write client PDFs. Do NOT copy 50-programs essays into skill.
    Type1/2 section maps from STYLE SPEC §5 + 50-programs/TEMPLATE; type3 skeleton.
    Product boundary: post-session title and no sets/reps protocol. Services block from
    20-products. Mirror eg-producer HITL phrasing lightly.

  open_questions:
    - "STYLE SPEC: allow draft-cited markdown until «утверждаю» vs hard-block (brain)"
    - "Cyrillic /программа reliability in Agent chat (recommend ship; mirror /продюсер)"
    - "When EG_КЛИЕНТЫ/ PARA lands — migrate draft_path (PII never in git)"
    - "Type3 PDF visual canon — defer; keep long-term.md skeleton for v1"

  stale_rejected:
    - "Scout note 'STYLE SPEC not materialised' — superseded: file exists as draft HITL"
    - "ClawHub Personal Fitness Coach / KrumpPhysio clinical voice"
    - "3 thin skills architecture (B) as default"
    - "Monolith skill (C)"
    - "Optional agent EXTEND for v1"
    - "Mass github / repo-miner"

  confidence: high
  handoff: "→ prompt-craft (optional) → brain-lead → factory CREATE .cursor/ only; NOT PDF"
```

---

## Progress line (parent)

`Research ▸ strategist→4 specialists→synthesis` · coverage **pass** (22 src) · approach **A: eg-client-programs + 4 refs + /eg-programma**

---

## Vault finds (confirmed)

| Path | Status |
|------|--------|
| `50-programs.mdc` | ✅ cite |
| `TEMPLATE-program.md` | ✅ cite (post-session-biased) |
| `EG_CLIENT_PROGRAMS_STYLE_SPEC.md` | ✅ draft HITL (not SoT) |
| `EG_PDF_PREMIUM_STYLE_SYSTEM.md` | ✅ outside repo, cite-only |
| `EG_КЛИЕНТЫ/` | ❌ missing → use `program-drafts/` |

---

## Specialist fragments

- `fragments/t-800-research-strategist.md`
- `fragments/t-800-research-vendor-docs.md`
- `fragments/t-800-research-clawhub.md`
- `fragments/t-800-research-synthesizer.md`
- community: package in-session (on-disk community fragment may be prior-topic stale)
