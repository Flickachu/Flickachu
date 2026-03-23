"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FadeUp({ children, delay = 0 }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    gsap.fromTo(
      el,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}