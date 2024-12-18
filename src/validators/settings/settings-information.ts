import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 10000000;

export const settingsInformationSchema = z
  .object({
    slogan: z.string().min(1, 'Slogan cannot be empty').nullable(),
    name: z.string().min(1, 'Store name cannot be empty'),
    description: z.string().min(1, 'Description cannot be empty').nullable(),
    phone: z.string().min(1, 'Phone number cannot be empty').nullable(),
    logo: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 10MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
  })
  .strict();

export type SettingsInformationType = z.infer<typeof settingsInformationSchema>;
