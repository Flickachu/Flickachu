"use client";

import { useEffect, useState } from "react";
import {
  Info,
  Layers,
  Grid,
  Box,
  Mail,
  Activity,
} from "lucide-react";

const sections = [
  { id: "about", label: "About", icon: <Info size={18} /> },
  { id: "services", label: "Services", icon: <Layers size={18} /> },
  { id: "projects", label: "Projects", icon: <Grid size={18} /> },
  { id: "process", label: "Process", icon: <Activity size={18} /> },
  { id: "materials", label: "Materials", icon: <Box size={18} /> },
  { id: "contact", label: "Contact", icon: <Mail size={18} /> },
];

export default function SectionNav() {
  const [active, setActive] = useState("about");

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
        { rootMargin: "-40% 0px -40% 0px" } // Triggers when section crosses the middle of the viewport
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
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-3">
      {sections.map((section) => (
        
        // 🔥 SLOT (fixed, does NOT resize)
        <div key={section.id} className="relative w-12 h-12">

          {/* 🔥 EXPANDING PILL */}
          <button
            onClick={() => scrollTo(section.id)}
            aria-label={`Scroll to ${section.label} section`}
          className={`group absolute right-0 top-0 h-12 rounded-full flex items-center justify-end overflow-hidden transition-all duration-300 ease-out backdrop-blur-md border ${
  active === section.id
    ? "bg-blue-600 text-white border-blue-600"
    : "bg-white/30 text-black border-black/10 hover:bg-white/50"
} w-12 hover:w-[130px]`}
          >
            {/* LABEL (left side) */}
            <span className="pl-4 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
              {section.label}
            </span>

            {/* ICON (right, fixed) */}
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              {section.icon}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}