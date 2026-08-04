# t-800-research-clawhub — Atmosfera 3D producer pack

**scanned_at:** 2026-08-04  
**intent:** DEEP ClawHub → Cursor skills / subagents / command HITL  
**brand:** Atmosfera 3D / EG — premium wellness; no medical claims  
**rejected_verbatim:** true (всегда)

## Tabs scanned

| Tab | Status | Notes |
|-----|--------|-------|
| Trending / Featured / New | partial | UI tabs render same popular feed without auth; content skills not in top strip |
| Skills (seed + query) | ok | 5 seed + 4 adjacent cards deep-read |
| Plugins | skim | Notion/Gmail/Calendar connectors noted; not adapted (auto-send risk) |

## Ranked cards (producer pack relevance)

| Rank | Card | URL | Freshness | Verdict |
|------|------|-----|-----------|---------|
| 1 | Content Marketing for Founders | https://clawhub.ai/renehdzgtz/founder-content-marketing | unknown_date → pattern-only; live 2026-08-04 | **PRIMARY adapt** — 6 modules; DROP Web3 |
| 2 | Content Marketing | https://clawhub.ai/ivangdavila/content-marketing | unknown_date → pattern-only | **PRIMARY** — funnel + consent memory + HITL storage |
| 3 | Content Strategy | https://clawhub.ai/jk-0001/content-strategy | unknown_date → pattern-only | **ADAPT** — goals→pillars→calendar→metrics |
| 4 | Social Media Content Engine | https://clawhub.ai/1kalin/afrexai-social-media-engine | 2026-02-13 (openclawai mirror) ≈172d → **WARN** | **ADAPT schemas** — DROP schedule/auto-send |
| 5 | Social Media Content Calendar | https://clawhub.ai/seanwyngaard/social-media-content-calendar | unknown (YAML dates show 2026-02) → WARN | **ADAPT calendar schema** — DROP Buffer auto-import |
| 6 | Internet Marketing | https://clawhub.ai/xeroc/internet-marketing | unknown_date → pattern-only | LIGHT — organic founder stack |
| 7 | social-content (carlosfmtz) | https://clawhub.ai/carlosfmtz/social-content | unknown_date | **REJECT patterns** — scrape + schedule |
| 8 | Instagram Account Operations | https://clawhub.ai/alexbloch-ia/instagram-account-operations | unknown_date | **REJECT** — Playwright auto-send |
| — | cs-social-content | https://clawhub.ai/alirezarezvani/cs-social-content | fetch blocked (SPA shell) | **PARTIAL** — peer note: distribution of *approved* content only |

## Patterns to adapt (no verbatim)

1. **Module router** (founder skill): Strategy → Calendar → Copy → Repurpose → SEO Brief → Thought Leadership as discrete Cursor skills or one skill with `when` routing.
2. **Content pillars schema**: 3–5 named pillars + angle + example topics; map to EG: движение / дыхание / дисциплина / система тела / студия+путь клиента.
3. **Editorial calendar columns**: `Date | Platform | Pillar | Type | Hook | Status | CTA` — status machine: idea → draft → review(HITL) → ready (never auto-published).
4. **Repurpose matrix**: 1 pillar → Reel script + Stories + carousel + TG deep + SEO brief — format-native hooks, not copy-paste.
5. **Voice YAML**: tone / vocabulary use|avoid / guardrails — inject Atmosfera bans (медобещания, «врач», anti-gym, дешёвый инфостиль).
6. **Funnel alignment**: TOFU/MOFU/BOFU before drafting (ivangdavila) — map to EG ladder (доверие → запись/курс → сопровождение).
7. **SEO brief skeleton**: primary/secondary KW, intent, H2 outline, differentiation angle, CTA to product step — HITL before write.
8. **Reel timing skeleton**: hook 0–3s → context → value → soft CTA (save/DM) — calm premium voice, not crypto-contrarian aggression.
9. **Consent memory folder**: ask before writing local strategy memory (HITL) — adapt to vault path, not `~/content-marketing/`.
10. **Content score pre-publish**: hook/value/platform/CTA checklist ≥ threshold → then human approve.

## Security narrative scan

| Flag | Found? | Where | Action for EG pack |
|------|--------|-------|--------------------|
| secrets_in_prompt | no | scanned cards | OK |
| shell_without_confirm | **yes** | alexbloch IG ops (Playwright type+Enter send); CDP shell snippets | REJECT for producer pack |
| scrape_PII | **yes** | carlosfmtz «SCRAPE» Apify/Phantom 500–1000 posts | REJECT; manual/public research only |
| ignore_previous | no | — | OK |
| auto_schedule_publish_APIs | **yes** | afrexai schedule batch; seanwyngaard Buffer/Hootsuite CSV; carlosfmtz queue; IG cron | DROP — drafts + HITL only; no Meta/Buffer/TG auto-send |

## Hard DROP / reject list

- Full verbatim of any ClawHub SKILL.md / prompt
- Web3 / crypto niche module and examples
- Auto-schedule / auto-publish / Graph API / Buffer import as agent action
- Instagram Playwright / MBS automation / DM blast
- Competitor scrape-at-scale (Apify etc.)
- Aggressive crypto-founder tone (fear hooks, «game-changer» inverse still cheap)
- Trending medical TCM skill (倪海厦) — brand + medical-claim conflict
- nemesis-c2-bridge (trending unrelated / attack tooling)
- Plugins that send Gmail/Slack/WhatsApp without HITL

## Adaptation → Cursor (Atmosfera producer pack)

| Artifact | Role | HITL |
|----------|------|------|
| Skill: pillars + voice | Brand intake → 3–5 pillars + voice YAML | Confirm voice before drafts |
| Skill: calendar | Week/month table → vault md | Review before «ready» |
| Skill: repurpose | 1 asset → multi-format EG | Human picks formats |
| Skill: seo-brief | Brief only; optional write-after-approve | Dual gate if publish path |
| Subagent: strategist | Goals, pillars, mix %, ladder CTA | Propose → approve |
| Subagent: copy editor | Hooks ×3, Reel/Stories/TG in EG ToV | Approve copy |
| Command | `/producer-…` orchestration | **Mandatory** approve before any external channel |

**Brand overlay (always):** спокойный премиум; тело как система; Диагностика→…→Стабилизация в контент-углах; без «вылечим/исцеление»; YouTube CTA ≠ eg.egoshev.ru.

## Dated sources

| url | published_or_updated | freshness | takeaway |
|-----|----------------------|-----------|----------|
| https://clawhub.ai/renehdzgtz/founder-content-marketing | unknown (page live 2026-08-04) | block_verbatim / ok_patterns | Module router + pillars/calendar/SEO |
| https://clawhub.ai/ivangdavila/content-marketing | unknown (live 2026-08-04) | block_verbatim / ok_patterns | Funnel + consent local memory |
| https://clawhub.ai/jk-0001/content-strategy | unknown (live 2026-08-04) | block_verbatim / ok_patterns | Solopreneur 8-step strategy |
| https://clawhub.ai/1kalin/afrexai-social-media-engine | 2026-02-13 (openclawai.io) | **warn** (~172d) | Voice YAML, Reels, scoring; drop automation ch.10 |
| https://openclawai.io/skills/skill/afrexai-social-media-engine | 2026-02-13 | warn | Cross-check date for afrexai |
| https://clawhub.ai/seanwyngaard/social-media-content-calendar | unknown; sample dates 2026-02 | warn | Calendar YAML + CSV schema only |
| https://clawhub.ai/xeroc/internet-marketing | unknown (live 2026-08-04) | block_verbatim / ok_patterns | Organic founder GTM light |
| https://clawhub.ai/carlosfmtz/social-content | unknown | block | Scrape + schedule — reject |
| https://clawhub.ai/alexbloch-ia/instagram-account-operations | unknown | block | Shell auto-send — reject |
| https://clawhub.ai/alirezarezvani/cs-social-content | fetch failed 2026-08-04 | unknown | Treat as distribute-approved-only; do not adapt auto-send |

## Query coverage

| Query | Best card(s) |
|-------|----------------|
| content marketing founder solopreneur | founder-content-marketing, jk-0001, xeroc |
| personal brand thought leadership | founder MODULE 6 |
| social content Instagram Reels | afrexai IG playbook, seanwyngaard |
| content strategy calendar repurpose | ivangdavila, jk-0001, founder M2/M4 |
| SEO content brief | founder MODULE 5 |
| social media engine schedule publish | afrexai / carlos / sean — **patterns only; publish = REJECT** |

## Status for research-lead

`status: ok` — enough cards for DEEP adaptation brief; cs-social-content SPA incomplete (noted). Factory must keep `rejected_verbatim: true` and HITL publish boundary.
