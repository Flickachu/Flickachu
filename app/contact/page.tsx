"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image"; // ✅ ADDED

export default function ContactPage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a]">

      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">

        <Image
          src="/images/hero.jpg"
          alt="Contact hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-10 text-white">
          <FadeUp>
            <h1 className="text-7xl md:text-[90px] max-w-4xl">
              Let’s <span className="italic serif">Talk</span>
            </h1>

            <p className="mt-6 text-white/70 max-w-xl">
              Whether you’re starting a new project or refining an existing space,
              we’d love to hear from you.
            </p>
          </FadeUp>
        </div>

      </section>

      {/* CONTACT SECTION */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20">

        {/* LEFT INFO */}
        <FadeUp>
          <div>
            <h2 className="text-4xl mb-6">
              Get in <span className="italic serif">Touch</span>
            </h2>

            <p className="text-gray-600 mb-8 max-w-md">
              Reach out to discuss your vision. We’ll guide you through the process
              and help shape your ideas into a refined space.
            </p>

            <div className="space-y-4 text-sm text-gray-700">
              <p>Pune, India</p>
              <p>hello@flickachu.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </FadeUp>

        {/* RIGHT FORM */}
        <FadeUp delay={0.2}>
          <form className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border-b border-gray-300 py-3 bg-transparent outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border-b border-gray-300 py-3 bg-transparent outline-none"
            />

            <textarea
              placeholder="Tell us about your project"
              rows={4}
              className="w-full border-b border-gray-300 py-3 bg-transparent outline-none"
            />

            <button
              type="submit"
              className="mt-4 px-8 py-3 border rounded-full hover:bg-black hover:text-white transition"
            >
              Send Message
            </button>

          </form>
        </FadeUp>

      </section>

    </main>
  );
}