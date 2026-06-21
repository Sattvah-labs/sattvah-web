/*
 * Sattvah service worker.
 *
 * Caches static chrome only (HTML, JS, CSS, fonts, images, SVGs). API
 * traffic to /api/* and api.sattvah.ai is ALWAYS network, never cached,
 * so signed responses stay fresh and sign-in tokens never leak across
 * users on shared devices.
 *
 * No push, no Notification.requestPermission(). Per the launch brief
 * we do not prompt for notifications anywhere.
 */

const VERSION = "v1";
const CHROME_CACHE = `sattvah-chrome-${VERSION}`;

// Pre-cache the bare minimum so /talk can paint offline after first
// load. Everything else is filled in on demand by the fetch handler.
const PRECACHE = [
  "/",
  "/talk",
  "/talk/",
  "/manifest.webmanifest",
  "/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CHROME_CACHE)
      .then((cache) =>
        Promise.all(
          PRECACHE.map((url) =>
            cache.add(url).catch(() => {
              /* tolerated: page may not yet be built when SW installs */
            }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("sattvah-chrome-") && k !== CHROME_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Heuristic: anything served from api.sattvah.ai, anything under /api/,
// and anything explicitly tagged no-store stays uncached.
function isApiRequest(request) {
  const url = new URL(request.url);
  if (url.origin.includes("api.sattvah.ai")) return true;
  if (url.pathname.startsWith("/api/")) return true;
  if (url.pathname.startsWith("/oauth2/")) return true;
  return false;
}

function isChromeAsset(request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    // Cross-origin font + image CDNs (e.g. fonts.gstatic.com) are
    // chrome too.
    if (url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com")) {
      return true;
    }
    return false;
  }
  const dest = request.destination;
  return (
    dest === "document" ||
    dest === "script" ||
    dest === "style" ||
    dest === "font" ||
    dest === "image" ||
    dest === "manifest"
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;
  if (isApiRequest(request)) return; // network-only, untouched.
  if (!isChromeAsset(request)) return; // let the browser handle it.

  // Stale while revalidate. Serve cache instantly, refresh in background.
  event.respondWith(
    caches.open(CHROME_CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      const network = fetch(request)
        .then((res) => {
          // Only cache successful, basic/cors responses; never opaque
          // redirects or error pages.
          if (res && res.ok && (res.type === "basic" || res.type === "cors")) {
            cache.put(request, res.clone()).catch(() => undefined);
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
