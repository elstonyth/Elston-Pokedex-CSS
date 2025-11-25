<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  
  let isSpinning = false;
  
  async function handleClick() {
    if (isSpinning) return;
    
    isSpinning = true;
    dispatch('random');
    
    // Reset spin after animation
    setTimeout(() => {
      isSpinning = false;
    }, 600);
  }
</script>

<button 
  class="random-btn" 
  class:spinning={isSpinning}
  on:click={handleClick}
  title="Pick a random card (R)"
  aria-label="Pick a random card"
  transition:scale={{ duration: 200 }}
>
  <span class="dice">🎲</span>
  <span class="text">Random</span>
</button>

<style>
  .random-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    background: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s var(--ease-smooth);
  }
  
  .random-btn:hover {
    background: rgba(255, 200, 50, 0.15);
    border-color: rgba(255, 200, 50, 0.5);
    color: #ffc832;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(255, 200, 50, 0.2);
  }
  
  .random-btn:active {
    transform: translateY(0);
  }
  
  .dice {
    font-size: 1.1rem;
    transition: transform 0.6s var(--ease-bounce);
  }
  
  .random-btn.spinning .dice {
    animation: roll 0.6s ease-out;
  }
  
  @keyframes roll {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(180deg) scale(1.2); }
    50% { transform: rotate(360deg) scale(1); }
    75% { transform: rotate(540deg) scale(1.1); }
    100% { transform: rotate(720deg) scale(1); }
  }
  
  .text {
    font-weight: 600;
  }
  
  @media (max-width: 600px) {
    .text {
      display: none;
    }
    
    .random-btn {
      padding: 0.6rem;
    }
  }
</style>
