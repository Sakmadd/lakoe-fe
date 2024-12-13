import { z } from 'zod';

export const withdrawSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+$/, 'Only numbers are allowed')
    .refine(
      (value) => {
        const num = parseInt(value, 10);
        return !isNaN(num) && num >= 10000 && num <= 1000000;
      },
      { message: 'Amount must be between 10,000 and 1,000,000' }
    ),
});

export type WithdrawType = z.infer<typeof withdrawSchema>;
