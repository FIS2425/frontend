import { client } from '@/api/axiosClient';

export function getPatientById(id) {
  return client.get(`/patients/${id}`);
}
