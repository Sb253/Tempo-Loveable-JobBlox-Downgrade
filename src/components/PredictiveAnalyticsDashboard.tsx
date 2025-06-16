
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Brain, Target, DollarSign, Users, Calendar, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Prediction {
  id: string;
  title: string;
  value: string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
  category: 'revenue' | 'costs' | 'efficiency' | 'risk';
}

const mockPredictions: Prediction[] = [
  {
    id: '1',
    title: 'Q1 Revenue Forecast',
    value: '$125,000',
    confidence: 87,
    trend: 'up',
    insight: 'Based on current pipeline and seasonal trends, expect 15% growth',
    category: 'revenue'
  },
  {
    id: '2',
    title: 'Material Cost Increase',
    value: '+12%',
    confidence: 92,
    trend: 'up',
    insight: 'Steel prices trending upward, recommend bulk purchasing',
    category: 'costs'
  },
  {
    id: '3',
    title: 'Team Efficiency Score',
    value: '94%',
    confidence: 78,
    trend: 'up',
    insight: 'Productivity improvements from new workflow automation',
    category: 'efficiency'
  },
  {
    id: '4',
    title: 'Customer Churn Risk',
    value: '3.2%',
    confidence: 85,
    trend: 'down',
    insight: 'Improved customer satisfaction reducing churn risk',
    category: 'risk'
  }
];

const revenueProjection = [
  { month: 'Jan', actual: 85000, predicted: 88000 },
  { month: 'Feb', actual: 92000, predicted: 95000 },
  { month: 'Mar', actual: 78000, predicted: 85000 },
  { month: 'Apr', actual: null, predicted: 110000 },
  { month: 'May', actual: null, predicted: 125000 },
  { month: 'Jun', actual: null, predicted: 132000 }
];

const costAnalysis = [
  { category: 'Materials', current: 45000, predicted: 50400 },
  { category: 'Labor', current: 32000, predicted: 33600 },
  { category: 'Equipment', current: 8000, predicted: 8800 },
  { category: 'Overhead', current: 12000, predicted: 12600 }
];

const riskFactors = [
  { name: 'Weather Delays', value: 25, color: '#ef4444' },
  { name: 'Supply Chain', value: 35, color: '#f97316' },
  { name: 'Labor Shortage', value: 15, color: '#eab308' },
  { name: 'Other', value: 25, color: '#22c55e' }
];

export const PredictiveAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'revenue': return <DollarSign className="h-4 w-4" />;
      case 'costs': return <TrendingUp className="h-4 w-4" />;
      case 'efficiency': return <Users className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'revenue': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'costs': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'efficiency': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'risk': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6" />
          Predictive Analytics
          <Badge variant="secondary">AI Powered</Badge>
        </h2>
      </div>

      {/* Key Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockPredictions.map((prediction) => (
          <Card key={prediction.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(prediction.category)}
                  <span className="text-sm font-medium">{prediction.title}</span>
                </div>
                {prediction.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : prediction.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : (
                  <div className="h-4 w-4 bg-gray-400 rounded-full" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold">{prediction.value}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Confidence</span>
                    <span className="font-medium">{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
                <Badge className={getCategoryColor(prediction.category)} variant="secondary">
                  {prediction.category}
                </Badge>
                <p className="text-xs text-muted-foreground">{prediction.insight}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Projection Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Projection vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueProjection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`$${value?.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={costAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value?.toLocaleString()}`, '']} />
                <Bar dataKey="current" fill="#3b82f6" name="Current" />
                <Bar dataKey="predicted" fill="#10b981" name="Predicted" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Factor Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskFactors}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                >
                  {riskFactors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {riskFactors.map((factor) => (
                <div key={factor.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: factor.color }} />
                  <span>{factor.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI-Generated Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Revenue Optimization</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Consider raising prices by 5-8% for kitchen renovations based on market analysis and your quality metrics. 
                This could increase quarterly revenue by $18,000.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Cost Management</h4>
              <p className="text-sm text-orange-800 dark:text-orange-200">
                Material costs are trending up. Consider negotiating bulk purchase agreements with suppliers 
                before Q2 to lock in current pricing and save an estimated $5,200.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Efficiency Gains</h4>
              <p className="text-sm text-green-800 dark:text-green-200">
                Your team efficiency has improved 12% this quarter. Implement the new workflow across 
                all teams to potentially complete 3-4 additional jobs per month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
