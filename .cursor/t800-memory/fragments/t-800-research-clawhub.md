# t-800-research-clawhub — fragment

> 💡 DEEP ClawHub pass · care-plan / session-notes / coaching · EG client programs  
> scanned_at: 2026-08-05 · hub: https://clawhub.ai/ · rejected_verbatim: true

## Intent

Паттерны для Cursor workspace skills: post-session notes, monthly plan, long-term coaching. HITL drafts only. No medical diagnoses. Adapt structure only.

## Tabs scanned

- home / Trending listing (reachable)
- `?tab=new` (reachable; listing overlap with trending — hub UI may not separate cleanly without auth)
- `?tab=trending` — WebFetch timeout; used WebSearch + home listing as fallback

## Cards (max 6)

| # | Name | URL | Relevance |
|---|------|-----|-----------|
| 1 | Meeting Notes Pro | https://clawhub.ai/olivermonneke/meeting-notes-pro | session notes + coaching template |
| 2 | HITL Protocol | https://clawhub.ai/rotorstar/hitl-protocol | draft approval / multi-round review |
| 3 | Human Approval | https://clawhub.ai/openauthority/human-approval | soft gate before send/destructive |
| 4 | Wisdom & Accountability Coach | https://clawhub.ai/mikecourt/wisdom-accountability-coach | longitudinal coaching memory |
| 5 | Personal Fitness Coach | https://clawhub.ai/ekintkara/personal-fitness-coach | program file tree + periodization cues |
| 6 | Fitness & Training Engineering | https://clawhub.ai/1kalin/afrexai-fitness-engine | monthly/mesocycle plan modules |

### Security-adjacent (scanned, not in top-6 adapt list)

- **KrumpPhysio** https://clawhub.ai/arunnadarasa/krumpphysio — physio/rehab framing, joint angles, ROM scoring, NCD/rehab adherence → **HIGH flags** (diagnosis-adjacent, therapeutic claims). Pattern of structured scoring only; reject clinical voice.
- **Writing Assistant** https://clawhub.ai/Clawdssen/agentledger-writing-assistant — «never auto-publish / auto-send»; store drafts local — useful HITL narrative (fetch timeout on full page; summary from search).
- **AI Meeting Notes** https://clawhub.ai/jeffjhunter/ai-meeting-notes — dated filenames + action extract; risk if auto-email to attendees; client names in filenames.
- **Planning with files** https://clawhub.ai/othmanadi/skills/planning-with-files — modular `task_plan` / `progress` / `findings` files for multi-step plans.

## Patterns to adapt (NOT copy)

1. **Section map for session notes** — Goal → Decisions/Findings → Actions(owner+when) → Open questions → Next session (from Meeting Notes Pro coaching block / GROW).
2. **Modular plan files** — separate profile / session-log / monthly-plan / commitments (from Personal Fitness Coach tree + planning-with-files).
3. **HITL gates** — soft confirm before any client-facing send; dual gate draft→approve (HITL Protocol review types: approval/edit/reject; Human Approval soft gate).
4. **Longitudinal memory** — commitments + pattern notice + check-in delta (Wisdom Coach) → map to EG client card / progress, not therapy.
5. **Periodization skeleton** — weeks as phases + deload + progression rule (Fitness Engine) → EG monthly coaching plan without gym-bro copy or injury-rehab diagnosis language.
6. **Filename discipline** — `YYYY-MM-DD_slug.md` for session artifacts (AI Meeting Notes).

## Security flags summary

| Card | Flags |
|------|-------|
| Meeting Notes Pro | low: follow-up email templates could auto-send if wired; PII in attendee lists |
| HITL Protocol | low–med: webhook/callback transport; opaque tokens OK; do not auto-approve on timeout for client docs |
| Human Approval | positive pattern: soft gate; warn soft HITL bypassable — for EG keep dual HITL in skill text + no auto TG/email |
| Wisdom Coach | med: stores life/health narratives → PII; NOT therapy (skill says so) — still separate client data from marketing |
| Personal Fitness Coach | **HIGH**: fake «Prof. Dr.» / clinical dietitian persona; asks metabolic disease (diabetes, thyroid); physician-claim risk vs EG bans |
| Fitness Engine | med: «injury rehab», «diagnose plateau», health-check language → strip diagnosis framing |
| KrumpPhysio (scan) | **HIGH**: physiotherapy coach, ROM/joint scoring as therapy, NCD framing |

## Recommended Cursor adaptations (EG)

- Skill modules: `post-session-draft` · `monthly-plan-draft` · `coaching-arc-draft`
- Frontmatter: `published: false` / `status: draft` · explicit HITL approve before client export
- Ban list in skill: diagnoses, «вылечим», physician-claim, auto-send to client channels
- Section map aligned to Atmosfera rule 50-programs (post-session) + vault SoT — cite paths, don’t dump corpus
- Client PII only under client-data PARA path; never in producer drafts / public git

## Rejected (do NOT copy)

- Verbatim SKILL.md / GROW scripts / credential theatre («Dr. Ayşe», CSCS personas)
- Medical diagnosis / SOAP clinical claims / joint-angle therapeutic scoring as care
- Auto-email / auto-Telegram / auto-WhatsApp of session notes to clients
- Scraping metabolic/PHI into shared writing-state or public repos
- Injury-rehab «program diagnosis» language from fitness engine
- Philosophy therapy substitute from Wisdom Coach for clinical cases

## Freshness

- Hub live 2026-08-05; card publish dates often absent on listing → freshness **warn** (unknown absolute age); treat as marketplace patterns ≤90d listing presence with `stale_warning` if no version date.
- Cross-check: ≥2 sources per pattern family (notes / HITL / coaching / program files).

## Status

`status: ok` · source_count: 6 primary + 4 adjacent scans · rejected_verbatim: true
