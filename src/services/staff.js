import { client } from '@/api/axiosClient';

export function registerStaff({ name, surname, email, password, specialty, dni }) {
  return client.post(
    '/staff/register',
    { name, surname, email, password, specialty, dni }
  );
}

export async function getDoctorData(doctorId) {
  const response = await client.get(`/staff/${doctorId}`);
  return response.data;
}

export function getCurrentDoctorData() {
  return client.get('/staff/me').then(response => response.data);
}

export function updateSpecialty(doctorId, specialty) {
  return client.put(`/staff/${doctorId}`, { specialty }).then(response => response.data);
}

export function deleteDoctor(doctorId) {
  return client.delete(`/staff/${doctorId}`).then(response => response.data);
}