import { client } from '@/api/axiosClient';

export function login({ email, password }) {
  return client.post(
    '/login',
    { email, password }
  );
}
