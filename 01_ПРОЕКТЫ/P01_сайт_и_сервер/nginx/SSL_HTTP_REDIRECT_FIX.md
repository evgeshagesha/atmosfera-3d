# SSL / «Не защищено» — eg.egoshev.ru

## Свойства

| | |
|--|--|
| Дата проверки | 2026-08-02 |
| Диагноз | HTTPS ОК, cert VALID; HTTP :80 отдаёт сайт **без** редиректа |
| Сертификат | Let's Encrypt · CN=`eg.egoshev.ru` · до 2026-10-22 |
| VPS | `5.42.96.101` · Host `egoshev-timeweb` |
| Конфиг | `/etc/nginx/sites-available/egoshev.ru` |

> Диагноз одной строкой: **замочек на https есть; Яндекс.Браузер ругается, потому что открыт http:// без редиректа 80→443.**

---

## Что НЕ чинить

- Certbot заново ставить не нужно (сертификат живой, `certbot.timer` есть).
- Next.js / `:3000` / секреты `.env` не трогать.
- Панель Timeweb SSL — не обязательна: LE уже на диске.

---

## Шаги 1-2-3 (SSH)

### 1) Бэкап и правка :80

```bash
ssh egoshev-timeweb
cp -a /etc/nginx/sites-available/egoshev.ru /etc/nginx/sites-available/egoshev.ru.bak.$(date +%Y%m%d%H%M%S)
nano /etc/nginx/sites-available/egoshev.ru
```

В **втором** `server { ... }` (`listen 80`) заменить весь proxy на:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name eg.egoshev.ru egoshev.ru www.egoshev.ru 5.42.96.101;
    return 301 https://$host$request_uri;
}
```

Блок `listen 443` **не менять**. Эталон: `egoshev.ru.conf.example` рядом.

### 2) Проверка синтаксиса и reload

```bash
nginx -t && systemctl reload nginx
```

### 3) Проверка «замочка»

С Mac:

```bash
curl -sI http://eg.egoshev.ru | head -5
# ожидаем: HTTP/1.1 301 … и Location: https://eg.egoshev.ru/
curl -sI https://eg.egoshev.ru | head -5
# ожидаем: HTTP/1.1 200
```

В браузере открыть именно **https://eg.egoshev.ru** — должен быть замочек, не «Не защищено».

---

## Сейчас (до фикса)

| URL | Результат |
|-----|-----------|
| `https://eg.egoshev.ru` | 200, TLS ok |
| `http://eg.egoshev.ru` | 200 без Location → браузер: «Не защищено» |

После фикса http должен отвечать **301 → https**.

---

## Опционально позже

- HSTS после стабильного редиректа (строка в example-конфиге).
- Расширить сертификат на `egoshev.ru` / `www`, когда DNS основного домена переедет на этот VPS:
  `certbot --nginx -d eg.egoshev.ru -d egoshev.ru -d www.egoshev.ru`
