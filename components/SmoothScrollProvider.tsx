"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smoothScroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // ✅ Detect touch devices (better than width check)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // ✅ Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 🚫 Disable smooth scroll on mobile / touch / reduced motion
    if (isTouchDevice || prefersReducedMotion) return;

    // ✅ Initialize smooth scroll
    const cleanup = initSmoothScroll();

    // ✅ Cleanup on unmount (VERY important)
    return () => {
      cleanup();
    };
  }, []);

  return <>{children}</>;
}