"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";

const dummyCaseStudies = [
  { slug: "sculpted-minimalism", title: "Sculpted Minimalism", desc: "A refined living space defined by clean lines, soft lighting, and carefully selected materials.", category: "Residential", img: "featured.jpg" },
  { slug: "urban-oasis", title: "Urban Oasis", desc: "A calm sanctuary in the heart of Mumbai, focusing on indoor-outdoor flow.", category: "Villa", img: "project1.jpg" },
  { slug: "modern-heritage", title: "Modern Heritage", desc: "Merging traditional Indian craftsmanship with contemporary architectural principles.", category: "Penthouse", img: "project2.jpg" },
  { slug: "the-monochrome-loft", title: "The Monochrome Loft", desc: "Using varying shades of black, white, and grey to define volumes in an open plan.", category: "Apartment", img: "project3.jpg" }
];

export default function CaseStudiesPage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar forceDark={false} />

      {/* HEADER */}
      <section className="pt-48 pb-24 px-6 md:px-10 max-w-[1400px] mx-auto border-b border-white/10">
        <FadeUp>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-light tracking-tight mb-8">
              Selected <span className="italic serif text-[#c2a373]">Case Studies</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              An in-depth look into our architectural process—how we deconstruct space, light, and material to build environments that resonate emotionally.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* LIST */}
      <section className="py-24 px-6 md:px-10 max-w-[1400px] mx-auto space-y-32">
        {dummyCaseStudies.map((study, i) => (
          <FadeUp key={study.slug}>
            <Link href={`/projects/${study.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className={`order-2 ${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#c2a373] mb-6">{study.category}</p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8 group-hover:text-[#c2a373] transition-colors">{study.title}</h2>
                  <p className="text-white/60 font-light text-lg leading-relaxed max-w-md mb-10">
                    {study.desc}
                  </p>
                  <div className="inline-flex items-center gap-4 text-sm uppercase tracking-widest border-b border-white/20 pb-2 group-hover:border-white transition-colors">
                    View Complete Case Study <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>

                <div className={`overflow-hidden rounded-2xl order-1 ${i % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  <Image
                    src={`/images/${study.img}`}
                    alt={study.title}
                    width={1000}
                    height={800}
                    className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-[15s] group-hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </section>
    </main>
  );
}
