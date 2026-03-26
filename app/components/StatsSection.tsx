"use client";
import FadeUp from "./FadeUp";

export default function StatsSection({ stats }: any) {
  const defaultStats = [
    { number: "12+", label: "Years of Experience" },
    { number: "85+", label: "Projects Completed" },
    { number: "30+", label: "Cities Covered" },
    { number: "100%", label: "Client Satisfaction" },
  ];
  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-24 md:py-40 border-t border-b border-black/5 bg-white text-center grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 px-6 md:px-10 my-20">
      {displayStats.map((stat: any, i: number) => (
        <FadeUp key={i}>
          <div className="relative group">
            <h3 className="text-4xl md:text-6xl font-light text-[#a27725] mb-4 group-hover:scale-105 transition-transform duration-500">
              {stat.number}
            </h3>
            <p className="text-xs md:text-sm tracking-[0.2em] text-[#1a1a1a]/70 uppercase font-light">
              {stat.label}
            </p>
          </div>
        </FadeUp>
      ))}
    </section>
  );
}
