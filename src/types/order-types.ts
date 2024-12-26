export interface CreateOrderRequestDTO {
  name: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postal_code: string;
  longitude: string;
  latitude: string;
  origin_area_id: string;
  destination_area_id: string;
  courier_price: number;
  courier_company: string;
  courier_code: string;
  courier_type: string;
  items: ProductDTO;
}

interface ProductDTO {
  product_id: string;
  variant_combination_id?: string;
  price: number;
  quantity: number;
}

export interface CreateOrderResponseDTO {
  token: string;
  redirect_url: string;
  order: OrderResponseType;
}

type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type OrderItemType = {
  id: string;
  product_id: string;
  quantity: number;
  Product: ProductType;
};

type PaymentType = {
  id: string;
  url: string;
};

type InvoiceType = {
  id: string;
  recipient_id: string;
  shop_id: string;
  price: number;
  service_charge: number;
  invoice_number: string;
  created_at: string;
  updated_at: string;
};

type RecipientType = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  district: string;
  city: string;
  postal_code: string;
  longitude: string;
  latitude: string;
  Invoices: InvoiceType;
};

export type OrderResponseType = {
  id: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  OrderItem: OrderItemType;
  Payment: PaymentType;
  Recipient: RecipientType;
};
