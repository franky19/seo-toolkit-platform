import { PricingCards } from '@/components/subscription/PricingCards';
import { LegalSection } from '@/components/subscription/LegalSection';
import { ContactSection } from '@/components/subscription/ContactSection';

export const metadata = {
  title: 'Pilih Paket Langganan SEO Toolkit',
  description: 'Mulai tingkatkan SEO website Anda dengan paket langganan yang fleksibel dan terjangkau di SEO Toolkit Platform.',
};

export default function SubscriptionPage() {
  return (
    <main className="container mx-auto py-12 px-4 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Pilih Paket Langganan</h1>
        <p className="text-muted-foreground text-lg">Pilih rencana yang paling sesuai untuk kebutuhan optimasi SEO Anda.</p>
      </section>

      <PricingCards />
      
      <div className="grid md:grid-cols-2 gap-8">
        <LegalSection />
        <ContactSection />
      </div>
    </main>
  );
}
