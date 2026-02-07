"use client";

import { useState, useEffect } from "react";
import { Orb } from "@/components/OrbVisualization";
import { 
  ShieldCheck, 
  Database, 
  Cpu, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "idle" | "consensus" | "zk_proving" | "minting" | "bridging" | "success";

export default function GreenProofDashboard() {
  const [step, setStep] = useState<Step>("idle");
  const [consensusStates, setConsensusStates] = useState({
    iot: false,
    llm: false,
    audit: false,
  });

  const startDemo = async () => {
    setStep("consensus");
    
    // Simulate Triple Oracle Consensus
    await new Promise(r => setTimeout(r, 1000));
    setConsensusStates(s => ({ ...s, iot: true }));
    await new Promise(r => setTimeout(r, 800));
    setConsensusStates(s => ({ ...s, llm: true }));
    await new Promise(r => setTimeout(r, 1200));
    setConsensusStates(s => ({ ...s, audit: true }));

    await new Promise(r => setTimeout(r, 1000));
    setStep("zk_proving");

    // Simulate ZK Proving
    await new Promise(r => setTimeout(r, 3000));
    setStep("minting");

    // Simulate On-chain Minting
    await new Promise(r => setTimeout(r, 2000));
    setStep("bridging");

    // Simulate CCIP Bridging
    await new Promise(r => setTimeout(r, 2000));
    setStep("success");
  };

  return (
    <main className="min-h-screen bg-[#052e16] text-[#f0fdf4] selection:bg-green-500/30 overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 border-b border-green-500/10 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-green-950/20">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-500 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-green-950" />
          </div>
          <span className="font-bold text-xl tracking-tight">GREENPROOF</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-green-300">
          <span className="px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5">Sepolia Connected</span>
          <button className="px-4 py-2 bg-green-500 text-green-950 rounded-full hover:bg-green-400 transition-colors">Launch App</button>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold"
            >
              <Zap className="w-4 h-4" />
              Chainlink Convergence 2026
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold leading-tight"
            >
              Prove ESG <span className="text-green-400">≥ 80%</span> <br />
              Privately.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-green-200/70 max-w-xl"
            >
              Anti-greenwashing protocol via Chainlink CRE + ZK + Triple Oracle Consensus. 
              Verify sustainability without leaking sensitive operational data.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {step === "idle" ? (
              <button 
                onClick={startDemo}
                className="group px-8 py-4 bg-green-500 text-green-950 font-bold rounded-2xl flex items-center gap-2 hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                Start ESG Verification 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 flex items-center gap-4">
                <div className="animate-pulse w-3 h-3 rounded-full bg-green-400" />
                <span className="font-mono text-green-400 uppercase tracking-widest">Protocol Active</span>
              </div>
            )}
          </motion.div>

          {/* Integration Badges */}
          <div className="flex gap-6 items-center pt-8 border-t border-green-500/10">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-green-500 font-bold">Orchestration</span>
              <span className="text-sm font-medium text-green-100">Chainlink CRE</span>
            </div>
            <div className="h-8 w-px bg-green-500/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-green-500 font-bold">Privacy</span>
              <span className="text-sm font-medium text-green-100">ZK-SNARKs</span>
            </div>
            <div className="h-8 w-px bg-green-500/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-green-500 font-bold">Interoperability</span>
              <span className="text-sm font-medium text-green-100">Chainlink CCIP</span>
            </div>
          </div>
        </div>

        {/* Right Dashboard / Demo Visuals */}
        <div className="lg:col-span-5 relative">
          <AnimatePresence mode="wait">
            {step === "idle" && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass p-8 rounded-[2.5rem] border-green-500/20 aspect-square flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center">
                  <Database className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">System Standby</h3>
                <p className="text-green-200/50">Awaiting entity identification for ESG scoring ingestion.</p>
              </motion.div>
            )}

            {step === "consensus" && (
              <motion.div 
                key="consensus"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-[2.5rem] bg-green-950/40 border border-green-500/20 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-lg tracking-tight">Triple Oracle Consensus</h3>
                    <div className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-mono">STEP 01</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-3">
                      <Orb color={consensusStates.iot ? "#4ade80" : "#14532d"} />
                      <span className="text-[10px] font-bold text-green-300">IoT Sensors</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Orb color={consensusStates.llm ? "#4ade80" : "#14532d"} />
                      <span className="text-[10px] font-bold text-green-300">LLM Scorer</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Orb color={consensusStates.audit ? "#4ade80" : "#14532d"} />
                      <span className="text-[10px] font-bold text-green-300">Audit Node</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                  <p className="text-xs text-green-200/60 leading-relaxed font-mono">
                    {`>`} Ingesting decentralized data feeds... <br />
                    {consensusStates.iot && `> Oracle 1: VALIDATED (92% humidity / 12kW pulse)\n`}
                    {consensusStates.llm && `> Oracle 2: VALIDATED (Sentiment analysis: 0.88 Positive)\n`}
                    {consensusStates.audit && `> Oracle 3: VALIDATED (Audit signature match)\n`}
                  </p>
                </div>
              </motion.div>
            )}

            {(step === "zk_proving" || step === "minting") && (
              <motion.div 
                key="zk"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-8 rounded-[2.5rem] border-green-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Cpu className="w-24 h-24" />
                </div>
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl tracking-tight">ZK Compute Engine</h3>
                    <div className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-mono">STEP 02</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-green-950/40 border border-green-500/10">
                      <span className="text-sm text-green-200">Private ESG Score</span>
                      <span className="font-mono text-green-400">HIDDEN</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-green-950/40 border border-green-500/10">
                      <span className="text-sm text-green-200">Constraint</span>
                      <span className="font-mono text-green-400">{`score >= 80`}</span>
                    </div>
                    <div className="h-2 w-full bg-green-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                        className="h-full bg-green-400"
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-green-500 uppercase">
                      <span>Proving...</span>
                      <span>10.2 GFLOPS</span>
                    </div>
                  </div>
                  
                  {step === "minting" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-green-400 text-green-950 font-bold"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      ZK VERIFIED: ESG ≥ 80%
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {step === "bridging" && (
              <motion.div 
                key="bridging"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 rounded-[2.5rem] border-green-500/20 flex flex-col items-center justify-center text-center space-y-6"
              >
                 <div className="w-20 h-20 rounded-[2rem] bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Zap className="w-10 h-10 text-blue-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">CCIP Interoperability</h3>
                  <p className="text-green-200/50">Bridging GreenProof from Sepolia to Fuji...</p>
                </div>
                <div className="w-full h-1 bg-blue-900 rounded-full overflow-hidden">
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-blue-400"
                    />
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-green-400 to-green-600 text-green-950 shadow-[0_20px_60px_rgba(34,197,94,0.4)]">
                   <div className="flex items-center justify-between mb-8">
                    <ShieldCheck className="w-12 h-12" />
                    <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest">Protocol Success</span>
                  </div>
                  <h3 className="text-3xl font-black mb-2 tracking-tight">GreenProof Verified</h3>
                  <p className="text-green-900/70 font-medium mb-6">Cerfitication successfully minted on Sepolia and bridged to Fuji.</p>
                  
                  <div className="flex gap-4">
                    <button className="flex-1 bg-green-950 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-900 transition-colors">
                      View on Etherscan <ExternalLink className="w-4 h-4" />
                    </button>
                    <button onClick={() => setStep("idle")} className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                      <Zap className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-green-500/5 border border-green-500/10 p-6 rounded-3xl">
                   <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <ChevronRight className="w-6 h-6" />
                   </div>
                   <div>
                    <h4 className="font-bold text-sm">Triple Oracle Log</h4>
                    <p className="text-xs text-green-200/50 italic">Consensus achieved with 100% data integrity.</p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center opacity-30 pointer-events-none">
         <span className="text-[10px] font-mono tracking-[0.5em] uppercase">Built for Chainlink Convergence 2026</span>
      </footer>
    </main>
  );
}
