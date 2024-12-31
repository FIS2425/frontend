import { conditionSchema } from '@/forms/history/schemas';
import { ConditionForm } from '@/forms/history/forms';
import { addCondition } from '@/services/history';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export function AddCondition() {
  return (
    <div className="w-full flex items-center justify-center p-8">
      <AddConditionCard />
    </div>
  );
}

function AddConditionCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(conditionSchema),
    defaultValues: {
      name: '',
      details: '',
      since: 'dd/mm/aaaa',
      until: 'dd/mm/aaaa',
    },
  });

  function onSubmit(values) {
    setIsLoading(true);
    addCondition(values)
      .then((response) => {
        if (response.status === 201) navigate('/app');
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setError('An error occurred. Please try again later.');
        } else {
          setError('An error occurred. Please try again later.');
          console.error(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Add Condition</CardTitle>
        <CardDescription>Fill in the details of the condition</CardDescription>
      </CardHeader>
      <CardContent>
        <ConditionForm form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
      </CardContent>
    </Card>
  );
}
