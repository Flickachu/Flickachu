"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MaterialsSection({ tag, title, description, materials }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const section = containerRef.current;
      if (section) {
        const getWidth = () => section.scrollWidth - window.innerWidth;
        gsap.to(section, {
          x: () => -getWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getWidth()}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".material-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.05 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [materials]);

  const defaultMaterials = [
    { name: "Natural Wood", images: [null, null, null] },
    { name: "Refined Leather", images: [null, null, null] },
    { name: "Stone & Marble", images: [null, null, null] }
  ];
  const matGroups = materials && materials.length > 0 ? materials : defaultMaterials;

  return (
    <>
      <section id="materials" className="hidden md:block relative overflow-hidden bg-white">
        <div ref={containerRef} className="horizontal-wrapper flex w-[400vw] h-screen will-change-transform">
          <div className="w-screen h-screen flex items-center justify-center relative">
            <div className="text-center z-10 p-8">
              <p className="text-sm tracking-[0.3em] text-[#a27725] mb-8 uppercase">{tag || "The Essentials"}</p>
              <h2 className="text-6xl md:text-8xl mb-8 font-light">
                {(title || "Material Palette").split(" ")[0]} <span className="italic serif text-[#a27725]">{(title || "Material Palette").split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="text-[#1a1a1a]/60 max-w-xl mx-auto text-xl font-light">
                {description || "A curated exploration of textures, finishes, and tones that define our spaces."}
              </p>
            </div>
          </div>
          {matGroups.map((group: any, idx: number) => (
            <div key={idx} className="w-screen h-screen flex items-center justify-center">
              <div className="max-w-6xl w-full px-10">
                <h3 className="text-4xl md:text-5xl mb-16 text-center font-light">
                  {(group.name || "").split(" ")[0]} <span className="italic serif text-[#a27725]">{(group.name || "").split(" ").slice(1).join(" ")}</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-10">
                  {group.images?.slice(0, 3).map((img: any, i: number) => (
                    <div key={i} className="overflow-hidden rounded-2xl group cursor-pointer relative">
                      <div className="absolute inset-0 border border-black/5 rounded-2xl z-20 pointer-events-none group-hover:border-[#a27725]/50 transition-colors duration-500"></div>
                      {img ? (
                        <Image src={urlFor(img).width(600).height(600).url()} alt={`Texture ${i}`} width={600} height={600} className="material-img w-full aspect-square object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                      ) : (
                        <div className="material-img w-full aspect-square bg-neutral-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="materials-mobile" className="md:hidden py-20 px-6 bg-white">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.2em] text-[#a27725] mb-6 uppercase">{tag || "The Essentials"}</p>
          <h2 className="text-4xl mb-6 font-light">
             {(title || "Material Palette").split(" ")[0]} <span className="italic serif text-[#a27725]">{(title || "Material Palette").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-[#1a1a1a]/60 max-w-md mx-auto font-light">
            {description}
          </p>
        </div>
        {matGroups.map((mat: any, mIdx: number) => (
          <div key={mIdx} className="mb-20">
             <h3 className="text-3xl mb-10 text-center font-light">
              {(mat.name || "").split(" ")[0]} <span className="italic serif text-[#a27725]">{(mat.name || "").split(" ").slice(1).join(" ")}</span>
            </h3>
            <div className="grid grid-cols-1 gap-8">
              {mat.images?.slice(0, 3).map((img: any, n: number) => (
                <div key={n} className="overflow-hidden rounded-2xl relative border border-black/5">
                   {img ? (
                     <Image src={urlFor(img).width(600).height(400).url()} alt={`Texture ${n}`} width={600} height={400} className="material-img w-full h-[300px] object-cover opacity-90" />
                   ) : (
                     <div className="material-img w-full h-[300px] bg-neutral-200 opacity-90" />
                   )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
