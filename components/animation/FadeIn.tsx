"use client";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
} & React.ComponentPropsWithoutRef<"div">;

const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, className, delay = 0, y = 10, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          y: prefersReducedMotion ? 0 : y,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

FadeIn.displayName = "FadeIn";

export default FadeIn;
