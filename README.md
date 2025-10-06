# 🕵️‍♂️ The Latency Detective  
### Profiling and Performance Optimization in High-Concurrency Node.js Systems  
A full-stack performance profiling and optimization platform built to detect, analyze, and eliminate latency bottlenecks in Node.js applications. The system benchmarks a deliberately unoptimized API, visualizes its performance under load, and then refactors it using **Worker Threads** to achieve near real-time responsiveness. Performance metrics are logged in **Supabase** and visualized through an interactive **React Dashboard** — expressed in **Kenyan Shillings (KSH)** to represent “cost of latency.”  

## 🚀 Project Overview  
Node.js is fast, but single-threaded. When CPU-intensive tasks block the **Event Loop**, overall throughput drops — especially under high concurrency. **The Latency Detective** helps developers *see* and *solve* this problem by combining profiling, multithreading, and visualization in a single, cohesive platform.  

## 🧩 System Architecture  
### 🏗️ Overview  
# 🕵️‍♂️ The Latency Detective – System Architecture

A full-stack Node.js performance profiling and optimization system powered by Worker Threads, React (Vite/Next.js), and Supabase — built to analyze and visualize latency improvements in real-time (with currency metrics in KSH).

---

## 🧭 System Architecture (Horizontal Overview)

| Component | Technology | Responsibilities |
|-----------|------------|------------------|
| **Frontend** | React (Vite/Next.js) | • Interactive dashboard with metrics visualization<br>• Load testing interface for 100 concurrent requests<br>• Display performance costs in Kenyan Shillings (KES) |
| **Backend** | Node.js + TypeScript + Express | • Process CPU-intensive tasks via /api/process-data<br>• Implement Worker Threads for workload offloading<br>• Collect profiling and performance metrics |
| **Database** | Supabase (PostgreSQL) | • Store latency test results and timestamps<br>• Handle user authentication (optional)<br>• Enable real-time metrics tracking with RLS |

## ⚙️ Tech Stack  
| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend** | React (Vite/Next.js), TypeScript, Tailwind CSS | Interactive performance dashboard |
| **Backend** | Node.js, Express, Worker Threads, TypeScript | API, benchmarking, and optimization |
| **Database** | Supabase (PostgreSQL) | Store latency metrics & logs |
| **Dev Tools** | Node.js Profiler, Chrome DevTools, Autocannon | Profiling and load testing |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend) | Hosting and CI/CD |

## 🔍 Features  
### 🧠 Phase 1: Baseline Profiling  
- Unoptimized endpoint: `POST /api/process-data`  
- Simulates CPU-heavy workload (e.g., Fibonacci sequence)  
- Measured under 100 concurrent requests  
- Uses `autocannon` for load testing  
- Captures flame graph and CPU profile  

### ⚡ Phase 2: Worker Thread Optimization  
- Offloads heavy computation to a separate thread  
- Main thread freed for I/O operations  
- Async communication with Promise-based Worker  
- Results in 90%+ reduction in latency under load  

### 📊 Phase 3: Visualization Dashboard  
- React-based dashboard for:  
  - Baseline vs Optimized latency  
  - CPU utilization graphs  
  - Throughput charts  
- Uses Recharts/Chart.js for data visualization  
- Displays performance cost in **KSH (Kenyan Shillings)**  

### 💾 Phase 4: Metrics Logging with Supabase  
- Logs test runs: latency, concurrency level, timestamps  
- Stores optimization percentage  
- Optional Auth (JWT) for developer-only dashboard access  

## 💡 Example Endpoints  
| Method | Endpoint | Description |
|--------|-----------|--------------|
| `POST` | `/api/process-data` | Runs CPU-intensive computation (unoptimized/optimized) |
| `GET` | `/api/metrics` | Returns average latency and improvement stats |
| `GET` | `/api/health` | Simple health check endpoint |

## 🧮 Example Output  
### 🔴 Before Optimization  

- Average Latency: 3.8 seconds
- CPU Usage: 97%
- Event Loop Blocked: Yes
### 🟢 After Optimization
- Average Latency: 55 milliseconds
- CPU Usage: 37%
- Event Loop Blocked: No
- Latency Improved by: 98.5%
## 🛠️ Setup & Installation
#### 1️⃣ Clone Repositories

- git clone https://github.com/yourusername/latency-detective-backend.git
- git clone https://github.com/yourusername/latency-detective-frontend.git
#### 2️⃣ Backend Setup

- cd latency-detective-backend
- npm install
- cp .env.example .env
- Add your Supabase credentials
- npm run dev
#### 3️⃣ Frontend Setup

- cd latency-detective-frontend
- npm install
- npm run dev
### 🧰 Load Testing
- Use autocannon to simulate concurrent requests:
- npx autocannon -c 100 -d 15 http://localhost:4000/api/process-data
### 📊 Profiling Commands
- Chrome DevTools Profiling
- node --inspect app.js
### Open chrome://inspect in Chrome and start profiling
- CLI Profiling
- node --prof app.js
- node --prof-process isolate-*.log > processed.txt
