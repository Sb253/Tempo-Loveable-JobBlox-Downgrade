
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, Lock, User, Clock, CreditCard } from "lucide-react";

interface AuthProps {
  onLogin: (userType: 'admin' | 'tenant' | 'trial') => void;
}

export const MultiTenantAuth = ({ onLogin }: AuthProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login:', formData);
    onLogin('admin');
  };

  const handleTenantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tenant login:', formData);
    onLogin('tenant');
  };

  const handleTrialSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trial signup:', formData);
    onLogin('trial');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Multi-Tenant SaaS Platform</h1>
          <p className="text-muted-foreground">Choose your access type to continue</p>
        </div>

        <Tabs defaultValue="tenant" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tenant" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Tenant Login
            </TabsTrigger>
            <TabsTrigger value="trial" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Free Trial
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          {/* Tenant Login */}
          <TabsContent value="tenant">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  Tenant Portal Access
                </CardTitle>
                <p className="text-muted-foreground">
                  Sign in to manage your clients and subscription
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTenantLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tenant-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tenant-email"
                        type="email"
                        placeholder="your@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tenant-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tenant-password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Sign In to Tenant Portal
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Don't have an account? <span className="text-blue-600 cursor-pointer">Contact Sales</span></p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Free Trial */}
          <TabsContent value="trial">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="h-6 w-6 text-green-600" />
                  Start Your 14-Day Free Trial
                </CardTitle>
                <p className="text-muted-foreground">
                  Full access to all features, no credit card required
                </p>
                <Badge className="bg-green-100 text-green-800 w-fit mx-auto">
                  14 Days Free • No Commitment
                </Badge>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrialSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trial-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="trial-name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="trial-company">Company Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="trial-company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trial-email">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="trial-email"
                        type="email"
                        placeholder="you@yourcompany.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trial-password">Create Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="trial-password"
                        type="password"
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    <Clock className="h-4 w-4 mr-2" />
                    Start Free Trial
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">What's included:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✓ Up to 10 clients</li>
                      <li>✓ All premium features</li>
                      <li>✓ 24/7 support chat</li>
                      <li>✓ Easy upgrade path</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Login */}
          <TabsContent value="admin">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <User className="h-6 w-6 text-red-600" />
                  System Administrator
                </CardTitle>
                <p className="text-muted-foreground">
                  Platform management and oversight
                </p>
                <Badge variant="destructive" className="w-fit mx-auto">
                  Admin Access Only
                </Badge>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@platform.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Enter admin password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" variant="destructive" className="w-full">
                    Admin Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
