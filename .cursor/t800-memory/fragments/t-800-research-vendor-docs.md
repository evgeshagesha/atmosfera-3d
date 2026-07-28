# t-800-research-vendor-docs — news→blog skill/command + Automations (DEEP RETRY)

**Fetched:** 2026-07-28  
**Project:** atmosfera-3d  
**Topic:** Cursor skill+command for news→blog (brand rewrite, structured draft, human approve; later cron Automations; no native RSS)  
**Kie:** skip · **Primary:** Cursor docs  
**Factory artifacts:** none (research only)

---

```yaml
status: ok
confidence: high
fetched_at: "2026-07-28"
topic: "eg-news-seo-pipeline / news→blog Cursor skill+command"
vendor_docs_brief:
  vendors: [cursor, openai, anthropic, gemini]
  rows:
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/cloud-agent/automations"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Automations = cloud agents on schedule (cron/presets), GitHub/GitLab/Bitbucket,
        Slack, webhook POST, Linear, Sentry, PagerDuty. Tools: PR create, Slack, MCP,
        Memories, computer use. Repo optional for cron/Slack (default no-repo);
        for code edits specify repo. Prompt tips: decision rules, quality bar, output format.
        NO RSS trigger in documented trigger list.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/skills"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        SKILL.md frontmatter: name, description, paths, disable-model-invocation, metadata.
        Progressive load (scripts/references/assets). /invoke + auto-relevance.
        /migrate-to-skills converts slash commands → skills with disable-model-invocation: true.
        Built-in /automate creates Automations from plain language.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/help/customization/skills"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Rules = short constraints always/matching context. Skills = multi-step workflows.
        Invoke via /skill-name or @skill. Prefer skill over legacy command for pipelines.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/agent/prompting"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        @Files/@Docs/@Past Chats/@Browser for source+brand refs. Context ring shows
        Rules/Skills/MCP/Subagents token share. Switch models mid-chat (draft vs rewrite depth).

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/hooks"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Deterministic gates: beforeShellExecution/beforeMCPExecution → allow|deny|ask.
        beforeSubmitPrompt validate; stop on completion. Cloud agents run project hooks.json
        (not ~/.cursor). Hooks ≠ content editorial approve — they gate side effects.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/cloud-agent/api/webhooks"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Outbound statusChange (ERROR|FINISHED) from cloud agents — not an inbound RSS.
        Distinct from Automations inbound webhook trigger (POST to start a run).

    - vendor: openai
      kind: cookbook
      url: "https://developers.openai.com/cookbook/examples/structured_outputs_intro"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Schema-first article summarization (invented_year, summary, inventors, concepts[]);
        strict JSON Schema; parse helpers; refusal field for safety refusals.
        Pattern: unstructured news/article → structured draft object.

    - vendor: openai
      kind: cookbook
      url: "https://developers.openai.com/cookbook/examples/structured_outputs_multi_agent"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Triage + specialist agents with strict:true tool schemas; group tools to avoid
        tool sprawl. Adapt: extract→rewrite→cite as stages, not one mega-prompt.

    - vendor: openai
      kind: docs
      url: "https://developers.openai.com/api/docs/guides/structured-outputs"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Structured Outputs > JSON mode (schema adherence). Prefer text.format for user-facing
        structured response; function calling when bridging tools. Explicit refusals detectable.

    - vendor: anthropic
      kind: docs
      url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        Clear/direct; XML sections for instructions/context/examples/source;
        few-shot 3–5 for tone; role in system; prefer positive format instructions;
        explain WHY constraints (generalizes better); structured outputs for schema.

    - vendor: anthropic
      kind: docs
      url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
      fetched: "2026-07-28"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: >
        JSON outputs via output_config.format json_schema; strict tool use.
        Guarantees parseable draft for downstream blog pipeline.

    - vendor: gemini
      kind: docs
      url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      fetched: "2026-07-28"
      published_or_updated: "2026-07"
      freshness: ok
      takeaway: >
        Clear specific instructions; few-shot for phrasing/format; Constraints do/don't;
        Response format (table/list/paragraph/JSON); system instructions for time-sensitive 2026.

# ---------------------------------------------------------------------------
# Required answers for synthesizer / prompt-craft
# ---------------------------------------------------------------------------

skill_vs_command_manual_pipeline:
  verdict: >
    Prefer ONE skill with disable-model-invocation: true as the manual trigger
    (legacy slash command role). Optional alwaysApply Rule for brand bans only.
  recommended_layout:
    rule_brand_constraints:
      path: ".cursor/rules/eg-brand-voice-no-medical.mdc (or existing brand rule)"
      alwaysApply: true
      content: "Short: tone pillars + forbidden medical phrases — not the full pipeline"
    skill_pipeline:
      path: ".cursor/skills/eg-news-to-blog/SKILL.md"
      frontmatter:
        name: eg-news-to-blog
        description: "News/article → brand-voice blog draft with citations; stop for human approve. Use when user pastes news URL/text or asks /eg-news-to-blog."
        disable-model-invocation: true
        paths: # optional
          - "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/content/**"
          - "90_ВХОДЯЩИЕ/**"
      body_stages:
        - "1) Ingest: require pasted URL/text or @file; never invent source"
        - "2) Extract facts → structured fields (title, claims[], quotes[], source_meta)"
        - "3) Brand rewrite in EG voice; map to Methodology/Content level"
        - "4) Cite: keep source URL/title/date; mark paraphrases vs quotes"
        - "5) Write draft ONLY to drafts/inbox path (markdown frontmatter)"
        - "6) STOP: print approve checklist; do NOT publish/commit/deploy"
      references:
        - "references/brand-voice.md (progressive)"
        - "references/draft-schema.md"
        - "assets/draft-frontmatter.template.md"
    optional_second_skill_publish:
      name: eg-blog-publish-approved
      disable-model-invocation: true
      role: "Only after human says approved — move draft → content, open PR"
  why_not_auto_skill: >
    Auto-relevance would fire on any blog edit chat — dangerous for rewrite+cite.
    Manual /eg-news-to-blog keeps HITL explicit.
  legacy_commands: >
    Slash commands migrate via /migrate-to-skills → same disable-model-invocation skill.
    Do not maintain parallel command + skill duplicates.

automations_later:
  can_schedule: true
  how: >
    Cursor Automations: Scheduled triggers (presets or cron). Create via
    cursor.com/automations, Agents Window, Marketplace template, or /automate skill.
  recommended_later_shape:
    - "Cron (e.g. daily): poll inbox folder OR call external RSS→webhook; draft PR only"
    - "Webhook inbound: external RSS/Make/n8n POSTs article payload → cloud agent writes draft"
    - "Enable PR creation tool; quality bar: open PR only if schema valid + no banned phrases"
    - "Specify repository (cron defaults to no-repo)"
    - "Optional MCP for CMS later — still keep human merge as approve"
  do_not_expect:
    - "Native RSS / Atom feed trigger — NOT in Automations trigger matrix"
    - "Native 'human approve' content gate inside Automations (use PR review / separate publish skill)"
    - "User-level hooks (~/.cursor/hooks.json) on cloud agents"
    - "Outbound cloud-agent webhook (statusChange) as the start trigger — that's finish notify only"
  rss_workaround: >
    External poller (n8n/Make/cron script) → Automations webhook URL + API key,
    OR cron automation that reads a pre-fetched inbox file committed by another job.
  billing_note: "Cloud agent usage; Team Owned vs Private billing scopes differ."

prompting_patterns:
  rewrite_and_cite:
    - pattern: "XML content separation"
      source: anthropic
      adapt: >
        <source>...</source> <brand_constraints>...</brand_constraints>
        <task>rewrite</task> <output_schema>...</output_schema>
    - pattern: "Schema-first article summary then rewrite"
      source: openai_cookbook_structured_outputs_intro
      adapt: >
        Stage A: extract {title, key_facts[], quotes[{text,attribution}], source_url, source_date}.
        Stage B: rewrite body from key_facts only; never invent facts; attach citations[].
    - pattern: "Few-shot 3–5 brand examples"
      source: anthropic + gemini
      adapt: "references/fewshots.md — good/bad EG rewrites of news angles"
    - pattern: "@ context for sources"
      source: cursor_prompting
      adapt: "@source.md @brand-rule @Past Chat if iteration"
  brand_constraints:
    - pattern: "Positive instruction + why"
      source: anthropic
      adapt: >
        Prefer 'Write calm premium expert prose that maps problem→mechanism→path'
        over long DON'T lists; still keep explicit banned phrase list for EG compliance.
    - pattern: "Short alwaysApply Rule + skill procedure"
      source: cursor_skills_help
      adapt: "Rule holds bans; skill holds steps — keeps context ring lean"
    - pattern: "Match prompt style to desired output"
      source: anthropic
      adapt: "Draft skill body in EG Notion tone so model mirrors it"
  no_medical_promises:
    - pattern: "Explicit banned lexicon + allowed reframes"
      source: anthropic_constraints + EG_brand
      adapt: >
        Forbid: вылечим, исцеление, избавим навсегда, секретный/революционный метод, тело мечты.
        Require: function/path language; no diagnoses; map to Диагностика→…→Стабилизация without claims.
    - pattern: "Refusal / skip path"
      source: openai_structured_outputs_refusal
      adapt: >
        If source is clinical claim-heavy: output status:needs_human_clinical_review
        instead of rewriting into medical promises.
    - pattern: "Post-draft checklist stop"
      source: cursor_hooks_distinction
      adapt: >
        Skill ends with self-check against ban list; hooks only if publish shell/MCP —
        editorial approve is human, not hook.

idea_seeds:
  - source: "Cursor docs/skills + help/skills"
    pattern: "disable-model-invocation skill = explicit slash pipeline"
    adapt_for_cursor: >
      Ship eg-news-to-blog skill with disable-model-invocation:true; description must
      list triggers (paste news, SEO blog draft, brand rewrite).

  - source: "Cursor docs/cloud-agent/automations"
    pattern: "Cron/webhook now; RSS never native"
    adapt_for_cursor: >
      Phase 1 manual skill; Phase 2 /automate cron writing drafts+PR; RSS via external→webhook.

  - source: "Cursor docs/hooks"
    pattern: "Hooks gate side effects not editorial voice"
    adapt_for_cursor: >
      beforeShellExecution ask on deploy/publish scripts; do not rely on hooks for brand rewrite quality.

  - source: "OpenAI Cookbook structured_outputs_intro (article summarization)"
    pattern: "Unstructured article → typed summary object"
    adapt_for_cursor: >
      Put draft schema in skill references/; ask Agent to emit YAML frontmatter matching schema
      (Cursor has no API strict JSON — enforce via skill checklist + optional validate script/).

  - source: "OpenAI Cookbook structured_outputs_multi_agent"
    pattern: "Triage + specialists with strict tools"
    adapt_for_cursor: >
      Inside skill: sequential stages Extract → Voice → Cite → Write file; optional Task
      subagents only if stages grow heavy — keep single control thread for approve gate.

  - source: "OpenAI Structured Outputs guide"
    pattern: "Schema adherence + detectable refusal"
    adapt_for_cursor: >
      Include status enum: ok | refuse_medical | needs_source in frontmatter; human scans status.

  - source: "Anthropic prompting best practices"
    pattern: "XML tags + few-shot + positive constraints"
    adapt_for_cursor: >
      prompt-craft: wrap source/brand/task in XML-like markdown sections; add 3 EG few-shots;
      explain why no medical claims (trust + compliance), not only bans.

  - source: "Anthropic structured outputs"
    pattern: "json_schema for agent workflows"
    adapt_for_cursor: >
      Mirror schema in draft-frontmatter.template.md; validate with scripts/validate-draft.py in skill.

  - source: "Gemini prompting strategies"
    pattern: "Constraints + response format + few-shot"
    adapt_for_cursor: >
      Explicit response format: Notion-style MD with Properties table; length constraints;
      few-shot for RU brand voice.

  - source: "Cursor agent/prompting"
    pattern: "@Docs/@files + model switch"
    adapt_for_cursor: >
      Instruct user to @paste source + @tone rule; use stronger model for rewrite stage.

open_questions:
  - "Where should approved posts land (site-next content path vs Notion) — affects skill paths + Automations repo setting?"
  - "Publish gate: PR merge only, or also MCP Notion/CMS write — needs hook allowlist?"
  - "RSS source list + poller owner (n8n vs shell cron) for Phase 2 webhook?"
  - "Will draft validation be scripts/ in skill (deterministic) or soft LLM self-check only?"

findings_for_synthesizer:
  skill_vs_command: >
    Manual pipeline = skill + disable-model-invocation:true (+ short alwaysApply brand rule).
    Legacy commands → migrate; don't dual-maintain.
  automations: >
    Cron/webhook schedulable later; no native RSS; human approve = PR review or second publish skill.
  prompting: >
    XML separate source/brand/task; schema draft; few-shot voice; positive+banned medical list;
    stop before publish.
  kie_skipped: true
```

---

## Quick matrix (news→blog)

| Concern | Cursor surface | Hard gate? |
|---------|----------------|------------|
| Brand bans (med claims) | Rule `alwaysApply` | Soft (LLM) |
| Pipeline steps | Skill `/eg-news-to-blog` | Soft procedure |
| Manual only | `disable-model-invocation: true` | Invocation gate |
| Publish/deploy shell | Hook `beforeShellExecution` ask/deny | Hard |
| Later schedule | Automations cron/webhook | Cloud run |
| RSS | External → webhook | Not native |
| Editorial approve | Human + PR / second skill | Process |

## Sources freshness

All primary Cursor/Anthropic/OpenAI/Gemini pages fetched **2026-07-28**; official docs treated OK per freshness contract (changelog/docs exception). Cookbook article-summarization pattern remains valid for schema-first rewrite pipelines.
