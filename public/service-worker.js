
// This is a very basic service worker for caching static assets.
// For a production application, consider using a more robust solution like Workbox.

const CACHE_NAME = 'stockdiary-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Add other static assets like JS, CSS, images, and fonts if you have them
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
