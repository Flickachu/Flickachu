"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FadeUp from "../components/FadeUp";
import Image from "next/image";

export default function ProductsPage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a]">
      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">

        <Image
          src="/images/project2.jpg"
          alt="Products hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-10 text-white">
          <FadeUp>
            <h1 className="text-7xl md:text-[90px] max-w-4xl">
              Our <span className="italic serif">Products</span>
            </h1>

            <p className="mt-6 text-white/70 max-w-xl">
              Bespoke furniture and interior solutions crafted with precision,
              material integrity, and timeless aesthetics.
            </p>
          </FadeUp>
        </div>

      </section>

      {/* PRODUCT GRID */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto grid md:grid-cols-3 gap-16">

        {[
          ["project1.jpg", "Custom Furniture"],
          ["project2.jpg", "Interior Concepts"],
          ["project3.jpg", "Lighting Design"],
          ["featured.jpg", "Material Curation"],
          ["about.jpg", "Space Planning"],
          ["hero.jpg", "Luxury Finishes"],
        ].map(([img, title], i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div className="group">
              <div className="overflow-hidden rounded-2xl">

                <Image
                  src={`/images/${img}`}
                  alt={title}
                  width={800}
                  height={600}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <p className="mt-4 text-sm text-gray-600">{title}</p>
            </div>
          </FadeUp>
        ))}

      </section>

      {/* CTA */}
      <section className="py-40 bg-black text-white text-center">
        <FadeUp>
          <h2 className="text-5xl mb-6">
            Designed for <span className="italic serif">You</span>
          </h2>

          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Every product is tailored to fit your space, lifestyle, and vision.
          </p>

          <Link
            href="/get-quote"
            className="inline-block px-8 py-4 bg-white text-black rounded-full hover:bg-[#a27725] hover:text-white transition duration-300"
          >
            Enquire Now
          </Link>
        </FadeUp>
      </section>

    </main>
  );
}
