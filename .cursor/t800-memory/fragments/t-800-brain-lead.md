# t-800-brain-lead — eg-news-to-blog

> stage: brain  
> at: 2026-07-28  
> domains: context + agents (cloud skipped — v1 slash-only)  
> brief: `factory-briefs/eg-news-to-blog.yaml`  
> factory: NOT called (Director handoff)

## Progress

```text
Brain ▸ domains: context+agents → brief ready
```

## Verdict

**CREATE** skill `eg-news-to-blog` (`disable-model-invocation: true`) + command `/eg-news-to-blog` + short alwaysApply rule. **NO agent.** Aligns KB decision matrix + Family A research.

## Domains

| Domain | Key |
|--------|-----|
| context | paths `.cursor/skills|commands|rules`; disable-model-invocation; alwaysApply short; no subagent |
| agents | HITL = skill STOP + human message; Plan ≠ publish gate; workflow in skill body not alwaysApply |

## Handoff

Director → `Task(t-800-factory)` with `factory-briefs/eg-news-to-blog.yaml`.
