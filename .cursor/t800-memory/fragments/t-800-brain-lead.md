# t-800-brain-lead — Atmosfera 3D producer pack

**Date:** 2026-08-04  
**Progress:** Brain ▸ domains: context+agents → brief ready  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Handoff:** → `Task(t-800-factory)`  
**status:** ok

---

## Domains called

| Domain | Agent ID | Role |
|--------|----------|------|
| context | [context](03960b83-335e-4657-ab1d-4096d1e5f4c2) | skills/commands/rules/Zero-Copy surface |
| agents | [agents](7320efc4-43d0-4e52-aec5-0ae0877e6b47) | Task(), inherit, HITL vs STOP, no Critic |

Skipped: cloud, dev, admin, security, tools, teya (not in scope).

---

## KB vs research reconcile

| Claim | Verdict |
|-------|---------|
| Skill-first + EXTEND kontent/prodazhi | **PASS** — KB decision_matrix + agent-vs-skill |
| 5-field agent frontmatter + no `tools:` | **PASS** — both domains |
| Progressive L1–L3 | **PASS as convention** — Cursor docs = progressive + `references/`; L1–L3 not official field names |
| HITL STOP gates in command | **PASS as prompt contract** — no first-class Cursor «HITL STOP» API; use wait-for-user phrases + Accept/Reject |
| Critic agent v1 | **REJECT** confirmed — skill checklist |
| Cyrillic `/продюсер` alias file | **WARN** — keep Latin primary; verify slash UX |
| KB stale 33d | **WARN non-blocking** — `recommend_maintainer`; `block_factory: false` |
| draft_path missing | **CREATE scaffold** — `90_ВХОДЯЩИЕ/producer-drafts/.gitkeep` (dir absent now) |

---

## brief_for_factory

```yaml
brief_for_factory:
  target_context:
    workspace_root: "/Users/egoshev/Projects/atmosfera-3d"
    memory_path: "/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory"
    artifact_surface: cursor-workspace
    profile: workspace-cursor
    knowledge_vault_path: null
    pack_name: atmosfera-producer-mvp

  research_brief_ref: fragments/t-800-research-lead.md
  prompt_craft_ref: fragments/t-800-prompt-craft.md
  scout_ref: fragments/t-800-scout.md
  synthesis_summary: >
    Skill-first hybrid: 4 modular producer skills (progressive disclosure) +
    thin /eg-producer (+ /продюсер) + EXTEND kontent (drafter) and prodazhi
    (CTA→anketa). HITL drafts only; Zero-Copy SoT; no site/autopost.

  topic: "Atmosfera 3D / Евгений Гошев — producer pack MVP (skills+command+EXTEND agents)"

  recommended_artifact: mix

  factory_create_extend_list:
    CREATE:
      - {type: skill, name: eg-producer-studio, path: .cursor/skills/eg-producer-studio/SKILL.md, refs: references/}
      - {type: skill, name: eg-reels-script, path: .cursor/skills/eg-reels-script/SKILL.md, refs: references/}
      - {type: skill, name: eg-warmup, path: .cursor/skills/eg-warmup/SKILL.md, refs: references/}
      - {type: skill, name: eg-seo-brief, path: .cursor/skills/eg-seo-brief/SKILL.md, refs: references/}
      - {type: command, name: eg-producer, path: .cursor/commands/eg-producer.md}
      - {type: command, name: продюсер, path: .cursor/commands/продюсер.md, note: "thin alias mirror; Latin /eg-producer primary"}
      - {type: dir_scaffold, path: 90_ВХОДЯЩИЕ/producer-drafts/.gitkeep, note: "dir currently missing"}
    EXTEND:
      - {type: agent, name: kontent, path: .cursor/agents/kontent.md, note: "5-field FM + skill-backed; drafts→producer-drafts"}
      - {type: agent, name: prodazhi, path: .cursor/agents/prodazhi.md, note: "CTA pin anketa + ban scan; drafts→producer-drafts"}
    REUSE:
      - .cursor/rules/atmosfera-3d.mdc
      - .cursor/rules/eg-news-brand-safety.mdc
      - .cursor/skills/eg-news-to-blog/  # dual HITL pattern / seo-clusters pointer only
    DO_NOT:
      - new_rules
      - critic_agent_v3
      - hooks
      - mcp.json
      - site-next / Wave2 money pages
      - VK_TG_autopost_code
      - Remotion_Mediabunny_in_pack
      - Workspace_Automations_auto_publish
      - mass_skill_clone

  zero_copy_sot_paths:
    brand_core:
      - .cursor/rules/atmosfera-3d.mdc
      - 00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md
      - 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/01_EG_OS_БРЕНД/TRAINING_SYSTEM_POSITIONING_MASTER.md
      - 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/01_EG_OS_БРЕНД/OWNERSHIP_MAP.md
    tone_safety:
      - .cursor/rules/eg-news-brand-safety.mdc
      - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/10-voice-and-language.mdc  # optional pointer if present
    products_ladder:
      - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc
      - 00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md  # product ladder section — Read only
      # note: 02_ЗОНЫ/продукты/ currently absent — do not invent; cite above
    seo_map:
      - 01_ПРОЕКТЫ/P01_сайт_и_сервер/SEO_KEYWORD_MAP.md
      - 01_ПРОЕКТЫ/P01_сайт_и_сервер/SEO_ФУНДАМЕНТ.md
      - 01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md
      - .cursor/skills/eg-news-to-blog/references/seo-clusters.md
    content_formulas_optional:
      - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/30-content-formulas.mdc
    law: "READ paths in skills/agents; NEVER paste MASTER/ToV essays into SKILL.md bodies"

  drafts:
    path: 90_ВХОДЯЩИЕ/producer-drafts/
    published: false
    create_policy: scaffold_gitkeep_once

  cta:
    default: "https://eg.egoshev.ru/anketa"
    rule: one_cta_only
    youtube_ban: "never use eg.egoshev.ru as YouTube CTA domain"

  brand_bans:
    - medical_promises  # вылечим / исцеление / избавим навсегда / секретный|революционный метод
    - no_врач_claim  # medical education OK; слово «врач» — never
    - no_anti_gym
    - "без тренажёров ≠ без оборудования"
    - тело_мечты
    - FOMO_deficit_bait
    - multi_CTA / hashtag_spam / 👆
    - auto_tg / auto_vk / auto_blog_json / auto_meta

  models: inherit_chat  # agents model: inherit; no pin

  hitl:
    mode: mixed_HITL
    stop_implementation: command_prompt_gates  # not a Cursor product API
    gate_phrases_ru:
      - "Утверждаю brief"
      - "Утверждаю beats"
      - "Утверждаю черновик"
      - "Ready"
    social_blog_overlap: "point to eg-news-to-blog dual hash; do not duplicate"

  orchestration:
    command: /eg-producer
    alias_file: /продюсер
    flow: "studio brief → STOP → craft skill → STOP → Task(kontent) → STOP → Task(prodazhi) → ready"
    parent_must_pass_full_context: true  # subagents have clean context
    leaf_agents_no_nested_Task: true

  authoritative_facts:
    - "Skills: .cursor/skills/<name>/SKILL.md; frontmatter name+description; progressive via references/"
    - "Description Trap FAIL: description = Use when/Do NOT only; body = Role→Algorithm→Output→Bans"
    - "Subagents: exactly 5 FM fields (name, description, model, readonly, is_background); FORBIDDEN tools:"
    - "model: inherit; readonly: false for draft writes"
    - "Commands: .cursor/commands/*.md; slash-only; thin router"
    - "REUSE rules .mdc only; no new rules this pack"
    - "Critic = skill checklist, not 3rd agent"
    - "HITL STOP = command wait-for-user contract (+ Accept/Reject); no dedicated STOP API"
    - "Nesting ≤2; kontent/prodazhi are leaves"
    - "surface: cursor-workspace only — no plugin registry, no hooks, no MCP for MVP"

  official_urls:
    - https://cursor.com/docs/skills
    - https://cursor.com/docs/subagents
    - https://cursor.com/docs/context/rules
    - https://cursor.com/docs/customize-cursor
    - https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview
    - https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
    - https://ai.google.dev/gemini-api/docs/prompting-strategies
    - https://github.com/openai/openai-cookbook/blob/main/examples/Structured_Outputs_Intro.ipynb

  constraints:
    - Zero-Copy SoT — cite paths, never paste brand essays
    - drafts only → 90_ВХОДЯЩИЕ/producer-drafts/; published:false
    - CTA single → https://eg.egoshev.ru/anketa
    - brand bans (medical, врач, anti-gym, FOMO, autopost)
    - NOT site code / NOT VK-TG autopost / NOT Remotion in pack
    - EXTEND kontent+prodazhi only — no CREATE third agent
    - prompt_specs from fragments/t-800-prompt-craft.md (7/7 ok) are builder source
    - after builder → Task(t-800-prompt-auditor) focus: Description Trap, 5-field FM, HITL STOP, single CTA
    - Cyrillic alias secondary; verify UI
    - 02_ЗОНЫ/продукты/ absent — use 20-products-prices.mdc + ГЛАВНЫЙ_КОНТЕКСТ

  stale_warnings:
    - "KB manifest last_full_sync=2026-07-02; age=33d → stale; recommend_maintainer=true; block_factory=false"
    - "L1–L3 = factory convention, not Cursor official field names"
    - "Cyrillic command slash ID unverified in official docs"

  domains_called:
    - t-800-brain-context
    - t-800-brain-agents

  prompt_auditor_focus:
    - Description Trap on all 7 artifacts
    - agent frontmatter exactly 5 fields; no tools:
    - HITL STOP present in command
    - CTA anketa single
    - Zero-Copy — no MASTER essay dump

  factory_order:
    - scaffold 4 skills (SKILL.md + references/ stubs from prompt_spec outlines)
    - scaffold producer-drafts/.gitkeep
    - PATCH EXTEND kontent.md + prodazhi.md
    - CREATE eg-producer.md + продюсер.md
    - NO new rules/hooks/MCP
    - prompt-auditor → auditor → machine gate

  open_questions: []
  confidence: high
  next: Task(t-800-factory)
```

---

## Next for parent

`Task(t-800-factory)` with this `brief_for_factory` + refs to `prompt_craft` (7 prompt_specs) + research synthesis.  
Deferred (non-blocking): `Task(t-800-maintainer)` for KB sync (33d stale).
