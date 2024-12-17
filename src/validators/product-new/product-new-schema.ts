import { z } from 'zod';

// Schema for Variant Options
const VariantOptionSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  name: z.string().min(1, { message: 'Option name is required' }),
  alt: z.string().optional(),
  src: z.string().url({ message: 'Invalid URL format' }).optional(),
});

// Schema for Variants
const VariantSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  name: z.string().min(1, { message: 'Variant name is required' }),
  options: z
    .array(VariantOptionSchema)
    .nonempty({ message: 'Options cannot be empty' }),
});

// Schema for Variant Option Combinations
const VariantOptionCombinationSchema = z.object({
  name: z.string().min(1, { message: 'Combination name is required' }),
  price: z.number().min(0, { message: 'Price must be at least 0' }),
  sku: z.string().min(1, { message: 'SKU is required' }),
  stock: z.number().min(0, { message: 'Stock must be at least 0' }),
  weight: z.number().min(0, { message: 'Weight must be at least 0' }),
  is_active: z.boolean(),
});

// Main Product Schema
export const ProductSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  url: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'URL must be in kebab-case format',
  }),
  category_id: z.string().min(1, { message: 'Category ID is required' }),
  description: z
    .string()
    .max(3000, { message: 'Description cannot exceed 3000 characters' }),
  minimum_order: z
    .string()
    .regex(/^\d+$/, { message: 'Minimum order must be a number' }),
  price: z.string().regex(/^\d+$/, { message: 'Price must be a number' }),
  stock: z.string().regex(/^\d+$/, { message: 'Stock must be a number' }),
  sku: z.string().min(1, { message: 'SKU is required' }),
  weight: z.string().regex(/^\d+$/, { message: 'Weight must be a number' }),
  length: z.string().regex(/^\d+$/, { message: 'Length must be a number' }),
  width: z.string().regex(/^\d+$/, { message: 'Width must be a number' }),
  height: z.string().regex(/^\d+$/, { message: 'Height must be a number' }),
  variants: z.array(VariantSchema).optional(), // Optional
  variant_option_combinations: z
    .array(VariantOptionCombinationSchema)
    .optional(), // Optional
});
