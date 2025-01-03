// import { client } from '@/api/axiosClient';
import axios from 'axios';

// export async function workshifts() {
//   return client.get('/workshifts').then(res => res.data);
// }

export async function workshifts() {
  return axios.get('http://localhost:3011/api/v1/workshifts').then(res => res.data);
}

export async function createWorkshift({ date, startTime, endTime}) {
  const startDate = new Date(date);
  startDate.setHours(parseInt(startTime.split(':')[0]) + 1);
  startDate.setMinutes(parseInt(startTime.split(':')[1]));
  const duration = (parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])) * 60;

  // TODO: Get the doctorId and the clinicId from the LocalStorage
  // const doctorId = localStorage.getItem('doctorId');
  // const clinicId = localStorage.getItem('clinicId');

  const doctorId = 'c3006115-a72a-4a8c-9713-a24375915edb';
  const clinicId = '597dabaf-682f-4915-9ce6-b2db9d9fff07';
  const workshift = {
    doctorId,
    clinicId,
    startDate,
    duration,
  };
  return axios.post('http://localhost:3011/api/v1/workshifts', workshift).then(res => res.data);
  // return client.post('/workshifts', workshift).then(res => res.data);
}

