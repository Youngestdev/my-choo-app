!function(){var e=["bc3f546e30f36e91/bundle.js","a0ed18862c4dc75f/bundle.css","assets/icon.png","assets/style.css","callback","recipe","user","manifest.json"];self.addEventListener("fetch",function(e){e.respondWith(self.caches.match(e.request).then(function(n){return n||self.fetch(e.request)}))}),self.addEventListener("install",function(n){n.waitUntil(self.caches.open("1.0.0").then(function(n){return n.addAll(e)}))}),self.addEventListener("activate",function(e){e.waitUntil(self.caches.keys().then(function(e){return Promise.all(e.map(function(n,t){if("1.0.0"!==e[t])return self.caches.delete(e[t])}))}))})}();
//# sourceMappingURL=bankai-service-worker.js.map