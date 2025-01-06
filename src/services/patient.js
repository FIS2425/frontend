import { client } from '@/api/axiosClient';

// Obtener un paciente por ID
export async function getPatientById(id) {
  return await client.get(`patients/${id}`);
}

// Actualizar un paciente por ID
export async function updatePatient(id, patientData) {
  return await client.put(`/patients/${id}`,patientData, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
}
