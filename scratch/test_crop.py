import fitz
import os
import re

dest_dir = "scratch/test_crops"
os.makedirs(dest_dir, exist_ok=True)

def get_question_positions_blocks(doc, max_q=85):
    q_positions = {} # q_num -> (page_idx, x0, y0, x1, y1)
    
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        blocks = page.get_text("blocks")
        for b in blocks:
            x0, y0, x1, y1, text, block_no, block_type = b
            text_clean = text.strip()
            # Look for number at the start of a block
            m = re.match(r'^(\d+)\s+([A-Z]|["\'`\(]|[a-z]{2,})', text_clean)
            if m:
                q_num = int(m.group(1))
                if 1 <= q_num <= max_q:
                    # Keep the first block found for each question number
                    if q_num not in q_positions:
                        q_positions[q_num] = (page_idx, x0, y0, x1, y1)
                        
    # Now compute the bounding box (y_bottom and x bounds) for each question
    positions = {}
    sorted_qs = sorted(q_positions.keys())
    page_heights = [doc[i].rect.height for i in range(len(doc))]
    
    for i, q_num in enumerate(sorted_qs):
        page_idx, x0, y0, x1, y1 = q_positions[q_num]
        
        # Find y_bottom:
        # Scan other questions on the same page to find the next one in the SAME column
        # "Same column" means |x0 - other_x0| < 80
        y_bottom = page_heights[page_idx] - 50 # Default to bottom of page column
        
        for other_q in sorted_qs:
            if other_q <= q_num:
                continue
            other_page, other_x0, other_y0, other_x1, other_y1 = q_positions[other_q]
            if other_page == page_idx:
                # Is it in the same column and below the current question?
                if abs(other_x0 - x0) < 80 and other_y0 > y0:
                    y_bottom = min(y_bottom, other_y0)
                    break
                    
        # Set bounds
        positions[q_num] = {
            'page_idx': page_idx,
            'x0': x0,
            'y0': y0,
            'x1': x1,
            'y1': y1,
            'y_bottom': y_bottom
        }
        
    return positions

def find_diagram_rects_in_col(page, x0, y0, x1, y_bottom):
    diagram_rects = []
    col_rect = fitz.Rect(x0 - 10, y0 - 5, x1 + 10, y_bottom + 10)
    
    # Check images
    for img in page.get_images(full=True):
        xref = img[0]
        for r in page.get_image_rects(xref):
            # Check if image intersects column rect
            if col_rect.contains(r) or (r.y0 >= y0 - 5 and r.y1 <= y_bottom + 10 and min(r.x1, x1) > max(r.x0, x0)):
                if r.width > 15 and r.height > 15:
                    diagram_rects.append(r)
                        
    # Check drawings
    for path in page.get_drawings():
        r = path['rect']
        if r.y0 >= y0 - 5 and r.y1 <= y_bottom + 10:
            # Must overlap horizontally with column
            if min(r.x1, x1) > max(r.x0, x0) - 20:
                if r.width > 12 and r.height > 12:
                    # Ignore headers / footers
                    if r.y0 > 50 and r.y1 < page.rect.height - 50:
                        # Ignore lines (height/width < 3)
                        if r.height > 3 and r.width > 3:
                            # Must not be full-width page divider
                            if r.width < page.rect.width * 0.9:
                                diagram_rects.append(r)
                        
    return diagram_rects

# Run it
doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
positions = get_question_positions_blocks(doc, max_q=85)
print(f"Mapped {len(positions)} question coordinates in PDF.")

cropped_count = 0
for q_num, info in sorted(positions.items()):
    page_idx = info['page_idx']
    x0, y0, x1, y_bottom = info['x0'], info['y0'], info['x1'], info['y_bottom']
    page = doc[page_idx]
    
    rects = find_diagram_rects_in_col(page, x0, y0, x1, y_bottom)
    if rects:
        # Bounding box union
        rx0 = min(r.x0 for r in rects)
        ry0 = min(r.y0 for r in rects)
        rx1 = max(r.x1 for r in rects)
        ry1 = max(r.y1 for r in rects)
        
        pad = 6
        clip = fitz.Rect(max(0, rx0 - pad), max(0, ry0 - pad), min(page.rect.width, rx1 + pad), min(page.rect.height, ry1 + pad))
        
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat, clip=clip, colorspace=fitz.csRGB)
        
        img_path = os.path.join(dest_dir, f"q{q_num}.png")
        pix.save(img_path)
        print(f"  ✓ Q{q_num}: Cropped diagram saved to {img_path} (dim: {pix.width}x{pix.height})")
        cropped_count += 1
        
print(f"Total cropped: {cropped_count}")
doc.close()
