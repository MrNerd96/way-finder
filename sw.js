/* Keeps the app usable where the signal dies — which, in a concrete hospital
   block, is most of the corridors.

   The code and markup are fetched network-first so an update reaches people on
   their next load; the cache is the fallback for when the network does not
   answer. The plan images are the opposite: they are big, they never change
   without also changing their filename, so they come straight from the cache.

   Bump CACHE, and the ?v= stamps in index.html, whenever the code changes. The
   stamps are what actually defeat a browser's own HTTP cache — no-store headers
   only help for files it bothers to re-request. */
var CACHE = 'wayfinder-v10';
var NET_TIMEOUT_MS = 2500;   // how long to wait before falling back to cache

var SHELL = [
  './',
  'index.html',
  'css/app.css?v=10',
  'js/i18n.js?v=10',
  'js/data.js?v=10',
  'js/detected.js?v=10',
  'js/store.js?v=10',
  'js/graph.js?v=10',
  'js/mapview.js?v=10',
  'js/navigate.js?v=10',
  'js/survey.js?v=10',
  'js/app.js?v=10',
  'assets/plans/ipd-g.jpg',
  'assets/plans/opd-f1.jpg',
  'assets/plans/opd-f2.jpg',
  'assets/plans/opd-f4.jpg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function offlineResponse() {
  return new Response('Offline and not cached.', {
    status: 503, statusText: 'Offline', headers: { 'Content-Type': 'text/plain' }
  });
}

/* Fresh if the network answers promptly, cached otherwise. Either way the
   cache is refreshed in the background for the next load. */
function networkFirst(req) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(req).then(function (cached) {
      var fromNetwork = fetch(req).then(function (res) {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(function () { return cached || offlineResponse(); });

      if (!cached) return fromNetwork;

      return Promise.race([
        fromNetwork,
        new Promise(function (resolve) {
          setTimeout(function () { resolve(cached); }, NET_TIMEOUT_MS);
        })
      ]);
    });
  });
}

function cacheFirst(req) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(offlineResponse);
    });
  });
}

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;   // leave cross-origin alone
  if (url.pathname.indexOf('/assets/plans/') >= 0) e.respondWith(cacheFirst(e.request));
  else e.respondWith(networkFirst(e.request));
});
