import urllib.request
import re

url = "https://www.nysedregents.org/Chemistry/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8', errors='ignore')
    
    # Let's find links pointing to .pdf files
    pattern = re.compile(r'<a\s+[^>]*href=["\']([^"\']+\.pdf)["\'][^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)
    pdf_links = pattern.findall(html)
    
    print(f"Total PDF links found on Chemistry page: {len(pdf_links)}")
    # Print the first 30 PDF links
    for href, text_raw in pdf_links[:30]:
        text = re.sub(r'<[^>]+>', '', text_raw).strip()
        print(f"Text: {text} -> URL: {href}")
except Exception as e:
    print(f"Error: {e}")
