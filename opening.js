/* Studio opening. Picture time follows loops/opening.mp3.
   Hits: seasons meet 7.25s, globe locks 12.75s, name 18.5s,
   Musicale 24.25s, Annual Music Concert 30.75s. Then it holds. */
(() => {
  const MEET = 7.25;
  const GLOBE = 12.75;
  const NAME = 18.5;
  const MUSICALE = 24.25;
  const ANNUAL = 30.75;
  const HOLD = 32.2;
  const SPIN = 0.22;

  const seasons = [
    {name: "Summer", side: "left", delay: 0, slice: 0},
    {name: "Monsoon", side: "top", delay: 0.55, slice: 1},
    {name: "Autumn", side: "right", delay: 1.05, slice: 2},
    {name: "Winter", side: "bottom", delay: 1.5, slice: 3}
  ];

  let root, canvas, ctx, tex, audio, raf = 0;
  let halo, word, rule, musicale, annual;
  let locked = false, lastT = 0, lockAngle = 0, lockStamp = 0;
  let preview = null;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const span = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const easeOut = p => 1 - Math.pow(1 - p, 3);
  const rnd = n => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  function paintSummer(c) {
    const w = 512, h = 512;
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#163e86");
    sky.addColorStop(0.42, "#ef9a4a");
    sky.addColorStop(0.58, "#f6d98a");
    sky.addColorStop(1, "#e0a03a");
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h);
    const sun = c.createRadialGradient(w * 0.7, h * 0.36, 8, w * 0.7, h * 0.36, 150);
    sun.addColorStop(0, "#fff7d2");
    sun.addColorStop(0.35, "#ffd56a");
    sun.addColorStop(1, "rgba(255,180,70,0)");
    c.fillStyle = sun;
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#fff4c2";
    c.beginPath();
    c.arc(w * 0.7, h * 0.36, 34, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#c9842e";
    c.beginPath();
    c.moveTo(0, h * 0.7);
    c.quadraticCurveTo(140, h * 0.5, 280, h * 0.68);
    c.quadraticCurveTo(400, h * 0.84, w, h * 0.58);
    c.lineTo(w, h);
    c.lineTo(0, h);
    c.fill();
    c.fillStyle = "#a86a22";
    c.beginPath();
    c.moveTo(0, h * 0.82);
    c.quadraticCurveTo(180, h * 0.7, w, h * 0.86);
    c.lineTo(w, h);
    c.lineTo(0, h);
    c.fill();
    c.strokeStyle = "#f8e7a8";
    c.lineWidth = 1.6;
    for (let i = 0; i < 48; i++) {
      const x = rnd(i) * w;
      const y = h * 0.78 + rnd(i + 9) * h * 0.18;
      c.beginPath();
      c.moveTo(x, y);
      c.quadraticCurveTo(x + 8, y - 16, x - 3, y - 30);
      c.stroke();
    }
  }

  function paintMonsoon(c) {
    const w = 512, h = 512;
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#121826");
    sky.addColorStop(0.46, "#3c5164");
    sky.addColorStop(0.62, "#6d8ea0");
    sky.addColorStop(1, "#1d3a32");
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h);
    c.fillStyle = "rgba(220,230,236,.35)";
    for (let i = 0; i < 7; i++) {
      const x = rnd(i + 20) * w;
      const y = 40 + rnd(i + 30) * 180;
      c.beginPath();
      c.ellipse(x, y, 70 + rnd(i) * 50, 22, 0, 0, Math.PI * 2);
      c.fill();
    }
    c.strokeStyle = "rgba(210,230,255,.55)";
    c.lineWidth = 1.4;
    for (let i = 0; i < 70; i++) {
      const x = rnd(i + 40) * w;
      const y = rnd(i + 80) * h * 0.7;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x - 8, y + 18);
      c.stroke();
    }
    c.strokeStyle = "rgba(255,244,180,.85)";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(180, 70);
    c.lineTo(150, 140);
    c.lineTo(190, 140);
    c.lineTo(160, 210);
    c.stroke();
    c.fillStyle = "#16352d";
    c.fillRect(0, h * 0.72, w, h * 0.28);
    c.fillStyle = "#0e2428";
    c.fillRect(0, h * 0.84, w, h * 0.16);
  }

  function paintAutumn(c) {
    const w = 512, h = 512;
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#6a2a3a");
    sky.addColorStop(0.4, "#e07a3a");
    sky.addColorStop(0.62, "#f2c16a");
    sky.addColorStop(1, "#8a3a16");
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h);
    const colors = ["#8d2e14", "#c4521a", "#e28a22", "#f0d090"];
    for (let i = 0; i < 9; i++) {
      const x = 20 + i * 56;
      c.fillStyle = "#4a2a18";
      c.fillRect(x + 16, h * 0.58, 8, h * 0.28);
      c.fillStyle = colors[i % colors.length];
      c.beginPath();
      c.arc(x + 20, h * 0.52, 28 + rnd(i + 2) * 16, 0, Math.PI * 2);
      c.fill();
    }
    c.fillStyle = "#6a3014";
    c.fillRect(0, h * 0.78, w, h * 0.22);
    for (let i = 0; i < 36; i++) {
      c.fillStyle = colors[i % 4];
      c.beginPath();
      c.ellipse(rnd(i + 100) * w, rnd(i + 140) * h, 5, 3, rnd(i) * 3, 0, Math.PI * 2);
      c.fill();
    }
  }

  function paintWinter(c) {
    const w = 512, h = 512;
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#8eacc4");
    sky.addColorStop(0.42, "#e7eef5");
    sky.addColorStop(0.55, "#f7fbff");
    sky.addColorStop(1, "#d5e3ee");
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#f4f8fb";
    c.beginPath();
    c.moveTo(0, h * 0.72);
    c.lineTo(80, h * 0.4);
    c.lineTo(160, h * 0.66);
    c.lineTo(250, h * 0.32);
    c.lineTo(340, h * 0.64);
    c.lineTo(430, h * 0.38);
    c.lineTo(w, h * 0.66);
    c.lineTo(w, h);
    c.lineTo(0, h);
    c.fill();
    c.fillStyle = "#c5d7e6";
    c.beginPath();
    c.moveTo(40, h);
    c.lineTo(120, h * 0.58);
    c.lineTo(200, h);
    c.fill();
    c.fillStyle = "rgba(255,255,255,.85)";
    for (let i = 0; i < 60; i++) {
      c.beginPath();
      c.arc(rnd(i + 200) * w, rnd(i + 260) * h, 1.2 + rnd(i) * 1.8, 0, Math.PI * 2);
      c.fill();
    }
  }

  function buildTexture() {
    const board = document.createElement("canvas");
    board.width = 2048;
    board.height = 512;
    const c = board.getContext("2d");
    [paintSummer, paintMonsoon, paintAutumn, paintWinter].forEach((paint, index) => {
      c.save();
      c.translate(index * 512, 0);
      paint(c);
      c.restore();
    });
    return board;
  }

  function fit() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(2, Math.round(rect.width * dpr));
    canvas.height = Math.max(2, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
    const glow = 0.04 + span(t, MEET, GLOBE) * 0.16;
    const rad = c.createRadialGradient(w / 2, h * 0.42, 20, w / 2, h * 0.42, Math.min(w, h) * 0.62);
    rad.addColorStop(0, `rgba(243,212,138,${glow})`);
    rad.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = rad;
    c.fillRect(0, 0, w, h);
  }

  function panelBox(side, t, start, w, h, size) {
    const cx = w / 2;
    const cy = h * 0.42;
    const park = {
      left: [cx - size * 1.05, cy - size * 0.3],
      right: [cx + size * 0.05, cy - size * 0.3],
      top: [cx - size * 0.5, cy - size * 0.95],
      bottom: [cx - size * 0.5, cy + size * 0.18]
    }[side];
    const from = {
      left: [-size * 1.08, park[1]],
      right: [w + size * 0.08, park[1]],
      top: [park[0], -size * 0.95],
      bottom: [park[0], h + size * 0.08]
    }[side];
    const travel = span(t, start, MEET - 0.9);
    const fuse = easeOut(span(t, MEET - 0.9, MEET));
    const x = from[0] + (park[0] - from[0]) * travel;
    const y = from[1] + (park[1] - from[1]) * travel;
    const meetX = cx - size / 2;
    const meetY = cy - size * 0.3;
    return [x + (meetX - x) * fuse * 0.62, y + (meetY - y) * fuse * 0.62, 1 - fuse * 0.22];
  }

  function drawFlight(c, w, h, t) {
    const fade = 1 - easeOut(span(t, MEET, MEET + 1.35));
    if (fade <= 0.01) return;
    const size = Math.min(w, h) * 0.34;
    seasons.forEach(season => {
      const start = 0.7 + season.delay;
      const p = span(t, start, MEET);
      if (p <= 0) return;
      const [x, y, scale] = panelBox(season.side, t, start, w, h, size);
      const dw = size * scale;
      const dh = size * 0.7 * scale;
      c.save();
      c.globalAlpha = fade * Math.min(1, 0.2 + p * 1.3);
      roundClip(c, x, y, dw, dh, 18);
      c.drawImage(tex, season.slice * 512, 0, 512, 512, x, y, dw, dh);
      const shade = c.createLinearGradient(x, y, x, y + dh);
      shade.addColorStop(0, "rgba(0,0,0,.12)");
      shade.addColorStop(0.55, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(0,0,0,.4)");
      c.fillStyle = shade;
      c.fillRect(x, y, dw, dh);
      drawWeather(c, season, x, y, dw, t);
      c.fillStyle = "#fff8ee";
      c.font = `700 ${Math.max(13, dw * 0.07)}px "DM Sans", sans-serif`;
      c.textAlign = "center";
      c.fillText(season.name.toUpperCase(), x + dw / 2, y + dh * 0.88);
      c.restore();
    });
  }

  function roundClip(c, x, y, w, h, radius) {
    c.beginPath();
    c.moveTo(x + radius, y);
    c.arcTo(x + w, y, x + w, y + h, radius);
    c.arcTo(x + w, y + h, x, y + h, radius);
    c.arcTo(x, y + h, x, y, radius);
    c.arcTo(x, y, x + w, y, radius);
    c.closePath();
    c.clip();
  }

  function drawWeather(c, season, x, y, size, t) {
    const h = size * 0.7;
    if (season.name === "Monsoon") {
      c.strokeStyle = "rgba(230,242,255,.7)";
      c.lineWidth = 1.2;
      for (let i = 0; i < 18; i++) {
        const px = x + rnd(i + 4) * size;
        const py = y + ((rnd(i + 8) * h + t * 90) % h);
        c.beginPath();
        c.moveTo(px, py);
        c.lineTo(px - 6, py + 14);
        c.stroke();
      }
    } else if (season.name === "Winter") {
      const flake = c.globalAlpha;
      c.fillStyle = "#fff";
      for (let i = 0; i < 16; i++) {
        const px = x + rnd(i + 12) * size;
        const py = y + ((rnd(i + 16) * h + t * 28) % h);
        c.globalAlpha = flake * 0.85;
        c.beginPath();
        c.arc(px, py, 1.6, 0, Math.PI * 2);
        c.fill();
      }
      c.globalAlpha = flake;
    } else if (season.name === "Autumn") {
      const colors = ["#f0d090", "#e28a22", "#c4521a"];
      for (let i = 0; i < 10; i++) {
        c.fillStyle = colors[i % 3];
        const px = x + ((rnd(i + 30) * size + t * 18) % size);
        const py = y + ((rnd(i + 50) * h + t * 36) % h);
        c.beginPath();
        c.ellipse(px, py, 5, 3, t + i, 0, Math.PI * 2);
        c.fill();
      }
    }
  }

  function globeMetrics(w, h) {
    const wrap = root.querySelector(".opening-crest-wrap").getBoundingClientRect();
    const titles = root.querySelector(".opening-titles").getBoundingClientRect();
    const box = canvas.getBoundingClientRect();
    const cx = wrap.left + wrap.width / 2 - box.left;
    const cy = wrap.top + wrap.height / 2 - box.top;
    const room = titles.top - box.top - cy - 36;
    const r = Math.max(80, Math.min(Math.max(wrap.width, wrap.height) * 0.78, room, cx - 36, w - cx - 36));
    return {cx, cy, r};
  }

  function drawGlobe(c, w, h, t, angle) {
    const appear = easeOut(span(t, MEET, GLOBE));
    if (appear <= 0.01) return;
    const {cx, cy, r} = globeMetrics(w, h);
    const pop = span(t, GLOBE, GLOBE + 0.55);
    const scale = appear * 1.05 - pop * 0.05 * appear;
    c.save();
    c.translate(cx, cy);
    c.scale(scale, scale);
    c.translate(-cx, -cy);
    c.globalAlpha = appear;
    const glow = c.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.45);
    glow.addColorStop(0, "rgba(243,212,138,.22)");
    glow.addColorStop(1, "rgba(243,212,138,0)");
    c.fillStyle = glow;
    c.beginPath();
    c.arc(cx, cy, r * 1.45, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.clip();
    const columns = Math.max(80, Math.ceil(r * 2));
    for (let i = 0; i < columns; i++) {
      const x = cx - r + (i * r * 2) / columns;
      const nx = clamp(((x + r / columns) - cx) / r, -0.999, 0.999);
      const half = Math.sqrt(1 - nx * nx) * r;
      const lon = Math.asin(nx) + angle;
      let u = 256 + (lon / (Math.PI * 2)) * tex.width;
      u = ((u % tex.width) + tex.width) % tex.width;
      const sw = Math.max(1, Math.min(8, tex.width - u));
      c.drawImage(tex, u, 0, sw, tex.height, x, cy - half, (r * 2) / columns + 0.8, half * 2);
    }
    c.globalCompositeOperation = "multiply";
    const shade = c.createRadialGradient(cx - r * 0.32, cy - r * 0.36, r * 0.08, cx, cy, r * 1.05);
    shade.addColorStop(0, "#ffffff");
    shade.addColorStop(0.45, "#d5d5d5");
    shade.addColorStop(1, "#2c2c2c");
    c.fillStyle = shade;
    c.fillRect(cx - r, cy - r, r * 2, r * 2);
    c.globalCompositeOperation = "screen";
    const spec = c.createRadialGradient(cx - r * 0.28, cy - r * 0.32, 0, cx - r * 0.28, cy - r * 0.32, r * 0.42);
    spec.addColorStop(0, "rgba(255,255,255,.4)");
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
    c.strokeStyle = "rgba(243,212,138,.7)";
    c.lineWidth = 2;
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
    const g = c.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.3, w / 2, h * 0.5, Math.max(w, h) * 0.72);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,.55)");
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
    if (!ctx || !root) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 2 || h < 2) return;
    const {t, angle} = clock();
    const shown = Math.min(t, HOLD);
    drawSky(ctx, w, h, shown);
    drawFlight(ctx, w, h, shown);
    drawGlobe(ctx, w, h, shown, angle);
    [MEET, GLOBE, NAME, MUSICALE, ANNUAL].forEach(hit => drawFlash(ctx, w, h, shown, hit));
    vignette(ctx, w, h);
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
    canvas = host.querySelector(".opening-sky");
    ctx = canvas.getContext("2d", {alpha: false});
    halo = host.querySelector(".opening-halo");
    word = host.querySelector(".opening-wordmark");
    rule = host.querySelector(".opening-rule");
    musicale = host.querySelector(".opening-musicale");
    annual = host.querySelector(".opening-annual");
    tex ||= buildTexture();
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
