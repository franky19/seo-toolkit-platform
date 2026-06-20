"use client";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const plans = [
  { 
    name: "Free", 
    price: 0, 
    features: ["Limited SEO tools access", "Basic keyword suggestions", "Limited daily usage", "Community support"],
    cta: "Start Now"
  },
  { 
    name: "Pro", 
    price: 79000, 
    popular: true, 
    features: ["Unlimited keyword research", "Meta title/description generator", "SERP preview", "AI content helper", "Priority support", "Export results"],
    cta: "Subscribe to Pro"
  },
  { 
    name: "Agency", 
    price: 299000, 
    features: ["Everything in Pro", "Multi-project management", "Team collaboration", "Advanced SEO analytics", "White-label reports", "Premium support"],
    cta: "Start Agency"
  }
];

export default function PricingCards() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {plans.map((plan) => (
        <div key={plan.name} className={`p-8 border rounded-2xl flex flex-col bg-card text-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${plan.popular ? 'border-primary ring-1 ring-primary/30' : 'border-border'}`}>
          {plan.popular && <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Most Populer</span>}
          <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
          <div className="text-4xl font-bold my-6">Rp {plan.price.toLocaleString('id-ID')} <span className="text-sm text-muted-foreground font-normal">/ bulan</span></div>
          <ul className="text-muted-foreground mb-8 flex-grow space-y-3">
            {plan.features.map(f => <li key={f}>✓ {f}</li>)}
          </ul>
          <button 
            onClick={() => setSelectedPlan(plan)}
            className={`px-6 py-3 rounded-lg font-semibold w-full transition-all ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            {plan.cta}
          </button>
        </div>
      ))}
      {selectedPlan && (
        <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
