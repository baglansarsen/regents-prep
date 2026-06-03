import fitz
import os
import re
from PIL import Image

# Import get_question_positions_blocks from scripts/regents_parser
import sys
sys.path.append(os.path.abspath("scripts"))
from regents_parser import get_question_positions_blocks, rect_belongs_to_col

doc = fitz.open("downloads/algebra-2/june-2019/exam.pdf")
positions = get_question_positions_blocks(doc, max_q=85)

q_num = 26
if q_num in positions:
    pos = positions[q_num]
    page_idx = pos['page_idx']
    x0, y0, x1, y_bottom = pos['x0'], pos['y0'], pos['x1'], pos['y_bottom']
    print(f"Q26 pos: page_idx={page_idx}, x0={x0}, y0={y0}, x1={x1}, y_bottom={y_bottom}")
    
    page = doc[page_idx]
    pw = page.rect.width
    ph = page.rect.height
    is_two_col = any(p['page_idx'] == page_idx and p['x0'] > 250 for p in positions.values())
    print(f"page size: {pw}x{ph}, is_two_col={is_two_col}")
    
    if is_two_col:
        if x0 < 250:
            col_x0 = 30
            col_x1 = pw / 2 + 5
        else:
            col_x0 = pw / 2 - 5
            col_x1 = pw - 30
    else:
        col_x0 = 30
        col_x1 = pw - 30
        
    print(f"Column bounds: {col_x0} to {col_x1}")
    
    # Let's find triggers
    triggers = []
    for path in page.get_drawings():
        r = path['rect']
        if r.y1 < 45 or r.y0 > ph - 45:
            continue
        if r.height < 3 and r.width > pw * 0.7:
            continue
        if r.y0 >= y0 - 5 and r.y1 <= y_bottom + 5:
            belongs = rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col)
            print(f"Drawing: rect={r}, size={r.width:.1f}x{r.height:.1f}, belongs={belongs}")
            if belongs:
                triggers.append(r)
                
    print(f"Total triggers: {len(triggers)}")
doc.close()
