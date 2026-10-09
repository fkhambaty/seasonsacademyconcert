const LIGHTS_STATE_KEY = "seasons-lights-tiger-v1";

const RIG = [
  { s: 1, kind: "par" }, { s: 2, kind: "par" }, { s: 3, kind: "par" }, { s: 4, kind: "par" },
  { s: 5, kind: "par" }, { s: 6, kind: "par" }, { s: 7, kind: "par" }, { s: 8, kind: "par" },
  { s: 9, kind: "mover" }, { s: 10, kind: "mover" }, { s: 11, kind: "par" }, { s: 12, kind: "par" }
];

const WHEEL = {
  White: [0, "#ffffff"], Red: [16, "#ff3030"], Amber: [32, "#ffa63a"], Yellow: [48, "#ffe14a"],
  Green: [64, "#33d46f"], Cyan: [80, "#35e3f2"], Blue: [96, "#3a6bff"], Magenta: [112, "#ff45b8"], Lavender: [128, "#bba6ff"]
};
const GOBO = { Open: 0, Dots: 24, Star: 48, Breakup: 72 };

const pct = value => Math.round(value * 2.55);
const hexRgb = hex => { const n = parseInt(hex.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };

function P(scanners, dim, hex, white = 0) {
  const [r, g, b] = hexRgb(hex);
  return { kind: "par", scanners, values: [pct(dim), r, g, b, pct(white), 0] };
}
function M(scanners, pan, tilt, colour, gobo, dim) {
  return { kind: "mover", scanners, colour, gobo, values: [pan, tilt, WHEEL[colour][0], GOBO[gobo], pct(dim), 255] };
}
function FAN(pan, tilt, colour, gobo, dim) {
  return [M([9], pan, tilt, colour, gobo, dim), M([10], 255 - pan, tilt, colour, gobo, dim)];
}

const FULL = 100, HALF = 50, OFF = 0;

const FADERS = [
  { n: 1, name: "HOSTS", swatch: ["#ffcf8f"],
    plain: "Warm light on the front edge of the stage, where FK and Upasana stand to talk.",
    tech: "Profiles 1–4, open white, 70%. Two focused on the front-left edge, two on the front-right edge, so the hosts are lit even when the curtain is closed behind them.",
    groups: l => [P([3, 4], l, "#ffcf8f", 90)] },
  { n: 2, name: "FACES", swatch: ["#fff1d6"],
    plain: "Clean white light over the whole stage, so every child’s face can be seen and photographed.",
    tech: "All White Pars, 100%. Even white over the full stage depth.",
    groups: l => [P([1, 2], l, "#ffd6a6", 70), P([12], l * .6, "#ffffff", 80)] },
  { n: 3, name: "PARTY PINK", colour: true, swatch: ["#e0218a", "#00c8d8"],
    plain: "Hot pink from behind, bright blue from above. A dance party.",
    tech: "Wing Pars magenta, Col Pars cyan, both 100%.",
    groups: l => [P([5, 6], l * .9, "#e0218a"), P([7, 8], l * .8, "#00c8d8")] },
  { n: 4, name: "TRICOLOUR", colour: true, swatch: ["#ff8a1a", "#ffffff", "#138808"],
    plain: "Saffron on the left, green on the right, white from above. Proud and calm.",
    tech: "Wing Pars: left half saffron, right half green. Col Pars white. All 100%.",
    groups: l => [P([5], l * .9, "#ff8a1a"), P([6], l * .9, "#138808"), P([7, 8], l * .55, "#ffffff", 60)] },
  { n: 5, name: "FIRE", colour: true, swatch: ["#c1121f", "#ff8c00"],
    plain: "Red from behind, orange from above. Like a big fire.",
    tech: "Wing Pars red, Col Pars orange, both 100%.",
    groups: l => [P([5, 6], l, "#c1121f"), P([7, 8], l, "#ff8c00")] },
  { n: 6, name: "BLUE & GOLD", colour: true, swatch: ["#1f4fd1", "#f4c430"],
    plain: "Royal blue from behind, gold from above. A stadium on a big night.",
    tech: "Wing Pars royal blue, Col Pars gold (deep amber-yellow), both 100%.",
    groups: l => [P([5, 6], l * .9, "#1f4fd1"), P([7, 8], l * .7, "#f4c430")] },
  { n: 7, name: "SUNSHINE", colour: true, swatch: ["#e0892f", "#ffd23f"],
    plain: "Warm amber from behind, sunny yellow from above. A happy, sunny day.",
    tech: "Wing Pars amber, Col Pars warm yellow, both 100%.",
    groups: l => [P([5, 6], l * .8, "#e0892f"), P([7, 8], l * .65, "#ffd23f")] },
  { n: 8, name: "MOONLIGHT", colour: true, swatch: ["#6a3fb5", "#4e7fd6"],
    plain: "Purple from behind, cool blue from above. A quiet night sky.",
    tech: "Wing Pars violet, Col Pars soft blue, both 100%.",
    groups: l => [P([5, 6], l * .85, "#6a3fb5"), P([7, 8], l * .55, "#4e7fd6")] },
  { n: 9, name: "GARDEN", colour: true, swatch: ["#5ad1a4", "#ffe6b3"],
    plain: "Fresh mint green from behind, soft warm white from above. A garden in the morning.",
    tech: "Wing Pars mint green, Col Pars warm white, both 100%.",
    groups: l => [P([5, 6], l * .6, "#5ad1a4"), P([7, 8], l * .5, "#ffe6b3", 60)] },
  { n: 10, name: "BEAMS", swatch: ["#ffffff"],
    plain: "The moving lights on the top bar make white beams that sweep slowly across the stage.",
    tech: "Spots 1–8, open white, no pattern, 80%, slow side-to-side sweep (about one sweep every 8 seconds). Over the stage only, never into the audience’s eyes.",
    groups: l => FAN(70, 200, "White", "Breakup", l * .9) }
];
const faderOf = n => FADERS[n - 1];
const COLOUR_FADERS = FADERS.filter(f => f.colour).map(f => f.n);

const ACTS = [
  { title: "Tauba Tauba, Urvashi Urvashi Mashup", colour: 3, beams: true, look: "dance", shape: "rows", open: true, first: "the first musical note" },
  { title: "Bharat Humko Jaan Se Pyara Hai", colour: 4, look: "tricolor", shape: "line", first: "the first musical note" },
  { title: "Drum Circle", colour: 5, beams: true, look: "drums", shape: "circle", first: "the first drum strike" },
  { title: "Old Woman in a Shoe", colour: 7, look: "story", shape: "rows", first: "the first musical note" },
  { title: "Mission Impossible", colour: 6, beams: true, look: "spy", shape: "rows", first: "the theme begins" },
  { title: "We Are the Champions Mashup", colour: 6, beams: true, look: "stadium", shape: "rows", first: "the first vocal note" },
  { title: "Raag Yaman", colour: 8, look: "raga", shape: "arc", first: "the first flute note" },
  { title: "The Flute Song", colour: 9, look: "flute", shape: "arc", open: true, staysOpen: true, first: "the first musical note" },
  { title: "Saiyaara", colour: 8, beams: true, look: "moon", shape: "rows", first: "the first musical note" },
  { title: "G Minute", colour: 8, look: "strings", shape: "arc", first: "the first violin note" },
  { title: "Ghar More Pardesiya & Moh Moh Ke Dhaage", colour: 7, look: "home", shape: "line", first: "the first vocal note" },
  { title: "Challa — Jab Tak Hai Jaan", colour: 7, beams: true, look: "highway", shape: "rows", first: "the first guitar note" },
  { title: "Chammak Challo Mashup", colour: 5, beams: true, look: "disco", shape: "rows", first: "the first musical note" },
  { title: "Eye of the Tiger, Gehra Hua Mashup", colour: 5, beams: true, look: "tiger", shape: "rows", first: "the first guitar note" },
  { title: "Dil Diya Hai Jaan Bhi Denge — Karma", colour: 4, look: "flag", shape: "line", first: "the first vocal note" },
  { title: "How Long — Charlie Puth", colour: 3, beams: true, look: "neon", shape: "rows", first: "the first drum count" },
  { title: "Final Countdown", colour: 6, beams: true, look: "countdown", shape: "rows", first: "the opening keyboard note" },
  { title: "O Haseena", colour: 7, look: "retro", shape: "line", open: true, first: "the first guitar note" },
  { title: "Ajeeb Daastaan", colour: 8, look: "finale", shape: "arc", first: "the first musical note" }
];

const step = (when, set, people, note = "") => ({ when, set, people, note });

function actMoment(act, index) {
  const colour = faderOf(act.colour);
  const bow = act.staysOpen
    ? "The song ends and the band bows. This time the curtain stays open."
    : "The song ends, the band bows and the curtain starts to close.";
  return {
    label: act.title,
    act: index + 1 + (index >= 9 ? 1 : 0),
    look: act.look,
    shape: act.shape,
    sub: `${colour.name}${act.beams ? " + BEAMS" : ""}`,
    kid: `${colour.plain}${act.beams ? " The white beams sweep over the band." : ""}`,
    steps: [
      step(act.open ? "The LED wall changes to the Names slide. The curtain is already open." : "The curtain starts to open, together with the Names slide on the LED wall.",
        { [act.colour]: FULL }, "band", "Leave HOSTS up. The hosts are still on stage reading the names."),
      step(`Both hosts have walked off and the band plays ${act.first}.`,
        { 1: OFF, 2: FULL, ...(act.beams ? { 10: FULL } : {}) }, "band",
        act.beams ? "This is the main picture for the whole song. Nothing else moves until the bow." : "No beams for this song. Keep it calm. Nothing else moves until the bow."),
      step(bow, { [act.colour]: OFF, 2: OFF, 10: OFF, 1: FULL }, "hosts",
        "Only HOSTS stays up. The hosts walk to the front and talk.")
    ]
  };
}

const MOMENTS = [
  { label: "Doors open", sub: "SUNSHINE at half", look: "welcome",
    kid: "A soft, warm glow so the stage looks ready while people find their seats.",
    steps: [step("The hall doors open and people start walking in.", { 7: HALF }, "none")] },
  { label: "Opening video", sub: "Everything down", look: "opening",
    kid: "The stage goes dark so the opening video on the LED wall is the star.",
    steps: [step("The hall’s audience lights go down and the opening video starts on the LED wall.", { 7: OFF }, "none",
      "Every fader is down now. That is correct.")] },
  { label: "Hosts walk on", sub: "HOSTS", look: "welcome",
    kid: "Two warm circles on FK and Upasana at the front.",
    steps: [step("The stage manager says “Hosts, go.” FK and Upasana walk to the front.", { 1: FULL }, "hosts")] },
  { label: "Sonal’s welcome & the lamp", sub: "FACES + SUNSHINE", look: "diya",
    kid: "White light on the whole stage with a warm golden glow for the lamp lighting.",
    steps: [
      step("The hosts say “Please welcome — Sonal!” and walk off.", { 1: OFF, 2: FULL, 7: HALF }, "speaker"),
      step("Sonal calls the guests up to light the lamp.", {}, "lamp")
    ] },
  { label: "Ice breaker & Snug film", sub: "HOSTS + FACES", look: "welcome",
    kid: "The hosts at the front, and Joseph with his guitar lit behind them.",
    steps: [
      step("Sonal calls the hosts back on stage.", { 1: FULL, 7: OFF }, "hosts", "Leave FACES up. Joseph plays guitar behind the hosts and needs light."),
      step("The Snug Cafe film and the sponsor pictures play on the LED wall.", {}, "hosts")
    ] }
];
ACTS.forEach((act, index) => {
  MOMENTS.push(actMoment(act, index));
  if (act.staysOpen) MOMENTS.push({
    label: "Dance Academy launch film", sub: "Everything down", look: "opening",
    kid: "The stage goes fully dark so the launch film fills the room.",
    steps: [
      step("FK says “Driver sahab — bus rokiye!” and the launch film starts on the LED wall.", { 1: OFF }, "none",
        "Every fader is down now. The stage is dark for 47 seconds."),
      step("The film ends on “Coming Soon”.", { 1: FULL }, "hosts", "The curtain closes now. The hosts talk in front of it.")
    ]
  });
});
MOMENTS.push(
  { label: "Felicitation & vote of thanks", sub: "HOSTS + FACES + SUNSHINE", look: "finale",
    kid: "Bright and warm so every teacher and guest looks good in the photos.",
    steps: [
      step("The hosts call the teachers and guests up for the Felicitation.", { 2: FULL, 7: HALF }, "crowd"),
      step("Joseph steps up for the Vote of Thanks.", {}, "speaker")
    ] },
  { label: "National Anthem", sub: "HOSTS + FACES", look: "tricolor",
    kid: "Plain white light. No colours, nothing moving.",
    steps: [step("The hosts ask everyone to stand for the National Anthem.", { 7: OFF }, "crowd", "No colour during the anthem.")] },
  { label: "Bloopers film", sub: "Everything down", look: "opening",
    kid: "Dark, so the funny bloopers film on the LED wall is all anyone sees.",
    steps: [step("The anthem ends. Two seconds later the bloopers film starts on the LED wall.", { 1: OFF, 2: OFF }, "none",
      "Every fader is down now. That is correct.")] },
  { label: "End credits & goodbye", sub: "FACES + SUNSHINE at half", look: "welcome",
    kid: "Soft warm light so families can find their way out.",
    steps: [step("The bloopers end on “Thank you!!!” and the end credits start.", { 2: HALF, 7: HALF }, "none",
      "Leave these up until the hall is empty. The hall staff bring the audience lights up.")] }
);

(function replaySteps() {
  let state = Array(11).fill(OFF);
  MOMENTS.forEach((moment, index) => {
    moment.n = index + 1;
    moment.steps.forEach(item => {
      item.before = state.slice();
      Object.entries(item.set).forEach(([fader, level]) => { state[Number(fader)] = level; });
      item.after = state.slice();
      const colours = COLOUR_FADERS.filter(n => item.after[n] > 0);
      if (colours.length > 1) console.warn(`Lights: two colour faders up at “${moment.label}”`, colours);
    });
  });
})();

let lx = loadLightsState();

function loadLightsState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LIGHTS_STATE_KEY) || "{}");
    return { moment: clampMoment(saved.moment || 1) };
  } catch {
    return { moment: 1 };
  }
}
function clampMoment(value) { return Math.max(1, Math.min(MOMENTS.length, Number(value) || 1)); }
function saveLightsState() { localStorage.setItem(LIGHTS_STATE_KEY, JSON.stringify({ moment: lx.moment })); }
const pad2 = n => String(n).padStart(2, "0");
const escLx = value => String(value).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

function sceneChannels(groups) {
  const out = {};
  RIG.forEach(f => { out[f.s] = { kind: f.kind, values: [0, 0, 0, 0, 0, 0] }; });
  groups.forEach(g => g.scanners.forEach(s => { out[s] = { kind: g.kind, values: g.values.slice(), colour: g.colour, gobo: g.gobo }; }));
  return out;
}

function parLight(ch) {
  const [d, r, g, b, w] = ch.values;
  const rr = Math.min(255, r + w * .95), gg = Math.min(255, g + w * .85), bb = Math.min(255, b + w * .7);
  const level = (rr + gg + bb) ? d / 255 : 0;
  return { color: `rgb(${rr | 0},${gg | 0},${bb | 0})`, level };
}

function crowdSize(label) {
  const cast = typeof CAST !== "undefined" ? CAST[label] : null;
  return Math.max(3, Math.min(17, cast?.people?.length || 6));
}

function performerSpots(n, shape) {
  const spots = [];
  if (shape === "circle") {
    for (let i = 0; i < n; i++) {
      const a = Math.PI * 2 * i / n;
      spots.push([500 + Math.cos(a) * 165, 375 + Math.sin(a) * 48]);
    }
  } else if (shape === "line") {
    for (let i = 0; i < n; i++) spots.push([500 + (i - (n - 1) / 2) * Math.min(80, 440 / n), 400]);
  } else if (shape === "arc") {
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0 : i / (n - 1) - .5;
      spots.push([500 + t * 460, 385 - Math.cos(t * Math.PI) * 50]);
    }
  } else {
    const perRow = Math.ceil(n / 2);
    for (let i = 0; i < n; i++) {
      const row = i < perRow ? 0 : 1, k = row ? i - perRow : i, count = row ? n - perRow : perRow;
      spots.push([500 + (k - (count - 1) / 2) * Math.min(70, 470 / count) + (row ? 18 : 0), row ? 345 : 415]);
    }
  }
  return spots.sort((a, b) => a[1] - b[1]);
}

function mixHex(base, rgbText, amount) {
  const [br, bg, bb] = hexRgb(base);
  const [r, g, b] = rgbText.match(/\d+/g).map(Number);
  const mix = (x, y) => Math.round(x + (y - x) * Math.max(0, Math.min(1, amount)));
  return `rgb(${mix(br, r)},${mix(bg, g)},${mix(bb, b)})`;
}

function person(x, y, fill, rim, scale = 1) {
  const s = scale * (0.78 + (y - 300) / 420);
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})">
    <path d="M-15 0 Q-17 -36 0 -40 Q17 -36 15 0 Z" fill="${fill}" stroke="${rim}" stroke-width="2"/>
    <circle cx="0" cy="-50" r="9.5" fill="${fill}" stroke="${rim}" stroke-width="2"/></g>`;
}

function goboMark(x, y, colour, gobo, op) {
  if (gobo === "Dots") return [0, 1, 2, 3, 4, 5, 6].map(i => {
    const a = i / 6 * Math.PI * 2; const r = i === 6 ? 0 : 26;
    return `<ellipse cx="${x + Math.cos(a) * r}" cy="${y + Math.sin(a) * r * .32}" rx="9" ry="3.6" fill="${colour}" opacity="${op}"/>`;
  }).join("");
  if (gobo === "Star") {
    const pts = Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? 14 : 38; const a = i / 10 * Math.PI * 2 - Math.PI / 2; return `${x + Math.cos(a) * r},${y + Math.sin(a) * r * .32}`; }).join(" ");
    return `<polygon points="${pts}" fill="${colour}" opacity="${op}"/>`;
  }
  if (gobo === "Breakup") return [[-26, -4, 14], [8, -7, 11], [26, 4, 9], [-6, 6, 13], [-34, 7, 7], [18, 9, 7]].map(([dx, dy, r]) =>
    `<ellipse cx="${x + dx}" cy="${y + dy}" rx="${r}" ry="${r * .38}" fill="${colour}" opacity="${op}"/>`).join("");
  return `<ellipse cx="${x}" cy="${y}" rx="44" ry="13" fill="${colour}" opacity="${op}"/>`;
}

function ledWall(look) {
  const dots = "<i></i><i></i><i></i><i></i><i></i><i></i><b></b>";
  return `<foreignObject x="285" y="52" width="430" height="196"><div xmlns="http://www.w3.org/1999/xhtml" class="lx-led-mini look-${look}"><div class="led-perform-art">${dots}</div></div></foreignObject>`;
}

let simRenderCount = 0;
function stageSimSvg(moment, people, groups) {
  const ch = sceneChannels(groups);
  const L = s => parLight(ch[s]);
  const front = [L(1), L(2)], back = [L(5), L(6)], side = [L(7), L(8)], host = [L(3), L(4)], blinder = L(11), centre = L(12);
  const faceLevel = Math.max(front[0].level, front[1].level);
  const faceColor = front[0].level >= front[1].level ? front[0].color : front[1].color;
  const sideLevel = Math.max(side[0].level, side[1].level);
  const backLevel = Math.max(back[0].level, back[1].level);

  const glow = (id, light) => `<radialGradient id="${id}"><stop offset="0" stop-color="${light.color}" stop-opacity="${(light.level * .95).toFixed(2)}"/><stop offset="1" stop-color="${light.color}" stop-opacity="0"/></radialGradient>`;
  const beamGrad = (id, color, level, x1, y1, x2, y2) => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${color}" stop-opacity="${(level * .75).toFixed(2)}"/><stop offset="1" stop-color="${color}" stop-opacity="${(level * .12).toFixed(2)}"/></linearGradient>`;

  const movers = [9, 10].map((s, i) => {
    const c = ch[s];
    const level = c.values[4] / 255;
    if (!level) return "";
    const fx = i ? 580 : 420, fy = 30;
    const tx = 60 + c.values[0] / 255 * 880;
    const ty = 40 + c.values[1] / 255 * 520;
    const color = WHEEL[c.colour]?.[1] || "#ffffff";
    const spread = c.gobo === "Open" ? 34 : 50;
    const hitsFloor = ty > 250 && ty < 470;
    return `<defs>${beamGrad(`lxBeam${s}`, color, level, fx, fy, tx, ty)}</defs>
      <polygon points="${fx - 4},${fy} ${fx + 4},${fy} ${tx + spread},${ty} ${tx - spread},${ty}" fill="url(#lxBeam${s})"/>
      ${hitsFloor ? goboMark(tx, ty, color, c.gobo, (level * .9).toFixed(2)) : ""}`;
  }).join("");

  const rimColor = back[0].level >= back[1].level ? back[0].color : back[1].color;
  const bodyFill = mixHex("#17151d", faceColor, faceLevel * .38 + centre.level * .18 + sideLevel * .08);
  const rim = backLevel > .05 ? rimColor : "#2a2733";
  const hostFill = mixHex("#17151d", host[0].color, Math.max(host[0].level, faceLevel) * .9);
  const hosts = person(392, 452, hostFill, host[0].level > .05 ? "#ffcf8f" : "#2a2733", 1.12) + person(608, 452, hostFill, host[0].level > .05 ? "#ffcf8f" : "#2a2733", 1.12);
  let cast = "";
  if (people === "band") cast = performerSpots(crowdSize(moment.label), moment.shape).map(([x, y]) => person(x, y, bodyFill, rim)).join("") + (host[0].level > .05 ? hosts : "");
  if (people === "hosts") cast = hosts;
  if (people === "speaker") cast = `<rect x="198" y="392" width="44" height="52" rx="4" fill="#3a2f26"/>` + person(220, 395, bodyFill, rim, 1.05);
  if (people === "lamp") cast = `<rect x="494" y="372" width="12" height="62" fill="#c9a24a"/><ellipse cx="500" cy="370" rx="22" ry="7" fill="#e0b85a"/><circle cx="500" cy="360" r="6" fill="#ffd36b"/>` +
    [[420, 420], [460, 430], [545, 430], [585, 420]].map(([x, y]) => person(x, y, bodyFill, rim)).join("") + person(220, 395, bodyFill, rim, 1.05);
  if (people === "crowd") cast = performerSpots(12, "rows").map(([x, y]) => person(x, y, bodyFill, rim)).join("") + (host[0].level > .05 ? hosts : "");

  const heads = Array.from({ length: 22 }, (_, i) => {
    const x = 20 + i * 46 + (i % 2) * 8, y = 548 + (i % 3) * 6;
    return `<ellipse cx="${x}" cy="${y}" rx="17" ry="14" fill="${mixHex("#0d0c12", blinder.color, blinder.level * .75)}"/>`;
  }).join("");

  const uid = `_${++simRenderCount}`;
  return `<svg class="lx-sim-svg" viewBox="0 0 1000 560" role="img" aria-label="What the stage looks like at this moment">
    <defs>
      ${glow("lxBackL", back[0])}${glow("lxBackR", back[1])}${glow("lxSideFloorL", { color: side[0].color, level: side[0].level * .6 })}${glow("lxSideFloorR", { color: side[1].color, level: side[1].level * .6 })}${glow("lxHostL", host[0])}${glow("lxHostR", host[1])}${glow("lxCentre", centre)}${glow("lxBlind", blinder)}
      ${beamGrad("lxSideL", side[0].color, side[0].level, 340, 28, 430, 420)}${beamGrad("lxSideR", side[1].color, side[1].level, 660, 28, 570, 420)}
      ${beamGrad("lxFrontL", front[0].color, front[0].level * .45, 360, 28, 390, 450)}${beamGrad("lxFrontR", front[1].color, front[1].level * .45, 640, 28, 610, 450)}
      ${beamGrad("lxCone5", back[0].color, back[0].level * .7, 360, 30, 360, 330)}${beamGrad("lxCone6", back[1].color, back[1].level * .7, 640, 30, 640, 330)}
      ${beamGrad("lxCone12", centre.color, centre.level * .8, 500, 30, 500, 380)}
      <linearGradient id="lxFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1a24"/><stop offset="1" stop-color="#2a2531"/></linearGradient>
    </defs>
    <rect width="1000" height="560" fill="#0c0b11"/>
    ${ledWall(moment.look)}
    <rect x="285" y="52" width="430" height="196" fill="none" stroke="#000" stroke-width="6"/>
    <text x="500" y="45" text-anchor="middle" fill="#8b8597" font-size="11" letter-spacing="3">LED WALL</text>
    <polygon points="110,478 890,478 770,250 230,250" fill="url(#lxFloor)"/>
    <g style="mix-blend-mode:screen">
      <polygon points="350,30 370,30 470,330 250,330" fill="url(#lxCone5)"/>
      <polygon points="630,30 650,30 750,330 530,330" fill="url(#lxCone6)"/>
      <ellipse cx="380" cy="320" rx="300" ry="140" fill="url(#lxBackL)"/>
      <ellipse cx="620" cy="320" rx="300" ry="140" fill="url(#lxBackR)"/>
      <polygon points="328,26 354,26 500,420 360,420" fill="url(#lxSideL)"/>
      <polygon points="646,26 672,26 640,420 500,420" fill="url(#lxSideR)"/>
      <polygon points="330,26 390,26 560,470 220,470" fill="url(#lxFrontL)"/>
      <polygon points="610,26 670,26 780,470 440,470" fill="url(#lxFrontR)"/>
      <ellipse cx="330" cy="420" rx="200" ry="50" fill="url(#lxSideFloorL)"/>
      <ellipse cx="670" cy="420" rx="200" ry="50" fill="url(#lxSideFloorR)"/>
      <polygon points="110,478 890,478 770,250 230,250" fill="${faceColor}" opacity="${(faceLevel * .13).toFixed(2)}"/>
      <polygon points="110,478 890,478 770,250 230,250" fill="${rimColor}" opacity="${(backLevel * .22).toFixed(2)}"/>
      <polygon points="494,30 506,30 610,382 390,382" fill="url(#lxCone12)"/>
      <ellipse cx="500" cy="384" rx="120" ry="34" fill="url(#lxCentre)"/>
      <ellipse cx="392" cy="455" rx="95" ry="28" fill="url(#lxHostL)"/>
      <ellipse cx="608" cy="455" rx="95" ry="28" fill="url(#lxHostR)"/>
      ${movers}
    </g>
    ${cast}
    <rect x="0" y="0" width="70" height="560" fill="#5b1420"/><rect x="930" y="0" width="70" height="560" fill="#5b1420"/>
    <rect x="0" y="0" width="1000" height="22" fill="#4a101a"/>
    <rect x="80" y="22" width="840" height="8" rx="3" fill="#2b2833"/>
    ${[310, 690].map(x => `<rect x="${x - 10}" y="26" width="20" height="14" rx="4" fill="#3a3744"/>`).join("")}
    ${[340, 420, 500, 580, 660].map(x => `<circle cx="${x}" cy="30" r="7" fill="#3a3744"/>`).join("")}
    <g style="mix-blend-mode:screen"><ellipse cx="500" cy="560" rx="620" ry="95" fill="url(#lxBlind)"/></g>
    ${heads}
  </svg>`.replace(/\b(lx[A-Z][A-Za-z0-9]*)\b/g, `$1${uid}`);
}

const lookGroups = state => FADERS.flatMap(f => state[f.n] ? f.groups(state[f.n]) : []);
const levelWord = level => level >= FULL ? "UP" : level > OFF ? "HALF" : "DOWN";

function legendLines(name) {
  const words = name.split(" ");
  if (words.length === 1) return [name];
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
}

function consoleSvg(before, after, options = {}) {
  const changed = n => before[n] !== after[n];
  const pageName = options.pageName || "SEASONS";
  const x0 = 186, gap = 60;
  const legends = FADERS.map((f, i) => {
    const x = x0 + i * gap;
    const lines = legendLines(f.name);
    const bar = f.swatch.map((c, k) => `<rect x="${x - 25 + k * 50 / f.swatch.length}" y="62" width="${50 / f.swatch.length}" height="5" fill="${c}"/>`).join("");
    return `<g class="tt-legend${changed(f.n) ? " hl" : ""}"><rect x="${x - 27}" y="28" width="54" height="42" rx="3"/>
      ${lines.map((line, k) => `<text x="${x}" y="${(lines.length === 1 ? 50 : 44) + k * 11}" text-anchor="middle">${escLx(line)}</text>`).join("")}${bar}</g>`;
  }).join("");
  const faders = FADERS.map((f, i) => {
    const x = x0 + i * gap;
    const level = after[f.n], top = 168, bottom = 318;
    const capY = bottom - (level / 100) * (bottom - top) - 13;
    const hot = changed(f.n);
    const fromY = bottom - (before[f.n] / 100) * (bottom - top);
    const toY = bottom - (level / 100) * (bottom - top);
    const arrow = hot ? `<path class="tt-arrow" d="M${x + 24} ${fromY.toFixed(1)} L${x + 24} ${(toY + (toY < fromY ? 8 : -8)).toFixed(1)}"/><path class="tt-arrow-head" d="M${x + 17} ${(toY + (toY < fromY ? 10 : -10)).toFixed(1)} L${x + 24} ${toY.toFixed(1)} L${x + 31} ${(toY + (toY < fromY ? 10 : -10)).toFixed(1)}Z"/>` : "";
    return `<g class="tt-fader${hot ? " hl" : ""}${level ? " on" : ""}">
      <rect x="${x - 15}" y="84" width="30" height="20" rx="3" class="tt-blue"/><circle cx="${x}" cy="94" r="3.5" class="tt-led"/>
      <rect x="${x - 15}" y="108" width="30" height="20" rx="3" class="tt-grey"/>
      <text x="${x}" y="150" text-anchor="middle" class="tt-num">${f.n}</text>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => `<line x1="${x - 13}" x2="${x - 8}" y1="${top + t * 15}" y2="${top + t * 15}" class="tt-tick"/>`).join("")}
      <rect x="${x - 3}" y="${top}" width="6" height="${bottom - top}" rx="3" class="tt-track"/>
      ${arrow}
      <rect x="${x - 17}" y="${capY.toFixed(1)}" width="34" height="26" rx="4" class="tt-cap"/>
      <line x1="${x - 13}" x2="${x + 13}" y1="${(capY + 13).toFixed(1)}" y2="${(capY + 13).toFixed(1)}" class="tt-cap-line"/>
      ${hot ? `<text x="${x}" y="350" text-anchor="middle" class="tt-word">${levelWord(level)}</text>` : ""}
    </g>`;
  }).join("");
  return `<svg class="tt-svg" viewBox="0 0 800 362" role="img" aria-label="The ten faders of the Tiger Touch II at this moment">
    <rect x="4" y="4" width="792" height="354" rx="16" class="tt-body"/>
    <rect x="150" y="14" width="636" height="62" rx="6" class="tt-screen"/>
    <text x="158" y="25" class="tt-screen-title">Page: ${escLx(pageName)}</text>
    ${legends}
    <text x="72" y="44" text-anchor="middle" class="tt-label">PLAYBACK PAGE</text>
    <rect x="34" y="52" width="38" height="24" rx="3" class="tt-cream${options.pageKeys ? " hl" : ""}"/><rect x="74" y="52" width="38" height="24" rx="3" class="tt-cream${options.pageKeys ? " hl" : ""}"/>
    <text x="53" y="68" text-anchor="middle" class="tt-key">−1</text><text x="93" y="68" text-anchor="middle" class="tt-key">+1</text>
    <rect x="54" y="98" width="36" height="28" rx="3" class="tt-blue tt-dbo"/>
    <text x="72" y="140" text-anchor="middle" class="tt-label danger">DON’T PRESS</text>
    <text x="72" y="160" text-anchor="middle" class="tt-label">MASTER</text>
    <rect x="69" y="168" width="6" height="150" rx="3" class="tt-track"/>
    <rect x="55" y="155" width="34" height="26" rx="4" class="tt-cap tt-master${options.masterHl ? " hl" : ""}"/>
    <text x="72" y="340" text-anchor="middle" class="tt-label gold">ALWAYS UP</text>
    ${faders}
  </svg>`;
}

function changeLines(item) {
  const ups = [], downs = [];
  for (let n = 1; n <= 10; n++) {
    const from = item.before[n], to = item.after[n];
    if (from === to) continue;
    const f = faderOf(n);
    const label = `<b class="lx-chip" style="--sw:${f.swatch[0]}">${n} · ${escLx(f.name)}</b>`;
    if (to === FULL) ups.push(`Push ${label} all the way <strong>up</strong>.`);
    else if (to === OFF) downs.push(`Pull ${label} all the way <strong>down</strong>.`);
    else (to > from ? ups : downs).push(`Slide ${label} ${to > from ? "up" : "down"} to the <strong>middle</strong>.`);
  }
  return [...ups, ...downs];
}

function stepCard(moment, item, index) {
  const lines = changeLines(item);
  return `<article class="lx-step">
    <header class="lx-step-head"><i>${index + 1}</i><div><small>When</small><b>${escLx(item.when)}</b></div></header>
    <div class="lx-step-body">
      <div class="lx-step-do">
        <small>Do this</small>
        ${lines.length ? `<ul>${lines.map(line => `<li>${line}</li>`).join("")}</ul>${lines.length > 1 ? `<p class="lx-together">Move them together, slowly. Count “one-and-two” while you slide.</p>` : `<p class="lx-together">Slowly. Count “one-and-two” while you slide.</p>`}` : `<p class="lx-nothing">Nothing to move. Hands off, just watch.</p>`}
        ${item.note ? `<p class="lx-step-note">${escLx(item.note)}</p>` : ""}
      </div>
      <figure class="lx-pic"><figcaption>Your faders after this step</figcaption>${consoleSvg(item.before, item.after)}</figure>
      <figure class="lx-pic"><figcaption>What the stage looks like</figcaption>${stageSimSvg(moment, item.people, lookGroups(item.after))}</figure>
    </div>
  </article>`;
}

const PHOTO_MARKS = [
  { id: "A", ok: true, x: 19, y: 48, name: "The bottom of the screen", text: "Shows the page name and the name of each fader. Before the show it must say SEASONS." },
  { id: "B", ok: true, x: 10.5, y: 58.5, name: "Playback Page −1 / +1", text: "Only before the show, to reach the SEASONS page. Never during the show." },
  { id: "C", ok: true, x: 9.5, y: 77, name: "Master (one fader, far left)", text: "All the way up. Then never touch it again." },
  { id: "D", ok: true, x: 50, y: 70.5, name: "Faders 1 to 10", text: "The only things you move during the show." },
  { id: "1", ok: false, x: 10, y: 64.5, name: "Blue button above Master", text: "Can black out the whole stage in one press." },
  { id: "2", ok: false, x: 31, y: 61, name: "Blue and grey buttons above each fader", text: "They flash lights on and off. Leave them alone." },
  { id: "3", ok: false, x: 58.5, y: 73, name: "Three big round wheels", text: "They change colour and position. Programming only." },
  { id: "4", ok: false, x: 74.6, y: 81, name: "Red GO button", text: "Not used in our show." },
  { id: "5", ok: false, x: 83, y: 70, name: "Number keypad", text: "Programming only." },
  { id: "6", ok: false, x: 92.8, y: 79.4, name: "Red Locate button", text: "Turns lights to plain white. Never press it." },
  { id: "7", ok: false, x: 80, y: 18, name: "The faders at the top right", text: "A different set, called Preset Playbacks. Not ours." }
];

function photoHtml() {
  return `<div class="lx-photo-wrap">
    <figure class="lx-photo">
      <img src="tiger-touch-ii.jpg" alt="The Avolites Tiger Touch II lighting console at the hall" loading="lazy">
      ${PHOTO_MARKS.map(m => `<span class="lx-pin ${m.ok ? "ok" : "no"}" style="left:${m.x}%;top:${m.y}%">${m.id}</span>`).join("")}
      <span class="lx-zone" style="left:13.5%;top:70%;width:36%;height:20%" aria-hidden="true"></span>
    </figure>
    <div class="lx-keys">
      <div><h4 class="ok">Green = you touch these</h4>${PHOTO_MARKS.filter(m => m.ok).map(m => `<p><i class="lx-pin ok">${m.id}</i><span><b>${escLx(m.name)}</b>${escLx(m.text)}</span></p>`).join("")}</div>
      <div><h4 class="no">Red = never touch</h4>${PHOTO_MARKS.filter(m => !m.ok).map(m => `<p><i class="lx-pin no">${m.id}</i><span><b>${escLx(m.name)}</b>${escLx(m.text)}</span></p>`).join("")}</div>
    </div>
  </div>`;
}

function setupHtml() {
  const zero = Array(11).fill(OFF);
  const checks = [
    ["Find our page", "Look at the bottom of the screen. Today it says <b>Page 1: SHREE</b>. That is someone else’s show. Press <b>Playback Page +1</b> (or −1) until it says <b>SEASONS</b>. The fader names on the screen should now match the picture."],
    ["Pull all ten faders down", "Pull faders 1 to 10 all the way down, towards you. In the photo, fader 1 is still pushed up from the last show. Pull it down too."],
    ["Push the Master up", "The single fader on the far left, labelled <b>Master</b>, goes all the way up, away from you. It stays there all evening. If the Master is down, nothing lights, whatever else you do."],
    ["Test, then reset", "Push fader 1 · HOSTS up and look at the stage: the front edge should glow warm. Pull it back down. Do the same for 2 · FACES. Now every fader is down again and you are ready."]
  ];
  return `<section class="lx-block">
    <div class="lx-block-head"><span class="lx-tag prog">Before the doors open</span><h3>Two minutes, four checks</h3></div>
    <div class="lx-setup">
      <ol>${checks.map(([title, text], i) => `<li><i>${i + 1}</i><span><b>${title}</b>${text}</span></li>`).join("")}</ol>
      <figure class="lx-pic"><figcaption>The board after the checks: page SEASONS, Master up, faders 1–10 down</figcaption>${consoleSvg(zero, zero, { pageKeys: true, masterHl: true })}</figure>
    </div>
  </section>`;
}

function fadersHtml() {
  return `<section class="lx-block">
    <div class="lx-block-head"><span class="lx-tag show">Your ten faders</span><h3>Each fader is one ready-made light</h3></div>
    <p class="lx-lede">Think of the faders like the light switches at home, but with a dimmer. Up = on, down = off, middle = half. The hall’s light person has already saved a picture of light on each one. You never make colours yourself.</p>
    <div class="lx-fader-grid">${FADERS.map(f => `<article class="lx-fcard${f.colour ? " colour" : ""}">
      <div class="lx-fswatch${f.n === 10 ? " beam" : ""}">${f.swatch.map(c => `<i style="background:${c}"></i>`).join("")}</div>
      <b><em>${f.n}</em>${escLx(f.name)}</b><p>${escLx(f.plain)}</p></article>`).join("")}</div>
    <div class="lx-rules">
      <p><b>Golden rule 1.</b> Only <b>one</b> colour fader (3 to 9) is ever up at a time. They all paint the same lights, so two at once would fight.</p>
      <p><b>Golden rule 2.</b> Move slowly. Count “one-and-two” while you slide, so the light fades instead of jumping.</p>
      <p><b>Golden rule 3.</b> Lost? Look at this page, find the moment, and make your faders match the picture. That always fixes it.</p>
    </div>
  </section>`;
}

function techHtml() {
  return `<details class="lx-block lx-tech">
    <summary><span class="lx-tag prog">For the hall’s light technician</span><b>Record these ten faders once, before the show</b></summary>
    <ol class="lx-tech-steps">
      <li>Use a <b>new, empty playback page</b>. Do not change “Page 1: SHREE”. Name the new page <b>SEASONS</b>.</li>
      <li>Record each look below on playback faders 1 to 10 of that page. Set each fader’s legend to the name in capitals, so it shows on the screen above the fader.</li>
      <li>Fade in and fade out about 2 seconds on every fader. No chases except the slow sweep on 10.</li>
      <li>Faders 3 to 9 all use the same Wing Pars and Col Pars. The operator will only ever have one of them up.</li>
      <li>If the audience lights are on this console, tell the operator. Otherwise the hall staff run them.</li>
    </ol>
    <table class="lx-rig"><thead><tr><th>Fader</th><th>Legend</th><th>What to record</th></tr></thead><tbody>
      ${FADERS.map(f => `<tr><td><b>${f.n}</b></td><td><span class="lx-fswatch small">${f.swatch.map(c => `<i style="background:${c}"></i>`).join("")}</span>${escLx(f.name)}</td><td>${escLx(f.tech)}</td></tr>`).join("")}
    </tbody></table>
    <p class="lx-note">Fixture names are the ones on this console’s screen: Profile, White Par, Col Par, Wing Par, Spot. If the hall’s lights are arranged differently, keep the idea: 1 warm on the hosts, 2 white on the whole stage, 3–9 one colour picture each, 10 moving white beams.</p>
  </details>`;
}

function troubleHtml() {
  const rows = [
    ["Everything went dark", "Check the <b>Master</b> on the far left is all the way up. Then look at the picture for this moment and match your faders."],
    ["The colours look mixed or wrong", "Two colour faders are up. Pull every colour fader (3 to 9) down, then push up only the one in the picture."],
    ["The screen shows a different page", "Someone pressed Playback Page. Press −1 or +1 until it says SEASONS again. The faders you have up keep working."],
    ["The lights are flashing", "You pressed a button above a fader. Take your finger off. If it keeps flashing, call the hall’s light person."]
  ];
  return `<section class="lx-block">
    <div class="lx-block-head"><span class="lx-tag warn">If something goes wrong</span><h3>Don’t panic. Every problem has one fix.</h3></div>
    <div class="lx-trouble">${rows.map(([q, a]) => `<article><b>${q}</b><p>${a}</p></article>`).join("")}</div>
  </section>`;
}

function railSwatches(moment) {
  const last = moment.steps.reduce((best, item) => item.after.reduce((a, b) => a + b, 0) > best.after.reduce((a, b) => a + b, 0) ? item : best, moment.steps[0]);
  const lit = FADERS.filter(f => last.after[f.n] > 0);
  return lit.flatMap(f => f.swatch.slice(0, 1)).slice(0, 4);
}

function renderLights() {
  const root = document.getElementById("lightsConsole");
  if (!root) return;
  const moment = MOMENTS[lx.moment - 1];
  const prev = MOMENTS[lx.moment - 2], next = MOMENTS[lx.moment];

  root.innerHTML = `<div class="lx-page">
    <header class="lx-top">
      <div>
        <div class="eyebrow">Lighting console · Avolites Tiger Touch II</div>
        <h1>Lights</h1>
        <p>Never touched a lighting desk before? Good, this page is for you. You will only slide <b>ten faders</b>. For every moment of the show there is a picture of where each fader goes, and a picture of how the stage will look.</p>
      </div>
      <ol class="lx-how">
        <li><i>1</i><span><b>Meet the desk</b><br>Green is yours. Red is never.</span></li>
        <li><i>2</i><span><b>Before doors</b><br>Four quick checks.</span></li>
        <li><i>3</i><span><b>During the show</b><br>Pick the moment. Copy the faders.</span></li>
      </ol>
    </header>

    <section class="lx-block">
      <div class="lx-block-head"><span class="lx-tag show">Meet the desk</span><h3>This is the real desk at the hall</h3></div>
      <p class="lx-lede">It has hundreds of buttons. You need almost none of them. Your hands only go to the green letters. The gold box is where you will spend the whole evening.</p>
      ${photoHtml()}
    </section>

    ${setupHtml()}
    ${fadersHtml()}

    <section class="lx-block" id="lxShow">
      <div class="lx-block-head"><span class="lx-tag show">During the show</span><h3>Moment by moment</h3></div>
      <p class="lx-lede">Pick the moment on the left (or press the ← → keys). Each card tells you <b>when</b> to move, <b>what</b> to move, and shows the result.</p>
      <div class="lx-shell">
        <aside class="lx-rail" aria-label="Moments">
          ${MOMENTS.map(m => `<button class="lx-bank${m.n === lx.moment ? " active" : ""}" data-moment="${m.n}">
            <span class="lx-bank-num">${pad2(m.n)}</span>
            <span class="lx-bank-copy"><b>${m.act ? `Act ${m.act} · ` : ""}${escLx(m.label)}</b><small>${escLx(m.sub)}</small></span>
            <span class="lx-swatches">${railSwatches(m).map(color => `<i style="background:${color}"></i>`).join("")}</span></button>`).join("")}
        </aside>
        <div class="lx-main">
          <div class="lx-act-head">
            <div class="eyebrow">Moment ${pad2(moment.n)} of ${MOMENTS.length}${moment.act ? ` · Act ${moment.act}` : ""}</div>
            <h2>${escLx(moment.label)}</h2>
            <p class="lx-kid">${escLx(moment.kid)}</p>
          </div>
          ${moment.steps.map((item, index) => stepCard(moment, item, index)).join("")}
          <nav class="lx-pager">
            ${prev ? `<button data-moment="${prev.n}">← ${escLx(prev.label)}</button>` : "<span></span>"}
            ${next ? `<button class="next" data-moment="${next.n}">Next: ${escLx(next.label)} →</button>` : "<span></span>"}
          </nav>
        </div>
      </div>
    </section>

    ${troubleHtml()}
    ${techHtml()}
  </div>`;

  root.querySelectorAll("[data-moment]").forEach(button => button.addEventListener("click", () => {
    const fromPager = button.closest(".lx-pager");
    selectMoment(Number(button.dataset.moment));
    if (fromPager) document.querySelector("#lxShow")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  const rail = root.querySelector(".lx-rail"), active = root.querySelector(".lx-bank.active");
  if (rail && active) {
    if (rail.scrollWidth > rail.clientWidth + 4) rail.scrollLeft = active.offsetLeft - rail.clientWidth / 2 + active.offsetWidth / 2;
    else rail.scrollTop = active.offsetTop - rail.clientHeight / 2 + active.offsetHeight / 2;
  }
}

function selectMoment(n) {
  lx.moment = clampMoment(n);
  saveLightsState();
  const y = window.scrollY;
  renderLights();
  window.scrollTo(0, y);
}

document.addEventListener("keydown", event => {
  if (!document.getElementById("lightsView")?.classList.contains("active")) return;
  if (event.target.closest("input,textarea,select,[contenteditable]")) return;
  if (event.key === "ArrowRight") { event.preventDefault(); selectMoment(lx.moment + 1); }
  else if (event.key === "ArrowLeft") { event.preventDefault(); selectMoment(lx.moment - 1); }
});

window.lightsRenderConsole = renderLights;
if (document.getElementById("lightsView")?.classList.contains("active")) renderLights();
