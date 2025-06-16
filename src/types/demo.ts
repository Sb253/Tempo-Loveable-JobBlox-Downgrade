
export interface DemoConfig {
  enabled: boolean;
  autoLogin: boolean;
  demoUser: {
    id: string;
    email: string;
    name: string;
    role: 'owner' | 'admin' | 'manager' | 'employee';
    permissions: string[];
    status: 'active' | 'pending' | 'suspended';
    lastLogin: string;
    createdAt: string;
  };
}

export const defaultDemoConfig: DemoConfig = {
  enabled: true,
  autoLogin: true,
  demoUser: {
    id: 'demo-owner-001',
    email: 'demo@jobblox.com',
    name: 'Demo Owner',
    role: 'owner',
    permissions: ['*'], // All permissions for demo
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  }
};
