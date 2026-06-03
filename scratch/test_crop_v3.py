import fitz
import os
import re
from PIL import Image

dest_dir = "scratch/test_crops_v3"
os.makedirs(dest_dir, exist_ok=True)

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

def find_diagram_rects_and_crop(doc, q_start, q_end, page_idx, y_min, y_max, ref_x0, ref_x1, is_two_col, output_name):
    page = doc[page_idx]
    pw = page.rect.width
    ph = page.rect.height
    
    # Define column horizontal bounds
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

    # 1. Look for triggers
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
        # Ignore headers / footers
        if r.y1 < 45 or r.y0 > ph - 45:
            continue
        # Ignore horizontal line triggers that are full page width dividers
        if r.height < 3 and r.width > pw * 0.5:
            continue
            
        if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
            if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                if r.width > 8 and r.height > 8:
                    triggers.append(r)
                    
    if not triggers:
        print(f"No triggers found for {output_name}")
        return None

    # 2. Collect ALL drawings and images in range (including thin lines/grid ticks)
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
    
    # 3. Expand with text blocks to include labels/captions/legends
    blocks = page.get_text("blocks")
    for b in blocks:
        tx0, ty0, tx1, ty1, text, block_no, block_type = b
        # Ignore headers/footers
        if ty1 < 45 or ty0 > ph - 45:
            continue
        # Check if text is close to drawings vertically and horizontally
        vertical_close = (max(ry0, ty0) <= min(ry1, ty1)) or (ty0 >= ry0 - 20 and ty1 <= ry1 + 20)
        if vertical_close:
            horizontal_close = (max(rx0, tx0) <= min(rx1, tx1)) or (tx0 >= rx0 - 50 and tx1 <= rx1 + 50)
            if horizontal_close:
                rx0 = min(rx0, tx0)
                ry0 = min(ry0, ty0)
                rx1 = max(rx1, tx1)
                ry1 = max(ry1, ty1)
                
    # 4. Crop image
    margin = 8
    cx0 = max(0, rx0 - margin)
    cy0 = max(0, ry0 - margin)
    cx1 = min(pw, rx1 + margin)
    cy1 = min(ph, ry1 + margin)
    
    clip = fitz.Rect(cx0, cy0, cx1, cy1)
    mat = fitz.Matrix(2.0, 2.0)
    pix = page.get_pixmap(matrix=mat, clip=clip, colorspace=fitz.csRGB)
    
    img_path = os.path.join(dest_dir, f"{output_name}.png")
    pix.save(img_path)
    print(f"✓ Cropped {output_name} saved to {img_path} ({pix.width}x{pix.height})")
    return img_path

# Test on Chemistry January 2026 Q52-54 context
doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")

# We can manually find pages for Q52 and Q55
# Or search full text to see what matches
full_text = ""
page_start_indices = []
for page_idx, page in enumerate(doc):
    page_start_indices.append(len(full_text))
    full_text += page.get_text() + "\n"

# Search for the context blocks
pattern = re.compile(r'(Base your answers? to questions?\s+(\d+)(?:[\s\S]*?\b(\d+)\b)?\s+on\s+)', re.IGNORECASE)
for m in pattern.finditer(full_text):
    print(f"Match: {m.group(1).strip()} -> Start Q: {m.group(2)}, End Q: {m.group(3)}")
    q_start = int(m.group(2))
    q_end = int(m.group(3)) if m.group(3) else q_start
    
    # Find pages
    header_page = 0
    for idx, start in enumerate(page_start_indices):
        if m.start() >= start:
            header_page = idx
            
    print(f"Header Page: {header_page}")

doc.close()
