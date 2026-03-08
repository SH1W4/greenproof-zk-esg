"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  Database, 
  Scale, 
  BrainCircuit,
  Lock,
  FileText,
  Code,
  Terminal as TerminalIcon,
  Github,
  Zap,
  CheckCircle2,
  AlertTriangle,
  EyeOff,
  Network,
  BadgeCheck
} from "lucide-react";
import { Typewriter, TerminalCommand } from "./Typewriter";
import WorkflowDiagram from "./WorkflowDiagram";
import Navbar from "./Navbar";

export default function LandingContent() {
  const [mounted, setMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress: sectionScroll } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const shieldScale = useTransform(sectionScroll, [0, 0.4, 0.6, 1], [0.85, 1, 1, 1.1]);
  const shieldOpacity = useTransform(sectionScroll, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const n1X = useTransform(sectionScroll, [0, 1], [-10, 10]);
  const n1Y = useTransform(sectionScroll, [0, 1], [-5, 5]);
  const n2X = useTransform(sectionScroll, [0, 1], [10, -10]);
  const n2Y = useTransform(sectionScroll, [0, 1], [-5, 5]);
  const n3Y = useTransform(sectionScroll, [0, 1], [15, -15]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#020c06] text-[#f0fdf4] selection:bg-green-500/30">
      {/* SECTION 0: HYDRATION OVERLAY */}
      <AnimatePresence>
        {!mounted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#020c06] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-green-500/10 border-t-green-500 rounded-full animate-spin" />
              <div className="text-[10px] font-black font-mono text-green-500/40 uppercase tracking-[0.3em]">
                Syncing Reality...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center pt-20 overflow-hidden">
        {/* Background Sophistication Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020c06_100%)] opacity-60" />
        </div>

        <div className="max-w-4xl space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-green-500/60 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Proof-of-Reality Infrastructure • Chainlink Convergence 2026 🏆
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            The Universal Protocol for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-700">Digital Trust</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-green-100/40 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Sovereign validation of Physical, Juridical, and Ethical reality. Orchestrated by GP-Architect, built for global RWA orchestration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
          >
            <Link href="/login" className="group px-10 py-5 bg-green-500 text-green-950 font-black rounded-2xl flex items-center gap-3 hover:bg-green-400 transition-all shadow-[0_20px_50px_rgba(34,197,94,0.15)]">
              Launch Protocol Terminal
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: INSTITUTIONAL ORCHESTRATION (Immersive) */}
      <section className="relative z-10 py-24 border-b border-white/5 overflow-hidden">
        {/* Atmospheric Orbs Background */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-20 pointer-events-none blur-3xl scale-150">
          <Image 
            src="/assets/vault/concepts/orbs_3d.webp" 
            alt="Institutional Logic" 
            width={1200}
            height={1200}
            className="animate-pulse"
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-20">
          <div className="max-w-3xl space-y-10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold uppercase tracking-widest text-green-400">
                <ShieldCheck className="w-3 h-3" /> Institutional Authority
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                <BrainCircuit className="w-3 h-3" /> Autonomous Orchestration Active
              </div>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Absolute
              <br />
              Reality
              <br />
              <span className="text-green-500">Sync.</span>
            </h2>

            <p className="text-xl md:text-2xl text-green-100/40 leading-relaxed font-medium">
              GreenProof transcends dashboards. Orchestrated by the **GP-Architect**, our **Trinity Consensus** framework provides unquestionable proof of reality for institutional ESG and high-value sovereign asset traceability.
            </p>

            <div className="flex flex-col md:flex-row gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500/60">Proof Latency</div>
                <div className="text-2xl font-black font-mono">0.42s</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500/60">ZK Integrity</div>
                <div className="text-3xl font-black font-mono">100.00%</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500/60">Inter-Chain Bridge</div>
                <div className="text-3xl font-black font-mono">ACTIVE</div>
              </div>
            </div>

            <div className="pt-10">
              <Link href="/architecture" className="group inline-flex items-center gap-4 bg-green-500 text-green-950 px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                Explore Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE TRINITY CONSENSUS TECHNICALS */}
      <section className="relative z-10 py-20 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <BadgeCheck className="w-10 h-10 text-green-500/20 mb-4" />
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">
            The <span className="text-green-500">Trinity</span> Consensus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Sovereignty Equation", 
                desc: "Logic: Σ (Truth[P, J, E]) ≥ 0.66", 
                detail: "Minimum 2/3 consensus between ontologically disjoint oracles for state persistence." 
              },
              { 
                title: "ZK Membrane", 
                desc: "Groth16 Snark Proving", 
                detail: "Private point-to-point. Raw data dies at the agent; only the mathematical attestation lives on-chain." 
              },
              { 
                title: "CCIP Interoperability", 
                desc: "Global RWA Settlement", 
                detail: "Validated assets become liquid across any chain supported by the Chainlink framework." 
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm group hover:border-green-500/20 transition-all">
                <div className="text-green-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4">{item.title}</div>
                <div className="text-xl font-bold mb-4">{item.desc}</div>
                <div className="text-sm text-white/30 leading-relaxed">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CONSENSUS CORE (Diagram) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#020c06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#17cf540a_0%,_transparent_70%)]" />
        
        <motion.div 
          style={{ scale: shieldScale, opacity: shieldOpacity }}
          className="relative w-full max-w-4xl aspect-video flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-green-500/5 blur-[160px] rounded-full scale-90 animate-pulse" />
          
          <div className="relative w-full h-full flex items-center justify-center">
            {[300, 450, 650].map((size, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  rotate: i % 2 === 0 ? 360 : -360,
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  rotate: { duration: 40 + i * 20, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity }
                }}
                style={{ width: size, height: size }}
                className="absolute border border-green-500/10 rounded-full"
              />
            ))}

            <div className="relative z-10 w-full max-w-2xl transform scale-110">
               <WorkflowDiagram />
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ x: n1X, y: n1Y }} className="absolute top-[25%] left-[25%] flex items-center gap-2 group">
             <div className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_10px_#17cf54]" />
             <span className="text-[10px] font-black font-mono text-green-500/40 uppercase tracking-[0.3em] group-hover:text-green-400 transition-colors">Physical Input</span>
          </motion.div>
          <motion.div style={{ x: n2X, y: n2Y }} className="absolute bottom-[25%] right-[25%] flex items-center gap-2 group">
             <span className="text-[10px] font-black font-mono text-green-500/40 uppercase tracking-[0.3em] group-hover:text-green-400 transition-colors">Juridical Validation</span>
             <div className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_10px_#17cf54]" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: WORKFLOW SUMMARY STRIP */}
      <section className="relative z-10 py-16 px-8 bg-[#020c06] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { label: "Perception", sub: "Satellite & Sensors", icon: "📡", color: "from-blue-500/20" },
              { label: "Consensus", sub: "Trinity Protocol", icon: "⚖️", color: "from-green-500/20" },
              { label: "Privacy", sub: "Groth16 ZK-SNARK", icon: "🔐", color: "from-purple-500/20" },
              { label: "Settlement", sub: "On-Chain Mint", icon: "🏛️", color: "from-emerald-500/20" },
              { label: "Economy", sub: "Tokenized RWA", icon: "🌐", color: "from-cyan-500/20" },
            ].map((step, i) => (
              <div key={i} className="group relative">
                <div className={`h-full p-6 rounded-2xl bg-gradient-to-b ${step.color} to-transparent border border-white/5 backdrop-blur-sm transition-all hover:border-green-500/30 hover:bg-white/[0.05]`}>
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className="text-[10px] font-black font-mono text-green-500 uppercase tracking-widest mb-1">{step.label}</div>
                  <div className="text-[11px] text-white/30 font-medium leading-tight">{step.sub}</div>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                    <ArrowRight className="w-4 h-4 text-white/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE MISSION CARDS */}
      <section className="relative z-10 py-20 px-8 bg-[#020c06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sovereign Witness",
                desc: "Anchor physical truth using decentralized perception agents.",
                details: "The SWF framework utilizes satellite telemetry and IoT sensors validated via Chainlink Functions to ensure the 'Real World' cannot be forged.",
                img: "/assets/vault/concepts/witness_perception.png",
                color: "green"
              },
              {
                title: "Mathematical Proof",
                desc: "Compliance proven by code, not by reputation.",
                details: "Replace subjective human audits with ZK-SNARK arithmetic circuits. The on-chain certificate is the result of an unquestionable mathematical computation.",
                img: "/assets/vault/concepts/mathematical_lock.png",
                color: "blue"
              },
              {
                title: "Institutional Liquidity",
                desc: "Interoperable trust for global high-value assets.",
                details: "Via CCIP, we transform local compliance into global liquidity. 'Proof-of-Reality' travels across chains with the same security as the Chainlink protocol.",
                img: "/assets/vault/concepts/liquidity_bridge.png",
                color: "emerald"
              }
            ].map((card, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedCard(selectedCard === i ? null : i)}
                className={`group relative overflow-hidden rounded-[40px] border transition-all duration-500 flex flex-col cursor-pointer ${
                  selectedCard === i ? 'border-green-500/40 bg-white/[0.05] ring-1 ring-green-500/20' : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'
                }`}
              >
                {/* Interactive Image Container */}
                <div className={`relative h-64 overflow-hidden transition-all duration-700 ${
                  selectedCard === i ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0'
                }`}>
                  <Image 
                    src={card.img} 
                    alt={card.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020c06] to-transparent opacity-60" />
                  
                  {/* Info Badge */}
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/60">
                    {selectedCard === i ? "Active Protocol" : "Click to Inspect"}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 space-y-4 relative">
                  <div className={`w-8 h-1 bg-${card.color}-500 mb-4`} />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{card.title}</h3>
                  
                  <AnimatePresence mode="wait">
                    {selectedCard === i ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-green-400/90 leading-relaxed font-medium bg-green-500/5 p-4 rounded-2xl border border-green-500/10"
                      >
                        {card.details}
                        <div className="mt-4 pt-4 border-t border-green-500/10 grid grid-cols-2 gap-4 text-[10px] uppercase font-black text-green-500/40">
                          <div>Latency: 0.4s</div>
                          <div>Integrity: 100%</div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-green-100/40 text-sm leading-relaxed"
                      >
                        {card.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500/40">
                    <span>{selectedCard === i ? "Close Protocol" : "Explore Protocol"}</span>
                    <ArrowRight className={`w-3 h-3 transition-transform ${selectedCard === i ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 6: THE TERMINAL */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <TerminalCommand 
            commands={[
              "greenproof-cli init --identity institutional --v3.1.10",
              "[INFRA] Establishing Sovereign Node connection... Done.",
              "gp-architect --mode orchestrate --v3.1.10 --sovereign",
              "[GP-ARCHITECT] Loading Sovereign DNA & Identity Soul...",
              "npx ts-node consensus/gp-proof-engine.ts --target trinity",
              "[GP-ARCHITECT] Orchestrating Pillars: [Witness, Math, Liquidity]",
              "✓ Consensus achieved Σ ≥ 0.66 (SNARK Proof Verified)",
              "[CCIP] Finalizing Cross-Chain Attestation on Ethereum.",
              "✓ Reality Synchronized. Sovereign Asset Vault Locked."
            ]}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-20 border-t border-white/5 bg-black/60 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter">GREENPROOF</span>
              <span className="text-[9px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Sovereign Compliance</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-green-100/30">
            <Link href="#tech" className="hover:text-green-500 transition-colors">Technology</Link>
            <Link href="#docs" className="hover:text-green-500 transition-colors">Documentation</Link>
            <Link href="https://github.com/symbeon-labs/greenproof-platform" target="_blank" className="hover:text-green-500 transition-colors">GitHub</Link>
          </div>

          <div className="text-[10px] text-green-100/10 font-mono font-bold uppercase tracking-widest">
            © 2026 GreenProof · Institutional Consensus
          </div>
        </div>
      </footer>
    </main>
  );
}
