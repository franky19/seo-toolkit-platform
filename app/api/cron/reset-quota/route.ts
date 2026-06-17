import { NextRequest, NextResponse } from "next/server";
import { QuotaManager } from "@/lib/quota-manager";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";
  const expected = process.env.CRON_SECRET;

  if (expected && authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  QuotaManager.resetAll();
  return NextResponse.json({ success: true, message: "Quota counters reset" });
}
