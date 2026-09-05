/* Connect numbered rooms to the corridor they open onto.
 *
 * A room with a number on the door is still unreachable until an edge joins it
 * to the corridor graph — the router only walks edges. Drawing those by hand is
 * two taps a room in Survey mode, several hundred taps for the building, done
 * standing in a corridor on a phone. The geometry is already in the plan, so
 * this works it out instead.
 *
 * For each unconnected numbered room it drops a perpendicular onto the nearest
 * corridor segment and joins the room there. The corridor is SPLIT at that
 * point rather than the room being hung off the nearest existing junction,
 * because directions are generated from the bearing between one path node and
 * the next: hang a room off a junction and the patient is walked to the end of
 * the corridor and back, while a split leaves them at the door. A last hop
 * under Graph's FOLD_FINAL_M also folds into a plain "on your left".
 *
 * What it CANNOT know is where the door actually is. It finds the nearest
 * corridor, not the one the room opens onto, so a room backing onto a second
 * corridor can be linked through a wall. Anything further than --max-metres is
 * left alone and listed for you to do with the Connect tool, and every link it
 * does make is worth looking at on the map before it is committed.
 *
 * Run:  node tools/link_rooms.js <floor-id> [--apply] [--max-metres N]
 *
 * Prints what it would do and changes nothing without --apply.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var DATA = path.join(ROOT, 'js', 'data.js');

/* Two projections closer together than this are the same spot on the corridor
   — most often a pair of rooms facing each other across it, which really do
   share one doorway point. Below it a split would make a corridor segment of
   no length. */
var SAME_POINT_M = 1.0;

/* A projection this close to an existing junction is that junction. Splitting
   next to one would leave a stub edge and an extra node saying nothing. */
var SNAP_M = 1.5;

/* Room boxes are shrunk by this much before asking whether a link crosses one,
   so that a link grazing the corner of a neighbour, or running down the seam
   between two rooms that touch, is not counted as passing through it. */
var CLEARANCE = 0.1;

/* Matches DEFAULT_ROOM_SIDE in js/mapview.js: what a room box measures when
   the surveyor has not dragged it to a size. */
var DEFAULT_ROOM_SIDE = 0.045;

function die(msg) {
  process.stderr.write(msg + '\n');
  process.exit(1);
}

function loadScript(file, names) {
  var ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
  return names.map(function (n) { return ctx[n]; });
}

var args = process.argv.slice(2);
var apply = args.indexOf('--apply') >= 0;
/* A door is a few metres from the corridor it opens onto. Graph's FOLD_FINAL_M
   already treats 8m as the most a final hop can be and still read as "on your
   left", so 10 is generous. Past it the line stops being a doorway and starts
   being a guess that happens to thread between two rooms — on this plan the
   count barely moves between 10m and 15m, and what it picks up are exactly
   those. Raise it if a floor really is built that way. */
var maxIdx = args.indexOf('--max-metres');
var maxMetres = maxIdx >= 0 ? parseFloat(args[maxIdx + 1]) : 10;
var floorId = args.filter(function (a, i) {
  return a.indexOf('--') !== 0 && !(maxIdx >= 0 && i === maxIdx + 1);
})[0];

if (!floorId) die('Usage: node tools/link_rooms.js <floor-id> [--apply] [--max-metres N]');
if (!(maxMetres > 0)) die('--max-metres needs a positive number.');

var loaded = loadScript(DATA, ['SEED_BUILDING', 'APP_TITLE']);
var b = loaded[0];
var title = typeof loaded[1] === 'string' ? loaded[1] : 'Way Finder';
if (!b || !Array.isArray(b.nodes)) die('js/data.js does not define a SEED_BUILDING with nodes.');

var floor = (b.floors || []).filter(function (f) { return f.id === floorId; })[0];
if (!floor) {
  die('No floor "' + floorId + '". Known: ' +
      (b.floors || []).map(function (f) { return f.id; }).join(', '));
}
var mpu = floor.metresPerUnit || 75;

var byId = {};
b.nodes.forEach(function (n) { byId[n.id] = n; });

var degree = {};
b.edges.forEach(function (e) {
  degree[e[0]] = (degree[e[0]] || 0) + 1;
  degree[e[1]] = (degree[e[1]] || 0) + 1;
});

/* The corridor is everything on this floor that is not a room: junctions, and
   the lifts and stairs the corridor runs up to. */
var segments = [];
b.edges.forEach(function (e, i) {
  var a = byId[e[0]], c = byId[e[1]];
  if (!a || !c) return;
  if (a.floor !== floorId || c.floor !== floorId) return;
  if (a.kind === 'room' || c.kind === 'room') return;
  segments.push({ edgeIndex: i, a: a, c: c, cuts: [] });
});
if (!segments.length) {
  die('No corridor on ' + floorId + ' to link to — it has no junction-to-junction\n' +
      'edges at all. Draw the spine in Survey mode first; there is nothing here\n' +
      'for geometry to work from.');
}

var orphans = b.nodes.filter(function (n) {
  return n.floor === floorId && n.kind === 'room' && n.room && !degree[n.id];
});

function project(p, a, c) {
  var dx = c.x - a.x, dy = c.y - a.y;
  var L = dx * dx + dy * dy;
  var t = L ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / L : 0;
  var tc = Math.max(0, Math.min(1, t));
  var x = a.x + tc * dx, y = a.y + tc * dy;
  return { t: tc, x: x, y: y, d: Math.hypot(p.x - x, p.y - y) * mpu, beyond: t < 0 || t > 1 };
}

/* Every room on the floor, as a rectangle, to test links against. */
var roomBoxes = b.nodes.filter(function (n) {
  return n.floor === floorId && n.kind === 'room';
}).map(function (n) {
  var w = (n.w || DEFAULT_ROOM_SIDE) * (1 - CLEARANCE);
  var h = (n.h || DEFAULT_ROOM_SIDE) * (1 - CLEARANCE);
  return { id: n.id, room: n.room, x0: n.x - w / 2, y0: n.y - h / 2, x1: n.x + w / 2, y1: n.y + h / 2 };
});

/* Liang-Barsky: does the line from p to q pass through rectangle r? */
function crosses(p, q, r) {
  var t0 = 0, t1 = 1, dx = q.x - p.x, dy = q.y - p.y;
  var P = [-dx, dx, -dy, dy];
  var Q = [p.x - r.x0, r.x1 - p.x, p.y - r.y0, r.y1 - p.y];
  for (var i = 0; i < 4; i++) {
    if (P[i] === 0) { if (Q[i] < 0) return false; continue; }
    var t = Q[i] / P[i];
    if (P[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; }
    else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return t1 > t0 + 1e-9;
}

/* Which other rooms a link would cut through on its way to the corridor.
   Geometry cannot see a wall, but it can see that the straight line from this
   door to that corridor goes in one side of the room next door and out the
   other — and whatever the plan really looks like, that is not a walk anybody
   can take. A link like that is worse than none: it puts a confident wrong
   route in front of a patient. */
function blockers(room, point) {
  return roomBoxes.filter(function (r) {
    return r.id !== room.id && crosses(room, point, r);
  });
}

var plans = [], skipped = [];
orphans.forEach(function (room) {
  /* Nearest corridor first, but take the nearest one the room can actually
     reach: a room at the end of a row may front the far corridor cleanly while
     the near one is behind two of its neighbours. */
  var tried = segments.map(function (seg) {
    return { seg: seg, r: project(room, seg.a, seg.c) };
  }).sort(function (x, y) { return x.r.d - y.r.d; });

  var nearest = tried[0], chosen = null, through = null;
  for (var i = 0; i < tried.length; i++) {
    if (tried[i].r.d > maxMetres) break;
    var hit = blockers(room, tried[i].r);
    if (!hit.length) { chosen = tried[i]; break; }
    if (!through) through = hit;
  }
  if (!chosen) {
    skipped.push({
      room: room,
      m: nearest ? nearest.r.d : Infinity,
      through: through || []
    });
    return;
  }
  plans.push({ room: room, seg: chosen.seg, r: chosen.r });
});

/* Snap to an existing junction where the projection lands on one, so the
   corridor is only cut where a cut means something. */
var links = [];           // { room, nodeId }  — joined to a node already there
plans = plans.filter(function (p) {
  var ends = [p.seg.a, p.seg.c];
  for (var i = 0; i < ends.length; i++) {
    if (Math.hypot(p.r.x - ends[i].x, p.r.y - ends[i].y) * mpu <= SNAP_M) {
      links.push({ room: p.room, nodeId: ends[i].id, m: p.r.d, snapped: ends[i].id });
      return false;
    }
  }
  return true;
});

/* Rooms facing each other across the corridor share one doorway point. */
plans.forEach(function (p) {
  var shared = null;
  p.seg.cuts.forEach(function (cut) {
    if (Math.hypot(p.r.x - cut.x, p.r.y - cut.y) * mpu <= SAME_POINT_M) shared = cut;
  });
  if (shared) { shared.rooms.push(p.room); shared.dists.push(p.r.d); return; }
  p.seg.cuts.push({ t: p.r.t, x: p.r.x, y: p.r.y, rooms: [p.room], dists: [p.r.d] });
});

/* Name each new point after the lowest room number that uses it, so a door
   node in the data can be traced back to the doors it serves. */
var used = {};
b.nodes.forEach(function (n) { used[n.id] = true; });
var prefix = floorId.replace(/^opd-/, '').replace(/^ipd-/, '');
function doorId(rooms) {
  var base = prefix + '-door-' + rooms.map(function (r) { return r.room; }).sort()[0];
  var id = base, n = 2;
  while (used[id]) id = base + '-' + (n++);
  used[id] = true;
  return id;
}

var newNodes = [], newEdges = [], dropEdges = {};
segments.forEach(function (seg) {
  if (!seg.cuts.length) return;
  seg.cuts.sort(function (x, y) { return x.t - y.t; });
  dropEdges[seg.edgeIndex] = true;
  var chain = [seg.a.id];
  seg.cuts.forEach(function (cut) {
    cut.id = doorId(cut.rooms);
    newNodes.push({
      id: cut.id,
      floor: floorId,
      x: cut.x,
      y: cut.y,
      kind: 'junction',
      name: '',
      seed: true,
      aliases: []
    });
    chain.push(cut.id);
    cut.rooms.forEach(function (room) { newEdges.push([cut.id, room.id]); });
  });
  chain.push(seg.c.id);
  for (var i = 0; i < chain.length - 1; i++) newEdges.push([chain[i], chain[i + 1]]);
});
links.forEach(function (l) { newEdges.push([l.nodeId, l.room.id]); });

/* ---- report ---------------------------------------------------------- */

var linkedCount = links.length + plans.length;
var out = [];
out.push((apply ? 'Linking' : 'Would link') + ' ' + linkedCount + ' of ' + orphans.length +
         ' unconnected numbered rooms on ' + floorId);
out.push('');

var rows = [];
segments.forEach(function (seg) {
  seg.cuts.forEach(function (cut) {
    cut.rooms.forEach(function (room, i) {
      rows.push([room.room, cut.dists[i].toFixed(1) + 'm',
                 'new ' + cut.id + (cut.rooms.length > 1 ? ' (shared)' : ''),
                 'on ' + seg.a.id + '–' + seg.c.id]);
    });
  });
});
links.forEach(function (l) {
  rows.push([l.room.room, l.m.toFixed(1) + 'm', 'existing ' + l.nodeId, '']);
});
rows.sort(function (x, y) { return x[0].localeCompare(y[0]); });
rows.forEach(function (r) {
  out.push('  ' + r[0].padEnd(6) + r[1].padStart(7) + '   ' + r[2].padEnd(26) + r[3]);
});

if (skipped.length) {
  var blocked = skipped.filter(function (s) { return s.through.length; });
  var faraway = skipped.filter(function (s) { return !s.through.length; });

  if (blocked.length) {
    out.push('');
    out.push('  Left alone — every corridor within ' + maxMetres + 'm is behind another room,');
    out.push('  so the only link geometry can offer would be a walk through a wall.');
    out.push('  Usually this means the corridor these doors open onto has not been');
    out.push('  drawn yet: put it in with the Connect tool and run this again.');
    blocked.sort(function (x, y) { return x.m - y.m; }).forEach(function (s) {
      out.push('    ' + s.room.room.padEnd(6) + s.m.toFixed(1) + 'm'.padEnd(3) +
               '  behind ' + s.through.map(function (r) { return r.room || r.id; }).join(', '));
    });
  }
  if (faraway.length) {
    out.push('');
    out.push('  Left alone — further than ' + maxMetres + 'm from any corridor. Connect these');
    out.push('  by hand in Survey mode, or raise --max-metres if the corridor really is');
    out.push('  that far off:');
    faraway.sort(function (x, y) { return x.m - y.m; }).forEach(function (s) {
      out.push('    ' + s.room.room.padEnd(6) + (isFinite(s.m) ? s.m.toFixed(1) + 'm' : 'no corridor'));
    });
  }
}

out.push('');
out.push('  ' + newNodes.length + ' new doorway point(s), ' +
         Object.keys(dropEdges).length + ' corridor segment(s) split, ' +
         newEdges.length + ' edge(s) added');
process.stdout.write(out.join('\n') + '\n');

if (!apply) {
  process.stdout.write('\nNothing written. Pass --apply to change js/data.js.\n');
  process.exit(0);
}

/* ---- write ----------------------------------------------------------- */

b.nodes = b.nodes.concat(newNodes);
b.edges = b.edges.filter(function (e, i) { return !dropEdges[i]; }).concat(newEdges);

var stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
fs.writeFileSync(DATA,
  '/* Way Finder survey data, ' + stamp + '.\n' +
  '   Rooms on ' + floorId + ' connected to the corridor by tools/link_rooms.js:\n' +
  '   each link is the perpendicular to the nearest corridor, a first\n' +
  '   approximation to be corrected on the floor with the Connect tool.\n' +
  '   Survey mode can read this back in through Import. */\n' +
  'var APP_TITLE = ' + JSON.stringify(title) + ';\n\n' +
  'var SEED_BUILDING = ' + JSON.stringify(b, null, 2) + ';\n');

process.stdout.write('\njs/data.js now: ' + b.nodes.length + ' nodes, ' + b.edges.length + ' edges\n');
