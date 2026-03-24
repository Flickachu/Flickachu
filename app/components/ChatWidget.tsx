"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Context = {
  name?: string;
  email?: string;
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [context, setContext] = useState<Context>({});
  const [step, setStep] = useState<"start" | "qualify" | "cta">("start");
  const [showQuick, setShowQuick] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // 🔥 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🔥 Greeting
  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content:
              "Planning a space? I can help refine your layout, style, and furniture choices.",
          },
        ]);
      }, 600);
    }
  }, [open]);

  const detectContext = (text: string) => {
    // simple email detection
    if (text.includes("@")) {
      setContext((prev) => ({ ...prev, email: text }));
    }

    // simple name detection
    if (text.split(" ").length === 1 && !text.includes("@")) {
      setContext((prev) => ({ ...prev, name: text }));
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    detectContext(messageText);

    const userMessage: Message = {
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setShowQuick(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          context,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "No response",
        },
      ]);

      // 🔥 Flow progression
      if (step === "start") setStep("qualify");
      else if (step === "qualify") setStep("cta");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection issue. Try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* 🔥 SIDE BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-[-45px] top-[75%] -translate-y-1/2 z-50
          bg-black text-white
          px-4 py-2
          rounded-tl-xl rounded-tr-xl
          shadow-lg
          rotate-[-90deg]
          hover:tracking-wide transition-all duration-300"
        >
          Chat with us
        </button>
      )}

      {/* 🔥 PANEL */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px]
        rounded-2xl overflow-hidden
        border border-black/10
        bg-white/70 backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-black/10">
            <div>
              <p className="text-sm font-semibold text-black">
                Flickachu Assistant
              </p>
              <p className="text-xs text-black/40">
                Typically replies instantly
              </p>
            </div>

            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                    m.role === "user"
                      ? "bg-black text-white"
                      : "bg-black/5 text-black"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* QUICK ACTIONS */}
            {showQuick && (
              <div className="flex flex-wrap gap-2">
                {[
                  "Design my living room",
                  "Suggest sofa styles",
                  "Lighting ideas",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-2 bg-black/5 rounded-full"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* CTA */}
            {step === "cta" && (
              <div className="bg-black/5 p-3 rounded-xl">
                <p className="text-xs mb-2">
                  Want a tailored design for your space?
                </p>
                <button
                  onClick={() => router.push("/consultation")}
                  className="w-full py-2 bg-black text-white rounded-lg"
                >
                  Start Your Project
                </button>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-black/40 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-black/40 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-black/40 rounded-full animate-bounce delay-300" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-black/10 flex gap-2 bg-white/50">
            <input
              className="flex-1 bg-white/60 border border-black/10 px-3 py-2 rounded-lg text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your space..."
            />

            <button
              onClick={() => sendMessage()}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}