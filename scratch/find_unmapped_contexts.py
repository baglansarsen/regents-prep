import os
import re
import json
import fitz

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, "downloads")
DATA_DIR = os.path.join(PROJECT_ROOT, "output", "data")

def inspect_all_contexts():
    results = []
    
    for subject in sorted(os.listdir(DOWNLOADS_DIR)):
        subj_dir = os.path.join(DOWNLOADS_DIR, subject)
        if not os.path.isdir(subj_dir):
            continue
            
        for session in sorted(os.listdir(subj_dir)):
            sess_dir = os.path.join(subj_dir, session)
            pdf_path = os.path.join(sess_dir, "exam.pdf")
            json_path = os.path.join(DATA_DIR, subject, f"{session}.json")
            
            if not os.path.exists(pdf_path) or not os.path.exists(json_path):
                continue
                
            # Read JSON
            with open(json_path) as f:
                data = json.load(f)
            questions = {q['number']: q for q in data.get('questions', [])}
            
            # Read PDF
            doc = fitz.open(pdf_path)
            full_text = ""
            for page in doc:
                full_text += page.get_text() + "\n"
            doc.close()
            
            # Find context block patterns in raw PDF text
            # E.g. "Base your answers to questions X through Y on the..."
            # Or "Base your answer to question X on the..."
            # Or "Use the diagram below to answer questions..."
            matches = re.finditer(r'(Base your answers? to questions?\s+(\d+)(?:\s+(?:through|and)\s+(\d+))?\s+on\s+[\s\S]*?(?:below|following))', full_text, re.IGNORECASE)
            
            for m in matches:
                full_match_text = m.group(1)
                q_start = int(m.group(2))
                q_end = int(m.group(3)) if m.group(3) else q_start
                
                # Check if these questions have context in JSON
                for q_num in range(q_start, q_end + 1):
                    if q_num not in questions:
                        results.append({
                            'subject': subject,
                            'session': session,
                            'q_num': q_num,
                            'error': 'Question not in JSON',
                            'context_text': full_match_text[:100]
                        })
                    else:
                        q_json = questions[q_num]
                        if not q_json.get('context'):
                            results.append({
                                'subject': subject,
                                'session': session,
                                'q_num': q_num,
                                'error': 'Missing context in JSON',
                                'context_text': full_match_text[:100]
                            })
                            
            # Let's also check other potential context patterns
            # E.g., "Use the information/diagram/map below/following to answer..."
            other_matches = re.finditer(r'((?:Use|Refer to)\s+the\s+[\s\S]*?(?:below|following)\s+to\s+answer\s+questions?\s+(\d+)(?:\s+(?:through|and)\s+(\d+))?)', full_text, re.IGNORECASE)
            for m in other_matches:
                full_match_text = m.group(1)
                q_start = int(m.group(2))
                q_end = int(m.group(3)) if m.group(3) else q_start
                
                for q_num in range(q_start, q_end + 1):
                    if q_num not in questions:
                        results.append({
                            'subject': subject,
                            'session': session,
                            'q_num': q_num,
                            'error': 'Question not in JSON (other pattern)',
                            'context_text': full_match_text[:100]
                        })
                    else:
                        q_json = questions[q_num]
                        if not q_json.get('context'):
                            results.append({
                                'subject': subject,
                                'session': session,
                                'q_num': q_num,
                                'error': 'Missing context in JSON (other pattern)',
                                'context_text': full_match_text[:100]
                            })

    print(f"Total unmapped/missing context issues: {len(results)}")
    for r in results[:30]:
        print(f"{r['subject']}/{r['session']} Q{r['q_num']}: {r['error']} -> Context: {repr(r['context_text'])}")

if __name__ == '__main__':
    inspect_all_contexts()
