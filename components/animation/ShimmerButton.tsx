"use client";

import { motion } from "framer-motion";
import { tapScale } from "@/lib/animation-presets";

type ShimmerButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

export default function ShimmerButton({
  children,
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <motion.button
      className={`relative overflow-hidden ${className || ""}`}
      whileHover="hover"
      whileTap={tapScale}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        variants={{
          hover: {
            x: ["0%", "200%"],
          },
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
