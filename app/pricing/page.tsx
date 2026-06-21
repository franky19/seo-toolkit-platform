import PricingCards from "@/components/subscription/PricingCards";
import LegalSection from "@/components/subscription/LegalSection";
import ContactSection from "@/components/subscription/ContactSection";
import { Accordion } from "@/components/ui/accordion";

const faqData = [
  { question: "How to subscribe?", answer: "Choose a plan, complete payment in IDR, and your subscription is activated automatically." },
  { question: "Can I cancel?", answer: "Yes, you can cancel anytime from your account settings." },
  { question: "Is there a refund?", answer: "Refunds follow our refund policy and are limited to eligible cases." },
  { question: "Is payment secure?", answer: "Yes, payments are processed through secure and encrypted gateways." },
  { question: "Are there team plans?", answer: "Yes, team and agency plans are available for organizations." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-foreground">Boost Your SEO Workflow with Powerful AI-Powered Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Keyword research, content optimization, SERP analysis, metadata generation, and more in one platform.</p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">Monthly billing</span>
            <span className="bg-accent text-foreground px-4 py-2 rounded-full border border-border">Trusted by 5,000+ marketers</span>
          </div>
        </div>

        <PricingCards />

        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-10">Feature Comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-muted text-muted-foreground">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Free</th>
                  <th className="p-4">Pro</th>
                  <th className="p-4">Agency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Keyword Research", "✓", "✓", "✓"],
                  ["SEO Audit", "✓", "✓", "✓"],
                  ["Meta Generator", "✓", "✓", "✓"],
                  ["SERP Preview", "✓", "✓", "✓"],
                  ["Export Data", "✓", "✓", "✓"],
                  ["Team Access", "—", "✓", "✓"],
                  ["Priority Support", "—", "✓", "✓"],
                  ["White Label Reports", "—", "—", "✓"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border text-foreground">
                    <td className="p-4">{row[0]}</td>
                    <td className="p-4">{row[1]}</td>
                    <td className="p-4">{row[2]}</td>
                    <td className="p-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible items={faqData.map((item, i) => ({ value: `item-${i}`, title: item.question, children: item.answer }))} />
        </div>

        <LegalSection />
        <ContactSection />
      </div>
    </div>
  );
}
