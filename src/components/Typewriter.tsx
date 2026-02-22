"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export function Typewriter({ text, delay = 50, className = "" }: TypewriterProps) {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
      }, 5000);

      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, delay, text]);

  if (!mounted) return <span className={className} translate="no">{text}</span>;

  return (
    <span className={className} translate="no">
      {displayText}
      <span className="animate-pulse inline-block w-2 h-4 bg-current align-middle ml-1"></span>
    </span>
  );
}

interface TerminalCommandProps {
  commands: string[];
  className?: string;
}

export function TerminalCommand({ commands, className = "" }: TerminalCommandProps) {
  const [mounted, setMounted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentLineIndex < commands.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, commands[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setLines([]);
        setCurrentLineIndex(0);
      }, 6000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentLineIndex, commands]);

  if (!mounted) return null;

  return (
    <div className={`relative group ${className}`} translate="no">
      {/* Terminal Window Frame */}
      <div className="bg-[#050a06] border border-green-500/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.1)] backdrop-blur-md">
        {/* Header bar */}
        <div className="bg-green-500/5 border-b border-green-500/20 px-4 py-2 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <div className="text-[10px] font-mono text-green-500/40 uppercase tracking-widest font-bold">
            GreenProof Shell - v2.0.26
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Content Area */}
        <div className="relative p-6 font-mono text-xs sm:text-sm min-h-[220px] max-h-[300px] overflow-y-auto scrollbar-hide">
          {/* CRT Noise Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />

          <div className="relative space-y-1.5">
            <AnimatePresence mode="popLayout">
              {lines.map((line, i) => (
                <motion.div
                  key={`${i}-${line}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 items-start"
                >
                  <span className="text-green-500 select-none shrink-0">$</span>
                  <span className={line.startsWith("✓") || line.startsWith("[") ? "text-emerald-400 font-bold" : "text-green-100/90"}>
                    {line}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {currentLineIndex < commands.length && (
              <div className="flex gap-3">
                <span className="text-green-500 select-none">$</span>
                <span className="w-2 h-4 bg-green-500 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Footer / Status Bar */}
        <div className="bg-green-500/5 border-t border-green-500/10 px-4 py-1.5 flex items-center justify-between text-[9px] font-mono text-green-500/30 uppercase tracking-wider">
          <div className="flex gap-4">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-green-500/50 mr-1" />
            System: Operational
          </div>
          <div>Encoding: ZK-SNARK (Groth16)</div>
        </div>
      </div>
      
      {/* Outer Glow */}
      <div className="absolute -inset-1 bg-green-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}
