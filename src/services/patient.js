import { client } from '@/api/axiosClient';

export function registerPatient({ name, surname, email, password, city, dni, birthdate }) {
  return client.post(
    '/patient/',
    { name, surname, email, password, city, dni, birthdate }
  );
}