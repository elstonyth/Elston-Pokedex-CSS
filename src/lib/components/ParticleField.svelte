<script>
  export let layer = 1; // 1, 2, or 3 for different depths
</script>

<div class="particle-field" data-layer={layer}>
  <div class="particles"></div>
</div>

<style>
  .particle-field {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .particle-field[data-layer="1"] {
    z-index: 1;
  }

  .particle-field[data-layer="2"] {
    z-index: 2;
  }

  .particle-field[data-layer="3"] {
    z-index: 3;
  }

  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  /* Generate particles using box-shadow */
  .particle-field[data-layer="1"] .particles {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow:
      10vw 20vh 0 0 rgba(0, 240, 255, 0.15),
      85vw 15vh 0 0 rgba(0, 240, 255, 0.12),
      25vw 60vh 0 0 rgba(178, 75, 243, 0.1),
      70vw 80vh 0 0 rgba(77, 124, 255, 0.13),
      40vw 35vh 0 0 rgba(0, 240, 255, 0.11),
      90vw 50vh 0 0 rgba(178, 75, 243, 0.14),
      15vw 75vh 0 0 rgba(77, 124, 255, 0.12),
      60vw 25vh 0 0 rgba(0, 240, 255, 0.1),
      30vw 90vh 0 0 rgba(178, 75, 243, 0.13),
      80vw 40vh 0 0 rgba(77, 124, 255, 0.11),
      5vw 55vh 0 0 rgba(0, 240, 255, 0.14),
      95vw 70vh 0 0 rgba(178, 75, 243, 0.12),
      45vw 10vh 0 0 rgba(77, 124, 255, 0.1),
      65vw 85vh 0 0 rgba(0, 240, 255, 0.13),
      20vw 45vh 0 0 rgba(178, 75, 243, 0.11);
    animation: particleFloat1 25s linear infinite;
  }

  .particle-field[data-layer="2"] .particles {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    box-shadow:
      15vw 30vh 0 0 rgba(0, 240, 255, 0.2),
      75vw 20vh 0 0 rgba(178, 75, 243, 0.18),
      35vw 65vh 0 0 rgba(77, 124, 255, 0.16),
      80vw 75vh 0 0 rgba(0, 240, 255, 0.19),
      50vw 40vh 0 0 rgba(178, 75, 243, 0.17),
      85vw 55vh 0 0 rgba(77, 124, 255, 0.2),
      25vw 80vh 0 0 rgba(0, 240, 255, 0.18),
      70vw 30vh 0 0 rgba(178, 75, 243, 0.16),
      40vw 95vh 0 0 rgba(77, 124, 255, 0.19),
      90vw 45vh 0 0 rgba(0, 240, 255, 0.17),
      10vw 60vh 0 0 rgba(178, 75, 243, 0.2);
    animation: particleFloat2 30s linear infinite;
  }

  .particle-field[data-layer="3"] .particles {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow:
      20vw 25vh 0 0 rgba(0, 240, 255, 0.25),
      65vw 35vh 0 0 rgba(178, 75, 243, 0.23),
      45vw 70vh 0 0 rgba(77, 124, 255, 0.22),
      75vw 60vh 0 0 rgba(0, 240, 255, 0.24),
      30vw 50vh 0 0 rgba(178, 75, 243, 0.23),
      85vw 15vh 0 0 rgba(77, 124, 255, 0.25),
      55vw 85vh 0 0 rgba(0, 240, 255, 0.22),
      10vw 40vh 0 0 rgba(178, 75, 243, 0.24);
    animation: particleFloat3 20s linear infinite;
  }

  @keyframes particleFloat1 {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(10vw);
      opacity: 0;
    }
  }

  @keyframes particleFloat2 {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(-10vw);
      opacity: 0;
    }
  }

  @keyframes particleFloat3 {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(5vw);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .particles {
      animation: none !important;
    }
  }

  @media (max-width: 768px) {
    /* Reduce particles on mobile */
    .particle-field[data-layer="2"],
    .particle-field[data-layer="3"] {
      display: none;
    }
  }
</style>
