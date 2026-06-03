import fitz
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

pdf_path = os.path.join(DOWNLOADS_DIR, "living-environment", "june-2010", "exam.pdf")
doc = fitz.open(pdf_path)
for page_idx in [1, 2]:
    print(f"\n--- Page {page_idx+1} ---")
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        print(repr(b[4].strip()))
doc.close()
