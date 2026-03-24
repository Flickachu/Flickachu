"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ ADDED
import Navbar from "./components/Navbar";
import FadeUp from "./components/FadeUp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "./components/SectionNav";


gsap.registerPlugin(ScrollTrigger);

async function getPosts() {
  return [
    {
      title: "The Art of Material Harmony",
      slug: "material-harmony",
      excerpt: "Exploring how textures, tones, and finishes come together to create balanced interiors."
    },
    {
      title: "Designing for Emotional Impact",
      slug: "emotional-design",
      excerpt: "How thoughtful design decisions influence how a space feels, not just how it looks."
    },
    {
      title: "Timeless vs Trend-Driven Spaces",
      slug: "timeless-design",
      excerpt: "Understanding the balance between contemporary trends and enduring design principles."
    }
  ];
}

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const pathname = usePathname(); // ✅ ADDED
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ BARBA-STYLE RESET (ONLY ADDITION)
  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // FETCH POSTS
      getPosts().then(setPosts);

      // HERO PARALLAX
      gsap.to(".hero-img", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-img",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // IMAGE ZOOM
      gsap.utils.toArray(".project-img").forEach((img: any) => {
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });

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
      scrub: true,
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
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });

    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };

  }, []);

return (
  <>
    <SectionNav />

    <main className="bg-[#f6f3ee] text-[#1a1a1a]">
      <Navbar />

  {/* HERO */}
<section id="hero" className="relative h-screen flex items-center overflow-hidden">
  <Image
    src="/images/hero.jpg"
    alt="Hero"
    fill
    priority
    className="hero-img object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10 max-w-[1400px] mx-auto px-10 w-full">
    <FadeUp>
      <div className="max-w-2xl md:ml-20 text-left">

        {/* HEADLINE */}
        <h1 className="text-6xl md:text-[88px] leading-[1.05] text-white tracking-[-0.02em]">
          We design spaces<br />
          you <span className="italic serif">remember</span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-white/70 mt-6 max-w-md leading-relaxed text-lg">
          Thoughtfully designed interiors and bespoke furniture pieces that turn
          everyday living into a refined, sensory experience.
        </p>

        {/* CTA */}
        <Link href="/consultation">
          <button className="relative mt-10 px-8 py-4 border border-white/30 rounded-full text-white overflow-hidden group transition-all duration-300">
            
            <span className="relative z-10 tracking-wide">
              Start Your Project
            </span>

            {/* subtle hover layer */}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"></span>

          </button>
        </Link>

      </div>
    </FadeUp>
  </div>
</section>

    {/* EDITORIAL */}
    <section className="py-40 text-center max-w-3xl mx-auto px-6">
      <FadeUp>
        <p className="text-3xl leading-relaxed">
          We believe design is not just visual — it is{" "}
          <span className="italic serif">something you experience</span>.
        </p>

        {/* ✅ ADDED */}
        <p className="text-lg text-gray-600 mt-8">
          From the warmth of materials to the flow of light, every detail is curated
          to create spaces that feel effortless, refined, and deeply personal.
        </p>
      </FadeUp>
    </section>

    {/* ABOUT */}
    <section id="about" className="py-40 max-w-[1400px] mx-auto px-10 grid md:grid-cols-2 gap-28 items-center">
      <Image
  src="/images/about.jpg"
  alt="About"
  width={800}
  height={600}
  className="rounded-2xl h-[400px] object-cover"
/>
      <div>
        <h2 className="text-5xl mb-6">About <span className="italic serif">Us</span></h2>

        {/* ✅ REPLACED */}
        <p className="text-gray-600 mb-6">
          Laminate Gallery began as a passion project exploring the intersection of
          architecture, furniture, and emotional design.
        </p>

        {/* ✅ ADDED */}
        <p className="text-gray-600">
          Today, it stands as a studio dedicated to crafting interiors that balance
          modern aesthetics with timeless sensibilities — spaces that don’t just look
          beautiful, but feel complete.
        </p>
      </div>
    </section>

    {/* STATS */}
    <section className="py-32 bg-white text-center grid md:grid-cols-4 gap-12">
      {[
        ["12+", "Years of Experience"],
        ["85+", "Projects Completed"],
        ["30+", "Cities Covered"],
        ["100%", "Client Satisfaction"],
      ].map(([n, label], i) => (
        <FadeUp key={i}>
          <div>
            <h3 className="text-4xl">{n}</h3>
            <p className="text-xs tracking-wide text-gray-500 mt-2 uppercase">
              {label}
            </p>
          </div>
        </FadeUp>
      ))}
    </section>

    {/* IMAGE BREAK */}
    <section className="relative h-[80vh] overflow-hidden">
      <Image
  src="/images/project1.jpg"
  alt="Project"
  fill
  className="project-img object-cover"
/>

      {/* ✅ UPGRADED */}
      <div className="absolute bottom-10 left-10 text-white max-w-md">
        <p className="text-xs tracking-widest mb-2 opacity-70">
          SPATIAL STUDY
        </p>
        <h2 className="text-3xl">Sculptural Comfort</h2>
        <p className="text-sm opacity-80 mt-2">
          Exploring bold forms and soft textures in a modern living space.
        </p>
      </div>
    </section>

    {/* ✅ NEW SECTION (Services — inserted, nothing broken) */}
<section id="services" className="py-40 px-10 max-w-[1400px] mx-auto">      <h2 className="text-5xl mb-16">
        Our <span className="italic serif">Services</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-16">
        <div>
          <h3 className="text-xl mb-2">Interior Design</h3>
          <p className="text-gray-600">
            Full-space concepts that blend spatial flow, lighting, and material harmony.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Custom Furniture</h3>
          <p className="text-gray-600">
            Bespoke pieces designed to complement architecture and lifestyle.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Turnkey Projects</h3>
          <p className="text-gray-600">
            End-to-end execution from concept to completion with precision.
          </p>
        </div>
      </div>
    </section>

    {/* FEATURED */}
    <section className="py-40 grid md:grid-cols-2 gap-20 px-10">
      <Image
  src="/images/featured.jpg"
  alt="Featured project"
  width={800}
  height={600}
  className="project-img rounded-2xl h-[500px] object-cover"
/>

      <div>
        {/* ✅ ADDED */}
        <p className="text-xs tracking-widest text-gray-400 mb-4">
          FEATURED PROJECT
        </p>

        <h2 className="text-5xl">Modern <span className="italic serif">Elegance</span></h2>

        {/* ✅ ADDED */}
        <p className="text-gray-600 mt-6">
          This project explores contrast — warm wood textures paired with sculptural
          lighting and soft neutral fabrics.
        </p>

        <p className="text-gray-600 mt-4">
          The result is a space that feels grounded, intimate, and quietly luxurious.
        </p>

        <button className="mt-6 px-6 py-3 border rounded-full">
          View Project
        </button>
      </div>
    </section>

    {/* PROJECT GRID */}
<section id="projects" className="py-40 grid md:grid-cols-3 gap-12 px-10">
        {[
        ["project1.jpg", "Private Residence — Mumbai"],
        ["project2.jpg", "Luxury Villa — Dubai"],
        ["project3.jpg", "Penthouse — Bangalore"],
      ].map(([img, title], i) => (
        <div key={i}>
          <div className="overflow-hidden rounded-2xl">
            <Image
  src={`/images/${img}`}
  alt={title}
  width={800}
  height={600}
  className="project-img h-[420px] object-cover"
/>
          </div>
          <p className="mt-4 text-sm text-gray-600">{title}</p>
        </div>
      ))}
    </section>

<section id="materials" className="relative overflow-hidden">
    <div
  ref={containerRef}
  className="horizontal-wrapper flex w-[400vw] h-screen will-change-transform"
>

    {/* PANEL 1 */}
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-5xl mb-6">
          Material <span className="italic serif">Palette</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          A curated exploration of textures, finishes, and tones that define our spaces.
        </p>
      </div>
    </div>

    {/* PANEL 2 — WOOD */}
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full px-10">
        <h3 className="text-3xl mb-10 text-center">
          Natural <span className="italic serif">Wood</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/wood1.jpg"
              alt="Wood texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/wood2.jpg"
              alt="Wood texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/wood3.jpg"
              alt="Wood texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    {/* PANEL 3 — LEATHER */}
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full px-10">
        <h3 className="text-3xl mb-10 text-center">
          Refined <span className="italic serif">Leather</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/leather1.jpg"
              alt="Leather texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/leather2.jpg"
              alt="Leather texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/leather3.jpg"
              alt="Leather texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    {/* PANEL 4 — STONE */}
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full px-10">
        <h3 className="text-3xl mb-10 text-center">
          Stone & <span className="italic serif">Marble</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/stone1.jpg"
              alt="Stone texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/stone2.jpg"
              alt="Stone texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/stone3.jpg"
              alt="Stone texture"
              width={600}
              height={400}
              className="material-img w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

    {/* TRUST */}
    <section className="py-32 text-center">
  <p className="text-xs tracking-[0.3em] text-gray-400 mb-16">
    SELECTED COLLABORATIONS & EXPLORATIONS
  </p>

  <div className="flex justify-center items-center gap-30 flex-wrap">
    {[1,2,3,4].map(i=>(
      <img
        key={i}
        src={`/images/client${i}.png`}
        className="h-16 md:h-20 opacity-80 grayscale transition duration-300 hover:grayscale-0 hover:opacity-100"
      />
    ))}
  </div>
</section>

    {/* BLOG */}
    <section id="insights" className="py-40 px-10">
      <h2 className="text-5xl mb-20">
        Latest <span className="italic serif">Insights</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-16">
        {posts.map((post, i) => (
          <FadeUp key={i}>
            <div>
              <p className="text-xs text-gray-400 mb-2 uppercase">Insight</p>
              <h3 className="text-xl mb-3">{post.title}</h3>
              <div
                className="text-gray-500 text-sm"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="py-40 text-center">
      <h2 className="text-5xl mb-20">
        Client <span className="italic serif">Experiences</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
        <div className="bg-white p-10 rounded-2xl text-left">
          “The team transformed our space into something beyond what we imagined.
          Every detail feels intentional and refined.”
          <p className="mt-6 text-sm text-gray-500">Ananya Sharma</p>
        </div>

        <div className="bg-white p-10 rounded-2xl text-left">
          “Working with Laminate Gallery was effortless. Their understanding of materials
          and lighting is exceptional.”
          <p className="mt-6 text-sm text-gray-500">Rahul Mehta</p>
        </div>
      </div>
    </section>

    {/* CTA */}
<section id="contact" className="py-40 bg-black text-white text-center">      <h2 className="text-5xl mb-6">
        Let’s Create Something <span className="italic serif">Exceptional</span>
      </h2>

      {/* ✅ ADDED */}
      <p className="text-white/70 max-w-xl mx-auto mb-8">
        Whether you're designing a new space or redefining an existing one, we bring
        clarity, craftsmanship, and character to every project.
      </p>

      <button className="px-8 py-4 bg-white text-black rounded-full">
        Start Your Project
      </button>
    </section>

  </main>
  </>
);
}