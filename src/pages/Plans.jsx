'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

// Mock data to simulate fetching plans from an API
const plans = [
  {
    _id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Basic',
    price: 9.99,
    features: ['Up to 5 patients', 'Basic appointment scheduling', 'Electronic health records'],
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Professional',
    price: 29.99,
    features: ['Up to 50 patients', 'Advanced appointment scheduling', 'Electronic health records', 'Billing management', 'Prescription management'],
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Enterprise',
    price: 99.99,
    features: ['Unlimited patients', 'Advanced appointment scheduling', 'Electronic health records', 'Billing management', 'Prescription management', 'Analytics and reporting', 'Multi-clinic support'],
  },
];

export function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    // Here you would typically initiate the subscription process
    console.log(`Selected plan: ${planId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Select the plan that best fits your clinic&apos;s needs
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan._id} className={`flex flex-col ${selectedPlan === plan._id ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>${plan.price.toFixed(2)} / month</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleSelectPlan(plan._id)}
                variant={selectedPlan === plan._id ? ' secondary' : 'default'}
              >
                {selectedPlan === plan._id ? 'Selected' : 'Choose Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

