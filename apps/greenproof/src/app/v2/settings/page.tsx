import React from 'react';
import { 
  Database, 
  Key, 
  Users, 
  History, 
  Settings, 
  Plus, 
  ChevronRight, 
  Bell, 
  Search, 
  Copy,
  PlusCircle,
  Shield
} from 'lucide-react';

const integrations = [
  { name: "Direct ERP Connection", detail: "SAP S/4HANA Enterprise", status: "CONNECTED", date: "Oct 24, 2023", time: "08:45 AM UTC", active: true },
  { name: "Third-party ESG Data", detail: "S&P Global Market Intelligence", status: "CONNECTED", date: "Oct 24, 2023", time: "07:12 AM UTC", active: true },
  { name: "Satellite Imaging API", detail: "ESA Copernicus Sentinel-2", status: "IDLE", date: "Never synced", time: "Pending setup", active: false },
];

export default function V2SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-100 tracking-tight">Data Integration Settings</h2>
          <p className="text-slate-400 mt-2 max-w-xl">Configure and monitor your institutional data streams. Toggle sources to enable real-time ESG calculation and reporting.</p>
        </div>
        <button className="bg-[#17cf36] hover:bg-[#17cf36]/90 text-black px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#17cf36]/10">
          <Plus size={20} />
          Add New Integration
        </button>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#17cf36]/5 border border-[#17cf36]/20 p-5 rounded-xl">
          <p className="text-xs font-bold text-[#17cf36] uppercase tracking-widest mb-1">Active Feeds</p>
          <p className="text-3xl font-bold text-slate-100">08</p>
        </div>
        <div className="bg-slate-800/20 border border-slate-700/50 p-5 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Sync</p>
          <p className="text-3xl font-bold text-slate-100">02</p>
        </div>
        <div className="bg-slate-800/20 border border-slate-700/50 p-5 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Data Health</p>
          <p className="text-3xl font-bold text-[#17cf36]">98.4%</p>
        </div>
      </div>

      {/* Integration Table Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h3 className="font-bold text-slate-200">Active Data Sources</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Auto-refresh: 5m</span>
            <span className="w-2 h-2 rounded-full bg-[#17cf36] animate-pulse"></span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Integration Source</th>
                <th className="px-6 py-4 font-semibold">Connection Status</th>
                <th className="px-6 py-4 font-semibold">Last Synced</th>
                <th className="px-6 py-4 font-semibold">Toggle</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {integrations.map((item, i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-[#17cf36] border border-slate-700 group-hover:border-[#17cf36]/50 transition-colors">
                        <Database size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-100">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold border ${
                      item.status === 'CONNECTED' ? 'bg-[#17cf36]/10 text-[#17cf36] border-[#17cf36]/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${item.status === 'CONNECTED' ? 'bg-[#17cf36]' : 'bg-slate-500'}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className={`text-sm ${item.active ? 'text-slate-300' : 'text-slate-500'}`}>{item.date}</p>
                    <p className="text-[10px] text-slate-500">{item.time}</p>
                  </td>
                  <td className="px-6 py-5">
                    <button className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.active ? 'bg-[#17cf36]' : 'bg-slate-700'}`}>
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${item.active ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#17cf36] hover:text-[#17cf36]/70 font-bold text-xs uppercase tracking-widest transition-colors">
                      {item.active ? 'Configure' : 'Setup'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pb-10">
        {/* API Keys Card */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Key className="text-[#17cf36] size-5" />
              <h4 className="font-bold text-slate-100">Active API Keys</h4>
            </div>
            <button className="text-[#17cf36] text-xs font-bold hover:underline">Manage All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-black p-3 rounded border border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-100">Production Key (Main)</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">gp_live_••••••••••••3a9d</p>
              </div>
              <button className="p-1.5 hover:bg-slate-800 rounded transition-colors text-slate-400">
                <Copy size={14} />
              </button>
            </div>
            <button className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-xs font-semibold text-slate-500 hover:border-[#17cf36]/50 hover:text-[#17cf36] transition-all flex items-center justify-center gap-2">
              <PlusCircle size={14} />
              Generate New API Key
            </button>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="text-[#17cf36] size-5" />
              <h4 className="font-bold text-slate-100">System Permissions</h4>
            </div>
            <button className="text-[#17cf36] text-xs font-bold hover:underline">Team Settings</button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Alex Rivers", role: "ADMIN", email: "alex@institutional.corp", active: true },
              { name: "Marcus Thorne", role: "ANALYST", email: "marcus@institutional.corp", active: false }
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-slate-100">{user.name}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${user.active ? 'bg-[#17cf36]/10 text-[#17cf36] border-[#17cf36]/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                      {user.role}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
