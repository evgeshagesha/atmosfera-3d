---
name: eg-programma
description: |
  Клиентские программы Атмосфера 3D: post-session|monthly|long-term.
  HITL-черновик в program-drafts. Без автоотправки.
  Use when: /eg-programma или нужен клиентский программный документ.
  Do NOT use when: eg-producer; eg-news-to-blog; PDF-пайплайн; сайт;
  VK; Remotion; медобещания; T-800 factory.
---

# /eg-programma — thin router

Тонкий slash-роутер → skill `eg-client-programs`.  
**HITL only.** Не шлёт клиенту, не рендерит PDF, не трогает сайт/VK/Remotion.

## Сначала прочитай

1. `.cursor/skills/eg-client-programs/SKILL.md`
2. Matching type ref:
   - `post-session` → `.cursor/skills/eg-client-programs/references/post-session.md`
   - `monthly` → `.cursor/skills/eg-client-programs/references/monthly-plan.md`
   - `long-term` → `.cursor/skills/eg-client-programs/references/long-term.md`
3. **Always:** `.cursor/skills/eg-client-programs/references/bans-checklist.md`
4. Cite SoT-пути из таблицы skill (Zero-Copy; не paste эссе)

## Parse `$ARGUMENTS`

`post-session` | `monthly` | `long-term`

Пусто → **один** уточняющий вопрос → `status: needs_type`.

## Маршрут → skill algorithm

Следовать алгоритму `eg-client-programs` (parse → Read/quote → bans → outline → draft → STOP).  
Черновик → `90_ВХОДЯЩИЕ/program-drafts/` с YAML meta.

Не дублировать полное тело skill здесь. Нет `Task(agent)` / kontent / prodazhi.

## STOP gate

Показать draft + path.  
**STOP.** Ждать: «Утверждаю черновик».  
Single gate (не dual-hash). Без автоотправки.

## Выход

`mode` + `draft_path` + `status` + `next_step`

## Запреты

- auto-send клиенту · сайт / VK / Remotion / PDF-рендер  
- Type1 = «Персональная программа на 30 дней»  
- sets/reps overload в post-session  
- диагноз / медобещания  
- обход HITL STOP  
- eg-producer / eg-news пайплайны  
