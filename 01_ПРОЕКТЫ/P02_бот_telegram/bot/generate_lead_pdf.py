#!/usr/bin/env python3
"""Generate EG-style lead magnet PDF (dark / cyan premium).

Usage:
  python generate_lead_pdf.py
  → writes assets/lead_guide_eg.pdf next to this script.
"""
from __future__ import annotations

from pathlib import Path

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import mm
    from reportlab.pdfgen import canvas
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Нужен reportlab: pip install reportlab\n" + str(exc)
    ) from exc

OUT = Path(__file__).resolve().parent / "assets" / "lead_guide_eg.pdf"

# EG palette
BG = (0.06, 0.07, 0.09)  # near-black graphite
CARD = (0.10, 0.12, 0.15)
TEXT = (0.96, 0.97, 0.98)
MUTED = (0.62, 0.66, 0.72)
CYAN = (0.20, 0.82, 0.92)
LINE = (0.18, 0.28, 0.34)


def _set_fill(c: canvas.Canvas, rgb: tuple[float, float, float]) -> None:
    c.setFillColorRGB(*rgb)


def _set_stroke(c: canvas.Canvas, rgb: tuple[float, float, float]) -> None:
    c.setStrokeColorRGB(*rgb)


def draw_background(c: canvas.Canvas, w: float, h: float) -> None:
    _set_fill(c, BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    # soft cyan accents (no transparency — portable across reportlab)
    c.setFillColorRGB(0.09, 0.16, 0.19)
    c.circle(w - 40 * mm, h - 30 * mm, 55 * mm, fill=1, stroke=0)
    c.setFillColorRGB(0.07, 0.11, 0.14)
    c.circle(30 * mm, 40 * mm, 70 * mm, fill=1, stroke=0)


def draw_card(c: canvas.Canvas, x: float, y: float, cw: float, ch: float) -> None:
    _set_fill(c, CARD)
    _set_stroke(c, LINE)
    c.setLineWidth(0.6)
    c.roundRect(x, y, cw, ch, 6, fill=1, stroke=1)


def wrap_lines(c: canvas.Canvas, text: str, font: str, size: float, max_w: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def draw_paragraph(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    max_w: float,
    *,
    font: str = "Helvetica",
    size: float = 10,
    leading: float = 14,
    color: tuple[float, float, float] = TEXT,
) -> float:
    _set_fill(c, color)
    c.setFont(font, size)
    for line in wrap_lines(c, text, font, size, max_w):
        c.drawString(x, y, line)
        y -= leading
    return y


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    w, h = A4
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("С чего начинать работу с телом · Атмосфера 3D")
    c.setAuthor("Евгений Гошев")

    # --- Page 1 ---
    draw_background(c, w, h)
    margin = 22 * mm
    y = h - 28 * mm

    _set_fill(c, CYAN)
    c.setFont("Helvetica", 9)
    c.drawString(margin, y, "АТМОСФЕРА 3D  ·  EVOLUTION GO")
    y -= 8 * mm

    _set_fill(c, TEXT)
    c.setFont("Helvetica-Bold", 22)
    for line in wrap_lines(
        c,
        "С чего начинать работу с телом",
        "Helvetica-Bold",
        22,
        w - 2 * margin,
    ):
        c.drawString(margin, y, line)
        y -= 9 * mm

    y -= 2 * mm
    _set_fill(c, MUTED)
    c.setFont("Helvetica", 11)
    c.drawString(margin, y, "Движение  ·  Дыхание  ·  Дисциплина")
    y -= 6 * mm
    _set_stroke(c, CYAN)
    c.setLineWidth(1.2)
    c.line(margin, y, margin + 42 * mm, y)
    y -= 12 * mm

    y = draw_paragraph(
        c,
        "Большинство людей начинают с нагрузки. Сильнее, чаще, жёстче. "
        "А тело отвечает напряжением, срывами и ощущением, что «опять не получается».",
        margin,
        y,
        w - 2 * margin,
        size=11,
        leading=15,
        color=MUTED,
    )
    y -= 4 * mm
    y = draw_paragraph(
        c,
        "Этот гайд — про другой порядок: сначала база, потом нагрузка. "
        "Не обещание чуда. Понятная точка входа в систему.",
        margin,
        y,
        w - 2 * margin,
        size=11,
        leading=15,
    )
    y -= 8 * mm

    draw_card(c, margin, y - 52 * mm, w - 2 * margin, 48 * mm)
    cy = y - 10 * mm
    _set_fill(c, CYAN)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 6 * mm, cy, "ТРИ ОПОРЫ")
    cy -= 7 * mm
    for title, body in [
        ("Движение", "вернуть качество паттернов, а не просто «сжечь калории»"),
        ("Дыхание", "освободить грудную клетку и регуляцию до силовой работы"),
        ("Дисциплина", "регулярность маленьких шагов вместо редких рывков"),
    ]:
        _set_fill(c, TEXT)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(margin + 6 * mm, cy, title)
        _set_fill(c, MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(margin + 32 * mm, cy, "—  " + body)
        cy -= 6 * mm

    y = y - 60 * mm
    _set_fill(c, TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin, y, "Порядок работы")
    y -= 7 * mm
    steps = [
        "1. Оценка — понять, где система ограничена.",
        "2. Регуляция — дыхание и мягкое освобождение тканей.",
        "3. Коррекция — вернуть подвижность и контроль.",
        "4. Интеграция — собрать движение в повседневность.",
        "5. Стабилизация — сила и нагрузка на собранной базе.",
    ]
    for s in steps:
        y = draw_paragraph(c, s, margin, y, w - 2 * margin, size=10, leading=14)
        y -= 1 * mm

    y -= 6 * mm
    draw_card(c, margin, y - 28 * mm, w - 2 * margin, 24 * mm)
    _set_fill(c, CYAN)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 6 * mm, y - 10 * mm, "СЛЕДУЮЩИЙ ШАГ")
    _set_fill(c, TEXT)
    c.setFont("Helvetica", 10)
    c.drawString(
        margin + 6 * mm,
        y - 18 * mm,
        "Пройдите онлайн-тест тела — получите персональный план (разбор 24–48 ч).",
    )

    c.setFont("Helvetica", 8)
    _set_fill(c, MUTED)
    c.drawString(margin, 14 * mm, "egoshev.ru  ·  @EvgeniiGoshev  ·  без медицинских обещаний")
    c.showPage()

    # --- Page 2: mini protocol ---
    draw_background(c, w, h)
    y = h - 28 * mm
    _set_fill(c, CYAN)
    c.setFont("Helvetica", 9)
    c.drawString(margin, y, "МИНИ-ПРОТОКОЛ НА СЕГОДНЯ")
    y -= 10 * mm
    _set_fill(c, TEXT)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(margin, y, "10 минут · без героизма")
    y -= 12 * mm

    blocks = [
        (
            "Дыхание · 3 минуты",
            "Сядьте или лягте. Нос. Медленный выдох чуть длиннее вдоха. "
            "Плечи мягкие. Не форсируйте. Цель — спокойная регуляция, не рекорд.",
        ),
        (
            "Подвижность · 4 минуты",
            "Мягкие круги тазом, грудной клеткой, лопатками. "
            "Амплитуда комфортная. Ищите качество, не «до боли».",
        ),
        (
            "Опора · 3 минуты",
            "Стопы на полу, лёгкий присед у опоры или стойка с контролем. "
            "Дышите. Запомните ощущение собранности — это и есть база.",
        ),
    ]
    for title, body in blocks:
        card_h = 38 * mm
        draw_card(c, margin, y - card_h, w - 2 * margin, card_h)
        _set_fill(c, CYAN)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(margin + 6 * mm, y - 8 * mm, title)
        draw_paragraph(
            c,
            body,
            margin + 6 * mm,
            y - 16 * mm,
            w - 2 * margin - 12 * mm,
            size=10,
            leading=13,
            color=MUTED,
        )
        y -= card_h + 6 * mm

    y -= 4 * mm
    _set_fill(c, TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin, y, "Куда идти дальше")
    y -= 8 * mm
    for line in [
        "• Тест тела — понять маршрут (A–E)",
        "• Мини-программа «Дыхание и осанка» — если узкое место дыхание",
        "• Курс «Базовая настройка тела» — системная сборка",
        "• Клуб — регулярность без срывов",
        "• Студия в Москве — личный формат",
    ]:
        y = draw_paragraph(c, line, margin, y, w - 2 * margin, size=10, leading=14)
        y -= 1 * mm

    y -= 10 * mm
    draw_card(c, margin, y - 32 * mm, w - 2 * margin, 28 * mm)
    _set_fill(c, TEXT)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin + 6 * mm, y - 10 * mm, "Евгений Гошев")
    _set_fill(c, MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(
        margin + 6 * mm,
        y - 18 * mm,
        "Физический терапевт · биомеханика · студия «Атмосфера 3D», Москва",
    )
    c.drawString(
        margin + 6 * mm,
        y - 25 * mm,
        "Тело — система. Сначала база. Потом нагрузка.",
    )

    c.setFont("Helvetica", 8)
    _set_fill(c, MUTED)
    c.drawString(margin, 14 * mm, "© Атмосфера 3D  ·  лид-магнит  ·  egoshev.ru/testik")
    c.save()
    return OUT


if __name__ == "__main__":
    path = build()
    print(f"OK: {path}")
