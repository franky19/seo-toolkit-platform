import Link from "next/link";
import { Newspaper, Twitter, Github, Rss } from "lucide-react";

const tools = [
  { href: "/google-news-validator", label: "Google News Validator" },
  { href: "/news-schema-generator", label: "Schema Generator" },
  { href: "/news-sitemap-validator", label: "Sitemap Validator" },
  { href: "/google-discover-checker", label: "Discover Checker" },
  { href: "/ai-citation-checker", label: "AI Citation Checker" },
  { href: "/chatgpt-citation-checker", label: "ChatGPT Citation" },
  { href: "/news-seo-checker", label: "News SEO Checker" },
  { href: "/google-news-score", label: "Google News Score" },
];

const blogLinks = [
  { href: "/blog/google-news-requirements", label: "Google News Requirements" },
  { href: "/blog/how-to-get-indexed-in-google-news", label: "Get Indexed in Google News" },
  { href: "/blog/news-schema-guide", label: "NewsArticle Schema Guide" },
  { href: "/blog/google-discover-guide", label: "Google Discover Guide" },
  { href: "/blog/chatgpt-seo-guide", label: "ChatGPT SEO Guide" },
  { href: "/blog/ai-search-optimization-guide", label: "AI Search Optimization" },
  { href: "/blog/google-news-sitemap-guide", label: "News Sitemap Guide" },
  { href: "/blog/news-publisher-seo-guide", label: "Publisher SEO Guide" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-sm">Google News SEO Toolkit</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Optimize your articles for Google News, Google Discover, and AI search engines like ChatGPT, Gemini, and Perplexity.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-white/60" />
              </a>
              <a
                href="/rss.xml"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Free Tools</h3>
            <ul className="space-y-2.5">
              {tools.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              <Link href="/blog" className="hover:text-indigo-400 transition-colors">
                Blog & Guides
              </Link>
            </h3>
            <ul className="space-y-2.5">
              {blogLinks.map((b) => (
                <li key={b.href}>
                  <Link
                    href={b.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/#waitlist", label: "Join Early Access" },
                { href: "/#roadmap", label: "Product Roadmap" },
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
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {r.label}
                    </a>
                  ) : (
                    <Link href={r.href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {r.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {currentYear} Google News SEO Toolkit. Not affiliated with Google LLC.
          </p>
          <p className="text-sm text-white/30">
            Free market validation tool. Built for publishers & journalists.
          </p>
        </div>
      </div>

      {/* Structured data */}
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
