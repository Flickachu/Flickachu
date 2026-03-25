"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";

type InsightItem = {
  slug: string;
  title: string;
  excerpt: string;
  img: string;
  category: "Article" | "Case Study" | "Guide";
  date: string;
  readTime: string;
};

const allInsights: InsightItem[] = [
  // ARTICLES
  { slug: "designing-with-light", title: "Designing with Light", excerpt: "How natural lighting fundamentally shifts the mood of a living space. Every window placement, reflection surface, and shadow angle contributes to the architecture of the interior as powerfully as the walls themselves.", img: "project1.jpg", category: "Article", date: "Mar 2026", readTime: "5 min" },
  { slug: "material-focus-wood", title: "Material Focus: Natural Wood", excerpt: "Exploring the warmth, durability, and emotional resonance of different wood grains in modern architecture. From teak to walnut, how the right timber transforms a house into a home.", img: "wood1.jpg", category: "Article", date: "Feb 2026", readTime: "7 min" },
  { slug: "the-psychology-of-color", title: "The Psychology of Color", excerpt: "A deep dive into how subtle off-whites, greys, and earthy hues influence well-being. Colour isn't decoration—it's atmosphere, and we treat it as such in every project.", img: "featured.jpg", category: "Article", date: "Jan 2026", readTime: "6 min" },
  { slug: "bespoke-furniture", title: "The Value of Bespoke Furniture", excerpt: "Why custom-built pieces breathe life into a home better than anything off-the-shelf. Tailored dimensions, unique materials, and designs as individual as the people who live with them.", img: "project3.jpg", category: "Article", date: "Dec 2025", readTime: "4 min" },
  { slug: "texture-layering", title: "Texture Layering", excerpt: "Mastering the interplay of stone, fabric, timber, and metal to create rich, tactile environments. Great design isn't just visual—it invites touch.", img: "stone2.jpg", category: "Article", date: "Nov 2025", readTime: "5 min" },
  { slug: "space-optimization", title: "Optimizing Small Spaces", excerpt: "Clever layout configurations and minimalist choices that maximize usability without feeling crowded. Compact living doesn't mean compromising on elegance.", img: "project2.jpg", category: "Article", date: "Oct 2025", readTime: "6 min" },

  // CASE STUDIES
  { slug: "sculpted-minimalism", title: "Sculpted Minimalism", excerpt: "A refined living space in Pune defined by clean lines, soft lighting, and carefully selected materials. The design focuses on creating a calm, immersive environment tailored for modern living.", img: "project1.jpg", category: "Case Study", date: "Mar 2026", readTime: "8 min" },
  { slug: "luxury-villa", title: "Luxury Villa Retreat", excerpt: "An expansive villa in Goa blending modern design with natural surroundings. Breathable materials, open layouts, and seamless indoor-outdoor flow define this coastal sanctuary.", img: "project2.jpg", category: "Case Study", date: "Feb 2026", readTime: "10 min" },
  { slug: "modern-office", title: "Modern Office Space", excerpt: "A contemporary workspace in Bangalore designed for productivity and collaboration. Modular zones with acoustic separation create the perfect balance of focus and teamwork.", img: "project3.jpg", category: "Case Study", date: "Jan 2026", readTime: "7 min" },
  { slug: "modern-elegance", title: "Modern Elegance", excerpt: "This project explores contrast — warm wood textures paired with sculptural lighting and soft neutral fabrics. The result is a space that feels grounded, intimate, and quietly luxurious.", img: "featured.jpg", category: "Case Study", date: "Dec 2025", readTime: "9 min" },

  // GUIDES
  { slug: "timeless-design", title: "Timeless vs Trend-Driven Spaces", excerpt: "Understanding the balance between contemporary trends and enduring design principles. A practical guide to ensuring your space never feels dated, no matter how tastes evolve.", img: "leather1.jpg", category: "Guide", date: "Mar 2026", readTime: "8 min" },
  { slug: "material-harmony", title: "The Art of Material Harmony", excerpt: "Exploring how textures, tones, and finishes come together to create balanced interiors. A designer's guide to curating palettes that feel unified and intentional.", img: "wood2.jpg", category: "Guide", date: "Feb 2026", readTime: "6 min" },
];

const categories = ["All", "Article", "Case Study", "Guide"] as const;

export default function InsightsPage() {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  const filtered = activeFilter === "All"
    ? allInsights
    : allInsights.filter((item) => item.category === activeFilter);

  // Featured item is always the first case study
  const featured = allInsights.find((i) => i.category === "Case Study")!;
  const gridItems = filtered.filter((i) => i.slug !== featured.slug || activeFilter !== "All");

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">
      <Navbar forceDark />

      {/* HERO */}
      <section className="pt-48 pb-20 px-6 md:px-10 max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-[#a27725] mb-6">Journal</p>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              Thoughts & <span className="italic serif text-[#a27725]">Insights</span>
            </h1>
            <p className="text-[#1a1a1a]/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Curated articles, in-depth case studies, and practical guides on interior architecture, materiality, and the emotional resonance of space design.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* FEATURED (only show on "All") */}
      {activeFilter === "All" && (
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto mb-20">
          <FadeUp>
            <Link href={`/projects/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm">
                <div className="overflow-hidden">
                  <Image
                    src={`/images/${featured.img}`}
                    alt={featured.title}
                    width={1000}
                    height={700}
                    className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-[12s] group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-16">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs px-4 py-1.5 rounded-full border border-[#a27725]/30 text-[#a27725] tracking-widest uppercase">{featured.category}</span>
                    <span className="text-xs text-neutral-400">{featured.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light leading-tight mb-6 group-hover:text-[#a27725] transition-colors">{featured.title}</h2>
                  <p className="text-[#1a1a1a]/60 font-light text-lg leading-relaxed mb-8">{featured.excerpt}</p>
                  <span className="text-sm uppercase tracking-widest border-b border-black/20 pb-1 group-hover:border-[#a27725] transition-colors">Read Full Study →</span>
                </div>
              </div>
            </Link>
          </FadeUp>
        </section>
      )}

      {/* FILTER PILLS */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto mb-16">
        <div className="flex items-center gap-3 flex-wrap border-b border-black/10 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 border ${
                activeFilter === cat
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-transparent text-[#1a1a1a]/70 border-black/10 hover:border-black/30 hover:text-black"
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-50">
                {cat === "All" ? allInsights.length : allInsights.filter((i) => i.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-20">
          {gridItems.map((item, i) => {
            const linkHref = item.category === "Case Study"
              ? `/projects/${item.slug}`
              : `/posts/${item.slug}`;

            return (
              <FadeUp key={item.slug} delay={Math.min(i * 0.08, 0.4)}>
                <Link href={linkHref} className="group block cursor-pointer">
                  <div className="overflow-hidden rounded-2xl mb-6 bg-black/5">
                    <Image
                      src={`/images/${item.img}`}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-3 py-1 rounded-full tracking-widest uppercase border ${
                        item.category === "Case Study"
                          ? "border-[#a27725]/30 text-[#a27725]"
                          : item.category === "Guide"
                          ? "border-emerald-400/30 text-emerald-600"
                          : "border-black/10 text-black/50"
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-neutral-400">{item.date} · {item.readTime}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-light leading-tight group-hover:text-[#a27725] transition-colors">{item.title}</h2>
                    <p className="text-[#1a1a1a]/60 font-light leading-relaxed text-sm line-clamp-3">{item.excerpt}</p>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {gridItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No insights in this category yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
