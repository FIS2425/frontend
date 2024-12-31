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

export function verify2FA(userId, { totpToken }) {
  return client.post(
    'users/verify-2fa',
    { userId, totpToken }
  );
}

export function changePassword({ currentPassword, newPassword }) {
  return client.post(
    '/users/change-password',
    { currentPassword, newPassword }
  );
}
