import fitz
import re
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

pdf_path = os.path.join(DOWNLOADS_DIR, "life-science", "january-2026", "exam.pdf")
if os.path.exists(pdf_path):
    print("--- Life Science January 2026 Page 2 Blocks ---")
    doc = fitz.open(pdf_path)
    page = doc[1]  # Page 2
    blocks = page.get_text("blocks")
    for b in blocks:
        x0, y0, x1, y1, text, block_no, block_type = b
        print(f"y: [{y0:.2f}, {y1:.2f}], x: [{x0:.2f}, {x1:.2f}]")
        print(repr(text.strip()))
        print("-" * 40)
    doc.close()
else:
    print("PDF not found!")
