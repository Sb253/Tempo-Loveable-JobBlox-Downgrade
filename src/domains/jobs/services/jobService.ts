
import { BaseApiService, ApiResponse, PaginatedResponse } from '../../../shared/services/api/base';
import { Job, JobFormData } from '../../../types/domains/job';

class JobService extends BaseApiService {
  constructor() {
    super('/api/jobs');
  }

  async getJobs(): Promise<PaginatedResponse<Job>> {
    return this.get<Job[]>('') as Promise<PaginatedResponse<Job>>;
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    return this.get<Job>(`/${id}`);
  }

  async createJob(data: JobFormData): Promise<ApiResponse<Job>> {
    return this.post<Job>('', data);
  }

  async updateJob(id: string, data: Partial<JobFormData>): Promise<ApiResponse<Job>> {
    return this.put<Job>(`/${id}`, data);
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/${id}`);
  }

  async updateJobStatus(id: string, status: Job['status']): Promise<ApiResponse<Job>> {
    return this.put<Job>(`/${id}/status`, { status });
  }
}

export const jobService = new JobService();
