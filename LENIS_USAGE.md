# Lenis Smooth Scroll - Usage Guide

Your portfolio now has an enhanced Lenis smooth scroll implementation with powerful features.

## Features Implemented

### ✨ Router Integration
- Automatically scrolls to top on page navigation
- Smooth transitions between routes

### ⚓ Anchor Links
- All hash links (`#section`) automatically smooth scroll
- 80px offset for fixed headers
- Just use regular anchor tags: `<a href="#about">About</a>`

### 📱 Mobile Optimizations
- Native touch scrolling on mobile (better performance)
- Optimized for touch gestures
- No jank or lag on mobile devices

### 🎯 Programmatic Control
Use the `useLenis` hook anywhere in your app:

```tsx
import { useLenis } from "@/components/LenisProvider";

function MyComponent() {
  const { scrollTo, scrollDirection, lenis } = useLenis();

  // Scroll to top
  const handleScrollToTop = () => {
    scrollTo(0, { duration: 1.5 });
  };

  // Scroll to element
  const handleScrollToSection = () => {
    scrollTo("#about", { offset: -100 });
  };

  // Use scroll direction for UI effects
  useEffect(() => {
    console.log("Scrolling:", scrollDirection); // 'up' or 'down'
  }, [scrollDirection]);

  return (
    <button onClick={handleScrollToTop}>
      Back to Top
    </button>
  );
}
```

### 🧭 Scroll Direction Detection
Perfect for hiding/showing navigation on scroll:

```tsx
function Navbar() {
  const { scrollDirection } = useLenis();

  return (
    <nav className={`
      transition-transform duration-300
      ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}
    `}>
      {/* Nav content */}
    </nav>
  );
}
```

### ⚡ Performance Optimizations
- Custom easing function for natural feel
- RAF (requestAnimationFrame) syncing
- Reduced repaints during scroll
- Disabled pointer events while scrolling
- Optimized for Framer Motion animations

### 🔄 Advanced Options

```tsx
const { scrollTo } = useLenis();

// Scroll with custom options
scrollTo("#section", {
  offset: -100,      // Pixels from target
  duration: 2,       // Seconds
  easing: (t) => t,  // Custom easing
  immediate: false,  // Skip animation
  lock: true,        // Lock user scrolling during animation
  force: true,       // Force scroll even if already at target
  onComplete: () => {
    console.log("Scroll complete!");
  }
});
```

## Configuration

Current Lenis settings (in `LenisProvider.tsx`):
- **Duration**: 1.2s
- **Lerp**: 0.1 (smooth but responsive)
- **Easing**: Custom exponential decay
- **Wheel Multiplier**: 1
- **Touch**: Native (better mobile performance)

## CSS Classes Available

```css
.lenis-smooth        /* Applied during smooth scroll */
.lenis-stopped       /* Applied when scrolling is stopped */
.lenis-scrolling     /* Applied while actively scrolling */
[data-lenis-prevent] /* Add to elements to prevent Lenis on them */
```

## Tips

1. **Prevent scroll on specific elements**:
   ```tsx
   <div data-lenis-prevent>
     {/* This section uses native scroll */}
   </div>
   ```

2. **Stop/Start scrolling programmatically**:
   ```tsx
   const { lenis } = useLenis();

   lenis?.stop();   // Stop smooth scrolling
   lenis?.start();  // Resume smooth scrolling
   ```

3. **Listen to scroll events**:
   ```tsx
   useEffect(() => {
     const { lenis } = useLenis();

     const unsubscribe = lenis?.on('scroll', ({ scroll, velocity }) => {
       console.log('Scroll position:', scroll);
       console.log('Scroll velocity:', velocity);
     });

     return () => unsubscribe?.();
   }, []);
   ```

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari/iOS Safari
- ✅ Mobile browsers
