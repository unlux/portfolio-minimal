"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Keeps the browser-chrome color in step with the class-based theme toggle;
 * a static <meta name="theme-color"> can only follow the OS preference.
 */
export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = resolvedTheme === "dark" ? "#000000" : "#ffffff";
  }, [resolvedTheme]);

  return null;
}
