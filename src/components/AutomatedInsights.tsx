
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Brain, 
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const insights = [
  {
    id: 1,
    type: 'opportunity',
    priority: 'high',
    title: 'Revenue Optimization Opportunity',
    description: 'Kitchen renovation projects show 23% higher profit margins than average. Consider focusing marketing efforts on this segment.',
    impact: 'Potential 15% revenue increase',
    action: 'Develop targeted kitchen renovation marketing campaign',
    confidence: 87,
    category: 'Revenue'
  },
  {
    id: 2,
    type: 'warning',
    priority: 'critical',
    title: 'Resource Allocation Alert',
    description: 'Team utilization will exceed 95% next week based on current project schedule. Risk of delays and burnout.',
    impact: 'Potential project delays',
    action: 'Redistribute workload or hire temporary staff',
    confidence: 94,
    category: 'Operations'
  },
  {
    id: 3,
    type: 'trend',
    priority: 'medium',
    title: 'Customer Behavior Pattern',
    description: 'Customers who book follow-up services within 30 days have 3x higher lifetime value.',
    impact: 'CLV increase opportunity',
    action: 'Implement 30-day follow-up automation',
    confidence: 76,
    category: 'Customer'
  },
  {
    id: 4,
    type: 'optimization',
    priority: 'high',
    title: 'Pricing Strategy Insight',
    description: 'Projects quoted on Fridays have 18% lower acceptance rates. Tuesday-Thursday quotes perform best.',
    impact: 'Higher conversion rates',
    action: 'Reschedule quote deliveries to mid-week',
    confidence: 82,
    category: 'Sales'
  }
];

const recommendations = [
  {
    id: 1,
    title: 'Implement Dynamic Pricing',
    description: 'Use demand forecasting to adjust pricing based on seasonal patterns and market conditions.',
    expectedROI: 12,
    timeToImplement: '2-3 weeks',
    complexity: 'Medium',
    category: 'Pricing'
  },
  {
    id: 2,
    title: 'Customer Segmentation Strategy',
    description: 'Create targeted service packages for high-value customer segments identified in CLV analysis.',
    expectedROI: 25,
    timeToImplement: '1-2 weeks',
    complexity: 'Low',
    category: 'Marketing'
  },
  {
    id: 3,
    title: 'Predictive Maintenance Program',
    description: 'Offer scheduled maintenance services to customers based on project completion dates.',
    expectedROI: 35,
    timeToImplement: '3-4 weeks',
    complexity: 'High',
    category: 'Operations'
  },
  {
    id: 4,
    title: 'Automated Follow-up System',
    description: 'Set up automated customer follow-ups based on project milestones and completion.',
    expectedROI: 18,
    timeToImplement: '1 week',
    complexity: 'Low',
    category: 'Customer Service'
  }
];

const automatedActions = [
  {
    id: 1,
    action: 'Schedule optimization reminder',
    trigger: 'Team utilization > 90%',
    status: 'active',
    lastTriggered: '2 hours ago'
  },
  {
    id: 2,
    action: 'Send customer follow-up email',
    trigger: 'Project completed + 7 days',
    status: 'active',
    lastTriggered: '1 day ago'
  },
  {
    id: 3,
    action: 'Price alert notification',
    trigger: 'Material costs increase > 5%',
    status: 'active',
    lastTriggered: '3 days ago'
  },
  {
    id: 4,
    action: 'Lead scoring update',
    trigger: 'New lead received',
    status: 'active',
    lastTriggered: '5 minutes ago'
  }
];

export const AutomatedInsights = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'trend': return <Brain className="h-4 w-4 text-blue-600" />;
      case 'optimization': return <Target className="h-4 w-4 text-purple-600" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI-Powered Insights & Recommendations</h2>
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Generate New Insights
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Insights</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.length}</div>
            <div className="text-xs text-muted-foreground">
              {insights.filter(i => i.priority === 'critical').length} critical
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendations.length}</div>
            <div className="text-xs text-green-600">
              Avg ROI: {Math.round(recommendations.reduce((sum, r) => sum + r.expectedROI, 0) / recommendations.length)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automated Actions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automatedActions.length}</div>
            <div className="text-xs text-blue-600">
              All systems active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Average accuracy
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(insight.type)}
                      <div>
                        <h3 className="font-semibold">{insight.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPriorityColor(insight.priority)}>
                            {insight.priority}
                          </Badge>
                          <Badge variant="outline">{insight.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {insight.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{insight.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Impact:</strong> {insight.impact}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">
                        <strong>Action:</strong> {insight.action}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button size="sm" className="flex items-center gap-2">
                      Implement
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {rec.title}
                    <Badge className={getComplexityColor(rec.complexity)}>
                      {rec.complexity}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{rec.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>ROI: {rec.expectedROI}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{rec.timeToImplement}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{rec.category}</Badge>
                    <Button size="sm">Start Implementation</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Intelligence Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CheckCircle className={`h-5 w-5 ${
                        action.status === 'active' ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h4 className="font-semibold">{action.action}</h4>
                        <p className="text-sm text-muted-foreground">
                          Trigger: {action.trigger}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={action.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {action.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last: {action.lastTriggered}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
