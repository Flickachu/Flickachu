"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): () => void {
  // 🔴 HARD BLOCK — MOBILE NEVER ALLOWED
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    console.log("⛔ Lenis BLOCKED on mobile");
    return () => {};
  }

  // 🔴 Prevent duplicate instances
  if (lenisInstance) {
    return () => {};
  }

  console.log("✅ Lenis INITIALIZED");

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenisInstance = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    console.log("🧹 Lenis DESTROYED");

    gsap.ticker.remove(raf);
    lenis.destroy();
    lenisInstance = null;
  };
}