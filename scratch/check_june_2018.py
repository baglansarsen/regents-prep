import fitz
import re
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

old_pattern = re.compile(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d]|[a-z]{2,})')

pdf_path = os.path.join(DOWNLOADS_DIR, "algebra-2", "june-2018", "exam.pdf")
doc = fitz.open(pdf_path)
for page_idx in range(len(doc)):
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4].strip()
        m = old_pattern.match(text)
        if m:
            q_start = int(m.group(1))
            if q_start == 1:
                print(f"Old pattern matched page {page_idx+1}:")
                print(repr(text))
doc.close()
