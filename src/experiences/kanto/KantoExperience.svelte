<script>
  import { onMount } from "svelte";
  import Search from "./KantoSearch.svelte";
  import CardList from "./KantoCards.svelte";
  import Card from "../../lib/components/CardProxy.svelte";
  import CardSkeleton from "../../lib/components/CardSkeleton.svelte";
  import CardCounter from "../../lib/components/CardCounter.svelte";
  import ActiveFilters from "../../lib/components/ActiveFilters.svelte";
  import SortDropdown from "../../lib/components/SortDropdown.svelte";
  import EmptyState from "../../lib/components/EmptyState.svelte";
  import RandomCardButton from "../../lib/components/RandomCardButton.svelte";
  import { openLightbox } from "../../lib/stores/ui.js";
  import { addRecentSearch } from "../../lib/stores/cards.js";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  let allCards = [];
  let visibleCards = [];
  export let query = "";
  let prevQuery = "";
  let activePreset = "";
  let isLoading = true;
  let gridEl;
  let searchEl;
  
  // Sort state
  let sortField = "number";
  let sortDirection = "asc";

  const getCards = async () => {
    const response = await fetch("/data/cards-151.json");
    const cards = await response.json();
    return cards;
  };

  const loadCards = async () => {
    return getCards().then((cards) => {
      window.cards151 = cards;
      allCards = cards.map((card) => {
        if (card.rarity === "Common" || card.rarity === "Uncommon") {
          card.isReverse = !!Math.round(Math.random());
        }
        card.set = card.set.id;
        return card;
      });
      visibleCards = [...allCards];
      isLoading = false;
    });
  };
  
  // Sort cards
  const sortCards = (cards) => {
    return [...cards].sort((a, b) => {
      let aVal, bVal;
      switch (sortField) {
        case 'name':
          aVal = a.name?.toLowerCase() || '';
          bVal = b.name?.toLowerCase() || '';
          break;
        case 'rarity':
          aVal = a.rarity?.toLowerCase() || '';
          bVal = b.rarity?.toLowerCase() || '';
          break;
        case 'type':
          aVal = a.types?.[0]?.toLowerCase() || '';
          bVal = b.types?.[0]?.toLowerCase() || '';
          break;
        default:
          aVal = parseInt(a.number) || 0;
          bVal = parseInt(b.number) || 0;
      }
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      }
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    });
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    sortField = e.detail.field;
    sortDirection = e.detail.direction;
    visibleCards = sortCards(visibleCards);
  };
  
  // Random card
  const pickRandomCard = () => {
    if (!allCards.length) return;
    const randomIndex = Math.floor(Math.random() * allCards.length);
    const randomCard = allCards[randomIndex];
    query = randomCard.name;
    filterFromQuery(randomCard.name);
  };

  const searchFromUrl = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get("poke");
  };

  const cardFilter = (filter, card) => {
    filter = filter.trim().toLowerCase();
    if (filter === ""){ return true; }
    const cardName = card.name.toLowerCase();
    const cardTypes = card.types?.join(" ").toLowerCase();
    const cardRarity = card.rarity?.toLowerCase();
    const cardNumber = card.number?.toLowerCase();
    return (
      cardName.includes(filter)
      || cardTypes?.includes(filter)
      || cardRarity?.includes(filter)
      || cardNumber?.includes(filter)
    );
  };

  const customFilters = (query) => {
    let customSet = [];
    if (query === "starters") {
      [166, 168, 170, 1, 4, 7].forEach((cardNumber) => {
        const card = window.cards151.find(
          (card) => card.number === cardNumber.toString()
        );
        if (card) {
          customSet.push(card || {});
        }
      });
    } else if (query === "lets-go") {
      [144, 145, 146, 150].forEach((cardNumber) => {
        const card = window.cards151.find((card) => card.number === cardNumber.toString());
        if (card) {
          customSet.push(card || {});
        }
      });
    } else if (query === "starter-evolutions") {
      [2, 5, 8, 9, 38, 6].forEach((cardNumber) => {
        const card = window.cards151.find((card) => card.number === cardNumber.toString());
        if (card) {
          customSet.push(card || {});
        }
      });
    } else if (query === "shinies") {
      customSet = window.cards151.filter((card) => card.images.large.includes("sv"));
    } else if (query === "ex-cards") {
      customSet = window.cards151.filter((card) => card.subtypes?.includes("ex"));
    } else if (query === "illustrations") {
      customSet = [118, 119, 162].map((cardNumber) => window.cards151.find((card) => card.number === cardNumber.toString()));
    } else if (query === "full-arts") {
      customSet = window.cards151.filter((card) => card.rarity?.toLowerCase().includes("illustration"));
    }
    return customSet.filter(Boolean);
  };

  const filterFromQuery = (searchQuery) => {
    if (!window.cards151) return;
    
    // Check if it's a preset filter
    const presets = ['starters', 'lets-go', 'starter-evolutions', 'shinies', 'ex-cards', 'illustrations', 'full-arts'];
    activePreset = presets.includes(searchQuery) ? searchQuery : '';
    
    if (searchQuery) {
      const customSet = customFilters(searchQuery);
      if (customSet.length) {
        visibleCards = sortCards(customSet);
      } else {
        visibleCards = sortCards(window.cards151.filter((card) => {
          return searchQuery.split(",").some((q) => cardFilter(q, card));
        }));
        // Add to recent searches if it's a text search
        if (searchQuery.length >= 2 && !presets.includes(searchQuery)) {
          addRecentSearch(searchQuery);
        }
      }
    } else {
      visibleCards = sortCards([...window.cards151]);
    }

    if (prevQuery !== searchQuery) {
      requestAnimationFrame(() => {
        searchEl?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    prevQuery = searchQuery;
  };

  const handleQueryChange = (value) => {
    query = value;
    filterFromQuery(value);
  };
  
  // Handle filter removal
  const handleRemoveFilter = (e) => {
    const filter = e.detail;
    if (filter.type === 'search' || filter.type === 'preset') {
      query = '';
      activePreset = '';
      filterFromQuery('');
    } else if (filter.type === 'sort') {
      sortField = 'number';
      sortDirection = 'asc';
      visibleCards = sortCards(visibleCards);
    }
  };
  
  // Clear all filters
  const handleClearAll = () => {
    query = '';
    activePreset = '';
    sortField = 'number';
    sortDirection = 'asc';
    filterFromQuery('');
  };
  
  // Handle card click for lightbox
  const handleCardClick = (card, index) => {
    openLightbox(card, index);
  };

  onMount(() => {
    // Listen for random card keyboard shortcut (custom event)
    const handleRandomCard = () => pickRandomCard();
    window.addEventListener('randomCard', handleRandomCard);
    
    loadCards().then(() => {
      const initialQuery = searchFromUrl();
      if (initialQuery) {
        query = initialQuery;
        filterFromQuery(query);
      }
    });
    
    return () => {
      window.removeEventListener('randomCard', handleRandomCard);
    };
  });
</script>

<main class="experience-151">
  <Search 
    bind:query 
    on:query={(e) => handleQueryChange(e.detail)} 
    bind:cardSearch={searchEl}
  />
  
  <!-- Controls bar -->
  <div class="controls-bar">
    <CardCounter displayed={visibleCards.length} total={allCards.length} />
    <div class="controls-right">
      <RandomCardButton on:random={pickRandomCard} />
      <SortDropdown {sortField} {sortDirection} on:change={handleSortChange} />
    </div>
  </div>
  
  <!-- Active filters -->
  <ActiveFilters 
    {query} 
    {activePreset} 
    {sortField} 
    {sortDirection}
    on:remove={handleRemoveFilter}
    on:clearAll={handleClearAll}
  />

  <section>
    {#if isLoading}
      <CardList bind:cardGrid={gridEl}>
        {#each Array(9) as _, i}
          <div class="card-slot" style="animation-delay: {i * 0.05}s;">
            <CardSkeleton />
          </div>
        {/each}
      </CardList>
    {:else if visibleCards.length === 0}
      <EmptyState 
        {query} 
        type="no-results"
        on:action={handleClearAll}
        on:suggest={(e) => handleQueryChange(e.detail)}
      />
    {:else}
      <CardList bind:cardGrid={gridEl}>
        {#each visibleCards as card, index (card.id)}
          <div 
            class="card-slot" 
            style="animation-delay: {Math.min(index, 12) * 0.05}s;"
            animate:flip={{ delay: 50, duration: d => Math.min(600, d / 2), easing: quintOut }}
          >
            <Card
              id={card.id}
              name={card.name}
              img={card.images.large}
              set={card.set}
              number={card.number}
              types={card.types}
              supertype={card.supertype}
              subtypes={card.subtypes}
              rarity={card.rarity}
              isReverse={card.isReverse}
            />
          </div>
        {/each}
      </CardList>
    {/if}
  </section>
</main>

<style>
  .controls-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 1400px;
    margin: 2rem auto;
    padding: 0 50px;
  }
  
  .controls-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  @media (max-width: 900px) {
    .controls-bar {
      padding: 0 20px;
      justify-content: center;
    }
  }
  
  @media (max-width: 500px) {
    .controls-bar {
      flex-direction: column;
    }
    
    .controls-right {
      width: 100%;
      justify-content: center;
    }
  }
</style>
