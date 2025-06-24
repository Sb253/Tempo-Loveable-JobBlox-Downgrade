
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, DollarSign, BarChart3, Calendar, TrendingUp, Wrench } from "lucide-react";
import { MermaidDiagram } from '../iPaas/MermaidDiagram';

export const Dashboard = () => {
  // Sample workflow diagram for business processes
  const workflowDiagram = `
    graph TD
      A[New Customer] --> B[Initial Consultation]
      B --> C[Quote Generation]
      C --> D[Job Scheduling]
      D --> E[Work Completion]
      E --> F[Invoice Generation]
      F --> G[Payment Processing]
      
      H[Inventory Check] --> I[Materials Ordering]
      I --> J[Delivery Tracking]
      J --> D
      
      K[Quality Control] --> L[Customer Approval]
      L --> M[Final Documentation]
      M --> F
  `;

  const stats = [
    { label: 'Active Jobs', value: '12', icon: Wrench, color: 'text-blue-600' },
    { label: 'Monthly Revenue', value: '$45,230', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Customers', value: '87', icon: Users, color: 'text-purple-600' },
    { label: 'Growth Rate', value: '+18%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Business Stats */}
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

      {/* Business Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Business Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Monthly Target</h3>
                <p className="text-sm text-muted-foreground">$50,000 goal</p>
              </div>
              <Badge variant="default">90% Complete</Badge>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>$45,230 / $50,000</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Process Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
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
              { action: 'New job scheduled', time: '2 hours ago', type: 'success' },
              { action: 'Invoice #1234 paid', time: '4 hours ago', type: 'success' },
              { action: 'Customer consultation booked', time: '1 day ago', type: 'info' },
              { action: 'Inventory low alert', time: '2 days ago', type: 'warning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-yellow-500' : 
                    activity.type === 'info' ? 'bg-blue-500' : 'bg-red-500'
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
