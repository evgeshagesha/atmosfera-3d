"""Kie.ai media client for EG article images.

The API key is read only from KIE_API_KEY in .env. Generated media URLs are
temporary, so completed files are downloaded immediately when `wait` is used.
"""

from __future__ import annotations

import argparse
import json
import os
import time
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

try:
    from dotenv import load_dotenv
except ImportError:
    def load_dotenv() -> bool:
        """Allow CLI help/tests before project dependencies are installed."""
        return False

load_dotenv()

API_BASE = "https://api.kie.ai"
CREATE_TASK_PATH = "/api/v1/jobs/createTask"
TASK_INFO_PATH = "/api/v1/jobs/recordInfo"


class KieAPIError(RuntimeError):
    """A safe Kie.ai API error that never includes credentials."""


class KieClient:
    def __init__(self, api_key: str | None = None) -> None:
        self.api_key = (api_key or os.getenv("KIE_API_KEY", "")).strip()
        if not self.api_key:
            raise KieAPIError(
                "KIE_API_KEY не настроен. Добавьте ключ в bot/.env, но не отправляйте его в чат."
            )

    def _request(
        self,
        method: str,
        path: str,
        *,
        payload: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        body = json.dumps(payload).encode("utf-8") if payload is not None else None
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json",
        }
        if body is not None:
            headers["Content-Type"] = "application/json"

        request = Request(
            f"{API_BASE}{path}",
            data=body,
            headers=headers,
            method=method,
        )
        try:
            with urlopen(request, timeout=60) as response:
                result = json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            message = error.read().decode("utf-8", errors="replace")
            raise KieAPIError(f"Kie.ai вернул HTTP {error.code}: {message}") from error
        except (URLError, TimeoutError) as error:
            raise KieAPIError(f"Не удалось связаться с Kie.ai: {error}") from error

        if result.get("code") != 200:
            raise KieAPIError(
                f"Kie.ai отклонил запрос: {result.get('msg', 'неизвестная ошибка')}"
            )
        return result

    def get_credits(self) -> int:
        result = self._request("GET", "/api/v1/chat/credit")
        return int(result["data"])

    def create_task(
        self,
        *,
        model: str,
        input_data: dict[str, Any],
        callback_url: str | None = None,
    ) -> str:
        payload: dict[str, Any] = {"model": model, "input": input_data}
        if callback_url:
            payload["callBackUrl"] = callback_url
        result = self._request("POST", CREATE_TASK_PATH, payload=payload)
        return str(result["data"]["taskId"])

    def create_image_set(
        self,
        prompt: str,
        *,
        reference_urls: list[str] | None = None,
        count: int = 4,
        image_size: str = "landscape_4_3",
        resolution: str = "4K",
    ) -> str:
        if not 1 <= count <= 6:
            raise ValueError("Количество изображений должно быть от 1 до 6.")
        if resolution not in {"1K", "2K", "4K"}:
            raise ValueError("Разрешение должно быть 1K, 2K или 4K.")

        input_data: dict[str, Any] = {
            "prompt": f"{prompt.strip()}\nCreate exactly {count} distinct images.",
            "image_size": image_size,
            "image_resolution": resolution,
            "max_images": count,
            "nsfw_checker": True,
        }
        if reference_urls:
            model = "bytedance/seedream-v4-edit"
            input_data["image_urls"] = reference_urls
        else:
            model = "bytedance/seedream-v4-text-to-image"

        return self.create_task(model=model, input_data=input_data)

    def get_task(self, task_id: str) -> dict[str, Any]:
        result = self._request("GET", f"{TASK_INFO_PATH}?taskId={task_id}")
        return dict(result["data"])

    def wait_for_task(
        self,
        task_id: str,
        *,
        timeout_seconds: int = 900,
    ) -> dict[str, Any]:
        deadline = time.monotonic() + timeout_seconds
        delay = 3

        while time.monotonic() < deadline:
            task = self.get_task(task_id)
            state = task.get("state")
            print(f"Статус: {state}")
            if state == "success":
                return task
            if state == "fail":
                raise KieAPIError(
                    f"Генерация не выполнена: {task.get('failMsg') or task.get('failCode')}"
                )
            time.sleep(delay)
            delay = min(delay * 2, 20)

        raise KieAPIError("Kie.ai не завершил задачу за 15 минут.")

    @staticmethod
    def result_urls(task: dict[str, Any]) -> list[str]:
        raw_result = task.get("resultJson") or "{}"
        result = json.loads(raw_result) if isinstance(raw_result, str) else raw_result
        return [str(url) for url in result.get("resultUrls", [])]

    def download_results(
        self,
        task: dict[str, Any],
        output_dir: Path,
    ) -> list[Path]:
        output_dir.mkdir(parents=True, exist_ok=True)
        paths: list[Path] = []

        for index, url in enumerate(self.result_urls(task), start=1):
            suffix = Path(urlparse(url).path).suffix.lower()
            if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
                suffix = ".jpg"
            destination = output_dir / f"eg-kie-{index:02d}{suffix}"
            request = Request(url, headers={"User-Agent": "EG-Kie-Downloader/1.0"})
            try:
                with urlopen(request, timeout=120) as response:
                    destination.write_bytes(response.read())
            except (HTTPError, URLError, TimeoutError) as error:
                raise KieAPIError(f"Не удалось скачать результат {index}: {error}") from error
            paths.append(destination)

        return paths


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Kie.ai: изображения для EG")
    commands = parser.add_subparsers(dest="command", required=True)

    commands.add_parser("credits", help="Проверить остаток кредитов")

    generate = commands.add_parser("generate", help="Создать набор изображений")
    generate.add_argument("--prompt", required=True)
    generate.add_argument("--reference-url", action="append", default=[])
    generate.add_argument("--count", type=int, default=4)
    generate.add_argument("--resolution", choices=["1K", "2K", "4K"], default="4K")
    generate.add_argument("--size", default="landscape_4_3")

    status = commands.add_parser("status", help="Проверить задачу")
    status.add_argument("task_id")

    wait = commands.add_parser("wait", help="Дождаться и скачать результаты")
    wait.add_argument("task_id")
    wait.add_argument("--output", type=Path, default=Path("generated/kie"))
    return parser


def main() -> None:
    args = build_parser().parse_args()
    client = KieClient()

    if args.command == "credits":
        print(f"Остаток Kie.ai: {client.get_credits()} кредитов")
        return

    if args.command == "generate":
        task_id = client.create_image_set(
            args.prompt,
            reference_urls=args.reference_url or None,
            count=args.count,
            image_size=args.size,
            resolution=args.resolution,
        )
        print(f"Задача создана: {task_id}")
        print(f"Скачать после завершения: python kie_images.py wait {task_id}")
        return

    if args.command == "status":
        print(json.dumps(client.get_task(args.task_id), ensure_ascii=False, indent=2))
        return

    task = client.wait_for_task(args.task_id)
    files = client.download_results(task, args.output)
    for file_path in files:
        print(f"Сохранено: {file_path}")


if __name__ == "__main__":
    try:
        main()
    except (KieAPIError, ValueError) as error:
        raise SystemExit(str(error)) from error
