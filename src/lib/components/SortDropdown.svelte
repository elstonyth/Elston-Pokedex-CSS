<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  
  export let sortField = 'number';
  export let sortDirection = 'asc';
  
  const dispatch = createEventDispatcher();
  
  let isOpen = false;
  let dropdownEl;
  
  const sortOptions = [
    { field: 'number', label: 'Number', icon: '#️⃣' },
    { field: 'name', label: 'Name', icon: '🔤' },
    { field: 'rarity', label: 'Rarity', icon: '💎' },
    { field: 'type', label: 'Type', icon: '⚡' }
  ];
  
  $: currentOption = sortOptions.find(o => o.field === sortField) || sortOptions[0];
  
  function toggle() {
    isOpen = !isOpen;
  }
  
  function selectSort(field) {
    if (field === sortField) {
      // Toggle direction if same field
      dispatch('change', { field, direction: sortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      dispatch('change', { field, direction: 'asc' });
    }
    isOpen = false;
  }
  
  function handleClickOutside(event) {
    if (dropdownEl && !dropdownEl.contains(event.target)) {
      isOpen = false;
    }
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeyDown} />

<div class="sort-dropdown" bind:this={dropdownEl}>
  <button class="sort-trigger" on:click={toggle} class:open={isOpen}>
    <span class="sort-icon">📊</span>
    <span class="sort-label">
      {currentOption.label}
      <span class="direction">{sortDirection === 'asc' ? '↑' : '↓'}</span>
    </span>
    <span class="chevron" class:rotated={isOpen}>▼</span>
  </button>
  
  {#if isOpen}
    <div class="sort-menu" transition:fly={{ y: -10, duration: 200 }}>
      {#each sortOptions as option}
        <button
          class="sort-option"
          class:active={option.field === sortField}
          on:click={() => selectSort(option.field)}
        >
          <span class="option-icon">{option.icon}</span>
          <span class="option-label">{option.label}</span>
          {#if option.field === sortField}
            <span class="option-direction">{sortDirection === 'asc' ? '↑' : '↓'}</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .sort-dropdown {
    position: relative;
    z-index: 100;
  }
  
  .sort-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s var(--ease-smooth);
  }
  
  .sort-trigger:hover,
  .sort-trigger.open {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
  }
  
  .sort-icon {
    font-size: 0.9rem;
  }
  
  .sort-label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  
  .direction {
    font-size: 0.75rem;
    opacity: 0.7;
  }
  
  .chevron {
    font-size: 0.6rem;
    transition: transform 0.2s var(--ease-smooth);
    opacity: 0.6;
  }
  
  .chevron.rotated {
    transform: rotate(180deg);
  }
  
  .sort-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 160px;
    padding: 0.5rem;
    background: rgba(30, 39, 73, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }
  
  .sort-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    text-align: left;
    transition: all 0.2s var(--ease-smooth);
  }
  
  .sort-option:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .sort-option.active {
    background: rgba(0, 240, 255, 0.15);
    color: var(--neon-cyan);
  }
  
  .option-icon {
    font-size: 0.9rem;
  }
  
  .option-label {
    flex: 1;
  }
  
  .option-direction {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  
  @media (max-width: 600px) {
    .sort-label span:not(.direction) {
      display: none;
    }
    
    .sort-trigger {
      padding: 0.5rem 0.75rem;
    }
  }
</style>
