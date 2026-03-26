"use client";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HighlightSection({ image, tag, title, description }: any) {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".highlight-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [image]);

  return (
    <section className="relative h-[60vh] md:h-[90vh] overflow-hidden my-20 md:my-40 mx-4 md:mx-10 rounded-2xl">
      {image ? (
        <Image
          src={urlFor(image).width(1920).url()}
          alt={title || "Highlighted Project"}
          fill
          className="highlight-img object-cover opacity-90"
        />
      ) : (
        <div className="highlight-img absolute inset-0 bg-neutral-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
      <div className="absolute bottom-12 left-8 md:left-16 text-white max-w-xl z-10">
        <p className="text-xs tracking-[0.2em] text-[#c2a373] mb-4 uppercase">
          {tag || "Spatial Study"}
        </p>
        <h2 className="text-4xl md:text-6xl font-light mb-4">{title || "Sculptural Comfort"}</h2>
        <p className="text-lg text-white/80 font-light leading-relaxed">
          {description || "Exploring bold forms and soft textures in a modern living space."}
        </p>
      </div>
    </section>
  );
}
