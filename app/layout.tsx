import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const siteUrl = "https://seo-toolkit-platform.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Google News SEO Toolkit – Free Google News Validator & Publisher SEO Audit",
    template: "%s | Google News SEO Toolkit",
  },
  description:
    "Validate your articles for Google News, Discover, Search, and AI Search Engines. Free Google News validator, NewsArticle schema checker, and publisher SEO audit tool.",
  keywords: [
    "google news seo",
    "google news validator",
    "news article schema",
    "newsarticle schema generator",
    "google news checker",
    "google discover optimization",
    "ai citation checker",
    "chatgpt seo",
    "news seo checker",
    "news sitemap validator",
    "publisher seo",
    "google news requirements",
    "ai search optimization",
    "generative engine optimization",
    "geo optimization",
    "technical seo for news",
    "news article optimization",
  ],
  authors: [{ name: "Google News SEO Toolkit", url: siteUrl }],
  creator: "Google News SEO Toolkit",
  publisher: "Google News SEO Toolkit",
  openGraph: {
    title: "Google News SEO Toolkit – Free Google News Validator & Publisher SEO Audit",
    description:
      "Validate your articles for Google News, Discover, Search, and AI Search Engines. Free analysis tool for publishers.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Google News SEO Toolkit",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Google News SEO Toolkit – Free Article Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google News SEO Toolkit – Free Google News Validator & Publisher SEO Audit",
    description:
      "Validate your articles for Google News, Discover, Search, and AI Search Engines. Free analysis tool.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Google News SEO Toolkit",
              url: siteUrl,
              description:
                "Free tool to validate articles for Google News eligibility, NewsArticle schema, Discover readiness, and AI citation potential.",
              applicationCategory: "WebApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              publisher: {
                "@type": "Organization",
                name: "Google News SEO Toolkit",
                url: siteUrl,
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0a0a0a] text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
