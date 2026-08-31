/* Everything the surveyor types lives here: kept in memory, mirrored into
   localStorage after every change, and exportable as a single JSON file.

   The export IS the master copy. localStorage can be cleared by the browser at
   any time, so export to a file at the end of every survey session. */
var Store = (function () {
  var KEY = 'wayfinder-building-v1';
  var OLD_KEY = 'aiims-nav-building-v1';   // survey data saved before the rename
  var UNDO_LIMIT = 40;

  var building = null;
  var undoStack = [], redoStack = [];
  var listeners = [];

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function normalise(b) {
    // The header title is configuration now (APP_TITLE). Drop any copy carried
    // in old saved data or an old export so it cannot come back.
    delete b.name;
    b.nodes = b.nodes || [];
    b.edges = b.edges || [];
    b.floors = b.floors || [];
    b.nodes.forEach(function (n) {
      n.aliases = n.aliases || [];
      n.kind = n.kind || 'junction';
    });
    // Drop edges that point at nodes which no longer exist.
    var ids = {};
    b.nodes.forEach(function (n) { ids[n.id] = true; });
    b.edges = b.edges.filter(function (e) { return ids[e[0]] && ids[e[1]]; });
    return b;
  }

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(building));
    } catch (err) {
      // Quota is the realistic failure here, usually from added floor photos.
      notifyError('Could not save. Storage may be full — export your data now.');
    }
  }

  var errorHandler = null;
  function notifyError(msg) { if (errorHandler) errorHandler(msg); }

  function emit() { listeners.forEach(function (fn) { fn(building); }); }

  return {
    onError: function (fn) { errorHandler = fn; },
    onChange: function (fn) { listeners.push(fn); },

    init: function () {
      var raw = null;
      try { raw = localStorage.getItem(KEY) || localStorage.getItem(OLD_KEY); } catch (err) { /* private mode */ }
      if (raw) {
        try { building = normalise(JSON.parse(raw)); } catch (err) { building = null; }
      }
      if (!building) building = normalise(clone(SEED_BUILDING));
      return building;
    },

    get: function () { return building; },

    /* Snapshot first, then let the caller mutate, then commit. */
    commit: function () {
      emit();
      persist();
    },

    /* Call immediately BEFORE a mutation you want to be undoable. A fresh edit
       abandons anything that was sitting on the redo stack, as everywhere else. */
    mark: function () {
      undoStack.push(JSON.stringify(building));
      if (undoStack.length > UNDO_LIMIT) undoStack.shift();
      redoStack.length = 0;
    },

    canUndo: function () { return undoStack.length > 0; },
    canRedo: function () { return redoStack.length > 0; },

    undo: function () {
      if (!undoStack.length) return false;
      redoStack.push(JSON.stringify(building));
      building = normalise(JSON.parse(undoStack.pop()));
      emit();
      persist();
      return true;
    },

    redo: function () {
      if (!redoStack.length) return false;
      undoStack.push(JSON.stringify(building));
      building = normalise(JSON.parse(redoStack.pop()));
      emit();
      persist();
      return true;
    },

    node: function (id) {
      for (var i = 0; i < building.nodes.length; i++) {
        if (building.nodes[i].id === id) return building.nodes[i];
      }
      return null;
    },

    floor: function (id) {
      for (var i = 0; i < building.floors.length; i++) {
        if (building.floors[i].id === id) return building.floors[i];
      }
      return null;
    },

    nodesOn: function (floorId) {
      return building.nodes.filter(function (n) { return n.floor === floorId; });
    },

    /* Short, human-readable, and stable enough to hand-edit later. */
    newId: function (prefix) {
      var n = 1, id;
      do { id = prefix + '-' + n; n++; } while (this.node(id));
      return id;
    },

    addNode: function (node) {
      building.nodes.push(node);
      this.commit();
      return node;
    },

    removeNode: function (id) {
      building.nodes = building.nodes.filter(function (n) { return n.id !== id; });
      building.edges = building.edges.filter(function (e) { return e[0] !== id && e[1] !== id; });
      this.commit();
    },

    hasEdge: function (a, b) {
      return building.edges.some(function (e) {
        return (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a);
      });
    },

    toggleEdge: function (a, b) {
      if (a === b) return null;
      if (this.hasEdge(a, b)) {
        building.edges = building.edges.filter(function (e) {
          return !((e[0] === a && e[1] === b) || (e[0] === b && e[1] === a));
        });
        this.commit();
        return 'removed';
      }
      building.edges.push([a, b]);
      this.commit();
      return 'added';
    },

    addFloor: function (floor) {
      building.floors.push(floor);
      this.commit();
    },

    stats: function () {
      var rooms = 0, seeded = 0;
      building.nodes.forEach(function (n) {
        if (n.kind === 'room') rooms++;
        if (n.seed) seeded++;
      });
      return { nodes: building.nodes.length, rooms: rooms, edges: building.edges.length, seeded: seeded };
    },

    /* Exports as a drop-in replacement for js/data.js, not as loose JSON.
       What is in the browser is only ever on THIS device; committing this file
       is how a survey becomes the map everybody else sees. */
    exportJSON: function () {
      var stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
      var text =
        '/* Way Finder survey data, exported ' + stamp + '.\n' +
        '   Replace js/data.js with this file and push to publish it.\n' +
        '   Survey mode can also read it back in through Import. */\n' +
        'var APP_TITLE = ' + JSON.stringify(typeof APP_TITLE === 'string' ? APP_TITLE : 'Way Finder') + ';\n\n' +
        'var SEED_BUILDING = ' + JSON.stringify(building, null, 2) + ';\n';

      var blob = new Blob([text], { type: 'text/javascript' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'data.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    },

    /* Accepts either an exported data.js or a bare JSON object, so older
       exports and hand-written files both still load. */
    importJSON: function (text) {
      var marker = text.indexOf('SEED_BUILDING');
      if (marker >= 0) {
        var start = text.indexOf('{', marker);
        var end = text.lastIndexOf('}');
        if (start >= 0 && end > start) text = text.slice(start, end + 1);
      }
      var incoming = JSON.parse(text);
      if (!incoming || !Array.isArray(incoming.nodes) || !Array.isArray(incoming.floors)) {
        throw new Error('That file does not look like a Way Finder export.');
      }
      this.mark();
      building = normalise(incoming);
      this.commit();
    },

    resetToSeed: function () {
      this.mark();
      building = normalise(clone(SEED_BUILDING));
      this.commit();
    }
  };
})();
