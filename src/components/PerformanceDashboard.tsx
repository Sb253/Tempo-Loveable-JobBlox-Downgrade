
import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Zap, Database, Clock } from "lucide-react";

interface PerformanceMetrics {
  renderTime: number;
  bundleSize: number;
  memoryUsage: number;
  loadTime: number;
  componentCount: number;
}

export const PerformanceDashboard = memo(() => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    bundleSize: 0,
    memoryUsage: 0,
    loadTime: 0,
    componentCount: 0
  });

  useEffect(() => {
    const updateMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const memInfo = (performance as any).memory;
      
      setMetrics({
        renderTime: Math.round(performance.now()),
        bundleSize: Math.round((navigation.transferSize || 0) / 1024), // KB
        memoryUsage: memInfo ? Math.round(memInfo.usedJSHeapSize / 1048576) : 0, // MB
        loadTime: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        componentCount: document.querySelectorAll('[data-component]').length
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceScore = () => {
    let score = 100;
    if (metrics.renderTime > 1000) score -= 20;
    if (metrics.loadTime > 3000) score -= 20;
    if (metrics.memoryUsage > 50) score -= 20;
    return Math.max(0, score);
  };

  const performanceScore = getPerformanceScore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceScore}</div>
          <Progress value={performanceScore} className="mt-2" />
          <Badge variant={performanceScore > 80 ? "default" : performanceScore > 60 ? "secondary" : "destructive"} className="mt-2">
            {performanceScore > 80 ? "Excellent" : performanceScore > 60 ? "Good" : "Needs Improvement"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Render Time</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.renderTime}ms</div>
          <p className="text-xs text-muted-foreground">
            {metrics.renderTime < 500 ? "Fast" : metrics.renderTime < 1000 ? "Moderate" : "Slow"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.memoryUsage}MB</div>
          <p className="text-xs text-muted-foreground">
            {metrics.memoryUsage < 30 ? "Low" : metrics.memoryUsage < 50 ? "Moderate" : "High"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Load Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.loadTime}ms</div>
          <p className="text-xs text-muted-foreground">
            {metrics.loadTime < 1000 ? "Fast" : metrics.loadTime < 3000 ? "Moderate" : "Slow"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
});

PerformanceDashboard.displayName = 'PerformanceDashboard';
