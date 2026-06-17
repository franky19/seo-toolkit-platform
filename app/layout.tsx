import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Google News SEO Toolkit - Free SEO Audit & Schema Validator",
  description: "Comprehensive SEO audit tool for Google News optimization, schema validation, sitemap checker, and AI search readiness. Free technical SEO checker for your website.",
  keywords: ["seo checker", "seo audit tool", "seo validator", "technical seo checker", "schema validator", "schema checker", "google news validator", "google news checker", "news sitemap validator", "news sitemap generator", "structured data validator", "json ld validator"],
  authors: [{ name: "Google News SEO Toolkit" }],
  openGraph: {
    title: "Google News SEO Toolkit - Free SEO Audit & Schema Validator",
    description: "Comprehensive SEO audit tool for Google News optimization, schema validation, sitemap checker, and AI search readiness.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google News SEO Toolkit - Free SEO Audit & Schema Validator",
    description: "Comprehensive SEO audit tool for Google News optimization, schema validation, sitemap checker, and AI search readiness.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
