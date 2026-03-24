"use client";

import { useState, useRef, useEffect } from "react";

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
  | "contact"
  | "done";

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState<Step>("space");
  const [input, setInput] = useState("");

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

  const options = {
    space: ["Living Room", "Bedroom", "Kitchen", "Office", "Full Home"],
    style: ["Modern", "Minimal", "European", "Classic", "Luxury"],
    requirement: ["Relaxation", "Entertainment", "Family Use", "Work From Home"],
    budget: ["₹2L–₹5L", "₹5L–₹10L", "₹10L–₹20L", "₹20L+"],
    timeline: ["Immediately", "1–3 Months", "3–6 Months", "6+ Months"],
    size: ["<500 sq.ft", "500–1000 sq.ft", "1000–2000 sq.ft", "2000+ sq.ft"],
  };

  const nextStepMap: Record<Step, Step> = {
    space: "style",
    style: "requirement",
    requirement: "budget",
    budget: "timeline",
    timeline: "size",
    size: "contact",
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
            "I’ll help you shape this properly. What space are you designing?",
        },
      ]);
    }
  }, [open, messages.length]);

  const askAI = async (newLead: LeadData, newMessages: Message[]) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          leadData: newLead,
          hasAskedContact: step === "contact",
        }),
      });

      const data = await res.json();

      return data.reply || "Alright. Let’s continue.";
    } catch {
      return "Alright. Let’s continue.";
    }
  };

  const handleOptionClick = async (value: string) => {
    let newLead = { ...leadData };

    if (step !== "done") {
      newLead = {
        ...newLead,
        [step]: value,
      } as LeadData;
    }

    setLeadData(newLead);

    const userMessage: Message = { role: "user", content: value };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setLoading(true);

    const next = nextStepMap[step];

    if (next === "done") {
      await sendLead(newLead);
      return;
    }

    const aiReply = await askAI(newLead, newMessages);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: aiReply },
    ]);

    setStep(next);
    setLoading(false);
  };

  const handleInputSubmit = async () => {
    if (!input.trim()) return;

    const value = input;

    const newLead = { ...leadData, contact: value };
    setLeadData(newLead);

    const userMessage: Message = { role: "user", content: value };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    await sendLead(newLead);
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
      }),
    });

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "That gives me a clear direction. Our team will reach out shortly.",
      },
    ]);

    setStep("done");
    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-[-45px] top-[75%] -translate-y-1/2 z-50 bg-black text-white px-4 py-2 rounded-tl-xl rounded-tr-xl shadow-lg rotate-[-90deg]"
        >
          Chat with us
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] rounded-2xl overflow-hidden border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col">

          <div className="flex justify-between items-center px-5 py-4 border-b border-black/10">
            <p className="text-sm font-semibold">Laminate Gallery Assistant</p>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${m.role === "user" ? "bg-black text-white" : "bg-black/5"}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {/* OPTIONS */}
            {step in options && (
              <div className="flex flex-wrap gap-2">
                {options[step as keyof typeof options].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    className="text-xs px-3 py-2 bg-black/5 rounded-full"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {loading && <p className="text-xs text-black/40">Typing...</p>}

            <div ref={messagesEndRef} />
          </div>

          {/* CONTACT INPUT ONLY */}
          {step === "contact" && (
            <div className="p-4 border-t flex gap-2">
              <input
                className="flex-1 border px-3 py-2 rounded-lg text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
                placeholder="Phone or email"
              />
              <button
                onClick={handleInputSubmit}
                className="px-4 py-2 bg-black text-white rounded-lg"
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