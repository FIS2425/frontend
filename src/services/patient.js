import { clientPacientes } from '@/api/axiosClient';

// Obtener un paciente por ID
export async function getPatientById(id) {
  return await clientPacientes.get(`patients/9a80657b-0b94-4d37-b139-ce6c409fd78e`);
}

// Actualizar un paciente por ID
export async function updatePatient(id, patientData) {
  return await clientPacientes.put(`/patients/9a80657b-0b94-4d37-b139-ce6c409fd78e`, patientData,{
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
}
