import urllib.request
import re

subjects = {
    "ela": "hsela/",
    "us-history": "us-history-govt/home.html",
    "global-history": "ghg2/home.html"
}

for name, path in subjects.items():
    url = f"https://www.nysedregents.org/{path}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        print(f"=== {name} ({url}) ===")
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read().decode('utf-8', errors='ignore')
        
        # Find PDF links
        pattern = re.compile(r'<a\s+[^>]*href=["\']([^"\']+\.pdf)["\'][^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)
        pdf_links = pattern.findall(html)
        print(f"Found {len(pdf_links)} PDF links. First 5:")
        for href, text_raw in pdf_links[:5]:
            text = re.sub(r'<[^>]+>', '', text_raw).strip()
            print(f"  {text} -> {href}")
    except Exception as e:
        print(f"Error checking {name}: {e}")
