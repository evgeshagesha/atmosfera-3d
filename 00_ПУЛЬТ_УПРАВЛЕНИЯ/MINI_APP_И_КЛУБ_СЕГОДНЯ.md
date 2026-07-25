# 📱 Mini App · клуб · SYNTX · Kie.ai

> Обновлено: 25.07.2026  
> Официально: [Telegram Mini Apps](https://core.telegram.org/bots/webapps)

---

## Свойства

| | |
|--|--|
| **Mini App URL** | https://eg.egoshev.ru/app |
| **Бот** | @EGoshev_bot · меню «Каталог» → Mini App |
| **Канал** | @EvgeniiGoshev · закреп `/1123` |
| **Вход из Telegram** | `https://t.me/EGoshev_bot?startapp` (после Main Mini App в BotFather) |

---

## 1. Mini App — что сделано

Отдельный экран в Telegram (не весь сайт):

- коротко **про Евгения**;
- **программы** лестницы (гайд → тест → дыхание → курс → клуб → студия);
- 2 CTA: личный приём / онлайн-программы;
- полный сайт — ссылкой внизу.

Главный сайт (`eg.egoshev.ru`) живёт отдельно; в Hero усилены кнопки записи.

### Как открыть

1. В боте: кнопка меню **«Каталог»**.
2. Ссылка: https://t.me/EGoshev_bot?startapp  
3. Из закрепа канала — блок «Сайт в Telegram».

### BotFather (один раз, руками)

1. `@BotFather` → `/mybots` → `@EGoshev_bot`  
2. **Bot Settings → Menu Button** — ставит код бота  
3. **Bot Settings → Configure Mini App → Enable** → URL: `https://eg.egoshev.ru/app`  
4. Domain: `eg.egoshev.ru` (если ещё не добавлен)

> 💡 Без «Configure Mini App» ссылка `?startapp` может не открыть WebApp. Меню «Каталог» работает и без него.

---

## 2. Клуб / сайт клуба

Когда выгрузишь файлы клуба → в `90_ВХОДЯЩИЕ/` и напиши «сайт клуба выгрузил».

Оплата клуба: Tribute `https://t.me/tribute/app?startapp=s11vY`

---

## 3. Kie.ai / SYNTX

- **Kie.ai** — картинки для постов (ключ в `.env` бота).  
- **SYNTX / Kling** — отдельная подписка на видео, не путать с Kie.

---

## Чеклист

- [x] Полный сайт как Mini App URL  
- [x] TelegramWebAppBoot на сайте  
- [x] Menu «Каталог» → `eg.egoshev.ru/`  
- [ ] BotFather → Enable Main Mini App  
- [ ] Проверить в телефоне: меню + `?startapp`  
- [ ] Закреп канала: вставить блок «Сайт в Telegram» (текст в `НАВИГАЦИЯ_КАНАЛА.md`)  
- [ ] Сайт клуба / Kie

[← Навигация канала](./НАВИГАЦИЯ_КАНАЛА.md) · [Воронка](./ВОРОНКА_1М.md)
