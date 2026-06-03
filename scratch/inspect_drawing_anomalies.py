import fitz
import os
import re

pdf_path = "downloads/living-environment/june-2025/exam.pdf"
if os.path.exists(pdf_path):
    doc = fitz.open(pdf_path)
    # Find page for Q77
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        text = page.get_text()
        if re.search(r'\b77\b', text):
            print(f"Page {page_idx+1} contains '77'")
            drawings = page.get_drawings()
            print(f"Total drawings on page {page_idx+1}: {len(drawings)}")
            for idx, d in enumerate(drawings):
                print(f"Drawing {idx}: rect={d['rect']}, type={d.get('type')}")
    doc.close()
