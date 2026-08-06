# t-800-prompt-craft — Atmosfera 3D client-programs pack

**Date:** 2026-08-05  
**status:** ok  
**vendor:** cursor (+ idea_seeds Claude / OpenAI Cookbook / Gemini)  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Source:** `fragments/t-800-research-lead.md` DEEP PASS 2026-08-05  
**Handoff:** → brain-lead → factory CREATE `.cursor/` only → prompt-auditor  
**NOT done:** production SKILL/commands/refs (factory later) · no client PDFs · agent SKIP

---

## pack_meta

```yaml
pack_meta:
  name: atmosfera-client-programs-v1
  architecture: A  # 1 router skill + 4 refs + thin slash (+ RU alias)
  draft_path: 90_ВХОДЯЩИЕ/program-drafts/
  scaffold: 90_ВХОДЯЩИЕ/program-drafts/.gitkeep
  hitl: drafts_only_single_STOP
  disable_model_invocation: true
  optional_agent: skip
  model: inherit
  ui_language: ru
  never:
    - auto_send_client
    - medical_diagnosis
    - medical_promises
    - site_code
    - vk_pipeline
    - remotion
    - promote_STYLE_SPEC_to_SoT_before_user_PASS
    - embed_50-programs_essay
    - type1_as_30day_product
    - sets_reps_in_post_session_overload
  cite_sot:  # Zero-Copy — paths only
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/50-programs.mdc
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/programs/TEMPLATE-program.md
    - 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/05_МЕТОДИКА_И_ПРАКТИКА/EG_CLIENT_PROGRAMS_STYLE_SPEC.md  # pending SoT until «утверждаю»
    - EG_PDF_PREMIUM_STYLE_SYSTEM.md  # cite-only, outside repo
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/10-voice-and-language.mdc
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/40-design-system.mdc
    - 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/02_КЛИЕНТСКИЙ_ПУТЬ/HOME_AND_FREE_EQUIPMENT_FUNNEL.md
    - 90_ВХОДЯЩИЕ/CURSOR PROMPT ATMOSFERA 3D.md#§14
  precedent:
    - .cursor/skills/eg-producer-studio/SKILL.md  # thin router + refs
    - .cursor/commands/eg-producer.md + продюсер.md  # slash + RU alias
    - .cursor/skills/eg-news-to-blog/SKILL.md  # disable-model-invocation + HITL
  progressive_disclosure:
    L1: SKILL.md description (routing only)
    L2: SKILL.md body = detect type → cite → draft → STOP
    L3: references/{post-session,monthly-plan,long-term,bans-checklist}.md
  idea_seeds_pack:
    - thin_skill_refs_slash_only  # https://cursor.com/docs/skills
    - quote_ground_xml_then_draft  # Claude prompting best practices
    - draft_yaml_envelope_plus_refusal  # OpenAI Cookbook structured outputs
    - constraints_completion_prefix  # Gemini prompting strategies
```

---

## 1) CREATE skill: eg-client-programs

```yaml
status: ok
prompt_spec:
  artifact: skill
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: thin_skill_refs_slash_only
      url: https://cursor.com/docs/skills
      pattern: "Thin SKILL + references/ + disable-model-invocation true"
    - id: quote_ground_xml_then_draft
      url: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices
      pattern: "Read SoT → quote section headers → draft; bans explicit"
    - id: draft_yaml_envelope_plus_refusal
      url: https://cookbook.openai.com/examples/structured_outputs_intro
      pattern: "YAML draft meta + refused_claims[]; no coerce on diagnosis ask"
  path: .cursor/skills/eg-client-programs/SKILL.md
  references_paths:
    - .cursor/skills/eg-client-programs/references/post-session.md
    - .cursor/skills/eg-client-programs/references/monthly-plan.md
    - .cursor/skills/eg-client-programs/references/long-term.md
    - .cursor/skills/eg-client-programs/references/bans-checklist.md
  frontmatter:
    name: eg-client-programs
    description: |
      Роутер клиентских программ Атмосфера 3D: post-session | monthly |
      long-term → HITL-черновик в program-drafts. Zero-Copy cite vault SoT.
      Use when: /eg-programma или /программа; нужен документ после сессии,
      план на месяц или скелет долгосрочной программы.
      Do NOT use when: PDF-рендер; сайт/VK/Remotion; eg-producer / eg-news;
      диагноз/медобещания; продажа «Персональная программа на 30 дней» как
      post-session; T-800 factory; автоотправка клиенту.
    # skill fields — NOT agent 5-field set
    disable-model-invocation: true
  body_outline:
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
  anti_patterns_avoided:
    - Description Trap (full section maps in description)
    - Monolith skill (architecture C reject)
    - Three duplicate skills (architecture B default reject)
    - Optional agent EXTEND
    - Verbatim 50-programs / STYLE SPEC essay in SKILL.md
    - tools: in frontmatter
    - Dual blog-hash HITL (use single STOP)
```

---

## 2) CREATE references (L3 outlines for factory)

```yaml
status: ok
prompt_spec:
  artifact: skill  # L3 bodies under eg-client-programs
  action: CREATE_REFS
  vendor: cursor
  idea_seeds_used:
    - id: constraints_completion_prefix
      url: https://ai.google.dev/gemini-api/docs/prompting-strategies
      pattern: "Prefill section headers; model completes under constraints"
    - id: thin_skill_refs_slash_only
      url: https://cursor.com/docs/skills
  refs:
    - path: references/post-session.md
      doc_type: post-session  # Type1
      body_outline:
        - "Назначение: документ ПОСЛЕ сессии (не продукт «30 дней»)"
        - "Cite: 50-programs + TEMPLATE-program (§ maps); STYLE SPEC §5 Type1 IF user PASS else pending note"
        - "Секции: цель сессии → что сделали → домашние акценты (без полного протокола sets/reps) → дыхание/состояние кратко → ограничения/что не делать → services block (20-products) → следующий шаг"
        - "Запрет overload: не разворачивать полную тренировочную матрицу подходов/повторов"
        - "Tone: спокойный премиальный; функциональный язык; без диагнозов"
    - path: references/monthly-plan.md
      doc_type: monthly  # Type2
      body_outline:
        - "Назначение: план на ~месяц / блок встреч (отдельно от post-session)"
        - "Cite: 50-programs + STYLE SPEC §5 Type2 (draft-gated); funnel HOME_AND_FREE_EQUIPMENT where relevant"
        - "Секции: цель месяца → фазы/недели (скелет) → фокус движения/дыхания/дисциплины → чекпоинты → services/upsell без давления"
        - "Не путать с Type1 title/product boundary §14"
    - path: references/long-term.md
      doc_type: long-term  # Type3
      body_outline:
        - "Назначение: SKELETON долгосрочной программы (v1)"
        - "Cite: STYLE SPEC §5 Type3 pending; 50-programs for continuity language"
        - "Секции-скелет: горизонт → этапы (оценка→регуляция→коррекция→интеграция→стабилизация map) → критерии прогресса → review cadence → open questions for coach"
        - "Запрет: полный PDF-канон / визуальный layout (defer); не раздувать до монографии"
    - path: references/bans-checklist.md
      doc_type: shared
      body_outline:
        - "Hard fail: диагноз-ярлык; вылечим/исцеление/избавим навсегда; physician-claim «врач»; секретный/революционный метод; тело мечты"
        - "Product: Type1≠«Персональная программа на 30 дней»; no sets/reps overload in post-session"
        - "Ops: no auto-send; no site/VK/Remotion; drafts only program-drafts/; PII not for git commit"
        - "STYLE SPEC: cite as pending until «утверждаю»; EG_PDF_PREMIUM cite-only never embed"
        - "On diagnosis ask → refuse block + functional reframe; do not fill fake clinical schema"
  anti_patterns_avoided:
    - Clinical theatre from ClawHub rejects
    - Embedding PDF premium CSS/HTML into refs
```

---

## 3) CREATE command: /eg-programma

```yaml
status: ok
prompt_spec:
  artifact: command
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: thin_skill_refs_slash_only
      url: https://cursor.com/docs/cli/reference/slash-commands
      pattern: "Optional args like /plan [prompt]; thin router"
    - id: human_in_the_loop_stop
      url: https://cursor.com/docs/agent/prompting
      pattern: "@attach SoT; STOP gate; mirror eg-producer lighter"
  path: .cursor/commands/eg-programma.md
  frontmatter:
    name: eg-programma
    description: |
      Клиентские программы Атмосфера 3D: post-session|monthly|long-term.
      HITL-черновик в program-drafts. Без автоотправки.
      Use when: /eg-programma или нужен клиентский программный документ.
      Do NOT use when: eg-producer; eg-news-to-blog; PDF-пайплайн; сайт;
      VK; Remotion; медобещания; T-800 factory.
  # commands: name+description only (not agent 5-field)
  body_outline:
    - "Роль: тонкий slash-роутер → skill eg-client-programs"
    - "Сначала Read: SKILL.md + matching references/{type}.md + bans-checklist.md + cite SoT paths"
    - "Parse $ARGUMENTS: post-session|monthly|long-term; empty → ask one clarifying question"
    - "Маршрут: invoke skill algorithm; draft → 90_ВХОДЯЩИЕ/program-drafts/"
    - "STOP gate: «Утверждаю черновик» (single; no dual hash)"
    - "Выход: mode + draft_path + status + next_step"
    - "Запреты: no auto-send; no site/VK/Remotion; no Type1=30-day; no sets/reps overload; no diagnose; no skip HITL"
  anti_patterns_avoided:
    - Fat command duplicating skill body
    - Dual HITL from news pipeline
    - Agent Task nesting
```

---

## 4) CREATE command alias: /программа

```yaml
status: ok
prompt_spec:
  artifact: command
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: slash_alias_mirror
      url: https://cursor.com/docs/cli/reference/slash-commands
      pattern: "Aliases precedent; mirror local /продюсер"
  path: .cursor/commands/программа.md
  frontmatter:
    name: программа
    description: |
      Алиас /eg-programma — клиентские программы Атмосфера 3D (HITL).
      Use when: пользователь вызывает /программа.
      Do NOT use when: см. /eg-programma; не дублировать логику — следовать primary.
  body_outline:
    - "Выполни тот же пайплайн, что .cursor/commands/eg-programma.md (primary)"
    - "Callout: Cyrillic slash UX не верифицирован в official docs — Latin /eg-programma primary"
    - "Gates: «Утверждаю черновик»"
    - "Инварианты: drafts→program-drafts/; no auto-send; bans from skill"
    - "Сначала Read primary command + eg-client-programs SKILL"
  anti_patterns_avoided:
    - Duplicating full skill logic in alias file
```

---

## 5) SKIP agent

```yaml
status: skip
prompt_spec:
  artifact: agent
  action: SKIP
  reason: >
    Research + synthesis: optional agent EXTEND weaker; eg-producer runs without
    studio agent; no gap for new Task()-callable agent in v1 client-programs pack.
  vendor: cursor
```

---

## 6) Scaffold (factory note, not prompt body)

```yaml
status: ok
factory_scaffold:
  - path: 90_ВХОДЯЩИЕ/program-drafts/.gitkeep
    note: "Empty dir for HITL drafts; PII never commit; migrate to EG_КЛИЕНТЫ/ later if PARA lands"
```

---

## QA handoff

После factory builder/integrator:

1. `Task(t-800-prompt-auditor)` на skill + 2 commands (+ refs presence)
2. Critical checks: Description Trap · disable-model-invocation: true · Zero-Copy cite table present · Type1≠30-day · no sets/reps overload wording · Type3=skeleton · STYLE SPEC pending · no agent file · no site/VK/Remotion
3. Только `ok` → `Task(t-800-factory-auditor)`

---

## Progress line (parent)

`Prompt-craft ▸ eg-client-programs + 4 refs + /eg-programma|/программа · agent SKIP · scaffold program-drafts` · status **ok** · → brain-lead / factory
