"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "materials", label: "Materials" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(section.id);
          }
        },
        {
          root: null,
          threshold: 0.6, // tweak later if needed
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.id} className="group relative flex items-center">
          
          {/* Label */}
          <span className="absolute right-10 opacity-0 group-hover:opacity-100 transition text-sm text-white whitespace-nowrap">
            {section.label}
          </span>

          {/* Dot */}
          <button
            onClick={() => scrollTo(section.id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              active === section.id
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/60"
            }`}
          />
        </div>
      ))}
    </div>
  );
}