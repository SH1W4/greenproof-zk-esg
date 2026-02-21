"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  Lock,
  Share2
} from "lucide-react";

export default function WorkflowDiagram() {
  return (
    <div className="relative w-full aspect-video bg-[#05150a]/50 border border-green-500/10 rounded-3xl overflow-hidden p-6 backdrop-blur-xl">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(circle at 2px 2px, #22c55e 1px, transparent 0)`,
        backgroundSize: '32px 32px' 
      }} />

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450" preserveAspectRatio="none">
        <defs>
          <linearGradient id="energy-flow-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="energy-flow-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Row 1 connectors */}
        <motion.line x1="170" y1="120" x2="290" y2="120" stroke="url(#energy-flow-h)" strokeWidth="2" strokeDasharray="6 4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} />
        <motion.line x1="410" y1="120" x2="530" y2="120" stroke="url(#energy-flow-h)" strokeWidth="2" strokeDasharray="6 4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} />

        {/* Row 1 to Consensus */}
        <motion.path d="M 630,120 Q 680,225 632,280" fill="none" stroke="#22c55e" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 1.5, repeat: Infinity, repeatDelay: 2 }} />

        {/* Consensus to Row 3 */}
        <motion.path d="M 600,320 Q 480,370 410,330" fill="none" stroke="#22c55e" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatDelay: 2 }} />
        <motion.line x1="170" y1="330" x2="290" y2="330" stroke="url(#energy-flow-h)" strokeWidth="2" strokeDasharray="6 4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} />
      </svg>

      {/* Main layout: 3-column grid */}
      <div className="relative w-full h-full flex flex-col justify-between py-4">
        
        {/* Row 1: Ingestion & Processing */}
        <div className="flex items-center justify-between w-[82%]">
          <DiagramNode icon={Database} label="INGESTÃO DE IOT" status="VIVER" delay={0} />
          <div className="flex-1 h-px bg-green-500/15 mx-2" />
          <DiagramNode icon={BrainCircuit} label="LÓGICA DE IA/LLM" status="PROCESSAMENTO" delay={0.2} />
          <div className="flex-1 h-px bg-green-500/15 mx-2" />
          <DiagramNode icon={Lock} label="GROTH16 À PROVA DE ZK" status="GERAÇÃO" delay={0.4} />
        </div>

        {/* Row 2: Trinity Consensus — anchored to the right, fully contained */}
        <div className="flex justify-end w-full pr-4">
          <div className="relative group">
            <div className="absolute -inset-4 bg-green-500/20 blur-xl rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
            <DiagramNode 
              icon={ShieldCheck} 
              label="CONSENSO DA TRINDADE" 
              status="SINCRONIZADO" 
              highlight 
              delay={0.6} 
            />
            {/* Trinity Dots */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_blue]" />
              <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_red]" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_6px_yellow]" />
            </div>
          </div>
        </div>

        {/* Row 3: Settlement & Distribution */}
        <div className="flex items-center justify-between w-[55%]">
          <DiagramNode icon={Zap} label="MINT DE NFT SOBERANO" status="FINALIZANDO" delay={0.8} />
          <div className="flex-1 h-px bg-green-500/15 mx-2" />
          <DiagramNode icon={Share2} label="CCIP CROSS-CHAIN" status="DESPACHANDO" delay={1.0} />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-5 flex items-center gap-2 text-[9px] font-mono text-green-500/30 uppercase tracking-[0.2em]">
        <ShieldCheck className="w-3 h-3" />
        STATUS: ORQUESTRAÇÃO INSTITUCIONAL ATIVA
      </div>
    </div>
  );
}

function DiagramNode({ 
  icon: Icon, 
  label, 
  status, 
  highlight = false,
  delay = 0 
}: { 
  icon: any, 
  label: string, 
  status: string,
  highlight?: boolean,
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all shrink-0 ${
        highlight 
          ? 'bg-green-500/10 border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.2)]' 
          : 'bg-black/40 border-white/5 hover:border-green-500/30'
      }`}
    >
      <div className={`p-2.5 rounded-xl ${highlight ? 'bg-green-500 text-green-950' : 'bg-green-500/10 text-green-500'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-white/90 max-w-[80px] leading-tight">{label}</span>
        <span className={`text-[7px] font-mono font-bold mt-1 ${highlight ? 'text-green-400' : 'text-green-500/40'}`}>
          ● {status}
        </span>
      </div>
    </motion.div>
  );
}
