"""
Webhook receiver for Prodamus payment notifications.

Prodamus sends POST (multipart/form-data) after successful payment.
Saves order to orders.json so the bot can give invite link on /access.

SECURITY (fail-closed):
- PRODAMUS_SECRET must be set for any order registration
- Header `Sign` must match HMAC-SHA256 of the payload
- Invalid/missing signature → 401/403, no invite path

Club (Tribute) is NOT a Prodamus product — do not map club here.

Run on VPS: gunicorn webhook_prodamus:app (see deploy/)
Prodamus URL: https://bot.egoshev.ru/webhook
"""
from __future__ import annotations

import json
import logging
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from flask import Flask, jsonify, make_response, request

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

from prodamus_signature import form_to_payload, verify as verify_prodamus_sign

app = Flask(__name__)
log = logging.getLogger("webhook_prodamus")
if not log.handlers:
    logging.basicConfig(level=logging.INFO)

BASE_DIR = Path(__file__).resolve().parent
ORDERS_FILE = BASE_DIR / "orders.json"
PRODUCTS_FILE = BASE_DIR / "products.json"

# Human titles if products.json missing a key (Prodamus contour only).
_FALLBACK_TITLES = {
    "body_test": "Онлайн-тест тела",
    "course_breath_posture": "Дыхание и осанка",
    "course_baza": "Базовая настройка тела",
}


def _prodamus_secret() -> str:
    return (os.getenv("PRODAMUS_SECRET") or "").strip()


def _admin_ids() -> list[str]:
    return [
        x.strip()
        for x in (os.getenv("ADMIN_TELEGRAM_IDS") or "").split(",")
        if x.strip()
    ]


def _bot_token() -> str:
    return (os.getenv("TELEGRAM_BOT_TOKEN") or "").strip()


@app.after_request
def add_cors_headers(response):
    """Prodamus cabinet often validates the URL from the browser (CORS)."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, HEAD, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Sign, Authorization"
    response.headers["Access-Control-Max-Age"] = "86400"
    return response


@app.route("/webhook", methods=["OPTIONS"])
@app.route("/health", methods=["OPTIONS"])
def cors_preflight():
    return make_response("", 204)


# Map Prodamus product name / price hint → product_id.
# Club / Tribute intentionally absent — club is paid via Tribute only.
PRODUCT_TO_COURSE = {
    "тест": "body_test",
    "теста": "body_test",
    "тест тела": "body_test",
    "body_test": "body_test",
    "684": "body_test",
    "дыхание и осанка": "course_breath_posture",
    "дыхание": "course_breath_posture",
    "1990": "course_breath_posture",
    "course_breath_posture": "course_breath_posture",
    "базовая настройка": "course_baza",
    "базовая": "course_baza",
    "курс": "course_baza",
    "9990": "course_baza",
    "course_baza": "course_baza",
    # legacy course funnel ids (old catalog)
    "осанка": "posture",
    "осанку": "posture",
    "таз": "pelvis",
    "таза": "pelvis",
    "колени": "knees",
    "стопы": "knees",
    "ходьба": "walk",
    "ходьбу": "walk",
    "всё вместе": "bundle",
    "все вместе": "bundle",
    "пакет": "bundle",
    "breath": "breath",
    "posture": "posture",
    "pelvis": "pelvis",
    "knees": "knees",
    "walk": "walk",
    "bundle": "bundle",
}


def normalize_product(name: str) -> str | None:
    if not name:
        return None
    n = name.lower().strip()
    for key, course_id in PRODUCT_TO_COURSE.items():
        if key in n:
            return course_id
    return None


def _load_product_titles() -> dict[str, str]:
    titles = dict(_FALLBACK_TITLES)
    if not PRODUCTS_FILE.exists():
        return titles
    try:
        data = json.loads(PRODUCTS_FILE.read_text(encoding="utf-8"))
    except Exception:
        return titles
    if not isinstance(data, dict):
        return titles
    for pid, item in data.items():
        if isinstance(item, dict) and item.get("title"):
            titles[str(pid)] = str(item["title"])
    return titles


def product_title_for(product_id: str | None, raw_product: str = "") -> str:
    titles = _load_product_titles()
    if product_id and product_id in titles:
        return titles[product_id]
    raw = (raw_product or "").strip()
    if raw:
        return raw[:120]
    if product_id:
        return product_id
    return "неизвестный продукт"


def load_orders() -> list:
    if not ORDERS_FILE.exists():
        return []
    try:
        return json.loads(ORDERS_FILE.read_text(encoding="utf-8"))
    except Exception:
        return []


def save_orders(orders: list) -> None:
    ORDERS_FILE.write_text(json.dumps(orders, ensure_ascii=False, indent=2), encoding="utf-8")


def _extract_sign_header() -> str:
    # Header names vary by proxy / client casing.
    return (
        request.headers.get("Sign")
        or request.headers.get("sign")
        or request.headers.get("X-Sign")
        or ""
    ).strip()


def _collect_payload() -> dict:
    if request.form:
        flat = request.form.to_dict(flat=True)
        return form_to_payload(flat)
    if request.is_json:
        data = request.get_json(silent=True) or {}
        return data if isinstance(data, dict) else {}
    # Fallback: raw urlencoded body
    raw = request.get_data(as_text=True) or ""
    if raw and "=" in raw:
        from prodamus_signature import parse_form_body

        return parse_form_body(raw)
    return {}


def _product_name_from_payload(data: dict) -> str:
    product_name = (
        data.get("product_name")
        or data.get("products")
        or data.get("product")
        or ""
    )
    if isinstance(product_name, list):
        names = []
        for item in product_name:
            if isinstance(item, dict):
                names.append(str(item.get("name") or item.get("Name") or ""))
            else:
                names.append(str(item))
        product_name = " ".join(n for n in names if n)
    elif isinstance(product_name, dict):
        product_name = str(product_name.get("name") or product_name.get("Name") or "")
    if not product_name:
        for k, v in data.items():
            if "product" in str(k).lower() and v:
                product_name = v
                break
    return str(product_name or "")


def _amount_from_payload(data: dict) -> str:
    for key in ("sum", "amount", "order_sum", "price", "cost", "Sum"):
        val = data.get(key)
        if val is not None and str(val).strip() != "":
            return str(val).strip()
    products = data.get("products")
    if isinstance(products, list):
        for item in products:
            if isinstance(item, dict):
                price = item.get("price") or item.get("sum") or item.get("amount")
                if price is not None and str(price).strip() != "":
                    return str(price).strip()
    return ""


def _currency_from_payload(data: dict) -> str:
    cur = data.get("currency") or data.get("Currency") or "RUB"
    return str(cur).strip() or "RUB"


def _notify_admins_payment(
    *,
    order_id: str,
    product_id: str | None,
    product_title: str,
    amount: str,
    currency: str,
    email: str,
    raw_product: str,
) -> None:
    """Best-effort admin alert. Never blocks order registration."""
    token = _bot_token()
    admins = _admin_ids()
    if not token or not admins:
        log.info("Skip admin notify: TELEGRAM_BOT_TOKEN or ADMIN_TELEGRAM_IDS not set")
        return

    amount_line = f"{amount} {currency}".strip() if amount else "сумма не передана"
    pid_line = product_id or "не определён"
    lines = [
        "💳 Оплата Prodamus",
        f"Продукт: {product_title}",
        f"Код: {pid_line}",
        f"Заказ: {order_id}",
        f"Сумма: {amount_line}",
    ]
    if email:
        lines.append(f"Email: {email}")
    if raw_product and raw_product != product_title:
        lines.append(f"Raw: {raw_product[:120]}")
    if not product_id:
        lines.append("⚠️ Маппинг продукта не сработал — доступ автоматически не выдать.")
    text = "\n".join(lines)

    for admin_id in admins:
        try:
            body = urllib.parse.urlencode(
                {"chat_id": admin_id, "text": text}
            ).encode("utf-8")
            req = urllib.request.Request(
                f"https://api.telegram.org/bot{token}/sendMessage",
                data=body,
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=8) as resp:
                if resp.status >= 400:
                    log.warning("Admin notify HTTP %s for %s", resp.status, admin_id)
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            log.warning("Admin notify failed for %s: %s", admin_id, exc)


@app.route("/webhook", methods=["GET", "HEAD", "POST"])
def webhook():
    # Prodamus validates the URL on save (often GET/HEAD or empty POST).
    if request.method in ("GET", "HEAD"):
        return jsonify({"status": "ok"}), 200

    data = _collect_payload()
    order_id = (
        data.get("order_id")
        or data.get("orderId")
        or data.get("id")
        or ""
    )
    order_id = str(order_id).strip()

    # Empty / probe POST during URL validation in Prodamus cabinet — no order write.
    if not order_id:
        return jsonify({"ok": True, "message": "ready"}), 200

    secret = _prodamus_secret()
    if not secret:
        log.error("PRODAMUS_SECRET is not configured — rejecting payment notification")
        return jsonify({"ok": False, "error": "webhook not configured"}), 503

    signature = _extract_sign_header()
    if not signature:
        log.warning("Prodamus webhook rejected: missing Sign header (order_id present)")
        return jsonify({"ok": False, "error": "signature required"}), 401

    if not verify_prodamus_sign(data, secret, signature):
        log.warning("Prodamus webhook rejected: invalid signature")
        return jsonify({"ok": False, "error": "signature invalid"}), 403

    email = (
        data.get("email")
        or data.get("customer_email")
        or data.get("client_email")
        or ""
    )
    product_name = _product_name_from_payload(data)
    product_id = normalize_product(product_name)
    amount = _amount_from_payload(data)
    currency = _currency_from_payload(data)
    product_title = product_title_for(product_id, product_name)

    payment_status = str(data.get("payment_status") or data.get("Payment_status") or "").lower()
    if payment_status and payment_status not in ("success", "ok", ""):
        # Do not issue access on canceled / denied callbacks.
        log.info("Prodamus webhook ignored non-success payment_status=%s", payment_status)
        return jsonify({"ok": True, "message": "ignored non-success status"}), 200

    orders = load_orders()
    if any(str(o.get("order_id")) == order_id for o in orders):
        return jsonify({"ok": True, "message": "already registered"}), 200

    if not product_id:
        log.warning("Prodamus webhook: unknown product mapping for order_id=%s", order_id)
        # Still record the signed order, but without a product → bot will not invent invite.
        product_id = None

    orders.append(
        {
            "order_id": order_id,
            "product_id": product_id,
            "product_title": product_title,
            "amount": amount,
            "currency": currency,
            "email": str(email)[:200] if email else "",
            "used": False,
            "raw_product": str(product_name)[:200],
        }
    )
    save_orders(orders)
    log.info(
        "Prodamus order registered order_id=%s product_id=%s amount=%s",
        order_id,
        product_id,
        amount or "-",
    )

    _notify_admins_payment(
        order_id=order_id,
        product_id=product_id,
        product_title=product_title,
        amount=amount,
        currency=currency,
        email=str(email)[:200] if email else "",
        raw_product=str(product_name)[:200],
    )

    return jsonify(
        {
            "ok": True,
            "order_id": order_id,
            "product_id": product_id,
            "product_title": product_title,
            "amount": amount,
        }
    ), 200


@app.route("/health", methods=["GET", "HEAD"])
def health():
    configured = bool(_prodamus_secret())
    return jsonify({"status": "ok", "prodamus_secret_configured": configured})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8765)
