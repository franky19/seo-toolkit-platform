import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  // Simulate latency
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!q) {
    return NextResponse.json({ success: true, data: [] });
  }

  return NextResponse.json({
    success: true,
    data: [
      {
        keyword: q,
        volume: Math.floor(Math.random() * 20000),
        difficulty: Math.floor(Math.random() * 100),
        cpc: parseFloat((Math.random() * 5).toFixed(2)),
        competition: 'Medium',
        intent: 'Commercial',
        trend: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))
      }
    ]
  });
}
