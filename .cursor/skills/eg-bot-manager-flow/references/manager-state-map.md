# Manager state-map — Phase A

Карта менеджер-флоу лида до приглашения в студию. Код не менять здесь — только дизайн и handoff.

## Phase A поток

```
lead_in → welcome/guide → questionnaire → dialogue → soft_followup → studio_invite → (optional) payment/club
```

## Маппинг на P02

| Phase A | P02 (cite) | Примечание |
|---------|------------|------------|
| lead_in | вход с сайта / старт бота | до `S_WELCOME` |
| welcome/guide | `S_WELCOME` (`user_state.py`) | гайд / приветствие |
| questionnaire | частично в диалоге | явная анкета = design target |
| dialogue | `S_DIALOGUE_1`, `S_DIALOGUE_2` | ответы → дальше |
| soft_followup | `followups.py` · 2h / 24h / 72h | сейчас: гайд → тест → breath/club |
| studio_invite | **gap** vs product FU | целевой шаг: приглашение на приём |
| payment/club | `S_PAYMENT_LINK_SENT` → `S_INVITE_SENT` | invite сейчас = product/group, не обязательно офлайн-студия |

> ⚠️ **Gap (design target):** явный **offline studio invite** (запись на приём) vs текущие soft follow-ups под продукты. Не смешивать product upsell и приглашение в студию без явной развилки.

## State table

| state | цель | сообщение-тип | exit criteria | owner |
|-------|------|---------------|---------------|-------|
| lead_in | принять заявку / старт | системный / deep-link | user_id + контекст источника | engineer |
| welcome/guide | доверие + ценность | welcome + гайд | гайд доставлен / прочитан | skill → knowledge |
| questionnaire | собрать запрос без диагноза | анкета 3–5 полей | анкета заполнена | skill → knowledge |
| dialogue | уточнить маршрут | Q1/Q2 (`S_DIALOGUE_*`) | ответы записаны | skill + engineer |
| soft_followup | мягкий nudges 2h/24h/72h | fu_* (`followups.py`) | отклик / таймаут / отказ | skill (copy) · engineer (jobs) |
| studio_invite | пригласить на приём в студию | invite офлайн | слот / контакт / «пока нет» | skill (design) · engineer (wire) |
| payment/club | опционально продукт | payment link / club | оплата или skip | engineer · knowledge (тексты) |

## Owner shorthand

- **skill** (`eg-bot-manager-flow`) — сценарий, матрица, формулировки флоу
- **knowledge** (`eg-bot-knowledge`) — файлы `knowledge_base/`
- **engineer** (`eg-bot-engineer`) — states, jobs, webhook, deploy

## Cite

- `01_ПРОЕКТЫ/P02_бот_telegram/bot/user_state.py`
- `01_ПРОЕКТЫ/P02_бот_telegram/bot/followups.py`
- `01_ПРОЕКТЫ/P02_бот_telegram/bot/bot.py` — только путь, без rewrite в skill
