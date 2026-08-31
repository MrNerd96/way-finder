/* Boot, mode switching, and the bits of chrome both modes share. */
var App = (function () {
  /* Printed to the console on every load. If the page is not behaving the way
     the code on disk says it should, check this first — a stale service worker
     cache is the usual culprit, and a hard reload clears it. */
  var BUILD = '2026-08-30 · publishable export (v8)';

  var LANG_KEY = 'wayfinder-lang';
  var OLD_LANG_KEY = 'aiims-nav-lang';    // read once, for sessions saved before the rename

  var mode = 'go';
  var strip, sheet, surveyBar, modeBtn, toastEl, toastTimer;

  function setMode(m) {
    mode = m;
    document.body.dataset.mode = m;
    surveyBar.hidden = (m !== 'survey');
    sheet.style.display = (m === 'survey') ? 'none' : '';
    modeBtn.textContent = (m === 'survey') ? 'Done' : 'Survey';
    document.getElementById('brandSub').textContent =
      (m === 'survey') ? 'Survey mode — editing' : I18N.t('tagline');
    MapView.setMode(m);
    MapView.setSelection(null);
    if (m === 'survey') {
      // A leftover route line over the graph you are editing is just confusing.
      MapView.setRoute(null, 0, null);
      Survey.refreshStatus();
    } else {
      Nav.refreshMap();
      Nav.render();
    }
  }

  function renderFloorStrip() {
    var b = Store.get();
    var onRoute = Nav.routeFloors();
    strip.innerHTML = '';
    b.floors.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'floorChip';
      btn.setAttribute('aria-pressed', f.id === MapView.getFloor() ? 'true' : 'false');
      btn.textContent = f.label;
      if (onRoute[f.id]) {
        var dot = document.createElement('span');
        dot.className = 'dot';
        dot.textContent = ' ●';
        btn.appendChild(dot);
      }
      btn.addEventListener('click', function () {
        MapView.setFloor(f.id);
        renderFloorStrip();
        if (mode === 'survey') Survey.refreshStatus();
      });
      strip.appendChild(btn);
    });
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2600);
  }

  function handleTap(pt) {
    if (mode === 'survey') { Survey.onTap(pt); renderFloorStrip(); return; }
    var hit = MapView.hitNode(pt);
    if (hit) Nav.tapNode(hit);
  }

  /* A QR sticker on the wall carries ?at=<node id>, so scanning it answers
     "where are you?" before the patient has touched anything. */
  function applyDeepLink() {
    var params = new URLSearchParams(location.search);
    var at = params.get('at');
    var to = params.get('to');
    var lang = params.get('lang');
    if (lang) { I18N.set(lang); document.getElementById('langSel').value = I18N.get(); }
    if (at && Store.node(at)) {
      Nav.setStart(at);
      toast('You are at: ' + Graph.placeName(Store.node(at)));
    }
    if (to && Store.node(to)) Nav.setDest(to);
  }

  return {
    toast: toast,
    renderFloorStrip: renderFloorStrip,
    getMode: function () { return mode; },

    start: function () {
      strip = document.getElementById('floorStrip');
      sheet = document.getElementById('sheet');
      surveyBar = document.getElementById('surveyBar');
      modeBtn = document.getElementById('modeBtn');
      toastEl = document.getElementById('toast');

      Store.onError(toast);
      var building = Store.init();
      document.getElementById('brandName').textContent = APP_TITLE;

      MapView.init({
        onTap: handleTap,
        onDown: function (pt) { return mode === 'survey' ? Survey.onDown(pt) : null; },
        onDragEnd: function () { Survey.onDragEnd(); },
        onRubber: function (rect) { if (mode === 'survey') Survey.onRubber(rect); },
        onFloorChange: function () { renderFloorStrip(); }
      });
      MapView.setBuilding(building);

      Nav.init();
      Survey.init();

      Store.onChange(function (b) {
        MapView.setBuilding(b);
        MapView.draw();
      });

      var first = building.floors[0];
      if (first) MapView.setFloor(first.id);
      renderFloorStrip();

      modeBtn.addEventListener('click', function () {
        setMode(mode === 'survey' ? 'go' : 'survey');
        renderFloorStrip();
      });

      var langSel = document.getElementById('langSel');
      langSel.value = I18N.get();
      langSel.addEventListener('change', function () {
        I18N.set(langSel.value);
        try { localStorage.setItem(LANG_KEY, langSel.value); } catch (e) {}
        setMode(mode);
      });
      try {
        var saved = localStorage.getItem(LANG_KEY) || localStorage.getItem(OLD_LANG_KEY);
        if (saved) { I18N.set(saved); langSel.value = saved; }
      } catch (e) {}

      setMode('go');
      applyDeepLink();
      renderFloorStrip();
      // The bottom sheet only gets its real height once it has rendered, so the
      // first fit has to wait for the layout to settle.
      requestAnimationFrame(function () { MapView.fit(); });

      console.log('Way Finder — build ' + BUILD);

      if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
        navigator.serviceWorker.register('sw.js').catch(function () { /* fine without it */ });
      }
    }
  };
})();

document.addEventListener('DOMContentLoaded', App.start);
