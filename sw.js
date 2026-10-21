/* KR Vocab service worker.
   - Navigations / index.html: network-first (code updates arrive whenever online), cache fallback offline.
   - App shell assets (manifest, icons): cache-first, refreshed in the background.
   - Cross-origin requests (Google Sheets CSV, GIFs, …) are NOT intercepted: synced words and stories
     are already kept in localStorage by the app, so they work offline without the service worker. */
const VERSION = 'v1';
const CACHE = 'kr-vocab-' + VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('kr-vocab-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isAppPage(req, url) {
  return req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname === new URL('./', self.registration.scope).pathname;
}

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req, { cache: 'no-store' });
    if (res && res.ok) cache.put('./index.html', res.clone());
    return res;
  } catch (err) {
    return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  const refresh = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await refresh) || Response.error();
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // leave cross-origin (Sheets CSV, GIFs) to the browser
  if (!url.pathname.startsWith(new URL('./', self.registration.scope).pathname)) return;
  if (isAppPage(req, url)) { event.respondWith(networkFirst(req)); return; }
  event.respondWith(cacheFirst(req));
});
