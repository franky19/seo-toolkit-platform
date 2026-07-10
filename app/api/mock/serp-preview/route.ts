import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return NextResponse.json({
    score: 92,
    warnings: ["Title is slightly long."]
  });
}
