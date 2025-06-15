
import React, { useState, useEffect } from 'react';
import { CustomerAuth } from './CustomerAuth';
import { CustomerPortal } from './CustomerPortal';
import { Button } from "@/components/ui/button";
import { LogOut, Building } from "lucide-react";

export const CustomerPortalLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    // Check if customer is already logged in
    const savedEmail = localStorage.getItem('customerEmail');
    if (savedEmail) {
      setCustomerEmail(savedEmail);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email: string) => {
    setCustomerEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('customerEmail');
    setCustomerEmail('');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <CustomerAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold">Customer Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome, {customerEmail}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomerPortal />
      </main>
    </div>
  );
};
