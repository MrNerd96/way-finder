# Way Finder

An indoor wayfinding web app. A patient answers two questions — *where are you?*
and *where do you want to go?* — and gets one instruction per screen, with a big
arrow, a distance, and a landmark to look for, over a 2D floor plan.

It is also the tool you use to **build the map**, standing in the corridor with
your phone: tap where a room is, type the number on the door, move on.

The app carries no institution's name. The header title comes from `APP_TITLE`
at the top of `js/data.js` — set it to whatever the site should be called, or
leave it as "Way Finder" for a name-free build.

---

## Running it

```bash
python tools/serve.py 8777
```

Then open <http://127.0.0.1:8777/> — on your phone, use your computer's LAN
address instead (e.g. `http://192.168.1.7:8777/`) so you can walk with it.

Use `tools/serve.py` rather than `python -m http.server`: the built-in server
sends no cache headers, so browsers cache your JavaScript heuristically and a
reload quietly serves yesterday's code. This one sends `no-store` on everything.

**After changing any CSS or JS, bump the `?v=` stamps in `index.html` (and the
matching ones in `sw.js`).** Cache headers only help for files the browser
bothers to re-request; a changed URL is the only thing that reliably defeats a
cache it has already filled. If the app is not behaving the way the code says it
should, check the build line the console prints on every load — that is almost
always a stale cache rather than a bug.

No build step, no dependencies, no framework. Opening `index.html` directly off
the filesystem also works, but a server is better: it lets the offline cache
(`sw.js`) register, and lets your phone reach it.

---

## Publishing to GitHub Pages

The app is plain static files, so GitHub Pages serves it as-is: commit the repo,
turn Pages on, done. HTTPS also means the service worker registers, so it keeps
working in corridors with no signal.

**But there is no server and no database.** Everything Survey mode saves goes to
that one browser's local storage:

* What you enter on your phone stays on your phone.
* A patient opening the site sees whatever is in `js/data.js` — *not* your survey.
* Your laptop cannot see your phone's work, and vice versa.
* Clearing browsing data wipes it. So does incognito, when the tab closes.

So local storage is your working copy while walking; `js/data.js` is what is
published. Moving one to the other is a deliberate step:

1. Survey on your phone. It saves as you go, on that phone.
2. Press **Export** — you get a `data.js`.
3. Replace `js/data.js` in the repo with it.
4. Bump the `?v=` stamps in `index.html` and `sw.js`.
5. Commit and push. Pages rebuilds and everyone sees the new map.

Import reads that same `data.js` back, so you can carry a survey between devices
by committing it, or hand one to someone else to continue.

Two things worth knowing before a long survey session:

* **Export before you close the browser, every time.** There is no other copy.
* **iOS Safari evicts local storage** for sites unused for about a week. If you
  survey on an iPhone across several visits, export after each one.

If several people need to survey at once and see each other's work, that needs a
real backend — which Pages cannot host. The export-and-commit loop is the
single-surveyor version of the same thing.

---

## The two modes

**Go** is what a patient sees. **Survey** is what you see. The button in the top
right switches between them.

Anything you enter is saved to the browser's local storage immediately, and can
be written out as a JSON file with **Export**.

---

## Surveying: the walk

Switch to **Survey**, pick the floor, and work with these tools:

| Tool | What it does |
|---|---|
| **Select** | Tap a room or point to edit it. |
| **Room** | **Drag a box** over the room on the plan → the editor opens with the room-number field focused. A single tap makes a default-sized box instead. While this tool is active, one finger draws — use two fingers to move the map. |
| **Point** | Tap along a corridor. Each tap drops a point **and joins it to the last one**, so a corridor is drawn as one continuous line. Tap the Point tool again to start a new line. |
| **Connect** | Tap two points to join them, or tap them again to unjoin. |
| **Move** | Drag a room or point to move it. Drag any of the **four orange corner grips** on a room box to resize it — the opposite corner stays pinned, so you can pull one edge onto a wall without disturbing the others. Grips appear once you are zoomed in enough to aim at one. |
| **Delete** | Tap a room, a point, or a connection line. |
| **Undo / Redo** | One press per action. **Ctrl+Z** and **Ctrl+Shift+Z** (or Ctrl+Y) work too — except inside a text field, where they do normal text undo. |
| **Scale** | Tap two ends of something you can measure, type the real distance in metres. |
| **Add floor** | Photograph a floor-plan board and add it as a new floor on the spot. |
| **Export / Import** | Export writes a `data.js` — drop it into `js/` and push to publish. Import reads one back (and still accepts older plain-JSON exports). |
| **Auto rooms** | Drop every rectangle `tools/detect_rooms.py` found on this floor onto the map as an unnamed room box. Safe to press twice — boxes already on the map are skipped, and the whole batch is a single undo. |
| **Copy / Paste** | **Ctrl+C** copies the highlighted room, **Ctrl+V** drops a duplicate at the middle of the view. The size, name and landmark travel; the room number does not, since no two doors share one. Repeated pastes cascade instead of stacking. Buttons are there too, for phones. |

### A workable order

1. **Set the scale first.** Until you do, every distance the app quotes is a
   guess and the status bar warns you. Pace out a corridor, tap its two ends,
   type the metres.
2. **Trace the corridors** with the Point tool — walk the corridor, tap the map
   every time you pass a junction, a lift lobby, or a door you will attach a
   room to. Do not try to be precise; roughly right is enough for the turn
   detection to work.
3. **Press Auto rooms**, then walk the corridor naming boxes. The detector has
   already drawn most of the rectangles for you; each shows a `?` until it has a
   number. Tap one, type the number on the door, and press **Save & next** —
   that saves and jumps straight to the nearest box still without a number,
   which walking a corridor is almost always the room you reach next. Delete
   the boxes that turn out to be cupboards, and use the Room tool to draw any
   the detector missed.

   The box is a visual aid and a tap target — routing uses its centre — but
   matching it to the plan makes the map far easier to read back later.
4. **Connect each room** to its nearest corridor point. A room with no
   connection can never be routed to.
5. **Fill in the landmark** for anything a patient will be told to look for.
   This is the single field that decides whether the app is usable: *"opposite
   the blue water cooler"* works, *"corridor junction 4"* does not.
6. **Export before you close the browser.** Local storage is not a backup.

### Lifts and staircases

A lift on the 1st floor and the same lift on the 2nd floor are two separate
points. Give them the **same shaft id** (e.g. `opd-lift-east`) and the router
connects them automatically. That is the only thing that lets a route cross
floors, so it is worth getting right.

Stairs are deliberately costed as far more effort than lifts, so routes go via
the lift unless the stairs are dramatically shorter. Patients here are often
unwell or elderly.

---

## What a patient sees

* One instruction per screen — a large arrow, the action, the distance in both
  metres and paces, and the landmark to walk towards.
* A map underneath, zoomed to the leg of the walk being described, with the
  travelled route faded and the current segment bright.
* The floor switches by itself when the route reaches a lift or staircase.
* A speaker button reads the instruction aloud in the selected language.
* English, Telugu and Hindi for everything the app says itself — the verbs, the
  distances, the arrows. Room names and landmarks appear in whatever language
  they were typed in, so a Telugu instruction can still end up wrapped around an
  English landmark. See *Known limitations*.

### QR stickers

Every point answers to a link of the form `…/?at=<point id>` — the ids are in
the export. Print one as a QR sticker, put it on the wall at that spot, and a
patient who scans it lands in the app with **"where are you?" already answered** —
no typing, no reading, no literacy required. `?to=` and `?lang=` work the same
way, so a department can hand out a sticker that routes straight to itself.

The editor no longer offers a button to copy that link; build the URLs from the
exported ids when you are ready to print a sheet of stickers.

This is the part that makes the app usable by someone who cannot read, and it
costs a few rupees per sticker. It is worth doing early.

---

## The data

One JSON object, three lists.

```jsonc
{
  "floors": [
    { "id": "opd-f2", "label": "OPD · 2nd Floor", "level": 2,
      "plan": "assets/plans/opd-f2.jpg", "aspect": 1.0756,
      "metresPerUnit": 75, "calibrated": false }
  ],
  "nodes": [
    { "id": "r-1", "floor": "opd-f2", "x": 0.30, "y": 0.45, "kind": "room",
      "w": 0.10, "h": 0.055,
      "room": "214", "name": "Dermatology OPD",
      "landmark": "opposite the blue water cooler" }
  ],
  "edges": [["r-1", "f2-c-3"]]
}
```

* `x` and `y` are fractions of the plan image **width** — `x` runs 0…1 across
  it, `y` runs 0…`aspect` down it. Storing them this way means the data survives
  re-exporting the plan images at a different resolution.
* `w` and `h` are the room box, in the same units, centred on `x`/`y`. They are
  optional — a room without them gets a default square.
* Distances and compass bearings are **derived** from the coordinates. Nobody
  types a distance or a direction; `metresPerUnit` (set by the Scale tool)
  converts to metres.
* Routes are **never** authored. `js/graph.js` runs Dijkstra over the graph and
  generates the sentences by comparing the bearing of each corridor segment
  against the next. Adding one room does not mean adding routes to it.

The editor deliberately shows only what you need at a door: what it is, the room
number, the name, and the landmark. The shaft field appears only for lifts and
staircases. These keys are still honoured if you put them in the JSON by hand or
in an import, but no longer have a field:

* `aliases` — extra search terms, never displayed (`["skin", "skin opd"]`).
* `name_te`, `name_hi`, `landmark_te`, `landmark_hi` — translations used in
  place of `name` / `landmark` when that language is selected.
* `canStart` — force a place into the "where are you now?" list. Without it,
  that list offers every lift, staircase, entrance and landmark, which is
  normally what you want. Editing a place never clears a `canStart` it already
  had.

---

## The floor plans

`assets/plans/*.jpg` were produced from the photographs in `images/` by
`tools/extract_plans.py`, which finds the signboard in each photo, corrects the
perspective, crops to the drawing, and compresses it.

To add a plan properly:

```bash
python tools/extract_plans.py
```

Add your photo to the `BOARDS` list at the top of that file. If the board is
badly tilted and the colour detection clips it, pass the four corners by hand —
`opd-f4.jpg` is there as a worked example.

For a quick add while walking, the **Add floor** button in Survey mode takes a
photo straight from the phone camera. It does not correct perspective, so
redo it with the script later.

## Finding the rooms automatically

```bash
python tools/detect_rooms.py            # writes js/detected.js
python tools/detect_rooms.py --debug .  # also writes <floor>_rooms.png overlays
```

Rather than hunting for rectangles — printed plans are full of near-rectangles
that are not rooms — it thickens the ink until the gaps left by doors close,
then treats every enclosed pocket of background as a room interior. Pockets are
kept or thrown away on size, on how squarely they fill their bounding box, and
on whether they sit on the solid red the boards use for staircases and lift
cores.

Current yield: **95 candidates on IPD Ground, 74 on OPD 1st, 69 on OPD 2nd, 74
on OPD 4th.**

These are candidates, not data. On the OPD floors, where rooms are drawn as
clean empty rectangles, most are real. On IPD Ground the wards are drawn with
beds and furniture, so their interiors break up and the results are noisier —
expect to delete more there. Tune `SEAL`, `MIN_FILL` and the area limits at the
top of the script if a particular floor comes out badly, and use `--debug` to
see what it matched.

---

## Known limitations

* **The seeded points are eyeballed.** Every pre-loaded corridor and lift was
  placed by reading the photographed fire plans, not by visiting the building.
  Correct or delete them.
* **No OPD Ground or 3rd floor.** Those boards were not photographed. OPD Ground
  matters most — it is where patients come in.
* **OPD and IPD are not connected** to each other, because the ground-floor link
  between them is not mapped.
* **No live position.** The app never knows where you are; it asks. QR stickers
  are the fix. Bluetooth beacons would give a real blue dot but cost money,
  need batteries, and need a native app.
* **No compass.** The first instruction says which landmark to face rather than
  which way to turn. Phone compasses are unreliable near this much steel.
* **The Telugu and Hindi UI strings are a first draft** (`js/i18n.js`). Have a
  native speaker read them aloud before this goes in front of patients.
* **Room names and landmarks are single-language.** Whatever you type is what
  every patient sees, whichever language they pick. The editor was trimmed to
  stay usable one-handed on a walk; if this turns out to matter, the underlying
  `name_te` / `landmark_te` support is still there and only needs its fields
  putting back.
* **Search matches only the room number and the name.** Without the aliases
  field, someone typing "skin" will not find "Dermatology OPD". Adding `aliases`
  to the exported JSON still works if that becomes a problem.
* **Local storage is not a backup, and it is per-device.** Export after every
  survey session; see *Publishing to GitHub Pages*.
* **There is no bulk delete.** Removing a floor's worth of boxes means the
  Delete tool, or re-importing an earlier export.

## Worth doing next

1. Photograph the missing floor plans, starting with OPD Ground.
2. Survey one floor completely and test it on real patients — especially elderly
   and low-literacy ones. That will change the design more than anything else.
3. Print QR stickers once the point ids are stable.
4. Replace the seeded corridors with traced ones.
5. Take a photo of each lift lobby and junction and show it on the step card. A
   photograph of the actual place beats any map for someone who cannot read.
