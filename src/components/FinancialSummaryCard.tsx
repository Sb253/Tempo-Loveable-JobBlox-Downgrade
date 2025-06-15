
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

interface FinancialMetric {
  label: string;
  value: number;
  count: number;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const FinancialSummaryCard = () => {
  // Mock data for month-to-date financial metrics
  const financialData: FinancialMetric[] = [
    {
      label: "Won Jobs",
      value: 145250,
      count: 23,
      trend: 'up',
      trendValue: 12.5,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      label: "Lost Jobs",
      value: 67800,
      count: 8,
      trend: 'down',
      trendValue: -8.2,
      icon: XCircle,
      color: "text-red-600"
    },
    {
      label: "Jobs in Progress",
      value: 89650,
      count: 15,
      trend: 'up',
      trendValue: 5.8,
      icon: Clock,
      color: "text-blue-600"
    }
  ];

  const totalRevenue = financialData.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-2 border-primary/10 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-primary" />
          Financial Summary - MTD
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Month to Date
          </Badge>
          <span className="text-sm text-muted-foreground">
            Total Revenue: {formatCurrency(totalRevenue)}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {financialData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-background ${metric.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.count} jobs</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-sm">{formatCurrency(metric.value)}</p>
                <div className="flex items-center gap-1 justify-end">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Win Rate</span>
            <span className="text-sm font-bold text-green-600">
              {((financialData[0].count / (financialData[0].count + financialData[1].count)) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
