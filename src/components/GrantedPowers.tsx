import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Shield,
  Terminal,
  TestTube,
  Gauge,
  Globe,
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
} from "lucide-react";

interface Power {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: "idle" | "running" | "success" | "error";
  output?: string;
  allowed: boolean;
}

const initialPowers: Power[] = [
  {
    id: "runner",
    name: "Sandboxed Runner",
    description: "Execute code in isolated sandbox environment",
    icon: Terminal,
    status: "idle",
    allowed: true,
  },
  {
    id: "test",
    name: "Test Suite",
    description: "Run unit tests and integration tests",
    icon: TestTube,
    status: "idle",
    allowed: true,
  },
  {
    id: "benchmark",
    name: "Benchmark",
    description: "Performance profiling and benchmarking",
    icon: Gauge,
    status: "idle",
    allowed: true,
  },
  {
    id: "api-probe",
    name: "API Probe",
    description: "Test API endpoints and validate responses",
    icon: Globe,
    status: "idle",
    allowed: true,
  },
];

const mockOutputs: Record<string, string[]> = {
  runner: [
    "$ sandbox --run main.ts",
    "Compiling TypeScript...",
    "✓ Compiled successfully (0.3s)",
    "Executing in sandbox...",
    "✓ Process completed with exit code 0",
    "Output: Hello from Guardian sandbox!",
  ],
  test: [
    "$ guardian test --suite all",
    "Running 24 test cases...",
    "✓ test/auth/login.spec.ts (4 tests)",
    "✓ test/api/users.spec.ts (8 tests)",
    "✓ test/utils/format.spec.ts (12 tests)",
    "All 24 tests passed ✓",
  ],
  benchmark: [
    "$ guardian bench --profile",
    "Profiling render performance...",
    "Component A: 2.3ms avg (✓ under threshold)",
    "Component B: 8.1ms avg (⚠ near threshold)",
    "Component C: 1.2ms avg (✓ under threshold)",
    "Bundle size: 142kb gzipped",
  ],
  "api-probe": [
    "$ guardian probe --endpoint /api/health",
    "GET /api/health → 200 OK (45ms)",
    "GET /api/users → 200 OK (120ms)",
    "POST /api/auth → 201 Created (89ms)",
    "All endpoints responding ✓",
    "Latency p95: 134ms",
  ],
};

export default function GrantedPowers() {
  const [powers, setPowers] = useState<Power[]>(initialPowers);
  const [contractActive, setContractActive] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "[Guardian] Powers bridge initialized",
    "[Guardian] Anti-refusal contract: ACTIVE",
    "[Guardian] Sandbox: READY",
  ]);

  const runPower = (id: string) => {
    setPowers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "running" } : p))
    );
    setLogs((prev) => [...prev, `[Runner] Starting ${id}...`]);

    const output = mockOutputs[id] || [];
    let step = 0;

    const interval = setInterval(() => {
      if (step < output.length) {
        setLogs((prev) => [...prev, output[step]]);
        step++;
      } else {
        clearInterval(interval);
        setPowers((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, status: "success", output: output.join("\n") } : p
          )
        );
        setLogs((prev) => [...prev, `[Guardian] ${id} completed ✓`]);
      }
    }, 400);
  };

  const runAll = () => {
    powers.forEach((p, i) => {
      setTimeout(() => runPower(p.id), i * 2000);
    });
  };

  const resetAll = () => {
    setPowers(initialPowers);
    setLogs([
      "[Guardian] Powers bridge reset",
      "[Guardian] Anti-refusal contract: ACTIVE",
      "[Guardian] Sandbox: READY",
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Contract Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`rounded-xl border p-4 flex items-center justify-between ${
          contractActive
            ? "bg-emerald-500/5 border-emerald-500/30"
            : "bg-red-500/5 border-red-500/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <Shield className={`w-6 h-6 ${contractActive ? "text-emerald-400" : "text-red-400"}`} />
          <div>
            <div className={`text-sm font-semibold ${contractActive ? "text-emerald-300" : "text-red-300"}`}>
              Anti-Refusal Contract Rule
            </div>
            <div className="text-xs text-gray-400">
              Guardian will never refuse to execute granted powers within sandbox
            </div>
          </div>
        </div>
        <button
          onClick={() => setContractActive(!contractActive)}
          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
            contractActive
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
              : "bg-red-500/20 border-red-500/50 text-red-300"
          }`}
        >
          {contractActive ? "ACTIVE" : "DISABLED"}
        </button>
      </motion.div>

      {/* Powers Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {powers.map((power, i) => (
          <motion.div
            key={power.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border p-5 transition-all ${
              power.status === "running"
                ? "bg-cyan-500/5 border-cyan-500/30"
                : power.status === "success"
                ? "bg-emerald-500/5 border-emerald-500/30"
                : power.status === "error"
                ? "bg-red-500/5 border-red-500/30"
                : "bg-gray-800/50 border-gray-700/50"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  power.status === "running"
                    ? "bg-cyan-500/20"
                    : power.status === "success"
                    ? "bg-emerald-500/20"
                    : "bg-gray-700/50"
                }`}>
                  <power.icon className={`w-5 h-5 ${
                    power.status === "running"
                      ? "text-cyan-400 animate-pulse"
                      : power.status === "success"
                      ? "text-emerald-400"
                      : "text-gray-400"
                  }`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{power.name}</div>
                  <div className="text-xs text-gray-500">{power.description}</div>
                </div>
              </div>
              <div>
                {power.status === "running" && (
                  <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                )}
                {power.status === "success" && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                {power.status === "error" && <XCircle className="w-5 h-5 text-red-400" />}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => runPower(power.id)}
                disabled={power.status === "running" || !contractActive}
                className="flex-1 px-3 py-1.5 text-xs bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3" />
                Execute
              </button>
              {power.allowed && (
                <span className="px-2 py-1 text-[10px] bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                  ALLOWED
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={runAll}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          Run All Powers
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 border border-gray-600 text-gray-300 text-sm rounded-lg hover:border-gray-500 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Execution Log */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-950 rounded-xl border border-gray-700/50 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/50 bg-gray-900/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 font-mono">Execution Log</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-gray-500">LIVE</span>
          </div>
        </div>
        <div className="p-4 font-mono text-xs max-h-[200px] overflow-y-auto">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`py-0.5 ${
                log.includes("✓")
                  ? "text-emerald-400"
                  : log.includes("⚠")
                  ? "text-yellow-400"
                  : log.includes("[Guardian]")
                  ? "text-cyan-400"
                  : log.includes("[Runner]")
                  ? "text-purple-400"
                  : "text-gray-400"
              }`}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
