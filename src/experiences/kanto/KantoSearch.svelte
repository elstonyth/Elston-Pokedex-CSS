<script>
  import { createEventDispatcher } from "svelte";

  export let query = "";
  export let cardSearch;

  const dispatch = createEventDispatcher();

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const updateUrl = debounce(() => {
    const url = new URL(window.location.href);
    const previousSearchParams = url.searchParams.get("poke");
    if (query === "") {
      url.searchParams.delete("poke");
    } else {
      url.searchParams.set("poke", query);
    }
    if (url.searchParams.get("poke") !== previousSearchParams) {
      window.history.pushState({}, "", url);
    }
    dispatch("query", query);
  }, 300);

  $: updateUrl(query);
</script>

<span bind:this={cardSearch} />

<!-- Search input moved to unified header - keeping filter presets only -->
{#if !query}
  <p class="browse-hint">Browse cards below, or use search above!</p>
{/if}

<nav>
  <ul>
    <li>
      <a href="?poke=starters" on:click|preventDefault={() => (query = "starters")}>
        Starters
      </a>
    </li>
    <li>
      <a href="?poke=lets-go" on:click|preventDefault={() => (query = "lets-go")}>
        Let's Go
      </a>
    </li>
    <li>
      <a
        href="?poke=starter-evolutions"
        on:click|preventDefault={() => (query = "starter-evolutions")}
      >
        Starter Evolutions
      </a>
    </li>
    <li>
      <a href="?poke=shinies" on:click|preventDefault={() => (query = "shinies")}>
        Shinies
      </a>
    </li>
    <li>
      <a href="?poke=ex-cards" on:click|preventDefault={() => (query = "ex-cards")}>
        Ex Cards
      </a>
    </li>
    <li>
      <a
        href="?poke=illustrations"
        on:click|preventDefault={() => (query = "illustrations")}
      >
        Illustrations
      </a>
    </li>
    <li>
      <a href="?poke=full-arts" on:click|preventDefault={() => (query = "full-arts")}>
        Full Arts
      </a>
    </li>
  </ul>
</nav>

<style>
  :global(.experience-151) {
    color: var(--text-primary);
  }

  .browse-hint {
    font-size: 0.95rem;
    font-weight: 400;
    margin: 1.5rem 0;
    color: var(--text-secondary);
    text-align: center;
  }

  nav {
    margin: 1.5rem auto;
    max-width: 800px;
  }

  nav ul {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    justify-content: center;
  }

  nav li {
    display: inline-block;
  }

  nav a {
    display: inline-block;
    position: relative;
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.65rem 1.25rem;
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    transition: all 0.3s var(--ease-smooth);
    font-family: 'Inter', sans-serif;
  }

  nav a::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--neon-cyan);
    transform: translate(-50%, -50%);
    transition: width 0.6s var(--ease-fluid), height 0.6s var(--ease-fluid);
    z-index: -1;
    opacity: 0.15;
  }

  nav a:hover::before {
    width: 120%;
    height: 200%;
  }

  nav a:hover {
    color: var(--neon-cyan);
    background: rgba(0, 240, 255, 0.12);
    border-color: var(--neon-cyan);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 0 20px var(--glow-cyan),
      0 6px 16px rgba(0, 240, 255, 0.3);
    text-shadow: 0 0 12px var(--glow-cyan);
  }

  nav a:active {
    transform: translateY(-1px) scale(0.98);
  }
</style>
