"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🔒 singleton protection
let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): () => void {
  // 🚫 Prevent multiple instances
  if (lenisInstance) {
    return () => {};
  }

  // 🚫 Double safety: block mobile here too
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.1, // slightly reduced for better performance
    smoothWheel: true,
  });

  lenisInstance = lenis;

  // Sync ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenisInstance = null;
  };
}