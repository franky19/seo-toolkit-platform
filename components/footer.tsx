import Link from "next/link";
import { Newspaper, Rss } from "lucide-react";

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
    </footer>
  );
}
