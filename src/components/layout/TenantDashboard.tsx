
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, CreditCard, BarChart3, Calendar, TrendingUp, Globe } from "lucide-react";
import { MermaidDiagram } from '../iPaas/MermaidDiagram';

interface TenantDashboardProps {
  tenant: {
    id: string;
    name: string;
    plan: string;
    status: string;
    clientCount: number;
    subscriptionEnd?: string;
    trialEnd?: string;
  };
}

export const TenantDashboard = ({ tenant }: TenantDashboardProps) => {
  // Sample workflow diagram for demonstration
  const workflowDiagram = `
    graph TD
      A[Client Onboarding] --> B[Account Setup]
      B --> C[Subscription Activation]
      C --> D[Service Provisioning]
      D --> E[Client Portal Access]
      E --> F[Ongoing Support]
      
      G[Trial Signup] --> H[14-Day Trial]
      H --> I{Convert?}
      I -->|Yes| C
      I -->|No| J[Trial Expiry]
      
      K[Payment Processing] --> L[Stripe Integration]
      L --> M[Subscription Management]
      M --> N[Billing Automation]
  `;

  const stats = [
    { label: 'Active Clients', value: tenant.clientCount, icon: Users, color: 'text-blue-600' },
    { label: 'Monthly Revenue', value: '$2,450', icon: CreditCard, color: 'text-green-600' },
    { label: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Support Tickets', value: '8', icon: BarChart3, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Tenant Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Current Plan</h3>
                <p className="text-sm text-muted-foreground">
                  {tenant.plan.charAt(0).toUpperCase() + tenant.plan.slice(1)} Plan
                </p>
              </div>
              <Badge variant={tenant.status === 'active' ? 'default' : 'secondary'}>
                {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
              </Badge>
            </div>
            
            {tenant.subscriptionEnd && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subscription Period</span>
                  <span>Expires: {tenant.subscriptionEnd}</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            )}
            
            {tenant.trialEnd && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800">Trial Period</h4>
                <p className="text-sm text-yellow-700">
                  Trial expires on {tenant.trialEnd}. Upgrade to continue service.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Business Process Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidDiagram chart={workflowDiagram} height="500px" />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New client onboarded', time: '2 hours ago', type: 'success' },
              { action: 'Payment received', time: '1 day ago', type: 'success' },
              { action: 'Support ticket created', time: '2 days ago', type: 'warning' },
              { action: 'Subscription renewed', time: '1 week ago', type: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium">{activity.action}</span>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
