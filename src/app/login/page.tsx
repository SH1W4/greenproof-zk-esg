"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials for hackathon demo
    if (email === "admin@greenproof.io" && password === "trinity2026") {
      localStorage.setItem("greenproof_auth", "authenticated");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Access denied.");
    }
  };

  return (
    <main className="min-h-screen bg-[#020c06] text-[#f0fdf4] flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
        <Image 
          src="/assets/branding/hero_banner_0.png" 
          alt="Sovereign Gateway" 
          fill
          className="object-cover animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-[#020c06]/80 backdrop-blur-[2px]" />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[160px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-8"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="p-3 bg-green-500 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.4)]">
            <ShieldCheck className="w-8 h-8 text-green-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter glow-text">GREENPROOF</span>
            <span className="text-[10px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Sovereign Access</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 rounded-[2rem] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-black tracking-tight">Protocol Access</h1>
            <p className="text-sm text-green-100/40">Enter your institutional credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-green-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-green-500 transition-all"
                placeholder="admin@greenproof.io"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-green-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-green-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-4 bg-green-500 text-green-950 font-black rounded-xl flex items-center justify-center gap-3 hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(34,197,94,0.3)]"
            >
              Access Protocol
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <p className="text-xs text-green-100/20">
              Institutional access only. Unauthorized entry is logged.
            </p>
          </div>
        </div>

        {/* Demo Credentials Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-xs text-green-500/40 font-mono"
        >
          Demo: admin@greenproof.io / trinity2026
        </motion.div>
      </motion.div>
    </main>
  );
}
