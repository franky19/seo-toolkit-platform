import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

const faqItems = [
  { q: "When can I cancel?", a: "You may cancel at any time before the next renewal date. Access continues until the current billing cycle ends." },
  { q: "Do you provide refunds?", a: "Refunds are limited to eligible cases described in our Refund Policy." },
  { q: "What law applies?", a: "These terms are governed by the laws of Indonesia." },
];

export const metadata: Metadata = {
  title: "Terms & Conditions | SEO Toolkit Platform",
  description: "Terms and Conditions for SEO Toolkit Platform covering subscriptions, billing, auto-renewal, payments, refunds, liability, and Indonesian law.",
  alternates: { canonical: `${siteUrl}/terms-and-conditions` },
  openGraph: { title: "Terms & Conditions | SEO Toolkit Platform", description: "Read the Terms and Conditions for SEO Toolkit Platform.", url: `${siteUrl}/terms-and-conditions`, type: "website" },
  twitter: { card: "summary_large_image", title: "Terms & Conditions | SEO Toolkit Platform", description: "Read the Terms and Conditions for SEO Toolkit Platform." },
};

const sections = [
  ["Acceptance of Terms", "By accessing or using SEO Toolkit Platform, you agree to be bound by these Terms & Conditions and all related policies. SEO Toolkit Platform is operated as an individual venture by [Your Full Name]."],
  ["Description of Services", "SEO Toolkit Platform is a subscription-based SaaS that provides SEO audits, keyword analysis, meta generation, schema tools, and related optimization features, operated by [Your Full Name] as an individual venture."],
  ["User Eligibility", "You must be able to enter into a legally binding agreement under applicable law to use paid subscription services."],
  ["Account Registration Requirements", "You must provide accurate, complete, and current information and keep your login credentials secure."],
  ["User Responsibilities", "You are responsible for all activity conducted through your account and for ensuring your use complies with these Terms."],
  ["Acceptable Use Policy", "You must not engage in illegal activities, account sharing, credential abuse, reverse engineering, unauthorized access, data scraping, subscription resale, service abuse, automated attacks, or circumvention of usage limits."],
  ["Prohibited Activities", "Any activity that harms the platform, its users, security, availability, or integrity is prohibited."],
  ["Subscription Plans", "We offer free and paid subscription plans with features and usage limits disclosed on the Pricing Page."],
  ["Auto-Renewal Disclosure", "Subscriptions automatically renew at the end of each billing cycle unless cancelled before the renewal date. By subscribing, customers authorize recurring charges according to their selected subscription plan."],
  ["Billing Terms", "All prices are displayed in Indonesian Rupiah (IDR). Billing is processed securely through Midtrans and other authorized providers. We do not store full card data on our servers. Invoices may be generated electronically after successful payment."],
  ["Cancellation Rules", "You may cancel before the renewal date to avoid the next charge. Cancellation stops future billing but does not refund prior charges unless required by our Refund Policy."],
  ["Refund Rules", "Payments are generally non-refundable except for eligible cases such as duplicate payment, billing error, or unauthorized transaction, as described in the Refund Policy."],
  ["Intellectual Property Rights", "All software, branding, content, reports, and design elements remain the property of SEO Toolkit Platform or its licensors."],
  ["Service Availability Disclaimer", "The service is provided as available and may be affected by scheduled maintenance, emergency maintenance, third-party interruptions, force majeure, updates, or modifications."],
  ["SEO Performance Disclaimer", "We do not guarantee rankings, traffic increases, conversions, or revenue. Search engine algorithms may change at any time, and results depend on factors outside our control."],
  ["Limitation of Liability", "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, or consequential damages arising from use of the service."],
  ["Fraud Prevention and Chargeback Handling", "We may review suspicious transactions, request verification, suspend access during review, and contest abusive chargebacks where appropriate."],
  ["Suspension and Termination Rights", "We may suspend or terminate accounts for violations, non-payment, fraud, or abuse, with or without prior notice when required for security or legal compliance."],
  ["Governing Law", "These Terms are governed by the laws of Indonesia, and disputes will be handled in accordance with applicable Indonesian jurisdiction requirements."],
  ["Contact Information", "For legal, billing, or support questions, contact support@seo-toolkit-platform.com."],
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

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-10 top-4">
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
