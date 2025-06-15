
import { useState, useEffect } from 'react';

export type UserRole = 'owner' | 'admin' | 'manager' | 'employee';

interface RolePermissions {
  canManageCompany: boolean;
  canManageUsers: boolean;
  canManageFinancials: boolean;
  canManageIntegrations: boolean;
  canManageProjects: boolean;
  canManageScheduling: boolean;
  canViewReports: boolean;
  canManageInventory: boolean;
  canManageVehicles: boolean;
  canManagePayroll: boolean;
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  owner: {
    canManageCompany: true,
    canManageUsers: true,
    canManageFinancials: true,
    canManageIntegrations: true,
    canManageProjects: true,
    canManageScheduling: true,
    canViewReports: true,
    canManageInventory: true,
    canManageVehicles: true,
    canManagePayroll: true,
  },
  admin: {
    canManageCompany: true,
    canManageUsers: true,
    canManageFinancials: true,
    canManageIntegrations: true,
    canManageProjects: true,
    canManageScheduling: true,
    canViewReports: true,
    canManageInventory: true,
    canManageVehicles: true,
    canManagePayroll: false,
  },
  manager: {
    canManageCompany: false,
    canManageUsers: false,
    canManageFinancials: false,
    canManageIntegrations: false,
    canManageProjects: true,
    canManageScheduling: true,
    canViewReports: true,
    canManageInventory: true,
    canManageVehicles: false,
    canManagePayroll: false,
  },
  employee: {
    canManageCompany: false,
    canManageUsers: false,
    canManageFinancials: false,
    canManageIntegrations: false,
    canManageProjects: false,
    canManageScheduling: false,
    canViewReports: false,
    canManageInventory: false,
    canManageVehicles: false,
    canManagePayroll: false,
  },
};

export const useRolePermissions = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('owner'); // Default to owner for demo

  const permissions = rolePermissions[currentRole];

  const changeRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('userRole', role);
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole && Object.keys(rolePermissions).includes(savedRole)) {
      setCurrentRole(savedRole);
    }
  }, []);

  return {
    currentRole,
    permissions,
    changeRole,
  };
};
