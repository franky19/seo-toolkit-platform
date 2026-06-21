/** @format */

import PricingCards from "@/components/subscription/PricingCards";
import LegalSection from "@/components/subscription/LegalSection";
import ContactSection from "@/components/subscription/ContactSection";
import { Accordion } from "@/components/ui/accordion";
const faqData = [
  {
    question: "How to subscribe?",
    answer:
      "Choose your preferred plan, complete the payment process, and your subscription will be activated automatically.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription anytime from your account settings.",
  },
  {
    question: "Is there a refund?",
    answer:
      "Refunds are subject to our refund policy. Please review our Terms & Refund Policy for details.",
  },
  {
    question: "Is the payment secure?",
    answer:
      "Yes, all payments are processed through secure and encrypted payment gateways.",
  },
  {
    question: "Are there team plans available?",
    answer:
      "Yes, we offer team and enterprise plans for organizations that require multiple users.",
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 py-24">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6 text-foreground">
          Boost Your SEO Workflow with Powerful AI-Powered Tools
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Keyword research, content optimization, SERP analysis, metadata
          generation, and more in one platform.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <span className="bg-gray-800 text-white px-4 py-2 rounded-full">
            Monthly billing
          </span>
          <span className="bg-gray-800 text-white px-4 py-2 rounded-full">
            Trusted by 5,000+ marketers
          </span>
        </div>
      </div>

      <PricingCards />

      {/* Comparison Table */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Feature Comparison
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-4">Feature</th>
              <th className="p-4">Free</th>
              <th className="p-4">Pro</th>
              <th className="p-4">Agency</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Keyword Research",
              "SEO Audit",
              "Meta Generator",
              "SERP Preview",
              "Export Data",
              "Team Access",
              "Priority Support",
              "White Label Reports",
            ].map((feat) => (
              <tr key={feat} className="border-b">
                <td className="p-4">{feat}</td>
                <td className="p-4">✓</td>
                <td className="p-4">✓</td>
                <td className="p-4">✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trust & FAQ */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          items={faqData.map((item, i) => ({
            value: `item-${i}`,
            title: item.question,
            children: item.answer,
          }))}
        />
      </div>

      <LegalSection />
      <ContactSection />
    </div>
  );
}
