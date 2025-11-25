import { writable, derived } from 'svelte/store';

// All cards loaded from data
export const allCards = writable([]);

// Current filter/search query
export const searchQuery = writable('');

// Active filter type (preset filters like 'starters', 'shinies', etc.)
export const activeFilter = writable('');

// Type filter (multi-select): ['fire', 'water', 'grass', etc.]
export const typeFilter = writable([]);

// Rarity filter (multi-select): ['common', 'rare', 'holo rare', etc.]
export const rarityFilter = writable([]);

// Fan view mode
export const fanViewEnabled = writable(false);
export const fanCurrentIndex = writable(0);

// Sort configuration
export const sortConfig = writable({ field: 'number', direction: 'asc' });

// Available types for filtering
export const cardTypes = [
  { id: 'fire', label: 'Fire', icon: '🔥', color: '#F08030' },
  { id: 'water', label: 'Water', icon: '💧', color: '#6890F0' },
  { id: 'grass', label: 'Grass', icon: '🌿', color: '#78C850' },
  { id: 'lightning', label: 'Electric', icon: '⚡', color: '#F8D030' },
  { id: 'psychic', label: 'Psychic', icon: '🔮', color: '#F85888' },
  { id: 'fighting', label: 'Fighting', icon: '👊', color: '#C03028' },
  { id: 'darkness', label: 'Dark', icon: '🌙', color: '#705848' },
  { id: 'metal', label: 'Steel', icon: '⚙️', color: '#B8B8D0' },
  { id: 'dragon', label: 'Dragon', icon: '🐉', color: '#7038F8' },
  { id: 'fairy', label: 'Fairy', icon: '✨', color: '#EE99AC' },
  { id: 'colorless', label: 'Normal', icon: '⚪', color: '#A8A878' }
];

// Available rarities for filtering
export const cardRarities = [
  { id: 'common', label: 'Common', tier: 1 },
  { id: 'uncommon', label: 'Uncommon', tier: 1 },
  { id: 'rare', label: 'Rare', tier: 2 },
  { id: 'rare holo', label: 'Holo Rare', tier: 2 },
  { id: 'double rare', label: 'Double Rare', tier: 3 },
  { id: 'ultra rare', label: 'Ultra Rare', tier: 3 },
  { id: 'illustration rare', label: 'Illustration', tier: 3 },
  { id: 'special illustration rare', label: 'Special Art', tier: 4 },
  { id: 'hyper rare', label: 'Hyper Rare', tier: 4 }
];

// Clear all filters
export const clearAllFilters = () => {
  searchQuery.set('');
  activeFilter.set('');
  typeFilter.set([]);
  rarityFilter.set([]);
  fanCurrentIndex.set(0);
};

// Favorites stored in localStorage
const storedFavorites = typeof localStorage !== 'undefined' 
  ? JSON.parse(localStorage.getItem('pokemon-favorites') || '[]') 
  : [];
export const favorites = writable(storedFavorites);

// Sync favorites to localStorage
favorites.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('pokemon-favorites', JSON.stringify(value));
  }
});

// Recent searches stored in localStorage
const storedSearches = typeof localStorage !== 'undefined'
  ? JSON.parse(localStorage.getItem('pokemon-recent-searches') || '[]')
  : [];
export const recentSearches = writable(storedSearches);

recentSearches.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('pokemon-recent-searches', JSON.stringify(value.slice(0, 10)));
  }
});

// Add a recent search
export const addRecentSearch = (query) => {
  if (!query || query.length < 2) return;
  recentSearches.update(searches => {
    const filtered = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
    return [query, ...filtered].slice(0, 10);
  });
};

// Clear recent searches
export const clearRecentSearches = () => {
  recentSearches.set([]);
};

// Toggle favorite
export const toggleFavorite = (cardId) => {
  favorites.update(favs => {
    if (favs.includes(cardId)) {
      return favs.filter(id => id !== cardId);
    }
    return [...favs, cardId];
  });
};

// Check if card is favorite
export const isFavorite = (cardId) => {
  let result = false;
  const unsubscribe = favorites.subscribe(favs => {
    result = favs.includes(cardId);
  });
  unsubscribe();
  return result;
};

// Filtered cards based on search, type, rarity, and other filters
export const filteredCards = derived(
  [allCards, searchQuery, activeFilter, typeFilter, rarityFilter, sortConfig],
  ([$allCards, $searchQuery, $activeFilter, $typeFilter, $rarityFilter, $sortConfig]) => {
    let result = [...$allCards];
    
    // Apply search query
    if ($searchQuery && $searchQuery.length >= 2) {
      const query = $searchQuery.toLowerCase();
      result = result.filter(card => {
        const name = card.name?.toLowerCase() || '';
        const types = card.types?.join(' ').toLowerCase() || '';
        const rarity = card.rarity?.toLowerCase() || '';
        const number = card.number?.toString().toLowerCase() || '';
        return name.includes(query) || types.includes(query) || 
               rarity.includes(query) || number.includes(query);
      });
    }
    
    // Apply type filter
    if ($typeFilter.length > 0) {
      result = result.filter(card => {
        const cardTypes = card.types?.map(t => t.toLowerCase()) || [];
        return $typeFilter.some(filterType => 
          cardTypes.includes(filterType.toLowerCase())
        );
      });
    }
    
    // Apply rarity filter
    if ($rarityFilter.length > 0) {
      result = result.filter(card => {
        const cardRarity = card.rarity?.toLowerCase() || '';
        return $rarityFilter.some(filterRarity => 
          cardRarity.includes(filterRarity.toLowerCase())
        );
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aVal, bVal;
      switch ($sortConfig.field) {
        case 'name':
          aVal = a.name?.toLowerCase() || '';
          bVal = b.name?.toLowerCase() || '';
          break;
        case 'rarity':
          aVal = a.rarity?.toLowerCase() || '';
          bVal = b.rarity?.toLowerCase() || '';
          break;
        case 'type':
          aVal = a.types?.[0]?.toLowerCase() || '';
          bVal = b.types?.[0]?.toLowerCase() || '';
          break;
        case 'number':
        default:
          aVal = parseInt(a.number) || 0;
          bVal = parseInt(b.number) || 0;
      }
      
      if ($sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      }
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    });
    
    return result;
  }
);

// Card count stats
export const cardStats = derived(
  [allCards, filteredCards],
  ([$allCards, $filteredCards]) => ({
    total: $allCards.length,
    displayed: $filteredCards.length
  })
);
