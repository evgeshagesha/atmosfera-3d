"""Unit tests for /start channel-gate and start text aliases (no Telegram network)."""
from __future__ import annotations

import sys
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


class ChannelGateUnitTests(unittest.TestCase):
    def test_require_channel_sub_defaults_on(self):
        import config
        from channel_gate import require_channel_sub

        with patch.object(config, "REQUIRE_CHANNEL_SUB", "1"):
            self.assertTrue(require_channel_sub())
        with patch.object(config, "REQUIRE_CHANNEL_SUB", "0"):
            self.assertFalse(require_channel_sub())
        with patch.object(config, "REQUIRE_CHANNEL_SUB", "false"):
            self.assertFalse(require_channel_sub())

    def test_subscribe_guide_text_escapes_html(self):
        from channel_gate import subscribe_guide_text

        text = subscribe_guide_text("гайд <script>")
        self.assertIn("&lt;script&gt;", text)
        self.assertIn("<b>", text)
        self.assertIn("Подписаться на канал", text)
        self.assertIn("Я подписался", text)

    def test_subscribe_keyboard_callback(self):
        from channel_gate import subscribe_keyboard

        kb = subscribe_keyboard("subok:telo")
        rows = kb.inline_keyboard
        self.assertEqual(len(rows), 2)
        self.assertEqual(rows[0][0].url, "https://t.me/EvgeniiGoshev")
        self.assertEqual(rows[1][0].text, "Я подписался")
        self.assertEqual(rows[1][0].callback_data, "subok:telo")


class LeadGuideDeliveryTests(unittest.TestCase):
    GUIDE_POST = "https://t.me/EvgeniiGoshev/1326"

    def test_products_lead_page_url_is_channel_post(self):
        from products import get_lead_delivery, get_page_url

        self.assertEqual(get_page_url("lead_telo"), self.GUIDE_POST)
        self.assertEqual(get_lead_delivery(), self.GUIDE_POST)

    def test_guide_url_constant(self):
        from handlers_products import GUIDE_URL

        self.assertEqual(GUIDE_URL, self.GUIDE_POST)

    def test_deliver_lead_guide_text_and_url_button(self):
        """After subscribe: exact HTML copy + «Открыть гайд 🎁» → channel post."""
        import asyncio
        from handlers_products import deliver_lead_guide

        update = MagicMock()
        update.effective_user.id = 11
        update.effective_chat.id = 11
        message = MagicMock()
        message.chat_id = 11
        update.effective_message = message
        context = MagicMock()

        async def _run():
            with (
                patch(
                    "handlers_products.get_page_url", return_value=self.GUIDE_POST
                ),
                patch(
                    "followups.schedule_lead_followups", MagicMock()
                ),
            ):

                async def _reply_text(text, reply_markup=None, parse_mode=None):
                    self.assertEqual(parse_mode, "HTML")
                    self.assertIn("✅ <b>Подписка есть</b> — спасибо!", text)
                    self.assertIn(
                        "<b>«С чего начинать работу с телом»</b>", text
                    )
                    self.assertIn(
                        "<b>И важный момент:</b>", text
                    )
                    self.assertIn(
                        "ещё один <b>сюрприз</b>", text
                    )
                    self.assertIn("Обязательно дочитайте до конца.", text)
                    self.assertNotIn("egoshev.ru/gaid", text)
                    btn = reply_markup.inline_keyboard[0][0]
                    self.assertEqual(btn.text, "Открыть гайд 🎁")
                    self.assertEqual(btn.url, self.GUIDE_POST)

                message.reply_text = _reply_text
                ok = await deliver_lead_guide(update, context)
                self.assertTrue(ok)

        asyncio.run(_run())


class StartAliasTests(unittest.TestCase):
    def test_is_start_text(self):
        from handlers_products import is_start_text

        self.assertTrue(is_start_text("Start"))
        self.assertTrue(is_start_text("старт"))
        self.assertTrue(is_start_text("/start"))
        self.assertTrue(is_start_text("/start@MyBot"))
        self.assertFalse(is_start_text("ТЕЛО"))
        self.assertFalse(is_start_text("привет"))

    def test_cmd_start_products_telo_routes(self):
        """Deep link /start telo must call flow_telo (not fall through as unknown)."""
        import asyncio
        from handlers_products import cmd_start_products

        update = MagicMock()
        context = MagicMock()
        context.args = ["telo"]

        async def _run():
            with patch(
                "handlers_products.flow_telo", new_callable=MagicMock
            ) as flow:
                async def _flow(*_a, **_k):
                    return None

                flow.side_effect = _flow
                handled = await cmd_start_products(update, context)
                self.assertTrue(handled)
                flow.assert_called_once()

        asyncio.run(_run())


class FlowTeloGateTests(unittest.TestCase):
    def test_flow_telo_always_asks_subscribe_when_gate_on(self):
        """Even if already subscribed, entry must show subscribe guide (REQUIRE=1)."""
        import asyncio
        from handlers_products import flow_telo

        update = MagicMock()
        update.effective_user.id = 42
        update.effective_chat.id = 42
        update.effective_message.chat_id = 42
        context = MagicMock()

        async def _run():
            with (
                patch("handlers_products.require_channel_sub", return_value=True),
                patch(
                    "handlers_products.send_subscribe_prompt", new_callable=MagicMock
                ) as ask,
                patch(
                    "handlers_products.deliver_lead_guide", new_callable=MagicMock
                ) as deliver,
            ):

                async def _ask(**_k):
                    return None

                async def _deliver(*_a, **_k):
                    return True

                ask.side_effect = _ask
                deliver.side_effect = _deliver
                await flow_telo(update, context)
                ask.assert_called_once()
                deliver.assert_not_called()

        asyncio.run(_run())

    def test_on_subscribe_ok_delivers_guide_not_reask(self):
        import asyncio
        from handlers_products import on_subscribe_check

        update = MagicMock()
        update.effective_user.id = 7
        update.callback_query.data = "subok:telo"
        update.callback_query.message.chat_id = 7
        context = MagicMock()

        async def _run():
            with (
                patch(
                    "handlers_products.is_channel_subscriber",
                    new_callable=MagicMock,
                ) as sub,
                patch(
                    "handlers_products.deliver_lead_guide", new_callable=MagicMock
                ) as deliver,
                patch(
                    "handlers_products.flow_telo", new_callable=MagicMock
                ) as flow,
            ):

                async def _sub(*_a, **_k):
                    return True

                async def _deliver(*_a, **_k):
                    return True

                async def _answer(*_a, **_k):
                    return None

                async def _flow(*_a, **_k):
                    return None

                sub.side_effect = _sub
                deliver.side_effect = _deliver
                flow.side_effect = _flow
                update.callback_query.answer = _answer
                await on_subscribe_check(update, context)
                deliver.assert_called_once()
                flow.assert_not_called()

        asyncio.run(_run())


if __name__ == "__main__":
    unittest.main()
