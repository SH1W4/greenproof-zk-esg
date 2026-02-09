"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Cpu, 
  Network, 
  Database, 
  Zap, 
  Scale, 
  BrainCircuit, 
  Lock,
  Workflow
} from "lucide-react";

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#020c06] text-[#f0fdf4] selection:bg-green-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-[100] border-b border-white/5 px-8 py-5 flex items-center justify-between backdrop-blur-xl bg-[#020c06]/80">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5 text-green-950" />
          </div>
          <span className="font-black text-lg tracking-tighter">GREENPROOF</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-green-100/40 hover:text-green-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Protocol
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-8 pt-32 pb-24 space-y-24">
        {/* Header */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-green-500/60 text-[10px] font-black uppercase tracking-[0.3em]">
            Technical Documentation
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            PROTOCOL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-700 underline decoration-green-500/20 underline-offset-8">ARCHITECTURE</span>
          </h1>
          <p className="text-xl text-green-100/40 max-w-2xl leading-relaxed font-medium">
            Exploring the Hierarchical Autonomous Agent Swarm (HAAS) and the Trinity of Proof consensus mechanism.
          </p>
        </section>

        {/* The Master Diagram */}
        <section className="relative group">
          <div className="absolute inset-0 bg-green-500/5 blur-[120px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative glass-card rounded-[3rem] p-8 md:p-12 border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400">
                <Workflow className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest">CRE Master Workflow</h2>
            </div>
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/5 bg-black/40">
              <Image 
                src="/assets/technical/protocol_workflow_architecture.png" 
                alt="HAAS Master Architecture" 
                fill
                className="object-contain p-8 opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase text-green-400 tracking-tighter">I. Ingestion Layer</h3>
                <p className="text-sm text-green-100/30 leading-relaxed font-medium">
                  Autonomous sensors and satellite telemetry (GP-Physical) stream raw integrity signals directly to the CRE backbone.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase text-green-400 tracking-tighter">II. Cognitive Swarm</h3>
                <p className="text-sm text-green-100/30 leading-relaxed font-medium">
                  Specialized nuclei (GP-Juridical & GP-Ethical) perform parallel audits, leveraging the Internalized Rust Rule Engines.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase text-green-400 tracking-tighter">III. Settlement Layer</h3>
                <p className="text-sm text-green-100/30 leading-relaxed font-medium">
                  Consensus results are committed to Circom ZK circuits, triggering cross-chain NFT issuance via Sepolia-Fuji Bridge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Trinity Nuclei Deep Dive */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "GP-Physical",
              subtitle: "Reality Perception",
              icon: Zap,
              desc: "Ingests irreversible data from IoT sensors, satellite imagery, and on-site telemetric gateways.",
              tech: "Chainlink Functions"
            },
            {
              title: "GP-Juridical",
              subtitle: "Rule Enforcement",
              icon: Scale,
              desc: "Analyzes tax metadata, regulatory compliance, and legal frameworks via AI-NLP internal audits.",
              tech: "Rust Rule Engine"
            },
            {
              title: "GP-Ethical",
              subtitle: "Impact Oracle",
              icon: BrainCircuit,
              desc: "Evaluates governance metrics, social impact alignment, and ethical consensus scores.",
              tech: "Sovereign MAS"
            }
          ].map((core, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 relative group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <core.icon className="w-24 h-24" />
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl w-fit">
                <core.icon className="w-6 h-6 text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter uppercase">{core.title}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/60">{core.subtitle}</p>
              </div>
              <p className="text-sm text-green-100/30 leading-relaxed font-medium">
                {core.desc}
              </p>
              <div className="pt-4 flex items-center gap-2">
                <Cpu className="w-3 h-3 text-green-400/40" />
                <span className="text-[10px] font-mono text-green-400/40 uppercase font-bold">{core.tech}</span>
              </div>
            </motion.div>
          ))}
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
