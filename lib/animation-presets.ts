/**
 * Animation Presets Library
 * Industry-standard animation configurations
 * Based on Apple's Human Interface Guidelines and Material Design
 */

import { Variants } from "motion/react";

type CubicBezier = [number, number, number, number];

// ============================================================================
// EASING CURVES
// ============================================================================

export const easings: Record<string, CubicBezier> = {
  // Emphasize easing (elements entering)
  emphasize: [0.0, 0.0, 0.2, 1],

  // Smooth easing (very gentle)
  smooth: [0.22, 1, 0.36, 1],
};

// ============================================================================
// DURATIONS (in seconds)
// Kept short per the "great animations are fast" guideline (~<300ms for UI).
// ============================================================================

export const durations = {
  fast: 0.15,
  quick: 0.25,
  normal: 0.35,
  smooth: 0.5,
} as const;

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
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
      duration: durations.normal,
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
      duration: durations.normal,
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
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

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

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

export const slideInUp: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.emphasize,
    },
  },
};

// ============================================================================
// BLUR ANIMATIONS
// ============================================================================

export const blurSlideUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: durations.smooth,
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

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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
