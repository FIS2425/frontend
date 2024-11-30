import { Bandage, Activity, Cross, HeartPulse, HandHeart, CalendarHeart, Syringe, Tablets, Stethoscope, Dna, Brain } from 'lucide-react';
import { LoginForm, loginSchema } from '@/forms/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PulsingIcons from '@/components/pulsing-icons';
import { login } from '@/services/auth';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export function Login() {
  const icons = {
    Bandage,
    Activity,
    Cross,
    HeartPulse,
    HandHeart,
    CalendarHeart,
    Syringe,
    Tablets,
    Stethoscope,
    Dna,
    Brain,
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Graphic */}
      <div className="flex w-0 lg:w-1/3 relative duration-200 transition-width ease-linear">
        <PulsingIcons icons={icons} className="overflow-hidden fixed w-0 lg:w-1/3 inset-x-0 min-h-screen bg-sidebar border-r ring-r" />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8">
        <LoginCard />
      </div>
    </div>
  );
}

function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values) {
    setIsLoading(true);
    login(values)
      .then((response) => {
        if (response.status === 200 && response.data.message === 'Login successful')
          navigate('/app');

        else if (response.status === 200 && response.data.message === 'Credentials validated, please verify 2FA token')
          navigate('/verify-2fa');
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // Usually we would use form.setError, but in this case the 400 error only happens for "invalid credetials" which has no target field
          setError('Invalid email or password');
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
        <CardTitle>Log In</CardTitle>
        <CardDescription>Log In to CloudMedix</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
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
