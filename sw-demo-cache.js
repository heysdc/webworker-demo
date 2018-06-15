console.log('service worker!');

var VERSION = 'v1';

// 缓存
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        'http://localhost:8080/index.html',
        'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
        'http://localhost:8080/main.js',
        'http://localhost:8080/worker.js',
        'http://localhost:8080/foo.js'
      ]);
    })
  );
});
// 缓存更新
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    caches.open(VERSION).then(function(cache) {
        if (response) {
            cache.put(event.request, response);
        }
    });
    return response && response.clone();
  }));
});