"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Consultation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">
      <Navbar forceDark />

      <section className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-5xl mb-6">
          Get <span className="italic serif">Consultation</span>
        </h1>

        <p className="text-gray-600 mb-12 max-w-xl">
          Tell us about your space, your vision, and what you’re looking to create.
          We’ll get back to you with a tailored approach.
        </p>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border-b border-gray-400 bg-transparent py-3 outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border-b border-gray-400 bg-transparent py-3 outline-none"
          />

          <textarea
            placeholder="Tell us about your project..."
            rows={5}
            className="w-full border-b border-gray-400 bg-transparent py-3 outline-none resize-none"
          />

          <button
            type="submit"
            className="mt-6 px-8 py-4 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Submit Request
          </button>
        </form>
      </section>
    </main>
  );
}