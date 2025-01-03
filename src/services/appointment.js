import { client } from '@/api/axiosClient';

export function getAppointmentsByPatiendId(patientId) {
  return client.get(`/appointments/patient/${patientId}`);
}

export function getAppointmentById(appointmentId) {
  return client.get(`/appointments/${appointmentId}`);
}
