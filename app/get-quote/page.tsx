"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";

export default function QuotePage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a]">

      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">

        <img
          src="/images/project3.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-10 text-white">
          <FadeUp>
            <h1 className="text-7xl md:text-[90px] max-w-4xl">
              Start Your <span className="italic serif">Project</span>
            </h1>

            <p className="mt-6 text-white/70 max-w-xl">
              Tell us about your space, your vision, and your requirements.
              We’ll craft a tailored solution for you.
            </p>
          </FadeUp>
        </div>

      </section>

      {/* FORM */}
      <section className="py-32 px-10 max-w-[900px] mx-auto">

        <FadeUp>
          <form className="space-y-10">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                type="tel"
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none"
              />
            </div>

            {/* PROJECT TYPE */}
            <div>
              <label className="text-sm text-gray-500">Project Type</label>
              <select className="w-full border-b border-gray-300 py-3 bg-transparent outline-none">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Furniture Design</option>
              </select>
            </div>

            {/* BUDGET */}
            <div>
              <label className="text-sm text-gray-500">Estimated Budget</label>
              <select className="w-full border-b border-gray-300 py-3 bg-transparent outline-none">
                <option>₹2L – ₹5L</option>
                <option>₹5L – ₹10L</option>
                <option>₹10L+</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm text-gray-500">Project Details</label>
              <textarea
                rows={4}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none"
                placeholder="Tell us about your space, style, timeline..."
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="mt-6 px-8 py-4 border rounded-full hover:bg-black hover:text-white transition"
            >
              Request Quote
            </button>

          </form>
        </FadeUp>

      </section>

    </main>
  );
}