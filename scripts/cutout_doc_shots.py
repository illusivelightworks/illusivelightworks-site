#!/usr/bin/env python3
"""Cut the laptop (screen + base) out of the Mac App Store slides: no headline, transparent background.
Writes WebP with alpha into public/img/docs/<name>.webp (the Screenshot component picks it up by name).

usage: ~/.local/share/ilw-video-tools/venv/bin/python scripts/cutout_doc_shots.py            (all in MAP)
       ... cutout_doc_shots.py NAME [NAME ...]                                                 (just those)

The slides have a plain teal gradient behind the laptop, so the laptop is told apart from the teal and its glow by colour (grey/silver vs. green-above-red), the outside is flood-filled in from the picture's edge so cyan UI never punches holes,
and the outer rim is shaved by a pixel so no teal fringe is left.
"""
import os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'img', 'docs')
V = '/Users/aethaedd/Documents/IllusiveLightWorks/_UnrealProjects/_APP_STORE/'
V162 = V + 'v1.6.2/app1.6.2_mac_slide%d.png'

# doc image name -> (source slide, y where the laptop starts looking from: below the headline)
MAP = {
    'color-tool':            (V162 % 1, 350),
    'final-display':         (V162 % 4, 350),   # mask tool open, tools list + playback bar visible
    'calibration-full':      (V162 % 2, 350),
    'artwork-shaders':       (V162 % 3, 350),
    'mask-main':             (V162 % 4, 350),
    'warp-paint-direction':  (V162 % 5, 350),
    'final-display-unsaved': (V162 % 5, 350),   # SAVE PROJECT lit, "You have unsaved changes!"
    'saved-projects':        (V162 % 7, 350),
}
WIDTH = 1600


def cutout(src, y0):
    im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32)
    h, w, _ = a.shape
    # The teal behind the laptop is a gradient with a soft glow, so "differs from the row's teal" also catches the glow.
    # What separates the laptop is colour: the bezel is dark grey and the base is silver (red about equal to green),
    # while the teal and its glow always have green far above red.
    a16 = a.astype(np.int16); cyan = a16[..., 1] - a16[..., 0]
    ramp = np.clip((70 - cyan) / 30.0, 0, 1)             # 1 = laptop-coloured, 0 = teal
    # The outside is the teal connected to the picture's edge (flood fill); the bezel is a closed ring, so cyan UI inside is never reached.
    teal = Image.fromarray(np.where(cyan >= 55, 255, 0).astype(np.uint8))
    teal.paste(0, (0, 0, w, y0))                         # the headline area is not part of the laptop
    for seed in [(0, y0), (w - 1, y0), (0, h - 1), (w - 1, h - 1), (w // 2, h - 1), (0, (y0 + h) // 2), (w - 1, (y0 + h) // 2)]:
        if teal.getpixel(seed) == 255: ImageDraw.floodfill(teal, seed, 128)
    outside = np.asarray(teal) == 128
    inside = ~outside; inside[:y0] = False
    near = np.asarray(Image.fromarray((outside * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
    alpha = np.where(near, ramp, inside.astype(np.float32)); alpha[~inside & ~near] = 0; alpha[:y0] = 0
    alpha = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))).astype(np.float32) / 255   # shave the teal rim
    rgb = a
    ys, xs = np.nonzero(alpha > 0.5)
    box = (max(xs.min() - 3, 0), max(ys.min() - 3, 0), min(xs.max() + 4, w), min(ys.max() + 4, h))
    out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    img = Image.fromarray(out, 'RGBA').crop(box)
    return img.resize((WIDTH, round(img.height * WIDTH / img.width)), Image.LANCZOS)


if __name__ == '__main__':
    names = sys.argv[1:] or list(MAP)
    os.makedirs(OUT, exist_ok=True)
    for n in names:
        src, y0 = MAP[n]
        img = cutout(src, y0)
        p = os.path.join(OUT, n + '.webp'); img.save(p, 'WEBP', quality=92, method=6)
        print(n, img.size, os.path.getsize(p) // 1024, 'KB')
