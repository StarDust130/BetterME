import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import Groq from "groq-sdk";
import { catchAsync } from "../lib/catchAsync.js";

const groq = new Groq({
  apiKey: process.env.LLAMA_API_KEY,
});

const getSummaryAndTips = catchAsync(async (data, context) => {
  const prompt = `
    You are an insightful assistant. Analyze the following ${context} data and provide:
    - A **short summary** of the patterns you observe 📊.
    - Key **patterns** you notice 🧐.
    - 3 actionable **tips** to improve or optimize in this category 💡.
    - Make it engaging and include emojis for a friendly tone 😊. 
    - Respond in JSON format with 'summary', 'patterns', and 'tips'.
    Data: ${JSON.stringify(data)}
  `;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    stream: false,
  });

  const aiResponse =
    response.choices[0]?.message?.content || "No response received";

  return JSON.parse(aiResponse);
});

export default getSummaryAndTips;
