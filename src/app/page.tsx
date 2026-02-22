"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// The Nuclear Option: Force Client-Only rendering for the complex interactive sections.
// This completely eliminates hydration mismatches between Server and Client for Three.js and Framer Motion.
const LandingContent = dynamic(() => import("@/components/LandingContent"), { 
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-[#020c06] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-500/10 border-t-green-500 rounded-full animate-spin" />
        <div className="text-[10px] font-black font-mono text-green-500/40 uppercase tracking-[0.3em]">
          Syncing Reality...
        </div>
      </div>
    </main>
  )
});

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingContent />
    </Suspense>
  );
}
