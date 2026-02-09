"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Milestone, 
  Rocket, 
  Globe, 
  Layers, 
  Cpu,
  ArrowRight
} from "lucide-react";

export default function RoadmapPage() {
  const steps = [
    {
      quarter: "Q1 2026",
      title: "Stabilization",
      status: "COMPLETED",
      desc: "Architectural consolidation of the Trinity-HAAS system. Execution of 2/3 consensus via Chainlink CRE and ZK-SNARK threshold validation.",
      color: "bg-green-500"
    },
    {
      quarter: "Q2 2026",
      title: "Interoperability",
      status: "IN PROGRESS",
      desc: "Cross-chain RWA liquidity layer. Enabling the migration of ESG credentials across heterogeneous networks via CCIP 2.0 protocol.",
      color: "bg-blue-500"
    },
    {
      quarter: "Q3 2026",
      title: "Sovereign Identity",
      status: "UPCOMING",
      desc: "Integration with Polygon ID and ZK-VC standards. Anonymous corporate compliance for institutional industrial privacy.",
      color: "bg-purple-500"
    },
    {
      quarter: "Q4 2026",
      title: "Impact Economy",
      status: "VISION",
      desc: "Direct integration with GhostFund and Ecosystem-Degov. Transforming verified ESG proofs into programmable collateral.",
      color: "bg-emerald-500"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020c06] text-[#f0fdf4] selection:bg-green-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-[100] border-b border-white/5 px-8 py-5 flex items-center justify-between backdrop-blur-xl bg-[#020c06]/80">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5 text-green-950" />
          </div>
          <span className="font-black text-lg tracking-tighter">GREENPROOF</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-green-100/40 hover:text-green-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Protocol Home
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-8 pt-32 pb-24 space-y-16">
        {/* Header */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Institutional Evolution
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            EXPANSION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-emerald-700 underline decoration-blue-500/20 underline-offset-8">HORIZON</span>
          </h1>
          <p className="text-xl text-blue-100/40 max-w-2xl leading-relaxed font-medium">
            Mapeando a trajetória do GreenProof de um validador ESG para a camada base da economia de integridade RWA.
          </p>
        </section>

        {/* Roadmap Line */}
        <section className="relative pt-12">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5" />

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`flex-1 space-y-4 text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`text-xs font-black tracking-widest uppercase ${step.status === 'COMPLETED' ? 'text-green-400' : 'text-blue-400'}`}>
                    {step.quarter} — {step.status}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">{step.title}</h3>
                  <p className="text-sm text-green-100/30 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Counter/Icon */}
                <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                   <div className={`absolute inset-0 ${step.color} blur-2xl opacity-20`} />
                   <div className={`w-12 h-12 rounded-2xl border border-white/10 glass flex items-center justify-center bg-black/40`}>
                      {i === 0 && <Milestone className="w-5 h-5 text-green-500" />}
                      {i === 1 && <Globe className="w-5 h-5 text-blue-500" />}
                      {i === 2 && <Layers className="w-5 h-5 text-purple-500" />}
                      {i === 3 && <Rocket className="w-5 h-5 text-emerald-500" />}
                   </div>
                </div>

                {/* Empty spacer for alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Strategic Synergy Section */}
        <section className="glass-card rounded-[3rem] p-12 overflow-hidden border border-white/5 bg-gradient-to-br from-black/40 to-emerald-950/20">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Protocol Synergy</h2>
              <p className="text-green-100/40">
                GreenProof is the "Truth Engine" designed to feed the entire Symbeon Ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-black/40 border border-white/5 rounded-3xl text-left space-y-4">
                 <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                    <Layers className="w-5 h-5" />
                 </div>
                 <h4 className="font-bold uppercase tracking-widest text-sm">GhostFund Layer</h4>
                 <p className="text-xs text-white/30 leading-relaxed">
                   Verified compliance unlocks high-yield institutional funding rounds.
                 </p>
              </div>
              <div className="p-8 bg-black/40 border border-white/5 rounded-3xl text-left space-y-4">
                 <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                    <Globe className="w-5 h-5" />
                 </div>
                 <h4 className="font-bold uppercase tracking-widest text-sm">Ecosystem Degov</h4>
                 <p className="text-xs text-white/30 leading-relaxed">
                   Immutable data triggers autonomous governance and reward distribution.
                 </p>
              </div>
            </div>

            <Link href="/login" className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-green-950 font-black rounded-xl hover:scale-105 transition-all">
              Initialize Protocol
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/5 px-8 py-10 text-center opacity-20">
         <p className="text-[10px] uppercase font-black tracking-[0.5em]">Future Transmitted</p>
      </footer>
    </main>
  );
}
