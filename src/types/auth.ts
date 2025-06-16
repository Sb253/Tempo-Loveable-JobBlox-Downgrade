
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'manager' | 'employee';
  permissions: string[];
  status: 'active' | 'pending' | 'suspended';
  lastLogin?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface InvitationData {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  permissions: string[];
  token: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired';
  invitedBy: string;
  invitedAt: string;
  acceptedAt?: string;
}

export interface EmployeeProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: [number, number];
  skills: string[];
  availability: 'available' | 'busy' | 'offline';
  workload: number;
  role: 'admin' | 'manager' | 'employee';
  permissions: string[];
  hasPassword: boolean;
  canChangePassword: boolean;
  lastLogin?: string;
  invitationStatus: 'pending' | 'accepted' | 'none';
}
