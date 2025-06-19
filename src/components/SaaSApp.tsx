
import React, { useState } from 'react';
import { MultiTenantAuth } from './auth/MultiTenantAuth';
import { MultiTenantLayout } from './layout/MultiTenantLayout';
import { WorkflowAutomation } from './WorkflowAutomation';

export const SaaSApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'tenant' | 'trial' | null>(null);

  const handleLogin = (type: 'admin' | 'tenant' | 'trial') => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <MultiTenantAuth onLogin={handleLogin} />;
  }

  return (
    <div>
      <MultiTenantLayout />
      {/* Include iPaaS functionality */}
      <div className="hidden">
        <WorkflowAutomation />
      </div>
    </div>
  );
};
