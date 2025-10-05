import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ThroughputChartProps {
  baselineLatency: number;
  optimizedLatency: number;
}

export const ThroughputChart = ({ baselineLatency, optimizedLatency }: ThroughputChartProps) => {
  // Calculate requests per second (assuming single-threaded processing)
  const baselineRPS = Math.round(1000 / baselineLatency);
  const optimizedRPS = Math.round(1000 / optimizedLatency);

  const data = [
    {
      name: "Baseline",
      "Requests/sec": baselineRPS,
      "CPU Usage %": 95,
    },
    {
      name: "Optimized",
      "Requests/sec": optimizedRPS,
      "CPU Usage %": 30,
    },
  ];

  return (
    <Card className="neo-shadow-lg border-2 border-foreground/10">
      <CardHeader>
        <CardTitle>Throughput & CPU Usage</CardTitle>
        <CardDescription>System performance metrics comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '2px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="Requests/sec" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="CPU Usage %" 
              fill="hsl(var(--chart-3))" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
