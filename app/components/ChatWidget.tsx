"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type LeadData = {
  space: string;
  style: string;
  requirement: string;
  budget: string;
  timeline: string;
  size: string;
  contact: string;
};

type Step =
  | "space"
  | "style"
  | "requirement"
  | "budget"
  | "timeline"
  | "size"
  | "name"
  | "preference"
  | "contact"
  | "done";

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Initial gentle pop after 5 seconds
    const initialTimer = setTimeout(() => setShowBubble(true), 5000);
    const hideInitialTimer = setTimeout(() => setShowBubble(false), 9000);

    // Repeat occasionally (every 25s) to quietly nudge the user
    const interval = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 25000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideInitialTimer);
      clearInterval(interval);
    };
  }, []);

  const [step, setStep] = useState<Step>("space");
  const [input, setInput] = useState("");
  const [clientName, setClientName] = useState("");
  const [contactPreference, setContactPreference] = useState<"phone" | "email" | "">("");

  const [leadData, setLeadData] = useState<LeadData>({
    space: "",
    style: "",
    requirement: "",
    budget: "",
    timeline: "",
    size: "",
    contact: "",
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const options: Record<string, string[]> = {
    space: ["Living Room", "Bedroom", "Kitchen", "Office", "Full Home"],
    style: ["Modern", "Minimal", "European", "Classic", "Luxury"],
    requirement: ["Relaxation", "Entertainment", "Family Use", "Work From Home"],
    budget: ["₹2L–₹5L", "₹5L–₹10L", "₹10L–₹20L", "₹20L+"],
    timeline: ["Immediately", "1–3 Months", "3–6 Months", "6+ Months"],
    size: ["<500 sq.ft", "500–1000 sq.ft", "1000–2000 sq.ft", "2000+ sq.ft"],
    preference: ["Phone Number", "Email Address"],
  };

  const nextStepMap: Record<Step, Step> = {
    space: "style",
    style: "requirement",
    requirement: "budget",
    budget: "timeline",
    timeline: "size",
    size: "name",
    name: "preference",
    preference: "contact",
    contact: "done",
    done: "done",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;

    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "I'll help you shape this properly. What space are you designing?",
        },
      ]);
    }
  }, [open, messages.length]);

  const getBotReply = (nextStep: Step, value: string) => {
    switch (nextStep) {
      case "style":
        return `A ${value.toLowerCase()} sounds wonderful. What style are you drawn to?`;
      case "requirement":
        return `Got it. So what's the primary function for this area?`;
      case "budget":
        return `Understood. Have you considered an estimated budget for this project?`;
      case "timeline":
        return `That helps us plan perfectly. When are you looking to have this completed?`;
      case "size":
        return `Great. And roughly, what's the size of the space?`;
      case "name":
        return `Perfect, that gives our design team a clear picture. May I have your name please?`;
      case "preference":
        return `Nice to meet you, ${value}! Would you prefer to be contacted via phone or email?`;
      case "contact":
        return contactPreference === "phone"
          ? `Great, what's the best phone number to reach you at?`
          : `Great, what's the best email address to reach you at?`;
      case "done":
        return `Thank you! Our lead designer will reach out shortly.`;
      default:
        return `Alright. Let's continue.`;
    }
  };

  const handleOptionClick = async (value: string) => {
    // Handle preference step specially
    if (step === "preference") {
      const pref = value === "Phone Number" ? "phone" : "email";
      setContactPreference(pref);

      const userMessage: Message = { role: "user", content: value };
      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      await new Promise((r) => setTimeout(r, 600));

      const aiReply = pref === "phone"
        ? `Great, what's the best phone number to reach you at?`
        : `Great, what's the best email address to reach you at?`;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiReply },
      ]);

      setStep("contact");
      setLoading(false);
      return;
    }

    let newLead = { ...leadData };

    if (step in options && step !== "done" && step !== "name" && step !== "contact") {
      newLead = {
        ...newLead,
        [step]: value,
      } as LeadData;
    }

    setLeadData(newLead);

    const userMessage: Message = { role: "user", content: value };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const next = nextStepMap[step];

    // Simulate natural typing delay
    await new Promise((r) => setTimeout(r, 600));

    const aiReply = getBotReply(next, value);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: aiReply },
    ]);

    setStep(next);
    setLoading(false);
  };

  const handleInputSubmit = async () => {
    if (!input.trim()) return;

    const value = input.trim();

    if (step === "name") {
      setClientName(value);

      const userMessage: Message = { role: "user", content: value };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      await new Promise((r) => setTimeout(r, 600));

      const aiReply = getBotReply("preference", value);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiReply },
      ]);

      setStep("preference");
      setLoading(false);
      return;
    }

    if (step === "contact") {
      const newLead = { ...leadData, contact: value };
      setLeadData(newLead);

      const userMessage: Message = { role: "user", content: value };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      await sendLead(newLead);
      return;
    }
  };

  const sendLead = async (data: LeadData) => {
    await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        page: window.location.pathname,
        source: "chatbot",
        name: clientName,
      }),
    });

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "That gives me a clear direction. Our team will reach out shortly to discuss your vision.",
      },
    ]);

    setStep("done");
    setLoading(false);
  };

  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const toggle = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastY;
      lastY = currentY;

      const scrollPosition = window.innerHeight + currentY;
      const pageHeight = document.body.offsetHeight;

      // Show if we're past 1.5 screen heights down
      const isPastHalf = currentY > window.innerHeight * 1.5;
      const nearFooter = scrollPosition > pageHeight - 200;

      setIsBackToTopVisible(isPastHalf && isScrollingUp && !nearFooter);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  // Determine if we show a text input (name or contact steps)
  const showTextInput = step === "name" || step === "contact";

  return (
    <>
      {/* FLOATING BUTTON DOCKED NEXT TO BACK-TO-TOP */}
      <div
        className={`fixed bottom-8 right-6 z-[100] flex items-center group transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isBackToTopVisible ? "-translate-x-16" : "translate-x-0"
          }`}
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
      >
        {/* OCCASIONAL SOFT BUBBLE */}
        {!open && (
          <div className={`absolute right-full mr-4 bg-white/90 backdrop-blur-md border border-black/10 text-black text-xs font-medium tracking-wide px-4 py-2 rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] whitespace-nowrap transition-all duration-700 pointer-events-none ${showBubble ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
            Get a quick quote
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close Chat Assistant" : "Open Chat Assistant"}
          className="w-12 h-12 rounded-full backdrop-blur-md bg-white/50 border border-black/10 shadow-sm flex items-center justify-center hover:bg-white/90 hover:scale-105 transition-all duration-300 relative"
        >
          {/* Extremely quiet ping ring */}
          {!open && (
            <span className="absolute inset-0 rounded-full border border-[#a27725] animate-ping opacity-20" style={{ animationDuration: '3s' }}></span>
          )}
          {open ? <X size={18} className="text-black relative z-[101]" /> : <MessageSquare size={18} className="text-[#a27725] relative z-[101]" />}
        </button>
      </div>

      {open && (
        <div className={`fixed bottom-24 right-20 z-[100] w-[340px] h-[500px] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-white/90 backdrop-blur-xl flex flex-col origin-bottom-right transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in slide-in-from-bottom-4 fade-in ${isBackToTopVisible ? "-translate-x-16" : "translate-x-0"
          }`}>

          <div className="flex justify-between items-center px-5 py-4 border-b border-black/10 bg-white/50">
            <p className="text-sm font-semibold tracking-wide">Assistant</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="hover:rotate-90 transition-transform">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] leading-relaxed shadow-sm ${m.role === "user"
                  ? "bg-[#1a1a1a] text-white rounded-br-none"
                  : "bg-white border border-black/5 rounded-bl-none text-black/80"
                  }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {/* Show option pills for steps that have options (not name/contact/done) */}
            {step in options && step !== "done" && (
              <div className="flex flex-col items-end gap-2 mt-2 pt-2">
                {options[step]?.map((opt) => (
                  <button
                    key={opt}
                    aria-label={`Select ${opt}`}
                    onClick={() => handleOptionClick(opt)}
                    className="text-xs px-4 py-2.5 bg-white border border-black/5 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all w-max shadow-sm"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {loading && <p className="text-xs text-black/40 italic ml-2">Typing...</p>}

            <div ref={messagesEndRef} />
          </div>

          {showTextInput && (
            <div className="p-4 border-t bg-white/50 border-black/10 flex gap-2">
              <input
                className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white border border-black/10 outline-none focus:border-black transition shadow-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
                placeholder={
                  step === "name"
                    ? "Your name"
                    : contactPreference === "phone"
                      ? "Phone number"
                      : "Email address"
                }
                aria-label={
                  step === "name"
                    ? "Enter your name"
                    : contactPreference === "phone"
                      ? "Enter phone number"
                      : "Enter email address"
                }
              />
              <button
                onClick={handleInputSubmit}
                aria-label="Send"
                className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-[#a27725] transition"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}