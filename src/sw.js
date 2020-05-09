const staticCacheName = "site-static-v1" // keep updating the cache version for a fresh cache data each time
const dynamicCacheName = "site-dynamic-v1"
const assets = [
  "/",
  "/index.html",
  "/bundle.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
]

// Limit size of cache
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

// install event
self.addEventListener("install", (event) => {
  console.log("Service worker installed")
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching all assets")
      cache.addAll(assets)
    })
  )
})

// activate service worker
self.addEventListener("activate", (event) => {
  console.log("Service worker activated")
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys)
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      )
    })
  )
})

// fetch event
self.addEventListener("fetch", (event) => {
  console.log("fetch event: ", event)
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheResponse) => {
        return (
          cacheResponse ||
          fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 10);
              return fetchRes
            })
          })
        )
      })
      .catch(() => {
        // Add the assets you want to show incase the cache or network request doesn't exist.
        // eg: fallback error index.html
      })
  )
})
