type CourierType = {
  courier_company: string;
  courier_code: string;
  tracking_id: string;
  waybill_id: string;
};

type PaymentType = {
  url: string;
};

type RecipientSummaryType = {
  name: string;
  address: string;
  phone: string;
};

type ShopType = {
  name: string;
  logo: string;
  slogan: string;
};

type ProductType = {
  name: string;
  image: string;
  price: number;
  quantity: number;
  total_price: number;
};

type PriceDetailsType = {
  total_price: number;
  shipping_cost: number;
  discount: number;
  service_fee: number;
  total: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OrderHistoryType = any[];

export type InvoiceType = {
  id: string;
  price: number;
  invoice_number: string;
  created_at: string;
  Courier: CourierType;
  Payment: PaymentType;
  Recipient: RecipientSummaryType;
  Shop: ShopType;
  Product: ProductType;
  Price: PriceDetailsType;
  OrderHistory: OrderHistoryType;
};
