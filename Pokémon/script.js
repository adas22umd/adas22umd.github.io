const cache = {};

async function apiFetch(url) {
  if (cache[url]) return cache[url];
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const data = await res.json();
  cache[url] = data;

  console.log(`✅ Fetched: ${url}`, data);
  return data;
}

async function loadPokemon(idOrName) {
  const key = String(idOrName).toLowerCase().trim();

  const poke = await apiFetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
  console.log(`🎮 Pokemon data:`, poke);

  const species = await apiFetch(`https://pokeapi.co/api/v2/pokemon-species/${poke.id}`);
  console.log(`📖 Species data:`, species);

  const entry = species.flavor_text_entries.find(e => e.language.name === 'en');
  const flavorText = entry
    ? entry.flavor_text.replace(/[\f\n\r]/g, ' ') 
    : 'No Pokédex entry found.';

    async function loadLocations() {
    const locs = await apiFetch(`https://pokeapi.co/api/v2/pokemon/${poke.id}/encounters`);
    console.log(`📍 Locations:`, locs);
    return locs;
  }

  return { poke, flavorText, loadLocations };
}

loadPokemon(1)

async function init() {
  try {
    console.log('🚀 Starting load...');
    const result = await loadPokemon(1);
    console.log('✅ Done!', result);
  } catch (err) {
    console.error('❌ Something went wrong:', err);
  }
}

init();