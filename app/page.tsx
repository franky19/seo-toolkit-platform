/** @format */

"use client";
import {
  Check,
  ChevronDown,
  AlertCircle,
  Newspaper,
  Compass,
  Bot,
  FileCode2,
  Sparkles,
  Search,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Accordion,
} from "@/components/ui/accordion";

const HeroWrapper = dynamic(() => import("@/components/hero-wrapper"), {
  ssr: true,
  loading: () => <div className="h-[700px] w-full" />,
});
const NewsletterWrapper = dynamic(
  () => import("@/components/newsletter-wrapper"),
  { ssr: false },
);

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
  [
    "Google Discover optimization hints",
    "Manual guesswork",
    "Actionable checklist",
  ],
  [
    "AI search optimization signals",
    "Not standardized",
    "Scored and prioritized",
  ],
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,var(--primary),transparent_35%),radial-gradient(circle_at_80%_20%,var(--primary),transparent_32%),radial-gradient(circle_at_50%_90%,var(--primary),transparent_38%)] opacity-10"
          aria-hidden="true"
        />
        <HeroWrapper />
        <section className="border-t border-border px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Why Your Article Is Not Appearing In Google News
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Most publishers do not fail because of one major issue. They lose
              visibility through several small misses across google news
              requirements, entity trust, and technical consistency.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_NOT_IN_NEWS.map((issue) => (
                <div
                  key={issue}
                  className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground">
                  <p className="inline-flex items-center gap-2">
                    <AlertCircle
                      className="h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    />
                    {issue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-border px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              What We Analyze
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {ANALYSIS_AREAS.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-xl bg-primary/15 p-2.5"
                      aria-hidden="true">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-primary">
                        {item.keyword}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-border px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Google News Requirements Checklist
            </h2>
            <div className="mt-6 space-y-3">
              {GOOGLE_NEWS_CHECKLIST.map((item) => (
                <details
                  key={item}
                  className="group rounded-2xl border border-border bg-card p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Check
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 text-muted-foreground transition group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    This requirement directly impacts google news seo
                    performance and should be validated for each published URL.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-border px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Will AI Search Cite Your Article?
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {AI_CHECKLIST.map((engine) => (
                <article
                  key={engine.engine}
                  className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-lg font-semibold text-foreground">
                    {engine.engine} Optimization Checklist
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {engine.points.map((point) => (
                      <li key={point} className="inline-flex items-start gap-2">
                        <Sparkles
                          className="mt-0.5 h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-border px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Feature Comparison
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                    <th scope="col" className="px-4 py-3 font-semibold">SEO Toolkit</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Typical Free SEO Tool</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["No Login Required", "✅", "❌"],
                    ["AI Recommendations", "✅", "❌"],
                    ["Real-time Analysis", "✅", "⚠️"],
                    ["Export PDF", "✅", "❌"],
                    ["Dark Mode", "✅", "⚠️"],
                    ["Mobile Friendly", "✅", "⚠️"],
                    ["Accessibility Audit", "✅", "❌"],
                    ["Core Web Vitals", "✅", "⚠️"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-border text-foreground">
                      <td className="px-4 py-3">{row[0]}</td>
                      <td className="px-4 py-3 text-primary">{row[1]}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="border-t border-border px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl text-center mb-10">
              FAQ
            </h2>
            <Accordion
              type="single"
              collapsible
              items={FAQS.map((faq, i) => ({ value: `faq-${i}`, title: faq.q, children: faq.a }))}
            />
          </div>
        </section>
        <NewsletterWrapper />
        <div className="fixed bottom-4 right-4 z-40">
          <Link
            href="/#analyze"
            aria-label="Analyze Free"
            className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Search className="h-4 w-4" aria-hidden="true" />
            Analyze Free
          </Link>
        </div>
      </main>
    </div>
  );
}