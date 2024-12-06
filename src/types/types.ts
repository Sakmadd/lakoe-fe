export interface OrderType {
  id: number;
  name: string;
  status: string;
  invoice: string;
  quantity: number;
  total_price: number;
  image: ImageType;
  courier: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageType {
  alt: string;
  src: string;
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category_id: string;
  image: ImageType;
  url: string;
  is_active: boolean;
  minimum_order: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  variants: VariantType[];
  variant_option_combinations: VariantOptionCombinationType[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryType {
  id: string;
  label: string;
  value: string;
  parent_id: string | null;
}

export interface CourierType {
  id: string;
  label: string;
  value: string;
}

export interface VariantType {
  id: string;
  name: string;
  options?: VariantOptionType[];
}

export interface VariantOptionType {
  id: string;
  name: string;
  src?: string;
  alt?: string;
}

export interface VariantUIType extends VariantType {
  is_checked: boolean;
}

export interface VariantOptionCombinationType {
  name: string;
  is_active: boolean;
  price: number;
  stock: number;
  sku: string;
  weight: number;
}

export interface VariantCombinationFormType {
  variants: VariantOptionCombinationType[];
}

export const variants: VariantType[] = [
  {
    id: '1',
    name: 'color',
    options: [
      {
        id: '1',
        name: 'red',
        alt: 'red',
        src: 'https://example.com/images/white.jpg',
      },
      {
        id: '2',
        name: 'green',
        alt: 'green',
        src: 'https://example.com/images/white.jpg',
      },
      {
        id: '3',
        name: 'blue',
        alt: 'blue',
        src: 'https://example.com/images/white.jpg',
      },
    ],
  },
  {
    id: '1',
    name: 'size',
    options: [
      {
        id: '1',
        name: 's',
        alt: 's',
        src: 'https://example.com/images/white.jpg',
      },
      {
        id: '2',
        name: 'm',
        alt: 'm',
        src: 'https://example.com/images/white.jpg',
      },
      {
        id: '3',
        name: 'l',
        alt: 'l',
        src: 'https://example.com/images/white.jpg',
      },
    ],
  },
];

export const variant_option_combinations: VariantOptionCombinationType[] = [];
