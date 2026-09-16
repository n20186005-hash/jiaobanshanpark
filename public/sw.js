const CACHE_VERSION = 'jiaobanshan-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = ['/', '/404', '/favicon.svg', '/site.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];

const OFFLINE_HTML = `<!doctype html>
<html lang="zh-Hant-TW">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#17372d" />
    <title>目前離線｜角板山公園</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #faf7f0;
        font-family: system-ui, -apple-system, "PingFang TC", "Noto Sans TC", sans-serif; color: #20251f; padding: 2rem; }
      main { max-width: 30rem; text-align: center; }
      h1 { font-size: 1.6rem; letter-spacing: -0.02em; }
      p { line-height: 1.9; color: #504c45; }
      a { display: inline-flex; align-items: center; justify-content: center; min-height: 3rem; margin-top: 1.25rem;
        padding-inline: 1.35rem; border-radius: 999px; background: #182f27; color: #fff; font-weight: 700; text-decoration: none; }
    </style>
  </head>
  <body>
    <main>
      <h1>目前離線，暫時無法載入</h1>
      <p>網路連線恢復後重新整理，就能繼續查看角板山公園的路線、交通與景點資訊。</p>
      <a href="/">重新載入</a>
    </main>
  </body>
</html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: 'reload' }))));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.startsWith('jiaobanshan-') && key !== STATIC_CACHE && key !== RUNTIME_CACHE).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

function offlineResponse() {
  return new Response(OFFLINE_HTML, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    fetch(request)
      .then((response) => {
        if (response.ok) cache.put(request, response.clone());
      })
      .catch(() => {});
    return cached;
  }
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached ?? Promise.reject(error);
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, RUNTIME_CACHE).catch(() => caches.match('/')).then((response) => response ?? offlineResponse()));
    return;
  }

  if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE).catch(() => caches.match('/')).then((response) => response ?? offlineResponse()));
    return;
  }

  event.respondWith(networkFirst(request, RUNTIME_CACHE));
});
