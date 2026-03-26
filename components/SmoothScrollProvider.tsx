"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initSmoothScroll } from "@/lib/smoothScroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/studio") || pathname.startsWith("/sanity")) {
      // 🚫 Studio Fix: Force dark background and hide browser scrollbar for Studio routes
      document.body.style.background = "#0d0e12"; // matches Sanity dark theme
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // @ts-ignore - resolve scrollbar gutter issues
      document.documentElement.style.scrollbarGutter = "auto";
      document.body.style.paddingRight = "0px";
      return;
    }

    // Restore for other pages
    document.body.style.background = "";
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    // @ts-ignore
    document.documentElement.style.scrollbarGutter = "";
    document.body.style.paddingRight = "";

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
  }, [pathname]);

  return <>{children}</>;
}