const LED_CHANNEL_NAME = "seasons-academy-led-v1";
const LED_STATE_KEY = "seasons-led-current-cue";
// [id, CAST title, look, approximate song BPM, headline, subline, first sound the operator waits for, act number]
const LED_ACTS = [
  ["tauba","Tauba Tauba, Urvashi Urvashi Mashup","dance",100,"Tauba Tauba","Urvashi Urvashi","first musical note",1],
  ["bharat","Bharat Humko Jaan Se Pyara Hai","tricolor",84,"Bharat Humko","Jaan Se Pyara Hai","first musical note",2],
  ["drum","Drum Circle","drums",120,"Drum Circle","Feel the circle","first drum strike",3],
  ["oldwoman","Old Woman in a Shoe","story",100,"Old Woman in a Shoe","A sunny story","first musical note",4],
  ["mission","Mission Impossible","spy",88,"Mission Impossible","","theme",5],
  ["champions","We Are the Champions Mashup","stadium",76,"We Are the Champions","","first vocal note",6],
  ["yaman","Raag Yaman","raga",60,"Raag Yaman","","first flute note",7],
  ["flute","The Flute Song","flute",92,"The Flute Song","","first musical note",8],
  ["saiyaara","Saiyaara","moon",76,"Saiyaara","","first musical note",9],
  ["gminute","G Minute","strings",100,"G Minute","","first violin note",11],
  ["ghar","Ghar More Pardesiya & Moh Moh Ke Dhaage","home",80,"Ghar More Pardesiya","Moh Moh Ke Dhaage","first vocal note",12],
  ["challa","Challa — Jab Tak Hai Jaan","highway",96,"Challa","Jab Tak Hai Jaan","first guitar note",13],
  ["chammak","Chammak Challo Mashup","disco",108,"Chammak Challo","","first musical note",14],
  ["eye","Eye of the Tiger, Gehra Hua Mashup","tiger",109,"Eye of the Tiger","Gehra Hua","first guitar note",15],
  ["dil","Dil Diya Hai Jaan Bhi Denge — Karma","flag",92,"Dil Diya Hai","Jaan Bhi Denge","first vocal note",16],
  ["howlong","How Long — Charlie Puth","neon",110,"How Long","Charlie Puth","first drum count",17],
  ["final","Final Countdown","countdown",118,"The Final Countdown","","opening keyboard note",18],
  ["haseena","O Haseena","retro",120,"O Haseena","","first guitar note",19],
  ["ajeeb","Ajeeb Daastaan","finale",84,"Ajeeb Daastaan","","first musical note",20]
];
const LED_CUES = [
  {id:"intro",group:"Before doors open",title:"Cinematic Seasons opening",trigger:"Play 2–3 minutes before the hosts enter",scene:"intro",overline:"Seasons Music Academy presents",headline:"The Showcase",subline:"Pune to Goa · One unforgettable musical journey",sound:"fanfare"},
  {id:"holding",group:"Before doors open",title:"Welcome holding screen",trigger:"After the opening; keep until house lights dim",scene:"stars",overline:"Welcome aboard",headline:"Seasons Express",subline:"The musical journey begins shortly"},
  ...LED_ACTS.flatMap(([id, act, look, bpm, headline, subline, firstNote, number]) => {
    const group = `Act ${number} · ${headline}`;
    return [
      {id:`names-${id}`,group,title:`Names · ${headline}`,trigger:"Upasana begins reading names",scene:"names",act},
      {id:`play-${id}`,group,title:`Song · ${headline}`,trigger:`The ${firstNote} starts`,scene:"perform",act,look,bpm,headline,subline}
    ];
  })
];

let ledCurrentIndex = Math.max(0, LED_CUES.findIndex(cue => cue.id === localStorage.getItem(LED_STATE_KEY)));
let ledWindow = null;
let ledConnected = false;
let ledAudioContext = null;
let ledWasFullscreen = false;
const ledChannel = "BroadcastChannel" in window ? new BroadcastChannel(LED_CHANNEL_NAME) : null;

function performArt() {
  return `<div class="led-perform-art" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></div>`;
}

function beatboxerHtml() {
  return `<div class="bb-stage" aria-hidden="true"><span class="bb-flash"></span><svg class="bb-figure" viewBox="0 0 300 400">
    <path class="bb-body" d="M30 400 C34 318 82 286 150 286 C218 286 266 318 270 400 Z"/>
    <path class="bb-phones" d="M104 286 C104 250 196 250 196 286" fill="none"/>
    <rect class="bb-body" x="132" y="236" width="36" height="56" rx="14"/>
    <g class="bb-head"><circle class="bb-body" cx="150" cy="188" r="58"/><path class="bb-cap" d="M90 178 C92 120 208 120 210 178 Z"/><path class="bb-cap" d="M84 176 L216 176 L224 186 L76 186 Z"/></g>
    <g class="bb-arm"><path class="bb-limb" d="M246 318 C268 270 232 240 186 232" fill="none"/><circle class="bb-body" cx="182" cy="230" r="17"/><rect class="bb-mic" x="150" y="206" width="20" height="48" rx="8" transform="rotate(-62 160 230)"/><circle class="bb-mesh" cx="148" cy="222" r="15"/></g>
  </svg><span class="bb-ring"></span><span class="bb-ring"></span><span class="bb-ring"></span></div>`;
}

function performHtml(cue) {
  const cast = CAST[cue.act];
  const count = cast.people.length;
  const columns = count <= 4 ? 2 : count <= 9 ? 3 : 4;
  const size = count <= 4 ? 4.4 : count <= 6 ? 3.8 : count <= 9 ? 3.2 : count <= 12 ? 2.8 : 2.35;
  const bars = Array.from({length:24}, (_, index) => `<span style="--k:${index}"></span>`).join("");
  return `<div class="led-scene led-perform look-${cue.look}" style="--beat:${Math.round(60000 / cue.bpm)}ms">
    ${performArt()}
    <video class="bb-video" src="beatbox/${cue.id.replace("play-", "")}.mp4" autoplay muted loop playsinline onerror="this.remove()"></video>
    ${beatboxerHtml()}
    <div class="bb-eq" aria-hidden="true">${bars}</div>
    <header class="perf-brand"><img src="logo-mark.png" alt=""><span>Seasons Music Academy</span></header>
    <div class="perf-copy">
      <div class="perf-title"><small>Now playing</small><h1>${escapeHtml(cue.headline)}${cue.subline ? ` <em>· ${escapeHtml(cue.subline)}</em>` : ""}</h1></div>
      <div class="perf-names" style="--cols:${columns};--name-size:${size}vw">${cast.people.map(([name, instrument]) => `<div class="perf-name"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(instrument)}</span></div>`).join("")}</div>
    </div>
  </div>`;
}

function ledSceneHtml(cue) {
  if (cue.scene === "perform") return performHtml(cue);
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
  if (cue.scene === "intro") {
    return `<div class="led-scene led-logo-scene"><div class="led-scene-copy"><img class="led-mark" src="logo-mark.png" alt=""><div class="overline">${escapeHtml(cue.overline)}</div><h1>${escapeHtml(cue.headline)}</h1><p>${escapeHtml(cue.subline)}</p></div></div>`;
  }
  return `<div class="led-scene led-stars-scene"><div class="led-scene-art" style="background-image:url('led-goa-coast.jpg')"></div><div class="led-stars"></div><div class="led-scene-copy"><div class="overline">${escapeHtml(cue.overline)}</div><h1>${escapeHtml(cue.headline)}</h1><p>${escapeHtml(cue.subline)}</p></div></div>`;
}

function renderLedOutput(cue) {
  const screen = document.getElementById("ledScreen");
  if (!screen) return;
  screen.innerHTML = ledSceneHtml(cue);
  applyLedTempo();
  setLedSound(cue);
}

let ledTempo = null;
let ledTaps = [];
function applyLedTempo() {
  const scene = document.querySelector("#ledScreen .led-perform");
  if (scene && ledTempo?.id === LED_CUES[ledCurrentIndex].id) scene.style.setProperty("--beat", `${ledTempo.ms}ms`);
}
function tapLedTempo() {
  const cue = LED_CUES[ledCurrentIndex];
  if (cue.scene !== "perform") return;
  const now = performance.now();
  if (ledTaps.length && now - ledTaps[ledTaps.length - 1] > 2000) ledTaps = [];
  ledTaps = [...ledTaps, now].slice(-6);
  if (ledTaps.length < 3) return;
  const ms = Math.round((ledTaps[ledTaps.length - 1] - ledTaps[0]) / (ledTaps.length - 1));
  ledTempo = {id:cue.id, ms};
  ledSend({type:"tempo", ...ledTempo});
  applyLedTempo();
  window.ledRenderConsole?.();
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
  if (cue.scene === "perform") return `beatboxer dancing at ${cue.bpm} BPM, with every name for ${cue.headline}`;
  return cue.headline || cue.title;
}

function ledGroupHtml(group, cues) {
  const hint = group.startsWith("Act ")
    ? "Two buttons only. Pale card first, while Upasana reads the names. Dark Song card when the band plays the first note."
    : "Play the opening first. Keep the holding screen up until the hosts walk on.";
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
  root.innerHTML = `<div class="led-console-head"><div><div class="eyebrow">Dedicated LED operator</div><h1>Audience screen</h1><p>Each song has just two buttons. While Upasana reads the names, show the <b>Names</b> card. When the band starts, press the dark <b>Song</b> card. A beatboxer dances to that song’s beat behind the names. Press <b>P</b> once to project. Tap <b>T</b> with the drummer and the beatboxer follows the live band.</p></div><div class="led-launch"><button type="button" class="project" id="ledOpenBtn"><kbd>P</kbd> Project selected cue</button><button type="button" class="stop" id="ledStopBtn"><kbd>Esc</kbd> Stop projecting</button></div></div>
    <div class="led-how"><article><b>1</b><strong>Open this tab on the LED</strong><span>Or allow Chrome’s screen permission so P can use the second display.</span></article><article><b>2</b><strong>Select the cue</strong><span>Pale card for the names. Dark card for the song. Nothing else to press during host talk.</span></article><article><b>3</b><strong>Press P once</strong><span>That picture fills the screen immediately. No second window or click.</span></article><article><b>4</b><strong>To stop</strong><span>Press <kbd>Escape</kbd>. The cue list comes back.</span></article></div>
    <div class="led-status"><div><small>Currently selected · cue ${ledCurrentIndex + 1} of ${LED_CUES.length}</small><strong>${escapeHtml(current.title)}</strong>${current.scene === "perform" ? `<small>Beat · ${ledTempo?.id === current.id ? `${Math.round(60000 / ledTempo.ms)} BPM, tapped live` : `${current.bpm} BPM, the song’s usual speed`}</small>` : ""}</div><span class="led-live-dot${ledConnected ? " connected" : ""}">${ledConnected ? "Audience window connected" : "Audience window not detected"}</span></div>
    <div class="led-controls"><button type="button" id="ledPrevBtn">← Previous</button><button type="button" class="next" id="ledNextBtn">Next cue →</button><button type="button" id="ledReplayBtn"><kbd>R</kbd> Replay</button><button type="button" id="ledHoldBtn"><kbd>H</kbd> Safe holding image</button><button type="button" id="ledTapBtn"${current.scene === "perform" ? "" : " disabled"}><kbd>T</kbd> Tap the beat</button></div>
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
    if (event.target.closest("#ledTapBtn")) tapLedTempo();
  });
}

let ledVoices = [];
function stopLedSound() {
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
function setLedSound(cue) {
  stopLedSound();
  if (!ledAudioContext || ledAudioContext.state !== "running") return;
  if (cue.scene === "names" || cue.scene === "perform") {
    stopLedBed();
    return;
  }
  ensureLedBed();
  if (cue.sound === "fanfare") playLedFanfare();
}

async function startLedSound() {
  try {
    ledAudioContext ||= new AudioContext();
    await ledAudioContext.resume();
  } catch (error) {
    console.warn("Sound could not start", error);
  }
  setLedSound(LED_CUES[ledCurrentIndex]);
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
  if (message.type === "tempo") {
    ledTempo = {id:message.id, ms:message.ms};
    applyLedTempo();
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
    if (event.key.toLowerCase() === "t") tapLedTempo();
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
  if (event.key.toLowerCase() === "t") tapLedTempo();
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
