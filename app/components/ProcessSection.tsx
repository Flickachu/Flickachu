"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection({ tag, title, description, steps }: any) {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stack-card").forEach((card, i, arr) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top ${10 + i * 2}%`,
          endTrigger: "#process",
          end: `bottom bottom`,
          pin: true,
          pinSpacing: false,
        });

        if (arr.length - 1 === i) return;
        gsap.to(card, {
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: arr[i + 1],
            start: "top bottom",
            end: `top ${10 + (i + 1) * 2}%`,
            scrub: true,
          }
        });
      });
    });

    return () => ctx.revert();
  }, [steps]);

  // Default steps for the case where CMS is empty
  const defaultSteps = [
    { phase: "01", title: "Discovery", description: "We begin by understanding...", bgColor: "bg-[#fcfbf9]" },
    { phase: "02", title: "Concept", description: "Our team develops a comprehensive design narrative...", bgColor: "bg-[#f6f3ee]" },
    { phase: "03", title: "Refinement", description: "Every element is meticulously reviewed...", bgColor: "bg-white" },
    { phase: "04", title: "Realization", description: "We oversee the precise execution...", bgColor: "bg-[#fcfbf9]" },
  ];
  const processSteps = steps && steps.length > 0 ? steps : defaultSteps;
  const safeTitle = title || "Our Process";
  const leadWord = safeTitle.split(" ")[0] || "Our";
  const tailWords = safeTitle.split(" ").slice(1).join(" ") || "Process";

  return (
    <section id="process" className="py-24 md:py-40 bg-white text-[#1a1a1a] px-6 md:px-10 relative">
      <div className="max-w-[1200px] mx-auto relative process-container">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.3em] text-[#a27725] mb-6 uppercase">{tag || "How we work"}</p>
          <h2 className="text-4xl md:text-6xl font-light">
            {leadWord} <span className="italic serif text-[#a27725]">{tailWords}</span>
          </h2>
          <p className="text-[#1a1a1a]/60 mt-6 max-w-xl mx-auto font-light text-lg">
            {description || "A meticulous, step-by-step approach to transforming your vision into a refined reality."}
          </p>
        </div>

        <div className="relative">
          {processSteps.map((item: any, i: number) => (
            <div
              key={i}
              className={`stack-card min-h-[50vh] md:min-h-[60vh] mb-12 md:mb-24 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-black/5 will-change-transform origin-top ${item.bgColor || "bg-[#fcfbf9]"}`}
            >
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <span className="text-[#a27725] tracking-[0.2em] text-sm md:text-base mb-6 font-light uppercase">Phase {item.phase}</span>
                <h3 className="text-3xl md:text-5xl font-light mb-6 md:mb-8">{item.title}</h3>
                <p className="text-[#1a1a1a]/60 text-lg font-light leading-relaxed">{item.description}</p>
              </div>
              <div className="w-full md:w-1/2 h-[30vh] md:h-auto relative">
                {item.image ? (
                  <Image src={urlFor(item.image).url()} alt={item.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-neutral-200 absolute inset-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
