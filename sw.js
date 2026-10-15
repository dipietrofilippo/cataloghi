
const CACHE = 'cataloghi-no-login-v8-copertine';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './logo.png',
  './menu.png',
  './foma.png',
  './filiera.png',
  './venosa.png',
  './colazioni.png',
  './icons/icon-192.png',
  './icons/icon-512.png',

  './copertine/Catalogo%20Men%C3%B9.png',
  './copertine/Prime%20Colazioni.png',
  './copertine/Cucina%20Antica.png',
  './copertine/Novit%C3%A0%202026.png',
  './copertine/Foma.png',
  './copertine/Filiera%20del%20Gusto.png',
  './copertine/Essenza%20Garganica.png',
  './copertine/Fenora.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
