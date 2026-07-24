"""
Minimal webhook receiver for Prodamus payment notifications.
Prodamus sends POST (multipart/form-data) after successful payment.
Saves order to orders.json so the bot can give invite link on /access.

Run on VPS: uvicorn webhook_prodamus:app --host 0.0.0.0 --port 8765
Then in Prodamus set URL for notifications: https://your-domain.com:8765/webhook
(Or put behind nginx and use port 80/443.)
"""
import json
import re
from pathlib import Path

from flask import Flask, request, jsonify

app = Flask(__name__)
ORDERS_FILE = Path(__file__).resolve().parent / "orders.json"

# Map Prodamus product name or id to our product_id
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
    "клуб": "club",
    "club": "club",
    "1680": "club",
    # legacy course funnel ids
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


def load_orders() -> list:
    if not ORDERS_FILE.exists():
        return []
    try:
        return json.loads(ORDERS_FILE.read_text(encoding="utf-8"))
    except Exception:
        return []


def save_orders(orders: list) -> None:
    ORDERS_FILE.write_text(json.dumps(orders, ensure_ascii=False, indent=2), encoding="utf-8")


@app.route("/webhook", methods=["POST"])
def webhook():
    # Prodamus may send multipart/form-data or application/x-www-form-urlencoded
    data = request.form.to_dict() if request.form else {}
    if not data and request.is_json:
        data = request.get_json() or {}

    order_id = data.get("order_id") or data.get("orderId") or data.get("id") or ""
    email = data.get("email") or data.get("customer_email") or data.get("client_email") or ""
    product_name = data.get("product_name") or data.get("products") or data.get("product") or ""
    # Sometimes products come as products[] or product_names[]
    if not product_name and "products[]" in data:
        product_name = data.get("products[]")
    if not product_name:
        for k, v in data.items():
            if "product" in k.lower() and v:
                product_name = v
                break

    product_id = normalize_product(str(product_name))

    if not order_id:
        return jsonify({"ok": False, "error": "no order_id"}), 400

    orders = load_orders()
    if any(str(o.get("order_id")) == str(order_id) for o in orders):
        return jsonify({"ok": True, "message": "already registered"}), 200

    orders.append({
        "order_id": order_id,
        "product_id": product_id or "body_test",
        "email": email,
        "used": False,
        "raw_product": str(product_name)[:200],
    })
    save_orders(orders)

    return jsonify({"ok": True, "order_id": order_id, "product_id": product_id}), 200


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8765)
