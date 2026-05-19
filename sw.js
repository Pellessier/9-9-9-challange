const CACHE_NAME = '999-baseball-v1';
const ASSETS = [
  '/9-9-9-challange/',
  '/9-9-9-challange/index.html',
  '/9-9-9-challange/manifest.json',
  '/9-9-9-challange/icon-192.png',
  '/9-9-9-challange/icon-512.png',
  '/9-9-9-challange/icon-192-maskable.png',
  '/9-9-9-challange/icon-512-maskable.png'
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match('/9-9-9-challange/index.html'));
    })
  );
});
