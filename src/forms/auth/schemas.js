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

export const verify2FASchema = z.object({
  totpToken: z
    .string({ required_error: '2FA token is required' })
    .length(6, '2FA token must be 6 digits')
    .transform((val) => val.trim()),
});
