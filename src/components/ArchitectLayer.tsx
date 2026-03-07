"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Sparkles, Zap, ShieldCheck, Scale } from "lucide-react";

export default function ArchitectLayer() {
  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-16 overflow-hidden group">
      {/* Background Neural Network Simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="neural-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(34, 197, 94, 0.4)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center space-y-12">
        {/* The Central Architect Nucleus */}
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-green-500/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-green-500/40 rounded-full shadow-[0_0_50px_rgba(34,197,94,0.1)]"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-[40px] opacity-40"
            />
            <div className="relative p-8 bg-green-500/10 border border-green-500/20 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
              <BrainCircuit className="w-16 h-16 md:w-20 md:h-20 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                 <Sparkles className="w-4 h-4 text-amber-400 absolute -top-2 -right-2" />
              </motion.div>
            </div>
          </div>

          {/* Connection Streams to Trinity Nuclei */}
          {[
            { angle: -30, icon: Zap, label: "PHYSICAL" },
            { angle: 90, icon: Scale, label: "JURIDICAL" },
            { angle: 210, icon: ShieldCheck, label: "ETHICAL" }
          ].map((nucleus, i) => (
            <div 
              key={i} 
              className="absolute inset-0 pointer-events-none"
              style={{ transform: `rotate(${nucleus.angle}deg)` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[120px] flex flex-col items-center gap-2">
                 <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <nucleus.icon className="w-5 h-5 text-green-400/60" />
                 </div>
                 <span className="text-[8px] font-black tracking-widest text-green-500/40 uppercase">{nucleus.label}</span>
              </div>
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "100px" }}
                className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-t from-green-500/60 to-transparent"
              />
            </div>
          ))}
        </div>

        {/* Narrative Box */}
        <div className="text-center space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/10 rounded-full">
             <Cpu className="w-3 h-3 text-green-500" />
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-500">HAAS Orchestrator</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Agentic Sovereignty</h3>
          <p className="text-sm text-green-100/30 leading-relaxed font-medium">
             The **GP-Architect** is the protocol&apos;s Hierarchical Autonomous Agent Swarm (HAAS) orchestrator. 
             It continuously monitors cross-domain nuclei, resolving consensus conflicts and 
             preparing immutable data-signals for the ZK-Privacy layer.
          </p>
        </div>
      </div>
    </div>
  );
}
