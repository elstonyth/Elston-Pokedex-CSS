<script>
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  
  export let query = '';
  export let type = 'no-results'; // 'no-results', 'error', 'empty'
  
  const dispatch = createEventDispatcher();
  
  const messages = {
    'no-results': {
      icon: '🔍',
      title: 'No cards found',
      description: `We couldn't find any cards matching "${query}"`,
      action: 'Clear search'
    },
    'error': {
      icon: '⚠️',
      title: 'Something went wrong',
      description: 'Failed to load cards. Please try again.',
      action: 'Retry'
    },
    'empty': {
      icon: '📦',
      title: 'No cards yet',
      description: 'Start by searching for your favorite Pokemon!',
      action: null
    }
  };
  
  $: content = messages[type] || messages['no-results'];
  
  function handleAction() {
    dispatch('action', type);
  }
</script>

<div class="empty-state" in:fade={{ duration: 300 }} out:fade={{ duration: 150 }}>
  <div class="empty-content" in:scale={{ duration: 400, delay: 100, start: 0.9 }}>
    <div class="empty-icon">{content.icon}</div>
    <h3 class="empty-title">{content.title}</h3>
    <p class="empty-description">
      {#if type === 'no-results' && query}
        We couldn't find any cards matching "<strong>{query}</strong>"
      {:else}
        {content.description}
      {/if}
    </p>
    
    {#if content.action}
      <button class="empty-action" on:click={handleAction}>
        {content.action}
      </button>
    {/if}
    
    {#if type === 'no-results'}
      <div class="suggestions">
        <span class="suggestions-label">Try searching for:</span>
        <div class="suggestion-chips">
          <button on:click={() => dispatch('suggest', 'Pikachu')}>Pikachu</button>
          <button on:click={() => dispatch('suggest', 'Charizard')}>Charizard</button>
          <button on:click={() => dispatch('suggest', 'fire')}>Fire type</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 2rem;
    min-height: 400px;
  }
  
  .empty-content {
    text-align: center;
    max-width: 400px;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .empty-title {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
  }
  
  .empty-description {
    margin: 0 0 1.5rem;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }
  
  .empty-description strong {
    color: var(--neon-cyan);
  }
  
  .empty-action {
    padding: 0.75rem 2rem;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
    border: none;
    border-radius: 999px;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.3s var(--ease-smooth);
    box-shadow: 0 4px 20px rgba(0, 240, 255, 0.3);
  }
  
  .empty-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0, 240, 255, 0.4);
  }
  
  .suggestions {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--glass-border);
  }
  
  .suggestions-label {
    display: block;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0.75rem;
  }
  
  .suggestion-chips {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .suggestion-chips button {
    padding: 0.4rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    font-family: inherit;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .suggestion-chips button:hover {
    background: rgba(0, 240, 255, 0.1);
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
  }
</style>
