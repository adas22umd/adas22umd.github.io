const POKEMON_COUNT = 151;
const cache = {};
let currentId = 1;
let activeTab = 'stats';
let isAnimating = false;
let dropdownOpen = false;
const TAB_ORDER = ['stats', 'moves', 'locations'];

// ── Gen 1 roster ─────────────────────────────────────────────────────────────
// Index 0 = dex #1. Display name + API slug (lowercase, hyphens).
const ROSTER = [
  {n:"Bulbasaur",s:"bulbasaur"},{n:"Ivysaur",s:"ivysaur"},{n:"Venusaur",s:"venusaur"},
  {n:"Charmander",s:"charmander"},{n:"Charmeleon",s:"charmeleon"},{n:"Charizard",s:"charizard"},
  {n:"Squirtle",s:"squirtle"},{n:"Wartortle",s:"wartortle"},{n:"Blastoise",s:"blastoise"},
  {n:"Caterpie",s:"caterpie"},{n:"Metapod",s:"metapod"},{n:"Butterfree",s:"butterfree"},
  {n:"Weedle",s:"weedle"},{n:"Kakuna",s:"kakuna"},{n:"Beedrill",s:"beedrill"},
  {n:"Pidgey",s:"pidgey"},{n:"Pidgeotto",s:"pidgeotto"},{n:"Pidgeot",s:"pidgeot"},
  {n:"Rattata",s:"rattata"},{n:"Raticate",s:"raticate"},{n:"Spearow",s:"spearow"},
  {n:"Fearow",s:"fearow"},{n:"Ekans",s:"ekans"},{n:"Arbok",s:"arbok"},
  {n:"Pikachu",s:"pikachu"},{n:"Raichu",s:"raichu"},{n:"Sandshrew",s:"sandshrew"},
  {n:"Sandslash",s:"sandslash"},{n:"Nidoran ♀",s:"nidoran-f"},{n:"Nidorina",s:"nidorina"},
  {n:"Nidoqueen",s:"nidoqueen"},{n:"Nidoran ♂",s:"nidoran-m"},{n:"Nidorino",s:"nidorino"},
  {n:"Nidoking",s:"nidoking"},{n:"Clefairy",s:"clefairy"},{n:"Clefable",s:"clefable"},
  {n:"Vulpix",s:"vulpix"},{n:"Ninetales",s:"ninetales"},{n:"Jigglypuff",s:"jigglypuff"},
  {n:"Wigglytuff",s:"wigglytuff"},{n:"Zubat",s:"zubat"},{n:"Golbat",s:"golbat"},
  {n:"Oddish",s:"oddish"},{n:"Gloom",s:"gloom"},{n:"Vileplume",s:"vileplume"},
  {n:"Paras",s:"paras"},{n:"Parasect",s:"parasect"},{n:"Venonat",s:"venonat"},
  {n:"Venomoth",s:"venomoth"},{n:"Diglett",s:"diglett"},{n:"Dugtrio",s:"dugtrio"},
  {n:"Meowth",s:"meowth"},{n:"Persian",s:"persian"},{n:"Psyduck",s:"psyduck"},
  {n:"Golduck",s:"golduck"},{n:"Mankey",s:"mankey"},{n:"Primeape",s:"primeape"},
  {n:"Growlithe",s:"growlithe"},{n:"Arcanine",s:"arcanine"},{n:"Poliwag",s:"poliwag"},
  {n:"Poliwhirl",s:"poliwhirl"},{n:"Poliwrath",s:"poliwrath"},{n:"Abra",s:"abra"},
  {n:"Kadabra",s:"kadabra"},{n:"Alakazam",s:"alakazam"},{n:"Machop",s:"machop"},
  {n:"Machoke",s:"machoke"},{n:"Machamp",s:"machamp"},{n:"Bellsprout",s:"bellsprout"},
  {n:"Weepinbell",s:"weepinbell"},{n:"Victreebel",s:"victreebel"},{n:"Tentacool",s:"tentacool"},
  {n:"Tentacruel",s:"tentacruel"},{n:"Geodude",s:"geodude"},{n:"Graveler",s:"graveler"},
  {n:"Golem",s:"golem"},{n:"Ponyta",s:"ponyta"},{n:"Rapidash",s:"rapidash"},
  {n:"Slowpoke",s:"slowpoke"},{n:"Slowbro",s:"slowbro"},{n:"Magnemite",s:"magnemite"},
  {n:"Magneton",s:"magneton"},{n:"Farfetch'd",s:"farfetchd"},{n:"Doduo",s:"doduo"},
  {n:"Dodrio",s:"dodrio"},{n:"Seel",s:"seel"},{n:"Dewgong",s:"dewgong"},
  {n:"Grimer",s:"grimer"},{n:"Muk",s:"muk"},{n:"Shellder",s:"shellder"},
  {n:"Cloyster",s:"cloyster"},{n:"Gastly",s:"gastly"},{n:"Haunter",s:"haunter"},
  {n:"Gengar",s:"gengar"},{n:"Onix",s:"onix"},{n:"Drowzee",s:"drowzee"},
  {n:"Hypno",s:"hypno"},{n:"Krabby",s:"krabby"},{n:"Kingler",s:"kingler"},
  {n:"Voltorb",s:"voltorb"},{n:"Electrode",s:"electrode"},{n:"Exeggcute",s:"exeggcute"},
  {n:"Exeggutor",s:"exeggutor"},{n:"Cubone",s:"cubone"},{n:"Marowak",s:"marowak"},
  {n:"Hitmonlee",s:"hitmonlee"},{n:"Hitmonchan",s:"hitmonchan"},{n:"Lickitung",s:"lickitung"},
  {n:"Koffing",s:"koffing"},{n:"Weezing",s:"weezing"},{n:"Rhyhorn",s:"rhyhorn"},
  {n:"Rhydon",s:"rhydon"},{n:"Chansey",s:"chansey"},{n:"Tangela",s:"tangela"},
  {n:"Kangaskhan",s:"kangaskhan"},{n:"Horsea",s:"horsea"},{n:"Seadra",s:"seadra"},
  {n:"Goldeen",s:"goldeen"},{n:"Seaking",s:"seaking"},{n:"Staryu",s:"staryu"},
  {n:"Starmie",s:"starmie"},{n:"Mr. Mime",s:"mr-mime"},{n:"Scyther",s:"scyther"},
  {n:"Jynx",s:"jynx"},{n:"Electabuzz",s:"electabuzz"},{n:"Magmar",s:"magmar"},
  {n:"Pinsir",s:"pinsir"},{n:"Tauros",s:"tauros"},{n:"Magikarp",s:"magikarp"},
  {n:"Gyarados",s:"gyarados"},{n:"Lapras",s:"lapras"},{n:"Ditto",s:"ditto"},
  {n:"Eevee",s:"eevee"},{n:"Vaporeon",s:"vaporeon"},{n:"Jolteon",s:"jolteon"},
  {n:"Flareon",s:"flareon"},{n:"Porygon",s:"porygon"},{n:"Omanyte",s:"omanyte"},
  {n:"Omastar",s:"omastar"},{n:"Kabuto",s:"kabuto"},{n:"Kabutops",s:"kabutops"},
  {n:"Aerodactyl",s:"aerodactyl"},{n:"Snorlax",s:"snorlax"},{n:"Articuno",s:"articuno"},
  {n:"Zapdos",s:"zapdos"},{n:"Moltres",s:"moltres"},{n:"Dratini",s:"dratini"},
  {n:"Dragonair",s:"dragonair"},{n:"Dragonite",s:"dragonite"},{n:"Mewtwo",s:"mewtwo"},
  {n:"Mew",s:"mew"}
];

// Icon sprite — tiny party-screen sprite from Gen VIII icons
function iconUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`;
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
function openDropdown() {
  if (dropdownOpen) return;
  dropdownOpen = true;
  const dd = document.getElementById('search-dropdown');
  gsap.fromTo(dd,
    { opacity: 0, y: -6, pointerEvents: 'none' },
    { opacity: 1, y: 0,  pointerEvents: 'all', duration: 0.18, ease: 'power2.out',
      onStart() { dd.style.display = 'block'; }
    }
  );
  filterDropdown('');
}

function closeDropdown() {
  if (!dropdownOpen) return;
  dropdownOpen = false;
  const dd = document.getElementById('search-dropdown');
  gsap.to(dd, {
    opacity: 0, y: -6, duration: 0.14, ease: 'power2.in',
    onComplete() { dd.style.display = 'none'; }
  });
}

function filterDropdown(query) {
  const q = query.trim().toLowerCase();
  const list = document.getElementById('dropdown-list');

  const matches = ROSTER.filter(p => {
    if (!q) return true;
    const num = parseInt(q);
    if (!isNaN(num)) return (ROSTER.indexOf(p) + 1) === num;
    return p.n.toLowerCase().includes(q) || p.s.includes(q);
  });

  if (!matches.length) {
    list.innerHTML = '<div class="dd-empty">No results</div>';
    return;
  }

  list.innerHTML = matches.map(p => {
    const id = ROSTER.indexOf(p) + 1;
    const num = String(id).padStart(3, '0');
    return `<div class="dd-item" data-id="${id}" onmousedown="selectFromDropdown(${id})">
      <img class="dd-icon" src="${iconUrl(id)}" alt="${p.n}" loading="lazy">
      <span class="dd-num">#${num}</span>
      <span class="dd-name">${p.n}</span>
    </div>`;
  }).join('');
}

async function selectFromDropdown(id) {
  closeDropdown();
  document.getElementById('search-input').value = '';
  currentId = id;
  await loadAndDisplay(id);
}

// ── Boot ──────────────────────────────────────────────────────────────────────
window.onload = async function () {
  document.getElementById('changeright').addEventListener('click', nextPokemon);
  document.getElementById('changeleft').addEventListener('click', prevPokemon);

  const input = document.getElementById('search-input');

  // Open on focus
  input.addEventListener('focus', () => openDropdown());

  // Live filter while typing
  input.addEventListener('input', () => {
    if (!dropdownOpen) openDropdown();
    filterDropdown(input.value);
  });

  // Enter key still triggers search
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { closeDropdown(); handleSearch(); }
    if (e.key === 'Escape') closeDropdown();
  });

  // Close when clicking outside
  document.addEventListener('mousedown', e => {
    if (!document.getElementById('search-bar').contains(e.target)) closeDropdown();
  });

  document.getElementById('move-filter-input').addEventListener('input', () => {
    const data = cache[currentId];
    if (data) renderMoves(data);
  });

  // Dropdown starts hidden
  const dd = document.getElementById('search-dropdown');
  dd.style.display = 'none';
  gsap.set(dd, { opacity: 0 });

  gsap.set('#filter-panel', { height: 0, opacity: 0 });

  // ── Page entrance: elements drop in from above, one by one ──
  const enterEls = [
    '.side-panel--left',
    '.screen-container',
    '.side-panel--right',
  ];
  gsap.set(enterEls, { y: -60, opacity: 0 });
  gsap.to(enterEls, {
    y: 0,
    opacity: 1,
    duration: 0.55,
    ease: 'power3.out',
    stagger: 0.12,
    delay: 0.1,
  });

  await loadAndDisplay(1);
  // Init keyboard tab highlight
  kbHighlightTab(activeTab);
};

// ── Navigation ────────────────────────────────────────────────────────────────
async function nextPokemon() {
  currentId = (currentId % POKEMON_COUNT) + 1;
  await loadAndDisplay(currentId);
}
async function prevPokemon() {
  currentId = currentId === 1 ? POKEMON_COUNT : currentId - 1;
  await loadAndDisplay(currentId);
}

// ── Search (manual GO / Enter) ────────────────────────────────────────────────
async function handleSearch() {
  const raw = document.getElementById('search-input').value.trim().toLowerCase();
  if (!raw) return;
  const num = parseInt(raw);
  if (!isNaN(num)) {
    if (num >= 1 && num <= POKEMON_COUNT) {
      currentId = num;
      await loadAndDisplay(currentId);
      document.getElementById('search-input').value = '';
    } else { showError('Outside Gen 1!'); }
    return;
  }
  // Match against roster
  const match = ROSTER.find(p => p.n.toLowerCase() === raw || p.s === raw);
  if (match) {
    currentId = ROSTER.indexOf(match) + 1;
    await loadAndDisplay(currentId);
    document.getElementById('search-input').value = '';
    return;
  }
  // Fall back to cache
  const cached = Object.values(cache).find(p => typeof p === 'object' && p.name && p.name.toLowerCase() === raw);
  if (cached) {
    currentId = cached.id;
    await loadAndDisplay(currentId);
    document.getElementById('search-input').value = '';
    return;
  }
  showError('Not found!');
}

// ── Fetch + cache ─────────────────────────────────────────────────────────────
async function fetchPokemon(idOrName) {
  const key = typeof idOrName === 'string' ? idOrName.toLowerCase() : idOrName;
  if (cache[key]) return cache[key];

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
  if (!res.ok) throw new Error('Not found');
  const pokemon = await res.json();

  const genV = pokemon.sprites?.versions?.['generation-v']?.['black-white'];
  const img  = genV?.animated?.front_default
             || genV?.front_default
             || pokemon.sprites?.front_default
             || '';

  const types = pokemon.types.map(t => t.type.name);
  const stats = pokemon.stats.map(s => ({ name: formatStatName(s.stat.name), value: s.base_stat }));

  const levelUpMoves = [], tmMoves = [], eggMoves = [];
  pokemon.moves.forEach(m => {
    const methods = m.version_group_details.map(v => v.move_learn_method.name);
    const name    = formatMoveName(m.move.name);
    if (methods.includes('level-up')) {
      const detail = m.version_group_details
        .filter(v => v.move_learn_method.name === 'level-up')
        .sort((a, b) => a.level_learned_at - b.level_learned_at)[0];
      levelUpMoves.push({ name, level: detail.level_learned_at });
    } else if (methods.includes('machine')) {
      tmMoves.push({ name });
    } else if (methods.includes('egg')) {
      eggMoves.push({ name });
    }
  });
  levelUpMoves.sort((a, b) => a.level - b.level);
  tmMoves.sort((a, b)      => a.name.localeCompare(b.name));
  eggMoves.sort((a, b)     => a.name.localeCompare(b.name));

  const speciesRes  = await fetch(pokemon.species.url);
  const speciesData = await speciesRes.json();
  const englishEntries = speciesData.flavor_text_entries.filter(e => e.language.name === 'en');
  const descEntry   = englishEntries[0];
  const desc        = descEntry ? descEntry.flavor_text.replace(/[\n\f\r]/g, ' ') : 'No description available.';
  // Oak gets a different entry — pick the last one so it's distinct from the first
  const oakEntry    = englishEntries.length > 1 ? englishEntries[englishEntries.length - 1] : descEntry;
  const oakDesc     = oakEntry ? oakEntry.flavor_text.replace(/[\n\f\r]/g, ' ') : desc;

  const locRes  = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/encounters`);
  const locData = await locRes.json();
  const FRLG_VERSIONS = new Set(['firered', 'leafgreen']);
  const frlgLocData = locData.filter(l =>
    l.version_details.some(v => FRLG_VERSIONS.has(v.version.name))
  );
  const locations = frlgLocData.map(l => formatLocationName(l.location_area.name.replace(/-area$/, '')));

  const data = { id: pokemon.id, name: pokemon.name, img, types, stats, levelUpMoves, tmMoves, eggMoves, desc, oakDesc, locations, speciesUrl: pokemon.species.url };
  cache[pokemon.id]   = data;
  cache[pokemon.name] = data;
  return data;
}

// ── Load & render ─────────────────────────────────────────────────────────────
async function loadAndDisplay(idOrName) {
  animatePokemonOut();
  try {
    const data = await fetchPokemon(idOrName);
    currentId = data.id;
    document.getElementById('move-filter-input').value = '';
    renderPokemon(data);
    animatePokemonIn();
    renderCurrentTab(data);
    gsap.fromTo('#tab-content', { opacity: 0 }, { opacity: 1, duration: 0.25 });

    // ── Side panel updates ──
    updateOakText(data.oakDesc);
    pushRecent(data.id, data.name);
    renderRecent(); // re-render to exclude newly current
    renderEvoChain(data.speciesUrl, data.id);
  } catch { showError(String(idOrName)); }
}

function renderPokemon(data) {
  document.getElementById('sprite').src        = data.img;
  document.getElementById('sprite').alt        = data.name;
  document.getElementById('number').textContent = '#' + String(data.id).padStart(3, '0');
  document.getElementById('name').textContent   = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
  document.getElementById('desc').textContent   = data.desc;
  const tc = document.getElementById('typing-container');
  tc.innerHTML = '';
  data.types.forEach(type => {
    const b = document.createElement('div');
    b.className   = `typing t-${type}`;
    b.textContent = type.toUpperCase();
    tc.appendChild(b);
  });
}

// ── GSAP: Pokémon swap ────────────────────────────────────────────────────────
function animatePokemonOut() {
  gsap.to('#sprite',    { opacity: 0, x: -20, duration: 0.18, ease: 'power2.in' });
  gsap.to('#main-info', { opacity: 0, x:  20, duration: 0.18, ease: 'power2.in' });
}
function animatePokemonIn() {
  gsap.fromTo('#sprite',    { opacity: 0, x: 20  }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 });
  gsap.fromTo('#main-info', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 });
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function switchTab(newTab) {
  if (isAnimating) return;
  const prevTab = activeTab;
  if (prevTab === newTab) return;

  const goingRight = TAB_ORDER.indexOf(newTab) > TAB_ORDER.indexOf(prevTab);
  TAB_ORDER.forEach(t => document.getElementById(`tab-${t}`).classList.toggle('active', t === newTab));
  kbHighlightTab(newTab);

  if (newTab === 'moves') {
    gsap.to('#filter-panel', { height: 'auto', opacity: 1, duration: 0.28, ease: 'power2.out' });
  } else {
    gsap.to('#filter-panel', { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
  }

  const data = cache[currentId];
  if (!data) { activeTab = newTab; return; }

  isAnimating = true;
  const content = document.getElementById('tab-content');
  gsap.to(content, {
    x: goingRight ? -30 : 30, opacity: 0, duration: 0.16, ease: 'power2.in',
    onComplete() {
      activeTab = newTab;
      renderCurrentTab(data);
      gsap.fromTo(content,
        { x: goingRight ? 30 : -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.22, ease: 'power2.out',
          onComplete() { isAnimating = false; } }
      );
    }
  });
}

function renderCurrentTab(data) {
  const tc = document.getElementById('tab-content');
  tc.classList.toggle('map-tab', activeTab === 'locations');
  if (activeTab === 'stats')     renderStats(data);
  if (activeTab === 'moves')     renderMoves(data);
  if (activeTab === 'locations') renderLocations(data);
}

// ── Renderers ─────────────────────────────────────────────────────────────────
function renderStats(data) {
  const html = data.stats.map(s => {
    const pct      = Math.round((s.value / 255) * 100);
    const barColor = s.value >= 100 ? '#5DBE62' : s.value >= 60 ? '#FAD000' : '#FA7179';
    return `<div class="stat-row">
      <span class="stat-name">${s.name}</span>
      <span class="stat-val">${s.value}</span>
      <div class="stat-bar-bg"><div class="stat-bar" style="width:${pct}%;background:${barColor};"></div></div>
    </div>`;
  }).join('');
  setTabContent(html);
  gsap.fromTo('.stat-bar',
    { scaleX: 0, transformOrigin: 'left center' },
    { scaleX: 1, duration: 0.45, ease: 'power2.out', stagger: 0.06 }
  );
}

function renderMoves(data) {
  const query   = document.getElementById('move-filter-input').value.trim().toLowerCase();
  const filter  = arr => query ? arr.filter(m => m.name.toLowerCase().includes(query)) : arr;
  const lvMoves = filter(data.levelUpMoves);
  const tms     = filter(data.tmMoves);
  const eggs    = filter(data.eggMoves);

  if (!lvMoves.length && !tms.length && !eggs.length) {
    setTabContent('<p class="empty">NO MOVES FOUND.</p>'); return;
  }
  let html = '';
  if (lvMoves.length) {
    html += `<div class="move-section-header lv-header">LEVEL UP</div>`;
    html += lvMoves.map(m => `<div class="move-row"><span class="move-tag lv-tag">Lv.${m.level === 0 ? '1' : m.level}</span><span class="move-name">${m.name}</span></div>`).join('');
  }
  if (tms.length) {
    html += `<div class="move-section-header tm-header">TM / HM</div>`;
    html += tms.map(m => `<div class="move-row"><span class="move-tag tm-tag">TM</span><span class="move-name">${m.name}</span></div>`).join('');
  }
  if (eggs.length) {
    html += `<div class="move-section-header egg-header">EGG</div>`;
    html += eggs.map(m => `<div class="move-row"><span class="move-tag egg-tag">EGG</span><span class="move-name">${m.name}</span></div>`).join('');
  }
  setTabContent(html);
}

// ══════════════════════════════════════════════════════════════════════════════
// KANTO MAP — location hotspots
// Coordinates are percentages of the map image (left%, top%)
// Map image dimensions: 440 × 160 px (as exported)
// ══════════════════════════════════════════════════════════════════════════════
const KANTO_LOCATIONS = [
  // Raw pixel centers from image-map.net — image is 436x128 px
  { key: 'pallet-town',     label: 'Pallet Town',     x: 153, y: 90  },
  { key: 'viridian-city',   label: 'Viridian City',   x: 153, y: 69  },
  { key: 'route-1',         label: 'Route 1',         x: 152, y: 79  },
  { key: 'route-2',         label: 'Route 2',         x: 153, y: 52  },
  { key: 'pewter-city',     label: 'Pewter City',     x: 153, y: 38  },
  { key: 'route-21',        label: 'Route 21',        x: 153, y: 102 },
  { key: 'cinnabar-island', label: 'Cinnabar Island', x: 153, y: 112 },
  { key: 'seafoam-islands', label: 'Seafoam Islands', x: 205, y: 113 },
  { key: 'route-20',        label: 'Route 20',        x: 234, y: 114 },
  { key: 'route-19',        label: 'Route 19',        x: 238, y: 107 },
  { key: 'fuchsia-city',    label: 'Fuchsia City',    x: 238, y: 101 },
  { key: 'route-18',        label: 'Route 18',        x: 211, y: 99  },
  { key: 'route-17',        label: 'Route 17',        x: 193, y: 68  },
  { key: 'route-16',        label: 'Route 16',        x: 201, y: 53  },
  { key: 'celadon-city',    label: 'Celadon City',    x: 218, y: 52  },
  { key: 'route-7',         label: 'Route 7',         x: 240, y: 52  },
  { key: 'saffron-city',    label: 'Saffron City',    x: 260, y: 52  },
  { key: 'route-8',         label: 'Route 8',         x: 282, y: 52  },
  { key: 'route-5',         label: 'Route 5',         x: 260, y: 41  },
  { key: 'route-6',         label: 'Route 6',         x: 260, y: 65  },
  { key: 'vermilion-city',  label: 'Vermilion City',  x: 260, y: 75  },
  { key: 'route-11',        label: 'Route 11',        x: 283, y: 75  },
  { key: 'route-12',        label: 'Route 12',        x: 303, y: 77  },
  { key: 'route-13',        label: 'Route 13',        x: 286, y: 92  },
  { key: 'route-14',        label: 'Route 14',        x: 271, y: 96  },
  { key: 'route-15',        label: 'Route 15',        x: 255, y: 99  },
  { key: 'route-22',        label: 'Route 22',        x: 134, y: 68  },
  { key: 'route-23',        label: 'Route 23',        x: 132, y: 57  },
  { key: 'victory-road',    label: 'Victory Road',    x: 132, y: 43  },
  { key: 'indigo-plateau',  label: 'Indigo Plateau',  x: 132, y: 25  },
  { key: 'mt-moon',         label: 'Mt. Moon',        x: 203, y: 29  },
  { key: 'route-3',         label: 'Route 3',         x: 183, y: 36  },
  { key: 'route-4',         label: 'Route 4',         x: 235, y: 29  },
  { key: 'lavender-town',   label: 'Lavender Town',   x: 302, y: 52  },
  { key: 'rock-tunnel',     label: 'Rock Tunnel',     x: 302, y: 29  },
  { key: 'power-plant',     label: 'Power Plant',     x: 312, y: 39  },
  { key: 'digletts-cave',   label: "Diglett's Cave",  x: 153, y: 53  },
  { key: 'route-25',        label: 'Route 25',        x: 271, y: 13  },
  { key: 'route-24',        label: 'Route 24',        x: 259, y: 15  },
  { key: 'bills-house',     label: "Bill's House",    x: 282, y: 14  },
  { key: 'route-9',         label: 'Route 9',         x: 282, y: 29  },
  { key: 'cerulean-city',   label: 'Cerulean City',   x: 260, y: 29  },
  { key: 'route-10',        label: 'Route 10',        x: 304, y: 40  },
  { key: 'cerulean-cave',   label: 'Cerulean Cave',   x: 244, y: 23  },
  { key: 'safari-zone',     label: 'Safari Zone',     x: 200, y: 67  },
];

// Normalise a raw PokeAPI location string into a simple slug for matching
function normaliseLocationKey(raw) {
  return raw
    .toLowerCase()
    // strip common PokeAPI prefixes like "kanto-" or "gen-i-"
    .replace(/^(kanto-|johto-|hoenn-|sinnoh-|unova-|kalos-|alola-|gen-[ivx]+-)/g, '')
    // rename known API aliases to match our keys
    .replace(/diglett-tunnel/g, 'digletts-cave')
    .replace(/viridian-forest/g, 'viridian-forest')
    .replace(/mt-moon/g, 'mt-moon')
    .replace(/pallet-town/g, 'pallet-town')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-');
}

// Find the best matching hotspot for a raw PokeAPI location string
function matchHotspot(locationStr) {
  const key = normaliseLocationKey(locationStr);
  // 1. Exact match
  let found = KANTO_LOCATIONS.find(h => h.key === key);
  if (found) return found;
  // 2. Our key is contained within the API key or vice versa
  found = KANTO_LOCATIONS.find(h => key.includes(h.key) || h.key.includes(key));
  if (found) return found;
  // 3. Meaningful word overlap (skip short words)
  const words = key.split('-').filter(w => w.length > 3);
  found = KANTO_LOCATIONS.find(h => words.some(w => h.key.includes(w)));
  return found || null;
}

function renderLocations(data) {
  if (!data.locations.length) {
    setTabContent('<p class="empty">Not found in the wild in<br>Fire Red / Leaf Green</p>');
    return;
  }

  // Render: <img> handles aspect ratio via CSS object-fit:contain
  // A transparent canvas overlay handles dot drawing + tooltips
  setTabContent(`
    <div id="map-wrap" style="position:relative;width:100%;height:100%;">
      <img class="map-bg" src="Kanto_Map.png" alt="Kanto Map">
      <canvas id="kanto-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;"></canvas>
      <div id="map-tooltip" style="
        display:none;position:absolute;pointer-events:none;
        background:#111;border:1.5px solid #FAD000;border-radius:4px;
        padding:3px 8px;font-family:'Pixelify Sans',sans-serif;
        font-size:10px;letter-spacing:1px;color:#FAD000;
        white-space:nowrap;z-index:10;transform:translate(-50%,-130%);
      "></div>
    </div>
  `);

  const canvas  = document.getElementById('kanto-canvas');
  const mapImg  = document.querySelector('#map-wrap img.map-bg');
  const tooltip = document.getElementById('map-tooltip');
  const wrap    = document.getElementById('map-wrap');
  if (!canvas || !mapImg) return;

  const matched = [];
  data.locations.forEach(loc => {
    const h = matchHotspot(loc);
    if (h && !matched.find(m => m.key === h.key)) matched.push(h);
  });

  const IMG_W = 436, IMG_H = 128;

  // Returns the scale + offset so dots map 1-to-1 with the image-map coords
  function getMapRect() {
    const wW = wrap.clientWidth;
    const wH = wrap.clientHeight;
    const scale = Math.min(wW / IMG_W, wH / IMG_H);
    const rW = IMG_W * scale;
    const rH = IMG_H * scale;
    return { ox: (wW - rW) / 2, oy: (wH - rH) / 2, scale };
  }

  function draw() {
    const wW = wrap.clientWidth  || IMG_W;
    const wH = wrap.clientHeight || IMG_H;
    canvas.width  = wW;
    canvas.height = wH;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, wW, wH);

    const { ox, oy, scale } = getMapRect();

    matched.forEach(hp => {
      const px = ox + hp.x * scale;
      const py = oy + hp.y * scale;

      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(250,208,0,0.3)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FAD000';
      ctx.fill();
      ctx.strokeStyle = '#3a2a00';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    // Mouse position in canvas pixel space
    const mx = (e.clientX - rect.left) * (canvas.width  / rect.width);
    const my = (e.clientY - rect.top)  * (canvas.height / rect.height);
    const { ox, oy, scale } = getMapRect();
    // Convert back to image-map pixel space
    const ix = (mx - ox) / scale;
    const iy = (my - oy) / scale;
    const hitRadius = 8 / scale; // ~8 display px hit area

    const hit = matched.find(hp => {
      const dx = hp.x - ix;
      const dy = hp.y - iy;
      return Math.sqrt(dx*dx + dy*dy) < hitRadius;
    });

    if (hit) {
      canvas.style.cursor = 'pointer';
      tooltip.style.display = 'block';
      tooltip.textContent = hit.label;
      const dispX = (ox + hit.x * scale) * (rect.width  / canvas.width);
      const dispY = (oy + hit.y * scale) * (rect.height / canvas.height);
      tooltip.style.left = `${dispX}px`;
      tooltip.style.top  = `${dispY}px`;
    } else {
      canvas.style.cursor = 'default';
      tooltip.style.display = 'none';
    }
  });

  canvas.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });

  if (mapImg.complete && mapImg.naturalWidth) {
    draw();
  } else {
    mapImg.onload = draw;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function setTabContent(html) { document.getElementById('tab-content').innerHTML = html; }
const NOT_FOUND_QUIPS = [
  "It fled before you could throw a Poké Ball.",
  "Professor Oak has no data on this one.",
  "Even the Pokédex drew a blank.",
  "A wild Missingno. appeared... then vanished.",
  "Looks like Team Rocket took this one.",
  "No data. It may live only in legend.",
  "Your Pokédex returned only static.",
  "This Pokémon has never been seen by human eyes.",
];

function showError(query) {
  const sprite = document.getElementById('sprite');
  sprite.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  sprite.alt = '?';
  document.getElementById('number').textContent = '#???';
  document.getElementById('name').textContent   = 'UNKNOWN POKEMON';
  document.getElementById('desc').textContent   = '';
  document.getElementById('typing-container').innerHTML = '';
  gsap.fromTo('#sprite',    { opacity: 0, x: 20  }, { opacity: 0.12, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 });
  gsap.fromTo('#main-info', { opacity: 0, x: -20 }, { opacity: 1,    x: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 });
  const quip = NOT_FOUND_QUIPS[Math.floor(Math.random() * NOT_FOUND_QUIPS.length)];
  setTabContent(`
    <div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding:18px 8px;">
      <div style="font-size:28px;line-height:1;">?</div>
      <p class="empty" style="margin:0;">NOT FOUND</p>
      <p style="color:#555;font-size:10px;text-align:center;letter-spacing:0.5px;line-height:1.6;max-width:200px;">${quip}</p>
    </div>
  `);
  // Update side panels for error state
  updateOakText("No data available for this Pokémon.");
  document.getElementById('evo-chain').innerHTML = '<span class="side-empty">Unavailable</span>';
}
function formatStatName(name) {
  const map = { 'hp':'HP','attack':'ATK','defense':'DEF','special-attack':'SP.ATK','special-defense':'SP.DEF','speed':'SPD' };
  return map[name] || name.toUpperCase();
}
function formatMoveName(name)     { return name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '); }
function formatLocationName(name) { return name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '); }
// ══════════════════════════════════════════════════════════════════════════════
// TYPE → BACKGROUND COLOR MAP
// ══════════════════════════════════════════════════════════════════════════════
const TYPE_BG = {
  bug:      '#0e1a00',
  fire:     '#1f0a00',
  water:    '#00101f',
  grass:    '#001a05',
  electric: '#1a1500',
  psychic:  '#1f0008',
  normal:   '#111111',
  flying:   '#080f1a',
  poison:   '#130020',
  rock:     '#1a1508',
  ground:   '#1a0800',
  ice:      '#00161a',
  fighting: '#1a0010',
  ghost:    '#08001a',
  dragon:   '#000d1a',
  dark:     '#0a0a0d',
  steel:    '#080d10',
  fairy:    '#1a0018',
};

function updateBodyBg(primaryType) {
  const color = TYPE_BG[primaryType] || '#1a0202';
  gsap.to(document.body, { backgroundColor: color, duration: 1.2, ease: 'power2.out' });
}

// ══════════════════════════════════════════════════════════════════════════════
// KEYBOARD NAVIGATION
// ══════════════════════════════════════════════════════════════════════════════
//
//  Modes:
//    'browse'  — default. Arrow L/R = prev/next Pokémon. Tab = cycle tabs.
//                Press / or S to jump to search focus mode.
//    'search'  — search input is focused. Type to filter dropdown.
//                Arrow Up/Down navigate dropdown items.
//                Enter selects. Escape returns to browse.
//
//  Visual feedback: a subtle highlight ring on the active tab in browse mode.
//

let kbMode = 'browse';
let ddFocusIndex = -1; // which dropdown item is keyboard-highlighted

// ── Highlight the active tab with a keyboard-focus ring ──────────────────────
function kbHighlightTab(tab) {
  TAB_ORDER.forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    btn.classList.toggle('kb-focus', t === tab);
  });
}

function kbClearTabHighlight() {
  TAB_ORDER.forEach(t => document.getElementById(`tab-${t}`).classList.remove('kb-focus'));
}

// ── Dropdown keyboard navigation helpers ─────────────────────────────────────
function ddItems() {
  return [...document.querySelectorAll('#dropdown-list .dd-item')];
}

function ddSetFocus(idx) {
  const items = ddItems();
  if (!items.length) return;
  ddFocusIndex = Math.max(0, Math.min(idx, items.length - 1));
  items.forEach((el, i) => el.classList.toggle('dd-kb-focus', i === ddFocusIndex));
  items[ddFocusIndex]?.scrollIntoView({ block: 'nearest' });
}

function ddClearFocus() {
  ddItems().forEach(el => el.classList.remove('dd-kb-focus'));
  ddFocusIndex = -1;
}

// ── Enter browse mode ─────────────────────────────────────────────────────────
function enterBrowseMode() {
  kbMode = 'browse';
  const input = document.getElementById('search-input');
  input.blur();
  closeDropdown();
  ddClearFocus();
  kbHighlightTab(activeTab);
}

// ── Enter search mode ─────────────────────────────────────────────────────────
function enterSearchMode() {
  kbMode = 'search';
  kbClearTabHighlight();
  ddClearFocus();
  const input = document.getElementById('search-input');
  input.focus();
  openDropdown();
}

// ── Main keydown handler ──────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  // Never intercept when a real input/textarea has focus (except our search input)
  const active = document.activeElement;
  const isMoveFilter = active === document.getElementById('move-filter-input');
  const isSearchInput = active === document.getElementById('search-input');

  // Move-filter input: only intercept Escape to return to browse
  if (isMoveFilter) {
    if (e.key === 'Escape') { active.blur(); enterBrowseMode(); e.preventDefault(); }
    return;
  }

  // ── SEARCH MODE ────────────────────────────────────────────────────────────
  if (kbMode === 'search' || isSearchInput) {
    switch (e.key) {
      case 'Escape':
        enterBrowseMode();
        e.preventDefault();
        break;
      case 'ArrowDown': {
        e.preventDefault();
        if (!dropdownOpen) openDropdown();
        const items = ddItems();
        ddSetFocus(ddFocusIndex < 0 ? 0 : ddFocusIndex + 1);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (ddFocusIndex > 0) ddSetFocus(ddFocusIndex - 1);
        break;
      }
      case 'Enter': {
        if (ddFocusIndex >= 0) {
          e.preventDefault();
          const item = ddItems()[ddFocusIndex];
          if (item) {
            const id = parseInt(item.dataset.id);
            selectFromDropdown(id);
            enterBrowseMode();
          }
        }
        // else let the existing input Enter handler fire (handleSearch)
        break;
      }
    }
    return;
  }

  // ── BROWSE MODE ────────────────────────────────────────────────────────────
  // Don't fire if any modifier key is held (browser shortcuts)
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  switch (e.key) {
    // Prev / Next Pokémon
    case 'ArrowLeft':
      e.preventDefault();
      prevPokemon();
      break;
    case 'ArrowRight':
      e.preventDefault();
      nextPokemon();
      break;

    // Cycle through tabs
    case 'Tab': {
      e.preventDefault();
      const cur = TAB_ORDER.indexOf(activeTab);
      const next = e.shiftKey
        ? (cur - 1 + TAB_ORDER.length) % TAB_ORDER.length
        : (cur + 1) % TAB_ORDER.length;
      switchTab(TAB_ORDER[next]);
      kbHighlightTab(TAB_ORDER[next]);
      break;
    }

    // Jump to search
    case '/':
    case 's':
    case 'S':
      e.preventDefault();
      enterSearchMode();
      break;

    // Jump to move filter (only when on moves tab)
    case 'f':
    case 'F':
      if (activeTab === 'moves') {
        e.preventDefault();
        kbClearTabHighlight();
        document.getElementById('move-filter-input').focus();
      }
      break;
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// RECENTLY VIEWED
// ══════════════════════════════════════════════════════════════════════════════
const recentlyViewed = []; // array of { id, name }
const RECENT_MAX = 6;

function pushRecent(id, name) {
  // Remove if already present
  const idx = recentlyViewed.findIndex(r => r.id === id);
  if (idx !== -1) recentlyViewed.splice(idx, 1);
  // Push to front
  recentlyViewed.unshift({ id, name });
  if (recentlyViewed.length > RECENT_MAX) recentlyViewed.pop();
  renderRecent();
}

function renderRecent() {
  const list = document.getElementById('recent-list');
  const items = recentlyViewed.filter(r => r.id !== currentId);
  if (!items.length) {
    list.innerHTML = '<span class="side-empty">None yet</span>';
    return;
  }
  list.innerHTML = items.map(r => {
    const num = String(r.id).padStart(3, '0');
    return `<div class="recent-item" onclick="loadAndDisplay(${r.id})">
      <img class="recent-icon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${r.id}.png" alt="${r.name}" loading="lazy">
      <div class="recent-info">
        <span class="recent-num">#${num}</span>
        <span class="recent-name">${r.name.toUpperCase()}</span>
      </div>
    </div>`;
  }).join('');

  // Stagger items in from left
  const els = list.querySelectorAll('.recent-item');
  gsap.fromTo(els,
    { opacity: 0, x: -14 },
    { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out', stagger: 0.05 }
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// EVOLUTION CHAIN
// ══════════════════════════════════════════════════════════════════════════════

// Walk the nested PokeAPI evolution chain object into a flat array of stages:
// [ [{id, name}], [{id, name}, ...], ... ]
async function fetchEvoChain(speciesUrl) {
  const speciesRes = await fetch(speciesUrl);
  const speciesData = await speciesRes.json();
  const chainRes = await fetch(speciesData.evolution_chain.url);
  const chainData = await chainRes.json();

  // Flatten the linked-list structure into stages
  const stages = [];
  function walk(node, depth) {
    if (!stages[depth]) stages[depth] = [];
    // Extract numeric ID from species URL
    const urlParts = node.species.url.split('/').filter(Boolean);
    const id = parseInt(urlParts[urlParts.length - 1]);
    const name = node.species.name;
    const trigger = node.evolution_details[0]
      ? describeEvoTrigger(node.evolution_details[0])
      : null;
    stages[depth].push({ id, name, trigger });
    node.evolves_to.forEach(child => walk(child, depth + 1));
  }
  walk(chainData.chain, 0);
  return stages;
}

function describeEvoTrigger(detail) {
  if (detail.min_level)        return `Lv. ${detail.min_level}`;
  if (detail.item)             return detail.item.name.replace(/-/g, ' ');
  if (detail.trigger.name === 'trade') return 'Trade';
  if (detail.min_happiness)   return 'Happiness';
  return null;
}

async function renderEvoChain(speciesUrl, activeId) {
  const chain = document.getElementById('evo-chain');
  chain.innerHTML = '<span class="side-empty">Loading…</span>';

  try {
    const stages = await fetchEvoChain(speciesUrl);

    if (stages.length <= 1 && stages[0].length <= 1) {
      chain.innerHTML = '<span class="side-empty">Does not evolve</span>';
      return;
    }

    let html = '';
    stages.forEach((stage, stageIdx) => {
      if (stageIdx > 0) {
        // Arrow + trigger between stages
        const triggers = stage.map(m => m.trigger).filter(Boolean);
        const triggerText = [...new Set(triggers)].join(' / ');
        html += `<div class="evo-arrow">▼</div>`;
        if (triggerText) html += `<div class="evo-trigger">${triggerText}</div>`;
      }
      stage.forEach(mon => {
        const num = String(mon.id).padStart(3, '0');
        const activeClass = mon.id === activeId ? ' evo-active' : '';
        html += `<div class="evo-step">
          <div class="evo-mon${activeClass}" onclick="loadAndDisplay(${mon.id})">
            <img class="evo-sprite"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.id}.png"
              alt="${mon.name}" loading="lazy">
            <div class="evo-info">
              <span class="evo-num">#${num}</span>
              <span class="evo-name">${mon.name.toUpperCase()}</span>
            </div>
          </div>
        </div>`;
      });
    });

    chain.innerHTML = html;

    // Stagger evo entries in from right
    const rows = chain.querySelectorAll('.evo-step, .evo-arrow, .evo-trigger');
    gsap.fromTo(rows,
      { opacity: 0, x: 14 },
      { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out', stagger: 0.06 }
    );
  } catch {
    chain.innerHTML = '<span class="side-empty">Unavailable</span>';
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// OAK'S NOTES — update text from fetched desc
// ══════════════════════════════════════════════════════════════════════════════
function updateOakText(desc) {
  const el = document.getElementById('oak-text');
  gsap.to(el, {
    opacity: 0, y: -6, duration: 0.18, ease: 'power2.in',
    onComplete() {
      el.textContent = desc || '…';
      gsap.fromTo(el,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
      );
    }
  });
}