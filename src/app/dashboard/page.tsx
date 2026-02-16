"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Orb } from "@/components/OrbVisualization";
import { ProofCertificate } from "@/components/ProofCertificate";
import { 
  ShieldCheck, 
  Database, 
  Cpu, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Lock,
  Wifi,
  Scale,
  BrainCircuit,
  Terminal as TerminalIcon,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "idle" | "consensus" | "zk_proving" | "minting" | "bridging" | "success";

export default function GreenProofDashboard() {
  const [step, setStep] = useState<Step>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [consensusStates, setConsensusStates] = useState({
    iot: false,
    legal: false,
    ethical: false,
  });
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-8), msg]);
  };

  useEffect(() => {
    setMounted(true);
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  if (!mounted) return null;

  const startDemo = async () => {
    setStep("consensus");
    addLog("Initializing Triple Oracle Consensus...");
    
    await new Promise(r => setTimeout(r, 1000));
    setConsensusStates(s => ({ ...s, iot: true }));
    addLog("Physical Core: VALIDATED [Sepolia Node 04]");
    
    await new Promise(r => setTimeout(r, 800));
    setConsensusStates(s => ({ ...s, legal: true }));
    addLog("Juridical Core: VALIDATED [Hash: 0x72...f93]");
    
    await new Promise(r => setTimeout(r, 1200));
    setConsensusStates(s => ({ ...s, ethical: true }));
    addLog("Ethical Core: ALIGNMENT SECURED [Sovereign Anchor]");

    await new Promise(r => setTimeout(r, 1000));
    setStep("zk_proving");
    addLog("Initiating ZK-Membrane Synthesis...");

    // Simulate ZK Proving
    await new Promise(r => setTimeout(r, 1000));
    addLog("Constraint Logic: score >= 80 verified by Circom.");
    await new Promise(r => setTimeout(r, 1000));
    addLog("Generating Private Witness [groth16]...");
    await new Promise(r => setTimeout(r, 1000));
    addLog("ZK-Proof generated: Anonymity level 100%.");
    
    setStep("minting");
    addLog("On-Chain Settlement: Minting GreenProof-NFT...");

    // Simulate On-chain Minting
    await new Promise(r => setTimeout(r => r, 2000));
    addLog("Sepolia TX Confirmed: NFT #GP-4022 Secured.");
    setStep("bridging");
    addLog("Interoperability Layer: CCIP Bridge Protocol Active...");

    // Simulate CCIP Bridging
    await new Promise(r => setTimeout(r, 2000));
    addLog("Synchronization: Asset settled on Avalanche Fuji.");
    setStep("success");
    addLog("MASTER SUCCESS: The Proof is Sovereign.");
  };

  return (
    <main className="min-h-screen bg-[#041a0d] text-[#f0fdf4] selection:bg-green-500/30 overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Institutional Nav */}
      <nav className="relative z-10 border-b border-white/5 px-8 py-5 flex items-center justify-between backdrop-blur-2xl bg-black/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-green-500 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6 text-green-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter glow-text">GREENPROOF</span>
            <span className="text-[10px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Sovereign Compliance</span>
          </div>
        </Link>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <div className="hidden md:flex items-center gap-2 text-green-400">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span>Sepolia Active</span>
          </div>
           <Link href="/architecture" className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold">
            Docs
          </Link>
          <Link href="/verify" className="px-6 py-2.5 bg-green-500 text-green-950 rounded-xl hover:bg-green-400 transition-all font-black shadow-lg shadow-green-500/20">
            Portal
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Content: Narrative */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-black uppercase tracking-widest"
            >
              <Zap className="w-4 h-4" />
              Institutional RWA Infrastructure
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter"
            >
              The Sovereign <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Protocol of Truth.</span>
            </motion.h1>

            {/* Institutional Seal Integration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-start pt-2"
            >
              <div className="relative w-20 h-20 rounded-full border border-green-500/20 bg-green-500/5 p-1 flex items-center justify-center overflow-hidden group shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent animate-pulse" />
                <Image 
                  src="/assets/branding/institutional_seal.png" 
                  alt="GreenProof Institutional Seal" 
                  width={64}
                  height={64}
                  className="object-contain filter contrast-125 brightness-110"
                />
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-green-100/60 max-w-xl font-medium leading-relaxed"
            >
              The world's first biocybernetic consensus engine. Synchronizing physical, legal, and ethical reality through Chainlink CRE and ZK-privacy.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6"
          >
            {step === "idle" ? (
              <button 
                onClick={startDemo}
                className="group px-10 py-5 bg-green-500 text-green-950 font-black rounded-2xl flex items-center gap-3 hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(34,197,94,0.4)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                Execute Sovereign Demo
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="px-8 py-5 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-5">
                <div className="animate-spin w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full" />
                <span className="font-mono text-green-400 font-black uppercase tracking-widest text-sm">Orchestrating Reality</span>
              </div>
            )}
          </motion.div>

          {/* Institutional Tech Stack */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
            {[
              { icon: Cpu, label: "Core", val: "Chainlink CRE" },
              { icon: Lock, label: "Privacy", val: "ZK-SNARKs" },
              { icon: Wifi, label: "Network", val: "Multi-Chain" }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 text-green-500">
                  <item.icon className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
                <div className="text-lg font-bold">{item.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: The Machine */}
        <div className="lg:col-span-5 space-y-8">
          <AnimatePresence mode="wait">
            {/* 3D Visualization Layer */}
            <motion.div 
               key={step}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               className="glass-card p-10 rounded-[3rem] aspect-square flex items-center justify-center relative overflow-hidden"
            >
              {step === "idle" && (
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-green-500/5 flex items-center justify-center border border-green-500/20 animate-pulse">
                    <Database className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black">Ready for Ingestion</h3>
                  <p className="text-green-100/40 text-sm max-w-[200px]">Awaiting triple-oracle data streams.</p>
                </div>
              )}

              {step === "consensus" && (
                <div className="grid grid-cols-1 gap-12 items-center justify-center">
                  <div className="flex justify-center gap-4 relative">
                    <Orb color="#4ade80" active={consensusStates.iot} speed={2} />
                    <Orb color="#34d399" active={consensusStates.legal} speed={1.2} />
                    <Orb color="#10b981" active={consensusStates.ethical} speed={1.8} />
                  </div>
                  <div className="text-center space-y-2">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-green-500">Trinity Nucleus Consensus</h4>
                    <div className="flex justify-center gap-3">
                       <Scale className={`w-5 h-5 ${consensusStates.iot ? 'text-green-400' : 'text-white/10'}`} />
                       <BrainCircuit className={`w-5 h-5 ${consensusStates.legal ? 'text-green-400' : 'text-white/10'}`} />
                       <Lock className={`w-5 h-5 ${consensusStates.ethical ? 'text-green-400' : 'text-white/10'}`} />
                    </div>
                  </div>
                </div>
              )}

              {step === "zk_proving" && (
                <div className="w-full space-y-8">
                  <div className="flex justify-between items-center px-4">
                    <span className="text-xs font-black uppercase tracking-widest text-green-400">ZK-SNARK Membrane</span>
                    <ShieldCheck className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="relative h-24 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-32 h-32 border-2 border-green-500/30 rounded-3xl"
                    />
                    <Lock className="w-10 h-10 text-green-400 glow-text" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: "100%" }}
                         transition={{ duration: 4 }}
                         className="h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                       />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-green-500 uppercase">
                       <span>Generating Proof</span>
                       <span className="animate-pulse">Active</span>
                    </div>
                  </div>
                </div>
              )}

              {(step === "minting" || step === "bridging" || step === "success") && (
                <div className="flex flex-col items-center gap-8">
                   <motion.div 
                    animate={step === "success" ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                    className={`w-40 h-56 rounded-[2rem] ${step === "success" ? 'bg-green-500' : 'bg-white/5'} flex flex-col p-6 items-center justify-between border-2 ${step === "success" ? 'border-green-400 shadow-[0_30px_60px_rgba(34,197,94,0.4)]' : 'border-white/10'}`}
                   >
                      <div className="w-full flex justify-between items-start">
                        <ShieldCheck className={step === "success" ? "text-green-950" : "text-green-500"} />
                        <div className={`px-2 py-0.5 rounded text-[8px] font-bold ${step === "success" ? 'bg-green-950 text-green-500' : 'bg-green-500/10 text-green-500'}`}>ZK-CERT</div>
                      </div>
                      <Database className={`w-16 h-16 ${step === "success" ? "text-green-950" : "text-white/10"}`} />
                      <div className="w-full text-center">
                        <div className={`text-[10px] font-black ${step === "success" ? "text-green-950" : "text-green-500"}`}>#GP-4022</div>
                        <div className={`text-[8px] font-bold uppercase tracking-widest ${step === "success" ? "text-green-900/60" : "text-white/20"}`}>Verified Compliance</div>
                      </div>
                   </motion.div>

                   {step === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-4 w-full max-w-sm mt-4"
                    >
                      <button className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-green-950 font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_20px_40px_rgba(34,197,94,0.3)]">
                        View on Sepolia Explorer
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowCertificate(true)}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10"
                      >
                        <FileText className="w-4 h-4 text-green-400" />
                        Institutional Proof Certificate
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ZK-Terminal Log */}
          <div className="glass-card rounded-[2rem] p-6 h-48 overflow-hidden relative group">
             <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <TerminalIcon className="w-4 h-4 text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500">Protocol Live Logs</span>
             </div>
              <div className="space-y-2 font-mono text-[11px] text-green-200/40" translate="no">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -5 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 ${i === logs.length - 1 ? 'text-green-400 font-bold' : ''}`}
                  >
                    <span className="opacity-50 tracking-tighter">[{mounted ? new Date().toLocaleTimeString() : "00:00:00"}]</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
                <div ref={terminalEndRef} />
              </div>
             {logs.length === 0 && (
               <div className="absolute inset-0 flex items-center justify-center opacity-10 font-mono text-xs uppercase tracking-[0.5em]">
                 Awaiting Input
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Technical Deep Dive Section (The "Substance") */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24 space-y-20 border-t border-white/5">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Imersão Técnica</h2>
          <p className="text-green-100/40 leading-relaxed text-lg">
            A arquitetura do GreenProof baseia-se em três pilares de realidade objetiva, coordenados pelo Chainlink CRE e protegidos por ZK-SNARKs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-[2rem] space-y-6 overflow-hidden border border-white/5"
          >
            <div className="flex items-center gap-3 text-green-400">
              <BrainCircuit className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Arquitetura do Protocolo</span>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 group">
              <Image 
                src="/assets/technical/protocol_architecture_elite.png" 
                alt="Arquitetura" 
                fill
                className="object-contain opacity-95 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <p className="text-xs text-green-100/30 leading-relaxed">
              Visualize a orquestração em múltiplas camadas entre sensores IoT, nós Jurídicos e motores de pontuação de impacto.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-[2rem] space-y-6 overflow-hidden border border-white/5"
          >
            <div className="flex items-center gap-3 text-green-400">
              <Cpu className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Fluxo de Trabalho Mestre CRE</span>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 group">
              <Image 
                src="/assets/technical/cre_workflow_elite.png" 
                alt="Workflow" 
                fill
                className="object-contain opacity-95 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <p className="text-xs text-green-100/30 leading-relaxed">
              Mapeamento de alta densidade da lógica de orquestração CRE Chainlink usada para verificar alegações institucionais de ESG.
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-20 flex justify-center opacity-20 border-t border-white/5 bg-black/5">
          <div className="flex items-center gap-8">
            <span className="text-[9px] font-bold tracking-[0.8em] uppercase">Symmetry</span>
            <span className="text-[9px] font-bold tracking-[0.8em] uppercase">Logic</span>
            <span className="text-[9px] font-bold tracking-[0.8em] uppercase">Sovereignty</span>
          </div>
      </footer>

      {/* Institutional Proof Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <ProofCertificate onClose={() => setShowCertificate(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function BoxIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
