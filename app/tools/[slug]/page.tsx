import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const toolPages = {
  "google-news-validator": {
    title: "Google News Validator Tool",
    description: "Validate article eligibility for Google News with structured data and technical checks.",
    primaryKeyword: "google news validator",
  },
  "google-news-checker": {
    title: "Google News Checker Tool",
    description: "Check Google News optimization readiness and fix blockers quickly.",
    primaryKeyword: "google news checker",
  },
  "google-news-score": {
    title: "Google News Score Tool",
    description: "Get a score for Google News eligibility and implementation quality.",
    primaryKeyword: "google news score",
  },
  "google-discover-checker": {
    title: "Google Discover Checker Tool",
    description: "Evaluate discover optimization signals, image readiness, and freshness quality.",
    primaryKeyword: "google discover optimization",
  },
  "chatgpt-citation-checker": {
    title: "ChatGPT Citation Checker Tool",
    description: "Measure article citation readiness for ChatGPT and answer engines.",
    primaryKeyword: "chatgpt seo",
  },
  "perplexity-citation-checker": {
    title: "Perplexity Citation Checker Tool",
    description: "Audit content quality for Perplexity source selection and references.",
    primaryKeyword: "perplexity seo",
  },
  "ai-search-score": {
    title: "AI Search Score Tool",
    description: "Score AI search optimization factors across citation-focused systems.",
    primaryKeyword: "ai search optimization",
  },
} as const;

type ToolSlug = keyof typeof toolPages;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(toolPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = toolPages[slug as ToolSlug];
  if (!page) return { title: "Tool Not Found" };

  const url = `https://seo-toolkit-platform.vercel.app/tools/${slug}`;
  return {
    title: `${page.title} - Free Analyzer`,
    description: page.description,
    alternates: { canonical: url },
    keywords: [
      page.primaryKeyword,
      "google news seo",
      "google news optimization",
      "ai search optimization",
      "geo optimization",
    ],
    openGraph: {
      title: `${page.title} - Free Analyzer`,
      description: page.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} - Free Analyzer`,
      description: page.description,
    },
  };
}

export default async function ToolProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const page = toolPages[slug as ToolSlug];

  if (!page) notFound();

  const url = `https://seo-toolkit-platform.vercel.app/tools/${slug}`;

  return (
    <div className="min-h-screen bg-[#061217] text-slate-100">
      <Navbar />
      <main className="px-4 pb-16 pt-32 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
            Programmatic SEO Tool Page
          </p>
          <h1 className="mt-5 text-4xl font-black text-white sm:text-5xl">{page.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{page.description}</p>

          <article className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-semibold text-white">What this tool checks</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>Structured data and technical readiness signals</li>
              <li>Indexability, freshness, and canonical consistency</li>
              <li>Actionable fixes for better visibility and citation potential</li>
              <li>Keyword and intent alignment for {page.primaryKeyword}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/#analyze" className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60">
                Analyze Free
              </Link>
              <Link href="/blog" className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
                Read SEO Guides
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: page.title,
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            url,
            description: page.description,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
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
              { "@type": "ListItem", position: 1, name: "Home", item: "https://seo-toolkit-platform.vercel.app" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "https://seo-toolkit-platform.vercel.app/tools" },
              { "@type": "ListItem", position: 3, name: page.title, item: url },
            ],
          }),
        }}
      />
    </div>
  );
}
