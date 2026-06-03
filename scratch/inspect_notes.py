import os
import re
import fitz

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

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
            for page_idx, page in enumerate(doc):
                blocks = page.get_text("blocks")
                for b in blocks:
                    x0, y0, x1, y1, text, block_no, block_type = b
                    text_clean = text.strip()
                    if text_clean.lower().startswith("note:"):
                        print(f"{subject}/{session} P{page_idx+1}: {repr(text_clean[:120])}")
            doc.close()
        except Exception as e:
            print(f"Error on {subject}/{session}: {e}")
