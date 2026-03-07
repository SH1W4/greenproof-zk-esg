"use client";

import { motion } from "framer-motion";
import { Zap, Scale, BrainCircuit, ShieldCheck, Activity, Cpu } from "lucide-react";

export default function ConsensusMonitor() {
  const pillars = [
    { id: "physical", label: "GP-Physical", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10", data: "IoT Stream..." },
    { id: "juridical", label: "GP-Juridical", icon: Scale, color: "text-blue-400", bg: "bg-blue-400/10", data: "ISO-14030..." },
    { id: "ethical", label: "GP-Ethical", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-400/10", data: "SEVE Logic..." }
  ];

  return (
    <div className="bg-black/60 border border-green-500/20 rounded-[2.5rem] p-8 backdrop-blur-3xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 opacity-20">
        <Activity className="w-8 h-8 text-green-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
        
        {/* INGESTION HUD */}
        <div className="space-y-6">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500/40 mb-4">Ingestion_Nodes</div>
          {pillars.map((p) => (
            <div key={p.id} className="relative group p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-green-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${p.bg} rounded-lg ${p.color}`}>
                  <p.icon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase text-white/80">{p.label}</span>
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <motion.div 
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/40 to-transparent" 
                    />
                    <span className="text-[8px] font-mono text-green-500/50 whitespace-nowrap">{p.data}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AGENTIC ORCHESTRATION (THE ARCHITECT) */}
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-[-20%] inset-y-[-20%] border border-green-500/10 rounded-full border-dashed"
            />
            <div className="relative z-10 w-24 h-24 bg-green-500/5 border border-green-500/30 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.1)] group">
              <Cpu className="w-10 h-10 text-green-500 animate-pulse" />
              <div className="absolute -bottom-2 px-2 py-0.5 bg-green-500 text-[#020c06] text-[7px] font-black uppercase rounded-sm">
                GP-Architect
              </div>
            </div>
          </div>
          <div className="mt-8 text-center bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
             <div className="text-[9px] font-black uppercase text-green-500/60 tracking-widest mb-1">HAAS.Orchestration_Active</div>
             <div className="text-[8px] font-mono text-white/40">Quorum: 3/3 Validated</div>
          </div>
        </div>

        {/* ZK-CONVERGENCE */}
        <div className="flex flex-col items-center">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500/40 mb-6">Settlement</div>
          <motion.div 
             initial={{ scale: 0.9 }}
             animate={{ scale: [0.9, 1, 0.9] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="p-10 bg-green-500 rounded-[3rem] shadow-[0_0_80px_rgba(34,197,94,0.3)] flex flex-col items-center gap-4 hover:scale-105 transition-transform"
          >
            <ShieldCheck className="w-8 h-8 text-green-950" />
            <div className="text-center">
              <div className="text-[14px] font-black uppercase text-green-950 tracking-widest">ZK-Proof</div>
              <div className="text-[8px] font-mono text-green-950/60 uppercase font-bold">Immutable_RWA</div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
