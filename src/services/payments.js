import { client } from '@/api/axiosClient';

export async function obtainPlans() {
  return await client.get('/plans');
}
export async function registerClinic({
  name,
  city,
  district,
  plan,
  active,
  postalCode,
  countryCode = 'ES', // Valor por defecto
}) {
  console.log(name, city, district, plan, active, postalCode, countryCode);

  const clinicData = {
    name,
    city,
    district,
    plan,
    active,
    postalCode,
    countryCode, // Se utiliza el valor del parámetro (o el valor por defecto)
  };

  try {
    const response = await client.post('/clinics/', clinicData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Captura el _id desde la respuesta del servidor
    const { data } = response;
    console.log('Respuesta del servidor:', data);
    return data._id; // Devuelve el _id
  } catch (error) {
    console.error('Error al registrar la clínica:', error);
    throw new Error('No se pudo registrar la clínica');
  }
}


export async function getClinicById(id) {
  return await client.get(`clinics/${id}`);
}
export async function updateClinic(id, clinicData) {
  const token = localStorage.getItem('token'); // Obtén el token desde localStorage
  console.log(token);
  return await client.put(`/clinics/${id}`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    body: JSON.stringify(clinicData),
  });
}

export async function registerPayment({
  planId,
  clinicId
}) {
  const paymentData = {
    planId,
    clinicId
  };

  try {
    const response = await client.post('/payments/', paymentData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    const { data } = response;
    console.log('Respuesta del servidor:', data.url);
    return data.url; // Devuelve el _id
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    throw new Error('No se pudo registrar el pago');
  }
}