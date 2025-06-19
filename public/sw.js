const CACHE_NAME = 'teemo-guide-cache-v1';
const ASSETS_TO_CACHE = [
  '/', // index.html
  '/index.tsx', 
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // '/icons/teemo-app-icon.svg', // Removido
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client',
  'https://esm.sh/react@^19.1.0/jsx-runtime',
  'https://esm.sh/react-dom@^19.1.0/',
  'https://esm.sh/react@^19.1.0/'
];

const DDRAGON_DOMAIN = 'ddragon.leagueoflegends.com';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('ServiceWorker: Cache opened');
        // Use { cache: 'reload' } to bypass HTTP cache for these critical assets during SW install
        const cachePromises = ASSETS_TO_CACHE.map(assetUrl => {
          const request = new Request(assetUrl, { cache: 'reload' });
          return fetch(request)
            .then(response => {
              if (!response.ok) {
                // For CDN links that might fail if offline during install,
                // we might not want to fail the entire SW install.
                // However, for app shell files, failure is critical.
                if (assetUrl.startsWith('http')) { // Heuristic for CDNs
                  console.warn(`ServiceWorker: Failed to fetch ${assetUrl} during install, but continuing. Status: ${response.status}`);
                  return Promise.resolve(); // Don't fail SW install for CDN asset
                }
                throw new Error(`Failed to fetch ${assetUrl}: ${response.status} ${response.statusText}`);
              }
              return cache.put(request, response);
            })
            .catch(err => {
              console.error(`ServiceWorker: Error caching ${assetUrl} during install:`, err);
              // If it's a critical local asset, re-throw to fail SW install.
              if (!assetUrl.startsWith('http')) throw err;
            });
        });
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log('ServiceWorker: All assets cached successfully during install.');
      })
      .catch(err => {
        console.error('ServiceWorker: Failed to cache some assets during install:', err);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('ServiceWorker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('ServiceWorker: Activated and old caches cleaned.');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // DDragon API (versions.json, champion data json) - Network first, then cache
  if (url.hostname === DDRAGON_DOMAIN && (url.pathname.includes('/api/versions.json') || url.pathname.includes('/data/'))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Check for opaque responses which are usually errors for cross-origin no-cors requests
          if (!response.ok && response.type === 'opaque') {
            return caches.match(event.request).then(cachedResponse => {
                return cachedResponse || response; // Fallback to cache or original opaque response
            });
          }
          if (!response.ok) { // For non-opaque errors
            throw new Error('Network response was not ok.');
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => { // Network request failed
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, and network failed, return a basic offline response for JSON
            if (event.request.headers.get('accept').includes('application/json')) {
              return new Response(JSON.stringify({ error: "Offline: Conteúdo não disponível no cache." }), {
                status: 503,
                statusText: "Service Unavailable",
                headers: { 'Content-Type': 'application/json' }
              });
            }
            // For other types, just let the browser handle the failure
            return new Response("Erro de rede: Recurso não disponível no cache.", { status: 503, statusText: "Service Unavailable" });
          });
        })
    );
    return;
  }

  // DDragon images (cdn) and other CDN assets (tailwindcss, esm.sh) - Cache first, then network (Stale-While-Revalidate like)
  if (url.hostname === DDRAGON_DOMAIN || url.hostname === 'cdn.tailwindcss.com' || url.hostname === 'esm.sh') {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(fetchError => {
          console.warn(`ServiceWorker: Network fetch failed for ${event.request.url}:`, fetchError);
          // If !cachedResponse, this error will propagate. If cachedResponse exists, it was already returned.
          // It's important that if there's no cache, the original error is thrown.
          if (!cachedResponse) throw fetchError;
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // App Shell and pre-cached assets - Cache first
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // If not in cache, fetch from network and cache if it's one of the predefined assets or important dynamic content
        return fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            // Decide if this response should be cached.
            // For example, only cache if it's in ASSETS_TO_CACHE or matches a certain pattern.
            const shouldCache = ASSETS_TO_CACHE.some(assetPath => {
              // Need to handle cases where assetPath might be just '/' for index.html
              const requestPath = url.pathname;
              return requestPath === assetPath || (assetPath === '/' && requestPath === '/index.html');
            });

            if (shouldCache) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
          }
          return networkResponse;
        });
      })
  );
});