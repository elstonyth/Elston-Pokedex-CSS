<script>
  export let text = '';
  export let showParticles = true;
</script>

<div class="section-divider">
  <div class="divider-line"></div>
  <div class="divider-glow"></div>
  {#if showParticles}
    <div class="divider-particles">
      <span class="particle"></span>
      <span class="particle"></span>
      <span class="particle"></span>
    </div>
  {/if}
  {#if text}
    <span class="divider-text">{text}</span>
  {/if}
</div>

<style>
  .section-divider {
    position: relative;
    width: 100%;
    height: 2px;
    margin: 4rem auto;
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divider-line {
    position: absolute;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--neon-cyan) 20%,
      var(--neon-violet) 50%,
      var(--neon-cyan) 80%,
      transparent 100%
    );
    opacity: 0.5;
  }

  .divider-glow {
    position: absolute;
    width: 100%;
    height: 20px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--glow-cyan) 30%,
      var(--glow-violet) 50%,
      var(--glow-cyan) 70%,
      transparent 100%
    );
    filter: blur(10px);
    opacity: 0.6;
    animation: glowPulse 3s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.4;
      transform: scaleY(1);
    }
    50% {
      opacity: 0.8;
      transform: scaleY(1.5);
    }
  }

  .divider-particles {
    position: absolute;
    width: 100%;
    height: 40px;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: var(--neon-cyan);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--glow-cyan);
    animation: particleMove 4s ease-in-out infinite;
  }

  .particle:nth-child(1) {
    left: 20%;
    animation-delay: 0s;
  }

  .particle:nth-child(2) {
    left: 50%;
    animation-delay: 1.3s;
  }

  .particle:nth-child(3) {
    left: 80%;
    animation-delay: 2.6s;
  }

  @keyframes particleMove {
    0%, 100% {
      transform: translateX(-20px) translateY(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateX(20px) translateY(0);
      opacity: 0;
    }
  }

  .divider-text {
    position: relative;
    z-index: 1;
    background: var(--void-deep);
    padding: 0 1.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--neon-cyan);
    text-shadow: 0 0 10px var(--glow-cyan);
  }

  @media (prefers-reduced-motion: reduce) {
    .divider-glow,
    .particle {
      animation: none;
    }
  }

  @media (max-width: 768px) {
    .section-divider {
      margin: 3rem auto;
    }
    
    .divider-particles {
      display: none;
    }
  }
</style>
