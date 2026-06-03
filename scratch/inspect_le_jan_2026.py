import fitz
import re

doc = fitz.open("downloads/living-environment/january-2026/exam.pdf")
print(f"Total pages: {len(doc)}")

# Search for blocks starting with 49
for page_idx in range(len(doc)):
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        x0, y0, x1, y1, text, block_no, block_type = b
        text_clean = text.strip()
        if re.search(r'\b49\b', text_clean):
            print(f"Page {page_idx+1}: {b}")
doc.close()
