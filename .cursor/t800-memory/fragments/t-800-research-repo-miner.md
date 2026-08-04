# t-800-research-repo-miner — fragment

**Date:** 2026-08-04  
**Mission:** Atmosfera 3D producer pack (DEEP)  
**Constraint:** no_mass_download · no clone · raw/API only  
**mines_count:** 4 (2 PRIMARY deep + 2 optional light)  
**status:** ok

---

## repo_mine_brief (YAML)

```yaml
status: ok
mined_at: "2026-08-04"
method: raw_github_api_no_clone
mines_count: 4
repo_mine_brief:
  mines:
    - repo: "tanishaio/creator-studio-skill"
      url: "https://github.com/tanishaio/creator-studio-skill"
      stars: 1
      license: MIT
      pushed_at: "2026-04-27T19:04:01Z"
      updated_at: "2026-05-20T19:50:42Z"
      freshness: warn  # young, low stars, last push Apr 2026 — structure durable, niche content is EXAMPLE
      paths_reviewed:
        - README.md
        - SKILL.md
        - references/brand_voice.md
        - references/content_pillars.md
        - references/algorithm_signals.md
        - references/frameworks.md
        - references/hook_library.md
        - templates/reel_script.md
        - templates/caption.md
        - templates/calendar_30day.md
        - examples/brand_voice.example.md  # partial (timeout once; recovered via curl)
      structure_map:
        root: "SKILL.md = workflow router (/voice-setup|/idea|/script|/caption|/repurpose|/calendar|/trend)"
        references: "progressive disclosure — brand_voice, pillars, audience, frameworks, hooks, algorithm, trend"
        templates: "fill-all sections; self-edit checklist at end of reel_script"
        examples: "filled brand_voice.example as voice-lock reference shape"
      patterns:
        - progressive_disclosure: "SKILL.md lean router → Read references/* on demand → fill templates/*"
        - voice_gate: "refuse generate if brand_voice still has [ASK]; force /voice-setup first"
        - banned_phrases_lock: "hard ban list in brand_voice + quality bar checklist"
        - workflow_router_table: "plain-language user say → slash workflow"
        - chain: "/idea → /script → /caption → /repurpose"
        - frameworks: "CRC | OBI | PAS | POV-loop — one per reel, selector by goal/pillar"
        - hook_stack: "pattern interrupt + curiosity + stakes in 0-2s"
        - script_beats: "HOOK 0-2 | SETUP 2-5 | BODY beats 3-5s | CTA last 3s + COVER + shot list"
        - calendar_schema: "Week tables | Day|Date|Format|Pillar|Idea|Hook|Length|Platform | no consecutive same pillar"
        - awareness_mix: "10 ideas = 4 cold / 4 warm / 2 hot"
        - signal_hierarchy_ig: "DM shares > saves > completion > comments > likes-dead"
        - hashtag_ban: "never #fyp #viral #explorepage #trending"
        - cta_signal_match: "CTA optimized for SIGNAL TARGET not generic follow"
        - trend_manual: "paste 5-10 competitor captions — no scrape"
      reject_pieces:
        - "India/Hinglish/tech DevRel example pillars — REPLACE entirely for EG"
        - "code-mix Hinglish variants — N/A for EG (RU voice)"
        - "LinkedIn+Threads daily cadence defaults — EG primary = IG Reels + Stories + TG"
        - "author-name hardcoding in templates (Tanisha)"
        - "low social proof (1★) — use as architecture pattern not authority"
      adapt_for_cursor: |
        Map to .cursor/skills/eg-producer-studio/ (or eg-content-producer):
        SKILL.md router with /voice|/idea|/script|/caption|/calendar|/stories|/direct
        references/ → cite EG SoT (EG_TONE, TRAINING_SYSTEM, CONTENT_ROUTER) not copy essays
        Pre-fill brand_voice from vault (no [ASK] interview on every run — HITL refresh only)
        Pillars → EG Authority/Utility/Proof/Offer Bridge + method axis
        CTA default: soft anketa / директ / запись студии — never medical claims
        Calendar: Reels+Stories+TG slots; Russian rest-day rules as EG chooses
      dated_file_urls:
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/SKILL.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/references/brand_voice.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/references/content_pillars.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/references/algorithm_signals.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/references/frameworks.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/references/hook_library.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/templates/reel_script.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/templates/caption.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/templates/calendar_30day.md"
        - "https://raw.githubusercontent.com/tanishaio/creator-studio-skill/main/examples/brand_voice.example.md"
        - "https://api.github.com/repos/tanishaio/creator-studio-skill (meta 2026-08-04)"

    - repo: "vyralcontent/content-skills"
      url: "https://github.com/vyralcontent/content-skills"
      stars: 72
      license: MIT
      pushed_at: "2026-06-22T06:23:12Z"
      updated_at: "2026-08-04T12:05:27Z"
      freshness: ok  # active 2026; MIT; solid progressive disclosure
      paths_reviewed:
        - README.md
        - skills/viral-instagram-reels/SKILL.md
        - skills/viral-instagram-reels/references/* (8 files listed)
        - skills/viral-instagram-reels/assets/reels-script-template.md
        - skills/viral-instagram-reels/assets/reels-hook-checklist.md
        - skills/viral-hooks/SKILL.md
        - skills/viral-hooks/references/hook-anti-patterns.md
        - skills/viral-hooks/references/hook-archetypes.md
        - skills/viral-captions-and-ctas/SKILL.md
        - skills/viral-captions-and-ctas/references/anti-patterns.md
        - skills/viral-captions-and-ctas/references/ctas-that-work.md
        - skills/viral-short-form/SKILL.md
        - skills/viral-short-form/references/retention.md
      structure_map:
        pack: "multi-skill pack under skills/* — umbrella viral-short-form + specialized"
        per_skill: "SKILL.md lean + references/ load-on-demand + assets/ fill-in templates"
        cross_links: "viral-hooks ↔ reels ↔ captions-and-ctas"
        modes: "route by user ask (write / diagnose / fix hook / caption / trial)"
      patterns:
        - progressive_disclosure: "Operating principles first; references listed; load on demand"
        - honesty_frame: "pattern-matching not virality promise — KEEP for EG"
        - three_layer_hook: "visual + verbal + on-screen text"
        - hook_batch: "6–10 hooks across ≥3 archetypes; never single hook"
        - hook_checklist: "2s aloud; mute works; concrete noun; loop closed; shareable payoff"
        - script_spine: "Hook → Escalation → Payoff → CTA; but/therefore not and-then"
        - three_failure_modes: "weak hook | no escalation | buried payoff"
        - reels_script_grid: "TIME | SPOKEN | ON-SCREEN | VISUAL columns"
        - sends_playbook: "named-persona send CTA > follow/like bait"
        - one_ask: "one CTA per video matched to content type"
        - caption_seo: "keywords in caption/on-screen; 3-5 niche tags; no #fyp walls"
        - trial_reels: "test cold before commit (if eligible)"
        - diagnose_mode: "ordered flop diagnostic (originality, 3s drop, send, audio, SEO)"
        - anti_patterns_catalog: "welcome intro, vague tease, bait-switch, subscribe-before-value, brand-first, engagement bait phrases"
        - archetype_menu: "Kallaway 6 + Hormozi HRR + Brunson HSO + Koe APAG + Welsh 3-line + Bush numbers"
      reject_pieces:
        - "ALL 'viral' branding / Vyral upsell blocks in SKILL.md — strip for EG skills"
        - "engagement bait rewrites that still push medical fear (skincare peeling examples) — rewrite to EG body-system language without медобещания"
        - "imperative 'stop scrolling' / FOMO / manufactured urgency — brand-unsafe for premium calm"
        - "Contrarian-max variance as default — use sparingly; EG = calm authority not polarizing fitness"
        - "follow-for-more / comment-YES / like-for-part-2 — reject; EG already bans 👆 hashtag noise"
        - "TikTok-first framing as primary — EG primary IG+TG"
      adapt_for_cursor: |
        Steal mechanics into EG skills WITHOUT viral hype:
        - eg-reels-script: spine + timed grid + promise↔payoff check + EG banned list
        - eg-hooks: batch 6–10 + three-layer + anti-pattern critique; tone = calm specific
        - eg-captions-cta: one-ask; send/save; CTA → анкета / директ / студия / курс
        Subagent: content-producer (script+caption) + content-critic (flop diagnose / bait-check)
        Command: /eg-reel or /producer → router like creator-studio + vyral modes
        Map CTA table: Tutorial→save; Mechanism explain→send friend; Offer→soft anketa (not hard sell)
        Additive EG bans: вылечим/исцеление/избавим навсегда/секретный метод/тело мечты/врач-claim
      dated_file_urls:
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-instagram-reels/SKILL.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-instagram-reels/assets/reels-script-template.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-instagram-reels/assets/reels-hook-checklist.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-hooks/SKILL.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-hooks/references/hook-anti-patterns.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-hooks/references/hook-archetypes.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-captions-and-ctas/SKILL.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-captions-and-ctas/references/anti-patterns.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-captions-and-ctas/references/ctas-that-work.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-short-form/SKILL.md"
        - "https://raw.githubusercontent.com/vyralcontent/content-skills/main/skills/viral-short-form/references/retention.md"
        - "https://api.github.com/repos/vyralcontent/content-skills (meta 2026-08-04)"

    - repo: "coreyhaines31/marketingskills"
      url: "https://github.com/coreyhaines31/marketingskills"
      stars: 42970
      license: MIT
      pushed_at: "2026-07-29T05:41:15Z"
      freshness: ok
      depth: light
      paths_reviewed:
        - skills/copywriting/SKILL.md (head)
        - skills/seo-audit/SKILL.md (head)
        - skills/ai-seo/SKILL.md (head)
        - skills/emails/SKILL.md (head)  # note: no email-sequence folder — skill name is `emails`
      patterns:
        - "Read product-marketing context file BEFORE asking questions"
        - "copywriting: gather page purpose / audience / offer / traffic context"
        - "emails: one email one job; value before ask; sequence types menu"
        - "seo-audit / ai-seo: scope gates + honest tool limitations (schema via fetch)"
      reject_pieces:
        - "Do not mass-install 50+ skills — SkillsBench: 2-3 per task"
        - "email-sequence name does not exist — use skills/emails"
      adapt_for_cursor: |
        Optional later: eg-copy-landing cite pattern; not core producer pack MVP.
        Context-first file pattern aligns with EG ГЛАВНЫЙ_КОНТЕКСТ / brand_voice lock.
      dated_file_urls:
        - "https://raw.githubusercontent.com/coreyhaines31/marketingskills/main/skills/copywriting/SKILL.md"
        - "https://raw.githubusercontent.com/coreyhaines31/marketingskills/main/skills/emails/SKILL.md"
        - "https://raw.githubusercontent.com/coreyhaines31/marketingskills/main/skills/seo-audit/SKILL.md"
        - "https://raw.githubusercontent.com/coreyhaines31/marketingskills/main/skills/ai-seo/SKILL.md"

    - repo: "kostja94/marketing-skills"
      url: "https://github.com/kostja94/marketing-skills"
      stars: 848
      license: MIT
      pushed_at: "2026-06-09T05:13:07Z"
      freshness: ok
      depth: light_authoring_only
      paths_reviewed:
        - templates/project-context.md
        - docs/skill-authoring.md
      patterns:
        - "project-context.md as single entry + sub-docs by domain (no duplicate essays)"
        - "skill layout: SKILL.md + references/ + assets/; body <500 lines; ref depth 1"
        - "description = WHAT + WHEN + third person + trigger keywords"
        - "SkillsBench heuristic: 2-3 skills/task; human-curated; detailed>exhaustive"
        - "Customization: skills auto-read .cursor/project-context.md"
      reject_pieces:
        - "creator-attribution / easter-egg spam — do NOT port to EG"
        - "160+ skill mega-library — cherry-pick patterns only"
      adapt_for_cursor: |
        Factory authoring checklist for producer pack skills.
        EG already has vault SoT — map project-context sections 1-4,8 to pointers into
        00_ПУЛЬТ / EG_TONE / PRODUCT_ROUTER / CONTENT_ROUTER (Zero-Copy).
      dated_file_urls:
        - "https://raw.githubusercontent.com/kostja94/marketing-skills/main/templates/project-context.md"
        - "https://raw.githubusercontent.com/kostja94/marketing-skills/main/docs/skill-authoring.md"

  comparison:
    architecture_winner: "tanishaio — best single-skill router + voice gate + calendar/templates for Cursor MVP"
    craft_depth_winner: "vyralcontent — best hook checklists, anti-patterns, retention spine, Reels send/CTA science"
    authoring_hygiene: "kostja94 skill-authoring + coreyhaines context-first"
    eg_synthesis: |
      MVP producer pack =
        (1) creator-studio progressive disclosure + voice lock + calendar schema
        + (2) vyral hook batch/checklist + script spine + bait anti-patterns + one-ask CTA
        − viral hype / Hinglish / medical-adjacent examples / Vyral upsell
        + EG SoT pointers + CTA anketa/studio + premium calm bans

  adaptation_notes_for_artifacts:
    skills:
      - name_hint: "eg-content-producer / eg-reels-studio"
        role: "router SKILL.md; workflows idea/script/caption/calendar/stories"
        refs: "brand_voice (EG-filled), pillars (CONTENT_ROUTER levels), frameworks (CRC/OBI/PAS adapted), algorithm_signals (IG+TG)"
        templates: "reel_script timed beats; caption IG+Stories+TG; calendar_30day EG cadence"
      - name_hint: "eg-hooks (optional split)"
        role: "batch hooks + critique against anti-patterns; three-layer"
      - name_hint: "eg-caption-cta (optional split)"
        role: "one-ask; send/save; anketa CTA; bait-check asset"
    subagents:
      - "eg-content-producer — generate script/caption/calendar in brand voice"
      - "eg-content-critic — diagnose flop / hook fail / bait / medical-ban scan"
    command:
      - "/eg-producer or /reel — plain-language router → workflows; HITL before publish"
    hard_constraints_eg:
      - "no medical claims / no врач / no вылечим / no тело мечты"
      - "CTA: анкета / директ / запись студии / курс — soft premium"
      - "YouTube CTA never eg.egoshev.ru"
      - "Zero-Copy: cite TRAINING_SYSTEM_POSITIONING_MASTER, never paste essays into skill"
      - "mixed HITL inherit Dev-boundary per intake"
```

---

## Cross-repo reusable stack (for brain/factory)

| Pattern | Source | EG use |
|---------|--------|--------|
| Workflow router table | tanisha SKILL | `/eg-producer` command |
| Voice gate `[ASK]` → stop | tanisha brand_voice | Pre-fill from vault; HITL refresh |
| Frameworks CRC/OBI/PAS/POV | tanisha frameworks | Method explain→CRC; belief→OBI; pain→PAS soft (no fear) |
| Timed script + checklist | tanisha + vyral assets | Merge grid + EG self-edit bans |
| Calendar week tables | tanisha calendar_30day | Pillar mix = Authority/Utility/Proof/Offer |
| Hook batch + 3 layers | vyral hooks | 6–10 options; mute-legible |
| Retention spine + 3 fails | vyral retention | Critique subagent |
| Send/save CTA hierarchy | vyral ctas-that-work | Map to anketa/studio |
| Bait anti-patterns | vyral captions anti | Gate before ship |
| Context-first + authoring | corey + kostja | Factory hygiene; 2–3 skills MVP |

## Reject summary (do not ship into EG artifacts)

1. Viral / hype / FOMO / “smash follow” language  
2. Hinglish / India tech niche examples as defaults  
3. Vyral commercial mention blocks  
4. Engagement-bait CTAs (YES / tag 5 friends / like for part 2)  
5. Medical-adjacent skincare fear copy as templates  
6. Mega skill installs (50–160) — overload  
7. Creator-attribution spam from kostja  

## Freshness notes

| Repo | Verdict | Note |
|------|---------|------|
| tanishaio/creator-studio-skill | **warn** | Useful architecture; low stars; example content must be replaced |
| vyralcontent/content-skills | **ok** | Primary craft source for producer pack |
| coreyhaines31/marketingskills | **ok** | Light only; emails not email-sequence |
| kostja94/marketing-skills | **ok** | Authoring + project-context pattern only |

## Handoff

→ `t-800-research-synthesizer` / research-lead: merge with github/news briefs  
→ brain-lead: propose 1–2 MVP skills + 2 agents + 1 command per intake defaults  
→ factory: **do not** write agents/skills here — only after brain brief + `/t800-start`
