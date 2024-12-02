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
