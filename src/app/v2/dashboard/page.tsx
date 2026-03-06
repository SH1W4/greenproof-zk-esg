"use client";

import React, { useState, useEffect } from 'react';
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

export default function PortfolioOverview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading/reset state for demo validation
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="w-12 h-12 border-4 border-[#17cf54]/20 border-t-[#17cf54] rounded-full animate-spin"></div>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">Syncing Institutional Node...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Title */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-100 tracking-tight">Portfolio Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time environmental, social, and governance infrastructure performance analytics.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#17cf54]/5 border border-[#17cf54]/20 rounded-lg">
          <Zap size={14} className="text-[#17cf54] animate-pulse" />
          <span className="text-[10px] font-bold text-[#17cf54] uppercase tracking-widest">Live Node Active</span>
        </div>
      </div>

      {/* KPI Metrics - RESET STATE (ZEROED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total ESG Score" 
          value="0" 
          subvalue="/100"
          icon={BarChart3}
          trend="0%"
          trendType="up"
          trendLabel="initialized"
        />
        <MetricCard 
          title="Carbon Footprint" 
          value="0" 
          subvalue=" MT CO2e"
          icon={Cloud}
          trend="0%"
          trendType="down"
          trendLabel="initialized"
        />
        <MetricCard 
          title="Social Impact Index" 
          value="0" 
          subvalue="/100"
          icon={Users}
          trend="0%"
          trendType="up"
          trendLabel="initialized"
        />
        <MetricCard 
          title="Governance Risk" 
          value="None" 
          icon={ShieldCheck}
          trend="0%"
          trendType="up"
          trendLabel="initialized"
          isRisk
        />
      </div>

      {/* Main Visualization Area - EMPTY STATE */}
      <div className="bg-[#112116] border border-[#1a2e21] rounded-xl overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 border-b border-[#1a2e21] flex justify-between items-center">
          <h3 className="text-slate-100 font-bold">ESG Performance Over Time</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-[#1a2e21] opacity-50 cursor-not-allowed">1M</button>
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-[#1a2e21] opacity-50 cursor-not-allowed">6M</button>
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-[#1a2e21] opacity-50 cursor-not-allowed">1Y</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="text-[#17cf54]/20 mb-4">
              <BarChart3 size={64} />
            </div>
            <p className="text-slate-400 font-bold">No data points detected</p>
            <p className="text-slate-600 text-xs mt-2 max-w-xs">Start a consensus operation to populate your institutional ESG performance chart.</p>
        </div>
      </div>

      {/* Footer Stats - EMPTY STATE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        <div className="bg-[#112116] border border-[#1a2e21] rounded-xl p-6">
          <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2">
            <Verified className="text-[#17cf54]/20 size-5" />
            Compliance Status
          </h4>
          <div className="flex flex-col items-center justify-center py-10 opacity-40">
            <p className="text-xs text-slate-500 italic">Institutional compliance check pending...</p>
          </div>
        </div>

        <div className="bg-[#112116] border border-[#1a2e21] rounded-xl p-6">
          <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2">
            <History className="text-[#17cf54]/20 size-5" />
            Recent Activities
          </h4>
          <div className="flex flex-col items-center justify-center py-10 opacity-40">
            <p className="text-xs text-slate-500 italic">No historical activities found for this node.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
