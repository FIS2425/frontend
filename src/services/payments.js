import { client } from '@/api/axiosClient';

export async function obtainPlans() {
  return await client.get('/plans');
}