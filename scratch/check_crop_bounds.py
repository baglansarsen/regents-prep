import fitz
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_path = os.path.join(PROJECT_ROOT, "downloads", "life-science", "june-2025", "exam.pdf")
doc = fitz.open(pdf_path)
page = doc[1]  # Page 2

pw = page.rect.width
ph = page.rect.height

# Let's run the exact same logic as regents_parser.py
y_min = 59.94  # after context header
y_max = 541.97  # before Q1

col_x0 = 30
col_x1 = pw - 30

all_elements = []
for img in page.get_images(full=True):
    xref = img[0]
    for r in page.get_image_rects(xref):
        if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
            all_elements.append(r)

for path in page.get_drawings():
    r = path['rect']
    # Filter out page border lines
    if r.x0 < 5 or r.x1 > pw - 5 or r.y0 < 5 or r.y1 > ph - 5:
        continue
    if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
        all_elements.append(r)

if all_elements:
    rx0 = min(r.x0 for r in all_elements)
    ry0 = min(r.y0 for r in all_elements)
    rx1 = max(r.x1 for r in all_elements)
    ry1 = max(r.y1 for r in all_elements)
    print(f"Base drawings/images bounding box: ry0={ry0:.2f}, ry1={ry1:.2f}, rx0={rx0:.2f}, rx1={rx1:.2f}")
    
    # Expand bounding box using close text blocks
    rx0_orig, ry0_orig, rx1_orig, ry1_orig = rx0, ry0, rx1, ry1
    blocks = page.get_text("blocks")
    for b in blocks:
        tx0, ty0, tx1, ty1, text, block_no, block_type = b
        if ty1 < 45 or ty0 > ph - 45:
            continue
        
        vertical_close = (max(ry0, ty0) <= min(ry1, ty1)) or (ty0 >= ry0 - 20 and ty1 <= ry1 + 20)
        horizontal_close = (max(rx0, tx0) <= min(rx1, tx1)) or (tx0 >= rx0 - 50 and tx1 <= rx1 + 50)
        
        if vertical_close and horizontal_close:
            rx0 = min(rx0, tx0)
            ry0 = min(ry0, ty0)
            rx1 = max(rx1, tx1)
            ry1 = max(ry1, ty1)
            
    margin = 8
    cx0 = max(0, rx0 - margin)
    cy0 = max(0, ry0 - margin)
    cx1 = min(pw, rx1 + margin)
    cy1 = min(ph, ry1 + margin)
    print(f"Final crop box: cy0={cy0:.2f}, cy1={cy1:.2f}, cx0={cx0:.2f}, cx1={cx1:.2f}")
    
    # Check if 'Kelp carbon pool' block (y=[484.39, 510.45]) is inside the crop box
    print(f"Is 'Kelp carbon pool' (y=[484.39, 510.45]) inside? {cy0 <= 484.39 and cy1 >= 510.45}")

doc.close()
