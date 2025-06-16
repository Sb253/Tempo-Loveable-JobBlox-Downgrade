
import { BaseApiService, ApiResponse, PaginatedResponse } from '../../../shared/services/api/base';
import { Customer, CustomerFormData, CustomerFilters } from '../../../types/domains/customer';

class CustomerService extends BaseApiService {
  constructor() {
    super('/api/customers');
  }

  async getCustomers(filters?: CustomerFilters): Promise<PaginatedResponse<Customer>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.searchTerm) queryParams.append('search', filters.searchTerm);
    if (filters?.dateRange) {
      queryParams.append('startDate', filters.dateRange.start);
      queryParams.append('endDate', filters.dateRange.end);
    }

    const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return this.get<Customer[]>(endpoint) as Promise<PaginatedResponse<Customer>>;
  }

  async getCustomer(id: string): Promise<ApiResponse<Customer>> {
    return this.get<Customer>(`/${id}`);
  }

  async createCustomer(data: CustomerFormData): Promise<ApiResponse<Customer>> {
    return this.post<Customer>('', data);
  }

  async updateCustomer(id: string, data: Partial<CustomerFormData>): Promise<ApiResponse<Customer>> {
    return this.put<Customer>(`/${id}`, data);
  }

  async deleteCustomer(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/${id}`);
  }
}

export const customerService = new CustomerService();
