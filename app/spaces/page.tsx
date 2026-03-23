"use client";

import { useState } from "react";
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
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-10">
            
            <div>
              <FadeUp>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                  Living Room Configurator
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-neutral-500 mt-3">
                  Change the palette and experience the transformation in real time.
                </p>
              </FadeUp>
            </div>

            {/* COLORS */}
            <FadeUp delay={0.3}>
              <div>
                <p className="text-xs tracking-[0.2em] mb-5 text-neutral-400">
                  COLOR PALETTE
                </p>

                <div className="flex gap-5">
                  {Object.keys(images).map((c) => (
                    <button
                      key={c}
                      onClick={() => handleColorChange(c as typeof color)}
                      className={`w-10 h-10 rounded-full border border-black/10 shadow-sm transition-all duration-300
                      ${
                        activeColor === c
                          ? "scale-110 ring-2 ring-neutral-400 ring-offset-2 ring-offset-[#f8f8f8]"
                          : "hover:scale-110"
                      }`}
                      style={{
                        backgroundColor:
                          c === "cream" ? "#f5f5dc" : c,
                      }}
                    />
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="max-w-md text-neutral-500 leading-relaxed">
                Each palette reshapes the mood of your living space.
                From bold statements to subtle elegance, explore possibilities effortlessly.
              </p>
            </FadeUp>

          </div>

          {/* RIGHT IMAGE */}
          <FadeUp delay={0.3}>
            <div className="relative h-[540px] md:h-[640px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

              {/* BASE IMAGE */}
              <img
                src={images[color]}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* REVEAL IMAGE */}
              {nextColor && (
                <img
                  src={images[nextColor]}
                  className="absolute inset-0 w-full h-full object-cover animate-reveal"
                />
              )}

            </div>
          </FadeUp>

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
            {
              img: "/images/property-1.jpg",
              title: "Modern Apartment",
              location: "Mumbai",
            },
            {
              img: "/images/property-2.jpg",
              title: "Luxury Villa",
              location: "Goa",
            },
            {
              img: "/images/property-3.jpg",
              title: "Minimal Studio",
              location: "Bangalore",
            },
          ].map((p, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="group cursor-pointer">
                
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

              </div>
            </FadeUp>
          ))}

        </div>

      </section>

    </main>
  );
}