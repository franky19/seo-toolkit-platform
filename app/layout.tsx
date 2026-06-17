import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Google News SEO Toolkit – Optimize Articles for Google News & AI Search",
    template: "%s | Google News SEO Toolkit",
  },
  description:
    "Instantly analyze any article for Google News eligibility, NewsArticle schema, Discover readiness, and AI citation potential (ChatGPT, Gemini, Perplexity). Free, no signup.",
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
  ],
  authors: [{ name: "Google News SEO Toolkit", url: siteUrl }],
  creator: "Google News SEO Toolkit",
  publisher: "Google News SEO Toolkit",
  openGraph: {
    title: "Google News SEO Toolkit – Optimize Articles for Google News & AI Search",
    description:
      "Instantly analyze any article for Google News eligibility, NewsArticle schema, Discover readiness, and AI citation potential. Free analysis tool.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Google News SEO Toolkit",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Google News SEO Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google News SEO Toolkit – Optimize Articles for Google News & AI Search",
    description:
      "Instantly analyze any article for Google News eligibility, NewsArticle schema, Discover readiness, and AI citation potential.",
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
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Google News SEO Toolkit",
              url: siteUrl,
              description:
                "Free tool to analyze articles for Google News eligibility, schema validation, Discover readiness, and AI citation potential.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
