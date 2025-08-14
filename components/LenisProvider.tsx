"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: React.ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      // Slightly heavier smoothing and lower wheel delta to reduce jitter on fast scrolls
      lerp: 0.09,
      wheelMultiplier: 0.9,
      overscroll: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return children;
}
