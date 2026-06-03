import urllib.request
import re

url = "https://www.nysedregents.org/life_science_biology/home.html"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8', errors='ignore')
    
    # Find PDF links
    pattern = re.compile(r'<a\s+[^>]*href=["\']([^"\']+\.pdf)["\'][^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)
    pdf_links = pattern.findall(html)
    print(f"Found {len(pdf_links)} PDF links. First 15:")
    for href, text_raw in pdf_links[:15]:
        text = re.sub(r'<[^>]+>', '', text_raw).strip()
        print(f"  {text} -> {href}")
except Exception as e:
    print(f"Error checking page: {e}")
