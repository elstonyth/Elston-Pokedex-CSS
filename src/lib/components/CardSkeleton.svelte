<div class="card-skeleton">
  <div class="skeleton-image"></div>
  <div class="skeleton-content">
    <div class="skeleton-line skeleton-title"></div>
    <div class="skeleton-line skeleton-subtitle"></div>
    <div class="skeleton-line skeleton-text"></div>
  </div>
</div>

<style>
  .card-skeleton {
    width: 100%;
    max-width: 330px;
    aspect-ratio: 660 / 921;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
  }

  .card-skeleton::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    animation: shimmer 2s infinite;
    /* Use transform instead of left for 60fps performance */
    will-change: transform;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .skeleton-image {
    width: 100%;
    height: 70%;
    background: rgba(255, 255, 255, 0.03);
  }

  .skeleton-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skeleton-line {
    height: 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 6px;
  }

  .skeleton-title {
    width: 60%;
    height: 16px;
  }

  .skeleton-subtitle {
    width: 40%;
  }

  .skeleton-text {
    width: 80%;
  }

  @media (prefers-reduced-motion: reduce) {
    .card-skeleton::before {
      animation: none;
    }
  }
</style>
