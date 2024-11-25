import { client } from '@/api/axiosClient';

// Example service function
export function login({ email, password }) {
  return client.post(
    '/login',
    { email, password }
  );
}
