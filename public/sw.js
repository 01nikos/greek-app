// Greek Trainer — Service Worker
// Strategy:
//   • App shell (HTML/JS/CSS chunks): stale-while-revalidate (fast + fresh on next visit)
//   • Static assets (icons, manifests): cache-first (rarely change)
//   • Google Fonts: cache-first with long TTL (immutable URLs)
//   • Everything else: network-first with cache fallback (works offline)

const VERSION = "v1.0.0";
const SHELL_CACHE = `greek-shell-${VERSION}`;
const RUNTIME_CACHE = `greek-runtime-${VERSION}`;
const FONTS_CACHE = `greek-fonts-${VERSION}`;

// Precache the app shell on install
const PRECACHE_URLS = [
  "/",
  "/alphabet",
  "/vocabulary",
  "/grammar",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

// ===== INSTALL =====
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Precache but don't fail install if some URLs are unreachable
      await Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: "reload" }))
        )
      );
      // Activate immediately on update
      await self.skipWaiting();
    })()
  );
});

// ===== ACTIVATE — clean old caches =====
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const keep = new Set([SHELL_CACHE, RUNTIME_CACHE, FONTS_CACHE]);
      await Promise.all(
        keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))
      );
      // Take control of open clients
      await self.clients.claim();
    })()
  );
});

// ===== FETCH =====
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Skip cross-origin requests except Google Fonts
  if (url.origin !== self.location.origin) {
    if (
      url.hostname === "fonts.googleapis.com" ||
      url.hostname === "fonts.gstatic.com"
    ) {
      event.respondWith(cacheFirst(request, FONTS_CACHE));
    }
    return;
  }

  // HTML navigation requests → network-first (for fresh content + offline fallback)
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(networkFirst(request, SHELL_CACHE));
    return;
  }

  // Next.js static chunks (/_next/static/*) → cache-first (immutable, hashed URLs)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  // Other Next.js routes (_next/image, _next/data) → stale-while-revalidate
  if (url.pathname.startsWith("/_next/")) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }

  // Icons & static files → cache-first
  if (/\.(png|jpg|jpeg|svg|ico|webmanifest|woff2?)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  // Default: stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

// ===== STRATEGIES =====

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    return cached || Response.error();
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Last resort: cached homepage
    const fallback = await cache.match("/");
    if (fallback) return fallback;
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || fetchPromise;
}

// ===== MESSAGES — allow the page to trigger updates =====
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
