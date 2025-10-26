"use client";

import { motion } from "framer-motion";
import { staggerContainer, blurSlideUp } from "@/lib/animation-presets";

export function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <motion.h1
      className="mb-8 text-4xl font-semibold tracking-tighter"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={blurSlideUp}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
