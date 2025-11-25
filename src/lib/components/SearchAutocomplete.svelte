<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { recentSearches, clearRecentSearches } from '../stores/cards.js';
  
  export let query = '';
  export let cards = [];
  export let isOpen = false;
  
  const dispatch = createEventDispatcher();
  
  $: suggestions = getSuggestions(query, cards);
  $: showRecent = query.length === 0 && $recentSearches.length > 0;
  $: showSuggestions = query.length >= 1 && suggestions.length > 0;
  $: shouldShow = isOpen && (showRecent || showSuggestions);
  
  function getSuggestions(q, allCards) {
    if (!q || q.length < 1 || !allCards.length) return [];
    const lowerQ = q.toLowerCase();
    
    const matches = allCards
      .filter(card => card.name?.toLowerCase().includes(lowerQ))
      .slice(0, 6)
      .map(card => ({
        type: 'card',
        value: card.name,
        card: card
      }));
    
    // Add type suggestions
    const types = ['Fire', 'Water', 'Grass', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Dragon', 'Fairy'];
    const typeMatches = types
      .filter(t => t.toLowerCase().includes(lowerQ))
      .slice(0, 2)
      .map(t => ({ type: 'type', value: t, icon: '⚡' }));
    
    // Add rarity suggestions
    const rarities = ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Illustration Rare'];
    const rarityMatches = rarities
      .filter(r => r.toLowerCase().includes(lowerQ))
      .slice(0, 2)
      .map(r => ({ type: 'rarity', value: r, icon: '💎' }));
    
    return [...matches, ...typeMatches, ...rarityMatches].slice(0, 8);
  }
  
  function selectSuggestion(suggestion) {
    dispatch('select', suggestion.value);
  }
  
  function selectRecent(search) {
    dispatch('select', search);
  }
  
  function handleClearRecent() {
    clearRecentSearches();
  }
</script>

{#if shouldShow}
  <div class="autocomplete-dropdown" transition:fly={{ y: -10, duration: 200 }}>
    {#if showRecent}
      <div class="section">
        <div class="section-header">
          <span class="section-title">Recent Searches</span>
          <button class="clear-btn" on:click={handleClearRecent}>Clear</button>
        </div>
        <ul class="suggestions-list">
          {#each $recentSearches as search}
            <li>
              <button class="suggestion recent" on:click={() => selectRecent(search)}>
                <span class="icon">🕐</span>
                <span class="text">{search}</span>
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    
    {#if showSuggestions}
      <div class="section">
        <div class="section-header">
          <span class="section-title">Suggestions</span>
        </div>
        <ul class="suggestions-list">
          {#each suggestions as suggestion, i}
            <li>
              <button 
                class="suggestion {suggestion.type}"
                on:click={() => selectSuggestion(suggestion)}
              >
                {#if suggestion.type === 'card'}
                  <span class="icon">🃏</span>
                {:else}
                  <span class="icon">{suggestion.icon}</span>
                {/if}
                <span class="text">{suggestion.value}</span>
                <span class="type-label">{suggestion.type}</span>
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{/if}

<style>
  .autocomplete-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    background: rgba(20, 28, 58, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 100;
  }
  
  .section {
    padding: 0.5rem;
  }
  
  .section + .section {
    border-top: 1px solid var(--glass-border);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.75rem;
  }
  
  .section-title {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .clear-btn {
    padding: 0.2rem 0.5rem;
    background: transparent;
    border: none;
    font-size: 0.7rem;
    color: rgba(255, 100, 100, 0.7);
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .clear-btn:hover {
    color: #ff6b6b;
  }
  
  .suggestions-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .suggestion {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    text-align: left;
    transition: all 0.15s;
  }
  
  .suggestion:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .suggestion .icon {
    font-size: 0.9rem;
    opacity: 0.7;
  }
  
  .suggestion .text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .suggestion .type-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.15rem 0.4rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .suggestion.recent .type-label {
    display: none;
  }
</style>
