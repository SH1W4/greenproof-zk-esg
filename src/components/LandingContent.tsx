"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  Database, 
  Scale, 
  BrainCircuit,
  Lock,
  FileText,
  Code,
  Terminal as TerminalIcon,
  Github,
  Zap,
  CheckCircle2,
  AlertTriangle,
  EyeOff,
  Network,
  BadgeCheck
} from "lucide-react";
import { Typewriter, TerminalCommand } from "./Typewriter";
import WorkflowDiagram from "./WorkflowDiagram";
import Navbar from "./Navbar";

export default function LandingContent() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress: sectionScroll } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const shieldScale = useTransform(sectionScroll, [0, 0.4, 0.6, 1], [0.85, 1, 1, 1.1]);
  const shieldOpacity = useTransform(sectionScroll, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const n1X = useTransform(sectionScroll, [0, 1], [-10, 10]);
  const n1Y = useTransform(sectionScroll, [0, 1], [-5, 5]);
  const n2X = useTransform(sectionScroll, [0, 1], [10, -10]);
  const n2Y = useTransform(sectionScroll, [0, 1], [-5, 5]);
  const n3Y = useTransform(sectionScroll, [0, 1], [15, -15]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#020c06] text-[#f0fdf4] selection:bg-green-500/30">
      {/* SECTION 0: HYDRATION OVERLAY */}
      <AnimatePresence>
        {!mounted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#020c06] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-green-500/10 border-t-green-500 rounded-full animate-spin" />
              <div className="text-[10px] font-black font-mono text-green-500/40 uppercase tracking-[0.3em]">
                Syncing Reality...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center pt-20 overflow-hidden">
        {/* Background Sophistication Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020c06_100%)] opacity-60" />
        </div>

        <div className="max-w-4xl space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-green-500/60 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Proof-of-Reality Infrastructure • Chainlink Convergence 2026 🏆
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            The Universal Protocol for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-700">Digital Trust</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-green-100/40 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Sovereign validation of Physical, Juridical, and Ethical reality. A modular framework starting with ESG, built for global RWA orchestration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
          >
            <Link href="/login" className="group px-10 py-5 bg-green-500 text-green-950 font-black rounded-2xl flex items-center gap-3 hover:bg-green-400 transition-all shadow-[0_20px_50px_rgba(34,197,94,0.15)]">
              Launch Protocol Terminal
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* 5-Step Flow Strip — GPT Suggestion #1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 pt-10 flex-wrap"
          >
            {[
              { label: "Real World Data", icon: "🛰️" },
              { label: "Trinity Consensus", icon: "⚡" },
              { label: "ZK Proof", icon: "🔐" },
              { label: "On-chain Certificate", icon: "🏛️" },
              { label: "Tokenized RWA", icon: "🌐" },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                  <span className="text-base">{step.icon}</span>
                  <span className="text-[9px] font-black font-mono text-green-500/50 uppercase tracking-widest whitespace-nowrap">{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-green-500/20 font-black">→</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CINEMATIC PARALLAX */}
      {/* SECTION 2: SOPHISTICATED CONSENSUS CORE */}
      <section ref={parallaxRef} className="relative h-screen flex items-center justify-center overflow-hidden border-y border-white/5 bg-[#020c06]">
        <motion.div 
          style={{ scale: shieldScale, opacity: shieldOpacity }}
          className="relative w-full max-w-4xl aspect-video flex items-center justify-center"
        >
          {/* Central Glow */}
          <div className="absolute inset-0 bg-green-500/5 blur-[140px] rounded-full scale-75 animate-pulse" />
          
          {/* Abstract Consensus Geometry */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Inner Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] border border-green-500/10 rounded-full flex items-center justify-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_15px_#17cf54]" />
            </motion.div>

            {/* Middle Ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] border border-green-500/5 rounded-full"
            >
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-1 h-1 bg-green-400/40 rounded-full" />
            </motion.div>

            {/* Outer Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute w-[600px] h-[600px] border border-green-500/5 rounded-full border-dashed"
            />

            {/* Core Shield */}
            <div className="relative z-10 p-12 rounded-full bg-green-500/[0.02] border border-green-500/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(34,197,94,0.05)]">
              <ShieldCheck className="w-24 h-24 text-green-500/80" />
            </div>
          </div>
        </motion.div>

        {/* Floating Data Labels */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ x: n1X, y: n1Y }}
            className="absolute top-[30%] left-[20%] px-4 py-2 bg-black/40 border border-white/5 rounded-lg backdrop-blur-md"
          >
            <span className="text-[10px] font-black font-mono text-green-500/40 uppercase tracking-[0.2em]">Data Pillar: Physical</span>
          </motion.div>
          <motion.div 
            style={{ x: n2X, y: n2Y }}
            className="absolute bottom-[30%] right-[20%] px-4 py-2 bg-black/40 border border-white/5 rounded-lg backdrop-blur-md"
          >
            <span className="text-[10px] font-black font-mono text-green-500/40 uppercase tracking-[0.2em]">Data Pillar: Juridical</span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: SYSTEM DIAGRAM */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="w-full">
            <WorkflowDiagram />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9]">
              Orquestração
              <br />
              <span className="text-green-500">Institucional</span>
            </h2>
            <p className="text-lg text-green-100/40 leading-relaxed">
              O GreenProof nasceu para resolver o greenwashing, mas nossa arquitetura de **Consenso Trinitário** foi desenhada para qualquer setor que exija prova de realidade inquestionável. Do ESG ao Supply Chain Industrial.
            </p>
            <div className="text-xl text-green-400 font-mono italic">
              <Typewriter 
                text='"SYNCING REALITY: Physical, Legal, and Ethical Consensus."' 
                delay={60}
              />
            </div>
            <Link href="/architecture" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors">
              Explore a Arquitetura <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE TERMINAL */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <TerminalCommand 
            commands={[
              "greenproof-cli init --sector universal --identity institutional",
              "[INFRA] Establishing biocybernetic node connection... DONE",
              "npx ts-node scripts/terminal-mint.ts --use-case esg-flagship",
              "[ZK] Generating SNARK proof for Multi-Pillar Compliance > 85%...",
              "✓ Proof Generated (Groth16) | Time: 0.42s",
              "[CCIP] Dispatching cross-chain RWA validation to Avalanche Fuji...",
              "✓ Protocol Consensus Achieved | NFT Minted: 0x3fcf...71b2"
            ]}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-20 border-t border-white/5 bg-black/60 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter">GREENPROOF</span>
              <span className="text-[9px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Sovereign Compliance</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-green-100/30">
            <Link href="#tech" className="hover:text-green-500 transition-colors">Technology</Link>
            <Link href="#docs" className="hover:text-green-500 transition-colors">Documentation</Link>
            <Link href="https://github.com/SH1W4/greenproof-zk-esg" target="_blank" className="hover:text-green-500 transition-colors">GitHub</Link>
          </div>

          <div className="text-[10px] text-green-100/10 font-mono font-bold uppercase tracking-widest">
            © 2026 GreenProof · Institutional Consensus
          </div>
        </div>
      </footer>
    </main>
  );
}
