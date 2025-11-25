<script>
  import { darkMode, toggleDarkMode } from '../stores/ui.js';
  import { scale } from 'svelte/transition';
</script>

<button 
  class="dark-mode-toggle"
  on:click={toggleDarkMode}
  aria-label={$darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  title={$darkMode ? 'Light mode' : 'Dark mode'}
>
  {#key $darkMode}
    <span class="icon" transition:scale={{ duration: 200 }}>
      {$darkMode ? '🌙' : '☀️'}
    </span>
  {/key}
</button>

<style>
  .dark-mode-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s var(--ease-smooth);
    position: relative;
    overflow: hidden;
  }
  
  .dark-mode-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 200, 50, 0.2);
  }
  
  .icon {
    font-size: 1.25rem;
    display: block;
  }
</style>
