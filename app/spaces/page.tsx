"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";

export default function PropertyPage() {
  const [color, setColor] = useState<"red" | "green" | "blue" | "white" | "cream">("red");
  const [activeColor, setActiveColor] = useState<typeof color>("red");
  const [nextColor, setNextColor] = useState<typeof color | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const images = {
    red: "/images/living-red.jpg",
    green: "/images/living-green.jpg",
    blue: "/images/living-blue.jpg",
    white: "/images/living-white.jpg",
    cream: "/images/living-cream.jpg",
  };

  const handleColorChange = (newColor: typeof color) => {
    if (newColor === color) return;

    setActiveColor(newColor); // 🔥 instant UI feedback

    if (isAnimating) return;

    setNextColor(newColor);
    setIsAnimating(true);

    setTimeout(() => {
      setColor(newColor);
      setNextColor(null);
      setIsAnimating(false);
    }, 700);
  };
  const imageCache = useRef<Record<string, HTMLImageElement>>({});

  useEffect(() => {
    Object.entries(images).forEach(([key, src]) => {
      if (!imageCache.current[key]) {
        const img = new Image();
        img.src = src;
        imageCache.current[key] = img;
      }
    });
  }, []);
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black">

      <Navbar forceDark />

      {/* HERO */}
      <section className="pt-36 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-black/5">
        <div className="max-w-2xl">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
              Explore{" "}
              <span className="serif italic">
                Living Spaces
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-6 text-neutral-500 text-lg">
              Discover premium interiors and visualize your ideal space with our interactive configurator.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto py-32">
        <div className="flex flex-col md:grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">

          {/* HEADINGS - order 1 on mobile */}
          <div className="order-1 md:col-start-1 md:row-start-1 w-full pt-4">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                Living Room Configurator
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-neutral-500 mt-3 md:hidden">
                Change the palette and experience the transformation in real time.
              </p>
            </FadeUp>
          </div>

          {/* RIGHT IMAGE - order 2 on mobile */}
          <div className="order-2 w-full md:col-start-2 md:row-start-1 md:row-span-3">
            <FadeUp delay={0.3}>
              <div className="relative h-[340px] md:h-[640px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <img
                  src={images[color]}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Room visualization"
                />
                {nextColor && (
                  <img
                    src={images[nextColor]}
                    className="absolute inset-0 w-full h-full object-cover animate-reveal"
                    alt="Room transition"
                  />
                )}
              </div>
            </FadeUp>
          </div>

          {/* COLORS - order 3 on mobile */}
          <div className="order-3 w-full self-start md:col-start-1 md:row-start-2 mt-4">
            <FadeUp delay={0.3}>
              <p className="text-xs tracking-[0.2em] mb-8 text-neutral-400">
                COLOR PALETTE
              </p>
              <div className="flex gap-3 flex-wrap">
                {Object.keys(images).map((c) => (
                  <button
                    key={c}
                    aria-label={`Select ${c} color palette`}
                    className="relative flex flex-col items-center transition-all duration-300 hover:scale-105"
                    onClick={() => handleColorChange(c as typeof color)}
                  >
                    {activeColor === c && (
                      <span className="absolute -top-5 text-[9px] tracking-[0.15em] font-semibold text-neutral-700 uppercase whitespace-nowrap">
                        Selected
                      </span>
                    )}
                    <div
                      className={`w-11 h-11 rounded-lg overflow-hidden transition-all duration-300 ${
                        activeColor === c
                          ? "ring-[1.5px] ring-blue-600 ring-offset-[3px] ring-offset-[#f8f8f8]"
                          : "border border-black/10"
                      }`}
                    >
                      <img
                        src={`/images/picker-${c}.png`}
                        alt={`${c} swatch`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* TEXT - order 4 on mobile */}
          <div className="order-4 w-full self-end md:col-start-1 md:row-start-3 hidden md:block">
            <FadeUp delay={0.4}>
              <p className="max-w-md text-neutral-500 leading-relaxed text-lg">
                Each palette reshapes the mood of your living space.
                From bold statements to subtle elegance, explore possibilities effortlessly.
              </p>
            </FadeUp>
          </div>

          <div className="order-5 w-full md:hidden mt-2">
            <FadeUp delay={0.4}>
              <p className="text-neutral-500 leading-relaxed">
                Each palette reshapes the mood of your living space. Explore possibilities effortlessly.
              </p>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* PROPERTIES */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-40">
        <FadeUp>
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Featured Properties
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { img: "/images/property-1.jpg", title: "Modern Apartment", location: "Mumbai", slug: "modern-apartment" },
            { img: "/images/property-2.jpg", title: "Luxury Villa", location: "Goa", slug: "luxury-villa" },
            { img: "/images/property-3.jpg", title: "Minimal Studio", location: "Bangalore", slug: "minimal-studio" },
          ].map((p, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <a href={`/projects/${p.slug}`} className="group cursor-pointer block">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={p.img}
                    className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                    <span className="text-sm tracking-wide">View Project →</span>
                  </div>
                </div>
                <h3 className="mt-4 text-lg">{p.title}</h3>
                <p className="text-sm text-neutral-500">{p.location}</p>
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

    </main>
  );
}