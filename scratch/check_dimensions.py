import fitz
import re
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_path = os.path.join(PROJECT_ROOT, "downloads", "life-science", "june-2025", "exam.pdf")
doc = fitz.open(pdf_path)

# Let's search for "Base your answers to questions 1 through 5"
header_text = "Base your answers to questions 1 through 5"
header_page = -1
for page_idx in range(len(doc)):
    if doc[page_idx].search_for(header_text):
        header_page = page_idx
        break

print(f"Header page: {header_page + 1 if header_page != -1 else 'Not found'}")

# Let's find Q1 position
# We'll use the new regex search pattern
new_search_pattern = re.compile(r'(?:^|\n)(1)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d\u2018\u2019])')
q1_page = -1
q1_y0 = -1

for page_idx in range(len(doc)):
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4].strip()
        # Clean Note: and Use this space:
        text_clean = re.sub(
            r'^Note:\s+The\s+answers?\s+to\s+questions?\s+\d+(?:\s+(?:through|and|to)\s+\d+)?\s+should\s+be\s+recorded\s+on\s+(?:your\s+)?separate\s+answer\s+sheet\.?\s*',
            '',
            text,
            flags=re.IGNORECASE | re.DOTALL
        ).strip()
        text_clean = re.sub(
            r'^Use\s+this\s+space\s+for\s+computations\.?\s*',
            '',
            text_clean,
            flags=re.IGNORECASE | re.DOTALL
        ).strip()
        
        m = new_search_pattern.search(text_clean)
        if m:
            q1_page = page_idx
            q1_y0 = b[1]
            print(f"Found Q1 on page {page_idx+1} at y0={q1_y0:.2f}")
            print(repr(text[:100]))
            break
    if q1_page != -1:
        break

# Let's print the actual text blocks on Page 2 that are in the crop region
# From context header to Q1 start
print("\n--- Blocks on page 2 in the crop region ---")
page = doc[1]
blocks = page.get_text("blocks")
for b in blocks:
    y0, y1 = b[1], b[3]
    if y0 >= 46.06 and y1 <= q1_y0:
        print(f"y: [{y0:.2f}, {y1:.2f}] -> {repr(b[4].strip())}")

doc.close()
