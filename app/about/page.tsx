"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image";

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
        <Image
          src="/images/about.jpg"
          alt="About hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-10 text-white">
          <FadeUp>
            <h1 className="text-7xl md:text-[90px] max-w-4xl tracking-tight leading-[1]">
              About <br /><span className="italic serif">Laminate Gallery</span>
            </h1>
            <p className="mt-8 text-white/70 max-w-xl text-lg leading-relaxed">
              We design spaces that go beyond aesthetics — creating environments
              that evoke emotion, absolute comfort, and timeless elegance.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* STORY / PHILOSOPHY */}
      <section className="py-32 md:py-48 max-w-5xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="text-sm tracking-[0.2em] text-[#a27725] uppercase mb-8">Our Philosophy</p>
          <h2 className="text-4xl md:text-5xl leading-tight">
            Design is not just what you see, but{" "}
            <span className="italic serif">what you feel</span>.
          </h2>
          <p className="text-gray-600 mt-10 md:text-lg max-w-3xl mx-auto leading-relaxed">
            Laminate Gallery was built on the fundamental idea that interiors should reflect
            personality, not fleeting trends. Every project is approached with a rigorous balance
            of materiality, proportion, and the human experience. We delve deep into the nuances of light
            and shadow to architect spaces that naturally compel you to stay.
          </p>
        </FadeUp>
      </section>

      {/* IMAGE + TEXT SPLIT */}
      <section className="grid md:grid-cols-2 gap-16 md:gap-24 px-10 max-w-[1400px] mx-auto pb-40 items-center">
        <FadeUp>
          <div className="relative group overflow-hidden rounded-3xl h-[600px]">
            <Image
              src="/images/project1.jpg"
              alt="Design Process"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div>
            <p className="text-sm tracking-[0.2em] text-[#a27725] uppercase mb-6">Our Approach</p>
            <h2 className="text-5xl mb-8 tracking-tight">
              Thoughtful <span className="italic serif">Execution</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We focus on clean geometry, natural textures, and refined details.
              Our methodology revolves around a holistic comprehension of how people actually live and move within spaces.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              By combining artisanal craftsmanship with cutting-edge spatial planning, we ensure that every room we deliver
              not only meets pragmatic requirements but sets a benchmark for enduring visual appeal.
            </p>

            <ul className="space-y-4 text-gray-800">
              <li className="flex gap-4 items-center">
                <span className="w-2 h-2 rounded-full bg-[#a27725]" /> Precision Space Planning
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-2 h-2 rounded-full bg-[#a27725]" /> Curated Material Selection
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-2 h-2 rounded-full bg-[#a27725]" /> Seamless Project Management
              </li>
            </ul>
          </div>
        </FadeUp>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-white py-40 px-10 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-4xl tracking-tight mb-20 text-center">
              The <span className="italic serif">Visionaries</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((item) => (
              <FadeUp delay={item * 0.1} key={item}>
                <div className="text-center group">
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                    <Image src={`/images/project${item}.jpg`} alt="Team Member" fill className="object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight">Principal Architect</h3>
                  <p className="text-neutral-500 uppercase tracking-widest text-xs mt-2">Design Director</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-black text-white text-center">
        <FadeUp>
          <h2 className="text-5xl mb-6 tracking-tight">
            Ready to <span className="italic serif">Elevate</span> your space?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
            Let's discuss how our design philosophy can bring your vision into reality.
          </p>
          <a href="/contact" className="px-10 py-5 bg-white text-black rounded-full hover:bg-[#a27725] hover:text-white transition duration-300">
            Get in Touch
          </a>
        </FadeUp>
      </section>

    </main>
  );
}