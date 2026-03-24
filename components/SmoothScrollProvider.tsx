"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smoothScroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 🚫 Disable on mobile
    if (isMobile || prefersReducedMotion) return;

    const cleanup = initSmoothScroll();

    return () => {
      cleanup();
    };
  }, []);

  return <>{children}</>;
}