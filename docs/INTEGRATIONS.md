# INTEGRATIONS — интеграции

---

## Prodamus

| Продукт | Тип оплаты | Webhook |
|---------|------------|---------|
| Тест 684 | Разовый | `/webhook` |
| Дыхание и осанка 1990 | Разовый | `/webhook` |
| Базовая настройка 9990 | Разовый | `/webhook` |
| Клуб 1680 | Подписка | `/webhook` + `/webhook/subscription` |

Требования:
- HMAC / secret  
- Идемпотентность по `order_id`  
- Сопоставление с Telegram user  
- Журнал raw webhook  
- Защита от двойной выдачи  

URL (пример): `https://bot.egoshev.ru/webhook`

---

## Telegram

| Связка | Как |
|--------|-----|
| Бот ↔ пользователь | Deep links: `telo`, `test`, `club`, `kurs`, `anketa` |
| Бот ↔ канал | Бот — админ `@EvgeniiGoshev`, post + documents |
| Бот ↔ клуб | Invite link / kick после окончания подписки |
| Menu Button | `/menu` в боте или `https://egoshev.ru/tree` (полноценное Mini App — месяц 2–3) |

---

## Tilda

- Страницы продуктов и SEO  
- Forms: анкета  
- Members: доступ к курсу  
- Не заменять без причины  

---

## Instagram → бот (легально)

| Вариант | Когда |
|---------|-------|
| Ссылка `t.me/бот?start=telo` в шапке/Stories | MVP |
| ManyChat / официальный Instagram API | Масштаб |
| ChatPlace (если уже есть) | Сохранить, не ломать |

Запрещено: пароли IG, неофициальный скрейпинг.

---

## Аналитика

- Яндекс Метрика на Tilda  
- События воронки (см. ANALYTICS.md)  
- UTM: `instagram`, `telegram`, `site`, `yandex_maps`, `youtube`, `vk`  

---

## OpenAI (опционально)

- Черновики постов канала  
- Не публикует без approve  
- Не отвечает в клубе за Евгения  
