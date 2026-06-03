import fitz
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_path = os.path.join(PROJECT_ROOT, "downloads", "life-science", "june-2025", "exam.pdf")
doc = fitz.open(pdf_path)
page = doc[1]  # Page 2

pw = page.rect.width
ph = page.rect.height

y_min = 59.94
y_max = 541.97

all_elements = []
for img in page.get_images(full=True):
    xref = img[0]
    for r in page.get_image_rects(xref):
        if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
            all_elements.append(r)

for path in page.get_drawings():
    r = path['rect']
    if r.x0 < 5 or r.x1 > pw - 5 or r.y0 < 5 or r.y1 > ph - 5:
        continue
    if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
        all_elements.append(r)

rx0 = min(r.x0 for r in all_elements)
ry0 = min(r.y0 for r in all_elements)
rx1 = max(r.x1 for r in all_elements)
ry1 = max(r.y1 for r in all_elements)

base_x0, base_y0, base_x1, base_y1 = rx0, ry0, rx1, ry1

blocks = page.get_text("blocks")
for b in blocks:
    tx0, ty0, tx1, ty1, text, block_no, block_type = b
    if ty1 < 45 or ty0 > ph - 45:
        continue
    # Gap-based vertical distance to ORIGINAL drawing box
    if ty0 >= base_y1:
        v_dist = ty0 - base_y1
    elif ty1 <= base_y0:
        v_dist = base_y0 - ty1
    else:
        v_dist = 0
        
    # Gap-based horizontal distance
    if tx0 >= base_x1:
        h_dist = tx0 - base_x1
    elif tx1 <= base_x0:
        h_dist = base_x0 - tx1
    else:
        h_dist = 0
        
    if v_dist <= 30 and h_dist <= 50:
        rx0 = min(rx0, tx0)
        ry0 = min(ry0, ty0)
        rx1 = max(rx1, tx1)
        ry1 = max(ry1, ty1)

margin = 8
cx0 = max(0, rx0 - margin)
cy0 = max(0, ry0 - margin)
cx1 = min(pw, rx1 + margin)
cy1 = min(ph, ry1 + margin)

print(f"Calculated bounds: cy0={cy0:.2f}, cy1={cy1:.2f}, cx0={cx0:.2f}, cx1={cx1:.2f}")
print(f"Is 'Kelp carbon pool' (y=[484.39, 510.45]) inside? {cy0 <= 484.39 and cy1 >= 510.45}")
print(f"Is Q1 (y=541.97) cut off/excluded? {cy1 < 541.97}")

doc.close()
