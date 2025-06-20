
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Code, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  Wrench,
  Play
} from "lucide-react";

export const DeveloperLoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (userType: 'admin' | 'tenant' | 'trial') => {
    // Store the user type for the SaaS app
    sessionStorage.setItem('devUserType', userType);
    navigate('/saas');
  };

  const quickAccess = [
    {
      type: 'admin' as const,
      title: 'Admin Dashboard',
      description: 'Full system administration and tenant management',
      icon: Shield,
      color: 'from-red-600 to-pink-600',
      features: ['Tenant Management', 'System Settings', 'Analytics', 'User Administration']
    },
    {
      type: 'tenant' as const,
      title: 'Tenant Portal',
      description: 'Business management and client operations',
      icon: Building2,
      color: 'from-blue-600 to-cyan-600',
      features: ['Client Management', 'Subscription Billing', 'Business Analytics', 'Team Management']
    },
    {
      type: 'trial' as const,
      title: 'Trial Experience',
      description: '14-day trial with full feature access',
      icon: Clock,
      color: 'from-green-600 to-emerald-600',
      features: ['Limited Clients', 'Full Features', 'Trial Analytics', 'Conversion Tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-600/20 text-orange-400 border-orange-600/30">
              <Wrench className="h-3 w-3 mr-1" />
              Development Environment
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Developer
              <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Quick Access
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Bypass authentication for development and testing. 
              Choose your role to explore the platform capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={() => navigate('/')}
              >
                ← Back to Landing
              </Button>
              
              <Button 
                variant="outline"
                className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                onClick={() => navigate('/auth')}
              >
                Production Login
              </Button>

              <Button 
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
                onClick={() => navigate('/legacy')}
              >
                Legacy System
              </Button>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {quickAccess.map((access) => (
              <Card key={access.type} className="bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${access.color} flex items-center justify-center mb-4`}>
                    <access.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{access.title}</CardTitle>
                  <p className="text-slate-400">{access.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-300">Key Features:</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {access.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-slate-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${access.color} hover:opacity-90 text-white`}
                    onClick={() => handleLogin(access.type)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Launch {access.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Development Info */}
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-400" />
                Development Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-2">System Architecture</h4>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• Multi-tenant SaaS architecture</li>
                    <li>• React + TypeScript frontend</li>
                    <li>• Supabase backend integration</li>
                    <li>• Real-time subscription management</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Demo Capabilities</h4>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• Full multi-tenant simulation</li>
                    <li>• Subscription lifecycle management</li>
                    <li>• Client onboarding workflows</li>
                    <li>• Real-time analytics dashboard</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                <p className="text-yellow-300 text-sm">
                  <strong>Note:</strong> This is a development environment with authentication bypass. 
                  In production, users would go through proper authentication flows.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
