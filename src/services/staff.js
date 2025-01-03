import { client } from '@/api/axiosClient';

export function registerStaff({ name, surname, email, password, specialty, dni }) {
  return client.post(
    '/staff/register',
    { name, surname, email, password, specialty, dni }
  );
}

export function getMyself() {
  return client.get('/staff/me');
}
