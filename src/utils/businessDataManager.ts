// Business Data Manager - Centralized business logic and data management

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  customerType: 'residential' | 'commercial' | 'industrial';
  paymentTerms: string;
  creditLimit: number;
  taxExempt: boolean;
  preferredContactMethod: string;
  notes: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  serviceHistory: any[];
  totalRevenue: number;
  lastServiceDate: string;
  status: 'active' | 'inactive' | 'potential';
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  jobType: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'scheduled' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  estimatedHours: number;
  actualHours: number;
  assignedTeam: string[];
  materials: Array<{
    id: string;
    name: string;
    quantity: number;
    cost: number;
  }>;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  estimatedCost: number;
  actualCost: number;
  notes: string;
  safetyRequirements: string[];
  qualityChecks: string[];
  customerInstructions: string;
  permitRequired: boolean;
  permitNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  jobId?: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  lineItems: Array<{
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
    taxable: boolean;
  }>;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  notes: string;
  terms: string;
  paymentMethod: string;
  paidDate?: string;
  paidAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hourlyRate: number;
  skills: string[];
  certifications: string[];
  status: 'active' | 'inactive';
  startDate: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  location?: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
  availability: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  jobId?: string;
  employeeId: string;
  employeeName: string;
  date: string;
  receiptUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  notes: string;
  isReimbursable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  supplier: string;
  cost: number;
  sellingPrice: number;
  quantityInStock: number;
  reorderPoint: number;
  unit: string;
  location: string;
  lastOrderDate: string;
  expirationDate?: string;
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  category: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  assignedTo?: string;
  location?: string;
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiration?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  notes: string;
}

export interface SafetyIncident {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  location: string;
  jobId?: string;
  reportedBy: string;
  date: string;
  injuredPerson?: string;
  witnessNames: string[];
  correctiveActions: string;
  status: 'reported' | 'investigating' | 'resolved';
  photos: string[];
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  jobId?: string;
  jobTitle?: string;
  startTime: string;
  endTime?: string;
  breakTime: number;
  totalHours: number;
  description: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: 'in-progress' | 'completed' | 'approved';
}

class BusinessDataManager {
  private storagePrefix = 'jobblox_';
  
  // Customer Management
  createCustomer(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer {
    const customer: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.saveCustomer(customer);
    console.log('Customer created:', customer);
    return customer;
  }
  
  updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
    const customer = this.getCustomer(id);
    if (!customer) return null;
    
    const updatedCustomer = {
      ...customer,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveCustomer(updatedCustomer);
    console.log('Customer updated:', updatedCustomer);
    return updatedCustomer;
  }
  
  getCustomer(id: string): Customer | null {
    const customers = this.getAllCustomers();
    return customers.find(c => c.id === id) || null;
  }
  
  getAllCustomers(): Customer[] {
    const data = localStorage.getItem(`${this.storagePrefix}customers`);
    return data ? JSON.parse(data) : this.getDefaultCustomers();
  }
  
  saveCustomer(customer: Customer): void {
    const customers = this.getAllCustomers();
    const index = customers.findIndex(c => c.id === customer.id);
    
    if (index >= 0) {
      customers[index] = customer;
    } else {
      customers.push(customer);
    }
    
    localStorage.setItem(`${this.storagePrefix}customers`, JSON.stringify(customers));
  }
  
  deleteCustomer(id: string): boolean {
    const customers = this.getAllCustomers();
    const filtered = customers.filter(c => c.id !== id);
    
    if (filtered.length < customers.length) {
      localStorage.setItem(`${this.storagePrefix}customers`, JSON.stringify(filtered));
      console.log('Customer deleted:', id);
      return true;
    }
    
    return false;
  }
  
  // Employee Management
  createEmployee(employeeData: Omit<Employee, 'id'>): Employee {
    const employee: Employee = {
      ...employeeData,
      id: `emp-${Date.now()}`
    };
    
    this.saveEmployee(employee);
    console.log('Employee created:', employee);
    return employee;
  }
  
  getAllEmployees(): Employee[] {
    const data = localStorage.getItem(`${this.storagePrefix}employees`);
    return data ? JSON.parse(data) : this.getDefaultEmployees();
  }
  
  saveEmployee(employee: Employee): void {
    const employees = this.getAllEmployees();
    const index = employees.findIndex(e => e.id === employee.id);
    
    if (index >= 0) {
      employees[index] = employee;
    } else {
      employees.push(employee);
    }
    
    localStorage.setItem(`${this.storagePrefix}employees`, JSON.stringify(employees));
  }
  
  // Expense Management
  createExpense(expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Expense {
    const expense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.saveExpense(expense);
    console.log('Expense created:', expense);
    return expense;
  }
  
  getAllExpenses(): Expense[] {
    const data = localStorage.getItem(`${this.storagePrefix}expenses`);
    return data ? JSON.parse(data) : this.getDefaultExpenses();
  }
  
  saveExpense(expense: Expense): void {
    const expenses = this.getAllExpenses();
    const index = expenses.findIndex(e => e.id === expense.id);
    
    if (index >= 0) {
      expenses[index] = expense;
    } else {
      expenses.push(expense);
    }
    
    localStorage.setItem(`${this.storagePrefix}expenses`, JSON.stringify(expenses));
  }
  
  // Material Management
  createMaterial(materialData: Omit<Material, 'id'>): Material {
    const material: Material = {
      ...materialData,
      id: `mat-${Date.now()}`
    };
    
    this.saveMaterial(material);
    console.log('Material created:', material);
    return material;
  }
  
  getAllMaterials(): Material[] {
    const data = localStorage.getItem(`${this.storagePrefix}materials`);
    return data ? JSON.parse(data) : this.getDefaultMaterials();
  }
  
  saveMaterial(material: Material): void {
    const materials = this.getAllMaterials();
    const index = materials.findIndex(m => m.id === material.id);
    
    if (index >= 0) {
      materials[index] = material;
    } else {
      materials.push(material);
    }
    
    localStorage.setItem(`${this.storagePrefix}materials`, JSON.stringify(materials));
  }
  
  // Time Entry Management
  createTimeEntry(timeData: Omit<TimeEntry, 'id'>): TimeEntry {
    const timeEntry: TimeEntry = {
      ...timeData,
      id: `time-${Date.now()}`
    };
    
    this.saveTimeEntry(timeEntry);
    console.log('Time entry created:', timeEntry);
    return timeEntry;
  }
  
  getAllTimeEntries(): TimeEntry[] {
    const data = localStorage.getItem(`${this.storagePrefix}timeEntries`);
    return data ? JSON.parse(data) : this.getDefaultTimeEntries();
  }
  
  saveTimeEntry(timeEntry: TimeEntry): void {
    const timeEntries = this.getAllTimeEntries();
    const index = timeEntries.findIndex(t => t.id === timeEntry.id);
    
    if (index >= 0) {
      timeEntries[index] = timeEntry;
    } else {
      timeEntries.push(timeEntry);
    }
    
    localStorage.setItem(`${this.storagePrefix}timeEntries`, JSON.stringify(timeEntries));
  }
  
  // Job Management
  createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Job {
    const job: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.saveJob(job);
    console.log('Job created:', job);
    return job;
  }
  
  updateJob(id: string, updates: Partial<Job>): Job | null {
    const job = this.getJob(id);
    if (!job) return null;
    
    const updatedJob = {
      ...job,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveJob(updatedJob);
    console.log('Job updated:', updatedJob);
    return updatedJob;
  }
  
  getJob(id: string): Job | null {
    const jobs = this.getAllJobs();
    return jobs.find(j => j.id === id) || null;
  }
  
  getAllJobs(): Job[] {
    const data = localStorage.getItem(`${this.storagePrefix}jobs`);
    return data ? JSON.parse(data) : this.getDefaultJobs();
  }
  
  saveJob(job: Job): void {
    const jobs = this.getAllJobs();
    const index = jobs.findIndex(j => j.id === job.id);
    
    if (index >= 0) {
      jobs[index] = job;
    } else {
      jobs.push(job);
    }
    
    localStorage.setItem(`${this.storagePrefix}jobs`, JSON.stringify(jobs));
  }
  
  // Invoice Management
  createInvoice(invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Invoice {
    const invoice: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.saveInvoice(invoice);
    console.log('Invoice created:', invoice);
    return invoice;
  }
  
  updateInvoice(id: string, updates: Partial<Invoice>): Invoice | null {
    const invoice = this.getInvoice(id);
    if (!invoice) return null;
    
    const updatedInvoice = {
      ...invoice,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveInvoice(updatedInvoice);
    console.log('Invoice updated:', updatedInvoice);
    return updatedInvoice;
  }
  
  getInvoice(id: string): Invoice | null {
    const invoices = this.getAllInvoices();
    return invoices.find(i => i.id === id) || null;
  }
  
  getAllInvoices(): Invoice[] {
    const data = localStorage.getItem(`${this.storagePrefix}invoices`);
    return data ? JSON.parse(data) : this.getDefaultInvoices();
  }
  
  saveInvoice(invoice: Invoice): void {
    const invoices = this.getAllInvoices();
    const index = invoices.findIndex(i => i.id === invoice.id);
    
    if (index >= 0) {
      invoices[index] = invoice;
    } else {
      invoices.push(invoice);
    }
    
    localStorage.setItem(`${this.storagePrefix}invoices`, JSON.stringify(invoices));
  }
  
  // Analytics and Reporting
  getBusinessMetrics() {
    const customers = this.getAllCustomers();
    const jobs = this.getAllJobs();
    const invoices = this.getAllInvoices();
    const employees = this.getAllEmployees();
    const expenses = this.getAllExpenses();
    
    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const pendingRevenue = invoices
      .filter(inv => inv.status === 'sent')
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const totalExpenses = expenses
      .filter(exp => exp.status === 'approved')
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const activeJobs = jobs.filter(job => job.status === 'in-progress').length;
    const completedJobs = jobs.filter(job => job.status === 'completed').length;
    
    return {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === 'active').length,
      totalJobs: jobs.length,
      activeJobs,
      completedJobs,
      totalInvoices: invoices.length,
      totalRevenue,
      pendingRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      activeEmployees: employees.filter(e => e.status === 'active').length,
      averageJobValue: jobs.length > 0 ? jobs.reduce((sum, job) => sum + job.estimatedCost, 0) / jobs.length : 0
    };
  }
  
  // Default data for demo purposes
  private getDefaultCustomers(): Customer[] {
    return [
      {
        id: 'cust-1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        address: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        customerType: 'residential',
        paymentTerms: '30',
        creditLimit: 10000,
        taxExempt: false,
        preferredContactMethod: 'email',
        notes: 'Regular customer, always pays on time',
        emergencyContact: {
          name: 'Jane Smith',
          phone: '(555) 123-4568',
          relationship: 'Spouse'
        },
        serviceHistory: [],
        totalRevenue: 15000,
        lastServiceDate: '2024-12-01',
        status: 'active',
        createdAt: '2024-01-15T08:00:00Z',
        updatedAt: '2024-12-16T10:30:00Z'
      },
      {
        id: 'cust-2',
        name: 'ABC Construction Inc.',
        email: 'billing@abcconstruction.com',
        phone: '(555) 987-6543',
        address: '456 Business Avenue',
        city: 'Commerce City',
        state: 'CA',
        zipCode: '67890',
        customerType: 'commercial',
        paymentTerms: '60',
        creditLimit: 50000,
        taxExempt: true,
        preferredContactMethod: 'phone',
        notes: 'Large commercial client, multiple ongoing projects',
        emergencyContact: {
          name: 'Bob Wilson',
          phone: '(555) 987-6544',
          relationship: 'Project Manager'
        },
        serviceHistory: [],
        totalRevenue: 125000,
        lastServiceDate: '2024-12-10',
        status: 'active',
        createdAt: '2024-02-01T09:00:00Z',
        updatedAt: '2024-12-16T14:20:00Z'
      }
    ];
  }
  
  private getDefaultEmployees(): Employee[] {
    return [
      {
        id: 'emp-1',
        name: 'Mike Johnson',
        email: 'mike@company.com',
        phone: '(555) 234-5678',
        role: 'Lead Technician',
        department: 'Field Operations',
        hourlyRate: 35,
        skills: ['Plumbing', 'Electrical', 'HVAC'],
        certifications: ['EPA 608', 'OSHA 10'],
        status: 'active',
        startDate: '2023-01-15',
        emergencyContact: {
          name: 'Sarah Johnson',
          phone: '(555) 234-5679',
          relationship: 'Spouse'
        },
        availability: {
          monday: { start: '08:00', end: '17:00', available: true },
          tuesday: { start: '08:00', end: '17:00', available: true },
          wednesday: { start: '08:00', end: '17:00', available: true },
          thursday: { start: '08:00', end: '17:00', available: true },
          friday: { start: '08:00', end: '17:00', available: true },
          saturday: { start: '09:00', end: '15:00', available: true },
          sunday: { start: '00:00', end: '00:00', available: false }
        }
      }
    ];
  }
  
  private getDefaultExpenses(): Expense[] {
    return [
      {
        id: 'exp-1',
        description: 'Vehicle Fuel',
        amount: 75.50,
        category: 'Transportation',
        jobId: 'job-1',
        employeeId: 'emp-1',
        employeeName: 'Mike Johnson',
        date: '2024-12-16',
        status: 'pending',
        notes: 'Gas for service calls',
        isReimbursable: true,
        createdAt: '2024-12-16T08:00:00Z',
        updatedAt: '2024-12-16T08:00:00Z'
      }
    ];
  }
  
  private getDefaultMaterials(): Material[] {
    return [
      {
        id: 'mat-1',
        name: 'PVC Pipe 1/2"',
        description: '1/2 inch PVC pipe for plumbing',
        sku: 'PVC-050-10',
        category: 'Plumbing',
        supplier: 'Home Depot',
        cost: 2.50,
        sellingPrice: 4.00,
        quantityInStock: 50,
        reorderPoint: 10,
        unit: 'feet',
        location: 'Warehouse A-1',
        lastOrderDate: '2024-12-01'
      }
    ];
  }
  
  private getDefaultTimeEntries(): TimeEntry[] {
    return [
      {
        id: 'time-1',
        employeeId: 'emp-1',
        employeeName: 'Mike Johnson',
        jobId: 'job-1',
        jobTitle: 'Kitchen Renovation',
        startTime: '2024-12-16T08:00:00Z',
        endTime: '2024-12-16T12:00:00Z',
        breakTime: 30,
        totalHours: 3.5,
        description: 'Kitchen renovation work - plumbing installation',
        status: 'completed'
      }
    ];
  }
  
  private getDefaultJobs(): Job[] {
    return [
      {
        id: 'job-1',
        title: 'Kitchen Renovation',
        description: 'Complete kitchen remodel including cabinets, countertops, and appliances',
        customerId: 'cust-1',
        customerName: 'John Smith',
        jobType: 'Residential Construction',
        priority: 'high',
        status: 'in-progress',
        startDate: '2024-12-16',
        endDate: '2024-12-30',
        estimatedHours: 120,
        actualHours: 45,
        assignedTeam: ['John Smith - Foreman', 'Mike Johnson - Electrician'],
        materials: [
          { id: '1', name: 'Kitchen Cabinets', quantity: 1, cost: 5000 },
          { id: '2', name: 'Granite Countertops', quantity: 1, cost: 3000 }
        ],
        address: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        estimatedCost: 15000,
        actualCost: 8500,
        notes: 'Customer requested premium finishes',
        safetyRequirements: ['Hard Hat Required', 'Safety Glasses Required'],
        qualityChecks: ['Material Inspection', 'Final Walkthrough'],
        customerInstructions: 'Work hours: 8 AM - 5 PM, no weekends',
        permitRequired: true,
        permitNumber: 'PERM-2024-001',
        createdAt: '2024-12-01T08:00:00Z',
        updatedAt: '2024-12-16T10:30:00Z'
      }
    ];
  }
  
  private getDefaultInvoices(): Invoice[] {
    return [
      {
        id: 'inv-1',
        invoiceNumber: 'INV-2024-001',
        customerId: 'cust-1',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        jobId: 'job-1',
        issueDate: '2024-12-16',
        dueDate: '2025-01-15',
        status: 'sent',
        lineItems: [
          {
            id: '1',
            description: 'Kitchen Renovation - Labor',
            quantity: 45,
            rate: 75,
            amount: 3375,
            taxable: true
          },
          {
            id: '2',
            description: 'Kitchen Renovation - Materials',
            quantity: 1,
            rate: 8000,
            amount: 8000,
            taxable: true
          }
        ],
        subtotal: 11375,
        taxRate: 8.5,
        taxAmount: 966.875,
        discountPercent: 0,
        discountAmount: 0,
        total: 12341.88,
        notes: 'Thank you for your business!',
        terms: 'Payment due within 30 days',
        paymentMethod: 'check',
        paidAmount: 0,
        createdAt: '2024-12-16T08:00:00Z',
        updatedAt: '2024-12-16T08:00:00Z'
      }
    ];
  }
}

// Export singleton instance
export const businessDataManager = new BusinessDataManager();
