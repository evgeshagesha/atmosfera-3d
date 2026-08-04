# t-800-research-synthesizer — Atmosfera 3D producer MVP

**Date:** 2026-08-04  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**topic:** curated HITL producer pack (skills + 1–2 subagents + 1 command)  
**status:** ok  
**needs_more_sources:** false  
**confidence:** high

## Families compared

| Family | Status | Weight |
|--------|--------|--------|
| Vendor (Cursor/Claude/OpenAI/Gemini) | ok 2026-08-04 | primary cursor_fit |
| Repo mines (creator-studio + vyral + corey/kostja light) | ok/warn | architecture + craft |
| ClawHub (founder/content modules; reject scrape/autopost) | ok patterns; block verbatim | module schema + security DROP |
| News (changelog + HN skills) | ok | skill-first; ignore Automations/Workspace v1 |
| Local SoT (eg-news-to-blog, kontent/prodazhi, brand-safety) | always current | HITL + bans + thin-agent gap |
| GitHub specialist fragment | **stale** (2026-07-29 vault topic) | superseded by repo-miner |
| Community specialist fragment | **stale** (2026-07-29 vault topic) | axes from news HN + strategist; modular consensus held |

**Filtered out:** ClawHub Playwright/scrape/Buffer auto-send; Cursor Automations always-on; mass 50–160 skill installs; freshness `block` body copy; OpenAI parallel_agents notebook (>180d) — pattern only via fresher orch notebooks.

## Axis decisions (decisive)

| Axis | Winner | Why |
|------|--------|-----|
| skill_first vs agent_first | **skill_first** | Cursor docs: prefer skills for single-shot; HN Aug 2 progressive skills; agents = clean-context specialists only |
| EXTEND vs CREATE pair | **EXTEND kontent + prodazhi** (skill-backed) | Scout gap = thin agents; CREATE duplicates names/roles; Zero-Copy hygiene |
| monolith vs modular+router | **modular pack + thin router command** | kostja SkillsBench 2–3/task; vyral multi-skill; creator-studio router shape kept as *command/skill router* not 1 fat monolith |
| progressive disclosure | **yes** | Anthropic L1–L3 + Cursor skills + eg-news-to-blog refs pattern |
| HITL depth | **structural multi-STOP** (beats → draft → ready); dual-hash **only** if blog/social publish path | Mirror eg-news gates; no auto-publish; drafts ≈ `published: false` |
| CTA | **eg.egoshev.ru/anketa** one-ask | vyral one-ask + creator signal-match; YouTube ≠ anketa domain |
| security | **REJECT** IG Playwright / scrape / schedule APIs | ClawHub flags |
| curation | **4–5 skills** (not 160) | no_mass_download |
| autopost | **out of pack** | Dev boundary; news ignore Automations |

## Winner

**Hybrid modular skill pack (≤5) + thin `/eg-producer` router command + EXTEND `kontent`/`prodazhi` as skill-backed specialists — HITL drafts only.**

---

## synthesis (machine)

```yaml
status: ok
synthesis:
  recommended_approach: >
    Skill-first hybrid: modular EG producer skill pack (4–5 skills, progressive
    disclosure) + one thin slash router `/eg-producer` (+ RU alias `/продюсер`)
    + EXTEND existing thin agents kontent (drafter) and prodazhi (CTA/anketa/
    objections) to invoke skills — do NOT create a parallel agent pair; do NOT
    ship autopost/scrape; reuse eg-news-to-blog HITL + eg-news-brand-safety.
  why_best: >
    Maximizes cursor_fit (vendor: skills for workflows, 1–2 agents for clean
    context, commands as orchestration), completeness without mass-download
    (repo-miner: creator-studio architecture + vyral craft; clawhub: pillars/
    calendar/voice schemas only), brand_safety (local SoT bans + reject ClawHub
    auto-send), and HITL (news: ignore Automations; local dual-gate pattern).
    EXTEND beats CREATE: scout already named kontent/prodazhi as the gap to
    skill-back. Modular pack beats monolith: community/authoring hygiene
    (2–3 skills/task) + eg-news already proved progressive refs work.
  runners_up:
    - approach: "Monolith single creator-studio-style skill + 1 command, no pack split"
      why_weaker: >
        Token/Description Trap risk; harder progressive disclosure; conflicts
        with kostja SkillsBench and vyral multi-skill craft depth.
    - approach: "Agent-first: CREATE eg-producer + eg-warmup pair; skills thin or absent"
      why_weaker: >
        Vendor prefers skills for single-shot; duplicates kontent/prodazhi;
        agents without skill refs drift into essay prompts.
    - approach: "Mass-curate ClawHub/GitHub marketing mega-packs (50–160)"
      why_weaker: >
        Explicit no_mass_download; security flags (scrape/Playwright/schedule);
        brand tone collision (viral/crypto/medical).
    - approach: "Skill pack + Cursor Automations / Workspace Docs auto-write for publish"
      why_weaker: >
        Conflicts HITL no-auto-publish; news says ignore Automations + Workspace
        plugins for v1; Dev owns TG/VK/site Wave2.
  merge_plan: >
    A=tanishaio/creator-studio: SKILL/command workflow router table; voice gate
    (pre-fill from EG vault, HITL refresh only); calendar columns; idea→script→
    caption→repurpose chain; templates shape (not India/Hinglish content).
    B=vyralcontent/content-skills: hook batch 6–10 + 3-layer; Hook→Escalation→
    Payoff→CTA spine; TIME|SPOKEN|ON-SCREEN|VISUAL grid; bait anti-patterns;
    one-ask CTA mapped to anketa/директ/студия/курс — strip viral/FOMO/upsell.
    C=ClawHub founder+content-marketing (patterns only): pillars schema;
    funnel TOFU/MOFU/BOFU → EG ladder; SEO brief skeleton; editorial status
    machine idea→draft→review→ready (never auto-published); DROP Web3/schedule.
    D=vendor Cursor/Claude/OpenAI/Gemini: progressive L1–L3; frontmatter
    name+description+Do NOT; model inherit; structured beat YAML in skill body;
    XML brand/bans sections; STOP before irreversible; optional readonly verifier
    via Task — no invent JSON-schema API / tools: on agents.
    E=local eg-news-to-blog: progressive skill layout (refs tone-bans/brand-voice/
    workflow); dual HITL phrase gates when social/blog path; published:false
    default for drafts; command pair UX (/run → /approve); rule reuse
    eg-news-brand-safety + atmosfera-3d; Zero-Copy cite TRAINING_SYSTEM /
    CONTENT_ROUTER — no essay paste.
    F=coreyhaines+kostja (light): context-first before questions; authoring
    checklist; 2–3 skills per task — not 50+.
  conflicts:
    - conflict: "ClawHub/afrexai & calendar cards push schedule/Buffer vs Atmosfera HITL"
      resolution: "HITL wins — adapt schemas only; DROP auto-send (clawhub security + intake)"
      winner: "vendor + local SoT + intake constraints"
    - conflict: "creator-studio monolith router vs vyral modular pack vs Cursor migrate-commands→skills"
      resolution: "Modular skills + thin command as router (creator-studio table in command; craft in skills)"
      winner: "hybrid (repo-miner eg_synthesis + vendor commands-as-routine)"
    - conflict: "Cursor /docs/agent/commands Skills-centric vs Customize still lists Commands"
      resolution: "Ship one .cursor/commands/eg-producer.md orchestrator; long-term may migrate-to-skills with disable-model-invocation"
      winner: "customize-cursor + plugins reference"
    - conflict: "github/community specialist fragments (Jul 29 vault) vs this producer topic"
      resolution: "Do not use stale vault synthesis; use repo-miner + news HN modular/skill-first signals"
      winner: "2026-08-04 producer findings"
    - conflict: "UiPath HITL named in compare brief but no dated finding in specialist fragments"
      resolution: "Do not invent UiPath; HITL stop points from Claude/Gemini/Cursor hooks + eg-news dual gates"
      winner: "vendor + local SoT"
  confidence: high
  sources_ranked:
    - url: "https://cursor.com/docs/skills"
      score: 98
      family: vendor
    - url: "https://cursor.com/docs/subagents"
      score: 96
      family: vendor
    - url: "https://cursor.com/docs/customize-cursor"
      score: 94
      family: vendor
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview"
      score: 93
      family: vendor
    - url: "https://github.com/vyralcontent/content-skills"
      score: 92
      family: repo_mine
    - url: "https://github.com/tanishaio/creator-studio-skill"
      score: 88
      family: repo_mine
      note: "architecture warn (low stars); replace niche content"
    - url: "file://.cursor/skills/eg-news-to-blog/"
      score: 95
      family: local_sot
    - url: "https://clawhub.ai/renehdzgtz/founder-content-marketing"
      score: 82
      family: clawhub
      note: "patterns only; unknown_date block_verbatim"
    - url: "https://clawhub.ai/ivangdavila/content-marketing"
      score: 80
      family: clawhub
    - url: "https://news.ycombinator.com/item?id=49139845"
      score: 78
      family: news
    - url: "https://cursor.com/changelog/google-workspace-plugins"
      score: 70
      family: news
      note: "confirm ignore_v1; block_factory false"
    - url: "https://github.com/kostja94/marketing-skills"
      score: 75
      family: repo_mine_light
    - url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      score: 85
      family: vendor
    - url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
      score: 80
      family: vendor
  needs_more_sources: false
  gaps_for_lead: []

recommended_artifacts:
  skills:
    - "eg-producer-studio  # router workflows: voice refresh, pillars, calendar, repurpose matrix; refs→EG SoT pointers"
    - "eg-reels-script      # hooks batch + timed grid + spine + caption one-ask; anti-bait; brand bans ref"
    - "eg-warmup           # Reels→Stories→Direct sequence pack (not Stories-only)"
    - "eg-seo-brief        # SEO brief + optional draft copy; HITL; drafts only; NO site Wave2 edits"
    # optional 5th if factory needs split:
    # - "eg-caption-cta    # only if eg-reels-script body exceeds progressive budget"
  subagents:
    - name: kontent
      role: "EXTEND — content drafter; Task-invokes producer skills; emits beat schema then draft; HITL stop"
    - name: prodazhi
      role: "EXTEND — CTA rail eg.egoshev.ru/anketa, direct/objections, offer-bridge soft sell; bait/medical scan on offer CTAs"
  command: "/eg-producer  # primary; RU alias /продюсер in same or paired command md; orchestrates skills + Task(kontent|prodazhi); STOP at beats, draft, ready"
  rules_reuse:
    - ".cursor/rules/eg-news-brand-safety.mdc"
    - ".cursor/rules/atmosfera-3d.mdc"
    # no new alwaysApply brand essay; cite vault SoT Zero-Copy
  extend_vs_create: >
    EXTEND kontent.md + prodazhi.md (skill-backed, richer description triggers,
    point to .cursor/skills/eg-* ). Do NOT CREATE eg-producer/eg-warmup agent
    pair. Do NOT mass-clone GitHub/ClawHub. Optional later: readonly critic as
    Task mode inside kontent — not a 3rd agent in v1.

adaptation_plan: |
  1) Factory authoring (after brain): scaffold 4 skills under .cursor/skills/*/SKILL.md
     with L1 description Use when/Do NOT; L2 short pipeline+HITL; L3 references/
     (tone-bans pointer, beat schema, CTA matrix anketa, anti-patterns EG-safe).
  2) Pre-fill brand_voice from vault pointers (ГЛАВНЫЙ_КОНТЕКСТ, CONTENT_ROUTER levels,
     TRAINING_SYSTEM_POSITIONING_MASTER cite-only) — no [ASK] interview every run.
  3) Write /eg-producer command: router table (idea|script|warmup|seo|calendar) →
     load skill → emit YAML beats → STOP → Task(kontent) → STOP → optional
     Task(prodazhi) for CTA → STOP ready; never TG/VK/blog publish.
  4) PATCH kontent.md + prodazhi.md: description triggers; require skill read;
     CTA default anketa; model inherit; prodazhi may be readonly when only verifying.
  5) Mirror eg-news UX: drafts to 90_ВХОДЯЩИЕ/producer-drafts/ (default); explicit
     published:false / status:draft; dual-hash only if packaging longform→social
     like eg-news — else triple STOP phrases are enough for v1 Reels/warmup.
  6) Security strip checklist in every skill Do NOT: Playwright, Apify scrape,
     Buffer/Meta schedule, medical claims, viral engagement bait, YouTube→eg domain.
  7) Skip v1: Google Workspace plugins, Automations, Remotion core, site money pages,
     VK/TG autopost code.

open_questions: []  # resolved with strong defaults below
open_questions_resolved:
  - q: "Command locale /eg-producer vs /продюсер?"
    default: "Primary /eg-producer; add /продюсер alias (same orchestration body)."
  - q: "EXTEND vs CREATE subagents?"
    default: "EXTEND kontent + prodazhi."
  - q: "SEO draft vault path?"
    default: "90_ВХОДЯЩИЕ/producer-drafts/ (PARA inbox → later sort); not site-next."
  - q: "Warmup scope?"
    default: "Reels→Stories→Direct sequence pack."
  - q: "Google Workspace Docs HITL?"
    default: "Out of v1 (news+scout)."
```

---

## Handoff

→ research-lead: fold into `research_brief` + coverage_matrix  
→ prompt-craft: SKILL descriptions + command body + EXTEND agent prompts  
→ brain-lead: confirm artifact names / vault draft path  
→ factory: **only after** brain + `/t800-start` — synthesizer does not write agents/skills
