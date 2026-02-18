"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  Network,
  Cpu,
  Lock,
  Share2
} from "lucide-react";

const nodes = [
  { id: "iot", icon: Database, label: "IoT Sensors", color: "text-blue-400", pos: "left-0 top-[20%]" },
  { id: "ai", icon: BrainCircuit, label: "AI Reasoning", color: "text-purple-400", pos: "left-[25%] top-[20%]" },
  { id: "zk", icon: Lock, label: "ZK-SNARK", color: "text-emerald-400", pos: "left-[50%] top-[20%]" },
  { id: "trinity", icon: ShieldCheck, label: "Trinity Consensus", color: "text-green-500", pos: "left-[75%] top-[50%] scale-150" },
  { id: "mint", icon: Zap, label: "NFT Settlement", color: "text-yellow-400", pos: "left-[50%] bottom-[10%]" },
  { id: "ccip", icon: Share2, label: "Cross-Chain Bridge", color: "text-orange-400", pos: "left-[25%] bottom-[10%]" },
];

export default function WorkflowDiagram() {
  return (
    <div className="relative w-full aspect-video bg-[#05150a]/50 border border-green-500/10 rounded-3xl overflow-hidden p-8 backdrop-blur-xl">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(circle at 2px 2px, #22c55e 1px, transparent 0)`,
        backgroundSize: '32px 32px' 
      }} />

      {/* SVG Connections (The "Energy Nervous System") */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="energy-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Animated Paths */}
        <motion.path
          d="M 100,100 L 250,100 L 500,100 L 750,250 L 500,400 L 250,400"
          fill="none"
          stroke="url(#energy-flow)"
          strokeWidth="2"
          strokeDasharray="10 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Nodes Layer */}
      <div className="relative w-full h-full">
        {/* Connection Flow Container */}
        <div className="absolute inset-0 flex flex-col justify-between py-12 px-20">
          
          {/* Row 1: Ingestion & Processing */}
          <div className="flex justify-between items-center w-[70%]">
             <DiagramNode icon={Database} label="IoT Ingestion" status="LIVE" delay={0} />
             <div className="w-12 h-px bg-green-500/20" />
             <DiagramNode icon={BrainCircuit} label="AI/LLM Logic" status="PROCESSING" delay={0.2} />
             <div className="w-12 h-px bg-green-500/20" />
             <DiagramNode icon={Lock} label="ZK-Proof Groth16" status="GENERATING" delay={0.4} />
          </div>

          {/* Row 2: Consensus (The Heart) */}
          <div className="flex justify-end w-full pr-10">
             <div className="relative group">
               <div className="absolute -inset-4 bg-green-500/20 blur-xl rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
               <DiagramNode 
                 icon={ShieldCheck} 
                 label="Trinity Master Consensus" 
                 status="SYNCED" 
                 highlight 
                 delay={0.6} 
               />
               
               {/* Trinity Breakdown Miniature */}
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_blue]" />
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red]" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_5px_yellow]" />
               </div>
             </div>
          </div>

          {/* Row 3: Settlement & Distribution */}
          <div className="flex justify-between items-center w-[70%] self-center">
             <DiagramNode icon={Zap} label="Sovereign NFT Mint" status="FINALIZING" delay={0.8} />
             <div className="w-12 h-px bg-green-500/20" />
             <DiagramNode icon={Share2} label="CCIP Cross-Chain" status="DISPATCHING" delay={1.0} />
          </div>

        </div>
      </div>

      {/* Legend / Info Overlay */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-green-500/30 uppercase tracking-[0.2em]">
        Status: Institutional Orchestration Active
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
      className={`relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
        highlight 
          ? 'bg-green-500/10 border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.2)]' 
          : 'bg-black/40 border-white/5 hover:border-green-500/30'
      }`}
    >
      <div className={`p-3 rounded-xl ${highlight ? 'bg-green-500 text-green-950' : 'bg-green-500/10 text-green-500'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{label}</span>
        <span className={`text-[8px] font-mono font-bold mt-1 ${highlight ? 'text-green-400' : 'text-green-500/40'}`}>
           ● {status}
        </span>
      </div>
    </motion.div>
  );
}
