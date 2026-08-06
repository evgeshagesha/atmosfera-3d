# t-800-research-vendor-docs — EG client programs skill + `/eg-programma`

**Date accessed:** 2026-08-05  
**Topic:** Cursor skills/commands + HITL prompting for 3 program doc types  
**Mode:** DEEP  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**status:** ok

> 💡 Official vendor pages only (plus Agent Skills standard hub). No invented publish dates — `date_or_accessed` = access day unless page exposes a date.

---

## Machine YAML

```yaml
status: ok
vendor_docs_brief:
  vendors: [cursor, anthropic, openai, gemini]
  topic: "EG Atmosfera 3D client programs — skills + /eg-programma (post-session / monthly / long-term); HITL drafts; Zero-Copy vault SoT; no medical diagnoses"
  fetched: "2026-08-05"
  source_count: 10

  sources:
    - title: "Agent Skills (Cursor docs)"
      url: "https://cursor.com/docs/skills"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: docs
      key_takeaways:
        - "SKILL.md frontmatter: name (must match folder), description (relevance), optional paths, disable-model-invocation, metadata"
        - "Optional dirs: scripts/, references/, assets/ — progressive load; keep SKILL.md focused"
        - "disable-model-invocation: true → slash-only (like classic command); no auto context inject"
        - "paths / nested .cursor/skills/ scopes when agent works matching files"
        - "/migrate-to-skills converts slash commands → skills with disable-model-invocation: true"

    - title: "Skills help (customization)"
      url: "https://cursor.com/help/customization/skills"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: docs
      key_takeaways:
        - "Skills = multi-step workflows; rules = short always/matching constraints"
        - "Invoke via /skill-name or @skill-name"
        - "Note: https://cursor.com/docs/agent/chat/commands resolves to this skills help — command UX converging on Skills"

    - title: "Prompting agents"
      url: "https://cursor.com/docs/agent/prompting"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: docs
      key_takeaways:
        - "@ mentions for files/folders, terminals, past chats, git diffs, browser — prefer explicit SoT attach for vault cite"
        - "Context ring: Skills descriptions live in system context; large bodies should stay in references/ (progressive)"
        - "Switch models mid-chat; capable models for multi-doc structured drafts"

    - title: "Agent Review"
      url: "https://cursor.com/docs/agent/agent-review"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: docs
      key_takeaways:
        - "Human-triggered review gate pattern: /agent-review on demand vs automatic"
        - "Depth Quick vs Deep — map to HITL draft check vs deep brand/medical-ban audit (conceptual, not code-review copy)"

    - title: "CLI slash commands reference"
      url: "https://cursor.com/docs/cli/reference/slash-commands"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: docs
      key_takeaways:
        - "Built-in slash cmds take optional args (/plan [prompt], /shell [command]) — precedent for /eg-programma [type]"
        - "Aliases documented for several cmds (/clear≈/new; /shell≈/sh|/run) — optional /программа alias if product wants RU UX"

    - title: "Claude prompting best practices"
      url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: cookbook
      key_takeaways:
        - "XML sections for mixed prompts: instructions / context / examples / documents — unambiguous parse"
        - "Long docs (20k+): put longform at top; query/instructions after; nest <document> + source + content"
        - "Ground with quotes from sources before drafting (cite vault SoT, don't invent clinical claims)"
        - "Clear sequential steps; role in system; refusals — prefer clear user/system bans over prefills"
        - "Autonomy vs safety: confirm before irreversible/shared actions — maps to no auto-send client docs"

    - title: "Structured Outputs Intro (OpenAI Cookbook notebook)"
      url: "https://cookbook.openai.com/examples/structured_outputs_intro"
      date_or_accessed: "accessed 2026-08-05 (via github.com/openai/openai-cookbook raw notebook; cookbook.openai.com Cloudflare-blocked from this host)"
      freshness: warn
      kind: cookbook
      key_takeaways:
        - "strict schema → UI-ready steps / extracted fields; better than prose-only for gates"
        - "refusal field when safety refuses — handle separately from schema parse"
        - "Use cases: structured tutor steps, DB extract, entity→tools — adapt to draft metadata + section checklist"

    - title: "Structured model outputs (OpenAI API)"
      url: "https://developers.openai.com/api/docs/guides/structured-outputs"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: docs
      key_takeaways:
        - "Schema adherence ≠ JSON mode; prefer schema for typed drafts"
        - "Explicit refusals programmatically detectable — pattern for diagnosis/medical-ban gate"
        - "Simpler prompting when format is constrained; still need content bans in instructions"

    - title: "Prompt design strategies (Gemini API)"
      url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: cookbook
      key_takeaways:
        - "Clear/specific instructions + constraints (do / don't)"
        - "Response format + completion strategy (start section template, model completes)"
        - "Examples + response prefix reduce JSON ambiguity; for complex schema use structured output feature"
        - "og asset share-gemini-api-2026-07.png on page → content refreshed ~2026-07 (not a formal published_on)"

    - title: "Agent Skills Overview (agentskills.io)"
      url: "https://agentskills.io/home"
      date_or_accessed: "accessed 2026-08-05"
      freshness: ok
      kind: docs
      key_takeaways:
        - "Open standard Cursor implements; portable skill packages"
        - "Cursor listed; progressive/context-efficient skills are first-class across agents"

  cursor_skill_patterns:
    frontmatter:
      required: [name, description]
      optional: [paths, disable-model-invocation, metadata]
      notes:
        - "name lowercase/hyphens; must match parent folder"
        - "description drives Agent Decides relevance"
        - "legacy globs accepted; new skills use paths"
    references_progressive_disclosure:
      - "Keep SKILL.md thin: when-to-use, workflow, bans, cite paths to vault SoT"
      - "Put per-doc-type templates/checklists in references/ (loaded on demand)"
      - "Context ring shows skill descriptions always; bodies via progressive load"
    disable_model_invocation:
      - "true for HITL clinical-ish docs → only when user types /eg-programma or /skill-name"
      - "Matches /migrate-to-skills behavior for former slash commands"
    paths_scoping:
      - "Optional: paths on draft dirs (e.g. **/programs/**, 90_ВХОДЯЩИЕ/**) if auto-surface desired later"
      - "Default for client programs: leave paths unset + disable-model-invocation true (explicit only)"

  command_patterns:
    slash_router:
      - "Thin command.md: parse $ARGUMENTS → route to skill + load matching references/"
      - "Local precedent: .cursor/commands/eg-producer.md (studio|reels|warmup|seo + HITL STOP)"
      - "Suggested args: post-session | monthly | long-term | (empty → ask)"
    args:
      - "CLI docs show [prompt]/[command] optional args — same UX for /eg-programma monthly"
    alias_notes:
      - "Official CLI uses aliases (/clear=/new; /shell=/sh|/run)"
      - "Product alias /программа possible as second command file or skill name search — confirm Cyrillic slash UX in Cursor UI (open_question)"
    migration_note:
      - "docs/agent/chat/commands → skills help; prefer Skills-first; keep thin command as router OR skill-only with disable-model-invocation"

  hitl_prompt_patterns:
    structured_sections:
      - "Claude XML: <sot_docs>, <client_input>, <doc_type>, <bans>, <output_schema> — Zero-Copy cite vault, don't paste corpus into skill"
      - "Gemini: constraints + response format + completion prefix for section headers from TEMPLATE"
      - "OpenAI: optional YAML/JSON envelope {doc_type, hitl_status, sections[], citations[], refused_claims[]}"
    review_gates:
      - "STOP after draft path written — user phrases: Утверждаю черновик / Ready (mirror eg-producer)"
      - "No auto-send / no publish; drafts only under inbox or client draft path"
      - "Optional second gate: brand+bans checklist (Agent Review analogy: on-demand depth)"
    safety:
      - "Hard bans: diagnoses, вылечим/исцеление/избавим навсегда, physician-claim"
      - "On borderline medical ask: refuse diagnosis; offer functional movement framing + human review"
      - "Claude: confirm before irreversible/shared side effects"
      - "OpenAI refusal field pattern → surface refusal distinctly; do not coerce into schema"

  implications_for:
    option_a_1_skill_3_refs:
      shape: "eg-client-programs (or eg-programma) SKILL.md + references/{post-session,monthly,long-term}.md + thin /eg-programma"
      pros:
        - "Matches Cursor progressive disclosure (official)"
        - "One shared HITL/bans/Zero-Copy cite block — less drift"
        - "Args load only needed L3 ref → context efficient for long templates"
        - "Aligns strategist hypothesis + Agent Skills standard"
      cons:
        - "Three doc types less visible as separate / menu items unless command args clear"
    option_b_3_thin_skills_command:
      shape: "eg-programma-post-session + eg-programma-monthly + eg-programma-long-term + router command"
      pros:
        - "Discoverable as three /skills; mirrors eg-producer craft split"
        - "Independent description triggers if disable-model-invocation false (usually unwanted here)"
      cons:
        - "Shared bans/HITL duplicated unless also shared references/ — maintenance cost"
        - "More factory artifacts for same domain"
    recommendation_for_synthesizer:
      preference: "option_a_1_skill_3_refs + /eg-programma $ARGUMENTS"
      rationale: "Official Cursor skills docs push references/ progressive disclosure; HITL client docs should be slash-gated (disable-model-invocation); eg-producer already proves thin command router + HITL STOP; three refs = three doc types without skill sprawl"
      hybrid_ok: "If discoverability needed: three thin skills each disable-model-invocation true that only point to shared references/ + same command router — still prefer single skill identity"

  idea_seeds:
    - source: "Cursor docs/skills — progressive + disable-model-invocation"
      pattern: "Thin SKILL + references/ + slash-only invocation"
      adapt_for_cursor: "eg-programma skill: frontmatter disable-model-invocation true; references for 3 doc types; cite vault 50-programs + TEMPLATE paths, never copy essay"

    - source: "eg-producer command + Cursor prompting @"
      pattern: "Router parses args → craft skill; STOP gates; @attach SoT"
      adapt_for_cursor: "/eg-programma post-session|monthly|long-term; require @TEMPLATE or Read SoT first; drafts to 90_ВХОДЯЩИЕ/ (or future client path)"

    - source: "Claude XML + long context"
      pattern: "Documents top, XML wrap, quote-ground then draft"
      adapt_for_cursor: "Skill instructs: Read SoT → quote section headers → draft; bans in <bans>; output markdown draft only"

    - source: "OpenAI Structured Outputs + refusal"
      pattern: "Schema for metadata + detectable refusal"
      adapt_for_cursor: "Optional YAML frontmatter on draft: doc_type, hitl: draft, citations[]; if user asks diagnosis → refuse block, no fake schema fill"

    - source: "Gemini constraints + completion strategy"
      pattern: "Start template sections; model completes under constraints"
      adapt_for_cursor: "Prefill section outline from TEMPLATE-program.md; constrain: no diagnoses, services block per 50-programs"

  open_questions:
    - "Cyrillic slash alias /программа — does Cursor Agent chat reliably register non-ASCII command/skill names?"
    - "Final draft path SoT: 90_ВХОДЯЩИЕ/ vs future EG_КЛИЕНТЫ/ (strategist: folder not found)"
    - "EG_CLIENT_PROGRAMS_STYLE_SPEC.md not in vault yet — cite placeholder until Dev lands?"
    - "Prefer skill name eg-programma vs eg-client-programs for / discoverability?"
    - "Keep .cursor/commands/eg-programma.md long-term, or migrate fully to skill-only (Cursor commands→skills trend)?"

  rows:
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/skills"
      fetched: "2026-08-05"
      takeaway: "Frontmatter + references/ progressive + disable-model-invocation for slash-gated HITL skills"
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/docs/agent/prompting"
      fetched: "2026-08-05"
      takeaway: "@ context + skills descriptions in context ring → keep bodies in references/"
    - vendor: cursor
      kind: docs
      url: "https://cursor.com/help/customization/skills"
      fetched: "2026-08-05"
      takeaway: "Commands help redirects here; skills preferred for multi-step workflows"
    - vendor: anthropic
      kind: cookbook
      url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      fetched: "2026-08-05"
      takeaway: "XML sections, long-doc order, quote-grounding, safety confirmations"
    - vendor: openai
      kind: cookbook
      url: "https://cookbook.openai.com/examples/structured_outputs_intro"
      fetched: "2026-08-05"
      takeaway: "Strict schemas + refusal handling for HITL-safe structured drafts (warn: primary site CF-blocked; GH raw used)"
    - vendor: openai
      kind: docs
      url: "https://developers.openai.com/api/docs/guides/structured-outputs"
      fetched: "2026-08-05"
      takeaway: "Schema adherence + explicit refusals"
    - vendor: gemini
      kind: cookbook
      url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      fetched: "2026-08-05"
      takeaway: "Constraints, format, completion strategy, examples for structured program sections"
```

---

## Access notes

| Hub | Result |
|-----|--------|
| cursor.com/docs/skills | OK (WebFetch + `.md`) |
| cursor.com/docs/agent/prompting | OK via `.md` (HTML CSR timeout) |
| cursor.com/docs/agent/chat/commands | Redirects → help/customization/skills |
| Claude prompting | OK (docs.anthropic.com) |
| OpenAI cookbook HTML | Cloudflare blocked — used GH raw notebook + developers.openai.com |
| Gemini prompting-strategies | OK (HTML extract) |

**Local cross-check (not counted in vendor source_count):** `.cursor/commands/eg-producer.md` HITL router precedent.
