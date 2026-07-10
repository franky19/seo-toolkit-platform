import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 400));

  return NextResponse.json({
    data: [
      {
        id: 1,
        name: "Research Report",
        type: "Keyword Research",
        status: "Completed",
        size: "2.3 MB",
        created: "2026-07-10"
      }
    ]
  });
}
