/**
 * Animation Presets Library
 * Industry-standard animation configurations
 * Based on Apple's Human Interface Guidelines and Material Design
 */

import { Variants, Transition } from "framer-motion";

// ============================================================================
// EASING CURVES
// ============================================================================

export const easings = {
  // Apple's standard easing
  ease: [0.25, 0.1, 0.25, 1],

  // Material Design standard easing
  standard: [0.4, 0.0, 0.2, 1],

  // Emphasize easing (elements entering)
  emphasize: [0.0, 0.0, 0.2, 1],

  // De-emphasize easing (elements leaving)
  decelerate: [0.4, 0.0, 1, 1],

  // Sharp easing (very quick)
  sharp: [0.4, 0.0, 0.6, 1],

  // Smooth easing (very gentle)
  smooth: [0.22, 1, 0.36, 1],

  // Bounce
  bounce: [0.68, -0.55, 0.27, 1.55],

  // Elastic
  elastic: [0.68, -0.6, 0.32, 1.6],
} as const;

// ============================================================================
// DURATIONS (in seconds)
// ============================================================================

export const durations = {
  instant: 0,
  fast: 0.15,
  quick: 0.25,
  normal: 0.35,
  smooth: 0.5,
  slow: 0.75,
  verySlow: 1,
} as const;

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.quick,
      ease: easings.decelerate,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.smooth,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.smooth,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.smooth,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.smooth,
    },
  },
};

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

export const scaleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.smooth,
      ease: easings.bounce,
    },
  },
};

export const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.emphasize,
    },
  },
};

export const scaleDown: Variants = {
  hidden: { scale: 1.05, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.decelerate,
    },
  },
};

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

export const slideInUp: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.smooth,
      ease: easings.emphasize,
    },
  },
};

export const slideInDown: Variants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.smooth,
      ease: easings.emphasize,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.smooth,
      ease: easings.emphasize,
    },
  },
};

export const slideInRight: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.smooth,
      ease: easings.emphasize,
    },
  },
};

// ============================================================================
// BLUR ANIMATIONS
// ============================================================================

export const blurFadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: durations.slow,
      ease: easings.smooth,
    },
  },
};

export const blurSlideUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: durations.slow,
      ease: easings.smooth,
    },
  },
};

// ============================================================================
// STAGGER CONTAINER VARIANTS
// ============================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const slowStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// HOVER/TAP/FOCUS ANIMATIONS
// ============================================================================

export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: durations.quick,
    ease: easings.emphasize,
  },
};

export const hoverLift = {
  y: -4,
  transition: {
    duration: durations.quick,
    ease: easings.emphasize,
  },
};

export const tapScale = {
  scale: 0.95,
  transition: {
    duration: durations.fast,
    ease: easings.sharp,
  },
};

export const focusRing = {
  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
  transition: {
    duration: durations.quick,
    ease: easings.standard,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a custom stagger container with specific timing
 */
export function createStaggerContainer(
  staggerDelay: number = 0.1,
  initialDelay: number = 0
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

/**
 * Create a fade animation with custom delay
 */
export function createFadeIn(delay: number = 0, y: number = 0): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.smooth,
        delay,
      },
    },
  };
}

/**
 * Create a custom transition
 */
export function createTransition(
  duration: number,
  ease: number[] | string = easings.smooth,
  delay: number = 0
): Transition {
  return {
    duration,
    ease: ease as any,
    delay,
  };
}

/**
 * Respect user's motion preferences
 */
export function withReducedMotion(
  variants: Variants,
  prefersReducedMotion: boolean
): Variants {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }
  return variants;
}
