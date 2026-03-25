"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image"; // ✅ ADDED

export default function ProjectsPage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a]">

      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#0f0f0f]">

        <Image
          src="/images/project1.jpg"
          alt="Project hero"
          fill
          priority
          className="object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-10 text-white">
          <FadeUp>
            <h1 className="text-7xl md:text-[90px] max-w-4xl">
              Selected <br />
              <span className="italic serif">Projects</span>
            </h1>

            <p className="mt-6 text-white/70 max-w-xl">
              A curated collection of residential and commercial spaces designed
              with a focus on materiality, light, and emotional impact.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-32 text-center max-w-3xl mx-auto px-6">
        <FadeUp>
          <p className="text-3xl leading-relaxed">
            Each project is a balance between{" "}
            <span className="italic serif">form and feeling</span>.
          </p>

          <p className="text-gray-600 mt-8">
            From modern residences to luxury villas, our work reflects a commitment
            to timeless aesthetics and thoughtful detailing.
          </p>
        </FadeUp>
      </section>

      {/* PROJECT GRID */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto grid md:grid-cols-3 gap-16">

        {[
          ["project1.jpg", "Private Residence — Mumbai"],
          ["project2.jpg", "Luxury Villa — Dubai"],
          ["project3.jpg", "Penthouse — Bangalore"],
          ["featured.jpg", "Modern Apartment — Delhi"],
          ["about.jpg", "Studio Space — Pune"],
          ["hero.jpg", "Concept Interior — Hyderabad"],
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

      {/* FEATURED PROJECT */}
      <section className="py-40 grid md:grid-cols-2 gap-20 px-10 max-w-[1400px] mx-auto">

        <FadeUp>
          <Image
            src="/images/featured.jpg"
            alt="Featured project"
            width={800}
            height={600}
            className="rounded-2xl h-[500px] w-full object-cover"
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <div>
            <p className="text-xs tracking-widest text-gray-400 mb-4">
              FEATURED PROJECT
            </p>

            <h2 className="text-5xl">
              Sculpted <span className="italic serif">Minimalism</span>
            </h2>

            <p className="text-gray-600 mt-6">
              A refined living space defined by clean lines, soft lighting, and
              carefully selected materials.
            </p>

            <p className="text-gray-600 mt-4">
              The design focuses on creating a calm, immersive environment where
              every element contributes to a cohesive experience.
            </p>

            <a href="/projects/sculpted-minimalism" className="mt-6 px-6 py-3 border border-black rounded-full inline-block hover:bg-black hover:text-white transition group-hover:bg-black">
              View Case Study
            </a>
          </div>
        </FadeUp>

      </section>

      {/* CTA */}
      <section className="py-40 bg-black text-white text-center">
        <FadeUp>
          <h2 className="text-5xl mb-6">
            Let’s Build Your <span className="italic serif">Next Space</span>
          </h2>

          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Whether it’s a residence, workspace, or concept project, we bring
            precision and creativity to every detail.
          </p>

          <a href="/get-quote" className="px-8 py-4 bg-white text-black rounded-full inline-block hover:bg-[#a27725] hover:text-white transition">
            Start Your Project
          </a>
        </FadeUp>
      </section>

    </main>
  );
}