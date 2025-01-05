import { client } from '@/api/axiosClient';

export function getHistoryByPatientId(id) {
  return client.get(`/histories/patient/${id}`);
}

export function addCondition(id, { name, details, since, until }) {
  return client.post(
    `/histories/${id}/condition`,
    { name, details, since, until }
  );
}