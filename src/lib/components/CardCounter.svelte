<script>
  import { fly, fade } from 'svelte/transition';
  
  export let displayed = 0;
  export let total = 0;
  
  $: percentage = total > 0 ? Math.round((displayed / total) * 100) : 0;
  $: isFiltered = displayed !== total;
</script>

<div class="card-counter" class:filtered={isFiltered} transition:fade={{ duration: 200 }}>
  <div class="counter-content">
    <span class="count">
      {#key displayed}
        <span class="number" in:fly={{ y: -10, duration: 300 }}>{displayed}</span>
      {/key}
      {#if isFiltered}
        <span class="separator">of</span>
        <span class="total">{total}</span>
      {/if}
    </span>
    <span class="label">cards</span>
  </div>
  
  {#if isFiltered}
    <div class="progress-bar" transition:fade={{ duration: 200 }}>
      <div class="progress-fill" style="width: {percentage}%"></div>
    </div>
  {/if}
</div>

<style>
  .card-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s var(--ease-smooth);
  }
  
  .card-counter.filtered {
    background: rgba(0, 240, 255, 0.08);
    border-color: rgba(0, 240, 255, 0.3);
  }
  
  .counter-content {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
  }
  
  .count {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
  }
  
  .number {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--neon-cyan);
    text-shadow: 0 0 20px var(--glow-cyan);
    display: inline-block;
  }
  
  .separator {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .total {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
  }
  
  .label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .progress-bar {
    width: 100%;
    height: 3px;
    background: var(--glass-white);
    border-radius: 3px;
    overflow: hidden;
    margin-top: 0.25rem;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-violet));
    border-radius: 3px;
    transition: width 0.5s var(--ease-fluid);
    box-shadow: 0 0 10px var(--glow-cyan);
  }
  
  @media (max-width: 600px) {
    .card-counter {
      padding: 0.5rem 1rem;
    }
    
    .number {
      font-size: 1.25rem;
    }
  }
</style>
