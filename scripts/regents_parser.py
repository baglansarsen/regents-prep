#!/usr/bin/env python3
"""
Parse NYS Regents exams question-by-question:
1. Parse MC answers from scoring_key.pdf
2. Parse written answers from rating_guide.pdf
3. Segment questions, extract text/choices
4. Find context blocks, crop context tables/diagrams
5. Crop question-specific diagrams
6. Save structured JSON to output/data/<subject>/<session>.json
   and images to output/images/<subject>/<session>/
"""

import os
import re
import sys
import json
import argparse
import fitz  # PyMuPDF
from PIL import Image

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "output")
DATA_DIR = os.path.join(OUTPUT_DIR, "data")
IMAGES_DIR = os.path.join(OUTPUT_DIR, "images")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

# ─── KEY PARSERS ──────────────────────────────────────────────────────────────

def parse_mc_answers(sk_path):
    """Extract multiple-choice keys from scoring key PDF."""
    answers = {}
    if not os.path.exists(sk_path):
        return answers
        
    try:
        doc = fitz.open(sk_path)
        full_text = ""
        for page in doc:
            full_text += page.get_text() + "\n"
        doc.close()
        
        # Method 1: Table format (e.g., Physical Setting/Chemistry January '26)
        # Sequence of: Subject, Date, QNum, Key, MC, Credit, Weight
        lines = [l.strip() for l in full_text.split('\n') if l.strip()]
        for i, line in enumerate(lines):
            if line == 'MC' and i - 2 >= 0:
                try:
                    qnum = int(lines[i-2])
                    ans = int(lines[i-1])
                    if 1 <= qnum <= 100 and 1 <= ans <= 4:
                        answers[qnum] = ans
                except ValueError:
                    pass
                    
        # Method 2: Dotted format (e.g., 1 . . . . . 3 . . . . .)
        dotted_matches = re.findall(r'\b(\d{1,2})\s*\.+\s*(\d)\b', full_text)
        for qstr, astr in dotted_matches:
            qnum = int(qstr)
            ans = int(astr)
            if 1 <= qnum <= 100 and 1 <= ans <= 4:
                answers[qnum] = ans
                
        # Method 3: Whitespace split on a line (e.g. "1   3")
        for line in lines:
            m = re.match(r'^(\d{1,2})\s+(\d)$', line)
            if m:
                qnum = int(m.group(1))
                ans = int(m.group(2))
                if 1 <= qnum <= 100 and 1 <= ans <= 4:
                    answers[qnum] = ans
                    
    except Exception as e:
        print(f"Error parsing MC keys: {e}")
        
    return answers

def parse_written_answers(rg_path):
    """Extract answers for written questions from rating guide PDF."""
    answers = {}
    if not os.path.exists(rg_path):
        return answers
        
    try:
        doc = fitz.open(rg_path)
        full_text = ""
        for page in doc:
            full_text += page.get_text() + "\n"
        doc.close()
        
        # Find matches of QNum [Credit] or similar
        # E.g. "51 [1]" or "51\n[1]" or "51. [1]"
        matches = list(re.finditer(r'\b(\d{2,3})\s*\.?\s*\[\d+\]', full_text))
        
        for i, match in enumerate(matches):
            qnum = int(match.group(1))
            start_idx = match.end()
            end_idx = matches[i+1].start() if i + 1 < len(matches) else len(full_text)
            
            ans_text = full_text[start_idx:end_idx].strip()
            # Clean up page numbers, footers
            ans_text = re.sub(r'Rating Guide—.*?\n', '', ans_text, flags=re.IGNORECASE)
            ans_text = re.sub(r'Regents Examination in.*?\n', '', ans_text, flags=re.IGNORECASE)
            ans_text = re.sub(r'\[\d+\]', '', ans_text)
            ans_text = re.sub(r'\s+', ' ', ans_text).strip()
            answers[qnum] = ans_text
            
    except Exception as e:
        print(f"Error parsing written answers: {e}")
        
    return answers

# ─── EXAM PARSER ──────────────────────────────────────────────────────────────

def get_question_positions_blocks(doc, max_q=85):
    """Map question block start and column bounds."""
    q_positions = {}
    
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        blocks = page.get_text("blocks")
        for b in blocks:
            x0, y0, x1, y1, text, block_no, block_type = b
            text_clean = text.strip()
            # Strip leading Note: line if present (e.g. "Note: The answer to question 49...")
            text_clean = re.sub(
                r'^Note:\s+The\s+answers?\s+to\s+questions?\s+\d+(?:\s+(?:through|and|to)\s+\d+)?\s+should\s+be\s+recorded\s+on\s+(?:your\s+)?separate\s+answer\s+sheet\.?\s*',
                '',
                text_clean,
                flags=re.IGNORECASE | re.DOTALL
            ).strip()
            
            # Strip leading "Use this space for computations." line
            text_clean = re.sub(
                r'^Use\s+this\s+space\s+for\s+computations\.?\s*',
                '',
                text_clean,
                flags=re.IGNORECASE | re.DOTALL
            ).strip()
            
            # Look for number or number-range at the start of a block or line within the block
            m = re.search(r'(?:^|\n)(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d\u2018\u2019])', text_clean)
            if m:
                q_start = int(m.group(1))
                q_end = int(m.group(2)) if m.group(2) else q_start
                if 1 <= q_start <= max_q and 1 <= q_end <= max_q:
                    # Enforce range span <= 6 constraint to reject fake diagram ranges
                    if q_end - q_start <= 6:
                        for q_num in range(q_start, q_end + 1):
                            if q_num not in q_positions:
                                q_positions[q_num] = (page_idx, x0, y0, x1, y1)
                        
    positions = {}
    sorted_qs = sorted(q_positions.keys())
    page_heights = [doc[i].rect.height for i in range(len(doc))]
    
    for i, q_num in enumerate(sorted_qs):
        page_idx, x0, y0, x1, y1 = q_positions[q_num]
        
        # Determine column bottom:
        # Scan next questions on the same page to find the next one in the same column
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

def find_question_blocks(full_text, positions, page_start_indices, max_q=85):
    """Segment full text into raw question blocks using page-restricted sliced search."""
    q_positions = {}
    
    for q_num in range(1, max_q + 1):
        if q_num not in positions:
            continue
            
        page_idx = positions[q_num]['page_idx']
        start_search = page_start_indices[page_idx]
        end_search = page_start_indices[page_idx + 1] if page_idx + 1 < len(page_start_indices) else len(full_text)
        
        # Search within the page text by slicing the string
        page_text_slice = full_text[start_search:end_search]
        pattern = re.compile(rf'(?:\n|^)\s*(?:(?:\d+)\s*(?:through|and|to|–|-|,)\s*)?({q_num})(?:\s*(?:through|and|to|–|-|,)\s*(?:\d+))?\s+([A-Z]|["\'`\(\u201c\u201d\u2018\u2019])')
        match = pattern.search(page_text_slice)
        if match:
            q_positions[q_num] = match.start() + start_search
        else:
            pattern_loose = re.compile(rf'(?:\n|^)\s*(?:(?:\d+)\s*(?:through|and|to|–|-|,)\s*)?({q_num})(?:\s*(?:through|and|to|–|-|,)\s*(?:\d+))?\s+')
            match_loose = pattern_loose.search(page_text_slice)
            if match_loose:
                q_positions[q_num] = match_loose.start() + start_search
                
    sorted_qs = sorted(q_positions.keys())
    blocks = {}
    for i, q_num in enumerate(sorted_qs):
        start = q_positions[q_num]
        end = q_positions[sorted_qs[i+1]] if i + 1 < len(sorted_qs) else len(full_text)
        blocks[q_num] = full_text[start:end].strip()
        
    return blocks

def clean_boilerplate(text):
    """Clean up common headers, footers, page numbers, and directions."""
    # Remove "Use this space for computations" and remnants
    text = re.sub(r'\bUse\s+this\s+space\s+for\s+computations\b\.?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'(?:\n|^)\s*computations\.?\s*(?:\n|$)', '\n', text, flags=re.IGNORECASE)
    # Remove page numbers in brackets like [2] or [3]
    text = re.sub(r'\[\d+\]', '', text)
    # Remove [OVER]
    text = re.sub(r'\[OVER\]', '', text, flags=re.IGNORECASE)
    # Remove typical headers like "P.S./Chem.–Jan. ’26"
    text = re.sub(r'P\.S\./\w+–[A-Za-z]+\.?\s*’\d+', '', text)
    text = re.sub(r'P\.S\./\w+\s*–\s*[A-Za-z]+\.?\s*’\d+', '', text)
    # Remove typical history headers like "U.S. Hist. & Gov't. – Jan. '26" or "Global Hist. & Geo. – June '25"
    text = re.sub(r'[A-Za-z\s.&\'\-\u2019]+–\s*[A-Za-z]+\.?\s*’\d+', '', text)
    # Remove "Part A", "Part B-1", etc.
    text = re.sub(r'\bPart\s+[A-D](?:–\d+)?\b', '', text)
    # Remove exam directions and answer booklet references (match to end of block using [\s\S]*)
    text = re.sub(r'Answer all questions in this part[\s\S]*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Directions\s*\([\d\s–-]+\):[\s\S]*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Record your answers in[\s\S]*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Record your answers on[\s\S]*', '', text, flags=re.IGNORECASE)
    # Remove note about recording answers on answer sheet
    text = re.sub(
        r'Note:\s+The\s+answers?\s+to\s+questions?\s+\d+(?:\s+(?:through|and|to)\s+\d+)?\s+should\s+be\s+recorded\s+on\s+(?:your\s+)?separate\s+answer\s+sheet\.?.*',
        '',
        text,
        flags=re.IGNORECASE | re.DOTALL
    )
    # Remove trailing header remnants
    text = re.sub(r'\b(P\.S\./?|P\.S\b)\s*$', '', text, flags=re.IGNORECASE)
    # Clean multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_choices(q_block):
    """Separate text from choices in a multiple-choice block."""
    choice_matches = list(re.finditer(r'\(([1-4])\)', q_block))
    if len(choice_matches) < 4:
        q_text = clean_boilerplate(q_block)
        q_text = re.sub(r'^\s*\d+\s+', '', q_text) # strip qnum
        return q_text, [], "written"
        
    choice_matches.sort(key=lambda m: m.start())
    q_text = q_block[:choice_matches[0].start()].strip()
    
    choices = [None] * 4
    for i, match in enumerate(choice_matches):
        choice_num = int(match.group(1)) - 1
        start_idx = match.end()
        end_idx = choice_matches[i+1].start() if i + 1 < len(choice_matches) else len(q_block)
        
        choice_text = q_block[start_idx:end_idx].strip()
        choices[choice_num] = clean_boilerplate(choice_text)
        
    q_text = clean_boilerplate(q_text)
    q_text = re.sub(r'^\s*\d+\s+', '', q_text) # strip qnum
    return q_text, choices, "multiple-choice"

def rect_belongs_to_col(r, col_x0, col_x1, page_w, is_two_col):
    """Check if a drawing/image rect belongs horizontally to the column."""
    if not is_two_col:
        return True
    mid = page_w / 2
    # Spans both columns and is wide
    if r.x0 < mid - 20 and r.x1 > mid + 20 and r.width > page_w * 0.4:
        return True
    # Overlaps significantly
    overlap = min(r.x1, col_x1) - max(r.x0, col_x0)
    if overlap > 5:
        return True
    # Very close horizontally
    if r.x0 >= col_x0 - 15 and r.x1 <= col_x1 + 15:
        return True
    return False

def is_ignored_element(r, pw, ph):
    """Identify and ignore border boxes, page margin elements, and standard dividers."""
    # Ignore page border boxes (spans almost full page)
    if r.width > pw * 0.85 and r.height > ph * 0.85:
        return True
        
    # Ignore elements completely inside page margins
    if r.x1 < 40 or r.x0 > pw - 40:
        return True
    if r.y1 < 45 or r.y0 > ph - 45:
        return True
        
    # Ignore vertical column dividers (near center, tall and thin)
    mid = pw / 2
    if abs(r.x0 - mid) < 15 and r.width < 3 and r.height > 150:
        return True
        
    # Ignore horizontal page dividers (wide and thin)
    if r.height < 3 and r.width > pw * 0.5:
        return True
        
    return False

def crop_diagram_region(page, y_min, y_max, ref_x0, ref_x1, is_two_col, dest_path):
    """
    Search for drawings/images in [y_min, y_max] on page.
    If found, expand crop box using text blocks for labels and crop to dest_path.
    Returns PIL.Image object of the cropped region if successful, else None.
    """
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

    triggers = []
    
    # Images
    for img in page.get_images(full=True):
        xref = img[0]
        for r in page.get_image_rects(xref):
            if is_ignored_element(r, pw, ph):
                continue
            if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
                if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                    if r.width > 15 and r.height > 15:
                        triggers.append(r)
                        
    # Drawings
    for path in page.get_drawings():
        r = path['rect']
        if is_ignored_element(r, pw, ph):
            continue
        if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
            if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                triggers.append(r)
                
    if not triggers:
        return None

    # If all triggers are horizontal lines (height < 3), ignore (likely answer lines or underlines)
    if all(r.height < 3 for r in triggers):
        return None

    # Collect ALL drawings and images in the vertical area to compute the bounding box
    all_elements = []
    
    # Images
    for img in page.get_images(full=True):
        xref = img[0]
        for r in page.get_image_rects(xref):
            if is_ignored_element(r, pw, ph):
                continue
            if r.y0 >= y_min - 5 and r.y1 <= y_max + 5:
                if rect_belongs_to_col(r, col_x0, col_x1, pw, is_two_col):
                    all_elements.append(r)
                    
    # Drawings
    for path in page.get_drawings():
        r = path['rect']
        if is_ignored_element(r, pw, ph):
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
    
    # Keep the original drawing bounds as static reference to prevent cascading expansions
    base_x0, base_y0, base_x1, base_y1 = rx0, ry0, rx1, ry1
    
    # Expand bounding box using close text blocks (labels, legend, axis text)
    blocks = page.get_text("blocks")
    for b in blocks:
        tx0, ty0, tx1, ty1, text, block_no, block_type = b
        if ty1 < 45 or ty0 > ph - 45:
            continue
        # Calculate gap-based vertical distance between text block and original drawing bounding box
        if ty0 >= base_y1:
            v_dist = ty0 - base_y1
        elif ty1 <= base_y0:
            v_dist = base_y0 - ty1
        else:
            v_dist = 0
            
        # Calculate gap-based horizontal distance
        if tx0 >= base_x1:
            h_dist = tx0 - base_x1
        elif tx1 <= base_x0:
            h_dist = base_x0 - tx1
        else:
            h_dist = 0
            
        # Proximity threshold: vertical gap <= 30 points, horizontal gap <= 50 points
        if v_dist <= 30 and h_dist <= 50:
            rx0 = min(rx0, tx0)
            ry0 = min(ry0, ty0)
            rx1 = max(rx1, tx1)
            ry1 = max(ry1, ty1)
                
    # Final safety margin
    margin = 8
    cx0 = max(0, rx0 - margin)
    cy0 = max(0, ry0 - margin)
    cx1 = min(pw, rx1 + margin)
    cy1 = min(ph, ry1 + margin)
    
    # Crop to temporary path
    clip = fitz.Rect(cx0, cy0, cx1, cy1)
    mat = fitz.Matrix(2.0, 2.0)
    pix = page.get_pixmap(matrix=mat, clip=clip, colorspace=fitz.csRGB)
    pix.save(dest_path)
    
    try:
        return Image.open(dest_path)
    except Exception as e:
        print(f"PIL loading error: {e}")
        return None

# ─── MAIN PROCESS ─────────────────────────────────────────────────────────────

def process_exam(subject, session):
    """Download directory parsing and output compilation."""
    session_dir = os.path.join(DOWNLOADS_DIR, subject, session)
    exam_pdf_path = os.path.join(session_dir, "exam.pdf")
    sk_pdf_path = os.path.join(session_dir, "scoring_key.pdf")
    rg_pdf_path = os.path.join(session_dir, "rating_guide.pdf")
    
    if not os.path.exists(exam_pdf_path):
        print(f"Skipping {subject}/{session} (no exam.pdf)")
        return
        
    print(f"\nProcessing {subject}/{session} ...")
    
    # 1. Parse Keys
    mc_answers = parse_mc_answers(sk_pdf_path)
    written_answers = parse_written_answers(rg_pdf_path)
    print(f"  Loaded {len(mc_answers)} MC keys and {len(written_answers)} written answers.")
    
    # 2. Extract full text
    doc = fitz.open(exam_pdf_path)
    full_text = ""
    page_start_indices = []
    for page_idx, page in enumerate(doc):
        page_start_indices.append(len(full_text))
        full_text += page.get_text() + "\n"
        
    def get_page_index(char_idx):
        for idx, start in enumerate(page_start_indices):
            if idx + 1 < len(page_start_indices):
                if start <= char_idx < page_start_indices[idx + 1]:
                    return idx
            else:
                if start <= char_idx:
                    return idx
        return 0
        
    # Find all contexts in full_text
    contexts = []
    context_pattern = re.compile(
        r'(Base your answers? to questions?\s+(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+on\s+)',
        re.IGNORECASE
    )
    
    matches = list(context_pattern.finditer(full_text))
    for idx, match in enumerate(matches):
        start_char = match.start()
        q_start = int(match.group(2))
        q_end = int(match.group(3)) if match.group(3) else q_start
        
        limit = matches[idx+1].start() if idx + 1 < len(matches) else len(full_text)
        
        q_pattern = re.compile(rf'(?:\n|^)\s*{q_start}\s+([A-Z]|["\'`\(\u201c\u201d\u2018\u2019])')
        q_match = q_pattern.search(full_text, start_char, limit)
        if q_match:
            end_char = q_match.start()
        else:
            q_pattern_fallback = re.compile(rf'(?:\n|^)\s*{q_start}\s+')
            q_match_fallback = q_pattern_fallback.search(full_text, start_char, limit)
            if q_match_fallback:
                end_char = q_match_fallback.start()
            else:
                end_char = limit
                
        context_raw_text = full_text[start_char:end_char].strip()
        
        header_page_idx = get_page_index(start_char)
        q_start_page_idx = get_page_index(end_char)
        
        contexts.append({
            'q_start': q_start,
            'q_end': q_end,
            'text': context_raw_text,
            'header_page_idx': header_page_idx,
            'q_start_page_idx': q_start_page_idx,
            'start_char': start_char,
            'end_char': end_char
        })
        
    context_mappings = {}
    for context in contexts:
        for target_q in range(context['q_start'], context['q_end'] + 1):
            context_mappings[target_q] = context['text']
            
    # Segment questions
    positions = get_question_positions_blocks(doc)
    blocks = find_question_blocks(full_text, positions, page_start_indices)
    print(f"  Parsed {len(blocks)} text blocks, mapped {len(positions)} visual coordinates.")
    
    # Clean blocks of any context texts at their end
    clean_questions = {}
    for q_num, block in blocks.items():
        match = re.search(r'(Base your answers? to questions?\s+\d+[\s\S]*?\s+on\s+[\s\S]*)', block, re.IGNORECASE)
        if match:
            clean_questions[q_num] = block[:match.start()].strip()
        else:
            clean_questions[q_num] = block

    # Output paths
    subject_img_dir = os.path.join(IMAGES_DIR, subject, session)
    os.makedirs(subject_img_dir, exist_ok=True)
    
    # Crop context diagrams/tables if they exist
    context_images = {} # (q_start, q_end) -> image_rel_path
    
    for context in contexts:
        q_start = context['q_start']
        q_end = context['q_end']
        header_page_idx = context['header_page_idx']
        q_start_page_idx = context['q_start_page_idx']
        
        cropped_images = []
        
        for p_idx in range(header_page_idx, q_start_page_idx + 1):
            page = doc[p_idx]
            is_two_col = any(pos['page_idx'] == p_idx and pos['x0'] > 250 for pos in positions.values())
            
            y_min = 0
            y_max = page.rect.height
            
            if p_idx == header_page_idx:
                header_line = context['text'].split('\n')[0].strip()[:50]
                rects = page.search_for(header_line)
                if rects:
                    y_min = rects[0].y1
                    
            if p_idx == q_start_page_idx:
                if q_start in positions:
                    y_max = positions[q_start]['y0']
                    
            ref_x0 = positions[q_start]['x0'] if q_start in positions else 0
            ref_x1 = positions[q_start]['x1'] if q_start in positions else page.rect.width
            
            temp_name = f"temp_context_{q_start}_{q_end}_p{p_idx}.png"
            temp_path = os.path.join(subject_img_dir, temp_name)
            
            # Force is_two_col to False for context diagrams to ensure they are cropped full-width
            img = crop_diagram_region(page, y_min, y_max, ref_x0, ref_x1, False, temp_path)
            if img:
                cropped_images.append((img, temp_path))
                
        if cropped_images:
            filename = f"context_{q_start}_{q_end}.png"
            dest_path = os.path.join(subject_img_dir, filename)
            
            if len(cropped_images) == 1:
                img, temp_path = cropped_images[0]
                img.save(dest_path)
            else:
                from PIL import Image
                pil_imgs = [img for img, _ in cropped_images]
                max_w = max(im.width for im in pil_imgs)
                total_h = sum(im.height for im in pil_imgs)
                
                combined = Image.new("RGB", (max_w, total_h), (255, 255, 255))
                current_y = 0
                for im in pil_imgs:
                    x_offset = (max_w - im.width) // 2
                    combined.paste(im, (x_offset, current_y))
                    current_y += im.height
                combined.save(dest_path)
                
            for _, temp_path in cropped_images:
                try:
                    os.remove(temp_path)
                except Exception:
                    pass
                    
            rel_path = f"/images/exams/{subject}/{session}/{filename}"
            for target_q in range(q_start, q_end + 1):
                context_images[target_q] = rel_path
                
    # 3. Process each question
    questions_data = []
    
    for q_num in sorted(blocks.keys()):
        raw_block = clean_questions[q_num]
        q_text, choices, q_type = extract_choices(raw_block)
        
        image_path = None
        
        if q_num in context_images:
            image_path = context_images[q_num]
        elif q_num in positions:
            pos = positions[q_num]
            page_idx = pos['page_idx']
            x0, y0, x1, y_bottom = pos['x0'], pos['y0'], pos['x1'], pos['y_bottom']
            page = doc[page_idx]
            
            is_two_col = any(pos['page_idx'] == page_idx and pos['x0'] > 250 for pos in positions.values())
            
            filename = f"q{q_num}.png"
            dest_path = os.path.join(subject_img_dir, filename)
            
            img = crop_diagram_region(page, y0, y_bottom, x0, x1, is_two_col, dest_path)
            if img:
                image_path = f"/images/exams/{subject}/{session}/{filename}"
                
        correct_choice = None
        model_answer = None
        
        if q_type == "multiple-choice":
            # Correct is 0-indexed for React Native (0, 1, 2, 3)
            raw_correct = mc_answers.get(q_num)
            correct_choice = raw_correct - 1 if raw_correct else None
        else:
            model_answer = written_answers.get(q_num)
            
        # Compile record
        q_record = {
            "number": q_num,
            "type": q_type,
            "text": q_text,
            "choices": choices,
            "image": image_path,
            "context": context_mappings.get(q_num),
            "correct": correct_choice,
            "modelAnswer": model_answer
        }
        questions_data.append(q_record)
        
    doc.close()
    
    # Save output JSON
    output_subject_dir = os.path.join(DATA_DIR, subject)
    os.makedirs(output_subject_dir, exist_ok=True)
    
    json_path = os.path.join(output_subject_dir, f"{session}.json")
    
    final_output = {
        "subject": subject,
        "session": session,
        "questions": questions_data
    }
    
    with open(json_path, "w") as f:
        json.dump(final_output, f, indent=2)
        
    print(f"  ✓ Successfully parsed and saved {len(questions_data)} questions to {json_path}")

def main():
    parser = argparse.ArgumentParser(description="Parse downloaded NYSED Regents PDFs")
    parser.add_argument("--subject", default=None, help="Subject to parse")
    parser.add_argument("--session", default=None, help="Specific session to parse (e.g. january-2026)")
    args = parser.parse_args()
    
    if args.subject and args.session:
        process_exam(args.subject, args.session)
    elif args.subject:
        # Process all downloaded sessions for this subject
        subject_dir = os.path.join(DOWNLOADS_DIR, args.subject)
        if os.path.exists(subject_dir):
            for session in sorted(os.listdir(subject_dir)):
                if os.path.isdir(os.path.join(subject_dir, session)):
                    process_exam(args.subject, session)
    else:
        # Process all downloaded subjects and sessions
        if os.path.exists(DOWNLOADS_DIR):
            for subject in sorted(os.listdir(DOWNLOADS_DIR)):
                subject_dir = os.path.join(DOWNLOADS_DIR, subject)
                if os.path.isdir(subject_dir):
                    for session in sorted(os.listdir(subject_dir)):
                        if os.path.isdir(os.path.join(subject_dir, session)):
                            try:
                                process_exam(subject, session)
                            except Exception as e:
                                print(f"Failed to process {subject}/{session}: {e}")

if __name__ == "__main__":
    main()
