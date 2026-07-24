"""Load products from products.json (local) with helpers for bot MVP."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

PRODUCTS_FILE = Path(__file__).resolve().parent / "products.json"
_CACHE: dict[str, Any] | None = None


def load_products(*, force: bool = False) -> dict[str, Any]:
    global _CACHE
    if _CACHE is not None and not force:
        return _CACHE
    if not PRODUCTS_FILE.exists():
        _CACHE = {}
        return _CACHE
    try:
        data = json.loads(PRODUCTS_FILE.read_text(encoding="utf-8"))
        _CACHE = data if isinstance(data, dict) else {}
    except (json.JSONDecodeError, OSError):
        _CACHE = {}
    return _CACHE


def get_product(product_id: str) -> dict[str, Any] | None:
    products = load_products()
    item = products.get(product_id)
    return item if isinstance(item, dict) else None


def get_prodamus_url(product_id: str) -> str | None:
    p = get_product(product_id) or {}
    url = (p.get("prodamus_url") or p.get("tribute_url") or "")
    if not isinstance(url, str):
        return None
    url = url.strip()
    if not url or "ЗАМЕНИ" in url:
        return None
    return url


def get_tribute_web_url(product_id: str = "club") -> str | None:
    p = get_product(product_id) or {}
    url = (p.get("tribute_web_url") or "").strip()
    if not url or "ЗАМЕНИ" in url:
        return None
    return url


def get_test_levels() -> dict[str, Any]:
    data = load_products().get("test_levels")
    return data if isinstance(data, dict) else {}


def get_level_meta(level: int | str) -> dict[str, Any] | None:
    levels = get_test_levels()
    key = str(level)
    item = levels.get(key)
    return item if isinstance(item, dict) else None


def level_from_score(score: int) -> int:
    """Map test score (0..score_max) to level 1|2|3."""
    levels = get_test_levels()
    for n in (1, 2, 3):
        meta = levels.get(str(n)) or {}
        lo = int(meta.get("score_min", 0))
        hi = int(meta.get("score_max", 60))
        if lo <= score <= hi:
            return n
    if score <= 30:
        return 1
    if score <= 45:
        return 2
    return 3


def get_level_file(level: int | str) -> Path | None:
    meta = get_level_meta(level)
    if not meta:
        return None
    path = (meta.get("file") or "").strip()
    if not path:
        return None
    return resolve_local_file(path)


def get_invite_url(product_id: str) -> str | None:
    p = get_product(product_id) or {}
    url = (p.get("telegram_invite_url") or "").strip()
    if not url or "ЗАМЕНИ" in url:
        return None
    return url


def get_page_url(product_id: str) -> str | None:
    p = get_product(product_id) or {}
    url = (p.get("page_url") or "").strip()
    return url or None


def get_access_url(product_id: str) -> str | None:
    """Paid product delivery URL (e.g. Tilda Members test after payment)."""
    p = get_product(product_id) or {}
    url = (p.get("access_url") or "").strip()
    if not url or "ЗАМЕНИ" in url:
        return None
    return url


def get_lead_keyword() -> str:
    p = get_product("lead_telo") or {}
    return str(p.get("keyword") or "ТЕЛО").upper()


def get_lead_delivery() -> str | None:
    """HTTP URL, local file path, or Telegram file_id for the lead guide."""
    p = get_product("lead_telo") or {}
    for key in ("file_id_or_url", "file_url", "page_url"):
        val = (p.get(key) or "").strip()
        if not val or "ЗАМЕНИ" in val:
            continue
        return val
    return None


def resolve_local_file(path_or_url: str) -> Path | None:
    """If value is a local path (relative to bot dir), return Path when file exists."""
    if path_or_url.startswith("http://") or path_or_url.startswith("https://"):
        return None
    # Telegram file_id — alphanumeric-ish, no slashes typically for documents
    candidate = Path(path_or_url)
    if not candidate.is_absolute():
        candidate = Path(__file__).resolve().parent / path_or_url
    if candidate.is_file():
        return candidate
    return None
