import { logout } from '@/services/auth';
import { Navigate } from 'react-router-dom';

export function Logout() {
  logout();

  return (
    <Navigate to="/" replace />
  );
}
