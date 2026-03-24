"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll(): () => void {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  });

  // Sync ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Store ticker function reference (IMPORTANT)
  const raf = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // ✅ RETURN CLEANUP FUNCTION
  return () => {
    gsap.ticker.remove(raf);     // 🔥 CRITICAL FIX
    lenis.destroy();             // 🔥 CRITICAL FIX
  };
}