import { z } from 'zod';

export const settingsLocationSchema = z
  .object({
    id: z.string(),
    shop: z.string().min(1, 'Store name cannot be empty'),
    postal: z.string().min(1, 'Postal code cannot be empty'),
    address: z.string().min(1, 'Address cannot be empty'),
    regency: z.string().min(1, 'Select one regencies / district'),
    location: z
      .object({
        lat: z
          .number()
          .min(-90, { message: 'Latitude must be >= -90' })
          .max(90, { message: 'Latitude must be <= 90' }),
        lng: z
          .number()
          .min(-180, { message: 'Longitude must be >= -180' })
          .max(180, { message: 'Longitude must be <= 180' }),
      })
      .optional()
      .nullable(),
  })
  .strict();

export type SettingsLocationType = z.infer<typeof settingsLocationSchema>;
