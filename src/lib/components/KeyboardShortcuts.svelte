<script>
  import { onMount, onDestroy } from 'svelte';
  import { keyboardShortcutsEnabled, addToast } from '../stores/ui.js';
  import { searchQuery, activeFilter } from '../stores/cards.js';
  import { activeCard } from '../stores/activeCard.js';
  
  let showHelp = false;
  
  const shortcuts = [
    { key: '/', description: 'Focus search', category: 'Navigation' },
    { key: 'Escape', description: 'Close modal / Clear search', category: 'Navigation' },
    { key: 'g h', description: 'Go to top', category: 'Navigation' },
    { key: '?', description: 'Show keyboard shortcuts', category: 'Help' },
    { key: 'j / k', description: 'Navigate cards (when focused)', category: 'Cards' },
    { key: 'f', description: 'Toggle favorite (when card selected)', category: 'Cards' },
    { key: 'Enter', description: 'Open card lightbox', category: 'Cards' },
    { key: 'r', description: 'Random card', category: 'Fun' },
  ];
  
  let lastKey = '';
  let lastKeyTime = 0;
  
  function handleKeyDown(event) {
    if (!$keyboardShortcutsEnabled) return;
    
    // Don't trigger shortcuts when typing in inputs
    const target = event.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      // Only handle Escape in inputs
      if (event.key === 'Escape') {
        target.blur();
        searchQuery.set('');
        activeFilter.set('');
      }
      return;
    }
    
    const now = Date.now();
    const key = event.key.toLowerCase();
    
    // Check for two-key combos (e.g., "g h")
    if (now - lastKeyTime < 500) {
      const combo = `${lastKey} ${key}`;
      if (combo === 'g h') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        lastKey = '';
        return;
      }
    }
    
    lastKey = key;
    lastKeyTime = now;
    
    switch (event.key) {
      case '/':
        event.preventDefault();
        /** @type {HTMLInputElement | null} */
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        if (showHelp) {
          showHelp = false;
        } else if ($activeCard) {
          activeCard.set(undefined);
        } else {
          searchQuery.set('');
          activeFilter.set('');
        }
        break;
        
      case '?':
        event.preventDefault();
        showHelp = !showHelp;
        break;
        
      case 'r':
        event.preventDefault();
        triggerRandomCard();
        break;
        
      case 'f':
        // Favorite toggle handled by card component
        break;
    }
  }
  
  function triggerRandomCard() {
    const event = new CustomEvent('randomCard');
    window.dispatchEvent(event);
    addToast('🎲 Random card selected!', 'info', 2000);
  }
  
  function closeHelp() {
    showHelp = false;
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
</script>

{#if showHelp}
  <div 
    class="shortcuts-overlay" 
    on:click={closeHelp}
    on:keydown={(e) => e.key === 'Escape' && closeHelp()}
    role="button"
    tabindex="-1"
  >
    <div class="shortcuts-modal" on:click|stopPropagation on:keydown|stopPropagation role="dialog" aria-label="Keyboard shortcuts" aria-modal="true">
      <header>
        <h2>⌨️ Keyboard Shortcuts</h2>
        <button class="close-btn" on:click={closeHelp} aria-label="Close">×</button>
      </header>
      
      <div class="shortcuts-content">
        {#each ['Navigation', 'Cards', 'Help', 'Fun'] as category}
          <div class="shortcut-category">
            <h3>{category}</h3>
            <ul>
              {#each shortcuts.filter(s => s.category === category) as shortcut}
                <li>
                  <kbd>{shortcut.key}</kbd>
                  <span>{shortcut.description}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
      
      <footer>
        <p>Press <kbd>?</kbd> to toggle this panel</p>
      </footer>
    </div>
  </div>
{/if}

<style>
  .shortcuts-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.2s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .shortcuts-modal {
    background: rgba(30, 39, 73, 0.98);
    border: 1px solid var(--glass-border);
    border-radius: 1.5rem;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s var(--ease-fluid);
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--glass-border);
  }
  
  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0.25rem;
    line-height: 1;
    transition: all 0.2s;
  }
  
  .close-btn:hover {
    color: white;
    transform: scale(1.1);
  }
  
  .shortcuts-content {
    padding: 1.5rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .shortcut-category h3 {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--neon-cyan);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  kbd {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--glass-border);
    border-radius: 0.375rem;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
    font-size: 0.75rem;
    color: var(--neon-cyan);
    min-width: 1.5rem;
    text-align: center;
  }
  
  footer {
    padding: 1rem 2rem;
    border-top: 1px solid var(--glass-border);
    text-align: center;
  }
  
  footer p {
    margin: 0;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }
  
  footer kbd {
    font-size: 0.7rem;
    padding: 0.15rem 0.35rem;
  }
  
  @media (max-width: 600px) {
    .shortcuts-modal {
      max-height: 90vh;
    }
    
    .shortcuts-content {
      grid-template-columns: 1fr;
      padding: 1rem 1.5rem;
    }
    
    header, footer {
      padding: 1rem 1.5rem;
    }
  }
</style>
