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
// Background loop (in loops/) that plays behind each song until the operator moves on.
const LED_LOOPS = {
  tauba:"tauba-colors", bharat:"bharat-hills", drum:"red-lights-tunnel", oldwoman:"oldwoman-sun",
  mission:"purple-warp", champions:"champions-fireworks", yaman:"yaman-gold", flute:"flute-creek",
  saiyaara:"saiyaara-love", gminute:"gminute-aurora", ghar:"ghar-sunset", challa:"challa-highway",
  chammak:"chammak-sparkle", eye:"eye-sparks", dil:"dil-sunset", howlong:"howlong-city",
  final:"final-sky", haseena:"haseena-gold", ajeeb:"ajeeb-stars"
};
const ledLoopSrc = id => `loops/${LED_LOOPS[id] || "purple-warp"}.mp4`;
const SPONSOR_IMAGE = "sponsors/snug-landscape.jpg";
const LAUNCH_FILM = "loops/launch-dance-wellness.mp4";
const PARTNERS = [
  {name:"Aahaar Nutrition", image:"sponsors/partner-aahaar-hd.jpg"},
  {name:"Bodh Career & Coaching", image:"sponsors/partner-bodh-hd.jpg"},
  {name:"Sonal's Classes", image:"sponsors/partner-sonal-hd.jpg"}
];
const PARTNERS_TITLE = "Community partners · Aahaar, Bodh, Sonal's Classes";
const TEACHERS = [
  {id:"sourudra", name:"Sourudra S Samai", role:"Violin", photo:"teachers/sourudra-samai.jpg", position:"50% 34%"},
  {id:"harland", name:"Harland Braver", role:"Keyboard", photo:"teachers/harland-braver.jpg", position:"50% 30%"},
  {id:"nicholas", name:"Nicholas Umrethi", role:"Drums", photo:"teachers/nicholas-umrethi.jpg", position:"50% 32%"},
  {id:"ashish", name:"Ashish Mehrotra", role:"Flute", photo:"teachers/ashish-mehrotra.jpg", position:"50% 30%"},
  {id:"bhoomi", name:"Bhoomi Shah", role:"Hindustani Vocals", photo:"teachers/bhoomi-shah.jpg", position:"50% 32%"},
  {id:"sabastian", name:"Sabastian Don Bosco Moktan", role:"Western Vocals", photo:"teachers/sabastian-moktan.jpg", position:"50% 28%"},
  {id:"vinay", name:"Vinay Rao", role:"Guitar", photo:"teachers/vinay-rao.jpg", position:"50% 26%"},
  {id:"joseph", name:"Joseph Sunil Kumar", role:"Guitar & Keyboard", photo:"teachers/joseph-sunil-kumar.jpg", position:"50% 28%"}
];
const actCues = ([id, act, look, bpm, headline, subline, firstNote, number]) => {
  const group = `Act ${number} · ${headline}`;
  return [
    {id:`names-${id}`,group,title:`Names · ${headline}`,trigger:"Upasana begins reading names and the curtain opens",scene:"names",act,loop:ledLoopSrc(id)},
    {id:`play-${id}`,group,title:`Song · ${headline}`,trigger:`The ${firstNote} starts`,scene:"perform",act,look,bpm,headline,subline,loop:ledLoopSrc(id)}
  ];
};
const LED_CUES = [
  {id:"intro",group:"Before doors open",title:"Cinematic Seasons opening",trigger:"Play 2–3 minutes before the hosts enter. Turn the volume up",scene:"intro",overline:"Seasons Music Academy",headline:"Musicale 2026",subline:"Annual Music Concert",music:"loops/opening.mp3"},
  {id:"holding",group:"Before doors open",title:"Welcome holding screen",trigger:"After the opening; keep until house lights dim",scene:"stars",overline:"Welcome aboard",headline:"Seasons Express",subline:"The musical journey begins shortly"},
  {id:"sponsor-film",group:"Sponsor · before Act 1",title:"Sponsor film · Snug Cafe",trigger:"FK says the sponsors were forgotten and the curtain reopens",scene:"sponsor-video",film:"sponsors/snug-film.mp4",music:"sponsors/snug-film.mp4",musicLoop:false},
  {id:"sponsor-opening",group:"Sponsor · before Act 1",title:"Sponsor picture · Snug Cafe",trigger:"The sponsor film ends",scene:"sponsor-image",image:SPONSOR_IMAGE},
  {id:"partners-opening",group:"Sponsor · before Act 1",title:PARTNERS_TITLE,trigger:"Upasana finishes thanking Snug Cafe",scene:"partners"},
  ...LED_ACTS.flatMap(item => {
    const id = item[0];
    const before = id === "flute"
      ? [{id:"sponsor-dhaba",group:"Sponsor · dhaba stop",title:"Sponsor picture · Snug Cafe",trigger:"At the Dhaba chai break, before The Flute Song names",scene:"sponsor-image",image:SPONSOR_IMAGE},
         {id:"partners-dhaba",group:"Sponsor · dhaba stop",title:PARTNERS_TITLE,trigger:"Upasana finishes thanking Snug Cafe",scene:"partners"}]
      : id === "haseena"
        ? [{id:"sponsor-beach",group:"Sponsor · beach shack",title:"Sponsor picture · Snug Cafe",trigger:"At the Beach shack stop, before O Haseena names",scene:"sponsor-image",image:SPONSOR_IMAGE},
           {id:"partners-beach",group:"Sponsor · beach shack",title:PARTNERS_TITLE,trigger:"Upasana finishes thanking Snug Cafe",scene:"partners"}]
        : id === "saiyaara"
          ? [{id:"launch-dance",group:"Launch · before Saiyaara",title:"Launch film · Seasons Dance & Wellness Academy",trigger:"FK says “Driver sahab — bus rokiye!” and the house lights go down",scene:"launch-video",film:LAUNCH_FILM,music:LAUNCH_FILM,musicLoop:false}]
          : [];
    return [...before, ...actCues(item)];
  }),
  {id:"felicitation",group:"Finale",title:"Felicitation",trigger:"The hosts announce the Felicitation Ceremony",scene:"perform",headline:"Felicitation",subline:"With gratitude",loop:"loops/felicitation-stars.mp4"},
  ...TEACHERS.map(teacher => ({...teacher,id:`teacher-${teacher.id}`,group:"Finale",title:`Honouring · ${teacher.name}`,trigger:`${teacher.name} is called`,scene:"teacher"})),
  {id:"thanks",group:"Finale",title:"Vote of Thanks",trigger:"Joseph steps up to the microphone",scene:"perform",headline:"Vote of Thanks",subline:"Joseph",loop:"loops/thanks-sunset.mp4"},
  {id:"anthem",group:"Finale",title:"National Anthem",trigger:"The hosts say: please rise for the National Anthem",scene:"anthem",loop:"loops/indian-flag.mp4"},
  {id:"bloopers",group:"Finale",title:"Bloopers",trigger:"The National Anthem has finished. Wait two seconds, then press this. Leave the volume up",scene:"bloopers",film:"loops/bloopers.mp4",music:"loops/bloopers.mp4",musicLoop:false},
  {id:"credits",group:"Finale",title:"End credits",trigger:"The bloopers have finished on Thank you. Leave the volume up",scene:"credits",music:"loops/credits-goodbye.mp3"}
];

const LED_CREDITS = [
  {kind:"open"},
  {kind:"kicker", text:"A heartfelt thank you to"},
  {kind:"role", role:"Our Founder", name:"Joseph Sunil Kumar"},
  {kind:"role", role:"Our Co-Founder", name:"Shwetha Joseph"},
  {kind:"group", title:"Our Dedicated Music Faculty", note:"For their guidance, patience and constant encouragement", names:["Sourudra.S.Samai","Harland Braver","Nicholas Umrethi","Sabastian Don Bosco Moktan","Ashish Mehrotra","Bhoomi Shah","Vinay Rao"]},
  {kind:"group", title:"Our Wonderful Students", note:"For filling the stage with music, confidence and joy", names:["Aadhya Trivedi","Aahana Sen","Aarush Rahul Zarpure","Aarush Sandip Kawade","Aarya Pratap","Aavya Brid","Aayush Jahagirdar","Abigail Vairagar","Adarsh Satheesh","Adelyn Grace","Agastya Anil Yadav","Aishni Ratadiya","Akriti Hemant Gaikwad","Amaaya Nair","Amish Singh","Arika Hemant Gaikwad","Ariyan Bhattacharya","Arjun Kelkar","Arnab Banerjee","Arnik Sharma","Arohi Abhay Mundra","Aryan Halkude","Avir Parinit Tathed","Avni Bhatia","Avyukth Ujwal","Ayaan Solanki","Ayansh Agrawal","Ayansh Aniket Zarkar","Dakshi Devi","Devansh Wadhwa","Dilip Nitanta Ranade","Diya Tuteja","Eliana Vineet Sasane","Eva Alung","Eva Camillio Fernandes","Harish Acharya","Harshvardhan S Kendre","Immanuel Lojo","Inaya Kapadiya","Ishanvi Batra","Ishita Kothari","Ivan Raghava","Jyotsanaa Lokhandde","K.Gayatri","Kaivalya Shastry","Kartikeyan Jha","Keshav Coimbatore Balachandar","Kiana Mendis","Kinaera Sharma","Kush Jigar Shah","Leonora Mendis","Linisha Srivastava","Lubaina Godhrawala","Maghizini Viswanathan","Mahira Chandak","Milee Ninad Mahadik","Mireya Joseph","Mustafa Sabuwala","Myra Gomes","Myra Pokhrel","Myraa Vivian Pillai","Nakul Chandrakant Chandak","Natasha Chatterjee","Natasha Nainani","Nathania Joseph","Navya Alung","Nevaeh Sharma","Nivita Baliga","Noyanika Amit Chaudhari","Parthvee Jain","Pranchal","Pratibha Rathore","Preeti Bhandare","Prisha Mathur","Reyansh Bhatia","Reyansh Sinha","Ria Nikhil Naik","Richard D'souza","Ridhaan Kavthekar","Rishi Chitresh Bhatia","Rishika Singh","Ritu Rijhwani","Sameer Wasnik","Sanjeevini Chandramani Jarje","Sarah MohmedIrfan Memon","Savya Dubey","Sesha Datta Abhiram Babbepalli","Shanaya Sanoj","Sharwin Mani","Shaurya Mohit Sharma","Shreya Karthik","Siddhartha Basuroy","Siddhiksha Chaudhary","Simmi Arora","Srihitha Potnuru","Sudiksha Moolani","Sujata Pasupathi","Trishaa Nikhil Shirude","Veda Shrivastava","Vibhav Coimbatore Balachandar","Vihaani Roy","Viraj Phillips","Virat Jauhari","Vivaan Jitendra Virbhani","Vivaan Patel","Zoya Sajid Memon"]},
  {kind:"directors", title:"Band Directors", entries:[
    ["Tauba Tauba & Urvashi Urvashi Mashup","Joseph Sunil Kumar"],
    ["Bharat Humko Jaan Se Pyara Hai","Harland Braver"],
    ["Drum Circle","Nicholas Umrethi"],
    ["Old Woman in a Shoe","Joseph Sunil Kumar"],
    ["Mission Impossible","Joseph Sunil Kumar"],
    ["We Are the Champions Mashup","Sabastian Don Bosco Moktan"],
    ["Raag Yaman","Ashish Mehrotra"],
    ["The Flute Song","Joseph Sunil Kumar"],
    ["Saiyaara","Joseph Sunil Kumar"],
    ["G Minuet","Sourudra S Samai"],
    ["Ghar More Pardesiya & Moh Moh Ke Dhaage","Bhoomi Shah"],
    ["Challa — Jab Tak Hai Jaan","Vinay Rao & Joseph Sunil Kumar"],
    ["Chammak Challo Mashup","Joseph Sunil Kumar"],
    ["Eye of the Tiger, Gehra Hua Mashup","Vinay Rao"],
    ["Dil Diya Hai Jaan Bhi Denge — Karma","Harland Braver"],
    ["How Long — Charlie Puth","Joseph Sunil Kumar"],
    ["Final Countdown","Joseph Sunil Kumar"],
    ["O Haseena","All teachers"],
    ["Ajeeb Daastaan","Joseph Sunil Kumar, Vinay Rao & Sourudra S Samai"]
  ]},
  {kind:"group", title:"All Parents", note:"For your unwavering support and encouragement", names:[]},
  {kind:"group", title:"Event Director & Screenplay", names:["Fakhruddin Khambaty"]},
  {kind:"group", title:"Comperes", names:["Fakhruddin Khambaty","Upasana Sharma","Sonal Shirude"]},
  {kind:"group", title:"Volunteers", names:["Richa Sharma","Sonal Shirude","Fatema Bandukwala","Shruti Alung","Suman Agrawal","Sonali Nagwekar","Milee Ninad Mahadik","Dr. Prajakta","Richard D'souza","Sheelpy Sen","Pratibha Rathore","Kush Shah","Virat Jauhari","Helen John Mendis"]},
  {kind:"group", title:"Camera, Sound & LED Wall", names:["Stephen & Team","Prakash & Team","Richa Sharma","Varun Martin","Virat Jauhari"]},
  {kind:"group", title:"LED Slides", names:["Richa Sharma"]},
  {kind:"kicker", text:"With our sincere gratitude to"},
  {kind:"group", title:"Our Sponsor & Food Stall Partner", names:["Snug Cafe"]},
  {kind:"group", title:"Our Parents & Families", note:"For your unwavering support and encouragement", names:["Vijaya","J.John Bosco","Nalina John Bosco","Nirmala Martin","Varun Martin","Francis Simon"]},
  {kind:"group", title:"Our Friends & Well-Wishers", note:"For being a part of this special evening", names:["Upasana Sharma","Sailesh Sharma","Fakhruddin Khambaty","Fatema Bandukwala","Richa Sharma","Mohit Sharma","Sonal Shirude","Nikhil Shirude"]},
  {kind:"group", title:"Special Thanks", note:"To everyone who contributed behind the scenes to make Musicale 2026 a memorable celebration.", names:[]},
  {kind:"kicker", text:"Music  ·  Memories  ·  Moments"},
  {kind:"finale"}
];

let ledCurrentIndex = Math.max(0, LED_CUES.findIndex(cue => cue.id === localStorage.getItem(LED_STATE_KEY)));
let ledWindow = null;
let ledConnected = false;
let ledAudioContext = null;
let ledWasFullscreen = false;
const ledChannel = "BroadcastChannel" in window ? new BroadcastChannel(LED_CHANNEL_NAME) : null;

function actLook(act) {
  const row = LED_ACTS.find(item => item[1] === act);
  if (!row) return {look:"finale", headline:act, subline:"", bpm:84};
  return {look:row[2], headline:row[4], subline:row[5], bpm:row[3]};
}

function nameLayout(count) {
  if (count <= 4) return {columns:2, size:4.5};
  if (count <= 6) return {columns:3, size:3.7};
  if (count <= 9) return {columns:3, size:3.05};
  if (count <= 12) return {columns:4, size:2.45};
  return {columns:4, size:2.05};
}

function stageWorldHtml({film = "", photo = ""} = {}) {
  const motes = Array.from({length:18}, (_, index) => {
    const left = (index * 37 + 8) % 90;
    return `<span style="left:${left}%;animation-duration:${8 + (index % 7)}s;animation-delay:-${(index * 0.6) % 8}s;width:${2 + (index % 3)}px;height:${2 + (index % 3)}px"></span>`;
  }).join("");
  const filmTag = film ? `<video class="stage-film" src="${film}" autoplay muted loop playsinline onerror="this.remove()"></video>` : "";
  const photoTag = photo ? `<div class="stage-photo" style="background-image:url('${photo}')"></div>` : "";
  return `<div class="stage-world" aria-hidden="true">${filmTag}${photoTag}<div class="spot spot-a"><span></span></div><div class="spot spot-b"><span></span></div><div class="spot spot-c"><span></span></div><div class="stage-haze"></div><div class="stage-bloom"></div><div class="motes">${motes}</div><div class="curtain curtain-l"></div><div class="curtain curtain-r"></div><div class="footlights"></div></div>`;
}

function playbillHead() {
  return `<header class="playbill"><img src="logo-mark.svg" alt=""><span>Seasons Music Academy</span></header>`;
}

function playbillNames(people, columns, size) {
  return `<div class="playbill-names" style="--cols:${columns};--name-size:${size}vw">${people.map(([name, instrument]) => `<div class="playbill-name"><strong>${escapeHtml(name)}</strong><em>${escapeHtml(instrument)}</em></div>`).join("")}</div>`;
}

function performHtml(cue) {
  const brand = `<header class="loop-brand loop-brand-lit"><img src="logo-mark.svg" alt=""><span>Seasons Music<br>Academy</span></header>`;
  return `<div class="led-scene led-perform led-loop-scene"><video class="led-loop" src="${cue.loop}" autoplay muted loop playsinline preload="auto"></video><div class="led-loop-shade"></div>${brand}<div class="loop-title"><small>Now playing</small><strong>${escapeHtml(cue.headline)}</strong>${cue.subline ? `<span>${escapeHtml(cue.subline)}</span>` : ""}</div></div>`;
}

function sponsorVideoHtml(cue) {
  return `<div class="led-scene sponsor-video-scene"><video class="sponsor-film" src="${cue.film}" autoplay muted playsinline preload="auto"></video><div class="sponsor-film-frame"></div></div>`;
}
function bloopersHtml(cue) {
  return `<div class="led-scene bloopers-scene"><div class="bloopers-stage"><div class="bloopers-frame"><video class="bloopers-film" src="${cue.film}" autoplay muted playsinline preload="auto"></video></div><footer class="bloopers-brand"><span class="bloopers-crest"><img src="logo-mark.svg" alt=""></span><span><b>Seasons</b><small>Music Academy</small></span></footer></div></div>`;
}

function partnersHtml() {
  return `<div class="led-scene partners-scene"><p class="partners-head">Musicale 2026 · Our Community Partners</p><div class="partners-row">${PARTNERS.map(partner => `<figure class="partner-card"><img src="${partner.image}" alt="${escapeHtml(partner.name)}"></figure>`).join("")}</div></div>`;
}

function sponsorImageHtml(cue) {
  return `<div class="led-scene sponsor-image-scene"><div class="sponsor-image-glow"></div><img src="${cue.image}" alt="Snug Cafe sponsor"><p>Our Sponsor &amp; Food Stall Partner</p></div>`;
}

function teacherHtml(cue) {
  const portrait = cue.photo
    ? `<figure><img src="${cue.photo}" alt="${escapeHtml(cue.name)}" style="object-position:${cue.position || "50% 32%"}"></figure>`
    : `<figure class="teacher-no-photo"><img src="logo-mark.svg" alt=""><span>With gratitude</span></figure>`;
  return `<div class="led-scene teacher-scene"><div class="teacher-rings"></div><div class="teacher-copy"><small>Seasons Music Academy honours</small><h1>${escapeHtml(cue.name)}</h1><p>${escapeHtml(cue.role)}</p><b>Musicale 2026</b></div>${portrait}</div>`;
}

function introHtml() {
  return `<div class="led-scene led-opening-film"><canvas class="opening-sky" aria-hidden="true"></canvas><div class="opening-quarters"><figure class="season-quarter summer"><img src="seasons/summer.jpg" alt=""></figure><figure class="season-quarter monsoon"><img src="seasons/monsoon.jpg" alt=""></figure><figure class="season-quarter winter"><img src="seasons/winter.jpg" alt=""></figure><figure class="season-quarter autumn"><img src="seasons/autumn.jpg" alt=""></figure></div><canvas class="opening-globe" aria-hidden="true"></canvas><div class="opening-lockup"><div class="opening-crest-wrap"><div class="opening-halo"><img class="opening-crest" src="logo-mark.svg" alt=""></div><div class="opening-wordmark"><b>Seasons</b><i class="opening-rule"></i><span>Music Academy</span></div></div><div class="opening-titles"><p class="opening-musicale">Musicale 2026</p><p class="opening-annual">Annual Music Concert</p></div></div></div>`;
}
function creditsBlock(block) {
  switch (block.kind) {
    case "open":
      return `<header class="credits-open"><img src="logo-mark.svg" alt=""><p>Seasons Music Academy presents</p><h1>Musicale 2026</h1><strong>Annual Music Concert</strong><span>A celebration of music, passion &amp; learning</span></header>`;
    case "kicker":
      return `<p class="credits-kicker">${escapeHtml(block.text)}</p>`;
    case "role":
      return `<div class="credits-role"><small>${escapeHtml(block.role)}</small><b>${escapeHtml(block.name)}</b></div>`;
    case "group":
      return `<section class="credits-group"><h2>${escapeHtml(block.title)}</h2>${block.note ? `<p>${escapeHtml(block.note)}</p>` : ""}${block.names.length ? `<div class="credits-names">${block.names.map(name => `<span>${escapeHtml(name)}</span>`).join("")}</div>` : ""}</section>`;
    case "directors":
      return `<section class="credits-group credits-directors"><h2>${escapeHtml(block.title)}</h2><div>${block.entries.map(([act,director]) => `<p><span>${escapeHtml(act)}</span><b>${escapeHtml(director)}</b></p>`).join("")}</div></section>`;
    case "finale":
      return `<footer class="credits-finale"><img src="logo-mark.svg" alt=""><p>With love from</p><h2>Seasons Music Academy</h2><strong>Keep learning. Keep growing. Keep making music.</strong><b>Thank you for being a part of Musicale 2026 ❤</b><span>See you at Musicale 2027!</span></footer>`;
    default: {
      const unknown = block.kind;
      throw new Error(`Unknown credit block: ${unknown}`);
    }
  }
}

function creditsHtml() {
  return `<div class="led-scene led-credits"><div class="credits-glow"></div><div class="credits-roll">${LED_CREDITS.map(creditsBlock).join("")}</div></div>`;
}

let creditsFrame = 0;
function stopCredits() {
  cancelAnimationFrame(creditsFrame);
  creditsFrame = 0;
}
function mountCredits(root) {
  stopCredits();
  const roll = root.querySelector(".credits-roll");
  const finale = roll.querySelector(".credits-finale");
  const speed = 62;
  let last = performance.now();
  let y = root.clientHeight;
  const stopAt = () => root.clientHeight / 2 - (finale.offsetTop + finale.offsetHeight / 2);
  const step = now => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    y -= speed * dt;
    const parked = stopAt();
    if (y < parked) y = parked;
    roll.style.transform = `translate3d(0,${y}px,0)`;
    if (y > parked + 0.5) creditsFrame = requestAnimationFrame(step);
  };
  roll.style.transform = `translate3d(0,${y}px,0)`;
  creditsFrame = requestAnimationFrame(step);
}
window.SeasonsCredits = {mount: mountCredits, stop: stopCredits};

function ledSceneHtml(cue) {
  if (cue.scene === "credits") return creditsHtml();
  if (cue.scene === "anthem") return `<div class="led-scene led-perform led-loop-scene led-anthem"><video class="led-loop" src="${cue.loop}" autoplay muted loop playsinline preload="auto"></video></div>`;
  if (cue.scene === "intro") return introHtml(cue);
  if (cue.scene === "bloopers") return bloopersHtml(cue);
  if (cue.scene === "sponsor-video" || cue.scene === "launch-video") return sponsorVideoHtml(cue);
  if (cue.scene === "sponsor-image") return sponsorImageHtml(cue);
  if (cue.scene === "partners") return partnersHtml();
  if (cue.scene === "teacher") return teacherHtml(cue);
  if (cue.scene === "perform") return performHtml(cue);
  if (cue.scene === "names") {
    const cast = CAST[cue.act];
    const meta = actLook(cue.act);
    const {columns, size} = nameLayout(cast.people.length);
    return `<div class="led-scene led-names-scene look-${meta.look}" style="--beat:${Math.round(60000 / meta.bpm)}ms">${stageWorldHtml()}${playbillHead()}<div class="playbill-title"><small>Now boarding · ${cast.people.length} performers</small><h1>${escapeHtml(meta.headline)}</h1>${meta.subline ? `<p>${escapeHtml(meta.subline)}</p>` : ""}</div>${playbillNames(cast.people, columns, size)}<video class="led-loop-preload" src="${cue.loop}" muted preload="auto" aria-hidden="true"></video></div>`;
  }
  return `<div class="led-scene led-stars-scene"><div class="led-scene-art" style="background-image:url('led-goa-coast.jpg')"></div><div class="led-stars"></div><div class="led-scene-copy"><div class="overline">${escapeHtml(cue.overline)}</div><h1>${escapeHtml(cue.headline)}</h1><p>${escapeHtml(cue.subline)}</p></div></div>`;
}

function renderLedOutput(cue) {
  const screen = document.getElementById("ledScreen");
  if (!screen) return;
  screen.innerHTML = ledSceneHtml(cue);
  if (cue.scene === "intro") window.SeasonsOpening?.mount(screen.querySelector(".led-opening-film"));
  else window.SeasonsOpening?.stop();
  if (cue.scene === "credits") window.SeasonsCredits?.mount(screen.querySelector(".led-credits"));
  else window.SeasonsCredits?.stop();
  setLedSound(cue);
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
  if (cue.scene === "intro") return "four pictures grow in from the corners and become a turning globe. The name appears with the music, then it stays until you press Next";
  if (cue.scene === "names") return `performer names for ${cue.act}`;
  if (cue.scene === "sponsor-video") return "the 45-second Snug Cafe sponsor film with sound; it stops on its last frame until you press Next";
  if (cue.scene === "launch-video") return "the 47-second launch film with sound: teaser lines, the Seasons crest, then “Dance & Wellness Academy — Coming Soon”. It stops on that last card until you press Next";
  if (cue.scene === "sponsor-image") return "the Snug Cafe landscape sponsor picture";
  if (cue.scene === "partners") return "one slide with three equal blocks, left to right: Aahaar Nutrition, Bodh Career & Coaching, Sonal's Classes";
  if (cue.scene === "teacher") return `${cue.name}, ${cue.role}${cue.photo ? ", with their photograph" : ", on a formal name card"}`;
  if (cue.scene === "anthem") return "only the Indian flag, full screen, until the anthem ends";
  if (cue.scene === "bloopers") return "the bloopers film in a gold frame, with the Seasons logo beneath it. It plays once, with its own sound, and holds on “Thank you!!!” until you press Next";
  if (cue.scene === "credits") return "the thank-you names roll up with the goodbye music, then the last card stays until you press Next";
  if (cue.scene === "perform") return `looping music video with the Seasons logo, for ${cue.headline}`;
  return cue.headline || cue.title;
}

function ledGroupHtml(group, cues) {
  const hint = group.startsWith("Act ")
    ? "Two buttons only. Pale card first, while Upasana reads the names. Dark Song card when the band plays the first note."
    : group.startsWith("Sponsor")
      ? "Sponsor exception. Open the curtain on the first card, then follow the host script. Snug Cafe first, then the community partners slide. Never place a sponsor card between a Names card and its Song card."
    : group.startsWith("Launch")
      ? "Big moment. Volume all the way up. Press this the moment FK stops the bus. The film plays once and freezes on “Coming Soon”. Wait for the hosts to finish the launch lines, then go to the Saiyaara Names card."
    : group === "Finale"
      ? "Felicitation first, then advance the eight teacher cards one at a time as each name is called. Vote of Thanks follows, then National Anthem, then Bloopers, then End credits."
      : "Play the opening first and turn the volume up. That picture has music. Then keep the holding screen until the hosts walk on.";
  return `<section class="led-section"><h2>${escapeHtml(group)}</h2><p>${hint}</p><div class="led-cue-grid">${cues.map(cue => {
    const index = LED_CUES.indexOf(cue);
    const preview = cue.scene === "perform" ? `<span class="led-mini-look look-${cue.look}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></span>` : "";
    return `<button type="button" class="led-cue${cue.scene === "perform" || cue.scene === "anthem" || cue.scene === "credits" || cue.scene === "bloopers" || cue.scene === "sponsor-video" || cue.scene === "launch-video" ? " is-song" : ""}${index === ledCurrentIndex ? " on" : ""}" data-led-index="${index}"><b>${index + 1}</b><strong>${escapeHtml(cue.title)}</strong><span>Audience sees: ${escapeHtml(ledAudienceLine(cue))}</span><em>Click when: ${escapeHtml(cue.trigger)}</em>${preview}</button>`;
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
  root.innerHTML = `<div class="led-console-head"><div><div class="eyebrow">Dedicated LED operator</div><h1>Audience screen</h1><p>For every student act: <b>Names</b> opens the curtain, then <b>Song</b> starts only after the hosts clear. The sponsor is the one exception and has three clearly labelled moments. The first sponsor film has sound and plays once; press Next when it ends. During felicitation, advance through the eight teacher cards only as each name is called. After the anthem, play the bloopers, then the credits roll with the goodbye song. Press <b>P</b> once to project. Opening this show with the passcode saves all media on this laptop; wait for the saved message before leaving reliable wifi.</p></div><div class="led-launch"><button type="button" class="project" id="ledOpenBtn"><kbd>P</kbd> Project selected cue</button><button type="button" class="stop" id="ledStopBtn"><kbd>Esc</kbd> Stop projecting</button></div></div>
    <div class="led-how"><article><b>1</b><strong>Open this tab on the LED</strong><span>Or allow Chrome’s screen permission so P can use the second display.</span></article><article><b>2</b><strong>Select the cue</strong><span>Pale card for the names. Dark card for the song. Nothing else to press during host talk.</span></article><article><b>3</b><strong>Press P once</strong><span>That picture fills the screen immediately. No second window or click.</span></article><article><b>4</b><strong>To stop</strong><span>Press <kbd>Escape</kbd>. The cue list comes back.</span></article></div>
    <div class="led-status"><div><small>Currently selected · cue ${ledCurrentIndex + 1} of ${LED_CUES.length}</small><strong>${escapeHtml(current.title)}</strong>${current.music ? `<small>Audio · ${escapeHtml(current.music.replace("loops/", "").replace("sponsors/", ""))}</small>` : current.loop ? `<small>Song video · ${escapeHtml(current.loop.replace("loops/", ""))}</small>` : ""}</div><span class="led-live-dot${ledConnected ? " connected" : ""}">${ledConnected ? "Audience window connected" : "Audience window not detected"}</span></div>
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
let ledMusic = null;
function stopLedMusic() {
  if (!ledMusic) return;
  ledMusic.pause();
  ledMusic.removeAttribute("src");
  ledMusic.load();
  ledMusic = null;
}
function playLedMusic(src, loop = true) {
  stopLedMusic();
  ledMusic = new Audio(src);
  ledMusic.loop = loop;
  ledMusic.volume = 1;
  const pending = ledMusic.play();
  if (pending?.catch) pending.catch(error => console.warn("Cue music could not start", error));
  if (loop) window.SeasonsOpening?.attach(ledMusic);
}
function stopLedSound() {
  ledVoices.forEach(node => { try { node.stop(); } catch (error) { console.warn(error); } });
  ledVoices = [];
  stopLedMusic();
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
  stopLedBed();
  if (!ledAudioContext || ledAudioContext.state !== "running") return;
  if (cue.music) playLedMusic(cue.music, cue.musicLoop !== false && cue.scene !== "credits");
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
