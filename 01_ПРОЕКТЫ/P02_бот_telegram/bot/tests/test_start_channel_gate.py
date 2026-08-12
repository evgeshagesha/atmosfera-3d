"""Unit tests for /start channel-gate and onboarding funnel (no Telegram network)."""
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

    def test_subscribe_workout_text(self):
        from channel_gate import subscribe_workout_text

        text = subscribe_workout_text()
        self.assertIn("Родненькие, добро пожаловать", text)
        self.assertIn("функциональный тест", text)
        self.assertIn("Я подписался", text)
        self.assertNotIn("Забрать тренировку", text)
        self.assertNotIn("гайд", text.lower())
        self.assertNotIn("20 движений", text.lower())

    def test_subscribe_keyboard_callback(self):
        from channel_gate import subscribe_keyboard

        kb = subscribe_keyboard("subok:telo")
        rows = kb.inline_keyboard
        self.assertEqual(len(rows), 2)
        self.assertEqual(rows[0][0].url, "https://t.me/EvgeniiGoshev")
        self.assertEqual(rows[0][0].text, "💙 Подписаться на канал")
        self.assertEqual(rows[1][0].text, "✅ Я подписался")
        self.assertEqual(rows[1][0].callback_data, "subok:telo")


class LeadStartDeliveryTests(unittest.TestCase):
    PIN = "https://t.me/EvgeniiGoshev/1326"

    def test_products_lead_page_url_is_pin(self):
        from products import get_page_url

        self.assertEqual(get_page_url("lead_telo"), self.PIN)

    def test_main_start_post_url(self):
        from funnel_config import MAIN_START_POST_URL, main_start_post_url
        from handlers_products import GUIDE_URL, WORKOUT_URL

        self.assertEqual(MAIN_START_POST_URL, self.PIN)
        self.assertEqual(main_start_post_url(), self.PIN)
        self.assertEqual(GUIDE_URL, self.PIN)
        self.assertEqual(WORKOUT_URL, self.PIN)

    def test_practice_urls_found(self):
        from funnel_config import (
            BREATHING_PRACTICE_URL,
            EG3D_WORKOUT_URL,
            FREE_WORKOUT_URL,
            breathing_practice_url,
            eg3d_workout_url,
            free_workout_url,
        )

        self.assertEqual(BREATHING_PRACTICE_URL, "https://t.me/EvgeniiGoshev/760")
        self.assertEqual(EG3D_WORKOUT_URL, "https://t.me/EvgeniiGoshev/1299")
        self.assertEqual(FREE_WORKOUT_URL, "https://youtu.be/sDRbfeB7BZM")
        self.assertEqual(breathing_practice_url(), BREATHING_PRACTICE_URL)
        self.assertEqual(eg3d_workout_url(), EG3D_WORKOUT_URL)
        self.assertEqual(free_workout_url(), FREE_WORKOUT_URL)

    def test_deliver_after_subscribe_sends_pin(self):
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
                patch("handlers_products.onboarding_state.update_state"),
                patch("handlers_products.track"),
                patch("followups.schedule_lead_followups", MagicMock()),
            ):

                async def _reply_text(text, reply_markup=None, parse_mode=None, **_k):
                    self.assertEqual(parse_mode, "HTML")
                    self.assertIn("Готово. Теперь всё открыто", text)
                    self.assertIn("функциональному тесту", text)
                    self.assertNotIn("20 движений", text.lower())
                    self.assertNotIn("eg.egoshev.ru/anketaeg", text)
                    btn = reply_markup.inline_keyboard[0][0]
                    self.assertEqual(btn.text, "📌 Открыть точку старта")
                    self.assertEqual(btn.url, self.PIN)

                message.reply_text = _reply_text
                ok = await deliver_lead_guide(update, context)
                self.assertTrue(ok)

        asyncio.run(_run())


class FollowupScheduleTests(unittest.TestCase):
    def test_followup_delays_and_no_twenty_moves(self):
        from followups import FOLLOWUP_DELAYS

        kinds = [k for _, k in FOLLOWUP_DELAYS]
        self.assertEqual(
            kinds,
            [
                "fu_save_bot",
                "fu_day1",
                "fu_day1_nudge",
                "fu_day2",
                "fu_day3",
                "fu_day4",
                "fu_day4_nudge",
                "fu_day5",
                "fu_final",
            ],
        )
        self.assertEqual(FOLLOWUP_DELAYS[0][0], 20)
        self.assertEqual(FOLLOWUP_DELAYS[1][0], 24 * 3600)
        self.assertEqual(FOLLOWUP_DELAYS[-1][0], 132 * 3600)

    def test_active_funnel_has_no_twenty_moves_or_anketaeg(self):
        import funnel_copy as copy

        blob = "\n".join(
            [
                copy.start_subscribe_text(),
                copy.after_subscribe_text(),
                copy.day1_text(),
                copy.day2_text(),
                copy.day3_text(),
                copy.day4_text(),
                copy.day4_nudge_text(),
                copy.day5_text(),
                copy.final_nudge_text(),
            ]
        ).lower()
        self.assertNotIn("20 движений", blob)
        self.assertNotIn("тест из 20", blob)
        self.assertNotIn("eg.egoshev.ru/anketaeg", blob)
        self.assertNotIn("уникальная методика", blob)
        self.assertNotIn("тело всегда знает", blob)

    def test_day3_does_not_call_eg3d_a_test(self):
        import funnel_copy as copy

        text = copy.day3_text().lower()
        self.assertNotIn("тест тела", text)
        self.assertNotIn("как тест", text)
        self.assertIn("eg 3d зарядку", text)


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
    def test_flow_telo_asks_subscribe_when_not_member(self):
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
                    "handlers_products.is_channel_subscriber",
                    new_callable=MagicMock,
                ) as sub,
                patch(
                    "handlers_products.send_subscribe_prompt", new_callable=MagicMock
                ) as ask,
                patch(
                    "handlers_products.deliver_lead_guide", new_callable=MagicMock
                ) as deliver,
                patch("handlers_products.onboarding_state.is_completed", return_value=False),
                patch("handlers_products.track"),
            ):

                async def _sub(*_a, **_k):
                    return False

                async def _ask(**_k):
                    return None

                async def _deliver(*_a, **_k):
                    return True

                sub.side_effect = _sub
                ask.side_effect = _ask
                deliver.side_effect = _deliver
                await flow_telo(update, context)
                ask.assert_called_once()
                deliver.assert_not_called()

        asyncio.run(_run())

    def test_flow_telo_skips_gate_if_already_subscribed(self):
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
                    "handlers_products.is_channel_subscriber",
                    new_callable=MagicMock,
                ) as sub,
                patch(
                    "handlers_products.send_subscribe_prompt", new_callable=MagicMock
                ) as ask,
                patch(
                    "handlers_products.deliver_lead_guide", new_callable=MagicMock
                ) as deliver,
                patch("handlers_products.onboarding_state.is_completed", return_value=False),
                patch("handlers_products.track"),
            ):

                async def _sub(*_a, **_k):
                    return True

                async def _ask(**_k):
                    return None

                async def _deliver(*_a, **_k):
                    return True

                sub.side_effect = _sub
                ask.side_effect = _ask
                deliver.side_effect = _deliver
                await flow_telo(update, context)
                ask.assert_not_called()
                deliver.assert_called_once()

        asyncio.run(_run())

    def test_flow_telo_completed_sends_short_return(self):
        import asyncio
        from handlers_products import flow_telo

        update = MagicMock()
        update.effective_user.id = 9
        update.effective_chat.id = 9
        update.effective_message.chat_id = 9
        context = MagicMock()

        async def _run():
            with (
                patch("handlers_products.onboarding_state.is_completed", return_value=True),
                patch(
                    "handlers_products._send_returning_start", new_callable=MagicMock
                ) as ret,
                patch(
                    "handlers_products.deliver_lead_guide", new_callable=MagicMock
                ) as deliver,
                patch("handlers_products.track"),
            ):

                async def _ret(*_a, **_k):
                    return None

                async def _deliver(*_a, **_k):
                    return True

                ret.side_effect = _ret
                deliver.side_effect = _deliver
                await flow_telo(update, context)
                ret.assert_called_once()
                deliver.assert_not_called()

        asyncio.run(_run())

    def test_on_subscribe_ok_delivers_pin_not_reask(self):
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

    def test_on_subscribe_fail_sends_short_tip_not_wall(self):
        import asyncio
        from handlers_products import on_subscribe_check

        update = MagicMock()
        update.effective_user.id = 7
        update.callback_query.data = "subok:telo"
        update.callback_query.message.chat_id = 7
        context = MagicMock()
        sent = {}

        async def _run():
            with patch(
                "handlers_products.is_channel_subscriber",
                new_callable=MagicMock,
            ) as sub:

                async def _sub(*_a, **_k):
                    return False

                async def _answer(*_a, **_k):
                    return None

                async def _reply_text(text, parse_mode=None, **_k):
                    sent["text"] = text

                sub.side_effect = _sub
                update.callback_query.answer = _answer
                update.callback_query.message.reply_text = _reply_text
                await on_subscribe_check(update, context)
                self.assertIn("Пока не вижу подписку", sent["text"])
                self.assertNotIn("Родненькие, добро пожаловать", sent["text"])

        asyncio.run(_run())


if __name__ == "__main__":
    unittest.main()
