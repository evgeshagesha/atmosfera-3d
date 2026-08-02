#!/usr/bin/env python3
"""Interactive secrets setter for Timeweb VPS.

Run ON the VPS (never paste secrets into chat/git):

    sudo python3 /opt/atmosfera-bot/scripts/set_timeweb_secrets.py

Updates only target keys:
  - /opt/atmosfera-bot/.env                 → PRODAMUS_SECRET
  - /var/www/egoshev.ru/.env.production.local → ADMIN_PASSWORD, ADMIN_SECRET

Does not print secret values. chmod 600 on both files.
"""

from __future__ import annotations

import getpass
import os
import re
import sys
import tempfile
from pathlib import Path

BOT_ENV = Path("/opt/atmosfera-bot/.env")
SITE_ENV = Path("/var/www/egoshev.ru/.env.production.local")
MIN_BOT_ENV_BYTES = 400  # safety: stop if .env looks truncated/corrupt


def _die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)


def _prompt_secret(label: str, *, allow_empty: bool = False) -> str:
    # Prefer getpass (no echo). Fall back to input if TTY quirks.
    try:
        value = getpass.getpass(f"{label}: ").strip()
    except Exception:
        value = input(f"{label} (visible): ").strip()
    if not value and not allow_empty:
        _die(f"{label} is empty — abort, nothing written")
    return value


def _upsert_env_line(text: str, key: str, value: str) -> str:
    """Replace KEY=... line or append. Preserves other lines and order."""
    pattern = re.compile(rf"^(?:export\s+)?{re.escape(key)}=", re.MULTILINE)
    line = f"{key}={value}"
    if pattern.search(text):
        return pattern.sub(lambda _m: line, text, count=1)
    body = text if text.endswith("\n") or text == "" else text + "\n"
    if body and not body.endswith("\n"):
        body += "\n"
    return body + line + "\n"


def _atomic_write(path: Path, content: str, mode: int = 0o600) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(
        dir=str(path.parent),
        prefix=f".{path.name}.",
        suffix=".tmp",
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            fh.write(content)
            fh.flush()
            os.fsync(fh.fileno())
        os.chmod(tmp_name, mode)
        os.replace(tmp_name, path)
        os.chmod(path, mode)
    except Exception:
        try:
            os.unlink(tmp_name)
        except OSError:
            pass
        raise


def _read_text(path: Path) -> str:
    if not path.is_file():
        return ""
    return path.read_text(encoding="utf-8")


def _key_is_set(text: str, key: str) -> bool:
    m = re.search(rf"^(?:export\s+)?{re.escape(key)}=(.*)$", text, re.MULTILINE)
    if not m:
        return False
    return bool(m.group(1).strip())


def main() -> None:
    if os.geteuid() != 0:
        print("Hint: run as root (sudo) so both bot and site env files are writable.")

    if not BOT_ENV.is_file():
        _die(f"missing {BOT_ENV} — refuse to create from scratch")

    bot_size = BOT_ENV.stat().st_size
    if bot_size < MIN_BOT_ENV_BYTES:
        _die(
            f"{BOT_ENV} looks truncated ({bot_size} bytes < {MIN_BOT_ENV_BYTES}). "
            "STOP — restore backup before writing secrets."
        )

    bot_before = _read_text(BOT_ENV)
    if not _key_is_set(bot_before, "TELEGRAM_BOT_TOKEN"):
        _die("TELEGRAM_BOT_TOKEN missing/empty in bot .env — STOP, file may be corrupt")

    print("=== Timeweb secrets (values are NOT echoed) ===")
    print(f"Bot env:  {BOT_ENV} ({bot_size} bytes)")
    print(f"Site env: {SITE_ENV}")
    print("")

    prodamus = _prompt_secret("PRODAMUS_SECRET")
    admin_password = _prompt_secret("ADMIN_PASSWORD")
    admin_secret = _prompt_secret("ADMIN_SECRET")

    # Bot: only PRODAMUS_SECRET
    bot_after = _upsert_env_line(bot_before, "PRODAMUS_SECRET", prodamus)
    if len(bot_after.encode("utf-8")) < bot_size:
        # Replacing empty PRODAMUS_SECRET= with a value should grow or stay similar;
        # shrinking below original size is suspicious only if we wiped content.
        # Allow small shrink if old value was longer — but never below safety floor.
        pass
    if len(bot_after.encode("utf-8")) < MIN_BOT_ENV_BYTES:
        _die("refusing write: resulting bot .env would be too small")

    _atomic_write(BOT_ENV, bot_after, 0o600)

    # Site: create or update ADMIN_*
    site_before = _read_text(SITE_ENV)
    site_after = site_before
    site_after = _upsert_env_line(site_after, "ADMIN_PASSWORD", admin_password)
    site_after = _upsert_env_line(site_after, "ADMIN_SECRET", admin_secret)
    _atomic_write(SITE_ENV, site_after, 0o600)

    # Verify presence without printing values
    bot_check = _read_text(BOT_ENV)
    site_check = _read_text(SITE_ENV)
    ok_bot = _key_is_set(bot_check, "PRODAMUS_SECRET") and _key_is_set(
        bot_check, "TELEGRAM_BOT_TOKEN"
    )
    ok_site = _key_is_set(site_check, "ADMIN_PASSWORD") and _key_is_set(
        site_check, "ADMIN_SECRET"
    )

    os.chmod(BOT_ENV, 0o600)
    os.chmod(SITE_ENV, 0o600)

    print("")
    print("OK")
    print(f"  bot .env bytes:  {BOT_ENV.stat().st_size}")
    print(f"  site env bytes:  {SITE_ENV.stat().st_size}")
    print(f"  PRODAMUS_SECRET: {'set' if ok_bot else 'FAIL'}")
    print(f"  ADMIN_PASSWORD:  {'set' if ok_site else 'FAIL'}")
    print(f"  ADMIN_SECRET:    {'set' if ok_site else 'FAIL'}")
    print("")
    print("Next (after this script succeeds):")
    print("  sudo systemctl restart eg-webhook-prodamus")
    print("  pm2 restart egoshev")
    if not (ok_bot and ok_site):
        _die("verification failed — check file permissions / paths")


if __name__ == "__main__":
    main()
