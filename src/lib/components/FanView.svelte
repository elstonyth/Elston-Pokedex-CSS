<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { spring } from 'svelte/motion';
  import { fanCurrentIndex } from '../stores/cards.js';
  
  export let cards = [];
  export let visibleCount = 5; // Cards visible in fan
  
  const dispatch = createEventDispatcher();
  
  let containerEl;
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;
  let dragOffset = 0;
  
  // Spring for smooth animations
  const offset = spring(0, { stiffness: 0.1, damping: 0.4 });
  
  $: currentIndex = $fanCurrentIndex;
  $: totalCards = cards.length;
  
  // Get visible cards based on current index
  $: visibleCards = getVisibleCards(currentIndex, cards, visibleCount);
  
  function getVisibleCards(index, allCards, count) {
    if (!allCards.length) return [];
    
    const half = Math.floor(count / 2);
    const result = [];
    
    for (let i = -half; i <= half; i++) {
      const cardIndex = index + i;
      if (cardIndex >= 0 && cardIndex < allCards.length) {
        result.push({
          card: allCards[cardIndex],
          position: i,
          index: cardIndex
        });
      }
    }
    return result;
  }
  
  // Calculate transform for each card position
  function getCardTransform(position) {
    const rotation = position * 12; // degrees
    const xOffset = position * 25; // percentage
    const scale = position === 0 ? 1 : 0.75 - Math.abs(position) * 0.08;
    const zIndex = 10 - Math.abs(position);
    const opacity = position === 0 ? 1 : 0.7 - Math.abs(position) * 0.15;
    
    return {
      transform: `translateX(${xOffset}%) rotate(${rotation}deg) scale(${scale})`,
      zIndex,
      opacity: Math.max(0.3, opacity)
    };
  }
  
  // Navigation
  function goToNext() {
    if (currentIndex < totalCards - 1) {
      fanCurrentIndex.update(n => n + 1);
      dispatch('change', { index: currentIndex + 1 });
    }
  }
  
  function goToPrev() {
    if (currentIndex > 0) {
      fanCurrentIndex.update(n => n - 1);
      dispatch('change', { index: currentIndex - 1 });
    }
  }
  
  function goToIndex(index) {
    if (index >= 0 && index < totalCards) {
      fanCurrentIndex.set(index);
      dispatch('change', { index });
    }
  }
  
  // Touch/swipe handling
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = true;
  }
  
  function handleTouchMove(e) {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - touchStartX;
    const deltaY = e.touches[0].clientY - touchStartY;
    
    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      dragOffset = deltaX;
      offset.set(deltaX * 0.3);
    }
  }
  
  function handleTouchEnd() {
    isDragging = false;
    
    const threshold = 50;
    if (dragOffset < -threshold) {
      goToNext();
    } else if (dragOffset > threshold) {
      goToPrev();
    }
    
    dragOffset = 0;
    offset.set(0);
  }
  
  // Mouse swipe for desktop
  function handleMouseDown(e) {
    touchStartX = e.clientX;
    isDragging = true;
  }
  
  function handleMouseMove(e) {
    if (!isDragging) return;
    dragOffset = e.clientX - touchStartX;
    offset.set(dragOffset * 0.3);
  }
  
  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    
    const threshold = 50;
    if (dragOffset < -threshold) {
      goToNext();
    } else if (dragOffset > threshold) {
      goToPrev();
    }
    
    dragOffset = 0;
    offset.set(0);
  }
  
  // Keyboard navigation
  function handleKeydown(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'Home') {
      goToIndex(0);
    } else if (e.key === 'End') {
      goToIndex(totalCards - 1);
    }
  }
  
  // Click on side card to navigate
  function handleCardClick(position, index) {
    if (position !== 0) {
      goToIndex(index);
    } else {
      dispatch('select', { card: cards[index], index });
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<div 
  class="fan-container"
  bind:this={containerEl}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:mousedown={handleMouseDown}
  role="listbox"
  aria-label="Card fan navigation"
  tabindex="0"
>
  <!-- Navigation arrows -->
  <button 
    class="nav-arrow nav-prev" 
    on:click={goToPrev}
    disabled={currentIndex <= 0}
    aria-label="Previous card"
    title="Previous (←)"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
  
  <!-- Fan cards -->
  <div class="fan-deck" style="transform: translateX({$offset}px)">
    {#each visibleCards as { card, position, index } (card.id || index)}
      {@const style = getCardTransform(position)}
      <div 
        class="fan-card-wrapper"
        class:center={position === 0}
        style="
          transform: {style.transform};
          z-index: {style.zIndex};
          opacity: {style.opacity};
        "
        on:click={() => handleCardClick(position, index)}
        on:keydown={(e) => e.key === 'Enter' && handleCardClick(position, index)}
        role="option"
        aria-selected={position === 0}
        tabindex={position === 0 ? 0 : -1}
      >
        <slot name="card" {card} {position} isCenter={position === 0}>
          <!-- Default card display if no slot provided -->
          <div class="fan-card-placeholder">
            {card.name || 'Card'}
          </div>
        </slot>
      </div>
    {/each}
  </div>
  
  <button 
    class="nav-arrow nav-next" 
    on:click={goToNext}
    disabled={currentIndex >= totalCards - 1}
    aria-label="Next card"
    title="Next (→)"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
</div>

<!-- Progress and indicator section -->
<div class="fan-controls">
  <!-- Progress bar -->
  <div class="progress-bar-container">
    <div 
      class="progress-bar" 
      style="width: {((currentIndex + 1) / totalCards) * 100}%"
    ></div>
  </div>
  
  <!-- Position indicator -->
  <div class="fan-indicator">
    <span class="fan-position">
      <strong>{currentIndex + 1}</strong>
      <span class="separator">/</span>
      <span class="total">{totalCards}</span>
    </span>
    
    <!-- Quick navigation dots -->
    <div class="fan-dots">
      {#each Array(Math.min(7, totalCards)) as _, i}
        {@const dotIndex = Math.max(0, Math.min(currentIndex - 3 + i, totalCards - 1))}
        <button 
          class="dot"
          class:active={dotIndex === currentIndex}
          on:click={() => goToIndex(dotIndex)}
          aria-label="Go to card {dotIndex + 1}"
        />
      {/each}
    </div>
  </div>
  
  <!-- Keyboard hints (desktop only) -->
  <div class="keyboard-hints">
    <kbd>←</kbd> <kbd>→</kbd> to navigate
  </div>
</div>

<style>
  .fan-container {
    position: relative;
    width: 100%;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    touch-action: pan-y;
    user-select: none;
    outline: none;
    padding: 20px 0;
  }
  
  .fan-deck {
    position: relative;
    width: 300px;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease-out;
  }
  
  .fan-card-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.4s var(--ease-fluid), 
                opacity 0.3s ease,
                filter 0.3s ease;
    transform-origin: center bottom;
  }
  
  .fan-card-wrapper:not(.center) {
    filter: brightness(0.85);
  }
  
  .fan-card-wrapper.center {
    cursor: default;
  }
  
  .fan-card-wrapper:not(.center):hover {
    filter: brightness(1);
    opacity: 1 !important;
  }
  
  .fan-card-placeholder {
    width: 250px;
    height: 350px;
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
    font-weight: 600;
  }
  
  /* Navigation arrows */
  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border: none;
    background: var(--glass-white);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    font-size: 2rem;
    color: var(--text-primary);
    cursor: pointer;
    z-index: 20;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-arrow:hover:not(:disabled) {
    background: var(--neon-cyan);
    color: var(--void-deep);
    transform: translateY(-50%) scale(1.1);
  }
  
  .nav-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .nav-prev {
    left: 10px;
  }
  
  .nav-next {
    right: 10px;
  }
  
  /* Fan controls section */
  .fan-controls {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  /* Progress bar */
  .progress-bar-container {
    width: 100%;
    height: 4px;
    background: var(--glass-border);
    border-radius: 2px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-violet));
    border-radius: 2px;
    transition: width 0.3s var(--ease-smooth);
  }
  
  /* Indicator */
  .fan-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .fan-position {
    font-size: 1rem;
    color: var(--text-primary);
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }
  
  .fan-position strong {
    font-size: 1.25rem;
    color: var(--neon-cyan);
  }
  
  .fan-position .separator {
    color: var(--text-muted);
    margin: 0 0.1rem;
  }
  
  .fan-position .total {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
  
  .fan-dots {
    display: flex;
    gap: 0.4rem;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: var(--glass-border);
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;
  }
  
  .dot:hover {
    background: var(--text-muted);
    transform: scale(1.2);
  }
  
  .dot.active {
    background: var(--neon-cyan);
    transform: scale(1.3);
    box-shadow: 0 0 8px var(--glow-cyan);
  }
  
  /* Keyboard hints */
  .keyboard-hints {
    font-size: 0.75rem;
    color: var(--text-hint);
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  
  .keyboard-hints kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    padding: 0.15rem 0.4rem;
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.7rem;
  }
  
  /* Mobile adjustments */
  @media (max-width: 640px) {
    .fan-container {
      min-height: 420px;
      padding: 20px 0;
    }
    
    .fan-deck {
      width: 240px;
      height: 340px;
    }
    
    .nav-arrow {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
    }
    
    .nav-arrow svg {
      width: 20px;
      height: 20px;
    }
    
    .nav-prev {
      left: 8px;
    }
    
    .nav-next {
      right: 8px;
    }
    
    .fan-controls {
      padding: 0 0.5rem;
      gap: 0.5rem;
    }
    
    .progress-bar-container {
      height: 3px;
    }
    
    .fan-indicator {
      gap: 0.75rem;
    }
    
    .fan-position {
      font-size: 0.875rem;
    }
    
    .fan-position strong {
      font-size: 1rem;
    }
    
    .fan-dots {
      gap: 0.3rem;
    }
    
    .dot {
      width: 8px;
      height: 8px;
    }
    
    /* Hide keyboard hints on mobile */
    .keyboard-hints {
      display: none;
    }
  }
  
  /* Desktop - larger fan with better spacing */
  @media (min-width: 1024px) {
    .fan-container {
      min-height: 550px;
      padding: 30px 0;
    }
    
    .fan-deck {
      width: 320px;
      height: 450px;
    }
    
    .nav-arrow {
      width: 56px;
      height: 56px;
    }
    
    .nav-arrow svg {
      width: 28px;
      height: 28px;
    }
    
    .nav-prev {
      left: 20px;
    }
    
    .nav-next {
      right: 20px;
    }
    
    .fan-controls {
      max-width: 500px;
    }
    
    .progress-bar-container {
      height: 5px;
    }
    
    .dot {
      width: 12px;
      height: 12px;
    }
  }
  
  /* Large desktop */
  @media (min-width: 1440px) {
    .fan-container {
      min-height: 620px;
    }
    
    .fan-deck {
      width: 360px;
      height: 500px;
    }
    
    .nav-prev {
      left: 40px;
    }
    
    .nav-next {
      right: 40px;
    }
  }
</style>
