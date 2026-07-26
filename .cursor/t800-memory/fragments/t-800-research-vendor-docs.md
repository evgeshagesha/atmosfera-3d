# t-800-research-vendor-docs — Cursor skills/HITL/brand-voice (DEEP)

**Fetched:** 2026-07-25  
**Project:** atmosfera-3d  
**Surface:** cursor-workspace (skills/commands/rules)  
**Kie:** skip · **Mini App:** skip  
**Factory artifacts:** none (research only)

---

```yaml
status: ok
confidence: high
vendor_docs_brief:
  vendors: [cursor, openai, anthropic, gemini]
  rows:
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/skills"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "SKILL.md frontmatter: name, description, paths, disable-model-invocation, metadata. Progressive load; /invoke + auto-relevance."
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/help/customization/skills"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Rules = short constraints; Skills = multi-step workflows. /migrate-to-skills converts dynamic rules + slash commands."
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/agent/prompting"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "@ context, model switch mid-chat; context ring shows Rules/Skills/MCP/Subagents token share."
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/rules"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "alwaysApply/globs/description matrix; Always Apply / Intelligent / File / Manual. AGENTS.md always-on alternative."
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/enterprise/llm-safety-and-controls"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Hard HITL = security controls (approvals, hooks), not Rules. Rules/Commands = non-deterministic steering only."
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/hooks"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "beforeShellExecution/beforeMCPExecution → permission allow|deny|ask. Deterministic gate for side effects."
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/help/customization/rules"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Project rules in .cursor/rules; Team > Project > User precedence."
    - vendor: openai
      kind: cookbook
      url: "https://developers.openai.com/cookbook/examples/structured_outputs_intro"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Schema-first stages; refusal field; parse helpers — pipeline between nodes."
      note: "cookbook.openai.com timed out; same content on developers.openai.com/cookbook"
    - vendor: openai
      kind: cookbook
      url: "https://developers.openai.com/cookbook/examples/structured_outputs_multi_agent/"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "strict:true tool schemas for multi-agent handoffs; app still validates business rules."
    - vendor: openai
      kind: docs
      url: "https://developers.openai.com/api/docs/guides/structured-outputs"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Structured Outputs > JSON mode; schema adherence for pipeline state."
    - vendor: openai
      kind: cookbook
      url: "https://developers.openai.com/cookbook/examples/agents_sdk/migrate-from-claude-agent-sdk/readme"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Gate side effects via needs_approval + RunState resume; hooks ≠ approval."
    - vendor: openai
      kind: cookbook
      url: "https://developers.openai.com/cookbook/examples/agents_sdk/multi-agent-portfolio-collaboration/multi_agent_portfolio_collaboration"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Hub orchestrator + specialists as tools; keep single control thread for content stages."
    - vendor: anthropic
      kind: docs
      url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Few-shot 3–5 for tone; XML sections; role in system; positive format instructions; match prompt style to output."
    - vendor: gemini
      kind: docs
      url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "Always few-shot for phrasing/format; consistent example structure; chain prompts; constraints + response format."
    - vendor: gemini
      kind: docs
      url: "https://ai.google.dev/gemma/docs/spoken-language/task-specific-tuning"
      fetched: "2026-07-25"
      freshness: ok
      takeaway: "~20 target-language examples for localization when zero-shot fails; prompt alone weak for non-EN tasks."

cursor_skills_rules_commands:
  source_of_truth:
    - "https://cursor.com/docs/skills"
    - "https://cursor.com/help/customization/skills"
    - "https://cursor.com/docs/rules"
    - "https://cursor.com/docs/enterprise/llm-safety-and-controls"
  skill_locations:
    project: [".cursor/skills/", ".agents/skills/"]
    user: ["~/.cursor/skills/", "~/.agents/skills/"]
    compat: [".claude/skills/", ".codex/skills/"]
    nested: "Any .cursor/skills under package dirs auto-scoped to that subtree"
  skill_md_frontmatter:
    required: [name, description]
    optional:
      paths: "glob list or comma-string; surfaces only when matching files in context"
      disable-model-invocation: "true → only via /skill-name; no auto-apply"
      metadata: "arbitrary kv"
    legacy: "globs accepted; prefer paths"
    identity: "name must match parent folder of SKILL.md"
  invocation:
    auto: "Agent picks by description when disable-model-invocation unset/false"
    slash: "/skill-name"
    at_mention: "@skill-name"
    progressive: "references/ + assets/ load on demand"
  when_skill_vs_command_vs_rule:
    rule:
      use_for: "Short persistent constraints, coding standards, brand bans always in context"
      apply: "Always | Intelligent (description) | globs | Manual @"
      limit: "~500 lines; split; not hard enforcement"
      keep_not_migrate: "alwaysApply:true OR globs — not migrated by /migrate-to-skills"
    skill:
      use_for: "Multi-step repeatable workflows (PDF, content pipeline, trend adapt)"
      apply: "On demand or intelligent; scripts/references/assets"
      hitl_explicit: "disable-model-invocation: true for publish/HITL workflows"
    command:
      status: "Legacy slash; migrate via /migrate-to-skills → skills with disable-model-invocation: true"
      migrate_converts:
        - "Dynamic rules (alwaysApply false/undefined, no globs)"
        - "User + workspace slash commands → disable-model-invocation skills"
      not_migrated: ["alwaysApply true", "globs rules", "User Rules UI"]
  eg_mapping_hypothesis:
    brand_voice_bans: "Rule alwaysApply — never medical promises, tone pillars"
    channel_content_pipeline_hitl: "Skill + disable-model-invocation + hooks on publish MCP/shell"
    eg_topic_pdf: "Skill multi-step (scripts/assets for templates)"
    trend_adapter: "Skill with few-shot voice rewrite; optional paths on content dirs"

hitl_patterns_from_docs:
  critical_distinction:
    steering: "Rules, Skills text, Commands — LLM may ignore"
    enforcement: "Terminal approvals, Hooks permission deny/ask, sandbox, allowlists"
  cursor_native:
    - pattern: "Default ask-before-shell"
      adapt: "Keep auto-approve OFF for any post/publish scripts"
    - pattern: "Hooks beforeShellExecution / beforeMCPExecution → permission ask|deny"
      adapt: "Matcher on telegram/post/publish/prodamus; deny without OK token or human ask"
    - pattern: "Approval workflows (ask every action)"
      note: "Works but slow; prefer targeted hooks for publish only"
    - pattern: "disable-model-invocation on publish skill"
      adapt: "Human must type /channel-content-pipeline; agent cannot auto-fire"
  openai_cookbook:
    - pattern: "Gate side effects behind human approval; resume RunState after interrupt"
      url: "https://developers.openai.com/cookbook/examples/agents_sdk/migrate-from-claude-agent-sdk/readme"
    - pattern: "Input/output/tool guardrails separate from lifecycle hooks"
      adapt: "Cursor: hooks = guardrails; skill body = steering"
    - pattern: "Hub agent + specialist tools; structured state between stages"
      adapt: "Draft → VoiceRewrite → QA → AwaitHumanOK → Publish"
  eg_policy_seed: "Автопост без OK запрещён → NEVER rely on rule text alone; pair skill HITL steps + hook deny on publish tools"

rewrite_adaptation_prompt_patterns:
  openai:
    - "Schema-first content unit: fields channel, hook, body, cta, voice_score, approval_status"
    - "Check refusal before consuming parsed output"
    - "Strict schemas between pipeline nodes; semantic validation in app/hooks"
  claude_official:
    - "3–5 diverse few-shot examples for tone/structure (XML <example> wraps)"
    - "System role one-liner focusing voice"
    - "XML buckets: <brand_voice>, <forbidden>, <source>, <task>, <examples>"
    - "Prefer positive format instructions over 'don't'"
    - "Match prompt formatting to desired output (prose vs markdown)"
  gemini:
    - "Always few-shot for phrasing/localization; consistent delimiters/XML"
    - "Constraints + response format explicit; chain rewrite then QA"
    - "Put long brand docs first, task last; 'Based on preceding…'"
    - "If RU cultural/locale weak: ~20 gold I/O pairs (Gemma spoken-language guide pattern)"
  community_brand_voice_warn:
    - "Third-party 'brand voice skill' blogs — patterns OK as idea_seeds only; not SoT"
    - "Useful ideas: behavioral tone (not adjectives), do/don't lists, on-brand vs off-brand pairs, channel styles"

pdf_or_content_pipeline_seeds:
  - id: structured_content_unit
    source: OpenAI Structured Outputs
    seed: "Pydantic/Zod ContentUnit schema shared by Trend Adapter → Channel Pipeline → PDF skill"
  - id: hub_specialists
    source: OpenAI multi-agent portfolio
    seed: "Orchestrator skill calls VoiceRewrite / PDFLayout / ChannelPack as sub-steps or Task subagents"
  - id: progressive_skill_assets
    source: Cursor Skills
    seed: "PDF templates in assets/; EG_TONE refs in references/; keep SKILL.md thin"
  - id: hitl_gate_stage
    source: Cursor Hooks + OpenAI approvals
    seed: "approval_status enum draft|awaiting_ok|approved|rejected; publish tool blocked until approved"
  - id: voice_fewshot_pack
    source: Claude + Gemini
    seed: "3–5 on-brand + 2 off-brand EG samples (Reels/Stories/post/PDF blurb) in skill references"
  - id: locale_chain
    source: Gemini prompting strategies
    seed: "Trend EN→RU adapt as chained prompts: extract → localize → brand-voice rewrite → schema validate"

stale_rejected:
  - item: "Relying on Rules alone for 'never auto-post'"
    reason: "Cursor docs: rules are non-deterministic steering, not security controls"
  - item: "Copy third-party brand-voice blog prompts verbatim into skills"
    reason: "Not official Anthropic; adapt principles only; prefer Claude official few-shot/XML"
  - item: "JSON mode without schema for pipeline state"
    reason: "OpenAI: use Structured Outputs (strict schema), not JSON mode"
  - item: "Migrating alwaysApply brand rules into skills"
    reason: "/migrate-to-skills skips alwaysApply/globs — keep brand bans as Always Apply rules"
  - item: "cookbook.openai.com root as fetched SoT this run"
    reason: "Timeout 2026-07-25; used developers.openai.com/cookbook mirrors (same org)"
  - item: "cursor.com/docs overview page"
    reason: "Fetch error this run; used specific docs pages instead"
  - item: "Kie.AI / Mini App research"
    reason: "Explicitly skipped per brief"

sources:
  - url: "https://cursor.com/docs/skills"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Frontmatter + disable-model-invocation + migrate-to-skills"
  - url: "https://cursor.com/help/customization/skills"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Rules vs Skills decision table"
  - url: "https://cursor.com/docs/agent/prompting"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "@ mentions + context categories"
  - url: "https://cursor.com/docs/rules"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Rule apply matrix + AGENTS.md"
  - url: "https://cursor.com/help/customization/rules"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Help layer for rules UX"
  - url: "https://cursor.com/docs/enterprise/llm-safety-and-controls"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "HITL security vs steering"
  - url: "https://cursor.com/docs/hooks"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "permission ask/deny for shell/MCP"
  - url: "https://developers.openai.com/api/docs/guides/structured-outputs"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Schema adherence + refusal"
  - url: "https://developers.openai.com/cookbook/examples/structured_outputs_intro"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Cookbook intro structured outputs"
  - url: "https://developers.openai.com/cookbook/examples/structured_outputs_multi_agent/"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Multi-agent strict tools"
  - url: "https://developers.openai.com/cookbook/examples/agents_sdk/migrate-from-claude-agent-sdk/readme"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "needs_approval for side effects"
  - url: "https://developers.openai.com/cookbook/examples/agents_sdk/multi-agent-portfolio-collaboration/multi_agent_portfolio_collaboration"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Hub + specialist tools"
  - url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Tone via examples + XML + role"
  - url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "Few-shot localization/phrasing"
  - url: "https://ai.google.dev/gemma/docs/spoken-language/task-specific-tuning"
    published_or_updated: "2026-07-25"
    freshness: ok
    takeaway: "~20 examples for target language tasks"

idea_seeds:
  - source: "Cursor docs/skills"
    pattern: "disable-model-invocation: true → slash-only skill"
    adapt_for_cursor: "Channel Content Pipeline HITL skill: human must /invoke; description still documents when to use; never auto-publish"
  - source: "Cursor help skills + migrate-to-skills"
    pattern: "Commands → skills with disable-model-invocation; Always Apply rules stay rules"
    adapt_for_cursor: "Keep EG brand bans as alwaysApply rule; migrate workflow slash commands to .cursor/skills/"
  - source: "Cursor llm-safety-and-controls + hooks"
    pattern: "Deterministic permission ask/deny on side-effect tools"
    adapt_for_cursor: "beforeMCPExecution matcher for Telegram/post; deny unless approval_status=approved in artifact or user confirms"
  - source: "OpenAI Structured Outputs cookbook"
    pattern: "Schema between pipeline stages + refusal handling"
    adapt_for_cursor: "ContentUnit JSON in skill outputs; stages refuse medical claims → human review path"
  - source: "OpenAI Agents SDK migrate cookbook"
    pattern: "Approvals for side effects; resume after interrupt"
    adapt_for_cursor: "Skill step 'STOP — paste OK'; Publish tool blocked by hook until OK"
  - source: "OpenAI multi-agent portfolio"
    pattern: "Orchestrator + specialists as tools"
    adapt_for_cursor: "One pipeline skill OR thin orchestrator + Task(subagents) for Voice / PDF / Channel"
  - source: "Claude prompting best practices"
    pattern: "3–5 XML few-shots + role + positive format + style-matched prompt"
    adapt_for_cursor: "EG Topic PDF + Trend Adapter: references/eg-voice-examples.md with on/off-brand pairs"
  - source: "Gemini prompting strategies"
    pattern: "Few-shot for phrasing; chain complex tasks; consistent example format"
    adapt_for_cursor: "Trend Adapter: extract → RU localize → EG voice rewrite → schema check as chained steps in SKILL.md"
  - source: "Gemma spoken-language guide"
    pattern: "~20 task-language examples when locale matters"
    adapt_for_cursor: "If RU premium wellness voice drifts, expand gold set in skill assets (not community blogs)"

open_questions:
  - "Publish surface for Channel Pipeline: Telegram MCP, bot script, or manual copy-paste only?"
  - "Should HITL OK be chat confirmation, file flag, or both?"
  - "PDF generation: existing EG PDF skill/scripts in repo vs new skill only?"
  - "Prefer single orchestrator skill vs three independent skills with shared ContentUnit schema?"

adaptation_notes: >
  Official Cursor pages are SoT for skills/rules/commands/HITL mechanics.
  OpenAI cookbooks via developers.openai.com/cookbook (cookbook.openai.com root timed out).
  Brand-voice rewrite: use Claude/Gemini official prompting patterns; third-party brand blogs = idea only.
  For EG: Always Apply rule for voice bans; HITL publish = skill disable-model-invocation + hooks;
  Content/PDF/Trend = skills with progressive references and structured ContentUnit.
```
