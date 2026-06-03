import fitz
import os
import re

import sys
sys.path.append(os.path.abspath("scripts"))
from regents_parser import get_question_positions_blocks, crop_diagram_region

pdf_path = "downloads/life-science/january-2026/exam.pdf"
doc = fitz.open(pdf_path)

positions = get_question_positions_blocks(doc, max_q=85)

# For Q1-5
q_start = 1
q_end = 5
header_page_idx = 1 # Page 2 (0-indexed 1)
q_start_page_idx = 1

page = doc[header_page_idx]
y_min = 60.0 # bottom of header
y_max = positions[q_start]['y0'] if q_start in positions else page.rect.height
ref_x0 = positions[q_start]['x0'] if q_start in positions else 0
ref_x1 = positions[q_start]['x1'] if q_start in positions else page.rect.width

print(f"Running context crop for Q1-5: y_min={y_min}, y_max={y_max}, ref_x0={ref_x0}, ref_x1={ref_x1}")

# Check if file is created
temp_path = "scratch/temp_context_1_5_test.png"
if os.path.exists(temp_path):
    os.remove(temp_path)

img = crop_diagram_region(page, y_min, y_max, ref_x0, ref_x1, False, temp_path)
print(f"Resulting image object: {img}")
if img:
    print(f"Image size: {img.size}")
    print(f"Temp file exists: {os.path.exists(temp_path)}")

doc.close()
