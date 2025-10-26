"use client";

import { motion } from "framer-motion";
import { hoverLift, tapScale } from "@/lib/animation-presets";

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "scale" | "glow" | "none";
} & React.ComponentPropsWithoutRef<typeof motion.div>;

export default function AnimatedCard({
  children,
  className,
  hoverEffect = "lift",
  ...props
}: AnimatedCardProps) {
  const hoverEffects = {
    lift: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    scale: {
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    glow: {
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.3 },
    },
    none: {},
  };

  return (
    <motion.div
      className={className}
      whileHover={hoverEffects[hoverEffect]}
      whileTap={tapScale}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
