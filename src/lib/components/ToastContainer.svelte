<script>
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { toasts, removeToast } from '../stores/ui.js';
</script>

<div class="toast-container" aria-live="polite" aria-atomic="true">
  {#each $toasts as toast (toast.id)}
    <div 
      class="toast {toast.type}"
      animate:flip={{ duration: 300 }}
      in:fly={{ x: 100, duration: 300 }}
      out:fade={{ duration: 200 }}
      role="alert"
    >
      <span class="toast-icon">
        {#if toast.type === 'success'}✓
        {:else if toast.type === 'error'}✕
        {:else if toast.type === 'warning'}⚠
        {:else}ℹ
        {/if}
      </span>
      <span class="toast-message">{toast.message}</span>
      <button 
        class="toast-close" 
        on:click={() => removeToast(toast.id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    pointer-events: none;
    /* GPU optimization */
    contain: layout style;
  }
  
  .toast {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: rgba(30, 39, 73, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    pointer-events: auto;
    max-width: 400px;
  }
  
  .toast.success {
    border-color: rgba(0, 255, 136, 0.4);
    background: rgba(0, 255, 136, 0.1);
  }
  
  .toast.error {
    border-color: rgba(255, 100, 100, 0.4);
    background: rgba(255, 100, 100, 0.1);
  }
  
  .toast.warning {
    border-color: rgba(255, 200, 50, 0.4);
    background: rgba(255, 200, 50, 0.1);
  }
  
  .toast.info {
    border-color: rgba(0, 240, 255, 0.4);
    background: rgba(0, 240, 255, 0.1);
  }
  
  .toast-icon {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .toast.success .toast-icon { color: #00ff88; }
  .toast.error .toast-icon { color: #ff6464; }
  .toast.warning .toast-icon { color: #ffc832; }
  .toast.info .toast-icon { color: var(--neon-cyan); }
  
  .toast-message {
    flex: 1;
    line-height: 1.4;
  }
  
  .toast-close {
    padding: 0.25rem;
    background: transparent;
    border: none;
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s;
    line-height: 1;
  }
  
  .toast-close:hover {
    color: white;
    transform: scale(1.1);
  }
  
  @media (max-width: 600px) {
    .toast-container {
      left: 1rem;
      right: 1rem;
      bottom: 1rem;
    }
    
    .toast {
      max-width: none;
    }
  }
</style>
