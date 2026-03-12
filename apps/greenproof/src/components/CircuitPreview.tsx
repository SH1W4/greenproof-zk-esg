"use client";

import { motion } from "framer-motion";

const circuitCode = `// GreenProof Groth16 Integrity Circuit
template IntegrityVerifier(n) {
    signal input telemetry[n];
    signal input juridicalHash;
    signal input ethicalScore;
    
    signal output integrityProof;
    
    // Constraint: Valid Data Bound
    component range = RangeCheck(32);
    range.in <== telemetry[0];
    
    // Trinity Consensus Verification
    signal consensus <== (telemetry[0] * 0.4) + 
                       (juridicalHash * 0.3) + 
                       (ethicalScore * 0.3);
                       
    integrityProof <== consensus >= 80 ? 1 : 0;
}`;

export default function CircuitPreview() {
  return (
    <div className="relative glass-card rounded-3xl border border-white/5 overflow-hidden group">
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-widest">
          integrity_circuit.circom
        </div>
      </div>
      <div className="p-8 font-mono text-[11px] leading-relaxed relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
        <pre className="relative z-10">
          {circuitCode.split('\n').map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-6"
            >
              <span className="text-white/10 w-4 select-none">{i + 1}</span>
              <span className={
                line.includes('//') ? 'text-green-500/40 italic' :
                line.includes('template') || line.includes('signal') ? 'text-green-400 font-bold' :
                line.includes('<==') ? 'text-amber-400' :
                'text-green-100/60'
              }>
                {line}
              </span>
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
}
