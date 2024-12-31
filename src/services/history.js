import { client } from '@/api/axiosClient';

export function addCondition({ name, details, since, until }) {
  return client.post(
    '/history/condition',
    { name, details, since, until }
  );
}