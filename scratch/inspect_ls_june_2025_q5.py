import fitz
import re
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_path = os.path.join(PROJECT_ROOT, "downloads", "life-science", "june-2025", "exam.pdf")
doc = fitz.open(pdf_path)

for page_idx in range(len(doc)):
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4].strip()
        if re.search(r'(?:^|\n)5\b', text):
            print(f"Page {page_idx+1}: y: [{b[1]:.2f}, {b[3]:.2f}]")
            print(repr(text[:200]))
            print("-" * 50)
doc.close()
