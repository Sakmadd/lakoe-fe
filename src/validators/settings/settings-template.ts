import { z } from 'zod';

export const settingsTemplateSchema = z
  .object({
    id: z.string(),
    title: z.string().min(1, "Template Title can't be empty"),
    message: z.string().min(1, "Template Message can't be empty"),
  })
  .strict();

export type SettingsTemplateTypes = z.infer<typeof settingsTemplateSchema>;
