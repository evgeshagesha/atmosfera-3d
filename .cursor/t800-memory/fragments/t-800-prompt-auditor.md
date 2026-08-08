# t-800-prompt-auditor — eg-anketaplan

**stage:** prompt-auditor  
**artifact:** skill + thin command  
**audited:** 2026-08-08  
**status:** ok

## Verdict

Pack `eg-anketaplan` проходит prompt QA. Critical нет. Nits неблокирующие — ship to factory-auditor.

## Checks

| id | result | note |
|----|--------|------|
| skill_exists | pass | `.cursor/skills/eg-anketaplan/SKILL.md` |
| command_exists | pass | `.cursor/commands/eg-anketaplan.md` thin router |
| use_when_do_not | pass | skill + command description |
| disable_model_invocation | pass | `true` on skill |
| anti_description_trap | pass | routing only; no Next island/API dump |
| no_tools_frontmatter | pass | N/A skill; no `tools:` |
| name_eq_filename | pass | `eg-anketaplan` |
| skill_line_budget | pass | 114 ≤ ~120; refs progressive |
| do_not_touch_anketa | pass | skill/command/refs/bans |
| handoff_dev_primary | pass | Dev/site-next; bot NOT primary |
| zero_copy_prices | pass | cite-only; tone-bans section |
| brand_bans | pass | tone-bans.md + SKILL bans |
| locked_decisions | pass | STRATEGY_TG→TELEGRAM, Zod, RHF skip, client lock, in-place, both-or-502 |
| no_secrets | pass | only ban-names; no tokens |
| no_site_next_codegen | pass | no `app/anketaplan/**` / api dir |

## Findings

critical: []

warnings (non-blocking):
- Command algorithm says «Gates A–C» while skill lists A–E; STOP section clarifies D–E post-Dev — intentional thin router, OK.
- Skill description slightly dense (API/Telegram keywords) but still Use when/Do NOT routing, not body dump.

## Recommendation

`ship_to_factory_auditor`

```yaml
status: ok
stage: prompt-auditor
checks:
  - id: skill_exists
    result: pass
    note: SKILL.md present with role/workflow/handoff/bans/refs
  - id: command_thin
    result: pass
    note: slash router; reads skill+refs; STOP before codegen
  - id: use_when_do_not
    result: pass
    note: both skill and command frontmatter
  - id: disable_model_invocation
    result: pass
    note: "true"
  - id: anti_description_trap
    result: pass
    note: no Next island/API dump in description
  - id: no_tools_frontmatter
    result: pass
    note: none
  - id: name_eq_filename
    result: pass
    note: eg-anketaplan
  - id: skill_line_budget
    result: pass
    note: "114 lines; progressive refs"
  - id: do_not_touch_anketa
    result: pass
    note: explicit across pack
  - id: handoff_dev_primary
    result: pass
    note: Dev/site-next; eg-bot-engineer not primary
  - id: zero_copy_prices
    result: pass
    note: cite SoT only
  - id: brand_bans
    result: pass
    note: tone-bans.md + physician/med bans
  - id: locked_decisions
    result: pass
    note: TG chain Zod RHF lock in-place both-or-502
  - id: no_secrets
    result: pass
    note: TELEGRAM_BOT_TOKEN named only as ban
  - id: no_site_next_codegen
    result: pass
    note: cite only; no anketaplan app/api dirs
findings: []
repair_hints: []
```
