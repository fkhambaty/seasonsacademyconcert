const LED_CHANNEL_NAME = "seasons-academy-led-v1";
const LED_STATE_KEY = "seasons-led-current-cue";
const LED_CUES = [
  {id:"intro",group:"Before doors open",title:"Cinematic Seasons opening",trigger:"Play 2–3 minutes before the hosts enter",scene:"intro",overline:"Seasons Music Academy presents",headline:"The Showcase",subline:"Pune to Goa · One unforgettable musical journey",sound:"fanfare"},
  {id:"holding",group:"Before doors open",title:"Welcome holding screen",trigger:"After the opening; keep until house lights dim",scene:"stars",overline:"Welcome aboard",headline:"Seasons Express",subline:"The musical journey begins shortly"},
  {id:"boarding",group:"Opening",title:"The auditorium becomes a bus",trigger:"Upasana: “Aaj shaam yeh hall… ek bus hai”",scene:"road",overline:"Now boarding",headline:"Seasons Express",subline:"Pune → Goa · Live music all the way",distance:"470 km to Goa"},
  {id:"driver",group:"Opening",title:"Joseph starts the bus",trigger:"FK calls for the driver",scene:"road",overline:"Driver on board",headline:"Engine chalu!",subline:"Next stop · Katraj"},
  {id:"names-tauba",group:"Act 1",title:"Names · Tauba / Urvashi",trigger:"Click when Upasana begins reading names",scene:"names",act:"Tauba Tauba, Urvashi Urvashi Mashup"},
  {id:"play-tauba",group:"Act 1",title:"Song · Tauba / Urvashi",trigger:"Click when the first musical note starts",scene:"perform",look:"dance",headline:"Tauba Tauba",subline:"Urvashi Urvashi"},
  {id:"sinhagad",group:"Act 2",title:"Sinhagad from the bus window",trigger:"Upasana: “Khidki se bahar dekhiye”",scene:"fort",overline:"Katraj · Sinhagad in view",headline:"Gad aala, pan Sinha gela",subline:"Kondhana became Sinhagad · The fort of the lion",distance:"440 km to Goa"},
  {id:"names-bharat",group:"Act 2",title:"Names · Bharat Humko",trigger:"Click when Upasana begins reading names",scene:"names",act:"Bharat Humko Jaan Se Pyara Hai"},
  {id:"play-bharat",group:"Act 2",title:"Song · Bharat Humko",trigger:"Click when the first musical note starts",scene:"perform",look:"tricolor",headline:"Bharat Humko",subline:"Jaan Se Pyara Hai"},
  {id:"tunnel",group:"Act 3",title:"Khambatki tunnel",trigger:"Upasana: “Tunnel aa gaya”",scene:"tunnel",overline:"Khambatki Ghat",headline:"The tunnel",subline:"Through the Western Ghats",distance:"410 km to Goa"},
  {id:"rain",group:"Act 3",title:"Ghat rainstorm",trigger:"Upasana begins the audience rainstorm",scene:"rain",overline:"Outside the tunnel",headline:"Ghat ki baarish",subline:"Monsoon on the mountain",sound:"rain"},
  {id:"names-drum",group:"Act 3",title:"Names · Drum Circle",trigger:"Click when Upasana begins reading names",scene:"names",act:"Drum Circle"},
  {id:"play-drum",group:"Act 3",title:"Song · Drum Circle",trigger:"Click when the first drum strike starts",scene:"perform",look:"drums",headline:"Drum Circle",subline:"Feel the circle"},
  {id:"satara",group:"Act 4",title:"Satara and Kaas plateau",trigger:"FK: “Satara aa gaya!”",scene:"flowers",overline:"Satara",headline:"Kaas Plateau",subline:"A carpet of wildflowers · UNESCO World Heritage",distance:"360 km to Goa"},
  {id:"names-oldwoman",group:"Act 4",title:"Names · Old Woman Shoe",trigger:"Click when Upasana begins reading names",scene:"names",act:"Old Woman Shoe"},
  {id:"play-oldwoman",group:"Act 4",title:"Song · Old Woman Shoe",trigger:"Click when the first musical note starts",scene:"perform",look:"story",headline:"Old Woman Shoe",subline:"A sunny story"},
  {id:"truck",group:"Act 5",title:"Truck ahead",trigger:"FK: “Aage ek truck hai”",scene:"truck",overline:"NH48",headline:"",subline:""},
  {id:"mission",group:"Act 5",title:"Overtake mission",trigger:"The hall starts humming the theme",scene:"road",overline:"NH48",headline:"The open highway",subline:"Pune behind us",distance:"330 km to Goa"},
  {id:"names-mission",group:"Act 5",title:"Names · Mission Impossible",trigger:"Click when Upasana begins reading names",scene:"names",act:"Mission Impossible"},
  {id:"play-mission",group:"Act 5",title:"Song · Mission Impossible",trigger:"Click when the theme begins",scene:"perform",look:"spy",headline:"Mission Impossible",subline:""},
  {id:"karad",group:"Act 6",title:"Karad champion story",trigger:"FK: “Bus guzar rahi hai Karad se”",scene:"champion",overline:"Karad · 1952",headline:"Khashaba Jadhav",subline:"Independent India’s first individual Olympic medallist",distance:"300 km to Goa"},
  {id:"names-champions",group:"Act 6",title:"Names · We Are the Champions",trigger:"Click when Upasana begins reading names",scene:"names",act:"We Are the Champions Mashup"},
  {id:"play-champions",group:"Act 6",title:"Song · We Are the Champions",trigger:"Click when the first vocal note starts",scene:"perform",look:"stadium",headline:"We Are the Champions",subline:""},
  {id:"kolhapur",group:"Act 7",title:"Kolhapur at evening",trigger:"FK: “Kolhapur aa gaya!”",scene:"sunset",overline:"Kolhapur",headline:"Misal · Music · Chappals",subline:"The sun sets. Raag Yaman begins.",distance:"240 km to Goa"},
  {id:"names-yaman",group:"Act 7",title:"Names · Raag Yaman",trigger:"Click when Upasana begins reading names",scene:"names",act:"Raag Yaman"},
  {id:"play-yaman",group:"Act 7",title:"Song · Raag Yaman",trigger:"Click when the first flute note starts",scene:"perform",look:"raga",headline:"Raag Yaman",subline:""},
  {id:"dhaba",group:"Act 8",title:"Dhaba chai break",trigger:"FK: “Dhaba stop!”",scene:"dhaba",overline:"Highway break",headline:"Dhaba",subline:"Chai and vada pav",distance:"220 km to Goa"},
  {id:"names-flute",group:"Act 8",title:"Names · The Flute Song",trigger:"Click when Upasana begins reading names",scene:"names",act:"The Flute Song"},
  {id:"play-flute",group:"Act 8",title:"Song · The Flute Song",trigger:"Click when the first musical note starts",scene:"perform",look:"flute",headline:"The Flute Song",subline:""},
  {id:"night",group:"Act 9",title:"Night drive and antakshari",trigger:"Upasana: “Raat ki bus ho…”",scene:"stars",overline:"Night drive",headline:"Under the stars",subline:"The road goes quiet",distance:"180 km to Goa"},
  {id:"names-saiyaara",group:"Act 9",title:"Names · Saiyaara",trigger:"Click when Upasana begins reading names",scene:"names",act:"Saiyaara"},
  {id:"play-saiyaara",group:"Act 9",title:"Song · Saiyaara",trigger:"Click when the first musical note starts",scene:"perform",look:"moon",headline:"Saiyaara",subline:""},
  {id:"midnight",group:"Act 11",title:"The bus sleeps",trigger:"FK puts a finger to his lips",scene:"stars",overline:"2:00 AM",headline:"Midnight",subline:"The bus is asleep",distance:"130 km to Goa"},
  {id:"names-gminute",group:"Act 11",title:"Names · G Minute",trigger:"Click when Upasana begins reading names",scene:"names",act:"G Minute"},
  {id:"play-gminute",group:"Act 11",title:"Song · G Minute",trigger:"Click when the first violin note starts",scene:"perform",look:"strings",headline:"G Minute",subline:""},
  {id:"amboli",group:"Act 12",title:"Amboli dawn and fog",trigger:"FK: “Hum pahunche hain Amboli ghat”",scene:"rain",overline:"Amboli Ghat · Dawn",headline:"Clouds on the road",subline:"Fog over the ghats",distance:"90 km to Goa",sound:"rain"},
  {id:"names-ghar",group:"Act 12",title:"Names · Ghar More / Moh Moh",trigger:"Click when Upasana begins reading names",scene:"names",act:"Ghar More Pardesiya & Moh Moh Ke Dhaage"},
  {id:"play-ghar",group:"Act 12",title:"Song · Ghar More / Moh Moh",trigger:"Click when the first vocal note starts",scene:"perform",look:"home",headline:"Ghar More Pardesiya",subline:"Moh Moh Ke Dhaage"},
  {id:"hairpins",group:"Act 13",title:"Amboli hairpin bends",trigger:"Upasana explains LEFT and RIGHT",scene:"road",overline:"Amboli Ghat",headline:"Hairpin bends",subline:"The road folds through the hills",distance:"70 km to Goa"},
  {id:"names-challa",group:"Act 13",title:"Names · Challa",trigger:"Click when Upasana begins reading names",scene:"names",act:"Challa — Jab Tak Hai Jaan"},
  {id:"play-challa",group:"Act 13",title:"Song · Challa",trigger:"Click when the first guitar note starts",scene:"perform",look:"highway",headline:"Challa",subline:"Jab Tak Hai Jaan"},
  {id:"border",group:"Act 14",title:"Welcome to Goa",trigger:"FK answers “Zero!”",scene:"beach",overline:"State border",headline:"Welcome to Goa!",subline:"The hotel is still 40 km away"},
  {id:"names-chammak",group:"Act 14",title:"Names · Chammak Challo",trigger:"Click when Upasana begins reading names",scene:"names",act:"Chammak Challo Mashup"},
  {id:"play-chammak",group:"Act 14",title:"Song · Chammak Challo",trigger:"Click when the first musical note starts",scene:"perform",look:"disco",headline:"Chammak Challo",subline:""},
  {id:"chapora",group:"Act 15",title:"Chapora fort",trigger:"Upasana: “Hotel se pehle ek stop”",scene:"fort",overline:"Chapora Fort",headline:"Dil Chahta Hai",subline:"One climb. One sunset. One iconic photograph.",distance:"25 km to Goa"},
  {id:"names-eye",group:"Act 15",title:"Names · Eye of the Tiger",trigger:"Click when Upasana begins reading names",scene:"names",act:"Eye of the Tiger, Gehra Hua Mashup"},
  {id:"play-eye",group:"Act 15",title:"Song · Eye of the Tiger",trigger:"Click when the first guitar note starts",scene:"perform",look:"tiger",headline:"Eye of the Tiger",subline:""},
  {id:"liberation",group:"Act 16",title:"Goa Liberation story",trigger:"FK: “1947 mein Bharat azaad hua…”",scene:"tricolor",overline:"Goa Liberation Day",headline:"19 December 1961",subline:"Goa joined a free India"},
  {id:"names-dil",group:"Act 16",title:"Names · Dil Diya Hai",trigger:"Click when Upasana begins reading names",scene:"names",act:"Dil Diya Hai Jaan Bhi Denge — Karma"},
  {id:"play-dil",group:"Act 16",title:"Song · Dil Diya Hai",trigger:"Click when the first vocal note starts",scene:"perform",look:"flag",headline:"Dil Diya Hai",subline:"Jaan Bhi Denge"},
  {id:"susegad",group:"Act 17",title:"Goa time · Susegad",trigger:"FK: “Goa mein time alag chalta hai”",scene:"beach",overline:"Goa time",headline:"Susegad",subline:"Slow down · Breathe · Enjoy the moment",distance:"5 km to Goa"},
  {id:"names-howlong",group:"Act 17",title:"Names · How Long",trigger:"Click when Upasana begins reading names",scene:"names",act:"How Long — Charlie Puth"},
  {id:"play-howlong",group:"Act 17",title:"Song · How Long",trigger:"Click when the first drum count starts",scene:"perform",look:"neon",headline:"How Long",subline:""},
  {id:"sunset",group:"Act 18",title:"Beach sunset countdown",trigger:"Upasana starts the countdown",scene:"sunset",overline:"The beach",headline:"Sunset",subline:"The sun meets the sea"},
  {id:"names-final",group:"Act 18",title:"Names · Final Countdown",trigger:"Click when Upasana begins reading names",scene:"names",act:"Final Countdown"},
  {id:"play-final",group:"Act 18",title:"Song · Final Countdown",trigger:"Click when the opening keyboard note starts",scene:"perform",look:"countdown",headline:"The Final Countdown",subline:""},
  {id:"shack",group:"Act 19",title:"Beach shack live band",trigger:"Upasana: “Raat ho gayi. Beach shack…”",scene:"beach",overline:"Beach shack",headline:"Live band night",subline:"Tonight’s performers · The teachers"},
  {id:"names-haseena",group:"Act 19",title:"Names · O Haseena",trigger:"Click when Upasana begins reading names",scene:"names",act:"O Haseena"},
  {id:"play-haseena",group:"Act 19",title:"Song · O Haseena",trigger:"Click when the first guitar note starts",scene:"perform",look:"retro",headline:"O Haseena",subline:""},
  {id:"lastnight",group:"Act 20",title:"Goa’s last night",trigger:"Hosts say “Pahunch gaye!”",scene:"stars",overline:"Pune → Goa",headline:"We made it!",subline:"One bus · One stage · One musical family"},
  {id:"names-ajeeb",group:"Act 20",title:"Names · Ajeeb Daastaan",trigger:"Click when Upasana begins reading names",scene:"names",act:"Ajeeb Daastaan"},
  {id:"play-ajeeb",group:"Act 20",title:"Song · Ajeeb Daastaan",trigger:"Click when the first musical note starts",scene:"perform",look:"finale",headline:"Ajeeb Daastaan",subline:""},
  {id:"destination",group:"Ceremony",title:"Journey complete",trigger:"As Ajeeb Daastaan applause ends",scene:"beach",overline:"Journey complete",headline:"470 kilometres of music",subline:"Thank you, performers · teachers · families · crew"},
  {id:"felicitation",group:"Ceremony",title:"Felicitation",trigger:"FK announces the Felicitation Ceremony",scene:"intro",overline:"Seasons Music Academy",headline:"Felicitation Ceremony",subline:"Celebrating courage, practice and progress"},
  {id:"thanks",group:"Ceremony",title:"Vote of Thanks",trigger:"Joseph walks to centre stage",scene:"intro",overline:"With gratitude",headline:"Vote of Thanks",subline:"Joseph Sunil"},
  {id:"anthem",group:"Ceremony",title:"National Anthem",trigger:"FK asks everyone to rise",scene:"tricolor",overline:"",headline:"National Anthem",subline:"",sound:"anthem"}
];

let ledCurrentIndex = Math.max(0, LED_CUES.findIndex(cue => cue.id === localStorage.getItem(LED_STATE_KEY)));
let ledWindow = null;
let ledConnected = false;
let ledAudioContext = null;
let ledAmbient = null;
let ledWasFullscreen = false;
const ledChannel = "BroadcastChannel" in window ? new BroadcastChannel(LED_CHANNEL_NAME) : null;

function performArt() {
  return `<div class="led-perform-art" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></div>`;
}

function ledSceneHtml(cue) {
  if (cue.scene === "perform") {
    return `<div class="led-scene led-perform look-${cue.look}">${performArt()}<div class="led-scene-copy"><div class="overline">Now playing</div><h1>${escapeHtml(cue.headline)}</h1>${cue.subline ? `<p>${escapeHtml(cue.subline)}</p>` : ""}</div></div>`;
  }
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
  if (document.body.classList.contains("led-output-only") || document.body.classList.contains("led-projecting")) renderLedOutput(cue);
  window.ledRenderConsole?.();
}

let ledScreenDetails = null;
function prepareLedScreen() {
  if (ledScreenDetails || !("getScreenDetails" in window)) return;
  ledScreenDetails = window.getScreenDetails().catch(() => null);
}
function fullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}
function enterFullscreen() {
  const target = document.documentElement;
  const request = target.requestFullscreen || target.webkitRequestFullscreen;
  if (!request || fullscreenElement()) return;
  try {
    const pending = request.call(target);
    if (pending?.catch) pending.catch(error => console.warn("Fullscreen was blocked", error));
  } catch (error) {
    console.warn("Fullscreen was blocked", error);
  }
}
function projectSelectedCue() {
  const cue = LED_CUES[ledCurrentIndex];
  localStorage.setItem(LED_STATE_KEY, cue.id);
  const output = document.getElementById("ledOutput");
  document.body.classList.add("led-projecting");
  output.hidden = false;
  document.getElementById("ledOutputHelp").hidden = true;
  renderLedOutput(cue);
  enterFullscreen();
  startLedSound();
  toast(`Projecting ${cue.title}`);
}

function holdLed() {
  ledSend({type:"holding"});
}

function stopLedProjection() {
  ledSend({type:"stop"});
  if (fullscreenElement()) (document.exitFullscreen || document.webkitExitFullscreen)?.call(document)?.catch?.(() => {});
  document.body.classList.remove("led-projecting");
  const output = document.getElementById("ledOutput");
  if (!document.body.classList.contains("led-output-only") && output) output.hidden = true;
  stopLedSound();
  stopLedBed();
  ledConnected = false;
  window.ledRenderConsole?.();
}

function ledAudienceLine(cue) {
  if (cue.scene === "names") return `performer names for ${cue.act}`;
  if (cue.scene === "perform") return `moving picture for ${cue.headline}`;
  return cue.headline || cue.title;
}

function ledGroupHtml(group, cues) {
  const hint = group.startsWith("Act ")
    ? "Left to right. The pale cards are for while someone is talking. The dark Song card is the moving picture. Press it when the music starts."
    : "Follow the buttons from left to right. The green line tells you the exact spoken trigger.";
  return `<section class="led-section"><h2>${escapeHtml(group)}</h2><p>${hint}</p><div class="led-cue-grid">${cues.map(cue => {
    const index = LED_CUES.indexOf(cue);
    const preview = cue.scene === "perform" ? `<span class="led-mini-look look-${cue.look}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></span>` : "";
    return `<button type="button" class="led-cue${cue.scene === "perform" ? " is-song" : ""}${index === ledCurrentIndex ? " on" : ""}" data-led-index="${index}"><b>${index + 1}</b><strong>${escapeHtml(cue.title)}</strong><span>Audience sees: ${escapeHtml(ledAudienceLine(cue))}</span><em>Click when: ${escapeHtml(cue.trigger)}</em>${preview}</button>`;
  }).join("")}</div></section>`;
}

window.ledRenderConsole = function renderLedConsole() {
  prepareLedScreen();
  const root = document.getElementById("ledConsole");
  if (!root) return;
  const current = LED_CUES[ledCurrentIndex];
  const groups = LED_CUES.reduce((all, cue) => {
    (all[cue.group] ||= []).push(cue);
    return all;
  }, {});
  root.innerHTML = `<div class="led-console-head"><div><div class="eyebrow">Dedicated LED operator</div><h1>Audience screen</h1><p>While someone is talking, keep the journey picture. When the band starts, press the dark <b>Song</b> button. That moving picture matches the music. Then press <b>P</b> once.</p></div><div class="led-launch"><button type="button" class="project" id="ledOpenBtn"><kbd>P</kbd> Project selected cue</button><button type="button" class="stop" id="ledStopBtn"><kbd>Esc</kbd> Stop projecting</button></div></div>
    <div class="led-how"><article><b>1</b><strong>Open this tab on the LED</strong><span>Or allow Chrome’s screen permission so P can use the second display.</span></article><article><b>2</b><strong>Select the cue</strong><span>Pale cards are for talking. The dark Song card is the moving picture for the music.</span></article><article><b>3</b><strong>Press P once</strong><span>That picture fills the screen immediately. No second window or click.</span></article><article><b>4</b><strong>To stop</strong><span>Press <kbd>Escape</kbd>. The cue list comes back.</span></article></div>
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
    if (event.target.closest("#ledOpenBtn")) projectSelectedCue();
    if (event.target.closest("#ledStopBtn")) stopLedProjection();
    if (event.target.closest("#ledPrevBtn")) selectLedCue(ledCurrentIndex - 1);
    if (event.target.closest("#ledNextBtn")) selectLedCue(ledCurrentIndex + 1);
    if (event.target.closest("#ledReplayBtn")) selectLedCue(ledCurrentIndex);
    if (event.target.closest("#ledHoldBtn")) holdLed();
  });
}

let ledVoices = [];
function stopLedSound() {
  if (ledAmbient) {
    ledAmbient.source.stop();
    ledAmbient = null;
  }
  ledVoices.forEach(node => { try { node.stop(); } catch (error) { console.warn(error); } });
  ledVoices = [];
}
function ledVoice({type="sawtooth", freq, start, dur, peak, attack, cutoff, vibrato=0}) {
  const context = ledAudioContext;
  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (vibrato) {
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.frequency.value = vibrato;
    lfoGain.gain.value = freq * 0.007;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start(start);
    lfo.stop(start + dur + 0.05);
    ledVoices.push(lfo);
  }
  filter.type = "lowpass";
  filter.Q.value = 3;
  filter.frequency.setValueAtTime(Math.max(80, cutoff * 0.25), start);
  filter.frequency.exponentialRampToValueAtTime(cutoff, start + Math.max(attack, 0.03));
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(filter).connect(gain).connect(context.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
  ledVoices.push(osc);
}
function playLedFanfare() {
  if (!ledAudioContext) return;
  const now = ledAudioContext.currentTime;
  [0, 0.62, 1.24, 3.05, 5.35].forEach(time => {
    ledVoice({type:"sine", freq:62, start:now + time, dur:0.55, peak:0.42, attack:0.008, cutoff:160, vibrato:0});
    ledVoice({type:"triangle", freq:124, start:now + time, dur:0.28, peak:0.12, attack:0.008, cutoff:280, vibrato:0});
  });
  [98, 130.81, 164.81, 196, 246.94, 329.63].forEach(freq => {
    ledVoice({type:"sawtooth", freq, start:now + 0.15, dur:8.6, peak:0.022, attack:1.1, cutoff:780, vibrato:4.2});
    ledVoice({type:"triangle", freq:freq * 1.003, start:now + 0.15, dur:8.6, peak:0.018, attack:1.4, cutoff:1400, vibrato:5});
  });
  [[0.25,220,0.48],[0.72,277.18,0.48],[1.2,329.63,0.78],[2.05,440,0.9],[2.95,349.23,0.38],[3.38,415.3,0.4],[3.82,523.25,1.15],[5.1,659.25,0.42],[5.55,587.33,0.38],[5.98,523.25,2.5]].forEach(([time, freq, dur]) => {
    ledVoice({type:"sawtooth", freq, start:now + time, dur, peak:0.065, attack:0.045, cutoff:2100, vibrato:5.5});
    ledVoice({type:"square", freq:freq / 2, start:now + time, dur, peak:0.035, attack:0.06, cutoff:850, vibrato:4.5});
  });
  const seconds = 3;
  const buffer = ledAudioContext.createBuffer(1, ledAudioContext.sampleRate * seconds, ledAudioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = (Math.random() * 2 - 1) * Math.exp(-index / (ledAudioContext.sampleRate * 0.55));
  const source = ledAudioContext.createBufferSource();
  const filter = ledAudioContext.createBiquadFilter();
  const gain = ledAudioContext.createGain();
  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.value = 4500;
  gain.gain.setValueAtTime(0.0001, now + 5.7);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 5.85);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 8.5);
  source.connect(filter).connect(gain).connect(ledAudioContext.destination);
  source.start(now + 5.7);
  source.stop(now + 8.6);
  ledVoices.push(source);
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

let ledBed = null;
function ensureLedBed() {
  if (ledBed || !ledAudioContext || ledAudioContext.state !== "running") return;
  const seconds = 16;
  const rate = ledAudioContext.sampleRate;
  const buffer = ledAudioContext.createBuffer(1, Math.floor(rate * seconds), rate);
  const data = buffer.getChannelData(0);
  const melody = [392, 440, 493.88, 440, 392, 349.23, 329.63, 349.23];
  melody.forEach((freq, index) => {
    const start = Math.floor(index * seconds / melody.length * rate);
    const length = Math.floor(rate * 1.6);
    for (let sample = 0; sample < length && start + sample < data.length; sample += 1) {
      const time = sample / rate;
      const envelope = Math.sin(Math.min(Math.PI, sample / length * Math.PI)) * Math.exp(-time * 0.9);
      data[start + sample] += Math.sin(2 * Math.PI * freq * time) * envelope * 0.18;
      data[start + sample] += Math.sin(2 * Math.PI * freq / 2 * time) * envelope * 0.1;
    }
  });
  for (let sample = 0; sample < data.length; sample += 1) {
    const time = sample / rate;
    data[sample] += Math.sin(2 * Math.PI * 130.81 * time) * 0.05;
    data[sample] += Math.sin(2 * Math.PI * 196 * time) * 0.035;
  }
  const source = ledAudioContext.createBufferSource();
  const filter = ledAudioContext.createBiquadFilter();
  const gain = ledAudioContext.createGain();
  source.buffer = buffer;
  source.loop = true;
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  gain.gain.value = 0.16;
  source.connect(filter).connect(gain).connect(ledAudioContext.destination);
  source.start();
  ledBed = {source};
}
function stopLedBed() {
  if (!ledBed) return;
  try { ledBed.source.stop(); } catch (error) { console.warn(error); }
  ledBed = null;
}
function setLedSound(sound) {
  stopLedSound();
  if (!ledAudioContext || ledAudioContext.state !== "running") return;
  if (sound === "anthem") {
    stopLedBed();
    return;
  }
  ensureLedBed();
  if (sound === "rain") playLedRain();
  if (sound === "fanfare") playLedFanfare();
}

async function startLedSound() {
  try {
    ledAudioContext ||= new AudioContext();
    await ledAudioContext.resume();
  } catch (error) {
    console.warn("Sound could not start", error);
  }
  setLedSound(LED_CUES[ledCurrentIndex].sound);
}
async function projectLedNow() {
  document.getElementById("ledOutputHelp").hidden = true;
  enterFullscreen();
  await startLedSound();
}

function initLedOutput() {
  const outputMode = new URLSearchParams(location.search).get("led-output") === "1";
  if (!outputMode) return;
  document.body.classList.add("led-output-only");
  document.getElementById("ledOutput").hidden = false;
  document.getElementById("ledOutputHelp").hidden = true;
  const saved = LED_CUES.find(cue => cue.id === localStorage.getItem(LED_STATE_KEY)) || LED_CUES[0];
  ledCurrentIndex = LED_CUES.indexOf(saved);
  renderLedOutput(saved);
  projectLedNow();
  ledSend({type:"ready"});
}

document.getElementById("ledFullscreenBtn")?.addEventListener("click", projectLedNow);

function restoreLedConsole() {
  if (document.body.classList.contains("led-projecting") && !fullscreenElement()) {
    document.body.classList.remove("led-projecting");
    document.getElementById("ledOutput").hidden = true;
    stopLedSound();
    stopLedBed();
    window.ledRenderConsole?.();
    return;
  }
  if (!document.body.classList.contains("led-output-only")) return;
  if (fullscreenElement()) {
    ledWasFullscreen = true;
    return;
  }
  if (!ledWasFullscreen) return;
  stopLedSound();
  stopLedBed();
  renderLedOutput(LED_CUES.find(cue => cue.id === "holding"));
  window.close();
}
document.addEventListener("fullscreenchange", restoreLedConsole);
document.addEventListener("webkitfullscreenchange", restoreLedConsole);

function receiveLedMessage(message) {
  if (message.type === "ready") {
    ledConnected = true;
    window.ledRenderConsole?.();
    ledSend({type:"cue", id:LED_CUES[ledCurrentIndex].id});
  }
  if (message.type === "project" && document.body.classList.contains("led-output-only")) projectLedNow();
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
    stopLedBed();
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

let ledSwipeStart = null;
function ledProjectionIsOpen() {
  return document.body.classList.contains("led-output-only") ||
    document.body.classList.contains("led-projecting");
}
function initLedSwipe() {
  const output = document.getElementById("ledOutput");
  if (!output) return;
  output.addEventListener("touchstart", event => {
    if (!ledProjectionIsOpen() || event.touches.length !== 1) return;
    const touch = event.touches[0];
    ledSwipeStart = { x: touch.clientX, y: touch.clientY, at: performance.now() };
  }, { passive: true });
  output.addEventListener("touchmove", event => {
    if (!ledSwipeStart || event.touches.length !== 1) return;
    const touch = event.touches[0];
    const dx = touch.clientX - ledSwipeStart.x;
    const dy = touch.clientY - ledSwipeStart.y;
    if (Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(dy) * 1.25) event.preventDefault();
  }, { passive: false });
  output.addEventListener("touchend", event => {
    if (!ledSwipeStart || event.changedTouches.length !== 1) {
      ledSwipeStart = null;
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - ledSwipeStart.x;
    const dy = touch.clientY - ledSwipeStart.y;
    const elapsed = performance.now() - ledSwipeStart.at;
    const threshold = Math.max(55, Math.min(innerWidth * .12, 110));
    ledSwipeStart = null;
    if (elapsed > 1200 || Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    selectLedCue(ledCurrentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
  output.addEventListener("touchcancel", () => {
    ledSwipeStart = null;
  }, { passive: true });
}

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
  if (event.key.toLowerCase() === "p") {
    event.preventDefault();
    projectSelectedCue();
  }
  if (event.key.toLowerCase() === "r") selectLedCue(ledCurrentIndex);
  if (event.key.toLowerCase() === "h") holdLed();
  if (event.key === "Escape") stopLedProjection();
});

window.addEventListener("beforeunload", () => {
  if (document.body.classList.contains("led-output-only")) ledSend({type:"stopped"});
});

initLedConsoleEvents();
initLedSwipe();
initLedOutput();
if (document.getElementById("ledView")?.classList.contains("active")) {
  prepareLedScreen();
  window.ledRenderConsole();
}
