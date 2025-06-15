
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DollarSign, TrendingUp, Users, Calendar, Target, Download } from "lucide-react";

const customerCLVData = [
  { 
    name: 'John Smith', 
    clv: 45000, 
    totalSpent: 15000, 
    projectCount: 3, 
    avgOrderValue: 5000,
    frequency: 0.8,
    retentionRate: 85,
    segment: 'High Value'
  },
  { 
    name: 'ABC Construction', 
    clv: 120000, 
    totalSpent: 45000, 
    projectCount: 8, 
    avgOrderValue: 5625,
    frequency: 1.2,
    retentionRate: 95,
    segment: 'Premium'
  },
  { 
    name: 'Sarah Johnson', 
    clv: 25000, 
    totalSpent: 8000, 
    projectCount: 2, 
    avgOrderValue: 4000,
    frequency: 0.5,
    retentionRate: 70,
    segment: 'Standard'
  },
  { 
    name: 'Mike Wilson', 
    clv: 65000, 
    totalSpent: 22000, 
    projectCount: 5, 
    avgOrderValue: 4400,
    frequency: 0.9,
    retentionRate: 88,
    segment: 'High Value'
  }
];

const segmentData = [
  { name: 'Premium', value: 15, revenue: 1800000, color: '#8884d8' },
  { name: 'High Value', value: 35, revenue: 2100000, color: '#82ca9d' },
  { name: 'Standard', value: 40, revenue: 800000, color: '#ffc658' },
  { name: 'Low Value', value: 10, revenue: 200000, color: '#ff7300' }
];

const clvTrendData = [
  { month: 'Jan', avgCLV: 38000, newCustomers: 12 },
  { month: 'Feb', avgCLV: 42000, newCustomers: 15 },
  { month: 'Mar', avgCLV: 45000, newCustomers: 18 },
  { month: 'Apr', avgCLV: 48000, newCustomers: 22 },
  { month: 'May', avgCLV: 52000, newCustomers: 25 },
  { month: 'Jun', avgCLV: 55000, newCustomers: 20 }
];

export const CustomerLifetimeValue = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [timeRange, setTimeRange] = useState('12months');

  const totalCLV = customerCLVData.reduce((sum, customer) => sum + customer.clv, 0);
  const avgCLV = totalCLV / customerCLVData.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Lifetime Value Analytics</h2>
        <div className="flex gap-4">
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="high">High Value</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="24months">24 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CLV Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CLV</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgCLV.toLocaleString()}</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.2% from last year
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCLV.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Projected lifetime revenue
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Value Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <div className="text-xs text-blue-600">
              32% of customer base
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.5%</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.8% improvement
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customer CLV</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Customer CLV Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerCLVData.map((customer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{customer.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          customer.segment === 'Premium' ? 'bg-purple-100 text-purple-800' :
                          customer.segment === 'High Value' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.segment}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${customer.clv.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Lifetime Value</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Spent:</span>
                        <div className="font-medium">${customer.totalSpent.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Projects:</span>
                        <div className="font-medium">{customer.projectCount}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Order:</span>
                        <div className="font-medium">${customer.avgOrderValue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Frequency:</span>
                        <div className="font-medium">{customer.frequency}/year</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Retention:</span>
                        <div className="font-medium">{customer.retentionRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} (${value}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={segmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CLV Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={clvTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="avgCLV" 
                    stroke="#8884d8" 
                    name="Average CLV" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="newCustomers" 
                    stroke="#82ca9d" 
                    name="New Customers" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
