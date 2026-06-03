import os
import re
import fitz

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")

def find_context_phrases():
    phrases = set()
    
    for subject in os.listdir(DOWNLOADS_DIR):
        subj_dir = os.path.join(DOWNLOADS_DIR, subject)
        if not os.path.isdir(subj_dir):
            continue
        for session in os.listdir(subj_dir):
            pdf_path = os.path.join(subj_dir, session, "exam.pdf")
            if not os.path.exists(pdf_path):
                continue
                
            doc = fitz.open(pdf_path)
            for page in doc:
                text = page.get_text()
                # Find lines containing "Base your" or similar patterns
                for line in text.split('\n'):
                    line_clean = line.strip()
                    if re.search(r'base your answer', line_clean, re.IGNORECASE):
                        phrases.add(line_clean)
                    elif re.search(r'answer questions', line_clean, re.IGNORECASE) and re.search(r'below|diagram|map|graph|table', line_clean, re.IGNORECASE):
                        phrases.add(line_clean)
            doc.close()
            
    print(f"Found {len(phrases)} unique lines:")
    for p in sorted(list(phrases))[:100]:
        print(f" - {p}")

if __name__ == '__main__':
    find_context_phrases()
