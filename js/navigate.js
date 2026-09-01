/* Go mode: the patient-facing flow. Two questions, then one instruction per
   screen with a big arrow. Never more than one thing to read at a time. */
var Picker = (function () {
  var box, input, list, title, close;
  var onPick = null, filter = null;

  function render() {
    var b = Store.get();
    var results = Graph.search(b, input.value, filter);
    list.innerHTML = '';
    if (!results.length) {
      var li = document.createElement('li');
      li.className = 'emptyMsg';
      li.textContent = b.nodes.length ? I18N.t('noMatch') : I18N.t('nothingYet');
      list.appendChild(li);
      return;
    }
    results.forEach(function (hit) {
      var n = hit.node;
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';

      var rno = document.createElement('span');
      rno.className = 'rno';
      rno.textContent = n.room || iconFor(n.kind);
      btn.appendChild(rno);

      var nm = document.createElement('span');
      nm.className = 'nm';
      var strong = document.createElement('b');
      var small = document.createElement('small');
      var bits = [Graph.floorName(b, n.floor)];

      if (hit.service) {
        // They asked for this one thing, so it is the heading. What else is
        // behind the same door is worth knowing on arrival, not before.
        strong.textContent = hit.service;
      } else {
        strong.textContent = n.name || n.room || '';
        // Reached by room number or name: show everything behind that door, so
        // nobody walks off expecting the only thing they happened to read.
        if (n.services && n.services.length > 1) bits.push(n.services.join(' · '));
        else if (n.aliases && n.aliases.length) bits.push(n.aliases.join(', '));
      }
      small.textContent = bits.join(' · ');
      nm.appendChild(strong);
      nm.appendChild(small);
      btn.appendChild(nm);

      btn.addEventListener('click', function () {
        var fn = onPick;
        hide();
        if (fn) fn(n, hit.service || null);
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function iconFor(kind) {
    return { lift: '🛗', stair: '🪜', entrance: '🚪', toilet: '🚻', counter: '🧾', landmark: '📌' }[kind] || '📍';
  }

  function hide() {
    box.hidden = true;
    onPick = null;
    input.blur();
  }

  return {
    init: function () {
      box = document.getElementById('picker');
      input = document.getElementById('pickerInput');
      list = document.getElementById('pickerList');
      title = document.getElementById('pickerTitle');
      close = document.getElementById('pickerClose');
      close.addEventListener('click', hide);
      input.addEventListener('input', render);
      box.addEventListener('click', function (ev) { if (ev.target === box) hide(); });
    },
    open: function (opts) {
      onPick = opts.onPick;
      filter = opts.filter;
      title.textContent = opts.title;
      input.value = '';
      input.placeholder = I18N.t('searchPlaceholder');
      box.hidden = false;
      render();
      // Don't steal focus on touch: the keyboard covering the list is worse
      // than one extra tap, and many users pick from the list rather than type.
      if (window.matchMedia('(pointer: fine)').matches) input.focus();
    },
    hide: hide
  };
})();

var Nav = (function () {
  var sheet;
  var startId = null, destId = null;
  var destService = null;     // the one of several behind that door they asked for
  var path = null, steps = null, idx = 0;

  function b() { return Store.get(); }

  function node(id) { return id ? Store.node(id) : null; }

  function reset() {
    path = null; steps = null; idx = 0;
    MapView.setRoute(null, 0, null);
    render();
  }

  function clearAll() {
    startId = null; destId = null; destService = null;
    reset();
  }

  function setStart(id) { startId = id; path = null; steps = null; render(); focusNode(id); }
  function setDest(id, service) {
    destId = id;
    destService = service || null;
    path = null; steps = null;
    render();
    focusNode(id);
  }

  function focusNode(id) {
    var n = node(id);
    if (n) MapView.setFloor(n.floor);
    MapView.setRoute(path, 0, { start: startId, end: destId });
  }

  function computeRoute() {
    if (!startId || !destId) return;
    if (startId === destId) { App.toast(I18N.t('samePlace')); return; }
    path = Graph.route(b(), startId, destId);
    if (!path) { App.toast(I18N.t('noRoute')); return; }
    steps = Graph.directions(b(), path, destService);
    idx = 0;
    showStep();
  }

  function showStep() {
    var step = steps[idx];
    if (step && step.floor) MapView.setFloor(step.floor, true);
    MapView.setRoute(path, step ? step.seg : 0, { start: startId, end: destId });
    render();
    App.renderFloorStrip();
    // Frame this floor's leg of the walk once the sheet has taken its height.
    requestAnimationFrame(function () { MapView.fitRoute(); });
  }

  function speakCurrent() {
    if (!steps || !window.speechSynthesis) return;
    var s = steps[idx];
    var text = [s.title, s.meta, s.detail].filter(Boolean).join('. ');
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = I18N.speechLang();
      u.rate = 0.92;
      speechSynthesis.speak(u);
    } catch (err) { /* no voices installed; the text is on screen anyway */ }
  }

  /* ---------- rendering ---------- */

  function render() {
    sheet.innerHTML = '';
    if (steps && steps.length) renderStep();
    else renderChooser();
  }

  function bigPick(labelKey, chosen, placeholderKey, icon, handler, label) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bigPick' + (chosen ? ' filled' : '');
    var ico = document.createElement('span');
    ico.className = 'ico';
    ico.textContent = icon;
    var txt = document.createElement('span');
    txt.className = 'txt';
    var strong = document.createElement('b');
    var small = document.createElement('small');
    if (chosen) {
      strong.textContent = label ? Graph.labelWith(chosen, label) : Graph.placeName(chosen);
      small.textContent = Graph.floorName(b(), chosen.floor);
    } else {
      strong.textContent = I18N.t(labelKey);
      small.textContent = I18N.t(placeholderKey);
    }
    txt.appendChild(strong); txt.appendChild(small);
    btn.appendChild(ico); btn.appendChild(txt);
    btn.addEventListener('click', handler);
    return btn;
  }

  function renderChooser() {
    sheet.appendChild(bigPick('whereAreYou', node(startId), 'tapToChoose', '🧍', function () {
      Picker.open({
        title: I18N.t('whereAreYou'),
        filter: Graph.isStartPoint,
        onPick: function (n) { setStart(n.id); }
      });
    }));

    sheet.appendChild(bigPick('whereTo', node(destId), 'tapToChoose', '🎯', function () {
      Picker.open({
        title: I18N.t('whereTo'),
        filter: Graph.isDestination,
        onPick: function (n, service) { setDest(n.id, service); }
      });
    }, destService));

    var go = document.createElement('button');
    go.type = 'button';
    go.className = 'primary go';
    go.textContent = I18N.t('showWay');
    go.disabled = !(startId && destId);
    go.addEventListener('click', computeRoute);
    sheet.appendChild(go);
  }

  function renderStep() {
    var s = steps[idx];
    var t = Graph.totals(b(), path);

    var head = document.createElement('div');
    head.className = 'routeHead';
    var small = document.createElement('small');
    small.textContent = I18N.t('step') + ' ' + (idx + 1) + ' ' + I18N.t('of') + ' ' + steps.length +
      ' · ' + I18N.t('totalWalk') + ' ' + t.metres + ' ' + I18N.t('metres');
    var again = document.createElement('button');
    again.type = 'button';
    again.className = 'linkBtn';
    again.textContent = I18N.t('startOver');
    again.addEventListener('click', clearAll);
    head.appendChild(small); head.appendChild(again);
    sheet.appendChild(head);

    var card = document.createElement('div');
    card.className = 'stepCard';
    var arrow = document.createElement('div');
    arrow.className = 'stepArrow';
    arrow.textContent = s.icon;
    var body = document.createElement('div');
    body.className = 'stepBody';
    var h3 = document.createElement('h3');
    h3.textContent = s.title;
    body.appendChild(h3);
    if (s.detail) {
      var p = document.createElement('p');
      p.textContent = s.detail;
      body.appendChild(p);
    }
    if (s.meta) {
      var meta = document.createElement('div');
      meta.className = 'stepMeta';
      meta.textContent = s.meta;
      body.appendChild(meta);
    }
    card.appendChild(arrow); card.appendChild(body);
    sheet.appendChild(card);

    var bar = document.createElement('div');
    bar.className = 'progress';
    for (var i = 0; i < steps.length; i++) {
      var seg = document.createElement('i');
      if (i <= idx) seg.className = 'done';
      bar.appendChild(seg);
    }
    sheet.appendChild(bar);

    var nav = document.createElement('div');
    nav.className = 'stepNav';

    var back = document.createElement('button');
    back.type = 'button';
    back.className = 'sec';
    back.textContent = '‹ ' + I18N.t('back');
    back.disabled = idx === 0;
    back.addEventListener('click', function () { if (idx > 0) { idx--; showStep(); } });

    var spk = document.createElement('button');
    spk.type = 'button';
    spk.className = 'sec spk';
    spk.textContent = '🔊';
    spk.setAttribute('aria-label', 'Read aloud');
    spk.addEventListener('click', speakCurrent);

    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'primary';
    next.textContent = I18N.t('next') + ' ›';
    next.disabled = idx >= steps.length - 1;
    next.addEventListener('click', function () { if (idx < steps.length - 1) { idx++; showStep(); } });

    nav.appendChild(back); nav.appendChild(spk); nav.appendChild(next);
    sheet.appendChild(nav);
  }

  return {
    init: function () {
      sheet = document.getElementById('sheet');
      Picker.init();
    },
    render: render,
    reset: reset,
    clearAll: clearAll,
    setStart: setStart,
    setDest: setDest,
    /* Tapping a room on the map in Go mode is a shortcut for choosing it. */
    tapNode: function (n) {
      if (!startId) { setStart(n.id); return; }
      if (Graph.isDestination(n)) setDest(n.id);
    },
    hasRoute: function () { return !!steps; },
    /* Survey mode blanks the map; put the route back when we come out of it. */
    refreshMap: function () {
      MapView.setRoute(path, steps ? steps[idx].seg : 0,
                       (startId || destId) ? { start: startId, end: destId } : null);
    },
    routeFloors: function () {
      if (!path) return {};
      var m = {};
      path.forEach(function (n) { m[n.floor] = true; });
      return m;
    }
  };
})();
