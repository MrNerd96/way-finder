/* The 2D map: floor plan image, the corridor graph drawn over it, the route,
   and pan/zoom. Marker and stroke sizes are recomputed from the current zoom on
   every draw so they stay a constant size under the thumb. */
var MapView = (function () {
  var NS = 'http://www.w3.org/2000/svg';

  var svg, layers, planImg, wrap, root;
  var building = null;
  var floorId = null;
  var vb = { x: 0, y: 0, w: 1, h: 1 };
  var mode = 'go';
  var selection = null;
  var linkAnchor = null;
  var routePath = null, routeActive = { from: 0, to: 0, turnAt: null };
  var pins = null;                 // { start: nodeId, end: nodeId }
  var onTap = function () {};

  /* Which way up the plan is drawn, in whole quarter turns.

     The boards were photographed as they hang on the wall, so north is up on
     every one of them -- which is no use to somebody holding the phone while
     facing down a corridor that runs the other way. Turning the plan so the
     way ahead is up the screen is the difference between reading a map and
     following one. The plan, the corridors, the rooms and the route all turn
     together; the labels turn back on themselves so the numbers stay the
     right way up, which is the whole point of reading them. */
  var rot = 0;

  function planCentre() {
    var f = floor();
    return { x: 0.5, y: ((f && f.aspect) || 1) / 2 };
  }

  /* Where a point on the plan lands once the plan has been turned. Passing a
     negative angle takes a turned point back to the plan. */
  function spin(x, y, deg) {
    if (!deg) return { x: x, y: y };
    var c = planCentre();
    var r = deg * Math.PI / 180, cos = Math.cos(r), sin = Math.sin(r);
    var dx = x - c.x, dy = y - c.y;
    return { x: c.x + dx * cos - dy * sin, y: c.y + dx * sin + dy * cos };
  }

  /* The box a set of plan corners occupies once turned. Only quarter turns are
     ever used, so turning the corners of a box gives the box exactly. */
  function spunBox(minX, minY, maxX, maxY) {
    var pts = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]]
      .map(function (p) { return spin(p[0], p[1], rot); });
    var xs = pts.map(function (p) { return p.x; }), ys = pts.map(function (p) { return p.y; });
    return { minX: Math.min.apply(null, xs), maxX: Math.max.apply(null, xs),
             minY: Math.min.apply(null, ys), maxY: Math.max.apply(null, ys) };
  }

  function applyRotation() {
    var c = planCentre();
    if (rot) root.setAttribute('transform', 'rotate(' + rot + ' ' + c.x + ' ' + c.y + ')');
    else root.removeAttribute('transform');
  }

  function el(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    return e;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* Rooms are drawn as a box over their footprint on the plan rather than as a
     dot. It reads like the floor plan underneath, it is a far bigger tap
     target, and drawing the box is how you say how big the room is. */
  var DEFAULT_ROOM_SIDE = 0.045;
  var MIN_ROOM_SIDE = 0.012;

  /* Lifts, staircases and ramps get a box for the same reasons rooms do, and
     one of their own: a shaft is a room-sized thing drawn on the plan, and the
     lobby around it is where the corridor points crowd together. A dot there is
     one more dot; a box sits on the shaft itself and can be dragged onto it.
     A ramp is the clearest case of all -- it is drawn as long runs and
     landings, and a dot in the middle of one says nothing about which way it
     goes. */
  var BOXED = { room: true, lift: true, stair: true, ramp: true };

  function hasBox(n) { return BOXED[n.kind] === true; }

  /* Label sizing. The white halo behind a label is a stroke centred on the
     glyph, so half of it eats into the letter itself: much past 0.16em and a
     bold digit fills in and the number reads as a blob. MIN_LABEL_PX is the
     smallest size a room number still reads at on a phone, and CHAR_EM is
     roughly the advance width of a bold digit, used to fit text to a box. */
  var HALO = 0.16;
  var MIN_LABEL_PX = 11;
  var CHAR_EM = 0.62;

  /* How narrow a number may be squeezed to fit its box, as a fraction of its
     natural width. A room box on these plans is taller than it is wide, so the
     width is what runs out first and the height is going spare. A number set a
     fifth narrower is still plainly that number; the same number shrunk a
     fifth is simply smaller, and it is the height that decides whether it
     reads at arm's length. So spend the width before touching the size: fit by
     condensing, and only give up when even the condensed number would fall
     below MIN_LABEL_PX.

     GUTTER keeps a sliver of box either side. Before numbers were condensed
     they were measured against the full width of the box and it did not
     matter: the estimate below runs wide, so they never actually reached the
     edges. Squeezing them to an exact width does reach the edges, and a row of
     consulting rooms then reads "106105104103" with no gap anywhere. */
  var CONDENSE = 0.72;
  var GUTTER = 0.88;

  /* A corridor point is drawn in map units, floored and capped in screen
     pixels, rather than at one screen size whatever the zoom.

     Pinned to the screen it was nine pixels at every zoom. Up close that is
     right; pulled back to the whole floor there are four hundred of them and
     nine pixels each is a sheet of white over the plan the patient is trying
     to read. In map units they shrink to specks as you pull back and grow as
     you come in, which is what a dot drawn on a plan does. The floor stops
     them disappearing; the cap stops them becoming blobs. Tapping is
     unaffected -- that has its own tolerance in screen pixels, and has always
     been far larger than the dot. */
  var DOT_UNITS = 0.006, DOT_MIN_PX = 2.5, DOT_MAX_PX = 10;

  function dotRadius() {
    return Math.min(Math.max(DOT_UNITS, px(DOT_MIN_PX)), px(DOT_MAX_PX));
  }

  /* Two elements, not one with paint-order: stroke. The single-element trick
     is tidier and works in most browsers, but where paint-order is ignored the
     white halo paints straight over the dark glyph and the label comes out as
     a solid white blob -- which is exactly what a room number looked like on
     the phone this was written for. Painting the halo first as its own
     stroke-only text, then the ink on top, is the same picture with nothing
     left to support. */
  function drawLabel(text, x, y, size, centred, squeezeTo) {
    var common = { x: x, y: y, 'text-anchor': 'middle', 'font-size': size };
    if (centred) common['dominant-baseline'] = 'central';
    // Turned back by however far the plan was turned, about the label's own
    // anchor, so it stays where it belongs and stays the right way up.
    if (rot) common.transform = 'rotate(' + (-rot) + ' ' + x + ' ' + y + ')';
    /* spacingAndGlyphs narrows the letters themselves, not just the gaps
       between them -- with three digits and no spaces there is nothing in the
       gaps to take. Both copies get the same value, so the halo stays behind
       the ink rather than sliding out from under it. */
    if (squeezeTo) {
      common.textLength = squeezeTo;
      common.lengthAdjust = 'spacingAndGlyphs';
    }

    /* Painted through inline style, not just the class. A stylesheet rule beats
       a presentation attribute, so a stale cached app.css -- which is exactly
       what a service worker will hand you on a slow connection -- could put its
       old fill and stroke back on both elements and reinstate the blob. Inline
       style outranks it, so the two files can be out of step and the label is
       still right. */
    var halo = el('text', common);
    halo.setAttribute('class', 'nodeLabel halo');
    halo.style.fill = 'none';
    halo.style.stroke = '#fff';
    halo.style.strokeWidth = (size * HALO) + '';
    halo.style.strokeLinejoin = 'round';
    halo.textContent = text;
    layers.labels.appendChild(halo);

    var ink = el('text', common);
    ink.setAttribute('class', 'nodeLabel ink');
    ink.style.fill = '#14201c';
    ink.style.stroke = 'none';
    ink.textContent = text;
    layers.labels.appendChild(ink);
  }

  function boxOf(n) {
    var w = n.w || DEFAULT_ROOM_SIDE, h = n.h || DEFAULT_ROOM_SIDE;
    return { x: n.x - w / 2, y: n.y - h / 2, w: w, h: h };
  }

  function inBox(pt, n, padPx) {
    var b = boxOf(n);
    var p = padPx ? px(padPx) : 0;
    return pt.x >= b.x - p && pt.x <= b.x + b.w + p &&
           pt.y >= b.y - p && pt.y <= b.y + b.h + p;
  }

  /* All four corner grips, shown while the Move tool is active. Dragging one
     pins the opposite corner, which is what makes nudging a single edge into
     line with the wall underneath actually possible. */
  function cornersOf(n) {
    var b = boxOf(n);
    return {
      nw: { x: b.x,        y: b.y },
      ne: { x: b.x + b.w,  y: b.y },
      se: { x: b.x + b.w,  y: b.y + b.h },
      sw: { x: b.x,        y: b.y + b.h }
    };
  }

  var OPPOSITE = { nw: 'se', ne: 'sw', se: 'nw', sw: 'ne' };

  function rectBetween(a, c) {
    return {
      x: Math.min(a.x, c.x), y: Math.min(a.y, c.y),
      w: Math.abs(c.x - a.x), h: Math.abs(c.y - a.y)
    };
  }

  /* User units per on-screen pixel at the current zoom. */
  function unit() {
    var w = svg.clientWidth || wrap.clientWidth || 360;
    return vb.w / w;
  }
  function px(n) { return n * unit(); }

  function floor() {
    if (!building) return null;
    for (var i = 0; i < building.floors.length; i++) {
      if (building.floors[i].id === floorId) return building.floors[i];
    }
    return null;
  }

  function applyViewBox() {
    svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h);
  }

  /* The map pane changes height whenever the bottom sheet does. Keep the
     viewBox the same shape as the pane so the plan never gets letterboxed,
     holding the current centre and zoom. */
  /* The pane has changed shape. Re-frame whatever the view was meant to show;
     failing that -- they have panned or zoomed it themselves -- keep their
     view and only correct the letterboxing. */
  function reframe() {
    if (framing) applyFraming();
    else { syncAspect(); draw(); }
  }

  function syncAspect() {
    var w = svg.clientWidth, h = svg.clientHeight;
    if (!w || !h) return;
    var cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2;
    vb.h = vb.w * h / w;
    vb.x = cx - vb.w / 2;
    vb.y = cy - vb.h / 2;
    applyViewBox();
  }

  /* What the view is meant to be showing, so a change in the pane's shape can
     re-frame it rather than keep whatever zoom was worked out for the old one.

     On a phone this is the difference between a usable map and a postage
     stamp. Opening the search raises the keyboard, the keyboard takes most of
     the screen, and the map pane is left a couple of centimetres tall. Picking
     a place from a different floor fits that floor to the pane -- as it stood
     then: short and very wide, which needs a viewBox three times the width of
     the plan. The keyboard then goes away, the pane grows back, and nothing
     recomputes the width, so the plan sits tiny in the middle of a big empty
     pane. Remembering the intent fixes it: the pane grows, the floor is fitted
     to it again, and the map fills the screen.

     Panning or pinching clears it. Once they have chosen a view of their own,
     a resize should hold it, not throw it away. */
  var framing = null;

  function fit() {
    framing = { kind: 'floor' };
    applyFraming();
  }

  /* Frame a rectangle of the plan rather than the whole floor. Used while a
     route is showing, so the corridor being described fills the screen. */
  function fitBounds(minX, minY, maxX, maxY, padFrac, minSpan) {
    framing = { kind: 'bounds', minX: minX, minY: minY, maxX: maxX, maxY: maxY,
                pad: padFrac, minSpan: minSpan };
    applyFraming();
  }

  function applyFraming() {
    if (!framing) return;
    if (framing.kind === 'floor') frameFloor(); else frameBounds(framing);
    applyViewBox();
    draw();
  }

  function frameFloor() {
    var f = floor();
    var aspect = (f && f.aspect) || 1;
    var s = spunBox(0, 0, 1, aspect);
    frameBounds({ minX: s.minX, minY: s.minY, maxX: s.maxX, maxY: s.maxY,
                  pad: 0.08, minSpan: 0, spun: true });
  }

  function frameBounds(box) {
    var boxW = svg.clientWidth || 360, boxH = svg.clientHeight || 360;
    // Framing is done in the space the viewBox lives in, which is the turned
    // one; a stored rectangle is in plan coordinates and has to be turned.
    var s = box.spun ? box
      : spunBox(box.minX, box.minY, box.maxX, box.maxY);
    var w = Math.max(s.maxX - s.minX, box.minSpan === undefined ? 0.18 : box.minSpan);
    var h = Math.max(s.maxY - s.minY, box.minSpan === undefined ? 0.18 : box.minSpan);
    var pad = box.pad === undefined ? 0.35 : box.pad;
    w *= (1 + pad); h *= (1 + pad);
    var screenRatio = boxW / boxH;
    if (w / h < screenRatio) w = h * screenRatio; else h = w / screenRatio;
    vb.w = w; vb.h = h;
    vb.x = (s.minX + s.maxX) / 2 - w / 2;
    vb.y = (s.minY + s.maxY) / 2 - h / 2;
  }

  /* The part of the current route that lies on the floor being shown. */
  function fitRoute() {
    if (!routePath || routePath.length < 2) return false;
    var on = routePath.filter(function (n) { return n.floor === floorId; });
    if (on.length < 1) return false;
    var xs = on.map(function (n) { return n.x; });
    var ys = on.map(function (n) { return n.y; });
    fitBounds(Math.min.apply(null, xs), Math.min.apply(null, ys),
              Math.max.apply(null, xs), Math.max.apply(null, ys));
    return true;
  }

  /* Turn the plan so a walk from a to b runs up the screen. The patient is
     then standing at the bottom of the map looking into it, which is the one
     orientation nobody has to think about: what is ahead of them is ahead on
     the screen. Only quarter turns, so this is the nearest of four rather than
     an exact alignment -- which is the point, since a plan at 37 degrees is
     harder to read than one that is square. */
  function orientTo(a, b) {
    if (!a || !b) return false;
    var dx = b.x - a.x, dy = b.y - a.y;
    if (!dx && !dy) return false;
    var best = rot, up = Infinity;
    [0, 90, 180, 270].forEach(function (deg) {
      var r = deg * Math.PI / 180;
      var y = dx * Math.sin(r) + dy * Math.cos(r);   // screen y, down is positive
      if (y < up) { up = y; best = deg; }
    });
    if (best === rot) return false;
    setRotation(best);
    return true;
  }

  /* Turn the plan about a point on the screen, so whatever is under the
     fingers stays under them. Turning about the middle of the plan instead
     would drag the corridor they are looking at out from under the twist. */
  function rotateAbout(clientX, clientY, deg) {
    var r = svg.getBoundingClientRect();
    var m = { x: vb.x + (clientX - r.left) / r.width * vb.w,
              y: vb.y + (clientY - r.top) / r.height * vb.h };
    var onPlan = spin(m.x, m.y, -rot);
    rot = ((deg % 360) + 360) % 360;
    applyRotation();
    var q = spin(onPlan.x, onPlan.y, rot);
    vb.x += q.x - m.x;
    vb.y += q.y - m.y;
    framing = null;                 // they are holding the view themselves now
    applyViewBox();
    draw();
  }

  /* Let go near square and it goes square. Nothing moves if they are holding
     it at a deliberate angle. */
  function snapRotation() {
    var square = Math.round(rot / 90) * 90;
    if (Math.abs(angleDelta(rot, square)) <= TWIST_SNAP) setRotation(square);
  }

  function setRotation(deg) {
    var before = rot;
    if (deg === before) return;
    // Hold whatever they were looking at in the middle of the pane. The centre
    // is in turned space, so it goes back to the plan and forward again.
    var c = { x: vb.x + vb.w / 2, y: vb.y + vb.h / 2 };
    var onPlan = spin(c.x, c.y, -before);
    rot = ((deg % 360) + 360) % 360;
    applyRotation();
    if (framing) { applyFraming(); return; }
    var nc = spin(onPlan.x, onPlan.y, rot);
    vb.x = nc.x - vb.w / 2;
    vb.y = nc.y - vb.h / 2;
    applyViewBox();
    draw();
  }

  function zoomAt(cx, cy, factor) {
    framing = null;
    var nw = Math.min(3, Math.max(0.05, vb.w * factor));
    factor = nw / vb.w;
    vb.x = cx - (cx - vb.x) * factor;
    vb.y = cy - (cy - vb.y) * factor;
    vb.w *= factor;
    vb.h *= factor;
    applyViewBox();
    draw();
  }

  function toUser(clientX, clientY) {
    var r = svg.getBoundingClientRect();
    // The viewBox is in turned space; everything downstream wants the plan.
    return spin(vb.x + (clientX - r.left) / r.width * vb.w,
                vb.y + (clientY - r.top) / r.height * vb.h, -rot);
  }

  /* ---------- drawing ---------- */

  function draw() {
    if (!building) return;
    var f = floor();
    // The turn is about the middle of the plan, and the plans are not all the
    // same shape, so it is reapplied whenever what is drawn might have changed.
    applyRotation();
    clear(layers.edges); clear(layers.nodes); clear(layers.labels); clear(layers.route);

    if (f && (f.planData || f.plan)) {
      planImg.setAttribute('href', f.planData || f.plan);
      planImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', f.planData || f.plan);
      planImg.setAttribute('width', 1);
      planImg.setAttribute('height', f.aspect || 1);
      planImg.removeAttribute('hidden');
      planImg.style.display = '';
    } else {
      planImg.style.display = 'none';
    }

    var nodes = building.nodes.filter(function (n) { return n.floor === floorId; });
    var index = {};
    nodes.forEach(function (n) { index[n.id] = n; });

    var edgeW = px(2.5), hitW = px(20);
    building.edges.forEach(function (e) {
      var a = index[e[0]], b = index[e[1]];
      if (!a || !b) return;
      layers.edges.appendChild(el('line', {
        class: 'edge', x1: a.x, y1: a.y, x2: b.x, y2: b.y, 'stroke-width': edgeW
      }));
      if (mode === 'survey') {
        layers.edges.appendChild(el('line', {
          class: 'edge hit', x1: a.x, y1: a.y, x2: b.x, y2: b.y, 'stroke-width': hitW
        }));
      }
    });

    drawRoute(index);

    var r = dotRadius(), sw = px(2.4), selW = px(4);
    // The outline has to shrink with the dot, or a small dot is all outline.
    var dotSw = Math.min(sw, r * 0.3), dotSelW = Math.min(selW, r * 0.5);
    nodes.forEach(function (n) {
      var picked = (n.id === selection || n.id === linkAnchor);
      if (hasBox(n)) {
        var b = boxOf(n);
        layers.nodes.appendChild(el('rect', {
          class: 'roomBox ' + n.kind + (picked ? ' sel' : ''),
          x: b.x, y: b.y, width: b.w, height: b.h,
          rx: px(3), 'stroke-width': picked ? selW : sw
        }));
        return;
      }
      layers.nodes.appendChild(el('circle', {
        class: 'node ' + n.kind + (picked ? ' sel' : ''),
        cx: n.x, cy: n.y, r: r,
        'stroke-width': picked ? dotSelW : dotSw
      }));
    });

    /* Whether a number can be read depends on how many screen pixels its box
       covers -- that is zoom AND screen width, not zoom alone. This used to be
       one viewBox threshold tuned on a 360px phone, so on any wider screen
       every number stayed hidden through the whole range where it would have
       read perfectly well: on a 736px pane nothing appeared until you were
       about twice as far in as you needed to be. Ask each box whether its own
       label fits instead, and a number shows the moment it is legible, at
       whatever zoom that happens to be on whatever screen. */
    var fs = px(14);
    var minPx = px(MIN_LABEL_PX);
    var surveying = mode === 'survey';
    nodes.forEach(function (n) {
      var text = n.room || { lift: 'LIFT', stair: 'STAIR', ramp: 'RAMP' }[n.kind] || '';
      if (!text && surveying && hasBox(n)) text = n.name || '?';
      if (!text) return;
      if (text.length > 14) text = text.slice(0, 13) + '…';
      if (hasBox(n)) {
        // Sit the label inside the box, shrinking it to suit -- but never
        // below MIN_LABEL_PX, because a shrunken number is a smudge and the
        // number is the whole point of the label.
        var b = boxOf(n);
        var room = b.w * GUTTER;
        var fit = Math.min(b.h * 0.6, room / (text.length * CHAR_EM * CONDENSE));
        if (fit < minPx) {
          /* The box cannot hold the whole thing at a legible size. For a
             patient, say nothing: a number that spilled over the rooms either
             side would collide with its neighbours now that labels are drawn
             this far out, and a clipped one -- "2…" -- reads worse than the
             bare box. Keeping every number inside its own box is what makes
             the fit test enough on its own to guarantee no two ever touch.
             A surveyor is reading the plan rather than walking it, so there
             the old clip-and-spill still beats a blank room. */
          if (!surveying) return;
          var maxChars = Math.max(2, Math.floor(b.w * 1.25 / (minPx * CHAR_EM)));
          if (text.length > maxChars) text = text.slice(0, maxChars - 1) + '…';
          fit = Math.min(b.h * 0.6, b.w * 0.88 / (text.length * CHAR_EM));
        }
        var size = Math.max(minPx, Math.min(fs, fit));
        // Squeeze only what would actually overrun the box, and only as far as
        // CONDENSE. Past that a number stops looking like itself, so a surveyor
        // -- the one case that still draws below the fit -- gets the old spill.
        var wide = size * text.length * CHAR_EM;
        drawLabel(text, n.x, n.y, size, true,
                  (wide > room && room / wide >= CONDENSE) ? room : 0);
        return;
      }
      // LIFT and STAIR hang off a circle with no box to bound them, so there
      // is nothing to fit them against. They keep a zoom gate of their own
      // rather than crowding a view of the whole floor.
      if (surveying || vb.w <= 0.75) drawLabel(text, n.x, n.y - r - px(4), fs, false);
    });

    if (showHandles) {
      var hs = px(7);
      nodes.forEach(function (n) {
        if (!hasBox(n)) return;
        // Below this the four grips would cover the box they belong to, and you
        // could not aim at one anyway. Zoom in and they appear.
        var b2 = boxOf(n);
        if (Math.min(b2.w, b2.h) / unit() < 46) return;
        var corners = cornersOf(n);
        Object.keys(corners).forEach(function (key) {
          var c = corners[key];
          layers.nodes.appendChild(el('rect', {
            class: 'handle', x: c.x - hs, y: c.y - hs, width: hs * 2, height: hs * 2,
            'stroke-width': px(2)
          }));
        });
      });
    }

    drawRubber();
    /* The two route pins keep a constant screen size. There are two of them,
       they say where this walk starts and ends, and they are the one thing on
       the map that should not get quieter as you pull back to see the whole
       route. */
    drawPins(index, px(9));
    drawTurnMark(index);
  }

  function drawRubber() {
    if (!drag || drag.kind !== 'rubber' || !drag.cur) return;
    var rc = rectBetween(drag.start, drag.cur);
    layers.nodes.appendChild(el('rect', {
      class: 'rubber', x: rc.x, y: rc.y, width: rc.w, height: rc.h,
      'stroke-width': px(2), 'stroke-dasharray': px(6) + ' ' + px(4)
    }));
  }

  /* A card covers a stretch of the path, not one hop of it. "Go straight for
     25 m" can cross half a dozen corridor points, and lighting up only the
     last of them told the patient to walk three metres when the sentence said
     twenty-five. The card carries where its stretch began; everything from
     there to where it ends is the leg being described. */
  function drawRoute(index) {
    if (!routePath || routePath.length < 2) return;
    var w = px(7);
    for (var i = 1; i < routePath.length; i++) {
      var a = routePath[i - 1], b = routePath[i];
      if (a.floor !== floorId || b.floor !== floorId) continue;
      var active = (i > routeActive.from && i <= routeActive.to);
      layers.route.appendChild(el('line', {
        class: 'routeLine' + (active ? ' active' : ''),
        x1: a.x, y1: a.y, x2: b.x, y2: b.y, 'stroke-width': active ? w * 1.35 : w
      }));
    }
  }

  function span(active) {
    if (active && typeof active === 'object') {
      // A turn happens at a point, so nothing is lit along its length.
      if (active.turnAt !== undefined && active.turnAt !== null) {
        return { from: -1, to: -1, turnAt: active.turnAt };
      }
      var to = active.to || 0;
      var from = (active.from === undefined || active.from === null) ? to - 1 : active.from;
      return { from: Math.min(from, to), to: to, turnAt: null };
    }
    var i = active || 0;
    return { from: i - 1, to: i, turnAt: null };
  }

  /* The corner a turn card is about. Lighting the corridor either side of it
     says how far to walk, which is the next card's job and not this one's;
     what the patient needs here is which of the dots going past is the one to
     turn at. So the point itself is marked, at a fixed size on the screen,
     and the corridor is left alone. */
  function drawTurnMark(index) {
    if (!routePath || routeActive.turnAt === null || routeActive.turnAt === undefined) return;
    var n = routePath[routeActive.turnAt];
    if (!n || n.floor !== floorId) return;
    var r = px(11);
    // Halo first, then the ring on top of it, the same way the labels are done.
    layers.nodes.appendChild(el('circle', {
      class: 'turnMark halo', cx: n.x, cy: n.y, r: r, 'stroke-width': px(7)
    }));
    layers.nodes.appendChild(el('circle', {
      class: 'turnMark ring', cx: n.x, cy: n.y, r: r, 'stroke-width': px(3.5)
    }));
    layers.nodes.appendChild(el('circle', {
      class: 'turnMark core', cx: n.x, cy: n.y, r: px(4.5)
    }));
  }

  function drawPins(index, r) {
    if (!pins) return;
    ['start', 'end'].forEach(function (which) {
      var n = index[pins[which]];
      if (!n) return;
      layers.nodes.appendChild(el('circle', {
        class: 'pin' + (which === 'start' ? ' start' : ''),
        cx: n.x, cy: n.y, r: r * 1.5, 'stroke-width': px(3)
      }));
    });
  }

  /* ---------- hit testing ---------- */

  /* Priority is strict, because every tolerance here is in screen pixels and a
     screen pixel covers a lot of floor plan when you are zoomed out:

       1. inside a room box  — rooms sit shoulder to shoulder and are what you
                               are nearly always aiming at, so containment wins
                               outright over anything merely nearby
       2. nearest loose point — lifts, stairs, corridor points
       3. just outside a box  — a small forgiveness margin, last resort  */
  function hitNode(pt, radiusPx) {
    var lim = px(radiusPx || 24);
    var strict = null, strictArea = Infinity;
    var near = null, nearD = Infinity;
    var padded = null, paddedArea = Infinity;

    building.nodes.forEach(function (n) {
      if (n.floor !== floorId) return;
      if (hasBox(n)) {
        var b = boxOf(n), area = b.w * b.h;
        // Nested boxes: the smallest one enclosing the tap is the one meant.
        if (inBox(pt, n)) {
          if (area < strictArea) { strict = n; strictArea = area; }
        } else if (inBox(pt, n, 6)) {
          if (area < paddedArea) { padded = n; paddedArea = area; }
        }
        return;
      }
      var dx = n.x - pt.x, dy = n.y - pt.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < lim && d < nearD) { near = n; nearD = d; }
    });

    return strict || near || padded;
  }

  /* Grips sit on the box corners and can fall just outside it, so this scans
     every room on the floor rather than only whatever the tap landed inside. */
  function hitAnyHandle(pt) {
    var lim = px(16), best = null, bestD = Infinity;
    building.nodes.forEach(function (n) {
      if (n.floor !== floorId || !hasBox(n)) return;
      var corners = cornersOf(n);
      Object.keys(corners).forEach(function (key) {
        var c = corners[key];
        var d = Math.sqrt(Math.pow(c.x - pt.x, 2) + Math.pow(c.y - pt.y, 2));
        if (d < lim && d < bestD) {
          bestD = d;
          best = { node: n, corner: key, anchor: corners[OPPOSITE[key]] };
        }
      });
    });
    return best;
  }

  function hitEdge(pt) {
    var lim = px(16), best = null, bestD = Infinity;
    var index = {};
    building.nodes.forEach(function (n) { if (n.floor === floorId) index[n.id] = n; });
    building.edges.forEach(function (e) {
      var a = index[e[0]], b = index[e[1]];
      if (!a || !b) return;
      var d = pointToSegment(pt, a, b);
      if (d < lim && d < bestD) { best = e; bestD = d; }
    });
    return best;
  }

  function pointToSegment(p, a, b) {
    var vx = b.x - a.x, vy = b.y - a.y;
    var len2 = vx * vx + vy * vy;
    var t = len2 ? ((p.x - a.x) * vx + (p.y - a.y) * vy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    var dx = p.x - (a.x + t * vx), dy = p.y - (a.y + t * vy);
    return Math.sqrt(dx * dx + dy * dy);
  }

  /* ---------- gestures ---------- */

  var pointers = {}, gesture = null;

  function bindGestures() {
    svg.addEventListener('pointerdown', function (ev) {
      // Capture keeps a drag alive if the finger leaves the SVG, but it is not
      // essential and some browsers refuse it — never let that kill the gesture.
      try { svg.setPointerCapture(ev.pointerId); } catch (err) { /* carry on */ }
      pointers[ev.pointerId] = { x: ev.clientX, y: ev.clientY, t: Date.now(), moved: 0 };
      var ids = Object.keys(pointers);
      if (ids.length === 2) {
        drag = null;
        gesture = { pinch: true, d0: pointerDistance(),
                    a0: pointerAngle(), rot0: rot, twisting: false };
        return;
      }
      // Let the survey tools claim this press: move a point, resize a room box,
      // or rubber-band a new one. Anything they decline becomes a pan.
      if (ids.length === 1 && onDown) {
        drag = onDown(toUser(ev.clientX, ev.clientY));
        if (drag) drag.start = toUser(ev.clientX, ev.clientY);
      }
    });

    svg.addEventListener('pointermove', function (ev) {
      var p = pointers[ev.pointerId];
      if (!p) return;
      var dx = ev.clientX - p.x, dy = ev.clientY - p.y;
      p.moved += Math.abs(dx) + Math.abs(dy);
      p.x = ev.clientX; p.y = ev.clientY;

      var ids = Object.keys(pointers);
      if (ids.length >= 2 && gesture && gesture.pinch) {
        var mid = pointerMid();
        var d = pointerDistance();
        if (d > 0 && gesture.d0 > 0) {
          var u = toUser(mid.x, mid.y);
          zoomAt(u.x, u.y, gesture.d0 / d);   // fingers apart -> factor < 1 -> zoom in
          gesture.d0 = d;
        }
        /* Two fingers pinch and twist at once, and a pinch is never quite
           clean -- the hand rolls a little every time. So the twist has to
           earn its start: nothing turns until the fingers have gone round
           TWIST_START degrees, and from then on it tracks the total turn
           since the fingers went down rather than accumulating each move,
           which would drift. */
        var turned = angleDelta(pointerAngle(), gesture.a0);
        if (!gesture.twisting && Math.abs(turned) >= TWIST_START) gesture.twisting = true;
        if (gesture.twisting) rotateAbout(mid.x, mid.y, gesture.rot0 + turned);
        return;
      }

      if (ids.length === 1 && drag) {
        drag.cur = toUser(ev.clientX, ev.clientY);
        applyDrag();
        draw();
        return;
      }

      if (ids.length === 1) {
        framing = null;
        vb.x -= dx * unit();
        vb.y -= dy * unit();
        applyViewBox();
      }
    });

    function finish(ev) {
      var p = pointers[ev.pointerId];
      delete pointers[ev.pointerId];
      if (Object.keys(pointers).length < 2) {
        if (gesture && gesture.twisting) snapRotation();
        gesture = null;
      }
      if (!p) return;

      if (drag) {
        var d = drag;
        drag = null;
        if (d.kind === 'rubber') {
          var rc = d.cur ? rectBetween(d.start, d.cur) : null;
          draw();
          // A drag draws a room the size you swept; a plain tap makes a
          // default-sized one, so both ways of working still land somewhere.
          if (rc && rc.w >= MIN_ROOM_SIDE && rc.h >= MIN_ROOM_SIDE) {
            if (onRubber) onRubber(rc);
          } else {
            onTap(d.start);
          }
          return;
        }
        if (onDragEnd) onDragEnd(d.node);
        draw();
        return;
      }

      var isTap = p.moved < 12 && (Date.now() - p.t) < 700;
      if (isTap) onTap(toUser(ev.clientX, ev.clientY));
      draw();
    }

    svg.addEventListener('pointerup', finish);
    svg.addEventListener('pointercancel', function (ev) { delete pointers[ev.pointerId]; drag = null; });

    svg.addEventListener('wheel', function (ev) {
      ev.preventDefault();
      var u = toUser(ev.clientX, ev.clientY);
      zoomAt(u.x, u.y, ev.deltaY > 0 ? 1.15 : 0.87);
    }, { passive: false });

    window.addEventListener('resize', reframe);
    if (window.ResizeObserver) new ResizeObserver(reframe).observe(wrap);
  }

  function pointerDistance() {
    var ids = Object.keys(pointers);
    if (ids.length < 2) return 0;
    var a = pointers[ids[0]], b = pointers[ids[1]];
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  /* How far the fingers have to go round before the map starts turning, and
     how near square it has to end up before it is pulled square. The snap is
     small: it stops a map being left two degrees off by accident, without
     fighting someone who means to hold it at an angle. */
  var TWIST_START = 12, TWIST_SNAP = 7;

  function pointerAngle() {
    var ids = Object.keys(pointers);
    if (ids.length < 2) return 0;
    var a = pointers[ids[0]], b = pointers[ids[1]];
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
  }

  /* Shortest way round from b to a, so passing through 180 does not spin the
     map the long way about. */
  function angleDelta(a, b) {
    var d = (a - b) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  }

  function pointerMid() {
    var ids = Object.keys(pointers);
    var a = pointers[ids[0]], b = pointers[ids[1]];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  var drag = null, showHandles = false;
  var onDragEnd = null, onDown = null, onFloorChange = null, onRubber = null;

  function applyDrag() {
    var d = drag;
    if (!d || !d.cur) return;
    if (d.kind === 'move') {
      d.node.x = d.cur.x - d.grabDX;
      d.node.y = d.cur.y - d.grabDY;
    } else if (d.kind === 'resize') {
      // Hold the opposite corner still and let the dragged one follow the finger.
      var a = d.anchor;
      var w = Math.max(MIN_ROOM_SIDE, Math.abs(d.cur.x - a.x));
      var h = Math.max(MIN_ROOM_SIDE, Math.abs(d.cur.y - a.y));
      d.node.w = w;
      d.node.h = h;
      d.node.x = (d.cur.x >= a.x) ? a.x + w / 2 : a.x - w / 2;
      d.node.y = (d.cur.y >= a.y) ? a.y + h / 2 : a.y - h / 2;
    }
  }

  return {
    init: function (opts) {
      wrap = document.getElementById('mapWrap');
      svg = document.getElementById('map');
      planImg = document.getElementById('planImg');
      root = document.getElementById('layerRoot');
      layers = {
        edges: document.getElementById('layerEdges'),
        route: document.getElementById('layerRoute'),
        nodes: document.getElementById('layerNodes'),
        labels: document.getElementById('layerLabels')
      };
      onTap = opts.onTap || onTap;
      onDown = opts.onDown || null;
      onDragEnd = opts.onDragEnd || null;
      onFloorChange = opts.onFloorChange || null;
      onRubber = opts.onRubber || null;
      bindGestures();
      document.getElementById('fitBtn').addEventListener('click', fit);
      document.getElementById('rotBtn').addEventListener('click', function () {
        // From an angle they twisted to, this is the next square one, not that
        // angle plus ninety -- the button is how you get the map straight.
        setRotation(Math.round(rot / 90) * 90 + 90);
      });
    },

    /* Point the map the way the walk goes, so the patient stands at the bottom
       of it and the route runs away up the screen.

       Measured over the whole of this floor's leg rather than the first hop.
       The first hop is the step out of the door, which is often a metre at
       right angles to everything that follows: orienting on it put the start
       near the top of the pane with the route trailing away below, which is
       the opposite of what was wanted. The far end of the leg is where they
       are actually heading. */
    orientToStart: function (path) {
      if (!path || path.length < 2) return false;
      var a = path[0], far = null;
      for (var i = 1; i < path.length; i++) {
        if (path[i].floor !== a.floor) break;
        far = path[i];
      }
      return orientTo(a, far);
    },

    getRotation: function () { return rot; },
    setRotation: setRotation,

    setBuilding: function (b) { building = b; },
    setMode: function (m) { mode = m; draw(); },
    getFloor: function () { return floorId; },

    setFloor: function (id, keepView) {
      if (floorId === id) return false;
      floorId = id;
      if (keepView) { draw(); } else { fit(); }
      if (onFloorChange) onFloorChange(id);
      return true;
    },

    setSelection: function (id) { selection = id; draw(); },
    setLinkAnchor: function (id) { linkAnchor = id; draw(); },

    /* active is the step being shown: a number for a card that is one hop, or
       {from, to} for one that spans several. */
    setRoute: function (path, active, pinIds) {
      routePath = path;
      routeActive = span(active);
      pins = pinIds || null;
      draw();
    },

    setActiveSeg: function (active) { routeActive = span(active); draw(); },

    setShowHandles: function (on) { showHandles = !!on; draw(); },

    hitNode: hitNode,
    hitAnyHandle: hitAnyHandle,
    hitEdge: hitEdge,

    /* Where the middle of the screen currently sits on the plan. */
    viewCentre: function () {
      return { x: vb.x + vb.w / 2, y: vb.y + vb.h / 2 };
    },

    /* Slide the view to put a point in the middle without changing the zoom. */
    centreOn: function (n) {
      vb.x = n.x - vb.w / 2;
      vb.y = n.y - vb.h / 2;
      applyViewBox();
      draw();
    },

    defaultRoomSide: function () { return DEFAULT_ROOM_SIDE; },
    fit: fit,
    /* Framing the leg is a suggestion, not an order. Once they have pinched or
       dragged the map they are reading it their own way -- often zoomed right
       in on the junction the card is describing -- and stepping to the next
       card should not snatch that back. `force` is for the two moments when
       the view they set is of somewhere else entirely: a new route, and a
       change of floor. */
    fitRoute: function (force) {
      if (!force && !framing) return false;
      return fitRoute();
    },
    draw: draw
  };
})();
