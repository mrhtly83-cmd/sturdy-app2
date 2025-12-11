import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// 1. Setup Keys
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 2. The Expert Persona (This is what we tweak to improve advice)
const SYSTEM_PROMPT = `
You are STURDY, an expert parenting coach based on 'Good Inside' and Attachment Theory.
Your goal is to help parents hold boundaries without shaming the child.

RULES:
1. VALIDATE first: Acknowledge the parent's frustration and the child's underlying feeling.
2. SCRIPT: Provide a direct, verbatim script in quotes.
3. TONE: Firm but kind. No lectures. Keep it short.
`;

export async function POST(req: Request) {
  try {
    const { message, childAge, userId } = await req.json();

    // 3. Ask OpenAI (The Real Brain)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Child Age: ${childAge}. The parent says: "${message}"` }
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ ai_response: aiResponse });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}