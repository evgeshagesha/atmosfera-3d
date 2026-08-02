# 🔐 Сегодня: security (Иван) + бот/Prodamus + Дзен

> Один рабочий лист на **02.08.2026**: что ввести **ты**, что сказать Agent, что проверить. Без программирования.

---

## 📋 Свойства

| | |
|---|---|
| **Дата** | 02.08.2026 |
| **Статус** | 🟡 Ждёт секреты Евгения → потом деплой Agent |
| **Для кого** | Евгений (не программист) |
| **Цель** | Закрыть замечания IT: Prodamus `Sign` + fail-closed admin · тест оплат · Яндекс.Дзен |
| **Секреты в файле** | ❌ Нет |

---

> ⚠️ **Секреты НЕ в чат, НЕ в git, НЕ в этот файл.** Только на сервер (SSH / nano) или менеджер паролей / `.secrets.local.md` (в `.gitignore`).

> 💡 Подробный шаблон строк: [ЧЕКЛИСТ_СЕКРЕТЫ_TIMEWEB.md](./ЧЕКЛИСТ_СЕКРЕТЫ_TIMEWEB.md)

---

## ✅ Уже сделано

| Что | Статус | Где смотреть |
|---|---|---|
| HTTPS → redirect HTTP→HTTPS | ✅ | `http://eg.egoshev.ru/` → 301 на https |
| Статья «генетика» live | ✅ | `/blog/genetika-tela-chto-mozhno-izmenit-trenirovkami` |
| Security-код на GitHub | ✅ | commit `13b46e7` (Sign + fail-closed admin) |
| Курс 9990 = Tilda Members (HITL) | ✅ | до своего app; Prodamus курса — не срочно |
| Клуб = Tribute | ✅ | не Prodamus |
| Файл верификации Дзена на сайте | ✅ | URL ниже (HTTP 200) |
| RSS блога | ✅ | `https://eg.egoshev.ru/rss.xml` |

### Smoke сервера (read-only, 02.08.2026)

| Проверка | Результат |
|---|---|
| `PRODAMUS_SECRET` в `/opt/atmosfera-bot/.env` | ❌ **false** (ключ пустой / не задан) |
| Новый `webhook_prodamus` (Sign) на VPS | ❌ **старый** файл (нет `prodamus_signature.py`; health без `prodamus_secret_configured`) |
| Live health webhook | `https://eg.egoshev.ru/prodamus/health` → `{"status":"ok"}` (старый код) |
| Env админки на сайте | ❌ файла `.env.production.local` **нет** |
| HTTPS redirect | ✅ да |
| `bot.egoshev.ru` | ⚠️ DNS с Mac/сервера не резолвится; рабочий путь = `/prodamus/` на `eg.egoshev.ru` |

---

## Порядок сегодня (не мешать)

1. **Блок А** — секреты на Timeweb (ты)  
2. **Блок Б** — деплой кода (Agent)  
3. **Блок В** — Дзен (ты в кабинете)  
4. **Блок Г** — smoke-чеклист  

---

## А. Timeweb секреты (ты, ~10–15 мин)

### Файлы и 3 переменные

| # | Файл на сервере | Переменная | Откуда взять |
|---:|---|---|---|
| 1 | `/opt/atmosfera-bot/.env` | `PRODAMUS_SECRET` | Кабинет Prodamus → страница оплаты → **Secret key** |
| 2 | `/var/www/egoshev.ru/.env.production.local` | `ADMIN_PASSWORD` | `openssl rand -base64 32` (1-й раз) |
| 3 | тот же файл | `ADMIN_SECRET` | `openssl rand -base64 32` (2-й раз) |

> 💡 Файл сайта **создай**, если его нет (`nano` / `touch`). Для Next + pm2 этого достаточно после restart.

### Команды на Mac

```bash
# два раза — два разных значения
openssl rand -base64 32
openssl rand -base64 32

# зайти на сервер
ssh egoshev-timeweb
```

### На сервере (после SSH)

```bash
# 1) Prodamus
nano /opt/atmosfera-bot/.env
# строка: PRODAMUS_SECRET=...   (без кавычек, без пробелов вокруг =)

# 2) Админка сайта (создать файл, если нет)
nano /var/www/egoshev.ru/.env.production.local
# строки:
# ADMIN_PASSWORD=...
# ADMIN_SECRET=...

# 3) Restart (секреты подхватятся)
sudo systemctl restart eg-webhook-prodamus
pm2 restart egoshev
```

- [ ] `PRODAMUS_SECRET` прописан  
- [ ] `ADMIN_PASSWORD` + `ADMIN_SECRET` прописаны  
- [ ] restart webhook + pm2 сделаны  
- [ ] В чат Agent: **«секреты прописал на Timeweb — деплой код»**

---

## Б. Деплой кода security + bot (Agent)

Скажи в Cursor:

> **деплой bot + security (Prodamus Sign + admin fail-closed)**

Agent заливает с Mac на VPS минимум:

- `/opt/atmosfera-bot/webhook_prodamus.py`
- `/opt/atmosfera-bot/prodamus_signature.py` (+ тесты не обязательны на прод)
- сайт: auth admin из commit security (если ещё не на VPS) → `npm run build` → `pm2 restart egoshev`
- `sudo systemctl restart eg-webhook-prodamus`

### Ожидаемый health после деплоя

```bash
curl -sS https://eg.egoshev.ru/prodamus/health
```

Должно быть примерно:

```json
{"status":"ok","prodamus_secret_configured":true}
```

- `prodamus_secret_configured: false` → секрет не подхватился (вернись к блоку А)  
- нет поля `prodamus_secret_configured` → **старый** код, деплой не прошёл  

- [ ] Agent подтвердил деплой  
- [ ] health показывает `prodamus_secret_configured: true`

---

## В. Яндекс.Дзен (ты, ~10 мин)

| Что | URL / действие |
|---|---|
| Verify-файл (уже на сайте) | https://eg.egoshev.ru/zen_PVE8dA1sFG4ootqNJlb9J2du7Sq9WVljG9l8gNOZmvD2cW7agvDyftzigfsYR4xA.html |
| RSS | https://eg.egoshev.ru/rss.xml |
| Кабинет | [dzen.ru](https://dzen.ru) → канал → настройки сайта / верификация |

Шаги:

1. Открыть verify-URL в браузере (пустая страница — ок, meta внутри).  
2. В Дзене нажать **Проверить** / подтвердить сайт.  
3. Подключить ленту: `https://eg.egoshev.ru/rss.xml`  
4. Дождаться синхронизации; карточки ведут на `eg.egoshev.ru/blog/...`

- [ ] Verify прошёл  
- [ ] RSS добавлен  
- [ ] (опц.) скрин «ок» в чат, если что-то красное

---

## Г. Smoke-тест (после А+Б)

| # | Проверка | Ожидание |
|---:|---|---|
| 1 | Открыть `https://eg.egoshev.ru/admin` | Логин своим `ADMIN_PASSWORD` — вход; чужой/пустой — отказ |
| 2 | Fake webhook без Sign | `curl -sS -X POST https://eg.egoshev.ru/prodamus/webhook -F "order_id=fake"` → **не** 200 с ok-заказом (401/403/503) |
| 3 | Health | `prodamus_secret_configured: true` |
| 4 | HTTPS замок | браузер: замок на `eg.egoshev.ru` (redirect с http уже есть) |
| 5 | Дзен | verify OK + RSS подключён |

- [ ] Admin fail-closed ок  
- [ ] Fake webhook отклонён  
- [ ] Health true  
- [ ] HTTPS ок  
- [ ] Дзен ок  

---

## 🚫 Что НЕ делать сегодня

- [ ] Не строить приложение клуба / Members  
- [ ] Не подключать Prodamus к курсу 9990 (курс = Tilda до app)  
- [ ] Не трогать fake-stack клуба / цены 1680 на Tilda «заодно»  
- [ ] Не слать секреты в Cursor / Telegram / git  
- [ ] Не ждать DNS `bot.egoshev.ru` — рабочий URL webhook: **`https://eg.egoshev.ru/prodamus/...`**

---

## Критерий «день закрыт»

- [ ] 3 секрета на сервере  
- [ ] Новый webhook задеплоен + health `true`  
- [ ] Admin вход работает только со своим паролем  
- [ ] Дзен: verify + RSS  

---

## Навигация

[← Главный контекст](./ГЛАВНЫЙ_КОНТЕКСТ.md) · [Чеклист секретов](./ЧЕКЛИСТ_СЕКРЕТЫ_TIMEWEB.md) · [Деплой бота](../01_ПРОЕКТЫ/P02_бот_telegram/docs/ДЕПЛОЙ_TIMEWEB.md) · [Дзен/автопост](./СЕГОДНЯ_АВТОПОСТ_ДЗЕН_YOUTUBE.md)
