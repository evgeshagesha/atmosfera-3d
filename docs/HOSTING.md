# HOSTING — главный сайт на Timeweb + Tilda для продуктов

> **Актуально 04.08.2026:** канон лица / SEO / блог = **`eg.egoshev.ru`** (Next на VPS).  
> Apex `egoshev.ru` пока = **DDoS-Guard + Tilda** (оплаты / Members) — не выключать.  
> Полный план cutover: [`КАНОН_ДОМЕН_eg.egoshev.ru.md`](../01_ПРОЕКТЫ/P01_сайт_и_сервер/КАНОН_ДОМЕН_eg.egoshev.ru.md).  
> Клуб: оплата **Tribute**. DNS не менять без явного «делай».

---

## Карта

| Адрес | Где | Роль |
|--------|-----|------|
| `eg.egoshev.ru` | Timeweb Next (VPS) | **Канон:** сайт, блог, RSS, Mini App, SEO |
| `egoshev.ru` / `www` | DDoS-Guard + **Tilda** | Оплаты, Members, product landing |
| `egoshev.ru/baza`, `/testik`… | **Tilda** | Критичные money-пути (см. план канона) |
| Tribute | Telegram | Подписка клуба Атмосфера 3D |
| `bot.egoshev.ru` | Timeweb | Бот + webhook (тест Prodamus) |

---

## Этапы переезда

1. Зеркало на `eg.egoshev.ru` (Tilda ещё жива)  
2. Файлы в Cursor `P01/.../site/` → правки  
3. Блог MVP (статьи + sitemap)  
4. DNS `egoshev.ru` → VPS  
5. Контент-машина: снял → черновик → approve → канал + блог (+ точечно клуб)

---

## Яндекс

После стабильных URL: Вебмастер + Метрика + sitemap.xml.  
«Одобрение» = индексация и качество, не одна кнопка.

См. [ROADMAP](./ROADMAP.md) · [P01](../01_ПРОЕКТЫ/P01_сайт_и_сервер/README.md)
