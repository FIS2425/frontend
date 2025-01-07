import { client } from '@/api/axiosClient';

export async function workshiftsByDoctor(doctorId) {
  return client.get(`/workshifts/doctor/${doctorId}`).then(res => res.data);
}