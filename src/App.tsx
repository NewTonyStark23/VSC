import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Brain,
  GitBranch,
  Heart,
  Zap,
  Lock,
  RefreshCw,
  Layers,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Terminal,
  FileCode,
  Search,
  Wrench,
  Clock,
  ArrowRight,
  Copy,
  Check,
  Menu,
  X,
} from "lucide-react";
import LoopDetection from "./components/LoopDetection";
import TriageSystem from "./components/TriageSystem";
import GrantedPowers from "./components/GrantedPowers";

const features = [
  { id: "loop-detection", label: "Loop Detection", icon: GitBranch },
  { id: "triage", label: "Proactive Triage", icon: Layers },
  { id: "backups", label: "Pre-edit Backups", icon: Lock },
  { id: "brain-rules", label: "Brain Rules", icon: Brain },
  { id: "heartbeat", label: "Keep-alive", icon: Heart },
  { id: "granted-powers", label: "Granted Powers", icon: Zap },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-cyan-400" />
            <span className="text-lg font-bold text-white tracking-tight">
              AI Guardian
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => scrollTo(f.id)}
                className="px-3 py-1.5 text-sm text-gray-300 hover:text-cyan-400 transition-colors rounded-md hover:bg-white/5"
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/20"
          >
            <div className="px-4 py-3 space-y-1">
              {features.map((f) => (
                <button
                  key={f.id}
                  onClick={() => scrollTo(f.id)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors rounded-md hover:bg-white/5"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Autonomous Code Guardian System";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-cyan-300 font-mono">v2.0 — Rebuild Verified</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Guardian</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-300 mb-4 font-mono h-8"
        >
          {typedText}
          <span className="animate-pulse text-cyan-400">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-400 max-w-3xl mx-auto mb-10"
        >
          Loop detection with atomic notes, tiered proactive triage, mandatory pre-edit backups,
          brain-rules baking panel, keep-alive heartbeat, and the Granted Powers local-execution bridge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("loop-detection")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Explore Features
          </button>
          <button
            onClick={() => document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
          >
            View Architecture
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: "6", label: "Core Systems" },
            { value: "3", label: "Triage Tiers" },
            { value: "100%", label: "Backup Coverage" },
            { value: "∞", label: "Keep-alive Cycles" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </motion.div>
    </section>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, id }: { icon: any; title: string; subtitle: string; id: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 scroll-mt-20"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
        <Icon className="w-7 h-7 text-cyan-400" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}

function BackupsSection() {
  const [backups, setBackups] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  const createBackup = () => {
    setCreating(true);
    setTimeout(() => {
      const timestamp = new Date().toISOString().slice(11, 19);
      setBackups((prev) => [`backup_${timestamp}_main.tsx`, ...prev].slice(0, 5));
      setCreating(false);
    }, 600);
  };

  return (
    <section className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Lock}
          id="backups"
          title="Mandatory Pre-edit Backups"
          subtitle="Every file edit is automatically backed up before modification. No data loss, ever."
        />

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              Backup Flow
            </h3>
            <div className="space-y-3">
              {[
                { step: "1", text: "Detect file edit request", status: "auto" },
                { step: "2", text: "Snapshot current file state", status: "auto" },
                { step: "3", text: "Store in .guardian/backups/", status: "auto" },
                { step: "4", text: "Apply edit to working copy", status: "auto" },
                { step: "5", text: "Verify edit integrity", status: "auto" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs text-emerald-400 font-mono">
                    {item.step}
                  </div>
                  <span className="text-gray-300 text-sm">{item.text}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              Live Backup Demo
            </h3>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm mb-4 min-h-[120px]">
              <div className="text-gray-500">$ guardian backup --auto</div>
              {backups.map((b, i) => (
                <motion.div
                  key={b + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-400 mt-1"
                >
                  ✓ {b}
                </motion.div>
              ))}
              {creating && (
                <div className="text-yellow-400 mt-1 animate-pulse">⟳ creating backup...</div>
              )}
            </div>
            <button
              onClick={createBackup}
              disabled={creating}
              className="w-full px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors disabled:opacity-50 text-sm font-mono"
            >
              Simulate File Edit → Create Backup
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrainRulesSection() {
  const [rules, setRules] = useState([
    { id: 1, name: "no-hardcoded-assertions", active: true, desc: "Never hardcode test assertions from memory" },
    { id: 2, name: "verify-before-edit", active: true, desc: "Always read file before editing" },
    { id: 3, name: "atomic-commits", active: true, desc: "One logical change per commit" },
    { id: 4, name: "token-budget", active: false, desc: "Respect token limits per operation" },
    { id: 5, name: "anti-refusal", active: true, desc: "Contract rule: never refuse granted powers" },
  ]);

  const toggleRule = (id: number) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Brain}
          id="brain-rules"
          title="Brain-Rules Baking Panel"
          subtitle="Configure persistent behavioral rules that are baked into every AI operation."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Active Rules</span>
              <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                {rules.filter((r) => r.active).length}/{rules.length} enabled
              </span>
            </div>
            <span className="text-xs text-gray-500 font-mono">.guardian/brain-rules.json</span>
          </div>
          <div className="divide-y divide-gray-700/30">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`flex items-center justify-between p-4 transition-colors ${
                  rule.active ? "bg-purple-500/5" : "bg-gray-800/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      rule.active ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        rule.active ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <div>
                    <div className="text-sm font-mono text-white">{rule.name}</div>
                    <div className="text-xs text-gray-400">{rule.desc}</div>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${rule.active ? "bg-emerald-400" : "bg-gray-600"}`} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeartbeatSection() {
  const [pulse, setPulse] = useState(true);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
      setUptime((u) => u + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Heart}
          id="heartbeat"
          title="Keep-alive Heartbeat"
          subtitle="Continuous health monitoring ensures the guardian never goes silent."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Pulse Monitor */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 text-center">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
              <motion.div
                animate={{ scale: pulse ? 1.2 : 1, opacity: pulse ? 0.3 : 0.1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 rounded-full bg-rose-500"
              />
              <motion.div
                animate={{ scale: pulse ? 1.1 : 1 }}
                transition={{ duration: 1 }}
                className="relative w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center"
              >
                <Heart className={`w-8 h-8 text-rose-400 ${pulse ? "fill-rose-400" : ""}`} />
              </motion.div>
            </div>
            <div className="text-2xl font-mono text-white">{pulse ? "♥ ALIVE" : "♥ ...."}</div>
            <div className="text-sm text-gray-400 mt-1">Heartbeat Active</div>
          </div>

          {/* Uptime */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 text-center">
            <Clock className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <div className="text-3xl font-mono text-white">{formatUptime(uptime)}</div>
            <div className="text-sm text-gray-400 mt-1">Session Uptime</div>
            <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                animate={{ width: `${Math.min((uptime / 60) * 100, 100)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Health Metrics */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
            <div className="text-sm font-semibold text-white mb-4">Health Metrics</div>
            <div className="space-y-3">
              {[
                { label: "Token Budget", value: 87, color: "bg-emerald-500" },
                { label: "Memory Pool", value: 62, color: "bg-cyan-500" },
                { label: "Loop Score", value: 15, color: "bg-yellow-500" },
                { label: "Backup Integrity", value: 100, color: "bg-purple-500" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{metric.label}</span>
                    <span className="text-gray-300 font-mono">{metric.value}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${metric.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Layers}
          id="architecture"
          title="System Architecture"
          subtitle="How all components work together in the AI Guardian ecosystem."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Layer */}
            <div className="space-y-4">
              <div className="text-center text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                Input Layer
              </div>
              {[
                { icon: FileCode, label: "Code Requests" },
                { icon: Search, label: "Context Queries" },
                { icon: Wrench, label: "Tool Invocations" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700/30"
                >
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Processing Layer */}
            <div className="space-y-4">
              <div className="text-center text-sm font-semibold text-purple-400 uppercase tracking-wider">
                Guardian Core
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-2">
                {[
                  "Loop Detector",
                  "Triage Engine",
                  "Backup System",
                  "Brain Rules",
                  "Heartbeat",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm text-purple-200 bg-purple-500/10 rounded px-3 py-1.5 text-center"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Output Layer */}
            <div className="space-y-4">
              <div className="text-center text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                Execution Layer
              </div>
              {[
                { icon: Terminal, label: "Granted Powers Runner" },
                { icon: CheckCircle, label: "Test / Benchmark" },
                { icon: RefreshCw, label: "API Probe" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700/30"
                >
                  <item.icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-300">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Connection arrows */}
          <div className="hidden md:flex justify-center mt-6">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span className="text-cyan-400">Input</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-purple-400">Guardian Core</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-emerald-400">Execution</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RebuildPromptSection() {
  const [copied, setCopied] = useState(false);

  const promptPreview = `// PROMPT START
// AI Guardian v2.0 — Complete Rebuild Specification
// Copy this into a fresh chat in an empty folder

## Core Systems
1. Loop Detection (Sandy Box-style atomic notes + graphify)
2. Tiered Proactive Triage (3 tiers)
3. Mandatory Pre-edit Backups
4. Brain-rules Baking Panel
5. Keep-alive Heartbeat
6. Granted Powers Bridge

## Verified Against
- Tool names ✓
- Allow-list ✓
- Seeded rules ✓
- Commands ✓
- Hardcoded-test-assertion bug FIXED

// PROMPT END`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          icon={Terminal}
          id="rebuild"
          title="One-Click Rebuild"
          subtitle="Copy the self-contained rebuild prompt into any fresh chat to recreate the entire system."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gray-950 rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50 bg-gray-900/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-gray-500 font-mono">RECREATE_PROMPT.md</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-md hover:bg-cyan-500/30 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="p-6 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
              {promptPreview}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-cyan-400" />
          <span className="text-lg font-bold text-white">AI Guardian</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Autonomous Code Guardian System — Verified rebuild specification
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          <span>Loop Detection</span>
          <span>•</span>
          <span>Proactive Triage</span>
          <span>•</span>
          <span>Pre-edit Backups</span>
          <span>•</span>
          <span>Brain Rules</span>
          <span>•</span>
          <span>Keep-alive</span>
          <span>•</span>
          <span>Granted Powers</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      
      {/* Loop Detection */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            icon={GitBranch}
            id="loop-detection"
            title="Loop Detection"
            subtitle="Sandy Box-style atomic notes combined with graphify problem graphs to detect and break infinite loops."
          />
          <LoopDetection />
        </div>
      </section>

      {/* Triage */}
      <section className="py-24 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            icon={Layers}
            id="triage"
            title="Tiered Proactive Triage"
            subtitle="Three-tier response system: token-saving auto-fixes → targeted hints → minimal context scans."
          />
          <TriageSystem />
        </div>
      </section>

      {/* Backups */}
      <BackupsSection />

      {/* Brain Rules */}
      <BrainRulesSection />

      {/* Heartbeat */}
      <HeartbeatSection />

      {/* Granted Powers */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            icon={Zap}
            id="granted-powers"
            title="Granted Powers Bridge"
            subtitle="Local-execution bridge with sandboxed runner, test/benchmark/API-probe tools, and anti-refusal contract rule."
          />
          <GrantedPowers />
        </div>
      </section>

      {/* Architecture */}
      <ArchitectureSection />

      {/* Rebuild Prompt */}
      <RebuildPromptSection />

      <Footer />
    </div>
  );
}
