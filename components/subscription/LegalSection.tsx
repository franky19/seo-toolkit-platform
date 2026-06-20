import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";

export default function LegalSection() {
  const terms = [
    { title: "1. Overview", content: "SEO Toolkit Platform provides web-based SEO analysis, monitoring, and optimization tools." },
    { title: "4. User Accounts", content: "Users must provide accurate information and are responsible for account security." },
    { title: "5. Subscription Services", content: "Paid subscriptions are billed monthly; features depend on the active plan." },
    { title: "9. Refund Policy", content: "Subscriptions are non-refundable, except for billing errors or technical failure." },
    { title: "10. Limitation of Liability", content: "We do not guarantee specific SEO rankings; users are responsible for business decisions." },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Terms & Policies</h2>
      <div className="w-full mx-auto px-4">
        <Accordion type="single" collapsible items={terms.map((item, i) => ({ value: `item-${i}`, title: item.title, children: item.content }))} />
        <div className="text-center pt-8">
          <Link href="/terms" className="text-primary hover:underline font-semibold flex items-center justify-center gap-2">
            Lihat Selengkapnya <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
