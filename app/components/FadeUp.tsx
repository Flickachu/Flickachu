"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FadeUp({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // 🚫 MOBILE: simple animation (NO ScrollTrigger)
    if (isMobile) {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power2.out",
        }
      );
      return;
    }

    // 🖥 DESKTOP: ScrollTrigger version
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true, // 🔥 VERY IMPORTANT (prevents re-triggering)
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}