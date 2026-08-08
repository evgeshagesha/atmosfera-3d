# 🛡️ VPN и доступ к сайту — диагностика

> Почему с VPN «сайт не открывается», что реально блокирует, и как открывать без ослабления безопасности VPS.

---

## 📋 Свойства

| | |
|---|---|
| **Статус** | 🟢 Проверено 2026-08-08 |
| **Live Next** | `https://eg.egoshev.ru` |
| **Apex / Tilda** | `https://egoshev.ru` · `www` |
| **VPS** | Timeweb `5.42.96.101` · SSH `egoshev-timeweb` · PM2 `egoshev` |
| **Связанные** | [Канон домена](./КАНОН_ДОМЕН_eg.egoshev.ru.md) · [HOSTING](../../docs/HOSTING.md) · [SSL redirect](./nginx/SSL_HTTP_REDIRECT_FIX.md) |

---

## 🎯 Вердикт

**Блок не на нашем Next/nginx.** С VPN чаще ломается **`egoshev.ru` / `www`** (DDoS-Guard → Tilda).  
**`eg.egoshev.ru` с VPS открывается без Cloudflare / без geo-deny / без fail2ban.**

> 💡 **Как открывать с VPN:** всегда `https://eg.egoshev.ru` (и `/anketaplan`, `/strategy` на этом же хосте). Не открывать apex без `eg.`.

---

## 🗺️ Карта хостов (факт с curl/DNS)

| Хост | A-запись | `Server` / стек | VPN-риск |
|---|---|---|---|
| `eg.egoshev.ru` | `5.42.96.101` (Timeweb TW-Cloud) | `nginx/1.28.3` → Next.js `:3000` (PM2) | Низкий — прямой VPS |
| `egoshev.ru` | `176.57.64.235` (Tilda Publishing) | `ddos-guard` → Tilda | **Высокий** — JS/challenge/фильтр exit-IP VPN |
| `www.egoshev.ru` | `176.57.64.235` | то же | **Высокий** |
| `bot.egoshev.ru` | (на момент проверки A пустой / не отвечает) | — | вне этой задачи |

Проверено:

- `curl -I https://eg.egoshev.ru/` → **200**, `Server: nginx`, `X-Powered-By: Next.js`
- `curl -I https://eg.egoshev.ru/anketaplan` · `/strategy` → **200**, nginx/Next
- `curl -I https://egoshev.ru/` · `www` · `/anketaplan` → **200**, `server: ddos-guard`, cookies `__ddg*`, заголовки `x-tilda-*`
- Cloudflare / CF-Ray на `eg.` — **нет**

---

## 🔎 Что проверено на VPS (`ssh egoshev-timeweb`)

| Проверка | Результат |
|---|---|
| Конфиг | `/etc/nginx/sites-available/egoshev.ru` → proxy на `127.0.0.1:3000` |
| `geo` / `deny` / `allow` / `limit_req` | **нет** (кроме комментариев в `default`) |
| GeoIP / ModSecurity / Naxsi | **не подключены** |
| fail2ban | **inactive** |
| UFW | **inactive**; INPUT policy **ACCEPT** |
| PM2 | `egoshev` **online** |
| Cloudflare / CDN перед Next | **нет** |

> ⚠️ Менять nginx «ради VPN» (открыть всё / выключить SSL) **не нужно и не делалось**: на стороне VPS блокировки VPN нет.

---

## 🧨 Корневая причина

1. Пользователь с VPN часто заходит на **`egoshev.ru`** (без `eg.`).
2. Apex резолвится в сеть **Tilda Publishing** и проходит через **DDoS-Guard**.
3. DDoS-Guard типично режет / челленджит датацентровые и VPN exit-IP → в браузере «не открывается», вечная проверка, таймаут, белый экран.
4. Параллельно cookies `__ddg*` ставятся с `Domain=.egoshev.ru` (родительский домен) — это шум от apex, не причина блокировки `eg.`, но усиливает путаницу при смешанных закладках.

**Это не правится с нашего Timeweb**, пока apex остаётся на Tilda+DDoS-Guard (денежный контур — см. канон домена).

---

## ✅ Что сделано

| Действие | Статус |
|---|---|
| Диагностика curl/DNS/whois | ✅ |
| Аудит nginx / fail2ban / iptables на VPS | ✅ |
| Правка geo-block / CDN на VPS | ❌ не требуется — блоков нет |
| Деплой nginx | ❌ не делался (нечего менять) |
| Документ с обходом | ✅ этот файл |

---

## 🧭 Как открывать с VPN (для клиента / себя)

1. В адресной строке явно: **`https://eg.egoshev.ru`**
2. Анкета / план: **`https://eg.egoshev.ru/anketaplan`**
3. Strategy: **`https://eg.egoshev.ru/strategy`**
4. Если не открылось — проверить, что URL **не** `egoshev.ru` и **не** `www.egoshev.ru`
5. DNS tip: `dig +short eg.egoshev.ru` должен дать **`5.42.96.101`**. Если видишь `176.57.*` — открыт не тот хост / кривой резолвер / hosts

Оплаты и Members по-прежнему на apex (`/testik`, `/baza`, …) — с «жёстким» VPN они могут не открыться; это ограничение Tilda/DDoS-Guard, не Next.

---

## 🛠️ Если понадобится чинить «до конца»

| Вариант | Суть | Риск |
|---|---|---|
| **Сейчас (рекомендуется)** | Продвигать только `eg.` для лица/анкеты/SEO | Нулевой |
| **A1 из канона** | 301 не-money путей apex → eg. | Средний, нужен HITL |
| **B из канона** | Apex → VPS, Tilda на отдельный хост | Высокий (оплаты/Members) |
| Выключить DDoS-Guard у Tilda | Только в кабинете Tilda/DNS, если доступен | Деньги + безопасность apex |

Без HITL DNS и money-URL **не трогаем**.

---

## 🧭 Навигация

[← Канон домена](./КАНОН_ДОМЕН_eg.egoshev.ru.md) · [HOSTING](../../docs/HOSTING.md) · [P01 README](./README.md)
