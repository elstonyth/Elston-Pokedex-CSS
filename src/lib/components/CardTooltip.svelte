<script>
  import { fade } from 'svelte/transition';
  
  /** @type {any} */
  export let card = null;
  export let x = 0;
  export let y = 0;
  export let visible = false;
  
  $: types = card?.types ? (Array.isArray(card.types) ? card.types : [card.types]) : [];
</script>

{#if visible && card}
  <div 
    class="card-tooltip"
    style="left: {x}px; top: {y}px;"
    transition:fade={{ duration: 150 }}
    role="tooltip"
  >
    <div class="tooltip-header">
      <span class="card-name">{card.name}</span>
      <span class="card-number">#{card.number}</span>
    </div>
    
    <div class="tooltip-body">
      {#if types.length > 0}
        <div class="types">
          {#each types as type}
            <span class="type-badge {type?.toLowerCase()}">{type}</span>
          {/each}
        </div>
      {/if}
      
      {#if card.rarity}
        <div class="rarity">{card.rarity}</div>
      {/if}
    </div>
    
    <div class="tooltip-footer">
      <span>Click to expand</span>
    </div>
  </div>
{/if}

<style>
  .card-tooltip {
    position: fixed;
    z-index: 9999;
    padding: 0.75rem 1rem;
    background: rgba(20, 28, 58, 0.98);
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 0.75rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    pointer-events: none;
    min-width: 180px;
    max-width: 250px;
    transform: translate(-50%, -100%) translateY(-12px);
  }
  
  .card-tooltip::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(20, 28, 58, 0.98);
  }
  
  .tooltip-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .card-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
  }
  
  .card-number {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .tooltip-body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  
  .types {
    display: flex;
    gap: 0.3rem;
  }
  
  .type-badge {
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .type-badge.fire { background: rgba(255,100,50,0.3); color: #ff8844; }
  .type-badge.water { background: rgba(50,150,255,0.3); color: #44aaff; }
  .type-badge.grass { background: rgba(100,200,100,0.3); color: #66cc66; }
  .type-badge.lightning { background: rgba(255,200,50,0.3); color: #ffcc44; }
  .type-badge.psychic { background: rgba(200,100,200,0.3); color: #cc88cc; }
  .type-badge.fighting { background: rgba(180,120,80,0.3); color: #bb8855; }
  .type-badge.darkness { background: rgba(80,80,100,0.3); color: #8888aa; }
  .type-badge.metal { background: rgba(150,150,170,0.3); color: #aaaacc; }
  .type-badge.dragon { background: rgba(100,80,150,0.3); color: #8866bb; }
  .type-badge.fairy { background: rgba(255,150,200,0.3); color: #ff99cc; }
  .type-badge.colorless { background: rgba(200,200,200,0.3); color: #ccc; }
  
  .rarity {
    font-size: 0.75rem;
    color: var(--neon-violet);
  }
  
  .tooltip-footer {
    margin-top: 0.5rem;
    padding-top: 0.4rem;
    border-top: 1px solid var(--glass-border);
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }
</style>
