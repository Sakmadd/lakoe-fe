export interface DashboardTableData {
  product: string;
  category: string;
  payment: number;
  recipient: string;
  status: string;
  timestamp: string;
}

export interface Transaction {
  id: string;
  amount: number;
  created_at: string;
  status: 'accepted' | 'rejected' | 'pending';
}

export interface User {
  id: string;
  email: string;
}

export interface Shop {
  User: User;
  id: string;
  name: string;
}

export interface TransactionAdmin {
  id: string;
  amount: number;
  bank_account_id: string;
  created_at: string;
  updated_at: string;
  notes: string;
  reference_no: string;
  status: 'accepted' | 'rejected' | 'pending';
  Shop: Shop;
}
