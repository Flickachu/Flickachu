"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image";

export default function QuotePage() {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Residential",
    budget: "₹2L – ₹5L",
    message: "",
  });
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
          contact: `${formData.name} - ${formData.email} - ${formData.phone}`,
          requirement: formData.message,
          space: formData.projectType,
          budget: formData.budget,
          page: window.location.pathname,
          source: "get_quote_page",
        }),
      });
      setStatus("success");
      setFormData({
        name: "", email: "", phone: "", projectType: "Residential", budget: "₹2L – ₹5L", message: ""
      });
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
          src="/images/project3.jpg"
          alt="Get quote hero"
          fill
          priority
          className="object-cover"
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
          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              />
            </div>

            {/* PROJECT TYPE */}
            <div>
              <label className="text-sm text-gray-500">Project Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Furniture Design</option>
              </select>
            </div>

            {/* BUDGET */}
            <div>
              <label className="text-sm text-gray-500">Estimated Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              >
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
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
                placeholder="Tell us about your space, style, timeline..."
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="mt-6 px-8 py-4 border rounded-full hover:bg-black hover:text-white transition disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === "loading" ? "Submitting..." : status === "success" ? "Quote Requested!" : "Request Quote"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-700 mt-4 tracking-wide">
                Thanks! We've received your request and will contact you soon.
              </p>
            )}
          </form>
        </FadeUp>
      </section>
    </main>
  );
}