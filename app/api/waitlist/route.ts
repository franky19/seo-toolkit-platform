import { NextRequest, NextResponse } from "next/server";

const waitlistFeatureCounts = new Map<string, number>();

/**
 * POST /api/waitlist
 * Stores waitlist signup data.
 *
 * For production, replace the console.log with:
 *   - Vercel KV: await kv.lpush("waitlist", JSON.stringify(entry))
 *   - Resend/SendGrid: send a confirmation email
 *   - Airtable/Notion API: create a record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, feature } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Sanitize inputs
    const entry = {
      name: typeof name === "string" ? name.slice(0, 100) : "",
      email: email.toLowerCase().trim().slice(0, 255),
      feature: typeof feature === "string" ? feature.slice(0, 100) : "",
      timestamp: new Date().toISOString(),
      source: "homepage-waitlist",
    };

    if (entry.feature) {
      const current = waitlistFeatureCounts.get(entry.feature) ?? 0;
      waitlistFeatureCounts.set(entry.feature, current + 1);
    }

    const mostRequested = Array.from(waitlistFeatureCounts.entries()).sort(
      (a, b) => b[1] - a[1],
    )[0] ?? ["", 0];

    // Replace with real storage (Vercel KV, Airtable, Resend, etc.) for production.
    // Example with Vercel KV:
    // import { kv } from "@vercel/kv";
    // await kv.lpush("waitlist", JSON.stringify(entry));
    // TODO: Replace with real storage (Vercel KV, Airtable, Resend, etc.).

    return NextResponse.json({
      success: true,
      message: "Successfully joined waitlist",
      mostRequestedFeature: mostRequested[0],
      mostRequestedCount: mostRequested[1],
    });
  } catch (error) {
    console.error("[WAITLIST] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
