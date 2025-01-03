import { client } from '@/api/axiosClient';

export async function obtainPlans() {
  return await client.get('/plans');
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