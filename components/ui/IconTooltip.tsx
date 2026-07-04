"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function IconTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            style={{ x: "-50%" }}
            className="pointer-events-none absolute -top-9 left-1/2 z-50 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-800 shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
