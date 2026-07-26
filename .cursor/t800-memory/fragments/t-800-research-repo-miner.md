# t-800-research-repo-miner — DEEP mine brief

> mined_at: 2026-07-24 | mode: DEEP | no clone | EG caps: channel HITL · topic PDF · trend adapter

## Verdict

Reuse **seo-content-stack** (stages + HITL + artifact paths + brand-voice rule split); **reportlab-json-renderer** (JSON agent contract, tones, custom theme register — MIT); **telegram-assistant-skill** (draft-first, style extract → post). StyleSuite: layout patterns only, no code. PDF accent conflict: EG canon silver `#d8dde4` vs bot cyan — resolve in theme skill.

---

## repo_mines

### 1. loganriebel/seo-content-stack (MUST)

- **url:** https://github.com/loganriebel/seo-content-stack
- **stars / activity:** 1★ · pushed 2026-04-29 · default `master`
- **freshness:** ok
- **license_warnings:** README claims MIT; GitHub `license: null`, no LICENSE file — treat as MIT-intent but verify before shipping copies of long skill prose.

**paths_examined:**
- `README.md`, `CLAUDE.md`, `AGENTS.md`, `SETUP.md`
- `seo-stack-config.yaml` (+ example)
- `.cursor/skills/seo-write-full.md` (~71KB), `.cursor/skills/seo-content.md`
- `.cursor/rules/seo-brand-voice.mdc`, `.cursor/rules/seo-first-run.mdc`
- Artifact dirs: `research/`, `briefs/`, `outlines/`, `drafts/`, `qa-reports/`, `blog/`, `deploy/`, `assets/`

**key_patterns:**
1. **Single mega-skill** (`seo-write-full`) keeps full context across 10 stages vs many tiny skills.
2. **Stage list:** Research → Brief → Outline → Write → Images → SEO review → Editorial → Build → QA → Publish.
3. **HITL after every stage:** "After each stage, summarize, ask for approval, then continue. Never auto-advance." Closing line pattern: `Do not proceed … without explicit user approval.`
4. **After Completion template:** present artifact summary → numbered questions (angle / rework / ready?) → hard stop.
5. **Artifact path pattern:** `{area}/[slug].md` + config under `paths:` in YAML; resume via reverse-order file detection + frontmatter flags (`seo_reviewed`, `editorial_reviewed`).
6. **Config vs voice split:** `seo-stack-config.yaml` (site/paths/defaults) + `.cursor/rules/seo-brand-voice.mdc` (tone/banned) + `AGENTS.md` (ICP/CTA/never-say).
7. **First-run gate:** placeholder detection (`YOUR_SITE_NAME`…) → stop → setup wizard before any stage.
8. **Skill frontmatter:** YAML `name` + `description` only (no allowed-tools); rules use `description` + `globs`.
9. **Publish = final OK:** Stage 10 requires explicit go-ahead + QA not fail before commit/push.

**adapt_for_eg:**
- Map to **channel pipeline HITL**: stages like research/trend → draft → brand voice check → editorial → **OK gate** → post (never auto-post).
- Reuse After Completion wording + "Never auto-advance" as EG hard rule.
- Artifact chain: `drafts/[slug].md` → review flags → publish index.
- Brand voice rule = EG_TONE / never-say medical claims.
- Trend adapter = Stage 1 Research social listening pattern (Reddit/X) adapted to niche body/movement trends — not SEO SERP copy-paste.

---

### 2. Shubhamnegi/reportlab-json-renderer (MUST)

- **url:** https://github.com/Shubhamnegi/reportlab-json-renderer
- **stars / activity:** 0★ · pushed 2026-06-24 · MIT
- **freshness:** ok
- **license_warnings:** none (MIT) — preferred over StyleSuite.

**paths_examined:**
- `README.md`, `AGENTS.md`, `pdf-generator.md` (TRD + contract)
- `skills/pdf-report-json/SKILL.md`
- `reportlab_json_renderer/themes/{base,dark,green,neutral,registry}.py`
- `reportlab_json_renderer/blocks/{callout,kpi_grid}.py`
- `docs/custom-themes.md`

**key_patterns:**
1. **Agent contract:** agent emits compact JSON only — never ReportLab/Python/HTML. Backend owns layout.
2. **Root schema:** `version`, `template`, `theme`, `metadata`, `page`, `header`, `footer`, `blocks[]`.
3. **Blocks (19):** title, section_header, paragraph, rich_text, kpi_grid, callout, callout_group, table, matrix_table, insight_list, recommendations, image, chart, two_column, page_break, spacer, divider, badge, summary_box.
4. **Tones not hex:** agents use `primary|danger|success|…`; themes map tones → hex.
5. **Dark theme caveat:** `dark.py` tokens exist (teal primary `#80CBC4`) but **page canvas stays white in v1** — header/footer branding only. For EG true dark premium, need custom theme + canvas paint (own code or extend).
6. **Callout = accent edge:** `LINEBEFORE` thick left border + tinted bg + rounded box — reusable LAYOUT pattern.
7. **KPI cards:** table grid of padded cells + rounded corners — card pattern without inventing StyleSuite code.
8. **Skill `pdf-report-json`:** pick template/theme → assemble JSON → validate → never fabricate numbers; warning callout on missing data.
9. **Extensibility:** `register_theme(Theme)` + custom blocks via registry — EG theme `eg_premium` with silver `#d8dde4`.

**adapt_for_eg:**
- **Topic PDF skill:** agent → EG JSON schema → render; theme `eg_premium` (graphite canvas, white ink, silver accent `#d8dde4`; note bot UI may stay cyan — document split).
- Prefer dependency MIT library OR mirror contract in EG `generate_*_pdf.py` without copying StyleSuite.
- Block vocabulary maps to EG guides: title, callout, insight_list, recommendations, summary_box, divider.

---

### 3. BayramAnnakov/telegram-assistant-skill (SHOULD)

- **url:** https://github.com/BayramAnnakov/telegram-assistant-skill
- **stars / activity:** 18★ · MIT · last push 2025-12-26 (repo updated 2026-07-12)
- **freshness:** ok (small skill; push age ~7m — still pattern-valid)
- **license_warnings:** none

**paths_examined:**
- `README.md`, `SKILL.md`
- `references/setup.md`, `references/style-guide-template.md`

**key_patterns:**
1. **Draft-first safety:** never `send_message` for channel posts; always `save_draft`; user sends in Telegram app.
2. **Workflows:** Digest · Style Extraction · Post · Search&Reply.
3. **Style extract:** last 15–20 posts → language mix, structure, tone, length, emoji, CTA → `references/style-guide.md`.
4. **Post flow:** read style guide → ask topic/points/CTA → draft → **user review in chat** → `save_draft` (second HITL surface).
5. **Frontmatter:** AgentSkills-style (`name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`).
6. Depends on telegram-mcp draft tools (PRs noted).

**adapt_for_eg:**
- Channel pipeline: draft in Cursor/chat + optional `save_draft` / bot staging — **OK required before publish**.
- Style extraction → EG voice guide (calm premium, no medical promises) instead of crypto-essay defaults.
- Digest optional for ops; core is Post + Style.

---

### 4. Optional skims

**lovstudio/any2pdf** — theme hooks:
- Theme = dict tokens: `canvas`, `canvas_sec`, `ink`, `ink_faded`, `accent`, `accent_light`, `border`, `code_bg`, `watermark`.
- Dark examples: `monokai-warm`, `dracula-soft` (true dark canvas) — better mental model for EG dark premium than reportlab-json `dark` v1.
- Skill frontmatter: long description + theme CLI/`--theme-file` JSON.

**UiPath/skills …/hitl-patterns.md:**
- Pattern taxonomy: Approval gate · Exception escalation · Data enrichment · Compliance · Write-back validation · **Agentic output review** · Customer communication approval.
- EG maps: Autopost без OK = **Customer communication + Agentic output review + Write-back** — insertion *after draft, before send*.
- Proactive wording: flag HITL even if user didn't ask.

**ogclau/ReportLabStyleSuite:**
- Description: dark neon themes / modular PDF — **NOT deep-mined**.
- License GitHub: Other/NOASSERTION (user flagged CC-BY-NC-ND).
- **layout_patterns_only (no code copy):** dark bg + neon accent edge cards (align with callout `LINEBEFORE` + dark canvas tokens from any2pdf). Do not recommend cloning or vendoring.

---

## hitl_stage_template (EG-ready)

```yaml
rule: "Never auto-advance / Never auto-post without explicit OK"
gate_after_each_stage: true
after_completion:
  present:
    - artifact_path
    - short_summary
    - risks_or_deviations
  ask:
    - "Нужны правки?"
    - "Готов к следующему этапу? (OK / правки / стоп)"
  stop_line: "Do not proceed without explicit user approval."
eg_channel_pipeline_stages:
  - id: 1_intake_or_trend
    artifact: "research_or_trend/[slug].md"
  - id: 2_draft
    artifact: "drafts/[slug].md"
  - id: 3_voice_qa
    artifact: "drafts/[slug].md"  # flags: voice_ok
  - id: 4_human_ok   # HARD GATE — maps UiPath agentic_output_review + customer_comm
    require: "explicit OK"
  - id: 5_publish
    action: "post only after OK"
first_run_gate: "placeholder/config incomplete → setup wizard, no pipeline"
publish_precheck:
  - qa_not_fail
  - explicit_ok
```

---

## pdf_agent_contract (EG-ready)

```yaml
principle: "Agent outputs JSON/spec only — never ReportLab Python"
root_fields: [version, template, theme, metadata, page?, header?, footer?, blocks]
agent_uses: tones_not_hex
eg_theme:
  name: eg_premium
  canvas: "#1a1c1e"   # graphite (own impl — json-renderer dark v1 is white page)
  ink: "#ffffff"
  accent: "#d8dde4"   # EG canon silver
  note: "Bot UI may remain cyan — document split: PDF silver vs bot cyan"
recommended_blocks_for_guides:
  - title
  - section_header
  - paragraph / rich_text
  - callout          # accent edge
  - insight_list
  - recommendations
  - summary_box
  - divider
  - page_break
skill_pattern: "pdf-report-json — pick template/theme → assemble → validate → no fabricated data"
license_path: "prefer reportlab-json-renderer MIT or EG-owned renderer implementing same contract"
```

---

## telegram_draft_first

```yaml
policy: "draft-first; never send_message for channel/brand posts"
flow:
  - style_extract → references/eg-channel-style.md
  - draft_in_agent_chat (HITL review)
  - save_draft_or_staging
  - user_OK
  - publish
forbidden: "auto-post without OK"
style_dims: [language_mix, structure, tone, length, emoji, cta_endings]
```

---

## Cross-repo synthesis → 3 EG capabilities

| Capability | Primary source | Secondary |
|------------|----------------|-----------|
| Channel pipeline HITL | seo-content-stack stages+gates | telegram draft-first + UiPath agentic/customer-comm patterns |
| Topic PDF skill | reportlab-json-renderer contract + skill | any2pdf theme token shape for true dark |
| Trend adapter | seo Stage 1 social listening / SERP gap | style extract for voice continuity |

---

## sources

- https://github.com/loganriebel/seo-content-stack (raw: README, seo-write-full, config, brand-voice, first-run)
- https://github.com/Shubhamnegi/reportlab-json-renderer (raw: README, pdf-generator.md, AGENTS, dark.py, callout.py, skills/pdf-report-json/SKILL.md, custom-themes)
- https://github.com/BayramAnnakov/telegram-assistant-skill (raw: SKILL.md, README, style-guide-template)
- https://github.com/lovstudio/skills/blob/main/skills/any2pdf/references/themes.md (skim)
- https://github.com/uipath/skills/blob/main/skills/uipath-human-in-the-loop/references/hitl-patterns.md (skim)
- https://github.com/ogclau/ReportLabStyleSuite (API meta only — no code mine)

## confidence

| area | score | note |
|------|-------|------|
| HITL / stages | high | full skill + gate lines read |
| PDF JSON contract | high | TRD + skill + dark/callout source |
| Telegram draft-first | high | full SKILL.md |
| True dark page paint | medium | json-renderer dark is token-only white page |
| StyleSuite visuals | low | intentionally not mined; license risk |
| EG silver vs cyan | high | conflict flagged for factory brief |

## mines_count

5 (3 deep + 2 skim) — StyleSuite metadata only, not counted as deep mine.
EOF
