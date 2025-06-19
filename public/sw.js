const CACHE_NAME = 'teemo-guide-cache-v2'; // Cache version incrementada
const ASSETS_TO_CACHE = [
  '/', // index.html
  '/index.tsx',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client',
  'https://esm.sh/react@^19.1.0/jsx-runtime',
  'https://esm.sh/react-dom@^19.1.0/',
  'https://esm.sh/react@^19.1.0/',
];

const DDRAGON_DOMAIN = 'ddragon.leagueoflegends.com';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('ServiceWorker: Cache opened');
        const cachePromises = ASSETS_TO_CACHE.map((assetUrl) => {
          // Para assets locais, usar 'no-cache' para garantir que o SW sempre busque do servidor durante a instalação.
          // Para CDNs, 'reload' é bom para tentar buscar a versão mais recente, mas sem falhar a instalação se o CDN estiver offline.
          const cacheBehavior = assetUrl.startsWith('http')
            ? 'reload'
            : 'no-cache';
          const request = new Request(assetUrl, { cache: cacheBehavior });

          return fetch(request)
            .then((response) => {
              if (!response.ok) {
                if (assetUrl.startsWith('http')) {
                  console.warn(
                    `ServiceWorker: Failed to fetch ${assetUrl} during install, but continuing. Status: ${response.status}`,
                  );
                  return Promise.resolve();
                }
                throw new Error(
                  `Failed to fetch ${assetUrl}: ${response.status} ${response.statusText}`,
                );
              }
              return cache.put(request, response);
            })
            .catch((err) => {
              console.error(
                `ServiceWorker: Error caching ${assetUrl} during install:`,
                err,
              );
              if (!assetUrl.startsWith('http')) throw err;
            });
        });
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log(
          'ServiceWorker: All assets cached successfully during install.',
        );
      })
      .catch((err) => {
        console.error(
          'ServiceWorker: Failed to cache some assets during install:',
          err,
        );
      }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Filtra para garantir que apenas caches antigos sejam deletados
              return cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('ServiceWorker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }),
        );
      })
      .then(() => {
        console.log('ServiceWorker: Activated and old caches cleaned.');
        return self.clients.claim(); // Faz com que o SW ativo controle clientes imediatamente
      }),
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Strategy for versions.json: Network first (aggressively, bypass HTTP cache), then SW cache
  if (
    url.hostname === DDRAGON_DOMAIN &&
    url.pathname.includes('/api/versions.json')
  ) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }) // Tenta rede, bypassando HTTP cache do navegador
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
            return networkResponse;
          }
          // Se rede falhar com erro HTTP (404, 500), tenta o cache do SW
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || networkResponse; // Retorna erro da rede se não estiver no cache
          });
        })
        .catch(() => {
          // Falha total da rede (offline)
          return caches.match(event.request).then((cachedResponse) => {
            return (
              cachedResponse ||
              new Response(
                JSON.stringify({
                  error: 'Offline: versions.json não disponível',
                }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: { 'Content-Type': 'application/json' },
                },
              )
            );
          });
        }),
    );
    return;
  }

  // Strategy for other DDragon data files (champion.json, etc.): Network first, then SW cache
  if (
    url.hostname === DDRAGON_DOMAIN &&
    url.pathname.includes('/cdn/') &&
    url.pathname.includes('/data/')
  ) {
    event.respondWith(
      fetch(event.request) // Tenta rede (respeita cache HTTP padrão)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
            return networkResponse;
          }
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return new Response(
              JSON.stringify({
                error: `Offline: ${url.pathname} não disponível`,
              }),
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'application/json' },
              },
            );
          });
        }),
    );
    return;
  }

  // DDragon images (cdn/img) and other CDN assets (tailwindcss, esm.sh) - Cache first, then network (Stale-While-Revalidate like)
  if (
    url.hostname === DDRAGON_DOMAIN ||
    url.hostname === 'cdn.tailwindcss.com' ||
    url.hostname === 'esm.sh'
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch((fetchError) => {
            console.warn(
              `ServiceWorker: Network fetch failed for ${event.request.url}:`,
              fetchError,
            );
            if (cachedResponse)
              return new Response('Recurso em cache, mas falha ao atualizar.', {
                status: 200,
              }); // Serve o cache mesmo se a revalidação falhar
            // Se não estiver em cache e a rede falhar:
            return new Response(
              'Erro de rede: Imagem ou recurso CDN não pôde ser carregado e não está em cache.',
              { status: 503, statusText: 'Service Unavailable' },
            );
          });
        return cachedResponse || fetchPromise;
      }),
    );
    return;
  }

  // App Shell and pre-cached assets - Cache first
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse.ok) {
          // Verifica se o recurso deve ser cacheado com base na lista ASSETS_TO_CACHE (principalmente para / e /index.tsx)
          const shouldCache = ASSETS_TO_CACHE.some((assetPath) => {
            const requestPath = url.pathname;
            // Lógica para garantir que '/' e '/index.html' sejam tratados corretamente
            return (
              requestPath === assetPath ||
              (assetPath === '/' &&
                (requestPath === '/index.html' || requestPath === '/')) ||
              requestPath === '/index.tsx'
            );
          });

          if (shouldCache) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        }
        return networkResponse;
      });
    }),
  );
});
