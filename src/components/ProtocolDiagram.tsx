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
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-green-500/30 transition-colors">
                <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{pillar.label}</span>
                <span className="text-[8px] font-mono text-green-500/40 uppercase">Ingestion Node</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CONNECTION LINES (LEFT) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d="M 120 70 L 400 130"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 120 145 L 400 145"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
          <motion.path
            d="M 120 220 L 400 160"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* CENTER: ZK-CORE */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 border border-green-500/20 rounded-[2rem] opacity-20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-40 h-40 border border-green-500/10 rounded-full border-dashed"
          />
          <div className="relative z-20 p-8 rounded-[2.5rem] bg-[#020c06] border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.1)] flex flex-col items-center gap-3">
            <Lock className="w-10 h-10 text-green-500" />
            <div className="flex flex-col items-center">
              <span className="text-[12px] font-black uppercase tracking-[0.2em]">ZK-Settlement</span>
              <span className="text-[9px] font-mono text-green-500/40 uppercase font-bold">Groth16 Circuit</span>
            </div>
          </div>
        </div>

        {/* CONNECTION LINE (RIGHT) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d="M 500 145 L 750 145"
            stroke="url(#lineGradientRight)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="lineGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* OUTPUT LAYER */}
        <div className="flex flex-col gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center gap-4 group hover:border-green-500/40 transition-all"
          >
            <div className="p-3 bg-green-500 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <ShieldCheck className="w-6 h-6 text-green-950" />
            </div>
            <div className="text-center">
              <div className="text-[11px] font-black uppercase tracking-widest mb-1">NFT-Cert</div>
              <div className="text-[8px] font-mono text-green-500/40 uppercase">On-Chain Proof</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-3 px-4 py-2 bg-green-500/5 border border-green-500/20 rounded-full"
          >
            <Network className="w-3 h-3 text-green-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-500/60">CCIP Bridge Active</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
