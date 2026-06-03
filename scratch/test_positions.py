import fitz
import re

doc = fitz.open("downloads/life-science/june-2025/exam.pdf")
q_positions = {}
max_q = 85
for page_idx in range(len(doc)):
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        x0, y0, x1, y1, text, block_no, block_type = b
        text_clean = text.strip()
        m = re.match(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d]|[a-z]{2,})', text_clean)
        if m:
            q_start = int(m.group(1))
            q_end = int(m.group(2)) if m.group(2) else q_start
            if 1 <= q_start <= max_q and 1 <= q_end <= max_q:
                for q_num in range(q_start, q_end + 1):
                    if q_num not in q_positions:
                        q_positions[q_num] = (page_idx, text_clean)
                        
for q in sorted(q_positions.keys()):
    print(f"Q{q}: Page {q_positions[q][0]} -> matched text: {repr(q_positions[q][1])}")
doc.close()
