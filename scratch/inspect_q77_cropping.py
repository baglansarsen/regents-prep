import fitz
import os
import sys

sys.path.append(os.path.abspath("scripts"))
from regents_parser import get_question_positions_blocks, rect_belongs_to_col

doc = fitz.open("downloads/living-environment/june-2025/exam.pdf")
positions = get_question_positions_blocks(doc, max_q=85)

q_num = 77
if q_num in positions:
    pos = positions[q_num]
    page_idx = pos['page_idx']
    x0, y0, x1, y_bottom = pos['x0'], pos['y0'], pos['x1'], pos['y_bottom']
    print(f"Q77 pos: page_idx={page_idx}, x0={x0}, y0={y0}, x1={x1}, y_bottom={y_bottom}")
    
    page = doc[page_idx]
    pw = page.rect.width
    ph = page.rect.height
    is_two_col = any(p['page_idx'] == page_idx and p['x0'] > 250 for p in positions.values())
    print(f"page size: {pw}x{ph}, is_two_col={is_two_col}")
    
    # Let's find what triggers and all_elements were collected
    triggers = []
    all_elements = []
    
    col_x0 = 30
    col_x1 = pw - 30
    
    for path in page.get_drawings():
        r = path['rect']
        if r.y1 < 45 or r.y0 > ph - 45:
            continue
        if r.height < 3 and r.width > pw * 0.7:
            continue
        if r.y0 >= y0 - 5 and r.y1 <= y_bottom + 5:
            print(f"Drawing in vertical range: {r}, size={r.width:.1f}x{r.height:.1f}")
            triggers.append(r)
            all_elements.append(r)
            
    print(f"Total triggers: {len(triggers)}")
    if all_elements:
        rx0 = min(r.x0 for r in all_elements)
        ry0 = min(r.y0 for r in all_elements)
        rx1 = max(r.x1 for r in all_elements)
        ry1 = max(r.y1 for r in all_elements)
        print(f"Bounding box: [{rx0:.1f}, {ry0:.1f}, {rx1:.1f}, {ry1:.1f}]")
doc.close()
