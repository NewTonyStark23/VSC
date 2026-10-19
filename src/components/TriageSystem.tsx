import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, MessageSquare, Search, ChevronRight, ArrowDown } from "lucide-react";

interface Tier {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  actions: string[];
  tokenCost: string;
  example: string;
}

const tiers: Tier[] = [
  {
    id: 1,
    name: "Auto-Fix",
    description: "Token-saving automatic corrections applied without human intervention",
    icon: Zap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    actions: [
      "Fix missing imports",
      "Correct typos in identifiers",
      "Add missing semicolons",
      "Auto-format code style",
    ],
    tokenCost: "~50 tokens",
    example: "import { useState } from 'react'; // auto-added",
  },
  {
    id: 2,
    name: "Targeted Hints",
    description: "Precise suggestions shown to the developer for quick decision",
    icon: MessageSquare,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    actions: [
      "Suggest fix approach",
      "Highlight related code",
      "Propose test cases",
      "Recommend refactoring",
    ],
    tokenCost: "~200 tokens",
    example: "Hint: Consider using useMemo() for this computed value",
  },
  {
    id: 3,
    name: "Context Scan",
    description: "Minimal context scan to understand the broader problem space",
    icon: Search,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    actions: [
      "Scan related files",
      "Analyze dependency graph",
      "Check test coverage",
      "Review git history",
    ],
    tokenCost: "~500 tokens",
    example: "Scanning 3 related files... found pattern in utils/helpers.ts",
  },
];

export default function TriageSystem() {
  const [activeTier, setActiveTier] = useState<number>(1);
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const simulate = () => {
    setSimulating(true);
    setSimStep(0);
    
    const steps = [1, 2, 3];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setActiveTier(steps[i]);
        setSimStep(i + 1);
        i++;
      } else {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 1200);
  };

  const activeTierData = tiers.find((t) => t.id === activeTier)!;

  return (
    <div className="space-y-8">
      {/* Tier Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier, i) => (
          <motion.button
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            onClick={() => setActiveTier(tier.id)}
            className={`relative p-5 rounded-xl border text-left transition-all ${
              activeTier === tier.id
                ? `${tier.bgColor} ${tier.borderColor} ring-1 ring-white/10`
                : "bg-gray-800/30 border-gray-700/30 hover:border-gray-600/50"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${tier.bgColor} border ${tier.borderColor} flex items-center justify-center`}>
                <tier.icon className={`w-5 h-5 ${tier.color}`} />
              </div>
              <div>
                <div className={`text-sm font-bold ${activeTier === tier.id ? tier.color : "text-gray-300"}`}>
                  Tier {tier.id}
                </div>
                <div className="text-xs text-gray-500">{tier.name}</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-3">{tier.description}</p>
            <div className={`text-xs font-mono ${tier.color}`}>{tier.tokenCost}</div>
            
            {activeTier === tier.id && (
              <motion.div
                layoutId="activeIndicator"
                className={`absolute -bottom-px left-4 right-4 h-0.5 ${
                  tier.id === 1 ? "bg-emerald-500" : tier.id === 2 ? "bg-yellow-500" : "bg-cyan-500"
                }`}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Active Tier Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Actions */}
          <div className={`rounded-xl border ${activeTierData.borderColor} ${activeTierData.bgColor} p-6`}>
            <h4 className={`text-sm font-semibold ${activeTierData.color} mb-4`}>
              Tier {activeTier} Actions
            </h4>
            <div className="space-y-2">
              {activeTierData.actions.map((action, i) => (
                <motion.div
                  key={action}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <ChevronRight className={`w-4 h-4 ${activeTierData.color}`} />
                  {action}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
            <h4 className="text-sm font-semibold text-white mb-4">Example Output</h4>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs">
              <div className="text-gray-500 mb-2">// Guardian Triage Response</div>
              <div className={activeTierData.color}>
                [{activeTierData.name}] {activeTierData.example}
              </div>
              <div className="text-gray-600 mt-2">
                tokens_used: {activeTierData.tokenCost.replace("~", "").replace(" tokens", "")}
              </div>
              <div className="text-gray-600">
                confidence: {activeTier === 1 ? "95%" : activeTier === 2 ? "78%" : "62%"}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Simulation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-white">Triage Simulation</h4>
          <button
            onClick={simulate}
            disabled={simulating}
            className="px-4 py-1.5 text-xs bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
          >
            {simulating ? "Running..." : "Run Simulation"}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          {tiers.map((tier, i) => (
            <div key={tier.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  simStep > i
                    ? `${tier.borderColor} ${tier.bgColor}`
                    : "border-gray-700 bg-gray-800/50"
                }`}
              >
                <tier.icon className={`w-5 h-5 ${simStep > i ? tier.color : "text-gray-600"}`} />
              </div>
              {i < tiers.length - 1 && (
                <ArrowDown className="w-4 h-4 text-gray-600 mx-2 rotate-[-90deg] md:rotate-0" />
              )}
            </div>
          ))}
        </div>
        
        {simStep > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-gray-400"
          >
            {simStep === 1 && "→ Attempting auto-fix..."}
            {simStep === 2 && "→ Auto-fix insufficient, providing hints..."}
            {simStep === 3 && "→ Hints not enough, scanning context..."}
            {simStep === 3 && !simulating && " → Resolution found! ✓"}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
