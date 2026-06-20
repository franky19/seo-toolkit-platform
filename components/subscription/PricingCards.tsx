"use client";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const plans = [
  { name: "Free", price: 0 },
  { name: "Pro", price: 75000, popular: true },
  { name: "Agency", price: 250000 }
];

export default function PricingCards() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.name} className={`p-6 border rounded-lg ${plan.popular ? 'border-blue-500' : ''}`}>
          <h2 className="text-xl font-semibold">{plan.name}</h2>
          <p className="text-2xl font-bold my-4">Rp {plan.price.toLocaleString()}</p>
          <button 
            onClick={() => setSelectedPlan(plan)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Select
          </button>
        </div>
      ))}
      {selectedPlan && (
        <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
