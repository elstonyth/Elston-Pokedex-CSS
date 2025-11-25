<script>
  import { fly, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { mobileDrawer } from '../stores/ui.js';
  
  export let title = 'Filters';
  
  const dispatch = createEventDispatcher();
  
  function close() {
    mobileDrawer.set(false);
    dispatch('close');
  }
  
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) close();
  }
  
  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $mobileDrawer}
  <div class="drawer-backdrop" on:click={handleBackdrop} on:keydown={handleKeydown} 
       transition:fade={{ duration: 200 }} role="dialog" aria-modal="true">
    <div class="drawer" transition:fly={{ y: 300, duration: 300 }}>
      <header class="drawer-header">
        <h3>{title}</h3>
        <button class="close-btn" on:click={close} aria-label="Close">×</button>
      </header>
      
      <div class="drawer-content">
        <slot />
      </div>
      
      <footer class="drawer-footer">
        <slot name="footer">
          <button class="apply-btn" on:click={close}>Apply Filters</button>
        </slot>
      </footer>
    </div>
  </div>
{/if}

<style>
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: flex;
    align-items: flex-end;
  }
  
  .drawer {
    width: 100%;
    max-height: 85vh;
    background: rgba(20, 28, 58, 0.98);
    backdrop-filter: blur(20px);
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .drawer::before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--glass-border);
  }
  
  .drawer-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
  }
  
  .close-btn {
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    font-size: 1.25rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .close-btn:hover {
    background: rgba(255, 100, 100, 0.2);
  }
  
  .drawer-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  
  .drawer-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--glass-border);
  }
  
  .apply-btn {
    width: 100%;
    padding: 0.9rem;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
    border: none;
    border-radius: 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .apply-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0, 240, 255, 0.3);
  }
</style>
