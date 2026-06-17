import { NextRequest, NextResponse } from "next/server";

const VALID_FEATURES = new Set([
  "news-monitoring",
  "ai-monitoring",
  "bulk-analysis",
  "publisher-dashboard",
  "editorial-ai",
  "discover-monitoring",
  "google-news-validator",
  "ai-citation-checker",
  "discover-checker",
  "schema-generator",
  "monitoring",
]);

const voteCounts = new Map<string, number>();

/**
 * POST /api/vote
 * Records a feature vote.
 *
 * For production, replace the console.log with:
 *   - Vercel KV: await kv.incr(`votes:${feature}`)
 *   - Database: INSERT INTO votes ...
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { feature } = body;

    if (!feature || typeof feature !== "string") {
      return NextResponse.json({ error: "Feature ID is required" }, { status: 400 });
    }

    // Validate feature ID against allowlist to prevent injection
    const sanitized = feature.slice(0, 100).toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!VALID_FEATURES.has(sanitized)) {
      return NextResponse.json({ error: "Unknown feature" }, { status: 400 });
    }

    const updated = (voteCounts.get(sanitized) ?? 0) + 1;
    voteCounts.set(sanitized, updated);

    const leaderboard = Array.from(voteCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([featureId, count]) => ({ featureId, count }));

    // Replace with persistent storage in production (database or KV).
    console.log("[VOTE] Feature vote recorded:", sanitized);

    return NextResponse.json({
      success: true,
      feature: sanitized,
      votes: updated,
      leaderboard,
    });
  } catch (error) {
    console.error("[VOTE] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
