import { client } from '@/api/axiosClient';

export async function obtainPlans() {
  return await client.get('/plans');
}
export async function registerPayment({planId,clinicId}) {
  const paymentData = {planId,clinicId};

  try {
    const response = await client.post('/payments', paymentData);
    const { data } = response;

    if (data.url) {
      window.location.href = data.url; 
    } else {
      console.error('No se recibió una URL para redirigir');
    }
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    throw new Error('No se pudo registrar el pago');
  }
}