# t-800-factory-integrator — Atmosfera 3D producer pack

**Date:** 2026-08-04  
**status:** ok  
**stage:** integrator  
**mode:** CREATE + EXTEND  
**pack_name:** atmosfera-producer-mvp  
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

## Actions

| Action | Result |
|--------|--------|
| Verify builder artifacts | ok — 27/27 paths exist |
| Plugin registry | skipped (workspace-cursor) |
| AGENTS.md | +1 line: `/eg-producer` → `producer-drafts/` |
| run-manifest.json | updated slug `atmosfera-producer-mvp`; integrator done |
| rules/hooks/mcp | not touched |
| skill bodies | not rewritten |

---

## Verified paths (27)

### Skills + refs (22)

- `.cursor/skills/eg-producer-studio/SKILL.md`
- `.cursor/skills/eg-producer-studio/references/voice-gate.md`
- `.cursor/skills/eg-producer-studio/references/pillars.md`
- `.cursor/skills/eg-producer-studio/references/calendar-schema.md`
- `.cursor/skills/eg-producer-studio/references/repurpose-map.md`
- `.cursor/skills/eg-producer-studio/references/cta-matrix.md`
- `.cursor/skills/eg-reels-script/SKILL.md`
- `.cursor/skills/eg-reels-script/references/beat-schema.yaml.md`
- `.cursor/skills/eg-reels-script/references/hook-patterns.md`
- `.cursor/skills/eg-reels-script/references/retention-spine.md`
- `.cursor/skills/eg-reels-script/references/anti-bait.md`
- `.cursor/skills/eg-reels-script/references/caption-cta.md`
- `.cursor/skills/eg-warmup/SKILL.md`
- `.cursor/skills/eg-warmup/references/touch-map.md`
- `.cursor/skills/eg-warmup/references/stories-beats.md`
- `.cursor/skills/eg-warmup/references/direct-soft.md`
- `.cursor/skills/eg-warmup/references/ladder-bridge.md`
- `.cursor/skills/eg-seo-brief/SKILL.md`
- `.cursor/skills/eg-seo-brief/references/brief-schema.md`
- `.cursor/skills/eg-seo-brief/references/cluster-cta.md`
- `.cursor/skills/eg-seo-brief/references/meta-limits.md`
- `.cursor/skills/eg-seo-brief/references/bans-seo.md`

### Commands (2)

- `.cursor/commands/eg-producer.md`
- `.cursor/commands/продюсер.md`

### Agents EXTEND (2)

- `.cursor/agents/kontent.md`
- `.cursor/agents/prodazhi.md`

### Scaffold (1)

- `90_ВХОДЯЩИЕ/producer-drafts/.gitkeep`

---

## Install note

`artifact_surface: cursor-workspace` — Reload Window after factory completes so Cursor picks up new skills/commands/agents.

---

## Handoff

→ `t-800-prompt-auditor` → `t-800-factory-auditor`

```yaml
status: ok
verified_path_count: 27
profile: workspace-cursor
registry_touched: false
agents_md_updated: true
```
