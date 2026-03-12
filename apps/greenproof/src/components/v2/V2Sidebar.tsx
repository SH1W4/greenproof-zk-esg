import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Gavel, 
  FileText, 
  ShieldCheck, 
  Settings,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

const V2Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-[#1a2e21] bg-black flex flex-col justify-between p-6 h-screen">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-[#17cf54]/20 flex items-center justify-center border border-[#17cf54]/30">
            <ShieldCheck className="text-[#17cf54] size-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-100 text-lg font-bold leading-none tracking-tight">GreenProof</h1>
            <p className="text-[#17cf54] text-[10px] font-semibold uppercase tracking-widest mt-1">Institutional ESG</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          <Link href="/v2/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#17cf54] text-black font-bold transition-all">
            <LayoutDashboard size={20} />
            <span className="text-sm">Portfolio</span>
          </Link>
          <Link href="/v2/assets" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#112116] transition-all">
            <Wallet size={20} />
            <span className="text-sm">Assets</span>
          </Link>
          <Link href="/v2/compliance" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#112116] transition-all">
            <Gavel size={20} />
            <span className="text-sm">Compliance</span>
          </Link>
          <Link href="/v2/reporting" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#112116] transition-all">
            <FileText size={20} />
            <span className="text-sm">Reporting</span>
          </Link>
          <Link href="/v2/mint" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#112116] transition-all">
            <BadgeCheck size={20} />
            <span className="text-sm">Mint RWA</span>
          </Link>
        </nav>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-[#112116] border border-[#1a2e21]">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#17cf54] animate-pulse"></div>
            <span className="text-xs text-slate-300">Live Infrastructure</span>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#112116] text-slate-300 text-sm font-semibold border border-[#1a2e21] hover:border-[#17cf54]/50 transition-all">
          <Settings size={14} />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default V2Sidebar;
