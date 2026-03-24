"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImage() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // 🚫 Disable on mobile
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const img = ref.current?.querySelector(".parallax-img");

      if (!img) return;

      gsap.to(img, {
        y: -80, // slightly reduced for smoother feel
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // 🔥 smoother + less heavy than true
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="h-[120vh] flex items-center justify-center overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src="/images/hero.jpg"
          className="parallax-img w-[600px] object-cover"
        />
      </div>
    </section>
  );
}