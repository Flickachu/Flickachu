"use client";
import FadeUp from "./FadeUp";

export default function Editorial({ title, highlight, description }: any) {
  return (
    <section className="py-20 md:py-48 text-center max-w-4xl mx-auto px-6 md:px-10">
      <FadeUp>
        <p className="text-3xl md:text-5xl leading-snug md:leading-tight font-light text-[#1a1a1a]">
          {title || "We believe design is not just visual — it is"}{" "}
          <span className="italic serif text-[#a27725]">{highlight || "something you experience."}</span>
        </p>
        <p className="text-lg md:text-xl text-[#1a1a1a]/60 mt-10 max-w-2xl mx-auto font-light leading-relaxed">
          {description || "From the warmth of materials to the flow of light, every detail is curated to create spaces that feel effortless, refined, and deeply personal."}
        </p>
      </FadeUp>
    </section>
  );
}
