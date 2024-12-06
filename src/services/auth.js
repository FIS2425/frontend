import { client } from '@/api/axiosClient';

export function login({ email, password }) {
  return client.post(
    '/login',
    { email, password }
  );
}

export function logout() {
  return client.post('/logout');
}
