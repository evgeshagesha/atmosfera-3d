# t-800-research-docs — ReportLab + PTB send_document

**status:** ok  
**budget_mode:** deep  
**query_count:** 5  
**note:** weasyprint not primary this pass  
**project lock:** reportlab (EG bot `generate_lead_pdf.py` already canvas + `setFillColorRGB`)  
**deps (repo):** `reportlab>=4.0.0`, `python-telegram-bot>=21.0`

---

```yaml
status: ok
docs_brief:
  libraryId: "/websites/reportlab"
  secondary_libraryId: "/python-telegram-bot/python-telegram-bot"
  queries:
    - "canvas fonts registerFont TTFont platypus Paragraph SimpleDocTemplate"
    - "Color colors HexColor Color RGB CMYK dark background fill stroke"
    - "Platypus flowables Table TableStyle KeepInFrame cards templates"
    - "HexColor Color class reportlab.lib.colors Color(r,g,b) toColor"
    - "send_document send PDF file document InputFile caption"
  citations:
    - topic: "TrueType fonts + Unicode"
      quote: "TTFont + pdfmetrics.registerFont; canvas.setFont(name, size); registerFontFamily for Platypus <b>/<i>"
      libraryId: "/websites/reportlab"
      source: "https://docs.reportlab.com/reportlab/userguide/ch3_fonts"
    - topic: "Canvas setFont"
      quote: "canvas.setFont(psfontname, size, leading=None)"
      libraryId: "/websites/reportlab"
      source: "https://docs.reportlab.com/reportlab/userguide/ch2_graphics"
    - topic: "Platypus layers + page templates"
      quote: "DocTemplates > PageTemplates > Frames > Flowables > pdfgen.Canvas; SimpleDocTemplate.build(Story, onFirstPage=, onLaterPages=)"
      libraryId: "/websites/reportlab"
      source: "https://docs.reportlab.com/reportlab/userguide/ch5_platypus"
    - topic: "RGB / fill / stroke for dark theme"
      quote: "setFillColorRGB(r,g,b), setStrokeColorRGB, setFillColor(acolor); RGB values additive 0..1; also Color(r,g,b) constructor"
      libraryId: "/websites/reportlab"
      source: "https://docs.reportlab.com/reportlab/userguide/ch2_graphics"
    - topic: "Table cards via TableStyle"
      quote: "Table + TableStyle BOX/INNERGRID/TEXTCOLOR/ALIGN/VALIGN/BACKGROUND for card-like blocks"
      libraryId: "/websites/reportlab"
      source: "https://docs.reportlab.com/reportlab/userguide/ch7_tables"
    - topic: "KeepTogether / Spacer"
      quote: "KeepTogether(flowables) keeps block on one frame; Spacer(width, height) vertical gap"
      libraryId: "/websites/reportlab"
      source: "https://docs.reportlab.com/reportlab/userguide/ch9_other_useful_flowables"
    - topic: "PTB send_document"
      quote: "await bot.send_document(chat_id=..., document=path|file_id|url|fileobj); Path supported"
      libraryId: "/python-telegram-bot/python-telegram-bot"
      source: "https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media"
  unverified:
    - "HexColor('#RRGGBB') — common ReportLab API; not returned in this Context7 pass (use Color(r,g,b) or setFillColorRGB)"
    - "canvas.roundRect / roundedRect for neon card glow — used in EG generate_lead_pdf; not in Context7 snippets this pass"
    - "Exact reportlab PyPI version pinned in Context7 — docs are /websites/reportlab (user guide); project requires >=4.0.0"
  query_count: 5
  budget_mode: deep
```

---

## docs_findings (API facts for EG Topic PDF skill + generate_lead_pdf)

### ReportLab — fonts / canvas / Platypus

1. **Canvas path (EG current):** `reportlab.pdfgen.canvas.Canvas` → `setFont` / `drawString` / `setFillColorRGB` / `rect` / `save`. Matches `generate_lead_pdf.py`.
2. **Unicode / Cyrillic:** built-in Helvetica/Times lack Cyrillic; use **`TTFont` + `pdfmetrics.registerFont`**. For Platypus bold/italic tags: **`registerFontFamily(name, normal=, bold=, italic=, boldItalic=)`**.
3. **Platypus path (skill option B):** `SimpleDocTemplate` + story of `Paragraph` / `Spacer` / `Table`; headers/footers via `onFirstPage` / `onLaterPages` canvas callbacks (dark bg can be painted in those callbacks).
4. **Architecture:** DocTemplate → PageTemplate → Frame → Flowables → Canvas (lowest paint layer).

### ReportLab — dark theme colors

1. **Primary for EG brand:** `canvas.setFillColorRGB(r, g, b)` / `setStrokeColorRGB` with **floats 0..1** (EG already: graphite ~`(0.07,0.11,0.14)`, cyan accents as RGB tuples).
2. **Object colors:** `from reportlab.lib import colors` named colors; **`Color(r, g, b)`** for custom (confirmed in graphics examples).
3. **Also:** `setFillColor(acolor)`, CMYK variants, `setFillGray` — RGB preferred for screen/Telegram PDF preview.
4. **Platypus dark cards:** `TableStyle` commands `BACKGROUND`, `TEXTCOLOR`, `BOX`, `INNERGRID` with `colors.Color(...)` or named — not only canvas.

### ReportLab — templates / flowables / “cards”

1. **Card pattern A (EG now):** canvas `rect`/`roundRect` + fill/stroke = absolute-position cards (full control for premium layout).
2. **Card pattern B:** `Table` + `TableStyle([('BOX',...), ('BACKGROUND',...), ('TEXTCOLOR',...), ('TOPPADDING'/BOTTOM...)])` — flowable cards that reflow.
3. **Grouping:** `KeepTogether([...])` so a card doesn’t split across pages; `Spacer` for rhythm.
4. **KeepInFrame** exists (RML/docs) for overflow control; Python Platypus has related keep-in-frame utilities — prefer KeepTogether for simple cards.

### python-telegram-bot — deliver PDF in funnel

1. **`await bot.send_document(chat_id=..., document=...)`** where `document` can be:
   - local path string
   - `pathlib.Path`
   - open binary file object
   - existing Telegram `file_id`
   - HTTP URL
2. Fits lead/level PDF handoff after generation: write PDF to disk/BytesIO → `send_document`.
3. Project: `python-telegram-bot>=21.0` (async API).

### Out of scope this pass

- **weasyprint** — not primary; do not switch stack for Topic PDF skill unless separate decision.

---

## recommended_api_patterns

### A. Premium fixed layout (align with generate_lead_pdf) — RECOMMENDED for EG Topic PDF

```python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont("EGSans", "/path/to/font.ttf"))
# optional family for future Platypus:
# registerFontFamily("EGSans", normal="EGSans", bold="EGSansBd", ...)

c = canvas.Canvas(out_path, pagesize=A4)
w, h = A4
c.setFillColorRGB(0.07, 0.11, 0.14)  # graphite bg
c.rect(0, 0, w, h, fill=1, stroke=0)
c.setFillColorRGB(0.0, 0.85, 1.0)    # cyan accent example
c.setFont("EGSans", 14)
c.drawString(x, y, "…")
c.save()
```

### B. Flowable “cards” (multi-page topic guides)

```python
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, KeepTogether
from reportlab.lib import colors
from reportlab.lib.colors import Color

BG = Color(0.07, 0.11, 0.14)
CARD = Color(0.09, 0.14, 0.18)
CYAN = Color(0.0, 0.75, 0.95)
WHITE = colors.white

card = Table([[Paragraph("…", style)]], colWidths=[content_w])
card.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), CARD),
    ("TEXTCOLOR", (0, 0), (-1, -1), WHITE),
    ("BOX", (0, 0), (-1, -1), 0.5, CYAN),
    ("LEFTPADDING", (0, 0), (-1, -1), 12),
    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
    ("TOPPADDING", (0, 0), (-1, -1), 10),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
]))
story.append(KeepTogether([card, Spacer(1, 12)]))
# paint page BG in onFirstPage/onLaterPages via canvas.setFillColorRGB + rect
```

### C. Funnel delivery

```python
await context.bot.send_document(
    chat_id=update.effective_chat.id,
    document=str(pdf_path),  # or Path / BytesIO with filename=
    caption="…",
)
```

---

## sources / versions

| Library | Context7 ID | Repo constraint | Docs surface |
|---------|-------------|-----------------|--------------|
| ReportLab | `/websites/reportlab` | `reportlab>=4.0.0` | docs.reportlab.com userguide ch2/ch3/ch5/ch7/ch9 |
| python-telegram-bot | `/python-telegram-bot/python-telegram-bot` (versions incl. v22.5) | `>=21.0` | wiki Working-with-Files-and-Media |

**Freshness note:** Context7 live docs pull; official ReportLab userguide URLs above. No weasyprint sources.

---

## confidence

| Area | Level | Why |
|------|-------|-----|
| Canvas fonts / RGB dark theme | **high** | Official userguide citations; matches EG code |
| Platypus Table card pattern | **high** | Official TableStyle docs |
| HexColor helper | **medium** | Not in this Context7 return; Color(r,g,b) / setFillColorRGB verified |
| roundRect glow cards | **medium** | EG code uses; not in Context7 snippets this pass |
| PTB send_document | **high** | Official wiki patterns; async matches v21+ |
| weasyprint | **n/a** | Explicitly out of pass |

**Overall confidence:** **high** for ReportLab canvas+RGB+Platypus Table + PTB send_document as primary stack for EG Topic PDF skill.
