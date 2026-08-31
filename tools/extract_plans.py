"""Pull the floor-plan board out of each wall photo, correct the perspective,
and write a flat PNG the web app uses as a map background.

The boards are all the same signage product, so once the four corners are known
the warp target is a fixed-aspect rectangle. Colour detection finds those
corners on most photos; badly tilted ones get the corners supplied by hand.
"""
import pathlib

import numpy as np
from PIL import Image
from scipy import ndimage

SRC, OUT = "images", "assets/plans"
OUT_W = 2200
BOARD_ASPECT = 1.352  # width / height, measured off the squarely-shot boards

# photo, output name, hand-measured corners (tl, tr, br, bl) or None to detect
BOARDS = [
    ("IMG_20260824_124220.jpg.jpeg", "opd-f1.jpg", None),
    ("IMG_20260827_125732.jpg.jpeg", "opd-f2.jpg", None),
    ("IMG_20260827_130211.jpg.jpeg", "opd-f4.jpg",
     [(560, 200), (3350, 570), (3390, 2495), (492, 2635)]),
    ("IMG_20260828_093043.jpg.jpeg", "ipd-g.jpg", None),
]


def board_mask(rgb):
    """The signage is pale yellow-green: green leads, blue lags, and it is bright."""
    r, g, b = (rgb[..., i].astype(np.int16) for i in range(3))
    m = (g > b + 18) & (r > b + 8) & (g > 110) & (r > 90)
    m = ndimage.binary_opening(m, np.ones((9, 9)))
    m = ndimage.binary_closing(m, np.ones((25, 25)))
    lab, n = ndimage.label(m)
    if n == 0:
        raise SystemExit("no board found")
    sizes = ndimage.sum(m, lab, range(1, n + 1))
    return lab == (int(np.argmax(sizes)) + 1)


def corners(mask):
    """Four extreme points of the quad, returned tl, tr, br, bl."""
    ys, xs = np.nonzero(mask)
    pts = np.stack([xs, ys], 1).astype(np.float64)
    s, d = pts[:, 0] + pts[:, 1], pts[:, 0] - pts[:, 1]
    tl, br = pts[np.argmin(s)], pts[np.argmax(s)]
    tr, bl = pts[np.argmax(d)], pts[np.argmin(d)]
    return np.array([tl, tr, br, bl])


def warp(im, quad):
    tl, tr, br, bl = quad
    out_h = int(round(OUT_W / BOARD_ASPECT))
    # PIL QUAD maps the output rectangle back onto these source points,
    # given in the order upper-left, lower-left, lower-right, upper-right.
    data = [float(c) for p in (tl, bl, br, tr) for c in p]
    return im.transform((OUT_W, out_h), Image.QUAD, data, Image.BICUBIC)


def plan_bbox(flat, pad=0.025):
    """Bounding box of the drawing itself, ignoring the title band and the
    legend panel, so the map is not mostly empty signboard."""
    w, h = flat.size
    ink = np.asarray(flat.convert("L")) < 110
    ink[: int(h * 0.13), :] = False
    ink[:, int(w * 0.72):] = False
    ink = ndimage.binary_opening(ink, np.ones((3, 3)))
    lab, cnt = ndimage.label(ndimage.binary_closing(ink, np.ones((45, 45))))
    sizes = ndimage.sum(ink, lab, range(1, cnt + 1))
    ys, xs = np.nonzero(lab == int(np.argmax(sizes)) + 1)
    px, py = int(w * pad), int(h * pad)
    return (max(0, xs.min() - px), max(0, ys.min() - py),
            min(w, xs.max() + px), min(h, ys.max() + py))


def main():
    for src, dst, manual in BOARDS:
        im = Image.open(f"{SRC}/{src}").convert("RGB")
        quad = np.array(manual, float) if manual else corners(board_mask(np.asarray(im)))
        flat = warp(im, quad)
        plan = flat.crop(plan_bbox(flat))
        plan.save(f"{OUT}/{dst}", quality=80, optimize=True, progressive=True)
        how = "manual" if manual else "detected"
        kb = pathlib.Path(f"{OUT}/{dst}").stat().st_size // 1024
        print(f"{dst:14s} {plan.size[0]}x{plan.size[1]}  {kb:5d} KB  {how:8s} from {src}")


if __name__ == "__main__":
    main()
