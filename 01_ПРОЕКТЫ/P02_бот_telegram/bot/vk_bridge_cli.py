#!/usr/bin/env python3
"""HITL CLI for Telegram→VK bridge: check token, dry-run, one test wall.post.

Does NOT enable live channel mirroring. Live mirror = VK_BRIDGE_ENABLED=1 in bot.

Usage (on VPS /opt/atmosfera-bot):
  ./venv/bin/python vk_bridge_cli.py --check
  ./venv/bin/python vk_bridge_cli.py --dry-run --text "черновик"
  ./venv/bin/python vk_bridge_cli.py --test-post --confirm
"""
from __future__ import annotations

import argparse
import hashlib
import os
import sys
from datetime import datetime, timezone

import httpx
from dotenv import load_dotenv

from vk_channel_bridge import VkApiError, VkBridgeFeatures, VkWallClient

load_dotenv()

DEFAULT_TEST_TEXT = (
    "⚙️ ТЕСТ моста Telegram→VK (Atmosfera 3D). "
    "Это служебная проверка, не контент канала. Можно удалить."
)


def _env(name: str, default: str = "") -> str:
    return (os.getenv(name) or default).strip()


def _flag(name: str) -> bool:
    return _env(name, "0") == "1"


def build_client() -> VkWallClient:
    token = _env("VK_ACCESS_TOKEN")
    group_id = _env("VK_GROUP_ID")
    if not token:
        raise SystemExit("VK_ACCESS_TOKEN missing in .env (do not paste token in chat)")
    if not group_id:
        raise SystemExit("VK_GROUP_ID missing in .env")
    features = VkBridgeFeatures(
        video=_flag("VK_BRIDGE_VIDEO"),
        clips=_flag("VK_BRIDGE_CLIPS"),
        stories=_flag("VK_BRIDGE_STORIES"),
        coauthor_user_id=_env("VK_COAUTHOR_USER_ID"),
        coauthor_screen_name=_env("VK_COAUTHOR_SCREEN_NAME"),
        coauthor_label=_env("VK_COAUTHOR_LABEL", "Евгений Гошев"),
    )
    return VkWallClient(
        access_token=token,
        group_id=group_id,
        api_version=_env("VK_API_VERSION", "5.199"),
        user_access_token=_env("VK_USER_ACCESS_TOKEN"),
        features=features,
    )


def api_get(
    client: VkWallClient,
    method: str,
    *,
    token: str | None = None,
    **params: object,
) -> dict:
    with httpx.Client(timeout=30) as http:
        return client._api_call(http, method, params, token=token)


def cmd_check(client: VkWallClient) -> int:
    group_id = client.group_id
    info = api_get(client, "groups.getById", group_id=group_id)
    # API 5.199 may return list or {groups: [...]}
    if isinstance(info, dict) and "groups" in info:
        groups = info["groups"]
    else:
        groups = info
    group = groups[0] if groups else {}
    name = group.get("name", "?")
    screen = group.get("screen_name", "")
    print("OK token talks to VK API")
    print(f"  group_id: {group_id}")
    print(f"  name: {name}")
    print(f"  url: https://vk.ru/{screen or f'club{group_id}'}")
    print(f"  CHANNEL_ID (TG source): {_env('CHANNEL_ID') or '(empty)'}")
    print(f"  VK_BRIDGE_ENABLED: {_env('VK_BRIDGE_ENABLED', '0')}")
    print(f"  VK_BRIDGE_VIDEO: {_env('VK_BRIDGE_VIDEO', '0')}")
    print(f"  VK_BRIDGE_CLIPS: {_env('VK_BRIDGE_CLIPS', '0')}")
    print(f"  VK_BRIDGE_STORIES: {_env('VK_BRIDGE_STORIES', '0')}")
    co_uid = _env("VK_COAUTHOR_USER_ID")
    co_sn = _env("VK_COAUTHOR_SCREEN_NAME")
    print(f"  coauthor: {co_sn or co_uid or '(off)'}")
    print(f"  VK_USER_ACCESS_TOKEN set: {bool(_env('VK_USER_ACCESS_TOKEN'))}")
    # Probe wall scope without posting
    try:
        api_get(client, "wall.get", owner_id=f"-{group_id}", count=1)
        print("  wall.get: OK (wall scope likely present)")
    except VkApiError as exc:
        print(f"  wall.get: FAIL — {exc}")
        # Community tokens often fail wall.get with 27 but still can wall.post
        print("  → community token may still wall.post; continue probes")
    # Probe photos upload server (community token may fail with 27)
    try:
        api_get(client, "photos.getWallUploadServer", group_id=group_id)
        print("  photos.getWallUploadServer: OK (photos scope OK)")
    except VkApiError as exc:
        print(f"  photos.getWallUploadServer: WARN — {exc}")
        print("  → text-only posts may work; photos need user admin token (wall+photos)")

    media_token = client._token_for_media()
    try:
        api_get(
            client,
            "video.save",
            token=media_token,
            name="probe_delete_me",
            group_id=group_id,
            is_private=1,
            wallpost=0,
        )
        print("  video.save: OK (wall VIDEO path possible)")
    except VkApiError as exc:
        print(f"  video.save: FAIL — {exc}")
        print("  → VK_BRIDGE_VIDEO needs user token with video scope")

    try:
        api_get(
            client,
            "shortVideo.create",
            token=media_token,
            group_id=group_id,
            file_size=1024,
        )
        print("  shortVideo.create: OK (CLIPS path possible)")
    except VkApiError as exc:
        print(f"  shortVideo.create: FAIL — {exc}")
        print("  → VK_BRIDGE_CLIPS needs user token (community → error 27)")

    try:
        api_get(
            client,
            "stories.getVideoUploadServer",
            group_id=group_id,
            add_to_news=1,
        )
        print("  stories.getVideoUploadServer: OK (STORIES path possible)")
    except VkApiError as exc:
        print(f"  stories.getVideoUploadServer: FAIL — {exc}")
        print("  → enable stories scope on community token")
    return 0


def cmd_dry_run(text: str, client: VkWallClient) -> int:
    print("DRY-RUN (nothing published)")
    print(f"  owner_id: -{client.group_id}")
    print(f"  from_group: 1")
    formatted = client.format_message(text)
    print(f"  message ({len(formatted)} chars):")
    print("---")
    print(formatted)
    print("---")
    return cmd_check(client)


def cmd_test_post(text: str, client: VkWallClient, *, confirm: bool) -> int:
    if not confirm:
        raise SystemExit("Refusing to post without --confirm (HITL gate)")
    source_key = f"cli-test:{datetime.now(timezone.utc).isoformat()}"
    guid = hashlib.sha256(source_key.encode()).hexdigest()
    print(f"Publishing one TEST post (guid={guid[:12]}…)")
    post_id = client.publish(text=text, photo_paths=[], source_key=source_key)
    url = f"https://vk.ru/wall-{client.group_id}_{post_id}"
    print(f"OK published: {url}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="VK bridge HITL CLI")
    parser.add_argument("--check", action="store_true", help="Validate token + scopes")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print draft + check token (no wall.post)",
    )
    parser.add_argument(
        "--test-post",
        action="store_true",
        help="Publish one short TEST post (requires --confirm)",
    )
    parser.add_argument(
        "--confirm",
        action="store_true",
        help="Required together with --test-post",
    )
    parser.add_argument("--text", default="", help="Custom message for dry-run/test")
    args = parser.parse_args()

    if not (args.check or args.dry_run or args.test_post):
        parser.print_help()
        return 2

    client = build_client()
    text = (args.text or DEFAULT_TEST_TEXT).strip()

    if args.dry_run:
        return cmd_dry_run(text, client)
    if args.test_post:
        return cmd_test_post(text, client, confirm=args.confirm)
    return cmd_check(client)


if __name__ == "__main__":
    sys.exit(main())
