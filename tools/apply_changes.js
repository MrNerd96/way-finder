/* Apply a patch from Survey mode's "Changes" button to js/data.js.
 *
 * The surveyor's browser holds the only copy of their work. Rather than send
 * back the whole map — thousands of lines to say "I numbered twelve rooms" —
 * the Changes button writes only the difference from the published seed. This
 * puts that difference back into js/data.js so it can be committed.
 *
 * The patch records a fingerprint of the seed it was cut from. If js/data.js
 * has moved on since, applying blind would silently undo whatever landed in
 * between, so that is refused unless you pass --force and have looked.
 *
 * Run:  node tools/apply_changes.js <patch.json> [--force]
 */
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var DATA = path.join(ROOT, 'js', 'data.js');

function loadScript(file, names) {
  var ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
  return names.map(function (n) { return ctx[n]; });
}

function die(msg) {
  process.stderr.write(msg + '\n');
  process.exit(1);
}

var args = process.argv.slice(2);
var force = args.indexOf('--force') >= 0;
var patchPath = args.filter(function (a) { return a !== '--force'; })[0];
if (!patchPath) die('Usage: node tools/apply_changes.js <patch.json> [--force]');

var patch;
try {
  patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
} catch (err) {
  die('Could not read ' + patchPath + ': ' + err.message);
}
if (!patch || patch.wayfinderChanges !== 1) {
  die(patchPath + ' is not a Way Finder changes file (expected "wayfinderChanges": 1).');
}

var loaded = loadScript(DATA, ['SEED_BUILDING', 'APP_TITLE']);
var b = loaded[0];
var title = typeof loaded[1] === 'string' ? loaded[1] : 'Way Finder';
if (!b || !Array.isArray(b.nodes)) die('js/data.js does not define a SEED_BUILDING with nodes.');

/* Same fingerprint the browser used — taken from js/store.js itself so the two
   cannot drift apart. store.js only touches the DOM inside its methods, so it
   loads fine here with nothing but a context object. */
var Store = loadScript(path.join(ROOT, 'js', 'store.js'), ['Store'])[0];
var have = Store.fingerprint(b);
var want = patch.against && patch.against.fingerprint;
if (want && want !== have) {
  var note =
    'This patch was cut from a different js/data.js.\n' +
    '  patch expects: ' + want + ' (' + patch.against.nodes + ' nodes)\n' +
    '  data.js is:    ' + have + ' (' + b.nodes.length + ' nodes)\n' +
    'Applying it would drop whatever was published in between. Check what\n' +
    'changed first; re-export from the surveyor\'s phone if you can.';
  if (!force) die(note + '\nPass --force once you have looked.');
  process.stderr.write(note + '\nContinuing anyway (--force).\n\n');
}

function applyById(list, d, label) {
  var index = {};
  list.forEach(function (x, i) { index[x.id] = i; });

  (d.removed || []).forEach(function (id) {
    if (index[id] === undefined) {
      process.stderr.write('  note: ' + label + ' ' + id + ' was already gone\n');
      return;
    }
    list[index[id]] = null;
  });
  (d.changed || []).forEach(function (x) {
    if (index[x.id] === undefined) {
      process.stderr.write('  note: ' + label + ' ' + x.id + ' is new here, adding it\n');
      list.push(x);
      return;
    }
    list[index[x.id]] = x;
  });
  (d.added || []).forEach(function (x) {
    if (index[x.id] !== undefined) {
      process.stderr.write('  note: ' + label + ' ' + x.id + ' already exists, replacing it\n');
      list[index[x.id]] = x;
      return;
    }
    list.push(x);
  });
  return list.filter(function (x) { return x !== null; });
}

function edgeKey(e) { return e[0] < e[1] ? e[0] + '|' + e[1] : e[1] + '|' + e[0]; }

b.floors = applyById(b.floors || [], patch.floors || {}, 'floor');
b.nodes = applyById(b.nodes || [], patch.nodes || {}, 'node');

var edges = {};
(b.edges || []).forEach(function (e) { edges[edgeKey(e)] = e; });
((patch.edges && patch.edges.removed) || []).forEach(function (e) { delete edges[edgeKey(e)]; });
((patch.edges && patch.edges.added) || []).forEach(function (e) { edges[edgeKey(e)] = e; });
b.edges = Object.keys(edges).map(function (k) { return edges[k]; });

/* Drop edges pointing at nodes that no longer exist, the way the app's
   normalise() does when it loads. */
var ids = {};
b.nodes.forEach(function (n) { ids[n.id] = true; });
var before = b.edges.length;
b.edges = b.edges.filter(function (e) { return ids[e[0]] && ids[e[1]]; });
if (b.edges.length !== before) {
  process.stderr.write('  note: dropped ' + (before - b.edges.length) + ' edge(s) pointing at deleted nodes\n');
}

var stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
fs.writeFileSync(DATA,
  '/* Way Finder survey data, ' + stamp + '.\n' +
  '   Changes from ' + path.basename(patchPath) + ' applied by tools/apply_changes.js.\n' +
  '   Survey mode can read this back in through Import. */\n' +
  'var APP_TITLE = ' + JSON.stringify(title) + ';\n\n' +
  'var SEED_BUILDING = ' + JSON.stringify(b, null, 2) + ';\n');

var rooms = b.nodes.filter(function (n) { return n.kind === 'room'; });
process.stdout.write(
  'Applied ' + path.basename(patchPath) + ' to js/data.js\n' +
  '  ' + (patch.summary && patch.summary.roomsNumbered || 0) + ' rooms numbered in this patch\n' +
  '  js/data.js now: ' + b.nodes.length + ' nodes, ' + b.edges.length + ' edges, ' +
  rooms.length + ' rooms (' + rooms.filter(function (n) { return n.room; }).length + ' numbered)\n');
