import { NextRequest, NextResponse } from "next/server";
import { QuotaManager } from "@/lib/quota-manager";

export async function GET(request: NextRequest) {
  const quota = QuotaManager.getQuota(request);
  const response = NextResponse.json({ quota: quota.payload });
  QuotaManager.attachAnonymousCookie(response, quota.anonIdToSet);
  return response;
}
