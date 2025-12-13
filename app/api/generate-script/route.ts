import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30; // Allow 30 seconds for long answers

export async function POST(req: Request) {
  const { message, childAge } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `
      You are STURDY, an expert parenting coach based on 'Good Inside' and Attachment Theory.
      Your goal is to help parents hold boundaries without shaming the child.
      
      RULES:
      1. VALIDATE first: Acknowledge the parent's frustration.
      2. SCRIPT: Provide a direct, verbatim script in quotes.
      3. TONE: Firm but kind. No lectures. Keep it short.
    `,
    prompt: `Child Age: ${childAge}. The parent says: "${message}"`,
  });

  return result.toDataStreamResponse();
}