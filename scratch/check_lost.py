import fitz
import re
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

lost_cases = [
    ("algebra-1", "january-2018", [65, 75]),
    ("algebra-1", "june-2025", [56]),
    ("geometry", "june-2018", [13]),
    ("geometry", "january-2024", [50, 85]),
    ("geometry", "june-2024", [38]),
]

for subject, session, q_nums in lost_cases:
    pdf_path = os.path.join(DOWNLOADS_DIR, subject, session, "exam.pdf")
    if not os.path.exists(pdf_path):
        continue
    print(f"\n--- {subject}/{session} ---")
    doc = fitz.open(pdf_path)
    for q_num in q_nums:
        found = False
        for page_idx in range(len(doc)):
            page = doc[page_idx]
            blocks = page.get_text("blocks")
            for b in blocks:
                text = b[4].strip()
                # Check if block contains the number at the beginning of a line (possibly after whitespace/newlines)
                if re.search(r'(?:^|\n)' + str(q_num) + r'\b', text):
                    print(f"Page {page_idx+1}:")
                    print(repr(text[:200]))
                    found = True
        if not found:
            print(f"Could not find any block containing Q{q_num}")
    doc.close()
