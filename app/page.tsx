"use client";

import dynamic from "next/dynamic";
import { Accordion } from "@/components/ui/accordion";
import { HeroModern, FeaturesSection, WhyNotAppearingSection } from "@/components/modern-components";

const NewsletterWrapper = dynamic(
  () => import("@/components/newsletter-wrapper"),
  { ssr: false },
);

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
        <HeroModern />
        <WhyNotAppearingSection />
        <FeaturesSection />
        
        <section className="border-t border-border px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-16">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              items={FAQS.map((faq, i) => ({ value: `faq-${i}`, title: faq.q, children: faq.a }))}
            />
          </div>
        </section>
        <NewsletterWrapper />
      </main>
    </div>
  );
}
