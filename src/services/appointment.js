import { client } from '@/api/axiosClient';

export function getAppointmentsByPatiendId(patientId) {
  return client.get(`/appointments/patient/${patientId}`);
}
