/// <reference no-default-lib="true" />
/// <reference lib="es7" />
/// <reference lib="webworker" />
import { decompressFromUTF16 } from 'lz-string'

declare const self: ServiceWorkerGlobalScope & {
  __precacheManifest: {
    files: string[],
    ver: string
  }
};
const { ver: cacheVer, files: precacheFiles } = self.__precacheManifest;
const cache = (): Promise<Cache> => caches.open(cacheVer);

self.addEventListener('install', e => {
  e.waitUntil(
    cache()
      .then(c => c.addAll(precacheFiles))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  self.clients.claim();
  e.waitUntil(async () => {
    await caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(ver => ver !== cacheVer)
            .map(cacheName => caches.delete(cacheName))
        )
      );
  });
});
self.addEventListener('fetch', e => {
  e.respondWith(cache().then(async cache => {
    const res = await cache.match(e.request);
    if (res) return res;
    try {
      const freshRes = await fetch(e.request);
      if (e.request.method === 'GET') cache.put(e.request, freshRes.clone());
      return freshRes;
    } catch (e) {
      // Request failed; ignore
    }
  }));
})