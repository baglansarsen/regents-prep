import fitz
import re
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

remaining_lost = [
    ("algebra-2", "june-2018", [1]),
    ("living-environment", "june-2010", [1]),
]

for subject, session, q_nums in remaining_lost:
    pdf_path = os.path.join(DOWNLOADS_DIR, subject, session, "exam.pdf")
    if not os.path.exists(pdf_path):
        continue
    print(f"\n--- {subject}/{session} ---")
    doc = fitz.open(pdf_path)
    for q_num in q_nums:
        # Let's print blocks on early pages that contain the question number
        for page_idx in range(min(5, len(doc))):
            page = doc[page_idx]
            blocks = page.get_text("blocks")
            for b in blocks:
                text = b[4].strip()
                if re.search(r'(?:^|\n)' + str(q_num) + r'\b', text):
                    print(f"Page {page_idx+1}:")
                    print(repr(text))
    doc.close()
