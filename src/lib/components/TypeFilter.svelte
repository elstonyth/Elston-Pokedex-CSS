<script>
  import { typeFilter, cardTypes } from '../stores/cards.js';
  import { fly, scale } from 'svelte/transition';
  
  $: selectedTypes = $typeFilter;
  
  function toggleType(typeId) {
    typeFilter.update(types => {
      if (types.includes(typeId)) {
        return types.filter(t => t !== typeId);
      }
      return [...types, typeId];
    });
  }
  
  function clearTypes() {
    typeFilter.set([]);
  }
  
  function selectAll() {
    typeFilter.set(cardTypes.map(t => t.id));
  }
</script>

<div class="type-filter">
  <div class="filter-header">
    <span class="filter-label">Type</span>
    {#if selectedTypes.length > 0}
      <button class="clear-btn" on:click={clearTypes} transition:scale>
        Clear ({selectedTypes.length})
      </button>
    {/if}
  </div>
  
  <div class="type-pills">
    {#each cardTypes as type}
      <button
        class="type-pill"
        class:selected={selectedTypes.includes(type.id)}
        style="--type-color: {type.color}"
        on:click={() => toggleType(type.id)}
        aria-pressed={selectedTypes.includes(type.id)}
      >
        <span class="type-icon">{type.icon}</span>
        <span class="type-label">{type.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .type-filter {
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
  
  .type-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .type-pill {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.75rem;
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s var(--ease-smooth);
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  
  .type-pill:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--type-color);
    transform: translateY(-2px);
  }
  
  .type-pill.selected {
    background: color-mix(in srgb, var(--type-color) 25%, transparent);
    border-color: var(--type-color);
    color: var(--text-primary);
    box-shadow: 0 0 12px color-mix(in srgb, var(--type-color) 40%, transparent);
  }
  
  .type-pill.selected .type-icon {
    transform: scale(1.2);
  }
  
  .type-icon {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }
  
  .type-label {
    font-weight: 500;
  }
  
  /* Mobile: horizontal scroll */
  @media (max-width: 640px) {
    .type-pills {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    
    .type-pills::-webkit-scrollbar {
      display: none;
    }
    
    .type-pill {
      flex-shrink: 0;
    }
  }
</style>
