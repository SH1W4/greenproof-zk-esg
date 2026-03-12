"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Cpu, ShieldCheck, Scale, Zap, Activity } from "lucide-react";

export default function ArchitectLayer() {
  return (
    <div className="relative w-full min-h-[500px] bg-white/[0.01] border border-white/10 rounded-[2.5rem] overflow-hidden group">
      {/* HUD Gird Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative p-12 flex flex-col items-center justify-between h-full space-y-16">
        {/* Top Header Label */}
        <div className="w-full flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[.2em] text-green-500/60 uppercase">
              <Activity className="w-3 h-3" />
              Real-Time Orchestration
            </div>
            <div className="text-xs font-mono text-white/20">AGENT_ID: GP_ARCHITECT_01</div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-[10px] font-black tracking-[.2em] text-white/40 uppercase">System Status</div>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <div className="text-xs font-mono text-green-500/80">NOMINAL</div>
            </div>
          </div>
        </div>

        {/* The Central HUD Visualization */}
        <div className="relative flex items-center justify-center w-full max-w-4xl">
          {/* Neural Connection Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-[300px] pointer-events-none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.4)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Horizontal Main Bus */}
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="5,5" />
          </svg>

          <div className="flex items-center justify-between w-full h-[300px] relative">
            {/* Input Nuclei */}
            <div className="flex flex-col gap-8">
              {[
                { icon: Zap, label: "PHYSICAL", color: "amber" },
                { icon: Scale, label: "JURIDICAL", color: "blue" },
                { icon: ShieldCheck, label: "ETHICAL", color: "purple" }
              ].map((n, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-4 group/node"
                >
                  <div className={`p-4 bg-white/5 border border-white/10 rounded-2xl group-hover/node:bg-${n.color}-500/10 group-hover/node:border-${n.color}-500/30 transition-all duration-500`}>
                    <n.icon className={`w-5 h-5 text-white/40 group-hover/node:text-${n.color}-400 transition-colors`} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-black tracking-widest text-white/20 uppercase">{n.label}_FEED</div>
                    <div className="text-xs font-bold text-white/60 tracking-tight">ACTIVE_STREAM</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Central Processing Hub (Architect Core) */}
            <div className="relative group/core pointer-events-auto cursor-pointer">
              {/* Spinning HUD Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border border-dashed border-green-500/10 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border border-green-500/20 rounded-full"
              />
              
              <div className="relative z-10 p-10 bg-green-500/5 border border-green-500/20 rounded-[3rem] backdrop-blur-3xl shadow-[0_0_80px_rgba(34,197,94,0.1)] group-hover/core:border-green-500/40 transition-all duration-700">
                <BrainCircuit className="w-20 h-20 text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
                
                {/* Orbital Status Bits */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="absolute top-0 w-1.5 h-1.5 bg-green-400 rounded-full" />
                </motion.div>
              </div>

              {/* Core Labels */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <div className="text-[10px] font-black tracking-[.3em] text-green-500 uppercase">GP_ARCHITECT</div>
                <div className="text-[10px] font-mono text-white/20 mt-1">HAAS_ORCHESTRATOR_V1.1</div>
              </div>
            </div>

            {/* Output Node */}
             <div className="flex flex-col gap-8 items-end">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-4 text-right"
                >
                  <div className="space-y-1">
                    <div className="text-[9px] font-black tracking-widest text-green-500/60 uppercase">Consensus_Hash</div>
                    <div className="text-xs font-mono text-white/40">0x863de...da76</div>
                  </div>
                  <div className="h-px w-24 ml-auto bg-green-500/20" />
                  <div className="space-y-1">
                    <div className="text-[9px] font-black tracking-widest text-white/30 uppercase">Validation_State</div>
                    <div className="text-sm font-black text-green-400 tracking-tighter uppercase italic">Verified_Ok</div>
                  </div>
                </motion.div>
             </div>
          </div>
        </div>

        {/* Narrative Bottom Section */}
        <div className="w-full flex justify-center text-center pt-8">
           <p className="text-sm text-green-100/30 leading-relaxed font-medium max-w-2xl px-8">
             O **GP-Architect** atua como o córtex cognitivo do protocolo, orquestrando o enxame de agentes autônomos (**HAAS**) para garantir que a verdade física, jurídica e ética seja processada antes da liquidação em ZK.
           </p>
        </div>
      </div>

      {/* Edge Scan Line */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-green-500/[0.03] to-transparent pointer-events-none"
      />
    </div>
  );
}
