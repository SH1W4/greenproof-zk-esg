import React from 'react';
import MetricCard from '@/components/v2/MetricCard';
import { 
  BarChart3, 
  Cloud, 
  Users, 
  ShieldCheck, 
  Verified, 
  History 
} from 'lucide-react';

export default function PortfolioOverview() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-black text-slate-100 tracking-tight">Portfolio Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time environmental, social, and governance infrastructure performance analytics.</p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total ESG Score" 
          value="78" 
          subvalue="/100"
          icon={BarChart3}
          trend="+5.2%"
          trendType="up"
          trendLabel="vs last quarter"
        />
        <MetricCard 
          title="Carbon Footprint" 
          value="2.4k" 
          subvalue=" MT CO2e"
          icon={Cloud}
          trend="-1.8%"
          trendType="down"
          trendLabel="reduction trend"
        />
        <MetricCard 
          title="Social Impact Index" 
          value="82" 
          subvalue="/100"
          icon={Users}
          trend="+0.5%"
          trendType="up"
          trendLabel="community growth"
        />
        <MetricCard 
          title="Governance Risk" 
          value="Low" 
          icon={ShieldCheck}
          trend="0%"
          trendType="up"
          trendLabel="incidents detected"
          isRisk
        />
      </div>

      {/* Main Visualization Area */}
      <div className="bg-[#112116] border border-[#1a2e21] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#1a2e21] flex justify-between items-center">
          <h3 className="text-slate-100 font-bold">ESG Performance Over Time</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-[#1a2e21]">1M</button>
            <button className="px-3 py-1 rounded-md bg-black text-slate-400 text-xs font-bold border border-[#1a2e21]">6M</button>
            <button className="px-3 py-1 rounded-md bg-[#17cf54]/20 text-[#17cf54] text-xs font-bold border border-[#17cf54]/30">1Y</button>
          </div>
        </div>
        <div className="p-6 h-80 relative flex items-end justify-around px-10 pb-10">
           {/* Mock Bars */}
           {[40, 45, 52, 58, 62, 68, 74, 70, 80].map((h, i) => (
             <div 
               key={i}
               style={{ height: `${h}%` }}
               className={`w-2 rounded-t-sm transition-all hover:bg-[#17cf54]/40 relative group ${i === 8 ? 'bg-[#17cf54]/60 border-t-2 border-[#17cf54]' : 'bg-[#17cf54]/10'}`}
             >
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 Score: {h+10}
               </div>
             </div>
           ))}
           <div className="absolute inset-x-6 bottom-10 h-px bg-[#17cf54]/50"></div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-[#112116] border border-[#1a2e21] rounded-xl p-6">
          <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2">
            <Verified className="text-[#17cf54] size-5" />
            Compliance Status
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">EU Taxonomy Alignment</span>
              <span className="text-[#17cf54] text-sm font-bold">92%</span>
            </div>
            <div className="w-full h-1.5 bg-black rounded-full">
              <div className="h-full bg-[#17cf54] rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-400 text-sm">SFDR Article Disclosure</span>
              <span className="text-[#17cf54] text-sm font-bold">Active</span>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#112116] border border-[#1a2e21] rounded-xl p-6">
          <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2">
            <History className="text-[#17cf54] size-5" />
            Recent Activities
          </h4>
          <div className="space-y-3">
            {[
              { text: "New Solar Asset integrated into Portfolio B", time: "2 Hours ago", active: true },
              { text: "Q3 ESG Compliance Report generated", time: "1 Day ago", active: false }
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`size-2 rounded-full mt-1.5 ${activity.active ? 'bg-[#17cf54]' : 'bg-slate-600'}`}></div>
                <div>
                  <p className="text-xs text-slate-200">{activity.text}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
