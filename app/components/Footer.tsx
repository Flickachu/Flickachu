"use client";

import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export default function Footer({ settings }: { settings?: any }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio") || pathname.startsWith("/sanity")) return null;

  return (
    <footer className="bg-[#0f0f0f] text-white pt-28 pb-10 px-10">

      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-16">

        {/* BRAND */}
        <div>
          <NavLink
            href="/"
            className="cursive text-3xl leading-none tracking-wide mb-3 block"
          >
            {settings?.brandName || "Laminate Gallery"}
          </NavLink>

          <p className="text-sm text-gray-400 leading-relaxed max-w-xs whitespace-pre-wrap">
            {settings?.footerDescription || "Crafting timeless interiors and bespoke furniture with a focus on detail,\nmateriality, and emotion."}
          </p>
        </div>

        {/* STUDIO */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 mb-6 uppercase">
            Studio
          </p>

          <ul className="space-y-3 text-sm text-gray-300">
            {(settings?.studioLinks || [
              { label: "About", link: "/about" },
              { label: "Products", link: "/products" },
              { label: "Projects", link: "/projects" },
              { label: "Insights", link: "/insights" }
            ]).map((nav: { label: string; link: string }, i: number) => (
              <li key={i}>
                <NavLink href={nav.link || "#"} className="hover:text-white transition">
                  {nav.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 mb-6 uppercase">
            Connect
          </p>

          <ul className="space-y-3 text-sm text-gray-300">
            {(settings?.connectLinks || [
              { label: "Contact", link: "/contact" },
              { label: "Instagram", link: "#" },
              { label: "LinkedIn", link: "#" }
            ]).map((nav: { label: string; link: string }, i: number) => (
              <li key={i}>
                <NavLink href={nav.link || "#"} className="hover:text-white transition">
                  {nav.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 mb-6 uppercase">
            Contact
          </p>

          <div className="text-sm text-gray-300 space-y-2">
            <p>{settings?.address || "Pune, India"}</p>
            <p>{settings?.email || "hello@laminategallery.com"}</p>
            <p>{settings?.phone || "+91 98765 43210"}</p>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10 mt-16 pt-6 flex justify-between items-center text-sm text-gray-500">

        <p>{settings?.copyrightText || "© 2026 Laminate Gallery. All rights reserved."}</p>

        <p className="hidden md:block">Designed & Developed by DesignXninja</p>

      </div>

    </footer>
  );
}