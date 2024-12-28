export type OrderHistoryItem = {
  status: string;
  timestamp: string;
};

type Payment = {
  url: string;
};

type Price = {
  discount: number;
  service_fee: number;
  shipping_cost: number;
  total: number;
  total_price: number;
};

type Product = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  total_price: number;
};

type Recipient = {
  address: string;
  name: string;
  phone: string;
};

type Shop = {
  name: string;
  logo: string;
  slogan: string;
};

export type OrderDetailTypes = {
  Courier: {
    courier_code: string;
    courier_company: string;
    tracking_id: string;
    waybill_id: string;
  };
  OrderHistory: OrderHistoryItem[];
  Payment: Payment;
  Price: Price;
  Product: Product;
  Recipient: Recipient;
  Shop: Shop;
  created_at: string;
  id: string;
  invoice_number: string;
  price: number;
  error: boolean;
  message: string | null;
};
