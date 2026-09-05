/* The 2D map: floor plan image, the corridor graph drawn over it, the route,
   and pan/zoom. Marker and stroke sizes are recomputed from the current zoom on
   every draw so they stay a constant size under the thumb. */
var MapView = (function () {
  var NS = 'http://www.w3.org/2000/svg';

  var svg, layers, planImg, wrap;
  var building = null;
  var floorId = null;
  var vb = { x: 0, y: 0, w: 1, h: 1 };
  var mode = 'go';
  var selection = null;
  var linkAnchor = null;
  var routePath = null, routeActiveSeg = 0;
  var pins = null;                 // { start: nodeId, end: nodeId }
  var onTap = function () {};

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

  function hasBox(n) { return n.kind === 'room'; }

  /* Label sizing. The white halo behind a label is a stroke centred on the
     glyph, so half of it eats into the letter itself: much past 0.16em and a
     bold digit fills in and the number reads as a blob. MIN_LABEL_PX is the
     smallest size a room number still reads at on a phone, and CHAR_EM is
     roughly the advance width of a bold digit, used to fit text to a box. */
  var HALO = 0.16;
  var MIN_LABEL_PX = 11;
  var CHAR_EM = 0.62;

  /* Two elements, not one with paint-order: stroke. The single-element trick
     is tidier and works in most browsers, but where paint-order is ignored the
     white halo paints straight over the dark glyph and the label comes out as
     a solid white blob -- which is exactly what a room number looked like on
     the phone this was written for. Painting the halo first as its own
     stroke-only text, then the ink on top, is the same picture with nothing
     left to support. */
  function drawLabel(text, x, y, size, centred) {
    var common = { x: x, y: y, 'text-anchor': 'middle', 'font-size': size };
    if (centred) common['dominant-baseline'] = 'central';

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
  function syncAspect() {
    var w = svg.clientWidth, h = svg.clientHeight;
    if (!w || !h) return;
    var cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2;
    vb.h = vb.w * h / w;
    vb.x = cx - vb.w / 2;
    vb.y = cy - vb.h / 2;
    applyViewBox();
  }

  function fit() {
    var f = floor();
    var aspect = (f && f.aspect) || 1;
    var boxW = svg.clientWidth || 360, boxH = svg.clientHeight || 360;
    var pad = 0.04;
    // Choose a viewBox that shows the whole plan whatever the screen shape is.
    var planRatio = 1 / aspect;                 // width / height
    var screenRatio = boxW / boxH;
    if (screenRatio > planRatio) {
      vb.h = aspect * (1 + pad * 2);
      vb.w = vb.h * screenRatio;
    } else {
      vb.w = 1 + pad * 2;
      vb.h = vb.w / screenRatio;
    }
    vb.x = 0.5 - vb.w / 2;
    vb.y = aspect / 2 - vb.h / 2;
    applyViewBox();
    draw();
  }

  /* Frame a rectangle of the plan rather than the whole floor. Used while a
     route is showing, so the corridor being described fills the screen. */
  function fitBounds(minX, minY, maxX, maxY, padFrac, minSpan) {
    var boxW = svg.clientWidth || 360, boxH = svg.clientHeight || 360;
    var w = Math.max(maxX - minX, minSpan || 0.18);
    var h = Math.max(maxY - minY, minSpan || 0.18);
    var pad = padFrac === undefined ? 0.35 : padFrac;
    w *= (1 + pad); h *= (1 + pad);
    var screenRatio = boxW / boxH;
    if (w / h < screenRatio) w = h * screenRatio; else h = w / screenRatio;
    vb.w = w; vb.h = h;
    vb.x = (minX + maxX) / 2 - w / 2;
    vb.y = (minY + maxY) / 2 - h / 2;
    applyViewBox();
    draw();
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

  function zoomAt(cx, cy, factor) {
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
    return {
      x: vb.x + (clientX - r.left) / r.width * vb.w,
      y: vb.y + (clientY - r.top) / r.height * vb.h
    };
  }

  /* ---------- drawing ---------- */

  function draw() {
    if (!building) return;
    var f = floor();
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

    var r = px(9), sw = px(2.4), selW = px(4);
    nodes.forEach(function (n) {
      var picked = (n.id === selection || n.id === linkAnchor);
      if (hasBox(n)) {
        var b = boxOf(n);
        layers.nodes.appendChild(el('rect', {
          class: 'roomBox' + (picked ? ' sel' : ''),
          x: b.x, y: b.y, width: b.w, height: b.h,
          rx: px(3), 'stroke-width': picked ? selW : sw
        }));
        return;
      }
      layers.nodes.appendChild(el('circle', {
        class: 'node ' + n.kind + (picked ? ' sel' : ''),
        cx: n.x, cy: n.y, r: r,
        'stroke-width': picked ? selW : sw
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
      var text = n.room || (n.kind === 'lift' ? 'LIFT' : n.kind === 'stair' ? 'STAIR' : '');
      if (!text && surveying && hasBox(n)) text = n.name || '?';
      if (!text) return;
      if (text.length > 14) text = text.slice(0, 13) + '…';
      if (hasBox(n)) {
        // Sit the label inside the box, shrinking it to suit -- but never
        // below MIN_LABEL_PX, because a shrunken number is a smudge and the
        // number is the whole point of the label.
        var b = boxOf(n);
        // Measured against the full width of the box, not an inset: a number
        // that reaches its own edges still cannot reach into the room next
        // door, and the inset would have cost a band of zoom where the number
        // was perfectly readable.
        var fit = Math.min(b.h * 0.6, b.w / (text.length * CHAR_EM));
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
        drawLabel(text, n.x, n.y, Math.max(minPx, Math.min(fs, fit)), true);
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
    drawPins(index, r);
  }

  function drawRubber() {
    if (!drag || drag.kind !== 'rubber' || !drag.cur) return;
    var rc = rectBetween(drag.start, drag.cur);
    layers.nodes.appendChild(el('rect', {
      class: 'rubber', x: rc.x, y: rc.y, width: rc.w, height: rc.h,
      'stroke-width': px(2), 'stroke-dasharray': px(6) + ' ' + px(4)
    }));
  }

  function drawRoute(index) {
    if (!routePath || routePath.length < 2) return;
    var w = px(7);
    for (var i = 1; i < routePath.length; i++) {
      var a = routePath[i - 1], b = routePath[i];
      if (a.floor !== floorId || b.floor !== floorId) continue;
      var active = (i === routeActiveSeg);
      layers.route.appendChild(el('line', {
        class: 'routeLine' + (active ? ' active' : ''),
        x1: a.x, y1: a.y, x2: b.x, y2: b.y, 'stroke-width': active ? w * 1.35 : w
      }));
    }
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
        gesture = { pinch: true, d0: pointerDistance() };
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
        var d = pointerDistance();
        if (d > 0 && gesture.d0 > 0) {
          var mid = pointerMid();
          var u = toUser(mid.x, mid.y);
          zoomAt(u.x, u.y, gesture.d0 / d);   // fingers apart -> factor < 1 -> zoom in
          gesture.d0 = d;
        }
        return;
      }

      if (ids.length === 1 && drag) {
        drag.cur = toUser(ev.clientX, ev.clientY);
        applyDrag();
        draw();
        return;
      }

      if (ids.length === 1) {
        vb.x -= dx * unit();
        vb.y -= dy * unit();
        applyViewBox();
      }
    });

    function finish(ev) {
      var p = pointers[ev.pointerId];
      delete pointers[ev.pointerId];
      if (Object.keys(pointers).length < 2) gesture = null;
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

    window.addEventListener('resize', function () { syncAspect(); draw(); });
    if (window.ResizeObserver) {
      new ResizeObserver(function () { syncAspect(); draw(); }).observe(wrap);
    }
  }

  function pointerDistance() {
    var ids = Object.keys(pointers);
    if (ids.length < 2) return 0;
    var a = pointers[ids[0]], b = pointers[ids[1]];
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
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
    },

    setBuilding: function (b) { building = b; },
    setMode: function (m) { mode = m; draw(); },
    getFloor: function () { return floorId; },

    setFloor: function (id, keepView) {
      if (floorId === id) return;
      floorId = id;
      if (keepView) { draw(); } else { fit(); }
      if (onFloorChange) onFloorChange(id);
    },

    setSelection: function (id) { selection = id; draw(); },
    setLinkAnchor: function (id) { linkAnchor = id; draw(); },

    setRoute: function (path, activeSeg, pinIds) {
      routePath = path;
      routeActiveSeg = activeSeg || 0;
      pins = pinIds || null;
      draw();
    },

    setActiveSeg: function (i) { routeActiveSeg = i; draw(); },

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
    fitRoute: fitRoute,
    draw: draw
  };
})();
