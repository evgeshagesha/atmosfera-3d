# t-800-prompt-craft — Atmosfera 3D producer pack

**Date:** 2026-08-04  
**status:** ok  
**vendor:** cursor (+ idea_seeds from Anthropic / OpenAI Cookbook / Gemini)  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Handoff:** → brain-lead → factory (builder) → prompt-auditor  
**NOT done:** production skills/agents/commands (spec only)

---

## pack_meta

```yaml
pack_meta:
  name: atmosfera-producer-mvp
  draft_path: 90_ВХОДЯЩИЕ/producer-drafts/
  cta_default: https://eg.egoshev.ru/anketa
  model: inherit
  hitl: drafts_only
  never: [auto_tg, auto_vk, auto_blog_json, site_code, medical_claims]
  rules_reuse:
    - .cursor/rules/atmosfera-3d.mdc
    - .cursor/rules/eg-news-brand-safety.mdc
  idea_seeds_pack:
    - progressive_disclosure_skill_files  # https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview + cursor.com/docs/skills
    - structured_output_for_script_beats  # OpenAI Cookbook Structured_Outputs_Intro
    - brand_voice_constraints_in_system_prompt  # Claude + Gemini
    - human_in_the_loop_stop_points  # Claude/Gemini + Cursor stop gates
  progressive_disclosure:
    L1: SKILL.md frontmatter description (routing only)
    L2: SKILL.md body = pipeline + HITL STOP
    L3: references/*.md (voice, bans, beat schema, CTA matrix, fewshots)
  ui_language: ru  # user-facing titles, STOP phrases, gate copy
```

---

## 1) CREATE skill: eg-producer-studio

```yaml
status: ok
prompt_spec:
  artifact: skill
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: progressive_disclosure_skill_files
      url: https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview
    - id: brand_voice_constraints_in_system_prompt
      url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
    - id: human_in_the_loop_stop_points
      url: https://ai.google.dev/gemini-api/docs/prompting-strategies
  path: .cursor/skills/eg-producer-studio/SKILL.md
  frontmatter:
    name: eg-producer-studio
    description: |
      Роутер продюсер-пака Атмосфера 3D: голос, столпы, календарь идей,
      репурпозинг brief → выбор craft-skill. HITL-черновики только.
      Use when: /eg-producer studio|calendar|repurpose; нужен voice gate,
      pillars, недельный план, маршрутизация в reels/warmup/seo.
      Do NOT use when: писать полный Reels-сценарий (→ eg-reels-script);
      прогрев Stories/Direct (→ eg-warmup); SEO money-page (→ eg-seo-brief);
      автопост TG/VK; правка сайта; Remotion; T-800 factory; медобещания.
    # skill fields — NOT agent 5-field set
    disable-model-invocation: false
  body_outline:
    - "Роль: voice/pillars/calendar/repurpose router EG; Zero-Copy SoT pointers"
    - "Что читать (pointers only, no essay copy): atmosfera-3d.mdc; TRAINING_SYSTEM_POSITIONING_MASTER; OWNERSHIP_MAP; ГЛАВНЫЙ_КОНТЕКСТ; eg-news-brand-safety (reuse bans)"
    - "L3 refs: references/voice-gate.md, pillars.md, calendar-schema.md, repurpose-map.md, cta-matrix.md"
    - "Алгоритм: (1) detect mode studio|calendar|repurpose (2) voice gate vs bans (3) emit structured brief YAML (4) route → eg-reels-script|eg-warmup|eg-seo-brief (5) STOP show brief+path (6) drafts → 90_ВХОДЯЩИЕ/producer-drafts/"
    - "Выход: brief_yaml + recommended_skill + draft_path + status ok|needs_voice|blocked_ban"
    - "Связи: invoked by /eg-producer; handoff to craft skills; Task(kontent) after beats"
    - "Запреты: no autopost; no site; no medical; no YouTube CTA→eg.egoshev.ru; no monolith full scripts; Description Trap; Zero-Copy — cite paths not paste MASTER"
  anti_patterns_avoided:
    - Description Trap (full pipeline in description)
    - Monolith creator-studio body (research reject)
    - Verbatim brand essay in SKILL.md
    - tools: in any frontmatter
```

---

## 2) CREATE skill: eg-reels-script

```yaml
status: ok
prompt_spec:
  artifact: skill
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: structured_output_for_script_beats
      url: https://github.com/openai/openai-cookbook/blob/main/examples/Structured_Outputs_Intro.ipynb
    - id: progressive_disclosure_skill_files
      url: https://cursor.com/docs/skills
    - id: human_in_the_loop_stop_points
      url: https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview
  path: .cursor/skills/eg-reels-script/SKILL.md
  frontmatter:
    name: eg-reels-script
    description: |
      Сценарии Reels Атмосфера 3D: хуки (batch), timed grid, retention spine,
      caption с одним CTA→анкета. Только HITL-черновики.
      Use when: /eg-producer reels; нужен сценарий/озвучка/caption Instagram Reels
      в тоне EG; beats→draft после eg-producer-studio brief.
      Do NOT use when: прогрев Stories/Direct (→ eg-warmup); SEO/blog brief
      (→ eg-seo-brief); Remotion/рендер; автопост; viral bait/FOMO; медобещания;
      YouTube CTA на eg.egoshev.ru.
  body_outline:
    - "Роль: Reels craft — hook×3 → spine → timed grid → caption one-ask CTA"
    - "Что читать: brief from studio; atmosfera-3d.mdc; eg-news-brand-safety; L3 refs"
    - "L3: references/beat-schema.yaml.md, hook-patterns.md, retention-spine.md, anti-bait.md, caption-cta.md"
    - "Алгоритм: (1) load brief (2) emit beat YAML schema FIRST (hook/conflict/mechanism/proof/cta/sec) (3) STOP beats (4) after OK → prose script RU speakable (5) caption + ONE CTA https://eg.egoshev.ru/anketa (6) ban scan (7) save draft published:false → producer-drafts/ (8) STOP ready-for-kontent"
    - "Beat schema fields: hook, tension, mechanism, what_to_do, result_feel, cta, duration_sec[], channel:reels"
    - "Выход: beats_yaml + script_md_path + caption + cta + ban_scan_ok"
    - "Связи: from eg-producer-studio|/eg-producer; next Task(kontent) polish; Task(prodazhi) CTA soft"
    - "Запреты: no FOMO/deficit bait; no medical; no multi-CTA; no hashtag spam; no auto TG/VK; no Remotion code"
  anti_patterns_avoided:
    - Prose before schema (Cookbook: schema-first)
    - Viral/FOMO patterns from vyral (stripped per research)
    - Full brand essay in description
```

---

## 3) CREATE skill: eg-warmup

```yaml
status: ok
prompt_spec:
  artifact: skill
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: structured_output_for_script_beats
      url: https://github.com/openai/openai-cookbook/blob/main/examples/Structured_Outputs_Intro.ipynb
    - id: brand_voice_constraints_in_system_prompt
      url: https://ai.google.dev/gemini-api/docs/prompting-strategies
    - id: human_in_the_loop_stop_points
      url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  path: .cursor/skills/eg-warmup/SKILL.md
  frontmatter:
    name: eg-warmup
    description: |
      Прогрев HITL: последовательность Reels→Stories→Direct (nurture) для
      Атмосфера 3D. Черновики касаний + soft bridge к анкете.
      Use when: /eg-producer warmup; серия Stories после Reels; директ-прогрев
      до заявки; nurture 3–7 касаний без автопоста.
      Do NOT use when: полный Reels-сценарий с нуля (→ eg-reels-script);
      SEO (→ eg-seo-brief); авторассылка TG/VK; давление/дефицит; медобещания;
      правки бота (→ eg-bot-*).
  body_outline:
    - "Роль: nurture sequence drafter — touch map Reels→Stories→Direct→anketa"
    - "Что читать: studio brief + reels draft if any; brand rules; L3 sequence schema"
    - "L3: references/touch-map.md, stories-beats.md, direct-soft.md, ladder-bridge.md"
    - "Алгоритм: (1) goal+audience stage (2) emit touch YAML (day, channel, beat, CTA_level) (3) STOP map (4) draft each touch RU (5) one soft CTA rail→anketa at end only (6) ban scan (7) save → producer-drafts/ (8) STOP"
    - "CTA levels: none|curiosity|soft_ask — never hard close every touch"
    - "Выход: touch_map_yaml + drafts_dir + final_cta + status"
    - "Связи: /eg-producer; kontent for polish; prodazhi for objection-ready Direct"
    - "Запреты: no auto-send; no spam cadence; no medical; no multi-product dump; no FOMO timers"
  anti_patterns_avoided:
    - Autopost/schedule schemas from ClawHub (DROP)
    - Aggressive sales every story
    - Description Trap
```

---

## 4) CREATE skill: eg-seo-brief

```yaml
status: ok
prompt_spec:
  artifact: skill
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: progressive_disclosure_skill_files
      url: https://cursor.com/docs/skills
    - id: structured_output_for_script_beats
      url: https://github.com/openai/openai-cookbook/blob/main/examples/Structured_Outputs_Intro.ipynb
    - id: brand_voice_constraints_in_system_prompt
      url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  path: .cursor/skills/eg-seo-brief/SKILL.md
  frontmatter:
    name: eg-seo-brief
    description: |
      SEO-brief и money/blog copy-черновики EG в Cursor (HITL). Без правок
      кода сайта Wave2. CTA→анкета / продуктовая лестница.
      Use when: /eg-producer seo; бриф страницы/статьи; H1–H2 outline;
      meta title/description draft; cluster→CTA map.
      Do NOT use when: правка Next/site кода; publish blog.json; RSS news
      pipeline (→ eg-news-to-blog); Remotion; автопост; медобещания;
      verbatim full-text rewrite чужих статей без cite.
  body_outline:
    - "Роль: SEO brief + on-page copy draft operator (Cursor-only)"
    - "Что читать: СТИЛЬ_СТАТЕЙ_БЛОГА.md (SoT structure); eg-news seo-clusters pattern reuse; brand rules"
    - "L3: references/brief-schema.md, cluster-cta.md, meta-limits.md, bans-seo.md"
    - "Алгоритм: (1) intent+cluster (2) brief YAML (slug, H1, H2[], intent, proof, CTA) (3) STOP brief (4) optional copy draft sections RU (5) published:false (6) save → producer-drafts/ (7) STOP — no site write"
    - "If social/blog path overlaps news: point to eg-news-to-blog dual HITL — do not duplicate"
    - "Выход: seo_brief_yaml + optional_draft_md + cta + status"
    - "Связи: /eg-producer; handoff Dev Wave2 outside pack; eg-news-to-blog for editorial news"
    - "Запреты: no site file edits; no blog.json; no TG/VK; no medical SEO bait; no keyword stuffing"
  anti_patterns_avoided:
    - Site/Next edits in skill (Wave2 Dev)
    - Duplicating eg-news-to-blog dual-hash for news RSS
    - Description Trap
```

---

## 5) EXTEND agent: kontent

```yaml
status: ok
prompt_spec:
  artifact: agent
  action: EXTEND
  vendor: cursor
  idea_seeds_used:
    - id: brand_voice_constraints_in_system_prompt
      url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
    - id: structured_output_for_script_beats
      url: https://github.com/openai/openai-cookbook/blob/main/examples/Structured_outputs_multi_agent.ipynb
    - id: human_in_the_loop_stop_points
      url: https://cursor.com/docs/subagents
  path: .cursor/agents/kontent.md
  frontmatter:
    name: kontent
    description: |
      Драфтер контента Атмосфера 3D: beats→черновик Reels/Stories/пост
      через producer skills. HITL only.
      Use when: Task(kontent) после /eg-producer или craft-skill beats;
      нужна полировка сценария/поста в тоне EG; Instagram/TG тексты.
      Do NOT use when: CTA/возражения/анкета (→ prodazhi); SEO site code;
      автопост TG/VK; Remotion; news→blog (→ eg-news-to-blog);
      создание новых Cursor-артефактов (→ T-800 factory).
    model: inherit
    readonly: false
    is_background: false
  body_outline:
    - "Роль: content drafter — skill-backed; clean context; parent passes beats+constraints"
    - "Что читать: parent prompt beats_yaml; .cursor/skills/eg-reels-script|eg-warmup|eg-producer-studio as cited; atmosfera-3d.mdc; eg-news-brand-safety"
    - "Алгоритм: (1) validate beats schema present (2) Read matching skill L2/L3 refs (3) draft RU speakable (4) ban scan (5) write ONLY to 90_ВХОДЯЩИЕ/producer-drafts/ unless parent path (6) return draft_path + checklist (7) STOP — no publish"
    - "Выход: draft_md_path + channel + ban_scan + next: Task(prodazhi)|ready"
    - "Связи: calledBy /eg-producer|main; calls skills via Read not Task; handoff prodazhi for CTA"
    - "Запреты: no tools: frontmatter; no autopost; no medical; no invent beats without schema; no overwrite live 02_ЗОНЫ without HITL note; keep body <150 lines"
  patch_notes:
    - "Upgrade thin description → Use when / Do NOT"
    - "Add 5-field frontmatter (was incomplete)"
    - "Default draft_path → producer-drafts/ (was 02_ЗОНЫ/контент/)"
    - "Skill-backed: invoke producer skills, do not re-encode full craft"
  anti_patterns_avoided:
    - CREATE new drafter agent (research: EXTEND)
    - tools: in frontmatter
    - Description Trap / vague «helps with content»
```

---

## 6) EXTEND agent: prodazhi

```yaml
status: ok
prompt_spec:
  artifact: agent
  action: EXTEND
  vendor: cursor
  idea_seeds_used:
    - id: brand_voice_constraints_in_system_prompt
      url: https://ai.google.dev/gemini-api/docs/prompting-strategies
    - id: human_in_the_loop_stop_points
      url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
    - id: structured_output_for_script_beats
      url: https://github.com/openai/openai-cookbook/blob/main/examples/Orchestrating_agents.ipynb
  path: .cursor/agents/prodazhi.md
  frontmatter:
    name: prodazhi
    description: |
      Soft offer-bridge Атмосфера 3D: CTA→анкета, директ, возражения,
      follow-up. Ban-scan коммерческих формулировок. HITL only.
      Use when: Task(prodazhi) после kontent/draft; нужен один CTA
      https://eg.egoshev.ru/anketa; ответ в директ; разбор возражений;
      мягкий bridge к лестнице продуктов.
      Do NOT use when: писать Reels/сценарии с нуля (→ kontent / eg-reels-script);
      автопост/рассылка; правка бота кода (→ eg-bot-engineer); медобещания;
      жёсткий дефицит/FOMO; T-800 factory.
    model: inherit
    readonly: false
    is_background: false
  body_outline:
    - "Роль: CTA/anketa/objections specialist — soft bridge, not closer"
    - "Что читать: parent draft; 02_ЗОНЫ/продукты/ or PRODUCT pointers; brand bans; cta-matrix from eg-producer-studio refs"
    - "Алгоритм: (1) read draft+intent (2) one CTA only → https://eg.egoshev.ru/anketa (3) soft Direct/Stories CTA variants (short/premium) (4) objections map without pressure (5) ban scan medical+infobiz (6) save offer snippets → producer-drafts/ (7) STOP"
    - "Выход: cta_block + direct_replies[] + objections[] + ban_scan_ok + draft_path"
    - "Связи: calledBy /eg-producer after kontent; may cite eg-bot-manager-flow for bot FAQ tone but no bot code"
    - "Запреты: no multi-CTA; no auto TG/VK; no medical guarantees; no «тело мечты»; no YouTube→eg domain as CTA; no tools: field"
  patch_notes:
    - "Add Use when / Do NOT + 5-field frontmatter"
    - "Pin CTA rail anketa; skill-backed ban scan"
    - "Drafts → producer-drafts/ (was only 02_ЗОНЫ/продажи/)"
  anti_patterns_avoided:
    - CREATE third critic agent (research: checklist in skills)
    - Hard-close / FOMO
    - Description Trap
```

---

## 7) CREATE command: /eg-producer (+ alias /продюсер)

```yaml
status: ok
prompt_spec:
  artifact: command
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: human_in_the_loop_stop_points
      url: https://cursor.com/docs/customize-cursor
    - id: structured_output_for_script_beats
      url: https://github.com/openai/openai-cookbook/blob/main/examples/Orchestrating_agents.ipynb
    - id: progressive_disclosure_skill_files
      url: https://cursor.com/docs/skills
  paths:
    primary: .cursor/commands/eg-producer.md
    alias: .cursor/commands/продюсер.md  # thin mirror / same steps; RU title
  frontmatter:
    name: eg-producer
    description: |
      Продюсер-пак Атмосфера 3D: studio→craft→kontent→prodazhi CTA.
      HITL STOP на brief, beats, draft, ready. Без автопоста.
      Use when: /eg-producer или /продюсер; нужен контент-пайплайн
      (reels|warmup|seo|calendar) с черновиками в producer-drafts.
      Do NOT use when: eg-news-to-blog; Remotion; автопост TG/VK;
      правка сайта; деплой бота; T-800 factory.
  # command: name+description only (no model/readonly)
  body_outline:
    - "Заголовок RU: # /eg-producer — продюсерский пайплайн (HITL)"
    - "Сначала прочитай: eg-producer-studio SKILL + выбранный craft skill + brand rules"
    - "Режимы: studio|reels|warmup|seo|calendar|repurpose — parse $ARGUMENTS"
    - "Маршрут (routine): (1) skill studio brief → STOP (2) craft skill beats/schema → STOP (3) Task(kontent) draft → STOP (4) Task(prodazhi) CTA soft → STOP ready (5) path 90_ВХОДЯЩИЕ/producer-drafts/"
    - "Gate phrases RU: «Утверждаю brief», «Утверждаю beats», «Утверждаю черновик», «Ready»"
    - "Выход: mode + paths + hashes_optional + status + next_step"
    - "Запреты: mirror eg-news — no TG/VK/blog.json/site; published:false; one CTA anketa"
    - "Alias file продюсер.md: same body, name: продюсер, description points to eg-producer"
  anti_patterns_avoided:
    - Monolith command with full craft essays
    - Auto-publish Automations
    - Skipping STOP gates
    - Pinning model IDs
```

---

## factory_brief_hints

```yaml
factory_brief_hints:
  order:
    - scaffold 4 skills (L1–L3 folders + empty refs stubs)
    - PATCH kontent.md + prodazhi.md (EXTEND)
    - CREATE eg-producer.md + продюсер.md
    - NO new rules (reuse atmosfera-3d + eg-news-brand-safety)
    - NO critic agent v1
  registry: update agents-registry if project tracks kontent/prodazhi
  prompt_auditor_focus:
    - Description Trap on all 7
    - agent frontmatter exactly 5 fields
    - no tools:
    - HITL STOP present
    - CTA anketa single
  brain_lead_ask:
    - confirm Zero-Copy paths for ToV/MASTER
    - confirm draft_path folder create vs lazy
```

---

## handoff

| To | What |
|----|------|
| `t-800-brain-lead` | consume pack_meta + prompt_specs; route domain brains (context/agents) |
| `t-800-factory` | builder from prompt_specs; then `t-800-prompt-auditor` |
| NOT | write production SKILL bodies in this step — **done** |

**status:** `ok` · 7/7 specs · vendor `cursor` · idea_seeds applied
