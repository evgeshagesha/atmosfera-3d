# t-800-research-synthesizer — EG client programs

**Date:** 2026-08-05  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**topic:** Client programs — skills + `/eg-programma` (post-session / monthly / long-term)  
**status:** ok  
**needs_more_sources:** false  
**confidence:** high

---

## Families compared

| Family | Status | Weight |
|--------|--------|--------|
| Local-vault (lead package) | ok 2026-08-05 | SoT structure, product boundary §14, eg-producer/eg-news HITL, STYLE SPEC draft |
| Vendor-docs (Cursor + Claude/OpenAI/Gemini) | ok 2026-08-05 · 10 sources | cursor_fit, progressive refs, disable-model-invocation |
| ClawHub (6 cards + rejects) | ok 2026-08-05 · patterns only | section maps, HITL gates; REJECT clinical/auto-send |
| Community (agentskills + forum · package) | ok 2026-08-05 | 1+refs signal; anti 3-thin duplicate; command+skill |
| News / GitHub mines | skip / nice only | no_mass_github; no delta needed |

**Filtered out:** ClawHub Personal Fitness Coach (fake Dr/clinic), KrumpPhysio clinical ROM, Fitness Engine injury-diagnose voice, auto-send/email, monolith skill essay, STYLE SPEC prose inside skill body.

---

## Axis scorecard (A vs B vs C)

| Axis | A: 1 skill+3 refs+/eg-programma | B: 3 thin skills+cmd | C: monolith |
|------|----------------------------------|----------------------|-------------|
| cursor_fit | **win** progressive + slash-gate | ok but sprawl | fail context ring |
| modular_architecture | **win** shared HITL/bans | weaker duplicate SKILL.md | fail |
| zero_copy | **win** cite paths only | ok if shared refs | fail embed risk |
| brand_safety | **win** one ban block | drift risk ×3 | weak |
| hitl_gates | **win** disable-model-invocation | ok | weak auto-trigger risk |
| doc_type_coverage | **win** 3 L3 refs | win but costlier | fake via bloat |
| command_ux | **win** args route | ok discoverability | skill-only weak |
| security | **win** no PII in skill | same if careful | same |
| completeness | covered ≥8 families | same | same |
| optional_agent | **skip** (router enough) | skip | n/a |

**Winner:** Architecture **A**.

---

## synthesis (machine)

```yaml
status: ok
synthesis:
  recommended_approach: >
    Architecture A — one router skill `eg-client-programs` (thin SKILL.md)
    + references/{post-session,monthly-plan,long-term}.md (+ shared bans-checklist.md)
    + thin slash command `/eg-programma` with $ARGUMENTS
    (post-session|monthly|long-term; empty → ask) + optional Cyrillic alias `/программа`
    (mirror `/продюсер`; reliability open_q). HITL drafts only to
    `90_ВХОДЯЩИЕ/program-drafts/`; disable-model-invocation: true; optional agent: skip.
    Zero-Copy cite vault SoT; never embed STYLE SPEC / 50-programs essays in skill.
  why_best: >
    Maximizes cursor_fit (Cursor docs: thin SKILL + references/ progressive disclosure;
    slash-only via disable-model-invocation) and modular_architecture without skill sprawl.
    Shared HITL/bans/product-boundary (§14 post-session ≠ monthly paid protocol) live once —
    community flags 3 thin skills that duplicate logic as anti-pattern; vendor prefers A;
    local eg-producer proves thin command → skill + refs + STOP gates. Brand_safety and
    security: one ban block + ClawHub rejects (no Dr/clinic, no auto-send). Completeness
    ≥8 dated sources without github mines. Agent EXTEND adds no gap — eg-producer studio
    also runs command+skill without a dedicated studio agent.
  runners_up:
    - name: "B: 3 thin skills + /eg-programma"
      why_weaker: >
        Discoverability as three /skills is the only upside. Shared bans/HITL/Zero-Copy
        either duplicate across SKILL.md (drift) or collapse to shared references/ —
        then B is A with extra factory surface. Community anti-pattern: 3 thin duplicate
        skills. eg-producer craft split is justified by different crafts (reels/seo);
        here three doc types share one domain router.
    - name: "C: monolith skill"
      why_weaker: >
        Context bloat (agentskills: SKILL.md <500 lines / <5k tok); forces essay copy of
        vault SoT (Zero-Copy fail); worse progressive disclosure; rejected by strategist
        hypothesis and vendor lean.
    - name: "Optional agent EXTEND for client programs"
      why_weaker: >
        No clean-context specialist gap; command+skill covers routing like eg-producer
        without dedicated agent. EXTEND only if later multi-chat longitudinal client
        memory needs a named agent — out of v1 scope.
  merge_plan: >
    STRUCTURE from local eg-producer-studio + /eg-producer: thin command router,
    args → load matching craft path, HITL STOP before client-facing use; draft inbox
    pattern. From eg-news-to-blog: disable-model-invocation true, brand-safety ban block,
    draft-only never publish — lighter gates (single draft STOP + optional bans checklist
    gate; no dual article/social hash). L3 CONTENT MAPS from vault: cite 50-programs.mdc
    + TEMPLATE-program.md for type1; STYLE SPEC section maps for type1–3 as draft-gated
    (if not «утверждаю» → markdown structure drafts citing STYLE SPEC as draft OR require
    human confirm — brain open_q). Type3 = thinner skeleton ref only (future product;
    no PDF canon). PRODUCT BOUNDARY from CURSOR PROMPT §14 + HOME_AND_FREE_EQUIPMENT
    funnel: post-session title ≠ «Персональная программа на 30 дней»; no full sets/reps
    protocol in type1; monthly = paid separate; long-term = accompaniment. VOICE/CTA cite
    10-voice, 20-products, 40-design (inbox Claude OS) — paths only. PDF visual: cite
    EG_PDF_PREMIUM_STYLE_SYSTEM.md Zero-Copy only (research does not author PDF).
    CLAWHUB adapt only: Meeting Notes section spine, HITL Protocol soft gate, Wisdom
    longitudinal slots → type3 skeleton, Fitness Engine week/phase blocks → monthly ref;
    REJECT Dr/clinic/auto-send/disease intake. VENDOR prompt craft: Claude XML
    <sot>/<bans>/<doc_type> + quote-ground; OpenAI-style draft frontmatter
    {doc_type, hitl: draft, citations[], refused_claims[]}; Gemini constraints +
    section-completion. Factory later writes `.cursor/` only — do not invent STYLE SPEC
    essay inside skill.
  conflicts:
    - issue: "STYLE SPEC existence"
      sides: "Strategist probe: not in vault yet vs lead findings 2026-08-05: EG_CLIENT_PROGRAMS_STYLE_SPEC.md EXISTS as draft HITL"
      winner: "lead findings — file exists; status = draft NOT SoT until Евгений «утверждаю»"
      resolution: "Skill gates on approval status; cite as draft until affirmed"
    - issue: "Architecture A vs B (discoverability)"
      sides: "Vendor+community+strategist prefer 1+refs; B offers three /skill names"
      winner: "A — args on /eg-programma + clear description; discoverability via command UX"
      resolution: "Do not ship B unless product later demands three slash skill names; then hybrid thin wrappers → shared refs (still prefer single identity)"
    - issue: "Skill name eg-client-programs vs eg-programma"
      sides: "Vendor open_q; command is eg-programma"
      winner: "eg-client-programs for skill folder (domain clarity); command stays /eg-programma"
      resolution: "Mirror eg-producer-studio skill vs /eg-producer command naming"
    - issue: "Cursor commands converging to skills vs keep command file"
      sides: "Vendor: commands help → skills; local: eg-producer keeps thin command"
      winner: "Keep thin .cursor/commands/eg-programma.md as router + skill with disable-model-invocation"
      resolution: "Same proven hybrid as eg-producer; skill-only later optional"
    - issue: "Community fragment file vs package date"
      sides: "On-disk t-800-research-community.md stale 2026-07-29 (AGENTS topic); package summarizes 2026-08-05 community"
      winner: "User/lead findings package for this topic (1+refs, command+skill)"
      resolution: "Rank package community signal; do not trust stale fragment body for this synthesis"
  confidence: high
  sources_ranked:
    - id_or_url: "local:50-programs.mdc + TEMPLATE-program.md + §14 product boundary"
      score: 98
      role: "SoT structure + commercial doc-type split (Zero-Copy cite)"
    - id_or_url: "local:eg-producer-studio + /eg-producer HITL router"
      score: 96
      role: "Golden modular precedent for merge_plan shape"
    - id_or_url: "https://cursor.com/docs/skills"
      score: 95
      role: "Official progressive disclosure + disable-model-invocation"
    - id_or_url: "local:eg-news-to-blog + eg-news-brand-safety"
      score: 92
      role: "HITL draft-only + ban pattern (lighter for client docs)"
    - id_or_url: "local:EG_CLIENT_PROGRAMS_STYLE_SPEC.md (draft HITL)"
      score: 90
      role: "Section maps ×3 types; gate until утверждаю"
    - id_or_url: "https://agentskills.io/ + community 1+refs signal"
      score: 88
      role: "SKILL size limits; modular_recommendation_signal 1+refs"
    - id_or_url: "vendor: Claude/OpenAI/Gemini prompting cookbooks"
      score: 85
      role: "XML quote-ground, structured refusal, constraints/completion"
    - id_or_url: "clawhub: Meeting Notes Pro + HITL Protocol + Human Approval"
      score: 78
      role: "Adapt section/HITL patterns only"
    - id_or_url: "clawhub: Wisdom Coach + Fitness Engine (stripped)"
      score: 70
      role: "Type3 slots + monthly phase/week skeleton"
    - id_or_url: "local:HOME_AND_FREE_EQUIPMENT_FUNNEL.md + voice/products/design rules"
      score: 72
      role: "Ladder CTAs + tone cite pack"
    - id_or_url: "EG_PDF_PREMIUM_STYLE_SYSTEM.md (cite-only path)"
      score: 65
      role: "Visual Zero-Copy sibling; no PDF authoring in research"
    - id_or_url: "clawhub REJECT: Personal Fitness Coach / KrumpPhysio"
      score: 60
      role: "Negative security/brand examples"
  needs_more_sources: false
  gaps_for_lead: []
  recommended_artifact: mix
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
  disable_model_invocation: true
  optional_agent: skip
  open_questions:
    - "STYLE SPEC: skill behavior until Евгений says «утверждаю» — allow draft-cited markdown structure vs hard-block until confirm (brain)"
    - "Cyrillic /программа alias reliability in Cursor Agent chat (open_q; recommend ship as mirror of /продюсер)"
    - "When EG_КЛИЕНТЫ/ PARA lands — migrate draft_path from program-drafts/ (PII still not in git)"
    - "Type3 PDF visual canon — defer until product exists; keep long-term.md skeleton-only for v1"
```

---

## Human summary

**Победитель: A** — один skill `eg-client-programs` + 3–4 references + `/eg-programma` (+ `/программа`), HITL-only, agent skip.

Согласны: vendor Cursor, community 1+refs, local eg-producer, strategist hypothesis. B слабее из‑за дублей; C — bloat. STYLE SPEC есть, но draft — гейт до «утверждаю».
