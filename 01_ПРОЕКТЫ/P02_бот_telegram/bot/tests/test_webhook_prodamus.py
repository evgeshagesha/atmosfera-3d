"""Smoke tests for Prodamus webhook fail-closed behaviour."""
from __future__ import annotations

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

try:
    import flask  # noqa: F401
except ImportError:  # pragma: no cover
    flask = None

from prodamus_signature import sign  # noqa: E402


@unittest.skipIf(flask is None, "flask not installed in this environment")
class WebhookFailClosedTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.orders = Path(self.tmp.name) / "orders.json"
        self.orders.write_text("[]", encoding="utf-8")

        import webhook_prodamus as wh

        self.wh = wh
        self._orders_patch = mock.patch.object(wh, "ORDERS_FILE", self.orders)
        self._orders_patch.start()
        self.client = wh.app.test_client()

    def tearDown(self):
        self._orders_patch.stop()
        self.tmp.cleanup()

    def test_probe_without_order_ok(self):
        r = self.client.post("/webhook")
        self.assertEqual(r.status_code, 200)

    def test_missing_secret_rejects_order(self):
        with mock.patch.dict(os.environ, {"PRODAMUS_SECRET": ""}, clear=False):
            r = self.client.post(
                "/webhook",
                data={"order_id": "999", "product_name": "клуб"},
            )
        self.assertEqual(r.status_code, 503)
        self.assertEqual(json.loads(self.orders.read_text()), [])

    def test_missing_sign_rejects(self):
        with mock.patch.dict(os.environ, {"PRODAMUS_SECRET": "sec"}, clear=False):
            r = self.client.post(
                "/webhook",
                data={"order_id": "999", "product_name": "клуб"},
            )
        self.assertEqual(r.status_code, 401)
        self.assertEqual(json.loads(self.orders.read_text()), [])

    def test_bad_sign_rejects(self):
        with mock.patch.dict(os.environ, {"PRODAMUS_SECRET": "sec"}, clear=False):
            r = self.client.post(
                "/webhook",
                data={"order_id": "999", "product_name": "клуб"},
                headers={"Sign": "0" * 64},
            )
        self.assertEqual(r.status_code, 403)
        self.assertEqual(json.loads(self.orders.read_text()), [])

    def test_valid_sign_registers(self):
        secret = "sec"
        payload = {"order_id": "1001", "product_name": "клуб", "sum": "1758"}
        sig = sign(payload, secret)
        with mock.patch.dict(os.environ, {"PRODAMUS_SECRET": secret}, clear=False):
            r = self.client.post("/webhook", data=payload, headers={"Sign": sig})
        self.assertEqual(r.status_code, 200, r.get_data(as_text=True))
        orders = json.loads(self.orders.read_text())
        self.assertEqual(len(orders), 1)
        self.assertEqual(orders[0]["order_id"], "1001")
        self.assertEqual(orders[0]["product_id"], "club")


if __name__ == "__main__":
    unittest.main()
