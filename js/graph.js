/* Routing and instruction generation.
 *
 * Routes are never authored by hand. The surveyor draws corridors as a graph of
 * points and connections; this file finds the shortest path through it and then
 * turns that path into the plain sentences a patient reads — comparing the
 * compass bearing of one corridor segment against the next to decide whether
 * that junction is a left, a right, or just more of the same corridor. */
var Graph = (function () {

  /* Cost of moving between floors, expressed in metres-of-walking so it can be
     compared against corridor lengths. Stairs are deliberately expensive: many
     people here are unwell, elderly, or carrying a child, so the router should
     send them to the lift unless the stairs are dramatically shorter. */
  var LIFT_BASE = 12, LIFT_PER_LEVEL = 5;
  var STAIR_BASE = 10, STAIR_PER_LEVEL = 45;

  var STEP_LENGTH_M = 0.72;   // an average adult pace
  var WALK_SPEED_MS = 1.1;    // unhurried indoor walking
  var FOLD_FINAL_M = 8;       // a last hop shorter than this becomes "on your left"

  function floorOf(building, id) {
    for (var i = 0; i < building.floors.length; i++) {
      if (building.floors[i].id === id) return building.floors[i];
    }
    return null;
  }

  function byId(building) {
    var m = {};
    building.nodes.forEach(function (n) { m[n.id] = n; });
    return m;
  }

  /* Straight-line distance between two points on the SAME floor, in metres. */
  function metres(building, a, b) {
    var f = floorOf(building, a.floor);
    var scale = (f && f.metresPerUnit) || 75;
    var dx = b.x - a.x, dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy) * scale;
  }

  /* 0 = up the plan, 90 = right, 180 = down, 270 = left. */
  function bearing(a, b) {
    var deg = Math.atan2(b.x - a.x, -(b.y - a.y)) * 180 / Math.PI;
    return (deg + 360) % 360;
  }

  /* Signed change of heading, -180..180. Negative is a left turn. */
  function turnAngle(from, to) {
    return ((to - from + 540) % 360) - 180;
  }

  function classifyTurn(t) {
    var a = Math.abs(t), rightward = t > 0;
    if (a <= 20) return { key: 'straight', icon: '⬆' };
    if (a <= 55) return { key: rightward ? 'slightRight' : 'slightLeft', icon: rightward ? '↗' : '↖' };
    if (a <= 125) return { key: rightward ? 'right' : 'left', icon: rightward ? '➡' : '⬅' };
    if (a <= 160) return { key: rightward ? 'sharpRight' : 'sharpLeft', icon: rightward ? '➡' : '⬅' };
    return { key: 'around', icon: '↩' };
  }

  /* Adjacency including the implicit vertical links: any two lift or stair
     nodes that share a shaft id are connected. */
  function adjacency(building) {
    var nodes = byId(building);
    var adj = {};
    building.nodes.forEach(function (n) { adj[n.id] = []; });

    building.edges.forEach(function (e) {
      var a = nodes[e[0]], b = nodes[e[1]];
      if (!a || !b || a.floor !== b.floor) return;
      var d = metres(building, a, b);
      adj[a.id].push({ to: b.id, cost: d, vertical: false });
      adj[b.id].push({ to: a.id, cost: d, vertical: false });
    });

    var shafts = {};
    building.nodes.forEach(function (n) {
      if (!n.shaft) return;
      (shafts[n.shaft] = shafts[n.shaft] || []).push(n);
    });

    Object.keys(shafts).forEach(function (key) {
      var group = shafts[key];
      for (var i = 0; i < group.length; i++) {
        for (var j = i + 1; j < group.length; j++) {
          var a = group[i], b = group[j];
          if (a.floor === b.floor) continue;
          var fa = floorOf(building, a.floor), fb = floorOf(building, b.floor);
          if (!fa || !fb) continue;
          var levels = Math.abs((fa.level || 0) - (fb.level || 0)) || 1;
          var lift = a.kind === 'lift' && b.kind === 'lift';
          var cost = lift
            ? LIFT_BASE + LIFT_PER_LEVEL * levels
            : STAIR_BASE + STAIR_PER_LEVEL * levels;
          adj[a.id].push({ to: b.id, cost: cost, vertical: true });
          adj[b.id].push({ to: a.id, cost: cost, vertical: true });
        }
      }
    });

    return adj;
  }

  /* Plain Dijkstra with a linear scan for the next node. The graph is a few
     hundred points at most, so a real priority queue buys nothing. */
  function route(building, fromId, toId) {
    var nodes = byId(building);
    if (!nodes[fromId] || !nodes[toId]) return null;
    if (fromId === toId) return [nodes[fromId]];

    var adj = adjacency(building);
    var dist = {}, prev = {}, done = {};
    building.nodes.forEach(function (n) { dist[n.id] = Infinity; });
    dist[fromId] = 0;

    while (true) {
      var best = null, bestD = Infinity;
      for (var id in dist) {
        if (!done[id] && dist[id] < bestD) { best = id; bestD = dist[id]; }
      }
      if (best === null) break;
      if (best === toId) break;
      done[best] = true;
      (adj[best] || []).forEach(function (link) {
        var nd = bestD + link.cost;
        if (nd < dist[link.to]) { dist[link.to] = nd; prev[link.to] = best; }
      });
    }

    if (dist[toId] === Infinity) return null;
    var path = [], cur = toId;
    while (cur !== undefined) { path.unshift(nodes[cur]); cur = prev[cur]; }
    return path;
  }

  /* Names and landmarks can each carry a Telugu and a Hindi version, entered in
     the survey editor. Without this the app would hand a Telugu-speaking
     patient Telugu verbs wrapped around an English landmark, which is worse
     than useless to the person this whole thing is for. */
  function loc(n, key) {
    var lang = I18N.get();
    if (lang !== 'en' && n[key + '_' + lang]) return n[key + '_' + lang];
    return n[key] || '';
  }

  /* "137 — EEG": the room number the signage uses, and the one thing out of
     several behind that door that the patient asked for. */
  function labelWith(n, label) {
    if (!n) return label || '';
    if (!label) return placeName(n);
    return n.room ? n.room + ' — ' + label : label;
  }

  function placeName(n) {
    if (!n) return '';
    var name = loc(n, 'name');
    if (n.room && name) return n.room + ' — ' + name;
    return name || n.room || 'this point';
  }

  /* What the patient can actually see when they get there. Corridor points are
     bookkeeping — they have no landmark and their names ("Main corridor") mean
     nothing to a stranger, so they deliberately return nothing and the sentence
     that would have quoted them is dropped instead. */
  function landmarkOf(n) {
    if (!n) return '';
    var mark = loc(n, 'landmark');
    if (mark) return mark;
    if (n.kind === 'junction') return '';
    return loc(n, 'name') || n.room || '';
  }

  function floorName(building, floorId) {
    var f = floorOf(building, floorId);
    if (!f) return '';
    return f.label || ((f.level === 0 ? I18N.t('ground') : I18N.t('floor') + ' ' + f.level));
  }

  /* Round to something a person would actually say: exact-ish when it is close,
     to the nearest five once the number gets big enough that precision is fake. */
  function roundNice(v) {
    if (v < 20) return Math.max(1, Math.round(v));
    return Math.round(v / 5) * 5;
  }

  function distanceText(m) {
    return I18N.t('about') + ' ' + roundNice(m) + ' ' + I18N.t('metres') +
           ' (' + roundNice(m / STEP_LENGTH_M) + ' ' + I18N.t('steps') + ')';
  }

  /* Turn a path into the cards the patient swipes through. */
  /* destLabel, when given, is the thing the patient searched for — the one
     service out of several behind the final door. Every card that names the
     destination says that, not whichever service happens to be listed first. */
  function directions(building, path, destLabel) {
    var steps = [];
    if (!path || path.length < 2) return steps;

    var last = path[path.length - 1];
    var n = path.length;

    /* Should the final hop be folded into the arrival card rather than becoming
       its own "turn left" then "you have arrived, one metre later"? */
    var foldFinal = false, arrivalSide = null;
    if (n >= 3 && path[n - 1].floor === path[n - 2].floor && path[n - 2].floor === path[n - 3].floor) {
      var finalLen = metres(building, path[n - 2], path[n - 1]);
      if (finalLen < FOLD_FINAL_M) {
        foldFinal = true;
        var ft = turnAngle(bearing(path[n - 3], path[n - 2]), bearing(path[n - 2], path[n - 1]));
        arrivalSide = ft > 20 ? 'onRight' : (ft < -20 ? 'onLeft' : 'aheadOfYou');
      }
    }

    /* Which way to face is only worth saying when there is something visible to
       face towards, and only when the first move is along a corridor rather
       than straight into a lift. */
    var facing = '';
    if (path[1].floor === path[0].floor) {
      var mark = landmarkOf(path[1]);
      if (mark) facing = I18N.fill('faceToward', mark);
    }

    steps.push({
      kind: 'start',
      icon: '📍',
      title: I18N.t('startAt'),
      detail: placeName(path[0]) + (path[0].landmark ? ' — ' + path[0].landmark : ''),
      meta: facing,
      floor: path[0].floor,
      seg: 0
    });

    var run = 0;        // metres walked since the last card
    var runFrom = 0;    // path index the current straight stretch began at

    for (var i = 1; i < n; i++) {
      var prev = path[i - 1], cur = path[i];

      if (prev.floor !== cur.floor) {
        if (run > 0.5) {
          steps.push(straightCard(run, prev, runFrom, i - 1));
          run = 0;
        }
        var fa = floorOf(building, prev.floor), fb = floorOf(building, cur.floor);
        var up = (fb.level || 0) > (fa.level || 0);
        var byLift = prev.kind === 'lift' && cur.kind === 'lift';
        steps.push({
          kind: 'vertical',
          icon: byLift ? '🛗' : '🪜',
          title: I18N.t(byLift ? (up ? 'liftUp' : 'liftDown') : (up ? 'stairsUp' : 'stairsDown')),
          detail: floorName(building, cur.floor),
          meta: '',
          floor: cur.floor,
          seg: i
        });
        runFrom = i;
        continue;
      }

      if (foldFinal && i === n - 1) break;   // the last hop belongs to the arrival card

      run += metres(building, prev, cur);

      var next = path[i + 1];
      if (!next) break;
      if (next.floor !== cur.floor) continue;      // keep walking to the lift door
      if (foldFinal && i === n - 2) continue;      // don't announce the doorway turn twice

      var t = turnAngle(bearing(prev, cur), bearing(cur, next));
      var cls = classifyTurn(t);
      if (cls.key === 'straight') continue;

      steps.push(straightCard(run, cur, runFrom, i));
      run = 0;
      runFrom = i;
      steps.push({
        kind: 'turn',
        icon: cls.icon,
        title: I18N.t(cls.key),
        detail: landmarkOf(cur) ? I18N.fill('atThe', landmarkOf(cur)) : '',
        meta: '',
        floor: cur.floor,
        seg: i
      });
    }

    if (run > 0.5) steps.push(straightCard(run, last, runFrom, n - 1));

    steps.push({
      kind: 'arrive',
      icon: '🏁',
      title: I18N.t('arrived'),
      detail: destLabel ? labelWith(last, destLabel) : placeName(last),
      meta: arrivalSide ? I18N.t(arrivalSide) : '',
      floor: last.floor,
      seg: n - 1
    });

    return steps;

    function straightCard(m, towards, from, to) {
      return {
        kind: 'straight',
        icon: '⬆',
        title: I18N.t('straight'),
        detail: landmarkOf(towards) ? I18N.fill('untilYouReach', landmarkOf(towards)) : '',
        meta: distanceText(m),
        metres: m,
        floor: towards.floor,
        seg: to,
        segFrom: from
      };
    }
  }

  function totals(building, path) {
    var m = 0, levels = 0;
    for (var i = 1; i < path.length; i++) {
      if (path[i].floor === path[i - 1].floor) m += metres(building, path[i - 1], path[i]);
      else levels++;
    }
    return {
      metres: Math.round(m),
      paces: Math.round(m / STEP_LENGTH_M),
      minutes: Math.max(1, Math.round((m / WALK_SPEED_MS + levels * 45) / 60)),
      floorChanges: levels
    };
  }

  /* --- search ------------------------------------------------------------ */

  function haystack(n) {
    return [n.room || '', n.name || '', n.name_te || '', n.name_hi || '']
      .concat(n.aliases || []).concat(n.services || []).join(' ').toLowerCase();
  }

  function isDestination(n) {
    if (n.kind === 'junction') return false;
    return !!(n.room || n.name);
  }

  function isStartPoint(n) {
    if (n.canStart) return true;
    return ['lift', 'stair', 'entrance', 'landmark'].indexOf(n.kind) >= 0;
  }

  /* Results are hits, not nodes: { node, service }. One room can be several
     things a patient is sent for, and the one they typed is the one they must
     see. Search "EEG" and the answer is "137 — EEG", not "137 — Neurology"
     with EEG buried underneath; search the room number and there is one row
     showing everything behind that door, so nobody arrives expecting a
     different department. */
  function search(building, q, filterFn) {
    var pool = building.nodes.filter(filterFn);
    var query = (q || '').trim().toLowerCase();
    if (!query) {
      return pool.sort(function (a, b) {
        return (a.room || a.name || '').localeCompare(b.room || b.name || '');
      }).slice(0, 200).map(function (n) { return { node: n, service: null }; });
    }
    var scored = [];
    pool.forEach(function (n) {
      // A service the patient actually asked for wins over the room's own
      // name, and each matching one earns its own row.
      var hitService = false;
      (n.services || []).forEach(function (svc) {
        var at = svc.toLowerCase().indexOf(query);
        if (at < 0) return;
        hitService = true;
        scored.push({ node: n, service: svc, s: at - (at === 0 ? 120 : 0) });
      });
      if (hitService) return;

      var hay = haystack(n);
      var idx = hay.indexOf(query);
      if (idx < 0) return;
      var score = idx;
      if ((n.room || '').toLowerCase().indexOf(query) === 0) score -= 100;
      if ((n.name || '').toLowerCase().indexOf(query) === 0) score -= 50;
      scored.push({ node: n, service: null, s: score });
    });
    scored.sort(function (a, b) { return a.s - b.s; });
    return scored.slice(0, 200);
  }

  return {
    metres: metres,
    bearing: bearing,
    turnAngle: turnAngle,
    adjacency: adjacency,
    route: route,
    directions: directions,
    totals: totals,
    search: search,
    isDestination: isDestination,
    isStartPoint: isStartPoint,
    placeName: placeName,
    labelWith: labelWith,
    floorName: floorName,
    floorOf: floorOf
  };
})();
