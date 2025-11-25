import { writable, derived } from 'svelte/store';

// All cards loaded from data
export const allCards = writable([]);

// Current filter/search query
export const searchQuery = writable('');

// Active filter type (preset filters like 'starters', 'shinies', etc.)
export const activeFilter = writable('');

// Sort configuration
export const sortConfig = writable({ field: 'number', direction: 'asc' });

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

// Filtered cards based on search and filters
export const filteredCards = derived(
  [allCards, searchQuery, activeFilter, sortConfig],
  ([$allCards, $searchQuery, $activeFilter, $sortConfig]) => {
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
