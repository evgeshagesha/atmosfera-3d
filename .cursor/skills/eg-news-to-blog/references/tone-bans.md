# Tone bans — eg-news-to-blog

## Медицина / бренд

**Запрещено:** вылечим · исцеление · избавим навсегда · диагноз как ярлык · секретный/революционный метод · тело мечты · гарантия медрезультата · «доказано лечит» · panic/fear hooks

**Разрешено:** функция · качество движения · регуляция · настройка системы · гипотеза · путь · практика · прогрессия · evidence-informed (без медclaims)

## Редакция / голос

- **Author voice rewrite ban:** не переписывать авторский текст EG «красивее» / «экспертнее»; только структура, пунктуация, OCR; факты → `evidence_gap`.  
- **Verbatim ban (external):** нет full-text репаблиша; только rewrite + cite.  
- Нет выдуманных цифр / цитат вне `claim_source_map` / `key_facts` / `quotes[]`.

## Social / визуальный шум

- **Finger emoji ban:** 👆 и подобные «тыкай сюда» — запрещены в draft и social.  
- **Hashtag noise ban:** ленты `#fit` / `#москва` и т.п. — убирать; не тащить в блог/social.  
- **Social multi-CTA ban:** в `social_preview` ровно **один** CTA; не каталог ссылок.

## Pipeline

- FAQ/блог ≠ диагноз и ≠ план лечения.  
- CTA soft: без «срочно купи», без ложного дефицита.  
- `status: refuse_medical` / `blocked_evidence` / `needs_source` — STOP, не Gate.  
- Полный бренд-список: `.cursor/rules/atmosfera-3d.mdc` + `eg-news-brand-safety`.

**Формула:** что происходит → почему → что делать → результат  
**Тон:** спокойный премиум; не инфобиз, не кричащий фитнес.
