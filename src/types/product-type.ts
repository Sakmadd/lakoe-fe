import { VariantOptionCombinationType } from './types';

type Category = {
  id: string;
  label: string;
  value: string;
  parent_id: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  src: string;
  alt: string;
};

type VariantOption = {
  id: string;
  name: string;
  alt: string;
  src: string;
};

export type Variant = {
  id: string;
  name: string;
  is_active: boolean;
  product_id: string;
  VariantOption: VariantOption[];
};

type VariantOptionCombination = {
  id: string;
  product_id: string;
  name: string;
  is_active: boolean;
  price: number;
  weight: number;
  sku: string;
  stock: number;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  sku: string;
  price: number;
  url_name: string;
  description: string;
  stock: number;
  weight: number;
  minimum_order: number;
  is_active: boolean;
  length: number;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  selected_variant?: string[];
  selected_combination?: VariantOptionCombinationType;
  checkout_quantity?: number;
  Category: Category;
  Images: ProductImage[];
  Variant?: Variant[];
  VariantOptionCombinations?: VariantOptionCombination[];
};
