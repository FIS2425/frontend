import axios from 'axios';

export function getDoctorData(doctorId) {
  return axios.get(`/api/doctors/${doctorId}`).then(response => response.data);
}

export function getCurrentDoctorData() {
  return axios.get('/api/doctors/me').then(response => response.data);
}

export function updateSpecialty(doctorId) {
  return axios.put(`/api/doctors/${doctorId}/specialty`).then(response => response.data);
}

export function deleteDoctor(doctorId) {
  return axios.delete(`/api/doctors/${doctorId}`).then(response => response.data);
}