import { client } from '@/api/axiosClient';

export function getClinicData(clinicId) {
  return client.get(`/clinics/${clinicId}`).then(response => response.data);
}