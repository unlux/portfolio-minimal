"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type ScrollTarget = string | number | HTMLElement;
type ScrollToOptions = Parameters<Lenis["scrollTo"]>[1];

type LenisContextType = {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: ScrollToOptions) => void;
  scrollDirection: "up" | "down" | null;
};

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  scrollDirection: null,
});

export const useLenis = () => useContext(LenisContext);

type LenisProviderProps = {
  children: React.ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      lerp: 0.1, // Smooth but responsive
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Track scroll direction
    let lastScrollY = 0;
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const direction = scroll > lastScrollY ? "down" : "up";
      setScrollDirection((current) =>
        current === direction ? current : direction
      );
      lastScrollY = scroll;
    });

    // Sync with Framer Motion and other animation libraries
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const element = document.querySelector(href);
          if (element instanceof HTMLElement) {
            lenis.scrollTo(element, {
              offset: -80, // Offset for fixed headers
              duration: 1.5,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const scrollTo = (target: ScrollTarget, options?: ScrollToOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  return (
    <LenisContext.Provider
      value={{ lenis: lenisInstance, scrollTo, scrollDirection }}
    >
      {children}
    </LenisContext.Provider>
  );
}
