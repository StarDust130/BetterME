import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import Groq from "groq-sdk";
import { catchAsync } from "../lib/catchAsync.js";

const groq = new Groq({
  apiKey: process.env.LLAMA_API_KEY,
});

const getSummaryAndTips = catchAsync(async (data, context) => {
const prompt = `
  You are an assistant analyzing the following ${context} data. 
  ${
    context === "expenses"
      ? "Note: All amounts are in INR (Indian Rupees ₹)."
      : ""
  }
  Please provide the following:
  - A **brief summary** with relevant insights and emojis 📊😊.
  - A **short recommendation** for improvement 💡.
  Respond in JSON format with 'summary' and 'recommendation' keys.
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

  let aiResponse =
    response.choices[0]?.message?.content || "No response received";

  // Log the raw AI response to debug
  console.log("AI Response 🧁: ", aiResponse);

  // Extract the valid JSON portion from the AI response
  const jsonStart = aiResponse.indexOf("{");
  const jsonEnd = aiResponse.lastIndexOf("}") + 1;

  if (jsonStart !== -1 && jsonEnd !== -1) {
    const validJson = aiResponse.substring(jsonStart, jsonEnd);

    // Parse the valid JSON portion
    try {
      return JSON.parse(validJson);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return { error: "Failed to parse valid JSON response." };
    }
  } else {
    console.error("Invalid JSON response format.");
    return { error: "Invalid response format." };
  }
});

export default getSummaryAndTips;
