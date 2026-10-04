const LED_CHANNEL_NAME = "seasons-academy-led-v1";
const LED_STATE_KEY = "seasons-led-current-cue";
const LED_CUES = [
  {id:"intro",group:"Before doors open",title:"Cinematic Seasons opening",trigger:"Play 2–3 minutes before the hosts enter",scene:"intro",overline:"Seasons Music Academy presents",headline:"The Showcase",subline:"Pune to Goa · One unforgettable musical journey",sound:"fanfare"},
  {id:"holding",group:"Before doors open",title:"Welcome holding screen",trigger:"After the opening; keep until house lights dim",scene:"stars",overline:"Welcome aboard",headline:"Seasons Express",subline:"The musical journey begins shortly"},
  {id:"boarding",group:"Opening",title:"The auditorium becomes a bus",trigger:"Upasana: “Aaj shaam yeh hall… ek bus hai”",scene:"road",overline:"Now boarding",headline:"Seasons Express",subline:"Pune → Goa · Live music all the way",distance:"470 km to Goa"},
  {id:"driver",group:"Opening",title:"Joseph starts the bus",trigger:"FK calls for the driver",scene:"road",overline:"Driver on board",headline:"Engine chalu!",subline:"Next stop · Katraj"},
  {id:"names-tauba",group:"Act 1",title:"Names · Tauba / Urvashi",trigger:"Click when Upasana begins reading names",scene:"names",act:"Tauba Tauba, Urvashi Urvashi Mashup"},
  {id:"sinhagad",group:"Act 2",title:"Sinhagad from the bus window",trigger:"Upasana: “Khidki se bahar dekhiye”",scene:"fort",overline:"Katraj · Sinhagad in view",headline:"Gad aala, pan Sinha gela",subline:"Kondhana became Sinhagad · The fort of the lion",distance:"440 km to Goa"},
  {id:"names-bharat",group:"Act 2",title:"Names · Bharat Humko",trigger:"Click when Upasana begins reading names",scene:"names",act:"Bharat Humko Jaan Se Pyara Hai"},
  {id:"tunnel",group:"Act 3",title:"Khambatki tunnel",trigger:"Upasana: “Tunnel aa gaya”",scene:"tunnel",overline:"Khambatki Ghat",headline:"Tunnel!",subline:"Ready for the echo?",distance:"410 km to Goa"},
  {id:"rain",group:"Act 3",title:"Ghat rainstorm",trigger:"Upasana begins the audience rainstorm",scene:"rain",overline:"Outside the tunnel",headline:"Ghat ki baarish",subline:"Rub · Snap · Clap · Thunder",sound:"rain"},
  {id:"names-drum",group:"Act 3",title:"Names · Drum Circle",trigger:"Click when Upasana begins reading names",scene:"names",act:"Drum Circle"},
  {id:"satara",group:"Act 4",title:"Satara and Kaas plateau",trigger:"FK: “Satara aa gaya!”",scene:"flowers",overline:"Satara",headline:"Kaas Plateau",subline:"A carpet of wildflowers · UNESCO World Heritage",distance:"360 km to Goa"},
  {id:"names-oldwoman",group:"Act 4",title:"Names · Old Woman Shoe",trigger:"Click when Upasana begins reading names",scene:"names",act:"Old Woman Shoe"},
  {id:"truck",group:"Act 5",title:"Truck ahead",trigger:"FK: “Aage ek truck hai”",scene:"truck",overline:"NH48",headline:"",subline:""},
  {id:"mission",group:"Act 5",title:"Overtake mission",trigger:"The hall starts humming the theme",scene:"road",overline:"Mission",headline:"Overtake",subline:"Lean right when FK says NOW",distance:"330 km to Goa"},
  {id:"names-mission",group:"Act 5",title:"Names · Mission Impossible",trigger:"Click when Upasana begins reading names",scene:"names",act:"Mission Impossible"},
  {id:"karad",group:"Act 6",title:"Karad champion story",trigger:"FK: “Bus guzar rahi hai Karad se”",scene:"champion",overline:"Karad · 1952",headline:"Khashaba Jadhav",subline:"Independent India’s first individual Olympic medallist",distance:"300 km to Goa"},
  {id:"names-champions",group:"Act 6",title:"Names · We Are the Champions",trigger:"Click when Upasana begins reading names",scene:"names",act:"We Are the Champions Mashup"},
  {id:"kolhapur",group:"Act 7",title:"Kolhapur at evening",trigger:"FK: “Kolhapur aa gaya!”",scene:"sunset",overline:"Kolhapur",headline:"Misal · Music · Chappals",subline:"The sun sets. Raag Yaman begins.",distance:"240 km to Goa"},
  {id:"names-yaman",group:"Act 7",title:"Names · Raag Yaman",trigger:"Click when Upasana begins reading names",scene:"names",act:"Raag Yaman"},
  {id:"dhaba",group:"Act 8",title:"Dhaba chai break",trigger:"FK: “Dhaba stop!”",scene:"dhaba",overline:"Highway break",headline:"Sirf das minute!",subline:"Chai · Vada pav · Headcount",distance:"220 km to Goa"},
  {id:"names-flute",group:"Act 8",title:"Names · The Flute Song",trigger:"Click when Upasana begins reading names",scene:"names",act:"The Flute Song"},
  {id:"night",group:"Act 9",title:"Night drive and antakshari",trigger:"Upasana: “Raat ki bus ho…”",scene:"stars",overline:"Night drive",headline:"Antakshari",subline:"Baithe baithe kya karein…",distance:"180 km to Goa"},
  {id:"names-saiyaara",group:"Act 9",title:"Names · Saiyaara",trigger:"Click when Upasana begins reading names",scene:"names",act:"Saiyaara"},
  {id:"midnight",group:"Act 11",title:"The bus sleeps",trigger:"FK puts a finger to his lips",scene:"stars",overline:"2:00 AM",headline:"Shhh…",subline:"The bus is asleep",distance:"130 km to Goa"},
  {id:"names-gminute",group:"Act 11",title:"Names · G Minute",trigger:"Click when Upasana begins reading names",scene:"names",act:"G Minute"},
  {id:"amboli",group:"Act 12",title:"Amboli dawn and fog",trigger:"FK: “Hum pahunche hain Amboli ghat”",scene:"rain",overline:"Amboli Ghat · Dawn",headline:"Clouds on the road",subline:"Listen. Four voices will show the way.",distance:"90 km to Goa",sound:"rain"},
  {id:"names-ghar",group:"Act 12",title:"Names · Ghar More / Moh Moh",trigger:"Click when Upasana begins reading names",scene:"names",act:"Ghar More Pardesiya & Moh Moh Ke Dhaage"},
  {id:"hairpins",group:"Act 13",title:"Amboli hairpin bends",trigger:"Upasana explains LEFT and RIGHT",scene:"road",overline:"Amboli Ghat",headline:"Hairpin bends",subline:"LEFT · RIGHT · Hold on!",distance:"70 km to Goa"},
  {id:"names-challa",group:"Act 13",title:"Names · Challa",trigger:"Click when Upasana begins reading names",scene:"names",act:"Challa — Jab Tak Hai Jaan"},
  {id:"border",group:"Act 14",title:"Welcome to Goa",trigger:"FK answers “Zero!”",scene:"beach",overline:"State border",headline:"Welcome to Goa!",subline:"The hotel is still 40 km away"},
  {id:"names-chammak",group:"Act 14",title:"Names · Chammak Challo",trigger:"Click when Upasana begins reading names",scene:"names",act:"Chammak Challo Mashup"},
  {id:"chapora",group:"Act 15",title:"Chapora fort",trigger:"Upasana: “Hotel se pehle ek stop”",scene:"fort",overline:"Chapora Fort",headline:"Dil Chahta Hai",subline:"One climb. One sunset. One iconic photograph.",distance:"25 km to Goa"},
  {id:"names-eye",group:"Act 15",title:"Names · Eye of the Tiger",trigger:"Click when Upasana begins reading names",scene:"names",act:"Eye of the Tiger, Gehra Hua Mashup"},
  {id:"liberation",group:"Act 16",title:"Goa Liberation story",trigger:"FK: “1947 mein Bharat azaad hua…”",scene:"tricolor",overline:"Goa Liberation Day",headline:"19 December 1961",subline:"Goa joined a free India"},
  {id:"names-dil",group:"Act 16",title:"Names · Dil Diya Hai",trigger:"Click when Upasana begins reading names",scene:"names",act:"Dil Diya Hai Jaan Bhi Denge — Karma"},
  {id:"susegad",group:"Act 17",title:"Goa time · Susegad",trigger:"FK: “Goa mein time alag chalta hai”",scene:"beach",overline:"Goa time",headline:"Susegad",subline:"Slow down · Breathe · Enjoy the moment",distance:"5 km to Goa"},
  {id:"names-howlong",group:"Act 17",title:"Names · How Long",trigger:"Click when Upasana begins reading names",scene:"names",act:"How Long — Charlie Puth"},
  {id:"sunset",group:"Act 18",title:"Beach sunset countdown",trigger:"Upasana starts the countdown",scene:"sunset",overline:"The beach",headline:"Final Countdown",subline:"10 · 9 · 8 · 7…"},
  {id:"names-final",group:"Act 18",title:"Names · Final Countdown",trigger:"Click when Upasana begins reading names",scene:"names",act:"Final Countdown"},
  {id:"shack",group:"Act 19",title:"Beach shack live band",trigger:"Upasana: “Raat ho gayi. Beach shack…”",scene:"beach",overline:"Beach shack",headline:"Live band night",subline:"Tonight’s performers · The teachers"},
  {id:"names-haseena",group:"Act 19",title:"Names · O Haseena",trigger:"Click when Upasana begins reading names",scene:"names",act:"O Haseena"},
  {id:"lastnight",group:"Act 20",title:"Goa’s last night",trigger:"Hosts say “Pahunch gaye!”",scene:"stars",overline:"Pune → Goa",headline:"We made it!",subline:"One bus · One stage · One musical family"},
  {id:"names-ajeeb",group:"Act 20",title:"Names · Ajeeb Daastaan",trigger:"Click when Upasana begins reading names",scene:"names",act:"Ajeeb Daastaan"},
  {id:"destination",group:"Ceremony",title:"Journey complete",trigger:"As Ajeeb Daastaan applause ends",scene:"beach",overline:"Journey complete",headline:"470 kilometres of music",subline:"Thank you, performers · teachers · families · crew"},
  {id:"felicitation",group:"Ceremony",title:"Felicitation",trigger:"FK announces the Felicitation Ceremony",scene:"intro",overline:"Seasons Music Academy",headline:"Felicitation Ceremony",subline:"Celebrating courage, practice and progress"},
  {id:"thanks",group:"Ceremony",title:"Vote of Thanks",trigger:"Joseph walks to centre stage",scene:"intro",overline:"With gratitude",headline:"Vote of Thanks",subline:"Joseph Sunil"},
  {id:"anthem",group:"Ceremony",title:"National Anthem",trigger:"FK asks everyone to rise",scene:"tricolor",overline:"Please rise for the",headline:"National Anthem",subline:"No animation change or announcement after this cue"}
];

let ledCurrentIndex = Math.max(0, LED_CUES.findIndex(cue => cue.id === localStorage.getItem(LED_STATE_KEY)));
let ledWindow = null;
let ledConnected = false;
let ledAudioContext = null;
let ledAmbient = null;
let ledWasFullscreen = false;
const ledChannel = "BroadcastChannel" in window ? new BroadcastChannel(LED_CHANNEL_NAME) : null;

function ledSceneHtml(cue) {
  const imageForAct = cue.act && [
    "G Minute",
    "Ghar More Pardesiya & Moh Moh Ke Dhaage",
    "Challa — Jab Tak Hai Jaan"
  ].includes(cue.act) ? "led-monsoon-ghat.jpg" : cue.act && [
    "Chammak Challo Mashup",
    "Eye of the Tiger, Gehra Hua Mashup",
    "Dil Diya Hai Jaan Bhi Denge — Karma",
    "How Long — Charlie Puth",
    "Final Countdown",
    "O Haseena",
    "Ajeeb Daastaan"
  ].includes(cue.act) ? "led-goa-coast.jpg" : "led-bus-journey.jpg";
  if (cue.scene === "names") {
    const cast = CAST[cue.act];
    const columns = cast.people.length > 12 ? 4 : cast.people.length > 7 ? 3 : 2;
    return `<div class="led-scene led-names-scene"><div class="led-scene-art" style="background-image:url('${imageForAct}')"></div><div class="led-names-head"><div class="overline">Now boarding · ${cast.people.length} performers</div><h1>${escapeHtml(cue.act)}</h1></div><div class="led-name-grid" style="--name-cols:${columns}">${cast.people.map(([name, instrument], index) => `<div class="led-name"><b>${index + 1}</b><div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(instrument)}</span></div></div>`).join("")}</div></div>`;
  }
  const image = {
    road:"led-bus-journey.jpg",
    tunnel:"led-monsoon-ghat.jpg",
    rain:"led-monsoon-ghat.jpg",
    truck:"led-indian-truck.jpg",
    stars:"led-goa-coast.jpg",
    sunset:"led-goa-coast.jpg",
    beach:"led-goa-coast.jpg",
    fort:"led-goa-coast.jpg",
    flowers:"led-bus-journey.jpg",
    champion:"led-bus-journey.jpg",
    dhaba:"led-bus-journey.jpg"
  }[cue.scene];
  const decoration = {
    intro: `<div class="led-scene led-logo-scene"><div class="led-scene-copy"><img class="led-mark" src="logo-mark.png" alt=""><div class="overline">${escapeHtml(cue.overline)}</div><h1>${escapeHtml(cue.headline)}</h1><p>${escapeHtml(cue.subline)}</p></div></div>`,
    road: `<div class="led-road"></div><div class="led-bus"></div>`,
    tunnel: `<div class="led-tunnel"></div>`,
    rain: `<div class="led-road"></div><div class="led-rain"></div>`,
    truck: `<div class="led-road"></div><div class="led-truck"></div>`,
    stars: `<div class="led-stars"></div>`,
    sunset: `<div class="led-sun"></div><div class="led-waves"></div>`,
    beach: `<div class="led-stars"></div><div class="led-waves"></div>`,
    fort: `<div class="led-sun"></div><div class="led-fort"></div>`,
    tricolor: `<div class="led-tricolor"></div>`,
    flowers: `<div class="led-sun"></div><div class="led-fort" style="background:linear-gradient(90deg,#d04a84,#e6a82e,#8e55b7,#ef7086,#4f9b63)"></div>`,
    champion: `<div class="led-stars"></div>`,
    dhaba: `<div class="led-road"></div><div class="led-bus"></div>`
  }[cue.scene] || "";
  if (cue.scene === "intro") return decoration;
  return `<div class="led-scene led-${cue.scene}-scene">${image ? `<div class="led-scene-art" style="background-image:url('${image}')"></div>` : ""}${decoration}<div class="led-scene-copy"><div class="overline">${escapeHtml(cue.overline || "")}</div>${cue.headline ? `<h1>${escapeHtml(cue.headline)}</h1>` : ""}${cue.subline ? `<p>${escapeHtml(cue.subline)}</p>` : ""}${cue.distance ? `<span class="distance">${escapeHtml(cue.distance)}</span>` : ""}</div></div>`;
}

function renderLedOutput(cue) {
  const screen = document.getElementById("ledScreen");
  if (!screen) return;
  screen.innerHTML = ledSceneHtml(cue);
  setLedSound(cue.sound);
}

function ledSend(message) {
  ledChannel?.postMessage(message);
  localStorage.setItem("seasons-led-message", JSON.stringify({...message, stamp: Date.now()}));
}

function selectLedCue(index, announce = true) {
  ledCurrentIndex = Math.max(0, Math.min(index, LED_CUES.length - 1));
  const cue = LED_CUES[ledCurrentIndex];
  localStorage.setItem(LED_STATE_KEY, cue.id);
  if (announce) ledSend({type:"cue", id:cue.id});
  if (document.body.classList.contains("led-output-only")) renderLedOutput(cue);
  window.ledRenderConsole?.();
}

function openLedWindow() {
  const url = new URL(location.href);
  url.search = "?led-output=1";
  url.hash = "";
  ledWindow = window.open(url, "seasons-led-output", "popup,width=1280,height=720");
  if (!ledWindow) {
    toast("Popup blocked — allow popups, then click Open Audience Screen again");
    return;
  }
  ledWindow.focus();
}

function holdLed() {
  ledSend({type:"holding"});
}

function stopLedProjection() {
  ledSend({type:"stop"});
  ledConnected = false;
  window.ledRenderConsole?.();
}

function ledGroupHtml(group, cues) {
  return `<section class="led-section"><h2>${escapeHtml(group)}</h2><p>Follow the buttons from left to right. The green line tells you the exact spoken trigger.</p><div class="led-cue-grid">${cues.map(cue => {
    const index = LED_CUES.indexOf(cue);
    return `<button type="button" class="led-cue${index === ledCurrentIndex ? " on" : ""}" data-led-index="${index}"><b>${index + 1}</b><strong>${escapeHtml(cue.title)}</strong><span>Audience sees: ${escapeHtml(cue.scene === "names" ? `performer names for ${cue.act}` : cue.headline || cue.title)}</span><em>Click when: ${escapeHtml(cue.trigger)}</em></button>`;
  }).join("")}</div></section>`;
}

window.ledRenderConsole = function renderLedConsole() {
  const root = document.getElementById("ledConsole");
  if (!root) return;
  const current = LED_CUES[ledCurrentIndex];
  const groups = LED_CUES.reduce((all, cue) => {
    (all[cue.group] ||= []).push(cue);
    return all;
  }, {});
  root.innerHTML = `<div class="led-console-head"><div><div class="eyebrow">Dedicated LED operator</div><h1>Audience screen</h1><p>One operator clicks the cues in order. The audience sees only the separate output window—never these buttons or instructions.</p></div><div class="led-launch"><button type="button" class="project" id="ledOpenBtn"><kbd>P</kbd> Open / Project</button><button type="button" class="stop" id="ledStopBtn"><kbd>Esc</kbd> Stop projecting</button></div></div>
    <div class="led-how"><article><b>1</b><strong>Connect the LED</strong><span>Set the LED as a second/extended display, not a mirror.</span></article><article><b>2</b><strong>Open its window</strong><span>Click “Open Audience Screen”, then drag that new window onto the LED.</span></article><article><b>3</b><strong>Project full screen</strong><span>Inside the audience window, click the button or press <kbd>P</kbd>.</span></article><article><b>4</b><strong>To stop</strong><span>Press <kbd>Escape</kbd>. A safe illustrated screen appears, then the window closes.</span></article></div>
    <div class="led-status"><div><small>Currently selected · cue ${ledCurrentIndex + 1} of ${LED_CUES.length}</small><strong>${escapeHtml(current.title)}</strong></div><span class="led-live-dot${ledConnected ? " connected" : ""}">${ledConnected ? "Audience window connected" : "Audience window not detected"}</span></div>
    <div class="led-controls"><button type="button" id="ledPrevBtn">← Previous</button><button type="button" class="next" id="ledNextBtn">Next cue →</button><button type="button" id="ledReplayBtn"><kbd>R</kbd> Replay</button><button type="button" id="ledHoldBtn"><kbd>H</kbd> Safe holding image</button></div>
    ${Object.entries(groups).map(([group,cues]) => ledGroupHtml(group,cues)).join("")}`;
};

function initLedConsoleEvents() {
  document.getElementById("ledView")?.addEventListener("click", event => {
    const cue = event.target.closest("[data-led-index]");
    if (cue) {
      selectLedCue(Number(cue.dataset.ledIndex));
      cue.scrollIntoView({block:"center",behavior:"smooth"});
      return;
    }
    if (event.target.closest("#ledOpenBtn")) openLedWindow();
    if (event.target.closest("#ledStopBtn")) stopLedProjection();
    if (event.target.closest("#ledPrevBtn")) selectLedCue(ledCurrentIndex - 1);
    if (event.target.closest("#ledNextBtn")) selectLedCue(ledCurrentIndex + 1);
    if (event.target.closest("#ledReplayBtn")) selectLedCue(ledCurrentIndex);
    if (event.target.closest("#ledHoldBtn")) holdLed();
  });
}

function stopLedSound() {
  if (!ledAmbient) return;
  ledAmbient.source.stop();
  ledAmbient = null;
}

function playLedFanfare() {
  if (!ledAudioContext) return;
  const now = ledAudioContext.currentTime;
  [130.81,196,261.63,329.63,392].forEach((frequency, index) => {
    const oscillator = ledAudioContext.createOscillator();
    const gain = ledAudioContext.createGain();
    oscillator.type = index < 2 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(.06, now + .2 + index * .08);
    gain.gain.exponentialRampToValueAtTime(.001, now + 4.4);
    oscillator.connect(gain).connect(ledAudioContext.destination);
    oscillator.start(now + index * .08);
    oscillator.stop(now + 4.5);
  });
}

function playLedRain() {
  if (!ledAudioContext) return;
  const seconds = 2;
  const buffer = ledAudioContext.createBuffer(1, ledAudioContext.sampleRate * seconds, ledAudioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
  const source = ledAudioContext.createBufferSource();
  const filter = ledAudioContext.createBiquadFilter();
  const gain = ledAudioContext.createGain();
  source.buffer = buffer;
  source.loop = true;
  filter.type = "lowpass";
  filter.frequency.value = 1800;
  gain.gain.value = .11;
  source.connect(filter).connect(gain).connect(ledAudioContext.destination);
  source.start();
  ledAmbient = {source};
}

function setLedSound(sound) {
  stopLedSound();
  if (!ledAudioContext || ledAudioContext.state !== "running") return;
  if (sound === "rain") playLedRain();
  if (sound === "fanfare") playLedFanfare();
}

function initLedOutput() {
  const outputMode = new URLSearchParams(location.search).get("led-output") === "1";
  if (!outputMode) return;
  document.body.classList.add("led-output-only");
  document.getElementById("ledOutput").hidden = false;
  const saved = LED_CUES.find(cue => cue.id === localStorage.getItem(LED_STATE_KEY)) || LED_CUES[0];
  ledCurrentIndex = LED_CUES.indexOf(saved);
  renderLedOutput(saved);
  ledSend({type:"ready"});
}

document.getElementById("ledFullscreenBtn")?.addEventListener("click", async () => {
  ledAudioContext ||= new AudioContext();
  await ledAudioContext.resume();
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
  } catch (error) {
    console.warn("Fullscreen was blocked", error);
  }
  document.getElementById("ledOutputHelp").hidden = true;
  setLedSound(LED_CUES[ledCurrentIndex].sound);
});

document.addEventListener("fullscreenchange", () => {
  if (!document.body.classList.contains("led-output-only")) return;
  if (document.fullscreenElement) {
    ledWasFullscreen = true;
    return;
  }
  if (!ledWasFullscreen) return;
  stopLedSound();
  renderLedOutput(LED_CUES.find(cue => cue.id === "holding"));
  window.close();
});

function receiveLedMessage(message) {
  if (message.type === "ready") {
    ledConnected = true;
    window.ledRenderConsole?.();
    ledSend({type:"cue", id:LED_CUES[ledCurrentIndex].id});
  }
  if (message.type === "cue") {
    const cue = LED_CUES.find(item => item.id === message.id);
    if (cue && document.body.classList.contains("led-output-only")) {
      ledCurrentIndex = LED_CUES.indexOf(cue);
      renderLedOutput(cue);
    }
  }
  if (message.type === "holding" && document.body.classList.contains("led-output-only")) {
    stopLedSound();
    renderLedOutput(LED_CUES.find(cue => cue.id === "holding"));
  }
  if (message.type === "stop" && document.body.classList.contains("led-output-only")) {
    stopLedSound();
    renderLedOutput(LED_CUES.find(cue => cue.id === "holding"));
    setTimeout(() => window.close(), 120);
  }
  if (message.type === "stopped") {
    ledConnected = false;
    window.ledRenderConsole?.();
  }
}

ledChannel?.addEventListener("message", event => receiveLedMessage(event.data));
window.addEventListener("storage", event => {
  if (event.key === "seasons-led-message" && event.newValue) receiveLedMessage(JSON.parse(event.newValue));
});
document.addEventListener("keydown", event => {
  if (document.body.classList.contains("led-output-only")) {
    if (event.key.toLowerCase() === "p") document.getElementById("ledFullscreenBtn")?.click();
    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      selectLedCue(ledCurrentIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectLedCue(ledCurrentIndex - 1);
    }
    if (event.key.toLowerCase() === "r") selectLedCue(ledCurrentIndex);
    if (event.key.toLowerCase() === "h") {
      holdLed();
      renderLedOutput(LED_CUES.find(cue => cue.id === "holding"));
    }
    if (event.key === "Escape" && !document.fullscreenElement) {
      renderLedOutput(LED_CUES.find(cue => cue.id === "holding"));
      window.close();
    }
    return;
  }
  if (!document.getElementById("ledView")?.classList.contains("active") || ["INPUT","TEXTAREA","SELECT"].includes(event.target.tagName)) return;
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    selectLedCue(ledCurrentIndex + 1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    selectLedCue(ledCurrentIndex - 1);
  }
  if (event.key.toLowerCase() === "p") openLedWindow();
  if (event.key.toLowerCase() === "r") selectLedCue(ledCurrentIndex);
  if (event.key.toLowerCase() === "h") holdLed();
  if (event.key === "Escape") stopLedProjection();
});

window.addEventListener("beforeunload", () => {
  if (document.body.classList.contains("led-output-only")) ledSend({type:"stopped"});
});

initLedConsoleEvents();
initLedOutput();
if (document.getElementById("ledView")?.classList.contains("active")) window.ledRenderConsole();
