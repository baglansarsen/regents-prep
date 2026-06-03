import fitz
import os
import re
from test_crop import get_question_positions_blocks, find_diagram_rects_in_col

# Setup paths
dest_dir = "scratch/test_crops_v2"
os.makedirs(dest_dir, exist_ok=True)

# Open PDF
doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
positions = get_question_positions_blocks(doc, max_q=85)
print(f"Mapped {len(positions)} question coordinates in PDF.")

# Let's crop Q50
q_num = 50
if q_num in positions:
    info = positions[q_num]
    page_idx = info['page_idx']
    x0, y0, x1, y_bottom = info['x0'], info['y0'], info['x1'], info['y_bottom']
    page = doc[page_idx]
    pw = page.rect.width
    ph = page.rect.height
    
    # Check if page is two-column
    is_two_col = any(pos['page_idx'] == page_idx and pos['x0'] > 250 for pos in positions.values())
    
    rects = find_diagram_rects_in_col(page, x0, y0, x1, y_bottom)
    if rects:
        rx0 = min(r.x0 for r in rects)
        ry0 = min(r.y0 for r in rects)
        rx1 = max(r.x1 for r in rects)
        ry1 = max(r.y1 for r in rects)
        
        # Determine horizontal bounds based on column
        if is_two_col:
            if x0 < 250:
                cx0 = 30
                cx1 = pw / 2 + 5
            else:
                cx0 = pw / 2 - 5
                cx1 = pw - 30
        else:
            cx0 = 30
            cx1 = pw - 30
            
        # Expand bounds to include drawing fully if it goes wider
        cx0 = min(cx0, rx0 - 8)
        cx1 = max(cx1, rx1 + 8)
        
        cy0 = ry0 - 8
        cy1 = ry1 + 8
        
        clip = fitz.Rect(max(0, cx0), max(0, cy0), min(pw, cx1), min(ph, cy1))
        
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat, clip=clip, colorspace=fitz.csRGB)
        
        img_path = os.path.join(dest_dir, f"q{q_num}.png")
        pix.save(img_path)
        print(f"  ✓ Q{q_num}: Cropped diagram saved to {img_path} (dim: {pix.width}x{pix.height})")
        
doc.close()
