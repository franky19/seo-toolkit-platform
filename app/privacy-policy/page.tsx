import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

const faqs = [
  {
    q: "What data do you collect?",
    a: "We collect account details, contact information, usage data, and diagnostic logs necessary to operate the service.",
  },
  {
    q: "Do you use cookies?",
    a: "Yes. Cookies are used for authentication, preferences, analytics, and service functionality.",
  },
  {
    q: "Do you share my data with third parties?",
    a: "Only with trusted service providers required to operate the platform, such as hosting, analytics, and payment processors.",
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | SEO Toolkit Platform",
  description: "Privacy Policy for SEO Toolkit Platform covering data collection, cookies, analytics, payment processing, user rights, and compliance.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  openGraph: {
    title: "Privacy Policy | SEO Toolkit Platform",
    description: "Learn how SEO Toolkit Platform collects, uses, protects, and processes your data.",
    url: `${siteUrl}/privacy-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | SEO Toolkit Platform",
    description: "Learn how SEO Toolkit Platform collects, uses, protects, and processes your data.",
  },
};

const sections = [
  ["Data We Collect", "We may collect name, email address, billing information, IP address, device details, usage data, and support messages."],
  ["Cookies and Tracking", "We use cookies and similar technologies for authentication, preferences, analytics, and security."],
  ["Analytics", "Analytics help us understand product usage, improve performance, and detect issues."],
  ["How We Use Data", "We use data to provide services, process subscriptions, communicate updates, improve quality, and maintain security."],
  ["Data Retention", "We retain data only as long as needed for service delivery, legal obligations, dispute resolution, and accounting."],
  ["Data Security", "We apply reasonable technical and organizational safeguards to protect your data."],
  ["Third-Party Services", "Trusted providers may process data on our behalf for hosting, analytics, email, and payment processing."],
  ["Payment Processing", "Payment information is processed by secure third-party payment gateways. We do not store full card details on our servers."],
  ["Your Rights", "You may request access, correction, deletion, or restriction of your personal data, subject to legal limits."],
  ["GDPR and Indonesia PDP", "We aim to support GDPR principles and comply with Indonesia's Personal Data Protection law where applicable."],
  ["Contact Information", "For privacy inquiries, contact support@seo-toolkit-platform.com."],
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <nav className="text-sm text-muted-foreground mb-6"><Link href="/" className="hover:text-foreground">Home</Link> / <span aria-current="page">Privacy Policy</span></nav>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground mb-2">Last Updated: June 2026</p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">This Privacy Policy explains how SEO Toolkit Platform collects, uses, stores, and protects information.</p>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-10">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
              {sections.map(([title]) => (
                <li key={title}><a href={`#${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="hover:text-foreground">{title}</a></li>
              ))}
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
            <h2 className="text-2xl font-semibold mb-4">Privacy FAQ</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="rounded-2xl border border-border bg-background p-4">
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
