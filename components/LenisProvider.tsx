"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type LenisContextType = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
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
      smoothTouch: false, // Better for mobile - native touch is smoother
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      lerp: 0.1, // Smooth but responsive
    });

    lenisRef.current = lenis;

    // Track scroll direction
    let lastScrollY = 0;
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const direction = scroll > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      lastScrollY = scroll;
    });

    // Sync with Framer Motion and other animation libraries
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const element = document.querySelector(href);
          if (element) {
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
      lenis.destroy();
      lenisRef.current = null;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: any
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  return (
    <LenisContext.Provider
      value={{ lenis: lenisRef.current, scrollTo, scrollDirection }}
    >
      {children}
    </LenisContext.Provider>
  );
}
