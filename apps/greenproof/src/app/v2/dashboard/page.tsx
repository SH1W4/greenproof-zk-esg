import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MetricCard from '@/components/v2/MetricCard';
import { 
  BarChart3, 
  Cloud, 
  Users, 
  ShieldCheck, 
  Verified, 
  History,
  Zap
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioOverview() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Premium entrance animation
      if (containerRef.current) {
        gsap.fromTo(containerRef.current.children, 
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            duration: 0.8, 
            stagger: 0.1, 
            ease: "expo.out" 
          }
        );
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <p className="text-text-muted font-mono text-xs uppercase tracking-[0.3em]">Syncing Institutional Node...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Page Title */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-100 tracking-tight">Portfolio Overview</h2>
          <p className="text-text-muted text-sm mt-1">Real-time environmental, social, and governance infrastructure performance analytics.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-accent/5 border border-accent/20 rounded-lg">
          <Zap size={14} className="text-brand-primary animate-pulse" />
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Live Node Active</span>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total ESG Score" value="0" subvalue="/100" icon={BarChart3} trend="0%" trendType="up" trendLabel="initialized" />
        <MetricCard title="Carbon Footprint" value="0" subvalue=" MT CO2e" icon={Cloud} trend="0%" trendType="down" trendLabel="initialized" />
        <MetricCard title="Social Impact Index" value="0" subvalue="/100" icon={Users} trend="0%" trendType="up" trendLabel="initialized" />
        <MetricCard title="Governance Risk" value="None" icon={ShieldCheck} trend="0%" trendType="up" trendLabel="initialized" isRisk />
      </div>

      {/* Main Visualization Area */}
      <div className="bg-alt border border-glass-border rounded-xl overflow-hidden min-h-[400px] flex flex-col relative group/viz">
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/viz:opacity-100 transition-opacity pointer-events-none" />
        <div className="p-6 border-b border-glass-border flex justify-between items-center relative z-10">
          <h3 className="text-slate-100 font-bold">ESG Performance Over Time</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-glass-border opacity-50 cursor-not-allowed">1M</button>
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-glass-border opacity-50 cursor-not-allowed">6M</button>
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-glass-border opacity-50 cursor-not-allowed">1Y</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden z-10">
            <div className="scanner-line opacity-10" />
            <div className="text-brand-primary/20 mb-4 animate-pulse">
              <BarChart3 size={64} />
            </div>
            <p className="text-slate-400 font-bold">No data points detected</p>
            <p className="text-slate-600 text-xs mt-2 max-w-xs uppercase tracking-widest font-mono">Scanning Node for Institutional Consensus...</p>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        <div className="bg-alt border border-glass-border rounded-xl p-6 relative group">
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
          <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2 relative z-10">
            <Verified className="text-brand-primary/40 size-5" />
            Compliance Status
          </h4>
          <div className="flex flex-col items-center justify-center py-10 opacity-40 relative z-10">
            <p className="text-xs text-slate-500 italic">Institutional compliance check pending...</p>
          </div>
        </div>

        <div className="bg-alt border border-glass-border rounded-xl p-6 relative group">
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
          <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2 relative z-10">
            <History className="text-brand-primary/40 size-5" />
            Recent Activities
          </h4>
          <div className="flex flex-col items-center justify-center py-10 opacity-40 relative z-10">
            <p className="text-xs text-slate-500 italic">No historical activities found for this node.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
