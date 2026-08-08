# t-800-factory-integrator — eg-anketaplan

```yaml
status: ok
stage: integrator
profile: workspace-cursor
artifact_surface: cursor-workspace
plugin_root: ""
memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
target_plugin: null
registry_patch: null
release_handoff: null
pack: eg-anketaplan
verified_at: "2026-08-08T20:51+03:00"
```

## Discovery

```json
{
  "workspace_root": "/Users/egoshev/Projects/atmosfera-3d",
  "plugin_root": "",
  "memory_path": "/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory",
  "profile": "workspace-cursor",
  "artifact_surface": "cursor-workspace",
  "release_handoff": null
}
```

## Verify (6/6)

| Path | Status |
|------|--------|
| `.cursor/skills/eg-anketaplan/SKILL.md` | ok · `disable-model-invocation: true` |
| `.cursor/skills/eg-anketaplan/references/cite-paths.md` | ok |
| `.cursor/skills/eg-anketaplan/references/dev-handoff-checklist.md` | ok |
| `.cursor/skills/eg-anketaplan/references/hitl-gates.md` | ok |
| `.cursor/skills/eg-anketaplan/references/tone-bans.md` | ok |
| `.cursor/commands/eg-anketaplan.md` | ok · thin slash → skill |

## Integration actions

- **No rewrite** of builder content (paths intact).
- **No** `agents-registry.json` patch (workspace skill — not registry entry).
- **No** plugin install / `~/.cursor/plugins/local/**` writes.
- **No** routing rule created (not required).
- **No** `site-next` edits.

## User note

После install: **Reload Window** — чтобы Cursor подхватил workspace skill/command.

## Handoff

```yaml
next: prompt-auditor then factory-auditor
summary: >
  Pack eg-anketaplan integrated under .cursor/skills|commands.
  HITL skill + thin /eg-anketaplan. registry_patch null.
  Ready for prompt-auditor → factory-auditor.
```
