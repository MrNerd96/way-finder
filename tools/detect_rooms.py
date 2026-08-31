"""Find the rectangular rooms on each floor plan so they do not have to be
drawn by hand.

The trick is not to look for rectangles directly — printed plans are full of
near-rectangles that are not rooms (furniture, hatching, the site outline).
Instead we look at the *space between the walls*: thicken the ink until the
door gaps close, then every enclosed pocket of background is a room interior.
Filtering those pockets by size and how well they fill their bounding box
throws away the corridors, the text, and the noise.

Output is written to js/detected.js as normalised boxes the app can drop
straight onto the map.

Run:  python tools/detect_rooms.py [--debug]
"""
import json
import sys

import cv2
import numpy as np

PLANS = [
    ("ipd-g", "assets/plans/ipd-g.jpg"),
    ("opd-f1", "assets/plans/opd-f1.jpg"),
    ("opd-f2", "assets/plans/opd-f2.jpg"),
    ("opd-f4", "assets/plans/opd-f4.jpg"),
]

# Wall thickening, in pixels, applied to close the gaps doors leave in walls.
# Too small and rooms bleed into the corridor; too large and small rooms vanish.
SEAL = 3

# Room size limits as a fraction of the whole plan's area.
MIN_AREA_FRAC = 0.00035
MAX_AREA_FRAC = 0.035

MIN_SIDE_FRAC = 0.016   # of image width, keeps out label-sized specks
MIN_FILL = 0.62         # pocket area / bounding-box area: how rectangular it is
MAX_ASPECT = 6.0
MAX_RED = 0.25          # share of a box that may be red before it is discarded
MAX_OVERLAP = 0.45      # IoU above which two boxes are treated as duplicates


def red_mask(bgr):
    """Staircases and lift cores are printed solid red on these boards. They are
    not rooms, and their internal steps otherwise read as a row of tiny ones."""
    b, g, r = (bgr[..., i].astype(np.int16) for i in range(3))
    m = ((r > g + 40) & (r > b + 40) & (r > 90)).astype(np.uint8) * 255
    return cv2.dilate(m, np.ones((7, 7), np.uint8))


def dedupe(boxes):
    """Drop near-duplicate detections, keeping the larger of any overlapping
    pair. Genuinely nested rooms overlap far less than this and survive."""
    boxes = sorted(boxes, key=lambda b: b[2] * b[3], reverse=True)
    kept = []
    for box in boxes:
        x, y, w, h = box
        clash = False
        for kx, ky, kw, kh in kept:
            ix = max(0, min(x + w, kx + kw) - max(x, kx))
            iy = max(0, min(y + h, ky + kh) - max(y, ky))
            inter = ix * iy
            if not inter:
                continue
            if inter / float(w * h + kw * kh - inter) > MAX_OVERLAP:
                clash = True
                break
        if not clash:
            kept.append(box)
    return kept


def ink_mask(gray):
    """Dark line-work, found relative to the local background so the glare on
    the photographed signboards does not wash whole regions out."""
    return cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV,
        blockSize=31, C=10)


def detect(path):
    bgr = cv2.imread(path)
    if bgr is None:
        raise SystemExit("could not read " + path)
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    red = red_mask(bgr)
    h, w = gray.shape
    area_px = float(h * w)

    ink = ink_mask(gray)
    k = np.ones((SEAL * 2 + 1, SEAL * 2 + 1), np.uint8)
    walls = cv2.dilate(ink, k)
    interior = cv2.bitwise_not(walls)

    count, _, stats, _ = cv2.connectedComponentsWithStats(interior, 8)

    boxes = []
    for i in range(1, count):
        x, y, bw, bh, a = stats[i]
        if a / area_px < MIN_AREA_FRAC or a / area_px > MAX_AREA_FRAC:
            continue
        if bw < MIN_SIDE_FRAC * w or bh < MIN_SIDE_FRAC * w:
            continue
        if a / float(bw * bh) < MIN_FILL:
            continue
        ratio = bw / float(bh)
        if ratio > MAX_ASPECT or ratio < 1.0 / MAX_ASPECT:
            continue
        # Anything hard against the edge is the outside, not a room.
        if x <= 1 or y <= 1 or x + bw >= w - 1 or y + bh >= h - 1:
            continue
        if red[y:y + bh, x:x + bw].mean() / 255.0 > MAX_RED:
            continue
        # Give back the pixels the wall-thickening ate.
        boxes.append((x - SEAL, y - SEAL, bw + SEAL * 2, bh + SEAL * 2))

    return dedupe(boxes), (w, h), ink


def to_normalised(boxes, size):
    """The app stores coordinates as fractions of the image WIDTH, with the
    box centred on the node."""
    w, h = size
    out = []
    for x, y, bw, bh in boxes:
        out.append({
            "x": round((x + bw / 2) / w, 4),
            "y": round((y + bh / 2) / w, 4),
            "w": round(bw / w, 4),
            "h": round(bh / w, 4),
        })
    out.sort(key=lambda b: (b["y"], b["x"]))   # reading order, top to bottom
    return out


def debug_image(path, boxes, out_path):
    img = cv2.imread(path)
    for x, y, bw, bh in boxes:
        cv2.rectangle(img, (x, y), (x + bw, y + bh), (0, 90, 255), 2)
    cv2.imwrite(out_path, img)


def main():
    debug = "--debug" in sys.argv
    debug_dir = sys.argv[sys.argv.index("--debug") + 1] if debug and len(sys.argv) > sys.argv.index("--debug") + 1 else "."

    result = {}
    for floor_id, path in PLANS:
        boxes, size, _ = detect(path)
        result[floor_id] = to_normalised(boxes, size)
        print("%-8s %3d rooms found  (%dx%d)" % (floor_id, len(boxes), size[0], size[1]))
        if debug:
            debug_image(path, boxes, "%s/%s_rooms.png" % (debug_dir, floor_id))

    body = json.dumps(result, indent=1, separators=(",", ": "))
    with open("js/detected.js", "w", encoding="utf-8") as f:
        f.write("/* Rectangles found automatically by tools/detect_rooms.py.\n"
                "   These are CANDIDATES, not data: some are real rooms, some are\n"
                "   cupboards or toilets, and some are wrong. Survey mode drops them on\n"
                "   the map for you to name, resize or delete. Regenerate with:\n"
                "       python tools/detect_rooms.py\n"
                "*/\n"
                "var DETECTED_ROOMS = " + body + ";\n")
    print("wrote js/detected.js")


if __name__ == "__main__":
    main()
