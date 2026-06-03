import fitz
import re

def debug_find_question_blocks_page_restricted(doc, max_q=85):
    page_start_indices = []
    full_text = ""
    for page_idx, page in enumerate(doc):
        page_start_indices.append(len(full_text))
        full_text += page.get_text() + "\n"
        
    positions = {}
    q_positions_temp = {}
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        blocks = page.get_text("blocks")
        for b in blocks:
            x0, y0, x1, y1, text, block_no, block_type = b
            text_clean = text.strip()
            m = re.match(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d]|[a-z]{2,})', text_clean)
            if m:
                q_start = int(m.group(1))
                q_end = int(m.group(2)) if m.group(2) else q_start
                for q_num in range(q_start, q_end + 1):
                    if q_num not in q_positions_temp:
                        q_positions_temp[q_num] = page_idx
                        
    q_positions = {}
    for q_num in range(1, max_q + 1):
        if q_num not in q_positions_temp:
            continue
            
        page_idx = q_positions_temp[q_num]
        start_search = page_start_indices[page_idx]
        end_search = page_start_indices[page_idx + 1] if page_idx + 1 < len(page_start_indices) else len(full_text)
        
        page_text_slice = full_text[start_search:end_search]
        
        # New pattern that supports ranges
        pattern = re.compile(rf'(?:\n|^)\s*(?:(?:\d+)\s*(?:through|and|to|–|-|,)\s*)?({q_num})(?:\s*(?:through|and|to|–|-|,)\s*(?:\d+))?\s+([A-Z]|["\'`\(\u201c\u201d]|[a-z]{{2,}})')
        match = pattern.search(page_text_slice)
        if match:
            q_positions[q_num] = (match.start() + start_search, "strict", match.group(0))
        else:
            pattern_loose = re.compile(rf'(?:\n|^)\s*(?:(?:\d+)\s*(?:through|and|to|–|-|,)\s*)?({q_num})(?:\s*(?:through|and|to|–|-|,)\s*(?:\d+))?\s+')
            match_loose = pattern_loose.search(page_text_slice)
            if match_loose:
                q_positions[q_num] = (match_loose.start() + start_search, "loose", match_loose.group(0))
            else:
                q_positions[q_num] = (None, "missing", "None")
                
    for q_num in sorted(q_positions.keys()):
        pos, match_type, matched_text = q_positions[q_num]
        if match_type == "missing":
            print(f"Q{q_num} (Page {q_positions_temp[q_num]}): pos={pos}, type={match_type}, text={repr(matched_text)}")

doc = fitz.open("downloads/life-science/june-2025/exam.pdf")
debug_find_question_blocks_page_restricted(doc)
doc.close()
