<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  
  export let query = '';
  export let activePreset = '';
  export let sortField = 'number';
  export let sortDirection = 'asc';
  
  const dispatch = createEventDispatcher();
  
  $: filters = buildFilters(query, activePreset, sortField, sortDirection);
  $: hasFilters = filters.length > 0;
  
  function buildFilters(q, preset, sort, dir) {
    const result = [];
    
    if (q && q.length >= 2) {
      result.push({
        id: 'search',
        type: 'search',
        label: `"${q}"`,
        icon: '🔍'
      });
    }
    
    if (preset) {
      result.push({
        id: 'preset',
        type: 'preset',
        label: formatPreset(preset),
        icon: '✨'
      });
    }
    
    if (sort !== 'number' || dir !== 'asc') {
      result.push({
        id: 'sort',
        type: 'sort',
        label: `${formatSort(sort)} ${dir === 'asc' ? '↑' : '↓'}`,
        icon: '📊'
      });
    }
    
    return result;
  }
  
  function formatPreset(preset) {
    return preset.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  function formatSort(field) {
    const labels = {
      name: 'Name',
      number: 'Number',
      rarity: 'Rarity',
      type: 'Type'
    };
    return labels[field] || field;
  }
  
  function removeFilter(filter) {
    dispatch('remove', filter);
  }
  
  function clearAll() {
    dispatch('clearAll');
  }
</script>

{#if hasFilters}
  <div class="active-filters" transition:fade={{ duration: 200 }}>
    <span class="filters-label">Active:</span>
    
    <div class="filter-badges">
      {#each filters as filter (filter.id)}
        <button
          class="filter-badge {filter.type}"
          on:click={() => removeFilter(filter)}
          animate:flip={{ duration: 200 }}
          transition:fly={{ x: -20, duration: 200 }}
          title="Click to remove"
        >
          <span class="badge-icon">{filter.icon}</span>
          <span class="badge-label">{filter.label}</span>
          <span class="badge-remove">×</span>
        </button>
      {/each}
    </div>
    
    {#if filters.length > 1}
      <button class="clear-all" on:click={clearAll} transition:fade={{ duration: 150 }}>
        Clear All
      </button>
    {/if}
  </div>
{/if}

<style>
  .active-filters {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    margin: 1rem 0;
  }
  
  .filters-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .filter-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .filter-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.85rem;
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s var(--ease-smooth);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .filter-badge:hover {
    background: rgba(255, 100, 100, 0.2);
    border-color: #ff6b6b;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(255, 100, 100, 0.2);
  }
  
  .filter-badge:active {
    transform: translateY(0) scale(0.98);
  }
  
  .filter-badge.search {
    background: rgba(0, 240, 255, 0.15);
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
  }
  
  .filter-badge.search:hover {
    background: rgba(0, 240, 255, 0.25);
    box-shadow: 0 4px 16px rgba(0, 240, 255, 0.3);
  }
  
  .filter-badge.preset {
    background: rgba(178, 75, 243, 0.15);
    border-color: var(--neon-violet);
    color: var(--neon-violet);
  }
  
  .filter-badge.preset:hover {
    background: rgba(178, 75, 243, 0.25);
    box-shadow: 0 4px 16px rgba(178, 75, 243, 0.3);
  }
  
  .filter-badge.sort {
    background: rgba(77, 124, 255, 0.15);
    border-color: var(--plasma-blue);
    color: var(--plasma-blue);
  }
  
  .filter-badge.sort:hover {
    background: rgba(77, 124, 255, 0.25);
    box-shadow: 0 4px 16px rgba(77, 124, 255, 0.3);
  }
  
  .badge-icon {
    font-size: 0.85rem;
  }
  
  .badge-label {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .badge-remove {
    font-size: 1rem;
    font-weight: 300;
    opacity: 0.6;
    margin-left: 0.2rem;
    transition: opacity 0.2s;
  }
  
  .filter-badge:hover .badge-remove {
    opacity: 1;
    color: #ff6b6b;
  }
  
  .clear-all {
    padding: 0.4rem 0.75rem;
    background: transparent;
    border: 1px solid rgba(255, 100, 100, 0.3);
    border-radius: 999px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 100, 100, 0.8);
    cursor: pointer;
    transition: all 0.2s var(--ease-smooth);
  }
  
  .clear-all:hover {
    background: rgba(255, 100, 100, 0.15);
    border-color: rgba(255, 100, 100, 0.5);
    color: #ff6b6b;
    transform: scale(1.05);
  }
  
  @media (max-width: 600px) {
    .active-filters {
      padding: 0.5rem 0.75rem;
    }
    
    .filters-label {
      display: none;
    }
    
    .filter-badge {
      padding: 0.35rem 0.6rem;
      font-size: 0.75rem;
    }
  }
</style>
