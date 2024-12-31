import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LockIcon } from 'lucide-react';
import { PasswordChangeForm } from '@/forms/auth/forms';
import { changePasswordSchema } from '@/forms/auth/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassword } from '@/services/auth';
import { useNavigate } from 'react-router-dom';

export default function PasswordChange() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    setError('');
    changePassword(values)
      .then((response) => {
        if (response.status === 200 && response.data.message === 'Password changed successfully') {
          setIsLoading(false);
          setIsOpen(false);
          form.reset();
          navigate('/app');
        }}).catch((err) => {
        setIsLoading(false);
        if (err.response && err.response.data.message === 'Invalid credentials') {
          setError('Invalid current password');
        } 
        else if (err.response && err.response.data.errors) {
          const backendErrors = err.response.data.errors;
          const formattedErrors = Object.keys(backendErrors).reduce((acc, key) => {
            acc[key] = backendErrors[key];
            return acc;
          }, {});
          if (formattedErrors.currentPassword) {
            form.setError('currentPassword', { message: formattedErrors.currentPassword });
          }
          if (formattedErrors.newPassword) {
            form.setError('newPassword', { message: formattedErrors.newPassword });
          }
        } 
        else {
          setError('An unexpected error occurred. Please try again later.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <LockIcon className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4">
        <PasswordChangeForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          error={error}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

