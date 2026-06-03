import urllib.request
import re

url = "https://www.nysedregents.org/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8', errors='ignore')
    
    # Simple regex to find <a href="...">text</a>
    pattern = re.compile(r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)
    links = pattern.findall(html)
    
    print(f"Total links found: {len(links)}")
    # Print the links that look like subject pages
    for href, text_raw in links:
        text = re.sub(r'<[^>]+>', '', text_raw).strip()
        if href.endswith('/') or '/' in href:
            if not href.startswith('http') and len(href) > 2:
                print(f"Subject: {text} -> {href}")
            elif 'nysedregents.org' in href:
                print(f"Subject: {text} -> {href}")
except Exception as e:
    print(f"Error: {e}")
