import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Username cannot be empty' })
    .regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, {
      message:
        'Username must be in snake_case format: lowercase letters, numbers, and underscores only',
    }),
  email: z.string().email({ message: 'Email must be in a valid email format' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type RegisterType = z.infer<typeof registerSchema>;
