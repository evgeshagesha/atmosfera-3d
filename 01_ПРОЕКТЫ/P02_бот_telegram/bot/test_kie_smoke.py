#!/usr/bin/env python3
"""Smoke-test Kie.ai: credits + optional 4×4K generate.

Reads KIE_API_KEY only from bot/.env. Never prints the key.

  python test_kie_smoke.py           # credits only
  python test_kie_smoke.py --generate  # credits + 4×4K (spends credits)
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from kie_images import KieAPIError, KieClient  # noqa: E402


DEFAULT_PROMPT = (
    "Premium dark wellness brand visual, graphite black background, "
    "subtle cyan neon accent light, human movement silhouette abstract, "
    "high-end editorial photography feel, no text, no logo, 4K"
)


def main() -> int:
    parser = argparse.ArgumentParser(description="Kie.ai smoke test for EG")
    parser.add_argument(
        "--generate",
        action="store_true",
        help="Also create 4 images at 4K (spends credits)",
    )
    parser.add_argument("--prompt", default=DEFAULT_PROMPT)
    args = parser.parse_args()

    try:
        client = KieClient()
    except KieAPIError as err:
        print(f"BLOCKED: {err}")
        print("Добавьте KIE_API_KEY в bot/.env (ключ в чат не слать) и повторите.")
        return 2

    credits = client.get_credits()
    print(f"OK credits: {credits}")

    if not args.generate:
        print("Skip generate (передай --generate для теста 4×4K).")
        return 0

    task_id = client.create_image_set(
        args.prompt,
        count=4,
        resolution="4K",
        image_size="landscape_4_3",
    )
    print(f"OK task: {task_id}")
    out = ROOT / "generated" / "kie_smoke"
    task = client.wait_for_task(task_id)
    paths = client.download_results(task, out)
    for path in paths:
        print(f"OK file: {path}")
    print(f"DONE: {len(paths)} file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
