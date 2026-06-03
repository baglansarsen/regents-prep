import fitz
import os
import re
from PIL import Image

dest_dir = "scratch/test_crops_v3"
os.makedirs(dest_dir, exist_ok=True)

def get_question_positions_blocks(doc, max_q=85):
    q_positions = {}
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        blocks = page.get_text("blocks")
        for b in blocks:
            x0, y0, x1, y1, text, block_no, block_type = b
            text_clean = text.strip()
            m = re.match(r'^(\d+)\s+([A-Z]|["\'`\(]|[a-z]{2,})', text_clean)
            if m:
                q_num = int(m.group(1))
                if 1 <= q_num <= max_q:
                    if q_num not in q_positions:
                        q_positions[q_num] = (page_idx, x0, y0, x1, y1)
    positions = {}
    sorted_qs = sorted(q_positions.keys())
    page_heights = [doc[i].rect.height for i in range(len(doc))]
    for i, q_num in enumerate(sorted_qs):
        page_idx, x0, y0, x1, y1 = q_positions[q_num]
        y_bottom = page_heights[page_idx] - 50
        for other_q in sorted_qs:
            if other_q <= q_num:
                continue
            other_page, other_x0, other_y0, other_x1, other_y1 = q_positions[other_q]
            if other_page == page_idx:
                if abs(other_x0 - x0) < 80 and other_y0 > y0:
                    y_bottom = min(y_bottom, other_y0)
                    break
        positions[q_num] = {
            'page_idx': page_idx,
            'x0': x0,
            'y0': y0,
            'x1': x1,
            'y1': y1,
            'y_bottom': y_bottom
        }
    return positions

def rect_belongs_to_col(r, col_x0, col_x1, page_w, is_two_col):
    if not is_two_col:
        return True
    mid = page_w / 2
    if r.x0 < mid - 20 and r.x1 > mid + 20 and r.width > page_w * 0.4:
        return True
    overlap = min(r.x1, col_x1) - max(r.x0, col_x0)
    if overlap > 5:
        return True
    if r.x0 >= col_x0 - 15 and r.x1 <= col_x1 + 15:
        return True
    return False

def find_diagram_rects_and_crop(doc, q_start, q_end, page_idx, y_min, y_max, ref_x0, ref_x1, is_two_col, output_name, positions):
    page = doc[page_idx]
    pw = page.rect.width
    ph = page.rect.height
    
    if is_two_col:
        if ref_x0 < 250:
            col_x0 = 30
            col_x1 = pw / 2 + 5
        else:
            col_x0 = pw / 2 - 5
            col_x1 = pw - 30
    else:
        col_x0 = 30
        col_x1 = pw - 30

    triggers = []
    
    # Images
    for img in page.get_images(full=True):
        xref = img[0]
        for r in page.get_image_rects(xref):
            if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
                if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                    if r.width > 15 and r.height > 15:
                        triggers.append(r)
                        
    # Drawings
    for path in page.get_drawings():
        r = path['rect']
        if r.y1 < 45 or r.y0 > ph - 45:
            continue
        # Ignore horizontal line triggers that are full page width dividers
        if r.height < 3 and r.width > pw * 0.7:
            continue
        if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
            if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                triggers.append(r)
                    
    if not triggers:
        print(f"No triggers found on page {page_idx} for {output_name}")
        return None

    all_elements = []
    
    # Images
    for img in page.get_images(full=True):
        xref = img[0]
        for r in page.get_image_rects(xref):
            if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
                if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                    all_elements.append(r)
                    
    # Drawings
    for path in page.get_drawings():
        r = path['rect']
        if r.y1 < 45 or r.y0 > ph - 45:
            continue
        if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
            if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                all_elements.append(r)
                
    if not all_elements:
        return None
        
    rx0 = min(r.x0 for r in all_elements)
    ry0 = min(r.y0 for r in all_elements)
    rx1 = max(r.x1 for r in all_elements)
    ry1 = max(r.y1 for r in all_elements)
    
    # Expand with text blocks
    blocks = page.get_text("blocks")
    for b in blocks:
        tx0, ty0, tx1, ty1, text, block_no, block_type = b
        if ty1 < 45 or ty0 > ph - 45:
            continue
        vertical_close = (max(ry0, ty0) <= min(ry1, ty1)) or (ty0 >= ry0 - 20 and ty1 <= ry1 + 20)
        if vertical_close:
            horizontal_close = (max(rx0, tx0) <= min(rx1, tx1)) or (tx0 >= rx0 - 50 and tx1 <= rx1 + 50)
            if horizontal_close:
                rx0 = min(rx0, tx0)
                ry0 = min(ry0, ty0)
                rx1 = max(rx1, tx1)
                ry1 = max(ry1, ty1)
                
    margin = 8
    cx0 = max(0, rx0 - margin)
    cy0 = max(0, ry0 - margin)
    cx1 = min(pw, rx1 + margin)
    cy1 = min(ph, ry1 + margin)
    
    clip = fitz.Rect(cx0, cy0, cx1, cy1)
    mat = fitz.Matrix(2.0, 2.0)
    pix = page.get_pixmap(matrix=mat, clip=clip, colorspace=fitz.csRGB)
    
    img_path = os.path.join(dest_dir, f"{output_name}_p{page_idx}.png")
    pix.save(img_path)
    print(f"✓ Cropped page {page_idx} for {output_name} saved to {img_path} ({pix.width}x{pix.height})")
    
    # Return as PIL Image
    return Image.open(img_path)

doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
positions = get_question_positions_blocks(doc, max_q=85)

# Test Q52-54 context (which is on page 7)
q_start = 52
q_end = 54
header_page = 7
q_start_page = 7

# Find y_start for the header
page = doc[header_page]
rects = page.search_for("Base your answers to questions 52 through 54")
y_start = rects[0].y1 if rects else 0
y_end = positions[q_start]['y0'] if q_start in positions else page.rect.height

# Check is_two_col
is_two_col = any(pos['page_idx'] == header_page and pos['x0'] > 250 for pos in positions.values())

ref_x0 = positions[q_start]['x0'] if q_start in positions else 0
ref_x1 = positions[q_start]['x1'] if q_start in positions else page.rect.width

print(f"Q52-54: y_start={y_start}, y_end={y_end}, ref_x0={ref_x0}, is_two_col={is_two_col}")

img = find_diagram_rects_and_crop(doc, q_start, q_end, header_page, y_start, y_end, ref_x0, ref_x1, is_two_col, "context_52_54", positions)

doc.close()
