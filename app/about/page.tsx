"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image"; // ✅ ADDED

export default function AboutPage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a]">

      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">

        {/* IMAGE */}
        <Image
          src="/images/about.jpg"
          alt="About hero"
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-10 text-white">
          <FadeUp>
            <h1 className="text-7xl md:text-[90px] max-w-4xl">
              About <span className="italic serif">Laminate Gallery</span>
            </h1>

            <p className="mt-6 text-white/70 max-w-xl">
              We design spaces that go beyond aesthetics — creating environments
              that evoke emotion, comfort, and timeless elegance.
            </p>
          </FadeUp>
        </div>

      </section>

      {/* STORY */}
      <section className="py-40 max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="text-3xl leading-relaxed">
            Design is not just what you see, but{" "}
            <span className="italic serif">what you feel</span>.
          </p>

          <p className="text-gray-600 mt-8">
            Laminate Gallery was built on the idea that interiors should reflect
            personality, not trends. Every project is approached with a balance
            of materiality, proportion, and human experience.
          </p>
        </FadeUp>
      </section>

      {/* IMAGE + TEXT */}
      <section className="grid md:grid-cols-2 gap-20 px-10 max-w-[1400px] mx-auto pb-40">

        <FadeUp>
          <Image
            src="/images/about.jpg"
            alt="About section"
            width={800}
            height={600}
            className="rounded-2xl h-[500px] object-cover"
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <div>
            <h2 className="text-5xl mb-6">
              Thoughtful <span className="italic serif">Design</span>
            </h2>

            <p className="text-gray-600">
              We focus on clean geometry, natural textures, and refined details.
              The goal is to create spaces that remain relevant and beautiful
              over time.
            </p>
          </div>
        </FadeUp>

      </section>

    </main>
  );
}