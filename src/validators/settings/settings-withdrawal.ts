import { z } from 'zod';

export const settingsWithdrawalSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  bank_account: z
    .string()
    .regex(/^\d+$/, 'Only numbers are allowed')
    .min(1, "Bank Account can't be empty"),
  bank_name: z.string().min(1, 'Choose bank'),
});

export type SettingsWithdrawalTypes = z.infer<typeof settingsWithdrawalSchema>;
