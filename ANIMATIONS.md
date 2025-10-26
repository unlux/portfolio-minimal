# Animation System Documentation

Your portfolio now has a comprehensive, industry-standard animation system built on Framer Motion.

## 🎨 Philosophy

Based on industry leaders:
- **Apple's Human Interface Guidelines** - Natural, fluid motions
- **Material Design** - Meaningful transitions
- **Framer** - Advanced micro-interactions

### Core Principles
1. **Purposeful** - Every animation has a reason
2. **Performant** - GPU-accelerated, 60fps
3. **Accessible** - Respects `prefers-reduced-motion`
4. **Consistent** - Unified timing and easing

---

## 📚 Library Overview

### 1. Animation Presets (`lib/animation-presets.ts`)

Pre-built animation variants for consistent effects across your site.

#### Easing Curves
```tsx
import { easings } from "@/lib/animation-presets";

easings.smooth    // [0.22, 1, 0.36, 1] - Apple's standard
easings.standard  // [0.4, 0.0, 0.2, 1] - Material Design
easings.bounce    // Spring-like effect
easings.elastic   // Overshoot effect
```

#### Durations
```tsx
import { durations } from "@/lib/animation-presets";

durations.instant   // 0s
durations.fast      // 0.15s
durations.quick     // 0.25s
durations.normal    // 0.35s
durations.smooth    // 0.5s
durations.slow      // 0.75s
```

#### Fade Animations
```tsx
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight } from "@/lib/animation-presets";

<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content fades in from bottom
</motion.div>
```

#### Scale Animations
```tsx
import { scaleUp, scaleDown } from "@/lib/animation-presets";

// Grows from 95% to 100%
<motion.div variants={scaleUp} initial="hidden" animate="visible">
  Scales up
</motion.div>
```

#### Blur Animations
```tsx
import { blurFadeIn, blurSlideUp } from "@/lib/animation-presets";

// Fades in with blur effect
<motion.div variants={blurFadeIn} initial="hidden" animate="visible">
  Blurs into view
</motion.div>
```

#### Stagger Containers
```tsx
import { staggerContainer } from "@/lib/animation-presets";

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
  <motion.div variants={fadeInUp}>Item 3</motion.div>
</motion.div>
```

---

## 🎯 Scroll Animation Hooks

### `useScrollReveal`
Trigger animations when element enters viewport.

```tsx
import { useScrollReveal } from "@/lib/hooks/useScrollAnimation";

function MyComponent() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref}>
      {isInView ? "Visible!" : "Hidden"}
    </div>
  );
}
```

### `useParallax`
Create parallax scroll effects.

```tsx
import { useParallax } from "@/lib/hooks/useScrollAnimation";

function Hero() {
  const { ref, y } = useParallax(100); // 100px travel distance

  return (
    <motion.div ref={ref} style={{ y }}>
      Moves slower than scroll
    </motion.div>
  );
}
```

### `useScrollCounter`
Animated number counting on scroll.

```tsx
import { useScrollCounter } from "@/lib/hooks/useScrollAnimation";

function Stats() {
  const { ref, count } = useScrollCounter(10000, 2000); // Count to 10k over 2s

  return <div ref={ref}>{count}</div>;
}
```

### Other Hooks
- `useScrollScale()` - Scale based on scroll position
- `useScrollProgress()` - Get scroll progress (0-1)
- `useScrollDirection()` - Track scroll direction
- `useScrollSticky()` - Sticky scroll effects
- `useScrollRotate()` - Rotate on scroll
- `useScrollBlur()` - Blur based on scroll

---

## 🧩 Animation Components

### Reveal
Scroll-triggered reveal animations.

```tsx
import Reveal from "@/components/animation/Reveal";

<Reveal animation="fadeUp" delay={0.2}>
  Content revealed on scroll
</Reveal>

// Available animations:
// "fadeUp", "fadeDown", "fadeLeft", "fadeRight"
// "scale", "blur", "slide"
```

**Props:**
- `animation`: Animation type or custom Variants
- `delay`: Delay in seconds
- `threshold`: Intersection threshold (0-1)
- `once`: Animate only once (default: true)

### Parallax
Parallax scroll effects.

```tsx
import Parallax from "@/components/animation/Parallax";

<Parallax speed={0.5} direction="up">
  <img src="/hero.jpg" alt="Hero" />
</Parallax>
```

**Props:**
- `speed`: Parallax multiplier (default: 1)
- `direction`: "up" | "down"

### Counter
Animated number counter.

```tsx
import Counter from "@/components/animation/Counter";

<Counter
  end={10000}
  duration={2000}
  suffix="+"
  separator=","
/>
// Displays: 10,000+
```

**Props:**
- `end`: Target number
- `start`: Starting number (default: 0)
- `duration`: Animation duration in ms
- `prefix`: Text before number
- `suffix`: Text after number
- `decimals`: Decimal places
- `separator`: Thousands separator

### MagneticButton
Button that follows cursor (magnetic effect).

```tsx
import MagneticButton from "@/components/animation/MagneticButton";

<MagneticButton strength={0.5}>
  Hover me!
</MagneticButton>
```

**Props:**
- `strength`: Magnetic pull strength (0-1)

---

## 💫 Micro-Interaction Components

### AnimatedCard
Card with hover effects.

```tsx
import AnimatedCard from "@/components/animation/AnimatedCard";

<AnimatedCard hoverEffect="lift">
  <h3>Card Title</h3>
  <p>Card content</p>
</AnimatedCard>
```

**Hover Effects:**
- `lift` - Lifts up with shadow
- `scale` - Scales up
- `glow` - Glowing border
- `none` - No effect

### AnimatedLink
Link with animated underline.

```tsx
import AnimatedLink from "@/components/animation/AnimatedLink";

<AnimatedLink href="/about" underlineColor="#3b82f6">
  About Us
</AnimatedLink>
```

### ShimmerButton
Button with shimmer effect on hover.

```tsx
import ShimmerButton from "@/components/animation/ShimmerButton";

<ShimmerButton className="px-6 py-3 bg-blue-500 text-white rounded-lg">
  Click Me
</ShimmerButton>
```

---

## 🎭 Complete Examples

### Hero Section with Stagger
```tsx
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, blurSlideUp } from "@/lib/animation-presets";

export default function Hero() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={blurSlideUp}>
        Welcome to My Portfolio
      </motion.h1>
      <motion.p variants={fadeInUp}>
        Full-stack developer & designer
      </motion.p>
      <motion.button variants={fadeInUp}>
        Get in Touch
      </motion.button>
    </motion.section>
  );
}
```

### Scroll-Triggered Stats
```tsx
import Reveal from "@/components/animation/Reveal";
import Counter from "@/components/animation/Counter";

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <Reveal animation="scale" delay={0}>
        <Counter end={500} suffix="+" />
        <p>Projects</p>
      </Reveal>
      <Reveal animation="scale" delay={0.1}>
        <Counter end={1000} suffix="+" />
        <p>Commits</p>
      </Reveal>
      <Reveal animation="scale" delay={0.2}>
        <Counter end={50} suffix="+" />
        <p>Clients</p>
      </Reveal>
    </div>
  );
}
```

### Parallax Hero
```tsx
import Parallax from "@/components/animation/Parallax";
import Reveal from "@/components/animation/Reveal";

export default function ParallaxHero() {
  return (
    <div className="relative h-screen overflow-hidden">
      <Parallax speed={0.5} direction="down">
        <img src="/bg.jpg" className="w-full h-full object-cover" />
      </Parallax>

      <div className="absolute inset-0 flex items-center justify-center">
        <Reveal animation="blur">
          <h1 className="text-6xl font-bold">Hello World</h1>
        </Reveal>
      </div>
    </div>
  );
}
```

### Interactive Cards Grid
```tsx
import AnimatedCard from "@/components/animation/AnimatedCard";
import Reveal from "@/components/animation/Reveal";

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <Reveal key={project.id} animation="fadeUp" delay={i * 0.1}>
          <AnimatedCard hoverEffect="lift">
            <img src={project.image} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </AnimatedCard>
        </Reveal>
      ))}
    </div>
  );
}
```

---

## ♿ Accessibility

All animations respect `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from "framer-motion";

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5
      }}
    />
  );
}
```

Or use the helper:
```tsx
import { withReducedMotion } from "@/lib/animation-presets";

const variants = withReducedMotion(fadeInUp, prefersReducedMotion);
```

---

## ⚡ Performance Tips

1. **Use `transform` and `opacity`** - GPU accelerated
2. **Avoid `width`, `height`, `top`, `left`** - Causes reflow
3. **Add `willChange`** for heavy animations
4. **Use `layoutId`** for shared element transitions
5. **Lazy load animations** - Only animate visible elements

---

## 🎨 Design System Integration

All animations use your design system:
- **Timing**: Based on Apple & Material guidelines
- **Easing**: Natural, physics-based curves
- **Colors**: Automatically use your theme
- **Spacing**: Consistent with your layout

---

## 📖 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Apple HIG - Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Material Design - Motion](https://m3.material.io/styles/motion)
- [Web Animation Performance](https://web.dev/animations/)
