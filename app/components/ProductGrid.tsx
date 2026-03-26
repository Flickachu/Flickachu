"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeUp from "./FadeUp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  title?: string;
  slug?: { current?: string };
  imageUrl?: string;
}

interface ProductGridProps {
  title?: string;
  products?: Product[];
}

export default function ProductGrid({ title, products = [] }: ProductGridProps) {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".product-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [products]);

  return (
    <section id="projects" className="py-16 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto bg-[#f6f3ee]">
      <FadeUp>
        <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light border-b border-black/10 pb-12 text-[#1a1a1a]">
          {title || "Featured Collections"}
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {(products || []).map((p, i) => (
          <div key={i} className="group cursor-pointer">
            <Link href={p.slug?.current ? `/products/${p.slug.current}` : "#"} className="block">
              <div className="overflow-hidden rounded-2xl mb-6 relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title || `Product ${i + 1}`}
                    width={800}
                    height={600}
                    className="product-img w-full h-[320px] md:h-[500px] object-cover transition-transform duration-[10s] group-hover:scale-105"
                  />
                ) : (
                  <div className="product-img w-full h-[320px] md:h-[500px] bg-neutral-200" />
                )}
              </div>
              <p className="text-sm md:text-base text-[#1a1a1a]/80 font-light tracking-wide group-hover:text-[#a27725] transition-colors">
                {p.title || "Product Name"}
              </p>
            </Link>
          </div>
        ))}
        {(!products || products.length === 0) && (
          <p className="text-[#1a1a1a]/60 font-light">No products available at the moment.</p>
        )}
      </div>
    </section>
  );
}
