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
  order_id: string;
  token: string;
  redirect_url: string;
}
