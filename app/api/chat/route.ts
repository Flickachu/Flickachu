import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // 🔥 RELIABLE (NO MORE ENDPOINT ERRORS)
          model: "openrouter/auto",
          route: "fallback",

          temperature: 0.6,
          max_tokens: 120,

          messages: [
            {
              role: "system",
              content: `
You are a luxury interior design assistant for Flickachu.

Your goal is to behave like a real consultant and convert visitors into leads.

STYLE:
- Premium, elegant, minimal
- Max 2–3 sentences
- No long paragraphs

FLOW:
- ALWAYS ask 1 relevant question first
- NEVER jump straight into suggestions
- Guide step-by-step

YOU MUST COLLECT:
1. Space type (living room, bedroom, etc.)
2. Style preference
3. Budget (optional)
4. Name
5. Email

WHEN READY:
→ Give tailored suggestions
→ Then guide toward consultation

USER CONTEXT:
Name: ${context?.name || "unknown"}
Email: ${context?.email || "unknown"}

RULES:
- If missing info → ask
- If enough info → suggest
- If name/email missing → ask naturally
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENROUTER ERROR:", data);

      return NextResponse.json(
        { reply: data?.error?.message || "AI unavailable right now." },
        { status: 500 }
      );
    }

    let reply =
      data?.choices?.[0]?.message?.content || "No response";

    // 🔥 HARD LIMIT (UX polish)
    if (reply.length > 300) {
      reply = reply.slice(0, 300) + "...";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      { reply: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}