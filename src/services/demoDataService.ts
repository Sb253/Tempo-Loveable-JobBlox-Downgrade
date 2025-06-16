
import { EmployeeProfile } from '../types/auth';

export interface DemoCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: [number, number];
  status: 'active' | 'inactive' | 'pending';
  totalProjects: number;
  totalRevenue: number;
  joinDate: string;
  notes?: string;
}

export interface DemoJob {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedValue: number;
  actualCost?: number;
  startDate: string;
  endDate?: string;
  assignedTeam: string[];
  location: string;
  coordinates: [number, number];
  materials: string[];
  progress: number;
  photos: number;
}

export interface DemoFinancial {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
  monthlyGrowth: number;
  averageJobValue: number;
}

class DemoDataService {
  private customers: DemoCustomer[] = [];
  private jobs: DemoJob[] = [];
  private team: EmployeeProfile[] = [];
  private financial: DemoFinancial = {
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    pendingInvoices: 0,
    paidInvoices: 0,
    overdueInvoices: 0,
    monthlyGrowth: 0,
    averageJobValue: 0
  };

  constructor() {
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Initialize demo customers
    this.customers = [
      {
        id: 'cust-001',
        name: 'Johnson Construction',
        email: 'contact@johnsonconstruction.com',
        phone: '(555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        coordinates: [-74.0060, 40.7128],
        status: 'active',
        totalProjects: 8,
        totalRevenue: 125000,
        joinDate: '2023-06-15',
        notes: 'Long-term commercial client, prefers morning appointments'
      },
      {
        id: 'cust-002',
        name: 'Smith Residential',
        email: 'info@smithresidential.com',
        phone: '(555) 234-5678',
        address: '456 Oak Ave, Brooklyn, NY 11201',
        coordinates: [-73.9851, 40.7589],
        status: 'active',
        totalProjects: 3,
        totalRevenue: 48000,
        joinDate: '2024-01-10',
        notes: 'New residential client, high-end projects'
      },
      {
        id: 'cust-003',
        name: 'Metropolitan Property Group',
        email: 'projects@metroprop.com',
        phone: '(555) 345-6789',
        address: '789 Park Ave, Manhattan, NY 10021',
        coordinates: [-73.9734, 40.7505],
        status: 'pending',
        totalProjects: 0,
        totalRevenue: 0,
        joinDate: '2024-01-20',
        notes: 'Large property management company, potential for big contracts'
      }
    ];

    // Initialize demo jobs
    this.jobs = [
      {
        id: 'job-001',
        customerId: 'cust-001',
        customerName: 'Johnson Construction',
        title: 'Office Building Renovation',
        description: 'Complete renovation of 3-story office building including HVAC, electrical, and interior design',
        status: 'in-progress',
        priority: 'high',
        estimatedValue: 85000,
        actualCost: 67000,
        startDate: '2024-01-15',
        endDate: '2024-03-01',
        assignedTeam: ['Mike Johnson', 'Sarah Davis'],
        location: '123 Main St, New York, NY',
        coordinates: [-74.0060, 40.7128],
        materials: ['drywall', 'electrical', 'hvac', 'flooring'],
        progress: 65,
        photos: 24
      },
      {
        id: 'job-002',
        customerId: 'cust-002',
        customerName: 'Smith Residential',
        title: 'Kitchen Remodeling',
        description: 'Full kitchen renovation with custom cabinets, granite countertops, and high-end appliances',
        status: 'scheduled',
        priority: 'medium',
        estimatedValue: 35000,
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        assignedTeam: ['Tom Wilson'],
        location: '456 Oak Ave, Brooklyn, NY',
        coordinates: [-73.9851, 40.7589],
        materials: ['cabinets', 'granite', 'appliances', 'plumbing'],
        progress: 0,
        photos: 0
      },
      {
        id: 'job-003',
        customerId: 'cust-001',
        customerName: 'Johnson Construction',
        title: 'Parking Lot Resurfacing',
        description: 'Resurfacing of company parking lot with new asphalt and line painting',
        status: 'completed',
        priority: 'low',
        estimatedValue: 15000,
        actualCost: 14200,
        startDate: '2023-12-01',
        endDate: '2023-12-15',
        assignedTeam: ['Mike Johnson'],
        location: '123 Main St, New York, NY',
        coordinates: [-74.0060, 40.7128],
        materials: ['asphalt', 'paint', 'sealant'],
        progress: 100,
        photos: 12
      }
    ];

    // Initialize demo team
    this.team = [
      {
        id: '1',
        name: 'Mike Johnson',
        email: 'mike@company.com',
        phone: '(555) 123-4567',
        address: '123 Main St, New York, NY',
        coordinates: [-74.0060, 40.7128],
        skills: ['plumbing', 'electrical', 'general'],
        availability: 'available',
        workload: 45,
        role: 'manager',
        permissions: ['view_dashboard', 'manage_customers', 'manage_jobs', 'view_reports'],
        hasPassword: true,
        canChangePassword: true,
        lastLogin: '2024-01-15T10:30:00Z',
        invitationStatus: 'accepted'
      },
      {
        id: '2',
        name: 'Sarah Davis',
        email: 'sarah@company.com',
        phone: '(555) 234-5678',
        address: '456 Broadway, New York, NY',
        coordinates: [-73.9851, 40.7589],
        skills: ['roofing', 'carpentry', 'painting'],
        availability: 'available',
        workload: 30,
        role: 'employee',
        permissions: ['view_dashboard', 'manage_jobs'],
        hasPassword: true,
        canChangePassword: false,
        lastLogin: '2024-01-14T14:20:00Z',
        invitationStatus: 'accepted'
      }
    ];

    // Calculate financial data
    this.calculateFinancialData();
  }

  private calculateFinancialData() {
    const completedJobs = this.jobs.filter(job => job.status === 'completed');
    const totalRevenue = completedJobs.reduce((sum, job) => sum + (job.actualCost || job.estimatedValue), 0);
    const totalExpenses = totalRevenue * 0.65; // Assume 65% expense ratio
    
    this.financial = {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      pendingInvoices: this.jobs.filter(job => job.status === 'completed').length,
      paidInvoices: completedJobs.length,
      overdueInvoices: 2,
      monthlyGrowth: 12.5,
      averageJobValue: totalRevenue / Math.max(completedJobs.length, 1)
    };
  }

  // Public methods to get data
  getCustomers(): DemoCustomer[] {
    return [...this.customers];
  }

  getJobs(): DemoJob[] {
    return [...this.jobs];
  }

  getTeam(): EmployeeProfile[] {
    return [...this.team];
  }

  getFinancialData(): DemoFinancial {
    return { ...this.financial };
  }

  // Methods to add/update data
  addCustomer(customer: Omit<DemoCustomer, 'id'>): DemoCustomer {
    const newCustomer: DemoCustomer = {
      ...customer,
      id: `cust-${Date.now()}`
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  addJob(job: Omit<DemoJob, 'id'>): DemoJob {
    const newJob: DemoJob = {
      ...job,
      id: `job-${Date.now()}`
    };
    this.jobs.push(newJob);
    this.calculateFinancialData();
    return newJob;
  }

  updateJob(jobId: string, updates: Partial<DemoJob>): DemoJob | null {
    const jobIndex = this.jobs.findIndex(job => job.id === jobId);
    if (jobIndex === -1) return null;
    
    this.jobs[jobIndex] = { ...this.jobs[jobIndex], ...updates };
    this.calculateFinancialData();
    return this.jobs[jobIndex];
  }

  // Get statistics for dashboard
  getDashboardStats() {
    const activeJobs = this.jobs.filter(job => job.status === 'in-progress').length;
    const scheduledJobs = this.jobs.filter(job => job.status === 'scheduled').length;
    const completedJobs = this.jobs.filter(job => job.status === 'completed').length;
    const activeCustomers = this.customers.filter(customer => customer.status === 'active').length;
    const availableTeam = this.team.filter(member => member.availability === 'available').length;

    return {
      activeJobs,
      scheduledJobs,
      completedJobs,
      activeCustomers,
      availableTeam,
      totalTeam: this.team.length,
      revenue: this.financial.totalRevenue,
      profit: this.financial.netProfit,
      growth: this.financial.monthlyGrowth
    };
  }
}

// Export a singleton instance
export const demoDataService = new DemoDataService();
