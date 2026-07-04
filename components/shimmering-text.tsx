"use client"

import * as React from "react"
import type { Variants } from "motion/react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type ShimmeringTextProps = Omit<
  React.ComponentProps<typeof motion.span>,
  "children"
> & {
  /** The text to render with the shimmering effect. */
  text: string
  /**
   * Duration in seconds for one shimmer cycle.
   * @defaultValue 1 */
  duration?: number
  /**
   * Whether the shimmer animation is paused.
   * @defaultValue false */
  isStopped?: boolean
}

export function ShimmeringText({
  text,
  duration = 1,
  isStopped = false,
  className,
  ...props
}: ShimmeringTextProps) {
  const prefersReducedMotion = useReducedMotion()

  // Pause the loop while the tab is hidden so we don't repaint color forever
  // in the background, and freeze it entirely for reduced-motion users.
  const [tabHidden, setTabHidden] = React.useState(false)
  React.useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden)
    onVisibility()
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  const stopped = isStopped || prefersReducedMotion || tabHidden

  const createCharVariants = React.useCallback(
    (charIndex: number): Variants => ({
      running: {
        color: ["var(--color)", "var(--shimmering-color)", "var(--color)"],
        transition: {
          duration,
          repeat: Infinity,
          repeatType: "loop" as const,
          repeatDelay: text.length * 0.05,
          delay: (charIndex * duration) / text.length,
          ease: "easeInOut",
        },
      },
      stopped: {
        color: "var(--color)",
        transition: {
          duration: duration * 0.5,
          ease: "easeOut",
        },
      },
    }),
    [duration, text.length]
  )

  return (
    <motion.span
      className={cn(
        "inline-block select-none",
        "[--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]",
        className
      )}
      {...props}
    >
      {text?.split("")?.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial="stopped"
          animate={stopped ? "stopped" : "running"}
          variants={createCharVariants(i)}
          aria-hidden
        >
          {char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  )
}
