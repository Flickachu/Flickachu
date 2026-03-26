"use client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function AboutSection({ title, highlight, image, paragraphs }: any) {
  return (
    <section id="about" className="py-12 md:py-40 max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 items-center">
      <div className="relative overflow-hidden rounded-2xl group">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700 z-10"></div>
        {image ? (
          <Image
            src={urlFor(image).width(800).url()}
            alt={title || "About"}
            width={800}
            height={600}
            className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-[20s] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-[300px] md:h-[500px] bg-neutral-200" />
        )}
      </div>
      <div>
        <h2 className="text-4xl md:text-6xl mb-8 font-light">
          {title || "About"} <span className="italic serif text-[#a27725]">{highlight || "Us"}</span>
        </h2>
        
        {paragraphs && paragraphs.length > 0 ? (
          paragraphs.map((p: string, i: number) => (
             <p key={i} className={`text-[#1a1a1a]/70 text-lg leading-relaxed font-light ${i < paragraphs.length - 1 ? 'mb-6' : ''}`}>
               {p}
             </p>
          ))
        ) : (
          <>
            <p className="text-[#1a1a1a]/70 mb-6 text-lg leading-relaxed font-light">
              Laminate Gallery began as a passion project exploring the intersection of architecture, furniture, and emotional design.
            </p>
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed font-light">
              Today, it stands as a studio dedicated to crafting interiors that balance modern aesthetics with timeless sensibilities — spaces that don&apos;t just look beautiful, but feel complete.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
