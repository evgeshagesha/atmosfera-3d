# /eg-bot-manager-flow — менеджер-флоу бота EG

Дизайн сценария лида: заявка → анкета → soft follow-up → приглашение на приём. **Не** правит Python / webhook / Remotion.

## Сначала прочитай

1. `.cursor/skills/eg-bot-manager-flow/SKILL.md`
2. `references/manager-state-map.md`
3. `references/trigger-matrix.md`
4. `references/tone-bans.md`

## Маршрут

| Задача | Куда |
|---|---|
| Флоу, states, FAQ-триггеры, studio invite | **этот skill** |
| Код, Prodamus, webhook, Timeweb | `eg-bot-engineer` |
| Тексты `knowledge_base/`, welcome | `eg-bot-knowledge` |
| Reels / Stories / posting | вне скоупа (не вызывать) |
| Видео / Remotion | `remotion-*` (не вызывать) |

## Sibling

`/p02-bot` — код, KB, деплой. Этот command — только менеджер-флоу Phase A.

## Выход

State-map + trigger-строки + CTA + handoff (engineer / knowledge). Без rewrite `bot.py`.
