"use client";
import { useState } from "react";
import Link from "next/link";

export default function CtaSection({ title, description, placeholder, buttonText, footerText, footerLink }: any) {
  const [quickEmail, setQuickEmail] = useState("");
  const [quickStatus, setQuickStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleQuickLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail) return;
    setQuickStatus("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: quickEmail, source: "homepage_cta", page: "/" }),
      });
      setQuickStatus("success");
      setQuickEmail("");
      setTimeout(() => setQuickStatus("idle"), 5000);
    } catch {
      setQuickStatus("idle");
    }
  };

  const safeTitle = title || "Let's Create Something Exceptional";
  const words = safeTitle.split(" ");
  const lastWord = words.pop();
  const restOfTitle = words.join(" ");

  return (
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden text-center px-6 md:px-10">
      <div className="absolute inset-0 bg-white -z-10" />
      <h2 className="text-5xl md:text-8xl mb-10 font-light text-[#1a1a1a] tracking-tight">
        {restOfTitle}
        <br className="hidden md:block" />{" "}
        <span className="italic serif text-[#a27725]">{lastWord}</span>
      </h2>
      <p className="text-[#1a1a1a]/70 max-w-2xl mx-auto mb-16 text-xl font-light leading-relaxed">
        {description || "Whether you're designing a new space or redefining an existing one, we bring clarity, craftsmanship, and character to every project."}
      </p>

      <div className="max-w-md mx-auto relative">
        <form onSubmit={handleQuickLead} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            required
            value={quickEmail}
            onChange={(e) => setQuickEmail(e.target.value)}
            placeholder={placeholder || "Enter your email"}
            className="flex-1 px-6 py-4 rounded-full border border-black/20 outline-none focus:border-black transition"
          />
          <button
            type="submit"
            aria-label="Submit lead form"
            disabled={quickStatus === "loading" || quickStatus === "success"}
            className="px-8 py-4 bg-[#a27725] text-white rounded-full font-medium tracking-widest uppercase hover:bg-black transition-colors duration-500 disabled:opacity-50"
          >
            {quickStatus === "loading" ? "..." : quickStatus === "success" ? "Sent" : (buttonText || "Join")}
          </button>
        </form>
        {quickStatus === "success" && (
          <p className="text-sm text-green-700 mt-4 tracking-wide absolute w-full text-center">
            We&apos;ll be in touch shortly.
          </p>
        )}
      </div>

      <div className="mt-16">
        <Link href={footerLink || "/get-quote"} className="text-sm tracking-widest uppercase text-[#1a1a1a]/70 hover:text-black transition border-b border-transparent hover:border-black pb-1">
          {footerText || "or fill out a detailed project quote"}
        </Link>
      </div>
    </section>
  );
}
