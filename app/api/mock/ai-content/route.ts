import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({
    content: "Generated AI content based on your request...",
    score: 94
  });
}
