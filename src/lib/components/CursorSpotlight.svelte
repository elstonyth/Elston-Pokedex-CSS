<script>
  import { onMount } from 'svelte';
  
  let mouseX = 50;
  let mouseY = 50;
  let isActive = false;
  let idleTimeout;
  let rafId = null;
  let isAnimating = false;

  const lerp = (start, end, factor) => start + (end - start) * factor;
  
  let currentX = 50;
  let currentY = 50;

  const updatePosition = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;
    isActive = true;
    
    // Start animation loop if not already running
    if (!isAnimating) {
      isAnimating = true;
      animate();
    }
    
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      isActive = false;
      // Stop animation after idle - saves CPU
      stopAnimation();
    }, 2000);
  };

  const animate = () => {
    if (!isAnimating) return;
    
    currentX = lerp(currentX, mouseX, 0.1);
    currentY = lerp(currentY, mouseY, 0.1);
    
    // Stop if close enough to target (optimization)
    const dx = Math.abs(currentX - mouseX);
    const dy = Math.abs(currentY - mouseY);
    if (dx < 0.01 && dy < 0.01 && !isActive) {
      stopAnimation();
      return;
    }
    
    rafId = requestAnimationFrame(animate);
  };
  
  const stopAnimation = () => {
    isAnimating = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  onMount(() => {
    window.addEventListener('mousemove', updatePosition, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      clearTimeout(idleTimeout);
      stopAnimation();
    };
  });
</script>

<div 
  class="cursor-spotlight" 
  class:active={isActive}
  style="--mouse-x: {currentX}%; --mouse-y: {currentY}%"
></div>

<style>
  .cursor-spotlight {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 4;
    opacity: 0;
    transition: opacity 0.5s ease;
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(0, 240, 255, 0.08) 0%,
      rgba(178, 75, 243, 0.04) 30%,
      transparent 60%
    );
    mix-blend-mode: screen;
    /* GPU optimization */
    contain: strict;
    backface-visibility: hidden;
  }

  .cursor-spotlight.active {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .cursor-spotlight {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .cursor-spotlight {
      display: none;
    }
  }
</style>
