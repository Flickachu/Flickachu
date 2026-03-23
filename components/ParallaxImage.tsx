"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImage() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-img", {
        y: -100, // movement amount
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="h-[120vh] flex items-center justify-center overflow-hidden">
      <div className="overflow-hidden">
        <img
          src="/images/hero.jpg"
          className="parallax-img w-[600px] object-cover"
        />
      </div>
    </section>
  );
}