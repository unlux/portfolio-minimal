"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue, useSpring } from "framer-motion";

/**
 * Hook for scroll-triggered reveal animations
 * Uses Intersection Observer for performance
 */
export function useScrollReveal(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Optionally keep observing for re-trigger
          // observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

/**
 * Hook for parallax scroll effects
 * Returns a motion value that changes based on scroll position
 */
export function useParallax(distance: number = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const ySmooth = useSpring(y, { stiffness: 100, damping: 30 });

  return { ref, y: ySmooth };
}

/**
 * Hook for scroll-based scale effects
 */
export function useScrollScale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return { ref, scale, opacity };
}

/**
 * Hook for scroll progress (0-1)
 * Useful for progress bars, animations based on page scroll
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}

/**
 * Hook for directional scroll animations
 * Returns scroll direction and progress
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [lastY, setLastY] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > lastY) {
        setDirection("down");
      } else if (latest < lastY) {
        setDirection("up");
      }
      setLastY(latest);
    });
  }, [scrollY, lastY]);

  return { direction, scrollY };
}

/**
 * Hook for sticky scroll effects
 * Element sticks and animates while parent is in view
 */
export function useScrollSticky() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.95]);

  return { ref, progress: scrollYProgress, opacity, scale };
}

/**
 * Hook for rotating elements on scroll
 */
export function useScrollRotate(rotationAmount: number = 360) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotationAmount]
  );

  return { ref, rotate };
}

/**
 * Hook for horizontal scroll effects
 */
export function useScrollHorizontal(distance: number = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return { ref, x };
}

/**
 * Hook for scroll-triggered counter
 * Counts up when element comes into view
 */
export function useScrollCounter(
  end: number,
  duration: number = 2000
) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * (end - startValue) + startValue);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return { ref, count };
}

/**
 * Hook for scroll-based blur effects
 */
export function useScrollBlur(maxBlur: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [maxBlur, 0, maxBlur]
  );

  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return { ref, filter };
}
