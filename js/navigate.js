/* Go mode: the patient-facing flow. Two questions, then one instruction per
   screen with a big arrow. Never more than one thing to read at a time. */
var Picker = (function () {
  var box, input, list, title, close;
  var onPick = null, filter = null;
  /* Both questions share this picker, but they hold different things: the
     destination list is rooms, the start list is only lifts, staircases,
     entrances and landmarks. Advice written for one is wrong in the other, so
     the caller says which wording applies. */
  var emptyKey = 'noMatch', placeholderKey = 'searchPlaceholder';

  function render() {
    var b = Store.get();
    var results = Graph.search(b, input.value, filter);
    list.innerHTML = '';
    if (!results.length) {
      var li = document.createElement('li');
      li.className = 'emptyMsg';
      li.textContent = b.nodes.length ? I18N.t(emptyKey) : I18N.t('nothingYet');
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
    return { lift: '🛗', stair: '🪜', ramp: '♿', entrance: '🚪', toilet: '🚻', counter: '🧾', landmark: '📌' }[kind] || '📍';
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

      /* Enter takes the top row. Typing a room number and pressing enter is
         what everyone does -- the number is the most exact thing anyone can
         tell this app about where they mean -- and until now it did nothing at
         all, on a laptop or on a phone's search key, and the number had to be
         tapped as well as typed. It clicks the row rather than calling the
         handler directly, so there is one path in and no second copy of what
         picking a place means. */
      input.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.keyCode !== 13) return;
        ev.preventDefault();
        var first = list.querySelector('li button');
        if (first) first.click();
      });
      box.addEventListener('click', function (ev) { if (ev.target === box) hide(); });
    },
    open: function (opts) {
      onPick = opts.onPick;
      filter = opts.filter;
      emptyKey = opts.emptyKey || 'noMatch';
      placeholderKey = opts.placeholderKey || 'searchPlaceholder';
      title.textContent = opts.title;
      input.value = '';
      input.placeholder = I18N.t(placeholderKey);
      box.hidden = false;
      render();
      /* Focus straight away, phone included, so the keyboard is up and the
         field is live the moment the question appears.

         This used to hold back on touch, because the sheet rose from the
         bottom and the keyboard buried the list under it -- one extra tap was
         the lesser evil. The sheet opens from the top now, so the keyboard
         takes the tail of the list and nothing else, and holding back just
         costs a tap on a screen someone opened in order to type.

         Synchronously, and not in a timeout: this runs inside the tap that
         opened the picker, and a phone only raises its keyboard for a focus
         it can still trace back to something the user did. */
      input.focus();
    },
    hide: hide
  };
})();

var Nav = (function () {
  var sheet, wayBtn;
  var startId = null, destId = null;
  var destService = null;     // the one of several behind that door they asked for
  var path = null, steps = null, idx = 0;

  /* How the patient will change floors. Each choice is the ways up it will
     accept, widest last: the lift alone, anything step-free, or anything at
     all. Remembered once set, because someone who travels one of these ways
     travels it every visit and should not have to say so twice. */
  var WAY_KEY = 'wayfinder-way';
  var WAYS = [
    { id: 'lift',  icon: '🛗', allow: { lift: true } },
    { id: 'steps', icon: '🪜', allow: null },
    { id: 'chair', icon: '♿', allow: { lift: true, ramp: true } }
  ];
  var way = 'lift';
  var wayDenied = false;          // asked one way, and there was no route that way

  function wayOf(id) {
    for (var i = 0; i < WAYS.length; i++) if (WAYS[i].id === id) return WAYS[i];
    return WAYS[0];
  }

  function nextWay(id) {
    for (var i = 0; i < WAYS.length; i++) if (WAYS[i].id === id) return WAYS[(i + 1) % WAYS.length];
    return WAYS[0];
  }

  function loadWay() {
    var saved = null;
    try { saved = localStorage.getItem(WAY_KEY); } catch (e) {}
    way = (saved && wayOf(saved).id === saved) ? saved : 'lift';
  }

  function setWay(id) {
    way = wayOf(id).id;
    try { localStorage.setItem(WAY_KEY, way); } catch (e) {}
    syncWayBtn();
    // A route already on screen was worked out under the old answer, so it is
    // no longer the answer to the question being asked.
    if (steps && steps.length) computeRoute();
  }

  /* The way up rides on the map rather than in the sheet: it is one tap, it is
     wanted as often mid-route as before starting, and the sheet is already two
     questions and an answer tall on a phone.

     What it shows is what is chosen, never what tapping would choose. A
     control that displays the thing it is about to become is the oldest way
     there is to get someone to pick the opposite of what they wanted. */
  function syncWayBtn() {
    if (!wayBtn) return;
    var w = wayOf(way);
    wayBtn.innerHTML = '';
    var ico = document.createElement('span');
    ico.className = 'ico';
    ico.textContent = w.icon;
    var label = document.createElement('b');
    label.textContent = I18N.t('way_' + w.id);
    wayBtn.appendChild(ico);
    wayBtn.appendChild(label);
    wayBtn.title = I18N.t('howUp');
    wayBtn.setAttribute('aria-label', I18N.t('howUp') + ': ' + I18N.t('way_' + w.id));
  }

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
    wayDenied = false;
    var allow = wayOf(way).allow;
    path = Graph.route(b(), startId, destId, { allow: allow });
    if (!path && allow) {
      /* There is no way there the way they asked. Saying "no path" would be a
         half-truth and leaves them nowhere; show the one route there is and
         say plainly that it is not the way they chose, so it is their call. */
      path = Graph.route(b(), startId, destId);
      wayDenied = !!path;
      if (path) App.toast(I18N.t('noSuchWay'));
    }
    if (!path) { App.toast(I18N.t('noRoute')); return; }
    steps = Graph.directions(b(), path, destService);
    idx = 0;
    showStep();
  }

  /* Which stretch of the path this card is talking about. A straight run says
     where it began; everything else is the single hop it names. */
  function legOf(step) {
    if (!step) return 0;
    return { from: step.segFrom, to: step.seg };
  }

  function showStep() {
    var step = steps[idx];
    if (step && step.floor) MapView.setFloor(step.floor, true);
    MapView.setRoute(path, legOf(step), { start: startId, end: destId });
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
    syncWayBtn();
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
        emptyKey: 'noMatchStart',
        placeholderKey: 'startPlaceholder',
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

    if (wayDenied) {
      var warn = document.createElement('p');
      warn.className = 'routeWarn';
      warn.textContent = I18N.t('noSuchWay');
      sheet.appendChild(warn);
    }

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
      wayBtn = document.getElementById('wayBtn');
      loadWay();
      if (wayBtn) wayBtn.addEventListener('click', function () { setWay(nextWay(way).id); });
      syncWayBtn();
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
      MapView.setRoute(path, steps ? legOf(steps[idx]) : 0,
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
