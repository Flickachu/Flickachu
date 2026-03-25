"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image";

export default function QuotePage() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [preference, setPreference] = useState<"phone" | "email" | "">("");
  const [contactValue, setContactValue] = useState("");
  const [space, setSpace] = useState("Residential");
  const [budget, setBudget] = useState("₹2L – ₹5L");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactValue) return;

    setStatus("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          space: space,
          style: "",
          requirement: message,
          budget: budget,
          timeline: "",
          size: "",
          contact: contactValue,
          page: window.location.pathname,
          source: "get_quote_page",
          name: name,
        }),
      });
      setStatus("success");
      setName("");
      setPreference("");
      setContactValue("");
      setSpace("Residential");
      setBudget("₹2L – ₹5L");
      setMessage("");
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
              We'll craft a tailored solution for you.
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              />
            </div>

            {/* PREFERENCE */}
            <div>
              <label className="text-sm text-gray-500 mb-3 block">How should we reach you?</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => { setPreference("phone"); setContactValue(""); }}
                  className={`px-6 py-2.5 rounded-full text-sm tracking-wide border transition-all duration-300 ${
                    preference === "phone"
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-transparent text-[#1a1a1a]/70 border-black/10 hover:border-black/30"
                  }`}
                >
                  Phone
                </button>
                <button
                  type="button"
                  onClick={() => { setPreference("email"); setContactValue(""); }}
                  className={`px-6 py-2.5 rounded-full text-sm tracking-wide border transition-all duration-300 ${
                    preference === "email"
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-transparent text-[#1a1a1a]/70 border-black/10 hover:border-black/30"
                  }`}
                >
                  Email
                </button>
              </div>
            </div>

            {/* CONTACT FIELD (conditional) */}
            {preference && (
              <div>
                <label className="text-sm text-gray-500">
                  {preference === "phone" ? "Phone Number" : "Email Address"}
                </label>
                <input
                  type={preference === "phone" ? "tel" : "email"}
                  required
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={preference === "phone" ? "+91 98765 43210" : "you@example.com"}
                  className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
                />
              </div>
            )}

            {/* PROJECT TYPE → maps to "space" column */}
            <div>
              <label className="text-sm text-gray-500">Project Type</label>
              <select
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Furniture Design</option>
              </select>
            </div>

            {/* BUDGET → maps to "budget" column */}
            <div>
              <label className="text-sm text-gray-500">Estimated Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              >
                <option>₹2L – ₹5L</option>
                <option>₹5L – ₹10L</option>
                <option>₹10L+</option>
              </select>
            </div>

            {/* MESSAGE → maps to "requirement" column */}
            <div>
              <label className="text-sm text-gray-500">Project Details</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
                placeholder="Tell us about your space, style, timeline..."
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !preference}
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