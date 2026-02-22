"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  Lock,
  Share2,
  Cpu
} from "lucide-react";

export default function WorkflowDiagram() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="relative w-full aspect-[16/10] bg-[#05150a]/40 border border-green-500/10 rounded-3xl" />;
  }

  return (
    <div className="relative w-full aspect-[16/10] bg-[#05150a]/40 border border-green-500/10 rounded-3xl overflow-hidden p-8 backdrop-blur-2xl">
      {/* Dynamic Techno Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `linear-gradient(to right, #22c55e 1px, transparent 1px), linear-gradient(to bottom, #22c55e 1px, transparent 1px)`,
        backgroundSize: '40px 40px' 
      }} />

      {/* SVG Canvas for Orchestration Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connections from Inputs to CRE (Center) */}
        {/* Nucleo I -> CRE */}
        <motion.path d="M 180,120 L 400,250" stroke="#22c55e" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        <circle r="3" fill="#22c55e">
          <animateMotion dur="3s" repeatCount="Infinity" path="M 180,120 L 400,250" />
        </circle>

        {/* Nucleo II -> CRE */}
        <motion.path d="M 180,250 L 400,250" stroke="#22c55e" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        <circle r="3" fill="#22c55e">
          <animateMotion dur="2.5s" repeatCount="Infinity" path="M 180,250 L 400,250" />
        </circle>

        {/* Nucleo III -> CRE */}
        <motion.path d="M 180,380 L 400,250" stroke="#22c55e" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        <circle r="3" fill="#22c55e">
          <animateMotion dur="4s" repeatCount="Infinity" path="M 180,380 L 400,250" />
        </circle>

        {/* CRE -> Outputs */}
        {/* CRE -> NFT */}
        <motion.path d="M 400,250 L 620,180" stroke="#22c55e" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        <circle r="3" fill="#22c55e">
          <animateMotion dur="2s" repeatCount="Infinity" path="M 400,250 L 620,180" />
        </circle>

        {/* CRE -> CCIP */}
        <motion.path d="M 400,250 L 620,320" stroke="#22c55e" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        <circle r="3" fill="#22c55e">
          <animateMotion dur="3.5s" repeatCount="Infinity" path="M 400,250 L 620,320" />
        </circle>
      </svg>

      <div className="relative h-full w-full flex items-center justify-between">
        {/* INPUTS COLUMN */}
        <div className="flex flex-col gap-12">
          <DiagramNode icon={Database} label="NÚCLEO I" sub="IoT / Física" delay={0.1} />
          <DiagramNode icon={BrainCircuit} label="NÚCLEO II" sub="IA Jurídica" delay={0.3} />
          <DiagramNode icon={Lock} label="NÚCLEO III" sub="ZK Ético" delay={0.5} />
        </div>

        {/* CENTER HUB: THE ORCHESTRATOR */}
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-40 h-40 flex items-center justify-center"
          >
            {/* Pulsing Rings */}
            <div className="absolute inset-0 border-2 border-green-500/20 rounded-full animate-ping" />
            <div className="absolute inset-4 border border-green-500/30 rounded-full animate-pulse" />
            
            {/* Core Component */}
            <div className="relative z-10 w-24 h-24 bg-green-500/20 backdrop-blur-3xl border-2 border-green-500 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
              <Cpu className="w-8 h-8 text-green-400" />
              <div className="text-[10px] font-black font-mono text-green-400 tracking-tighter">CRE ENGINE</div>
            </div>
            
            <div className="absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.3em] text-green-500/80">
              Motor de Orquestração
            </div>
          </motion.div>
        </div>

        {/* OUTPUTS COLUMN */}
        <div className="flex flex-col gap-16">
          <DiagramNode icon={Zap} label="NFT SOBERANO" sub="Verificado" variant="highlight" delay={0.7} />
          <DiagramNode icon={Share2} label="SYNC CCIP" sub="Cross-Chain" variant="highlight" delay={0.9} />
        </div>
      </div>

      {/* Legend Footer */}
      <div className="absolute bottom-4 left-6 flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse delay-75" />
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse delay-150" />
        </div>
        <span className="text-[9px] font-mono text-green-500/50 uppercase tracking-widest">
          SISTEMA DE ORQUESTRAÇÃO INSTITUCIONAL ATIVO
        </span>
      </div>
    </div>
  );
}

function DiagramNode({ 
  icon: Icon, 
  label, 
  sub,
  variant = "default",
  delay = 0 
}: { 
  icon: any, 
  label: string, 
  sub: string,
  variant?: "default" | "highlight",
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative group flex items-center gap-4 p-4 rounded-xl border transition-all ${
        variant === "highlight" 
          ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
          : 'bg-black/60 border-white/5 hover:border-green-500/20'
      }`}
    >
      <div className={`p-2 rounded-lg bg-black/40 border border-white/10 ${variant === "highlight" ? 'text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'text-green-500/60'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/90 leading-none">{label}</span>
        <span className="text-[8px] font-mono font-bold text-green-500/40 uppercase mt-1 tracking-tighter">{sub}</span>
      </div>
      
      {/* Hover decoration */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-green-500 transition-all group-hover:h-1/2" />
    </motion.div>
  );
}
