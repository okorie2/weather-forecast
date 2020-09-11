
/*const dynamicCacheName = 'site-dynamic-v1';
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key =>  key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(async fetchRes => {
        const cache = await caches.open(dynamicCacheName);
        cache.put(evt.request.url, fetchRes.clone());
        return fetchRes;
      });
    })
  );
});*/
self.addEventListener('install', (event) => {
  //...
});
self.addEventListener('activate', (event) => {
  //...
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) { //entry found in cache
          return response
        }
        return fetch(event.request)
      }
    )
  )
})
navigator.serviceWorker.ready.then((swRegistration) => {
  return swRegistration.sync.register('event1')
});
self.addEventListener('sync', (event) => {
  if (event.tag == 'event1') {
    event.waitUntil(doSomething())
  }
})
