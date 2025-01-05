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

export function editCondition(id, conditionId, { name, details, since, until }) {
  return client.put(
    `/histories/${id}/condition/${conditionId}`,
    { name, details, since, until }
  );
}

export function deleteCondition(id, conditionId) {
  return client.delete(`/histories/${id}/condition/${conditionId}`);
}