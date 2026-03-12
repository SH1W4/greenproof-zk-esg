"use client";

import { motion } from "framer-motion";
import { Zap, Scale, BrainCircuit, ShieldCheck, Network, Lock } from "lucide-react";

export default function ProtocolDiagram() {
  return (
    <div className="relative w-full aspect-[21/9] bg-black/40 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center p-8">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative w-full h-full flex items-center justify-between max-w-5xl">
        
        {/* PILLAR LAYER */}
        <div className="flex flex-col gap-12 relative z-10">
          {[
            { id: "physical", label: "GP-Physical", icon: Zap, color: "text-amber-400" },
            { id: "juridical", label: "GP-Juridical", icon: Scale, color: "text-blue-400" },
            { id: "ethical", label: "GP-Ethical", icon: BrainCircuit, color: "text-purple-400" }
          ].map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-4 group"
            >
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-all duration-500 shadow-xl">
                <pillar.icon className={`w-6 h-6 ${pillar.color} drop-shadow-[0_0_10px_currentColor]`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-0.5">{pillar.label}</span>
                <div className="flex items-center gap-1.5">
                   <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[8px] font-mono text-green-500/40 uppercase font-bold tracking-tight">Active_Stream</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CONNECTION LINES (BÉZIER) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400">
          <defs>
            <linearGradient id="curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow">
               <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
               <feMerge>
                   <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>
          
          {/* Top Curve */}
          <motion.path
            d="M 120 70 Q 300 70, 400 180"
            stroke="url(#curve-grad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Middle Line */}
          <motion.path
            d="M 120 200 L 400 200"
            stroke="url(#curve-grad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Bottom Curve */}
          <motion.path
            d="M 120 330 Q 300 330, 400 220"
            stroke="url(#curve-grad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* CENTER: ZK-CORE (RESTYLED) */}
        <div className="relative flex items-center justify-center pointer-events-none">
          {/* Concentric Glow Rings */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 border border-green-500/10 rounded-[3rem] opacity-20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-56 h-56 border border-green-500/20 rounded-[2.5rem] border-dashed"
          />
          
          <div className="relative z-20 p-10 rounded-[3rem] bg-[#020c06]/80 backdrop-blur-3xl border border-green-500/30 shadow-[0_0_100px_rgba(34,197,94,0.15)] flex flex-col items-center gap-4 group pointer-events-auto cursor-help">
            <div className="relative">
               <Lock className="w-12 h-12 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,14,0.5)]" />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 bg-green-500 rounded-full blur-xl -z-10"
               />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[14px] font-black uppercase tracking-[0.3em] text-white">ZK-Settlement</span>
              <div className="text-[9px] font-mono text-green-500/40 uppercase font-bold tracking-widest">Groth16_Verified_Layer</div>
            </div>
          </div>
        </div>

        {/* CONNECTION LINE (RIGHT) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400">
          <motion.path
            d="M 550 200 L 800 200"
            stroke="url(#lineGradientRight)"
            strokeWidth="3"
            strokeDasharray="10,20"
            fill="none"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="lineGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* OUTPUT LAYER */}
        <div className="flex flex-col gap-10 relative z-10 items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center gap-5 group hover:border-green-500/40 transition-all shadow-2xl backdrop-blur-xl"
          >
            <div className="p-4 bg-green-500 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-transform group-hover:scale-110">
              <ShieldCheck className="w-7 h-7 text-green-950" />
            </div>
            <div className="text-center">
              <div className="text-[12px] font-black uppercase tracking-widest mb-1 text-white">NFT-Cert</div>
              <div className="text-[9px] font-mono text-green-500/40 uppercase font-bold">On-chain Proof</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-3 px-5 py-2.5 bg-green-500/5 border border-green-500/20 rounded-full"
          >
            <Network className="w-4 h-4 text-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/60">Cross-Chain Bridge Active</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
