<script>
  import { onMount } from 'svelte';
  
  export let value = 0;
  export let duration = 2000;
  export let suffix = '';
  
  let displayValue = 0;
  let hasAnimated = false;

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animateNumber = () => {
    if (hasAnimated) return;
    hasAnimated = true;
    
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      displayValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        displayValue = endValue;
      }
    };

    animate();
  };

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumber();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector('.animated-number');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  });
</script>

<span class="animated-number">{displayValue}{suffix}</span>

<style>
  .animated-number {
    font-weight: 700;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px var(--glow-cyan);
  }
</style>
