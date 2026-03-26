"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const FORCE_DARK_PATHS = new Set([
  "/consultation",
  "/insights",
  "/sanity-test",
  "/spaces",
]);

export default function Navbar({ forceDark = false, settings }: { forceDark?: boolean, settings?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollRef = useRef(0);
  const pathname = usePathname();

  const shouldForceDark =
    forceDark ||
    FORCE_DARK_PATHS.has(pathname) ||
    pathname.startsWith("/posts/");

  useEffect(() => {
    lastScrollRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 60);

      const aboutSection = document.getElementById("about");
      let triggerPoint = 300;

      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        triggerPoint = offsetTop + aboutSection.offsetHeight;
      }

      if (lastScrollRef.current === 0) {
        setShowNav(true);
        lastScrollRef.current = currentScroll;
        return;
      }

      if (currentScroll > lastScrollRef.current && currentScroll > triggerPoint + 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollRef.current = currentScroll;
    };

    const frame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  if (pathname.startsWith("/studio") || pathname.startsWith("/sanity")) return null;

  return (
    <>
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
          ${isScrolled || shouldForceDark ? "text-black" : "text-white"}`}
        >
          <NavLink
            href="/"
            className={`cursive text-3xl md:text-4xl leading-none tracking-wide transition-colors duration-300
            ${isScrolled || shouldForceDark ? "text-black" : "text-white"}`}
          >
            {settings?.brandName || "Laminate Gallery"}
          </NavLink>

          <nav className="hidden md:flex gap-10 text-sm tracking-wide">
            {(settings?.mainNav || [
              { label: "About", link: "/about" },
              { label: "Products", link: "/products" },
              { label: "Projects", link: "/projects" },
              { label: "Spaces", link: "/spaces" },
              { label: "Insights", link: "/insights" },
              { label: "Contact", link: "/contact" }
            ]).map((nav: { label: string; link: string }, i: number) => (
              <NavLink key={i} href={nav.link || "#"} className="hover:opacity-70 transition">
                {nav.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <NavLink
              href={settings?.ctaButton?.link || "/get-quote"}
              className={`hidden md:block px-6 py-2 rounded-full text-xs tracking-wide border transition-all duration-300
              ${isScrolled || shouldForceDark
                  ? "border-black hover:bg-black hover:text-white"
                  : "border-white hover:bg-white hover:text-black"
                }`}
            >
              {settings?.ctaButton?.label || "Get Quote"}
            </NavLink>

            <button
              aria-label="Toggle Navigation"
              aria-expanded={menuOpen}
              className={`md:hidden text-2xl transition-colors duration-300 ${
                isScrolled || shouldForceDark ? "text-black" : "text-white"
              }`}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[999] flex transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-xl transition-opacity duration-500
          ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`relative ml-auto w-full max-w-sm h-full
          bg-white/90 md:backdrop-blur-2xl border-l border-black/10
          shadow-[0_0_40px_rgba(0,0,0,0.1)]
          text-black flex flex-col items-center justify-center gap-10 text-xl tracking-wide
          transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {(settings?.mainNav || [
            { label: "About", link: "/about" },
            { label: "Products", link: "/products" },
            { label: "Projects", link: "/projects" },
            { label: "Spaces", link: "/spaces" },
            { label: "Insights", link: "/insights" },
            { label: "Contact", link: "/contact" }
          ]).map((nav: { label: string; link: string }, i: number) => (
            <NavLink key={i} href={nav.link || "#"} onClick={() => setMenuOpen(false)}>
              {nav.label}
            </NavLink>
          ))}

          <NavLink
            href={settings?.ctaButton?.link || "/get-quote"}
            className="mt-6 px-8 py-3 border border-black/40 rounded-full hover:bg-black hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            {settings?.ctaButton?.label || "Get Quote"}
          </NavLink>

          <button
            aria-label="Close Navigation"
            className="absolute top-8 right-8 text-3xl"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6l-12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
