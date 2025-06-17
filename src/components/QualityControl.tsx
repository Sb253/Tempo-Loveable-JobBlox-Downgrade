
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Clock, FileText, Camera, Star } from "lucide-react";

export const QualityControl = () => {
  const [inspections, setInspections] = useState([
    { id: 1, jobId: "JOB-001", customer: "Smith Residence", status: "passed", score: 95, date: "2024-01-15" },
    { id: 2, jobId: "JOB-002", customer: "Johnson Commercial", status: "pending", score: null, date: "2024-01-16" },
    { id: 3, jobId: "JOB-003", customer: "Davis Home", status: "failed", score: 72, date: "2024-01-14" }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quality Control</h1>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          New Inspection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inspections</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">+3 points from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inspections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inspections">Recent Inspections</TabsTrigger>
          <TabsTrigger value="checklists">Quality Checklists</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quality Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspections.map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(inspection.status)}
                      <div>
                        <p className="font-medium">{inspection.customer}</p>
                        <p className="text-sm text-muted-foreground">{inspection.jobId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {inspection.score && (
                        <div className="text-right">
                          <p className="font-medium">{inspection.score}/100</p>
                          <p className="text-sm text-muted-foreground">Quality Score</p>
                        </div>
                      )}
                      <Badge className={getStatusColor(inspection.status)}>
                        {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Checklists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Quality checklist templates and inspection criteria will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Quality performance metrics and trends will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
