/** @format */

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const tools = [
  { href: "/tools/google-news-validator", label: "Google News Validator" },
  { href: "/tools/google-news-checker", label: "Google News Checker" },
  { href: "/tools/google-news-score", label: "Google News Score" },
  { href: "/tools/google-discover-checker", label: "Discover Checker" },
  {
    href: "/tools/chatgpt-citation-checker",
    label: "ChatGPT Citation Checker",
  },
  {
    href: "/tools/perplexity-citation-checker",
    label: "Perplexity Citation Checker",
  },
  { href: "/tools/ai-search-score", label: "AI Search Score" },
];

const blogLinks = [
  { href: "/blog/google-news-seo", label: "Google News SEO" },
  { href: "/blog/google-news-requirements", label: "Google News Requirements" },
  {
    href: "/blog/google-discover-optimization",
    label: "Google Discover Optimization",
  },
  { href: "/blog/ai-search-optimization", label: "AI Search Optimization" },
  {
    href: "/blog/google-news-ranking-factors",
    label: "Google News Ranking Factors",
  },
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
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}>
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Google News SEO Toolkit - Home"
          className="flex items-center gap-2 shrink-0">
          <div
            className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
            aria-hidden="true">
            <Image
              src="/images/logo.png"
              alt="ORFIN SEO Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-semibold text-foreground text-sm">
            ORFIN SEO
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1" role="menubar">
          <Link
            href="/pricing"
            role="menuitem"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Pricing
          </Link>
          <Link
            href="/tools/google-news-validator"
            role="menuitem"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Tools
          </Link>
          <Link
            href="/blog"
            role="menuitem"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Blog
          </Link>
          <Link
            href="/why-us"
            role="menuitem"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Why Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/#newsletter"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Early Access
          </Link>
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Login
          </Link>
          <Link
            href="/#analyze"
            className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Analyze Free
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          {mobileOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-background border-b border-border"
          role="menu">
          <div className="px-4 py-4 space-y-1">
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2"
                id="mobile-tools-heading">
                Tools
              </span>
              <ModeToggle />
            </div>
            <ul role="menu" aria-labelledby="mobile-tools-heading">
              {tools.map((t) => (
                <li key={t.href} role="none">
                  <Link
                    href={t.href}
                    role="menuitem"
                    className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-2 mt-2">
              <div
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2"
                id="mobile-blog-heading">
                Blog
              </div>
              <ul role="menu" aria-labelledby="mobile-blog-heading">
                {blogLinks.map((b) => (
                  <li key={b.href} role="none">
                    <Link
                      href={b.href}
                      role="menuitem"
                      className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {b.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-3 mt-2">
              <Link
                href="/login"
                className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Login
              </Link>
              <Link
                href="/#analyze"
                className="block w-full text-center text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mt-2">
                Analyze Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
