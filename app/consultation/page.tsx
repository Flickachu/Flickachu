"use client";

import { useState } from "react";

export default function Consultation() {
  const [name, setName] = useState("");
  const [preference, setPreference] = useState<"phone" | "email" | "">("");
  const [contactValue, setContactValue] = useState("");
  const [space, setSpace] = useState("Residential");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !contactValue || !details) return;

    setStatus("loading");

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          space,
          style: "",
          requirement: details,
          budget: "",
          timeline: "",
          size: "",
          contact: contactValue,
          page: window.location.pathname,
          source: "consultation_page",
          name,
        }),
      });

      setStatus("success");
      setName("");
      setPreference("");
      setContactValue("");
      setSpace("Residential");
      setDetails("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#a27725] mb-6">
            Consultation
          </p>
          <h1 className="text-5xl md:text-7xl mb-6 font-light tracking-tight">
            Start with a focused <span className="italic serif">conversation</span>
          </h1>
          <p className="text-gray-600 mb-12 max-w-xl text-lg leading-relaxed">
            Share the space, your preferred contact method, and the brief. We will come back with the right next step for the project.
          </p>
        </div>

        <form className="grid gap-8 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="w-full border-b border-gray-400 bg-transparent py-3 outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-sm text-gray-500 mb-1 block">Project Type</label>
            <select
              value={space}
              onChange={(event) => setSpace(event.target.value)}
              className="w-full border-b border-gray-400 bg-transparent py-3 outline-none focus:border-black transition-colors"
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Furniture Design</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-500 mb-3 block">How should we reach you?</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setPreference("phone");
                  setContactValue("");
                }}
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
                onClick={() => {
                  setPreference("email");
                  setContactValue("");
                }}
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

          {preference && (
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">
                {preference === "phone" ? "Phone Number" : "Email Address"}
              </label>
              <input
                type={preference === "phone" ? "tel" : "email"}
                required
                value={contactValue}
                onChange={(event) => setContactValue(event.target.value)}
                placeholder={preference === "phone" ? "+91 98765 43210" : "you@example.com"}
                className="w-full border-b border-gray-400 bg-transparent py-3 outline-none focus:border-black transition-colors"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-sm text-gray-500 mb-1 block">Project Brief</label>
            <textarea
              required
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="Tell us about your space, priorities, and timeline."
              rows={6}
              className="w-full border-b border-gray-400 bg-transparent py-3 outline-none resize-none focus:border-black transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !preference}
              className="mt-4 px-8 py-4 border border-black rounded-full hover:bg-black hover:text-white transition disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === "loading"
                ? "Submitting..."
                : status === "success"
                  ? "Request Sent"
                  : "Submit Request"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-700 mt-4 tracking-wide">
                Thanks. We received your consultation request and will follow up shortly.
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
