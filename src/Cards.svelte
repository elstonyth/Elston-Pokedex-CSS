<script>
	
	import { activeCard } from "./lib/stores/activeCard.js";
	
	let thisGrid;
	
	$: active = thisGrid && thisGrid.contains( $activeCard );
	
</script>

<section 
	class="card-grid" 
	class:active
	bind:this={thisGrid}
>

<slot />

</section>

<style>
	.card-grid {
		display: grid;
		/* Responsive grid: auto-fit columns with min 280px */
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: clamp(24px, 4vw, 50px);
		transform-style: preserve-3d;
		height: 100%;
		max-width: 1800px;
		margin: 0 auto;
		padding: clamp(16px, 4vw, 50px);
		position: relative;
		contain: layout style;
	}
	
	.card-grid.active {
		z-index: 150;
		isolation: isolate;
	}

	/* Ensure interacting cards have very high z-index */
	:global(.card.interacting) {
		z-index: 200 !important;
	}

	:global(.card.active) {
		z-index: 200 !important;
	}

	/* Staggered Animation - optimized for 60fps */
	@keyframes fadeIn {
		from { 
			opacity: 0; 
			transform: translateY(20px) scale(0.97);
		}
		to { 
			opacity: 1; 
			transform: translateY(0) scale(1);
		}
	}

	:global(.card-grid > .card) {
		animation: fadeIn 0.5s var(--ease-fluid) both;
		display: flex;
		justify-content: center;
	}

	/* Apply delay to first 12 cards - reduced for faster interactivity */
	:global(.card-grid > .card:nth-child(1)) { animation-delay: 30ms; }
	:global(.card-grid > .card:nth-child(2)) { animation-delay: 60ms; }
	:global(.card-grid > .card:nth-child(3)) { animation-delay: 90ms; }
	:global(.card-grid > .card:nth-child(4)) { animation-delay: 120ms; }
	:global(.card-grid > .card:nth-child(5)) { animation-delay: 150ms; }
	:global(.card-grid > .card:nth-child(6)) { animation-delay: 180ms; }
	:global(.card-grid > .card:nth-child(7)) { animation-delay: 210ms; }
	:global(.card-grid > .card:nth-child(8)) { animation-delay: 240ms; }
	:global(.card-grid > .card:nth-child(9)) { animation-delay: 270ms; }
	:global(.card-grid > .card:nth-child(10)) { animation-delay: 300ms; }
	:global(.card-grid > .card:nth-child(11)) { animation-delay: 330ms; }
	:global(.card-grid > .card:nth-child(12)) { animation-delay: 360ms; }

	/* Large desktop: 4 columns */
	@media screen and (min-width: 1440px) {
		.card-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: clamp(30px, 3vw, 50px);
		}
	}

	/* Desktop: 3 columns */
	@media screen and (min-width: 1024px) and (max-width: 1439px) {
		.card-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: clamp(24px, 3vw, 40px);
		}
	}

	/* Tablet: 2 columns */
	@media screen and (min-width: 640px) and (max-width: 1023px) {
		.card-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: clamp(20px, 4vw, 36px);
			padding: clamp(20px, 4vw, 40px);
			max-width: 720px;
		}
	}

	/* Mobile: 2-column compact grid to reduce scrolling */
	@media screen and (max-width: 639px) {
		.card-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: clamp(12px, 3vw, 20px);
			padding: 16px 12px;
			max-width: 100%;
		}

		:global(.card-grid > .card) {
			justify-content: center;
			max-width: 100%;
			margin: 0 auto;
		}
	}

	/* Extra small mobile: still 2 columns but tighter */
	@media screen and (max-width: 380px) {
		.card-grid {
			padding: 12px 8px;
			gap: 10px;
		}
	}

	/* Very small screens: single column */
	@media screen and (max-width: 320px) {
		.card-grid {
			grid-template-columns: 1fr;
			gap: 16px;
			padding: 12px;
			max-width: 280px;
		}

		:global(.card-grid > .card) {
			max-width: 260px;
		}
	}
</style>
