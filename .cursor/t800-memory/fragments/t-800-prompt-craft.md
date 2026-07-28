# Fragment — t-800-prompt-craft

**Topic:** eg-news-seo-pipeline / Family A v1  
**As of:** 2026-07-28  
**status:** ok  
**vendor:** cursor (+ idea_seeds from Anthropic XML, OpenAI Cookbook schema-first)  
**handoff:** → brain-lead → factory (NOT called from prompt-craft)

---

## prompt_specs

### 1) skill `eg-news-to-blog`

```yaml
status: ok
prompt_spec:
  artifact: skill
  vendor: cursor
  idea_seeds_used:
    - pattern: disable-model-invocation skill = explicit slash pipeline
      source: https://cursor.com/docs/skills
      adapt: "frontmatter disable-model-invocation: true; invoke only via /eg-news-to-blog or @skill"
    - pattern: Schema-first article summary then rewrite
      source: OpenAI Cookbook structured_outputs_intro
      adapt: "Stage A extract key_facts/quotes; Stage B rewrite from facts only + citations[]"
    - pattern: XML content separation + positive brand constraints
      source: Anthropic prompting best practices
      adapt: "markdown sections <source>/<brand>/<task>/<output_schema>; bans + why (trust)"
  frontmatter:
    name: eg-news-to-blog
    description: |
      Пайплайн западных RSS/новостей → RU дайджест → rewrite+cite в тоне Атмосфера 3D/EG
      → SEO-черновик блога (STOP до human approve). Только free allowlist feeds.
      Use when: пользователь вызывает /eg-news-to-blog, просит дайджест RSS,
      rewrite новости в блог EG, SEO-черновик из западного источника с цитированием.
      Do NOT use when: автопостинг TG/блог без OK; правка TipTap UI /admin/blog кода;
      Remotion/видео; Telegram-бот P02; создание субагентов T-800; меддиагноз /
      обещания «вылечим»; полный репаблиш западного full-text.
    # skill-only (не agent 5-field):
    disable-model-invocation: true
    # optional paths hint for factory:
    # paths: [".cursor/skills/eg-news-to-blog/**", "90_ВХОДЯЩИЕ/**", "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/data/**"]
  body_outline:
    - "Роль: оператор news→blog EG — poll allowlist → digest → RU rewrite+cite+seoCluster → STOP HITL"
    - "Что читать: references/feeds.yaml; references/brand-voice.md; references/tone-bans.md; references/draft-schema.md; references/seo-clusters.md; site-next lib/content/blog-types + article-blocks; 00_ПУЛЬТ ГЛАВНЫЙ_КОНТЕКСТ (тон)"
    - "Алгоритм 1 Ingest: load feeds.yaml allowlist only; caps max_feeds/max_items; optional scripts/fetch_feeds (ETag/hash/dryRun); refuse non-allowlist URLs"
    - "Алгоритм 2 Digest: write Notion-ish MD digest (title, source, date, url, 3–5 bullets, relevance score) → 90_ВХОДЯЩИЕ/eg-news-digest/ или skill drafts/"
    - "Алгоритм 3 Select: user picks item OR top-1 with hypothesis mark; require source URL"
    - "Алгоритм 4 Extract (schema-first): {title, key_facts[], quotes[{text,attribution}], source_url, source_date, status}"
    - "Алгоритм 5 Rewrite RU EG: problem→mechanism→path; methodology map Диагностика→…→Стабилизация без медclaims; Content level Authority/Utility; calm premium"
    - "Алгоритм 6 Cite+SEO: citations[]; seoCluster ∈ {studio_moscow, course_bnt, club_eg, longevity_movement, rehab_biomechanics}; CTA soft to ladder; no verbatim full-text"
    - "Алгоритм 7 Draft preview ONLY: markdown + YAML matching draft-schema (maps later to blog.json TipTap blocks); status enum ok|refuse_medical|needs_source|needs_human_clinical_review"
    - "Алгоритм 8 STOP: print approve checklist; do NOT patch blog.json, do NOT TG send, do NOT commit/deploy; handoff → /eg-news-approve after explicit OK"
    - "Выход: digest_path + draft_md_path + citations[] + seoCluster + status + approve_checklist"
    - "Связи: invokedBy /eg-news-to-blog; next /eg-news-approve; rule eg-news-brand-safety; NOT eg-bot-*; NOT remotion-*"
    - "Запреты: медобещания/диагнозы/«вылечим»/«исцеление»/секретный метод; auto-publish TG/blog; invent facts beyond key_facts; scrape Twitter/FB; paid feed APIs; AGPL FreshRSS PHP copy; unbounded fetch"
  references_to_ship:
    - "references/feeds.yaml — seed 13 verified free RSS"
    - "references/tone-bans.md — banned + allowed reframes"
    - "references/brand-voice.md — EG pillars + speech formula"
    - "references/draft-schema.md — frontmatter + TipTap block mapping notes"
    - "references/seo-clusters.md — cluster→CTA map (studio/course/club)"
    - "references/fewshots.md — 3 good/bad RU rewrites"
    - "assets/draft-frontmatter.template.md"
    - "scripts/fetch_feeds.ts (optional) — allowlist + timeout + max_items + dryRun"
  anti_patterns_avoided:
    - "Description Trap — algorithm stays in body, not description"
    - "Auto-relevance skill — disable-model-invocation prevents fire on any blog chat"
    - "Mega PipePost clone — single staged skill + separate approve command"
    - "tools: in frontmatter (N/A for skill; never for agents)"
    - "Hooks as editorial gate — hooks only later for publish shell; HITL is human"
```

### 2) command `/eg-news-to-blog`

```yaml
status: ok
prompt_spec:
  artifact: command
  vendor: cursor
  idea_seeds_used:
    - pattern: slash → skill with disable-model-invocation
      source: https://cursor.com/docs/skills
  frontmatter: null  # workspace commands = markdown body only (как eg-bot-manager-flow)
  file: ".cursor/commands/eg-news-to-blog.md"
  body_outline:
    - "Заголовок: /eg-news-to-blog — RSS/новости → дайджест → RU EG черновик блога (HITL)"
    - "Сначала прочитай: .cursor/skills/eg-news-to-blog/SKILL.md + references/feeds.yaml + tone-bans.md"
    - "Маршрут: этот skill = весь пайплайн до STOP; /eg-news-approve = запись draft после OK; eg-bot-* / remotion / T-800 factory = вне скоупа"
    - "Шаги invoke: 1) follow SKILL 2) poll/digest 3) rewrite+cite+seoCluster 4) показать draft + checklist 5) STOP — ждать «ок» пользователя"
    - "Выход: пути digest/draft + status + список citations + предложенный seoCluster/CTA"
    - "Запреты: не писать в data/blog.json; не слать TG; не коммитить; не обходить allowlist"
  anti_patterns_avoided:
    - "Дубль полного промпта skill в command — только invoke + route"
    - "Task(agent) — agent: none в v1; command читает skill напрямую"
```

### 3) command `/eg-news-approve` (optional)

```yaml
status: ok
prompt_spec:
  artifact: command
  vendor: cursor
  idea_seeds_used:
    - pattern: separate publish confirm from rewrite path
      source: ClawHub security baseline + Cursor hooks distinction
  frontmatter: null
  file: ".cursor/commands/eg-news-approve.md"
  body_outline:
    - "Заголовок: /eg-news-approve — после явного OK человека: draft → blog.json и/или TG текст"
    - "Предусловие: пользователь сказал OK/утверждаю + указал draft path из /eg-news-to-blog"
    - "Сначала прочитай: SKILL.md секция Approve; draft-schema.md; site-next lib/content/blog.ts + article-blocks.ts + blog-types"
    - "Алгоритм: 1) re-check tone-bans 2) map MD→TipTap ContentBlock[] 3) append unpublished or published:false draft in data/blog.json (ask) 4) optional TG caption text for human paste OR MCP only if user явно просит send 5) report slug/href"
    - "По умолчанию: published: false; человек включает в /admin/blog"
    - "Запреты: запуск без prior OK; auto TG; force-publish live; менять чужие посты; deploy"
  anti_patterns_avoided:
    - "Смешивание rewrite и write в одном auto-path"
    - "Default published: true"
```

### 4) rule fragment (no prompt body → skip agent craft; rule_spec for factory)

```yaml
status: skip  # artifact≠agent|skill|command prompt body; rule_spec below for factory
artifact: rule
rule_spec:
  path: ".cursor/rules/eg-news-brand-safety.mdc"
  alwaysApply: true  # short; OR globs: **/eg-news*/**, **/blog.json, 90_ВХОДЯЩИЕ/eg-news*/
  name: eg-news-brand-safety
  description: "Brand safety for news→blog: no med promises, rewrite+cite, no auto-publish"
  body_max_lines: 40
  body_outline:
    - "Когда: любой news/RSS→блог/TG контент EG"
    - "Обязательно: rewrite своими словами + cite source URL/title/date; угол методологии Атмосфера 3D"
    - "Запрещено: вылечим, исцеление, избавим навсегда, секретный/революционный метод, тело мечты, меддиагноз-как-ярлык"
    - "Запрещено: verbatim full-text западных статей; auto-publish blog.json published:true; auto Telegram post"
    - "Тон: спокойный премиум; формула что→почему→что делать→результат"
    - "HITL: черновик → human OK → только потом /eg-news-approve"
  anti_patterns_avoided:
    - "Полный пайплайн в rule (Description/context bloat) — steps живут в skill"
```

---

## QA notes for prompt-auditor

| Check | Result |
|-------|--------|
| Description Trap | avoided — Use when / Do NOT only |
| disable-model-invocation | required on skill |
| agent frontmatter 5-field | N/A (no agent) |
| tools: in FM | none |
| HITL STOP | explicit stage 8 + approve command |
| Brand bans | rule + skill checklist + refuse_medical status |

## Factory brief hints

- plugin_root / surface: `cursor-workspace` → `.cursor/` in atmosfera-3d
- Create: skill dir + 2 commands + 1 short rule
- Seed `feeds.yaml` from research verified list (13)
- Do NOT call builder from this fragment author
```
