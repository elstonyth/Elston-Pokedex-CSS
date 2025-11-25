# Color & Design System Reference

## 🎨 Color Palette

### Primary Colors
```css
--void-deep: #0a0e27      /* Main background */
--void-mid: #151b3d       /* Secondary background */
--void-light: #1e2749     /* Tertiary background */
```

### Accent Colors
```css
--neon-cyan: #00f0ff      /* Primary accent, links, focus states */
--neon-magenta: #ff00ff   /* Alternative accent */
--neon-violet: #b24bf3    /* Secondary accent, gradients */
--plasma-blue: #4d7cff    /* Tertiary accent */
```

### Glass Effects
```css
--glass-white: rgba(255, 255, 255, 0.08)    /* Glass background */
--glass-border: rgba(255, 255, 255, 0.12)   /* Glass borders */
--glow-cyan: rgba(0, 240, 255, 0.4)         /* Cyan glow effect */
--glow-violet: rgba(178, 75, 243, 0.3)      /* Violet glow effect */
```

---

## 🎭 Motion System

### Easing Curves
```css
--ease-fluid: cubic-bezier(0.23, 1, 0.32, 1)          /* Smooth, natural */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55) /* Bouncy, playful */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)           /* Material Design */
```

### Animation Durations
- **Fast:** 0.2s - 0.3s (hover states, clicks)
- **Medium:** 0.4s - 0.6s (transitions, reveals)
- **Slow:** 0.8s - 1.2s (page loads, staggered animations)
- **Background:** 20s (ambient animations)

---

## 📐 Spacing Scale

```css
/* Base unit: 0.25rem (4px) */
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.5rem    /* 24px */
--space-6: 2rem      /* 32px */
--space-8: 3rem      /* 48px */
--space-10: 4rem     /* 64px */
```

---

## 🔤 Typography

### Font Families
```css
font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Weights
- **Light:** 300 (body text, subtle elements)
- **Regular:** 400 (default body text)
- **Medium:** 500 (emphasized text, inputs)
- **Semibold:** 600 (buttons, labels)
- **Bold:** 700 (headings, important text)
- **Extrabold:** 800 (hero text, special emphasis)

### Font Sizes
```css
/* Responsive with clamp() */
--text-xs: 0.75rem      /* 12px - Small labels */
--text-sm: 0.875rem     /* 14px - Secondary text */
--text-base: 1rem       /* 16px - Body text */
--text-lg: 1.125rem     /* 18px - Large body */
--text-xl: 1.25rem      /* 20px - Small headings */
--text-2xl: 1.5rem      /* 24px - Medium headings */
--text-3xl: 2rem        /* 32px - Large headings */
--text-4xl: 3rem        /* 48px - Hero text */

/* H1 with clamp */
font-size: clamp(2rem, 5vw, 3.5rem);
```

### Letter Spacing
```css
--tracking-tight: -0.02em   /* Headings */
--tracking-normal: 0.01em   /* Body text */
--tracking-wide: 0.05em     /* Buttons */
--tracking-wider: 0.08em    /* Labels, uppercase */
```

---

## 🎨 Glassmorphism Recipe

### Standard Glass Container
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid var(--glass-border);
border-radius: 1rem;
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

### Glass with Glow (Focus/Active)
```css
background: rgba(255, 255, 255, 0.12);
border-color: var(--neon-cyan);
box-shadow:
  0 0 40px var(--glow-cyan),
  0 8px 32px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
```

### Glass Input Field
```css
background: rgba(0, 0, 0, 0.3);
border: 1px solid transparent;
border-radius: 0.75rem;
box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);

/* Focus state */
background: rgba(0, 0, 0, 0.4);
border-color: var(--neon-cyan);
box-shadow: 
  inset 0 2px 8px rgba(0, 0, 0, 0.4),
  0 0 0 2px rgba(0, 240, 255, 0.2);
```

---

## ✨ Effect Patterns

### Gradient Text
```css
background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Gradient Button
```css
background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
box-shadow: 
  0 0 30px var(--glow-cyan),
  0 8px 16px rgba(0, 240, 255, 0.3);
```

### Glow Effect
```css
box-shadow: 0 0 20px var(--glow-cyan);
text-shadow: 0 0 20px var(--glow-cyan);
filter: drop-shadow(0 0 8px var(--glow-cyan));
```

### Hover Lift
```css
transform: translateY(-8px);
transition: transform 0.4s var(--ease-fluid);
```

### Scale Feedback
```css
transform: scale(0.98);
transition: transform 0.2s var(--ease-smooth);
```

---

## 🎬 Animation Examples

### Staggered Entry
```css
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95);
    filter: blur(10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.element {
  animation: fadeIn 0.8s var(--ease-fluid) backwards;
  animation-delay: calc(var(--index) * 50ms);
}
```

### Mesh Background
```css
@keyframes meshMove {
  0%, 100% { 
    background-position: 0% 0%, 100% 100%, 50% 50%; 
  }
  33% { 
    background-position: 100% 0%, 0% 100%, 80% 20%; 
  }
  66% { 
    background-position: 0% 100%, 100% 0%, 20% 80%; 
  }
}
```

### Pokeball Bounce
```css
@keyframes pokeBounce {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media screen and (min-width: 600px) {
  /* Tablet */
}

@media screen and (min-width: 900px) {
  /* Desktop */
}

@media screen and (min-width: 1200px) {
  /* Large Desktop */
}

/* Mobile Specific */
@media screen and (max-width: 900px) {
  /* Mobile overrides */
}
```

---

## ♿ Accessibility

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States
Always include visible focus states:
```css
:focus-visible {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 2px;
}
```

---

## 🎯 Usage Guidelines

### Do's ✅
- Use glassmorphism for UI containers
- Apply glow effects on interactive elements
- Use gradient text for headings
- Implement smooth transitions (0.3s - 0.4s)
- Add hover states with transform
- Include focus states with glow
- Respect prefers-reduced-motion

### Don'ts ❌
- Don't overuse blur (max 20px)
- Don't animate too many properties at once
- Don't use transitions shorter than 0.2s
- Don't forget mobile optimization
- Don't skip accessibility features
- Don't modify Card.svelte behavior

---

## 🔧 Quick Copy-Paste

### Glass Button
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid var(--glass-border);
border-radius: 999px;
padding: 0.75rem 1.75rem;
transition: all 0.4s var(--ease-fluid);

&:hover {
  background: rgba(0, 240, 255, 0.1);
  border-color: var(--neon-cyan);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--glow-cyan);
}
```

### Glass Card
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid var(--glass-border);
border-radius: 1rem;
padding: 1.5rem;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```

### Neon Text
```css
color: var(--neon-cyan);
text-shadow: 0 0 20px var(--glow-cyan);
```

---

This design system creates a cohesive, modern, AI-First aesthetic while maintaining excellent performance and accessibility.
