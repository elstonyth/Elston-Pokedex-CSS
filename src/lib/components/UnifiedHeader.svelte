<script>
  import { experience } from "../stores/experience";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let query = "";
  
  const dispatch = createEventDispatcher();

  const options = [
    { id: "holo", label: "Showcase", icon: "⚔️" },
    { id: "kanto", label: "Kanto 151", icon: "🔴" },
  ];

  let navRef;
  let inputRef;
  let indicatorStyle = "";
  let mounted = false;
  let isSearchExpanded = false;

  const setExperience = (id) => {
    experience.set(id);
  };

  const updateIndicator = () => {
    if (!navRef || !mounted) return;
    const selectedBtn = navRef.querySelector("button.selected");
    if (selectedBtn) {
      const navRect = navRef.getBoundingClientRect();
      const btnRect = selectedBtn.getBoundingClientRect();
      const offsetX = btnRect.left - navRect.left;
      indicatorStyle = `width: ${btnRect.width}px; transform: translateX(${offsetX}px);`;
    }
  };

  // Keyboard shortcut: "/" to focus search
  const handleGlobalKeydown = (e) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      e.preventDefault();
      isSearchExpanded = true;
      setTimeout(() => inputRef?.focus(), 50);
    }
    if (e.key === 'Escape' && document.activeElement === inputRef) {
      isSearchExpanded = false;
      inputRef?.blur();
    }
  };

  const clearSearch = () => {
    query = '';
    dispatch('search', '');
    inputRef?.focus();
  };

  const handleSearchInput = () => {
    dispatch('search', query);
  };

  const handleSearchFocus = () => {
    isSearchExpanded = true;
  };

  const handleSearchBlur = () => {
    if (!query) {
      setTimeout(() => {
        isSearchExpanded = false;
      }, 200);
    }
  };

  onMount(() => {
    mounted = true;
    updateIndicator();
    window.addEventListener('keydown', handleGlobalKeydown);
    return () => window.removeEventListener('keydown', handleGlobalKeydown);
  });

  // Update indicator when experience changes
  $: if ($experience && mounted) {
    requestAnimationFrame(updateIndicator);
  }

  const handleKeydown = (event) => {
    const currentIndex = options.findIndex(o => o.id === $experience);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % options.length;
      setExperience(options[nextIndex].id);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      setExperience(options[prevIndex].id);
    }
  };
</script>

<header class="unified-header" class:search-expanded={isSearchExpanded}>
  <!-- Search Section -->
  <div class="search-section" class:expanded={isSearchExpanded}>
    <button 
      type="button" 
      class="search-trigger"
      on:click={() => { isSearchExpanded = true; setTimeout(() => inputRef?.focus(), 50); }}
      aria-label="Open search"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
        <path d="M21 21l-6 -6"/>
      </svg>
      {#if !isSearchExpanded}
        <kbd class="shortcut-hint">/</kbd>
      {/if}
    </button>
    
    <div class="search-input-wrapper">
      <input
        type="search"
        bind:this={inputRef}
        bind:value={query}
        on:input={handleSearchInput}
        on:focus={handleSearchFocus}
        on:blur={handleSearchBlur}
        placeholder="Search cards..."
        class="search-input"
      />
      {#if query}
        <button type="button" class="clear-btn" on:click={clearSearch} aria-label="Clear">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
          </svg>
        </button>
      {/if}
    </div>
  </div>

  <!-- Experience Switcher -->
  <nav 
    class="experience-nav" 
    bind:this={navRef}
    role="tablist"
    aria-label="Experience selection"
  >
    <div class="indicator" style={indicatorStyle}></div>
    
    {#each options as option}
      <button
        type="button"
        role="tab"
        aria-selected={$experience === option.id}
        tabindex={$experience === option.id ? 0 : -1}
        class:selected={$experience === option.id}
        on:click={() => setExperience(option.id)}
        on:keydown={handleKeydown}
      >
        <span class="btn-icon">{option.icon}</span>
        <span class="btn-label">{option.label}</span>
      </button>
    {/each}
  </nav>
</header>

<style>
  .unified-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    max-width: 900px;
    margin: 1.5rem auto 2rem;
    padding: 0.5rem 0.5rem 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    position: sticky;
    top: 1rem;
    z-index: 100;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.4s var(--ease-fluid);
    animation: headerSlideIn 0.6s var(--ease-fluid) both;
  }

  @keyframes headerSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Search Section */
  .search-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 0 0 auto;
    transition: flex 0.4s var(--ease-fluid);
  }

  .search-section.expanded {
    flex: 1 1 auto;
  }

  .search-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.8rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid transparent;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.3s var(--ease-smooth);
  }

  .search-trigger:hover {
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.9);
  }

  .expanded .search-trigger {
    padding: 0.6rem;
    background: transparent;
    pointer-events: none;
  }

  .shortcut-hint {
    padding: 0.15rem 0.4rem;
    font-family: 'Inter', monospace;
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }

  .search-input-wrapper {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.4s var(--ease-fluid);
  }

  .expanded .search-input-wrapper {
    max-width: 300px;
    opacity: 1;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid transparent;
    border-radius: 0.5rem;
    outline: none;
    transition: all 0.3s var(--ease-smooth);
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .search-input:focus {
    background: rgba(0, 0, 0, 0.4);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.15);
  }

  .clear-btn {
    position: absolute;
    right: 0.5rem;
    padding: 0.25rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    display: flex;
    transition: all 0.2s var(--ease-smooth);
  }

  .clear-btn:hover {
    background: rgba(255, 100, 100, 0.3);
    color: #ff6b6b;
  }

  /* Experience Nav */
  .experience-nav {
    display: flex;
    gap: 0.2rem;
    padding: 0.3rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 999px;
    position: relative;
  }

  .indicator {
    position: absolute;
    top: 0.3rem;
    left: 0;
    height: calc(100% - 0.6rem);
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
    border-radius: 999px;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                width 0.3s var(--ease-fluid);
    box-shadow: 
      0 0 16px var(--glow-cyan),
      0 2px 8px rgba(0, 240, 255, 0.2);
    pointer-events: none;
    z-index: 0;
  }

  .experience-nav button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
    background: transparent;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: color 0.3s var(--ease-smooth);
  }

  .experience-nav button:hover:not(.selected) {
    color: rgba(255, 255, 255, 0.85);
  }

  .experience-nav button.selected {
    color: var(--void-deep);
    font-weight: 700;
  }

  .experience-nav button:focus-visible {
    outline: 2px solid var(--neon-cyan);
    outline-offset: 2px;
  }

  .btn-icon {
    font-size: 0.9rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .unified-header {
      flex-direction: column;
      gap: 0.75rem;
      border-radius: 1.25rem;
      padding: 0.75rem;
      margin: 1rem;
    }

    .search-section {
      width: 100%;
    }

    .search-section.expanded {
      flex: none;
    }

    .expanded .search-input-wrapper {
      max-width: 100%;
    }

    .experience-nav {
      width: 100%;
      justify-content: center;
    }

    .btn-label {
      display: none;
    }

    .experience-nav button {
      padding: 0.6rem 1.2rem;
    }

    .btn-icon {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 400px) {
    .unified-header {
      margin: 0.75rem;
    }
  }
</style>
