"""Unit tests for Prodamus HMAC signature (no network)."""
from __future__ import annotations

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from prodamus_signature import (  # noqa: E402
    canonical_json,
    form_to_payload,
    nest_php_style_form,
    sign,
    verify,
)


class ProdamusSignatureTests(unittest.TestCase):
    def test_sign_is_stable_and_hex(self):
        secret = "test-secret-key"
        data = {"order_id": "123", "sum": "100.00", "customer_email": "a@b.c"}
        a = sign(data, secret)
        b = sign(data, secret)
        self.assertEqual(a, b)
        self.assertEqual(len(a), 64)
        self.assertTrue(all(c in "0123456789abcdef" for c in a))

    def test_verify_accepts_valid(self):
        secret = "test-secret-key"
        data = {"order_id": "42", "sum": "10.00"}
        sig = sign(data, secret)
        self.assertTrue(verify(data, secret, sig))
        self.assertTrue(verify(data, secret, sig.upper()))

    def test_verify_rejects_tamper_and_wrong_secret(self):
        secret = "test-secret-key"
        data = {"order_id": "42", "sum": "10.00"}
        sig = sign(data, secret)
        tampered = dict(data)
        tampered["sum"] = "999.00"
        self.assertFalse(verify(tampered, secret, sig))
        self.assertFalse(verify(data, "other-secret", sig))
        self.assertFalse(verify(data, secret, None))
        self.assertFalse(verify(data, "", sig))
        self.assertFalse(verify({}, secret, sig))

    def test_slash_escaping_matches_php_style(self):
        data = {"url": "https://example.com/path"}
        raw = canonical_json(data)
        self.assertIn("https:\\/\\/example.com\\/path", raw)

    def test_key_order_does_not_matter(self):
        secret = "s"
        a = {"b": "2", "a": "1"}
        b = {"a": "1", "b": "2"}
        self.assertEqual(sign(a, secret), sign(b, secret))

    def test_nested_form_keys(self):
        flat = {
            "order_id": "7",
            "products[0][name]": "Клуб",
            "products[0][price]": "1758",
        }
        nested = nest_php_style_form(flat)
        self.assertEqual(nested["order_id"], "7")
        self.assertEqual(nested["products"][0]["name"], "Клуб")
        self.assertEqual(form_to_payload(flat)["products"][0]["price"], "1758")


if __name__ == "__main__":
    unittest.main()
