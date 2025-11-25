<script>
  import { experience } from "../stores/experience";
  import { onMount, createEventDispatcher } from "svelte";

  export let searchQuery = "";
  export let showSearch = true;
  
  const dispatch = createEventDispatcher();

  const options = [
    { id: "holo", label: "Showcase", icon: "⚔️" },
    { id: "kanto", label: "Kanto 151", icon: "🔴" },
    { id: "fan", label: "Fan View", icon: "🃏" },
  ];

  let headerRef;
  let navRef;
  let inputRef;
  let indicatorStyle = "";
  let mounted = false;
  let isSearchFocused = false;
  let isScrolled = false;
  let lastScrollY = 0;

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

  // Keyboard shortcut
  const handleGlobalKeydown = (e) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && showSearch) {
      e.preventDefault();
      inputRef?.focus();
    }
  };

  const clearSearch = () => {
    searchQuery = '';
    dispatch('search', '');
    inputRef?.focus();
  };

  const handleSearchInput = () => {
    dispatch('search', searchQuery);
  };

  // Handle scroll for header shrink effect
  const handleScroll = () => {
    const scrollY = window.scrollY;
    isScrolled = scrollY > 50;
    lastScrollY = scrollY;
  };

  onMount(() => {
    mounted = true;
    updateIndicator();
    window.addEventListener('keydown', handleGlobalKeydown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    setTimeout(() => headerRef?.classList.add('settled'), 700);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
      window.removeEventListener('scroll', handleScroll);
    };
  });

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

<header class="unified-header" class:scrolled={isScrolled} bind:this={headerRef}>
  <!-- Compact Search -->
  {#if showSearch}
    <div class="search-compact" class:focused={isSearchFocused}>
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
        <path d="M21 21l-6 -6"/>
      </svg>
      <input
        type="search"
        bind:this={inputRef}
        bind:value={searchQuery}
        on:input={handleSearchInput}
        on:focus={() => isSearchFocused = true}
        on:blur={() => isSearchFocused = false}
        placeholder="Search..."
      />
      {#if searchQuery}
        <button type="button" class="clear-btn" on:click={clearSearch} aria-label="Clear">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
          </svg>
        </button>
      {:else}
        <kbd class="shortcut-hint">/</kbd>
      {/if}
    </div>
  {/if}

  <!-- Experience Tabs -->
  <nav 
    class="experience-tabs" 
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
    justify-content: center;
    gap: 0.75rem;
    margin: 1.5rem auto;
    padding: 0.4rem 0.5rem 0.4rem 0.4rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    width: fit-content;
    position: sticky;
    top: 1rem;
    z-index: 100;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.3s var(--ease-smooth);
  }

  /* Shrink header on scroll */
  .unified-header.scrolled {
    padding: 0.3rem 0.4rem 0.3rem 0.35rem;
    gap: 0.5rem;
    margin: 0.75rem auto;
    top: 0.5rem;
    background: rgba(10, 14, 39, 0.85);
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
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

  /* Compact Search */
  .search-compact {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.6rem;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid transparent;
    border-radius: 999px;
    transition: all 0.3s var(--ease-smooth);
    min-width: 140px;
  }

  .search-compact.focused {
    background: rgba(0, 0, 0, 0.35);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 12px rgba(0, 240, 255, 0.2);
    min-width: 180px;
  }

  .search-icon {
    color: var(--text-muted);
    flex-shrink: 0;
    transition: color 0.2s;
  }

  .search-compact.focused .search-icon {
    color: var(--neon-cyan);
  }

  .search-compact input {
    flex: 1;
    min-width: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-primary);
    background: transparent;
    border: none;
    outline: none;
  }

  .search-compact input::placeholder {
    color: var(--text-hint);
  }

  .clear-btn {
    display: flex;
    padding: 0.2rem;
    background: var(--glass-white);
    border: none;
    border-radius: 50%;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;
  }

  .clear-btn:hover {
    background: rgba(255, 100, 100, 0.3);
    color: #ff6b6b;
  }

  .shortcut-hint {
    padding: 0.1rem 0.35rem;
    font-family: 'Inter', monospace;
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--text-hint);
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 3px;
    flex-shrink: 0;
  }

  /* Experience Tabs */
  .experience-tabs {
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

  .experience-tabs button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-muted);
    background: transparent;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: color 0.3s var(--ease-smooth);
  }

  .experience-tabs button:hover:not(.selected) {
    color: var(--text-primary);
  }

  .experience-tabs button.selected {
    color: var(--void-deep);
    font-weight: 700;
  }

  .experience-tabs button:focus-visible {
    outline: 2px solid var(--neon-cyan);
    outline-offset: 2px;
  }

  .btn-icon {
    font-size: 0.9rem;
    line-height: 1;
  }

  .btn-label {
    line-height: 1;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .unified-header {
      gap: 0.5rem;
      padding: 0.35rem;
      margin: 1rem 0.75rem;
    }

    .search-compact {
      min-width: 100px;
      padding: 0.35rem 0.5rem;
    }

    .search-compact.focused {
      min-width: 120px;
    }

    .search-compact input {
      font-size: 0.75rem;
    }

    .experience-tabs {
      padding: 0.25rem;
    }

    .experience-tabs button {
      padding: 0.4rem 0.7rem;
    }

    .btn-label {
      display: none;
    }

    .btn-icon {
      font-size: 1rem;
    }

    .shortcut-hint {
      display: none;
    }
  }
</style>
