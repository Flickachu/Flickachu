"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smoothScroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Use matchMedia instead of raw width (more reliable)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion) return;

    const cleanup = initSmoothScroll();

    return () => {
      cleanup();
    };
  }, []);

  return <>{children}</>;
}