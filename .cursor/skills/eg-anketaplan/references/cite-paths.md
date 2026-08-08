# cite-paths — eg-anketaplan

> 💡 Только **cite**. Не копировать эссе, цены, токены, полный HTML в skill/черновики.

## Источник и целевые пути

| Роль | Путь |
|------|------|
| HTML SoT (мастер-анкета) | `90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html` |
| Target page (Dev) | `01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/app/anketaplan/` · публичный route `/anketaplan` |
| Thin RSC entry | `…/site-next/app/anketaplan/page.tsx` · CSS `…/app/anketaplan/anketaplan.css` |
| Client island (neon port) | `…/site-next/components/anketaplan/AnketaplanIsland.tsx` · `formHtml.ts` · `runtime.ts` |
| Zod / format | `…/site-next/lib/anketaplan/schema.ts` · `format.ts` |
| API submit | `…/site-next/app/api/anketaplan/submit/route.ts` · `POST /api/anketaplan/submit` |
| Prod URL | https://eg.egoshev.ru/anketaplan (Timeweb `site-next`) |

## Mirror (паттерн, не копипаст слепой)

| Роль | Путь |
|------|------|
| Lead normalize / honeypot / 502 | `…/site-next/lib/strategy/lead.ts` |
| Lead API | `…/site-next/app/api/strategy/lead/route.ts` |
| Client form UX | `…/site-next/components/strategy/StrategyFormModal.tsx` |
| Telegram helpers | `…/site-next/lib/notifications/telegram.ts` |

## Цены и бренд (Zero-Copy)

| Роль | Путь |
|------|------|
| Цены / продукты | `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc` |
| Products data (если есть) | `products.yaml` / vault SoT цен — **cite only**, не embed таблицы |
| Бренд / bans | `.cursor/rules/atmosfera-3d.mdc` |
| Training positioning (при релевантности) | `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/01_EG_OS_БРЕНД/TRAINING_SYSTEM_POSITIONING_MASTER.md` |

## Locked identifiers

| Ключ | Значение |
|------|----------|
| localStorage | `egoshev_master_intake_v3` |
| API | `POST /api/anketaplan/submit` |
| TG env chain | `STRATEGY_TG_*` → `TELEGRAM_*` (server-only) |
| Day-1 isolation | **нет** `ANKETAPLAN_TG_*` |

## Hard: не трогать

| Запрет | Путь / route |
|--------|----------------|
| Не редактировать | `/anketa` · `app/anketa/**` · `components/anketa/**` |
| Не путать | kids-anketa / иные анкеты студии |
| Не bake | `TELEGRAM_BOT_TOKEN` · chat id · любые secrets · `NEXT_PUBLIC_*` для TG |
| Не deploy-target | отдельный Vercel-проект для anketaplan |

## Sibling (не этот skill)

| Задача | Куда |
|--------|------|
| Текст программы клиенту | `eg-client-programs` · `/eg-programma` |
| Бот P02 | `eg-bot-engineer` / `/p02-bot` |
