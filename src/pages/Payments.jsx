'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getClinicById, getPlanById } from '@/services/payments';
import { useAuth } from '@/hooks/use-auth';


export function Payments() {
  const { userData } = useAuth();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const response = await getClinicById(userData.clinicId);
      const data = await response.data;
      const idPlan = data.plan;

      const planResponse = await getPlanById(idPlan);
      setPlan(planResponse.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {plan && (
            <Card className="bg-card text-card-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Plan:</span>
                    <span>{plan.name}</span>
                  </div>
                  <div className="text-left">
                    <span className="font-semibold">Characteristics:</span>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
