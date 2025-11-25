<script>
  import { slide, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import TypeFilter from './TypeFilter.svelte';
  import RarityFilter from './RarityFilter.svelte';
  import { typeFilter, rarityFilter, clearAllFilters } from '../stores/cards.js';
  
  export let totalCards = 0;
  export let filteredCount = 0;
  export let collapsed = false;
  
  const dispatch = createEventDispatcher();
  
  $: hasActiveFilters = $typeFilter.length > 0 || $rarityFilter.length > 0;
  $: activeFilterCount = $typeFilter.length + $rarityFilter.length;
  
  function toggleCollapsed() {
    collapsed = !collapsed;
  }
  
  function handleClearAll() {
    clearAllFilters();
    dispatch('clear');
  }
</script>

<div class="filter-panel" class:collapsed>
  <!-- Collapsible header (mobile) -->
  <button class="panel-header" on:click={toggleCollapsed}>
    <div class="header-left">
      <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
      <span class="header-title">Filters</span>
      {#if activeFilterCount > 0}
        <span class="active-badge" transition:fly={{ y: -10, duration: 200 }}>
          {activeFilterCount}
        </span>
      {/if}
    </div>
    <svg 
      class="chevron" 
      class:rotated={!collapsed}
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2"
    >
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </button>
  
  <!-- Filter content -->
  {#if !collapsed}
    <div class="panel-content" transition:slide={{ duration: 250 }}>
      <TypeFilter />
      
      <div class="divider" />
      
      <RarityFilter />
      
      <div class="divider" />
      
      <!-- Results count & clear -->
      <div class="filter-footer">
        <span class="results-count">
          Showing <strong>{filteredCount}</strong> of {totalCards} cards
        </span>
        
        {#if hasActiveFilters}
          <button class="clear-all-btn" on:click={handleClearAll}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
            </svg>
            Clear All
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .filter-panel {
    background: var(--glass-white);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s var(--ease-smooth);
  }
  
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-primary);
    transition: background 0.2s ease;
  }
  
  .panel-header:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .filter-icon {
    color: var(--neon-cyan);
  }
  
  .header-title {
    font-weight: 600;
    font-size: 1rem;
  }
  
  .active-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 0.4rem;
    background: var(--neon-cyan);
    color: var(--void-deep);
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 999px;
  }
  
  .chevron {
    color: var(--text-muted);
    transition: transform 0.3s ease;
  }
  
  .chevron.rotated {
    transform: rotate(180deg);
  }
  
  .panel-content {
    padding: 0 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .divider {
    height: 1px;
    background: var(--glass-border);
    margin: 0.25rem 0;
  }
  
  .filter-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }
  
  .results-count {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .results-count strong {
    color: var(--neon-cyan);
    font-weight: 600;
  }
  
  .clear-all-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 100, 100, 0.15);
    border: 1px solid rgba(255, 100, 100, 0.4);
    border-radius: 8px;
    color: #ff6b6b;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .clear-all-btn:hover {
    background: rgba(255, 100, 100, 0.25);
    transform: translateY(-1px);
  }
  
  /* Desktop: always expanded */
  @media (min-width: 1024px) {
    .panel-header {
      display: none;
    }
    
    .panel-content {
      padding: 1.25rem;
    }
    
    .filter-panel.collapsed .panel-content {
      display: flex;
    }
  }
</style>
