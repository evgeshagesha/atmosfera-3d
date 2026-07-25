"""Load all .md and .txt files from knowledge_base into one string for the AI."""
from pathlib import Path

def load_knowledge_base(dir_path: Path) -> str:
    if not dir_path.exists():
        return ""
    parts = []
    for ext in ("*.md", "*.txt"):
        for f in sorted(dir_path.glob(ext)):
            try:
                text = f.read_text(encoding="utf-8").strip()
                if text:
                    parts.append(f"--- {f.name} ---\n{text}")
            except Exception:
                continue
    return "\n\n".join(parts) if parts else ""
