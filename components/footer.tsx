import Link from "next/link";
import { Newspaper, Rss } from "lucide-react";

const tools = [
  { href: "/tools/google-news-validator", label: "Google News Validator" },
  { href: "/tools/google-news-checker", label: "Google News Checker" },
  { href: "/tools/google-news-score", label: "Google News Score" },
  { href: "/tools/google-discover-checker", label: "Discover Checker" },
  { href: "/tools/chatgpt-citation-checker", label: "ChatGPT Citation Checker" },
  { href: "/tools/perplexity-citation-checker", label: "Perplexity Citation Checker" },
  { href: "/tools/ai-search-score", label: "AI Search Score" },
];

const blogLinks = [
  { href: "/blog/google-news-seo", label: "Google News SEO" },
  { href: "/blog/google-news-requirements", label: "Google News Requirements" },
  { href: "/blog/google-discover-optimization", label: "Google Discover Optimization" },
  { href: "/blog/google-news-schema", label: "Google News Schema" },
  { href: "/blog/chatgpt-seo", label: "ChatGPT SEO" },
  { href: "/blog/perplexity-seo", label: "Perplexity SEO" },
  { href: "/blog/gemini-seo", label: "Gemini SEO" },
  { href: "/blog/ai-search-optimization", label: "AI Search Optimization" },
  { href: "/blog/newsarticle-schema", label: "NewsArticle Schema" },
  { href: "/blog/google-news-ranking-factors", label: "Google News Ranking Factors" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" aria-label="Google News SEO Toolkit - Home" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center" aria-hidden="true">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-sm">Google News SEO Toolkit</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Optimize your articles for Google News, Google Discover, and AI search engines like ChatGPT, Gemini, and Perplexity.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
                aria-label="Follow us on X (formerly Twitter)"
              >
                <span className="sr-only">X (Twitter)</span>
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="/rss.xml"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4 text-white/60" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Free tools">
            <h2 className="text-sm font-semibold text-white mb-4">Free Tools</h2>
            <ul className="space-y-2.5">
              {tools.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Blog and guides">
            <h2 className="text-sm font-semibold text-white mb-4">
              <Link href="/blog" className="hover:text-indigo-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
                Blog &amp; Guides
              </Link>
            </h2>
            <ul className="space-y-2.5">
              {blogLinks.map((b) => (
                <li key={b.href}>
                  <Link
                    href={b.href}
                    className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
                  >
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h2 className="text-sm font-semibold text-white mb-4">Resources</h2>
            <ul className="space-y-2.5">
              {[
                { href: "/#newsletter", label: "Join Early Access" },
                { href: "/sitemap.xml", label: "Sitemap" },
                { href: "/rss.xml", label: "RSS Feed" },
                {
                  href: "https://support.google.com/news/publisher-center/",
                  label: "Google News Publisher Help",
                  external: true,
                },
                {
                  href: "https://developers.google.com/search/docs/appearance/structured-data/article",
                  label: "Google Article Schema Docs",
                  external: true,
                },
              ].map((r) => (
                <li key={r.href}>
                  {r.external ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
                    >
                      {r.label} <span className="sr-only">(opens in new tab)</span>
                    </a>
                  ) : (
                    <Link href={r.href} className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
                      {r.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; {currentYear} Google News SEO Toolkit. Not affiliated with Google LLC.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-white/50 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/50 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
              Terms of Service
            </Link>
            <span className="text-sm text-white/50">
              Free market validation tool. Built for publishers &amp; journalists.
            </span>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Google News SEO Toolkit",
            url: "https://seo-toolkit-platform.vercel.app",
            description:
              "Free Google News SEO analysis toolkit for publishers, journalists, and media companies.",
            sameAs: [],
          }),
        }}
      />
    </footer>
  );
}
