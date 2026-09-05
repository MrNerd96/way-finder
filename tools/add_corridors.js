/* Run a corridor across a block of rooms, between the spines either side.
 *
 * The surveyed spine is usually the long corridor down each side of a block.
 * What tends to be missing is the cross-corridors: the short runs between one
 * row of rooms and the next, which is what most doors actually open onto.
 * Without them the rooms in the middle of a block cannot reach any corridor
 * without passing through their neighbours, and tools/link_rooms.js rightly
 * refuses to connect them.
 *
 * You give it the heights. It does the fiddly part: finding the spine either
 * side, cutting each one at that height (or reusing the junction already
 * there), and joining the two across the block.
 *
 * The heights are ground truth and have to come from someone who can see the
 * building or the plan — a corridor invented in the wrong place is worse than
 * a missing one, because the router will confidently send a patient down it.
 * --suggest reads the gaps between rows of rooms and prints them as a starting
 * point, but it is a starting point: it cannot tell a corridor from any other
 * band the rooms happen to leave clear, and it merges bands wherever a single
 * room juts into one. Check them against the plan.
 *
 * The honest test comes afterwards. Run tools/link_rooms.js and the rooms along
 * a corridor that is really there stop being 9-14m from anything and come out
 * at a uniform 2-3m, with no link crossing another room. Geometry the corridor
 * is wrong about does not tidy itself up like that.
 *
 * Run:  node tools/add_corridors.js <floor-id> <y> [<y> ...] [--apply]
 *       node tools/add_corridors.js <floor-id> --suggest
 */
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var DATA = path.join(ROOT, 'js', 'data.js');

var DEFAULT_ROOM_SIDE = 0.045;   // matches js/mapview.js

/* A band the rooms leave this clear is between rows rather than in one. */
var MAX_COVERAGE = 0.3;
var MIN_WIDTH_M = 1.4;
var MAX_WIDTH_M = 6.0;
var STEP = 0.002;

/* A junction already this close to the height asked for is the one to use —
   the surveyor stood at the corridor mouth when they placed it. */
var SNAP = 0.02;

/* A spine is a column of corridor nodes sharing an x, not a lone stair. */
var SPINE_TOLERANCE = 0.03;
var SPINE_MIN_NODES = 3;

function die(msg) { process.stderr.write(msg + '\n'); process.exit(1); }

function loadScript(file, names) {
  var ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
  return names.map(function (n) { return ctx[n]; });
}

var args = process.argv.slice(2);
var apply = args.indexOf('--apply') >= 0;
var suggest = args.indexOf('--suggest') >= 0;
var rest = args.filter(function (a) { return a.indexOf('--') !== 0; });
var floorId = rest.shift();
var heights = rest.map(parseFloat);

if (!floorId) {
  die('Usage: node tools/add_corridors.js <floor-id> <y> [<y> ...] [--apply]\n' +
      '       node tools/add_corridors.js <floor-id> --suggest');
}
if (!suggest && !heights.length) die('Give at least one height, or --suggest to see candidates.');
if (heights.some(function (y) { return !(y > 0 && y < 3); })) {
  die('Heights are plan units (0 at the top of the plan), not metres or pixels.');
}

var loaded = loadScript(DATA, ['SEED_BUILDING', 'APP_TITLE']);
var b = loaded[0];
var title = typeof loaded[1] === 'string' ? loaded[1] : 'Way Finder';
if (!b || !Array.isArray(b.nodes)) die('js/data.js does not define a SEED_BUILDING with nodes.');

var floor = (b.floors || []).filter(function (f) { return f.id === floorId; })[0];
if (!floor) die('No floor "' + floorId + '".');
var mpu = floor.metresPerUnit || 75;

var byId = {};
b.nodes.forEach(function (n) { byId[n.id] = n; });

var rooms = b.nodes.filter(function (n) { return n.floor === floorId && n.kind === 'room'; });
if (!rooms.length) die('No rooms on ' + floorId + '.');
var boxes = rooms.map(function (n) {
  var w = n.w || DEFAULT_ROOM_SIDE, h = n.h || DEFAULT_ROOM_SIDE;
  return { x0: n.x - w / 2, x1: n.x + w / 2, y0: n.y - h / 2, y1: n.y + h / 2 };
});
var blockX0 = Math.min.apply(null, boxes.map(function (r) { return r.x0; }));
var blockX1 = Math.max.apply(null, boxes.map(function (r) { return r.x1; }));
var blockY0 = Math.min.apply(null, boxes.map(function (r) { return r.y0; }));
var blockY1 = Math.max.apply(null, boxes.map(function (r) { return r.y1; }));
var blockW = blockX1 - blockX0;

/* Spines: x values where several corridor nodes line up. The lone stair off
   the corner of a block shares no column with anything and is not one. */
var spineNodes = b.nodes.filter(function (n) { return n.floor === floorId && n.kind !== 'room'; });
if (!spineNodes.length) die('No corridor graph on ' + floorId + ' to attach anything to.');
var columns = {};
spineNodes.forEach(function (n) {
  var key = Object.keys(columns).filter(function (k) {
    return Math.abs(parseFloat(k) - n.x) <= SPINE_TOLERANCE;
  })[0];
  if (key) columns[key].push(n); else columns[n.x.toFixed(3)] = [n];
});
/* The column's own x, not whichever node happened to open it: a stair set a
   little off the corridor would otherwise drag the whole spine sideways. */
var spines = Object.keys(columns)
  .filter(function (k) { return columns[k].length >= SPINE_MIN_NODES; })
  .map(function (k) {
    var xs = columns[k].map(function (n) { return n.x; }).sort(function (p, q) { return p - q; });
    return xs[Math.floor(xs.length / 2)];
  })
  .sort(function (p, q) { return p - q; });
if (spines.length < 2) {
  die('Found ' + spines.length + ' spine(s) on ' + floorId + ' (need two, either side of\n' +
      'the block). Draw the long corridors first — there is nothing to run across.');
}
var westX = spines[0], eastX = spines[spines.length - 1];

if (suggest) {
  function coverage(y) {
    var spans = boxes.filter(function (r) { return r.y0 <= y && y <= r.y1; })
                     .map(function (r) { return [r.x0, r.x1]; })
                     .sort(function (p, q) { return p[0] - q[0]; });
    var total = 0, cur = null;
    spans.forEach(function (s) {
      if (!cur || s[0] > cur[1]) { if (cur) total += cur[1] - cur[0]; cur = [s[0], s[1]]; }
      else cur[1] = Math.max(cur[1], s[1]);
    });
    if (cur) total += cur[1] - cur[0];
    return total / blockW;
  }
  var bands = [], open = null;
  for (var y = blockY0; y <= blockY1; y += STEP) {
    if (coverage(y) <= MAX_COVERAGE) { if (!open) open = { y0: y, y1: y }; else open.y1 = y; }
    else if (open) { bands.push(open); open = null; }
  }
  if (open) bands.push(open);

  process.stdout.write(
    'Bands the rooms leave clear on ' + floorId + ', between the spines at x ' +
    westX.toFixed(2) + ' and ' + eastX.toFixed(2) + ':\n\n');
  var any = false;
  bands.forEach(function (band) {
    var m = (band.y1 - band.y0) * mpu;
    if (m < MIN_WIDTH_M || m > MAX_WIDTH_M) return;
    any = true;
    process.stdout.write('  ' + ((band.y0 + band.y1) / 2).toFixed(3) +
                         '   ' + m.toFixed(1) + 'm across\n');
  });
  if (!any) process.stdout.write('  (none between ' + MIN_WIDTH_M + 'm and ' + MAX_WIDTH_M + 'm)\n');
  process.stdout.write(
    '\nThese are candidates, not corridors. A wide one is usually two bands with\n' +
    'a single room between them, and a missing one is usually a room jutting in.\n' +
    'Check them against the plan, then pass the ones that are real:\n' +
    '  node tools/add_corridors.js ' + floorId + ' <y> <y> ... --apply\n');
  process.exit(0);
}

var used = {};
b.nodes.forEach(function (n) { used[n.id] = true; });
var prefix = floorId.replace(/^opd-/, '').replace(/^ipd-/, '');
function freshId(base) {
  var id = base, n = 2;
  while (used[id]) id = base + '-' + (n++);
  used[id] = true;
  return id;
}

/* Put a node on a spine at this height: reuse the junction already there,
   otherwise cut the segment that spans it. */
function attach(x, y, id) {
  var near = spineNodes.filter(function (n) {
    return Math.abs(n.x - x) <= SPINE_TOLERANCE && Math.abs(n.y - y) <= SNAP;
  }).sort(function (p, q) { return Math.abs(p.y - y) - Math.abs(q.y - y); })[0];
  if (near) return { id: near.id, reused: true };

  for (var i = 0; i < b.edges.length; i++) {
    var a = byId[b.edges[i][0]], c = byId[b.edges[i][1]];
    if (!a || !c || a.floor !== floorId || c.floor !== floorId) continue;
    if (a.kind === 'room' || c.kind === 'room') continue;
    if (Math.abs(a.x - x) > SPINE_TOLERANCE || Math.abs(c.x - x) > SPINE_TOLERANCE) continue;
    if (y < Math.min(a.y, c.y) || y > Math.max(a.y, c.y)) continue;
    var node = { id: freshId(id), floor: floorId, x: x, y: y, kind: 'junction', name: '', seed: true, aliases: [] };
    b.nodes.push(node);
    byId[node.id] = node;
    spineNodes.push(node);
    b.edges.splice(i, 1);
    b.edges.push([a.id, node.id], [node.id, c.id]);
    return { id: node.id, reused: false };
  }
  return null;
}

var out = [];
out.push((apply ? 'Running' : 'Would run') + ' ' + heights.length + ' corridor(s) across ' + floorId);
out.push('  spines at x ' + westX.toFixed(2) + ' and ' + eastX.toFixed(2) +
         ', block spans x ' + blockX0.toFixed(2) + '-' + blockX1.toFixed(2));
out.push('');

var added = 0, failed = 0;
heights.sort(function (p, q) { return p - q; }).forEach(function (y, k) {
  var w = attach(westX, y, prefix + '-x' + k + '-w');
  var e = attach(eastX, y, prefix + '-x' + k + '-e');
  if (!w || !e) {
    failed++;
    out.push('  y=' + y.toFixed(3) + '   no ' + (!w ? 'west' : 'east') +
             ' spine reaches this height — skipped');
    return;
  }
  b.edges.push([w.id, e.id]);
  added++;
  out.push('  y=' + y.toFixed(3) + '   ' + w.id + (w.reused ? ' (existing)' : ' (new)') +
           '  —  ' + e.id + (e.reused ? ' (existing)' : ' (new)') +
           '   ' + ((eastX - westX) * mpu).toFixed(0) + 'm long');
});

out.push('');
out.push('  ' + added + ' corridor(s) added' + (failed ? ', ' + failed + ' skipped' : ''));
out.push('');
out.push('  Now run:  node tools/link_rooms.js ' + floorId);
out.push('  Rooms along a corridor that is really there come out at a uniform');
out.push('  2-3m, with no link crossing another room.');
process.stdout.write(out.join('\n') + '\n');

if (!apply) {
  process.stdout.write('\nNothing written. Pass --apply to change js/data.js.\n');
  process.exit(0);
}

var stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
fs.writeFileSync(DATA,
  '/* Way Finder survey data, ' + stamp + '.\n' +
  '   Cross-corridors added to ' + floorId + ' by tools/add_corridors.js, one run\n' +
  '   between each pair of room rows. First approximations, to be corrected on\n' +
  '   the floor with the Connect tool.\n' +
  '   Survey mode can read this back in through Import. */\n' +
  'var APP_TITLE = ' + JSON.stringify(title) + ';\n\n' +
  'var SEED_BUILDING = ' + JSON.stringify(b, null, 2) + ';\n');

process.stdout.write('\njs/data.js now: ' + b.nodes.length + ' nodes, ' + b.edges.length + ' edges\n');
