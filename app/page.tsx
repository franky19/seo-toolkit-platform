"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import {
  AlertCircle,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileCode2,
  Loader2,
  Mail,
  Newspaper,
  Search,
  Sparkles,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Progress } from "@/components/ui/progress";
import { isQuotaInfo } from "@/lib/type-guards";
import { cacheQuota, getClientFingerprint, getOrCreateAnonymousId, quotaLabel, readCachedQuota, type QuotaInfo } from "@/lib/quota-client";
import { getScoreColor, isValidUrl } from "@/lib/utils";
import { AuditReport, AuditStatus } from "@/types";

const WHY_NOT_IN_NEWS = [
  "Missing or invalid NewsArticle schema",
  "Article blocked by noindex or robots directives",
  "Weak author and publisher trust signals",
  "Images below 1200px hurting Discover eligibility",
  "No fresh news sitemap or outdated publication dates",
  "Thin entity coverage for AI citation engines",
];

const ANALYSIS_AREAS = [
  {
    title: "Google News Score",
    keyword: "google news seo",
    text: "Validate google news requirements, news metadata, publisher signals, and google news optimization readiness.",
    icon: Newspaper,
  },
  {
    title: "Discover Score",
    keyword: "google discover optimization",
    text: "Check image quality, freshness, headlines, and feed eligibility for stronger discover traffic.",
    icon: Compass,
  },
  {
    title: "AI Citation Score",
    keyword: "ai search optimization",
    text: "Measure llm optimization, entity clarity, and citation readiness for ChatGPT, Gemini, Claude, and Perplexity.",
    icon: Bot,
  },
  {
    title: "Technical SEO Score",
    keyword: "google news checker",
    text: "Audit core technical issues including indexability, canonical integrity, schema coverage, and performance basics.",
    icon: FileCode2,
  },
];

const MANUAL_VS_TOOLKIT = [
  ["Audit speed per article", "20-45 min", "< 20 sec"],
  ["Google News validator checks", "Inconsistent", "Always included"],
  ["Google Discover optimization hints", "Manual guesswork", "Actionable checklist"],
  ["AI search optimization signals", "Not standardized", "Scored and prioritized"],
  ["Fix recommendations", "Not structured", "Clear next steps"],
];

const GOOGLE_NEWS_CHECKLIST = [
  "NewsArticle schema includes headline, image, datePublished, dateModified, author, and publisher",
  "Article URL is crawlable, indexable, and canonicalized",
  "Publisher identity is visible with editorial transparency",
  "Content is factual, timely, and clearly categorized as news",
  "News sitemap includes last 48-hour URLs and is submitted to Search Console",
  "Article image is high quality and at least 1200px wide",
];

const AI_CHECKLIST = [
  {
    engine: "ChatGPT",
    points: [
      "Clear question-and-answer blocks with direct claims",
      "Strong bylines and references for citation confidence",
    ],
  },
  {
    engine: "Gemini",
    points: [
      "Structured data and entity clarity aligned with Google systems",
      "Author expertise and trust pages linked internally",
    ],
  },
  {
    engine: "Claude",
    points: [
      "Context-rich explanations and balanced claims",
      "Transparent sources and methodology sections",
    ],
  },
  {
    engine: "Perplexity",
    points: [
      "Precise facts with scannable headings and source-ready snippets",
      "Strong topical authority through internal knowledge hubs",
    ],
  },
];

const FAQS = [
  {
    q: "What is Google News SEO?",
    a: "Google News SEO is the practice of optimizing article pages so they are eligible, indexable, and competitive in Google News and Top Stories surfaces.",
  },
  {
    q: "How do I get into Google News?",
    a: "Publish original news content, implement valid NewsArticle schema, maintain editorial transparency, and ensure strong crawl/index health. Then monitor in Search Console and Publisher Center.",
  },
  {
    q: "Why is my article not indexed in Google News?",
    a: "Common reasons include weak schema, noindex directives, low trust signals, stale sitemaps, slow crawling, or unclear publication metadata.",
  },
  {
    q: "What schema is required for Google News?",
    a: "NewsArticle schema is the core requirement, with supported fields for headline, image, datePublished, dateModified, author, publisher, and mainEntityOfPage.",
  },
  {
    q: "Does Google Discover require schema?",
    a: "Discover can surface pages without schema, but structured data improves understanding, while large images, freshness, and content quality are major ranking signals.",
  },
  {
    q: "How does a Google News validator help?",
    a: "A google news validator quickly checks eligibility signals and flags exact fixes, reducing manual audits and improving indexing confidence.",
  },
  {
    q: "What is google discover optimization in practice?",
    a: "It means optimizing image size and quality, aligning article intent to audience interests, improving on-page experience, and publishing with clear freshness signals.",
  },
  {
    q: "How do AI search engines choose sources?",
    a: "AI systems prioritize sources with clear entities, trustworthy authorship, strong structure, and verifiable information that can be cited with confidence.",
  },
  {
    q: "Can ChatGPT cite my article?",
    a: "Yes. Improve citation likelihood by using factual writing, clear structure, rich schema, and transparent authorship.",
  },
  {
    q: "How does Perplexity select references?",
    a: "Perplexity favors pages with concise answers, trustworthy data points, and strong topical relevance for the query.",
  },
  {
    q: "What is Generative Engine Optimization?",
    a: "Generative Engine Optimization, or GEO optimization, is the process of making content easy for AI engines to retrieve, trust, summarize, and cite.",
  },
  {
    q: "Is this tool free forever?",
    a: "Yes. The public analyzer is free with a 5 analyses per day quota for market validation and early feedback.",
  },
  {
    q: "Do I need to create an account to run audits?",
    a: "No login is required for the free analyzer. Authenticated users currently have the same 5-per-day quota.",
  },
  {
    q: "What happens after I get a score?",
    a: "You receive prioritized fixes for Google News SEO, Discover optimization, AI citation readiness, and technical SEO so you can improve fast.",
  },
  {
    q: "How often does quota reset?",
    a: "Quota resets every 24 hours. Your remaining count is shown directly in the analyzer section.",
  },
  {
    q: "Does this support llm optimization beyond Google?",
    a: "Yes. The analyzer includes chatgpt seo, gemini seo, perplexity seo, and broader ai search optimization checks.",
  },
];

const VOTING_FEATURES = [
  { id: "news-sitemap-generator", title: "News Sitemap Generator", baseVotes: 192 },
  { id: "schema-generator", title: "Schema Generator", baseVotes: 244 },
  { id: "ai-citation-checker", title: "AI Citation Checker", baseVotes: 276 },
  { id: "discover-checker", title: "Google Discover Checker", baseVotes: 218 },
];

function StatusIcon({ status }: Readonly<{ status: AuditStatus }>) {
  if (status === "PASS") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (status === "WARNING") return <AlertCircle className="h-4 w-4 text-amber-500" />;
  return <X className="h-4 w-4 text-red-500" />;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [quota, setQuota] = useState<QuotaInfo | null>(null);

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const [votes, setVotes] = useState<Record<string, number>>({});
  const [exitOpen, setExitOpen] = useState(false);

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    }),
    [],
  );

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

    const key = "gnst_returning_visitor";
    const isReturning = localStorage.getItem(key) === "1";
    track("returning_visitor", { returning: isReturning ? "yes" : "no" });
    localStorage.setItem(key, "1");

    const onMouseOut = (event: MouseEvent) => {
      const dismissed = localStorage.getItem("gnst_exit_modal_closed") === "1";
      if (dismissed || event.clientY > 8) return;
      setExitOpen(true);
      localStorage.setItem("gnst_exit_modal_closed", "1");
      track("exit_intent_modal_shown");
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
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

  async function handleWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!waitlistEmail?.includes("@")) {
      setError("Please enter a valid email for early access.");
      return;
    }

    setWaitlistLoading(true);
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
      setError("Unable to join newsletter right now. Please retry in a moment.");
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
    <div className="min-h-screen bg-[#061217] text-slate-100">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.10),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(249,115,22,0.10),transparent_38%)]" />

        <section id="analyze" className="relative px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                  Free Google News SEO Analyzer
                </p>
                <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                  Analyze Any Article for Google News, Discover and AI Search
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  Instantly check whether your article is eligible for google news, optimized for google discover optimization, and ready to be cited by ChatGPT, Gemini, Claude and Perplexity.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#071b23]/90 p-5 shadow-2xl shadow-black/30 sm:p-6">
                <label htmlFor="homepage-article-url" className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">Paste article URL</label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="homepage-article-url"
                      type="url"
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                      placeholder="https://yournewsdomain.com/article"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAudit}
                    disabled={loading}
                    className="inline-flex h-12 min-w-36 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-bold text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
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
                    <span key={item} className="inline-flex items-center gap-1 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      {item}
                    </span>
                  ))}
                </div>

                {error && <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Why Your Article Is Not Appearing In Google News</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              Most publishers do not fail because of one major issue. They lose visibility through several small misses across google news requirements, entity trust, and technical consistency.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_NOT_IN_NEWS.map((issue) => (
                <div key={issue} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <p className="inline-flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-300" />
                    {issue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What We Analyze</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              The scoring engine combines google news validator checks, discover signals, and ai search optimization factors into a single action plan.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {ANALYSIS_AREAS.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-300/15 p-2.5">
                      <item.icon className="h-5 w-5 text-cyan-200" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-cyan-200">{item.keyword}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
              <h3 className="text-lg font-semibold text-white">How Scoring Works and Why This Matters</h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">
                Scores are weighted by crawlability, structured data validity, publication trust signals, and citation readiness. Every score card includes actionable fixes so you never see a score without a next step.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Live Example Report</h2>
            <p className="mt-3 max-w-3xl text-slate-300">A clear report format with score transparency, methodology context, and precise fixes.</p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#081f28]/90 p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {scores.map((score) => (
                  <div key={score.label} className="rounded-xl border border-white/10 bg-black/20 p-4 text-center">
                    <p className={`text-3xl font-black ${getScoreColor(score.value)}`}>{score.value}</p>
                    <p className="mt-2 text-xs text-slate-300">{score.label}</p>
                    <Progress value={score.value} className="mt-2 h-1.5" />
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-white">Key Validation Signals</h3>
                    <StatusIcon status={auditReport?.googleNewsAudit.status ?? "WARNING"} />
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li className="flex items-center justify-between"><span>NewsArticle schema</span><span className="text-emerald-300">Pass</span></li>
                    <li className="flex items-center justify-between"><span>Author transparency</span><span className="text-amber-300">Warning</span></li>
                    <li className="flex items-center justify-between"><span>Entity coverage</span><span className="text-cyan-200">Strong</span></li>
                    <li className="flex items-center justify-between"><span>AI citation readiness</span><span className="text-emerald-300">Pass</span></li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-semibold text-white">Actionable Recommendations</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    {(auditReport?.recommendations.slice(0, 4) ?? [
                      { title: "Add detailed author page links", action: "Link each byline to a credential-rich author page." },
                      { title: "Increase image resolution", action: "Use at least one 1200px-wide image for discover eligibility." },
                      { title: "Expand entity context", action: "Include named entities and factual references for llm optimization." },
                      { title: "Strengthen publisher schema", action: "Add Organization + logo + sameAs profile links." },
                    ]).map((item, index) => (
                      <li key={`${item.title}-${index}`} className="rounded-lg border border-white/10 bg-black/20 p-3">
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-slate-300">{"action" in item ? item.action : "Apply recommended fixes to improve score."}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Google News Requirements Checklist</h2>
            <div className="mt-6 space-y-3">
              {GOOGLE_NEWS_CHECKLIST.map((item) => (
                <details key={item} className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white">
                    <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-300" />{item}</span>
                    <ChevronDown className="h-4 w-4 text-slate-300 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    This requirement directly impacts google news seo performance and should be validated for each published URL.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Will AI Search Cite Your Article?</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              We evaluate entity coverage, EEAT signals, structured data quality, author trust, and citation readiness across modern answer engines.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {AI_CHECKLIST.map((engine) => (
                <article key={engine.engine} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-white">{engine.engine} Optimization Checklist</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    {engine.points.map((point) => (
                      <li key={point} className="inline-flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 text-cyan-200" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Feature Comparison</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5 text-slate-200">
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Manual Audit</th>
                    <th className="px-4 py-3 font-semibold">Google News SEO Toolkit</th>
                  </tr>
                </thead>
                <tbody>
                  {MANUAL_VS_TOOLKIT.map((row) => (
                    <tr key={row[0]} className="border-t border-white/10 text-slate-200">
                      <td className="px-4 py-3">{row[0]}</td>
                      <td className="px-4 py-3 text-slate-300">{row[1]}</td>
                      <td className="px-4 py-3 text-emerald-200">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">FAQ</h2>
            <div className="mt-6 space-y-3">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
                    <span>{faq.q}</span>
                    <ChevronDown className="h-4 w-4 text-slate-300 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

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
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(event) => setWaitlistEmail(event.target.value)}
                      placeholder="you@publication.com"
                      className="h-11 w-full rounded-xl border border-white/20 bg-black/20 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-100 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={waitlistLoading}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-slate-900 transition hover:bg-slate-100 disabled:opacity-70"
                  >
                    {waitlistLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {waitlistLoading ? "Submitting" : "Join Waitlist"}
                  </button>
                </form>
                {waitlistSuccess && <p className="mt-3 text-sm text-emerald-200">You are on the list. We will share early access updates soon.</p>}
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
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${votes[feature.id] ? "bg-emerald-300/20 text-emerald-100" : "bg-white/15 text-white hover:bg-white/25"}`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {feature.baseVotes + (votes[feature.id] || 0)}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed bottom-4 right-4 z-40">
          <button
            type="button"
            onClick={() => {
              document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-900 shadow-xl shadow-black/20"
          >
            <Search className="h-4 w-4" />
            Analyze Free
          </button>
        </div>

        {exitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#082029] p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Before You Leave</h3>
                  <p className="mt-2 text-sm text-slate-300">Run one free google news checker audit now. No login required.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setExitOpen(false)}
                  className="rounded-md p-1 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setExitOpen(false);
                    document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="flex-1 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-900"
                >
                  Analyze Free
                </button>
                <button
                  type="button"
                  onClick={() => setExitOpen(false)}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Google News SEO Toolkit",
            url: "https://seo-toolkit-platform.vercel.app",
            description: "Free google news validator and ai search optimization toolkit for publishers.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Google News SEO Toolkit",
            url: "https://seo-toolkit-platform.vercel.app",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://seo-toolkit-platform.vercel.app/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Google News SEO Toolkit",
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://seo-toolkit-platform.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "Google News SEO Analyzer", item: "https://seo-toolkit-platform.vercel.app/#analyze" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Analyze Any Article for Google News, Discover and AI Search",
            description: "Landing page for a free google news checker and ai search optimization analyzer.",
            author: { "@type": "Organization", name: "Google News SEO Toolkit" },
            publisher: { "@type": "Organization", name: "Google News SEO Toolkit" },
            mainEntityOfPage: "https://seo-toolkit-platform.vercel.app/",
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
