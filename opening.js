/* Studio opening. Picture time follows loops/opening.mp3.
   Hits: quarters meet 7.25s, globe locks 12.75s, name 18.5s,
   Musicale 24.25s, Annual Music Concert 30.75s. Then it holds. */
(() => {
  const MEET = 7.25;
  const GLOBE = 12.75;
  const NAME = 18.5;
  const MUSICALE = 24.25;
  const ANNUAL = 30.75;
  const HOLD = 32.2;
  const SPIN = 0.22;

  const SEASONS = [
    {name: "Summer", src: "seasons/summer.jpg", start: 0.35},
    {name: "Monsoon", src: "seasons/monsoon.jpg", start: 0.7},
    {name: "Autumn", src: "seasons/autumn.jpg", start: 1.05},
    {name: "Winter", src: "seasons/winter.jpg", start: 1.4}
  ];

  let root, skyCanvas, skyCtx, globeCanvas, globeCtx, audio, raf = 0;
  let quarters, halo, word, rule, musicale, annual, photos;
  let locked = false, lastT = 0, lockAngle = 0, lockStamp = 0;
  let preview = null;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const span = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const easeOut = p => 1 - Math.pow(1 - p, 3);
  const easeInOut = p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
  const rnd = n => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  function fitCanvas(canvas, context) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(2, Math.round(rect.width * dpr));
    canvas.height = Math.max(2, Math.round(rect.height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
  }

  function fit() {
    if (skyCanvas) fitCanvas(skyCanvas, skyCtx);
    if (globeCanvas) fitCanvas(globeCanvas, globeCtx);
  }

  function onResize() {
    fit();
    paint();
  }

  function clock() {
    if (preview != null) {
      return {t: preview, angle: Math.max(0, preview - GLOBE) * SPIN};
    }
    if (locked) {
      return {t: HOLD, angle: lockAngle + (performance.now() - lockStamp) / 1000 * SPIN};
    }
    if (!audio || audio.paused) return {t: 0, angle: 0};
    const t = audio.currentTime || 0;
    if (t + 0.45 < lastT && lastT > 8) {
      locked = true;
      lockAngle = Math.max(0, lastT - GLOBE) * SPIN;
      lockStamp = performance.now();
      return {t: HOLD, angle: lockAngle};
    }
    lastT = t;
    return {t, angle: Math.max(0, t - GLOBE) * SPIN};
  }

  function land(t, hit) {
    const shown = easeOut(span(t, hit - 0.85, hit));
    const settle = span(t, hit, hit + 0.4);
    const scale = shown === 0 ? 0.92 : 0.92 + shown * 0.12 - settle * 0.04;
    return {opacity: shown, y: (1 - shown) * 16, scale};
  }

  function drawSky(c, w, h, t) {
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#070814");
    sky.addColorStop(0.55, "#121624");
    sky.addColorStop(1, "#1a120c");
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#fff";
    for (let i = 0; i < 46; i++) {
      c.globalAlpha = 0.12 + rnd(i + 3) * 0.45;
      c.fillRect(rnd(i + 1) * w, rnd(i + 2) * h * 0.62, 1.6, 1.6);
    }
    c.globalAlpha = 1;
    const glow = 0.04 + span(t, MEET, GLOBE) * 0.18;
    const rad = c.createRadialGradient(w / 2, h * 0.42, 20, w / 2, h * 0.42, Math.min(w, h) * 0.62);
    rad.addColorStop(0, `rgba(243,212,138,${glow})`);
    rad.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = rad;
    c.fillRect(0, 0, w, h);
  }

  function placeQuarters(t) {
    const fade = 1 - easeOut(span(t, MEET, MEET + 1.7));
    const swell = 1 + easeOut(span(t, MEET, MEET + 1.7)) * 0.14;
    quarters.forEach(el => {
      const season = SEASONS.find(item => el.classList.contains(item.name.toLowerCase()));
      const grow = easeInOut(span(t, season.start, MEET));
      const scale = 0.05 + grow * 0.95;
      el.style.opacity = String(Math.min(1, grow * 2.6) * fade);
      el.style.transform = `scale(${scale * swell})`;
    });
  }

  function drawCover(c, img, x, y, w, h) {
    const ir = img.naturalWidth / img.naturalHeight;
    const box = w / Math.max(h, 1);
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (ir > box) {
      sw = sh * box;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = sw / box;
      sy = (img.naturalHeight - sh) / 2;
    }
    c.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  function globeMetrics(w, h) {
    const wrap = root.querySelector(".opening-crest-wrap").getBoundingClientRect();
    const titles = root.querySelector(".opening-titles").getBoundingClientRect();
    const box = globeCanvas.getBoundingClientRect();
    const cx = wrap.left + wrap.width / 2 - box.left;
    const cy = wrap.top + wrap.height / 2 - box.top;
    const room = titles.top - box.top - cy - 36;
    const r = Math.max(80, Math.min(Math.max(wrap.width, wrap.height) * 0.82, room, cx - 36, w - cx - 36));
    return {cx, cy, r};
  }

  function photosReady() {
    return photos?.every(img => img.complete && img.naturalWidth);
  }

  function drawGlobe(c, w, h, t, angle) {
    c.clearRect(0, 0, w, h);
    const appear = easeOut(span(t, MEET, GLOBE));
    if (appear <= 0.01 || !photosReady()) return;
    const {cx, cy, r} = globeMetrics(w, h);
    const pop = span(t, GLOBE, GLOBE + 0.55);
    const scale = appear * 1.05 - pop * 0.05 * appear;
    c.save();
    c.translate(cx, cy);
    c.scale(scale, scale);
    c.translate(-cx, -cy);
    c.globalAlpha = appear;
    const glow = c.createRadialGradient(cx, cy, r * 0.72, cx, cy, r * 1.45);
    glow.addColorStop(0, "rgba(243,212,138,.28)");
    glow.addColorStop(1, "rgba(243,212,138,0)");
    c.fillStyle = glow;
    c.beginPath();
    c.arc(cx, cy, r * 1.45, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.clip();
    const cards = photos.map((img, index) => {
      const lon = angle + index * (Math.PI / 2) - Math.PI / 4;
      return {img, lon, depth: Math.cos(lon)};
    }).sort((a, b) => a.depth - b.depth);
    cards.forEach(card => {
      if (card.depth < 0.05) return;
      const width = r * 1.72 * card.depth;
      const x = cx + Math.sin(card.lon) * r * 0.78;
      c.save();
      c.beginPath();
      c.rect(x - width / 2, cy - r, width, r * 2);
      c.clip();
      drawCover(c, card.img, x - width / 2, cy - r, width, r * 2);
      c.restore();
    });
    c.globalCompositeOperation = "multiply";
    const shade = c.createRadialGradient(cx - r * 0.32, cy - r * 0.36, r * 0.08, cx, cy, r * 1.05);
    shade.addColorStop(0, "#ffffff");
    shade.addColorStop(0.5, "#cfcfcf");
    shade.addColorStop(1, "#242424");
    c.fillStyle = shade;
    c.fillRect(cx - r, cy - r, r * 2, r * 2);
    c.globalCompositeOperation = "screen";
    const spec = c.createRadialGradient(cx - r * 0.28, cy - r * 0.32, 0, cx - r * 0.28, cy - r * 0.32, r * 0.45);
    spec.addColorStop(0, "rgba(255,255,255,.35)");
    spec.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = spec;
    c.fillRect(cx - r, cy - r, r * 2, r * 2);
    c.restore();
    c.save();
    c.globalAlpha = appear;
    c.translate(cx, cy);
    c.scale(scale, scale);
    c.translate(-cx, -cy);
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.strokeStyle = "rgba(243,212,138,.75)";
    c.lineWidth = 2.5;
    c.stroke();
    c.globalAlpha = appear * 0.28;
    c.fillStyle = "#000";
    c.beginPath();
    c.ellipse(cx, cy + r + 16, r * 0.62, r * 0.07, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  function drawFlash(c, w, h, t, hit) {
    const d = t - hit;
    if (d < 0 || d > 0.42) return;
    const alpha = Math.sin((d / 0.42) * Math.PI) * 0.28;
    const g = c.createRadialGradient(w / 2, h * 0.42, 10, w / 2, h * 0.42, Math.min(w, h) * 0.48);
    g.addColorStop(0, `rgba(255,236,190,${alpha})`);
    g.addColorStop(1, "rgba(255,236,190,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  }

  function vignette(c, w, h) {
    const g = c.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.28, w / 2, h * 0.5, Math.max(w, h) * 0.72);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,.5)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  }

  function applyType(t) {
    const name = land(t, NAME);
    halo.style.opacity = name.opacity;
    halo.style.transform = `scale(${name.scale})`;
    word.style.opacity = name.opacity;
    word.style.transform = `translateY(${name.y}px)`;
    rule.style.transform = `scaleX(${name.opacity})`;
    const show = land(t, MUSICALE);
    musicale.style.opacity = show.opacity;
    musicale.style.transform = `translateY(${show.y}px) scale(${show.scale})`;
    const concert = land(t, ANNUAL);
    annual.style.opacity = concert.opacity;
    annual.style.transform = `translateY(${concert.y}px)`;
  }

  function paint() {
    if (!skyCtx || !root) return;
    const w = skyCanvas.clientWidth;
    const h = skyCanvas.clientHeight;
    if (w < 2 || h < 2) return;
    const {t, angle} = clock();
    const shown = Math.min(t, HOLD);
    drawSky(skyCtx, w, h, shown);
    placeQuarters(shown);
    drawGlobe(globeCtx, w, h, shown, angle);
    [MEET, GLOBE, NAME, MUSICALE, ANNUAL].forEach(hit => drawFlash(globeCtx, w, h, shown, hit));
    vignette(globeCtx, w, h);
    applyType(shown);
  }

  function tick() {
    raf = requestAnimationFrame(tick);
    paint();
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    window.removeEventListener("resize", onResize);
    root = null;
    audio = null;
    locked = false;
    lastT = 0;
    preview = null;
  }

  function mount(host) {
    stop();
    if (!host) return;
    root = host;
    skyCanvas = host.querySelector(".opening-sky");
    globeCanvas = host.querySelector(".opening-globe");
    skyCtx = skyCanvas.getContext("2d", {alpha: false});
    globeCtx = globeCanvas.getContext("2d", {alpha: true});
    quarters = [...host.querySelectorAll(".season-quarter")];
    halo = host.querySelector(".opening-halo");
    word = host.querySelector(".opening-wordmark");
    rule = host.querySelector(".opening-rule");
    musicale = host.querySelector(".opening-musicale");
    annual = host.querySelector(".opening-annual");
    if (!photos) {
      photos = SEASONS.map(season => {
        const img = new Image();
        img.src = season.src;
        img.onload = () => paint();
        return img;
      });
    }
    fit();
    window.addEventListener("resize", onResize);
    paint();
  }

  function attach(element) {
    if (!root || !element) return;
    audio = element;
    locked = false;
    lastT = 0;
    lockAngle = 0;
    preview = null;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function previewAt(seconds) {
    if (!root) return;
    preview = seconds;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    paint();
  }

  window.SeasonsOpening = {mount, stop, attach, preview: previewAt};
})();
