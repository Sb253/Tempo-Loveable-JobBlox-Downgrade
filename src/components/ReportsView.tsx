
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, DollarSign, TrendingUp, Users } from "lucide-react";

const revenueData = [
  { month: 'Jan', revenue: 45000, projects: 12 },
  { month: 'Feb', revenue: 52000, projects: 15 },
  { month: 'Mar', revenue: 48000, projects: 13 },
  { month: 'Apr', revenue: 61000, projects: 18 },
  { month: 'May', revenue: 55000, projects: 16 },
  { month: 'Jun', revenue: 67000, projects: 20 }
];

const projectsByType = [
  { name: 'Kitchen Renovation', value: 35, color: '#8884d8' },
  { name: 'Bathroom Remodel', value: 25, color: '#82ca9d' },
  { name: 'Roofing', value: 20, color: '#ffc658' },
  { name: 'Flooring', value: 15, color: '#ff7c7c' },
  { name: 'Other', value: 5, color: '#8dd1e1' }
];

export const ReportsView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('revenue');

  const renderChart = () => {
    switch (selectedReport) {
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'projects':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Projects']} />
              <Line type="monotone" dataKey="projects" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'distribution':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {projectsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">$328,000</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">99</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">18.5%</p>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Active Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Selection */}
      <div className="flex gap-2">
        <Button 
          variant={selectedReport === 'revenue' ? 'default' : 'outline'}
          onClick={() => setSelectedReport('revenue')}
        >
          Revenue Trends
        </Button>
        <Button 
          variant={selectedReport === 'projects' ? 'default' : 'outline'}
          onClick={() => setSelectedReport('projects')}
        >
          Project Volume
        </Button>
        <Button 
          variant={selectedReport === 'distribution' ? 'default' : 'outline'}
          onClick={() => setSelectedReport('distribution')}
        >
          Project Distribution
        </Button>
      </div>

      {/* Chart Display */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedReport === 'revenue' && 'Revenue Analysis'}
            {selectedReport === 'projects' && 'Project Volume Trends'}
            {selectedReport === 'distribution' && 'Project Type Distribution'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Smith Kitchen Renovation', value: '$45,000', profit: '+22%' },
                { name: 'Johnson Bathroom Remodel', value: '$28,000', profit: '+18%' },
                { name: 'Wilson Deck Installation', value: '$35,000', profit: '+25%' }
              ].map((project, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.value}</p>
                  </div>
                  <div className="text-green-600 font-medium">{project.profit}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Project completed', detail: 'Kitchen Renovation - Smith', time: '2 hours ago' },
                { action: 'Invoice sent', detail: 'Invoice #INV-001 to Johnson', time: '4 hours ago' },
                { action: 'Estimate approved', detail: 'Bathroom remodel estimate', time: '1 day ago' }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-start p-3 border rounded">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
