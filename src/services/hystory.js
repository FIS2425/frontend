import { client } from '@/api/axiosClient';

export function getHistoryByPatientId(id) {
  return client.get(`/histories/patient/${id}`);
}