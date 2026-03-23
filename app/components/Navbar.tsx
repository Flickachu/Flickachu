"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // background trigger
      setIsScrolled(currentScroll > 60);

      // 🔥 get About section
      const aboutSection = document.getElementById("about");

      let triggerPoint = 300; // fallback

      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        const height = aboutSection.offsetHeight;

        triggerPoint = offsetTop + height; // end of About
      }

      // 🔥 hide ONLY after About section
      if (
        currentScroll > lastScroll &&
        currentScroll > triggerPoint + 80 // small delay for smoothness
      ) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${showNav ? "translate-y-0" : "-translate-y-full"}
      ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md border-b border-black/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto flex justify-between items-center px-10 py-5 transition-colors duration-300
        ${isScrolled ? "text-black" : "text-white"}`}
      >
        {/* LOGO */}
        <Link
          href="/"
          className={`cursive text-3xl md:text-4xl leading-none tracking-wide transition-all duration-300
          ${isScrolled ? "text-black" : "text-white"}`}
        >
          Flickachu
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-10 text-sm tracking-wide">
          <a href="#about" className="hover:opacity-70 transition">
            About
          </a>
          <a href="#services" className="hover:opacity-70 transition">
            Services
          </a>
          <a href="#projects" className="hover:opacity-70 transition">
            Projects
          </a>
          <a href="#contact" className="hover:opacity-70 transition">
            Contact
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className={`px-6 py-2 rounded-full text-xs tracking-wide border transition-all duration-300
          ${
            isScrolled
              ? "border-black hover:bg-black hover:text-white"
              : "border-white hover:bg-white hover:text-black"
          }`}
        >
          Get Quote
        </a>
      </div>
    </header>
  );
}