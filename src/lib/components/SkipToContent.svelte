<script>
  export let targetId = 'main-content';
  
  function handleClick(e) {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  }
</script>

<a 
  href="#{targetId}" 
  class="skip-to-content"
  on:click={handleClick}
  on:keydown={handleKeyDown}
>
  Skip to content
</a>

<style>
  .skip-to-content {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 1rem 2rem;
    background: var(--neon-cyan);
    color: var(--void-deep);
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 4px 20px var(--glow-cyan);
    transition: top 0.3s var(--ease-smooth);
  }
  
  .skip-to-content:focus {
    top: 0;
    outline: none;
  }
  
  .skip-to-content:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
</style>
