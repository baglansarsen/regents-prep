import urllib.request
import re

url = "https://www.nysedregents.org/Chemistry/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8', errors='ignore')
    
    pattern = re.compile(r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)
    links = pattern.findall(html)
    
    print("June 2018 chemistry links:")
    for href, text_raw in links:
        text = re.sub(r'<[^>]+>', '', text_raw).strip()
        if "618" in href or "2018" in href or "2018" in text:
            print(f"  {text} -> {href}")
except Exception as e:
    print(f"Error: {e}")
