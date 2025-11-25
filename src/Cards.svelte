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
		grid-template-columns: 1fr;
		grid-gap: 60px 3vw;
		transform-style: preserve-3d;
		height: 100%;
		max-width: 1400px;
		margin: auto;
		padding: 50px;
		position: relative;
		contain: layout style;
	}
	
	.card-grid.active {
		z-index: 150;
		isolation: isolate;
	}

	/* Ensure interacting cards have very high z-index */
	:global(.card.interacting) {
		z-index: 180 !important;
	}

	:global(.card.active) {
		z-index: 180 !important;
	}

	/* Staggered Animation */
	@keyframes fadeIn {
		from { 
			opacity: 0; 
			transform: translateY(30px) scale(0.95);
			filter: blur(10px);
		}
		to { 
			opacity: 1; 
			transform: translateY(0) scale(1);
			filter: blur(0);
		}
	}

	:global(.card-grid > .card) {
		animation: fadeIn 0.6s var(--ease-fluid) both;
	}

	/* Apply delay to first 12 cards - reduced for faster interactivity */
	:global(.card-grid > .card:nth-child(1)) { animation-delay: 50ms; }
	:global(.card-grid > .card:nth-child(2)) { animation-delay: 100ms; }
	:global(.card-grid > .card:nth-child(3)) { animation-delay: 150ms; }
	:global(.card-grid > .card:nth-child(4)) { animation-delay: 200ms; }
	:global(.card-grid > .card:nth-child(5)) { animation-delay: 250ms; }
	:global(.card-grid > .card:nth-child(6)) { animation-delay: 300ms; }
	:global(.card-grid > .card:nth-child(7)) { animation-delay: 350ms; }
	:global(.card-grid > .card:nth-child(8)) { animation-delay: 400ms; }
	:global(.card-grid > .card:nth-child(9)) { animation-delay: 450ms; }
	:global(.card-grid > .card:nth-child(10)) { animation-delay: 500ms; }
	:global(.card-grid > .card:nth-child(11)) { animation-delay: 550ms; }
	:global(.card-grid > .card:nth-child(12)) { animation-delay: 600ms; }
		
	@media screen and (min-width: 900px) {
		.card-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	
	
	@media screen and (max-width: 900px) {
		.card-grid {
			padding: 30px 20px;
			grid-gap: 60px 0;
		}
		
		:global( .card-grid > .card ) {
			--row: 1;
			grid-column: 1;
			grid-row: var(--row);
			transition: opacity 0.3s ease, transform 0.3s ease;
			will-change: transform, opacity;
		}

		/* First 18 cards get stacked layout */
		:global( .card-grid > .card:nth-child(-n+18):nth-child(1n) ) {
			position: relative;
			left: -40px;
			top: 20px;
			z-index: 53;
			transform: translate3d(0, 0, 0.1px) rotateZ(-4deg);
			opacity: 1;
		}
		:global( .card-grid > .card:nth-child(-n+18):nth-child(2n) ) {
			left: 0px;
			top: 0px;
			z-index: 52;
			transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
			opacity: 0.99;
		}
		:global( .card-grid > .card:nth-child(-n+18):nth-child(3n) ) {
			left: 40px;
			top: -10px;
			z-index: 51;
			transform: translate3d(0, 0, 0.1px) rotateZ(4deg);
			opacity: 0.99;
		}
		:global( .card-grid > .card.interacting) ,
		:global( .card-grid > .card.active ) {
			opacity: 1;
		}
		
		:global( .card-grid > .card:nth-child(n+4):nth-child(-n+6) ) { grid-row: 2; }
		:global( .card-grid > .card:nth-child(n+7):nth-child(-n+9) ) { grid-row: 3; }
		:global( .card-grid > .card:nth-child(n+10):nth-child(-n+12) ) { grid-row: 4; }
		:global( .card-grid > .card:nth-child(n+13):nth-child(-n+15) ) { grid-row: 5; }
		:global( .card-grid > .card:nth-child(n+16):nth-child(-n+18) ) { grid-row: 6; }
		
		/* Cards after 18th position use normal layout */
		:global( .card-grid > .card:nth-child(n+19) ) {
			grid-row: auto;
			grid-column: auto;
			position: relative;
			transform: none !important;
			left: 0 !important;
			top: 0 !important;
			opacity: 1 !important;
		}

	}

	@media screen and (min-width: 600px) and (max-width: 900px) {
		.card-grid {
			max-width: 420px;
			margin: auto;
			padding: 40px 30px;
		}
		:global( .card-grid > .card:nth-child(-n+18):nth-child(1n) ) {
			left: -80px;
			top: 15px;
			transform: translate3d(0, 0, 0.1px) rotateZ(-4deg);
		}
		:global( .card-grid > .card:nth-child(-n+18):nth-child(2n) ) {
			left: 0px;
			top: -5px;
			transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
		}
		:global( .card-grid > .card:nth-child(-n+18):nth-child(3n) ) {
			left: 80px;
			top: 0px;
			transform: translate3d(0, 0, 0.1px) rotateZ(4deg);
		}
	}

	:global( .card-grid > .card.active ) {
		transform: translate3d(0, 0, 0.1px)!important;
	}
	
</style>
