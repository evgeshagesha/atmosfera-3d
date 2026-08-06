# t-800-prompt-auditor — atmosfera-client-programs-mvp (RETRY closeout)

**Date:** 2026-08-05  
**status:** ok  
**recommendation:** ship_to_factory_auditor  
**pack:** atmosfera-client-programs-mvp (CREATE — files on disk)  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Specs read:** `fragments/t-800-prompt-craft.md`, `fragments/t-800-brain-lead.md`, `factory-briefs/atmosfera-client-programs-mvp.yaml`  
**Contracts:** `shared/prompt-craft-contract.md`, `shared/t-800-agent-quality-contract.md`

---

## Artifacts audited

| # | Path | Lines | Verdict |
|---|------|------:|---------|
| 1 | `.cursor/skills/eg-client-programs/SKILL.md` | 128 | PASS |
| 2 | `.../references/post-session.md` | 38 | PASS |
| 3 | `.../references/monthly-plan.md` | 38 | PASS |
| 4 | `.../references/long-term.md` | 35 | PASS |
| 5 | `.../references/bans-checklist.md` | 45 | PASS |
| 6 | `.cursor/commands/eg-programma.md` | 56 | PASS (thin) |
| 7 | `.cursor/commands/программа.md` | 26 | PASS (thin alias) |
| 8 | `90_ВХОДЯЩИЕ/program-drafts/.gitkeep` | present | PASS |

Agent file for pack: **absent** (`.cursor/agents/` has no client-programs agent).  
Director-rule in pack create list: **skipped** (out of scope per brief).

---

## Critical checklist

| Check | Result |
|-------|--------|
| Description Trap absent (routing-only description) | **pass** |
| `disable-model-invocation: true` on skill | **pass** |
| Zero-Copy cite table present (no essay paste 50-programs/STYLE SPEC) | **pass** |
| Type1 ≠ 30-day product boundary | **pass** |
| no sets/reps overload wording in post-session | **pass** |
| Type3 = skeleton only | **pass** |
| STYLE SPEC pending / draft-gated | **pass** |
| HITL STOP «Утверждаю черновик»; drafts → program-drafts/ | **pass** |
| no agent file; no director-rule; no site/VK/Remotion | **pass** |
| thin commands; Cyrillic alias thin | **pass** |
| brand bans present | **pass** |

---

## Contract QA (prompt-craft)

```yaml
status: ok
findings:
  critical: []
  warnings:
    - "Cyrillic /программа UX unverified in vendor docs — alias correctly defers to Latin /eg-programma (documented caveat; not a fail)."
    - "SKILL.md 128 lines — under 150; dense but justified by cite table + algorithm + bans (Architecture A)."
    - "eg-director-brand.mdc may exist elsewhere in workspace git status — out of this pack create_artifacts; do not fold into factory-auditor scope for this pack."
recommendation: ship_to_factory_auditor
```

### Description Trap detail

Skill `description` (~10 lines): zone + Use when + Do NOT only. Pipeline/algorithm lives in body. Commands likewise thin routers. **No Description Trap.**

### Vague description

Absent — specific triggers and exclusions.

### `tools:` frontmatter

Absent (skill uses skill fields; no agent).

### name = filename

`eg-client-programs` ↔ SKILL folder; `eg-programma` / `программа` ↔ command filenames. **PASS.**

---

## Spec alignment (prompt-craft + brain-lead + factory brief)

- Architecture A (1 skill + 4 refs + thin slash + RU alias): **match**
- HITL single STOP, draft path, YAML meta: **match**
- Type boundaries + bans checklist: **match**
- Skip agent / director-rule / site/VK/Remotion / PDF: **match**

---

## Recommended fixes

None required for ship. Optional non-blocking: none for MVP closeout.
