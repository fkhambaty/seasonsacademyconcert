const LIGHTS_STATE_KEY = "seasons-lights-cue-v1";

const LIGHT_ACTS = [
  ["Tauba Tauba, Urvashi Urvashi Mashup", "Magenta · cyan dance", "#e43b9a", "#16b9cf", "#ffd37a", "Medium", "First musical note"],
  ["Bharat Humko Jaan Se Pyara Hai", "Respectful tricolour", "#ff9933", "#138808", "#ffffff", "Still", "First musical note"],
  ["Drum Circle", "Amber · red percussion", "#ef8e28", "#b5202d", "#ffd166", "Rhythmic", "First drum strike"],
  ["Old Woman Shoe", "Sunny storybook", "#ffd34e", "#51b9e8", "#fff2c7", "Gentle", "First musical note"],
  ["Mission Impossible", "Steel blue · white", "#19558f", "#101b35", "#dcecff", "Slow sweep", "Theme begins"],
  ["We Are the Champions Mashup", "Royal blue · gold", "#2047a8", "#d3a52d", "#fff1b3", "Gentle", "First vocal note"],
  ["Raag Yaman", "Midnight blue · gold", "#172d65", "#bc8a24", "#ffe2a0", "Still", "First flute note"],
  ["The Flute Song", "Mint · warm white", "#72c6a4", "#d9b978", "#fff1cf", "Still", "First musical note"],
  ["Saiyaara", "Violet · moon blue", "#653d9c", "#315f9f", "#d8d8ff", "Very slow", "First musical note"],
  ["G Minute", "Midnight strings", "#182748", "#5c4b86", "#c8d7ff", "Still", "First violin note"],
  ["Ghar More Pardesiya & Moh Moh Ke Dhaage", "Rose · antique gold", "#9a3e68", "#b98a3c", "#ffe0b1", "Still", "First vocal note"],
  ["Challa — Jab Tak Hai Jaan", "Road amber · teal", "#bd6a28", "#1d7b78", "#ffd19a", "Slow", "First guitar note"],
  ["Chammak Challo Mashup", "Red · magenta · gold", "#bd2137", "#d52f88", "#ffc75f", "Medium", "First musical note"],
  ["Eye of the Tiger, Gehra Hua Mashup", "Red · steel white", "#b91e2b", "#23334f", "#ffffff", "Strong", "First guitar note"],
  ["Dil Diya Hai Jaan Bhi Denge — Karma", "Saffron · white · green", "#ff9933", "#138808", "#ffffff", "Still", "First vocal note"],
  ["How Long — Charlie Puth", "Purple · electric cyan", "#713ea0", "#138fa9", "#e7c5ff", "Medium", "First drum count"],
  ["Final Countdown", "Arena blue · gold", "#173f91", "#d6a72e", "#ffffff", "Strong", "Opening keyboard note"],
  ["O Haseena", "Retro amber · ruby", "#c57229", "#8f263c", "#ffe0a3", "Gentle", "First guitar note"],
  ["Ajeeb Daastaan", "Champagne · lavender", "#b89551", "#6d5b8f", "#fff0c9", "Very slow", "First musical note"]
];

function lightLook(id, title, kind, trigger, primary, secondary, accent, movement, note, levels = {}) {
  return {
    id, title, kind, trigger, primary, secondary, accent, movement, note,
    front: levels.front ?? 70,
    stage: levels.stage ?? 70,
    beams: levels.beams ?? 35,
    audience: levels.audience ?? 0,
    hosts: levels.hosts ?? 0,
    house: levels.house ?? 0,
    curtain: levels.curtain ?? "OPEN"
  };
}

const LIGHTING_CUES = [
  lightLook("house-open", "Audience entering", "PRE-SHOW", "Before doors open", "#d39c55", "#5f4631", "#f3d5a0", "Still", "House lights full. Stage at a calm warm glow; curtain open so the LED is visible.", {front:35, stage:28, beams:0, house:100}),
  lightLook("opening", "Cinematic opening", "OPENING", "LED cinematic opening starts", "#b8892f", "#332054", "#fff0b0", "Slow fan", "House fades to zero. Keep the stage empty and let the LED lead.", {front:18, stage:45, beams:55}),
  lightLook("host-welcome", "FK & Upasana welcome", "HOSTS", "Stage manager says “Hosts, go”", "#d89d55", "#1c2028", "#ffe4b5", "Still", "Two warm apron specials. Deep stage near-black; LED remains visible.", {front:20, stage:12, beams:0, hosts:100}),
  lightLook("speech", "Welcome speech — Sonal", "SPEECH", "Hosts call Sonal", "#e6bd7a", "#403424", "#fff4d5", "Still", "Clean warm speaking light at centre. No colour movement.", {front:75, stage:30, beams:0}),
  lightLook("lamp", "Lighting the lamp", "CEREMONY", "Guests reach the lamp", "#e39a28", "#6e3818", "#fff0b0", "Still", "Warm gold around the lamp and guests. Keep faces bright for photographs.", {front:85, stage:50, beams:0}),
  lightLook("icebreaker", "Joseph starts the bus", "HOSTS + GUITAR", "Joseph enters with guitar", "#d99a45", "#205f70", "#fff0c0", "Gentle", "Warm hosts plus a soft guitar area. No fast movement.", {front:62, stage:55, beams:15, hosts:75})
];

LIGHT_ACTS.forEach((act, index) => {
  const [title, theme, primary, secondary, accent, movement, trigger] = act;
  const number = index + 1 + (index >= 9 ? 1 : 0);
  LIGHTING_CUES.push(lightLook(
    `act-${number}`,
    title,
    `ACT ${number} · ${theme}`,
    trigger,
    primary,
    secondary,
    accent,
    movement,
    number === 2 || number === 16
      ? "Keep colour on the back and sides; performers’ faces stay neutral white."
      : "Face light stays warm and readable. Colour belongs on the back and sides.",
    {front:78, stage:78, beams:movement === "Still" ? 12 : movement === "Strong" ? 65 : 38}
  ));
  LIGHTING_CUES.push(lightLook(
    `hosts-after-${number}`,
    `Hosts after ${title}`,
    "CHANGEOVER · HOST LOOK",
    "Final note ends; applause begins",
    "#d89d55",
    "#12171f",
    "#ffe2ad",
    "Still",
    "Hold the song colour for two seconds of applause, then fade to warm hosts. Crew changes equipment on the deep stage in darkness.",
    {front:18, stage:9, beams:0, hosts:100}
  ));
});

LIGHTING_CUES.push(
  lightLook("felicitation", "Felicitation Ceremony", "CEREMONY", "FK announces felicitation", "#d2a13d", "#5e3c6d", "#fff1bb", "Still", "Bright, flattering warm light for faces and photographs.", {front:88, stage:58, beams:12}),
  lightLook("thanks", "Vote of Thanks — Joseph", "SPEECH", "Joseph walks to centre", "#e0b56b", "#312b42", "#fff4d5", "Still", "Single clean speaking look. Keep the background soft.", {front:82, stage:32, beams:0}),
  lightLook("anthem", "National Anthem", "CEREMONY", "FK asks everyone to rise", "#ffffff", "#ffffff", "#ffffff", "None", "No movement, chase, strobe or coloured faces. Neutral white stage and gentle house light.", {front:90, stage:85, beams:0, house:35}),
  lightLook("show-end", "Show complete", "END", "Anthem ends", "#d39c55", "#5f4631", "#f3d5a0", "Still", "Bring house lights smoothly to full for a safe audience exit.", {front:35, stage:30, beams:0, house:100})
);

let lightSelectedIndex = Math.max(0, LIGHTING_CUES.findIndex(cue => cue.id === localStorage.getItem(LIGHTS_STATE_KEY)));
let lightLiveIndex = -1;
let lightPaused = false;
let lightBlackout = false;
let lightMaster = 100;
let lightHouseOverride = false;
let lightWorklight = false;
let lightCurtainClosed = false;
const lightExecutors = [true, true, true, true, true, true, true, false];

function lightEscape(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function lightReadout(cue) {
  return `
    <div><small>Theme</small><b><i class="light-swatch" style="--swatch:${cue.primary}"></i>${lightEscape(cue.kind)}</b></div>
    <div><small>Movement</small><b>${lightEscape(cue.movement)}</b></div>
    <div><small>Face light</small><b>${cue.front}% · warm white</b></div>
    <div><small>Stage colour</small><b>${cue.stage}% · ${lightEscape(cue.primary)} / ${lightEscape(cue.secondary)}</b></div>
    <div><small>Host apron</small><b>${cue.hosts ? `${cue.hosts}% · two specials` : "Off"}</b></div>
    <div><small>House</small><b>${cue.house}%</b></div>`;
}

function renderLights() {
  const root = document.getElementById("lightsConsole");
  if (!root) return;
  const selected = LIGHTING_CUES[lightSelectedIndex];
  const live = lightLiveIndex >= 0 ? LIGHTING_CUES[lightLiveIndex] : null;
  root.innerHTML = `
    <div class="lights-page-shell">
      <div class="lights-page">
        <div class="lights-head">
          <div><div class="eyebrow">Vitthal Tupe Patil Auditorium · operator rehearsal</div><h1>Lighting console</h1><p>This imitates the common playback area of a black theatre desk. Practise the cues here; program the same looks as numbered memories on the auditorium’s real console.</p></div>
          <div class="lights-warning"><b>Important:</b> this page is a simulator and cue sheet. It does not send DMX, Art-Net or any signal to the real lights.</div>
        </div>
        <div class="lights-workspace">
          <aside class="lights-stack">
            <div class="lights-stack-head"><small>Cue stack · click to select</small><strong>${LIGHTING_CUES.length} prepared looks</strong></div>
            <div class="lights-cues">${LIGHTING_CUES.map((cue, index) => `
              <button class="light-cue ${index === lightSelectedIndex ? "selected" : ""} ${index === lightLiveIndex ? "live" : ""}" data-light-cue="${index}" type="button">
                <span class="light-cue-num">${String(index + 1).padStart(2, "0")}</span>
                <span><strong>${lightEscape(cue.title)}</strong><span>${lightEscape(cue.trigger)}</span></span>
                <i class="light-cue-dot" style="--cue:${cue.primary}"></i>
              </button>`).join("")}</div>
          </aside>
          <section class="lights-desk" aria-label="Lighting desk simulator">
            <div class="desk-display">
              <div class="light-stage-monitor ${lightBlackout ? "blackout" : ""} ${lightHouseOverride || (live?.house || 0) > 0 ? "house-on" : ""} ${lightExecutors[6] ? "" : "led-off"}" id="lightStageMonitor"
                style="--wash-a:${live?.primary || "#262832"};--wash-b:${live?.secondary || "#15161b"};--accent:${live?.accent || "#777"};--beam:${live?.accent || "#fff"};--front-level:${lightExecutors[0] ? ((live?.front || 0) / 100) * lightMaster / 100 : 0};--stage-level:${lightExecutors[2] ? ((live?.stage || 0) / 100) * lightMaster / 100 : 0};--beam-level:${lightExecutors[4] ? ((live?.beams || 0) / 100) * lightMaster / 100 : 0};--host-level:${lightExecutors[1] ? ((live?.hosts || 0) / 100) * lightMaster / 100 : 0};--audience-level:${lightExecutors[5] ? (lightHouseOverride ? .8 : ((live?.house || live?.audience || 0) / 100) * lightMaster / 100) : 0};--work-level:${lightExecutors[7] ? .45 : 0}">
                <span class="monitor-badge">${live ? `LIVE ${String(lightLiveIndex + 1).padStart(2, "0")}` : "NO CUE LIVE"}</span>
                <span class="monitor-master">MASTER ${lightMaster}%</span>
                <div class="light-led">LED WALL · CURTAIN ${lightCurtainClosed ? "CLOSED" : "OPEN"}</div>
                <div class="light-floor">
                  <div class="light-wash"></div><div class="light-front-wash"></div><div class="light-beams"></div>
                  <div class="light-host-spot left"></div><div class="light-host-spot right"></div>
                  <div class="light-audience-glow"></div><div class="light-worklight"></div>
                </div>
                <div class="light-curtain ${lightCurtainClosed ? "closed" : ""}"></div>
              </div>
              <div class="cue-monitor">
                <small>Selected next cue ${String(lightSelectedIndex + 1).padStart(2, "0")}</small>
                <h2>${lightEscape(selected.title)}</h2>
                <div class="light-trigger">GO when: ${lightEscape(selected.trigger)}</div>
                <div class="look-readout">${lightReadout(selected)}</div>
                <p>${lightEscape(selected.note)}</p>
              </div>
            </div>
            <div class="desk-strip">
              <div class="playbacks">${[
                ["Front","FRONT", "#f4d49c", 78],
                ["Hosts","HOSTS", "#ffd27c", live?.hosts || 0],
                ["Stage","WASH", live?.primary || "#555", live?.stage || 0],
                ["Back","BACK", live?.secondary || "#555", 70],
                ["Beams","BEAMS", live?.accent || "#fff", live?.beams || 0],
                ["Audience","AUDIENCE", "#f2cf92", live?.audience || 0],
                ["LED","LED", "#6455bd", 100],
                ["Work","WORKLIGHT", "#376eaf", lightWorklight ? 35 : 0]
              ].map((item, index) => `
                <div class="playback"><button type="button" data-executor="${index}" class="${lightExecutors[index] ? "on" : ""}" style="--key:${item[2]}">${index + 1}</button><div class="fader-track"><i class="fader-cap" style="--value:${Math.min(88, item[3] * .88)}%"></i></div><span>${item[0]}<br>${item[1]}</span></div>`).join("")}</div>
              <div class="transport">
                <button type="button" class="desk-key back" id="lightBack">BACK<br><small>B</small></button>
                <button type="button" class="desk-key pause ${lightPaused ? "on" : ""}" id="lightPause">PAUSE<br><small>P</small></button>
                <button type="button" class="desk-key dbo ${lightBlackout ? "on" : ""}" id="lightBlackout">DBO<br><small>X</small></button>
                <button type="button" class="desk-key go" id="lightGo">GO <small>SPACE</small></button>
                <button type="button" class="desk-key house ${lightHouseOverride ? "on" : ""}" id="lightHouse">HOUSE<br><small>H</small></button>
              </div>
            </div>
            <div class="master-block">
              <label for="lightMaster">Grand master</label><input id="lightMaster" type="range" min="0" max="100" value="${lightMaster}"><output>${lightMaster}%</output>
              <button type="button" class="desk-key" id="lightCurtain">CURTAIN<br>${lightCurtainClosed ? "CLOSED" : "OPEN"}</button>
            </div>
          </section>
        </div>
        <div class="lights-help">
          <article><b>1 · Before rehearsal</b>Ask the venue operator to save these looks as numbered memories in this same order.</article>
          <article><b>2 · Select, then GO</b>The yellow outline is next. Green is currently live. Click any cue to recover from a missed cue.</article>
          <article><b>3 · Curtain stays open</b>Close it only for a major reset. With it closed, the LED behind it cannot be seen.</article>
          <article><b>4 · Emergency</b>DBO blacks out stage lamps; it is not a safe-show ending. HOUSE brings audience lights up.</article>
        </div>
        <p class="light-footer-note">Shortcuts: Space/G = GO · B = back · P = pause · X = blackout · H = house · 1–8 = playback buttons. The trained operator still follows the stage manager’s spoken “GO”.</p>
      </div>
    </div>`;
  bindLights();
  requestAnimationFrame(() => {
    const selectedButton = root.querySelector(".light-cue.selected");
    const cueList = root.querySelector(".lights-cues");
    if (!selectedButton || !cueList) return;
    const top = selectedButton.offsetTop;
    const bottom = top + selectedButton.offsetHeight;
    if (top < cueList.scrollTop) cueList.scrollTop = top;
    if (bottom > cueList.scrollTop + cueList.clientHeight) cueList.scrollTop = bottom - cueList.clientHeight;
  });
}

function selectLightCue(index) {
  lightSelectedIndex = Math.max(0, Math.min(LIGHTING_CUES.length - 1, index));
  localStorage.setItem(LIGHTS_STATE_KEY, LIGHTING_CUES[lightSelectedIndex].id);
  renderLights();
}

function goLightCue() {
  if (lightPaused) lightPaused = false;
  lightLiveIndex = lightSelectedIndex;
  lightSelectedIndex = Math.min(LIGHTING_CUES.length - 1, lightLiveIndex + 1);
  localStorage.setItem(LIGHTS_STATE_KEY, LIGHTING_CUES[lightSelectedIndex].id);
  renderLights();
}

function backLightCue() {
  lightLiveIndex = Math.max(0, lightLiveIndex - 1);
  lightSelectedIndex = Math.min(LIGHTING_CUES.length - 1, lightLiveIndex + 1);
  renderLights();
}

function bindLights() {
  const root = document.getElementById("lightsConsole");
  root.querySelectorAll("[data-light-cue]").forEach(button => {
    button.addEventListener("click", () => selectLightCue(Number(button.dataset.lightCue)));
  });
  root.querySelector("#lightGo")?.addEventListener("click", goLightCue);
  root.querySelector("#lightBack")?.addEventListener("click", backLightCue);
  root.querySelector("#lightPause")?.addEventListener("click", () => {
    lightPaused = !lightPaused;
    renderLights();
  });
  root.querySelector("#lightBlackout")?.addEventListener("click", () => {
    lightBlackout = !lightBlackout;
    renderLights();
  });
  root.querySelector("#lightHouse")?.addEventListener("click", () => {
    lightHouseOverride = !lightHouseOverride;
    renderLights();
  });
  root.querySelector("#lightCurtain")?.addEventListener("click", () => {
    lightCurtainClosed = !lightCurtainClosed;
    renderLights();
  });
  root.querySelector("#lightMaster")?.addEventListener("input", event => {
    lightMaster = Number(event.target.value);
    renderLights();
  });
  root.querySelectorAll("[data-executor]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.executor);
      lightExecutors[index] = !lightExecutors[index];
      if (index === 7) lightWorklight = lightExecutors[index];
      renderLights();
    });
  });
}

document.addEventListener("keydown", event => {
  if (!document.getElementById("lightsView")?.classList.contains("active")) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
  const key = event.key.toLowerCase();
  if (event.key === " " || key === "g") {
    event.preventDefault();
    goLightCue();
  }
  if (key === "b") backLightCue();
  if (key === "p") {
    lightPaused = !lightPaused;
    renderLights();
  }
  if (key === "x") {
    lightBlackout = !lightBlackout;
    renderLights();
  }
  if (key === "h") {
    lightHouseOverride = !lightHouseOverride;
    renderLights();
  }
  const executor = Number(event.key) - 1;
  if (executor >= 0 && executor < lightExecutors.length) {
    lightExecutors[executor] = !lightExecutors[executor];
    if (executor === 7) lightWorklight = lightExecutors[executor];
    renderLights();
  }
});

window.lightsRenderConsole = renderLights;
if (document.getElementById("lightsView")?.classList.contains("active")) renderLights();
