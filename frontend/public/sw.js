const CACHE_NAME = 'brainstorm-v9-total-domination';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/dashboard',
  '/search',
  '/sports', 
  '/grading',
  '/tournaments',
  '/deckbuilder',
  '/market',
  '/community',
  '/marketplace'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(' BRAINSTORM PWA: Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(' BRAINSTORM PWA: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'BRAINSTORM price alert!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icons/icon-128x128.png'
      },
      {
        action: 'close', 
        title: 'Close notification',
        icon: '/icons/icon-128x128.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(' BRAINSTORM Alert', options)
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'portfolio-sync') {
    event.waitUntil(
      // Sync portfolio data when back online
      console.log(' BRAINSTORM PWA: Syncing portfolio data...')
    );
  }
});
