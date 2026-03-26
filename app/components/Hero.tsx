"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeUp from "./FadeUp";
import { urlFor } from "@/sanity/lib/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: any;
  primaryCTA?: { label?: string; link?: string };
}

export default function Hero({ title, subtitle, description, image, primaryCTA }: HeroProps) {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-img", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-img",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const renderTextWithBreaks = (text: string) => {
    return text
      .split(/(?:\s*<br\s*\/?>\s*|\n)+/i)
      .filter(Boolean)
      .map((part, index, array) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < array.length - 1 && <br className="hidden md:block" />}
      </React.Fragment>
    ));
  };

  return (
    <section id="hero" className="relative md:min-h-screen min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="hidden md:block absolute inset-0">
          {image ? (
            <Image
              src={urlFor(image).width(1920).url()}
              alt={title || "Background Hero Image"}
              fill
              priority
              className="hero-img object-cover object-top"
            />
          ) : (
             <div className="hero-img w-full h-full bg-neutral-800" />
          )}
        </div>
        <div className="block md:hidden absolute inset-0">
          {image ? (
            <Image
              src={urlFor(image).width(800).url()}
              alt={title || "Background Hero Image"}
              fill
              priority
              className="hero-img object-cover object-center"
            />
          ) : (
             <div className="hero-img w-full h-full bg-neutral-800" />
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
        <FadeUp>
          <div className="max-w-[280px] md:max-w-3xl mx-auto md:ml-10 text-center md:text-left">
            <h1 className="text-[40px] md:text-[96px] leading-[1] text-white tracking-[-0.03em] font-light">
              {title ? renderTextWithBreaks(title) : "Welcome."}
              <span className="italic serif text-[#c2a373]">
                {" "}
                {subtitle ? subtitle.trim() : "Experience elegance."}
              </span>
            </h1>
            
            <p className="text-white/80 mt-6 max-w-md leading-relaxed text-sm md:text-xl font-light mx-auto md:mx-0">
              {description || "Discover premium quality and exceptional aesthetics."}
            </p>

            {primaryCTA?.label && primaryCTA?.link && (
              <Link
                href={primaryCTA.link}
                className="inline-block relative mt-12 px-10 py-4 border border-[#c2a373] rounded-full text-[#c2a373] overflow-hidden group transition-all duration-500 hover:text-white"
              >
                <span className="relative z-10 tracking-widest text-sm uppercase">
                  {primaryCTA.label}
                </span>
                <span className="absolute inset-0 bg-[#c2a373] opacity-0 group-hover:opacity-100 transition duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
              </Link>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
