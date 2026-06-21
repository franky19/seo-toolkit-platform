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

const productLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/tools/google-news-validator", label: "Features" },
  { href: "/contact", label: "Contact Support" },
  { href: "/refund-policy", label: "FAQ" },
];

const companyLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" aria-label="SEO Toolkit Platform - Home" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center" aria-hidden="true">
                <Newspaper className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground text-sm">SEO Toolkit Platform</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Optimize your articles for Google News, Google Discover, and AI search engines like ChatGPT, Gemini, and Perplexity.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Follow us on X (formerly Twitter)">
                <span className="sr-only">X (Twitter)</span>
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="/rss.xml" className="w-8 h-8 rounded-lg bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="RSS Feed">
                <Rss className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-foreground mb-4">Company</h2>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product">
            <h2 className="text-sm font-semibold text-foreground mb-4">Product</h2>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h2 className="text-sm font-semibold text-foreground mb-4">Support</h2>
            <ul className="space-y-2.5">
              {[
                { href: "/contact", label: "Contact Support" },
                { href: "/contact", label: "FAQ" },
                { href: "/sitemap.xml", label: "Sitemap" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} SEO Toolkit Platform. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Refund Policy</Link>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "SEO Toolkit Platform", url: "https://seo-toolkit-platform.vercel.app", description: "SEO Toolkit Platform helps businesses and marketers improve visibility with modern SEO tools.", }) }} />
    </footer>
  );
}
