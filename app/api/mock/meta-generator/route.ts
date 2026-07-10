import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({
    title: `${body.keyword} | Ultimate Guide`,
    description: `Discover everything about ${body.keyword}. Read our comprehensive guide.`,
    score: 95
  });
}
