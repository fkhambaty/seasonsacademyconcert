/* Saves the show on this phone. A normal open uses the saved copy.
   A hard refresh asks the internet again. Song videos save only after the passcode. */
const CACHE = "seasons-show-v8";
const SHELL = [
  "./",
  "./index.html",
  "./led.css?v=24",
  "./lights.css?v=3",
  "./opening.js?v=4",
  "./led.js?v=30",
  "./lights.js?v=5",
  "./logo.png",
  "./logo-mark.svg",
  "./logo-mark.png",
  "./led-goa-coast.jpg",
  "./seasons/summer.jpg",
  "./seasons/monsoon.jpg",
  "./seasons/autumn.jpg",
  "./seasons/winter.jpg"
];
const MEDIA = [
  "./loops/opening.mp3",
  "./loops/credits-goodbye.mp3",
  "./loops/tauba-colors.mp4",
  "./loops/bharat-hills.mp4",
  "./loops/red-lights-tunnel.mp4",
  "./loops/oldwoman-sun.mp4",
  "./loops/purple-warp.mp4",
  "./loops/champions-fireworks.mp4",
  "./loops/yaman-gold.mp4",
  "./loops/flute-creek.mp4",
  "./loops/saiyaara-love.mp4",
  "./loops/gminute-aurora.mp4",
  "./loops/ghar-sunset.mp4",
  "./loops/challa-highway.mp4",
  "./loops/chammak-sparkle.mp4",
  "./loops/eye-sparks.mp4",
  "./loops/dil-sunset.mp4",
  "./loops/howlong-city.mp4",
  "./loops/final-sky.mp4",
  "./loops/haseena-gold.mp4",
  "./loops/ajeeb-stars.mp4",
  "./loops/felicitation-stars.mp4",
  "./loops/thanks-sunset.mp4",
  "./loops/indian-flag.mp4",
  "./sponsors/snug-film.mp4",
  "./loops/launch-dance-wellness.mp4",
  "./loops/bloopers.mp4",
  "./sponsors/snug-landscape.jpg",
  "./sponsors/snug-portrait.jpg",
  "./sponsors/partner-sonal-hd.jpg",
  "./sponsors/partner-bodh-hd.jpg",
  "./sponsors/partner-aahaar-hd.jpg",
  "./teachers/sourudra-samai.jpg",
  "./teachers/harland-braver.jpg",
  "./teachers/nicholas-umrethi.jpg",
  "./teachers/ashish-mehrotra.jpg",
  "./teachers/bhoomi-shah.jpg",
  "./teachers/vinay-rao.jpg",
  "./teachers/joseph-sunil-kumar.jpg",
  "./teachers/sabastian-moktan.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener("message", event => {
  const type = event.data && event.data.type;
  if (type === "shell") event.waitUntil(refreshShell());
  else if (type === "media") event.waitUntil(cacheMedia());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/sw.js")) return;
  if (request.headers.has("range")) {
    event.respondWith(rangeOrNetwork(request));
    return;
  }
  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) await store(cache, request, response);
    return response;
  } catch (error) {
    if (request.mode === "navigate") return (await cache.match("./index.html")) || (await cache.match("./")) || new Response("This phone does not have the show saved yet.", {status: 503, headers: {"Content-Type": "text/plain;charset=utf-8"}});
    return Response.error();
  }
}

async function rangeOrNetwork(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request.url);
  if (cached) return sliceRange(cached, request);
  return fetch(request);
}

async function sliceRange(cached, request) {
  const blob = await cached.blob();
  const size = blob.size;
  const header = request.headers.get("range") || "";
  const match = /bytes=(\d+)-(\d*)/.exec(header);
  if (!match || !size) return cached;
  const start = Number(match[1]);
  let end = match[2] ? Number(match[2]) : size - 1;
  if (start >= size) return new Response(null, {status: 416, headers: {"Content-Range": `bytes */${size}`}});
  end = Math.min(end, size - 1);
  const type = cached.headers.get("Content-Type") || (request.url.endsWith(".mp3") ? "audio/mpeg" : "video/mp4");
  return new Response(blob.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": type,
      "Content-Length": String(end - start + 1),
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes"
    }
  });
}

async function store(cache, key, response) {
  const blob = await response.clone().blob();
  if (!blob.size) return;
  const headers = new Headers(response.headers);
  headers.set("Content-Length", String(blob.size));
  await cache.put(key, new Response(blob, {status: 200, statusText: "OK", headers}));
}

async function broadcast(message) {
  const pages = await self.clients.matchAll({includeUncontrolled: true, type: "window"});
  pages.forEach(page => page.postMessage(message));
}

let shellJob = null;
function refreshShell() {
  if (shellJob) return shellJob;
  shellJob = saveShell().finally(() => {
    shellJob = null;
  });
  return shellJob;
}

async function saveShell() {
  const cache = await caches.open(CACHE);
  try {
    const fresh = [];
    for (const url of SHELL) {
      const response = await fetch(url, {cache: "no-store"});
      if (!response.ok) throw new Error(url);
      fresh.push({url, response});
    }
    for (const item of fresh) await store(cache, item.url, item.response);
  } catch (error) {
    if (!(await cache.match("./index.html"))) return;
  }
  await broadcast({kind: "shell", ready: true});
}

let mediaJob = null;
function cacheMedia() {
  if (mediaJob) return mediaJob;
  mediaJob = (async () => {
    const cache = await caches.open(CACHE);
    let done = 0;
    let failed = 0;
    for (const url of MEDIA) {
      const hit = await cache.match(url);
      if (!hit) {
        try {
          const response = await fetch(url, {cache: "no-store"});
          if (!response.ok) throw new Error(String(response.status));
          const blob = await response.blob();
          if (blob.size < 1000) throw new Error("short");
          const headers = new Headers(response.headers);
          headers.set("Content-Length", String(blob.size));
          await cache.put(url, new Response(blob, {status: 200, statusText: "OK", headers}));
        } catch (error) {
          failed += 1;
        }
      }
      done += 1;
      await broadcast({kind: "media", done, total: MEDIA.length, failed, ready: done === MEDIA.length && failed === 0});
    }
    mediaJob = null;
  })();
  return mediaJob;
}
