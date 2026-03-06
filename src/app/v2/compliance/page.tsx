import React from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  History, 
  AlertCircle, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

const reports = [
  { name: "Q4 ESG Portfolio Summary", standard: "TCFD / SFDR", date: "Oct 24, 2023", status: "Ready" },
  { name: "Annual Principle Adverse Impacts", standard: "SFDR PAI", date: "Oct 20, 2023", status: "Ready" },
  { name: "SASB Disclosure - Asset Management", standard: "SASB", date: "Oct 12, 2023", status: "Archive" },
  { name: "Custom GRI Framework Report", standard: "GRI", date: "Sep 28, 2023", status: "Ready" },
];

const ProgressCircle = ({ percentage, label, sublabel, color = "text-[#17cf54]" }: { percentage: number, label: string, sublabel: string, color?: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="p-6 rounded-xl border border-[#243a2b] bg-[#16251b] flex flex-col items-center text-center space-y-4">
      <div className="relative size-24">
        <svg className="size-full transform -rotate-90">
          <circle className="text-slate-800" cx="48" cy="48" fill="transparent" r={radius} stroke="currentColor" strokeWidth="8" />
          <circle className={color} cx="48" cy="48" fill="transparent" r={radius} stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={offset} strokeWidth="8" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-slate-100">{percentage}%</span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-slate-100">{label}</h3>
        <p className="text-xs text-slate-500">{sublabel}</p>
      </div>
    </div>
  );
};

export default function V2CompliancePage() {
  return (
    <div className="space-y-8 max-w-[1440px] mx-auto w-full">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-100">Compliance & Regulatory Reporting</h1>
          <p className="text-slate-500">Manage institutional ESG reporting standards and data readiness for fiscal year 2024.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#243a2b] rounded-lg text-sm font-semibold hover:bg-[#16251b] transition-colors text-slate-300">
            Manage Frameworks
          </button>
          <button className="px-4 py-2 bg-[#16251b] border border-[#243a2b] rounded-lg text-sm font-semibold hover:brightness-125 transition-colors text-slate-100">
            Export All Data
          </button>
        </div>
      </div>

      {/* Readiness Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProgressCircle percentage={84} label="SFDR Article 8/9" sublabel="PAI data collection in progress" />
        <ProgressCircle percentage={95} label="TCFD Disclosure" sublabel="Risk assessments verified" />
        <ProgressCircle percentage={60} label="SASB Standards" sublabel="Financial sector metrics missing" color="text-yellow-500" />
        <ProgressCircle percentage={28} label="EU Taxonomy" sublabel="Alignment screening required" color="text-red-500" />
      </div>

      {/* Recent Reports & Task List */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Reports */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-100">Recent Compliance Reports</h2>
          <div className="bg-[#16251b] rounded-xl border border-[#243a2b] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Report Name</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Standard</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Generated Date</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#243a2b]">
                {reports.map((report, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">{report.name}</td>
                    <td className="px-6 py-4 text-slate-500">{report.standard}</td>
                    <td className="px-6 py-4 text-slate-500">{report.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'Ready' ? 'bg-[#17cf54]/10 text-[#17cf54]' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        <div className={`size-1.5 rounded-full ${report.status === 'Ready' ? 'bg-[#17cf54]' : 'bg-amber-500'}`}></div>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-[#17cf54] transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-[#243a2b] flex justify-center">
              <button className="text-xs font-bold text-slate-500 hover:text-[#17cf54] uppercase tracking-widest">View All Historical Reports</button>
            </div>
          </div>
        </div>

        {/* Critical Tasks Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100">Data Gaps</h2>
          <div className="bg-[#16251b] rounded-xl border border-[#243a2b] p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="size-8 rounded bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle size={14} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-200">Scope 3 Emissions Missing</p>
                  <p className="text-xs text-slate-500">Required for TCFD 2024 compliance. 12 assets pending response.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-8 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <AlertCircle size={14} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-200">SASB Multi-unit Retail</p>
                  <p className="text-xs text-slate-500">Data quality flag on energy intensity metrics for Portfolio A.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-8 rounded bg-slate-500/10 text-slate-500 flex items-center justify-center shrink-0">
                  <Clock size={14} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-200">EU Taxonomy Alignment</p>
                  <p className="text-xs text-slate-500">Scheduled automated screening for new real estate acquisitions.</p>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-[#17cf54]/20 text-[#17cf54] border border-[#17cf54]/30 rounded-lg text-sm font-bold hover:bg-[#17cf54]/30 transition-colors">
              Launch Data Auditor
            </button>
          </div>
          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#16251b] rounded-xl border border-[#243a2b]">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Asset Coverage</p>
              <p className="text-2xl font-black text-[#17cf54]">92%</p>
            </div>
            <div className="p-4 bg-[#16251b] rounded-xl border border-[#243a2b]">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Audit Pass Rate</p>
              <p className="text-2xl font-black text-[#17cf54]">99.1%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
