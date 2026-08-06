# t-800-factory-architect — atmosfera-client-programs-mvp

**Date:** 2026-08-05  
**status:** ok  
**pack_name:** `atmosfera-client-programs-mvp`  
**role:** architect (CREATE pack) — **no production files written**  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Sources:** `fragments/t-800-prompt-craft.md` · `fragments/t-800-brain-lead.md` · `factory-briefs/atmosfera-client-programs-mvp.yaml`  
**Handoff:** → `Task(t-800-factory)` builder (then prompt-auditor → factory-auditor)  
**Architecture:** A ACCEPT (locked) · B/C REJECT · Agent SKIP

---

## Verdict

| Decision | Value |
|----------|--------|
| Primary type | **skill** (router) + **commands** (slash) + **refs** (L3) + **scaffold** |
| Agent | **SKIP** |
| Rule / hook / MCP / director-rule | **SKIP** / OUT OF SCOPE |
| artifact_surface | `cursor-workspace` (`.cursor/` only; `target_plugin: null`) |
| registry agents patch | **none** — no plugin agent registry entry |
| disable-model-invocation | **true** (mirror eg-news-to-blog, NOT producer-studio `false`) |

---

## architect_spec

```yaml
status: ok
pack_name: atmosfera-client-programs-mvp
action: CREATE
architecture: A  # 1 router skill + 4 refs + thin slash + Cyrillic alias

target_context:
  workspace: /Users/egoshev/Projects/atmosfera-3d
  memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
  artifact_surface: cursor-workspace
  target_plugin: null
  knowledge_vault_path: null
  ui_language: ru

type_decision:
  primary: skill
  companions:
    - command (primary + Cyrillic alias)
    - skill_refs (4)
    - scaffold (.gitkeep)
  rejected:
    - subagent
    - rule
    - hook
    - mcp
    - director-rule
  rationale: >
    HITL workflow with progressive disclosure and explicit slash invoke.
    No separate context window needed → skill not agent.
    Always-on reminder not needed → no rule.
    Mirror eg-producer thin+refs + eg-news disable+HITL.

# ---------------------------------------------------------------------------
# 1) file_plan[] — exact paths + what each contains
# ---------------------------------------------------------------------------
file_plan:
  - path: .cursor/skills/eg-client-programs/SKILL.md
    kind: skill
    action: CREATE
    contains_sections:
      - "YAML frontmatter (name, description Use/Do NOT, disable-model-invocation: true)"
      - "# eg-client-programs — one-line role (HITL markdown drafts only)"
      - "## Роль"
      - "## Когда применять (triggers / не применять)"
      - "## Что читать — cite_sot table (paths only, Zero-Copy)"
      - "## L3 refs — load ONE type ref + always bans-checklist.md"
      - "## Алгоритм — 6 steps (parse → Read/quote → bans → outline → draft → STOP)"
      - "## Draft YAML meta"
      - "## Product boundary"
      - "## Выход"
      - "## Связи"
      - "## Запреты"
    mirror: >
      Structure like eg-producer-studio (thin+refs sections) but
      disable-model-invocation: true like eg-news-to-blog; single STOP
      «Утверждаю черновик» (not dual-hash).

  - path: .cursor/skills/eg-client-programs/references/post-session.md
    kind: skill_ref
    action: CREATE
    doc_type: post-session  # Type1
    contains_sections:
      - "# post-session (Type1)"
      - "## Назначение — документ ПОСЛЕ сессии ≠ продукт «30 дней»"
      - "## Cite (paths) — 50-programs + TEMPLATE; STYLE SPEC §5 Type1 draft-gated"
      - "## Prefill sections — цель → сделали → домашние акценты → дыхание → ограничения → services → next"
      - "## Overload ban — no full sets/reps matrix"
      - "## Tone"

  - path: .cursor/skills/eg-client-programs/references/monthly-plan.md
    kind: skill_ref
    action: CREATE
    doc_type: monthly  # Type2
    contains_sections:
      - "# monthly-plan (Type2)"
      - "## Назначение — план ~месяц / блок встреч (≠ Type1)"
      - "## Cite — 50-programs + STYLE SPEC §5 Type2 draft-gated + HOME funnel"
      - "## Prefill sections — цель месяца → фазы/недели → столпы → чекпоинты → services"
      - "## Boundary — not Type1 title; not §14 30-day product"

  - path: .cursor/skills/eg-client-programs/references/long-term.md
    kind: skill_ref
    action: CREATE
    doc_type: long-term  # Type3
    contains_sections:
      - "# long-term (Type3) — SKELETON only v1"
      - "## Назначение"
      - "## Cite — STYLE SPEC §5 Type3 pending; 50-programs continuity"
      - "## Prefill skeleton — горизонт → этапы (метод map) → прогресс → review → open Q"
      - "## Ban — no PDF visual canon / no monograph"

  - path: .cursor/skills/eg-client-programs/references/bans-checklist.md
    kind: skill_ref
    action: CREATE
    doc_type: shared
    contains_sections:
      - "# bans-checklist — hard fail gates"
      - "## Medical / brand bans"
      - "## Product boundary bans"
      - "## Ops bans (auto-send, site/VK/Remotion, PII)"
      - "## STYLE SPEC / PDF premium cite rules"
      - "## On diagnosis ask — refuse + functional reframe"

  - path: .cursor/commands/eg-programma.md
    kind: command
    action: CREATE
    role: primary thin slash
    contains_sections:
      - "YAML frontmatter (name + description only)"
      - "# /eg-programma — thin router"
      - "## Сначала прочитай"
      - "## Parse $ARGUMENTS"
      - "## Маршрут → skill algorithm"
      - "## STOP gate"
      - "## Выход"
      - "## Запреты"
    mirror: eg-producer.md (thinner — no kontent/prodazhi nesting)

  - path: .cursor/commands/программа.md
    kind: command_alias
    action: CREATE
    role: Cyrillic alias
    contains_sections:
      - "YAML frontmatter"
      - "# /программа — алиас /eg-programma"
      - "Pointer to primary (no duplicated logic)"
      - "Callout Cyrillic UX unverified — Latin primary"
      - "Gates + invariants short"
    mirror: продюсер.md

  - path: 90_ВХОДЯЩИЕ/program-drafts/.gitkeep
    kind: scaffold
    action: CREATE
    contains: empty file (keep dir in git)
    note: HITL drafts land here; PII never commit; EG_КЛИЕНТЫ/ deferred

# ---------------------------------------------------------------------------
# 2) Frontmatter — copy from prompt-craft (do not invent)
# ---------------------------------------------------------------------------
frontmatter:
  skill:
    path: .cursor/skills/eg-client-programs/SKILL.md
    yaml: |
      ---
      name: eg-client-programs
      description: |
        Роутер клиентских программ Атмосфера 3D: post-session | monthly |
        long-term → HITL-черновик в program-drafts. Zero-Copy cite vault SoT.
        Use when: /eg-programma или /программа; нужен документ после сессии,
        план на месяц или скелет долгосрочной программы.
        Do NOT use when: PDF-рендер; сайт/VK/Remotion; eg-producer / eg-news;
        диагноз/медобещания; продажа «Персональная программа на 30 дней» как
        post-session; T-800 factory; автоотправка клиенту.
      disable-model-invocation: true
      ---
    # FORBIDDEN on skill frontmatter: model, readonly, tools, is_background

  command_primary:
    path: .cursor/commands/eg-programma.md
    yaml: |
      ---
      name: eg-programma
      description: |
        Клиентские программы Атмосфера 3D: post-session|monthly|long-term.
        HITL-черновик в program-drafts. Без автоотправки.
        Use when: /eg-programma или нужен клиентский программный документ.
        Do NOT use when: eg-producer; eg-news-to-blog; PDF-пайплайн; сайт;
        VK; Remotion; медобещания; T-800 factory.
      ---
    # commands: name+description only (not agent 5-field)

  command_alias:
    path: .cursor/commands/программа.md
    yaml: |
      ---
      name: программа
      description: |
        Алиас /eg-programma — клиентские программы Атмосфера 3D (HITL).
        Use when: пользователь вызывает /программа.
        Do NOT use when: см. /eg-programma; не дублировать логику — следовать primary.
      ---

# ---------------------------------------------------------------------------
# 3) body_outline — from prompt-craft (do NOT invent new architecture)
# ---------------------------------------------------------------------------
body_outlines:
  SKILL.md:
    - "Роль: HITL-оператор клиентских программ EG; черновик markdown only; не шлёт клиенту"
    - "Что читать (cite table, no essay paste): 50-programs.mdc; TEMPLATE-program.md; STYLE SPEC (pending SoT — draft-gated); EG_PDF_PREMIUM cite-only; 10-voice; 20-products; 40-design; HOME_AND_FREE_EQUIPMENT_FUNNEL; §14 product boundary; refs L3"
    - "L3: load ONE type ref + always bans-checklist.md"
    - "Алгоритм: (1) Parse type post-session|monthly|long-term; empty→ask (2) Read SoT + quote section headers (3) Run bans-checklist; ban→status blocked_ban + refused_claims (4) Prefill outline from type ref / TEMPLATE (5) Write draft → 90_ВХОДЯЩИЕ/program-drafts/ with YAML meta (6) STOP «Утверждаю черновик»"
    - "Draft YAML meta: doc_type, hitl: draft, citations[], refused_claims[], style_spec_status: pending|approved"
    - "Product boundary: Type1 ≠ 30-day product; no full sets/reps protocol in post-session; services block from 20-products"
    - "Type3 = skeleton only (no full PDF visual canon in v1)"
    - "Выход: draft_path + doc_type + status ok|needs_type|blocked_ban|needs_sot + next_step"
    - "Связи: invoked by /eg-programma|/программа; no Task(agent); no kontent/prodazhi"
    - "Запреты: no autopost/auto-send; no site/VK/Remotion; no diagnose/«вылечим»; no Zero-Copy violate; no STYLE SPEC as SoT until user PASS; no Description Trap"

  references/post-session.md:
    - "Назначение: документ ПОСЛЕ сессии (не продукт «30 дней»)"
    - "Cite: 50-programs + TEMPLATE-program (§ maps); STYLE SPEC §5 Type1 IF user PASS else pending note"
    - "Секции: цель сессии → что сделали → домашние акценты (без полного протокола sets/reps) → дыхание/состояние кратко → ограничения/что не делать → services block (20-products) → следующий шаг"
    - "Запрет overload: не разворачивать полную тренировочную матрицу подходов/повторов"
    - "Tone: спокойный премиальный; функциональный язык; без диагнозов"

  references/monthly-plan.md:
    - "Назначение: план на ~месяц / блок встреч (отдельно от post-session)"
    - "Cite: 50-programs + STYLE SPEC §5 Type2 (draft-gated); funnel HOME_AND_FREE_EQUIPMENT where relevant"
    - "Секции: цель месяца → фазы/недели (скелет) → фокус движения/дыхания/дисциплины → чекпоинты → services/upsell без давления"
    - "Не путать с Type1 title/product boundary §14"

  references/long-term.md:
    - "Назначение: SKELETON долгосрочной программы (v1)"
    - "Cite: STYLE SPEC §5 Type3 pending; 50-programs for continuity language"
    - "Секции-скелет: горизонт → этапы (оценка→регуляция→коррекция→интеграция→стабилизация map) → критерии прогресса → review cadence → open questions for coach"
    - "Запрет: полный PDF-канон / визуальный layout (defer); не раздувать до монографии"

  references/bans-checklist.md:
    - "Hard fail: диагноз-ярлык; вылечим/исцеление/избавим навсегда; physician-claim «врач»; секретный/революционный метод; тело мечты"
    - "Product: Type1≠«Персональная программа на 30 дней»; no sets/reps overload in post-session"
    - "Ops: no auto-send; no site/VK/Remotion; drafts only program-drafts/; PII not for git commit"
    - "STYLE SPEC: cite as pending until «утверждаю»; EG_PDF_PREMIUM cite-only never embed"
    - "On diagnosis ask → refuse block + functional reframe; do not fill fake clinical schema"

  commands/eg-programma.md:
    - "Роль: тонкий slash-роутер → skill eg-client-programs"
    - "Сначала Read: SKILL.md + matching references/{type}.md + bans-checklist.md + cite SoT paths"
    - "Parse $ARGUMENTS: post-session|monthly|long-term; empty → ask one clarifying question"
    - "Маршрут: invoke skill algorithm; draft → 90_ВХОДЯЩИЕ/program-drafts/"
    - "STOP gate: «Утверждаю черновик» (single; no dual hash)"
    - "Выход: mode + draft_path + status + next_step"
    - "Запреты: no auto-send; no site/VK/Remotion; no Type1=30-day; no sets/reps overload; no diagnose; no skip HITL"

  commands/программа.md:
    - "Выполни тот же пайплайн, что .cursor/commands/eg-programma.md (primary)"
    - "Callout: Cyrillic slash UX не верифицирован в official docs — Latin /eg-programma primary"
    - "Gates: «Утверждаю черновик»"
    - "Инварианты: drafts→program-drafts/; no auto-send; bans from skill"
    - "Сначала Read primary command + eg-client-programs SKILL"

# ---------------------------------------------------------------------------
# 4) cite_sot table (Zero-Copy — paths only in production files)
# ---------------------------------------------------------------------------
cite_sot:
  - path: 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/50-programs.mdc
    role: programs structure / types SoT
  - path: 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/programs/TEMPLATE-program.md
    role: section map template
  - path: 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/05_МЕТОДИКА_И_ПРАКТИКА/EG_CLIENT_PROGRAMS_STYLE_SPEC.md
    role: style draft — pending SoT until user «утверждаю»
    style_spec_status: pending
  - path: EG_PDF_PREMIUM_STYLE_SYSTEM.md
    role: cite-only outside repo; never embed CSS/HTML
  - path: 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/10-voice-and-language.mdc
    role: voice
  - path: 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc
    role: services block / prices
  - path: 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/40-design-system.mdc
    role: design language (cite, no paste)
  - path: 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/02_КЛИЕНТСКИЙ_ПУТЬ/HOME_AND_FREE_EQUIPMENT_FUNNEL.md
    role: home / equipment funnel for monthly
  - path: "90_ВХОДЯЩИЕ/CURSOR PROMPT ATMOSFERA 3D.md#§14"
    role: product boundary Type1 ≠ 30-day

# ---------------------------------------------------------------------------
# 5) skip list
# ---------------------------------------------------------------------------
skip:
  - agent (optional EXTEND weaker; eg-producer runs without studio agent)
  - rule / alwaysApply routing for this pack
  - hook / hooks.json
  - MCP wiring
  - director-rule / eg-director-brand (OUT OF SCOPE this run)
  - client PDF generation / PDF render
  - site / Next edits
  - VK pipeline
  - Remotion
  - auto-send to client
  - promote STYLE SPEC to SoT before user PASS
  - embed 50-programs / STYLE SPEC essay in SKILL
  - Architecture B (3 skills) / C (monolith)
  - plugin agents-registry.json entry
  - EG_КЛИЕНТЫ/ migrate (defer)
  - Type3 PDF visual canon (defer)

# ---------------------------------------------------------------------------
# 6) integration notes — cursor-workspace (no plugin registry agents)
# ---------------------------------------------------------------------------
integration_notes:
  surface: cursor-workspace
  plugin_root: null
  write_roots:
    - .cursor/skills/eg-client-programs/
    - .cursor/commands/
    - 90_ВХОДЯЩИЕ/program-drafts/
  do_not_touch:
    - agents/
    - hooks.json / .cursor/hooks/
    - .cursor/rules/ (no new rule this pack)
    - plugins/local/t-800-agent/registry/
    - factory-briefs for director-rule
  discovery:
    - Skills auto-discovered from .cursor/skills/*/SKILL.md
    - Commands from .cursor/commands/*.md
    - disable-model-invocation: true → slash-only (not ambient Agent pick)
  precedents:
    - .cursor/skills/eg-producer-studio/SKILL.md  # thin+refs layout
    - .cursor/skills/eg-news-to-blog/SKILL.md      # disable=true + HITL
    - .cursor/commands/eg-producer.md
    - .cursor/commands/продюсер.md
  hitl:
    draft_path: 90_ВХОДЯЩИЕ/program-drafts/
    stop_phrase: "Утверждаю черновик"
    dual_hash: false
    auto_send: false
  naming_convention:
    skill: eg-client-programs
    command_latin: eg-programma
    command_cyrillic: программа
    latin_primary: true
  gitignore_hint: >
    Consider ignoring real client drafts under program-drafts/* except .gitkeep;
    builder may note in SKILL; do not invent .gitignore change unless existing pattern
    for producer-drafts — check first, do not expand scope.
  post_builder_qa:
    - "Task(t-800-prompt-auditor) on skill + 2 commands + refs presence"
    - "Critical: Description Trap · disable=true · Zero-Copy cite · Type1≠30-day · no sets/reps overload · Type3=skeleton · STYLE pending · no agent · no site/VK/Remotion"
    - "Only ok → Task(t-800-factory-auditor)"

# ---------------------------------------------------------------------------
# 7) calls / calledBy (skill graph — no agent)
# ---------------------------------------------------------------------------
graph:
  # No agent nodes. Skill is workflow artifact; commands invoke it by Read+follow.
  skill:
    name: eg-client-programs
    calls: []          # no Task(agent); no nested skills required in v1
    calledBy:
      - command:eg-programma
      - command:программа
  commands:
    eg-programma:
      calls: [skill:eg-client-programs]
      calledBy: [user_slash]
    программа:
      calls: [command:eg-programma]  # alias → primary → skill
      calledBy: [user_slash]
  agents: []

# ---------------------------------------------------------------------------
# registry_patch — N/A for cursor-workspace skills/commands
# ---------------------------------------------------------------------------
registry_patch: null
# Integrator: do NOT add agents-registry.json entry.
# Optional future workspace manifest (out of scope): none required for MVP.

# ---------------------------------------------------------------------------
# companions (architect checklist)
# ---------------------------------------------------------------------------
companions:
  command: .cursor/commands/eg-programma.md
  command_alias: .cursor/commands/программа.md
  rule: null
  skill: .cursor/skills/eg-client-programs/SKILL.md
  hook_spec: null
  script_spec: null
  mcp_wiring_spec: null

# ---------------------------------------------------------------------------
# builder constraints (hard)
# ---------------------------------------------------------------------------
constraints:
  - "CREATE only file_plan paths; nothing else"
  - "Copy frontmatter + body_outlines from this spec / prompt-craft — do not invent Architecture B/C"
  - "disable-model-invocation: true on skill"
  - "Zero-Copy: cite paths only for 50-programs, TEMPLATE, STYLE SPEC, EG_PDF_PREMIUM — no essay paste"
  - "STYLE SPEC: style_spec_status pending; cite as draft; allow markdown drafts"
  - "Type1 ≠ «Персональная программа на 30 дней»; no sets/reps overload post-session; Type3 skeleton only"
  - "Brand bans: диагнозы; вылечим/исцеление/избавим навсегда; «врач» physician-claim; секретный/революционный; тело мечты"
  - "NO site/VK/Remotion/PDF render/agent/hooks/mcp/director-rule"
  - "Skill body ≤ progressive disclosure; Description Trap avoid (routing-only description)"
  - "No tools:/model:/readonly: on skill frontmatter"
  - "PII drafts not for git commit"
  - "Latin /eg-programma primary; /программа thin alias only"

open_questions: []  # all resolved in brain-lead

anti_patterns_avoided:
  - Description Trap
  - Monolith skill (C)
  - Three duplicate skills (B)
  - Optional agent EXTEND
  - Verbatim 50-programs / STYLE SPEC in SKILL
  - tools: in frontmatter
  - Dual blog-hash HITL
  - Fat command duplicating skill body
  - Agent Task nesting / kontent/prodazhi in this pack
```

---

## Builder checklist (ordered)

1. CREATE dirs: `.cursor/skills/eg-client-programs/references/`, `90_ВХОДЯЩИЕ/program-drafts/`
2. WRITE `SKILL.md` with frontmatter + body from outlines (mirror producer-studio section rhythm; news disable+HITL)
3. WRITE 4 refs from body_outlines
4. WRITE `eg-programma.md` then thin `программа.md`
5. WRITE `.gitkeep`
6. STOP — do not create agent/rule/hook
7. Handoff → `Task(t-800-prompt-auditor)`

---

## Progress line (parent)

`Architect ▸ CREATE pack atmosfera-client-programs-mvp · skill+4refs+/eg-programma|/программа · agent SKIP` · status **ok** · → builder
