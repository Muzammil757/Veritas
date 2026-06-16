import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { marcusReed } from "@/app/data/suspects";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const model = genAI.getGenerativeModel({
     model: "gemini-2.5-flash",
    });
    console.log(
  "GEMINI KEY LOADED:",
  !!process.env.GEMINI_API_KEY
);

    const prompt = [
      `You are ${marcusReed.name}.`,
      `Role: ${marcusReed.role}`,
      `Personality: ${marcusReed.personality}`,
      `Known Facts: ${marcusReed.knownFacts.join(", ")}`,
      `Secrets: ${marcusReed.secrets.join(", ")}`,
      `Behavior: ${marcusReed.behavior}`,
      "",
      "IMPORTANT RULES:",
      "- Stay fully in character.",
      "- Never reveal secrets immediately.",
      "- Never admit guilt.",
      "- Be defensive when accused.",
      "- Answer naturally.",
      "- Keep responses under 120 words.",
      "",
      `Player Question: ${question}`,
    ].join("\n");

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}