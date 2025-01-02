import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.LLAMA_API_KEY,
});

async function askAIForLifeTips() {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          "You are a wise and thoughtful mentor. Share 5 practical and timeless tips to help someone grow into a kind, resilient, and inspiring person who positively impacts the world. Respond in JSON format with sections: 'tips' and 'insights', making the advice actionable and motivational.",
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    stream: false,
    stop: null,
  });

  console.log(response.choices[0]?.message?.content || "No response received");
}

askAIForLifeTips().catch((err) => console.error("An error occurred:", err));
