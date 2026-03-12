"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

const navLinks = [
  { name: "Architecture", href: "/architecture" },
  { name: "Verify", href: "/verify" },
  { name: "Roadmap", href: "/roadmap" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-[100] border-b border-white/5 px-8 py-5 flex items-center justify-between backdrop-blur-xl bg-[#020c06]/80">
      <Link href="/" className="flex items-center gap-3 group">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-green-500 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          <ShieldCheck className="w-5 h-5 text-green-950" />
        </motion.div>
        <div className="flex flex-col">
          <span className="font-black text-lg tracking-tighter group-hover:text-green-400 transition-colors">GREENPROOF</span>
          <span className="text-[9px] text-green-500/60 font-mono font-bold tracking-[0.2em] uppercase">Sovereign Compliance</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`relative transition-colors duration-200 ${
                isActive ? "text-green-400" : "text-green-100/40 hover:text-green-100"
              }`}
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-green-500 shadow-[0_1px_5px_rgba(34,197,94,0.5)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        <Link 
          href="/login" 
          className="px-6 py-2.5 bg-green-500 text-green-950 rounded-xl hover:bg-green-400 hover:scale-105 active:scale-95 transition-all font-black shadow-lg shadow-green-500/20"
        >
          Access Protocol
        </Link>
      </div>
    </nav>
  );
}
