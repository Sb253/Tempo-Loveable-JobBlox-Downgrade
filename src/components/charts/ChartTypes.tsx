
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const CustomBarChart = ({ data, title, xDataKey, yDataKey, color = "#8884d8", className, height = 300 }: BarChartProps) => {
  const config = {
    [yDataKey]: {
      label: yDataKey,
      color: color,
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data} height={height}>
            <XAxis dataKey={xDataKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={yDataKey} fill={color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const CustomLineChart = ({ data, title, xDataKey, yDataKey, color = "#8884d8", className, height = 300 }: LineChartProps) => {
  const config = {
    [yDataKey]: {
      label: yDataKey,
      color: color,
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart data={data} height={height}>
            <XAxis dataKey={xDataKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey={yDataKey} stroke={color} strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const CustomPieChart = ({ data, title, dataKey, nameKey, colors = COLORS, className, height = 300 }: PieChartProps) => {
  const config = data.reduce((acc, item, index) => {
    acc[item[nameKey]] = {
      label: item[nameKey],
      color: colors[index % colors.length],
    };
    return acc;
  }, {} as any);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <PieChart height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const CustomAreaChart = ({ data, title, xDataKey, yDataKey, color = "#8884d8", className, height = 300 }: AreaChartProps) => {
  const config = {
    [yDataKey]: {
      label: yDataKey,
      color: color,
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart data={data} height={height}>
            <XAxis dataKey={xDataKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey={yDataKey} stroke={color} fill={color} fillOpacity={0.6} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
