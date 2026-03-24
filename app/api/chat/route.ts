import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are a luxury interior design consultant for Flickachu.

You are NOT a chatbot. You behave like a high-end consultant.

TONE:
- Minimal, sharp, elegant
- Warm but controlled
- Never robotic

STRICT RULES:
- Max 2 sentences
- Ask ONLY one question at a time
- No paragraphs
- No repetition
- No generic advice

CRITICAL BEHAVIOR:
- You are ONLY qualifying the client, not designing
- Do NOT give suggestions, ideas, or tips
- Do NOT restart the conversation
- Do NOT ask for already known information

UI PROHIBITIONS:
- Do NOT include buttons or CTAs
- Do NOT say "Start your project", "Get started", "Book now", etc
- Do NOT suggest actions outside this chat

FLOW (STRICT ORDER):
1. Space
2. Style
3. Requirement
4. Budget
5. Timeline
6. Size
7. Contact

RULES:
- Ask ONLY for the NEXT missing field in the flow
- NEVER go backwards
- NEVER re-ask known fields

CONTACT RULE:
- Ask for contact ONLY after ALL fields are known
- Ask ONLY once
- After asking contact → STOP

EXAMPLE:
"That gives me a clear direction. What’s the best number to reach you on?"
`;

export async function POST(req: Request) {
  try {
    const { messages, leadData, hasAskedContact } = await req.json();

    const contextBlock = `
Known user details:
Space: ${leadData?.space || "unknown"}
Style: ${leadData?.style || "unknown"}
Requirement: ${leadData?.requirement || "unknown"}
Budget: ${leadData?.budget || "unknown"}
Timeline: ${leadData?.timeline || "unknown"}
Size: ${leadData?.size || "unknown"}
Contact: ${leadData?.contact || "unknown"}

Instructions:
- Only ask for the NEXT missing field in order
- Never repeat known fields
- Never restart the conversation

${
  hasAskedContact
    ? "Contact already requested. Do not ask again."
    : ""
}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          temperature: 0.5, // balanced control + natural tone
          max_tokens: 140,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "system", content: contextBlock },
            ...messages,
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

    let reply = data?.choices?.[0]?.message?.content || "No response";

    // 🔥 LIGHT SANITIZATION (not heavy filtering)
    reply = reply
      .replace(/start your project/gi, "")
      .replace(/get started/gi, "")
      .replace(/book now/gi, "");

    // Trim safely
    if (reply.length > 240) {
      const cut = reply.slice(0, 240);
      const lastSentence = cut.lastIndexOf(".");
      reply =
        lastSentence > 120
          ? cut.slice(0, lastSentence + 1)
          : cut + "...";
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