import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("LEAD RECEIVED:", body);

    if (!body.contact) {
      return NextResponse.json(
        { success: false, error: "Missing contact" },
        { status: 400 }
      );
    }

    if (!body.space || !body.style) {
      console.warn("⚠️ Incomplete lead (missing core fields)");
    }

    const res = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        space: body.space || "",
        style: body.style || "",
        requirement: body.requirement || "",
        budget: body.budget || "",
        timeline: body.timeline || "",
        size: body.size || "",
        contact: body.contact || "",
        page: body.page || "",
        source: body.source || "chatbot",
      }),
    });

    const text = await res.text();
    console.log("GOOGLE SCRIPT RESPONSE:", text);

    if (!res.ok) {
      throw new Error("Google Script failed");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LEAD ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Lead capture failed" },
      { status: 500 }
    );
  }
}