import fitz
import re
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_path = os.path.join(PROJECT_ROOT, "downloads", "life-science", "june-2025", "exam.pdf")
doc = fitz.open(pdf_path)

print("Number of pages:", len(doc))
for page_idx in [1, 2, 3]:  # Check pages 2, 3, 4
    if page_idx >= len(doc):
        continue
    print(f"\n--- Page {page_idx+1} ---")
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        print(f"y: [{b[1]:.2f}, {b[3]:.2f}], x: [{b[0]:.2f}, {b[2]:.2f}]")
        print(repr(b[4].strip()))
        print("-" * 50)
doc.close()
