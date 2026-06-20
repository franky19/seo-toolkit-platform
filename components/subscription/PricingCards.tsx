'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckoutModal } from './CheckoutModal';

const plans = [
  { name: "Free", price: 0, features: ["Basic SEO tools", "Limited reports"] },
  { name: "Pro", price: 75000, popular: true, features: ["Full SEO audit", "Keyword tools", "AI suggestions"] },
  { name: "Agency", price: 250000, features: ["Unlimited projects", "Team access", "API access"] }
];

export function PricingCards() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-primary shadow-lg' : ''}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                {plan.price === 0 ? 'Gratis' : `Rp ${plan.price.toLocaleString('id-ID')} /bln`}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.price === 0 ? 'Mulai Gratis' : 'Pilih Paket'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedPlan && (
        <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </>
  );
}
