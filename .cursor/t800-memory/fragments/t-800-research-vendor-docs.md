# t-800-research-vendor-docs — Atmosfera 3D producer pack

**Fetched:** 2026-08-04  
**Task:** DEEP vendor-docs for producer pack (skills + 1–2 subagents + 1 command, HITL, `model: inherit`)  
**Surface:** `cursor-workspace` → `.cursor/`  
**Skip:** Kie, Perplexity  
**OpenAI note:** cookbook.openai.com / platform.openai.com blocked (Cloudflare); patterns mined from GitHub `openai/openai-cookbook` raw notebooks (same content hub).

---

## status

```yaml
status: ok
```

---

## vendor_docs_brief

```yaml
vendor_docs_brief:
  vendors: [cursor, openai, anthropic, gemini]
  rows:
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/skills"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Skills = Agent Skills standard: folder + SKILL.md; progressive load
        (scripts/, references/, assets/). Frontmatter: name, description required;
        paths, disable-model-invocation, metadata optional. Dirs:
        .cursor/skills/, .agents/skills/, nested monorepo scoping.
        /migrate-to-skills converts slash commands → skills with
        disable-model-invocation: true.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/subagents"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Custom subagents in .cursor/agents/*.md. Fields: name, description,
        model (default inherit), readonly, is_background. Clean context —
        parent must pass prompt. Orchestrator pattern: Planner→Implementer→Verifier
        with structured handoffs. Prefer skills for single-shot tasks.
        Explicit /name invocation; parallel Task calls.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/agent/prompting"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Context ring: System + Tools + Rules + Skills descriptions + MCP +
        Subagents docs + conversation. Model switch mid-chat via picker —
        do not pin in artifacts when inherit_chat. @ mentions for files/docs
        when known; else let Agent search.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/agent/commands"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Official /docs/agent/commands currently redirects to Skills help:
        multi-step workflows live in skills; slash /skill-name or @skill.
        Commands remain a first-class Customize extension component
        (see customize-cursor + plugins reference).

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/customize-cursor"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Extension components: Plugins, Rules, Skills, Subagents, Hooks,
        Commands — “Reusable prompts you invoke with / in Agent chat.
        Commands are markdown files that define a focused workflow or action.”

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/reference/plugins"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Workspace/plugin layout: commands/*.md with frontmatter name+description;
        agents/*.md name+description (+ Cursor IDE also supports model/readonly/
        is_background per subagents docs); skills/*/SKILL.md.
        Discovery: folder-based under .cursor/ for project surface.

    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/hooks"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Machine HITL: beforeShellExecution can deny + user_message;
        stop / subagentStop with optional followup_message + loop_limit.
        Not a substitute for prompt-level brand gates; complements them.

    - vendor: openai
      kind: cookbook
      url: "https://github.com/openai/openai-cookbook/blob/main/examples/Structured_Outputs_Intro.ipynb"
      fetched: "2026-08-04"
      published_or_updated: "2026-07-14"
      freshness: ok
      takeaway: >
        Structured Outputs: schema-constrained steps (math tutor array of
        step objects), summarization schemas, entity extraction for tools.
        Refusal field when schema cannot be filled. Adapt to Cursor as
        markdown/YAML beat schemas in skill body (no native SO API in Agent).

    - vendor: openai
      kind: cookbook
      url: "https://github.com/openai/openai-cookbook/blob/main/examples/Structured_outputs_multi_agent.ipynb"
      fetched: "2026-08-04"
      published_or_updated: "2026-07-14"
      freshness: ok
      takeaway: >
        Multi-agent: triage + specialized agents; group tools by role when
        tool count hurts quality; structured handoff between agents.

    - vendor: openai
      kind: cookbook
      url: "https://github.com/openai/openai-cookbook/blob/main/examples/Orchestrating_agents.ipynb"
      fetched: "2026-08-04"
      published_or_updated: "2026-07-20"
      freshness: ok
      takeaway: >
        Routines = NL instructions (system) + tools; soft branching;
        handoffs between agents. Maps to Cursor: command/skill as routine,
        Task(subagent) as handoff.

    - vendor: openai
      kind: cookbook
      url: "https://github.com/openai/openai-cookbook/blob/main/examples/agents_sdk/parallel_agents.ipynb"
      fetched: "2026-08-04"
      published_or_updated: "2025-05-06"
      freshness: block
      stale_warning: >
        >180d — use pattern only via fresher multi-agent/orch notebooks;
        do not copy notebook verbatim. Idea: fan-out specialists → fan-in meta.

    - vendor: anthropic
      kind: docs
      url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Clear/direct; explain why; 3–5 diverse examples in XML tags; XML
        sections for instructions/context/examples; system role for tone;
        agentic: ask before irreversible/shared-system actions; structured
        state (JSON) + progress notes across windows.

    - vendor: anthropic
      kind: docs
      url: "https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Progressive disclosure L1 metadata (~100 tok always) → L2 SKILL.md
        body on trigger → L3 references/scripts on demand. description =
        what + when. Aligns with Cursor skills progressive model.

    - vendor: gemini
      kind: docs
      url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      fetched: "2026-08-04"
      published_or_updated: "2026-08-04"
      freshness: ok
      takeaway: >
        Constraints + response format + few-shot; system instruction for
        tone/verbosity; XML/Markdown structured prompts; place persona +
        constraints first; creative diversity via temperature (Cursor
        inherit_chat → encode creativity via prompt constraints, not params);
        agentic: pause on ambiguity/permission; chain/break components.

  idea_seeds:
    - id: progressive_disclosure_skill_files
      source: "Anthropic Agent Skills overview + Cursor docs/skills"
      pattern: >
        L1 name+description always in context; L2 SKILL.md workflow;
        L3 references/ (beat templates, brand bans, CTA matrix) and
        scripts/ loaded only when step needs them.
      adapt_for_cursor: >
        Producer skills under .cursor/skills/<name>/SKILL.md keep body
        short (pipeline steps + HITL gates). Put long brand voice, Reels
        beat schemas, banned phrases into references/*.md; cite relative
        paths. Optional paths: for content files only. description must
        include Use when + Do NOT (anti Description Trap).

    - id: structured_output_for_script_beats
      source: "OpenAI Cookbook Structured_Outputs_Intro + Structured_outputs_multi_agent (2026-07-14)"
      pattern: >
        Schema-guaranteed arrays of step objects; multi-agent triage then
        specialists; structured handoffs between stages.
      adapt_for_cursor: >
        In skill/command body define a fixed YAML/Markdown beat schema
        (hook, conflict, mechanism, CTA, duration, channel). Require agent
        to emit that schema before prose polish. Subagent handoffs pass
        only the structured beat object + brand constraints — not full
        chat. No inventing Cursor native JSON-schema API.

    - id: brand_voice_constraints_in_system_prompt
      source: "Claude prompting best practices (role + XML) + Gemini prompting strategies (constraints/tone in system)"
      pattern: >
        Role in system; constraints (tone, bans, verbosity) early;
        XML sections for <brand>, <bans>, <task>, <examples>.
      adapt_for_cursor: >
        Put EG voice + medical/copy bans in skill/agent body top
        (or alwaysApply rule only if short). Use XML-like sections in
        agent/skill markdown. Few-shot 2–3 Atmosfera lines in
        references/voice-examples.md — not in description. Explain WHY
        bans exist (TTS / compliance / premium) so model generalizes.

    - id: human_in_the_loop_stop_points
      source: "Claude balancing autonomy/safety + Gemini ambiguity/permission + Cursor hooks stop/beforeShellExecution"
      pattern: >
        Pause before irreversible/shared-visible actions; ask on
        ambiguity; machine deny hooks for destructive shell.
      adapt_for_cursor: >
        Producer pack: explicit STOP gates in skill/command —
        (1) after brief/beat schema, (2) after draft script, (3) before
        any publish/file-write to live blog/TG. Use ask-questions /
        wait for user phrase. Subagents for draft generation can be
        readonly: true; only parent writes after approval.
        Optional hooks for shell publish scripts — not required for v1.

  frontmatter_contracts:
    skill:
      path: ".cursor/skills/<name>/SKILL.md"
      required: [name, description]
      optional: [paths, disable-model-invocation, metadata]
      notes: >
        name must match folder; description = routing (what + when + Do NOT);
        disable-model-invocation: true if slash-only like classic command.

    subagent:
      path: ".cursor/agents/<name>.md"
      required_effective: [description]
      recommended: [name, description, model, readonly, is_background]
      model: inherit
      forbidden: ["tools:"]
      notes: >
        Default model inherit for inherit_chat. No model pin.
        1–2 focused specialists (e.g. script-drafter, brand-verifier).

    command:
      path: ".cursor/commands/<name>.md"
      required: [name, description]
      pattern: >
        Slash entry that states HITL gates and Task(subagent) handoffs;
        keep body as orchestration routine, not full brand essay.
      migration_note: >
        Cursor 2.4+ /migrate-to-skills can turn commands into skills with
        disable-model-invocation: true — prefer one surface long-term.

  command_patterns:
    - name: producer-slash-orchestrator
      shape: |
        ---
        name: eg-produce-<format>
        description: Run Atmosfera producer pipeline for <format>. HITL at brief, draft, publish.
        ---
        # Steps
        1. Load skill eg-<format>-producer (or follow inline routine)
        2. Emit structured beats schema → STOP for user
        3. Task(<drafter>) with beats + brand refs
        4. Task(<verifier>) readonly brand check
        5. STOP — user approve before write/publish
      cite: "OpenAI routines/handoffs + Cursor customize Commands + subagents orchestrator"

  do_not_invent_cursor_apis:
    - "Do not add tools: to subagent frontmatter (T-800 + Cursor docs omit it)."
    - "Do not pin model IDs when constraint is inherit_chat — use model: inherit only."
    - "Do not treat /docs/agent/commands as a separate deep schema — page is Skills-centric; commands = markdown under commands/ per Customize + plugins reference."
    - "Do not invent native Structured Outputs / JSON Schema enforcement in Cursor Agent — enforce via prompt schema + verifier subagent."
    - "Do not use legacy skill field globs for new skills — use paths."
    - "Do not assume cloud subagents inherit local MCP — team cloud MCP only."
    - "Do not create dozens of vague producer subagents — max 1–2 + skills."
    - "Do not put full brand essay in description (Description Trap)."

  open_questions: []
```

---

## Prompt-craft handoff (short)

| Artifact | Count hint | model | HITL |
|----------|------------|-------|------|
| Skills | progressive producer + optional format skills | n/a | stop after beats + draft |
| Subagents | 1–2 (`inherit`, one may `readonly: true` verifier) | `inherit` | verifier before publish |
| Command | 1 slash orchestrator in `.cursor/commands/` | n/a | gates in body |

**Hubs covered:** Cursor (≥4 pages) · OpenAI cookbook (≥3 notebooks) · Claude prompting + skills · Gemini prompting strategies.
