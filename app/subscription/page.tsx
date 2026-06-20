import PricingCards from "@/components/subscription/PricingCards";
import LegalSection from "@/components/subscription/LegalSection";
import ContactSection from "@/components/subscription/ContactSection";

export default function SubscriptionPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      <PricingCards />
      <LegalSection />
      <ContactSection />
    </main>
  );
}
