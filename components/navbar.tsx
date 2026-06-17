"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Menu, X, ChevronDown } from "lucide-react";

const tools = [
  { href: "/google-news-validator", label: "Google News Validator" },
  { href: "/news-schema-generator", label: "Schema Generator" },
  { href: "/news-sitemap-validator", label: "Sitemap Validator" },
  { href: "/google-discover-checker", label: "Discover Checker" },
  { href: "/ai-citation-checker", label: "AI Citation Checker" },
  { href: "/chatgpt-citation-checker", label: "ChatGPT Citation Checker" },
  { href: "/news-seo-checker", label: "News SEO Checker" },
  { href: "/google-news-score", label: "Google News Score" },
];

const blog = [
  { href: "/blog/google-news-requirements", label: "Google News Requirements" },
  { href: "/blog/how-to-get-indexed-in-google-news", label: "Get Indexed in Google News" },
  { href: "/blog/news-schema-guide", label: "NewsArticle Schema Guide" },
  { href: "/blog/google-discover-guide", label: "Google Discover Guide" },
  { href: "/blog/ai-search-optimization-guide", label: "AI Search Optimization" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
    setBlogOpen(false);
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
          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">
              Tools
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#111111] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50">
                {tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Blog Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setBlogOpen(true)}
            onMouseLeave={() => setBlogOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">
              Blog
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${blogOpen ? "rotate-180" : ""}`} />
            </button>
            {blogOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-[#111111] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50">
                {blog.map((b) => (
                  <Link
                    key={b.href}
                    href={b.href}
                    className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {b.label}
                  </Link>
                ))}
                <div className="border-t border-white/5 mt-1 pt-1">
                  <Link
                    href="/blog"
                    className="block px-4 py-2.5 text-sm text-indigo-400 hover:text-indigo-300 hover:bg-white/5 transition-colors font-medium"
                  >
                    View all posts →
                  </Link>
                </div>
              </div>
            )}
          </div>
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
