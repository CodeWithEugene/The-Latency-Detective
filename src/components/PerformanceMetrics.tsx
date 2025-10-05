import { MetricCard } from "./MetricCard";
import { Clock, Zap, TrendingDown, DollarSign } from "lucide-react";

interface PerformanceMetricsProps {
  baselineLatency: number;
  optimizedLatency: number;
  improvement: number;
}

export const PerformanceMetrics = ({ 
  baselineLatency, 
  optimizedLatency, 
  improvement 
}: PerformanceMetricsProps) => {
  // Calculate KSH savings (assume 1ms = 0.05 KSH per request for cost equivalence)
  const costPerMs = 0.05;
  const requestsPerDay = 10000;
  const savingsPerRequest = (baselineLatency - optimizedLatency) * costPerMs;
  const dailySavings = savingsPerRequest * requestsPerDay;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Baseline Latency"
        value={`${baselineLatency}ms`}
        subtitle="Synchronous processing"
        icon={Clock}
        trend="down"
      />
      
      <MetricCard
        title="Optimized Latency"
        value={`${optimizedLatency}ms`}
        subtitle="Worker Threads"
        icon={Zap}
        trend="up"
        className="border-success/30"
      />
      
      <MetricCard
        title="Improvement"
        value={`${improvement}%`}
        subtitle={`${baselineLatency - optimizedLatency}ms faster`}
        icon={TrendingDown}
        trend="up"
        className="border-success/30"
      />
      
      <MetricCard
        title="Cost Savings"
        value={`KSH ${dailySavings.toFixed(0)}`}
        subtitle="Per day (10k requests)"
        icon={DollarSign}
        trend="up"
        className="border-primary/30"
      />
    </div>
  );
};
