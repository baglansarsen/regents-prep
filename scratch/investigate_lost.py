import os
import re
import fitz

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

old_pattern = re.compile(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d]|[a-z]{2,})')
new_pattern = re.compile(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d\u2018\u2019])')

examples = [
    ("algebra-2", "january-2018", 1),
    ("algebra-1", "january-2018", 65),
    ("algebra-1", "june-2025", 56),
    ("geometry", "june-2018", 13),
]

for subject, session, target_q in examples:
    pdf_path = os.path.join(DOWNLOADS_DIR, subject, session, "exam.pdf")
    if not os.path.exists(pdf_path):
        print(f"Skipping {subject}/{session} (no PDF)")
        continue
    
    print(f"\n--- Investigating {subject}/{session} for Q{target_q} ---")
    doc = fitz.open(pdf_path)
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        blocks = page.get_text("blocks")
        for b in blocks:
            x0, y0, x1, y1, text, block_no, block_type = b
            text_clean = text.strip()
            # Apply Note: strip
            text_clean = re.sub(
                r'^Note:\s+The\s+answers?\s+to\s+questions?\s+\d+(?:\s+(?:through|and|to)\s+\d+)?\s+should\s+be\s+recorded\s+on\s+(?:your\s+)?separate\s+answer\s+sheet\.?\s*',
                '',
                text_clean,
                flags=re.IGNORECASE | re.DOTALL
            ).strip()
            
            m_old = old_pattern.match(text_clean)
            if m_old:
                q_start = int(m_old.group(1))
                q_end = int(m_old.group(2)) if m_old.group(2) else q_start
                if q_start <= target_q <= q_end:
                    print(f"Old pattern matched page {page_idx+1}:")
                    print(repr(text_clean[:100]))
                    m_new = new_pattern.match(text_clean)
                    if m_new:
                        print("New pattern ALSO matched!")
                    else:
                        print("New pattern DID NOT match.")
    doc.close()
