<script>
  export let blur = 20;
  export let opacity = 0.08;
  export let borderGlow = false;
  export let padding = "1.5rem";
  export let borderRadius = "1rem";
</script>

<div 
  class="glass-container" 
  class:border-glow={borderGlow}
  style="
    --blur: {blur}px;
    --opacity: {opacity};
    --padding: {padding};
    --border-radius: {borderRadius};
  "
>
  <slot />
</div>

<style>
  .glass-container {
    background: rgba(255, 255, 255, var(--opacity));
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: var(--padding);
    position: relative;
    overflow: hidden;
    transition: all 0.3s var(--ease-smooth);
  }

  .glass-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    opacity: 0.5;
  }

  .glass-container.border-glow {
    border-color: var(--neon-cyan);
    box-shadow: 
      0 0 20px var(--glow-cyan),
      inset 0 0 20px rgba(0, 240, 255, 0.1);
  }

  .glass-container:hover {
    background: rgba(255, 255, 255, calc(var(--opacity) + 0.02));
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    .glass-container {
      backdrop-filter: blur(calc(var(--blur) * 0.7));
      -webkit-backdrop-filter: blur(calc(var(--blur) * 0.7));
    }
  }
</style>
