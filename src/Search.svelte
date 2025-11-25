<script>
	import pokemon from "pokemontcgsdk";

	import CardList from "./Cards.svelte";
	import Card from "./lib/components/CardProxy.svelte";

	export let query = "";

	let loadingQuery = true;
	let queryTimer;
	let queryResult = [];
	let isError = false;

	pokemon.configure({ apiKey: import.meta.env.VITE_API_KEY });
  
	const loadQuery = async() => {

    if ( !usableQuery ) {
      return;
    }

		loadingQuery = true;
		clearTimeout( queryTimer );
		queryTimer = setTimeout(() => {

			pokemon.card

				.where({ 
					q: `( set.id:swsh* AND name:"*${query}*" )`,
					select: `id,name,number,supertype,subtypes,rarity,images,types,set`,
					orderBy: `-set.releaseDate,-number`,
          pageSize: 36
				})

				.then(result => {

					const cards = result.data || [];
					
          queryResult = [];
          isError = false;

					let cardsMap = cards.slice(0, 36).map(card => {
						if ( card.rarity === "Common" || card.rarity === "Uncommon" ) {
							card.isReverse = !!Math.round(Math.random());
						}
						card.set = card.set.id;
						return card;
					});

					queryResult = [...cardsMap];
					loadingQuery = false;

			  })
        
        .catch((error) => {
          console.error('Search API error:', error);
          queryResult = [];
          loadingQuery = false;
          isError = true;
        });

        // @ts-ignore
        if (typeof gtag === 'function') {
          gtag("event", "search", {
            search_term: query
          });
        }


		},666);
	};

  $: usableQuery = query.length > 2;
	$: query && loadQuery();

</script>



{#if !query}
  <p class="browse-hint">Browse cards below, or use the search above!</p>
{/if}

{#if usableQuery && loadingQuery}
  <h3>Fetching Cards...</h3>
{/if}

{#if usableQuery && queryResult.length}
  <CardList>
    {#each queryResult as card, index (card.id)}
      <Card
        id={card.id}
        name={card.name}
        set={card.set}
        number={card.number}
        types={card.types}
        supertype={card.supertype}
        subtypes={card.subtypes}
        rarity={card.rarity}
        isReverse={card.isReverse}
      />
    {/each}
  </CardList>
{/if}

{#if isError || ( usableQuery && !loadingQuery && !queryResult.length )}

  <h3>Error: No cards found with that name.</h3>

  <CardList>
    <Card 
      id="basep-16"
      name="Computer Error"
      set="basep"
      number="16"
      img="https://images.pokemontcg.io/basep/16_hires.png"
      supertype="Trainer"
      subtypes="Rocket's Secret Machine"
      rarity="Promo"
      isReverse={false}
    />
  </CardList>

{/if}



<style>
  .browse-hint {
    font-size: 0.95rem;
    font-weight: 400;
    margin: 1.5rem 0;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
  }

  h3 {
    font-family: inherit;
    font-size: 1.1rem;
    font-weight: 400;
    margin: 2rem 0 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }
</style>