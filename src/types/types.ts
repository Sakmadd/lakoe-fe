export interface UserType {
  id: string;
  shop_id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  Shop: Shop;
}

export interface Shop {
  name: string;
  Product: [];
  Withdraw: [];
  balance: number;
  description: string | null;
  id: string;
  location: [];
  logo: string | undefined;
  phone: string | null;
  slogan: string | null;
}

export interface imagesType {
  src: string;
  alt: string;
}

export interface recipientType {
  name: string;
  email: string;
  address: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postal_code: string;
  longitude: string;
  latitude: string;
}

export interface OrderType {
  id: number;
  name: string;
  status: string;
  invoice: string;
  quantity: number;
  total_price: number;
  images: ImageType[];
  courier: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailType {
  id: number;
  name: string;
  status: string;
  invoice: string;
  customer: string;
  createdAt: string;
  address: string;
  courier: string;
  images: ImageType[];
  quantity: number;
  total_price: number;
}

export interface ImageType {
  alt: string;
  src: string;
}
export interface SellerProductListType {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  is_active: boolean;
  Images: ImageType[];
  url_name: string;
  Category: CategoryType;
  created_at: string;
  updated_at: string;
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category_id: string;
  images: ImageType[] | File[];
  url: string;
  is_active: boolean;
  minimum_order: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  variants?: VariantType[];
  category: CategoryType;
  variant_option_combinations?: VariantOptionCombinationType[];
  selected_variant?: string[];
  selected_combination?: VariantOptionCombinationType;
  checkout_quantity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryType {
  id: string;
  label: string;
  value: string;
  parent_id: string | null;
  children?: CategoryType[];
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
  id?: string;
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

export interface LocationType {
  id: string;
  nama: string;
}

export interface FormLocationType {
  province: LocationType;
  city: LocationType;
  district: LocationType;
  subdistrict: LocationType;
}

export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface ProductsListType {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  price: number;
  url_name: string;
  Images: {
    src: string;
  };
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

export const variant_option_combinations: VariantOptionCombinationType[] = [
  {
    name: 'red-s',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'red-s',
    weight: 1,
  },
  {
    name: 'red-m',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'red-m',
    weight: 1,
  },
  {
    name: 'red-l',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'red-l',
    weight: 1,
  },
  {
    name: 'green-s',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'green-s',
    weight: 1,
  },
  {
    name: 'green-m',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'green-m',
    weight: 1,
  },
  {
    name: 'green-l',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'green-l',
    weight: 1,
  },
  {
    name: 'blue-s',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'blue-s',
    weight: 1,
  },
  {
    name: 'blue-m',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'blue-m',
    weight: 1,
  },
  {
    name: 'blue-l',
    is_active: true,
    price: 1000,
    stock: 10,
    sku: 'blue-l',
    weight: 1,
  },
];
