import os
import re
import fitz

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

old_pattern = re.compile(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d]|[a-z]{2,})')
new_search_pattern = re.compile(r'(?:^|\n)(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d\u2018\u2019])')

lost_questions = []

for subject in os.listdir(DOWNLOADS_DIR):
    subj_dir = os.path.join(DOWNLOADS_DIR, subject)
    if not os.path.isdir(subj_dir):
        continue
    for session in os.listdir(subj_dir):
        sess_dir = os.path.join(subj_dir, session)
        pdf_path = os.path.join(sess_dir, "exam.pdf")
        if not os.path.exists(pdf_path):
            continue
            
        try:
            doc = fitz.open(pdf_path)
            old_qs = set()
            new_qs = set()
            for page_idx in range(len(doc)):
                page = doc[page_idx]
                blocks = page.get_text("blocks")
                for b in blocks:
                    x0, y0, x1, y1, text, block_no, block_type = b
                    text_clean = text.strip()
                    
                    # Old parser logic
                    text_clean_old = re.sub(
                        r'^Note:\s+The\s+answers?\s+to\s+questions?\s+\d+(?:\s+(?:through|and|to)\s+\d+)?\s+should\s+be\s+recorded\s+on\s+(?:your\s+)?separate\s+answer\s+sheet\.?\s*',
                        '',
                        text_clean,
                        flags=re.IGNORECASE | re.DOTALL
                    ).strip()
                    
                    m_old = old_pattern.match(text_clean_old)
                    if m_old:
                        q_start = int(m_old.group(1))
                        q_end = int(m_old.group(2)) if m_old.group(2) else q_start
                        if 1 <= q_start <= 85 and 1 <= q_end <= 85:
                            if q_end - q_start <= 6:
                                for q_num in range(q_start, q_end + 1):
                                    old_qs.add(q_num)
                                    
                    # New parser logic with re.search and stripping Note/Use-space
                    text_clean_new = re.sub(
                        r'^Note:\s+The\s+answers?\s+to\s+questions?\s+\d+(?:\s+(?:through|and|to)\s+\d+)?\s+should\s+be\s+recorded\s+on\s+(?:your\s+)?separate\s+answer\s+sheet\.?\s*',
                        '',
                        text_clean,
                        flags=re.IGNORECASE | re.DOTALL
                    ).strip()
                    
                    text_clean_new = re.sub(
                        r'^Use\s+this\s+space\s+for\s+computations\.?\s*',
                        '',
                        text_clean_new,
                        flags=re.IGNORECASE | re.DOTALL
                    ).strip()
                    
                    # Search inside the block (first match)
                    m_new = new_search_pattern.search(text_clean_new)
                    if m_new:
                        q_start = int(m_new.group(1))
                        q_end = int(m_new.group(2)) if m_new.group(2) else q_start
                        if 1 <= q_start <= 85 and 1 <= q_end <= 85:
                            if q_end - q_start <= 6:
                                for q_num in range(q_start, q_end + 1):
                                    new_qs.add(q_num)
                                    
            lost = old_qs - new_qs
            if lost:
                lost_questions.append((subject, session, lost))
            doc.close()
        except Exception as e:
            print(f"Error on {subject}/{session}: {e}")

print(f"Total exams with lost questions: {len(lost_questions)}")
for subject, session, lost in lost_questions:
    print(f"  {subject}/{session}: lost {lost}")
