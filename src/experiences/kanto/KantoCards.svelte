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
    /* Responsive grid: auto-fit columns with min 280px */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: clamp(24px, 4vw, 50px);
    transform-style: preserve-3d;
    height: 100%;
    max-width: 1800px;
    margin: 0 auto;
    padding: clamp(16px, 4vw, 50px);
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
    animation: cardEntry 0.6s var(--ease-fluid) backwards;
    display: flex;
    justify-content: center;
  }

  @keyframes cardEntry {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Ensure interacting cards have very high z-index */
  :global(.card.interacting) {
    z-index: 200 !important;
  }

  :global(.card.active) {
    z-index: 200 !important;
  }

  /* Ensure card-slot containing active/interacting cards also has high z-index */
  :global(.card-slot:has(.card.interacting)),
  :global(.card-slot:has(.card.active)) {
    z-index: 190 !important;
  }

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

  /* Mobile: Single column, centered cards */
  @media screen and (max-width: 639px) {
    .card-grid {
      grid-template-columns: 1fr;
      gap: clamp(24px, 6vw, 40px);
      padding: 20px 16px;
      max-width: 360px;
    }

    :global(.card-slot) {
      justify-content: center;
    }

    /* Touch-friendly: ensure cards have space for interaction */
    :global(.card-slot .card) {
      max-width: 300px;
      width: 100%;
    }
  }

  /* Extra small mobile */
  @media screen and (max-width: 380px) {
    .card-grid {
      padding: 16px 12px;
      gap: 20px;
      max-width: 320px;
    }

    :global(.card-slot .card) {
      max-width: 280px;
    }
  }

  /* Scroll snap for mobile */
  @media screen and (max-width: 639px) {
    .card-grid {
      scroll-snap-type: y proximity;
    }

    :global(.card-slot) {
      scroll-snap-align: start;
      scroll-margin-top: 80px;
    }
  }
</style>
