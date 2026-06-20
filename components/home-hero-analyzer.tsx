"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { AlertCircle, CheckCircle2, Loader2, Search, Zap } from "lucide-react";
import { isQuotaInfo } from "@/lib/type-guards";
import {
  cacheQuota,
  getClientFingerprint,
  getOrCreateAnonymousId,
  quotaLabel,
  readCachedQuota,
  type QuotaInfo,
} from "@/lib/quota-client";
import { isValidUrl } from "@/lib/utils";
import type { AuditReport, AuditStatus } from "@/types";

function StatusIcon({ status }: Readonly<{ status: AuditStatus }>) {
  if (status === "PASS") return <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />;
  if (status === "WARNING") return <AlertCircle className="h-4 w-4 text-amber-500" aria-hidden="true" />;
  return <span className="h-4 w-4 text-red-500" aria-hidden="true">&#10005;</span>;
}

export default function HeroAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [quota, setQuota] = useState<QuotaInfo | null>(null);

  async function fetchQuota() {
    try {
      const response = await fetch("/api/quota", {
        headers: {
          "x-client-fingerprint": getClientFingerprint(),
          "x-anon-id": getOrCreateAnonymousId(),
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      if (isQuotaInfo(data.quota)) {
        setQuota(data.quota);
        cacheQuota(data.quota);
      }
    } catch {
      const cached = readCachedQuota();
      if (cached) setQuota(cached);
    }
  }

  useEffect(() => {
    const cached = readCachedQuota();
    if (cached) setQuota(cached);
    fetchQuota();
  }, []);

  async function handleAudit() {
    setError(null);

    if (!url.trim()) {
      setError("Please paste an article URL.");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL including https://.");
      return;
    }

    if (quota && quota.remaining <= 0) {
      setError("Daily limit reached. Please try again after reset.");
      return;
    }

    setLoading(true);
    setAuditReport(null);
    track("analyze_click", { location: "hero" });

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-fingerprint": getClientFingerprint(),
          "x-anon-id": getOrCreateAnonymousId(),
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (isQuotaInfo(data?.quota)) {
        setQuota(data.quota);
        cacheQuota(data.quota);
      }

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze this URL right now.");
      }

      setAuditReport(data as AuditReport);
      track("analyze_success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error while analyzing URL.");
      track("analyze_error");
    } finally {
      setLoading(false);
    }
  }

  const remainingLabel = quota ? quotaLabel(quota) : "Loading daily quota...";
  const discoverScore = auditReport
    ? Math.round((auditReport.technicalSEOScore + auditReport.schemaScore) / 2)
    : 79;

  const scores = auditReport
    ? [
        { label: "Overall Score", value: auditReport.overallScore },
        { label: "Google News Score", value: auditReport.googleNewsScore },
        { label: "Discover Score", value: discoverScore },
        { label: "AI Citation Score", value: auditReport.aiSearchScore },
        { label: "Technical SEO Score", value: auditReport.technicalSEOScore },
      ]
    : [
        { label: "Overall Score", value: 84 },
        { label: "Google News Score", value: 88 },
        { label: "Discover Score", value: 79 },
        { label: "AI Citation Score", value: 82 },
        { label: "Technical SEO Score", value: 83 },
      ];

  return (
    <>
      <section id="analyze" className="relative px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                Free Google News SEO Analyzer
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Analyze Any Article for Google News, Discover and AI Search
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Instantly check whether your article is eligible for google news, optimized for google discover optimization, and ready to be cited by ChatGPT, Gemini, Claude and Perplexity.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <label htmlFor="homepage-article-url" className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Paste article URL</label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id="homepage-article-url"
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://yournewsdomain.com/article"
                    aria-label="Article URL to analyze"
                    className="h-12 w-full rounded-xl border border-border bg-background/80 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAudit}
                  disabled={loading}
                  aria-label={loading ? "Analyzing article..." : "Analyze Free"}
                    className="inline-flex h-12 min-w-36 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Zap className="h-4 w-4" aria-hidden="true" />}
                  {loading ? "Analyzing" : "Analyze Free"}
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-300">{remainingLabel}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-200 sm:grid-cols-4">
                {[
                  "No Login Required",
                  "Free Forever",
                  "5 Analyses Per Day",
                  "Results In Seconds",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-foreground shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>

              {error && <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">{error}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Live Example Report</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">A clear report format with score transparency, methodology context, and precise fixes.</p>

            <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {scores.map((score) => (
                  <div key={score.label} className="rounded-xl border border-border bg-background/80 p-4 text-center shadow-sm">
                  <p className="text-3xl font-black text-primary">{score.value}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{score.label}</p>
                  <div
                    className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={score.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${score.label}: ${score.value} out of 100`}
                  >
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${score.value}%` }}
                      />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Key Validation Signals</h3>
                  <StatusIcon status={auditReport?.googleNewsAudit.status ?? "WARNING"} />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center justify-between"><span>NewsArticle schema</span><span className="text-emerald-600">Pass</span></li>
                  <li className="flex items-center justify-between"><span>Author transparency</span><span className="text-amber-600">Warning</span></li>
                  <li className="flex items-center justify-between"><span>Entity coverage</span><span className="text-primary">Strong</span></li>
                  <li className="flex items-center justify-between"><span>AI citation readiness</span><span className="text-emerald-600">Pass</span></li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h3 className="font-semibold text-foreground">Actionable Recommendations</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {(auditReport?.recommendations.slice(0, 4) ?? [
                    { title: "Add detailed author page links", action: "Link each byline to a credential-rich author page." },
                    { title: "Increase image resolution", action: "Use at least one 1200px-wide image for discover eligibility." },
                    { title: "Expand entity context", action: "Include named entities and factual references for llm optimization." },
                    { title: "Strengthen publisher schema", action: "Add Organization + logo + sameAs profile links." },
                  ]).map((item, index) => (
                    <li key={`${item.title}-${index}`} className="rounded-lg border border-border bg-background/70 p-3 shadow-sm">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-muted-foreground">{"action" in item ? item.action : "Apply recommended fixes to improve score."}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
