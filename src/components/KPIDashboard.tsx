
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Clock, 
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  Download
} from "lucide-react";

const kpiMetrics = [
  {
    name: 'Revenue Growth',
    value: 15.2,
    target: 12,
    unit: '%',
    trend: 'up',
    status: 'good',
    description: 'Monthly revenue growth rate'
  },
  {
    name: 'Customer Satisfaction',
    value: 4.7,
    target: 4.5,
    unit: '/5',
    trend: 'up',
    status: 'good',
    description: 'Average customer rating'
  },
  {
    name: 'Project Completion Rate',
    value: 89,
    target: 85,
    unit: '%',
    trend: 'up',
    status: 'good',
    description: 'On-time project delivery'
  },
  {
    name: 'Lead Conversion Rate',
    value: 32,
    target: 35,
    unit: '%',
    trend: 'down',
    status: 'warning',
    description: 'Leads converted to customers'
  },
  {
    name: 'Average Project Value',
    value: 14250,
    target: 15000,
    unit: '$',
    trend: 'down',
    status: 'warning',
    description: 'Mean project contract value'
  },
  {
    name: 'Team Efficiency',
    value: 92,
    target: 90,
    unit: '%',
    trend: 'up',
    status: 'good',
    description: 'Resource utilization rate'
  },
  {
    name: 'Customer Retention',
    value: 84.5,
    target: 80,
    unit: '%',
    trend: 'up',
    status: 'good',
    description: 'Annual customer retention'
  },
  {
    name: 'Profit Margin',
    value: 18.5,
    target: 20,
    unit: '%',
    trend: 'down',
    status: 'critical',
    description: 'Net profit percentage'
  }
];

const departmentKPIs = [
  {
    department: 'Sales',
    metrics: [
      { name: 'Monthly Leads', value: 145, target: 120 },
      { name: 'Conversion Rate', value: 32, target: 35 },
      { name: 'Pipeline Value', value: 485000, target: 450000 }
    ]
  },
  {
    department: 'Operations',
    metrics: [
      { name: 'Projects Completed', value: 28, target: 25 },
      { name: 'On-Time Delivery', value: 89, target: 85 },
      { name: 'Quality Score', value: 4.6, target: 4.5 }
    ]
  },
  {
    department: 'Finance',
    metrics: [
      { name: 'Cash Flow', value: 125000, target: 100000 },
      { name: 'AR Collection', value: 92, target: 90 },
      { name: 'Cost Control', value: 18.5, target: 20 }
    ]
  }
];

export const KPIDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">KPI Dashboard</h2>
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
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export KPIs
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">KPIs on Target</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Need Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">Q2 2024</p>
                <p className="text-sm text-muted-foreground">Current Period</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              {getStatusIcon(kpi.status)}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">
                    {kpi.unit === '$' ? '$' : ''}{kpi.value.toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}
                  </div>
                  <div className={`text-xs flex items-center ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? 
                      <TrendingUp className="h-3 w-3 mr-1" /> : 
                      <TrendingDown className="h-3 w-3 mr-1" />
                    }
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Target: {kpi.unit === '$' ? '$' : ''}{kpi.target.toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}</span>
                    <span className={getStatusColor(kpi.status)}>
                      {((kpi.value / kpi.target) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(kpi.value / kpi.target) * 100} 
                    className="h-2"
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department KPIs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Department Performance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {departmentKPIs.map((dept, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {dept.department === 'Sales' && <DollarSign className="h-5 w-5" />}
                  {dept.department === 'Operations' && <Activity className="h-5 w-5" />}
                  {dept.department === 'Finance' && <TrendingUp className="h-5 w-5" />}
                  {dept.department}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dept.metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm font-bold">
                        {metric.name.includes('Value') || metric.name.includes('Flow') ? '$' : ''}
                        {metric.value.toLocaleString()}
                        {metric.name.includes('Rate') || metric.name.includes('Score') || metric.name.includes('Control') || metric.name.includes('Collection') || metric.name.includes('Delivery') ? 
                          (metric.name.includes('Score') ? '/5' : '%') : ''}
                      </span>
                    </div>
                    <Progress 
                      value={(metric.value / metric.target) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      Target: {metric.name.includes('Value') || metric.name.includes('Flow') ? '$' : ''}
                      {metric.target.toLocaleString()}
                      {metric.name.includes('Rate') || metric.name.includes('Score') || metric.name.includes('Control') || metric.name.includes('Collection') || metric.name.includes('Delivery') ? 
                        (metric.name.includes('Score') ? '/5' : '%') : ''}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
