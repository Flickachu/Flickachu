"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeUp from "./FadeUp";
import { urlFor } from "@/sanity/lib/image";
import SectionNav from "./SectionNav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LegacyHomeSections({ posts, featuredProject }: any) {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [quickEmail, setQuickEmail] = useState("");
  const [quickStatus, setQuickStatus] = useState<"idle" | "loading" | "success">("idle");

  const featuredTitle = featuredProject?.title || "Modern Elegance";
  const [featuredLeadWord, ...featuredTailWords] = featuredTitle.split(" ");
  const featuredTail = featuredTailWords.join(" ") || "Elegance";
  
  const getSlugString = (slugField: any) => {
    if (!slugField) return "";
    return typeof slugField === "string" ? slugField : slugField.current;
  };
  
  const featuredSlug = getSlugString(featuredProject?.slug);
  const featuredHref = featuredSlug ? `/projects/${featuredSlug}` : "/projects";

  const handleQuickLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail) return;
    setQuickStatus("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: quickEmail, source: "homepage_cta", page: "/" }),
      });
      setQuickStatus("success");
      setQuickEmail("");
      setTimeout(() => setQuickStatus("idle"), 5000);
    } catch {
      setQuickStatus("idle");
    }
  };

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
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
      gsap.utils.toArray<HTMLElement>(".material-img").forEach((img) => {
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

      // STACKING CARDS
      gsap.utils.toArray<HTMLElement>(".stack-card").forEach((card, i, arr) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top ${10 + i * 2}%`,
          endTrigger: "#process",
          end: `bottom bottom`,
          pin: true,
          pinSpacing: false,
        });

        if (arr.length - 1 === i) return;
        gsap.to(card, {
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: arr[i + 1],
            start: "top bottom",
            end: `top ${10 + (i + 1) * 2}%`,
            scrub: true,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {isDesktop && <SectionNav />}

      {/* FEATURED */}
      <section className="py-16 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 px-6 md:px-10 max-w-[1400px] mx-auto items-center">
        <div className="relative overflow-hidden rounded-2xl group">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700 z-10"></div>
          {featuredProject?.hero ? (
            <Image
              src={urlFor(featuredProject.hero).width(1200).height(1200).url()}
              alt={featuredTitle}
              width={1200}
              height={1200}
              className="project-img w-full h-[400px] md:h-[700px] object-cover transition-transform duration-[20s] group-hover:scale-105"
            />
          ) : (
            <Image
              src="/images/featured.jpg"
              alt="Featured project"
              width={800}
              height={800}
              className="project-img w-full h-[400px] md:h-[700px] object-cover transition-transform duration-[20s] group-hover:scale-105"
            />
          )}
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-[#a27725] mb-6 uppercase">
            Featured Project
          </p>
          <h2 className="text-4xl md:text-6xl font-light mb-8">
            {featuredLeadWord} <span className="italic serif text-[#a27725]">{featuredTail}</span>
          </h2>
          {featuredProject?.description ? (
            <p className="text-[#1a1a1a]/70 mt-6 text-lg font-light leading-relaxed">
              {featuredProject.description}
            </p>
          ) : (
            <p className="text-[#1a1a1a]/70 mt-6 text-lg font-light leading-relaxed">
            This project explores contrast — warm wood textures paired with sculptural
            lighting and soft neutral fabrics.
            </p>
          )}
          <Link href={featuredHref} className="inline-block mt-12 px-8 py-3 border border-black/20 rounded-full text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-500">
            View Project
          </Link>
        </div>
      </section>

      {/* STACKING PROCESS CARDS */}
      <section id="process" className="py-24 md:py-40 bg-white text-[#1a1a1a] px-6 md:px-10 relative">
        <div className="max-w-[1200px] mx-auto relative process-container">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-xs tracking-[0.3em] text-[#a27725] mb-6 uppercase">How we work</p>
            <h2 className="text-4xl md:text-6xl font-light">
              Our <span className="italic serif text-[#a27725]">Process</span>
            </h2>
            <p className="text-[#1a1a1a]/60 mt-6 max-w-xl mx-auto font-light text-lg">
              A meticulous, step-by-step approach to transforming your vision into a refined reality.
            </p>
          </div>

          <div className="relative">
            {[
              {
                step: "01", title: "Discovery & Vision",
                desc: "We begin by understanding your lifestyle, aesthetic preferences, and the inherent character of your space.",
                img: "project1.jpg",
                bg: "bg-[#fcfbf9]"
              },
              {
                step: "02", title: "Concept & Curation",
                desc: "Our team develops a comprehensive design narrative, curating material palettes, furniture plans, and lighting concepts.",
                img: "wood2.jpg",
                bg: "bg-[#f6f3ee]"
              },
              {
                step: "03", title: "Refinement & Details",
                desc: "Every element is meticulously reviewed and refined, ensuring harmony between architecture, interiors, and custom pieces.",
                img: "featured.jpg",
                bg: "bg-white"
              },
              {
                step: "04", title: "Realization",
                desc: "We oversee the precise execution of the design, from construction to the final styling of objects and art.",
                img: "project3.jpg",
                bg: "bg-[#fcfbf9]"
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`stack-card min-h-[50vh] md:min-h-[60vh] mb-12 md:mb-24 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-black/5 will-change-transform origin-top ${item.bg}`}
              >
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                  <span className="text-[#a27725] tracking-[0.2em] text-sm md:text-base mb-6 font-light uppercase">Phase {item.step}</span>
                  <h3 className="text-3xl md:text-5xl font-light mb-6 md:mb-8">{item.title}</h3>
                  <p className="text-[#1a1a1a]/60 text-lg font-light leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-full md:w-1/2 h-[30vh] md:h-auto relative">
                  <Image
                    src={`/images/${item.img}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL MATERIALS */}
      <section id="materials" className="hidden md:block relative overflow-hidden bg-white">
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
                {[1, 2, 3].map((num) => (
                  <div key={num} className="overflow-hidden rounded-2xl group cursor-pointer relative">
                    <div className="absolute inset-0 border border-black/5 rounded-2xl z-20 pointer-events-none group-hover:border-[#a27725]/50 transition-colors duration-500"></div>
                    <Image
                      src={`/images/wood${num}.jpg`}
                      alt="Wood texture"
                      width={600}
                      height={600}
                      className="material-img w-full aspect-square object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
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
                {[1, 2, 3].map((num) => (
                  <div key={num} className="overflow-hidden rounded-2xl group cursor-pointer relative">
                    <div className="absolute inset-0 border border-black/5 rounded-2xl z-20 pointer-events-none group-hover:border-[#a27725]/50 transition-colors duration-500"></div>
                    <Image
                      src={`/images/leather${num}.jpg`}
                      alt="Leather texture"
                      width={600}
                      height={600}
                      className="material-img w-full aspect-square object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
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
                {[1, 2, 3].map((num) => (
                  <div key={num} className="overflow-hidden rounded-2xl group cursor-pointer relative">
                    <div className="absolute inset-0 border border-black/5 rounded-2xl z-20 pointer-events-none group-hover:border-[#a27725]/50 transition-colors duration-500"></div>
                    <Image
                      src={`/images/stone${num}.jpg`}
                      alt="Stone texture"
                      width={600}
                      height={600}
                      className="material-img w-full aspect-square object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE MATERIALS */}
      <section id="materials-mobile" className="md:hidden py-20 px-6 bg-white">
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

      {/* TRUST / MARQUEE */}
      <section className="py-20 md:py-32 overflow-hidden bg-white">
        <p className="text-xs tracking-[0.3em] text-[#a27725] mb-16 text-center uppercase">
          Selected Collaborations & Explorations
        </p>
        <div className="relative flex overflow-x-hidden w-full">
          <div className="flex w-max animate-marquee">
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex flex-nowrap items-center gap-20 md:gap-40 pr-20 md:pr-40">
                {[
                  "https://placehold.co/500x120/transparent/1a1a1a/?text=ARCHITECTURAL+DIGEST&font=playfair-display",
                  "https://placehold.co/300x120/transparent/1a1a1a/?text=VOGUE&font=playfair-display",
                  "https://placehold.co/300x120/transparent/1a1a1a/?text=ELLE+DECOR&font=playfair-display",
                  "https://placehold.co/300x120/transparent/1a1a1a/?text=GQ&font=playfair-display",
                  "https://placehold.co/400x120/transparent/1a1a1a/?text=HARPER'S+BAZAAR&font=playfair-display"
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`Partner Logo ${i}`}
                    width={300}
                    height={120}
                    unoptimized
                    className="h-8 md:h-12 w-auto opacity-40 hover:opacity-100 transition duration-500 object-contain min-w-[120px] max-w-[240px]"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="insights" className="py-16 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light border-b border-black/10 pb-12">
          Latest <span className="italic serif text-[#a27725]">Insights</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          {(posts || []).map((post: any, i: number) => (
            <FadeUp key={i}>
              <Link href={`/posts/${post.slug}`} className="group cursor-pointer block">
                <p className="text-xs text-[#a27725] mb-4 uppercase tracking-[0.2em]">Insight / Insight</p>
                <h3 className="text-2xl mb-6 font-light group-hover:text-[#a27725] transition-colors">{post.title}</h3>
                <p className="text-[#1a1a1a]/60 font-light leading-relaxed text-lg line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-8 uppercase text-xs tracking-widest border-b border-black/20 pb-2 inline-block group-hover:border-[#a27725] transition-colors">Read More</div>
              </Link>
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
            <div className="absolute top-0 right-0 p-8 text-8xl text-black/5 font-serif leading-none rotate-180">&quot;</div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#1a1a1a]/90 relative z-10">
              &quot;The team transformed our space into something beyond what we imagined.
              Every detail feels intentional and refined.&quot;
            </p>
            <p className="mt-10 text-sm tracking-widest text-[#a27725] uppercase">Ananya Sharma</p>
          </div>
          <div className="bg-[#fcfbf9] border border-black/5 p-12 md:p-16 rounded-3xl text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-8xl text-black/5 font-serif leading-none rotate-180">&quot;</div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#1a1a1a]/90 relative z-10">
              &quot;Working with Laminate Gallery was effortless. Their understanding of materials
              and lighting is exceptional.&quot;
            </p>
            <p className="mt-10 text-sm tracking-widest text-[#a27725] uppercase">Rahul Mehta</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-32 md:py-48 relative overflow-hidden text-center px-6 md:px-10">
        <div className="absolute inset-0 bg-white -z-10" />
        <h2 className="text-5xl md:text-8xl mb-10 font-light text-[#1a1a1a] tracking-tight">
          Let&apos;s Create Something<br className="hidden md:block" /> <span className="italic serif text-[#a27725]">Exceptional</span>
        </h2>
        <p className="text-[#1a1a1a]/70 max-w-2xl mx-auto mb-16 text-xl font-light leading-relaxed">
          Whether you&apos;re designing a new space or redefining an existing one, we bring
          clarity, craftsmanship, and character to every project.
        </p>

        <div className="max-w-md mx-auto relative">
          <form onSubmit={handleQuickLead} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              required
              value={quickEmail}
              onChange={(e) => setQuickEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-black/20 outline-none focus:border-black transition"
            />
            <button
              type="submit"
              aria-label="Submit lead form"
              disabled={quickStatus === "loading" || quickStatus === "success"}
              className="px-8 py-4 bg-[#a27725] text-white rounded-full font-medium tracking-widest uppercase hover:bg-black transition-colors duration-500 disabled:opacity-50"
            >
              {quickStatus === "loading" ? "..." : quickStatus === "success" ? "Sent" : "Join"}
            </button>
          </form>
          {quickStatus === "success" && (
            <p className="text-sm text-green-700 mt-4 tracking-wide absolute w-full text-center">
              We&apos;ll be in touch shortly.
            </p>
          )}
        </div>

        <div className="mt-16">
          <Link href="/get-quote" className="text-sm tracking-widest uppercase text-[#1a1a1a]/70 hover:text-black transition border-b border-transparent hover:border-black pb-1">
            or fill out a detailed project quote
          </Link>
        </div>
      </section>
    </>
  );
}
