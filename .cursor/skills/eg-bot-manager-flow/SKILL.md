---
name: eg-bot-manager-flow
description: |
  Проектирует менеджер-флоу Telegram-бота EG (Атмосфера 3D): заявки → анкета →
  переписка → follow-up-приглашение на приём в студию; Trigger FAQ-матрица в тоне EG
  без медобещаний. Handoff: код/деплой → eg-bot-engineer; тексты knowledge_base →
  eg-bot-knowledge. Use when: менеджер бота, анкета лида, follow-up запись / приглашение
  на приём, FAQ-триггеры бота, manager flow, сценарий soft follow-up до студии.
  Do NOT use when: правка Python / webhook / Prodamus / Timeweb (→ eg-bot-engineer);
  только файлы bot/knowledge_base без флоу (→ eg-bot-knowledge); автопостинг / Phase B
  posting; ffmpeg+Remotion / видео (→ remotion-*); outline из vault (→ eg-knowledge-outline);
  деплой-rule Timeweb (→ eg-bot-routing); новый субагент менеджера; переписывание bot.py
  в skill (только cite путей).
---

# eg-bot-manager-flow

Skill Phase A: дизайн менеджер-флоу бота EG. Код не правит — только сценарии, states, FAQ-триггеры и handoff.

## Роль

Спроектировать и уточнить путь лида в Telegram-боте Атмосфера 3D:

**заявка → welcome/гайд → анкета → диалог → soft follow-up → приглашение на приём в студию** (+ опционально оплата / клуб).

Тон: спокойный премиум EG. Формула: что происходит → почему → что делать → результат.

## Когда применять

**Triggers:** менеджер бота · анкета лида · follow-up запись · приглашение на приём · FAQ-триггеры · manager flow.

**Не применять:** Python / webhook / Prodamus / Timeweb → `eg-bot-engineer`; только KB-файлы без флоу → `eg-bot-knowledge`; posting / Remotion / vault-outline / новый субагент менеджера; правка `bot.py` внутри skill.

## Code context (cite only)

Не переписывать. Цитировать пути:

| Путь | Зачем |
|------|--------|
| `01_ПРОЕКТЫ/P02_бот_telegram/bot/user_state.py` | `S_WELCOME`, `S_DIALOGUE_1/2`, `S_PAYMENT_LINK_SENT`, `S_INVITE_SENT` |
| `01_ПРОЕКТЫ/P02_бот_telegram/bot/followups.py` | soft nudges 2h / 24h / 72h |
| `01_ПРОЕКТЫ/P02_бот_telegram/bot/bot.py` | orchestration (только cite) |
| `01_ПРОЕКТЫ/P02_бот_telegram/bot/knowledge_base/` | тексты → handoff `eg-bot-knowledge` |
| `01_ПРОЕКТЫ/P02_бот_telegram/bot/products.json` | цены / продукты |

Также: `Desktop/eg-community-bot`, `_АВТОМАТИЗАЦИИ_СТАРЫЕ/telegram_бот` — legacy context.

## Workflow

### 1. Уточнить цель

Лид-сценарий: студия / клуб / курс / гайд. 1–3 вопроса или сильная гипотеза.

### 2. State-map

Сверить Phase A карту с P02: `references/manager-state-map.md`.  
**Gap:** явный offline studio invite vs текущие product follow-ups — design target.

### 3. Анкета и диалог

Поля анкеты + вопросы `S_DIALOGUE_1/2`. Без диагноза; без давления на запись.

### 4. Trigger FAQ-матрица

Строки в `references/trigger-matrix.md`: intent → скелет ответа → CTA → next_state / handoff.

### 5. Soft follow-up → studio invite

Опираться на 2h/24h/72h (`followups.py`). Спроектировать **приглашение на приём** как отдельный шаг (не подменять product upsell).

### 6. Handoff

Код/деплой → `Task(eg-bot-engineer)`. Готовые FAQ/welcome тексты → `Task(eg-bot-knowledge)`. Не вызывать Remotion / posting.

## Handoff

| Что | Куда |
|-----|------|
| Код, webhook, Prodamus, Timeweb | `eg-bot-engineer` |
| Файлы `knowledge_base/`, welcome, стиль | `eg-bot-knowledge` |
| Дизайн флоу / states / FAQ-матрица | **этот skill** |
| Видео / Remotion | `remotion-*` (вне скоупа) |
| Sibling slash | `/p02-bot` |

## Quality gate

Перед выдачей — `references/tone-bans.md`:

- нет «вылечим», диагноза-ярлыка, гарантий;
- FAQ ≠ диагноз; нет давления на booking;
- CTA спокойный; следующий шаг ясен.

## Как вызвать

- Slash: `/eg-bot-manager-flow`
- Авто: description matches (менеджер бота, анкета, follow-up приём, FAQ-триггеры)
- Sibling: `/p02-bot` для кода / KB / деплоя

## References

| Файл | Содержание |
|------|------------|
| `references/manager-state-map.md` | Phase A states ↔ P02 |
| `references/trigger-matrix.md` | MVP FAQ / intents |
| `references/tone-bans.md` | запреты тона + bot-specific |
| `knowledge_base/06-stil-i-ofer-dlya-bota.md` | стиль бота (cite, не dump) |
