"""Prodamus webhook / link signature (HMAC-SHA256).

Algorithm (official docs):
1. Coerce all values to strings (recursively)
2. Sort keys alphabetically at every nesting level
3. JSON-encode with compact separators
4. Escape `/` as `\\/` (PHP json_encode default)
5. HMAC-SHA256 hex digest with payment-page secret
"""
from __future__ import annotations

import hashlib
import hmac
import json
import re
from copy import deepcopy
from typing import Any
from urllib.parse import parse_qsl


def _as_strings(value: Any) -> Any:
    if isinstance(value, dict):
        return {str(k): _as_strings(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_as_strings(v) for v in value]
    if value is None:
        return ""
    return str(value)


def _sort_keys(value: Any) -> Any:
    if isinstance(value, dict):
        return {k: _sort_keys(value[k]) for k in sorted(value.keys(), key=str)}
    if isinstance(value, list):
        return [_sort_keys(v) for v in value]
    return value


def canonical_json(data: dict) -> str:
    prepared = _sort_keys(_as_strings(data))
    raw = json.dumps(prepared, ensure_ascii=False, separators=(",", ":"))
    # PHP json_encode escapes forward slashes by default.
    return raw.replace("/", "\\/")


def sign(data: dict, secret: str) -> str:
    if not secret:
        raise ValueError("secret is required")
    payload = canonical_json(data)
    return hmac.new(
        secret.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()


def verify(data: dict, secret: str, signature: str | None) -> bool:
    if not secret or not signature or not data:
        return False
    try:
        expected = sign(data, secret)
    except Exception:
        return False
    got = signature.strip().lower()
    if len(got) != len(expected):
        return False
    return hmac.compare_digest(expected, got)


def nest_php_style_form(flat: dict[str, Any]) -> dict:
    """Convert Flask/PHP-style keys like products[0][name] into nested dicts."""
    root: dict = {}
    for key, value in flat.items():
        m = re.fullmatch(r"([^\[]+)(\[.+\])?", str(key))
        if not m:
            root[str(key)] = value
            continue
        base = m.group(1)
        brackets = m.group(2) or ""
        indexes = [base] + re.findall(r"\[([^\]]*)\]", brackets)
        _assign_path(root, indexes, value)
    return root


def _assign_path(root: dict, indexes: list[str], value: Any) -> None:
    cur: Any = root
    for i, idx in enumerate(indexes):
        last = i == len(indexes) - 1
        is_list_idx = idx.isdigit()
        if last:
            if isinstance(cur, list):
                li = int(idx) if is_list_idx else 0
                while len(cur) <= li:
                    cur.append(None)
                cur[li] = value
            else:
                cur[idx] = value
            return

        nxt_is_list = indexes[i + 1].isdigit()
        if isinstance(cur, list):
            li = int(idx) if is_list_idx else 0
            while len(cur) <= li:
                cur.append([] if nxt_is_list else {})
            if cur[li] is None:
                cur[li] = [] if nxt_is_list else {}
            cur = cur[li]
        else:
            if idx not in cur or cur[idx] is None:
                cur[idx] = [] if nxt_is_list else {}
            cur = cur[idx]


def parse_form_body(body: str) -> dict:
    """Parse application/x-www-form-urlencoded into nested dict."""
    flat = dict(parse_qsl(body, keep_blank_values=True))
    return nest_php_style_form(flat)


def form_to_payload(form_dict: dict[str, Any]) -> dict:
    """Build nested payload from already-flat form mapping."""
    return nest_php_style_form(deepcopy(form_dict))
