const CACHE_NAME = "paspeurdupro-v1";

// Fichiers essentiels au fonctionnement hors ligne
const PRECACHE_URLS = [
  "/",            // attention : sur GitHub Pages, peut devenir "/Pas-Peur-du-Pro/"
  "/index.html",
  "/main.css",
  "/main.js",
  "/LogoPasPeurduPro.png"  // adapte le chemin à ton logo réel
];

// Installation : on pré-cache les fichiers essentiels
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activation : on supprime les anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Stratégie de cache STABLE : "network-first" avec repli sur cache
self.addEventListener("fetch", event => {
  const request = event.request;

  // On ne gère que les requêtes GET
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then(response => {
        // Si la requête réussit, on met à jour le cache pour la prochaine fois
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Si le réseau échoue, on tente de répondre depuis le cache
        return caches.match(request);
      })
  );
});
