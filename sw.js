self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(resourcesToPrecache))
      .catch((err) => console.log("Faled to precache", err))
  );
});

self.addEventListener("activate", (event) => console.log("Activate event"));

// fetching files from either cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request)) //returning cache or if not available fetching from event
  );
});

self.addEventListener("push", (event) => {
  const title = "Yes, a message";
  const body = "We have received a push message";
  const tag = "simple-push-example-tag";
  const options = {
    body: body,
    tag: tag,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Pre Caching resources

const cacheName = "cache-v1";
const resourcesToPrecache = [
  "/",
  "/index.html",
  "/pages/about.html",
  "/pages/Error.html",
  "/pages/program.html",
  "/pages/projects.html",
  "/pages/tutorial.html",
  "/css/style.css",
  "/css/about.css",
  "/css/bootstrap.min.css",
  "/css/projects.css",
  "/css/responsive.css.css",
  "/css/slick.css",
  "/images/DevStudio.png",
  "/js/auth0.js",
  "/js/bootstrap.min.js",
  "/js/circular.js",
  "/js/custom.js",
  "/js/event.js",
  "/js/jquery-3.3.1.min.js",
  "/js/program.js",
  "/js/projects.js",
  "/js/slick.min.js",
  "/js/tutorial.js",
  "/images/team.svg",
  "/images/error.svg",
  "/images/about3.svg",
  "/images/about2.svg",
  "/images/about1.svg",
];
