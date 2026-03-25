"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation"; 
import Navbar from "./Navbar";
import FadeUp from "./FadeUp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "./SectionNav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeClient({ posts }: { posts: any[] }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      return;
    }

    const ctx = gsap.context(() => {
      // HERO
      gsap.to(".hero-img", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-img",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // PROJECT IMAGES
      gsap.utils.toArray(".project-img").forEach((img: any) => {
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

      // HORIZONTAL SCROLL
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

      // MATERIAL IMAGES
      gsap.utils.toArray(".material-img").forEach((img: any) => {
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

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {isDesktop && <SectionNav />}

      <main className="bg-[#f6f3ee] text-[#1a1a1a] selection:bg-[#a27725] selection:text-white">
        <Navbar />

        {/* HERO */}
        <section id="hero" className="relative md:min-h-screen min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/images/hero.jpg"
                alt="Hero"
                fill
                priority
                className="hero-img object-cover object-top"
              />
            </div>
            <div className="block md:hidden absolute inset-0">
              <Image
                src="/images/hero-mobile.jpg"
                alt="Hero"
                fill
                priority
                className="hero-img object-cover object-center"
              />
            </div>
          </div>
          {/* Subtle gradient overlay to make white text pop on the image */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
            <FadeUp>
              <div className="max-w-[280px] md:max-w-3xl mx-auto md:ml-10 text-center md:text-left">
                <h1 className="text-[40px] md:text-[96px] leading-[1] text-white tracking-[-0.03em] font-light">
                  We design spaces<br />
                  you <span className="italic serif text-[#c2a373]">remember</span>
                </h1>
                <p className="text-white/80 mt-6 max-w-md leading-relaxed text-sm md:text-xl font-light">
                  Thoughtfully designed interiors and bespoke furniture pieces that turn
                  everyday living into a refined, sensory experience.
                </p>
                <Link href="/consultation">
                  <button className="relative mt-12 px-10 py-4 border border-[#c2a373] rounded-full text-[#c2a373] overflow-hidden group transition-all duration-500 hover:text-white">
                    <span className="relative z-10 tracking-widest text-sm uppercase">
                      Start Your Project
                    </span>
                    <span className="absolute inset-0 bg-[#c2a373] opacity-0 group-hover:opacity-100 transition duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                  </button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* EDITORIAL */}
        <section className="py-20 md:py-48 text-center max-w-4xl mx-auto px-6 md:px-10">
          <FadeUp>
            <p className="text-3xl md:text-5xl leading-snug md:leading-tight font-light text-[#1a1a1a]">
              We believe design is not just visual — it is{" "}
              <span className="italic serif text-[#a27725]">something you experience</span>.
            </p>
            <p className="text-lg md:text-xl text-[#1a1a1a]/60 mt-10 max-w-2xl mx-auto font-light leading-relaxed">
              From the warmth of materials to the flow of light, every detail is curated
              to create spaces that feel effortless, refined, and deeply personal.
            </p>
          </FadeUp>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-12 md:py-40 max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 items-center">
          <div className="relative overflow-hidden rounded-2xl group">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700 z-10"></div>
            <Image
              src="/images/about.jpg"
              alt="About"
              width={800}
              height={600}
              className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-[20s] group-hover:scale-105"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl mb-8 font-light">About <span className="italic serif text-[#a27725]">Us</span></h2>
            <p className="text-[#1a1a1a]/70 mb-6 text-lg leading-relaxed font-light">
              Laminate Gallery began as a passion project exploring the intersection of
              architecture, furniture, and emotional design.
            </p>
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed font-light">
              Today, it stands as a studio dedicated to crafting interiors that balance
              modern aesthetics with timeless sensibilities — spaces that don't just look
              beautiful, but feel complete.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="py-24 md:py-40 border-t border-b border-black/5 bg-white text-center grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 px-6 md:px-10 my-20">
          {[
            ["12+", "Years of Experience"],
            ["85+", "Projects Completed"],
            ["30+", "Cities Covered"],
            ["100%", "Client Satisfaction"],
          ].map(([n, label], i) => (
            <FadeUp key={i}>
              <div className="relative group">
                <h3 className="text-4xl md:text-6xl font-light text-[#a27725] mb-4 group-hover:scale-105 transition-transform duration-500">{n}</h3>
                <p className="text-xs md:text-sm tracking-[0.2em] text-[#1a1a1a]/40 uppercase font-light">
                  {label}
                </p>
              </div>
            </FadeUp>
          ))}
        </section>

        {/* IMAGE BREAK */}
        <section className="relative h-[60vh] md:h-[90vh] overflow-hidden my-20 md:my-40 mx-4 md:mx-10 rounded-2xl">
          <Image
            src="/images/project1.jpg"
            alt="Project"
            fill
            className="project-img object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
          <div className="absolute bottom-12 left-8 md:left-16 text-white max-w-xl z-10">
            <p className="text-xs tracking-[0.2em] text-[#c2a373] mb-4 uppercase">
              Spatial Study
            </p>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Sculptural Comfort</h2>
            <p className="text-lg text-white/80 font-light leading-relaxed">
              Exploring bold forms and soft textures in a modern living space.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light text-center md:text-left">
              Our <span className="italic serif text-[#a27725]">Services</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
            {[
              { title: "Interior Design", desc: "Full-space concepts that blend spatial flow, lighting, and material harmony." },
              { title: "Custom Furniture", desc: "Bespoke pieces designed to complement architecture and lifestyle." },
              { title: "Turnkey Projects", desc: "End-to-end execution from concept to completion with precision." }
            ].map((srv, idx) => (
              <FadeUp key={idx}>
                <div className="group cursor-pointer border-t border-black/10 pt-8 hover:border-[#a27725]/50 transition-colors duration-500">
                  <h3 className="text-2xl md:text-3xl mb-4 font-light text-[#1a1a1a] group-hover:text-[#a27725] transition-colors">{srv.title}</h3>
                  <p className="text-[#1a1a1a]/60 font-light leading-relaxed text-lg">
                    {srv.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* FEATURED */}
        <section className="py-16 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 px-6 md:px-10 max-w-[1400px] mx-auto items-center">
          <div className="relative overflow-hidden rounded-2xl group">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700 z-10"></div>
            <Image
              src="/images/featured.jpg"
              alt="Featured project"
              width={800}
              height={800}
              className="project-img w-full h-[400px] md:h-[700px] object-cover transition-transform duration-[20s] group-hover:scale-105"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-[#a27725] mb-6 uppercase">
              Featured Project
            </p>
            <h2 className="text-4xl md:text-6xl font-light mb-8">Modern <span className="italic serif text-[#a27725]">Elegance</span></h2>
            <p className="text-[#1a1a1a]/70 mt-6 text-lg font-light leading-relaxed">
              This project explores contrast — warm wood textures paired with sculptural
              lighting and soft neutral fabrics.
            </p>
            <p className="text-[#1a1a1a]/70 mt-6 text-lg font-light leading-relaxed">
              The result is a space that feels grounded, intimate, and quietly luxurious.
            </p>
            <button className="mt-12 px-8 py-3 border border-black/20 rounded-full text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-500">
              View Project
            </button>
          </div>
        </section>

        {/* PROJECT GRID */}
        <section id="projects" className="py-16 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              ["project1.jpg", "Private Residence — Mumbai"],
              ["project2.jpg", "Luxury Villa — Dubai"],
              ["project3.jpg", "Penthouse — Bangalore"],
            ].map(([img, title], i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  <Image
                    src={`/images/${img}`}
                    alt={title}
                    width={800}
                    height={600}
                    className="project-img w-full h-[320px] md:h-[500px] object-cover transition-transform duration-[10s] group-hover:scale-105"
                  />
                </div>
                <p className="text-sm md:text-base text-[#1a1a1a]/80 font-light tracking-wide group-hover:text-[#a27725] transition-colors">{title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HORIZONTAL MATERIALS */}
        <section id="materials" className="hidden md:block relative overflow-hidden bg-white border-y border-black/5">
          <div
            ref={containerRef}
            className="horizontal-wrapper flex w-[400vw] h-screen will-change-transform"
          >
            {/* PANEL 1 */}
            <div className="w-screen h-screen flex items-center justify-center relative">
              <div className="text-center z-10">
                <p className="text-sm tracking-[0.3em] text-[#a27725] mb-8 uppercase">The Essentials</p>
                <h2 className="text-6xl md:text-8xl mb-8 font-light">
                  Material <span className="italic serif text-[#a27725]">Palette</span>
                </h2>
                <p className="text-[#1a1a1a]/60 max-w-xl mx-auto text-xl font-light">
                  A curated exploration of textures, finishes, and tones that define our spaces.
                </p>
              </div>
            </div>

            {/* PANEL 2 — WOOD */}
            <div className="w-screen h-screen flex items-center justify-center">
              <div className="max-w-6xl w-full px-10">
                <h3 className="text-4xl md:text-5xl mb-16 text-center font-light">
                  Natural <span className="italic serif text-[#a27725]">Wood</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-10">
                  {[1,2,3].map((num) => (
                    <div key={num} className="overflow-hidden rounded-2xl group cursor-pointer relative">
                      <div className="absolute inset-0 border border-black/5 rounded-2xl z-20 pointer-events-none group-hover:border-[#a27725]/50 transition-colors duration-500"></div>
                      <Image
                        src={`/images/wood${num}.jpg`}
                        alt="Wood texture"
                        width={600}
                        height={600}
                        className="material-img w-full aspect-square object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PANEL 3 — LEATHER */}
            <div className="w-screen h-screen flex items-center justify-center">
              <div className="max-w-6xl w-full px-10">
                <h3 className="text-4xl md:text-5xl mb-16 text-center font-light">
                  Refined <span className="italic serif text-[#a27725]">Leather</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-10">
                  {[1,2,3].map((num) => (
                    <div key={num} className="overflow-hidden rounded-2xl group cursor-pointer relative">
                      <div className="absolute inset-0 border border-black/5 rounded-2xl z-20 pointer-events-none group-hover:border-[#a27725]/50 transition-colors duration-500"></div>
                      <Image
                        src={`/images/leather${num}.jpg`}
                        alt="Leather texture"
                        width={600}
                        height={600}
                        className="material-img w-full aspect-square object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PANEL 4 — STONE */}
            <div className="w-screen h-screen flex items-center justify-center">
              <div className="max-w-6xl w-full px-10">
                <h3 className="text-4xl md:text-5xl mb-16 text-center font-light">
                  Stone & <span className="italic serif text-[#a27725]">Marble</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-10">
                  {[1,2,3].map((num) => (
                    <div key={num} className="overflow-hidden rounded-2xl group cursor-pointer relative">
                      <div className="absolute inset-0 border border-black/5 rounded-2xl z-20 pointer-events-none group-hover:border-[#a27725]/50 transition-colors duration-500"></div>
                      <Image
                        src={`/images/stone${num}.jpg`}
                        alt="Stone texture"
                        width={600}
                        height={600}
                        className="material-img w-full aspect-square object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE MATERIALS */}
        <section id="materials-mobile" className="md:hidden py-20 px-6 bg-white border-y border-black/5">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.2em] text-[#a27725] mb-6 uppercase">The Essentials</p>
            <h2 className="text-4xl mb-6 font-light">
               Material <span className="italic serif text-[#a27725]">Palette</span>
            </h2>
            <p className="text-[#1a1a1a]/60 max-w-md mx-auto font-light">
              A curated exploration of textures, finishes, and tones that define our spaces.
            </p>
          </div>

          {[
            { id: "Wood", name: "Natural Wood", pre: "wood" },
            { id: "Leather", name: "Refined Leather", pre: "leather" },
            { id: "Stone", name: "Stone & Marble", pre: "stone" }
          ].map((mat, mIdx) => (
            <div key={mIdx} className="mb-20">
              <h3 className="text-3xl mb-10 text-center font-light">
                {mat.name.split(' ')[0]} <span className="italic serif text-[#a27725]">{mat.name.split(' ').slice(1).join(' ')}</span>
              </h3>
              <div className="grid grid-cols-1 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="overflow-hidden rounded-2xl relative border border-black/5">
                    <Image
                      src={`/images/${mat.pre}${n}.jpg`}
                      alt={`${mat.id} texture`}
                      width={600}
                      height={400}
                      className="material-img w-full h-[300px] object-cover opacity-90"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* TRUST */}
        <section className="py-24 md:py-40 text-center px-6">
          <p className="text-xs tracking-[0.3em] text-[#a27725] mb-16 uppercase">
            Selected Collaborations & Explorations
          </p>
          <div className="flex justify-center items-center gap-12 md:gap-32 flex-wrap max-w-[1400px] mx-auto">
            {[1, 2, 3, 4].map(i => (
              <img
                key={i}
                src={`/images/client${i}.png`}
                className="h-12 md:h-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500"
              />
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section id="insights" className="py-16 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light border-b border-black/10 pb-12">
            Latest <span className="italic serif text-[#a27725]">Insights</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
            {posts.map((post, i) => (
              <FadeUp key={i}>
                <div className="group cursor-pointer">
                  <p className="text-xs text-[#a27725] mb-4 uppercase tracking-[0.2em]">Insight / Insight</p>
                  <h3 className="text-2xl mb-6 font-light group-hover:text-[#a27725] transition-colors">{post.title}</h3>
                  <div
                    className="text-[#1a1a1a]/60 font-light leading-relaxed text-lg line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <div className="mt-8 uppercase text-xs tracking-widest border-b border-black/20 pb-2 inline-block group-hover:border-[#a27725] transition-colors">Read More</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 md:py-48 text-center px-6 md:px-10 bg-white border-y border-black/5">
          <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light">
            Client <span className="italic serif text-[#a27725]">Experiences</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[1200px] mx-auto">
            <div className="bg-[#fcfbf9] border border-black/5 p-12 md:p-16 rounded-3xl text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-8xl text-black/5 font-serif leading-none rotate-180">"</div>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-[#1a1a1a]/90 relative z-10">
                "The team transformed our space into something beyond what we imagined.
                Every detail feels intentional and refined."
              </p>
              <p className="mt-10 text-sm tracking-widest text-[#a27725] uppercase">Ananya Sharma</p>
            </div>
            <div className="bg-[#fcfbf9] border border-black/5 p-12 md:p-16 rounded-3xl text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-8xl text-black/5 font-serif leading-none rotate-180">"</div>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-[#1a1a1a]/90 relative z-10">
                "Working with Laminate Gallery was effortless. Their understanding of materials
                and lighting is exceptional."
              </p>
              <p className="mt-10 text-sm tracking-widest text-[#a27725] uppercase">Rahul Mehta</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-32 md:py-64 relative overflow-hidden text-center px-6 md:px-10">
          <div className="absolute inset-0 bg-white -z-10" />
          <h2 className="text-5xl md:text-8xl mb-10 font-light text-[#1a1a1a]">
            Let's Create Something<br className="hidden md:block" /> <span className="italic serif text-[#a27725]">Exceptional</span>
          </h2>
          <p className="text-[#1a1a1a]/70 max-w-2xl mx-auto mb-16 text-xl font-light leading-relaxed">
            Whether you're designing a new space or redefining an existing one, we bring
            clarity, craftsmanship, and character to every project.
          </p>
          <button className="px-12 py-5 bg-[#a27725] text-white rounded-full font-medium tracking-widest uppercase hover:bg-black transition-colors duration-500 hover:shadow-[0_0_40px_rgba(162,119,37,0.3)]">
            Start Your Project
          </button>
        </section>
      </main>
    </>
  );
}
