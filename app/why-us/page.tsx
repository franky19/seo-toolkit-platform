import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

export const metadata: Metadata = {
  title: "Why Us | SEO Toolkit Platform",
  description: "Why choose SEO Toolkit Platform over generic SEO tools? Discover our specialized focus on Google News, Discover, and AI Search Optimization.",
  alternates: { canonical: `${siteUrl}/why-us` },
};

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link> / <span aria-current="page">Why Us</span>
          </nav>
          
          <h1 className="text-4xl font-bold tracking-tight mb-6">Why SEO Toolkit Platform?</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            While generic SEO tools offer broad coverage, modern publishers need specialized precision. 
            We focus on where traffic actually lives today: Google News, Discover, and AI Search.
          </p>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">The Problem with &quot;All-in-One&quot; Free Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold mb-3">Broad, Not Deep</h3>
                <p className="text-muted-foreground">Most free toolkits provide 50+ basic metrics. They track technical health but miss the nuanced requirements for Google News eligibility and AI citation readiness.</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold mb-3">Generic Optimization</h3>
                <p className="text-muted-foreground">They offer generic SEO advice. In 2026, being &quot;SEO friendly&quot; isn&apos;t enough to get cited by ChatGPT, Gemini, or Perplexity.</p>
              </div>
            </div>
          </section>

          <section className="mb-16 rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <h2 className="text-3xl font-bold mb-6">The Competitive Edge: Specialized Focus</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                <strong>Google News & Discover:</strong> We don&apos;t just check crawlability. We audit for NewsArticle schema, 1200px+ high-quality images, and freshness signals that trigger Top Stories and Discover surfaces.
              </p>
              <p>
                <strong>AI Citation Readiness:</strong> This is our core differentiator. We analyze content structure, entity clarity, and source transparency—the exact signals AI engines use to decide whether to cite your article or ignore it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">Case Study: The &quot;Generic SEO&quot; Trap</h2>
            <div className="rounded-3xl border border-border bg-card p-8">
              <p className="italic text-lg mb-6 leading-relaxed">
                A publisher used a popular 70+ tool platform to audit their site. Their technical SEO score was 95/100, but their Google News traffic remained stagnant. 
                When they ran their article through SEO Toolkit Platform, we flagged an invalid NewsArticle schema and missing author bylines—critical trust signals that generic scanners simply don&apos;t check.
              </p>
              <p className="font-semibold text-foreground">Result: After applying our specific fixes, they achieved eligibility for Google News within 48 hours.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
