# t-800-prompt-auditor — Atmosfera 3D producer pack

**Date:** 2026-08-04  
**status:** ok  
**agent:** t-800-prompt-auditor  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**pack:** atmosfera-producer-mvp  
**specs compared:** `fragments/t-800-prompt-craft.md` · `fragments/t-800-factory-architect.md` · `shared/prompt-craft-contract.md` · `shared/t-800-agent-quality-contract.md`  
**Handoff:** → `t-800-factory-auditor`  
**NOT done:** file edits (readonly QA only)

---

## Artifacts audited (8)

| # | Type | Path | Lines | Verdict |
|---|------|------|------:|---------|
| 1 | skill | `.cursor/skills/eg-producer-studio/SKILL.md` | 104 | pass |
| 2 | skill | `.cursor/skills/eg-reels-script/SKILL.md` | 104 | pass |
| 3 | skill | `.cursor/skills/eg-warmup/SKILL.md` | 106 | pass (+warn) |
| 4 | skill | `.cursor/skills/eg-seo-brief/SKILL.md` | 100 | pass (+warn) |
| 5 | command | `.cursor/commands/eg-producer.md` | 65 | pass |
| 6 | command | `.cursor/commands/продюсер.md` | 29 | pass |
| 7 | agent EXTEND | `.cursor/agents/kontent.md` | 68 | pass |
| 8 | agent EXTEND | `.cursor/agents/prodazhi.md` | 70 | pass |

L3 skim (Zero-Copy): `voice-gate.md`, `cta-matrix.md`, `beat-schema.yaml.md`, `caption-cta.md`, `touch-map.md`, `ladder-bridge.md`, `brief-schema.md`, `bans-seo.md` — schema/checklist/cite only; **no** MASTER/ToV essay dump.

---

## Focus checklist (brief FAIL criteria)

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Description Trap — description = Use when / Do NOT routing only | **PASS** all 8 |
| 2 | Agent FM exactly 5 fields; no `tools:` | **PASS** kontent + prodazhi (`name`, `description`, `model`, `readonly`, `is_background`) |
| 3 | `model: inherit` on agents | **PASS** |
| 4 | HITL STOP + gates «Утверждаю brief\|beats\|черновик» / Ready in `/eg-producer` | **PASS** (`eg-producer.md` L42–50; alias mirrors) |
| 5 | CTA single anketa `https://eg.egoshev.ru/anketa` | **PASS** pack-level (command, reels, warmup, prodazhi, L3); see WARN on seo L2 pin |
| 6 | Zero-Copy — no MASTER/ToV essay in SKILL bodies | **PASS** (cite paths only) |
| 7 | drafts → `90_ВХОДЯЩИЕ/producer-drafts/`; `published: false` | **PASS** all prompt bodies |
| 8 | brand bans present | **PASS** (rules cite + bans sections; see WARN warmup completeness) |
| 9 | Alias `продюсер` thin → `eg-producer` | **PASS** (29 lines; points primary; gates + invariants) |

---

## status

```yaml
status: ok
critical: []
warnings:
  - id: W1
    severity: warning
    file: .cursor/skills/eg-seo-brief/SKILL.md
    issue: >
      L2 body does not hard-pin full CTA URL `https://eg.egoshev.ru/anketa`
      (says «anketa / лестница»). Full URL lives in L3 `brief-schema.md` /
      `cluster-cta.md` and command. Intent one_cta clear; not Description Trap.
    repair_hint: >
      In Роль or Алгоритм step 2/5, add explicit one CTA →
      `https://eg.egoshev.ru/anketa` (match reels/prodazhi wording).
  - id: W2
    severity: warning
    file: .cursor/skills/eg-warmup/SKILL.md
    issue: >
      Запреты (L101–106) omit explicit YouTube CTA→eg.egoshev.ru and
      «тело мечты» / «врач» (covered via «medical» + brand rules cite).
      CTA URL is pinned in Роль L21.
    repair_hint: >
      Add to Запреты: YouTube CTA→eg.egoshev.ru · «врач»-claim · «тело мечты»
      for parity with studio/reels.
  - id: W3
    severity: warning
    file: .cursor/skills/eg-producer-studio/SKILL.md
    issue: >
      L2 does not spell full anketa URL (defers to `cta-matrix.md`). Acceptable
      for router skill; pack invariant still satisfied via L3 + command.
    repair_hint: optional one-liner in Алгоритм/Запреты citing default CTA URL.
recommendation: ship_to_factory_auditor
```

---

## Per-artifact notes

### Skills
- **Descriptions:** zone + Use when + Do NOT; pipeline only in body — anti Description Trap OK (matches prompt_craft FM).
- **Structure:** Роль → Что читать → Алгоритм → Выход → Связи → Запреты present.
- **All <150 lines** (100–106).
- **name** matches skill folder / frontmatter.

### Commands
- **eg-producer:** thin router; all 4 gate phrases; draft path; `published: false`; one CTA anketa; brand bans; nesting ≤2 leaves.
- **продюсер:** thin alias; Read primary; gates + invariants; no duplicated craft essay.

### Agents EXTEND
- **kontent / prodazhi:** FM keys exactly 5; `model: inherit`; no `tools:`; Use when / Do NOT; drafts→producer-drafts; bans; leaf `calls: []`.
- **name = filename.**

### L3 Zero-Copy
- No pasted MASTER/ToV essays; checklists + YAML schemas + Cite blocks only.

---

## repair_hints

```yaml
repair_hints: []   # no critical; optional polish W1–W3 above if builder does drive-by
# If parent insists strict CTA pin everywhere before auditor:
#   1) eg-seo-brief/SKILL.md — hard-pin anketa URL in Роль/Алгоритм
#   2) eg-warmup/SKILL.md — expand Запреты YouTube/врач/тело мечты
```

---

## handoff

| To | What |
|----|------|
| `t-800-factory-auditor` | **PASS prompt QA** — proceed graph/registry/surface audit |
| builder | optional non-blocking W1–W3 only |

**status:** `ok` · critical `0` · warnings `3` · recommendation `ship_to_factory_auditor`
