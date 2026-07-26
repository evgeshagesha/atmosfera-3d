# t-800-research-synthesizer — DEEP

> synthesized_at: 2026-07-24  
> topic: EG Cursor artifacts — Channel HITL · Topic PDF · Trend Adapter  
> artifact_surface: cursor-workspace  
> families_compared: A (Cursor staged HITL) · B (ClawHub/n8n) · C (PDF stacks) · D (rewrite/localization)  
> factory_write: none

## Verdict (one line)

**Winner = Family A spine** (staged Cursor skills + alwaysApply brand rule + hooks hard-deny) **+ C1 PDF** (EG ReportLab canvas, silver `#d8dde4`) **+ D few-shot/schema rewrite**; steal B status-machine/queue patterns only — reject B autopublish/timeout-approve.

---

## Comparison table (axes)

| axis | A Cursor staged HITL | B ClawHub/n8n pipelines | C PDF (C1/C2/C3) | D Rewrite/localization | Winner bit |
|------|----------------------|-------------------------|------------------|------------------------|------------|
| hitl_hardness | Soft stage gates in skill + `disable-model-invocation`; **hard** only with hooks (vendor) | Strong status machine; **risk** Lobster self-approve / cron / timeout auto-approve | N/A (render ≠ publish) | Soft voice gates only | **A+hooks**; B patterns OK, B auto paths REJECT |
| cursor_fit | Native SKILL.md / rules / migrate-to-skills / agentskills.io | External bot/MCP skills — adapt_for_cursor only | Script inside skill assets | Prompt patterns in skill `references/` | **A** |
| pdf_stack | — | Digest→WeasyPrint visual ≠ EG | **C1** true dark canvas; C2 dark page white v1; C3 NC-ND / stack switch | — | **C1** |
| brand_safety | Brand rule split (seo-content-stack) + EG bans | Brand Voice / Remix patterns | Silver canon vs bot cyan divergence | Few-shot + forbid medical; transcreation | **A rules + D prompts** |
| funnel_alignment | Artifact chain → CTA stages | Channel Manager scout→publish | PDF → `send_document` funnel | Trend → EG CTA (guide→test→levels) | **A stages + local funnel** |
| operability | Single mega-skill or 3 skills; operator OK each gate | Extra TG buttons optional later | Reuse `generate_lead_pdf` ops | 3–5 few-shots maintainable | **A+C1** |
| security | Hooks deny publish MCP/shell; no secrets in SKILL | Shell/cron risks flagged | No shell interpolate untrusted | No verbatim viral copy | **A hooks**; B reject unsafe |
| freshness | Cursor 2.4 Jan 2026 + live docs ok | ClawHub cards often undated → warn | Context7 + mines 2026 ok | Official cookbooks ok | **A/vendor/news** |
| completeness | Covers all 3 caps as skills | Good HITL/TG patterns only | PDF only | Trend only | **merge A+C1+D+B(patterns)** |

---

## Family winners / runners-up

### Overall approach winner: **Family A** (Cursor Skills staged HITL)

**why_best:** Official Cursor SoT (skills vs rules vs hooks), seo-content-stack stage+gate+artifact chain, BayramAnnakov draft-first, news 2.4/agentskills.io — uniquely fits `artifact_surface: cursor-workspace` and EG «автопост без OK запрещён» when paired with hooks (rules alone = probabilistic).

**runners_up:**
- **Family B as primary:** weaker cursor_fit; Lobster/cron/timeout auto-approve = security REJECT for EG; keep status machine + queue + approve≠publish as merge bits only.
- **n8n draft→private TG→Approve→public:** operability ok as footnote UX, not Cursor artifact spine.

### PDF winner: **C1** (Keep EG ReportLab canvas)

**why_best:** Local lock (`generate_lead_pdf.py`, reportlab≥4, Context7-confirmed canvas RGB/TTFont/Platypus); true dark page paint; align accent to EG silver `#d8dde4` (document bot cyan as legacy UI divergence).

**runners_up:**
- **C2 reportlab-json-renderer:** steal agent→JSON→blocks contract + MIT theme registry later; **reject as v1 renderer** (dark theme incomplete page paint).
- **C3 WeasyPrint / StyleSuite:** reject code (NC-ND StyleSuite; unnecessary stack switch); layout inspiration only (dark+neon edge cards).

### Trend/rewrite winner bits: **Family D via vendor cookbooks** (+ ClawHub remix matrix pattern)

Claude/Gemini few-shot brand voice + OpenAI ContentUnit schema; Content Remix / Brand Voice = structure only; community transcreation + medical-claim risk = brand_safety gate (reinforced by EG alwaysApply bans).

---

```yaml
status: ok
needs_more_sources: false
synthesis:
  recommended_approach: >
    Build a Cursor-workspace mix: alwaysApply brand/HITL policy rule + three slash-only skills
    (disable-model-invocation) for Channel Pipeline / Topic PDF / Trend Adapter, with hooks
    hard-denying Telegram publish MCP/shell until explicit OK; PDF stays on EG ReportLab
    canvas (silver #d8dde4); trends use few-shot transcreation into ContentUnit schema —
    not ClawHub/n8n autopublish stacks.
  why_best: >
    Family A is the only spine that is native to Cursor 2.4 skills, matches KONTENT_MASHINA
    HITL, and can be hardened with vendor-documented hooks (rules alone are non-deterministic).
    C1 reuses production PDF path with true dark canvas. D official prompting beats marketplace
    voice skills for brand safety. B supplies queue/status patterns but its auto-approve paths
    violate EG non-negotiable.
  runners_up:
    - name: "Family B (ClawHub Lobster / TG Channel Manager / n8n) as primary orchestrator"
      why_weaker: "Wrong surface; self-approve/cron/timeout auto-approve = REJECT; cursor_fit low"
    - name: "C2 reportlab-json-renderer as PDF engine now"
      why_weaker: "Dark theme v1 leaves page canvas white; EG already has working canvas path"
    - name: "C3 WeasyPrint / StyleSuite"
      why_weaker: "Stack switch + StyleSuite NC-ND no code copy; visual ≠ EG silver canon"
    - name: "Rules-only autopost ban without hooks"
      why_weaker: "Cursor llm-safety + community: rules are steering; HN/force patterns show bypass"
  merge_plan: >
    FROM A: seo-content-stack staged gates + artifact paths + After Completion stop lines;
    disable-model-invocation publish skills; brand-voice as alwaysApply rule (not migrated);
    BayramAnnakov draft-first / save_draft never send; Cursor hooks beforeMCP/Shell ask|deny.
    FROM B: status machine drafted→awaiting_ok→approved→published; separate approve vs publish;
    queue file + dedup; HITL Protocol review-case spirit; REJECT Lobster self-approve, cron
    autopublisher, timeout default_action=approve.
    FROM C1 (winner): generate_lead_pdf ReportLab canvas + Context7 TTFont/setFillColorRGB/
    Platypus Table cards; theme eg_premium silver #d8dde4 graphite bg; PTB send_document
    post-HITL only. FROM C2 (bits): optional later agent-JSON-blocks contract + tones-not-hex;
    do not vendor incomplete dark. FROM C3: layout vibe only, no code.
    FROM D: OpenAI ContentUnit schema between stages; Claude 3–5 XML few-shots + Gemini
    chain extract→localize→voice→validate; ClawHub remix matrix structure; never verbatim
    western copy; medical-claim refuse → human review.
  conflicts:
    - id: hitl_hardness_rules_vs_hooks
      parties: "Community/HN (rules bypassed) vs wishful 'rule forbids autopost'"
      resolution: "Vendor Cursor wins — hooks/approvals = enforcement; rules = steering only"
      winner: "hooks + skill disable-model-invocation + rule text as defense-in-depth"
    - id: pdf_accent_silver_vs_cyan
      parties: "EG_PDF canon silver #d8dde4 vs bot generate_lead_pdf cyan legacy"
      resolution: "PDF skill/canon = silver; bot UI cyan documented divergence until intentional unify"
      winner: "silver for Topic PDF / lead PDF theme alignment"
    - id: pdf_engine_canvas_vs_json_renderer
      parties: "repo-miner lean JSON contract vs docs C1 canvas lock"
      resolution: "C1 now; C2 contract optional phase-2 abstraction"
      winner: "C1"
    - id: clawhub_timeout_approve
      parties: "Lobster/Business Automation default_action patterns vs EG no autopost"
      resolution: "EG policy wins — timeout = abort/skip never approve"
      winner: "EG hard constraint"
  confidence: high
  sources_ranked:
    - {family: A, url: "https://cursor.com/docs/skills", score: 98, role: "SoT skill surface"}
    - {family: A, url: "https://cursor.com/docs/hooks", score: 97, role: "hard HITL"}
    - {family: A, url: "https://cursor.com/docs/enterprise/llm-safety-and-controls", score: 96, role: "rules≠security"}
    - {family: A, url: "https://cursor.com/changelog/2-4", score: 94, role: "freshness Skills"}
    - {family: A, url: "https://github.com/loganriebel/seo-content-stack", score: 92, role: "staged HITL mine"}
    - {family: C, url: "Context7 /websites/reportlab + generate_lead_pdf", score: 91, role: "PDF stack lock"}
    - {family: A, url: "https://github.com/BayramAnnakov/telegram-assistant-skill", score: 88, role: "draft-first"}
    - {family: B, url: "https://clawhub.ai/axisrow/tg-channel-manager", score: 84, role: "status machine pattern"}
    - {family: B, url: "https://clawhub.ai/rotorstar/hitl-protocol", score: 82, role: "approve UX pattern"}
    - {family: D, url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices", score: 90, role: "few-shot voice"}
    - {family: D, url: "https://developers.openai.com/api/docs/guides/structured-outputs", score: 89, role: "ContentUnit schema"}
    - {family: C, url: "https://github.com/Shubhamnegi/reportlab-json-renderer", score: 70, role: "contract bits only"}
    - {family: B, url: "https://clawhub.ai/guwidoe/lobster", score: 55, role: "pattern+REJECT auto"}
  factory_brief_seeds:
    - "channel-content-pipeline skill: stages intake/trend→draft→voice_qa→HUMAN_OK→publish; disable-model-invocation; artifact drafts/[slug].md; hooks deny Telegram post until approval_status=approved; steal B status machine; never cron/timeout approve"
    - "eg-topic-pdf skill: agent drafts content → ReportLab canvas renderer aligned to generate_lead_pdf + eg_premium silver #d8dde4; Cyrillic TTFont; cards via canvas/TableStyle; PDF generate ≠ publish; optional later JSON-blocks contract"
    - "trend-adapter skill: western trend in → extract mechanism → RU localize → EG few-shot voice (references/) → ContentUnit schema + funnel CTA (guide→test684→levels→1990/9990/club/studio); reject high-similarity copy & medical claims"
  what_main_agent_builds_now: >
    Bot code focus only: keyword + subscription check (funnel gate for guide→test684→PDF
    levels→paid). Do NOT implement the three Cursor skills/rules/hooks in this pass —
    backlog for factory after research_brief handoff.
  recommended_artifact: mix
  artifact_surface: cursor-workspace
  coverage_assessment:
    must_channels:
      vendor-docs: pass
      github: pass_via_repo_miner  # no separate github fragment; mines cover seo-stack/json-renderer/tg-assistant
      repo-miner: pass
      clawhub: pass
      community: soft_gap  # fragment missing; key claims corroborated by Cursor vendor (rules≠hard stop)
    should_channels:
      news: pass
      docs_context7: pass  # reportlab + PTB locked
    capabilities:
      channel_hitl: covered
      topic_pdf: covered
      trend_adapter: covered
    backlog_out_of_scope: [Mini App, SEO, YouTube, RE-EXPERT Mini App anti-example]
  open_questions:
    - "Publish surface v1: Telegram MCP vs bot script vs manual copy from Cursor only?"
    - "Second HITL surface: Telegram inline Approve buttons (HITL Protocol) or Cursor chat OK only?"
    - "Trend Adapter v1 input feeds: which western sources in-scope?"
    - "When to unify bot cyan UI with PDF silver canon?"
    - "One orchestrator skill vs three independent skills sharing ContentUnit?"
  stale_rejected:
    - "Pre-skills 'put all workflows in alwaysApply rules'"
    - "Rules alone as hard autopost deny"
    - "Lobster/n8n timeout or cron auto-approve publish"
    - "ClawHub skill verbatim install"
    - "StyleSuite / NC-ND code copy; green neon digest visuals"
    - "reportlab-json-renderer dark theme as drop-in EG premium (white page v1)"
    - "WeasyPrint stack switch for Topic PDF now"
    - "Mini App / RE-EXPERT / YouTube / SEO in this factory pass"
    - "Third-party brand-voice blog prompts as SoT"
  gaps_for_lead: []
  # optional later: dedicated community fragment for HN/Reddit citations if auditor requires must-channel file
```

## Director handoff (prose)

**recommended_approach:** Один оптимальный путь — Cursor mix на workspace: alwaysApply-правило (бренд + запрет автопоста) + 3 skill с `disable-model-invocation` (pipeline / PDF / trend) + hooks как жёсткий deny на publish; PDF = существующий ReportLab canvas со silver `#d8dde4`; тренды = few-shot transcreation в ContentUnit, не копипаст и не n8n/Lobster autopublish.

**merge_plan:** Структура и HITL-гейты из Family A; очередь/статусы из B без auto-approve; рендер C1; контракт JSON из C2 только как фаза-2 идея; промпты D из официальных Claude/Gemini/OpenAI + remix-матрица как структура.

**confidence: high** — ≥2 независимых семейства (A vendor+mines, B clawhub, C docs+local, D cookbooks) согласны по spine и PDF winner.
