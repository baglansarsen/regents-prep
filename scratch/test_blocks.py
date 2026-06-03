import fitz
import re

doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
# Let's inspect page 2
page = doc[1]
blocks = page.get_text("blocks")
print(f"Total blocks on page 2: {len(blocks)}")
for b in blocks:
    x0, y0, x1, y1, text, block_no, block_type = b
    text_clean = text.strip().replace('\n', ' ')
    print(f"Block {block_no} (x0={x0:.1f}, y0={y0:.1f}, x1={x1:.1f}, y1={y1:.1f}): {text_clean[:100]}")
doc.close()
