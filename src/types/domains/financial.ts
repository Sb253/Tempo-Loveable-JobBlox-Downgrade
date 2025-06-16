
export interface Estimate {
  id: string;
  jobId: string;
  customerId: string;
  items: EstimateItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface EstimateItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  estimateId?: string;
  jobId: string;
  customerId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Expense {
  id: string;
  jobId?: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  receipt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
