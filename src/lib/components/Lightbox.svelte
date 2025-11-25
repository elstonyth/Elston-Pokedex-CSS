<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { lightbox, closeLightbox, navigateLightbox } from '../stores/ui.js';
  import { favorites, toggleFavorite } from '../stores/cards.js';
  import { addToast } from '../stores/ui.js';
  
  export let cards = [];
  
  $: isOpen = $lightbox.isOpen;
  $: card = $lightbox.currentCard;
  $: currentIndex = $lightbox.currentIndex;
  $: isFavorite = card && $favorites.includes(card.id);
  $: canPrev = currentIndex > 0;
  $: canNext = cards.length > 0 && currentIndex < cards.length - 1;
  
  function handleKeyDown(event) {
    if (!isOpen) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft' && canPrev) navigateLightbox(-1, cards);
    if (event.key === 'ArrowRight' && canNext) navigateLightbox(1, cards);
    if (event.key === 'f' && card) toggleFavorite(card.id);
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) closeLightbox();
  }
  
  function shareCard() {
    if (!card) return;
    const url = new URL(window.location.href);
    url.searchParams.set('card', card.id);
    navigator.clipboard.writeText(url.toString());
    addToast('Link copied to clipboard!', 'success', 2000);
  }
  
  function getCardImage(c) {
    if (c.images?.large) return c.images.large;
    if (c.img) return c.img;
    return `https://images.pokemontcg.io/${c.set?.toLowerCase()}/${c.number}_hires.png`;
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if isOpen && card}
  <div 
       class="lightbox-overlay" 
       on:click={handleBackdropClick}
       on:keydown={(e) => e.key === 'Escape' && closeLightbox()}
       transition:fade={{ duration: 200 }} 
       role="dialog" 
       aria-modal="true"
       tabindex="-1">
    <div class="lightbox-content" transition:scale={{ duration: 300, start: 0.9 }}>
      {#if canPrev}
        <button class="nav-arrow prev" on:click={() => navigateLightbox(-1, cards)}>‹</button>
      {/if}
      {#if canNext}
        <button class="nav-arrow next" on:click={() => navigateLightbox(1, cards)}>›</button>
      {/if}
      
      <div class="card-container">
        {#key card.id}
          <img src={getCardImage(card)} alt={card.name} class="card-image" transition:fly={{ y: 20, duration: 300 }} />
        {/key}
      </div>
      
      <div class="info-panel">
        <div class="card-header">
          <h2>{card.name}</h2>
          <span class="card-number">#{card.number}</span>
        </div>
        <div class="card-details">
          {#if card.types}<div class="detail"><span class="label">Type</span><span class="value">{Array.isArray(card.types) ? card.types.join(', ') : card.types}</span></div>{/if}
          {#if card.rarity}<div class="detail"><span class="label">Rarity</span><span class="value">{card.rarity}</span></div>{/if}
        </div>
        <div class="card-actions">
          <button class="action-btn" class:active={isFavorite} on:click={() => toggleFavorite(card.id)}>
            {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
          </button>
          <button class="action-btn" on:click={shareCard}>📤 Share</button>
        </div>
        {#if cards.length > 0}<div class="counter">{currentIndex + 1} / {cards.length}</div>{/if}
      </div>
      
      <button class="close-btn" on:click={closeLightbox}>×</button>
    </div>
  </div>
{/if}

<style>
  .lightbox-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.9);
    backdrop-filter: blur(20px); z-index: 10000;
    display: flex; align-items: center; justify-content: center; padding: 2rem;
  }
  .lightbox-content {
    display: flex; align-items: center; gap: 2rem;
    max-width: 1000px; width: 100%; position: relative;
  }
  .card-container { flex: 0 0 auto; max-width: 350px; width: 100%; }
  .card-image {
    width: 100%; height: auto; border-radius: 1rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(0,240,255,0.2);
  }
  .info-panel {
    flex: 1; padding: 1.5rem; background: rgba(30,39,73,0.9);
    border: 1px solid var(--glass-border); border-radius: 1rem; max-width: 350px;
  }
  .card-header { display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--glass-border); }
  .card-header h2 { margin: 0; font-size: 1.5rem; color: var(--neon-cyan); }
  .card-number { color: rgba(255,255,255,0.5); }
  .card-details { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
  .detail { display: flex; justify-content: space-between; }
  .label { font-size: 0.75rem; text-transform: uppercase; color: rgba(255,255,255,0.5); }
  .value { color: rgba(255,255,255,0.9); }
  .card-actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  .action-btn {
    flex: 1; padding: 0.6rem; background: rgba(255,255,255,0.05);
    border: 1px solid var(--glass-border); border-radius: 0.5rem;
    font-family: inherit; font-size: 0.8rem; color: rgba(255,255,255,0.8);
    cursor: pointer; transition: all 0.2s;
  }
  .action-btn:hover { background: rgba(255,255,255,0.1); }
  .action-btn.active { background: rgba(255,100,100,0.2); border-color: rgba(255,100,100,0.4); }
  .counter { text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.4); }
  .nav-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 45px; height: 45px; background: rgba(255,255,255,0.1);
    border: 1px solid var(--glass-border); border-radius: 50%;
    font-size: 1.5rem; color: white; cursor: pointer; transition: all 0.2s;
  }
  .nav-arrow:hover { background: rgba(0,240,255,0.2); border-color: var(--neon-cyan); }
  .nav-arrow.prev { left: -60px; }
  .nav-arrow.next { right: -60px; }
  .close-btn {
    position: absolute; top: -50px; right: 0;
    width: 36px; height: 36px; background: rgba(255,255,255,0.1);
    border: 1px solid var(--glass-border); border-radius: 50%;
    font-size: 1.25rem; color: white; cursor: pointer; transition: all 0.2s;
  }
  .close-btn:hover { background: rgba(255,100,100,0.2); }
  @media (max-width: 800px) {
    .lightbox-content { flex-direction: column; gap: 1rem; }
    .card-container { max-width: 280px; }
    .info-panel { max-width: none; width: 100%; }
    .nav-arrow.prev { left: 10px; } .nav-arrow.next { right: 10px; }
  }
</style>
