"""Mirror supported Telegram channel posts to a VK community wall / stories / clips."""
from __future__ import annotations

import asyncio
import hashlib
import json
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
MAX_VIDEO_BYTES = 200 * 1024 * 1024  # soft guard; TG bot download limits still apply


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


@dataclass(frozen=True)
class VkBridgeFeatures:
    """Feature flags for optional media paths (text/photo wall always on)."""

    video: bool = False  # TG video → VK wall video (needs user token + video scope)
    clips: bool = False  # TG video → VK Clips via shortVideo.create (user token)
    stories: bool = False  # TG photo/video → VK community stories (community token OK)
    coauthor_user_id: str = ""
    coauthor_screen_name: str = ""
    coauthor_label: str = "Евгений Гошев"


class VkWallClient:
    """VK API client: wall posts, photos, optional video/clips/stories."""

    def __init__(
        self,
        access_token: str,
        group_id: str,
        api_version: str = "5.199",
        *,
        user_access_token: str = "",
        features: VkBridgeFeatures | None = None,
    ) -> None:
        self.access_token = access_token
        self.user_access_token = (user_access_token or "").strip()
        self.group_id = group_id.lstrip("-")
        self.api_version = api_version
        self.api_url = "https://api.vk.com/method"
        self.features = features or VkBridgeFeatures()

    def _token_for_media(self) -> str:
        """Video/clips need a user token; fall back to community token (may fail)."""
        return self.user_access_token or self.access_token

    def _api_call(
        self,
        client: httpx.Client,
        method: str,
        params: dict[str, object],
        *,
        token: str | None = None,
    ) -> dict:
        payload = {
            **params,
            "access_token": token or self.access_token,
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

    def format_message(self, text: str) -> str:
        """Append co-author mention when configured (official co-author API is absent)."""
        message = (text or "").strip()
        mention = self._coauthor_mention()
        if not mention:
            return message[:MAX_VK_MESSAGE_LENGTH]
        if mention in message or (
            self.features.coauthor_screen_name
            and f"@{self.features.coauthor_screen_name}" in message
        ):
            return message[:MAX_VK_MESSAGE_LENGTH]
        if message:
            message = f"{message}\n\n{mention}"
        else:
            message = mention
        return message[:MAX_VK_MESSAGE_LENGTH]

    def _coauthor_mention(self) -> str:
        uid = (self.features.coauthor_user_id or "").strip()
        screen = (self.features.coauthor_screen_name or "").strip().lstrip("@")
        label = (self.features.coauthor_label or screen or "автор").strip()
        if uid:
            return f"[id{uid}|{label}]"
        if screen:
            return f"@{screen}"
        return ""

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

    def _upload_wall_video(
        self,
        client: httpx.Client,
        video_path: Path,
        *,
        title: str,
        description: str,
    ) -> str:
        """video.save → upload → attachment string. Requires user token with video."""
        token = self._token_for_media()
        saved = self._api_call(
            client,
            "video.save",
            {
                "group_id": self.group_id,
                "name": (title or "Видео")[:128],
                "description": (description or "")[:5000],
                "wallpost": 0,
                "is_private": 0,
            },
            token=token,
        )
        upload_url = saved["upload_url"]
        with video_path.open("rb") as video_file:
            response = client.post(
                upload_url,
                files={"video_file": (video_path.name, video_file, "video/mp4")},
                timeout=300,
            )
        response.raise_for_status()
        uploaded = response.json()
        if uploaded.get("error_code") or uploaded.get("error"):
            raise VkApiError(f"video upload failed: {uploaded}")
        owner_id = uploaded.get("owner_id", saved.get("owner_id"))
        video_id = uploaded.get("video_id", saved.get("video_id"))
        access_key = uploaded.get("access_key") or saved.get("access_key") or ""
        attachment = f"video{owner_id}_{video_id}"
        if access_key:
            attachment = f"{attachment}_{access_key}"
        return attachment

    def _publish_clip(
        self,
        client: httpx.Client,
        video_path: Path,
        *,
        description: str,
    ) -> int:
        """Unofficial shortVideo.create → upload. Needs user token; group auth fails."""
        token = self._token_for_media()
        file_size = video_path.stat().st_size
        created = self._api_call(
            client,
            "shortVideo.create",
            {
                "group_id": self.group_id,
                "file_size": file_size,
                "description": (description or "")[:4000],
                "wallpost": 1,
            },
            token=token,
        )
        upload_url = created["upload_url"]
        with video_path.open("rb") as video_file:
            response = client.post(
                upload_url,
                files={"file": (video_path.name, video_file, "video/mp4")},
                timeout=300,
            )
        response.raise_for_status()
        # Upload may return "1" or JSON; treat HTTP 200 as success.
        video_id = int(created.get("video_id") or 0)
        return video_id

    def _publish_story(
        self,
        client: httpx.Client,
        media_path: Path,
        *,
        is_video: bool,
    ) -> int:
        """Community stories via stories.* — works with community token + stories scope."""
        method = (
            "stories.getVideoUploadServer"
            if is_video
            else "stories.getPhotoUploadServer"
        )
        upload = self._api_call(
            client,
            method,
            {"group_id": self.group_id, "add_to_news": 1},
        )
        upload_url = upload["upload_url"]
        field_name = "video_file" if is_video else "file"
        content_type = "video/mp4" if is_video else "image/jpeg"
        with media_path.open("rb") as media:
            response = client.post(
                upload_url,
                files={field_name: (media_path.name, media, content_type)},
                timeout=300,
            )
        response.raise_for_status()
        uploaded = response.json()
        # Newer upload servers return upload_result string; older return nested object.
        upload_results = uploaded.get("upload_result") or uploaded.get("response", {}).get(
            "upload_result"
        )
        if not upload_results and isinstance(uploaded.get("response"), list):
            # Some servers return the payload expected by stories.save directly.
            upload_results = json.dumps(uploaded["response"])
        if not upload_results:
            # Fallback: pass whole JSON as string for stories.save
            upload_results = (
                uploaded.get("upload_results")
                or json.dumps(uploaded)
            )
        saved = self._api_call(
            client,
            "stories.save",
            {"upload_results": upload_results},
        )
        items = saved.get("items") if isinstance(saved, dict) else None
        if items:
            return int(items[0].get("id") or 0)
        return int(saved.get("count") or 0) if isinstance(saved, dict) else 0

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

        message = self.format_message(text)
        with httpx.Client(timeout=90) as client:
            attachments = [
                self._upload_photo(client, photo_path)
                for photo_path in photo_paths
            ]
            params: dict[str, object] = {
                "owner_id": f"-{self.group_id}",
                "from_group": 1,
                "message": message,
                # VK deduplicates the same guid for one hour.
                "guid": hashlib.sha256(source_key.encode()).hexdigest(),
            }
            if attachments:
                params["attachments"] = ",".join(attachments)
            result = self._api_call(client, "wall.post", params)
        return int(result["post_id"])

    def publish_video_wall(
        self,
        text: str,
        video_path: Path,
        source_key: str,
        *,
        title: str = "",
    ) -> int:
        message = self.format_message(text)
        with httpx.Client(timeout=300) as client:
            attachment = self._upload_wall_video(
                client,
                video_path,
                title=title or (text[:80] if text else "Видео"),
                description=message,
            )
            params: dict[str, object] = {
                "owner_id": f"-{self.group_id}",
                "from_group": 1,
                "message": message,
                "attachments": attachment,
                "guid": hashlib.sha256(source_key.encode()).hexdigest(),
            }
            result = self._api_call(client, "wall.post", params)
        return int(result["post_id"])

    def publish_clip(self, text: str, video_path: Path, source_key: str) -> int:
        description = self.format_message(text)
        with httpx.Client(timeout=300) as client:
            video_id = self._publish_clip(
                client, video_path, description=description
            )
        # shortVideo may auto-wallpost; use video_id (or hash of source) for store.
        return video_id or int(
            hashlib.sha256(source_key.encode()).hexdigest()[:8], 16
        )

    def publish_story_media(self, media_path: Path, *, is_video: bool) -> int:
        with httpx.Client(timeout=300) as client:
            return self._publish_story(client, media_path, is_video=is_video)


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


def unsupported_reason(
    message: Message,
    features: VkBridgeFeatures,
) -> str | None:
    """Return why this post is intentionally outside the enabled feature set."""
    if message.forward_origin is not None:
        return "forwarded post"
    if message.poll is not None:
        return "poll"
    if message.video is not None or message.video_note is not None:
        if not (features.video or features.clips or features.stories):
            return "video (enable VK_BRIDGE_VIDEO / VK_BRIDGE_CLIPS / VK_BRIDGE_STORIES)"
        return None
    if message.animation is not None:
        return "animation"
    if message.audio is not None or message.voice is not None:
        return "audio"
    if message.document is not None:
        mime = (message.document.mime_type or "").lower()
        if mime.startswith("video/") and (
            features.video or features.clips or features.stories
        ):
            return None
        return "document or sticker"
    if message.sticker is not None:
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


def _telegram_video_file(message: Message):
    if message.video is not None:
        return message.video
    if message.video_note is not None:
        return message.video_note
    if message.document is not None:
        mime = (message.document.mime_type or "").lower()
        if mime.startswith("video/"):
            return message.document
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

    @property
    def features(self) -> VkBridgeFeatures:
        return self.publisher.features

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
            reason = unsupported_reason(message, self.features)
            if reason:
                logger.warning(
                    "VK bridge skipped %s (%s, Telegram message %s)",
                    source_key,
                    reason,
                    message.message_id,
                )
                return

        photos = [message for message in messages if message.photo]
        videos = [message for message in messages if _telegram_video_file(message)]

        if len(messages) > 1 and videos:
            logger.warning(
                "VK bridge skipped album with video (not supported): %s",
                source_key,
            )
            return

        if len(photos) != len(messages) and len(messages) > 1 and not videos:
            logger.warning("VK bridge skipped mixed/unsupported album: %s", source_key)
            return

        text = ""
        for message in messages:
            text = post_text(message)
            if text:
                break

        try:
            if videos and len(messages) == 1:
                await self._publish_video_message(messages[0], source_key, text)
                return

            if not text and not photos:
                logger.warning("VK bridge skipped empty post: %s", source_key)
                return

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
                if self.features.stories and paths:
                    try:
                        story_id = await asyncio.to_thread(
                            self.publisher.publish_story_media,
                            paths[0],
                            is_video=False,
                        )
                        logger.info(
                            "VK bridge story photo for %s → story %s",
                            source_key,
                            story_id,
                        )
                    except Exception:
                        logger.exception(
                            "VK bridge story failed for %s (wall post kept)",
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

    async def _publish_video_message(
        self,
        message: Message,
        source_key: str,
        text: str,
    ) -> None:
        media = _telegram_video_file(message)
        if media is None:
            return
        file_size = getattr(media, "file_size", None) or 0
        if file_size and file_size > MAX_VIDEO_BYTES:
            logger.warning(
                "VK bridge skipped %s (video too large: %s bytes)",
                source_key,
                file_size,
            )
            return

        features = self.features
        if not (features.clips or features.video or features.stories):
            logger.warning("VK bridge skipped %s (video flags off)", source_key)
            return

        with tempfile.TemporaryDirectory(prefix="eg-vk-bridge-vid-") as temp_dir:
            path = Path(temp_dir) / "video.mp4"
            telegram_file = await media.get_file()
            await telegram_file.download_to_drive(path)

            vk_ref = 0
            published_main = False

            if features.clips:
                try:
                    vk_ref = await asyncio.to_thread(
                        self.publisher.publish_clip,
                        text,
                        path,
                        source_key,
                    )
                    published_main = True
                    logger.info(
                        "VK bridge clip published %s as video_id %s",
                        source_key,
                        vk_ref,
                    )
                except Exception:
                    logger.exception(
                        "VK bridge clip failed for %s "
                        "(need user token; community token → error 27)",
                        source_key,
                    )
                    if not features.video and not features.stories:
                        return

            if features.video and not published_main:
                try:
                    vk_ref = await asyncio.to_thread(
                        self.publisher.publish_video_wall,
                        text,
                        path,
                        source_key,
                    )
                    published_main = True
                    logger.info(
                        "VK bridge wall video %s as VK post %s",
                        source_key,
                        vk_ref,
                    )
                except Exception:
                    logger.exception(
                        "VK bridge wall video failed for %s "
                        "(need user token with video scope)",
                        source_key,
                    )
                    if not features.stories:
                        return

            if features.stories:
                try:
                    story_id = await asyncio.to_thread(
                        self.publisher.publish_story_media,
                        path,
                        is_video=True,
                    )
                    logger.info(
                        "VK bridge story video for %s → story %s",
                        source_key,
                        story_id,
                    )
                    if not published_main:
                        vk_ref = story_id or int(
                            hashlib.sha256(source_key.encode()).hexdigest()[:8], 16
                        )
                        published_main = True
                except Exception:
                    logger.exception("VK bridge story video failed for %s", source_key)

            if published_main:
                self.store.record(source_key, vk_ref)
            else:
                logger.warning("VK bridge video not published for %s", source_key)
