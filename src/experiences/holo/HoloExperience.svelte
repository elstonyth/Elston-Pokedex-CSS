<script>
	import { onMount } from "svelte";

	import Search from "../../Search.svelte";
	import CardList from "../../Cards.svelte";
	import Card from "../../lib/components/CardProxy.svelte";

	let showcase, basics, reverse, holos, cosmos, amazings, radiant, basicGallery,
		vee, veeUltra, veeAlt, veeMax, veeMaxAlt, veeStar,
		trainerHolo, rainbow, gold, veeGallery, shinyVault;

	export let query = "";
	let isLoading = true;

	const getCards = async () => {
		let cardFetch = await fetch(import.meta.env.BASE_URL + "data/cards.json");
		let cards = await cardFetch.json();
		return cards;
	};

	const loadCards = async () => {
		return getCards().then((cards) => {
			window.cards = cards;
			showcase = cards[0];
			basics = cards.slice(1, 4);
			reverse = [...cards.slice(4, 7), ...cards.slice(70, 76)];
			holos = cards.slice(7, 13);
			cosmos = cards.slice(13, 16);
			amazings = cards.slice(76, 85);
			radiant = cards.slice(16, 19);
			basicGallery = cards.slice(19, 22);
			vee = cards.slice(22, 25);
			veeUltra = cards.slice(25, 28);
			veeAlt = cards.slice(28, 34);
			veeMax = cards.slice(37, 40);
			veeMaxAlt = cards.slice(40, 43);
			veeStar = cards.slice(43, 46);
			trainerHolo = cards.slice(46, 52);
			rainbow = cards.slice(52, 58);
			gold = cards.slice(58, 64);
			veeGallery = cards.slice(64, 70);
			shinyVault = cards.slice(85, 91);
			isLoading = false;
		});
	};

	const scrollToSection = (anchorId) => {
		const $target = document.querySelector(`[id="${anchorId}"]`);
		if ($target) {
			$target.scrollIntoView({ behavior: "smooth" });
			if (window.location.hash) {
				history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
			}
		}
	};

	onMount(() => {
		loadCards();
		const hash = window.location.hash?.replace(/^.*?-/, "");
		if (!hash) {
			return;
		}
		const $headings = document.querySelectorAll("h1,h2,h3");
		const $anchor = [...$headings].find((el) => {
			const id = el.getAttribute("id")?.replace(/^.*?-/, "");
			return id === hash;
		});
		if ($anchor) {
			setTimeout(() => {
				$anchor.scrollIntoView();
			}, 100);
		}
	});
</script>

<main class="experience-holo">
	<header class="hero">
		<div class="hero__text">
			<p class="eyebrow">Pure CSS • No JavaScript Animation Libraries</p>
			<h1 id="⚓-top">Holographic Pokemon Cards</h1>
			<p class="author">by Elston.Y</p>
			<p class="tagline">
				Realistic holographic effects powered entirely by CSS.
				Hover, tilt, and interact with pixel-perfect foil animations.
			</p>
			<ul class="hero__stats">
				<li><span>90+</span> Cards Recreated</li>
				<li><span>14</span> Foil Effects</li>
				<li><span>60fps</span> Smooth Animation</li>
			</ul>
			<div class="hero__cta">
				<button class="pill primary" type="button" on:click={() => scrollToSection("⚓-common")}>
					Explore Gallery
				</button>
				<button class="pill secondary" type="button" on:click={() => scrollToSection("⚓-intro")}>
					Learn More
				</button>
			</div>
		</div>

		<div class="showcase">
			{#if !showcase}
				loading...
			{:else}
				<Card
					id={showcase.id}
					name={showcase.name}
					set={showcase.set}
					number={showcase.number}
					types={showcase.types}
					supertype={showcase.supertype}
					subtypes={showcase.subtypes}
					rarity={showcase.rarity}
					isReverse={showcase.isReverse}
					showcase={true}
				/>
			{/if}
		</div>
	</header>

	<section class="hero-info" id="⚓-intro">
		<p>
			Every card features cursor-aware lighting, dynamic foil reflections, and depth-mapped highlights.
			Move your mouse to see the holographic effects respond in real-time.
		</p>
		<p>
			Explore the gallery below to discover reverse holos, cosmos textures, radiant patterns,
			rainbow rares, and secret golds—all crafted with pure CSS.
		</p>
	</section>

	<Search bind:query />

	{#if query.length < 3}
		<h2 id="⚓-common">
			<a href="#⚓-common">
				Common &amp; Uncommon
			</a>
		</h2>
		<p>
			All cards get a 3d rotation with CSS based on the cursor position.<br /> The default basic
			non-holo cards simply apply a <mark>flare/glare effect</mark> to the card which follows the mouse.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each basics as card, index}
					<Card
						id={card.id}
						name={card.name}
						img={card.images.large}
						number={card.number}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-reverse">
			<a href="#⚓-reverse">
				Reverse Holo non-rares
			</a>
		</h2>
		<p>
			Reverse holo cards come in <mark>many shapes and sizes</mark> (trainer, stage1, and different energy types). <br /> Therefore
			there are a few examples here to show the different variations. The <mark>background uses a foil and a mask layer</mark>
			along with a glare. I also <mark>clip the glare</mark> into the image window to treat the image and the holofoil differently.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each reverse as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
						isReverse
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-holo">
			<a href="#⚓-holo">
				Holo Rare
			</a>
		</h2>
		<p>
			Holo cards have a <mark>holographic foil effect</mark> on the image window. This is achieved with
			a <mark>foil background image</mark> and a <mark>mask layer</mark> to clip the foil to the image window.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each holos as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-cosmos">
			<a href="#⚓-cosmos">
				Cosmos Holo
			</a>
		</h2>
		<p>
			Cosmos holo cards have a <mark>unique sparkle pattern</mark> that looks like stars in the night sky.
			This is achieved with a <mark>custom background image</mark> and <mark>color filters</mark>.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each cosmos as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-amazing">
			<a href="#⚓-amazing">
				Amazing Rare
			</a>
		</h2>
		<p>
			Amazing Rare cards feature a <mark>vibrant rainbow effect</mark> with dynamic color shifts.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each amazings as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-radiant">
			<a href="#⚓-radiant">
				Radiant Rare
			</a>
		</h2>
		<p>
			Radiant cards have a <mark>glowing radial effect</mark> emanating from the center.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each radiant as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-basic-gallery">
			<a href="#⚓-basic-gallery">
				Trainer Gallery <sup>(Basic)</sup>
			</a>
		</h2>
		<p>
			Basic Trainer Gallery cards feature special artwork with subtle holo effects.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each basicGallery as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v">
			<a href="#⚓-v">
				Pokemon V
			</a>
		</h2>
		<p>
			Pokemon V cards have a <mark>metallic gradient effect</mark> that shifts as you move the card.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each vee as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-ultra">
			<a href="#⚓-v-ultra">
				Pokemon V <sup>(Ultra Rare / Full Art)</sup>
			</a>
		</h2>
		<p>
			Ultra Rare (Full Art) Pokemon V cards have <mark>additional texture</mark> when looked at from certain angles. This is achieved with
			an <mark>additional background image with an exclusion filter</mark>. The effect is also more
			vibrant which adds to the metallic look.
		</p>
		<p>
			The texture effect is not identical to reality as the real cards each have a unique pattern that
			follows the art.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeUltra as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-alternate-art">
			<a href="#⚓-v-alternate-art">
				Pokemon V <sup>(Alternate Art)</sup>
			</a>
		</h2>
		<p>
			Alternate Art Pokemon V cards have <mark
				>practically the same holo effect as the Ultra Rare (Full Art) cards</mark
			>. The only difference is the pattern texture.
		</p>
		<p>The effect looks somewhat different though due to the type of artwork.</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeAlt as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-max">
			<a href="#⚓-v-max">
				VMax
			</a>
		</h2>
		<p>
			The gradient effect of Pokemon VMax is more subtle, using a <mark
				>larger background gradient</mark
			>
			which moves more slowly. But the <mark>texture effect is more pronounced</mark>.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeMax as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-max-alternate">
			<a href="#⚓-v-max-alternate">
				VMax <sup>(Alternate/Rainbow)</sup>
			</a>
		</h2>
		<p>
			There's some VMax cards that show a <mark>full, or alternate artwork</mark>. These are
			<mark>classed as "rainbow rare"</mark>
			and have a similar effect to the rainbow cards. It's a really
			<mark>vibrant and glittery overlay</mark>.
		</p>
		<p>
			This is achieved with a <mark>background image of glitter/sparkles</mark>, and a texture pattern
			background image, sandwiching the usual linear gradients.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeMaxAlt as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-star">
			<a href="#⚓-v-star">
				VStar
			</a>
		</h2>
		<p>
			Again back to the <mark>diagonal gradients overlaying a texture</mark>, VStar are quite
			<mark>similar to the Ultra Rare</mark>
			(Full/Alt) cards. The cards are generally <mark>brighter with a pastel hue</mark>, though, which
			makes the gradient and texture more subtle.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeStar as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-trainer-full-art">
			<a href="#⚓-trainer-full-art">
				Trainer Holo <sup>(Full Art / Trainer Gallery)</sup>
			</a>
		</h2>
		<p>
			Trainer Gallery cards feature <mark>full art illustrations</mark> with a <mark>subtle texture overlay</mark>
			that enhances the artwork without overwhelming it.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each trainerHolo as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-rainbow-rare">
			<a href="#⚓-rainbow-rare">
				Rainbow Rare <sup>(VMax, VStar)</sup>
			</a>
		</h2>
		<p>
			The Rainbow Rare is a <mark>super glittery effect on top of pastel gradients</mark>. This is
			achieved with a background image of glitter/sparkles and a
			<mark>color-burn/hard-light background blend</mark> for some pastel gradients.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each rainbow as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-secret-rare">
			<a href="#⚓-secret-rare">
				Secret Rare <sup>(Gold)</sup>
			</a>
		</h2>
		<p>
			<mark>GOLD!</mark> Here we apply two glitter layers on top of each other with a overlay effect and
		<mark>slide the two layers in opposite directions</mark>. We also <mark>mask the foil image</mark> with a gradient so
		that foil and glitter layers are mutually exclusive. The resulting effect is a shimmering glitter layer!
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each gold as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-trainer-gallery-v">
			<a href="#⚓-trainer-gallery-v">
				Trainer Gallery <sup>(V / VMax)</sup>
			</a>
		</h2>
		<p>
			The V and VMax cards in the Trainer Gallery are generally quite similar to the normal V and VMax
			cards, so here I've just tweaked the values a little and added a different background texture.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeGallery as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-shiny-vault">
			<a href="#⚓-shiny-vault">
				Shiny Vault <sup>(Basic / Stage 1 / V / VMax)</sup>
			</a>
		</h2>
		<p>
			Shiny Vault cards have quite a unique effect in whereby the foil background is a shiny silver
			color. To achieve this we apply the foil image with some radial gradients to darken the foil
			over the background. This creates a slightly silver effect on top of the white card background.
			This effect works best in Firefox.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each shinyVault as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

	{/if}
</main>
