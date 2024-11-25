import { createAxiosClient } from '@/api/createAxiosClient';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
const REFRESH_TOKEN_URL = `${BASE_URL}/token/refresh`;


export const client = createAxiosClient({
  options: {
    withCredentials: true,
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
    }
  },
  refreshTokenUrl: REFRESH_TOKEN_URL,
});
