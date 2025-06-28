const CACHE_NAME = 'brainstorm-pwa-v1.0';
const urlsToCache = [
  '/mobile-pwa.html',
  '/index.html',
  '/trading-dashboard.html',
  '/advanced-search.html',
  '/sports-card-hub.html',
  '/ai-deck-builder.html',
  '/market-analytics.html',
  '/community-platform.html',
  '/marketplace.html',
  '/grading-hub.html',
  '/tournament-tracker.html',
  '/manifest.json'
];

// Install service worker and cache resources
self.addEventListener('install', (event) => {
  console.log(' Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(' Caching app resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log(' Service Worker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Activate service worker and clean old caches
self.addEventListener('activate', (event) => {
  console.log(' Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(' Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log(' Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log(' Serving from cache:', event.request.url);
          return response;
        }
        
        console.log(' Fetching from network:', event.request.url);
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      }).catch(() => {
        // Return offline page for navigation requests
        if (event.request.destination === 'document') {
          return caches.match('/mobile-pwa.html');
        }
      })
  );
});

// Background sync for data updates
self.addEventListener('sync', (event) => {
  console.log(' Background sync triggered:', event.tag);
  
  if (event.tag === 'portfolio-sync') {
    event.waitUntil(syncPortfolioData());
  }
  
  if (event.tag === 'tournament-sync') {
    event.waitUntil(syncTournamentData());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log(' Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from BRAINSTORM!',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9Ijk2IiB5PSIxMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI5NiIgZmlsbD0iI0NDQ0NGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+DjTwvdGV4dD4KPC9zdmc+',
    badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9IjM2IiB5PSI0NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjM2IiBmaWxsPSIjQ0NDQ0ZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4ONwqA8L3RleHQ+Cjwvc3ZnPgo=',
    vibrate: [200, 100, 200],
    data: {
      url: '/mobile-pwa.html'
    },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjQ0NDQ0ZGIi8+Cjwvc3ZnPgo='
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(' BRAINSTORM', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log(' Notification clicked');
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/mobile-pwa.html')
    );
  } else {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/mobile-pwa.html')
    );
  }
});

// Helper functions
async function syncPortfolioData() {
  try {
    console.log(' Syncing portfolio data...');
    // Simulate portfolio data sync
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(' Portfolio data synced');
  } catch (error) {
    console.error(' Portfolio sync failed:', error);
  }
}

async function syncTournamentData() {
  try {
    console.log(' Syncing tournament data...');
    // Simulate tournament data sync
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(' Tournament data synced');
  } catch (error) {
    console.error(' Tournament sync failed:', error);
  }
}

// Log service worker events
console.log(' BRAINSTORM Service Worker loaded');