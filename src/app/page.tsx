"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  CheckCircle2
} from "lucide-react";
import { Typewriter, TerminalCommand } from "../components/Typewriter";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020c06] text-[#f0fdf4] overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[160px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 px-8 py-5 flex items-center justify-between backdrop-blur-2xl bg-black/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-500 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <ShieldCheck className="w-6 h-6 text-green-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter glow-text">GREENPROOF</span>
            <span className="text-[10px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Protocol</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link href="#tech" className="hover:text-green-400 transition-colors">Technology</Link>
          <Link href="#docs" className="hover:text-green-400 transition-colors">Docs</Link>
          <Link href="https://github.com/SH1W4/greenproof-zk-esg" target="_blank" className="hover:text-green-400 transition-colors">GitHub</Link>
          <Link href="/login" className="px-6 py-2.5 bg-green-500 text-green-950 rounded-xl hover:bg-green-400 transition-all font-black shadow-lg shadow-green-500/20">
            Access Protocol
          </Link>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-8 py-24">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/assets/branding/hero_banner.png" 
            alt="GreenProof Protocol" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-black uppercase tracking-widest mb-6"
          >
            <Zap className="w-4 h-4" />
            Institutional RWA Infrastructure
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            The Institutional Grade
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">ESG Oracle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-green-100/60 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Synchronizing physical, legal, and ethical reality through Chainlink CRE and ZK-SNARKs. RWA infrastructure for the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 pt-8"
          >
            <Link href="/login" className="group px-10 py-5 bg-green-500 text-green-950 font-black rounded-2xl flex items-center gap-3 hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(34,197,94,0.3)]">
              Access Protocol
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#docs" className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold">
              Read Documentation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Protocol Positioning */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center space-y-12">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Powering the Next Generation of RWA</h2>
          
          {/* Metrics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Network", value: "Live on Sepolia & Fuji" },
              { label: "Privacy", value: "ZK-SNARK Verified" },
              { label: "Orchestration", value: "Chainlink CRE" }
            ].map((metric, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl text-center">
                <div className="text-xs font-black uppercase tracking-widest text-green-400 mb-2">{metric.label}</div>
                <div className="text-lg font-bold">{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Partner Logos */}
          <div className="relative w-full h-16 opacity-70">
            <Image 
              src="/assets/branding/icon_grid.png" 
              alt="Institutional Partners" 
              fill
              className="object-contain"
            />
          </div>

          <div className="text-xl text-green-100/40 italic max-w-2xl mx-auto font-mono">
            <Typewriter 
              text='"SYNCING REALITY: Physical, Legal, and Ethical Consensus."' 
              delay={60}
              className="text-green-400"
            />
          </div>
          
          {/* Terminal Command Simulation: The Cyber-Nucleus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 50 }}
            className="max-w-2xl mx-auto mt-12"
          >
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
          </motion.div>
        </div>
      </section>

      {/* 3. Trinity Concept */}
      <section id="tech" className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase">The Trinity of Proof</h2>
            <p className="text-xl text-green-100/40 max-w-2xl mx-auto">
              Three pillars of objective reality, orchestrated by Chainlink CRE and secured by ZK-SNARKs.
            </p>
          </div>

          {/* Trinity Visualization */}
          <div className="relative w-full max-w-4xl mx-auto aspect-video">
            <Image 
              src="/assets/concepts/trinity_visualization_master.png" 
              alt="Trinity of Proof" 
              fill
              className="object-contain"
            />
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Database, title: "Physical Layer", desc: "Real-world data ingestion via IoT sensors" },
              { icon: Scale, title: "Juridical Layer", desc: "Compliance verification through legal nodes" },
              { icon: BrainCircuit, title: "Ethical Layer", desc: "ESG score validation by impact oracles" }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-8 rounded-2xl space-y-4 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                  <pillar.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-black">{pillar.title}</h3>
                <p className="text-sm text-green-100/40">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technical Deep Dive */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Built on Proven Infrastructure</h2>
            <p className="text-lg text-green-100/40 max-w-2xl mx-auto">
              GreenProof's architecture leverages industry-leading protocols for maximum security and interoperability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-green-400">
                <BrainCircuit className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Protocol Architecture</span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image 
                  src="/assets/technical/protocol_workflow_architecture.png?v=2" 
                  alt="Architecture" 
                  fill
                  className="object-cover opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-xs text-green-100/30">
                Multi-layered orchestration between IoT sensors, juridical nodes, and impact scoring engines.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-green-400">
                <Lock className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">CRE Master Workflow</span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image 
                  src="/assets/technical/greenproof_master_infographic.png?v=2" 
                  alt="Workflow" 
                  fill
                  className="object-cover opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-xs text-green-100/30">
                Chainlink CRE orchestration logic for institutional ESG claims verification.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {["Chainlink CRE", "CCIP", "ZK-SNARKs", "Solidity", "Rust"].map((tech, i) => (
              <div key={i} className="px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-sm font-black uppercase tracking-widest text-green-400">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Use Cases */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Transforming ESG Compliance</h2>
            <p className="text-lg text-green-100/40 max-w-2xl mx-auto">
              Real-world applications for institutional clients across multiple sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Green Bonds", desc: "Prove ESG ≥ 80% without revealing private data", icon: CheckCircle2 },
              { title: "Carbon Credits", desc: "Verifiable impact tracking with ZK privacy", icon: Database },
              { title: "Supply Chain", desc: "Ethical sourcing validation via triple oracle consensus", icon: Scale }
            ].map((useCase, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-8 rounded-2xl space-y-4"
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                  <useCase.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-black">{useCase.title}</h3>
                <p className="text-sm text-green-100/40">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Documentation Hub */}
      <section id="docs" className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Explore the Protocol</h2>
            <p className="text-lg text-green-100/40 max-w-2xl mx-auto">
              Comprehensive resources for developers, researchers, and institutional partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Architecture", desc: "Technical Design", href: "/docs/ARCH.md" },
              { icon: Code, title: "CRE Judges", desc: "Oracle Configuration", href: "/docs/CRE_JUDGES.md" },
              { icon: TerminalIcon, title: "Deployment", desc: "Setup Instructions", href: "/docs/DEPLOYMENT.md" },
              { icon: Github, title: "GitHub", desc: "Open Source Code", href: "https://github.com/SH1W4/greenproof-zk-esg" }
            ].map((doc, i) => (
              <Link
                key={i}
                href={doc.href}
                target={doc.href.startsWith('http') ? '_blank' : undefined}
                className="glass-card p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <doc.icon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black mb-1">{doc.title}</h3>
                  <p className="text-xs text-green-100/40">{doc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="relative z-10 py-32 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8 px-8">
          <h2 className="text-5xl font-black tracking-tighter">Ready to Verify Compliance?</h2>
          <p className="text-xl text-green-100/60">
            Access the GreenProof Protocol dashboard with institutional credentials.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/login" className="group px-12 py-6 bg-green-500 text-green-950 font-black rounded-2xl flex items-center gap-3 hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(34,197,94,0.4)] text-lg">
              Access Protocol
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter">GREENPROOF</span>
              <span className="text-[9px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Sovereign Compliance</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <Link href="/docs" className="hover:text-green-400 transition-colors">Documentation</Link>
            <Link href="https://github.com/SH1W4/greenproof-zk-esg" target="_blank" className="hover:text-green-400 transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-green-400 transition-colors">Twitter</Link>
          </div>

          <div className="text-xs text-green-100/20">
            © 2026 GreenProof Protocol. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}



