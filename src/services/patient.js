import { clientPatient } from '@/api/axiosClient';

export async function registerPatient({ name, surname, email, password, city, dni, birthdate,username }) {
  console.log(name, surname, email, password, city, dni, birthdate,username);
  const patientData = {
    name,
    surname,
    email,
    password,
    city,
    dni,
    birthdate,
    username,
  };

  return await clientPatient.post('/patients/',patientData, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}
export function getPatientById(id) {
  return clientPatient.get(`/patients/${id}`);
}
