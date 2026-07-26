#!/usr/bin/env python3
"""
Публикация поста блога в Telegram (группа/канал) и VK.

Примеры:
  python publish_blog_social.py --slug trenirovki-dlya-zhenshchin-chto-deystvitelno-vazhno --dry-run
  python publish_blog_social.py --slug ... --telegram
  python publish_blog_social.py --slug ... --vk
  python publish_blog_social.py --slug ... --telegram --vk

Требует в .env:
  TELEGRAM_BOT_TOKEN
  COMMUNITY_CHAT_ID   # группа (или CHANNEL_ID для канала)
  VK_ACCESS_TOKEN     # ключ сообщества с правом wall
  VK_GROUP_ID         # id группы без минуса, например 123456789

По умолчанию: draft → печать текста. Реальная отправка только с флагами.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

import httpx

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

BASE_DIR = Path(__file__).resolve().parent
# blog.json: repo path or override
DEFAULT_BLOG_JSON = Path(
    os.getenv(
        "BLOG_JSON_PATH",
        str(
            BASE_DIR.parents[1]
            / "P01_сайт_и_сервер"
            / "site-next"
            / "data"
            / "blog.json"
        ),
    )
)
SITE_BLOG = os.getenv("SITE_BLOG_BASE", "https://eg.egoshev.ru/blog")
SITE_HOME = os.getenv("SITE_URL_PUBLIC", "https://eg.egoshev.ru")


def load_post(slug: str, blog_json: Path) -> dict:
    data = json.loads(blog_json.read_text(encoding="utf-8"))
    for post in data.get("posts", []):
        if post.get("slug") == slug or post.get("id") == slug:
            return post
    raise SystemExit(f"Post not found: {slug}")


def blocks_to_plain(blocks: list) -> str:
    lines: list[str] = []
    for block in blocks:
        t = block.get("type")
        if t == "heading":
            lines.append("")
            lines.append(str(block.get("value", "")).strip())
            lines.append("")
        elif t == "text":
            lines.append(str(block.get("value", "")).strip())
        elif t == "list":
            for i, item in enumerate(block.get("items") or [], 1):
                prefix = f"{i}." if block.get("ordered") else "–"
                lines.append(f"{prefix} {item}")
    return "\n".join(lines).strip()


def build_social_caption(post: dict, *, short: bool = False) -> str:
    title = post["title"]
    url = f"{SITE_BLOG}/{post['slug']}"
    if short:
        return (
            f"{title}\n\n"
            f"{post.get('excerpt', '').strip()}\n\n"
            f"Читать полностью:\n{url}\n\n"
            f"Сайт: {SITE_HOME}\n"
            f"#атмосфера3d #движение #тренировки #здоровье"
        )

    body = blocks_to_plain(post.get("content") or [])
    # Telegram soft limit ~4096
    max_body = 2800
    if len(body) > max_body:
        body = body[: max_body - 20].rstrip() + "…"

    return (
        f"{title}\n\n"
        f"{body}\n\n"
        f"———\n"
        f"🌐 Сайт: {SITE_HOME}\n"
        f"📖 Блог: {url}\n"
        f"#фитнес #тренировки #женскоездоровье #силовыетренировки #здоровье #зож"
    )


def resolve_cover_path(post: dict) -> Path | None:
    image = str(post.get("image") or "").strip()
    if not image:
        return None
    # local site-next public
    public = (
        BASE_DIR.parents[1]
        / "P01_сайт_и_сервер"
        / "site-next"
        / "public"
        / image.lstrip("/")
    )
    if public.is_file():
        return public
    return None


def send_telegram(text: str, photo: Path | None, chat_id: str, token: str) -> None:
    api = f"https://api.telegram.org/bot{token}"
    with httpx.Client(timeout=60) as client:
        if photo and photo.is_file():
            # caption limit 1024
            caption = text if len(text) <= 1024 else text[:1000].rstrip() + "…"
            with photo.open("rb") as f:
                r = client.post(
                    f"{api}/sendPhoto",
                    data={"chat_id": chat_id, "caption": caption},
                    files={"photo": f},
                )
            r.raise_for_status()
            data = r.json()
            if not data.get("ok"):
                raise RuntimeError(data)
            # if full text longer — send rest as message
            if len(text) > 1024:
                r2 = client.post(
                    f"{api}/sendMessage",
                    json={"chat_id": chat_id, "text": text[:4000]},
                )
                r2.raise_for_status()
        else:
            r = client.post(
                f"{api}/sendMessage",
                json={"chat_id": chat_id, "text": text[:4000]},
            )
            r.raise_for_status()
            data = r.json()
            if not data.get("ok"):
                raise RuntimeError(data)


def send_vk(text: str, photo: Path | None, group_id: str, token: str) -> None:
    """VK wall.post for community. group_id without minus."""
    api = "https://api.vk.com/method"
    version = "5.199"
    owner = f"-{group_id}"
    attachments = ""

    with httpx.Client(timeout=90) as client:
        if photo and photo.is_file():
            # 1) get upload server
            r = client.get(
                f"{api}/photos.getWallUploadServer",
                params={
                    "group_id": group_id,
                    "access_token": token,
                    "v": version,
                },
            )
            r.raise_for_status()
            up = r.json()
            if "error" in up:
                raise RuntimeError(up["error"])
            upload_url = up["response"]["upload_url"]

            with photo.open("rb") as f:
                upl = client.post(upload_url, files={"photo": f})
            upl.raise_for_status()
            uploaded = upl.json()

            saved = client.get(
                f"{api}/photos.saveWallPhoto",
                params={
                    "group_id": group_id,
                    "photo": uploaded["photo"],
                    "server": uploaded["server"],
                    "hash": uploaded["hash"],
                    "access_token": token,
                    "v": version,
                },
            )
            saved.raise_for_status()
            sdata = saved.json()
            if "error" in sdata:
                raise RuntimeError(sdata["error"])
            ph = sdata["response"][0]
            attachments = f"photo{ph['owner_id']}_{ph['id']}"

        params = {
            "owner_id": owner,
            "from_group": 1,
            "message": text[:15000],
            "access_token": token,
            "v": version,
        }
        if attachments:
            params["attachments"] = attachments
        post = client.post(f"{api}/wall.post", data=params)
        post.raise_for_status()
        pdata = post.json()
        if "error" in pdata:
            raise RuntimeError(pdata["error"])
        print("VK post_id:", pdata["response"].get("post_id"))


def main() -> None:
    parser = argparse.ArgumentParser(description="Publish blog post to TG/VK")
    parser.add_argument("--slug", required=True)
    parser.add_argument("--blog-json", type=Path, default=DEFAULT_BLOG_JSON)
    parser.add_argument("--telegram", action="store_true")
    parser.add_argument("--vk", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--short", action="store_true", help="Короткий caption + ссылка")
    parser.add_argument(
        "--chat-id",
        default=os.getenv("COMMUNITY_CHAT_ID") or os.getenv("CHANNEL_ID", ""),
        help="Telegram chat id (группа/канал)",
    )
    args = parser.parse_args()

    post = load_post(args.slug, args.blog_json)
    caption = build_social_caption(post, short=args.short)
    photo = resolve_cover_path(post)

    print("=== DRAFT ===")
    print(caption)
    print("=== COVER ===", photo)
    print("=== URL ===", f"{SITE_BLOG}/{post['slug']}")

    if args.dry_run or (not args.telegram and not args.vk):
        print("\nDry-run / no --telegram/--vk — ничего не отправлено.")
        return

    if args.telegram:
        token = os.getenv("TELEGRAM_BOT_TOKEN", "")
        if not token or not args.chat_id:
            raise SystemExit("Need TELEGRAM_BOT_TOKEN and COMMUNITY_CHAT_ID/CHANNEL_ID")
        send_telegram(caption if args.short else caption[:4000], photo, args.chat_id, token)
        print("Telegram: OK →", args.chat_id)

    if args.vk:
        token = os.getenv("VK_ACCESS_TOKEN", "")
        group_id = os.getenv("VK_GROUP_ID", "")
        if not token or not group_id:
            raise SystemExit("Need VK_ACCESS_TOKEN and VK_GROUP_ID in .env")
        send_vk(caption if args.short else caption[:15000], photo, group_id, token)
        print("VK: OK → group", group_id)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001
        print("ERROR:", exc, file=sys.stderr)
        sys.exit(1)
