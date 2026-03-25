"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image";

export default function ContactPage() {
  const pathname = usePathname();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: `${formData.name} - ${formData.email}`,
          requirement: formData.message,
          page: window.location.pathname,
          source: "contact_page",
        }),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("idle");
    }
  };

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
              <p>hello@laminategallery.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </FadeUp>

        {/* RIGHT FORM */}
        <FadeUp delay={0.2}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
            />

            <textarea
              placeholder="Tell us about your project"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
            />

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="mt-4 px-8 py-3 border rounded-full hover:bg-black hover:text-white transition disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-700 mt-4 tracking-wide">
                Thank you. We'll be in touch shortly.
              </p>
            )}
          </form>
        </FadeUp>
      </section>
    </main>
  );
}