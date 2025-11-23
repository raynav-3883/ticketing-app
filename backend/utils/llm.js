// backend/utils/llm.js

// Load .env FIRST so llm.js always gets the API Key
import dotenv from "dotenv";
dotenv.config();

console.log("LLM: API Key Loaded =", process.env.OPENAI_API_KEY);

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function callLLM(messages) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("LLM ERROR:", err);
    return "I could not understand that.";
  }
}
