<script>
  import { onMount } from 'svelte';
  
  let mouseX = 50;
  let mouseY = 50;
  let isActive = false;
  let idleTimeout;

  const lerp = (start, end, factor) => start + (end - start) * factor;
  
  let currentX = 50;
  let currentY = 50;

  const updatePosition = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;
    isActive = true;
    
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      isActive = false;
    }, 2000);
  };

  const animate = () => {
    currentX = lerp(currentX, mouseX, 0.1);
    currentY = lerp(currentY, mouseY, 0.1);
    requestAnimationFrame(animate);
  };

  onMount(() => {
    animate();
    window.addEventListener('mousemove', updatePosition);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      clearTimeout(idleTimeout);
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
