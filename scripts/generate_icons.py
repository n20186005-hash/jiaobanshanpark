from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'public' / 'images' / 'jiaobanshan-park-resort-1.jpg'
OUT = ROOT / 'public' / 'icons'
OUT.mkdir(parents=True, exist_ok=True)

BG = (24, 47, 39)

src = Image.open(SRC).convert('RGB')
side = min(src.size)
left = (src.width - side) // 2
top = max(0, (src.height - side) // 3)
square = src.crop((left, top, left + side, top + side))

mask_src = Image.new('L', (1024, 1024), 0)
ImageDraw.Draw(mask_src).ellipse((0, 0, 1024, 1024), fill=255)

targets = [
    ('icon-192.png', 192, 14),
    ('icon-512.png', 512, 38),
    ('icon-maskable-512.png', 512, 96),
    ('apple-touch-icon.png', 180, 13),
]

for name, size, pad in targets:
    canvas = Image.new('RGB', (size, size), BG)
    inner = size - pad * 2
    photo = square.resize((inner, inner), Image.Resampling.LANCZOS)
    mask = mask_src.resize((inner, inner), Image.Resampling.LANCZOS)
    canvas.paste(photo, (pad, pad), mask)
    canvas.save(OUT / name, 'PNG', optimize=True)

print('icons generated')
