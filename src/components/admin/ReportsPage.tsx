import { motion } from 'motion/react';
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: 'Daily Activity Report',
      description: 'Patient and doctor activity for today',
      icon: Calendar,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 2,
      title: 'Weekly Summary',
      description: 'Weekly overview of platform usage',
      icon: TrendingUp,
      color: 'from-green-400 to-green-600',
    },
    {
      id: 3,
      title: 'Doctor Performance',
      description: 'Doctor activity and patient feedback',
      icon: FileText,
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 4,
      title: 'Patient Progress',
      description: 'Overall patient recovery statistics',
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Download and analyze platform reports</p>
      </div>

      {/* Reports Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center flex-shrink-0`}>
                <report.icon className="w-7 h-7 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {report.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {report.description}
                </p>

                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold hover:shadow-lg transition-all">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Downloads */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Downloads</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Weekly Summary - Jan 10-16', date: 'Downloaded on Jan 17, 2026' },
            { name: 'Doctor Performance - December', date: 'Downloaded on Jan 5, 2026' },
            { name: 'Patient Progress - Q4 2025', date: 'Downloaded on Jan 2, 2026' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#3FA9F5]" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
