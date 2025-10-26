"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/lib/hooks/useScrollAnimation";
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleUp,
  blurSlideUp,
  slideInUp,
  withReducedMotion,
} from "@/lib/animation-presets";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?:
    | "fadeUp"
    | "fadeDown"
    | "fadeLeft"
    | "fadeRight"
    | "scale"
    | "blur"
    | "slide"
    | Variants;
  threshold?: number;
  once?: boolean; // Animate only once
} & React.ComponentPropsWithoutRef<typeof motion.div>;

const animationPresets = {
  fadeUp: fadeInUp,
  fadeDown: fadeInDown,
  fadeLeft: fadeInLeft,
  fadeRight: fadeInRight,
  scale: scaleUp,
  blur: blurSlideUp,
  slide: slideInUp,
};

export default function Reveal({
  children,
  className,
  delay = 0,
  animation = "fadeUp",
  threshold = 0.1,
  once = true,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const { ref, isInView } = useScrollReveal({
    threshold,
    rootMargin: "0px 0px -50px 0px",
  });

  // Get the animation variants
  const variants =
    typeof animation === "string" ? animationPresets[animation] : animation;

  // Respect reduced motion preferences
  const finalVariants = withReducedMotion(variants, !!prefersReducedMotion);

  // Add delay to transition
  const variantsWithDelay = {
    ...finalVariants,
    visible: {
      ...finalVariants.visible,
      transition: {
        ...(finalVariants.visible as any).transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : once ? "hidden" : undefined}
      variants={variantsWithDelay}
      {...props}
    >
      {children}
    </motion.div>
  );
}
