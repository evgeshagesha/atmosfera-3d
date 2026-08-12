"""Lightweight funnel analytics: structured logs only. No new vendor stack."""
from __future__ import annotations

import logging
from typing import Any

logger = logging.getLogger("bot.analytics")


def track(event: str, **payload: Any) -> None:
    extra = " ".join(f"{k}={v}" for k, v in payload.items() if v is not None)
    logger.info("event=%s %s", event, extra)
