"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const toggle = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastY;
      lastY = currentY;

      const scrollPosition = window.innerHeight + currentY;
      const pageHeight = document.body.offsetHeight;

      // Show if we're past 1.5 screen heights down
      const isPastHalf = currentY > window.innerHeight * 1.5;
      const nearFooter = scrollPosition > pageHeight - 200;

      setVisible(isPastHalf && isScrollingUp && !nearFooter);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }
      bg-white/70 text-black border-black/10 hover:bg-black hover:text-white hover:scale-105 active:scale-95`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}