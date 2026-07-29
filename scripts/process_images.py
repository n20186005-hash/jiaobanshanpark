from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / 'public' / 'images'
WIDTHS = (480, 768, 960, 1440, 1920)

for src in sorted(IMG_DIR.glob('*.jpg')):
    if src.name.startswith('og-'):
        continue
    im = Image.open(src).convert('RGB')
    for width in WIDTHS:
        if width > im.width:
            continue
        height = round(im.height * width / im.width)
        resized = im.resize((width, height), Image.Resampling.LANCZOS)
        stem = src.stem
        resized.save(IMG_DIR / f'{stem}-{width}.webp', 'WEBP', quality=82, method=6)
        resized.save(IMG_DIR / f'{stem}-{width}.avif', 'AVIF', quality=54, speed=6)

# OG image: scenic plum-and-river view, crop to 1200 x 630, with restrained typography.
base = Image.open(IMG_DIR / 'plum-view.jpg').convert('RGB')
target_ratio = 1200 / 630
ratio = base.width / base.height
if ratio > target_ratio:
    new_w = round(base.height * target_ratio)
    left = (base.width - new_w) // 2
    base = base.crop((left, 0, left + new_w, base.height))
else:
    new_h = round(base.width / target_ratio)
    top = max(0, (base.height - new_h) // 2)
    base = base.crop((0, top, base.width, top + new_h))
base = base.resize((1200, 630), Image.Resampling.LANCZOS)
# dark forest gradient on left and subtle bottom vignette
layer = Image.new('RGBA', base.size, (0, 0, 0, 0))
d = ImageDraw.Draw(layer)
for x in range(760):
    a = int(185 * (1 - x / 760) ** 1.5)
    d.line((x, 0, x, 630), fill=(11, 38, 31, a))
for y in range(440, 630):
    a = int(90 * ((y - 440) / 190))
    d.line((0, y, 1200, y), fill=(8, 25, 21, a))
base = Image.alpha_composite(base.convert('RGBA'), layer)
d = ImageDraw.Draw(base)
font_bold = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
font_reg = '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
title = ImageFont.truetype(font_bold, 72)
sub = ImageFont.truetype(font_reg, 28)
small = ImageFont.truetype(font_reg, 23)
d.text((74, 162), '角板山公園', font=title, fill=(249, 246, 236, 255), stroke_width=1, stroke_fill=(16, 40, 33, 120))
d.text((78, 265), '行館・梅園・戰備隧道與山谷散步指南', font=sub, fill=(247, 241, 226, 245))
# Accent rule
pink = (201, 128, 139, 255)
d.rounded_rectangle((78, 326, 236, 334), radius=4, fill=pink)
d.text((78, 366), 'JiaobanshanPark.com', font=small, fill=(242, 235, 219, 225))
base.convert('RGB').save(IMG_DIR / 'og-jiaobanshan.jpg', quality=91, optimize=True)
base.convert('RGB').save(IMG_DIR / 'og-jiaobanshan.webp', 'WEBP', quality=86, method=6)
