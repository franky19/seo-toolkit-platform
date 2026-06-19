"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Menu, X } from "lucide-react";

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
  { href: "/blog/ai-search-optimization", label: "AI Search Optimization" },
  { href: "/blog/google-news-ranking-factors", label: "Google News Ranking Factors" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Google News SEO Toolkit - Home" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center" aria-hidden="true">
            <Newspaper className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm hidden sm:block">
            Google News SEO Toolkit
          </span>
          <span className="font-semibold text-white text-sm sm:hidden">GN Toolkit</span>
        </Link>

        <div className="hidden md:flex items-center gap-1" role="menubar">
          <Link href="/tools/google-news-validator" role="menuitem" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
            Tools
          </Link>
          <Link href="/blog" role="menuitem" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
            Blog
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#newsletter"
            className="text-sm text-white/70 hover:text-white transition-colors px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
          >
            Early Access
          </Link>
          <Link
            href="/#analyze"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            Analyze Free
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#0f0f0f] border-b border-white/5" role="menu">
          <div className="px-4 py-4 space-y-1">
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 py-2" id="mobile-tools-heading">
              Tools
            </div>
            <ul role="menu" aria-labelledby="mobile-tools-heading">
              {tools.map((t) => (
                <li key={t.href} role="none">
                  <Link
                    href={t.href}
                    role="menuitem"
                    className="block px-3 py-2.5 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/5 pt-2 mt-2">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 py-2" id="mobile-blog-heading">
                Blog
              </div>
              <ul role="menu" aria-labelledby="mobile-blog-heading">
                {blogLinks.map((b) => (
                  <li key={b.href} role="none">
                    <Link
                      href={b.href}
                      role="menuitem"
                      className="block px-3 py-2.5 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
                    >
                      {b.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/5 pt-3 mt-2">
              <Link
                href="/#analyze"
                className="block w-full text-center text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                Analyze Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
