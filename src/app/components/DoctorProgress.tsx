import { motion } from 'framer-motion';
import { TrendingUp, FileText, Download } from 'lucide-react';

export default function DoctorProgress() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Patient Progress & Reports</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {[
          { label: 'Avg Accuracy', value: '85%', color: 'cyan', icon: TrendingUp },
          { label: 'Sessions Completed', value: '24', color: 'purple', icon: FileText },
          { label: 'Pain Level', value: '2/10', color: 'green', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              <span className={`text-xs font-bold px-2 py-1 rounded bg-${stat.color}-500/10 text-${stat.color}-400`}>
                +12%
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">Recovery Trend</h3>
          <select className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-1 outline-none">
            <option>Last 7 Days</option>
            <option>Last Month</option>
          </select>
        </div>
        
        {/* Placeholder Chart */}
        <div className="h-64 flex items-end gap-2 px-4 pb-4 border-b border-slate-700">
          {[40, 60, 45, 70, 65, 85, 80].map((h, i) => (
            <div key={i} className="flex-1 group relative">
              <div 
                className="w-full bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors rounded-t-lg"
                style={{ height: `${h}%` }}
              ></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 whitespace-nowrap z-10">
                Accuracy: {h}%
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500 px-4">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors">
          <Download className="w-4 h-4" />
          Generate Detailed Report
        </button>
      </div>
    </div>
  );
}

import { Activity } from 'lucide-react';
