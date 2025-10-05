import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";
import { LatencyChart } from "@/components/LatencyChart";
import { ThroughputChart } from "@/components/ThroughputChart";
import { LoadTestPanel } from "@/components/LoadTestPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [testResults, setTestResults] = useState({
    baseline: 3500,
    optimized: 50,
    improvement: 98.57
  });

  const [chartData, setChartData] = useState([
    { name: "0s", baseline: 0, optimized: 0 },
    { name: "2s", baseline: 2800, optimized: 45 },
    { name: "4s", baseline: 3200, optimized: 48 },
    { name: "6s", baseline: 3600, optimized: 52 },
    { name: "8s", baseline: 3400, optimized: 50 },
    { name: "10s", baseline: 3500, optimized: 47 },
  ]);

  useEffect(() => {
    loadLatestResults();
  }, []);

  const loadLatestResults = async () => {
    const { data, error } = await supabase
      .from("performance_logs")
      .select("*")
      .order("test_timestamp", { ascending: false })
      .limit(2);

    if (error) {
      console.error("Error loading results:", error);
      return;
    }

    if (data && data.length >= 2) {
      const baseline = data.find(d => d.test_type === "baseline");
      const optimized = data.find(d => d.test_type === "optimized");
      
      if (baseline && optimized) {
        const improvement = ((baseline.average_latency_ms - optimized.average_latency_ms) / baseline.average_latency_ms) * 100;
        setTestResults({
          baseline: Math.round(baseline.average_latency_ms),
          optimized: Math.round(optimized.average_latency_ms),
          improvement: Math.round(improvement * 100) / 100
        });
      }
    }
  };

  const handleTestComplete = async (results: { baseline: number; optimized: number; improvement: number }) => {
    setTestResults(results);

    // Update chart with animated data
    const newChartData = [
      { name: "0s", baseline: 0, optimized: 0 },
      { name: "2s", baseline: results.baseline * 0.8, optimized: results.optimized * 0.9 },
      { name: "4s", baseline: results.baseline * 0.95, optimized: results.optimized * 1.05 },
      { name: "6s", baseline: results.baseline * 1.1, optimized: results.optimized * 1.1 },
      { name: "8s", baseline: results.baseline, optimized: results.optimized * 0.95 },
      { name: "10s", baseline: results.baseline * 0.98, optimized: results.optimized },
    ];
    setChartData(newChartData);

    // Save to database
    try {
      const { error: baselineError } = await supabase
        .from("performance_logs")
        .insert({
          test_type: "baseline",
          average_latency_ms: results.baseline,
          request_count: 100,
          cpu_usage_percent: 95,
          throughput_rps: Math.round(1000 / results.baseline),
          notes: "Synchronous processing baseline test"
        });

      const { error: optimizedError } = await supabase
        .from("performance_logs")
        .insert({
          test_type: "optimized",
          average_latency_ms: results.optimized,
          request_count: 100,
          cpu_usage_percent: 30,
          throughput_rps: Math.round(1000 / results.optimized),
          improvement_percent: results.improvement,
          notes: "Worker Thread optimization test"
        });

      if (baselineError || optimizedError) {
        console.error("Error saving results:", baselineError || optimizedError);
        toast.error("Failed to save results to database");
      } else {
        toast.success("Results saved to database");
      }
    } catch (error) {
      console.error("Error saving results:", error);
      toast.error("Failed to save results");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground/10 bg-card neo-shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg neo-shadow">
              <Search className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">The Latency Detective</h1>
              <p className="text-muted-foreground">Node.js Performance Profiling & Optimization</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Metrics Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
          <PerformanceMetrics
            baselineLatency={testResults.baseline}
            optimizedLatency={testResults.optimized}
            improvement={testResults.improvement}
          />
        </section>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <LatencyChart data={chartData} />
          <ThroughputChart
            baselineLatency={testResults.baseline}
            optimizedLatency={testResults.optimized}
          />
        </div>

        {/* Load Testing */}
        <section className="max-w-2xl mx-auto">
          <LoadTestPanel onTestComplete={handleTestComplete} />
        </section>

        {/* Explanation */}
        <section className="max-w-4xl mx-auto">
          <div className="p-6 bg-card border-2 border-foreground/10 rounded-lg neo-shadow">
            <h3 className="text-xl font-bold mb-4">How It Works</h3>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">1. Baseline (Synchronous)</h4>
                <p>The API processes CPU-intensive tasks synchronously on the main thread, blocking all other requests and causing high latency (~3.5s per request).</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">2. Worker Thread Optimization</h4>
                <p>Heavy computations are offloaded to separate Worker Threads, freeing the main thread to handle concurrent requests efficiently (~50ms per request).</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">3. Performance Gains</h4>
                <p>Worker Threads enable ~98% latency reduction, dramatically improving throughput from &lt;1 req/s to 20+ req/s while reducing CPU blocking.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">4. Cost Impact</h4>
                <p>Displayed in KSH (Kenyan Shillings) to represent equivalent infrastructure cost savings from reduced server load and improved efficiency.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t-4 border-foreground/10 bg-card">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Performance diagnostic simulation for educational purposes</p>
          <p className="mt-1">Built with React, TypeScript, and Lovable Cloud</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
