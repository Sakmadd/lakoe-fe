import { z } from 'zod';

export const settingsLocationSchema = z
  .object({
    is_main: z.boolean().optional(),
    name: z.string().min(1, 'Store name cannot be empty'),
    postal_code: z.string().min(1, 'Postal code cannot be empty'),
    address: z.string().min(1, 'Address cannot be empty'),
    city: z.string().min(1, 'Select one Regency '),
    province: z.string().min(1, 'Select one Province'),
    district: z.string().min(1, 'Select one District'),
    subdistrict: z.string().min(1, 'Select one Subdistrict'),
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
