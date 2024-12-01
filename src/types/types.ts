export interface OrderType {
  id: number;
  name: string;
  status: string;
  invoice: string;
  quantity: number;
  total_price: number;
  image: ImageType;
}

export interface ImageType {
  alt: string;
  src: string;
}
