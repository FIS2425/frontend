import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .transform((val) => val.trim()),
  password: z
    .string({ required_error: 'Password is required' })
    .transform((val) => val.trim()),
});
