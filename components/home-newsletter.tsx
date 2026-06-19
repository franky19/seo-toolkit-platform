"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { Loader2, Mail, ThumbsUp } from "lucide-react";

const VOTING_FEATURES = [
  { id: "news-sitemap-generator", title: "News Sitemap Generator", baseVotes: 192 },
  { id: "schema-generator", title: "Schema Generator", baseVotes: 244 },
  { id: "ai-citation-checker", title: "AI Citation Checker", baseVotes: 276 },
  { id: "discover-checker", title: "Google Discover Checker", baseVotes: 218 },
];

export default function NewsletterSection() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});

  async function handleWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!waitlistEmail?.includes("@")) {
      setWaitlistError("Please enter a valid email for early access.");
      return;
    }

    setWaitlistLoading(true);
    setWaitlistError(null);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail,
          feature: "homepage-news-analyzer",
          source: "newsletter",
        }),
      });

      if (!response.ok) throw new Error("Could not submit waitlist request");
      setWaitlistSuccess(true);
      track("newsletter_signup");
    } catch {
      setWaitlistError("Unable to join newsletter right now. Please retry in a moment.");
    } finally {
      setWaitlistLoading(false);
    }
  }

  async function handleVote(featureId: string) {
    if (votes?.[featureId]) return;

    setVotes((prev) => ({ ...prev, [featureId]: 1 }));
    track("feature_vote", { feature: featureId });

    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature: featureId }),
      });
    } catch {
      // no-op
    }
  }

  return (
    <section id="newsletter" className="border-t border-white/5 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Newsletter Signup and Early Access Waitlist</h2>
            <p className="mt-3 text-sm leading-relaxed text-cyan-50/90">
              Get weekly Google News SEO, chatgpt seo, gemini seo, perplexity seo, and geo optimization updates. Join early access to influence product direction.
            </p>
            <form onSubmit={handleWaitlistSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(event) => setWaitlistEmail(event.target.value)}
                  placeholder="you@publication.com"
                  aria-label="Email address for early access"
                  className="h-11 w-full rounded-xl border border-white/20 bg-black/20 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100/40"
                />
              </div>
              <button
                type="submit"
                disabled={waitlistLoading}
                aria-label={waitlistLoading ? "Submitting email" : "Join waitlist"}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-slate-900 transition hover:bg-slate-100 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {waitlistLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {waitlistLoading ? "Submitting" : "Join Waitlist"}
              </button>
            </form>
            {waitlistSuccess && <p className="mt-3 text-sm text-emerald-200" role="status">You are on the list. We will share early access updates soon.</p>}
            {waitlistError && <p className="mt-3 text-sm text-red-300" role="alert">{waitlistError}</p>}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Feature Voting</h3>
            <p className="mt-2 text-sm text-cyan-50/90">Vote for the next feature release. We prioritize by market demand.</p>
            <div className="mt-4 space-y-2">
              {VOTING_FEATURES.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between rounded-xl border border-white/15 bg-black/20 p-3">
                  <p className="text-sm text-white">{feature.title}</p>
                  <button
                    type="button"
                    onClick={() => handleVote(feature.id)}
                    disabled={!!votes[feature.id]}
                    aria-label={`Vote for ${feature.title}. Current votes: ${feature.baseVotes + (votes[feature.id] || 0)}`}
                    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 ${votes[feature.id] ? "bg-emerald-300/20 text-emerald-100" : "bg-white/15 text-white hover:bg-white/25"}`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
                    {feature.baseVotes + (votes[feature.id] || 0)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
