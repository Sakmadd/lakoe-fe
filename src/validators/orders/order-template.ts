import { z } from 'zod';

export const orderTemplateSchema = z.object({
  order_id: z.string(),
  value: z.string(),
});

export type OrderTemplateTypes = z.infer<typeof orderTemplateSchema>;
