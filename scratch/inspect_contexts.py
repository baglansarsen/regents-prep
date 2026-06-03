import fitz
import re
import json

def check_contexts(subject, session):
    pdf_path = f"downloads/{subject}/{session}/exam.pdf"
    json_path = f"output/data/{subject}/{session}.json"
    
    print(f"\n=== Checking {subject}/{session} ===")
    
    # Read PDF text
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
    doc.close()
    
    # Find all "Base your answer" in raw text
    raw_matches = re.findall(r'(Base your answers? to questions? \d+[\s\S]*?on the [\s\S]*?below)', full_text, re.IGNORECASE)
    print(f"Raw matches count in PDF: {len(raw_matches)}")
    
    # Read output JSON
    try:
        with open(json_path) as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error reading JSON: {e}")
        return
        
    # Count questions with context in JSON
    questions = data.get("questions", [])
    context_qs = [q for q in questions if q.get("context")]
    print(f"Questions with context in JSON: {len(context_qs)}")
    for q in context_qs[:5]:
        print(f"  Q{q['number']}: Context starts with: '{q['context'][:80]}...'")

check_contexts("earth-science", "june-2025")
check_contexts("chemistry", "january-2026")
