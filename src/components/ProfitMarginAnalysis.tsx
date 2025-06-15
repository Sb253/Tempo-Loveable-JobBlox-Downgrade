
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart3 } from "lucide-react";

interface ProjectData {
  id: string;
  name: string;
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
  status: 'completed' | 'in-progress' | 'planned';
}

const mockProjects: ProjectData[] = [
  {
    id: '1',
    name: 'Kitchen Renovation',
    revenue: 15000,
    costs: 9500,
    profit: 5500,
    margin: 36.67,
    status: 'completed'
  },
  {
    id: '2',
    name: 'Bathroom Remodel',
    revenue: 8500,
    costs: 5200,
    profit: 3300,
    margin: 38.82,
    status: 'in-progress'
  },
  {
    id: '3',
    name: 'Deck Installation',
    revenue: 12000,
    costs: 7800,
    profit: 4200,
    margin: 35.00,
    status: 'completed'
  }
];

export const ProfitMarginAnalysis = () => {
  const [selectedProject, setSelectedProject] = useState('all');
  const [timeFrame, setTimeFrame] = useState('last-3-months');

  const filteredProjects = selectedProject === 'all' 
    ? mockProjects 
    : mockProjects.filter(p => p.id === selectedProject);

  const totalRevenue = filteredProjects.reduce((sum, project) => sum + project.revenue, 0);
  const totalCosts = filteredProjects.reduce((sum, project) => sum + project.costs, 0);
  const totalProfit = totalRevenue - totalCosts;
  const averageMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const getMarginColor = (margin: number) => {
    if (margin >= 40) return 'text-green-600';
    if (margin >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMarginIcon = (margin: number) => {
    if (margin >= 25) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profit Margin Analysis</h2>
        <div className="flex gap-4">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {mockProjects.map(project => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCosts.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Margin</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMarginColor(averageMargin)}`}>
              {averageMargin.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Project Profitability Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <span className={`text-sm px-2 py-1 rounded ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getMarginIcon(project.margin)}
                    <span className={`font-bold ${getMarginColor(project.margin)}`}>
                      {project.margin.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Revenue</span>
                    <div className="font-semibold">${project.revenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Costs</span>
                    <div className="font-semibold">${project.costs.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Profit</span>
                    <div className="font-semibold text-green-600">${project.profit.toLocaleString()}</div>
                  </div>
                </div>

                {/* Visual margin bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        project.margin >= 40 ? 'bg-green-500' :
                        project.margin >= 25 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(project.margin, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Improvement Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">Cost Optimization</h4>
              <p className="text-sm text-blue-700">
                Review material costs for projects with margins below 25%. Consider bulk purchasing or alternative suppliers.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Pricing Strategy</h4>
              <p className="text-sm text-green-700">
                Projects with 40%+ margins indicate strong market positioning. Consider applying similar pricing models to other projects.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Time Management</h4>
              <p className="text-sm text-yellow-700">
                Track labor hours more precisely to identify projects where time overruns are affecting profitability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
