const LIGHTS_STATE_KEY = "seasons-lights-dmx192-v2";

const PAR_FADERS = ["Dimmer", "Red", "Green", "Blue", "White", "Strobe"];
const MOVER_FADERS = ["Pan", "Tilt", "Colour", "Gobo", "Dimmer", "Shutter"];

const RIG = [
  { s: 1, kind: "par", name: "Front wash · left", where: "Front-of-house bar, shines on faces from the audience side" },
  { s: 2, kind: "par", name: "Front wash · right", where: "Front-of-house bar, shines on faces from the audience side" },
  { s: 3, kind: "par", name: "Host special · left", where: "Tight warm pool on the left apron (FK)" },
  { s: 4, kind: "par", name: "Host special · right", where: "Tight warm pool on the right apron (Upasana)" },
  { s: 5, kind: "par", name: "Back wash · left", where: "Upstage bar, behind the performers (rim glow)" },
  { s: 6, kind: "par", name: "Back wash · right", where: "Upstage bar, behind the performers (rim glow)" },
  { s: 7, kind: "par", name: "Side wash · left", where: "Left wing boom, paints the performers from the side" },
  { s: 8, kind: "par", name: "Side wash · right", where: "Right wing boom, paints the performers from the side" },
  { s: 9, kind: "mover", name: "Moving head · left", where: "Overhead bar, left — beams and patterns" },
  { s: 10, kind: "mover", name: "Moving head · right", where: "Overhead bar, right — beams and patterns" },
  { s: 11, kind: "par", name: "Audience blinder", where: "Stage edge, pointing at the audience" },
  { s: 12, kind: "par", name: "Centre special", where: "Overhead centre, one round pool on the stage" }
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
const FACE = dim => P([1, 2], dim, "#ffd6a6", 70);
const HOSTS = [FACE(25), P([3, 4], 100, "#ffcf8f", 90), P([5, 6], 15, "#1b2a5c")];

const ACT_LIGHTS = [
  { title: "Tauba Tauba, Urvashi Urvashi Mashup", theme: "Magenta · cyan dance party", image: "led-bus-journey.jpg", shape: "rows",
    trigger: "the first musical note", accentWhen: "the first big chorus",
    kid: "Pink light from behind, blue light from the sides, and two moving lights crossing like dancers.",
    song: [FACE(75), P([5, 6], 90, "#e0218a"), P([7, 8], 80, "#00c8d8"), ...FAN(70, 120, "Cyan", "Dots", 70)],
    accent: [P([7, 8], 85, "#e0218a"), ...FAN(40, 160, "Magenta", "Dots", 80), P([11], 35, "#ffd6a6", 40)] },
  { title: "Bharat Humko Jaan Se Pyara Hai", theme: "Respectful tricolour from behind", image: "led-bus-journey.jpg", shape: "line",
    trigger: "the first musical note", accentWhen: "the last chorus",
    kid: "Saffron on the left, green on the right, clean white in the middle. Nothing moves. It feels proud and calm.",
    song: [FACE(80), P([5], 90, "#ff8a1a"), P([6], 90, "#138808"), P([7, 8], 55, "#ffffff", 60), P([12], 50, "#ffffff", 80)],
    accent: [...FAN(70, 25, "White", "Open", 60)] },
  { title: "Drum Circle", theme: "Fire-red drum circle", image: "led-monsoon-ghat.jpg", shape: "circle",
    trigger: "the first drum strike", accentWhen: "the big unison roll near the end",
    kid: "Red fire behind, orange from the sides, and one round pool in the middle like a campfire.",
    song: [FACE(60), P([5, 6], 100, "#c1121f"), P([7, 8], 100, "#ff8c00"), P([12], 70, "#ff9d2e"), ...FAN(110, 200, "Red", "Breakup", 80)],
    accent: [P([11], 70, "#ffb347", 40), ...FAN(90, 210, "Amber", "Breakup", 100)] },
  { title: "Old Woman Shoe", theme: "Sunny storybook", image: "led-bus-journey.jpg", shape: "rows",
    trigger: "the first musical note", accentWhen: "the second verse",
    kid: "Bright like a picture book: sunny yellow behind, sky blue on the sides and a soft pink circle.",
    song: [FACE(85), P([5, 6], 70, "#ffd23f"), P([7, 8], 60, "#4cc9f0"), P([12], 40, "#ff9fb2", 30)],
    accent: [...FAN(30, 90, "Yellow", "Star", 50)] },
  { title: "Mission Impossible", theme: "Spy-movie steel blue", image: "led-indian-truck.jpg", shape: "rows",
    trigger: "the theme begins", accentWhen: "the final build-up",
    kid: "Dark navy like a night mission. Two sharp white beams cross the stage like laser alarms.",
    song: [FACE(55), P([5, 6], 90, "#0b3d91"), P([7, 8], 40, "#dbe9ff", 40), ...FAN(40, 150, "White", "Open", 85)],
    accent: [P([7, 8], 0, "#000000"), ...FAN(80, 175, "Red", "Open", 95)] },
  { title: "We Are the Champions Mashup", theme: "Royal blue · stadium gold", image: "led-bus-journey.jpg", shape: "rows",
    trigger: "the first vocal note", accentWhen: "the “We are the champions” chorus",
    kid: "Royal blue like a trophy ribbon, gold from the sides, and at the chorus we light up the audience so they sing.",
    song: [FACE(80), P([5, 6], 85, "#1f4fd1"), P([7, 8], 70, "#f4c430"), ...FAN(90, 230, "Yellow", "Open", 70)],
    accent: [P([11], 80, "#ffe7a8", 60), ...FAN(60, 245, "White", "Open", 80)] },
  { title: "Raag Yaman", theme: "Midnight indigo · one golden pool", image: "led-bus-journey.jpg", shape: "arc",
    trigger: "the first flute note", accentWhen: "the slow ending",
    kid: "Like a quiet night: deep indigo behind and one golden circle on the musicians. No side lights, no moving lights.",
    song: [FACE(65), P([5, 6], 70, "#1d2b64"), P([12], 80, "#f2b84b", 40)],
    accent: [P([5, 6], 55, "#2a1f6b"), P([12], 95, "#f2b84b", 50), FACE(45)] },
  { title: "The Flute Song", theme: "Mint garden", image: "led-bus-journey.jpg", shape: "arc",
    trigger: "the first musical note", accentWhen: "the middle section",
    kid: "Fresh mint green like a garden, with warm white from the sides so the little ones look bright.",
    song: [FACE(80), P([5, 6], 60, "#5ad1a4"), P([7, 8], 50, "#ffe6b3", 60)],
    accent: [...FAN(60, 205, "White", "Dots", 40)] },
  { title: "Saiyaara", theme: "Violet moonlight", image: "led-bus-journey.jpg", shape: "rows",
    trigger: "the first musical note", accentWhen: "the hook line",
    kid: "Purple like a dream, moon-blue from the sides, and a slow soft pattern on the floor like moonlight through leaves.",
    song: [FACE(65), P([5, 6], 85, "#6a3fb5"), P([7, 8], 55, "#4e7fd6"), ...FAN(100, 195, "Lavender", "Breakup", 45)],
    accent: [P([12], 55, "#e8e4ff", 60), ...FAN(120, 210, "Blue", "Breakup", 55)] },
  { title: "G Minute", theme: "Midnight strings · silver", image: "led-monsoon-ghat.jpg", shape: "arc",
    trigger: "the first violin note", accentWhen: "the final phrase",
    kid: "Dark blue night with silver-white edges, like moonlight on violins.",
    song: [FACE(70), P([5, 6], 75, "#10245c"), P([7, 8], 35, "#e8eef9", 50), P([12], 55, "#dfe8ff", 60)],
    accent: [...FAN(20, 70, "Blue", "Star", 30)] },
  { title: "Ghar More Pardesiya & Moh Moh Ke Dhaage", theme: "Rose · antique gold", image: "led-monsoon-ghat.jpg", shape: "line",
    trigger: "the first vocal note", accentWhen: "the switch into Moh Moh Ke Dhaage",
    kid: "Rose pink behind, old gold from the sides, like a lamp-lit room at home.",
    song: [FACE(75), P([5, 6], 70, "#b23a75"), P([7, 8], 65, "#d8a24a"), P([12], 60, "#ffd8a0", 40)],
    accent: [P([5, 6], 70, "#e0892f"), P([7, 8], 55, "#b23a75")] },
  { title: "Challa — Jab Tak Hai Jaan", theme: "Road-trip amber · teal", image: "led-monsoon-ghat.jpg", shape: "rows",
    trigger: "the first guitar note", accentWhen: "the chorus",
    kid: "Sunset orange behind and sea-teal from the sides, like driving on a highway at sunset.",
    song: [FACE(75), P([5, 6], 85, "#e07a1f"), P([7, 8], 65, "#1e9a95"), ...FAN(85, 140, "Amber", "Breakup", 50)],
    accent: [P([11], 30, "#ffc27a", 40), ...FAN(55, 185, "Amber", "Breakup", 70)] },
  { title: "Chammak Challo Mashup", theme: "Red · magenta party with gold beams", image: "led-goa-coast.jpg", shape: "rows",
    trigger: "the first musical note", accentWhen: "the drop",
    kid: "Party time: red behind, pink from the sides and gold beams fanning out like a disco.",
    song: [FACE(80), P([5, 6], 95, "#d01535"), P([7, 8], 80, "#e0218a"), ...FAN(30, 110, "Yellow", "Open", 80)],
    accent: [P([11], 60, "#ffd6a6", 50), ...FAN(10, 95, "White", "Dots", 90)] },
  { title: "Eye of the Tiger, Gehra Hua Mashup", theme: "Boxing-ring red · hard white", image: "led-goa-coast.jpg", shape: "rows",
    trigger: "the first guitar note", accentWhen: "the guitar riff after the verse",
    kid: "Red like a boxing ring with hard white light from the sides, and two straight beams like spotlights on fighters.",
    song: [FACE(70), P([5, 6], 100, "#c1121f"), P([7, 8], 80, "#ffffff", 80), ...FAN(105, 235, "White", "Open", 90)],
    accent: [P([7, 8], 90, "#c1121f"), ...FAN(105, 235, "Red", "Open", 100)] },
  { title: "Dil Diya Hai Jaan Bhi Denge — Karma", theme: "Tricolour from the sides", image: "led-goa-coast.jpg", shape: "line",
    trigger: "the first vocal note", accentWhen: "“Dil diya hai” chorus",
    kid: "This time the tricolour comes from the sides: saffron left, green right, white behind. Different from Act 2.",
    song: [FACE(80), P([7], 85, "#ff8a1a"), P([8], 85, "#138808"), P([5, 6], 60, "#ffffff", 70), P([12], 60, "#ffffff", 80)],
    accent: [...FAN(80, 30, "White", "Open", 70)] },
  { title: "How Long — Charlie Puth", theme: "Purple · electric cyan", image: "led-goa-coast.jpg", shape: "rows",
    trigger: "the first drum count", accentWhen: "the chorus",
    kid: "Purple behind, electric blue on the sides and pink dots dancing on the floor.",
    song: [FACE(70), P([5, 6], 85, "#6d2fb3"), P([7, 8], 70, "#00b4d8"), ...FAN(75, 200, "Magenta", "Dots", 60)],
    accent: [...FAN(45, 215, "Cyan", "Dots", 75)] },
  { title: "Final Countdown", theme: "Arena blue · gold hit", image: "led-goa-coast.jpg", shape: "rows",
    trigger: "the opening keyboard note", accentWhen: "the famous keyboard riff comes back",
    kid: "Big arena: blue behind, gold sides, white beams fanned wide, and on the riff the whole audience gets lit.",
    song: [FACE(75), P([5, 6], 90, "#1438a6"), P([7, 8], 60, "#f4c430"), ...FAN(20, 85, "White", "Open", 90)],
    accent: [P([11], 100, "#ffe7a8", 70), ...FAN(50, 240, "Yellow", "Open", 100)] },
  { title: "O Haseena", theme: "Retro amber · ruby", image: "led-goa-coast.jpg", shape: "line",
    trigger: "the first guitar note", accentWhen: "the chorus",
    kid: "Old-film colours: honey amber behind, ruby red from the sides, little gold dots like a 70s dance floor.",
    song: [FACE(75), P([5, 6], 80, "#d9822b"), P([7, 8], 70, "#9b1d42"), ...FAN(95, 205, "Amber", "Dots", 50)],
    accent: [P([11], 40, "#ffd6a6", 40)] },
  { title: "Ajeeb Daastaan", theme: "Champagne · lavender finale", image: "led-goa-coast.jpg", shape: "arc",
    trigger: "the first musical note", accentWhen: "the last chorus",
    kid: "The grand finale: champagne gold behind, lavender sides, and soft beams reaching out to the audience.",
    song: [FACE(85), P([5, 6], 75, "#d9b46b"), P([7, 8], 65, "#9a86d6"), P([12], 50, "#ffd8a0", 40), ...FAN(70, 245, "White", "Breakup", 40)],
    accent: [P([11], 50, "#ffe7a8", 50), ...FAN(40, 250, "Lavender", "Breakup", 60)] }
];

const LIGHT_BANKS = [
  { bank: 1, label: "Opening & welcome", theme: "Ceremony looks", image: "led-bus-journey.jpg", scenes: [
    { name: "Pre-show", people: "none", trigger: "doors open, audience walking in", kid: "Soft warm glow so the stage looks ready but not busy.", groups: [FACE(35), P([5, 6], 30, "#e0a050")] },
    { name: "Opening video", people: "none", trigger: "house lights go down and the opening video starts", kid: "Stage almost dark so the LED video is the star. Two slow gold beams float above.", groups: [P([5, 6], 25, "#4b2a8a"), ...FAN(60, 40, "Yellow", "Open", 35)] },
    { name: "Hosts", people: "hosts", trigger: "FK and Upasana walk on", kid: "Two warm circles on the hosts. The back of the stage stays dark blue so crew can move.", groups: HOSTS },
    { name: "Speech", people: "speaker", trigger: "the speaker reaches the podium", kid: "One bright round light on the speaker in the middle.", groups: [FACE(70), P([12], 90, "#ffd8a0", 70), P([5, 6], 20, "#1b2a5c")] },
    { name: "Lamp lighting", people: "lamp", trigger: "guests reach the lamp", kid: "Warm golden light, like the lamp itself is glowing.", groups: [FACE(80), P([12], 90, "#ffb04a", 50), P([5, 6], 40, "#e0892f")] },
    { name: "Icebreaker", people: "hosts", trigger: "hosts start the audience icebreaker", kid: "Hosts lit and a little teal on stage so it feels fun.", groups: [...HOSTS, P([5, 6], 40, "#1e9a95"), P([11], 30, "#ffd6a6", 40)] }
  ] },
  ...ACT_LIGHTS.map((act, index) => ({
    bank: index + 2,
    act: index + 1 + (index >= 9 ? 1 : 0),
    label: act.title, theme: act.theme, image: act.image, shape: act.shape, kid: act.kid,
    scenes: [
      { name: "Song", people: "band", trigger: act.trigger, kid: act.kid, groups: act.song },
      { name: "Accent", people: "band", trigger: act.accentWhen, kid: "Same look, plus a lift for the big moment.", groups: [...act.song, ...act.accent], extra: act.accent },
      { name: "Hosts", people: "hosts", trigger: "last note + 2 seconds of clapping", kid: "Back to the host look while the next act gets ready.", groups: HOSTS, copyHosts: true }
    ]
  })),
  { bank: ACT_LIGHTS.length + 2, label: "Closing", theme: "Ceremony looks", image: "led-goa-coast.jpg", scenes: [
    { name: "Felicitation", people: "crowd", trigger: "teachers and guests come on stage", kid: "Bright and warm so every face looks good in photos.", groups: [FACE(90), P([5, 6], 50, "#d9b46b"), P([7, 8], 40, "#9a86d6", 30)] },
    { name: "Vote of thanks", people: "speaker", trigger: "speaker reaches the podium", kid: "One clean light on the speaker.", groups: [FACE(70), P([12], 90, "#ffd8a0", 70), P([5, 6], 20, "#1b2a5c")] },
    { name: "National anthem", people: "crowd", trigger: "hosts ask everyone to stand", kid: "Plain bright white. No colours, nothing moving. Just respect.", groups: [FACE(90), P([5, 6], 80, "#ffffff", 100), P([12], 70, "#ffffff", 100)] },
    { name: "Show end", people: "none", trigger: "anthem ends and house lights come up", kid: "Soft warm stage while people leave.", groups: [FACE(40), P([5, 6], 20, "#e0a050")] }
  ] }
];

let lx = loadLightsState();

function loadLightsState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LIGHTS_STATE_KEY) || "{}");
    return { bank: clampBank(saved.bank || 1), scene: saved.scene || 1, displayBank: clampBank(saved.displayBank || saved.bank || 1), blackout: false, step: null };
  } catch {
    return { bank: 1, scene: 1, displayBank: 1, blackout: false, step: null };
  }
}
function clampBank(value) { return Math.max(1, Math.min(LIGHT_BANKS.length, Number(value) || 1)); }
function saveLightsState() {
  localStorage.setItem(LIGHTS_STATE_KEY, JSON.stringify({ bank: lx.bank, scene: lx.scene, displayBank: lx.displayBank }));
}
const pad2 = n => String(n).padStart(2, "0");
const bankOf = n => LIGHT_BANKS[n - 1];
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

function peopleCount(bank) {
  const cast = typeof CAST !== "undefined" ? CAST[bank.label] : null;
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

function stageSimSvg(bank, scene, blackout) {
  const ch = sceneChannels(scene.groups);
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
    const fx = i ? 690 : 310, fy = 30;
    const tx = 60 + c.values[0] / 255 * 880;
    const ty = 40 + c.values[1] / 255 * 520;
    const color = WHEEL[c.colour]?.[1] || "#ffffff";
    const spread = c.gobo === "Open" ? 34 : 50;
    const hitsFloor = ty > 250 && ty < 470;
    return `<defs>${beamGrad(`lxBeam${s}`, color, level, fx, fy, tx, ty)}</defs>
      <polygon points="${fx - 4},${fy} ${fx + 4},${fy} ${tx + spread},${ty} ${tx - spread},${ty}" fill="url(#lxBeam${s})"/>
      ${hitsFloor ? goboMark(tx, ty, color, c.gobo, (level * .9).toFixed(2)) : ""}`;
  }).join("");

  const n = peopleCount(bank);
  const rimColor = back[0].level >= back[1].level ? back[0].color : back[1].color;
  const bodyFill = mixHex("#17151d", faceColor, faceLevel * .38 + centre.level * .18 + sideLevel * .08);
  const rim = backLevel > .05 ? rimColor : "#2a2733";
  let cast = "";
  if (scene.people === "band") cast = performerSpots(n, bank.shape).map(([x, y]) => person(x, y, bodyFill, rim)).join("");
  if (scene.people === "hosts") {
    const hostFill = mixHex("#17151d", host[0].color, Math.max(host[0].level, faceLevel) * .9);
    cast = person(392, 452, hostFill, "#ffcf8f", 1.12) + person(608, 452, hostFill, "#ffcf8f", 1.12);
  }
  if (scene.people === "speaker") cast = `<rect x="478" y="392" width="44" height="52" rx="4" fill="#3a2f26"/>` + person(500, 395, mixHex("#17151d", centre.color, centre.level), rim, 1.05);
  if (scene.people === "lamp") cast = `<rect x="494" y="372" width="12" height="62" fill="#c9a24a"/><ellipse cx="500" cy="370" rx="22" ry="7" fill="#e0b85a"/><circle cx="500" cy="360" r="6" fill="#ffd36b"/>` +
    [[420, 420], [460, 430], [545, 430], [585, 420]].map(([x, y]) => person(x, y, bodyFill, rim)).join("");
  if (scene.people === "crowd") cast = performerSpots(12, "rows").map(([x, y]) => person(x, y, bodyFill, rim)).join("");

  const heads = Array.from({ length: 22 }, (_, i) => {
    const x = 20 + i * 46 + (i % 2) * 8, y = 548 + (i % 3) * 6;
    return `<ellipse cx="${x}" cy="${y}" rx="17" ry="14" fill="${mixHex("#0d0c12", blinder.color, blinder.level * .75)}"/>`;
  }).join("");

  const uid = `_${++simRenderCount}`;
  return `<svg class="lx-sim-svg" viewBox="0 0 1000 560" role="img" aria-label="Simulated stage for ${escLx(bank.label)} — ${escLx(scene.name)}">
    <defs>
      ${glow("lxBackL", back[0])}${glow("lxBackR", back[1])}${glow("lxSideFloorL", { color: side[0].color, level: side[0].level * .6 })}${glow("lxSideFloorR", { color: side[1].color, level: side[1].level * .6 })}${glow("lxHostL", host[0])}${glow("lxHostR", host[1])}${glow("lxCentre", centre)}${glow("lxBlind", blinder)}
      ${beamGrad("lxSideL", side[0].color, side[0].level, 40, 260, 600, 360)}${beamGrad("lxSideR", side[1].color, side[1].level, 960, 260, 400, 360)}
      ${beamGrad("lxCone5", back[0].color, back[0].level * .7, 360, 30, 360, 330)}${beamGrad("lxCone6", back[1].color, back[1].level * .7, 640, 30, 640, 330)}
      ${beamGrad("lxCone12", centre.color, centre.level * .8, 500, 30, 500, 380)}
      <linearGradient id="lxFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1a24"/><stop offset="1" stop-color="#2a2531"/></linearGradient>
    </defs>
    <rect width="1000" height="560" fill="#0c0b11"/>
    <image href="${bank.image}" x="285" y="52" width="430" height="196" preserveAspectRatio="xMidYMid slice" opacity=".9"/>
    <rect x="285" y="52" width="430" height="196" fill="none" stroke="#000" stroke-width="6"/>
    <text x="500" y="45" text-anchor="middle" fill="#8b8597" font-size="11" letter-spacing="3">LED WALL (separate system)</text>
    <polygon points="110,478 890,478 770,250 230,250" fill="url(#lxFloor)"/>
    <g style="mix-blend-mode:screen">
      <polygon points="350,30 370,30 470,330 250,330" fill="url(#lxCone5)"/>
      <polygon points="630,30 650,30 750,330 530,330" fill="url(#lxCone6)"/>
      <ellipse cx="380" cy="320" rx="300" ry="140" fill="url(#lxBackL)"/>
      <ellipse cx="620" cy="320" rx="300" ry="140" fill="url(#lxBackR)"/>
      <polygon points="40,262 40,290 640,470 560,292" fill="url(#lxSideL)"/>
      <polygon points="960,262 960,290 360,470 440,292" fill="url(#lxSideR)"/>
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
    ${[360, 640, 500].map(x => `<circle cx="${x}" cy="30" r="7" fill="#3a3744"/>`).join("")}
    <g style="mix-blend-mode:screen"><ellipse cx="500" cy="560" rx="620" ry="95" fill="url(#lxBlind)"/></g>
    ${heads}
    ${blackout ? `<rect width="1000" height="560" fill="#000" opacity=".9"/><image href="${bank.image}" x="285" y="52" width="430" height="196" preserveAspectRatio="xMidYMid slice" opacity=".75"/><text x="500" y="420" text-anchor="middle" fill="#ff6b6b" font-size="22" font-weight="700" letter-spacing="4">BLACKOUT</text>` : ""}
  </svg>`.replace(/\b(lx[A-Z][A-Za-z0-9]*)\b/g, `$1${uid}`);
}
let simRenderCount = 0;

const DEVICE_KEYS = {
  bankup: "BANK ▲", bankdown: "BANK ▼", prog: "PROGRAM", midi: "MIDI/ADD", auto: "AUTO/DEL",
  music: "MUSIC/BANK COPY", tap: "TAP/DISPLAY", blackout: "BLACKOUT", page: "PAGE SELECT", fade: "FADE TIME", speed: "SPEED"
};

function deviceSvg(highlight, faders, display, liveScene, blackout) {
  const hl = key => highlight.includes(key) ? " hl" : "";
  const btn = (key, x, y, w, h, label, extra = "") =>
    `<g class="dev-btn${hl(key)}${extra}" data-key="${key}" tabindex="0" role="button" aria-label="${escLx(label)}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>
      <text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${label}</text></g>`;
  const scanners = Array.from({ length: 12 }, (_, i) =>
    btn(`sc${i + 1}`, 28 + (i % 6) * 48, 70 + Math.floor(i / 6) * 46, 38, 32, i + 1)).join("");
  const scenes = Array.from({ length: 8 }, (_, i) =>
    btn(`scene${i + 1}`, 28 + i * 36, 182, 30, 32, i + 1, liveScene === i + 1 && !blackout ? " live" : "")).join("");
  const chases = Array.from({ length: 6 }, (_, i) => btn(`chase${i + 1}`, 28 + i * 48, 262, 38, 24, i + 1)).join("");
  const faderEls = Array.from({ length: 8 }, (_, i) => {
    const x = 362 + i * 40, v = faders?.[i] ?? 0, capY = 248 - v / 255 * 170 - 8;
    return `<g class="dev-fader${hl(`f${i + 1}`)}" data-key="f${i + 1}">
      <rect x="${x - 3}" y="78" width="6" height="170" rx="3" class="track"/>
      <rect x="${x - 14}" y="${capY.toFixed(1)}" width="28" height="16" rx="3" class="cap"/>
      <text x="${x}" y="268" text-anchor="middle" class="dev-small">${i + 1}</text>
      ${faders ? `<text x="${x}" y="${(capY - 5).toFixed(1)}" text-anchor="middle" class="dev-val">${v}</text>` : ""}</g>`;
  }).join("");
  const right = [["prog", "midi"], ["auto", "music"], ["bankup", "bankdown"], ["tap", "blackout"]].map((row, r) =>
    row.map((key, c) => btn(key, 712 + c * 88, 118 + r * 42, 80, 32, DEVICE_KEYS[key].replace("MUSIC/BANK COPY", "BANK COPY"), key === "blackout" ? ` danger${blackout ? " live" : ""}` : "")).join("")).join("");
  const slider = (key, x, label) => `<g class="dev-fader${hl(key)}" data-key="${key}"><text x="${x}" y="296" class="dev-label">${label}</text>
    <rect x="${x}" y="304" width="120" height="6" rx="3" class="track"/><rect x="${x + (key === "fade" ? 30 : 60)}" y="299" width="16" height="16" rx="3" class="cap"/></g>`;
  return `<svg class="lx-device-svg" viewBox="0 0 900 340" role="img" aria-label="Drawing of a generic DMX-512 192-channel controller">
    <rect x="4" y="4" width="892" height="332" rx="18" class="dev-body"/>
    <rect x="14" y="14" width="872" height="30" rx="8" class="dev-strip"/>
    <text x="28" y="34" class="dev-brand">DMX-512 CONTROLLER</text>
    <text x="872" y="34" text-anchor="end" class="dev-brand dim">192 CH · 12 SCANNERS × 16 CH · 30 BANKS × 8 SCENES</text>
    <text x="28" y="62" class="dev-label">SCANNERS</text>${scanners}
    <text x="28" y="174" class="dev-label">SCENES</text>${scenes}
    <text x="28" y="254" class="dev-label">CHASE</text>${chases}
    <text x="342" y="62" class="dev-label">FADERS · PAGE A = CH 1–8</text>${faderEls}
    ${btn("page", 342, 282, 96, 26, "PAGE A/B")}
    ${slider("speed", 470, "SPEED")}${slider("fade", 610, "FADE TIME")}
    <rect x="712" y="56" width="168" height="52" rx="6" class="dev-lcd"/>
    <text x="724" y="78" class="dev-lcd-text">${escLx(display[0])}</text>
    <text x="724" y="99" class="dev-lcd-text small">${escLx(display[1])}</text>
    ${right}
  </svg>`;
}

function faderText(group) {
  const names = group.kind === "mover" ? MOVER_FADERS : PAR_FADERS;
  return names.map((name, i) => `<span><em>F${i + 1}</em> ${name} <b>${group.values[i]}</b></span>`).join("");
}
function scannerLabel(list) { return list.map(s => `SCANNER ${s}`).join(" + "); }

function programSteps(bank) {
  const b = pad2(bank.bank);
  const steps = [
    { text: "Hold <b>PROGRAM</b> for 3 seconds until its light blinks. You are now in “record” mode.", keys: ["prog"] },
    { text: "Tap <b>PAGE A/B</b> until <b>A</b> is lit, so faders 1–8 control channels 1–8.", keys: ["page"] }
  ];
  bank.scenes.forEach((scene, i) => {
    const n = i + 1;
    steps.push({ head: `Scene ${n} · ${scene.name}` });
    if (scene.copyHosts) {
      steps.push({ text: `Copy the host look: press <b>BANK ▼</b> until the screen says <b>01</b>, then press <b>SCENE 3</b>. The faders now hold the host look.`, keys: ["bankdown", "scene3"] });
      steps.push({ text: `Press <b>BANK ▲</b> until the screen says <b>${b}</b> again.`, keys: ["bankup"] });
    } else {
      const groups = scene.extra || scene.groups;
      if (!scene.extra) steps.push({ text: "Clean slate: press all 12 <b>SCANNER</b> buttons, pull all 8 faders to the bottom (0), press all 12 again to let go.", keys: RIG.map(f => `sc${f.s}`), faders: [0, 0, 0, 0, 0, 0, 0, 0] });
      else steps.push({ text: `Don’t clean. Scene ${n} starts from Scene ${n - 1}. Only change these lights:`, keys: [] });
      groups.forEach(g => steps.push({
        text: `Press <b>${scannerLabel(g.scanners)}</b> (${g.scanners.map(s => RIG[s - 1].name).join(", ")}). Set the faders, then press the same button(s) again to let go.`,
        detail: faderText(g), keys: g.scanners.map(s => `sc${s}`), faders: [...g.values, 0, 0], scene: n
      }));
      steps.push({ text: `Check the screen says <b>BANK ${b}</b> (use <b>BANK ▲ / ▼</b>).`, keys: ["bankup", "bankdown"] });
    }
    steps.push({ text: `Press <b>MIDI/ADD</b>, then <b>SCENE ${n}</b>. Every light on the board blinks once = saved.`, keys: ["midi", `scene${n}`], scene: n });
  });
  steps.push({ head: "Finish" });
  steps.push({ text: "Hold <b>PROGRAM</b> for 3 seconds again to leave record mode. Press <b>SCENE 1</b> to check it.", keys: ["prog", "scene1"], scene: 1 });
  return steps;
}

function showSteps(bank) {
  const b = pad2(bank.bank);
  const steps = [];
  if (bank.bank === 1) {
    steps.push({ text: `Before doors open: press <b>BANK ▼</b> until the screen says <b>BANK 01</b>. Set <b>FADE TIME</b> to about a quarter (≈ 2 seconds) so every change is smooth.`, keys: ["bankdown", "fade"] });
  } else {
    steps.push({ text: `While the hosts are still talking, press <b>BANK ▲</b> once. The screen says <b>BANK ${b}</b>. The lights do <b>not</b> change yet; that’s normal.`, keys: ["bankup"] });
  }
  bank.scenes.forEach((scene, i) => steps.push({
    text: `When <b>${escLx(scene.trigger)}</b>: press <b>SCENE ${i + 1}</b> → ${escLx(scene.name)}.`, keys: [`scene${i + 1}`], scene: i + 1
  }));
  steps.push({ text: "Emergency only: <b>BLACKOUT</b> turns everything off. Press it again to bring the look back.", keys: ["blackout"], danger: true });
  return steps;
}

function renderLights() {
  const root = document.getElementById("lightsConsole");
  if (!root) return;
  const bank = bankOf(lx.bank);
  const scene = bank.scenes[Math.min(lx.scene, bank.scenes.length) - 1];
  const shows = showSteps(bank), progs = programSteps(bank);
  const active = lx.step ? (lx.step.list === "show" ? shows : progs)[lx.step.index] : null;
  const highlight = active?.keys || [];
  const faders = active?.faders || null;
  const display = [`BANK ${pad2(lx.displayBank)}`, lx.blackout ? "BLACKOUT" : `LIVE ${pad2(lx.bank)}·SC ${lx.scene}`];
  const onLights = scene.groups.filter(g => g.values[g.kind === "mover" ? 4 : 0] > 0);
  const lastByScanner = {};
  onLights.forEach(g => g.scanners.forEach(s => { lastByScanner[s] = g; }));

  root.innerHTML = `<div class="lx-page">
    <header class="lx-top">
      <div>
        <div class="eyebrow">Lighting desk · trainer</div>
        <h1>Lights</h1>
        <p>Pick an act from the list. You’ll see <b>what the stage will look like</b>, and <b>exactly which buttons to press</b> on the lighting board to get it.</p>
      </div>
      <ol class="lx-how">
        <li><i>1</i><span><b>Rehearsal day</b><br>Save every look once, using “Program it”.</span></li>
        <li><i>2</i><span><b>Show day</b><br>Press only BANK ▲ and SCENE buttons.</span></li>
        <li><i>3</i><span><b>Practise here</b><br>Click the drawn buttons. The stage reacts.</span></li>
      </ol>
    </header>

    <details class="lx-device-why">
      <summary><b>Which board is this?</b> A generic black <b>DMX-512 192-channel controller</b>, the most common board in Indian halls. Tap to see the light plan.</summary>
      <div class="lx-why-grid">
        <div>
          <p>This board is like a <b>TV remote with saved channels</b>. Each <b>BANK</b> is a folder (Bank 01, 02 …). Each folder holds up to <b>8 SCENES</b> (looks). On show day you open the folder and press a scene number. That’s it.</p>
          <p>The 12 <b>SCANNER</b> buttons pick which light you are adjusting. The <b>8 faders</b> are that light’s knobs: brightness, red, green, blue …</p>
          <p class="lx-note">If the hall has an Avolites/Pearl-style desk instead, the idea is the same: <b>Bank ≈ Page</b>, <b>Scene ≈ Playback/Cue</b>. The looks and colours below still apply.</p>
        </div>
        <table class="lx-rig"><thead><tr><th>Scanner</th><th>Light</th><th>DMX address</th></tr></thead><tbody>
          ${RIG.map(f => `<tr><td><b>${f.s}</b></td><td>${f.name}<small>${f.where}</small></td><td>${(f.s - 1) * 16 + 1}</td></tr>`).join("")}
        </tbody></table>
      </div>
      <p class="lx-note">Ask the hall’s light tech to set each fixture’s address to the number above, so <b>SCANNER n</b> controls that light. PAR lights use faders: 1 Dimmer · 2 Red · 3 Green · 4 Blue · 5 White · 6 Strobe (keep 0). Moving heads use: 1 Pan · 2 Tilt · 3 Colour · 4 Gobo · 5 Dimmer · 6 Shutter. If a light’s manual says otherwise, follow the manual.</p>
    </details>

    <div class="lx-shell">
      <aside class="lx-rail" aria-label="Banks">
        ${LIGHT_BANKS.map(item => {
          const colors = [...new Set(item.scenes[0].groups.filter(g => g.kind === "par" && g.values[0] > 0 && !g.scanners.includes(1)).map(g => `rgb(${g.values[1]},${g.values[2]},${g.values[3]})`))].slice(0, 3);
          return `<button class="lx-bank${item.bank === lx.bank ? " active" : ""}" data-bank="${item.bank}">
            <span class="lx-bank-num">${pad2(item.bank)}</span>
            <span class="lx-bank-copy"><b>${item.act ? `Act ${item.act} · ` : ""}${escLx(item.label)}</b><small>${escLx(item.theme)}</small></span>
            <span class="lx-swatches">${colors.map(c => `<i style="background:${c}"></i>`).join("")}</span></button>`;
        }).join("")}
      </aside>

      <section class="lx-main">
        <div class="lx-act-head">
          <div>
            <div class="eyebrow">Bank ${pad2(bank.bank)}${bank.act ? ` · Act ${bank.act}` : ""}</div>
            <h2>${escLx(bank.label)}</h2>
            <p class="lx-kid">${escLx(scene.kid)}</p>
          </div>
          <div class="lx-scene-tabs" role="tablist">
            ${bank.scenes.map((s, i) => `<button role="tab" class="${i + 1 === lx.scene ? "on" : ""}" data-scene="${i + 1}"><em>Scene ${i + 1}</em>${escLx(s.name)}</button>`).join("")}
          </div>
        </div>

        <figure class="lx-sim">
          ${stageSimSvg(bank, scene, lx.blackout)}
          <figcaption>
            <span class="lx-live-dot"></span> Showing <b>Bank ${pad2(lx.bank)} · Scene ${lx.scene} (${escLx(scene.name)})</b>. Press it when <b>${escLx(scene.trigger)}</b>.
          </figcaption>
        </figure>

        <div class="lx-chips">
          ${Object.keys(lastByScanner).length ? Object.entries(lastByScanner).map(([s, g]) => {
            const color = g.kind === "mover" ? WHEEL[g.colour][1] : `rgb(${Math.min(255, g.values[1] + g.values[4])},${Math.min(255, g.values[2] + g.values[4])},${Math.min(255, g.values[3] + g.values[4])})`;
            const level = Math.round((g.kind === "mover" ? g.values[4] : g.values[0]) / 2.55);
            return `<span><i style="background:${color}"></i>S${s} ${RIG[s - 1].name}${g.kind === "mover" ? ` · ${g.gobo.toLowerCase()}` : ""} <b>${level}%</b></span>`;
          }).join("") : "<span>All lights off</span>"}
        </div>

        <div class="lx-desk">
          <div class="lx-device">
            <div class="lx-device-head"><b>Your board</b><span>Click the buttons to practise. Yellow rings = press these now.</span></div>
            ${deviceSvg(highlight, faders, display, lx.displayBank === lx.bank ? lx.scene : 0, lx.blackout)}
          </div>

          <div class="lx-steps">
            <section>
              <h3><span class="lx-tag show">Show day</span> Press exactly this</h3>
              <ol>${shows.map((st, i) => `<li class="${st.danger ? "danger " : ""}${lx.step?.list === "show" && lx.step.index === i ? "on" : ""}" data-step="show:${i}"><i>${i + 1}</i><div>${st.text}</div></li>`).join("")}</ol>
            </section>
            <details class="lx-program"${lx.step?.list === "prog" ? " open" : ""}>
              <summary><span class="lx-tag prog">Rehearsal</span> Program this bank (do once)</summary>
              <ol>${(() => { let k = 0; return progs.map((st, i) => st.head
                ? `<li class="lx-step-head">${escLx(st.head)}</li>`
                : `<li class="${lx.step?.list === "prog" && lx.step.index === i ? "on" : ""}" data-step="prog:${i}"><i>${++k}</i><div>${st.text}${st.detail ? `<div class="lx-faders">${st.detail}</div>` : ""}</div></li>`).join(""); })()}</ol>
            </details>
          </div>
        </div>
        <p class="lx-foot">This page doesn’t send any signal to the real board. It’s a practice copy. Keys: ← → change bank · 1–${bank.scenes.length} scenes · X blackout.</p>
      </section>
    </div>
  </div>`;

  bindLights(root, shows, progs);
  const rail = root.querySelector(".lx-rail"), activeBank = root.querySelector(".lx-bank.active");
  if (rail && activeBank) {
    if (rail.scrollWidth > rail.clientWidth + 4) rail.scrollLeft = activeBank.offsetLeft - rail.clientWidth / 2 + activeBank.offsetWidth / 2;
    else rail.scrollTop = activeBank.offsetTop - rail.clientHeight / 2 + activeBank.offsetHeight / 2;
  }
}

function bindLights(root, shows, progs) {
  root.querySelectorAll("[data-bank]").forEach(btn => btn.addEventListener("click", () => selectBank(Number(btn.dataset.bank))));
  root.querySelectorAll("[data-scene]").forEach(btn => btn.addEventListener("click", () => { lx.scene = Number(btn.dataset.scene); lx.displayBank = lx.bank; lx.blackout = false; lx.step = null; commitLights(); }));
  root.querySelectorAll("[data-step]").forEach(li => li.addEventListener("click", () => {
    const [list, index] = li.dataset.step.split(":");
    const step = (list === "show" ? shows : progs)[Number(index)];
    lx.step = lx.step?.list === list && lx.step.index === Number(index) ? null : { list, index: Number(index) };
    if (lx.step && step.scene) { lx.scene = step.scene; lx.displayBank = lx.bank; lx.blackout = false; }
    commitLights();
  }));
  root.querySelectorAll(".lx-device-svg [data-key]").forEach(el => {
    el.addEventListener("click", () => pressDeviceKey(el.dataset.key));
    el.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); pressDeviceKey(el.dataset.key); } });
  });
}

function pressDeviceKey(key) {
  if (key === "bankup") lx.displayBank = clampBank(lx.displayBank + 1);
  else if (key === "bankdown") lx.displayBank = clampBank(lx.displayBank - 1);
  else if (key === "blackout") lx.blackout = !lx.blackout;
  else if (key.startsWith("scene")) {
    const n = Number(key.slice(5));
    const target = bankOf(lx.displayBank);
    if (n > target.scenes.length) return flashDeviceNote(`Bank ${pad2(target.bank)} has no Scene ${n} saved.`);
    lx.bank = target.bank; lx.scene = n; lx.blackout = false;
  } else return flashDeviceNote(`${DEVICE_KEYS[key] || key.toUpperCase()} is only used while programming. On show day you won’t need it.`);
  lx.step = null;
  commitLights();
}

function flashDeviceNote(text) {
  const head = document.querySelector(".lx-device-head span");
  if (!head) return;
  head.textContent = text;
  head.classList.add("warn");
}

function selectBank(n) {
  lx.bank = clampBank(n); lx.displayBank = lx.bank; lx.scene = 1; lx.blackout = false; lx.step = null;
  commitLights();
}

function commitLights() { saveLightsState(); renderLights(); }

document.addEventListener("keydown", event => {
  if (!document.getElementById("lightsView")?.classList.contains("active")) return;
  if (event.target.closest("input,textarea,select,[contenteditable]")) return;
  const bank = bankOf(lx.bank);
  if (event.key === "ArrowRight") { event.preventDefault(); selectBank(lx.bank + 1); }
  else if (event.key === "ArrowLeft") { event.preventDefault(); selectBank(lx.bank - 1); }
  else if (/^[1-8]$/.test(event.key) && Number(event.key) <= bank.scenes.length) { lx.scene = Number(event.key); lx.displayBank = lx.bank; lx.blackout = false; lx.step = null; commitLights(); }
  else if (event.key.toLowerCase() === "x") { lx.blackout = !lx.blackout; commitLights(); }
});

window.lightsRenderConsole = renderLights;
if (document.getElementById("lightsView")?.classList.contains("active")) renderLights();
