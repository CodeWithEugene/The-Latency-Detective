-- Create performance_logs table to store latency test results
CREATE TABLE public.performance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  test_type TEXT NOT NULL CHECK (test_type IN ('baseline', 'optimized')),
  average_latency_ms NUMERIC NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 100,
  cpu_usage_percent NUMERIC,
  throughput_rps NUMERIC,
  improvement_percent NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.performance_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read performance logs (public dashboard)
CREATE POLICY "Anyone can view performance logs"
  ON public.performance_logs
  FOR SELECT
  USING (true);

-- Create policy to allow inserts (for simulated load tests)
CREATE POLICY "Anyone can insert performance logs"
  ON public.performance_logs
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries by timestamp
CREATE INDEX idx_performance_logs_timestamp ON public.performance_logs(test_timestamp DESC);