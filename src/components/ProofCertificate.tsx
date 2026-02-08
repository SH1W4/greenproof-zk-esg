"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Hash, Scale, CheckCircle2, Download, X } from "lucide-react";

interface ProofCertificateProps {
  onClose: () => void;
  verificationId?: string;
  timestamp?: string;
}

export const ProofCertificate: React.FC<ProofCertificateProps> = ({ 
  onClose, 
  verificationId = "GP-2026-ZK-X92",
  timestamp = new Date().toLocaleString()
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl overflow-hidden glass rounded-3xl border border-white/20 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white/60" />
        </button>

        {/* Certificate Header */}
        <div className="bg-gradient-to-r from-emerald-950/50 to-green-900/50 p-8 pt-12 text-center border-b border-white/10">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">ESG COMPLIANCE CERTIFICATE</h1>
          <p className="text-emerald-400/80 font-medium tracking-widest text-sm uppercase">Zero-Knowledge Verifiable Proof</p>
        </div>

        {/* Certificate Body */}
        <div className="p-8 space-y-8 bg-black/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-tighter text-white/40 flex items-center gap-2">
                <Hash className="w-3 h-3" /> Verification ID
              </label>
              <p className="text-white font-mono text-lg">{verificationId}</p>
            </div>
            <div className="space-y-1 text-right">
              <label className="text-xs uppercase tracking-tighter text-white/40 flex items-center gap-2 justify-end">
                <Calendar className="w-3 h-3" /> Timestamp (UTC)
              </label>
              <p className="text-white font-mono text-lg">{timestamp}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Consensus Results:</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Physical (IoT)", icon: ShieldCheck },
                { label: "Legal (Th3m1s)", icon: Scale },
                { label: "Ethical (SEVE)", icon: CheckCircle2 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-white/80 font-medium uppercase text-center">{item.label}</span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">VERIFIED</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-tighter text-white/40">ZK-SNARK Proof Hash</label>
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono text-[10px] text-emerald-400/70 break-all leading-tight">
              0xabc1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
            </div>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="p-8 bg-emerald-950/20 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center overflow-hidden">
               <span className="text-[10px] font-bold text-white/40">TH3M1S</span>
            </div>
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase py-0.5">Juridical Integrity Sealed</p>
              <p className="text-[8px] text-emerald-500 uppercase tracking-widest">Protocol Version v1.0.4-Convergence</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Download className="w-4 h-4" />
            DOWNLOAD PDF
          </button>
        </div>
      </div>
    </motion.div>
  );
};
