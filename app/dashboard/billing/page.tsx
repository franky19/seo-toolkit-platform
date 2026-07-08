/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, CreditCard, History } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$10/month",
    features: ["5 Projects", "1,000 Keywords/month", "Basic Support"],
  },
  {
    name: "Pro",
    price: "$29/month",
    features: [
      "25 Projects",
      "5,000 Keywords/month",
      "Priority Support",
      "Advanced Analytics",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited Projects",
      "Unlimited Keywords",
      "Dedicated Account Manager",
      "Premium Support",
    ],
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Plans</h1>
        <p className="text-muted-foreground">
          Manage your subscription and view your billing history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your current subscription details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:justify-between lg:space-y-0">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold">Pro Plan</h2>
              <p className="text-muted-foreground">$29/month</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Update Payment Method
              </Button>
              <Button variant="outline" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                View Billing History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Plan</CardTitle>
          <CardDescription>
            Select the plan that best fits your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className="relative flex flex-col justify-between p-6">
                <div>
                  <CardTitle className="mb-2 text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="mb-4 text-lg text-primary">
                    {plan.price}
                  </CardDescription>
                  <ul className="space-y-2 text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <CardContent className="p-0 mt-6">
                  <Button className="w-full">
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
