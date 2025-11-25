<script>
  import { onMount } from 'svelte';
  
  let scrollProgress = 0;
  let isVisible = false;

  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    const scrollableHeight = documentHeight - windowHeight;
    const progress = (scrollTop / scrollableHeight) * 100;
    
    scrollProgress = Math.min(Math.max(progress, 0), 100);
    isVisible = scrollTop > 100;
  };

  onMount(() => {
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  });
</script>

<div class="scroll-progress" class:visible={isVisible} style="--progress: {scrollProgress}%">
  <div class="progress-bar"></div>
  <div class="progress-glow"></div>
</div>

<style>
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s var(--ease-smooth);
    pointer-events: none;
  }

  .scroll-progress.visible {
    opacity: 1;
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress);
    background: linear-gradient(
      90deg,
      var(--neon-cyan) 0%,
      var(--neon-violet) 50%,
      var(--plasma-blue) 100%
    );
    transition: width 0.1s ease-out;
  }

  .progress-glow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress);
    background: linear-gradient(
      90deg,
      var(--neon-cyan) 0%,
      var(--neon-violet) 50%,
      var(--plasma-blue) 100%
    );
    filter: blur(8px);
    opacity: 0.6;
    transition: width 0.1s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-bar,
    .progress-glow {
      transition: none;
    }
  }
</style>
