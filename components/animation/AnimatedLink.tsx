"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type AnimatedLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  underlineColor?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

export default function AnimatedLink({
  children,
  href,
  className,
  underlineColor = "currentColor",
  ...props
}: AnimatedLinkProps) {
  return (
    <Link href={href} className={`relative inline-block ${className || ""}`} {...props}>
      <motion.span
        className="relative"
        whileHover="hover"
        initial="initial"
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
          style={{ backgroundColor: underlineColor }}
          variants={{
            initial: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.span>
    </Link>
  );
}
