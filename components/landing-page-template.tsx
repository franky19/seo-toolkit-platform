import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface FAQ {
  q: string;
  a: string;
}

interface LandingPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  features: string[];
  sections: { heading: string; content: string }[];
  faqs: FAQ[];
  relatedTools: { href: string; label: string }[];
  schemaType?: string;
}

export default function LandingPageTemplate({
  headline,
  subheadline,
  badge,
  ctaText,
  ctaHref,
  features,
  sections,
  faqs,
  relatedTools,
}: LandingPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
            {badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">{headline}</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">{subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            >
              {ctaText} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
            >
              Join Early Access
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">What We Check</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 p-4 card-surface rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-sm text-white/70">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((s, i) => (
            <article key={i}>
              <h2 className="text-2xl font-bold text-white mb-4">{s.heading}</h2>
              <div
                className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: s.content }}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="card-surface rounded-xl p-5">
                <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40">
                  <span>{faq.q}</span>
                </summary>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center card-surface rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to optimize your articles?</h2>
          <p className="text-white/50 mb-6">Analyze your first article for free. No signup required.</p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            Analyze Free <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-white mb-5">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 card-surface rounded-lg text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
              >
                {t.label} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </div>
  );
}
