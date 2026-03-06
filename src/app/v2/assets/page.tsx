import React from 'react';
import { 
  Download, 
  Plus, 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react';

const assets = [
  { name: "Global Energy Corp", ticker: "GEC · NYSE", sector: "Energy", score: 88, intensity: "12.4", status: "Compliant" },
  { name: "TechFlow Systems", ticker: "TFS · NASDAQ", sector: "Technology", score: 72, intensity: "4.1", status: "Compliant" },
  { name: "Urban Build Ltd", ticker: "UBL · LSE", sector: "Real Estate", score: 45, intensity: "28.9", status: "Non-compliant" },
  { name: "Maritime Logistics", ticker: "MLOG · NYSE", sector: "Transport", score: 61, intensity: "18.2", status: "Under Review" },
  { name: "EcoPower Solutions", ticker: "EPS · NASDAQ", sector: "Renewables", score: 94, intensity: "0.8", status: "Compliant" },
];

export default function V2AssetsPage() {
  return (
    <div className="space-y-8 max-w-[1440px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-100 text-4xl lg:text-5xl font-extrabold tracking-tight">Asset Performance Analysis</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Manage and monitor ESG metrics across your institutional holdings with real-time compliance tracking.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#1a2e21] text-slate-100 font-bold hover:bg-[#244730] transition-all border border-white/5">
            <Download size={20} />
            <span>Export CSV</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#17cf54] text-black font-bold hover:opacity-90 transition-all">
            <Plus size={20} />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Area */}
      <div className="bg-[#1a2e21]/30 border border-white/5 rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input 
              className="w-full bg-[#1a2e21] border-none rounded-lg h-12 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-[#17cf54]/50 transition-all outline-none" 
              placeholder="Search assets, sectors, or company tickers..." 
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            {['Sector: All', 'ESG: High to Low', 'Compliance'].map((filter) => (
              <button key={filter} className="flex flex-1 lg:flex-none items-center justify-between gap-3 bg-[#1a2e21] border border-white/5 rounded-lg h-12 px-4 text-slate-100 hover:bg-[#244730] transition-colors min-w-[140px]">
                <span className="text-sm font-medium">{filter}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1a2e21]/20 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#1a2e21]/40">
              <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Asset Name</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Sector</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider text-center">ESG Score</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Carbon Intensity</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {assets.map((asset, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-slate-100 font-bold text-base">{asset.name}</span>
                    <span className="text-slate-500 text-xs">{asset.ticker}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="bg-[#244730] px-3 py-1 rounded text-xs font-semibold text-slate-300">{asset.sector}</span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex justify-center">
                    <div className={`size-12 rounded-full border-2 flex items-center justify-center ${
                      asset.score > 80 ? 'border-[#17cf54] bg-[#17cf54]/10' : 
                      asset.score > 60 ? 'border-yellow-500 bg-yellow-500/10' : 'border-orange-500 bg-orange-500/10'
                    }`}>
                      <span className={`font-bold ${asset.score > 80 ? 'text-[#17cf54]' : asset.score > 60 ? 'text-yellow-500' : 'text-orange-500'}`}>
                        {asset.score}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-100 font-medium">{asset.intensity}</span>
                    <span className="text-slate-500 text-xs font-normal">kgCO2e</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className={`flex items-center gap-2 ${
                    asset.status === 'Compliant' ? 'text-[#17cf54]' : 
                    asset.status === 'Non-compliant' ? 'text-orange-500' : 'text-yellow-500'
                  }`}>
                    {asset.status === 'Compliant' ? <CheckCircle2 size={16} /> : 
                     asset.status === 'Non-compliant' ? <AlertTriangle size={16} /> : <Info size={16} />}
                    <span className="text-sm font-bold">{asset.status}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-right">
                  <button className="text-slate-500 hover:text-slate-100 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-6">
        <span className="text-sm text-slate-500">Showing 1-5 of 128 assets</span>
        <div className="flex gap-2">
          <button className="bg-[#1a2e21] border border-white/5 h-10 w-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 disabled:opacity-30" disabled>
            <ChevronLeft size={20} />
          </button>
          <button className="bg-[#17cf54] text-black h-10 w-10 rounded-lg flex items-center justify-center font-bold">1</button>
          <button className="bg-[#1a2e21] border border-white/5 h-10 w-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100">2</button>
          <button className="bg-[#1a2e21] border border-white/5 h-10 w-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100">3</button>
          <span className="text-slate-500 self-center px-1">...</span>
          <button className="bg-[#1a2e21] border border-white/5 h-10 w-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100">12</button>
          <button className="bg-[#1a2e21] border border-white/5 h-10 w-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Metric Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pb-10">
        <div className="bg-[#1a2e21]/20 border border-white/5 p-6 rounded-xl">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Portfolio ESG Average</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-extrabold text-slate-100">76.4</span>
            <span className="text-[#17cf54] text-sm font-bold flex items-center gap-1 mb-1">
              <TrendingUp size={14} /> +2.1%
            </span>
          </div>
        </div>
        <div className="bg-[#1a2e21]/20 border border-white/5 p-6 rounded-xl">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Carbon intensity</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-extrabold text-slate-100">15.2</span>
            <span className="text-slate-500 text-xs mb-1">MT/year</span>
          </div>
        </div>
        <div className="bg-[#1a2e21]/20 border border-white/5 p-6 rounded-xl">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Compliance Rate</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-extrabold text-[#17cf54]">92%</span>
          </div>
        </div>
        <div className="bg-[#1a2e21]/20 border border-white/5 p-6 rounded-xl">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Active Alerts</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-extrabold text-orange-500">3</span>
            <span className="text-slate-500 text-sm font-medium mb-1">Action required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
