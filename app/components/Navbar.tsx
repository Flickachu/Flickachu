"use client";

import { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function Navbar({ forceDark = false }: { forceDark?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // SCROLL LOGIC
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setIsScrolled(currentScroll > 60);

      const aboutSection = document.getElementById("about");

      let triggerPoint = 300;

      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        const height = aboutSection.offsetHeight;

        triggerPoint = offsetTop + height;
      }

      // 🚫 Prevent hide on initial load
      if (lastScroll === 0) {
        setShowNav(true);
        setLastScroll(currentScroll);
        return;
      }

      if (currentScroll > lastScroll && currentScroll > triggerPoint + 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // LOCK BODY SCROLL
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${showNav || menuOpen ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled
            ? "bg-white/90 md:backdrop-blur-md border-black/10 shadow-sm"
            : "bg-transparent border-transparent"
          }`}
      >
        <div
          className={`max-w-[1400px] mx-auto flex justify-between items-center px-6 md:px-10 py-5 transition-colors duration-300
          ${isScrolled || forceDark ? "text-black" : "text-white"}`}
        >
          {/* LOGO */}
          <NavLink
            href="/"
            className={`cursive text-3xl md:text-4xl leading-none tracking-wide transition-colors duration-300
            ${isScrolled || forceDark ? "text-black" : "text-white"}`}
          >
            Laminate Gallery
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-10 text-sm tracking-wide">
            <NavLink href="/about" className="hover:opacity-70 transition">
              About
            </NavLink>

            <NavLink href="/products" className="hover:opacity-70 transition">
              Products
            </NavLink>

            <NavLink href="/projects" className="hover:opacity-70 transition">
              Projects
            </NavLink>

            <NavLink href="/spaces" className="hover:opacity-70 transition">
              Spaces
            </NavLink>

            <NavLink href="/contact" className="hover:opacity-70 transition">
              Contact
            </NavLink>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* CTA */}
            <NavLink
              href="/get-quote"
              className={`hidden md:block px-6 py-2 rounded-full text-xs tracking-wide border transition-all duration-300
              ${isScrolled || forceDark
                  ? "border-black hover:bg-black hover:text-white"
                  : "border-white hover:bg-white hover:text-black"
                }`}
            >
              Get Quote
            </NavLink>

            {/* HAMBURGER */}
            <button
              aria-label="Toggle Navigation"
              aria-expanded={menuOpen}
              className={`md:hidden text-2xl transition-colors duration-300 ${isScrolled || forceDark ? "text-black" : "text-white"
                }`}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[999] flex transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* BACKDROP */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-xl transition-opacity duration-500
          ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* PANEL */}
        <div
          className={`relative ml-auto w-full max-w-sm h-full 
          bg-white/90 md:backdrop-blur-2xl border-l border-black/10
          shadow-[0_0_40px_rgba(0,0,0,0.1)]
          text-black flex flex-col items-center justify-center gap-10 text-xl tracking-wide
          transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <NavLink href="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>

          <NavLink href="/products" onClick={() => setMenuOpen(false)}>
            Products
          </NavLink>

          <NavLink href="/projects" onClick={() => setMenuOpen(false)}>
            Projects
          </NavLink>

          <NavLink href="/spaces" onClick={() => setMenuOpen(false)}>
            Spaces
          </NavLink>

          <NavLink href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>

          <NavLink
            href="/get-quote"
            className="mt-6 px-8 py-3 border border-black/40 rounded-full hover:bg-black hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Get Quote
          </NavLink>

          {/* CLOSE */}
          <button
            aria-label="Close Navigation"
            className="absolute top-8 right-8 text-3xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}