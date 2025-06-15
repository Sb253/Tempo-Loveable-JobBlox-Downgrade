
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ScatterChart,
  Scatter
} from 'recharts';
import { TrendingUp, Clock, Target, AlertTriangle, Brain, Download } from "lucide-react";

const projectCompletionData = [
  { project: 'Kitchen Renovation A', predicted: 14, actual: 16, probability: 85 },
  { project: 'Bathroom Remodel B', predicted: 8, actual: null, probability: 92 },
  { project: 'Deck Installation C', predicted: 12, actual: null, probability: 78 },
  { project: 'Home Addition D', predicted: 45, actual: null, probability: 67 },
  { project: 'Roof Repair E', predicted: 6, actual: 7, probability: 94 }
];

const timelineForecasts = [
  { week: 'Week 1', projected: 3, confidence: 95 },
  { week: 'Week 2', projected: 5, confidence: 87 },
  { week: 'Week 3', projected: 4, confidence: 82 },
  { week: 'Week 4', projected: 6, confidence: 75 }
];

const riskFactors = [
  { factor: 'Weather Delays', impact: 15, likelihood: 65 },
  { factor: 'Material Shortages', impact: 25, likelihood: 45 },
  { factor: 'Resource Conflicts', impact: 20, likelihood: 35 },
  { factor: 'Scope Changes', impact: 30, likelihood: 55 }
];

export const PredictiveAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('completion');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Predictive Analytics</h2>
        <div className="flex gap-4">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completion">Project Completion</SelectItem>
              <SelectItem value="revenue">Revenue Forecasting</SelectItem>
              <SelectItem value="resource">Resource Planning</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Predictions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Prediction Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects at Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-red-600">
              High delay probability
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Confidence</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="text-xs text-muted-foreground">
              Current predictions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Week Forecast</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 projects</div>
            <div className="text-xs text-blue-600">
              Expected completions
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="completion" className="space-y-4">
        <TabsList>
          <TabsTrigger value="completion">Project Completion</TabsTrigger>
          <TabsTrigger value="timeline">Timeline Forecasts</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="completion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Completion Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectCompletionData.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{project.project}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.probability >= 90 ? 'bg-green-100 text-green-800' :
                        project.probability >= 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.probability}% confidence
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Predicted:</span>
                        <span className="ml-2 font-medium">{project.predicted} days</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actual:</span>
                        <span className="ml-2 font-medium">
                          {project.actual ? `${project.actual} days` : 'In progress'}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Variance:</span>
                        <span className={`ml-2 font-medium ${
                          project.actual ? 
                            (project.actual <= project.predicted ? 'text-green-600' : 'text-red-600') :
                            'text-muted-foreground'
                        }`}>
                          {project.actual ? 
                            `${project.actual - project.predicted > 0 ? '+' : ''}${project.actual - project.predicted} days` :
                            'TBD'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completion Timeline Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timelineForecasts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projected" fill="#8884d8" name="Projected Completions" />
                  <Bar dataKey="confidence" fill="#82ca9d" name="Confidence %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={riskFactors}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="likelihood" name="Likelihood %" />
                  <YAxis dataKey="impact" name="Impact %" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="impact" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{risk.factor}</span>
                    <div className="text-sm text-muted-foreground">
                      {risk.likelihood}% likelihood • {risk.impact}% impact
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
