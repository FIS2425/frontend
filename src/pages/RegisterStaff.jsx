import { RegisterStaffForm } from '@/forms/staff/forms';
import { registerStaffSchema } from '@/forms/staff/schemas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { registerStaff } from '@/services/staff';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export function RegisterStaff() {
    
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Right side - Register Staff Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8">
        <RegisterStaffCard />
      </div>
    </div>
  );
}

function RegisterStaffCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerStaffSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
      specialty: '',
      clinicId: '38e37cc7-992a-4530-a381-fd907fb921b3',
      dni: '',
    },
  });

  function onSubmit(values) {
    setIsLoading(true);
    registerStaff(values)
      .then((response) => {

        if (response.status === 201)
          navigate('/app');
      })
      .catch((err) => {
        
        if (err.response && err.response.status === 400) {
          setError('A doctor with the same DNI or Email already exists');
        } else {
          setError('An error occurred. Please try again later.');
          console.error(err);
        }
        setIconsRed();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Card className="w-full max-w-md rounded-lg shadow-sm">
      <CardHeader className="items-start">
        <CardTitle>Register Staff</CardTitle>
        <CardDescription>Register new staff member</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterStaffForm form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
      </CardContent>
    </Card>
  );
}

function setIconsRed() {
  document.querySelectorAll('.pulse').forEach((div) => {
    div.classList.add('error-pulse');
    div.classList.remove('pulse');
  });
}