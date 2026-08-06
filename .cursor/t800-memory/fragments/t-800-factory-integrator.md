# t-800-factory-integrator — atmosfera-client-programs-mvp

**Date:** 2026-08-05  
**status:** ok  
**stage:** integrator  
**mode:** CREATE  
**pack_name:** atmosfera-client-programs-mvp  
**agent:** t-800-factory-integrator  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`

---

## Discovery

```yaml
status: ok
profile: workspace-cursor
artifact_surface: cursor-workspace
plugin_root: ""
registry_patch: null
release_handoff: null
```

---

## Verification checklist

| Check | Result |
|-------|--------|
| `.cursor/skills/eg-client-programs/SKILL.md` | true |
| refs: post-session / monthly-plan / long-term / bans-checklist | true (4/4) |
| `.cursor/commands/eg-programma.md` | true |
| `.cursor/commands/программа.md` | true |
| `90_ВХОДЯЩИЕ/program-drafts/.gitkeep` | true |
| frontmatter `name: eg-client-programs` | true |
| `disable-model-invocation: true` | true |
| command frontmatter `name: eg-programma` | true |
| agents-registry.json patched | **false** (no agent; skip) |
| director-rule / eg-director-brand / hooks / rules | **untouched** |
| install scripts | skipped (cursor-workspace) |
| Skills/Commands discovery | auto from `.cursor/skills/` + `.cursor/commands/` (Reload Window) |

---

## Actions

| Action | Result |
|--------|--------|
| Verify builder artifacts (8 paths) | ok |
| Plugin registry | skipped (`registry_patch: null`) |
| Install | skipped |
| run-manifest.json | updated → slug `atmosfera-client-programs-mvp` (prior eg-director-brand overwritten as current-run SoT) |
| AGENTS.md | +1 line: `/eg-programma` → `program-drafts/` (matched existing `/eg-producer` list) |
| НАЧНИ_ЗДЕСЬ.md | SKIP (no slash-command list) |

---

## Handoff

```yaml
status: ok
stage: integrator
profile: workspace-cursor
artifact_surface: cursor-workspace
plugin_root: ""
registry_patch: null
release_handoff: null
artifacts:
  - .cursor/skills/eg-client-programs/SKILL.md
  - .cursor/skills/eg-client-programs/references/post-session.md
  - .cursor/skills/eg-client-programs/references/monthly-plan.md
  - .cursor/skills/eg-client-programs/references/long-term.md
  - .cursor/skills/eg-client-programs/references/bans-checklist.md
  - .cursor/commands/eg-programma.md
  - .cursor/commands/программа.md
  - 90_ВХОДЯЩИЕ/program-drafts/.gitkeep
checks:
  all_files_exist: true
  registry_patched: false
  install_needed: false
  auto_discover: true
handoff:
  summary: >
    Pack integrated on cursor-workspace. Skills/Commands auto-discover from .cursor/.
    No registry/install. Next: prompt-auditor → factory-auditor. Reload Window after ship.
  next: Task(t-800-prompt-auditor)
```

**Next:** `t-800-prompt-auditor` → `t-800-factory-auditor`
