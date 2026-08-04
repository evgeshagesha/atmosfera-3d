# 🌐 Канон домена — eg.egoshev.ru

> Безопасный план: сделать `eg.egoshev.ru` основным лицом бренда, **не ломая** Tilda-оплаты / Members / Prodamus.  
> DNS и Tilda **не менять**, пока Евгений явно не скажет «делай».

---

## 📋 Свойства

| | |
|---|---|
| **Статус** | 🟡 План (не применён) |
| **Дата** | 2026-08-04 |
| **Канон (лицо / SEO / блог)** | `https://eg.egoshev.ru` |
| **Apex сейчас** | `egoshev.ru` / `www` → DDoS-Guard + **Tilda** |
| **VPS Next** | Timeweb `5.42.96.101`, nginx, PM2 `egoshev` |
| **Связанные** | [HOSTING](../../docs/HOSTING.md) · [products.yaml](../../03_РЕСУРСЫ/config/products.yaml) · [Яндекс чеклист](./ЯНДЕКС_КАРТЫ_И_ВЕБМАСТЕР_ЧЕКЛИСТ.md) · [Журнал решений](../../00_ПУЛЬТ_УПРАВЛЕНИЯ/ЖУРНАЛ_РЕШЕНИЙ.md) |

---

## 🎯 Вердикт

**«Убрать egoshev.ru» прямо сейчас — нельзя.**

Правильная формулировка цели:

| Хотим | Не хотим |
|---|---|
| Канон бренда / SEO / блог / WebApp = **`eg.egoshev.ru`** | Молча сломать оплаты, Members, return URL |
| Apex либо **редиректит** на eg., либо **держит только money-пути Tilda** | «Просто выключить» Tilda на apex |
| Позже — полный cutover apex → VPS (вариант B) | Менять DNS без HITL и чеклиста |

> 💡 **Суть:** `egoshev.ru` пока — **денежный контур Tilda**. `eg.egoshev.ru` — **лицо и SEO**. Слияние доменов = отдельный cutover, не «удалить сайт».

---

## 🗺️ Карта ролей (as-is)

| Хост | Где | Роль |
|---|---|---|
| `eg.egoshev.ru` | Next.js на VPS | Главный сайт, блог, RSS, Mini App, money-SEO (`/personalnye-trenirovki-moskva`, `/mfr-massazh-moskva`, `/funkcionalnye-trenirovki-moskva`, `/mobilnost`, `/osanka`), `/club` витрина |
| `egoshev.ru` / `www` | DDoS-Guard + Tilda | Оплаты, Members, лендинги продуктов |
| `bot.egoshev.ru` | VPS | Бот + Prodamus webhook |
| Tribute | Telegram | Клуб (не Tilda) |

---

## 🔒 Критичные URL на Tilda (не трогать без HITL)

| URL | Продукт | Деньги / доступ |
|---|---|---|
| `https://egoshev.ru/testik` | Тест 684 ₽ | Prodamus payform → доступ `/testresult` |
| `https://egoshev.ru/testresult` (+ legacy slug) | Доступ после теста | Return / access |
| `https://egoshev.ru/baza` | Курс 9990 | Tilda Members + Kinescope |
| `https://egoshev.ru/dyhanieosanka` | Мини 1990 | Tilda Members |
| `https://egoshev.ru/gaid` | Лид-гайд | Бесплатный вход |
| `https://egoshev.ru/anketa` · `/anketaplan` | Запись / план | Формы заявок |
| `https://egoshev.ru/club` | Клуб (витрина Tilda) | Оплата = Tribute; витрина может дублировать eg. |
| `https://egoshev.ru/level1`…`/level3` | Гайды после теста | Контент Tilda |

**Payments HITL (зафиксировано ранее):**

| Продукт | Провайдер | До cutover |
|---|---|---|
| Клуб | Tribute | не через Tilda pay |
| Тест 684 | Prodamus → bot | страница на Tilda |
| Курс 9990 | Tilda until own app | Members на `/baza` |
| Мини 1990 | Tilda | Members |

---

## 🔎 Инвентарь зависимостей от apex (`egoshev.ru` без `eg.`)

### Код сайта (Next) — осознанные ссылки на Tilda

| Место | Что |
|---|---|
| `FormatsSection.tsx` | `/testik`, `/dyhanieosanka`, `/baza`, `/anketaplan` → apex |
| `MiniAppClient.tsx` | те же money-URL → apex; клуб/home → eg. |
| `lib/ecosystem/config.ts` | testik / baza / anketaplan → apex |
| `lib/legal/operator.ts` | оба домена + product URLs на apex |
| `data/blog.json` | CTA на `/testik`, `/baza`, `/dyhanieosanka` |
| `metadataBase` / sitemap / robots / JsonLd | уже **`eg.egoshev.ru`** ✅ |

> ⚠️ Менять эти money-ссылки на eg. **без** живых страниц на Next = битые оплаты.

### Конфиг и бот

| Место | Что |
|---|---|
| `03_РЕСУРСЫ/config/products.yaml` | `site: https://egoshev.ru`; все `page_url` продуктов на apex; `site_test: eg.` |
| `P02/.../bot/products.json` | зеркало yaml (тест/курс/анкета на apex; club → eg.) |
| `handlers_products.py`, `followups.py`, `config.py` | fallback URL на apex |
| `webhook_prodamus.py` | notify на `bot.egoshev.ru` (не apex) |
| Prodamus return | success → `egoshev.ru/testresult` (Tilda) |

### Документы / CTA / контент

| Контур | Правило сейчас |
|---|---|
| YouTube / публичный CTA | **apex** (`/testik`, `/anketa`) — запрет `eg.` в описаниях YT |
| Instagram bio | часто `/testik` на apex |
| Блог / Дзен / RSS | `eg.egoshev.ru` |
| NAP / Я.Бизнес / Вебмастер | сайт = `eg.egoshev.ru` |
| `docs/HOSTING.md` | устарел: пишет eg. как «тест до DNS» — **канон теперь eg.**, cutover apex = фаза 2 |

### SEO / robots / canonical

| Артефакт | Статус |
|---|---|
| `NEXT_PUBLIC_SITE_URL` / default | `https://eg.egoshev.ru` |
| Sitemap | eg. ✅ |
| Canonical в layout/money pages | eg. ✅ |
| JsonLd rewrite apex→eg | есть ✅ |
| Apex/Tilda canonical | контролируется Tilda (вне репо) |

---

## 🛤️ Варианты миграции

### A — рекомендуемый MVP (без «убить Tilda»)

**Идея:** лицо бренда = `eg.egoshev.ru`. Apex/www **не выключаем**, а либо:

1. **A1 (мягкий):** маркетинговые пути (`/`, `/about`, `/blog`…) → 301 на eg.; **исключения** — список Tilda money-путей выше остаются на Tilda.  
2. **A2 (ещё мягче, сейчас по факту):** DNS не трогаем; везде в SEO/NAP/WebApp продвигаем eg.; apex остаётся только для денег и старых закладок.

| Плюсы | Минусы |
|---|---|
| Оплаты живы | Два хоста в индексации дольше |
| VPN/DDoS-Guard проблемы apex не бьют SEO-лицо | Нужен явный allowlist исключений при 301 |
| Можно сделать поэтапно | YouTube CTA пока на apex (осознанно) |

**Когда включать 301 (A1):** только после HITL + проверки каждого money-URL вручную.

**Технически (когда скажут «делай»):** DNS/хостинг DDoS-Guard или nginx-прокси с исключением путей — **не** в этом документе применять.

---

### B — полная смена (apex → VPS Next)

**Идея:** `egoshev.ru` указывает на тот же Next, что eg. Tilda — только на поддомене / отдельном хосте (`pay.egoshev.ru` / `members.…` / оставить страницы на tilda.ws до переноса).

| Плюсы | Минусы |
|---|---|
| Один канон для SEO и бренда | Высокий риск: Members, cookie, Prodamus return, формы |
| Можно убрать DDoS-Guard с apex | Нужен перенос или reverse-proxy Tilda-путей |
| Чистый NAP | Долгий cutover + откат-план |

**Предусловия B:**

1. Все money-страницы либо на Next, либо на отдельном хосте с рабочими оплатами.  
2. Prodamus success/fail URL обновлены.  
3. Members / доступы курса проверены end-to-end.  
4. Webmaster: смена главного зеркала / склейка.  
5. Откат DNS ≤ 15 мин.

> ⚠️ Вариант B = отдельный проект, не «сегодня вечером».

---

## 💥 Что сломается, если «просто убрать» Tilda / apex

1. **Оплата теста 684** — нет `/testik` + return на `/testresult`.  
2. **Курс 9990** — нет Members / контента на `/baza`.  
3. **Мини 1990** — нет `/dyhanieosanka`.  
4. **Заявки** — формы `/anketa`, `/anketaplan`.  
5. **Все CTA** в боте, yaml, YouTube, Instagram, блоге → 404.  
6. **Исторический SEO** apex (пока есть) — массовые 404 без 301.  
7. **DDoS-Guard cut** без замены = даунтайм закладок клиентов.

---

## ✅ Что уже можно / нужно делать без DNS

- [x] Канон SEO на Next = `eg.egoshev.ru` (metadataBase, sitemap, robots, JsonLd)  
- [x] NAP / чеклист Яндекс → сайт `eg.egoshev.ru`  
- [ ] Регион Вебмастер = Москва (HITL, если UI пустой)  
- [ ] Я.Бизнес: карточка под аккаунтом, где карта `CTu240~o`  
- [ ] Документы: обновить `HOSTING.md` после утверждения этого плана  
- [ ] После HITL: точечный allowlist 301 (вариант A1)  
- [ ] **Не** менять `products.yaml` page_url money → eg. без живых страниц  

**Safe code (низкий риск):** только внутренние ссылки на страницы, которые **уже живут на eg.** (блог, money-SEO, club-витрина Next). Платёжные Tilda URL — только с явным HITL.

---

## ❓ HITL — максимум 3 вопроса Евгению

1. **Стратегия домена:** утверждаем **канон = `eg.egoshev.ru`** и apex пока только под Tilda-деньги (вариант **A2 сейчас → A1 позже**), или цель сразу **B** (apex на VPS)?  
2. **Список «священных» Tilda-путей:** подтверждаешь таблицу выше (`/testik`, `/baza`, `/dyhanieosanka`, `/gaid`, `/anketa`, `/anketaplan`, `/testresult`, levels) — ничего не редиректить, пока Members/оплаты там?  
3. **Я.Бизнес:** в каком Яндекс-аккаунте карточка / карта `yandex.ru/maps/-/CTu240~o`? (в сессии агента карточки нет — без аккаунта организацию не создаём.)

---

## 📅 Порядок внедрения (когда скажут «делай»)

| Шаг | Действие | Риск |
|---|---|---|
| 0 | Ответы на 3 HITL | — |
| 1 | Чеклист money-URL: открыть каждый, оплата/Members smoke | низкий |
| 2 | A1: 301 только не-money путей apex → eg. | средний |
| 3 | Webmaster: зеркало / переобход | низкий |
| 4 | Обновить yaml/docs CTA для **не**-платёжных страниц | низкий |
| 5 | (Опционально) B: вынести Tilda на subhost → apex на VPS | высокий |

---

## 🧭 Навигация

[← P01 README](./README.md) · [Яндекс чеклист](./ЯНДЕКС_КАРТЫ_И_ВЕБМАСТЕР_ЧЕКЛИСТ.md) · [HOSTING](../../docs/HOSTING.md) · [Главный контекст](../../00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md)
