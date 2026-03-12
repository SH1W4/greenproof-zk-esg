import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  Verified, 
  ChevronDown 
} from 'lucide-react';

const V2MintPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">Mint RWA Token</h1>
        <p className="text-slate-400 text-lg">Secure institutional ESG-linked asset tokenization pipeline.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Tokenization Form */}
        <section className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-l-4 border-[#17cf54] pl-4 text-slate-100">Tokenization Form</h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">Verification ID</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-slate-100 focus:ring-1 focus:ring-[#17cf54] outline-none transition-all" 
                  placeholder="Enter institutional ESG verification ID" 
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">RWA Asset Class</label>
                <div className="relative">
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-slate-100 focus:ring-1 focus:ring-[#17cf54] outline-none appearance-none">
                    <option disabled selected value="">Select asset class</option>
                    <option value="carbon">Carbon Credits</option>
                    <option value="realestate">Green Real Estate</option>
                    <option value="energy">Renewable Energy Infrastructure</option>
                    <option value="agriculture">Sustainable Agriculture</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">Asset Metadata</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-slate-100 focus:ring-1 focus:ring-[#17cf54] outline-none resize-none h-32" 
                  placeholder="Detailed asset specifications and ESG impact data..."
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">CCIP Cross-Chain Issuance</span>
                  <span className="text-xs text-slate-500">Enable liquidity across supported EVM networks</span>
                </div>
                <button className="w-12 h-6 bg-[#1a3d24] rounded-full relative transition-colors border border-white/20">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-[#17cf54] rounded-full shadow-[0_0_8px_rgba(23,207,84,0.5)]"></div>
                </button>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#1a3d24] hover:bg-[#2d5a3a] text-slate-100 font-bold py-5 px-8 rounded-lg uppercase tracking-widest text-sm transition-all border border-[#17cf54]/20 shadow-xl shadow-[#17cf54]/5">
            MINT RWA TOKEN WITH ESG PROOF
          </button>
        </section>

        {/* Right Column: RWA Token Preview */}
        <section className="sticky top-24">
          <h3 className="text-xl font-semibold mb-6 opacity-60 text-slate-100">RWA Token Preview</h3>
          <div className="aspect-[4/5] max-w-md mx-auto w-full bg-[#0a120c] border border-white/10 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #17cf54 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10 flex flex-col items-center text-center mt-8">
              <div className="w-24 h-24 rounded-full bg-[#1a3d24]/30 border border-[#17cf54]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(23,207,84,0.1)] group-hover:shadow-[0_0_50px_rgba(23,207,84,0.2)] transition-all">
                <ShieldCheck className="text-[#17cf54] size-12" />
              </div>
              <span className="text-[#17cf54] text-xs font-bold tracking-[0.3em] uppercase mb-2">Institutional Asset</span>
              <h4 className="text-3xl font-light text-slate-100 mb-8">Renewable Infrastructure</h4>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
              <div className="flex flex-col items-center">
                <span className="text-slate-500 text-xs uppercase tracking-widest mb-1">Proved ESG Score</span>
                <div className="text-5xl font-bold text-slate-100 flex items-baseline gap-1">
                  92<span className="text-xl font-medium text-[#17cf54]">%</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-4 mt-auto">
              <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Issuance Date</span>
                  <span className="text-xs font-medium uppercase">OCT 24, 2023</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Status</span>
                  <span className="text-xs font-medium text-[#17cf54] uppercase">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 py-3 px-4 bg-[#17cf54] text-black rounded-lg shadow-[0_0_20px_rgba(23,207,84,0.2)]">
                <Verified size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified by GreenProof</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 border border-white/10 rounded-xl bg-white/5 flex items-start gap-4 max-w-md mx-auto">
            <Info className="text-[#17cf54] shrink-0" size={20} />
            <div>
              <p className="text-sm font-semibold text-slate-200">Legal Compliance</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">This RWA token is compliant with ERC-3643 standards for institutional asset management and regulatory reporting requirements.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default V2MintPage;
