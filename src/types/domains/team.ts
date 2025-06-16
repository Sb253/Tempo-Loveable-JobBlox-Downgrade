
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'admin' | 'manager' | 'employee';
  department: string;
  hourlyRate: number;
  status: 'active' | 'inactive' | 'on-leave';
  permissions: string[];
  location?: {
    coordinates: [number, number];
    status: 'active' | 'break' | 'inactive';
    lastUpdated: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'available' | 'busy' | 'offline';
}
