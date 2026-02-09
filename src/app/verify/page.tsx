"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Zap,
  Lock,
  ExternalLink
} from "lucide-react";

export default function VerifyPage() {
  const [searchId, setSearchId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<null | 'success' | 'error'>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return;
    
    setIsVerifying(true);
    setResult(null);

    // Simulate ZK-Proof verification delay
    setTimeout(() => {
      setIsVerifying(false);
      if (searchId.startsWith("GP-") && searchId.length > 5) {
        setResult('success');
      } else {
        setResult('error');
      }
    }, 2000);
  };

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
          Back
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 pt-32 pb-24 space-y-12">
        {/* Header */}
        <section className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ShieldCheck className="w-3 h-3" />
            Public Verification Portal
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Verify <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-700">Integrity</span>
          </h1>
          <p className="text-lg text-green-100/40 max-w-xl mx-auto font-medium">
            Enter a GreenProof Certificate ID to verify its cryptographic validity and RWA compliance status.
          </p>
        </section>

        {/* Search Bar */}
        <section className="relative">
          <form onSubmit={handleVerify} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-900 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Certificate ID (e.g., GP-2026-NUCLEUS-01)"
                className="flex-1 bg-black/60 border border-white/10 rounded-2xl px-8 py-5 text-lg font-mono focus:outline-none focus:border-green-500/50 backdrop-blur-xl transition-all"
              />
              <button 
                type="submit"
                disabled={isVerifying}
                className="bg-green-500 text-green-950 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-green-400 transition-all shadow-xl shadow-green-500/20 active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                {isVerifying ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-green-950/20 border-t-green-950 rounded-full"
                    />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Verify Now
                  </>
                )}
              </button>
            </div>
          </form>
          
          <p className="text-center mt-6 text-[10px] text-green-100/20 font-mono font-bold uppercase tracking-widest">
            Don't have a code? try: <span className="text-green-500/40">GP-TRINITY-DEMO</span>
          </p>
        </section>

        {/* Result Area */}
        <section className="min-h-[400px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {isVerifying && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="relative">
                   <div className="w-24 h-24 border-2 border-green-500/5 rounded-full" />
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border-t-2 border-green-500 rounded-full"
                   />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500/60">Executing ZK-Circuit</div>
                  <div className="text-sm font-bold animate-pulse">Proving ESG Compliance {">= 80%"}</div>
                </div>
              </motion.div>
            )}

            {result === 'success' && !isVerifying && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full glass-card p-8 md:p-12 rounded-[3rem] border border-green-500/20 space-y-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] -rotate-12">
                  <ShieldCheck className="w-64 h-64" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-b border-white/5 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-500/20 rounded-2xl">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tighter uppercase">Certificate Verified</h2>
                      <p className="text-[10px] font-mono font-bold text-green-500/60 uppercase">UID: {searchId}</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-500 text-green-950 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Sovereign Consensus Reached
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Physical Node", status: "Validated", icon: Zap },
                    { label: "Juridical Core", status: "Compliant", icon: Lock },
                    { label: "Ethical Engine", status: "Verified", icon: FileText }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                      <item.icon className="w-4 h-4 text-green-500/40" />
                      <div className="text-[10px] font-black uppercase tracking-widest text-green-100/40">{item.label}</div>
                      <div className="text-sm font-bold text-green-400">{item.status}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-white/20">
                     <Lock className="w-3 h-3" />
                     <span className="text-[10px] font-mono leading-none">ZK-SNARK Proof: 0x8a92...f7e1</span>
                   </div>
                   <Link href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors">
                     View on Explorer <ExternalLink className="w-3 h-3" />
                   </Link>
                </div>
              </motion.div>
            )}

            {result === 'error' && !isVerifying && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-full">
                  <ShieldAlert className="w-12 h-12 text-red-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tighter uppercase">Invalid Protocol ID</h2>
                  <p className="text-red-100/40 max-w-xs font-medium">
                    This ID was not found in the GreenProof registry or has failed the recursive integrity check.
                  </p>
                </div>
                <button 
                  onClick={() => setResult(null)}
                  className="text-[10px] font-black uppercase tracking-widest text-green-400 hover:underline"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {!isVerifying && !result && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="flex flex-col items-center gap-4 text-white/40"
              >
                <ShieldCheck className="w-16 h-16 opacity-10" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting Input</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      <footer className="fixed bottom-0 inset-x-0 p-8 flex justify-center pointer-events-none">
        <div className="glass px-6 py-3 rounded-full border border-white/5 flex items-center gap-4 pointer-events-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-green-100/40">Network Status: Synchronized</span>
        </div>
      </footer>
    </main>
  );
}
