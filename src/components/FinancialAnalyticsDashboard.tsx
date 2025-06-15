
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Calculator,
  Target,
  AlertCircle,
  Download,
  Filter,
  Calendar
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 145000, expenses: 98000, profit: 47000, projects: 12 },
  { month: 'Feb', revenue: 152000, expenses: 105000, profit: 47000, projects: 15 },
  { month: 'Mar', revenue: 148000, expenses: 102000, profit: 46000, projects: 14 },
  { month: 'Apr', revenue: 161000, expenses: 110000, profit: 51000, projects: 18 },
  { month: 'May', revenue: 158000, expenses: 108000, profit: 50000, projects: 16 },
  { month: 'Jun', revenue: 167000, expenses: 112000, profit: 55000, projects: 20 }
];

const expenseBreakdown = [
  { category: 'Labor', amount: 45000, percentage: 40, color: '#8884d8' },
  { category: 'Materials', amount: 33750, percentage: 30, color: '#82ca9d' },
  { category: 'Equipment', amount: 11250, percentage: 10, color: '#ffc658' },
  { category: 'Transportation', amount: 11250, percentage: 10, color: '#ff7300' },
  { category: 'Other', amount: 11250, percentage: 10, color: '#0088fe' }
];

const profitabilityByProject = [
  { project: 'Kitchen Renovation A', revenue: 25000, cost: 18000, profit: 7000, margin: 28 },
  { project: 'Bathroom Remodel B', revenue: 18000, cost: 12500, profit: 5500, margin: 30.6 },
  { project: 'Office Building C', revenue: 45000, cost: 32000, profit: 13000, margin: 28.9 },
  { project: 'Residential Repair D', revenue: 8500, cost: 6200, profit: 2300, margin: 27.1 }
];

const cashFlowData = [
  { week: 'Week 1', inflow: 25000, outflow: 18000, net: 7000 },
  { week: 'Week 2', inflow: 32000, outflow: 22000, net: 10000 },
  { week: 'Week 3', inflow: 28000, outflow: 25000, net: 3000 },
  { week: 'Week 4', inflow: 35000, outflow: 20000, net: 15000 }
];

const kpiTargets = [
  { metric: 'Gross Profit Margin', current: 33.5, target: 35, status: 'below' },
  { metric: 'Net Profit Margin', current: 28.2, target: 25, status: 'above' },
  { metric: 'Revenue Growth', current: 12.8, target: 15, status: 'below' },
  { metric: 'Project Completion Rate', current: 94.2, target: 90, status: 'above' }
];

export const FinancialAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last6months');
  const [selectedView, setSelectedView] = useState('overview');

  const currentMonth = revenueData[revenueData.length - 1];
  const previousMonth = revenueData[revenueData.length - 2];
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const profitChange = ((currentMonth.profit - previousMonth.profit) / previousMonth.profit * 100).toFixed(1);

  const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Financial Analytics Dashboard</h2>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className={`text-xs flex items-center ${Number(revenueChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Number(revenueChange) >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {revenueChange}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</div>
            <div className={`text-xs flex items-center ${Number(profitChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Number(profitChange) >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {profitChange}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin}%</div>
            <div className="text-xs text-muted-foreground">
              Industry avg: 15-20%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {((totalExpenses / totalRevenue) * 100).toFixed(1)}% of revenue
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Profit Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={3} name="Profit" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Profitability Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profitabilityByProject.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">{project.project}</h4>
                      <Badge className={project.margin >= 25 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {project.margin.toFixed(1)}% margin
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <div className="font-semibold">${project.revenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <div className="font-semibold">${project.cost.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Profit:</span>
                        <div className="font-semibold text-green-600">${project.profit.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${project.margin >= 30 ? 'bg-green-500' : project.margin >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(project.margin * 2, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expense Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Area type="monotone" dataKey="expenses" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenseBreakdown.map((expense, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: expense.color }}
                        />
                        <span className="font-medium">{expense.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${expense.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{expense.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Bar dataKey="inflow" fill="#82ca9d" name="Inflow" />
                  <Bar dataKey="outflow" fill="#8884d8" name="Outflow" />
                  <Bar dataKey="net" fill="#ffc658" name="Net" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpiTargets.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.metric}</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold">{kpi.current}%</div>
                    <Badge className={kpi.status === 'above' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {kpi.status === 'above' ? 'Above Target' : 'Below Target'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Target: {kpi.target}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${kpi.status === 'above' ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
