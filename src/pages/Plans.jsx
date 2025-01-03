import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { obtainPlans,registerPayment} from '@/services/payments';

export function Plans() {
  const [plans, setPlans] = useState([]);
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchPlans = async () => {
    try {
      const response = await obtainPlans();
      const data = await response.data;
      setPlans(data); 
      setLoading(false);
    } catch (err) {
      setError(err.message); 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    console.log(`Selected plan: ${planId}`);
  };

  if (loading) {
    return <div className="text-center">Loading plans...</div>;
  }

  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  const handleSubmit = (e) => {
    
    e.preventDefault();
    registerPayment(id, selectedPlan)
      .then(() => {
        console.log('Plan actualizado con éxito');
      })
      .catch((error) => {
        console.error('Error al actualizar el plan:', error);
      });
      
    
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
                variant={selectedPlan === plan._id ? 'secondary' : 'default'}
              >
                {selectedPlan === plan._id ? 'Selected' : 'Choose Plan'}
              </Button>
            </CardFooter>
            
          </Card>
        ))}
      </div>
      <Button type="submit" className="w-full" onClick={handleSubmit} >Next</Button>
    </div>
  );
}