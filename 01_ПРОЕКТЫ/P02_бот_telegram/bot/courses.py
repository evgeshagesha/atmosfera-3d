"""Course links (Prodamus + Telegram invite) and paid orders."""
from __future__ import annotations

import json
from pathlib import Path

import config

COURSES_FILE = config.BASE_DIR / "courses_links.json"
ORDERS_FILE = config.BASE_DIR / "orders.json"

# Course id -> title for matching user messages
COURSE_ALIASES = {
    "breath": ["дыхание", "дыхания", "breath"],
    "posture": ["осанка", "осанку", "posture"],
    "pelvis": ["таз", "таза", "pelvis"],
    "knees": ["колени", "коленей", "стопы", "стоп", "knees"],
    "walk": ["ходьба", "ходьбу", "walk"],
    "bundle": ["всё вместе", "все вместе", "пакет", "bundle"],
}


def load_courses() -> dict:
    if not COURSES_FILE.exists():
        return {}
    try:
        return json.loads(COURSES_FILE.read_text(encoding="utf-8"))
    except Exception:
        return {}


def load_orders() -> list:
    if not ORDERS_FILE.exists():
        return []
    try:
        return json.loads(ORDERS_FILE.read_text(encoding="utf-8"))
    except Exception:
        return []


def save_orders(orders: list) -> None:
    ORDERS_FILE.write_text(json.dumps(orders, ensure_ascii=False, indent=2), encoding="utf-8")


def get_prodamus_link(course_id: str) -> str | None:
    courses = load_courses()
    c = courses.get(course_id, {})
    url = c.get("prodamus_url", "").strip()
    return url if url and not url.startswith("https://...") else None


def get_invite_link(course_id: str) -> str | None:
    courses = load_courses()
    c = courses.get(course_id, {})
    url = c.get("telegram_invite_url", "").strip()
    return url if url and not url.startswith("https://t.me/+...") else None


def get_catalog_url() -> str:
    """Ссылка на страницу «Все курсы» (сайт-каталог)."""
    courses = load_courses()
    url = (courses.get("catalog_url") or "").strip() if isinstance(courses.get("catalog_url"), str) else ""
    if not url or url.startswith("https://..."):
        return "https://course.egoshev.ru/#modules"
    return url


def find_course_in_text(text: str) -> str | None:
    """Return course_id if message is asking for a course link."""
    t = text.lower().strip()
    for course_id, aliases in COURSE_ALIASES.items():
        for a in aliases:
            if a in t and ("ссылка" in t or "купить" in t or "записаться" in t or "доступ" not in t):
                return course_id
    return None


def find_order(order_id: str) -> dict | None:
    """Return order dict (with product_id) if found and not yet used."""
    order_id = order_id.strip()
    for o in load_orders():
        if str(o.get("order_id")) == order_id and not o.get("used"):
            return o
    return None


def mark_order_used(order_id: str) -> None:
    orders = load_orders()
    for o in orders:
        if str(o.get("order_id")) == str(order_id):
            o["used"] = True
            break
    save_orders(orders)
