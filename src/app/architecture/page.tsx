"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Workflow,
  Lock,
  Zap,
  Scale,
  BrainCircuit,
  Cpu,
  Network
} from "lucide-react";

import Navbar from "@/components/Navbar";
import ProtocolDiagram from "@/components/ProtocolDiagram";
import CircuitPreview from "@/components/CircuitPreview";
import ArchitectLayer from "@/components/ArchitectLayer";
import ConsensusMonitor from "@/components/ConsensusMonitor";

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#020c06] text-[#f0fdf4] selection:bg-green-500/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 pt-32 pb-24 space-y-32">
        {/* Header */}
        <section className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-green-500/60 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Technical Documentation v3.1.1
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              PROTOCOL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-700 underline decoration-green-500/20 underline-offset-8">ARCHITECTURE</span>
            </h1>
            <p className="text-xl text-green-100/40 max-w-2xl leading-relaxed font-medium">
              Exploring the Hierarchical Autonomous Agent Swarm (HAAS) and the Trinity of Proof consensus mechanism.
            </p>
          </div>
        </section>

        {/* The Master Diagram - Now Living SVG */}
        <section className="relative group space-y-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400">
                <Workflow className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest">Protocol Flow Engine</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest">Live Consensus Simulation</span>
            </div>
          </div>
          
          <ProtocolDiagram />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: "01",
                title: "Reality Ingestion", 
                desc: "GP-Physical nodes ingest raw telematic pulses from IoT gateways, while Juridical and Ethical nuclei stream compliance metadata via specialized lib/engines adapters." 
              },
              { 
                step: "02",
                title: "Cognitive Audit", 
                desc: "GP-Juridical and GP-Ethical nuclei perform dual-agent verification using vectorized rule engines." 
              },
              { 
                step: "03",
                title: "ZK-Settlement", 
                desc: "Results are hashed into private signals and sent to the Groth16 circuit for irreversible on-chain proof." 
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="text-[10px] font-black text-green-500/40 font-mono tracking-widest">STAGE_{item.step}</div>
                <h3 className="text-lg font-black uppercase text-green-100 tracking-tighter">{item.title}</h3>
                <p className="text-sm text-green-100/30 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Agentic Intelligence Layer (GP-Architect) */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <BrainCircuit className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-widest text-green-100">Agentic Intelligence Layer</h2>
          </div>
          <ArchitectLayer />
        </section>

        {/* ZK Specification Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase">ZK-Privacy Layer</h2>
              <p className="text-lg text-green-100/40 leading-relaxed font-medium">
                Our Circom-based circuits ensure that while compliance is publicly verifiable, the underlying sensitive corporate data remains encrypted and private.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { label: "Circuit Type", value: "Groth16 ZK-SNARK" },
                { label: "Complexity", value: "Level 4 Integrity Check" },
                { label: "Gas Efficiency", value: "Optimized O(1) Verification" }
              ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-white/30">{spec.label}</span>
                  <span className="text-sm font-mono text-green-400 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          <CircuitPreview />
        </section>

        {/* Real-time Orchestration HUD */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-widest">Real-time Ingestion Mastery</h2>
          </div>
          <div className="space-y-6">
            <p className="text-green-100/40 max-w-2xl leading-relaxed font-medium">
              This HUD visualizes the live data flow from objective reality through the GP-Architect HAAS Orchestrator, culminating in decentralized ZK-Settlement.
            </p>
            <ConsensusMonitor />
          </div>
        </section>

        {/* The Trinity Nuclei Deep Dive */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-3xl font-black uppercase tracking-widest">Consensus Nuclei</h2>
             <p className="text-green-100/20 text-sm max-w-lg mx-auto uppercase tracking-widest font-bold">The Three Pillars of Objective Truth</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "GP-Physical",
                subtitle: "Telemetric Audit",
                icon: Zap,
                desc: "Ingests irreversible data from IoT sensors and satellite imagery via secure Chainlink Functions.",
                tech: "TELEMETRY_NUCLEUS",
                color: "group-hover:text-amber-400"
              },
              {
                title: "GP-Juridical",
                subtitle: "Legislative Audit",
                icon: Scale,
                desc: "Analyzes regulatory compliance and tax metadata via specialized AI rule-engine nuclei.",
                tech: "REGULATORY_NUCLEUS",
                color: "group-hover:text-blue-400"
              },
              {
                title: "GP-Ethical",
                subtitle: "Governance Audit",
                icon: BrainCircuit,
                desc: "Evaluates ESG impact scores and institutional alignment via Sovereign MAS consensus.",
                tech: "SOVEREIGN_NUCLEUS",
                color: "group-hover:text-purple-400"
              }
            ].map((core, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 relative group bg-white/2"
              >
                <div className={`p-4 bg-white/5 border border-white/10 rounded-2xl w-fit transition-colors ${core.color}`}>
                  <core.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tighter uppercase">{core.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/60">{core.subtitle}</p>
                </div>
                <p className="text-sm text-green-100/30 leading-relaxed font-medium">
                  {core.desc}
                </p>
                <div className="pt-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-green-400/40 uppercase font-bold">{core.tech}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CCIP & Interoperability Section */}
        <section className="glass-card rounded-[3rem] p-12 overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter uppercase">Chain-Agnostic Integrity</h2>
                <p className="text-green-100/40 leading-relaxed">
                  GreenProof utilizes Chainlink CCIP to ensure that ESG credentials are not siloed. A successful verification on Sepolia creates a portable asset that can be seamlessly bridged to Avalanche, Polygon, or Ethereum Mainnet without losing its cryptographic proof pedigree.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-center flex-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-green-500/60 mb-1">Source</div>
                  <div className="text-sm font-bold">Ethereum Sepolia</div>
                </div>
                <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-center flex-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-green-500/60 mb-1">Target</div>
                  <div className="text-sm font-bold">Avalanche Fuji</div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative aspect-square w-full max-w-sm">
              <div className="absolute inset-0 bg-green-500/10 blur-[80px] rounded-full animate-pulse" />
              <div className="relative w-full h-full border border-green-500/20 rounded-full flex items-center justify-center p-8">
                <Network className="w-full h-full text-green-500/20" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t border-green-500/40 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer CTA */}
      <footer className="border-t border-white/5 px-8 py-20 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-black tracking-tighter uppercase">Ready to audit?</h3>
            <p className="text-green-100/40 max-w-md">
              Access the live terminal and verify objective reality today.
            </p>
          </div>
          <Link href="/login" className="px-12 py-5 bg-green-500 text-green-950 font-black rounded-2xl hover:bg-green-400 transition-all shadow-xl shadow-green-500/20 hover:scale-105 active:scale-95 whitespace-nowrap">
            Launch Terminal
          </Link>
        </div>
      </footer>
    </main>
  );
}
