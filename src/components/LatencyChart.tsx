import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  name: string;
  baseline: number;
  optimized: number;
}

interface LatencyChartProps {
  data: ChartDataPoint[];
}

export const LatencyChart = ({ data }: LatencyChartProps) => {
  return (
    <Card className="neo-shadow-lg border-2 border-foreground/10">
      <CardHeader>
        <CardTitle>Latency Comparison</CardTitle>
        <CardDescription>Response times before and after Worker Thread optimization</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '2px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="baseline" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Baseline (Sync)"
              dot={{ fill: 'hsl(var(--destructive))' }}
            />
            <Line 
              type="monotone" 
              dataKey="optimized" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              name="Optimized (Worker)"
              dot={{ fill: 'hsl(var(--success))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
