"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  Network
} from "lucide-react";
import { Typewriter, TerminalCommand } from "../components/Typewriter";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const shieldScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);
  const shieldOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  if (!mounted) return <div className="min-h-screen bg-[#020c06]" />;

  return (
    <main ref={containerRef} className="min-h-screen bg-[#020c06] text-[#f0fdf4] selection:bg-green-500/30">
      {/* SECTION 0: NAV (Discreet Institutional) */}
      <nav className="fixed top-0 inset-x-0 z-[100] border-b border-white/5 px-8 py-5 flex items-center justify-between backdrop-blur-xl bg-[#020c06]/80">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <ShieldCheck className="w-5 h-5 text-green-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter">GREENPROOF</span>
            <span className="text-[9px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Sovereign Compliance</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-green-100/40">
          <Link href="#tech" className="hover:text-green-400 transition-colors">Technology</Link>
          <Link href="#docs" className="hover:text-green-400 transition-colors">Docs</Link>
          <Link href="https://github.com/SH1W4/greenproof-zk-esg" target="_blank" className="hover:text-green-400 transition-colors">GitHub</Link>
          <Link href="/login" className="px-6 py-2.5 bg-green-500 text-green-950 rounded-xl hover:bg-green-400 transition-all font-black shadow-lg shadow-green-500/20">
            Access Protocol
          </Link>
        </div>
      </nav>

      {/* SECTION 1: HERO (Text-First Authority) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center pt-20">
        <div className="max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-green-500/60 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Institutional RWA Infrastructure
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            The Institutional Grade
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-700">ESG Oracle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-green-100/40 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Synchronizing physical, legal, and ethical reality through Chainlink CRE and ZK-SNARKs. RWA infrastructure for the sovereign future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
          >
            <Link href="/login" className="group px-10 py-5 bg-green-500 text-green-950 font-black rounded-2xl flex items-center gap-3 hover:bg-green-400 transition-all shadow-[0_20px_50px_rgba(34,197,94,0.15)]">
              Access Protocol
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#docs" className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold text-green-100/60">
              Read Documentation
            </Link>
          </motion.div>
        </div>

        {/* Subtle Decorative Flow */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-px h-12 bg-gradient-to-b from-green-500 to-transparent" />
        </div>
      </section>

      {/* SECTION 2: CINEMATIC PARALLAX (Visual Authority) */}
      <section className="relative h-[120vh] flex items-center justify-center overflow-hidden border-y border-white/5 bg-black/20">
        <motion.div 
          style={{ scale: shieldScale, opacity: shieldOpacity }}
          className="relative w-full max-w-5xl aspect-square flex items-center justify-center"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-green-500/5 blur-[120px] rounded-full animate-pulse" />
          
          <Image 
            src="/assets/concepts/trinity_visualization_master.png" 
            alt="GreenProof Trinity of Proof" 
            fill
            className="object-contain drop-shadow-[0_0_80px_rgba(34,197,94,0.1)]"
          />
        </motion.div>

        {/* Floating Technical Labels (Optional context in parallax) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-[10%] md:left-1/4 p-4 border border-green-500/10 rounded-xl bg-black/40 backdrop-blur-md">
            <div className="text-[10px] font-mono text-green-500/40 uppercase font-bold mb-1">Layer 01</div>
            <div className="text-xs font-bold uppercase tracking-widest">Physical Integrity</div>
          </div>
          <div className="absolute bottom-1/4 right-[10%] md:right-1/4 p-4 border border-green-500/10 rounded-xl bg-black/40 backdrop-blur-md">
            <div className="text-[10px] font-mono text-green-500/40 uppercase font-bold mb-1">Layer 03</div>
            <div className="text-xs font-bold uppercase tracking-widest">Ethical Consensus</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PROBLEM (The ESG Gap) */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
            The fundamental
            <br />
            <span className="text-green-500">ESG Deficit</span>
          </h2>
          <p className="text-lg text-green-100/40 leading-relaxed">
            Existing ESG frameworks suffer from a structural trust gap. Transparency alone does not create integrity when data is easily manipulated and privacy is non-existent.
          </p>
          <div className="space-y-6">
            {[
              { icon: AlertTriangle, title: "Greenwashing", desc: "Unverified claims masking unsustainable operations." },
              { icon: EyeOff, title: "Data Exposure", desc: "Revealing sensitive industrial data to prove compliance." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <item.icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-green-100/30">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-12 rounded-3xl border-red-500/10">
          <div className="text-6xl font-black text-red-500/20 mb-4 tracking-tighter">0%</div>
          <p className="text-xl font-medium text-green-100/60 leading-relaxed">
            Confidence in traditional self-reported ESG scores without secondary objective validation.
          </p>
        </div>
      </section>

      {/* SECTION 4: THE SOLUTION (3 Pillars) */}
      <section id="tech" className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <h2 className="text-4xl font-black tracking-tighter uppercase">The Protocol of Truth</h2>
          <p className="text-lg text-green-100/40">
            GreenProof resolves the ESG gap through a three-pillared architectural consensus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Network, 
              title: "Consensus (2/3)", 
              desc: "Triple Oracle consensus prevents greenwashing by requiring 2/3 validation nodes to agree." 
            },
            { 
              icon: Lock, 
              title: "Privacy (ZK)", 
              desc: "Zero-Knowledge SNARKs prove compliance (ESG ≥ 80%) without revealing underlying data." 
            },
            { 
              icon: Zap, 
              title: "Portability (CCIP)", 
              desc: "Institutional certificates are portable across chains via Chainlink CCIP infrastructure." 
            }
          ].map((pillar, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-3xl space-y-6 text-left hover:border-green-500/30 transition-all"
            >
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                <pillar.icon className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">{pillar.title}</h3>
              <p className="text-sm text-green-100/40 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: SYSTEM DIAGRAM (Technical Clarity) */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-black/40 p-4">
            <Image 
              src="/assets/technical/protocol_workflow_architecture.png?v=2" 
              alt="GreenProof System Architecture" 
              fill
              className="object-contain p-8 opacity-90"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9]">
              Institutional
              <br />
              <span className="text-green-500">Orchestration</span>
            </h2>
            <p className="text-lg text-green-100/40 leading-relaxed">
              Our architecture leverages Chainlink CRE to orchestrate IoT data, legal audits, and impact metrics into a single source of truth.
            </p>
            <div className="text-xl text-green-400 font-mono italic">
              <Typewriter 
                text='"SYNCING REALITY: Physical, Legal, and Ethical Consensus."' 
                delay={60}
              />
            </div>
            <Link href="#docs" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors">
              Explore Architecture <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE TERMINAL (Under the Hood) */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tighter uppercase mb-4">Protocol Execution</h2>
          <p className="text-green-100/40 font-mono text-sm">Real-time ZK-SNARK generation and cross-chain consensus simulation.</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <TerminalCommand 
            commands={[
              "greenproof-cli init --network sepolia --identity institutional",
              "[INFRA] Establishing biocybernetic node connection... DONE",
              "npx ts-node scripts/terminal-mint.ts",
              "[ZK] Generating SNARK proof for ESG Compliance > 85%...",
              "✓ Proof Generated (Groth16) | Time: 0.42s",
              "[CCIP] Dispatching cross-chain validation to Avalanche Fuji...",
              "✓ Protocol Consensus Achieved | NFT Minted: 0x3fcf...71b2"
            ]}
          />
        </div>
      </section>

      {/* SECTION 7: POSITIONING (Protocol, Not Product) */}
      <section className="relative z-10 py-64 border-t border-white/5 bg-green-500/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-12 px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
          >
            NOT A DASHBOARD.
            <br />
            NOT A SAAS.
            <br />
            <span className="text-green-500">A PROTOCOL.</span>
          </motion.h2>
          <p className="text-xl text-green-100/40 max-w-2xl mx-auto font-medium">
            GreenProof is the settlement layer for objective reality. Build institutional trust upon sovereign infrastructure.
          </p>
          <div className="pt-8">
            <Link href="/login" className="px-12 py-6 bg-green-500 text-green-950 font-black rounded-2xl inline-flex items-center gap-3 hover:bg-green-400 transition-all hover:scale-105 shadow-[0_20px_60px_rgba(34,197,94,0.3)] text-lg">
              Initialize Protocol
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER (Söber) */}
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
            <Link href="https://github.com/SH1W4/greenproof-zk-esg" target="_blank" className="hover:text-green-500 transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-green-400 transition-colors">Twitter (X)</Link>
          </div>

          <div className="text-[10px] text-green-100/10 font-mono font-bold uppercase tracking-widest">
            © 2026 GreenProof · Institutional Consensus
          </div>
        </div>
      </footer>
    </main>
  );
}
