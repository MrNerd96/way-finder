/* Survey mode: everything needed to enter the building one-handed and come out
   with a working map. Designed for the walk itself, not for a desk afterwards —
   tap where you are standing, type the number on the door, move on. */
var Survey = (function () {
  var bar, statusEl, editor, editorForm, fieldsEl, editorTitle;
  var tool = 'select';
  var editingId = null;
  var chainFrom = null;       // last point placed, so corridors draw as a polyline
  var linkAnchor = null;
  var calibrate = null;       // { a: {x,y} } while picking the second point
  var selected = null;        // the point Copy acts on; outlives the editor
  var clipboard = null;       // fallback for when the OS clipboard is unreadable

  /* Marker so a paste only fires on something this app put on the clipboard,
     and not on whatever text happened to be there. */
  var CLIP_KEY = 'way-finder-place';

  var HINTS = {
    select: 'Tap any room or point to edit it.',
    room:   'Drag a box over the room on the plan, then type its number. A single tap makes a default-sized box. Two fingers to move the map.',
    point:  'Tap along a corridor. Points join up automatically — tap the Point tool again to start a new line.',
    link:   'Tap one point, then another, to join or unjoin them.',
    move:   'Drag a room or point to move it. Drag any of the four orange corners to resize a room box — the opposite corner stays put.',
    erase:  'Tap a room, point, or connection to delete it.'
  };

  var KINDS = [
    ['room', 'Room / OPD'],
    ['counter', 'Counter / desk'],
    ['toilet', 'Toilet'],
    ['lift', 'Lift'],
    ['stair', 'Staircase'],
    ['entrance', 'Entrance'],
    ['landmark', 'Landmark'],
    ['junction', 'Corridor point']
  ];

  function b() { return Store.get(); }

  function isTextField(el) {
    return !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
  }

  function setStatus(msg, warn) {
    statusEl.textContent = msg;
    statusEl.className = 'surveyStatus' + (warn ? ' warn' : '');
  }

  function refreshStatus() {
    var f = Graph.floorOf(b(), MapView.getFloor());
    var s = Store.stats();
    updateHistoryButtons();
    if (calibrate) return;
    var waiting = unnamedRooms().length;
    var tail = waiting ? '  ' + waiting + ' room' + (waiting === 1 ? '' : 's') + ' still need a number.'
                       : '  (' + s.rooms + ' rooms, ' + s.nodes + ' points)';
    if (f && !f.calibrated) {
      setStatus(HINTS[tool] + '  ⚠ Scale not set for this floor — tap Scale.' + tail, true);
    } else {
      setStatus(HINTS[tool] + tail);
    }
  }

  function setTool(t) {
    if (tool === 'point' && t === 'point') chainFrom = null;   // break the polyline
    tool = t;
    linkAnchor = null;
    MapView.setLinkAnchor(null);
    MapView.setShowHandles(t === 'move');
    if (t !== 'point') chainFrom = null;
    Array.prototype.forEach.call(bar.querySelectorAll('.tool[data-tool]'), function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.tool === t ? 'true' : 'false');
    });
    refreshStatus();
  }

  /* ---------- map interaction ---------- */

  function onTap(pt) {
    if (calibrate) return handleCalibrateTap(pt);

    var hit = MapView.hitNode(pt);

    if (tool === 'select') {
      if (hit) openEditor(hit.id);
      else { selected = null; MapView.setSelection(null); }
      return;
    }

    if (tool === 'room') {
      if (hit) { openEditor(hit.id); return; }
      var room = createNode(pt, 'room');
      openEditor(room.id, true);
      return;
    }

    if (tool === 'point') {
      // One tap drops a point AND joins it to the previous one. That is a single
      // action to the person tracing a corridor, so it takes a single undo.
      Store.mark();
      var target = hit || createNode(pt, 'junction', true);
      if (chainFrom && chainFrom !== target.id) Store.toggleEdge(chainFrom, target.id);
      chainFrom = target.id;
      MapView.setLinkAnchor(target.id);
      refreshStatus();
      return;
    }

    if (tool === 'link') {
      if (!hit) return;
      if (!linkAnchor) {
        linkAnchor = hit.id;
        MapView.setLinkAnchor(hit.id);
        setStatus('Now tap the point to join it to.');
        return;
      }
      if (linkAnchor === hit.id) { linkAnchor = null; MapView.setLinkAnchor(null); refreshStatus(); return; }
      Store.mark();
      var what = Store.toggleEdge(linkAnchor, hit.id);
      App.toast(what === 'added' ? 'Joined' : 'Unjoined');
      linkAnchor = null;
      MapView.setLinkAnchor(null);
      refreshStatus();
      return;
    }

    if (tool === 'erase') {
      if (hit) {
        var gone = shortName(hit);
        Store.mark();
        Store.removeNode(hit.id);
        undoably('Deleted ' + gone);
        refreshStatus();
        return;
      }
      var edge = MapView.hitEdge(pt);
      if (edge) {
        Store.mark();
        Store.toggleEdge(edge[0], edge[1]);
        App.toast('Connection removed');
      }
      return;
    }
  }

  /* Called on press, before any drag. Returning a descriptor claims the gesture
     from the map's pan; returning null lets the map pan as usual. */
  function onDown(pt) {
    if (calibrate) return null;

    if (tool === 'move') {
      // Grips win over the body, and they sit on the corners where they may
      // fall a little outside the box, so they are tested across the floor.
      var grip = MapView.hitAnyHandle(pt);
      if (grip) {
        Store.mark();
        return { kind: 'resize', node: grip.node, corner: grip.corner, anchor: grip.anchor };
      }
      var hit = MapView.hitNode(pt);
      if (!hit) return null;
      Store.mark();
      return { kind: 'move', node: hit, grabDX: pt.x - hit.x, grabDY: pt.y - hit.y };
    }

    if (tool === 'room') {
      // Dragging over blank plan sweeps out the room's box. Landing on an
      // existing room instead means "edit that one", handled by the tap.
      if (MapView.hitNode(pt)) return null;
      return { kind: 'rubber' };
    }

    return null;
  }

  function onDragEnd() {
    Store.commit();
    refreshStatus();
  }

  /* A box swept out with the Room tool becomes a room of exactly that size. */
  function onRubber(rect) {
    Store.mark();
    var n = createNode({ x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 }, 'room', true);
    n.w = rect.w;
    n.h = rect.h;
    Store.commit();
    openEditor(n.id, true);
  }

  /* Rooms on the current floor that still have no number on them. */
  function unnamedRooms() {
    var floorId = MapView.getFloor();
    return b().nodes.filter(function (n) {
      return n.floor === floorId && n.kind === 'room' && !n.room;
    });
  }

  function nearestUnnamed(from) {
    var best = null, bestD = Infinity;
    unnamedRooms().forEach(function (n) {
      if (from && n.id === from.id) return;
      var d = Math.pow(n.x - from.x, 2) + Math.pow(n.y - from.y, 2);
      if (d < bestD) { bestD = d; best = n; }
    });
    return best;
  }

  /* Drop the rectangles tools/detect_rooms.py found on this floor onto the map
     as unnamed room boxes, so the walk becomes "tap a box, type the number"
     instead of drawing every room by hand. */
  function addDetectedRooms() {
    var floorId = MapView.getFloor();
    var list = (typeof DETECTED_ROOMS !== 'undefined' && DETECTED_ROOMS[floorId]) || [];
    if (!list.length) {
      App.toast('No rectangles were detected for this floor.');
      return;
    }
    var existing = b().nodes.filter(function (n) {
      return n.floor === floorId && n.kind === 'room';
    });
    var fresh = list.filter(function (box) { return !covered(box, existing); });
    if (!fresh.length) {
      App.toast('All ' + list.length + ' detected boxes are already on the map.');
      return;
    }
    Store.mark();
    fresh.forEach(function (box) {
      b().nodes.push({
        id: Store.newId('r'),
        floor: floorId,
        x: box.x, y: box.y, w: box.w, h: box.h,
        kind: 'room', name: '', aliases: [],
        seed: true, auto: true
      });
    });
    Store.commit();
    // The warning that used to be in the dialog belongs here now: these are
    // guesses read off the printed plan, and some will be cupboards.
    App.toast('Added ' + fresh.length + ' guessed boxes · tap each one and type its ' +
              'number, delete the ones that are not rooms · Undo removes them all');
    refreshStatus();
  }

  /* Treat a candidate as already present if its centre sits in a known room. */
  function covered(box, existing) {
    return existing.some(function (n) {
      var w = n.w || 0.045, h = n.h || 0.045;
      return Math.abs(n.x - box.x) < w / 2 && Math.abs(n.y - box.y) < h / 2;
    });
  }

  /* What to call a thing in a toast. Graph.placeName falls back to "this
     point", which reads oddly once it is already gone. */
  function shortName(n) {
    if (!n) return 'that';
    if (n.room && n.name) return n.room + ' — ' + n.name;
    return n.room || n.name || (n.kind === 'room' ? 'that room' : 'that point');
  }

  /* Deleting used to go through window.confirm. Where a browser suppresses
     dialogs -- an embedded preview, an iframe without allow-modals, a phone
     set to block them -- confirm returns false and the delete silently did
     nothing, which is indistinguishable from a broken tool. Deleting a
     connection never asked and always worked, so the two behaved differently
     for no reason a surveyor could see.

     So nothing asks now. Every one of these was already wrapped in Store.mark()
     and undoable, the toast says what went, and Undo puts it back. That is also
     the better trade in a corridor: a modal is two taps and a stop, and the
     thing being deleted is usually a point placed a second ago. */
  function undoably(msg) {
    App.toast(msg + ' · Undo to put it back');
  }

  function createNode(pt, kind, alreadyMarked) {
    if (!alreadyMarked) Store.mark();
    var n = {
      id: Store.newId(kind === 'room' ? 'r' : 'p'),
      floor: MapView.getFloor(),
      x: pt.x, y: pt.y,
      kind: kind,
      name: '',
      aliases: []
    };
    Store.addNode(n);
    return n;
  }

  /* ---------- node editor ---------- */

  function field(labelText, inputEl) {
    var wrap = document.createElement('div');
    var lab = document.createElement('label');
    lab.textContent = labelText;
    lab.setAttribute('for', inputEl.id);
    wrap.appendChild(lab);
    wrap.appendChild(inputEl);
    return wrap;
  }

  function textInput(id, value, placeholder) {
    var i = document.createElement('input');
    i.type = 'text';
    i.id = id;
    i.value = value || '';
    if (placeholder) i.placeholder = placeholder;
    return i;
  }

  function openEditor(id, isNew) {
    var n = Store.node(id);
    if (!n) return;
    editingId = id;
    selected = id;
    // Orange means "this is the one you are working on" — set it wherever the
    // editor opens from, not just when Save & next moves you along.
    MapView.setSelection(id);
    editorTitle.textContent = isNew ? 'New point' : 'Edit point';
    fieldsEl.innerHTML = '';

    var kindSel = document.createElement('select');
    kindSel.id = 'f_kind';
    KINDS.forEach(function (k) {
      var o = document.createElement('option');
      o.value = k[0]; o.textContent = k[1];
      if (n.kind === k[0]) o.selected = true;
      kindSel.appendChild(o);
    });
    fieldsEl.appendChild(field('What is this?', kindSel));

    var roomIn = textInput('f_room', n.room, 'e.g. 214');
    roomIn.setAttribute('autocapitalize', 'characters');
    fieldsEl.appendChild(field('Room number', roomIn));

    /* One field, not two. Standing at a door, "is Dermatology OPD a name or a
       service?" is a question with no good answer, and asking it 300 times is
       how the data ends up inconsistent. So: type what the plate says, in the
       order it is written. The first entry is what the room gets called; the
       rest are the other things a patient can be sent here for.

       The list is flat and holds both levels of the hierarchy on purpose. Put
       "Radiology" and "X-ray" in it and either finds the room, with nothing to
       model about how the two relate. */
    var placeIn = textInput('f_place', (n.services && n.services.length)
      ? n.services.join(', ') : (n.name || ''), '');
    var placeWrap = field('Name', placeIn);
    var placeLabel = placeWrap.querySelector('label');
    fieldsEl.appendChild(placeWrap);

    fieldsEl.appendChild(field('Landmark next to it',
      textInput('f_landmark', n.landmark, 'e.g. opposite the blue water cooler')));

    var shafts = [];
    b().nodes.forEach(function (o) {
      if (o.shaft && shafts.indexOf(o.shaft) < 0) shafts.push(o.shaft);
    });
    var shaftIn = textInput('f_shaft', n.shaft, 'e.g. opd-lift-east');
    shaftIn.setAttribute('list', 'shaftList');
    var dl = document.createElement('datalist');
    dl.id = 'shaftList';
    shafts.forEach(function (s) {
      var o = document.createElement('option');
      o.value = s;
      dl.appendChild(o);
    });
    shaftIn.appendChild(dl);
    var shaftField = field('Lift / stair shaft id', shaftIn);
    fieldsEl.appendChild(shaftField);

    // Only lifts and staircases need a shaft, and they are a handful of points
    // on any floor. Hide it for everything else, and bring it back the moment
    // the kind is switched to one that needs it.
    function syncShaft() {
      var k = kindSel.value;
      shaftField.hidden = (k !== 'lift' && k !== 'stair');
      // A staircase or a corridor point is one thing with one name. A room is
      // however many things are written on its door, so it gets asked
      // differently — same field, different question.
      var many = (k !== 'junction' && k !== 'lift' && k !== 'stair');
      placeLabel.textContent = many ? "What's here" : 'Name';
      placeIn.placeholder = many
        ? 'e.g. Neurology, Spirometry, EEG'
        : 'e.g. North-west staircase';
    }
    kindSel.addEventListener('change', syncShaft);
    syncShaft();

    // "Save & next" only earns its place while there are still boxes to name.
    var nextBtn = document.getElementById('editorNext');
    if (nextBtn) nextBtn.hidden = !nearestUnnamed(n);

    editor.hidden = false;
    if (isNew) setTimeout(function () { roomIn.focus(); }, 60);
  }

  /* Write the form back onto the node. Split out from saveEditor so that
     "Save & next" can save without closing the sheet. */
  function applyEditor() {
    var n = Store.node(editingId);
    if (!n) return null;
    Store.mark();
    n.kind = document.getElementById('f_kind').value;
    n.room = document.getElementById('f_room').value.trim();
    n.landmark = document.getElementById('f_landmark').value.trim();
    n.shaft = document.getElementById('f_shaft').value.trim();

    /* The first thing typed is the name, which is what the rest of the app
       already reads. The whole list is kept only when there is more than one
       thing, so a published data.js does not gain a one-item list on every
       room that is simply itself. */
    var typed = document.getElementById('f_place').value
      .split(/[,\n]/)
      .map(function (t) { return t.trim(); })
      .filter(function (t) { return t.length; });
    n.name = typed[0] || '';
    if (typed.length > 1) n.services = typed; else delete n.services;
    delete n.seed;      // once a human has touched it, it is real data
    delete n.sample;
    delete n.auto;
    Store.commit();
    return n;
  }

  function saveEditor(ev) {
    if (ev) ev.preventDefault();
    if (!applyEditor()) { closeEditor(); return; }
    closeEditor();
    App.toast('Saved');
    refreshStatus();
  }

  /* Naming a floor's worth of detected boxes is the long part of the survey, so
     jump straight to the nearest one still without a number — which, walking a
     corridor, is almost always the room you are standing at next. */
  function saveAndNext() {
    var saved = applyEditor();
    if (!saved) { closeEditor(); return; }
    var next = nearestUnnamed(saved);
    refreshStatus();
    if (!next) {
      closeEditor();
      App.toast('That was the last unnamed room on this floor.');
      return;
    }
    MapView.centreOn(next);
    MapView.setSelection(next.id);
    openEditor(next.id, true);
  }

  /* The highlight outlives the editor: it marks the point you last worked on,
     which is what Copy acts upon. Tapping empty plan clears it. */
  function closeEditor() {
    editor.hidden = true;
    editingId = null;
  }

  function deleteEditing() {
    if (!editingId) return;
    var n = Store.node(editingId);
    var gone = shortName(n);
    Store.mark();
    Store.removeNode(editingId);
    closeEditor();
    undoably('Deleted ' + gone);
    refreshStatus();
  }

  /* ---------- scale calibration ---------- */

  function startCalibrate() {
    calibrate = {};
    setStatus('Tap one end of something you can measure — a corridor, a door frame, a row of tiles.', true);
  }

  function handleCalibrateTap(pt) {
    if (!calibrate.a) {
      calibrate.a = pt;
      setStatus('Now tap the other end of it.', true);
      return;
    }
    var dx = pt.x - calibrate.a.x, dy = pt.y - calibrate.a.y;
    var units = Math.sqrt(dx * dx + dy * dy);
    calibrate = null;
    if (units < 0.01) { App.toast('Those two taps were too close together.'); refreshStatus(); return; }
    var answer = window.prompt('How many METRES is that distance in real life?', '20');
    if (answer === null) { refreshStatus(); return; }
    var m = parseFloat(answer);
    if (!(m > 0)) { App.toast('Enter a number of metres.'); refreshStatus(); return; }
    var f = Graph.floorOf(b(), MapView.getFloor());
    Store.mark();
    f.metresPerUnit = m / units;
    f.calibrated = true;
    Store.commit();
    App.toast('Scale set for ' + f.label);
    refreshStatus();
  }

  /* ---------- adding a floor from a phone photo ---------- */

  function addFloorFromFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var maxW = 1400;
        var scale = Math.min(1, maxW / img.width);
        var cv = document.createElement('canvas');
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        var dataUrl = cv.toDataURL('image/jpeg', 0.75);

        var label = window.prompt('Name this floor (e.g. "OPD · Ground")', 'New floor');
        if (label === null) return;
        var levelRaw = window.prompt('Which level is it? (0 = ground, 1 = first, ...)', '0');
        if (levelRaw === null) return;

        var id = 'floor-' + Date.now().toString(36);
        Store.mark();
        Store.addFloor({
          id: id,
          block: '',
          level: parseInt(levelRaw, 10) || 0,
          label: label,
          planData: dataUrl,
          aspect: cv.height / cv.width,
          metresPerUnit: 75,
          calibrated: false
        });
        App.renderFloorStrip();
        MapView.setFloor(id);
        App.toast('Floor added. Set its scale next.');
        refreshStatus();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* ---------- copy & paste ---------- */

  /* What travels: the shape and the description, never the identity. The room
     number is left behind because no two doors share one — a pasted box arrives
     unnamed, shows a "?", and joins the Save & next queue like any other. */
  function payloadOf(n) {
    var out = { kind: n.kind, name: n.name || '', landmark: n.landmark || '' };
    if (n.w) out.w = n.w;
    if (n.h) out.h = n.h;
    if (n.shaft) out.shaft = n.shaft;
    if (n.canStart) out.canStart = true;
    if (n.aliases && n.aliases.length) out.aliases = n.aliases.slice();
    if (n.services && n.services.length) out.services = n.services.slice();
    return out;
  }

  function copySelected() {
    var n = selected && Store.node(selected);
    if (!n) { App.toast('Tap a room first, then copy.'); return null; }
    clipboard = payloadOf(n);
    App.toast('Copied ' + (Graph.placeName(n) || 'point') + '. Paste puts a copy in the middle of the view.');
    return JSON.stringify({ marker: CLIP_KEY, place: clipboard }, null, 1);
  }

  /* Somewhere at the centre of the view that is not already inside a room, so
     repeated pastes cascade instead of stacking invisibly on one another. */
  function freeSpot(w, h) {
    var floorId = MapView.getFloor();
    var rooms = b().nodes.filter(function (n) { return n.floor === floorId && n.kind === 'room'; });
    var c = MapView.viewCentre();
    var pt = { x: c.x, y: c.y };
    for (var i = 0; i < 15; i++) {
      var clash = rooms.some(function (n) {
        return Math.abs(n.x - pt.x) < (n.w || 0.045) / 2 &&
               Math.abs(n.y - pt.y) < (n.h || 0.045) / 2;
      });
      if (!clash) break;
      pt = { x: c.x + (i + 1) * (w || 0.045) * 0.55,
             y: c.y + (i + 1) * (h || 0.045) * 0.55 };
    }
    return pt;
  }

  function pasteRoom(payload) {
    var src = payload || clipboard;
    if (!src) { App.toast('Nothing copied yet.'); return; }

    var floorId = MapView.getFloor();
    var spot = freeSpot(src.w, src.h);

    var n = {
      id: Store.newId(src.kind === 'room' ? 'r' : 'p'),
      floor: floorId,
      x: spot.x, y: spot.y,
      kind: src.kind || 'room',
      name: src.name || '',
      landmark: src.landmark || '',
      aliases: (src.aliases || []).slice()
    };
    if (src.w) n.w = src.w;
    if (src.h) n.h = src.h;
    if (src.canStart) n.canStart = true;
    /* A shaft id is how two floors' lifts are recognised as one lift, so it
       should follow a paste onto a different floor — but two on the SAME floor
       sharing one would wire a lift to itself. */
    if (src.shaft && !b().nodes.some(function (o) {
      return o.floor === floorId && o.shaft === src.shaft;
    })) n.shaft = src.shaft;

    Store.mark();
    Store.addNode(n);
    selected = n.id;
    MapView.setSelection(n.id);
    App.toast('Pasted. Drag it into place with Move.');
    refreshStatus();
  }

  function readPayload(text) {
    try {
      var parsed = JSON.parse(text);
      if (parsed && parsed.marker === CLIP_KEY && parsed.place) return parsed.place;
    } catch (err) { /* not ours */ }
    return null;
  }

  /* ---------- undo / redo ---------- */

  function afterHistoryChange() {
    App.renderFloorStrip();
    MapView.draw();
    refreshStatus();
    updateHistoryButtons();
  }

  function doUndo() {
    if (Store.undo()) { App.toast('Undone'); afterHistoryChange(); }
    else App.toast('Nothing to undo');
  }

  function doRedo() {
    if (Store.redo()) { App.toast('Redone'); afterHistoryChange(); }
    else App.toast('Nothing to redo');
  }

  function updateHistoryButtons() {
    var u = document.getElementById('undoBtn'), r = document.getElementById('redoBtn');
    if (u) u.disabled = !Store.canUndo();
    if (r) r.disabled = !Store.canRedo();
  }

  /* ---------- wiring ---------- */

  return {
    init: function () {
      bar = document.getElementById('surveyBar');
      statusEl = document.getElementById('surveyStatus');
      editor = document.getElementById('editor');
      editorForm = document.getElementById('editorForm');
      fieldsEl = editorForm.querySelector('.fields');
      editorTitle = document.getElementById('editorTitle');

      Array.prototype.forEach.call(bar.querySelectorAll('.tool[data-tool]'), function (btn) {
        btn.addEventListener('click', function () { setTool(btn.dataset.tool); });
      });

      document.getElementById('undoBtn').addEventListener('click', doUndo);
      document.getElementById('redoBtn').addEventListener('click', doRedo);
      // Every mutation goes through the store, so that is the one place that
      // can keep the two history buttons honest.
      Store.onChange(updateHistoryButtons);
      updateHistoryButtons();

      /* Ctrl+Z / Ctrl+Shift+Z (and Ctrl+Y) anywhere except a text box, where the
         browser's own text undo is the one you actually want. */
      document.addEventListener('keydown', function (ev) {
        if (isTextField(ev.target)) return;
        if (!(ev.ctrlKey || ev.metaKey) || ev.altKey) return;
        var k = (ev.key || '').toLowerCase();
        if (k === 'z' && !ev.shiftKey) { ev.preventDefault(); doUndo(); }
        else if ((k === 'z' && ev.shiftKey) || k === 'y') { ev.preventDefault(); doRedo(); }
      });

      document.getElementById('calBtn').addEventListener('click', startCalibrate);

      document.getElementById('exportBtn').addEventListener('click', function () {
        Store.exportJSON();
        App.toast('Saved data.js — put it in js/ and push to publish it to everyone.');
      });

      document.getElementById('changesBtn').addEventListener('click', function () {
        var s = Store.exportChanges();
        if (!s) { App.toast('Nothing has changed since the published map.'); return; }
        var bits = [];
        if (s.roomsNumbered) bits.push(s.roomsNumbered + ' room' + (s.roomsNumbered === 1 ? '' : 's') + ' numbered');
        if (s.nodesAdded) bits.push(s.nodesAdded + ' added');
        if (s.nodesRemoved) bits.push(s.nodesRemoved + ' deleted');
        if (s.edgesAdded) bits.push(s.edgesAdded + ' connection' + (s.edgesAdded === 1 ? '' : 's'));
        App.toast('Saved your changes' + (bits.length ? ' — ' + bits.join(', ') : '') + '. Send this file to publish it.');
      });

      var importFile = document.getElementById('importFile');
      document.getElementById('importBtn').addEventListener('click', function () { importFile.click(); });
      importFile.addEventListener('change', function () {
        var f = importFile.files[0];
        if (!f) return;
        var r = new FileReader();
        r.onload = function () {
          try {
            Store.importJSON(r.result);
            App.renderFloorStrip();
            MapView.setBuilding(Store.get());
            MapView.fit();
            App.toast('Imported');
            refreshStatus();
          } catch (err) {
            alert(err.message || 'Could not read that file.');
          }
        };
        r.readAsText(f);
        importFile.value = '';
      });

      var planFile = document.getElementById('planFile');
      document.getElementById('addFloorBtn').addEventListener('click', function () { planFile.click(); });
      planFile.addEventListener('change', function () {
        if (planFile.files[0]) addFloorFromFile(planFile.files[0]);
        planFile.value = '';
      });

      document.getElementById('autoRoomsBtn').addEventListener('click', addDetectedRooms);

      document.getElementById('copyBtn').addEventListener('click', function () {
        var json = copySelected();
        // Mirror it onto the OS clipboard when we are allowed to, so Ctrl+V
        // works too — but the in-app copy has already happened either way.
        if (json && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(json).catch(function () {});
        }
      });
      document.getElementById('pasteBtn').addEventListener('click', function () { pasteRoom(null); });

      /* The copy and paste events fire on Ctrl+C / Ctrl+V and hand over the
         real clipboard without a permission prompt, which navigator.clipboard
         cannot do. Text fields keep their normal behaviour. */
      document.addEventListener('copy', function (ev) {
        if (App.getMode() !== 'survey') return;
        if (isTextField(ev.target)) return;
        if (!selected || !Store.node(selected)) return;   // leave normal copy alone
        var json = copySelected();
        if (!json) return;
        ev.preventDefault();
        if (ev.clipboardData) ev.clipboardData.setData('text/plain', json);
      });

      document.addEventListener('paste', function (ev) {
        if (App.getMode() !== 'survey') return;
        if (isTextField(ev.target)) return;
        var text = ev.clipboardData ? ev.clipboardData.getData('text/plain') : '';
        var payload = readPayload(text);
        if (!payload && !clipboard) return;               // nothing of ours to paste
        ev.preventDefault();
        pasteRoom(payload);
      });

      editorForm.addEventListener('submit', saveEditor);
      document.getElementById('editorNext').addEventListener('click', saveAndNext);
      document.getElementById('editorClose').addEventListener('click', closeEditor);
      document.getElementById('editorDelete').addEventListener('click', deleteEditing);
      editor.addEventListener('click', function (ev) { if (ev.target === editor) closeEditor(); });

      setTool('select');
    },

    onTap: onTap,
    onDown: onDown,
    onDragEnd: onDragEnd,
    onRubber: onRubber,
    undo: doUndo,
    redo: doRedo,
    copy: copySelected,
    paste: pasteRoom,
    refreshStatus: refreshStatus,
    cancelCalibrate: function () { calibrate = null; }
  };
})();
