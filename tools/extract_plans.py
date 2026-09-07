"""Pull the floor-plan board out of each wall photo, correct the perspective,
and write a flat PNG the web app uses as a map background.

The boards are all the same signage product, so once the four corners are known
the warp target is a fixed-aspect rectangle. Colour detection finds those
corners on most photos; badly tilted ones get the corners supplied by hand.

A board photographed close up has no corners at all -- its edges are outside the
frame -- so those are straightened from the drawing's own lines instead: the
walls run in two perpendicular families, and the two directions they vanish
towards are enough to work out how the board was tilted. Set `rectify: "lines"`
for one of those.
"""
import pathlib

import cv2
import numpy as np
from PIL import Image
from scipy import ndimage

SRC, OUT = "images", "assets/plans"
OUT_W = 2200
BOARD_ASPECT = 1.352  # width / height, measured off the squarely-shot boards

# photo, output name, and options:
#   corners  the four board corners (tl, tr, br, bl), measured by hand, for a
#            photo where the colour detection clips the board
#   rectify  "lines" for a close-up with no board edges in frame
#   title    top band to ignore when hunting for the drawing, as a fraction of
#            the flattened height. The default suits a whole board; a photo
#            already cropped to the drawing needs less.
BOARDS = [
    ("IMG_20260824_124220.jpg.jpeg", "opd-f1.jpg", {}),
    ("IMG_20260827_125732.jpg.jpeg", "opd-f2.jpg", {}),
    ("IMG_20260827_130211.jpg.jpeg", "opd-f4.jpg",
     {"corners": [(560, 200), (3350, 570), (3390, 2495), (492, 2635)]}),
    ("IMG_20260828_093043.jpg.jpeg", "ipd-g.jpg", {}),
    ("IMG_20260906_opd_ground.jpg", "opd-g.jpg", {"rectify": "lines", "title": 0.07}),
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


def vanishing_point(segments, centre):
    """Where a family of parallel lines meets, in coordinates measured from the
    image centre. Each segment votes with a weight of its own length, so the
    long walls decide it and the short furniture strokes only nudge it."""
    cx, cy = centre
    rows = []
    for x1, y1, x2, y2 in segments:
        line = np.cross([x1 - cx, y1 - cy, 1.0], [x2 - cx, y2 - cy, 1.0])
        line /= np.linalg.norm(line[:2])          # so the weight is the length
        rows.append(line * float(np.hypot(x2 - x1, y2 - y1)))
    _, _, vt = np.linalg.svd(np.array(rows))
    v = vt[-1]
    return v[:2] / v[2]


def line_families(bgr, min_len_frac=0.03, tol_deg=12):
    """Long straight segments, split into the near-horizontal and near-vertical
    families. Everything printed on these boards is one or the other."""
    w = bgr.shape[1]
    edges = cv2.Canny(cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY), 50, 150)
    found = cv2.HoughLinesP(edges, 1, np.pi / 1440, threshold=80,
                            minLineLength=int(w * min_len_frac), maxLineGap=4)
    if found is None:
        raise SystemExit("no lines to straighten by")
    horizontal, vertical = [], []
    for x1, y1, x2, y2 in found.reshape(-1, 4).astype(float):
        angle = np.degrees(np.arctan2(y2 - y1, x2 - x1))
        if abs(angle) < tol_deg:
            horizontal.append((x1, y1, x2, y2))
        elif abs(abs(angle) - 90) < tol_deg:
            vertical.append((x1, y1, x2, y2))
    return horizontal, vertical


def rectify(im):
    """Flatten a close-up of a board, given no visible edges to warp to.

    The two vanishing points are the images of two directions we know are at
    right angles on the board, which fixes the camera's focal length; that in
    turn fixes the plane's orientation, and with it the transform that puts the
    board back square-on. Unlike a guessed deskew this restores the proportions
    as well as the angles, so the drawing is not left stretched one way.
    """
    bgr = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)
    h, w = bgr.shape[:2]
    centre = (w / 2.0, h / 2.0)
    horizontal, vertical = line_families(bgr)
    vh = vanishing_point(horizontal, centre)
    vv = vanishing_point(vertical, centre)

    focal_sq = -float(vh @ vv)      # the two directions are perpendicular
    if focal_sq <= 0:
        raise SystemExit("the board looks too square-on to straighten by lines")
    k = np.diag([np.sqrt(focal_sq), np.sqrt(focal_sq), 1.0])
    k_inv = np.linalg.inv(k)

    def direction(vp, axis):
        d = k_inv @ np.array([vp[0], vp[1], 1.0])
        d /= np.linalg.norm(d)
        return d if d[axis] > 0 else -d

    across, down = direction(vh, 0), direction(vv, 1)
    # The board's own axes, seen by the camera. Inverting takes the image back
    # onto the board; the third column only decides where the origin lands.
    to_board = np.linalg.inv(k @ np.stack([across, down, [0, 0, 1.0]], axis=1))
    to_board = to_board @ np.array([[1, 0, -centre[0]], [0, 1, -centre[1]], [0, 0, 1]])

    quad = to_board @ np.array([[0, w, w, 0], [0, 0, h, h], [1, 1, 1, 1]], float)
    quad = quad[:2] / quad[2]
    (x0, y0), (x1, y1) = quad.min(1), quad.max(1)
    scale = OUT_W / (x1 - x0)
    place = np.array([[scale, 0, -x0 * scale], [0, scale, -y0 * scale], [0, 0, 1]])
    size = (OUT_W, int(round((y1 - y0) * scale)))
    flat = cv2.warpPerspective(bgr, place @ to_board, size, flags=cv2.INTER_CUBIC,
                               borderValue=(225, 245, 240))
    return Image.fromarray(cv2.cvtColor(flat, cv2.COLOR_BGR2RGB))


def plan_bbox(flat, pad=0.025, title=0.13, legend=0.72):
    """Bounding box of the drawing itself, ignoring the title band and the
    legend panel, so the map is not mostly empty signboard. The margin is
    never allowed to reach back over either of them: on a plan that runs right
    up to the legend, padding it would drag in a slice of the panel."""
    w, h = flat.size
    top, right = int(h * title), int(w * legend)
    ink = np.asarray(flat.convert("L")) < 110
    ink[:top, :] = False
    ink[:, right:] = False
    ink = ndimage.binary_opening(ink, np.ones((3, 3)))
    lab, cnt = ndimage.label(ndimage.binary_closing(ink, np.ones((45, 45))))
    sizes = ndimage.sum(ink, lab, range(1, cnt + 1))
    ys, xs = np.nonzero(lab == int(np.argmax(sizes)) + 1)
    px, py = int(w * pad), int(h * pad)
    return (max(0, xs.min() - px), max(top, ys.min() - py),
            min(right, xs.max() + px), min(h, ys.max() + py))


def main():
    for src, dst, opts in BOARDS:
        im = Image.open(f"{SRC}/{src}").convert("RGB")
        if opts.get("rectify") == "lines":
            flat, how = rectify(im), "lines"
        else:
            manual = opts.get("corners")
            quad = np.array(manual, float) if manual else corners(board_mask(np.asarray(im)))
            flat, how = warp(im, quad), "manual" if manual else "detected"
        plan = flat.crop(plan_bbox(flat, title=opts.get("title", 0.13)))
        plan.save(f"{OUT}/{dst}", quality=80, optimize=True, progressive=True)
        kb = pathlib.Path(f"{OUT}/{dst}").stat().st_size // 1024
        aspect = plan.size[1] / plan.size[0]
        print(f"{dst:14s} {plan.size[0]}x{plan.size[1]}  aspect {aspect:.4f}  "
              f"{kb:5d} KB  {how:8s} from {src}")


if __name__ == "__main__":
    main()
