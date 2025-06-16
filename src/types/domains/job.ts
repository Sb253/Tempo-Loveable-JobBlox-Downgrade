
export interface Job {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  location: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedDuration: number; // in hours
  actualDuration?: number;
  assignedTo: string[];
  startDate: string;
  endDate?: string;
  materials: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormData {
  title: string;
  description: string;
  customerId: string;
  location: string;
  coordinates?: [number, number];
  priority: Job['priority'];
  estimatedDuration: number;
  assignedTo: string[];
  startDate: string;
  materials: string[];
  notes?: string;
}
