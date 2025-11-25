<script>
  import { activeCard } from "../../lib/stores/activeCard.js";
  export let cardGrid;
  $: active = cardGrid && cardGrid.contains($activeCard);
</script>

<section class="card-grid" class:active bind:this={cardGrid}>
  <slot />
</section>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 80px 0;
    transform-style: preserve-3d;
    height: 100%;
    max-width: 1400px;
    margin: auto;
    padding: 50px;
    position: relative;
    scroll-margin-top: 100px;
    contain: layout style;
  }

  .card-grid.active {
    z-index: 150;
    isolation: isolate;
  }

  /* Staggered entry animation for card slots */
  :global(.card-slot) {
    animation: cardEntry 0.8s var(--ease-fluid) backwards;
  }

  @keyframes cardEntry {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      /* Removed filter: blur() for better 60fps performance */
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Ensure interacting cards have very high z-index */
  :global(.card.interacting) {
    z-index: 180 !important;
  }

  :global(.card.active) {
    z-index: 180 !important;
  }

  /* Ensure card-slot containing active/interacting cards also has high z-index */
  :global(.card-slot:has(.card.interacting)),
  :global(.card-slot:has(.card.active)) {
    z-index: 170 !important;
  }

  @media screen and (min-width: 900px) {
    .card-grid {
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 60px 3vw;
    }
  }

  @media screen and (max-width: 900px) {
    .card-grid {
      padding: 30px 20px;
      grid-gap: 60px 0;
    }

    :global(.card-grid > .card-slot) {
      grid-column: 1;
      grid-row: var(--row, auto);
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
      will-change: transform, opacity;
    }

    /* First 18 cards get stacked layout */
    :global(.card-grid > .card-slot:nth-child(-n+18):nth-child(3n + 1)) {
      position: relative;
      left: -40px;
      top: 20px;
      z-index: 53;
      transform: translate3d(0, 0, 0.1px) rotateZ(-4deg);
      opacity: 1;
    }
    :global(.card-grid > .card-slot:nth-child(-n+18):nth-child(3n + 2)) {
      position: relative;
      left: 0px;
      top: 0px;
      z-index: 52;
      transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
      opacity: 0.99;
    }
    :global(.card-grid > .card-slot:nth-child(-n+18):nth-child(3n + 3)) {
      position: relative;
      left: 40px;
      top: -10px;
      z-index: 51;
      transform: translate3d(0, 0, 0.1px) rotateZ(4deg);
      opacity: 0.99;
    }

    /* Cards after 18th position use normal layout */
    :global(.card-grid > .card-slot:nth-child(n+19)) {
      position: relative;
      left: 0 !important;
      top: 0 !important;
      transform: none !important;
      opacity: 1 !important;
    }

    :global(.card-grid > .card-slot:has(.card.is-scaled)) {
      opacity: 1;
    }
    
    /* Fix z-index for interacting cards in stacked mobile layout */
    :global(.card-grid > .card-slot:has(.card.interacting)),
    :global(.card-grid > .card-slot:has(.card.active)) {
      z-index: 200 !important;
      transform: translate3d(0, 0, 0.1px) !important;
      left: 0 !important;
      top: 0 !important;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 900px) {
    .card-grid {
      max-width: 420px;
      margin: auto;
      padding: 40px 30px;
    }
    :global(.card-grid > .card-slot:nth-child(-n+18):nth-child(3n + 1)) {
      left: -80px;
      top: 15px;
      transform: translate3d(0, 0, 0.1px) rotateZ(-4deg);
    }
    :global(.card-grid > .card-slot:nth-child(-n+18):nth-child(3n + 2)) {
      left: 0px;
      top: -5px;
      transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
    }
    :global(.card-grid > .card-slot:nth-child(-n+18):nth-child(3n + 3)) {
      left: 80px;
      top: 0px;
      transform: translate3d(0, 0, 0.1px) rotateZ(4deg);
    }
  }
</style>
