from pathlib import Path
from types import SimpleNamespace

from telegram import MessageEntity

from vk_channel_bridge import VkDeliveryStore, channel_matches, post_text


def test_channel_matches_username_case_insensitively() -> None:
    message = SimpleNamespace(
        chat=SimpleNamespace(id=-100123, username="EvgeniiGoshev")
    )

    assert channel_matches(message, "@evgeniigoshev")
    assert not channel_matches(message, "@another_channel")


def test_channel_matches_numeric_id() -> None:
    message = SimpleNamespace(chat=SimpleNamespace(id=-100123, username=None))

    assert channel_matches(message, "-100123")
    assert not channel_matches(message, "-100999")


def test_post_text_appends_hidden_link_once() -> None:
    message = SimpleNamespace(
        text="Подробнее",
        caption=None,
        entities=(
            MessageEntity(
                type=MessageEntity.TEXT_LINK,
                offset=0,
                length=9,
                url="https://egoshev.ru",
            ),
        ),
        caption_entities=(),
    )

    assert post_text(message) == "Подробнее\n\nhttps://egoshev.ru"


def test_delivery_store_persists_deduplication(tmp_path: Path) -> None:
    path = tmp_path / "bridge.sqlite3"
    store = VkDeliveryStore(path)

    assert not store.contains("tg:-100:1")
    store.record("tg:-100:1", 42)
    store.record("tg:-100:1", 42)

    reopened = VkDeliveryStore(path)
    assert reopened.contains("tg:-100:1")

