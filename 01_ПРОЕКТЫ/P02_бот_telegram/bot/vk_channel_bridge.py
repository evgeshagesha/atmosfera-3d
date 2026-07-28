"""Mirror supported Telegram channel posts to a VK community wall."""
from __future__ import annotations

import asyncio
import hashlib
import logging
import sqlite3
import tempfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import Sequence

import httpx
from telegram import Message, MessageEntity, Update
from telegram.ext import ContextTypes

logger = logging.getLogger(__name__)

MAX_VK_ATTACHMENTS = 10
MAX_VK_MESSAGE_LENGTH = 15_000


class VkApiError(RuntimeError):
    """VK API returned an error response."""


class VkDeliveryStore:
    """Persistent source-key ledger used to prevent duplicate VK posts."""

    def __init__(self, path: Path) -> None:
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self._connect() as connection:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS vk_deliveries (
                    source_key TEXT PRIMARY KEY,
                    vk_post_id INTEGER NOT NULL,
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

    def _connect(self) -> sqlite3.Connection:
        return sqlite3.connect(self.path, timeout=10)

    def contains(self, source_key: str) -> bool:
        with self._connect() as connection:
            row = connection.execute(
                "SELECT 1 FROM vk_deliveries WHERE source_key = ?",
                (source_key,),
            ).fetchone()
        return row is not None

    def record(self, source_key: str, vk_post_id: int) -> None:
        with self._connect() as connection:
            connection.execute(
                """
                INSERT OR IGNORE INTO vk_deliveries (source_key, vk_post_id)
                VALUES (?, ?)
                """,
                (source_key, vk_post_id),
            )


class VkWallClient:
    """Small VK API client for wall posts and wall-photo uploads."""

    def __init__(
        self,
        access_token: str,
        group_id: str,
        api_version: str = "5.199",
    ) -> None:
        self.access_token = access_token
        self.group_id = group_id.lstrip("-")
        self.api_version = api_version
        self.api_url = "https://api.vk.com/method"

    def _api_call(
        self,
        client: httpx.Client,
        method: str,
        params: dict[str, object],
    ) -> dict:
        payload = {
            **params,
            "access_token": self.access_token,
            "v": self.api_version,
        }
        response = client.post(f"{self.api_url}/{method}", data=payload)
        response.raise_for_status()
        data = response.json()
        if "error" in data:
            error = data["error"]
            raise VkApiError(
                f"{method}: VK error {error.get('error_code')}: "
                f"{error.get('error_msg')}"
            )
        return data["response"]

    def _upload_photo(self, client: httpx.Client, photo_path: Path) -> str:
        upload = self._api_call(
            client,
            "photos.getWallUploadServer",
            {"group_id": self.group_id},
        )
        with photo_path.open("rb") as photo:
            response = client.post(upload["upload_url"], files={"photo": photo})
        response.raise_for_status()
        uploaded = response.json()
        saved = self._api_call(
            client,
            "photos.saveWallPhoto",
            {
                "group_id": self.group_id,
                "photo": uploaded["photo"],
                "server": uploaded["server"],
                "hash": uploaded["hash"],
            },
        )
        item = saved[0]
        return f"photo{item['owner_id']}_{item['id']}"

    def publish(
        self,
        text: str,
        photo_paths: Sequence[Path],
        source_key: str,
    ) -> int:
        if not text and not photo_paths:
            raise ValueError("VK post must contain text or photos")
        if len(photo_paths) > MAX_VK_ATTACHMENTS:
            raise ValueError(f"VK accepts at most {MAX_VK_ATTACHMENTS} attachments")

        with httpx.Client(timeout=90) as client:
            attachments = [
                self._upload_photo(client, photo_path)
                for photo_path in photo_paths
            ]
            params: dict[str, object] = {
                "owner_id": f"-{self.group_id}",
                "from_group": 1,
                "message": text[:MAX_VK_MESSAGE_LENGTH],
                # VK deduplicates the same guid for one hour.
                "guid": hashlib.sha256(source_key.encode()).hexdigest(),
            }
            if attachments:
                params["attachments"] = ",".join(attachments)
            result = self._api_call(client, "wall.post", params)
        return int(result["post_id"])


def channel_matches(message: Message, configured_channel: str) -> bool:
    """Match CHANNEL_ID configured as @username or numeric Telegram chat id."""
    expected = configured_channel.strip()
    if not expected:
        return False
    if expected.startswith("@"):
        username = message.chat.username or ""
        return username.casefold() == expected[1:].casefold()
    return str(message.chat.id) == expected


def post_text(message: Message) -> str:
    """Preserve source text and append hidden Telegram text-link URLs."""
    text = message.text or message.caption or ""
    entities = message.entities if message.text is not None else message.caption_entities
    hidden_links: list[str] = []
    for entity in entities or ():
        if entity.type != MessageEntity.TEXT_LINK or not entity.url:
            continue
        if entity.url not in text and entity.url not in hidden_links:
            hidden_links.append(entity.url)
    if hidden_links:
        suffix = "\n".join(hidden_links)
        return f"{text}\n\n{suffix}" if text else suffix
    return text


def unsupported_reason(message: Message) -> str | None:
    """Return why this post is intentionally outside the MVP."""
    if message.forward_origin is not None:
        return "forwarded post"
    if message.poll is not None:
        return "poll"
    if message.video is not None:
        return "video"
    if message.animation is not None:
        return "animation"
    if message.video_note is not None:
        return "video note"
    if message.audio is not None or message.voice is not None:
        return "audio"
    if message.document is not None or message.sticker is not None:
        return "document or sticker"
    if (
        message.contact is not None
        or message.location is not None
        or message.venue is not None
        or message.dice is not None
        or message.game is not None
        or message.invoice is not None
    ):
        return "unsupported Telegram attachment"
    return None


@dataclass
class _Album:
    messages: dict[int, Message] = field(default_factory=dict)


class ChannelToVkBridge:
    """Collect channel updates, group albums and publish supported posts."""

    def __init__(
        self,
        *,
        channel_id: str,
        publisher: VkWallClient,
        store: VkDeliveryStore,
        album_settle_seconds: float = 3,
    ) -> None:
        self.channel_id = channel_id
        self.publisher = publisher
        self.store = store
        self.album_settle_seconds = album_settle_seconds
        self._albums: dict[tuple[int, str], _Album] = {}

    async def handle_update(
        self,
        update: Update,
        context: ContextTypes.DEFAULT_TYPE,
    ) -> None:
        message = update.channel_post
        if message is None or not channel_matches(message, self.channel_id):
            return

        if message.media_group_id:
            key = (message.chat.id, message.media_group_id)
            album = self._albums.setdefault(key, _Album())
            album.messages[message.message_id] = message
            job_name = f"vk-album:{message.chat.id}:{message.media_group_id}"
            for job in context.job_queue.get_jobs_by_name(job_name):
                job.schedule_removal()
            context.job_queue.run_once(
                self._flush_album,
                self.album_settle_seconds,
                data=key,
                name=job_name,
            )
            return

        await self._publish_messages([message])

    async def _flush_album(self, context: ContextTypes.DEFAULT_TYPE) -> None:
        key = context.job.data
        album = self._albums.pop(key, None)
        if album is None:
            return
        messages = [album.messages[mid] for mid in sorted(album.messages)]
        await self._publish_messages(messages)

    async def _publish_messages(self, messages: Sequence[Message]) -> None:
        if not messages:
            return
        source_key = (
            f"tg:{messages[0].chat.id}:"
            f"{messages[0].media_group_id or messages[0].message_id}"
        )
        if self.store.contains(source_key):
            logger.info("VK bridge duplicate skipped: %s", source_key)
            return

        for message in messages:
            reason = unsupported_reason(message)
            if reason:
                logger.warning(
                    "VK bridge skipped %s (%s, Telegram message %s)",
                    source_key,
                    reason,
                    message.message_id,
                )
                return

        photos = [message for message in messages if message.photo]
        if len(photos) != len(messages) and len(messages) > 1:
            logger.warning("VK bridge skipped mixed/unsupported album: %s", source_key)
            return

        text = ""
        for message in messages:
            text = post_text(message)
            if text:
                break
        if not text and not photos:
            logger.warning("VK bridge skipped empty post: %s", source_key)
            return

        try:
            with tempfile.TemporaryDirectory(prefix="eg-vk-bridge-") as temp_dir:
                paths: list[Path] = []
                for index, message in enumerate(photos):
                    telegram_file = await message.photo[-1].get_file()
                    path = Path(temp_dir) / f"{index:02d}.jpg"
                    await telegram_file.download_to_drive(path)
                    paths.append(path)
                vk_post_id = await asyncio.to_thread(
                    self.publisher.publish,
                    text,
                    paths,
                    source_key,
                )
            self.store.record(source_key, vk_post_id)
            logger.info(
                "VK bridge published %s as VK post %s",
                source_key,
                vk_post_id,
            )
        except Exception:
            logger.exception("VK bridge failed for %s", source_key)

