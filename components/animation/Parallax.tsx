"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/lib/hooks/useScrollAnimation";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Multiplier for parallax effect (default: 1)
  direction?: "up" | "down"; // Direction of parallax
} & Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "style">;

export default function Parallax({
  children,
  className,
  speed = 1,
  direction = "up",
  ...props
}: ParallaxProps) {
  const distance = 100 * speed;
  const { ref, y } = useParallax(direction === "up" ? distance : -distance);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
