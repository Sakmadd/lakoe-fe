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
  title: string;
  price: number;
  stock: number;
  sku: string;
  category: CategoryType;
  image: ImageType;
  url: string;
  is_active: boolean;
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
