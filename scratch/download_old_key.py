import urllib.request
import fitz
import os

url = "https://www.nysedregents.org/Chemistry/618/chem62018-rg.pdf"
dest = "downloads/chemistry/june-2018/rating_guide.pdf"
os.makedirs(os.path.dirname(dest), exist_ok=True)

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as resp, open(dest, 'wb') as f:
        f.write(resp.read())
    
    doc = fitz.open(dest)
    print(f"Total pages: {len(doc)}")
    for i in range(min(len(doc), 3)):
        print(f"--- Page {i+1} ---")
        print(doc[i].get_text()[:1500]) # Print first 1500 chars
    doc.close()
except Exception as e:
    print(f"Error: {e}")
