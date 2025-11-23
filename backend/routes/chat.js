// backend/routes/chat.js

import { callLLM } from "../utils/llm.js";
import { retrieveContext } from "../utils/retrieval.js";
import { callRouteAPI } from "../utils/routeTools.js";

export async function chatHandler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    console.log("CHAT REQUEST:", message);

    // ---------------------------
    // 1. CLASSIFY INTENT
    // ---------------------------
    const intent = (
      await callLLM([
        {
          role: "system",
          content:
            "Classify the user's message into exactly one category: route, price, travel_advice, general. Return only the category name."
        },
        { role: "user", content: message }
      ])
    ).toLowerCase();

    console.log("INTENT:", intent);

    // ---------------------------
    // 2. ROUTE PLANNING
    // ---------------------------
    if (intent.includes("route")) {
      const parts = message.toLowerCase().split(" ");
      const source = parts[parts.length - 3] || "delhi";
      const destination = parts[parts.length - 1] || "mumbai";

      const cheapest = await callRouteAPI("cheapest", source, destination);
      const fastest = await callRouteAPI("fastest", source, destination);
      const balanced = await callRouteAPI("balanced", source, destination);

      return res.json({
        reply: `Here are your best travel routes from ${source} to ${destination}:`,
        cheapest,
        fastest,
        balanced
      });
    }

    // ---------------------------
    // 3. PRICE ADVICE
    // ---------------------------
    if (intent.includes("price")) {
      return res.json({
        reply: `
✈️ **Best time to book flights:**
- 4–6 weeks before travel
- Tuesday & Wednesday cheapest
- Early morning flights cost less
- Avoid weekends & last-minute booking
      `
      });
    }

    // ---------------------------
    // 4. TRAVEL ADVICE / RAG
    // ---------------------------
    if (intent.includes("travel_advice")) {
      const docs = await retrieveContext(message);

      const answer = await callLLM([
        {
          role: "system",
          content:
            "You are TravelBuddy AI – expert in Indian travel, weather, tourism, seasons, and safety tips."
        },
        { role: "user", content: `Context:\n${docs.join("\n")}\n\nQuestion: ${message}` }
      ]);

      return res.json({
        reply: answer
      });
    }

    // ---------------------------
    // 5. GENERAL CHAT (ChatGPT-like)
    // ---------------------------
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const generalAnswer = await callLLM([
      {
        role: "system",
        content: `
You are TravelBuddy AI — a friendly assistant.

CURRENT DATE: ${today}

Rules:
- If the user asks “today’s date”, “what day is today”, ALWAYS respond with: ${today}.
- You can answer ANY question: general, knowledge, reasoning, maths, or travel.
- Be conversational and helpful.
`
      },
      { role: "user", content: message }
    ]);

    return res.json({ reply: generalAnswer });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
