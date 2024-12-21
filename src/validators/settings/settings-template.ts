import { z } from 'zod';

export const settingsTemplateSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, "Template Title can't be empty"),
    contain_message: z.string().min(1, "Template Message can't be empty"),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .strict();

export type SettingsTemplateTypes = z.infer<typeof settingsTemplateSchema>;
