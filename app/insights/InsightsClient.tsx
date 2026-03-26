"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../components/FadeUp";
import { urlFor } from "@/sanity/lib/image";

type CombinedItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  mainImage: { asset: { _ref: string } } | string;
  category: "Article" | "Case Study" | "Guide";
  publishedAt?: string;
  readTime?: string;
};

interface InsightsClientProps {
  initialItems: CombinedItem[];
}

const categories = ["All", "Article", "Case Study", "Guide"] as const;

export default function InsightsClient({ initialItems }: InsightsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = activeFilter === "All"
    ? initialItems
    : initialItems.filter((item) => item.category === activeFilter);

  // Featured item is the first case study from the initial full list
  const featured = initialItems.find((i) => i.category === "Case Study");
  const gridItems = filtered.filter((i) => i._id !== featured?._id || activeFilter !== "All");

  return (
    <>
      {/* FEATURED (only show on "All") */}
      {activeFilter === "All" && featured && (
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto mb-20">
          <FadeUp>
            <Link href={`/projects/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm">
                <div className="overflow-hidden">
                  {featured.mainImage && (
                    <Image
                      src={urlFor(featured.mainImage).width(1000).height(700).url()}
                      alt={featured.title}
                      width={1000}
                      height={700}
                      className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-[12s] group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-8 md:p-16">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs px-4 py-1.5 rounded-full border border-[#a27725]/30 text-[#a27725] tracking-widest uppercase">{featured.category}</span>
                    <span className="text-xs text-neutral-400">
                      {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                    </span>
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
                {cat === "All" ? initialItems.length : initialItems.filter((i) => i.category === cat).length}
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
              <FadeUp key={item._id} delay={Math.min(i * 0.08, 0.4)}>
                <Link href={linkHref} className="group block cursor-pointer">
                  <div className="overflow-hidden rounded-2xl mb-6 bg-black/5">
                    {item.mainImage && (
                      <Image
                        src={urlFor(item.mainImage).width(800).height(600).url()}
                        alt={item.title}
                        width={800}
                        height={600}
                        className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
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
                      <span className="text-xs text-neutral-400">
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} 
                        {item.readTime ? ` · ${item.readTime}` : ''}
                      </span>
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
    </>
  );
}
