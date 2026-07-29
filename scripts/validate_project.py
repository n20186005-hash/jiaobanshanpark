from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []
notes: list[str] = []

required = [
    'package.json', 'astro.config.mjs', 'tsconfig.json', 'wrangler.jsonc',
    'src/pages/index.astro', 'src/pages/404.astro', 'src/layouts/BaseLayout.astro',
    'src/styles/global.css', 'src/worker.ts', 'public/robots.txt', 'public/sitemap.xml',
]
for rel in required:
    if not (ROOT / rel).is_file():
        errors.append(f'missing: {rel}')

for rel in ['package.json', 'public/site.webmanifest']:
    try:
        json.loads((ROOT / rel).read_text())
    except Exception as exc:
        errors.append(f'invalid JSON {rel}: {exc}')

try:
    ET.parse(ROOT / 'public/sitemap.xml')
except Exception as exc:
    errors.append(f'invalid sitemap.xml: {exc}')

all_text = '\n'.join(
    p.read_text(errors='ignore')
    for p in ROOT.rglob('*')
    if p.is_file() and p.suffix in {'.astro', '.ts', '.css', '.mjs', '.json', '.md', '.txt', '.xml', '.svg'}
)
for needle in ['JiaobanshanPark.com', 'G-HXM22WWPKP', "lang=\"zh-Hant-TW\""]:
    if needle not in all_text:
        errors.append(f'missing required marker: {needle}')

index = (ROOT / 'src/pages/index.astro').read_text()
image_names = set(re.findall(r'<ResponsiveImage\b[^>]*?\bname=\"([a-z0-9-]+)\"', index, re.S))
image_names |= set(re.findall(r"image: '([a-z0-9-]+)'", (ROOT / 'src/data/site.ts').read_text()))
for name in sorted(image_names):
    for suffix in ['.jpg', '-480.avif', '-768.avif', '-960.avif', '-480.webp', '-768.webp', '-960.webp']:
        f = ROOT / 'public/images' / f'{name}{suffix}'
        if not f.is_file():
            errors.append(f'missing image variant: {f.relative_to(ROOT)}')

for f in (ROOT / 'public/images').glob('*'):
    if f.suffix.lower() in {'.jpg', '.webp', '.avif'}:
        try:
            with Image.open(f) as im:
                im.verify()
        except Exception as exc:
            errors.append(f'broken image {f.name}: {exc}')

# Main page should not hotlink photos.
if re.search(r'<img[^>]+src=["\']https?://', index):
    errors.append('external image hotlink found in index.astro')

# Quick check for accidental simplified characters in visible site copy.
for char in ['园', '馆', '门', '车', '线', '区', '游', '览', '与', '时', '费', '开', '关', '这', '个']:
    if char in index or char in (ROOT / 'src/data/site.ts').read_text():
        errors.append(f'possible simplified Chinese character in site copy: {char}')

notes.append(f'image sets referenced: {len(image_names)}')
notes.append(f'optimized image files: {len(list((ROOT / "public/images").glob("*.avif")))} AVIF, {len(list((ROOT / "public/images").glob("*.webp")))} WebP')
notes.append(f'index.astro size: {(ROOT / "src/pages/index.astro").stat().st_size / 1024:.1f} KB')

print('Project validation')
print('------------------')
for note in notes:
    print('OK ', note)
if errors:
    for error in errors:
        print('ERR', error)
    sys.exit(1)
print('OK  all project checks passed')
