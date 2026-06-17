"use client";

import { useState, useEffect } from "react";
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

const blog = [
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Newspaper className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm hidden sm:block">
            Google News SEO Toolkit
          </span>
          <span className="font-semibold text-white text-sm sm:hidden">GN Toolkit</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/tools/google-news-validator" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">
            Tools
          </Link>
          <Link href="/blog" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">
            Blog
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#waitlist"
            className="text-sm text-white/70 hover:text-white transition-colors px-3 py-2"
          >
            Early Access
          </Link>
          <Link
            href="/#analyze"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Analyze Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f0f0f] border-b border-white/5">
          <div className="px-4 py-4 space-y-1">
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 py-2">
              Tools
            </div>
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block px-3 py-2.5 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5"
              >
                {t.label}
              </Link>
            ))}
            <div className="border-t border-white/5 pt-2 mt-2">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 py-2">
                Blog
              </div>
              {blog.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="block px-3 py-2.5 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5"
                >
                  {b.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/5 pt-3 mt-2">
              <Link
                href="/#analyze"
                className="block w-full text-center text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium"
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
