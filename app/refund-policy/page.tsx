import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

export const metadata: Metadata = {
  title: "Refund Policy | SEO Toolkit Platform",
  description: "Refund Policy for SEO Toolkit Platform covering eligible refunds, refund process, and payment reversal timelines.",
  alternates: { canonical: `${siteUrl}/refund-policy` },
  openGraph: { title: "Refund Policy | SEO Toolkit Platform", description: "Read the Refund Policy for SEO Toolkit Platform.", url: `${siteUrl}/refund-policy`, type: "website" },
  twitter: { card: "summary_large_image", title: "Refund Policy | SEO Toolkit Platform", description: "Read the Refund Policy for SEO Toolkit Platform." },
};

const faqs = [
  { q: "How long does a refund take?", a: "Approved refunds are typically processed within 7–14 business days." },
  { q: "Can I get a refund for change of mind?", a: "No. Refunds are not granted for change of mind or user error." },
  { q: "What if I was double charged?", a: "Duplicate payments are eligible for review and reversal." },
];

const refundSteps = [
  "Submit a refund request via official support channels.",
  "Our team verifies eligibility and payment records.",
  "If approved, we process the reversal using the original payment method when possible.",
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <nav className="text-sm text-muted-foreground mb-6"><Link href="/" className="hover:text-foreground">Home</Link> / <span aria-current="page">Refund Policy</span></nav>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Refund Policy</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">This policy explains when refunds may be granted for subscription purchases on SEO Toolkit Platform.</p>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-10">
            <h2 className="text-2xl font-semibold mb-4">Refund Flow</h2>
            <ol className="grid gap-3 sm:grid-cols-3">
              {refundSteps.map((step, idx) => (
                <li key={step} className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">Step {idx + 1}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Eligible Refund Conditions</h2>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2 leading-relaxed">
                <li>Duplicate payment</li>
                <li>System failure</li>
                <li>Failed activation</li>
                <li>Technical issues that prevent service delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Non-refundable Conditions</h2>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2 leading-relaxed">
                <li>Change of mind</li>
                <li>User error</li>
                <li>Service already consumed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Refund Process</h2>
              <p className="text-muted-foreground leading-relaxed">Contact support with your payment reference. We may request verification before approving any refund. Approved refunds are processed within 7–14 business days and returned through the original payment method or payment reversal method supported by the gateway.</p>
            </section>
          </div>

          <section className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((item) => (
                <details key={item.q} className="rounded-2xl border border-border bg-background p-4">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/10 p-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Need help with a refund?</h2>
            <p className="text-muted-foreground mb-4">Reach our support team for review and assistance.</p>
            <Link href="/contact" className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Contact Support</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
