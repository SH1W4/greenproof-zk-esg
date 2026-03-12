import React from 'react';
import { Search, Bell } from 'lucide-react';

const V2Header = () => {
  return (
    <header className="h-16 border-b border-[#1a2e21] flex items-center justify-between px-8 bg-black/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-4" />
          <input 
            className="w-full bg-[#112116] border-[#1a2e21] rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-[#17cf54] focus:border-[#17cf54] text-slate-100 placeholder:text-slate-600 outline-none" 
            placeholder="Search portfolio assets..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="size-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-[#112116] hover:text-[#17cf54] transition-colors">
          <Bell size={20} />
        </button>
        <div className="h-8 w-px bg-[#1a2e21] mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-100">Goldman Sachs</p>
            <p className="text-[10px] text-slate-500">Asset Management Div.</p>
          </div>
          <div className="size-9 rounded-full bg-[#112116] border border-[#1a2e21] overflow-hidden">
            <div className="w-full h-full bg-[#17cf54]/10 flex items-center justify-center text-[#17cf54] font-bold text-xs">
              GS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default V2Header;
