<script>
  import { rarityFilter, cardRarities } from '../stores/cards.js';
  import { scale } from 'svelte/transition';
  
  $: selectedRarities = $rarityFilter;
  
  // Group rarities by tier
  $: tier1 = cardRarities.filter(r => r.tier === 1);
  $: tier2 = cardRarities.filter(r => r.tier === 2);
  $: tier3 = cardRarities.filter(r => r.tier === 3);
  $: tier4 = cardRarities.filter(r => r.tier === 4);
  
  function toggleRarity(rarityId) {
    rarityFilter.update(rarities => {
      if (rarities.includes(rarityId)) {
        return rarities.filter(r => r !== rarityId);
      }
      return [...rarities, rarityId];
    });
  }
  
  function clearRarities() {
    rarityFilter.set([]);
  }
  
  function getTierColor(tier) {
    switch(tier) {
      case 1: return '#9CA3AF'; // gray
      case 2: return '#60A5FA'; // blue
      case 3: return '#A78BFA'; // purple
      case 4: return '#F59E0B'; // gold
      default: return '#9CA3AF';
    }
  }
  
  function getTierIcon(tier) {
    switch(tier) {
      case 1: return '○';
      case 2: return '◐';
      case 3: return '★';
      case 4: return '✦';
      default: return '○';
    }
  }
</script>

<div class="rarity-filter">
  <div class="filter-header">
    <span class="filter-label">Rarity</span>
    {#if selectedRarities.length > 0}
      <button class="clear-btn" on:click={clearRarities} transition:scale>
        Clear ({selectedRarities.length})
      </button>
    {/if}
  </div>
  
  <div class="rarity-grid">
    <!-- Tier 1: Common/Uncommon -->
    <div class="rarity-tier">
      {#each tier1 as rarity}
        <button
          class="rarity-toggle"
          class:selected={selectedRarities.includes(rarity.id)}
          style="--rarity-color: {getTierColor(rarity.tier)}"
          on:click={() => toggleRarity(rarity.id)}
          aria-pressed={selectedRarities.includes(rarity.id)}
        >
          <span class="rarity-icon">{getTierIcon(rarity.tier)}</span>
          <span class="rarity-label">{rarity.label}</span>
        </button>
      {/each}
    </div>
    
    <!-- Tier 2: Rare/Holo -->
    <div class="rarity-tier">
      {#each tier2 as rarity}
        <button
          class="rarity-toggle"
          class:selected={selectedRarities.includes(rarity.id)}
          style="--rarity-color: {getTierColor(rarity.tier)}"
          on:click={() => toggleRarity(rarity.id)}
          aria-pressed={selectedRarities.includes(rarity.id)}
        >
          <span class="rarity-icon">{getTierIcon(rarity.tier)}</span>
          <span class="rarity-label">{rarity.label}</span>
        </button>
      {/each}
    </div>
    
    <!-- Tier 3: Ultra/Illustration -->
    <div class="rarity-tier">
      {#each tier3 as rarity}
        <button
          class="rarity-toggle"
          class:selected={selectedRarities.includes(rarity.id)}
          style="--rarity-color: {getTierColor(rarity.tier)}"
          on:click={() => toggleRarity(rarity.id)}
          aria-pressed={selectedRarities.includes(rarity.id)}
        >
          <span class="rarity-icon">{getTierIcon(rarity.tier)}</span>
          <span class="rarity-label">{rarity.label}</span>
        </button>
      {/each}
    </div>
    
    <!-- Tier 4: Special/Hyper -->
    <div class="rarity-tier">
      {#each tier4 as rarity}
        <button
          class="rarity-toggle"
          class:selected={selectedRarities.includes(rarity.id)}
          style="--rarity-color: {getTierColor(rarity.tier)}"
          on:click={() => toggleRarity(rarity.id)}
          aria-pressed={selectedRarities.includes(rarity.id)}
        >
          <span class="rarity-icon">{getTierIcon(rarity.tier)}</span>
          <span class="rarity-label">{rarity.label}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .rarity-filter {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .filter-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
  }
  
  .clear-btn {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 100, 100, 0.2);
    border: 1px solid rgba(255, 100, 100, 0.4);
    border-radius: 999px;
    color: #ff6b6b;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .clear-btn:hover {
    background: rgba(255, 100, 100, 0.3);
  }
  
  .rarity-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .rarity-tier {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  
  .rarity-toggle {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.35rem 0.65rem;
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s var(--ease-smooth);
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
  
  .rarity-toggle:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--rarity-color);
  }
  
  .rarity-toggle.selected {
    background: color-mix(in srgb, var(--rarity-color) 20%, transparent);
    border-color: var(--rarity-color);
    color: var(--text-primary);
  }
  
  .rarity-toggle.selected .rarity-icon {
    color: var(--rarity-color);
  }
  
  .rarity-icon {
    font-size: 0.85rem;
    color: var(--text-muted);
    transition: color 0.2s ease;
  }
  
  .rarity-label {
    font-weight: 500;
  }
  
  /* Mobile: horizontal scroll per tier */
  @media (max-width: 640px) {
    .rarity-tier {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 0.25rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    
    .rarity-tier::-webkit-scrollbar {
      display: none;
    }
    
    .rarity-toggle {
      flex-shrink: 0;
    }
  }
</style>
