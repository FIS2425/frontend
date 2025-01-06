import { client } from '@/api/axiosClient';

export function getAppointmentsByPatiendId(patientId) {
  return client.get(`/appointments/patient/${patientId}`);
}

export function getAppointmentsByDoctorId(doctorId) {
  return client.get(`/appointments/doctor/${doctorId}`);
}

export function getAppointmentById(appointmentId) {
  return client.get(`/appointments/${appointmentId}`).then(response => response.data);
}

export function getAppointmentWeather(appointmentDate) {
  return client.get(`/appointments/${appointmentDate}/weather`).then(response => response.data);
}

export function cancelAppointment(appointmentId) {
  return client.put(`/appointments/${appointmentId}/cancel`);
}

export function completeAppointment(appointmentId) {
  return client.put(`/appointments/${appointmentId}/complete`);
}

export function noShowAppointment(appointmentId) {
  return client.put(`/appointments/${appointmentId}/noshow`);
}