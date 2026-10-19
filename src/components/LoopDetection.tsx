import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, AlertTriangle, CheckCircle, StickyNote } from "lucide-react";

interface LoopNode {
  id: string;
  label: string;
  type: "action" | "check" | "note" | "break";
  x: number;
  y: number;
}

interface LoopEdge {
  from: string;
  to: string;
  label?: string;
}

const initialNodes: LoopNode[] = [
  { id: "a1", label: "Read file", type: "action", x: 50, y: 30 },
  { id: "a2", label: "Detect error", type: "check", x: 200, y: 30 },
  { id: "a3", label: "Attempt fix", type: "action", x: 350, y: 30 },
  { id: "a4", label: "Run test", type: "action", x: 350, y: 120 },
  { id: "a5", label: "Still failing?", type: "check", x: 200, y: 120 },
  { id: "a6", label: "Atomic note", type: "note", x: 50, y: 120 },
  { id: "a7", label: "Graphify", type: "note", x: 50, y: 210 },
  { id: "a8", label: "Pattern break", type: "break", x: 200, y: 210 },
];

const edges: LoopEdge[] = [
  { from: "a1", to: "a2" },
  { from: "a2", to: "a3", label: "error found" },
  { from: "a3", to: "a4" },
  { from: "a4", to: "a5" },
  { from: "a5", to: "a6", label: "loop detected" },
  { from: "a6", to: "a7" },
  { from: "a7", to: "a8" },
  { from: "a8", to: "a1", label: "new strategy" },
  { from: "a5", to: "a1", label: "pass" },
];

export default function LoopDetection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [loopCount, setLoopCount] = useState(0);
  const [detected, setDetected] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const sequence = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"];
    let step = 0;
    let count = 0;
    let isDetected = false;

    const interval = setInterval(() => {
      setActiveNode(sequence[step]);
      
      if (sequence[step] === "a5") {
        count++;
        setLoopCount(count);
        if (count >= 3) {
          isDetected = true;
          setDetected(true);
        }
      }
      
      if (sequence[step] === "a8" && isDetected) {
        setBroken(true);
        clearInterval(interval);
      }
      
      step = (step + 1) % sequence.length;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const reset = () => {
    setLoopCount(0);
    setDetected(false);
    setBroken(false);
    setActiveNode(null);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "action": return "border-cyan-500/50 bg-cyan-500/10";
      case "check": return "border-yellow-500/50 bg-yellow-500/10";
      case "note": return "border-purple-500/50 bg-purple-500/10";
      case "break": return "border-emerald-500/50 bg-emerald-500/10";
      default: return "border-gray-500/50 bg-gray-500/10";
    }
  };

  const getNodeTextColor = (type: string) => {
    switch (type) {
      case "action": return "text-cyan-300";
      case "check": return "text-yellow-300";
      case "note": return "text-purple-300";
      case "break": return "text-emerald-300";
      default: return "text-gray-300";
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Graph Visualization */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            Problem Graph
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-mono">
              Loops: {loopCount}
            </span>
            {detected && (
              <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full animate-pulse">
                LOOP DETECTED
              </span>
            )}
            {broken && (
              <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-300 rounded-full">
                BROKEN ✓
              </span>
            )}
          </div>
        </div>

        <div className="relative h-[280px] bg-gray-900/50 rounded-lg overflow-hidden">
          {/* SVG edges */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 260">
            {edges.map((edge, i) => {
              const fromNode = initialNodes.find((n) => n.id === edge.from);
              const toNode = initialNodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              
              const isActive = activeNode === edge.from || activeNode === edge.to;
              
              return (
                <g key={i}>
                  <line
                    x1={fromNode.x + 40}
                    y1={fromNode.y + 15}
                    x2={toNode.x + 40}
                    y2={toNode.y + 15}
                    stroke={isActive ? "#06b6d4" : "#374151"}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={edge.label ? "4 4" : "none"}
                    opacity={isActive ? 1 : 0.5}
                  />
                  {edge.label && (
                    <text
                      x={(fromNode.x + toNode.x) / 2 + 40}
                      y={(fromNode.y + toNode.y) / 2 + 10}
                      fill={isActive ? "#06b6d4" : "#6b7280"}
                      fontSize="8"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {initialNodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute px-3 py-1.5 rounded-md border text-xs font-mono cursor-pointer transition-all ${getNodeColor(
                node.type
              )} ${getNodeTextColor(node.type)} ${
                activeNode === node.id ? "ring-2 ring-white/30 scale-110" : ""
              }`}
              style={{ left: `${(node.x / 420) * 100}%`, top: `${(node.y / 260) * 100}%` }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveNode(node.id)}
            >
              {node.label}
            </motion.div>
          ))}
        </div>

        <button
          onClick={reset}
          className="mt-4 w-full px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm font-mono"
        >
          Reset Simulation
        </button>
      </motion.div>

      {/* Atomic Notes */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-purple-400" />
            Sandy Box Atomic Notes
          </h3>
          <div className="space-y-3">
            {[
              {
                title: "Note #1: Error pattern",
                content: "TypeError at line 42 — missing null check on user.profile",
                type: "observation",
              },
              {
                title: "Note #2: Fix attempt",
                content: "Added optional chaining — test still fails due to mock data",
                type: "action",
              },
              {
                title: "Note #3: Root cause",
                content: "Mock setup doesn't include nested profile object",
                type: "insight",
              },
            ].map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-900/50 rounded-lg p-3 border border-purple-500/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-purple-300">{note.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">
                    {note.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{note.content}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Graphify Output</h3>
          <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-400">
            <div className="text-cyan-400">graph problem_loop {"{"}</div>
            <div className="ml-2">read_file → detect_error → attempt_fix</div>
            <div className="ml-2">attempt_fix → run_test → still_failing</div>
            <div className="ml-2 text-yellow-400">still_failing → read_file [CYCLE]</div>
            <div className="ml-2 text-emerald-400">→ inject_note → break_cycle</div>
            <div className="text-cyan-400">{"}"}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
