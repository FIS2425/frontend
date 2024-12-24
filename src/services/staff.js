import { client } from '@/api/axiosClient';

export function registerStaff({ name, surname, email, password, specialty, clinicId, dni }) {
  return client.post(
    '/staff/register',
    { name, surname, email, password, specialty, clinicId, dni }
  );
}