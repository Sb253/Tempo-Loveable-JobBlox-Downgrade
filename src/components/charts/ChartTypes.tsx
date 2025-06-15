
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useTheme } from "@/components/ThemeProvider";

export interface ChartData {
  [key: string]: any;
}

export interface BaseChartProps {
  data: ChartData[];
  title: string;
  className?: string;
  height?: number;
}

export interface BarChartProps extends BaseChartProps {
  xDataKey: string;
  yDataKey: string;
  color?: string;
}

export interface LineChartProps extends BaseChartProps {
  xDataKey: string;
  yDataKey: string;
  color?: string;
}

export interface PieChartProps extends BaseChartProps {
  dataKey: string;
  nameKey: string;
  colors?: string[];
}

export interface AreaChartProps extends BaseChartProps {
  xDataKey: string;
  yDataKey: string;
  color?: string;
}

// Modern colorful palettes
const LIGHT_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
];

const DARK_COLORS = [
  '#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa',
  '#22d3ee', '#a3e635', '#fb923c', '#f472b6', '#818cf8'
];

const GRADIENT_COLORS = {
  light: {
    blue: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    red: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    green: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    orange: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  dark: {
    blue: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    red: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
    green: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    orange: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    purple: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
  }
};

export const CustomBarChart = ({ data, title, xDataKey, yDataKey, color = "#3b82f6", className, height = 300 }: BarChartProps) => {
  const { actualTheme } = useTheme();
  const colors = actualTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const barColor = color === "#8884d8" ? colors[0] : color;

  const config = {
    [yDataKey]: {
      label: yDataKey,
      color: barColor,
    },
  };

  return (
    <Card className={`${className} bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={config}>
          <BarChart data={data} height={height}>
            <XAxis 
              dataKey={xDataKey} 
              stroke={actualTheme === 'dark' ? '#94a3b8' : '#64748b'}
              fontSize={12}
            />
            <YAxis 
              stroke={actualTheme === 'dark' ? '#94a3b8' : '#64748b'}
              fontSize={12}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />} 
              contentStyle={{
                backgroundColor: actualTheme === 'dark' ? '#1e293b' : '#ffffff',
                border: '2px solid',
                borderColor: actualTheme === 'dark' ? '#475569' : '#e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Bar 
              dataKey={yDataKey} 
              fill={barColor} 
              radius={8}
              style={{
                filter: `drop-shadow(0 4px 6px ${barColor}20)`
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const CustomLineChart = ({ data, title, xDataKey, yDataKey, color = "#3b82f6", className, height = 300 }: LineChartProps) => {
  const { actualTheme } = useTheme();
  const colors = actualTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const lineColor = color === "#8884d8" ? colors[0] : color;

  const config = {
    [yDataKey]: {
      label: yDataKey,
      color: lineColor,
    },
  };

  return (
    <Card className={`${className} bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={config}>
          <LineChart data={data} height={height}>
            <XAxis 
              dataKey={xDataKey} 
              stroke={actualTheme === 'dark' ? '#94a3b8' : '#64748b'}
              fontSize={12}
            />
            <YAxis 
              stroke={actualTheme === 'dark' ? '#94a3b8' : '#64748b'}
              fontSize={12}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              contentStyle={{
                backgroundColor: actualTheme === 'dark' ? '#1e293b' : '#ffffff',
                border: '2px solid',
                borderColor: actualTheme === 'dark' ? '#475569' : '#e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey={yDataKey} 
              stroke={lineColor} 
              strokeWidth={3}
              dot={{ fill: lineColor, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: lineColor, stroke: actualTheme === 'dark' ? '#1e293b' : '#ffffff', strokeWidth: 2 }}
              style={{
                filter: `drop-shadow(0 2px 4px ${lineColor}40)`
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const CustomPieChart = ({ data, title, dataKey, nameKey, colors, className, height = 300 }: PieChartProps) => {
  const { actualTheme } = useTheme();
  const defaultColors = actualTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const pieColors = colors || defaultColors;

  const config = data.reduce((acc, item, index) => {
    acc[item[nameKey]] = {
      label: item[nameKey],
      color: pieColors[index % pieColors.length],
    };
    return acc;
  }, {} as any);

  return (
    <Card className={`${className} bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={config}>
          <PieChart height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={40}
              fill="#8884d8"
              dataKey={dataKey}
              stroke={actualTheme === 'dark' ? '#1e293b' : '#ffffff'}
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={pieColors[index % pieColors.length]}
                  style={{
                    filter: `drop-shadow(0 2px 4px ${pieColors[index % pieColors.length]}40)`
                  }}
                />
              ))}
            </Pie>
            <ChartTooltip 
              content={<ChartTooltipContent />}
              contentStyle={{
                backgroundColor: actualTheme === 'dark' ? '#1e293b' : '#ffffff',
                border: '2px solid',
                borderColor: actualTheme === 'dark' ? '#475569' : '#e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <ChartLegend 
              content={<ChartLegendContent />}
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const CustomAreaChart = ({ data, title, xDataKey, yDataKey, color = "#3b82f6", className, height = 300 }: AreaChartProps) => {
  const { actualTheme } = useTheme();
  const colors = actualTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const areaColor = color === "#8884d8" ? colors[0] : color;

  const config = {
    [yDataKey]: {
      label: yDataKey,
      color: areaColor,
    },
  };

  return (
    <Card className={`${className} bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={config}>
          <AreaChart data={data} height={height}>
            <XAxis 
              dataKey={xDataKey} 
              stroke={actualTheme === 'dark' ? '#94a3b8' : '#64748b'}
              fontSize={12}
            />
            <YAxis 
              stroke={actualTheme === 'dark' ? '#94a3b8' : '#64748b'}
              fontSize={12}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              contentStyle={{
                backgroundColor: actualTheme === 'dark' ? '#1e293b' : '#ffffff',
                border: '2px solid',
                borderColor: actualTheme === 'dark' ? '#475569' : '#e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey={yDataKey} 
              stroke={areaColor} 
              fill={areaColor}
              fillOpacity={0.3}
              strokeWidth={3}
              style={{
                filter: `drop-shadow(0 2px 4px ${areaColor}40)`
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
