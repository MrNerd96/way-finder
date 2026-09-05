/* Boot, mode switching, and the bits of chrome both modes share. */
var App = (function () {
  /* Printed to the console on every load. If the page is not behaving the way
     the code on disk says it should, check this first — a stale service worker
     cache is the usual culprit, and a hard reload clears it. */
  var BUILD = '2026-09-03 · OPD 3rd floor added (v28)';

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
    // The version is on screen in survey mode on purpose: when a surveyor says
    // "still broken", the screenshot itself has to say which build they are
    // looking at, or the next hour goes on guessing about caches.
    document.getElementById('brandSub').textContent =
      (m === 'survey') ? 'Survey mode — ' + BUILD.split('·').pop().trim() : I18N.t('tagline');
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

  /* A new service worker calls skipWaiting and clients.claim, so it takes over
     the moment it installs -- but the page carries on running the scripts it
     already loaded, and the next start serves the old shell from the cache
     again. So an update lands, and nothing shows it: press home, come back,
     and the old build is still there.

     Reloading once when the worker changes is what actually closes that loop.
     It is held back while the editor is open, because a surveyor halfway
     through typing a room number should not lose it to a refresh. */
  function watchForUpdate() {
    // On a first-ever visit there is no controller to replace, and the
    // controllerchange that follows registration is not an update.
    var hadController = !!navigator.serviceWorker.controller;
    var reloading = false;

    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!hadController || reloading) return;
      reloading = true;
      (function whenIdle() {
        var ed = document.getElementById('editor');
        if (ed && !ed.hidden) { setTimeout(whenIdle, 2000); return; }
        location.reload();
      })();
    });
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
      renderFloorStrip();
      // The bottom sheet only gets its real height once it has rendered, so the
      // first fit has to wait for the layout to settle.
      requestAnimationFrame(function () { MapView.fit(); });

      console.log('Way Finder — build ' + BUILD);

      if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
        watchForUpdate();
        navigator.serviceWorker.register('sw.js').then(function (reg) {
          // Ask on every load rather than waiting for the browser to feel like
          // checking. On a corridor connection the update can take a while, and
          // it only has to finish before the surveyor next opens the app.
          if (reg && reg.update) reg.update();
        }).catch(function () { /* fine without it */ });
      }
    }
  };
})();

document.addEventListener('DOMContentLoaded', App.start);
