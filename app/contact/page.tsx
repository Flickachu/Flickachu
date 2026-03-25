"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import FadeUp from "../components/FadeUp";
import Image from "next/image";

export default function ContactPage() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [preference, setPreference] = useState<"phone" | "email" | "">("");
  const [contactValue, setContactValue] = useState("");
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
          space: "",
          style: "",
          requirement: message,
          budget: "",
          timeline: "",
          size: "",
          contact: contactValue,
          page: window.location.pathname,
          source: "contact_page",
          name: name,
        }),
      });
      setStatus("success");
      setName("");
      setPreference("");
      setContactValue("");
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
              Let's <span className="italic serif">Talk</span>
            </h1>
            <p className="mt-6 text-white/70 max-w-xl">
              Whether you're starting a new project or refining an existing space,
              we'd love to hear from you.
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
              Reach out to discuss your vision. We'll guide you through the process
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
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                <label className="text-sm text-gray-500 mb-1 block">
                  {preference === "phone" ? "Phone Number" : "Email Address"}
                </label>
                <input
                  type={preference === "phone" ? "tel" : "email"}
                  placeholder={preference === "phone" ? "+91 98765 43210" : "you@example.com"}
                  required
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
                />
              </div>
            )}

            {/* MESSAGE */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Tell us about your project</label>
              <textarea
                placeholder="Space type, style preferences, timeline..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !preference}
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