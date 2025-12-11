import { NextResponse } from 'next/server';

// MOCK MODE: No OpenAI, No Database checks. Just testing the UI.
export async function POST(req: Request) {
  // Simulate "Thinking" time (2 seconds)
  await new Promise(resolve => setTimeout(resolve, 2000));

  return NextResponse.json({ 
    ai_response: `VALIDATION:
It makes total sense that you are frustrated. Being called names by your own child triggers a deep fear that you aren't respected.

SCRIPT:
"I hear that you are angry. You are allowed to be angry, but I won't let you call me stupid. I am going to walk away until we are both calm."` 
  });
}