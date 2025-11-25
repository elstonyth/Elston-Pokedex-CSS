<script>
  import { onMount } from 'svelte';
  import FanView from '../../lib/components/FanView.svelte';
  import FilterPanel from '../../lib/components/FilterPanel.svelte';
  import Card from '../../lib/components/CardProxy.svelte';
  import { 
    typeFilter, 
    rarityFilter, 
    fanCurrentIndex,
    clearAllFilters 
  } from '../../lib/stores/cards.js';
  
  let allCards = [];
  let filteredCards = [];
  let isLoading = true;
  
  // Load cards
  const loadCards = async () => {
    try {
      const response = await fetch(import.meta.env.BASE_URL + 'data/cards-151.json');
      const cards = await response.json();
      allCards = cards.map(card => {
        if (card.rarity === 'Common' || card.rarity === 'Uncommon') {
          card.isReverse = !!Math.round(Math.random());
        }
        card.set = card.set?.id || card.set;
        return card;
      });
      filteredCards = [...allCards];
      isLoading = false;
    } catch (error) {
      console.error('Failed to load cards:', error);
      isLoading = false;
    }
  };
  
  // Filter cards when filters change
  $: {
    let result = [...allCards];
    
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
    
    filteredCards = result;
    
    // Reset fan index when filters change
    if (result.length > 0) {
      fanCurrentIndex.set(0);
    }
  }
  
  function handleCardSelect(e) {
    const { card } = e.detail;
    // Could open lightbox or modal here
    console.log('Selected card:', card.name);
  }
  
  function handleFilterClear() {
    fanCurrentIndex.set(0);
  }
  
  onMount(() => {
    loadCards();
    
    return () => {
      // Cleanup
      clearAllFilters();
    };
  });
</script>

<div class="fan-experience">
  <header class="fan-header">
    <h1>Card Collection</h1>
    <p class="subtitle">Swipe through your cards</p>
  </header>
  
  <!-- Filter Panel -->
  <div class="filter-section">
    <FilterPanel 
      totalCards={allCards.length}
      filteredCount={filteredCards.length}
      collapsed={true}
      on:clear={handleFilterClear}
    />
  </div>
  
  <!-- Fan View -->
  <div class="fan-section">
    {#if isLoading}
      <div class="loading-state">
        <div class="spinner" />
        <p>Loading cards...</p>
      </div>
    {:else if filteredCards.length === 0}
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3>No cards found</h3>
        <p>Try adjusting your filters</p>
        <button class="reset-btn" on:click={handleFilterClear}>
          Clear Filters
        </button>
      </div>
    {:else}
      <FanView 
        cards={filteredCards} 
        on:select={handleCardSelect}
      >
        <svelte:fragment slot="card" let:card let:position let:isCenter>
          <div class="card-container" class:center={isCenter}>
            <Card {...card} />
          </div>
        </svelte:fragment>
      </FanView>
    {/if}
  </div>
  
  <!-- Quick stats -->
  <div class="stats-bar">
    <span class="stat">
      <strong>{filteredCards.length}</strong> cards
    </span>
    {#if $typeFilter.length > 0}
      <span class="stat">
        {$typeFilter.length} type{$typeFilter.length > 1 ? 's' : ''}
      </span>
    {/if}
    {#if $rarityFilter.length > 0}
      <span class="stat">
        {$rarityFilter.length} rarity
      </span>
    {/if}
  </div>
</div>

<style>
  .fan-experience {
    min-height: 100vh;
    padding: 1rem;
    padding-top: 4.5rem; /* Space for sticky header */
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .fan-header {
    text-align: center;
    padding: 0.25rem 0;
  }
  
  .fan-header h1 {
    font-size: clamp(1.25rem, 4vw, 2rem);
    font-weight: 700;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }
  
  .subtitle {
    color: var(--text-secondary);
    margin: 0.25rem 0 0;
    font-size: 0.85rem;
  }
  
  .filter-section {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }
  
  .fan-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: auto;
    overflow: visible;
    padding-bottom: 1rem;
  }
  
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  
  .card-container.center {
    pointer-events: auto;
  }
  
  .card-container :global(.card) {
    width: 100%;
    max-width: 280px;
  }
  
  /* Mobile adjustments */
  @media (max-width: 640px) {
    .fan-experience {
      padding-top: 4rem;
      gap: 0.5rem;
    }
    
    .fan-header {
      padding: 0;
    }
    
    .fan-header h1 {
      font-size: 1.25rem;
    }
    
    .subtitle {
      font-size: 0.75rem;
      margin-top: 0.15rem;
    }
    
    .card-container :global(.card) {
      max-width: 220px;
    }
  }
  
  /* Desktop adjustments */
  @media (min-width: 1024px) {
    .fan-experience {
      padding-top: 5rem;
      gap: 1.5rem;
    }
    
    .fan-header h1 {
      font-size: 2rem;
    }
    
    .card-container :global(.card) {
      max-width: 300px;
    }
  }
  
  /* Large desktop */
  @media (min-width: 1440px) {
    .card-container :global(.card) {
      max-width: 340px;
    }
  }
  
  /* Loading state */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--text-secondary);
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--glass-border);
    border-top-color: var(--neon-cyan);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Empty state */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-align: center;
    padding: 2rem;
  }
  
  .empty-icon {
    font-size: 3rem;
    opacity: 0.5;
  }
  
  .empty-state h3 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.25rem;
  }
  
  .empty-state p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  .reset-btn {
    margin-top: 0.5rem;
    padding: 0.6rem 1.25rem;
    background: var(--neon-cyan);
    border: none;
    border-radius: 8px;
    color: var(--void-deep);
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .reset-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px var(--glow-cyan);
  }
  
  /* Stats bar */
  .stats-bar {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem;
    border-top: 1px solid var(--glass-border);
  }
  
  .stat {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .stat strong {
    color: var(--neon-cyan);
  }
  
  /* Desktop layout */
  @media (min-width: 1024px) {
    .fan-experience {
      padding: 2rem;
      flex-direction: row;
      flex-wrap: wrap;
    }
    
    .fan-header {
      width: 100%;
    }
    
    .filter-section {
      width: 300px;
      max-width: none;
      margin: 0;
    }
    
    .fan-section {
      flex: 1;
      min-width: 500px;
    }
    
    .stats-bar {
      width: 100%;
    }
  }
</style>
