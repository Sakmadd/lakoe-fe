import z from 'zod';

export const adminSchema = z.object({
  status: z.string(),
  notes: z.string().optional(),
});

export type AdminTypes = z.infer<typeof adminSchema>;
