import fitz
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_path = os.path.join(PROJECT_ROOT, "downloads", "algebra-2", "june-2018", "exam.pdf")
doc = fitz.open(pdf_path)
page = doc[1]  # Page 2
blocks = page.get_text("blocks")
for b in blocks:
    print(f"y: [{b[1]:.2f}, {b[3]:.2f}], x: [{b[0]:.2f}, {b[2]:.2f}]")
    print(repr(b[4]))
    print("-" * 50)
doc.close()
