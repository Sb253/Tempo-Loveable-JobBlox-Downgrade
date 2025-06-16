
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  status: 'active' | 'inactive' | 'lead';
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface CustomerFilters {
  status?: Customer['status'];
  searchTerm?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}
