import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

const faqs = [
  {
    q: "What data do you collect?",
    a: "We collect account details, contact information, usage data, IP address, device details, and support messages necessary to operate and improve the service.",
  },
  {
    q: "How is my data used?",
    a: "Data is used for service provision, subscription management, communication, analytics, security, and product improvement.",
  },
  {
    q: "Do you use cookies?",
    a: "Yes. Cookies are essential for authentication, user preferences, site analytics, and ensuring service functionality.",
  },
  {
    q: "How is my data secured?",
    a: "We implement reasonable technical and organizational measures to protect your data against unauthorized access and breaches.",
  },
  {
    q: "Do you share data with third parties?",
    a: "Data is shared only with trusted providers essential for service operations like hosting, analytics, email, and payment processing, under strict confidentiality agreements.",
  },
  {
    q: "What are my user rights?",
    a: "You can request access, correction, deletion, or restriction of your personal data, subject to legal requirements and our data retention policies.",
  },
  {
    q: "How do you comply with Indonesian privacy law?",
    a: "We strive to comply with Indonesia's Law on Personal Data Protection (PDP Law) and relevant regulations.",
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | SEO Toolkit Platform",
  description: "SEO Toolkit Platform's Privacy Policy detailing data collection, usage, cookies, security, third-party services, user rights, and Indonesian data protection compliance.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  openGraph: {
    title: "Privacy Policy | SEO Toolkit Platform",
    description: "Understand how SEO Toolkit Platform collects, uses, protects, and processes your personal data.",
    url: `${siteUrl}/privacy-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | SEO Toolkit Platform",
    description: "Understand how SEO Toolkit Platform collects, uses, protects, and processes your personal data.",
  },
};

const sections = [
  ["Data We Collect", "We may collect direct information like your name, email address, billing details, IP address, device information, usage data, and any content you provide in support communications."],
  ["Cookies and Tracking Technologies", "We use cookies, web beacons, and similar technologies to manage sessions, store preferences, conduct analytics, enhance security, and enable service functionality."],
  ["Analytics", "We utilize analytics tools to understand user behavior, measure performance, troubleshoot issues, and improve our product."],
  ["How We Use Your Data", "Your data is essential for providing services, processing subscriptions, managing accounts, communicating important updates, enhancing user experience, and ensuring platform security."],
  ["Data Retention and Storage", "We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements."],
  ["Data Security Measures", "We implement robust technical and organizational security measures designed to protect your personal data against unauthorized access, alteration, disclosure, or destruction."],
  ["Third-Party Services", "We may share your data with trusted third-party providers who assist us in operating our website, conducting business, or servicing you, but those parties agree to keep this information confidential."],
  ["Payment Processing", "All payment information is handled by secure, compliant third-party payment processors. We do not store your full credit card details on our servers, ensuring higher security."],
  ["User Data Rights", "Subject to applicable laws, you have the right to access, correct, delete, or restrict the processing of your personal data. You can also object to certain uses of your data."],
  ["GDPR and Indonesia PDP Law Compliance", "We are committed to adhering to global privacy standards, including GDPR principles and Indonesia's Law on Personal Data Protection (UU PDP) where applicable."],
  ["Contact Information for Privacy Inquiries", "For any questions or concerns regarding this Privacy Policy or your data, please contact us at support@seo-toolkit-platform.com."],
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">˜
          <nav className="text-sm text-muted-foreground mb-6"><Link href="/" className="hover:text-foreground">Home</Link> / <span aria-current="page">Privacy Policy</span></nav>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground mb-2">Last Updated: June 2026</p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">This Privacy Policy explains how SEO Toolkit Platform collects, uses, stores, protects, and processes your information.</p>
˜
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-10 top-4">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
              {sections.map(([title]) => (
                <li key={title}>
                  <Link href={`#${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="hover:text-foreground transition-colors">
                    {title}
                  </Link>
                </li>
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
