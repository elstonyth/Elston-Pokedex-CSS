<script>
  import { onMount } from 'svelte';
  
  let isVisible = false;

  const checkScroll = () => {
    isVisible = window.scrollY > 500;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  onMount(() => {
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  });
</script>

<button 
  class="back-to-top" 
  class:visible={isVisible}
  on:click={scrollToTop}
  aria-label="Back to top"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
</button>

<style>
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    color: var(--neon-cyan);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    transition: all 0.4s var(--ease-fluid);
    pointer-events: none;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .back-to-top.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: all;
  }

  .back-to-top:hover {
    background: rgba(0, 240, 255, 0.15);
    border-color: var(--neon-cyan);
    box-shadow: 
      0 0 30px var(--glow-cyan),
      0 8px 32px rgba(0, 0, 0, 0.4);
    transform: translateY(-4px) scale(1.05);
  }

  .back-to-top:active {
    transform: translateY(-2px) scale(0.98);
  }

  .back-to-top svg {
    filter: drop-shadow(0 0 8px var(--glow-cyan));
  }

  @media (max-width: 768px) {
    .back-to-top {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 48px;
      height: 48px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .back-to-top {
      transition: opacity 0.3s ease;
    }
  }
</style>
