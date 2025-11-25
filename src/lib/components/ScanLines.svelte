<div class="scanlines"></div>

<style>
  .scanlines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 240, 255, 0.02) 0px,
      transparent 1px,
      transparent 2px
    );
    animation: scanlineMove 8s linear infinite;
    opacity: 0.5;
    mix-blend-mode: overlay;
    /* Performance optimizations */
    contain: strict;
    will-change: transform;
    backface-visibility: hidden;
  }

  @keyframes scanlineMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(4px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scanlines {
      animation: none;
    }
  }

  @media (max-width: 768px) {
    .scanlines {
      /* Disable on mobile for better performance */
      display: none;
    }
  }
</style>
