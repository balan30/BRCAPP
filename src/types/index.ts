export interface LoadingSlip {
  id: string;
  slip_number: string;
  date: string;
  party: string;
  vehicle_no: string;
  from_location: string;
  to_location: string;
  dimension: string;
  weight: number;
  supplier: string;
  freight: number;
  advance: number;
  balance: number;
  rto: number;
  total_freight: number;
  created_at: string;
  updated_at: string;
}

export interface Memo {
  id: string;
  memo_number: string;
  loading_slip_id: string;
  date: string;
  supplier: string;
  freight: number;
  commission: number;
  mamool: number;
  detention: number;
  extra: number;
  rto: number;
  net_amount: number;
  advance_payments: AdvancePayment[];
  is_paid: boolean;
  payment_date?: string;
  payment_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface Bill {
  id: string;
  bill_number: string;
  loading_slip_id: string;
  date: string;
  party: string;
  bill_amount: number;
  mamool: number;
  tds: number;
  penalties: number;
  net_amount: number;
  pod_image?: string;
  is_received: boolean;
  receipt_date?: string;
  receipt_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface AdvancePayment {
  id: string;
  memo_id?: string;
  bill_id?: string;
  date: string;
  amount: number;
  mode: 'cash' | 'bank' | 'cheque' | 'online';
  reference?: string;
  created_at: string;
}

export interface BankingEntry {
  id: string;
  type: 'credit' | 'debit';
  category: 'bill_advance' | 'bill_payment' | 'memo_advance' | 'memo_payment' | 'expense' | 'other';
  amount: number;
  date: string;
  reference_id?: string;
  reference_name?: string;
  narration: string;
  created_at: string;
}

export interface Party {
  id: string;
  name: string;
  address?: string;
  contact?: string;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  address?: string;
  contact?: string;
  created_at: string;
}

export interface LedgerEntry {
  id: string;
  ledger_type: 'party' | 'supplier' | 'general';
  reference_id: string;
  reference_name: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  created_at: string;
}