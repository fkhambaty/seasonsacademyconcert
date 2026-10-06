const LIGHTS_STATE_KEY = "seasons-lights-dmx192-v3";

const PAR_FADERS = ["Dimmer", "Red", "Green", "Blue", "White", "Strobe"];
const MOVER_FADERS = ["Pan", "Tilt", "Colour", "Gobo", "Dimmer", "Shutter"];

const RIG = [
  { s: 1, kind: "par", name: "Front wash · left", where: "Front-of-house bar, shines on faces from the audience side" },
  { s: 2, kind: "par", name: "Front wash · right", where: "Front-of-house bar, shines on faces from the audience side" },
  { s: 3, kind: "par", name: "Host special · left", where: "Tight warm pool on the left apron (FK)" },
  { s: 4, kind: "par", name: "Host special · right", where: "Tight warm pool on the right apron (Upasana)" },
  { s: 5, kind: "par", name: "Back wash · left", where: "Upstage bar, behind the performers (rim glow)" },
  { s: 6, kind: "par", name: "Back wash · right", where: "Upstage bar, behind the performers (rim glow)" },
  { s: 7, kind: "par", name: "Overhead colour · left", where: "On the bar above the stage, left end, shining down" },
  { s: 8, kind: "par", name: "Overhead colour · right", where: "On the bar above the stage, right end, shining down" },
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
  { title: "Tauba Tauba, Urvashi Urvashi Mashup", theme: "Magenta · cyan dance party", look: "dance", shape: "rows",
    trigger: "the first musical note", accentWhen: "the first big chorus",
    kid: "Pink light from behind, blue light from the bar above, and two moving lights crossing like dancers.",
    song: [FACE(75), P([5, 6], 90, "#e0218a"), P([7, 8], 80, "#00c8d8"), ...FAN(70, 120, "Cyan", "Dots", 70)],
    accent: [P([7, 8], 85, "#e0218a"), ...FAN(40, 160, "Magenta", "Dots", 80), P([11], 35, "#ffd6a6", 40)] },
  { title: "Bharat Humko Jaan Se Pyara Hai", theme: "Respectful tricolour from behind", look: "tricolor", shape: "line",
    trigger: "the first musical note", accentWhen: "the last chorus",
    kid: "Saffron from the left of the bar above, green from the right, clean white in the middle. Nothing moves. It feels proud and calm.",
    song: [FACE(80), P([5], 90, "#ff8a1a"), P([6], 90, "#138808"), P([7, 8], 55, "#ffffff", 60), P([12], 50, "#ffffff", 80)],
    accent: [...FAN(70, 25, "White", "Open", 60)] },
  { title: "Drum Circle", theme: "Fire-red drum circle", look: "drums", shape: "circle",
    trigger: "the first drum strike", accentWhen: "the big unison roll near the end",
    kid: "Red fire behind, orange from the bar above, and one round pool in the middle like a campfire.",
    song: [FACE(60), P([5, 6], 100, "#c1121f"), P([7, 8], 100, "#ff8c00"), P([12], 70, "#ff9d2e"), ...FAN(110, 200, "Red", "Breakup", 80)],
    accent: [P([11], 70, "#ffb347", 40), ...FAN(90, 210, "Amber", "Breakup", 100)] },
  { title: "Old Woman in a Shoe", theme: "Sunny storybook", look: "story", shape: "rows",
    trigger: "the first musical note", accentWhen: "the second verse",
    kid: "Bright like a picture book: sunny yellow behind, sky blue from the bar above, and a soft pink circle.",
    song: [FACE(85), P([5, 6], 70, "#ffd23f"), P([7, 8], 60, "#4cc9f0"), P([12], 40, "#ff9fb2", 30)],
    accent: [...FAN(30, 90, "Yellow", "Star", 50)] },
  { title: "Mission Impossible", theme: "Spy-movie steel blue", look: "spy", shape: "rows",
    trigger: "the theme begins", accentWhen: "the final build-up",
    kid: "Dark navy like a night mission. Two sharp white beams cross the stage like laser alarms.",
    song: [FACE(55), P([5, 6], 90, "#0b3d91"), P([7, 8], 40, "#dbe9ff", 40), ...FAN(40, 150, "White", "Open", 85)],
    accent: [P([7, 8], 0, "#000000"), ...FAN(80, 175, "Red", "Open", 95)] },
  { title: "We Are the Champions Mashup", theme: "Royal blue · stadium gold", look: "stadium", shape: "rows",
    trigger: "the first vocal note", accentWhen: "the “We are the champions” chorus",
    kid: "Royal blue like a trophy ribbon, gold from the bar above, and a warm lift toward the audience.",
    song: [FACE(80), P([5, 6], 85, "#1f4fd1"), P([7, 8], 70, "#f4c430"), ...FAN(90, 230, "Yellow", "Open", 70)],
    accent: [P([11], 80, "#ffe7a8", 60), ...FAN(60, 245, "White", "Open", 80)] },
  { title: "Raag Yaman", theme: "Midnight indigo · one golden pool", look: "raga", shape: "arc",
    trigger: "the first flute note", accentWhen: "the slow ending",
    kid: "Like a quiet night: deep indigo behind and one golden circle on the musicians. The moving lights stay off.",
    song: [FACE(65), P([5, 6], 70, "#1d2b64"), P([12], 80, "#f2b84b", 40)],
    accent: [P([5, 6], 55, "#2a1f6b"), P([12], 95, "#f2b84b", 50), FACE(45)] },
  { title: "The Flute Song", theme: "Mint garden", look: "flute", shape: "arc",
    trigger: "the first musical note", accentWhen: "the middle section",
    kid: "Fresh mint green like a garden, with warm white from the bar above so the little ones look bright.",
    song: [FACE(80), P([5, 6], 60, "#5ad1a4"), P([7, 8], 50, "#ffe6b3", 60)],
    accent: [...FAN(60, 205, "White", "Dots", 40)] },
  { title: "Saiyaara", theme: "Violet moonlight", look: "moon", shape: "rows",
    trigger: "the first musical note", accentWhen: "the hook line",
    kid: "Purple like a dream, moon-blue from the bar above, and a slow soft pattern on the floor like moonlight through leaves.",
    song: [FACE(65), P([5, 6], 85, "#6a3fb5"), P([7, 8], 55, "#4e7fd6"), ...FAN(100, 195, "Lavender", "Breakup", 45)],
    accent: [P([12], 55, "#e8e4ff", 60), ...FAN(120, 210, "Blue", "Breakup", 55)] },
  { title: "G Minute", theme: "Midnight strings · silver", look: "strings", shape: "arc",
    trigger: "the first violin note", accentWhen: "the final phrase",
    kid: "Dark blue night with silver-white edges, like moonlight on violins.",
    song: [FACE(70), P([5, 6], 75, "#10245c"), P([7, 8], 35, "#e8eef9", 50), P([12], 55, "#dfe8ff", 60)],
    accent: [...FAN(20, 70, "Blue", "Star", 30)] },
  { title: "Ghar More Pardesiya & Moh Moh Ke Dhaage", theme: "Rose · antique gold", look: "home", shape: "line",
    trigger: "the first vocal note", accentWhen: "the switch into Moh Moh Ke Dhaage",
    kid: "Rose pink behind, old gold from the bar above, like a lamp-lit room at home.",
    song: [FACE(75), P([5, 6], 70, "#b23a75"), P([7, 8], 65, "#d8a24a"), P([12], 60, "#ffd8a0", 40)],
    accent: [P([5, 6], 70, "#e0892f"), P([7, 8], 55, "#b23a75")] },
  { title: "Challa — Jab Tak Hai Jaan", theme: "Road-trip amber · teal", look: "highway", shape: "rows",
    trigger: "the first guitar note", accentWhen: "the chorus",
    kid: "Sunset orange behind and sea-teal from the bar above, like a highway at sunset.",
    song: [FACE(75), P([5, 6], 85, "#e07a1f"), P([7, 8], 65, "#1e9a95"), ...FAN(85, 140, "Amber", "Breakup", 50)],
    accent: [P([11], 30, "#ffc27a", 40), ...FAN(55, 185, "Amber", "Breakup", 70)] },
  { title: "Chammak Challo Mashup", theme: "Red · magenta party with gold beams", look: "disco", shape: "rows",
    trigger: "the first musical note", accentWhen: "the drop",
    kid: "Party time: red behind, pink from the bar above, and gold beams fanning out like a disco.",
    song: [FACE(80), P([5, 6], 95, "#d01535"), P([7, 8], 80, "#e0218a"), ...FAN(30, 110, "Yellow", "Open", 80)],
    accent: [P([11], 60, "#ffd6a6", 50), ...FAN(10, 95, "White", "Dots", 90)] },
  { title: "Eye of the Tiger, Gehra Hua Mashup", theme: "Boxing-ring red · hard white", look: "tiger", shape: "rows",
    trigger: "the first guitar note", accentWhen: "the guitar riff after the verse",
    kid: "Red like a boxing ring, hard white light from the bar above, and two straight beams like spotlights on fighters.",
    song: [FACE(70), P([5, 6], 100, "#c1121f"), P([7, 8], 80, "#ffffff", 80), ...FAN(105, 235, "White", "Open", 90)],
    accent: [P([7, 8], 90, "#c1121f"), ...FAN(105, 235, "Red", "Open", 100)] },
  { title: "Dil Diya Hai Jaan Bhi Denge — Karma", theme: "Tricolour from the bar above", look: "flag", shape: "line",
    trigger: "the first vocal note", accentWhen: "“Dil diya hai” chorus",
    kid: "The tricolour comes from the bar above: saffron on the left end, green on the right end, white behind.",
    song: [FACE(80), P([7], 85, "#ff8a1a"), P([8], 85, "#138808"), P([5, 6], 60, "#ffffff", 70), P([12], 60, "#ffffff", 80)],
    accent: [...FAN(80, 30, "White", "Open", 70)] },
  { title: "How Long — Charlie Puth", theme: "Purple · electric cyan", look: "neon", shape: "rows",
    trigger: "the first drum count", accentWhen: "the chorus",
    kid: "Purple behind, electric blue from the bar above, and pink dots dancing on the floor.",
    song: [FACE(70), P([5, 6], 85, "#6d2fb3"), P([7, 8], 70, "#00b4d8"), ...FAN(75, 200, "Magenta", "Dots", 60)],
    accent: [...FAN(45, 215, "Cyan", "Dots", 75)] },
  { title: "Final Countdown", theme: "Arena blue · gold hit", look: "countdown", shape: "rows",
    trigger: "the opening keyboard note", accentWhen: "the famous keyboard riff comes back",
    kid: "Big arena: blue behind, gold from the bar above, and white beams fanned wide.",
    song: [FACE(75), P([5, 6], 90, "#1438a6"), P([7, 8], 60, "#f4c430"), ...FAN(20, 85, "White", "Open", 90)],
    accent: [P([11], 100, "#ffe7a8", 70), ...FAN(50, 240, "Yellow", "Open", 100)] },
  { title: "O Haseena", theme: "Retro amber · ruby", look: "retro", shape: "line",
    trigger: "the first guitar note", accentWhen: "the chorus",
    kid: "Old-film colours: honey amber behind, ruby red from the bar above, little gold dots like a 70s dance floor.",
    song: [FACE(75), P([5, 6], 80, "#d9822b"), P([7, 8], 70, "#9b1d42"), ...FAN(95, 205, "Amber", "Dots", 50)],
    accent: [P([11], 40, "#ffd6a6", 40)] },
  { title: "Ajeeb Daastaan", theme: "Champagne · lavender finale", look: "finale", shape: "arc",
    trigger: "the first musical note", accentWhen: "the last chorus",
    kid: "The grand finale: champagne gold behind, lavender from the bar above, and soft beams opening toward the audience.",
    song: [FACE(85), P([5, 6], 75, "#d9b46b"), P([7, 8], 65, "#9a86d6"), P([12], 50, "#ffd8a0", 40), ...FAN(70, 245, "White", "Breakup", 40)],
    accent: [P([11], 50, "#ffe7a8", 50), ...FAN(40, 250, "Lavender", "Breakup", 60)] }
];

function oneLook(label, theme, look, people, trigger, kid, groups, extra = {}) {
  return { label, theme, look, kid, scene: { people, trigger, kid, groups }, ...extra };
}

const LIGHT_BANKS = [
  oneLook("Pre-show", "Soft welcome", "welcome", "none", "the doors open", "Soft warm glow so the stage looks ready but not busy.", [FACE(35), P([5, 6], 30, "#e0a050")]),
  oneLook("Opening video", "Dark, so the film shows", "opening", "none", "the house lights go down and the opening video starts", "The stage stays almost dark so the LED film is the star.", [P([5, 6], 25, "#4b2a8a"), ...FAN(60, 40, "Yellow", "Open", 35)]),
  oneLook("Hosts", "Warm circles on FK and Upasana", "welcome", "hosts", "FK and Upasana are talking", "Two warm circles on the hosts. The back of the stage stays dark so the crew can move. Use this same look every time the hosts talk.", HOSTS),
  oneLook("Speech", "One light on the speaker", "welcome", "speaker", "the speaker reaches the podium", "One bright round light on the speaker in the middle.", [FACE(70), P([12], 90, "#ffd8a0", 70), P([5, 6], 20, "#1b2a5c")]),
  oneLook("Lamp lighting", "Golden lamp glow", "diya", "lamp", "the guests reach the lamp", "Warm golden light, like the lamp itself is glowing.", [FACE(80), P([12], 90, "#ffb04a", 50), P([5, 6], 40, "#e0892f")]),
  oneLook("Icebreaker", "Hosts, with a little colour", "welcome", "hosts", "the hosts start the audience icebreaker", "Hosts lit, with a little teal on the stage so it feels fun.", [...HOSTS, P([5, 6], 40, "#1e9a95"), P([11], 30, "#ffd6a6", 40)]),
  ...ACT_LIGHTS.map((act, index) => oneLook(act.title, act.theme, act.look, "band", act.trigger, act.kid, act.song, {
    act: index + 1 + (index >= 9 ? 1 : 0),
    shape: act.shape
  })),
  oneLook("Felicitation", "Bright faces for photos", "finale", "crowd", "teachers and guests come on stage", "Bright and warm so every face looks good in photos.", [FACE(90), P([5, 6], 50, "#d9b46b"), P([7, 8], 40, "#9a86d6", 30)]),
  oneLook("Vote of thanks", "One light on the speaker", "welcome", "speaker", "the speaker reaches the podium", "One clean light on the speaker.", [FACE(70), P([12], 90, "#ffd8a0", 70), P([5, 6], 20, "#1b2a5c")]),
  oneLook("National anthem", "Plain white", "tricolor", "crowd", "the hosts ask everyone to stand", "Plain bright white. No colours, nothing moving.", [FACE(90), P([5, 6], 80, "#ffffff", 100), P([12], 70, "#ffffff", 100)]),
  oneLook("Show end", "Soft goodbye", "welcome", "none", "the anthem ends and people start to leave", "Soft warm stage while people leave.", [FACE(40), P([5, 6], 20, "#e0a050")])
];
LIGHT_BANKS.forEach((item, index) => { item.bank = index + 1; });

let lx = loadLightsState();

function loadLightsState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LIGHTS_STATE_KEY) || "{}");
    return { bank: clampBank(saved.bank || 1), displayBank: clampBank(saved.displayBank || saved.bank || 1), blackout: false };
  } catch {
    return { bank: 1, displayBank: 1, blackout: false };
  }
}
function clampBank(value) { return Math.max(1, Math.min(LIGHT_BANKS.length, Number(value) || 1)); }
function saveLightsState() {
  localStorage.setItem(LIGHTS_STATE_KEY, JSON.stringify({ bank: lx.bank, displayBank: lx.displayBank }));
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

function ledWall(look) {
  const dots = "<i></i><i></i><i></i><i></i><i></i><i></i><b></b>";
  return `<foreignObject x="285" y="52" width="430" height="196"><div xmlns="http://www.w3.org/1999/xhtml" class="lx-led-mini look-${look}"><div class="led-perform-art">${dots}</div></div></foreignObject>`;
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
      ${beamGrad("lxSideL", side[0].color, side[0].level, 340, 28, 430, 420)}${beamGrad("lxSideR", side[1].color, side[1].level, 660, 28, 570, 420)}
      ${beamGrad("lxFrontL", front[0].color, front[0].level * .45, 360, 28, 390, 450)}${beamGrad("lxFrontR", front[1].color, front[1].level * .45, 640, 28, 610, 450)}
      ${beamGrad("lxCone5", back[0].color, back[0].level * .7, 360, 30, 360, 330)}${beamGrad("lxCone6", back[1].color, back[1].level * .7, 640, 30, 640, 330)}
      ${beamGrad("lxCone12", centre.color, centre.level * .8, 500, 30, 500, 380)}
      <linearGradient id="lxFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1a24"/><stop offset="1" stop-color="#2a2531"/></linearGradient>
    </defs>
    <rect width="1000" height="560" fill="#0c0b11"/>
    ${ledWall(bank.look)}
    <rect x="285" y="52" width="430" height="196" fill="none" stroke="#000" stroke-width="6"/>
    <text x="500" y="45" text-anchor="middle" fill="#8b8597" font-size="11" letter-spacing="3">LED WALL (separate system)</text>
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
    ${blackout ? `<rect width="1000" height="560" fill="#000" opacity=".92"/><text x="500" y="420" text-anchor="middle" fill="#ff6b6b" font-size="22" font-weight="700" letter-spacing="4">BLACKOUT</text>` : ""}
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
    `<g class="dev-btn${hl(key)}${extra}" aria-label="${escLx(label)}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>
      <text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${label}</text></g>`;
  const scanners = Array.from({ length: 12 }, (_, i) =>
    btn(`sc${i + 1}`, 28 + (i % 6) * 48, 70 + Math.floor(i / 6) * 46, 38, 32, i + 1)).join("");
  const scenes = Array.from({ length: 8 }, (_, i) =>
    btn(`scene${i + 1}`, 28 + i * 36, 182, 30, 32, i + 1, liveScene === i + 1 && !blackout ? " live" : "")).join("");
  const chases = Array.from({ length: 6 }, (_, i) => btn(`chase${i + 1}`, 28 + i * 48, 262, 38, 24, i + 1)).join("");
  const faderEls = Array.from({ length: 8 }, (_, i) => {
    const x = 362 + i * 40, v = faders?.[i] ?? 0, capY = 214 - v / 255 * 128;
    return `<g class="dev-fader${hl(`f${i + 1}`)}">
      <rect x="${x - 3}" y="86" width="6" height="150" rx="3" class="track"/>
      <rect x="${x - 16}" y="${capY.toFixed(1)}" width="32" height="22" rx="4" class="cap"/>
      <text x="${x}" y="268" text-anchor="middle" class="dev-small">${i + 1}</text>
      ${faders ? `<text x="${x}" y="${(capY + 15).toFixed(1)}" text-anchor="middle" class="dev-cap-num">${v}</text>` : ""}</g>`;
  }).join("");
  const right = [["prog", "midi"], ["auto", "music"], ["bankup", "bankdown"], ["tap", "blackout"]].map((row, r) =>
    row.map((key, c) => btn(key, 712 + c * 88, 118 + r * 42, 80, 32, DEVICE_KEYS[key].replace("MUSIC/BANK COPY", "BANK COPY"), key === "blackout" ? ` danger${blackout ? " live" : ""}` : "")).join("")).join("");
  const slider = (key, x, label) => `<g class="dev-fader${hl(key)}"><text x="${x}" y="296" class="dev-label">${label}</text>
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

function handMoves(bank) {
  const b = pad2(bank.bank);
  const scene = bank.scene;
  const show = [
    {
      title: "Match this screen",
      text: `Press <b>BANK ▲</b> or <b>BANK ▼</b> until the green screen says <b>BANK ${b}</b>. Stop there. The lights do not change yet.`,
      keys: ["bankup", "bankdown"],
      display: [`BANK ${b}`, "READY"]
    },
    {
      title: "Press this one button",
      text: `When <b>${escLx(scene.trigger)}</b>, press <b>SCENE 1</b>. That is the only button for this look.`,
      keys: ["scene1"],
      display: [`BANK ${b}`, "SCENE 1"],
      live: 1
    }
  ];
  const save = [
    {
      title: "Open save mode",
      text: "Hold <b>PROGRAM</b> for 3 seconds, until its light blinks.",
      keys: ["prog"],
      display: [`BANK ${b}`, "RECORD"]
    },
    {
      title: "Use the top row of faders",
      text: "Press <b>PAGE A/B</b> until <b>A</b> is lit. Faders 1 to 8 now match the names under each picture.",
      keys: ["page"],
      display: [`BANK ${b}`, "PAGE A"]
    },
    {
      title: "Put every light at zero",
      text: "Press all 12 <b>SCANNER</b> buttons so they light up. Pull all 8 faders down to <b>0</b>. Press the same 12 buttons again so they go dark.",
      keys: RIG.map(fixture => `sc${fixture.s}`),
      faders: [0, 0, 0, 0, 0, 0, 0, 0],
      display: [`BANK ${b}`, "CLEAR"]
    }
  ];
  scene.groups.forEach(group => {
    save.push({
      title: scannerLabel(group.scanners),
      text: `${group.scanners.map(scanner => RIG[scanner - 1].name).join(" and ")}. Slide the faders until each cap shows the number below. Then press the same scanner button again so it goes dark.`,
      detail: faderText(group),
      keys: group.scanners.map(scanner => `sc${scanner}`),
      faders: [...group.values, 0, 0].slice(0, 8),
      display: [`BANK ${b}`, `SC ${group.scanners.join(" ")}`]
    });
  });
  save.push({
    title: "Store it on Scene 1",
    text: "Press <b>MIDI/ADD</b>, then press <b>SCENE 1</b>. The buttons blink once. The look is saved.",
    keys: ["midi", "scene1"],
    display: [`BANK ${b}`, "SAVED"],
    live: 1
  });
  save.push({
    title: "Close save mode",
    text: "Hold <b>PROGRAM</b> for 3 seconds again, until its light stops blinking.",
    keys: ["prog"],
    display: [`BANK ${b}`, "SCENE 1"],
    live: 1
  });
  return { show, save };
}

function moveCard(move, number) {
  return `<article class="lx-move">
    <div class="lx-move-copy"><i>${number}</i><div><b>${escLx(move.title)}</b><p>${move.text}</p>${move.detail ? `<div class="lx-faders">${move.detail}</div>` : ""}</div></div>
    <div class="lx-move-board">${deviceSvg(move.keys, move.faders || null, move.display, move.live || 0, false)}</div>
  </article>`;
}

function renderLights() {
  const root = document.getElementById("lightsConsole");
  if (!root) return;
  const bank = bankOf(lx.bank);
  const scene = bank.scene;
  const hosts = LIGHT_BANKS.find(item => item.label === "Hosts");
  const { show, save } = handMoves(bank);
  const onLights = scene.groups.filter(group => group.values[group.kind === "mover" ? 4 : 0] > 0);
  const lastByScanner = {};
  onLights.forEach(group => group.scanners.forEach(scanner => { lastByScanner[scanner] = group; }));

  root.innerHTML = `<div class="lx-page">
    <header class="lx-top">
      <div>
        <div class="eyebrow">Lighting desk · one look each</div>
        <h1>Lights</h1>
        <p>Each name in the list is <b>one</b> light look. Copy the board pictures with your hands. Yellow rings are the buttons to press. The fader caps show the exact height.</p>
      </div>
      <ol class="lx-how">
        <li><i>1</i><span><b>On the show</b><br>Copy only the first two pictures.</span></li>
        <li><i>2</i><span><b>Before Friday</b><br>Copy the save pictures once.</span></li>
        <li><i>3</i><span><b>Hosts talking</b><br>Always Bank ${pad2(hosts.bank)}, Scene 1.</span></li>
      </ol>
    </header>

    <details class="lx-device-why">
      <summary><b>Which board is this?</b> A generic black <b>DMX-512 192-channel controller</b>, the most common board in Indian halls. Tap to see which light is which scanner.</summary>
      <div class="lx-why-grid">
        <div>
          <p>Think of <b>BANK</b> as a folder and <b>SCENE 1</b> as the one saved picture inside it. Every act has its own folder, and only one picture.</p>
          <p>A <b>SCANNER</b> button chooses which light you are holding. The <b>faders</b> are that light’s sliders. You slide them only while saving, before the show.</p>
        </div>
        <table class="lx-rig"><thead><tr><th>Scanner</th><th>Light</th><th>DMX address</th></tr></thead><tbody>
          ${RIG.map(fixture => `<tr><td><b>${fixture.s}</b></td><td>${fixture.name}<small>${fixture.where}</small></td><td>${(fixture.s - 1) * 16 + 1}</td></tr>`).join("")}
        </tbody></table>
      </div>
      <p class="lx-note">Ask the hall’s light person to set each light’s address to the number above, so Scanner 1 really is the front wash. On a PAR light the faders are 1 Dimmer, 2 Red, 3 Green, 4 Blue, 5 White, 6 Strobe (leave it at 0). On a moving head they are 1 Pan, 2 Tilt, 3 Colour, 4 Gobo, 5 Dimmer, 6 Shutter. If that light’s paper says different numbers, follow the paper.</p>
    </details>

    <div class="lx-shell">
      <aside class="lx-rail" aria-label="Looks">
        ${LIGHT_BANKS.map(item => {
          const colors = [...new Set(item.scene.groups.filter(group => group.kind === "par" && group.values[0] > 0 && !group.scanners.includes(1)).map(group => `rgb(${group.values[1]},${group.values[2]},${group.values[3]})`))].slice(0, 3);
          return `<button class="lx-bank${item.bank === lx.bank ? " active" : ""}" data-bank="${item.bank}">
            <span class="lx-bank-num">${pad2(item.bank)}</span>
            <span class="lx-bank-copy"><b>${item.act ? `Act ${item.act} · ` : ""}${escLx(item.label)}</b><small>${escLx(item.theme)}</small></span>
            <span class="lx-swatches">${colors.map(color => `<i style="background:${color}"></i>`).join("")}</span></button>`;
        }).join("")}
      </aside>

      <section class="lx-main">
        <div class="lx-act-head">
          <div>
            <div class="eyebrow">Bank ${pad2(bank.bank)} · Scene 1 only${bank.act ? ` · Act ${bank.act}` : ""}</div>
            <h2>${escLx(bank.label)}</h2>
            <p class="lx-kid">${escLx(scene.kid)}</p>
          </div>
        </div>

        <figure class="lx-sim">
          ${stageSimSvg(bank, scene, lx.blackout)}
          <figcaption>
            <span class="lx-live-dot"></span> This is the only look. Press <b>Scene 1</b> when <b>${escLx(scene.trigger)}</b>.
          </figcaption>
        </figure>

        <div class="lx-chips">
          ${Object.keys(lastByScanner).length ? Object.entries(lastByScanner).map(([scanner, group]) => {
            const color = group.kind === "mover" ? WHEEL[group.colour][1] : `rgb(${Math.min(255, group.values[1] + group.values[4])},${Math.min(255, group.values[2] + group.values[4])},${Math.min(255, group.values[3] + group.values[4])})`;
            const level = Math.round((group.kind === "mover" ? group.values[4] : group.values[0]) / 2.55);
            return `<span><i style="background:${color}"></i>S${scanner} ${RIG[scanner - 1].name}${group.kind === "mover" ? ` · ${group.gobo.toLowerCase()}` : ""} <b>${level}%</b></span>`;
          }).join("") : "<span>All lights off</span>"}
        </div>

        <section class="lx-copy">
          <h3><span class="lx-tag show">On the show</span> Copy these two pictures</h3>
          ${show.map((move, index) => moveCard(move, index + 1)).join("")}
        </section>
        <section class="lx-copy">
          <h3><span class="lx-tag prog">Before Friday</span> Copy these pictures once, then never during the song</h3>
          ${save.map((move, index) => moveCard(move, index + 1)).join("")}
        </section>
      </section>
    </div>
  </div>`;

  root.querySelectorAll("[data-bank]").forEach(button => button.addEventListener("click", () => selectBank(Number(button.dataset.bank))));
  const rail = root.querySelector(".lx-rail"), activeBank = root.querySelector(".lx-bank.active");
  if (rail && activeBank) {
    if (rail.scrollWidth > rail.clientWidth + 4) rail.scrollLeft = activeBank.offsetLeft - rail.clientWidth / 2 + activeBank.offsetWidth / 2;
    else rail.scrollTop = activeBank.offsetTop - rail.clientHeight / 2 + activeBank.offsetHeight / 2;
  }
}

function selectBank(n) {
  lx.bank = clampBank(n);
  lx.displayBank = lx.bank;
  lx.blackout = false;
  commitLights();
}

function commitLights() { saveLightsState(); renderLights(); }

document.addEventListener("keydown", event => {
  if (!document.getElementById("lightsView")?.classList.contains("active")) return;
  if (event.target.closest("input,textarea,select,[contenteditable]")) return;
  if (event.key === "ArrowRight") { event.preventDefault(); selectBank(lx.bank + 1); }
  else if (event.key === "ArrowLeft") { event.preventDefault(); selectBank(lx.bank - 1); }
});

window.lightsRenderConsole = renderLights;
if (document.getElementById("lightsView")?.classList.contains("active")) renderLights();
