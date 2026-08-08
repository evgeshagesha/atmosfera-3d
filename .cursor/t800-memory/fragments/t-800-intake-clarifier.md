# t-800-intake-clarifier — 2026-08-08

## status
`asked` — blocks research until answers

## hypothesis (fixed)
| Field | Value |
|-------|-------|
| artifact_surface | `cursor-workspace` (discovery) |
| workspace | `/Users/egoshev/Projects/atmosfera-3d` |
| memory_path | `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory` |
| raw_goal | Анкета месячного плана после покупки консультации → production Next.js (App Router + TS) на anketa.egoshev.ru из `master-client-intake.html` + Telegram POST `/api/submit` (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID server-only) |

## blocker
`master-client-intake.html` **не найден** в Projects / Downloads / Desktop — без файла нельзя «максимально точно сохранить вид».

## open questions (2–5)
1. Где лежит `master-client-intake.html`? (абсолютный путь / вложить в чат / Google Drive / другой источник)
2. Отдельный Next-проект `anketa.egoshev.ru` (Vercel как в ТЗ) **или** маршрут внутри текущего `site-next` на Timeweb?
3. T-800 артефакт: skill/command/агент для сопровождения анкеты, **или** только код приложения (тогда factory-brief = skill-обёртка + handoff на build)?
4. Telegram: новая группа «заявки месячный план» **или** те же STRATEGY_TG / TELEGRAM_* что на VPS для `/strategy`?
5. Связь с существующей `/anketa` на eg.egoshev.ru — не трогать / заменить / редирект?

## assumed_defaults
[] — ничего не угадываем до ответов

## blocks_research
`true`

## next_after_answers
scout → research DEEP → brain → factory
