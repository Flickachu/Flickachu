"use client";

import NavLink from "./NavLink";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white pt-28 pb-10 px-10">

      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-16">

        {/* BRAND */}
        <div>
          <NavLink
            href="/"
            className="cursive text-3xl leading-none tracking-wide mb-3 block"
          >
            Laminate Gallery
          </NavLink>

          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Crafting timeless interiors and bespoke furniture with a focus on detail,
            materiality, and emotion.
          </p>
        </div>

        {/* STUDIO */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            Studio
          </p>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <NavLink href="/about" className="hover:text-white transition">
                About
              </NavLink>
            </li>
            <li>
              <NavLink href="/products" className="hover:text-white transition">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink href="/projects" className="hover:text-white transition">
                Projects
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            Connect
          </p>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <NavLink href="/contact" className="hover:text-white transition">
                Contact
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            Contact
          </p>

          <div className="text-sm text-gray-300 space-y-2">
            <p>Pune, India</p>
            <p>hello@laminategallery.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10 mt-16 pt-6 flex justify-between items-center text-sm text-gray-500">

        <p>© 2026 Laminate Gallery. All rights reserved.</p>

        <p className="hidden md:block">Designed & Developed by DesignXninja</p>

      </div>

    </footer>
  );
}