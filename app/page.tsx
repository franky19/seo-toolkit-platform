"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Newspaper,
  Bot,
  Compass,
  FileCode,
  Rss,
  BarChart2,
  ThumbsUp,
  Building2,
  PenLine,
  Tv,
  Globe,
  Check,
  X as XIcon,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RateLimiter } from "@/lib/rate-limiter";
import { AuditReport, AuditStatus } from "@/types";
import { getScoreColor, isValidUrl } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const FEATURES = [
  {
    icon: Newspaper,
    title: "Google News Validator",
    desc: "Check NewsArticle schema, author, publisher, canonical URL, images, and publication date compliance.",
    href: "/google-news-validator",
    badge: "Core",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    icon: Bot,
    title: "AI Citation Checker",
    desc: "Verify your article is optimized for citation by ChatGPT Search, Gemini, and Perplexity AI.",
    href: "/ai-citation-checker",
    badge: "New",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    icon: Rss,
    title: "News Sitemap Validator",
    desc: "Validate your Google News sitemap structure, freshness signals, and submission errors.",
    href: "/news-sitemap-validator",
    badge: "Core",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    icon: FileCode,
    title: "News Schema Generator",
    desc: "Generate NewsArticle JSON-LD, Organization Schema, and Breadcrumb Schema for any article.",
    href: "/news-schema-generator",
    badge: "Popular",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  {
    icon: Compass,
    title: "Discover Readiness Checker",
    desc: "Analyze image quality, content freshness, and Google Discover ranking signals.",
    href: "/google-discover-checker",
    badge: "Core",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    icon: BarChart2,
    title: "Article SEO Analyzer",
    desc: "Audit title, meta description, headings, readability, and on-page SEO factors.",
    href: "/news-seo-checker",
    badge: "Core",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
  },
];

const AUDIENCE = [
  { icon: Newspaper, label: "Publishers" },
  { icon: PenLine, label: "Journalists" },
  { icon: Building2, label: "Newsrooms" },
  { icon: BarChart2, label: "SEO Teams" },
  { icon: Tv, label: "Editorial Teams" },
  { icon: Globe, label: "Media Companies" },
];

const ROADMAP = [
  {
    title: "Google News Monitoring",
    desc: "Track your articles' Google News indexing status in real time.",
    votes: 847,
    id: "news-monitoring",
  },
  {
    title: "AI Citation Monitoring",
    desc: "Get alerts when your content is cited by ChatGPT, Gemini, or Perplexity.",
    votes: 723,
    id: "ai-monitoring",
  },
  {
    title: "Bulk URL Analysis",
    desc: "Analyze hundreds of articles at once with CSV export.",
    votes: 612,
    id: "bulk-analysis",
  },
  {
    title: "Publisher Dashboard",
    desc: "Full newsroom dashboard with team collaboration and reporting.",
    votes: 589,
    id: "publisher-dashboard",
  },
  {
    title: "Editorial Recommendations",
    desc: "AI-powered content suggestions to improve your Google News ranking.",
    votes: 451,
    id: "editorial-ai",
  },
  {
    title: "Google Discover Monitoring",
    desc: "Track Discover impressions and clicks for your articles.",
    votes: 398,
    id: "discover-monitoring",
  },
];

// Main component
export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);

  // Waitlist form
  const [wName, setWName] = useState("");
  const [wEmail, setWEmail] = useState("");
  const [wFeature, setWFeature] = useState("");
  const [wLoading, setWLoading] = useState(false);
  const [wSuccess, setWSuccess] = useState(false);
  const [wError, setWError] = useState<string | null>(null);

  // Feature votes
  const [votes, setVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    const key = "gnst_returning_visitor";
    const isReturning = localStorage.getItem(key) === "1";
    track("returning_visitor", { returning: isReturning ? "yes" : "no" });
    localStorage.setItem(key, "1");

    const fired = new Set<number>();
    const marks = [25, 50, 75, 100];

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const mark of marks) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("scroll_depth", { percent: mark });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAudit = async () => {
    setError(null);

    if (!url) {
      setError("Please enter a URL");
      return;
    }
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (include https://)");
      return;
    }

    const rateLimit = RateLimiter.checkLimit();
    if (!rateLimit.allowed) {
      setError(
        `Daily limit reached. Resets in ${RateLimiter.getRemainingTime()}`,
      );
      return;
    }

    track("analyze_click", { url });
    setLoading(true);
    setAuditReport(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze article");
      }

      const data: AuditReport = await response.json();
      setAuditReport(data);
      RateLimiter.incrementCount();
      track("analyze_success");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during analysis",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWaitlist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wEmail || !wEmail.includes("@")) {
      setWError("Please enter a valid email");
      return;
    }
    setWLoading(true);
    setWError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: wName, email: wEmail, feature: wFeature }),
      });
      if (!res.ok) throw new Error("Failed to join waitlist");
      setWSuccess(true);
      track("waitlist_signup", { feature: wFeature });
    } catch {
      setWError("Something went wrong. Please try again.");
    } finally {
      setWLoading(false);
    }
  };

  const handleVote = async (id: string) => {
    if (votes[id]) return; // already voted
    setVotes((v) => ({ ...v, [id]: 1 }));
    track("feature_vote", { feature: id });
    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature: id }),
      });
    } catch {
      /* silent */
    }
  };

  const StatusIcon = ({ status }: { status: AuditStatus }) => {
    if (status === "PASS")
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (status === "WARNING")
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />

      {/* â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
        id="analyze"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            Google News Â· Discover Â· ChatGPT Â· Gemini Â· Perplexity
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5 leading-[1.1]"
          >
            Analyze Any Article for
            <span className="block gradient-text-indigo">
              Google News & AI Search
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto mb-10"
          >
            Instantly check Google News eligibility, NewsArticle schema,
            indexing readiness, Discover optimization, and AI citation potential
            â€” free, no signup.
          </motion.p>

          {/* URL Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="url"
                  placeholder="Paste article URL... (e.g. https://techcrunch.com/...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAudit()}
                  disabled={loading}
                  className="w-full h-14 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleAudit}
                disabled={loading}
                className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white text-sm transition-all flex items-center gap-2 justify-center shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze Free
                  </>
                )}
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-6 mt-5 text-xs text-white/40">
              {[
                "No signup required",
                "5 analyses daily",
                "Results in seconds",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€â”€ REAL RESULTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <AnimatePresence>
        {auditReport && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="px-4 sm:px-6 pb-16"
          >
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Score overview */}
              <div className="card-surface p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Article Analysis Results
                    </h2>
                    <p className="text-sm text-white/50 mt-0.5 truncate max-w-sm">
                      {auditReport.url}
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                    Analysis Complete
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Overall Score",
                      value: auditReport.overallScore,
                      color: "indigo",
                    },
                    {
                      label: "Google News",
                      value: auditReport.googleNewsScore,
                      color: "green",
                    },
                    {
                      label: "AI Citation",
                      value: auditReport.aiSearchScore,
                      color: "blue",
                    },
                    {
                      label: "Schema",
                      value: auditReport.schemaScore,
                      color: "purple",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center p-4 bg-white/3 rounded-xl border border-white/5"
                    >
                      <div
                        className={`text-3xl font-bold mb-1 ${getScoreColor(s.value)}`}
                      >
                        {s.value}
                      </div>
                      <div className="text-xs text-white/50">{s.label}</div>
                      <Progress value={s.value} className="mt-2 h-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Google News */}
                <div className="card-surface p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-green-400" />
                      Google News
                    </h3>
                    <StatusIcon status={auditReport.googleNewsAudit.status} />
                  </div>
                  <div className="space-y-2.5">
                    {[
                      {
                        label: "NewsArticle Schema",
                        value: auditReport.googleNewsAudit.hasNewsArticleSchema,
                      },
                      {
                        label: "Author",
                        value: !!auditReport.googleNewsAudit.author,
                      },
                      {
                        label: "Publisher",
                        value: !!auditReport.googleNewsAudit.publisher,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-white/60">{item.label}</span>
                        <span
                          className={
                            item.value ? "text-green-400" : "text-red-400"
                          }
                        >
                          {item.value ? "âœ“ Pass" : "âœ— Missing"}
                        </span>
                      </div>
                    ))}
                    {auditReport.googleNewsAudit.issues
                      .slice(0, 3)
                      .map((issue, i) => (
                        <p
                          key={i}
                          className="text-xs text-yellow-400/80 bg-yellow-500/5 px-3 py-2 rounded-lg border border-yellow-500/10"
                        >
                          âš  {issue}
                        </p>
                      ))}
                  </div>
                </div>

                {/* AI Search */}
                <div className="card-surface p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Bot className="w-4 h-4 text-indigo-400" />
                      AI Citation Readiness
                    </h3>
                    <StatusIcon status={auditReport.aiSearchAudit.status} />
                  </div>
                  <div className="space-y-2.5">
                    {[
                      {
                        label: "FAQ Schema",
                        value: auditReport.aiSearchAudit.hasFAQSchema,
                      },
                      {
                        label: "llms.txt",
                        value: auditReport.aiSearchAudit.hasLlmsTxt,
                      },
                      {
                        label: "ai.txt",
                        value: auditReport.aiSearchAudit.hasAiTxt,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-white/60">{item.label}</span>
                        <span
                          className={
                            item.value ? "text-green-400" : "text-red-400"
                          }
                        >
                          {item.value ? "âœ“ Pass" : "âœ— Missing"}
                        </span>
                      </div>
                    ))}
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-white/60">
                          Schema Completeness
                        </span>
                        <span className="text-white/80">
                          {auditReport.aiSearchAudit.schemaCompleteness}%
                        </span>
                      </div>
                      <Progress
                        value={auditReport.aiSearchAudit.schemaCompleteness}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Schema */}
                <div className="card-surface p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-purple-400" />
                      Schema Validation
                    </h3>
                    <StatusIcon status={auditReport.schemaValidation.status} />
                  </div>
                  <div className="space-y-2.5">
                    {(
                      [
                        "Organization",
                        "Article",
                        "NewsArticle",
                        "Website",
                        "Breadcrumb",
                      ] as const
                    ).map((schema) => {
                      const key =
                        `has${schema}` as keyof typeof auditReport.schemaValidation;
                      const has = auditReport.schemaValidation[key];
                      return (
                        <div
                          key={schema}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-white/60">{schema} Schema</span>
                          <span
                            className={has ? "text-green-400" : "text-white/20"}
                          >
                            {has ? "âœ“" : "â€”"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SEO Meta */}
                <div className="card-surface p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-400" />
                      SEO Meta
                    </h3>
                    <StatusIcon status={auditReport.seoAudit.meta.status} />
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <p className="text-xs text-white/40 mb-1">Title</p>
                      <p className="text-sm text-white/80 truncate">
                        {auditReport.seoAudit.meta.data.title || (
                          <span className="text-red-400">Missing</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-1">Description</p>
                      <p className="text-sm text-white/80 line-clamp-2">
                        {auditReport.seoAudit.meta.data.description || (
                          <span className="text-red-400">Missing</span>
                        )}
                      </p>
                    </div>
                    {auditReport.seoAudit.meta.issues
                      .slice(0, 2)
                      .map((issue, i) => (
                        <p
                          key={i}
                          className="text-xs text-yellow-400/80 bg-yellow-500/5 px-3 py-2 rounded-lg border border-yellow-500/10"
                        >
                          âš  {issue}
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {auditReport.recommendations.length > 0 && (
                <div className="card-surface p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Recommendations
                  </h3>
                  <div className="space-y-3">
                    {auditReport.recommendations.slice(0, 8).map((rec, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 bg-white/3 rounded-xl border border-white/5"
                      >
                        <span
                          className={`shrink-0 text-xs px-2 py-1 rounded font-medium h-fit mt-0.5 border ${
                            rec.priority === "HIGH"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : rec.priority === "MEDIUM"
                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {rec.priority}
                        </span>
                        <div>
                          <p className="font-medium text-white text-sm">
                            {rec.title}
                          </p>
                          <p className="text-xs text-white/50 mt-0.5">
                            {rec.description}
                          </p>
                          <p className="text-xs text-indigo-400 mt-1.5">
                            â†’ {rec.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* â”€â”€â”€ MOCK RESULTS PREVIEW (shown only when no real results) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {!auditReport && !loading && (
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm text-white/40 uppercase tracking-widest font-medium">
                Example Output
              </p>
              <h2 className="text-xl font-semibold text-white mt-2">
                Here&apos;s what your results will look like
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-surface p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Blur overlay on bottom to hint at more content */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-10" />

              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/5">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Newspaper className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    techcrunch.com/2024/example-article
                  </p>
                  <p className="text-xs text-white/40">
                    Analysis completed in 1.2s
                  </p>
                </div>
                <span className="ml-auto text-xs px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                  Analysis Complete
                </span>
              </div>

              {/* Score cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: "Google News Score",
                    value: 92,
                    color: "text-green-400",
                  },
                  {
                    label: "AI Citation Score",
                    value: 88,
                    color: "text-indigo-400",
                  },
                  {
                    label: "Discover Readiness",
                    value: 85,
                    color: "text-blue-400",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-4 bg-white/3 rounded-xl border border-white/5"
                  >
                    <div className={`text-3xl font-bold ${s.color}`}>
                      {s.value}
                    </div>
                    <div className="text-xs text-white/40 mt-1">/ 100</div>
                    <div className="text-xs text-white/60 mt-2">{s.label}</div>
                    <Progress value={s.value} className="mt-2 h-1" />
                  </div>
                ))}
              </div>

              {/* Checks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: "NewsArticle Schema", pass: true },
                  { label: "Author Byline", pass: true },
                  { label: "Canonical URL", pass: true },
                  { label: "Indexable", pass: true },
                  { label: "Publisher Logo", pass: false, warn: true },
                  { label: "FAQ Schema", pass: false },
                ].map((c) => (
                  <div
                    key={c.label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${
                      c.pass
                        ? "bg-green-500/5 border-green-500/15 text-green-400"
                        : c.warn
                          ? "bg-yellow-500/5 border-yellow-500/15 text-yellow-400"
                          : "bg-red-500/5 border-red-500/15 text-red-400"
                    }`}
                  >
                    {c.pass ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : c.warn ? (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    {c.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* â”€â”€â”€ WHO IS THIS FOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="px-4 sm:px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Designed For
            </p>
            <h2 className="text-3xl font-bold text-white">
              Built for the people behind the news
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Whether you run a single blog or a global newsroom, this toolkit
              helps you reach more readers through Google News and AI search.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {AUDIENCE.map((a) => (
              <div
                key={a.label}
                className="card-surface flex flex-col items-center gap-3 py-6 px-4 rounded-xl hover:border-indigo-500/20 transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <a.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-white/80">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ WHY DIFFERENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="px-4 sm:px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Why This Is Different
            </p>
            <h2 className="text-3xl font-bold text-white">
              Not another generic SEO tool
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Traditional SEO tools were built for bloggers and e-commerce.
              We&apos;re built exclusively for publishers and news media.
            </p>
          </div>

          <div className="card-surface overflow-hidden rounded-2xl">
            <div className="grid grid-cols-3 text-sm">
              {/* Header */}
              <div className="p-5 bg-white/2 border-b border-r border-white/5">
                <p className="font-semibold text-white/50">Feature</p>
              </div>
              <div className="p-5 bg-white/2 border-b border-r border-white/5 text-center">
                <p className="font-semibold text-white/50">
                  Traditional SEO Tools
                </p>
              </div>
              <div className="p-5 bg-indigo-500/5 border-b border-white/5 text-center">
                <p className="font-semibold text-indigo-300">
                  Google News SEO Toolkit
                </p>
              </div>

              {/* Rows */}
              {[
                ["Google News Eligibility Check", false, true],
                ["NewsArticle Schema Validation", false, true],
                ["Discover Readiness Score", false, true],
                ["AI Citation Readiness", false, true],
                ["Publisher Optimization", false, true],
                ["News Sitemap Validation", false, true],
                ["Keyword Rankings", true, false],
                ["Backlink Analysis", true, false],
              ].map(([feature, trad, ours], i) => (
                <>
                  <div
                    key={`f-${i}`}
                    className={`p-4 border-b border-r border-white/5 flex items-center ${i === 5 ? "" : ""}`}
                  >
                    <span className="text-white/70 text-sm">
                      {feature as string}
                    </span>
                  </div>
                  <div
                    key={`t-${i}`}
                    className="p-4 border-b border-r border-white/5 flex items-center justify-center"
                  >
                    {trad ? (
                      <Check className="w-4 h-4 text-white/30" />
                    ) : (
                      <XIcon className="w-4 h-4 text-white/15" />
                    )}
                  </div>
                  <div
                    key={`o-${i}`}
                    className={`p-4 border-b border-white/5 flex items-center justify-center bg-indigo-500/3`}
                  >
                    {ours ? (
                      <Check className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <XIcon className="w-4 h-4 text-white/15" />
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ CORE FEATURES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="px-4 sm:px-6 py-20 border-t border-white/5"
        id="tools"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Free Tools
            </p>
            <h2 className="text-3xl font-bold text-white">
              Everything a news publisher needs
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Six specialized tools to audit, validate, and optimize your
              articles for Google News and AI search.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                onClick={() => track("tool_click", { tool: f.href })}
                className="card-surface group p-6 rounded-2xl hover:border-indigo-500/25 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-indigo-500/10 flex items-center justify-center transition-colors">
                    <f.icon className="w-5 h-5 text-white/60 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium ${f.badgeColor}`}
                  >
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {f.desc}
                </p>
                <div className="mt-4 flex items-center text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Try it free <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/news-seo-checker"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-5 py-2.5 transition-all"
            >
              View All Tools <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ ROADMAP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="px-4 sm:px-6 py-20 border-t border-white/5"
        id="roadmap"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Roadmap
            </p>
            <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Vote for the features you need most. We build based on real
              demand.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {ROADMAP.map((item) => (
              <div
                key={item.id}
                className="card-surface p-5 rounded-2xl flex items-start gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-white/5 text-white/50 border border-white/8 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mt-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleVote(item.id)}
                  className={`shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all text-sm font-medium ${
                    votes[item.id]
                      ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                      : "bg-white/3 border-white/8 text-white/50 hover:bg-white/8 hover:text-white"
                  }`}
                  aria-label={`Vote for ${item.title}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{item.votes + (votes[item.id] || 0)}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ WAITLIST â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="px-4 sm:px-6 py-20 border-t border-white/5"
        id="waitlist"
      >
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
            <Star className="w-3.5 h-3.5" />
            Early Access Limited Spots
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Join Early Access
          </h2>
          <p className="text-white/50 mb-10">
            Be first to access monitoring, bulk analysis, and the full publisher
            dashboard. Free for early members.
          </p>

          {wSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-surface p-8 rounded-2xl text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                You&apos;re on the list!
              </h3>
              <p className="text-white/50 text-sm">
                We&apos;ll notify you when your feature is ready. Thank you for
                your interest.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleWaitlist}
              className="card-surface p-6 sm:p-8 rounded-2xl space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2 text-left">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={wName}
                  onChange={(e) => setWName(e.target.value)}
                  className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2 text-left">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@yourpublication.com"
                  value={wEmail}
                  onChange={(e) => setWEmail(e.target.value)}
                  required
                  className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2 text-left">
                  Which feature would help you most?
                </label>
                <select
                  value={wFeature}
                  onChange={(e) => setWFeature(e.target.value)}
                  className="w-full h-11 px-4 bg-[#111] border border-white/10 rounded-lg text-white/80 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                >
                  <option value="">Select a feature...</option>
                  <option value="google-news-validator">
                    Google News Validator
                  </option>
                  <option value="ai-citation-checker">
                    AI Citation Checker
                  </option>
                  <option value="discover-checker">Discover Checker</option>
                  <option value="schema-generator">Schema Generator</option>
                  <option value="monitoring">News Monitoring</option>
                  <option value="bulk-analysis">Bulk URL Analysis</option>
                  <option value="publisher-dashboard">
                    Publisher Dashboard
                  </option>
                </select>
              </div>

              {wError && (
                <p className="text-sm text-red-400 bg-red-500/10 px-4 py-3 rounded-lg border border-red-500/20">
                  {wError}
                </p>
              )}

              <button
                type="submit"
                disabled={wLoading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                {wLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-white/30 text-center">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
