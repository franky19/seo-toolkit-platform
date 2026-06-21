import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

const faqItems = [
  { q: "When can I cancel?", a: "You may cancel at any time according to your subscription terms." },
  { q: "Do you provide refunds?", a: "Refunds are limited and subject to the refund policy." },
  { q: "What law applies?", a: "These terms are governed by applicable laws in Indonesia, unless otherwise required." },
];

export const metadata: Metadata = {
  title: "Terms & Conditions | SEO Toolkit Platform",
  description: "Terms and Conditions for SEO Toolkit Platform, including subscriptions, billing, IP, liability, cancellation, and service availability.",
  alternates: { canonical: `${siteUrl}/terms-and-conditions` },
  openGraph: { title: "Terms & Conditions | SEO Toolkit Platform", description: "Read the Terms and Conditions for SEO Toolkit Platform.", url: `${siteUrl}/terms-and-conditions`, type: "website" },
  twitter: { card: "summary_large_image", title: "Terms & Conditions | SEO Toolkit Platform", description: "Read the Terms and Conditions for SEO Toolkit Platform." },
};

const sections = [
  ["Acceptance of Terms", "By accessing or using SEO Toolkit Platform, you agree to be bound by these terms."],
  ["Description of Services", "We provide SEO analysis, reporting, optimization, and subscription-based software tools."],
  ["User Responsibilities", "Users must provide accurate information and use the platform lawfully."],
  ["Account Registration", "Accounts must be created with truthful information and kept secure."],
  ["Subscription Terms", "Plans may be free or paid and may include monthly billing and renewal."],
  ["Billing and Payments", "Payments are processed in IDR through secure third-party gateways."],
  ["Cancellation Policy", "Users may cancel according to the plan terms; access continues until the billing cycle ends."],
  ["Intellectual Property", "All software, branding, content, and design elements belong to SEO Toolkit Platform."],
  ["Limitation of Liability", "We do not guarantee rankings, traffic, leads, conversions, or revenue."],
  ["Prohibited Activities", "Illegal use, scraping, abuse, unauthorized access, and resale without permission are prohibited."],
  ["Service Availability", "The service is provided as available, and temporary downtime may occur."],
  ["Termination", "Accounts may be suspended or terminated for violations."],
  ["Governing Law", "These terms are governed by applicable laws in Indonesia unless otherwise required."],
  ["Contact Information", "For legal questions contact support@seo-toolkit-platform.com."],
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <nav className="text-sm text-muted-foreground mb-6"><Link href="/" className="hover:text-foreground">Home</Link> / <span aria-current="page">Terms & Conditions</span></nav>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-2">Last Updated: June 2026</p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">These Terms & Conditions govern your use of SEO Toolkit Platform and the subscription services we provide.</p>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-10">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
              {sections.map(([title]) => <li key={title}><a href={`#${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="hover:text-foreground">{title}</a></li>)}
            </ul>
          </div>

          <div className="space-y-8">
            {sections.map(([title, body]) => (
              <section id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={title} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3">{title}</h2>
                <p className="text-muted-foreground leading-relaxed">{body}</p>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-2xl border border-border bg-background p-4">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
